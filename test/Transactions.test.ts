import type { Transactions } from "../typechain-types/contracts/Transactions";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Account, getAccounts } from "./utils/getAccounts";
import { deployContract } from "./utils/deployContract";
import { BigNumber } from "ethers";

let deployer: Account;
let user1: Account;
let user2: Account;
let Token: Transactions;
const feePercent = 5;

const formatEth = (value: BigNumber) => Number(ethers.utils.formatUnits(value));
const transferAmount = ethers.utils.parseEther("0.0001");
const transactionFee = (formatEth(transferAmount) * feePercent) / 100;
const testMessage = "test message";
const testKeyword = "test keyword";

describe("Transactions Token Tests", () => {
  beforeEach(async () => {
    [deployer, user1, user2] = await getAccounts();

    Token = (await deployContract(
      "Transactions",
      [feePercent],
      deployer.signer
    )) as Transactions;
  });

  describe("Deploy Tests", () => {
    it(`Should token is deploy, get correct address, transactions count is equal 0, feePercent is equals ${feePercent} and feeAccount is deployer address`, async () => {
      expect(ethers.utils.isAddress(Token.address)).to.equal(true);
      expect(await Token.getTransactionCount()).to.equals(0);
      expect(await Token.feePercent()).to.equals(5);
      expect(await Token.feeAccount()).to.equals(deployer.address);
    });
  });

  describe("Transactions Tests", () => {
    it("Should send transaction, save transaction data and transfer ETH values to receiver and feeAccount", async () => {
      // get balances before a transaction is sent
      const senderInitBalance = await user1.signer.getBalance();
      const receiverInitBalance = await user2.signer.getBalance();
      const feeAccountInitBalance = await deployer.signer.getBalance();

      // transaction count equals 0 before the transaction is sent
      expect(await Token.getTransactionCount()).to.equals(0);

      // call transaction with sent correct data and ETH amount value
      const tx = await Token.connect(user1.signer).addTransaction(
        user2.address,
        transferAmount,
        testMessage,
        testKeyword,
        { value: transferAmount }
      );

      // get the transaction gas price
      const receipt = await tx.wait();
      const gasUsed = receipt.cumulativeGasUsed.mul(receipt.effectiveGasPrice);

      // transaction emit correct event
      await expect(tx).to.emit(Token, "Transfer");

      // get correct transactions data
      const transactions = await Token.getAllTransactions();
      const {
        from,
        receiver,
        message,
        keyword,
        transactionFee: fee,
        amount,
        timestamp,
      } = transactions[0];
      expect(from).to.equal(user1.address);
      expect(receiver).to.equal(user2.address);
      expect(message).to.equal(testMessage);
      expect(keyword).to.equal(testKeyword);
      expect(formatEth(fee)).to.equal(transactionFee);
      expect(formatEth(amount)).to.equal(
        formatEth(transferAmount) - transactionFee
      );
      expect(timestamp).to.not.be.undefined;

      // transaction count +1 after transaction is success
      expect(await Token.getTransactionCount()).to.equals(1);

      // get balances after transaction
      const senderFinalBalance = await user1.signer.getBalance();
      const receiverFinalBalance = await user2.signer.getBalance();
      const feeAccountFinalBalance = await deployer.signer.getBalance();

      // receiver get ETH value after transaction
      expect(formatEth(receiverFinalBalance)).to.equal(
        formatEth(receiverInitBalance) +
          (formatEth(transferAmount) - transactionFee)
      );

      // subtract ETH transfer amount + gas from sender account after transaction
      expect(formatEth(senderFinalBalance)).to.equal(
        formatEth(senderInitBalance) -
          (formatEth(transferAmount) + formatEth(gasUsed))
      );

      // feeAccount should get feePercent amount
      expect(formatEth(feeAccountFinalBalance)).to.equal(
        formatEth(feeAccountInitBalance) + transactionFee
      );
    });

    it("Should revert transaction when transfer amount is 0", async () => {
      const wrongAmount = ethers.utils.parseEther("0");
      const wrongMessage = "ab";
      const wrongKeyword = "aa";

      await expect(
        Token.connect(user1.signer).addTransaction(
          user2.address,
          wrongAmount,
          testMessage,
          testKeyword,
          { value: wrongAmount }
        )
      ).to.be.revertedWith("Wrong transaction value");

      await expect(
        Token.connect(user1.signer).addTransaction(
          user2.address,
          transferAmount,
          wrongMessage,
          testKeyword,
          { value: transferAmount }
        )
      ).to.be.revertedWith("Minimum message length should be 3");

      await expect(
        Token.connect(user1.signer).addTransaction(
          user2.address,
          transferAmount,
          testMessage,
          wrongKeyword,
          { value: transferAmount }
        )
      ).to.be.revertedWith("Minimum keyword length should be 3");
    });

    it("Should change feeValue by owner", async () => {
      const newFee = 8;
      expect(await Token.feePercent()).to.equals(feePercent);

      await expect(Token.connect(deployer.signer).changeFeeValue(newFee)).not.to
        .be.reverted;

      expect(await Token.feePercent()).to.equals(newFee);
    });

    it("Should revert changeFeeValue when calling it as not owner", async () => {
      await expect(
        Token.connect(user1.signer).changeFeeValue(3)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should revert addTransaction when try transfer to yourself", async () => {
      await expect(
        Token.connect(user1.signer).addTransaction(
          user1.address,
          transferAmount,
          testMessage,
          testKeyword,
          { value: transferAmount }
        )
      ).to.be.revertedWith("You cannot transfer to yourself");
    });
  });
});

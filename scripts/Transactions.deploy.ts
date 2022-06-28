import { ethers } from "hardhat";

const feePercent = 5;

const deployParams = [feePercent];

const ERCTokenDeploy = async () => {
  console.log(`Starting deploy Transactions Contract, please wait...`);

  const [deployer] = await ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(
    `Deployer balance: ${ethers.utils.formatEther(balance.toString())} ETH`
  );

  const Contract = await ethers.getContractFactory("Transactions");
  const contract = await Contract.deploy([...deployParams]);

  await contract.deployed();

  console.log("Transactions Contract deployed to:", contract.address);
};

(async () => {
  try {
    await ERCTokenDeploy();
    process.exit(0);
  } catch (error) {
    console.error(error as Error);
    process.exitCode = 1;
  }
})();

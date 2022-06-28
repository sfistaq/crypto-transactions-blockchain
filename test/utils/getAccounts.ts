import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

export type Account = {
  address: string;
  signer: SignerWithAddress;
};

export const getAccounts = async () => {
  const signers = await ethers.getSigners();

  const promises = signers.map(async (signer: SignerWithAddress) => {
    return {
      signer,
      address: await signer.getAddress(),
    };
  });

  const accounts = await Promise.all(promises);

  return accounts;
};

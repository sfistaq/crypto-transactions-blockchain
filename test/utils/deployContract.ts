import type { Signer, Contract } from "ethers";
import { ethers } from "hardhat";

export const deployContract = async <T>(
  contract: string,
  params: Array<T>,
  deployer: Signer
): Promise<Contract> => {
  const ContractFactory = await ethers.getContractFactory(contract, deployer);

  const Contract = await ContractFactory.deploy(...params);

  await Contract.deployed();
  return Contract;
};

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export declare namespace Transactions {
  export type TransferStructStruct = {
    from: string;
    receiver: string;
    amount: BigNumberish;
    transactionFee: BigNumberish;
    message: string;
    keyword: string;
    timestamp: BigNumberish;
  };

  export type TransferStructStructOutput = [
    string,
    string,
    BigNumber,
    BigNumber,
    string,
    string,
    BigNumber
  ] & {
    from: string;
    receiver: string;
    amount: BigNumber;
    transactionFee: BigNumber;
    message: string;
    keyword: string;
    timestamp: BigNumber;
  };
}

export interface TransactionsInterface extends utils.Interface {
  functions: {
    "addTransaction(address,uint256,string,string)": FunctionFragment;
    "changeFeeValue(uint256)": FunctionFragment;
    "feeAccount()": FunctionFragment;
    "feePercent()": FunctionFragment;
    "getAllTransactions()": FunctionFragment;
    "getTransactionCount()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transactionCount()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addTransaction"
      | "changeFeeValue"
      | "feeAccount"
      | "feePercent"
      | "getAllTransactions"
      | "getTransactionCount"
      | "owner"
      | "renounceOwnership"
      | "transactionCount"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addTransaction",
    values: [string, BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "changeFeeValue",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "feeAccount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "feePercent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAllTransactions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTransactionCount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transactionCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "addTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeFeeValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "feeAccount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feePercent", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAllTransactions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTransactionCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transactionCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "Transfer(address,address,uint256,uint256,string,string,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface TransferEventObject {
  from: string;
  receiver: string;
  amount: BigNumber;
  transactionFee: BigNumber;
  message: string;
  keyword: string;
  timestamp: BigNumber;
}
export type TransferEvent = TypedEvent<
  [string, string, BigNumber, BigNumber, string, string, BigNumber],
  TransferEventObject
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface Transactions extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TransactionsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addTransaction(
      receiver: string,
      amount: BigNumberish,
      message: string,
      keyword: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeFeeValue(
      _newFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    feeAccount(overrides?: CallOverrides): Promise<[string]>;

    feePercent(overrides?: CallOverrides): Promise<[BigNumber]>;

    getAllTransactions(
      overrides?: CallOverrides
    ): Promise<[Transactions.TransferStructStructOutput[]]>;

    getTransactionCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transactionCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addTransaction(
    receiver: string,
    amount: BigNumberish,
    message: string,
    keyword: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeFeeValue(
    _newFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  feeAccount(overrides?: CallOverrides): Promise<string>;

  feePercent(overrides?: CallOverrides): Promise<BigNumber>;

  getAllTransactions(
    overrides?: CallOverrides
  ): Promise<Transactions.TransferStructStructOutput[]>;

  getTransactionCount(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transactionCount(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addTransaction(
      receiver: string,
      amount: BigNumberish,
      message: string,
      keyword: string,
      overrides?: CallOverrides
    ): Promise<void>;

    changeFeeValue(
      _newFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    feeAccount(overrides?: CallOverrides): Promise<string>;

    feePercent(overrides?: CallOverrides): Promise<BigNumber>;

    getAllTransactions(
      overrides?: CallOverrides
    ): Promise<Transactions.TransferStructStructOutput[]>;

    getTransactionCount(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transactionCount(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "Transfer(address,address,uint256,uint256,string,string,uint256)"(
      from?: null,
      receiver?: null,
      amount?: null,
      transactionFee?: null,
      message?: null,
      keyword?: null,
      timestamp?: null
    ): TransferEventFilter;
    Transfer(
      from?: null,
      receiver?: null,
      amount?: null,
      transactionFee?: null,
      message?: null,
      keyword?: null,
      timestamp?: null
    ): TransferEventFilter;
  };

  estimateGas: {
    addTransaction(
      receiver: string,
      amount: BigNumberish,
      message: string,
      keyword: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeFeeValue(
      _newFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    feeAccount(overrides?: CallOverrides): Promise<BigNumber>;

    feePercent(overrides?: CallOverrides): Promise<BigNumber>;

    getAllTransactions(overrides?: CallOverrides): Promise<BigNumber>;

    getTransactionCount(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transactionCount(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addTransaction(
      receiver: string,
      amount: BigNumberish,
      message: string,
      keyword: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeFeeValue(
      _newFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    feeAccount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feePercent(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAllTransactions(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTransactionCount(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transactionCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}

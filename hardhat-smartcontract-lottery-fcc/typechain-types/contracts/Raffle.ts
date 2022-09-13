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
  PromiseOrValue,
} from "../common";

export interface RaffleInterface extends utils.Interface {
  functions: {
    "checkUpkeep(bytes)": FunctionFragment;
    "enterRaffle()": FunctionFragment;
    "getEntranceFee()": FunctionFragment;
    "getLatestTimeStamp()": FunctionFragment;
    "getNumWords()": FunctionFragment;
    "getNumberOfPlayers()": FunctionFragment;
    "getPlayer(uint256)": FunctionFragment;
    "getRaffleState()": FunctionFragment;
    "getRecentWinner()": FunctionFragment;
    "getRequestConfirmations()": FunctionFragment;
    "performUpkeep(bytes)": FunctionFragment;
    "rawFulfillRandomWords(uint256,uint256[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "checkUpkeep"
      | "enterRaffle"
      | "getEntranceFee"
      | "getLatestTimeStamp"
      | "getNumWords"
      | "getNumberOfPlayers"
      | "getPlayer"
      | "getRaffleState"
      | "getRecentWinner"
      | "getRequestConfirmations"
      | "performUpkeep"
      | "rawFulfillRandomWords"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "checkUpkeep",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "enterRaffle",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEntranceFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLatestTimeStamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNumWords",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNumberOfPlayers",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPlayer",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRaffleState",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRecentWinner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRequestConfirmations",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "performUpkeep",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "rawFulfillRandomWords",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "checkUpkeep",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "enterRaffle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEntranceFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLatestTimeStamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNumWords",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNumberOfPlayers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPlayer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRaffleState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRecentWinner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRequestConfirmations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "performUpkeep",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rawFulfillRandomWords",
    data: BytesLike
  ): Result;

  events: {
    "RaffleEnter(address)": EventFragment;
    "RaffleRequestedWinner(uint256)": EventFragment;
    "WinnerPicked(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RaffleEnter"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RaffleRequestedWinner"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WinnerPicked"): EventFragment;
}

export interface RaffleEnterEventObject {
  player: string;
}
export type RaffleEnterEvent = TypedEvent<[string], RaffleEnterEventObject>;

export type RaffleEnterEventFilter = TypedEventFilter<RaffleEnterEvent>;

export interface RaffleRequestedWinnerEventObject {
  requestId: BigNumber;
}
export type RaffleRequestedWinnerEvent = TypedEvent<
  [BigNumber],
  RaffleRequestedWinnerEventObject
>;

export type RaffleRequestedWinnerEventFilter =
  TypedEventFilter<RaffleRequestedWinnerEvent>;

export interface WinnerPickedEventObject {
  winner: string;
}
export type WinnerPickedEvent = TypedEvent<[string], WinnerPickedEventObject>;

export type WinnerPickedEventFilter = TypedEventFilter<WinnerPickedEvent>;

export interface Raffle extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RaffleInterface;

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
    checkUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    enterRaffle(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getEntranceFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    getLatestTimeStamp(overrides?: CallOverrides): Promise<[BigNumber]>;

    getNumWords(overrides?: CallOverrides): Promise<[BigNumber]>;

    getNumberOfPlayers(overrides?: CallOverrides): Promise<[BigNumber]>;

    getPlayer(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getRaffleState(overrides?: CallOverrides): Promise<[number]>;

    getRecentWinner(overrides?: CallOverrides): Promise<[string]>;

    getRequestConfirmations(overrides?: CallOverrides): Promise<[BigNumber]>;

    performUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    rawFulfillRandomWords(
      requestId: PromiseOrValue<BigNumberish>,
      randomWords: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  checkUpkeep(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  enterRaffle(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getEntranceFee(overrides?: CallOverrides): Promise<BigNumber>;

  getLatestTimeStamp(overrides?: CallOverrides): Promise<BigNumber>;

  getNumWords(overrides?: CallOverrides): Promise<BigNumber>;

  getNumberOfPlayers(overrides?: CallOverrides): Promise<BigNumber>;

  getPlayer(
    index: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getRaffleState(overrides?: CallOverrides): Promise<number>;

  getRecentWinner(overrides?: CallOverrides): Promise<string>;

  getRequestConfirmations(overrides?: CallOverrides): Promise<BigNumber>;

  performUpkeep(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  rawFulfillRandomWords(
    requestId: PromiseOrValue<BigNumberish>,
    randomWords: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    checkUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean, string] & { upkeepNeeded: boolean }>;

    enterRaffle(overrides?: CallOverrides): Promise<void>;

    getEntranceFee(overrides?: CallOverrides): Promise<BigNumber>;

    getLatestTimeStamp(overrides?: CallOverrides): Promise<BigNumber>;

    getNumWords(overrides?: CallOverrides): Promise<BigNumber>;

    getNumberOfPlayers(overrides?: CallOverrides): Promise<BigNumber>;

    getPlayer(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getRaffleState(overrides?: CallOverrides): Promise<number>;

    getRecentWinner(overrides?: CallOverrides): Promise<string>;

    getRequestConfirmations(overrides?: CallOverrides): Promise<BigNumber>;

    performUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    rawFulfillRandomWords(
      requestId: PromiseOrValue<BigNumberish>,
      randomWords: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "RaffleEnter(address)"(
      player?: PromiseOrValue<string> | null
    ): RaffleEnterEventFilter;
    RaffleEnter(player?: PromiseOrValue<string> | null): RaffleEnterEventFilter;

    "RaffleRequestedWinner(uint256)"(
      requestId?: PromiseOrValue<BigNumberish> | null
    ): RaffleRequestedWinnerEventFilter;
    RaffleRequestedWinner(
      requestId?: PromiseOrValue<BigNumberish> | null
    ): RaffleRequestedWinnerEventFilter;

    "WinnerPicked(address)"(
      winner?: PromiseOrValue<string> | null
    ): WinnerPickedEventFilter;
    WinnerPicked(
      winner?: PromiseOrValue<string> | null
    ): WinnerPickedEventFilter;
  };

  estimateGas: {
    checkUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    enterRaffle(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getEntranceFee(overrides?: CallOverrides): Promise<BigNumber>;

    getLatestTimeStamp(overrides?: CallOverrides): Promise<BigNumber>;

    getNumWords(overrides?: CallOverrides): Promise<BigNumber>;

    getNumberOfPlayers(overrides?: CallOverrides): Promise<BigNumber>;

    getPlayer(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRaffleState(overrides?: CallOverrides): Promise<BigNumber>;

    getRecentWinner(overrides?: CallOverrides): Promise<BigNumber>;

    getRequestConfirmations(overrides?: CallOverrides): Promise<BigNumber>;

    performUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    rawFulfillRandomWords(
      requestId: PromiseOrValue<BigNumberish>,
      randomWords: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    checkUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    enterRaffle(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getEntranceFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLatestTimeStamp(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNumWords(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNumberOfPlayers(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPlayer(
      index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRaffleState(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRecentWinner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRequestConfirmations(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    performUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    rawFulfillRandomWords(
      requestId: PromiseOrValue<BigNumberish>,
      randomWords: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}

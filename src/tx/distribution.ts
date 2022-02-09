import { Coin } from ".";
import {
  MsgFundCommunityPool as MsgFundCommunityPoolProto,
  MsgSetWithdrawAddress as MsgSetWithdrawAddressProto,
  MsgWithdrawDelegatorReward as MsgWithdrawDelegatorRewardProto,
  MsgWithdrawValidatorCommission as MsgWithdrawValidatorCommissionProto,
  protobufPackage,
} from "../protobuf_stuff/cosmos/distribution/v1beta1/tx";
import { AminoMsg, Msg, ProtoMsg } from "./types";

export type MsgSetWithdrawAddressParams = MsgSetWithdrawAddressProto;

export class MsgSetWithdrawAddress implements Msg {
  constructor(msg: MsgSetWithdrawAddressParams) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgSetWithdrawAddress not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgSetWithdrawAddress not implemented.");
  }
}

export type MsgWithdrawDelegatorRewardParams = MsgWithdrawDelegatorRewardProto;

export class MsgWithdrawDelegatorReward implements Msg {
  public delegatorAddress: string;
  public validatorAddress: string;

  constructor({
    delegatorAddress,
    validatorAddress,
  }: MsgWithdrawDelegatorRewardParams) {
    this.delegatorAddress = delegatorAddress;
    this.validatorAddress = validatorAddress;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent: MsgWithdrawDelegatorRewardProto = {
      delegatorAddress: this.delegatorAddress,
      validatorAddress: this.validatorAddress,
    };

    return {
      typeUrl: `/${protobufPackage}.MsgWithdrawDelegatorReward`,
      value: msgContent,
      encode: () => MsgWithdrawDelegatorRewardProto.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgWithdrawDelegationReward", // wtf
      value: {
        delegator_address: this.delegatorAddress,
        validator_address: this.validatorAddress,
      },
    };
  }
}

// proto and amino names are different, export both names
export { MsgWithdrawDelegatorReward as MsgWithdrawDelegationReward };

export type MsgWithdrawValidatorCommissionParams =
  MsgWithdrawValidatorCommissionProto;

export class MsgWithdrawValidatorCommission implements Msg {
  constructor(msg: MsgWithdrawValidatorCommissionParams) {}

  async toProto(): Promise<ProtoMsg> {
    throw new Error("MsgWithdrawValidatorCommission not implemented.");
  }

  async toAmino(): Promise<AminoMsg> {
    throw new Error("MsgWithdrawValidatorCommission not implemented.");
  }
}

export type MsgFundCommunityPoolParams = MsgFundCommunityPoolProto;

export class MsgFundCommunityPool implements Msg {
  public depositor: string;
  public amount: Coin[];

  constructor({ depositor, amount }: MsgFundCommunityPoolParams) {
    this.depositor = depositor;
    this.amount = amount;
  }

  async toProto(): Promise<ProtoMsg> {
    const msgContent: MsgFundCommunityPoolProto = {
      depositor: this.depositor,
      amount: this.amount,
    };

    return {
      typeUrl: `/${protobufPackage}.MsgFundCommunityPool`,
      value: msgContent,
      encode: () => MsgFundCommunityPoolProto.encode(msgContent).finish(),
    };
  }

  async toAmino(): Promise<AminoMsg> {
    return {
      type: "cosmos-sdk/MsgFundCommunityPool",
      value: {
        depositor: this.depositor,
        amount: this.amount,
      },
    };
  }
}

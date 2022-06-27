import { Interface } from "@ethersproject/abi";
import { Contract, ContractTransaction } from "ethers";

export const increaseTime = async (ethers: any, timeToMoveForward: number) => {
    ethers.provider.send("evm_increaseTime", [timeToMoveForward]);
    ethers.provider.send("evm_mine");
}

export const timeInSeconds = () => Math.round((new Date()).getTime() / 1000);

export const getEvent = async (tx: ContractTransaction, name: string, contract: Contract) => {
    const event = (await tx.wait()).events!.filter((x) => x.event === name)[0];
    return contract.interface.parseLog(event);
}
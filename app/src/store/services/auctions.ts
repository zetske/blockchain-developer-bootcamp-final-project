import { BigNumber, Contract } from 'ethers';

export interface BuyPayload {
  myNFTContract: Contract;
  address: string;
}
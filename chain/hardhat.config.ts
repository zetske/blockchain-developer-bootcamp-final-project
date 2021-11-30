import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
  },
  namedAccounts: {
    deployer: 0,
    tokenOwner: 1,
    ticketCrew: 2,
    ticketHolder1: 3,
    ticketHolder2: 4,
  },
  paths: {
    sources: "src",
  },
};
export default config;

import chaiModule from 'chai';
import {chaiEthers} from 'chai-ethers'; 
import { solidity } from "ethereum-waffle";
chaiModule.use(chaiEthers);
chaiModule.use(solidity);
export = chaiModule;
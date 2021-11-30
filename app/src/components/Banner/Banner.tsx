import React from "react";
import classes from "./Banner.module.scss";

function Banner() {
  return (
    <div className={classes.Banner}>
      <a href='https://github.com/zetske/blockchain-developer-bootcamp-final-project' target="_blank" rel="noopener noreferrer">Details</a>
      <span className={classes.divider}></span>
      <a href='https://github.com/zetske/blockchain-developer-bootcamp-final-project/blob/main/chain/src/MyNFT.sol' target="_blank" rel="noopener noreferrer">Smart Contract</a>
      <span className={classes.divider}></span>
      <a href='https://rinkeby.etherscan.io/address/0x952e751565061097d0becD5B18B29F6033C589d3' target="_blank" rel="noopener noreferrer">Etherscan</a>
    </div>
  );
}

export default Banner;

import React from "react";
import classes from "./Banner.module.scss";

function Banner() {
  return (
    <div className={classes.Banner}>
      <a href='https://github.com/zetske' target="_blank" rel="noopener noreferrer">Details</a>
      <span className={classes.divider}></span>
      <a href='https://github.com/zetske/blockchain-developer-bootcamp-final-project' target="_blank" rel="noopener noreferrer">Smart Contract</a>
      <span className={classes.divider}></span>
      <a href='https://rinkeby.etherscan.io/address/0x0389c3577182d9Db47204f2474A8037f4badcBeD' target="_blank" rel="noopener noreferrer">Etherscan</a>
    </div>
  );
}

export default Banner;

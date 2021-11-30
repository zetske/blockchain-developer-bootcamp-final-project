
import React, { useContext, useState } from "react";
import classes from "./NetworkModal.module.scss";
import { useWallets } from "../../store/walletContext/WalletContext";
import { Overlay } from "~/components";
import { Close } from "../Icons";

interface Props {
  closeNetworkModal: any;
}

function NetworkModal(props: Props) {

  const { setShowWalletModal } = useWallets();
  const handleClickAway = () => {
    props.closeNetworkModal(false);
  };

  return (
    <Overlay handleClickAway={handleClickAway}>
      <div className={classes.WalletModal}>
        {/* <h1>Connect your wallet</h1> */}
        <Close className={classes.closeIcon} onClick={props.closeNetworkModal}/>
        <h2>Please switch to Rinkeby Testnet to continue with transaction</h2>
      </div>
    </Overlay>
  );
}

export default NetworkModal;

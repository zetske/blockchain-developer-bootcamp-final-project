import React, { useContext, useState } from "react";
import classes from "./WalletModal.module.scss";
import { useWallets } from "../../store/walletContext/WalletContext";
import WalletButton from "./WalletButton/WalletButton";
import { Overlay } from "~/components";
import { Close } from "../Icons";

function WalletModal() {
  const { enabledWallets, setShowWalletModal } = useWallets();
  const handleClickAway = () => {
    setShowWalletModal(false);
  };

  const buttons = enabledWallets.map((wallet) => (
    <WalletButton
      key={wallet.name}
      connectFunction={wallet.connectFunction}
      selected={wallet.selected}
      activating={wallet.activating}
      active={wallet.active}
      name={wallet.name}
      displayLabel={wallet.displayLabel}
      Icon={wallet.icon}
      description={wallet.description}
    />
  ));

  return (
    <Overlay handleClickAway={handleClickAway}>
      <div className={classes.WalletModal}>
        {/* <h1>Connect your wallet</h1> */}
        <Close className={classes.closeIcon} onClick={() => setShowWalletModal(false)}/>
        <div className={classes.WalletButtons}>{buttons}</div>
      </div>
    </Overlay>
  );
}

export default WalletModal;

import React from "react";
import classes from "./WalletDropdownMenu.module.scss";
import SimpleMenuWrapper from "../SimpleMenuWrapper/SimpleMenuWrapper";
import { useWallets } from "~/store/walletContext/WalletContext";

interface Props {
  closeMenu: any;
  className?: string;
}

export default function WalletDropdownMenu({ className, closeMenu }: Props) {
  const { disconnectWallet, wallet } = useWallets();
  const handleDisconnect = () => {
    disconnectWallet(wallet);
    closeMenu();
  };

  return (
    <div className={`${classes.WalletDropdownMenu} ${className && className}`}>
      <SimpleMenuWrapper closeMenu={closeMenu}>
        <button onClick={handleDisconnect}>Disconnect</button>
      </SimpleMenuWrapper>
    </div>
  );
}

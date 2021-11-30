import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useWallets } from "~/store/walletContext/WalletContext";
import classes from "./Layout.module.scss";
import { Navbar } from "~/components";
const WalletModal = dynamic(import("~/components/WalletModal/WalletModal"));

interface Props {
  children?: React.ReactChild;
  nftTitle?: string;
  collectionTitle?: string;
}

export default function Layout({ children }: Props) {
  const { showWalletModal } = useWallets();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={classes.Layout}>
      <Head>
        <link key="favicon" rel="icon" href="/logo.svg" color="#FA9579" />
      </Head>
      {showWalletModal && <WalletModal />}
      <Navbar
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <main className={classes.content}>{children}</main>
    </div>
  );
}

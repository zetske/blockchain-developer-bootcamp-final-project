import React, { useEffect, useState } from "react";
import Image from "next/image";
import classes from "~/styles/Home.module.scss";
import Layout from "~/components/Layout/Layout";
import { useStore } from "~/store/store";
import { WalletModal } from "~/components";
import { BuyPayload } from "~/store/services/auctions";
import { useContracts } from "~/store/contractContext/contractContext";
import ImageWithFallback from "~/components/ImageWithFallback/ImageWithFallback";
import Banner from "~/components/Banner/Banner";
import { ethers } from "ethers";
import { useWallets } from "~/store/walletContext/WalletContext";
import TransactionModal from "~/components/TransactionModal/TransactionModal";
import NetworkModal from "~/components/NetworkModal/NetworkModal";
import { TransactionState } from "~/utils";

interface Props {}

export const buyTicket = async (payload: BuyPayload) => {
  const { myNFTContract, address } = payload;

  return myNFTContract.mintNFT(address, {
    from: address,
    value: ethers.utils.parseEther("0.05"),
    maxPriorityFeePerGas: null,
    maxFeePerGas: null
  });
};

export default function Home(props: Props) {
  const { state } = useStore();
  const { contracts } = useContracts();
  const { setShowWalletModal, showWalletModal } = useWallets();
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [txState,setTxState] = useState<TransactionState>("pristine")

  const chainIdAsInt =
    state?.provider?.chainId && parseInt(state.provider.chainId, 16);

  const isNetworkIncorrect = chainIdAsInt !== 4;

  const handleBuy = async () => {
    if (state.isWalletConnected) {
      if (!isNetworkIncorrect) {
        const tx = await buyTicket({
          address: state.userAddress,
          myNFTContract: contracts.MyNFTContract,
        });
        setTxState("pending")
        contracts.MyNFTContract.on('Transfer', function(from, minter, tokenId, txData){
          console.log({
            on: 'Transfer',
            from,
            minter,
            tokenId,
            txData
          })
          setTxState("success")
        })
        console.log("tx", tx, tx.hash, tx.status);
        setTransactionHash(tx.hash);
        setShowTransactionModal(true);
        console.log({ showTransactionModal });
      } else {
        setShowNetworkModal(true);
        console.log({ setShowNetworkModal });
      }
    } else {
      setShowWalletModal(true);
      console.log({ showWalletModal });
    }
  };
  const closeSuccess = () => setShowTransactionModal(false);
  const closeNetwork = () => setShowNetworkModal(false);

  return (
    <Layout>
      <div className={classes.home}>
        <div className={classes.text}>
          <h3>Ignite your flame</h3>
          <h1>
            Burning Man 2022<br></br>Now on sale
          </h1>
          <button type="button" onClick={() => handleBuy()}>
            {state.isWalletConnected
              ? "Get Your Ticket"
              : "Connect To Get Started"}
          </button>
        </div>
        <Banner />
        <div className={classes.imageContainer}>
          <ImageWithFallback
            src="/background2.png"
            fallbackSrc="/background2.png"
            alt="nft"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        {showTransactionModal && (
          <TransactionModal
            transactionState={txState}
            closeTransactionModal={closeSuccess}
            etherscanLink={`https://rinkeby.etherscan.io/tx/${transactionHash}`}
          />
        )}
        {showNetworkModal && <NetworkModal closeNetworkModal={closeNetwork} />}
      </div>
    </Layout>
  );
}

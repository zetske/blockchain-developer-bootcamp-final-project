import React, { useContext, useState } from "react";
import classes from "./TransactionModal.module.scss";
import { useWallets } from "../../store/walletContext/WalletContext";
import { Overlay } from "~/components";
import { Close, Spinner } from "../Icons";
import { TransactionState } from "~/utils";

interface Props {
  transactionState: TransactionState;
  etherscanLink: string;
  closeTransactionModal: any;
}

function TransactionModal(props: Props) {
  //const { setShowWalletModal } = useWallets();
  const handleClickAway = () => {
    props.closeTransactionModal(false);
  };

  return (
    <Overlay handleClickAway={handleClickAway}>
      <div className={classes.TransactionModal}>
        <Close
          className={classes.closeIcon}
          onClick={props.closeTransactionModal}
        />
        {props.transactionState === "pending" && (
          <>
          <Spinner className={classes.spinner} />
          <h2>Transaction pending..</h2>
          </>
        )}
        {props.transactionState === "success" && (
          <>
            <h2>Success!</h2>
            <h2>
              You can view your transaction on{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={props.etherscanLink}
              >
                Etherscan
              </a>
            </h2>
          </>
        )}
      </div>
    </Overlay>
  );
}

export default TransactionModal;

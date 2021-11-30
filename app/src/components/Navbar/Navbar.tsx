import React, { useState } from "react";
import styled from "@emotion/styled";
import { Dropdown, Logo } from "../Icons";
import classes from "./Navbar.module.scss";
import { useWallets } from "../../store/walletContext/WalletContext";
import { useStore } from "~/store/store";
import WalletDropdownMenu from "../WalletDropdownMenu/WalletDropdownMenu";
import { shortenAddress } from "~/utils";
interface Props {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar(props: Props) {
  const { state } = useStore();
  const { setShowWalletModal, showWalletModal } = useWallets();
  const [showDropdown, setShowDropdown] = useState(false);

  const Div = styled.div`
    transform: ${(props) =>
      showDropdown ? `rotate(-180deg)` : `rotate(0deg)`};
  `;

  const chainIdAsInt =
    state?.provider?.chainId && parseInt(state.provider.chainId, 16);
  const isCorrectChainId = chainIdAsInt === 4;
  const shortAddress = shortenAddress(state.userAddress);

  return (
    <header className={classes.Navbar}>
      <Logo className={classes.logo}/>
      <>
        <span className={classes.divider}></span>
        {state.isWalletConnected ? (
          <button
            className={`${classes.button} ${classes.avatar}`}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {isCorrectChainId ? shortAddress : "Incorrect Network"}
            <Div className={classes.chevronButton}>
              <Dropdown className={classes.dropdownButton} />
            </Div>
          </button>
        ) : (
          <button
            className={classes.button}
            onClick={() => setShowWalletModal(!showWalletModal)}
          >
            <p>Connect Wallet</p>
          </button>
        )}
      </>
      {showDropdown && (
        <WalletDropdownMenu closeMenu={() => setShowDropdown(false)} />
      )}
    </header>
  );
}

export default React.memo(Navbar);

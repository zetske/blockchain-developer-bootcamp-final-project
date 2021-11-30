import React from "react";
import classes from "./WalletButton.module.scss";

export interface Props {
  name: string;
  displayLabel: string;
  description: string;
  connectFunction: () => void;
  selected: boolean;
  activating: boolean;
  active: boolean;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

function WalletButton(props: Props) {
  const { Icon, description } = props;

  const handleClick = () => {
    props.connectFunction && props.connectFunction();
  };

  const label = props.activating
    ? "Connecting..."
    : props.active
    ? "Connected"
    : `${props.displayLabel}`;

  return (
    <button className={classes.WalletButton} onClick={handleClick}>
      <Icon className={classes.icon} />
      <h4>{label}</h4>
    </button>
  );
}

export default WalletButton;

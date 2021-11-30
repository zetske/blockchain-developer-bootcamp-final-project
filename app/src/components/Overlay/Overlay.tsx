import React from 'react';
import classes from './Overlay.module.scss';
import ClickAwayListener from 'react-click-away-listener';

export interface Props {
  handleClickAway?: () => void;
  children: React.ReactElement<any>;
  className?: string;
}

function Overlay({
  children,
  handleClickAway = () => {},
  className = '',
}: Props) {
  const click = (event: any) => {
    event.stopPropagation();
    handleClickAway();
  };

  return (
    <div className={`${classes.Overlay} ${className}`}>
      <ClickAwayListener onClickAway={click}>{children}</ClickAwayListener>
    </div>
  );
}

export default React.memo(Overlay);

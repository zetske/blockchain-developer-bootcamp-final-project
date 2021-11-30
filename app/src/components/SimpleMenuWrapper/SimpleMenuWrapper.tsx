import React from 'react';
import classes from './SimpleMenuWrapper.module.scss';
import ClickAwayListener from 'react-click-away-listener';

interface Props {
  closeMenu: any;
  className?: string;
  children: React.ReactElement<any>;
}

export default function SimpleMenuWrapper({
  className,
  closeMenu,
  children,
}: Props) {
  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <div className={`${classes.SimpleMenuWrapper} ${className && className}`}>
        {children}
      </div>
    </ClickAwayListener>
  );
}

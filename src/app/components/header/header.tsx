"use client";

import { useState } from "react";

import style from "./header.module.scss";

import { Cart } from "@/app/icons/cart";
import { MobileMenu } from "@/app/icons/menu";
import { CloseMobileMenu } from "@/app/icons/close";
import { Logo } from "../logo/logo";
import { MenuItems } from "./navigation/menuItems/menuItems";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleShowMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className={style.header}>
      {showMobileMenu ? (
        <div className={style.header__hide} onClick={handleShowMobileMenu}>
          <CloseMobileMenu />
        </div>
      ) : (
        <div className={style.header__hide} onClick={handleShowMobileMenu}>
          <MobileMenu />
        </div>
      )}
      <Logo className={style.logo__mobile} />
      <ul className={style.navigation}>
        <MenuItems />
      </ul>
      <div className={style.block}>
        <div className={style.cart}>
          <Cart />
          <div className={style.cart__circle}>1</div>
        </div>
        <div className={style.price}>
          <div className={style.price__title}>Total</div>
          <div className={style.price__amount}>€ 2435</div>
        </div>
        <div className={style.login}>Sign In</div>
      </div>
    </header>
  );
};

export default Header;

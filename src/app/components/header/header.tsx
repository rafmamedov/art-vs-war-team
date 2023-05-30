"use client";

import { useEffect, useState } from "react";

import style from "./header.module.scss";

import { Cart } from "@/app/icons/cart";
import { MobileMenu } from "@/app/icons/menu";
import { CloseMobileMenu } from "@/app/icons/close";
import { Logo } from "../logo/logo";
import { MenuItems } from "./navigation/menuItems/menuItems";
import LoginButton from "./navigation/login-button/login-button";
import SocialNetworkIcons from "../social-network/social-network";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleShowMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      showMobileMenu
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "auto");
    }
  }, [showMobileMenu]);

  return (
    <header>
      <div className={style.header}>
        {showMobileMenu ? (
          <div
            className={style.header__mobileElement}
            onClick={handleShowMobileMenu}
          >
            <CloseMobileMenu />
          </div>
        ) : (
          <div
            className={style.header__mobileElement}
            onClick={handleShowMobileMenu}
          >
            <MobileMenu />
          </div>
        )}
        <Logo className={style.logo} />
        <nav className={style.navigation}>
          <MenuItems />
        </nav>
        <div className={style.cart__container}>
          <div className={style.cart}>
            <Cart />
            <div className={style.cart__circle}>1</div>
          </div>
          <div className={style.price}>
            <div className={style.price__title}>Total</div>
            <div className={style.price__amount}>€ 2435</div>
          </div>
          <LoginButton className={style.loginDesktop} />
        </div>
      </div>
      <hr className={style.line}></hr>

      <nav
        className={`${style.mobileNavigation} ${
          showMobileMenu
            ? style.showMobileNavigation
            : style.hideMobileNavigation
        }`}
      >
        <div>
          <LoginButton className={style.loginMobile} />
          <MenuItems />
        </div>
        <div className={style.contacts}>
          <p className={style.contacts__title}>Contacts</p>
          <div className={style.contacts__icons}>
            <SocialNetworkIcons />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

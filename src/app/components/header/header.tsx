"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Cart } from "@/app/icons/icon-cart";
import { CloseIcon } from "@/app/icons/icon-close";
import { MobileMenu } from "@/app/icons/icon-menu";
import { setShowMobileMenu } from "@/app/redux/slices/showUpSlice";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import { Logo } from "../logo/logo";
import { MenuItems } from "../menuItems/menuItems";
import SocialNetworkIcons from "../social-network/social-network";
import LoginButton from "./navigation/login-button/login-button";

import style from "./header.module.scss";

const Header = () => {
  const dispatch = useAppDispatch();
  const showMobileMenu = useAppSelector((state) => state.showUp.showMobileMenu);
  const { paintings, totalPrice } = useAppSelector((state) => state.cart);

  const handleShowMobileMenu = () => {
    dispatch(setShowMobileMenu(!showMobileMenu));
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
            <CloseIcon />
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
          <MenuItems className={style.menuItems} />
        </nav>
        <div className={style.cart__container}>
          <Link href={`/cart`}>
            <div className={style.cart}>
              <Cart />
              <div className={style.cart__circle}>{paintings.length}</div>
            </div>
          </Link>
          <Link href={`/cart`}>
            <div className={style.price}>
              <div className={style.price__title}>Total</div>
              <div className={style.price__amount}>{`€ ${totalPrice}`}</div>
            </div>
          </Link>

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
          <MenuItems className={style.menuItems} />
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

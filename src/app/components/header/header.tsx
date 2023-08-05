"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Cart } from "@/app/icons/icon-cart";
import { CloseIcon } from "@/app/icons/icon-close";
import { MobileMenu } from "@/app/icons/icon-menu";
import { ProfileIcon } from "@/app/icons/icon-profile";
import { setDataFromLocalStorage } from "@/app/redux/slices/cartSlice";
import { setShowMobileMenu } from "@/app/redux/slices/showUpSlice";
import { DataFromLocalStorage } from "@/types/CartItem";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";
import getDataFromLocalStorage from "@/utils/getDataFromLocalStorage";
import { Logo } from "../logo/logo";
import { MenuItems } from "../menuItems/menuItems";
import SocialNetworkIcons from "../social-network/social-network";
import LoginButton from "./navigation/login-button/login-button";

import style from "./header.module.scss";

const Header = () => {
  const dispatch = useAppDispatch();
  const showMobileMenu = useAppSelector((state) => state.showUp.showMobileMenu);
  const { paintings, totalPrice } = useAppSelector((state) => state.cart);
  const { user } = useAuthenticator((context) => [
    context.route,
  ]);

  const handleShowMobileMenu = () => {
    dispatch(setShowMobileMenu(!showMobileMenu));
  };

  const handleCloseMobileMenu = () => {
    dispatch(setShowMobileMenu(false));
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      showMobileMenu
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "auto");
    }
  }, [showMobileMenu]);

  const isMounted = useRef(false);

  useEffect(() => {
    const data: DataFromLocalStorage = getDataFromLocalStorage();
    dispatch(setDataFromLocalStorage(data));
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(paintings);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [paintings]);

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
        <Link href={"/"} onClick={handleCloseMobileMenu}>
          <Logo />
        </Link>

        <nav className={style.navigation}>
          <MenuItems className={style.menuItems} />
        </nav>
        <div className={style.cart__container}>
          <Link href={`/cart`}>
            <div className={style.cart}>
              <Cart />
              {paintings.length > 0 && (
                <div className={style.cart__circle}>{paintings.length}</div>
              )}
            </div>
          </Link>
          <div className={style.price}>
            <Link href={`/cart`}>
              <div className={style.price__title}>Total</div>
              <div className={style.price__amount}>{`€ ${totalPrice}`}</div>
            </Link>
          </div>
          {user && (
            <Link href={`/profile`}>
              <div className={style.profile}>
                <ProfileIcon />
              </div>
            </Link>
          )}
          {!user && (
            <Link href={`/profile`}>
              <LoginButton className={style.loginDesktop} />
            </Link>
          )}
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

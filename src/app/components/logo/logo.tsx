"use client";

import Image from "next/image";
import Link from "next/link";

import { setShowMobileMenu } from "@/app/redux/slices/showUpSlice";
import { useAppDispatch } from "@/types/ReduxHooks";

import style from "./logo.module.scss";

export const Logo = () => {
  const dispatch = useAppDispatch();

  const handleCloseMobileMenu = () => {
    dispatch(setShowMobileMenu(false));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.image__wrapper}>
        <Link href={"/"} onClick={handleCloseMobileMenu}>
          <Image
            src="/assets/logo_icon.svg"
            alt="Art gallery logo"
            fill
            sizes="10vw"
            className={style.image}
          />
        </Link>
      </div>
      <p className={style.text}>ART VS WAR</p>
    </div>
  );
};

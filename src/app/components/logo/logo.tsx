"use client";

import Image from "next/image";
import Link from "next/link";

import { setShowMobileMenu } from "@/app/redux/slices/showUpSlice";
import { useAppDispatch } from "@/types/ReduxHooks";

import style from "./logo.module.scss";

type Props = {
  className: string;
};

export const Logo: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();

  const handleCloseMobileMenu = () => {
    dispatch(setShowMobileMenu(false));
  };

  return (
    <Link href={"/"} onClick={handleCloseMobileMenu}>
      <div className={`${className} ${style.wrapper}`}>
        <div className={style.image__wrapper}>
          <Image
            src="/assets/logo_icon.svg"
            alt="Art gallery logo"
            fill
            sizes="10vw"
            className={style.image}
          />
        </div>
        <p className={style.text}>ART VS WAR</p>
      </div>
    </Link>
  );
};

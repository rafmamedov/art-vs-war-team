"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";

import { setShowMobileMenu } from "@/app/redux/slices/showUpSlice";
import { useAppDispatch } from "@/types/ReduxHooks";

import style from "./menuItems.module.scss";

type Props = {
  className?: string;
};

export const MenuItems: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { user } = useAuthenticator((context) => [context.route]);

  const handleCloseMobileMenu = () => {
    dispatch(setShowMobileMenu(false));
  };

  return (
    <ul className={className}>
      {user && (
        <li className={style.profile}>
          <Link href={"/profile"} onClick={handleCloseMobileMenu}>
            Profile
          </Link>
        </li>
      )}
      <li>
        <Link href={"/gallery"} onClick={handleCloseMobileMenu}>
          Gallery
        </Link>
      </li>
      <li>
        <Link href={"/artists"} onClick={handleCloseMobileMenu}>
          Artists
        </Link>
      </li>
      <li>
        <Link href={"/delivery"} onClick={handleCloseMobileMenu}>
          Donation
        </Link>
      </li>
      <li>
        <Link href={"/#about"} onClick={handleCloseMobileMenu}>
          About
        </Link>
      </li>
      <li>
        <Link href={"/#contacts"} onClick={handleCloseMobileMenu}>
          Contacts
        </Link>
      </li>
    </ul>
  );
};

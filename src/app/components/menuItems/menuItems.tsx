"use client";

import Link from "next/link";

import { useAppDispatch } from "@/types/ReduxHooks";
import { setShowMobileMenu } from "@/app/redux/slices/showUpSlice";
type Props = {
  className?: string;
};

export const MenuItems: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();

  const handleCloseMobileMenu = () => {
    dispatch(setShowMobileMenu(false));
  };

  return (
    <ul className={className}>
      <li>
        <Link href={"/gallery"} onClick={handleCloseMobileMenu}>
          Gallery
        </Link>
      </li>
      <li>
        <a href={"/artists"} onClick={handleCloseMobileMenu}>
          Artists
        </a>
      </li>
      <li>
        <a href={"/delivery"} onClick={handleCloseMobileMenu}>
          Donation
        </a>
      </li>
      <li>
        <a href={"/#about"} onClick={handleCloseMobileMenu}>
          About
        </a>
      </li>
      <li>
        <a href={"/#contacts"} onClick={handleCloseMobileMenu}>
          Contacts
        </a>
      </li>
    </ul>
  );
};

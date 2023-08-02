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

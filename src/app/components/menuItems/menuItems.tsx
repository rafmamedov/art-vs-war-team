"use client";

import Link from "next/link";

import { useAppDispatch } from "@/types/ReduxHooks";
import { setShowMobileMenu } from "@/app/redux/slices/showUpSlice";
import { useAuthenticator } from "@aws-amplify/ui-react";
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
        <li>
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

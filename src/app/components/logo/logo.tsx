"use client";

import { setShowMobileMenu } from "@/app/redux/slices/showUpSlice";
import { useAppDispatch } from "@/types/ReduxHooks";
import Image from "next/image";
import Link from "next/link";

type Props = {
  className: string;
};

export const Logo: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();

  const handleCloseMobileMenu = () => {
    dispatch(setShowMobileMenu(false));
  };

  return (
    <div className={className}>
      <Link href={"/"} onClick={handleCloseMobileMenu}>
        <Image src="/assets/logo.png" alt="Art gallery logo" fill />
      </Link>
    </div>
  );
};

"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  className: string;
};

export const Logo: React.FC<Props> = ({ className }) => {


  return (
    <div className={className}>
      <Link href={"/"}>
        <Image
          src="/assets/logo.png"
          alt="Art gallery logo"
          fill
        />
      </Link>
    </div>
  );
};

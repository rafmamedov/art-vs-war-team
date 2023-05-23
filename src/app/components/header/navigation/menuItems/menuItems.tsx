import Link from "next/link";

import style from "./menuItems.module.scss";

export const MenuItems = () => {
  return (
    <>
      <li>
        <Link href={"/gallery"} className={style.items}>
          Gallery
        </Link>
      </li>
      <li>
        <a href={"/#about"} className={style.items}>
          About
        </a>
      </li>
      <li>
        <a href={"/artists"} className={style.items}>
          Artists
        </a>
      </li>
      <li>
        <a href={"/delivery"} className={style.items}>
          Donation
        </a>
      </li>
      <li>
        <a href={"/#contacts"} className={style.items}>
          Contacts
        </a>
      </li>
    </>
  );
};

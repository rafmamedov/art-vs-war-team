import Link from "next/link";

type Props = {
  className?: string;
};

export const MenuItems: React.FC<Props> = ({ className }) => {
  return (
    <ul className={className}>
      <li>
        <Link href={"/gallery"}>Gallery</Link>
      </li>
      <li>
        <a href={"/artists"}>Artists</a>
      </li>
      <li>
        <a href={"/delivery"}>Donation</a>
      </li>
      <li>
        <a href={"/#about"}>About</a>
      </li>
      <li>
        <a href={"/#contacts"}>Contacts</a>
      </li>
    </ul>
  );
};

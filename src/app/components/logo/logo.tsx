import Image from "next/image";

type Props = {
  className: string;
};

export const Logo: React.FC<Props> = ({ className }) => {

  return (
    <div className={className}>
      <Image
        src="/assets/logo.png"
        alt="Art gallery logo"
        fill
      />
    </div>
  );
};

import Image from "next/image";

import style from './logo.module.scss'

type Props = {
  className: string;
};

export const Logo: React.FC<Props> = ({ className }) => {

  return (
    <div className={className}>
      <Image
        src="/assets/logo.png"
        alt="Art vs war logo"
        fill
      />
    </div>
  );
};

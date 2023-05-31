import Image from "next/image";

import style from "./dataInfo-section.module.scss";

const DataInfo = () => {
  return (
    <section>
      <div className={style.data}>
        <div>
          <h4>567</h4>
          <p>PAINTINGS IN DATABASE</p>
        </div>
        <div>
          <h4>1000000 €</h4>
          <p>RAISED FUNDS</p>
        </div>
        <div>
          <h4>45</h4>
          <p>ARTISTS IN COMMUNITY</p>
        </div>
      </div>
      <div className={style.ornament}>
        <Image
          src="/assets/dataInfo.webp"
          alt="Ukrainian gallery ornament"
          width={1000}
          height={1000}
          className={style.image}
        />
      </div>
    </section>
  );
};

export default DataInfo;

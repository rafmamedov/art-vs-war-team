"use client";

import Image from "next/image";
import CountUp from "react-countup";

import style from "./dataInfo-section.module.scss";

const DataInfo = () => {
  return (
    <section className={style.dataInfo}>
      <div className={style.data}>
        <div className={style.info}>
          <h4 className={style.quantity}>
            <CountUp
              start={1}
              end={45}
              duration={4}
              decimals={0}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </h4>
          <p className={style.text}>ARTISTS IN COMMUNITY</p>
        </div>
        <div className={style.info}>
          <h4 className={style.quantity}>
            <CountUp
              start={1}
              end={567}
              duration={5}
              decimals={0}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </h4>
          <p className={style.text}>PAINTINGS IN DATABASE</p>
        </div>
        <div className={style.info}>
          <h4 className={style.quantity}>
            <CountUp
              start={1}
              end={1000000}
              duration={6}
              decimals={0}
              suffix=" €"
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </h4>
          <p className={style.text}>RAISED FUNDS</p>
        </div>
      </div>
      <div className={style.wrapper}>
        <button className={style.button}>Learn more</button>
        <div className={style.ornament}>
          <Image
            src="/assets/dataInfoMob.webp"
            alt="Ukrainian gallery ornament"
            width={1000}
            height={1000}
            className={style.imageMobile}
          />
          <Image
            src="/assets/dataInfoDesk.webp"
            alt="Ukrainian gallery ornament"
            width={1000}
            height={1000}
            className={style.imageDesktop}
          />
        </div>
      </div>
    </section>
  );
};

export default DataInfo;

import Image from "next/image";

import style from "./funds-section.module.scss";
import { Button } from "../../button/button";

const Funds = () => {
  return (
    <section className={style.funds}>
      <h2 className={style.title}>Funds</h2>
      <p className={style.description}>
        Our website raises funds for funds that help Ukraine, one of them is
        United 24. It supports Ukraine in protecting, saving, and rebuilding the
        country. Donations are delivered directly to those who need it most
        through one-click donations from anywhere
      </p>
      <div className={style.funds__container}>
        <div className={`${style.actor} ${style.actor__laptop}`}>
          <h6 className={style.actor__title}>Mark Hamill</h6>
          <p className={style.actor__description}>Actor, United24 Ambassador</p>
        </div>
        <div className={`${style.image} ${style.images}`}>
          <Image
            src="/assets/markHamill.webp"
            alt="Mark Hamill United24 Ambassador"
            width={432}
            height={600}
            className={style.image}
          />
        </div>
        <div className={style.image640}>
          <Image
            src="/assets/markHamill_640.webp"
            alt="Mark Hamill United24 Ambassador"
            width={700}
            height={350}
            className={style.image640}
          />
        </div>
        <div className={style.wrapper}>
          <div className={style.quote}>
            <Image
              src="/assets/quote.webp"
              alt="quote"
              width={72}
              height={96}
              className={style.quote__image}
            />
            <div className={style.quote__container}>
              <p className={style.quote__text}>
                You are winning. Don&apos;t doubt it for a second. Everyone said
                that Ukraine would fall in four days. Do you remember? But you
                proved to the whole world that Ukraine should not be touched
              </p>
              <div className={`${style.actor} ${style.actor__mobile}`}>                <h6 className={style.actor__title}>Mark Hamill</h6>
                <p className={style.actor__description}>
                  Actor, United24 Ambassador
                </p>
              </div>
            </div>
          </div>
          <Button label="Learn more" className={style.button} />
        </div>
      </div>
    </section>
  );
};

export default Funds;

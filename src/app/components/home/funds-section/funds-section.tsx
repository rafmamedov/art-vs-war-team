import Image from "next/image";

import style from "./funds-section.module.scss";

const Funds = () => {
  return (
    <section className={style.funds}>
      <div className={style.head}>
        <h2 className={style.head__title}>Funds</h2>

        <p className={style.head__description}>
          Our website raises funds for funds that help Ukraine, one of them is
          United 24. It supports Ukraine in protecting, saving, and rebuilding
          the country. Donations are delivered directly to those who need it
          most through one-click donations from anywhere
        </p>
      </div>

      <div className={style.container}>
        <div className={style.imageWrapper}>
          <Image
            src="/assets/markHamill.webp"
            alt="Mark Hamill United24 Ambassador"
            fill
            sizes="100vw"
            className={style.imageWrapper__image}
          />
        </div>
        <button className={`${style.button} ${style.button__desktop}`}>
          Learn more
        </button>
        <div className={style.quote}>
          <div className={style.quoteWrapper}>
            <Image
              src="/assets/quote.webp"
              alt="quote"
              width={72}
              height={96}
              className={style.quote__image}
            />
            <div className={style.quoteContainer}>
              <p className={style.text}>
                You are winning. Don&apos;t doubt it for a second. Everyone said
                that Ukraine would fall in four days. Do you remember? But you
                proved to the whole world that Ukraine should not be touched
              </p>
              <hr className={style.line}></hr>
              <div className={`${style.actor}`}>
                <h6 className={style.actor__title}>Mark Hamill</h6>
                <p className={style.actor__description}>
                  Actor, United24 Ambassador
                </p>
              </div>
            </div>
          </div>
          <button className={`${style.button} ${style.button__mobile}`}>
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Funds;

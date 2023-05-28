import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './hero.module.scss';

const Hero = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    if (window) {
      setScreenWidth(window.innerWidth);
    }

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenWidth > 639
    ? (
      <section className={styles.hero}>
        <div className={styles.top}>
          <h1 className={styles.top__title}>
            Buy Art
            <br />
            Help Ukraine
          </h1>

          <div className={styles.top__container2x1}>
            <Image
              src="/assets/images/Rectangle4.png"
              className={styles.image}
              alt="rectangle"
              width={544}
              height={240}
            />
          </div>
        </div>

        <div className={styles.middle}>
          <div className={styles.middle__left}>
            <div className={styles.top}>
              <div className={styles.top__container3x4}>
                <Image
                  src="/assets/images/hero-layout-cards.png"
                  className={styles.image}
                  alt="rectangle"
                  width={320}
                  height={360}
                />
              </div>

              <div className={styles.top__container5x4}>
                <Image
                  src="/assets/images/Rectangle 7.png"
                  className={styles.image}
                  alt="rectangle"
                  width={544}
                  height={360}
                />
              </div>
            </div>

            <div className={styles.bottom}>
              <div className={styles.bottom__container}>
                <div className={styles.bottom__container__2x1}>
                  <Image
                    src="/assets/images/Rectangle4.png"
                    className={styles.image}
                    alt="rectangle"
                    width={544}
                    height={240}
                  />
                </div>

                <div className={styles.button}>More artworks</div>
              </div>

              <div className={styles.bottom__container3x4}>
                <Image
                  src="/assets/images/Rectangle 5.png"
                  className={styles.image}
                  alt="rectangle"
                  width={320}
                  height={360}
                />
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.button}>Explore</div>

            <div className={styles.square}>
              <Image
                src="/assets/images/Rectangle 8.png"
                className={styles.image}
                alt="rectangle"
                width={208}
                height={208}
              />
            </div>

            <div className={styles.square}>
              <Image
                src="/assets/images/Rectangle 8.png"
                className={styles.image}
                alt="rectangle"
                width={208}
                height={208}
              />
            </div>
          </div>
        </div>
      </section>
    ) : (
      <section className={styles.mobile}>
        <h1 className={styles.mobile__title}>
          <span>Buy Art</span>
          <span>Help Ukraine</span>
        </h1>

        <Image
          src="/assets/images/Rectangle 7.png"
          className={styles.mobile__background}
          alt="background"
          fill
        />

        <div className={styles.mobile__button}>Explore</div>
      </section>
    );
};

export default Hero;

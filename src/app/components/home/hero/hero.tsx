import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './hero.module.scss';
import TabletXl from './tabletXl/tabletXl';
import Tablet from './tablet/tablet';
import Mobile from './mobile/mobile';

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

  if (screenWidth < 640) {
    return <Mobile />
  }

  if (screenWidth >= 640 && screenWidth < 768) {
    return <Tablet />;
  }

  if (screenWidth >= 768 && screenWidth < 1024) {
    return <TabletXl />;
  }

  return (
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
  );
};

export default Hero;

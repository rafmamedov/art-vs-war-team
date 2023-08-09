import Image from "next/image";
import Link from "next/link";

import styles from "./hero-section.module.scss";

const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.mobile}>
      <h1 className={styles.mobile__title}>
        Buy Art
        <br />
        Help Ukraine
      </h1>

      <Image
        src="/assets/images/Rectangle 7.png"
        className={styles.mobile__background}
        alt="background"
        fill
      />
      <Link href={"/gallery"} className={styles.mobile__button}>
        Explore
      </Link>
    </div>

    <div className={styles.tablet}>
      <div className={styles.tablet__left}>
        <h1 className={styles.left__title}>
          Buy Art
          <br />
          Help Ukraine
        </h1>

        <div className={styles.left__images}>
          <div className={styles.images__container}>
            <div className={styles.container__2x1}>
              <Image
                src="/assets/images/Rectangle 4.png"
                className={styles.image}
                alt="rectangle"
                fill
              />
            </div>

            <div className={styles.container__4x3}>
              <Image
                src="/assets/images/Rectangle 2.png"
                className={styles.image}
                alt="rectangle"
                fill
              />
            </div>

            <div className={styles.container__2x1}>
              <Image
                src="/assets/images/Rectangle 4.png"
                className={styles.image}
                alt="rectangle"
                fill
              />
            </div>
          </div>

          <div className={styles.images__container}>
            <div className={styles.square}>
              <Image
                src="/assets/images/Rectangle 6.png"
                className={styles.image}
                alt="rectangle"
                fill
              />
            </div>

            <div className={styles.container__4x3}>
              <Image
                src="/assets/images/Rectangle 2.png"
                className={styles.image}
                alt="rectangle"
                fill
              />
            </div>
          </div>

          <div className={styles.images__container_tabletXl}>
            <div className={styles.container__5x4}>
              <Image
                src="/assets/images/Rectangle 7.png"
                className={styles.image}
                alt="rectangle"
                fill
              />
            </div>

            <div className={styles.square}>
              <Image
                src="/assets/images/Rectangle 6.png"
                className={styles.image}
                alt="rectangle"
                fill
              />
            </div>
          </div>

          <div className={styles.images__container_tabletXl}>
            <div className={styles.container__3x4}>
              <Image
                src="/assets/images/Rectangle 3.png"
                className={styles.image}
                alt="rectangle"
                fill
              />
            </div>

            <div className={styles.container__5x4}>
              <Image
                src="/assets/images/Rectangle 7.png"
                className={styles.image}
                alt="rectangle"
                fill
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tablet__right}>
        <div className={styles.container__4x3}>
          <Image
            src="/assets/images/Rectangle 2.png"
            className={styles.image}
            alt="rectangle"
            fill
          />
        </div>
        <Link href={"/gallery"} className={styles.button}>
          Explore
        </Link>

        <div className={styles.container__2x3}>
          <Image
            src="/assets/images/Rectangle 3.png"
            className={styles.image}
            alt="rectangle"
            fill
          />
        </div>
      </div>
    </div>

    <div className={styles.desktop}>
      <div className={styles.top}>
        <h1 className={styles.top__title}>
          Buy Art
          <br />
          Help Ukraine
        </h1>
        <div className={styles.top__container2x1}>
          <Image
            src="/assets/images/Rectangle 4.png"
            className={styles.image}
            alt="rectangle"
            fill
          />
        </div>
        <div className={styles.top__square}>
          <Image
            src="/assets/images/Rectangle 6.png"
            className={styles.image}
            alt="rectangle"
            fill
          />
        </div>
        <div className={styles.top__square}>
          <Image
            src="/assets/images/Rectangle 6.png"
            className={styles.image}
            alt="rectangle"
            fill
          />
        </div>
      </div>

      <div className={styles.middle}>
        <div className={styles.right}>
          <Link href={"/gallery"} className={styles.button}>
            Explore
          </Link>

          <div className={styles.square}>
            <Image
              src="/assets/images/Rectangle 6.png"
              className={styles.image}
              alt="rectangle"
              fill
            />
          </div>
          <div className={styles.square}>
            <Image
              src="/assets/images/Rectangle 6.png"
              className={styles.image}
              alt="rectangle"
              fill
            />
          </div>
          <div className={styles.right__container2x1}>
            <Image
              src="/assets/images/Rectangle 4.png"
              className={styles.image}
              alt="rectangle"
              fill
            />
          </div>
          <div className={styles.right__container4x3}>
            <Image
              src="/assets/images/Rectangle 2.png"
              className={styles.image}
              alt="rectangle"
              fill
            />
          </div>
        </div>

        <div className={styles.left}>
          <div className={styles.left__top}>
            <div className={styles.container__3x4}>
              <Image
                src="/assets/images/Rectangle 3.png"
                className={styles.image}
                alt="rectangle"
                fill
              />
            </div>
            <div className={styles.container__5x4}>
              <Image
                src="/assets/images/Rectangle 7.png"
                className={styles.image}
                alt="rectangle"
                fill
              />
            </div>
          </div>
          <div className={styles.left__bottom}>
            <div className={styles.bottom__container}>
              <div className={styles.container__2x1}>
                <Image
                  src="/assets/images/Rectangle 4.png"
                  className={styles.image}
                  alt="rectangle"
                  fill
                />
              </div>
              <div className={styles.container__4x3_big}>
                <Image
                  src="/assets/images/Rectangle 4.png"
                  className={styles.image}
                  alt="rectangle"
                  fill
                />
              </div>
              <Link href={"/gallery"} className={styles.button}>
                More artworks
              </Link>
            </div>
            <div className={styles.container__5x4__laptop}>
              <Image
                src="/assets/images/Rectangle 7.png"
                className={styles.image}
                alt="rectangle"
                fill
              />
            </div>
            <div className={styles.container__3x4__desktop}>
              <Image
                src="/assets/images/Rectangle 5.png"
                className={styles.image}
                alt="rectangle"
                fill
              />
            </div>
            <div className={styles.container__square}>
              <Image
                src="/assets/images/Rectangle 6.png"
                className={styles.image}
                alt="rectangle"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;

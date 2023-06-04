import Image from 'next/image';
import styles from './desktop.module.scss';

const Desktop = () => (
  <section className={styles.desktop}>
    <div className={styles.top}>
      <h1 className={styles.top__title}>
        Buy Art
        <br />
        Help Ukraine
      </h1>

      <div className={styles.container__2x1}>
        <Image
          src="/assets/images/Rectangle 4.png"
          className={styles.image}
          alt="rectangle"
          fill
        />
      </div>
    </div>

    <div className={styles.middle}>
      <div className={styles.middle__left}>
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

            <div className={styles.button}>More artworks</div>
          </div>

          <div className={styles.container__3x4__bottom}>
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

      <div className={styles.right}>
        <div className={styles.button}>Explore</div>

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
      </div>
    </div>
  </section>
);

export default Desktop;

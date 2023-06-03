import Image from 'next/image';
import styles from './tabletXl.module.scss';

const TabletXl = () => (
  <section className={styles.tabletXl}>
    <div className={styles.tabletXl__left}>
      <h1 className={styles.left__title}>
        Buy Art
        <br />
        Help Ukraine
      </h1>

      <div className={styles.left__images}>
        <div className={styles.images__container}>
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

        <div className={styles.images__container}>
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

    <div className={styles.tabletXl__right}>
      <div className={styles.container__4x3}>
        <Image
          src="/assets/images/Rectangle 2.png"
          className={styles.image}
          alt="rectangle"
          fill
        />
      </div>

      <div className={styles.button}>Explore</div>

      <div className={styles.container__2x3}>
        <Image
          src="/assets/images/Rectangle 3.png"
          className={styles.image}
          alt="rectangle"
          fill
        />
      </div>
    </div>
  </section>
);

export default TabletXl;

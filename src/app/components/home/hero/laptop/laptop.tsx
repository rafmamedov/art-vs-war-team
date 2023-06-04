import Image from 'next/image';
import styles from './laptop.module.scss';

const Laptop = () => (
  <section className={styles.laptop}>
    <div className={styles.top}>
      <h1 className={styles.top__title}>
        Buy Art
        <br />
        Help Ukraine
      </h1>

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

    <div className={styles.middle}>
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

      <div className={styles.button}>Explore</div>
    </div>

    <div className={styles.bottom}>
      <div className={styles.bottom__container}>
        <div className={styles.container__4x3_big}>
          <Image
            src="/assets/images/Rectangle 4.png"
            className={styles.image}
            alt="rectangle"
            fill
          />
        </div>

        <div className={styles.bottom__button}>More artworks</div>
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
  </section>
);

export default Laptop;

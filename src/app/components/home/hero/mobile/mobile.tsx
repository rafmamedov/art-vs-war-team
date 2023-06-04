import Image from 'next/image';
import styles from './mobile.module.scss';

const Mobile = () => (
  <section className={styles.mobile}>
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

    <div className={styles.mobile__button}>Explore</div>
  </section>
);

export default Mobile;

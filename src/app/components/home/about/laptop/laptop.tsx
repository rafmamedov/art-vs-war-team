import Image from 'next/image';
import styles from './laptop.module.scss';

const Laptop = () => (
  <section className={styles.laptop}>
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h2 className={styles.title__white}>Art</h2>
          <h2 className={styles.title__black}>vs War</h2>
        </div>

      <div className={styles.lines}>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>

        <div className={styles.text}>
          Our project dedicated to supporting Ukrainian artists and creatives
          who have been displaced abroad due to the war in Ukraine. We offer
          a unique opportunity to purchase their artwork while contributing
          to a good cause.
          <br />
          <br />
          Each painting tells a story of Ukraine&apos;s struggle for freedom and
          independence. By purchasing a painting, you support the artist and
          contribute to the victory of Ukraine and democracy. Browse our collection
          and find a painting that speaks to you. You also can donate our project without
          purchasing a painting. Thank you for your support.
        </div>
      </div>

      <div className={styles.ornament}>
        <div className={styles.button}>Donate</div>
        <Image
          className={styles.image}
          src="/assets/images/button&ornament.png"
          alt="ornament"
          fill
        />
      </div>
    </div>
  </section>
);

export default Laptop;

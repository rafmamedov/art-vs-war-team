import Image from 'next/image';
import styles from './tablet.module.scss';

const Tablet = () => (
  <section className={styles.tablet}>
    <h2 className={styles.title__white}>Art</h2>

    <div className={styles.content}>
      <h2 className={styles.title__black}>vs War</h2>
      <p className={styles.text}>
        Our project dedicated to supporting Ukrainian artists 
        and creatives who have been displaced abroad due to 
        the war in Ukraine. We offer a unique opportunity 
        to purchase their artwork while contributing to 
        a good cause.
        <br />
        <br />
        Each painting tells a story of Ukraine&apos;s 
        struggle for freedom and independence. By purchasing 
        a painting, you support the artist and contribute 
        to the victory of Ukraine and democracy. Browse our 
        collection and find a painting that speaks to you. 
        You also can donate our project without purchasing 
        a painting. Thank you for your support.
      </p>
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
  </section>
);

export default Tablet;

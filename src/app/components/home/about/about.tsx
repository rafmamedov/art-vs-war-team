import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './about.module.scss';

const About = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

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
      <section className={styles.about}>
        <h2 className={styles.title}>Art</h2>
        <div className={styles.ornament}>
          <div className={styles.button}>Donate</div>
          <Image
            className={styles.image}
            src="/assets/images/button&ornament.png"
            alt="ornament"
            fill
          />
        </div>
        <div className={styles.container}>
          <div className={styles.lines}>
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.line} />
          </div>
    
          <div className={styles.content}>
            <h2 className={styles.title}>vs War</h2>

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
        </div>
      </section>
    ) : (
      <section className={styles.mobile}>
        <h1 className={styles.mobile__title}>Art vs War</h1>

        <div className={styles.mobile__content}>
          Our project dedicated to supporting Ukrainian artists and creatives 
          who have been displaced abroad due to the war in Ukraine. Browse our collection 
          and find a painting that speaks to you. You also can donate our project without 
          purchasing a painting. Thank you for your support.
        </div>

        <div className={styles.mobile__button}>Donate</div>
      </section>
    );
};

export default About;
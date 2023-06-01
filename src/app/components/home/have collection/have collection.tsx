import React from 'react';
import styles from './have collection.module.scss';
import Image from 'next/image';

const HaveCollection = () => (
  <section className={styles.collection}>
    <div className={styles.top}>
      <Image
        className={styles.line}
        src="/assets/lines/1.svg"
        alt="line 1"
        height={2}
        width={1600}
      />

      <Image
        className={styles.line}
        src="/assets/lines/2.svg"
        alt="line 2"
        height={12}
        width={1600}
      />

      <Image
        className={styles.line}
        src="/assets/lines/3.svg"
        alt="line 3"
        height={24}
        width={1600}
      />

      <Image
        className={styles.line}
        src="/assets/lines/4.svg"
        alt="line 4"
        height={48}
        width={1600}
      />
    </div>

    <div className={styles.content}>
      <h2 className={styles.title}>Have an art collection?</h2>
      <h6 className={styles.subtitle}>You can donate your collection items to support Ukraine</h6>
      <div className={styles.button}>Learn more</div>
    </div>

    <div className={styles.bottom}>
      <Image
        className={styles.line}
        src="/assets/lines/4.svg"
        alt="line 4"
        height={48}
        width={1600}
      />

      <Image
        className={styles.line}
        src="/assets/lines/3.svg"
        alt="line 3"
        height={24}
        width={1600}
      />

      <Image
        className={styles.line}
        src="/assets/lines/2.svg"
        alt="line 2"
        height={12}
        width={1600}
      />

      <Image
        className={styles.line}
        src="/assets/lines/1.svg"
        alt="line 1"
        height={2}
        width={1600}
      />
    </div>
  </section>
);

export default HaveCollection;

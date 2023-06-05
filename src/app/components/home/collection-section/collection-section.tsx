<<<<<<< HEAD:src/app/components/home/have collection/have collection.tsx
import React from 'react';
import styles from './have collection.module.scss';
=======
import styles from './collection-section.module.scss';
>>>>>>> 5e0b5b142eb2ebb06664d457ebf7e16531cef438:src/app/components/home/collection-section/collection-section.tsx

const HaveCollection = () => (
  <section className={styles.collection}>
    <div className={styles.top}>
      <div className={styles.line} />
      <div className={styles.line} />
      <div className={styles.line} />
    </div>

    <div className={styles.content}>
      <h2 className={styles.title}>Have an art collection?</h2>
      <h6 className={styles.subtitle}>You can donate your collection items to support Ukraine</h6>
      <div className={styles.button}>Learn more</div>
    </div>

    <div className={styles.bottom}>
      <div className={styles.line} />
      <div className={styles.line} />
      <div className={styles.line} />
    </div>
  </section>
);

export default HaveCollection;

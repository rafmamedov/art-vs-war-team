import styles from './collection-section.module.scss';

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

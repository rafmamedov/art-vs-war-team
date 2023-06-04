import styles from './mobile.module.scss';

const Mobile = () => (
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

export default Mobile;

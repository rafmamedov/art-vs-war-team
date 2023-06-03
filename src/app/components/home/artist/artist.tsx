import styles from './artist.module.scss';
import Carousel from './carousel/carousel';

const Artist = () => {
  return (
    <section className={styles.artist}>
      <div className={styles.content}>
        <div className={styles.background}>
          <Carousel />
        </div>

        <h2 className={styles.title}>Are you an artist?</h2>
        <h6 className={styles.subtitle}>Become a part of our conscious community</h6>
        <div className={styles.button}>Create account</div>
      </div>
    </section>
  );
};

export default Artist;

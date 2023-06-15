'use client'

import Carousel from './carousel/carousel';

import styles from './artist-section.module.scss';
import Link from 'next/link';

const Artist = () => {
  return (
    <section className={styles.artist}>
      <div className={styles.content}>
        <div className={styles.background}>
          <Carousel />
        </div>

        <h2 className={styles.title}>Are you an artist?</h2>
        <h6 className={styles.subtitle}>Become a part of our conscious community</h6>
        <Link href={'/profile'} className={styles.button}>Create account</Link>
      </div>
    </section>
  );
};

export default Artist;

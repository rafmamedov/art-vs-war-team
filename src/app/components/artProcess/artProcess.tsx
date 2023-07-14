import Image from 'next/image';
import style from './artProcess.module.scss';
import Picture1 from './assets/Rectangle 39.png';
import Picture2 from './assets/Rectangle 39 (1).png';
import Picture3 from './assets/Rectangle 39 (2).png';

const ArtProcess = () => {
  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.image}>
          <Image src={Picture1} alt="process" fill />
        </div>

        <div className={style.description}>
          Simple desccription (Name picture, style, medium) 
        </div>
      </div>

      <div className={style.card}>
        <div className={style.image}>
          <Image src={Picture2} alt="process" fill />
        </div>

        <div className={style.description}>
          Simple desccription (Name picture, style, medium) 
        </div>
      </div>

      <div className={style.card}>
        <div className={style.image}>
          <Image src={Picture3} alt="process" fill />
        </div>

        <div className={style.description}>
          Simple desccription (Name picture, style, medium) 
        </div>
      </div>

      <div className={style.card}>
        <div className={style.image}>
          <Image src={Picture1} alt="process" fill />
        </div>

        <div className={style.description}>
          Simple desccription (Name picture, style, medium) 
        </div>
      </div>

      <div className={style.card}>
        <div className={style.image}>
          <Image src={Picture2} alt="process" fill />
        </div>

        <div className={style.description}>
          Simple desccription (Name picture, style, medium) 
        </div>
      </div>

      <div className={style.card}>
        <div className={style.image}>
          <Image src={Picture3} alt="process" fill />
        </div>

        <div className={style.description}>
          Simple desccription (Name picture, style, medium) 
        </div>
      </div>
    </div>
  );
};

export default ArtProcess;

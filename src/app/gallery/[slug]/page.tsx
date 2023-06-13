// import Image from "next/image";

import style from "./page.module.scss";
import CardPreview from "../card-preview/card-preview";
import PaintingGallery from "./paintingGallery/paintingGallery";

type Props = {
  params: string;
};

const PaintingCard: React.FC<Props> = ({ params }) => {
  console.log(params);
  return (
    <section className={style.card}>
      <h1 className={style.title}>Name of the painting</h1>

      <PaintingGallery />

      <div className={style.description}>
        <div className={style.description__block}>
          <p>Artist:</p>
          <p className={style.info}>Margarita Dudinska</p>
        </div>
        <div className={style.description__block}>
          <p>Subject:</p>
          <p className={style.info}>Abstract</p>
        </div>
        <div className={style.description__block}>
          <p>Style:</p>
          <p className={style.info}>Impressionism</p>
        </div>
        <div className={style.description__block}>
          <p>Medium:</p>
          <p className={style.info}>Acrylic</p>
        </div>
        <div className={style.description__block}>
          <p>Support:</p>
          <p className={style.info}>Canvas</p>
        </div>
        <div className={style.description__block}>
          <p>Size:</p>
          <p className={style.info}>17 x 18 x 2 cm</p>
        </div>
        <div className={style.description__block}>
          <p>Price:</p>
          <p className={style.info}>$ 100</p>
        </div>
      </div>

      <button className={style.button}>Add to cart</button>
      <div className={style.about}>
        <p className={`${style.about__title} ${style.subTitle}`}>ABOUT</p>
        <p className={style.about__description}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
          repellendus maiores itaque provident nobis tempore consequatur,
          numquam possimus doloremque consectetur incidunt eaque illum excepturi
          natus fugit quibusdam reprehenderit sapiente optio unde minima culpa
          at mollitia! Mollitia soluta consequatur est placeat quae, quaerat
          ratione voluptatibus necessitatibus eos asperiores quam commodi porro!
        </p>
      </div>
      <div className={style.more}>
        <p className={`${style.more__title} ${style.subTitle}`}>
          MORE FROM Margarita Dudinska:
        </p>
        <div className={style.more__painting}>
          <CardPreview image={"/assets/images/Rectangle 3.png"} />
          <CardPreview image={"/assets/images/Rectangle 3.png"} />
        </div>
      </div>
      <button className={style.buttonExplore}>Explore</button>

      <div className={style.shipping}>
        <p className={`${style.shipping__title} ${style.subTitle}`}>SHIPPING</p>
        <div className={style.shipping__wrapper}>
          <div className={style.shipping__info}>
            <p>Delivery Time:</p>
            <p>
              Typically 5-7 business days for domestic shipments, 10-14 business
              days for international shipments.
            </p>
          </div>
          <div className={style.shipping__info}>
            <p>Delivery Cost:</p>
            <p>Shipping is included.</p>
          </div>
          <div className={style.shipping__info}>
            <p>Handling:</p>
            <p>
              Ships rolled in a tube. Artists are responsible for packaging and
              adhering to “Art vs War” packing guidelines.
            </p>
          </div>
          <div className={style.shipping__info}>
            <p>Ships From:</p>
            <p>Ukraine</p>
          </div>
          <div className={style.shipping__info}>
            <p>Customs:</p>
            <p>
              Shipments from Ukraine may experience delays due to country&apos;s
              regulations for exporting valuable artworks.
            </p>
          </div>
        </div>
      </div>
      <div className={style.question}>
        <p className={`${style.question__title} ${style.subTitle}`}>
          HAVE ADDITIONAL QUESTION?
        </p>
        <p className={style.question__info}>
          Please visit our
          <span className={style.question__help}> help section</span> or
          <span className={style.question__help}> contact us</span>
        </p>
      </div>
    </section>
  );
};

export default PaintingCard;

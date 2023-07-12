import style from "./page.module.scss";

import CardPreview from "../card-preview/card-preview";
import PaintingGallery from "./paintingGallery/paintingGallery";
import AddToCartButton from "./paintingGallery/button/button";
import Link from "next/link";
import { Medium, Style, Subject, Support } from "@/types/Painting";
import MorePaintings from "./morePainting/morePaintings";
import { useEffect } from "react";

async function getDataFromServer(id: string) {
  const response = await fetch(
    `https://www.albedosunrise.com/paintings/v2/${id}`,
    {
      next: { revalidate: 300 },
    }
  ).then((data) => data.json());

  return response;
}

const PaintingCard = async ({ params }: { params: { slug: string } }) => {
  const paintingsList = await getDataFromServer(params.slug);

  const {
    image,
    title,
    prettyId,
    price,
    height,
    width,
    yearOfCreation,
    description,
    author,
    subjects,
    styles,
    mediums,
    supports,
  } = paintingsList;

  console.log(paintingsList);

  return (
    <section className={style.card}>
      <h1 className={style.paintingTitle}>{title}</h1>

      <div className={style.gallery}>
        <div className={style.gallery__slider}>
          <PaintingGallery
            paintings={image.views}
            title={title}
            author={author.fullName}
          />
        </div>

        <div className={style.paintingInfo}>
          <div className={style.description}>
            <div className={style.description__block}>
              <p>Artist:</p>
              <p className={style.info}>
                <Link
                  href={`/artists/${author.prettyId}`}
                  className={style.link}
                >
                  {author.fullName}
                </Link>
              </p>
            </div>
            <div className={style.description__block}>
              <p>Subject:</p>
              <div>
                {subjects.map((subject: Subject, index: number) => (
                  <span key={index}>
                    {subject.name}
                    {index !== subjects.length - 1 && `,  `}
                  </span>
                ))}
              </div>
            </div>
            <div className={style.description__block}>
              <p>Style:</p>
              <div>
                {styles.map((style: Style, index: number) => (
                  <span key={index}>
                    {style.name}
                    {index !== styles.length - 1 && `,  `}
                  </span>
                ))}
              </div>
            </div>
            <div className={style.description__block}>
              <p>Medium:</p>
              <div>
                {mediums.map((medium: Medium, index: number) => (
                  <span key={index}>
                    {medium.name}
                    {index !== mediums.length - 1 && `,  `}
                  </span>
                ))}
              </div>
            </div>
            <div className={style.description__block}>
              <p>Support:</p>
              <div>
                {supports.map((support: Support, index: number) => (
                  <span key={index}>
                    {support.name}
                    {index !== supports.length - 1 && `,  `}
                  </span>
                ))}
              </div>
            </div>
            <div className={style.description__block}>
              <p>Created:</p>
              <p className={style.info}>{yearOfCreation}</p>
            </div>
            <div className={style.description__block}>
              <p>Size:</p>
              <p
                className={style.info}
              >{`${width} W x ${height} H x 2 D cm`}</p>
            </div>
            <div className={style.description__block}>
              <p>Price:</p>
              <p className={style.info}>{`€ ${price}`}</p>
            </div>
          </div>
          <div>
            <AddToCartButton />
          </div>
        </div>
      </div>

      <hr className={style.line} />

      <div className={style.about}>
        <p className={style.title}>ABOUT</p>
        <p className={style.about__description}>{description}</p>
      </div>

      <hr className={style.line} />

      <div className={style.more}>
        <p className={style.title}>
          {`MORE FROM `}
          <span>
            <Link href={`/artists/${author.prettyId}`} className={style.link}>
              {`${author.fullName}:`}
            </Link>
          </span>
        </p>

        <MorePaintings prettyId={prettyId} />
      </div>

      <hr className={style.line} />

      <button className={style.buttonExplore}>Explore</button>

      <div className={style.shipping}>
        <p className={style.title}>SHIPPING</p>
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

      <hr className={style.line} />

      <div className={style.question}>
        <p className={`${style.question__title} ${style.title}`}>
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

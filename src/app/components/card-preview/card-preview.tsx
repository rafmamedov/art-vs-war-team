import Image from "next/image";
import Link from "next/link";

import { Cart } from "@/app/icons/icon-cart";
import { CheckProduct } from "@/app/icons/icon-check-product";
import { addPainting } from "@/app/redux/slices/cartSlice";
import { CartItem } from "@/types/CartItem";
import { Painting } from "@/types/Painting";
import { useAppDispatch, useAppSelector } from "@/types/ReduxHooks";

import "@styles/globals.scss";
import style from "./card-preview.module.scss";

type Props = {
  paintingDetails: Painting;
  className?: string;
};

const CardPreview: React.FC<Props> = ({ paintingDetails, className }) => {
  const { paintings } = useAppSelector((state) => state.cart);
  const isPaintingSelected = paintings.some(
    (painting) => painting.id === paintingDetails.prettyId
  );

  const {
    prettyId,
    imageUrl,
    title,
    authorFullName,
    authorPrettyId,
    authorCountry,
    price,
    width,
    height,
    depth,
  } = paintingDetails;
  const dispatch = useAppDispatch();

  const handleAddPaintingToCart = () => {
    const orderData: CartItem = {
      id: prettyId,
      title: title,
      price: price,
      author: authorFullName,
      authorId: authorPrettyId,
      country: authorCountry,
      image: imageUrl,
      width: width,
      height: height,
      depth: depth,
    };

    dispatch(addPainting(orderData));
  };

  return (
    <div className={`${style.card}`}>
      <Link href={`/gallery/${prettyId}`}>
        <Image
          src={imageUrl}
          alt={`${authorFullName} - ${title}`}
          width={1368}
          height={1500}
          className={`${style.image} ${className} imageOpacityEffect`}
          onLoadingComplete={(img) => (img.style.opacity = "1")}
        />
      </Link>
      <Link href={`/gallery/${prettyId}`}>
        <p className={style.title}>{title}</p>
      </Link>
      <Link href={`/artists/${authorPrettyId}`}>
        <p className={style.artist}>{authorFullName}</p>
      </Link>

      <div className={style.buy}>
        <p className={style.buy__price}>{`€ ${price}`}</p>
        {isPaintingSelected ? (
          <div className={style.buy__icon} onClick={handleAddPaintingToCart}>
            <CheckProduct />
          </div>
        ) : (
          <div className={style.buy__icon} onClick={handleAddPaintingToCart}>
            <Cart />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPreview;

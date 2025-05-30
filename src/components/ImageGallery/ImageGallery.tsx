import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { PhotoData } from "../App/App.types";
import { FC } from "react";

interface ImageGalleryProps {
  images: PhotoData[];
  onClickImage: (image: PhotoData) => void;
}
const ImageGallery: FC <ImageGalleryProps> = ({ images, onClickImage }) => {
  return (
    <div className={css.containergallery}>
      <ul className={css.gallery}>
        {images.map((image) => (
          <li key={image.id} className={css.itemgallery}>
            <ImageCard image={image} onClick={onClickImage} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ImageGallery;

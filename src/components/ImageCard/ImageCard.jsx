import css from "./ImageCard.module.css";
const ImageCard = ({ image, onClick }) => {
  return (
    <div className={css.card}>
      <img
        className={css.img}
        src={image.urls.small}
        alt={image.description}
        onClick={() => onClick(image)}
      />

      <div className={css.info}>
        <div className={css.infolist}>
          <span className={css.infoitem}>Likes: </span>
          <span className={css.item}>{image.likes}</span>
        </div>
        <div className={css.infolist}>
          <span className={css.infoitem}>Location: </span>
          <span className={css.item}>
            {image.user.location || "Location unknown"}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ImageCard;

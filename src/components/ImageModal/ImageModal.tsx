import Modal from "react-modal";
import { PhotoData } from "../App/App.types";
import css from "./ImageModal.module.css";
//Встановлює елемент DOM, який є основним для застосунку (root). Це допомагає для доступності (accessibility), наприклад, для того, щоб приховати інший контент від екранних читачів, коли модалка відкрита.
Modal.setAppElement("#root");

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  image: PhotoData | null;
    
}
const ImageModal: React.FC<ModalProps> = ({ onClose, isOpen, image }) => {
  //якщо в image реально є дані про фото (urls є), тоді відкриваємо модалку

  return (
    <Modal
      isOpen={isOpen}
      className={css.modal}
      //функція, яка викликається при кліку поза модалкою або натисканні Escape.
      onRequestClose={onClose}
      //задає стиль для фону (оверлею) позаду модалки.
      overlayClassName={css.overlay}
    //Перевіряє: якщо image існує (не null), рендерить вміст модалки.
    >
      {image && (
        <div className={css.cardmodal}>
          <img
            className={css.imgmodal}
            src={image.urls?.regular}
            alt={image.description ||  "No description"}
          />
          <div className={css.infomodal}>
            <div className={css.infolistmodal}>
              <span className={css.infoitemmodal}>Likes: </span>
              <span className={css.itemmodal}>{image.likes ?? '0'}</span>
            </div>
            <div className={css.infolistmodal}>
              <span className={css.infoitemmodal}>Location: </span>
              <span className={css.itemmodal}>
                {image.user?.location || "Location unknown"}
              </span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
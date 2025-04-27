import { useState, useEffect, FormEvent  } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./App.css";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { fetchGallery } from "../../galleryServise";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import  ImageModal from "../ImageModal/ImageModal";
import { PhotoData } from "./App.types";
import ImageGallery from "../ImageGallery/ImageGallery";
import { FC } from "react";

const App: FC = () => {
  // При сабміті форми зберігаємо термін в стані Апп і коли змінюємо реагує ефект і відбувається запит на сервер
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [selectPhoto, setSelectPhoto] = useState<PhotoData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);;
  const [openModal, setOpenModal] = useState<boolean>(false);

  function isOpenModal(image: PhotoData) {
    setSelectPhoto(image);
    setOpenModal(true);
  }

  function onCloseModal(){
    setSelectPhoto(null);
    setOpenModal(false);
  }

  const handleSearch = (term: string) =>{
    // При сабміті форми ми сетимо нові фото з бекенду та використовуємо унікальний ідентифікатор щоб при запиті одного того самого слова відображалась галерея
    setSearchTerm(`${term}/${Date.now()}`);

    // При змінні запиту пошуку скидаємо сторінку в 1
    setPage(1);
    //При зміні запиту записуємо нові  фото в порожній масив, очищаючи попередні
    setPhotos([]);
  };

  useEffect(() => {
    //виконується ефект при умові, якщо щось ввели і значення стану не порожній рядок
    if (searchTerm === "") {
      return;
    }

    async function getPhoto(): Promise<void> {
      try {
        setError(false);
        setLoading(true);
        // при запиті на сервер прибирається айдішнік зі слова запиту(розділяємо слово виймаючи слеш та залишаємо перше передаючи індекс 0)
        const data = await fetchGallery(searchTerm.split("/")[0], page);
        if (data.length === 0) {
          toast.error(
            "Sorry, there are no images matching your search query. Please try again!"
          );

          return;
        }

        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...data];
        });
      } catch(error: unknown) {
        setError(true);
        toast.error("Something went wrong please reload again!");
      } finally {
        setLoading(false);
      }
    }
    getPhoto();
  }, [page, searchTerm]);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage error={error} />}
      <ImageGallery images={photos} onClickImage={isOpenModal} />
      {loading && <Loader loading={true}/>}
      {photos.length > 0 && !loading && (
        <LoadMoreBtn onClick={() => setPage(page + 1)}>Load more</LoadMoreBtn>
      )}
      <ImageModal
        isOpen={openModal}
        onClose={onCloseModal}
        image={selectPhoto}
      />
      <Toaster position="top-right" />
    </>
  );
}
// рендеремо кнопку лоад мо при умові якщо не порожній масив з фото і ми нічого не завантажуємо тобто кнопка ховається при завантаженні(лоадінг буде тру)
export default App;

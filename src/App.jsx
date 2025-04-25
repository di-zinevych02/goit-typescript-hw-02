import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";
import Loader from "./components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { fetchGallery } from "./galleryServise";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import ImageGallery from "./components/ImageGallery/ImageGallery";

function App() {
  // При сабміті форми зберігаємо термін в стані Апп і коли змінюємо реагує ефект і відбувається запит на сервер
  const [searchTerm, setSearchTerm] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selectPhoto, setSelectPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  function isOpenModal(image) {
    setSelectPhoto(image);
    setOpenModal(true);
  }

  function onCloseModal(image) {
    setSelectPhoto(null);
    setOpenModal(false);
  }

  const handleSearch = (term) => {
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

    async function getPhoto() {
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
      } catch {
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
      {loading && <Loader />}
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

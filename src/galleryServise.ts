import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { PhotoData } from "./components/App/App.types"
// Тип параметрів запиту
interface Params {
        client_id: string,
      query: string,
      page: number,
      per_page: number,
};

// Тип відповіді від сервера
interface GalleryResponse {
  results: PhotoData[];
}
export const fetchGallery = async (searchPhoto: string, currentPage: number) : Promise<PhotoData[]> => {
  try {
    const params: Params = {
            
      client_id: "e-OxTi7jB5Lw2fezhmtzxw7sOMUnWhDfv618Uj9VqNE",
      query: searchPhoto,
      page: currentPage,
      per_page: 12,
    };
    const response = await axios.get<GalleryResponse>("https://api.unsplash.com/search/photos", { params });

  return response.data.results;
  
  } catch (error: unknown) {
    toast.error(
            "Error fetching images..."
          );
    throw error;
  }
};

export interface PhotoData {
   // Тип однієї фотографії
  id: string;
  urls: {
    small: string;
    regular: string;
  };
 description: string;
  likes: number;
    user: {
        location: string;
    };
} 

import { useState } from "react";
import { fetchFromUnsplash } from "./api/unsplash-api";
import Button from "./components/Button/Button";
import Container from "./components/Container/Container";
import SearchBar from "./components/SearchBar/SearchBar";
import Section from "./components/Section/Section";
import toast from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";

function App() {
  const [images, setImages] = useState([]);

  const loadPhotos = async (query) => {
    const params = {
      query,
      per_page: 12,
      page: 1,
    };
    console.log("🚀 ~ params:", params);

    try {
      console.log("Start search");
      const data = await fetchFromUnsplash("search/photos", params);

      console.log(data);

      if (data.results.length === 0) {
        toast.error("No images found for this search.");
        setImages([]);
        return;
      }

      setImages(data.results);
    } catch (error) {
      console.error("Something went wrong while fetching images:", error);
      toast.error(
        "Something went wrong while loading images. Please try again later."
      );
    }
  };

  return (
    <>
      <Section>
        <Container>
          <SearchBar onSubmit={loadPhotos} />
          {/* <Button type="button" onClick={loadPhotos}>
            Load
          </Button> */}
          <ImageGallery images={images} />
        </Container>
      </Section>
    </>
  );
}

export default App;

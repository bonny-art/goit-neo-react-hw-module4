import { useCallback, useState } from "react";
// import { fetchFromUnsplash } from "./api/unsplash-api";
import Container from "./components/Container/Container";
import SearchBar from "./components/SearchBar/SearchBar";
import Section from "./components/Section/Section";
import toast from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { useDeviceType } from "./hooks/useDeviceType";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import styles from "./App.module.css";
import { fetchFromPixabay } from "./api/pixabay-api";
import { BarLoader } from "react-spinners";
import { hasPixabyMorePages } from "./utils/hasMorePages";
import clsx from "clsx";

function App() {
  const [images, setImages] = useState([]);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const deviceType = useDeviceType();

  const loadPhotos = useCallback(
    async (searchQuery = query, pageNumber = 1, append = false) => {
      const perPage =
        deviceType === "mobile" ? 6 : deviceType === "tablet" ? 12 : 24;

      const params = {
        q: searchQuery,
        per_page: perPage,
        page: pageNumber,
      };

      try {
        setIsLoading(true);
        // const data = await fetchFromUnsplash("search/photos", params);
        const data = await fetchFromPixabay(params);
        console.log("🚀 ~ data:", data);

        // if (data.results.length === 0 && pageNumber === 1) {
        //   toast.error("No images found for this search.");
        //   setImages([]);
        //   return;
        // }
        if (data.hits.length === 0 && pageNumber === 1) {
          toast.error("No images found for this search.");
          setImages([]);
          return;
        }

        setImages((prev) =>
          // append ? [...prev, ...data.results] : data.results
          append ? [...prev, ...data.hits] : data.hits
        );

        setHasMore(
          hasPixabyMorePages({
            page: pageNumber,
            perPage,
            totalHits: data.totalHits,
          })
        );
      } catch (error) {
        console.error("Something went wrong while fetching images:", error);
        toast.error(
          "Something went wrong while loading images. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [deviceType, query]
  );

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    loadPhotos(newQuery, 1, false);
  };

  const loadMore = () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadPhotos(query, nextPage, true);
  };

  const sentinelRef = useInfiniteScroll(loadMore, deviceType);

  return (
    <>
      <section className={clsx(styles.section, styles.searchBar)}>
        <Container>
          <SearchBar onSubmit={handleSearch} />
        </Container>
      </section>

      <section className={clsx(styles.section, styles.gallery)}>
        <Container>
          <ImageGallery images={images} />
          {images.length !== 0 && !isLoading && hasMore && (
            <div ref={sentinelRef} style={{ height: 1 }} />
          )}
          {isLoading && (
            <div className={styles.loaderWrapper}>
              <BarLoader color="#FFF" width={300} />
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

export default App;

// <Section className={"searchBar"}>
// <Container>
//   <SearchBar onSubmit={handleSearch} />
// </Container>
// </Section>

// <Section className={"gallery"}>
// <Container>
//   <ImageGallery images={images} />
//   {images.length !== 0 && !isLoading && hasMore && (
//     <div ref={sentinelRef} style={{ height: 1 }} />
//   )}
//   {isLoading && (
//     <div className={styles.loaderWrapper}>
//       <BarLoader color="#FFF" width={300} />
//     </div>
//   )}
// </Container>
// </Section>

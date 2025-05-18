import Container from "./components/Container/Container";
import SearchBar from "./components/SearchBar/SearchBar";
import Section from "./components/Section/Section";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { useDeviceType } from "./hooks/useDeviceType";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import styles from "./App.module.css";
import { BarLoader } from "react-spinners";
import { useImageSearch } from "./hooks/useImageSearch";
import { useModal } from "./hooks/useModal";
import ModalImage from "./components/ModalImage/ModalImage";

function App() {
  const deviceType = useDeviceType();
  const { images, isLoading, errorMessage, hasMore, search, loadMore } =
    useImageSearch(deviceType);

  const { isOpen, currentItem, open, close } = useModal();

  const sentinelRef = useInfiniteScroll(loadMore, deviceType);

  return (
    <>
      <Section className={"searchBar"}>
        <Container>
          <SearchBar onSubmit={search} />
        </Container>
      </Section>

      <Section className={"gallery"}>
        <Container>
          {errorMessage && (
            <p className={styles.emptyMessage}>{errorMessage}</p>
          )}

          <ImageGallery images={images} onCardClick={open} />

          {images.length !== 0 && !isLoading && hasMore && (
            <div ref={sentinelRef} style={{ height: 1 }} />
          )}

          {isLoading && (
            <div className={styles.loaderWrapper}>
              <BarLoader color="#FFF" width={300} />
            </div>
          )}

          <ModalImage isOpen={isOpen} onClose={close} image={currentItem} />
        </Container>
      </Section>
    </>
  );
}

export default App;

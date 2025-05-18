import Masonry from "react-masonry-css";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

const breakpointColumnsObj = {
  default: 4,
  1439: 2,
  767: 1,
};

const ImageGallery = ({ images }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryColumn}
    >
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </Masonry>
  );
};

export default ImageGallery;

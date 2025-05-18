import styles from "./ImageCard.module.css";
import { MdPhotoCamera } from "react-icons/md";
import { IoHeartSharp } from "react-icons/io5";

const ImageCard = ({ image }) => {
  //   const {
  //     urls,
  //     alt_description,
  //     likes,
  //     user: { name },
  //   } = image;
  const { webformatURL, tags, likes, user } = image;

  return (
    <div className={styles.card}>
      <img
        src={webformatURL}
        alt={tags || "Image"}
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.info}>
        <p className={styles.caption}>
          <MdPhotoCamera size={24} /> {user}
        </p>
        <p className={styles.caption}>
          <IoHeartSharp size={24} /> {likes}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;

{
  /* <div className={styles.card}>
  <img
    src={urls.small}
    alt={alt_description || "Image"}
    className={styles.image}
    loading="lazy"
  />
  <div className={styles.info}>
    <p className={styles.caption}>
      <MdPhotoCamera size={24} /> {name}
    </p>
    <p className={styles.caption}>
      <IoHeartSharp size={24} /> {likes}
    </p>
  </div>
</div>; */
}

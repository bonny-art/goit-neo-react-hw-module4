import styles from "./ImageCard.module.css";

const ImageCard = ({ image }) => {
  const {
    urls,
    alt_description,
    likes,
    user: { name },
  } = image;

  return (
    <div className={styles.card}>
      <img
        src={urls.small}
        alt={alt_description || "Image"}
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.info}>
        <p className={styles.author}>📸 {name}</p>
        <p className={styles.likes}>❤️ {likes}</p>
      </div>
    </div>
  );
};

export default ImageCard;

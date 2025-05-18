import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1e1e1e",
    border: "none",
    borderRadius: "0px",
    padding: "0px",
  },
};

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, image }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      {image && (
        <img
          src={image.urls.regular}
          alt={image.alt_description || "Image"}
          loading="lazy"
        />
      )}
    </Modal>
  );
};

export default ImageModal;

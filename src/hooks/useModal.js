import { useState, useEffect } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const open = (item) => () => {
    setCurrentItem(item);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setCurrentItem(null);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return { isOpen, currentItem, open, close };
};

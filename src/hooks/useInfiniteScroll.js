import { useEffect, useRef } from "react";

export const useInfiniteScroll = (onIntersect, deviceType) => {
  const observerRef = useRef();

  useEffect(() => {
    const getRootMargin = () => {
      switch (deviceType) {
        case "mobile":
          return "100px";
        case "tablet":
          return "200px";
        default:
          return "300px";
      }
    };

    if (!onIntersect) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        rootMargin: getRootMargin(),
        threshold: 1.0,
      }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [onIntersect, deviceType]);

  return observerRef;
};

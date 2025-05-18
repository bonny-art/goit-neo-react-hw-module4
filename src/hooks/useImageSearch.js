import { useCallback, useState } from "react";
import { fetchFromUnsplash } from "../api/unsplash-api";
import { hasMorePages } from "../utils/hasMorePages";

export const useImageSearch = (deviceType) => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const perPage =
    deviceType === "mobile" ? 6 : deviceType === "tablet" ? 12 : 24;

  const loadPhotos = useCallback(
    async (searchQuery, pageNumber = 1, append = false) => {
      setErrorMessage("");

      const params = {
        query: searchQuery,
        per_page: perPage,
        page: pageNumber,
      };

      try {
        setIsLoading(true);
        const data = await fetchFromUnsplash("search/photos", params);

        if (data.results.length === 0 && pageNumber === 1) {
          setErrorMessage(`No results found for "${searchQuery}"`);
          setImages([]);
          setHasMore(false);
          return;
        }

        setImages((prev) =>
          append ? [...prev, ...data.results] : data.results
        );

        setHasMore(
          hasMorePages({
            page: pageNumber,
            totalPages: data.total_pages,
          })
        );
      } catch (error) {
        console.error("Error loading images:", error);
        setErrorMessage("Something went wrong while loading images.");
      } finally {
        setIsLoading(false);
      }
    },
    [perPage]
  );

  const search = (newQuery) => {
    setImages([]);
    setQuery(newQuery);
    setPage(1);
    loadPhotos(newQuery, 1, false);
  };

  const loadMore = () => {
    if (isLoading || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    loadPhotos(query, nextPage, true);
  };

  return {
    images,
    isLoading,
    errorMessage,
    hasMore,
    search,
    loadMore,
  };
};

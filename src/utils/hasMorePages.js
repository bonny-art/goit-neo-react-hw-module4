export function hasPixabyMorePages({ page, perPage, totalHits }) {
  const totalPages = Math.ceil(totalHits / perPage);
  return page < totalPages;
}

export function hasUnsplashMorePages({ page, perPage, totalHits }) {
  const totalPages = Math.ceil(totalHits / perPage);
  return page < totalPages;
}

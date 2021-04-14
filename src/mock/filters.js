const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => film.userDetails.isInWatchlist).length,
  history: (films) => films.filter((film) => film.userDetails.isInHistory).length,
  favorites: (films) => films.filter((film) => film.userDetails.isInFavourite).length,
};

export const generateFilters = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      filterName,
      count: countFilms(films),
    };
  });
};

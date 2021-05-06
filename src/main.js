import { renderElement } from './utils/render.js';
import { getNode } from './utils/nodes.js';

import RatingView from './view/rating.js';
// import StatsView from './view/stats.js';
import TotalFilmsNumView from './view/total-films-num.js';
import FilmsBoardPresenter from './presenter/films-board.js';

import { generateFilm } from './mock/film.js';
import { generateUserStats } from './mock/stats.js';

// ---------------------------------------------------------
// CONSTANTS
const FILM_COUNT = 20;

// ---------------------------------------------------------

// Data
const filmsData = new Array(FILM_COUNT).fill().map((_, index) => generateFilm(index + 1));

// Data for filters in menu
// const filtersData = generateFilters(filmsData);

// UserStatistic
const userStats = generateUserStats();

// ---------------------------------------------------------
// initial DOM elements
const headerNode = getNode('.header');
//const footerNode = getNode('.footer');
const footerStatsNode = getNode('.footer__statistics');
const bodyNode = getNode('body');

// ---------------------------------------------------------

// рейтинг пользователя
renderElement(headerNode, new RatingView(userStats.rank));

// фильмы с сортировкой и фильтрацией
const presenter = new FilmsBoardPresenter(bodyNode);
presenter.init(filmsData);

// общее количество фильмов
renderElement(footerStatsNode, new TotalFilmsNumView());

// статистика пользователя
// renderElement(mainNode, new StatsView(userStats), RenderPosition.AFTER_BEGIN);

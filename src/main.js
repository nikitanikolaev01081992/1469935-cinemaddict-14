import { renderElement } from './utils/render.js';
import { getNode } from './utils/nodes.js';

import FilmsModel from './model/films.js';
import CommentsModel from './model/comments.js';

import FiltersModel from './model/filter.js';

import FiltersPresenter from './presenter/filters.js';
import FilmsBoardPresenter from './presenter/films-board.js';

import RatingView from './view/rating.js';
// import StatsView from './view/stats.js';
import TotalFilmsNumView from './view/total-films-num.js';

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
const mainNode = getNode('.main');

// ---------------------------------------------------------
// Модели
const filmsModel = new FilmsModel();
filmsModel.setFilms(filmsData);

const commentsData = [];
filmsData.forEach((film) => {
  film.comments.forEach((comment) => commentsData.push(comment));
});

const commentsModel = new CommentsModel();
commentsModel.setComments(commentsData);

const filtersModel = new FiltersModel();

// ---------------------------------------------------------

// рейтинг пользователя
renderElement(headerNode, new RatingView(userStats.rank));

// фильмы с сортировкой
const filmsPresenter = new FilmsBoardPresenter(mainNode, filtersModel, filmsModel, commentsModel);
filmsPresenter.init();

// фильтрация
const filtersPresenter = new FiltersPresenter(mainNode, filtersModel, filmsModel);
filtersPresenter.init();

// общее количество фильмов
renderElement(footerStatsNode, new TotalFilmsNumView());

// статистика пользователя
// renderElement(mainNode, new StatsView(userStats), RenderPosition.AFTER_BEGIN);

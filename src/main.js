import { getNode, render } from './util.js';
import { getRatingComponent } from './view/rating.js';
import { getMenuComponent } from './view/menu.js';
import { getStatsComponent } from './view/stats.js';
import { getSortComponent } from './view/sort.js';
import { getFilmsListComponent } from './view/filmsList.js';
import { getShowMoreComponent } from './view/showMoreButton';
import { getFilmDetailsComponent } from './view/filmDetails.js';
import { getTotalFilmsNumComponent } from './view/totalFilmsNum.js';

// ---------------------------------------------------------
// CONSTANTS

const HEADER_NODE = getNode('.header');
const MAIN_NODE = getNode('.main');
const FILMS_NODE = getNode('.films');
const FOOTER_NODE = getNode('.footer');
const FOOTER__STATISTICS = getNode('.footer__statistics');

// ---------------------------------------------------------
// отрисовка компонентов

// рейтинг пользователя
render(HEADER_NODE, getRatingComponent());

// сортировка
render(MAIN_NODE, getSortComponent(), 'afterbegin');

// статистика пользователя
render(MAIN_NODE, getStatsComponent(), 'afterbegin');
render(MAIN_NODE, getMenuComponent(), 'afterbegin');

// список фильмов
render(FILMS_NODE, getFilmsListComponent());

const filmsList = getNode('.films-list', MAIN_NODE);
render(filmsList, getShowMoreComponent());

// список фильмов top rated
render(FILMS_NODE, getFilmsListComponent(true, 'TOP_RATED'));

// список фильмов most commented
render(FILMS_NODE, getFilmsListComponent(true, 'MOST_COMMENTED'));

// общее количество фильмов
render(FOOTER__STATISTICS, getTotalFilmsNumComponent());

// детальная информация о фильме
render(FOOTER_NODE, getFilmDetailsComponent(), 'afterend');

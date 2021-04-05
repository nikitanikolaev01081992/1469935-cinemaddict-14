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
// DOM elements
const headerNode = getNode('.header');
const mainNode = getNode('.main');
const filmsNode = getNode('.films');
const footerNode = getNode('.footer');
const footerStatsNode = getNode('.footer__statistics');

// ---------------------------------------------------------
// отрисовка компонентов

// рейтинг пользователя
render(headerNode, getRatingComponent());

// сортировка
render(mainNode, getSortComponent(), 'afterbegin');

// статистика пользователя
render(mainNode, getStatsComponent(), 'afterbegin');
render(mainNode, getMenuComponent(), 'afterbegin');

// список фильмов
render(filmsNode, getFilmsListComponent());

const filmsList = getNode('.films-list', mainNode);
render(filmsList, getShowMoreComponent());

// список фильмов top rated
render(filmsNode, getFilmsListComponent(true, 'TOP_RATED'));

// список фильмов most commented
render(filmsNode, getFilmsListComponent(true, 'MOST_COMMENTED'));

// общее количество фильмов
render(footerStatsNode, getTotalFilmsNumComponent());

// детальная информация о фильме
render(footerNode, getFilmDetailsComponent(), 'afterend');

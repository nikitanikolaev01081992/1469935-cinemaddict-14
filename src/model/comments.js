import Observer from '../utils/obsever.js';

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  getCommentsById(filmId) {
    return this._comments.filter((comment) => comment.filmId === filmId);
  }

  deleteComment(updateType, commentId) {
    let filmId;
    let index = -1;

    for (let i = 0; i < this._comments.length; i++) {
      if (this._comments[i].commentId === commentId) {
        filmId = this._comments[i].filmId;
        index = i;
        break;
      }
    }

    if (index === -1) {
      return;
    }

    this._comments = [...this._comments.slice(0, index), ...this._comments.slice(index + 1)];

    this._notify(updateType, filmId);
  }

  addComment(updateType, newComment) {
    // prettier-ignore
    this._comments.push(
      Object.assign({}, newComment, {
        commentId: `${Date.now()}_${newComment.filmId}_${this._comments.length}`,
        author: 'User',
        date: new Date(),
      }),
    );

    this._notify(updateType, newComment.filmId);
  }
}

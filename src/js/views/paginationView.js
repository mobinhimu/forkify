import View from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandleClick(handler) {
    this._parentElement.addEventListener('click', eve => {
      const btn = eve.target.closest('.btn--inline');

      if (!btn) return;

      const goto = +btn.dataset.goto;

      handler(goto);
    });
  }

  _loadRecipe() {
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    const currPage = this._data.page;

    // page 1 , and other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateMarkupButton(currPage + 1, 'next');
    }

    // last page
    if (currPage === numPages && numPages > 1) {
      return this._generateMarkupButton(currPage - 1, 'prev');
    }

    // other pages
    if (currPage < numPages) {
      return `${this._generateMarkupButton(
        currPage + 1,
        'next'
      )} ${this._generateMarkupButton(currPage - 1, 'prev')}`;
    }

    // page 1 , and there are no other pages
    return '';
  }

  _generateMarkupButton(pageNum, className) {
    return `<button data-goto="${pageNum}" class="btn--inline pagination__btn--${className}">
                 <svg class="search__icon">
                 <use href="${icons}#icon-arrow-left"></use>
                 </svg>
                 <span>Page ${pageNum} </span>
              </button>`;
  }
}

export default new PaginationView();

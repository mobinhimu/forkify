class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;

    this._clearResult();
    return query;
  }

  _clearResult() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', eve => {
      eve.preventDefault();
      handler();
    });
  }
}

export default new SearchView();

import icons from '../../img/icons.svg';

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._loadRecipe();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = this._loadRecipe();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const currEle = currElements[i];

      if (
        !newEl.isEqualNode(currEle) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEle.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(currEle))
        Array.from(newEl.attributes).forEach(attr => {
          currEle.setAttribute(attr.name, attr.value);
        });
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const element = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', element);
  }

  renderError(message = this._error) {
    const element = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', element);
  }

  renderMessage(message = this._message) {
    const element = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', element);
  }
}

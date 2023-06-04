import View from './View';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe Was Successfully Uploaded . ';

  _window = document.querySelector('.add-recipe-window');
  _overly = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerToggle();
    this._addHandleRemoveToggle();
    // this.addHandleOverlyToggle();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overly.classList.toggle('hidden');
  }

  _addHandlerToggle() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandleRemoveToggle() {
    this._overly.addEventListener('click', this.toggleWindow.bind(this));
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  //   addHandleOverlyToggle() {
  //     this._overly.addEventListener('click', this.toggleWindow.bind(this));
  //   }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (eve) {
      eve.preventDefault();

      const arrData = [...new FormData(this)];
      const objectData = Object.fromEntries(arrData);

      handler(objectData);
    });
  }
}
export default new addRecipeView();

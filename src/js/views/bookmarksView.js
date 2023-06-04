import View from './View';
import previewView from './previewView.js';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _error = 'No Bookmarks found . Please Add Your Favorite Foods';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _loadRecipe() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('')
      .replaceAll(';', '');
  }
}
export default new BookmarkView();

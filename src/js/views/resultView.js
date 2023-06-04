import View from './View';
import previewView from './previewView';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _error = 'No recipes found for your query. Please try again!';

  _loadRecipe() {
    return this._data
      .map(result => previewView.render(result, false))
      .join('')
      .replaceAll(';', '');
  }
}
export default new ResultView();

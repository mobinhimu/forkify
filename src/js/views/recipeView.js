import icons from '../../img/icons.svg';
import View from './View';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _error = 'No recipes found for your query. Please try again!';

  addHandleRender(handler) {
    ['hashchange', 'load'].forEach(eve =>
      window.addEventListener(eve, handler)
    );
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', eve => {
      const btn = eve.target.closest('.add--bookmark');

      if (!btn) return;

      handler();

      console.log();
    });
  }

  addHandleRecipeServings(handler) {
    this._parentElement.addEventListener('click', eve => {
      const servingsButton = eve.target.closest('.btn--tiny');

      if (!servingsButton) return;

      // let servingsCount = this._data?.servings;
      let servingsCount = +servingsButton.dataset.updateTo;

      // if (servingsButton.classList.contains('btn--increase-servings')) {
      //   servingsCount = servingsCount + 1;
      // } else {
      //   servingsCount = servingsCount - 1;
      // }

      if (servingsCount > 0) handler(servingsCount);
    });
  }

  _loadRecipe() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image_url}" alt="${
      this._data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
       <div class="recipe__info">
         <svg class="recipe__info-icon">
           <use href="${icons}#icon-clock"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--minutes">${
           this._data.cooking_time
         }</span>
         <span class="recipe__info-text">minutes</span>
       </div>

       <div class="recipe__info">
         <svg class="recipe__info-icon">
           <use href="${icons}#icon-users"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--people">${
           this._data.servings
         }</span>
         <span class="recipe__info-text">servings</span>

         <div class="recipe__info-buttons">
           <button class="btn--tiny btn--decrease-servings" data-update-to="${
             this._data.servings - 1
           }">
             <svg>
               <use href="${icons}#icon-minus-circle"></use>
             </svg>
           </button>
           <button class="btn--tiny btn--increase-servings" data-update-to="${
             this._data.servings + 1
           }">
             <svg>
               <use href="${icons}#icon-plus-circle"></use>
             </svg>
           </button>
         </div>
       </div>

       <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
         <svg>
           <use href="${icons}#icon-user"></use>
         </svg>
       </div>

       <button class="btn--round add--bookmark">
         <svg class="">
           <use href="${icons}#icon-bookmark${
      this._data?.bookmarked ? '-fill' : ''
    }"></use>
         </svg>
       </button>
     </div>
     
    <div class="recipe__ingredients">
       <h2 class="heading--2">Recipe ingredients</h2>
       <ul class="recipe__ingredient-list">
         ${this._data.ingredients.map(this._recipeIngredient).join('')}

       </ul>
    </div>

    <div class="recipe__directions">
       <h2 class="heading--2">How to cook it</h2>
       <p class="recipe__directions-text">
         This recipe was carefully designed and tested by
         <span class="recipe__publisher">${
           this._data.publisher
         }</span>. Please check out
         directions at their website.
       </p>
       <a
         class="btn--small recipe__btn"
         href="${this._data.source_url}"
         target="_blank"
       >
         <span>Directions</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
       </a>
    </div>
 `;
  }

  _recipeIngredient({ quantity, unit, description }) {
    return `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>

            <div class="recipe__quantity">${Number(quantity).toFixed(2)}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${unit}</span>
              ${description}
            </div>
          </li>
        `;
  }
}

export default new RecipeView();

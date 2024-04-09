import View from './view';

class SortView extends View {
  _parentEl = document.querySelector('.table__row');

  addHandlerSorting(handler) {
    this._parentEl.addEventListener('click', async function (e) {
      const sortByID = e.target.closest('.column-1');
      const sortByName = e.target.closest('.column-2');
      const sortByCreate = e.target.closest('.column-3');
      const sortByEdit = e.target.closest('.column-4');
      if (sortByID) {
        // взять тип сортировки из дата аттрибута
        handler('sortByID');
      }
      if (sortByName) {
        handler('sortByName');
      }
      if (sortByCreate) {
        handler('sortByCreate');
      }
      if (sortByEdit) {
        handler('sortByEdit');
      }
    });
  }
}

export default new SortView();

import icons from 'url:../../images/icons.svg';

export default class View {
  _data;

  _clear() {
    this._parentEl.innerHTML = '';
  }

  _getTypeOf = (obj) => {
    return {}.toString.call(obj).slice(8, -1);
  };

  _openModal() {
    this._window.classList.remove('hidden');
    this._overlayEl.classList.remove('hidden');
  }

  render(data, option) {
    this._data = data;
    let markup;

    if (this._getTypeOf(this._data) === 'Array') {
      markup = this._generateMarkup();
      if (this._data.length === 0) return;
    }
    if (
      (option && this._getTypeOf(this._data) === 'Object') ||
      (!option && !this._data)
    ) {
      this._parentEl.setAttribute('data-flag', `${option ? 'edit' : 'new'}`);
      this._parentEl.setAttribute(
        'data-id',
        `${option ? `${this._data.id}` : ''}`
      );

      markup = this._generateMarkupAdd();
      this._openModal();
    }
    if (!option && this._getTypeOf(this._data) === 'Object') {
      this._parentEl.setAttribute('data-flag', 'delete');
      this._parentEl.setAttribute('data-id', `${this._data.id}`);

      markup = this._generateMarkupDelete('Удалить клиента');
      this._openModal();
    }

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
    <div class="table__spinner spinner">
      <div class="spinner">
        <svg class="spinner-ico">
          <use href="${icons}#spinner"></use>
        </svg>
      </div>
    </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderEmptyTable() {
    const markup = `
    <div class="table__spinner spinner">
      <div class="spinner">
        <p>Список пуст, добавте нового клиента</p>
      </div>
    </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    window.addEventListener('DOMContentLoaded', handler);
  }

  addHandlerShowModal(handler) {
    this._parentEl.addEventListener('click', function (e) {
      if (!e.target.closest('.row--body')) return;
      const id = e.target.closest('.row--body').dataset.id;
      const editBtn = e.target.closest('.btn--edit');
      const deleteBtn = e.target.closest('.btn--delete');
      if (!editBtn && !deleteBtn) return;
      if (editBtn) handler(id);
      if (deleteBtn) handler(id, false);
    });

    this._btnOpen.addEventListener('click', function () {
      handler();
    });
  }
}

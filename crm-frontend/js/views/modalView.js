import View from './view';
import icons from 'url:../../images/icons.svg';

class ModalView extends View {
  _parentEl = document.querySelector('.modal__form');
  _window = document.querySelector('.modal');
  _overlayEl = document.querySelector('.overlay');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerModalClose();
    this._addHandlerModalContact();
  }

  closeModal() {
    setTimeout(() => {
      this._clear();
    }, 400);
    this._window.classList.add('hidden');
    this._overlayEl.classList.add('hidden');
  }

  _generateMarkupAdd() {
    return `
    <div class="form__full-name" data-id='edit'>
        <h2 class="modal__title text-reset">${
          this?._data ? 'Изменить данные' : 'Добавить клиента'
        }<span class="clients__id">${this?._data ? 'id:' : ''}${
      this._data?.id.slice(7) || ' '
    }</span></h2>
        <input class="form__input" type="text" placeholder="Фамилия" name="surname" value = "${
          this._data?.surname || ''
        }">
        <input class="form__input" type="text" placeholder="Имя" name="name" value = "${
          this._data?.name || ''
        }">
        <input class="form__input" type="text" placeholder="Отчество"  name="lastName" value = "${
          this._data?.lastName || ''
        }">
    </div>
      <div class="form__contacts ${
        this._data?.contacts ? 'form__contacts--add' : ''
      } select ps">
        ${
          this._data?.contacts
            ? this._data.contacts
                .map((contact) => this._generateMarkupContactBar(contact))
                .join('')
            : ''
        }  
             
      </div>
    <div class="form__contacts-btn ${
      this._data?.contacts ? 'form__contacts-btn--expand' : ''
    }">
    <button type='button' class=" btn-reset btn-add-contacts">
    <span class="btn--add">Добавить контакт</span>
    </button>
    </div>
    
    <button  type='submit' class="btn-reset btn btn--save">Сохранить</button>
    `;
  }

  _generateMarkupDelete(title) {
    return `
      <h2 class="modal__title title--delete text-reset">${title}</h2>
    <p class="modal__text" >Вы действительно хотите удалить данного клиента?</p>
   
  <button class="btn-reset btn btn--save">Удалить</button>
  `;
  }

  _generateMarkupContactBar(contact = '') {
    return `
    <div class="select__input ${contact && 'select__input--add'}">
    <select  class="input__list" name="type">
      <option value="vk" ${contact.type === 'vk' && 'selected'}>VK</option>
      <option value="phone" ${
        contact.type === 'phone' && 'selected'
      }>Телефон</option>
      <option value="email" ${
        contact.type === 'email' && 'selected'
      }>Email</option>
      <option value="fb" ${
        contact.type === 'fb' && 'selected'
      }>Facebook</option>
      <option value="rest" ${
        contact.type === 'rest' && 'selected'
      }>Доп.телефон</option>
    </select>
    <input
      class="input__value"
      type="text"
      placeholder="Введите данные контакта"
      name = "value" 
      value = '${contact.value ? contact.value : ''}'
    />
    <button class="input__btn btn-reset" type="button">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_121_1495)">
          <path
            d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"
            fill="#B0B0B0"
          />
        </g>
      </svg>
    </button>
  </div>
  `;
  }

  _addHandlerModalClose() {
    this._btnClose.addEventListener('click', this.closeModal.bind(this));
    this._overlayEl.addEventListener('click', this.closeModal.bind(this));
  }

  addHandlerSubmit(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];

      const client = Object.fromEntries(
        dataArr.filter(
          (entry) =>
            !(entry[0].startsWith('type') || entry[0].startsWith('value'))
        )
      );

      client.contacts = dataArr
        .filter(
          (entry) => entry[0].startsWith('type') || entry[0].startsWith('value')
        )
        .map((contact, i, arr) => {
          if (i % 2 === 0) {
            return Object.fromEntries([contact, arr[i + 1]]);
          }
        })
        .filter((contact) => contact != undefined);

      const data = {
        data: client,
        flag: this.dataset.flag,
        ...(this.dataset.id && { id: this.dataset.id }),
      };

      handler(data);
    });
  }

  _addOrDeleteContact(e) {
    const btnDeleteContact = e.target.closest('.input__btn');
    const btnAddContact = e.target.closest('.btn-add-contacts');
    const contactsContainer = document.querySelector('.form__contacts');
    const btnContainer = document.querySelector('.form__contacts-btn');
    const markup = this._generateMarkupContactBar();

    const numOfContacts =
      document?.querySelectorAll('.select__input').length + 1;

    if (btnDeleteContact) {
      const contactBar = e.target.closest('.select__input');
      contactBar.remove();
      if (numOfContacts - 2 === 0) {
        contactsContainer.classList.remove('form__contacts--add');
        btnContainer.classList.remove('form__contacts-btn--expand');
      }
    }

    if (numOfContacts === 11) {
      return;
    }
    if (!btnAddContact) return;
    contactsContainer.classList.add('form__contacts--add');
    setTimeout(() => {
      Array.from(contactsContainer.children).forEach((element) => {
        element.classList.add('select__input--add');
      });
    }, 50);

    btnContainer.classList.add('form__contacts-btn--expand');
    contactsContainer.insertAdjacentHTML('afterbegin', markup);
  }

  _addHandlerModalContact() {
    this._parentEl.addEventListener(
      'click',
      this._addOrDeleteContact.bind(this)
    );
  }
}
export default new ModalView();

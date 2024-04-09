import icons from 'url:../../images/icons.svg';
import View from './view';

class ClientsView extends View {
  _parentEl = document.querySelector('.table-body__table');
  _btnOpen = document.querySelector('.btn--add-client');

  _contactsIconMarkup(obj) {
    return obj.contacts
      ?.map((contact) => {
        return `
    <li class="contacts-list__item contact-item">
      <span class="tooltip contact-item__tooltip">
        <button class="tooltip-toggle btn-reset" type="button">
          <svg class="contact-icon">
            <use href="${icons}#${contact.type}"></use>
          </svg>
        </button>
        <span class="tooltip-text" role="tooltip">${contact.value}</span>
        </span>
    </li>
    `;
      })
      .join('');
  }

  _generateMarkup() {
    return `
        <tbody class="table__body">
        ${this._data
          .map((clientObj) => {
            return `
            <tr class="table__row row--body" data-id="${clientObj.id}">
                <td class="table__text body-text body-text--id column-1">
                ${clientObj.id?.slice(7)}
                </td>
                <td class="table__text body-text column-2">
                ${clientObj.surname} ${clientObj.name} ${clientObj.lastName}
                </td>
                <td class="table__text body-text column-3">
                ${clientObj.createdAt.date} <span class="body-text--time">${
              clientObj.createdAt.time
            }</span>
                </td>
                <td class="table__text body-text column-4">
                ${clientObj.updatedAt.date} <span class="body-text--time">${
              clientObj.updatedAt.time
            }</span>
                </td>
                <td class="table__text body-text column-5">
                <ul class="table__list contacts-list list-reset">
                ${this._contactsIconMarkup(clientObj)}
                </ul>
                </td>
                <td class="table__text body-text column-6">
                <button class="table__btn btn-reset btn--edit ">
                    Изменить
                </button>
                <button class="table__btn btn-reset btn--delete">
                    Удалить
                </button>
                </td>
            </tr>`;
          })
          .join('')}
        </tbody>
        `;
  }
}

export default new ClientsView();

import * as model from './model.js';
import clientsView from './views/clientsView.js';
import modalView from './views/modalView.js';
import sortView from './views/sortView.js';
import 'core-js/stable'; //полифилы для всего
import 'regenerator-runtime/runtime.js'; //полифилы для async await
// perfect scroll bar
new PerfectScrollbar('.table-body', {
  wheelSpeed: 0.1,
});

const controlClients = async function () {
  try {
    clientsView.renderSpinner();
    // 1. загрузка клиентов + имитация загрузки
    setTimeout(async () => {
      await model.loadClients();
      if (model.state.clients.length === 0) {
        clientsView.renderEmptyTable();
      } else {
        clientsView.render(model.state.clients);
      }
    }, 1000);
    // 2. отрисовка таблицы с клиентами
  } catch (err) {
    console.log(err);
  }
};

const controlModal = async function (id, option = true) {
  try {
    //отрисовка модального окна для добавления
    if (!id) {
      return modalView.render();
    }
    // 1. загрузка данных клиента из строки (с сервера)
    await model.getClient(id);

    // 2. отрисовка модального окна
    modalView.render(model.state.client, option);
    /**
     * делаю в modalView render и marckup передаю в render model.state.client если изменить и ничего если удалить
     */
  } catch (err) {
    console.log(err);
  }
};

const controlSubmitClient = async function (newData) {
  try {
    await model.uploadClient(newData);
    await model.loadClients();
    clientsView.renderEmptyTable();
    clientsView.render(model.state.clients);
    modalView.closeModal();
  } catch (err) {
    console.log(err);
  }
};

const controlSortingClients = async function (sortType) {
  try {
    await model.loadClients(sortType);
    clientsView.render(model.state.sortClients);
  } catch {
    console.log(err);
  }
};

const init = function () {
  clientsView.addHandlerRender(controlClients);
  clientsView.addHandlerShowModal(controlModal);
  modalView.addHandlerSubmit(controlSubmitClient);
  sortView.addHandlerSorting(controlSortingClients);
};

init();

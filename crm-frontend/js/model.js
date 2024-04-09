import 'regenerator-runtime/runtime.js';
import { SERVER_URL } from './config';
import { getJSON } from './helpers';
import { sendJSON } from './helpers';
import { prepareClientToRender } from './helpers';
import { prepareToSortByDate } from './helpers';

export const state = {
  clients: [],
  client: {},
  search: [],
  sortClients: [],
};

export const loadClients = async function (sortType) {
  try {
    //получаем массив с сервера
    const data = await getJSON(SERVER_URL);
    //массив для отрисовки
    state.clients = data.map((clientObj) => {
      return prepareClientToRender(clientObj);
    });
    if (!sortType) return;
    if (sortType === 'sortByID') {
      state.sortClients = state.clients.sort((a, b) => b.id - a.id);
      console.log(state.sortClients, sortType);
    }
    if (sortType === 'sortByName') {
      state.sortClients = state.clients.sort(
        (a, b) =>
          b.surname + b.name + b.lastname - (a.surname + a.name + a.lastname)
      );
      console.log(state.sortClients, sortType);
    }
    if (sortType === 'sortByCreate') {
      state.sortClients = state.clients.sort(
        (a, b) =>
          prepareToSortByDate(a.createdAt) - prepareToSortByDate(b.createdAt)
      );
      console.log(state.sortClients, sortType);
    }
    if (sortType === 'sortByEdit') {
      state.sortClients = state.clients.sort(
        (a, b) =>
          prepareToSortByDate(a.updatedAt) - prepareToSortByDate(b.updatedAt)
      );
      console.log(state.sortClients, sortType);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getClient = async function (id) {
  try {
    const data = await getJSON(`${SERVER_URL}${id}`);
    state.client = data;
  } catch (err) {
    throw err;
  }
};

export const uploadClient = async function (newData) {
  try {
    await sendJSON(`${SERVER_URL}${newData.id || ''}`, newData);
  } catch (err) {
    throw err;
  }
};

/** 
 * на будущее
export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${SERVER_URL}&search=${query}`);
    console.log(data);
  } catch (err) {}
};
*/

export const loadClientsToServer = function (newData) {};

export const deleteClient = async function () {};

import { TIMEOUT_SEC } from './config';

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(
          `Нет ответа с сервера в течении ${sec} секунд (низкая скорость интернета)`
        )
      );
    }, sec * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    let res;
    if (uploadData.flag === 'new') {
      res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData.data),
      });
    }
    if (uploadData.flag === 'edit') {
      res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData.data),
      });
      console.log(res);
    }
    if (uploadData.flag === 'delete') {
      res = await fetch(url, {
        method: 'DELETE',
      });
    }

    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

const getDateAndTime = function (obj) {
  const dateCreatedAt = new Date(obj);
  return {
    date: dateCreatedAt.toLocaleDateString('ru-RU'),
    time: dateCreatedAt.toLocaleTimeString('ru-RU').slice(0, -3),
  };
};

export const prepareToSortByDate = function (dateObj) {
  const dateFormated = dateObj.date.split('.').reverse().join('-');
  const mSec = new Date(`${dateFormated} ${dateObj.time}`).getTime();
  return mSec;
};

export const prepareClientToRender = function (clientObj) {
  return {
    id: clientObj.id,
    name: clientObj.name,
    surname: clientObj.surname,
    lastName: clientObj.lastName,
    createdAt: getDateAndTime(clientObj.createdAt),
    updatedAt: getDateAndTime(clientObj.updatedAt),
    contacts: clientObj.contacts,
  };
};

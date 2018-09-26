const HOST = 'http://127.0.0.1:8000/';

export const put_settings_data = (data, url, token) => fetch(
  HOST + url,
  {
    method: 'put',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": "Token " + token,
    },
    body: JSON.stringify(data)
  }
).then(respone => {
  console.log(respone);
  if (respone.status === 200) {
    console.log('всё ОК, данные сохранили, завершаем Promise');
    return Promise.resolve()
  }
  return Promise.reject(respone.json())
}).then(
  (result) => {console.log('ok');},
  (error) => {
    console.log('Показать сообщение об ошибке');
    console.log(error);
  }
);

export const post_sign_data = (data, url, close) => fetch(
  HOST + url,
  {
    method: 'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data)
  }
).then(respone => {
    if (respone.status === 201) {
      close();
      return Promise.reject();
    }
    return respone.json()
  }
).then((data) => {
  // пока так, надо придумать что-то красивее
  console.log('Показать сообщение об ошибке');
  console.log(data);
});

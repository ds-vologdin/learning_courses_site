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

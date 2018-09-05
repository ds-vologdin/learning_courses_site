import React, { Component } from 'react';

import './less/Settings.less';
import Header from './Header';
import Footer from './Footer';
import Input from './Input';
import TOKEN from './token_privat';

export default class Settings extends Component {
  render() {
    return (
      <div className='settings app__settings'>
        <Header className='settings__header' sign_button={this.props.sign_button}/>
        <SettingsContainer/>
        <Footer className='settings__footer'/>
      </div>
    );
  }
}


class SettingsContainer extends Component {
  constructor(props) {
      super();
      this.state = {
          active_block: 'learning',
      };
  }
  check_active_block = (active_block) => {
    this.setState({
          active_block: active_block,
    });
  }
  render() {
    return (
      <div className='settings__container'>
        <Title/>
        <Buttons active_block={this.state.active_block} check_active_block={this.check_active_block}/>
        {this.state.active_block === 'settings' && <SettingBlock/>}
      </div>
    );
  }
}

const SettingBlock = () => (
  <div className='settings__block'>
    <RegisterContent/>
    <Notify/>
  </div>
);

const Title = () => (
  <div className='settings__title'>
    <div className='settings__title-container'>Личный кабинет</div>
  </div>
)

class Buttons extends Component {
  render() {
    let class_item_learning = 'buttons-settings__item';
    let class_item_settings = 'buttons-settings__item';
    if (this.props.active_block === 'learning') {
      class_item_learning += ' ' + class_item_learning + '--active';
    }
    if (this.props.active_block === 'settings') {
      class_item_settings += ' ' + class_item_settings + '--active';
    }
    return (
      <div className='buttons-settings settings__buttons'>
        <div className='buttons-settings__container'>
          <div className={class_item_learning} onClick={ () => this.props.check_active_block('learning') }>Курсы</div>
          <div className={class_item_settings} onClick={ () => this.props.check_active_block('settings') }>Настройки</div>
        </div>
      </div>
    );
  }
}

class RegisterContent extends Component {
  get_first_name_input_ref = (node) => {this._first_name_input = node;}
  get_last_name_input_ref = (node) => {this._last_name_input = node;}
  get_mail_input_ref = (node) => {this._mail_input = node;}
  get_username_ref = (node) => {this._username_input = node;}
  get_password_input_ref = (node) => {this._password_input = node;}
  send_registry_data = () => {
    const registry_data = {
      first_name: this._first_name_input._value,
      last_name: this._last_name_input._value,
      email: this._mail_input._value,
      username: this._username_input._value,
      password: this._password_input._value
    }
    console.log(registry_data);
    // посылаем на сервер, пока не реализовано на бекенде
    post_settings_data(registry_data, 'lk/api/id/settings/');
  }
  render () {
    return (
      <div className='settings__register-form'>
        <div className='settings__title-register'>Личные данные</div>
        <Input type_input='text' className='settings__input' label='Фамилия' ref={this.get_last_name_input_ref}/>
        <Input type_input='text' className='settings__input' label='Имя' ref={this.get_first_name_input_ref}/>
        <Input type_input='text' className='settings__input' label='Электронная почта' ref={this.get_mail_input_ref}/>
        <Input type_input='text' className='settings__input' label='Логин' ref={this.get_username_ref}/>
        <Input type_input='password' className='settings__input' label='Пароль' ref={this.get_password_input_ref}/>
        <ButtonSend send_data={this.send_registry_data}/>
      </div>
    )
  }
};

class Notify extends Component {
  constructor(props) {
      super();
      this._new_curses = true;
      this.state = {
          new_curses: true,
          new_message: true,
          change_status_task: true,
          other: true,
      };
  }
  check_new_courses = (event) => {this.setState({new_curses: event.target.checked});}
  check_new_message = (event) => {this.setState({new_message: event.target.checked});}
  check_change_status_task = (event) => {this.setState({change_status_task: event.target.checked});}
  check_other = (event) => {this.setState({other: event.target.checked});}
  send_notify_settings = () => {
    console.log(this.state);
    post_settings_data(this.state, 'lk/api/id/settings/');
  }
  componentDidMount() {
    // Здесь загружаем данные с сервера и задаём state
    // пока не реализовано на бекенде
    this.setState({
      new_curses: true,
      new_message: false,
      change_status_task: true,
      other: false,
    });
  }
  render () {
    console.log(this.state);
    return (
      <div className='notify settings__notify'>
        <div className='notify__title'>Уведомления</div>
        <NotifyCheckbox checked={this.state.new_curses} change_handler={this.check_new_courses} text='О новых курсах'/>
        <NotifyCheckbox checked={this.state.new_message} change_handler={this.check_new_message} text='О личных сообщениях'/>
        <NotifyCheckbox checked={this.state.change_status_task} change_handler={this.check_change_status_task} text='О изменении статуса домашних заданий'/>
        <NotifyCheckbox checked={this.state.other} change_handler={this.check_other} text='Обо всём хорошем'/>
        <ButtonSend send_data={this.send_notify_settings}/>
      </div>
    )
  }
};

const NotifyCheckbox = ({checked, change_handler, text}) => {
  console.log(checked, text);
  return (
  <label className='notify__item'>
    <input type='checkbox' className='notify__checkbox'  onChange={change_handler} checked={checked}/>
    <span className='notify__checkbox-label'>{text}</span>
  </label>
)}

const ButtonSend = ({send_data}) => (
  <div className='settings__button-send' onClick={send_data}>Сохранить</div>
);

const HOST = 'http://127.0.0.1:8000/';


const post_settings_data = (data, url) => fetch(
  HOST + url,
  {
    method: 'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": "Token " + TOKEN
    },
    body: JSON.stringify(data)
  }
).then(respone => {
    if (respone.status === 201) {
      return Promise.reject();
    }
    return respone.json()
  }
).then((data) => {
  // пока так, надо придумать что-то красивее
  console.log('Показать сообщение об ошибке');
  console.log(data);
});

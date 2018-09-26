import React, { Component } from 'react';
import PropTypes from "prop-types";

import Input from './Input';
import {put_settings_data} from '../utils/helpers';


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
    // посылаем на сервер, пока не реализовано на бекенде
    put_settings_data(registry_data, 'lk/api/students/1/', this.props.token);
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
        <div className='settings__button-send' onClick={this.send_registry_data}>Сохранить</div>
      </div>
    );
  }
};

RegisterContent.defaultProps = {
  token: '',
};
RegisterContent.propTypes = {
  token: PropTypes.string,
};

export default RegisterContent;

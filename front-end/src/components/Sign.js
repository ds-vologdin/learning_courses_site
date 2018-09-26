import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import {SHOW_REGISTER_CONTENT_ACTION, SHOW_LOGIN_CONTENT_ACTION} from '../actions/sign_form';
import login_action from '../actions/session';

import './less/Sign.less';
import Input from './Input';
import {post_sign_data} from '../utils/helpers.js';


class ModalSign extends Component {
  esc_handler = (event) => {
    if(event.keyCode === 27) {
      this.props.close()
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.esc_handler);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.esc_handler);
  }
  render() {
    return (
      <div className={'modal-sign ' + this.props.className}>
        <div className='modal-sign__container'>
          <span className='modal-sign__close' onClick={this.props.close}>&times;</span>
          <div className='modal-sign__content'>
            <ModalSignButtons show_register_content={this.props.show_register_content}
                              show_login_content={this.props.show_login_content}
                              is_register_content={this.props.is_register_content}/>
            {this.props.is_register_content ? <ModalSignRegisterContent close={this.props.close} login={this.props.login}/> : <ModalSignLoginContent close={this.props.close} login={this.props.login}/>}
          </div>
        </div>
      </div>
    )
  }
};

ModalSign.defaultProps = {
  className: '',
  show_register_content: () => true,
  show_login_content: () => true,
  close: () => true,
};
ModalSign.propTypes = {
  className: PropTypes.string,
  show_register_content: PropTypes.func,
  show_login_content: PropTypes.func,
  close: PropTypes.func,
};


const ModalSignButtons = ({show_register_content, show_login_content, is_register_content}) => {
  let classNameRegistry = 'modal-sign__button';
  let classNameLogin = 'modal-sign__button';
  if (is_register_content) {
    classNameRegistry += ' modal-sign__button--active';
  } else {
    classNameLogin += ' modal-sign__button--active';
  }
  return (
    <div className='modal-sign__buttons'>
      <div className={classNameRegistry} onClick={show_register_content}>Регистрация</div>
      <div className={classNameLogin} onClick={show_login_content}>Авторизация</div>
    </div>
  );
};

ModalSignButtons.defaultProps = {
  className: '',
  show_register_content: () => true,
  show_login_content: () => true,
};
ModalSignButtons.propTypes = {
  className: PropTypes.string,
  show_register_content: PropTypes.func,
  show_login_content: PropTypes.func,
};


class ModalSignRegisterContent extends Component {
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
      password: this._password_input._value,
    }
    post_sign_data(registry_data, 'lk/api/students/', this.props.close);
    this.props.login();
  }
  render () {
    return (
      <div className='register-form modal-sign__register-form'>
        <Input type_input='text' label='Фамилия' ref={this.get_last_name_input_ref}/>
        <Input type_input='text' label='Имя' ref={this.get_first_name_input_ref}/>
        <Input type_input='text' label='Электронная почта' ref={this.get_mail_input_ref}/>
        <Input type_input='text' label='Логин' ref={this.get_username_ref}/>
        <Input type_input='password' label='Пароль' ref={this.get_password_input_ref}/>
        <div className='modal-sign__button-send' onClick={this.send_registry_data}>Отправить</div>
      </div>
    )
  }
};

ModalSignButtons.defaultProps = {
  close: () => true,
  login: () => true,
};
ModalSignButtons.propTypes = {
  close: PropTypes.func,
  login: PropTypes.func,
};


class ModalSignLoginContent extends Component {
  get_username_ref = (node) => {this._username_input = node;}
  get_password_input_ref = (node) => {this._password_input = node;}
  send_registry_data = () => {
    const registry_data = {
      username: this._username_input._value,
      password: this._password_input._value,
    }
    this.props.login();
    this.props.close();
    // это пока не реализовано на бекенде
    // post_sign_data(registry_data, 'login/');
  }
  render () {
    return (
      <div className='register-form modal-sign__register-form'>
        <Input type_input='text' label='Логин' ref={this.get_username_ref}/>
        <Input type_input='password' label='Пароль' ref={this.get_password_input_ref}/>
        <div className='modal-sign__button-send' onClick={this.send_registry_data}>Отправить</div>
      </div>
    )
  }
};

ModalSignLoginContent.defaultProps = {
  close: () => true,
  login: () => true,
};
ModalSignLoginContent.propTypes = {
  close: PropTypes.func,
  login: PropTypes.func,
};


export default connect(
  state => ({
    is_register_content: state.sign_form.is_register_content,
  }),
  dispatch => ({
    show_register_content: () => dispatch(SHOW_REGISTER_CONTENT_ACTION),
    show_login_content: () => dispatch(SHOW_LOGIN_CONTENT_ACTION),
    login: (login, password) => dispatch(login_action(login, password)),
  })
)(ModalSign);

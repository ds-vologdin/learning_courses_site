import React, { Component } from 'react';
import './less/Sign.less';
import Input from './Input';
import TOKEN from './token_privat';


class ModalSign extends Component {
  constructor(props) {
      super();
      this.state = {
          register_content: true,
      };
  }
  show_register_content = () => {
    this.setState({
        register_content: true,
    });
  }
  show_login_content = () => {
    this.setState({
        register_content: false,
    });
  }
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
    console.log(this.props.close);
    return (
      <div className={'modal-sign ' + this.props.className}>
        <div className='modal-sign__container'>
          <ModalSignClose action={ this.props.close } />
          <div className='modal-sign__content'>
            <ModalSignButtons show_register_content={this.show_register_content}
                              show_login_content={this.show_login_content}
                              is_register_content={this.state.register_content}/>
            {this.state.register_content ? <ModalSignRegisterContent close={this.props.close}/> : <ModalSignLoginContent close={this.props.close}/>}
          </div>
        </div>
      </div>
    )
  }
};


const ModalSignClose = ({action}) => (
  <span className='modal-sign__close' onClick={action}>&times;</span>
);


const ModalSignButtons = ({show_register_content, show_login_content, is_register_content}) => (
  <div className='modal-sign__buttons'>
    <ModalSignButton active={is_register_content} action={show_register_content} text='Регистрация'/>
    <ModalSignButton active={!is_register_content} action={show_login_content} text='Авторизация'/>
  </div>
);


const ModalSignButton = ({active, action, text}) => {
  let className = 'modal-sign__button';
  if (active) {className += ' ' + className + '--active'}
  return (
    <div className={className} onClick={action}>{text}</div>
  )
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
      password: this._password_input._value
    }
    post_sign_data(registry_data, 'lk/api/students/', this.props.close);
  }
  render () {
    return (
      <div className='register-form modal-sign__register-form'>
        <Input type_input='text' label='Фамилия' ref={this.get_last_name_input_ref}/>
        <Input type_input='text' label='Имя' ref={this.get_first_name_input_ref}/>
        <Input type_input='text' label='Электронная почта' ref={this.get_mail_input_ref}/>
        <Input type_input='text' label='Логин' ref={this.get_username_ref}/>
        <Input type_input='password' label='Пароль' ref={this.get_password_input_ref}/>
        <ButtonSend send_data={this.send_registry_data}/>
      </div>
    )
  }
};


class ModalSignLoginContent extends Component {
  get_username_ref = (node) => {this._username_input = node;}
  get_password_input_ref = (node) => {this._password_input = node;}
  send_registry_data = () => {
    const registry_data = {
      username: this._username_input._value,
      password: this._password_input._value
    }
    console.log(registry_data);
    // это пока не реализовано на бекенде
    // post_sign_data(registry_data, 'login/');
  }
  render () {
    return (
      <div className='register-form modal-sign__register-form'>
        <Input type_input='text' label='Логин' ref={this.get_username_ref}/>
        <Input type_input='password' label='Пароль' ref={this.get_password_input_ref}/>
        <ButtonSend send_data={this.send_registry_data}/>
      </div>
    )
  }
};


const ButtonSend = ({className, send_data}) => (
  <div className='modal-sign__button-send' onClick={send_data}>Отправить</div>
);


const HOST = 'http://127.0.0.1:8000/';


const post_sign_data = (data, url, close) => fetch(
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

export default ModalSign;

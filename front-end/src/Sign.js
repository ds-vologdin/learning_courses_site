import React, { Component } from 'react';
import './less/Sign.less';


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
  escFunction(event){
    if(event.keyCode === 27) {
      console.log('escape');
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }
  render() {
    console.log(this.props.close);
    return (
      <div className={'modal-sign ' + this.props.className}>
        <div className='modal-sign__container'>
          <ModalSignClose action={ this.props.close } />
          <div className='modal-sign__content'>
            <ModalSignButtons show_register_content={this.show_register_content} show_login_content={this.show_login_content} is_register_content={this.state.register_content}/>
            {this.state.register_content ? <ModalSignRegisterContent/> : <ModalSignLoginContent/>}
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
    <ModalSignButton active={is_register_content} action={show_register_content} text='Зарегистрироваться'/>
    <ModalSignButton active={!is_register_content} action={show_login_content} text='Авторизоваться'/>
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
    console.log(registry_data);
    post_sign_data(registry_data, 'lk/api/students/');
  }
  render () {
    return (
      <div className='register-form modal-sign__register-form'>
        <InputFormText label='Фамилия' ref={this.get_last_name_input_ref}/>
        <InputFormText label='Имя' ref={this.get_first_name_input_ref}/>
        <InputFormText label='Электронная почта' ref={this.get_mail_input_ref}/>
        <InputFormText label='Логин' ref={this.get_username_ref}/>
        <InputFormPassword label='Пароль' ref={this.get_password_input_ref}/>
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
        <InputFormText label='Логин'/>
        <InputFormPassword label='Пароль'/>
        <ButtonSend/>
      </div>
    )
  }
};

class InputFormText extends Component {
  constructor(props) {
      super();
      this._value = '';
  }
  set_value_input_ref = (event) => {this._value = event.target.value;}
  render () {
    let label = this.props.label;
    let className = this.props.className;
    return (
      <label className={'input-wrapper ' + className}>
        <span className='input-wrapper__label'>{label}</span>
        <input type='text' className='input-wrapper__input' onChange={this.set_value_input_ref}/>
      </label>
    );
  }
};


class InputFormPassword extends Component {
  constructor(props) {
      super();
      this._value = '';
  }
  set_value_input_ref = (event) => {this._value = event.target.value;}
  render () {
    let label = this.props.label;
    let className = this.props.className;
    return (
     <label className={'input-wrapper ' + className}>
       <span className='input-wrapper__label'>{label}</span>
       <input type='password' className='input-wrapper__input' onChange={this.set_value_input_ref}/>
     </label>
   );
  }
}

const ButtonSend = ({className, send_data}) => (
  <div className='modal-sign__button-send' onClick={send_data}>Отправить</div>
);

const HOST = 'http://127.0.0.1:8000/';
const TOKEN = '88db8e8481e8b5c815f76461a5c63631cacb6fee';

const post_sign_data = (data, url) => fetch(
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
    // if (!respone.ok) {
    //   throw new Error('Network response was not ok.');
    // }
    return respone.json()
  }
).then(data => console.log(data)
).catch(function(error) {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});

export default ModalSign;

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
  render() {
    return (
      <div className={'modal-sign ' + this.props.className}>
        <div className='modal-sign__container'>
          <ModalSignClose action={ this.props.action } />
          <div className='modal-sign__content'>
            <ModalSignButtons show_register_content={this.show_register_content} show_login_content={this.show_login_content} is_register_content={this.state.register_content}/>
            {this.state.register_content ? <ModalSignRegisterContent/> : <ModalSignLoginContent/>}
            <ButtonSend/>
          </div>
        </div>
      </div>
    )
  }
}


const ModalSignClose = ({action}) => (
  <span className='modal-sign__close' onClick={ action }>&times;</span>
);

const ModalSignButtons = ({show_register_content, show_login_content, is_register_content}) => (
  <div className='modal-sign__buttons'>
    <ModalSignButton active={is_register_content} action={show_register_content} text='Авторизоваться'/>
    <ModalSignButton active={!is_register_content} action={show_login_content} text='Зарегистрироваться'/>
  </div>
);

const ModalSignButton = ({active, action, text}) => {
  let className = 'modal-sign__button';
  if (active) {className += ' ' + className + '--active'}
  return (
    <div className={className} onClick={action}>{text}</div>
  )
};

const ModalSignRegisterContent = () => (
  <div className='register-form modal-sign__register-form'>
    <InputFormText label='Фамилия'/>
    <InputFormText label='Имя'/>
    <InputFormText label='Электронная почта'/>
    <InputFormPassword label='Пароль'/>
  </div>
)

const ModalSignLoginContent = () => (
  <div className='register-form modal-sign__register-form'>
    <InputFormText label='Электронная почта'/>
    <InputFormPassword label='Пароль'/>
  </div>
)

const InputFormText = ({label, className}) => (
  <label className={'input-wrapper ' + className}>
    <span className='input-wrapper__label'>{label}</span>
    <input type='text' className='input-wrapper__input'/>
  </label>
)

const InputFormPassword = ({label, className}) => (
  <label className={'input-wrapper ' + className}>
    <span className='input-wrapper__label'>{label}</span>
    <input type='password' className='input-wrapper__input'/>
  </label>
)

const ButtonSend = ({className}) => (
  <div className='modal-sign__button-send'>Отправить</div>
)

export default ModalSign;

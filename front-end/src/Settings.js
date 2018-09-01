import React, { Component } from 'react';

import './less/Settings.less';
import Header from './Header';
import Footer from './Footer';
import Input from './Input';


class Settings extends Component {
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
        {this.state.active_block === 'settings' && <RegisterContent/>}
      </div>
    );
  }
}

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
    // post_sign_data(registry_data, 'lk/api/students/', this.props.close);
  }
  render () {
    return (
      <div className='settings__register-form'>
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

const ButtonSend = ({className, send_data}) => (
  <div className='settings__button-send' onClick={send_data}>Сохранить</div>
);

export default Settings;

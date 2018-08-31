import React, { Component } from 'react';

import './less/Settings.less';
import Header from './Header';
import Footer from './Footer';


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


export default Settings;

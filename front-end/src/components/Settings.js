import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import {SHOW_SETTINGS_BLOCK, SHOW_LEARNING_BLOCK} from '../actions/settings';

import './less/Settings.less';
import StudentProgress from './StudentProgress';
import Notify from './Notify';
import RegisterContent from './RegisterContent';


class Settings extends Component {
  componentDidMount() {
    // Здесь загружаем данные с сервера
    // пока не реализовано на бекенде
  }
  render() {
    return (
      <div className='settings__container'>
        <div className='settings__title'>
          <div className='settings__title-container'>Личный кабинет</div>
        </div>
        <Buttons active_block={this.props.active_block}
                 show_learning_block={this.props.show_learning_block}
                 show_settings_block={this.props.show_settings_block}/>
        {this.props.active_block === 'settings' && <SettingBlock token={this.props.token}/>}
        {this.props.active_block === 'learning' && <StudentProgress/>}
      </div>
    );
  }
};

Settings.defaultProps = {
  active_block: 'settings',
  show_learning_block: () => true,
  show_settings_block: () => true,
  token: '',
};
Settings.propTypes = {
  active_block: PropTypes.string,
  show_learning_block: PropTypes.func,
  show_settings_block: PropTypes.func,
  token: PropTypes.string,
};


const SettingBlock = (token) => (
  <div className='settings__block'>
    <RegisterContent token={token}/>
    <Notify token={token}/>
  </div>
);

SettingBlock.defaultProps = {
  token: '',
};
SettingBlock.propTypes = {
  token: PropTypes.string,
};


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
          <div className={class_item_learning} onClick={this.props.show_learning_block}>Курсы</div>
          <div className={class_item_settings} onClick={this.props.show_settings_block}>Настройки</div>
        </div>
      </div>
    );
  }
};

Buttons.defaultProps = {
  active_block: 'learning',
  show_learning_block: () => true,
  show_settings_block: () => true,
};
Buttons.propTypes = {
  active_block: PropTypes.string,
  show_learning_block: PropTypes.func,
  show_settings_block: PropTypes.func,
};


export default connect(
  state => ({
    active_block: state.settings.active_block,
    token: state.session.token,
  }),
  dispatch => ({
    show_settings_block: () => dispatch(SHOW_SETTINGS_BLOCK),
    show_learning_block: () => dispatch(SHOW_LEARNING_BLOCK),
  })
)(Settings);

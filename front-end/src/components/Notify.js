import React, { Component } from 'react';
import PropTypes from "prop-types";

import './less/Notify.less';
import {put_settings_data} from '../utils/helpers';


class Notify extends Component {
  constructor(props) {
      super();
      this.state = {
          notify_new_curses: true,
          notify_new_messages: true,
          notify_change_status_task: true,
          notify_events: true,
      };
  }
  check_new_curses = (event) => {this.setState({notify_new_curses: event.target.checked});}
  check_new_message = (event) => {this.setState({notify_new_messages: event.target.checked});}
  check_change_status_task = (event) => {this.setState({notify_change_status_task: event.target.checked});}
  check_events = (event) => {this.setState({notify_events: event.target.checked});}
  send_notify_settings = () => {
    put_settings_data(this.state, 'lk/api/students/1/', this.props.token);
  }
  componentDidMount() {
    // Здесь загружаем данные с сервера и задаём state
    // пока не реализовано на бекенде
    this.setState({
      notify_new_curses: true,
      notify_new_messages: false,
      notify_change_status_task: true,
      notify_events: false,
    });
  }
  render () {
    return (
      <div className='notify settings__notify'>
        <div className='notify__title'>Уведомления</div>
        <NotifyCheckbox checked={this.state.notify_new_curses} change_handler={this.check_new_curses} text='О новых курсах'/>
        <NotifyCheckbox checked={this.state.notify_new_messages} change_handler={this.check_new_message} text='О личных сообщениях'/>
        <NotifyCheckbox checked={this.state.notify_change_status_task} change_handler={this.check_change_status_task} text='О изменении статуса домашних заданий'/>
        <NotifyCheckbox checked={this.state.notify_events} change_handler={this.check_events} text='Обо всём хорошем'/>
        <div className='settings__button-send' onClick={this.send_notify_settings}>Сохранить</div>
      </div>
    )
  }
};

Notify.defaultProps = {
  token: '',
};
Notify.propTypes = {
  token: PropTypes.string,
};


const NotifyCheckbox = ({checked, change_handler, text}) => (
  <label className='notify__item'>
    <input type='checkbox' className='notify__checkbox'  onChange={change_handler} checked={checked}/>
    <span className='notify__checkbox-label'>{text}</span>
  </label>
);

NotifyCheckbox.defaultProps = {
  checked: false,
  change_handler: () => true,
  text: '',
};
NotifyCheckbox.defaultProps = {
  checked: PropTypes.bool,
  change_handler: PropTypes.func,
  text: PropTypes.string,
};

export default Notify;

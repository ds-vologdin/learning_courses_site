import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './less/Header.less';

export default class Header extends Component {
  render() {
    return (
      <header className={'header ' + this.props.className}>
        <div className='header__container'>
          <Link className='header__title' to='/'>IT-курсы</Link>
          <Menu className='header__menu' action={this.props.action} sign_button={this.props.sign_button}/>
        </div>
      </header>
    );
  }
}

const Menu = ({className, action, sign_button}) => (
  <div className={className}>
    <Link className={className + '-link'} to='/courses'>Курсы</Link>
    <Link className={className + '-link'} to='/teachers'>Преподаватели</Link>
    <Link className={className + '-link'} to='/lk'>Личный кабинет</Link>
    {sign_button && <Sign className={className + '-sign'} action={action} />}
  </div>
)

const Sign = ({className, action}) => (
  <div className={className} onClick={action}>Войти | Зарегистрироваться</div>
);

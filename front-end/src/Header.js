import React, { Component } from 'react';
import './less/Header.less';

export default class Header extends Component {
  render() {
    return (
      <header className={'header ' + this.props.className}>
        <div className='header__container'>
          <Title className='header__title'/>
          <Menu className='header__menu'/>
        </div>
      </header>
    );
  }
}

const Title = ({className}) => (
  <div className={className}>IT-курсы</div>
);

const Menu = ({className}) => (
  <div className={className}>
    <a className={className + '-link'} href='/courses/'>Курсы</a>
    <a className={className + '-link'} href='/teachers/'>Преподаватели</a>
    <a className={className + '-link'} href='/events/'>Мероприятия</a>
    <Sign className={className + '-sign'}/>
  </div>
)

const Sign = ({className}) => (
  <a className={className} href='/sign/'>Войти</a>
);

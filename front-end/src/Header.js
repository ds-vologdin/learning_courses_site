import React, { Component } from 'react';
import logo from './logo.svg';
import './less/Header.less';

export default class Header extends Component {
  render() {
    return (
        <header className="header">
          <img src={logo} className="header__logo" alt="logo" />
          <h1 className="header__title">Учиться, учиться и ещё раз учиться!</h1>
        </header>
    );
  }
}

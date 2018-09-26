import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";

import {SHOW_SIGN_FORM_ACTION} from '../actions/sign_form';
import './less/Header.less';


const Header = ({className, show_sign_form, is_authorized}) => (
  <header className={'header ' + className}>
    <div className='header__container'>
      <Link className='header__title' to='/'>IT-курсы</Link>
      <Menu className='header__menu' action={show_sign_form} is_authorized={is_authorized}/>
    </div>
  </header>
);

Header.defaultProps = {
  className: '',
  show_sign_form: () => true,
  is_authorized: false,
};

Header.propTypes = {
  className: PropTypes.string,
  show_sign_form: PropTypes.func,
  is_authorized: PropTypes.bool,
};


const Menu = ({action, is_authorized}) => (
  <div className='header__menu'>
    <Link className='header__menu-link' to='/courses'>Курсы</Link>
    <Link className='header__menu-link' to='/teachers'>Преподаватели</Link>
    {is_authorized && <Link className='header__menu-sign' to='/lk'>Личный кабинет</Link>}
    {!is_authorized && <div className='header__menu-sign' onClick={action}>Войти | Зарегистрироваться</div>}
  </div>
);

Menu.defaultProps = {
  action: () => true,
  is_authorized: false,
};

Menu.propTypes = {
  action: PropTypes.func,
  is_authorized: PropTypes.bool,
};


export default connect(
  state => ({
    is_authorized: state.session.is_authorized,
  }),
  dispatch => ({
    show_sign_form: () => dispatch(SHOW_SIGN_FORM_ACTION),
  })
)(Header);

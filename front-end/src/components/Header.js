import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import {SHOW_SIGN_FORM_ACTION} from '../actions/sign_form';
import './less/Header.less';

class Header extends Component {
  render() {
    return (
      <header className={'header ' + this.props.className}>
        <div className='header__container'>
          <Link className='header__title' to='/'>IT-курсы</Link>
          <Menu className='header__menu'
            action={this.props.show_sign_form}
            is_authorized={this.props.is_authorized}
          />
        </div>
      </header>
    );
  }
}

const Menu = ({className, action, sign_button, is_authorized}) => (
  <div className={className}>
    <Link className={className + '-link'} to='/courses'>Курсы</Link>
    <Link className={className + '-link'} to='/teachers'>Преподаватели</Link>
    {is_authorized && <Link className={className + '-sign'} to='/lk'>Личный кабинет</Link>}
    {!is_authorized && <Sign className={className + '-sign'} action={action} />}
  </div>
)

const Sign = ({className, action}) => (
  <div className={className} onClick={action}>Войти | Зарегистрироваться</div>
);

export default connect(
  state => ({
    is_authorized: state.session.is_authorized,
  }),
  dispatch => ({
    show_sign_form: () => dispatch(SHOW_SIGN_FORM_ACTION),
  })
)(Header);

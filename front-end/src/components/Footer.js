import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";

import './less/Footer.less';


const Footer = ({className}) => (
  <div className={'footer ' + className}>
    <div className='footer__container'>
      <FooterLinks />
      <div className='footer__email'>
        По всем вопросам пишите на&nbsp;
        <a href='mailto: ds.vologdin@yandex.ru'>ds.vologdin@yandex.ru</a>
      </div>
      <div className='footer__copy'>© 2018 ds.vologdin</div>
    </div>
  </div>
);

Footer.defaultProps = {
  className: '',
};
Footer.propTypes = {
  className: PropTypes.string,
};

const FooterLinks = () => (
  <div className='footer__links'>
    <Link className='footer__link' to='/company/'>О компании</Link>
    <Link className='footer__link' to='/reviews/'>Отзывы</Link>
    <Link className='footer__link' to='/contact/'>Контакты</Link>
  </div>
);


export default Footer;

import React from 'react';
import './less/Footer.less';

const Footer = ({className}) => (
  <div className={'footer ' + className}>
    <div className='footer__container'>
      <FooterLinks />
      <FooterEmail email='ds.vologdin@yandex.ru'/>
      <div className='footer__copy'>© 2018 ds.vologdin</div>
    </div>
  </div>
)

const FooterLinks = () => (
  <div className='footer__links'>
    <a className='footer__link' href='/company/'>О компании</a>
    <a className='footer__link' href='/reviews/'>Отзывы</a>
    <a className='footer__link' href='/contact/'>Контакты</a>
  </div>
)

const FooterEmail = ({email}) => (
  <div className='footer__email'>
    По всем вопросам пишите на&nbsp;
    <a href={'mailto:'+email}>{email}</a>
  </div>
)

export default Footer;

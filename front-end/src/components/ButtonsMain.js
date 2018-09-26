import React from 'react';
import PropTypes from "prop-types";

import './less/ButtonsMain.less';


const ButtonsMain = ({className}) => (
  <div className={'buttons ' + className}>
    <div className='buttons__button buttons__button--all-curses'>Все курсы</div>
    <div className='buttons__button buttons__button--dev-curses'>Курсы в разработке</div>
    <div className='buttons__button buttons__button--events'>Мероприятия</div>
  </div>
);

ButtonsMain.defaultProps = {
  className: '',
};
ButtonsMain.propTypes = {
  className: PropTypes.string,
};

export default ButtonsMain;

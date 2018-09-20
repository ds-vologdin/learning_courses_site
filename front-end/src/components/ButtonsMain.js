import React from 'react';
import './less/ButtonsMain.less';


const ButtonsMain = ({className}) => (
  <div className={'buttons ' + className}>
    <div className='buttons__button buttons__button--all-curses'>Все курсы</div>
    <div className='buttons__button buttons__button--dev-curses'>Курсы в разработке</div>
    <div className='buttons__button buttons__button--events'>Мероприятия</div>
  </div>
)

export default ButtonsMain;

import React from 'react';
import './less/ButtonsMain.less';


const ButtonsMain = ({className}) => (
  <div className={'buttons ' + className}>
    <ButtonMain className='buttons__button' text='Все курсы'/>
    <ButtonMain className='buttons__button' text='Курсы в разработке'/>
    <ButtonMain className='buttons__button' text='Мероприятия'/>
  </div>
)

const ButtonMain = ({className, text}) => (
  <div className={className}>{text}</div>
)

export default ButtonsMain;

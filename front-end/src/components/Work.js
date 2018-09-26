import React from 'react';
import PropTypes from "prop-types";

import './less/Work.less';

import ic_company_0 from './img/ic_company_0.svg';
import ic_company_1 from './img/ic_company_1.svg';
import ic_company_2 from './img/ic_company_2.svg';
import ic_company_3 from './img/ic_company_3.svg';
import ic_company_4 from './img/ic_company_4.svg';
import ic_company_5 from './img/ic_company_5.svg';
import ic_company_6 from './img/ic_company_6.svg';
import ic_company_7 from './img/ic_company_7.svg';
import ic_company_8 from './img/ic_company_8.svg';
import ic_company_9 from './img/ic_company_9.svg';


const Work = ({className}) => (
  <div className={'work ' + className}>
    <div className='work__title'>Нашим студентам предлагают работу</div>
    <div className='work__container'>
      <img className='work__image' src={ic_company_0} alt='company'></img>
      <img className='work__image' src={ic_company_1} alt='company'></img>
      <img className='work__image' src={ic_company_2} alt='company'></img>
      <img className='work__image work__image--active' src={ic_company_3} alt='company'></img>
      <img className='work__image work__image--active' src={ic_company_4} alt='company'></img>
      <img className='work__image work__image--active' src={ic_company_5} alt='company'></img>
      <img className='work__image work__image--active' src={ic_company_6} alt='company'></img>
      <img className='work__image work__image--active' src={ic_company_7} alt='company'></img>
      <img className='work__image' src={ic_company_8} alt='company'></img>
      <img className='work__image' src={ic_company_9} alt='company'></img>
    </div>
  </div>
);

Work.defaultProps = {
  className: '',
};
Work.propTypes = {
  className: PropTypes.string,
};


export default Work;

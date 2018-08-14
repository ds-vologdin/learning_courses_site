import React from 'react';
import './less/Work.less';
import ic_company_0 from'./img/ic_company_0.svg';
import ic_company_1 from'./img/ic_company_1.svg';
import ic_company_2 from'./img/ic_company_2.svg';
import ic_company_3 from'./img/ic_company_3.svg';
import ic_company_4 from'./img/ic_company_4.svg';
import ic_company_5 from'./img/ic_company_5.svg';
import ic_company_6 from'./img/ic_company_6.svg';
import ic_company_7 from'./img/ic_company_7.svg';
import ic_company_8 from'./img/ic_company_8.svg';
import ic_company_9 from'./img/ic_company_9.svg';



const Work = ({className}) => (
  <div className={'work ' + className}>
    <WorkTitle className='work__title'/>
    <div className='work__container'>
      <WorkImage className='work__image' image={ic_company_0} is_active={true}/>
      <WorkImage className='work__image' image={ic_company_1} is_active={true}/>
      <WorkImage className='work__image' image={ic_company_2} is_active={true}/>
      <WorkImage className='work__image' image={ic_company_3} is_active={true}/>
      <WorkImage className='work__image' image={ic_company_4} is_active={true}/>
      <WorkImage className='work__image' image={ic_company_5} is_active={true}/>
      <WorkImage className='work__image' image={ic_company_6} is_active={true}/>
      <WorkImage className='work__image' image={ic_company_7} is_active={true}/>
      <WorkImage className='work__image' image={ic_company_8} is_active={true}/>
      <WorkImage className='work__image' image={ic_company_9} is_active={true}/>
    </div>
  </div>
)

const WorkTitle = ({className}) => (
  <div className={className}>Нашим студентам предлагают работу</div>
)

const WorkImage = ({className, image, is_active}) => {
  if (is_active) {className += ' ' + className + '--active'}
  return (
    <img className={className} src={image} alt='company'></img>
  )
}

export default Work;

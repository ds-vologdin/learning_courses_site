import React from 'react';
import './less/Teachers.less';
import ic_teacher_0 from './img/ic_teacher_0.jpg';
import ic_teacher_1 from './img/ic_teacher_1.jpg';
import ic_teacher_2 from './img/ic_teacher_2.jpg';
import ic_teacher_3 from './img/ic_teacher_3.jpg';



const Teachers = ({className}) => (
  <div className={'teachers ' + className}>
    <TeachersTitle className='teachers__title'/>
    <div className='teachers__container'>
      <Teacher className='teachers__item' name='Василий Уткин' course='Разработчик Java' image={ic_teacher_0}/>
      <Teacher className='teachers__item' name='Павел Воробьёв' course='Machine Learning' image={ic_teacher_1}/>
      <Teacher className='teachers__item' name='Иван Орлов' course='Разработчик Python' image={ic_teacher_2}/>
      <Teacher className='teachers__item' name='Роман Гусев' course='Разработчик JS' image={ic_teacher_3}/>
    </div>
  </div>
)

const TeachersTitle = ({className}) => (
  <div className={className}>Наши преподаватели</div>
)

const Teacher = ({className, name, course, image}) => {
  className = 'teacher ' + className;
  return (
    <a className={className} href='#'>
        <div className='teacher__image' style={{ backgroundImage: `url(${image})` }}/>
        <div className='teacher__name'>{name}</div>
        <div className='teacher__course'>{course}</div>
    </a>
  )
}

export default Teachers;

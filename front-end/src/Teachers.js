import React from 'react';
import './less/Teachers.less';


const Teachers = ({className, teachers}) => {
  let teachers_elements = [];
  for (let teacher of teachers) {
    teachers_elements.push(
      <Teacher className='teachers__item'
        name={teacher.name} course={teacher.course}
        image={teacher.image} key={teacher.name}
      />
    )
  }
  return (
    <div className={'teachers ' + className}>
      <div className='teachers__title'>Наши преподаватели</div>
      <div className='teachers__container'>
        {teachers_elements}
      </div>
    </div>
  )
}

const Teacher = ({className, name, course, image}) => {
  className = 'teacher ' + className;
  return (
    <a className={className} href='/teacher/id/'>
        <div className='teacher__image' style={{ backgroundImage: `url(${image})` }}/>
        <div className='teacher__name'>{name}</div>
        <div className='teacher__course'>{course}</div>
    </a>
  )
}

export default Teachers;

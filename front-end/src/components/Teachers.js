import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";

import './less/Teachers.less';


const Teachers = ({className, teachers}) => (
  <div className={'teachers ' + className}>
    <div className='teachers__title'>Наши преподаватели</div>
    <div className='teachers__container'>
      {teachers.map(t =>  <Teacher className='teachers__item'name={t.name} course={t.course} image={t.image} key={t.name}/>)}
    </div>
  </div>
);

Teachers.defaultProps = {
  className: '',
  teachers: [],
};
Teachers.propTypes = {
  className: PropTypes.string,
  teachers: PropTypes.array,
};


const Teacher = ({className, name, course, image}) => {
  className = 'teacher-item ' + className;
  return (
    <Link className={className} to='/teacher/id/'>
        <div className='teacher-item__image' style={{ backgroundImage: `url(${image})` }}/>
        <div className='teacher-item__name'>{name}</div>
        <div className='teacher-item__course'>{course}</div>
    </Link>
  )
};

Teacher.defaultProps = {
  className: '',
  name: '',
  course: '',
};
Teacher.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  course: PropTypes.string,
};

export default Teachers;

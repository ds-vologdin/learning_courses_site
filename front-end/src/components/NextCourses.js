import React from 'react';
import PropTypes from "prop-types";

import './less/NextCourses.less';
import book_logo from'./img/book.svg';


const NextCourses = ({className, courses}) => (
  <div className={'next-courses ' + className}>
    <div className='next-courses__container'>
      <div className='next-courses__title'>Ближайшие курсы</div>
      <div className='next-courses__items'>
        {courses.map(c => <Course className='next-courses__item' title={c.title} date={c.date} duration={c.duration} key={c.title + c.date}/>)}
      </div>
    </div>
  </div>
);

NextCourses.defaultProps = {
  className: '',
  courses: [],
};
NextCourses.propTypes = {
  className: PropTypes.string,
  courses: PropTypes.array,
};

const Course = ({className, title, date, duration}) => (
  <div className={'course ' + className}>
    <div className='course__text'>
      <div className='course__title'>{title}</div>
      <div className='course__begin'>Начало с {date}</div>
      <div className='course__duration'>Продолжительность {duration} мес.</div>
    </div>
    <img src={book_logo} className='course__img' alt='course'/>
  </div>
);

Course.defaultProps = {
  className: '',
  title: '',
  date: '',
  duration: '',
};
Course.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  duration: PropTypes.string,
};


export default NextCourses;

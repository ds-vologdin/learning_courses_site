import React from 'react';
import './less/NextCourses.less';
import book_logo from'./img/book.svg';


const NextCourses = ({className, courses}) => {
  let courses_elements = [];
  for (let course of courses) {
    courses_elements.push(
      <Course className='next-courses__item' title={course.title} date={course.date} duration={course.duration}/>
    )
  }
  return (
    <div className={'next-courses ' + className}>
      <div className='next-courses__container'>
        <div className='next-courses__title'>Ближайшие курсы</div>
        <div className='next-courses__items'>
          {courses_elements}
        </div>
      </div>
    </div>
  )
}

const Course = ({className, title, date, duration}) => (
  <div className={'course ' + className}>
    <div className='course__text'>
      <div className='course__title'>{title}</div>
      <div className='course__begin'>Начало с {date}</div>
      <div className='course__duration'>Продолжительность {duration} мес.</div>
    </div>
    <img src={book_logo} className='course__img' alt='course'/>
  </div>
)

export default NextCourses;

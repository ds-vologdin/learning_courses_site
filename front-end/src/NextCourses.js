import React from 'react';
import './less/NextCourses.less';
import book_logo from'./img/book.svg';


const NextCourses = ({className}) => (
  <div className={'next-courses ' + className}>
    <div className='next-courses__container'>
      <NextCoursesTitle className='next-courses__title'/>
      <div className='next-courses__items'>
        <Course className='next-courses__item' title='Разработчик Python' date='2018.09.13' duration='6'/>
        <Course className='next-courses__item' title='Разработчик Java' date='2018.10.13' duration='6'/>
        <Course className='next-courses__item' title='WEB Python' date='2018.10.21' duration='6'/>
        <Course className='next-courses__item' title='Machine Learning' date='2018.10.29' duration='7'/>
      </div>
    </div>
  </div>
)

const NextCoursesTitle = ({className}) => (
  <div className={className}>
    Ближайшие курсы
  </div>
)

const Course = ({className, title, date, duration}) => (
  <div className={'course ' + className}>
    <div className='course__text'>
      <CourseTitle className='course__title' title={title}/>
      <CourseBegin className='course__begin' date={date}/>
      <CourseDuration className='course__duration' duration={duration}/>
    </div>
    <CourseImage className='course__img'/>
  </div>
)

const CourseTitle = ({className, title}) => (
  <div className={className}>{title}</div>
)

const CourseBegin = ({className, date}) => (
  <div className={className}>Начало с {date}</div>
)

const CourseDuration = ({className, duration}) => (
  <div className={className}>Продолжительность {duration} мес.</div>
)

const CourseImage = ({className}) => (
  <img src={book_logo} className={className} alt='course'/>
)


export default NextCourses;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import fetch_teacher_courses from '../actions/teacher_courses';


class Teacher extends Component {
  componentDidMount() {
    this.props.fetch_teacher_courses(this.props.id_teacher);
  }
  render() {
    return (
      <div className='teacher__container'>
        <div className='teacher__title'>Мои курсы</div>
        <div className='teacher__courses'>
          {this.props.teacher_courses.map(
            course => (
              <Course name={course.name} date={course.date} key={course.name+course.date}>
                {course.students.map(
                  student => (
                    <Link className={'course-students__link'} to={'/teacher_room/'+course.id+'/'+student.id} key={student.id}>{student.name}</Link>
                  )
                )}
              </Course>
            )
          )}
        </div>
      </div>
    );
  }
};

Teacher.defaultProps = {
  id_teacher: '',
  teacher_courses: [],
};

const Course = ({name, date, id, children}) => (
  <div className='teacher__course'>
    <div className='teacher__course-name'>{name} ({date})</div>
    <div className='teacher__course-students course-students'>
      {children}
    </div>
  </div>
);

Course.defaultProps = {
  name: '',
  date: '',
}

export default connect(
  state => ({
    teacher_courses: state.teacher_courses,
    id_teacher: state.session.id,
  }),
  dispatch => ({
    fetch_teacher_courses: (id_teacher) => dispatch(fetch_teacher_courses(id_teacher)),
  })
)(Teacher);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetch_student_progress_action from '../actions/student_progress';
import './less/StudentProgress.less';


class StudentProgress extends Component {
  componentDidMount() {
    this.props.fetch_student_progress();
  }
  render() {
    return (
      <div className='student-progress'>
        <div className='student-progress__title'>Успеваемость</div>
        {this.props.courses.map(course => <CourseStudentProgress name={course.name} tasks={course.tasks} key={course.name}/>)}
      </div>
    );
  }
};

StudentProgress.defaultProps = {
  courses: [],
};

const CourseStudentProgress = ({name, tasks}) => (
  <div className='student-progress__course-tasks course-tasks'>
    <div className='course-tasks__name-course'>{name}</div>
    <div className='course-tasks__items'>
      {tasks.map(task => <Task name={task.name} description={task.description} status={task.status} key={task.name} />)}
    </div>
  </div>
);

CourseStudentProgress.defaultProps = {
  name: '',
  tasks: [],
};

const Task = ({name, description, status}) => (
  <div className='course-tasks__task task'>
    <div className='task__name'>{name}</div>
    <div className='task__description'>{description}</div>
    <div className='task__status'>{status}</div>
  </div>
);

Task.defaultProps = {
  name: '',
  description: '',
  status: '',
}

export default connect(
  state => ({
    courses: state.student_progress,
    token: state.session.token,
  }),
  dispatch => ({
    fetch_student_progress: () => dispatch(fetch_student_progress_action()),
  })
)(StudentProgress);

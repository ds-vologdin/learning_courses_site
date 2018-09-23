import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetch_student_progress_action from '../actions/student_progress'


class StudentProgress extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetch_student_progress();
  }
  render() {
    console.log(this.props);
    return (
      <div className='student-progress'>
        <div className='student-progress__title'>Успеваемость</div>
        <div className='student-progress__course-name'>Python</div>
        {this.props.courses.map(course => <CourseStudentProgress name={course.name} tasks={course.tasks} key={course.name}/>)}
      </div>
    );
  }
};

StudentProgress.defaultProps = {
  courses: [],
}

class CourseStudentProgress extends Component {
  render() {
    console.log(this.props.tasks........);
    console.log(this.props.tasks.map(task => <Task name={task.name} description={task.description} status={task.status} key={task.name} />));
    return (
      <div className='student-progress__course-tasks course-tasks'>
        <div className='course-task__name-course'>{this.props.name}</div>
      </div>
   );
  }
};
// {this.props.tasks.map(task => <Task name={task.name} description={task.description} status={task.status} key={task.name} />)}

CourseStudentProgress.defaultProps = {
  tasks: [],
}

const Task = (name, description, status) => (
  <div className='course-tasks__task task'>
    <div className='task__name'>{name}</div>
    <div className='task__description'>{description}</div>
    <div className='task__status'>{status}</div>
  </div>
);

export default connect(
  state => ({
    courses: state.student_progress,
    token: state.session.token,
  }),
  dispatch => ({
    fetch_student_progress: () => dispatch(fetch_student_progress_action()),
  })
)(StudentProgress);

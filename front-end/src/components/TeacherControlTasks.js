import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import fetch_user_courses_task_action from '../actions/user_course_tasks';
import Task from './Task';
import './less/TeacherControlTasks.less';


class TeacherControlTasks extends Component {
  componentDidMount() {
    this.props.fetch_user_courses_task(this.props.match.params.course_id, this.props.match.params.student_id);
  }
  render() {
    return (
      <div className='teacher-control'>
        <div className='teacher-control__course'>{this.props.course}</div>
        <div className='teacher-control__student'>{this.props.student}</div>
        <div className='teacher-control__tasks'>
          {this.props.tasks.map(task => <Task name={task.name} description={task.description} status={task.status} show_buttons={true} key={task.name} />)}
        </div>
        <Link className='teacher-control__link-back' to='/teacher_room/'>Назад</Link>
      </div>
    );
  }
};


TeacherControlTasks.defaultProps = {
  id_teacher: '',
  teacher_courses: [],
};


export default connect(
  state => ({
    tasks: state.user_course_tasks.tasks,
    student: state.user_course_tasks.student,
    course: state.user_course_tasks.course,
    id_teacher: state.session.id,
  }),
  dispatch => ({
    fetch_user_courses_task: (id_course, id_student) => dispatch(fetch_user_courses_task_action(id_course, id_student)),
  })
)(TeacherControlTasks);

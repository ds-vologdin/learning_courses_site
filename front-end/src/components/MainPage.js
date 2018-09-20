import React, { Component } from 'react';
import { connect } from 'react-redux';

import './less/MainPage.less';
import Header from './Header';
import NextCourses from './NextCourses';
import ButtonsMain from './ButtonsMain';
import Work from './Work';
import Teachers from './Teachers';
import ModalSign from './Sign';
import fetch_top_teachers_action from '../actions/fetch_top_teachers'
import fetch_next_courses_action from '../actions/fetch_next_courses'
import {show_sign_form_action, hide_sign_form_action} from '../actions/sign_form'


class MainPage extends Component {
  componentDidMount() {
    this.props.set_top_teachers();
    this.props.set_next_courses();
  }
  render() {
    return (
      <div className='main app__main'>
        {this.props.is_active_sign_form && <ModalSign className="app__sign" close={this.props.hide_sign_form}/>}
        <NextCourses className="main__next-courses" courses={this.props.courses}/>
        <ButtonsMain className="main__buttons"/>
        <Work className="main__work"/>
        <Teachers className="main__teachers" teachers={this.props.teachers}/>
      </div>
    );
  }
}

export default connect(
  state => ({
    teachers: state.top_teachers,
    courses: state.next_courses,
    is_active_sign_form: state.sign_form.is_active_sign_form,
  }),
  dispatch => ({
    set_top_teachers: () => dispatch(fetch_top_teachers_action()),
    set_next_courses: () => dispatch(fetch_next_courses_action()),
    show_sign_form: () => dispatch(show_sign_form_action()),
    hide_sign_form: () => dispatch(hide_sign_form_action()),
  })
)(MainPage);

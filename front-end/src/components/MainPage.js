import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import './less/MainPage.less';
import NextCourses from './NextCourses';
import ButtonsMain from './ButtonsMain';
import Work from './Work';
import Teachers from './Teachers';
import ModalSign from './Sign';
import fetch_top_teachers_action from '../actions/fetch_top_teachers';
import fetch_next_courses_action from '../actions/fetch_next_courses';
import {SHOW_SIGN_FORM_ACTION, HIDE_SIGN_FORM_ACTION} from '../actions/sign_form';


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
};

MainPage.defaultProps = {
  is_active_sign_form: false,
  hide_sign_form: () => true,
  courses: [],
  teachers: [],
};
MainPage.propTypes = {
  is_active_sign_form: PropTypes.bool,
  hide_sign_form: PropTypes.func,
  courses: PropTypes.array,
  teachers: PropTypes.array,
};

export default connect(
  state => ({
    teachers: state.top_teachers,
    courses: state.next_courses,
    is_active_sign_form: state.sign_form.is_active_sign_form,
  }),
  dispatch => ({
    set_top_teachers: () => dispatch(fetch_top_teachers_action()),
    set_next_courses: () => dispatch(fetch_next_courses_action()),
    show_sign_form: () => dispatch(SHOW_SIGN_FORM_ACTION),
    hide_sign_form: () => dispatch(HIDE_SIGN_FORM_ACTION),
  })
)(MainPage);

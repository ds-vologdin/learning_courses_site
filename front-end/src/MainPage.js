import React, { Component } from 'react';

import './less/MainPage.less';
import Header from './Header';
import NextCourses from './NextCourses';
import ButtonsMain from './ButtonsMain';
import Work from './Work';
import Teachers from './Teachers';
import Footer from './Footer';
import ModalSign from './Sign';

import ic_teacher_0 from './img/ic_teacher_0.jpg';
import ic_teacher_1 from './img/ic_teacher_1.jpg';
import ic_teacher_2 from './img/ic_teacher_2.jpg';
import ic_teacher_3 from './img/ic_teacher_3.jpg';


// TODO: убрать MOCK, данные получать из бекенда
const MOCK_TEACHERS = [
  {name:'Василий Уткин', course:'Разработчик Java', image:ic_teacher_0},
  {name:'Павел Воробьёв', course:'Machine Learning', image:ic_teacher_1},
  {name:'Иван Орлов', course:'Разработчик Python', image:ic_teacher_2},
  {name:'Роман Гусев', course:'Разработчик JS', image:ic_teacher_3},
];

const MOCK_COURSES = [
  {title:'Разработчик Python', date:'2018.09.13', duration:'6'},
  {title:'Разработчик Java', date:'2018.10.13', duration:'6'},
  {title:'WEB Python', date:'2018.10.21', duration:'6'},
  {title:'Machine Learning', date:'2018.10.29', duration:'7'},
];


class MainPage extends Component {
  constructor(props) {
      super();
      this.state = {
          is_active_sign_form: false,
      };
  }
  checker_sign_form = () => {
      this.setState({
          is_active_sign_form: !this.state.is_active_sign_form
      });
  }
  show_sign_form = () => {
    this.setState({
        is_active_sign_form: true,
    });
  }
  hide_sign_form = () => {
    this.setState({
        is_active_sign_form: false,
    });
  }
  render() {
    return (
      <div className='main app__main'>
        {this.state.is_active_sign_form && <ModalSign className="app__sign" close={this.hide_sign_form}/>}
        <Header className="main__header" action={this.show_sign_form} sign_button={this.props.sign_button}/>
        <NextCourses className="main__next-courses" courses={MOCK_COURSES}/>
        <ButtonsMain className="main__buttons"/>
        <Work className="main__work"/>
        <Teachers className="main__teachers" teachers={MOCK_TEACHERS}/>
        <Footer className="main__footer"/>
      </div>
    );
  }
}

export default MainPage;

import React, { Component } from 'react';

import './less/MainPage.less';
import Header from './Header';
import NextCourses from './NextCourses';
import ButtonsMain from './ButtonsMain';
import Work from './Work';
import Teachers from './Teachers';
import Footer from './Footer';
import ModalSign from './Sign';


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
        <NextCourses className="main__next-courses"/>
        <ButtonsMain className="main__buttons"/>
        <Work className="main__work"/>
        <Teachers className="main__teachers"/>
        <Footer className="main__footer"/>
      </div>
    );
  }
}

export default MainPage;

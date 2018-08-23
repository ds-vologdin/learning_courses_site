import React, { Component } from 'react';
import './App.less';
import Header from './Header';
import NextCourses from './NextCourses';
import ButtonsMain from './ButtonsMain';
import Work from './Work';
import Teachers from './Teachers';
import Footer from './Footer';
import ModalSign from './Sign';


class App extends Component {
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
      <div className="app">
        <div className='app__container'>
          {this.state.is_active_sign_form && <ModalSign className="app__sign" action={this.hide_sign_form}/>}
          <Header className="app__header" action={this.show_sign_form}/>
          <NextCourses className="app__next-courses"/>
          <ButtonsMain className="app__buttons"/>
          <Work className="app__work"/>
          <Teachers className="app__teachers"/>
          <Footer className="app__footer"/>
        </div>
      </div>
    );
  }
}

export default App;

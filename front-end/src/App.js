import React, { Component } from 'react';
import './App.less';
import Header from './Header'
import NextCourses from './NextCourses'
import ButtonsMain from './ButtonsMain'
import Work from './Work'


class App extends Component {
  render() {
    return (
      <div className="app">
        <div className='app__container'>
          <Header className="app__header"/>
          <NextCourses className="app__next-courses"/>
          <ButtonsMain className="app__buttons"/>
          <Work className="app__work"/>
        </div>
      </div>
    );
  }
}

export default App;

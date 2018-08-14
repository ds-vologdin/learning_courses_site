import React, { Component } from 'react';
import './App.less';
import Header from './Header'
import NextCourses from './NextCourses'
import ButtonsMain from './ButtonsMain'


class App extends Component {
  render() {
    return (
      <div className="app">
        <Header className="app__header"/>
        <NextCourses className="app__next-courses"/>
        <ButtonsMain className="app__buttons"/>
      </div>
    );
  }
}

export default App;

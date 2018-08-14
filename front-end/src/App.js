import React, { Component } from 'react';
import './App.less';
import Header from './Header'
import NextCourses from './NextCourses'


class App extends Component {
  render() {
    return (
      <div className="app">
        <Header className="app__header"/>
        <NextCourses className="app__next-courses"/>
      </div>
    );
  }
}

export default App;

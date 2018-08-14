import React, { Component } from 'react';
import './App.less';
import Header from './Header'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header className="app__header"/>
      </div>
    );
  }
}

export default App;

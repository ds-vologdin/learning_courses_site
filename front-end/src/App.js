import React, { Component } from 'react';
import './less/App.less';
import MainPage from './MainPage';



class App extends Component {
  constructor(props) {
      super();
      this.state = {
          page: 'main',
      };
  }
  render() {
    return (
      <div className="app">
        <div className='app__container'>
        {this.state.page === 'main' && <MainPage />}
        </div>
      </div>
    );
  }
}

export default App;

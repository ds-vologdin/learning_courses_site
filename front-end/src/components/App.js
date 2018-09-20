import React, { Component } from 'react';
import {Provider} from 'react-redux'
import store from '../store/AppStore'
import './less/App.less';
import MainPage from './MainPage';
import Settings from './Settings';


class App extends Component {
  constructor(props) {
      super();
      this.state = {
          page: 'main',
          // page: 'settings',
      };
  }
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <div className='app__container'>
          {this.state.page === 'main' && <MainPage sign_button={true}/>}
          {this.state.page === 'settings' && <Settings sign_button={false}/>}
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;

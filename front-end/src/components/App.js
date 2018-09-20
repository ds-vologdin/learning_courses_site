import React from 'react';
import {Provider} from 'react-redux'
import {HashRouter, Route, Switch} from 'react-router-dom';

import store from '../store/AppStore'
import './less/App.less';
import MainPage from './MainPage';
import Settings from './Settings';
import Footer from './Footer';


const App = () => (
  <Provider store={store}>
    <HashRouter>
      <div className="app">
        <div className='app__container'>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/lk" component={Settings} />
          </Switch>
          <Footer className="main__footer"/>
        </div>
      </div>
    </HashRouter>
  </Provider>
);

export default App;

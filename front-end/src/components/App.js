import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter, Route, Switch} from 'react-router-dom';

import store from '../store/AppStore'
import './less/App.less';
import MainPage from './MainPage';
import Settings from './Settings';
import Teacher from './Teacher';
import TeacherControlTasks from './TeacherControlTasks';
import Header from './Header';
import Footer from './Footer';


const App = () => (
  <Provider store={store}>
    <HashRouter>
      <div className="app">
        <div className='app__container'>
          <Header className="main__header"/>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/lk" component={Settings} />
            <Route exact path="/teacher_room/" component={Teacher} />
            <Route exact path="/teacher_room/:course_id/:student_id" component={TeacherControlTasks} />
          </Switch>
          <Footer className="main__footer"/>
        </div>
      </div>
    </HashRouter>
  </Provider>
);

export default App;

import React, { Component } from 'react';

import './less/Settings.less';
import Header from './Header';
import Footer from './Footer';


class Settings extends Component {
  render() {
    return (
      <div className='settings app__settings'>
        <Header className="main__header" sign_button={this.props.sign_button}/>
        <Footer className="main__footer"/>
      </div>
    );
  }
}

export default Settings;

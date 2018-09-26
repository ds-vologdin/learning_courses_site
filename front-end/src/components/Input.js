import React, { Component } from 'react';
import PropTypes from "prop-types";

import './less/Input.less';

export default class Input extends Component {
  constructor(props) {
      super();
      this._value = '';
  }
  set_value_input_ref = (event) => {this._value = event.target.value}
  render () {
    let label = this.props.label;
    let className = this.props.className;
    let type_input = this.props.type_input;
    return (
      <label className={'input-wrapper ' + className}>
        <span className='input-wrapper__label'>{label}</span>
        <input type={type_input} className='input-wrapper__input' onChange={this.set_value_input_ref}/>
      </label>
    );
  }
};

Input.defaultProps = {
  label: '',
  className: '',
  type_input: 'text',
};
Input.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  type_input: PropTypes.string,
};

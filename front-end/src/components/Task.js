import React from 'react';

import './less/Task.less';


const Task = ({name, description, status, className, show_buttons}) => (
  <div className={'task ' + className}>
    <div className='task__name'>{name}</div>
    <div className='task__description'>{description}</div>
    <div className='task__status'>{status}</div>
    {
      show_buttons &&
      <div className='task__buttons'>
        <div className='task__button'>Принять</div>
        <div className='task__button'>На доработку</div>
      </div>
    }
  </div>
);

Task.defaultProps = {
  name: '',
  description: '',
  status: '',
  show_buttons: false,
};

export default Task;

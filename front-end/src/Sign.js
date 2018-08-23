import React from 'react';
import './less/Sign.less';


const ModalSign = ({className, action}) => (
  <div className={'modal-sign ' + className}>
    <div className='modal-sign__content'>
      <ModalSignClose action={ action } />
      <div className='modal-sign__buttons'>lalala</div>
    </div>
  </div>
)


const ModalSignClose = ({action}) => (
  <span className='modal-sign__close' onClick={ action }>x</span>
);

export default ModalSign;

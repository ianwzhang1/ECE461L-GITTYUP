import React from 'react';
import './SignUpBox.css';
import SignUp from './SignUp';

function SignUpBox() {
  return (
    <div className = 'BoxMaster'>
      <SignUp></SignUp>

    <div className = 'outermostEllipse'></div>
    <div className = 'middleEllipse'></div>
    <div className = 'innermostEllipse'></div>


    </div>
  );
}

export default SignUpBox;
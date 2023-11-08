import React from 'react';
import './NewBox.css';
import Login from './Login';

function NewBox() {
  return (
    <div className = 'BoxMaster'>
      <Login></Login>

    <div className = 'outermostEllipse'></div>
    <div className = 'middleEllipse'></div>
    <div className = 'innermostEllipse'></div>


    </div>
  );
}

export default NewBox;
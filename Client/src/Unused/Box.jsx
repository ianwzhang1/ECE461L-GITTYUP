import React from 'react';
import './box.css';

function Box(props) {
  return (
    <div className = 'BoxMasterFF'>
      {props.children}

      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="BG">
            <div className="overlap-group">
              <div className="ellipse" />
              <div className="div" />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Box;

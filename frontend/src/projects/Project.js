import React from 'react';
import  './Project.css';
//Props needs name, list of users, 
//and qty from hardware sets

function Project(props) {
    return (
      <div className='ProjectContainer'>
        <header className='name'>{props.Name}</header>
        <p className='users'>{props.Users}</p>
        <div className='HWSet'>
            <header>HWSet1: {props.HWSet1} /100</header>
            <header>HWSet2: {props.HWSet2} /100</header>
        </div>
        <div className='checkIn/Out'>
          <div className='HWSet1Buttons'>
            <input type='text'></input>
            <button>Check In</button>
            <button>Check Out</button>
          </div>
          <div className='HWSet2Buttons'>
            <input type='text'></input>
            <button>Check In</button>
            <button>Check Out</button>
            </div>
        </div>
        <button className='joinButton'>Join</button>
      </div>
    )
  }
  
  export default Project;
import React from 'react';
import './NewBox.css';
import Login from './Login.js';

class NewBox extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='BoxMaster'>
                <Login></Login>

                <div className='outermostEllipse'></div>
                <div className='middleEllipse'></div>
                <div className='innermostEllipse'></div>


            </div>
        );
    }
}

export default NewBox;
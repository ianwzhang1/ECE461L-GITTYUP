import React from 'react';

function IconButton(props) {
    return (
        <button onClick={props.onClick}><i className={props.icon}></i>{" " + props.text}</button>
    )
}

export default IconButton;
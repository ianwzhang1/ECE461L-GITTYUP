import React from 'react';

class IconButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button onClick={this.props.onClick}><i className={this.props.icon}></i>{" " + this.props.text}</button>
        )
    }
}

export default IconButton;
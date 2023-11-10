import React from 'react';

class PageTitle extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="page-title">
                <h1><i className={this.props.icon + " page-logo"}/>{" " + this.props.text}</h1>
            </div>
        )
    }
}

export default PageTitle;
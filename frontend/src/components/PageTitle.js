import React from 'react';

class PageTitle extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="page-title">
                <h1><i className="fa fa-folder-open page-logo"/>{this.props.text}</h1>
            </div>
        )
    }
}

export default PageTitle;
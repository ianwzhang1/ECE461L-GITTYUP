import React from 'react';

function PageTitle(props) {
    return (
        <div className="page-title">
            <h1><i className={props.icon + " page-logo"}/>{" " + props.text}</h1>
        </div>
    )
}

export default PageTitle;
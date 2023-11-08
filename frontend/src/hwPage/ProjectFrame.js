import './ProjectFrame.css';
import React from 'react';




export const ProjectFrame = () => {

    return(
        <div className="ProjectFrame">
            <div className="frame">
                <div className="top-div">
                    <div className="collaborators-div">
                        <div className="collaborators-text">add collaborators +</div>
                    </div>
                    <div className="text">Hardware +</div>
                </div>
                <div className="HWSets-div">
                    <div className="HWSet-div1">
                        <div className="HWSet-widget">
                            <div className="HWset-text">HWSet</div>
                        </div>
                    </div>
                    <div className="HWSet-div2">
                        <div className="HWSet-widget">
                            <div className="HWset-text">HWSet</div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export const CommentsPage = () =>{
    return(
        <div className="CommentsPage">
            <div className="Comments-window">
                <div className="comments-text">Comments</div>
            </div>
        </div>

    );
};
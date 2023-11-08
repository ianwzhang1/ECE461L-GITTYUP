import React from 'react'
import "./box.css";



export const Box = () => {
    return(
        <div className="box">
            <div className="home-box">
                <img className="icon-home" alt="Icon home" src="icon_home_.svg" />    
            </div>
            <div className="file-box">
                <img className="icon-library" alt="Icon library" src="icon_Library_.svg" />
            </div>
            <div className="library-box">
                <img className="icon-addess-book" alt="Icon address book" src="icon_address book_.svg" />
            </div>
            <div className="settings-box">
                <img className="icon-settings" alt="Icon settings" src="icon_settings_.svg" />
            </div>
            <div className="profile-box">
                <img className="icon-folder-file" alt="Icon folder file" src="icon_folder file project_.svg" />
                
            </div>                    
        </div>
    );
};
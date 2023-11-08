import React from "react"

import "./hwset.css";

export const HWSet = () => {
    return(
        <div className="hwset">
            <div className="set-div1">
                <div className="text">HWSet1</div>
                <img className="icon-wrench" alt="Icon Wrench" src="icon_Wrench_.svg" />
            </div>
            <div className="set-div2">
                <div className="text">HWSet2</div>
                <img className="icon-wrench" alt="Icon Wrench" src="icon_Wrench_.svg" />
            </div>
        </div>
    )
}
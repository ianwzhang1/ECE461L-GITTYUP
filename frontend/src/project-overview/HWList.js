import React from "react"

import "./hwlist.css";

function HWList(props) {
    return (
        <div>
            <h2>Hardware Sets</h2>
            <div className='hwlist-container'>
                <div className="hwset">
                    {props.hw.map((hardware) => (
                        <label className="hwset-title">{hardware.name + ": " + hardware.quant}</label>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HWList;
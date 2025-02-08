import React from "react";

// yaha pr as a props hum is text ko use kr rahe h 
const HighlightText = ({text}) => {
    return (
        <span className="font-bold text-richblue-300 ">
           {" "} 
           {text}
        </span>
    )
}

export default HighlightText

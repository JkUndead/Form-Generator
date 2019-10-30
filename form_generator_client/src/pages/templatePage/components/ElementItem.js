import React from 'react';
//import { Link } from 'react-router-dom';

const ElementItem = ({name,type}) => {
    return (
        <li>
            <span>{name}: </span>
            <i>{type}</i>
            <span>       
                    <button style={{ "display": "inline", "margin": "2px" }} className="btn btn-warning">Update</button>
            </span>
            <span>
                <button style={{ "display": "inline", "margin": "2px" }} className="btn btn-danger" >Delete</button>
            </span>
        </li>
    )
}



export default ElementItem;
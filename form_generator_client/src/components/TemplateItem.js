import React from 'react';
import { Link } from 'react-router-dom';

const TemplateItem = ({ _id, title, onDelete }) => {
    return (
        <li>
            <span>{title}</span>
            <span>
                <Link to={`/templates/${_id}`}>
                    <button style={{ "display": "inline", "margin": "2px" }} className="btn btn-warning">Update</button>
                </Link>

            </span>
            <span>
                <button style={{ "display": "inline", "margin": "2px" }} className="btn btn-danger" onClick={onDelete}>Delete</button>
            </span>
        </li>
    )
}



export default TemplateItem;
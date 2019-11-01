import React from 'react';
import { Link } from 'react-router-dom';

const TemplateItem = ({ _id, title, owner, duration, onDelete }) => {
    return (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
            <div className="card bg-light mb-3" style={{ "width": "18rem" }}>
                <div className="card-header">{title}</div>
                <div className="card-body">
                    
                    <h6 className="card-subtitle mb-2 text-muted">{owner}</h6>
                    <p className="card-text">{duration}</p>
                    <span className="card-link">
                        <Link to={`/templates/${_id}`}>
                            <button style={{ "display": "inline", "margin": "2px" }} className="btn btn-warning">Update</button>
                        </Link>
                    </span>
                    <span className="card-link">
                        <button style={{ "display": "inline", "margin": "2px" }} className="btn btn-danger" onClick={onDelete}>Delete</button>
                    </span>
                </div>

            </div>
        </div>
    )
}



export default TemplateItem;
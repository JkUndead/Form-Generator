import React from 'react';
//import { Link } from 'react-router-dom';

const ElementItem = ({ name, type, onDelete }) => {
    return (
        <div className=" form-group row">
            <label className="col-sm-4 col-md-2 col-form-label">
                {name}:
            </label>
            <div className="col-sm-8 col-md-10">
                <input className="form-control" type={`${type}`} />
                <span>
                    <button 
                        style={{ "display": "inline", "margin": "2px" }} 
                        className="btn btn-warning"
                    >Update
                    </button>
                </span>
                <span>
                    <button 
                        style={{ "display": "inline", "margin": "2px" }} 
                        className="btn btn-danger" 
                        onClick={onDelete} 
                        >Delete
                    </button>
                </span>
            </div>
        </div>
    )
}



export default ElementItem;
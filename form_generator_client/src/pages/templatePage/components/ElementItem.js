import React from 'react';
//import { Link } from 'react-router-dom';

const ElementItem = ({ name, type, onDelete, onUpdate }) => {

    return (
        <div className=" form-group row">
            <label className="col-sm-4 col-md-2 col-form-label">
                {name}:
            </label>
            <div className="col-sm-8 col-md-10">
                <input className="form-control" type={`${type}`} />
                <div className="row mt-2 pl-2">
                    <div>
                        <button
                            style={{ "display": "inline", "margin": "2px" }}
                            className="btn btn-warning mr-3"
                            onClick={onUpdate}
                        >Update
                    </button>
                    </div>
                    <div>
                        <button
                            style={{ "display": "inline", "margin": "2px" }}
                            className="btn btn-danger"
                            onClick={onDelete}
                        >Delete
                    </button>
                    </div>
                </div>

            </div>
        </div>
    )
}



export default ElementItem;
import React from 'react';
import { Link } from 'react-router-dom';

const FormItem = ({ _id, title, duration, header }) => {
    return (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
            <div className="card bg-light mb-3" style={{ "width": "18rem" }}>
                <div className="card-header">{title}</div>
                <div className="card-body">

                    <h6 className="card-subtitle mb-2 text-muted">Duration: {duration}</h6>
                    <p className="card-text">Click button below to start using this form.</p>
                    <span className="card-link">
                        <Link to={{
                            pathname: '/forms/new',
                            state: {
                                id: _id,
                                header: header
                            }
                        }}>
                            <button style={{ "display": "inline", "margin": "2px" }} className="btn btn-info">Access</button>
                        </Link>
                    </span>
                </div>

            </div>
        </div>
    )
}

export default FormItem;
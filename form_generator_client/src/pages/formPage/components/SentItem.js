import React from 'react';
import { Link } from 'react-router-dom';

const SentItem = ({ _id, status, template, submission_date, header }) => {
    return (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
            <div className="card bg-light mb-3" style={{ "width": "18rem" }}>
                <div className="card-header">{template.title}</div>
                <div className="card-body">
                    
                    <h6 className="card-subtitle mb-2 text-muted">{status}</h6>
                    <p className="card-text"><i>Submitted on: <br></br></i>{submission_date}</p>
                    <span className="card-link">
                        <Link to={{
                            pathname: `/forms/${_id}`,
                            state: {
                                id: _id,
                                header: header
                            }
                        }}>
                            <button style={{ "display": "inline", "margin": "2px" }} className="btn btn-info">More Info</button>
                        </Link>
                    </span>
                </div>

            </div>
        </div>
    )
}

export default SentItem;
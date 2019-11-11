import React from 'react';
import { Link } from 'react-router-dom';

const ApprovalItem = ({ _id, template, author, submission_date, header, status, userName, onDelete }) => {
    return (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
            <div className="card bg-light mb-3" style={{ "width": "18rem" }}>
                <div className="card-header">{template.title}</div>
                <div className="card-body">

                    <h6 className="card-subtitle mb-2 text-muted">Sender: {author.username}</h6>
                    <p className="card-text"><i>Submitted on: <br></br></i>{submission_date.slice(0, 10).replace(/-/g, "/")}</p>
                    <span className="card-link">
                        <Link to={{
                            pathname: `/${status.toLowerCase()}/${_id}`,
                            state: {
                                id: _id,
                                header: header,
                                userName: userName,
                                status: status.toLowerCase()
                            }
                        }}>
                            <button style={{ "display": "inline", "margin": "2px" }} className="btn btn-info">Access</button>
                        </Link>
                    </span>
                    {(status !== "Pending") ?
                        <span className="card-link">
                            <button style={{ "display": "inline", "margin": "2px" }} className="btn btn-danger" onClick={onDelete}>Delete</button>
                        </span>
                        : null
                    }

                </div>

            </div>
        </div>
    )
}

export default ApprovalItem;
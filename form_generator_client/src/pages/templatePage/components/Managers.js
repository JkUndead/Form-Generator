import React from 'react';

const Managers = ({ managerName, onDelete }) => (
    <div className="row mt-2">
        <li className=" col-md-3">{managerName} </li>
        <span className="col-md-8" onClick={onDelete}><i className="far fa-times-circle"></i></span>
    </div>
)

export default Managers;
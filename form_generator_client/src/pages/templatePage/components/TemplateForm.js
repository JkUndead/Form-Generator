import React from 'react';
import Managers from './Managers'

const TemplateForm = ({ title, owner, description, duration, availableManagers, assignedManager, handleChange, errorClass, formErrors, addManager, managerValid, removeManager }) => {
    const managers = availableManagers.map((m) => (
        <option key={m._id} name="managerName" value={m.username}>{m.username}</option>
    ))
    const assigned = assignedManager.map((m,index) => (
        <Managers
            key={index}
            {...m}
            onDelete = {removeManager.bind(this, index)}
        />
    ))
    return (
        <form>
            <div className={`form-group row ${errorClass(formErrors.title)}`}>
                <label className="col-sm-4 col-md-2 col-form-label" htmlFor="title">Title: </label>
                <div className="col-sm-8 col-md-10">
                    <input
                        className="form-control"
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        required autoFocus />
                </div>

            </div>
            <div className={`form-group row ${errorClass(formErrors.owner)}`}>
                <label className="col-sm-4 col-md-2 col-form-label" htmlFor="owner">Users:</label>
                <div className="col-sm-4 col-md-5 ">
                    <div className="form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="student"
                            name="owner"
                            checked={owner === "student"}
                            value="student"
                            onChange={handleChange}
                            required />
                    </div>
                    <label className="form-check-label" name="owner" htmlFor="student">
                        Student
                    </label>
                </div>
                <div className="col-sm-4 col-md-5">
                    <div className="form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="staff"
                            name="owner"
                            checked={owner === "staff"}
                            value="staff"
                            onChange={handleChange}
                            required />
                    </div>
                    <label className="form-check-label" name="owner" htmlFor="staff">
                        Staff
                    </label>
                </div>

            </div>
            <div className="form-group row">
                <label className="col-sm-4 col-md-2 col-form-label" htmlFor="duration">Duration: </label>
                <div className="col-sm-8 col-md-10">
                    <input
                        className="form-control"
                        type="text"
                        id="duration"
                        name="duration"
                        onChange={handleChange}
                        required
                        value={duration} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-4 col-md-2 col-form-label" htmlFor="description">Description: </label>
                <div className="col-sm-8 col-md-10">
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        onChange={handleChange}
                        rows="4"
                        cols="50"
                        required value={description} />
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-8 col-md-12">
                    <h4>Manager List:</h4>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-6 col-md-9 input-group mb-3 input-group mb-3 pr-0">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="typeGroup">Manager</label>
                    </div>
                    <select className="custom-select" id="typeGroup" name="managerName" onChange={handleChange} >
                        <option name="managerName" value="">Please Choose...</option>
                        {managers}
                    </select>
                </div>
                <div className="col-sm-6 col-md-3 pl-0">
                    <div className="float-right">
                        <button
                            disabled={!managerValid}
                            className='btn btn-outline-primary'
                            onClick={addManager}
                        >Add</button>
                    </div>
                </div>
            </div>
            
            <div className="form-group row">
                <ol className="col-sm-6 col-md-12" style={{"paddingLeft": "35px"}}>
                    {assigned}
                </ol>
                
            </div>
        </form>
    );
}

export default TemplateForm;
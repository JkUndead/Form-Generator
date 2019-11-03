import React from 'react';

const TemplateForm = ({ title, owner, description, duration, handleChange, errorClass, formErrors }) => {
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
        </form>
    );
}

export default TemplateForm;
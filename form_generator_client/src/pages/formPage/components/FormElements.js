import React from 'react';

const FormElements = ({name, type, handleChange, elementValues}) => {

    return (
        <div className=" form-group row mt-4">
            <label className="col-sm-4 col-md-3 col-form-label">
                {name}:
            </label>
            <div className="col-sm-8 col-md-9">
                <input 
                    className="form-control" 
                    onChange={handleChange} 
                    name={name}
                    value={elementValues.name}
                    type={`${type}`} 
                />
            </div>
        </div>
    )
}



export default FormElements;
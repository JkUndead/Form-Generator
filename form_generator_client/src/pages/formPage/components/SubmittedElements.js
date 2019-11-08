import React from 'react';

const SubmittedElements = (props) => {
    const label = (Object.keys(props))[0];
    const value = Object.keys(props).map(key =>((props[key])))
    return (
        <div className=" form-group row mt-4">
            <label className="col-sm-4 col-md-3 col-form-label">
                {label}:
            </label>
            <div className="col-sm-8 col-md-9">
                <input 
                    className="form-control" 
                    name={label}
                    placeholder={value}
                    type='text'
                    readOnly
                />
            </div>
        </div>
    )


}

export default SubmittedElements;
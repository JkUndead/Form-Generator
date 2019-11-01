import React from 'react';

const FormErrors = ({formErrors}) => 
    <div className="formError">
        {Object.keys(formErrors).map((field,i) => {
            if(formErrors[field].length > 0){
                return (
                    <div>
                        <b>Error: </b>
                        <span key={i}>{field} <i>{formErrors[field]}</i> </span>
                    </div> 
                )
            } else {
                return "";
            }
        })}
    </div>

export default FormErrors;
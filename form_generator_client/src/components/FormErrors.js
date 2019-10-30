import React from 'react';

const FormErrors = ({formErrors}) => 
    <div className="formError">
        {Object.keys(formErrors).map((field,i) => {
            if(formErrors[field].length > 0){
                return (
                    <div>
                        <b>Error:</b>
                        <p key={i}>{field} <i>{formErrors[field]}</i> </p>
                    </div> 
                )
            } else {
                return "";
            }
        })}
    </div>

export default FormErrors;
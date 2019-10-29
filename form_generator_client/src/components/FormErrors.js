import React from 'react';

const FormErrors = ({formErrors}) => 
    <div className="formError">
        {Object.keys(formErrors).map((field,i) => {
            if(formErrors[field].length > 0){
                return (
                    <div>
                        <h3>Error:</h3>
                        <p key={i}>{field} <i>{formErrors[field]}</i> </p>
                    </div> 
                )
            } else {
                return "";
            }
        })}
    </div>

export default FormErrors;
import React from 'react';
import ElementItems from './ElementItem';

const ElementList = ({elements}) => {
    const elementItems = elements.map((e) =>(
        <ElementItems 
            key={e._id}
            {...e}
        />
    ));
    return(
        <div className="col-sm-8 col-md-10">
            <label>Element List:</label>
            <ul>
                {elementItems}
            </ul>
        </div>
    )
    
}
    


export default ElementList;
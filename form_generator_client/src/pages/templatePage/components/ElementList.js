import React from 'react';
import ElementItems from './ElementItem';

const ElementList = ({ elements, removeElement }) => {

    const elementItems = elements.map((e, index) => (
        <ElementItems
            key={e._id || index}
            {...e}
            onDelete={removeElement.bind(this, e._id || index)}
        />
    ));
    return (
        <div className="col-sm-8 col-md-12">
            
            <h4>Element List:</h4>
            <form>
                {elementItems}
            </form>
            

        </div>
    )

}



export default ElementList;
import React from 'react';
import ElementItems from './ElementItem';
import PopUp from '../../../components/PopUp'

const ElementList = ({ elements, removeElement, updateElement, showUpdate, editElement, updateId }) => {

    const elementItems = elements.map((e, index) => (
        <ElementItems
            key={e._id || index}
            {...e}
            onDelete={removeElement.bind(this, e._id || index)}
            onUpdate={updateElement.bind(this, e._id || index)}
        />
    ));

    const PopUpElement = elements.filter((e,index) => ((e._id === updateId)|| (index === updateId)));
    return (
        <div className="col-sm-8 col-md-12">

            <h4>Element List:</h4>
            <div>
                {elementItems}
                {showUpdate ? 
                <PopUp 
                    text='Edit Element' 
                    closePopup={updateElement.bind(this)} 
                    buttonName="Save" 
                    editElement= {editElement} 
                    PopUpElement= {PopUpElement}
                    updateId = {updateId}
                /> 
                : null }
            </div>


        </div>
    )

}



export default ElementList;
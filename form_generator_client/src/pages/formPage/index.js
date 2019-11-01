import React from 'react';
import SideBar from "../../components/SideBar";
import FormList from './components/FormList'
const Forms = (props) => {
    const header = props.location.state.header;
    return (
        <div className="d-flex">
            <SideBar
                header={header}
                listItems={["Forms", "Draft", "Sent"]}
                paths={["/forms","/forms/draft","/forms/sent"]}
            />
            <FormList header={header}/>
        </div>
    )
};

export default Forms;
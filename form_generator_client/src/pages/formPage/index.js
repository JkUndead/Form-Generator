import React from 'react';
import SideBar from "../../components/SideBar";
import FormList from './components/FormList'
const Forms = (props) => {
    const role = props.location.state.header;
    return (
        <div className="d-flex">
            <SideBar
                header={role}
                listItems={["Forms", "Check"]}
                paths={["/forms", "/login"]}
            />
            <FormList header={role} />
        </div>
    )
};

export default Forms;
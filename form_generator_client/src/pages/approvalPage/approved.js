import React from 'react';
import SideBar from "../../components/SideBar";
import ApprovalList from './components/ApprovalList'
const Approved = (props) => {
    const userName = props.location.state.userName;
    return (
        <div className="d-flex">
            <SideBar
                header="Manager"
                listItems={["Pending", "Approved", "Rejected"]}
                paths={["/pending", "/approved", "/rejected"]}
                userName={userName}
            />
            <ApprovalList header="Manager" status="Approved" userName={userName} />
        </div>
    )

};

export default Approved;
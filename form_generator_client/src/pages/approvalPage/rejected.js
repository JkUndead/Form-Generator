import React from 'react';
import SideBar from "../../components/SideBar";
import ApprovalList from './components/ApprovalList'
const Approval = () => (
    <div className="d-flex">
        <SideBar
            header="Manager"
            listItems={["Pending", "Approved", "Rejected"]}
            paths={["/pending","/approved","/rejected"]}
        />
        <ApprovalList header="Manager" status="Rejected"/>
    </div>
);

export default Approval;
import React from 'react';
import SideBar from "../../components/SideBar";
const Approval = () => (
    <div className="d-flex">
        <SideBar
            header="Manager"
            listItems={["Pending", "Approved", "Rejected"]}
            paths={["/approval","/approval/approved","/approval/rejected"]}
        />
    </div>
);

export default Approval;
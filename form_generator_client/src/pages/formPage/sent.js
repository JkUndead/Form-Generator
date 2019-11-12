import React from 'react';
import SideBar from '../../components/SideBar';
import SentList from './components/SentList'

const Sent = (props) => {
    const role = (props.location.state.header === undefined) ? props.location.state.role : props.location.state.header
    const username = props.location.state.userName;
    return (
        <div className="d-flex">
            <SideBar
                header={role}
                listItems={["Forms", "Check"]}
                paths={["/forms", "/forms/sent"]}
            />
            <SentList username={username} role={role} />
        </div>
    )
}


export default Sent;
import React from 'react';
import SideBar from '../../components/SideBar';
import SentList from './components/SentList'

const Sent = (props) => {
    const header = props.location.state.header;
    const username = props.location.state.userName;
    return (
        <div className="d-flex">
            <SideBar
                header={header}
                listItems={["Forms", "Sent"]}
                paths={["/forms","/forms/sent"]}
            />
            <SentList username={username}/>
        </div>
    )
}


export default Sent;
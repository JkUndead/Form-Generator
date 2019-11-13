import React from 'react';
import BarElements from './BarElements';

const SideBar = (props) => {
    const { header, listItems, paths, userName } = { ...props };
    const items = listItems.map((item, index) => (
        <BarElements
            key={index}
            item={item}
            path={paths[index]}
            header={header}
            userName={userName}
        />
    ))
    return (
        <div className="border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">{header.toUpperCase()}</div>
            {items}
        </div>
    )
}

export default SideBar;
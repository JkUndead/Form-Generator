import React from 'react';
import BarElements from './BarElements';

const SideBar = ({ header, listItems }) => {
    const items = listItems.map((item,index) => (
        <BarElements
            key={index}
            item={item}
        />
    ))
    return (
        <div className="bg-dark border-right" id="sidebar-wrapper">
            <div className="text-light sidebar-heading">{header}</div>
            {items}
        </div>
    )
}

export default SideBar;
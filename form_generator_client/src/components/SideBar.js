import React from 'react';
import BarElements from './BarElements';

const SideBar = (props) => {
    const {header,listItems,paths} = {...props};
    const items = listItems.map((item,index) => (
        <BarElements
            key={index}
            item={item}
            path={paths[index]}
            header={header}
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
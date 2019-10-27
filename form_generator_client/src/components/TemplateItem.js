import React from 'react';

const TemplateItem = ({title}) => (
    <li>
        <span>{title}</span>
        <span>
            <button>More Info</button>
        </span>
    </li>
);

export default TemplateItem;
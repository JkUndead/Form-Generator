import React from 'react';
import {Link} from 'react-router-dom';

const BarElements = ({item}) => {
    return(
        <div className="list-group list-group-flush">
            <Link to="/templates" className="border-bottom list-group-item list-group-item-action bg-light " id={`navside${item}`}>
              {item}
          </Link>
        </div>
    )
}

export default BarElements;
import React from 'react';
import {Link} from 'react-router-dom';

const BarElements = ({item,path,header}) => {
    return(
        <div className="list-group list-group-flush">
            <Link to={{
                path: path,
                state: {
                        header: header
                    }
                }} 
                className="text-light border-bottom border-top list-group-item list-group-item-action bg-dark " 
                id={`navside${item}`}
            >
              {item}
          </Link>
        </div>
    )
}

export default BarElements;
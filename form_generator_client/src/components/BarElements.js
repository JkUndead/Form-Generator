import React from 'react';
import { Link } from 'react-router-dom';

const BarElements = ({ item, path, header, userName }) => {

    return (
        <div className="list-group list-group-flush">
            <Link to={{
                pathname: path,
                state: {
                    header: header,
                    userName: userName
                }
            }}
                className="list-group-item list-group-item-action "
                id={`navside${item}`}

            >
                {item.toUpperCase()}
            </Link>
        </div>
    )
}

export default BarElements;
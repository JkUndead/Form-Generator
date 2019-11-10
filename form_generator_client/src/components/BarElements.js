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
                className="active text-light border-bottom border-top list-group-item list-group-item-action bg-dark "
                id={`navside${item}`}

            >
                {item}
            </Link>
        </div>
    )
}

export default BarElements;
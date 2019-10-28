import React from 'react';
import {Link} from 'react-router-dom';
import TemplateList from "../../components/TemplateList";

const Templates = () => (
    <div>
        <TemplateList />
        <Link to="/templates/new">
            <button className="btn btn-primary">Create New Template</button>
        </Link>
    </div>
);

export default Templates;
import React from 'react';
import TemplateList from "./components/TemplateList";
import SideBar from "../../components/SideBar";

const Templates = () => (
    <div className="d-flex">
        <SideBar 
            header="Admin"
            listItems = {["Templates","Draft"]}
            paths={["/templates","/templates/draft"]}
        />
        <TemplateList />
        
    </div>
);

export default Templates;
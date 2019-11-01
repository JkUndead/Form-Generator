import React, { Component } from 'react';
import TemplateItem from "./TemplateItem";
import { Link } from 'react-router-dom';
import * as apiCalls from '../../../services/templates_api';

class TemplateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templates: []
        }
    }

    componentDidMount() {
        this.loadTemplates();
    }

    async loadTemplates() {
        let templates = await apiCalls.getTemplates();
        this.setState({ templates });
    }

    async deleteTemplate(id) {
        await apiCalls.removeTemplate(id);
        const templates = this.state.templates.filter(template => template._id !== id)
        this.setState({ templates: templates })
    }

    render() {
        const templates = this.state.templates.map((t) => (
            <TemplateItem
                key={t._id}
                {...t}
                onDelete={this.deleteTemplate.bind(this, t._id)}
            />
        ));
        return (
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <div className="jumbotron" style={{"marginTop":"20px"}}>
                        <div className="container">
                            <h1 className="display-4"><b>My Templates</b></h1>
                            <Link to="/templates/new">
                                <button className="btn btn-info btn-lg">Create New Template</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row" style={{"display":"flex", "flexWrap": "wrap"}} >
                        {templates}
                    </div>
                </div>
            </div>
        );
    }
}

export default TemplateList;
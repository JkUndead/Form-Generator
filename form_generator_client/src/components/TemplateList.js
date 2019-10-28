import React, { Component } from 'react';
import TemplateItem from "./TemplateItem";
import * as apiCalls from '../services/templates_api';

class TemplateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templates: []
        }
    }

    componentDidMount(){
		this.loadTemplates();
	}
	
	async loadTemplates(){
		let templates = await apiCalls.getTemplates();
		this.setState({templates});
    }
    
    async deleteTemplate(id){
		await apiCalls.removeTemplate(id);
		const templates = this.state.templates.filter(template => template._id !== id)
		this.setState({templates: templates})
	}

    render() {
        const templates = this.state.templates.map((t) =>(
			<TemplateItem 
				key={t._id}
                {...t}
                onDelete = {this.deleteTemplate.bind(this,t._id)}
			/>
		));
        return (
            <div>
                <h1>My Templates</h1>
                <ul>
                    {templates}
                </ul>
            </div>
        );
    }
}

export default TemplateList;
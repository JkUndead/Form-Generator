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

    UNSAFE_componentWillMount(){
		this.loadTemplates();
	}
	
	async loadTemplates(){
		let templates = await apiCalls.getTemplates();
		this.setState({templates});
	}

    render() {
        const templates = this.state.templates.map((t) =>(
			<TemplateItem 
				key={t._id}
				{...t}
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
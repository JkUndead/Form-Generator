import React, { Component } from 'react';
import FormItem from './FormItem'
import * as apiCalls from '../../../services/templates_api';

class FormList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forms: []
        }
    }

    componentDidMount() {
        this.loadForms();
    }

    async loadForms() {
        let templates = await apiCalls.getTemplates();
        let forms = templates.filter(template => (template.owner === this.props.header.toLowerCase()))
        this.setState({forms})
    }

    render() {
        const forms = this.state.forms.map((f) => (
            <FormItem
                key={f._id}
                {...f}
                header={this.props.header}
                
            />
        ));
        return (
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <div className="jumbotron" style={{ "marginTop": "20px" }}>
                        <div className="container">
                            <h1 className="display-4"><b>Available Forms</b></h1>
                        </div>
                    </div>
                    <div className="row" style={{"display":"flex", "flexWrap": "wrap"}} >
                        {forms}
                    </div>
                </div>
            </div>
        )
    }
}

export default FormList;
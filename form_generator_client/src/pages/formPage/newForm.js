import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormElements from './components/FormElements'
import * as TemplateAPICalls from '../../services/templates_api';
//import FormErrors from '../../components/FormErrors';

class NewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            status: "",
            confirmation_status: "",
            elements: [],
            elementValues: {},
            validValues: false,
            formErrors: {
                message: ""
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.loadForm();
    }

    async loadForm() {
        const templateId = this.props.location.state.id;
        let template = await TemplateAPICalls.getOneTemplate(templateId)
        this.setState({
            title: template.title,
            description: template.description,
            elements: template.elements
        })
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({elementValues:{ ...this.state.elementValues,[name]: value }});
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.elementValues)
    }

    render() {
        const { title, description, elementValues } = this.state;
        const elements = this.state.elements.map(e=> (
            <FormElements
                key={e._id}
                {...e}
                elementValues={elementValues}
                handleChange={this.handleChange.bind(this)}
            />
        ))
        return (
            <div className="container">
                <h1 className="text-center mb-4 mt-4">{title}</h1>
                <div className="row justify-content-md-center">
                    <div className="col-8">
                        <div className="row justify-content-md-center">
                            <p ><b>Description:</b> <i>{description}</i></p>

                        </div>

                        {elements}


                        <form>


                            <div className=" form-group row">
                                <div className="col-sm-12 mt-4">
                                    <Link to={{
                                        pathname: "/forms",
                                        state: {
                                            header: this.props.location.state.header
                                        }
                                        
                                    }} >
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="submit"
                                        >Cancel
                                    </button>
                                    </Link>
                                    <Link to="/forms">
                                        <button
                                            
                                            className="btn btn-outline-primary float-right"
                                            onClick={this.handleSubmit}
                                        >Submit
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default NewForm;
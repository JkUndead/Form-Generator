import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormElements from './components/FormElements'
import * as TemplateAPICalls from '../../services/templates_api';
import * as FormAPICalls from '../../services/forms_api';
//import FormErrors from '../../components/FormErrors';

class NewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            templateId: "",
            userName: "",
            email: "",
            role: this.props.location.state.header,
            confirmation_status: false,
            elements: [],
            elementValues: {},
            managerList: [],
            nameValid: false,
            emailValid: false,
            formValid: false,
            formErrors: {
                name: "",
                email: "",
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
            elements: template.elements,
            templateId: this.props.location.state.id,
            managerList: template.managers
        })
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        if (name !== "userName" && name !== "email") {
            this.setState({ elementValues: { ...this.state.elementValues, [name]: value } });
        } else {
            this.setState({ [name]: value },
                () => { this.validateField(name, value) })
        }
    }

    async handleSubmit() {
        await this.addForm(this.state);
        await this.wait3Sec();
    }

    async addForm(value) {
        await FormAPICalls.createForm(value);
    }

    wait3Sec() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    }

    validateField(field, value) {
        let fieldValidationErr = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let emailValid = this.state.emailValid;
        switch (field) {
            case 'userName':
                nameValid = value.length >= 3;
                fieldValidationErr.name = nameValid ? "" : "is too short";
                break;
            case 'email':
                emailValid = value.length > 5;
                fieldValidationErr.email = emailValid ? "" : "is invalid";
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErr,
            nameValid: nameValid,
            emailValid: emailValid
        }, this.validateForm)
    }

    validateForm() {
        this.setState({
            formValid:
                this.state.confirmation_status &&
                this.state.nameValid &&
                this.state.emailValid
        });
    }

    render() {
        const { title, description, elementValues } = this.state;
        const elements = this.state.elements.map(e => (
            <FormElements
                key={e._id}
                {...e}
                elementValues={elementValues}
                handleChange={this.handleChange.bind(this)}
            />
        ))
        return (
            <div className="container bg-light mb-4">
                <h1 className="text-center mb-4 mt-4 p-3">{title}</h1>
                <div className="row justify-content-md-center">
                    <div className="col-8">
                        <div className="row justify-content-md-center">
                            <p ><b>Description:</b> <i>{description}</i></p>

                        </div>
                        <div className="border border-info rounded p-3">
                            <h5>General Information: </h5>
                            <div className=" form-group row mt-4">
                                <label className="col-sm-4 col-md-3 col-form-label">
                                    User Name:
                            </label>
                                <div className="col-sm-8 col-md-9">
                                    <input
                                        className="form-control"
                                        onChange={this.handleChange.bind(this)}
                                        name="userName"
                                        value={this.state.userName}
                                        type="text"
                                        placeholder="Your user name"
                                        autoFocus
                                        required
                                    />
                                </div>
                            </div>
                            <div className=" form-group row mt-4">
                                <label className="col-sm-4 col-md-3 col-form-label">
                                    Email:
                            </label>
                                <div className="col-sm-8 col-md-9">
                                    <input
                                        className="form-control"
                                        onChange={this.handleChange.bind(this)}
                                        name="email"
                                        value={this.state.email}
                                        type="email"
                                        placeholder="youremail@email.com"
                                        required
                                    />
                                </div>
                            </div>

                        </div>

                        {elements}


                        <form>
                            <div className="form-group-row">
                                <div className="col-sm-8 offset-sm-4 col-md-10 offset-md-2">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="declaration"
                                            name="confirmation_status"
                                            value="check"
                                            onChange={() => {
                                                this.setState(prevState => (
                                                    { confirmation_status: !prevState.confirmation_status }
                                                ), this.validateForm)
                                            }}
                                            required />
                                        <label className="form-check-label" htmlFor="declaration">I confirm the above information is accurate and followed terms and conditions </label>
                                    </div>
                                </div>
                            </div>

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
                                    <Link to={{
                                        pathname: "/forms",
                                        state: {
                                            header: this.props.location.state.header,
                                        }

                                    }} >
                                        <button
                                            disabled={!this.state.formValid}
                                            className="btn btn-primary float-right"
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
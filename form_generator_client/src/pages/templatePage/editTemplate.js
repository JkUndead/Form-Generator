import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as templateAPICalls from '../../services/templates_api';
import * as elementAPICalls from '../../services/elements_api';
import FormErrors from '../../components/FormErrors';
import ElementList from './components/ElementList';
import PopUp from '../../components/PopUp';
import TemplateForm from './components/TemplateForm'

class UpdateTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            owner: "",
            description: "",
            duration: "",
            confirmation_status: false,
            elements: [],
            titleValid: true,
            ownerValid: true,
            descValid: true,
            durationValid: true,
            formValid: false,
            formErrors: {
                title: "",
                owner: "",
                description: "",
                duration: "",
            },
            showPopup: false,
            showUpdate: false,
            updateId: ""

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewElements = this.addNewElements.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.loadOneTemplate(params.id);
    }

    async loadOneTemplate(id) {
        let template = await templateAPICalls.getOneTemplate(id);
        const title = template.title,
            owner = template.owner,
            description = template.description,
            duration = template.duration,
            elements = template.elements;
        this.setState({
            title: title,
            owner: owner,
            description: description,
            duration: duration,
            elements: elements
        });
    };

    async updateTemplate(template, id) {
        await templateAPICalls.updateTemplate(template, id);
    }


    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    async addNewElements(value) {
        let eURL = '/api/' + this.props.match.url + '/elements'
        let newElement = await elementAPICalls.createElement(value, eURL)
        this.setState({ elements: [...this.state.elements, newElement] })
    }

    updateElement(id) {
        let showUpdate = this.state.showUpdate;
        this.setState({ showUpdate: !showUpdate });
        this.setState({ updateId: id })
    }

    async saveEditedElement(value) {
        console.log(value);
        let eURL = '/api/' + this.props.match.url + '/elements/' + value.id;
        let element = {name: value.name, type: value.type}
        let updateElement = await elementAPICalls.updateElement(element,eURL);
        const elements = this.state.elements.map((element) => {
            if (element._id === updateElement._id) {
                return ({
                    ...element,
                    name: updateElement.name,
                    type: updateElement.type
                });
            } else {
                return element
            }
        })
        this.setState({ 
            elements: elements,
            updateId: "" 
        })
    }

    validateField(field, value) {
        let fieldValidationErr = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let ownerValid = this.state.ownerValid;
        let descValid = this.state.descValid;
        let durationValid = this.state.durationValid;
        switch (field) {
            case "title":
                titleValid = value.length >= 5;
                fieldValidationErr.title = titleValid ? "" : "is too short";
                break;
            case "owner":
                ownerValid = value.length > 0;
                fieldValidationErr.owner = ownerValid ? "" : "is not selected";
                break;
            case "description":
                descValid = value.length >= 20;
                fieldValidationErr.description = descValid ? "" : "is too short";
                break;
            case "duration":
                durationValid = value.length > 0;
                fieldValidationErr.duration = durationValid ? "" : "cannot be blank";
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErr,
            titleValid: titleValid,
            ownerValid: ownerValid,
            descValid: descValid,
            durationValid: durationValid,
        }, this.validateForm)
    }

    validateForm() {
        this.setState({
            formValid:
                this.state.confirmation_status &&
                this.state.titleValid &&
                this.state.ownerValid &&
                this.state.durationValid &&
                this.state.descValid
        });
    }

    errorClass(err) {
        return (err.length === 0 ? "" : "has-error");
    }

    togglePopup() {
        this.setState(prevState => (
            { showPopup: !prevState.showPopup }
        ));
    }

    async removeElement(id) {
        if (typeof (id) === 'number') {
            let elements = this.state.elements;
            elements.splice(id, 1);
            this.setState({ elements: elements });
        } else {
            let elementId = this.props.match.params.id + '/elements/' + id;
            await elementAPICalls.removeElements(elementId);
            const elements = this.state.elements.filter(element => element._id !== id)
            this.setState({ elements: elements })
        }
    }

    handleSubmit(event) {
        const { match: { params } } = this.props;
        this.updateTemplate(this.state, params.id);
    }

    render() {
        const { title, owner, description, duration, showUpdate, showPopup, updateId } = this.state;
        return (
            <div className="container">
                <h1 className="text-center mt-4 mb-4">EDIT TEMPLATE</h1>

                <div className="row justify-content-md-center">
                    <div className="col-8">
                        <div className="panel panel-default">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                        <TemplateForm
                            title={title}
                            owner={owner}
                            description={description}
                            duration={duration}
                            handleChange={this.handleChange.bind(this)}
                            formErrors={this.state.formErrors}
                            errorClass={this.errorClass.bind(this)}
                        />

                        <div className="row">
                            <ElementList
                                elements={this.state.elements}
                                removeElement={this.removeElement.bind(this)}
                                updateElement={this.updateElement.bind(this)}
                                showUpdate={showUpdate}
                                editElement={this.saveEditedElement.bind(this)}
                                updateId={updateId}
                            />
                        </div>
                        <div className="row">
                            <button className="btn btn-outline-primary mt-3" onClick={this.togglePopup.bind(this)}>Add New Element</button>
                            {showPopup ?
                                <PopUp
                                    text='New Element'
                                    closePopup={this.togglePopup.bind(this)}
                                    addNewElements={this.addNewElements}
                                    buttonName="Add"
                                />
                                : null
                            }
                        </div>
                        <br></br>
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
                                        <label className="form-check-label" htmlFor="declaration">I confirm the above information is accurate and followed terms and conditions</label>
                                    </div>
                                </div>
                            </div>
                            <div className=" form-group row">
                                <div className="col-sm-12 mt-4">
                                    <Link to="/templates">
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="submit"
                                        >Cancel
                                    </button>
                                    </Link>
                                    <Link to="/templates">
                                        <button
                                            disabled={!this.state.formValid}
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


export default UpdateTemplate;
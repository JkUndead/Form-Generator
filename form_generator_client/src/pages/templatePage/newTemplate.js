import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as apiCalls from '../../services/templates_api';
import FormErrors from '../../components/FormErrors';
import ElementList from './components/ElementList';
import PopUp from '../../components/PopUp';
import TemplateForm from './components/TemplateForm';

class NewTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            owner: "",
            description: "",
            duration: "",
            confirmation_status: false,
            elements: [],
            titleValid: false,
            ownerValid: false,
            descValid: false,
            durationValid: false,
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

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    addNewElements(value) {
        let elements = this.state.elements;
        elements.push(value);
        this.setState({ elements: elements })
    }

    updateElement(id) {
        let showUpdate = this.state.showUpdate;
        this.setState({ showUpdate: !showUpdate });
        this.setState({ updateId: id })
    }

    saveEditedElement(value) {
        const elements = this.state.elements.map((element, index) => {
            if (index === value.id) {
                return ({
                    ...element,
                    name: value.name,
                    type: value.type
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

    removeElement(id) {
        let elements = this.state.elements;
        elements.splice(id, 1);
        this.setState({ elements: elements });
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



    handleSubmit() {
        this.addTemplate(this.state);
    }

    async addTemplate(value) {
        await apiCalls.createTemplate(value);
    }

    render() {
        const { title, owner, description, duration, showUpdate, showPopup, updateId } = this.state;
        return (
            <div className="container">
                <h1 className="text-center mt-4 mb-4">NEW TEMPLATE</h1>

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
                                        <label className="form-check-label" htmlFor="declaration">I confirm the above information is... </label>
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

export default NewTemplate;
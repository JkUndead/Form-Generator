import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as apiCalls from '../../services/templates_api';
import * as userAPI from '../../services/users_api'
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
            availableManagers: [],
            assignedManager: [],
            managerName: "",
            titleValid: false,
            ownerValid: false,
            descValid: false,
            durationValid: false,
            formValid: false,
            elementsValid: false,
            managerValid: false,
            formErrors: {
                title: "",
                owner: "",
                description: "",
                duration: "",
                elements: ""
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
        this.loadManager();
    }

    async loadManager() {
        const users = await userAPI.getUsers();
        const availableManagers = users.filter(user => (
            user.role === "Manager"
        ))
        this.setState({ availableManagers: availableManagers })
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
        this.setState({ elements: elements },
            () => { this.validateField(elements, value) })
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
        this.setState({ elements: elements },
            () => { this.validateField(elements, id) });
    }

    removeManager(id) {
        let assignedManager = this.state.assignedManager;
        assignedManager.splice(id, 1);
        this.setState({ assignedManager: assignedManager })
    }

    validateField(field, value) {
        let fieldValidationErr = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let ownerValid = this.state.ownerValid;
        let descValid = this.state.descValid;
        let durationValid = this.state.durationValid;
        let elementsValid = this.state.elementsValid;
        let managerValid = this.state.managerValid;
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
            case "managerName":
                managerValid = value.length > 0;
                break;
            default:
                break;
        }
        elementsValid = (this.state.elements.length >= 5 || this.state.elements.length === 0);
        fieldValidationErr.elements = elementsValid ? "" : "are not enough. A template must has at least 5 elements."
        this.setState({
            formErrors: fieldValidationErr,
            titleValid: titleValid,
            ownerValid: ownerValid,
            descValid: descValid,
            durationValid: durationValid,
            elementsValid: elementsValid,
            managerValid: managerValid
        }, this.validateForm)
    }

    validateForm() {
        this.setState({
            formValid:
                this.state.confirmation_status &&
                this.state.titleValid &&
                this.state.ownerValid &&
                this.state.durationValid &&
                this.state.descValid &&
                this.state.elementsValid
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

    addManager(event) {
        const managers = this.state.availableManagers.filter(m => m.username === this.state.managerName)
        const assigned = {
            _id: managers[0]._id,
            managerName: managers[0].username
        }
        let assignedManager = this.state.assignedManager;
        let isExisted = false;
        assignedManager.forEach(manager => {
            if (manager._id === assigned._id) {
                isExisted = !isExisted;
            }
        })
        if (!isExisted) {
            assignedManager.push(assigned);
            this.setState({ assignedManager: assignedManager })
        }
        event.preventDefault();
    }


    handleSubmit() {
        this.addTemplate(this.state);
    }

    async addTemplate(value) {
        await apiCalls.createTemplate(value);
    }

    render() {
        const { title, owner, description, duration, elements, showUpdate, showPopup, updateId, availableManagers, assignedManager } = this.state;
        return (
            <div className="container bg-light">
                <h1 className="text-center mt-4 mb-4 p-3">NEW TEMPLATE</h1>

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
                            availableManagers={availableManagers}
                            assignedManager={assignedManager}
                            handleChange={this.handleChange.bind(this)}
                            formErrors={this.state.formErrors}
                            errorClass={this.errorClass.bind(this)}
                            addManager={this.addManager.bind(this)}
                            managerValid={this.state.managerValid}
                            removeManager={this.removeManager.bind(this)}
                        />

                        <div className="row">
                            <ElementList
                                elements={elements}
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
                                        <label className="form-check-label" htmlFor="declaration">I confirm the above information is accurate and followed terms and conditions </label>
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

export default NewTemplate;
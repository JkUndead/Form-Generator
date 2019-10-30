import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as apiCalls from '../../services/templates_api';
import FormErrors from '../../components/FormErrors';
import ElementList from './components/ElementList';
import PopUp from '../../components/PopUp';

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
            showPopup: false
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


    handleSubmit(event) {
        this.addTemplate(this.state);
    }

    async addTemplate(value) {
        await apiCalls.createTemplate(value);
    }

    render() {
        const { title, owner, description, duration } = this.state;
        return (
            <div className="container">
                <h1 className="text-center">New Template</h1>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-8">
                        <form>
                            <div className={`form-group row ${this.errorClass(this.state.formErrors.title)}`}>
                                <label className="col-sm-4 col-md-2 col-form-label" htmlFor="title">Title: </label>
                                <div className="col-sm-8 col-md-10">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={title}
                                        onChange={this.handleChange}
                                        required autoFocus />
                                </div>

                            </div>
                            <div className={`form-group row ${this.errorClass(this.state.formErrors.owner)}`}>
                                <div className="form-check-inline">
                                    <div className="col-sm-4 col-md-5">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="student"
                                            name="owner"
                                            checked={owner === "student"}
                                            value="student"
                                            onChange={this.handleChange}
                                            required />
                                    </div>
                                    <label className="form-check-label" name="owner" htmlFor="student">
                                        Student
                                        </label>
                                </div>
                                <div className="form-check-inline">
                                    <div className="col-sm-4 col-md-5">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="staff"
                                            name="owner"
                                            checked={owner === "staff"}
                                            value="staff"
                                            onChange={this.handleChange}
                                            required />
                                    </div>
                                    <label className="form-check-label" name="owner" htmlFor="staff">
                                        Staff
                                    </label>
                                </div>

                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-md-2 col-form-label" htmlFor="duration">Duration: </label>
                                <div className="col-sm-8 col-md-10">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="duration"
                                        name="duration"
                                        onChange={this.handleChange}
                                        required
                                        value={duration} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-md-2 col-form-label" htmlFor="description">Description: </label>
                                <div className="col-sm-8 col-md-10">
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        onChange={this.handleChange}
                                        rows="4"
                                        cols="50"
                                        required value={description} />
                                </div>
                            </div>
                        </form>



                        <div className="row">
                            <ElementList elements={this.state.elements} />
                        </div>
                        <div className="row">
                            <button className="btn btn-outline-success" onClick={this.togglePopup.bind(this)}>Add New Element</button>
                            {this.state.showPopup ?
                                <PopUp
                                    text='New Element'
                                    closePopup={this.togglePopup.bind(this)}
                                    addNewElements={this.addNewElements}
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
                                        <label className="form-check-label" htmlFor="declaration">I confirm the information above is final!</label>
                                    </div>
                                </div>
                            </div>



                            <div className=" form-group row">
                                <div className="col-sm-12">
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
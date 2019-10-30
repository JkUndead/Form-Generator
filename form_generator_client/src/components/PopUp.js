import React, { Component } from 'react';
import FormErrors from '../components/FormErrors';

class PopUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: "",
            nameValid: false,
            typeValid: false,
            formErrors: {
                name: "",
                type: "",
            },
            formValid: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(field, value) {
        let fieldValidationErr = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let typeValid = this.state.typeValid
        switch (field) {
            case "name":
                nameValid = value.length >= 3;
                fieldValidationErr.name = nameValid ? "" : "is too short";
                break;
            case "type":
                typeValid = value.length > 0;
                fieldValidationErr.type = typeValid ? "" : "is not selected";
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErr,
            nameValid: nameValid,
            typeValid: typeValid,
        }, this.validateForm)
    }

    validateForm() {
        this.setState({
            formValid:
                this.state.nameValid &&
                this.state.typeValid 
        });
    }

    handleSubmit(event) {
        const newElement = {name: this.state.name, type: this.state.type}
        this.props.addNewElements(newElement);
        this.props.closePopup();
    }

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner '>
                    <h1 className='text-center'>{this.props.text}</h1>
                    <div className="panel panel-default">
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='elementName'>Name:
                                <input
                                    className='form-control'
                                    type='text'
                                    name='name'
                                    id='elementName'
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="typeGroup">Type</label>
                                </div>
                                <select className="custom-select" id="typeGroup" name="type" onChange={this.handleChange} value={this.state.type}>
                                    <option name="type" value="">Please Choose...</option>
                                    <option name="type" value="text">text</option>
                                    <option name="type" value="number">number</option>
                                    <option name="type" value="password">password</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <button id='close' className='btn btn-outline-secondary' onClick={this.props.closePopup}>Close</button>
                    <button 
                        id='add' 
                        disabled={!this.state.formValid}
                        className="btn btn-outline-success"
                        onClick={this.handleSubmit}
                    >Add</button>
                </div>
            </div>
        );
    }
}


export default PopUp;
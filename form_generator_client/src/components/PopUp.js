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

    componentDidMount() {
        this.setInitalValue();
    }

    setInitalValue() {
        if(typeof(this.props.PopUpElement) !== 'undefined'){
            let element = this.props.PopUpElement[0];
            let name = this.state.name,
                type = this.state.type;
            name = element.name;
            type = element.type
            this.setState({
                name: name,
                type: type,
                nameValid: true,
                typeValid: true,
                formValid: true
            })

        }
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

    handleSubmit() {
        const newElement = { name: this.state.name, type: this.state.type }
        if(this.props.text === "New Element") {
            this.props.addNewElements(newElement);
            this.props.closePopup();
        } else {
            newElement.id = this.props.updateId;
            this.props.editElement(newElement);
            this.props.closePopup();
        }
        
    }

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner '>
                    <h1 className='text-center mt-3'>{this.props.text}</h1>
                    <div className="panel panel-default">
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
                    <form>
                        <div className='form-group row mb-3 mt-3'>
                            <label className="col-sm-4 col-md-3 text-center col-form-label" htmlFor='elementName'>Name:</label>
                            <div className="col-sm-6 col-md-8">
                                <input
                                    className='form-control'
                                    type='text'
                                    name='name'
                                    id='elementName'
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    autoFocus
                                />
                            </div>

                        </div>
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-6 col-md-11 input-group mb-3 input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="typeGroup">Type</label>
                                </div>
                                <select className="custom-select" id="typeGroup" name="type" onChange={this.handleChange} value={this.state.type}>
                                    <option name="type" value="">Please Choose...</option>
                                    <option name="type" value="text">text</option>
                                    <option name="type" value="number">number</option>
                                    <option name="type" value="date">date</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className="row justify-content-center">
                        <div className="mr-5">
                            <button
                                id='close'
                                className='btn btn-outline-secondary'
                                onClick={this.props.closePopup}
                            >Close</button>
                        </div>
                        <div className="ml-5">
                            <button
                                id='add'
                                disabled={!this.state.formValid}
                                className="btn btn-outline-success"
                                onClick={this.handleSubmit}
                            >{this.props.buttonName}</button>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}


export default PopUp;
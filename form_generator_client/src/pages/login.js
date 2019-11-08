import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            role: "",
            userValid: false,
            roleValid: false,
            formValid: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value)})
    }

    validateField(field, value) {
        let userValid = this.state.userValid;
        let roleValid = this.state.roleValid;
        switch (field) {
            case "username":
                userValid = value.length >= 2;
                break;
            case "role":
                roleValid = value.length > 0;
                break;
            default:
                break;
        }
        this.setState({
            userValid: userValid,
            roleValid: roleValid
        }, this.validateForm)
    }

    validateForm() {
        this.setState({
            formValid: 
                this.state.userValid &&
                this.state.roleValid
        })
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }


    render() {
        return (
            <div className="container bg-light">
                <h1 className="text-center mt-4 mb-4">Welcome to Form Generator</h1>

                <div className="row justify-content-md-center">
                    <div className="col-6">
                        <form>
                            <div className="form-group row">
                                <label className="col-sm-4 col-md-2 col-form-label" htmlFor="username">Username: </label>
                                <div className="col-sm-8 col-md-10">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleChange.bind(this)}
                                        required autoFocus />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-md-4 col-form-label" htmlFor="role">Your role:</label>
                                <div className="col-sm-4 col-md-4 ">
                                    <div className="form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="student"
                                            name="role"
                                            checked={this.state.role === "Student"}
                                            value="Student"
                                            onChange={this.handleChange.bind(this)}
                                            required />
                                    </div>
                                    <label className="form-check-label" name="role" htmlFor="student">
                                        Student
                                </label>
                                </div>
                                <div className="col-sm-4 col-md-4">
                                    <div className="form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="staff"
                                            name="role"
                                            checked={this.state.role === "Staff"}
                                            value="Staff"
                                            onChange={this.handleChange.bind(this)}
                                            required />
                                    </div>
                                    <label className="form-check-label" name="role" htmlFor="staff">
                                        Staff
                                    </label>
                                </div>
                            </div>

                            <br />
                            <Link to={{
                                pathname: "/forms/sent",
                                state: {
                                    header: this.state.role,
                                    userName: this.state.username
                                }

                            }} >
                                <button
                                    disabled={!this.state.formValid}
                                    className="btn btn-primary text-center"
                                    
                                >Search
                                    </button>
                            </Link>
                        </form>
                    </div>
                </div>

            </div >
        )
    }
}

export default LoginForm;
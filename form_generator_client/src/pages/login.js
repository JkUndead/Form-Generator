import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            role: this.props.location.state.header,
            path: "",
            userValid: false,
            formValid: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let path = this.state.path;
        if (this.state.role === "Manager") {
            path = "/pending"
        }
        else {
            path = "/forms/sent"
        }
        this.setState({ path: path })
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) })
    }

    validateField(field, value) {
        let userValid = this.state.userValid;
        switch (field) {
            case "username":
                userValid = value.length >= 2;
                break;
            default:
                break;
        }
        this.setState({
            userValid: userValid,
        }, this.validateForm)
    }

    validateForm() {
        this.setState({
            formValid: this.state.userValid
        })
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }


    render() {
        return (
            <div className="container search-bar bg-light">
                <h1 className="text-center mt-4 mb-4">Welcome to Form Generator</h1>

                <div className="row justify-content-md-center">
                    <div className="col-6">
                        <form>
                            <div className="form-group row">
                                <label className="col-sm-4 col-md-4 col-form-label pr-0" htmlFor="username">Username: </label>
                                <div className="col-sm-8 col-md-8 pl-0">
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
                                <div className="col-sm-5 col-md-12 text-center">
                                    <Link to={{
                                        pathname: `${this.state.path}`,
                                        state: {
                                            header: this.state.role,
                                            userName: this.state.username
                                        }

                                    }} >
                                        <button
                                            disabled={!this.state.formValid}
                                            className="btn btn-primary text-center"
                                        // onClick={this.handleSubmit}
                                        >Search
                                    </button>
                                    </Link>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

            </div >
        )
    }
}

export default LoginForm;
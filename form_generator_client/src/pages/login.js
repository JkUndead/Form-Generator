import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as apiCalls from '../services/users_api'
import Background_Img from "../images/background.jpg";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            role: this.props.location.state !== undefined ? this.props.location.state.header : "",
            path: "",
            errorMsg: "",
            userValid: false,
            isExisted: false,
            formValid: false,
            validated: false
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

    async handleSubmit(event) {
        const form = event.currentTarget;
        let msg = this.state.errorMsg;
        let user,
            isExisted = this.state.isExisted;

        if (form.checkValidity() === false || !isExisted) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({ validated: true });

        const users = await apiCalls.getUsers();
        users.forEach(u => {
            if (u.username.toLowerCase() === this.state.username.toLowerCase()
                && u.role === this.state.role) {
                user = u.username;
                isExisted = true;
            }
        });
        if (this.state.validated && !this.state.userValid) {
            return;
        }
        if (!isExisted) {
            msg = "User can not be found";
            this.setState({
                errorMsg: msg,
                isExisted: isExisted
            })
        } else {
            this.setState({ username: user });
            console.log(this.state.username);
            this.props.history.push({
                pathname: `${this.state.path}`,
                state: {
                    header: this.state.role,
                    userName: this.state.username
                }
            })
        }



    }




    render() {
        return (
            <div className="Homepage">
                <img src={Background_Img} alt="background-img" className="Background" />
                <div className="login-form" >
                    <h1 className="text-center mt-4 mb-2">Please Enter Your User Name</h1>

                    <div className="row justify-content-md-center d-flex align-items-center">
                        <div className="col-6">
                            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Row>
                                        <Form.Control className="col-sm-8 col-md-12 "
                                            required
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.handleChange.bind(this)}
                                            autoFocus
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Username can not be blank
                                        </Form.Control.Feedback>

                                    </Form.Row>
                                    <div className='panel panel-default' id="error-panel">
                                        {(!this.state.isExisted && this.state.userValid) ?
                                            <span>{this.state.errorMsg}</span> :
                                            ""
                                        }
                                    </div>
                                </Form.Group>

                                <div className="row justify-content-center mb-3">
                                    <Button
                                        className="btn btn-primary btn-lg text-center"
                                        //onClick={this.handleSubmit}
                                        type="submit">
                                        Search
                                </Button>

                                </div>

                            </Form>


                        </div>
                    </div>

                </div >
            </div>

        )
    }
}

export default LoginForm;
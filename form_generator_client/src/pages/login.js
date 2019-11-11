import React, { Component } from 'react';
import * as apiCalls from '../services/users_api'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            role: this.props.location.state !== undefined ? this.props.location.state.header : "",
            path: "",
            errorMsg: "",
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

    async handleSubmit(event) {
        //event.preventDefault();
        const users = await apiCalls.getUsers();
        let msg = this.state.errorMsg;
        let user,
            isExisted = false;
        users.forEach(u => {
            if (u.username.toLowerCase() === this.state.username.toLowerCase()
                && u.role === this.state.role) {
                user = u.username;
                isExisted = true;
            }
        });
        if (!isExisted) {
            //event.preventDefault();
            msg = "Error: User is not found";
            this.setState({ errorMsg: msg })
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
            <div className="container search-bar bg-light" style={{ "marginTop": "200px" }}>
                <h1 className="text-center mt-4 mb-4">Please Enter Your User Name</h1>

                <div className="row justify-content-md-center d-flex align-items-center">
                    <div className="col-6">
                        <div className='panel panel-default'>
                            {!this.state.isExisted ?
                                <span>{this.state.errorMsg}</span> :
                                ""
                            }
                        </div>
                        <form onSubmit={e => { e.preventDefault(); }}>
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

                        </form>
                        <div className="row justify-content-center mb-3">
                            <button
                                disabled={!this.state.formValid}
                                className="btn btn-primary text-center"
                                onClick={this.handleSubmit}
                            >Search
                            </button>
                        </div>

                    </div>
                </div>

            </div >
        )
    }
}

export default LoginForm;
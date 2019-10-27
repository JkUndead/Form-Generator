import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }
    render() {
        return (
            <div className="wrapper">
                <form className="form-signin">
                    <h2 className="form-signin-heading">Welcome to Workflow System !</h2>
                    <input type="text" className="form-control" name="username" placeholder="UserName" required autofocus="" />
                    <input type="password" className="form-control" name="password" placeholder="Password" required />
                    <br />
                    <button className="btn btn-success" type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default LoginForm;
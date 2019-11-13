import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.svg";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: false,
            staff: false,
            student: false,
            manager: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        console.log('click')
        const defaultVal = false
        this.setState({
            admin: defaultVal,
            staff: defaultVal,
            student: defaultVal,
            manager: defaultVal
        })
        const name = event.target.name
        console.log(event.target.name)
        this.setState(prevState => (
            { [name]: !prevState.name }
        ))
    }

    render() {
        let admin = (this.state.admin ? " active" : "");
        let staff = (this.state.staff ? " active" : "");
        let student = (this.state.student ? " active" : "");
        let manager = (this.state.manager ? " active" : "");
        return (
            <nav className="navbar navbar-expand-lg navbar-fixed-top navbar-default ">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand" onClick={this.handleClick}>
                            <img src={Logo} alt="Logo" style={{ "maxHeight": "60px", "maxWidth": "inherit" }} />
                        </Link>
                    </div>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className=' nav navbar-nav '>
                            <li className='nav-item' >
                                <Link className={`nav-link${admin}`} name='admin' onClick={this.handleClick} to='/templates'>
                                    ADMIN
                        </Link>
                            </li>
                            <li className='nav-item' >
                                <Link className={`nav-link${staff}`} name='staff' onClick={this.handleClick} to={{
                                    pathname: '/forms',
                                    state: {
                                        header: 'Staff'
                                    }
                                }}>STAFF</Link>
                            </li>
                            <li className='nav-item' >
                                <Link className={`nav-link${student}`} name='student' onClick={this.handleClick} to={{
                                    pathname: '/forms',
                                    state: {
                                        header: 'Student'
                                    }
                                }}>STUDENT
                        </Link>
                            </li>
                            <li className='nav-item' >
                                <Link className={`nav-link${manager}`} name='manager' onClick={this.handleClick} to={{
                                    pathname: '/login',
                                    state: {
                                        header: 'Manager'
                                    }
                                }}>MANAGER</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}



export default Navbar;
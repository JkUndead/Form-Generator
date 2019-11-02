import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Logo2.png";

class Navbar extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">
                                <img src={Logo} alt="Logo" style={{ "maxHeight": "65px", "maxWidth": "inherit" }} />
                            </Link>
                        </div>
                    </div>

                </nav>
            </header>

        );
    }
}

export default Navbar;
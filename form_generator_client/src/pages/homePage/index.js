import React from 'react';
import { Link } from 'react-router-dom';
import About from './components/About';
import Background_Img from "../../images/background.jpg";
import Package from './components/Package';
import Footer from './components/Footer';

const Homepage = () => {
    return (
        <div className="Homepage">
            <img src={Background_Img} alt="background-img" className="Background" />
            <div className="bg-text">
                <h1><b>Welcome to Form Generator</b></h1>

                <ul id="role_links" style={{ "padding": "0" }}>
                    <li>
                        <Link to='/templates'>
                            <button className="btn btn-info btn-lg"> Administrator</button>
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: '/forms',
                            state: {
                                header: 'Staff'
                            }
                        }}>
                            <button className="btn btn-success btn-lg">Staff</button>
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: '/forms',
                            state: {
                                header: 'Student'
                            }
                        }}>
                            <button className="btn btn-success btn-lg">Student</button>
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: '/login',
                            state: {
                                header: 'Manager'
                            }
                        }}>
                            <button className="btn btn-danger btn-lg">Manager</button>
                        </Link>
                    </li>
                </ul>

            </div>

            <br></br>
            <About />
            <Package />
            <Footer />
        </div>
    );
}


export default Homepage;


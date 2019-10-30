import React from 'react';
import { Link } from 'react-router-dom';
import About from './components/About';
import Background_Img from "../../images/Background2.png"

const Homepage = () => {
    return (
        <div className="Homepage">
            <img src = {Background_Img} alt="background-img" className="Background" />
            <div className="bg-text">
                <h1>Welcome to Form Gererator</h1>
                <h2> The Application Help You to Create and Manipulate Thousand of Form !!</h2>
                <ul id="role_links">
                    <li>
                        <Link to='/templates'>
                            <button className="btn btn-primary"> Administrator</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/forms'>
                            <button className="btn btn-success">Staff</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/forms'>
                            <button className="btn btn-success">Student</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/approvals'>
                            <button className="btn btn-warning">Manager</button>
                        </Link>
                    </li>
                </ul>
            </div>
            <br></br>
            <About />
        </div>
    );
}


export default Homepage;


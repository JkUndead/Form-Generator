import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as apiCalls from '../../services/templates_api'

class NewTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            owner: "",
            description: "",
            duration: "",
            confirmation_status: false,
            elements: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }

    handleSubmit(event){
        console.log(this.state);
        this.addTemplate(this.state);
    }

    async addTemplate(value){
		await apiCalls.createTemplate(value);
    }
    
    render() {
        const {title, owner, description, duration, confirmation_status} = this.state;
        return (
            <div>
                <h1>New Template</h1>
                <form>
                <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input 
                        className="form-control" 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={title} 
                        onChange={this.handleChange} 
                        required />
                    </div>
                    <div className="form-check form-check-inline">
                        <label className="form-check-label" name="owner" htmlFor="student">
                        <input 
                        className="form-check-input" 
                        type="radio" 
                        id="student" 
                        name="owner" 
                        checked={owner === "student"} 
                        value="student" 
                        onChange={this.handleChange} 
                        required />
                        Student</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <label className="form-check-label" name="owner" htmlFor="staff">
                        <input 
                        className="form-check-input" 
                        type="radio" 
                        id="staff" 
                        name="owner" 
                        checked={owner === "staff"}
                        value="staff" 
                        onChange={this.handleChange} 
                        required />
                        Staff</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <textarea 
                        id="description" 
                        name="description"
                        onChange={this.handleChange} 
                        rows="4" 
                        cols="50" 
                        required value={description} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration">Duration: </label>
                        <input 
                        className="form-control" 
                        type="text" 
                        id="duration" 
                        name="duration" 
                        onChange={this.handleChange} 
                        required 
                        value={duration} />
                    </div>
                    <div className="form-check">
                        <input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="declaration" 
                        name="confirmation_status" 
                        checked={confirmation_status === "true"} 
                        value="true" 
                        onChange={this.handleChange} 
                        required />
                        <label className="form-check-label" htmlFor="declaration">This is my final submission!</label>
                    </div>
                    <Link to="/templates">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                    </Link>
                </form>
            </div>
        )
    }

}

export default NewTemplate;
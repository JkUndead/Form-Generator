import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as apiCalls from '../../services/forms_api';
import * as userAPI from '../../services/users_api'
import SubmittedElements from '../formPage/components/SubmittedElements';

class PendingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            status: "",
            author: "",
            email: "",
            confirmation_status: true,
            elementValues: [],
            formValid: true,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.loadForm(params.id);
    }

    async loadForm(id) {
        const form = await apiCalls.getOneForm(id);      
        let elements = form.elementValues;
        let elementValues = [];
        if (elements !== undefined) {
            elementValues = Object.keys(elements).map(key => (
                { [key]: elements[key] }
            ))
        }
        const userId = form.author.id;
        const user = await userAPI.getOneUser(userId);
        const title = form.template.title,
            status = form.status,
            author = form.author.username,
            email = user.email;
        this.setState({
            title: title,
            status: status,
            author: author,
            elementValues: elementValues,
            email: email
        })
    }

    async handleSubmit(event) {
        await apiCalls.updateForm(
            event.target.value,
            this.state.email,
            this.props.match.params.id
        )
    }

    render() {
        const { title, author, status } = this.state;
        const elementValues = this.state.elementValues.map((e, index) => (
            <SubmittedElements
                key={index}
                {...e}
            />
        ))
        return (
            <div className="container bg-light">
                <h1 className="text-center mb-4 mt-4 p-3">{title}</h1>
                <div className="row justify-content-md-center">
                    <div className="col-8">
                        <div className="row justify-content-md-center">
                            <p ><b>Submitted By: </b><i>{author}</i></p>
                        </div>
                        <div className="row justify-content-md-center">
                            <p ><b>Status </b><i>{status}</i></p>
                        </div>

                        {elementValues}

                        <form>


                            <div className=" form-group row">
                                <div className="col-sm-12 col-md-4 mt-4 text-center">
                                    <Link to={{
                                        pathname: "/pending",
                                        state: {
                                            header: this.props.location.state.header,
                                            userName: this.state.author
                                        }
                                    }} >
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="submit"
                                        >Go Back
                                    </button>
                                    </Link>
                                </div>

                                <div className="col-sm-12 col-md-4 mt-4 text-center">
                                    <Link to={{
                                        pathname: "/approved",
                                        state: {
                                            header: this.props.location.state.header
                                        }

                                    }} >
                                        <button
                                            className="btn btn-success"
                                            type="submit"
                                            value="Approved"
                                            onClick={this.handleSubmit}
                                        >Approve
                                    </button>
                                    </Link>
                                </div>
                                <div className="col-sm-12 col-md-4 mt-4 text-center">
                                    <Link to={{
                                        pathname: "/rejected",
                                        state: {
                                            header: this.props.location.state.header,
                                        }

                                    }} >
                                        <button
                                            className="btn btn-danger "
                                            value="Rejected"
                                            onClick={this.handleSubmit}
                                        >Reject
                                    </button>
                                    </Link>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default PendingForm;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as apiCalls from '../../services/forms_api';
import * as userAPI from '../../services/users_api';
import SubmittedElements from '../formPage/components/SubmittedElements';

class PendingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            status: "",
            author: "",
            email: "",
            currentProgress: "",
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
            currentProgress = form.currentProgress,
            managerList = form.managerList,
            email = user.email;
        this.setState({
            title: title,
            status: status,
            author: author,
            elementValues: elementValues,
            currentProgress: currentProgress,
            managerList: managerList,
            email: email
        })
    }

    async handleSubmit(event) {
        let currentProgress = this.state.currentProgress;
        let current = Number(this.state.currentProgress)
        let status = this.state.status;
        if (event.target.value === "Approved" &&
            current !== (this.state.managerList.length - 1)) {
            ++current;
            currentProgress = current.toString();
            status = "Pending";
        } else {
            currentProgress = "-1";
            status = event.target.value;
        }
        // this.setState({
        //     currentProgress: currentProgress,
        //     status: status
        // })
        const updatedForm = {
            currentProgress: currentProgress,
            email: this.state.email,
            status: status
        }
        console.log(updatedForm)
        await apiCalls.updateForm(
            updatedForm,
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
                                            userName: this.props.location.state.userName
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
                                            header: this.props.location.state.header,
                                            userName: this.props.location.state.userName
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
                                            userName: this.props.location.state.userName
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
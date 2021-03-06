import React, { Component } from 'react';
import * as apiCalls from '../../../services/forms_api';
import ApprovalItem from './ApprovalItem';

class ApprovaList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forms: [],
            hasPending: false,
            message: "Loading.."
        }
    }

    componentDidMount() {
        this.loadForms();
    }

    async loadForms() {
        const allForms = await apiCalls.getForms();
        const forms = allForms.filter(form => {
            let current = false;
            // check current manager and manager name
            form.managerList.forEach((manager, index) => {
                if (
                    manager.managerName.toLowerCase() === this.props.userName.toLowerCase()
                    && (index === (Number(form.currentProgress))
                        || (form.currentProgress === "-1"))
                ) {
                    current = true;
                }
            });

            return (form.status === this.props.status && current)
        })
        this.setState({ forms })
        this.checkList();
    }

    async deleteForm(id) {
        await apiCalls.removeForm(id);
        const forms = this.state.forms.filter(form => form._id !== id)
        this.setState({ forms: forms }, this.checkList);
    }

    checkList() {
        let hasPending = this.state.hasPending;
        if (this.state.forms.length === 0) {
            let message = this.state.message;
            const status = this.props.status.toLowerCase();
            message = "You have no " + status + " form";
            hasPending = false;
            this.setState({ message: message, hasPending: hasPending });
        } else {
            hasPending = true;
            this.setState({ hasPending: hasPending })
        }
    }


    render() {
        const forms = this.state.forms.map((f) => (
            <ApprovalItem
                key={f._id}
                {...f}
                header={this.props.header}
                onDelete={this.deleteForm.bind(this, f._id)}
                userName={this.props.userName.toLowerCase()}
            />
        ));
        return (
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <div className="jumbotron" style={{ "marginTop": "20px" }}>
                        <div className="container">
                            <h1 className="display-4"><b>{this.props.status} Forms</b></h1>
                        </div>
                    </div>
                    <hr style={{ width: "100%" }} />
                    {this.state.hasPending ?
                        <div className="row" style={{ "display": "flex", "flexWrap": "wrap" }} >
                            {forms}
                        </div>
                        :
                        <div className="ml-3">
                            <h2><i>{this.state.message}</i></h2>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default ApprovaList;
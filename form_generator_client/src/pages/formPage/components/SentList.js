import React, { Component } from 'react';
import * as apiCalls from '../../../services/forms_api';
import SentItem from './SentItem';

class SentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentForms: [],
            hasSent: false,
            message: "Loading..",
            role: this.props.role
        }
    }

    componentDidMount() {
        this.loadForms();

    }

    async loadForms() {
        const forms = await apiCalls.getForms();
        const sentForms = forms.filter((form) => {
            while (form.author === undefined) { continue; }
            console.log(form)
            return (

                form.author.username.toLowerCase() === this.props.username.toLowerCase()
            )
        })
        this.setState({ sentForms })
        let hasSent = this.state.hasSent;
        if (this.state.sentForms.length > 0) {
            this.setState({ hasSent: !hasSent })
        } else {
            let message = this.state.message;
            message = "You have no submitted form";
            this.setState({ message: message });
        }

    }


    render() {
        const forms = this.state.sentForms.map((f) => (
            <SentItem
                key={f._id}
                {...f}
                role={this.state.role}
            />
        ));
        return (
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <div className="jumbotron" style={{ "marginTop": "20px" }}>
                        <div className="container">
                            <h1 className="display-4"><b>Sent Forms</b></h1>
                        </div>
                    </div>
                    {this.state.hasSent ?
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

export default SentList;
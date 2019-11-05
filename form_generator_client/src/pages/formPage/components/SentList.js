import React, { Component } from 'react';
import * as apiCalls from '../../../services/forms_api';
import SentItem from './SentItem';

class SentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentForms: [],
            hasSent: false
        }
    }

    componentDidMount() {
        this.loadForms();
    }

    async loadForms() {
        let forms = await apiCalls.getForms();
        let sentForms = forms.filter(form => {
            while (form.author === undefined) { }
            return (form.author.username.toLowerCase() === this.props.username.toLowerCase())
        })
        this.setState({ sentForms })
        let hasSent = this.state.hasSent;
        if (sentForms.length > 0)
            this.setState({ hasSent: !hasSent })

    }

    render() {
        const forms = this.state.sentForms.map((f) => (
            <SentItem
                key={f._id}
                {...f}

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
                            <h2><i>You have no submitted form</i></h2>
                            <h2><i>Please <b>go back</b> to form store and <b>submit</b> one!</i></h2>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default SentList;
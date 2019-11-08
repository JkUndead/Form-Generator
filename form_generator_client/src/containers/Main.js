import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../pages/homePage";
import Login from "../pages/login";
import Templates from "../pages/templatePage";
import NewTemplates from "../pages/templatePage/newTemplate";
import UpdateTemplate from "../pages/templatePage/editTemplate";
import Forms from "../pages/formPage";
import NewForms from "../pages/formPage/newForm";
import ShowForm from "../pages/formPage/showSent";
import SentPage from "../pages/formPage/sent";
import Pending from "../pages/approvalPage";
import PendingForm from "../pages/approvalPage/pendingForm"
import Approved from "../pages/approvalPage/approved"
import Rejected from "../pages/approvalPage/rejected"
import ApprovedForm from "../pages/approvalPage/approvedForm"
import NotFoundPage from "../pages/404";

const Main = () => {
    return (
      <div className="Main">
        <Switch>
            
            <Route exact path="/" >
                <Homepage />
            </Route>

            <Route exact path="/login" >
                <Login />
            </Route>

            <Route exact path="/templates">
                <Templates />
            </Route>
            <Route exact path="/templates/new">
                <NewTemplates />
            </Route>

            <Route 
                exact 
                path="/templates/:id" 
                component={UpdateTemplate}
            />

            <Route 
                exact 
                path="/forms" 
                render={(props) => <Forms {...props} 
                isAuthed={true}/>}
            />

            <Route 
                exact 
                path="/forms/new"
                render={(props) =>  <NewForms {...props} 
                isAuthed={true}/>}>
            </Route>  
            
            <Route 
                exact 
                path="/forms/sent"
                render={(props) =>  <SentPage {...props} 
                isAuthed={true}/>}>
            </Route> 

            <Route 
                exact 
                path="/forms/sent/:id" 
                render={(props) =>  <ShowForm {...props} 
                isAuthed={true}/>}
            />    

            <Route exact path="/forms/:user">
                <Redirect to="/login"/> 
            </Route>  
                

            <Route exact path="/pending">
                <Pending />
            </Route>

            <Route 
                exact 
                path="/pending/:id" 
                render={(props) =>  <PendingForm {...props} 
                isAuthed={true}/>}
            /> 

            <Route 
                exact 
                path="/approved" 
                render={(props) =>  <Approved {...props} 
                isAuthed={true}/>}
            /> 

            <Route 
                exact 
                path="/approved/:id" 
                render={(props) =>  <ApprovedForm {...props} 
                isAuthed={true}/>}
            /> 

            <Route 
                exact 
                path="/rejected" 
                render={(props) =>  <Rejected {...props} 
                isAuthed={true}/>}
            /> 

            <Route  
                exact 
                path="/rejected/:id" 
                render={(props) =>  <ApprovedForm {...props} 
                isAuthed={true}/>}
            /> 

            <Route exact path="/404">
                <NotFoundPage />
            </Route>

            <Redirect to="/404"/> 
        </Switch>
      </div>
    );
};

export default Main;
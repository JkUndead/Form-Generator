import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../pages/homePage";
import Login from "../pages/login";
import Templates from "../pages/templatePage";
import NewTemplates from "../pages/templatePage/newTemplate";
import UpdateTemplate from "../pages/templatePage/editTemplate";
import Forms from "../pages/forms";
import Approval from "../pages/approval";
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

            <Route exact path="/templates/:id" component={UpdateTemplate}/>

            <Route exact path="/forms">
                <Forms />
            </Route>


            <Route exact path="/approvals">
                <Approval />
            </Route>

            <Route exact path="/404">
                <NotFoundPage />
            </Route>

            <Redirect to="/404"/> 
        </Switch>
      </div>
    );
};

export default Main;
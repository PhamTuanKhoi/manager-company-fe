/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Projects from "./projects";
import ProjectView from "./projectview";
import ProjectList from "./projectlist";
import Taskboard from "./taskboard";
import Payslip from "./payslip";
import AddPayslip from "./addPayslip";

const ProjectRoute = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/project_dashboard`} />
      <Route path={`${match.url}/project_dashboard`} component={Projects} />
      <Route path={`${match.url}/projects-list`} component={ProjectList} />
      <Route path={`${match.url}/projects-view/:id`} component={ProjectView} />
      <Route path={`${match.url}/task-board`} component={Taskboard} />
      <Route path={`${match.url}/phieu-luong`} component={Payslip} />
      <Route path={`${match.url}/them-phieu-luong`} component={AddPayslip} />
   </Switch>
);

export default ProjectRoute;

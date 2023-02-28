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
import PartOverview from "./partoverview";
import AttendanceAdmin from "./../Employees/attendanceadmin";
import AttendanceEmployee from "./../Employees/attendanceemployee";
import Allowance from "./allowance";
import Salary from "./salary";

const ProjectRoute = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/project_dashboard`} />
      <Route path={`${match.url}/project_dashboard`} component={Projects} />
      <Route path={`${match.url}/projects-list`} component={ProjectList} />
      <Route path={`${match.url}/projects-view/:id`} component={ProjectView} />
      <Route path={`${match.url}/task-board/:id`} component={Taskboard} />
      <Route path={`${match.url}/attendance/:id`} component={AttendanceAdmin} />
      <Route path={`${match.url}/attendance-employee/:id`} component={AttendanceEmployee} />
      <Route path={`${match.url}/part-owerview/`} component={PartOverview} />
      <Route path={`${match.url}/allowance`} component={Allowance} />
      <Route path={`${match.url}/salary`} component={Salary} />
      <Route path={`${match.url}/phieu-luong`} component={Payslip} />
      <Route path={`${match.url}/them-phieu-luong/:id`} component={AddPayslip} />
      <Route path={`${match.url}/them-phieu-luong`} component={AddPayslip} />
   </Switch>
);

export default ProjectRoute;

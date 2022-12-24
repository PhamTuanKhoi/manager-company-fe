import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { EmployeeDepartmentType } from "../../../constant";
import { Avatar_02, Avatar_11, Avatar_01, PlaceHolder } from "../../../Entryfile/imagepath";
import { useLoading } from "../../../hook/useLoading";
import { listPayslipByUser } from "../../../redux/feature/payslipSclice";
import projectSclice from "../../../redux/feature/projectSclice";
import { listWorkerProjectByProject } from "../../../redux/feature/workerProjectSclice";
import AssignUser from "../../../_components/modelbox/assignUser";
import Editproject from "../../../_components/modelbox/Editproject";
import LinkProject from "../../../_components/modelbox/linkProject";
import { Collapse, Select } from "antd";
import AssignUserTask from "../../../_components/modelbox/assignUserTask";
import { listTaskByProject } from "../../../redux/feature/taskSclice";
const { Panel } = Collapse;

const ProjectView = () => {
   useEffect(() => {
      if ($(".select").length > 0) {
         $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
         });
      }
   });
   const [modalShow, setModalShow] = useState(false);
   const [addWorker, setAddWorker] = useState(false);
   const [modalAssign, setModalAssign] = useState(false);
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   const { id } = useParams();
   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      //project detail {}
      dispatch(projectSclice.actions.projectDetail(id));

      if (user._id) {
         listByUser();
      }
   }, [id]);

   useEffect(() => {
      // worker-project by id project
      dispatch(listWorkerProjectByProject({ id, setLoading }));

      // task by id project
      dispatch(listTaskByProject({ id, setLoading }));
   }, [id]);

   function listByUser() {
      dispatch(listPayslipByUser({ id: user?._id }));
   }

   const { project } = useSelector((state) => state.project);
   const { listWPByProject } = useSelector((state) => state.workerProject);
   const { tasks } = useSelector((state) => state.task);

   const onChange = (key) => {
      console.log(key);
   };

   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Projects - HRMS Admin Template</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title">Hospital Admin</h3>
                     <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/app/main/dashboard">Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active">Project</li>
                     </ul>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <a
                        href="#"
                        className="btn add-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_project"
                     >
                        <i className="fa fa-plus" /> Edit Project
                     </a>
                     <Link
                        to="/app/projects/task-board"
                        className="btn btn-white float-end m-r-10"
                        data-bs-toggle="tooltip"
                        title="Task Board"
                     >
                        <i className="fa fa-bars" />
                     </Link>
                  </div>
               </div>
            </div>
            {/* /Page Header */}
            <div className="row">
               <div className="col-lg-8 col-xl-9">
                  <div className="card">
                     <div className="card-body">
                        <div className="project-title">
                           <h5 className="card-title">{project?.name}</h5>
                           <small className="block text-ellipsis m-b-15">
                              <span className="text-xs">2</span>{" "}
                              <span className="text-muted">open tasks, </span>
                              <span className="text-xs">5</span>{" "}
                              <span className="text-muted">tasks completed</span>
                           </small>
                        </div>
                        <p>{project?.content}</p>
                     </div>
                  </div>
                  <div className="card">
                     <div className="card-body">
                        <h5 className="card-title m-b-20">Uploaded image files</h5>
                        <div className="row">
                           <div className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                              <div className="uploaded-box">
                                 <div className="uploaded-img">
                                    <img src={PlaceHolder} className="img-fluid" alt="" />
                                 </div>
                                 <div className="uploaded-img-name">demo.png</div>
                              </div>
                           </div>
                           <div className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                              <div className="uploaded-box">
                                 <div className="uploaded-img">
                                    <img src={PlaceHolder} className="img-fluid" alt="" />
                                 </div>
                                 <div className="uploaded-img-name">demo.png</div>
                              </div>
                           </div>
                           <div className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                              <div className="uploaded-box">
                                 <div className="uploaded-img">
                                    <img src={PlaceHolder} className="img-fluid" alt="" />
                                 </div>
                                 <div className="uploaded-img-name">demo.png</div>
                              </div>
                           </div>
                           <div className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                              <div className="uploaded-box">
                                 <div className="uploaded-img">
                                    <img src={PlaceHolder} className="img-fluid" alt="" />
                                 </div>
                                 <div className="uploaded-img-name">demo.png</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="card">
                     <div className="card-body">
                        <h5 className="card-title m-b-20">Uploaded files</h5>
                        <ul className="files-list">
                           <li>
                              <div className="files-cont">
                                 <div className="file-type">
                                    <span className="files-icon">
                                       <i className="fa fa-file-pdf-o" />
                                    </span>
                                 </div>
                                 <div className="files-info">
                                    <span className="file-name text-ellipsis">
                                       <a href="#">
                                          AHA Selfcare Mobile Application Test-Cases.xls
                                       </a>
                                    </span>
                                    <span className="file-author">
                                       <a href="#">John Doe</a>
                                    </span>{" "}
                                    <span className="file-date">May 31st at 6:53 PM</span>
                                    <div className="file-size">Size: 14.8Mb</div>
                                 </div>
                                 <ul className="files-action">
                                    <li className="dropdown dropdown-action">
                                       <a
                                          href=""
                                          className="dropdown-toggle btn btn-link"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                       >
                                          <i className="material-icons">more_horiz</i>
                                       </a>
                                       <div className="dropdown-menu dropdown-menu-right">
                                          <a className="dropdown-item" href="">
                                             Download
                                          </a>
                                          <a
                                             className="dropdown-item"
                                             href="#"
                                             data-bs-toggle="modal"
                                             data-bs-target="#share_files"
                                          >
                                             Share
                                          </a>
                                          <a className="dropdown-item" href="">
                                             Delete
                                          </a>
                                       </div>
                                    </li>
                                 </ul>
                              </div>
                           </li>
                           <li>
                              <div className="files-cont">
                                 <div className="file-type">
                                    <span className="files-icon">
                                       <i className="fa fa-file-pdf-o" />
                                    </span>
                                 </div>
                                 <div className="files-info">
                                    <span className="file-name text-ellipsis">
                                       <a href="#">
                                          AHA Selfcare Mobile Application Test-Cases.xls
                                       </a>
                                    </span>
                                    <span className="file-author">
                                       <a href="#">Richard Miles</a>
                                    </span>{" "}
                                    <span className="file-date">May 31st at 6:53 PM</span>
                                    <div className="file-size">Size: 14.8Mb</div>
                                 </div>
                                 <ul className="files-action">
                                    <li className="dropdown dropdown-action">
                                       <a
                                          href=""
                                          className="dropdown-toggle btn btn-link"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                       >
                                          <i className="material-icons">more_horiz</i>
                                       </a>
                                       <div className="dropdown-menu dropdown-menu-right">
                                          <a className="dropdown-item" href="">
                                             Download
                                          </a>
                                          <a
                                             className="dropdown-item"
                                             href="#"
                                             data-bs-toggle="modal"
                                             data-bs-target="#share_files"
                                          >
                                             Share
                                          </a>
                                          <a className="dropdown-item" href="">
                                             Delete
                                          </a>
                                       </div>
                                    </li>
                                 </ul>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div className="project-task">
                     <ul className="nav nav-tabs nav-tabs-top nav-justified mb-0">
                        <li className="nav-item">
                           <a
                              className="nav-link active"
                              href="#all_tasks"
                              data-bs-toggle="tab"
                              aria-expanded="true"
                           >
                              All Tasks
                           </a>
                        </li>
                        <li className="nav-item">
                           <a
                              className="nav-link"
                              href="#pending_tasks"
                              data-bs-toggle="tab"
                              aria-expanded="false"
                           >
                              Pending Tasks
                           </a>
                        </li>
                        <li className="nav-item">
                           <a
                              className="nav-link"
                              href="#completed_tasks"
                              data-bs-toggle="tab"
                              aria-expanded="false"
                           >
                              Completed Tasks
                           </a>
                        </li>
                     </ul>
                     <div className="tab-content">
                        <div className="tab-pane show active" id="all_tasks">
                           <div className="task-wrapper">
                              <div className="task-list-container">
                                 <div className="task-list-body">
                                    <ul id="task-list">
                                       {/* <li className="task">
                                          <div className="task-container">
                                             <span className="task-action-btn task-check">
                                                <span
                                                   className="action-circle large complete-btn"
                                                   title="Mark Complete"
                                                >
                                                   <i className="material-icons">check</i>
                                                </span>
                                             </span>
                                             <span
                                                className="task-label"
                                                contentEditable="true"
                                                suppressContentEditableWarning={true}
                                             >
                                                Patient appointment booking
                                             </span>
                                             <span className="task-action-btn task-btn-right">
                                                <span
                                                   className="action-circle large"
                                                   title="Assign"
                                                >
                                                   <i className="material-icons">person_add</i>
                                                </span>
                                                <span
                                                   className="action-circle large delete-btn"
                                                   title="Delete Task"
                                                >
                                                   <i className="material-icons">delete</i>
                                                </span>
                                             </span>
                                          </div>
                                       </li> */}

                                       <li className="task">
                                          <Collapse
                                             defaultActiveKey={["1"]}
                                             onChange={onChange}
                                             expandIconPosition="start"
                                          >
                                             {tasks?.map((item) => (
                                                <Panel
                                                   key={item?._id}
                                                   header={item?.name}
                                                   extra={genExtra()}
                                                >
                                                   <div>{item?.content}</div>
                                                </Panel>
                                             ))}
                                          </Collapse>
                                       </li>
                                    </ul>
                                 </div>
                                 <div className="task-list-footer">
                                    <div className="new-task-wrapper">
                                       <textarea
                                          id="new-task"
                                          placeholder="Enter new task here. . ."
                                          defaultValue={""}
                                       />
                                       <span className="error-message hidden">
                                          You need to enter a task first
                                       </span>
                                       <span className="add-new-task-btn btn" id="add-task">
                                          Add Task
                                       </span>
                                       <span className="btn" id="close-task-panel">
                                          Close
                                       </span>
                                    </div>
                                 </div>

                                 <div
                                    className="assign-button"
                                    onClick={() => setModalAssign(true)}
                                 >
                                    <span className="button-circle">
                                       <span className="plus-assign">Thêm công việc</span>
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="tab-pane" id="pending_tasks" />
                        <div className="tab-pane" id="completed_tasks" />
                     </div>
                  </div>
               </div>
               <div className="col-lg-4 col-xl-3">
                  <div className="card">
                     <div className="card-body">
                        <h6 className="card-title m-b-15">Project details</h6>
                        <table className="table table-striped table-border">
                           <tbody>
                              <tr>
                                 <td>Cost:</td>
                                 <td className="text-end">${project?.price}</td>
                              </tr>
                              <tr>
                                 <td>Total Hours:</td>
                                 <td className="text-end">100 Hours</td>
                              </tr>
                              <tr>
                                 <td>Created:</td>
                                 <td className="text-end">
                                    {moment(project?.start).format("DD/MM/YYYY")}
                                 </td>
                              </tr>
                              <tr>
                                 <td>Deadline:</td>
                                 <td className="text-end">
                                    {moment(project?.end).format("DD/MM/YYYY")}
                                 </td>
                              </tr>
                              <tr>
                                 <td>Priority:</td>
                                 <td className="text-end">
                                    <div className="btn-group">
                                       <a
                                          href="#"
                                          className="badge badge-danger dropdown-toggle"
                                          data-bs-toggle="dropdown"
                                       >
                                          Highest{" "}
                                       </a>
                                       <div className="dropdown-menu dropdown-menu-right">
                                          <a className="dropdown-item" href="#">
                                             <i className="fa fa-dot-circle-o text-danger" />{" "}
                                             Highest priority
                                          </a>
                                          <a className="dropdown-item" href="#">
                                             <i className="fa fa-dot-circle-o text-info" /> High
                                             priority
                                          </a>
                                          <a className="dropdown-item" href="#">
                                             <i className="fa fa-dot-circle-o text-primary" />{" "}
                                             Normal priority
                                          </a>
                                          <a className="dropdown-item" href="#">
                                             <i className="fa fa-dot-circle-o text-success" /> Low
                                             priority
                                          </a>
                                       </div>
                                    </div>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Created by:</td>
                                 <td className="text-end">
                                    <Link to="/app/profile/employee-profile">Barry Cuda</Link>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Status:</td>
                                 <td className="text-end">Working</td>
                              </tr>
                           </tbody>
                        </table>
                        <p className="m-b-5">
                           Progress <span className="text-success float-end">40%</span>
                        </p>
                        <div className="progress progress-xs mb-0">
                           <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              data-bs-toggle="tooltip"
                              title="40%"
                              style={{ width: "40%" }}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="card project-user">
                     <div className="card-body content-center">
                        <button
                           type="button"
                           className="float-end btn btn-primary btn-sm"
                           onClick={() => setModalShow(true)}
                        >
                           {project?.payslip?.length > 0
                              ? "Thay đổi phiếu lương"
                              : "Liên kết phiếu lương"}
                        </button>
                     </div>
                     {project?.payslip && (
                        <a
                           href={`/app/payroll/salary-view/${project?.payslip[0]?._id}`}
                           className="payslip-link"
                        >
                           {project?.payslip[0]?.name}
                        </a>
                     )}
                  </div>
                  <div className="card project-user">
                     <div className="card-body">
                        <h6 className="card-title m-b-20">
                           Khách hàng{" "}
                           <button
                              type="button"
                              className="float-end btn btn-primary btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#assign_leader"
                           >
                              <i className="fa fa-plus" /> Thêm
                           </button>
                        </h6>
                        <ul className="list-box">
                           {project?.client?.map((item) => (
                              <li key={item?._id}>
                                 <Link to="/app/profile/employee-profile">
                                    <div className="list-item">
                                       <div className="list-left">
                                          <span className="avatar">
                                             <img alt="" src={Avatar_01} />
                                          </span>
                                       </div>
                                       <div className="list-body">
                                          <span className="message-author">{item?.name}</span>
                                          <div className="clearfix" />
                                          <span className="message-content">{item?.company}</span>
                                       </div>
                                    </div>
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>

                  {/* lead */}
                  <div className="card project-user">
                     <div className="card-body">
                        <h6 className="card-title m-b-20">
                           Leader{" "}
                           <button
                              type="button"
                              className="float-end btn btn-primary btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#assign_leader"
                           >
                              <i className="fa fa-plus" /> Thay đổi
                           </button>
                        </h6>
                        <ul className="list-box">
                           <li>
                              <Link to="/app/profile/employee-profile">
                                 <div className="list-item">
                                    <div className="list-left">
                                       <span className="avatar">
                                          <img alt="" src={Avatar_01} />
                                       </span>
                                    </div>
                                    <div className="list-body">
                                       <span className="message-author">
                                          {project?.leader?.name}
                                       </span>
                                       <div className="clearfix" />
                                       <span className="message-content">
                                          {project?.leader?.department}
                                       </span>
                                    </div>
                                 </div>
                              </Link>
                           </li>
                        </ul>
                     </div>
                  </div>
                  {/* nhan vien */}
                  <div className="card project-user">
                     <div className="card-body">
                        <h6 className="card-title m-b-20">
                           Nhân viên
                           <button
                              type="button"
                              className="float-end btn btn-primary btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#assign_leader"
                           >
                              <i className="fa fa-plus" /> Thêm
                           </button>
                        </h6>
                        <ul className="list-box">
                           {project?.team?.map((item) => (
                              <li key={item?._id}>
                                 <Link to="/app/profile/employee-profile">
                                    <div className="list-item">
                                       <div className="list-left">
                                          <span className="avatar">
                                             <img alt="" src={item?.avartar || Avatar_11} />
                                          </span>
                                       </div>
                                       <div className="list-body">
                                          <span className="message-author">{item?.name}</span>
                                          <div className="clearfix" />
                                          <span className="message-content">
                                             {item?.department === EmployeeDepartmentType.BUSSINESS
                                                ? "Kinh doanh"
                                                : item?.department ===
                                                  EmployeeDepartmentType.MARKETING
                                                ? "Marketing"
                                                : item?.department ===
                                                  EmployeeDepartmentType.ACCOUNTANT
                                                ? "Kế toán"
                                                : item?.department ===
                                                  EmployeeDepartmentType.RECRUIT
                                                ? "Tuyển dụng"
                                                : ""}
                                          </span>
                                       </div>
                                    </div>
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
                  <div className="card project-user">
                     <div className="card-body">
                        <h6 className="card-title m-b-20 worker-name">
                           Người lao động
                           <button
                              type="button"
                              className="float-end btn btn-primary btn-sm"
                              onClick={() => setAddWorker(true)}
                           >
                              Thêm
                           </button>
                        </h6>
                        <ul className="list-box">
                           {listWPByProject?.map((item, index) => (
                              <li key={index}>
                                 <Link to="/app/profile/employee-profile">
                                    <div className="list-item">
                                       <div className="list-left">
                                          <span className="avatar">
                                             <img alt="" src={Avatar_02} />
                                          </span>
                                       </div>
                                       <div className="list-body">
                                          <span className="message-author">{item?.user?.name}</span>
                                          <div className="clearfix" />
                                          {/* <span className="message-content">Web Designer</span> */}
                                       </div>
                                    </div>
                                 </Link>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
         {/* Assign Leader Modal */}
         <LinkProject show={modalShow} onHide={() => setModalShow(false)} />
         {/* /Assign Leader Modal */}
         {/* Assign User Modal */}
         <AssignUser show={addWorker} onHide={() => setAddWorker(false)} />
         {/* /Assign User Modal */}
         <AssignUserTask show={modalAssign} onHide={() => setModalAssign(false)} />
         {/* Edit Project Modal */}
         <Editproject />
         {/* /Edit Project Modal */}
      </div>
   );
};

const genExtra = () => (
   <>
      <span className="action-circle large" title="Assign">
         <i className="material-icons" onClick={(e) => e.stopPropagation()}>
            edit
         </i>
      </span>
      <span className="action-circle large" title="Assign">
         <i className="material-icons" onClick={(e) => e.stopPropagation()}>
            person_add
         </i>
      </span>
      <span className="action-circle large delete-btn" title="Delete Task">
         <i className="material-icons" onClick={(e) => e.stopPropagation()}>
            delete
         </i>
      </span>
   </>
);

export default ProjectView;

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Editproject from "../../../_components/modelbox/Editproject";
// import ReactSummernote from "react-summernote";
// import "react-summernote/dist/react-summernote.css"; // import styles

import "../../index.css";
import {
   Avatar_16,
   Avatar_02,
   Avatar_05,
   Avatar_09,
   Avatar_10,
   Avatar_11,
   Avatar_12,
   Avatar_13,
   Avatar_01,
} from "../../../Entryfile/imagepath";

import Addproject from "../../../_components/modelbox/Addproject";
import { useDispatch } from "react-redux";
import { listProject } from "../../../redux/feature/projectSclice";
import { useSelector } from "react-redux";
import moment from "moment";
const Projects = () => {
   const [modalShow, setModalShow] = useState(false);
   const onImageUpload = (fileList) => {
      const reader = new FileReader();
      // reader.onloadend = () => {
      //    ReactSummernote.insertImage(reader.result);
      // };
      reader.readAsDataURL(fileList[0]);
   };

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(listProject());
   }, []);

   const { projects } = useSelector((state) => state.project);

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
                     <h3 className="page-title">Projects</h3>
                     <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/app/main/dashboard">Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active">Projects</li>
                     </ul>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <a href="#" className="btn add-btn" onClick={() => setModalShow(true)}>
                        <i className="fa fa-plus" /> Create Project
                     </a>
                     <div className="view-icons">
                        <Link
                           to="/app/projects/project_dashboard"
                           className="grid-view btn btn-link active"
                        >
                           <i className="fa fa-th" />
                        </Link>
                        <Link to="/app/projects/projects-list" className="list-view btn btn-link">
                           <i className="fa fa-bars" />
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
            {/* /Page Header */}
            {/* Search Filter */}
            <div className="row filter-row">
               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus">
                     <input type="text" className="form-control floating" />
                     <label className="focus-label">Project Name</label>
                  </div>
               </div>
               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus">
                     <input type="text" className="form-control floating" />
                     <label className="focus-label">Employee Name</label>
                  </div>
               </div>
               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus select-focus">
                     <select className="select floating">
                        <option>Select Roll</option>
                        <option>Web Developer</option>
                        <option>Web Designer</option>
                        <option>Android Developer</option>
                        <option>Ios Developer</option>
                     </select>
                     <label className="focus-label">Designation</label>
                  </div>
               </div>
               <div className="col-sm-6 col-md-3">
                  <a href="#" className="btn btn-success btn-block w-100">
                     {" "}
                     Search{" "}
                  </a>
               </div>
            </div>
            {/* Search Filter */}
            <div className="row">
               {projects?.map((item) => (
                  <div key={item?._id} className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                     <div className="card">
                        <div className="card-body">
                           <div className="dropdown dropdown-action profile-action">
                              <a
                                 href="#"
                                 className="action-icon dropdown-toggle"
                                 data-bs-toggle="dropdown"
                                 aria-expanded="false"
                              >
                                 <i className="material-icons">more_vert</i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                 <a
                                    className="dropdown-item"
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit_project"
                                 >
                                    <i className="fa fa-pencil m-r-5" /> Edit
                                 </a>
                                 <a
                                    className="dropdown-item"
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete_project"
                                 >
                                    <i className="fa fa-trash-o m-r-5" /> Delete
                                 </a>
                              </div>
                           </div>
                           <h4 className="project-title">
                              <Link to={"/app/projects/projects-view/" + item?._id}>
                                 {item?.name}
                              </Link>
                           </h4>
                           <small className="block text-ellipsis m-b-15">
                              <span className="text-xs">1</span>{" "}
                              <span className="text-muted">open tasks, </span>
                              <span className="text-xs">9</span>{" "}
                              <span className="text-muted">tasks completed</span>
                           </small>
                           <p className="text-muted">{item?.content}</p>
                           <div className="pro-deadline m-b-15">
                              <div className="sub-title">Deadline:</div>
                              <div className="text-muted">
                                 {moment(item?.end).format("DD-MM-YYYY")}
                              </div>
                           </div>
                           <div className="project-members m-b-15">
                              <div>Project Leader :</div>
                              <ul className="team-members">
                                 <li>
                                    <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor">
                                       <img alt="" src={Avatar_16} />
                                    </a>
                                 </li>
                              </ul>
                           </div>
                           <div className="project-members m-b-15">
                              <div>Team :</div>
                              <ul className="team-members">
                                 {/* {item?.team((elemyees) => (
                                    <li>
                                       <a href="#" data-bs-toggle="tooltip" title="John Doe">
                                          <img alt="" src={elemyees?.avartar || Avatar_02} />
                                       </a>
                                    </li>
                                 ))} */}

                                 <li>
                                    <a href="#" data-bs-toggle="tooltip" title="John Doe">
                                       <img alt="" src={Avatar_02} />
                                    </a>
                                 </li>

                                 <li className="dropdown avatar-dropdown">
                                    <a
                                       href="#"
                                       className="all-users dropdown-toggle"
                                       data-bs-toggle="dropdown"
                                       aria-expanded="false"
                                    >
                                       +15
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                       <div className="avatar-group">
                                          <a className="avatar avatar-xs" href="#">
                                             <img alt="" src={Avatar_02} />
                                          </a>
                                          <a className="avatar avatar-xs" href="#">
                                             <img alt="" src={Avatar_09} />
                                          </a>
                                          <a className="avatar avatar-xs" href="#">
                                             <img alt="" src={Avatar_10} />
                                          </a>
                                          <a className="avatar avatar-xs" href="#">
                                             <img alt="" src={Avatar_05} />
                                          </a>
                                          <a className="avatar avatar-xs" href="#">
                                             <img alt="" src={Avatar_11} />
                                          </a>
                                          <a className="avatar avatar-xs" href="#">
                                             <img alt="" src={Avatar_12} />
                                          </a>
                                          <a className="avatar avatar-xs" href="#">
                                             <img alt="" src={Avatar_13} />
                                          </a>
                                          <a className="avatar avatar-xs" href="#">
                                             <img alt="" src={Avatar_01} />
                                          </a>
                                          <a className="avatar avatar-xs" href="#">
                                             <img alt="" src={Avatar_16} />
                                          </a>
                                       </div>
                                       <div className="avatar-pagination">
                                          <ul className="pagination">
                                             <li className="page-item">
                                                <a
                                                   className="page-link"
                                                   href="#"
                                                   aria-label="Previous"
                                                >
                                                   <span aria-hidden="true">«</span>
                                                   <span className="sr-only">Previous</span>
                                                </a>
                                             </li>
                                             <li className="page-item">
                                                <a className="page-link" href="#">
                                                   1
                                                </a>
                                             </li>
                                             <li className="page-item">
                                                <a className="page-link" href="#">
                                                   2
                                                </a>
                                             </li>
                                             <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Next">
                                                   <span aria-hidden="true">»</span>
                                                   <span className="sr-only">Next</span>
                                                </a>
                                             </li>
                                          </ul>
                                       </div>
                                    </div>
                                 </li>
                              </ul>
                           </div>
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
                  </div>
               ))}
               <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                  <div className="card">
                     <div className="card-body">
                        <div className="dropdown dropdown-action profile-action">
                           <a
                              href="#"
                              className="action-icon dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                           >
                              <i className="material-icons">more_vert</i>
                           </a>
                           <div className="dropdown-menu dropdown-menu-right">
                              <a
                                 className="dropdown-item"
                                 href="#"
                                 data-bs-toggle="modal"
                                 data-bs-target="#edit_project"
                              >
                                 <i className="fa fa-pencil m-r-5" /> Edit
                              </a>
                              <a
                                 className="dropdown-item"
                                 href="#"
                                 data-bs-toggle="modal"
                                 data-bs-target="#delete_project"
                              >
                                 <i className="fa fa-trash-o m-r-5" /> Delete
                              </a>
                           </div>
                        </div>
                        <h4 className="project-title">
                           <Link to="/app/projects/projects-view">Project Management</Link>
                        </h4>
                        <small className="block text-ellipsis m-b-15">
                           <span className="text-xs">2</span>{" "}
                           <span className="text-muted">open tasks, </span>
                           <span className="text-xs">5</span>{" "}
                           <span className="text-muted">tasks completed</span>
                        </small>
                        <p className="text-muted">
                           Lorem Ipsum is simply dummy text of the printing and typesetting
                           industry. When an unknown printer took a galley of type and scrambled
                           it...
                        </p>
                        <div className="pro-deadline m-b-15">
                           <div className="sub-title">Deadline:</div>
                           <div className="text-muted">17 Apr 2019</div>
                        </div>
                        <div className="project-members m-b-15">
                           <div>Project Leader :</div>
                           <ul className="team-members">
                              <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor">
                                    <img alt="" src={Avatar_16} />
                                 </a>
                              </li>
                           </ul>
                        </div>
                        <div className="project-members m-b-15">
                           <div>Team :</div>
                           <ul className="team-members">
                              <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Doe">
                                    <img alt="" src={Avatar_02} />
                                 </a>
                              </li>
                              <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Richard Miles">
                                    <img alt="" src={Avatar_09} />
                                 </a>
                              </li>
                              <li>
                                 <a href="#" data-bs-toggle="tooltip" title="John Smith">
                                    <img alt="" src={Avatar_10} />
                                 </a>
                              </li>
                              <li>
                                 <a href="#" data-bs-toggle="tooltip" title="Mike Litorus">
                                    <img alt="" src={Avatar_05} />
                                 </a>
                              </li>
                              <li className="dropdown avatar-dropdown">
                                 <a
                                    href="#"
                                    className="all-users dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                 >
                                    +15
                                 </a>
                                 <div className="dropdown-menu dropdown-menu-right">
                                    <div className="avatar-group">
                                       <a className="avatar avatar-xs" href="#">
                                          <img alt="" src={Avatar_02} />
                                       </a>
                                       <a className="avatar avatar-xs" href="#">
                                          <img alt="" src={Avatar_09} />
                                       </a>
                                       <a className="avatar avatar-xs" href="#">
                                          <img alt="" src={Avatar_10} />
                                       </a>
                                       <a className="avatar avatar-xs" href="#">
                                          <img alt="" src={Avatar_05} />
                                       </a>
                                       <a className="avatar avatar-xs" href="#">
                                          <img alt="" src={Avatar_11} />
                                       </a>
                                       <a className="avatar avatar-xs" href="#">
                                          <img alt="" src={Avatar_12} />
                                       </a>
                                       <a className="avatar avatar-xs" href="#">
                                          <img alt="" src={Avatar_13} />
                                       </a>
                                       <a className="avatar avatar-xs" href="#">
                                          <img alt="" src={Avatar_01} />
                                       </a>
                                       <a className="avatar avatar-xs" href="#">
                                          <img alt="" src={Avatar_16} />
                                       </a>
                                    </div>
                                    <div className="avatar-pagination">
                                       <ul className="pagination">
                                          <li className="page-item">
                                             <a
                                                className="page-link"
                                                href="#"
                                                aria-label="Previous"
                                             >
                                                <span aria-hidden="true">«</span>
                                                <span className="sr-only">Previous</span>
                                             </a>
                                          </li>
                                          <li className="page-item">
                                             <a className="page-link" href="#">
                                                1
                                             </a>
                                          </li>
                                          <li className="page-item">
                                             <a className="page-link" href="#">
                                                2
                                             </a>
                                          </li>
                                          <li className="page-item">
                                             <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">»</span>
                                                <span className="sr-only">Next</span>
                                             </a>
                                          </li>
                                       </ul>
                                    </div>
                                 </div>
                              </li>
                           </ul>
                        </div>
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
               </div>
            </div>
         </div>
         {/* /Page Content */}
         {/* Create Project Modal */}
         <Addproject show={modalShow} onHide={() => setModalShow(false)} />
         {/* /Create Project Modal */}
         {/* Edit Project Modal */}
         <Editproject />
         {/* /Edit Project Modal */}
         {/* Delete Project Modal */}
         <div className="modal custom-modal fade" id="delete_project" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
               <div className="modal-content">
                  <div className="modal-body">
                     <div className="form-header">
                        <h3>Delete Project</h3>
                        <p>Are you sure want to delete?</p>
                     </div>
                     <div className="modal-btn delete-action">
                        <div className="row">
                           <div className="col-6">
                              <a href="" className="btn btn-primary continue-btn">
                                 Delete
                              </a>
                           </div>
                           <div className="col-6">
                              <a
                                 href=""
                                 data-bs-dismiss="modal"
                                 className="btn btn-primary cancel-btn"
                              >
                                 Cancel
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* /Delete Project Modal */}
      </div>
   );
};

export default Projects;

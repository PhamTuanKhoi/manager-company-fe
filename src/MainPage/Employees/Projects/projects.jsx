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
import {
   listProject,
   listProjectByAdmin,
   listProjectByClient,
} from "../../../redux/feature/projectSclice";
import { useSelector } from "react-redux";
import moment from "moment";
import { useLoading } from "../../../hook/useLoading";
import { UserRoleType } from "../../../constant";
import { toast } from "react-toastify";
import DeleteProject from "../../../_components/modelbox/DeleteProject";
const Projects = () => {
   const [modalShow, setModalShow] = useState(false);
   const [modalDelete, setModalDelete] = useState(false);
   const [render, setRender] = useState(0);
   const [projectData, setProjectData] = useState({});
   const onImageUpload = (fileList) => {
      const reader = new FileReader();
      // reader.onloadend = () => {
      //    ReactSummernote.insertImage(reader.result);
      // };
      reader.readAsDataURL(fileList[0]);
   };

   const { setLoading } = useLoading();
   const dispatch = useDispatch();

   const { projects } = useSelector((state) => state.project);
   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      fetchProject();
   }, [user._id]);

   const fetchProject = () => {
      if (user.role === UserRoleType.CLIENT) {
         dispatch(listProjectByClient({ id: user._id, setLoading }));
      }

      if (user.role === UserRoleType.ADMIN) {
         dispatch(listProjectByAdmin({ setLoading }));
      }
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
                     <h3 className="page-title">Dự án</h3>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <a href="#" className="btn add-btn" onClick={() => setModalShow(true)}>
                        <i className="fa fa-plus" /> Thêm dự án
                     </a>
                     {/* list project */}
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
                     <label className="focus-label">Tên dự án</label>
                  </div>
               </div>
               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus">
                     <input type="text" className="form-control floating" />
                     <label className="focus-label">Tên nhân viên</label>
                  </div>
               </div>

               <div className="col-sm-6 col-md-3">
                  <a href="#" className="btn btn-success btn-block w-100">
                     {" "}
                     Tìm kiếm{" "}
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
                                    onClick={() => {
                                       setRender((prev) => prev + 1);
                                       setProjectData(item);
                                       setModalShow(true);
                                    }}
                                 >
                                    <i className="fa fa-pencil m-r-5" /> Sửa
                                 </a>
                                 <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => {
                                       setProjectData(item);
                                       setModalDelete(true);
                                    }}
                                 >
                                    <i className="fa fa-trash-o m-r-5" /> Xóa
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
                           {/* <p className="text-muted">{item?.content}</p> */}
                           <div className="pro-deadline m-b-15">
                              <div className="sub-title">Tổng số:</div>
                              <div className="text-muted">70 Người</div>
                           </div>
                           <div className="pro-deadline m-b-15">
                              <div className="sub-title">Số lượng làm:</div>
                              <div className="text-muted">
                                 <ul className="team-members">
                                    <li>
                                       <a href="#" data-bs-toggle="tooltip" title="John Doe">
                                          <img alt="" src={Avatar_02} />
                                       </a>
                                    </li>
                                    <li>
                                       <a href="#" data-bs-toggle="tooltip" title="John Doe">
                                          <img alt="" src={Avatar_16} />
                                       </a>
                                    </li>

                                    <li className="dropdown avatar-dropdown">
                                       <a
                                          href="#"
                                          className="all-users dropdown-toggle"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                       >
                                          +48
                                       </a>
                                       <div className="dropdown-menu dropdown-menu-right">
                                          <div className="avatar-group">
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
                                                   <a
                                                      className="page-link"
                                                      href="#"
                                                      aria-label="Next"
                                                   >
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
                           </div>
                           <div className="pro-deadline m-b-15">
                              <div className="sub-title">Số lượng nghỉ:</div>
                              <div className="text-muted">
                                 <ul className="team-members">
                                    <li>
                                       <a href="#" data-bs-toggle="tooltip" title="John Doe">
                                          <img alt="" src={Avatar_02} />
                                       </a>
                                    </li>
                                    <li>
                                       <a href="#" data-bs-toggle="tooltip" title="John Doe">
                                          <img alt="" src={Avatar_16} />
                                       </a>
                                    </li>

                                    <li className="dropdown avatar-dropdown">
                                       <a
                                          href="#"
                                          className="all-users dropdown-toggle"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                       >
                                          +1
                                       </a>
                                       <div className="dropdown-menu dropdown-menu-right">
                                          <div className="avatar-group">
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
                                                   <a
                                                      className="page-link"
                                                      href="#"
                                                      aria-label="Next"
                                                   >
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
                           </div>
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
            </div>
         </div>
         {/* /Page Content */}
         {/* Create Project Modal */}
         <Addproject
            show={modalShow}
            onHide={() => setModalShow(false)}
            projectData={projectData}
            render={render}
         />
         {/* /Create Project Modal */}
         {/* Edit Project Modal */}
         <Editproject />
         {/* /Edit Project Modal */}
         {/* Delete Project Modal */}
         <DeleteProject
            show={modalDelete}
            onHide={() => setModalDelete(false)}
            project={projectData}
         />
         {/* /Delete Project Modal */}
      </div>
   );
};

export default Projects;

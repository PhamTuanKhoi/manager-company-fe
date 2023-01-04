import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar_19 } from "../../Entryfile/imagepath";
import { listClient } from "../../redux/feature/clientSclice";
import Editclient from "../../_components/modelbox/Editclient";
import Modal from "react-bootstrap/Modal";
import { useLoading } from "../../hook/useLoading";
import { UserRoleType } from "../../constant";
import AddClient from "../../_components/modelbox/AddClient";
import DeleteUser from "../../_components/modelbox/DeleteUser";

const Clients = () => {
   useEffect(() => {
      if ($(".select").length > 0) {
         $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
         });
      }
   });

   //use
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const { setLoading } = useLoading();
   const [render, setRender] = useState(0);
   const [EditClient, setEditClient] = useState({});
   const { user } = useSelector((state) => state.auth);
   const [modalDelete, setModalDelete] = useState(false);

   const dispatch = useDispatch();

   useEffect(() => {
      fetchClient();
   }, []);

   async function fetchClient() {
      if (user.role === UserRoleType.ADMIN) {
         dispatch(listClient({ setLoading }));
      }
   }

   const { clients } = useSelector((state) => state.client);
   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Clients - HRMS Admin Template</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title">Khách hàng</h3>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <a href="#" className="btn add-btn" onClick={handleShow}>
                        <i className="fa fa-plus" /> Thêm khách hàng
                     </a>
                     <div className="view-icons">
                        <Link to="/app/employees/clients" className="grid-view btn btn-link active">
                           <i className="fa fa-th" />
                        </Link>
                        <Link to="/app/employees/clients-list" className="list-view btn btn-link">
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
                     <label className="focus-label">ID khách hàng</label>
                  </div>
               </div>
               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus">
                     <input type="text" className="form-control floating" />
                     <label className="focus-label">Tên khách hàng</label>
                  </div>
               </div>
               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus select-focus">
                     <select className="select floating">
                        {/* <option>Select Company</option>
                        <option>Global Technologies</option>
                        <option>Delta Infotech</option> */}
                     </select>
                     <label className="focus-label"> Công ty</label>
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
            <div className="row staff-grid-row">
               {clients.map((item) => (
                  <div key={item?._id} className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                     <div className="profile-widget">
                        <div className="profile-img">
                           <Link to="/app/profile/client-profile" className="avatar">
                              <img alt="" src={Avatar_19} />
                           </Link>
                        </div>
                        <div className="dropdown profile-action">
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
                                    setEditClient(item);
                                    handleShow(true);
                                 }}
                              >
                                 <i className="fa fa-pencil m-r-5" /> Sửa
                              </a>
                              <a
                                 className="dropdown-item"
                                 href="#"
                                 onClick={() => {
                                    setEditClient(item);
                                    setModalDelete(true);
                                 }}
                              >
                                 <i className="fa fa-trash-o m-r-5" /> Xóa
                              </a>
                           </div>
                        </div>
                        <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                           <Link to="/app/profile/client-profile">{item?.name}</Link>
                        </h4>
                        <h5 className="user-name m-t-10 mb-0 text-ellipsis">
                           <Link to="/app/profile/client-profile">{item?.company}</Link>
                        </h5>

                        <div className="small text-muted">{item?.field}</div>
                        <Link
                           onClick={() => localStorage.setItem("minheight", "true")}
                           to="/conversation/chat"
                           className="btn btn-white btn-sm m-t-10 mr-1"
                        >
                           Nhắn tin
                        </Link>
                        <Link
                           to="/app/profile/client-profile"
                           className="btn btn-white btn-sm m-t-10"
                        >
                           Trang cá nhân
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         {/* /Page Content */}
         {/* Add Client Modal */}
         <AddClient show={show} handleClose={handleClose} editClient={EditClient} render={render} />
         {/* /Add Client Modal */}
         {/* Edit Client Modal */}
         <Editclient />
         {/* /Edit Client Modal */}
         {/* Delete Client Modal */}
         <DeleteUser
            show={modalDelete}
            onHide={() => setModalDelete(false)}
            userRemove={EditClient}
         />
         {/* /Delete Client Modal */}
      </div>
   );
};

export default Clients;

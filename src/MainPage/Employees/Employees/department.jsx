import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { useDispatch } from "react-redux";
import { useLoading } from "../../../hook/useLoading";
import {
   createDepartment,
   removeDepartment,
   updateDepartment,
} from "../../../redux/feature/departmentSclice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";

const Department = () => {
   const [menu, setMenu] = useState(false);

   const toggleMobileMenu = () => {
      setMenu(!menu);
   };

   const columns = [
      {
         title: "#",
         render: (text, record, i) => i + 1,
      },
      {
         title: "Phòng ban",
         dataIndex: "name",
         sorter: (a, b) => a.name.length - b.name.length,
      },
      {
         title: "Tùy chỉnh",
         render: (text, record) => (
            <div className="dropdown dropdown-action text-end">
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
                        setItem(record);
                        handleShow();
                     }}
                  >
                     <i className="fa fa-pencil m-r-5" /> Sửa
                  </a>
                  <a
                     className="dropdown-item"
                     href="#"
                     onClick={() => {
                        setItem(record);
                        setShowDlt(true);
                     }}
                  >
                     <i className="fa fa-trash-o m-r-5" /> Xóa
                  </a>
               </div>
            </div>
         ),
      },
   ];

   const [name, setName] = useState("");
   const [item, setItem] = useState({});
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const [show, setShow] = useState(false);
   const [showDlt, setShowDlt] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const { departments } = useSelector((state) => state.department);

   const empty = () => {
      setName("");
      setItem({});
   };

   useEffect(() => {
      if (item.name) setName(item?.name);
   }, [item]);

   const handleSave = () => {
      dispatch(createDepartment({ payload: { name }, setLoading, toast, empty }));
   };

   const handleUpdate = () => {
      if (item._id)
         dispatch(updateDepartment({ id: item?._id, payload: { name }, setLoading, toast }));
   };

   const handleDelete = () => {
      if (item?._id)
         dispatch(
            removeDepartment({ id: item?._id, setLoading, toast, close: () => setShowDlt(false) })
         );
   };

   // const handleUpdate
   return (
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
         <Header onMenuClick={(value) => toggleMobileMenu()} />
         <Sidebar />
         <div className="page-wrapper">
            <Helmet>
               <title>Phòng ban - Nhân viên</title>
               <meta name="description" content="Login page" />
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
               {/* Page Header */}
               <div className="page-header">
                  <div className="row align-items-center">
                     <div className="col">
                        <h3 className="page-title">Phòng ban</h3>
                     </div>
                     <div className="col-auto float-end ml-auto">
                        <a href="#" className="btn add-btn" onClick={handleShow}>
                           <i className="fa fa-plus" /> Thêm phòng ban
                        </a>
                     </div>
                  </div>
               </div>
               {/* /Page Header */}
               <div className="row">
                  <div className="col-md-12">
                     <div className="table-responsive">
                        <Table
                           className="table-striped"
                           pagination={{
                              total: departments?.length,
                              showSizeChanger: true,
                              onShowSizeChange: onShowSizeChange,
                              itemRender: itemRender,
                           }}
                           style={{ overflowX: "auto" }}
                           columns={columns}
                           // bordered
                           dataSource={departments}
                           rowKey={(record) => record?._id}
                           // onChange={console.log("change")}
                        />
                     </div>
                  </div>
               </div>
            </div>
            {/* /Page Content */}
            {/* Add Department Modal */}
            <Modal show={show} centered>
               <div className="modal-header">
                  <h5 className="modal-title">
                     {item?._id ? "Cập nhật phòng ban" : "Phòng ban mới"}{" "}
                  </h5>
                  <button
                     type="button"
                     className="close-x"
                     onClick={() => {
                        handleClose();
                        empty();
                     }}
                  >
                     <span aria-hidden="true">×</span>
                  </button>
               </div>
               <div className="modal-body">
                  <div className="form-group">
                     <label>
                        Tên phòng ban<span className="text-danger">*</span>
                     </label>
                     <input
                        className="form-control"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                  </div>
                  <div className="submit-section">
                     {!item?._id ? (
                        <button className="btn btn-primary submit-btn" onClick={handleSave}>
                           Lưu
                        </button>
                     ) : (
                        <button className="btn btn-primary submit-btn" onClick={handleUpdate}>
                           Cập nhật
                        </button>
                     )}
                  </div>
               </div>
            </Modal>
            {/* /Add Department Modal */}

            {/* Delete Department Modal */}
            <Modal show={showDlt} centered>
               <div className="modal-body">
                  <div className="form-header">
                     <h3>Xóa phòng ban {name}</h3>
                     <p>Bạn có chắc muốn xóa phòng ban {name}</p>
                  </div>
                  <div className="modal-btn delete-action">
                     <div className="row">
                        <div className="col-6">
                           <a
                              href="#"
                              className="btn btn-primary continue-btn"
                              onClick={handleDelete}
                           >
                              Xóa
                           </a>
                        </div>
                        <div className="col-6">
                           <a
                              href="#"
                              className="btn btn-primary cancel-btn"
                              onClick={() => {
                                 setShowDlt(false);
                                 empty();
                              }}
                           >
                              Cancel
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </Modal>
            {/* /Delete Department Modal */}
         </div>
      </div>
   );
};

export default Department;

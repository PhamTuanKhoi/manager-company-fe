import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import "antd/dist/antd.css";
import "../antdstyle.css";
import { useDispatch } from "react-redux";
import { useLoading } from "../../hook/useLoading";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import { Link } from "react-router-dom";
import AddContract from "../../_components/modelbox/AddContract";
import {
   deleteContractCategory,
   findAllContractCategory,
} from "../../redux/feature/contractCategorySclice";
import moment from "moment";

const Contracts = () => {
   const [menu, setMenu] = useState(false);

   const toggleMobileMenu = () => {
      setMenu(!menu);
   };

   const [item, setItem] = useState({
      _id: "",
      name: "",
      startDate: "",
      endDate: "",
      project: {
         _id: "",
      },
   });
   const columns = [
      {
         title: "#",
         render: (text, record, i) => i + 1,
      },
      {
         title: "Loại hợp đồng",
         dataIndex: "name",
         render: (text, record) => (
            <Link
               className="text-uppercase"
               to={`/app/administrator/contract-details?contractId=${record?._id}`}
            >
               {text}
            </Link>
         ),
         sorter: (a, b) => a.name.length - b.name.length,
      },
      {
         title: "Ngày ký",
         dataIndex: "startDate",
         render: (t, record) =>
            record?.startDate ? moment(record?.startDate).format("DD/MM/YYYY") : "",
         sorter: (a, b) => a.startDate - b.startDate,
      },
      {
         title: "Ngày kết thúc",
         dataIndex: "endDate",
         render: (t, record) =>
            record?.endDate ? moment(record?.endDate).format("DD/MM/YYYY") : "",
         sorter: (a, b) => a.endDate - b.endDate,
      },
      {
         title: "Dự án",
         dataIndex: "project",
         render: (text, record) => record?.project?.name,
         sorter: (a, b) => a.project?.name.length - b.project?.name.length,
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
                        setShow(true);
                     }}
                  >
                     <i className="fa fa-pencil m-r-5" /> Sửa
                  </a>
                  <a
                     className="dropdown-item"
                     href="#"
                     onClick={() => {
                        setShowDlt(true);
                        setItem(record);
                     }}
                  >
                     <i className="fa fa-trash-o m-r-5" /> Xóa
                  </a>
               </div>
            </div>
         ),
      },
   ];

   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const [show, setShow] = useState(false);
   const [showDlt, setShowDlt] = useState(false);

   const handleDelete = () => {
      if (item?._id)
         dispatch(
            deleteContractCategory({
               id: item?._id,
               setLoading,
               toast,
               close: () => setShowDlt(false),
            })
         );
   };

   const { contractCategorys } = useSelector((state) => state.contractCategory);

   useEffect(() => {
      dispatch(findAllContractCategory({ setLoading }));
   }, []);

   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Hợp đồng</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title">HỢP ĐỒNG</h3>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <a href="#" className="btn add-btn" onClick={() => setShow(true)}>
                        <i className="fa fa-plus" /> Thêm hợp đồng
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
                           total: contractCategorys?.length,
                           showSizeChanger: true,
                           onShowSizeChange: onShowSizeChange,
                           itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={contractCategorys}
                        rowKey={(record) => record?._id}
                        // onChange={console.log("change")}
                     />
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
         {/* Add Department Modal */}
         <AddContract
            show={show}
            handleClose={() => setShow(false)}
            item={item}
            setItem={setItem}
         />
         {/* /Add Department Modal */}

         {/* Delete Department Modal */}
         <Modal show={showDlt} centered>
            <div className="modal-body">
               <div className="form-header">
                  <h3>Xóa {item?.name}</h3>
                  <p>Bạn có chắc muốn xóa {item?.name}</p>
               </div>
               <div className="modal-btn delete-action">
                  <div className="row">
                     <div className="col-6">
                        <a href="#" className="btn btn-primary continue-btn" onClick={handleDelete}>
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
   );
};

export default Contracts;

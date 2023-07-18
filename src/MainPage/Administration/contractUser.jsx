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
import { deleteContractCategory } from "../../redux/feature/contractCategorySclice";
import moment from "moment";
import { findAllContractDetail } from "../../redux/feature/contractDetailSclice";

const ContractUser = () => {
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
         title: "Mã hợp đồng",
         dataIndex: "code",
         render: (text, record) => (
            <Link
               className="text-uppercase"
               to={`/app/administrator/contract-details/${record?.contractCategory?._id}`}
            >
               {text && text < 10 ? (
                  <span className="text-primary fw-bold">FCE-0{text}</span>
               ) : (
                  <span className="text-primary fw-bold">FCE-{text}</span>
               )}
            </Link>
         ),
         sorter: (a, b) => a.code.length - b.code.length,
      },
      {
         title: "Người lao động",
         dataIndex: "worker",
         render: (text, record) => record?.worker?.name,
         sorter: (a, b) => a.worker?.name.length - b.worker?.name.length,
      },
      {
         title: "Hợp đồng",
         dataIndex: "contractCategory",
         render: (text, record) => record?.contractCategory?.name,
         sorter: (a, b) => a.contractCategory?.name.length - b.contractCategory?.name.length,
      },
      {
         title: "Khách hàng",
         dataIndex: "client",
         render: (text, record) => record?.client?.name,
         sorter: (a, b) => a.client?.name.length - b.client?.name.length,
      },
      {
         title: "Ngày ký",
         dataIndex: "date",
         render: (t, record) => (record?.date ? moment(record?.date).format("DD/MM/YYYY") : ""),
         sorter: (a, b) => a.date - b.date,
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

   const { contractDetails } = useSelector((state) => state.contractDetail);

   useEffect(() => {
      dispatch(findAllContractDetail({ setLoading }));
   }, []);

   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Hợp đồng người lao động</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title text-uppercase">Hợp đồng người lao động</h3>
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
                           total: contractDetails?.length,
                           showSizeChanger: true,
                           onShowSizeChange: onShowSizeChange,
                           itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={contractDetails}
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

export default ContractUser;

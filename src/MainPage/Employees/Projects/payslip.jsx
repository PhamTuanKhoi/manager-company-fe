import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   listPayslip,
   listPayslipByClient,
   listPayslipByEmployees,
   listPayslipByWorker,
} from "../../../redux/feature/payslipSclice";
import moment from "moment";
import { formatMoney, UserRoleType } from "../../../constant";
import { useLoading } from "../../../hook/useLoading";
import DeletePayslip from "../../../_components/modelbox/DeletePayslip";
import {
   listProjectByAdmin,
   listProjectByUser,
   updateProjectPayslip,
} from "../../../redux/feature/projectSclice";
import { toast } from "react-toastify";

const Payslip = () => {
   const [payslip, setPayslip] = useState({});
   const [modalDelete, setModalDelete] = useState(false);
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const [render, setRender] = useState(0);
   const { user } = useSelector((state) => state.auth);

   // -------------------------- fetch payslip ---------------------------

   useEffect(() => {
      fetchPayslip();
   }, [user?.role, render]);

   function fetchPayslip() {
      if (user._id) {
         if (user?.role === UserRoleType.ADMIN) {
            dispatch(listPayslip({ setLoading }));
         }

         if (user?.role === UserRoleType.EMPLOYEE) {
            dispatch(listPayslipByEmployees({ id: user._id, setLoading }));
         }

         if (user?.role === UserRoleType.CLIENT) {
            dispatch(listPayslipByClient({ id: user._id, setLoading }));
         }

         if (user?.role === UserRoleType.WORKER) {
            dispatch(listPayslipByWorker({ id: user._id, setLoading }));
         }
      }
   }

   // ---------------------- fetch project ------------------------

   useEffect(() => {
      if (user._id) {
         fetchProject();
      }
   }, [user._id, user.role]);

   const fetchProject = () => {
      if (user.role === UserRoleType.ADMIN) {
         dispatch(listProjectByAdmin({ setLoading }));
      }

      if (user.role !== UserRoleType.ADMIN) {
         dispatch(listProjectByUser({ id: user._id, setLoading }));
      }
   };

   const { projects } = useSelector((state) => state.project);

   const { payslips } = useSelector((state) => state.payslip);

   const handleSelect = (id, payslip) => {
      dispatch(
         updateProjectPayslip({
            id,
            payload: { payslip: payslip._id },
            toast,
            onHide: () => setRender((prev) => prev + 1),
            setLoading,
            payslip,
         })
      );
   };

   // ----------------------------- column --------------------------

   const columns = [
      {
         title: "T??n ph??c l???i b???o hi???m",
         dataIndex: "name",
         render: (text, record) => (
            <h2 className="table-avatar">
               <Link
                  style={{ color: "#0d6efd" }}
                  to={`/app/payroll/salary-view?payslip=${record?._id}`}
               >
                  {text}
               </Link>
            </h2>
         ),
         sorter: (a, b) => a.name.length - b.name.length,
      },
      {
         title: "BHYT",
         dataIndex: "medican",
         render: (text, record) => +record?.medican + "%",
         sorter: (a, b) => a.medican - b.medican,
      },
      {
         title: "BHXH",
         dataIndex: "society",
         render: (text, record) => +record?.society + "%",
         sorter: (a, b) => a.society - b.medican,
      },
      {
         title: "BH Th???t Nghi???p",
         dataIndex: "unemployment",
         render: (text, record) => +record?.unemployment + "%",
         sorter: (a, b) => a.unemployment - b.medican,
      },
      {
         title: "BH C??ng ??o??n",
         dataIndex: "medican",
         render: (text, record) => +record?.medican + "%",
         sorter: (a, b) => a.medican - b.medican,
      },
      {
         title: "BH Tai N???n",
         dataIndex: "medican",
         render: (text, record) => +record?.medican + "%",
         sorter: (a, b) => a.medican - b.medican,
      },
      {
         title: "S???c Kh???e ?????nh K???",
         dataIndex: "medican",
         render: (text, record) => +record?.medican + "%",
         sorter: (a, b) => a.medican - b.medican,
      },
      {
         title: "Thu???c d??? ??n",
         render: (text, record) => (
            <div className="dropdown ">
               <a
                  href="#"
                  className={`btn btn-white btn-sm btn-rounded dropdown-toggle ${
                     record?.projectEX?.name
                        ? `bg-success text-light fw-bold`
                        : `text-danger bg-warning`
                  }`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
               >
                  {record?.projectEX?.name || "Ch???n d??? ??n"}
               </a>
               <div className="dropdown-menu">
                  {projects.map((item) => (
                     <button
                        key={item?._id}
                        className="dropdown-item"
                        onClick={() => handleSelect(item._id, record)}
                     >
                        {item?.name}
                     </button>
                  ))}
               </div>
            </div>
         ),
      },
      {
         title: "Action",
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
                  <Link
                     className="dropdown-item"
                     to={`/app/projects/them-phieu-luong/${record?._id}`}
                  >
                     <i className="fa fa-pencil m-r-5" /> S???a
                  </Link>
                  <a
                     className="dropdown-item"
                     href="#"
                     onClick={() => {
                        setPayslip(record);
                        setModalDelete(true);
                     }}
                  >
                     <i className="fa fa-trash-o m-r-5" /> X??a
                  </a>
               </div>
            </div>
         ),
      },
   ];
   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Leads - HRMS Admin Template</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title">Ph??c l???i v?? b???o hi???m</h3>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <Link to={"/app/projects/them-phieu-luong"} className="btn add-btn">
                        <i className="fa fa-plus" /> Th??m ph??c l???i v?? b???o hi???m
                     </Link>
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
                           total: payslips.length,
                           showTotal: (total, range) =>
                              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                           showSizeChanger: true,
                           onShowSizeChange: onShowSizeChange,
                           itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={payslips}
                        rowKey={(record) => record?.projectEX?._id || record?._id}
                        // onChange={console.log("change value")}
                     />
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
         <DeletePayslip show={modalDelete} onHide={() => setModalDelete(false)} project={payslip} />
      </div>
   );
};

export default Payslip;

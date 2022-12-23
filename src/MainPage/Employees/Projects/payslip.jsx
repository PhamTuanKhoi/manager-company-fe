import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
   Avatar_11,
   Avatar_09,
   Avatar_02,
   Avatar_10,
   Avatar_05,
   Avatar_12,
   Avatar_01,
   Avatar_13,
   Avatar_16,
} from "../../../Entryfile/imagepath";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPayslip } from "../../../redux/feature/payslipSclice";
import moment from "moment";

const Payslip = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(listPayslip());
   }, []);

   const { payslips } = useSelector((state) => state.payslip);

   const columns = [
      {
         title: "#",
         dataIndex: "_id",
         render: (text, record) => {
            let i = 1;
            return i++;
         },
         sorter: (a, b) => a._id.length - b._id.length,
      },
      {
         title: "Tên phiếu lương",
         dataIndex: "name",
         render: (text, record) => (
            <h2 className="table-avatar">
               <Link to={`/app/payroll/salary-view/${record?._id}`}>{text}</Link>
            </h2>
         ),
         sorter: (a, b) => a.name.length - b.name.length,
      },

      {
         title: "Ngày tạo",
         dataIndex: "createdAt",
         render: (text) => moment(text).format("DD/MM/YYYY  -- hh:mm"),
         sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      },
      {
         title: "Kết nối dự án",
         dataIndex: "name",
         render: (text, record) => (
            <h2 className="table-avatar">
               <a href="/app/projects/phieu-luong">
                  <div className="back">{"<Back"}</div>
               </a>
            </h2>
         ),
         sorter: (a, b) => a.name.length - b.name.length,
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
                  <a className="dropdown-item" href="#">
                     <i className="fa fa-pencil m-r-5" /> Edit
                  </a>
                  <a className="dropdown-item" href="#">
                     <i className="fa fa-trash-o m-r-5" /> Delete
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
                     <h3 className="page-title">Phiếu lương</h3>
                     <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/app/main/dashboard">Trang chủ</Link>
                        </li>
                        <li className="breadcrumb-item active">Phiếu lương</li>
                     </ul>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <a href="/app/projects/them-phieu-luong" className="btn add-btn">
                        <i className="fa fa-plus" /> Add Client
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
                        rowKey={(record) => record._id}
                        onChange={console.log("change value")}
                     />
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
      </div>
   );
};

export default Payslip;
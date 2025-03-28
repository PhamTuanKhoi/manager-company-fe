import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../antdstyle.css";
import { useDispatch } from "react-redux";
import { useLoading } from "../../../hook/useLoading";
import workerSclice, { listUserSalary } from "../../../redux/feature/workerSclice";
import { useSelector } from "react-redux";
import { createOrUpdateContract } from "../../../redux/feature/contractSclice";
import { toast } from "react-toastify";
import { avartarFAKE, formatMoney, UserRoleType } from "../../../constant/index";
import { Checkbox } from "antd";
import { premiumsInsurance } from "../../../redux/feature/joinProjectSclice";

const Salary = () => {
   useEffect(() => {
      if ($(".select").length > 0) {
         $(".select").select2({
            minimumResultsForSearch: -1,
            width: "100%",
         });
      }
   });

   // --------------------------- handle --------------------------
   const [name, setName] = useState("");
   const [search, setSearch] = useState(0);
   const [render, setRender] = useState(0);
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      if (user.role !== UserRoleType.CLIENT) {
         dispatch(listUserSalary({ query: { name }, setLoading }));
      }

      if (user.role === UserRoleType.CLIENT) {
         dispatch(listUserSalary({ query: { userId: user?._id, name }, setLoading }));
      }
   }, [render, search]);

   const { salaries } = useSelector((state) => state.worker);

   const handleSelect = (record, salary, userId) => {
      if (!user._id) {
         toast.warn(`Please login !`);
         return;
      }

      dispatch(
         createOrUpdateContract({
            payload: {
               salary: salary._id,
               user: userId,
               project: record.projectId,
               creator: user._id,
            },
            toast,
            setLoading,
            setRender,
         })
      );
   };

   // -------------------------- updated premiums insurace -----------------------------

   const handleUpdatePremiumsInsurance = (item, e) => {
      if (!user._id) return toast.warn(`please login!`);
      dispatch(
         premiumsInsurance({
            id: item?.joinprojectId,
            payload: { premiums: e.target.checked },
            toast,
            setLoading,
            dispatch: (action) => dispatch(workerSclice.actions.updatePremiumInsurance(action)),
         })
      );
   };

   // -------------------------- column ----------------------------

   const columns = [
      {
         title: "Tên",
         dataIndex: "name",
         render: (text, record) => (
            <h2 className="table-avatar">
               <Link
                  to={`/app/payroll/export?payslip=${record?.payslip?._id}&project=${record?.projectId}&salary=${record?.salary?._id}&user=${record?._id}&contract=${record?.contract}`}
                  className="avatar"
               >
                  <img alt={record?.name} src={record?.avatar || avartarFAKE} />
               </Link>
               <Link
                  to={`/app/payroll/export?payslip=${record?.payslip?._id}&project=${record?.projectId}&salary=${record?.salary?._id}&user=${record?._id}&contract=${record?.contract}`}
               >
                  {text} <span>{record?.field}</span>
               </Link>
            </h2>
         ),
         sorter: (a, b) => a.name.length - b.name.length,
      },
      {
         title: "Đi lại",
         render: (text, record) =>
            record?.salary?.go !== undefined ? formatMoney(+record?.salary?.go) : "...",
         sorter: (a, b) => a?.salary?.go?.length - b?.salary?.go?.length,
      },

      {
         title: "Nhà ở",
         render: (text, record) =>
            record?.salary?.home !== undefined ? formatMoney(+record?.salary?.home) : "...",
      },

      {
         title: "Nặng / độc",
         render: (text, record) =>
            record?.salary?.toxic !== undefined ? formatMoney(+record?.salary?.toxic) : "...",
      },
      {
         title: "Ăn uống",
         render: (text, record) =>
            record?.salary?.eat !== undefined ? formatMoney(+record?.salary?.eat) : "...",
      },
      {
         title: "Chuyên cần",
         render: (text, record) =>
            record?.salary?.diligence !== undefined
               ? formatMoney(+record?.salary?.diligence)
               : "...",
      },
      {
         title: "Lương",
         render: (text, record) =>
            record?.salary?.salary !== undefined ? formatMoney(+record?.salary?.salary) : "...",
      },
      {
         title: "Đóng bảo hiểm",
         render: (text, record) => (
            <div className="text-center">
               <Checkbox
                  onChange={(e) => handleUpdatePremiumsInsurance(record, e)}
                  checked={record.premiumsInsurance}
               ></Checkbox>
            </div>
         ),
      },
      {
         title: "Dự án",
         dataIndex: "projectName",
         sorter: (a, b) => a.projectName.length - b.projectName.length,
      },
      {
         title: "Nhóm thụ hưởng",
         dataIndex: "salary.name",
         sorter: (a, b) => a?.salary?.name?.length - b?.salary?.name?.length,
         render: (text, record) => (
            <div className="dropdown ">
               <a
                  href=""
                  style={{ minWidth: "200px" }}
                  className={`btn btn-white dropdown-toggle fw-bold text-secondary`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
               >
                  {record?.salary?.beneficiary || "chọn nhóm thụ hưởng"}
               </a>
               <div className="dropdown-menu" style={{ minWidth: "200px" }}>
                  {record?.salarys?.map((item) => (
                     <button
                        key={item?._id}
                        className="dropdown-item"
                        onClick={() => handleSelect(record, item, record._id)}
                     >
                        {item?.beneficiary}
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
                     to={`/app/payroll/salary-view?payslip=${record?.payslip?._id}&project=${record?.projectId}&salary=${record?.salary?._id}`}
                  >
                     Chi tiết
                  </Link>
                  <Link
                     className="dropdown-item"
                     to={`/app/payroll/export?payslip=${record?.payslip?._id}&project=${record?.projectId}&salary=${record?.salary?._id}&user=${record?._id}&contract=${record?.contract}`}
                  >
                     Phiếu lương
                  </Link>
               </div>
            </div>
         ),
      },
   ];

   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Lương người lao động</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title">Lương người lao động</h3>
                  </div>
               </div>
            </div>
            {/* /Page Header */}
            {/* Search Filter */}
            <div className="row filter-row">
               <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                  <div className="form-group form-focus">
                     <input
                        type="text"
                        className="form-control floating"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                     <label className="focus-label">Tên</label>
                  </div>
               </div>
               <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                  <div className="form-group form-focus">
                     <button
                        className="btn btn-primary"
                        onClick={() => setSearch((prev) => prev + 1)}
                     >
                        Tìm kiếm
                     </button>
                  </div>
               </div>
            </div>
            {/* /Search Filter */}
            <div className="row">
               <div className="col-md-12">
                  <div className="table-responsive">
                     <Table
                        className="table-striped"
                        pagination={{
                           total: salaries?.length,
                           showSizeChanger: true,
                           onShowSizeChange: onShowSizeChange,
                           itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={salaries}
                        rowKey={(record) => record._id}
                        // onChange={this.handleTableChange}
                     />
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
      </div>
   );
};

export default Salary;

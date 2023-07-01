import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "antd/dist/antd.css";
import "../antdstyle.css";
import { useDispatch } from "react-redux";
import { useLoading } from "../../hook/useLoading";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/css/contract-details.css";

import AddContractRules from "../../_components/modelbox/AddContractRules";

const ContractDetails = () => {
   const [menu, setMenu] = useState(false);

   const toggleMobileMenu = () => {
      setMenu(!menu);
   };

   const [show, setShow] = useState(false);

   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);

   const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      console.log(data);
   };
   // const handleUpdate
   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Hợp đồng</title>
            <meta name="description" content="Login page" />
         </Helmet>

         {/* Page Content */}
         <div className="content container-fluid">
            {/* Search Filter */}
            <div className="row filter-row">
               <div className="col-sm-6 col-md-3" style={{ width: "100px" }}>
                  <div className="form-group form-focus select-focus">
                     <select className="form-control floating" style={{ background: "#ffcc00" }}>
                        <option value={""}>{""}</option>
                        <option>FCE01</option>
                     </select>
                     <label className="focus-label">Mã NLD</label>
                  </div>
               </div>
               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus select-focus">
                     <select className="form-control floating">
                        <option className="focus-label" value={""}>
                           chọn
                        </option>
                        <option>Nhà Máy Giấy Lee & Man Việt Nam</option>
                     </select>
                     <label className="focus-label">Dự án</label>
                  </div>
               </div>
               <div className="col-auto setting-contract">
                  <a href="#" className="contract-btn" onClick={handleShow}>
                     <i className="fa fa-cog" aria-hidden="true"></i>
                  </a>
               </div>
            </div>
            {/* Search Filter */}
            <div className="row">
               <div className="col-md-12">
                  <div className="card padding">
                     <div className="row align-items-center style-text">
                        {/* header cart */}
                        <div className="col">
                           <div className="header--left">
                              <span className="company">
                                 Công ty{" "}
                                 <input
                                    className="input-hidden width-350"
                                    type="text"
                                    defaultValue={"……….."}
                                 />
                              </span>
                              <p className="company">
                                 Số{" "}
                                 <input
                                    className="input-hidden width-350"
                                    type="text"
                                    defaultValue={".…/…."}
                                 />
                              </p>
                           </div>
                        </div>
                        <div className="col-auto float-end ml-auto">
                           <div className="header--right">
                              <span className="title-item">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span>
                              <p className="title-item text-center">Độc lập - Tự do - Hạnh phúc</p>
                           </div>
                        </div>
                        {/* header cart */}
                        <p className="contract-name text-center">
                           <input
                              className="input-hidden width-350 contract-name color3 text-center"
                              type="text"
                              defaultValue={"HỢP ĐỒNG LAO ĐỘNG"}
                           />
                        </p>
                        <p className="font-italic color3">- Căn cứ Bộ luật Lao động 2019</p>
                        <p className="color3">
                           Hôm nay, ngày{" "}
                           <input
                              className="input-hidden width-25"
                              type="text"
                              defaultValue={"..."}
                           />{" "}
                           tháng{" "}
                           <input
                              className="input-hidden width-25"
                              type="text"
                              defaultValue={"..."}
                           />
                           năm{" "}
                           <input
                              className="input-hidden width-50"
                              type="text"
                              defaultValue={"..."}
                           />
                           , tại{" "}
                           <input
                              className="input-hidden width-350"
                              type="text"
                              defaultValue={"………………"}
                           />
                           , chúng tôi gồm:
                        </p>
                        <p className="fw-bold color3">Người sử dụng lao động:</p>
                        <span>
                           Công ty:{" "}
                           <input
                              className="input-hidden width-350"
                              type="text"
                              defaultValue={
                                 "...................................................................................."
                              }
                           />
                        </span>
                        <span>
                           Địa chỉ:{" "}
                           <input
                              className="input-hidden width-350"
                              type="text"
                              defaultValue={
                                 "...................................................................................."
                              }
                           />
                        </span>
                        <span>
                           Điện thoại:{" "}
                           <input
                              className="input-hidden width-170"
                              type="text"
                              defaultValue={"……............................"}
                           />
                        </span>
                        <span>
                           Đại diện:{" "}
                           <input
                              className="input-hidden width-170"
                              type="text"
                              defaultValue={"……............................"}
                           />{" "}
                           Chức vụ:{" "}
                           <input
                              className="input-hidden width-170"
                              type="text"
                              defaultValue={"……............................"}
                           />{" "}
                           Quốc tịch: Việt Nam
                        </span>{" "}
                        <p></p>
                        <p className="fw-bold color3">Người lao động:</p>
                        <table className="table">
                           <tbody>
                              <tr>
                                 <td colSpan={2}>
                                    ÔNG / BÀ :{" "}
                                    <input
                                       className="input-hidden width-170"
                                       type="text"
                                       defaultValue={"……............................"}
                                    />{" "}
                                 </td>
                                 <td>
                                    Quốc tịch:{" "}
                                    <input
                                       className="input-hidden width-170"
                                       type="text"
                                       defaultValue={"……............................"}
                                    />{" "}
                                 </td>
                              </tr>
                              <tr>
                                 <td colSpan={2}>
                                    Ngày sinh:{" "}
                                    <input
                                       className="input-hidden width-170"
                                       type="text"
                                       defaultValue={"……............................"}
                                    />{" "}
                                 </td>
                                 <td>
                                    Tại :{" "}
                                    <input
                                       className="input-hidden width-350"
                                       type="text"
                                       defaultValue={"……............................"}
                                    />{" "}
                                 </td>
                              </tr>
                              <tr>
                                 <td colSpan={2}>
                                    Giới tính:{" "}
                                    <input
                                       className="input-hidden width-170"
                                       type="text"
                                       defaultValue={"……............................"}
                                    />
                                 </td>
                                 <td>
                                    Nghề nghiệp :{" "}
                                    <input
                                       className="input-hidden width-170"
                                       type="text"
                                       defaultValue={"……............................"}
                                    />
                                 </td>
                              </tr>
                              <tr>
                                 <td colSpan={3}>
                                    Điạ chỉ thường trú :{" "}
                                    <input
                                       className="input-hidden width-350"
                                       type="text"
                                       defaultValue={"……............................"}
                                    />
                                 </td>
                              </tr>
                              <tr>
                                 <td colSpan={3}>
                                    Điạ chỉ cư trú :{" "}
                                    <input
                                       className="input-hidden width-350"
                                       type="text"
                                       defaultValue={"……............................"}
                                    />
                                 </td>
                              </tr>
                              <tr>
                                 <td colSpan={2}>
                                    Số CMND/CCCD :{" "}
                                    <input
                                       className="input-hidden width-100"
                                       type="text"
                                       defaultValue={"……............................"}
                                    />
                                 </td>
                                 <td>
                                    Cấp ngày:{" "}
                                    <input
                                       className="input-hidden width-100"
                                       type="text"
                                       defaultValue={"……............................"}
                                    />
                                 </td>
                                 <td>
                                    Tại :{" "}
                                    <input
                                       className="input-hidden width-100"
                                       type="text"
                                       defaultValue={"……............................"}
                                    />
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                        <span className="font-italic">
                           Cùng thoả thuận ký kết hợp đồng lao động và cam kết làm đúng những điều
                           khoản sau đây:{" "}
                           <span className="text-danger contract-rules" onClick={handleShow}>
                              <i className="fa fa-pencil" aria-hidden="true"></i> ghi
                           </span>
                        </span>{" "}
                        {/* AddContractRules */}
                        <AddContractRules
                           show={show}
                           handleClose={handleClose}
                           handleEditorChange={handleEditorChange}
                        />
                        <p style={{ height: "20px" }}></p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
         {/* /Delete Department Modal */}
      </div>
   );
};

export default ContractDetails;

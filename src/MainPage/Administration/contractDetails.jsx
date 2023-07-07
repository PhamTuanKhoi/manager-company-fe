import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "antd/dist/antd.css";
import "../antdstyle.css";
import "../../assets/css/contract-details.css";

import AddContractRules from "../../_components/modelbox/AddContractRules";
import { dots } from "../../constant/index";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { findAllProject } from "../../redux/feature/projectSclice";
import { useLoading } from "../../hook/useLoading";
import { listWorkerByProjectId } from "../../redux/feature/workerSclice";
import { listClientByProjectId } from "../../redux/feature/clientSclice";
import { useParams } from "react-router-dom";
import { findByIdContractCategory } from "../../redux/feature/contractCategorySclice";

const ContractDetails = () => {
   const [menu, setMenu] = useState(false);
   const [projectId, setProjectId] = useState("");
   const [userId, setUserId] = useState("");
   const [worker, setWorker] = useState({
      name: dots,
      date: dots,
      address: dots,
      cccd: dots,
      field: dots,
   });
   const [client, setClient] = useState({
      name: dots,
      mobile: dots,
      address: dots,
      field: dots,
      company: dots,
      nameContract: dots,
   });

   const toggleMobileMenu = () => {
      setMenu(!menu);
   };

   const [show, setShow] = useState(false);
   const [rules, setRules] = useState("");

   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);
   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { id } = useParams();

   const handleEditorChange = (event, editor) => {
      const data = editor.getData();
      setRules(data);
   };

   const { projects } = useSelector((state) => state.project);
   const { workers } = useSelector((state) => state.worker);
   const state = useSelector((state) => state.client);
   const { contractCategory } = useSelector((state) => state.contractCategory);

   // fetch list projects
   useEffect(() => {
      setClient({
         name: dots,
         mobile: dots,
         address: dots,
         field: dots,
         company: dots,
      });
      dispatch(findAllProject({ setLoading }));
   }, []);

   // fetch worker by id project
   useEffect(() => {
      dispatch(listWorkerByProjectId({ query: { projectId }, setLoading }));
      if (projectId) {
         dispatch(listClientByProjectId({ projectId, setLoading }));
      }
   }, [projectId]);

   // fetch contract category
   useEffect(() => {
      dispatch(findByIdContractCategory({ id, setLoading }));
   }, [id]);

   useEffect(() => {
      if (state.client && projectId) setClient(state.client);
   }, [projectId]);

   useEffect(() => {
      const user = workers?.find((item) => item?._id === userId);
      if (user?._id) setWorker(user);
   }, [userId]);

   useEffect(() => {
      setClient({ ...client, nameContract: contractCategory?.name });
   }, [contractCategory]);

   const handleSelectProject = (e) => {
      setWorker({
         name: dots,
         date: dots,
         address: dots,
         cccd: dots,
         field: dots,
      });
      setProjectId(e);
   };

   const handleEraser = () => {
      setWorker({
         name: dots,
         date: dots,
         address: dots,
         cccd: dots,
         field: dots,
      });

      setClient({
         name: dots,
         mobile: dots,
         address: dots,
         field: dots,
         company: dots,
      });

      setProjectId("");
      setUserId("");
   };

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
                     <select
                        className="form-control floating"
                        style={{ background: "#ffcc00" }}
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                     >
                        <option className="focus-label" value={""}>
                           chọn
                        </option>
                        {workers?.map((i, index) => (
                           <option key={index} value={i._id}>
                              {i?.name}
                           </option>
                        ))}
                     </select>
                     <label className="focus-label">Mã NLD</label>
                  </div>
               </div>
               <div className="col-sm-6 col-md-3">
                  <div className="form-group form-focus select-focus">
                     <select
                        className="form-control floating"
                        value={projectId}
                        onChange={(e) => handleSelectProject(e.target.value)}
                     >
                        <option className="focus-label">chọn</option>
                        {projects?.map((i, index) => (
                           <option key={index} value={i._id}>
                              {i?.name}
                           </option>
                        ))}
                     </select>
                     <label className="focus-label">Dự án</label>
                  </div>
               </div>
               <div className="col-auto setting-contract">
                  <a
                     href="#"
                     className="contract-btn btn btn-outline-danger"
                     onClick={handleEraser}
                  >
                     <i
                        className="fa fa-eraser"
                        aria-hidden="true"
                        style={{ color: "#198754" }}
                     ></i>
                  </a>
               </div>
               {/* <div className="col-auto setting-contract">
                  <a href="#" className="contract-btn" onClick={handleShow}>
                     <i className="fa fa-cog" aria-hidden="true"></i>
                  </a>
               </div> */}
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
                                    value={client?.company}
                                    onChange={(e) =>
                                       setClient({ ...client, company: e.target.value })
                                    }
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
                              className="input-hidden text-uppercase contract-name color3 text-center width-350"
                              type="text"
                              value={client?.nameContract}
                              onChange={(e) =>
                                 setClient({ ...client, nameContract: e.target.value })
                              }
                           />
                        </p>
                        <p className="font-italic color3">
                           - Căn cứ{" "}
                           <input
                              className="input-hidden width-350"
                              type="text"
                              defaultValue={"………………"}
                           />
                        </p>
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
                              value={client?.company}
                              onChange={(e) => setClient({ ...client, company: e.target.value })}
                           />
                        </span>
                        <span>
                           Địa chỉ:{" "}
                           <input
                              className="input-hidden width-500"
                              type="text"
                              value={client?.address}
                              onChange={(e) => setClient({ ...client, address: e.target.value })}
                           />
                        </span>
                        <span>
                           Điện thoại:{" "}
                           <input
                              className="input-hidden width-170"
                              type="text"
                              value={client?.mobile}
                              onChange={(e) => setClient({ ...client, mobile: e.target.value })}
                           />
                        </span>
                        <span>
                           Đại diện:{" "}
                           <input
                              className="input-hidden width-170"
                              type="text"
                              value={client?.name}
                              onChange={(e) => setClient({ ...client, name: e.target.value })}
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
                                       value={worker?.name}
                                       onChange={(e) =>
                                          setWorker({ ...worker, name: e.target.value })
                                       }
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
                                       value={
                                          worker?.date !== dots
                                             ? moment(worker?.date).format("DD/mm/yyyy")
                                             : dots
                                       }
                                       onChange={(e) =>
                                          setWorker({ ...worker, date: e.target.value })
                                       }
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
                                       onChange={(e) =>
                                          setWorker({ ...worker, field: e.target.value })
                                       }
                                       value={worker?.field}
                                    />
                                 </td>
                              </tr>
                              <tr>
                                 <td colSpan={3}>
                                    Điạ chỉ thường trú :{" "}
                                    <input
                                       className="input-hidden width-500"
                                       type="text"
                                       onChange={(e) =>
                                          setWorker({ ...worker, address: e.target.value })
                                       }
                                       value={worker?.address}
                                    />
                                 </td>
                              </tr>
                              <tr>
                                 <td colSpan={3}>
                                    Điạ chỉ cư trú :{" "}
                                    <input
                                       className="input-hidden width-500"
                                       type="text"
                                       defaultValue={"……............................"}
                                    />
                                 </td>
                              </tr>
                              <tr>
                                 <td>
                                    Số CMND/CCCD :{" "}
                                    <input
                                       className="input-hidden width-170"
                                       type="text"
                                       onChange={(e) =>
                                          setWorker({ ...worker, cccd: e.target.value })
                                       }
                                       value={worker?.cccd}
                                    />
                                 </td>
                                 <td>
                                    Cấp ngày:{" "}
                                    <input
                                       className="input-hidden width-100"
                                       type="text"
                                       defaultValue={"……..........."}
                                    />
                                 </td>
                                 <td colSpan={2}>
                                    Tại :{" "}
                                    <input
                                       className="input-hidden width-350"
                                       type="text"
                                       defaultValue={"……..........."}
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
                        <div className="mt-3" dangerouslySetInnerHTML={{ __html: rules }}></div>
                        <div className="sign-contract">
                           <div className="sign-name">
                              <span className="sign-title">NGƯỜI LAO ĐỘNG</span>
                              <span className="color-333333">(Ký, ghi rõ họ tên)</span>
                           </div>
                           <div className="sign-name">
                              <span className="sign-title">NGƯỜI SỬ DỤNG LAO ĐỘNG</span>
                              <span className="color-333333">(Ký, ghi rõ họ tên)</span>
                           </div>
                        </div>
                        {/* AddContractRules */}
                        <AddContractRules
                           show={show}
                           handleClose={handleClose}
                           handleEditorChange={handleEditorChange}
                           setRules={setRules}
                           rules={rules}
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

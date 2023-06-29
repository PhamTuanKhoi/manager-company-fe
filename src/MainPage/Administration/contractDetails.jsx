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
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ContractDetails = () => {
   const [menu, setMenu] = useState(false);

   const toggleMobileMenu = () => {
      setMenu(!menu);
   };

   const list = [
      {
         _id: 0,
         name: "HỢP ĐỒNG VÔ THỜI HẠN",
         start: "22/01/2023",
         end: "22/09/2023",
         project: "Var dung tau",
      },
      {
         _id: 1,
         name: "HỢP ĐỒNG THỬ VIỆC",
         start: "22/01/2023",
         end: "22/09/2023",
         project: "Coofides",
      },
      {
         _id: 2,
         name: "HỢP ĐỒNG CÓ THỜI HẠN",
         start: "22/01/2023",
         end: "22/09/2023",
         project: "Leeandman",
      },
   ];

   const columns = [
      {
         title: "#",
         render: (text, record, i) => i + 1,
      },
      {
         title: "Loại hợp đồng",
         dataIndex: "name",
         render: (text, record) => (
            <Link to={`/app/administrator/contract-details/${record?._id}`}>{text}</Link>
         ),
         sorter: (a, b) => a.name.length - b.name.length,
      },
      {
         title: "Ngày ký",
         dataIndex: "start",
         sorter: (a, b) => a.start.length - b.start.length,
      },
      {
         title: "Ngày kết thúc",
         dataIndex: "end",
         sorter: (a, b) => a.end.length - b.end.length,
      },
      {
         title: "Dự án",
         dataIndex: "project",
         sorter: (a, b) => a.project.length - b.project.length,
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

   const handleClose = () => {
      setShow(false);
      empty();
   };
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
      if (validatetion())
         dispatch(createDepartment({ payload: { name }, setLoading, toast, empty, handleClose }));
   };

   const handleUpdate = () => {
      if (item._id)
         if (validatetion())
            dispatch(
               updateDepartment({
                  id: item?._id,
                  payload: { name },
                  setLoading,
                  toast,
                  handleClose,
               })
            );
   };

   const handleDelete = () => {
      if (item?._id)
         dispatch(
            removeDepartment({ id: item?._id, setLoading, toast, close: () => setShowDlt(false) })
         );
   };

   const validatetion = () => {
      if (!name) {
         toast.warn("vui lòng nhập tên phòng ban!");
         return false;
      }

      if (name && name.length < 4) {
         toast.warn("tên phòng ban phải lớn hơn 3 kí tự!");
         return false;
      }

      return true;
   };

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
            {/* Page Header */}
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
            </div>
            {/* Search Filter */}
            {/* /Page Header */}
            <div className="row">
               <div className="col-md-12">
                  <div className="card padding">
                     <div className="row align-items-center style-text">
                        {/* header cart */}
                        <div className="col">
                           <div className="header--left">
                              <span className="company">Công ty ………..</span>
                              <p className="company">Số .…/….</p>
                           </div>
                        </div>
                        <div className="col-auto float-end ml-auto">
                           <div className="header--right">
                              <span className="title-item">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span>
                              <p className="title-item text-center">Độc lập - Tự do - Hạnh phúc</p>
                           </div>
                        </div>
                        {/* header cart */}
                        <p className="contract-name color3 text-center">HỢP ĐỒNG LAO ĐỘNG</p>
                        <p className="font-italic color3">- Căn cứ Bộ luật Lao động 2019</p>
                        <p className="color3">
                           Hôm nay, ngày... tháng... năm 2021, tại Công ty ………………, chúng tôi gồm:
                        </p>
                        <p className="fw-bold color3">Người sử dụng lao động:</p>
                        <span>
                           Công ty:
                           .....................................................................................
                        </span>
                        <span>
                           Địa chỉ:
                           .......................................................................................
                        </span>
                        <span>Điện thoại:</span>
                        <span>
                           Đại diện: ……..................... Chức vụ: ………….................... Quốc
                           tịch: Việt Nam
                        </span>{" "}
                        <p></p>
                        <p className="fw-bold color3">Người lao động:</p>
                        <table className="table">
                           <tbody>
                              <tr>
                                 <td>ÔNG / BÀ :</td>
                                 <td>Quốc tịch:</td>
                              </tr>
                              <tr>
                                 <td>Ngày sinh:</td>
                                 <td>Tại :</td>
                                 <td>Nghề nghiệp :</td>
                              </tr>
                              <tr>
                                 <td>Nghề nghiệp :</td>
                                 <td>Giới tính:</td>
                              </tr>
                              <tr>
                                 <td>Điạ chỉ thường trú :</td>
                                 <td>Điạ chỉ cư trú :</td>
                              </tr>
                              <tr>
                                 <td>Số CMND/CCCD :</td>
                                 <td>Cấp ngày:</td>
                                 <td>Tại :</td>
                              </tr>
                           </tbody>
                        </table>
                        <span className="font-italic">
                           Cùng thoả thuận ký kết hợp đồng lao động và cam kết làm đúng những điều
                           khoản sau đây: <span className="text-danger">setting</span>
                        </span>
                        {/* <CKEditor
                           editor={ClassicEditor}
                           data="<p>Hello CKEditor!</p>"
                           onChange={handleEditorChange}
                        /> */}
                     </div>
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

export default ContractDetails;

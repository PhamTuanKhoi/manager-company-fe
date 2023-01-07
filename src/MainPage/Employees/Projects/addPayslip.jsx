/**
 * Signin Firebase
 */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../../initialpage/Sidebar/header";
import Sidebar from "../../../initialpage/Sidebar/sidebar";
import { createPayslip } from "../../../redux/feature/payslipSclice.js";

const AddPayslip = () => {
   const [menu, setMenu] = useState(false);
   const [paysplip, setPaysplip] = useState({
      name: "",
      //
      leave: "",
      reward: "",
      rice: 0,
      bonus: "",
      overtime: "",
      sunday: "",
      holiday: "",
      service: "",
      //
      go: "",
      home: "",
      toxic: "",
      diligence: "",
      effectively: "",
      eat: "",
      //
      medican: "",
      society: "",
      unemployment: "",
      union: "",
      accident: "",
      health: "",
   });

   const dispatch = useDispatch();
   const history = useHistory();
   const { user } = useSelector((state) => state.auth);

   const { id } = useParams();

   console.log(id);

   const toggleMobileMenu = () => {
      setMenu(!menu);
   };

   const handleSave = async () => {
      if (user._id) {
         dispatch(createPayslip({ payload: { ...paysplip, creator: user._id }, toast, history }));
      }
   };

   return (
      <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
         <Header onMenuClick={(value) => toggleMobileMenu()} />
         <Sidebar />
         <div className="page-wrapper">
            <Helmet>
               <title>Dashboard - HRMS Admin Template</title>
               <meta name="description" content="Dashboard" />
            </Helmet>
            {/* Page Content */}

            <div className="content container-fluid">
               <div className="row">
                  <div className="col-md-12">
                     <div className="card">
                        <div className="card-body">
                           {" "}
                           <div className="back" onClick={() => history.goBack()}>
                              {"<Back"}
                           </div>
                           <h2 className="payslip-title">Thêm phiếu lương</h2>
                           <div>
                              <div className="row">
                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Tên phiếu lương
                                          <span className="text-danger">*</span>
                                       </label>
                                       <input
                                          className="form-control"
                                          type="text"
                                          onChange={(e) =>
                                             setPaysplip({
                                                ...paysplip,
                                                name: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>
                              </div>
                              <h3>Phúc lợi</h3>
                              <div className="row">
                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Phép năm ( tháng / năm)
                                          <span className="text-danger">*</span>
                                       </label>
                                       <input
                                          className="form-control"
                                          type="number"
                                          onChange={(e) =>
                                             setPaysplip({
                                                ...paysplip,
                                                leave: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Thưởng Lễ/Tết <span className="text-danger">*</span>
                                       </label>

                                       <input
                                          prefix="￥"
                                          className="form-control"
                                          type="number"
                                          onChange={(e) =>
                                             setPaysplip({
                                                ...paysplip,
                                                reward: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>

                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Cơm Ca <span className="text-danger">*</span>
                                       </label>{" "}
                                       <br />
                                       <input
                                          className="form-control"
                                          type="number"
                                          onChange={(e) =>
                                             setPaysplip({
                                                ...paysplip,
                                                rice: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Lương Tháng 13 <span className="text-danger">*</span>
                                       </label>
                                       <input
                                          className="form-control"
                                          type="number"
                                          onChange={(e) =>
                                             setPaysplip({
                                                ...paysplip,
                                                bonus: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Làm Ngoài Giờ <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   overtime: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Làm Chủ Nhật <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   sunday: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Làm Lễ Tết <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   holiday: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Phí Dịch Vụ <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   service: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <h3>Phụ cấp</h3>
                              <div className="row">
                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Phụ Cấp Đi Lại
                                          <span className="text-danger">*</span>
                                       </label>
                                       <input
                                          className="form-control"
                                          type="number"
                                          onChange={(e) =>
                                             setPaysplip({
                                                ...paysplip,
                                                go: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Phụ Cấp Nhà Ở <span className="text-danger">*</span>
                                       </label>
                                       <input
                                          className="form-control"
                                          type="number"
                                          onChange={(e) =>
                                             setPaysplip({
                                                ...paysplip,
                                                home: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>

                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Phụ cấp nặng nhọc/ độc hại{" "}
                                          <span className="text-danger">*</span>
                                       </label>{" "}
                                       <br />
                                       <input
                                          className="form-control"
                                          type="number"
                                          onChange={(e) =>
                                             setPaysplip({
                                                ...paysplip,
                                                toxic: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Chuyên Cần <span className="text-danger">*</span>
                                       </label>
                                       <input
                                          className="form-control"
                                          type="number"
                                          onChange={(e) =>
                                             setPaysplip({
                                                ...paysplip,
                                                diligence: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Hiệu quả công việc <span className="text-danger">*</span>
                                       </label>
                                       <input
                                          className="form-control"
                                          type="number"
                                          onChange={(e) =>
                                             setPaysplip({
                                                ...paysplip,
                                                effectively: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Phụ cấp ăn uống<span className="text-danger">*</span>
                                       </label>
                                       <input
                                          className="form-control"
                                          type="number"
                                          onChange={(e) =>
                                             setPaysplip({
                                                ...paysplip,
                                                eat: e.target.value,
                                             })
                                          }
                                       />
                                    </div>
                                 </div>
                              </div>
                              <h3>Bảo hiểm</h3>
                              <div className="row">
                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Bảo Hiểm Y Tế
                                          <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   medican: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Bảo Hiểm Xã Hội <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   society: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-md-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Bảo Hiểm Thất Nghiệp
                                          <span className="text-danger">*</span>
                                       </label>{" "}
                                       <br />
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   unemployment: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Công Đoàn <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   union: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Bảo Hiểm Tai Nạn <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   accident: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="col-sm-6">
                                    <div className="form-group">
                                       <label className="col-form-label">
                                          Khám Sức Khỏe Định Kỳ{" "}
                                          <span className="text-danger">*</span>
                                       </label>
                                       <div className="input-box">
                                          <span className="prefix">%</span>
                                          <input
                                             prefix="￥"
                                             className="form-control tel"
                                             type="number"
                                             onChange={(e) =>
                                                setPaysplip({
                                                   ...paysplip,
                                                   health: e.target.value,
                                                })
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="submit-section">
                                 <button
                                    className="btn btn-primary submit-btn"
                                    onClick={handleSave}
                                 >
                                    Lưu
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* /Page Content */}
         </div>
      </div>
   );
};

export default AddPayslip;

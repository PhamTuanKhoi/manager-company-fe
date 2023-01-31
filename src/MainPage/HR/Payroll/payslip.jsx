import React, { useMemo } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { Applogo } from "../../../Entryfile/imagepath";
import payslipSclice from "../../../redux/feature/payslipSclice";

const Payslip = () => {
   const { id } = useParams();
   const dispatch = useDispatch();

   const { payslip } = useSelector((state) => state.payslip);
   const history = useHistory();

   // get query
   // const { search } = useLocation();
   // const query = useMemo(() => new URLSearchParams(search), [search]);
   // const editId = query.get("edit");

   useEffect(() => {
      dispatch(payslipSclice.actions.payslipDetail(id));
   }, []);

   return (
      <div className="page-wrapper">
         <Helmet>
            <title>Payslip - HRMS Admin Template</title>
            <meta name="description" content="Login page" />
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
               <div className="row align-items-center">
                  <div className="col">
                     <h3 className="page-title"> Phiếu lương</h3>
                  </div>
                  <div className="col-auto float-end ml-auto">
                     <div className="btn-group btn-group-sm">
                        <button className="btn btn-white">Cập nhật phiếu lương</button>
                        <button className="btn btn-white">CSV</button>
                        <button className="btn btn-white">PDF</button>
                        <button className="btn btn-white">
                           <i className="fa fa-print fa-lg" /> Print
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            {/* /Page Header */}
            <div className="row">
               <div className="col-md-12">
                  <div className="card">
                     <div className="card-body">
                        <div onClick={() => history.goBack()} className="back">
                           {"<Back"}
                        </div>
                        <h4 className="payslip-title">{payslip?.name}</h4>

                        <div className="row">
                           <div className="col-sm-12">
                              <div>
                                 <h4 className="m-b-10">
                                    <strong>Phúc lợi</strong>
                                 </h4>
                                 <table className="table table-bordered">
                                    <tbody>
                                       <tr>
                                          <td>
                                             <span>Nghỉ phép</span>{" "}
                                             <span className="float-end">
                                                {payslip?.leave} ngày/năm
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Thưởng lể/tết</span>{" "}
                                             <span className="float-end">
                                                {payslip?.reward} VND
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Cơm ca</span>{" "}
                                             <span className="float-end">{payslip?.rice} VND</span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Lương tháng 13</span>{" "}
                                             <span className="float-end">
                                                {payslip?.bonus} tháng/năm
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Làm ngoài giờ</span>{" "}
                                             <span className="float-end">{payslip?.overtime}%</span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Làm chủ nhật</span>{" "}
                                             <span className="float-end">{payslip?.sunday}%</span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Làm lể tết</span>{" "}
                                             <span className="float-end">{payslip?.holiday}%</span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Phí dịch vụ</span>{" "}
                                             <span className="float-end">{payslip?.service}%</span>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                           <div className="col-sm-6">
                              <div>
                                 <h4 className="m-b-10">
                                    <strong>Phụ cấp</strong>
                                 </h4>
                                 <table className="table table-bordered">
                                    <tbody>
                                       <tr>
                                          <td>
                                             <span>Phụ cấp đi lại</span>{" "}
                                             <span className="float-end">{payslip?.go} VND</span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Phụ cấp nhà ở</span>{" "}
                                             <span className="float-end">{payslip?.home} VND</span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Phụ cấp nặng nhọc/ độc hại</span>{" "}
                                             <span className="float-end">{payslip?.toxic} VND</span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Chuyên cần</span>{" "}
                                             <span className="float-end">
                                                {payslip?.diligence} VND
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Hiệu quả công việc</span>{" "}
                                             <span className="float-end">
                                                {payslip?.effectively} VND
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Phụ cấp ăn uống</span>{" "}
                                             <span className="float-end">{payslip?.eat} VND</span>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </div>

                           <div className="col-sm-6">
                              <div>
                                 <h4 className="m-b-10">
                                    <strong>Bảo hiểm</strong>
                                 </h4>
                                 <table className="table table-bordered">
                                    <tbody>
                                       <tr>
                                          <td>
                                             <span>Bảo Hiểm Y Tế</span>{" "}
                                             <span className="float-end">{payslip?.medican}%</span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Bảo Hiểm Xã Hội</span>{" "}
                                             <span className="float-end">{payslip?.society}%</span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Bảo Hiểm Thất Nghiệp</span>{" "}
                                             <span className="float-end">
                                                {payslip?.unemployment}%
                                             </span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Công Đoàn</span>{" "}
                                             <span className="float-end">{payslip?.union}%</span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Bảo Hiểm Tai Nạn</span>{" "}
                                             <span className="float-end">{payslip?.accident}%</span>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td>
                                             <span>Khám Sức Khỏe Định Kỳ</span>{" "}
                                             <span className="float-end">{payslip?.health}%</span>
                                          </td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* /Page Content */}
      </div>
   );
};

export default Payslip;
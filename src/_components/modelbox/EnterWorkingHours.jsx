import React, { memo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { formatHourToSecond, overtimeOpition, overtimeType, timeCustom } from "../../constant";
import { useLoading } from "../../hook/useLoading";
import { manually } from "../../redux/feature/attendanceSclice";
import { Radio } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function EnterWorkingHours({ show, onHide, checked }) {
   const [state, setState] = useState({
      date: "",
      workHour: "",
      timein: "",
      timeout: "",
      overtime: "",
   });

   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { id } = useParams();
   const { user } = useSelector((state) => state.auth);

   const handleSave = () => {
      if (!user?._id) return toast.error("please login!!");
      if (validate()) {
         dispatch(
            manually({
               payload: {
                  ...state,
                  datetime: new Date(state.date).getTime(),
                  year: new Date(state.date).getFullYear(),
                  month: new Date(state.date).getMonth() + 1,
                  date: new Date(state.date).getDate(),
                  user: JSON.stringify(checked),
                  project: id,
                  creator: user._id,
               },
               onHide,
               toast,
               setLoading,
            })
         );
      }
   };

   // -------------------------------- radio ---------------------------------
   // const [value, setValue] = useState(1);
   const onChange = (e) => {
      console.log("radio checked", e.target.value);
      setState({ ...state, overtime: e.target.value });
   };

   const handleChangeWorkHour = (e) => {
      setState({
         ...state,
         workHour: e.target.value.slice(0, 2) * 3600 + e.target.value.slice(3, 5) * 60,
      });
   };

   const handleChangeTimeIn = (e) => {
      setState({
         ...state,
         timein: e.target.value.slice(0, 2) * 3600 + e.target.value.slice(3, 5) * 60,
      });
   };

   const handleChangeTimeOut = (e) => {
      setState({
         ...state,
         timeout: e.target.value.slice(0, 2) * 3600 + e.target.value.slice(3, 5) * 60,
      });
   };

   const validate = () => {
      if (!state.date) {
         toast.warn(`Vui lòng chọn ngày!`);
         return false;
      }

      if (!state.workHour) {
         toast.warn("Vui lòng chọn thời gian làm việc!");
         return false;
      }

      if (!state.timein) {
         toast.warn("Vui lòng chọn giờ vào!");
         return false;
      }

      if (!state.timeout) {
         toast.warn("Vui lòng chọn giờ ra!");
         return false;
      }

      return true;
   };
   return (
      <Modal show={show} onHide={onHide}>
         <div className="modal-header">
            <h5 className="modal-title">Cài đặt ca làm việc</h5>
            <button type="button" className="close-x" onClick={onHide}>
               <span aria-hidden="true">×</span>
            </button>
         </div>
         <Modal.Body style={{ height: "580px" }}>
            <div className="body-dialog">
               <span>Ngày</span>
               <div className="input-group m-b-30">
                  <input
                     className="form-control search-input"
                     type="date"
                     value={state.date}
                     onChange={(e) => setState({ ...state, date: e.target.value })}
                  />
               </div>
               <span>Thời gian làm: /giờ</span>
               <div className="input-group m-b-30">
                  <input
                     className="form-control search-input"
                     type="time"
                     value={timeCustom(state.workHour)}
                     onChange={handleChangeWorkHour}
                  />
               </div>
               <span>Bắt đầu từ</span>
               <div className="input-group m-b-30">
                  <input
                     className="form-control search-input"
                     type="time"
                     value={timeCustom(state.timein)}
                     onChange={handleChangeTimeIn}
                  />
               </div>
               <span>Đến</span>
               <div className="input-group m-b-30">
                  <input
                     className="form-control search-input"
                     type="time"
                     value={timeCustom(state.timeout)}
                     onChange={handleChangeTimeOut}
                  />
               </div>
               <span>Kiểu tăng ca:</span> <br />
               <Radio.Group
                  value={state.overtime}
                  onChange={(e) => setState({ ...state, overtime: e.target.value })}
               >
                  <Radio value={""}>Ca chính thức</Radio>
               </Radio.Group>
               <Radio.Group onChange={onChange} value={state.overtime}>
                  {overtimeOpition?.map((item) => (
                     <Radio key={item?.value} value={item?.value}>
                        {item?.label}
                     </Radio>
                  ))}
               </Radio.Group>
               <div className="input-group m-b-30"></div>
               <span>Số lượng: {checked.length} người.</span>
               <div className="button-dialog">
                  <button className="primary" onClick={handleSave}>
                     Lưu
                  </button>
               </div>
            </div>
         </Modal.Body>
      </Modal>
   );
}

export default memo(EnterWorkingHours);

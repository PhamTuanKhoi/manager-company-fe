import React, { memo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { formatHourToSecond, overtimeOpition, overtimeType } from "../../constant";
import { useLoading } from "../../hook/useLoading";
import { createOvertime } from "../../redux/feature/overtimeSclice";
import { Radio } from "antd";

function EnterWorkingHours({ show, onHide, checked, projectId }) {
   const [state, setState] = useState({
      date: "",
      start: "",
      end: "",
      overtime: "",
   });
   const handleSave = () => {
      console.log(state);
      toast.error("unauthorized");
   };

   // -------------------------------- radio ---------------------------------
   // const [value, setValue] = useState(1);
   const onChange = (e) => {
      console.log("radio checked", e.target.value);
      setState({ ...state, overtime: e.target.value });
   };
   return (
      <Modal show={show} onHide={onHide}>
         <div className="modal-header">
            <h5 className="modal-title">Cài đặt ca làm việc</h5>
            <button type="button" className="close-x" onClick={onHide}>
               <span aria-hidden="true">×</span>
            </button>
         </div>
         <Modal.Body>
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
               <span>Bắt đầu từ</span>
               <div className="input-group m-b-30">
                  <input
                     className="form-control search-input"
                     type="time"
                     value={state.start}
                     onChange={(e) => setState({ ...state, start: e.target.value })}
                  />
               </div>
               <span>Đến</span>
               <div className="input-group m-b-30">
                  <input
                     className="form-control search-input"
                     type="time"
                     value={state.end}
                     onChange={(e) => setState({ ...state, end: e.target.value })}
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

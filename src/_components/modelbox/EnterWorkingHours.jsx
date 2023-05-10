import React, { memo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { formatHourToSecond, overtimeOpition, overtimeType } from "../../constant";
import { useLoading } from "../../hook/useLoading";
import { createOvertime } from "../../redux/feature/overtimeSclice";
import { Radio } from "antd";

function EnterWorkingHours({ show, onHide, checked, projectId }) {
   const handleSave = () => {
      alert("send to server");
   };

   // -------------------------------- radio ---------------------------------
   // const [value, setValue] = useState(1);
   const onChange = (e) => {
      console.log("radio checked", e.target.value);
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
               <span>Ngày tăng ca</span>
               <div className="input-group m-b-30">
                  <input className="form-control search-input" type="date" />
               </div>

               <span>Kiểu tăng ca:</span>
               <br />
               <Radio.Group onChange={onChange} value={""}>
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

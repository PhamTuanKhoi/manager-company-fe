import React, { memo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { formatHourToSecond } from "../../constant";
import { useLoading } from "../../hook/useLoading";
import { createOvertime } from "../../redux/feature/overtimeSclice";

function AddOvertime({ show, onHide, checked }) {
   const [overtime, setOvertime] = useState({
      date: "",
      timein: "",
      timeout: "",
   });

   const { id } = useParams();
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   const handleSave = () => {
      dispatch(
         createOvertime({
            payload: {
               date: new Date(overtime.date).getTime(),
               timein: formatHourToSecond(overtime.timein),
               timeout: formatHourToSecond(overtime.timeout),
               userIds: checked,
               project: id,
            },
            setLoading,
            onHide,
            toast,
         })
      );
   };

   return (
      <Modal show={show} onHide={onHide}>
         <div className="modal-header">
            <h5 className="modal-title">Cài đặt giờ tăng ca</h5>
            <button type="button" className="close-x">
               <span aria-hidden="true" onClick={onHide}>
                  ×
               </span>
            </button>
         </div>
         <Modal.Body>
            <div className="body-dialog">
               <span>Ngày tăng ca</span>
               <div className="input-group m-b-30">
                  <input
                     className="form-control search-input"
                     type="date"
                     value={overtime.date}
                     onChange={(e) => setOvertime({ ...overtime, date: e.target.value })}
                  />
               </div>

               <span>Giờ vào</span>
               <div className="input-group m-b-30">
                  <input
                     className="form-control search-input"
                     type="time"
                     value={overtime.timein}
                     onChange={(e) => setOvertime({ ...overtime, timein: e.target.value })}
                  />
               </div>

               <span>Giờ ra</span>
               <div className="input-group m-b-30">
                  <input
                     className="form-control search-input"
                     type="time"
                     value={overtime.timeout}
                     onChange={(e) => setOvertime({ ...overtime, timeout: e.target.value })}
                  />
               </div>

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

export default memo(AddOvertime);

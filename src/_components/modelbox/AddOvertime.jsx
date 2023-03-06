import React, { memo } from "react";
import { Modal } from "react-bootstrap";

function AddOvertime({ show, onHide, checked }) {
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
                  <input className="form-control search-input" type="date" />
               </div>

               <span>Giờ vào</span>
               <div className="input-group m-b-30">
                  <input className="form-control search-input" type="time" />
               </div>

               <span>Giờ ra</span>
               <div className="input-group m-b-30">
                  <input className="form-control search-input" type="time" />
               </div>

               <span>Số lượng: {checked.length} người.</span>

               <div className="button-dialog">
                  <button className="primary">Lưu</button>
               </div>
            </div>
         </Modal.Body>
      </Modal>
   );
}

export default memo(AddOvertime);

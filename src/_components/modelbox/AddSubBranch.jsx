import React from "react";
import Modal from "react-bootstrap/Modal";

const AddSubBranch = ({ show, onHide }) => {
   return (
      <Modal show={show} onHide={onHide}>
         <div className="modal-header">
            <h5 className="modal-title">Thêm nhánh phụ</h5>
            <button type="button" className="close-x">
               <span aria-hidden="true" onClick={onHide}>
                  ×
               </span>
            </button>
         </div>
         <Modal.Body>
            <span>Tên nhánh</span>
            <div className="input-group m-b-30">
               <input
                  placeholder="Nhập tên nhánh"
                  className="form-control search-input"
                  type="text"
               />
            </div>

            <div className="form-group">
               <label className="col-form-label">
                  Nhóm trưởng <span className="text-danger">*</span>
               </label>
               <select className="form-control">
                  <option>Chọn nhóm trưởng</option>
               </select>
            </div>
            <div className="button-dialog">
               <button className="primary">Lưu</button>
            </div>
         </Modal.Body>
      </Modal>
   );
};

export default AddSubBranch;

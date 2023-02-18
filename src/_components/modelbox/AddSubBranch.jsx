import React from "react";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { listHeador } from "../../redux/feature/workerSclice";
import { useLoading } from "../../hook/useLoading";
import { useSelector } from "react-redux";

const AddSubBranch = ({ show, onHide }) => {
   const dispatch = useDispatch();

   const { setLoading } = useLoading();

   useEffect(() => {
      dispatch(listHeador({ setLoading }));
   }, []);

   const { headors } = useSelector((state) => state.worker);

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
                  {headors?.map((item) => (
                     <option key={item?._id} value={item?._id}>
                        {item?.name}
                     </option>
                  ))}
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

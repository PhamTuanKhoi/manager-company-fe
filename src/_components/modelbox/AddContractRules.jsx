import React from "react";
import { Modal } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddContractRules = ({ show, handleClose, handleEditorChange, setRules, rules }) => {
   const close = () => {
      handleClose();
      setRules("");
   };
   return (
      <Modal
         show={show}
         // onHide={handleClosed}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <div className="modal-content">
            <div className="modal-header">
               <h5 className="modal-title">ĐIỀU KHOẢN HỢP ĐỒNG</h5>
               <button type="button" className="close-x" onClick={handleClose}>
                  <span aria-hidden="true">×</span>
               </button>
            </div>
            <div className="modal-body">
               <div>
                  <div className="row">
                     <div className="col-md-12">
                        <CKEditor
                           className="ckeditor-size"
                           editor={ClassicEditor}
                           data={rules}
                           onChange={handleEditorChange}
                        />
                     </div>
                  </div>
                  <div className="submit-section">
                     <button
                        className="btn btn-danger submit-btn me-1"
                        onClick={() => setRules("")}
                     >
                        Xóa sạch
                     </button>
                     <button className="btn btn-secondary submit-btn ms-1" onClick={handleClose}>
                        Lưu
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </Modal>
   );
};

export default AddContractRules;

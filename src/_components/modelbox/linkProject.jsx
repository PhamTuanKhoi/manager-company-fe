import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

const LinkProject = ({ show, onHide }) => {
   const { payslips } = useSelector((state) => state.payslip);

   return (
      <Modal
         aria-labelledby="contained-modal-title-vcenter"
         centered
         show={show}
         onHide={onHide}
         className="modal custom-modal fade"
         role="dialog"
      >
         <div className="modal-content">
            <div className="modal-header">
               <h5 className="modal-title">Assign Leader to this project</h5>
               <button type="button" className="close">
                  <span aria-hidden="true" onClick={onHide}>
                     ×
                  </span>
               </button>
            </div>
            <div className="modal-body">
               <div className="input-group m-b-30">
                  <input
                     placeholder="Search to add a leader"
                     className="form-control search-input"
                     type="text"
                  />
                  <span className="input-group-append">
                     <button className="btn btn-primary w-100">Search</button>
                  </span>
               </div>
               <div>
                  <ul className="chat-user-list">
                     {payslips.map((item) => (
                        <li key={item?._id}>
                           <a href="#">
                              <div className="media">
                                 <div className="media-body align-self-center text-nowrap">
                                    <div className="user-name">{item?.name}</div>
                                 </div>
                                 <div>import</div>
                              </div>
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
               </div>
            </div>
         </div>
      </Modal>
   );
};

export default LinkProject;

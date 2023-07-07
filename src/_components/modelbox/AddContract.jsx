import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLoading } from "../../hook/useLoading";
import {
   createContractCategory,
   updateContractCategory,
} from "../../redux/feature/contractCategorySclice";
import { findAllProject } from "../../redux/feature/projectSclice";

const AddContract = ({ show, handleClose, item, setItem }) => {
   const [contract, setContract] = useState({
      name: "",
      startDate: "",
      endDate: "",
      project: "",
   });

   const [projectItem, setProjectItem] = useState({});

   const dispatch = useDispatch();
   const { setLoading } = useLoading();
   const { projects } = useSelector((state) => state.project);

   useEffect(() => {
      dispatch(findAllProject({ setLoading }));
   }, []);

   const handleSave = async () => {
      await validatetion();

      let payload = { ...contract, project: contract.project };

      if (contract.startDate)
         payload = { ...payload, startDate: new Date(contract.startDate).getTime() };

      if (contract.endDate) payload = { ...payload, endDate: new Date(contract.endDate).getTime() };

      dispatch(createContractCategory({ payload, toast, setLoading }));
   };

   const handleUpdate = async () => {
      await validatetion();

      if (!item?._id) {
         toast.error("id -> project not found");
         return;
      }

      let payload = {
         ...contract,
         project: contract?.project,
         projectItem: projects?.find((i) => i._id === contract?.project),
      };

      if (contract.startDate)
         payload = { ...payload, startDate: new Date(contract.startDate).getTime() };

      if (contract.endDate) payload = { ...payload, endDate: new Date(contract.endDate).getTime() };

      dispatch(updateContractCategory({ id: item?._id, payload, toast, setLoading }));
   };

   const validatetion = async () => {
      if (!contract.name) {
         toast.warn("please enter name");
         return false;
      }

      if (!contract.project) {
         toast.warn("please choose project");
         return false;
      }

      if (contract.startDate && contract.endDate)
         if (contract.endDate < contract.startDate) {
            toast.warn("the closing date must be greater than the signing date");
            return false;
         }
      Object.keys(contract).map((key) => !contract[key] && delete contract[key]);

      return true;
   };

   const close = () => {
      handleClose();
      setItem({
         name: "",
         startDate: "",
         endDate: "",
         project: {
            _id: "",
         },
      });
   };

   useEffect(() => {
      setContract({ ...item, project: item?.project?._id });
   }, [item]);

   return (
      <Modal
         show={show}
         // onHide={handleClosed}
         //  size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <div className="modal-header">
            <h5 className="modal-title">{item?.name ? "Sửa hợp đồng" : "Thêm hợp đồng"} </h5>
            <button type="button" className="close-x" onClick={() => close()}>
               <span aria-hidden="true">×</span>
            </button>
         </div>
         <div className="modal-body">
            <div className="row">
               <div className="col-md-12">
                  <div className="form-group">
                     <label className="col-form-label">
                        Loại hợp đồng <span className="text-danger">*</span>
                     </label>
                     <input
                        className="form-control"
                        type="text"
                        value={contract?.name}
                        onChange={(e) => setContract({ ...contract, name: e.target.value })}
                     />
                  </div>
               </div>
               <div className="col-md-12">
                  <div className="form-group">
                     <label className="col-form-label">Ngày ký</label>
                     <input
                        className="form-control"
                        type="datetime-local"
                        value={
                           contract?.startDate &&
                           moment(contract?.startDate).format("YYYY-MM-DDThh:mm:ss")
                        }
                        onChange={(e) => setContract({ ...contract, startDate: e.target.value })}
                     />
                  </div>
               </div>
               <div className="col-md-12">
                  <div className="form-group">
                     <label className="col-form-label">
                        Ngày kết thúc <span className="text-danger">*</span>
                     </label>
                     <input
                        className="form-control"
                        type="datetime-local"
                        value={
                           contract?.endDate &&
                           moment(contract?.endDate).format("YYYY-MM-DDThh:mm:ss")
                        }
                        onChange={(e) => setContract({ ...contract, endDate: e.target.value })}
                     />
                  </div>
               </div>
               <div className="col-md-12">
                  <div className="form-group">
                     <label className="col-form-label">
                        Dự án <span className="text-danger">*</span>
                     </label>
                     <select
                        className="form-control"
                        value={contract?.project}
                        onChange={(e) => {
                           setContract({ ...contract, project: e.target.value });
                        }}
                     >
                        <option>Chọn dự án</option>
                        {projects?.map((item, index) => (
                           <option key={index} value={item?._id}>
                              {item?.name}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>
            </div>
            <div className="submit-section">
               {item?.name ? (
                  <button className="btn btn-primary submit-btn" onClick={handleUpdate}>
                     Cập nhật
                  </button>
               ) : (
                  <button className="btn btn-primary submit-btn" onClick={handleSave}>
                     Lưu
                  </button>
               )}
            </div>
         </div>
      </Modal>
   );
};
export default AddContract;

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { prioritys, statusProject } from "../../constant/index";
import { toast } from "react-toastify";
// import { Select } from "antd";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useSelector } from "react-redux";
import { createProject } from "../../redux/feature/projectSclice";
import { useLoading } from "../../hook/useLoading";

const Addproject = ({ show, onHide }) => {
   const [project, setProject] = useState({
      name: "",
      priority: "",
      price: 0,
      start: "",
      end: "",
      status: "",
      content: "",
      // team: [],
      // client: [],
      leader: "",
   });

   const animatedComponents = makeAnimated();

   const [teams, setTeams] = useState([]);
   const [client, setClient] = useState([]);
   const { setLoading } = useLoading();
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth);
   const { employees } = useSelector((state) => state.employees);
   const { clients } = useSelector((state) => state.client);

   // select

   const options = [];
   const optionClient = [];

   employees?.map((item) => options.push({ value: item._id, label: item.name }));
   clients?.map((item) => optionClient.push({ value: item._id, label: item.name }));

   async function handleSave() {
      const isteam = teams.map((i) => i.value);
      const isclient = client.map((i) => i.value);

      if (user._id) {
         dispatch(
            createProject({
               payload: {
                  ...project,
                  start: new Date(project.start).getTime(),
                  end: new Date(project.end).getTime(),
                  creator: user._id,
                  team: isteam,
                  client: isclient,
               },
               toast,
               onHide,
               setLoading,
            })
         );
      }
   }

   return (
      <>
         {/* Add Employee Modal */}
         <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={onHide}
            className="modal custom-modal fade"
            role="dialog"
         >
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title">Thêm dự án</h5>
                  <button type="button" className="close-x">
                     <span aria-hidden="true" onClick={onHide}>
                        ×
                     </span>
                  </button>
               </div>
               <div className="modal-body">
                  <div className="row">
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Tên dự án
                              <span className="text-danger">*</span>
                           </label>
                           <input
                              className="form-control"
                              type="text"
                              onChange={(e) => setProject({ ...project, name: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Độ ưu tiên <span className="text-danger">*</span>
                           </label>
                           <select
                              className="form-control"
                              // className="select"   class tam linh
                              onChange={(e) => setProject({ ...project, priority: e.target.value })}
                           >
                              <option>Chọn độ ưu tiên</option>
                              {prioritys?.map((item) => (
                                 <option key={item.value} value={item.value}>
                                    {item.label}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Ngày bắt đầu <span className="text-danger">*</span>
                           </label>
                           <input
                              className="form-control"
                              type="datetime-local"
                              onChange={(e) => setProject({ ...project, start: e.target.value })}
                           />
                        </div>
                     </div>

                     <div className="col-md-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Ngày kết thúc <span className="text-danger">*</span>
                           </label>{" "}
                           <br />
                           <input
                              className="form-control"
                              type="datetime-local"
                              onChange={(e) => setProject({ ...project, end: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              {" "}
                              Trạng thái <span className="text-danger">*</span>
                           </label>
                           <select
                              className="form-control"
                              // className="select"   class tam linh
                              onChange={(e) => setProject({ ...project, status: e.target.value })}
                           >
                              <option>Chọn trạng thái</option>
                              {statusProject.map((item) => (
                                 <option key={item.value} value={item.value}>
                                    {item.label}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Cost <span className="text-danger">*</span>
                           </label>
                           <input
                              className="form-control"
                              type="number"
                              onChange={(e) => setProject({ ...project, price: e.target.value })}
                           />
                        </div>
                     </div>

                     <div className="col-md-12">
                        <div className="form-group">
                           <label className="col-form-label">
                              Leader<span className="text-danger">*</span>
                           </label>{" "}
                           <br />
                           <select
                              className="form-control"
                              // className="select"   class tam linh
                              onChange={(e) => setProject({ ...project, leader: e.target.value })}
                           >
                              <option>Chọn leader</option>
                              {employees.map((item) => (
                                 <option key={item._id} value={item._id}>
                                    {item.name}
                                 </option>
                              ))}
                           </select>
                        </div>
                     </div>

                     <div className="col-sm-12">
                        <div className="form-group">
                           <label className="col-form-label">
                              Team <span className="text-danger">*</span>
                           </label>

                           <Select
                              isMulti
                              onChange={(e) => setTeams(e)}
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              options={options}
                           />
                        </div>
                     </div>

                     <div className="col-sm-12">
                        <div className="form-group">
                           <label className="col-form-label">
                              Khách hàng <span className="text-danger">*</span>
                           </label>

                           <Select
                              isMulti
                              onChange={(e) => setClient(e)}
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              options={optionClient}
                           />
                        </div>
                     </div>

                     <div className="col-sm-12">
                        <div className="form-group">
                           <label className="col-form-label">
                              Nội dung <span className="text-danger">*</span>
                           </label>
                           <textarea
                              onChange={(e) => setProject({ ...project, content: e.target.value })}
                              rows={4}
                              cols={160}
                              className="form-control summernote"
                              placeholder="Enter your message here"
                              defaultValue={""}
                           />
                        </div>
                     </div>
                  </div>

                  <div className="submit-section">
                     <button className="btn btn-primary submit-btn" onClick={handleSave}>
                        Lưu
                     </button>
                  </div>
               </div>
            </div>
         </Modal>
         {/* /Add Employee Modal */}
      </>
   );
};

export default Addproject;

import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { prioritys, statusProject } from "../../constant/index";
import { toast } from "react-toastify";
// import { Select } from "antd";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useSelector } from "react-redux";
import { createProject, updateProject } from "../../redux/feature/projectSclice";
import { useLoading } from "../../hook/useLoading";
import moment from "moment";
import { useMemo } from "react";

const Addproject = ({ show, onHide, projectData, render, setLoad }) => {
   const [project, setProject] = useState({
      name: "",
      priority: "",
      price: "",
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
   const [optionTeam, setOptionTeam] = useState([]);
   const [optionEmployees, setOptionEmployees] = useState([]);
   const [optionClient, setOptionClient] = useState([]);
   //edit
   const [isEdit, setIsEdit] = useState("");

   const empty = () => {
      setProject({
         name: "",
         priority: "",
         price: "",
         start: "",
         end: "",
         status: "",
         content: "",
         leader: "",
      });

      setIsEdit("");
      setClient([]);
      setTeams([]);
   };

   const handleClose = () => {
      empty();
      onHide();
   };

   // select

   const options = [];
   const arrayOpitionClient = [];
   // filter value muti select
   let valueSelectClient = [];
   let valueSelectTeam = [];

   useMemo(() => {
      employees?.map((item) => options.push({ value: item._id, label: item.name }));
      clients?.map((item) => arrayOpitionClient.push({ value: item._id, label: item.name }));

      projectData?.clients?.map((item) =>
         arrayOpitionClient.filter((i) => {
            if (i.value === item._id) {
               valueSelectClient.push(i);
            }
         })
      );
      projectData?.employees?.map((item) =>
         options.filter((i) => {
            if (i.value === item._id) {
               valueSelectTeam.push(i);
            }
         })
      );
   }, [employees, clients, render]);

   useEffect(() => {
      if (projectData) {
         setClient(valueSelectClient);
         setTeams(valueSelectTeam);
      }
   }, [render]);

   // fetch muti select
   useEffect(() => {
      setProject(projectData);
      setIsEdit(projectData._id);
   }, [render]);

   // load team && employees
   useEffect(() => {
      setOptionEmployees(employees);
      setOptionTeam(options);
      setOptionClient(arrayOpitionClient);
   }, [employees]);

   const changeLeader = (e) => {
      setProject({ ...project, leader: e.target.value });
      setOptionTeam(options.filter((item) => item.value !== e.target.value));
   };

   const changeTeam = (e) => {
      setTeams(e);
   };

   async function handleSave() {
      const isteam = teams.map((i) => i.value);
      const isclient = client.map((i) => i.value);

      if (!user._id) {
         toast.warn(`L??m ??n ????ng nh???p v??o h??? th???ng`);
         return;
      }

      if (validatetion()) {
         dispatch(
            createProject({
               payload: {
                  ...project,
                  price: +project.price,
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

         empty();
      }
   }

   const handleUpdate = () => {
      if (!user._id) {
         toast.warn(`L??m ??n ????ng nh???p v??o h??? th???ng`);
         return;
      }

      if (!projectData._id) {
         toast.warn(`D??? ??n kh??ng t???n t???i`);
         return;
      }

      const isteam = teams.map((i) => i.value);
      const isclient = client.map((i) => i.value);

      let payload = {
         ...project,
         price: +project.price,
         start: new Date(project.start).getTime(),
         end: new Date(project.end).getTime(),
         creator: user._id,
         team: isteam,
         client: isclient,
      };

      // no update payslip
      delete payload.payslip;

      if (validatetion()) {
         dispatch(
            updateProject({
               id: projectData._id,
               payload,
               toast,
               onHide,
               setLoading,
               project,
               setLoad,
            })
         );

         empty();
      }
   };

   const validatetion = () => {
      if (!project.name) {
         toast.warn("Vui l??ng nh???p t??n d??? ??n");
         return false;
      }

      if (!project.start || !project.end) {
         toast.warn("Vui l??ng ch???n ng??y b???t ?????u v?? k???t th??c");
         return false;
      }

      if (new Date(project.end).getTime() <= new Date(project.start).getTime()) {
         toast.warn("Ng??y k???t th??c ph???i l???n h??n ng??y b???t ?????u");
         return false;
      }

      if (!project.status) {
         toast.warn("Vui l??ng ch???n tr???ng th??i c???a d??? ??n");
         return false;
      }

      if (!project.leader) {
         toast.warn("Vui l??ng ch???n tr?????ng nh??m");
         return false;
      }

      if (teams.length === 0) {
         toast.warn("Vui l??ng ch???n nh??n vi??n");
         return false;
      }

      if (client.length === 0) {
         toast.warn("Vui l??ng ch???n kh??ch h??ng");
         return false;
      }

      return true;
   };

   return (
      <>
         {/* Add Employee Modal */}
         <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
            className="modal custom-modal fade"
            role="dialog"
         >
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title">{isEdit ? "Ch???nh s???a d??? ??n" : "Th??m d??? ??n"}</h5>
                  <button type="button" className="close-x">
                     <span aria-hidden="true" onClick={handleClose}>
                        ??
                     </span>
                  </button>
               </div>
               <div className="modal-body">
                  <div className="row">
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              T??n d??? ??n
                              <span className="text-danger">*</span>
                           </label>
                           <input
                              className="form-control"
                              type="text"
                              defaultValue={project.name}
                              onChange={(e) => setProject({ ...project, name: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              ????? ??u ti??n <span className="text-danger">*</span>
                           </label>
                           <select
                              className="form-control"
                              // className="select"   class tam linh
                              value={project.priority}
                              onChange={(e) => setProject({ ...project, priority: e.target.value })}
                           >
                              <option>Ch???n ????? ??u ti??n</option>
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
                              Ng??y b???t ?????u <span className="text-danger">*</span>
                           </label>
                           <input
                              className="form-control"
                              type="datetime-local"
                              value={moment(project.start).format("YYYY-MM-DD HH:mm")}
                              onChange={(e) => setProject({ ...project, start: e.target.value })}
                           />
                        </div>
                     </div>

                     <div className="col-md-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              Ng??y k???t th??c <span className="text-danger">*</span>
                           </label>{" "}
                           <br />
                           <input
                              className="form-control"
                              type="datetime-local"
                              value={moment(project?.end).format("YYYY-MM-DD HH:mm")}
                              onChange={(e) => setProject({ ...project, end: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label className="col-form-label">
                              {" "}
                              Tr???ng th??i <span className="text-danger">*</span>
                           </label>
                           <select
                              className="form-control"
                              // className="select"   class tam linh
                              value={project?.status}
                              onChange={(e) => setProject({ ...project, status: e.target.value })}
                           >
                              <option>Ch???n tr???ng th??i</option>
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
                              defaultValue={project?.price}
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
                              value={project?.leader}
                              onChange={changeLeader}
                           >
                              <option>Ch???n leader</option>
                              {optionEmployees.map((item) => (
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
                              value={teams}
                              onChange={changeTeam}
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              options={optionTeam}
                           />
                        </div>
                     </div>

                     <div className="col-sm-12">
                        <div className="form-group">
                           <label className="col-form-label">
                              Kh??ch h??ng <span className="text-danger">*</span>
                           </label>

                           <Select
                              isMulti
                              value={client}
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
                              N???i dung <span className="text-danger">*</span>
                           </label>
                           <textarea
                              defaultValue={project.content}
                              onChange={(e) => setProject({ ...project, content: e.target.value })}
                              rows={4}
                              cols={160}
                              className="form-control summernote"
                              placeholder="Enter your message here"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="submit-section">
                     {!isEdit ? (
                        <button className="btn btn-primary submit-btn" onClick={handleSave}>
                           L??u
                        </button>
                     ) : (
                        <button className="btn btn-primary submit-btn" onClick={handleUpdate}>
                           C???p nh???t
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </Modal>
         {/* /Add Employee Modal */}
      </>
   );
};

export default Addproject;

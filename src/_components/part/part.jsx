import { Switch, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoading } from "../../hook/useLoading";
import { itemRender, onShowSizeChange } from "../../MainPage/paginationfunction";
import {
   listAssignTaskByProject,
   updateFinish,
   updatePerform,
} from "../../redux/feature/assignTaskSclice";

const Part = () => {
   return (
      <div className="card">
         <div className="card-body">
            <h5 className="card-title m-b-20">Bộ phận</h5>
            <div class="row">
               <div class="column">
                  <div className="kanban-list kanban-success">
                     <div className="kanban-header">
                        <span className="status-title">Completed</span>
                        <div className="dropdown kanban-action">
                           <a href="" data-bs-toggle="dropdown">
                              <i className="fa fa-ellipsis-v" />
                           </a>
                           <div className="dropdown-menu dropdown-menu-right">
                              <a
                                 className="dropdown-item"
                                 href="#"
                                 data-bs-toggle="modal"
                                 data-bs-target="#edit_task_board"
                              >
                                 Edit
                              </a>
                              <a className="dropdown-item" href="#">
                                 Delete
                              </a>
                           </div>
                        </div>
                     </div>
                     <div className="kanban-wrap ks-empty"></div>
                     <div className="add-new-task">
                        <a href="" data-bs-toggle="modal" data-bs-target="#add_task_modal">
                           Add New Task
                        </a>
                     </div>
                  </div>
               </div>
               <div class="column">
                  <div className="kanban-list kanban-success">
                     <div className="kanban-header">
                        <span className="status-title">Completed</span>
                        <div className="dropdown kanban-action">
                           <a href="" data-bs-toggle="dropdown">
                              <i className="fa fa-ellipsis-v" />
                           </a>
                           <div className="dropdown-menu dropdown-menu-right">
                              <a
                                 className="dropdown-item"
                                 href="#"
                                 data-bs-toggle="modal"
                                 data-bs-target="#edit_task_board"
                              >
                                 Edit
                              </a>
                              <a className="dropdown-item" href="#">
                                 Delete
                              </a>
                           </div>
                        </div>
                     </div>
                     <div className="kanban-wrap ks-empty"></div>
                     <div className="add-new-task">
                        <a href="" data-bs-toggle="modal" data-bs-target="#add_task_modal">
                           Add New Task
                        </a>
                     </div>
                  </div>
               </div>
               <div class="column">
                  <div className="kanban-list kanban-success">
                     <div className="kanban-header">
                        <span className="status-title">Completed</span>
                        <div className="dropdown kanban-action">
                           <a href="" data-bs-toggle="dropdown">
                              <i className="fa fa-ellipsis-v" />
                           </a>
                           <div className="dropdown-menu dropdown-menu-right">
                              <a
                                 className="dropdown-item"
                                 href="#"
                                 data-bs-toggle="modal"
                                 data-bs-target="#edit_task_board"
                              >
                                 Edit
                              </a>
                              <a className="dropdown-item" href="#">
                                 Delete
                              </a>
                           </div>
                        </div>
                     </div>
                     <div className="kanban-wrap ks-empty"></div>
                     <div className="add-new-task">
                        <a href="" data-bs-toggle="modal" data-bs-target="#add_task_modal">
                           Add New Task
                        </a>
                     </div>
                  </div>
               </div>
               <div class="column">
                  <div className="kanban-list kanban-success">
                     <div className="kanban-header">
                        <span className="status-title">Completed</span>
                        <div className="dropdown kanban-action">
                           <a href="" data-bs-toggle="dropdown">
                              <i className="fa fa-ellipsis-v" />
                           </a>
                           <div className="dropdown-menu dropdown-menu-right">
                              <a
                                 className="dropdown-item"
                                 href="#"
                                 data-bs-toggle="modal"
                                 data-bs-target="#edit_task_board"
                              >
                                 Edit
                              </a>
                              <a className="dropdown-item" href="#">
                                 Delete
                              </a>
                           </div>
                        </div>
                     </div>
                     <div className="kanban-wrap ks-empty"></div>
                     <div className="add-new-task">
                        <a href="" data-bs-toggle="modal" data-bs-target="#add_task_modal">
                           Add New Task
                        </a>
                     </div>
                  </div>
               </div>{" "}
            </div>
         </div>
      </div>
   );
};

export default Part;

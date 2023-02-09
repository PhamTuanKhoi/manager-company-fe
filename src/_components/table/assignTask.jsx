import { Switch, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { avartarFAKE } from "../../constant";
import { useLoading } from "../../hook/useLoading";
import { itemRender, onShowSizeChange } from "../../MainPage/paginationfunction";
import {
   listAssignTaskByProject,
   updateFinish,
   updatePerform,
} from "../../redux/feature/assignTaskSclice";

const AssignTask = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   const onPerform = (checked, record) => {
      dispatch(
         updatePerform({
            id: record._id,
            payload: { verify: checked },
            toast,
            setLoading,
            record: { ...record, perform: { status: checked, date: Date.now() } },
         })
      );
   };

   const onFinish = (checked, record) => {
      dispatch(
         updateFinish({
            id: record._id,
            payload: { verify: checked },
            toast,
            setLoading,
            record: { ...record, finish: { status: checked, date: Date.now() } },
         })
      );
   };

   useEffect(() => {
      dispatch(listAssignTaskByProject({ id, setLoading }));
   }, [id]);

   const { assignTasks } = useSelector((state) => state.assignTask);

   const columns = [
      {
         title: "#",
         dataIndex: "id",
      },
      {
         title: "Họ tên",
         dataIndex: "name",
         render: (text, record) => (
            <h2 className="table-avatar">
               <Link to={`/app/profile/worker-profile/${record?.userId}`} className="avatar">
                  <img alt={record?.name} src={record?.image || avartarFAKE} />
               </Link>
               <Link to={`/app/profile/worker-profile/${record?.userId}`}>
                  {text} <span>{record?.field}</span>
               </Link>
            </h2>
         ),
         sorter: (a, b) => a.name.length - b.name.length,
      },
      {
         title: "Bộ phận",
         dataIndex: "partName",
         sorter: (a, b) => a.partName.length - b.partName.length,
      },
      {
         title: "Công việc",
         dataIndex: "taskName",
         sorter: (a, b) => a.taskName.length - b.taskName.length,
      },
      {
         title: "Thực hiện",
         dataIndex: "perform",
         render: (perform, record) => (
            <Switch defaultChecked={perform.status} onChange={(e) => onPerform(e, record)} />
         ),
      },

      {
         title: "Hoàn thành",
         dataIndex: "finish",
         render: (finish, record) => {
            return <Switch defaultChecked={finish?.status} onChange={(e) => onFinish(e, record)} />;
         },
      },
   ];

   return (
      <div className="card">
         <div className="card-body">
            <h5 className="card-title m-b-20">Công việc được giao</h5>

            <div className="table-responsive">
               <Table
                  pagination={{
                     total: assignTasks?.length,
                     showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                     showSizeChanger: true,
                     onShowSizeChange: onShowSizeChange,
                     itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  bordered
                  dataSource={assignTasks}
                  rowKey={(record) => record._id}
                  // onChange={this.handleTableChange}
               />
            </div>
         </div>
      </div>
   );
};

export default AssignTask;

import { Switch, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useLoading } from "../../hook/useLoading";
import { itemRender, onShowSizeChange } from "../../MainPage/paginationfunction";
import { listAssignTaskByProject } from "../../redux/feature/assignTaskSclice";

const AssignTask = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { setLoading } = useLoading();

   const onPerform = (checked) => {
      console.log(`perform to ${checked}`);
   };

   const onFinish = (checked) => {
      console.log(`finish to ${checked}`);
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
         sorter: (a, b) => a.name.length - b.name.length,
      },
      {
         title: "Công việc",
         dataIndex: "taskName",
         sorter: (a, b) => a.taskName.length - b.taskName.length,
      },
      {
         title: "Thực hiện",
         render: (text, record) => <Switch onChange={onPerform} />,
      },
      {
         title: "Hoàn thành",
         render: (text, record) => <Switch onChange={onFinish} />,
      },
   ];

   return (
      <div className="card">
         <div className="card-body">
            <h5 className="card-title m-b-20">Công việc được giao</h5>

            <div className="table-responsive">
               <Table
                  pagination={{
                     total: assignTasks.length,
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

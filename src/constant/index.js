export const api = "http://localhost:3000/";
export const alphaNumericPattern = /^[a-zA-Z0-9_ .-]*$/;
export const emailrgx =
   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
// export const phonergx = /^[a-zA-Z0-9_ .-]*$/;
export const phonergx = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;

export var customText = (str) => {
   return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
};

export const avartarFAKE = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export const EmployeeDepartmentType = {
   MARKETING: "marketing",
   RECRUIT: "recruit",
   BUSSINESS: "bussiness",
   ACCOUNTANT: "accountant",
};

export const ProjectPriorityEnum = {
   LOW: 0,
   MEDIUM: 1,
   HIGH: 2,
};

export const ProjectStatusEnum = {
   CANCEL: 0,
   NEWPROJECTS: 1,
   RUNNING: 2,
   ONHOLD: 3,
   FINISHED: 4,
};

export const prioritys = [
   { value: 0, label: "Thấp" },
   { value: 1, label: "Trung bình" },
   { value: 2, label: "Cao" },
];

export const statusProject = [
   { value: 1, label: "Dự án mới" },
   { value: 2, label: "Đang chạy" },
   { value: 4, label: "Hoàn thành" },
];

export const UserRoleType = {
   ADMIN: "Admin",
   CLIENT: "Client",
   EMPLOYEE: "Employee",
   WORKER: "Worker",
};

export const TaskStatusType = {
   START: 0,
   INPROGRESS: 1,
   COMPLETED: 2,
};

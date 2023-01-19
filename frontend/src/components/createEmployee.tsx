import React, { useEffect, useState } from "react";
import { createEmployee } from "../apiClient";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getDepartmentById } from "../apiClient";
import "../css/createEmployee.css";
import { Employee } from "../models/employeeModel";
import { MenuAddEmployee } from "./navbarCreateEmployee";


export const CreateEmployee = () => {
  const params = useParams();
  const department_id = Number(params.id);
  const [departmentName, setDepartmentName] = useState("");
  const [departmentImage, setDepartmentImage] = useState("");
  const [employee, setEmployee] = useState<Employee>({
    id: null,
    name: "",
    gender: "",
    role: "",
    dob: "",
    age: null,
    address: "",
    phone: "",
    email: "",
    start_date: "",
    salary: "",
    photo: "",
    department_id: department_id,
    department_name: "",
    updated_at: "",
    created_at: "",
  });

  const [error, setError] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDepartmentById(Number(department_id)).then((response) => {
      setDepartmentName(response.department.department_name);
      setDepartmentImage(response.department.image);
    });
  }, []);

  const handleChangeEmployeeName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    employee.name = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeGender = (event: { target: { value: string } }) => {
    employee.gender = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeRole = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    employee.role = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeDob = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    employee.dob = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    employee.address = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeePhone = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    employee.phone = event.target.value;
    setEmployee({ ...employee });
  };
  const handleChangeEmployeeEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    employee.email = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeStartDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    employee.start_date = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeSalary = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    employee.salary = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeePhoto = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    employee.photo = event.target.value;
    setEmployee({ ...employee });
  };

  const handleKeyPress = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      submit();
    }
  };

  const reset = () => {
    setEmployee({
      id: null,
      name: "",
      role: "",
      gender: "",
      dob: "",
      age: null,
      address: "",
      phone: "",
      email: "",
      start_date: "",
      salary: "",
      photo: "",
      department_id: department_id,
      department_name: "",
      updated_at: "",
      created_at: "",
    });
    setError("");
    setDisabled(false);
  };

  const submit = () => {
    const request: Employee = {
      id: null,
      name: "",
      role: "",
      gender: "",
      dob: "",
      age: null,
      address: "",
      phone: "",
      email: "",
      start_date: "",
      salary: "",
      photo: "",
      department_id: department_id,
      department_name: "",
      updated_at: "",
      created_at: "",
    };
    Object.entries(employee).forEach(([key, value]) => {
      request[key] = value;
    });

    createEmployee(Number(department_id), request).then((response) => {
      if (!response.success) {
        setError(response.error.slice(1, -1));
      } else {
        navigate(`/employee/${response.id}`);
      }
    });
  };

  if (!departmentName) {
    return <div>Loading ...</div>;
  } else {
    return (
      <main className="create-employee-container">
        <MenuAddEmployee departmentImage={departmentImage} department_id={department_id} department_name={departmentName}/>
        <h4 className="title">Add employee to {departmentName}</h4>
        <fieldset onKeyDown={handleKeyPress}>
          <div className="create-employee-input">
            <label>Name</label>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="text"
              style={{ width: "55%" }}
              placeholder="Enter name"
              onChange={(event) => handleChangeEmployeeName(event)}
              value={employee.name}
            ></input>
          </div>

          <div className="create-employee-input">
            <label>Gender</label>
            <select
              className="input-large-large search-query my-2 mb-3"
              style={{ width: "55%", height: "30px" }}
              onChange={handleChangeEmployeeGender}
              value={employee.gender}
            >
              {" "}
              <option>Choose gender</option>
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>

          <div className="create-employee-input">
            <label>Role</label>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="text"
              style={{ width: "55%" }}
              placeholder="Enter role"
              onChange={(event) => handleChangeEmployeeRole(event)}
              value={employee.role}
            ></input>
          </div>

          <div className="create-employee-input">
            <label>Date of birth</label>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="date"
              style={{ width: "55%" }}
              onChange={(event) => handleChangeEmployeeDob(event)}
              value={employee.dob}
            ></input>
          </div>

          <div className="create-employee-input">
            <label>Address</label>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="address"
              style={{ width: "55%" }}
              placeholder="Enter address"
              onChange={(event) => handleChangeEmployeeAddress(event)}
              value={employee.address}
            ></input>
          </div>

          <div className="create-employee-input">
            <label>Phone</label>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="tel"
              style={{ width: "55%" }}
              placeholder="+44 xxxx xxxxxx"
              onChange={(event) => handleChangeEmployeePhone(event)}
              value={employee.phone}
            ></input>
          </div>

          <div className="create-employee-input">
            <label>Email</label>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="email"
              style={{ width: "55%" }}
              placeholder="Enter email address"
              onChange={(event) => handleChangeEmployeeEmail(event)}
              value={employee.email}
            ></input>
          </div>

          <div className="create-employee-input">
            <label>Start date</label>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="date"
              style={{ width: "55%" }}
              onChange={(event) => handleChangeEmployeeStartDate(event)}
              value={employee.start_date}
            ></input>
          </div>

          <div className="create-employee-input">
            <label>Salary £</label>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="number"
              style={{ width: "55%" }}
              onChange={(event) => handleChangeEmployeeSalary(event)}
              value={employee.salary}
            ></input>
          </div>

          <div className="create-employee-input">
            <label>Photo (optional)</label>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="url"
              placeholder="https://example.com"
              pattern="https://.*"
              style={{ width: "55%" }}
              onChange={(event) => handleChangeEmployeePhoto(event)}
              value={employee.photo}
            ></input>
          </div>
        </fieldset>

        <div className="d-flex flex-row buttons">
          <Button
            className="btn btn-success my-4 mx-2"
            disabled={isDisabled}
            onClick={submit}
          >
            Submit
          </Button>
          <Button className="mx-2 my-4" onClick={reset}>
            Reset
          </Button>

          <p className="error">
            {error !== "" ? <p style={{ color: "red" }}>{error}</p> : ""}
          </p>
        </div>
      </main>
    );
  }
};

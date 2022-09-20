import React, { useEffect, useState } from "react";
import { createEmployee } from "../apiClient";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getDepartmentById } from "../apiClient";
import { Container } from "react-bootstrap";
import "../css/createEmployee.css";
import { CreateEmployeeForm } from "../models/employeeModel";

export const CreateEmployee = () => {
  const params = useParams();
  const department_id = params.id;
  const [departmentName, setDepartmentName]= useState("");
  const [employee, setEmployee] = useState<CreateEmployeeForm>({
    name: "",
    role: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    start_date: "",
    salary: "",
    photo: ""
  });

  const [error, setError] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDepartmentById(Number(department_id)).then((response) => {
      setDepartmentName(response[0].department_name);
    });
  }, []);

  const handleChangeEmployeeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    employee.name = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    employee.role = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeDob = (event: React.ChangeEvent<HTMLInputElement>) => {
    employee.dob = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    employee.address = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    employee.phone = event.target.value;
    setEmployee({ ...employee });
  };
  const handleChangeEmployeeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    employee.email = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    employee.start_date = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeSalary = (event: React.ChangeEvent<HTMLInputElement>) => {
    employee.salary = parseFloat(event.target.value);
    setEmployee({ ...employee });
  };

  const handleChangeEmployeePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    employee.photo = event.target.value;
    setEmployee({ ...employee });
  };

  const handleKeyPress = (event: { keyCode: number; }) => {
    if (event.keyCode === 13) {
      submit();
    }
  };

  const reset = () => {
    setEmployee({name: "",
    role: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    start_date: "",
    salary: "",
    photo: "",
    });
    setError("");
    setDisabled(false);
  };

  const submit = () => {
    const request: CreateEmployeeForm = {
        name: "",
        role: "",
        dob: "",
        address: "",
        phone: "",
        email: "",
        start_date: "",
        salary: "",
        photo: ""
    };
    Object.entries(employee).forEach(([key, value]) => {
        request[key] = value;
      }
    )
    createEmployee(Number(department_id), request).then((response) => {
      if (!response.success) { 
        setError(response.error.slice(1, -1));
      } else {
        navigate(`/department/${department_id}`);
      }
    });
  };

  return (
    <Container>
      <h3 className="title">Add employee to {departmentName}</h3>
      <fieldset onKeyDown={handleKeyPress}>
        <div>
          <label>
            Name 
            </label> 
            <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="text"
              style={{ width: '75%' }}
              placeholder="Enter name"
              onChange={(event) => handleChangeEmployeeName(event)}
              value={employee.name}
            ></input>
        </div>
        <div>
          <label>
            Role
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="text"
              style={{ width: '75%' }}
              placeholder="Enter role"
              onChange={(event) => handleChangeEmployeeRole(event)}
              value={employee.role}
            ></input>
        </div>


        <div>
          <label>
            Date of birth
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="date"
              style={{ width: '75%' }}
              onChange={(event) => handleChangeEmployeeDob(event)}
              value={employee.dob}
            ></input>
        </div>

        <div>
          <label>
            Address
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="address"
              style={{ width: '75%' }}
              placeholder="Enter address"
              onChange={(event) => handleChangeEmployeeAddress(event)}
              value={employee.address}
            ></input>
        </div>

        <div>
          <label>
            Phone
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="tel"
              style={{ width: '75%' }}
              placeholder="+44 xxxx xxxxxx"
              onChange={(event) => handleChangeEmployeePhone(event)}
              value={employee.phone}
            ></input>
        </div>

        <div>
          <label>
            Email
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="email"
              style={{ width: '75%' }}
              placeholder="Enter email address"
              onChange={(event) => handleChangeEmployeeEmail(event)}
              value={employee.email}
            ></input>
        </div>

        <div>
          <label>
            Start date
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="date"
              style={{ width: '75%' }}
              onChange={(event) => handleChangeEmployeeStartDate(event)}
              value={employee.start_date}
            ></input>
        </div>

        <div>
          <label>
            Salary £
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="number"
              style={{ width: '75%' }}
              onChange={(event) => handleChangeEmployeeSalary(event)}
              value={employee.salary}
            ></input>
        </div>

        <div>
          <label>
            Photo (optional)
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="url"
              placeholder="https://example.com"
              pattern="https://.*"
              style={{ width: '75%' }}
              onChange={(event) => handleChangeEmployeePhoto(event)}
              value={employee.photo}
            ></input>
        </div>

        <div className="d-flex flex-row">
          <Button
            className="btn btn-success my-4"
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
      </fieldset>

      <div>
        <Link to={`/department/${department_id}`} className="link">
          {" "}
          View all employees of {departmentName}
        </Link>
      </div>
      <div>
        <Link to="/department" className="link">
          {" "}
          View all departments{" "}
        </Link>
      </div>
      <div>
        <Link to="/employee" className="link">
          {" "}
          View all employees{" "}
        </Link>



        
      </div>
    </Container>
  );
};

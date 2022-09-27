import React, { useEffect, useState } from "react";
import { getAllEmployees, getAllEmployeesByDob } from "../apiClient";
import { EmployeeTable } from "./employeeTable";
import Container from "react-bootstrap/esm/Container";
import { getAllDepartments } from "../apiClient";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../css/getAllEmployees.css";
import { Employee } from "../models/employeeModel";
import { Department } from "../models/departmentModels";
import { EmployeeTableDOB } from "./employeeTableDOB";
import { useSearchParams, useLocation } from "react-router-dom";

export const GetAllEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>();
  const [departments, setDepartments] = useState<Department[]>([]);

  const [departmentName, setDepartmentName] = useState<string>();
  const [searchTableDisplay, setSearchTableDisplay] = useState(false);

  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  const [isDisabled, setDisabled] = useState(true);
  const [employeesByDob, setEmployeesByDob] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = {from: searchParams.get('from'), to: searchParams.get('to')};

  const navigate = useNavigate();

  const handleChangeDepartment = (event: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setDepartmentName(event.target.value);
  };

  const location = useLocation()

  useEffect(() => {
    getAllEmployees().then((response) => setEmployees(response.employees));
    getAllDepartments().then((response) =>
      setDepartments(response.departments)
    );
      if (query.from && query.to) {
        getAllEmployeesByDob(query.from, query.to).then((response) => {
          setEmployeesByDob(response.employees);
          setSearchTableDisplay(true);
        });
      }
  }, []);
  
  const startDateValue = ((): string => {
    if (query.from && query.to) {
      return query.from;
    }
    else {
      return startDate;
    }
  })

  const endDateValue = ((): string => {
    if (query.from && query.to) {
      return query.to;
    }
    else {
      return endDate;
    }
  })

  const handleChangeStartDate = (event: {
    target: { value: string | number | Date };
  }) => {
    const start = new Date(event.target.value).toISOString().slice(0, 10);
    setStartDate(start);
    if (startDate !== "dd/mm/yyyy") {
      setDisabled(false);
    }
   query.from =  new Date(event.target.value).toISOString().slice(0, 10);
   searchParams.set('from', query.from);
   setSearchParams(searchParams);
  };

  const handleChangeEndDate = (event: {
    target: { value: string | number | Date };
  }) => {
    const end = new Date(event.target.value).toISOString().slice(0, 10);
    setEndDate(end);
    if (endDate !== "dd/mm/yyyy") {
      setDisabled(false);
    }
    query.to =  new Date(event.target.value).toISOString().slice(0, 10);
    searchParams.set('to', query.to);
   setSearchParams(searchParams);
  };

  const submit = () => {
    for (let i = 0; i < departments.length; i++) {
      if (departments[i].department_name === departmentName) {
        navigate(`/department/${departments[i].id}/employee/create`);
      }
      if (departmentName === "Add department") {
        navigate(`/department/create`);
      }
    }
  };

  const search = () => {
    if (startDate === "dd/mm/yyyy" && endDate === "dd/mm/yyyy") {
      setDisabled(true);
    } else if (
      startDate !== "dd/mm/yyyy" &&
      (endDate === "dd/mm/yyyy" || endDate === undefined)
    ) {
      const to = new Date().toJSON().slice(0, 10);
      getAllEmployeesByDob(startDate, to).then((response) => {
        setEmployeesByDob(response.employees);
        setSearchTableDisplay(true);
      });
    } else if (
      (startDate === "dd/mm/yyyy" || startDate === undefined) &&
      endDate !== "dd/mm/yyyy"
    ) {
      const from = "1900-01-01";
      getAllEmployeesByDob(from, endDate).then((response) => {
        setEmployeesByDob(response.employees);
        setSearchTableDisplay(true);
      });
    } else {
      getAllEmployeesByDob(startDate, endDate).then((response) => {
        setEmployeesByDob(response.employees);
        setSearchTableDisplay(true);
      });
    }
  };

  const reset = () => {
    getAllEmployees().then((response) => {
      setEmployees(response.employees);
      setSearchTableDisplay(false);
      setStartDate("dd/mm/yyyy");
      setEndDate("dd/mm/yyyy");
      setDisabled(true);
    });
  };

  return (
    <Container>
      <h3 className="title">Employees</h3>
      <label className="add-dep-label">
        Filter employees by date of birth from
      </label>
      <input type="date" onChange={handleChangeStartDate} value={startDateValue()} />
      <label className="add-dep-label">to</label>
      <input type="date" onChange={handleChangeEndDate} value={endDateValue()} />
      <Button
        className="btn btn-success my-3 mx-2"
        onClick={search}
        disabled={isDisabled}
      >
        Search
      </Button>

      <Button
        className="btn btn-success my-3 mx-2"
        onClick={reset}
        disabled={isDisabled}
      >
        Reset
      </Button>
      {searchTableDisplay ? (
        <EmployeeTableDOB employees={employeesByDob} />
      ) : (
        <EmployeeTable employees={employees} location={location} />
      )}

      <br />
      <label className="add-dep-label">Add employee to department</label>
      <select
        className="select-department"
        value={departmentName}
        onChange={handleChangeDepartment}
      >
        <option>Choose department</option>
        {departments.map((department) => (
          <option>{department.department_name}</option>
        ))}
        <option>Add department</option>
      </select>

      <Button className="btn btn-success my-3 mx-2" onClick={submit}>
        Submit
      </Button>
    </Container>
  );
};
function useHistory() {
  throw new Error("Function not implemented.");
}


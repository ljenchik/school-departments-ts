import React, { useEffect, useState } from "react";
import { getEmployeeById } from "../apiClient";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { deleteEmployeeById } from "../apiClient";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/getEmployeeById.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Employee } from "../models/employeeModel";
import { confirm } from "react-confirm-box";
import { createBrowserHistory } from 'history'

export const GetEmployeeById = (props) => {
  const [employee, setEmployee] = useState<Employee>();
  const params = useParams();
  const employee_id = params.id;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const options = {
    labels: {
      confirmable: "Yes",
      cancellable: "No",
    },
  };

  const history = createBrowserHistory();

  const backToSearch = () => {
          history.go(-1);
    }

  useEffect(() => {
    getEmployeeById(Number(employee_id)).then((response) => {
      response.employee.dob = response.employee.dob.split("T")[0];
      response.employee.start_date = response.employee.start_date.split("T")[0];
      response.employee.created_at = response.employee.created_at.split("T")[0];
      if (response.employee.updated_at)
       {response.employee.updated_at = response.employee.updated_at.split("T")[0];}
      setEmployee(response.employee);
    });
  }, []);

  const deleteEmployee = async () => {
    if (employee) {
      const result = await confirm(
        `Are you sure you want to delete ${employee.name}?`,
        options
      );
      if (result) {
        deleteEmployeeById(Number(employee_id)).then((response) => {
          if (response.success) {
            navigate(`/department/${employee.department_id}`);
          } else {
            setError("The error occured during deleting employee");
          }
        });
      } else {
        navigate(`/employee/${employee.id}`);
      }
    }
    else {
      setError("The error occured during deleting employee");
    }
  };

  const updateEmployee = () => {
    getEmployeeById(Number(employee_id)).then((response) =>
      navigate(`/employee/${employee_id}/update`)
    );
  };

  if (employee === undefined) {
    return <div>Loading report ...</div>;
  } else {
    return (
      <Container>
        <div className="flex-container">
          <div>
            {employee.photo ? (
              <div className="flex-left">
                <img className="employee-photo" src={employee.photo} />
              </div>
            ) : (
              <div className="flex-left">
                <OverlayTrigger overlay={<Tooltip>Add employee photo</Tooltip>}>
                  {({ ref, ...triggerHandler }) => (
                    <Link
                      ref={ref}
                      to={`/employee/${employee_id}/update`}
                      //variant="light"
                      {...triggerHandler}
                    >
                      <img
                        className="employee-photo"
                        src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
                      />
                    </Link>
                  )}
                </OverlayTrigger>
              </div>
            )}
          </div>

          <div className="flex-right">
            <Row>
              <Col>Name</Col>
              <Col xs={9} className="name">
                {employee.name}
              </Col>
            </Row>

            <Row>
              <Col>Gender</Col>
              <Col xs={9}>
                {employee.gender}
              </Col>
            </Row>

            <Row>
              <Col>Department</Col>
              <Col xs={9}>
                <Link
                  className="link"
                  to={`/department/${employee.department_id}/employee`}
                >
                  {employee.department_name}
                </Link>
              </Col>
            </Row>

            <Row>
              <Col>Role</Col>
              <Col xs={9}>{employee.role}</Col>
            </Row>

            <Row>
              <Col>Date of birth</Col>
              <Col xs={9}>{employee.dob}</Col>
            </Row>

            <Row>
              <Col>Age</Col>
              <Col xs={9}>{employee.age} years old</Col>
            </Row>

            <Row>
              <Col>Address</Col>
              <Col xs={9}>{employee.address}</Col>
            </Row>

            <Row>
              <Col>Phone</Col>
              <Col xs={9}>{employee.phone}</Col>
            </Row>

            <Row>
              <Col>Email</Col>
              <Col xs={9}>{employee.email}</Col>
            </Row>

            <Row>
              <Col>Salary</Col>
              <Col xs={9}>£{employee.salary}</Col>
            </Row>

            <Row>
              <Col>Hiring date</Col>
              <Col xs={9}>{employee.start_date}</Col>
            </Row>
          </div>
        </div>

        <br />
        <p className="created_at">
          Profile was created on {employee.created_at}
        </p>
        {employee.updated_at !== null ? (
          <p className="created_at">Updated on {employee.updated_at}</p>
        ) : (
          ""
        )}
        <br />
        <div className="d-flex flex-row">
          <Button className="btn btn-success my-2" onClick={backToSearch}>
            Back
          </Button>
          <Button className="btn btn-success mx-3 my-2" onClick={updateEmployee}>
            Update
          </Button>
          <Button className=" my-2" onClick={deleteEmployee}>
            Delete
          </Button>
        </div>
        <br />
        <div>
          <Link to={`/department/${employee.department_id}`} className="link">
            {" "}
            View all employees of {employee.department_name}
          </Link>
        </div>
        <div>
          <Link to="/" className="link">
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
  }
};

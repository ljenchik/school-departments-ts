import React, { useState } from "react";
import { createDepartment } from "../apiClient";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { CreateDepartmentForm } from "../requestModels/departmentModels";
import { useNavigate } from "react-router-dom";
import "../css/createDepartment.css";

var validateImageUrl = new RegExp('([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))');

export const CreateDepartment = () => {
  const [department, setDepartment] = useState<CreateDepartmentForm>({
    department_name: "",
    image: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChangeDepartmentName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartment({ ...department, department_name: event.target.value });
    setError("");
  };

  const handleChangeDepartmentImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartment({ ...department, image: event.target.value });
    setError("");
  };

  const submit = () => {
    const request: CreateDepartmentForm = {
      department_name: "",
      image: "",
    };

    request.department_name = department.department_name;

    if (!request.department_name) {
      setError("Enter department name");
    } else {
      if (validateImageUrl.test(department.image) && department.image) {
        request.image = department.image;
        createDepartment(request).then((response) => {
          navigate(`/`);
        }
      )}
      else if (!department.image) {
        request.image =
        "https://seekvectorlogo.net/wp-content/uploads/2019/03/department-for-education-vector-logo.png";
        createDepartment(request).then((response) => {
          navigate(`/`);
        }
      )}
      else if (validateImageUrl.test(department.image) === false) {
        setError("Enter a valid image url");
      }
    }
  };

  const handleKeyPress = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      submit();
    }
  };

  return (
    <div>
      <Container>
        <h4 className="title">Add a new department</h4>
        <fieldset className="fieldset" onKeyDown={handleKeyPress}>
          <div>
            <label>
              <input
                className="dep-name-input"
                type="text"
                placeholder="Enter department name"
                value={department.department_name}
                onChange={(event) => handleChangeDepartmentName(event)}
              ></input>
            </label>
          </div>

          <div>
            <label>
              <input
                className="dep-name-input"
                type="url"
                placeholder="http://image.jpg"
                value={department.image}
                onChange={(event) => handleChangeDepartmentImage(event)}
              ></input>
            </label>
          </div>
          <div className="d-flex">
            <Button
              className="btn btn-success my-3"
              onKeyDown={handleKeyPress}
              onClick={submit}
            >
              Submit
            </Button>

            {error !== "" ? (
              <p className="error-message" style={{ color: "red" }}>
                {error}
              </p>
            ) : (
              ""
            )}
          </div>
        </fieldset>
        <br />
        <div>
          <Link to="/" className="link">
            {" "}
            View all departments{" "}
          </Link>
        </div>
      </Container>
    </div>
  );
};

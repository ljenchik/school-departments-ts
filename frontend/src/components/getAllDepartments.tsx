import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { getAllDepartments } from "../apiClient";
import { Link } from "react-router-dom";
import "../css/getAllDepartments.css";
import { Container } from "react-bootstrap";

export const GetAllDepartments = () => {
  const [departments, setDepartments] = useState<any>([]);

  useEffect(() => {
    getAllDepartments().then((response) => {
      setDepartments(response.departments);
      console.log(response.departments);
    });
  }, []);

  return (
    <Container>
      <h4 className="title">Departments</h4>
      {departments.map(
        (department: {
          id: number;
          department_name: string;
          image: string;
        }) => (
          <div key={department.id}>
            <Link to={`/department/${department.id}`} className="link">
              {" "}
              {department.department_name}{" "}
            </Link>
          </div>
        )
      )}
      <br />
      <Link to="/department/create" className="add-link">
        {" "}
        Add a new department{" "}
      </Link>
    </Container>
  );
};

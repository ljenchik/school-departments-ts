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
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "better-react-carousel";

export const GetAllDepartments = () => {
  const [departments, setDepartments] = useState<any>([]);

  useEffect(() => {
    getAllDepartments().then((response) => {
      setDepartments(response.departments);
    });
  }, []);

  return (
    <Container >
      <h2 className="title">Departments</h2>
      <br />
      <Carousel cols={4} rows={1} gap={20} loop style={{ margin: "0px" }}>
        {departments.map(
          (department: {
            id: any;
            image: string | undefined;
            department_name: any;
          }) => (
            <Carousel.Item>
              <Link to={`/department/${department.id}`} className="link">
                <div className="link-dep-name">{department.department_name}</div>
                <img src={department.image} className="link-dep-logo"/>
              </Link>
            </Carousel.Item>
          )
        )}

        <Carousel.Item>
          <Link to={`/department/create`} className="link">
            <div className="link-dep-name">Add new department</div>
            <img
              src="https://www.villageofallouezwi.gov/wp-content/uploads/2013/04/departments.jpg"
              className="link-dep-logo"
            />
          </Link>
        </Carousel.Item>
      </Carousel>

      <br />
      {departments.map(
        (department: {
          id: Key | null | undefined;
          department_name:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | ReactFragment
            | ReactPortal
            | null
            | undefined;
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

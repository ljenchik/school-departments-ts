import { useEffect, useState } from "react";
import { getAllDepartments } from "../apiClient";
import { Link } from "react-router-dom";
import "../css/getAllDepartments.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Menu } from "./navbarDefault";

export const GetAllDepartments = () => {
  const [departments, setDepartments] = useState<any>([]);

  useEffect(() => {
    getAllDepartments().then((response) => {
      setDepartments(response.departments);
    });
  }, []);

  return (
    <div>
      <header>
        <Menu />
      </header>
      <main>
        <h2 className="title">Departments</h2>
        <div className="dep-container">
          {departments.map(
            (department: {
              id: any;
              image: string | undefined;
              department_name: any;
            }) => (
              <div className="card h-90">
                <div className="card-body">
                  <Link to={`/department/${department.id}`} className="link">
                    <h4 className="card-title">
                      <div className="link-dep-name">
                        {department.department_name}
                      </div>
                    </h4>
                    <img src={department.image} className="link-dep-logo" />
                  </Link>
                </div>
              </div>
            )
          )}

          <div className="card">
            <div className="card-body">
              <Link to={`/department/create`} className="link">
                <h4 className="card-title">
                  <div className="link-dep-name">Add new department</div>
                </h4>
                <img
                  src="https://www.villageofallouezwi.gov/wp-content/uploads/2013/04/departments.jpg"
                  className="link-dep-logo"
                />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

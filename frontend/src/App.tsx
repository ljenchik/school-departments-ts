import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/App.css';
import { GetAllDepartments } from './components/getAllDepartments';
import { GetAllEmployees } from './components/getAllEmployees';
import { GetDepartmentById } from './components/getDepartmentById';
import { CreateDepartment } from './components/createDepartment';
import { UpdateDepartment } from './components/updateDepartment';
import { Menu } from './components/navbar';
import { CreateEmployee } from "./components/createEmployee";
import { GetEmployeeById } from "./components/getEmployeeById";
import { UpdateEmployee } from "./components/updateEmployee";


const Paths = () => {
  return (
    <Routes>
      <Route path="/" element={<GetAllDepartments />}></Route>
      <Route path="/department/:id" element={<GetDepartmentById />}></Route>
      <Route path="/employee" element={<GetAllEmployees />}></Route>
      {/* <Route path="/employee?from=:from&to=:to" element={<GetAllEmployees />}></Route> */}
      <Route path="/department/create" element={<CreateDepartment />}></Route>
      <Route path="/department/:id/update" element={<UpdateDepartment />}></Route>
      <Route path="/employee/:id" element={<GetEmployeeById />}></Route>
      <Route path="/department/:id/employee/create" element={<CreateEmployee />}></Route>
      <Route path="/employee/:id/update" element={<UpdateEmployee />}></Route>
    </Routes>
  );
};


const App = () => {
  return (
    <Router>
      <Menu />
      <main>
        <Paths />
      </main>
    </Router>
  );
};

export default App;










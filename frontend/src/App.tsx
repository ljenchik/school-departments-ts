import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/App.css';
import { GetAllDepartments } from './components/getAllDepartments';
import { GetAllEmployees } from './components/getAllEmployees';
import { GetDepartmentById } from './components/getDepartmentById';
import { CreateDepartment } from './components/createDepartment';
import { UpdateDepartment } from './components/updateDepartment';
import { Menu } from './components/navbar';


const Paths = () => {
  return (
    <Routes>
      <Route path="/" element={<GetAllDepartments />}></Route>
      <Route path="/department/:id" element={<GetDepartmentById />}></Route>
      <Route path="/employee" element={<GetAllEmployees />}></Route>
      <Route path="/department/create" element={<CreateDepartment />}></Route>
      <Route path="/department/:id/update" element={<UpdateDepartment />}></Route>
     {/* <Route path="/employee/:id" element={<GetEmloyeeById />}></Route> */}
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










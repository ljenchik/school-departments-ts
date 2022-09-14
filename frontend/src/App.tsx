import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/App.css';
import { HomePage } from './components/homePage';
import { GetAllDepartments } from './components/getAllDepartments';
import { GetAllEmployees } from './components/getAllEmployees';
import { GetDepartmentById } from './components/getDepartmentById';
import { CreateDepartment } from './components/createDepartment';
import { UpdateDepartment } from './components/updateDepartment';

const Paths = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/department" element={<GetAllDepartments />}></Route>
      <Route path="/department/:id" element={<GetDepartmentById />}></Route>
      <Route path="/employees" element={<GetAllEmployees />}></Route>
      <Route path="/department/create" element={<CreateDepartment />}></Route>
      <Route path="/department/:id/update" element={<UpdateDepartment />}></Route>
    </Routes>
  );
};


const App = () => {
  return (
    <Router>
      <main>
        <Paths />
      </main>
    </Router>
  );
};

export default App;










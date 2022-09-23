import express, { Request, Response } from "express";
import {
  createDepartment,
  getAllDepartments,
  deleteDepartmentById,
  updateDepartment,
  getDepartmentById,
} from "../repos/departmentRepo";
import {
  createEmployee,
  deleteEmployeeById,
  getAllEmployees,
  getAllEmployeesByDob,
  getEmployeeById,
  getEmployeesByDepartmentId,
  updateEmployee,
} from "../repos/employeeRepo";
import { requestValidation } from "../requestValidation";

const getAge = (dateString: string) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const router = express.Router();

router.post("/department/create", async (req: Request, res: Response) => {
  const requestBody = req.body;
  try {
    const departmentId = await createDepartment(requestBody);
    return res.json({ success: true, id: departmentId, error: "" });
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
});

router.get("/", async (_req: Request, res: Response) => {
  try {
    const departments = await getAllDepartments();
    return res.json({ departments: departments, success: true, error: "" });
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
});

router.get("/department/:id(\\d+)", async (req: Request, res: Response) => {
  var id = parseInt(req.params.id);
  try {
    const response = await getDepartmentById(id);
    const department = response[0];
      if (department.avg === null) {
        department.avg = 0;
      } else {
        department.avg = parseFloat(department.avg.toFixed(2));
      }
      department.count = parseInt(department.count);
      return res.json({ success: true, department: department, error: "" });
  } catch (e) {
    res.status(500);
    return res.send(e);
  }
});

router.delete(
  "/department/:id(\\d+)/delete",
  async (req: Request, res: Response) => {
    var id = parseInt(req.params.id);
    try {
      const response = await getDepartmentById(id);
      if (response[0].count === '0') {
        try {
          await deleteDepartmentById(id);
          return res.json({ success: true, error: "" });
        } catch (e) {
          res.status(500);
          return res.send(e);
        }
      } else {
        res.status(500);
        return res.json({
          success: false,
          error: "You can't delete department with employees",
        });
      }
    } catch (e) {
      res.status(500);
      return res.send(e);
    }
  });

router.put(
  "/department/:id(\\d+)/update",
  async (req: Request, res: Response) => {
    var id = parseInt(req.params.id);
    const requestBody = req.body;
    try {
      await updateDepartment(
        id,
        requestBody.department_name,
        requestBody.image,
        requestBody.updated_at
      );
      return res.json({ success: true, error: "" });
    } catch (error) {
      res.status(500);
      return res.send(error);
    }
  }
);

router.get("/employee", async (_req: Request, res: Response) => {
  try {
    const employees = await getAllEmployees();
    for (var i = 0; i < employees.length; i++) {
      employees[i].age = getAge(employees[i].dob.toLocaleString());
    }
    return res.json({ employees: employees, success: true, error: "" });
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
});

router.get("/employee/:id(\\d+)", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const employee = await getEmployeeById(id);
    employee[0].age = getAge(employee[0].dob.toLocaleString());
    return res.json({success: true, employee: employee, error: ""});
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
});

router.get(
  "/department/:id(\\d+)/employee",
  async (req: Request, res: Response) => {
    var id = parseInt(req.params.id);
    try {
      const employees = await getEmployeesByDepartmentId(id);
      for (var i = 0; i < employees.length; i++) {
        employees[i].age = getAge(employees[i].dob.toLocaleString());
      }
      return res.json({success: true, employees: employees, error: ""});
    } catch (error) {
      res.status(500);
      return res.send(error);
    }
  }
);

router.post(
  "/department/:id/employee/create",
  async (req: Request, res: Response) => {
    const requestBody = req.body;
    var department_id = parseInt(req.params.id);
    var validationResult = requestValidation(requestBody);
    if (!validationResult.success) {
      res.status(500);
      return res.json({success: false,
        id: "",
        department_id: department_id, error: validationResult.error});
    } else {
      try {
        const phone = requestBody.phone.replace(/\s/g, "");
        requestBody.phone =
          phone.slice(0, 3) +
          " " +
          phone.slice(3, 7) +
          " " +
          phone.slice(7, 13);
        const employeeId = await createEmployee(department_id, requestBody);
        return res.json({
          success: true,
          id: employeeId,
          department_id: department_id,
        });
      } catch (e) {
        res.status(500);
        return res.send(e);
      }
    }
  }
);

router.put(
  "/employee/:id(\\d+)/update",
  async (req: Request, res: Response) => {
    var id = parseInt(req.params.id);
    const requestBody = req.body;
    var validationResult = requestValidation(requestBody);
    if (!validationResult.success) {
      res.status(500);
      return res.json(validationResult.error);
    } else {
      try {
        const phone = requestBody.phone.replace(/\s/g, "");
        requestBody.phone =
          phone.slice(0, 3) +
          " " +
          phone.slice(3, 7) +
          " " +
          phone.slice(7, 13);
        await updateEmployee(
          id,
          requestBody.name,
          requestBody.gender,
          requestBody.role,
          requestBody.dob,
          requestBody.address,
          requestBody.phone,
          requestBody.email,
          requestBody.salary,
          requestBody.start_date,
          requestBody.photo,
          requestBody.updated_at
        );
        return res.json({
          success: true,
        });
      } catch (e) {
        res.status(500);
        return res.send(e);
      }
    }
  }
);

router.delete("/employee/:id(\\d+)/delete", async (req, res) => {
  var id = parseInt(req.params.id);
  try {
    await deleteEmployeeById(id);
    return res.json({ success: true, error: "" });
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
});

router.get("/employee/search", async (req, res) => {
  const { from, to } = req.query;
  try {
    var employees = await getAllEmployeesByDob(from, to);
    for (var i = 0; i < employees.length; i++) {
      employees[i].age = getAge(employees[i].dob.toLocaleString());
    }
    return res.json({success: true, employees: employees, error: ""});
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
});

export default router;

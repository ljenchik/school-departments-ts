import express, { Request, Response } from "express";
import { createDepartment, getAllDepartments, getDepartmentById, deleteDepartmentById, updateDepartment } from "../repos/departmentRepo";
import { createEmployee, getAllEmployees, getEmployeeById, deleteEmployeeById, updateEmployee, getEmployeesByDepartmentId } from "../repos/employeeRepo";

const router = express.Router()

  router.post("/department/create", async (req: Request, res: Response) => {
      const requestBody = req.body;
      try {
        const departmentId = await createDepartment(requestBody);
        return res.json({ success: true, id: departmentId, error: "" });
        }
      catch (error) {
        res.status(500);
        return res.send(error);
      }
  });

  router.get("/", async (req: Request, res: Response) => {
    try{
      const departments = await getAllDepartments();
      return res.json({departments: departments, success: true, error: ""});
    }  
    catch (error) {
      res.status(500);
      return res.send(error);
    }
});

  router.get("/department/:id(\\d+)", async (req: Request, res: Response) => {
    var id = parseInt(req.params.id);
    try {
      const department = await getDepartmentById(id);
      return res.json(department);
    }
      catch (error) {
        res.status(500);
        return res.send(error);
      }
  });

  router.delete("/department/:id(\\d+)/delete", async (req: Request, res: Response) => {
    var id = parseInt(req.params.id);
    try {
     await deleteDepartmentById(id);
      return res.json({ success: true, error: "" });
    }
    catch (error) {
      res.status(500);
      return res.send(error);
    }
});


  router.put("/department/:id(\\d+)/update", async (req: Request, res: Response) => {
    var id = parseInt(req.params.id);
    const requestBody = req.body;
    try {
      await updateDepartment(id, requestBody.department_name, requestBody.image, requestBody.updated_at);
      return res.json({ success: true, error: "" });
    }
    catch (error) {
      res.status(500);
      return res.send(error);
    }
});


router.get("/employee",  async (req: Request, res: Response) => {
  const employees = await getAllEmployees();
  for (var i = 0; i < employees.length; i++) {
  }
  return res.json(employees);
});

router.get("/department/:id(\\d+)/employee",  async (req: Request, res: Response) => {
  var id = parseInt(req.params.id);
  const employees = await getEmployeesByDepartmentId(id);
  for (var i = 0; i < employees.length; i++) {
  }
  return res.json(employees);
});

router.get("/employee/:id(\\d+)",  async (req: Request, res: Response) => {
  var id = parseInt(req.params.id);
  var employee = await getEmployeeById(id);
  return res.json(employee);
});

 
router.post("/department/:id/employee/create",  async (req: Request, res: Response) => {
  const requestBody = req.body;
  var department_id = parseInt(req.params.id);
  //var validationResult = requestValidation(requestBody);
  //if (!validationResult.success) {
    //res.status(500);
    //return res.json(validationResult.error);
 // } else {
    //try {
     // const phone = requestBody.phone.replace(/\s/g, '');
      //requestBody.phone = phone.slice(0, 3) + " " + phone.slice(3, 7) + " " + phone.slice(7, 13);
      const employeeId = await createEmployee(department_id, requestBody);
      return res.json({
        success: true,
        employee_id: employeeId,
        department_id: department_id,
      });
  //   } catch (e) {
  //     res.status(500);
  //     return res.send(e.toString());
  //   }
  // }
});

//   app.put("/employee/:id(\\d+)/edit", async (req: Request, res: Response) => {
//     var id = req.params.id;
//     const requestBody = req.body;
//     var validationResult = requestValidation(requestBody);
//     if (!validationResult.success) {
//       res.status(500);
//       return res.json(validationResult.error);
//     } else {
//       try {
//         const phone = requestBody.phone.replace(/\s/g, '');
//         requestBody.phone = phone.slice(0, 3) + " " + phone.slice(3, 7) + " " + phone.slice(7, 13);
//         await updateEmployee(
//           id,
//           requestBody.name,
//           requestBody.role,
//           requestBody.dob,
//           requestBody.address,
//           requestBody.phone,
//           requestBody.email,
//           requestBody.salary,
//           requestBody.start_date,
//           requestBody.photo
//         );
//         return res.json({
//           success: true,
//         });
//       } catch (e) {
//         res.status(500);
//         return res.send(e.toString());
//       }
//     }
//   });


//   app.delete("/employee/:id(\\d+)/delete", async (req: Request, res: Response) => {
//     var id = req.params.id;
//     await deleteEmployeeById(id);
//     res.sendStatus(200);
//   });


export default router;

import express, { Request, Response } from "express";
import { createDepartment, getAllDepartments,  deleteDepartmentById, updateDepartment, getDepartmentById } from "../repos/departmentRepo";
import { getAllEmployees, getEmployeeById} from "../repos/employeeRepo";
import { Employee } from "../responseModels/employeeModel";

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

  router.get("/", async (_: Request, res: Response) => {
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


router.get("/employee", async (_req : Request, res: Response) => {
  try{
    const employees = await getAllEmployees();
    return res.json({employees: employees, success: true, error: ""});
  }  
  catch (error) {
    res.status(500);
    return res.send(error);
  }
});

 router.get("/employee/:id(\\d+)",  async (req: Request, res: Response) => {
   const id = parseInt(req.params.id);
   try {
    const employee: Employee[] = await getEmployeeById(id);
    return res.json(employee);
   }
    catch (error) {
      res.status(500);
      return res.send(error);
    }
});



// router.get("/department/:id(\\d+)/employee",  async (req: Request, res: Response) => {
//   var id = parseInt(req.params.id);
//   const employees = await getEmployeesByDepartmentId(id);
//   for (var i = 0; i < employees.length; i++) {
//   }
//   return res.json(employees);
// });


// router.post("/department/:id/employee/create",  async (req: Request, res: Response) => {
//   const requestBody = req.body;
//   var department_id = parseInt(req.params.id);
//   //var validationResult = requestValidation(requestBody);
//   //if (!validationResult.success) {
//     //res.status(500);
//     //return res.json(validationResult.error);
//  // } else {
//     //try {
//      // const phone = requestBody.phone.replace(/\s/g, '');
//       //requestBody.phone = phone.slice(0, 3) + " " + phone.slice(3, 7) + " " + phone.slice(7, 13);
//       const employeeId = await createEmployee(requestBody);
//       return res.json({
//         success: true,
//         employee_id: employeeId,
//         department_id: department_id
//       });
//   //   } catch (e) {
//   //     res.status(500);
//   //     return res.send(e.toString());
//   //   }
//   // }
// });


export default router;



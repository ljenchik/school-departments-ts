import express, { Request, Response } from "express";
import { createDepartment, getAllDepartments, getDepartmentById, deleteDepartmentById, updateDepartment } from "../repos/departmentRepo";

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

export default router;

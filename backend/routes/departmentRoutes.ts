import express, { Request, Response } from "express";
import { createDepartment, getAllDepartments, getDepartmentById, deleteDepartmentById, updateDepartmentName } from "../repos/departmentRepo";



const router = express.Router()

  router.post("/department/create", async (req: Request, res: Response) => {
    const requestBody = req.body;
      const departmentId = await createDepartment(requestBody);
      return res.json({ success: true, id: departmentId, error: "" });
  });

  router.get("/", async (req: Request, res: Response) => {
      const departments = await getAllDepartments();

      return res.json(departments);
  });

  router.get("/department/:id(\\d+)", async (req: Request, res: Response) => {
    var id = parseInt(req.params.id);
      let department = await getDepartmentById(id);
      department = department[0];
      department.created_at = department.created_at.toISOString().split('T')[0];
      department.updated_at = department.updated_at.toISOString().split('T')[0];
      return res.json(department);
  });

  router.delete("/department/:id(\\d+)/delete", async (req: Request, res: Response) => {
    var id = parseInt(req.params.id);
    await deleteDepartmentById(id);
    return res.json({ success: true, error: "" });
  });

  router.put("/department/:id(\\d+)/update", async (req, res) => {
    var id = parseInt(req.params.id);
    const requestBody = req.body;
      await updateDepartmentName(id, requestBody.department_name, requestBody.image, requestBody.updated_at);
      return res.json({ success: true, error: "" });
  });

export default router;

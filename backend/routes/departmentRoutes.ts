import express, { Request, Response } from "express";
import { createDepartment, getAllDepartments } from "../repos/departmentRepo";

  const router = express.Router()

  router.post("/department/create", async (req: Request, res: Response) => {
    const requestBody = req.body;
      const departmentId = await createDepartment(requestBody.department_name);
      return res.json({ success: true, id: departmentId, error: "" });
  });

  router.get("/", async (req: Request, res: Response) => {
      const departments = await getAllDepartments();
      return res.json(departments);
  });







export default router;

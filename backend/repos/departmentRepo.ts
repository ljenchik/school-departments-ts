import { knex } from "./database";
import { Department } from "../models/departmentModel";
import moment from "moment";

export async function getAllDepartments(): Promise<Department[]> {
  return await knex("department").orderBy("department.department_name");
}

export async function getDepartmentById(id: number): Promise<Department[]> {
  return await knex("department").where("id", id);
}

export async function createDepartment(department: {
  department_name: string;
  image: string;
  created_at: moment.Moment;
}): Promise<void> {
  const id = await knex("department")
    .insert({
      department_name: department.department_name,
      image: department.image,
    })
    .returning("id");
  return id[0].id;
}

export async function updateDepartment(
  id: number,
  department_name: string,
  image: string,
  updated_at: string
): Promise<number> {
  return await knex("department")
    .update({ department_name, image, updated_at })
    .where("id", id);
}

export async function deleteDepartmentById(id: number): Promise<void> {
  await knex("department").where("department.id", id).del();
}

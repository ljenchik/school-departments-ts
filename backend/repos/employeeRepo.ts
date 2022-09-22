import { knex } from "./database";
import { GetEmployee, CreateEmployee} from "../models/employeeModel";

export async function getAllEmployees(): Promise<GetEmployee[]> {
    return (
      await knex.raw(
        "select e.*, d.department_name from employee e\
      join department d on e.department_id=d.id order By e.name"
      )
    ).rows;
  }

export async function getEmployeeById(id: number): Promise<GetEmployee[]> {
  return (
    await knex.raw(
      "select e.*, d.department_name from employee e\
        join department d on d.id=e.department_id\
        where e.id= " +
        id
    )
  ).rows;
}

export async function getEmployeesByDepartmentId(id: number):Promise<GetEmployee[]> {
  return (
    await knex.raw(
      "select e.*, d.department_name from employee e\
    join department d on d.id=e.department_id\
    where e.department_id= " +
        id +
        "order By e.name"
    )
  ).rows;
 }

export async function createEmployee(department_id: number, employee: CreateEmployee): Promise<void> {
  const id = await knex("employee")
    .insert({
      name: employee.name,
      role: employee.role,
      dob: employee.dob,
      address: employee.address,
      phone: employee.phone,
      email: employee.email,
      start_date: employee.start_date,
      salary: employee.salary,
      photo: employee.photo,
      department_id: department_id,
    })
    .returning("id");

  return id[0].id;
}

export async function updateEmployee(
  id: number,
  name: string,
  role: string,
  dob: Date,
  address: string,
  phone: string,
  email: string,
  salary: number,
  start_date: Date,
  photo: string,
  updated_at: string
) {
  return await knex("employee")
    .update({
      name,
      role,
      dob,
      address,
      phone,
      email,
      salary,
      start_date,
      photo,
      updated_at
    })
    .where({ id });
}

export async function deleteEmployeeById(id: number): Promise<void> {
  await knex("employee").where("id", id).del();
}

export async function getAllEmployeesByDob(start_date: any, end_date: any): Promise<GetEmployee[]> {
  return (
    await knex.raw(
      "select e.*, d.department_name from employee e join department d on d.id=e.department_id\
        WHERE dob >= '" +
        start_date +
        "'::date AND dob <= '" +
        end_date +
        "'::date"
    )
  ).rows;
}

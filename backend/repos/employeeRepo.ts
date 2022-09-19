import { knex } from "./database";
import { Employee } from "../responseModels/employeeModel";

export async function getAllEmployees(): Promise<Employee[]> {
    return (
      await knex.raw(
        "select e.*, d.department_name from employee e\
      join department d on e.department_id=d.id order By e.name"
      )
    ).rows;
  }

export async function getEmployeeById(id: number): Promise<Employee[]> {
  return (
    await knex.raw(
      "select e.*, d.department_name from employee e\
        join department d on d.id=e.department_id\
        where e.id= " +
        id
    )
  ).rows;
}

// export async function getEmployeesByDepartmentId(id: string | number):Promise<Employee[]> {
//   return (
//     await knex.raw(
//       "select e.*, d.department_name from employee e\
//     join department d on d.id=e.department_id\
//     where e.department_id= " +
//         id +
//         "order By e.name"
//     )
//   ).rows;
// }

// export async function createEmployee(employee: Employee): Promise<void> {
//   const id = await knex("employee")
//     .insert({
//       name: employee.name,
//       role: employee.role,
//       dob: employee.dob,
//       address: employee.address,
//       phone: employee.phone,
//       email: employee.email,
//       start_date: employee.start_date,
//       salary: employee.salary,
//       photo: employee.photo,
//       department_id: employee.department_id,
//       updeated_at: ""
//     })
//     .returning("id");

//   return id[0].id;
// }

// // export async function updateEmployee(
// //     employee: Employee): Promise<void> {
// //   return await knex("employee")
// //     .update({name,
// //         role,
// //       dob,
// //       adcdress,
// //       phone,
// //       email,
// //       salary,
// //       start_date,
// //       updated_at,
// //       photo
// //     })
// //     .where({ id });
// // }

// export async function deleteEmployeeById(id: number): Promise<void> {
//   await knex("employee").where("id", id).del();
// }

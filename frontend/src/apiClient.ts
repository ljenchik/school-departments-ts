import { CreateDepartmentForm, UpdateDepartmentForm } from "./requestModels/departmentModels";
const baseurl = process.env["REACT_APP_BACKEND_DOMAIN"];


export async function getAllDepartments() {
  const response = await fetch(`${baseurl}`);
  console.log(response);
  return await response.json();
}

export async function getDepartmentById(id: number) {
  const response = await fetch(`${baseurl}/department/${id}`);
  return await response.json();
}

export async function createDepartment(department: CreateDepartmentForm) {
      const response = await fetch(`${baseurl}/department/create`, {
        method: "POST",
        body: JSON.stringify(department),
        headers: {
          "Content-Type": "application/json",
        },
      });
        const data = await response.json();
        return { success: true, id: data.department_id, error: "" };
  }
  
  export async function updateDepartment(id: number, updatedDepartment: UpdateDepartmentForm) {
      const response = await fetch(`${baseurl}/department/${id}/update`, {
        method: "PUT",
        body: JSON.stringify(updatedDepartment),
        headers: {
          "Content-Type": "application/json",
        },
      });
        const data = await response.json();
          return { success: true, error: "" };
  }
  
  export async function deleteDepartmentById(id: number) {
    try {
      const response = await fetch(`${baseurl}/department/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return { success: true, error: "" };
      } else {
        const error = await response.text();
        return { success: false, error: error };
      }
    } catch (e) {
      return { success: false, error: e };
    }
  }
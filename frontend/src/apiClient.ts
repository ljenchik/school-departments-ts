import {
  CreateDepartmentForm,
  UpdateDepartmentForm,
} from "./models/departmentModels";
import { Employee, UpdateEmployeeForm } from "./models/employeeModel";

const baseurl = process.env["REACT_APP_BACKEND_DOMAIN"];

export async function getAllDepartments() {
  try {
    const response = await fetch(`${baseurl}`);
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        return {
          departments: data.departments,
          success: data.success,
          error: data.error,
        };
      } else {
        return {
          departments: [],
          success: false,
          error: "There are no departments",
        };
      }
    } else {
      const error = await response.text();
      return { departments: [], success: false, error: error };
    }
  } catch (e) {
    return { departments: [], success: false, error: e };
  }
}

export async function getDepartmentById(id: number) {
  try {
    const response = await fetch(`${baseurl}/department/${id}`);
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        return { success: true, department: data.department, error: "" };
      } else {
        return {
          success: false,
          department: {},
          error: "Error occured while getting department data",
        };
      }
    } else {
      const error = await response.text();
      return { success: false, department: {}, error: error };
    }
  } catch (e) {
    return { success: false, department: {}, error: e };
  }
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

export async function updateDepartment(
  id: number,
  updatedDepartment: UpdateDepartmentForm
) {
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

export async function getAllEmployees() {
  try {
    const response = await fetch(`${baseurl}/employee`);
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        return {
          employees: data.employees,
          success: data.success,
          error: data.error,
        };
      } else {
        return {
          employees: [],
          success: false,
          error: "There are no employees",
        };
      }
    } else {
      const error = await response.text();
      return { employees: [], success: false, error: error };
    }
  } catch (e) {
    return { employees: [], success: false, error: e };
  }
}

export async function getEmployeeById(id: number) {
  const response = await fetch(`${baseurl}/employee/${id}`);
  return await response.json();
}

export async function getEmployeesByDepartmentId(id: number) {
  const response = await fetch(`${baseurl}/department/${id}/employee`);
  return await response.json();
}

export async function createEmployee(
  department_id: number,
  employee: Employee
) {
  try {
    const response = await fetch(
      `${baseurl}/department/${department_id}/employee/create`,
      {
        method: "POST",
        body: JSON.stringify(employee),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (!data.success) {
        return {
          success: false,
          error: data.error,
          department_id: department_id,
          id: null,
        };
      } else {
        console.log(data);
        return {
          success: true,
          error: "",
          department_id: department_id,
          id: data.id,
        };
      }
    } else {
      const error = await response.text();
      return {
        success: false,
        id: null,
        department_id: department_id,
        error: error,
      };
    }
  } catch (e) {
    return { success: false, id: null, department_id: department_id, error: e };
  }
}

export async function updateEmployee(
  id: number,
  updatedEmployee: UpdateEmployeeForm
) {
  try {
    const response = await fetch(`${baseurl}/employee/${id}/update`, {
      method: "PUT",
      body: JSON.stringify(updatedEmployee),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (!data.success) {
        return {
          success: false,
          error: data.error,
        };
      } else {
        return {
          success: true,
          error: "",
        };
      }
    } else {
      const error = await response.text();
      return { success: false, error: error };
    }
  } catch (e) {
    return { success: false, error: e };
  }
}

export async function deleteEmployeeById(id: number) {
  try {
    const response = await fetch(`${baseurl}/employee/${id}/delete`, {
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

export async function getAllEmployeesByDob(from: any, to: any) {
  const response = await fetch(`${baseurl}/employee/search?from=${from}&to=${to}`);
  return await response.json();
}


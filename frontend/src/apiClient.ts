const baseurl = process.env["REACT_APP_BACKEND_DOMAIN"];

export async function getAllDepartments() {
  const response = await fetch(`${baseurl}`);
  return await response.json();
}

export async function getDepartmentById(id: number) {
  const response = await fetch(`${baseurl}/department/${id}`);
  return await response.json();
}


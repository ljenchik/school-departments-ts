import { ReactNode } from "react";

export interface Employee {
    id : number | null,
    name: string;
    role: string;
    dob: string;
    address: string;
    phone: string;
    email: string;
    start_date: string;
    salary: string;
    photo: string;
    updated_at: string;
    created_at: string;
    department_id: number;
    department_name: string;
}

  
export interface UpdateEmployeeForm {
  name: string;
  role: string;
  dob: Date | string;
  address: string;
  phone: string;
  email: string;
  start_date: Date | string;
  salary: string | number ;
  photo: string;
  updated_at: string;
  }
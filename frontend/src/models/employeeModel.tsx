import { ReactNode } from "react";

export interface Employee {
    id : number,
    name: string;
    role: string;
    dob: string;
    address: string;
    phone: string;
    email: string;
    start_date: string;
    salary: number;
    photo: string;
    updated_at: string;
    created_at: string;
    department_id: number;
    department_name: string;
}

export interface CreateEmployeeForm {
  name: string;
  role: string;
  dob: string | number | readonly string[] | undefined;
  address: string;
  phone: string;
  email: string;
  start_date: string | number | readonly string[] | undefined
  salary: string | number | readonly string[] | undefined;
  photo: string;
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
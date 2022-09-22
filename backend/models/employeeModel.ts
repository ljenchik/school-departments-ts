import moment from "moment";

  //Model for create employee 
  export interface CreateEmployee {
    name: string;
    role: string;
    dob: Date;
    address: string;
    phone: string;
    email: string;
    start_date: Date;
    salary: number;
    photo: string;
    gender: string;
    created_at: moment.Moment;
  }

  //Model for get employee 
  export interface GetEmployee {
    id: number;
    name: string;
    gender: string;
    role: string;
    dob: Date | string;
    address: string;
    phone: string;
    email: string;
    start_date: Date | string;
    salary: number;
    photo: string;
    age: number;
    created_at: string;
    updated_at: string | null;
    department_id: number;
  }
import moment from "moment";

  //Model for employee 
  export interface Employee {
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
    created_at: moment.Moment;
    updated_at: string | null;
    department_id: number;
  }
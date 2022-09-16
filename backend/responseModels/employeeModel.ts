import moment from "moment";

  export interface Employee {
    name: string;
    role: string;
    dob: Date;
    address: string;
    phone: string;
    email: string;
    start_date: Date;
    salary: number;
    photo: string;
    updated_at: string;
    created_at: moment.Moment;
  }
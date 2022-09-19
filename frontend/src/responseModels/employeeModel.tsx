export interface Employee {
    id : number,
    name: string;
    role: string;
    dob: Date;
    address: string;
    phone: string;
    email: string;
    start_date: Date;
    salary: number;
    photo: string;
    updated_at: string | null;
    created_at: string | null;
    department_id: number;
    department_name: string;
  }
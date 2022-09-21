import moment from "moment";

export interface Department {
    id : number,
    department_name: string;
    image: string;
    created_at: moment.Moment;
    updated_at: moment.Moment;
}

export interface DepartmentEmployee {
    id : number,
    department_name: string;
    image: string;
    created_at: moment.Moment;
    updated_at: moment.Moment;
    employee_count: number | string | null;
    avg_salary: number |string | null;
}
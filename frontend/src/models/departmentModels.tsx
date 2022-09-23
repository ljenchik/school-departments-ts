export interface Department {
    id : number | null | string,
    department_name: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface DepartmentEmployee {
    id : number | null,
    department_name: string;
    image: string;
    created_at: string;
    updated_at: string;
    count: number;
    avg: number
}

export interface CreateDepartmentForm {
    department_name: string;
    image: string;
}

export interface UpdateDepartmentForm {
    department_name: string;
    image: string;
    updated_at: string;
}


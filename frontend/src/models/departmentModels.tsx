export interface Department {
    id : number,
    department_name: string;
    image: string;
    created_at: string;
    updated_at: string;
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


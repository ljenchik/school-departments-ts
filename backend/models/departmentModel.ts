import moment from "moment";

export interface Department {
    id : number,
    department_name: string;
    image: string;
    created_at: moment.Moment;
    updated_at: moment.Moment;
}
import moment from "moment";
import { Employee } from "./models/employeeModel";

export function requestValidation(request: Employee) {
  const date1 = moment(request.dob, "YYYY-MM-DD");
  const date2 = moment(request.start_date, "YYYY-MM-DD");

  const emailFormat =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (
    !request.name &&
    !request.role &&
    !request.dob &&
    !request.address &&
    !request.phone &&
    !request.email &&
    !request.start_date &&
    !request.salary &&
    !request.photo
  ) {
    return { success: false, error: "Fill in all required information" };
  }

  if (!request.name) {
    return { success: false, error: "Enter employee name" };
  }

  if (!request.gender || request.gender === "Choose gender") {
    return { success: false, error: "Choose employee gender" };
  }

  if (!request.role) {
    return { success: false, error: "Enter employee role" };
  }

  if (!date1.isValid() && !date2.isValid()) {
    return { success: false, error: "Invalid dates" };
  }

  if (!date1.isValid()) {
    return { success: false, error: "Invalid date of birth" };
  }

  if (!date2.isValid()) {
    return { success: false, error: "Invalid hiring date" };
  }
  const years = moment(date2).diff(date1, "year");
  if (years < 18) {
    return {
      success: false,
      error: "Check the dates. Employee must be over 18 years old",
    };
  }
  if (years > 100) {
    return {
      success: false,
      error: "Check the dates. Employee must be less than 100 years old",
    };
  }

  if (!request.address) {
    return { success: false, error: "Empty address" };
  }

  if (!request.phone) {
    return { success: false, error: "Empty phone number" };
  }

  const phone = request.phone.replace(/\s/g, "");
  const pattern = /^\d+$/;

  if (!pattern.test(phone.slice(1))) {
    return { success: false, error: "Phone number must contain only digits" };
  }

  if (phone.length !== 13 || phone.slice(0, 3) !== "+44") {
    return {
      success: false,
      error: "Enter phone number in format +44 xxxx xxxxxx",
    };
  }

  if (!request.email) {
    return { success: false, error: "Empty email address" };
  }

  if (!emailFormat.test(request.email)) {
    return { success: false, error: "Invalid email address" };
  }

  if (!request.salary) {
    return { success: false, error: "Empty salary" };
  }

  return { success: true, error: "" };
}

# School Departments

## Description

School Departments is a school employees and departments managing application, which displays a list of school departments, the number of employees and average salary for each of these departments. It displays a list of employees, searches employees born on a specific date or in the period between two given dates as well as adds, edits and deletes departments and employees

## Required software

- Docker
- Node.js

 ## To run the application

 From command line, clone and start the backend
 
```bash
 git clone git@github.com:ljenchik/school-departments-ts.git
 cd school-departments-ts/backend/database
 docker-compose up -d 
 npm install
 knex migrate:latest
 npm start
```

Open second terminal to start the frontend

```
cd my-mars-mission/frontend
npm install
npm start
```

## Usage

### Home Page


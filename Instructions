Frontend
To start a new Create React App project with TypeScript run:
npx create-react-app frontend --template typescript

Backend
1. Create folder backend

2. In backend folder run: 
    npm init -y
    npm i express knex pg

'''
    express — creates our restful API
    knex — javascript SQL query builder (makes development easier as a javascript developer).
    pg — client to connect and talk to your Postgres database
'''

3. In backend folder create index.ts file with the following content:
'''
    const express = require('express')
    const port = process.env.PORT || 3001;
    const app = express()

    app.get('/', (req, res) => {
    res.send('Hello from backend!')
    })
    app.listen(port, () => console.log(`Listening on port ${port}.`))
'''

4. In backend folder create database folder and file knexfile.ts by running knex init. Change file to look like this:
'''
    /**
    * @type { Object.<string, import("knex").Knex.Config> }
    */
    require('ts-node/register');
    const environment = process.env.NODE_ENV || 'development'
    module.exports = {

    development: {
        client: "pg",
        connection: {
        database: "School",
        user:     "Olena",
        password: "1234"
        }
    }
    };
'''

5. Create file docker-compose.yml and migrations folder inside backend folder.
'''
    Content of docker-compose.yml:
        version: "3.9"

        services:
        postgres:
            image: postgres
            environment:
            - POSTGRES_PASSWORD=1234
            - POSTGRES_USER=Olena
            - POSTGRES_DB=School-ts
            ports:
            - "5432:5432"
'''

6. Start docker container docker-compose up -d

7. In PgAdmin4 create database School-ts

8. In backend folder run: 
npm i express body-parser knex nodemon 
npm install --save-dev ts-node typescript

9. Add to scripts to package.json: 
"start": "NODE_ENV=development nodemon index.ts"

10. npm start works from backend folder

11. In database folder run:
    knex migrate:make create_department_table

14. Add to scripts in package.json:
    "migrate": "knex migrate:latest --knexfile db/knexfile.ts"

15. npm run migrate





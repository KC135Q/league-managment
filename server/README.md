# ABAC Basic
- Initial look at Attribute Based Access Control (ABAC)
- [GitHub Repo](https://github.com/KC135Q/abac-basic)
- [GitHub Project](https://github.com/users/KC135Q/projects/18)

# For Production
- Need a schema on the database, currently using `member_schema`

# Getting started
- `npm i`
- `npm run seed`
  - **NOTE** This will drop all data and schema currently in the database
  - npm run seed should only be run first time through
- `npm start` or `npm run dev` **dev** uses `nodemon` to restart the server on code change
- Server is then available on [localhost](http://localhost:3001/api/users) <-- this will return a list of all users

## PostgreSQL
- Using Docker `docker run --name postgres-container -e POSTGRES_PASSWORD=rootroot -d -p 5432:5432 postgres`
- From your root directory, recreate the database locally using docker, `docker cp ./db/create-db.sql postgres-container:/create-db.sql`
- To enter the docker postgres command line: `docker exec -it postgres-container bash`
- Then execute the script: `psql -U postgres -d postgres -a -f /create-db.sql`

## Auth
- Generate a pseudo random JWT Secret Key using this code snippet `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))`

#### Diagrams
- Current ERD
![ABAC Basic v0.1](./docs/images/abac-basic-v0.1.png)
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "241455PostgreSQL",
    database: "auth_todo_list",
    host: "localhost",
    port: "5432"
});

module.exports = pool;
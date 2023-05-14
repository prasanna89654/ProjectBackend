import pkg from 'pg';
const {Pool} = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Complaintdb',
    password: 'Prasanna@789',
    port: 5432,


})


    export default pool;


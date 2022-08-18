// // const mysql = require('mysql');

// // // connection pool
// // const pool = mysql.createPool({
// //     connectionLimit : 10,
// //     port : process.env.DB_PORT,
// //     host : process.env.DB_HOST,
// //     user : process.env.DB_USER,
// //     password : process.env.DB_PASS,
// //     database : process.env.MYSQL_DB
// // });

// // pool.getConnection((err, connection) => {
// //     if (err) throw err;
// //     console.log(`Database Connected at ID ${connection.threadId}`);
// // });

// // module.exports = pool;

// const mysql = require('mysql');

// // connection pool
// const pool = mysql.createPool({
//     connectionLimit : 10,
//     port : process.env.DB_PORT,
//     host : process.env.DB_HOST,
//     user : process.env.DB_USER,
//     password : process.env.DB_PASS,
//     database : process.env.MYSQL_DB
// });

// pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log(`Database Connected at ID ${connection.threadId}`);
// });

// module.exports = pool;
const mysql = require('mysql');

// connection pool
const pool = mysql.createPool({
    connectionLimit : 10,
    port : process.env.DB_PORT,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.MYSQL_DB
});

pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Database Connected at ID ${connection.threadId}`);
});

module.exports = pool;

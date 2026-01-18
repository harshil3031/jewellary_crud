// // connect postgresql database
// import pg from 'pg'; // import pg module it allows to nodejs app to talk to postgresql database it contains pool,client,query etc
// const { Pool } = pg; // pool is a connection pool manager it creates a set of reusable connections to the database

// const pool = new Pool({ // create a new pool instance with the database connection configuration
//   user: 'postgres', // database username
//   host: 'localhost', // database host
//   database: 'jewellary_db', // database name
//   password: 'Harsh@123', // database password
//   port: 5432, // database port
// });

// //check connection
// pool.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database', err);
//   } else {
//     console.log('Connected to the PostgreSQL database');
//   }
// });

// export default pool;

// connect postgresql database using sequelize
import { Sequelize } from 'sequelize'; // sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.

const sequelize = new Sequelize('jewellary_db', 'postgres', 'Harsh@123', {
    host: 'localhost',
    dialect: 'postgres', // specify the database dialect(postgres,mysql,sqlite,mariadb,mssql)
    port: 5432
});

// check connection
sequelize.authenticate() // use for checking connection
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;
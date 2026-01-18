// // create jewellary model module for postgresql
// import pool from '../config/db.js';

// // create jewellary table
// const createJewellaryTable = async () => {
//   const queryText = `
//     CREATE TABLE IF NOT EXISTS jewellaries (
//       id SERIAL PRIMARY KEY, 
//       name VARCHAR(100) NOT NULL, 
//       type VARCHAR(100) NOT NULL, 
//       price DECIMAL(10, 2) NOT NULL, 
//       material VARCHAR(100), 
//       weight DECIMAL(10, 2), 
//       image_url VARCHAR(255), 
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
//   `;
//   try {
//     await pool.query(queryText);
//     console.log('Jewellary table created successfully');
//   } catch (err) {
//     console.error('Error creating jewellary table', err);
//   }
// };

// createJewellaryTable();

// export default pool;

// create sequelize jewellary model module for postgresql
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// define jewellary model
const Jewellary = sequelize.define('Jewellary', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  material: {
    type: DataTypes.STRING,
  },
  weight: {
    type: DataTypes.DECIMAL(10, 2),
  },
  image_url: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'jewellaries',
  timestamps: false,
});

// sync the model with the database
Jewellary.sync()
  .then(() => {
    console.log('Jewellary table created successfully');
  })
  .catch((err) => {
    console.error('Error creating jewellary table', err);
    });

export default Jewellary;
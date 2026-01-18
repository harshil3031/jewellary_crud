// create sequelize user model module for postgresql
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// define user model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  phoneno: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
}, {
  tableName: 'users',
  timestamps: false,
});

// sync the model with the database
User.sync({})
  .then(() => {
    console.log('User table created successfully');
  })
  .catch((err) => {
    console.error('Error creating user table', err);
  });

export default User;
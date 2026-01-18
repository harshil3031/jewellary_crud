// create order model module using sequelize for postgresql
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// define order model
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jewellaryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  orderDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'orders',
  timestamps: false,
});

// sync the model with the database
Order.sync()
  .then(() => {
    console.log('Order table created successfully');
  })
  .catch((err) => {
    console.error('Error creating order table', err);
  });


export default Order;
import express from 'express';
import db from './config/db.js';
//import user from './model/user.model.js'; // Ensure user model is loaded
import jewellary from './model/jewellary.model.js'; // Ensure jewellary model is loaded
import userRoutes from './routes/user.route.js'; // Import user routes
import Order from './model/order.model.js';
import jewellaryRoutes from './routes/jewellary.route.js';
import orderRoutes from './routes/order.route.js';
db; // Ensure database connection is established

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use user routes
app.use('/api/v1/', userRoutes);
app.use('/api/v2/', jewellaryRoutes);
app.use('/api/v3/', orderRoutes);
app.use('/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});
// add associations
jewellary.hasMany(Order, { foreignKey: 'jewellaryId' });
Order.belongsTo(jewellary, { foreignKey: 'jewellaryId' });

// sync all models
// db.sync({ force: true }) // use force: true only in development to reset tables
db.sync()
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((err) => {
    console.error('Error synchronizing models', err);
  });
export default app;
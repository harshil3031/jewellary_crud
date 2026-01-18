// create order routes module
import express from 'express';
import {
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} from '../controller/order.controller.js';

const router = express.Router();

// Route to create a new order
router.post('/orders', async (req, res) => {
  try {
    const newOrder = await createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get an order by ID
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update an order by ID
router.put('/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await updateOrderById(req.params.id, req.body);
    if (updatedOrder) {
      res.json(updatedOrder);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to delete an order by ID
router.delete('/orders/:id', async (req, res) => {
  try {
    const deletedOrder = await deleteOrderById(req.params.id);
    if (deletedOrder) {
      res.json(deletedOrder);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;  
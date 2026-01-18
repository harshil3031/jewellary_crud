// user routes
import express from 'express';
import { createUser, getUserById, updateUserById, deleteUserById } from '../controller/user.controller.js';

const router = express.Router();

// Route to create a new user
router.post('/users', async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update a user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await updateUserById(req.params.id, req.body);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await deleteUserById(req.params.id);
    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
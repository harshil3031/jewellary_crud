// create jewellary route module
import express from 'express';
import {
  createJewellary,
  getAllJewellaries,
  getJewellaryById,
  updateJewellaryById,
  deleteJewellaryById,
} from '../controller/jewellary.controller.js';
import { adminAuthMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Define jewellary routes
router.post('/jewellaries', adminAuthMiddleware, async (req, res) => {
  try {
    const newJewellary = await createJewellary(req.body);
    res.status(201).json(newJewellary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/jewellaries', async (req, res) => {
  try {
    const jewellaries = await getAllJewellaries();
    res.json(jewellaries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/jewellaries/:id', async (req, res) => {
  try {
    const jewellary = await getJewellaryById(req.params.id);
    if (jewellary) {
      res.json(jewellary);
    } else {
      res.status(404).json({ error: 'Jewellary not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/jewellaries/:id', adminAuthMiddleware, async (req, res) => {
  try {
    console.log(req.body)
    const updatedJewellary = await updateJewellaryById(req.params.id, req.body);
    console.log("updated jewellary:",updatedJewellary);
    if (updatedJewellary) {
      res.json(updatedJewellary);
    } else {
      res.status(404).json({ error: 'Jewellary not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/jewellaries/:id', adminAuthMiddleware, async (req, res) => {
  try {
    const deletedJewellary = await deleteJewellaryById(req.params.id);
    if (deletedJewellary) {
      res.json(deletedJewellary);
    } else {
      res.status(404).json({ error: 'Jewellary not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
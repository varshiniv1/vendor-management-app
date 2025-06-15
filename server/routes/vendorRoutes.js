import express from 'express';
import Vendor from '../models/Vendor.js';

const router = express.Router();

// GET all vendors with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const vendors = await Vendor.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Vendor.countDocuments();
    res.json({ vendors, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET vendor by ID
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    res.json(vendor);
  } catch (err) {
    res.status(404).json({ message: 'Vendor not found' });
  }
});

// POST new vendor
router.post('/', async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    const saved = await vendor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update vendor
router.put('/:id', async (req, res) => {
  try {
    const updated = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE vendor
router.delete('/:id', async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vendor deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Vendor not found' });
  }
});

export default router;
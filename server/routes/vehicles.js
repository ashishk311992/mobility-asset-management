import express from 'express';
import { body, param } from 'express-validator';
import db from '../db/index.js';
import { checkPermission } from '../middleware/auth.js';

const router = express.Router();

// Get all vehicles
router.get('/',
  checkPermission('view:fleet'),
  (req, res) => {
    try {
      const vehicles = db.prepare('SELECT * FROM vehicles ORDER BY created_at DESC').all();
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Get vehicle by ID
router.get('/:id',
  checkPermission('view:fleet'),
  param('id').isInt(),
  (req, res) => {
    try {
      const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Create new vehicle
router.post('/',
  checkPermission('manage:fleet'),
  [
    body('make').notEmpty(),
    body('model').notEmpty(),
    body('year').isInt(),
    body('status').isIn(['active', 'maintenance', 'retired']),
    body('ownership_type').isIn(['owned', 'leased', 'rented']),
    body('mileage').isInt()
  ],
  (req, res) => {
    try {
      const { make, model, year, status, ownership_type, mileage } = req.body;
      
      const result = db.prepare(`
        INSERT INTO vehicles (make, model, year, status, ownership_type, mileage)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(make, model, year, status, ownership_type, mileage);

      res.status(201).json({ id: result.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Update vehicle
router.put('/:id',
  checkPermission('manage:fleet'),
  [
    param('id').isInt(),
    body('status').optional().isIn(['active', 'maintenance', 'retired']),
    body('mileage').optional().isInt()
  ],
  (req, res) => {
    try {
      const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }

      const updates = Object.entries(req.body)
        .filter(([key]) => ['status', 'mileage', 'last_service', 'next_service'].includes(key))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

      const setClauses = Object.keys(updates).map(key => `${key} = ?`).join(', ');
      const values = [...Object.values(updates), req.params.id];

      db.prepare(`UPDATE vehicles SET ${setClauses} WHERE id = ?`).run(...values);

      res.json({ message: 'Vehicle updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);
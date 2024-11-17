import express from 'express';
import { body, param } from 'express-validator';
import db from '../db/index.js';
import { checkPermission } from '../middleware/auth.js';

const router = express.Router();

// Get all maintenance records
router.get('/',
  checkPermission('view:maintenance'),
  (req, res) => {
    try {
      const records = db.prepare(`
        SELECT m.*, v.make, v.model 
        FROM maintenance_records m
        JOIN vehicles v ON m.vehicle_id = v.id
        ORDER BY m.date DESC
      `).all();
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Create maintenance record
router.post('/',
  checkPermission('manage:maintenance'),
  [
    body('vehicle_id').isInt(),
    body('type').isIn(['routine', 'repair', 'emergency']),
    body('description').notEmpty(),
    body('cost').isFloat(),
    body('provider').notEmpty(),
    body('date').isISO8601()
  ],
  (req, res) => {
    try {
      const { vehicle_id, type, description, cost, provider, date } = req.body;
      
      const result = db.prepare(`
        INSERT INTO maintenance_records (vehicle_id, type, description, cost, provider, date)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(vehicle_id, type, description, cost, provider, date);

      // Update vehicle's last service date
      db.prepare(`
        UPDATE vehicles 
        SET last_service = ?
        WHERE id = ?
      `).run(date, vehicle_id);

      res.status(201).json({ id: result.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);
import express from 'express';
import { body } from 'express-validator';
import db from '../db/index.js';
import { checkPermission } from '../middleware/auth.js';

const router = express.Router();

// Get financial summary
router.get('/summary',
  checkPermission('view:finance'),
  (req, res) => {
    try {
      const totalExpenses = db.prepare(`
        SELECT SUM(amount) as total
        FROM finance_records
        WHERE type = 'expense'
      `).get();

      const expensesByCategory = db.prepare(`
        SELECT type, SUM(amount) as total
        FROM finance_records
        WHERE type = 'expense'
        GROUP BY type
      `).all();

      const recentTransactions = db.prepare(`
        SELECT f.*, v.make, v.model
        FROM finance_records f
        LEFT JOIN vehicles v ON f.vehicle_id = v.id
        ORDER BY f.date DESC
        LIMIT 5
      `).all();

      res.json({
        totalExpenses: totalExpenses.total || 0,
        expensesByCategory,
        recentTransactions
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Record financial transaction
router.post('/transaction',
  checkPermission('manage:finance'),
  [
    body('type').isIn(['expense', 'income']),
    body('amount').isFloat(),
    body('date').isISO8601(),
    body('description').notEmpty(),
    body('vehicle_id').optional().isInt()
  ],
  (req, res) => {
    try {
      const { type, amount, date, description, vehicle_id } = req.body;
      
      const result = db.prepare(`
        INSERT INTO finance_records (type, amount, date, description, vehicle_id)
        VALUES (?, ?, ?, ?, ?)
      `).run(type, amount, date, description, vehicle_id);

      res.status(201).json({ id: result.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);
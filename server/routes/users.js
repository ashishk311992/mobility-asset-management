import express from 'express';
import bcrypt from 'bcryptjs';
import { body, param } from 'express-validator';
import db from '../db/index.js';
import { checkPermission } from '../middleware/auth.js';

const router = express.Router();

// Get all users
router.get('/',
  checkPermission('view:team'),
  (req, res) => {
    try {
      const users = db.prepare(`
        SELECT id, name, email, role, created_at
        FROM users
        ORDER BY created_at DESC
      `).all();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Create new user
router.post('/',
  checkPermission('manage:team'),
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('role').isIn(['admin', 'fleet_manager', 'finance_manager', 'driver'])
  ],
  async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      
      const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const result = db.prepare(`
        INSERT INTO users (name, email, password, role)
        VALUES (?, ?, ?, ?)
      `).run(name, email, hashedPassword, role);

      res.status(201).json({ id: result.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);
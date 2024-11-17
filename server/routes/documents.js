import express from 'express';
import { body, param } from 'express-validator';
import db from '../db/index.js';
import { checkPermission } from '../middleware/auth.js';

const router = express.Router();

// Get all documents
router.get('/',
  checkPermission('view:documents'),
  (req, res) => {
    try {
      const documents = db.prepare(`
        SELECT d.*, v.make, v.model
        FROM documents d
        LEFT JOIN vehicles v ON d.vehicle_id = v.id
        ORDER BY d.created_at DESC
      `).all();
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Get document by ID
router.get('/:id',
  checkPermission('view:documents'),
  param('id').isInt(),
  (req, res) => {
    try {
      const document = db.prepare('SELECT * FROM documents WHERE id = ?').get(req.params.id);
      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }
      res.json(document);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Upload new document
router.post('/',
  checkPermission('manage:documents'),
  [
    body('name').notEmpty(),
    body('type').notEmpty(),
    body('size').isInt(),
    body('path').notEmpty(),
    body('vehicle_id').optional().isInt()
  ],
  (req, res) => {
    try {
      const { name, type, size, path, vehicle_id } = req.body;
      
      const result = db.prepare(`
        INSERT INTO documents (name, type, size, path, vehicle_id)
        VALUES (?, ?, ?, ?, ?)
      `).run(name, type, size, path, vehicle_id);

      res.status(201).json({ id: result.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);
import jwt from 'jsonwebtoken';
import { rolePermissions } from '../utils/permissions.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

export const checkPermission = (permission) => {
  return (req, res, next) => {
    const userPermissions = rolePermissions[req.user.role];
    
    if (!userPermissions || !userPermissions.includes(permission)) {
      return res.status(403).json({ error: 'Permission denied' });
    }
    
    next();
  };
};
import bcrypt from 'bcryptjs';
import db from './index.js';

const seedDatabase = async () => {
  try {
    // Create initial admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    db.prepare(`
      INSERT OR IGNORE INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `).run('Admin User', 'admin@carvach.com', hashedPassword, 'admin');

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
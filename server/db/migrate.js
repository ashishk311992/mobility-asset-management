import pool from './index.js';

const migrate = async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        make VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        year INTEGER NOT NULL,
        status VARCHAR(50) NOT NULL,
        ownership_type VARCHAR(50) NOT NULL,
        mileage INTEGER NOT NULL,
        last_service DATE,
        next_service DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS maintenance_records (
        id SERIAL PRIMARY KEY,
        vehicle_id INTEGER NOT NULL,
        date DATE NOT NULL,
        type VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        cost DECIMAL(10,2) NOT NULL,
        provider VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles (id)
      );

      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        size INTEGER NOT NULL,
        path TEXT NOT NULL,
        vehicle_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles (id)
      );

      CREATE TABLE IF NOT EXISTS finance_records (
        id SERIAL PRIMARY KEY,
        vehicle_id INTEGER,
        type VARCHAR(50) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        date DATE NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles (id)
      );
    `);

    await client.query('COMMIT');
    console.log('Migration completed successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    client.release();
  }
};

migrate();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// เชื่อมต่อฐานข้อมูล (ใช้ค่าจาก .env.local)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dit312_6609119', // ชื่อ DB ตามภาพ image_7ca1a4
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ดึงข้อมูลสถานที่ทั้งหมด (เปลี่ยนเป็น attraction ไม่มี s)
app.get('/attractions', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM attraction'); 
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Database Error: ' + e.message });
  }
});

// เพิ่มข้อมูลสถานที่ใหม่ (POST)
app.post('/attractions', async (req, res) => {
  try {
    const { name, detail, coverimage } = req.body;
    const [result] = await pool.query(
      'INSERT INTO attraction (name, detail, coverimage) VALUES (?, ?, ?)',
      [name, detail, coverimage]
    );
    res.status(201).json({ message: 'Success!', id: result.insertId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Insert Error: ' + e.message });
  }
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
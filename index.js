const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


const port = process.env.PORT;
// Configuración de la conexión a la base de datos PostgreSQL offline
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'express',
//   password: '200113',
//   port: 5432,
// });
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
// Ruta para obtener todos los productos
app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM products');
    const products = result.rows;
    client.release();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).send('Error del servidor');
  }
});
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});


module.exports = app;

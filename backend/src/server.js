const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const mySql = require('mysql2/promise');

const { PORT } = require('./config');
// const itemsRoutes = require('./routes/itemsRoutes');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());



// app.use('/api', itemsRoutes);

app.all('*', (req, res) => {
  res.status(404).json({ err: 'page not found' });
});

app.listen(PORT, () => console.log(`Server working: ${PORT}`));

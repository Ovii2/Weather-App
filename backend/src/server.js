const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const weatherRoute = require('./routes/weatherRoute');

const { PORT } = require('./config');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/weather', weatherRoute);

app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

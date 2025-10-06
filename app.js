const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

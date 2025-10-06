const express = require('express');
const app = express();
const employeeRoutes = require('./routes/employees');

app.use(express.json());

app.use('/api/employees', employeeRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

const express = require('express');
const cors = require('cors');
const app = express();

const employeeRoutes = require('./routes/employees');

app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);

app.get('/', (req, res) => {
  res.send('Employee Management API is running...');
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));

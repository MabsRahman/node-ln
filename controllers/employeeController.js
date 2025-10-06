const db = require('../db');

exports.getAllEmployees = (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getEmployeeById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM employees WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Employee not found' });
    res.json(results[0]);
  });
};

exports.createEmployee = (req, res) => {
  const { name, position, salary } = req.body;
  db.query(
    'INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)',
    [name, position, salary],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'Employee added', employeeId: result.insertId });
    }
  );
};

exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, position, salary } = req.body;
  db.query(
    'UPDATE employees SET name=?, position=?, salary=? WHERE id=?',
    [name, position, salary, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Employee updated successfully' });
    }
  );
};

exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM employees WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Employee deleted successfully' });
  });
};

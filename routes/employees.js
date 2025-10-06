const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM employees WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Employee not found' });
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const { name, position, salary } = req.body;
  db.query('INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)',
    [name, position, salary],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Insert failed', error: err });
      res.status(201).json({ message: 'Employee added', employeeId: results.insertId });
    });
});

router.put('/:id', (req, res) => {
  const { name, position, salary } = req.body;
  db.query(
    'UPDATE employees SET name=?, position=?, salary=? WHERE id=?',
    [name, position, salary, req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Update failed', error: err });
      res.json({ message: 'Employee updated' });
    }
  );
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM employees WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: 'Delete failed', error: err });
    res.json({ message: 'Employee deleted' });
  });
});

module.exports = router;

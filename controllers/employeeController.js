const db = require('../db');
const AppError = require('../utils/AppError');

exports.getAllEmployees = (req, res, next) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) return next(new AppError('Database error while fetching employees', 500));
    res.status(200).json({ status: 'success', results: results.length, data: results });
  });
};

exports.getEmployeeById = (req, res, next) => {
  const { id } = req.params;
  db.query('SELECT * FROM employees WHERE id = ?', [id], (err, results) => {
    if (err) return next(new AppError('Database error', 500));
    if (results.length === 0) return next(new AppError('Employee not found', 404));
    res.json(results[0]);
  });
};

exports.createEmployee = (req, res, next) => {
  const { name, position, salary } = req.body;
  if (!name || !position || !salary) return next(new AppError('All fields are required', 400));

  db.query(
    'INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)',
    [name, position, salary],
    (err, result) => {
      if (err) return next(new AppError('Error adding employee', 500));
      res.status(201).json({ message: 'Employee added successfully', id: result.insertId });
    }
  );
};

// 🟠 Update employee
exports.updateEmployee = (req, res, next) => {
  const { id } = req.params;
  const { name, position, salary } = req.body;
  db.query(
    'UPDATE employees SET name=?, position=?, salary=? WHERE id=?',
    [name, position, salary, id],
    (err, result) => {
      if (err) return next(new AppError('Error updating employee', 500));
      if (result.affectedRows === 0) return next(new AppError('Employee not found', 404));
      res.json({ message: 'Employee updated successfully' });
    }
  );
};

exports.deleteEmployee = (req, res, next) => {
  const { id } = req.params;
  db.query('DELETE FROM employees WHERE id=?', [id], (err, result) => {
    if (err) return next(new AppError('Error deleting employee', 500));
    if (result.affectedRows === 0) return next(new AppError('Employee not found', 404));
    res.json({ message: 'Employee deleted successfully' });
  });
};

const express = require('express');
const router = express.Router();

let products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Mouse', price: 25 }
];

router.get('/', (req, res) => res.json(products));

module.exports = router;

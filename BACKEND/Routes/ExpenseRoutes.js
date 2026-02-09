const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/ExpenseController');

router.post('/add', ExpenseController.createExpense);
router.get('/all', ExpenseController.getAllExpenses);
router.put('/update/:id', ExpenseController.updateExpense);
router.delete('/delete/:id', ExpenseController.deleteExpense);

module.exports = router;
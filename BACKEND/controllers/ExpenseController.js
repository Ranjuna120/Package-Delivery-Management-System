const ExpenseService = require("../services/ExpenseService");

class ExpenseController {
  async createExpense(req, res) {
    try {
      const expense = await ExpenseService.createExpense(req.body);
      res.status(201).json(expense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllExpenses(req, res) {
    try {
      const expenses = await ExpenseService.getAllExpense();
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateExpense(req, res) {
    try {
      const expense = await ExpenseService.updateExpense(req.params.id, req.body);
      if (!expense) {
        return res.status(404).json({ message: "Expense Not Found" });
      }
      res.status(200).json(expense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteExpense(req, res) {
    try {
      const expense = await ExpenseService.deleteExpense(req.params.id);
      if (!expense) {
        return res.status(404).json({ message: "Expense Not Found" });
      }
      res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ExpenseController();
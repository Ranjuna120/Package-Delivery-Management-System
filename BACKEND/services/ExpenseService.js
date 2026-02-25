// Ensure that the path to the Expense model is correct
const Expense = require('../Models/ExpenseModel'); // Corrected 'Models' to 'models'

class ExpenseServices {
    // Create a new expense
    async createExpense(expenseData) {
        try {
            return await Expense.create(expenseData);
        } catch (error) {
            throw new Error(`Error creating expense: ${error.message}`);
        }
    }

    // Get all expenses
    async getAllExpense() {
        try {
            return await Expense.find();
        } catch (error) {
            throw new Error(`Error fetching expenses: ${error.message}`);
        }
    }

    // Get an expense by its ID
    async getExpenseByID(id) {
        try {
            return await Expense.findById(id);
        } catch (error) {
            throw new Error(`Expense with ID ${id} not found: ${error.message}`);
        }
    }

    // Update an expense by its ID
    async updateExpense(id, updateData) {
        try {
            return await Expense.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            throw new Error(`Error updating expense with ID ${id}: ${error.message}`);
        }
    }

    // Delete an expense by its ID
    async deleteExpense(id) {
        try {
            return await Expense.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting expense with ID ${id}: ${error.message}`);
        }
    }
}

module.exports = new ExpenseServices();
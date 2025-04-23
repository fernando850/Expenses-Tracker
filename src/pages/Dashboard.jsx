
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Download, Wallet, Moon, Sun, RotateCcw } from "lucide-react";
import PieChartComponent from "@/components/charts/PieChartComponent";
import LineChartComponent from "@/components/charts/LineChartComponent";
import BarChartComponent from "@/components/charts/BarChartComponent";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseTable from "@/components/ExpenseTable";
import { useToast } from "@/components/ui/use-toast";
import {
  getInitialExpenses,
  getInitialBudgets,
  calculateMonthlyData,
  calculateCategoryData,
} from "@/lib/mockData";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenses, setExpenses] = useState(getInitialExpenses());
  const [budgets, setBudgets] = useState(getInitialBudgets());
  const [editingExpense, setEditingExpense] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
    setShowExpenseForm(false);
    toast({
      title: "Success",
      description: "Expense added successfully",
    });
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowExpenseForm(true);
  };

  const handleUpdateExpense = (updatedExpense) => {
    setExpenses(expenses.map(exp => 
      exp.id === updatedExpense.id ? updatedExpense : exp
    ));
    setShowExpenseForm(false);
    setEditingExpense(null);
    toast({
      title: "Success",
      description: "Expense updated successfully",
    });
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
    toast({
      title: "Success",
      description: "Expense deleted successfully",
    });
  };

  const resetData = () => {
    localStorage.clear();
    setExpenses(getInitialExpenses());
    setBudgets(getInitialBudgets());
    toast({
      title: "Reset Complete",
      description: "All data has been reset to default values",
    });
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Category', 'Amount', 'Description'];
    const csvContent = [
      headers.join(','),
      ...expenses.map(exp => 
        [exp.date, exp.category, exp.amount, exp.description].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const monthlyBudget = Object.values(budgets).reduce((sum, { limit }) => sum + limit, 0);
  const remainingBudget = monthlyBudget - totalSpent;
  const categoryData = calculateCategoryData(expenses);
  const monthlyData = calculateMonthlyData(expenses);
  const budgetChartData = Object.entries(budgets).map(([name, data]) => ({
    name,
    ...data,
  }));

  const highestExpense = expenses.reduce((max, exp) => 
    exp.amount > max.amount ? exp : max
  , expenses[0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={resetData}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button onClick={() => setShowExpenseForm(true)} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
          <Button onClick={exportToCSV} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {showExpenseForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {editingExpense ? 'Edit Expense' : 'Add New Expense'}
          </h2>
          <ExpenseForm
            onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
            onCancel={() => {
              setShowExpenseForm(false);
              setEditingExpense(null);
            }}
            initialData={editingExpense}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="dashboard-card">
          <h2 className="text-xl font-semibold mb-4">Monthly Summary</h2>
          <div className="stat-card bg-blue-50">
            <span className="text-sm text-blue-600">Total Spent</span>
            <span className="text-2xl font-bold">${totalSpent.toFixed(2)}</span>
          </div>
        </div>
        <div className="dashboard-card">
          <h2 className="text-xl font-semibold mb-4">Budget Status</h2>
          <div className="stat-card bg-green-50">
            <span className="text-sm text-green-600">Remaining Budget</span>
            <span className="text-2xl font-bold">${remainingBudget.toFixed(2)}</span>
          </div>
        </div>
        <div className="dashboard-card">
          <h2 className="text-xl font-semibold mb-4">Largest Expense</h2>
          <div className="stat-card bg-purple-50">
            <span className="text-sm text-purple-600">{highestExpense?.category}</span>
            <span className="text-2xl font-bold">${highestExpense?.amount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
          <PieChartComponent data={categoryData} />
        </div>
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
          <LineChartComponent data={monthlyData} />
        </div>
      </div>

      <div className="chart-container">
        <h2 className="text-xl font-semibold mb-4">Budget vs Actual</h2>
        <BarChartComponent data={budgetChartData} />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
        <ExpenseTable
          expenses={expenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
      </div>
    </motion.div>
  );
}

export default Dashboard;

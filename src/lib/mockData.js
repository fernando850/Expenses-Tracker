
import { format } from 'date-fns';

const today = new Date();
const defaultExpenses = [
  { id: 1, date: format(today, 'yyyy-MM-dd'), category: 'Food', amount: 45.50, description: 'Grocery shopping' },
  { id: 2, date: format(today, 'yyyy-MM-dd'), category: 'Transport', amount: 30.00, description: 'Bus ticket' },
  { id: 3, date: format(today, 'yyyy-MM-dd'), category: 'Utilities', amount: 120.00, description: 'Electricity bill' },
  { id: 4, date: format(today, 'yyyy-MM-dd'), category: 'Rent', amount: 1200.00, description: 'Monthly rent' },
  { id: 5, date: format(today, 'yyyy-MM-dd'), category: 'Entertainment', amount: 50.00, description: 'Movie tickets' },
];

export const getInitialExpenses = () => {
  const stored = localStorage.getItem('expenses');
  return stored ? JSON.parse(stored) : defaultExpenses;
};

export const mockCategories = [
  'Food', 'Transport', 'Utilities', 'Rent', 'Entertainment', 'Shopping', 'Healthcare', 'Other'
];

export const defaultBudgets = {
  Food: { limit: 500, spent: 350 },
  Transport: { limit: 200, spent: 150 },
  Utilities: { limit: 300, spent: 280 },
  Rent: { limit: 1200, spent: 1200 },
  Entertainment: { limit: 200, spent: 50 },
  Shopping: { limit: 300, spent: 150 },
  Healthcare: { limit: 200, spent: 100 },
  Other: { limit: 200, spent: 50 },
};

export const getInitialBudgets = () => {
  const stored = localStorage.getItem('budgets');
  return stored ? JSON.parse(stored) : defaultBudgets;
};

export const calculateMonthlyData = (expenses) => {
  const monthlyTotals = {};
  expenses.forEach(expense => {
    const month = expense.date.substring(0, 7); // Get YYYY-MM
    monthlyTotals[month] = (monthlyTotals[month] || 0) + expense.amount;
  });

  return Object.entries(monthlyTotals).map(([month, total]) => ({
    month: format(new Date(month), 'MMM'),
    expenses: total
  }));
};

export const calculateCategoryData = (expenses) => {
  const categoryTotals = {};
  expenses.forEach(expense => {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
  });

  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));
};

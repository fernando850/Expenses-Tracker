
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseTable from "@/components/ExpenseTable";
import SearchBar from "@/components/SearchBar";
import DateRangePicker from "@/components/DateRangePicker";
import { format } from "date-fns";
import { getInitialExpenses } from "@/lib/mockData";
import { useToast } from "@/components/ui/use-toast";

function Expenses() {
  const [expenses, setExpenses] = useState(getInitialExpenses());
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("expenses");
    if (stored) {
      setExpenses(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

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
    setExpenses(
      expenses.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
    );
    setShowExpenseForm(false);
    setEditingExpense(null);
    toast({
      title: "Success",
      description: "Expense updated successfully",
    });
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
    toast({
      title: "Success",
      description: "Expense deleted successfully",
    });
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || expense.category === selectedCategory;
    const matchesDateRange =
      (!startDate || expense.date >= startDate) &&
      (!endDate || expense.date <= endDate);

    return matchesSearch && matchesCategory && matchesDateRange;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-7xl px-2 md:px-4 mx-auto space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <Button onClick={() => setShowExpenseForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {showExpenseForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {editingExpense ? "Edit Expense" : "Add New Expense"}
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

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-select"
            >
              <option value="">All Categories</option>
              {["Food", "Transport", "Utilities", "Rent", "Entertainment"].map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
          </div>

          <ExpenseTable
            expenses={filteredExpenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Expenses;

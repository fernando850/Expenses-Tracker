
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BudgetProgressBar from "@/components/BudgetProgressBar";
import { getInitialBudgets, mockCategories } from "@/lib/mockData";
import { useToast } from "@/components/ui/use-toast";

function Budgets() {
  const [budgets, setBudgets] = useState(getInitialBudgets());
  const [totalSpent, setTotalSpent] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("budgets");
    if (stored) {
      setBudgets(JSON.parse(stored));
    }

    // Calculate total spent from expenses
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    setTotalSpent(total);
  }, []);

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  const handleBudgetChange = (category, value) => {
    setBudgets({
      ...budgets,
      [category]: {
        ...budgets[category],
        limit: parseFloat(value) || 0,
      },
    });
    toast({
      title: "Success",
      description: "Budget updated successfully",
    });
  };

  const totalBudget = Object.values(budgets).reduce(
    (sum, { limit }) => sum + limit,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-7xl px-2 md:px-4 mx-auto space-y-6"
    >
      <h1 className="text-3xl font-bold">Budgets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Overall Budget</h2>
          <div className="space-y-4">
            <div className="stat-card bg-blue-50">
              <span className="text-sm text-blue-600">Total Budget</span>
              <span className="text-2xl font-bold">${totalBudget.toFixed(2)}</span>
            </div>
            <div className="stat-card bg-green-50">
              <span className="text-sm text-green-600">Total Spent</span>
              <span className="text-2xl font-bold">${totalSpent.toFixed(2)}</span>
            </div>
            <div className="stat-card bg-purple-50">
              <span className="text-sm text-purple-600">Remaining</span>
              <span className="text-2xl font-bold">
                ${(totalBudget - totalSpent).toFixed(2)}
              </span>
            </div>
            <BudgetProgressBar
              spent={totalSpent}
              limit={totalBudget}
              category="Overall"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Category Budgets</h2>
          <div className="space-y-4">
            {mockCategories.map((category) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={budgets[category]?.limit || 0}
                    onChange={(e) => handleBudgetChange(category, e.target.value)}
                    className="form-input w-32"
                    min="0"
                    step="10"
                  />
                  <span className="text-sm text-gray-600">{category}</span>
                </div>
                <BudgetProgressBar
                  spent={budgets[category]?.spent || 0}
                  limit={budgets[category]?.limit || 0}
                  category={category}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Budgets;

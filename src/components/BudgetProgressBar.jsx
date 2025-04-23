
import React from "react";

function BudgetProgressBar({ spent, limit, category }) {
  const percentage = (spent / limit) * 100;
  const isWarning = percentage >= 80;
  const isOverBudget = percentage > 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{category}</span>
        <span className={isOverBudget ? "text-red-600 font-semibold" : ""}>
          ${spent.toFixed(2)} / ${limit.toFixed(2)}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isOverBudget
              ? "bg-red-600"
              : isWarning
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

export default BudgetProgressBar;


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import PieChartComponent from "@/components/charts/PieChartComponent";
import LineChartComponent from "@/components/charts/LineChartComponent";
import BarChartComponent from "@/components/charts/BarChartComponent";
import {
  calculateMonthlyData,
  calculateCategoryData,
  getInitialExpenses,
} from "@/lib/mockData";

function Reports() {
  const [expenses, setExpenses] = useState(getInitialExpenses());
  const [timeRange, setTimeRange] = useState("thisMonth");
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("expenses");
    if (stored) {
      const parsedExpenses = JSON.parse(stored);
      setExpenses(parsedExpenses);
      updateChartData(parsedExpenses, timeRange);
    }
  }, [timeRange]);

  const updateChartData = (expenseData, range) => {
    let filteredExpenses = [...expenseData];
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    if (range === "thisMonth") {
      filteredExpenses = expenseData.filter(
        (exp) => new Date(exp.date) >= startOfMonth
      );
    } else if (range === "lastMonth") {
      filteredExpenses = expenseData.filter(
        (exp) =>
          new Date(exp.date) >= startOfLastMonth &&
          new Date(exp.date) < startOfMonth
      );
    }

    setCategoryData(calculateCategoryData(filteredExpenses));
    setMonthlyData(calculateMonthlyData(filteredExpenses));
  };

  const exportToCSV = () => {
    const headers = ["Date", "Category", "Amount", "Description"];
    const csvContent = [
      headers.join(","),
      ...expenses.map((exp) =>
        [exp.date, exp.category, exp.amount, exp.description].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expense-report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports & Insights</h1>
        <Button onClick={exportToCSV}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Time Range</h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="form-select w-48"
          >
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="all">All Time</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="chart-container">
            <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
            <div className="chart-legend flex flex-wrap gap-2 justify-center text-sm">
              <PieChartComponent data={categoryData} />
            </div>
          </div>
          <div className="chart-container">
            <h3 className="text-lg font-semibold mb-4">Spending Over Time</h3>
            <LineChartComponent data={monthlyData} />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Comparison</h3>
          <BarChartComponent
            data={[
              {
                name: "Last Month",
                expenses: monthlyData[monthlyData.length - 2]?.expenses || 0,
              },
              {
                name: "This Month",
                expenses: monthlyData[monthlyData.length - 1]?.expenses || 0,
              },
            ]}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Reports;

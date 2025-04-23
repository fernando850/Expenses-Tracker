
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FilePieChart as ChartPieIcon, LineChart as LineChartIcon, DownloadCloud as DownloadIcon } from 'lucide-react';

function LandingPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold text-white">ExpenseTracker</h1>
          <div className="flex items-center space-x-4">
            <Link to="/register">
              <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20">
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-white text-blue-600 hover:bg-opacity-90">
                Sign In
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-center items-center mb-8">
          <h1 className="text-2xl font-bold text-white">ExpenseTracker</h1>
        </nav>

        <main className="text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Take Control of Your Finances
            </h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto px-4">
              Track expenses, set budgets, and achieve your financial goals with our
              intuitive expense tracking solution.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12 px-4">
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ChartPieIcon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Track Spending</h3>
              <p>Monitor your expenses across multiple categories</p>
            </motion.div>

            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <LineChartIcon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Monthly Summaries</h3>
              <p>Get detailed insights into your spending patterns</p>
            </motion.div>

            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <DownloadIcon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Export Reports</h3>
              <p>Download your financial data in CSV format</p>
            </motion.div>
          </div>

          {/* Mobile Auth Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="md:hidden flex flex-col items-center space-y-4 mb-8"
          >
            <Link to="/register" className="w-full max-w-xs">
              <Button variant="ghost" className="w-full text-white border-2 border-white hover:bg-white hover:bg-opacity-20">
                Sign Up
              </Button>
            </Link>
            <Link to="/login" className="w-full max-w-xs">
              <Button className="w-full bg-white text-blue-600 hover:bg-opacity-90">
                Sign In
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="px-4"
          >
            <Link to="/dashboard" className="block w-full max-w-xs mx-auto">
              <Button size="lg" className="w-full bg-white text-blue-600 text-lg">
                Try Demo
              </Button>
            </Link>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;

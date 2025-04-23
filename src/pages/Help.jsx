import React from "react";
import { motion } from "framer-motion";

function Help() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-7xl px-2 md:px-4 mx-auto space-y-6"
    >
      <h1 className="text-3xl font-bold">Help & Support</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>

        <div className="space-y-6 text-gray-600">
          <div>
            <h3 className="text-lg font-semibold">How do I add a new expense?</h3>
            <p>
              Click the <strong>"Add Expense"</strong> button at the top right of the Expenses page.
              Fill out the category, date, amount, and a short description. Press “Submit” to save.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">How can I search or filter expenses?</h3>
            <p>
              Use the search bar and dropdown filters at the top of the Expenses page to find
              expenses by category, keyword, or date range.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">What’s shown in the Reports page?</h3>
            <p>
              The Reports section gives you a visual breakdown of your spending by category and
              time. Use the "Time Range" dropdown to view this month, last month, or all time.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">How do I reset my data?</h3>
            <p>
              On the Dashboard, click the circular arrow button (⟲) in the top bar. This will clear
              all expenses and budgets and reload the default demo data.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Need more help?</h3>
            <p>
              If you’re experiencing issues, try refreshing the page. If the problem persists, please
              contact the developer or submit a GitHub issue.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Help;


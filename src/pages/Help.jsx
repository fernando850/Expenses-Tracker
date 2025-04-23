
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
        <p className="text-gray-600">Help content coming soon...</p>
      </div>
    </motion.div>
  );
}

export default Help;

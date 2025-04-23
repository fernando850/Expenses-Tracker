
import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CreditCard,
  PieChart,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function Layout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/expenses", icon: CreditCard, label: "Expenses" },
    { path: "/budgets", icon: PieChart, label: "Budgets" },
    { path: "/reports", icon: BarChart3, label: "Reports" },
    { path: "/settings", icon: Settings, label: "Settings" },
    { path: "/help", icon: HelpCircle, label: "Help" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 overflow-x-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-50 px-4 py-3 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold text-blue-600">ExpenseTracker</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-gray-600"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Main layout container */}
      <div className="flex flex-1 mt-14 md:mt-0">
        {/* Sidebar for desktop */}
        <motion.aside
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          className="hidden md:flex md:flex-col w-64 bg-white shadow-lg"
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-600">ExpenseTracker</h1>
          </div>
          <nav className="flex-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                  location.pathname === item.path
                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                    : ""
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/"
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors mb-6"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Link>
        </motion.aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={toggleSidebar}
            >
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                className="w-64 bg-white h-full fixed shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <nav className="mt-16">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={toggleSidebar}
                      className={`flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                        location.pathname === item.path
                          ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                          : ""
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    to="/"
                    onClick={toggleSidebar}
                    className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors absolute bottom-6"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </Link>
                </nav>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-8 py-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;


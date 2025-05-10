# 💸 ExpenseTracker

**ExpenseTracker** is a sleek, responsive React application that helps users **track their expenses**, **set budgets**, and **gain insights** through dynamic charts and reports. It is designed for personal finance management and offers a smooth user experience across desktop and mobile.

## 🚀 Features

- 🔐 **Authentication**: Register and log in with a minimal, animated interface.
- 📊 **Dashboard**: Overview of total spending, budget status, and largest expense.
- 🧾 **Expense Manager**: Add, edit, delete, and filter expenses by category and date.
- 📈 **Reports**: Interactive charts (pie, line, and bar) show financial trends over time.
- 🎯 **Budgets**: Set and track category-specific and overall spending limits.
- ⚙️ **Settings**:
  - Customize display name, currency, and theme.
  - Add or remove expense categories.
- 🧹 **Data Reset**: Quickly reset all data back to demo state.
- 📁 **Export CSV**: Download your expense data in `.csv` format for external use.
- ❓ **Help Page**: FAQ section to guide users through key functionalities.
- 🌙 **Dark Mode** toggle for accessibility.

## 📂 Folder Structure
src/
├── components/ # Reusable components like forms, tables, charts
├── pages/ # Main route components (Dashboard, Expenses, etc.)
├── styles/ # Tailwind + custom CSS
├── lib/ # Mock data & utility functions
├── App.jsx # Main app router
└── index.jsx # Entry point

## 🛠️ Tech Stack

- **React** + **Vite**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide Icons** for UI
- **Recharts** (assumed from chart naming) or custom chart components
- **LocalStorage** for persistent client-side data
- **React Router** for navigation

## 🧪 Demo Data

All data is stored in `localStorage`, with defaults provided via `mockData.js`. This allows users to explore the app without needing to set up a backend.

## 🧰 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
npm install
npm run dev

Visit http://localhost:5173 in your browser.

📄 License
MIT License. Feel free to use, fork, and enhance!




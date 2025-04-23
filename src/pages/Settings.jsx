
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { mockCategories } from "@/lib/mockData";

function Settings() {
  const [settings, setSettings] = useState({
    displayName: "Demo User",
    email: "demo@example.com",
    currency: "USD",
    theme: "light",
    categories: [...mockCategories],
  });
  const [newCategory, setNewCategory] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("settings");
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const handleSaveProfile = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
    toast({
      title: "Success",
      description: "Profile settings saved successfully",
    });
  };

  const handleAddCategory = () => {
    if (newCategory && !settings.categories.includes(newCategory)) {
      setSettings({
        ...settings,
        categories: [...settings.categories, newCategory],
      });
      setNewCategory("");
      toast({
        title: "Success",
        description: "Category added successfully",
      });
    }
  };

  const handleDeleteCategory = (category) => {
    setSettings({
      ...settings,
      categories: settings.categories.filter((c) => c !== category),
    });
    toast({
      title: "Success",
      description: "Category deleted successfully",
    });
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to delete all data?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-7xl px-2 md:px-4 mx-auto space-y-6"
    >
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Display Name
              </label>
              <input
                type="text"
                value={settings.displayName}
                onChange={(e) =>
                  setSettings({ ...settings, displayName: e.target.value })
                }
                className="form-input mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
                className="form-input mt-1"
              />
            </div>
            <Button onClick={handleSaveProfile}>Save Profile</Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Currency
              </label>
              <select
                value={settings.currency}
                onChange={(e) =>
                  setSettings({ ...settings, currency: e.target.value })
                }
                className="form-select mt-1"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) =>
                  setSettings({ ...settings, theme: e.target.value })
                }
                className="form-select mt-1"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"
                className="form-input flex-1"
              />
              <Button onClick={handleAddCategory}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {settings.categories.map((category) => (
                <div
                  key={category}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded"
                >
                  <span>{category}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCategory(category)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
          <Button variant="destructive" onClick={handleResetData}>
            Delete All Data
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default Settings;


import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function Login() {
  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center px-4">
      <Link
        to="/"
        className="absolute top-4 left-4 text-white flex items-center hover:opacity-80 transition-opacity"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70"
            />
          </div>
          <Button className="w-full bg-white text-blue-600">Login</Button>
        </form>
        <p className="mt-4 text-center text-white">
          Don't have an account?{" "}
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;

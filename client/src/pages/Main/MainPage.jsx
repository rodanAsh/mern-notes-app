import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="max-w-md w-full shadow-xl rounded-2xl p-6 bg-white">
        <div className="flex flex-col items-center text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to NotesApp</h1>
          <p className="text-gray-600 text-lg">Organize your thoughts, anytime, anywhere.</p>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-2xl text-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded-2xl text-lg hover:bg-blue-100 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

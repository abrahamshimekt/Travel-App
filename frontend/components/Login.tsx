"use client";
import { useAppDispatch } from "@/lib/hooks";
import Button from "./common/button";
import { login } from "@/lib/features/auth/loginSlice";
import { useState } from "react";

const Login = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleLogin = () => {
    dispatch(login({ username, password ,onSuccess:()=>{window.location.href="/"}}));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          ይግቡ
        </h1>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            መለያ ስም
          </label>
          <input
            id="username"
            type="text"
            placeholder="መልያ ስም ያስገቡ"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            የይለፍ ቃል
          </label>
          <input
            id="password"
            type="password"
            placeholder="የይለፍ ቃል ያስገቡ"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
        </div>

        <Button
          type="button"
          title="ይግቡ"
          icon=""
          variant="btn_dark_green"
          full={true}
          handleClick={handleLogin}
          
        />

        <p className="mt-6 text-center text-sm text-gray-600">
          አልተመዘገቡም?{" "}
          <a href="/auth/signup" className="text-green-500 hover:underline">
            ይመዝገቡ
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

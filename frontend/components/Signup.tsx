"use client";
import { useAppDispatch } from "@/lib/hooks";
import Button from "./common/button";
import { signup } from "@/lib/features/auth/signupSlice";
import { useState } from "react";

const Signup = () => {
  const dispatch = useAppDispatch();
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSignup = () => {
    const data = { first_name, last_name, username, email, phone_number, password }
    dispatch(signup(data));
    
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          ይመዝገቡ
        </h1>
        <div className="mb-4">
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            የእርስዎ ስም
          </label>
          <input
            id="first_name"
            type="text"
            placeholder="የእርስዎን ስም ያስገቡ"
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
           የአባት ስም
          </label>
          <input
            id="last_name"
            type="text"
            placeholder="የአባት ስም ያስገቡ"
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
        </div>
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
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ኢሜል
          </label>
          <input
            id="email"
            type="email"
            placeholder="ኢሜል ያስገቡ"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ስልክ ቁጥር
          </label>
          <input
            id="phone_number"
            type="text"
            placeholder="ስልክ ቁጥር ያስገቡ"
            onChange={(e) => setPhoneNumber(e.target.value)}
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
          title="ይመዝገቡ"
          icon=""
          variant="btn_dark_green"
          full={true}
          handleClick={handleSignup}
        />

        <p className="mt-6 text-center text-sm text-gray-600">
          ተመዝግበዋል?{" "}
          <a href="/auth/login" className="text-green-500 hover:underline">
            ይግቡ
          </a>
        </p>
      </div>
    </div>
  );
};
export default Signup;

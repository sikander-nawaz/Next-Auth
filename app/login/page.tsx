"use client";

import React, { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [data, setData] = useState();
  const [customError, setCustomError] = useState();

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  console.log("data", data);

  return (
    <div className="flex min-h-screen flex-col  items-center justify-between p-24">
      <div className="border-2 border-gray-500 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl text-center font-semibold mb-8">Sign In</h1>

        <input
          name="email"
          className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black text-[18px]"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          name="password"
          className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:border-blue-400 focus:text-black text-[18px]"
          placeholder="password"
          required
          onChange={handleChange}
        />
        <div className="text-center">
          <button
            //   onClick={() => handleSubmit()}
            className=" w-1/2 bg-blue-500 text-white  py-2 rounded hover:bg-blue-600 mt-6 text-[16px]"
          >
            Login
          </button>
          <div className="text-red-500 text-[16px] mb-4">
            {customError && customError}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            //   onClick={() => {
            //     signIn("github");
            //   }}
            className="bg-black text-white rounded-md p-4"
          >
            Github Login
          </button>
          <button className="bg-blue-500 text-white rounded-md p-4 ml-2">
            Google Login
          </button>
        </div>

        <div className="text-center text-gray-500 mt-4 text-sm">- OR - </div>
        <Link
          href="/register"
          className="block text-center text-blue-500 mt-2 text-[16px] hover:underline"
        >
          Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  interface Data {
    email: string;
    password: string;
  }

  interface LoginState {
    error: string | null;
    success: boolean;
  }

  const [data, setData] = useState<Data>({ email: "", password: "" });
  const [loginState, setLoginState] = useState<LoginState>({
    error: null,
    success: false,
  });
  const router = useRouter();

  const { data: userData, status: userSession } = useSession();

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userSession == "authenticated") {
      router.replace("/dashboard");
    }
  }, [userSession, router]);

  const handleSubmit = async () => {
    const email = data.email;
    const password = data.password;

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response?.error) {
      setLoginState({ error: "Invalid username and password", success: false });
    } else {
      setLoginState({ error: null, success: true });
    }
  };

  if (userSession === "loading") {
    return (
      <div>
        <h1>....Loading</h1>
      </div>
    );
  }

  console.log("else userdata>>", userData);
  console.log("else userSession>>", userSession);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="border-2 border-gray-500 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl text-center font-semibold mb-8">Sign In</h1>

        <input
          type="text"
          name="email"
          className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black text-[18px]"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:border-blue-400 focus:text-black text-[18px]"
          placeholder="password"
          required
          onChange={handleChange}
        />
        <div className="text-center">
          <button
            onClick={() => handleSubmit()}
            className=" w-1/2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-6 mb-2 text-[16px]"
          >
            Login
          </button>
          {loginState.error && (
            <div className="text-red-500 text-[16px] mb-4">
              {loginState.error}
            </div>
          )}
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              signIn("github");
            }}
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

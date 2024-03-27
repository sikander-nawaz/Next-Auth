"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const NavBar = () => {
  const { data: userData } = useSession();

  return (
    <div className="w-full max-w-full">
      <ul className="flex gap-5 mb-4 justify-center items-center bg-gray-500 text-white">
        <Link href="/">
          <li className="p-4">Home</li>
        </Link>
        <Link href="/dashboard">
          <li className="p-4">Dashboard</li>
        </Link>
        {!userData ? (
          <>
            <Link href="/login">
              <li className="p-4">Login </li>
            </Link>
            <Link href="/register">
              <li className="p-4">Register</li>
            </Link>
          </>
        ) : (
          <>
            {userData.user?.email}
            <li className="p-4">
              <button
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavBar;

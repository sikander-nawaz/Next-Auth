import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center p-24">
      Dashboard
    </div>
  );
};

export default Dashboard;

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/authContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return children;
}
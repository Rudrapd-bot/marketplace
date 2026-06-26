
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (token) {
      // Save JWT
      localStorage.setItem("token", token);

      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

        <h1 className="text-3xl font-bold">
          Signing you in...
        </h1>

        <p className="text-gray-400 mt-2">
          Please wait while we redirect you.
        </p>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/authContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          href="/"
          className="text-3xl font-bold text-blue-600"
        >
          ProjectHub
        </Link>

        <div className="flex items-center gap-8">

          <Link href="/">Home</Link>

          <Link href="/explore">Explore</Link>

          {!user ? (
            <>
              <Link href="/login">Login</Link>

              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">

              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                👤 {user.name}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border">

                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    My Projects
                  </Link>

                  <Link
                    href="/projects/add"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Add Project
                  </Link>

                  <Link
                    href="/profile"
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <hr />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </nav>
  );
}
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { registerUser } from "../services/authService";

// export default function RegisterPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic Validation
//     if (!formData.name || !formData.email || !formData.password) {
//       alert("Please fill all fields.");
//       return;
//     }

//     if (formData.password.length < 6) {
//       alert("Password must be at least 6 characters.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await registerUser(formData);

//       alert(response.data.message || "Registration Successful!");

//       // Clear form
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//       });

//       // Redirect to login
//       router.push("/login");

//     } catch (error) {
//       console.error(error);

//       alert(
//         error.response?.data?.message ||
//           "Registration Failed!"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };


// return (
//   <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center px-4 py-10">

//     <div className="w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl bg-white">

//       {/* Left Side */}
//       <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-12 text-white">

//         <h1 className="text-5xl font-extrabold mb-6">
//           Join ProjectHub
//         </h1>

//         <p className="text-lg text-blue-100 leading-8">
//           Build your portfolio, showcase amazing projects,
//           connect with developers, and grow your career.
//         </p>

//         <div className="mt-12 space-y-4">

//           <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
//             🚀 Showcase your best work
//           </div>

//           <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
//             🤝 Connect with other developers
//           </div>

//           <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
//             💼 Build your professional profile
//           </div>

//         </div>

//       </div>

//       {/* Right Side */}
//       <div className="p-8 md:p-12 flex flex-col justify-center">

//         <div className="text-center mb-8">

//           <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
//             P
//           </div>

//           <h2 className="text-4xl font-bold text-gray-800 mt-5">
//             Create Account
//           </h2>

//           <p className="text-gray-500 mt-2">
//             Join ProjectHub and showcase your projects.
//           </p>

//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <div>
//             <label className="block mb-2 font-medium text-gray-700">
//               Full Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               placeholder="Enter your full name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-200 transition"
//             />
//           </div>

//           <div>
//             <label className="block mb-2 font-medium text-gray-700">
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-200 transition"
//             />
//           </div>

//           <div>
//             <label className="block mb-2 font-medium text-gray-700">
//               Password
//             </label>

//             <input
//               type="password"
//               name="password"
//               placeholder="Enter password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-200 transition"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50"
//           >
//             {loading ? "Creating Account..." : "Register"}
//           </button>

//         </form>

//         <div className="text-center mt-8">
//           <span className="text-gray-600">
//             Already have an account?
//           </span>

//           <Link
//             href="/login"
//             className="text-blue-600 font-semibold ml-2 hover:underline"
//           >
//             Login
//           </Link>
//         </div>

//       </div>

//     </div>

//   </div>
// );
// }




"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "../services/authService";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser(formData);

      alert(response.data.message || "Registration Successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      router.push("/login");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed!"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl bg-white">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-12 text-white">

          <h1 className="text-5xl font-extrabold mb-6">
            Join ProjectHub
          </h1>

          <p className="text-lg text-blue-100 leading-8">
            Build your portfolio, showcase amazing projects,
            connect with developers, and grow your career.
          </p>

          <div className="mt-12 space-y-4">

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
              🚀 Showcase your best work
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
              🤝 Connect with other developers
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
              💼 Build your professional profile
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">

          <div className="text-center mb-8">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              P
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mt-5">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Join ProjectHub and showcase your projects.
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-200 transition"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-200 transition"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-200 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Register */}
            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "http://localhost:5000/api/auth/google";
              }}
              className="w-full border border-gray-300 bg-white py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition shadow-sm"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />

              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

          </form>

          <div className="text-center mt-8">
            <span className="text-gray-600">
              Already have an account?
            </span>

            <Link
              href="/login"
              className="text-blue-600 font-semibold ml-2 hover:underline"
            >
              Login
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}


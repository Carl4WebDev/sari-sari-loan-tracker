import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6] px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-8 text-center text-2xl font-semibold text-[#1E3A8A]">
          Login
        </h1>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1E3A8A] focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1E3A8A] focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
              placeholder="••••••••"
            />
          </div>
          <Link to={"/dashboard"}>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#1E3A8A] py-2 text-sm font-medium text-white transition hover:bg-[#172E6B]"
            >
              Login
            </button>
          </Link>

          <div className="text-center text-sm text-gray-600">
            No account?{" "}
            <Link
              to="/register"
              className="font-medium text-[#1E3A8A] hover:underline"
            >
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
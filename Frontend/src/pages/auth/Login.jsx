import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/auth.api";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      setLoading(true);

      const res = await loginUser(data);

      setUser(res.data.data);
      toast.success(res.data.message || "Logged in successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
      <div className="w-full max-w-md bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-xl border dark:border-border-dark">
        <h2 className="text-2xl font-bold mb-2 text-center dark:text-white">
          Welcome Back
        </h2>
        <p className="text-sm text-center dark:text-[#92a4c9] mb-6">
          Enter your details to access your design space.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <p className="dark:text-white mt-2 mb-1">Email</p>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid Email",
              },
            })}
            placeholder="Enter your Email"
            className="w-full h-12 px-4 rounded-lg border dark:border-[#324467] dark:text-white"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          {/* Password */}
          <p className="dark:text-white mt-2 mb-1">Password</p>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            placeholder="Enter Password"
            className="w-full h-12 px-4 rounded-lg border dark:border-[#324467] dark:text-white"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 dark:text-[#92a4c9]">
          Don’t have an account?{" "}
          <span
            className="text-primary cursor-pointer font-semibold"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

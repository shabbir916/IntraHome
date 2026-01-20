import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../api/auth.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      setLoading(true);

      const res = await registerUser(data);

      toast.success(res.data.message || "Registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
      <div className="w-full max-w-md bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-xl border dark:border-border-dark">
        <h2 className="text-2xl font-bold mb-2 dark:text-white">
          Create Your Account
        </h2>
        <p className="text-sm dark:text-[#92a4c9] mb-6">
          Start your home transformation journey
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Full Name */}
          <p className="dark:text-white mb-1">Full Name</p>
          <input
            {...register("fullName", {
              required: "FullName is Required",
              minLength: {
                value: 3,
                message: "FullName must be 3-50 characters",
              },
              maxLength: {
                value: 50,
                message: "FullName must be 3-50 characters",
              },
            })}
            placeholder="Enter your full name"
            className="w-full h-12 px-4 rounded-lg border dark:border-[#324467] dark:text-white"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}

          {/* Email */}
          <p className="dark:text-white mt-2 mb-1">Email</p>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid Email Format",
              },
            })}
            placeholder="Enter your Email"
            className="w-full h-12 px-4 rounded-lg border dark:border-[#324467] dark:text-white"
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}

          {/* Password */}
          <p className="dark:text-white mt-2 mb-1">Password</p>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be atleast 6 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message:
                  "Password must contain uppercase, lowercase and number",
              },
            })}
            placeholder="Enter Password"
            className="w-full h-12 px-4 rounded-lg border dark:border-[#324467] dark:text-white"
          />
          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 dark:text-[#92a4c9]">
          Already have an account?{" "}
          <span
            className="text-primary cursor-pointer font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

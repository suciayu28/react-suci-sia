import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth";

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);
    const { error } = await signUp(form.email, form.password, form.full_name);
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/login", { replace: true });
  };

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-black text-gray-800">Create Account ✨</h2>
        <p className="text-rose-300 text-[10px] uppercase tracking-[0.2em] mt-1 font-black">
          Join GlowGrace Community
        </p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-100 mb-5 p-4 rounded-2xl text-rose-600 font-bold text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
            className="w-full mt-2 p-4 border border-pink-50 rounded-2xl bg-gray-50 focus:bg-white focus:ring-4 focus:ring-rose-50 outline-none transition-all text-sm"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mt-2 p-4 border border-pink-50 rounded-2xl bg-gray-50 focus:bg-white focus:ring-4 focus:ring-rose-50 outline-none transition-all text-sm"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full mt-2 p-4 border border-pink-50 rounded-2xl bg-gray-50 focus:bg-white focus:ring-4 focus:ring-rose-50 outline-none transition-all text-sm"
            placeholder="********"
          />
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full mt-2 p-4 border border-pink-50 rounded-2xl bg-gray-50 focus:bg-white focus:ring-4 focus:ring-rose-50 outline-none transition-all text-sm"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black py-4 px-4 rounded-2xl shadow-xl shadow-rose-100 transition-all transform active:scale-95 text-[10px] uppercase tracking-[0.2em]"
        >
          {loading ? "Processing..." : "Register Now"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-rose-500 font-black hover:underline">
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
}

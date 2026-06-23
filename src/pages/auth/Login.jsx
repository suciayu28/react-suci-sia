import { MdOutlineDownloading } from "react-icons/md";
import { GiTerror } from "react-icons/gi";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const { session, loading, signIn } = useAuth();
  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!loading && session) {
      navigate("/", { replace: true });
    }
  }, [session, loading, navigate]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingForm(true);
    setError("");

    const { error } = await signIn(dataForm.email, dataForm.password);
    if (error) {
      setError(error.message || "Email atau Password salah!");
      setLoadingForm(false);
      return;
    }

    navigate("/");
  };

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-black text-gray-800">Welcome Back 👋</h2>
        <p className="text-rose-300 text-[10px] uppercase tracking-[0.2em] mt-1 font-black">
          Atelier GlowGrace Access
        </p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-100 mb-5 p-4 rounded-2xl flex items-center animate-shake">
          <GiTerror className="text-rose-600 me-3 text-xl" />
          <span className="text-[11px] font-black text-rose-600 uppercase tracking-tight">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
            Email / Username
          </label>
          <input
            type="text"
            name="email"
            value={dataForm.email}
            required
            onChange={handleChange}
            className="w-full mt-2 p-4 border border-pink-50 rounded-2xl bg-gray-50 focus:bg-white focus:ring-4 focus:ring-rose-50 outline-none transition-all text-sm"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div className="flex justify-between items-center ml-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
            <Link to="/forgot" className="text-[9px] font-black text-rose-400 hover:text-rose-600 tracking-tighter">
              FORGOT PASSWORD?
            </Link>
          </div>
          <input
            type="password"
            name="password"
            value={dataForm.password}
            required
            onChange={handleChange}
            className="w-full mt-2 p-4 border border-pink-50 rounded-2xl bg-gray-50 focus:bg-white focus:ring-4 focus:ring-rose-50 outline-none transition-all text-sm"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          disabled={loadingForm}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black py-4 px-4 rounded-2xl shadow-xl shadow-rose-100 transition-all transform active:scale-95 text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2"
        >
          {loadingForm ? (
            <>
              <MdOutlineDownloading className="animate-spin text-lg" />
              Processing...
            </>
          ) : (
            "Login to Dashboard"
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-rose-500 font-black hover:underline tracking-tighter">
            CREATE ONE
          </Link>
        </p>
      </div>
    </div>
  );
}

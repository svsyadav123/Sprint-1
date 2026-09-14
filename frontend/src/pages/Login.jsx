import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAIs, loginUser, saveSession } from "../services/auth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(location.state?.message || "");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);
    try {
      const data = await loginUser(formData);
      saveSession(data.token, data.user);
      const { ais } = await getAIs();
      navigate(ais.length ? "/workspace" : "/create-ai");
    } catch (error) { setMessage(error.message); } finally { setIsLoading(false); }
  }

  return <AuthLayout title="Welcome back" subtitle="Log in to manage your personalized AIs."><form className="mt-7 space-y-5" onSubmit={handleSubmit}><Field label="Email" type="email" value={formData.email} onChange={(value) => setFormData({ ...formData, email: value })} /><Field label="Password" type="password" value={formData.password} onChange={(value) => setFormData({ ...formData, password: value })} />{message && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p>}<button disabled={isLoading} className="w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400">{isLoading ? "Logging in..." : "Login"}</button></form><p className="mt-6 text-center text-sm text-gray-600">New to ZeroMind? <Link to="/signup" className="font-semibold text-gray-900 underline">Create an account</Link></p></AuthLayout>;
}

export function Field({ label, type, value, onChange, minLength }) { return <label className="block text-sm font-medium text-gray-700">{label}<input required type={type} minLength={minLength} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-200" /></label>; }
export function AuthLayout({ title, subtitle, children }) { return <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5 py-10"><section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"><Link to="/" className="text-xl font-bold tracking-tight">ZeroMind</Link><h1 className="mt-8 text-3xl font-bold tracking-tight">{title}</h1><p className="mt-2 text-sm leading-6 text-gray-600">{subtitle}</p>{children}</section></main>; }
export default Login;

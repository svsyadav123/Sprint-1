import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout, Field } from "./Login";
import { signupUser } from "../services/auth";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(event) { event.preventDefault(); setMessage(""); if (!formData.name.trim() || !formData.email.trim() || !formData.password) return setMessage("Name, email and password are required."); if (formData.password.length < 6) return setMessage("Password must be at least 6 characters."); setIsLoading(true); try { await signupUser(formData); navigate("/login", { state: { message: "Account created successfully. Please log in." } }); } catch (error) { setMessage(error.message); } finally { setIsLoading(false); } }
  return <AuthLayout title="Create your account" subtitle="Start building an AI that feels like yours."><form className="mt-7 space-y-5" onSubmit={handleSubmit}><Field label="Name" type="text" value={formData.name} onChange={(value) => setFormData({ ...formData, name: value })} /><Field label="Email" type="email" value={formData.email} onChange={(value) => setFormData({ ...formData, email: value })} /><Field label="Password" type="password" minLength={6} value={formData.password} onChange={(value) => setFormData({ ...formData, password: value })} />{message && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p>}<button disabled={isLoading} className="w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400">{isLoading ? "Creating account..." : "Create account"}</button></form><p className="mt-6 text-center text-sm text-gray-600">Already have an account? <Link to="/login" className="font-semibold text-gray-900 underline">Login</Link></p></AuthLayout>;
}
export default Signup;

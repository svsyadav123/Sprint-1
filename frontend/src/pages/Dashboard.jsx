import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearSession, getAIs } from "../services/auth";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("zeromindUser") || "{}");
  const [ais, setAis] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => { getAIs().then(({ ais }) => setAis(ais)).catch((error) => setMessage(error.message)).finally(() => setLoading(false)); }, []);
  function logout() { clearSession(); navigate("/login"); }
  return <main className="min-h-screen bg-gray-50"><header className="border-b border-gray-200 bg-white"><div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6"><Link to="/" className="text-xl font-bold">ZeroMind</Link><button onClick={logout} className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100">Logout</button></div></header><section className="mx-auto max-w-6xl px-6 py-14"><p className="text-sm font-medium text-gray-500">Dashboard{user.email ? ` · ${user.email}` : ""}</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Welcome back{user.name ? `, ${user.name}` : ""}.</h1><div className="mt-10"><div className="flex items-center justify-between gap-4"><h2 className="text-xl font-semibold">Your AIs</h2><button onClick={() => navigate("/create-ai")} className="rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800">Create Your AI</button></div>{loading && <p className="mt-6 text-sm text-gray-600">Loading your AIs...</p>}{message && <p className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{message}</p>}{!loading && !message && !ais.length && <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 text-center"><p className="text-sm text-gray-600">You haven't created an AI yet.</p><button onClick={() => navigate("/create-ai")} className="mt-5 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white">Create Your AI</button></div>}{!loading && !message && ais.length > 0 && <div className="mt-6 grid gap-4 md:grid-cols-2">{ais.map((ai) => <article key={ai._id} className="rounded-xl border border-gray-200 bg-white p-6"><h3 className="text-lg font-semibold">{ai.name}</h3><p className="mt-1 text-sm text-gray-600">{ai.type === "Other" ? ai.customType : ai.type}</p><p className="mt-4 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">{ai.personality}</p><p className="mt-4 text-sm font-medium">Learning</p><p className="mt-1 text-sm text-gray-600">{ai.learningTopics.join(" · ")}</p><button disabled className="mt-5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400">Open AI — coming next</button></article>)}</div>}</div></section></main>;
}

export default Dashboard;

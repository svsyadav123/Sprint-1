import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAI, getAIs, getCurrentUser, updateAI, updateCurrentUser, updatePassword } from "../services/auth";

const emptyPassword = { currentPassword: "", newPassword: "" };

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "" });
  const [ais, setAis] = useState([]);
  const [editingUser, setEditingUser] = useState(false);
  const [name, setName] = useState("");
  const [passwords, setPasswords] = useState(emptyPassword);
  const [editingAiId, setEditingAiId] = useState(null);
  const [aiForm, setAiForm] = useState({ name: "", purpose: "", behavior: "" });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadProfile() {
      try {
        const [currentUser, { ais: userAis }] = await Promise.all([getCurrentUser(), getAIs()]);
        if (cancelled) return;
        setUser(currentUser); setName(currentUser.name); setAis(userAis);
      } catch (error) {
        if (!cancelled) setMessage(error.message);
      }
    }
    loadProfile();
    return () => { cancelled = true; };
  }, []);

  async function saveName() {
    setSaving(true); setMessage("");
    try {
      const { user: updatedUser } = await updateCurrentUser({ name, email: user.email });
      setUser(updatedUser); localStorage.setItem("zeromindUser", JSON.stringify(updatedUser)); setEditingUser(false); setMessage("Name updated successfully.");
    } catch (error) { setMessage(error.message); }
    finally { setSaving(false); }
  }

  async function savePassword() {
    setSaving(true); setMessage("");
    try { const data = await updatePassword(passwords); setPasswords(emptyPassword); setMessage(data.message); }
    catch (error) { setMessage(error.message); }
    finally { setSaving(false); }
  }

  function startAiEdit(ai) { setEditingAiId(ai._id); setAiForm({ name: ai.name, purpose: ai.purpose, behavior: ai.behavior || "" }); setMessage(""); }

  async function saveAi(ai) {
    setSaving(true); setMessage("");
    try {
      const data = await updateAI(ai._id, { ...ai, ...aiForm });
      setAis((current) => current.map((item) => item._id === ai._id ? data.ai : item)); setEditingAiId(null); setMessage("AI updated successfully.");
    } catch (error) { setMessage(error.message); }
    finally { setSaving(false); }
  }

  async function removeAi(ai) {
    if (!window.confirm(`Delete ${ai.name}?`)) return;
    setMessage("");
    try { await deleteAI(ai._id); setAis((current) => current.filter((item) => item._id !== ai._id)); setMessage("AI deleted successfully."); }
    catch (error) { setMessage(error.message); }
  }

  return <main className="min-h-screen bg-gray-50 px-5 py-8 text-gray-900"><section className="mx-auto max-w-4xl"><button onClick={() => navigate("/workspace")} className="text-sm text-gray-600 hover:text-gray-900">← Back to workspace</button><div className="mt-6 flex items-center justify-between"><div><p className="text-sm font-medium text-gray-500">Account</p><h1 className="mt-1 text-3xl font-bold">User Profile</h1></div><button onClick={() => setEditingUser(!editingUser)} className="rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800">{editingUser ? "Cancel" : "Edit Profile"}</button></div>{message && <p className="mt-5 rounded-lg bg-gray-100 p-3 text-sm text-gray-700">{message}</p>}
    <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6"><h2 className="text-lg font-semibold">User Profile</h2>{editingUser ? <div className="mt-5 flex flex-wrap items-end gap-3"><label className="block min-w-64 flex-1 text-sm font-medium">Name<input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label><button disabled={saving} onClick={saveName} className="rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white disabled:bg-gray-400">Save name</button></div> : <p className="mt-4 text-sm font-medium">{user.name}</p>}<div className="mt-6 border-t border-gray-200 pt-5"><h3 className="text-sm font-semibold">Update Password</h3><div className="mt-3 flex flex-col gap-3 sm:flex-row"><input type="password" placeholder="Current password" value={passwords.currentPassword} onChange={(event) => setPasswords({ ...passwords, currentPassword: event.target.value })} className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm" /><input type="password" placeholder="New password" value={passwords.newPassword} onChange={(event) => setPasswords({ ...passwords, newPassword: event.target.value })} className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm" /><button disabled={saving} onClick={savePassword} className="rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white disabled:bg-gray-400">Update Password</button></div></div></section>
    <section className="mt-6"><div className="flex items-center justify-between gap-3"><h2 className="text-xl font-semibold">AI Profile</h2>{ais.length < 3 ? <button onClick={() => navigate("/create-ai")} className="rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800">Create New AI</button> : <p className="text-sm font-medium text-gray-600">Maximum 3 AIs allowed</p>}</div><div className="mt-4 grid gap-4 md:grid-cols-2">{ais.map((ai) => <article key={ai._id} className="rounded-xl border border-gray-200 bg-white p-5">{editingAiId === ai._id ? <div className="space-y-3"><input value={aiForm.name} onChange={(event) => setAiForm({ ...aiForm, name: event.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm" /><textarea value={aiForm.purpose} onChange={(event) => setAiForm({ ...aiForm, purpose: event.target.value })} className="min-h-20 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm" /><textarea value={aiForm.behavior} onChange={(event) => setAiForm({ ...aiForm, behavior: event.target.value })} className="min-h-20 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm" /><div className="flex gap-2"><button disabled={saving} onClick={() => saveAi(ai)} className="rounded-lg bg-black px-3 py-2 text-sm font-semibold text-white disabled:bg-gray-400">Save</button><button onClick={() => setEditingAiId(null)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm">Cancel</button></div></div> : <><h3 className="text-lg font-semibold">{ai.name}</h3><p className="mt-1 text-sm text-gray-600">{ai.type === "Other" ? ai.customType : ai.type}</p><p className="mt-4 text-sm leading-6 text-gray-600">{ai.purpose}</p><div className="mt-5 flex gap-2"><button onClick={() => startAiEdit(ai)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold hover:bg-gray-50">Edit / Change</button><button onClick={() => removeAi(ai)} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button></div></>}</article>)}</div>{!ais.length && <p className="mt-4 rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">No AI profiles yet.</p>}</section></section></main>;
}

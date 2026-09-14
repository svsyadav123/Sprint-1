import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAI } from "../services/auth";

const types = ["Student Assistant", "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Web Developer", "Python Developer", "Java Developer", ".NET Developer", "Data Analyst", "Manager", "Business Assistant", "Accountant / CA", "Teacher", "Tutor", "Research Assistant", "Content Creator", "YouTuber", "Social Media Creator", "Story Writer", "Movie Story Writer", "Filmmaking Assistant", "Screenwriting Assistant", "Marketing Assistant", "Sales Assistant", "Career Assistant", "Interview Preparation Assistant", "Learning Assistant", "Teaching Assistant", "Coding Assistant", "Political Research Assistant", "Personal Assistant", "Other"];
const topics = ["Movies & Cinema", "Story Writing", "Screenwriting", "Filmmaking", "Coding", "Python", "JavaScript", "React", "Web Development", "Backend Development", "Full Stack Development", "Software Engineering", "Data Science", "AI & Machine Learning", "Technology", "Business", "Finance", "Accounting", "Marketing", "Social Media", "Content Creation", "YouTube", "Video Editing", "Graphic Design", "Education", "Teaching", "Learning", "Research", "Career Development", "Interview Preparation", "Current Affairs", "Politics", "Science", "History", "General Knowledge"];
const personalities = ["Friendly", "Professional", "Helpful", "Funny", "Motivational", "Patient", "Strict", "Creative", "Direct", "Calm"];
const steps = ["AI Name", "AI Type", "Learning Focus", "Personality", "Purpose", "Behavior", "Review & Create"];

function Option({ selected, onClick, children }) {
  return <button type="button" onClick={onClick} className={`rounded-lg border px-3 py-2 text-left text-sm transition ${selected ? "border-black bg-black text-white" : "border-gray-200 bg-white hover:border-gray-400"}`}>{children}</button>;
}

export default function CreateAI() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", type: "", customType: "", learningTopics: [], personality: "Friendly", purpose: "", behavior: "" });
  const set = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const visibleTypes = types.filter((type) => type.toLowerCase().includes(search.toLowerCase()));

  function validateCurrent() {
    if (step === 0 && !form.name.trim()) return "Please enter an AI name.";
    if (step === 1 && (!form.type || (form.type === "Other" && !form.customType.trim()))) return form.type === "Other" ? "Please describe your AI type." : "Please select an AI type.";
    if (step === 2 && !form.learningTopics.length) return "Choose at least one learning area.";
    if (step === 4 && !form.purpose.trim()) return "Please describe what your AI is mainly for.";
    return "";
  }
  function next() { const error = validateCurrent(); if (error) return setMessage(error); setMessage(""); setStep((current) => current + 1); }
  function toggleTopic(topic) {
    setMessage("");
    if (form.learningTopics.includes(topic)) return set("learningTopics", form.learningTopics.filter((item) => item !== topic));
    if (form.learningTopics.length === 3) return setMessage("You can select up to 3 learning areas.");
    set("learningTopics", [...form.learningTopics, topic]);
  }
  async function save() {
    const error = validateCurrent(); if (error) return setMessage(error);
    setSaving(true); setMessage("");
    try { const { ai } = await createAI(form); setMessage("Your AI has been created successfully 🎉"); setTimeout(() => navigate("/workspace", { state: { aiId: ai._id } }), 900); }
    catch (error) { setMessage(error.message); setSaving(false); }
  }

  const content = [
    <><h1 className="text-2xl font-bold">What would you like to name your AI?</h1><p className="mt-2 text-sm text-gray-600">Choose a name that feels right for your assistant.</p><input autoFocus value={form.name} onChange={(event) => set("name", event.target.value)} placeholder="StudyMate" className="mt-6 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" /></>,
    <><h1 className="text-2xl font-bold">What kind of AI do you want to create?</h1><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search or select an AI type..." className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" /><div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">{visibleTypes.map((type) => <Option key={type} selected={form.type === type} onClick={() => set("type", type)}>{type}</Option>)}</div>{form.type === "Other" && <div className="mt-5"><label className="text-sm font-medium">Can't find what you're looking for?</label><input value={form.customType} onChange={(event) => set("customType", event.target.value)} placeholder="Fitness Coach" className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" /></div>}</>,
    <><h1 className="text-2xl font-bold">What should your AI focus on learning?</h1><p className="mt-2 text-sm text-gray-600">Choose up to 3 areas. At this stage, these are stored as interests only.</p><div className="mt-5 flex flex-wrap gap-2">{topics.map((topic) => <Option key={topic} selected={form.learningTopics.includes(topic)} onClick={() => toggleTopic(topic)}>{topic}</Option>)}</div></>,
    <><h1 className="text-2xl font-bold">How should your AI behave?</h1><p className="mt-2 text-sm text-gray-600">Select one primary personality.</p><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">{personalities.map((personality) => <Option key={personality} selected={form.personality === personality} onClick={() => set("personality", personality)}>{personality}</Option>)}</div></>,
    <><h1 className="text-2xl font-bold">What is your AI mainly for?</h1><textarea value={form.purpose} onChange={(event) => set("purpose", event.target.value)} placeholder="Help me learn JavaScript, build projects and prepare for developer interviews." className="mt-5 min-h-36 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" /></>,
    <><h1 className="text-2xl font-bold">How should your AI respond?</h1><p className="mt-2 text-sm text-gray-600">This is optional and can be changed later.</p><textarea value={form.behavior} onChange={(event) => set("behavior", event.target.value)} placeholder="Explain things simply, give practical examples and help me improve step by step." className="mt-5 min-h-36 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" /></>,
    <><h1 className="text-2xl font-bold">Review your AI</h1><dl className="mt-5 space-y-4 rounded-xl border border-gray-200 p-5 text-sm"><div><dt className="font-medium">AI Name</dt><dd className="mt-1 text-gray-600">{form.name}</dd></div><div><dt className="font-medium">AI Type</dt><dd className="mt-1 text-gray-600">{form.type === "Other" ? form.customType : form.type}</dd></div><div><dt className="font-medium">Purpose</dt><dd className="mt-1 text-gray-600">{form.purpose}</dd></div><div><dt className="font-medium">Personality</dt><dd className="mt-1 text-gray-600">{form.personality}</dd></div><div><dt className="font-medium">Learning Topics</dt><dd className="mt-1 text-gray-600">{form.learningTopics.join(", ")}</dd></div>{form.behavior && <div><dt className="font-medium">Behavior</dt><dd className="mt-1 text-gray-600">{form.behavior}</dd></div>}</dl></>,
  ][step];

  return <main className="min-h-screen bg-gray-50 px-5 py-10"><section className="mx-auto w-full max-w-2xl"><p className="text-xl font-bold">ZeroMind</p><div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"><p className="text-sm font-semibold text-gray-500">Create Your AI 🤖</p><div className="mt-5 flex gap-1">{steps.map((label, index) => <div title={label} key={label} className={`h-1.5 flex-1 rounded ${index <= step ? "bg-black" : "bg-gray-200"}`} />)}</div><p className="mt-3 text-xs text-gray-500">Step {step + 1} of {steps.length}: {steps[step]}</p><div className="mt-8">{content}</div>{message && <p className={`mt-6 rounded-lg p-3 text-sm ${message.includes("successfully") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{message}</p>}<div className="mt-8 flex justify-between gap-3">{step > 0 ? <button type="button" onClick={() => { setMessage(""); setStep(step - 1); }} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold hover:bg-gray-50">Back</button> : <span />}{step === steps.length - 1 ? <button disabled={saving} type="button" onClick={save} className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white disabled:bg-gray-400">{saving ? "Creating..." : "Create My AI"}</button> : <button type="button" onClick={next} className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white">Continue</button>}</div></div></section></main>;
}

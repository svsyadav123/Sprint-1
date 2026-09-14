import { useNavigate } from "react-router-dom";

const plans = [{ name: "Demo Basic", price: "Free", detail: "Simple demo responses and saved conversations." }, { name: "Demo Plus", price: "$9 / month", detail: "Higher demo response preference for presentation testing." }, { name: "Demo Pro", price: "$19 / month", detail: "All demo model preferences and priority presentation access." }];

export default function Plan() {
  const navigate = useNavigate();
  return <main className="min-h-screen bg-gray-50 px-5 py-8 text-gray-900"><section className="mx-auto max-w-4xl"><button onClick={() => navigate("/workspace")} className="text-sm text-gray-600 hover:text-gray-900">← Back to workspace</button><h1 className="mt-6 text-3xl font-bold">Plans</h1><p className="mt-2 text-sm text-gray-600">View demo AI model plans. Purchases are for demonstration only.</p><div className="mt-8 grid gap-5 md:grid-cols-3">{plans.map((plan) => <article key={plan.name} className="rounded-xl border border-gray-200 bg-white p-6"><h2 className="text-lg font-semibold">{plan.name}</h2><p className="mt-4 text-2xl font-bold">{plan.price}</p><p className="mt-3 min-h-12 text-sm leading-6 text-gray-600">{plan.detail}</p><button onClick={() => window.alert(`${plan.name} selected for demo.`)} className="mt-6 w-full rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800">View / Purchase</button></article>)}</div></section></main>;
}

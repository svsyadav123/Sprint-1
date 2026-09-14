import { Link } from "react-router-dom";

const features = [
  ["Create your AI", "Create a personalized AI with your own name and purpose."],
  ["Personalize behavior", "Define how your AI should behave and respond."],
  ["Chat with your AI", "Interact with your personalized AI through a simple chat experience."],
  ["Manage your AI", "View, edit and manage your created AI from one dashboard."],
];

const steps = [["01", "Sign Up", "Create your ZeroMind account."], ["02", "Create Your AI", "Choose a name, purpose, personality and behavior."], ["03", "Personalize", "Define how your AI should behave."], ["04", "Chat", "Start interacting with your personalized AI."]];

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      <nav className="border-b border-gray-200">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">ZeroMind</Link>

          {/* Menu */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="#home" className="text-sm font-medium text-gray-900">
              Home
            </a>

            <a href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Features
            </a>

            <a href="#how-it-works" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              How It Works
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100"
            >Login</Link>

            <Link
              to="/signup"
              className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >Sign Up</Link>
          </div>

        </div>
      </nav>
            {/* Hero Section */}
      <section
        id="home"
        className="px-6 py-24 sm:py-28"
      >
        <div className="mx-auto max-w-4xl text-center">

          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-gray-500">
            Personal AI Platform
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Create Your Own AI
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Build, teach and personalize an AI that is truly yours.
            Give it a name, purpose, personality and behavior.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              to="/signup"
              className="w-full rounded-lg bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
            >Create Your AI</Link>

            <a
              href="#how-it-works"
              className="w-full rounded-lg border border-gray-300 px-7 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 sm:w-auto"
            >
              Learn More
            </a>

          </div>

        </div>
      </section>

      <section id="features" className="border-y border-gray-100 bg-gray-50 px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">Features</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to make it yours.</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(([title, description], index) => <article key={title} className="rounded-xl border border-gray-200 bg-white p-6"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold">0{index + 1}</span><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{description}</p></article>)}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center"><p className="text-sm font-semibold uppercase tracking-widest text-gray-500">How it works</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">From idea to conversation.</h2></div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([number, title, description]) => <article key={number}><p className="text-sm font-semibold text-gray-400">{number}</p><h3 className="mt-3 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{description}</p></article>)}</div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:pb-24"><div className="mx-auto max-w-6xl rounded-2xl bg-gray-900 px-6 py-14 text-center text-white sm:px-12"><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Build an AI that feels like yours.</h2><p className="mx-auto mt-4 max-w-xl text-gray-300">Create your personalized AI and start exploring ZeroMind.</p><Link to="/signup" className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100">Create Your AI</Link></div></section>
      <footer className="border-t border-gray-200 px-6 py-10"><div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-gray-900">ZeroMind</p><p className="mt-1">Create and personalize your own AI.</p></div><p>© 2026 ZeroMind</p></div></footer>

    </div>
  )
}

export default Home

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearSession, createConversation, deleteConversation, getAIs, getChats, sendChat } from "../services/auth";

function Sidebar({ user, conversations, activeConversationId, onConversation, onNewChat, onDeleteConversation, menuOpen, setMenuOpen, onLogout, className = "" }) {
  const navigate = useNavigate();
  return <aside className={`flex h-full min-h-0 w-64 shrink-0 flex-col border-r border-gray-200 bg-white p-3 ${className}`}>
    <button type="button" onClick={() => navigate("/workspace")} className="w-fit shrink-0 cursor-pointer rounded-lg px-2 py-3 text-left text-lg font-bold transition hover:bg-gray-100 active:translate-y-px">ZeroMind</button>
    <button type="button" onClick={onNewChat} className="mt-3 shrink-0 cursor-pointer rounded-lg bg-black px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 active:translate-y-px">+ New Chat</button>
    <div className="mt-7 min-h-0 flex-1 overflow-y-auto">
      <p className="px-2 text-xs font-semibold tracking-wide text-gray-500">RECENTS</p>
      <div className="mt-2 space-y-1">{conversations.length ? conversations.map((chat) => <div key={chat._id} className={`flex items-center gap-1 rounded-lg ${activeConversationId === chat._id ? "bg-gray-100" : "hover:bg-gray-50"}`}><button onClick={() => onConversation(chat._id)} className={`min-w-0 flex-1 truncate px-3 py-2 text-left text-sm ${activeConversationId === chat._id ? "font-medium" : "text-gray-600"}`}>{chat.title}</button><button onClick={() => onDeleteConversation(chat._id)} className="shrink-0 rounded px-2 py-2 text-xs text-gray-400 hover:bg-red-50 hover:text-red-600" title="Delete chat" aria-label={`Delete ${chat.title}`}>x</button></div>) : <p className="px-2 py-2 text-sm text-gray-500">No recent chats</p>}</div>
    </div>
    <div className="relative mt-3 shrink-0 border-t border-gray-200 pt-3">
      <button onClick={() => setMenuOpen(!menuOpen)} className="w-full rounded-lg px-2 py-2 text-left hover:bg-gray-50"><p className="truncate text-sm font-semibold">{user.name || "Your account"}</p><p className="truncate text-xs text-gray-500">{user.email}</p></button>
      {menuOpen && <div className="absolute bottom-14 left-0 z-20 w-full rounded-lg border border-gray-200 bg-white p-1 shadow-lg"><button onClick={() => navigate("/profile")} className="block w-full rounded px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50">Profile</button><button onClick={() => navigate("/settings")} className="block w-full rounded px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50">Settings</button><button onClick={() => navigate("/plan")} className="block w-full rounded px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50">Plan</button><button onClick={onLogout} className="block w-full rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">Logout</button></div>}
    </div>
  </aside>;
}

function MessageItem({ message }) {
  const user = (message.sender || message.role) === "user";
  const text = message.text || message.content;
  return <div className={`flex ${user ? "justify-end" : "justify-start"}`}><div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${user ? "bg-gray-900 text-white" : "border border-gray-200 bg-white text-gray-800"}`}>{message.image?.dataUrl && <img src={message.image.dataUrl} alt={message.image.name || "Uploaded"} className="mb-3 max-h-64 rounded-lg" />}{text && <p className="whitespace-pre-wrap break-words">{text}</p>}</div></div>;
}

export default function Workspace() {
  const navigate = useNavigate();
  const location = useLocation();
  const endRef = useRef(null);
  const fileRef = useRef(null);
  const recognitionRef = useRef(null);
  const [user] = useState(() => JSON.parse(localStorage.getItem("zeromindUser") || "{}"));
  const [ais, setAis] = useState([]);
  const [activeAi, setActiveAi] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [image, setImage] = useState(null);
  const [modelPreference, setModelPreference] = useState(() => localStorage.getItem("zeromindModelPreference") || "Medium");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const [leftOpen, setLeftOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    async function loadAIs() {
      try {
        const { ais: userAis } = await getAIs();
        setAis(userAis);
        const selected = userAis.find((ai) => ai._id === location.state?.aiId) || userAis[0];
        setActiveAi(selected || null);
      } catch (error) {
        setNotice(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadAIs();
  }, [location.state]);

  useEffect(() => {
    if (!activeAi) return;
    async function loadConversations() {
      try {
        const { conversations: loadedConversations } = await getChats(activeAi._id);
        setConversations(loadedConversations);
      } catch (error) {
        setNotice(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadConversations();
  }, [activeAi]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  useEffect(() => () => recognitionRef.current?.stop(), []);

  async function openConversation(id) {
    if (!activeAi) return;
    setLoading(true);
    setNotice("");
    try {
      const data = await getChats(activeAi._id, id);
      setConversations(data.conversations);
      setConversationId(data.conversation._id);
      setMessages(data.messages);
      setLeftOpen(false);
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function newChat() {
    if (!activeAi) return;
    setLoading(true);
    setNotice("");
    try {
      const data = await createConversation(activeAi._id, modelPreference);
      setConversationId(data.conversation._id);
      setMessages([]);
      setDraft("");
      setImage(null);
      setConversations((current) => [data.conversation, ...current.filter((chat) => chat._id !== data.conversation._id)]);
      setLeftOpen(false);
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteChat(id) {
    if (!activeAi || !window.confirm("Delete this chat and its messages?")) return;
    setNotice("");
    try {
      await deleteConversation(activeAi._id, id);
      setConversations((current) => current.filter((chat) => chat._id !== id));
      if (conversationId === id) await newChat();
    } catch (error) {
      setNotice(error.message);
    }
  }

  function selectAi(id) {
    const selected = ais.find((ai) => ai._id === id);
    if (selected) {
      setLoading(true);
      setConversationId(null);
      setMessages([]);
      setConversations([]);
      setActiveAi(selected);
    }
  }

  function changeModelPreference(value) {
    setModelPreference(value);
    localStorage.setItem("zeromindModelPreference", value);
  }

  function onImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!/^image\/(jpeg|png|gif|webp)$/.test(file.type) || file.size > 4 * 1024 * 1024) {
      setNotice("Use a JPG, PNG, GIF, or WebP image under 4 MB.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImage({ name: file.name, mimeType: file.type, dataUrl: reader.result });
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  function voiceInput() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return setNotice("Voice input is not supported in this browser.");
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const recognition = new Recognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.onresult = (event) => setDraft((current) => `${current}${current ? " " : ""}${event.results[0][0].transcript}`);
    recognition.onerror = () => { setListening(false); setNotice("Voice input could not be completed. Please try again."); };
    recognition.onend = () => { setListening(false); recognitionRef.current = null; };
    try { recognition.start(); setListening(true); } catch { setNotice("Voice input could not be started. Please try again."); }
  }

  const submit = useCallback(async function submit() {
    const text = draft.trim();
    if (sending || (!text && !image) || !activeAi) return;
    const pendingId = `pending-${Date.now()}`;
    const pendingMessage = { _id: pendingId, sender: "user", text, image };
    setSending(true);
    setNotice("");
    setMessages((current) => [...current, pendingMessage]);
    setDraft("");
    setImage(null);
    try {
      const data = await sendChat(activeAi._id, { message: text, image: pendingMessage.image, conversationId, modelLevel: modelPreference });
      if (!data?.conversation?._id || !Array.isArray(data.messages)) throw new Error("The chat response was incomplete. Please try again.");
      setConversationId(data.conversation._id);
      setMessages((current) => [...current.filter((message) => message._id !== pendingId), ...data.messages]);
      setConversations((current) => [data.conversation, ...current.filter((chat) => chat._id !== data.conversation._id)]);
    } catch (error) {
      setMessages((current) => current.filter((message) => message._id !== pendingId));
      setDraft(text);
      setImage(pendingMessage.image);
      setNotice(error.message);
    } finally {
      setSending(false);
    }
  }, [sending, draft, image, activeAi, conversationId, modelPreference]);

  function logout() {
    clearSession();
    navigate("/login");
  }

  const title = activeAi?.type === "Other" ? activeAi.customType : activeAi?.type;
  const suggestions = ["Help me prepare for a React interview", "Explain JavaScript closures simply", "Help me create a movie story"];

  if (loading && !activeAi) return <main className="flex min-h-screen items-center justify-center bg-gray-50 text-sm text-gray-600">Loading workspace...</main>;
  if (!activeAi) return <main className="flex min-h-screen items-center justify-center bg-gray-50"><div className="text-center"><p className="text-lg font-semibold">Create an AI to begin</p><button onClick={() => navigate("/create-ai")} className="mt-4 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white">Create Your AI</button></div></main>;

  return <main className="flex h-screen overflow-hidden bg-white text-gray-900">
    <Sidebar user={user} conversations={conversations} activeConversationId={conversationId} onConversation={openConversation} onNewChat={newChat} onDeleteConversation={deleteChat} menuOpen={menuOpen} setMenuOpen={setMenuOpen} onLogout={logout} className="hidden lg:flex" />
    {leftOpen && <div className="fixed inset-0 z-30 bg-black/25 lg:hidden" onClick={() => setLeftOpen(false)}><Sidebar user={user} conversations={conversations} activeConversationId={conversationId} onConversation={openConversation} onNewChat={newChat} onDeleteConversation={deleteChat} menuOpen={menuOpen} setMenuOpen={setMenuOpen} onLogout={logout} className="h-full" /></div>}
    <section className="flex min-w-0 flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-4 sm:px-6"><div className="flex items-center gap-3"><button onClick={() => setLeftOpen(true)} className="rounded p-2 hover:bg-gray-100 lg:hidden">☰</button><div><select value={activeAi._id} onChange={(event) => selectAi(event.target.value)} className="max-w-48 bg-transparent text-sm font-semibold outline-none"><option value={activeAi._id}>{activeAi.name}</option>{ais.filter((ai) => ai._id !== activeAi._id).map((ai) => <option key={ai._id} value={ai._id}>{ai.name}</option>)}</select><p className="text-xs text-gray-500">{title} · {activeAi.personality}</p></div></div></header>
      <div className="min-h-0 flex-1 overflow-y-auto bg-gray-50 px-4 py-6 sm:px-8">{!messages.length && !loading ? <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center text-center"><h1 className="text-2xl font-semibold">How can I help you today?</h1><p className="mt-2 text-sm leading-6 text-gray-600">Chat with {activeAi.name} and work on your ideas, questions and tasks.</p><div className="mt-6 flex flex-wrap justify-center gap-2">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => setDraft(suggestion)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:border-gray-400">{suggestion}</button>)}</div></div> : <div className="mx-auto max-w-3xl space-y-5">{messages.map((message) => <MessageItem key={message._id || `${message.role}-${message.createdAt}`} message={message} />)}{sending && <p className="text-sm text-gray-500">Thinking...</p>}<div ref={endRef} /></div>}</div>
      {notice && <p className="mx-4 mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 sm:mx-6">{notice}</p>}
      {conversationId && <div className="mx-4 mb-2 flex justify-end sm:mx-6"><button onClick={() => deleteChat(conversationId)} className="text-xs text-gray-500 hover:text-red-600">Delete Chat</button></div>}
      <div className="shrink-0 border-t border-gray-200 bg-white p-3 sm:p-4"><div className="mx-auto max-w-3xl rounded-xl border border-gray-300 bg-white p-2"><input ref={fileRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={onImage} className="hidden" />{image && <div className="relative mb-2 inline-block"><img src={image.dataUrl} alt={image.name} className="h-16 w-16 rounded-lg object-cover" /><button onClick={() => setImage(null)} className="absolute -right-2 -top-2 rounded-full bg-black px-1.5 text-xs text-white">x</button></div>}<div className="flex items-end gap-2"><button onClick={() => fileRef.current?.click()} className="rounded-lg p-2 text-lg hover:bg-gray-100" title="Upload image">+</button><textarea rows="1" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); submit(); } }} placeholder="Type a message..." className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none" /><select value={modelPreference} onChange={(event) => changeModelPreference(event.target.value)} aria-label="AI model" className="h-10 rounded-lg border border-gray-200 bg-white px-2 text-xs font-semibold text-gray-700 outline-none"><option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option></select><button onClick={voiceInput} className={`rounded-lg p-2 text-lg ${listening ? "bg-gray-200 text-black" : "hover:bg-gray-100"}`} title={listening ? "Stop voice input" : "Start voice input"}>{listening ? "stop" : "voice"}</button><button disabled={sending || (!draft.trim() && !image)} onClick={submit} className="rounded-lg bg-black px-3 py-2 text-white disabled:bg-gray-300" title="Send">send</button></div></div></div>
    </section>
  </main>;
}

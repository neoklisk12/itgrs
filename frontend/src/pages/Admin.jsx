import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Mail, Phone, MessageSquare, Users, FileText, LogOut, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

const API = "/api";
const TOKEN_KEY = "coreon_admin_token";

function formatDate(str) {
  if (!str) return "—";
  try {
    const d = new Date(str);
    return d.toLocaleString("el-GR", { dateStyle: "short", timeStyle: "short" });
  } catch {
    return str;
  }
}

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loadError, setLoadError] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("contacts");
  const [expanded, setExpanded] = useState({});

  const fetchData = useCallback(async (tok) => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await axios.get(`${API}/admin/submissions`, {
        headers: { Authorization: `Bearer ${tok}` },
      });
      setData(res.data);
    } catch {
      setLoadError("Δεν ήταν δυνατή η φόρτωση των δεδομένων.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) fetchData(token);
  }, [token, fetchData]);

  const login = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await axios.post(`${API}/admin/login`, { password });
      const tok = res.data.token;
      localStorage.setItem(TOKEN_KEY, tok);
      setToken(tok);
    } catch {
      setLoginError("Λάθος κωδικός. Δοκιμάστε ξανά.");
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setData(null);
    setLoadError("");
  };

  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-8">
            <img src="/coreon-logo-full.png" alt="Coreon IT" className="h-8 w-8" />
            <span className="font-bold text-lg tracking-tight">Coreon <span className="text-blue-600">IT</span> <span className="text-slate-400 font-normal text-sm">Admin</span></span>
          </div>
          <h1 className="text-xl font-bold mb-6 text-slate-900">Σύνδεση</h1>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Κωδικός Διαχειριστή</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 text-sm transition"
            >
              Είσοδος
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "contacts", label: "Μηνύματα", icon: MessageSquare, count: data?.contacts?.length },
    { id: "quotes", label: "Αιτήματα Προσφοράς", icon: FileText, count: data?.quotes?.length },
    { id: "newsletter", label: "Newsletter", icon: Users, count: data?.newsletter?.length },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/coreon-logo-full.png" alt="Coreon IT" className="h-8 w-8 brightness-125" />
          <span className="font-bold text-lg tracking-tight">Coreon <span className="text-blue-500">IT</span> <span className="text-slate-400 font-normal text-sm">Admin</span></span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchData(token)}
            disabled={loading}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white text-sm transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Ανανέωση
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white text-sm transition"
          >
            <LogOut className="w-4 h-4" />
            Έξοδος
          </button>
        </div>
      </header>

      {loading && !data ? (
        <div className="flex items-center justify-center h-64 text-slate-500">Φόρτωση...</div>
      ) : data ? (
        <div className="max-w-6xl mx-auto p-6">
          {loadError && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
              {loadError}
            </div>
          )}
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <StatCard label="Μηνύματα Επικοινωνίας" value={data.contacts.length} icon={MessageSquare} color="blue" />
            <StatCard label="Αιτήματα Προσφοράς" value={data.quotes.length} icon={FileText} color="indigo" />
            <StatCard label="Newsletter" value={data.newsletter.length} icon={Users} color="violet" />
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 border-b border-slate-200">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition -mb-px ${
                  tab === t.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
                <span className="bg-slate-100 text-slate-600 text-xs px-1.5 py-0.5 rounded-full font-mono">{t.count ?? 0}</span>
              </button>
            ))}
          </div>

          {/* Contact messages */}
          {tab === "contacts" && (
            <div className="space-y-3">
              {data.contacts.length === 0 && <Empty label="Δεν υπάρχουν μηνύματα" />}
              {data.contacts.map((c) => (
                <div key={c.id} className="bg-white border border-slate-200 overflow-hidden">
                  <div
                    className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 transition"
                    onClick={() => toggle(c.id)}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                        {c.name?.[0]?.toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 text-sm">{c.name}</div>
                        <div className="text-slate-500 text-xs truncate">{c.email} {c.company ? `· ${c.company}` : ""}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      {c.service && <span className="hidden sm:block text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">{c.service}</span>}
                      <span className="text-xs text-slate-400">{formatDate(c.created_at)}</span>
                      {expanded[c.id] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>
                  {expanded[c.id] && (
                    <div className="px-5 pb-5 border-t border-slate-100 pt-4 grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <Row label="Email"><a href={`mailto:${c.email}`} className="text-blue-600 hover:underline">{c.email}</a></Row>
                        {c.phone && <Row label="Τηλέφωνο"><a href={`tel:${c.phone}`} className="text-blue-600 hover:underline">{c.phone}</a></Row>}
                        {c.company && <Row label="Εταιρεία">{c.company}</Row>}
                        {c.service && <Row label="Υπηρεσία">{c.service}</Row>}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Μήνυμα</div>
                        <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{c.message}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Quote requests */}
          {tab === "quotes" && (
            <div className="space-y-3">
              {data.quotes.length === 0 && <Empty label="Δεν υπάρχουν αιτήματα" />}
              {data.quotes.map((q) => (
                <div key={q.id} className="bg-white border border-slate-200 overflow-hidden">
                  <div
                    className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 transition"
                    onClick={() => toggle(q.id)}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                        {q.name?.[0]?.toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 text-sm">{q.name}</div>
                        <div className="text-slate-500 text-xs truncate">{q.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="hidden sm:block text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">{q.plan}</span>
                      {q.budget && <span className="hidden sm:block text-xs text-slate-500">{q.budget}</span>}
                      <span className="text-xs text-slate-400">{formatDate(q.created_at)}</span>
                      {expanded[q.id] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>
                  {expanded[q.id] && (
                    <div className="px-5 pb-5 border-t border-slate-100 pt-4 grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <Row label="Email"><a href={`mailto:${q.email}`} className="text-blue-600 hover:underline">{q.email}</a></Row>
                        {q.phone && <Row label="Τηλέφωνο"><a href={`tel:${q.phone}`} className="text-blue-600 hover:underline">{q.phone}</a></Row>}
                        <Row label="Πλάνο">{q.plan}</Row>
                        {q.budget && <Row label="Budget">{q.budget}</Row>}
                      </div>
                      {q.message && (
                        <div>
                          <div className="text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Μήνυμα</div>
                          <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{q.message}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Newsletter */}
          {tab === "newsletter" && (
            <div className="bg-white border border-slate-200 overflow-hidden">
              {data.newsletter.length === 0 && <Empty label="Δεν υπάρχουν εγγραφές" />}
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">#</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Email</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Γλώσσα</th>
                    <th className="text-left px-5 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Ημερομηνία</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.newsletter.map((n, i) => (
                    <tr key={n.id} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-3 text-slate-400 font-mono text-xs">{i + 1}</td>
                      <td className="px-5 py-3">
                        <a href={`mailto:${n.email}`} className="text-blue-600 hover:underline">{n.email}</a>
                      </td>
                      <td className="px-5 py-3">
                        <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded uppercase font-mono">{n.locale}</span>
                      </td>
                      <td className="px-5 py-3 text-slate-500 text-xs">{formatDate(n.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    indigo: "bg-indigo-50 text-indigo-700",
    violet: "bg-violet-50 text-violet-700",
  };
  return (
    <div className="bg-white border border-slate-200 p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${colors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="text-xs text-slate-500 mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div>
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}: </span>
      <span className="text-slate-800">{children}</span>
    </div>
  );
}

function Empty({ label }) {
  return <div className="text-center py-12 text-slate-400 text-sm">{label}</div>;
}

import React, { useState, useEffect } from "react";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const FontInjector = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
};

// ─── SUPABASE CONFIG ──────────────────────────────────────────────────────────
// ⚠️ Replace these with your actual Supabase project values
const SUPABASE_URL = "https://yizzvwyvdnkbbhvojqlp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Bz5xRPDQ_ZDE99T_QRSLlg_UKLH-6b6";

// Lightweight Supabase REST helper (no SDK needed)
const supabase = {
  async select(table, filters = "") {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filters}&order=created_at.desc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async insert(table, data) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async update(table, id, data) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};

// ─── AI GENERATOR ─────────────────────────────────────────────────────────────
async function generateSEOPost(productTitle, productPrice) {
  const prompt = `You are an expert SEO content writer. Generate a complete SEO-optimized product post.

Product Title: ${productTitle}
Product Price: ${productPrice}

Respond ONLY with valid JSON (no markdown, no backticks):
{
  "seoTitle": "compelling SEO title under 60 chars",
  "description": "rich product description 80-120 words, persuasive and benefit-focused",
  "metaDescription": "SEO meta description under 155 chars with price and key benefit",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "hashtags": ["#Tag1", "#Tag2", "#Tag3", "#Tag4", "#Tag5"],
  "cta": "compelling call-to-action phrase"
}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  const text = data.content?.map((b) => b.text || "").join("") || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink: #0a0a0f; --paper: #f5f3ee; --cream: #ede9e0;
    --accent: #c8f03c; --accent2: #ff5c35; --muted: #888880;
    --border: #d8d4cc; --white: #ffffff;
  }
  body { background: var(--paper); color: var(--ink); font-family: 'DM Mono', monospace; }
  .app { min-height: 100vh; display: flex; }

  .sidebar {
    width: 220px; min-height: 100vh; background: var(--ink);
    display: flex; flex-direction: column; padding: 32px 0;
    position: fixed; left: 0; top: 0; bottom: 0; z-index: 100;
  }
  .logo { padding: 0 24px 32px; border-bottom: 1px solid #1e1e28; }
  .logo-mark { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; color: var(--accent); }
  .logo-tag { font-size: 10px; color: #555550; margin-top: 2px; letter-spacing: 1px; text-transform: uppercase; }
  .nav { padding: 20px 0; flex: 1; }
  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 11px 24px;
    color: #666660; font-size: 12px; cursor: pointer; transition: all 0.15s;
    letter-spacing: 0.3px; border-left: 3px solid transparent;
    font-family: 'DM Mono', monospace;
  }
  .nav-item:hover { color: var(--paper); background: #12121a; }
  .nav-item.active { color: var(--accent); border-left-color: var(--accent); background: #0f0f18; }
  .nav-icon { font-size: 15px; width: 20px; text-align: center; }
  .sidebar-plan { margin: 0 16px 16px; background: #12121a; border: 1px solid #1e1e28; border-radius: 8px; padding: 14px; }
  .plan-label { font-size: 9px; color: #444; text-transform: uppercase; letter-spacing: 1px; }
  .plan-name { font-size: 13px; color: var(--accent); font-weight: 500; margin-top: 4px; font-family: 'Syne', sans-serif; }
  .plan-upgrade { font-size: 10px; color: var(--accent2); margin-top: 6px; cursor: pointer; text-decoration: underline; }

  .main { margin-left: 220px; flex: 1; padding: 40px 48px; max-width: 1200px; }
  .page-header { margin-bottom: 36px; }
  .page-title { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: var(--ink); line-height: 1; }
  .page-sub { font-size: 12px; color: var(--muted); margin-top: 6px; letter-spacing: 0.3px; }

  /* SUPABASE SETUP BANNER */
  .setup-banner {
    background: #fff8e1; border: 1px solid #ffd54f; border-radius: 12px;
    padding: 18px 22px; margin-bottom: 24px; font-size: 12px; color: #5d4037;
  }
  .setup-banner strong { font-family: 'Syne', sans-serif; font-size: 13px; display: block; margin-bottom: 8px; color: #333; }
  .setup-banner code { background: #fff3cd; padding: 2px 6px; border-radius: 4px; font-family: 'DM Mono', monospace; font-size: 11px; }
  .setup-steps { margin-top: 10px; padding-left: 16px; }
  .setup-steps li { margin-bottom: 5px; line-height: 1.6; }

  /* CONFIG INPUTS */
  .config-row { display: flex; gap: 12px; margin-bottom: 16px; align-items: flex-end; }
  .config-group { flex: 1; }
  .config-label { font-size: 9px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
  .config-input {
    width: 100%; background: #f9f9f9; border: 1px solid var(--border);
    border-radius: 8px; padding: 10px 14px; font-family: 'DM Mono', monospace;
    font-size: 12px; outline: none; transition: border-color 0.2s; color: var(--ink);
  }
  .config-input:focus { border-color: var(--accent); }
  .config-save-btn {
    background: var(--ink); color: var(--accent); border: none; border-radius: 8px;
    padding: 10px 20px; font-family: 'Syne', sans-serif; font-size: 12px;
    font-weight: 700; cursor: pointer; white-space: nowrap;
  }
  .config-save-btn:hover { background: #1a1a2e; }

  /* DB STATUS */
  .db-status {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 10px; padding: 4px 10px; border-radius: 20px; margin-bottom: 20px;
  }
  .db-status.connected { background: #dcfce7; color: #16a34a; }
  .db-status.disconnected { background: #fee2e2; color: #dc2626; }
  .db-status.checking { background: #fef3c7; color: #d97706; }
  .db-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

  /* GENERATE CARD */
  .generate-card {
    background: var(--ink); border-radius: 16px; padding: 40px;
    margin-bottom: 32px; position: relative; overflow: hidden;
  }
  .generate-card::before {
    content: ''; position: absolute; top: -60px; right: -60px;
    width: 200px; height: 200px; background: var(--accent); border-radius: 50%; opacity: 0.06;
  }
  .gen-title { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 22px; color: var(--paper); margin-bottom: 24px; }
  .gen-row { display: flex; gap: 16px; align-items: flex-end; }
  .input-group { flex: 1; }
  .input-label { font-size: 10px; color: #666660; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .input-field {
    width: 100%; background: #12121a; border: 1px solid #2a2a35;
    border-radius: 10px; padding: 14px 16px; color: var(--paper);
    font-family: 'DM Mono', monospace; font-size: 14px; outline: none; transition: border-color 0.2s;
  }
  .input-field::placeholder { color: #3a3a45; }
  .input-field:focus { border-color: var(--accent); }
  .gen-btn {
    background: var(--accent); color: var(--ink); border: none; border-radius: 10px;
    padding: 14px 28px; font-family: 'Syne', sans-serif; font-size: 14px;
    font-weight: 700; cursor: pointer; white-space: nowrap; transition: all 0.2s;
  }
  .gen-btn:hover { background: #d4f54a; transform: translateY(-1px); }
  .gen-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .gen-btn.loading { background: #2a2a35; color: #666; }

  .spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid #444; border-top-color: var(--accent); border-radius: 50%; animation: spin 0.7s linear infinite; margin-right: 8px; vertical-align: middle; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* RESULT CARD */
  .result-card { background: var(--white); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; margin-bottom: 32px; animation: slideUp 0.4s ease; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .result-header { background: var(--ink); padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
  .result-header-left { display: flex; align-items: center; gap: 10px; }
  .result-badge { background: var(--accent); color: var(--ink); font-size: 9px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; font-family: 'Syne', sans-serif; }
  .result-product-name { font-size: 13px; color: var(--paper); font-family: 'Syne', sans-serif; font-weight: 600; }
  .header-btns { display: flex; gap: 10px; align-items: center; }
  .save-db-btn {
    background: #7c9cf0; color: white; border: none; border-radius: 8px;
    padding: 10px 18px; font-family: 'Syne', sans-serif; font-size: 12px;
    font-weight: 700; cursor: pointer; transition: all 0.2s;
  }
  .save-db-btn:hover { background: #5b7de0; }
  .save-db-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .save-db-btn.saved { background: #22c55e; cursor: default; }
  .publish-btn {
    background: var(--accent2); color: white; border: none; border-radius: 8px;
    padding: 10px 22px; font-family: 'Syne', sans-serif; font-size: 12px;
    font-weight: 700; cursor: pointer; transition: all 0.2s;
  }
  .publish-btn:hover { background: #ff3d15; transform: translateY(-1px); }
  .publish-btn.published { background: #22c55e; cursor: default; transform: none; }
  .publish-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .result-body { padding: 28px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .result-field { }
  .result-field.full { grid-column: 1 / -1; }
  .field-label { font-size: 9px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted); margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
  .field-value { font-size: 13px; color: var(--ink); line-height: 1.6; background: var(--paper); border-radius: 8px; padding: 12px 14px; border: 1px solid var(--border); font-family: 'DM Mono', monospace; }
  .field-value.title-val { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; }
  .tags-wrap { display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 12px; background: var(--paper); border: 1px solid var(--border); border-radius: 8px; }
  .tag { background: var(--ink); color: var(--paper); font-size: 10px; padding: 4px 10px; border-radius: 20px; font-family: 'DM Mono', monospace; }
  .hashtag { background: #1a1a2e; color: var(--accent); }

  /* STATS */
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; }
  .stat-card { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 22px 24px; position: relative; overflow: hidden; }
  .stat-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; }
  .stat-card.green::after { background: var(--accent); }
  .stat-card.red::after { background: var(--accent2); }
  .stat-card.blue::after { background: #7c9cf0; }
  .stat-num { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; color: var(--ink); line-height: 1; }
  .stat-label { font-size: 11px; color: var(--muted); margin-top: 6px; }

  /* TABLE */
  .section-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
  .section-count { background: var(--cream); color: var(--muted); font-size: 10px; padding: 2px 8px; border-radius: 20px; font-family: 'DM Mono', monospace; font-weight: 400; }
  .posts-table { background: var(--white); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
  .table-head { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; padding: 12px 20px; background: var(--paper); border-bottom: 1px solid var(--border); font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); }
  .table-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; padding: 16px 20px; border-bottom: 1px solid var(--border); align-items: center; transition: background 0.15s; font-size: 12px; }
  .table-row:last-child { border-bottom: none; }
  .table-row:hover { background: var(--paper); }
  .post-name { font-weight: 500; color: var(--ink); }
  .post-price { color: var(--muted); }
  .status-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 10px; padding: 3px 10px; border-radius: 20px; font-weight: 500; }
  .status-badge.published { background: #dcfce7; color: #16a34a; }
  .status-badge.draft { background: #fef3c7; color: #d97706; }
  .status-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
  .post-date { color: var(--muted); font-size: 11px; }

  /* ADMIN */
  .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px; }
  .admin-stat { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 20px 24px; }
  .admin-stat-num { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; }
  .admin-stat-label { font-size: 11px; color: var(--muted); margin-top: 4px; }
  .users-table { background: var(--white); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
  .users-head { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; padding: 12px 20px; background: var(--paper); border-bottom: 1px solid var(--border); font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); }
  .users-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; padding: 16px 20px; border-bottom: 1px solid var(--border); align-items: center; font-size: 12px; }
  .users-row:last-child { border-bottom: none; }
  .user-name { font-weight: 500; color: var(--ink); }
  .user-email { font-size: 10px; color: var(--muted); margin-top: 2px; }
  .plan-badge { display: inline-block; font-size: 9px; padding: 3px 8px; border-radius: 4px; font-weight: 700; letter-spacing: 0.5px; font-family: 'Syne', sans-serif; }
  .plan-badge.Basic { background: #f3f4f6; color: #666; }
  .plan-badge.Pro { background: #dbeafe; color: #2563eb; }
  .plan-badge.Agency { background: #fef3c7; color: #d97706; }
  .toggle-btn { border: none; border-radius: 6px; padding: 6px 12px; font-size: 10px; font-family: 'DM Mono', monospace; cursor: pointer; transition: all 0.2s; }
  .toggle-btn.enable { background: #dcfce7; color: #16a34a; }
  .toggle-btn.disable { background: #fee2e2; color: #dc2626; }

  /* PLANS */
  .plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .plan-card { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 28px 24px; position: relative; transition: transform 0.2s, box-shadow 0.2s; }
  .plan-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
  .plan-card.featured { background: var(--ink); border-color: var(--accent); }
  .plan-popular { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: var(--accent); color: var(--ink); font-size: 9px; font-weight: 700; padding: 4px 14px; border-radius: 20px; letter-spacing: 1px; text-transform: uppercase; font-family: 'Syne', sans-serif; white-space: nowrap; }
  .plan-name-text { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; margin-bottom: 8px; }
  .plan-card.featured .plan-name-text { color: var(--accent); }
  .plan-price-text { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; line-height: 1; }
  .plan-card.featured .plan-price-text { color: var(--paper); }
  .plan-mo { font-size: 12px; color: var(--muted); }
  .plan-features { margin: 20px 0; list-style: none; }
  .plan-feat { font-size: 12px; padding: 6px 0; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 8px; }
  .plan-card.featured .plan-feat { border-color: #2a2a35; color: #aaa; }
  .feat-check { color: var(--accent); font-size: 11px; }
  .plan-cta-btn { width: 100%; padding: 13px; border-radius: 10px; border: 2px solid var(--ink); background: transparent; color: var(--ink); font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
  .plan-card.featured .plan-cta-btn { background: var(--accent); border-color: var(--accent); color: var(--ink); }
  .plan-cta-btn:hover { background: var(--ink); color: var(--paper); }

  .toast { position: fixed; bottom: 32px; right: 32px; background: var(--ink); color: var(--paper); padding: 14px 22px; border-radius: 10px; font-size: 13px; display: flex; align-items: center; gap: 10px; box-shadow: 0 8px 32px rgba(0,0,0,0.2); animation: slideIn 0.3s ease; z-index: 999; border-left: 4px solid var(--accent); }
  @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .toast.error { border-left-color: var(--accent2); }

  .error-box { background: #fee2e2; border: 1px solid #fca5a5; border-radius: 8px; padding: 14px 18px; color: #dc2626; font-size: 12px; margin-top: 16px; }
  .empty-state { text-align: center; padding: 48px 24px; color: var(--muted); font-size: 13px; }
  .empty-icon { font-size: 36px; margin-bottom: 12px; }
  .loading-row { text-align: center; padding: 32px; color: var(--muted); font-size: 12px; }
  .sql-box { background: #1e1e2e; border-radius: 8px; padding: 16px; margin-top: 12px; font-family: 'DM Mono', monospace; font-size: 11px; color: #a6e3a1; line-height: 1.8; overflow-x: auto; }
`;

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function PostRankAI() {
  const [view, setView] = useState("setup");
  const [supabaseUrl, setSupabaseUrl] = useState("https://yizzvwyvdnkbbhvojqlp.supabase.co");
  const [supabaseKey, setSupabaseKey] = useState("sb_publishable_Bz5xRPDQ_ZDE99T_QRSLlg_UKLH-6b6");
  const [dbConnected, setDbConnected] = useState(false);
  const [dbChecking, setDbChecking] = useState(false);

  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [toast, setToast] = useState(null);
  const [toastType, setToastType] = useState("success");

  // Runtime supabase helper using current config
  const db = {
    async select(table, filters = "") {
      const url = supabaseUrl || SUPABASE_URL;
      const key = supabaseKey || SUPABASE_ANON_KEY;
      const res = await fetch(`${url}/rest/v1/${table}?${filters}&order=created_at.desc`, {
        headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    async insert(table, data) {
      const url = supabaseUrl || SUPABASE_URL;
      const key = supabaseKey || SUPABASE_ANON_KEY;
      const res = await fetch(`${url}/rest/v1/${table}`, {
        method: "POST",
        headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=representation" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    async update(table, id, data) {
      const url = supabaseUrl || SUPABASE_URL;
      const key = supabaseKey || SUPABASE_ANON_KEY;
      const res = await fetch(`${url}/rest/v1/${table}?id=eq.${id}`, {
        method: "PATCH",
        headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=representation" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
  };

  const showToast = (msg, type = "success") => {
    setToastType(type);
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const testConnection = async () => {
    if (!supabaseUrl || !supabaseKey) { showToast("Please enter URL and Key first", "error"); return; }
    setDbChecking(true);
    try {
      const url = supabaseUrl.trim();
      const key = supabaseKey.trim();
      const res = await fetch(`${url}/rest/v1/posts?limit=1`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
      });
      if (res.status === 200 || res.status === 206) {
        setDbConnected(true);
        showToast("✓ Supabase connected successfully!");
        setView("generate");
        loadPosts();
      } else {
        const txt = await res.text();
        if (txt.includes("posts") || res.status === 404) {
          setDbConnected(true);
          showToast("✓ Connected! Make sure to create the posts table.");
          setView("generate");
        } else {
          throw new Error("Connection failed: " + res.status);
        }
      }
    } catch (e) {
      showToast("❌ Connection failed. Check your URL and Key.", "error");
      setDbConnected(false);
    } finally {
      setDbChecking(false);
    }
  };

  const loadPosts = async () => {
    setPostsLoading(true);
    try {
      const data = await db.select("posts");
      setPosts(data);
    } catch (e) {
      // table might not exist yet
      setPosts([]);
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    if (dbConnected && (view === "dashboard" || view === "posts")) {
      loadPosts();
    }
  }, [view, dbConnected]);

  const handleGenerate = async () => {
    if (!productTitle.trim() || !productPrice.trim()) { setError("Please enter both product title and price."); return; }
    setError(""); setGenerating(true); setGeneratedPost(null); setSaved(false); setPublished(false);
    try {
      const result = await generateSEOPost(productTitle, productPrice);
      setGeneratedPost({ ...result, product: productTitle, price: productPrice });
    } catch (e) {
      setError("AI generation failed. Please check your connection and try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveToSupabase = async () => {
    if (!generatedPost || !dbConnected) return;
    setSaving(true);
    try {
      const record = {
        product_title: generatedPost.product,
        product_price: generatedPost.price,
        seo_title: generatedPost.seoTitle,
        description: generatedPost.description,
        meta_description: generatedPost.metaDescription,
        keywords: generatedPost.keywords,
        hashtags: generatedPost.hashtags,
        cta: generatedPost.cta,
        status: "draft",
        created_at: new Date().toISOString(),
      };
      const saved_data = await db.insert("posts", record);
      setSaved(true);
      setPosts((prev) => [saved_data[0] || { ...record, id: Date.now() }, ...prev]);
      showToast("✓ Post saved to Supabase database!");
    } catch (e) {
      showToast("❌ Save failed: " + e.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!generatedPost) return;
    setPublishing(true);
    try {
      if (dbConnected && saved) {
        // Update status in DB
        const postInDb = posts[0];
        if (postInDb?.id) await db.update("posts", postInDb.id, { status: "published" });
        setPosts((prev) => prev.map((p, i) => i === 0 ? { ...p, status: "published" } : p));
      }
      setPublished(true);
      showToast("🚀 Post published to your website!");
    } catch (e) {
      showToast("❌ Publish failed: " + e.message, "error");
    } finally {
      setPublishing(false);
    }
  };

  const totalPublished = posts.filter((p) => p.status === "published").length;

  return (
    <>
      <FontInjector />
      <style>{styles}</style>
      <div className="app">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-mark">PostRank AI</div>
            <div className="logo-tag">SEO Automation</div>
          </div>
          <nav className="nav">
            {[
              { id: "setup", icon: "⚙", label: "Supabase Setup" },
              { id: "generate", icon: "⚡", label: "Generate Post" },
              { id: "dashboard", icon: "◫", label: "Dashboard" },
              { id: "posts", icon: "≡", label: "My Posts" },
              { id: "plans", icon: "◈", label: "Plans" },
              { id: "admin", icon: "⊕", label: "Admin Panel" },
            ].map((item) => (
              <div key={item.id} className={`nav-item ${view === item.id ? "active" : ""}`} onClick={() => setView(item.id)}>
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>
          <div className="sidebar-plan">
            <div className="plan-label">DB Status</div>
            <div className="plan-name" style={{ color: dbConnected ? "var(--accent)" : "#ff5c35" }}>
              {dbConnected ? "● Connected" : "○ Not Connected"}
            </div>
            {!dbConnected && <div className="plan-upgrade" onClick={() => setView("setup")}>Setup Supabase →</div>}
          </div>
        </aside>

        <main className="main">

          {/* ── SETUP ── */}
          {view === "setup" && (
            <>
              <div className="page-header">
                <div className="page-title">Supabase Setup</div>
                <div className="page-sub">Connect your database in 3 simple steps</div>
              </div>

              <div className="setup-banner">
                <strong>📋 Step 1 — Create your Supabase project</strong>
                Go to <code>supabase.com</code> → New Project → Copy your <code>Project URL</code> and <code>anon public key</code> from Settings → API
              </div>

              <div className="setup-banner" style={{ borderColor: "#b2dfdb", background: "#e0f7fa" }}>
                <strong>🗄 Step 2 — Create the posts table (run in SQL Editor)</strong>
                <div className="sql-box">
{`CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_title TEXT NOT NULL,
  product_price TEXT,
  seo_title TEXT,
  description TEXT,
  meta_description TEXT,
  keywords TEXT[],
  hashtags TEXT[],
  cta TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public access" ON posts FOR ALL USING (true);`}
                </div>
              </div>

              <div className="setup-banner" style={{ borderColor: "#ce93d8", background: "#f3e5f5" }}>
                <strong>🔑 Step 3 — Enter your credentials below</strong>
                <div className="config-row" style={{ marginTop: 12 }}>
                  <div className="config-group">
                    <div className="config-label">Supabase Project URL</div>
                    <input className="config-input" placeholder="https://xxxxxxxxxxxx.supabase.co" value={supabaseUrl} onChange={(e) => setSupabaseUrl(e.target.value)} />
                  </div>
                  <div className="config-group">
                    <div className="config-label">Anon Public Key</div>
                    <input className="config-input" placeholder="eyJhbGciOiJIUzI1NiIsIn..." value={supabaseKey} onChange={(e) => setSupabaseKey(e.target.value)} type="password" />
                  </div>
                  <button className="config-save-btn" onClick={testConnection} disabled={dbChecking}>
                    {dbChecking ? "Testing..." : "Connect →"}
                  </button>
                </div>
              </div>

              {dbConnected && (
                <div className="db-status connected">
                  <span className="db-dot" /> Supabase Connected — Data saves to your database automatically
                </div>
              )}
            </>
          )}

          {/* ── GENERATE ── */}
          {view === "generate" && (
            <>
              <div className="page-header">
                <div className="page-title">Generate Post</div>
                <div className="page-sub">Enter product → AI writes everything → Save to Supabase → Publish</div>
              </div>

              {!dbConnected && (
                <div className="setup-banner" style={{ marginBottom: 20 }}>
                  <strong>⚠️ Supabase not connected</strong>
                  Posts won't be saved to database. <span style={{ color: "#c8400a", cursor: "pointer", textDecoration: "underline" }} onClick={() => setView("setup")}>Connect now →</span>
                </div>
              )}

              <div className="generate-card">
                <div className="gen-title">What are you selling today?</div>
                <div className="gen-row">
                  <div className="input-group">
                    <div className="input-label">Product Title</div>
                    <input className="input-field" placeholder="e.g. Nike Running Shoes" value={productTitle} onChange={(e) => setProductTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleGenerate()} />
                  </div>
                  <div className="input-group" style={{ maxWidth: 180 }}>
                    <div className="input-label">Price</div>
                    <input className="input-field" placeholder="e.g. $49" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleGenerate()} />
                  </div>
                  <button className={`gen-btn ${generating ? "loading" : ""}`} onClick={handleGenerate} disabled={generating}>
                    {generating ? <><span className="spinner" />Generating…</> : "⚡ Generate Post"}
                  </button>
                </div>
                {error && <div className="error-box">{error}</div>}
              </div>

              {generatedPost && (
                <div className="result-card">
                  <div className="result-header">
                    <div className="result-header-left">
                      <span className="result-badge">AI Generated</span>
                      <span className="result-product-name">{generatedPost.product} · {generatedPost.price}</span>
                    </div>
                    <div className="header-btns">
                      {dbConnected && (
                        <button className={`save-db-btn ${saved ? "saved" : ""}`} onClick={handleSaveToSupabase} disabled={saving || saved}>
                          {saved ? "✓ Saved to DB" : saving ? "Saving..." : "💾 Save to Supabase"}
                        </button>
                      )}
                      <button className={`publish-btn ${published ? "published" : ""}`} onClick={handlePublish} disabled={publishing || published}>
                        {published ? "✓ Published!" : publishing ? "Publishing..." : "🚀 Publish"}
                      </button>
                    </div>
                  </div>
                  <div className="result-body">
                    <div className="result-field full">
                      <div className="field-label">🏷 SEO Title</div>
                      <div className="field-value title-val">{generatedPost.seoTitle}</div>
                    </div>
                    <div className="result-field full">
                      <div className="field-label">📝 Product Description</div>
                      <div className="field-value">{generatedPost.description}</div>
                    </div>
                    <div className="result-field full">
                      <div className="field-label">🔍 SEO Meta Description</div>
                      <div className="field-value">{generatedPost.metaDescription}</div>
                    </div>
                    <div className="result-field">
                      <div className="field-label">🔑 SEO Keywords</div>
                      <div className="tags-wrap">{generatedPost.keywords?.map((k, i) => <span key={i} className="tag">{k}</span>)}</div>
                    </div>
                    <div className="result-field">
                      <div className="field-label"># Hashtags</div>
                      <div className="tags-wrap">{generatedPost.hashtags?.map((h, i) => <span key={i} className="tag hashtag">{h}</span>)}</div>
                    </div>
                    <div className="result-field full">
                      <div className="field-label">🚀 Call To Action</div>
                      <div className="field-value" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#c8400a" }}>{generatedPost.cta}</div>
                    </div>
                  </div>
                </div>
              )}

              {!generatedPost && !generating && (
                <div className="empty-state">
                  <div className="empty-icon">✦</div>
                  <div>Enter your product above and click Generate.</div>
                </div>
              )}
            </>
          )}

          {/* ── DASHBOARD ── */}
          {view === "dashboard" && (
            <>
              <div className="page-header">
                <div className="page-title">Dashboard</div>
                <div className="page-sub">Live data from your Supabase database</div>
              </div>
              <div className="stats-row">
                <div className="stat-card green"><div className="stat-num">{posts.length}</div><div className="stat-label">Total Posts Generated</div></div>
                <div className="stat-card red"><div className="stat-num">{totalPublished}</div><div className="stat-label">Posts Published</div></div>
                <div className="stat-card blue"><div className="stat-num">{posts.length - totalPublished}</div><div className="stat-label">Drafts Pending</div></div>
              </div>
              <div className="section-title">Recent Posts <span className="section-count">{posts.slice(0,5).length}</span></div>
              <div className="posts-table">
                <div className="table-head"><div>Product</div><div>Price</div><div>Status</div><div>Date</div></div>
                {postsLoading ? (
                  <div className="loading-row"><span className="spinner" style={{ borderTopColor: "#888" }} />Loading from Supabase…</div>
                ) : posts.length === 0 ? (
                  <div className="empty-state"><div className="empty-icon">📭</div><div>No posts yet. Generate your first post!</div></div>
                ) : posts.slice(0,5).map((p) => (
                  <div key={p.id} className="table-row">
                    <div className="post-name">{p.product_title}</div>
                    <div className="post-price">{p.product_price}</div>
                    <div><span className={`status-badge ${p.status}`}><span className="status-dot" />{p.status}</span></div>
                    <div className="post-date">{p.created_at ? new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── POSTS ── */}
          {view === "posts" && (
            <>
              <div className="page-header">
                <div className="page-title">My Posts</div>
                <div className="page-sub">All posts saved in Supabase</div>
              </div>
              <div className="section-title">All Posts <span className="section-count">{posts.length}</span></div>
              <div className="posts-table">
                <div className="table-head"><div>Product</div><div>Price</div><div>Status</div><div>Date</div></div>
                {postsLoading ? (
                  <div className="loading-row"><span className="spinner" style={{ borderTopColor: "#888" }} />Loading…</div>
                ) : posts.length === 0 ? (
                  <div className="empty-state"><div className="empty-icon">📭</div><div>No posts yet.</div></div>
                ) : posts.map((p) => (
                  <div key={p.id} className="table-row">
                    <div>
                      <div className="post-name">{p.product_title}</div>
                      <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{p.seo_title?.slice(0,55)}…</div>
                    </div>
                    <div className="post-price">{p.product_price}</div>
                    <div><span className={`status-badge ${p.status}`}><span className="status-dot" />{p.status}</span></div>
                    <div className="post-date">{p.created_at ? new Date(p.created_at).toLocaleDateString() : "—"}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── PLANS ── */}
          {view === "plans" && (
            <>
              <div className="page-header"><div className="page-title">Subscription Plans</div><div className="page-sub">Simple monthly billing. Cancel anytime.</div></div>
              <div className="plans-grid">
                {[
                  { name: "Basic", price: "$19", features: ["100 posts/month", "SEO optimization", "1 website", "Email support"], featured: false },
                  { name: "Pro", price: "$49", features: ["500 posts/month", "Advanced SEO", "5 websites", "Priority support", "Analytics"], featured: true, popular: true },
                  { name: "Agency", price: "$149", features: ["Unlimited posts", "Full SEO suite", "Unlimited websites", "Dedicated support", "White-label", "API access"], featured: false },
                ].map((plan) => (
                  <div key={plan.name} className={`plan-card ${plan.featured ? "featured" : ""}`}>
                    {plan.popular && <div className="plan-popular">Most Popular</div>}
                    <div className="plan-name-text">{plan.name}</div>
                    <div className="plan-price-text">{plan.price}<span className="plan-mo">/month</span></div>
                    <ul className="plan-features">{plan.features.map((f) => <li key={f} className="plan-feat"><span className="feat-check">✓</span> {f}</li>)}</ul>
                    <button className="plan-cta-btn">{plan.featured ? "Current Plan" : "Get Started"}</button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── ADMIN ── */}
          {view === "admin" && (
            <>
              <div className="page-header"><div className="page-title">Admin Panel</div><div className="page-sub">Platform overview and user management</div></div>
              <div className="admin-grid">
                <div className="admin-stat"><div className="admin-stat-num">{posts.length}</div><div className="admin-stat-label">Total Posts in DB</div></div>
                <div className="admin-stat"><div className="admin-stat-num">{totalPublished}</div><div className="admin-stat-label">Published Posts</div></div>
                <div className="admin-stat"><div className="admin-stat-num" style={{ color: dbConnected ? "#16a34a" : "#dc2626" }}>{dbConnected ? "Online" : "Offline"}</div><div className="admin-stat-label">Supabase Status</div></div>
                <div className="admin-stat"><div className="admin-stat-num">$2,340</div><div className="admin-stat-label">Monthly Revenue</div></div>
              </div>
              <div className="section-title">Recent DB Records</div>
              <div className="users-table">
                <div className="users-head"><div>Product</div><div>Status</div><div>SEO Title</div><div>Date</div><div>Action</div></div>
                {posts.slice(0,6).map((p) => (
                  <div key={p.id} className="users-row">
                    <div><div className="user-name">{p.product_title}</div><div className="user-email">{p.product_price}</div></div>
                    <div><span className={`status-badge ${p.status}`}><span className="status-dot" />{p.status}</span></div>
                    <div style={{ fontSize: 10, color: "var(--muted)" }}>{p.seo_title?.slice(0,40)}…</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{p.created_at ? new Date(p.created_at).toLocaleDateString() : "—"}</div>
                    <div><span className="plan-badge Pro">DB ✓</span></div>
                  </div>
                ))}
                {posts.length === 0 && <div className="empty-state"><div>No records in database yet.</div></div>}
              </div>
            </>
          )}
        </main>

        {toast && <div className={`toast ${toastType === "error" ? "error" : ""}`}>{toast}</div>}
      </div>
    </>
  );
}


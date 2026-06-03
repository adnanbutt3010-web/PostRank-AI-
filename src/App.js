import { useState, useEffect, useRef } from "react";

// ─── Fonts via Google Fonts (injected) ───────────────────────────────────────
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

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_USERS = [
  { id: 1, name: "Alex Rivera", email: "alex@shopify.co", plan: "Pro", posts: 47, status: "active", joined: "Jan 2025" },
  { id: 2, name: "Priya Nair", email: "priya@boutique.in", plan: "Agency", posts: 312, status: "active", joined: "Feb 2025" },
  { id: 3, name: "Marcus Webb", email: "marcus@dropship.io", plan: "Basic", posts: 9, status: "disabled", joined: "Mar 2025" },
  { id: 4, name: "Sofia Chen", email: "sofia@luxe.hk", plan: "Agency", posts: 198, status: "active", joined: "Jan 2025" },
];

const INITIAL_POSTS = [
  {
    id: 1,
    product: "Nike Air Max 270",
    price: "$129",
    seoTitle: "Nike Air Max 270 – Ultimate Comfort Running Shoes | Shop Now",
    description: "Experience next-level cushioning with the Nike Air Max 270...",
    metaDescription: "Shop Nike Air Max 270 for $129. Superior comfort, iconic style. Free shipping on orders over $75.",
    keywords: ["nike air max 270", "running shoes", "air cushion sneakers"],
    hashtags: ["#NikeAirMax", "#RunningShoes", "#Sneakerhead"],
    cta: "Shop Now – Limited Stock Available",
    status: "published",
    date: "May 30, 2025",
  },
  {
    id: 2,
    product: "Wireless Earbuds Pro",
    price: "$89",
    seoTitle: "Wireless Earbuds Pro – Crystal Clear Sound & 40Hr Battery",
    description: "Immerse yourself in pure audio with Wireless Earbuds Pro...",
    metaDescription: "Get Wireless Earbuds Pro for $89. 40-hour battery, noise cancellation, waterproof IPX7.",
    keywords: ["wireless earbuds", "noise cancelling", "bluetooth earphones"],
    hashtags: ["#WirelessEarbuds", "#AudioTech", "#MusicLife"],
    cta: "Grab Yours Today – Ships in 24 Hours",
    status: "draft",
    date: "Jun 1, 2025",
  },
];

// ─── AI GENERATOR (Anthropic API) ────────────────────────────────────────────
async function generateSEOPost(productTitle, productPrice) {
  const prompt = `You are an expert SEO content writer and digital marketer. Generate a complete SEO-optimized product post for the following product.

Product Title: ${productTitle}
Product Price: ${productPrice}

Respond ONLY with a valid JSON object (no markdown, no backticks, no extra text) in this exact format:
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
    --ink: #0a0a0f;
    --paper: #f5f3ee;
    --cream: #ede9e0;
    --accent: #c8f03c;
    --accent2: #ff5c35;
    --muted: #888880;
    --border: #d8d4cc;
    --white: #ffffff;
    --card: #ffffff;
  }

  body { background: var(--paper); color: var(--ink); font-family: 'DM Mono', monospace; }

  .app { min-height: 100vh; display: flex; }

  /* SIDEBAR */
  .sidebar {
    width: 220px;
    min-height: 100vh;
    background: var(--ink);
    display: flex;
    flex-direction: column;
    padding: 32px 0;
    position: fixed;
    left: 0; top: 0; bottom: 0;
    z-index: 100;
  }
  .logo {
    padding: 0 24px 32px;
    border-bottom: 1px solid #1e1e28;
  }
  .logo-mark {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 18px;
    color: var(--accent);
    letter-spacing: -0.5px;
  }
  .logo-tag {
    font-size: 10px;
    color: #555550;
    margin-top: 2px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .nav { padding: 20px 0; flex: 1; }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 24px;
    color: #666660;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: 0.3px;
    border-left: 3px solid transparent;
    font-family: 'DM Mono', monospace;
  }
  .nav-item:hover { color: var(--paper); background: #12121a; }
  .nav-item.active { color: var(--accent); border-left-color: var(--accent); background: #0f0f18; }
  .nav-icon { font-size: 15px; width: 20px; text-align: center; }

  .sidebar-plan {
    margin: 0 16px 16px;
    background: #12121a;
    border: 1px solid #1e1e28;
    border-radius: 8px;
    padding: 14px;
  }
  .plan-label { font-size: 9px; color: #444; text-transform: uppercase; letter-spacing: 1px; }
  .plan-name { font-size: 13px; color: var(--accent); font-weight: 500; margin-top: 4px; font-family: 'Syne', sans-serif; }
  .plan-upgrade {
    font-size: 10px;
    color: var(--accent2);
    margin-top: 6px;
    cursor: pointer;
    text-decoration: underline;
  }

  /* MAIN */
  .main { margin-left: 220px; flex: 1; padding: 40px 48px; max-width: 1200px; }

  /* HEADER */
  .page-header { margin-bottom: 36px; }
  .page-title {
    font-family: 'Syne', sans-serif;
    font-size: 32px;
    font-weight: 800;
    color: var(--ink);
    line-height: 1;
  }
  .page-sub { font-size: 12px; color: var(--muted); margin-top: 6px; letter-spacing: 0.3px; }

  /* GENERATE CARD */
  .generate-card {
    background: var(--ink);
    border-radius: 16px;
    padding: 40px;
    margin-bottom: 32px;
    position: relative;
    overflow: hidden;
  }
  .generate-card::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    background: var(--accent);
    border-radius: 50%;
    opacity: 0.06;
  }
  .gen-title {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 22px;
    color: var(--paper);
    margin-bottom: 24px;
  }
  .gen-row { display: flex; gap: 16px; align-items: flex-end; }
  .input-group { flex: 1; }
  .input-label { font-size: 10px; color: #666660; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .input-field {
    width: 100%;
    background: #12121a;
    border: 1px solid #2a2a35;
    border-radius: 10px;
    padding: 14px 16px;
    color: var(--paper);
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }
  .input-field::placeholder { color: #3a3a45; }
  .input-field:focus { border-color: var(--accent); }
  
  .gen-btn {
    background: var(--accent);
    color: var(--ink);
    border: none;
    border-radius: 10px;
    padding: 14px 28px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
    letter-spacing: 0.3px;
  }
  .gen-btn:hover { background: #d4f54a; transform: translateY(-1px); }
  .gen-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .gen-btn.loading { background: #2a2a35; color: #666; }

  /* SPINNER */
  .spinner {
    display: inline-block;
    width: 14px; height: 14px;
    border: 2px solid #444;
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin-right: 8px;
    vertical-align: middle;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* RESULT CARD */
  .result-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 32px;
    animation: slideUp 0.4s ease;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .result-header {
    background: var(--ink);
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .result-header-left { display: flex; align-items: center; gap: 10px; }
  .result-badge {
    background: var(--accent);
    color: var(--ink);
    font-size: 9px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Syne', sans-serif;
  }
  .result-product-name { font-size: 13px; color: var(--paper); font-family: 'Syne', sans-serif; font-weight: 600; }
  .publish-btn {
    background: var(--accent2);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 22px;
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.3px;
  }
  .publish-btn:hover { background: #ff3d15; transform: translateY(-1px); }
  .publish-btn.published { background: #22c55e; cursor: default; transform: none; }

  .result-body { padding: 28px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .result-field { }
  .result-field.full { grid-column: 1 / -1; }
  .field-label {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--muted);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .field-icon { font-size: 11px; }
  .field-value {
    font-size: 13px;
    color: var(--ink);
    line-height: 1.6;
    background: var(--paper);
    border-radius: 8px;
    padding: 12px 14px;
    border: 1px solid var(--border);
    font-family: 'DM Mono', monospace;
  }
  .field-value.title-val { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; }
  .tags-wrap { display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 12px; background: var(--paper); border: 1px solid var(--border); border-radius: 8px; }
  .tag {
    background: var(--ink);
    color: var(--paper);
    font-size: 10px;
    padding: 4px 10px;
    border-radius: 20px;
    font-family: 'DM Mono', monospace;
  }
  .hashtag { background: #1a1a2e; color: var(--accent); }

  /* STATS ROW */
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; }
  .stat-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 22px 24px;
    position: relative;
    overflow: hidden;
  }
  .stat-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
  }
  .stat-card.green::after { background: var(--accent); }
  .stat-card.red::after { background: var(--accent2); }
  .stat-card.blue::after { background: #7c9cf0; }
  .stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 36px;
    font-weight: 800;
    color: var(--ink);
    line-height: 1;
  }
  .stat-label { font-size: 11px; color: var(--muted); margin-top: 6px; letter-spacing: 0.3px; }

  /* POSTS TABLE */
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-count {
    background: var(--cream);
    color: var(--muted);
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 20px;
    font-family: 'DM Mono', monospace;
    font-weight: 400;
  }
  .posts-table {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }
  .table-head {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    padding: 12px 20px;
    background: var(--paper);
    border-bottom: 1px solid var(--border);
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--muted);
  }
  .table-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    align-items: center;
    transition: background 0.15s;
    font-size: 12px;
  }
  .table-row:last-child { border-bottom: none; }
  .table-row:hover { background: var(--paper); }
  .post-name { font-weight: 500; color: var(--ink); }
  .post-price { color: var(--muted); }
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    padding: 3px 10px;
    border-radius: 20px;
    font-weight: 500;
  }
  .status-badge.published { background: #dcfce7; color: #16a34a; }
  .status-badge.draft { background: #fef3c7; color: #d97706; }
  .status-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
  .post-date { color: var(--muted); font-size: 11px; }

  /* ADMIN */
  .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px; }
  .admin-stat {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px 24px;
  }
  .admin-stat-num { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; }
  .admin-stat-label { font-size: 11px; color: var(--muted); margin-top: 4px; }
  .users-table { background: var(--white); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
  .users-head {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    padding: 12px 20px;
    background: var(--paper);
    border-bottom: 1px solid var(--border);
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--muted);
  }
  .users-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    align-items: center;
    font-size: 12px;
  }
  .users-row:last-child { border-bottom: none; }
  .user-info { }
  .user-name { font-weight: 500; color: var(--ink); }
  .user-email { font-size: 10px; color: var(--muted); margin-top: 2px; }
  .plan-badge {
    display: inline-block;
    font-size: 9px;
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: 700;
    letter-spacing: 0.5px;
    font-family: 'Syne', sans-serif;
  }
  .plan-badge.Basic { background: #f3f4f6; color: #666; }
  .plan-badge.Pro { background: #dbeafe; color: #2563eb; }
  .plan-badge.Agency { background: #fef3c7; color: #d97706; }
  .toggle-btn {
    border: none;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 10px;
    font-family: 'DM Mono', monospace;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }
  .toggle-btn.enable { background: #dcfce7; color: #16a34a; }
  .toggle-btn.disable { background: #fee2e2; color: #dc2626; }

  /* PLANS */
  .plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .plan-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px 24px;
    position: relative;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .plan-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
  .plan-card.featured { background: var(--ink); border-color: var(--accent); }
  .plan-popular {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--accent);
    color: var(--ink);
    font-size: 9px;
    font-weight: 700;
    padding: 4px 14px;
    border-radius: 20px;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family: 'Syne', sans-serif;
    white-space: nowrap;
  }
  .plan-name-text { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; margin-bottom: 8px; }
  .plan-card.featured .plan-name-text { color: var(--accent); }
  .plan-price-text { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; line-height: 1; }
  .plan-card.featured .plan-price-text { color: var(--paper); }
  .plan-mo { font-size: 12px; color: var(--muted); }
  .plan-features { margin: 20px 0; list-style: none; }
  .plan-feat { font-size: 12px; padding: 6px 0; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 8px; }
  .plan-card.featured .plan-feat { border-color: #2a2a35; color: #aaa; }
  .feat-check { color: var(--accent); font-size: 11px; }
  .plan-cta-btn {
    width: 100%;
    padding: 13px;
    border-radius: 10px;
    border: 2px solid var(--ink);
    background: transparent;
    color: var(--ink);
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
  .plan-card.featured .plan-cta-btn { background: var(--accent); border-color: var(--accent); color: var(--ink); }
  .plan-cta-btn:hover { background: var(--ink); color: var(--paper); }
  .plan-card.featured .plan-cta-btn:hover { background: #d4f54a; }

  /* SUCCESS TOAST */
  .toast {
    position: fixed;
    bottom: 32px;
    right: 32px;
    background: var(--ink);
    color: var(--paper);
    padding: 14px 22px;
    border-radius: 10px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    animation: slideIn 0.3s ease;
    z-index: 999;
    border-left: 4px solid var(--accent);
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* RESPONSIVE TWEAKS */
  .error-box {
    background: #fee2e2;
    border: 1px solid #fca5a5;
    border-radius: 8px;
    padding: 14px 18px;
    color: #dc2626;
    font-size: 12px;
    margin-top: 16px;
  }

  .empty-state {
    text-align: center;
    padding: 48px 24px;
    color: var(--muted);
    font-size: 13px;
  }
  .empty-icon { font-size: 36px; margin-bottom: 12px; }

  .usage-bar-wrap { margin-top: 28px; }
  .usage-row { display: flex; justify-content: space-between; font-size: 11px; color: var(--muted); margin-bottom: 6px; }
  .usage-bar { background: var(--cream); border-radius: 4px; height: 6px; overflow: hidden; }
  .usage-fill { height: 100%; background: var(--accent); border-radius: 4px; transition: width 1s ease; }
`;

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function PostRankAI() {
  const [view, setView] = useState("generate");
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState(null);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [users, setUsers] = useState(MOCK_USERS);
  const [toast, setToast] = useState(null);
  const [published, setPublished] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleGenerate = async () => {
    if (!productTitle.trim() || !productPrice.trim()) {
      setError("Please enter both product title and price.");
      return;
    }
    setError("");
    setGenerating(true);
    setGeneratedPost(null);
    setPublished(false);
    try {
      const result = await generateSEOPost(productTitle, productPrice);
      setGeneratedPost({ ...result, product: productTitle, price: productPrice });
    } catch (e) {
      setError("AI generation failed. Please check your connection and try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handlePublish = () => {
    if (!generatedPost) return;
    const newPost = {
      id: Date.now(),
      product: generatedPost.product,
      price: generatedPost.price,
      seoTitle: generatedPost.seoTitle,
      description: generatedPost.description,
      metaDescription: generatedPost.metaDescription,
      keywords: generatedPost.keywords,
      hashtags: generatedPost.hashtags,
      cta: generatedPost.cta,
      status: "published",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setPosts((prev) => [newPost, ...prev]);
    setPublished(true);
    showToast("✓ Post published to your website!");
  };

  const toggleUser = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "disabled" : "active" } : u))
    );
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
              { id: "generate", icon: "⚡", label: "Generate Post" },
              { id: "dashboard", icon: "◫", label: "Dashboard" },
              { id: "posts", icon: "≡", label: "My Posts" },
              { id: "plans", icon: "◈", label: "Plans" },
              { id: "admin", icon: "⊕", label: "Admin Panel" },
            ].map((item) => (
              <div
                key={item.id}
                className={`nav-item ${view === item.id ? "active" : ""}`}
                onClick={() => setView(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>
          <div className="sidebar-plan">
            <div className="plan-label">Current Plan</div>
            <div className="plan-name">Pro Plan</div>
            <div className="plan-upgrade" onClick={() => setView("plans")}>
              Upgrade to Agency →
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main">
          {/* ── GENERATE ── */}
          {view === "generate" && (
            <>
              <div className="page-header">
                <div className="page-title">Generate Post</div>
                <div className="page-sub">Enter product details → AI writes everything → Publish instantly</div>
              </div>

              <div className="generate-card">
                <div className="gen-title">What are you selling today?</div>
                <div className="gen-row">
                  <div className="input-group">
                    <div className="input-label">Product Title</div>
                    <input
                      className="input-field"
                      placeholder="e.g. Nike Running Shoes"
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                    />
                  </div>
                  <div className="input-group" style={{ maxWidth: 180 }}>
                    <div className="input-label">Price</div>
                    <input
                      className="input-field"
                      placeholder="e.g. $49"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                    />
                  </div>
                  <button
                    className={`gen-btn ${generating ? "loading" : ""}`}
                    onClick={handleGenerate}
                    disabled={generating}
                  >
                    {generating ? (
                      <><span className="spinner" />Generating…</>
                    ) : (
                      "⚡ Generate Post"
                    )}
                  </button>
                </div>
                {error && <div className="error-box">{error}</div>}
              </div>

              {generatedPost && (
                <div className="result-card">
                  <div className="result-header">
                    <div className="result-header-left">
                      <span className="result-badge">AI Generated</span>
                      <span className="result-product-name">
                        {generatedPost.product} · {generatedPost.price}
                      </span>
                    </div>
                    <button
                      className={`publish-btn ${published ? "published" : ""}`}
                      onClick={handlePublish}
                      disabled={published}
                    >
                      {published ? "✓ Published!" : "Publish to Website →"}
                    </button>
                  </div>
                  <div className="result-body">
                    <div className="result-field full">
                      <div className="field-label"><span className="field-icon">🏷</span> SEO Title</div>
                      <div className="field-value title-val">{generatedPost.seoTitle}</div>
                    </div>
                    <div className="result-field full">
                      <div className="field-label"><span className="field-icon">📝</span> Product Description</div>
                      <div className="field-value">{generatedPost.description}</div>
                    </div>
                    <div className="result-field full">
                      <div className="field-label"><span className="field-icon">🔍</span> SEO Meta Description</div>
                      <div className="field-value">{generatedPost.metaDescription}</div>
                    </div>
                    <div className="result-field">
                      <div className="field-label"><span className="field-icon">🔑</span> SEO Keywords</div>
                      <div className="tags-wrap">
                        {generatedPost.keywords?.map((k, i) => (
                          <span key={i} className="tag">{k}</span>
                        ))}
                      </div>
                    </div>
                    <div className="result-field">
                      <div className="field-label"><span className="field-icon">#</span> Hashtags</div>
                      <div className="tags-wrap">
                        {generatedPost.hashtags?.map((h, i) => (
                          <span key={i} className="tag hashtag">{h}</span>
                        ))}
                      </div>
                    </div>
                    <div className="result-field full">
                      <div className="field-label"><span className="field-icon">🚀</span> Call To Action</div>
                      <div className="field-value" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#c8400a" }}>
                        {generatedPost.cta}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!generatedPost && !generating && (
                <div className="empty-state">
                  <div className="empty-icon">✦</div>
                  <div>Enter your product above and click Generate.</div>
                  <div style={{ marginTop: 8, fontSize: 11, opacity: 0.5 }}>
                    AI will write your full SEO post in seconds.
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── DASHBOARD ── */}
          {view === "dashboard" && (
            <>
              <div className="page-header">
                <div className="page-title">Dashboard</div>
                <div className="page-sub">Your content performance at a glance</div>
              </div>
              <div className="stats-row">
                <div className="stat-card green">
                  <div className="stat-num">{posts.length}</div>
                  <div className="stat-label">Total Posts Generated</div>
                </div>
                <div className="stat-card red">
                  <div className="stat-num">{totalPublished}</div>
                  <div className="stat-label">Total Posts Published</div>
                </div>
                <div className="stat-card blue">
                  <div className="stat-num">{posts.length - totalPublished}</div>
                  <div className="stat-label">Drafts Pending</div>
                </div>
              </div>

              <div className="usage-bar-wrap" style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: "24px 28px", marginBottom: 28 }}>
                <div className="section-title">Monthly Usage</div>
                <div className="usage-row">
                  <span>Posts Generated</span>
                  <span style={{ color: "var(--ink)", fontWeight: 600 }}>{posts.length} / 100</span>
                </div>
                <div className="usage-bar">
                  <div className="usage-fill" style={{ width: `${Math.min(posts.length, 100)}%` }} />
                </div>
              </div>

              <div className="section-title">
                Recent Posts <span className="section-count">{posts.slice(0, 5).length}</span>
              </div>
              <div className="posts-table">
                <div className="table-head">
                  <div>Product</div>
                  <div>Price</div>
                  <div>Status</div>
                  <div>Date</div>
                </div>
                {posts.slice(0, 5).map((p) => (
                  <div key={p.id} className="table-row">
                    <div className="post-name">{p.product}</div>
                    <div className="post-price">{p.price}</div>
                    <div>
                      <span className={`status-badge ${p.status}`}>
                        <span className="status-dot" />
                        {p.status}
                      </span>
                    </div>
                    <div className="post-date">{p.date}</div>
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
                <div className="page-sub">All generated and published content</div>
              </div>
              <div className="section-title">
                All Posts <span className="section-count">{posts.length}</span>
              </div>
              <div className="posts-table">
                <div className="table-head">
                  <div>Product</div>
                  <div>Price</div>
                  <div>Status</div>
                  <div>Date</div>
                </div>
                {posts.map((p) => (
                  <div key={p.id} className="table-row">
                    <div>
                      <div className="post-name">{p.product}</div>
                      <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2, fontFamily: "DM Mono" }}>{p.seoTitle?.slice(0, 50)}…</div>
                    </div>
                    <div className="post-price">{p.price}</div>
                    <div>
                      <span className={`status-badge ${p.status}`}>
                        <span className="status-dot" />
                        {p.status}
                      </span>
                    </div>
                    <div className="post-date">{p.date}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── PLANS ── */}
          {view === "plans" && (
            <>
              <div className="page-header">
                <div className="page-title">Subscription Plans</div>
                <div className="page-sub">Simple monthly billing. Cancel anytime.</div>
              </div>
              <div className="plans-grid">
                {[
                  {
                    name: "Basic", price: "$19", mo: "/month",
                    features: ["100 posts/month", "SEO optimization", "1 website", "Email support"],
                    featured: false,
                  },
                  {
                    name: "Pro", price: "$49", mo: "/month",
                    features: ["500 posts/month", "Advanced SEO", "5 websites", "Priority support", "Analytics dashboard"],
                    featured: true, popular: true,
                  },
                  {
                    name: "Agency", price: "$149", mo: "/month",
                    features: ["Unlimited posts", "Full SEO suite", "Unlimited websites", "Dedicated support", "White-label", "API access"],
                    featured: false,
                  },
                ].map((plan) => (
                  <div key={plan.name} className={`plan-card ${plan.featured ? "featured" : ""}`}>
                    {plan.popular && <div className="plan-popular">Most Popular</div>}
                    <div className="plan-name-text">{plan.name}</div>
                    <div className="plan-price-text">{plan.price}<span className="plan-mo">{plan.mo}</span></div>
                    <ul className="plan-features">
                      {plan.features.map((f) => (
                        <li key={f} className="plan-feat">
                          <span className="feat-check">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                    <button className="plan-cta-btn">
                      {plan.featured ? "Current Plan" : "Get Started"}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── ADMIN ── */}
          {view === "admin" && (
            <>
              <div className="page-header">
                <div className="page-title">Admin Panel</div>
                <div className="page-sub">Manage users, subscriptions, and platform usage</div>
              </div>
              <div className="admin-grid">
                <div className="admin-stat">
                  <div className="admin-stat-num">{users.length}</div>
                  <div className="admin-stat-label">Total Users</div>
                </div>
                <div className="admin-stat">
                  <div className="admin-stat-num">{users.filter((u) => u.status === "active").length}</div>
                  <div className="admin-stat-label">Active Users</div>
                </div>
                <div className="admin-stat">
                  <div className="admin-stat-num">{posts.length + 450}</div>
                  <div className="admin-stat-label">Total Posts Generated</div>
                </div>
                <div className="admin-stat">
                  <div className="admin-stat-num">$2,340</div>
                  <div className="admin-stat-label">Monthly Revenue</div>
                </div>
              </div>

              <div className="section-title" style={{ marginBottom: 16 }}>
                All Users <span className="section-count">{users.length}</span>
              </div>
              <div className="users-table">
                <div className="users-head">
                  <div>User</div>
                  <div>Plan</div>
                  <div>Posts</div>
                  <div>Joined</div>
                  <div>Action</div>
                </div>
                {users.map((u) => (
                  <div key={u.id} className="users-row">
                    <div className="user-info">
                      <div className="user-name">{u.name}</div>
                      <div className="user-email">{u.email}</div>
                    </div>
                    <div>
                      <span className={`plan-badge ${u.plan}`}>{u.plan}</span>
                    </div>
                    <div style={{ fontSize: 13 }}>{u.posts}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{u.joined}</div>
                    <div>
                      <button
                        className={`toggle-btn ${u.status === "active" ? "disable" : "enable"}`}
                        onClick={() => toggleUser(u.id)}
                      >
                        {u.status === "active" ? "Disable" : "Enable"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>

        {/* TOAST */}
        {toast && (
          <div className="toast">
            <span>{toast}</span>
          </div>
        )}
      </div>
    </>
  );
}

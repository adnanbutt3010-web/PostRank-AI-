import React, { useState, useEffect } from "react";

const SUPA_URL = "https://yizzvwyvdnkbbhvojqlp.supabase.co";
const SUPA_KEY = "sb_publishable_Bz5xRPDQ_ZDE99T_QRSLlg_UKLH-6b6";
const ADMIN_EMAIL = "adnanbutt3010@gmail.com";
const ADMIN_USER = "admin";
const ADMIN_PASS = "Pst@2026";

const authAPI = {
  async signIn(email, password) {
    const r = await fetch(SUPA_URL + "/auth/v1/token?grant_type=password", {
      method: "POST",
      headers: { apikey: SUPA_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const d = await r.json();
    if (d.error) throw new Error(d.error.message || "Login failed");
    return d;
  },
  async signUp(email, password, name) {
    const r = await fetch(SUPA_URL + "/auth/v1/signup", {
      method: "POST",
      headers: { apikey: SUPA_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, data: { name } }),
    });
    const d = await r.json();
    if (d.error) throw new Error(d.error.message || "Signup failed");
    return d;
  },
  async signOut(token) {
    await fetch(SUPA_URL + "/auth/v1/logout", {
      method: "POST",
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + token },
    });
  },
};

const adminAPI = {
  async banUser(userId, token) {
    const r = await fetch(SUPA_URL + "/auth/v1/admin/users/" + userId, {
      method: "PUT",
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify({ ban_duration: "876600h" }),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async unbanUser(userId, token) {
    const r = await fetch(SUPA_URL + "/auth/v1/admin/users/" + userId, {
      method: "PUT",
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify({ ban_duration: "none" }),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async listUsers(token) {
    const r = await fetch(SUPA_URL + "/auth/v1/admin/users", {
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + token },
    });
    if (!r.ok) throw new Error(await r.text());
    const d = await r.json();
    return d.users || [];
  },
};

const dbAPI = {
  async select(table, filter, token) {
    const tk = token || SUPA_KEY;
    const url = SUPA_URL + "/rest/v1/" + table + "?" + (filter || "") + "&order=created_at.desc";
    const r = await fetch(url, { headers: { apikey: SUPA_KEY, Authorization: "Bearer " + tk } });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async insert(table, data, token) {
    const tk = token || SUPA_KEY;
    const r = await fetch(SUPA_URL + "/rest/v1/" + table, {
      method: "POST",
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + tk, "Content-Type": "application/json", Prefer: "return=representation" },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async update(table, filter, data, token) {
    const tk = token || SUPA_KEY;
    const r = await fetch(SUPA_URL + "/rest/v1/" + table + "?" + filter, {
      method: "PATCH",
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + tk, "Content-Type": "application/json", Prefer: "return=representation" },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
};

function generateSEO(title, price, seoType, postType) {
  const tl = title.toLowerCase();
  const words = title.split(" ");
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const isLocal = seoType === "local";
  const isBlog = postType === "blog";
  const yr = new Date().getFullYear();

  const kw = isLocal
    ? [tl, "buy " + tl, tl + " price in pakistan", tl + " online pakistan", "cheap " + tl + " pakistan"]
    : [tl, "buy " + tl + " online", "best " + tl, tl + " for sale", tl + " shop"];

  const bkw = [tl + " guide", "best " + tl + " " + yr, tl + " review", "how to buy " + tl, tl + " tips"];

  const tags = words.map(function(w) { return "#" + w.charAt(0).toUpperCase() + w.slice(1); });
  if (isLocal) { tags.push("#PakistanShopping"); tags.push("#OnlineShoppingPK"); }
  else { tags.push("#OnlineShopping"); tags.push("#BestPrice"); }

  var seoTitle;
  if (isBlog) {
    seoTitle = isLocal ? title + " - Mukammal Guide " + yr + " | Pakistan" : title + " - Complete Guide " + yr;
  } else {
    seoTitle = isLocal ? title + " - Best Price " + price + " in Pakistan | Order Online" : title + " - " + price + " | Best Online Deal";
  }

  var desc;
  if (isBlog && isLocal) {
    desc = title + " ke baare mein poori maloomat hasil karein! Pakistan mein " + title + " bohat mashhoor hai aur " + yr + " mein isko khareedne ka sabse acha waqt hai.\n\n" + title + " ke Fayde:\n- Ala mayar aur deerpaa saakht\n- Pakistan mein aasaani se dastiyaab - qeemat " + price + "\n- Fast delivery poore Pakistan mein\n- 100% asli product guarantee\n- Easy returns aur customer support 24/7\n\n" + title + " khareedne se pehle yeh guide zaroor parhen aur sahi faisla karein!";
  } else if (isBlog) {
    desc = "Looking for the ultimate guide on " + title + "? In this comprehensive " + yr + " guide, we cover everything about " + title + " from key features to buying tips.\n\nTop Benefits:\n- Premium build quality that lasts for years\n- Excellent value at just " + price + "\n- Available worldwide with fast shipping\n- Trusted by thousands of satisfied customers\n- 30-day money-back guarantee\n\nFinal Verdict: At " + price + ", the " + title + " delivers outstanding value. Order yours today!";
  } else if (isLocal) {
    desc = title + " ab Pakistan mein sirf " + price + " mein dastiyaab hai! Karachi, Lahore, Islamabad aur poore Pakistan mein fast delivery.\n\n" + title + " ala mayar materials se banaya gaya hai. Style, durability aur functionality - sab kuch " + price + " mein.\n\nHamari khasiyaat:\n- Fast delivery 2-5 working days\n- Cash on Delivery available\n- 100% asli product guarantee\n- Easy returns policy\n- 24/7 customer support\n\nAb intezaar mat karein - " + title + " sirf " + price + " mein hasil karein!";
  } else {
    desc = "Discover the " + title + ", now available worldwide at just " + price + "! Engineered with premium materials for global customers who demand quality.\n\nWhy Choose Us:\n- Free international shipping on qualifying orders\n- 30-day money-back guarantee\n- Secure payment options worldwide\n- World-class customer support 24/7\n- Premium quality at unbeatable " + price + "\n\nOrder your " + title + " today and experience the difference!";
  }

  var meta;
  if (isBlog) {
    meta = isLocal ? title + " ki mukammal guide " + yr + ". Pakistan mein best tips, review aur qeemat. Abhi parhen!" : "Complete guide to " + title + " in " + yr + ". Expert tips, reviews and buying advice.";
  } else {
    meta = isLocal ? "Buy " + title + " for " + price + " in Pakistan. Fast delivery. Cash on Delivery. Premium quality!" : "Shop " + title + " for " + price + ". Worldwide shipping. 30-day returns. Best price online!";
  }

  var snippet = meta.slice(0, 150);

  var angles = ["Front View", "Side View", "Back View", "Detail Shot", "Lifestyle Photo"];
  var alts = isBlog
    ? [title + " - Featured Image " + yr, "Best " + title + " Guide", title + " Review", "How to Choose " + title, title + " Tips " + yr]
    : angles.map(function(a) { return isLocal ? title + " " + a + " - " + price + " Pakistan" : title + " " + a + " - Buy Online " + price; });

  var permalink = isBlog
    ? (isLocal ? "yoursite.com/blog/" + slug + "-guide-pakistan" : "yoursite.com/blog/" + slug + "-guide-" + yr)
    : (isLocal ? "yourstore.com/products/" + slug + "-pakistan" : "yourstore.com/products/" + slug);

  var ctas = isBlog
    ? ["Puri Guide Parhen", "Read Full Review", "Learn More"]
    : (isLocal ? ["Order Now - Only " + price + "!", "Buy Now - Cash on Delivery!", "Abhi Order Karein - " + price] : ["Order Now - Only " + price + "!", "Get Yours Today!", "Shop Now - Free Shipping!"]);

  return {
    seoTitle: seoTitle,
    description: desc,
    metaDescription: meta,
    snippet: snippet,
    keywords: isBlog ? bkw : kw,
    hashtags: tags.slice(0, 6),
    altTexts: alts,
    permalink: permalink,
    cta: ctas[Math.floor(Math.random() * ctas.length)],
    seoType: seoType,
    postType: postType,
  };
}

var C = {
  primary: "#6366f1", primaryDark: "#4f46e5", primaryLight: "#eef2ff",
  danger: "#f43f5e", success: "#22c55e", warning: "#f59e0b",
  ink: "#0f172a", ink2: "#334155", muted: "#64748b",
  border: "#e2e8f0", bg: "#f8fafc", card: "#ffffff", sidebar: "#1e293b",
};

function Badge(props) {
  var colors = { pub: { bg: "#dcfce7", color: "#16a34a" }, draft: { bg: "#fef9c3", color: "#ca8a04" }, active: { bg: "#dcfce7", color: "#16a34a" }, disabled: { bg: "#fee2e2", color: "#dc2626" }, Basic: { bg: "#f1f5f9", color: "#475569" }, Pro: { bg: "#dbeafe", color: "#2563eb" }, Agency: { bg: "#fef3c7", color: "#d97706" } };
  var s = colors[props.type] || { bg: C.primaryLight, color: C.primary };
  return React.createElement("span", { style: { background: s.bg, color: s.color, fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4 } },
    React.createElement("span", { style: { width: 5, height: 5, borderRadius: "50%", background: "currentColor" } }),
    props.children
  );
}

function Input(props) {
  return React.createElement("input", Object.assign({ style: { width: "100%", background: props.dark ? "#273549" : C.bg, border: "1.5px solid " + (props.dark ? "#334155" : C.border), borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 13, color: props.dark ? "#f1f5f9" : C.ink, outline: "none" } }, props));
}

function Btn(props) {
  var bgMap = { primary: C.primary, danger: C.danger, success: C.success, dark: C.sidebar, outline: "transparent" };
  var bg = bgMap[props.variant] || C.primary;
  return React.createElement("button", { onClick: props.onClick, disabled: props.disabled, style: { background: bg, color: props.variant === "outline" ? C.muted : "white", border: props.variant === "outline" ? "1.5px solid " + C.border : "none", borderRadius: 9, padding: props.small ? "8px 14px" : "11px 20px", fontFamily: "Poppins,sans-serif", fontSize: props.small ? 12 : 13, fontWeight: 600, cursor: props.disabled ? "not-allowed" : "pointer", opacity: props.disabled ? 0.6 : 1, whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 6 } }, props.children);
}

export default function App() {
  var [session, setSession] = useState(null);
  var [profile, setProfile] = useState(null);
  var [view, setView] = useState("generate");
  var [authTab, setAuthTab] = useState("login");
  var [authLoading, setAuthLoading] = useState(false);
  var [authError, setAuthError] = useState("");
  var [authSuccess, setAuthSuccess] = useState("");
  var [loginEmail, setLoginEmail] = useState("");
  var [loginPw, setLoginPw] = useState("");
  var [regName, setRegName] = useState("");
  var [regEmail, setRegEmail] = useState("");
  var [regPw, setRegPw] = useState("");
  var [regPlan, setRegPlan] = useState("Basic");
  var [productTitle, setProductTitle] = useState("");
  var [productPrice, setProductPrice] = useState("");
  var [seoType, setSeoType] = useState("local");
  var [postType, setPostType] = useState("product");
  var [generating, setGenerating] = useState(false);
  var [generated, setGenerated] = useState(null);
  var [genError, setGenError] = useState("");
  var [saving, setSaving] = useState(false);
  var [saved, setSaved] = useState(false);
  var [published, setPublished] = useState(false);
  var [uploadedImages, setUploadedImages] = useState([]);
  var [imageAlts, setImageAlts] = useState([]);
  var [posts, setPosts] = useState([]);
  var [postsLoading, setPostsLoading] = useState(false);
  var [showAddClient, setShowAddClient] = useState(false);
  var [newClient, setNewClient] = useState({ name: "", email: "", password: "", plan: "Basic" });
  var [addingClient, setAddingClient] = useState(false);
  var [clients, setClients] = useState([]);
  var [clientsLoading, setClientsLoading] = useState(false);
  var [toast, setToast] = useState(null);
  var [toastErr, setToastErr] = useState(false);

  var isAdmin = profile && (profile.email === ADMIN_EMAIL || profile.role === "admin");

  useEffect(function() {
    try {
      var s = localStorage.getItem("pr_sess");
      var p = localStorage.getItem("pr_prof");
      if (s) setSession(JSON.parse(s));
      if (p) setProfile(JSON.parse(p));
    } catch(e) {}
  }, []);

  function notify(msg, err) {
    setToastErr(!!err); setToast(msg);
    setTimeout(function() { setToast(null); }, 3200);
  }

  function handleLogin() {
    if (!loginEmail || !loginPw) { setAuthError("Username/Email aur password zaroor bharen."); return; }
    setAuthLoading(true); setAuthError("");

    // Admin direct login - username + password
    if ((loginEmail === ADMIN_USER || loginEmail === ADMIN_EMAIL) && loginPw === ADMIN_PASS) {
      var adminSess = { token: "admin_local_token", user: { id: "admin_001", email: ADMIN_EMAIL } };
      var adminProf = { email: ADMIN_EMAIL, name: "Admin", role: "admin", plan: "Agency" };
      setSession(adminSess); setProfile(adminProf);
      localStorage.setItem("pr_sess", JSON.stringify(adminSess));
      localStorage.setItem("pr_prof", JSON.stringify(adminProf));
      setAuthLoading(false);
      setView("generate");
      return;
    }

    // Client login via Supabase
    authAPI.signIn(loginEmail, loginPw).then(function(d) {
      var sess = { token: d.access_token, user: d.user };
      var prof = { email: d.user.email, name: d.user.user_metadata && d.user.user_metadata.name ? d.user.user_metadata.name : d.user.email.split("@")[0], role: d.user.user_metadata && d.user.user_metadata.role ? d.user.user_metadata.role : "client", plan: d.user.user_metadata && d.user.user_metadata.plan ? d.user.user_metadata.plan : "Basic" };
      setSession(sess); setProfile(prof);
      localStorage.setItem("pr_sess", JSON.stringify(sess));
      localStorage.setItem("pr_prof", JSON.stringify(prof));
      setView("generate");
    }).catch(function(e) { setAuthError(e.message); }).finally(function() { setAuthLoading(false); });
  }

  function handleRegister() {
    if (!regName || !regEmail || !regPw) { setAuthError("Sab fields bharen."); return; }
    setAuthLoading(true); setAuthError("");
    authAPI.signUp(regEmail, regPw, regName).then(function() {
      setAuthSuccess("Account ban gaya! Email verify karein phir login karein.");
      setAuthTab("login"); setLoginEmail(regEmail);
    }).catch(function(e) { setAuthError(e.message); }).finally(function() { setAuthLoading(false); });
  }

  function handleLogout() {
    if (session && session.token) authAPI.signOut(session.token).catch(function(){});
    setSession(null); setProfile(null);
    localStorage.removeItem("pr_sess"); localStorage.removeItem("pr_prof");
    setPosts([]); setGenerated(null);
  }

  function loadPosts() {
    if (!session) return;
    setPostsLoading(true);
    var filter = isAdmin ? "" : "user_id=eq." + (session.user ? session.user.id : "");
    dbAPI.select("posts", filter, session.token).then(function(d) { setPosts(d); }).catch(function() { setPosts([]); }).finally(function() { setPostsLoading(false); });
  }

  useEffect(function() {
    if (session && (view === "dashboard" || view === "posts")) loadPosts();
  }, [view, session]);

  function loadClients() {
    if (!session || !isAdmin) return;
    setClientsLoading(true);
    adminAPI.listUsers(session.token).then(function(users) {
      var filtered = users.filter(function(u) { return u.email !== "adnanbutt3010@gmail.com"; });
      setClients(filtered);
    }).catch(function() {
      setClients([]);
    }).finally(function() { setClientsLoading(false); });
  }

  useEffect(function() {
    if (session && isAdmin && view === "clients") loadClients();
  }, [view, session]);

  function handleGenerate() {
    if (!productTitle.trim() || !productPrice.trim()) { setGenError("Title aur price zaroor bharen."); return; }
    setGenError(""); setGenerating(true); setGenerated(null); setSaved(false); setPublished(false); setUploadedImages([]); setImageAlts([]);
    setTimeout(function() {
      try {
        var r = generateSEO(productTitle, productPrice, seoType, postType);
        setGenerated(Object.assign({}, r, { product: productTitle, price: productPrice }));
      } catch(e) { setGenError("Error: " + e.message); }
      setGenerating(false);
    }, 1200);
  }

  function handleSave() {
    if (!generated || !session) return;
    setSaving(true);
    var rec = { user_id: session.user ? session.user.id : null, product_title: generated.product, product_price: generated.price, seo_title: generated.seoTitle, description: generated.description, meta_description: generated.metaDescription, keywords: generated.keywords, hashtags: generated.hashtags, cta: generated.cta, status: "draft", created_at: new Date().toISOString(), seo_type: generated.seoType, post_type: generated.postType };
    dbAPI.insert("posts", rec, session.token).then(function(d) {
      setPosts(function(p) { return [d[0] || Object.assign({}, rec, { id: Date.now() })].concat(p); });
      setSaved(true); notify("Supabase mein save ho gaya!");
    }).catch(function(e) { notify("Save failed: " + e.message, true); }).finally(function() { setSaving(false); });
  }

  function handlePublish() {
    if (!generated) return;
    if (saved && posts[0] && posts[0].id) {
      dbAPI.update("posts", "id=eq." + posts[0].id, { status: "published" }, session.token).then(function() {
        setPosts(function(p) { return p.map(function(x, i) { return i === 0 ? Object.assign({}, x, { status: "published" }) : x; }); });
      }).catch(function(){});
    }
    setPublished(true); notify("Post published!");
  }

  function handleToggleClient(client) {
    var isBanned = client.banned_until && client.banned_until !== "none";
    var action = isBanned ? adminAPI.unbanUser(client.id, session.token) : adminAPI.banUser(client.id, session.token);
    action.then(function() {
      notify(isBanned ? "Client enable ho gaya!" : "Client disable ho gaya!");
      loadClients();
    }).catch(function(e) { notify("Failed: " + e.message, true); });
  }

  function handleAddClient() {
    if (!newClient.name || !newClient.email || !newClient.password) { notify("Sab fields bharen.", true); return; }
    setAddingClient(true);
    authAPI.signUp(newClient.email, newClient.password, newClient.name).then(function() {
      notify("Client account ban gaya! Email verify ke baad login kar sakta hai.");
      setNewClient({ name: "", email: "", password: "", plan: "Basic" });
      setShowAddClient(false);
    }).catch(function(e) { notify("Failed: " + e.message, true); }).finally(function() { setAddingClient(false); });
  }

  var totalPub = posts.filter(function(p) { return p.status === "published"; }).length;
  var planLimit = { Basic: 100, Pro: 500, Agency: 99999 }[profile && profile.plan ? profile.plan : "Basic"] || 100;
  var usagePct = Math.min(Math.round(posts.length / planLimit * 100), 100);

  var ss = {
    app: { display: "flex", minHeight: "100vh", fontFamily: "Inter,sans-serif", background: C.bg, color: C.ink },
    sidebar: { width: 230, background: C.sidebar, minHeight: "100vh", position: "fixed", left: 0, top: 0, bottom: 0, display: "flex", flexDirection: "column", zIndex: 100 },
    logowrap: { padding: "22px 20px", borderBottom: "1px solid #334155" },
    logotext: { fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: 17, color: "#a5b4fc" },
    logosub: { fontSize: 10, color: "#475569", marginTop: 2, textTransform: "uppercase", letterSpacing: 1 },
    userchip: { margin: "12px 16px 0", background: "#273549", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 },
    avatar: { width: 32, height: 32, borderRadius: "50%", background: C.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 },
    nav: { padding: "12px 0", flex: 1 },
    navitem: { display: "flex", alignItems: "center", gap: 10, padding: "11px 20px", color: "#94a3b8", fontSize: 13, cursor: "pointer", borderLeft: "3px solid transparent", fontWeight: 500, transition: "all 0.15s" },
    navactive: { color: "#a5b4fc", borderLeftColor: C.primary, background: "#253047" },
    sidebottom: { padding: 16, borderTop: "1px solid #334155" },
    main: { marginLeft: 230, flex: 1, padding: "36px 40px" },
    card: { background: C.card, border: "1px solid " + C.border, borderRadius: 14, padding: 24, marginBottom: 20 },
    carddark: { background: "#1e293b", borderRadius: 14, padding: 28, marginBottom: 20 },
    statgrid3: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 },
    statgrid4: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 },
    statcard: { background: C.card, border: "1px solid " + C.border, borderRadius: 12, padding: 20 },
    statnum: { fontFamily: "Poppins,sans-serif", fontSize: 30, fontWeight: 700, color: C.ink },
    statlbl: { fontSize: 12, color: C.muted, marginTop: 4 },
    tbl: { background: C.card, border: "1px solid " + C.border, borderRadius: 12, overflow: "hidden", marginBottom: 24 },
    tblhead: { padding: "11px 18px", background: C.bg, borderBottom: "1px solid " + C.border, fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: C.muted, fontWeight: 600, display: "grid" },
    tblrow: { padding: "14px 18px", borderBottom: "1px solid " + C.border, alignItems: "center", fontSize: 13, display: "grid" },
    tbl4: { gridTemplateColumns: "2fr 1fr 1fr 1fr" },
    plansgrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 },
    plancard: { background: C.card, border: "2px solid " + C.border, borderRadius: 16, padding: "28px 22px", position: "relative", transition: "all 0.2s" },
    modal: { background: C.card, borderRadius: 16, padding: 28, width: "100%", maxWidth: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" },
    overlay: { position: "fixed", inset: 0, background: "rgba(15,23,42,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 },
    infobx: { background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 8, padding: "12px 16px", fontSize: 12, color: "#78350f", lineHeight: 1.7 },
    sucbx: { background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "12px 16px", fontSize: 12, color: "#166534" },
    errbx: { background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 8, padding: "12px 16px", fontSize: 12, color: "#e11d48", marginTop: 12 },
    fmlabel: { fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6, display: "block" },
    fmgroup: { marginBottom: 16 },
    toast: { position: "fixed", bottom: 28, right: 28, background: "#1e293b", color: "#f1f5f9", padding: "13px 20px", borderRadius: 10, fontSize: 13, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.18)", zIndex: 9999 },
  };

  // AUTH SCREEN
  if (!session) {
    return React.createElement("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1e293b,#0f172a)", padding: 20, fontFamily: "Inter,sans-serif" } },
      React.createElement("div", { style: { background: "white", borderRadius: 20, padding: 40, width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" } },
        React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: 22, color: C.primary, marginBottom: 4 } }, "PostRank AI"),
        React.createElement("div", { style: { fontSize: 12, color: C.muted, marginBottom: 28 } }, "SEO Automation Platform"),
        React.createElement("div", { style: { display: "flex", background: C.bg, borderRadius: 10, padding: 4, marginBottom: 24 } },
          React.createElement("button", { onClick: function() { setAuthTab("login"); setAuthError(""); }, style: { flex: 1, padding: "9px", border: "none", borderRadius: 8, fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: authTab === "login" ? 600 : 400, cursor: "pointer", background: authTab === "login" ? "white" : "transparent", color: authTab === "login" ? C.primary : C.muted, boxShadow: authTab === "login" ? "0 1px 4px rgba(0,0,0,0.1)" : "none" } }, "Login"),
          React.createElement("button", { onClick: function() { setAuthTab("register"); setAuthError(""); }, style: { flex: 1, padding: "9px", border: "none", borderRadius: 8, fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: authTab === "register" ? 600 : 400, cursor: "pointer", background: authTab === "register" ? "white" : "transparent", color: authTab === "register" ? C.primary : C.muted, boxShadow: authTab === "register" ? "0 1px 4px rgba(0,0,0,0.1)" : "none" } }, "Sign Up")
        ),
        authError ? React.createElement("div", { style: ss.errbx }, authError) : null,
        authSuccess ? React.createElement("div", { style: ss.sucbx }, authSuccess) : null,
        authTab === "login"
          ? React.createElement("div", null,
              React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Email"), React.createElement(Input, { type: "email", placeholder: "admin ya email", value: loginEmail, onChange: function(e) { setLoginEmail(e.target.value); }, onKeyDown: function(e) { if (e.key === "Enter") handleLogin(); } })),
              React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Password"), React.createElement(Input, { type: "password", placeholder: "password", value: loginPw, onChange: function(e) { setLoginPw(e.target.value); }, onKeyDown: function(e) { if (e.key === "Enter") handleLogin(); } })),
              React.createElement(Btn, { variant: "primary", onClick: handleLogin, disabled: authLoading, style: { width: "100%" } }, authLoading ? "Login ho raha hai..." : "Login Karein"),
              React.createElement("div", { style: { fontSize: 11, color: C.muted, textAlign: "center", marginTop: 14 } }, "Admin username: admin | Recovery: adnanbutt3010@gmail.com")
            )
          : React.createElement("div", null,
              React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Full Name"), React.createElement(Input, { placeholder: "Aapka naam", value: regName, onChange: function(e) { setRegName(e.target.value); } })),
              React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Email"), React.createElement(Input, { type: "email", placeholder: "apna@email.com", value: regEmail, onChange: function(e) { setRegEmail(e.target.value); } })),
              React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Password"), React.createElement(Input, { type: "password", placeholder: "Min 6 chars", value: regPw, onChange: function(e) { setRegPw(e.target.value); } })),
              React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Plan"),
                React.createElement("select", { value: regPlan, onChange: function(e) { setRegPlan(e.target.value); }, style: { width: "100%", background: C.bg, border: "1.5px solid " + C.border, borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 13 } },
                  React.createElement("option", { value: "Basic" }, "Basic - $19/mo"),
                  React.createElement("option", { value: "Pro" }, "Pro - $49/mo"),
                  React.createElement("option", { value: "Agency" }, "Agency - $149/mo")
                )
              ),
              React.createElement(Btn, { variant: "primary", onClick: handleRegister, disabled: authLoading }, authLoading ? "Ban raha hai..." : "Account Banayein")
            )
      )
    );
  }

  var NAV = [
    { id: "generate", icon: "⚡", label: "Generate Post" },
    { id: "dashboard", icon: "D", label: "Dashboard" },
    { id: "posts", icon: "P", label: "My Posts" },
    { id: "plans", icon: "*", label: "Plans" },
  ];
  if (isAdmin) {
    NAV.push({ id: "clients", icon: "C", label: "Clients" });
    NAV.push({ id: "admin", icon: "A", label: "Admin Panel" });
  } else {
    NAV.push({ id: "settings", icon: "S", label: "Settings" });
  }

  return React.createElement("div", { style: ss.app },
    // SIDEBAR
    React.createElement("aside", { style: ss.sidebar },
      React.createElement("div", { style: ss.logowrap },
        React.createElement("div", { style: ss.logotext }, "PostRank AI"),
        React.createElement("div", { style: ss.logosub }, "SEO Automation")
      ),
      React.createElement("div", { style: ss.userchip },
        React.createElement("div", { style: ss.avatar }, (profile.name || "U")[0].toUpperCase()),
        React.createElement("div", null,
          React.createElement("div", { style: { fontSize: 12, fontWeight: 600, color: "#e2e8f0" } }, profile.name || profile.email),
          React.createElement("div", { style: { fontSize: 10, color: "#64748b", marginTop: 1 } }, isAdmin ? "Admin" : (profile.plan || "Basic") + " Plan")
        )
      ),
      React.createElement("nav", { style: ss.nav },
        NAV.map(function(n) {
          return React.createElement("div", { key: n.id, onClick: function() { setView(n.id); }, style: Object.assign({}, ss.navitem, view === n.id ? ss.navactive : {}) },
            React.createElement("span", { style: { fontSize: 15, width: 18, textAlign: "center" } }, n.icon),
            n.label
          );
        })
      ),
      React.createElement("div", { style: ss.sidebottom },
        !isAdmin ? React.createElement("div", { style: { background: "#273549", borderRadius: 8, padding: "10px 12px", marginBottom: 10 } },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: "#64748b", marginBottom: 5 } },
            React.createElement("span", null, "Posts Used"),
            React.createElement("span", { style: { color: "#a5b4fc" } }, posts.length + "/" + planLimit)
          ),
          React.createElement("div", { style: { background: "#1e293b", borderRadius: 4, height: 5, overflow: "hidden" } },
            React.createElement("div", { style: { width: usagePct + "%", height: "100%", background: usagePct > 80 ? C.danger : C.primary, borderRadius: 4 } })
          )
        ) : null,
        React.createElement("button", { onClick: handleLogout, style: { width: "100%", background: "#273549", border: "1px solid #334155", borderRadius: 9, padding: 10, color: "#94a3b8", fontFamily: "Inter,sans-serif", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 } }, "Logout")
      )
    ),

    // MAIN
    React.createElement("main", { style: ss.main },

      // GENERATE
      view === "generate" && React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 28 } },
          React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700 } }, "Generate Post"),
          React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 5 } }, "Product ya Blog → AI likhega → Save → Publish")
        ),
        React.createElement("div", { style: ss.carddark },
          React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 18, fontWeight: 600, color: "#f1f5f9", marginBottom: 16 } }, postType === "blog" ? "Blog topic kya hai?" : "Aaj kya sell kar rahe ho?"),
          React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" } },
            React.createElement("button", { onClick: function() { setPostType("product"); }, style: { padding: "8px 16px", borderRadius: 8, border: "2px solid " + (postType === "product" ? C.primary : "#334155"), background: postType === "product" ? C.primary : "transparent", color: postType === "product" ? "white" : "#94a3b8", fontFamily: "Inter,sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer" } }, "Product Post"),
            React.createElement("button", { onClick: function() { setPostType("blog"); }, style: { padding: "8px 16px", borderRadius: 8, border: "2px solid " + (postType === "blog" ? C.warning : "#334155"), background: postType === "blog" ? C.warning : "transparent", color: postType === "blog" ? "white" : "#94a3b8", fontFamily: "Inter,sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer" } }, "Blog Post")
          ),
          React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" } },
            React.createElement("button", { onClick: function() { setSeoType("local"); }, style: { padding: "7px 14px", borderRadius: 8, border: "none", background: seoType === "local" ? "#273549" : "#1a2535", color: seoType === "local" ? "#a5b4fc" : "#475569", fontFamily: "Inter,sans-serif", fontWeight: 500, fontSize: 11, cursor: "pointer" } }, "Pakistan Local SEO"),
            React.createElement("button", { onClick: function() { setSeoType("international"); }, style: { padding: "7px 14px", borderRadius: 8, border: "none", background: seoType === "international" ? "#273549" : "#1a2535", color: seoType === "international" ? "#a5b4fc" : "#475569", fontFamily: "Inter,sans-serif", fontWeight: 500, fontSize: 11, cursor: "pointer" } }, "International SEO")
          ),
          React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "flex-end", flexWrap: "wrap" } },
            React.createElement("div", { style: { flex: 1 } },
              React.createElement("div", { style: { fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 7, fontWeight: 500 } }, postType === "blog" ? "Blog Topic" : "Product Title"),
              React.createElement(Input, { dark: true, placeholder: postType === "blog" ? "e.g. Best Sneakers in Pakistan" : "e.g. Nike Running Shoes", value: productTitle, onChange: function(e) { setProductTitle(e.target.value); }, onKeyDown: function(e) { if (e.key === "Enter") handleGenerate(); } })
            ),
            React.createElement("div", { style: { maxWidth: 170 } },
              React.createElement("div", { style: { fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 7, fontWeight: 500 } }, postType === "blog" ? "Keyword" : "Price"),
              React.createElement(Input, { dark: true, placeholder: postType === "blog" ? "keyword" : "PKR 3000", value: productPrice, onChange: function(e) { setProductPrice(e.target.value); }, onKeyDown: function(e) { if (e.key === "Enter") handleGenerate(); } })
            ),
            React.createElement(Btn, { variant: "primary", onClick: handleGenerate, disabled: generating }, generating ? "Generating..." : "Generate Post")
          ),
          genError ? React.createElement("div", { style: ss.errbx }, genError) : null
        ),

        generated && React.createElement("div", { style: { background: C.card, border: "1px solid " + C.border, borderRadius: 14, overflow: "hidden", marginBottom: 20 } },
          React.createElement("div", { style: { background: "#1e293b", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" } },
              React.createElement("span", { style: { background: C.primary, color: "white", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20 } }, "AI Generated"),
              React.createElement("span", { style: { background: generated.postType === "blog" ? C.warning : C.primary, color: "white", fontSize: 10, padding: "3px 10px", borderRadius: 20 } }, generated.postType === "blog" ? "Blog" : "Product"),
              React.createElement("span", { style: { background: "#334155", color: "#94a3b8", fontSize: 10, padding: "3px 10px", borderRadius: 20 } }, generated.seoType === "local" ? "Pakistan" : "International"),
              React.createElement("span", { style: { fontSize: 13, color: "#e2e8f0", fontWeight: 600 } }, generated.product)
            ),
            React.createElement("div", { style: { display: "flex", gap: 8 } },
              React.createElement(Btn, { variant: saved ? "success" : "primary", onClick: handleSave, disabled: saving || saved, small: true }, saved ? "Saved" : saving ? "Saving..." : "Save to DB"),
              React.createElement(Btn, { variant: published ? "success" : "danger", onClick: handlePublish, disabled: published, small: true }, published ? "Published!" : "Publish")
            )
          ),
          React.createElement("div", { style: { padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 } },
            React.createElement("div", { style: { gridColumn: "1/-1" } },
              React.createElement("div", { style: { fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: C.muted, marginBottom: 7, fontWeight: 600 } }, "SEO Title"),
              React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: 14, color: C.primaryDark, background: C.bg, border: "1px solid " + C.border, borderRadius: 8, padding: "11px 13px" } }, generated.seoTitle)
            ),
            React.createElement("div", { style: { gridColumn: "1/-1" } },
              React.createElement("div", { style: { fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: C.muted, marginBottom: 7, fontWeight: 600 } }, "Description"),
              React.createElement("div", { style: { fontSize: 13, color: C.ink, lineHeight: 1.7, background: C.bg, border: "1px solid " + C.border, borderRadius: 8, padding: "11px 13px", whiteSpace: "pre-line" } }, generated.description)
            ),
            React.createElement("div", { style: { gridColumn: "1/-1" } },
              React.createElement("div", { style: { fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: C.muted, marginBottom: 7, fontWeight: 600 } }, "Meta Description"),
              React.createElement("div", { style: { fontSize: 13, color: C.ink, background: C.bg, border: "1px solid " + C.border, borderRadius: 8, padding: "11px 13px" } }, generated.metaDescription)
            ),
            React.createElement("div", null,
              React.createElement("div", { style: { fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: C.muted, marginBottom: 7, fontWeight: 600 } }, "Keywords"),
              React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, padding: "10px 12px", background: C.bg, border: "1px solid " + C.border, borderRadius: 8 } },
                generated.keywords.map(function(k, i) { return React.createElement("span", { key: i, style: { background: "#334155", color: "#e2e8f0", fontSize: 11, padding: "3px 10px", borderRadius: 20 } }, k); })
              )
            ),
            React.createElement("div", null,
              React.createElement("div", { style: { fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: C.muted, marginBottom: 7, fontWeight: 600 } }, "Hashtags"),
              React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, padding: "10px 12px", background: C.bg, border: "1px solid " + C.border, borderRadius: 8 } },
                generated.hashtags.map(function(h, i) { return React.createElement("span", { key: i, style: { background: C.primaryLight, color: C.primary, fontSize: 11, padding: "3px 10px", borderRadius: 20 } }, h); })
              )
            ),
            React.createElement("div", { style: { gridColumn: "1/-1" } },
              React.createElement("div", { style: { fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: C.muted, marginBottom: 7, fontWeight: 600 } }, "Call To Action"),
              React.createElement("div", { style: { fontWeight: 700, fontSize: 14, color: C.danger, background: C.bg, border: "1px solid " + C.border, borderRadius: 8, padding: "11px 13px" } }, generated.cta)
            ),
            React.createElement("div", { style: { gridColumn: "1/-1" } },
              React.createElement("div", { style: { fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: C.muted, marginBottom: 7, fontWeight: 600 } }, "Snippet (150 chars)"),
              React.createElement("div", { style: { fontSize: 12, color: "#475569", background: C.bg, border: "1px solid " + C.border, borderRadius: 8, padding: "11px 13px" } }, generated.snippet)
            ),
            React.createElement("div", { style: { gridColumn: "1/-1" } },
              React.createElement("div", { style: { fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: C.muted, marginBottom: 7, fontWeight: 600 } }, "Permalink"),
              React.createElement("div", { style: { fontSize: 12, color: C.primary, background: C.bg, border: "1px solid " + C.border, borderRadius: 8, padding: "11px 13px" } }, generated.permalink)
            ),
            React.createElement("div", { style: { gridColumn: "1/-1" } },
              React.createElement("div", { style: { fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: C.muted, marginBottom: 7, fontWeight: 600 } }, "Image Alt Texts"),
              React.createElement("div", { style: { background: C.bg, border: "2px dashed #c7d2fe", borderRadius: 10, padding: 16, marginBottom: 12, textAlign: "center", cursor: "pointer" } },
                React.createElement("input", { type: "file", accept: "image/*", multiple: true, id: "imgup", style: { display: "none" },
                  onChange: function(e) {
                    var files = Array.from(e.target.files);
                    var ec = uploadedImages.length;
                    var angles = ["Front View","Side View","Back View","Detail Shot","Lifestyle Photo","Close Up","Top View","Package Shot"];
                    var previews = files.map(function(f, i) {
                      var idx = ec + i;
                      var ang = angles[idx] || ("View " + (idx+1));
                      var alt = generated.seoType === "local" ? generated.product + " " + ang + " - " + generated.price + " Pakistan" : generated.product + " " + ang + " - Buy Online " + generated.price;
                      return { file: f, url: URL.createObjectURL(f), name: f.name, alt: generated.altTexts[idx] || alt, title: generated.product + " | " + ang + " | " + generated.price };
                    });
                    setUploadedImages(function(p) { return p.concat(previews); });
                    setImageAlts(function(p) { return p.concat(previews.map(function(x) { return { alt: x.alt, title: x.title }; })); });
                  }
                }),
                React.createElement("label", { htmlFor: "imgup", style: { cursor: "pointer", display: "block" } },
                  React.createElement("div", { style: { fontSize: 28, marginBottom: 6 } }, "📁"),
                  React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: C.primary } }, "Images Upload Karo"),
                  React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 3 } }, "JPG, PNG, WEBP - Multiple select kar sakte ho")
                )
              ),
              uploadedImages.length > 0
                ? React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
                    uploadedImages.map(function(img, i) {
                      return React.createElement("div", { key: i, style: { background: C.bg, border: "1px solid " + C.border, borderRadius: 10, padding: 12, display: "flex", gap: 12, alignItems: "flex-start" } },
                        React.createElement("div", { style: { position: "relative", flexShrink: 0 } },
                          React.createElement("img", { src: img.url, alt: img.alt, style: { width: 70, height: 70, objectFit: "cover", borderRadius: 8 } }),
                          React.createElement("span", { style: { position: "absolute", top: -6, left: -6, background: C.primary, color: "white", borderRadius: 4, padding: "1px 6px", fontSize: 9, fontWeight: 700 } }, "IMG " + (i+1))
                        ),
                        React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 6 } },
                          React.createElement("div", null,
                            React.createElement("div", { style: { fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3, fontWeight: 600 } }, "SEO Alt Text"),
                            React.createElement("input", { value: imageAlts[i] ? imageAlts[i].alt : "", onChange: function(e) { var u = imageAlts.slice(); if (!u[i]) u[i] = { alt: "", title: "" }; u[i] = Object.assign({}, u[i], { alt: e.target.value }); setImageAlts(u); }, style: { width: "100%", background: "white", border: "1.5px solid " + C.border, borderRadius: 7, padding: "7px 10px", fontSize: 12, fontFamily: "Inter,sans-serif", outline: "none" } })
                          ),
                          React.createElement("div", null,
                            React.createElement("div", { style: { fontSize: 9, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3, fontWeight: 600 } }, "Image Title"),
                            React.createElement("input", { value: imageAlts[i] ? imageAlts[i].title : "", onChange: function(e) { var u = imageAlts.slice(); if (!u[i]) u[i] = { alt: "", title: "" }; u[i] = Object.assign({}, u[i], { title: e.target.value }); setImageAlts(u); }, style: { width: "100%", background: "white", border: "1.5px solid " + C.border, borderRadius: 7, padding: "7px 10px", fontSize: 12, fontFamily: "Inter,sans-serif", outline: "none" } })
                          ),
                          React.createElement("div", { style: { fontSize: 10, color: C.success, fontWeight: 500 } }, "Auto-publish par website par upload hogi")
                        ),
                        React.createElement("button", { onClick: function() { setUploadedImages(function(p) { return p.filter(function(_, j) { return j !== i; }); }); setImageAlts(function(p) { return p.filter(function(_, j) { return j !== i; }); }); }, style: { background: "#fff1f2", border: "none", borderRadius: 6, padding: "4px 8px", color: C.danger, cursor: "pointer", fontSize: 12 } }, "X")
                      );
                    }),
                    React.createElement("div", { style: ss.sucbx }, uploadedImages.length + " image(s) ready - WordPress/Shopify par auto-upload hongi!")
                  )
                : React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } },
                    generated.altTexts.map(function(alt, i) {
                      return React.createElement("div", { key: i, style: { background: C.bg, border: "1px solid " + C.border, borderRadius: 7, padding: "8px 12px", fontSize: 12, color: C.ink2, display: "flex", alignItems: "flex-start", gap: 8 } },
                        React.createElement("span", { style: { background: C.primary, color: "white", borderRadius: 4, padding: "2px 7px", fontSize: 10, fontWeight: 700, flexShrink: 0 } }, "IMG " + (i+1)),
                        React.createElement("div", null,
                          React.createElement("div", { style: { fontWeight: 500 } }, alt),
                          React.createElement("div", { style: { fontSize: 10, color: C.muted, marginTop: 1 } }, "Title: " + generated.product + " | " + generated.price)
                        )
                      );
                    })
                  )
            )
          )
        ),
        !generated && !generating && React.createElement("div", { style: { textAlign: "center", padding: "48px 20px", color: C.muted } },
          React.createElement("div", { style: { fontSize: 32, marginBottom: 10 } }, "*"),
          React.createElement("div", null, "Upar product enter karo aur Generate dabao.")
        )
      ),

      // DASHBOARD
      view === "dashboard" && React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 28 } },
          React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700 } }, "Dashboard"),
          React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 5 } }, "Live data from Supabase")
        ),
        React.createElement("div", { style: ss.statgrid3 },
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.primary }) }, React.createElement("div", { style: ss.statnum }, posts.length), React.createElement("div", { style: ss.statlbl }, "Total Posts")),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.danger }) }, React.createElement("div", { style: ss.statnum }, totalPub), React.createElement("div", { style: ss.statlbl }, "Published")),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.success }) }, React.createElement("div", { style: ss.statnum }, posts.length - totalPub), React.createElement("div", { style: ss.statlbl }, "Drafts"))
        ),
        React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 14 } }, "Recent Posts"),
        React.createElement("div", { style: ss.tbl },
          React.createElement("div", { style: Object.assign({}, ss.tblhead, ss.tbl4) }, React.createElement("div", null, "Product"), React.createElement("div", null, "Price"), React.createElement("div", null, "Status"), React.createElement("div", null, "Date")),
          postsLoading ? React.createElement("div", { style: { textAlign: "center", padding: 28, color: C.muted } }, "Loading...") :
          posts.length === 0 ? React.createElement("div", { style: { textAlign: "center", padding: 28, color: C.muted } }, "Koi post nahi. Generate karo!") :
          posts.slice(0, 5).map(function(p) {
            return React.createElement("div", { key: p.id, style: Object.assign({}, ss.tblrow, ss.tbl4) },
              React.createElement("div", { style: { fontWeight: 600 } }, p.product_title),
              React.createElement("div", { style: { color: C.muted, fontSize: 12 } }, p.product_price),
              React.createElement(Badge, { type: p.status === "published" ? "pub" : "draft" }, p.status),
              React.createElement("div", { style: { color: C.muted, fontSize: 11 } }, p.created_at ? new Date(p.created_at).toLocaleDateString() : "-")
            );
          })
        )
      ),

      // MY POSTS
      view === "posts" && React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 28 } },
          React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700 } }, "My Posts")
        ),
        React.createElement("div", { style: ss.tbl },
          React.createElement("div", { style: Object.assign({}, ss.tblhead, ss.tbl4) }, React.createElement("div", null, "Product"), React.createElement("div", null, "Price"), React.createElement("div", null, "Status"), React.createElement("div", null, "Date")),
          postsLoading ? React.createElement("div", { style: { textAlign: "center", padding: 28, color: C.muted } }, "Loading...") :
          posts.length === 0 ? React.createElement("div", { style: { textAlign: "center", padding: 28, color: C.muted } }, "Koi post nahi.") :
          posts.map(function(p) {
            return React.createElement("div", { key: p.id, style: Object.assign({}, ss.tblrow, ss.tbl4) },
              React.createElement("div", null, React.createElement("div", { style: { fontWeight: 600 } }, p.product_title), React.createElement("div", { style: { fontSize: 11, color: C.muted } }, p.seo_title ? p.seo_title.slice(0, 45) + "..." : "")),
              React.createElement("div", { style: { color: C.muted, fontSize: 12 } }, p.product_price),
              React.createElement(Badge, { type: p.status === "published" ? "pub" : "draft" }, p.status),
              React.createElement("div", { style: { color: C.muted, fontSize: 11 } }, p.created_at ? new Date(p.created_at).toLocaleDateString() : "-")
            );
          })
        )
      ),

      // CLIENTS (Admin)
      view === "clients" && isAdmin && React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 } },
          React.createElement("div", null,
            React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700 } }, "Clients"),
            React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 5 } }, "Clients manage karo - Add, Enable, Disable")
          ),
          React.createElement(Btn, { variant: "primary", onClick: function() { setShowAddClient(true); } }, "+ Add Client")
        ),
        React.createElement("div", { style: ss.statgrid3 },
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.primary }) },
            React.createElement("div", { style: ss.statnum }, clients.length),
            React.createElement("div", { style: ss.statlbl }, "Total Clients")
          ),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.success }) },
            React.createElement("div", { style: ss.statnum }, clients.filter(function(c) { return !c.banned_until || c.banned_until === "none"; }).length),
            React.createElement("div", { style: ss.statlbl }, "Active")
          ),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.danger }) },
            React.createElement("div", { style: ss.statnum }, clients.filter(function(c) { return c.banned_until && c.banned_until !== "none"; }).length),
            React.createElement("div", { style: ss.statlbl }, "Disabled")
          )
        ),
        React.createElement("div", { style: ss.tbl },
          React.createElement("div", { style: Object.assign({}, ss.tblhead, { gridTemplateColumns: "2fr 1fr 1fr 1fr" }) },
            React.createElement("div", null, "Client"),
            React.createElement("div", null, "Joined"),
            React.createElement("div", null, "Status"),
            React.createElement("div", null, "Action")
          ),
          clientsLoading
            ? React.createElement("div", { style: { textAlign: "center", padding: 28, color: C.muted } }, "Loading clients...")
            : clients.length === 0
              ? React.createElement("div", { style: { textAlign: "center", padding: 28, color: C.muted } },
                  React.createElement("div", { style: { fontSize: 28, marginBottom: 8 } }, "👥"),
                  React.createElement("div", null, "Koi client nahi. Add Client dabao!"))
              : clients.map(function(c) {
                  var isBanned = c.banned_until && c.banned_until !== "none";
                  return React.createElement("div", { key: c.id, style: Object.assign({}, ss.tblrow, { gridTemplateColumns: "2fr 1fr 1fr 1fr" }) },
                    React.createElement("div", null,
                      React.createElement("div", { style: { fontWeight: 600, color: C.ink } }, c.user_metadata && c.user_metadata.name ? c.user_metadata.name : c.email.split("@")[0]),
                      React.createElement("div", { style: { fontSize: 11, color: C.muted } }, c.email)
                    ),
                    React.createElement("div", { style: { fontSize: 11, color: C.muted } }, c.created_at ? new Date(c.created_at).toLocaleDateString() : "-"),
                    React.createElement(Badge, { type: isBanned ? "disabled" : "active" }, isBanned ? "Disabled" : "Active"),
                    React.createElement("button", {
                      onClick: function() { handleToggleClient(c); },
                      style: { border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 11, fontFamily: "Inter,sans-serif", cursor: "pointer", fontWeight: 600, background: isBanned ? "#dcfce7" : "#fee2e2", color: isBanned ? "#16a34a" : "#dc2626" }
                    }, isBanned ? "Enable" : "Disable")
                  );
                })
        )
      ),

      // SETTINGS (Client)
      view === "settings" && !isAdmin && React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 28 } },
          React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700 } }, "Settings"),
          React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 5 } }, "Website credentials save karein")
        ),
        React.createElement("div", { style: ss.card },
          React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 16 } }, "Website Integration"),
          React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Platform"), React.createElement("select", { style: { width: "100%", background: C.bg, border: "1.5px solid " + C.border, borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 13 } }, React.createElement("option", null, "WordPress"), React.createElement("option", null, "Shopify"))),
          React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Website URL"), React.createElement(Input, { placeholder: "https://yourwebsite.com" })),
          React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "WordPress Username"), React.createElement(Input, { placeholder: "admin" })),
          React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "App Password"), React.createElement(Input, { type: "password", placeholder: "xxxx xxxx xxxx" })),
          React.createElement(Btn, { variant: "primary" }, "Save Settings")
        )
      ),

      // ADMIN
      view === "admin" && isAdmin && React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 28 } },
          React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700 } }, "Admin Panel")
        ),
        React.createElement("div", { style: ss.statgrid4 },
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.primary }) }, React.createElement("div", { style: ss.statnum }, posts.length), React.createElement("div", { style: ss.statlbl }, "Total Posts")),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.success }) }, React.createElement("div", { style: ss.statnum }, totalPub), React.createElement("div", { style: ss.statlbl }, "Published")),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.warning }) }, React.createElement("div", { style: ss.statnum }, "3"), React.createElement("div", { style: ss.statlbl }, "Active Clients")),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.danger }) }, React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700, color: C.primary } }, "$2,340"), React.createElement("div", { style: ss.statlbl }, "Monthly Revenue"))
        )
      ),

      // PLANS
      view === "plans" && React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 28 } },
          React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700 } }, "Plans"),
          React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 5 } }, "Simple monthly billing")
        ),
        React.createElement("div", { style: ss.plansgrid },
          [{ name: "Basic", price: "$19", feats: ["100 posts/month","SEO optimization","1 website","Email support"], featured: false },
           { name: "Pro", price: "$49", feats: ["500 posts/month","Advanced SEO","5 websites","Priority support","Analytics"], featured: true },
           { name: "Agency", price: "$149", feats: ["Unlimited posts","Full SEO suite","Unlimited websites","Dedicated support","White-label","API access"], featured: false }
          ].map(function(p) {
            return React.createElement("div", { key: p.name, style: Object.assign({}, ss.plancard, p.featured ? { background: "#1e293b", borderColor: C.primary } : {}) },
              p.featured ? React.createElement("div", { style: { position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: C.primary, color: "white", fontSize: 9, fontWeight: 700, padding: "4px 14px", borderRadius: 20, whiteSpace: "nowrap" } }, "Most Popular") : null,
              React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 8, color: p.featured ? "#a5b4fc" : C.ink } }, p.name),
              React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 32, fontWeight: 700, color: p.featured ? "#f1f5f9" : C.ink } }, p.price, React.createElement("span", { style: { fontSize: 12, color: C.muted } }, "/mo")),
              React.createElement("ul", { style: { margin: "18px 0", listStyle: "none" } },
                p.feats.map(function(f) { return React.createElement("li", { key: f, style: { fontSize: 12, padding: "5px 0", borderBottom: "1px solid " + (p.featured ? "#334155" : C.border), display: "flex", alignItems: "center", gap: 7, color: p.featured ? "#94a3b8" : C.ink2 } }, React.createElement("span", { style: { color: C.primary } }, "✓"), f); })
              ),
              React.createElement("button", { style: { width: "100%", padding: 12, borderRadius: 10, border: "2px solid " + C.primary, background: p.featured ? C.primary : "transparent", color: p.featured ? "white" : C.primary, fontFamily: "Poppins,sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" } }, p.name === (profile.plan || "Basic") ? "Current Plan" : "Get Started")
            );
          })
        )
      )
    ),

    // ADD CLIENT MODAL
    showAddClient && React.createElement("div", { style: ss.overlay, onClick: function(e) { if (e.target === e.currentTarget) setShowAddClient(false); } },
      React.createElement("div", { style: ss.modal },
        React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 20 } }, "Naya Client Add Karo"),
        React.createElement("div", { style: ss.infobx, marginBottom: 16 }, "Client ka Supabase account banayein. Wo email verify karke login karega."),
        React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Name *"), React.createElement(Input, { placeholder: "Ali Store", value: newClient.name, onChange: function(e) { setNewClient(function(c) { return Object.assign({}, c, { name: e.target.value }); }); } })),
        React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Email *"), React.createElement(Input, { type: "email", placeholder: "client@email.com", value: newClient.email, onChange: function(e) { setNewClient(function(c) { return Object.assign({}, c, { email: e.target.value }); }); } })),
        React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Password *"), React.createElement(Input, { type: "password", placeholder: "Min 6 chars", value: newClient.password, onChange: function(e) { setNewClient(function(c) { return Object.assign({}, c, { password: e.target.value }); }); } })),
        React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Plan"), React.createElement("select", { value: newClient.plan, onChange: function(e) { setNewClient(function(c) { return Object.assign({}, c, { plan: e.target.value }); }); }, style: { width: "100%", background: C.bg, border: "1.5px solid " + C.border, borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 13 } }, React.createElement("option", null, "Basic"), React.createElement("option", null, "Pro"), React.createElement("option", null, "Agency"))),
        React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 20 } },
          React.createElement("button", { onClick: function() { setShowAddClient(false); }, style: { flex: 1, padding: 11, borderRadius: 9, border: "1.5px solid " + C.border, background: "transparent", color: C.muted, fontFamily: "Inter,sans-serif", fontSize: 13, cursor: "pointer" } }, "Cancel"),
          React.createElement(Btn, { variant: "primary", onClick: handleAddClient, disabled: addingClient }, addingClient ? "Ban raha hai..." : "Client Add Karo")
        )
      )
    ),

    // TOAST
    toast && React.createElement("div", { style: Object.assign({}, ss.toast, { borderLeft: "4px solid " + (toastErr ? C.danger : C.success) }) }, toast)
  );
}

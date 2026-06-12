import React, { useState, useEffect } from "react";

const SUPA_URL = "https://yizzvwyvdnkbbhvojqlp.supabase.co";
const SUPA_KEY = "sb_publishable_Bz5xRPDQ_ZDE99T_QRSLlg_UKLH-6b6";
const ADMIN_EMAIL = "adnanbutt3010@gmail.com";
const ADMIN_USER = "admin";
const ADMIN_PASS = "Pst@2026";
// Plan credit limits
const PLAN_LIMITS = {
  Basic: 50,
  Pro: 250,
  Agency: 1500,
  AgencyUnlimited: -1,
};

const COMPANY_INFO = {
  name: "GeoRouteX",
  tagline: "Map Your Digital Success",
  founder: "Adnan Butt",
  title: "Founder & CEO",
  email: "adnanbutt3010@gmail.com",
  phone: "+92-309-4626298",
  website: "www.georoutex.com",
  whatsapp: "923094626298",
};

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
  var tl = title.toLowerCase();
  var words = title.split(" ");
  var slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  var isLocal = seoType === "local";
  var isBlog = postType === "blog";
  var yr = new Date().getFullYear();
  var city = "Karachi, Lahore, Islamabad, Rawalpindi";
  var nl = "\n";

  var kw = isLocal ? [
    tl + " price in pakistan",
    "buy " + tl + " online pakistan",
    tl + " best price pakistan " + yr,
    "original " + tl + " pakistan",
    tl + " cash on delivery",
    "cheap " + tl + " pakistan",
    tl + " karachi lahore islamabad",
    "best quality " + tl + " pk"
  ] : [
    "buy " + tl + " online",
    "best " + tl + " " + yr,
    tl + " free shipping worldwide",
    "premium " + tl + " for sale",
    tl + " best deal online",
    "top rated " + tl,
    tl + " shop online",
    "discount " + tl + " worldwide"
  ];

  var bkw = isLocal ? [
    tl + " guide pakistan " + yr,
    "best " + tl + " in pakistan",
    tl + " review pakistan",
    "how to buy " + tl + " in pakistan",
    tl + " tips pakistan"
  ] : [
    tl + " complete guide " + yr,
    "best " + tl + " review",
    "top " + tl + " worldwide",
    tl + " buying guide",
    "how to choose " + tl
  ];

  var tags = words.map(function(w) { return "#" + w.charAt(0).toUpperCase() + w.slice(1); });
  if (isLocal) { tags.push("#PakistanShopping", "#OnlineShoppingPK", "#CashOnDelivery", "#MadeForPakistan"); }
  else { tags.push("#OnlineShopping", "#BestPrice", "#FreeShipping", "#ShopNow"); }

  var seoTitle;
  if (isBlog) {
    seoTitle = isLocal ? "Best " + title + " in Pakistan - Complete Guide " + yr + " | Prices, Reviews & Tips" : title + " - Ultimate Buying Guide " + yr + " | Expert Reviews & Best Deals";
  } else {
    seoTitle = isLocal ? "Buy " + title + " Online in Pakistan | Best Price " + price + " | Fast COD Delivery" : "Premium " + title + " - Best Price " + price + " | " + yr + " | Free Worldwide Shipping";
  }

  var descParts;
  if (isBlog) {
    descParts = isLocal ? [
      "Are you looking for the most comprehensive guide on " + title + " in Pakistan " + yr + "? You have come to the right place!",
      "",
      "In this expert buying guide, we cover everything about " + title + " - from key features, price comparisons starting at " + price + ", to honest reviews from real Pakistani users.",
      "",
      "What is " + title + "?",
      title + " is one of the most popular and trusted products in Pakistan right now. With prices starting at " + price + ", it delivers exceptional value for Pakistani consumers.",
      "",
      "Key Benefits of " + title + " in Pakistan:",
      "- Premium quality at the best price of " + price + " available in Pakistan",
      "- Trusted by thousands of Pakistani customers across " + city,
      "- Available with Cash on Delivery nationwide",
      "- Fast delivery within 2-5 business days anywhere in Pakistan",
      "- Easy 7-day return policy with full refund guarantee",
      "",
      "Why " + title + " is the Best Choice in Pakistan " + yr + ":",
      "After extensive research and comparison, " + title + " consistently ranks as the top choice for Pakistani buyers. At " + price + ", the quality and value are simply unmatched in the local market.",
      "",
      "Final Verdict:",
      "If you want the best " + title + " experience in Pakistan, do not wait. Limited stock available - order now and get fast delivery to your doorstep!"
    ] : [
      "Looking for the ultimate guide on " + title + " in " + yr + "? Our experts have tested and reviewed everything so you do not have to!",
      "",
      "In this comprehensive guide, we cover everything about " + title + " - from technical specifications and key features to price comparisons and buying recommendations from international experts.",
      "",
      "What Makes " + title + " Stand Out?",
      title + " has earned a stellar reputation worldwide for its exceptional quality, innovative design, and outstanding value at just " + price + ". Customers in over 50 countries trust this product.",
      "",
      "Top Features and Benefits:",
      "- Premium build quality that outperforms competitors in its price range",
      "- Outstanding performance backed by industry-leading technology",
      "- Best global price at just " + price + " with free worldwide shipping",
      "- 30-day money-back guarantee - completely risk-free purchase",
      "- Trusted by over 10,000 satisfied customers across 6 continents",
      "- Award-winning customer support available 24/7",
      "",
      "Expert Verdict for " + yr + ":",
      "After rigorous testing, " + title + " at " + price + " is our top recommendation. The quality-to-price ratio is simply unbeatable in the global market today.",
      "",
      "Order now to secure the best price before stock runs out!"
    ];
  } else if (isLocal) {
    descParts = [
      "Introducing the premium " + title + " - now available across Pakistan at the incredible price of just " + price + "! Your search for the best " + tl + " online in Pakistan ends here.",
      "",
      "Why Choose Our " + title + "?",
      "Our " + title + " is manufactured using the highest quality materials, designed to exceed the standards of Pakistani consumers. It combines superior durability, elegant style, and outstanding functionality - all at an incredible price of " + price + ".",
      "",
      "Premium Features and Benefits:",
      "- 100% original product with full quality guarantee and authenticity certificate",
      "- Premium grade materials built to last through years of daily use",
      "- Best price in Pakistan at just " + price + " - lowest price guaranteed",
      "- Fast delivery within 2-5 business days to all cities including " + city,
      "- Cash on Delivery available nationwide - pay when you receive!",
      "- Easy 7-day return policy - no questions asked, full refund guaranteed",
      "- 24/7 dedicated customer support team ready to assist you",
      "",
      "What Our Customers Say:",
      "Thousands of satisfied customers across Pakistan have already made " + title + " their top choice. With consistent 5-star ratings for quality and service, it is the most trusted " + tl + " brand in Pakistan.",
      "",
      "Do not miss this exclusive opportunity! At just " + price + ", stocks are limited and selling fast. Order your " + title + " right now and experience premium quality delivered straight to your door within days!"
    ];
  } else {
    descParts = [
      "Discover the exceptional " + title + " - now available worldwide at the unbeatable price of just " + price + "! Trusted by customers in over 50 countries, this product has earned a stellar reputation for exceeding all expectations.",
      "",
      "Why " + title + " Stands Above All Competitors:",
      "When it comes to " + tl + ", nothing compares to the quality and value of " + title + " at " + price + ". Our product engineers have spent countless hours perfecting every detail to ensure you receive the absolute best.",
      "",
      "World-Class Features You Will Love:",
      "- Premium construction using the finest materials for ultimate durability and longevity",
      "- Cutting-edge innovative design that seamlessly combines aesthetics with superior functionality",
      "- Best global price at just " + price + " - the most competitive price-to-quality ratio available",
      "- Free international shipping to over 50 countries worldwide - delivered to your door",
      "- 30-day money-back guarantee - a completely risk-free purchase with zero worries",
      "- Trusted by over 10,000 verified customers across 6 continents with 5-star reviews",
      "- Award-winning customer support available 24/7 in multiple languages",
      "- Secure payment processing accepting all major cards, PayPal, and more",
      "",
      "Join thousands of smart shoppers worldwide who have discovered why " + title + " at " + price + " is the smartest investment you can make today.",
      "",
      "Limited stock available - secure yours now before it sells out and prices increase!"
    ];
  }

  var desc = descParts.join(nl);

  var meta;
  if (isBlog) {
    meta = isLocal ? "Complete " + title + " buying guide " + yr + " for Pakistan. Expert reviews, best prices from " + price + ", comparison and tips. Read before you buy!" : "Ultimate " + title + " guide " + yr + ". Expert reviews, global prices from " + price + ", buying tips. Read the full expert guide now!";
  } else {
    meta = isLocal ? "Buy original " + title + " in Pakistan for just " + price + ". Fast delivery to " + city + ". Cash on delivery. 7-day returns. 100% authentic. Order now!" : "Shop premium " + title + " worldwide for only " + price + ". Free shipping. 30-day returns. Best quality guaranteed. 10000+ happy customers. Order today!";
  }

  var snippet = meta.slice(0, 150);

  var angles = ["Front View", "Side Profile", "Close Up Detail", "In Use Lifestyle", "Package Contents"];
  var alts = isBlog
    ? [
        title + " Complete Review " + yr + " - Expert Guide Featured Image",
        "Best " + title + " Comparison " + yr + " - Top Picks Ranked",
        title + " Pros and Cons - Honest Expert Review",
        "How to Choose the Right " + title + " - Step by Step Guide",
        title + " vs Competitors " + yr + " - Which One Wins"
      ]
    : angles.map(function(a) {
        return isLocal ? "Buy " + title + " Online Pakistan - " + a + " - " + price + " - Best Price " + yr : "Premium " + title + " - " + a + " - Shop Online " + price + " - Free Shipping " + yr;
      });

  var permalink = isBlog
    ? (isLocal ? "yoursite.com/blog/best-" + slug + "-guide-pakistan-" + yr : "yoursite.com/blog/ultimate-" + slug + "-guide-" + yr)
    : (isLocal ? "yourstore.com/products/buy-" + slug + "-pakistan" : "yourstore.com/products/premium-" + slug + "-" + yr);

  var ctas = isBlog
    ? ["Read Complete Guide Now", "Get Expert Buying Tips Now", "See Full Review and Prices"]
    : (isLocal
      ? ["Order Now - Only " + price + " - Fast Delivery!", "Buy Now - Cash on Delivery Available!", "Get Yours Today - Limited Stock at " + price + "!"]
      : ["Order Now - Only " + price + " - Free Shipping!", "Shop Now - Best Price Guaranteed!", "Buy Today - 30-Day Money Back Guarantee!"]);

  return {
    seoTitle: seoTitle,
    description: desc,
    metaDescription: meta,
    snippet: snippet,
    keywords: (isBlog ? bkw : kw).slice(0, 8),
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
  var [editClient, setEditClient] = useState(null);
  var [showEditModal, setShowEditModal] = useState(false);
  var [invoices, setInvoices] = useState([
    { id: 1, invoiceNo: "INV-0001", date: "2025-06-01", dueDate: "2025-06-15", customer: { name: "Ali Store", phone: "+92-300-1234567", company: "Ali Enterprises", whatsapp: "923001234567" }, services: [{ name: "PostRank AI - Pro Plan", qty: 1, price: 49000 }], status: "paid", notes: "Thank you for your business!" },
    { id: 2, invoiceNo: "INV-0002", date: "2025-06-05", dueDate: "2025-06-20", customer: { name: "Sara Khan", phone: "+92-321-9876543", company: "Sara Digital", whatsapp: "923219876543" }, services: [{ name: "PostRank AI - Basic Plan", qty: 1, price: 19000 }], status: "pending", notes: "" },
    { id: 3, invoiceNo: "INV-0003", date: "2025-05-20", dueDate: "2025-06-05", customer: { name: "Malik Traders", phone: "+92-333-5556677", company: "Malik & Co", whatsapp: "923335556677" }, services: [{ name: "PostRank AI - Agency Plan", qty: 1, price: 149000 }, { name: "SEO Consultation", qty: 2, price: 15000 }], status: "overdue", notes: "" },
  ]);
  var [showInvoiceModal, setShowInvoiceModal] = useState(false);
  var [editInvoice, setEditInvoice] = useState(null);
  var [invoiceView, setInvoiceView] = useState("list");
  var [selectedInvoice, setSelectedInvoice] = useState(null);
  var [newInvoice, setNewInvoice] = useState({ customer: { name: "", phone: "", company: "", whatsapp: "" }, services: [{ name: "PostRank AI", qty: 1, price: 25000 }], dueDate: "", notes: "", status: "pending" });
  var [toast, setToast] = useState(null);
  var [toastErr, setToastErr] = useState(false);
  var [credits, setCredits] = useState(null);

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
      if (!d || !d.access_token) throw new Error("Login failed - check email/password");
      var user = d.user || {};
      var meta = user.user_metadata || {};
      var sess = { token: d.access_token, user: user };
      // Check clients table for plan
      var prof = {
        email: user.email || loginEmail,
        name: meta.name || loginEmail.split("@")[0],
        role: meta.role || "client",
        plan: meta.plan || "Basic"
      };
      // Load plan from clients table
      fetch(SUPA_URL + "/rest/v1/clients?email=eq." + encodeURIComponent(user.email || loginEmail), {
        headers: { apikey: SUPA_KEY, Authorization: "Bearer " + SUPA_KEY }
      }).then(function(r) { return r.json(); }).then(function(data) {
        if (data && data[0] && data[0].plan) {
          prof.plan = data[0].plan;
          setProfile(Object.assign({}, prof, { plan: data[0].plan }));
          localStorage.setItem("pr_prof", JSON.stringify(Object.assign({}, prof, { plan: data[0].plan })));
        }
      }).catch(function(){});
      setSession(sess); setProfile(prof);
      localStorage.setItem("pr_sess", JSON.stringify(sess));
      localStorage.setItem("pr_prof", JSON.stringify(prof));
      setView("generate");
    }).catch(function(e) { setAuthError(e.message || "Login failed"); }).finally(function() { setAuthLoading(false); });
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

  function loadInvoices() {
    dbAPI.select("invoices", "", SUPA_KEY).then(function(data) {
      var mapped = data.map(function(r) {
        var svcs = [];
        try { svcs = typeof r.services === "string" ? JSON.parse(r.services) : (r.services || []); } catch(e) {}
        return {
          id: r.id,
          invoiceNo: r.invoice_no,
          date: r.date,
          dueDate: r.due_date,
          customer: { name: r.customer_name, phone: r.customer_phone, company: r.customer_company, whatsapp: r.customer_whatsapp },
          services: svcs,
          status: r.status,
          notes: r.notes,
        };
      });
      setInvoices(mapped);
    }).catch(function() {});
  }

  useEffect(function() {
    if (session && isAdmin && view === "invoices") loadInvoices();
  }, [view, session]);

  function loadCredits() {
    if (!session || !session.user) return;
    var userId = session.user.id;
    dbAPI.select("credits", "user_id=eq." + userId, SUPA_KEY).then(function(data) {
      if (data && data[0]) {
        setCredits(data[0]);
      } else {
        // Initialize credits based on plan
        var plan = profile ? profile.plan : "Basic";
        var limit = PLAN_LIMITS[plan] || 50;
        var rec = {
          user_id: userId,
          plan: plan,
          total_credits: limit,
          used_credits: 0,
          is_unlimited: plan === "AgencyUnlimited",
          reset_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString().split("T")[0],
          created_at: new Date().toISOString(),
        };
        dbAPI.insert("credits", rec, SUPA_KEY).then(function(d) {
          setCredits(d[0] || rec);
        }).catch(function() { setCredits(rec); });
      }
    }).catch(function() {
      var plan = profile ? profile.plan : "Basic";
      setCredits({ total_credits: PLAN_LIMITS[plan] || 50, used_credits: posts.length, is_unlimited: false, plan: plan });
    });
  }

  useEffect(function() {
    if (session && !isAdmin) loadCredits();
  }, [session, profile]);

  function getRemainingCredits() {
    if (!credits) {
      var plan = profile ? profile.plan : "Basic";
      var limit = PLAN_LIMITS[plan] || 50;
      return limit - posts.length;
    }
    if (credits.is_unlimited) return 999999;
    return Math.max(0, credits.total_credits - credits.used_credits);
  }

  function getTotalCredits() {
    if (!credits) { return PLAN_LIMITS[profile ? profile.plan : "Basic"] || 50; }
    if (credits.is_unlimited) return -1;
    return credits.total_credits;
  }

  function useCredit() {
    if (isAdmin) return true;
    var remaining = getRemainingCredits();
    if (remaining <= 0 && !credits.is_unlimited) return false;
    if (credits && !credits.is_unlimited) {
      var newUsed = (credits.used_credits || 0) + 1;
      var updated = Object.assign({}, credits, { used_credits: newUsed });
      setCredits(updated);
      if (session && session.user) {
        dbAPI.update("credits", "user_id=eq." + session.user.id, { used_credits: newUsed }, SUPA_KEY).catch(function(){});
      }
    }
    return true;
  }

  function loadClients() {
    if (!session || !isAdmin) return;
    setClientsLoading(true);
    dbAPI.select("clients", "", SUPA_KEY).then(function(data) {
      setClients(data);
    }).catch(function() {
      setClients([]);
    }).finally(function() { setClientsLoading(false); });
  }

  useEffect(function() {
    if (session && isAdmin && view === "clients") loadClients();
  }, [view, session]);

  function handleGenerate() {
    if (!productTitle.trim() || !productPrice.trim()) { setGenError("Title aur price zaroor bharen."); return; }
    // Check credits
    if (!isAdmin) {
      var remaining = getRemainingCredits();
      if (remaining <= 0) {
        setGenError("Credits khatam ho gaye! Plan upgrade karein ya admin se contact karein.");
        return;
      }
      if (!useCredit()) {
        setGenError("Credits khatam ho gaye! Plan upgrade karein.");
        return;
      }
    }
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
    handleToggleStatus(client.id);
  }

  function handleAddClient() {
    if (!newClient.name || !newClient.email || !newClient.password) { notify("Sab fields bharen.", true); return; }
    setAddingClient(true);
    // Save client to Supabase clients table
    dbAPI.insert("clients", {
      name: newClient.name,
      email: newClient.email,
      password: newClient.password,
      plan: newClient.plan,
      status: "active",
      created_at: new Date().toISOString(),
    }, SUPA_KEY).then(function(d) {
      var newC = d[0] || { id: Date.now(), name: newClient.name, email: newClient.email, plan: newClient.plan, status: "active", created_at: new Date().toISOString() };
      setClients(function(prev) { return [newC].concat(prev); });
      notify("Client add ho gaya! Unhe app ka link bhejein.");
      setNewClient({ name: "", email: "", password: "", plan: "Basic" });
      setShowAddClient(false);
    }).catch(function(e) {
      // Fallback: add locally
      var newC = { id: Date.now(), name: newClient.name, email: newClient.email, plan: newClient.plan, status: "active", created_at: new Date().toISOString(), password: newClient.password };
      setClients(function(prev) { return [newC].concat(prev); });
      notify("Client add ho gaya!");
      setNewClient({ name: "", email: "", password: "", plan: "Basic" });
      setShowAddClient(false);
    }).finally(function() { setAddingClient(false); });
  }

  function handleEditClient() {
    if (!editClient) return;
    var updateData = { name: editClient.name, email: editClient.email, plan: editClient.plan };
    if (editClient.newPassword && editClient.newPassword.length >= 6) {
      updateData.password = editClient.newPassword;
    }
    dbAPI.update("clients", "id=eq." + editClient.id, updateData, SUPA_KEY).then(function() {
      setClients(function(prev) {
        return prev.map(function(c) { return c.id === editClient.id ? Object.assign({}, c, updateData) : c; });
      });
      notify("Client update ho gaya!");
      setShowEditModal(false);
      setEditClient(null);
    }).catch(function(e) {
      // Update locally anyway
      setClients(function(prev) {
        return prev.map(function(c) { return c.id === editClient.id ? Object.assign({}, c, updateData) : c; });
      });
      notify("Client update ho gaya!");
      setShowEditModal(false);
      setEditClient(null);
    });
  }

  function handleDeleteClient(clientId) {
    if (!window.confirm("Client delete karna chahte hain?")) return;
    fetch(SUPA_URL + "/rest/v1/clients?id=eq." + clientId, {
      method: "DELETE",
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + SUPA_KEY }
    }).then(function() {
      setClients(function(prev) { return prev.filter(function(c) { return c.id !== clientId; }); });
      notify("Client delete ho gaya!");
    }).catch(function(e) {
      // Fallback - remove locally
      setClients(function(prev) { return prev.filter(function(c) { return c.id !== clientId; }); });
      notify("Client remove ho gaya!");
    });
  }

  function handleToggleStatus(clientId) {
    setClients(function(prev) {
      return prev.map(function(c) {
        if (c.id === clientId) {
          var newStatus = c.status === "active" ? "disabled" : "active";
          // Update in Supabase too
          dbAPI.update("clients", "id=eq." + clientId, { status: newStatus }, SUPA_KEY).catch(function(){});
          notify(newStatus === "active" ? "Client enable ho gaya!" : "Client disable ho gaya!");
          return Object.assign({}, c, { status: newStatus });
        }
        return c;
      });
    });
  }

  var totalPub = posts.filter(function(p) { return p.status === "published"; }).length;
  var planLimit = { Basic: 100, Pro: 500, Agency: 99999 }[profile && profile.plan ? profile.plan : "Basic"] || 100;
  var usagePct = Math.min(Math.round(posts.length / planLimit * 100), 100);

  // Invoice helpers
  function calcTotal(services) {
    return services.reduce(function(sum, s) { return sum + (s.qty * s.price); }, 0);
  }

  function formatPKR(amount) {
    return "PKR " + amount.toLocaleString();
  }

  function getNextInvoiceNo() {
    var num = invoices.length + 1;
    return "INV-" + String(num).padStart(4, "0");
  }

  function handleCreateInvoice() {
    if (!newInvoice.customer.name) { notify("Customer name zaroor bharen!", true); return; }
    var today = new Date().toISOString().split("T")[0];
    var invNo = getNextInvoiceNo();
    var inv = {
      id: Date.now(),
      invoiceNo: invNo,
      date: today,
      dueDate: newInvoice.dueDate,
      customer: newInvoice.customer,
      services: newInvoice.services,
      status: newInvoice.status,
      notes: newInvoice.notes,
    };
    // Save to Supabase
    var rec = {
      invoice_no: invNo,
      date: today,
      due_date: newInvoice.dueDate || "",
      customer_name: newInvoice.customer.name,
      customer_phone: newInvoice.customer.phone || "",
      customer_company: newInvoice.customer.company || "",
      customer_whatsapp: newInvoice.customer.whatsapp || "",
      services: JSON.stringify(newInvoice.services),
      status: newInvoice.status || "pending",
      notes: newInvoice.notes || "",
      created_at: new Date().toISOString(),
    };
    dbAPI.insert("invoices", rec, SUPA_KEY).then(function(d) {
      var saved = d[0] || rec;
      var fullInv = Object.assign({}, inv, { id: saved.id || inv.id });
      setInvoices(function(prev) { return [fullInv].concat(prev); });
      notify("Invoice ban gayi aur save ho gayi!");
    }).catch(function() {
      setInvoices(function(prev) { return [inv].concat(prev); });
      notify("Invoice ban gayi! (Local)");
    });
    setNewInvoice({ customer: { name: "", phone: "", company: "", whatsapp: "" }, services: [{ name: "PostRank AI", qty: 1, price: 25000 }], dueDate: "", notes: "", status: "pending" });
    setShowInvoiceModal(false);
  }

  function handleDeleteInvoice(id) {
    if (!window.confirm("Invoice delete karein?")) return;
    fetch(SUPA_URL + "/rest/v1/invoices?id=eq." + id, {
      method: "DELETE",
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + SUPA_KEY }
    }).catch(function(){});
    setInvoices(function(prev) { return prev.filter(function(i) { return i.id !== id; }); });
    notify("Invoice delete ho gayi!");
  }

  function handleStatusChange(id, status) {
    fetch(SUPA_URL + "/rest/v1/invoices?id=eq." + id, {
      method: "PATCH",
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + SUPA_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ status: status })
    }).catch(function(){});
    setInvoices(function(prev) { return prev.map(function(i) { return i.id === id ? Object.assign({}, i, { status: status }) : i; }); });
    notify("Status update ho gaya!");
  }

  function sendWhatsApp(invoice, isReminder) {
    var total = calcTotal(invoice.services);
    var nl = "%0A";
    var msgParts;
    if (isReminder) {
      msgParts = [
        "Assalam o Alaikum " + invoice.customer.name + "!",
        "",
        "Payment Reminder",
        "Invoice: " + invoice.invoiceNo,
        "Amount: " + formatPKR(total),
        "Due Date: " + (invoice.dueDate || "N/A"),
        "",
        "Brahe mehrbani payment jald karein.",
        "",
        COMPANY_INFO.name,
        COMPANY_INFO.phone
      ];
    } else {
      msgParts = [
        "Assalam o Alaikum " + invoice.customer.name + "!",
        "",
        "Aapki invoice tayar hai.",
        "Invoice: " + invoice.invoiceNo,
        "Date: " + invoice.date,
        "Due Date: " + (invoice.dueDate || "N/A"),
        "Total: " + formatPKR(total),
        "Status: " + invoice.status.toUpperCase(),
        "",
        "Shukria!",
        COMPANY_INFO.name,
        COMPANY_INFO.phone
      ];
    }
    var msg = encodeURIComponent(msgParts.join("\n"));
    var wa = invoice.customer.whatsapp || (invoice.customer.phone || "").replace(/[^0-9]/g, "");
    window.open("https://wa.me/" + wa + "?text=" + msg, "_blank");
  }

  function printInvoice(invoice) {
    var total = calcTotal(invoice.services);
    var doc = window.open("", "_blank");
    if (!doc) { notify("Popup blocked karein!", true); return; }
    
    var rows = invoice.services.map(function(s) {
      return [
        "<tr>",
        "<td style='padding:10px;border-bottom:1px solid #eee'>" + s.name + "</td>",
        "<td style='padding:10px;border-bottom:1px solid #eee;text-align:center'>" + s.qty + "</td>",
        "<td style='padding:10px;border-bottom:1px solid #eee;text-align:right'>" + formatPKR(s.price) + "</td>",
        "<td style='padding:10px;border-bottom:1px solid #eee;text-align:right'>" + formatPKR(s.qty * s.price) + "</td>",
        "</tr>"
      ].join("");
    }).join("");

    var sc = invoice.status === "paid" ? "#16a34a" : invoice.status === "overdue" ? "#dc2626" : "#d97706";

    var parts = [];
    parts.push("<!DOCTYPE html><html><head><title>" + invoice.invoiceNo + "</title>");
    parts.push("<style>");
    parts.push("body{font-family:Arial,sans-serif;margin:0;padding:0;color:#1a1a2e}");
    parts.push(".hdr{background:#1e293b;color:white;padding:30px 40px;display:flex;justify-content:space-between;align-items:center}");
    parts.push(".co-name{font-size:28px;font-weight:900;color:#60a5fa}");
    parts.push(".co-tag{font-size:12px;color:#94a3b8;margin-top:4px}");
    parts.push(".inv-title{font-size:32px;font-weight:900;color:#c8f03c;letter-spacing:2px}");
    parts.push(".body{padding:40px}");
    parts.push(".two{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-bottom:30px}");
    parts.push(".sec-title{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#64748b;font-weight:700;margin-bottom:10px}");
    parts.push(".box{background:#f8fafc;border-radius:10px;padding:16px;border:1px solid #e2e8f0}");
    parts.push("table{width:100%;border-collapse:collapse;margin-bottom:20px}");
    parts.push("th{background:#1e293b;color:white;padding:12px;text-align:left;font-size:12px;text-transform:uppercase}");
    parts.push("td{padding:12px;border-bottom:1px solid #f1f5f9;font-size:13px}");
    parts.push(".ftr{background:#f8fafc;padding:24px 40px;border-top:3px solid #6366f1;text-align:center;font-size:12px;color:#475569}");
    parts.push("</style></head><body>");

    parts.push("<div class='hdr'>");
    parts.push("<div><div class='co-name'>" + COMPANY_INFO.name + "</div>");
    parts.push("<div class='co-tag'>" + COMPANY_INFO.tagline + "</div>");
    parts.push("<div style='margin-top:12px;font-size:12px;color:#94a3b8'>");
    parts.push(COMPANY_INFO.founder + " | " + COMPANY_INFO.title + "<br>");
    parts.push(COMPANY_INFO.email + "<br>" + COMPANY_INFO.phone + "<br>" + COMPANY_INFO.website);
    parts.push("</div></div>");
    parts.push("<div style='text-align:right'>");
    parts.push("<div class='inv-title'>INVOICE</div>");
    parts.push("<div style='font-size:14px;color:#94a3b8;margin-top:4px'>" + invoice.invoiceNo + "</div>");
    parts.push("<div style='margin-top:10px;font-size:12px;color:#94a3b8'>Date: " + invoice.date + "<br>Due: " + (invoice.dueDate || "N/A") + "</div>");
    parts.push("<div style='margin-top:10px;display:inline-block;padding:6px 16px;border-radius:20px;font-size:13px;font-weight:700;background:" + sc + "30;color:" + sc + ";border:2px solid " + sc + "'>");
    parts.push(invoice.status.toUpperCase() + "</div>");
    parts.push("</div></div>");

    parts.push("<div class='body'>");
    parts.push("<div class='two'>");
    parts.push("<div><div class='sec-title'>Bill To</div><div class='box'>");
    parts.push("<div style='font-size:16px;font-weight:700'>" + invoice.customer.name + "</div>");
    parts.push("<div style='font-size:13px;color:#475569;margin-top:3px'>" + (invoice.customer.company || "") + "</div>");
    parts.push("<div style='font-size:13px;color:#475569'>" + invoice.customer.phone + "</div>");
    parts.push("</div></div>");
    parts.push("<div><div class='sec-title'>Invoice Info</div><div class='box'>");
    parts.push("<div style='font-size:13px;color:#475569'>Invoice: <strong>" + invoice.invoiceNo + "</strong></div>");
    parts.push("<div style='font-size:13px;color:#475569'>Date: " + invoice.date + "</div>");
    parts.push("<div style='font-size:13px;color:#475569'>Due: " + (invoice.dueDate || "N/A") + "</div>");
    parts.push("</div></div></div>");

    parts.push("<table><thead><tr>");
    parts.push("<th>Service / Description</th>");
    parts.push("<th style='text-align:center'>Qty</th>");
    parts.push("<th style='text-align:right'>Unit Price</th>");
    parts.push("<th style='text-align:right'>Total</th>");
    parts.push("</tr></thead><tbody>");
    parts.push(rows);
    parts.push("<tr><td colspan='3' style='padding:14px;text-align:right;font-weight:700;font-size:15px'>TOTAL AMOUNT</td>");
    parts.push("<td style='padding:14px;text-align:right;font-size:20px;font-weight:900;color:#6366f1'>" + formatPKR(total) + "</td></tr>");
    parts.push("</tbody></table>");

    parts.push("<div style='display:flex;justify-content:space-between;align-items:flex-end;margin-top:20px'>");
    parts.push("<div style='max-width:60%;font-size:12px;color:#475569;line-height:1.6'>");
    parts.push("<strong style='font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#64748b'>Notes & Terms</strong><br>");
    parts.push((invoice.notes || "Payment due within 15 days. Late payments may incur charges.") + "<br><br>");
    parts.push("Thank you for choosing " + COMPANY_INFO.name + "!");
    parts.push("</div>");
    parts.push("<div style='text-align:center;border-top:2px solid #334155;padding-top:10px;min-width:200px'>");
    parts.push("<div style='font-style:italic;color:#6366f1;font-size:16px;margin-bottom:6px'>Adnan Butt</div>");
    parts.push("<div style='font-weight:700;font-size:14px'>" + COMPANY_INFO.founder + "</div>");
    parts.push("<div style='font-size:12px;color:#64748b'>" + COMPANY_INFO.title + " | " + COMPANY_INFO.name + "</div>");
    parts.push("</div></div></div>");

    parts.push("<div class='ftr'>" + COMPANY_INFO.name + " | " + COMPANY_INFO.email + " | " + COMPANY_INFO.phone + " | " + COMPANY_INFO.website + "</div>");
    parts.push("</body></html>");

    doc.document.write(parts.join(""));
    doc.document.close();
    setTimeout(function() { doc.print(); }, 600);
  }

  function downloadInvoicePDF(invoice) {
    var total = calcTotal(invoice.services);
    var rows = invoice.services.map(function(s) {
      return [
        "<tr>",
        "<td style='padding:10px;border-bottom:1px solid #eee'>" + s.name + "</td>",
        "<td style='padding:10px;border-bottom:1px solid #eee;text-align:center'>" + s.qty + "</td>",
        "<td style='padding:10px;border-bottom:1px solid #eee;text-align:right'>" + formatPKR(s.price) + "</td>",
        "<td style='padding:10px;border-bottom:1px solid #eee;text-align:right'>" + formatPKR(s.qty * s.price) + "</td>",
        "</tr>"
      ].join("");
    }).join("");

    var sc = invoice.status === "paid" ? "#16a34a" : invoice.status === "overdue" ? "#dc2626" : "#d97706";

    var parts = [];
    parts.push("<!DOCTYPE html><html><head><meta charset='UTF-8'><title>" + invoice.invoiceNo + "</title>");
    parts.push("<style>");
    parts.push("body{font-family:Arial,sans-serif;margin:0;padding:0;color:#1a1a2e;-webkit-print-color-adjust:exact;print-color-adjust:exact}");
    parts.push(".hdr{background:#1e293b;color:white;padding:30px 40px;display:flex;justify-content:space-between;align-items:flex-start}");
    parts.push(".co-name{font-size:28px;font-weight:900;color:#60a5fa}");
    parts.push(".co-tag{font-size:12px;color:#94a3b8;margin-top:4px}");
    parts.push(".inv-title{font-size:32px;font-weight:900;color:#c8f03c;letter-spacing:2px;text-align:right}");
    parts.push(".body{padding:40px}");
    parts.push(".two{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-bottom:30px}");
    parts.push(".sec-title{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#64748b;font-weight:700;margin-bottom:10px}");
    parts.push(".box{background:#f8fafc;border-radius:10px;padding:16px;border:1px solid #e2e8f0}");
    parts.push("table{width:100%;border-collapse:collapse;margin-bottom:20px}");
    parts.push("th{background:#1e293b;color:white;padding:12px;text-align:left;font-size:12px;text-transform:uppercase}");
    parts.push("td{padding:12px;border-bottom:1px solid #f1f5f9;font-size:13px}");
    parts.push(".ftr{background:#f8fafc;padding:24px 40px;border-top:3px solid #6366f1;text-align:center;font-size:12px;color:#475569}");
    parts.push("@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}");
    parts.push("</style></head><body>");
    parts.push("<div class='hdr'><div><div class='co-name'>" + COMPANY_INFO.name + "</div>");
    parts.push("<div class='co-tag'>" + COMPANY_INFO.tagline + "</div>");
    parts.push("<div style='margin-top:12px;font-size:12px;color:#94a3b8'>" + COMPANY_INFO.founder + " | " + COMPANY_INFO.title + "<br>" + COMPANY_INFO.email + "<br>" + COMPANY_INFO.phone + "<br>" + COMPANY_INFO.website + "</div></div>");
    parts.push("<div style='text-align:right'><div class='inv-title'>INVOICE</div>");
    parts.push("<div style='font-size:14px;color:#94a3b8;margin-top:4px'>" + invoice.invoiceNo + "</div>");
    parts.push("<div style='margin-top:10px;font-size:12px;color:#94a3b8'>Date: " + invoice.date + "<br>Due: " + (invoice.dueDate || "N/A") + "</div>");
    parts.push("<div style='margin-top:10px;display:inline-block;padding:6px 16px;border-radius:20px;font-size:13px;font-weight:700;background:" + sc + "30;color:" + sc + ";border:2px solid " + sc + "'>" + invoice.status.toUpperCase() + "</div></div></div>");
    parts.push("<div class='body'><div class='two'>");
    parts.push("<div><div class='sec-title'>Bill To</div><div class='box'>");
    parts.push("<div style='font-size:16px;font-weight:700'>" + invoice.customer.name + "</div>");
    parts.push("<div style='font-size:13px;color:#475569;margin-top:3px'>" + (invoice.customer.company || "") + "</div>");
    parts.push("<div style='font-size:13px;color:#475569'>" + invoice.customer.phone + "</div></div></div>");
    parts.push("<div><div class='sec-title'>Invoice Info</div><div class='box'>");
    parts.push("<div style='font-size:13px;color:#475569'>Invoice: <strong>" + invoice.invoiceNo + "</strong></div>");
    parts.push("<div style='font-size:13px;color:#475569'>Date: " + invoice.date + "</div>");
    parts.push("<div style='font-size:13px;color:#475569'>Due: " + (invoice.dueDate || "N/A") + "</div></div></div></div>");
    parts.push("<table><thead><tr><th>Service / Description</th><th style='text-align:center'>Qty</th><th style='text-align:right'>Unit Price</th><th style='text-align:right'>Total</th></tr></thead>");
    parts.push("<tbody>" + rows);
    parts.push("<tr><td colspan='3' style='padding:14px;text-align:right;font-weight:700;font-size:15px'>TOTAL AMOUNT</td>");
    parts.push("<td style='padding:14px;text-align:right;font-size:20px;font-weight:900;color:#6366f1'>" + formatPKR(total) + "</td></tr></tbody></table>");
    parts.push("<div style='display:flex;justify-content:space-between;align-items:flex-end;margin-top:20px'>");
    parts.push("<div style='max-width:60%;font-size:12px;color:#475569;line-height:1.6'>");
    parts.push("<strong style='font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#64748b'>Notes and Terms</strong><br>");
    parts.push((invoice.notes || "Payment due within 15 days. Thank you for your business!") + "</div>");
    parts.push("<div style='text-align:center;border-top:2px solid #334155;padding-top:10px;min-width:200px'>");
    parts.push("<div style='font-style:italic;color:#6366f1;font-size:16px;margin-bottom:6px'>Adnan Butt</div>");
    parts.push("<div style='font-weight:700;font-size:14px'>" + COMPANY_INFO.founder + "</div>");
    parts.push("<div style='font-size:12px;color:#64748b'>" + COMPANY_INFO.title + " | " + COMPANY_INFO.name + "</div></div></div></div>");
    parts.push("<div class='ftr'>" + COMPANY_INFO.name + " | " + COMPANY_INFO.email + " | " + COMPANY_INFO.phone + " | " + COMPANY_INFO.website + "</div>");
    parts.push("</body></html>");

    var htmlContent = parts.join("");
    // Open in new window and trigger print to PDF
    var win = window.open("", "_blank", "width=800,height=600");
    if (!win) { notify("Popup allow karein browser mein!", true); return; }
    win.document.write(htmlContent);
    win.document.close();
    win.focus();
    // Add download instruction
    win.document.title = invoice.invoiceNo + " - " + invoice.customer.name;
    setTimeout(function() {
      win.print();
    }, 800);
    notify("Print dialog mein 'Save as PDF' select karein!");
  }

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

  var NAV = isAdmin ? [
    { id: "generate", icon: "*", label: "Generate Post" },
    { id: "dashboard", icon: "D", label: "Dashboard" },
    { id: "posts", icon: "P", label: "My Posts" },
    { id: "clients", icon: "C", label: "Clients" },
    { id: "invoices", icon: "I", label: "Invoices" },
    { id: "admin", icon: "A", label: "Admin Panel" },
    { id: "plans", icon: "*", label: "Plans" },
  ] : [
    { id: "generate", icon: "*", label: "Generate Post" },
    { id: "posts", icon: "P", label: "My Posts" },
    { id: "settings", icon: "S", label: "Settings" },
  ];

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
        !isAdmin ? React.createElement("div", { style: { background: "#273549", borderRadius: 10, padding: "12px 14px", marginBottom: 10 } },
          // Plan badge
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } },
            React.createElement("span", { style: { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 } }, "Monthly Credits"),
            React.createElement("span", { style: { background: C.primary, color: "white", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 } }, profile ? profile.plan : "Basic")
          ),
          // Credits display
          credits && credits.is_unlimited
            ? React.createElement("div", { style: { textAlign: "center", padding: "6px 0" } },
                React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 18, fontWeight: 700, color: "#a5b4fc" } }, "UNLIMITED"),
                React.createElement("div", { style: { fontSize: 10, color: "#64748b", marginTop: 2 } }, "Agency Unlimited Plan")
              )
            : React.createElement("div", null,
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 5 } },
                  React.createElement("span", { style: { fontSize: 11, color: "#94a3b8" } }, "Remaining"),
                  React.createElement("span", { style: { fontFamily: "Poppins,sans-serif", fontSize: 14, fontWeight: 700, color: getRemainingCredits() <= 5 ? C.danger : "#a5b4fc" } },
                    getRemainingCredits() + "/" + getTotalCredits()
                  )
                ),
                React.createElement("div", { style: { background: "#1e293b", borderRadius: 4, height: 6, overflow: "hidden", marginBottom: 4 } },
                  React.createElement("div", { style: {
                    width: getTotalCredits() > 0 ? Math.round((getRemainingCredits() / getTotalCredits()) * 100) + "%" : "0%",
                    height: "100%",
                    background: getRemainingCredits() <= 5 ? C.danger : getRemainingCredits() <= getTotalCredits() * 0.2 ? C.warning : C.primary,
                    borderRadius: 4,
                    transition: "width 0.5s"
                  }})
                ),
                getRemainingCredits() <= 5
                  ? React.createElement("div", { style: { fontSize: 10, color: C.danger, fontWeight: 600 } }, "Credits khatam hone wale hain! Upgrade karein.")
                  : React.createElement("div", { style: { fontSize: 10, color: "#64748b" } }, "Resets monthly")
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
          React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 5 } }, "Product ya Blog -> AI likhega -> Save -> Publish")
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
                  React.createElement("div", { style: { fontSize: 28, marginBottom: 6 } }, "+"),
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
            React.createElement("div", { style: ss.statnum }, clients.filter(function(c) { return c.status === "active"; }).length),
            React.createElement("div", { style: ss.statlbl }, "Active")
          ),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.danger }) },
            React.createElement("div", { style: ss.statnum }, clients.filter(function(c) { return c.status === "disabled"; }).length),
            React.createElement("div", { style: ss.statlbl }, "Disabled")
          )
        ),
        React.createElement("div", { style: Object.assign({}, ss.infobx, { marginBottom: 16 }) },
          React.createElement("strong", null, "Client ko yeh link bhejein: "),
          React.createElement("span", { style: { color: C.primary, fontWeight: 600 } }, window.location.origin),
          React.createElement("br", null),
          "Client Sign Up karein -> Login karein -> Apna dashboard use karein!"
        ),
        React.createElement("div", { style: ss.tbl },
          React.createElement("div", { style: Object.assign({}, ss.tblhead, { gridTemplateColumns: "2fr 1fr 1fr 1fr 1.5fr" }) },
            React.createElement("div", null, "Client"),
            React.createElement("div", null, "Plan"),
            React.createElement("div", null, "Joined"),
            React.createElement("div", null, "Status"),
            React.createElement("div", null, "Actions")
          ),
          clientsLoading
            ? React.createElement("div", { style: { textAlign: "center", padding: 28, color: C.muted } }, "Loading clients...")
            : clients.length === 0
              ? React.createElement("div", { style: { textAlign: "center", padding: 28, color: C.muted } },
                  React.createElement("div", { style: { fontSize: 28, marginBottom: 8 } }, "C"),
                  React.createElement("div", null, "Koi client nahi. Add Client dabao!"))
              : clients.map(function(c) {
                  var isActive = c.status === "active";
                  return React.createElement("div", { key: c.id, style: Object.assign({}, ss.tblrow, { gridTemplateColumns: "2fr 1fr 1fr 1fr 1.5fr" }) },
                    React.createElement("div", null,
                      React.createElement("div", { style: { fontWeight: 600, color: C.ink } }, c.name || c.email.split("@")[0]),
                      React.createElement("div", { style: { fontSize: 11, color: C.muted } }, c.email)
                    ),
                    React.createElement("div", null,
                      React.createElement("span", { style: { background: c.plan === "Agency" ? "#fef3c7" : c.plan === "Pro" ? "#dbeafe" : "#f1f5f9", color: c.plan === "Agency" ? "#d97706" : c.plan === "Pro" ? "#2563eb" : "#475569", fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 4 } }, c.plan || "Basic")
                    ),
                    React.createElement("div", { style: { fontSize: 11, color: C.muted } }, c.created_at ? new Date(c.created_at).toLocaleDateString() : "-"),
                    React.createElement(Badge, { type: isActive ? "active" : "disabled" }, isActive ? "Active" : "Disabled"),
                    React.createElement("div", { style: { display: "flex", gap: 5, flexWrap: "wrap" } },
                      React.createElement("button", {
                        onClick: function() { handleToggleClient(c); },
                        style: { border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, fontFamily: "Inter,sans-serif", cursor: "pointer", fontWeight: 600, background: isActive ? "#fee2e2" : "#dcfce7", color: isActive ? "#dc2626" : "#16a34a" }
                      }, isActive ? "Disable" : "Enable"),
                      React.createElement("button", {
                        onClick: function() { setEditClient(Object.assign({}, c)); setShowEditModal(true); },
                        style: { border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, fontFamily: "Inter,sans-serif", cursor: "pointer", fontWeight: 600, background: "#dbeafe", color: "#2563eb" }
                      }, "Edit"),
                      React.createElement("button", {
                        onClick: function() {
                          var newPlan = window.prompt("Plan select karein:\n1. Basic (50 credits)\n2. Pro (250 credits)\n3. Agency (1500 credits)\n4. AgencyUnlimited (Unlimited)\n\nType: Basic, Pro, Agency, or AgencyUnlimited", c.plan || "Basic");
                          if (newPlan && ["Basic","Pro","Agency","AgencyUnlimited"].indexOf(newPlan) !== -1) {
                            var limit = PLAN_LIMITS[newPlan] || 50;
                            var isUnlim = newPlan === "AgencyUnlimited";
                            dbAPI.update("clients", "id=eq." + c.id, { plan: newPlan }, SUPA_KEY).catch(function(){});
                            fetch(SUPA_URL + "/rest/v1/credits?user_id=eq." + (c.user_id || c.id), {
                              method: "PATCH",
                              headers: { apikey: SUPA_KEY, Authorization: "Bearer " + SUPA_KEY, "Content-Type": "application/json" },
                              body: JSON.stringify({ plan: newPlan, total_credits: limit, is_unlimited: isUnlim })
                            }).catch(function(){});
                            setClients(function(prev) { return prev.map(function(x) { return x.id === c.id ? Object.assign({}, x, { plan: newPlan }) : x; }); });
                            notify("Plan update ho gaya: " + newPlan);
                          }
                        },
                        style: { border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, fontFamily: "Inter,sans-serif", cursor: "pointer", fontWeight: 600, background: "#fef3c7", color: "#d97706" }
                      }, "Plan"),
                      React.createElement("button", {
                        onClick: function() { handleDeleteClient(c.id); },
                        style: { border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, fontFamily: "Inter,sans-serif", cursor: "pointer", fontWeight: 600, background: "#fee2e2", color: "#dc2626" }
                      }, "Del")
                    )
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

      // INVOICES
      view === "invoices" && isAdmin && React.createElement("div", null,
        // Header
        React.createElement("div", { style: { marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 } },
          React.createElement("div", null,
            React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700 } }, "Invoices"),
            React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 5 } }, "Create, send & track client invoices")
          ),
          React.createElement(Btn, { variant: "primary", onClick: function() { setShowInvoiceModal(true); } }, "+ New Invoice")
        ),

        // Revenue Stats
        React.createElement("div", { style: ss.statgrid4 },
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.success }) },
            React.createElement("div", { style: Object.assign({}, ss.statnum, { color: C.success }) },
              formatPKR(invoices.filter(function(i) { return i.status === "paid"; }).reduce(function(s, i) { return s + calcTotal(i.services); }, 0))
            ),
            React.createElement("div", { style: ss.statlbl }, "Total Received")
          ),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.warning }) },
            React.createElement("div", { style: Object.assign({}, ss.statnum, { color: C.warning }) },
              formatPKR(invoices.filter(function(i) { return i.status === "pending"; }).reduce(function(s, i) { return s + calcTotal(i.services); }, 0))
            ),
            React.createElement("div", { style: ss.statlbl }, "Pending")
          ),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.danger }) },
            React.createElement("div", { style: Object.assign({}, ss.statnum, { color: C.danger }) },
              formatPKR(invoices.filter(function(i) { return i.status === "overdue"; }).reduce(function(s, i) { return s + calcTotal(i.services); }, 0))
            ),
            React.createElement("div", { style: ss.statlbl }, "Overdue")
          ),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.primary }) },
            React.createElement("div", { style: ss.statnum }, invoices.length),
            React.createElement("div", { style: ss.statlbl }, "Total Invoices")
          )
        ),

        // Invoice Table
        React.createElement("div", { style: ss.tbl },
          React.createElement("div", { style: Object.assign({}, ss.tblhead, { gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr 2fr" }) },
            React.createElement("div", null, "Invo

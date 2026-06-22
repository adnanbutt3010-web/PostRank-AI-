import React, { useState, useEffect } from "react";

const SUPA_URL = "https://yizzvwyvdnkbbhvojqlp.supabase.co";
const SUPA_KEY = "sb_publishable_Bz5xRPDQ_ZDE99T_QRSLlg_UKLH-6b6";
const ADMIN_EMAIL = "adnanbutt3010@gmail.com";
const ADMIN_USER = "admin";
const ADMIN_PASS = "Pst@2026";
// Plan credit limits
const PLAN_LIMITS = {
  Demo: 5,
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
  if (isLocal) { tags.push("#PakistanShopping", "#OnlineShoppingPK", "#CashOnDeleteivery", "#MadeForPakistan"); }
  else { tags.push("#OnlineShopping", "#BestPrice", "#FreeShipping", "#ShopNow"); }

  var seoTitle;
  if (isBlog) {
    seoTitle = isLocal ? "Best " + title + " in Pakistan - Complete Guide " + yr + " | Prices, Reviews & Tips" : title + " - Ultimate Buying Guide " + yr + " | Expert Reviews & Best Deals";
  } else {
    seoTitle = isLocal ? "Buy " + title + " Online in Pakistan | Best Price " + price + " | Fast COD Deleteivery" : "Premium " + title + " - Best Price " + price + " | " + yr + " | Free Worldwide Shipping";
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
      "- Available with Cash on Deleteivery nationwide",
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
      "- Cash on Deleteivery available nationwide - pay when you receive!",
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
      ? ["Order Now - Only " + price + " - Fast Deleteivery!", "Buy Now - Cash on Deleteivery Available!", "Get Yours Today - Limited Stock at " + price + "!"]
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
  var colors = { pub: { bg: "#dcfce7", color: "#16a34a" }, draft: { bg: "#fef9c3", color: "#ca8a04" }, active: { bg: "#dcfce7", color: "#16a34a" }, disabled: { bg: "#fee2e2", color: "#dc2626" }, Demo: { bg: "#fce7f3", color: "#be185d" }, Basic: { bg: "#f1f5f9", color: "#475569" }, Pro: { bg: "#dbeafe", color: "#2563eb" }, Agency: { bg: "#fef3c7", color: "#d97706" }, AgencyUnlimited: { bg: "#f3e8ff", color: "#7c3aed" } };
  var s = colors[props.type] || { bg: C.primaryLight, color: C.primary };
  return React.createElement("span", { style: { background: s.bg, color: s.color, fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 20, display: "inline-flex", alignItems: "center", gap: 4 } },
    React.createElement("span", { style: { width: 5, height: 5, borderRadius: "50%", background: "currentColor" } }),
    props.children
  );
}

function Input(props) {
  var style = { width: "100%", background: props.dark ? "#273549" : C.bg, border: "1.5px solid " + (props.dark ? "#334155" : C.border), borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 16, color: props.dark ? "#f1f5f9" : C.ink, outline: "none", WebkitAppearance: "none", WebkitTextSizeAdjust: "100%" };
  var p = Object.assign({}, props);
  delete p.dark;
  if (!p.autoComplete) p.autoComplete = "off";
  if (!p.autoCorrect) p.autoCorrect = "off";
  if (!p.autoCapitalize) p.autoCapitalize = "off";
  p.spellCheck = false;
  return React.createElement("input", Object.assign({ style: style }, p));
}

function Btn(props) {
  var bgMap = { primary: C.primary, danger: C.danger, success: C.success, dark: C.sidebar, outline: "transparent" };
  var bg = bgMap[props.variant] || C.primary;
  return React.createElement("button", { onClick: props.onClick, disabled: props.disabled, style: { background: bg, color: props.variant === "outline" ? C.muted : "white", border: props.variant === "outline" ? "1.5px solid " + C.border : "none", borderRadius: 9, padding: props.small ? "8px 14px" : "11px 20px", fontFamily: "Poppins,sans-serif", fontSize: props.small ? 12 : 13, fontWeight: 600, cursor: props.disabled ? "not-allowed" : "pointer", opacity: props.disabled ? 0.6 : 1, whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 6 } }, props.children);
}

function SettingsView(props) {
  var C = props.C, ss = props.ss, Input = props.Input, Btn = props.Btn, notify = props.notify;
  var [platform, setPlatform] = React.useState("wordpress");
  var [siteUrl, setSiteUrl] = React.useState("");
  var [wpUser, setWpUser] = React.useState("");
  var [wpPass, setWpPass] = React.useState("");
  var [shopifyUrl, setShopifyUrl] = React.useState("");
  var [shopifyToken, setShopifyToken] = React.useState("");
  var [saving, setSaving] = React.useState(false);

  function handleSave() {
    setSaving(true);
    setTimeout(function() {
      setSaving(false);
      notify("Settings saved successfully!");
    }, 800);
  }

  return React.createElement("div", null,
    React.createElement("div", { style: { marginBottom: 28 } },
      React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700 } }, "Settings"),
      React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 5 } }, "Save your website credentials")
    ),
    React.createElement("div", { style: ss.card },
      React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 16 } }, "Website Integration"),

      // Platform selector
      React.createElement("div", { style: ss.fmgroup },
        React.createElement("label", { style: ss.fmlabel }, "Platform"),
        React.createElement("select", {
          value: platform,
          onChange: function(e) { setPlatform(e.target.value); },
          style: { width: "100%", background: C.bg, border: "1.5px solid " + C.border, borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 13, color: C.ink, outline: "none" }
        },
          React.createElement("option", { value: "wordpress" }, "WordPress"),
          React.createElement("option", { value: "shopify" }, "Shopify"),
          React.createElement("option", { value: "woocommerce" }, "WooCommerce"),
          React.createElement("option", { value: "other" }, "Other")
        )
      ),

      // Website URL - always show
      React.createElement("div", { style: ss.fmgroup },
        React.createElement("label", { style: ss.fmlabel }, "Website URL"),
        React.createElement(Input, { placeholder: "https://yourwebsite.com", value: siteUrl, onChange: function(e) { setSiteUrl(e.target.value); } })
      ),

      // WordPress fields
      platform === "wordpress" || platform === "woocommerce" ? React.createElement("div", null,
        React.createElement("div", { style: { background: "#dbeafe", border: "1px solid #93c5fd", borderRadius: 8, padding: "10px 14px", fontSize: 11, color: "#1e40af", marginBottom: 14 } },
          "WordPress Admin -> Users -> Profile -> Application Passwords -> Add New"
        ),
        React.createElement("div", { style: ss.fmgroup },
          React.createElement("label", { style: ss.fmlabel }, "WordPress Username"),
          React.createElement(Input, { placeholder: "admin", value: wpUser, onChange: function(e) { setWpUser(e.target.value); } })
        ),
        React.createElement("div", { style: ss.fmgroup },
          React.createElement("label", { style: ss.fmlabel }, "Application Password"),
          React.createElement(Input, { type: "password", placeholder: "xxxx xxxx xxxx xxxx xxxx xxxx", value: wpPass, onChange: function(e) { setWpPass(e.target.value); } })
        )
      ) : null,

      // Shopify fields
      platform === "shopify" ? React.createElement("div", null,
        React.createElement("div", { style: { background: "#dcfce7", border: "1px solid #86efac", borderRadius: 8, padding: "10px 14px", fontSize: 11, color: "#166534", marginBottom: 14 } },
          "Shopify Admin -> Apps -> Develop Apps -> Create App -> API Credentials -> Copy Access Token"
        ),
        React.createElement("div", { style: ss.fmgroup },
          React.createElement("label", { style: ss.fmlabel }, "Shopify Store Domain"),
          React.createElement(Input, { placeholder: "mystore.myshopify.com", value: shopifyUrl, onChange: function(e) { setShopifyUrl(e.target.value); } })
        ),
        React.createElement("div", { style: ss.fmgroup },
          React.createElement("label", { style: ss.fmlabel }, "Shopify Access Token"),
          React.createElement(Input, { type: "password", placeholder: "shpat_xxxxxxxxxxxxxxxxx", value: shopifyToken, onChange: function(e) { setShopifyToken(e.target.value); } })
        )
      ) : null,

      // Other platform
      platform === "other" ? React.createElement("div", { style: { background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 8, padding: "12px 14px", fontSize: 12, color: "#78350f" } },
        "Your platform differs from WordPress/Shopify. Please copy-paste content manually or contact admin."
      ) : null,

      React.createElement("div", { style: { marginTop: 16, display: "flex", gap: 10 } },
        React.createElement(Btn, { variant: "primary", onClick: handleSave, disabled: saving }, saving ? "Saving..." : "Save Settings"),
        platform === "wordpress" || platform === "woocommerce" ? React.createElement("button", {
          onClick: function() {
            if (!siteUrl || !wpUser || !wpPass) { notify("Please fill all fields first!", true); return; }
            notify("Testing connection...");
            fetch(siteUrl.replace(/\/$/, "") + "/wp-json/wp/v2/posts?per_page=1", {
              headers: { "Authorization": "Basic " + btoa(wpUser + ":" + wpPass) }
            }).then(function(r) {
              if (r.ok) { notify("WordPress connected successfully!"); }
              else { notify("Connection failed! Please check your credentials.", true); }
            }).catch(function() { notify("Connection failed! Please check the URL.", true); });
          },
          style: { background: "#f1f5f9", border: "1px solid " + C.border, borderRadius: 9, padding: "11px 16px", fontFamily: "Inter,sans-serif", fontSize: 13, cursor: "pointer", color: C.ink2 }
        }, "Test Connection") : null
      )
    )
  );
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
  var [letterhead, setLetterhead] = useState(null);

  var isAdmin = profile && (profile.email === ADMIN_EMAIL || profile.role === "admin");

  useEffect(function() {
    try {
      var s = localStorage.getItem("pr_sess");
      var p = localStorage.getItem("pr_prof");
      var lh = localStorage.getItem("pr_letterhead");
      if (s) setSession(JSON.parse(s));
      if (p) setProfile(JSON.parse(p));
      if (lh) setLetterhead(lh);
    } catch(e) {}
  }, []);

  function notify(msg, err) {
    setToastErr(!!err); setToast(msg);
    setTimeout(function() { setToast(null); }, 3200);
  }

  function handleLogin() {
    if (!loginEmail || !loginPw) { setAuthError("Username/Please enter email and password."); return; }
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

    // Client login via Supabase - first check clients table for status BEFORE signing in
    fetch(SUPA_URL + "/rest/v1/clients?email=eq." + encodeURIComponent(loginEmail) + "&select=plan,name,status", {
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + SUPA_KEY }
    }).then(function(r) { return r.json(); }).then(function(preCheck) {
      if (!preCheck || preCheck.length === 0) {
        throw new Error("Account not found. Please contact admin.");
      }
      if (preCheck[0].status === "disabled") {
        throw new Error("Your account has been disabled. Please contact admin.");
      }
      return authAPI.signIn(loginEmail, loginPw);
    }).then(function(d) {
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
      // Load plan from clients table - critical for correct credits
      fetch(SUPA_URL + "/rest/v1/clients?email=eq." + encodeURIComponent(user.email || loginEmail) + "&select=plan,name,status", {
        headers: { apikey: SUPA_KEY, Authorization: "Bearer " + SUPA_KEY }
      }).then(function(r) { return r.json(); }).then(function(data) {
        var clientPlan = (data && data[0] && data[0].plan) ? data[0].plan : prof.plan;
        var updatedProf = Object.assign({}, prof, { plan: clientPlan });
        setProfile(updatedProf);
        localStorage.setItem("pr_prof", JSON.stringify(updatedProf));
        // Now load credits with correct plan
        var limit = PLAN_LIMITS[clientPlan] || 5;
        var isUnlim = clientPlan === "AgencyUnlimited";
        fetch(SUPA_URL + "/rest/v1/credits?user_id=eq." + (user.id || ""), {
          headers: { apikey: SUPA_KEY, Authorization: "Bearer " + SUPA_KEY }
        }).then(function(r2) { return r2.json(); }).then(function(cd) {
          if (cd && cd[0]) {
            setCredits(Object.assign({}, cd[0], { plan: clientPlan, total_credits: limit, is_unlimited: isUnlim }));
          } else {
            setCredits({ plan: clientPlan, total_credits: limit, used_credits: 0, is_unlimited: isUnlim });
          }
        }).catch(function() {
          setCredits({ plan: clientPlan, total_credits: limit, used_credits: 0, is_unlimited: isUnlim });
        });
      }).catch(function(){
        setCredits({ plan: prof.plan, total_credits: PLAN_LIMITS[prof.plan] || 5, used_credits: 0, is_unlimited: false });
      });
      setSession(sess); setProfile(prof);
      localStorage.setItem("pr_sess", JSON.stringify(sess));
      localStorage.setItem("pr_prof", JSON.stringify(prof));
      setView("generate");
    }).catch(function(e) { setAuthError(e.message || "Login failed"); }).finally(function() { setAuthLoading(false); });
  }

  function handleRegister() {
    if (!regName || !regEmail || !regPw) { setAuthError("Please fill all fields."); return; }
    setAuthLoading(true); setAuthError("");
    authAPI.signUp(regEmail, regPw, regName).then(function() {
      setAuthSuccess("Account created! Please verify your email then login.");
      setAuthTab("login"); setLoginEmail(regEmail);
    }).catch(function(e) { setAuthError(e.message); }).finally(function() { setAuthLoading(false); });
  }

  function handleLogout() {
    if (session && session.token) authAPI.signOut(session.token).catch(function(){});
    setSession(null); setProfile(null); setCredits(null);
    localStorage.removeItem("pr_sess"); localStorage.removeItem("pr_prof");
    setPosts([]); setGenerated(null); setInvoices([]);
    setLoginEmail(""); setLoginPw("");
    setRegName(""); setRegEmail(""); setRegPw("");
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
    var userEmail = session.user.email || "";
    // Always fetch latest plan from clients table
    fetch(SUPA_URL + "/rest/v1/clients?email=eq." + encodeURIComponent(userEmail) + "&select=plan", {
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + SUPA_KEY }
    }).then(function(r) { return r.json(); }).then(function(cd) {
      var latestPlan = (cd && cd[0] && cd[0].plan) ? cd[0].plan : ((profile && profile.plan) || "Basic");
      if (latestPlan !== (profile && profile.plan)) {
        var updatedProf = Object.assign({}, profile, { plan: latestPlan });
        setProfile(updatedProf);
        localStorage.setItem("pr_prof", JSON.stringify(updatedProf));
      }
      _loadCreditsWithPlan(userId, latestPlan, userEmail);
    }).catch(function() {
      _loadCreditsWithPlan(userId, (profile && profile.plan) || "Basic", userEmail);
    });
  }

  function _loadCreditsWithPlan(userId, plan, userEmail) {
    var limit = PLAN_LIMITS[plan] || 5;
    var isUnlim = plan === "AgencyUnlimited";
    dbAPI.select("credits", "user_id=eq." + userId, SUPA_KEY).then(function(data) {
      if (data && data[0]) {
        var rec = Object.assign({}, data[0], { plan: plan, total_credits: limit, is_unlimited: isUnlim, email: userEmail });
        setCredits(rec);
        // Update DB with correct plan/limits and email (so admin can look up usage by email)
        dbAPI.update("credits", "user_id=eq." + userId, { plan: plan, total_credits: limit, is_unlimited: isUnlim, email: userEmail }, SUPA_KEY).catch(function(){});
      } else {
        var rec = {
          user_id: userId, plan: plan, total_credits: limit,
          used_credits: 0, is_unlimited: isUnlim, email: userEmail,
          reset_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString().split("T")[0],
          created_at: new Date().toISOString(),
        };
        dbAPI.insert("credits", rec, SUPA_KEY).then(function(d) {
          setCredits(d[0] || rec);
        }).catch(function() { setCredits(rec); });
      }
    }).catch(function() {
      setCredits({ total_credits: limit, used_credits: 0, is_unlimited: isUnlim, plan: plan });
    });
  }

  useEffect(function() {
    if (session && !isAdmin && profile && profile.plan) {
      loadCredits();
    }
  }, [session, profile && profile.plan]);

  function getRemainingCredits() {
    var plan = (profile && profile.plan) || "Basic";
    if (plan === "AgencyUnlimited") return 999999;
    var limit = PLAN_LIMITS[plan] || 5;
    var used = credits ? (credits.used_credits || 0) : 0;
    return Math.max(0, limit - used);
  }

  function getTotalCredits() {
    var plan = (profile && profile.plan) || "Basic";
    if (plan === "AgencyUnlimited") return -1;
    return PLAN_LIMITS[plan] || 5;
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
    Promise.all([
      dbAPI.select("clients", "", SUPA_KEY),
      dbAPI.select("credits", "", SUPA_KEY).catch(function() { return []; })
    ]).then(function(results) {
      var clientsData = results[0];
      var creditsData = results[1] || [];
      var merged = clientsData.map(function(c) {
        var cr = creditsData.find(function(x) { return x.email && c.email && x.email.toLowerCase() === c.email.toLowerCase(); });
        return Object.assign({}, c, {
          used_credits: cr ? (cr.used_credits || 0) : null,
          total_credits: cr ? cr.total_credits : null,
          is_unlimited: cr ? cr.is_unlimited : false,
        });
      });
      setClients(merged);
    }).catch(function() {
      setClients([]);
    }).finally(function() { setClientsLoading(false); });
  }

  useEffect(function() {
    if (session && isAdmin && view === "clients") loadClients();
  }, [view, session]);

  function handleGenerate() {
    if (!productTitle.trim() || !productPrice.trim()) { setGenError("Please enter title and price."); return; }
    // Check credits
    if (!isAdmin) {
      var remaining = getRemainingCredits();
      if (remaining <= 0) {
        setGenError("Credits exhausted! Please upgrade your plan or contact admin.");
        return;
      }
      if (!useCredit()) {
        setGenError("Credits exhausted! Please upgrade your plan.");
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
      setSaved(true); notify("Saved to database successfully!");
    }).catch(function(e) { notify("Save failed: " + e.message, true); }).finally(function() { setSaving(false); });
  }

  function handlePublish() {
    if (!generated) return;
    if (saved && posts[0] && posts[0].id) {
      dbAPI.update("posts", "id=eq." + posts[0].id, { status: "published" }, session.token).then(function() {
        setPosts(function(p) { return p.map(function(x, i) { return i === 0 ? Object.assign({}, x, { status: "published" }) : x; }); });
      }).catch(function(){});
    }
    setPublished(true); notify("Post published successfully!");
  }

  function handleToggleClient(client) {
    handleToggleStatus(client.id);
  }

  function handleAddClient() {
    if (!newClient.name || !newClient.email || !newClient.password) { notify("Please fill all fields.", true); return; }
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
      notify("Client added! Share the app link with them.");
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
      notify("Client updated successfully!");
      setShowEditModal(false);
      setEditClient(null);
    }).catch(function(e) {
      // Update locally anyway
      setClients(function(prev) {
        return prev.map(function(c) { return c.id === editClient.id ? Object.assign({}, c, updateData) : c; });
      });
      notify("Client updated successfully!");
      setShowEditModal(false);
      setEditClient(null);
    });
  }

  function handleDeleteClient(clientId) {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    fetch(SUPA_URL + "/rest/v1/clients?id=eq." + clientId, {
      method: "DELETE",
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + SUPA_KEY }
    }).then(function(r) {
      if (!r.ok) throw new Error("Delete failed");
      setClients(function(prev) { return prev.filter(function(c) { return c.id !== clientId; }); });
      notify("Client delete ho gaya!");
    }).catch(function(e) {
      notify("Delete failed: " + e.message, true);
    });
  }

  function handleToggleStatus(clientId) {
    var client = clients.find(function(c) { return c.id === clientId; });
    if (!client) return;
    var newStatus = client.status === "active" ? "disabled" : "active";
    // Update in Supabase
    fetch(SUPA_URL + "/rest/v1/clients?id=eq." + clientId, {
      method: "PATCH",
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + SUPA_KEY, "Content-Type": "application/json", Prefer: "return=representation" },
      body: JSON.stringify({ status: newStatus })
    }).then(function() {
      setClients(function(prev) {
        return prev.map(function(c) { return c.id === clientId ? Object.assign({}, c, { status: newStatus }) : c; });
      });
      notify(newStatus === "active" ? "Client enabled!" : "Client disabled! They cannot login now.");
    }).catch(function(e) {
      // Update locally even if DB fails
      setClients(function(prev) {
        return prev.map(function(c) { return c.id === clientId ? Object.assign({}, c, { status: newStatus }) : c; });
      });
      notify(newStatus === "active" ? "Client enabled!" : "Client disabled!");
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
      notify("Invoice created and saved!");
    }).catch(function() {
      setInvoices(function(prev) { return [inv].concat(prev); });
      notify("Invoice created!");
    });
    setNewInvoice({ customer: { name: "", phone: "", company: "", whatsapp: "" }, services: [{ name: "PostRank AI", qty: 1, price: 25000 }], dueDate: "", notes: "", status: "pending" });
    setShowInvoiceModal(false);
  }

  function handleDeleteInvoice(id) {
    if (!window.confirm("Delete this invoice?")) return;
    fetch(SUPA_URL + "/rest/v1/invoices?id=eq." + id, {
      method: "DELETE",
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + SUPA_KEY }
    }).then(function(r) {
      if (!r.ok) throw new Error("Delete failed");
      setInvoices(function(prev) { return prev.filter(function(i) { return i.id !== id; }); });
      notify("Invoice deleted!");
    }).catch(function(e) {
      notify("Delete failed: " + e.message, true);
    });
  }

  function handleStatusChange(id, status) {
    fetch(SUPA_URL + "/rest/v1/invoices?id=eq." + id, {
      method: "PATCH",
      headers: { apikey: SUPA_KEY, Authorization: "Bearer " + SUPA_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ status: status })
    }).catch(function(){});
    setInvoices(function(prev) { return prev.map(function(i) { return i.id === id ? Object.assign({}, i, { status: status }) : i; }); });
    notify("Status updated successfully!");
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

  function buildInvoiceHTML(invoice, lh) {
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
    var hasLetterhead = lh && lh.length > 0;

    var parts = [];
    parts.push("<!DOCTYPE html><html><head><meta charset='UTF-8'><title>" + invoice.invoiceNo + "</title>");
    parts.push("<style>");
    parts.push("*{box-sizing:border-box;margin:0;padding:0}");
    parts.push("body{font-family:Arial,sans-serif;color:#1a1a2e;-webkit-print-color-adjust:exact;print-color-adjust:exact}");

    if (hasLetterhead) {
      // Letterhead mode - full A4 page background image, content overlaid in the middle
      parts.push(".page{width:210mm;height:297mm;overflow:hidden;position:relative;background-image:url('" + lh + "');background-size:210mm 297mm;background-repeat:no-repeat;background-position:top center;margin:0 auto;-webkit-print-color-adjust:exact;print-color-adjust:exact}");
      parts.push(".content{padding:210px 50px 150px;box-sizing:border-box;height:297mm}");
    } else {
      // Default header
      parts.push(".page{width:100%;min-height:100vh}");
      parts.push(".hdr{background:#1e293b;color:white;padding:28px 40px;display:flex;justify-content:space-between;align-items:flex-start}");
      parts.push(".co-name{font-size:26px;font-weight:900;color:#60a5fa}");
      parts.push(".co-tag{font-size:12px;color:#94a3b8;margin-top:4px}");
      parts.push(".content{padding:30px 40px}");
    }

    parts.push(".inv-title{font-size:28px;font-weight:900;color:#1e293b;letter-spacing:2px}");
    parts.push(".inv-no{font-size:13px;color:#64748b;margin-top:4px}");
    parts.push(".two{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin:20px 0}");
    parts.push(".sec-title{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#64748b;font-weight:700;margin-bottom:8px}");
    parts.push(".box{background:#f8fafc;border-radius:8px;padding:14px;border:1px solid #e2e8f0}");
    parts.push("table{width:100%;border-collapse:collapse;margin:16px 0}");
    parts.push("th{background:#1e293b;color:white;padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase}");
    parts.push("td{padding:10px 12px;border-bottom:1px solid #f1f5f9;font-size:13px}");
    parts.push(".status-pill{display:inline-block;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;text-transform:uppercase}");
    parts.push(".sig-box{text-align:center;border-top:2px solid #334155;padding-top:10px;min-width:180px}");
    parts.push(".ftr{background:#f8fafc;padding:18px 40px;border-top:3px solid #6366f1;text-align:center;font-size:11px;color:#475569;margin-top:20px}");
    parts.push("@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.no-print{display:none}}");
    parts.push("@page{size:A4;margin:0}");
    parts.push("</style></head><body><div class='page'>");

    if (hasLetterhead) {
      // Letterhead is now the page background (set via CSS) - just open content wrapper
      parts.push("<div class='content'>");
      // Invoice title bar
      parts.push("<div style='display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid #e2e8f0'>");
      parts.push("<div><div class='inv-title'>INVOICE</div><div class='inv-no'>" + invoice.invoiceNo + "</div></div>");
      parts.push("<div style='text-align:right'>");
      parts.push("<div style='font-size:12px;color:#64748b'>Date: <strong>" + invoice.date + "</strong></div>");
      parts.push("<div style='font-size:12px;color:#64748b'>Due: <strong>" + (invoice.dueDate || "N/A") + "</strong></div>");
      parts.push("<div style='margin-top:8px'><span class='status-pill' style='background:" + sc + "20;color:" + sc + ";border:1.5px solid " + sc + "'>" + invoice.status.toUpperCase() + "</span></div>");
      parts.push("</div></div>");
    } else {
      // Default header
      parts.push("<div class='hdr'>");
      parts.push("<div><div class='co-name'>" + COMPANY_INFO.name + "</div>");
      parts.push("<div class='co-tag'>" + COMPANY_INFO.tagline + "</div>");
      parts.push("<div style='margin-top:10px;font-size:11px;color:#94a3b8'>" + COMPANY_INFO.founder + " | " + COMPANY_INFO.title + "<br>" + COMPANY_INFO.email + "<br>" + COMPANY_INFO.phone + "<br>" + COMPANY_INFO.website + "</div></div>");
      parts.push("<div style='text-align:right'><div style='font-size:28px;font-weight:900;color:#c8f03c;letter-spacing:2px'>INVOICE</div>");
      parts.push("<div style='font-size:13px;color:#94a3b8;margin-top:4px'>" + invoice.invoiceNo + "</div>");
      parts.push("<div style='margin-top:8px;font-size:11px;color:#94a3b8'>Date: " + invoice.date + "<br>Due: " + (invoice.dueDate || "N/A") + "</div>");
      parts.push("<div style='margin-top:8px'><span class='status-pill' style='background:" + sc + "20;color:" + sc + ";border:1.5px solid " + sc + "'>" + invoice.status.toUpperCase() + "</span></div>");
      parts.push("</div></div>");
      parts.push("<div class='content'>");
    }

    // Bill To + Invoice Info
    parts.push("<div class='two'>");
    parts.push("<div><div class='sec-title'>Bill To</div><div class='box'>");
    parts.push("<div style='font-size:15px;font-weight:700'>" + invoice.customer.name + "</div>");
    parts.push("<div style='font-size:12px;color:#475569;margin-top:2px'>" + (invoice.customer.company || "") + "</div>");
    parts.push("<div style='font-size:12px;color:#475569'>" + (invoice.customer.phone || "") + "</div></div></div>");
    parts.push("<div><div class='sec-title'>Invoice Info</div><div class='box'>");
    parts.push("<div style='font-size:12px;color:#475569'>Invoice No: <strong>" + invoice.invoiceNo + "</strong></div>");
    parts.push("<div style='font-size:12px;color:#475569'>Issue Date: " + invoice.date + "</div>");
    parts.push("<div style='font-size:12px;color:#475569'>Due Date: " + (invoice.dueDate || "N/A") + "</div></div></div></div>");

    // Services table
    parts.push("<table><thead><tr>");
    parts.push("<th>Service / Description</th><th style='text-align:center'>Qty</th><th style='text-align:right'>Unit Price</th><th style='text-align:right'>Total</th>");
    parts.push("</tr></thead><tbody>" + rows);
    parts.push("<tr><td colspan='3' style='padding:12px;text-align:right;font-weight:700;font-size:14px;background:#f8fafc'>TOTAL AMOUNT</td>");
    parts.push("<td style='padding:12px;text-align:right;font-size:18px;font-weight:900;color:#6366f1;background:#f8fafc'>" + formatPKR(total) + "</td></tr>");
    parts.push("</tbody></table>");

    // Notes + Signature
    parts.push("<div style='display:flex;justify-content:space-between;align-items:flex-end;margin-top:24px'>");
    parts.push("<div style='max-width:55%;font-size:12px;color:#475569;line-height:1.6'>");
    parts.push("<strong style='font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#64748b'>Notes & Terms</strong><br>");
    parts.push((invoice.notes || "Payment due within 15 days of invoice date. Thank you for your business!"));
    parts.push("</div>");
    parts.push("<div class='sig-box'>");
    parts.push("<div style='font-style:italic;color:#6366f1;font-size:15px;margin-bottom:5px'>Adnan Butt</div>");
    parts.push("<div style='font-weight:700;font-size:13px'>" + COMPANY_INFO.founder + "</div>");
    parts.push("<div style='font-size:11px;color:#64748b'>" + COMPANY_INFO.title + " | " + COMPANY_INFO.name + "</div></div></div>");

    // Footer (only shown when no letterhead - letterhead's own footer design shows via background image)
    if (!hasLetterhead) {
      parts.push("<div class='ftr'>" + COMPANY_INFO.name + " | " + COMPANY_INFO.email + " | " + COMPANY_INFO.phone + " | " + COMPANY_INFO.website + "</div>");
    }

    parts.push("</div></div></body></html>");
    return parts.join("");
  }

  function printInvoice(invoice) {
    var doc = window.open("", "_blank", "width=900,height=700");
    if (!doc) { notify("Please allow popups!", true); return; }
    doc.document.write(buildInvoiceHTML(invoice, letterhead));
    doc.document.close();
    setTimeout(function() { doc.print(); }, 700);
  }

  function downloadInvoicePDF(invoice) {
    var win = window.open("", "_blank", "width=900,height=700");
    if (!win) { notify("Please allow popups!", true); return; }
    win.document.write(buildInvoiceHTML(invoice, letterhead));
    win.document.close();
    win.focus();
    setTimeout(function() { win.print(); }, 700);
    notify("Select 'Save as PDF' in the print dialog!");
  }



  var C = {
    primary: "#6366f1", primaryDark: "#4f46e5", primaryLight: "#eef2ff",
    danger: "#f43f5e", success: "#22c55e", warning: "#f59e0b",
    ink: "#0f172a", ink2: "#334155", muted: "#64748b",
    border: "#e2e8f0", bg: "#f8fafc", card: "#ffffff", sidebar: "#1e293b",
  };

  var ss = {
    app: { display: "flex", minHeight: "100vh", fontFamily: "Inter,sans-serif", background: C.bg, color: C.ink },
    sidebar: { width: 230, background: C.sidebar, minHeight: "100vh", position: "fixed", left: 0, top: 0, bottom: 0, display: "flex", flexDirection: "column", zIndex: 100 },
    logowrap: { padding: "22px 20px", borderBottom: "1px solid #334155" },
    logotext: { fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: 17, color: "#a5b4fc" },
    logosub: { fontSize: 10, color: "#475569", marginTop: 2, textTransform: "uppercase", letterSpacing: 1 },
    userchip: { margin: "12px 16px 0", background: "#273549", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 },
    avatar: { width: 32, height: 32, borderRadius: "50%", background: C.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 },
    nav: { padding: "12px 0", flex: 1 },
    navitem: { display: "flex", alignItems: "center", gap: 10, padding: "11px 20px", color: "#94a3b8", fontSize: 13, cursor: "pointer", borderLeft: "3px solid transparent", fontWeight: 500 },
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
    plancard: { background: C.card, border: "2px solid " + C.border, borderRadius: 16, padding: "28px 22px", position: "relative" },
    modal: { background: C.card, borderRadius: 16, padding: 28, width: "100%", maxWidth: 500, boxShadow: "0 20px 60px rgba(0,0,0,0.15)", maxHeight: "90vh", overflowY: "auto" },
    overlay: { position: "fixed", inset: 0, background: "rgba(15,23,42,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 },
    infobx: { background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 8, padding: "12px 16px", fontSize: 12, color: "#78350f", lineHeight: 1.7 },
    sucbx: { background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "12px 16px", fontSize: 12, color: "#166534" },
    errbx: { background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 8, padding: "12px 16px", fontSize: 12, color: "#e11d48", marginTop: 12 },
    fmlabel: { fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6, display: "block" },
    fmgroup: { marginBottom: 16 },
    toast: { position: "fixed", bottom: 28, right: 28, background: "#1e293b", color: "#f1f5f9", padding: "13px 20px", borderRadius: 10, fontSize: 13, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.18)", zIndex: 9999 },
  };

  var totalPub = posts.filter(function(p) { return p.status === "published"; }).length;

  var NAV = isAdmin ? [
    { id: "generate", label: "Generate Post" },
    { id: "dashboard", label: "Dashboard" },
    { id: "posts", label: "My Posts" },
    { id: "clients", label: "Clients" },
    { id: "invoices", label: "Invoices" },
    { id: "admin", label: "Admin Panel" },
    { id: "plans", label: "Plans" },
  ] : [
    { id: "generate", label: "Generate Post" },
    { id: "posts", label: "My Posts" },
    { id: "settings", label: "Settings" },
  ];

  // AUTH SCREEN
  if (!session) {
    return React.createElement("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#1e293b,#0f172a)", padding: 20, fontFamily: "Inter,sans-serif" } },
      React.createElement("div", { style: { background: "white", borderRadius: 20, padding: 40, width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" } },
        React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: 22, color: C.primary, marginBottom: 4 } }, "PostRank AI"),
        React.createElement("div", { style: { fontSize: 12, color: C.muted, marginBottom: 28 } }, "SEO Automation Platform"),
        React.createElement("div", { style: { display: "flex", background: C.bg, borderRadius: 10, padding: 4, marginBottom: 24 } },
          React.createElement("button", { onClick: function() { setAuthTab("login"); setAuthError(""); }, style: { flex: 1, padding: 9, border: "none", borderRadius: 8, fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: authTab === "login" ? 600 : 400, cursor: "pointer", background: authTab === "login" ? "white" : "transparent", color: authTab === "login" ? C.primary : C.muted } }, "Login"),
          React.createElement("button", { onClick: function() { setAuthTab("register"); setAuthError(""); }, style: { flex: 1, padding: 9, border: "none", borderRadius: 8, fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: authTab === "register" ? 600 : 400, cursor: "pointer", background: authTab === "register" ? "white" : "transparent", color: authTab === "register" ? C.primary : C.muted } }, "Sign Up")
        ),
        authError ? React.createElement("div", { style: ss.errbx }, authError) : null,
        authSuccess ? React.createElement("div", { style: ss.sucbx }, authSuccess) : null,
        authTab === "login"
          ? React.createElement("div", null,
              React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Username or Email"), React.createElement("input", { type: "text", placeholder: "your@email.com", value: loginEmail, onChange: function(e) { setLoginEmail(e.target.value); }, onKeyDown: function(e) { if (e.key === "Enter") handleLogin(); }, autoComplete: "username", autoCorrect: "off", autoCapitalize: "off", spellCheck: false, style: { width: "100%", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 16, color: "#0f172a", outline: "none", WebkitAppearance: "none" } })),
              React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Password"), React.createElement("input", { type: "password", placeholder: "your password", value: loginPw, onChange: function(e) { setLoginPw(e.target.value); }, onKeyDown: function(e) { if (e.key === "Enter") handleLogin(); }, autoComplete: "current-password", style: { width: "100%", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 16, color: "#0f172a", outline: "none", WebkitAppearance: "none" } })),
              React.createElement(Btn, { variant: "primary", onClick: handleLogin, disabled: authLoading }, authLoading ? "Logging in..." : "Login"),
              React.createElement("div", { style: { fontSize: 11, color: C.muted, textAlign: "center", marginTop: 14 } }, "Admin login: username 'admin'")
            )
          : React.createElement("div", null,
              React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Full Name"), React.createElement("input", { type: "text", placeholder: "Your full name", value: regName, onChange: function(e) { setRegName(e.target.value); }, autoCorrect: "off", autoCapitalize: "words", style: { width: "100%", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 16, color: "#0f172a", outline: "none" } })),
              React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Email"), React.createElement("input", { type: "email", placeholder: "your@email.com", value: regEmail, onChange: function(e) { setRegEmail(e.target.value); }, autoComplete: "email", autoCapitalize: "off", style: { width: "100%", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 16, color: "#0f172a", outline: "none" } })),
              React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Password"), React.createElement("input", { type: "password", placeholder: "Min 6 characters", value: regPw, onChange: function(e) { setRegPw(e.target.value); }, autoComplete: "new-password", style: { width: "100%", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 16, color: "#0f172a", outline: "none" } })),
              React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Plan"),
                React.createElement("select", { value: regPlan, onChange: function(e) { setRegPlan(e.target.value); }, style: { width: "100%", background: C.bg, border: "1.5px solid " + C.border, borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 16 } },
                  React.createElement("option", { value: "Demo" }, "Demo - Free (5 credits trial)"),
                  React.createElement("option", { value: "Basic" }, "Basic - $19/mo (50 credits)"),
                  React.createElement("option", { value: "Pro" }, "Pro - $49/mo (250 credits)"),
                  React.createElement("option", { value: "Agency" }, "Agency - $149/mo (1500 credits)")
                )
              ),
              React.createElement(Btn, { variant: "primary", onClick: handleRegister, disabled: authLoading }, authLoading ? "Creating account..." : "Create Account")
            )
      )
    );
  }

  return React.createElement("div", { style: ss.app },
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
          return React.createElement("div", { key: n.id, onClick: function() { setView(n.id); }, style: Object.assign({}, ss.navitem, view === n.id ? ss.navactive : {}) }, n.label);
        })
      ),
      React.createElement("div", { style: ss.sidebottom },
        !isAdmin ? React.createElement("div", { style: { background: "#273549", borderRadius: 10, padding: "12px 14px", marginBottom: 10 } },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } },
            React.createElement("span", { style: { fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 } }, "Monthly Credits"),
            React.createElement("span", { style: { background: C.primary, color: "white", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10 } }, profile.plan || "Basic")
          ),
          credits && credits.is_unlimited
            ? React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 16, fontWeight: 700, color: "#a5b4fc" } }, "UNLIMITED"),
                React.createElement("div", { style: { fontSize: 10, color: "#64748b" } }, "Agency Unlimited Plan")
              )
            : React.createElement("div", null,
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 5 } },
                  React.createElement("span", { style: { fontSize: 11, color: "#94a3b8" } }, "Remaining"),
                  React.createElement("span", { style: { fontFamily: "Poppins,sans-serif", fontSize: 14, fontWeight: 700, color: getRemainingCredits() <= 5 ? C.danger : "#a5b4fc" } }, getRemainingCredits() + "/" + getTotalCredits())
                ),
                React.createElement("div", { style: { background: "#1e293b", borderRadius: 4, height: 6, overflow: "hidden", marginBottom: 4 } },
                  React.createElement("div", { style: { width: getTotalCredits() > 0 ? Math.round(getRemainingCredits() / getTotalCredits() * 100) + "%" : "0%", height: "100%", background: getRemainingCredits() <= 5 ? C.danger : C.primary, borderRadius: 4 } })
                ),
                getRemainingCredits() <= 5 ? React.createElement("div", { style: { fontSize: 10, color: C.danger, fontWeight: 600 } }, "Credits almost exhausted!") : React.createElement("div", { style: { fontSize: 10, color: "#64748b" } }, "Resets monthly")
              )
        ) : null,
        React.createElement("button", { onClick: handleLogout, style: { width: "100%", background: "#273549", border: "1px solid #334155", borderRadius: 9, padding: 10, color: "#94a3b8", fontFamily: "Inter,sans-serif", fontSize: 12, cursor: "pointer" } }, "Logout")
      )
    ),

    React.createElement("main", { style: ss.main },

      view === "generate" && React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 28 } },
          React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700 } }, "Generate Post"),
          React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 5 } }, "Product or Blog -> AI writes everything -> Save -> Publish")
        ),
        React.createElement("div", { style: ss.carddark },
          React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 18, fontWeight: 600, color: "#f1f5f9", marginBottom: 16 } }, postType === "blog" ? "What is your blog topic?" : "What are you selling today?"),
          React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" } },
            React.createElement("button", { onClick: function() { setPostType("product"); }, style: { padding: "8px 16px", borderRadius: 8, border: "2px solid " + (postType === "product" ? C.primary : "#334155"), background: postType === "product" ? C.primary : "transparent", color: postType === "product" ? "white" : "#94a3b8", fontFamily: "Inter,sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer" } }, "Product Post"),
            React.createElement("button", { onClick: function() { setPostType("blog"); }, style: { padding: "8px 16px", borderRadius: 8, border: "2px solid " + (postType === "blog" ? C.warning : "#334155"), background: postType === "blog" ? C.warning : "transparent", color: postType === "blog" ? "white" : "#94a3b8", fontFamily: "Inter,sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer" } }, "Blog Post")
          ),
          React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" } },
            React.createElement("button", { onClick: function() { setSeoType("local"); }, style: { padding: "7px 14px", borderRadius: 8, border: "none", background: seoType === "local" ? "#273549" : "#1a2535", color: seoType === "local" ? "#a5b4fc" : "#475569", fontFamily: "Inter,sans-serif", fontWeight: 500, fontSize: 11, cursor: "pointer" } }, "Local SEO (Pakistan)"),
            React.createElement("button", { onClick: function() { setSeoType("international"); }, style: { padding: "7px 14px", borderRadius: 8, border: "none", background: seoType === "international" ? "#273549" : "#1a2535", color: seoType === "international" ? "#a5b4fc" : "#475569", fontFamily: "Inter,sans-serif", fontWeight: 500, fontSize: 11, cursor: "pointer" } }, "International SEO")
          ),
          React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "flex-end", flexWrap: "wrap" } },
            React.createElement("div", { style: { flex: 1 } },
              React.createElement("div", { style: { fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 7 } }, postType === "blog" ? "Blog Topic" : "Product Title"),
              React.createElement("input", { type: "text", placeholder: postType === "blog" ? "e.g. Best Sneakers in Pakistan" : "e.g. Nike Running Shoes", value: productTitle, onChange: function(e) { setProductTitle(e.target.value); }, onKeyDown: function(e) { if (e.key === "Enter") handleGenerate(); }, autoCorrect: "off", autoCapitalize: "words", autoComplete: "off", style: { width: "100%", background: "#273549", border: "1.5px solid #334155", borderRadius: 10, padding: "12px 14px", fontFamily: "Inter,sans-serif", fontSize: 16, color: "#f1f5f9", outline: "none" } })
            ),
            React.createElement("div", { style: { maxWidth: 170 } },
              React.createElement("div", { style: { fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 7 } }, postType === "blog" ? "Focus Keyword" : "Price"),
              React.createElement("input", { type: "text", placeholder: postType === "blog" ? "keyword" : "e.g. PKR 3000", value: productPrice, onChange: function(e) { setProductPrice(e.target.value); }, onKeyDown: function(e) { if (e.key === "Enter") handleGenerate(); }, autoCorrect: "off", autoCapitalize: "off", autoComplete: "off", style: { width: "100%", background: "#273549", border: "1.5px solid #334155", borderRadius: 10, padding: "12px 14px", fontFamily: "Inter,sans-serif", fontSize: 16, color: "#f1f5f9", outline: "none" } })
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
              React.createElement("div", { style: { fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: C.muted, marginBottom: 7, fontWeight: 600 } }, "Description (200+ words)"),
              React.createElement("div", { style: { fontSize: 13, color: C.ink, lineHeight: 1.7, background: C.bg, border: "1px solid " + C.border, borderRadius: 8, padding: "11px 13px", whiteSpace: "pre-line" } }, generated.description)
            ),
            React.createElement("div", { style: { gridColumn: "1/-1" } },
              React.createElement("div", { style: { fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: C.muted, marginBottom: 7, fontWeight: 600 } }, "Meta Description"),
              React.createElement("div", { style: { fontSize: 13, color: C.ink, background: C.bg, border: "1px solid " + C.border, borderRadius: 8, padding: "11px 13px" } }, generated.metaDescription)
            ),
            React.createElement("div", null,
              React.createElement("div", { style: { fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: C.muted, marginBottom: 7, fontWeight: 600 } }, "SEO Keywords"),
              React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, padding: "10px 12px", background: C.bg, border: "1px solid " + C.border, borderRadius: 8 } },
                generated.keywords.map(function(k, i) { return React.createElement("span", { key: i, style: { background: "#334155", color: "#e2e8f0", fontSize: 11, padding: "3px 10px", borderRadius: 20 } }, k); })
              )
            ),
            React.createElement("div", null,
              React.createElement("div", { style: { fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: C.muted, marginBottom: 7, fontWeight: 600 } }, "Hashtags"),
              React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, padding: "10px 12px", background: C.bg, border: "1px solid " + C.border, borderRadius: 8 } },
                generated.hashtags.map(function(h, i) { return React.createElement("span", { key: i, style: { background: "#eef2ff", color: C.primary, fontSize: 11, padding: "3px 10px", borderRadius: 20 } }, h); })
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
              React.createElement("div", { style: { background: C.bg, border: "2px dashed #c7d2fe", borderRadius: 10, padding: 16, marginBottom: 12, textAlign: "center" } },
                React.createElement("input", { type: "file", accept: "image/*", multiple: true, id: "imgup", style: { display: "none" },
                  onChange: function(e) {
                    var files = Array.from(e.target.files);
                    var ec = uploadedImages.length;
                    var angles = ["Front View","Side View","Back View","Detail Shot","Lifestyle Photo","Close Up","Top View","Package Shot"];
                    var previews = files.map(function(f, i) {
                      var idx = ec + i;
                      var ang = angles[idx] || ("View " + (idx+1));
                      var alt = generated.seoType === "local" ? "Buy " + generated.product + " " + ang + " - " + generated.price + " Pakistan" : "Premium " + generated.product + " " + ang + " - " + generated.price;
                      return { file: f, url: URL.createObjectURL(f), name: f.name, alt: alt, title: generated.product + " | " + ang };
                    });
                    setUploadedImages(function(p) { return p.concat(previews); });
                    setImageAlts(function(p) { return p.concat(previews.map(function(x) { return { alt: x.alt, title: x.title }; })); });
                  }
                }),
                React.createElement("label", { htmlFor: "imgup", style: { cursor: "pointer", display: "block" } },
                  React.createElement("div", { style: { fontSize: 24, marginBottom: 6 } }, "+"),
                  React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: C.primary } }, "Upload Images"),
                  React.createElement("div", { style: { fontSize: 11, color: C.muted, marginTop: 3 } }, "JPG, PNG, WEBP - Multiple files supported")
                )
              ),
              uploadedImages.length > 0
                ? React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
                    uploadedImages.map(function(img, i) {
                      return React.createElement("div", { key: i, style: { background: C.bg, border: "1px solid " + C.border, borderRadius: 10, padding: 12, display: "flex", gap: 12 } },
                        React.createElement("div", { style: { position: "relative", flexShrink: 0 } },
                          React.createElement("img", { src: img.url, alt: "", style: { width: 60, height: 60, objectFit: "cover", borderRadius: 8 } }),
                          React.createElement("span", { style: { position: "absolute", top: -6, left: -6, background: C.primary, color: "white", borderRadius: 4, padding: "1px 5px", fontSize: 9, fontWeight: 700 } }, "IMG " + (i+1))
                        ),
                        React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 6 } },
                          React.createElement("input", { value: imageAlts[i] ? imageAlts[i].alt : "", onChange: function(e) { var u = imageAlts.slice(); if (!u[i]) u[i] = { alt: "", title: "" }; u[i] = Object.assign({}, u[i], { alt: e.target.value }); setImageAlts(u); }, style: { width: "100%", background: "white", border: "1.5px solid " + C.border, borderRadius: 7, padding: "7px 10px", fontSize: 12, fontFamily: "Inter,sans-serif", outline: "none" }, placeholder: "SEO Alt Text" }),
                          React.createElement("input", { value: imageAlts[i] ? imageAlts[i].title : "", onChange: function(e) { var u = imageAlts.slice(); if (!u[i]) u[i] = { alt: "", title: "" }; u[i] = Object.assign({}, u[i], { title: e.target.value }); setImageAlts(u); }, style: { width: "100%", background: "white", border: "1.5px solid " + C.border, borderRadius: 7, padding: "7px 10px", fontSize: 12, fontFamily: "Inter,sans-serif", outline: "none" }, placeholder: "Image Title" })
                        ),
                        React.createElement("button", { onClick: function() { setUploadedImages(function(p) { return p.filter(function(_, j) { return j !== i; }); }); setImageAlts(function(p) { return p.filter(function(_, j) { return j !== i; }); }); }, style: { background: "#fff1f2", border: "none", borderRadius: 6, padding: "4px 8px", color: C.danger, cursor: "pointer" } }, "X")
                      );
                    })
                  )
                : React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } },
                    generated.altTexts.map(function(alt, i) {
                      return React.createElement("div", { key: i, style: { background: C.bg, border: "1px solid " + C.border, borderRadius: 7, padding: "8px 12px", fontSize: 12, display: "flex", gap: 8 } },
                        React.createElement("span", { style: { background: C.primary, color: "white", borderRadius: 4, padding: "2px 7px", fontSize: 10, fontWeight: 700, flexShrink: 0 } }, "IMG " + (i+1)),
                        React.createElement("div", null, alt)
                      );
                    })
                  )
            )
          )
        ),
        !generated && !generating && React.createElement("div", { style: { textAlign: "center", padding: "48px 20px", color: C.muted } },
          React.createElement("div", { style: { fontSize: 32, marginBottom: 10 } }, "*"),
          React.createElement("div", null, "Enter your product above and click Generate.")
        )
      ),

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
          posts.length === 0 ? React.createElement("div", { style: { textAlign: "center", padding: 28, color: C.muted } }, "No posts yet. Start generating!") :
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

      view === "posts" && React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 28 } }, React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700 } }, "My Posts")),
        React.createElement("div", { style: ss.tbl },
          React.createElement("div", { style: Object.assign({}, ss.tblhead, ss.tbl4) }, React.createElement("div", null, "Product"), React.createElement("div", null, "Price"), React.createElement("div", null, "Status"), React.createElement("div", null, "Date")),
          postsLoading ? React.createElement("div", { style: { textAlign: "center", padding: 28, color: C.muted } }, "Loading...") :
          posts.length === 0 ? React.createElement("div", { style: { textAlign: "center", padding: 28, color: C.muted } }, "No posts found.") :
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

      view === "clients" && isAdmin && React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 } },
          React.createElement("div", null, React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700 } }, "Clients")),
          React.createElement(Btn, { variant: "primary", onClick: function() { setShowAddClient(true); } }, "+ Add Client")
        ),
        React.createElement("div", { style: ss.statgrid3 },
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.primary }) }, React.createElement("div", { style: ss.statnum }, clients.length), React.createElement("div", { style: ss.statlbl }, "Total Clients")),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.success }) }, React.createElement("div", { style: ss.statnum }, clients.filter(function(c) { return c.status === "active"; }).length), React.createElement("div", { style: ss.statlbl }, "Active")),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.danger }) }, React.createElement("div", { style: ss.statnum }, clients.filter(function(c) { return c.status === "disabled"; }).length), React.createElement("div", { style: ss.statlbl }, "Disabled"))
        ),
        React.createElement("div", { style: Object.assign({}, ss.infobx, { marginBottom: 16 }) },
          React.createElement("strong", null, "Share this link with client: "),
          React.createElement("span", { style: { color: C.primary, fontWeight: 600 } }, typeof window !== "undefined" ? window.location.origin : "https://post-rank-ai.vercel.app"),
          " - Client can Sign Up -> Login -> Use their dashboard!"
        ),
        React.createElement("div", { style: ss.tbl },
          React.createElement("div", { style: Object.assign({}, ss.tblhead, { gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1.5fr" }) },
            React.createElement("div", null, "Client"), React.createElement("div", null, "Plan"), React.createElement("div", null, "Credits Used"), React.createElement("div", null, "Joined"), React.createElement("div", null, "Status"), React.createElement("div", null, "Actions")
          ),
          clientsLoading ? React.createElement("div", { style: { textAlign: "center", padding: 28, color: C.muted } }, "Loading clients...") :
          clients.length === 0 ? React.createElement("div", { style: { textAlign: "center", padding: 28, color: C.muted } }, "No clients yet. Click Add Client to get started!") :
          clients.map(function(c) {
            var isActive = c.status === "active";
            var creditsLabel = c.used_credits === null || c.used_credits === undefined
              ? React.createElement("span", { style: { fontSize: 11, color: C.muted, fontStyle: "italic" } }, "Not logged in yet")
              : c.is_unlimited
                ? React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: C.primary } }, c.used_credits + " used")
                : React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: (c.used_credits >= (c.total_credits || 0)) ? C.danger : C.ink } }, c.used_credits + " / " + (c.total_credits || 0));
            return React.createElement("div", { key: c.id, style: Object.assign({}, ss.tblrow, { gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1.5fr" }) },
              React.createElement("div", null, React.createElement("div", { style: { fontWeight: 600 } }, c.name || c.email), React.createElement("div", { style: { fontSize: 11, color: C.muted } }, c.email)),
              React.createElement("div", null, React.createElement(Badge, { type: c.plan || "Basic" }, c.plan || "Basic")),
              creditsLabel,
              React.createElement("div", { style: { fontSize: 11, color: C.muted } }, c.created_at ? new Date(c.created_at).toLocaleDateString() : "-"),
              React.createElement(Badge, { type: isActive ? "active" : "disabled" }, isActive ? "Active" : "Disabled"),
              React.createElement("div", { style: { display: "flex", gap: 5, flexWrap: "wrap" } },
                React.createElement("button", { onClick: function() { handleToggleStatus(c.id); }, style: { border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600, background: isActive ? "#fee2e2" : "#dcfce7", color: isActive ? "#dc2626" : "#16a34a", minWidth: 60 } }, isActive ? "Disable" : "Enable"),
                React.createElement("button", { onClick: function() { setEditClient(Object.assign({}, c)); setShowEditModal(true); }, style: { border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600, background: "#dbeafe", color: "#2563eb" } }, "Edit"),
                React.createElement("button", { onClick: function() {
                  var np = window.prompt("Select plan:\n0. Demo (5 credits - Free Trial)\n1. Basic (50 credits)\n2. Pro (250 credits)\n3. Agency (1500 credits)\n4. AgencyUnlimited (Unlimited)\n\nType exactly: Demo, Basic, Pro, Agency, or AgencyUnlimited", c.plan || "Basic");
                  if (np && ["Demo","Basic","Pro","Agency","AgencyUnlimited"].indexOf(np) !== -1) {
                    dbAPI.update("clients", "id=eq." + c.id, { plan: np }, SUPA_KEY).catch(function(){});
                    setClients(function(prev) { return prev.map(function(x) { return x.id === c.id ? Object.assign({}, x, { plan: np }) : x; }); });
                    notify("Plan updated to: " + np);
                  }
                }, style: { border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600, background: "#fef3c7", color: "#d97706" } }, "Plan"),
                React.createElement("button", { onClick: function() { handleDeleteClient(c.id); }, style: { border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600, background: "#fee2e2", color: "#dc2626", minWidth: 50 } }, "Delete")
              )
            );
          })
        )
      ),

      view === "invoices" && isAdmin && React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 } },
          React.createElement("div", null, React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700 } }, "Invoices"), React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 5 } }, "Create, send & track client invoices")),
          React.createElement(Btn, { variant: "primary", onClick: function() { setShowInvoiceModal(true); } }, "+ New Invoice")
        ),
        React.createElement("div", { style: { background: C.card, border: "1px solid " + C.border, borderRadius: 12, padding: 20, marginBottom: 20 } },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 } },
            React.createElement("div", null,
              React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 14, fontWeight: 700 } }, "Company Letterhead"),
              React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 3 } }, "Upload letterhead - appears on all invoice PDFs automatically")
            ),
            React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center" } },
              letterhead ? React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
                React.createElement("img", { src: letterhead, alt: "Letterhead", style: { height: 50, borderRadius: 6, border: "1px solid " + C.border } }),
                React.createElement("button", { onClick: function() { setLetterhead(null); localStorage.removeItem("pr_letterhead"); notify("Letterhead removed."); }, style: { background: "#fee2e2", border: "none", borderRadius: 7, padding: "6px 12px", color: "#dc2626", fontSize: 12, fontWeight: 600, cursor: "pointer" } }, "Remove")
              ) : React.createElement("span", { style: { fontSize: 12, color: C.muted, fontStyle: "italic" } }, "No letterhead uploaded"),
              React.createElement("div", null,
                React.createElement("input", { type: "file", accept: "image/*", id: "lh-upload", style: { display: "none" },
                  onChange: function(e) {
                    var file = e.target.files[0];
                    if (!file) return;
                    if (file.size > 2 * 1024 * 1024) { notify("File too large! Max 2MB.", true); return; }
                    var reader = new FileReader();
                    reader.onload = function(ev) { setLetterhead(ev.target.result); localStorage.setItem("pr_letterhead", ev.target.result); notify("Letterhead uploaded successfully!"); };
                    reader.readAsDataURL(file);
                  }
                }),
                React.createElement("label", { htmlFor: "lh-upload", style: { background: C.primary, color: "white", borderRadius: 8, padding: "9px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "inline-block" } }, letterhead ? "Change Letterhead" : "Upload Letterhead")
              )
            )
          ),
          letterhead
            ? React.createElement("div", { style: { marginTop: 12, padding: 10, background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, fontSize: 11, color: "#166534" } }, "Letterhead is active - all invoice PDFs will include your letterhead.")
            : React.createElement("div", { style: { marginTop: 12, padding: 10, background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 8, fontSize: 11, color: "#78350f" } }, "Tip: Upload PNG/JPG letterhead (recommended 1200x300px, max 2MB)")
        ),
        React.createElement("div", { style: ss.statgrid4 },
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.success }) }, React.createElement("div", { style: Object.assign({}, ss.statnum, { color: C.success }) }, formatPKR(invoices.filter(function(i) { return i.status === "paid"; }).reduce(function(s, i) { return s + calcTotal(i.services); }, 0))), React.createElement("div", { style: ss.statlbl }, "Total Received")),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.warning }) }, React.createElement("div", { style: Object.assign({}, ss.statnum, { color: C.warning }) }, formatPKR(invoices.filter(function(i) { return i.status === "pending"; }).reduce(function(s, i) { return s + calcTotal(i.services); }, 0))), React.createElement("div", { style: ss.statlbl }, "Pending")),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.danger }) }, React.createElement("div", { style: Object.assign({}, ss.statnum, { color: C.danger }) }, formatPKR(invoices.filter(function(i) { return i.status === "overdue"; }).reduce(function(s, i) { return s + calcTotal(i.services); }, 0))), React.createElement("div", { style: ss.statlbl }, "Overdue")),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.primary }) }, React.createElement("div", { style: ss.statnum }, invoices.length), React.createElement("div", { style: ss.statlbl }, "Total Invoices"))
        ),
        React.createElement("div", { style: ss.tbl },
          React.createElement("div", { style: Object.assign({}, ss.tblhead, { gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr 2fr" }) },
            React.createElement("div", null, "Invoice #"), React.createElement("div", null, "Customer"), React.createElement("div", null, "Amount"), React.createElement("div", null, "Due Date"), React.createElement("div", null, "Status"), React.createElement("div", null, "Actions")
          ),
          invoices.map(function(inv) {
            var total = calcTotal(inv.services);
            var sc = { paid: { bg: "#dcfce7", color: "#16a34a" }, pending: { bg: "#fef9c3", color: "#ca8a04" }, overdue: { bg: "#fee2e2", color: "#dc2626" } }[inv.status] || { bg: "#fef9c3", color: "#ca8a04" };
            return React.createElement("div", { key: inv.id, style: Object.assign({}, ss.tblrow, { gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr 2fr" }) },
              React.createElement("div", { style: { fontWeight: 700, color: C.primary, fontSize: 12 } }, inv.invoiceNo),
              React.createElement("div", null, React.createElement("div", { style: { fontWeight: 600 } }, inv.customer.name), React.createElement("div", { style: { fontSize: 11, color: C.muted } }, inv.customer.company || inv.customer.phone)),
              React.createElement("div", { style: { fontWeight: 700 } }, formatPKR(total)),
              React.createElement("div", { style: { fontSize: 12, color: C.muted } }, inv.dueDate || "-"),
              React.createElement("select", { value: inv.status, onChange: function(e) { handleStatusChange(inv.id, e.target.value); }, style: { background: sc.bg, color: sc.color, border: "none", borderRadius: 6, padding: "4px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer", outline: "none" } },
                React.createElement("option", { value: "paid" }, "Paid"),
                React.createElement("option", { value: "pending" }, "Pending"),
                React.createElement("option", { value: "overdue" }, "Overdue")
              ),
              React.createElement("div", { style: { display: "flex", gap: 5, flexWrap: "wrap" } },
                React.createElement("button", { onClick: function() { downloadInvoicePDF(inv); }, style: { border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600, background: "#eef2ff", color: C.primary } }, "PDF"),
                React.createElement("button", { onClick: function() { printInvoice(inv); }, style: { border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600, background: "#f3f4f6", color: "#374151" } }, "Print"),
                React.createElement("button", { onClick: function() { sendWhatsApp(inv, false); }, style: { border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600, background: "#dcfce7", color: "#16a34a" } }, "WA Send"),
                inv.status !== "paid" ? React.createElement("button", { onClick: function() { sendWhatsApp(inv, true); }, style: { border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600, background: "#fef9c3", color: "#ca8a04" } }, "Reminder") : null,
                React.createElement("button", { onClick: function() { handleDeleteInvoice(inv.id); }, style: { border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 600, background: "#fee2e2", color: "#dc2626" } }, "Delete")
              )
            );
          })
        )
      ),

      view === "settings" && !isAdmin && React.createElement(SettingsView, { C: C, ss: ss, Input: Input, Btn: Btn, notify: notify }),

      view === "admin" && isAdmin && React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 28 } }, React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700 } }, "Admin Panel")),
        React.createElement("div", { style: ss.statgrid4 },
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.primary }) }, React.createElement("div", { style: ss.statnum }, posts.length), React.createElement("div", { style: ss.statlbl }, "Total Posts")),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.success }) }, React.createElement("div", { style: ss.statnum }, totalPub), React.createElement("div", { style: ss.statlbl }, "Published")),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.warning }) }, React.createElement("div", { style: ss.statnum }, clients.length), React.createElement("div", { style: ss.statlbl }, "Active Clients")),
          React.createElement("div", { style: Object.assign({}, ss.statcard, { borderBottom: "3px solid " + C.danger }) }, React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700, color: C.primary } }, "PKR " + formatPKR(invoices.filter(function(i) { return i.status === "paid"; }).reduce(function(s, i) { return s + calcTotal(i.services); }, 0))), React.createElement("div", { style: ss.statlbl }, "Monthly Revenue"))
        )
      ),

      view === "plans" && React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 28 } }, React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 24, fontWeight: 700 } }, "Plans"), React.createElement("div", { style: { fontSize: 12, color: C.muted, marginTop: 5 } }, "Simple monthly billing. Cancel anytime.")),
        React.createElement("div", { style: ss.plansgrid },
          [
            { name: "Demo", price: "Free", credits: "5 credits only", feats: ["5 posts trial", "Local & International SEO", "1 website", "Email support", "Try before you buy"], featured: false },
            { name: "Basic", price: "$19", credits: "50 credits/month", feats: ["50 posts/month", "Local & International SEO", "1 website", "Email support", "Basic analytics"], featured: false },
            { name: "Pro", price: "$49", credits: "250 credits/month", feats: ["250 posts/month", "Advanced SEO optimization", "5 websites", "Priority support", "Full analytics", "WordPress & Shopify"], featured: true },
            { name: "Agency", price: "$149", credits: "1500 or Unlimited", feats: ["1500 or Unlimited posts", "Full SEO suite", "Unlimited websites", "Dedicated support", "White-label option", "API access", "Custom letterhead"], featured: false },
          ].map(function(p) {
            return React.createElement("div", { key: p.name, style: Object.assign({}, ss.plancard, p.featured ? { background: "#1e293b", borderColor: C.primary } : {}) },
              p.featured ? React.createElement("div", { style: { position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: C.primary, color: "white", fontSize: 9, fontWeight: 700, padding: "4px 14px", borderRadius: 20, whiteSpace: "nowrap" } }, "Most Popular") : null,
              React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 4, color: p.featured ? "#a5b4fc" : C.ink } }, p.name),
              React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 30, fontWeight: 700, color: p.featured ? "#f1f5f9" : C.ink } }, p.price, React.createElement("span", { style: { fontSize: 12, color: C.muted } }, "/mo")),
              React.createElement("div", { style: { fontSize: 12, color: C.primary, fontWeight: 600, marginBottom: 12, marginTop: 4 } }, p.credits),
              React.createElement("ul", { style: { margin: "0 0 16px", listStyle: "none" } },
                p.feats.map(function(f) { return React.createElement("li", { key: f, style: { fontSize: 12, padding: "5px 0", borderBottom: "1px solid " + (p.featured ? "#334155" : C.border), display: "flex", alignItems: "center", gap: 7, color: p.featured ? "#94a3b8" : C.ink2 } }, React.createElement("span", { style: { color: C.primary } }, "v"), f); })
              ),
              React.createElement("button", { style: { width: "100%", padding: 12, borderRadius: 10, border: "2px solid " + C.primary, background: p.featured ? C.primary : "transparent", color: p.featured ? "white" : C.primary, fontFamily: "Poppins,sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" } }, p.name === (profile.plan || "Basic") ? "Current Plan" : "Get Started")
            );
          })
        )
      )
    ),

    showAddClient && React.createElement("div", { style: ss.overlay, onClick: function(e) { if (e.target === e.currentTarget) setShowAddClient(false); } },
      React.createElement("div", { style: ss.modal },
        React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 20 } }, "Add New Client"),
        React.createElement("div", { style: Object.assign({}, ss.infobx, { marginBottom: 16 }) }, "Create client account. Client will verify email and login."),
        React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Full Name *"), React.createElement(Input, { placeholder: "Ali Store", value: newClient.name, onChange: function(e) { setNewClient(function(c) { return Object.assign({}, c, { name: e.target.value }); }); } })),
        React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Email *"), React.createElement(Input, { type: "email", placeholder: "client@email.com", value: newClient.email, onChange: function(e) { setNewClient(function(c) { return Object.assign({}, c, { email: e.target.value }); }); } })),
        React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Password *"), React.createElement(Input, { type: "password", placeholder: "Min 6 characters", value: newClient.password, onChange: function(e) { setNewClient(function(c) { return Object.assign({}, c, { password: e.target.value }); }); } })),
        React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Plan"),
          React.createElement("select", { value: newClient.plan, onChange: function(e) { setNewClient(function(c) { return Object.assign({}, c, { plan: e.target.value }); }); }, style: { width: "100%", background: C.bg, border: "1.5px solid " + C.border, borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 16 } },
            React.createElement("option", { value: "Demo" }, "Demo - 5 credits (Free Trial)"),
            React.createElement("option", { value: "Demo" }, "Demo - 5 credits (Free Trial)"),
            React.createElement("option", { value: "Basic" }, "Basic - 50 credits"),
            React.createElement("option", { value: "Pro" }, "Pro - 250 credits"),
            React.createElement("option", { value: "Agency" }, "Agency - 1500 credits"),
            React.createElement("option", { value: "AgencyUnlimited" }, "Agency Unlimited")
          )
        ),
        React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 20 } },
          React.createElement("button", { onClick: function() { setShowAddClient(false); }, style: { flex: 1, padding: 11, borderRadius: 9, border: "1.5px solid " + C.border, background: "transparent", color: C.muted, fontFamily: "Inter,sans-serif", fontSize: 13, cursor: "pointer" } }, "Cancel"),
          React.createElement(Btn, { variant: "primary", onClick: handleAddClient, disabled: addingClient }, addingClient ? "Creating..." : "Add Client")
        )
      )
    ),

    showEditModal && editClient && React.createElement("div", { style: ss.overlay, onClick: function(e) { if (e.target === e.currentTarget) setShowEditModal(false); } },
      React.createElement("div", { style: ss.modal },
        React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 20 } }, "Edit Client"),
        React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Client Name"), React.createElement(Input, { value: editClient.name || "", onChange: function(e) { setEditClient(function(c) { return Object.assign({}, c, { name: e.target.value }); }); } })),
        React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Email"), React.createElement(Input, { value: editClient.email || "", onChange: function(e) { setEditClient(function(c) { return Object.assign({}, c, { email: e.target.value }); }); } })),
        React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "New Password (leave blank to keep current)"), React.createElement(Input, { type: "password", placeholder: "New password (optional)", value: editClient.newPassword || "", onChange: function(e) { setEditClient(function(c) { return Object.assign({}, c, { newPassword: e.target.value }); }); } })),
        React.createElement("div", { style: ss.fmgroup }, React.createElement("label", { style: ss.fmlabel }, "Plan"),
          React.createElement("select", { value: editClient.plan || "Basic", onChange: function(e) { setEditClient(function(c) { return Object.assign({}, c, { plan: e.target.value }); }); }, style: { width: "100%", background: C.bg, border: "1.5px solid " + C.border, borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 16 } },
            React.createElement("option", { value: "Demo" }, "Demo - 5 credits (Free Trial)"),
            React.createElement("option", { value: "Demo" }, "Demo - 5 credits (Free Trial)"),
            React.createElement("option", { value: "Basic" }, "Basic - 50 credits"),
            React.createElement("option", { value: "Pro" }, "Pro - 250 credits"),
            React.createElement("option", { value: "Agency" }, "Agency - 1500 credits"),
            React.createElement("option", { value: "AgencyUnlimited" }, "Agency Unlimited")
          )
        ),
        React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 20 } },
          React.createElement("button", { onClick: function() { setShowEditModal(false); }, style: { flex: 1, padding: 11, borderRadius: 9, border: "1.5px solid " + C.border, background: "transparent", color: C.muted, fontFamily: "Inter,sans-serif", fontSize: 13, cursor: "pointer" } }, "Cancel"),
          React.createElement(Btn, { variant: "primary", onClick: handleEditClient }, "Save Changes")
        )
      )
    ),

    showInvoiceModal && React.createElement("div", { style: ss.overlay, onClick: function(e) { if (e.target === e.currentTarget) setShowInvoiceModal(false); } },
      React.createElement("div", { style: Object.assign({}, ss.modal, { maxWidth: 560 }) },
        React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 20 } }, "Create New Invoice"),
        React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 13, fontWeight: 600, color: C.primary, marginBottom: 12 } }, "Customer Details"),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 } },
          React.createElement("div", null, React.createElement("label", { style: ss.fmlabel }, "Customer Name *"), React.createElement(Input, { placeholder: "Ali Khan", value: newInvoice.customer.name, onChange: function(e) { setNewInvoice(function(p) { return Object.assign({}, p, { customer: Object.assign({}, p.customer, { name: e.target.value }) }); }); } })),
          React.createElement("div", null, React.createElement("label", { style: ss.fmlabel }, "Phone Number"), React.createElement(Input, { placeholder: "+92-300-0000000", value: newInvoice.customer.phone, onChange: function(e) { setNewInvoice(function(p) { return Object.assign({}, p, { customer: Object.assign({}, p.customer, { phone: e.target.value }) }); }); } })),
          React.createElement("div", null, React.createElement("label", { style: ss.fmlabel }, "Company Name"), React.createElement(Input, { placeholder: "Company Name", value: newInvoice.customer.company, onChange: function(e) { setNewInvoice(function(p) { return Object.assign({}, p, { customer: Object.assign({}, p.customer, { company: e.target.value }) }); }); } })),
          React.createElement("div", null, React.createElement("label", { style: ss.fmlabel }, "WhatsApp Number"), React.createElement(Input, { placeholder: "923001234567", value: newInvoice.customer.whatsapp, onChange: function(e) { setNewInvoice(function(p) { return Object.assign({}, p, { customer: Object.assign({}, p.customer, { whatsapp: e.target.value }) }); }); } }))
        ),
        React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 13, fontWeight: 600, color: C.primary, marginBottom: 12 } }, "Services"),
        newInvoice.services.map(function(s, i) {
          return React.createElement("div", { key: i, style: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr auto", gap: 8, marginBottom: 8 } },
            React.createElement(Input, { placeholder: "Service name", value: s.name, onChange: function(e) { var sv = newInvoice.services.slice(); sv[i] = Object.assign({}, sv[i], { name: e.target.value }); setNewInvoice(function(p) { return Object.assign({}, p, { services: sv }); }); } }),
            React.createElement(Input, { placeholder: "Qty", value: s.qty, onChange: function(e) { var sv = newInvoice.services.slice(); sv[i] = Object.assign({}, sv[i], { qty: parseInt(e.target.value) || 1 }); setNewInvoice(function(p) { return Object.assign({}, p, { services: sv }); }); } }),
            React.createElement(Input, { placeholder: "Price (PKR)", value: s.price, onChange: function(e) { var sv = newInvoice.services.slice(); sv[i] = Object.assign({}, sv[i], { price: parseInt(e.target.value) || 0 }); setNewInvoice(function(p) { return Object.assign({}, p, { services: sv }); }); } }),
            React.createElement("button", { onClick: function() { setNewInvoice(function(p) { return Object.assign({}, p, { services: p.services.filter(function(_, j) { return j !== i; }) }); }); }, style: { background: "#fee2e2", border: "none", borderRadius: 6, padding: "8px 10px", color: "#dc2626", cursor: "pointer", fontWeight: 700 } }, "X")
          );
        }),
        React.createElement("button", { onClick: function() { setNewInvoice(function(p) { return Object.assign({}, p, { services: p.services.concat([{ name: "", qty: 1, price: 0 }]) }); }); }, style: { background: "#eef2ff", border: "none", borderRadius: 8, padding: "8px 16px", color: C.primary, cursor: "pointer", fontSize: 12, fontWeight: 600, marginBottom: 16 } }, "+ Add Service"),
        React.createElement("div", { style: { background: C.bg, border: "1px solid " + C.border, borderRadius: 8, padding: "12px 16px", marginBottom: 16, textAlign: "right" } },
          React.createElement("div", { style: { fontFamily: "Poppins,sans-serif", fontSize: 18, fontWeight: 700, color: C.primary } }, "Total: " + formatPKR(calcTotal(newInvoice.services)))
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 } },
          React.createElement("div", null, React.createElement("label", { style: ss.fmlabel }, "Due Date"), React.createElement(Input, { type: "date", value: newInvoice.dueDate, onChange: function(e) { setNewInvoice(function(p) { return Object.assign({}, p, { dueDate: e.target.value }); }); } })),
          React.createElement("div", null, React.createElement("label", { style: ss.fmlabel }, "Status"),
            React.createElement("select", { value: newInvoice.status, onChange: function(e) { setNewInvoice(function(p) { return Object.assign({}, p, { status: e.target.value }); }); }, style: { width: "100%", background: C.bg, border: "1.5px solid " + C.border, borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 16 } },
              React.createElement("option", { value: "pending" }, "Pending"),
              React.createElement("option", { value: "paid" }, "Paid"),
              React.createElement("option", { value: "overdue" }, "Overdue")
            )
          )
        ),
        React.createElement("div", { style: ss.fmgroup },
          React.createElement("label", { style: ss.fmlabel }, "Notes / Terms"),
          React.createElement("textarea", { placeholder: "Additional notes or terms...", value: newInvoice.notes, onChange: function(e) { setNewInvoice(function(p) { return Object.assign({}, p, { notes: e.target.value }); }); }, style: { width: "100%", background: C.bg, border: "1.5px solid " + C.border, borderRadius: 9, padding: "11px 14px", fontFamily: "Inter,sans-serif", fontSize: 13, minHeight: 70, resize: "vertical", outline: "none" } })
        ),
        React.createElement("div", { style: { display: "flex", gap: 10 } },
          React.createElement("button", { onClick: function() { setShowInvoiceModal(false); }, style: { flex: 1, padding: 11, borderRadius: 9, border: "1.5px solid " + C.border, background: "transparent", color: C.muted, fontFamily: "Inter,sans-serif", fontSize: 13, cursor: "pointer" } }, "Cancel"),
          React.createElement(Btn, { variant: "primary", onClick: handleCreateInvoice }, "Create Invoice")
        )
      )
    ),

    toast && React.createElement("div", { style: Object.assign({}, ss.toast, { borderLeft: "4px solid " + (toastErr ? C.danger : C.success) }) }, toast)
  );
}

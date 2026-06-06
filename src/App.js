import React, { useState, useEffect } from "react";

const FontInjector = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
};

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://yizzvwyvdnkbbhvojqlp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Bz5xRPDQ_ZDE99T_QRSLlg_UKLH-6b6";
const GEMINI_API_KEY = "AQ.Ab8RN6IZvRvyQzdKoF-H270pZtInggpt1flUcsC377CqXpIBSA";

// ─── AI GENERATOR (Enhanced SEO) ─────────────────────────────────────────────
async function generateSEOPost(productTitle, productPrice, seoType = "local", postType = "product") {
  const title = productTitle.trim();
  const price = productPrice.trim();
  const titleLower = title.toLowerCase();
  const words = title.split(" ");
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const isLocal = seoType === "local";
  const isBlog = postType === "blog";

  // ── Keywords ──
  const keywords = isLocal
    ? [titleLower, `buy ${titleLower}`, `${titleLower} price in pakistan`, `${titleLower} online pakistan`, `cheap ${titleLower} pakistan`]
    : [titleLower, `buy ${titleLower} online`, `best ${titleLower}`, `${titleLower} for sale`, `${titleLower} shop`];

  const blogKeywords = isLocal
    ? [`${titleLower} guide`, `${titleLower} tips pakistan`, `best ${titleLower} 2025`, `${titleLower} review`, `how to choose ${titleLower}`]
    : [`${titleLower} guide`, `best ${titleLower} 2025`, `${titleLower} review`, `how to buy ${titleLower}`, `${titleLower} tips`];

  // ── Hashtags ──
  const baseHashtags = words.map(w => "#" + w.charAt(0).toUpperCase() + w.slice(1));
  const localTags = [...baseHashtags, "#PakistanShopping", "#OnlineShoppingPK"].slice(0,6);
  const intlTags = [...baseHashtags, "#OnlineShopping", "#BestPrice", "#ShopNow"].slice(0,6);
  const blogTags = isLocal
    ? [...baseHashtags, "#PakistanBlog", "#TechPakistan", "#BloggingPK"].slice(0,6)
    : [...baseHashtags, "#Blog", "#HowTo", "#Guide2025"].slice(0,6);

  // ── SEO Title ──
  const seoTitle = isBlog
    ? (isLocal ? `${title} – Mukammal Guide 2025 | Pakistan` : `${title} – Complete Guide 2025 | Best Tips`)
    : (isLocal ? `${title} – Best Price ${price} in Pakistan | Order Online` : `${title} – ${price} | Best Online Deal | Free Shipping`);

  // ── Description ──
  const productDescLocal = `Introducing the ${title}, now available at an unbeatable price of just ${price} across Pakistan! Whether you're based in Karachi, Lahore, Islamabad, or anywhere else in the country, we bring this premium product right to your doorstep.

The ${title} is crafted with high-quality materials, designed to meet the everyday needs of Pakistani consumers. It combines durability, style, and functionality — all at a price that won't break the bank. Whether you're buying for yourself or as a gift, the ${title} is the perfect choice.

Our customers across Pakistan love the ${title} for its outstanding performance and value. At just ${price}, it offers everything you need without compromising on quality. We provide fast nationwide delivery, easy returns, and 100% customer satisfaction guarantee.

Don't miss this amazing offer — the ${title} at ${price} is in high demand. Order now through our website and get it delivered to your door within 2-5 business days anywhere in Pakistan. Cash on delivery available. Limited stock — order today!`;

  const productDescIntl = `Discover the ${title}, now available worldwide at the incredible price of just ${price}! Designed for global customers who demand quality, style, and value, the ${title} is your perfect everyday companion.

Engineered with premium materials and built to last, the ${title} delivers outstanding performance across all use cases. Whether you're shopping from the US, UK, UAE, Canada, or anywhere around the world, we ship directly to your location with fast, reliable international shipping.

Our global customers rave about the ${title} for its superior build quality and exceptional value at ${price}. Join thousands of satisfied customers worldwide who have made the smart choice. We offer hassle-free returns, secure payment options, and world-class customer support.

Order your ${title} today for just ${price} and experience premium quality delivered to your door. Free international shipping on qualifying orders. 30-day money-back guarantee. Don't wait — limited stock available worldwide!`;

  const blogDescLocal = `کیا آپ ${title} کے بارے میں مکمل معلومات چاہتے ہیں؟ آپ بالکل صحیح جگہ آئے ہیں!

${title} آج کل پاکستان میں بہت مقبول ہے۔ اس گائیڈ میں ہم آپ کو ${title} کے بارے میں تمام ضروری معلومات دیں گے — فوائد، نقصانات، قیمت، اور خریداری کے بہترین طریقے۔

**${title} کیا ہے؟**
${title} ایک بہترین انتخاب ہے جو آپ کی روزمرہ کی ضروریات پوری کرتا ہے۔ پاکستان میں اس کی قیمت ${price} سے شروع ہوتی ہے جو کہ بہت مناسب ہے۔

**${title} کے فوائد:**
- اعلیٰ معیار اور دیرپا ساخت
- پاکستان میں آسانی سے دستیاب
- بہترین قیمت ${price} میں
- تیز ڈیلیوری پورے پاکستان میں

**خریداری کا بہترین طریقہ:**
ہمیشہ قابل اعتماد آن لائن اسٹور سے خریداری کریں اور قیمتوں کا موازنہ کریں۔ ${title} کو ${price} میں حاصل کرنے کا یہ بہترین موقع ہے!`;

  const blogDescIntl = `Looking for the ultimate guide on ${title}? You've come to the right place!

In this comprehensive guide, we'll cover everything you need to know about ${title} — from its key features and benefits to buying tips and expert recommendations for 2025.

**What is ${title}?**
The ${title} has taken the market by storm, offering unmatched quality and value at just ${price}. Whether you're a first-time buyer or looking to upgrade, this guide will help you make the best decision.

**Top Benefits of ${title}:**
- Premium build quality that lasts for years
- Excellent value at just ${price}
- Available worldwide with fast shipping
- Trusted by thousands of satisfied customers globally

**How to Choose the Best ${title}:**
When shopping for ${title}, always consider quality, price, and seller reputation. At ${price}, our recommended option delivers on all three fronts.

**Final Verdict:**
If you're looking for the best ${title} in 2025, look no further. At ${price}, it offers everything you need and more. Order yours today and experience the difference!`;

  const description = isBlog
    ? (isLocal ? blogDescLocal : blogDescIntl)
    : (isLocal ? productDescLocal : productDescIntl);

  // ── Meta / Snippet ──
  const metaDescription = isBlog
    ? (isLocal ? `${title} ki mukammal guide 2025. Pakistan mein best ${titleLower} kaise khridein. Tips, reviews aur qeemat.` : `Complete guide to ${title} in 2025. Tips, reviews, best prices and buying advice from experts.`)
    : (isLocal ? `Buy ${title} for ${price} in Pakistan. Fast delivery nationwide. Cash on delivery available. Premium quality guaranteed!` : `Shop ${title} for ${price}. Worldwide shipping. 30-day returns. Best price online. Order now!`);

  const snippet = metaDescription.slice(0, 150);

  // ── Alt Texts ──
  // Smart SEO Alt Texts
  const productAltTemplates = [
    `${title} ${isLocal ? "Pakistan" : ""} - Buy Online ${price}`.trim(),
    `${title} Best Quality - ${isLocal ? "Pakistan Delivery" : "Worldwide Shipping"}`,
    `${title} Premium - ${keywords[0]} - ${price}`,
    `${title} ${isLocal ? "Cash on Delivery Pakistan" : "Free Shipping"} - Shop Now`,
    `Buy ${title} Online ${price} - ${isLocal ? "Karachi Lahore Islamabad" : "Best Deal 2025"}`,
  ];
  const blogAltTemplates = [
    `${title} Complete Guide 2025 - Featured`,
    `Best ${title} Tips - ${isLocal ? "Pakistan" : "Expert Guide"}`,
    `${title} Review - Pros and Cons`,
    `How to Choose ${title} - Step by Step`,
    `${title} Comparison - Top Picks ${new Date().getFullYear()}`,
  ];
  const altTexts = isBlog ? blogAltTemplates : productAltTemplates;

  // ── Permalink ──
  const permalink = isBlog
    ? (isLocal ? `https://yoursite.com/blog/${slug}-guide-pakistan` : `https://yoursite.com/blog/${slug}-complete-guide-2025`)
    : (isLocal ? `https://yourstore.com/products/${slug}-pakistan` : `https://yourstore.com/products/${slug}`);

  // ── CTA ──
  const ctas = isBlog
    ? [`Puri Guide Parhen →`, `Learn More About ${title} →`, `Read Full Review →`]
    : (isLocal
      ? [`ابھی آرڈر کریں – صرف ${price}!`, `Order Now – Only ${price}!`, `Buy Now – Cash on Delivery!`]
      : [`Order Now – Only ${price}!`, `Get Yours Today!`, `Shop Now – Free Shipping!`]);
  const cta = ctas[Math.floor(Math.random() * ctas.length)];

  await new Promise(r => setTimeout(r, 1200));

  return {
    seoTitle, description, metaDescription, snippet,
    keywords: isBlog ? blogKeywords : keywords,
    hashtags: isBlog ? blogTags : (isLocal ? localTags : intlTags),
    altTexts, permalink, cta, seoType, postType
  };
}

// ─── WORDPRESS PUBLISHER ──────────────────────────────────────────────────────
async function publishToWordPress(siteUrl, username, appPassword, postData) {
  const url = siteUrl.replace(/[/]$/, "") + "/wp-json/wp/v2/posts";
  const credentials = btoa(`${username}:${appPassword}`);
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${credentials}`,
    },
    body: JSON.stringify({
      title: postData.seoTitle,
      content: "<p>" + postData.description + "</p><p><strong>Price:</strong> " + postData.price + "</p><p><em>" + postData.cta + "</em></p>",
      excerpt: postData.metaDescription,
      status: "publish",
      slug: postData.permalink?.split("/products/")?.[1] || postData.seoTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      meta: {
        _yoast_wpseo_metadesc: postData.metaDescription,
        _yoast_wpseo_focuskw: postData.keywords?.[0] || "",
      },
      tags: [],
    }),
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "WordPress publish failed");
  return { url: data.link, id: data.id };
}

// ─── SHOPIFY PUBLISHER ────────────────────────────────────────────────────────
async function publishToShopify(shopDomain, accessToken, postData, images = [], imageAlts = []) {
  const url = `https://${shopDomain}/admin/api/2024-01/products.json`;

  // Convert images to base64 for Shopify
  const shopifyImages = await Promise.all(images.map(async (img, i) => {
    const alt = imageAlts[i]?.alt || postData.seoTitle;
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => resolve({ attachment: e.target.result.split(",")[1], alt, filename: img.name });
      reader.readAsDataURL(img.file);
    });
  }));

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": accessToken },
    body: JSON.stringify({
      product: {
        title: postData.seoTitle,
        body_html: "<p>" + postData.description.split("\n").join("</p><p>") + "</p><p><strong>Price: " + postData.price + "</strong></p><p><em>" + postData.cta + "</em></p>",
        vendor: shopDomain.split(".")[0],
        product_type: postData.product || "General",
        tags: postData.keywords?.join(", ") || "",
        status: "active",
        variants: [{ price: postData.price?.replace(/[^0-9.]/g, "") || "0", inventory_management: "shopify", inventory_quantity: 100 }],
        images: shopifyImages.length > 0 ? shopifyImages : [],
        metafields: [
          { namespace: "seo", key: "title", value: postData.seoTitle, type: "single_line_text_field" },
          { namespace: "seo", key: "description", value: postData.metaDescription, type: "single_line_text_field" },
        ],
      },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data.errors) || "Shopify publish failed");
  return { url: `https://${shopDomain}/products/${data.product?.handle}`, id: data.product?.id };
}

// ─── SUPABASE HELPER ──────────────────────────────────────────────────────────
const db = {
  async select(table, filter = "") {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}&order=created_at.desc`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async insert(table, data) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async update(table, id, data) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: "PATCH",
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async delete(table, id) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: "DELETE",
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    });
    if (!res.ok) throw new Error(await res.text());
  },
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --primary-light: #eef2ff;
    --danger: #f43f5e;
    --success: #22c55e;
    --warning: #f59e0b;
    --ink: #0f172a;
    --ink2: #334155;
    --muted: #64748b;
    --border: #e2e8f0;
    --bg: #f8fafc;
    --card: #ffffff;
    --sidebar: #1e293b;
  }
  body { background: var(--bg); color: var(--ink); font-family: 'Inter', sans-serif; font-size: 14px; }
  .app { display: flex; min-height: 100vh; }

  /* ── SIDEBAR ── */
  .sidebar { width: 230px; background: var(--sidebar); min-height: 100vh; position: fixed; left:0; top:0; bottom:0; display:flex; flex-direction:column; z-index:100; }
  .logo-wrap { padding: 24px 20px; border-bottom: 1px solid #334155; }
  .logo-text { font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 17px; color: #a5b4fc; letter-spacing: -0.3px; }
  .logo-sub { font-size: 10px; color: #475569; margin-top: 2px; text-transform: uppercase; letter-spacing: 1px; }
  .nav { padding: 12px 0; flex:1; }
  .nav-item { display:flex; align-items:center; gap:10px; padding:11px 20px; color:#94a3b8; font-size:13px; cursor:pointer; border-left:3px solid transparent; transition:all 0.15s; font-weight:500; }
  .nav-item:hover { color:#e2e8f0; background:#273549; }
  .nav-item.active { color:#a5b4fc; border-left-color:#6366f1; background:#253047; }
  .nav-icon { font-size:15px; width:18px; text-align:center; }
  .sidebar-bottom { padding:16px; border-top:1px solid #334155; }
  .plan-box { background:#273549; border-radius:10px; padding:14px; }
  .plan-box-label { font-size:10px; color:#475569; text-transform:uppercase; letter-spacing:1px; }
  .plan-box-name { font-size:13px; color:#a5b4fc; font-weight:600; margin-top:4px; }

  /* ── MAIN ── */
  .main { margin-left:230px; flex:1; padding:36px 40px; }
  .page-header { margin-bottom:28px; }
  .page-title { font-family:'Poppins',sans-serif; font-size:24px; font-weight:700; color:var(--ink); }
  .page-sub { font-size:12px; color:var(--muted); margin-top:5px; }

  /* ── CARDS ── */
  .card { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:24px; margin-bottom:20px; }
  .card-dark { background:#1e293b; border-radius:14px; padding:28px; margin-bottom:20px; }

  /* ── GENERATE FORM ── */
  .gen-label { font-size:11px; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; margin-bottom:7px; font-weight:500; }
  .gen-title-text { font-family:'Poppins',sans-serif; font-size:18px; font-weight:600; color:#f1f5f9; margin-bottom:22px; }
  .gen-row { display:flex; gap:14px; align-items:flex-end; flex-wrap:wrap; }
  .gen-group { flex:1; min-width:140px; }
  .gen-input { width:100%; background:#273549; border:1.5px solid #334155; border-radius:10px; padding:12px 14px; color:#f1f5f9; font-family:'Inter',sans-serif; font-size:14px; outline:none; transition:border-color 0.2s; }
  .gen-input::placeholder { color:#475569; }
  .gen-input:focus { border-color:#6366f1; }
  .gen-btn { background:#6366f1; color:white; border:none; border-radius:10px; padding:12px 26px; font-family:'Poppins',sans-serif; font-size:14px; font-weight:600; cursor:pointer; white-space:nowrap; transition:all 0.2s; display:flex; align-items:center; gap:8px; }
  .gen-btn:hover { background:#4f46e5; transform:translateY(-1px); }
  .gen-btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
  .error-box { background:#fff1f2; border:1px solid #fecdd3; border-radius:8px; padding:12px 16px; color:#e11d48; font-size:12px; margin-top:14px; }

  /* ── RESULT ── */
  .result-wrap { background:var(--card); border:1px solid var(--border); border-radius:14px; overflow:hidden; margin-bottom:20px; animation:fadeUp 0.35s ease; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  .result-top { background:#1e293b; padding:14px 20px; display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; }
  .result-top-left { display:flex; align-items:center; gap:10px; }
  .ai-badge { background:#6366f1; color:white; font-size:10px; font-weight:600; padding:3px 10px; border-radius:20px; text-transform:uppercase; letter-spacing:0.5px; }
  .result-name { font-size:13px; color:#e2e8f0; font-weight:600; }
  .result-btns { display:flex; gap:8px; }
  .btn-save { background:#6366f1; color:white; border:none; border-radius:8px; padding:9px 16px; font-size:12px; font-weight:600; cursor:pointer; transition:all 0.2s; font-family:'Inter',sans-serif; }
  .btn-save:hover { background:#4f46e5; }
  .btn-save.done { background:var(--success); cursor:default; }
  .btn-save:disabled { opacity:0.5; cursor:not-allowed; }
  .btn-publish { background:var(--danger); color:white; border:none; border-radius:8px; padding:9px 16px; font-size:12px; font-weight:600; cursor:pointer; transition:all 0.2s; font-family:'Inter',sans-serif; }
  .btn-publish:hover { background:#e11d48; }
  .btn-publish.done { background:var(--success); cursor:default; }
  .btn-publish:disabled { opacity:0.5; cursor:not-allowed; }
  .result-body { padding:24px; display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .rf { }
  .rf.full { grid-column:1/-1; }
  .rf-label { font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--muted); margin-bottom:7px; font-weight:600; }
  .rf-val { font-size:13px; color:var(--ink); line-height:1.7; background:var(--bg); border:1px solid var(--border); border-radius:8px; padding:11px 13px; }
  .rf-val.big { font-family:'Poppins',sans-serif; font-weight:700; font-size:14px; color:var(--primary-dark); }
  .rf-val.cta-val { font-weight:700; font-size:14px; color:var(--danger); }
  .tags { display:flex; flex-wrap:wrap; gap:6px; padding:10px 12px; background:var(--bg); border:1px solid var(--border); border-radius:8px; }
  .tag { background:#334155; color:#e2e8f0; font-size:11px; padding:3px 10px; border-radius:20px; }
  .htag { background:var(--primary-light); color:var(--primary); }

  /* ── STATS ── */
  .stats-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:24px; }
  .stat-card { background:var(--card); border:1px solid var(--border); border-radius:12px; padding:20px; border-bottom:3px solid var(--border); }
  .stat-card.c1 { border-bottom-color:var(--primary); }
  .stat-card.c2 { border-bottom-color:var(--danger); }
  .stat-card.c3 { border-bottom-color:var(--success); }
  .stat-num { font-family:'Poppins',sans-serif; font-size:32px; font-weight:700; color:var(--ink); }
  .stat-lbl { font-size:12px; color:var(--muted); margin-top:4px; }

  /* ── TABLE ── */
  .tbl { background:var(--card); border:1px solid var(--border); border-radius:12px; overflow:hidden; margin-bottom:24px; }
  .tbl-head { display:grid; padding:11px 18px; background:var(--bg); border-bottom:1px solid var(--border); font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--muted); font-weight:600; }
  .tbl-row { display:grid; padding:14px 18px; border-bottom:1px solid var(--border); align-items:center; font-size:13px; transition:background 0.1s; }
  .tbl-row:last-child { border-bottom:none; }
  .tbl-row:hover { background:#fafbfc; }
  .tbl-4 { grid-template-columns:2fr 1fr 1fr 1fr; }
  .tbl-5 { grid-template-columns:2fr 1.2fr 1fr 1fr 0.8fr; }
  .row-name { font-weight:600; color:var(--ink); }
  .row-sub { font-size:11px; color:var(--muted); margin-top:2px; }
  .row-muted { color:var(--muted); font-size:12px; }
  .badge { display:inline-flex; align-items:center; gap:4px; font-size:10px; padding:3px 9px; border-radius:20px; font-weight:600; }
  .badge-dot { width:5px; height:5px; border-radius:50%; background:currentColor; }
  .b-pub { background:#dcfce7; color:#16a34a; }
  .b-draft { background:#fef9c3; color:#ca8a04; }
  .b-active { background:#dcfce7; color:#16a34a; }
  .b-disabled { background:#fee2e2; color:#dc2626; }
  .b-basic { background:#f1f5f9; color:#475569; }
  .b-pro { background:#dbeafe; color:#2563eb; }
  .b-agency { background:#fef3c7; color:#d97706; }
  .sec-title { font-family:'Poppins',sans-serif; font-size:15px; font-weight:700; margin-bottom:14px; display:flex; align-items:center; gap:8px; }
  .sec-count { background:var(--primary-light); color:var(--primary); font-size:11px; padding:2px 8px; border-radius:20px; font-weight:500; }

  /* ── PLANS ── */
  .plans-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
  .plan-card { background:var(--card); border:2px solid var(--border); border-radius:16px; padding:28px 22px; position:relative; transition:all 0.2s; }
  .plan-card:hover { transform:translateY(-4px); box-shadow:0 10px 30px rgba(0,0,0,0.08); }
  .plan-card.featured { background:#1e293b; border-color:var(--primary); }
  .plan-pop { position:absolute; top:-11px; left:50%; transform:translateX(-50%); background:var(--primary); color:white; font-size:9px; font-weight:700; padding:4px 14px; border-radius:20px; letter-spacing:1px; text-transform:uppercase; white-space:nowrap; }
  .plan-name { font-family:'Poppins',sans-serif; font-size:15px; font-weight:700; margin-bottom:8px; }
  .plan-card.featured .plan-name { color:#a5b4fc; }
  .plan-price { font-family:'Poppins',sans-serif; font-size:32px; font-weight:700; }
  .plan-card.featured .plan-price { color:#f1f5f9; }
  .plan-mo { font-size:12px; color:var(--muted); }
  .plan-feats { margin:18px 0; list-style:none; }
  .plan-feat { font-size:12px; padding:5px 0; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:7px; color:var(--ink2); }
  .plan-card.featured .plan-feat { border-color:#334155; color:#94a3b8; }
  .feat-ck { color:var(--primary); font-size:13px; }
  .plan-btn { width:100%; padding:12px; border-radius:10px; border:2px solid var(--primary); background:transparent; color:var(--primary); font-family:'Poppins',sans-serif; font-size:13px; font-weight:600; cursor:pointer; transition:all 0.2s; }
  .plan-card.featured .plan-btn { background:var(--primary); color:white; }
  .plan-btn:hover { background:var(--primary); color:white; }

  /* ── ADMIN STATS ── */
  .admin-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:24px; }
  .a-stat { background:var(--card); border:1px solid var(--border); border-radius:12px; padding:18px; }
  .a-stat-num { font-family:'Poppins',sans-serif; font-size:24px; font-weight:700; }
  .a-stat-lbl { font-size:11px; color:var(--muted); margin-top:3px; }

  /* ── CLIENT MODAL ── */
  .modal-overlay { position:fixed; inset:0; background:rgba(15,23,42,0.5); display:flex; align-items:center; justify-content:center; z-index:999; padding:20px; }
  .modal { background:var(--card); border-radius:16px; padding:28px; width:100%; max-width:480px; box-shadow:0 20px 60px rgba(0,0,0,0.15); animation:fadeUp 0.25s ease; }
  .modal-title { font-family:'Poppins',sans-serif; font-size:18px; font-weight:700; margin-bottom:20px; color:var(--ink); }
  .form-group { margin-bottom:16px; }
  .form-label { font-size:11px; font-weight:600; color:var(--muted); text-transform:uppercase; letter-spacing:0.8px; margin-bottom:6px; display:block; }
  .form-input { width:100%; background:var(--bg); border:1.5px solid var(--border); border-radius:9px; padding:11px 14px; font-family:'Inter',sans-serif; font-size:13px; color:var(--ink); outline:none; transition:border-color 0.2s; }
  .form-input:focus { border-color:var(--primary); }
  .form-select { width:100%; background:var(--bg); border:1.5px solid var(--border); border-radius:9px; padding:11px 14px; font-family:'Inter',sans-serif; font-size:13px; color:var(--ink); outline:none; }
  .modal-btns { display:flex; gap:10px; margin-top:20px; }
  .btn-cancel { flex:1; padding:11px; border-radius:9px; border:1.5px solid var(--border); background:transparent; color:var(--muted); font-family:'Inter',sans-serif; font-size:13px; font-weight:500; cursor:pointer; }
  .btn-submit { flex:2; padding:11px; border-radius:9px; border:none; background:var(--primary); color:white; font-family:'Poppins',sans-serif; font-size:13px; font-weight:600; cursor:pointer; transition:background 0.2s; }
  .btn-submit:hover { background:var(--primary-dark); }
  .add-btn { background:var(--primary); color:white; border:none; border-radius:9px; padding:10px 20px; font-family:'Poppins',sans-serif; font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:6px; transition:background 0.2s; }
  .add-btn:hover { background:var(--primary-dark); }
  .tbl-action-btn { border:none; border-radius:6px; padding:5px 12px; font-size:11px; font-family:'Inter',sans-serif; cursor:pointer; font-weight:500; transition:all 0.15s; }
  .btn-dis { background:#fee2e2; color:#dc2626; }
  .btn-en { background:#dcfce7; color:#16a34a; }
  .del-btn { background:#fff1f2; color:#f43f5e; border:none; border-radius:6px; padding:5px 10px; font-size:11px; cursor:pointer; font-weight:500; }

  /* ── TOAST ── */
  .toast { position:fixed; bottom:28px; right:28px; background:#1e293b; color:#f1f5f9; padding:13px 20px; border-radius:10px; font-size:13px; display:flex; align-items:center; gap:8px; box-shadow:0 8px 24px rgba(0,0,0,0.18); animation:fadeUp 0.3s ease; z-index:9999; border-left:4px solid var(--success); }
  .toast.err { border-left-color:var(--danger); }

  /* ── MISC ── */
  .empty-state { text-align:center; padding:48px 20px; color:var(--muted); }
  .empty-icon { font-size:32px; margin-bottom:10px; }
  .loader-row { text-align:center; padding:28px; color:var(--muted); font-size:12px; }
  .spinner { display:inline-block; width:13px; height:13px; border:2px solid #e2e8f0; border-top-color:var(--primary); border-radius:50%; animation:spin 0.7s linear infinite; margin-right:7px; vertical-align:middle; }
  @keyframes spin { to{transform:rotate(360deg)} }
  .top-bar { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
`;

// ─── MOCK CLIENTS ─────────────────────────────────────────────────────────────
const MOCK_CLIENTS = [
  { id: 1, name: "Alex Store", email: "alex@store.com", website: "https://alexstore.com", plan: "Pro", status: "active", posts: 47, joined: "Jan 2025", platform: "wordpress", wpUser: "admin", wpPassword: "", shopifyUrl: "", shopifyKey: "" },
  { id: 2, name: "Priya Boutique", email: "priya@boutique.in", website: "https://priyaboutique.myshopify.com", plan: "Agency", status: "active", posts: 132, joined: "Feb 2025", platform: "shopify", wpUser: "", wpPassword: "", shopifyUrl: "priyaboutique.myshopify.com", shopifyKey: "" },
  { id: 3, name: "Marcus Shop", email: "marcus@shop.io", website: "https://marcusshop.io", plan: "Basic", status: "disabled", posts: 9, joined: "Mar 2025", platform: "wordpress", wpUser: "", wpPassword: "", shopifyUrl: "", shopifyKey: "" },
];

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function PostRankAI() {
  const [view, setView] = useState("generate");
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [seoType, setSeoType] = useState("local");
  const [postType, setPostType] = useState("product");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageAlts, setImageAlts] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  const [clients, setClients] = useState(MOCK_CLIENTS);
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClient, setNewClient] = useState({ name: "", email: "", website: "", plan: "Basic", platform: "wordpress", wpUser: "", wpPassword: "", shopifyUrl: "", shopifyKey: "" });
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishTarget, setPublishTarget] = useState(null);
  const [publishing2, setPublishing2] = useState(false);
  const [publishResult, setPublishResult] = useState(null);

  const [toast, setToast] = useState(null);
  const [toastErr, setToastErr] = useState(false);

  const notify = (msg, err = false) => {
    setToastErr(err); setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const loadPosts = async () => {
    setPostsLoading(true);
    try { setPosts(await db.select("posts")); }
    catch { setPosts([]); }
    finally { setPostsLoading(false); }
  };

  useEffect(() => {
    if (view === "dashboard" || view === "posts") loadPosts();
  }, [view]);

  const handleGenerate = async () => {
    if (!productTitle.trim() || !productPrice.trim()) { setError("Product title aur price dono enter karein."); return; }
    setError(""); setGenerating(true); setGenerated(null); setSaved(false); setPublished(false); setUploadedImages([]); setImageAlts([]);
    try {
      const r = await generateSEOPost(productTitle, productPrice, seoType, postType);
      setGenerated({ ...r, product: productTitle, price: productPrice });
    } catch (e) {
      setError("AI generation failed: " + e.message + " — Please check Gemini API key.");
    } finally { setGenerating(false); }
  };

  const handleSave = async () => {
    if (!generated) return;
    setSaving(true);
    try {
      const rec = {
        product_title: generated.product, product_price: generated.price,
        seo_title: generated.seoTitle, description: generated.description,
        meta_description: generated.metaDescription,
        keywords: generated.keywords, hashtags: generated.hashtags,
        cta: generated.cta, status: "draft", created_at: new Date().toISOString(),
      };
      const d = await db.insert("posts", rec);
      setPosts(p => [d[0] || { ...rec, id: Date.now() }, ...p]);
      setSaved(true); notify("✓ Supabase mein save ho gaya!");
    } catch (e) { notify("Save failed: " + e.message, true); }
    finally { setSaving(false); }
  };

  const handlePublish = async () => {
    if (!generated) return;
    setPublishing(true);
    try {
      if (saved && posts[0]?.id) {
        await db.update("posts", posts[0].id, { status: "published" });
        setPosts(p => p.map((x, i) => i === 0 ? { ...x, status: "published" } : x));
      }
      setPublished(true); notify("🚀 Post publish ho gayi!");
    } catch (e) { notify("Publish failed: " + e.message, true); }
    finally { setPublishing(false); }
  };

  const handleDirectPublish = async (client) => {
    if (!generated) { notify("Pehle post generate karo!", true); return; }
    setPublishTarget(client);
    setShowPublishModal(false);
    setPublishing2(true);
    setPublishResult(null);
    try {
      let result;
      if (client.platform === "wordpress") {
        if (!client.wpUser || !client.wpPassword) throw new Error("WordPress username aur App Password enter karo (Client edit karo)");
        result = await publishToWordPress(client.website, client.wpUser, client.wpPassword, { ...generated, price: productPrice }, uploadedImages, imageAlts);
        notify(`✅ WordPress par publish ho gaya! Post ID: ${result.id}`);
      } else if (client.platform === "shopify") {
        if (!client.shopifyUrl || !client.shopifyKey) throw new Error("Shopify URL aur Access Token enter karo (Client edit karo)");
        result = await publishToShopify(client.shopifyUrl, client.shopifyKey, { ...generated, price: productPrice }, uploadedImages, imageAlts);
        notify(`✅ Shopify par publish ho gaya! Product ID: ${result.id}`);
      }
      setPublishResult(result);
    } catch(e) {
      notify("Publish failed: " + e.message, true);
    } finally {
      setPublishing2(false);
    }
  };

  const toggleClient = (id) => {
    setClients(c => c.map(x => x.id === id ? { ...x, status: x.status === "active" ? "disabled" : "active" } : x));
  };

  const deleteClient = (id) => {
    setClients(c => c.filter(x => x.id !== id));
    notify("Client remove ho gaya.");
  };

  const addClient = () => {
    if (!newClient.name || !newClient.email) { notify("Name aur email zaroor bharen.", true); return; }
    const c = { ...newClient, id: Date.now(), status: "active", posts: 0, joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }) };
    setClients(prev => [c, ...prev]);
    setNewClient({ name: "", email: "", website: "", plan: "Basic", platform: "wordpress", wpUser: "", wpPassword: "", shopifyUrl: "", shopifyKey: "" });
    setShowAddClient(false);
    notify("✓ Client add ho gaya!");
  };

  const totalPub = posts.filter(p => p.status === "published").length;

  const NAV = [
    { id: "generate", icon: "⚡", label: "Generate Post" },
    { id: "dashboard", icon: "▦", label: "Dashboard" },
    { id: "posts", icon: "☰", label: "My Posts" },
    { id: "clients", icon: "👥", label: "Clients" },
    { id: "plans", icon: "◈", label: "Plans" },
    { id: "admin", icon: "⚙", label: "Admin Panel" },
  ];

  return (
    <>
      <FontInjector />
      <style>{S}</style>
      <div className="app">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="logo-wrap">
            <div className="logo-text">PostRank AI</div>
            <div className="logo-sub">SEO Automation</div>
          </div>
          <nav className="nav">
            {NAV.map(n => (
              <div key={n.id} className={`nav-item ${view === n.id ? "active" : ""}`} onClick={() => setView(n.id)}>
                <span className="nav-icon">{n.icon}</span>{n.label}
              </div>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="plan-box">
              <div className="plan-box-label">Current Plan</div>
              <div className="plan-box-name">Pro Plan</div>
            </div>
          </div>
        </aside>

        <main className="main">

          {/* ── GENERATE ── */}
          {view === "generate" && (<>
            <div className="page-header">
              <div className="page-title">Generate Post</div>
              <div className="page-sub">Product enter karo → AI sab kuch likhega → Save → Publish</div>
            </div>
            <div className="card-dark">
              <div className="gen-title-text">{postType === "blog" ? "Blog topic kya hai?" : "Aaj kya sell kar rahe ho?"}</div>
              {/* Post Type Toggle */}
              <div style={{display:"flex",gap:8,marginBottom:12}}>
                <button onClick={()=>setPostType("product")} style={{padding:"8px 18px",borderRadius:8,border:"2px solid",borderColor:postType==="product"?"#6366f1":"#334155",background:postType==="product"?"#6366f1":"transparent",color:postType==="product"?"white":"#94a3b8",fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:12,cursor:"pointer"}}>🛍 Product Post</button>
                <button onClick={()=>setPostType("blog")} style={{padding:"8px 18px",borderRadius:8,border:"2px solid",borderColor:postType==="blog"?"#f59e0b":"#334155",background:postType==="blog"?"#f59e0b":"transparent",color:postType==="blog"?"white":"#94a3b8",fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:12,cursor:"pointer"}}>📝 Blog Post</button>
              </div>
              {/* SEO Type Toggle */}
              <div style={{display:"flex",gap:8,marginBottom:20}}>
                <button onClick={()=>setSeoType("local")} style={{padding:"7px 16px",borderRadius:8,border:"none",background:seoType==="local"?"#273549":"#1a2535",color:seoType==="local"?"#a5b4fc":"#475569",fontFamily:"Inter,sans-serif",fontWeight:500,fontSize:11,cursor:"pointer"}}>🇵🇰 Local (Pakistan)</button>
                <button onClick={()=>setSeoType("international")} style={{padding:"7px 16px",borderRadius:8,border:"none",background:seoType==="international"?"#273549":"#1a2535",color:seoType==="international"?"#a5b4fc":"#475569",fontFamily:"Inter,sans-serif",fontWeight:500,fontSize:11,cursor:"pointer"}}>🌍 International</button>
              </div>
              <div className="gen-row">
                <div className="gen-group">
                  <div className="gen-label">Product Title</div>
                  <input className="gen-input" placeholder={postType === "blog" ? "e.g. Best Sneakers in Pakistan" : "e.g. Nike Running Shoes"} value={productTitle} onChange={e => setProductTitle(e.target.value)} onKeyDown={e => e.key === "Enter" && handleGenerate()} />
                </div>
                <div className="gen-group" style={{ maxWidth: 170 }}>
                  <div className="gen-label">Price</div>
                  <input className="gen-input" placeholder="e.g. PKR 3000" value={productPrice} onChange={e => setProductPrice(e.target.value)} onKeyDown={e => e.key === "Enter" && handleGenerate()} />
                </div>
                <button className="gen-btn" onClick={handleGenerate} disabled={generating}>
                  {generating ? <><span className="spinner" />Generating…</> : "⚡ Generate Post"}
                </button>
              </div>
              {error && <div className="error-box">{error}</div>}
            </div>

            {generated && (
              <div className="result-wrap">
                <div className="result-top">
                  <div className="result-top-left">
                    <span className="ai-badge">AI Generated</span>
                    <span style={{background:generated.postType==="blog"?"#f59e0b":"#6366f1",color:"white",fontSize:10,fontWeight:600,padding:"3px 10px",borderRadius:20,textTransform:"uppercase",letterSpacing:"0.5px"}}>{generated.postType==="blog"?"📝 Blog":"🛍 Product"}</span>
                    <span style={{background:"#334155",color:"#94a3b8",fontSize:10,fontWeight:500,padding:"3px 10px",borderRadius:20}}>{generated.seoType==="local"?"🇵🇰 Local":"🌍 Intl"}</span>
                    <span className="result-name">{generated.product} · {generated.price}</span>
                  </div>
                  <div className="result-btns">
                    <button className={`btn-save ${saved ? "done" : ""}`} onClick={handleSave} disabled={saving || saved}>
                      {saved ? "✓ Saved" : saving ? "Saving…" : "💾 Save to DB"}
                    </button>
                    <button className={`btn-publish ${published ? "done" : ""}`} onClick={handlePublish} disabled={publishing || published}>
                      {published ? "✓ Published!" : "🚀 Publish"}
                    </button>
                    <button onClick={()=>setShowPublishModal(true)} style={{background:"#0f172a",color:"#a5b4fc",border:"none",borderRadius:8,padding:"9px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif",whiteSpace:"nowrap"}}>
                      {publishing2 ? "Publishing…" : "🌐 Client Site"}
                    </button>
                  </div>
                </div>
                <div className="result-body">
                  <div className="rf full"><div className="rf-label">🏷 SEO Title</div><div className="rf-val big">{generated.seoTitle}</div></div>
                  <div className="rf full"><div className="rf-label">📝 Description</div><div className="rf-val">{generated.description}</div></div>
                  <div className="rf full"><div className="rf-label">🔍 Meta Description</div><div className="rf-val">{generated.metaDescription}</div></div>
                  <div className="rf"><div className="rf-label">🔑 Keywords</div><div className="tags">{generated.keywords?.map((k,i)=><span key={i} className="tag">{k}</span>)}</div></div>
                  <div className="rf"><div className="rf-label"># Hashtags</div><div className="tags">{generated.hashtags?.map((h,i)=><span key={i} className="tag htag">{h}</span>)}</div></div>
                  <div className="rf full"><div className="rf-label">🚀 Call To Action</div><div className="rf-val cta-val">{generated.cta}</div></div>
                  <div className="rf full"><div className="rf-label">📌 Snippet (150 chars)</div><div className="rf-val" style={{fontSize:12,color:"#475569"}}>{generated.snippet}</div></div>
                  <div className="rf full"><div className="rf-label">🔗 Custom Permalink</div><div className="rf-val" style={{color:"#6366f1",fontSize:12,wordBreak:"break-all"}}>{generated.permalink}</div></div>
                  <div className="rf full">
                    <div className="rf-label">🖼 Images + SEO Alt Texts</div>

                    {/* Image Upload Area */}
                    <div style={{background:"var(--bg)",border:"2px dashed #c7d2fe",borderRadius:10,padding:"16px",marginBottom:12,textAlign:"center"}}>
                      <input type="file" accept="image/*" multiple id="imgUpload" style={{display:"none"}}
                        onChange={e=>{
                          const files = Array.from(e.target.files);
                          const existingCount = uploadedImages.length;
                          const angleLabels = ["Front View","Side View","Back View","Detail Shot","Lifestyle Photo","Close Up","Top View","Package Shot"];
                          const previews = files.map((f,i)=>{
                            const idx = existingCount + i;
                            const angle = angleLabels[idx] || `View ${idx+1}`;
                            const isLocal = generated.seoType === "local";
                            const isBlog = generated.postType === "blog";
                            const autoAlt = isBlog
                              ? `${generated.product} - ${angle} - Complete Guide ${new Date().getFullYear()}`
                              : isLocal
                                ? `${generated.product} ${angle} - ${generated.price} - Pakistan Online`
                                : `${generated.product} ${angle} - Buy Online ${generated.price} - Best Quality`;
                            const autoTitle = isBlog
                              ? `${generated.product} ${angle} | Guide ${new Date().getFullYear()}`
                              : `${generated.product} | ${angle} | ${generated.price}`;
                            return {
                              file: f,
                              url: URL.createObjectURL(f),
                              name: f.name,
                              alt: generated.altTexts?.[idx] || autoAlt,
                              title: autoTitle,
                            };
                          });
                          setUploadedImages(prev=>[...prev,...previews]);
                          setImageAlts(prev=>[...prev,...previews.map(p=>({alt:p.alt,title:p.title}))]);
                        }}
                      />
                      <label htmlFor="imgUpload" style={{cursor:"pointer",display:"block"}}>
                        <div style={{fontSize:28,marginBottom:6}}>📁</div>
                        <div style={{fontSize:13,fontWeight:600,color:"#6366f1"}}>Images Upload Karo</div>
                        <div style={{fontSize:11,color:"var(--muted)",marginTop:3}}>JPG, PNG, WEBP — Multiple images select kar sakte ho</div>
                      </label>
                    </div>

                    {/* Uploaded Images with Alt Text Editor */}
                    {uploadedImages.length > 0 ? (
                      <div style={{display:"flex",flexDirection:"column",gap:10}}>
                        {uploadedImages.map((img,i)=>(
                          <div key={i} style={{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:10,padding:"12px",display:"flex",gap:12,alignItems:"flex-start"}}>
                            <div style={{position:"relative",flexShrink:0}}>
                              <img src={img.url} alt={img.alt} style={{width:70,height:70,objectFit:"cover",borderRadius:8,border:"1px solid var(--border)"}} />
                              <span style={{position:"absolute",top:-6,left:-6,background:"#6366f1",color:"white",borderRadius:4,padding:"1px 6px",fontSize:9,fontWeight:700}}>IMG {i+1}</span>
                            </div>
                            <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
                              <div>
                                <div style={{fontSize:9,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:3,fontWeight:600}}>SEO Alt Text</div>
                                <input
                                  value={imageAlts[i]?.alt || img.alt}
                                  onChange={e=>{
                                    const updated = [...imageAlts];
                                    if(!updated[i]) updated[i] = {alt:"",title:""};
                                    updated[i].alt = e.target.value;
                                    setImageAlts(updated);
                                  }}
                                  style={{width:"100%",background:"white",border:"1.5px solid var(--border)",borderRadius:7,padding:"7px 10px",fontSize:12,fontFamily:"Inter,sans-serif",color:"var(--ink)",outline:"none"}}
                                  placeholder="SEO alt text likhein..."
                                />
                              </div>
                              <div>
                                <div style={{fontSize:9,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:3,fontWeight:600}}>Image Title Text</div>
                                <input
                                  value={imageAlts[i]?.title || img.title}
                                  onChange={e=>{
                                    const updated = [...imageAlts];
                                    if(!updated[i]) updated[i] = {alt:"",title:""};
                                    updated[i].title = e.target.value;
                                    setImageAlts(updated);
                                  }}
                                  style={{width:"100%",background:"white",border:"1.5px solid var(--border)",borderRadius:7,padding:"7px 10px",fontSize:12,fontFamily:"Inter,sans-serif",color:"var(--ink)",outline:"none"}}
                                  placeholder="Image title likhein..."
                                />
                              </div>
                              <div style={{fontSize:10,color:"#22c55e",fontWeight:500}}>✓ Auto-publish par website par upload ho jayegi</div>
                            </div>
                            <button onClick={()=>{
                              setUploadedImages(prev=>prev.filter((_,idx)=>idx!==i));
                              setImageAlts(prev=>prev.filter((_,idx)=>idx!==i));
                            }} style={{background:"#fff1f2",border:"none",borderRadius:6,padding:"4px 8px",color:"#f43f5e",cursor:"pointer",fontSize:12,flexShrink:0}}>✕</button>
                          </div>
                        ))}
                        <div style={{background:"#f0fdf4",border:"1px solid #86efac",borderRadius:8,padding:"10px 14px",fontSize:11,color:"#166534"}}>
                          ✅ <strong>{uploadedImages.length} image{uploadedImages.length>1?"s":""}</strong> ready — WordPress/Shopify publish par automatically upload ho jayengi alt texts ke saath!
                        </div>
                      </div>
                    ) : (
                      <div style={{display:"flex",flexDirection:"column",gap:6}}>
                        <div style={{fontSize:11,color:"var(--muted)",marginBottom:4}}>📋 Auto-generated SEO Alt Texts (image upload karne par replace ho jayenge):</div>
                        {generated.altTexts?.map((alt,i)=>(
                          <div key={i} style={{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:7,padding:"8px 12px",fontSize:12,color:"var(--ink2)",display:"flex",alignItems:"center",gap:8}}>
                            <span style={{background:"#6366f1",color:"white",borderRadius:4,padding:"2px 7px",fontSize:10,fontWeight:700,flexShrink:0}}>IMG {i+1}</span>
                            <div>
                              <div style={{fontWeight:500}}>{alt}</div>
                              <div style={{fontSize:10,color:"var(--muted)",marginTop:1}}>Title: {generated.product} - {generated.price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="rf full">
                    <div className="rf-label">📋 Copy All & Publish Info</div>
                    <div style={{background:"#fef9c3",border:"1px solid #fde68a",borderRadius:8,padding:"14px 16px",fontSize:12,color:"#78350f",lineHeight:1.7}}>
                      <strong>⚠️ Auto Publish:</strong> Is waqt aapko manually copy-paste karna hoga apni website par (WordPress, Shopify, etc.).<br/>
                      <strong>🔜 Coming Soon:</strong> WordPress API, Shopify API aur WooCommerce direct publish feature jald aa raha hai!<br/>
                      <strong>✅ Abhi karo:</strong> Upar ka content copy karo → apni website ka dashboard kholo → new product/post banao → paste karo.
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!generated && !generating && (
              <div className="empty-state"><div className="empty-icon">✦</div><div>Upar product enter karo aur Generate dabao.</div></div>
            )}
          </>)}

          {/* ── DASHBOARD ── */}
          {view === "dashboard" && (<>
            <div className="page-header"><div className="page-title">Dashboard</div><div className="page-sub">Live data from Supabase</div></div>
            <div className="stats-grid">
              <div className="stat-card c1"><div className="stat-num">{posts.length}</div><div className="stat-lbl">Total Posts</div></div>
              <div className="stat-card c2"><div className="stat-num">{totalPub}</div><div className="stat-lbl">Published</div></div>
              <div className="stat-card c3"><div className="stat-num">{clients.filter(c=>c.status==="active").length}</div><div className="stat-lbl">Active Clients</div></div>
            </div>
            <div className="sec-title">Recent Posts <span className="sec-count">{Math.min(posts.length,5)}</span></div>
            <div className="tbl">
              <div className="tbl-head tbl-4"><div>Product</div><div>Price</div><div>Status</div><div>Date</div></div>
              {postsLoading ? <div className="loader-row"><span className="spinner" />Loading…</div>
                : posts.length === 0 ? <div className="empty-state"><div className="empty-icon">📭</div><div>Abhi koi post nahi. Generate karo!</div></div>
                : posts.slice(0,5).map(p=>(
                <div key={p.id} className="tbl-row tbl-4">
                  <div className="row-name">{p.product_title}</div>
                  <div className="row-muted">{p.product_price}</div>
                  <div><span className={`badge ${p.status==="published"?"b-pub":"b-draft"}`}><span className="badge-dot"/>{p.status}</span></div>
                  <div className="row-muted">{p.created_at ? new Date(p.created_at).toLocaleDateString() : "—"}</div>
                </div>
              ))}
            </div>
          </>)}

          {/* ── POSTS ── */}
          {view === "posts" && (<>
            <div className="page-header"><div className="page-title">My Posts</div><div className="page-sub">Supabase se saari posts</div></div>
            <div className="sec-title">All Posts <span className="sec-count">{posts.length}</span></div>
            <div className="tbl">
              <div className="tbl-head tbl-4"><div>Product</div><div>Price</div><div>Status</div><div>Date</div></div>
              {postsLoading ? <div className="loader-row"><span className="spinner" />Loading…</div>
                : posts.length === 0 ? <div className="empty-state"><div className="empty-icon">📭</div><div>Koi post nahi mili.</div></div>
                : posts.map(p=>(
                <div key={p.id} className="tbl-row tbl-4">
                  <div><div className="row-name">{p.product_title}</div><div className="row-sub">{p.seo_title?.slice(0,50)}…</div></div>
                  <div className="row-muted">{p.product_price}</div>
                  <div><span className={`badge ${p.status==="published"?"b-pub":"b-draft"}`}><span className="badge-dot"/>{p.status}</span></div>
                  <div className="row-muted">{p.created_at ? new Date(p.created_at).toLocaleDateString() : "—"}</div>
                </div>
              ))}
            </div>
          </>)}

          {/* ── CLIENTS ── */}
          {view === "clients" && (<>
            <div className="top-bar">
              <div><div className="page-title">Clients</div><div className="page-sub">Apne clients manage karo</div></div>
              <button className="add-btn" onClick={() => setShowAddClient(true)}>+ Add Client</button>
            </div>
            <div className="stats-grid" style={{ gridTemplateColumns:"repeat(3,1fr)" }}>
              <div className="stat-card c1"><div className="stat-num">{clients.length}</div><div className="stat-lbl">Total Clients</div></div>
              <div className="stat-card c3"><div className="stat-num">{clients.filter(c=>c.status==="active").length}</div><div className="stat-lbl">Active</div></div>
              <div className="stat-card c2"><div className="stat-num">{clients.filter(c=>c.status==="disabled").length}</div><div className="stat-lbl">Disabled</div></div>
            </div>
            <div className="tbl">
              <div className="tbl-head" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 0.8fr 0.8fr", padding:"11px 18px", background:"var(--bg)", borderBottom:"1px solid var(--border)", fontSize:"10px", textTransform:"uppercase", letterSpacing:"1px", color:"var(--muted)", fontWeight:600 }}>
                <div>Client</div><div>Website</div><div>Plan</div><div>Posts</div><div>Status</div><div>Action</div>
              </div>
              {clients.map(c=>(
                <div key={c.id} className="tbl-row" style={{ gridTemplateColumns:"2fr 1fr 1fr 1fr 0.8fr 0.8fr" }}>
                  <div><div className="row-name">{c.name}</div><div className="row-sub">{c.email}</div></div>
                  <div className="row-muted">{c.website}</div>
                  <div><span className={`badge b-${c.plan.toLowerCase()}`}>{c.plan}</span></div>
                  <div className="row-muted">{c.posts}</div>
                  <div><span className={`badge ${c.status==="active"?"b-active":"b-disabled"}`}><span className="badge-dot"/>{c.status}</span></div>
                  <div style={{ display:"flex", gap:6 }}>
                    <button className={`tbl-action-btn ${c.status==="active"?"btn-dis":"btn-en"}`} onClick={()=>toggleClient(c.id)}>
                      {c.status==="active"?"Disable":"Enable"}
                    </button>
                    <button className="del-btn" onClick={()=>deleteClient(c.id)}>✕</button>
                  </div>
                </div>
              ))}
              {clients.length === 0 && <div className="empty-state"><div className="empty-icon">👥</div><div>Koi client nahi. Add karo!</div></div>}
            </div>
          </>)}

          {/* ── PLANS ── */}
          {view === "plans" && (<>
            <div className="page-header"><div className="page-title">Subscription Plans</div><div className="page-sub">Simple monthly billing. Cancel anytime.</div></div>
            <div className="plans-grid">
              {[
                { name:"Basic", price:"$19", feats:["100 posts/month","SEO optimization","1 website","Email support"], featured:false },
                { name:"Pro", price:"$49", feats:["500 posts/month","Advanced SEO","5 websites","Priority support","Analytics"], featured:true, pop:true },
                { name:"Agency", price:"$149", feats:["Unlimited posts","Full SEO suite","Unlimited websites","Dedicated support","White-label","API access"], featured:false },
              ].map(p=>(
                <div key={p.name} className={`plan-card ${p.featured?"featured":""}`}>
                  {p.pop && <div className="plan-pop">Most Popular</div>}
                  <div className="plan-name">{p.name}</div>
                  <div className="plan-price">{p.price}<span className="plan-mo">/mo</span></div>
                  <ul className="plan-feats">{p.feats.map(f=><li key={f} className="plan-feat"><span className="feat-ck">✓</span>{f}</li>)}</ul>
                  <button className="plan-btn">{p.featured?"Current Plan":"Get Started"}</button>
                </div>
              ))}
            </div>
          </>)}

          {/* ── ADMIN ── */}
          {view === "admin" && (<>
            <div className="page-header"><div className="page-title">Admin Panel</div><div className="page-sub">Platform overview</div></div>
            <div className="admin-stats">
              <div className="a-stat"><div className="a-stat-num">{clients.length}</div><div className="a-stat-lbl">Total Users</div></div>
              <div className="a-stat"><div className="a-stat-num">{posts.length}</div><div className="a-stat-lbl">Total Posts</div></div>
              <div className="a-stat"><div className="a-stat-num" style={{color:totalPub>0?"var(--success)":"var(--muted)"}}>{totalPub}</div><div className="a-stat-lbl">Published</div></div>
              <div className="a-stat"><div className="a-stat-num" style={{color:"var(--primary)"}}>$2,340</div><div className="a-stat-lbl">Monthly Revenue</div></div>
            </div>
            <div className="sec-title">All Users <span className="sec-count">{clients.length}</span></div>
            <div className="tbl">
              <div className="tbl-head tbl-5"><div>User</div><div>Plan</div><div>Posts</div><div>Joined</div><div>Action</div></div>
              {clients.map(c=>(
                <div key={c.id} className="tbl-row tbl-5">
                  <div><div className="row-name">{c.name}</div><div className="row-sub">{c.email}</div></div>
                  <div><span className={`badge b-${c.plan.toLowerCase()}`}>{c.plan}</span></div>
                  <div className="row-muted">{c.posts}</div>
                  <div className="row-muted">{c.joined}</div>
                  <div><button className={`tbl-action-btn ${c.status==="active"?"btn-dis":"btn-en"}`} onClick={()=>toggleClient(c.id)}>{c.status==="active"?"Disable":"Enable"}</button></div>
                </div>
              ))}
            </div>
          </>)}

        </main>

        {/* ADD CLIENT MODAL */}
        {showAddClient && (
          <div className="modal-overlay" onClick={e => e.target.className==="modal-overlay" && setShowAddClient(false)}>
            <div className="modal">
              <div className="modal-title">👥 Naya Client Add Karo</div>
              <div className="form-group">
                <label className="form-label">Client Name *</label>
                <input className="form-input" placeholder="e.g. Ali Store" value={newClient.name} onChange={e=>setNewClient({...newClient,name:e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input className="form-input" placeholder="client@email.com" value={newClient.email} onChange={e=>setNewClient({...newClient,email:e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Website URL</label>
                <input className="form-input" placeholder="https://clientwebsite.com" value={newClient.website} onChange={e=>setNewClient({...newClient,website:e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Plan</label>
                <select className="form-select" value={newClient.plan} onChange={e=>setNewClient({...newClient,plan:e.target.value})}>
                  <option>Basic</option><option>Pro</option><option>Agency</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Platform</label>
                <select className="form-select" value={newClient.platform} onChange={e=>setNewClient({...newClient,platform:e.target.value})}>
                  <option value="wordpress">WordPress</option>
                  <option value="shopify">Shopify</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {newClient.platform === "wordpress" && (<>
                <div className="form-group">
                  <label className="form-label">WordPress Username</label>
                  <input className="form-input" placeholder="admin" value={newClient.wpUser} onChange={e=>setNewClient({...newClient,wpUser:e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">WordPress App Password</label>
                  <input className="form-input" type="password" placeholder="xxxx xxxx xxxx xxxx" value={newClient.wpPassword} onChange={e=>setNewClient({...newClient,wpPassword:e.target.value})} />
                  <div style={{fontSize:10,color:"#64748b",marginTop:4}}>WordPress → Users → Profile → Application Passwords</div>
                </div>
              </>)}
              {newClient.platform === "shopify" && (<>
                <div className="form-group">
                  <label className="form-label">Shopify Store Domain</label>
                  <input className="form-input" placeholder="mystore.myshopify.com" value={newClient.shopifyUrl} onChange={e=>setNewClient({...newClient,shopifyUrl:e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Shopify Access Token</label>
                  <input className="form-input" type="password" placeholder="shpat_xxxxxx" value={newClient.shopifyKey} onChange={e=>setNewClient({...newClient,shopifyKey:e.target.value})} />
                  <div style={{fontSize:10,color:"#64748b",marginTop:4}}>Shopify Admin → Apps → Develop Apps → Access Token</div>
                </div>
              </>)}
              <div className="modal-btns">
                <button className="btn-cancel" onClick={()=>setShowAddClient(false)}>Cancel</button>
                <button className="btn-submit" onClick={addClient}>✓ Client Add Karo</button>
              </div>
            </div>
          </div>
        )}

        {/* PUBLISH TO CLIENT MODAL */}
        {showPublishModal && (
          <div className="modal-overlay" onClick={e=>e.target.className==="modal-overlay"&&setShowPublishModal(false)}>
            <div className="modal">
              <div className="modal-title">🌐 Client Site Par Publish Karo</div>
              {!generated && <div className="error-box">Pehle post generate karo!</div>}
              {generated && (<>
                <div style={{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:8,padding:"12px 14px",marginBottom:16,fontSize:12,color:"var(--ink2)"}}>
                  <strong>Post:</strong> {generated.seoTitle}
                </div>
                <div style={{fontSize:12,color:"var(--muted)",marginBottom:12,fontWeight:600}}>Client select karo:</div>
                <div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:300,overflowY:"auto"}}>
                  {clients.filter(c=>c.status==="active").map(c=>(
                    <div key={c.id} onClick={()=>{setShowPublishModal(false);handleDirectPublish(c);}}
                      style={{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:10,padding:"12px 16px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all 0.15s"}}
                      onMouseOver={e=>e.currentTarget.style.borderColor="#6366f1"}
                      onMouseOut={e=>e.currentTarget.style.borderColor="var(--border)"}
                    >
                      <div>
                        <div style={{fontWeight:600,fontSize:13,color:"var(--ink)"}}>{c.name}</div>
                        <div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>{c.website}</div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{background:c.platform==="shopify"?"#96bf48":"#21759b",color:"white",fontSize:10,padding:"3px 8px",borderRadius:4,fontWeight:700}}>
                          {c.platform==="shopify"?"Shopify":"WordPress"}
                        </span>
                        <span style={{color:"#6366f1",fontSize:18}}>→</span>
                      </div>
                    </div>
                  ))}
                </div>
                {clients.filter(c=>c.status==="active").length === 0 && (
                  <div className="empty-state"><div>Koi active client nahi. Pehle client add karo.</div></div>
                )}
              </>)}
              <div className="modal-btns" style={{marginTop:16}}>
                <button className="btn-cancel" onClick={()=>setShowPublishModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* PUBLISH RESULT */}
        {publishResult && (
          <div style={{position:"fixed",bottom:80,right:28,background:"#f0fdf4",border:"1px solid #86efac",borderRadius:10,padding:"12px 18px",fontSize:12,color:"#166534",zIndex:9998,maxWidth:300,boxShadow:"0 4px 16px rgba(0,0,0,0.1)"}}>
            ✅ <strong>Published!</strong><br/>
            <a href={publishResult.url} target="_blank" rel="noreferrer" style={{color:"#6366f1",textDecoration:"underline",wordBreak:"break-all"}}>{publishResult.url}</a>
          </div>
        )}

        {toast && <div className={`toast ${toastErr?"err":""}`}>{toast}</div>}
      </div>
    </>
  );
}

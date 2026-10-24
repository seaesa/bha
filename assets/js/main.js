/* ==========================================================
   RACONS — main script
   - Header / footer dùng chung (chèn bằng JS)
   - Cuộn mượt (Lenis) cho trang có <body data-smooth>
   - Hiệu ứng: reveal, dự án cuộn kiểu HBA, gallery lọc, hover ảnh dịch vụ
   ========================================================== */
(() => {
  const D = window.RACONS || {};
  const body = document.body;
  const page = body.dataset.page || "";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const LOGO = `
  <svg viewBox="0 0 300 96" aria-label="Racons" role="img">
    <rect x="26" y="6" width="44" height="60" rx="6" fill="#E62D2A" transform="rotate(7 48 36)"/>
    <rect x="6" y="10" width="44" height="50" rx="6" fill="#4CB8B8" transform="rotate(-5 28 35)"/>
    <rect x="2" y="50" width="26" height="40" rx="5" fill="#F7A21B" transform="rotate(-8 15 70)"/>
    <rect x="20" y="58" width="48" height="32" rx="5" fill="#A6B23A" transform="rotate(4 44 74)"/>
    <text x="8" y="80" font-family="'Comic Sans MS','Comic Sans',cursive" font-size="82" font-weight="700" fill="#2E1F33">R</text>
    <text class="logo-text" x="74" y="80" font-family="'Comic Sans MS','Comic Sans',cursive" font-size="64" font-weight="700">acons</text>
  </svg>`;
  const CARET = `<svg class="caret" viewBox="0 0 10 10"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;
  const ARROW = `<span class="arrow">→</span>`;

  /* ---------------- Header ---------------- */
  const MENU = [
    { key: "gioi-thieu", label: "Giới thiệu", href: "/gioi-thieu/" },
    { key: "dich-vu", label: "Dịch vụ", href: "/dich-vu/", sub: [
      ["Thiết kế nội thất", "/dich-vu/#noi-that"],
      ["Thiết kế ngoại thất", "/dich-vu/#ngoai-that"],
      ["Thiết kế kiến trúc trọn gói", "/dich-vu/#kien-truc"],
      ["Xây nhà trọn gói", "/dich-vu/#xay-nha"],
    ]},
    { key: "san-pham", label: "Sản phẩm", href: "/san-pham/" },
    { key: "du-an", label: "Dự án", href: "/du-an/", sub: [
      ["Villa - Biệt thự", "/du-an/?cat=villa"],
      ["Nhà phố", "/du-an/?cat=nha-pho"],
      ["Căn hộ", "/du-an/?cat=can-ho"],
      ["Văn phòng", "/du-an/?cat=van-phong"],
    ]},
    { key: "kien-thuc", label: "Kiến thức", href: "/kien-thuc/" },
    { key: "lien-he", label: "Liên hệ", href: "/lien-he/" },
  ];

  const headerEl = $("#site-header");
  if (headerEl) {
    headerEl.outerHTML = `
    <header class="site-header" id="header">
      <div class="container">
        <a class="logo" href="/" aria-label="Racons - Trang chủ">${LOGO}</a>
        <nav class="nav" aria-label="Menu chính">
          <ul>
            ${MENU.map(m => `
              <li class="nav-item${m.sub ? " has-sub" : ""}">
                <a class="nav-link${m.key === page ? " is-active" : ""}" href="${m.href}">${m.label}${m.sub ? CARET : ""}</a>
                ${m.sub ? `<ul class="submenu">${m.sub.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul>` : ""}
              </li>`).join("")}
          </ul>
        </nav>
        <a class="header-cta" href="tel:0900000000"><span class="dot"></span>0900 000 000</a>
        <button class="burger" aria-label="Mở menu"><span></span><span></span><span></span></button>
      </div>
    </header>`;
  }
  const header = $("#header");

  /* ---------------- Footer ---------------- */
  const footerEl = $("#site-footer");
  if (footerEl) {
    footerEl.outerHTML = `
    <footer class="site-footer">
      <div class="brand-bar"><span></span><span></span><span></span><span></span></div>
      <div class="container">
        <div class="footer-top">
          <div>
            <a class="footer-logo" href="/">${LOGO.replace('class="logo-text"', 'class="logo-text" fill="#2E1F33"')}</a>
            <p style="margin-top:22px;max-width:340px">Racons — Thiết kế kiến trúc, nội thất và xây dựng trọn gói. Kiến tạo không gian sống mang dấu ấn riêng.</p>
            <div class="socials">
              <a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">ig</a>
              <a href="#" aria-label="YouTube">yt</a><a href="#" aria-label="TikTok">tt</a>
            </div>
          </div>
          <div>
            <h4>Dịch vụ</h4>
            <ul>${MENU[1].sub.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Dự án</h4>
            <ul>${MENU[3].sub.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Liên hệ</h4>
            <ul>
              <li>123 Đường ABC, Phường XYZ, TP. Hồ Chí Minh</li>
              <li><a href="tel:0900000000">Hotline: 0900 000 000</a></li>
              <li><a href="mailto:info@racons.vn">info@racons.vn</a></li>
              <li>T2 – T7: 8:00 – 17:30</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Racons. All rights reserved.</span>
          <span>Racons MEP · Racons Solar · Racons Power</span>
        </div>
      </div>
    </footer>`;
  }

  /* ---------------- Mobile menu ---------------- */
  const burger = $(".burger");
  burger?.addEventListener("click", () => {
    body.classList.toggle("menu-open");
    header?.classList.remove("is-hidden");
    body.classList.contains("menu-open") ? lenis?.stop() : lenis?.start();
  });
  $$(".nav-item.has-sub > .nav-link").forEach(a => a.addEventListener("click", e => {
    if (window.matchMedia("(max-width:1080px)").matches) {
      e.preventDefault();
      a.parentElement.classList.toggle("is-open");
    }
  }));
  $$(".submenu a").forEach(a => a.addEventListener("click", () => { body.classList.remove("menu-open"); lenis?.start(); }));

  /* ---------------- Smooth scroll (Lenis) ---------------- */
  let lenis = null;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  if (body.hasAttribute("data-smooth") && window.Lenis && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    lenis = new Lenis({ duration: 1.25, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    if (hasGSAP) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    // anchor links
    $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
      const t = $(a.getAttribute("href"));
      if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -70 }); }
    }));
  }

  /* ---------------- Header behaviour ---------------- */
  const transparentTop = body.dataset.header === "transparent";
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle("is-transparent", transparentTop && y < window.innerHeight * 0.6);
      header.classList.toggle("is-hidden", y > lastY && y > 300 && !body.classList.contains("menu-open"));
    }
    lastY = y;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------------- Render: featured projects (HBA style) ---------------- */
  const fpStack = $("#fp-stack");
  if (fpStack && D.featured) {
    fpStack.innerHTML = D.featured.map((p, i) => `
      <article class="fp-panel">
        <div class="fp-panel__inner">
          <div class="fp-panel__img"><img src="${p.image}" alt="${p.title}" loading="${i ? "lazy" : "eager"}"></div>
          <div class="fp-panel__shade"></div>
          <div class="container fp-panel__caption">
            <div class="fp-panel__num">0${i + 1}</div>
            <div>
              <div class="fp-panel__meta">${D.categories[p.cat]} · ${p.place} · ${p.year}</div>
              <h3 class="fp-panel__title">${p.title}</h3>
              <p class="fp-panel__desc">${p.style} — ${p.desc}</p>
            </div>
            <a class="btn" href="/du-an/?cat=${p.cat}">Xem dự án ${ARROW}</a>
          </div>
        </div>
      </article>`).join("");

    if (hasGSAP) {
      const panels = $$(".fp-panel", fpStack);
      panels.forEach((panel, i) => {
        // ảnh zoom nhẹ khi panel đi vào
        gsap.fromTo($("img", panel), { scale: 1.2 }, {
          scale: 1, ease: "none",
          scrollTrigger: { trigger: panel, start: "top bottom", end: "top top", scrub: true },
        });
        // panel trước thu nhỏ + tối dần khi panel sau trượt lên
        const next = panels[i + 1];
        if (next) {
          gsap.to($(".fp-panel__inner", panel), {
            scale: 0.9, borderRadius: 16, ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
          });
          gsap.to($(".fp-panel__shade", panel), {
            opacity: 0.6, ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
          });
        }
      });
    }
  }

  /* ---------------- Render: gallery (Mia style) ---------------- */
  const gallery = $("#gallery");
  if (gallery && D.projects) {
    const limit = +gallery.dataset.limit || D.projects.length;
    gallery.innerHTML = D.projects.slice(0, limit).map(p => `
      <a class="g-item ${p.size}" data-cat="${p.cat}" href="/du-an/?cat=${p.cat}">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <span class="g-item__tag">${D.categories[p.cat]}</span>
        <div class="g-item__info"><span>Thi công · ${D.categories[p.cat]}</span><h3>${p.title}</h3></div>
      </a>`).join("");
  }

  // Filter buttons (dùng chung cho gallery & sản phẩm)
  $$("[data-filter-group]").forEach(group => {
    const target = $(group.dataset.filterGroup);
    const apply = cat => {
      $$(".filter-btn", group).forEach(b => b.classList.toggle("is-active", b.dataset.filter === cat));
      $$("[data-cat]", target).forEach(it => it.classList.toggle("is-hidden", cat !== "all" && it.dataset.cat !== cat));
      if (hasGSAP) ScrollTrigger.refresh();
    };
    group.addEventListener("click", e => {
      const b = e.target.closest(".filter-btn");
      if (b) apply(b.dataset.filter);
    });
    const qCat = new URLSearchParams(location.search).get("cat");
    if (qCat && $(`[data-filter="${qCat}"]`, group)) apply(qCat);
  });

  /* ---------------- Render: services list with cursor image ---------------- */
  const svcList = $("#service-list");
  if (svcList && D.services) {
    svcList.innerHTML = D.services.map((s, i) => `
      <a class="service-row" href="/dich-vu/#${s.id}" data-img="${s.image}">
        <span class="service-row__num">0${i + 1}</span>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <span class="service-row__arrow">→</span>
      </a>`).join("");

    const reveal = document.createElement("div");
    reveal.className = "hover-reveal";
    reveal.innerHTML = `<img alt="">`;
    body.appendChild(reveal);
    const rImg = $("img", reveal);
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
    (function loop() {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      reveal.style.translate = `${rx + 30}px ${ry - 110}px`;
      requestAnimationFrame(loop);
    })();
    $$(".service-row", svcList).forEach(r => {
      r.addEventListener("mouseenter", () => { rImg.src = r.dataset.img; reveal.classList.add("is-visible"); });
      r.addEventListener("mouseleave", () => reveal.classList.remove("is-visible"));
    });
  }

  /* ---------------- Render: blog cards ---------------- */
  const postCard = p => `
    <a class="post-card reveal" href="/kien-thuc/">
      <div class="post-card__img"><img src="${p.image}" alt="${p.title}" loading="lazy"><span class="post-card__cat">${p.cat}</span></div>
      <div class="post-card__meta">${p.date} · ${p.cat}</div>
      <h3>${p.title}</h3>
      <p>${p.excerpt}</p>
    </a>`;
  $$("[data-posts]").forEach(el => {
    const [from, to] = el.dataset.posts.split(",").map(Number);
    el.innerHTML = D.posts.slice(from, to).map(postCard).join("");
  });

  /* ---------------- Render: products ---------------- */
  const products = $("#products");
  if (products && D.products) {
    products.innerHTML = D.products.map(p => `
      <a class="product-card" data-cat="${p.cat}" href="/lien-he/">
        <div class="product-card__img"><img src="${p.image}" alt="${p.name}" loading="lazy">${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ""}</div>
        <h3>${p.name}</h3>
        <div class="product-card__cat">${p.cat}</div>
        <div class="product-card__price">${p.price}</div>
      </a>`).join("");
  }

  /* ---------------- YouTube background video ---------------- */
  const hv = $(".hero-video");
  if (hv) {
    const id = hv.dataset.youtube || D.youtubeId;
    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&enablejsapi=1`;
    frame.allow = "autoplay; encrypted-media";
    frame.title = "Racons video";
    frame.addEventListener("load", () => setTimeout(() => hv.classList.add("is-playing"), 1800));
    $(".hero-video__media", hv).appendChild(frame);

    const st = $(".sound-toggle", hv);
    let muted = true;
    st?.addEventListener("click", () => {
      muted = !muted;
      frame.contentWindow.postMessage(JSON.stringify({ event: "command", func: muted ? "mute" : "unMute", args: [] }), "*");
      st.textContent = muted ? "🔇" : "🔊";
    });
  }

  /* ---------------- Intro: word-by-word highlight ---------------- */
  const statement = $(".intro-statement");
  if (statement) {
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(w => {
            if (!w.trim()) return frag.appendChild(document.createTextNode(w));
            const s = document.createElement("span"); s.className = "word"; s.textContent = w; frag.appendChild(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(statement);
    const words = $$(".word", statement);
    const update = () => {
      const r = statement.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.4)));
      const lit = Math.floor(p * words.length * 1.05);
      words.forEach((w, i) => w.style.opacity = i < lit ? 1 : 0.15);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------------- Parallax for [data-parallax] (GSAP pages) ---------------- */
  if (hasGSAP) {
    $$("[data-parallax]").forEach(el => {
      gsap.fromTo(el, { yPercent: -8 }, { yPercent: 8, ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
  }

  /* ---------------- Count-up numbers ---------------- */
  const counters = $$("[data-count]");
  const io2 = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || "";
    const t0 = performance.now();
    const tick = t => {
      const k = Math.min(1, (t - t0) / 1600);
      el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suf;
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    io2.unobserve(el);
  }), { threshold: 0.6 });
  counters.forEach(c => io2.observe(c));

  /* ---------------- Reveal on scroll ---------------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal, .split-line").forEach(el => io.observe(el));

  /* ---------------- Contact form (demo) ---------------- */
  $$("form[data-demo]").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault();
    $(".form-note", f)?.classList.add("is-visible");
    f.reset();
  }));

  /* ---------------- Loader ---------------- */
  const loader = $(".loader");
  const done = () => { loader?.classList.add("is-done"); hasGSAP && ScrollTrigger.refresh(); };
  if (document.readyState === "complete") setTimeout(done, 300);
  else window.addEventListener("load", () => setTimeout(done, 300));
  setTimeout(done, 3500); // tránh treo nếu ảnh/video tải chậm
})();

/* ==========================================================
   RACONS — main script (bố cục kiểu HBA)
   - Header/menu/footer dùng chung, chèn bằng JS
   - Cuộn mượt Lenis cho trang có <body data-smooth>
   - Sticky gallery, signpost list, post slider, fullscreen links
   ========================================================== */
(() => {
  const D = window.RACONS || {};
  const body = document.body;
  const page = body.dataset.page || "";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  const LOGO = `
  <svg viewBox="0 0 300 96" aria-label="Racons" role="img">
    <rect x="26" y="6" width="44" height="60" rx="6" fill="#E62D2A" transform="rotate(7 48 36)"/>
    <rect x="6" y="10" width="44" height="50" rx="6" fill="#4CB8B8" transform="rotate(-5 28 35)"/>
    <rect x="2" y="50" width="26" height="40" rx="5" fill="#F7A21B" transform="rotate(-8 15 70)"/>
    <rect x="20" y="58" width="48" height="32" rx="5" fill="#A6B23A" transform="rotate(4 44 74)"/>
    <text x="8" y="80" font-family="'Comic Sans MS','Comic Sans',cursive" font-size="82" font-weight="700" fill="#2E1F33">R</text>
    <text class="logo-text" x="74" y="80" font-family="'Comic Sans MS','Comic Sans',cursive" font-size="64" font-weight="700">acons</text>
  </svg>`;
  const CARET = `<svg class="caret" viewBox="0 0 10 10"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>`;
  const SEARCH = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="13" cy="10" r="7.5"/><path d="M7.6 15.4 2 21"/></svg>`;
  const ARR_L = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M9 2 4 7l5 5"/></svg>`;
  const ARR_R = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><path d="m5 2 5 5-5 5"/></svg>`;

  /* ---------------- Menu data ---------------- */
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

  /* ---------------- Header ---------------- */
  const headerEl = $("#site-header");
  if (headerEl) {
    headerEl.outerHTML = `
    <header class="site-header" id="header">
      <div class="hd">
        <a class="logo" href="/" aria-label="Racons - Trang chủ">${LOGO}</a>
        <nav class="nav" aria-label="Menu chính">
          <ul>
            ${MENU.map(m => `
              <li class="nav-item">
                <a class="nav-link${m.key === page ? " is-active" : ""}" href="${m.href}">${m.label}${m.sub ? CARET : ""}</a>
                ${m.sub ? `<div class="submenu">${m.sub.map(([t, h]) => `<a href="${h}">${t}</a>`).join("")}</div>` : ""}
              </li>`).join("")}
          </ul>
        </nav>
      </div>
    </header>
    <div class="hd-fixed" id="hd-fixed">
      <button class="menu-btn" aria-label="Mở menu">Menu</button>
      <button class="search-btn" aria-label="Tìm kiếm">${SEARCH}</button>
      <form class="search-pop" action="/kien-thuc/" method="get" role="search">
        <input type="text" name="s" placeholder="Nhập từ khoá tìm kiếm" aria-label="Tìm kiếm">
        <button type="submit" aria-label="Tìm">${SEARCH}</button>
      </form>
    </div>
    <div class="menu-overlay" aria-hidden="true">
      <div class="menu-overlay__nav">
        <ul class="mo-list">
          ${MENU.map(m => `
            <li class="mo-item">
              <a class="mo-link" href="${m.href}" ${m.sub ? "data-toggle" : ""}>${m.label}${m.sub ? `<span class="mo-toggle">+</span>` : ""}</a>
              ${m.sub ? `<div class="mo-sub"><div><ul>
                <li><a href="${m.href}">Tất cả ${m.label.toLowerCase()}</a></li>
                ${m.sub.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join("")}
              </ul></div></div>` : ""}
            </li>`).join("")}
        </ul>
        <div class="menu-overlay__meta">
          <div><span class="label">Hotline</span><br><a href="tel:0900000000">0900 000 000</a></div>
          <div><span class="label">Email</span><br><a href="mailto:info@racons.vn">info@racons.vn</a></div>
        </div>
      </div>
      <div class="menu-overlay__img"><img src="/assets/img/naraco-home.jpg" alt=""></div>
    </div>`;
  }
  const header = $("#header");
  const hdFixed = $("#hd-fixed");

  // Search: bấm icon mở ô tìm kiếm
  $(".search-btn")?.addEventListener("click", () => {
    body.classList.toggle("search-open");
    if (body.classList.contains("search-open")) setTimeout(() => $(".search-pop input")?.focus(), 200);
  });
  document.addEventListener("click", e => { if (!e.target.closest("#hd-fixed")) body.classList.remove("search-open"); });

  /* ---------------- Footer (+ fullscreen links trên trang chủ do HTML đặt) ---------------- */
  const footerEl = $("#site-footer");
  if (footerEl) {
    footerEl.outerHTML = `
    <div class="brand-bar"><span></span><span></span><span></span><span></span></div>
    <footer class="site-footer" data-theme="dark">
      <div class="ft">
        <div class="ft__logo">
          <a class="logo" href="/">${LOGO}</a>
          <p>Thiết kế kiến trúc, nội thất và xây dựng trọn gói. Racons MEP · Racons Solar · Racons Power.</p>
        </div>
        <div class="ft__offices">
          <div class="ft__col"><h4>Văn phòng</h4><div class="ft__big">123 Đường ABC,<br>Phường XYZ,<br>TP. Hồ Chí Minh</div></div>
          <div class="ft__col"><h4>Hotline</h4><div class="ft__big"><a href="tel:0900000000">0900 000 000</a><br><a href="mailto:info@racons.vn">info@racons.vn</a></div></div>
          <div class="ft__col"><h4>Dự án</h4><div class="ft__big">${MENU[3].sub.map(([t, h]) => `<a href="${h}">${t}</a>`).join("<br>")}</div></div>
        </div>
        <div class="ft__hr"></div>
        <div class="ft__bottom">
          <form class="ft__form" data-demo>
            <div class="ft__cap">Nhận bản tin</div>
            <input type="text" placeholder="Họ tên*" required>
            <input type="email" placeholder="Email*" required>
            <button class="btn" type="submit">Đăng ký</button>
            <p class="form-note">✓ Cảm ơn bạn đã đăng ký!</p>
          </form>
          <div><div class="ft__cap">Liên hệ</div><a class="ft__big" href="/lien-he/">Yêu cầu tư vấn</a></div>
          <div><div class="ft__cap">Theo dõi</div>
            <div class="ft__social"><a href="#">Facebook</a><a href="#">Youtube</a><a href="#">Instagram</a><a href="#">Tiktok</a><a href="#">Zalo</a><a href="#">Pinterest</a></div>
          </div>
        </div>
        <div class="ft__copy">© ${new Date().getFullYear()} Racons. Bảo lưu mọi quyền. &nbsp;|&nbsp; Chính sách bảo mật</div>
        <button class="to-top" aria-label="Lên đầu trang"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M2 11l6-6 6 6"/></svg></button>
      </div>
    </footer>`;
  }

  /* ---------------- Smooth scroll (Lenis) ---------------- */
  let lenis = null;
  if (body.hasAttribute("data-smooth") && window.Lenis && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    lenis = new Lenis({ duration: 1.3, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  const scrollToEl = (el, offset = 0) => lenis ? lenis.scrollTo(el, { offset }) : el.scrollIntoView({ behavior: "smooth" });
  $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const t = a.getAttribute("href").length > 1 && $(a.getAttribute("href"));
    if (t) { e.preventDefault(); scrollToEl(t); }
  }));
  $(".to-top")?.addEventListener("click", () => lenis ? lenis.scrollTo(0) : scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------------- Fullscreen menu ---------------- */
  const menuBtn = $(".menu-btn");
  const setMenu = open => {
    body.classList.toggle("menu-open", open);
    menuBtn.textContent = open ? "Đóng" : "Menu";
    $(".menu-overlay").setAttribute("aria-hidden", !open);
    open ? lenis?.stop() : lenis?.start();
    if (!open) $$(".mo-item.is-open").forEach(i => i.classList.remove("is-open"));
  };
  menuBtn?.addEventListener("click", () => setMenu(!body.classList.contains("menu-open")));
  $$(".mo-link[data-toggle]").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    a.parentElement.classList.toggle("is-open");
  }));
  $$(".menu-overlay a:not([data-toggle])").forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => e.key === "Escape" && setMenu(false));

  /* ---------------- Header: collapse + màu theo nền ---------------- */
  // Như HBA: header (logo + menu) trượt lên theo lượng cuộn và ẩn hẳn; MENU hiện dần ở góc phải
  const darkSections = () => $$('[data-theme="dark"]');
  const updateHeader = () => {
    if (!header) return;
    const y = Math.max(0, scrollY);
    const hh = header.offsetHeight + 12;
    header.style.transform = `translate3d(0, ${-Math.min(y * 0.22, hh).toFixed(1)}px, 0)`;
    const mo = clamp((y - 150) / 300);
    menuBtn.style.opacity = mo.toFixed(3);
    menuBtn.classList.toggle("is-on", mo > 0.4);
    const probe = 42; // giữa header
    const onDark = darkSections().some(s => { const r = s.getBoundingClientRect(); return r.top <= probe && r.bottom > probe; });
    header.classList.toggle("on-dark", onDark);
    hdFixed.classList.toggle("on-dark", onDark);
  };

  /* ---------------- Hero: video + tiêu đề hiện từng chữ ---------------- */
  const hero = $(".hero");
  if (hero) {
    const id = hero.dataset.youtube || D.youtubeId;
    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&enablejsapi=1`;
    frame.allow = "autoplay; encrypted-media";
    frame.title = "Racons video";
    frame.addEventListener("load", () => setTimeout(() => hero.classList.add("is-playing"), 1600));
    $(".hero__media", hero).appendChild(frame);

    const st = $(".sound-toggle", hero);
    let muted = true;
    st?.addEventListener("click", () => {
      muted = !muted;
      frame.contentWindow.postMessage(JSON.stringify({ event: "command", func: muted ? "mute" : "unMute", args: [] }), "*");
      st.textContent = muted ? "Bật âm thanh" : "Tắt âm thanh";
    });

    const title = $(".hero__title", hero);
    if (title) {
      let n = 0;
      $$(".ln", title).forEach(ln => {
        ln.innerHTML = ln.textContent.trim().split(/\s+/).map(w => `<span class="w" style="transition-delay:${(0.35 + n++ * 0.22).toFixed(2)}s">${w}</span>`).join(" ");
      });
    }
  }

  /* ---------------- Sticky gallery: 3 dự án thiết kế ---------------- */
  const sgWrap = $("#featured");
  if (sgWrap && D.featured) {
    sgWrap.innerHTML = D.featured.map(p => `
      <section class="sg" data-theme="dark">
        <div class="sg__bg"><img src="${p.image}" alt="${p.title}"></div>
        <div class="sg__content">
          <div class="sg__bar">
            <div class="sg__grad"></div>
            <div class="sg__left">
              <h3 class="sg__title">${p.title}</h3>
              <a class="btn" href="/du-an/?cat=${p.cat}">Xem dự án</a>
            </div>
            <div class="sg__meta">
              <span>Racons Design</span>
              <span>${p.style}</span>
              <span>${p.place}</span>
              <span>${p.year}</span>
            </div>
          </div>
        </div>
        <div class="sg__gallery">${(p.gallery || []).map(g => `<figure class="sg__slide" style="margin-top:0"><img src="${g}" alt="${p.title}" loading="lazy"></figure>`).join("")}</div>
      </section>`).join("");
  }
  const sgs = $$(".sg").map(el => ({ el, bg: $(".sg__bg img", el), grad: $(".sg__grad", el) }));

  /* ---------------- Gallery: dự án thi công (kiểu Mia) ---------------- */
  const gallery = $("#gallery");
  if (gallery && D.projects) {
    const limit = +gallery.dataset.limit || D.projects.length;
    gallery.innerHTML = D.projects.slice(0, limit).map(p => `
      <a class="g-item ${p.size}" data-cat="${p.cat}" href="/du-an/?cat=${p.cat}">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <div class="g-item__info"><span>Thi công · ${D.categories[p.cat]}</span><h3>${p.title}</h3></div>
      </a>`).join("");
  }
  $$("[data-filter-group]").forEach(group => {
    const target = $(group.dataset.filterGroup);
    const apply = cat => {
      $$(".filter-btn", group).forEach(b => b.classList.toggle("is-active", b.dataset.filter === cat));
      $$("[data-cat]", target).forEach(it => it.classList.toggle("is-hidden", cat !== "all" && it.dataset.cat !== cat));
      lenis?.resize();
    };
    group.addEventListener("click", e => { const b = e.target.closest(".filter-btn"); if (b) apply(b.dataset.filter); });
    const q = new URLSearchParams(location.search).get("cat");
    if (q && $(`[data-filter="${q}"]`, group)) apply(q);
  });

  /* ---------------- Signpost list: dịch vụ ---------------- */
  const sp = $("#signpost");
  if (sp && D.services) {
    sp.innerHTML = `
      <div class="sp__label label">Dịch vụ</div>
      <nav class="sp__list">${D.services.map((s, i) => `<a href="/dich-vu/#${s.id}" data-i="${i}" class="${i ? "" : "is-active"}">${s.title}</a>`).join("")}</nav>
      <div class="sp__detail"><p>${D.services[0].desc}</p><a class="btn" href="/dich-vu/#${D.services[0].id}">Xem dịch vụ</a></div>
      <div class="sp__media">${D.services.map((s, i) => `<img src="${s.image.replace("w=800", "w=1000")}" alt="${s.title}" class="${i ? "" : "is-active"}">`).join("")}</div>`;
    const links = $$(".sp__list a", sp), imgs = $$(".sp__media img", sp), p = $(".sp__detail p", sp), btn = $(".sp__detail .btn", sp);
    const activate = i => {
      links.forEach((l, k) => l.classList.toggle("is-active", k === i));
      imgs.forEach((im, k) => im.classList.toggle("is-active", k === i));
      p.style.opacity = 0;
      setTimeout(() => { p.textContent = D.services[i].desc; btn.href = `/dich-vu/#${D.services[i].id}`; p.style.opacity = 1; }, 180);
    };
    links.forEach((l, i) => l.addEventListener("mouseenter", () => activate(i)));
  }

  /* ---------------- Post sliders ---------------- */
  const cardPost = p => `
    <a class="ps__card" href="/kien-thuc/">
      <div class="ph"><img src="${p.image}" alt="" loading="lazy"></div>
      <div class="ps__row"><span>${p.cat}</span><time>${p.date}</time></div>
      <h3>${p.title}</h3>
    </a>`;
  const cardPress = p => `
    <a class="ps__card" href="${p.url}">
      <div class="ph"><img src="${p.image}" alt="" loading="lazy"></div>
      <div class="ps__row"><span>${p.source}</span><time>${p.date}</time></div>
      <h3>${p.title}</h3>
    </a>`;
  const cardTeam = p => `
    <div class="ps__card ps__card--team">
      <div class="ph"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
      <div class="ps__row"><span>${p.office}</span></div>
      <h3>${p.name}<br>${p.role}</h3>
    </div>`;
  $$("[data-slider]").forEach(ps => {
    const track = $(".ps__track", ps);
    const type = ps.dataset.slider;
    if (type === "posts") track.innerHTML = D.posts.map(cardPost).join("");
    if (type === "press") track.innerHTML = D.press.map(cardPress).join("");
    if (type === "team") track.innerHTML = (D.team || []).map(cardTeam).join("");
    const [prev, next] = $$(".ps__arrows button", ps);
    const bar = $(".ps__bar i", ps);
    const step = () => ($(".ps__card", track)?.offsetWidth || 300) + parseFloat(getComputedStyle(track).columnGap || 0);
    prev.innerHTML = ARR_L; next.innerHTML = ARR_R;
    prev.addEventListener("click", () => track.scrollBy({ left: -step() }));
    next.addEventListener("click", () => track.scrollBy({ left: step() }));
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth;
      const ratio = track.clientWidth / track.scrollWidth;
      bar.style.width = ratio * 100 + "%";
      bar.style.left = (max ? track.scrollLeft / max : 0) * (1 - ratio) * 100 + "%";
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft > max - 4;
    };
    track.addEventListener("scroll", sync, { passive: true });
    addEventListener("resize", sync);
    sync();
  });

  /* ---------------- Blog grid / products (trang con) ---------------- */
  const postCard = p => `
    <a class="post-card reveal" href="/kien-thuc/">
      <div class="post-card__img"><img src="${p.image}" alt="" loading="lazy"></div>
      <div class="post-card__meta"><span>${p.cat}</span><span>${p.date}</span></div>
      <h3>${p.title}</h3>
      <p>${p.excerpt}</p>
    </a>`;
  $$("[data-posts]").forEach(el => {
    const [from, to] = el.dataset.posts.split(",").map(Number);
    el.innerHTML = D.posts.slice(from, to).map(postCard).join("");
  });
  const products = $("#products");
  if (products && D.products) {
    products.innerHTML = D.products.map(p => `
      <a class="product-card" data-cat="${p.cat}" href="/lien-he/">
        <div class="product-card__img"><img src="${p.image}" alt="${p.name}" loading="lazy">${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ""}</div>
        <div class="product-card__cat">${p.cat}</div>
        <h3>${p.name}</h3>
        <div class="product-card__price">${p.price}</div>
      </a>`).join("");
  }

  /* ---------------- Count-up ---------------- */
  const io2 = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || "", t0 = performance.now();
    const tick = t => { const k = Math.min(1, (t - t0) / 1600); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick); io2.unobserve(el);
  }), { threshold: .6 });
  $$("[data-count]").forEach(c => io2.observe(c));

  /* ---------------- Reveal ---------------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal, .split-line").forEach(el => io.observe(el));

  /* ---------------- Scroll-driven effects (1 vòng rAF) ---------------- */
  const speeds = $$("[data-speed]");
  const parallaxBgs = $$(".page-hero__bg, .fl__bg");
  let ticking = false;
  const frame = () => {
    ticking = false;
    const vh = innerHeight;
    updateHeader();
    // sticky gallery (như HBA): ảnh chính mờ dần theo lượng cuộn (~1.6 màn hình),
    // gradient dưới chữ tắt dần khi gần hết section
    sgs.forEach(({ el, bg, grad }) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      const p = Math.max(0, -r.top / vh);
      bg.style.opacity = clamp(1 - p * 0.624).toFixed(3);
      if (grad) grad.style.opacity = clamp((r.bottom - vh) / (vh * 0.4)).toFixed(3);
    });
    // parallax nhẹ cho ảnh
    speeds.forEach(el => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const c = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${(c * parseFloat(el.dataset.speed) * 100).toFixed(1)}px, 0) scale(1.12)`;
    });
    parallaxBgs.forEach(el => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      el.style.transform = `translate3d(0, ${(-r.top * 0.18).toFixed(1)}px, 0)`;
    });
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  frame();

  /* ---------------- Forms (demo) ---------------- */
  $$("form[data-demo]").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault(); $(".form-note", f)?.classList.add("is-visible"); f.reset();
  }));

  /* ---------------- Loader ---------------- */
  const loader = $(".loader");
  const done = () => {
    loader?.classList.add("is-done");
    $(".hero__title")?.classList.add("is-in");
    lenis?.resize(); frame();
  };
  if (document.readyState === "complete") setTimeout(done, 200);
  else addEventListener("load", () => setTimeout(done, 200));
  setTimeout(done, 3000);
})();

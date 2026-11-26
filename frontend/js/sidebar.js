// ─── Sidebar Generator ──────────────────────────────────────────────────
window.PRAMAANIK = window.PRAMAANIK || {};

window.PRAMAANIK.markSvg = '<svg class="brand-mark" viewBox="440 75 392 540" aria-hidden="true"><path fill="currentColor" d="M451 105L485 85L505 96L471 116L471 518L451 508ZM491 126L525 106L545 117L511 137L511 540L491 530ZM531 147L565 127L585 138L551 158L551 562L531 552ZM571 168L605 148L625 159L591 179L591 584L571 574ZM611 189L645 169L665 180L631 200L631 606L611 596ZM652 90L821 182.9L821 204.9L652 112ZM652 132L821 224.9L821 246.9L652 154ZM672 185L821 266.9L821 288.9L672 207ZM652 216L821 308.9L821 330.9L652 238ZM652 262L672 273L672 448L652 459ZM692 284L712 295L712 468L652 501L652 479L692 457ZM730 304.9L750 315.9L750 489.1L652 543L652 521L730 478.1ZM770 326.9L790 337.9L790 509.1L652 585L652 563L770 498.1Z"/></svg>';

window.PRAMAANIK.sidebar = function(role, activePage) {
  var flagCount = (window.PRAMAANIK.flags && window.PRAMAANIK.flags.length) || 0;
  var frozenCount = (window.PRAMAANIK.frozen && window.PRAMAANIK.frozen.length) || 0;
  const configs = {
    admin: {
      title: "Admin console",
      items: [
        { label:"Dashboard", href:"index.html", page:"dashboard", icon:`<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>` },
        { label:"Schemes", href:"schemes.html", page:"schemes", icon:`<svg class="icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>` },
        { label:"Disbursements", href:"disbursements.html", page:"disbursements", icon:`<svg class="icon" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>` },
        { label:"Anomaly Flags", href:"flags.html", page:"flags", badge:flagCount, icon:`<svg class="icon" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>` },
        { label:"Anchor Status", href:"anchors.html", page:"anchors", icon:`<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>` },
      ]
    },
    auditor: {
      title: "Auditor console",
      items: [
        { label:"Dashboard", href:"index.html", page:"dashboard", icon:`<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>` },
        { label:"Anomaly Flags", href:"flags.html", page:"flags", badge:flagCount, icon:`<svg class="icon" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>` },
        { label:"Frozen Assets", href:"frozen.html", page:"frozen", badge:frozenCount, icon:`<svg class="icon" viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="22"/><path d="M20 16l-4-4 4-4"/><path d="M4 8l4 4-4 4"/></svg>` },
        { label:"Proof records", href:"proofs.html", page:"proofs", icon:`<svg class="icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/></svg>` },
      ]
    },
    citizen: {
      title: "Citizen portal",
      items: [
        { label:"Dashboard", href:"index.html", page:"dashboard", icon:`<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>` },
        { label:"Trace Funds", href:"trace.html", page:"trace", icon:`<svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>` },
        { label:"Grievances", href:"grievances.html", page:"grievances", icon:`<svg class="icon" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>` },
        { label:"Verify Proof", href:"verify.html", page:"verify", icon:`<svg class="icon" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>` },
      ]
    }
  };

  const c = configs[role];
  const navHtml = c.items.map(item => {
    const isActive = item.page === activePage;
    const badgeHtml = item.badge ? `<span class="sidebar-count">${item.badge}</span>` : '';
    return `<a href="${item.href}" class="sidebar-link${isActive?' active':''}"${isActive?' aria-current="page"':''}>${item.icon}<span>${item.label}</span>${badgeHtml}</a>`;
  }).join('');

  return `
    <a class="brand" href="../index.html">
      ${window.PRAMAANIK.markSvg}
      <span><span class="brand-name">PRAMAANIK</span><span class="brand-sub" style="display:block">${c.title}</span></span>
    </a>
    <div class="sidebar-heading">Menu</div>
    <nav class="flex-1" style="display:flex;flex-direction:column;gap:2px">${navHtml}</nav>
    <div class="sidebar-foot">
      <p class="demo-note"><strong>Demo with sample data</strong>Nothing here is live or written to a blockchain.</p>
      ${window.PRAMAANIK.auth ? window.PRAMAANIK.auth.sessionInfoHtml() : ''}
      <a href="#" onclick="PRAMAANIK.auth.logout();return false" class="sidebar-link">
        <svg class="icon" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        <span>Log out</span>
      </a>
    </div>
  `;
};

// ─── Mobile header + sidebar toggle ─────────────────────────────────────
window.PRAMAANIK.mobileHeader = function() {
  return `
  <header class="mobile-header fixed z-50 flex items-center justify-between px-4">
    <a class="brand" href="../index.html">${window.PRAMAANIK.markSvg}<span class="brand-name">PRAMAANIK</span></a>
    <span class="text-xs" style="margin-left:auto;margin-right:4px;color:#c9c9c3">Demo data</span>
    <button type="button" onclick="toggleSidebar()" aria-label="Open menu">
      <svg class="icon icon-lg" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
  </header>`;
};

window.toggleSidebar = function() {
  var sb = document.getElementById('sidebar');
  var overlay = document.getElementById('sidebarOverlay');
  sb.classList.toggle('open');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'sidebarOverlay';
    overlay.className = 'sidebar-overlay';
    overlay.onclick = function() { window.toggleSidebar(); };
    document.body.appendChild(overlay);
  }
  overlay.style.display = sb.classList.contains('open') ? 'block' : 'none';
};

document.addEventListener('keydown', function(e) {
  var sb = document.getElementById('sidebar');
  if (e.key === 'Escape' && sb && sb.classList.contains('open')) window.toggleSidebar();
});

// ─── Page shell helper (with route guard) ───────────────────────────────
window.PRAMAANIK.initPage = function(role, page) {
  // Route guard: check session and role
  if (window.PRAMAANIK.auth && !window.PRAMAANIK.auth.guard(role)) {
    return false; // guard will redirect
  }

  // Inject mobile header
  const mh = document.getElementById('mobileHeader');
  if (mh) mh.innerHTML = window.PRAMAANIK.mobileHeader();
  // Inject sidebar
  const sb = document.getElementById('sidebar');
  if (sb) sb.innerHTML = window.PRAMAANIK.sidebar(role, page);
  return true;
};

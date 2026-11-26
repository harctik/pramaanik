// ─── Shared page components ─────────────────────────────────────────────
// Load after data.js and auth.js. Anything that can contain user or URL
// input must go through esc() before it reaches innerHTML.
(function () {
  'use strict';
  var P = window.PRAMAANIK;
  var esc = P.escapeHtml;

  var STATUS_CLASS = {
    active: 'badge-active', flagged: 'badge-flagged', frozen: 'badge-frozen', pending: 'badge-pending',
    open: 'badge-pending', investigating: 'badge-frozen', resolved: 'badge-active',
    confirmed: 'badge-active', Frozen: 'badge-frozen', 'Under Review': 'badge-pending', Released: 'badge-active',
    critical: 'badge-flagged', high: 'badge-pending', medium: 'badge-frozen'
  };

  function badge(status, label) {
    return '<span class="badge ' + (STATUS_CLASS[status] || 'badge-pending') + '">' + esc(label || status) + '</span>';
  }

  // "ReleasedToBeneficiary" -> "Released to beneficiary"
  function stageLabel(stage) {
    var words = String(stage).replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
    return words.charAt(0).toUpperCase() + words.slice(1);
  }

  function checks(d) {
    return '<span class="checks">' + [['GST', d.gst], ['Bank', d.bank], ['Geo', d.geo]].map(function (c) {
      var text = c[0] + (c[1] ? ' check passed' : ' check not passed');
      return '<span class="check ' + (c[1] ? 'check-pass' : 'check-fail') + '" title="' + text + '" aria-label="' + text + '">' + c[0] + '</span>';
    }).join('') + '</span>';
  }

  // risk is scored 0-10000 in the sample data
  function riskColor(risk) {
    return risk >= 9000 ? 'var(--accent-danger)' : risk >= 7000 ? 'var(--accent-warning)' : 'var(--ink)';
  }

  function riskMeter(risk) {
    var pct = Math.round(risk / 100);
    return '<div class="flex items-center gap-3"><span class="stat-label">Risk</span>' +
      '<div class="risk-bar-track"><div class="risk-bar-fill" style="width:' + pct + '%;background:' + riskColor(risk) + '"></div></div>' +
      '<span class="font-mono font-bold text-sm" style="color:' + riskColor(risk) + '">' + pct + '%</span></div>';
  }

  function stat(label, value, sub) {
    return '<div class="stat-card"><div class="stat-label">' + esc(label) + '</div>' +
      '<div class="stat-value">' + esc(value) + '</div>' +
      (sub ? '<div class="text-xs muted">' + esc(sub) + '</div>' : '') + '</div>';
  }

  function field(label, valueHtml, mono) {
    return '<div class="field"><dt>' + esc(label) + '</dt><dd' + (mono ? ' class="font-mono break-all"' : '') + '>' + valueHtml + '</dd></div>';
  }

  function rupees(n) {
    if (n >= 1e7) return '₹' + (n / 1e7).toFixed(2) + ' Cr';
    if (n >= 1e5) return '₹' + (n / 1e5).toFixed(1) + ' L';
    return '₹' + Number(n).toLocaleString('en-IN');
  }

  // Holds live in memory only: they reset when the page is reloaded.
  function activeHold(txId) {
    return P.frozen.find(function (h) { return h.txId === txId && h.status !== 'Released'; }) || null;
  }

  function placeHold(flag, who) {
    var disb = P.disbursements.find(function (d) { return d.id === flag.txId; });
    if (disb) disb.status = 'frozen';
    if (activeHold(flag.txId)) return;
    P.frozen.push({
      id: 'FRZ-' + String(P.frozen.length + 1).padStart(3, '0'),
      txId: flag.txId, scheme: flag.scheme, amountRaw: flag.amountRaw, amount: flag.amount,
      reason: flag.explanation, flag: flag.id,
      frozenAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      frozenBy: who, status: 'Frozen', daysLocked: 0
    });
  }

  // Dialogs: open, close, Escape, click outside, and focus return
  var lastFocus = null;
  function openDialog(id) {
    var el = document.getElementById(id);
    lastFocus = document.activeElement;
    el.style.display = 'flex';
    var first = el.querySelector('select, input, textarea');
    if (first) first.focus();
  }

  function closeDialog(id, onClose) {
    var el = document.getElementById(id);
    if (el.style.display === 'none') return;
    el.style.display = 'none';
    if (onClose) onClose();
    if (lastFocus) lastFocus.focus();
  }

  function wireDialog(id, onClose) {
    var el = document.getElementById(id);
    el.addEventListener('click', function (e) {
      if (e.target === el || e.target.closest('[data-close]')) closeDialog(id, onClose);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDialog(id, onClose);
    });
  }

  function fillSchemes(select) {
    P.schemes.forEach(function (s) {
      var o = document.createElement('option');
      o.value = s.name;
      o.textContent = s.name;
      select.appendChild(o);
    });
  }

  P.ui = {
    esc: esc, badge: badge, stageLabel: stageLabel, checks: checks, riskColor: riskColor,
    riskMeter: riskMeter, stat: stat, field: field, rupees: rupees, activeHold: activeHold,
    placeHold: placeHold, openDialog: openDialog, closeDialog: closeDialog,
    wireDialog: wireDialog, fillSchemes: fillSchemes
  };
})();

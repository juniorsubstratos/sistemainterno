/**
 * ============================================================
 * JUNIOR SUBSTRATOS — SISTEMA INTERNO
 * utils.js  |  Utilitários compartilhados entre todas as páginas
 * ============================================================
 */
 
'use strict';
 
/* ──────────────────────────────────────────────────────────
   TOAST
────────────────────────────────────────────────────────── */
let _toastTimer = null;
/**
 * Exibe notificação toast
 * @param {string} msg
 * @param {'ok'|'err'|'info'} type
 * @param {number} ms
 */
function toast(msg, type = 'info', ms = 3200) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = `t-${type} show`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), ms);
}
 
/* ──────────────────────────────────────────────────────────
   AUTENTICAÇÃO
────────────────────────────────────────────────────────── */
 
/** Retorna o usuário logado (objeto) ou null */
function getLoggedUser() {
  try { return JSON.parse(localStorage.getItem('js_user')); } catch { return null; }
}
 
/** Salva usuário na sessão */
function setLoggedUser(user) {
  localStorage.setItem('js_user', JSON.stringify(user));
}
 
/** Remove sessão e redireciona para login */
function logout() {
  localStorage.removeItem('js_user');
  window.location.href = 'index.html';
}
 
/**
 * Guarda página protegida: se não houver usuário logado, redireciona para login.
 * Deve ser chamado no topo de cada página admin.
 */
function requireAuth() {
  if (!getLoggedUser()) {
    window.location.href = 'index.html';
  }
}
 
/* ──────────────────────────────────────────────────────────
   USUÁRIOS (localStorage)
────────────────────────────────────────────────────────── */
const USERS_KEY = 'js_users';
 
function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; }
}
 
function saveUsers(arr) {
  localStorage.setItem(USERS_KEY, JSON.stringify(arr));
}
 
function findUser(email) {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}
 
function addUser(user) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}
 
/* ──────────────────────────────────────────────────────────
   CLIENTES (localStorage)
────────────────────────────────────────────────────────── */
const CLI_KEY = 'js_clientes';
 
function getClientes() {
  try { return JSON.parse(localStorage.getItem(CLI_KEY)) || []; } catch { return []; }
}
 
function saveClientes(arr) {
  localStorage.setItem(CLI_KEY, JSON.stringify(arr));
}
 
/* ──────────────────────────────────────────────────────────
   PRODUTOS (localStorage)
────────────────────────────────────────────────────────── */
const PROD_KEY = 'js_produtos';
 
function getProdutos() {
  try { return JSON.parse(localStorage.getItem(PROD_KEY)) || []; } catch { return []; }
}
 
function saveProdutos(arr) {
  localStorage.setItem(PROD_KEY, JSON.stringify(arr));
}
 
/* ──────────────────────────────────────────────────────────
   NOTAS (localStorage)
────────────────────────────────────────────────────────── */
const NOTAS_KEY = 'js_notas';
 
function getNotas() {
  try { return JSON.parse(localStorage.getItem(NOTAS_KEY)) || []; } catch { return []; }
}
 
function saveNotas(arr) {
  localStorage.setItem(NOTAS_KEY, JSON.stringify(arr));
}
 
/* ──────────────────────────────────────────────────────────
   FORMATOS
────────────────────────────────────────────────────────── */
 
/** Formata número como moeda brasileira */
function fmtBRL(val) {
  return Number(val || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
 
/** Parseia string de moeda para float */
function parseMoney(str) {
  if (!str) return 0;
  const c = String(str).replace(/[^\d,\.]/g, '');
  if (c.includes(',')) return parseFloat(c.replace(/\./g, '').replace(',', '.')) || 0;
  return parseFloat(c) || 0;
}
 
/** Data atual como DD/MM/AAAA */
function todayDisplay() {
  const n = new Date();
  return `${pad(n.getDate())}/${pad(n.getMonth()+1)}/${n.getFullYear()}`;
}
 
/** Data ISO → DD/MM/AAAA */
function isoToDisplay(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}
 
/** Hoje como YYYY-MM-DD */
function todayISO() {
  const n = new Date();
  return `${n.getFullYear()}-${pad(n.getMonth()+1)}-${pad(n.getDate())}`;
}
 
function pad(n) { return String(n).padStart(2, '0'); }
 
/** Escape HTML simples */
function esc(s) {
  return String(s || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
 
/** Gera ID único simples */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}
 
/* ──────────────────────────────────────────────────────────
   MÁSCARAS
────────────────────────────────────────────────────────── */
 
function maskCpfCnpj(v) {
  const d = v.replace(/\D/g,'');
  if (d.length <= 11)
    return d.replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2');
  return d.slice(0,14).replace(/(\d{2})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1/$2').replace(/(\d{4})(\d{1,2})$/,'$1-$2');
}
 
function maskPhone(v) {
  const d = v.replace(/\D/g,'').slice(0,11);
  if (d.length <= 10)
    return d.replace(/(\d{2})(\d)/,'($1) $2').replace(/(\d{4})(\d)/,'$1-$2');
  return d.replace(/(\d{2})(\d)/,'($1) $2').replace(/(\d{5})(\d)/,'$1-$2');
}
 
function maskCnpj(v) {
  return v.replace(/\D/g,'').slice(0,14)
    .replace(/(\d{2})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2')
    .replace(/(\d{3})(\d)/,'$1/$2').replace(/(\d{4})(\d{1,2})$/,'$1-$2');
}
 
/* ──────────────────────────────────────────────────────────
   VALIDAÇÃO
────────────────────────────────────────────────────────── */
 
function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}
 
/* ──────────────────────────────────────────────────────────
   RELÓGIO
────────────────────────────────────────────────────────── */
 
function startClock(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  function tick() {
    const n = new Date();
    el.textContent = `${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
  }
  tick();
  setInterval(tick, 1000);
}
 
/* ──────────────────────────────────────────────────────────
   SIDEBAR (mobile toggle)
────────────────────────────────────────────────────────── */
 
function initSidebar() {
  // Marca item ativo com base na página atual
  const page = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item').forEach(el => {
    if (el.getAttribute('href') === page) el.classList.add('active');
  });
 
  // Popula info do usuário
  const user = getLoggedUser();
  if (user) {
    const nameEl = document.getElementById('sidebar-user-name');
    const avatarEl = document.getElementById('sidebar-avatar');
    const topbarUser = document.getElementById('topbar-user-name');
    const topbarAvatar = document.getElementById('topbar-avatar');
    const initials = (user.email || 'U').slice(0,2).toUpperCase();
 
    if (nameEl) nameEl.textContent = user.name || user.email;
    if (avatarEl) avatarEl.textContent = initials;
    if (topbarUser) topbarUser.textContent = user.name || user.email;
    if (topbarAvatar) topbarAvatar.textContent = initials;
  }
 
  // Botão de sair
  document.querySelectorAll('[data-logout]').forEach(el => {
    el.addEventListener('click', logout);
  });
}
 
/* ──────────────────────────────────────────────────────────
   EXPORT PDF (html2canvas + jsPDF)
────────────────────────────────────────────────────────── */
 
async function exportToPDF(elementId, filename) {
  const overlay = document.getElementById('pdf-overlay');
  if (overlay) overlay.classList.remove('hidden');
 
  try {
    const { jsPDF } = window.jspdf;
    const element   = document.getElementById(elementId);
 
    await new Promise(r => setTimeout(r, 80));
 
    const canvas = await html2canvas(element, {
      scale:           2.5,
      useCORS:         true,
      allowTaint:      true,
      backgroundColor: '#ffffff',
      logging:         false,
      imageTimeout:    0,
      onclone: function(clonedDoc) {
        const el = clonedDoc.getElementById(elementId);
        if (!el) return;
 
        // ── Esconde elementos que não vão no PDF ──
        el.querySelectorAll(
          '.no-print, .col-del, .btn-add-row, #btn-buscar-cli, .sec-action, .topbar, .sidebar, .page-header'
        ).forEach(function(e) { e.style.display = 'none'; });
 
        // ── Substitui TODOS os inputs/textarea/select pelo valor em <span> ──
        // Isso resolve o problema de texto cortado (overflow) e remove bordas
        el.querySelectorAll('input, textarea, select').forEach(function(inp) {
          var val  = inp.value || '';
          var span = clonedDoc.createElement('span');
          span.textContent = val;
          span.style.cssText = [
            'display:block',
            'width:100%',
            'font-family:DM Sans,sans-serif',
            'font-size:13px',
            'font-weight:500',
            'color:#2e3630',
            'line-height:1.5',
            'word-break:break-word',
            'white-space:pre-wrap',
            'background:transparent',
            'border:none',
            'padding:2px 0',
            'min-height:18px'
          ].join(';');
          inp.parentNode.replaceChild(span, inp);
        });
 
        // ── Substitui .table-input (spans dentro de td) ──
        el.querySelectorAll('.table-input').forEach(function(inp) {
          var val  = inp.value || '';
          var span = clonedDoc.createElement('span');
          span.textContent = val;
          span.style.cssText = 'display:block;font-family:DM Sans,sans-serif;font-size:13px;color:#2e3630;word-break:break-word;white-space:pre-wrap;';
          if (inp.classList.contains('tr')) span.style.textAlign = 'right';
          inp.parentNode.replaceChild(span, inp);
        });
 
        // ── Injeta estilos base ──
        var st = clonedDoc.createElement('style');
        st.textContent = [
          '* { box-sizing: border-box; }',
          '.card { box-shadow: none !important; }',
          '.nota-doc-header {',
          '  background: linear-gradient(135deg,#1a4535 0%,#235d47 60%,#2e7a5f 100%) !important;',
          '  -webkit-print-color-adjust: exact !important;',
          '  print-color-adjust: exact !important;',
          '}',
          '.items-table thead th {',
          '  background: #234d38 !important;',
          '  color: #ffffff !important;',
          '  -webkit-print-color-adjust: exact !important;',
          '  print-color-adjust: exact !important;',
          '}',
          '.nota-footer {',
          '  background: #1c3a2b !important;',
          '  -webkit-print-color-adjust: exact !important;',
          '  print-color-adjust: exact !important;',
          '}',
          '.totais-box { background: #f5f0e8 !important; border: 1px solid #e8dfd0 !important; }',
          '.sec-header { background: #f5f0e8 !important; }',
          '.nota-doc-header * { color: #fff !important; }',
          '.nota-footer * { color: rgba(255,255,255,.55) !important; }',
          '.item-total { color: #2d6347 !important; }',
          '.tot-final .tot-val { color: #2d6347 !important; }',
          '.tot-neg { color: #b5422a !important; }'
        ].join('
');
        clonedDoc.head.appendChild(st);
      }
    });
 
    const pdf     = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
    const margin  = 6;
    const imgW    = 210 - (margin * 2);
    const imgH    = (canvas.height / canvas.width) * imgW;
    const imgData = canvas.toDataURL('image/jpeg', 0.96);
    const pageH   = 297 - (margin * 2);
 
    if (imgH <= pageH) {
      pdf.addImage(imgData, 'JPEG', margin, margin, imgW, imgH);
    } else {
      var remaining = imgH;
      var srcY      = 0;
      var page      = 0;
      var ratio     = canvas.width / imgW;
      while (remaining > 0) {
        if (page > 0) pdf.addPage();
        var sliceH       = Math.min(pageH, remaining);
        var srcH_px      = sliceH * ratio;
        var sliceCanvas  = document.createElement('canvas');
        sliceCanvas.width  = canvas.width;
        sliceCanvas.height = Math.ceil(srcH_px);
        var ctx = sliceCanvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        ctx.drawImage(canvas,
          0, Math.round(srcY * ratio),
          canvas.width, Math.ceil(srcH_px),
          0, 0,
          canvas.width, Math.ceil(srcH_px)
        );
        pdf.addImage(sliceCanvas.toDataURL('image/jpeg', 0.96), 'JPEG', margin, margin, imgW, sliceH);
        srcY      += sliceH;
        remaining -= sliceH;
        page++;
      }
    }
 
    pdf.save(filename || 'nota-pedido.pdf');
    toast('PDF gerado com sucesso!', 'ok');
  } catch (e) {
    console.error('Erro PDF:', e);
    toast('Erro ao gerar PDF. Tente usar o botão Imprimir.', 'err', 5000);
  } finally {
    if (overlay) overlay.classList.add('hidden');
  }
}

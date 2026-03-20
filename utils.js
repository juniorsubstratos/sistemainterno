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
    const element = document.getElementById(elementId);

    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: function(doc) {
        const el = doc.getElementById(elementId);
        if (!el) return;

        // Esconde elementos que não devem aparecer
        el.querySelectorAll('.no-print, .col-del, .btn-add-row, #btn-buscar-cli, .sec-action').forEach(function(e) {
          e.style.display = 'none';
        });

        // Remove bordas e backgrounds de todos os inputs — exibe só o valor
        el.querySelectorAll('input, textarea, select').forEach(function(inp) {
          inp.style.border            = 'none';
          inp.style.background        = 'transparent';
          inp.style.boxShadow         = 'none';
          inp.style.outline           = 'none';
          inp.style.padding           = '2px 0';
          inp.style.fontFamily        = 'DM Sans, sans-serif';
          inp.style.fontSize          = '13px';
          inp.style.color             = '#2e3630';
          inp.style.fontWeight        = '500';
          inp.style.webkitAppearance  = 'none';
          inp.style.MozAppearance     = 'none';
        });

        // Remove bordas dos table-input
        el.querySelectorAll('.table-input').forEach(function(inp) {
          inp.style.border     = 'none';
          inp.style.background = 'transparent';
          inp.style.boxShadow  = 'none';
          inp.style.padding    = '0';
        });

        // Limpa bordas dos field-input (inclusive com erro)
        el.querySelectorAll('.field-input').forEach(function(inp) {
          inp.style.border     = 'none';
          inp.style.boxShadow  = 'none';
          inp.style.background = 'transparent';
          inp.style.padding    = '2px 0';
        });

        // Fundo branco, sem sombra no container
        el.style.background   = '#ffffff';
        el.style.borderRadius = '0';
        el.style.boxShadow    = 'none';

        // Preserva cabeçalho verde da nota
        var header = el.querySelector('.nota-doc-header');
        if (header) {
          header.style.background = 'linear-gradient(135deg,#1a4535 0%,#235d47 60%,#2e7a5f 100%)';
          header.style.webkitPrintColorAdjust = 'exact';
          header.style.printColorAdjust = 'exact';
        }

        // Preserva header verde da tabela de itens
        el.querySelectorAll('.items-table thead th').forEach(function(th) {
          th.style.background = '#234d38';
          th.style.color      = '#ffffff';
          th.style.webkitPrintColorAdjust = 'exact';
          th.style.printColorAdjust = 'exact';
        });

        // Preserva footer verde
        var footer = el.querySelector('.nota-footer');
        if (footer) {
          footer.style.background = '#1c3a2b';
          footer.style.webkitPrintColorAdjust = 'exact';
          footer.style.printColorAdjust = 'exact';
        }

        // Remove sombras dos cards
        el.querySelectorAll('.card, .nota-section').forEach(function(card) {
          card.style.boxShadow = 'none';
        });

        // Totais box — fundo suave
        el.querySelectorAll('.totais-box').forEach(function(b) {
          b.style.background = '#f5f0e8';
          b.style.border     = '1px solid #e8dfd0';
        });

        // Input de desconto
        var discInput = el.querySelector('.disc-input');
        if (discInput) {
          discInput.style.border     = 'none';
          discInput.style.background = 'transparent';
          discInput.style.boxShadow  = 'none';
        }
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
      // Multi-página com corte correto
      var remaining = imgH;
      var srcY      = 0;
      var page      = 0;
      var ratio     = canvas.width / imgW;

      while (remaining > 0) {
        if (page > 0) pdf.addPage();
        var sliceH   = Math.min(pageH, remaining);
        var srcH_px  = sliceH * ratio;
        var sliceCanvas       = document.createElement('canvas');
        sliceCanvas.width     = canvas.width;
        sliceCanvas.height    = Math.ceil(srcH_px);
        var ctx = sliceCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, srcY * ratio, canvas.width, srcH_px, 0, 0, canvas.width, srcH_px);
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

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

  let wrapper = null;

  try {
    const { jsPDF } = window.jspdf;
    const element = document.getElementById(elementId);

    // Clona o elemento em container isolado com largura fixa de desktop
    const clone = element.cloneNode(true);
    clone.querySelectorAll('.no-print, .col-del').forEach(el => el.remove());

    // Força layout de 2 colunas independente do tamanho de tela
    clone.querySelectorAll('.nota-2col').forEach(el => {
      el.style.cssText += ';display:grid!important;grid-template-columns:1fr 1fr!important;';
    });
    clone.querySelectorAll('.sig-grid').forEach(el => {
      el.style.cssText += ';display:grid!important;grid-template-columns:repeat(2,1fr)!important;flex-direction:row!important;';
    });
    clone.querySelectorAll('.nota-doc-header').forEach(el => {
      el.style.cssText += ';flex-direction:row!important;align-items:center!important;';
    });
    clone.querySelectorAll('div[style*="flex-direction:column"]').forEach(el => {
      el.style.flexDirection = 'row';
    });

    wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:fixed;top:-99999px;left:0;width:900px;min-width:900px;background:#fff;z-index:-1;padding:0;margin:0;box-sizing:border-box';
    // Converte imagens externas (SVG/img) para base64 para evitar CORS
    const imgs = clone.querySelectorAll('img');
    await Promise.all([...imgs].map(img => new Promise(res => {
      const canvas2 = document.createElement('canvas');
      const ctx = canvas2.getContext('2d');
      const i = new Image();
      i.crossOrigin = 'anonymous';
      i.onload = () => {
        canvas2.width = i.naturalWidth || 100;
        canvas2.height = i.naturalHeight || 100;
        ctx.drawImage(i, 0, 0);
        try { img.src = canvas2.toDataURL('image/png'); } catch(e) { img.src = ''; }
        res();
      };
      i.onerror = () => { img.style.display = 'none'; res(); };
      i.src = img.src;
    })));

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    // Aguarda renderização completa
    await new Promise(r => requestAnimationFrame(r));
    await new Promise(r => setTimeout(r, 600));

    const canvas = await html2canvas(wrapper, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 900,
      height: wrapper.scrollHeight,
      windowWidth: 900,
    });

    document.body.removeChild(wrapper);
    wrapper = null;

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
    const margin = 8;
    const usableW = 210 - margin * 2;
    const usableH = 297 - margin * 2;
    const imgH = (canvas.height / canvas.width) * usableW;
    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    if (imgH <= usableH) {
      pdf.addImage(imgData, 'JPEG', margin, margin, usableW, imgH);
    } else {
      // Paginação correta sem cortar conteúdo
      const ratio = canvas.width / usableW; // px por mm
      const pageHpx = usableH * ratio;
      let offsetPx = 0;
      while (offsetPx < canvas.height) {
        if (offsetPx > 0) pdf.addPage();
        const sliceH = Math.min(pageHpx, canvas.height - offsetPx);
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceH;
        sliceCanvas.getContext('2d').drawImage(canvas, 0, offsetPx, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
        const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.95);
        const sliceHmm = (sliceH / canvas.width) * usableW;
        pdf.addImage(sliceData, 'JPEG', margin, margin, usableW, sliceHmm);
        offsetPx += pageHpx;
      }
    }

    pdf.save(filename || 'nota-pedido.pdf');
    toast('PDF salvo com sucesso!', 'ok');
  } catch (e) {
    console.error('Erro exportToPDF:', e);
    if (wrapper && wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
    toast('Erro ao gerar PDF: ' + e.message, 'err', 6000);
  } finally {
    if (overlay) overlay.classList.add('hidden');
  }
}

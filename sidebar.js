/**
 * Junior Substratos — sidebar.js
 * Injeta sidebar botânica em todas as páginas admin
 */
function renderSidebar(activePage) {
  const logoSVG = `<img src="juniorsubstratos.svg" alt="Junior Substratos" class="logo-white logo-sidebar" />`;

  const navItems = [
    { href:'dashboard.html', label:'Dashboard', icon:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="2" width="7" height="7" rx="1.5"/><rect x="11" y="2" width="7" height="7" rx="1.5"/><rect x="11" y="11" width="7" height="7" rx="1.5"/><rect x="2" y="11" width="7" height="7" rx="1.5"/></svg>` },
    { href:'nota.html',      label:'Gerar Nota',  icon:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6l-4-4z"/><path d="M12 2v4h4"/><path d="M8 9h4M8 12h4M8 15h2"/></svg>` },
    { href:'clientes.html',  label:'Clientes',    icon:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8" cy="6" r="3"/><path d="M2 18c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="15" cy="7" r="2"/><path d="M18 17c0-2.2-1.3-4-3-4.5"/></svg>` },
    { href:'produtos.html',  label:'Produtos',    icon:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 7l8-5 8 5v6l-8 5-8-5V7z"/><path d="M10 2v18M2 7l8 5 8-5"/></svg>` },
    { href:'historico.html', label:'Histórico',   icon:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10" cy="10" r="8"/><path d="M10 6v4l3 3"/></svg>` },
  ];

  const html = `
    <nav class="sidebar">
      <div class="sidebar-logo">${logoSVG}</div>
      <div class="sidebar-nav">
        <span class="nav-section-label">Navegação</span>
        ${navItems.map(item => `
          <a href="${item.href}" class="nav-item${item.href === activePage ? ' active' : ''}">
            ${item.icon} ${item.label}
          </a>`).join('')}
        <div class="nav-separator"></div>
        <a href="perfil.html" class="nav-item">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10" cy="7" r="3"/><path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>
          Meu Perfil
        </a>
        <a href="#" class="nav-item" data-logout>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M13 3h4a1 1 0 011 1v12a1 1 0 01-1 1h-4M9 14l4-4-4-4M13 10H3"/></svg>
          Sair do sistema
        </a>
      </div>
      <div class="sidebar-foot">
        <div class="sidebar-user">
          <div class="sidebar-avatar" id="sidebar-avatar">U</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name" id="sidebar-user-name">Usuário</div>
            <div class="sidebar-user-role">Operador</div>
          </div>
        </div>
      </div>
    </nav>`;

  document.body.insertAdjacentHTML('afterbegin', html);
}

/* app.js — inicialização e navegação entre abas. Carrega o último projeto salvo no navegador (ou o exemplo). */
"use strict";

/* ---------- abas ----------
   Para criar uma nova aba: 1) botão .tab com data-tab="nome" em index.html, 2) <section class="view" id="tab-nome" hidden>,
   3) se precisar redesenhar ao abrir, trate o nome em showTab(). */
const TAB_IDS = ["home", "conc", "inst", "ajuste", "coord"];
function showTab(name){
  if (!TAB_IDS.includes(name)) name = "home";
  TAB_IDS.forEach(t => {
    $("#tab-" + t).hidden = t !== name;
    $("#tabbtn-" + t).setAttribute("aria-selected", String(t === name));
  });
  try { localStorage.setItem("coordenograma.tab", name); } catch (e) {}
  if (name === "conc" && S) renderConc();
  if (name === "inst" && S) renderInst();
  if (name === "ajuste" && S && typeof renderCalc === "function") renderCalc();
  if (name === "coord" && S) render();       // o gráfico só mede o tamanho quando está visível
}
document.addEventListener("click", e => {            // abas, logo do cabeçalho e atalhos do rodapé
  const b = e.target.closest("[data-tab]"); if (!b) return;
  e.preventDefault(); showTab(b.dataset.tab); window.scrollTo(0, 0);
});
/* logos embutidas (logo.js) funcionam mesmo se a pasta img/ não estiver junto */
[["hdrLogo", "marcaCor"], ["ftLogo", "branco"], ["sbLogo", "cor"]].forEach(([id, k]) => { const el = document.getElementById(id); if (el && typeof ESI_LOGO !== "undefined") el.src = ESI_LOGO[k]; });
$("#ftAno").textContent = new Date().getFullYear();
$("#btnSobre").addEventListener("click", () => { const d = $("#dlgSobre"); if (d.showModal) d.showModal(); else d.setAttribute("open", ""); });
$("#btnSobreOk").addEventListener("click", () => $("#dlgSobre").close());
$("#dlgSobre").addEventListener("click", e => { if (e.target.id === "dlgSobre") e.target.close(); });

function renderConc(){
  const sel = S && S.info && S.info.conc, par = CONCESSIONARIAS.find(x => x[0] === sel), c = par && par[1];
  $("#concLogo").innerHTML = !c ? "" : imgAuto("logo-" + sel, c, c);
}

/* ---------- redesenho completo (ao carregar projeto, desfazer, exemplo...) ---------- */
function fullRender(){
  $("#pname").value = S.name;
  $("#basekv").value = showNum(S.baseKV);
  $("#baseS").value = showNum(S.baseS);
  showBaseA();
  $("#legend").checked = S.legend;
  $("#showall").checked = !!S.showAll;
  $("#json").value = "";
  syncView();
  renderHome();
  renderConc();
  renderRede();
  syncRecom(false);
  renderInst();
  renderProtecao();
  renderCalc();
  render();
}

new ResizeObserver(() => { if (S && !$("#tab-coord").hidden) render(); }).observe(wrap);

const _saved = loadStore();
S = _saved ? normalize(_saved) : sample();
fullRender();
histInit();
showTab("home");                       // sempre abre na primeira página

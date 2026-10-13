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
document.querySelector(".tabs").addEventListener("click", e => {
  const b = e.target.closest("[data-tab]"); if (b) showTab(b.dataset.tab);
});

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
let _tab = "home"; try { _tab = localStorage.getItem("coordenograma.tab") || "home"; } catch (e) {}
showTab(_tab);

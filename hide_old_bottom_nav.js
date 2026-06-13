(function(){
if(window.__hideOldBottomNav)return;window.__hideOldBottomNav=1;
function all(s){return Array.prototype.slice.call(document.querySelectorAll(s))}
function text(el){return ((el.innerText||'')+' '+(el.className||'')+' '+(el.id||'')).toLowerCase()}
function looksNav(el){var t=text(el);var keys=['harita','mesaj','profil','map','chat','profile','bottom','tabbar','tabs'];var n=0;keys.forEach(function(k){if(t.indexOf(k)>-1)n++});return n>=2}
function hide(el){if(!el||el.id==='realMobileNav'||el.closest&&el.closest('#realMobileNav'))return;el.style.setProperty('display','none','important');el.style.setProperty('visibility','hidden','important');el.style.setProperty('opacity','0','important');el.style.setProperty('pointer-events','none','important');el.style.setProperty('height','0','important');el.style.setProperty('min-height','0','important');el.style.setProperty('padding','0','important');el.style.setProperty('margin','0','important')}
function cleanup(){var mine=document.getElementById('realMobileNav');if(mine){mine.style.setProperty('display','grid','important');mine.style.setProperty('visibility','visible','important');mine.style.setProperty('opacity','1','important');mine.style.setProperty('pointer-events','auto','important')}
var c=all('#fixedAppBottomBar,nav,footer,.tabs,.tabbar,.bottomNav,.bottom-nav,.dock,.menu,[class*=bottom],[class*=tab]');
c.forEach(function(el){if(el.id==='realMobileNav')return;var r=el.getBoundingClientRect();if(looksNav(el)&&(r.top>window.innerHeight*.45||el.id==='fixedAppBottomBar'))hide(el)});
}
(function style(){if(document.getElementById('hideOldBottomStyle'))return;var s=document.createElement('style');s.id='hideOldBottomStyle';s.textContent='#fixedAppBottomBar{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;height:0!important;min-height:0!important;padding:0!important;margin:0!important}#realMobileNav{display:grid!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important}';document.head.appendChild(s)})();
window.hideOldBottomNav=cleanup;
setTimeout(cleanup,100);setTimeout(cleanup,500);setTimeout(cleanup,1200);setTimeout(cleanup,2500);setInterval(cleanup,700);
document.addEventListener('touchstart',function(){setTimeout(cleanup,20)},{passive:true});
})();
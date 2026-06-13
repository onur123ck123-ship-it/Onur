(function(){
if(window.__screenAboveNav)return;window.__screenAboveNav=1;
function q(s){return document.querySelector(s)}
function qa(s){return Array.prototype.slice.call(document.querySelectorAll(s))}
function navTop(){var n=document.getElementById('realMobileNav');if(!n)return window.innerHeight-160;return n.getBoundingClientRect().top}
function topOf(el){var r=el.getBoundingClientRect();return Math.max(0,r.top)}
function fitOne(el){if(!el)return;var top=topOf(el);var available=Math.max(220,navTop()-top-14);el.style.setProperty('max-height',available+'px','important');el.style.setProperty('height','auto','important');el.style.setProperty('overflow-y','auto','important');el.style.setProperty('overflow-x','hidden','important');el.style.setProperty('padding-bottom','18px','important');el.style.setProperty('-webkit-overflow-scrolling','touch','important');}
function fitMap(el){if(!el)return;var top=topOf(el);var available=Math.max(260,navTop()-top-14);el.style.setProperty('height',available+'px','important');el.style.setProperty('max-height',available+'px','important');el.style.setProperty('overflow','hidden','important');try{if(window.map)window.map.invalidateSize()}catch(e){}}
function fit(){var nav=document.getElementById('realMobileNav');if(nav){nav.style.setProperty('z-index','2147483647','important');nav.style.setProperty('pointer-events','auto','important')}
['profile','help','venue'].forEach(function(id){var el=document.getElementById(id);if(el)fitOne(el)});
var mapEl=document.getElementById('map');if(mapEl)fitMap(mapEl);
qa('.screen,.page,.panel,.cardWrap,.content').forEach(function(el){var id=el.id||'';if(id==='map'||id==='profile'||id==='help'||id==='venue')return;var r=el.getBoundingClientRect();if(r.top>70&&r.top<navTop()&&r.height>navTop()-r.top)fitOne(el)});
document.body.style.setProperty('padding-bottom','260px','important');}
(function style(){if(q('#screenAboveNavStyle'))return;var s=document.createElement('style');s.id='screenAboveNavStyle';s.textContent='body{padding-bottom:260px!important}#profile,#help,#venue{overflow-y:auto!important;overflow-x:hidden!important;-webkit-overflow-scrolling:touch!important;padding-bottom:18px!important}#map{overflow:hidden!important}.leaflet-container{max-height:calc(100dvh - 260px)!important}#realMobileNav{z-index:2147483647!important;pointer-events:auto!important}';document.head.appendChild(s)})();
var oldShow=window.show;window.show=function(id){if(oldShow)oldShow(id);setTimeout(fit,50);setTimeout(fit,300);setTimeout(fit,900)};
window.fitScreensAboveNav=fit;
setTimeout(fit,100);setTimeout(fit,600);setTimeout(fit,1400);setInterval(fit,1200);
window.addEventListener('resize',function(){setTimeout(fit,80)});
window.addEventListener('orientationchange',function(){setTimeout(fit,400)});
document.addEventListener('touchstart',function(){setTimeout(fit,30)},{passive:true});
})();
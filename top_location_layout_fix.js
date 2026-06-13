(function(){
if(window.__topLocationLayoutFix)return;window.__topLocationLayoutFix=1;
function q(s){return document.querySelector(s)}
function qa(s){return Array.prototype.slice.call(document.querySelectorAll(s))}
function isHeader(el){if(!el)return false;var t=(el.innerText||'').toLowerCase();var r=el.getBoundingClientRect();return t.indexOf('çeşmeaşk')>-1&&r.top<120&&r.height<90}
function findHeader(){var els=qa('header,.header,.top,.topbar,.brand,.hero,body *');for(var i=0;i<els.length;i++){if(isHeader(els[i]))return els[i]}return null}
function fix(){var w=document.getElementById('whereBar');if(!w)return;var h=findHeader();w.style.setProperty('position','fixed','important');w.style.setProperty('top','calc(10px + env(safe-area-inset-top))','important');w.style.setProperty('z-index','2147483001','important');w.style.setProperty('margin','0','important');w.style.setProperty('padding','9px 12px','important');w.style.setProperty('border-radius','18px','important');w.style.setProperty('box-shadow','0 10px 24px rgba(2,132,199,.16)','important');w.style.setProperty('font-size','13px','important');w.style.setProperty('line-height','1.05','important');w.style.setProperty('pointer-events','none','important');
if(window.innerWidth>760){w.style.setProperty('left','12px','important');w.style.setProperty('right','auto','important');w.style.setProperty('max-width','310px','important');}
else{w.style.setProperty('left','12px','important');w.style.setProperty('right','150px','important');w.style.setProperty('max-width','none','important');}
if(h){h.style.setProperty('padding-top','0','important');h.style.setProperty('padding-left',window.innerWidth>760?'340px':'0','important');h.style.setProperty('min-height','58px','important');h.style.setProperty('z-index','2147483000','important');}
var map=document.getElementById('map');if(map){map.style.setProperty('margin-top','8px','important')}}
(function style(){if(q('#topLocationLayoutStyle'))return;var s=document.createElement('style');s.id='topLocationLayoutStyle';s.textContent='#whereBar{position:fixed!important;top:calc(10px + env(safe-area-inset-top))!important;left:12px!important;z-index:2147483001!important;width:auto!important;min-width:180px!important;max-width:310px!important;white-space:normal!important;pointer-events:none!important}#whereBar small{display:block!important;font-size:11px!important;margin-top:2px!important}@media(max-width:760px){#whereBar{right:150px!important;max-width:none!important;min-width:0!important}}';document.head.appendChild(s)})();
window.fixTopLocationLayout=fix;
setTimeout(fix,100);setTimeout(fix,600);setTimeout(fix,1400);setInterval(fix,1200);
window.addEventListener('resize',function(){setTimeout(fix,80)});
})();
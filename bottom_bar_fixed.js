(function(){
if(window.__bottomBarFixed)return;window.__bottomBarFixed=1;
function q(id){return document.getElementById(id)}
function css(){
 if(q('bottomBarFixedStyle'))return;
 var s=document.createElement('style');
 s.id='bottomBarFixedStyle';
 s.textContent='html,body{min-height:100%;overscroll-behavior:none}body{padding-bottom:calc(92px + env(safe-area-inset-bottom))!important}.tabbar,.bottomnav,.bottomNav,.navBottom,#tabbar,#bottomNav,#bottomTabs,#tabs,.tabs{position:fixed!important;left:10px!important;right:10px!important;bottom:calc(10px + env(safe-area-inset-bottom))!important;z-index:2147483000!important;transform:none!important;pointer-events:auto!important;touch-action:manipulation!important;margin:0!important}.tabbar button,.bottomnav button,.bottomNav button,.navBottom button,#tabbar button,#bottomNav button,#bottomTabs button,#tabs button,.tabs button{pointer-events:auto!important;touch-action:manipulation!important}#map,.leaflet-container{z-index:1!important}.leaflet-control-container{z-index:700!important}.leaflet-pane,.leaflet-top,.leaflet-bottom{z-index:500!important}.panel,.screen,.page,main,#app{padding-bottom:calc(105px + env(safe-area-inset-bottom))!important}';
 document.head.appendChild(s);
}
function fix(){
 css();
 var candidates=[].slice.call(document.querySelectorAll('div,nav,footer'));
 candidates.forEach(function(el){
   var txt=(el.innerText||'').replace(/\s+/g,' ');
   var hasTabs=/Harita|Mesaj|Profil|Rehber|Ana|Oyun/i.test(txt);
   var btns=el.querySelectorAll('button').length;
   if(hasTabs&&btns>=3&&btns<=8){
     el.style.position='fixed';
     el.style.left='10px';
     el.style.right='10px';
     el.style.bottom='calc(10px + env(safe-area-inset-bottom))';
     el.style.zIndex='2147483000';
     el.style.pointerEvents='auto';
     el.style.transform='none';
     el.style.margin='0';
     el.style.touchAction='manipulation';
     el.setAttribute('data-fixed-bottom-bar','1');
   }
 });
}
window.addEventListener('load',function(){setTimeout(fix,300)});
window.addEventListener('resize',fix);
setInterval(fix,1200);
fix();
})();
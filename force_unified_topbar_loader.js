(function(){
if(window.__forceUnifiedTopbarLoader)return;window.__forceUnifiedTopbarLoader=1;
function add(d,id,src){
 if(d.getElementById(id))return;
 var s=d.createElement('script');
 s.id=id;
 s.async=false;
 s.src=src;
 d.body.appendChild(s);
}
function load(){
 try{
  var f=document.getElementById('f');
  if(!f||!f.contentWindow||!f.contentDocument)return;
  var w=f.contentWindow,d=f.contentDocument;
  if(!w.location.pathname.includes('app.html'))return;
  try{w.__mapOnlyBrandLocation=0}catch(e){}
  add(d,'mapBrandLocV2','/map_only_brand_location.js?v=2');
  try{w.__directPopupActions=0}catch(e){}
  add(d,'directPopupActionsNoGeo','/direct_popup_actions.js?v=2');
  add(d,'restorePlaceButtonScript','/restore_place_button.js?v=1');
 }catch(e){}
}
window.addEventListener('load',function(){setTimeout(load,500)});
var f=document.getElementById('f');if(f)f.addEventListener('load',function(){setTimeout(load,500)});
setInterval(load,1500);
})();
(function(){
if(window.__forceUnifiedTopbarLoader)return;window.__forceUnifiedTopbarLoader=1;
function load(){
 try{
  var f=document.getElementById('f');
  if(!f||!f.contentWindow||!f.contentDocument)return;
  var w=f.contentWindow,d=f.contentDocument;
  if(!w.location.pathname.includes('app.html'))return;
  if(d.getElementById('mapBrandLocV2'))return;
  try{w.__mapOnlyBrandLocation=0}catch(e){}
  var s=d.createElement('script');
  s.id='mapBrandLocV2';
  s.async=false;
  s.src='/map_only_brand_location.js?v=2';
  d.body.appendChild(s);
 }catch(e){}
}
window.addEventListener('load',function(){setTimeout(load,500)});
var f=document.getElementById('f');if(f)f.addEventListener('load',function(){setTimeout(load,500)});
setInterval(load,1500);
})();
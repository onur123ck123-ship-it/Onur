(function(){
window.__googleCafeSyncUI=1;
function mine(){
 try{
  var p=JSON.parse(localStorage.ca_profile||'{}');
  return String(p.username||p.user||'').toLowerCase()==='onurcan';
 }catch(e){return false}
}
function off(){
 ['gcsBtn','gcsBox'].forEach(function(i){
  var x=document.getElementById(i);
  if(x)x.remove();
 });
 var b=document.getElementById('uapBtn');
 if(b){
  if(mine())b.style.display='block';
  else b.remove();
 }
}
off();
setInterval(off,1000);
})();
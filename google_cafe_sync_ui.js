(function(){
window.__googleCafeSyncUI=1;
function off(){
 ['gcsBtn','gcsBox','uapBtn'].forEach(function(i){
  var x=document.getElementById(i);
  if(x)x.remove();
 });
}
off();
setInterval(off,1000);
})();
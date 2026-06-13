(function(){
window.__userAddPlacePatch=1;
function clean(){
 var b=document.getElementById('uapBtn');
 if(b)b.remove();
 var m=document.getElementById('uapModal');
 if(m)m.remove();
}
clean();
setInterval(clean,1000);
})();
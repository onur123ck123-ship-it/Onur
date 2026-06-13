(function(){
window.__googleCafeSyncUI=1;
function off(){
 var b=document.getElementById('gcsBtn');
 if(b)b.remove();
 var x=document.getElementById('gcsBox');
 if(x)x.remove();
}
off();
setInterval(off,1000);
})();
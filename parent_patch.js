(function(){
function inject(){try{var f=document.getElementById('f');if(!f||!f.contentWindow||!f.contentDocument)return;if(!f.contentWindow.location.pathname.includes('app.html'))return;var d=f.contentDocument;if(d.getElementById('messagesPatchScript'))return;var s=d.createElement('script');s.id='messagesPatchScript';s.src='/messages_patch.js?v=4';d.body.appendChild(s)}catch(e){}}
window.addEventListener('load',function(){setTimeout(inject,200)});
var f=document.getElementById('f');if(f)f.addEventListener('load',function(){setTimeout(inject,200)});
setInterval(inject,1200);
})();
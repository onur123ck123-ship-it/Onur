(function(){
if(window.__renameToPiyasa)return;window.__renameToPiyasa=1;
function replaceTextNode(n){if(!n||!n.nodeValue)return;var v=n.nodeValue;var nv=v.replace(/ÇeşmeAşk/g,'Piyasa').replace(/CesmeAsk/g,'Piyasa').replace(/Çeşmaşk/g,'Piyasa').replace(/çeşmaşk/g,'Piyasa').replace(/Çeşmeask/g,'Piyasa').replace(/cesmeask/g,'piyasa');if(nv!==v)n.nodeValue=nv}
function walk(root){try{var tw=document.createTreeWalker(root||document.body,NodeFilter.SHOW_TEXT);var n;while(n=tw.nextNode())replaceTextNode(n)}catch(e){}}
function fix(){document.title='Piyasa';walk(document.body);var b=document.querySelector('.mblBrand');if(b)b.textContent='Piyasa';var meta=document.querySelector('meta[name="application-name"]');if(meta)meta.setAttribute('content','Piyasa')}
var oldShow=window.show;window.show=function(id){if(oldShow)oldShow(id);setTimeout(fix,50);setTimeout(fix,300)}
setTimeout(fix,100);setTimeout(fix,600);setTimeout(fix,1500);setInterval(fix,1000);
})();
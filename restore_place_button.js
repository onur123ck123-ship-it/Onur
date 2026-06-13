(function(){
if(window.__restorePlaceButton)return;window.__restorePlaceButton=1;
function make(){
 var b=document.getElementById('uapBtn');
 if(b){b.style.display='block';return}
 if(!window.openModal)return;
 b=document.createElement('button');
 b.id='uapBtn';
 b.className='uapBtn';
 b.textContent='+ Yer Ekle';
 b.onclick=window.openModal;
 document.body.appendChild(b);
}
setTimeout(make,1800);
setInterval(make,2000);
})();
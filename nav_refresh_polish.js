(function(){
if(window.__navRefreshPolish)return;window.__navRefreshPolish=1;
function g(id){return document.getElementById(id)}
function visible(id){var e=g(id);if(!e)return false;var s=getComputedStyle(e);var r=e.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>5&&r.height>5}
function setActive(id){['rmnMap','rmnMsg','rmnFriends','rmnProfile'].forEach(function(x){var b=g(x);if(b)b.classList.remove('active')});var map={map:'rmnMap',help:'rmnMsg',friends:'rmnFriends',profile:'rmnProfile'};var b=g(map[id]);if(b)b.classList.add('active')}
function fixActive(){if(visible('friends'))setActive('friends');else if(visible('help'))setActive('help');else if(visible('profile'))setActive('profile');else if(visible('map'))setActive('map')}
var lastInbox='';
var restoring=false;
function watchInbox(){var box=g('igInbox');if(!box||box.__softWatch)return;if(box.innerHTML&&box.innerText.indexOf('Yukleniyor')===-1)lastInbox=box.innerHTML;box.__softWatch=1;new MutationObserver(function(){if(restoring)return;var txt=box.innerText||'';if(txt.indexOf('Yukleniyor')>-1&&lastInbox){restoring=true;box.innerHTML=lastInbox;restoring=false;return}if(box.innerHTML&&txt.indexOf('Yukleniyor')===-1&&txt.indexOf('Kutular gelmedi')===-1)lastInbox=box.innerHTML}).observe(box,{childList:true,subtree:true,characterData:true})}
function patch(){fixActive();watchInbox()}
var oldShow=window.show;
window.show=function(id){if(oldShow)oldShow(id);setTimeout(patch,80);setTimeout(patch,300)}
setTimeout(patch,200);setTimeout(patch,900);setInterval(patch,500);
})();
(function(){
if(window.__mercanRedMarkerPatch)return;window.__mercanRedMarkerPatch=1;
function redIcon(){return L.divIcon({className:'',html:'<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#ef4444;border:3px solid white;box-shadow:0 8px 24px rgba(239,68,68,.45)"><div style="width:10px;height:10px;border-radius:50%;background:white;margin:7px"></div></div>',iconSize:[30,30],iconAnchor:[15,30],popupAnchor:[0,-28]})}
function patch(){if(!window.L)return;var old=window.pinIcon;window.pinIcon=function(v){if(v&&v.id==='sifne-kafe-mercan')return redIcon();if(old)return old(v);return undefined}}
patch();setTimeout(patch,500);setInterval(patch,1500);
})();
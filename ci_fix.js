(function(){
if(window.__ciFix)return;window.__ciFix=1;
var A='https://bztigwfnenwosulhxrxo.supabase.co/rest/v1/';
var K='sb_publishable_P76ca2ta_N7PWpA_Wm6lTw__DEzK19l';
function P(){try{return JSON.parse(localStorage.ca_profile||'{}')}catch(e){return {}}}
function D(){var p=P();return p.device_id||localStorage.ca_device_stable||localStorage.ca_device||''}
async function R(path,body){var res=await fetch(A+path,{method:'POST',headers:{apikey:K,Authorization:'Bearer '+K,'Content-Type':'application/json'},body:JSON.stringify(body||{})});var txt=await res.text();var data=txt?JSON.parse(txt):null;if(!res.ok)throw Error((data&&data.message)||txt||res.statusText);return data}
function need(){var p=P();if(!p.device_id||!p.name||!p.user){if(window.show)show('profile');alert('Login first');throw Error('no profile')}return p}
window.doCheckin=async function(id){try{need();var v=(window.venues||[]).find(function(x){return x.id===id})||{id:id,name:id};window.selected=v;await R('rpc/device_checkin_v2',{p_device_id:D(),p_venue_id:id});var el=document.getElementById('venueInfo');if(el)el.innerHTML='<div class="ok">Checked in: <b>'+v.name+'</b></div>';if(window.loadVenues)await window.loadVenues();if(window.loadPeople)await window.loadPeople();alert('Checked in: '+v.name)}catch(e){alert('Checkin failed: '+e.message)}};
window.cmfCheckin=window.doCheckin;
window.quickCheckIn=window.doCheckin;
window.checkInSelected=function(){if(!window.selected){alert('Pick a place first');return}return window.doCheckin(window.selected.id)};
})();
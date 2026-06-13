(function(){
if(window.__geoPrivacyPatch)return;window.__geoPrivacyPatch=1;
var API='https://bztigwfnenwosulhxrxo.supabase.co/rest/v1/';
var KEY='sb_publishable_P76ca2ta_N7PWpA_Wm6lTw__DEzK19l';
function esc(s){return String(s||'').replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
function prof(){try{return JSON.parse(localStorage.ca_profile||'{}')}catch(e){return {}}}
function dev(){var p=prof();return p.device_id||localStorage.ca_device_stable||localStorage.ca_device||''}
function venue(id){return (window.venues||[]).find(function(v){return v.id===id})||{}}
async function rpc(path,body){var r=await fetch(API+path,{method:'POST',headers:{apikey:KEY,Authorization:'Bearer '+KEY,'Content-Type':'application/json'},body:JSON.stringify(body||{})});var t=await r.text();var d=t?JSON.parse(t):null;if(!r.ok)throw Error((d&&d.message)||t||r.statusText);return d}
function geo(){return new Promise(function(res,rej){if(!navigator.geolocation)return rej(Error('Konum desteği yok'));navigator.geolocation.getCurrentPosition(function(p){res({lat:p.coords.latitude,lng:p.coords.longitude})},function(){rej(Error('Konum izni lazım'))},{enableHighAccuracy:true,timeout:12000,maximumAge:15000})})}
function modal(html){var old=document.getElementById('geoPrivacyModal');if(old)old.remove();var d=document.createElement('div');d.id='geoPrivacyModal';d.style.cssText='position:fixed;inset:0;z-index:2147483647;background:rgba(15,23,42,.45);display:grid;place-items:center;padding:18px';d.innerHTML='<div style="width:min(430px,94vw);background:white;border-radius:28px;padding:16px;box-shadow:0 26px 70px rgba(2,6,23,.35);border:1px solid #dbeafe"><button id="gpmClose" style="float:right;border:0;border-radius:999px;background:#fee2e2;color:#991b1b;font-weight:1000;padding:7px 10px">Kapat</button>'+html+'</div>';document.body.appendChild(d);document.getElementById('gpmClose').onclick=function(){d.remove()}}
async function here(id){try{var p=await geo();var r=await rpc('rpc/device_checkin_v3',{p_device_id:dev(),p_venue_id:id,p_lat:p.lat,p_lng:p.lng});if(window.loadVenues)await loadVenues();alert('Buradasın: '+(r.venue_name||''))}catch(e){alert(e.message||'Buradayım olmadı')}}
async function detail(id){var v=venue(id);try{var p=await geo();var c=await rpc('rpc/can_view_venue_people_v1',{p_venue_id:id,p_lat:p.lat,p_lng:p.lng});if(!c.can_view){modal('<h2 style="margin:0 0 8px;color:#075985">'+esc(v.name||c.venue_name||'Mekan')+'</h2><p style="font-weight:900;color:#0f172a">Burada <b>'+Number(v.live_count||0)+'</b> kişi var.</p><p style="color:#64748b;font-weight:800">Kişileri görmek için bu mekanın 500 metre içinde olman lazım. Şu an yaklaşık <b>'+esc(c.distance_meters||'?')+' m</b> uzaktasın.</p>');return}if(window.selectVenue)return selectVenue(id);if(window.oldPopupDetail)return oldPopupDetail(id)}catch(e){modal('<h2 style="margin:0 0 8px;color:#075985">'+esc(v.name||'Mekan')+'</h2><p style="font-weight:900;color:#0f172a">Burada <b>'+Number(v.live_count||0)+'</b> kişi var.</p><p style="color:#64748b;font-weight:800">Kişileri görmek için konum izni vermen ve 500 metre içinde olman lazım.</p>')}}
window.popupHere=here;
window.cmfCheckin=here;
window.quickCheckIn=here;
window.checkInSelected=here;
window.oldPopupDetail=window.popupDetail;
window.popupDetail=detail;
})();
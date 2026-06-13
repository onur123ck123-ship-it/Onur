(function(){
if(window.__chatColorsInvitesFix)return;window.__chatColorsInvitesFix=1;
function q(id){return document.getElementById(id)}
function esc(s){return String(s||'').replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
var API='https://bztigwfnenwosulhxrxo.supabase.co/rest/v1/';
var KEY='sb_publishable_P76ca2ta_N7PWpA_Wm6lTw__DEzK19l';
function p(){try{return JSON.parse(localStorage.ca_profile||'{}')}catch(e){return {}}}
function dev(){var x=p();return x.device_id||localStorage.ca_device_stable||localStorage.ca_device||''}
async function api(path,params,opt){var u=new URL(API+path);Object.keys(params||{}).forEach(function(k){u.searchParams.set(k,params[k])});var r=await fetch(u,{method:(opt&&opt.method)||'GET',headers:{apikey:KEY,Authorization:'Bearer '+KEY,'Content-Type':'application/json',Prefer:'return=representation'},body:opt&&opt.body?JSON.stringify(opt.body):undefined});var t=await r.text();var d=t?JSON.parse(t):null;if(!r.ok)throw Error((d&&d.message)||t||r.statusText);return d}
(function style(){if(q('chatColorStyle'))return;var s=document.createElement('style');s.id='chatColorStyle';s.textContent='.hfMsg{background:#fee2e2!important;border:1px solid #fecaca!important;color:#7f1d1d!important;border-radius:18px!important;padding:10px 12px!important;margin:8px 0!important;max-width:82%!important}.hfMsg.me{background:#dbeafe!important;border-color:#bfdbfe!important;color:#1e3a8a!important;margin-left:auto!important}.inviteDone{display:none!important}';document.head.appendChild(s)})();
async function loadGeneral(){var box=q('hfGeneralMsgs');if(!box)return;try{var rows=await api('chat_room_messages',{room_id:'eq.general',select:'*',order:'created_at.asc',limit:'70'});box.innerHTML=rows.length?rows.map(function(m){return '<div class="hfMsg '+(m.sender_device===dev()?'me':'')+'"><b>'+esc(m.sender_name)+'</b><br>'+esc(m.body)+'</div>'}).join(''):'<div class="warn">Genel chatte ilk mesajı sen yaz.</div>';box.scrollTop=box.scrollHeight}catch(e){}}
window.finalLoadGeneral=loadGeneral;
var oldAccept=window.msgAccept;
window.msgAccept=async function(id,u){try{if(oldAccept)await oldAccept(id,u);var b=document.querySelector('[data-id="'+id+'"]');if(b){var c=b.closest('.card,.mvpCard,.cmfChat');if(c)c.classList.add('inviteDone')}}catch(e){alert('Kabul olmadı: '+e.message)}};
var oldReject=window.msgReject;
window.msgReject=async function(id){try{if(oldReject)await oldReject(id);var b=document.querySelector('[data-id="'+id+'"]');if(b){var c=b.closest('.card,.mvpCard,.cmfChat');if(c)c.classList.add('inviteDone')}}catch(e){alert('Reddetme olmadı: '+e.message)}};
var oldRender=window.renderMsg;
window.renderMsg=async function(){if(oldRender)await oldRender();await loadGeneral()};
setTimeout(loadGeneral,800);
})();
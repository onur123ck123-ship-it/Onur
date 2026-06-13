(function(){
if(window.__liveSyncPatch)return;window.__liveSyncPatch=1;
var API='https://bztigwfnenwosulhxrxo.supabase.co/rest/v1/';
var KEY='sb_publishable_P76ca2ta_N7PWpA_Wm6lTw__DEzK19l';
var state={busy:false,lastMsg:'',lastMap:'',lastRoom:'',lastGeneral:'',activeRoom:'',activeUser:''};
function q(id){return document.getElementById(id)}
function prof(){try{return JSON.parse(localStorage.ca_profile||'{}')}catch(e){return {}}}
function dev(){var p=prof();return p.device_id||localStorage.ca_device_stable||localStorage.ca_device||''}
async function get(path,params){var u=new URL(API+path);Object.keys(params||{}).forEach(function(k){u.searchParams.set(k,params[k])});var r=await fetch(u,{headers:{apikey:KEY,Authorization:'Bearer '+KEY}});var t=await r.text();var d=t?JSON.parse(t):null;if(!r.ok)throw Error((d&&d.message)||t||r.statusText);return d}
function hash(x){try{return JSON.stringify(x)}catch(e){return String(Math.random())}}
function visible(el){return el&&el.offsetParent!==null}
function tabName(){var ids=['help','map','venue','profile'];for(var i=0;i<ids.length;i++){var el=q(ids[i]);if(visible(el))return ids[i]}return ''}
async function refreshMessages(){if(state.busy)return;state.busy=true;try{var d=dev();if(!d)return;if(q('hfGeneralMsgs')){var g=await get('chat_room_messages',{room_id:'eq.general',select:'id,created_at,sender_device,body',order:'created_at.asc',limit:'80'});var gh=hash(g);if(gh!==state.lastGeneral){state.lastGeneral=gh;if(window.finalLoadGeneral)await finalLoadGeneral();else if(window.renderMsg)await renderMsg()}}if(q('msgChats')){var rooms=await get('direct_rooms',{or:'(device_a.eq.'+d+',device_b.eq.'+d+')',select:'id,device_a,device_b,created_at',order:'created_at.desc'});var mh=hash(rooms);if(mh!==state.lastMsg){state.lastMsg=mh;if(window.loadChats)await loadChats();else if(window.renderMsg)await renderMsg()}}if(state.activeRoom&&q('cmfMsgs')){var ms=await get('direct_messages',{room_id:'eq.'+state.activeRoom,select:'id,created_at,sender_device,body',order:'created_at.asc'});var rh=hash(ms);if(rh!==state.lastRoom){state.lastRoom=rh;if(window.cmfOpenChat)await cmfOpenChat(state.activeRoom,state.activeUser||'chat')}}}catch(e){}finally{state.busy=false}}
async function refreshMap(){try{var t=tabName();if(t!=='map'&&t!=='venue')return;var rows=await get('checkins',{select:'device_id,venue_id,created_at,expires_at',order:'created_at.desc',limit:'200'});var h=hash(rows);if(h!==state.lastMap){state.lastMap=h;if(window.loadVenues)await loadVenues();if(t==='venue'&&window.loadPeople)await loadPeople()}}catch(e){}}
var oldOpen=window.cmfOpenChat;
window.cmfOpenChat=async function(room,u){state.activeRoom=room;state.activeUser=u||state.activeUser||'chat';state.lastRoom='';if(oldOpen)return oldOpen(room,u)};
var oldSend=window.cmfSend;
window.cmfSend=async function(room,u){state.activeRoom=room;state.activeUser=u||state.activeUser||'chat';if(oldSend)await oldSend(room,u);state.lastRoom='';setTimeout(refreshMessages,300)};
var oldRender=window.renderMsg;
window.renderMsg=async function(){if(oldRender)await oldRender();setTimeout(refreshMessages,400)};
var oldHere=window.popupHere||window.checkinAction||window.doCheckin;
window.popupHere=async function(id){if(oldHere)await oldHere(id);state.lastMap='';setTimeout(refreshMap,300)};
var oldNot=window.popupNotHere||window.popupLeaveVenue||window.leaveVenue;
window.popupNotHere=async function(id){if(oldNot)await oldNot(id);state.lastMap='';setTimeout(refreshMap,300)};
var oldLeave=window.leaveVenue;
window.leaveVenue=async function(){if(oldLeave)await oldLeave();state.lastMap='';setTimeout(refreshMap,300)};
setInterval(function(){refreshMessages();refreshMap()},2500);
window.addEventListener('focus',function(){refreshMessages();refreshMap()});
document.addEventListener('visibilitychange',function(){if(!document.hidden){refreshMessages();refreshMap()}});
setTimeout(function(){refreshMessages();refreshMap()},1200);
})();
const V='v12-demo-first';
let tab='mekan';
const venues=[
{id:'starbucks-ilica',name:'Starbucks Ilıca',area:'Ilıca',category:'Kahve',emoji:'☕',total:2},
{id:'alacati-carsi',name:'Alaçatı Çarşı',area:'Alaçatı',category:'Gezi',emoji:'🧿',total:1},
{id:'cesme-marina',name:'Çeşme Marina',area:'Merkez',category:'Marina',emoji:'⛵',total:0},
{id:'before-sunset',name:'Before Sunset',area:'Ovacık',category:'Beach',emoji:'🌅',total:1},
{id:'ayayorgi',name:'Aya Yorgi Koyu',area:'Ayayorgi',category:'Beach',emoji:'🌙',total:0}
];
const people=[
{id:'ada',device_id:'demo_ada',display_name:'Ada',age:20,bio:'Kahve + deniz + sakin sohbet.',venue_id:'starbucks-ilica',interests:['kahve','deniz','müzik']},
{id:'lara',device_id:'demo_lara',display_name:'Lara',age:21,bio:'Çeşme planı spontane olur.',venue_id:'starbucks-ilica',interests:['beach','tatlı','foto']},
{id:'mira',device_id:'demo_mira',display_name:'Mira',age:19,bio:'Alaçatıdayım, komik açılışlara varım.',venue_id:'alacati-carsi',interests:['dans','kahve','gezi']},
{id:'selin',device_id:'demo_selin',display_name:'Selin',age:21,bio:'Önce chat, sonra belki selam.',venue_id:'before-sunset',interests:['deniz','lofi','sohbet']}
];
let state={me:null,check:null,candidates:[],match:null,messages:[]};
function app(){return document.getElementById('app')}
function save(k,v){localStorage.setItem('ca_'+k,JSON.stringify(v))}
function load(k,d){try{let v=localStorage.getItem('ca_'+k);return v?JSON.parse(v):d}catch(e){return d}}
function esc(s){return String(s||'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function header(){return `<div class='top'><div><p class='eyebrow'>Çeşme sosyal check-in</p><h1 class='brand'>ÇeşmeAşk</h1></div><div class='logo'>💙</div></div>`}
function tabs(){let items=[['mekan','📍 Mekân'],['kesfet','💫 Keşfet'],['chat','💬 Chat'],['profil','👤 Profil']];document.getElementById('tabs').innerHTML=items.map(i=>`<button class='tab ${tab===i[0]?'on':''}' onclick="setTab('${i[0]}')">${i[1]}</button>`).join('')}
function statusLine(){return `<div class='ok'>Demo mod hazır · ${V}</div>`}
function init(){state.me=load('me',null);state.check=load('check',null);state.match=load('match',null);state.messages=load('messages',[]);draw()}
function draw(){tabs();if(!state.me)return onboard();if(tab==='mekan')return mekan();if(tab==='kesfet')return kesfet();if(tab==='chat')return chat();profil()}
function setTab(t){tab=t;if(t==='kesfet')loadCandidates();draw()} window.setTab=setTab;
function onboard(){app().innerHTML=header()+`<article class='card hero'><h2>Aynı mekândasınız. Tanışmak karşılıklıysa başlasın.</h2><p class='muted'>Şu an stabil demo mod. Supabase'i takılmadan sonra geri bağlayacağız.</p>${statusLine()}<label>Ad<input id='name' placeholder='Onur'></label><label>Yaş<input id='age' type='number' placeholder='19'></label><label>Bio<input id='bio' placeholder='Kahve + deniz + sohbet'></label><button class='btn' id='start'>Başla</button></article>`;document.getElementById('start').onclick=()=>{state.me={id:'me',display_name:document.getElementById('name').value||'Onur',age:document.getElementById('age').value||'19',bio:document.getElementById('bio').value||'Çeşmedeyim, iyi sohbet iyi gider.'};save('me',state.me);tab='mekan';draw()}}
function venueStats(){let total=venues.reduce((a,v)=>a+(v.total||0),0);let hot=[...venues].sort((a,b)=>(b.total||0)-(a.total||0))[0];return {total,hot}}
function mekan(){let s=venueStats();let c=state.check;let html=header()+`<article class='card'><h2>Bugün nerdesin?</h2><p class='muted'>Mekân seç, aynı yerdeki demo kişileri gör.</p>${statusLine()}<div class='row'><div class='stat'><b>${s.total}</b>kişi</div><div class='stat'><b>${venues.length}</b>mekân</div><div class='stat'><b>${esc(s.hot.name)}</b>hot</div></div>${c?`<p class='ok'>Check-in: ${esc(c.name)}</p><button class='btn red' id='endCheck'>Check-in bitir</button>`:`<p class='warn'>Aktif check-in yok.</p>`}</article>`;venues.forEach(v=>{html+=`<button class='venue' data-id='${esc(v.id)}'><span class='emoji'>${esc(v.emoji)}</span><span><b>${esc(v.name)}</b><br><small>${esc(v.area)} · ${esc(v.category)}</small></span><span class='right'>${v.total||0} kişi<br>Demo</span></button>`});app().innerHTML=html;document.querySelectorAll('.venue').forEach(b=>b.onclick=()=>checkin(b.dataset.id));let e=document.getElementById('endCheck');if(e)e.onclick=()=>{state.check=null;localStorage.removeItem('ca_check');draw()}}
function checkin(id){let v=venues.find(x=>x.id===id);state.check=v;save('check',v);tab='kesfet';loadCandidates();draw()}
function loadCandidates(){if(!state.check){state.candidates=[];return}let seen=load('seen',[]);state.candidates=people.filter(p=>p.venue_id===state.check.id&&!seen.includes(p.id))}
function kesfet(){if(!state.check){app().innerHTML=header()+`<article class='card'><h2>Önce mekâna check-in yap</h2><button class='btn' onclick="setTab('mekan')">Mekân seç</button></article>`;return}if(!state.candidates.length){app().innerHTML=header()+`<article class='card'><h2>Bu mekânda yeni kişi yok</h2><p class='muted'>Demo için Starbucks Ilıca veya Alaçatı Çarşı seç.</p><button class='btn' onclick="setTab('mekan')">Mekân değiştir</button><button class='btn light' onclick='resetSeen()'>Görülenleri sıfırla</button></article>`;return}let p=state.candidates[0];let tags=p.interests.map(t=>`<span class='pill'>${esc(t)}</span>`).join('');app().innerHTML=header()+`<section class='person'><h2>${esc(p.display_name)}, ${esc(p.age)}</h2><p>${esc(p.bio)}</p><div>${tags}</div></section><div class='actions'><button class='round' onclick="swipe('${p.id}','nope')">❌</button><button class='round' onclick="swipe('${p.id}','like')">💙</button></div>`}
function swipe(id,action){let seen=load('seen',[]);if(!seen.includes(id)){seen.push(id);save('seen',seen)}let p=people.find(x=>x.id===id);if(action==='like'){state.match={id:'match_'+id,person:p};save('match',state.match);state.messages=[{from:p.id,body:'Selam, aynı mekândayız sanırım 😄'}];save('messages',state.messages);alert('Match oldu!');tab='chat';draw();return}loadCandidates();draw()}
function chat(){if(!state.match){app().innerHTML=header()+`<article class='card'><h2>Henüz match yok</h2><p class='muted'>Keşfet ekranında like atınca chat açılır.</p><button class='btn' onclick="setTab('kesfet')">Keşfet</button></article>`;return}let p=state.match.person;let msgs=state.messages.map(m=>`<div class='msg ${m.from==='me'?'me':''}'>${esc(m.body)}</div>`).join('');app().innerHTML=header()+`<article class='card'><h2>${esc(p.display_name)} ile chat</h2>${msgs}<label>Mesaj<input id='msg' placeholder='Selam'></label><button class='btn' id='send'>Gönder</button></article>`;document.getElementById('send').onclick=()=>{let body=document.getElementById('msg').value.trim();if(!body)return;state.messages.push({from:'me',body});save('messages',state.messages);draw()}}
function profil(){let m=state.me;app().innerHTML=header()+`<article class='card'><h2>${esc(m.display_name)}, ${esc(m.age)}</h2><p class='muted'>${esc(m.bio)}</p><p class='ok'>Profil demo modda kayıtlı.</p><button class='btn red' onclick='resetApp()'>Sıfırla</button></article>`}
function resetSeen(){localStorage.removeItem('ca_seen');loadCandidates();draw()} window.resetSeen=resetSeen;
function resetApp(){localStorage.clear();location.href='/?fresh='+Date.now()} window.resetApp=resetApp;
window.addEventListener('DOMContentLoaded',init);

const V='v8';
const venues=[
{id:'starbucks',name:'Starbucks Ilica',area:'Ilica',em:'☕',total:12,women:8,men:4},
{id:'alacati',name:'Alacati Carsi',area:'Alacati',em:'🧿',total:18,women:11,men:7},
{id:'marina',name:'Cesme Marina',area:'Merkez',em:'⛵',total:9,women:5,men:4},
{id:'beach',name:'Before Sunset',area:'Ovacik',em:'🌅',total:15,women:9,men:6},
{id:'ayayorgi',name:'Aya Yorgi',area:'Ayayorgi',em:'🌙',total:22,women:13,men:9}
];
const people=[
{name:'Ada',age:20,bio:'Kahve + deniz + sakin sohbet.',venue:'starbucks',tags:['kahve','deniz','muzik']},
{name:'Lara',age:21,bio:'Cesme plani spontane olur.',venue:'starbucks',tags:['beach','tatli','foto']},
{name:'Mira',age:19,bio:'Alacatidayim, komik acilislara varim.',venue:'alacati',tags:['dans','kahve','gezi']},
{name:'Selin',age:21,bio:'Once chat, sonra belki selam.',venue:'beach',tags:['deniz','lofi','sohbet']},
{name:'Naz',age:20,bio:'Aya Yorgi tarafi, guzel muzik ariyorum.',venue:'ayayorgi',tags:['muzik','beach','kahve']}
];
let tab='mekan';
function app(){return document.getElementById('app')}
function save(k,v){localStorage.setItem('ca_'+k,JSON.stringify(v))}
function load(k,d){try{let v=localStorage.getItem('ca_'+k);return v?JSON.parse(v):d}catch(e){return d}}
function getMe(){return load('me',null)}
function getCheck(){return load('check',null)}
function setTab(t){tab=t;draw()}
window.setTab=setTab;
function reset(){localStorage.clear();location.href='/?fresh='+Date.now()}
window.reset=reset;
function header(){return `<div class='top'><div><p class='eyebrow'>Cesme sosyal check-in</p><h1 class='brand'>CesmeAsk</h1></div><div class='logo'>💙</div></div>`}
function tabs(){let items=[['mekan','📍 Mekan'],['kesfet','💫 Kesfet'],['chat','💬 Chat'],['profil','👤 Profil']];document.body.querySelector('#tabs').innerHTML=items.map(i=>`<button class='tab ${tab===i[0]?'on':''}' onclick="setTab('${i[0]}')">${i[1]}</button>`).join('')}
function draw(){tabs(); if(!getMe()) return onboard(); if(tab==='mekan') return mekan(); if(tab==='kesfet') return kesfet(); if(tab==='chat') return chat(); profil()}
function onboard(){app().innerHTML=header()+`<article class='card hero'><h2>Ayni mekandasiniz. Tanismak karsilikliysa baslasin.</h2><p class='muted'>Tam konum yok. Sadece sectigin mekana check-in yapanlari gorursun.</p><label>Ad<input id='name' placeholder='Onur'></label><label>Yas<input id='age' type='number' placeholder='19'></label><button class='btn' id='start'>Basla</button></article><div class='version'>${V}</div>`;document.getElementById('start').onclick=()=>{save('me',{name:document.getElementById('name').value||'Onur',age:document.getElementById('age').value||'19'});tab='mekan';draw()}}
function mekan(){let c=getCheck();let total=venues.reduce((a,v)=>a+v.total,0);let women=venues.reduce((a,v)=>a+v.women,0);let html=header()+`<article class='card'><h2>Bugun nerdesin?</h2><p class='muted'>Mekan sec, ayni yerdeki demo kisileri gor.</p><div class='row'><div class='stat'><b>${total}</b>kisi</div><div class='stat'><b>${women}</b>kadin</div><div class='stat'><b>${total-women}</b>erkek</div></div>${c?`<p class='ok'>Check-in: ${c.name}</p><button class='btn red' id='clear'>Check-in bitir</button>`:`<p class='warn'>Aktif check-in yok.</p>`}</article>`;venues.forEach(v=>{html+=`<button class='venue' data-id='${v.id}'><span class='emoji'>${v.em}</span><span><b>${v.name}</b><br><small>${v.area}</small></span><span class='right'>${v.total} kisi<br>♀ ${v.women} · ♂ ${v.men}</span></button>`});html+=`<div class='version'>${V}</div>`;app().innerHTML=html;document.querySelectorAll('.venue').forEach(b=>b.onclick=()=>{let v=venues.find(x=>x.id===b.dataset.id);save('check',v);tab='kesfet';draw()});let clr=document.getElementById('clear');if(clr)clr.onclick=()=>{localStorage.removeItem('ca_check');draw()}}
function peopleHere(){let c=getCheck();return c?people.filter(p=>p.venue===c.id):[]}
function kesfet(){let c=getCheck();if(!c){app().innerHTML=header()+`<article class='card'><h2>Once mekana check-in yap</h2><button class='btn' onclick="setTab('mekan')">Mekan sec</button></article>`;return}let arr=peopleHere();if(!arr.length){app().innerHTML=header()+`<article class='card'><h2>Bu mekanda simdilik demo kisi yok</h2><button class='btn' onclick="setTab('mekan')">Baska mekan sec</button></article>`;return}let idx=load('idx',0)%arr.length;let p=arr[idx];app().innerHTML=header()+`<section class='person'><h2>${p.name}, ${p.age}</h2><p>${p.bio}</p><div>${p.tags.map(t=>`<span class='pill'>${t}</span>`).join('')}</div></section><div class='actions'><button class='round' id='nope'>❌</button><button class='round' id='like'>💙</button></div>`;document.getElementById('nope').onclick=()=>{save('idx',load('idx',0)+1);draw()};document.getElementById('like').onclick=()=>{save('match',p.name);alert('Match oldu: '+p.name);tab='chat';draw()}}
function chat(){let m=load('match',null);app().innerHTML=header()+(m?`<article class='card'><h2>${m} ile chat</h2><div class='msg'>Selam, ayni mekandayiz sanirim 😄</div><div class='msg me'>CesmeAsk test yayinda calisiyor 🔥</div><button class='btn light' onclick="alert('Gercek chat icin siradaki adim Supabase.')">Mesaj gonder</button></article>`:`<article class='card'><h2>Henuz match yok</h2><p class='muted'>Kesfet ekranindan like at.</p><button class='btn' onclick="setTab('kesfet')">Kesfet</button></article>`)}
function profil(){let m=getMe()||{name:'Onur',age:'19'};app().innerHTML=header()+`<article class='card'><h2>${m.name}, ${m.age}</h2><p class='muted'>Demo profil. Surum ${V}</p><button class='btn red' onclick='reset()'>Sifirla</button></article>`}
window.addEventListener('DOMContentLoaded',draw);

(function(){
function add(d,id,src){if(d.getElementById(id))return;var s=d.createElement('script');s.id=id;s.async=false;s.src=src;d.body.appendChild(s)}
function inject(){try{var f=document.getElementById('f');if(!f||!f.contentWindow||!f.contentDocument)return;if(!f.contentWindow.location.pathname.includes('app.html'))return;var d=f.contentDocument;add(d,'messagesPatchScript','/messages_patch.js?v=6');add(d,'mvpPatchScript','/mvp_patch.js?v=1');add(d,'profileChatHotfixScript','/hotfix_profile_chat.js?v=1');add(d,'chatMapFixScript','/chat_map_fix.js?v=1');add(d,'chatColorsInvitesFixScript','/chat_colors_invites_fix.js?v=1');add(d,'ciFixScript','/ci_fix.js?v=1');add(d,'oneChatLockScript','/one_chat_lock.js?v=1');add(d,'leaveDeletePatchScript','/leave_delete_patch.js?v=1')}catch(e){}}
window.addEventListener('load',function(){setTimeout(inject,250)});
var f=document.getElementById('f');if(f)f.addEventListener('load',function(){setTimeout(inject,250)});
setInterval(inject,1500);
})();
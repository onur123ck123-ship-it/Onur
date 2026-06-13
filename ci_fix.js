(function(){
if(window.__ciFix)return;window.__ciFix=1;
function selectedId(){return window.selected&&window.selected.id}
window.doCheckin=async function(id){if(window.popupHere)return window.popupHere(id);alert('Buradayım sistemi yüklenmedi, sayfayı yenile.')};
window.cmfCheckin=function(id){return window.doCheckin(id)};
window.quickCheckIn=function(id){return window.doCheckin(id)};
window.checkInSelected=function(){var id=selectedId();if(!id){alert('Önce mekan seç.');return}return window.doCheckin(id)};
})();
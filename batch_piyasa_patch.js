(function(){
  if(window.__batchPiyasaPatch)return;
  window.__batchPiyasaPatch=1;
  document.documentElement.classList.add('piyasa-batch-ready');
  console.log('Piyasa batch patch loaded');
})();

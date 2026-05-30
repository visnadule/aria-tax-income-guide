window.addEventListener('message', function(e) {
  if (e.data && e.data.iframeHeight) {
    var iframe = document.querySelector('iframe[src*="compare-embed"]');
    if (iframe) {
      iframe.style.height = e.data.iframeHeight + 'px';
    }
  }
});

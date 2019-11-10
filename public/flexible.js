window.addEventListener(('orientationchange' in window ? 'orientationchange' : 'resize'), (function() {
   function resize() {
      var html = document.documentElement;
      var hwidth = html.getBoundingClientRect().width;
      html.style.fontSize = hwidth /20 + "px";
   }
   resize();
   return resize;
})(), false);// JavaScript Document// JavaScript Document
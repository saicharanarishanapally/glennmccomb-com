var ExternalLinks=function(){function n(){for(var n=document.links,e=0,o=n.length;e<o;e++)n[e].hostname!=window.location.hostname&&(n[e].target="_blank")}function e(){n()}return{init:e}}(),ToggleMobileMenu=function(){function n(){function n(){for(var n=!1,e=document.querySelector("body"),o=e.classList,i=0;i<o.length;i++)if("site-nav-is-open"==o[i]){n=!0;break}n?(e.classList.remove("site-nav-is-open"),console.log("Mobile menu was closed.")):(e.className+=" site-nav-is-open",console.log("Mobile menu was opened."))}document.querySelector(".site-nav__nav-toggle").addEventListener("click",n,!1)}function e(){n()}return{init:e}}();!function(){ToggleMobileMenu.init(),ExternalLinks.init()}();
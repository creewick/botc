if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>i(s,r),o={module:{uri:r},exports:u,require:t};e[r]=Promise.all(l.map((s=>o[s]||t(s)))).then((s=>(n(...s),u)))}}define(["./workbox-e3490c72"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/aLleechOfDistrust-RGOnHWKO.js",revision:null},{url:"assets/badMoonRising-CsgYWjTq.js",revision:null},{url:"assets/extensionCord-DWAcCGVq.js",revision:null},{url:"assets/fallOfRome-BHYxGm5B.js",revision:null},{url:"assets/focus-visible-supuXXMI.js",revision:null},{url:"assets/hideAndSeek-CjQZhb0K.js",revision:null},{url:"assets/index-DYN5TyUR.css",revision:null},{url:"assets/index-wlAGJ4j1.js",revision:null},{url:"assets/index9-UlbGMCGd.js",revision:null},{url:"assets/input-shims-VkpIrgu-.js",revision:null},{url:"assets/ios.transition-B4XgOGrx.js",revision:null},{url:"assets/laissezUnFaire-BR-Kb7pY.js",revision:null},{url:"assets/lateNightDriveBy-BI3foCM_.js",revision:null},{url:"assets/lunarEclipse-D-04GriO.js",revision:null},{url:"assets/md.transition-CAe2bO5X.js",revision:null},{url:"assets/noGreaterJoy-XBesrbTG.js",revision:null},{url:"assets/oneInOneOut-CbhS7ZeN.js",revision:null},{url:"assets/overTheRiver-pQK5REWU.js",revision:null},{url:"assets/roles-CoW7U7eJ.js",revision:null},{url:"assets/roles-CvrQzxys.js",revision:null},{url:"assets/scripts-BE3asbYR.js",revision:null},{url:"assets/scripts-DsxR0wHc.js",revision:null},{url:"assets/sectsAndViolets-B_53oDB9.js",revision:null},{url:"assets/separationOfChurchAndState-D6FfQ_g-.js",revision:null},{url:"assets/status-tap-DcT7xTt5.js",revision:null},{url:"assets/swipe-back-Dm9ju1NG.js",revision:null},{url:"assets/troubleBrewing-B1WDWu8y.js",revision:null},{url:"assets/ui-B4AuzoB_.js",revision:null},{url:"assets/ui-CFaqG0co.js",revision:null},{url:"assets/uncertainDeath-DFoG8C_Q.js",revision:null},{url:"index.html",revision:"b5475b99926d0bf7fb28727f9acb4d71"},{url:"registerSW.js",revision:"2c899c2d9fae88acfec16928cd39673f"},{url:"manifest.webmanifest",revision:"8cec9708b6f8e2e09b6bb8251b7cfc2d"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));

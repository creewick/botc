if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>l(s,r),o={module:{uri:r},exports:u,require:t};e[r]=Promise.all(i.map((s=>o[s]||t(s)))).then((s=>(n(...s),u)))}}define(["./workbox-e3490c72"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/aLleechOfDistrust-RGOnHWKO.js",revision:null},{url:"assets/badMoonRising-CsgYWjTq.js",revision:null},{url:"assets/BinarySupernovae-BrUwnPpX.js",revision:null},{url:"assets/BuyersRemorse-zKpey2cd.js",revision:null},{url:"assets/CounciloftheDead-NZTjDj0u.js",revision:null},{url:"assets/extensionCord-DWAcCGVq.js",revision:null},{url:"assets/fallOfRome-BHYxGm5B.js",revision:null},{url:"assets/focus-visible-supuXXMI.js",revision:null},{url:"assets/hideAndSeek-CjQZhb0K.js",revision:null},{url:"assets/index-Cb74zYIj.css",revision:null},{url:"assets/index-CsMbxJ4H.js",revision:null},{url:"assets/index9-DUzSURoj.js",revision:null},{url:"assets/input-shims-BEsb9p1G.js",revision:null},{url:"assets/ios.transition-_6CoQiFA.js",revision:null},{url:"assets/Iseedeadpeople-DFi6w0D9.js",revision:null},{url:"assets/laissezUnFaire-BR-Kb7pY.js",revision:null},{url:"assets/lateNightDriveBy-BI3foCM_.js",revision:null},{url:"assets/lunarEclipse-D-04GriO.js",revision:null},{url:"assets/md.transition-INASNTCM.js",revision:null},{url:"assets/noGreaterJoy-XBesrbTG.js",revision:null},{url:"assets/OfftoseetheWizard-WEo_u1z8.js",revision:null},{url:"assets/OneDayMore-DA9Ty5Db.js",revision:null},{url:"assets/oneInOneOut-CbhS7ZeN.js",revision:null},{url:"assets/overTheRiver-pQK5REWU.js",revision:null},{url:"assets/roles-B0UII_Fr.js",revision:null},{url:"assets/roles-m9I8Uvzf.js",revision:null},{url:"assets/scripts-cdwPcx4A.js",revision:null},{url:"assets/scripts-DLprceXz.js",revision:null},{url:"assets/sectsAndViolets-B_53oDB9.js",revision:null},{url:"assets/separationOfChurchAndState-D6FfQ_g-.js",revision:null},{url:"assets/showmewonders-Bp6OICIW.js",revision:null},{url:"assets/status-tap-uUx2slS4.js",revision:null},{url:"assets/StowedAway-nMscxfs5.js",revision:null},{url:"assets/swipe-back-DuSUUdWk.js",revision:null},{url:"assets/TheBalladofSeat7-CdRXVBvM.js",revision:null},{url:"assets/TheDjinnsBargain-CEEyLsEq.js",revision:null},{url:"assets/ThePhantomDetectives-DeBjkgVK.js",revision:null},{url:"assets/TheRiverStyx-CD5tutQU.js",revision:null},{url:"assets/TheWarrens-DolEkWJ_.js",revision:null},{url:"assets/ThisIsNotMyBeautifulHouse-4reI090s.js",revision:null},{url:"assets/TrainedKiller-CX6qblJC.js",revision:null},{url:"assets/troubleBrewing-B1WDWu8y.js",revision:null},{url:"assets/ui-B1jRbsIP.js",revision:null},{url:"assets/ui-DbekPUnO.js",revision:null},{url:"assets/uncertainDeath-DFoG8C_Q.js",revision:null},{url:"assets/WitchHunt-iQGIk4Dv.js",revision:null},{url:"index.html",revision:"967e975d39a258cd29030898275dcbb5"},{url:"registerSW.js",revision:"2c899c2d9fae88acfec16928cd39673f"},{url:"manifest.webmanifest",revision:"8cec9708b6f8e2e09b6bb8251b7cfc2d"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));

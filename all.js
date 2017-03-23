//github.com/verbatim/css_browser_selector | 0.6.1 | creativecommons.org/licenses/by/2.5
function log(e){window.console&&showLog&&console.log(e)}function css_browser_selector(e){function i(){var e=window.outerWidth||m.clientWidth,i=window.outerHeight||m.clientHeight;o.orientation=i>e?"portrait":"landscape",m.className=m.className.replace(/ ?orientation_\w+/g,"").replace(/ [min|max|cl]+[w|h]_\d+/g,"");for(var r=a-1;r>=0;r--)if(e>=n[r]){o.maxw=n[r];break}widthClasses="";for(var t in o)widthClasses+=" "+t+"_"+o[t];return m.className=m.className+widthClasses,widthClasses}var o={},n=[320,480,640,768,1024,1152,1280,1440,1680,1920,2560],a=n.length,r=e.toLowerCase(),t=function(e){return RegExp(e,"i").test(r)},s=function(e,i){i=i.replace(".","_");for(var o=i.indexOf("_"),n="";o>0;)n+=" "+e+i.substring(0,o),o=i.indexOf("_",o+1);return n+=" "+e+i},p="gecko",d="webkit",g="chrome",l="firefox",x="safari",c="opera",w="mobile",E="android",R="blackberry",$="lang_",_="device_",m=document.documentElement,b=[!/opera|webtv/i.test(r)&&/msie\s(\d+)/.test(r)?"ie ie"+(/trident\/4\.0/.test(r)?"8":RegExp.$1):t("firefox/")?p+" "+l+(/firefox\/((\d+)(\.(\d+))(\.\d+)*)/.test(r)?" "+l+RegExp.$2+" "+l+RegExp.$2+"_"+RegExp.$4:""):t("gecko/")?p:t("opera")?c+(/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(r)?" "+c+RegExp.$2+" "+c+RegExp.$2+"_"+RegExp.$4:/opera(\s|\/)(\d+)\.(\d+)/.test(r)?" "+c+RegExp.$2+" "+c+RegExp.$2+"_"+RegExp.$3:""):t("konqueror")?"konqueror":t("blackberry")?R+(/Version\/(\d+)(\.(\d+)+)/i.test(r)?" "+R+RegExp.$1+" "+R+RegExp.$1+RegExp.$2.replace(".","_"):/Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(r)?" "+R+RegExp.$2+(RegExp.$3?" "+R+RegExp.$2+RegExp.$3:""):""):t("android")?E+(/Version\/(\d+)(\.(\d+))+/i.test(r)?" "+E+RegExp.$1+" "+E+RegExp.$1+RegExp.$2.replace(".","_"):"")+(/Android (.+); (.+) Build/i.test(r)?" "+_+RegExp.$2.replace(/ /g,"_").replace(/-/g,"_"):""):t("chrome")?d+" "+g+(/chrome\/((\d+)(\.(\d+))(\.\d+)*)/.test(r)?" "+g+RegExp.$2+(RegExp.$4>0?" "+g+RegExp.$2+"_"+RegExp.$4:""):""):t("iron")?d+" iron":t("applewebkit/")?d+" "+x+(/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(r)?" "+x+RegExp.$2+" "+x+RegExp.$2+RegExp.$3.replace(".","_"):/ Safari\/(\d+)/i.test(r)?"419"==RegExp.$1||"417"==RegExp.$1||"416"==RegExp.$1||"412"==RegExp.$1?" "+x+"2_0":"312"==RegExp.$1?" "+x+"1_3":"125"==RegExp.$1?" "+x+"1_2":"85"==RegExp.$1?" "+x+"1_0":"":""):t("mozilla/")?p:"",t("android|mobi|mobile|j2me|iphone|ipod|ipad|blackberry|playbook|kindle|silk")?w:"",t("j2me")?"j2me":t("ipad|ipod|iphone")?(/CPU( iPhone)? OS (\d+[_|\.]\d+([_|\.]\d+)*)/i.test(r)?"ios"+s("ios",RegExp.$2):"")+" "+(/(ip(ad|od|hone))/gi.test(r)?RegExp.$1:""):t("playbook")?"playbook":t("kindle|silk")?"kindle":t("playbook")?"playbook":t("mac")?"mac"+(/mac os x ((\d+)[.|_](\d+))/.test(r)?" mac"+RegExp.$2+" mac"+RegExp.$1.replace(".","_"):""):t("win")?"win"+(t("windows nt 6.2")?" win8":t("windows nt 6.1")?" win7":t("windows nt 6.0")?" vista":t("windows nt 5.2")||t("windows nt 5.1")?" win_xp":t("windows nt 5.0")?" win_2k":t("windows nt 4.0")||t("WinNT4.0")?" win_nt":""):t("freebsd")?"freebsd":t("x11|linux")?"linux":"",/[; |\[](([a-z]{2})(\-[a-z]{2})?)[)|;|\]]/i.test(r)?($+RegExp.$2).replace("-","_")+(""!=RegExp.$3?(" "+$+RegExp.$1).replace("-","_"):""):"",t("ipad|iphone|ipod")&&!t("safari")?"ipad_app":""];window.onresize=i,i();var f=b.join(" ")+" js ";return m.className=(f+m.className.replace(/\b(no[-|_]?)?js\b/g,"")).replace(/^ /,"").replace(/ +/g," "),f}showLog=!0,css_browser_selector(navigator.userAgent);
//64or32.com | MIT License
$(document).ready(function(){function n(n){return window.navigator.userAgent.indexOf(n)>-1}var i=window.navigator.platform,a="";a=n("x86_64")||n("x86-64")||n("Win64")||n("x64;")||n("amd64")||n("AMD64")||n("WOW64")||n("x64_64")||"MacIntel"===i||"Linux x86_64"===i?"arch64":"Linux armv7l"===i||"iPad"===i||"iPhone"===i||"Android"===i||"iPod"===i||"BlackBerry"===i?"mobile":"Linux i686"===i?"unknown":"arch32",$("html").addClass(a)});
//main.js
$(document).ready(function(){function t(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}$.get("https://api.github.com/repos/FLIF-Hub/UGUI_FLIF/releases",function(e){for(var a=[],s=[],o=[],r=[],l=0;l<e.length;l++){var d=e[l].tag_name,n=(d.split("v")[1],e[l].created_at),i=n.split("T")[0],h='<a href="https://github.com/FLIF-Hub/UGUI_FLIF/releases/tag/'+d+'" title="View release notes">'+i+"</a>",F="#",p="N/A",I="N/A";if(e[l].assets[0])for(var u=0;u<e[l].assets.length;u++){F=e[l].assets[u].browser_download_url,p=e[l].assets[u].download_count;var U=e[l].assets[u].size,b=U/1024,v=b/1024;I='<span title="'+t(Math.round(b))+' KB">'+Math.round(10*v)/10+" MB</span>";var g=e[l].assets[u].name;if(download='<a href="'+F+'" title="Download this version">'+g+"</a>",a.push(p),U>2e7){var w=g.split("").reverse().join("");w=w.replace("piz.","").replace("exe.","");var _=w.charAt(0);("2"==_||"4"==_)&&(w=w.substr(2));var f=w.toLowerCase().charAt(2);"w"==f?s.push(p):"l"==f?o.push(p):"o"==f&&r.push(p)}var c="<tr>";0==u&&0==l?c='<tr class="latest-release">':0==u&&(c='<tr class="new-release">'),$("#output tbody").append(c+"<td><strong>"+d+"</strong></td><td>"+download+"</td><td>"+I+"</td><td>"+h+"</td><td>"+p+"</td></tr>")}else $("#output tbody").append("<tr><td><strong>"+d+"</strong></td><td>"+download+"</td><td>"+I+"</td><td>"+h+"</td><td>"+p+"</td></tr>")}for(var L=0,G=0,m=0,z=0,y=0;y<a.length;y++)L+=a[y];for(var M=0;M<s.length;M++)G+=s[M];for(var x=0;x<o.length;x++)m+=o[x];for(var A=0;A<r.length;A++)z+=r[A];$("#total").html("<p>The official releases of UGUI: FLIF have been downloaded <strong>"+L+" times</strong>.</p>");var B=G+m+z;console.log(B),$("#os .win").width(Math.round(G/B*100)+"%").attr("title",G+" downloads"),$("#os .lin").width(Math.round(m/B*100)+"%").attr("title",m+" downloads"),$("#os .osx").width(Math.round(z/B*100)+"%").attr("title",z+" downloads"),$("#os").css("visibility","visible");var H=e[0].tag_name.split("v")[1];$(".dl-btn-win a").attr("href","https://github.com/FLIF-hub/UGUI_FLIF/releases/download/v"+H+"/UGUI_FLIF_"+H+"-win.exe"),$(".dl-btn-osx a").attr("href","https://github.com/FLIF-hub/UGUI_FLIF/releases/download/v"+H+"/UGUI_FLIF_"+H+"-osx.zip"),$(".dl-btn-lin32 a").attr("href","https://github.com/FLIF-hub/UGUI_FLIF/releases/download/v"+H+"/UGUI_FLIF_"+H+"-lin32.zip"),$(".dl-btn-lin64 a").attr("href","https://github.com/FLIF-hub/UGUI_FLIF/releases/download/v"+H+"/UGUI_FLIF_"+H+"-lin64.zip"),$(".dl-btn-lin a:first-of-type").attr("href","https://github.com/FLIF-hub/UGUI_FLIF/releases/download/v"+H+"/UGUI_FLIF_"+H+"-lin32.zip"),$(".dl-btn-lin a:last-of-type").attr("href","https://github.com/FLIF-hub/UGUI_FLIF/releases/download/v"+H+"/UGUI_FLIF_"+H+"-lin64.zip")})});
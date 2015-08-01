(function(){var e,t;jQuery.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}};e=jQuery.uaMatch(navigator.userAgent);t={};if(e.browser){t[e.browser]=true;t.version=e.version}if(t.chrome){t.webkit=true}else if(t.webkit){t.safari=true}jQuery.browser=t})();(function(){var e=false;window.JQClass=function(){};JQClass.classes={};JQClass.extend=function t(n){function o(){if(!e&&this._init){this._init.apply(this,arguments)}}var r=this.prototype;e=true;var i=new this;e=false;for(var s in n){i[s]=typeof n[s]=="function"&&typeof r[s]=="function"?function(e,t){return function(){var n=this._super;this._super=function(t){return r[e].apply(this,t)};var i=t.apply(this,arguments);this._super=n;return i}}(s,n[s]):n[s]}o.prototype=i;o.prototype.constructor=o;o.extend=t;return o}})();(function($){function camelCase(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()})}JQClass.classes.JQPlugin=JQClass.extend({name:"plugin",defaultOptions:{},regionalOptions:{},_getters:[],_getMarker:function(){return"is-"+this.name},_init:function(){$.extend(this.defaultOptions,this.regionalOptions&&this.regionalOptions[""]||{});var e=camelCase(this.name);$[e]=this;$.fn[e]=function(t){var n=Array.prototype.slice.call(arguments,1);if($[e]._isNotChained(t,n)){return $[e][t].apply($[e],[this[0]].concat(n))}return this.each(function(){if(typeof t==="string"){if(t[0]==="_"||!$[e][t]){throw"Unknown method: "+t}$[e][t].apply($[e],[this].concat(n))}else{$[e]._attach(this,t)}})}},setDefaults:function(e){$.extend(this.defaultOptions,e||{})},_isNotChained:function(e,t){if(e==="option"&&(t.length===0||t.length===1&&typeof t[0]==="string")){return true}return $.inArray(e,this._getters)>-1},_attach:function(e,t){e=$(e);if(e.hasClass(this._getMarker())){return}e.addClass(this._getMarker());t=$.extend({},this.defaultOptions,this._getMetadata(e),t||{});var n=$.extend({name:this.name,elem:e,options:t},this._instSettings(e,t));e.data(this.name,n);this._postAttach(e,n);this.option(e,t)},_instSettings:function(e,t){return{}},_postAttach:function(e,t){},_getMetadata:function(elem){try{var data=elem.data(this.name.toLowerCase())||"";data=data.replace(/'/g,'"');data=data.replace(/([a-zA-Z0-9]+):/g,function(e,t,n){var r=data.substring(0,n).match(/"/g);return!r||r.length%2===0?'"'+t+'":':t+":"});data=$.parseJSON("{"+data+"}");for(var name in data){var value=data[name];if(typeof value==="string"&&value.match(/^new Date\((.*)\)$/)){data[name]=eval(value)}}return data}catch(e){return{}}},_getInst:function(e){return $(e).data(this.name)||{}},option:function(e,t,n){e=$(e);var r=e.data(this.name);if(!t||typeof t==="string"&&n==null){var i=(r||{}).options;return i&&t?i[t]:i}if(!e.hasClass(this._getMarker())){return}var i=t||{};if(typeof t==="string"){i={};i[t]=n}this._optionsChanged(e,r,i);$.extend(r.options,i)},_optionsChanged:function(e,t,n){},destroy:function(e){e=$(e);if(!e.hasClass(this._getMarker())){return}this._preDestroy(e,this._getInst(e));e.removeData(this.name).removeClass(this._getMarker())},_preDestroy:function(e,t){}});$.JQPlugin={createPlugin:function(e,t){if(typeof e==="object"){t=e;e="JQPlugin"}e=camelCase(e);var n=camelCase(t.name);JQClass.classes[n]=JQClass.classes[e].extend(t);new JQClass.classes[n]}}})(jQuery);(function(e){var t="countdown";var n=0;var r=1;var i=2;var s=3;var o=4;var u=5;var a=6;e.JQPlugin.createPlugin({name:t,defaultOptions:{ujic_style:"classic",text_size:"35",animate_sec:false,color_down:"#3A3A3A",color_up:"#635b63",color_txt:"#ffffff",color_sw:"#000000",color_lab:"#000000",lab_sz:"13",ujic_txt:true,ujic_url:false,ujic_goof:"'Open Sans Condensed',sans-serif",ujic_hide:false,until:null,since:null,timezone:null,serverSync:null,format:"dHMS",layout:"",compact:false,padZeroes:true,significant:0,description:"",expiryUrl:"",expiryText:"",alwaysExpire:false,onExpiry:null,onTick:null,tickInterval:1},regionalOptions:{"":{labels:["Years","Months","Weeks","Days","Hours","Minutes","Seconds"],labels1:["Year","Month","Week","Day","Hour","Minute","Second"],compactLabels:["y","m","w","d"],whichLabels:null,digits:["0","1","2","3","4","5","6","7","8","9"],timeSeparator:":",isRTL:false}},_getters:["getTimes"],_rtlClass:t+"-rtl",_sectionClass:t+"-section",_amountClass:t+"-amount",_periodClass:t+"-period",_rowClass:t+"-row",_holdingClass:t+"-holding",_showClass:t+"-show",_descrClass:t+"-descr",_timerElems:[],_init:function(){function i(e){var u=e<1e12?r?performance.now()+performance.timing.navigationStart:n():e||n();if(u-o>=1e3){t._updateElems();o=u}s(i)}var t=this;this._super();this._serverSyncs=[];var n=typeof Date.now=="function"?Date.now:function(){return(new Date).getTime()};var r=window.performance&&typeof window.performance.now=="function";var s=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null;var o=0;if(!s||e.noRequestAnimationFrame){e.noRequestAnimationFrame=null;setInterval(function(){t._updateElems()},980)}else{o=window.animationStartTime||window.webkitAnimationStartTime||window.mozAnimationStartTime||window.oAnimationStartTime||window.msAnimationStartTime||n();s(i)}},UTCDate:function(e,t,n,r,i,s,o,u){if(typeof t=="object"&&t.constructor==Date){u=t.getMilliseconds();o=t.getSeconds();s=t.getMinutes();i=t.getHours();r=t.getDate();n=t.getMonth();t=t.getFullYear()}var a=new Date;a.setUTCFullYear(t);a.setUTCDate(1);a.setUTCMonth(n||0);a.setUTCDate(r||1);a.setUTCHours(i||0);a.setUTCMinutes((s||0)-(Math.abs(e)<30?e*60:e));a.setUTCSeconds(o||0);a.setUTCMilliseconds(u||0);return a},periodsToSeconds:function(e){return e[0]*31557600+e[1]*2629800+e[2]*604800+e[3]*86400+e[4]*3600+e[5]*60+e[6]},_instSettings:function(e,t){return{_periods:[0,0,0,0,0,0,0]}},_addElem:function(e){if(!this._hasElem(e)){this._timerElems.push(e)}},_hasElem:function(t){return e.inArray(t,this._timerElems)>-1},_removeElem:function(t){this._timerElems=e.map(this._timerElems,function(e){return e==t?null:e})},_updateElems:function(){for(var e=this._timerElems.length-1;e>=0;e--){this._updateCountdown(this._timerElems[e])}},_optionsChanged:function(t,n,r){if(r.layout){r.layout=r.layout.replace(/&lt;/g,"<").replace(/&gt;/g,">")}this._resetExtraLabels(n.options,r);var i=n.options.timezone!=r.timezone;e.extend(n.options,r);this._adjustSettings(t,n,r.until!=null||r.since!=null||i);var s=new Date;if(n._since&&n._since<s||n._until&&n._until>s){this._addElem(t[0])}this._updateCountdown(t,n)},_updateCountdown:function(t,n){t=t.jquery?t:e(t);n=n||t.data(this.name);if(!n){return}t.html(this._generateHTML(n)).toggleClass(this._rtlClass,n.options.isRTL);var r=n.options.ujic_style;if(r=="classic"){var i=n.options.color_down;var s=n.options.color_up;var o=n.options.ujic_goof;var u=navigator.userAgent.toLowerCase();jQuery.browser.chrome=/chrome/.test(navigator.userAgent.toLowerCase());
    jQuery("#ujiCountdown"+" .countdown_amount").css("background","-moz-linear-gradient(top,  "+s+" 50%, "+i+" 50%)");
    jQuery("#ujiCountdown"+" .countdown_amount").css("background","-o-linear-gradient(top,  "+s+" 50%,"+i+" 50%)");
    jQuery("#ujiCountdown"+" .countdown_amount").css("background","-ms-linear-gradient(top,  "+s+" 50%,"+i+" 50%)");
    jQuery("#ujiCountdown"+" .countdown_amount").css("background","linear-gradient(to bottom,  "+s+" 50%,"+i+" 50%)");
    jQuery("#ujiCountdown"+" .countdown_amount").css("filter","progid:DXImageTransform.Microsoft.gradient( startColorstr='"+s+"', endColorstr='"+i+"',GradientType=0 )");
    if(jQuery.browser.safari||jQuery.browser.chrome){jQuery("#ujiCountdown"+" .countdown_amount").css("background","-webkit-gradient(linear, left top, left bottom, color-stop(50%,"+s+"), color-stop(50%,"+i+"))");jQuery("#ujiCountdown"+" .countdown_amount").css("background","-webkit-linear-gradient(top,  "+s+" 50%,"+i+" 50%)")}jQuery("#ujiCountdown").children(".countdown_row").children("span:last-child").css("margin","0");if(jQuery("#ujiCountdown").children(".countdown_row").children("span:last-child").hasClass("uji_sec")){jQuery("#ujiCountdown").children(".countdown_row").children(".uji_sec").children(".countdown_section").css("margin","0")}var a=n.options.color_txt;var f=n.options.color_sw;jQuery("#ujiCountdown"+" .countdown_amount").css("color",a);jQuery("#ujiCountdown"+" .countdown_amount").css("text-shadow","1px 1px 1px "+f);var l=n.options.color_lab;jQuery("#ujiCountdown"+" .countdown_txt").css("color",l);var c=n.options.ujic_txt;var h=n.options.lab_sz;if(c){jQuery("#ujiCountdown"+" .countdown_txt").css("display","block");jQuery("#ujiCountdown"+" .countdown_txt").css("font",h+"px 'Open Sans Condensed',sans-serif")}else{jQuery("#ujiCountdown"+" .countdown_txt").css("display","none")}var p=n.options.text_size;var d=0;switch(parseInt(p)){case 10:d=5;break;case 11:d=3;break;case 12:d=3;break;case 13:d=1;break}jQuery("#ujiCountdown"+" .countdown_amount").css("font",p+"px/1.5 '"+o+"',sans-serif");if(o!="none")jQuery("#ujiCountdown"+" .countdown_amount").css("min-width",parseInt(p)-10+"px");if(p<15){jQuery("#ujiCountdown"+" .countdown_amount").css({padding:"2px 5px","margin-right":"1px"});jQuery("#ujiCountdown"+" .countdown_section").css("margin","0px 6px 0px 0px");jQuery("#ujiCountdown"+" .countdown_txt").css("font","9px 'Open Sans Condensed',sans-serif")}var v=n.options.animate_sec;if(v){jQuery("#ujiCountdown").find(".uji_sec").find(".countdown_amount").css({"text-align":"center"});jQuery("#ujiCountdown").find(".uji_sec").find(".countdown_amount").eq(1).css({top:"-74px",position:"relative",opacity:1});jQuery("#ujiCountdown").find(".uji_sec").find(".countdown_amount").eq(1).animate({top:d+"px",opacity:1},700,function(){jQuery("#ujiCountdown").find(".uji_sec").find(".countdown_amount").eq(1).animate({opacity:0},300)})}}if(e.isFunction(n.options.onTick)){var m=n._hold!="lap"?n._periods:this._calculatePeriods(n,n._show,n.options.significant,new Date);if(n.options.tickInterval==1||this.periodsToSeconds(m)%n.options.tickInterval==0){n.options.onTick.apply(t[0],[m])}}var g=n._hold!="pause"&&(n._since?n._now.getTime()<n._since.getTime():n._now.getTime()>=n._until.getTime());if(g&&!n._expiring){n._expiring=true;if(this._hasElem(t[0])||n.options.alwaysExpire){this._removeElem(t[0]);if(e.isFunction(n.options.onExpiry)){n.options.onExpiry.apply(t[0],[])}if(n.options.ujic_hide=="true"){jQuery("#ujiCountdown").remove()}if(n.options.expiryText){var y=n.options.layout;n.options.layout=n.options.expiryText;this._updateCountdown(t[0],n);n.options.layout=y}if(n.options.expiryUrl){window.location=n.options.expiryUrl}}n._expiring=false}else if(n._hold=="pause"){this._removeElem(t[0])}},_resetExtraLabels:function(e,t){var n=false;for(var r in t){if(r!="whichLabels"&&r.match(/[Ll]abels/)){n=true;break}}if(n){for(var r in e){if(r.match(/[Ll]abels[02-9]|compactLabels1/)){e[r]=null}}}},_adjustSettings:function(t,n,r){var i;var s=0;var o=null;for(var u=0;u<this._serverSyncs.length;u++){if(this._serverSyncs[u][0]==n.options.serverSync){o=this._serverSyncs[u][1];break}}if(o!=null){s=n.options.serverSync?o:0;i=new Date}else{var a=e.isFunction(n.options.serverSync)?n.options.serverSync.apply(t[0],[]):null;i=new Date;s=a?i.getTime()-a.getTime():0;this._serverSyncs.push([n.options.serverSync,s])}var f=n.options.timezone;f=f==null?-i.getTimezoneOffset():f;if(r||!r&&n._until==null&&n._since==null){n._since=n.options.since;if(n._since!=null){n._since=this.UTCDate(f,this._determineTime(n._since,null));if(n._since&&s){n._since.setMilliseconds(n._since.getMilliseconds()+s)}}n._until=this.UTCDate(f,this._determineTime(n.options.until,i));if(s){n._until.setMilliseconds(n._until.getMilliseconds()+s)}}n._show=this._determineShow(n)},_preDestroy:function(e,t){this._removeElem(e[0]);e.empty()},pause:function(e){this._hold(e,"pause")},lap:function(e){this._hold(e,"lap")},resume:function(e){this._hold(e,null)},toggle:function(t){var n=e.data(t,this.name)||{};this[!n._hold?"pause":"resume"](t)},toggleLap:function(t){var n=e.data(t,this.name)||{};this[!n._hold?"lap":"resume"](t)},_hold:function(t,n){var r=e.data(t,this.name);if(r){if(r._hold=="pause"&&!n){r._periods=r._savePeriods;var i=r._since?"-":"+";r[r._since?"_since":"_until"]=this._determineTime(i+r._periods[0]+"y"+i+r._periods[1]+"o"+i+r._periods[2]+"w"+i+r._periods[3]+"d"+i+r._periods[4]+"h"+i+r._periods[5]+"m"+i+r._periods[6]+"s");this._addElem(t)}r._hold=n;r._savePeriods=n=="pause"?r._periods:null;e.data(t,this.name,r);this._updateCountdown(t,r)}},getTimes:function(t){var n=e.data(t,this.name);return!n?null:n._hold=="pause"?n._savePeriods:!n._hold?n._periods:this._calculatePeriods(n,n._show,n.options.significant,new Date)},_determineTime:function(e,t){var n=this;var r=function(e){var t=new Date;t.setTime(t.getTime()+e*1e3);return t};var i=function(e){e=e.toLowerCase();var t=new Date;var r=t.getFullYear();var i=t.getMonth();var s=t.getDate();var o=t.getHours();var u=t.getMinutes();var a=t.getSeconds();var f=/([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;var l=f.exec(e);while(l){switch(l[2]||"s"){case"s":a+=parseInt(l[1],10);break;case"m":u+=parseInt(l[1],10);break;case"h":o+=parseInt(l[1],10);break;case"d":s+=parseInt(l[1],10);break;case"w":s+=parseInt(l[1],10)*7;break;case"o":i+=parseInt(l[1],10);s=Math.min(s,n._getDaysInMonth(r,i));break;case"y":r+=parseInt(l[1],10);s=Math.min(s,n._getDaysInMonth(r,i));break}l=f.exec(e)}return new Date(r,i,s,o,u,a,0)};var s=e==null?t:typeof e=="string"?i(e):typeof e=="number"?r(e):e;if(s)s.setMilliseconds(0);return s},_getDaysInMonth:function(e,t){return 32-(new Date(e,t,32)).getDate()},_normalLabels:function(e){return e},_generateHTML:function(t){var f=this;t._periods=t._hold?t._periods:this._calculatePeriods(t,t._show,t.options.significant,new Date);var l=false;var c=0;var h=t.options.significant;var p=e.extend({},t._show);for(var d=n;d<=a;d++){l|=t._show[d]=="?"&&t._periods[d]>0;p[d]=t._show[d]=="?"&&!l?null:t._show[d];c+=p[d]?1:0;h-=t._periods[d]>0?1:0}var v=[false,false,false,false,false,false,false];for(var d=a;d>=n;d--){if(t._show[d]){if(t._periods[d]){v[d]=true}else{v[d]=h>0;h--}}}var m=t.options.compact?t.options.compactLabels:t.options.labels;var g=t.options.whichLabels||this._normalLabels;var y=function(e){var n=t.options["compactLabels"+g(t._periods[e])];return p[e]?f._translateDigits(t,t._periods[e])+(n?n[e]:m[e])+" ":""};var b=t.options.padZeroes?2:1;var w=function(e){var n=t.options["labels"+g(t._periods[e])];if(!N&&p[e]||N&&v[e]){var r="";if(t._periods[e].toString().length==1){r='<span class="countdown_amount">'+0+"</span>"+'<span class="countdown_amount">'+t._periods[e]+"</span>"}else{for(var i=0;i<t._periods[e].toString().length;i++){r+='<span class="countdown_amount">'+t._periods[e].toString().charAt(i)+"</span>"}}return'<span class="countdown_section">'+r+'<span class="countdown_txt">'+(n?n[e]:m[e])+"</span></span>"}else{return""}};var E=t.options.ujic_style;var x=t.options.layout;var T=t.options.compact;var N=t.options.significant;var C=t.options.description;if(E=="classic"){return x?this._buildLayout(t,p,x,T,N,v):(T?'<span class="countdown_row countdown_amount'+(t._hold?" countdown_holding":"")+'">'+y(n)+y(r)+y(i)+y(s)+(p[o]?this._minDigits(t._periods[o],2):"")+(p[u]?(p[o]?timeSeparator:"")+this._minDigits(t._periods[u],2):"")+(p[a]?(p[o]||p[u]?timeSeparator:"")+this._minDigits(t._periods[a],2):""):'<span class="countdown_row countdown_show'+(N||c)+(t._hold?" countdown_holding":"")+'">'+w(n)+w(r)+w(i)+w(s)+w(o)+w(u)+(w(a)?'<span class="uji_sec">'+w(a)+"</span>":""))+"</span>"+(C?'<span class="countdown_row countdown_descr">'+C+"</span>":"")}},_buildLayout:function(t,f,l,c,h,p){var d=t.options[c?"compactLabels":"labels"];var v=t.options.whichLabels||this._normalLabels;var m=function(e){return(t.options[(c?"compactLabels":"labels")+v(t._periods[e])]||d)[e]};var g=function(e,n){return t.options.digits[Math.floor(e/n)%10]};var y={desc:t.options.description,sep:t.options.timeSeparator,yl:m(n),yn:this._minDigits(t,t._periods[n],1),ynn:this._minDigits(t,t._periods[n],2),ynnn:this._minDigits(t,t._periods[n],3),y1:g(t._periods[n],1),y10:g(t._periods[n],10),y100:g(t._periods[n],100),y1000:g(t._periods[n],1e3),ol:m(r),on:this._minDigits(t,t._periods[r],1),onn:this._minDigits(t,t._periods[r],2),onnn:this._minDigits(t,t._periods[r],3),o1:g(t._periods[r],1),o10:g(t._periods[r],10),o100:g(t._periods[r],100),o1000:g(t._periods[r],1e3),wl:m(i),wn:this._minDigits(t,t._periods[i],1),wnn:this._minDigits(t,t._periods[i],2),wnnn:this._minDigits(t,t._periods[i],3),w1:g(t._periods[i],1),w10:g(t._periods[i],10),w100:g(t._periods[i],100),w1000:g(t._periods[i],1e3),dl:m(s),dn:this._minDigits(t,t._periods[s],1),dnn:this._minDigits(t,t._periods[s],2),dnnn:this._minDigits(t,t._periods[s],3),d1:g(t._periods[s],1),d10:g(t._periods[s],10),d100:g(t._periods[s],100),d1000:g(t._periods[s],1e3),hl:m(o),hn:this._minDigits(t,t._periods[o],1),hnn:this._minDigits(t,t._periods[o],2),hnnn:this._minDigits(t,t._periods[o],3),h1:g(t._periods[o],1),h10:g(t._periods[o],10),h100:g(t._periods[o],100),h1000:g(t._periods[o],1e3),ml:m(u),mn:this._minDigits(t,t._periods[u],1),mnn:this._minDigits(t,t._periods[u],2),mnnn:this._minDigits(t,t._periods[u],3),m1:g(t._periods[u],1),m10:g(t._periods[u],10),m100:g(t._periods[u],100),m1000:g(t._periods[u],1e3),sl:m(a),sn:this._minDigits(t,t._periods[a],1),snn:this._minDigits(t,t._periods[a],2),snnn:this._minDigits(t,t._periods[a],3),s1:g(t._periods[a],1),s10:g(t._periods[a],10),s100:g(t._periods[a],100),s1000:g(t._periods[a],1e3)};var b=l;for(var w=n;w<=a;w++){var E="yowdhms".charAt(w);var x=new RegExp("\\{"+E+"<\\}([\\s\\S]*)\\{"+E+">\\}","g");b=b.replace(x,!h&&f[w]||h&&p[w]?"$1":"")}e.each(y,function(e,t){var n=new RegExp("\\{"+e+"\\}","g");b=b.replace(n,t)});return b},_minDigits:function(e,t,n){t=""+t;if(t.length>=n){return this._translateDigits(e,t)}t="0000000000"+t;return this._translateDigits(e,t.substr(t.length-n))},_translateDigits:function(e,t){return(""+t).replace(/[0-9]/g,function(t){return e.options.digits[t]})},_determineShow:function(e){var t=e.options.format;var f=[];f[n]=t.match("y")?"?":t.match("Y")?"!":null;f[r]=t.match("o")?"?":t.match("O")?"!":null;f[i]=t.match("w")?"?":t.match("W")?"!":null;f[s]=t.match("d")?"?":t.match("D")?"!":null;f[o]=t.match("h")?"?":t.match("H")?"!":null;f[u]=t.match("m")?"?":t.match("M")?"!":null;f[a]=t.match("s")?"?":t.match("S")?"!":null;return f},_calculatePeriods:function(e,t,f,l){e._now=l;e._now.setMilliseconds(0);var c=new Date(e._now.getTime());if(e._since){if(l.getTime()<e._since.getTime()){e._now=l=c}else{l=e._since}}else{c.setTime(e._until.getTime());if(l.getTime()>e._until.getTime()){e._now=l=c}}var h=[0,0,0,0,0,0,0];if(t[n]||t[r]){var p=this._getDaysInMonth(l.getFullYear(),l.getMonth());var d=this._getDaysInMonth(c.getFullYear(),c.getMonth());var v=c.getDate()==l.getDate()||c.getDate()>=Math.min(p,d)&&l.getDate()>=Math.min(p,d);var m=function(e){return(e.getHours()*60+e.getMinutes())*60+e.getSeconds()};var g=Math.max(0,(c.getFullYear()-l.getFullYear())*12+c.getMonth()-l.getMonth()+(c.getDate()<l.getDate()&&!v||v&&m(c)<m(l)?-1:0));h[n]=t[n]?Math.floor(g/12):0;h[r]=t[r]?g-h[n]*12:0;l=new Date(l.getTime());var y=l.getDate()==p;var b=this._getDaysInMonth(l.getFullYear()+h[n],l.getMonth()+h[r]);if(l.getDate()>b){l.setDate(b)}l.setFullYear(l.getFullYear()+h[n]);l.setMonth(l.getMonth()+h[r]);if(y){l.setDate(b)}}var w=Math.floor((c.getTime()-l.getTime())/1e3);var E=function(e,n){h[e]=t[e]?Math.floor(w/n):0;w-=h[e]*n};E(i,604800);E(s,86400);E(o,3600);E(u,60);E(a,1);if(w>0&&!e._since){var x=[1,12,4.3482,7,24,60,60];var T=a;var N=1;for(var C=a;C>=n;C--){if(t[C]){if(h[T]>=N){h[T]=0;w=1}if(w>0){h[C]++;w=0;T=C;N=1}}N*=x[C]}}if(f){for(var C=n;C<=a;C++){if(f&&h[C]){f--}else if(!f){h[C]=0}}}return h}})})(jQuery)
(function(e){function t(t){for(var s,i,o=t[0],c=t[1],u=t[2],h=0,d=[];h<o.length;h++)i=o[h],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&d.push(r[i][0]),r[i]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);l&&l(t);while(d.length)d.shift()();return n.push.apply(n,u||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],s=!0,o=1;o<a.length;o++){var c=a[o];0!==r[c]&&(s=!1)}s&&(n.splice(t--,1),e=i(i.s=a[0]))}return e}var s={},r={app:0},n=[];function i(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=s,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(a,s,function(t){return e[t]}.bind(null,s));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=c;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"0085":function(e,t,a){},"034f":function(e,t,a){"use strict";var s=a("85ec"),r=a.n(s);r.a},"10d8":function(e,t,a){},3923:function(e,t,a){},4700:function(e,t,a){"use strict";var s=a("10d8"),r=a.n(s);r.a},"4af2":function(e,t,a){"use strict";var s=a("73a9"),r=a.n(s);r.a},5659:function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[e._m(0),a("router-view")],1)},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("h1",[e._v("weather "),a("br"),e._v("app")])}],i={name:"app"},o=i,c=(a("034f"),a("2877")),u=Object(c["a"])(o,r,n,!1,null,null,null),l=u.exports,h=a("8c4f"),d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"body"}},[a("div",{staticClass:"content"},[a("p",[e._v("Enter a city")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.query,expression:"query"}],attrs:{placeholder:"Seattle",id:"text-box"},domProps:{value:e.query},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitQuery(t)},input:function(t){t.target.composing||(e.query=t.target.value)}}}),a("div",{staticClass:"citylist"},[a("city-list",{attrs:{citylist:e.listItems}})],1)])])},m=[],f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",{staticClass:"city-list"},[e._m(0),e.savedCities.length<1?a("li",[e._v("Add cities to this list")]):e._e(),e._l(e.savedCities,(function(t,s){return a("li",{key:s},[a("router-link",{attrs:{to:{name:"CurrentWeather",params:{cityId:t.id}}}},[e._v(e._s(t.name))]),a("button",{staticClass:"remove",on:{click:function(a){return e.removeCity(t)}}},[e._v("x")])],1)}))],2)},p=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",[a("h2")])}],v=(a("c975"),a("a434"),{name:"CityList",data:function(){return{}},props:{savedCities:Array},methods:{removeCity:function(e){this.savedCities.splice(this.savedCities.indexOf(e),1),this.$ls.set("savedCities",this.savedCities)}}}),g=v,y=(a("e49f"),Object(c["a"])(g,f,p,!1,null,"18d55ab4",null)),_=y.exports,w={name:"SearchPage",data:function(){return{query:"",messages:[],listItems:[]}},components:{"city-list":_},created:function(){this.$ls.get("citylist")&&(this.listItems=this.$ls.get("citylist"))},methods:{submitQuery:function(){this.$router.push({name:"SearchResults",params:{query:this.query}})}}},b=w,C=(a("8fcc"),Object(c["a"])(b,d,m,!1,null,"0ee667a9",null)),$=C.exports,D=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("body",[a("message-container",{attrs:{messages:e.messages}}),a("city-list",{staticClass:"city-list",attrs:{citylist:e.listItems}}),a("div",{attrs:{id:"form"}},[a("p",[e._v("Enter a city")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.$route.params.query,expression:"$route.params.query"}],attrs:{placeholder:"Seattle",id:"text-box"},domProps:{value:e.$route.params.query},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getCities(t)},input:function(t){t.target.composing||e.$set(e.$route.params,"query",t.target.value)}}})]),a("div",{attrs:{id:"search-results"}},[e.showLoading?a("load-spinner"):e._e(),e.results&&e.results.list.length>0?a("ul",{staticClass:"cities"},e._l(e.results.list,(function(t,s){return a("li",{key:s},[a("router-link",{staticClass:"result-name",attrs:{to:{name:"WeatherData",params:{cityId:t.id}}}},[e._v(e._s(t.name)+", "+e._s(t.sys.country))]),a("p",[a("button",{staticClass:"save",on:{click:function(a){return e.saveCity(t)}}},[e._v("Add to Shortcuts")])])],1)})),0):e._e()],1)],1)},x=[],O=(a("d3b7"),a("bc3a")),k=a.n(O),q=k.a.create({baseURL:"//api.openweathermap.org/data/2.5/"});q.interceptors.request.use((function(e){return e.params.APPID="cadb942492f5c2c67512076c9cd5e63d",e.params.units="imperial",e}),(function(e){return Promise.reject(e)}));var j={name:"SearchResults",components:{"city-list":_},data:function(){return{results:null,query:"",showLoading:!1,messages:[],listItems:[]}},created:function(){this.getCities(),this.$ls.get("saved")&&(this.listItems=this.$ls.get("city-list"))},methods:{saveCity:function(e){this.listItems.push(e),this.$ls.set("city-list",this.listItems)},getCities:function(){var e=this;this.results=null,this.showLoading=!0;var t="citySearch_"+this.$route.params.query,a=9e5;this.$ls.get(t)?(console.log("Cached query detected."),this.results=this.$ls.get(t),this.showLoading=!1):(console.log("No cache available. Making API request."),q.get("find",{params:{q:this.$route.params.query}}).then((function(s){e.$ls.set(t,s.data,a),console.log("New query has been cached as: "+t),e.results=s.data,e.showLoading=!1})).catch((function(t){e.messages.push({type:"error",text:t.message}),e.showLoading=!1})))}}},L=j,M=(a("5995"),Object(c["a"])(L,D,x,!1,null,"4abc26da",null)),E=M.exports,I=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("body",[a("h2",[e._v(" The weather in "),e.weatherData?a("span",[e._v(" "+e._s(e.weatherData.name)+", "+e._s(e.weatherData.sys.country))]):e._e()]),a("message-container",{attrs:{messages:e.messages}}),a("p",[e.showLoading?a("spinner"):e._e()],1),a("div",{staticClass:"body"},[a("h3",[e._v("Currently")]),e.weatherData?a("div",{staticClass:"main-weather"},[a("div",{staticClass:"weather-image"},[a("weather-main",{attrs:{weatherMain:e.weatherData}})],1),a("div",{staticClass:"weather-info"},[a("weather-data",{attrs:{weatherData:e.weatherData.main}})],1)]):e._e(),e.weatherData?a("div",{staticClass:"forecast"},[a("forecast",{attrs:{foreCast:e.foreCast}})],1):e._e()])],1)},P=[],S=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",[a("v-tooltip",{attrs:{right:""},scopedSlots:e._u([{key:"activator",fn:function(t){var s=t.on,r=t.attrs;return[e.weatherData.temp!=e.weatherData.temp_min?a("h2",e._g(e._b({},"h2",r,!1),s),[e._v(e._s(e.weatherData.temp)+"°F")]):e._e()]}}])},[a("span",[a("dt",[e._v("High")]),a("dd",[e._v(e._s(e.weatherData.temp_max)+"°F")]),a("dt",[e._v("Low")]),a("dd",[e._v(e._s(e.weatherData.temp_min)+"°F")])])]),a("dt",[e._v("Humidity")]),a("dd",[e._v(e._s(e.weatherData.humidity)+"%")])],1)])},A=[],N={name:"WeatherData",data:function(){return{}},props:{weatherData:Object}},W=N,F=(a("4700"),Object(c["a"])(W,S,A,!1,null,"19756d40",null)),J=F.exports,T=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("img",{attrs:{src:"https://via.placeholder.com/150"}}),a("h2",[e._v(e._s(e.weatherMain.weather[0].main))])])},R=[],H={name:"WeatherMain",data:function(){return{}},props:{weatherMain:Object}},Q=H,U=(a("984d"),Object(c["a"])(Q,T,R,!1,null,"34361633",null)),z=U.exports,B=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"message-container"},[e.messages.length>0?a("ul",e._l(e.messages,(function(e,t){return a("message-item",{key:t,attrs:{message:e}})})),1):e._e()])},G=[],K=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("li",{directives:[{name:"show",rawName:"v-show",value:e.showMessage,expression:"showMessage"}],staticClass:"error"},[e._v(" Error: "+e._s(e.message.Error)+" "),a("button",{on:{click:e.close}},[e._v("close")])])},V=[],X={name:"MessageContainer",props:{message:Object},data:function(){return{showMessage:!0}},methods:{close:function(){this.showMessage=!1}},created:function(){setTimeout(this.close,5e3)}},Y=X,Z=(a("4af2"),Object(c["a"])(Y,K,V,!1,null,"0b8c3fff",null)),ee=Z.exports,te={name:"MessageContainer",props:{messages:Array},components:{"message-item":ee}},ae=te,se=(a("7b67"),Object(c["a"])(ae,B,G,!1,null,"01d38edc",null)),re=se.exports,ne=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("message-container",{attrs:{messages:e.messages}}),e.weatherData?a("ul",{staticClass:"forecast"},[a("transition-group",{attrs:{name:"fade",tag:"div",appear:""}},e._l(e.weatherData.list,(function(t){return a("li",{key:t.dt},[a("h3",[e._v(e._s(e._f("formatDate")(t.dt)))]),a("weather-summary",{attrs:{weatherData:t.weather}}),a("weather-data",{attrs:{weatherData:t.main}})],1)})),0)],1):e._e(),e.showLoading?a("spinner"):e._e()],1)},ie=[],oe=(a("99af"),{name:"Forecast",components:{"weather-data":J},data:function(){return{weatherData:null,messages:[],query:"",showLoading:!1}},created:function(){var e=this;this.showLoading=!0;var t="forecast_"+this.$route.params.cityId,a=9e5;this.$ls.get(t)?(console.log("Cached query detected."),this.results=this.$ls.get(t),this.showLoading=!1):(console.log("No cache detected. Making API request."),q.get("forecast",{params:{id:this.$route.params.cityId}}).then((function(s){e.$ls.set(t,s.data,a),e.showLoading=!1,e.weatherData=s.data})).catch((function(t){e.showLoading=!1,e.messages.push({type:"error",text:t.message})})))},filters:{formatDate:function(e){var t=new Date(1e3*e),a=["January","February","March","April","May","June","July","August","September","October","November","December"],s=t.getDate(),r=t.getMonth();return"".concat(a[r]," ").concat(s)}}}),ce=oe,ue=(a("94f7"),Object(c["a"])(ce,ne,ie,!1,null,"4f1c8cea",null)),le=ue.exports,he={name:"WeatherData",components:{forecast:le,"weather-data":J,"weather-main":z,"message-container":re},data:function(){return{weatherData:null,foreCast:null,messages:[],query:"",showLoading:!1}},created:function(){var e=this;this.showLoading=!0;var t="currentWeather_"+this.$route.params.cityId,a=9e5;this.$ls.get(t)?(console.log("Cached query detected."),this.weatherData=this.$ls.get(t),this.showLoading=!1):(console.log("No cache detected. Making API request."),q.get("weather",{params:{id:this.$route.params.cityId}}).then((function(s){e.$ls.set(t,s.data,a),e.showLoading=!1,e.weatherData=s.data})).catch((function(t){e.showLoading=!1,e.messages.push({type:"error",text:t.message})})))}},de=he,me=(a("c6a4"),Object(c["a"])(de,I,P,!1,null,"a86a3ebe",null)),fe=me.exports;s["a"].use(h["a"]);var pe=[{path:"/",name:"SearchPage",component:$},{path:"/results",name:"SearchResults",component:E},{path:"/weather",name:"WeatherData",component:fe}],ve=new h["a"]({routes:pe}),ge=ve,ye=a("c16e"),_e=a.n(ye),we={namespace:"weather__"};s["a"].use(_e.a,we),s["a"].config.productionTip=!1,new s["a"]({router:ge,render:function(e){return e(l)}}).$mount("#app")},5995:function(e,t,a){"use strict";var s=a("a150"),r=a.n(s);r.a},"73a9":function(e,t,a){},"7b67":function(e,t,a){"use strict";var s=a("8d50"),r=a.n(s);r.a},"85ec":function(e,t,a){},"8d50":function(e,t,a){},"8fcc":function(e,t,a){"use strict";var s=a("0085"),r=a.n(s);r.a},"94f7":function(e,t,a){"use strict";var s=a("e8d4"),r=a.n(s);r.a},"984d":function(e,t,a){"use strict";var s=a("5659"),r=a.n(s);r.a},a150:function(e,t,a){},c6a4:function(e,t,a){"use strict";var s=a("3923"),r=a.n(s);r.a},d358:function(e,t,a){},e49f:function(e,t,a){"use strict";var s=a("d358"),r=a.n(s);r.a},e8d4:function(e,t,a){}});
//# sourceMappingURL=app.28d31559.js.map
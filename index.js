import{d,a as oe,c as le,b as ce,l as de,r as he,u as pe,t as ue,i as be,e as fe,f as S,B as ve,g as f,n as l,s as v,o as T,h as G,x as o,m as me,j as u,k as ge,p as we,v as ye,R as O,w as _e}from"./vendor-7b54e5a9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=i(r);fetch(r.href,n)}})();const xe="modulepreload",ke=function(e){return"/"+e},Q={},$=function(t,i,s){if(!i||i.length===0)return t();const r=document.getElementsByTagName("link");return Promise.all(i.map(n=>{if(n=ke(n),n in Q)return;Q[n]=!0;const a=n.endsWith(".css"),_=a?'[rel="stylesheet"]':"";if(!!s)for(let m=r.length-1;m>=0;m--){const g=r[m];if(g.href===n&&(!a||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${_}`))return;const h=document.createElement("link");if(h.rel=a?"stylesheet":xe,a||(h.as="script",h.crossOrigin=""),h.href=n,document.head.appendChild(h),a)return new Promise((m,g)=>{h.addEventListener("load",m),h.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>t()).catch(n=>{const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=n,window.dispatchEvent(a),!a.defaultPrevented)throw n})};function $e(e={}){const{immediate:t=!1,onNeedRefresh:i,onOfflineReady:s,onRegistered:r,onRegisteredSW:n,onRegisterError:a}=e;let _,A;const h=async(g=!0)=>{await A};async function m(){if("serviceWorker"in navigator){const{Workbox:g}=await $(()=>import("./vendor-7b54e5a9.js").then(c=>c.M),[]);_=new g("/sw.js",{scope:"/",type:"classic"}),_.addEventListener("activated",c=>{(c.isUpdate||c.isExternal)&&window.location.reload()}),_.addEventListener("installed",c=>{c.isUpdate||s==null||s()}),_.register({immediate:t}).then(c=>{n?n("/sw.js",c):r==null||r(c)}).catch(c=>{a==null||a(c)})}}return A=m(),h}const Oe=[{path:"/",component:"cpcb-dashboard",action:async()=>{await $(()=>import("./cpcb-dashboard-app-f004b274.js"),["assets/cpcb-dashboard-app-f004b274.js","assets/vendor-7b54e5a9.js","assets/index-bfa9438a.js","assets/cpcb-dashboard-app-c1e1d109.css"])},children:[{path:"/",name:"index",component:"page-index",action:async()=>{await $(()=>import("./page-index-7bd1c4cc.js"),["assets/page-index-7bd1c4cc.js","assets/vendor-7b54e5a9.js","assets/index-bfa9438a.js","assets/ol-909c0768.js"])}},{path:"(.*)",name:"not-found",component:"page-not-found",action:async()=>{await $(()=>import("./page-not-found-856d693d.js"),["assets/page-not-found-856d693d.js","assets/vendor-7b54e5a9.js"])}}]}];d.extend(oe);d.extend(le);d.extend(ce);d.extend(de);d.extend(he);d.extend(pe);d.extend(ue);d.extend(be);d.extend(fe);S.isInitialized||(S.init({fallbackLng:"en"}),S.on("languageChanged",e=>{d.locale(e)}));function ee(e,t){Object.entries(t).forEach(([i,s])=>{Object.entries(s).forEach(([r,n])=>{e.addResourceBundle(i,r,n,!0,!0)})})}function Pe(){this.i18n=S.createInstance(),this.i18n.use(ve),this.i18n.init({detection:{order:["sessionStorage","querystring","cookie","navigator","htmlTag","path","subdomain","localStorage"]},fallbackLng:"en",defaultNS:"common",debug:!1,resources:{}},e=>{e&&console.log("something went wrong loading",e)}),this.i18n.on("initialized",()=>{this.requestUpdate()}),this.i18n.on("languageChanged",()=>{this.requestUpdate()}),this.i18n.store.on("added",()=>this.requestUpdate()),this.i18n.store.on("removed",()=>this.requestUpdate())}const te=function(e,t){return class extends e{constructor(){super(),this.i18n||Pe.call(this),ee(this.i18n,t)}}},qt=function(e){return function(i){return te(i,e)}},Ce=(e,{nls:t={}})=>te(e,t),Ee="Search",Le="Clear search",Se="No data available",De="close",je={search:Ee,clear:Le,noDataMessage:Se,CLOSE:De},Re="Leita",Be="Að núllstilla leit",ze="Engin gögn tiltæk",Ae="loka",Te={search:Re,clear:Be,noDataMessage:ze,CLOSE:Ae},Ue="Chercher",Ve="Effacer la recherche",Me="fermer",Ie={search:Ue,clear:Ve,CLOSE:Me},Ne="Suche",He="Suche löschen",We="Keine Daten vorhanden",Ke="schließen",qe={search:Ne,clear:He,noDataMessage:We,CLOSE:Ke},Fe={en:{common:je},is:{common:Te},fr:{common:Ie},de:{common:qe}},re=(e,t,{all:i=!1}={})=>i?e.renderRoot.querySelectorAll(t):e.renderRoot.querySelector(t);var Ge=Object.defineProperty,Qe=Object.getOwnPropertyDescriptor,N=(e,t,i,s)=>{for(var r=s>1?void 0:s?Qe(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(r=(s?a(t,i,r):a(r))||r);return s&&r&&Ge(t,i,r),r};const Xe=e=>{const t=e.split(" ")[0];return`./icons/${t}/${e.substring(t.length*2+2)}.svg`};let w=class extends v{constructor(){super(...arguments),this.icon="",this.color="black"}async fetchIcon(){if(this.icon){if(this.icon.startsWith("<svg"))return T(this.icon);if(G[this.icon])return T(G[this.icon]);const e=this.icon.endsWith(".svg")?this.icon:Xe(this.icon),i=await(await fetch(e)).text();return T(i)}return""}get __svgElement(){return re(this,"svg")}render(){return o`${me(this.fetchIcon(),o`<span>...</span>`)}`}};w.styles=[f`
      :host {
        display: inline-block;
        width: 1em;
      }
      svg {
        vertical-align: middle;
        max-width: 1em;
        max-height: 1em;
      }
    `];N([l({type:String})],w.prototype,"icon",2);N([l({type:String})],w.prototype,"color",2);w=N([u("ki-icon")],w);var Je=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,L=(e,t,i,s)=>{for(var r=s>1?void 0:s?Ye(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(r=(s?a(t,i,r):a(r))||r);return s&&r&&Je(t,i,r),r};let y=class extends w{constructor(){super(...arguments),this.active=!1,this.tooltip="",this.disabled=!1,this.selected=!1,this.toggle=!1}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.clickHandler=()=>{this.toggle&&(this.active=!this.active)},this.addEventListener("click",this.clickHandler),this.selected&&this.classList.add("selected")}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("click",this.clickHandler)}};y.styles=[...w.styles,f`
      :host {
        display: block;
        color: gray;
        fill: gray;
        background: white;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 40px;
        cursor: pointer;
        position: relative;
      }
      :host(:hover) ki-icon::part(icon) {
        fill: #4a4a49;
      }

      :host([active]) {
        color: white;
        fill: white;
        background: var(--theme-color-secondary, #0056a0);
      }

      :host(.ripple) {
        background-position: center;
        transition: background 0.8s;
      }
      :host(.ripple:hover) {
        background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%)
          center/15000%;
      }
      :host(.ripple:active) {
        background-color: var(--theme-color-secondary, #0056a0);
        background-size: 100%;
        transition: background 0s;
      }

      :host(.disabled) {
        pointer-events: none;
        opacity: 0.5;
      }

      svg {
        max-width: 5em;
      }
    `];L([l({type:Boolean,reflect:!0})],y.prototype,"active",2);L([l({type:String})],y.prototype,"tooltip",2);L([l({type:Boolean})],y.prototype,"disabled",2);L([l({type:Boolean})],y.prototype,"toggle",2);y=L([u("ki-icon-btn")],y);const P="sm-screen",U="md-screen",D="lg-screen",Ze="landscape",H=new ge.EventEmitter,et=800,tt=1280,b={size:D,landscape:!0};let C=function(){let e,t=!1;const i=window.innerWidth,s=window.innerHeight;i<=et||/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?e=P:i<=tt?e=U:e=D;const r=i>s;e!==b.size&&(document.body.classList.remove(P,U,D),document.body.classList.add(e),b.size=e,t=!0),b.landscape!==r&&(document.body.classList.toggle(Ze,r),b.landscape=r,t=!0),t&&H.emit("changed")};C=we(C,50);window.addEventListener("resize",C);window.addEventListener("orientationchange",C);window.addEventListener("DOMContentLoaded",C);function rt(e){e.$resizeHandler=()=>{e.isConnected&&(e.classList.remove(P,U,D),e.classList.add(b.size),e.classList.toggle("LANDSCAPE",b.landscape),e.requestUpdate())},H.on("changed",e.$resizeHandler),e.$resizeHandler()}function it(e){H.removeListener("changed",e.$resizeHandler)}const st=function(e){return class extends e{connectedCallback(){rt(this),super.connectedCallback&&super.connectedCallback()}disconnectedCallback(){it(this),super.disconnectedCallback&&super.disconnectedCallback()}}};function W(e){var t;const i=(t=class extends e{static getPropertyDescriptor(s,r,n){return Object.hasOwnProperty.call(n,"initial")&&(this.__$propertyDefaultValues[r]=n.initial),Object.hasOwnProperty.call(n,"default")&&(this.__$propertyDefaultValues[r]=()=>n.default),super.getPropertyDescriptor(s,r,n)}constructor(){super(),Object.entries(i.__$propertyDefaultValues).forEach(([s,r])=>{this[s]=r()})}},t.__$propertyDefaultValues={},t);return i}function K(...e){return e.reduce((t,i)=>{let s;return Array.isArray(i)?s=i[0](t,i[1]):s=i(t),s.styles=[].concat(t.styles||[]).concat(s.styles||[]),s})}const nt="/";let j="";new URLSearchParams(j);const at=new ye(!0);class ot extends O{__updateBrowserHistory({pathname:t,search:i}){j=i||"";const s=`${t}${j}`;window.location.hash.length===0?window.location.hash=`#${nt}`:window.location.hash.substring(1)!==s&&(window.location.hash=`#${s}`),at.next(!0)}navigationChange(t,i){console.log(t,i)}async __resolveRoute(t){return t.hash&&t.hash.length>0?(O.go(t.hash.substring(1)),null):super.__resolveRoute(t)}}function X(e){if(e.newURL.split("?")[0]!==e.oldURL.split("?")[0]){const t=e.newURL.indexOf("#")>-1?e.newURL.substring(e.newURL.indexOf("#")+1):"/";O.go(t)}}const lt={activate(){window.addEventListener("hashchange",X,!1)},inactivate(){window.removeEventListener("hashchange",X,!1)}};O.NavigationTrigger=[lt];let p;const ct=e=>{p=new ot(null,{baseUrl:e}),p.subscribe()},dt=e=>{p.setRoutes([{path:"(.+)/",action:(t,i)=>{const s=t.pathname.slice(0,-1);return i.redirect(s)}},...e,{path:"(.*)",action:(t,i)=>i.redirect(t.path.split("/").slice(0,-1).join("/"))}])},ht=e=>{p.setOutlet(e)},pt=()=>p.location,Ft=(e,t)=>p.urlForName(e,t),ut=()=>j,Gt=(e,t)=>{const{options:i}=e.route,{params:s}=e,r={options:i};return t.forEach(n=>{r[n]=s[n]}),r},J=(e,t=!1)=>{let i=e;if(t){const s=ut(),r=`${s.length>0&&!s.startsWith("?")?"?":""}${s}`;i=`${i}${r}`}return p.navigationChange(i.split("?")[0],p.location.pathname.split("?")[0]),O.go(i)},bt=()=>{p.unsubscribe()};var ft=Object.defineProperty,vt=Object.getOwnPropertyDescriptor,q=(e,t,i,s)=>{for(var r=s>1?void 0:s?vt(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(r=(s?a(t,i,r):a(r))||r);return s&&r&&ft(t,i,r),r};let R=class extends v{constructor(){super(),this.href="",this.label="",this.addEventListener("click",()=>{J(this.href)}),this.addEventListener("keydown",e=>{e.key==="Enter"&&J(this.href)})}render(){return o`${this.label}`}};q([l({type:String})],R.prototype,"href",2);q([l({type:String})],R.prototype,"label",2);R=q([u("ki-link")],R);var mt=Object.defineProperty,gt=Object.getOwnPropertyDescriptor,wt=(e,t,i,s)=>{for(var r=s>1?void 0:s?gt(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(r=(s?a(t,i,r):a(r))||r);return s&&r&&mt(t,i,r),r};let V=class extends K(v,W){static get properties(){return{items:{type:Array,initial:()=>[]}}}render(){const e=this.items.length;return this.items.map((t,i)=>o`<div class="breadcrumb ${i+1>=e?"last":""}">
          <ki-link
            class="label"
            tabindex="0"
            .href="${t.path}"
            .label="${t.label}"
          ></ki-link>
        </div>`)}};V.styles=f`
    :host {
      display: block;
      padding: var(--ki-breadcrumbs-padding, 0px);
      background: var(--ki-breadcrumbs-background, white);
      border-bottom: var(
        --ki-breadcrumbs-border-bottom,
        var(--ki-breadcrumbs-border, none)
      );
      border-top: var(
        --ki-breadcrumbs-border-top,
        var(--ki-breadcrumbs-border, none)
      );
      border-radius: var(--ki-breadcrumbs-border-radius, 0px);
      box-shadow: var(--ki-breadcrumbs-box-shadow, none);
      font-size: var(--ki-breadcrumbs-font-size, 0.8em);
      line-height: var(--ki-breadcrumbs-line-height, 16px);
      white-space: var(--ki-breadcrumbs-white-space, nowrap);
      overflow: auto hidden;
    }

    .breadcrumb {
      display: inline-flex;
      position: relative;
    }
    .breadcrumb:hover {
      cursor: pointer;
    }
    .breadcrumb .label {
      padding: var(--ki-breadcrumbs-label-padding, 8px);
      display: inline-block;
      color: var(--ki-breadcrumbs-textcolor, black);
    }
    .breadcrumb:hover .label {
      background: var(--theme-color-secondary, white);
      color: var(
        --ki-breadcrumbs-textcolor-hover,
        --ki-breadcrumbs-textcolor,
        darkgray
      );
    }

    .breadcrumb::after {
      content: '\\f018';
      display: inline-block;
      text-align: center;
      font-family: Kisterswater;
      font-size: 16px;
      font-stretch: 100%;
      font-style: normal;
      font-weight: 400;
      text-rendering: auto;
      align-self: center;
      width: var(--ki-breadcrumbs-after-width, 24px);
      -webkit-font-smoothing: antialiased;
      color: var(--ki-breadcrumbs-textcolor, black);
      transform: var(--ki-breadcrumbs-after-transform, none);
    }

    .last::after {
      content: unset !important;
    }

    @media only screen and (min-width: 800px) {
      .breadcrumb.last .label {
        pointer-events: none;
      }
    }

    .breadcrumb.last .label {
      color: var(--ki-breadcrumbs-last-textcolor, black);
    }
  `;V=wt([u("ki-breadcrumbs")],V);let yt={};const _t=()=>{throw new Error("Config hasn't been loaded yet!")},xt=e=>{_t();let t="";return yt.navList.forEach(i=>{i.link===e&&(t=i.breadcrumb??i.label),i.items&&i.items.forEach(s=>{s.link===e&&(t=s.breadcrumb??s.label)})}),t};var kt=Object.defineProperty,$t=Object.getOwnPropertyDescriptor,F=(e,t,i,s)=>{for(var r=s>1?void 0:s?$t(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(r=(s?a(t,i,r):a(r))||r);return s&&r&&kt(t,i,r),r};const Ot=e=>{if(!e.parent||!e.parent.children)return[];const t=e.parent.children.filter(i=>i.path.length<e.path.length&&e.path.startsWith(i.path));return t.sort((i,s)=>i.path.length>s.path.length),t},ie=e=>!e||!e.path||e.path===""||e.path==="/"?"":`${ie(e.parent)}${e.path}`,Y=(e,t,i)=>{let s=ie(e),{label:r}=e;return Object.entries(t).forEach(([n,a])=>{s=s.replace(`:${n}`,a),r=xt(s)||r.replace(`\${${n}}`,a)}),{path:`${s}${i||""}`,label:r}},se=(e,t,i)=>{if(e.path==="")return[];const s=Ot(e).filter(n=>n.label).map(n=>Y(n,t,i)),r=se(e.parent,t,i);return e.label?[...r,...s,Y(e,t,i)]:[...r,...s]},Pt=e=>{const{route:t,params:i,search:s}=e;return se(t,i,s)};let E=class extends v{constructor(){super(...arguments),this.maxitems=1/0,this.breadCrumbs=[],this.handleVaadinRouterEvent=e=>{this._setBreadCrumbs(e.detail.location)}}connectedCallback(){super.connectedCallback&&super.connectedCallback(),window.addEventListener("vaadin-router-location-changed",this.handleVaadinRouterEvent)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),window.removeEventListener("vaadin-router-location-changed",this.handleVaadinRouterEvent)}_setBreadCrumbs(e){this.breadCrumbs=Pt(e).slice(0,this.maxitems)}render(){return o`<ki-breadcrumbs .items="${this.breadCrumbs}"></ki-breadcrumbs>`}firstUpdated(){this._setBreadCrumbs(pt())}};E.styles=f`
    :host {
      display: block;
    }
  `;F([l({type:Number})],E.prototype,"maxitems",2);F([l({type:Array})],E.prototype,"breadCrumbs",2);E=F([u("ki-app-breadcrumbs")],E);var Ct=Object.defineProperty,Et=Object.getOwnPropertyDescriptor,Lt=(e,t,i,s)=>{for(var r=s>1?void 0:s?Et(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(r=(s?a(t,i,r):a(r))||r);return s&&r&&Ct(t,i,r),r};let M=class extends K(v,W,[Ce,{nls:Fe}],st){static get properties(){return{drawerWidth:{type:String,default:"95%"},_sideBarVisible:{type:Boolean,default:!1},nls:{type:String}}}constructor(){super(),window.addEventListener("selected",()=>{this._sideBarVisible=!1}),window.addEventListener("hashchange",()=>{this._sideBarVisible=!1})}_setNls(){this.i18n&&this.nls&&ee(this.i18n,this.nls)}_renderDrawer(){return o` <div
      class="drawer-container ${this._sideBarVisible?"visible":""}"
      @click="${this.toggleSideBar}"
    >
      <div class="overlay"></div>
      <div class="drawer" style="max-width: ${this.drawerWidth}">
        <slot name="nav"></slot>
      </div>
    </div>`}_renderHeader(){return o`
      <div class="header">
        <ki-icon-btn
          icon="ki ki-bars"
          toggle
          @click="${this.toggleSideBar}"
        ></ki-icon-btn>
        <div class="logo">
          <slot name="logo"></slot>
        </div>
        <div class="spacer"></div>
        <div class="nav">
          ${b.size===P?"":o`<slot name="nav"></slot>`}
        </div>
      </div>
    `}_renderMain(){return o`<div class="main">
      <ki-app-breadcrumbs></ki-app-breadcrumbs>
      <slot class="main-slot"></slot>
    </div>`}_renderFooter(){return o`<slot name="footer"></slot>`}render(){return o`
      <div class="ki-app-container">
        ${b.size===P?this._renderDrawer():""}
        ${this._renderHeader()} ${this._renderMain()} ${this._renderFooter()}
      </div>
    `}toggleSideBar(){this._sideBarVisible=!this._sideBarVisible}};M.styles=f`
    :host {
      height: 100%;
      width: 100%;
    }

    .ki-app-container {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .header {
      display: flex;
      height: 60px;
      background: var(--theme-color-tertiary, 'white');
      overflow: visible;
    }

    ki-icon-btn {
      display: none;
    }

    :host .logo {
      flex: 0;
    }

    .spacer {
      flex: 1;
      height: 100%;
    }

    .nav {
      z-index: 99;
      width: 100%;
      overflow: visible;
    }

    .main {
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
    }

    .main-slot {
      flex: 1;
      overflow: auto;
    }

    .drawer-container {
      display: block;
      left: -100%;
      width: 100%;
      height: calc(100% - 80px);
      top: 60px;
      position: absolute;
      z-index: 9999;
      transition: left 0s 0.5s;
    }

    .drawer-container.visible {
      left: 0;
      transition: left 0s 0s;
    }

    .overlay {
      background: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 100%;
      display: none;
      position: fixed;
      opacity: 0;
      top: 0;
      transition: all 0.5s;
    }

    .drawer {
      display: block;
      max-width: 95%;
      position: absolute;
      background: var(--theme-text-color, white);
      z-index: 1;
      height: 100%;
      left: -100%;
      transition: left 0.5s;
    }

    .drawer-container.visible .drawer {
      left: 0;
    }

    .drawer-container.visible .overlay {
      display: block;
      opacity: 1;
    }

    :host(.sm-screen) [active] {
      display: block;
      background: transparent;
      box-shadow: none;
      fill: var(--theme-color-primary, white);
      margin: 10px;
    }

    :host(.sm-screen) .logo {
      flex: 1;
      text-align: center;
    }

    :host(.sm-screen) .spacer {
      flex: 0 0 50px;
    }

    :host(.sm-screen) .nav {
      display: none;
    }

    :host(.sm-screen) .drawer {
      background: transparent;
    }

    :host(.sm-screen.LANDSCAPE) .drawer-container {
      top: 0px;
      height: 100%;
    }
    :host(.sm-screen.LANDSCAPE) .drawer {
      left: 60px;
    }
  `;M=Lt([u("ki-app")],M);var St=Object.defineProperty,Dt=Object.getOwnPropertyDescriptor,B=(e,t,i,s)=>{for(var r=s>1?void 0:s?Dt(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(r=(s?a(t,i,r):a(r))||r);return s&&r&&St(t,i,r),r};const jt=()=>{$(()=>Promise.resolve().then(()=>It),void 0).then(e=>{e.init()})};let x=class extends v{constructor(){super(...arguments),this.baseUrl="/",this.themable=!1}get _mainElement(){return re(this,".app-container")}render(){return o` <div class="app-container"></div> `}firstUpdated(){this.themable&&jt(),this.route&&this._mainElement?(ct(this.baseUrl),dt(this.route),ht(this._mainElement)):console.error(`couldn't initialize router! baseUrl: ${this.baseUrl} route: ${this.route} mainElement: ${this._mainElement}`)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),bt()}};x.styles=f`
    :host {
      height: 100%;
      width: 100%;
    }

    .app-container {
      height: 100%;
      width: 100%;
    }
  `;B([l({type:String})],x.prototype,"baseUrl",2);B([l({type:Object})],x.prototype,"route",2);B([l({type:Boolean})],x.prototype,"themable",2);x=B([u("ki-app-index")],x);var Rt=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,zt=(e,t,i,s)=>{for(var r=s>1?void 0:s?Bt(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(r=(s?a(t,i,r):a(r))||r);return s&&r&&Rt(t,i,r),r};let I=class extends K(v,W){static get properties(){return{direction:{type:String,default:"vertical"},items:{type:Array,initial:()=>[]},value:{type:String},selectedItem:{type:Object}}}get _selectedView(){return`#${window.location.hash.slice(1).split("?")[0]||""}`}set _selectedView(e){window.location.hash=e}renderItem(e){var t;return((t=e.items)==null?void 0:t.length)>0?o` <ki-list-item-group>
        <div
          class="label"
          @click="${()=>{e.folded=!e.folded,this.requestUpdate()}}"
        >
          <div class="nav-item">
            <div class="nav-icon"><ki-icon icon="${e.icon}"></ki-icon></div>
            <div class="nav-label">${e.label}</div>
            <div class="expand-icon">
              <ki-icon
                icon="ki ${e.folded?"ki-chevron-up":"ki-chevron-down"}"
              ></ki-icon>
            </div>
          </div>
        </div>
        <div class="children ${e.folded?"folded":""}">
          ${e.items.map(i=>this.renderItem(i))}
        </div>
      </ki-list-item-group>`:o`<ki-list-item
      .selected="${e.link===this._selectedView}"
      @click="${()=>this.handleClick(e)}"
    >
      <div class="nav-item">
        <div class="nav-icon"><ki-icon icon="${e.icon}"></ki-icon></div>
        <div class="nav-label">${e.label}</div>
      </div>
    </ki-list-item>`}render(){return this.classList.toggle("vertical",this.direction==="vertical"),this.classList.toggle("horizontal",this.direction==="horizontal"),o`<ki-list>
      ${this.items.map(e=>this.renderItem(e))}
    </ki-list>`}handleClick(e){this.selectedItem!==e&&(this.dispatchEvent(new CustomEvent("selected",{detail:{item:e}})),this._selectedView=e.link)}};I.styles=f`
    :host(.vertical) {
      display: flex;
      flex-direction: column;
      padding: 5px 0px;
      height: 100%;
    }

    :host(.horizontal) ki-list {
      display: flex;
      color: var(--theme-text-color);
      fill: var(--theme-text-color);
    }
    :host(.horizontal) ki-list > ki-list-item,
    :host(.horizontal) ki-list > ki-list-item-group {
      display: inline-block;
    }
    :host(.horizontal) ki-list > ki-list-item-group .children {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      color: var(--theme-color);
      fill: var(--theme-color);
      padding-top: 5px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }

    :host(.horizontal) .nav-item {
      padding: 8px;
    }

    ki-list-item-group .children.folded {
      display: none;
    }

    .nav-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      padding: 4px;
    }
    .nav-icon {
      min-width: 30px;
      text-align: center;
    }

    .nav-label {
      padding: 0px 15px 0px 10px;
      flex: 1;
    }
  `;I=zt([u("ki-nav")],I);const ne=new _e(1);let k;const ae=()=>{k!==void 0&&ne.next(k)},z=(e,t=!1)=>{k=e,t||ae()},At=()=>{z(window.matchMedia("(prefers-color-scheme: dark)").matches)},Tt=()=>{if(k===void 0)throw new Error("Theme Service needs to be initialized first.");return k},Ut=(e=!1)=>{const t=!k;return z(t,e),t},Vt=()=>{z(!1)},Mt=()=>{z(!0)},It=Object.freeze(Object.defineProperty({__proto__:null,activateDarkTheme:Mt,activateLightTheme:Vt,currentTheme:ne,init:At,isDarkTheme:Tt,toggleTheme:Ut,updateTheme:ae},Symbol.toStringTag,{value:"Module"}));var Nt=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,Wt=(e,t,i,s)=>{for(var r=s>1?void 0:s?Ht(t,i):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(r=(s?a(t,i,r):a(r))||r);return s&&r&&Nt(t,i,r),r};$e({onOfflineReady(){console.log("offline ready!")}});let Z=class extends v{get _mainElement(){return this.shadowRoot.querySelector(".main")}static get styles(){return f`
      :host {
        height: 100%;
        overflow: scroll;
      }
    `}render(){return o`
      <ki-app-index
        .baseUrl="${1>1&&"/"[1-1]==="/"?"/".slice(0,-1):"/"}"
        .route="${Oe}"
        .themable="${!0}"
      ></ki-app-index>
    `}};Z=Wt([u("app-index")],Z);export{K as M,Gt as a,qt as b,Mt as c,Vt as d,ne as e,W as f,re as g,$e as h,Ce as i,Fe as n,st as r,Ut as t,Ft as u};
//# sourceMappingURL=index-2292e4a2.js.map

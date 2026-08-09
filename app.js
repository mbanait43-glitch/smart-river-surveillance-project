import{y as nr,p as Ne,g as z,z as J,s as T,x as g,A as we,C as Pl,D as ar,E as cr,F as hr,n as p,G as xl,j as A,H as Al,d as wl,I as dr,J as $l,v as pr}from"./vendor-7b54e5a9.js";import{M as U,f as Dl,g as Fe,i as Ce,n as Se,r as Tl,a as ur,b as Ll,t as gr,c as Il,d as jl,e as Nl,h as fr}from"./index-2292e4a2.js";import{n as Fl}from"./index-bfa9438a.js";const _l=150;function Bl(s,l){let o=0,t=Object.getPrototypeOf(s),i;do i=Object.getOwnPropertyDescriptor(t,l),o+=1,i===void 0&&(t=Object.getPrototypeOf(t));while(t!=null&&i===void 0&&o<=_l);return o===_l&&console.warn("Max iterations reached."),i===void 0&&console.error(`couldn't find property "${l}".`),[t,i]}const de=[];let kl=0;function mr(s){if(!s)throw new Error("must set watchers");return Array.isArray(s)||(s=[s]),s.map(l=>typeof l=="string"?function(t){return t[l]}:l)}const vr=(s,l,o,t,i,e,c)=>function(){const w=`${i}_${c}.${l}`;if(de.indexOf(w)>=0)throw console.debug(de),new Error(`recursive getter chain with :${w}`);de.push(w);try{const $=`__cached_${l}`,_=`__cached_params_${l}`,S=o.map(v=>v(e));if(!e[_]||!S.every((v,y)=>nr(v,e[_][y]))){e[_]=S;const v=s.call(e);if(v&&v.then){const y=v.then(k=>{e[$]=k});e.promiseLoader?setImmediate(()=>{e.promiseLoader(y)}):y.then(()=>e.requestUpdate()),e[$]===void 0&&(e[$]=t.default)}else e[$]=v}return de.pop(),e[$]}catch($){throw de.pop(),console.error($),$}},br=function(s,l,o={},t){l=mr(l);const i=kl;return kl+=1,class extends t{constructor(){super();const[e,c]=Bl(this,s),b=vr(c.get,s,l,o,i,this,e.constructor.name);Object.defineProperty(this,s,{get:b,configurable:!0})}}},yr=function(s=0){return(l,o,t)=>{const i=t.value;return t.value=Ne(i,s),t}},xr=function(s,l=0,o){return class extends o{constructor(){super();const[,t]=Bl(this,s);yr(l)(this,s,t)}}},wr=z`
  :host {
    display: block;
    position: relative;
    overflow: auto;
  }

  .table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    display: table;
    table-layout: fixed;
  }

  br {
    display: none;
  }

  .header {
    display: table-header-group;
    text-align: left;
  }

  .body {
    display: table-row-group;
    height: 100%;
    overflow: auto;
  }

  .row {
    display: table-row;
    border-width: 1px 0;
    border-color: #ececec;
    border-style: solid;
    cursor: pointer;
  }

  .row:hover {
    background: lightgray !important;
  }

  .cell {
    padding: 5px 10px;
    display: table-cell;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cell.number,
  .cell.date {
    text-align: right;
  }

  .header .row {
    border-top-width: 0;
    background-color: white;
    border-bottom: 1px solid darkgray;
  }

  .header .cell {
    position: sticky;
    top: 0;
    background: inherit;
    z-index: 2;
    padding: 0;
  }

  .header-content {
    padding: 10px;
    overflow: hidden !important;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .header-content .col-label {
  }
`;function q(s,l){return typeof s=="string"?s.replace(/\${([\s\S]+?)}/g,(o,t)=>J(l,t)):s}function $r(s,l){let o=0,t=0,i=0,e=0,c=new Date().getTime();s.addEventListener("touchstart",b=>{c=new Date().getTime(),o=b.changedTouches[0].screenX,t=b.changedTouches[0].screenY},!1),s.addEventListener("touchend",b=>{new Date().getTime()-c<250&&(i=b.changedTouches[0].screenX,e=b.changedTouches[0].screenY,l(o,i,t,e))},!1)}function Rl(s,l){return Array.isArray(l)?l.map(o=>J(s,o)).filter(o=>o!==void 0)[0]:J(s,l)}class Hl extends U(T,Dl){constructor(){super(),this.data=[]}get renderingData(){return this.data}get renderingColumns(){return this.columns||Object.keys(this.renderingData[0]||{}).map(l=>({field:l,label:l,sortable:!0}))}static get properties(){return{idproperty:{type:String},data:{type:Array},columns:{type:Array},renderRow:{type:Function}}}_renderHeader(){return g`
      <div class="header">
        <div class="row">
          ${we(this.renderingColumns,l=>l.field,l=>this._renderHeaderCell(l))}
        </div>
      </div>
    `}_renderHeaderCell(l){return l.renderHeaderCell?l.renderHeaderCell():g`
          <div
            class="cell col-${Array.isArray(l.field)?l.field[0]:l.field}"
            style=${l.width?`width:${l.width-15}px;`:""}
          >
            <div
              style=${l.labelCss||l.css||""}
              class="header-content"
              title="${l.title||l.label}"
            ><span class="col-label">${Pl(l.label)}</span>
            </div>
          </div>
        `}_renderData(){const l=this.idproperty&&(o=>o[this.idproperty]);return g`
      <div class="body">
        ${we(this.renderingData||[],l,this.renderRow.bind(this))}
      </div>
    `}mouseenter(l,o){}mouseleave(l,o){}renderRow(l){return g`
      <div
        class="row"
        @mouseenter="${o=>this.mouseenter(o,l)}"
        @mouseleave="${o=>this.mouseleave(o,l)}"
        @click="${()=>{this._onRowClick(l)}}"
      >
        ${this.renderingColumns.map(o=>this._renderCell(o,l))}
      </div>
    `}_renderCell(l,o){const t=Rl(o,l.field),i=l.prefix&&t?q(l.prefix,o):"",e=l.suffix&&t?q(l.suffix,o):"";return l.renderCell?l.renderCell(o):g`
          <div
            style=${l.css||""}
            class="cell ${(Array.isArray(l.field)?l.field:[l.field]).map(c=>`col-${c}`).join(" ")}"
          >
            ${i}${t}${e}
          </div>
        `}render(){return g`
      <div class="table" part="table">
        ${this._renderHeader()} ${this._renderData()}
      </div>
    `}_onRowClick(l){this.dispatchEvent(new CustomEvent("row-click",{detail:{data:l}}))}}Hl.styles=wr;function _r(s){var l;return l=class extends s{constructor(){super(),this._msg=""}_renderMsg(){return this._msg?g` <div class="msg">${this._msg}</div> `:""}set msg(o){this._msg=o,this.requestUpdate()}},l.styles=z`
      .msg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .msg .error {
        color: red;
      }
    `,l}class kr extends EventTarget{constructor(){super(...arguments),this._loaderCountChanged=new Event("loaderCountChanged"),this._$loaderCount=0}get loading(){return this._$loaderCount>0}promiseLoader(l){return this._$loaderCount+=1,this.dispatchEvent(this._loaderCountChanged),l.finally(()=>{this._$loaderCount-=1,this.dispatchEvent(this._loaderCountChanged)})}_renderLoader(){return this.loading?g`
        <style>
          .spiner-wrapper {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 99;
          }
          @keyframes ldio {
            0% {
              transform: rotate(0deg);
            }
            50% {
              transform: rotate(180deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          .ldio div {
            position: absolute;
            animation: ldio 1.01s linear infinite;
            width: 78px;
            height: 78px;
            top: 11px;
            left: 11px;
            border-radius: 50%;
            box-shadow: 0 3.8000000000000003px 0 0 #1477eb;
            transform-origin: 39px 40.9px;
          }
          .loadingio-spinner-eclipse {
            width: 34px;
            height: 34px;
            display: inline-block;
            overflow: hidden;
            background: none;
          }
          .ldio {
            width: 100%;
            height: 100%;
            position: relative;
            transform: translateZ(0) scale(0.34);
            backface-visibility: hidden;
            transform-origin: 0 0;
          }
          .ldio div {
            box-sizing: content-box;
          }
        </style>
        <div class="spiner-wrapper">
          <div class="loadingio-spinner-eclipse">
            <div class="ldio">
              <div></div>
            </div>
          </div>
        </div>
      `:""}}function Cr(s){return class extends s{constructor(){super(),this._loader=new kr,this._loader.addEventListener("loaderCountChanged",()=>this.loaderUpdate())}loaderUpdate(){this.requestUpdate()}get loading(){return this._loader.loading}promiseLoader(l){return this._loader.promiseLoader(l)}_renderLoader(){return this._loader._renderLoader()}}}function Sr(s){return class extends U(s,Cr,_r){set data(l){this.msg="",l&&l.then?this.promiseLoader(l.then(o=>{this.data=o}).catch(o=>{this.msg=g` <span class="error">${o}</span> `})):(super.data=ar(l)||[],super.data.length===0&&(this.msg=this.noDataMessage||"No Data"))}get data(){return super.data}render(){return this._renderLoader()||this._renderMsg()||super.render()}}}function zr(s){var l;return l=class extends s{constructor(){super(...arguments),this.rowHeight=30}static get properties(){return{startIndex:{type:Number,default:0}}}get renderingData(){return this.data.slice(this.startIndex,Math.min(this.data.length,this.__lastIndex))}get __scroller(){return Fe(this,".scroller")}render(){return g`
        <div class="scroller" @scroll="${this._onScroll}">
          <div
            class="scroller-content"
            style="height: ${this.data.length*this.rowHeight}px; padding-top: ${this.startIndex*this.rowHeight}px;"
          >
            ${super.render()}
          </div>
        </div>
      `}get __lastIndex(){return this.startIndex+Math.max(50,Math.round(this.offsetHeight/this.rowHeight))}_onScroll(){const o=Math.round(this.__scroller.scrollTop/this.rowHeight);Math.abs(o-this.startIndex-5)>5&&(this.startIndex=Math.min(o,this.data.length-50),this.startIndex=Math.max(this.startIndex,0))}_resetScroll(){this.__scroller&&(this.__scroller.scrollTop=0)}scrollTo(o=""){const t=this.data.length&&cr(this.data,i=>i[this.idproperty]===o);t!==-1&&this.__scroller&&(this.__scroller.scrollTop=t*this.rowHeight)}},l.styles=z`
      .scroller {
        overflow: auto;
        height: 100%;
        overflow-anchor: none;
      }

      .cell {
        white-space: nowrap;
      }

      .scroller-content {
        box-sizing: border-box;
      }

      .scroller-content::after {
        display: block;
        padding: 10px;
        color: gray;
        text-align: center;
      }
    `,l}function Or(s){return class extends xr("_onScroll",100,br("__lastIndex","startIndex",{},zr(s))){}}function Er(s){var l;return l=class extends s{static get properties(){return{sort:{type:Array},multisort:{type:Boolean},normalizeSpecialCharacters:{type:Boolean}}}constructor(){super(),this.sort=[],this.normalizeSpecialCharacters=!1}render(){return this._sortData(),super.render()}_renderHeaderCell(o){var w;let t,i,e="",c,b="ki-sort-v";return o.sortable&&(c=this.sort.find($=>$.field===o.field),c?(e=this.multisort?this.sort.indexOf(c)+1:"",b=c.ascending?"ki-sort-up":"ki-sort-down",t=()=>{c.ascending=!c.ascending,this.sort=[c,...this.sort.filter($=>$!==c)]},i=()=>{this.sort=[...this.sort.filter($=>$!==c)]}):t=()=>{this.sort=[{field:o.field,sortBy:o.sortBy,ascending:!1,format:o.format,useDIN5007:o.useDIN5007},...this.sort]}),o.renderHeaderCell?o.renderHeaderCell():g`
            <div
              style="${o.labelCss||o.css||""}"
              title="${o.title||o.label}"
              class="cell ${((w=o==null?void 0:o.format)==null?void 0:w.type)||""} col-${o.field} ${o.sortable?"sortable":""}"
            ><div
                @dblclick="${this.multisort&&i}"
                @click="${t}"
                class="header-content ${o.sortable?"sortable":""}"
              ><span class="col-label">${o.label}</span>
                <span class="icons">
                  <ki-icon icon="ki ${b}"></ki-icon>
                </span>
                <div class="sort-index">${e}</div>
              </div>
            </div>
          `}_sortData(){var o;(o=hr(this.sort))!=null&&o.useDIN5007&&(this.normalizeSpecialCharacters=!0),this.sort.length>0&&(this.multisort||(this.sort=this.sort.slice(0,1)),this.data.sort((t,i)=>{var b;const e=[...this.sort];let c=0;do{const w=e.shift(),$=w.sortBy||w.field;let _=J(t,$),S=J(i,$);typeof _=="string"&&(_=_.toLowerCase(),this.normalizeSpecialCharacters&&(_=this._normalizeSpecChars(_))),typeof S=="string"&&(S=S.toLowerCase(),this.normalizeSpecialCharacters&&(S=this._normalizeSpecChars(S)));const v=typeof w.format=="string"?w.format:(b=w.format)==null?void 0:b.type;if(["textnumber","number","wiskinumber"].indexOf(v)>=0){const y=typeof _=="string"?parseFloat(_.replace(",","")):_,k=typeof S=="string"?parseFloat(S.replace(",","")):S;Number.isNaN(y)&&Number.isNaN(k)?(_=0,S=0):Number.isNaN(y)?(S=k,_=S-1):Number.isNaN(k)?(_=y,S=_-1):(_=y,S=k)}_===S?c=0:c=(_>S?1:-1)*(w.ascending?1:-1)}while(c===0&&e.length>0);return c}))}_normalizeSpecChars(o){let t=o;return t=t.replace("ä","a"),t=t.replace("ö","o"),t=t.replace("ü","u"),t}},l.styles=z`
      .sortable {
        cursor: pointer;
      }

      .header-content .icons,
      .header-content .sort-index {
        display: none;
      }

      .header-content .sort-index {
        font-size: 8px;
        line-height: 8px;
        transform: translateY(-10px);
        color: var(--theme-color, #0056a0);
      }

      .header-content.sortable .icons {
        padding-left: 10px;
        display: inline-block;
      }

      .header-content.sortable .icons,
      .header-content.sortable .sort-index {
        display: inline-block;
      }

      .header-content.sortable ki-icon {
        display: block;
        color: lightgray;
      }

      .header-content.sortable ki-icon {
        visibility: hidden;
      }

      .header-content.sortable:hover ki-icon {
        visibility: visible;
      }

      .header-content.sortable ki-icon[icon~='ki-sort-up'],
      .header-content.sortable ki-icon[icon~='ki-sort-down'] {
        color: var(--theme-color, #0056a0);
        visibility: visible;
      }
    `,l}var Pr=Object.defineProperty,Ar=Object.getOwnPropertyDescriptor,R=(s,l,o,t)=>{for(var i=t>1?void 0:t?Ar(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&Pr(l,o,i),i};let L=class extends T{constructor(){super(...arguments),this.visible=!1,this.autofit=!1}get target(){const{parentNode:s}=this,l=this.getRootNode();let o;return this.for?o=l.querySelector(`#${this.for}`):o=(s==null?void 0:s.nodeType)===Node.DOCUMENT_FRAGMENT_NODE?l.host:s,o}render(){return this.renderRoot.host.classList.toggle("visible",this.visible),g`
      <div
        id="focus-node"
        part="focus-node"
        tabindex="-1"
        @mouseup="${s=>{s.stopPropagation()}}"
      >
        <slot></slot>
      </div>
    `}firstUpdated(){this._addEventListener()}updated(){this.visible&&this.updatePosition()}show({closeAfterMilliSeconds:s}){s&&setTimeout(()=>this.hide(),s),this.visible=!0}hide(){this.visible=!1,this.dispatchEvent(new CustomEvent("popup-hiding",{}))}updatePosition(){const{target:s}=this,l={left:0,top:0},o=s.getBoundingClientRect(),t=this.left&&this._calculate(l,o,"left"),i=this.top&&this._calculate(l,o,"top"),e=this.right&&this._calculate(l,o,"right"),c=this.bottom&&this._calculate(l,o,"bottom");this.style.left=t&&`${t}px`,this.style.top=i&&`${i}px`,this.style.right=e&&`${e}px`,this.style.bottom=c&&`${c}px`}_calculate(s,l,o){const t=this[o],i=xl(t,"%");let e=l[o]-s[o];(o==="bottom"||o==="right")&&(e*=-1);let c;i?c=Number(t.slice(0,t.length-1)):c=xl(t,"px")?Number(t.slice(0,t.length-2)):Number(t);const b=this.sizeref==="popup"?this.getBoundingClientRect():l;let w;return i?w=e+(o==="top"||o==="bottom"?b.height:b.width)*c/100:w=e+c,w}_addEventListener(){window.addEventListener("resize",()=>{this.requestUpdate()}),window.addEventListener("mouseup",()=>{this._clickOutsideHanlder()})}_clickOutsideHanlder(){this.visible&&this.hide()}};L.styles=z`
    :host {
      display: block;
      position: fixed;
      outline: none;
      z-index: 999;
      cursor: default;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      background: white;

      transition: visibility linear 0s 0s, all ease-in-out 0.6s 0.1s;

      visibility: hidden;
      pointer-events: none;
      opacity: 0;
    }

    :host(.visible) {
      visibility: visible;
      pointer-events: visible;
      opacity: 1;
    }
    #focus-node:focus {
      outline: none;
    }
  `;R([p({type:Boolean,reflect:!0})],L.prototype,"visible",2);R([p({type:String})],L.prototype,"for",2);R([p({type:String})],L.prototype,"top",2);R([p({type:String})],L.prototype,"left",2);R([p({type:String})],L.prototype,"right",2);R([p({type:String})],L.prototype,"bottom",2);R([p({type:String})],L.prototype,"sizeref",2);R([p({type:Boolean})],L.prototype,"autofit",2);L=R([A("ki-popup")],L);var Dr=Object.defineProperty,Tr=Object.getOwnPropertyDescriptor,Be=(s,l,o,t)=>{for(var i=t>1?void 0:t?Tr(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&Dr(l,o,i),i};let oe=class extends Al{constructor(){super(),this.selected=!1,this.addEventListener("keydown",s=>{var l,o;switch(s.key){case"Enter":this.dispatchEvent(new CustomEvent("click"));break;case"ArrowUp":case"ArrowLeft":(l=this._getPrev())==null||l.focus();break;case"ArrowDown":case"ArrowRight":(o=this._getNext())==null||o.focus();break}})}get itemNode(){return this}_getNext(){let s=this.nextSibling;for(;!/^KI-LIST-ITEM/.test(s==null?void 0:s.tagName);)s=(s==null?void 0:s.nextSibling)??null;return s}_getPrev(){let s=this.previousSibling;for(;!/^KI-LIST-ITEM/.test(s==null?void 0:s.tagName);)s=(s==null?void 0:s.previousSibling)??null;return s}_updateSelectedState(){this.setAttribute("tabindex",this.selected?"0":"-1"),this.classList.toggle("selected",!!this.selected)}connectedCallback(){super.connectedCallback&&super.connectedCallback();let s=0,l=this;for(;l&&l.tagName!=="KI-LIST";)/^KI-LIST/.test(l.tagName)&&(s+=1),l=l.parentElement;this.itemNode.style["padding-left"]=`calc( var(--ki-list-indent) * ${s})`}createRenderRoot(){return this}render(){return g` <slot></slot>`}};oe.styles=z`
    ki-list-item {
      display: block;
      position: relative;
      padding: 12px;
    }

    ki-list-item:hover,
    ki-list-item:focus {
      color: var(--theme-color, #0056a0);
      background-color: #eeeeee;
    }

    ki-list-item.selected {
      background-color: var(--theme-color, #0056a0);
      color: var(--theme-text-color, white);
    }
  `;Be([p({type:Boolean})],oe.prototype,"selected",2);Be([p({type:String})],oe.prototype,"_indent",2);oe=Be([A("ki-list-item")],oe);var Lr=Object.defineProperty,Ir=Object.getOwnPropertyDescriptor,ql=(s,l,o,t)=>{for(var i=t>1?void 0:t?Ir(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&Lr(l,o,i),i};let $e=class extends oe{constructor(){super(),this.folded=!1,this.setAttribute("tabindex","-1")}get itemNode(){return this.querySelector(".label")}_updateSelectedState(){this.classList.toggle("folded",!!this.folded)}createRenderRoot(){return this}render(){return g` <slot></slot>`}};$e.styles=z`
    ki-list-item-group {
      display: block;
      position: relative;
    }
    ki-list-item-group .label {
      padding: 12px 0;
    }

    ki-list-item-group .label:hover,
    ki-list-item-group .label:focus {
      color: var(--theme-color, #0056a0);
      background-color: #eeeeee;
    }

    ki-list-item-group .children {
      display: block;
      overflow: hidden;
      height: auto;
    }

    ki-list-item-group.folded .children {
      max-height: 0px;
    }
  `;ql([p({type:Boolean})],$e.prototype,"folded",2);$e=ql([A("ki-list-item-group")],$e);var jr=Object.defineProperty,Nr=Object.getOwnPropertyDescriptor,Fr=(s,l,o,t)=>{for(var i=t>1?void 0:t?Nr(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&jr(l,o,i),i};let Le=class extends U(Al,Dl){createRenderRoot(){return this}render(){return g` <slot></slot>`}};Le.styles=z`
    ki-list {
      display: block;
      --ki-list-indent: 12px;
    }
  `;Le=Fr([A("ki-list")],Le);var Br=Object.defineProperty,Rr=Object.getOwnPropertyDescriptor,ue=(s,l,o,t)=>{for(var i=t>1?void 0:t?Rr(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&Br(l,o,i),i};let Y=class extends T{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.indeterminate=!1,this.value="",this.interediateImage=g`<svg
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      d="M108 284c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h232c6.6 0 12 5.4 12 12v32c0 6.6-5.4 12-12 12H108zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-48 346V86c0-3.3-2.7-6-6-6H54c-3.3 0-6 2.7-6 6v340c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"
    />
  </svg>`,this.checkedImage=g`<svg
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    baseProfile="tiny"
    viewBox="0 0 18 18"
  >
    <path
      d="M0 0v18h18V0H0zm7.24 15L1 8.72l2.16-2.17 4.08 4.11L14.84 3 17 5.17 7.24 15z"
    />
  </svg>`,this.uncheckedImage=g`<svg
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z"
    />
  </svg>`}render(){let s=this.checked?this.checkedImage:this.uncheckedImage;return s=this.indeterminate?this.interediateImage:s,g` <label class="ki-checkbox">
      <input
        type="checkbox"
        ?disabled="${this.disabled}"
        .checked="${this.checked}"
        .indeterminate="${this.indeterminate}"
        .value="${this.value}"
        @click="${this._handleClick}"
        @change="${this._handleChange}"
      />
      ${s}
    </label>`}_handleClick(){this.checked=!this.checked,this.indeterminate=!1}_handleChange(){this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value,checked:this.checked}}))}};Y.styles=z`
    :host {
      outline: none;
      display: inline-block;
      position: relative;
    }

    .ki-checkbox {
      display: block;
      cursor: pointer;
      user-select: none;
      color: rgba(128, 128, 128, 1);
    }

    .ki-checkbox input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    .ki-checkbox input:checked ~ svg {
      font-size: inherit;
    }

    .ki-checkbox input:checked ~ svg {
      fill: var(--theme-color, #0056a0);
    }
    .ki-checkbox input:indeterminate ~ svg {
      fill: var(--theme-color, #0056a0);
    }

    .ki-checkbox input:disabled ~ svg {
      color: lightgray;
      cursor: not-allowed;
    }
    svg.icon {
      width: 18px;
      fill: var(--ki-checkbox-box-color, gray);
      cursor: pointer;
    }
  `;ue([p({type:Boolean})],Y.prototype,"checked",2);ue([p({type:Boolean})],Y.prototype,"disabled",2);ue([p({type:Boolean})],Y.prototype,"indeterminate",2);ue([p({type:String})],Y.prototype,"value",2);Y=ue([A("ki-checkbox")],Y);function Hr(s){var l;return l=class extends s{constructor(){super(),this.setHiderVisible=Ne(o=>{this.__hiderOptionVisible=o},100),this.__hiderOptionVisible=!1,this._hiddenColumns=null}static get properties(){return{hiddenColumns:{type:Array},__hiderOptionVisible:{type:Boolean}}}get hiddenColumns(){var o;return this._hiddenColumns||((o=this.columns)==null?void 0:o.filter(t=>t.hideAble&&(t.hide||t.hidden)).map(t=>t.field))||[]}_togglePopupColumnHider(){this.dispatchEvent(new CustomEvent("toggledPopupColumnHider",{detail:{visible:this.__hiderOptionVisible},bubbles:!0,composed:!0}))}get renderingColumns(){return super.renderingColumns.filter(o=>o.hideAble).length>0?super.renderingColumns.filter(o=>this.hiddenColumns.indexOf(o.field)<0).concat([{field:"__options",renderHeaderCell:()=>g`
                  <div class="cell header-cell-hider">
                    <div class="header-content" @click="${()=>{this.setHiderVisible(!this.__hiderOptionVisible),this._togglePopupColumnHider()}}">
                      <ki-icon
                        icon="ki ki-ellipsis-h"
                        class="hider ${this.__hiderOptionVisible?"active":""}"
                        id="hider"
                      ></ki-icon>
                    </div>
                    <ki-popup
                      for="hider"
                      right="0"
                      top="100%"
                      .visible="${this.__hiderOptionVisible}"
                      @popup-hiding=${()=>{this.setHiderVisible(!1),this._togglePopupColumnHider()}}
                    >
                      ${this.__renderHiderColumnOptions()}
                    </ki-popup>
                  </div>
                `}]):super.renderingColumns}__renderHiderColumnOption(o){return g`
        <ki-list-item>
          <ki-checkbox
            class="hiderBox"
            .name="${o.field}"
            .checked="${this.hiddenColumns.indexOf(o.field)<0}"
            @change="${this._toggleHiderOption}"
          ></ki-checkbox>
          <span class="label">${o.title||o.label}</span>
        </ki-list-item>
      `}__renderHiderColumnOptions(){const o=this.columns.filter(i=>i.hideAble);return g`
        <ki-list
          >${we(o,i=>i.field,this.__renderHiderColumnOption.bind(this))}</ki-list
        >
      `}get __hiderOptionCheckBox(){return this.renderRoot.querySelectorAll("ki-checkbox.hiderBox")}_toggleHiderOption(){const o=[];this.__hiderOptionCheckBox.forEach(t=>{t.checked||o.push(t.name)}),this._hiddenColumns=o,this.requestUpdate()}},l.styles=z`
      .header-cell-hider {
        width: 50px;
        text-align: center;
        cursor: pointer;
        color: gray;
      }
      .header-cell-hider:hover {
        color: #4a4a49;
      }

      .hider.active {
        padding: 2px;
        background-color: var(--theme-color, #0056a0);
        color: white;
        fill: white;
        border-radius: 15px;
      }

      ki-popup {
        right: 10px;
        text-align: left;
        bottom: 0;
        /*temp solution*/
      }

      .header-cell-hider ki-popup {
        padding: 0;
        overflow: clip;
        display: flex;
      }
      .header-cell-hider ki-popup::part(focus-node) {
        display: flex;
        flex: 1;
      }

      ki-list {
        flex: 1;
        overflow: auto;
        min-width: 200px;
        /* adjusting for scroll bar */
        padding-right: 15px;
      }
      ki-list-item {
        padding: 5px;
        display: flex;
        align-items: center;
      }
      ki-checkbox {
        padding: 10px;
      }
    `,l}function qr(s){var l;return l=class extends s{static get properties(){return{formatters:{type:Object}}}get renderingColumns(){var t;const o={...this.constructor.formatters,...this.formatters};return(t=super.renderingColumns)==null?void 0:t.map(i=>{const e={...i};if(!e.renderCell&&e.format){let{format:c}=e;typeof c=="string"&&(c={type:c});const b=o[c.type];b&&(e.renderCell=w=>(Array.isArray(e.field)?e.field:[e.field]).map($=>b(Rl(w,$),{...c,locale:this.i18n.language},e,w)))}return e})}},l.formatters={dateTime(o,t={options:{dayjsFormat:"L LT"}},i){var c;const e=((c=t==null?void 0:t.options)==null?void 0:c.dayjsFormat)||"L LT";return g`
          <div class="cell" style="${i.css||""}">
            ${o?wl(o).tz().format(e):""}
          </div>
        `},html(o,t,i){return g`
          <div class="cell" style="${i.css||""}">
            ${o?Pl(o.replace("./html","./public/html")):""}
          </div>
        `},date(o,t={css:void 0}){return g`
          <div style="${t.css||""}" class="cell date">
            ${o?wl(o).tz().format("L"):""}
          </div>
        `},wiskinumber(o,t={options:void 0,locale:void 0},i,e){const c={"Deci,0,0,0":{minimumFractionDigits:0,maximumFractionDigits:0},"Deci,1,0,0":{minimumFractionDigits:1,maximumFractionDigits:1},"Deci,2,0,0":{minimumFractionDigits:2,maximumFractionDigits:2},"Deci,3,0,0":{minimumFractionDigits:3,maximumFractionDigits:3}},b=e.ts_precision||"Deci,2,0,0",w=c[b]||t.options;typeof o=="string"&&(o=o.replace(",",".").replace(/[^\d.-]/g,""));const _=new Intl.NumberFormat(t.locale||"en",{...w}).format(o);return g`
          <div style="${i.css||""}" class="cell number">
            ${i.prefix?q(i.prefix,e):""}
            ${o==null||o===""||Number.isNaN(o)?"":_}
            ${o&&i.suffix?q(i.suffix,e):""}
          </div>
        `},number(o,t={options:void 0,locale:void 0},i,e){const c=new Intl.NumberFormat(t.locale||"en",{...t.options}),b=o===0?o:c.format(o);return g`
          <div style="${i.css||""}" class="cell number">
            ${i.prefix?q(i.prefix,e):""}
            ${o==null||o===""||Number.isNaN(o)?"":b}
            ${o&&i.suffix?q(i.suffix,e):""}
          </div>
        `},textnumber(o,t={options:void 0,locale:void 0},i,e){o=parseFloat(o&&o.toString().replace(",","."));const c=new Intl.NumberFormat(t.locale||"en",{...t.options}),b=o===0?o:c.format(o);return g`
          <div style="${i.css||""}" class="cell number">
            ${i.prefix?q(i.prefix,e):""}
            ${o==null||o===""||Number.isNaN(o)?"":b}
            ${o&&i.suffix?q(i.suffix,e):""}
          </div>
        `}},l}function Mr(s){var l;return l=class extends s{static get properties(){return{multiselection:{type:Boolean},selection:{type:Array}}}set selection(o){this.__selectionSet=new Set(o),this.requestUpdate()}constructor(){super(),this.selectionActive=!0,this.__selectionSet=new Set}get __selectAllCheckbox(){return Fe(this,"#select-all-checkbox")}_isSelected(o){return this.__selectionSet.has(o[this.idproperty])}_addSelection(o){this.__selectionSet.add(o[this.idproperty]),this.requestUpdate(),this.__fireSelection()}_toggleSelection(o){this.__selectionSet.has(o[this.idproperty])?this.__selectionSet.delete(o[this.idproperty]):(this.multiselection||this.__selectionSet.clear(),this.__selectionSet.add(o[this.idproperty])),this.requestUpdate(),this.__fireSelection()}_clearSelection(){this.__selectionSet.clear(),this.requestUpdate(),this.__fireSelection()}__fireSelection(){this.dispatchEvent(new CustomEvent("selection",{bubbles:!0,composed:!0,detail:{selection:Array.from(this.__selectionSet.values())}}))}_selectAll(){this.__selectAllCheckbox.checked?this.selection=this.data.map(t=>t[this.idproperty]):this.selection=[],this.__fireSelection()}_renderHeader(){return this.selectionActive?g`
        <div class="header">
          <div class="row">
            <div class="cell selection-col">
              <div class="header-content">
                <ki-checkbox
                  id="select-all-checkbox"
                  .checked="${this.__selectionSet.size===this.data.length}"
                  .indeterminate="${this.__selectionSet.size<this.data.length&&this.__selectionSet.size>0}"
                  @change="${()=>{this._selectAll()}}"
                ></ki-checkbox>
              </div>
            </div>
            ${we(this.renderingColumns,o=>o.field,o=>this._renderHeaderCell(o))}
          </div>
        </div>
      `:super._renderHeader()}renderRow(o){return this.selectionActive?g`
        <div
          class="row"
          @mouseenter="${t=>this.mouseenter(t,o)}"
          @mouseleave="${t=>this.mouseleave(t,o)}"
          @click="${()=>{this._onRowClick(o)}}"
        >
          <div class="cell selection-col" @click="${t=>t.stopPropagation()}">
            <ki-checkbox
              title="demander le téléchargement de données"
              .checked="${this._isSelected(o)}"
              @change="${()=>{this._toggleSelection(o)}}"
            ></ki-checkbox>
          </div>
          ${this.renderingColumns.map(t=>this._renderCell(t,o))}
        </div>
      `:super.renderRow(o)}},l.styles=z`
      .body .row.selected,
      .body .row.selected:hover {
        background: var(--theme-color, #0056a0);
        color: var(--theme-text-color, white);
      }
      .selection-col {
        font-size: 22px;
        vertical-align: middle;
        width: 40px;
      }
      .header .row {
        line-height: 25px;
      }
    `,l}const Cl=(s,l)=>l?`${l}`.includes(s)?`"${l}"`:l:"";function Ur(s){return class extends s{toCSV(l=";",o=!0,t){let i="#",e=o?this.columns:this.renderingColumns;return t&&(e=e.filter(c=>t.includes(c.field))),e.forEach((c,b)=>{i+=`${b===0?"":l}${Cl(l,c.label)}`}),i+=`\r
`,this.data.forEach(c=>{e.forEach((b,w)=>{i+=w===0?"":l;let $="";if(b.renderCell){const _=b.renderCell(c),S=b.renderCellIndex??0;_.values&&(_.values.length??0)>S?$=_.values[S]:$=_}else b.field==="__tag"?$=J(c,"__tag_label"):$=J(c,b.field);i+=Cl(l,$)}),i+=`\r
`}),i}}}var Vr=Object.defineProperty,Kr=Object.getOwnPropertyDescriptor,Gr=(s,l,o,t)=>{for(var i=t>1?void 0:t?Kr(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&Vr(l,o,i),i};let Sl=class extends U(Hl,[Ce,{nls:Se}],Or,Mr,Sr,Er,Hr,qr,Ur){};Sl=Gr([A("ki-table")],Sl);var Xr=Object.defineProperty,Jr=Object.getOwnPropertyDescriptor,Re=(s,l,o,t)=>{for(var i=t>1?void 0:t?Jr(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&Xr(l,o,i),i};let pe=class extends U(T,Tl){constructor(){super(...arguments),this.options=[],this.value=""}get selected(){const s=this.options.filter(l=>l.selected);return s.length?s[0].value:this.options[0].value}render(){return this.value=this.value||this.selected,g`
      ${this.options.map((s,l)=>{var o;return g`
          <div
            id="switcher_item_${s.value}"
            class="tab ${s.value===this.value?"selected":""} ${l===0?"first":""} ${this.options.length-1===l?"last":""}"
            tabindex="0"
            part="tab${s.value===this.value?" selected":""}"
            alt="View in ${s.value}"
            @keydown="${t=>{t.key==="Enter"&&this.switchTo(s.value)}}"
            @click="${()=>{this.switchTo(s.value)}}"
          >
            <div class="badgesContainer">
              ${(o=s==null?void 0:s.badges)==null?void 0:o.map(t=>g`<div
                    title="${t.label||""}"
                    class="badge"
                    style="background: ${t.bgcolor||"white"};color: ${t.color}"
                  >
                    ${t.count}
                  </div>`)}
            </div>
            ${s.icon?g`<ki-icon icon="${s.icon}"></ki-icon>`:""}
            <span class="label">${s.label}</span>
          </div>
        `})}
    `}switchTo(s){this.value!==s&&(this.value=s,this.dispatchEvent(new CustomEvent("changed",{detail:{value:s}})))}};pe.styles=[z`
      :host {
        display: flex;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        border-radius: 30px;
        font-size: 0;
        overflow: visible;
      }
      .tab {
        background: white;
        color: var(--theme-text-color-primary, #1d1d1b);
        fill: var(--theme-text-color-primary, #1d1d1b);
        display: flex;
        padding: 8px 10px;
        min-width: 40px;
        text-align: center;
        cursor: pointer;
        user-select: none;
        position: relative;
        font-size: 14px;
        line-height: 24px;
        align-items: center;
        justify-content: center;
      }

      ki-icon {
        margin-right: 5px;
        font-size: 1.3em;
      }
      .tab.selected {
        color: #ffffff;
        fill: #ffffff;
        background: var(--theme-color-primary, #0056a0);
      }

      :host.round .tab.last {
        border-bottom-right-radius: 30px;
        border-top-right-radius: 30px;
      }
      :host(.round).tab.first {
        border-bottom-left-radius: 30px;
        border-top-left-radius: 30px;
      }
      :host(.sm-screen) span.label {
        display: none;
      }
      :host(.sm-screen) ki-icon {
        font-size: 1.5em;
        margin-right: 0;
      }

      :host(.sm-screen) .tab {
        min-width: initial;
        padding: 9px 10px;
      }
      .badgesContainer {
        position: absolute;
        top: 0;
        display: flex;
        transform: translateY(130%);
        right: 0;
      }
      .badge {
        display: block;
        position: relative;
        outline: none;
        z-index: 999;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        color: white;
        padding: 0 10px;
        border-radius: 30px;
        font-size: 0.8em;
      }
    `];Re([p({type:Array})],pe.prototype,"options",2);Re([p({type:String})],pe.prototype,"value",2);pe=Re([A("ki-switcher")],pe);var Yr=Object.defineProperty,Wr=Object.getOwnPropertyDescriptor,Ml=(s,l,o,t)=>{for(var i=t>1?void 0:t?Wr(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&Yr(l,o,i),i};let _e=class extends T{constructor(){super(...arguments),this.selected=this.children[0].getAttribute("key"),this.history=[]}update(s){super.update(s),s.has("selected")&&this._select(this.selected)}render(){return g`<div class="stack-container"><slot></slot></div>`}_select(s){let l;for(const o of this.children){const t=o.getAttribute("key")===s;o.classList.toggle("selected",t),t&&(l=o)}l&&(l.getAttribute("skipHistory")||this.history.push(s),l.onShow&&l.onShow())}back(){this.selected=this.history.pop()}};_e.styles=z`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      height: 100%;
      width: 100%;
    }

    .stack-container {
      height: 100%;
      width: 100%;
      display: block;
      overflow: hidden;
    }

    .stack-container > ::slotted(*[key]) {
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      height: 100%;
      width: 100%;
    }

    .stack-container > ::slotted(.selected) {
      display: block;
    }
  `;Ml([p({type:String})],_e.prototype,"selected",2);_e=Ml([A("ki-stack")],_e);var Zr=Object.defineProperty,Qr=Object.getOwnPropertyDescriptor,ze=(s,l,o,t)=>{for(var i=t>1?void 0:t?Qr(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&Zr(l,o,i),i};let te=class extends U(T,[Ce,{nls:Se}]){constructor(){super(),this.value="",this.placeholder="",this.fieldList=[],this.emitSearch=Ne(()=>{this.dispatchEvent(new CustomEvent("search",{detail:{value:this.value}}))},200)}render(){return g`
      <ui5-icon></ui5-icon>
      <ui5-input
        style="width: 250px"
        show-clear-icon
        id="input"
        .value="${this.value}"
        @input="${this._handleChanged}"
        placeholder="${this.placeholder||this.i18n.t("search")}"
      ></ui5-input>

      <slot name="actions"> </slot>
    `}_handleChanged(){const s=this.renderRoot.querySelector("#input");this.value=s.value,this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value}})),this.emitSearch()}resetValue(){this.value="",this.renderRoot.querySelector("#input").value="",this._handleChanged()}};te.styles=[z`
      :host {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
      }

      .hide {
        display: none;
      }
    `];ze([p({type:String})],te.prototype,"value",2);ze([p({type:String})],te.prototype,"placeholder",2);ze([p({type:Array})],te.prototype,"fieldList",2);te=ze([A("ki-searchbox")],te);const eo=function(){function s(t,i){function e(){this.constructor=t}e.prototype=i.prototype,t.prototype=new e}function l(t,i,e,c){this.message=t,this.expected=i,this.found=e,this.location=c,this.name="SyntaxError",typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(this,l)}s(l,Error),l.buildMessage=function(t,i){const e={literal(v){return`"${b(v.text)}"`},class:function(v){let y="",k;for(k=0;k<v.parts.length;k++)y+=v.parts[k]instanceof Array?`${w(v.parts[k][0])}-${w(v.parts[k][1])}`:w(v.parts[k]);return`[${v.inverted?"^":""}${y}]`},any(v){return"any character"},end(v){return"end of input"},other(v){return v.description}};function c(v){return v.charCodeAt(0).toString(16).toUpperCase()}function b(v){return v.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,y=>`\\x0${c(y)}`).replace(/[\x10-\x1F\x7F-\x9F]/g,y=>`\\x${c(y)}`)}function w(v){return v.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,y=>`\\x0${c(y)}`).replace(/[\x10-\x1F\x7F-\x9F]/g,y=>`\\x${c(y)}`)}function $(v){return e[v.type](v)}function _(v){const y=new Array(v.length);let k,Q;for(k=0;k<v.length;k++)y[k]=$(v[k]);if(y.sort(),y.length>0){for(k=1,Q=1;k<y.length;k++)y[k-1]!==y[k]&&(y[Q]=y[k],Q++);y.length=Q}switch(y.length){case 1:return y[0];case 2:return`${y[0]} or ${y[1]}`;default:return`${y.slice(0,-1).join(", ")}, or ${y[y.length-1]}`}}function S(v){return v?`"${b(v)}"`:"end of input"}return`Expected ${_(t)} but ${S(i)} found.`};function o(t,i){i=i!==void 0?i:{};const e={},c={Start:ul};let b=ul;const w=function(r){return r},$="(",_=C("(",!1),S=")",v=C(")",!1),y=function(r,a){return tr(r,a)},k=function(r,a,h){return{type:"field",operator:a,key:r,value:h}},Q=ye("field name"),Me=/^[A-Za-z1-9_$]/,Ue=X([["A","Z"],["a","z"],["1","9"],"_","$"],!1,!1),Ul=function(r){const a=r.join("");return!i.fields||i.fields.indexOf(a)>=0?a:(n-=a.length,e)},Ve=/^[A-Za-z0-9_$]/,Ke=X([["A","Z"],["a","z"],["0","9"],"_","$"],!1,!1),Vl=function(r){return r.join("")},Kl=function(r){return r.value},Gl="[",Xl=C("[",!1),Ge=",",Xe=C(",",!1),Jl="]",Yl=C("]",!1),Wl=function(r,a){return ir(r,a)},Zl=ye("whitespace"),Je=/^[ \t\n\r]/,Ye=X([" ","	",`
`,"\r"],!1,!1),Ql=ye("space"),We=/^[ ]/,Ze=X([" "],!1,!1),es="=",ls=C("=",!1),Qe="!=",ss=C("!=",!1),el=">=",rs=C(">=",!1),ll="<=",os=C("<=",!1),ts="<",is=C("<",!1),ns=">",as=C(">",!1),sl="IN",cs=C("IN",!1),rl="AND",hs=C("AND",!1),ol="OR",ds=C("OR",!1),ps=ye("string"),fe='"',me=C('"',!1),us=function(r){return{type:"Literal",value:r.join("")}},Ee="\\",Pe=C("\\",!1),tl=function(){return Vs()},gs=function(r){return r},fs="0",ms=C("0",!1),vs=function(){return"\0"},il="x",nl=C("x",!1),al=function(r){return String.fromCharCode(parseInt(r,16))},cl="u",hl=C("u",!1),bs=/^[0-9]/,ys=X([["0","9"]],!1,!1),xs=Ks(),ws=/^[0-9a-f]/i,$s=X([["0","9"],["a","f"]],!1,!0),_s="'",ks=C("'",!1),Cs="b",Ss=C("b",!1),zs=function(){return"\b"},Os="f",Es=C("f",!1),Ps=function(){return"\f"},As="n",Ds=C("n",!1),Ts=function(){return`
`},Ls="r",Is=C("r",!1),js=function(){return"\r"},Ns="t",Fs=C("t",!1),Bs=function(){return"	"},Rs="v",Hs=C("v",!1),qs=function(){return"\v"},Ms=/^[\n\r\u2028\u2029]/,Us=X([`
`,"\r","\u2028","\u2029"],!1,!1);var n=0;let P=0;const ve=[{line:1,column:1}];let I=0,Ae=[],u=0,be;if("startRule"in i){if(!(i.startRule in c))throw new Error(`Can't start parsing from rule "${i.startRule}".`);b=c[i.startRule]}function Vs(){return t.substring(P,n)}function C(r,a){return{type:"literal",text:r,ignoreCase:a}}function X(r,a,h){return{type:"class",parts:r,inverted:a,ignoreCase:h}}function Ks(){return{type:"any"}}function Gs(){return{type:"end"}}function ye(r){return{type:"other",description:r}}function dl(r){let a=ve[r],h;if(a)return a;for(h=r-1;!ve[h];)h--;for(a=ve[h],a={line:a.line,column:a.column};h<r;)t.charCodeAt(h)===10?(a.line++,a.column=1):a.column++,h++;return ve[r]=a,a}function pl(r,a){const h=dl(r),d=dl(a);return{start:{offset:r,line:h.line,column:h.column},end:{offset:a,line:d.line,column:d.column}}}function f(r){n<I||(n>I&&(I=n,Ae=[]),Ae.push(r))}function Xs(r,a,h){return new l(l.buildMessage(r,a),r,a,h)}function ul(){let r,a;return r=n,a=De(),a!==e&&(P=r,a=w(a)),r=a,r}function gl(){let r,a,h,d,x,m;return r=n,t.charCodeAt(n)===40?(a=$,n++):(a=e,u===0&&f(_)),a!==e?(h=H(),h!==e?(d=De(),d!==e?(x=H(),x!==e?(t.charCodeAt(n)===41?(m=S,n++):(m=e,u===0&&f(v)),m!==e?(P=r,a=w(d),r=a):(n=r,r=e)):(n=r,r=e)):(n=r,r=e)):(n=r,r=e)):(n=r,r=e),r===e&&(r=De()),r}function De(){let r,a,h,d,x,m,O,E;if(r=n,a=Te(),a!==e){for(h=[],d=n,x=ee(),x!==e?(m=fl(),m!==e?(O=ee(),O!==e?(E=Te(),E===e&&(E=gl()),E!==e?(x=[x,m,O,E],d=x):(n=d,d=e)):(n=d,d=e)):(n=d,d=e)):(n=d,d=e);d!==e;)h.push(d),d=n,x=ee(),x!==e?(m=fl(),m!==e?(O=ee(),O!==e?(E=Te(),E===e&&(E=gl()),E!==e?(x=[x,m,O,E],d=x):(n=d,d=e)):(n=d,d=e)):(n=d,d=e)):(n=d,d=e);h!==e?(P=r,a=y(a,h),r=a):(n=r,r=e)}else n=r,r=e;return r}function Te(){let r,a,h,d,x,m;return r=n,a=Js(),a!==e?(h=ee(),h!==e?(d=Ys(),d!==e?(x=ee(),x!==e?(m=xe(),m!==e?(P=r,a=k(a,d,m),r=a):(n=r,r=e)):(n=r,r=e)):(n=r,r=e)):(n=r,r=e)):(n=r,r=e),r}function Js(){let r,a,h;if(u++,r=n,a=[],Me.test(t.charAt(n))?(h=t.charAt(n),n++):(h=e,u===0&&f(Ue)),h!==e)for(;h!==e;)a.push(h),Me.test(t.charAt(n))?(h=t.charAt(n),n++):(h=e,u===0&&f(Ue));else a=e;return a!==e&&(P=r,a=Ul(a)),r=a,u--,r===e&&(a=e,u===0&&f(Q)),r}function xe(){let r,a,h,d,x,m,O,E,se,re;if(r=n,a=[],Ve.test(t.charAt(n))?(h=t.charAt(n),n++):(h=e,u===0&&f(Ke)),h!==e)for(;h!==e;)a.push(h),Ve.test(t.charAt(n))?(h=t.charAt(n),n++):(h=e,u===0&&f(Ke));else a=e;if(a!==e&&(P=r,a=Vl(a)),r=a,r===e&&(r=n,a=Ws(),a!==e&&(P=r,a=Kl(a)),r=a,r===e))if(r=n,t.charCodeAt(n)===91?(a=Gl,n++):(a=e,u===0&&f(Xl)),a!==e)if(h=H(),h!==e)if(d=xe(),d!==e){for(x=[],m=n,O=H(),O!==e?(t.charCodeAt(n)===44?(E=Ge,n++):(E=e,u===0&&f(Xe)),E!==e?(se=H(),se!==e?(re=xe(),re!==e?(O=[O,E,se,re],m=O):(n=m,m=e)):(n=m,m=e)):(n=m,m=e)):(n=m,m=e);m!==e;)x.push(m),m=n,O=H(),O!==e?(t.charCodeAt(n)===44?(E=Ge,n++):(E=e,u===0&&f(Xe)),E!==e?(se=H(),se!==e?(re=xe(),re!==e?(O=[O,E,se,re],m=O):(n=m,m=e)):(n=m,m=e)):(n=m,m=e)):(n=m,m=e);x!==e?(m=H(),m!==e?(t.charCodeAt(n)===93?(O=Jl,n++):(O=e,u===0&&f(Yl)),O!==e?(P=r,a=Wl(d,x),r=a):(n=r,r=e)):(n=r,r=e)):(n=r,r=e)}else n=r,r=e;else n=r,r=e;else n=r,r=e;return r}function ee(){let r,a;if(u++,r=[],Je.test(t.charAt(n))?(a=t.charAt(n),n++):(a=e,u===0&&f(Ye)),a!==e)for(;a!==e;)r.push(a),Je.test(t.charAt(n))?(a=t.charAt(n),n++):(a=e,u===0&&f(Ye));else r=e;return u--,r===e&&(a=e,u===0&&f(Zl)),r}function H(){let r,a;for(u++,r=[],We.test(t.charAt(n))?(a=t.charAt(n),n++):(a=e,u===0&&f(Ze));a!==e;)r.push(a),We.test(t.charAt(n))?(a=t.charAt(n),n++):(a=e,u===0&&f(Ze));return u--,r===e&&(a=e,u===0&&f(Ql)),r}function Ys(){let r;return t.charCodeAt(n)===61?(r=es,n++):(r=e,u===0&&f(ls)),r===e&&(t.substr(n,2)===Qe?(r=Qe,n+=2):(r=e,u===0&&f(ss)),r===e&&(t.substr(n,2)===el?(r=el,n+=2):(r=e,u===0&&f(rs)),r===e&&(t.substr(n,2)===ll?(r=ll,n+=2):(r=e,u===0&&f(os)),r===e&&(t.charCodeAt(n)===60?(r=ts,n++):(r=e,u===0&&f(is)),r===e&&(t.charCodeAt(n)===62?(r=ns,n++):(r=e,u===0&&f(as)),r===e&&(t.substr(n,2)===sl?(r=sl,n+=2):(r=e,u===0&&f(cs)))))))),r}function fl(){let r;return t.substr(n,3)===rl?(r=rl,n+=3):(r=e,u===0&&f(hs)),r===e&&(t.substr(n,2)===ol?(r=ol,n+=2):(r=e,u===0&&f(ds))),r}function Ws(){let r,a,h,d;if(u++,r=n,t.charCodeAt(n)===34?(a=fe,n++):(a=e,u===0&&f(me)),a!==e){for(h=[],d=ml();d!==e;)h.push(d),d=ml();h!==e?(t.charCodeAt(n)===34?(d=fe,n++):(d=e,u===0&&f(me)),d!==e?(P=r,a=us(h),r=a):(n=r,r=e)):(n=r,r=e)}else n=r,r=e;return u--,r===e&&(a=e,u===0&&f(ps)),r}function ml(){let r,a,h;return r=n,a=n,u++,t.charCodeAt(n)===34?(h=fe,n++):(h=e,u===0&&f(me)),h===e&&(t.charCodeAt(n)===92?(h=Ee,n++):(h=e,u===0&&f(Pe))),u--,h===e?a=void 0:(n=a,a=e),a!==e?(h=bl(),h!==e?(P=r,a=tl(),r=a):(n=r,r=e)):(n=r,r=e),r===e&&(r=n,t.charCodeAt(n)===92?(a=Ee,n++):(a=e,u===0&&f(Pe)),a!==e?(h=Zs(),h!==e?(P=r,a=gs(h),r=a):(n=r,r=e)):(n=r,r=e)),r}function Zs(){let r,a,h,d;return r=er(),r===e&&(r=n,t.charCodeAt(n)===48?(a=fs,n++):(a=e,u===0&&f(ms)),a!==e?(h=n,u++,d=vl(),u--,d===e?h=void 0:(n=h,h=e),h!==e?(P=r,a=vs(),r=a):(n=r,r=e)):(n=r,r=e),r===e&&(r=Qs(),r===e&&(r=lr()))),r}function Qs(){let r,a,h,d,x,m;return r=n,t.charCodeAt(n)===120?(a=il,n++):(a=e,u===0&&f(nl)),a!==e?(h=n,d=n,x=le(),x!==e?(m=le(),m!==e?(x=[x,m],d=x):(n=d,d=e)):(n=d,d=e),d!==e?h=t.substring(h,n):h=d,h!==e?(P=r,a=al(h),r=a):(n=r,r=e)):(n=r,r=e),r}function er(){let r;return r=yl(),r===e&&(r=rr()),r}function lr(){let r,a,h,d,x,m,O,E;return r=n,t.charCodeAt(n)===117?(a=cl,n++):(a=e,u===0&&f(hl)),a!==e?(h=n,d=n,x=le(),x!==e?(m=le(),m!==e?(O=le(),O!==e?(E=le(),E!==e?(x=[x,m,O,E],d=x):(n=d,d=e)):(n=d,d=e)):(n=d,d=e)):(n=d,d=e),d!==e?h=t.substring(h,n):h=d,h!==e?(P=r,a=al(h),r=a):(n=r,r=e)):(n=r,r=e),r}function vl(){let r;return bs.test(t.charAt(n))?(r=t.charAt(n),n++):(r=e,u===0&&f(ys)),r}function bl(){let r;return t.length>n?(r=t.charAt(n),n++):(r=e,u===0&&f(xs)),r}function le(){let r;return ws.test(t.charAt(n))?(r=t.charAt(n),n++):(r=e,u===0&&f($s)),r}function yl(){let r,a;return t.charCodeAt(n)===39?(r=_s,n++):(r=e,u===0&&f(ks)),r===e&&(t.charCodeAt(n)===34?(r=fe,n++):(r=e,u===0&&f(me)),r===e&&(t.charCodeAt(n)===92?(r=Ee,n++):(r=e,u===0&&f(Pe)),r===e&&(r=n,t.charCodeAt(n)===98?(a=Cs,n++):(a=e,u===0&&f(Ss)),a!==e&&(P=r,a=zs()),r=a,r===e&&(r=n,t.charCodeAt(n)===102?(a=Os,n++):(a=e,u===0&&f(Es)),a!==e&&(P=r,a=Ps()),r=a,r===e&&(r=n,t.charCodeAt(n)===110?(a=As,n++):(a=e,u===0&&f(Ds)),a!==e&&(P=r,a=Ts()),r=a,r===e&&(r=n,t.charCodeAt(n)===114?(a=Ls,n++):(a=e,u===0&&f(Is)),a!==e&&(P=r,a=js()),r=a,r===e&&(r=n,t.charCodeAt(n)===116?(a=Ns,n++):(a=e,u===0&&f(Fs)),a!==e&&(P=r,a=Bs()),r=a,r===e&&(r=n,t.charCodeAt(n)===118?(a=Rs,n++):(a=e,u===0&&f(Hs)),a!==e&&(P=r,a=qs()),r=a)))))))),r}function sr(){let r;return r=yl(),r===e&&(r=vl(),r===e&&(t.charCodeAt(n)===120?(r=il,n++):(r=e,u===0&&f(nl)),r===e&&(t.charCodeAt(n)===117?(r=cl,n++):(r=e,u===0&&f(hl))))),r}function rr(){let r,a,h;return r=n,a=n,u++,h=sr(),h===e&&(h=or()),u--,h===e?a=void 0:(n=a,a=e),a!==e?(h=bl(),h!==e?(P=r,a=tl(),r=a):(n=r,r=e)):(n=r,r=e),r}function or(){let r;return Ms.test(t.charAt(n))?(r=t.charAt(n),n++):(r=e,u===0&&f(Us)),r}function tr(r,a){return a.reduce((h,d)=>({type:"logic",operator:d[1],left:h,right:d[3]}),r)}function ir(r,a){const h=[r];return a.forEach(d=>{h.push(d[3])}),h}if(be=b(),be!==e&&n===t.length)return be;throw be!==e&&n<t.length&&f(Gs()),Xs(Ae,I<t.length?t.charAt(I):null,I<t.length?pl(I,I+1):pl(I,I))}return{SyntaxError:l,parse:o}}();var lo=Object.defineProperty,so=Object.getOwnPropertyDescriptor,Z=(s,l,o,t)=>{for(var i=t>1?void 0:t?so(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&lo(l,o,i),i};let B=class extends T{constructor(){super(...arguments),this.fieldList=[],this.error=""}render(){let s="";return this.content?this.error===""?s="ok":s="error":s="info",g`
      <div id="marker">
        <ki-icon
          class="${s==="ok"?s:"hide"}"
          icon="ki ki-check"
        ></ki-icon>
        <ki-icon
          class="${s==="error"?s:"hide"}"
          icon="ki ki-info-circle"
        ></ki-icon>
      </div>
      <ki-popup id="msg-popup" for="marker" ?visible=${!0}
        >${this.error}</ki-popup
      >
    `}updated(s){s.has("content")&&this._checkContent()}_checkContent(){this.error="";try{this.content&&(this.query=eo.parse(this.content,{fields:this.fieldList}),this.dispatchEvent(new CustomEvent("query",{detail:{query:this.query}}))),this.dispatchEvent(new CustomEvent("suggestion",{detail:{suggestion:null}}))}catch(s){this.error=s.message,this.suggestion=this.getSuggestions(s),this.dispatchEvent(new CustomEvent("suggestion",{detail:{suggestion:{options:this.suggestion,location:s.location}}}))}}getSuggestions(s){let l=[];return s.expected.forEach(o=>{o.description==="field name"&&(l=l.concat(this.fieldList)),o.type==="literal"&&o.text&&["("].indexOf(o.text)<0&&l.indexOf(o.text)<0&&l.push(o.text)}),l=[...new Set(l)],l}};B.styles=z`
    .hide {
      display: none !important;
    }

    ki-icon {
      cursor: pointer;
    }

    ki-icon.ok {
      fill: #00c300;
    }

    ki-icon.ok:hover {
      fill: green;
    }

    ki-icon.error {
      fill: red;
    }

    ki-icon.error:hover {
      fill: #cf0000;
    }
  `;Z([p({type:String})],B.prototype,"content",2);Z([p({type:Array})],B.prototype,"fieldList",2);Z([p({type:String})],B.prototype,"error",2);Z([p({type:String})],B.prototype,"suggestion",2);Z([p({type:Object})],B.prototype,"inputElement",2);Z([p({type:Object})],B.prototype,"query",2);B=Z([A("ki-search-query-action")],B);var ro=Object.defineProperty,oo=Object.getOwnPropertyDescriptor,Oe=(s,l,o,t)=>{for(var i=t>1?void 0:t?oo(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&ro(l,o,i),i};let ie=class extends T{constructor(){super(...arguments),this.content="",this.fieldList=[]}render(){return g`
      <ki-searchbox
        id="searchbox"
        .value="${this.content}"
        @search="${s=>{this.content=s.detail.value}}"
      >
        <div slot="actions">
          <ki-search-query-action
            @query="${this.onSearch}"
            @suggestion="${this._onSuggestion}"
            .fieldList="${this.fieldList}"
            .content="${this.content}"
          ></ki-search-query-action>
        </div>
      </ki-searchbox>
      <ki-popup id="suggestion-popup" ?visible="${!!this.suggestion}">
        <ki-list
          >${this.suggestion&&this.suggestion.options.map(s=>g`
                <ki-list-item
                  @click="${()=>this._applySuggestion(this.suggestion.location,s)}"
                  >${s}</ki-list-item
                >
              `)}</ki-list
        >
      </ki-popup>
    `}_onSuggestion(s){this.suggestion=s.detail.suggestion}_applySuggestion(s,l){this.content=this.content.substr(0,s.start.offset)+l}onSearch(s){this.dispatchEvent(new CustomEvent("search",{detail:{query:s.detail.query}}))}};ie.styles=z`
    :host {
      display: block;
      position: relative;
    }
    #suggestion-popup {
      top: 100%;
      left: 0;
      width: 100%;
    }
  `;Oe([p({type:String})],ie.prototype,"content",2);Oe([p({type:Array})],ie.prototype,"fieldList",2);Oe([p({type:Array})],ie.prototype,"suggestion",2);ie=Oe([A("ki-queryable-searchbox")],ie);var to=Object.defineProperty,io=Object.getOwnPropertyDescriptor,V=(s,l,o,t)=>{for(var i=t>1?void 0:t?io(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&to(l,o,i),i};let j=class extends T{constructor(){super(...arguments),this.label="",this.isLeaf=!1,this.expand=!1,this.paddingLeft=0}get __labelElement(){return Fe(this,"#label")}render(){return g`
      <div
        class="tree-item ${this.selectedItem&&this.selectedItem.indexOf(this.value)!==-1?"selected":""} "
      >
        <div
          class="tree-node-content ${this.isLeaf?"leaf-content":""}"
          style="padding-left:${this.paddingLeft}px;"
        >
          <div class="tree-node-label" @click="${this.handleContentClick}">
            ${this.icon?g`<ki-icon
                  class="node-content-icon"
                  icon="${this.icon}"
                ></ki-icon>`:""}
            <span class="node-content-label" id="label">${this.label}</span>
          </div>
          <ki-icon
            id="icon"
            title="Expand"
            class="expand-icon ${this.isLeaf?"hide":""}"
            icon="ki ${this.expand?"ki-chevron-up":"ki-chevron-down"}"
            @click="${this.handleClick}"
          ></ki-icon>
        </div>
        <div class="tree-node-children ${this.expand?"":"hide"}">
          <slot></slot>
        </div>
      </div>
    `}_createPapertooltip(){if(this.__labelElement.offsetWidth<this.__labelElement.scrollWidth){const s=document.createElement("paper-tooltip");s.for="label",s.innerHTML=this.label,this.__labelElement.appendChild(s)}}handleContentClick(){const s=new CustomEvent("labelClicked",{detail:{value:this.value},bubbles:!0,composed:!0});this.isLeaf?this.dispatchEvent(new CustomEvent("itemSelected",{detail:{value:this.value},bubbles:!0,composed:!0})):(this.dispatchEvent(s),this.expand=!this.expand)}handleClick(){const s=new CustomEvent("itemSelected",{detail:{value:this.value},bubbles:!0,composed:!0});this.isLeaf?(this.expand=!1,this.dispatchEvent(s)):this.expand=!this.expand,this.requestUpdate(this.expand,!this.expand)}};j.styles=z`
    .tree-item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      line-height: 2.5em;
      color: grey;
      width: 100%;
    }

    :host(.hideRoot) .tree-item .tree-node-content {
      display: none;
    }
    :host(.hideRoot) .tree-item .tree-node-children {
      padding-left: 0;
    }

    .tree-node-content.leaf-content {
      background-color: white;
    }

    .tree-item.selected .tree-node-content {
      color: white;
      background: var(--theme-color, #0056a0);
    }

    .tree-node-content {
      display: flex;
      flex-direction: row;
      padding: 0px 20px;
      height: 40px;
      overflow: hidden;
    }

    .tree-node-label {
      flex: 1;
    }
    .tree-node-label:hover {
      color: var(--theme-color, #0056a0);
      cursor: pointer;
    }
    .tree-item.selected .tree-node-label:hover {
      color: white;
      opacity: 0.8;
    }
    .tree-node-label .node-content-label {
      white-space: nowrap;
      max-width: 300px;
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .node-content-label {
      flex: 1;
      line-height: 40px;
    }

    .node-content-icon {
      vertical-align: top;
      padding: 10px;
      font-size: 18px;
      cursor: pointer;
    }

    span::selection {
      background: white;
    }

    .expand-icon {
      padding: 10px;
      width: 36px;
      text-align: center;
    }

    .expand-icon.hide {
      display: none;
    }
    .expand-icon:hover {
      fill: var(--theme-color, #0056a0);
      cursor: pointer;
      border-radius: 50%;
    }

    .tree-node-children.hide {
      display: none;
    }
  `;V([p({type:String})],j.prototype,"icon",2);V([p({type:String})],j.prototype,"label",2);V([p({type:Object})],j.prototype,"value",2);V([p({type:Boolean})],j.prototype,"isLeaf",2);V([p({type:Array})],j.prototype,"selectedItem",2);V([p({type:Boolean})],j.prototype,"expand",2);V([p({type:Number})],j.prototype,"paddingLeft",2);j=V([A("ki-tree-node")],j);var no=Object.defineProperty,ao=Object.getOwnPropertyDescriptor,ce=(s,l,o,t)=>{for(var i=t>1?void 0:t?ao(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&no(l,o,i),i};const zl=50;let M=class extends T{constructor(){super(...arguments),this._data=[],this._tailIndex=zl,this.indent=20,this.value=[],this.expand=!0}get data(){return this._data}set data(s){this._data=s,this.requestUpdate()}render(){return g`
      <div
        @itemSelected="${this.handleItemSelected}"
        @scroll="${this._loadMore}"
        @labelClicked="${this.handleLabelClick}"
      >
        <ki-tree-node
          class="${this.hideRoot?"hideRoot":""}"
          icon="${this.data.icon}"
          label="${this.data.label}"
          ?expand="${this.expand}"
          .paddingLeft="${this.indent}"
        >
          ${this.data.children&&this.data.children.slice(0,Math.min(this._tailIndex,this.data.children.length)).map(s=>this._renderChild(s,this.indent*2))}
        </ki-tree-node>
      </div>
    `}_loadMore(){const s=this.renderRoot.querySelector(".tree");s&&s.scrollTop>s.scrollHeight/2&&this._tailIndex<this.data.children.length&&(this._tailIndex=Math.min(this._tailIndex+zl,this.data.children.length))}_renderChild(s,l){return s&&s.children&&s.children.length>0?g`
        <div class="group">
          <ki-tree-node
            .icon="${s.icon}"
            .label="${s.label}"
            .value="${s.value}"
            .expand="${s.expand||s.children.some(o=>this.value.indexOf(o.value)>=0)}"
            .paddingLeft="${l}"
          >
            ${s.children.map(o=>this._renderChild(o,l+this.indent))}
          </ki-tree-node>
        </div>
      `:g`
      <ki-tree-node
        .icon="${s.icon}"
        .label="${s.label}"
        .value="${s.value}"
        isLeaf
        .selectedItem="${this.value}"
        .paddingLeft="${l}"
      ></ki-tree-node>
    `}handleItemSelected(s){const l=s.detail.value;s.stopPropagation();const o=this.value&&this.value.indexOf(l);if(this.multiple)o!==-1?this.value=[...this.value.slice(0,o),...this.value.slice(o+1)]:this.value=[...this.value,l];else{const{length:t}=this.value;t===0||o===-1?this.value=[l]:this.value=[]}console.log("selected items:",this.value),this.requestUpdate(),this.dispatchEvent(new CustomEvent("itemSelected",{detail:{value:this.value},bubbles:!0,composed:!0}))}reset(){this.value=[],this.requestUpdate()}};M.styles=z`
    :host {
      height: 100%;
      width: 100%;
      display: block;
      overflow: auto;
    }
    .group {
      overflow: hidden;
    }
  `;ce([p({type:Object})],M.prototype,"data",1);ce([p({type:Number})],M.prototype,"_tailIndex",2);ce([p({type:Boolean})],M.prototype,"multiple",2);ce([p({type:Number})],M.prototype,"indent",2);ce([p({type:Boolean})],M.prototype,"hideRoot",2);M=ce([A("ki-tree")],M);var co=Object.defineProperty,ho=Object.getOwnPropertyDescriptor,K=(s,l,o,t)=>{for(var i=t>1?void 0:t?ho(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&co(l,o,i),i};let N=class extends T{constructor(){super(),this.pkg={},this.showPopup=!1,this.showDependencies=!1,this.showBuildDate=!1,this.dependencies="",this.changelog="No changelog provided",this._packageJsonPath="./package.json",this.packageJsonPath="./package.json"}get packageJsonPath(){return this._packageJsonPath}set packageJsonPath(s){this._packageJsonPath=s,s&&fetch(s).then(l=>l.json()).then(l=>{this.pkg=l})}async onAfterEnter(s){const l=ur(s,[]);console.log(l),Object.assign(this,l.options)}render(){return g`
      <div
        class="version"
        @click="${()=>{this.showPopup=!this.showPopup}}"
      >
        ${this.pkg.name}#${this.pkg.version}
      </div>
      <div class="dependencies">${this.dependencies}</div>
      <ki-popup .visible="${this.showPopup}">${this.changelog}</ki-popup>
    `}};N.styles=z`
    .version {
      display: block;
      padding: 20px;
      cursor: pointer;
      color: var(--theme-color);
    }

    .dependencies {
      color: grey;
      padding: 5px 30px;
    }
  `;K([p({type:Object})],N.prototype,"pkg",2);K([p({type:Boolean})],N.prototype,"showPopup",2);K([p({type:Boolean})],N.prototype,"showDependencies",2);K([p({type:Boolean})],N.prototype,"showBuildDate",2);K([p({type:String})],N.prototype,"dependencies",2);K([p({type:String})],N.prototype,"changelog",2);K([p({type:String})],N.prototype,"packageJsonPath",1);N=K([A("ki-wcp-version-tag")],N);var po=Object.defineProperty,uo=Object.getOwnPropertyDescriptor,G=(s,l,o,t)=>{for(var i=t>1?void 0:t?uo(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&po(l,o,i),i};let D=class extends T{constructor(){super(...arguments),this.visible=!1,this.draggable=!1,this.closeable=!1,this.closeOnSwipeDown=!1,this.__fullscreen=!1,this.trackable=!1,this.label="",this._originTop=0}render(){return this.classList.toggle("visible",this.visible),this.classList.toggle("full-screen",this.__fullscreen),this.classList.toggle("draggable",this.draggable),g`
      <div class="modal-header-wrapper">
        <div
          class="ki-modal-drag"
          @click="${this.handleClick}"
          @touchmove="${this.handleTouchMove}"
          @touchstart="${this.handleTouchStart}"
        ></div>
        <div
          class="ki-modal-header ${this.closeable||this.label?"bottom-border":""}"
        >
          <span class="ki-modal-label">${this.label}</span>
          <ki-icon
            icon="ki ki-times"
            class="close ${this.closeable?"":"hide"}"
            @click="${this.close}"
          ></ki-icon>
        </div>
      </div>
      <slot></slot>
    `}handleTouchMove(s){if(this.draggable){const l=s.targetTouches[0],o=this._originTop-l.clientY;this.__fullscreen=o>0,this.requestUpdate(),this._originTop=l.clientY}}handleTouchStart(s){if(this.draggable){const l=s.targetTouches[0];this._originTop=l.clientY}}handleClick(s){s.stopPropagation(),this.draggable&&(this.__fullscreen=!this.__fullscreen,this.dispatchEvent(new CustomEvent("togglefullscreen",{bubbles:!0,composed:!0,detail:{fullscreen:this.__fullscreen}})),this.requestUpdate())}connectedCallback(){super.connectedCallback&&super.connectedCallback(),$r(this.renderRoot,(...s)=>this.handleGesure(...s))}updated(){this.visible&&this.trackable&&!dr(D.history,this)&&D.history.push(this),this.__fullscreen||!this.visible?this.__height=null:this.__height=this.minContentHeight}set __height(s){s?this.style.bottom=`calc(${s}px - 100%)`:this.style.bottom=null}show(){if(this.visible=!0,this.trackable){const s=$l(D.history);s&&(s.visible=!1)}else D.history.forEach(s=>s.visible=!1)}close(){if(this.visible=!1,this.trackable){D.history.pop();const s=$l(D.history);s&&(s.visible=!0)}else D.history.forEach(s=>s.visible=!0)}handleGesure(s,l,o,t){l<s+50&&console.log("Swiped left"),l>s+50&&console.log("Swiped right"),t<o+50&&console.log("Swiped up"),t>o+50&&this.closeOnSwipeDown&&this.close(),t===o+50&&console.log("Tap")}};D.styles=z`
    :host {
      background-color: #fefefe;
      width: 100%;
      height: auto;
      max-height: 100%;
      border-top: 1px solid lightgray;
      position: fixed;
      z-index: 100;
      overflow: auto;
      left: 0;
      bottom: -100%;
      transition: bottom 0.5s;
    }

    :host(.visible) {
      z-index: 101;
      bottom: 0;
      max-height: 100%;
      filter: drop-shadow(1px 4px 7px grey);
    }

    :host(.visible.full-screen) {
      bottom: 0;
    }
    :host(.draggable) .ki-modal-drag {
      display: block;
    }

    .ki-modal-drag {
      display: none;
      width: 20%;
      height: 3px;
      margin: 5px auto 0px;
      border-radius: 32px;
      border: 1px solid transparent;
      background: gray;
    }

    .ki-modal-header {
      display: flex;
      flex-direction: row;
      padding: 0px 10px;
      font-size: 1.2em;
      line-height: 1.8em;
    }
    .ki-modal-header.bottom-border {
      border-bottom: 1px solid lightgray;
    }
    .ki-modal-header.bottom-border .ki-modal-label {
      height: 1.8em;
    }
    .ki-modal-label {
      flex: 1;
      display: inline-block;
    }
    .close {
      fill: gray;
      line-height: 1.8em;
    }
    .close.hide {
      display: none;
    }
    .close:hover {
      cursor: pointer;
    }
    .close:focus {
      cursor: pointer;
    }
  `;D.history=[];G([p({type:Boolean})],D.prototype,"visible",2);G([p({type:Boolean})],D.prototype,"draggable",2);G([p({type:Boolean})],D.prototype,"closeable",2);G([p({type:Boolean})],D.prototype,"closeOnSwipeDown",2);G([p({type:Boolean})],D.prototype,"trackable",2);G([p({type:String})],D.prototype,"label",2);G([p({type:Number})],D.prototype,"minContentHeight",2);D=G([A("ki-modal")],D);var go=Object.defineProperty,fo=Object.getOwnPropertyDescriptor,He=(s,l,o,t)=>{for(var i=t>1?void 0:t?fo(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&go(l,o,i),i};let F=class extends T{constructor(){super(...arguments),this.type="",this.visible=!1}static showToast({type:s="success",content:l="msg content"}={}){const o=document.createElement("ki-toast");o.type=s,o.content=l,document.body.appendChild(o),setTimeout(()=>{o.open()})}renderMsg(){return this.content?g` ${this.content} `:g` <slot></slot> `}render(){this.renderRoot.host.classList.toggle("visible",this.visible),this.renderRoot.host.classList.remove(Object.keys(F.types));const s=F.types[this.type];return s&&this.renderRoot.host.classList.add(F.types[this.type].className),g`
      <div class="icon-container">
        <ki-icon icon="${s.icon}"></ki-icon>
      </div>
      <div class="content-container">${this.renderMsg()}</div>
      <div class="action-container">
        <ki-icon
          class="close-btn"
          icon="ki ki-times"
          @click="${this.close}"
        ></ki-icon>
      </div>
    `}open({duration:s=2e5}={}){this.visible=!0,this.requestUpdate(),setTimeout(()=>{this.close()},s)}close(){this.visible=!1,this.requestUpdate()}};F.styles=z`
    :host {
      display: flex;
      flex-direction: row;
      position: fixed;
      background-color: white;
      color: black;
      fill: black;
      border: 1px solid var(--ki-toast-color, black);
      min-height: 48px;
      max-width: 400px;
      /*max-width: 80%; !*for mobile*!*/
      min-width: 288px;
      padding: 12px 0;
      box-sizing: border-box;
      border-radius: 2px;
      font-size: 14px;
      cursor: default;
      opacity: 0;
      transform: translateX(200px);
      transition: transform linear 0.3s, opacity linear 0.3s;
      z-index: 10;
    }

    :host(.visible) {
      opacity: 1;
      transform: translateX(0px);
    }

    /*right-bottom*/
    :host {
      position: fixed;
      right: 20px;
      bottom: 20px;
    }

    .icon-container {
      color: var(--ki-toast-color, black);
      flex: 0 0 70px;
      text-align: center;
      font-size: 24px;
      margin: auto;
    }

    .content-container {
      flex: 1;
    }

    .action-container {
      flex: 0 40px;
      text-align: center;
    }

    .close-btn {
      fill: lightgray;
      cursor: pointer;
    }
    .close-btn:hover {
      fill: gray;
    }

    :host(.success) {
      --ki-toast-color: var(--ki-success-color, #1eaf1e);
    }

    :host(.error) {
      --ki-toast-color: var(--ki-error-color, #d30535);
    }

    :host(.warning) {
      --ki-toast-color: var(--ki-warning-color, #fe7402);
    }

    :host(.info) {
      --ki-toast-color: var(--ki-info-color, #3f86cd);
    }
  `;F.types={success:{className:"success",icon:"ki ki-check"},error:{className:"error",icon:"ki ki-exclamation"},warning:{className:"warning",icon:"ki ki-question"},info:{className:"info",icon:"ki ki-info"}};He([p({type:String})],F.prototype,"content",2);He([p({type:String})],F.prototype,"type",2);F=He([A("ki-toast")],F);var mo=Object.defineProperty,vo=Object.getOwnPropertyDescriptor,bo=(s,l,o,t)=>{for(var i=t>1?void 0:t?vo(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&mo(l,o,i),i};let Ie=class extends U(T,[Ce,{nls:Se}]){constructor(){super(),this.content="default content"}static get properties(){return{multiple:{type:Boolean}}}render(){return g``}};Ie.styles=z`
    :host {
      display: block;
    }
  `;Ie=bo([A("ki-accordion")],Ie);document.createElement("canvas");var yo=Object.defineProperty,xo=Object.getOwnPropertyDescriptor,qe=(s,l,o,t)=>{for(var i=t>1?void 0:t?xo(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&yo(l,o,i),i};let ke=class extends U(T,Tl,[Ce,{nls:Se}]){constructor(){super(...arguments),this.title="Title"}static get styles(){return z`
      :host .main-panel {
        display: block;
        position: fixed;
        top: 0;
        left: 0;

        right: 0;
        width: 25vw;
        min-width: 250px;
        height: 100vh;
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
        z-index: 100;
        background-color: white;
      }

      :host([opened]) .main-panel {
        transform: translateX(0);
      }

      :host(.sm-screen) .main-panel {
        width: 100vw;
        height: 70vh;
        bottom: 0;
        top: auto;
        transform: translateY(100%);
      }

      :host(.sm-screen[opened]) .main-panel {
        transform: translateY(0);
      }

      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 99;
        display: none;
      }

      :host([opened]) .overlay {
        display: block;
      }

      :host .drawer-header {
        display: flex;
        flex-direction: row;
        padding: 16px 10px;
        border-bottom: 1px solid lightgray;
      }

      :host .drawer-header .header-title {
        flex: 1;
        color: var(--theme-text-color);
        font-size: 20px;
      }

      :host .drawer-header .close-btn {
        font-size: 14px;
      }
      :host .drawer-header .close-btn:hover {
        cursor: pointer;
      }
    `}render(){return g`
      <div class="overlay" @click="${this.emitCloseEvent}"></div>
      <div class="main-panel">
        <div class="drawer-header">
          <div class="header-title">${this.title}</div>
          <ki-icon
            class="close-btn"
            icon="ki ki-times"
            @click="${this.emitCloseEvent}"
            title="close"
          ></ki-icon>
        </div>
        <slot class="content"></slot>
      </div>
    `}emitCloseEvent(){this.dispatchEvent(new CustomEvent("close",{detail:{opened:!1}}))}};qe([p()],ke.prototype,"title",2);qe([p({type:Boolean})],ke.prototype,"opened",2);ke=qe([A("ki-drawer")],ke);const wo=`:root,:host,.sl-theme-dark{color-scheme:dark;--sl-color-gray-50: hsl(240 5.1% 15%);--sl-color-gray-100: hsl(240 5.7% 18.2%);--sl-color-gray-200: hsl(240 4.6% 22%);--sl-color-gray-300: hsl(240 5% 27.6%);--sl-color-gray-400: hsl(240 5% 35.5%);--sl-color-gray-500: hsl(240 3.7% 44%);--sl-color-gray-600: hsl(240 5.3% 58%);--sl-color-gray-700: hsl(240 5.6% 73%);--sl-color-gray-800: hsl(240 7.3% 84%);--sl-color-gray-900: hsl(240 9.1% 91.8%);--sl-color-gray-950: hsl(0 0% 95%);--sl-color-red-50: hsl(0 56% 23.9%);--sl-color-red-100: hsl(.6 60% 33.9%);--sl-color-red-200: hsl(.9 67.2% 37.1%);--sl-color-red-300: hsl(1.1 71.3% 43.7%);--sl-color-red-400: hsl(1 76% 52.5%);--sl-color-red-500: hsl(.7 89.6% 57.2%);--sl-color-red-600: hsl(0 98.6% 67.9%);--sl-color-red-700: hsl(0 100% 72.3%);--sl-color-red-800: hsl(0 100% 85.6%);--sl-color-red-900: hsl(0 100% 90.3%);--sl-color-red-950: hsl(0 100% 95.9%);--sl-color-orange-50: hsl(15 64.2% 23.3%);--sl-color-orange-100: hsl(15.1 70.9% 31.1%);--sl-color-orange-200: hsl(15.3 75.7% 35.5%);--sl-color-orange-300: hsl(17.1 83.5% 42.7%);--sl-color-orange-400: hsl(20.1 88% 50.8%);--sl-color-orange-500: hsl(24.3 100% 50.5%);--sl-color-orange-600: hsl(27.2 100% 57.7%);--sl-color-orange-700: hsl(31.3 100% 68.7%);--sl-color-orange-800: hsl(33.8 100% 79.3%);--sl-color-orange-900: hsl(38.9 100% 87.7%);--sl-color-orange-950: hsl(46.2 100% 95%);--sl-color-amber-50: hsl(21.9 66.3% 21.1%);--sl-color-amber-100: hsl(21.5 73.6% 29.7%);--sl-color-amber-200: hsl(22.3 77.6% 33.3%);--sl-color-amber-300: hsl(25.4 84.2% 39.6%);--sl-color-amber-400: hsl(31.4 87.4% 46.7%);--sl-color-amber-500: hsl(37 96.6% 48.3%);--sl-color-amber-600: hsl(43.3 100% 53.4%);--sl-color-amber-700: hsl(46.5 100% 61.1%);--sl-color-amber-800: hsl(49.3 100% 73%);--sl-color-amber-900: hsl(51.8 100% 85%);--sl-color-amber-950: hsl(60 100% 94.6%);--sl-color-yellow-50: hsl(32.5 60% 18.2%);--sl-color-yellow-100: hsl(28.1 68.6% 29%);--sl-color-yellow-200: hsl(31.3 75.8% 30.8%);--sl-color-yellow-300: hsl(34.7 84.4% 35.3%);--sl-color-yellow-400: hsl(40.1 87.3% 43.3%);--sl-color-yellow-500: hsl(44.7 88% 46%);--sl-color-yellow-600: hsl(47.7 100% 50.9%);--sl-color-yellow-700: hsl(51.3 100% 59.9%);--sl-color-yellow-800: hsl(54.6 100% 73%);--sl-color-yellow-900: hsl(58.9 100% 84.2%);--sl-color-yellow-950: hsl(60 100% 94%);--sl-color-lime-50: hsl(86.5 54.4% 18%);--sl-color-lime-100: hsl(87.6 56.8% 23.3%);--sl-color-lime-200: hsl(85.8 63.2% 24.5%);--sl-color-lime-300: hsl(86.1 72% 29.4%);--sl-color-lime-400: hsl(85.5 76.8% 37.3%);--sl-color-lime-500: hsl(84.3 74.2% 42.1%);--sl-color-lime-600: hsl(82.8 81.5% 52.6%);--sl-color-lime-700: hsl(82 89.9% 64%);--sl-color-lime-800: hsl(80.9 97.9% 76.6%);--sl-color-lime-900: hsl(77.9 100% 85.8%);--sl-color-lime-950: hsl(69.5 100% 93.8%);--sl-color-green-50: hsl(144.3 53.6% 16%);--sl-color-green-100: hsl(143.2 55.4% 23.5%);--sl-color-green-200: hsl(141.5 58.2% 26.3%);--sl-color-green-300: hsl(140.8 64.2% 31.8%);--sl-color-green-400: hsl(140.3 68% 39.2%);--sl-color-green-500: hsl(141.1 64.9% 43%);--sl-color-green-600: hsl(141.6 72.4% 55.2%);--sl-color-green-700: hsl(141.7 82.7% 70.1%);--sl-color-green-800: hsl(141 90.9% 82.1%);--sl-color-green-900: hsl(142 100% 89.1%);--sl-color-green-950: hsl(144 100% 95.5%);--sl-color-emerald-50: hsl(164.3 75% 13.5%);--sl-color-emerald-100: hsl(163.5 72.6% 20.1%);--sl-color-emerald-200: hsl(162.1 73.7% 22.4%);--sl-color-emerald-300: hsl(161.3 77.3% 27.6%);--sl-color-emerald-400: hsl(159.6 77.1% 34.3%);--sl-color-emerald-500: hsl(159.1 73.5% 37.9%);--sl-color-emerald-600: hsl(157.8 66.8% 48.9%);--sl-color-emerald-700: hsl(156.2 76.1% 63.8%);--sl-color-emerald-800: hsl(152.4 84.4% 77.4%);--sl-color-emerald-900: hsl(149.3 100% 87%);--sl-color-emerald-950: hsl(158.6 100% 94.8%);--sl-color-teal-50: hsl(176.5 51.5% 15.4%);--sl-color-teal-100: hsl(175.9 54.7% 22.3%);--sl-color-teal-200: hsl(175.9 60.7% 23.9%);--sl-color-teal-300: hsl(174.5 67.3% 28.8%);--sl-color-teal-400: hsl(174.4 71.9% 34.9%);--sl-color-teal-500: hsl(173.1 71% 38.3%);--sl-color-teal-600: hsl(172.3 68.2% 48.1%);--sl-color-teal-700: hsl(170.5 81.3% 61.5%);--sl-color-teal-800: hsl(168.4 92.1% 75.2%);--sl-color-teal-900: hsl(168.3 100% 86%);--sl-color-teal-950: hsl(180 100% 95.5%);--sl-color-cyan-50: hsl(197.1 53.8% 20.3%);--sl-color-cyan-100: hsl(196.8 57.3% 27.2%);--sl-color-cyan-200: hsl(195.3 62.7% 29.4%);--sl-color-cyan-300: hsl(193.5 71.3% 34.1%);--sl-color-cyan-400: hsl(192.5 76.8% 40.6%);--sl-color-cyan-500: hsl(189.4 78.6% 42.6%);--sl-color-cyan-600: hsl(188.2 89.1% 51.7%);--sl-color-cyan-700: hsl(187 98.6% 66.2%);--sl-color-cyan-800: hsl(184.9 100% 78.3%);--sl-color-cyan-900: hsl(180 100% 86.6%);--sl-color-cyan-950: hsl(180 100% 94.8%);--sl-color-sky-50: hsl(203 63.8% 20.9%);--sl-color-sky-100: hsl(203.4 70.4% 28%);--sl-color-sky-200: hsl(202.7 75.8% 30.8%);--sl-color-sky-300: hsl(203.1 80.4% 36.1%);--sl-color-sky-400: hsl(202.1 80.5% 44.3%);--sl-color-sky-500: hsl(199.7 85.9% 47.7%);--sl-color-sky-600: hsl(198.7 97.9% 57.2%);--sl-color-sky-700: hsl(198.7 100% 70.5%);--sl-color-sky-800: hsl(198.8 100% 82.5%);--sl-color-sky-900: hsl(198.5 100% 89.9%);--sl-color-sky-950: hsl(186 100% 95.5%);--sl-color-blue-50: hsl(227.1 49.5% 22.7%);--sl-color-blue-100: hsl(225.8 58.9% 36.8%);--sl-color-blue-200: hsl(227.7 64.4% 42.9%);--sl-color-blue-300: hsl(226.1 72.7% 51.2%);--sl-color-blue-400: hsl(222.6 86.5% 56.3%);--sl-color-blue-500: hsl(217.8 95.8% 57.4%);--sl-color-blue-600: hsl(213.3 100% 65%);--sl-color-blue-700: hsl(210.9 100% 74.8%);--sl-color-blue-800: hsl(211.5 100% 83.4%);--sl-color-blue-900: hsl(211 100% 88.9%);--sl-color-blue-950: hsl(201.8 100% 95.3%);--sl-color-indigo-50: hsl(243.5 40.8% 27%);--sl-color-indigo-100: hsl(242.9 45.7% 37.6%);--sl-color-indigo-200: hsl(244.7 52.7% 43.1%);--sl-color-indigo-300: hsl(245.3 60.5% 52.4%);--sl-color-indigo-400: hsl(244.1 79.2% 60.4%);--sl-color-indigo-500: hsl(239.6 88.7% 63.8%);--sl-color-indigo-600: hsl(234.5 96.7% 70.9%);--sl-color-indigo-700: hsl(229.4 100% 78.3%);--sl-color-indigo-800: hsl(227.1 100% 85%);--sl-color-indigo-900: hsl(223.8 100% 89.9%);--sl-color-indigo-950: hsl(220 100% 95.1%);--sl-color-violet-50: hsl(265.1 57.3% 25.4%);--sl-color-violet-100: hsl(263.5 63.8% 39.4%);--sl-color-violet-200: hsl(263.4 66.2% 44.1%);--sl-color-violet-300: hsl(263.7 72.8% 52.4%);--sl-color-violet-400: hsl(262.5 87.3% 59.8%);--sl-color-violet-500: hsl(258.3 95.1% 63.2%);--sl-color-violet-600: hsl(255.1 100% 67.2%);--sl-color-violet-700: hsl(253 100% 81.5%);--sl-color-violet-800: hsl(251.7 100% 87.9%);--sl-color-violet-900: hsl(254.1 100% 91.7%);--sl-color-violet-950: hsl(257.1 100% 96.1%);--sl-color-purple-50: hsl(276 54.3% 20.5%);--sl-color-purple-100: hsl(273.6 61.8% 35.4%);--sl-color-purple-200: hsl(272.9 64% 41.4%);--sl-color-purple-300: hsl(271.9 68.1% 49.2%);--sl-color-purple-400: hsl(271.5 85.1% 57.8%);--sl-color-purple-500: hsl(270.7 96.4% 62.1%);--sl-color-purple-600: hsl(270.5 100% 71.9%);--sl-color-purple-700: hsl(270.9 100% 81.3%);--sl-color-purple-800: hsl(272.4 100% 87.7%);--sl-color-purple-900: hsl(276.7 100% 91.5%);--sl-color-purple-950: hsl(300 100% 96.5%);--sl-color-fuchsia-50: hsl(297.1 51.2% 18.6%);--sl-color-fuchsia-100: hsl(296.7 59.5% 31.5%);--sl-color-fuchsia-200: hsl(295.4 65.4% 35.1%);--sl-color-fuchsia-300: hsl(294.6 67.4% 42.2%);--sl-color-fuchsia-400: hsl(293.3 68.7% 51.2%);--sl-color-fuchsia-500: hsl(292.1 88.4% 57.7%);--sl-color-fuchsia-600: hsl(292 98.5% 59.5%);--sl-color-fuchsia-700: hsl(292.4 100% 79.5%);--sl-color-fuchsia-800: hsl(292.9 100% 86.8%);--sl-color-fuchsia-900: hsl(300 100% 91.5%);--sl-color-fuchsia-950: hsl(300 100% 96.3%);--sl-color-pink-50: hsl(336.2 59.6% 20%);--sl-color-pink-100: hsl(336.8 63.9% 34%);--sl-color-pink-200: hsl(336.8 68.7% 37.6%);--sl-color-pink-300: hsl(336.1 71.8% 44.5%);--sl-color-pink-400: hsl(333.9 74.9% 53.1%);--sl-color-pink-500: hsl(330.7 86.3% 57.7%);--sl-color-pink-600: hsl(328.6 91.5% 67.2%);--sl-color-pink-700: hsl(327.4 97.6% 78.7%);--sl-color-pink-800: hsl(325.1 100% 86.6%);--sl-color-pink-900: hsl(322.1 100% 91.3%);--sl-color-pink-950: hsl(315 100% 95.9%);--sl-color-rose-50: hsl(342.3 62.9% 21.5%);--sl-color-rose-100: hsl(342.8 68.9% 34.2%);--sl-color-rose-200: hsl(344.8 72.6% 37.3%);--sl-color-rose-300: hsl(346.9 75.8% 43.7%);--sl-color-rose-400: hsl(348.2 80.1% 52.7%);--sl-color-rose-500: hsl(350.4 94.8% 57.5%);--sl-color-rose-600: hsl(351.2 100% 58.1%);--sl-color-rose-700: hsl(352.3 100% 78.1%);--sl-color-rose-800: hsl(352 100% 86.2%);--sl-color-rose-900: hsl(354.5 100% 90.7%);--sl-color-rose-950: hsl(353.3 100% 95.7%);--sl-color-primary-50: var(--sl-color-sky-50);--sl-color-primary-100: var(--sl-color-sky-100);--sl-color-primary-200: var(--sl-color-sky-200);--sl-color-primary-300: var(--sl-color-sky-300);--sl-color-primary-400: var(--sl-color-sky-400);--sl-color-primary-500: var(--sl-color-sky-500);--sl-color-primary-600: var(--sl-color-sky-600);--sl-color-primary-700: var(--sl-color-sky-700);--sl-color-primary-800: var(--sl-color-sky-800);--sl-color-primary-900: var(--sl-color-sky-900);--sl-color-primary-950: var(--sl-color-sky-950);--sl-color-success-50: var(--sl-color-green-50);--sl-color-success-100: var(--sl-color-green-100);--sl-color-success-200: var(--sl-color-green-200);--sl-color-success-300: var(--sl-color-green-300);--sl-color-success-400: var(--sl-color-green-400);--sl-color-success-500: var(--sl-color-green-500);--sl-color-success-600: var(--sl-color-green-600);--sl-color-success-700: var(--sl-color-green-700);--sl-color-success-800: var(--sl-color-green-800);--sl-color-success-900: var(--sl-color-green-900);--sl-color-success-950: var(--sl-color-green-950);--sl-color-warning-50: var(--sl-color-amber-50);--sl-color-warning-100: var(--sl-color-amber-100);--sl-color-warning-200: var(--sl-color-amber-200);--sl-color-warning-300: var(--sl-color-amber-300);--sl-color-warning-400: var(--sl-color-amber-400);--sl-color-warning-500: var(--sl-color-amber-500);--sl-color-warning-600: var(--sl-color-amber-600);--sl-color-warning-700: var(--sl-color-amber-700);--sl-color-warning-800: var(--sl-color-amber-800);--sl-color-warning-900: var(--sl-color-amber-900);--sl-color-warning-950: var(--sl-color-amber-950);--sl-color-danger-50: var(--sl-color-red-50);--sl-color-danger-100: var(--sl-color-red-100);--sl-color-danger-200: var(--sl-color-red-200);--sl-color-danger-300: var(--sl-color-red-300);--sl-color-danger-400: var(--sl-color-red-400);--sl-color-danger-500: var(--sl-color-red-500);--sl-color-danger-600: var(--sl-color-red-600);--sl-color-danger-700: var(--sl-color-red-700);--sl-color-danger-800: var(--sl-color-red-800);--sl-color-danger-900: var(--sl-color-red-900);--sl-color-danger-950: var(--sl-color-red-950);--sl-color-neutral-50: var(--sl-color-gray-50);--sl-color-neutral-100: var(--sl-color-gray-100);--sl-color-neutral-200: var(--sl-color-gray-200);--sl-color-neutral-300: var(--sl-color-gray-300);--sl-color-neutral-400: var(--sl-color-gray-400);--sl-color-neutral-500: var(--sl-color-gray-500);--sl-color-neutral-600: var(--sl-color-gray-600);--sl-color-neutral-700: var(--sl-color-gray-700);--sl-color-neutral-800: var(--sl-color-gray-800);--sl-color-neutral-900: var(--sl-color-gray-900);--sl-color-neutral-950: var(--sl-color-gray-950);--sl-color-neutral-0: hsl(240, 5.9%, 11%);--sl-color-neutral-1000: hsl(0, 0%, 100%);--sl-border-radius-small: .1875rem;--sl-border-radius-medium: .25rem;--sl-border-radius-large: .5rem;--sl-border-radius-x-large: 1rem;--sl-border-radius-circle: 50%;--sl-border-radius-pill: 9999px;--sl-shadow-x-small: 0 1px 2px rgb(0 0 0 / 18%);--sl-shadow-small: 0 1px 2px rgb(0 0 0 / 24%);--sl-shadow-medium: 0 2px 4px rgb(0 0 0 / 24%);--sl-shadow-large: 0 2px 8px rgb(0 0 0 / 24%);--sl-shadow-x-large: 0 4px 16px rgb(0 0 0 / 24%);--sl-spacing-3x-small: .125rem;--sl-spacing-2x-small: .25rem;--sl-spacing-x-small: .5rem;--sl-spacing-small: .75rem;--sl-spacing-medium: 1rem;--sl-spacing-large: 1.25rem;--sl-spacing-x-large: 1.75rem;--sl-spacing-2x-large: 2.25rem;--sl-spacing-3x-large: 3rem;--sl-spacing-4x-large: 4.5rem;--sl-transition-x-slow: 1s;--sl-transition-slow: .5s;--sl-transition-medium: .25s;--sl-transition-fast: .15s;--sl-transition-x-fast: 50ms;--sl-font-mono: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;--sl-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--sl-font-serif: Georgia, "Times New Roman", serif;--sl-font-size-2x-small: .625rem;--sl-font-size-x-small: .75rem;--sl-font-size-small: .875rem;--sl-font-size-medium: 1rem;--sl-font-size-large: 1.25rem;--sl-font-size-x-large: 1.5rem;--sl-font-size-2x-large: 2.25rem;--sl-font-size-3x-large: 3rem;--sl-font-size-4x-large: 4.5rem;--sl-font-weight-light: 300;--sl-font-weight-normal: 400;--sl-font-weight-semibold: 500;--sl-font-weight-bold: 700;--sl-letter-spacing-denser: -.03em;--sl-letter-spacing-dense: -.015em;--sl-letter-spacing-normal: normal;--sl-letter-spacing-loose: .075em;--sl-letter-spacing-looser: .15em;--sl-line-height-denser: 1;--sl-line-height-dense: 1.4;--sl-line-height-normal: 1.8;--sl-line-height-loose: 2.2;--sl-line-height-looser: 2.6;--sl-focus-ring-color: var(--sl-color-primary-700);--sl-focus-ring-style: solid;--sl-focus-ring-width: 3px;--sl-focus-ring: var(--sl-focus-ring-style) var(--sl-focus-ring-width) var(--sl-focus-ring-color);--sl-focus-ring-offset: 1px;--sl-button-font-size-small: var(--sl-font-size-x-small);--sl-button-font-size-medium: var(--sl-font-size-small);--sl-button-font-size-large: var(--sl-font-size-medium);--sl-input-height-small: 1.875rem;--sl-input-height-medium: 2.5rem;--sl-input-height-large: 3.125rem;--sl-input-background-color: var(--sl-color-neutral-0);--sl-input-background-color-hover: var(--sl-input-background-color);--sl-input-background-color-focus: var(--sl-input-background-color);--sl-input-background-color-disabled: var(--sl-color-neutral-100);--sl-input-border-color: var(--sl-color-neutral-300);--sl-input-border-color-hover: var(--sl-color-neutral-400);--sl-input-border-color-focus: var(--sl-color-primary-500);--sl-input-border-color-disabled: var(--sl-color-neutral-300);--sl-input-border-width: 1px;--sl-input-required-content: "*";--sl-input-required-content-offset: -2px;--sl-input-border-radius-small: var(--sl-border-radius-medium);--sl-input-border-radius-medium: var(--sl-border-radius-medium);--sl-input-border-radius-large: var(--sl-border-radius-medium);--sl-input-font-family: var(--sl-font-sans);--sl-input-font-weight: var(--sl-font-weight-normal);--sl-input-font-size-small: var(--sl-font-size-small);--sl-input-font-size-medium: var(--sl-font-size-medium);--sl-input-font-size-large: var(--sl-font-size-large);--sl-input-letter-spacing: var(--sl-letter-spacing-normal);--sl-input-color: var(--sl-color-neutral-700);--sl-input-color-hover: var(--sl-color-neutral-700);--sl-input-color-focus: var(--sl-color-neutral-700);--sl-input-color-disabled: var(--sl-color-neutral-900);--sl-input-icon-color: var(--sl-color-neutral-500);--sl-input-icon-color-hover: var(--sl-color-neutral-600);--sl-input-icon-color-focus: var(--sl-color-neutral-600);--sl-input-placeholder-color: var(--sl-color-neutral-500);--sl-input-placeholder-color-disabled: var(--sl-color-neutral-600);--sl-input-spacing-small: var(--sl-spacing-small);--sl-input-spacing-medium: var(--sl-spacing-medium);--sl-input-spacing-large: var(--sl-spacing-large);--sl-input-filled-background-color: var(--sl-color-neutral-100);--sl-input-filled-background-color-hover: var(--sl-color-neutral-100);--sl-input-filled-background-color-focus: var(--sl-color-neutral-100);--sl-input-filled-background-color-disabled: var(--sl-color-neutral-100);--sl-input-filled-color: var(--sl-color-neutral-800);--sl-input-filled-color-hover: var(--sl-color-neutral-800);--sl-input-filled-color-focus: var(--sl-color-neutral-700);--sl-input-filled-color-disabled: var(--sl-color-neutral-800);--sl-input-focus-ring-color: hsl(198.6 88.7% 48.4% / 40%);--sl-input-focus-ring-offset: 0;--sl-input-label-font-size-small: var(--sl-font-size-small);--sl-input-label-font-size-medium: var(--sl-font-size-medium);--sl-input-label-font-size-large: var(--sl-font-size-large);--sl-input-label-color: inherit;--sl-input-help-text-font-size-small: var(--sl-font-size-x-small);--sl-input-help-text-font-size-medium: var(--sl-font-size-small);--sl-input-help-text-font-size-large: var(--sl-font-size-medium);--sl-input-help-text-color: var(--sl-color-neutral-500);--sl-toggle-size: 1rem;--sl-overlay-background-color: hsl(0 0% 0% / 43%);--sl-panel-background-color: var(--sl-color-neutral-50);--sl-panel-border-color: var(--sl-color-neutral-200);--sl-panel-border-width: 1px;--sl-tooltip-border-radius: var(--sl-border-radius-medium);--sl-tooltip-background-color: var(--sl-color-neutral-800);--sl-tooltip-color: var(--sl-color-neutral-0);--sl-tooltip-font-family: var(--sl-font-sans);--sl-tooltip-font-weight: var(--sl-font-weight-normal);--sl-tooltip-font-size: var(--sl-font-size-small);--sl-tooltip-line-height: var(--sl-line-height-dense);--sl-tooltip-padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-small);--sl-tooltip-arrow-size: 4px;--sl-z-index-drawer: 700;--sl-z-index-dialog: 800;--sl-z-index-dropdown: 900;--sl-z-index-toast: 950;--sl-z-index-tooltip: 1000}.sl-scroll-lock{overflow:hidden!important}.sl-toast-stack{position:fixed;top:0;inset-inline-end:0;z-index:var(--sl-z-index-toast);width:28rem;max-width:100%;max-height:100%;overflow:auto}.sl-toast-stack sl-alert{--box-shadow: var(--sl-shadow-large);margin:var(--sl-spacing-medium)}
`,$o=`:root,:host,.sl-theme-light{color-scheme:light;--sl-color-gray-50: hsl(0 0% 97.5%);--sl-color-gray-100: hsl(240 4.8% 95.9%);--sl-color-gray-200: hsl(240 5.9% 90%);--sl-color-gray-300: hsl(240 4.9% 83.9%);--sl-color-gray-400: hsl(240 5% 64.9%);--sl-color-gray-500: hsl(240 3.8% 46.1%);--sl-color-gray-600: hsl(240 5.2% 33.9%);--sl-color-gray-700: hsl(240 5.3% 26.1%);--sl-color-gray-800: hsl(240 3.7% 15.9%);--sl-color-gray-900: hsl(240 5.9% 10%);--sl-color-gray-950: hsl(240 7.3% 8%);--sl-color-red-50: hsl(0 85.7% 97.3%);--sl-color-red-100: hsl(0 93.3% 94.1%);--sl-color-red-200: hsl(0 96.3% 89.4%);--sl-color-red-300: hsl(0 93.5% 81.8%);--sl-color-red-400: hsl(0 90.6% 70.8%);--sl-color-red-500: hsl(0 84.2% 60.2%);--sl-color-red-600: hsl(0 72.2% 50.6%);--sl-color-red-700: hsl(0 73.7% 41.8%);--sl-color-red-800: hsl(0 70% 35.3%);--sl-color-red-900: hsl(0 62.8% 30.6%);--sl-color-red-950: hsl(0 60% 19.6%);--sl-color-orange-50: hsl(33.3 100% 96.5%);--sl-color-orange-100: hsl(34.3 100% 91.8%);--sl-color-orange-200: hsl(32.1 97.7% 83.1%);--sl-color-orange-300: hsl(30.7 97.2% 72.4%);--sl-color-orange-400: hsl(27 96% 61%);--sl-color-orange-500: hsl(24.6 95% 53.1%);--sl-color-orange-600: hsl(20.5 90.2% 48.2%);--sl-color-orange-700: hsl(17.5 88.3% 40.4%);--sl-color-orange-800: hsl(15 79.1% 33.7%);--sl-color-orange-900: hsl(15.3 74.6% 27.8%);--sl-color-orange-950: hsl(15.2 69.1% 19%);--sl-color-amber-50: hsl(48 100% 96.1%);--sl-color-amber-100: hsl(48 96.5% 88.8%);--sl-color-amber-200: hsl(48 96.6% 76.7%);--sl-color-amber-300: hsl(45.9 96.7% 64.5%);--sl-color-amber-400: hsl(43.3 96.4% 56.3%);--sl-color-amber-500: hsl(37.7 92.1% 50.2%);--sl-color-amber-600: hsl(32.1 94.6% 43.7%);--sl-color-amber-700: hsl(26 90.5% 37.1%);--sl-color-amber-800: hsl(22.7 82.5% 31.4%);--sl-color-amber-900: hsl(21.7 77.8% 26.5%);--sl-color-amber-950: hsl(22.9 74.1% 16.7%);--sl-color-yellow-50: hsl(54.5 91.7% 95.3%);--sl-color-yellow-100: hsl(54.9 96.7% 88%);--sl-color-yellow-200: hsl(52.8 98.3% 76.9%);--sl-color-yellow-300: hsl(50.4 97.8% 63.5%);--sl-color-yellow-400: hsl(47.9 95.8% 53.1%);--sl-color-yellow-500: hsl(45.4 93.4% 47.5%);--sl-color-yellow-600: hsl(40.6 96.1% 40.4%);--sl-color-yellow-700: hsl(35.5 91.7% 32.9%);--sl-color-yellow-800: hsl(31.8 81% 28.8%);--sl-color-yellow-900: hsl(28.4 72.5% 25.7%);--sl-color-yellow-950: hsl(33.1 69% 13.9%);--sl-color-lime-50: hsl(78.3 92% 95.1%);--sl-color-lime-100: hsl(79.6 89.1% 89.2%);--sl-color-lime-200: hsl(80.9 88.5% 79.6%);--sl-color-lime-300: hsl(82 84.5% 67.1%);--sl-color-lime-400: hsl(82.7 78% 55.5%);--sl-color-lime-500: hsl(83.7 80.5% 44.3%);--sl-color-lime-600: hsl(84.8 85.2% 34.5%);--sl-color-lime-700: hsl(85.9 78.4% 27.3%);--sl-color-lime-800: hsl(86.3 69% 22.7%);--sl-color-lime-900: hsl(87.6 61.2% 20.2%);--sl-color-lime-950: hsl(86.5 60.6% 13.9%);--sl-color-green-50: hsl(138.5 76.5% 96.7%);--sl-color-green-100: hsl(140.6 84.2% 92.5%);--sl-color-green-200: hsl(141 78.9% 85.1%);--sl-color-green-300: hsl(141.7 76.6% 73.1%);--sl-color-green-400: hsl(141.9 69.2% 58%);--sl-color-green-500: hsl(142.1 70.6% 45.3%);--sl-color-green-600: hsl(142.1 76.2% 36.3%);--sl-color-green-700: hsl(142.4 71.8% 29.2%);--sl-color-green-800: hsl(142.8 64.2% 24.1%);--sl-color-green-900: hsl(143.8 61.2% 20.2%);--sl-color-green-950: hsl(144.3 60.7% 12%);--sl-color-emerald-50: hsl(151.8 81% 95.9%);--sl-color-emerald-100: hsl(149.3 80.4% 90%);--sl-color-emerald-200: hsl(152.4 76% 80.4%);--sl-color-emerald-300: hsl(156.2 71.6% 66.9%);--sl-color-emerald-400: hsl(158.1 64.4% 51.6%);--sl-color-emerald-500: hsl(160.1 84.1% 39.4%);--sl-color-emerald-600: hsl(161.4 93.5% 30.4%);--sl-color-emerald-700: hsl(162.9 93.5% 24.3%);--sl-color-emerald-800: hsl(163.1 88.1% 19.8%);--sl-color-emerald-900: hsl(164.2 85.7% 16.5%);--sl-color-emerald-950: hsl(164.3 87.5% 9.4%);--sl-color-teal-50: hsl(166.2 76.5% 96.7%);--sl-color-teal-100: hsl(167.2 85.5% 89.2%);--sl-color-teal-200: hsl(168.4 83.8% 78.2%);--sl-color-teal-300: hsl(170.6 76.9% 64.3%);--sl-color-teal-400: hsl(172.5 66% 50.4%);--sl-color-teal-500: hsl(173.4 80.4% 40%);--sl-color-teal-600: hsl(174.7 83.9% 31.6%);--sl-color-teal-700: hsl(175.3 77.4% 26.1%);--sl-color-teal-800: hsl(176.1 69.4% 21.8%);--sl-color-teal-900: hsl(175.9 60.8% 19%);--sl-color-teal-950: hsl(176.5 58.6% 11.4%);--sl-color-cyan-50: hsl(183.2 100% 96.3%);--sl-color-cyan-100: hsl(185.1 95.9% 90.4%);--sl-color-cyan-200: hsl(186.2 93.5% 81.8%);--sl-color-cyan-300: hsl(187 92.4% 69%);--sl-color-cyan-400: hsl(187.9 85.7% 53.3%);--sl-color-cyan-500: hsl(188.7 94.5% 42.7%);--sl-color-cyan-600: hsl(191.6 91.4% 36.5%);--sl-color-cyan-700: hsl(192.9 82.3% 31%);--sl-color-cyan-800: hsl(194.4 69.6% 27.1%);--sl-color-cyan-900: hsl(196.4 63.6% 23.7%);--sl-color-cyan-950: hsl(196.8 61% 16.1%);--sl-color-sky-50: hsl(204 100% 97.1%);--sl-color-sky-100: hsl(204 93.8% 93.7%);--sl-color-sky-200: hsl(200.6 94.4% 86.1%);--sl-color-sky-300: hsl(199.4 95.5% 73.9%);--sl-color-sky-400: hsl(198.4 93.2% 59.6%);--sl-color-sky-500: hsl(198.6 88.7% 48.4%);--sl-color-sky-600: hsl(200.4 98% 39.4%);--sl-color-sky-700: hsl(201.3 96.3% 32.2%);--sl-color-sky-800: hsl(201 90% 27.5%);--sl-color-sky-900: hsl(202 80.3% 23.9%);--sl-color-sky-950: hsl(202.3 73.8% 16.5%);--sl-color-blue-50: hsl(213.8 100% 96.9%);--sl-color-blue-100: hsl(214.3 94.6% 92.7%);--sl-color-blue-200: hsl(213.3 96.9% 87.3%);--sl-color-blue-300: hsl(211.7 96.4% 78.4%);--sl-color-blue-400: hsl(213.1 93.9% 67.8%);--sl-color-blue-500: hsl(217.2 91.2% 59.8%);--sl-color-blue-600: hsl(221.2 83.2% 53.3%);--sl-color-blue-700: hsl(224.3 76.3% 48%);--sl-color-blue-800: hsl(225.9 70.7% 40.2%);--sl-color-blue-900: hsl(224.4 64.3% 32.9%);--sl-color-blue-950: hsl(226.2 55.3% 18.4%);--sl-color-indigo-50: hsl(225.9 100% 96.7%);--sl-color-indigo-100: hsl(226.5 100% 93.9%);--sl-color-indigo-200: hsl(228 96.5% 88.8%);--sl-color-indigo-300: hsl(229.7 93.5% 81.8%);--sl-color-indigo-400: hsl(234.5 89.5% 73.9%);--sl-color-indigo-500: hsl(238.7 83.5% 66.7%);--sl-color-indigo-600: hsl(243.4 75.4% 58.6%);--sl-color-indigo-700: hsl(244.5 57.9% 50.6%);--sl-color-indigo-800: hsl(243.7 54.5% 41.4%);--sl-color-indigo-900: hsl(242.2 47.4% 34.3%);--sl-color-indigo-950: hsl(243.5 43.6% 22.9%);--sl-color-violet-50: hsl(250 100% 97.6%);--sl-color-violet-100: hsl(251.4 91.3% 95.5%);--sl-color-violet-200: hsl(250.5 95.2% 91.8%);--sl-color-violet-300: hsl(252.5 94.7% 85.1%);--sl-color-violet-400: hsl(255.1 91.7% 76.3%);--sl-color-violet-500: hsl(258.3 89.5% 66.3%);--sl-color-violet-600: hsl(262.1 83.3% 57.8%);--sl-color-violet-700: hsl(263.4 70% 50.4%);--sl-color-violet-800: hsl(263.4 69.3% 42.2%);--sl-color-violet-900: hsl(263.5 67.4% 34.9%);--sl-color-violet-950: hsl(265.1 61.5% 21.4%);--sl-color-purple-50: hsl(270 100% 98%);--sl-color-purple-100: hsl(268.7 100% 95.5%);--sl-color-purple-200: hsl(268.6 100% 91.8%);--sl-color-purple-300: hsl(269.2 97.4% 85.1%);--sl-color-purple-400: hsl(270 95.2% 75.3%);--sl-color-purple-500: hsl(270.7 91% 65.1%);--sl-color-purple-600: hsl(271.5 81.3% 55.9%);--sl-color-purple-700: hsl(272.1 71.7% 47.1%);--sl-color-purple-800: hsl(272.9 67.2% 39.4%);--sl-color-purple-900: hsl(273.6 65.6% 32%);--sl-color-purple-950: hsl(276 59.5% 16.5%);--sl-color-fuchsia-50: hsl(289.1 100% 97.8%);--sl-color-fuchsia-100: hsl(287 100% 95.5%);--sl-color-fuchsia-200: hsl(288.3 95.8% 90.6%);--sl-color-fuchsia-300: hsl(291.1 93.1% 82.9%);--sl-color-fuchsia-400: hsl(292 91.4% 72.5%);--sl-color-fuchsia-500: hsl(292.2 84.1% 60.6%);--sl-color-fuchsia-600: hsl(293.4 69.5% 48.8%);--sl-color-fuchsia-700: hsl(294.7 72.4% 39.8%);--sl-color-fuchsia-800: hsl(295.4 70.2% 32.9%);--sl-color-fuchsia-900: hsl(296.7 63.6% 28%);--sl-color-fuchsia-950: hsl(297.1 56.8% 14.5%);--sl-color-pink-50: hsl(327.3 73.3% 97.1%);--sl-color-pink-100: hsl(325.7 77.8% 94.7%);--sl-color-pink-200: hsl(325.9 84.6% 89.8%);--sl-color-pink-300: hsl(327.4 87.1% 81.8%);--sl-color-pink-400: hsl(328.6 85.5% 70.2%);--sl-color-pink-500: hsl(330.4 81.2% 60.4%);--sl-color-pink-600: hsl(333.3 71.4% 50.6%);--sl-color-pink-700: hsl(335.1 77.6% 42%);--sl-color-pink-800: hsl(335.8 74.4% 35.3%);--sl-color-pink-900: hsl(335.9 69% 30.4%);--sl-color-pink-950: hsl(336.2 65.4% 15.9%);--sl-color-rose-50: hsl(355.7 100% 97.3%);--sl-color-rose-100: hsl(355.6 100% 94.7%);--sl-color-rose-200: hsl(352.7 96.1% 90%);--sl-color-rose-300: hsl(352.6 95.7% 81.8%);--sl-color-rose-400: hsl(351.3 94.5% 71.4%);--sl-color-rose-500: hsl(349.7 89.2% 60.2%);--sl-color-rose-600: hsl(346.8 77.2% 49.8%);--sl-color-rose-700: hsl(345.3 82.7% 40.8%);--sl-color-rose-800: hsl(343.4 79.7% 34.7%);--sl-color-rose-900: hsl(341.5 75.5% 30.4%);--sl-color-rose-950: hsl(341.3 70.1% 17.1%);--sl-color-primary-50: var(--sl-color-sky-50);--sl-color-primary-100: var(--sl-color-sky-100);--sl-color-primary-200: var(--sl-color-sky-200);--sl-color-primary-300: var(--sl-color-sky-300);--sl-color-primary-400: var(--sl-color-sky-400);--sl-color-primary-500: var(--sl-color-sky-500);--sl-color-primary-600: var(--sl-color-sky-600);--sl-color-primary-700: var(--sl-color-sky-700);--sl-color-primary-800: var(--sl-color-sky-800);--sl-color-primary-900: var(--sl-color-sky-900);--sl-color-primary-950: var(--sl-color-sky-950);--sl-color-success-50: var(--sl-color-green-50);--sl-color-success-100: var(--sl-color-green-100);--sl-color-success-200: var(--sl-color-green-200);--sl-color-success-300: var(--sl-color-green-300);--sl-color-success-400: var(--sl-color-green-400);--sl-color-success-500: var(--sl-color-green-500);--sl-color-success-600: var(--sl-color-green-600);--sl-color-success-700: var(--sl-color-green-700);--sl-color-success-800: var(--sl-color-green-800);--sl-color-success-900: var(--sl-color-green-900);--sl-color-success-950: var(--sl-color-green-950);--sl-color-warning-50: var(--sl-color-amber-50);--sl-color-warning-100: var(--sl-color-amber-100);--sl-color-warning-200: var(--sl-color-amber-200);--sl-color-warning-300: var(--sl-color-amber-300);--sl-color-warning-400: var(--sl-color-amber-400);--sl-color-warning-500: var(--sl-color-amber-500);--sl-color-warning-600: var(--sl-color-amber-600);--sl-color-warning-700: var(--sl-color-amber-700);--sl-color-warning-800: var(--sl-color-amber-800);--sl-color-warning-900: var(--sl-color-amber-900);--sl-color-warning-950: var(--sl-color-amber-950);--sl-color-danger-50: var(--sl-color-red-50);--sl-color-danger-100: var(--sl-color-red-100);--sl-color-danger-200: var(--sl-color-red-200);--sl-color-danger-300: var(--sl-color-red-300);--sl-color-danger-400: var(--sl-color-red-400);--sl-color-danger-500: var(--sl-color-red-500);--sl-color-danger-600: var(--sl-color-red-600);--sl-color-danger-700: var(--sl-color-red-700);--sl-color-danger-800: var(--sl-color-red-800);--sl-color-danger-900: var(--sl-color-red-900);--sl-color-danger-950: var(--sl-color-red-950);--sl-color-neutral-50: var(--sl-color-gray-50);--sl-color-neutral-100: var(--sl-color-gray-100);--sl-color-neutral-200: var(--sl-color-gray-200);--sl-color-neutral-300: var(--sl-color-gray-300);--sl-color-neutral-400: var(--sl-color-gray-400);--sl-color-neutral-500: var(--sl-color-gray-500);--sl-color-neutral-600: var(--sl-color-gray-600);--sl-color-neutral-700: var(--sl-color-gray-700);--sl-color-neutral-800: var(--sl-color-gray-800);--sl-color-neutral-900: var(--sl-color-gray-900);--sl-color-neutral-950: var(--sl-color-gray-950);--sl-color-neutral-0: hsl(0, 0%, 100%);--sl-color-neutral-1000: hsl(0, 0%, 0%);--sl-border-radius-small: .1875rem;--sl-border-radius-medium: .25rem;--sl-border-radius-large: .5rem;--sl-border-radius-x-large: 1rem;--sl-border-radius-circle: 50%;--sl-border-radius-pill: 9999px;--sl-shadow-x-small: 0 1px 2px hsl(240 3.8% 46.1% / 6%);--sl-shadow-small: 0 1px 2px hsl(240 3.8% 46.1% / 12%);--sl-shadow-medium: 0 2px 4px hsl(240 3.8% 46.1% / 12%);--sl-shadow-large: 0 2px 8px hsl(240 3.8% 46.1% / 12%);--sl-shadow-x-large: 0 4px 16px hsl(240 3.8% 46.1% / 12%);--sl-spacing-3x-small: .125rem;--sl-spacing-2x-small: .25rem;--sl-spacing-x-small: .5rem;--sl-spacing-small: .75rem;--sl-spacing-medium: 1rem;--sl-spacing-large: 1.25rem;--sl-spacing-x-large: 1.75rem;--sl-spacing-2x-large: 2.25rem;--sl-spacing-3x-large: 3rem;--sl-spacing-4x-large: 4.5rem;--sl-transition-x-slow: 1s;--sl-transition-slow: .5s;--sl-transition-medium: .25s;--sl-transition-fast: .15s;--sl-transition-x-fast: 50ms;--sl-font-mono: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;--sl-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";--sl-font-serif: Georgia, "Times New Roman", serif;--sl-font-size-2x-small: .625rem;--sl-font-size-x-small: .75rem;--sl-font-size-small: .875rem;--sl-font-size-medium: 1rem;--sl-font-size-large: 1.25rem;--sl-font-size-x-large: 1.5rem;--sl-font-size-2x-large: 2.25rem;--sl-font-size-3x-large: 3rem;--sl-font-size-4x-large: 4.5rem;--sl-font-weight-light: 300;--sl-font-weight-normal: 400;--sl-font-weight-semibold: 500;--sl-font-weight-bold: 700;--sl-letter-spacing-denser: -.03em;--sl-letter-spacing-dense: -.015em;--sl-letter-spacing-normal: normal;--sl-letter-spacing-loose: .075em;--sl-letter-spacing-looser: .15em;--sl-line-height-denser: 1;--sl-line-height-dense: 1.4;--sl-line-height-normal: 1.8;--sl-line-height-loose: 2.2;--sl-line-height-looser: 2.6;--sl-focus-ring-color: var(--sl-color-primary-600);--sl-focus-ring-style: solid;--sl-focus-ring-width: 3px;--sl-focus-ring: var(--sl-focus-ring-style) var(--sl-focus-ring-width) var(--sl-focus-ring-color);--sl-focus-ring-offset: 1px;--sl-button-font-size-small: var(--sl-font-size-x-small);--sl-button-font-size-medium: var(--sl-font-size-small);--sl-button-font-size-large: var(--sl-font-size-medium);--sl-input-height-small: 1.875rem;--sl-input-height-medium: 2.5rem;--sl-input-height-large: 3.125rem;--sl-input-background-color: var(--sl-color-neutral-0);--sl-input-background-color-hover: var(--sl-input-background-color);--sl-input-background-color-focus: var(--sl-input-background-color);--sl-input-background-color-disabled: var(--sl-color-neutral-100);--sl-input-border-color: var(--sl-color-neutral-300);--sl-input-border-color-hover: var(--sl-color-neutral-400);--sl-input-border-color-focus: var(--sl-color-primary-500);--sl-input-border-color-disabled: var(--sl-color-neutral-300);--sl-input-border-width: 1px;--sl-input-required-content: "*";--sl-input-required-content-offset: -2px;--sl-input-border-radius-small: var(--sl-border-radius-medium);--sl-input-border-radius-medium: var(--sl-border-radius-medium);--sl-input-border-radius-large: var(--sl-border-radius-medium);--sl-input-font-family: var(--sl-font-sans);--sl-input-font-weight: var(--sl-font-weight-normal);--sl-input-font-size-small: var(--sl-font-size-small);--sl-input-font-size-medium: var(--sl-font-size-medium);--sl-input-font-size-large: var(--sl-font-size-large);--sl-input-letter-spacing: var(--sl-letter-spacing-normal);--sl-input-color: var(--sl-color-neutral-700);--sl-input-color-hover: var(--sl-color-neutral-700);--sl-input-color-focus: var(--sl-color-neutral-700);--sl-input-color-disabled: var(--sl-color-neutral-900);--sl-input-icon-color: var(--sl-color-neutral-500);--sl-input-icon-color-hover: var(--sl-color-neutral-600);--sl-input-icon-color-focus: var(--sl-color-neutral-600);--sl-input-placeholder-color: var(--sl-color-neutral-500);--sl-input-placeholder-color-disabled: var(--sl-color-neutral-600);--sl-input-spacing-small: var(--sl-spacing-small);--sl-input-spacing-medium: var(--sl-spacing-medium);--sl-input-spacing-large: var(--sl-spacing-large);--sl-input-filled-background-color: var(--sl-color-neutral-100);--sl-input-filled-background-color-hover: var(--sl-color-neutral-100);--sl-input-filled-background-color-focus: var(--sl-color-neutral-100);--sl-input-filled-background-color-disabled: var(--sl-color-neutral-100);--sl-input-filled-color: var(--sl-color-neutral-800);--sl-input-filled-color-hover: var(--sl-color-neutral-800);--sl-input-filled-color-focus: var(--sl-color-neutral-700);--sl-input-filled-color-disabled: var(--sl-color-neutral-800);--sl-input-focus-ring-color: hsl(198.6 88.7% 48.4% / 40%);--sl-input-focus-ring-offset: 0;--sl-input-label-font-size-small: var(--sl-font-size-small);--sl-input-label-font-size-medium: var(--sl-font-size-medium);--sl-input-label-font-size-large: var(--sl-font-size-large);--sl-input-label-color: inherit;--sl-input-help-text-font-size-small: var(--sl-font-size-x-small);--sl-input-help-text-font-size-medium: var(--sl-font-size-small);--sl-input-help-text-font-size-large: var(--sl-font-size-medium);--sl-input-help-text-color: var(--sl-color-neutral-500);--sl-toggle-size: 1rem;--sl-overlay-background-color: hsl(240 3.8% 46.1% / 33%);--sl-panel-background-color: var(--sl-color-neutral-0);--sl-panel-border-color: var(--sl-color-neutral-200);--sl-panel-border-width: 1px;--sl-tooltip-border-radius: var(--sl-border-radius-medium);--sl-tooltip-background-color: var(--sl-color-neutral-800);--sl-tooltip-color: var(--sl-color-neutral-0);--sl-tooltip-font-family: var(--sl-font-sans);--sl-tooltip-font-weight: var(--sl-font-weight-normal);--sl-tooltip-font-size: var(--sl-font-size-small);--sl-tooltip-line-height: var(--sl-line-height-dense);--sl-tooltip-padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-small);--sl-tooltip-arrow-size: 4px;--sl-z-index-drawer: 700;--sl-z-index-dialog: 800;--sl-z-index-dropdown: 900;--sl-z-index-toast: 950;--sl-z-index-tooltip: 1000}.sl-scroll-lock{overflow:hidden!important}.sl-toast-stack{position:fixed;top:0;inset-inline-end:0;z-index:var(--sl-z-index-toast);width:28rem;max-width:100%;max-height:100%;overflow:auto}.sl-toast-stack sl-alert{--box-shadow: var(--sl-shadow-large);margin:var(--sl-spacing-medium)}
`,ne=window.localStorage,_o=s=>{const l=ne.getItem(s);return l===null?l:l==="1"},ko=(s,l)=>{l===null&&ne.removeItem(s),ne.setItem(s,l?"1":"0")},Co=s=>{const l=ne.getItem(s);return l===null?l:Number.parseFloat(l)},So=(s,l)=>{l===null&&ne.removeItem(s),ne.setItem(s,`${l}`)},Ol="ds-dark-theme",El="ds-graph-font-theme";class zo{constructor(){this.graphFontSizeSubject=new pr(this.graphFontSize)}get darkTheme(){return _o(Ol)}set darkTheme(l){ko(Ol,l)}get graphFontSize(){return Co(El)??14}set graphFontSize(l){So(El,l),this.graphFontSizeSubject.next(this.graphFontSize)}}const je=new zo;var Oo=Object.defineProperty,Eo=Object.getOwnPropertyDescriptor,ge=(s,l,o,t)=>{for(var i=t>1?void 0:t?Eo(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&Oo(l,o,i),i};let ae=class extends T{constructor(){super(...arguments),this._subscriptions=[],this.theme="",this.isDarkTheme=!1}static get styles(){return z`
      :host {
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .image-header {
        width: 100%;
        height: 6em;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        gap: 200px;
      }

      .title-header {
        width: 100%;
        height: 2.5em;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        background-color: var(--primary-accent);
        color: var(--primary-accent-text);
        fill: var(--primary-accent-text);
        border-top: 4px solid var(--secondary-accent);
        font-size: var(--font-size);
      }

      .cpcb-wrapper {
        display: flex;
        flex-direction: row;
        min-width: 433px;
        gap: 5px;
      }

      .cpcb-text {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .cpcb-text-title {
        font-weight: bold;
      }

      .ministry-image {
        background-color: white;
      }

      .theme-icon {
        margin-right: 20px;
        cursor: pointer;
      }

      .flex-1 {
        flex: 1;
      }
    `}render(){return g`
      <div class="image-header">
        <div class="cpcb-wrapper">
          <img
            src="../../images/glpi.jpg"
            alt="Logo CPCB"
            style="height: 4em;"
          />
          <div class="cpcb-text">
            <div class="cpcb-text-title">
              ${this.i18n.t("TITLE.CPCB_TITLE")}
            </div>
            <div class="cpcb-text-content">
              ${this.i18n.t("TITLE.CPCB_TEXT")}
            </div>
            <div class="cpcb-text-content">
              ${this.i18n.t("TITLE.CPCB_SUBTEXT")}
            </div>
          </div>
        </div>
        <img
          class="ministry-image"
          src="../../images/ministry-panel_1_1.png"
          alt="Logo GOV"
          style="height: 6em;"
        />

        <img
          src="../../images/NamamiGangeLogo_en.jpg"
          alt="Logo Namami"
          style="height: 6em;"
        />
      </div>
      <div class="title-header">
        <div class="flex-1"></div>
        ${this.i18n.t("TITLE.TITLE")}
        <div class="flex-1"></div>
        <ki-icon
          class="theme-icon"
          @click="${this.toggleTheme}"
          .icon="ki ${this.isDarkTheme?"ki-moon":"ki-sun"}"
        ></ki-icon>
      </div>
    `}toggleTheme(){const s=gr();je.darkTheme=s}connectedCallback(){super.connectedCallback&&super.connectedCallback();const s=je.darkTheme;s!==null&&(s?Il():jl()),this._subscriptions.push(Nl.subscribe(l=>{this.theme=l?"dark sl-theme-dark":"sl-theme-light",this.isDarkTheme=l,this.requestUpdate()}))}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this._subscriptions.forEach(s=>{s.unsubscribe()})}};ge([p({attribute:!1})],ae.prototype,"_subscriptions",2);ge([p({attribute:!1})],ae.prototype,"i18n",2);ge([p({type:String,attribute:!1})],ae.prototype,"theme",2);ge([p({type:Boolean,attribute:!1})],ae.prototype,"isDarkTheme",2);ae=ge([A("cpcb-dashboard-header"),Ll(Fl)],ae);var Po=Object.defineProperty,Ao=Object.getOwnPropertyDescriptor,he=(s,l,o,t)=>{for(var i=t>1?void 0:t?Ao(l,o):l,e=s.length-1,c;e>=0;e--)(c=s[e])&&(i=(t?c(l,o,i):c(i))||i);return t&&i&&Po(l,o,i),i};fr({onOfflineReady(){}});let W=class extends T{constructor(){super(...arguments),this._subscriptions=[],this.theme="",this.isDarkTheme=!1}static get styles(){return z`
      :host {
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      main {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        overflow: hidden;
      }

      .main-content-container {
        flex: 1;
        height: 100%;
        overflow: hidden;
      }

      :host {
        --primary-accent: #2e6388;
        --primary-accent-text: #f4f7f9;
        --secondary-accent: #57c9c9;
        --text-primary: #2e6388;
        --bg-primary: white;
        --text-secondary: black;
        --bg-secondary: #f9f9f9;
        --text-muted: #767995;

        --font-size: 24px;
        --font-size-bigger: 30px;

        --text-tertiary: black;
        --bg-tertiary: #eee;
        --border-color: #ececec;
        --accent-color: #0056a0;
        --text-alarm: red;
        --divider-color: hsl(240 5.9% 90%);
      }

      .dark {
        --text-primary: white;
        --bg-primary: #15181b;
        --text-secondary: white;
        --bg-secondary: #2f3447;
        --text-tertiary: white;
        --bg-tertiary: #363e46;
        --border-color: #363e46;
        --accent-color: #537999;
        --text-alarm: red;
        --divider-color: hsl(240 4.6% 22%);
      }

      .themed {
        --theme-color: var(--accent-color);
        --theme-text-color-primary: var(--text-primary);
        --theme-color-primary: var(--bg-primary);
        --theme-text-color-secondary: var(--text-secondary);
        --theme-color-secondary: var(--bg-secondary);
        --theme-text-color-tertiary: var(--text-tertiary);
        --theme-color-tertiary: var(--bg-tertiary);
      }

      main {
        background-color: var(--bg-primary);
        color: var(--text-primary);
      }

      header {
        background-color: var(--bg-primary);
        color: var(--text-primary);
      }

      .theme-icon {
        fill: var(--text-secondary);
        cursor: pointer;
      }
    `}render(){return g`
      <style>
        ${this.slTheme}
      </style>
      <header class="${this.theme} themed">
        <cpcb-dashboard-header></cpcb-dashboard-header>
      </header>

      <main class="main ${this.theme} themed">
        <div class="main-content-container">
          <slot></slot>
        </div>
      </main>
    `}connectedCallback(){super.connectedCallback&&super.connectedCallback();const s=je.darkTheme;s!==null&&(s?Il():jl()),this._subscriptions.push(Nl.subscribe(l=>{this.theme=l?"dark sl-theme-dark":"sl-theme-light",this.slTheme=l?wo:$o,this.isDarkTheme=l,this.requestUpdate()}))}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this._subscriptions.forEach(s=>{s.unsubscribe()})}};he([p({attribute:!1})],W.prototype,"_subscriptions",2);he([p({attribute:!1})],W.prototype,"i18n",2);he([p({attribute:!1})],W.prototype,"slTheme",2);he([p({type:String,attribute:!1})],W.prototype,"theme",2);he([p({type:Boolean,attribute:!1})],W.prototype,"isDarkTheme",2);W=he([A("cpcb-dashboard"),Ll(Fl)],W);export{W as CpcbDashboardApp};
//# sourceMappingURL=cpcb-dashboard-app-f004b274.js.map

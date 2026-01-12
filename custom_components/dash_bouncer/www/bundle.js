
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var DashBouncer = (function (exports) {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$2=globalThis,e$4=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$5=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$4=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$5(e)})(t):t;

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const{is:i$3,defineProperty:e$3,getOwnPropertyDescriptor:h$2,getOwnPropertyNames:r$4,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$3(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$3(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$2(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$4(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$1=globalThis,i$2=t=>t,s$1=t$1.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h$1="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$3=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$3:d>=0?(e.push(a),s.slice(0,d)+h$1+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h$1)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$2(t).nextSibling;i$2(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const s=globalThis;let i$1 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$1._$litElement$=true,i$1["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$1});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i$1});(s.litElementVersions??=[]).push("4.2.2");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$2=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$2(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function r$1(r){return n({...r,state:true,attribute:false})}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const e$1=(e,t,c)=>(c.configurable=true,c.enumerable=true,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,c),c);

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */function e(e,r){return (n,s,i)=>{const o=t=>t.renderRoot?.querySelector(e)??null;return e$1(n,s,{get(){return o(this)}})}}

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const i=Symbol();class h{get taskComplete(){return this.t||(1===this.i?this.t=new Promise(((t,s)=>{this.o=t,this.h=s;})):3===this.i?this.t=Promise.reject(this.l):this.t=Promise.resolve(this.u)),this.t}constructor(t,s,i){this.p=0,this.i=0,(this._=t).addController(this);const h="object"==typeof s?s:{task:s,args:i};this.v=h.task,this.j=h.args,this.m=h.argsEqual??r,this.k=h.onComplete,this.A=h.onError,this.autoRun=h.autoRun??true,"initialValue"in h&&(this.u=h.initialValue,this.i=2,this.O=this.T?.());}hostUpdate(){ true===this.autoRun&&this.S();}hostUpdated(){"afterUpdate"===this.autoRun&&this.S();}T(){if(void 0===this.j)return;const t=this.j();if(!Array.isArray(t))throw Error("The args function must return an array");return t}async S(){const t=this.T(),s=this.O;this.O=t,t===s||void 0===t||void 0!==s&&this.m(s,t)||await this.run(t);}async run(t){let s,h;t??=this.T(),this.O=t,1===this.i?this.q?.abort():(this.t=void 0,this.o=void 0,this.h=void 0),this.i=1,"afterUpdate"===this.autoRun?queueMicrotask((()=>this._.requestUpdate())):this._.requestUpdate();const r=++this.p;this.q=new AbortController;let e=false;try{s=await this.v(t,{signal:this.q.signal});}catch(t){e=true,h=t;}if(this.p===r){if(s===i)this.i=0;else {if(false===e){try{this.k?.(s);}catch{}this.i=2,this.o?.(s);}else {try{this.A?.(h);}catch{}this.i=3,this.h?.(h);}this.u=s,this.l=h;}this._.requestUpdate();}}abort(t){1===this.i&&this.q?.abort(t);}get value(){return this.u}get error(){return this.l}get status(){return this.i}render(t){switch(this.i){case 0:return t.initial?.();case 1:return t.pending?.();case 2:return t.complete?.(this.value);case 3:return t.error?.(this.error);default:throw Error("Unexpected status: "+this.i)}}}const r=(s,i)=>s===i||s.length===i.length&&s.every(((s,h)=>!f$1(s,i[h])));

    const baseStyles = i$4 `
  :host > .dashb-main {
    --dashb-font-size-scale: 1;
    --dashb-header-font-size: calc(20px * var(--dashb-font-size-scale));
    --dashb-body-header-font-size: calc(24px * var(--dashb-font-size-scale));
    --dashb-body-header-opacity: 0.87;
  }
`;
    const lightStyles = i$4 `
  :host > .dashb-main.light {
    --dashb-text-color: #000000;
    --dashb-text-header-color: #ffffff;
    --dashb-text-list-color: #000000;
    --dashb-body-header-color: #000000;

    --dashb-primary-background: #fafafa;
    --dashb-secondary-background: #e5e5e5;
    --dashb-header-background: #009ac7;
    --dashb-list-background: #aaaaaa;

    --dashb-table-secondary-background: #f1f1f1;

    --dashb-select-option-color: #dff3fc;
    --dashb-select-option-text: #009ac7;

    --dashb-dialog-header-line: #f0f0f0;
  }
`;
    const darkStyles = i$4 `
  :host > .dashb-main.dark {
    --dashb-text-color: #e1e1e1;
    --dashb-text-header-color: #e1e1e1;
    --dashb-text-list-color: #e1e1e1;
    --dashb-body-header-color: #000000;

    --dashb-primary-background: #111111;
    --dashb-secondary-background: #282828;
    --dashb-header-background: #131e23;
    --dashb-list-background: #1c1c1c;

    --dashb-table-secondary-background: #161616;

    --dashb-select-option-color: #0f2d3d;
    --dashb-select-option-text: #67c5f8;

    --dashb-dialog-header-line: #282828;
  }
`;
    const styles = i$4 `
${baseStyles}
${lightStyles}
${darkStyles}
}
`;

    // Polymer legacy event helpers used courtesy of the Polymer project.
    //
    // Copyright (c) 2017 The Polymer Authors. All rights reserved.
    //
    // Redistribution and use in source and binary forms, with or without
    // modification, are permitted provided that the following conditions are
    // met:
    //
    //    * Redistributions of source code must retain the above copyright
    // notice, this list of conditions and the following disclaimer.
    //    * Redistributions in binary form must reproduce the above
    // copyright notice, this list of conditions and the following disclaimer
    // in the documentation and/or other materials provided with the
    // distribution.
    //    * Neither the name of Google Inc. nor the names of its
    // contributors may be used to endorse or promote products derived from
    // this software without specific prior written permission.
    //
    // THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
    // "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
    // LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
    // A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
    // OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
    // SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
    // LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
    // DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    // THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    // (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    // OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    /**
     * Dispatches a custom event with an optional detail value.
     *
     * @param {string} type Name of event type.
     * @param {*=} detail Detail value containing event-specific
     *   payload.
     * @param {{ bubbles: (boolean|undefined),
     *           cancelable: (boolean|undefined),
     *           composed: (boolean|undefined) }=}
     *  options Object specifying options.  These may include:
     *  `bubbles` (boolean, defaults to `true`),
     *  `cancelable` (boolean, defaults to false), and
     *  `node` on which to fire the event (HTMLElement, defaults to `this`).
     * @return {Event} The new event that was fired.
     */
    const fireEvent = (node, type, detail, options) => {
        options = options || {};
        // @ts-ignore
        detail = detail === null || detail === undefined ? {} : detail;
        const event = new Event(type, {
            bubbles: options.bubbles === undefined ? true : options.bubbles,
            cancelable: Boolean(options.cancelable),
            composed: options.composed === undefined ? true : options.composed,
        });
        event.detail = detail;
        node.dispatchEvent(event);
        return event;
    };

    const loadDialog = () => Promise.resolve().then(function () { return dialog; });
    const openDialog = (element, data) => {
        fireEvent(element, "show-dialog", {
            dialogTag: "dash-bouncer-dialog",
            dialogImport: loadDialog,
            dialogParams: data,
        });
    };

    var BounceOption;
    (function (BounceOption) {
        BounceOption["allow"] = "allow";
        BounceOption["block"] = "block";
        BounceOption["default"] = "default";
    })(BounceOption || (BounceOption = {}));

    const bouncerConfigToConfig = (config, panels) => {
        const allowedPanels = new Set(config.allowed);
        const blockedPanels = new Set(config.blocked);
        const panelConfig = {};
        for (const panel of panels) {
            const url = panel.url_path;
            if (allowedPanels.has(url)) {
                panelConfig[url] = BounceOption.allow;
            }
            else if (blockedPanels.has(url)) {
                panelConfig[url] = BounceOption.block;
            }
            else {
                panelConfig[url] = BounceOption.default;
            }
        }
        return { default: config.default_bounce, panels: panelConfig };
    };
    const configToBouncerConfig = (config) => {
        const allowed = [];
        const blocked = [];
        for (const [key, value] of Object.entries(config.panels)) {
            if (value == BounceOption.allow) {
                allowed.push(key);
            }
            else if (value == BounceOption.block) {
                blocked.push(key);
            }
        }
        return { default_bounce: config.default, allowed, blocked };
    };

    exports.DashBouncerDashboard = class DashBouncerDashboard extends i$1 {
        constructor() {
            super(...arguments);
            this.narrow = false;
            this._dataTask = new h(this, {
                task: async () => {
                    const [people, panels, config] = await Promise.all([
                        this.hass.callApi("GET", "dash_bouncer/users"),
                        this.hass.callApi("GET", "dash_bouncer/panels"),
                        this.hass.callApi("GET", "dash_bouncer/config"),
                    ]);
                    this.config = config;
                    const result = {
                        people,
                        panels,
                    };
                    return result;
                },
                args: () => [],
            });
            this._newConfig = (ev) => {
                const { config } = ev.detail;
                this.config = { ...config };
                window.removeEventListener("dash-bouncer-new-config", this._newConfig);
            };
        }
        _userConfig(person, panels) {
            const config = this.config?.users[person.id];
            if (!config) {
                return null;
            }
            return bouncerConfigToConfig(config, panels);
        }
        _openEditPerson(ev) {
            if (ev.currentTarget === null) {
                return;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const person = ev.currentTarget.person;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const panels = ev.currentTarget.panels;
            const config = this._userConfig(person, panels);
            window.addEventListener("dash-bouncer-new-config", this._newConfig);
            openDialog(this, { person, panels, ...(config && { config }) });
        }
        render() {
            const darkMode = this.hass.themes.darkMode;
            const uiMode = darkMode ? "dark" : "light";
            return this._dataTask.render({
                pending: () => b `<hass-loading-screen></hass-loading-screen>`,
                complete: ({ people, panels }) => b `
        <div class="dashb-main ${uiMode} ${this.narrow ? "narrow" : ""}">
          <div class="header">
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            ></ha-menu-button>
            <span>DashBouncer</span>
          </div>

          <div class="body">
            <div class="body-title">DashBouncer</div>

            <div class="body-panel">
              <div class="intro">
                <span> Manage dashboard access for users. </span>
              </div>

              <div class="users">
                <ha-card outlined>
                  <ha-list>
                    ${people.map((person) => b `
                        <ha-list-item
                          @click=${this._openEditPerson}
                          .person=${person}
                          .panels=${panels}
                        >
                          ${person.name}
                        </ha-list-item>
                      `)}
                  </ha-list>
                </ha-card>
              </div>
            </div>
          </div>
        </div>
      `,
            });
        }
    };
    exports.DashBouncerDashboard.styles = [
        styles,
        i$4 `
      .header {
        color: var(--dashb-text-header-color);
        padding: 0 6px 0;
        background-color: var(--dashb-header-background);
        font-size: var(--dashb-header-font-size);
        font-weight: 400;
        display: flex;
        align-items: center;
        height: 56px;
      }
      .header > span {
        margin-left: 24px;
      }
      .narrow .header > span {
        margin-left: 12px;
      }

      .body {
        padding: 16px;
        margin: 0 auto;
        max-width: 700px;
      }

      .body-title {
        margin-top: 16px;
        font-size: var(--dashb-body-header-font-size);
        font-weight: 400;
        opacity: var(--dashb-body-header-opacity);
      }

      .body-panel {
        margin-top: 36px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        row-gap: 24px;
      }

      .intro {
        max-width: 300px;
        margin-right: 36px;
        margin-top: 12px;
      }

      .users {
        max-width: 400px;
        min-width: 300px;
        flex: 1;
      }
    `,
    ];
    __decorate([
        n({ attribute: false })
    ], exports.DashBouncerDashboard.prototype, "hass", void 0);
    __decorate([
        n({ type: Boolean })
    ], exports.DashBouncerDashboard.prototype, "narrow", void 0);
    __decorate([
        r$1()
    ], exports.DashBouncerDashboard.prototype, "config", void 0);
    exports.DashBouncerDashboard = __decorate([
        t("dash-bouncer-dashboard")
    ], exports.DashBouncerDashboard);

    // Material Design Icons v7.4.47
    var mdiCancel = "M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z";
    var mdiCheck = "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";
    var mdiClose = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";

    const OPTIONS = [BounceOption.allow, BounceOption.block, BounceOption.default];
    exports.DashBouncerDialog = class DashBouncerDialog extends i$1 {
        showDialog(params) {
            this.person = params.person;
            this.panels = params.panels;
            this.config = params.config ?? { default: BounceOption.allow, panels: {} };
        }
        _defaultSelect(event) {
            this.config = { ...this.config, default: event.detail };
        }
        _panelSelect(event) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const urlPath = event.target.panel_url;
            const option = event.detail;
            if (option == BounceOption.default) {
                const { [urlPath]: _, ...rest } = this.config.panels;
                this.config = {
                    ...this.config,
                    panels: {
                        ...rest,
                    },
                };
            }
            else {
                this.config = {
                    ...this.config,
                    panels: {
                        ...this.config.panels,
                        [urlPath]: event.detail,
                    },
                };
            }
        }
        _setTable(option) {
            if (option == BounceOption.default) {
                this.config = {
                    ...this.config,
                    panels: {},
                };
            }
            else {
                const panels_config = {};
                for (const panel of this.panels) {
                    panels_config[panel.url_path] = option;
                }
                this.config = {
                    ...this.config,
                    panels: panels_config,
                };
            }
        }
        async _save() {
            const bouncerUserConfig = configToBouncerConfig(this.config);
            const newBouncerConfig = await this.hass.callApi("POST", `dash_bouncer/config/${this.person.id}`, { ...bouncerUserConfig });
            fireEvent(this, "dash-bouncer-new-config", { config: newBouncerConfig });
            this._dialog?.close();
        }
        render() {
            if (!this.person || !this.panels || !this.config) {
                return A;
            }
            const darkMode = this.hass.themes.darkMode;
            const uiMode = darkMode ? "dark" : "light";
            return b `
      <ha-dialog
        class="dashb-main ${uiMode}"
        open
        .heading=${true}
        @closed=${this.closeDialog}
      >
        <div slot="heading" class="header_title">
          <ha-icon-button
            dialogAction="cancel"
            .path=${mdiClose}
            class="header_button"
          ></ha-icon-button>
          <h2><span class="dialog-header">${this.person.name}</span></h2>
        </div>

        <div class="configs">
          <div>Default bounce</div>
          <dash-bouncer-select
            .selected=${this.config.default}
            .options=${OPTIONS.filter((x) => x != BounceOption.default)}
            @select=${this._defaultSelect}
          ></dash-bouncer-select>
        </div>

        <div class="configs toggle">
          <div>Table toggle</div>
          <div class="actions">
            <ha-button
              size="small"
              appearance="filled"
              @click=${() => this._setTable(BounceOption.allow)}
            >
              Allow
            </ha-button>
            <ha-button
              size="small"
              appearance="filled"
              @click=${() => this._setTable(BounceOption.block)}
            >
              Block
            </ha-button>
            <ha-button
              size="small"
              appearance="filled"
              @click=${() => this._setTable(BounceOption.default)}
            >
              Default
            </ha-button>
          </div>
        </div>

        <div class="table">
          <table>
            <thead>
              <tr>
                <th class="left">Name (URL)</th>
                <th>Visible</th>
                <th>Admin</th>
                <th>Bounce</th>
              </tr>
            </thead>
            <tbody>
              ${this.panels.map((panel) => b `
                  <tr class="tr-body">
                    <td>${panel.title ?? "<none>"} (/${panel.url_path})</td>
                    <td class="center">
                      <ha-svg-icon
                        .path=${panel.default_visible ? mdiCheck : mdiCancel}
                      ></ha-svg-icon>
                    </td>
                    <td class="center">
                      <ha-svg-icon
                        .path=${panel.require_admin ? mdiCheck : mdiCancel}
                      ></ha-svg-icon>
                    </td>
                    <td>
                      <dash-bouncer-select
                        .selected=${this.config.panels[panel.url_path] ??
            BounceOption.default}
                        .options=${OPTIONS}
                        .panel_url=${panel.url_path}
                        @select=${this._panelSelect}
                      ></dash-bouncer-select>
                    </td>
                  </tr>
                `)}
            </tbody>
          </table>
        </div>

        <ha-button slot="primaryAction" @click=${this._save}> Save </ha-button>
      </ha-dialog>
    `;
        }
        closeDialog() {
            this.person = undefined;
            this.panels = undefined;
        }
    };
    exports.DashBouncerDialog.styles = [
        styles,
        i$4 `
      .header_title {
        display: flex;
        align-items: center;
        padding: 6px 6px 0;
        border: none;
        border-bottom: 2px solid var(--dashb-dialog-header-line);
      }

      .configs {
        display: flex;
        justify-content: space-between;
      }

      .configs.toggle {
        margin-top: 18px;
      }

      .actions > ha-button {
        margin-left: 3px;
        margin-right: 3px;
      }

      table {
        border-collapse: collapse;
      }

      .table {
        margin-top: 24px;
        border-radius: 10px;
        overflow-y: hidden;
      }

      td,
      th {
        padding: 12px 8px;
      }

      th {
        border-bottom: 2px solid #dddddd;
        background-color: var(--dashb-secondary-background);
      }

      th.left {
        text-align: left;
      }

      td.center {
        text-align: center;
      }

      tr:nth-child(even) {
        background-color: var(--dashb-table-secondary-background);
      }

      tr:nth-child(odd).tr-body {
        background-color: var(--dashb-primary-background);
      }
    `,
    ];
    __decorate([
        n({ attribute: false })
    ], exports.DashBouncerDialog.prototype, "hass", void 0);
    __decorate([
        r$1()
    ], exports.DashBouncerDialog.prototype, "person", void 0);
    __decorate([
        r$1()
    ], exports.DashBouncerDialog.prototype, "panels", void 0);
    __decorate([
        r$1()
    ], exports.DashBouncerDialog.prototype, "config", void 0);
    __decorate([
        e("ha-dialog")
    ], exports.DashBouncerDialog.prototype, "_dialog", void 0);
    exports.DashBouncerDialog = __decorate([
        t("dash-bouncer-dialog")
    ], exports.DashBouncerDialog);

    var dialog = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get DashBouncerDialog () { return exports.DashBouncerDialog; }
    });

    const optionText = (option) => {
        switch (option) {
            case BounceOption.allow:
                return "Allow";
            case BounceOption.block:
                return "Block";
            case BounceOption.default:
                return "Default";
        }
    };
    exports.DashBouncerSelect = class DashBouncerSelect extends i$1 {
        _handleClick(option) {
            const event = new CustomEvent("select", { detail: option, bubbles: true });
            this.dispatchEvent(event);
        }
        render() {
            return b `
      <div class="options_holder">
        ${this.options.map((option) => {
            const selected = this.selected == option ? "selected" : "";
            return b `
            <div
              class="option ${selected}"
              .entry=${option}
              @click=${() => this._handleClick(option)}
            >
              ${optionText(option)}
            </div>
          `;
        })}
      </div>
    `;
        }
    };
    exports.DashBouncerSelect.styles = i$4 `
    .options_holder {
      display: flex;
      flex-direction: row;
      cursor: pointer;
    }

    .option {
      padding: 6px;
      border-width: 3px;
      border-style: solid solid solid none;
      border-color: var(--dashb-select-option-color);
      user-select: none;
    }
    .option:first-child {
      border-left-style: solid;
      border-radius: 6px 0 0 6px;
    }
    .option:last-child {
      border-radius: 0 6px 6px 0;
    }

    .selected {
      background-color: var(--dashb-select-option-color);
      color: var(--dashb-select-option-text);
      font-weight: bold;
    }
  `;
    __decorate([
        n()
    ], exports.DashBouncerSelect.prototype, "selected", void 0);
    __decorate([
        n({ attribute: false })
    ], exports.DashBouncerSelect.prototype, "options", void 0);
    exports.DashBouncerSelect = __decorate([
        t("dash-bouncer-select")
    ], exports.DashBouncerSelect);

    return exports;

})({});

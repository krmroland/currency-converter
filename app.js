!function(t){var e={};function r(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(n,s,function(e){return t[e]}.bind(null,s));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}({1:function(t,e,r){"use strict";r.r(e);r(6);var n=class{constructor(t,e="input"){this.label=t,this._$root=null,this.type=e,this.hasError=!1,this.createInput(),this.createLabel(),this.createErrorField()}createLabel(){this.$label=document.createElement("label"),this.$label.textContent=this.label}createInput(){this.$input=document.createElement(this.type),this.$input.setAttribute("aria-label",this.label),this.$input.className="field-input"}createErrorField(){this.$error=document.createElement("div"),this.$error.className="field-error",this.$errorValue=document.createTextNode(""),this.$error.appendChild(this.$errorValue)}setError(t){this.$error.classList.add("has-error"),this.$errorValue.data=t,this.hasError=!0}clearError(){this.hasError&&(this.$error.classList.remove("has-error"),this.$errorValue.data="",this.hasError=!1)}getRoot(){return this._$root?this._$root:(this._$root=document.createElement("div"),this._$root.className="field-wrapper",this._$root.appendChild(this.$label),this._$root.appendChild(this.$input),this._$root.appendChild(this.$error),this._$root)}inputAttribute(t,e){return this.$input.setAttribute(t,e),this}value(){return this.$input.value}};class s extends n{constructor(t){super(t,"select"),this.$input.add(s.createOption("--select--"))}static createOption(t,e=""){const r=document.createElement("option");return r.text=t,r.value=e,r}}var i=s;var o=class{constructor(t){this.baseUrl=t}get(t){return this.fetch(t)}fetch(t,e="get"){return t=this.baseUrl+t,new Promise((r,n)=>fetch(t,{method:e}).then(t=>t&&200===t.status?t.json().then(t=>r(t)).catch(t=>n(t)):Promise.reject("Failed to fetch updates")).catch(t=>n(t)))}};var u=class{constructor(){this.http=new o("https://free.currencyconverterapi.com/api/v5/")}getCurrencies(){return this.http.get("currencies")}convert(t,e){const r=t+"_"+e;return new Promise((n,s)=>this.http.get(`convert?q=${r}&compact=ultra`).then(s=>n({from:t,to:e,rate:s[r]})).catch(t=>s(t)))}};var a=class{constructor(t,e){this.$rootNode=t,this.app=e}render(){const t=document.createDocumentFragment("div"),e=document.createElement("div");e.className="row",this.app.iterateCurrencyInputs(t=>{e.appendChild(t.getRoot())}),t.appendChild(e);const r=document.createElement("div");r.className="conversion",r.appendChild(this.app.amount.$input),r.appendChild(this.app.$button),t.appendChild(r);const n=document.createElement("div");n.appendChild(this.app.amount.$error),n.className="amount-error",t.appendChild(n),this.app.$result.className="result",t.appendChild(this.app.$result),this.$rootNode.appendChild(t)}};const c=new class{constructor(){this.Converter=new u,this.currencyInputs={},this.currencies={},this.setCurrencyInputs().setResult().setAmount().setButton(),this.updateCurrencies()}setCurrencyInputs(){return this.currencyInputs.fromCurrency=new i("From"),this.currencyInputs.toCurrency=new i("To"),this}setAmount(){return this.amount=new n("Amount").inputAttribute("placeholder","Enter amount"),this}setResult(){return this.$result=document.createElement("div"),this.$resultValue=document.createTextNode("?"),this.$result.appendChild(this.$resultValue),this}setButton(){return this.$button=document.createElement("button"),this.$button.className="button",this.$button.appendChild(document.createTextNode("Convert")),this.$button.addEventListener("click",this.convert.bind(this)),this}hasMissingValue(){return Object.values(this.currencyInputs).filter(t=>this.validateRequired(t)).length||this.validateRequired(this.amount)}validateRequired(t){return t.value()?(t.clearError(),!1):(t.setError(`field ${t.label} is required !`),!0)}amountIsInvalid(){const t=+this.amount.value();return t?(this.amount.clearError(),!1):(this.amount.setError(0===t?"amount must not be 0":"amount must be numeric"),!0)}convert(t){if(t.preventDefault(),this.updateResult("?"),this.hasMissingValue()||this.amountIsInvalid()||this.currenciesAreTheSame())return;const{toCurrency:e,fromCurrency:r}=this.currencyInputs;this.updateResult("...converting"),this.$button.setAttribute("disabled",!0),this.Converter.convert(r.value(),e.value()).then(({rate:t,to:e})=>{const r=this.amount.value(),n=Number(t*r).toLocaleString();this.updateResult(`${this.currencySymbol(e)} ${n}`)}).catch(t=>this.updateResult(t)).finally(t=>this.$button.removeAttribute("disabled",!1))}currencySymbol(t){const e=this.currencies[t];return e?e.currencySymbol||e.name:t}currenciesAreTheSame(){const{toCurrency:t,fromCurrency:e}=this.currencyInputs;return t.value()===e.value()&&(this.amount.setError("Please select distinct currencies"),!0)}updateResult(t){this.$resultValue.data=t}updateCurrencies(){this.Converter.getCurrencies().then(this.updateSelectOptions.bind(this))}updateSelectOptions({results:t}){this.currencies=t;const e=document.createDocumentFragment("div");Object.values(t).forEach(({id:t,currencyName:r,currencySymbol:n})=>{e.appendChild(i.createOption(`${r} (${n})`,t))}),this.iterateCurrencyInputs(t=>t.$input.appendChild(e.cloneNode(!0)))}iterateCurrencyInputs(t){Object.values(this.currencyInputs).forEach(e=>{t(e)})}};new a(document.getElementById("app"),c).render(),navigator.serviceWorker&&navigator.serviceWorker.register("serviceWorker.js").then(t=>console.log("Service worker registered successfully")).catch(t=>console.log("Service worker registration failed"))},6:function(t,e){}});
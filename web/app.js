(function dartProgram(){function copyProperties(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
b[q]=a[q]}}function mixinPropertiesHard(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
if(!b.hasOwnProperty(q)){b[q]=a[q]}}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var s=function(){}
s.prototype={p:{}}
var r=new s()
if(!(Object.getPrototypeOf(r)&&Object.getPrototypeOf(r).p===s.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var q=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(q))return true}}catch(p){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var s=Object.create(b.prototype)
copyProperties(a.prototype,s)
a.prototype=s}}function inheritMany(a,b){for(var s=0;s<b.length;s++){inherit(b[s],a)}}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazy(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){a[b]=d()}a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){var r=d()
if(a[b]!==s){A.l7(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.u(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.h8(b)
return new s(c,this)}:function(){if(s===null)s=A.h8(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.h8(a).prototype
return s}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number"){h+=x}return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var s=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var r=staticTearOffGetter(s)
a[b]=r}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var s=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var r=instanceTearOffGetter(c,s)
a[b]=r}function setOrUpdateInterceptorsByTag(a){var s=v.interceptorsByTag
if(!s){v.interceptorsByTag=a
return}copyProperties(a,s)}function setOrUpdateLeafTags(a){var s=v.leafTags
if(!s){v.leafTags=a
return}copyProperties(a,s)}function updateTypes(a){var s=v.types
var r=s.length
s.push.apply(s,a)
return r}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var s=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},r=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:s(0,0,null,["$0"],0),_instance_1u:s(0,1,null,["$1"],0),_instance_2u:s(0,2,null,["$2"],0),_instance_0i:s(1,0,null,["$0"],0),_instance_1i:s(1,1,null,["$1"],0),_instance_2i:s(1,2,null,["$2"],0),_static_0:r(0,null,["$0"],0),_static_1:r(1,null,["$1"],0),_static_2:r(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var J={
hc(a,b,c,d){return{i:a,p:b,e:c,x:d}},
fF(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.ha==null){A.kV()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.f(A.hP("Return interceptor for "+A.c(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.fi
if(o==null)o=$.fi=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.kZ(a)
if(p!=null)return p
if(typeof a=="function")return B.J
s=Object.getPrototypeOf(a)
if(s==null)return B.v
if(s===Object.prototype)return B.v
if(typeof q=="function"){o=$.fi
if(o==null)o=$.fi=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.o,enumerable:false,writable:true,configurable:true})
return B.o}return B.o},
ht(a,b){if(a<0||a>4294967295)throw A.f(A.ao(a,0,4294967295,"length",null))
return J.jc(new Array(a),b)},
hu(a,b){if(a<0)throw A.f(A.eu("Length must be a non-negative integer: "+a,null))
return A.u(new Array(a),b.i("K<0>"))},
jc(a,b){var s=A.u(a,b.i("K<0>"))
s.$flags=1
return s},
hv(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
jd(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.hv(r))break;++b}return b},
je(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.j(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.hv(q))break}return b},
aW(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bD.prototype
return J.cy.prototype}if(typeof a=="string")return J.aG.prototype
if(a==null)return J.bE.prototype
if(typeof a=="boolean")return J.cx.prototype
if(Array.isArray(a))return J.K.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ak.prototype
if(typeof a=="symbol")return J.b5.prototype
if(typeof a=="bigint")return J.b4.prototype
return a}if(a instanceof A.o)return a
return J.fF(a)},
v(a){if(typeof a=="string")return J.aG.prototype
if(a==null)return a
if(Array.isArray(a))return J.K.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ak.prototype
if(typeof a=="symbol")return J.b5.prototype
if(typeof a=="bigint")return J.b4.prototype
return a}if(a instanceof A.o)return a
return J.fF(a)},
ce(a){if(a==null)return a
if(Array.isArray(a))return J.K.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ak.prototype
if(typeof a=="symbol")return J.b5.prototype
if(typeof a=="bigint")return J.b4.prototype
return a}if(a instanceof A.o)return a
return J.fF(a)},
kP(a){if(typeof a=="string")return J.aG.prototype
if(a==null)return a
if(!(a instanceof A.o))return J.bg.prototype
return a},
E(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.ak.prototype
if(typeof a=="symbol")return J.b5.prototype
if(typeof a=="bigint")return J.b4.prototype
return a}if(a instanceof A.o)return a
return J.fF(a)},
q(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.aW(a).a0(a,b)},
m(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.kY(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.v(a).h(a,b)},
bt(a,b,c){return J.ce(a).n(a,b,c)},
iQ(a){return J.E(a).bQ(a)},
iR(a,b,c){return J.E(a).bY(a,b,c)},
iS(a,b,c,d){return J.E(a).bg(a,b,c,d)},
iT(a,b){return J.v(a).v(a,b)},
hg(a,b){return J.ce(a).I(a,b)},
dj(a,b){return J.ce(a).cl(a,b)},
fM(a,b){return J.ce(a).p(a,b)},
iU(a){return J.E(a).gc8(a)},
a4(a){return J.E(a).ga6(a)},
dk(a){return J.aW(a).gD(a)},
fN(a){return J.v(a).gC(a)},
hh(a){return J.v(a).gM(a)},
bu(a){return J.ce(a).gB(a)},
a5(a){return J.v(a).gk(a)},
aZ(a){return J.E(a).gY(a)},
iV(a){return J.aW(a).ga_(a)},
iW(a,b,c){return J.ce(a).ar(a,b,c)},
hi(a){return J.E(a).cv(a)},
iX(a,b){return J.E(a).sbU(a,b)},
b_(a,b){return J.E(a).st(a,b)},
k(a,b){return J.E(a).sT(a,b)},
iY(a){return J.kP(a).cG(a)},
I(a){return J.aW(a).j(a)},
bC:function bC(){},
cx:function cx(){},
bE:function bE(){},
U:function U(){},
av:function av(){},
cG:function cG(){},
bg:function bg(){},
ak:function ak(){},
b4:function b4(){},
b5:function b5(){},
K:function K(a){this.$ti=a},
cw:function cw(){},
eL:function eL(a){this.$ti=a},
az:function az(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
bF:function bF(){},
bD:function bD(){},
cy:function cy(){},
aG:function aG(){}},A={fU:function fU(){},
jg(a){return new A.bH("Field '"+a+"' has not been initialized.")},
hM(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
ju(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
fC(a,b,c){return a},
hb(a){var s,r
for(s=$.a3.length,r=0;r<s;++r)if(a===$.a3[r])return!0
return!1},
jt(a,b,c,d){A.fW(b,"start")
if(c!=null){A.fW(c,"end")
if(b>c)A.bs(A.ao(b,0,c,"start",null))}return new A.bT(a,b,c,d.i("bT<0>"))},
jh(a,b,c,d){if(t.gw.b(a))return new A.by(a,b,c.i("@<0>").G(d).i("by<1,2>"))
return new A.aL(a,b,c.i("@<0>").G(d).i("aL<1,2>"))},
fS(){return new A.bd("No element")},
ja(){return new A.bd("Too many elements")},
bH:function bH(a){this.a=a},
eX:function eX(){},
w:function w(){},
R:function R(){},
bT:function bT(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
aI:function aI(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aL:function aL(a,b,c){this.a=a
this.b=b
this.$ti=c},
by:function by(a,b,c){this.a=a
this.b=b
this.$ti=c},
bL:function bL(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
a0:function a0(a,b,c){this.a=a
this.b=b
this.$ti=c},
H:function H(a,b,c){this.a=a
this.b=b
this.$ti=c},
bW:function bW(a,b,c){this.a=a
this.b=b
this.$ti=c},
d6:function d6(a){this.a=a},
aJ:function aJ(a,b){this.a=a
this.$ti=b},
is(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
kY(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
c(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.I(a)
return s},
cJ(a){var s,r=$.hD
if(r==null)r=$.hD=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
hG(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.j(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
aM(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.d.U(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
cK(a){var s,r,q,p
if(a instanceof A.o)return A.Y(A.a9(a),null)
s=J.aW(a)
if(s===B.I||s===B.K||t.ak.b(a)){r=B.q(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.Y(A.a9(a),null)},
jl(a){var s,r,q
if(typeof a=="number"||A.h4(a))return J.I(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.at)return a.j(0)
s=$.iO()
for(r=0;r<1;++r){q=s[r].cH(a)
if(q!=null)return q}return"Instance of '"+A.cK(a)+"'"},
S(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.bc(s,10)|55296)>>>0,s&1023|56320)}throw A.f(A.ao(a,0,1114111,null,null))},
jm(a,b,c,d,e,f,g,h,i){var s,r,q,p=b-1
if(0<=a&&a<100){a+=400
p-=4800}s=B.c.ag(h,1000)
g+=B.c.V(h-s,1000)
r=i?Date.UTC(a,p,c,d,e,f,g):new Date(a,p,c,d,e,f,g).valueOf()
q=!0
if(!isNaN(r))if(!(r<-864e13))if(!(r>864e13))q=r===864e13&&s!==0
if(q)return null
return r},
a1(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
b9(a){return a.c?A.a1(a).getUTCFullYear()+0:A.a1(a).getFullYear()+0},
cI(a){return a.c?A.a1(a).getUTCMonth()+1:A.a1(a).getMonth()+1},
cH(a){return a.c?A.a1(a).getUTCDate()+0:A.a1(a).getDate()+0},
aw(a){return a.c?A.a1(a).getUTCHours()+0:A.a1(a).getHours()+0},
b8(a){return a.c?A.a1(a).getUTCMinutes()+0:A.a1(a).getMinutes()+0},
hF(a){return a.c?A.a1(a).getUTCSeconds()+0:A.a1(a).getSeconds()+0},
hE(a){return a.c?A.a1(a).getUTCMilliseconds()+0:A.a1(a).getMilliseconds()+0},
jk(a){var s=a.$thrownJsError
if(s==null)return null
return A.bq(s)},
j(a,b){if(a==null)J.a5(a)
throw A.f(A.h9(a,b))},
h9(a,b){var s,r="index"
if(!A.h6(b))return new A.aa(!0,b,r,null)
s=A.ca(J.a5(a))
if(b<0||b>=s)return A.bB(b,s,a,null,r)
return A.hH(b,r)},
kH(a){return new A.aa(!0,a,null,null)},
f(a){return A.N(a,new Error())},
N(a,b){var s
if(a==null)a=new A.aq()
b.dartException=a
s=A.l8
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
l8(){return J.I(this.dartException)},
bs(a,b){throw A.N(a,b==null?new Error():b)},
di(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.bs(A.k8(a,b,c),s)},
k8(a,b,c){var s,r,q,p,o,n,m,l,k
if(typeof b=="string")s=b
else{r="[]=;add;removeWhere;retainWhere;removeRange;setRange;setInt8;setInt16;setInt32;setUint8;setUint16;setUint32;setFloat32;setFloat64".split(";")
q=r.length
p=b
if(p>q){c=p/q|0
p%=q}s=r[p]}o=typeof c=="string"?c:"modify;remove from;add to".split(";")[c]
n=t.j.b(a)?"list":"ByteData"
m=a.$flags|0
l="a "
if((m&4)!==0)k="constant "
else if((m&2)!==0){k="unmodifiable "
l="an "}else k=(m&1)!==0?"fixed-length ":""
return new A.bV("'"+s+"': Cannot "+o+" "+l+k+n)},
hd(a){throw A.f(A.Q(a))},
ar(a){var s,r,q,p,o,n
a=A.l1(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.u([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.f0(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
f1(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
hO(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
fV(a,b){var s=b==null,r=s?null:b.method
return new A.cB(a,r,s?null:b.receiver)},
ay(a){if(a==null)return new A.eV(a)
if(typeof a!=="object")return a
if("dartException" in a)return A.aY(a,a.dartException)
return A.kF(a)},
aY(a,b){if(t.W.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
kF(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.bc(r,16)&8191)===10)switch(q){case 438:return A.aY(a,A.fV(A.c(s)+" (Error "+q+")",null))
case 445:case 5007:A.c(s)
return A.aY(a,new A.bO())}}if(a instanceof TypeError){p=$.iC()
o=$.iD()
n=$.iE()
m=$.iF()
l=$.iI()
k=$.iJ()
j=$.iH()
$.iG()
i=$.iL()
h=$.iK()
g=p.N(s)
if(g!=null)return A.aY(a,A.fV(A.n(s),g))
else{g=o.N(s)
if(g!=null){g.method="call"
return A.aY(a,A.fV(A.n(s),g))}else if(n.N(s)!=null||m.N(s)!=null||l.N(s)!=null||k.N(s)!=null||j.N(s)!=null||m.N(s)!=null||i.N(s)!=null||h.N(s)!=null){A.n(s)
return A.aY(a,new A.bO())}}return A.aY(a,new A.cS(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.bQ()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.aY(a,new A.aa(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.bQ()
return a},
bq(a){var s
if(a==null)return new A.c3(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.c3(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
ip(a){if(a==null)return J.dk(a)
if(typeof a=="object")return A.cJ(a)
return J.dk(a)},
kO(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.n(0,a[s],a[r])}return b},
kg(a,b,c,d,e,f){t.Y.a(a)
switch(A.ca(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.f(new A.f8("Unsupported number of arguments for wrapped closure"))},
bp(a,b){var s
if(a==null)return null
s=a.$identity
if(!!s)return s
s=A.kL(a,b)
a.$identity=s
return s},
kL(a,b){var s
switch(b){case 0:s=a.$0
break
case 1:s=a.$1
break
case 2:s=a.$2
break
case 3:s=a.$3
break
case 4:s=a.$4
break
default:s=null}if(s!=null)return s.bind(a)
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.kg)},
j4(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.cM().constructor.prototype):Object.create(new A.b2(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.ho(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.j0(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.ho(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
j0(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.f("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.iZ)}throw A.f("Error in functionType of tearoff")},
j1(a,b,c,d){var s=A.hm
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
ho(a,b,c,d){if(c)return A.j3(a,b,d)
return A.j1(b.length,d,a,b)},
j2(a,b,c,d){var s=A.hm,r=A.j_
switch(b?-1:a){case 0:throw A.f(new A.cL("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
j3(a,b,c){var s,r
if($.hk==null)$.hk=A.hj("interceptor")
if($.hl==null)$.hl=A.hj("receiver")
s=b.length
r=A.j2(s,c,a,b)
return r},
h8(a){return A.j4(a)},
iZ(a,b){return A.fw(v.typeUniverse,A.a9(a.a),b)},
hm(a){return a.a},
j_(a){return a.b},
hj(a){var s,r,q,p=new A.b2("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.f(A.eu("Field name "+a+" not found.",null))},
il(a){return v.getIsolateTag(a)},
lP(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
kZ(a){var s,r,q,p,o,n=A.n($.im.$1(a)),m=$.fD[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.fJ[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.ae($.ih.$2(a,n))
if(q!=null){m=$.fD[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.fJ[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.fL(s)
$.fD[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.fJ[n]=s
return s}if(p==="-"){o=A.fL(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.iq(a,s)
if(p==="*")throw A.f(A.hP(n))
if(v.leafTags[n]===true){o=A.fL(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.iq(a,s)},
iq(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.hc(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
fL(a){return J.hc(a,!1,null,!!a.$icA)},
l0(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.fL(s)
else return J.hc(s,c,null,null)},
kV(){if(!0===$.ha)return
$.ha=!0
A.kW()},
kW(){var s,r,q,p,o,n,m,l
$.fD=Object.create(null)
$.fJ=Object.create(null)
A.kU()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.ir.$1(o)
if(n!=null){m=A.l0(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
kU(){var s,r,q,p,o,n,m=B.y()
m=A.bo(B.z,A.bo(B.A,A.bo(B.r,A.bo(B.r,A.bo(B.B,A.bo(B.C,A.bo(B.D(B.q),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.im=new A.fG(p)
$.ih=new A.fH(o)
$.ir=new A.fI(n)},
bo(a,b){return a(b)||b},
kN(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
jf(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.f(A.ct("Illegal RegExp pattern ("+String(o)+")",a))},
l6(a,b,c){var s=a.indexOf(b,c)
return s>=0},
l1(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bP:function bP(){},
f0:function f0(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
bO:function bO(){},
cB:function cB(a,b,c){this.a=a
this.b=b
this.c=c},
cS:function cS(a){this.a=a},
eV:function eV(a){this.a=a},
c3:function c3(a){this.a=a
this.b=null},
at:function at(){},
cj:function cj(){},
ck:function ck(){},
cP:function cP(){},
cM:function cM(){},
b2:function b2(a,b){this.a=a
this.b=b},
cL:function cL(a){this.a=a},
al:function al(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
eM:function eM(a){this.a=a},
eP:function eP(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
aH:function aH(a,b){this.a=a
this.$ti=b},
bI:function bI(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
am:function am(a,b){this.a=a
this.$ti=b},
bJ:function bJ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
fG:function fG(a){this.a=a},
fH:function fH(a){this.a=a},
fI:function fI(a){this.a=a},
cz:function cz(a,b){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null},
fm:function fm(a){this.b=a},
fX(a,b){var s=b.c
return s==null?b.c=A.c6(a,"cu",[b.x]):s},
hK(a){var s=a.w
if(s===6||s===7)return A.hK(a.x)
return s===11||s===12},
jq(a){return a.as},
fE(a){return A.fv(v.typeUniverse,a,!1)},
aT(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.aT(a1,s,a3,a4)
if(r===s)return a2
return A.i0(a1,r,!0)
case 7:s=a2.x
r=A.aT(a1,s,a3,a4)
if(r===s)return a2
return A.i_(a1,r,!0)
case 8:q=a2.y
p=A.bn(a1,q,a3,a4)
if(p===q)return a2
return A.c6(a1,a2.x,p)
case 9:o=a2.x
n=A.aT(a1,o,a3,a4)
m=a2.y
l=A.bn(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.h0(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bn(a1,j,a3,a4)
if(i===j)return a2
return A.i1(a1,k,i)
case 11:h=a2.x
g=A.aT(a1,h,a3,a4)
f=a2.y
e=A.kC(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.hZ(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bn(a1,d,a3,a4)
o=a2.x
n=A.aT(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.h1(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.f(A.ch("Attempted to substitute unexpected RTI kind "+a0))}},
bn(a,b,c,d){var s,r,q,p,o=b.length,n=A.fx(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.aT(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
kD(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.fx(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.aT(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
kC(a,b,c,d){var s,r=b.a,q=A.bn(a,r,c,d),p=b.b,o=A.bn(a,p,c,d),n=b.c,m=A.kD(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.d1()
s.a=q
s.b=o
s.c=m
return s},
u(a,b){a[v.arrayRti]=b
return a},
ik(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.kR(s)
return a.$S()}return null},
kX(a,b){var s
if(A.hK(b))if(a instanceof A.at){s=A.ik(a)
if(s!=null)return s}return A.a9(a)},
a9(a){if(a instanceof A.o)return A.A(a)
if(Array.isArray(a))return A.G(a)
return A.h3(J.aW(a))},
G(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
A(a){var s=a.$ti
return s!=null?s:A.h3(a)},
h3(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.kf(a,s)},
kf(a,b){var s=a instanceof A.at?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.k_(v.typeUniverse,s.name)
b.$ccache=r
return r},
kR(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.fv(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
kQ(a){return A.aU(A.A(a))},
kB(a){var s=a instanceof A.at?A.ik(a):null
if(s!=null)return s
if(t.dm.b(a))return J.iV(a).a
if(Array.isArray(a))return A.G(a)
return A.a9(a)},
aU(a){var s=a.r
return s==null?a.r=new A.fu(a):s},
l9(a){return A.aU(A.fv(v.typeUniverse,a,!1))},
ke(a){var s=this
s.b=A.kz(s)
return s.b(a)},
kz(a){var s,r,q,p,o
if(a===t.K)return A.km
if(A.aX(a))return A.kq
s=a.w
if(s===6)return A.kc
if(s===1)return A.ib
if(s===7)return A.kh
r=A.ky(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.aX)){a.f="$i"+q
if(q==="V")return A.kk
if(a===t.m)return A.kj
return A.kp}}else if(s===10){p=A.kN(a.x,a.y)
o=p==null?A.ib:p
return o==null?A.cb(o):o}return A.ka},
ky(a){if(a.w===8){if(a===t.S)return A.h6
if(a===t.i||a===t.H)return A.kl
if(a===t.N)return A.ko
if(a===t.y)return A.h4}return null},
kd(a){var s=this,r=A.k9
if(A.aX(s))r=A.k6
else if(s===t.K)r=A.cb
else if(A.br(s)){r=A.kb
if(s===t.h6)r=A.i4
else if(s===t.dk)r=A.ae
else if(s===t.fQ)r=A.k1
else if(s===t.cg)r=A.i5
else if(s===t.cD)r=A.k3
else if(s===t.an)r=A.k5}else if(s===t.S)r=A.ca
else if(s===t.N)r=A.n
else if(s===t.y)r=A.h2
else if(s===t.H)r=A.p
else if(s===t.i)r=A.k2
else if(s===t.m)r=A.k4
s.a=r
return s.a(a)},
ka(a){var s=this
if(a==null)return A.br(s)
return A.io(v.typeUniverse,A.kX(a,s),s)},
kc(a){if(a==null)return!0
return this.x.b(a)},
kp(a){var s,r=this
if(a==null)return A.br(r)
s=r.f
if(a instanceof A.o)return!!a[s]
return!!J.aW(a)[s]},
kk(a){var s,r=this
if(a==null)return A.br(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.o)return!!a[s]
return!!J.aW(a)[s]},
kj(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.o)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
ia(a){if(typeof a=="object"){if(a instanceof A.o)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
k9(a){var s=this
if(a==null){if(A.br(s))return a}else if(s.b(a))return a
throw A.N(A.i7(a,s),new Error())},
kb(a){var s=this
if(a==null||s.b(a))return a
throw A.N(A.i7(a,s),new Error())},
i7(a,b){return new A.bl("TypeError: "+A.hR(a,A.Y(b,null)))},
ij(a,b,c,d){if(A.io(v.typeUniverse,a,b))return a
throw A.N(A.jR("The type argument '"+A.Y(a,null)+"' is not a subtype of the type variable bound '"+A.Y(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
hR(a,b){return A.cr(a)+": type '"+A.Y(A.kB(a),null)+"' is not a subtype of type '"+b+"'"},
jR(a){return new A.bl("TypeError: "+a)},
a8(a,b){return new A.bl("TypeError: "+A.hR(a,b))},
kh(a){var s=this
return s.x.b(a)||A.fX(v.typeUniverse,s).b(a)},
km(a){return a!=null},
cb(a){if(a!=null)return a
throw A.N(A.a8(a,"Object"),new Error())},
kq(a){return!0},
k6(a){return a},
ib(a){return!1},
h4(a){return!0===a||!1===a},
h2(a){if(!0===a)return!0
if(!1===a)return!1
throw A.N(A.a8(a,"bool"),new Error())},
k1(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.N(A.a8(a,"bool?"),new Error())},
k2(a){if(typeof a=="number")return a
throw A.N(A.a8(a,"double"),new Error())},
k3(a){if(typeof a=="number")return a
if(a==null)return a
throw A.N(A.a8(a,"double?"),new Error())},
h6(a){return typeof a=="number"&&Math.floor(a)===a},
ca(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.N(A.a8(a,"int"),new Error())},
i4(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.N(A.a8(a,"int?"),new Error())},
kl(a){return typeof a=="number"},
p(a){if(typeof a=="number")return a
throw A.N(A.a8(a,"num"),new Error())},
i5(a){if(typeof a=="number")return a
if(a==null)return a
throw A.N(A.a8(a,"num?"),new Error())},
ko(a){return typeof a=="string"},
n(a){if(typeof a=="string")return a
throw A.N(A.a8(a,"String"),new Error())},
ae(a){if(typeof a=="string")return a
if(a==null)return a
throw A.N(A.a8(a,"String?"),new Error())},
k4(a){if(A.ia(a))return a
throw A.N(A.a8(a,"JSObject"),new Error())},
k5(a){if(a==null)return a
if(A.ia(a))return a
throw A.N(A.a8(a,"JSObject?"),new Error())},
ie(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.Y(a[q],b)
return s},
ku(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.ie(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.Y(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
i8(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.u([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.a.l(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.j(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.Y(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.Y(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.Y(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.Y(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.Y(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
Y(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.Y(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.Y(a.x,b)+">"
if(l===8){p=A.kE(a.x)
o=a.y
return o.length>0?p+("<"+A.ie(o,b)+">"):p}if(l===10)return A.ku(a,b)
if(l===11)return A.i8(a,b,null)
if(l===12)return A.i8(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.j(b,n)
return b[n]}return"?"},
kE(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
k0(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
k_(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.fv(a,b,!1)
else if(typeof m=="number"){s=m
r=A.c7(a,5,"#")
q=A.fx(s)
for(p=0;p<s;++p)q[p]=r
o=A.c6(a,b,q)
n[b]=o
return o}else return m},
jY(a,b){return A.i2(a.tR,b)},
jX(a,b){return A.i2(a.eT,b)},
fv(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.hW(A.hU(a,null,b,!1))
r.set(b,s)
return s},
fw(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.hW(A.hU(a,b,c,!0))
q.set(c,r)
return r},
jZ(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.h0(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
ax(a,b){b.a=A.kd
b.b=A.ke
return b},
c7(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.ac(null,null)
s.w=b
s.as=c
r=A.ax(a,s)
a.eC.set(c,r)
return r},
i0(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.jV(a,b,r,c)
a.eC.set(r,s)
return s},
jV(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.aX(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.br(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.ac(null,null)
q.w=6
q.x=b
q.as=c
return A.ax(a,q)},
i_(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.jT(a,b,r,c)
a.eC.set(r,s)
return s},
jT(a,b,c,d){var s,r
if(d){s=b.w
if(A.aX(b)||b===t.K)return b
else if(s===1)return A.c6(a,"cu",[b])
else if(b===t.a||b===t.T)return t.eH}r=new A.ac(null,null)
r.w=7
r.x=b
r.as=c
return A.ax(a,r)},
jW(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.ac(null,null)
s.w=13
s.x=b
s.as=q
r=A.ax(a,s)
a.eC.set(q,r)
return r},
c5(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
jS(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
c6(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.c5(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.ac(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.ax(a,r)
a.eC.set(p,q)
return q},
h0(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.c5(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.ac(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.ax(a,o)
a.eC.set(q,n)
return n},
i1(a,b,c){var s,r,q="+"+(b+"("+A.c5(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.ac(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.ax(a,s)
a.eC.set(q,r)
return r},
hZ(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.c5(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.c5(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.jS(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.ac(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.ax(a,p)
a.eC.set(r,o)
return o},
h1(a,b,c,d){var s,r=b.as+("<"+A.c5(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.jU(a,b,c,r,d)
a.eC.set(r,s)
return s},
jU(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.fx(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.aT(a,b,r,0)
m=A.bn(a,c,r,0)
return A.h1(a,n,m,c!==m)}}l=new A.ac(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.ax(a,l)},
hU(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
hW(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.jK(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.hV(a,r,l,k,!1)
else if(q===46)r=A.hV(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.aS(a.u,a.e,k.pop()))
break
case 94:k.push(A.jW(a.u,k.pop()))
break
case 35:k.push(A.c7(a.u,5,"#"))
break
case 64:k.push(A.c7(a.u,2,"@"))
break
case 126:k.push(A.c7(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.jM(a,k)
break
case 38:A.jL(a,k)
break
case 63:p=a.u
k.push(A.i0(p,A.aS(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.i_(p,A.aS(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.jJ(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.hX(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.jO(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-2)
break
case 43:n=l.indexOf("(",r)
k.push(l.substring(r,n))
k.push(-4)
k.push(a.p)
a.p=k.length
r=n+1
break
default:throw"Bad character "+q}}}m=k.pop()
return A.aS(a.u,a.e,m)},
jK(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
hV(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.k0(s,o.x)[p]
if(n==null)A.bs('No "'+p+'" in "'+A.jq(o)+'"')
d.push(A.fw(s,o,n))}else d.push(p)
return m},
jM(a,b){var s,r=a.u,q=A.hT(a,b),p=b.pop()
if(typeof p=="string")b.push(A.c6(r,p,q))
else{s=A.aS(r,a.e,p)
switch(s.w){case 11:b.push(A.h1(r,s,q,a.n))
break
default:b.push(A.h0(r,s,q))
break}}},
jJ(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.hT(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.aS(p,a.e,o)
q=new A.d1()
q.a=s
q.b=n
q.c=m
b.push(A.hZ(p,r,q))
return
case-4:b.push(A.i1(p,b.pop(),s))
return
default:throw A.f(A.ch("Unexpected state under `()`: "+A.c(o)))}},
jL(a,b){var s=b.pop()
if(0===s){b.push(A.c7(a.u,1,"0&"))
return}if(1===s){b.push(A.c7(a.u,4,"1&"))
return}throw A.f(A.ch("Unexpected extended operation "+A.c(s)))},
hT(a,b){var s=b.splice(a.p)
A.hX(a.u,a.e,s)
a.p=b.pop()
return s},
aS(a,b,c){if(typeof c=="string")return A.c6(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.jN(a,b,c)}else return c},
hX(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.aS(a,b,c[s])},
jO(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.aS(a,b,c[s])},
jN(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.f(A.ch("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.f(A.ch("Bad index "+c+" for "+b.j(0)))},
io(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.M(a,b,null,c,null)
r.set(c,s)}return s},
M(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.aX(d))return!0
s=b.w
if(s===4)return!0
if(A.aX(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.M(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.M(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.M(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.M(a,b.x,c,d,e))return!1
return A.M(a,A.fX(a,b),c,d,e)}if(s===6)return A.M(a,p,c,d,e)&&A.M(a,b.x,c,d,e)
if(q===7){if(A.M(a,b,c,d.x,e))return!0
return A.M(a,b,c,A.fX(a,d),e)}if(q===6)return A.M(a,b,c,p,e)||A.M(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.Y)return!0
o=s===10
if(o&&d===t.gT)return!0
if(q===12){if(b===t.L)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.M(a,j,c,i,e)||!A.M(a,i,e,j,c))return!1}return A.i9(a,b.x,c,d.x,e)}if(q===11){if(b===t.L)return!0
if(p)return!1
return A.i9(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.ki(a,b,c,d,e)}if(o&&q===10)return A.kn(a,b,c,d,e)
return!1},
i9(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.M(a3,a4.x,a5,a6.x,a7))return!1
s=a4.y
r=a6.y
q=s.a
p=r.a
o=q.length
n=p.length
if(o>n)return!1
m=n-o
l=s.b
k=r.b
j=l.length
i=k.length
if(o+j<n+i)return!1
for(h=0;h<o;++h){g=q[h]
if(!A.M(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.M(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.M(a3,k[h],a7,g,a5))return!1}f=s.c
e=r.c
d=f.length
c=e.length
for(b=0,a=0;a<c;a+=3){a0=e[a]
for(;;){if(b>=d)return!1
a1=f[b]
b+=3
if(a0<a1)return!1
a2=f[b-2]
if(a1<a0){if(a2)return!1
continue}g=e[a+1]
if(a2&&!g)return!1
g=f[b-1]
if(!A.M(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
ki(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.fw(a,b,r[o])
return A.i3(a,p,null,c,d.y,e)}return A.i3(a,b.y,null,c,d.y,e)},
i3(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.M(a,b[s],d,e[s],f))return!1
return!0},
kn(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.M(a,r[s],c,q[s],e))return!1
return!0},
br(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.aX(a))if(s!==6)r=s===7&&A.br(a.x)
return r},
aX(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
i2(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
fx(a){return a>0?new Array(a):v.typeUniverse.sEA},
ac:function ac(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
d1:function d1(){this.c=this.b=this.a=null},
fu:function fu(a){this.a=a},
d_:function d_(){},
bl:function bl(a){this.a=a},
jy(){var s,r,q
if(self.scheduleImmediate!=null)return A.kI()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.bp(new A.f4(s),1)).observe(r,{childList:true})
return new A.f3(s,r,q)}else if(self.setImmediate!=null)return A.kJ()
return A.kK()},
jz(a){self.scheduleImmediate(A.bp(new A.f5(t.M.a(a)),0))},
jA(a){self.setImmediate(A.bp(new A.f6(t.M.a(a)),0))},
jB(a){A.fZ(B.H,t.M.a(a))},
fZ(a,b){var s=B.c.V(a.a,1000)
return A.jP(s,b)},
hN(a,b){var s=B.c.V(a.a,1000)
return A.jQ(s,b)},
jP(a,b){var s=new A.c4(!0)
s.bK(a,b)
return s},
jQ(a,b){var s=new A.c4(!1)
s.bL(a,b)
return s},
fO(a){var s
if(t.W.b(a)){s=a.gai()
if(s!=null)return s}return B.F},
jD(a,b,c){var s,r,q,p={},o=p.a=a
for(s=t._;r=o.a,(r&4)!==0;o=a){a=s.a(o.c)
p.a=a}if(o===b){s=A.jr()
b.bP(new A.ai(new A.aa(!0,o,null,"Cannot complete a future with itself"),s))
return}s=r|b.a&1
o.a=s
if((s&24)===0){q=t.F.a(b.c)
b.a=b.a&1|4
b.c=o
o.ba(q)
return}q=b.ak()
b.aj(p.a)
A.bk(b,q)
return},
bk(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.n,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.fA(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.bk(d.a,c)
q.a=l
k=l.a}p=d.a
j=p.c
q.b=n
q.c=j
if(o){i=c.c
i=(i&1)!==0||(i&15)===8}else i=!0
if(i){h=c.b.b
if(n){p=p.b===h
p=!(p||p)}else p=!1
if(p){s.a(j)
A.fA(j.a,j.b)
return}g=$.L
if(g!==h)$.L=h
else g=null
c=c.c
if((c&15)===8)new A.fe(q,d,n).$0()
else if(o){if((c&1)!==0)new A.fd(q,j).$0()}else if((c&2)!==0)new A.fc(d,q).$0()
if(g!=null)$.L=g
c=q.c
if(c instanceof A.a7){p=q.a.$ti
p=p.i("cu<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.al(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.jD(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.al(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
kv(a,b){var s=t.Q
if(s.b(a))return s.a(a)
s=t.v
if(s.b(a))return s.a(a)
throw A.f(A.ev(a,"onError",u.c))},
ks(){var s,r
for(s=$.bm;s!=null;s=$.bm){$.cd=null
r=s.b
$.bm=r
if(r==null)$.cc=null
s.a.$0()}},
kA(){$.h5=!0
try{A.ks()}finally{$.cd=null
$.h5=!1
if($.bm!=null)$.hf().$1(A.ii())}},
ig(a){var s=new A.cU(a),r=$.cc
if(r==null){$.bm=$.cc=s
if(!$.h5)$.hf().$1(A.ii())}else $.cc=r.b=s},
kx(a){var s,r,q,p=$.bm
if(p==null){A.ig(a)
$.cd=$.cc
return}s=new A.cU(a)
r=$.cd
if(r==null){s.b=p
$.bm=$.cd=s}else{q=r.b
s.b=q
$.cd=r.b=s
if(q==null)$.cc=s}},
jv(a,b){var s=$.L
if(s===B.h)return A.fZ(a,t.M.a(b))
return A.fZ(a,t.M.a(s.bi(b)))},
jw(a,b){var s=$.L
if(s===B.h)return A.hN(a,t.cB.a(b))
return A.hN(a,t.cB.a(s.bj(b,t.D)))},
fA(a,b){A.kx(new A.fB(a,b))},
ic(a,b,c,d,e){var s,r=$.L
if(r===c)return d.$0()
$.L=c
s=r
try{r=d.$0()
return r}finally{$.L=s}},
id(a,b,c,d,e,f,g){var s,r=$.L
if(r===c)return d.$1(e)
$.L=c
s=r
try{r=d.$1(e)
return r}finally{$.L=s}},
kw(a,b,c,d,e,f,g,h,i){var s,r=$.L
if(r===c)return d.$2(e,f)
$.L=c
s=r
try{r=d.$2(e,f)
return r}finally{$.L=s}},
h7(a,b,c,d){t.M.a(d)
if(B.h!==c){d=c.bi(d)
d=d}A.ig(d)},
f4:function f4(a){this.a=a},
f3:function f3(a,b,c){this.a=a
this.b=b
this.c=c},
f5:function f5(a){this.a=a},
f6:function f6(a){this.a=a},
c4:function c4(a){this.a=a
this.b=null
this.c=0},
ft:function ft(a,b){this.a=a
this.b=b},
fs:function fs(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ai:function ai(a,b){this.a=a
this.b=b},
bZ:function bZ(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
a7:function a7(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
f9:function f9(a,b){this.a=a
this.b=b},
fb:function fb(a,b){this.a=a
this.b=b},
fa:function fa(a,b){this.a=a
this.b=b},
fe:function fe(a,b,c){this.a=a
this.b=b
this.c=c},
ff:function ff(a,b){this.a=a
this.b=b},
fg:function fg(a){this.a=a},
fd:function fd(a,b){this.a=a
this.b=b},
fc:function fc(a,b){this.a=a
this.b=b},
cU:function cU(a){this.a=a
this.b=null},
bS:function bS(){},
eZ:function eZ(a,b){this.a=a
this.b=b},
f_:function f_(a,b){this.a=a
this.b=b},
c9:function c9(){},
d9:function d9(){},
fn:function fn(a,b){this.a=a
this.b=b},
fo:function fo(a,b,c){this.a=a
this.b=b
this.c=c},
fB:function fB(a,b){this.a=a
this.b=b},
hy(a,b){return new A.al(a.i("@<0>").G(b).i("al<1,2>"))},
D(a,b,c){return b.i("@<0>").G(c).i("hx<1,2>").a(A.kO(a,new A.al(b.i("@<0>").G(c).i("al<1,2>"))))},
cE(a,b){return new A.al(a.i("@<0>").G(b).i("al<1,2>"))},
bK(a){return new A.c_(a.i("c_<0>"))},
h_(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
jI(a,b,c){var s=new A.aR(a,b,c.i("aR<0>"))
s.c=a.e
return s},
hz(a,b,c){var s=A.hy(b,c)
J.fM(a,new A.eQ(s,b,c))
return s},
hA(a,b){var s,r,q=A.bK(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.hd)(a),++r)q.l(0,b.a(a[r]))
return q},
hC(a){var s,r
if(A.hb(a))return"{...}"
s=new A.be("")
try{r={}
B.a.l($.a3,a)
s.a+="{"
r.a=!0
J.fM(a,new A.eS(r,s))
s.a+="}"}finally{if(0>=$.a3.length)return A.j($.a3,-1)
$.a3.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
c_:function c_(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
d5:function d5(a){this.a=a
this.c=this.b=null},
aR:function aR(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
eQ:function eQ(a,b,c){this.a=a
this.b=b
this.c=c},
P:function P(){},
x:function x(){},
eR:function eR(a){this.a=a},
eS:function eS(a,b){this.a=a
this.b=b},
bh:function bh(){},
as:function as(){},
a2:function a2(){},
c1:function c1(){},
kt(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.ay(r)
q=A.ct(String(s),null)
throw A.f(q)}q=A.fz(p)
return q},
fz(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.d3(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.fz(a[s])
return a},
hw(a,b,c){return new A.bG(a,b)},
k7(a){return a.cM()},
jG(a,b){return new A.fj(a,[],A.kM())},
jH(a,b,c){var s,r=new A.be(""),q=A.jG(r,b)
q.aB(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
d3:function d3(a,b){this.a=a
this.b=b
this.c=null},
d4:function d4(a){this.a=a},
cl:function cl(){},
cn:function cn(){},
bG:function bG(a,b){this.a=a
this.b=b},
cD:function cD(a,b){this.a=a
this.b=b},
cC:function cC(){},
eO:function eO(a){this.b=a},
eN:function eN(a){this.a=a},
fk:function fk(){},
fl:function fl(a,b){this.a=a
this.b=b},
fj:function fj(a,b,c){this.c=a
this.a=b
this.b=c},
dh(a){var s=A.hG(a,null)
if(s!=null)return s
throw A.f(A.ct(a,null))},
j8(a,b){a=A.N(a,new Error())
if(a==null)a=A.cb(a)
a.stack=b.j(0)
throw a},
hB(a,b,c,d){var s,r=c?J.hu(a,d):J.ht(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
aK(a,b){var s,r=A.u([],b.i("K<0>"))
for(s=J.bu(a);s.q();)B.a.l(r,b.a(s.gu()))
return r},
b6(a,b){var s,r=A.u([],b.i("K<0>"))
for(s=a.gB(a);s.q();)B.a.l(r,s.gu())
return r},
hJ(a){return new A.cz(a,A.jf(a,!1,!0,!1,!1,""))},
hL(a,b,c){var s=J.bu(b)
if(!s.q())return a
if(c.length===0){do a+=A.c(s.gu())
while(s.q())}else{a+=A.c(s.gu())
while(s.q())a=a+c+A.c(s.gu())}return a},
jr(){return A.bq(new Error())},
j5(a,b,c,d,e,f,g,h,i){var s="microsecond",r=A.jm(a,b,c,d,e,f,g,h,i)
if(r==null)return null
if(h>999)A.bs(A.ao(h,0,999,s,null))
if(r<-864e13||r>864e13)A.bs(A.ao(r,-864e13,864e13,"millisecondsSinceEpoch",null))
if(r===864e13&&h!==0)A.bs(A.ev(h,s,"Time including microseconds is outside valid range"))
A.fC(i,"isUtc",t.y)
return new A.a6(r,h,i)},
bv(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=$.ix().ck(a)
if(c!=null){s=new A.eH()
r=c.b
if(1>=r.length)return A.j(r,1)
q=r[1]
q.toString
p=A.dh(q)
if(2>=r.length)return A.j(r,2)
q=r[2]
q.toString
o=A.dh(q)
if(3>=r.length)return A.j(r,3)
q=r[3]
q.toString
n=A.dh(q)
if(4>=r.length)return A.j(r,4)
m=s.$1(r[4])
if(5>=r.length)return A.j(r,5)
l=s.$1(r[5])
if(6>=r.length)return A.j(r,6)
k=s.$1(r[6])
if(7>=r.length)return A.j(r,7)
j=new A.eI().$1(r[7])
i=B.c.V(j,1000)
q=r.length
if(8>=q)return A.j(r,8)
h=r[8]!=null
if(h){if(9>=q)return A.j(r,9)
g=r[9]
if(g!=null){f=g==="-"?-1:1
if(10>=q)return A.j(r,10)
q=r[10]
q.toString
e=A.dh(q)
if(11>=r.length)return A.j(r,11)
l-=f*(s.$1(r[11])+60*e)}}d=A.j5(p,o,n,m,l,k,i,j%1000,h)
if(d==null)throw A.f(A.ct("Time out of range",a))
return d}else throw A.f(A.ct("Invalid date format",a))},
hp(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
j6(a){var s=Math.abs(a),r=a<0?"-":"+"
if(s>=1e5)return r+s
return r+"0"+s},
eG(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
aj(a){if(a>=10)return""+a
return"0"+a},
hq(a,b){return new A.bx(1000*a+1e6*b)},
cr(a){if(typeof a=="number"||A.h4(a)||a==null)return J.I(a)
if(typeof a=="string")return JSON.stringify(a)
return A.jl(a)},
j9(a,b){A.fC(a,"error",t.K)
A.fC(b,"stackTrace",t.l)
A.j8(a,b)},
ch(a){return new A.cg(a)},
eu(a,b){return new A.aa(!1,null,b,a)},
ev(a,b,c){return new A.aa(!0,a,b,c)},
jn(a){var s=null
return new A.ba(s,s,!1,s,s,a)},
hH(a,b){return new A.ba(null,null,!0,a,b,"Value not in range")},
ao(a,b,c,d,e){return new A.ba(b,c,!0,a,d,"Invalid value")},
jo(a,b,c){if(0>a||a>c)throw A.f(A.ao(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.f(A.ao(b,a,c,"end",null))
return b}return c},
fW(a,b){if(a<0)throw A.f(A.ao(a,0,null,b,null))
return a},
bB(a,b,c,d,e){return new A.cv(b,!0,a,e,"Index out of range")},
cT(a){return new A.bV(a)},
hP(a){return new A.cR(a)},
fY(a){return new A.bd(a)},
Q(a){return new A.cm(a)},
ct(a,b){return new A.eK(a,b)},
jb(a,b,c){var s,r
if(A.hb(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.u([],t.s)
B.a.l($.a3,a)
try{A.kr(a,s)}finally{if(0>=$.a3.length)return A.j($.a3,-1)
$.a3.pop()}r=A.hL(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
fT(a,b,c){var s,r
if(A.hb(a))return b+"..."+c
s=new A.be(b)
B.a.l($.a3,a)
try{r=s
r.a=A.hL(r.a,a,", ")}finally{if(0>=$.a3.length)return A.j($.a3,-1)
$.a3.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
kr(a,b){var s,r,q,p,o,n,m,l=a.gB(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.q())return
s=A.c(l.gu())
B.a.l(b,s)
k+=s.length+2;++j}if(!l.q()){if(j<=5)return
if(0>=b.length)return A.j(b,-1)
r=b.pop()
if(0>=b.length)return A.j(b,-1)
q=b.pop()}else{p=l.gu();++j
if(!l.q()){if(j<=4){B.a.l(b,A.c(p))
return}r=A.c(p)
if(0>=b.length)return A.j(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gu();++j
for(;l.q();p=o,o=n){n=l.gu();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.j(b,-1)
k-=b.pop().length+2;--j}B.a.l(b,"...")
return}}q=A.c(p)
r=A.c(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.j(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.a.l(b,m)
B.a.l(b,q)
B.a.l(b,r)},
jj(a,b){var s=B.c.gD(a)
b=B.c.gD(b)
b=A.ju(A.hM(A.hM($.iN(),s),b))
return b},
a6:function a6(a,b,c){this.a=a
this.b=b
this.c=c},
eH:function eH(){},
eI:function eI(){},
bx:function bx(a){this.a=a},
C:function C(){},
cg:function cg(a){this.a=a},
aq:function aq(){},
aa:function aa(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ba:function ba(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
cv:function cv(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
bV:function bV(a){this.a=a},
cR:function cR(a){this.a=a},
bd:function bd(a){this.a=a},
cm:function cm(a){this.a=a},
cF:function cF(){},
bQ:function bQ(){},
f8:function f8(a){this.a=a},
eK:function eK(a,b){this.a=a
this.b=b},
i:function i(){},
an:function an(a,b,c){this.a=a
this.b=b
this.$ti=c},
W:function W(){},
o:function o(){},
dc:function dc(){},
be:function be(a){this.a=a},
j7(a,b,c){var s,r=document.body
r.toString
s=t.ac
return t.h.a(new A.H(new A.X(B.p.L(r,a,b,c)),s.i("B(P.E)").a(new A.eJ()),s.i("H<P.E>")).ga2(0))},
bz(a){var s,r,q="element tag unavailable"
try{s=a.tagName
s.toString
q=s}catch(r){}return q},
z(a,b,c,d,e){var s=A.kG(new A.f7(c),t.A)
if(s!=null)J.iS(a,b,s,!1)
return new A.d0(a,b,s,!1,e.i("d0<0>"))},
hS(a){var s=document.createElement("a")
s.toString
s=new A.da(s,t.a_.a(window.location))
s=new A.aQ(s)
s.bI(a)
return s},
jE(a,b,c,d){t.h.a(a)
A.n(b)
A.n(c)
t.J.a(d)
return!0},
jF(a,b,c,d){var s,r,q,p,o,n
t.h.a(a)
A.n(b)
A.n(c)
s=t.J.a(d).a
r=s.a
B.x.scn(r,c)
q=r.hostname
s=s.b
p=!1
if(q==s.hostname){o=r.port
n=s.port
n.toString
if(o===n){p=r.protocol
s=s.protocol
s.toString
s=p===s}else s=p}else s=p
if(!s){s=!1
if(q==="")if(r.port===""){s=r.protocol
s=s===":"||s===""}}else s=!0
return s},
hY(){var s=t.N,r=A.hA(B.u,s),q=A.u(["TEMPLATE"],t.s),p=t.d.a(new A.fr())
s=new A.de(r,A.bK(s),A.bK(s),A.bK(s),null)
s.bJ(null,new A.a0(B.u,p,t.e),q,null)
return s},
i6(a){var s,r="postMessage" in a
r.toString
if(r){s=A.jC(a)
return s}else return t.ch.a(a)},
jC(a){var s=window
s.toString
if(a===s)return t.ci.a(a)
else return new A.cX()},
kG(a,b){var s=$.L
if(s===B.h)return a
return s.bj(a,b)},
d:function d(){},
b0:function b0(){},
cf:function cf(){},
b1:function b1(){},
aA:function aA(){},
b3:function b3(){},
af:function af(){},
aB:function aB(){},
ex:function ex(){},
aC:function aC(){},
cp:function cp(){},
bw:function bw(){},
cq:function cq(){},
bj:function bj(a,b){this.a=a
this.$ti=b},
t:function t(){},
eJ:function eJ(){},
b:function b(){},
y:function y(){},
cs:function cs(){},
bA:function bA(){},
aF:function aF(){},
b7:function b7(){},
a_:function a_(){},
X:function X(a){this.a=a},
h:function h(){},
bM:function bM(){},
aN:function aN(){},
bR:function bR(){},
eY:function eY(a){this.a=a},
bU:function bU(){},
cN:function cN(){},
cO:function cO(){},
bf:function bf(){},
aO:function aO(){},
ad:function ad(){},
bX:function bX(){},
bi:function bi(){},
c0:function c0(){},
cV:function cV(){},
cY:function cY(a){this.a=a},
cZ:function cZ(a){this.a=a},
fR:function fR(a,b){this.a=a
this.$ti=b},
bY:function bY(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
aP:function aP(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
d0:function d0(a,b,c,d,e){var _=this
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
f7:function f7(a){this.a=a},
aQ:function aQ(a){this.a=a},
ag:function ag(){},
bN:function bN(a){this.a=a},
eU:function eU(a){this.a=a},
eT:function eT(a,b,c){this.a=a
this.b=b
this.c=c},
c2:function c2(){},
fp:function fp(){},
fq:function fq(){},
de:function de(a,b,c,d,e){var _=this
_.e=a
_.a=b
_.b=c
_.c=d
_.d=e},
fr:function fr(){},
dd:function dd(){},
aD:function aD(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.d=null
_.$ti=c},
cX:function cX(){},
da:function da(a,b){this.a=a
this.b=b},
c8:function c8(a){this.a=a
this.b=0},
fy:function fy(a){this.a=a},
cW:function cW(){},
d7:function d7(){},
d8:function d8(){},
db:function db(){},
df:function df(){},
dg:function dg(){},
fP(){var s=window.navigator.userAgent
s.toString
return s},
co:function co(){},
ew:function ew(a){this.a=a},
fh:function fh(){},
bb:function bb(){},
ci:function ci(a){this.a=a},
e:function e(){},
l_(){var s=document
s.toString
B.t.c6(s,"DOMContentLoaded",new A.fK())},
fK:function fK(){},
dl:function dl(){var _=this
_.a=null
_.b="view-dashboard"
_.d=_.c=null
_.ax=_.at=_.as=_.Q=_.z=_.y=_.x=_.w=_.r=_.f=_.e=$
_.ch=_.ay=null},
dS:function dS(){},
dR:function dR(a){this.a=a},
dr:function dr(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dq:function dq(a){this.a=a},
ds:function ds(a,b){this.a=a
this.b=b},
dp:function dp(){},
dt:function dt(a){this.a=a},
dE:function dE(a){this.a=a},
dF:function dF(a){this.a=a},
dG:function dG(a){this.a=a},
dn:function dn(){},
dH:function dH(a){this.a=a},
dI:function dI(a){this.a=a},
dm:function dm(a,b){this.a=a
this.b=b},
dJ:function dJ(a){this.a=a},
dK:function dK(a){this.a=a},
dL:function dL(a){this.a=a},
du:function du(a){this.a=a},
dv:function dv(a,b){this.a=a
this.b=b},
dw:function dw(a,b){this.a=a
this.b=b},
dx:function dx(a,b){this.a=a
this.b=b},
dy:function dy(a,b,c){this.a=a
this.b=b
this.c=c},
dz:function dz(a,b,c){this.a=a
this.b=b
this.c=c},
dA:function dA(a,b,c){this.a=a
this.b=b
this.c=c},
dB:function dB(a){this.a=a},
dC:function dC(a){this.a=a},
dD:function dD(a){this.a=a},
es:function es(a){this.a=a},
et:function et(a){this.a=a},
e2:function e2(){},
e3:function e3(a,b){this.a=a
this.b=b},
e1:function e1(a,b){this.a=a
this.b=b},
e4:function e4(a,b){this.a=a
this.b=b},
e0:function e0(a){this.a=a},
e5:function e5(a,b){this.a=a
this.b=b},
dZ:function dZ(a){this.a=a},
e_:function e_(a,b){this.a=a
this.b=b},
e6:function e6(a,b,c){this.a=a
this.b=b
this.c=c},
dW:function dW(a){this.a=a},
dX:function dX(a){this.a=a},
dY:function dY(a,b){this.a=a
this.b=b},
e7:function e7(a,b,c){this.a=a
this.b=b
this.c=c},
dU:function dU(a){this.a=a},
dV:function dV(){},
e9:function e9(a,b,c){this.a=a
this.b=b
this.c=c},
ea:function ea(a,b){this.a=a
this.b=b},
e8:function e8(a,b){this.a=a
this.b=b},
ei:function ei(){},
ej:function ej(a,b,c){this.a=a
this.b=b
this.c=c},
ek:function ek(){},
el:function el(){},
em:function em(a,b){this.a=a
this.b=b},
eb:function eb(a){this.a=a},
ec:function ec(a,b){this.a=a
this.b=b},
ed:function ed(){},
ee:function ee(a){this.a=a},
ef:function ef(a){this.a=a},
dM:function dM(a){this.a=a},
dN:function dN(a){this.a=a},
dO:function dO(a){this.a=a},
dP:function dP(a,b){this.a=a
this.b=b},
dQ:function dQ(a){this.a=a},
eo:function eo(a){this.a=a},
ep:function ep(a,b,c){this.a=a
this.b=b
this.c=c},
en:function en(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dT:function dT(a,b){this.a=a
this.b=b},
er:function er(a){this.a=a},
eq:function eq(){},
eg:function eg(){},
eh:function eh(a,b){this.a=a
this.b=b},
ey:function ey(){},
eB:function eB(a){this.a=a},
eE:function eE(a){this.a=a},
eD:function eD(a){this.a=a},
eF:function eF(a){this.a=a},
ez:function ez(a){this.a=a},
eA:function eA(){},
eC:function eC(a,b){this.a=a
this.b=b},
l7(a){throw A.N(new A.bH("Field '"+a+"' has been assigned during initialization."),new Error())},
O(){throw A.N(A.jg(""),new Error())}},B={}
var w=[A,J,B]
var $={}
A.fU.prototype={}
J.bC.prototype={
a0(a,b){return a===b},
gD(a){return A.cJ(a)},
j(a){return"Instance of '"+A.cK(a)+"'"},
ga_(a){return A.aU(A.h3(this))}}
J.cx.prototype={
j(a){return String(a)},
gD(a){return a?519018:218159},
ga_(a){return A.aU(t.y)},
$iap:1,
$iB:1}
J.bE.prototype={
a0(a,b){return null==b},
j(a){return"null"},
gD(a){return 0},
$iap:1}
J.U.prototype={$il:1}
J.av.prototype={
gD(a){return 0},
j(a){return String(a)}}
J.cG.prototype={}
J.bg.prototype={}
J.ak.prototype={
j(a){var s=a[$.iw()]
if(s==null)s=a[$.iv()]
if(s==null)return this.bF(a)
return"JavaScript function for "+J.I(s)},
$iaE:1}
J.b4.prototype={
gD(a){return 0},
j(a){return String(a)}}
J.b5.prototype={
gD(a){return 0},
j(a){return String(a)}}
J.K.prototype={
l(a,b){A.G(a).c.a(b)
a.$flags&1&&A.di(a,29)
a.push(b)},
bm(a,b,c){var s
A.G(a).c.a(c)
a.$flags&1&&A.di(a,"insert",2)
s=a.length
if(b>s)throw A.f(A.hH(b,null))
a.splice(b,0,c)},
cc(a){a.$flags&1&&A.di(a,"clear","clear")
a.length=0},
p(a,b){var s,r
A.G(a).i("~(1)").a(b)
s=a.length
for(r=0;r<s;++r){b.$1(a[r])
if(a.length!==s)throw A.f(A.Q(a))}},
ar(a,b,c){var s=A.G(a)
return new A.a0(a,s.G(c).i("1(2)").a(b),s.i("@<1>").G(c).i("a0<1,2>"))},
cu(a,b){var s,r,q
A.G(a).i("1(1,1)").a(b)
s=a.length
if(s===0)throw A.f(A.fS())
if(0>=s)return A.j(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.f(A.Q(a))}return r},
bk(a,b,c){var s,r,q,p=A.G(a)
p.i("B(1)").a(b)
p.i("1()?").a(c)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.f(A.Q(a))}if(c!=null)return c.$0()
throw A.f(A.fS())},
cl(a,b){return this.bk(a,b,null)},
I(a,b){if(!(b>=0&&b<a.length))return A.j(a,b)
return a[b]},
am(a,b){var s,r
A.G(a).i("B(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.f(A.Q(a))}return!1},
bB(a,b){var s,r,q,p,o,n=A.G(a)
n.i("F(1,1)?").a(b)
a.$flags&2&&A.di(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.cL()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.bp(b,2))
if(p>0)this.bZ(a,p)},
bZ(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
v(a,b){var s
for(s=0;s<a.length;++s)if(J.q(a[s],b))return!0
return!1},
gC(a){return a.length===0},
gM(a){return a.length!==0},
j(a){return A.fT(a,"[","]")},
gB(a){return new J.az(a,a.length,A.G(a).i("az<1>"))},
gD(a){return A.cJ(a)},
gk(a){return a.length},
h(a,b){if(!(b>=0&&b<a.length))throw A.f(A.h9(a,b))
return a[b]},
n(a,b,c){var s
A.G(a).c.a(c)
a.$flags&2&&A.di(a)
s=a.length
if(b>=s)throw A.f(A.h9(a,b))
a[b]=c},
co(a,b){var s
A.G(a).i("B(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$iw:1,
$ii:1,
$iV:1}
J.cw.prototype={
cH(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.cK(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.eL.prototype={}
J.az.prototype={
gu(){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.hd(q)
throw A.f(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iZ:1}
J.bF.prototype={
W(a,b){var s
A.p(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaq(b)
if(this.gaq(a)===s)return 0
if(this.gaq(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaq(a){return a===0?1/a<0:a<0},
ao(a,b,c){if(B.c.W(b,c)>0)throw A.f(A.kH(b))
if(this.W(a,b)<0)return b
if(this.W(a,c)>0)return c
return a},
m(a,b){var s
if(b>20)throw A.f(A.ao(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaq(a))return"-"+s
return s},
j(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gD(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
ag(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
bH(a,b){if((a|0)===a)if(b>=1)return a/b|0
return this.bd(a,b)},
V(a,b){return(a|0)===a?a/b|0:this.bd(a,b)},
bd(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.f(A.cT("Result of truncating division is "+A.c(s)+": "+A.c(a)+" ~/ "+b))},
bc(a,b){var s
if(a>0)s=this.c2(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
c2(a,b){return b>31?0:a>>>b},
ga_(a){return A.aU(t.H)},
$iaV:1,
$iT:1}
J.bD.prototype={
ga_(a){return A.aU(t.S)},
$iap:1,
$iF:1}
J.cy.prototype={
ga_(a){return A.aU(t.i)},
$iap:1}
J.aG.prototype={
bC(a,b){var s=b.length
if(s>a.length)return!1
return b===a.substring(0,s)},
a3(a,b,c){A.i4(c)
return a.substring(b,A.jo(b,c,a.length))},
cG(a){return a.toLowerCase()},
U(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.j(p,0)
if(p.charCodeAt(0)===133){s=J.jd(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.j(p,r)
q=p.charCodeAt(r)===133?J.je(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
by(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.f(B.E)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
O(a,b,c){var s=b-a.length
if(s<=0)return a
return this.by(c,s)+a},
ap(a,b,c){var s=a.length
if(c>s)throw A.f(A.ao(c,0,s,null,null))
return A.l6(a,b,c)},
v(a,b){return this.ap(a,b,0)},
j(a){return a},
gD(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
ga_(a){return A.aU(t.N)},
gk(a){return a.length},
$iap:1,
$ieW:1,
$ia:1}
A.bH.prototype={
j(a){return"LateInitializationError: "+this.a}}
A.eX.prototype={}
A.w.prototype={}
A.R.prototype={
gB(a){var s=this
return new A.aI(s,s.gk(s),A.A(s).i("aI<R.E>"))},
gC(a){return this.gk(this)===0},
X(a,b){var s,r,q,p=this,o=p.gk(p)
if(b.length!==0){if(o===0)return""
s=A.c(p.I(0,0))
if(o!==p.gk(p))throw A.f(A.Q(p))
for(r=s,q=1;q<o;++q){r=r+b+A.c(p.I(0,q))
if(o!==p.gk(p))throw A.f(A.Q(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.c(p.I(0,q))
if(o!==p.gk(p))throw A.f(A.Q(p))}return r.charCodeAt(0)==0?r:r}},
aA(a,b){return this.bE(0,A.A(this).i("B(R.E)").a(b))},
ar(a,b,c){var s=A.A(this)
return new A.a0(this,s.G(c).i("1(R.E)").a(b),s.i("@<R.E>").G(c).i("a0<1,2>"))},
ae(a,b){var s=A.b6(this,A.A(this).i("R.E"))
return s},
av(a){return this.ae(0,!0)}}
A.bT.prototype={
gbT(){var s=J.a5(this.a),r=this.c
if(r==null||r>s)return s
return r},
gc3(){var s=J.a5(this.a),r=this.b
if(r>s)return s
return r},
gk(a){var s,r=J.a5(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
I(a,b){var s=this,r=s.gc3()+b
if(b<0||r>=s.gbT())throw A.f(A.bB(b,s.gk(0),s,null,"index"))
return J.hg(s.a,r)},
ae(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.v(n),l=m.gk(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.hu(0,n):J.ht(0,n)}r=A.hB(s,m.I(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.a.n(r,q,m.I(n,o+q))
if(m.gk(n)<l)throw A.f(A.Q(p))}return r},
av(a){return this.ae(0,!0)}}
A.aI.prototype={
gu(){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s,r=this,q=r.a,p=J.v(q),o=p.gk(q)
if(r.b!==o)throw A.f(A.Q(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.I(q,s);++r.c
return!0},
$iZ:1}
A.aL.prototype={
gB(a){return new A.bL(J.bu(this.a),this.b,A.A(this).i("bL<1,2>"))},
gk(a){return J.a5(this.a)},
gC(a){return J.fN(this.a)}}
A.by.prototype={$iw:1}
A.bL.prototype={
q(){var s=this,r=s.b
if(r.q()){s.a=s.c.$1(r.gu())
return!0}s.a=null
return!1},
gu(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iZ:1}
A.a0.prototype={
gk(a){return J.a5(this.a)},
I(a,b){return this.b.$1(J.hg(this.a,b))}}
A.H.prototype={
gB(a){return new A.bW(J.bu(this.a),this.b,this.$ti.i("bW<1>"))}}
A.bW.prototype={
q(){var s,r
for(s=this.a,r=this.b;s.q();)if(r.$1(s.gu()))return!0
return!1},
gu(){return this.a.gu()},
$iZ:1}
A.d6.prototype={
gk(a){return J.a5(this.a)},
I(a,b){var s=J.a5(this.a)
if(0>b||b>=s)A.bs(A.bB(b,s,this,null,"index"))
return b}}
A.aJ.prototype={
h(a,b){return A.h6(b)&&b>=0&&b<J.a5(this.a)?J.m(this.a,b):null},
gk(a){return J.a5(this.a)},
gH(a){return new A.d6(this.a)},
gC(a){return J.fN(this.a)},
gM(a){return J.hh(this.a)},
p(a,b){var s,r,q,p
this.$ti.i("~(F,1)").a(b)
s=this.a
r=J.v(s)
q=r.gk(s)
for(p=0;p<q;++p){b.$2(p,r.h(s,p))
if(q!==r.gk(s))throw A.f(A.Q(s))}}}
A.bP.prototype={}
A.f0.prototype={
N(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
if(p==null)return null
s=Object.create(null)
r=q.b
if(r!==-1)s.arguments=p[r+1]
r=q.c
if(r!==-1)s.argumentsExpr=p[r+1]
r=q.d
if(r!==-1)s.expr=p[r+1]
r=q.e
if(r!==-1)s.method=p[r+1]
r=q.f
if(r!==-1)s.receiver=p[r+1]
return s}}
A.bO.prototype={
j(a){return"Null check operator used on a null value"}}
A.cB.prototype={
j(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.cS.prototype={
j(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.eV.prototype={
j(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.c3.prototype={
j(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibc:1}
A.at.prototype={
j(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.is(r==null?"unknown":r)+"'"},
$iaE:1,
gcK(){return this},
$C:"$1",
$R:1,
$D:null}
A.cj.prototype={$C:"$0",$R:0}
A.ck.prototype={$C:"$2",$R:2}
A.cP.prototype={}
A.cM.prototype={
j(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.is(s)+"'"}}
A.b2.prototype={
a0(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.b2))return!1
return this.$_target===b.$_target&&this.a===b.a},
gD(a){return(A.ip(this.a)^A.cJ(this.$_target))>>>0},
j(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.cK(this.a)+"'")}}
A.cL.prototype={
j(a){return"RuntimeError: "+this.a}}
A.al.prototype={
gk(a){return this.a},
gC(a){return this.a===0},
gM(a){return this.a!==0},
gH(a){return new A.aH(this,A.A(this).i("aH<1>"))},
aQ(a,b){var s=this.b
if(s==null)return!1
return s[b]!=null},
J(a,b){J.fM(A.A(this).i("r<1,2>").a(b),new A.eM(this))},
h(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.cq(b)},
cq(a){var s,r,q=this.d
if(q==null)return null
s=q[this.bn(a)]
r=this.bo(s,a)
if(r<0)return null
return s[r].b},
n(a,b,c){var s,r,q=this,p=A.A(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.b3(s==null?q.b=q.aN():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.b3(r==null?q.c=q.aN():r,b,c)}else q.cr(b,c)},
cr(a,b){var s,r,q,p,o=this,n=A.A(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.aN()
r=o.bn(a)
q=s[r]
if(q==null)s[r]=[o.aH(a,b)]
else{p=o.bo(q,a)
if(p>=0)q[p].b=b
else q.push(o.aH(a,b))}},
p(a,b){var s,r,q=this
A.A(q).i("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.f(A.Q(q))
s=s.c}},
b3(a,b,c){var s,r=A.A(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.aH(b,c)
else s.b=c},
bM(){this.r=this.r+1&1073741823},
aH(a,b){var s=this,r=A.A(s),q=new A.eP(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.bM()
return q},
bn(a){return J.dk(a)&1073741823},
bo(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.q(a[r].a,b))return r
return-1},
j(a){return A.hC(this)},
aN(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ihx:1}
A.eM.prototype={
$2(a,b){var s=this.a,r=A.A(s)
s.n(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.A(this.a).i("~(1,2)")}}
A.eP.prototype={}
A.aH.prototype={
gk(a){return this.a.a},
gC(a){return this.a.a===0},
gB(a){var s=this.a
return new A.bI(s,s.r,s.e,this.$ti.i("bI<1>"))}}
A.bI.prototype={
gu(){return this.d},
q(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.f(A.Q(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iZ:1}
A.am.prototype={
gk(a){return this.a.a},
gC(a){return this.a.a===0},
gB(a){var s=this.a
return new A.bJ(s,s.r,s.e,this.$ti.i("bJ<1>"))},
p(a,b){var s,r,q
this.$ti.i("~(1)").a(b)
s=this.a
r=s.e
q=s.r
while(r!=null){b.$1(r.b)
if(q!==s.r)throw A.f(A.Q(s))
r=r.c}}}
A.bJ.prototype={
gu(){return this.d},
q(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.f(A.Q(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iZ:1}
A.fG.prototype={
$1(a){return this.a(a)},
$S:11}
A.fH.prototype={
$2(a,b){return this.a(a,b)},
$S:22}
A.fI.prototype={
$1(a){return this.a(A.n(a))},
$S:32}
A.cz.prototype={
j(a){return"RegExp/"+this.a+"/"+this.b.flags},
ck(a){var s=this.b.exec(a)
if(s==null)return null
return new A.fm(s)},
$ieW:1,
$ijp:1}
A.fm.prototype={}
A.ac.prototype={
i(a){return A.fw(v.typeUniverse,this,a)},
G(a){return A.jZ(v.typeUniverse,this,a)}}
A.d1.prototype={}
A.fu.prototype={
j(a){return A.Y(this.a,null)}}
A.d_.prototype={
j(a){return this.a}}
A.bl.prototype={$iaq:1}
A.f4.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:8}
A.f3.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:25}
A.f5.prototype={
$0(){this.a.$0()},
$S:7}
A.f6.prototype={
$0(){this.a.$0()},
$S:7}
A.c4.prototype={
bK(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(A.bp(new A.ft(this,b),0),a)
else throw A.f(A.cT("`setTimeout()` not found."))},
bL(a,b){if(self.setTimeout!=null)this.b=self.setInterval(A.bp(new A.fs(this,a,Date.now(),b),0),a)
else throw A.f(A.cT("Periodic timer."))},
cb(){if(self.setTimeout!=null){var s=this.b
if(s==null)return
if(this.a)self.clearTimeout(s)
else self.clearInterval(s)
this.b=null}else throw A.f(A.cT("Canceling a timer."))},
$icQ:1}
A.ft.prototype={
$0(){var s=this.a
s.b=null
s.c=1
this.b.$0()},
$S:2}
A.fs.prototype={
$0(){var s,r=this,q=r.a,p=q.c+1,o=r.b
if(o>0){s=Date.now()-r.c
if(s>(p+1)*o)p=B.c.bH(s,o)}q.c=p
r.d.$1(q)},
$S:7}
A.ai.prototype={
j(a){return A.c(this.a)},
$iC:1,
gai(){return this.b}}
A.bZ.prototype={
cs(a){if((this.c&15)!==6)return!0
return this.b.b.aU(t.al.a(this.d),a.a,t.y,t.K)},
cm(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.Q.b(q))p=l.cC(q,m,a.b,o,n,t.l)
else p=l.aU(t.v.a(q),m,o,n)
try{o=r.$ti.i("2/").a(p)
return o}catch(s){if(t.eK.b(A.ay(s))){if((r.c&1)!==0)throw A.f(A.eu("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.f(A.eu("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.a7.prototype={
cF(a,b,c){var s,r,q=this.$ti
q.G(c).i("1/(2)").a(a)
s=$.L
if(s===B.h){if(!t.Q.b(b)&&!t.v.b(b))throw A.f(A.ev(b,"onError",u.c))}else{c.i("@<0/>").G(q.c).i("1(2)").a(a)
b=A.kv(b,s)}r=new A.a7(s,c.i("a7<0>"))
this.b5(new A.bZ(r,3,a,b,q.i("@<1>").G(c).i("bZ<1,2>")))
return r},
c1(a){this.a=this.a&1|16
this.c=a},
aj(a){this.a=a.a&30|this.a&1
this.c=a.c},
b5(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.b5(a)
return}r.aj(s)}A.h7(null,null,r.b,t.M.a(new A.f9(r,a)))}},
ba(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t._.a(m.c)
if((n.a&24)===0){n.ba(a)
return}m.aj(n)}l.a=m.al(a)
A.h7(null,null,m.b,t.M.a(new A.fb(l,m)))}},
ak(){var s=t.F.a(this.c)
this.c=null
return this.al(s)},
al(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bR(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.ak()
q.aj(a)
A.bk(q,r)},
b7(a){var s=this.ak()
this.c1(a)
A.bk(this,s)},
bP(a){this.a^=2
A.h7(null,null,this.b,t.M.a(new A.fa(this,a)))},
$icu:1}
A.f9.prototype={
$0(){A.bk(this.a,this.b)},
$S:2}
A.fb.prototype={
$0(){A.bk(this.b,this.a.a)},
$S:2}
A.fa.prototype={
$0(){this.a.b7(this.b)},
$S:2}
A.fe.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.cB(t.he.a(q.d),t.z)}catch(p){s=A.ay(p)
r=A.bq(p)
if(k.c&&t.n.a(k.b.a.c).a===s){q=k.a
q.c=t.n.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.fO(q)
n=k.a
n.c=new A.ai(q,o)
q=n}q.b=!0
return}if(j instanceof A.a7&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.n.a(j.c)
q.b=!0}return}if(j instanceof A.a7){m=k.b.a
l=new A.a7(m.b,m.$ti)
j.cF(new A.ff(l,m),new A.fg(l),t.q)
q=k.a
q.c=l
q.b=!1}},
$S:2}
A.ff.prototype={
$1(a){this.a.bR(this.b)},
$S:8}
A.fg.prototype={
$2(a,b){A.cb(a)
t.l.a(b)
this.a.b7(new A.ai(a,b))},
$S:23}
A.fd.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.aU(o.i("2/(1)").a(p.d),m,o.i("2/"),n)}catch(l){s=A.ay(l)
r=A.bq(l)
q=s
p=r
if(p==null)p=A.fO(q)
o=this.a
o.c=new A.ai(q,p)
o.b=!0}},
$S:2}
A.fc.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.n.a(l.a.a.c)
p=l.b
if(p.a.cs(s)&&p.a.e!=null){p.c=p.a.cm(s)
p.b=!1}}catch(o){r=A.ay(o)
q=A.bq(o)
p=t.n.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.fO(p)
m=l.b
m.c=new A.ai(p,n)
p=m}p.b=!0}},
$S:2}
A.cU.prototype={}
A.bS.prototype={
gk(a){var s,r,q=this,p={},o=new A.a7($.L,t.fJ)
p.a=0
s=A.A(q)
r=s.i("~(1)?").a(new A.eZ(p,q))
t.g5.a(new A.f_(p,o))
A.z(q.a,q.b,r,!1,s.c)
return o}}
A.eZ.prototype={
$1(a){A.A(this.b).c.a(a);++this.a.a},
$S(){return A.A(this.b).i("~(1)")}}
A.f_.prototype={
$0(){var s=this.b,r=s.$ti,q=r.i("1/").a(this.a.a),p=s.ak()
r.c.a(q)
s.a=8
s.c=q
A.bk(s,p)},
$S:2}
A.c9.prototype={$ihQ:1}
A.d9.prototype={
cD(a){var s,r,q
t.M.a(a)
try{if(B.h===$.L){a.$0()
return}A.ic(null,null,this,a,t.q)}catch(q){s=A.ay(q)
r=A.bq(q)
A.fA(A.cb(s),t.l.a(r))}},
cE(a,b,c){var s,r,q
c.i("~(0)").a(a)
c.a(b)
try{if(B.h===$.L){a.$1(b)
return}A.id(null,null,this,a,b,t.q,c)}catch(q){s=A.ay(q)
r=A.bq(q)
A.fA(A.cb(s),t.l.a(r))}},
bi(a){return new A.fn(this,t.M.a(a))},
bj(a,b){return new A.fo(this,b.i("~(0)").a(a),b)},
cB(a,b){b.i("0()").a(a)
if($.L===B.h)return a.$0()
return A.ic(null,null,this,a,b)},
aU(a,b,c,d){c.i("@<0>").G(d).i("1(2)").a(a)
d.a(b)
if($.L===B.h)return a.$1(b)
return A.id(null,null,this,a,b,c,d)},
cC(a,b,c,d,e,f){d.i("@<0>").G(e).G(f).i("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.L===B.h)return a.$2(b,c)
return A.kw(null,null,this,a,b,c,d,e,f)}}
A.fn.prototype={
$0(){return this.a.cD(this.b)},
$S:2}
A.fo.prototype={
$1(a){var s=this.c
return this.a.cE(this.b,s.a(a),s)},
$S(){return this.c.i("~(0)")}}
A.fB.prototype={
$0(){A.j9(this.a,this.b)},
$S:2}
A.c_.prototype={
gB(a){var s=this,r=new A.aR(s,s.r,A.A(s).i("aR<1>"))
r.c=s.e
return r},
gk(a){return this.a},
gC(a){return this.a===0},
v(a,b){var s,r
if(b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else{r=this.bS(b)
return r}},
bS(a){var s=this.d
if(s==null)return!1
return this.aM(s[this.aJ(a)],a)>=0},
l(a,b){var s,r,q=this
A.A(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.b4(s==null?q.b=A.h_():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.b4(r==null?q.c=A.h_():r,b)}else return q.bN(b)},
bN(a){var s,r,q,p=this
A.A(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.h_()
r=p.aJ(a)
q=s[r]
if(q==null)s[r]=[p.aO(a)]
else{if(p.aM(q,a)>=0)return!1
q.push(p.aO(a))}return!0},
A(a,b){var s
if(b!=="__proto__")return this.bX(this.b,b)
else{s=this.bW(b)
return s}},
bW(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.aJ(a)
r=n[s]
q=o.aM(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.be(p)
return!0},
b4(a,b){A.A(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.aO(b)
return!0},
bX(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.be(s)
delete a[b]
return!0},
b8(){this.r=this.r+1&1073741823},
aO(a){var s,r=this,q=new A.d5(A.A(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.b8()
return q},
be(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.b8()},
aJ(a){return J.dk(a)&1073741823},
aM(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.q(a[r].a,b))return r
return-1}}
A.d5.prototype={}
A.aR.prototype={
gu(){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.f(A.Q(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.i("1?").a(r.a)
s.c=r.b
return!0}},
$iZ:1}
A.eQ.prototype={
$2(a,b){this.a.n(0,this.b.a(a),this.c.a(b))},
$S:24}
A.P.prototype={
gB(a){return new A.aI(a,this.gk(a),A.a9(a).i("aI<P.E>"))},
I(a,b){return this.h(a,b)},
p(a,b){var s,r
A.a9(a).i("~(P.E)").a(b)
s=this.gk(a)
for(r=0;r<s;++r){b.$1(this.h(a,r))
if(s!==this.gk(a))throw A.f(A.Q(a))}},
gC(a){return this.gk(a)===0},
gM(a){return this.gk(a)!==0},
j(a){return A.fT(a,"[","]")},
$iw:1,
$ii:1,
$iV:1}
A.x.prototype={
p(a,b){var s,r,q,p=A.a9(a)
p.i("~(x.K,x.V)").a(b)
for(s=J.bu(this.gH(a)),p=p.i("x.V");s.q();){r=s.gu()
q=this.h(a,r)
b.$2(r,q==null?p.a(q):q)}},
gcj(a){return J.iW(this.gH(a),new A.eR(a),A.a9(a).i("an<x.K,x.V>"))},
gk(a){return J.a5(this.gH(a))},
gC(a){return J.fN(this.gH(a))},
gM(a){return J.hh(this.gH(a))},
j(a){return A.hC(a)},
$ir:1}
A.eR.prototype={
$1(a){var s=this.a,r=A.a9(s)
r.i("x.K").a(a)
s=J.m(s,a)
if(s==null)s=r.i("x.V").a(s)
return new A.an(a,s,r.i("an<x.K,x.V>"))},
$S(){return A.a9(this.a).i("an<x.K,x.V>(x.K)")}}
A.eS.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.c(a)
r.a=(r.a+=s)+": "
s=A.c(b)
r.a+=s},
$S:9}
A.bh.prototype={}
A.as.prototype={
n(a,b,c){var s=this.$ti
s.i("as.K").a(b)
s.i("as.V").a(c)
throw A.f(A.cT("Cannot modify unmodifiable map"))}}
A.a2.prototype={
gC(a){return this.gk(this)===0},
J(a,b){var s
for(s=J.bu(A.A(this).i("i<a2.E>").a(b));s.q();)this.l(0,s.gu())},
j(a){return A.fT(this,"{","}")},
X(a,b){var s,r,q,p,o=this.gB(this)
if(!o.q())return""
s=o.d
r=J.I(s==null?o.$ti.c.a(s):s)
if(!o.q())return r
s=o.$ti.c
if(b.length===0){q=r
do{p=o.d
q+=A.c(p==null?s.a(p):p)}while(o.q())
s=q}else{q=r
do{p=o.d
q=q+b+A.c(p==null?s.a(p):p)}while(o.q())
s=q}return s.charCodeAt(0)==0?s:s},
$iw:1,
$ii:1,
$iah:1}
A.c1.prototype={}
A.d3.prototype={
h(a,b){var s,r=this.b
if(r==null)return this.c.h(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.bV(b):s}},
gk(a){return this.b==null?this.c.a:this.aa().length},
gC(a){return this.gk(0)===0},
gM(a){return this.gk(0)>0},
gH(a){var s
if(this.b==null){s=this.c
return new A.aH(s,A.A(s).i("aH<1>"))}return new A.d4(this)},
n(a,b,c){var s,r,q=this
if(q.b==null)q.c.n(0,b,c)
else if(q.aQ(0,b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.c5().n(0,b,c)},
aQ(a,b){if(this.b==null)return this.c.aQ(0,b)
return Object.prototype.hasOwnProperty.call(this.a,b)},
p(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.p(0,b)
s=o.aa()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.fz(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.f(A.Q(o))}},
aa(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.u(Object.keys(this.a),t.s)
return s},
c5(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.cE(t.N,t.z)
r=n.aa()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.n(0,o,n.h(0,o))}if(p===0)B.a.l(r,"")
else B.a.cc(r)
n.a=n.b=null
return n.c=s},
bV(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.fz(this.a[a])
return this.b[a]=s}}
A.d4.prototype={
gk(a){return this.a.gk(0)},
I(a,b){var s=this.a
if(s.b==null)s=s.gH(0).I(0,b)
else{s=s.aa()
if(!(b>=0&&b<s.length))return A.j(s,b)
s=s[b]}return s},
gB(a){var s=this.a
if(s.b==null){s=s.gH(0)
s=s.gB(s)}else{s=s.aa()
s=new J.az(s,s.length,A.G(s).i("az<1>"))}return s}}
A.cl.prototype={}
A.cn.prototype={}
A.bG.prototype={
j(a){var s=A.cr(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.cD.prototype={
j(a){return"Cyclic error in JSON stringify"}}
A.cC.prototype={
a7(a,b){var s=A.kt(b,this.gcg().a)
return s},
K(a){var s=A.jH(a,this.gci().b,null)
return s},
gci(){return B.M},
gcg(){return B.L}}
A.eO.prototype={}
A.eN.prototype={}
A.fk.prototype={
bx(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.d.a3(a,r,q)
r=q+1
o=A.S(92)
s.a+=o
o=A.S(117)
s.a+=o
o=A.S(100)
s.a+=o
o=p>>>8&15
o=A.S(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.S(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.S(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.d.a3(a,r,q)
r=q+1
o=A.S(92)
s.a+=o
switch(p){case 8:o=A.S(98)
s.a+=o
break
case 9:o=A.S(116)
s.a+=o
break
case 10:o=A.S(110)
s.a+=o
break
case 12:o=A.S(102)
s.a+=o
break
case 13:o=A.S(114)
s.a+=o
break
default:o=A.S(117)
s.a+=o
o=A.S(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.S(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.S(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.d.a3(a,r,q)
r=q+1
o=A.S(92)
s.a+=o
o=A.S(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.d.a3(a,r,m)},
aI(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.f(new A.cD(a,null))}B.a.l(s,a)},
aB(a){var s,r,q,p,o=this
if(o.bw(a))return
o.aI(a)
try{s=o.b.$1(a)
if(!o.bw(s)){q=A.hw(a,null,o.gb9())
throw A.f(q)}q=o.a
if(0>=q.length)return A.j(q,-1)
q.pop()}catch(p){r=A.ay(p)
q=A.hw(a,r,o.gb9())
throw A.f(q)}},
bw(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.b.j(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.bx(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.aI(a)
q.cI(a)
s=q.a
if(0>=s.length)return A.j(s,-1)
s.pop()
return!0}else if(t.G.b(a)){q.aI(a)
r=q.cJ(a)
s=q.a
if(0>=s.length)return A.j(s,-1)
s.pop()
return r}else return!1},
cI(a){var s,r,q=this.c
q.a+="["
s=J.v(a)
if(s.gM(a)){this.aB(s.h(a,0))
for(r=1;r<s.gk(a);++r){q.a+=","
this.aB(s.h(a,r))}}q.a+="]"},
cJ(a){var s,r,q,p,o,n=this,m={},l=J.v(a)
if(l.gC(a)){n.c.a+="{}"
return!0}s=l.gk(a)*2
r=A.hB(s,null,!1,t.X)
q=m.a=0
m.b=!0
l.p(a,new A.fl(m,r))
if(!m.b)return!1
l=n.c
l.a+="{"
for(p='"';q<s;q+=2,p=',"'){l.a+=p
n.bx(A.n(r[q]))
l.a+='":'
o=q+1
if(!(o<s))return A.j(r,o)
n.aB(r[o])}l.a+="}"
return!0}}
A.fl.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.a.n(s,r.a++,a)
B.a.n(s,r.a++,b)},
$S:9}
A.fj.prototype={
gb9(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.a6.prototype={
a0(a,b){if(b==null)return!1
return b instanceof A.a6&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gD(a){return A.jj(this.a,this.b)},
W(a,b){var s
t.dy.a(b)
s=B.c.W(this.a,b.a)
if(s!==0)return s
return B.c.W(this.b,b.b)},
aw(){var s=this
if(s.c)return new A.a6(s.a,s.b,!1)
return s},
az(){var s=this
if(s.c)return s
return new A.a6(s.a,s.b,!0)},
j(a){var s=this,r=A.hp(A.b9(s)),q=A.aj(A.cI(s)),p=A.aj(A.cH(s)),o=A.aj(A.aw(s)),n=A.aj(A.b8(s)),m=A.aj(A.hF(s)),l=A.eG(A.hE(s)),k=s.b,j=k===0?"":A.eG(k)
k=r+"-"+q
if(s.c)return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j},
au(){var s=this,r=A.b9(s)>=-9999&&A.b9(s)<=9999?A.hp(A.b9(s)):A.j6(A.b9(s)),q=A.aj(A.cI(s)),p=A.aj(A.cH(s)),o=A.aj(A.aw(s)),n=A.aj(A.b8(s)),m=A.aj(A.hF(s)),l=A.eG(A.hE(s)),k=s.b,j=k===0?"":A.eG(k)
k=r+"-"+q
if(s.c)return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j}}
A.eH.prototype={
$1(a){if(a==null)return 0
return A.dh(a)},
$S:10}
A.eI.prototype={
$1(a){var s,r,q
if(a==null)return 0
for(s=a.length,r=0,q=0;q<6;++q){r*=10
if(q<s){if(!(q<s))return A.j(a,q)
r+=a.charCodeAt(q)^48}}return r},
$S:10}
A.bx.prototype={
a0(a,b){if(b==null)return!1
return b instanceof A.bx&&this.a===b.a},
gD(a){return B.c.gD(this.a)},
j(a){var s,r,q,p,o=this.a,n=B.c.V(o,36e8)
o%=36e8
s=B.c.V(o,6e7)
o%=6e7
r=s<10?"0":""
q=B.c.V(o,1e6)
p=q<10?"0":""
return""+n+":"+r+s+":"+p+q+"."+B.d.O(B.c.j(o%1e6),6,"0")}}
A.C.prototype={
gai(){return A.jk(this)}}
A.cg.prototype={
j(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.cr(s)
return"Assertion failed"}}
A.aq.prototype={}
A.aa.prototype={
gaL(){return"Invalid argument"+(!this.a?"(s)":"")},
gaK(){return""},
j(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gaL()+q+o
if(!s.a)return n
return n+s.gaK()+": "+A.cr(s.gaR())},
gaR(){return this.b}}
A.ba.prototype={
gaR(){return A.i5(this.b)},
gaL(){return"RangeError"},
gaK(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.c(q):""
else if(q==null)s=": Not greater than or equal to "+A.c(r)
else if(q>r)s=": Not in inclusive range "+A.c(r)+".."+A.c(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.c(r)
return s}}
A.cv.prototype={
gaR(){return A.ca(this.b)},
gaL(){return"RangeError"},
gaK(){if(A.ca(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gk(a){return this.f}}
A.bV.prototype={
j(a){return"Unsupported operation: "+this.a}}
A.cR.prototype={
j(a){return"UnimplementedError: "+this.a}}
A.bd.prototype={
j(a){return"Bad state: "+this.a}}
A.cm.prototype={
j(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.cr(s)+"."}}
A.cF.prototype={
j(a){return"Out of Memory"},
gai(){return null},
$iC:1}
A.bQ.prototype={
j(a){return"Stack Overflow"},
gai(){return null},
$iC:1}
A.f8.prototype={
j(a){return"Exception: "+this.a}}
A.eK.prototype={
j(a){var s=this.a,r=""!==s?"FormatException: "+s:"FormatException",q=this.b
if(typeof q=="string"){if(q.length>78)q=B.d.a3(q,0,75)+"..."
return r+"\n"+q}else return r}}
A.i.prototype={
ar(a,b,c){var s=A.A(this)
return A.jh(this,s.G(c).i("1(i.E)").a(b),s.i("i.E"),c)},
aA(a,b){var s=A.A(this)
return new A.H(this,s.i("B(i.E)").a(b),s.i("H<i.E>"))},
ae(a,b){var s=A.b6(this,A.A(this).i("i.E"))
return s},
av(a){return this.ae(0,!0)},
gk(a){var s,r=this.gB(this)
for(s=0;r.q();)++s
return s},
gC(a){return!this.gB(this).q()},
gM(a){return!this.gC(this)},
ga2(a){var s,r=this.gB(this)
if(!r.q())throw A.f(A.fS())
s=r.gu()
if(r.q())throw A.f(A.ja())
return s},
I(a,b){var s,r
A.fW(b,"index")
s=this.gB(this)
for(r=b;s.q();){if(r===0)return s.gu();--r}throw A.f(A.bB(b,b-r,this,null,"index"))},
j(a){return A.jb(this,"(",")")}}
A.an.prototype={
j(a){return"MapEntry("+A.c(this.a)+": "+A.c(this.b)+")"}}
A.W.prototype={
gD(a){return A.o.prototype.gD.call(this,0)},
j(a){return"null"}}
A.o.prototype={$io:1,
a0(a,b){return this===b},
gD(a){return A.cJ(this)},
j(a){return"Instance of '"+A.cK(this)+"'"},
ga_(a){return A.kQ(this)},
toString(){return this.j(this)}}
A.dc.prototype={
j(a){return""},
$ibc:1}
A.be.prototype={
gk(a){return this.a.length},
j(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ijs:1}
A.d.prototype={$id:1}
A.b0.prototype={
scn(a,b){a.href=b},
j(a){var s=String(a)
s.toString
return s},
$ib0:1}
A.cf.prototype={
j(a){var s=String(a)
s.toString
return s}}
A.b1.prototype={$ib1:1}
A.aA.prototype={$iaA:1}
A.b3.prototype={$ib3:1}
A.af.prototype={
gk(a){return a.length}}
A.aB.prototype={
b6(a,b){var s=$.iu(),r=s[b]
if(typeof r=="string")return r
r=this.c4(a,b)
s[b]=r
return r},
c4(a,b){var s,r=b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()})
r.toString
r=r in a
r.toString
if(r)return b
s=$.iy()+b
r=s in a
r.toString
if(r)return s
return b},
bb(a,b,c,d){a.setProperty(b,c,d)},
gk(a){var s=a.length
s.toString
return s}}
A.ex.prototype={}
A.aC.prototype={}
A.cp.prototype={
j(a){var s=String(a)
s.toString
return s}}
A.bw.prototype={
cf(a,b){var s=a.createHTMLDocument(b)
s.toString
return s}}
A.cq.prototype={
gk(a){var s=a.length
s.toString
return s}}
A.bj.prototype={
gk(a){return this.a.length},
h(a,b){var s=this.a
if(!(b>=0&&b<s.length))return A.j(s,b)
return this.$ti.c.a(s[b])}}
A.t.prototype={
gc8(a){return new A.cY(a)},
ga6(a){return new A.cZ(a)},
j(a){var s=a.localName
s.toString
return s},
L(a,b,c,d){var s,r,q,p
if(c==null){s=$.hs
if(s==null){s=A.u([],t.k)
r=new A.bN(s)
B.a.l(s,A.hS(null))
B.a.l(s,A.hY())
$.hs=r
d=r}else d=s
s=$.hr
if(s==null){d.toString
s=new A.c8(d)
$.hr=s
c=s}else{d.toString
s.a=d
c=s}}if($.au==null){s=document
r=s.implementation
r.toString
r=B.G.cf(r,"")
$.au=r
r=r.createRange()
r.toString
$.fQ=r
r=$.au.createElement("base")
t.cR.a(r)
s=s.baseURI
s.toString
r.href=s
$.au.head.appendChild(r).toString}s=$.au
if(s.body==null){r=s.createElement("body")
B.t.sca(s,t.b.a(r))}s=$.au
if(t.b.b(a)){s=s.body
s.toString
q=s}else{s.toString
r=a.tagName
r.toString
q=s.createElement(r)
$.au.body.appendChild(q).toString}s="createContextualFragment" in window.Range.prototype
s.toString
if(s){s=a.tagName
s.toString
s=!B.a.v(B.O,s)}else s=!1
if(s){$.fQ.selectNodeContents(q)
s=$.fQ
s=s.createContextualFragment(b)
s.toString
p=s}else{J.iX(q,b)
s=$.au.createDocumentFragment()
s.toString
while(r=q.firstChild,r!=null)s.appendChild(r).toString
p=s}if(q!==$.au.body)J.hi(q)
c.b_(p)
document.adoptNode(p).toString
return p},
ce(a,b,c){return this.L(a,b,c,null)},
st(a,b){this.aF(a,b)},
aF(a,b){this.sT(a,null)
a.appendChild(this.L(a,b,null,null)).toString},
sbU(a,b){a.innerHTML=b},
gY(a){return new A.aP(a,"click",!1,t.C)},
$it:1}
A.eJ.prototype={
$1(a){return t.h.b(t.a0.a(a))},
$S:21}
A.b.prototype={$ib:1}
A.y.prototype={
bg(a,b,c,d){t.w.a(c)
if(c!=null)this.bO(a,b,c,d)},
c6(a,b,c){return this.bg(a,b,c,null)},
bO(a,b,c,d){return a.addEventListener(b,A.bp(t.w.a(c),1),d)},
$iy:1}
A.cs.prototype={
gk(a){return a.length}}
A.bA.prototype={
sca(a,b){a.body=b}}
A.aF.prototype={
san(a,b){a.checked=b},
sE(a,b){a.value=b},
$iaF:1,
$ihI:1,
$ihn:1}
A.b7.prototype={
j(a){var s=String(a)
s.toString
return s},
$ib7:1}
A.a_.prototype={$ia_:1}
A.X.prototype={
ga2(a){var s=this.a,r=s.childNodes.length
if(r===0)throw A.f(A.fY("No elements"))
if(r>1)throw A.f(A.fY("More than one element"))
s=s.firstChild
s.toString
return s},
J(a,b){var s,r,q,p,o
t.eh.a(b)
s=b.a
r=this.a
if(s!==r)for(q=s.childNodes.length,p=0;p<q;++p){o=s.firstChild
o.toString
r.appendChild(o).toString}return},
gB(a){var s=this.a.childNodes
return new A.aD(s,s.length,A.a9(s).i("aD<ag.E>"))},
gk(a){return this.a.childNodes.length},
h(a,b){var s=this.a.childNodes
if(!(b>=0&&b<s.length))return A.j(s,b)
return s[b]}}
A.h.prototype={
cv(a){var s=a.parentNode
if(s!=null)s.removeChild(a).toString},
cA(a,b){var s,r,q
try{r=a.parentNode
r.toString
s=r
J.iR(s,b,a)}catch(q){}return a},
bQ(a){var s
while(s=a.firstChild,s!=null)a.removeChild(s).toString},
j(a){var s=a.nodeValue
return s==null?this.bD(a):s},
sT(a,b){a.textContent=b},
cd(a,b){var s=a.cloneNode(!0)
s.toString
return s},
v(a,b){var s=a.contains(b)
s.toString
return s},
bY(a,b,c){var s=a.replaceChild(b,c)
s.toString
return s},
$ih:1}
A.bM.prototype={
gk(a){var s=a.length
s.toString
return s},
h(a,b){var s=a.length,r=b>>>0!==b||b>=s
r.toString
if(r)throw A.f(A.bB(b,s,a,null,null))
s=a[b]
s.toString
return s},
I(a,b){if(!(b>=0&&b<a.length))return A.j(a,b)
return a[b]},
$iw:1,
$icA:1,
$ii:1,
$iV:1}
A.aN.prototype={
gk(a){return a.length},
sE(a,b){a.value=b},
$iaN:1}
A.bR.prototype={
h(a,b){return a.getItem(A.n(b))},
n(a,b,c){a.setItem(b,A.n(c))},
A(a,b){var s=a.getItem(b)
a.removeItem(b)
return s},
p(a,b){var s,r,q
t.x.a(b)
for(s=0;;++s){r=a.key(s)
if(r==null)return
q=a.getItem(r)
q.toString
b.$2(r,q)}},
gH(a){var s=A.u([],t.s)
this.p(a,new A.eY(s))
return s},
gk(a){var s=a.length
s.toString
return s},
gC(a){return a.key(0)==null},
gM(a){return a.key(0)!=null},
$ir:1}
A.eY.prototype={
$2(a,b){return B.a.l(this.a,a)},
$S:17}
A.bU.prototype={
L(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.aG(a,b,c,d)
s=A.j7("<table>"+b+"</table>",c,d)
r=document.createDocumentFragment()
r.toString
new A.X(r).J(0,new A.X(s))
return r}}
A.cN.prototype={
L(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.aG(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.X(s).J(0,new A.X(new A.X(new A.X(B.w.L(r,b,c,d)).ga2(0)).ga2(0)))
return s}}
A.cO.prototype={
L(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.aG(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.X(s).J(0,new A.X(new A.X(B.w.L(r,b,c,d)).ga2(0)))
return s}}
A.bf.prototype={
aF(a,b){var s,r
this.sT(a,null)
s=a.content
s.toString
J.iQ(s)
r=this.L(a,b,null,null)
a.content.appendChild(r).toString},
$ibf:1}
A.aO.prototype={
sE(a,b){a.value=b},
$iaO:1}
A.ad.prototype={}
A.bX.prototype={$if2:1}
A.bi.prototype={$ibi:1}
A.c0.prototype={
gk(a){var s=a.length
s.toString
return s},
h(a,b){var s=a.length,r=b>>>0!==b||b>=s
r.toString
if(r)throw A.f(A.bB(b,s,a,null,null))
s=a[b]
s.toString
return s},
I(a,b){if(!(b>=0&&b<a.length))return A.j(a,b)
return a[b]},
$iw:1,
$icA:1,
$ii:1,
$iV:1}
A.cV.prototype={
p(a,b){var s,r,q,p,o,n
t.x.a(b)
for(s=this.gH(0),r=s.length,q=this.a,p=0;p<s.length;s.length===r||(0,A.hd)(s),++p){o=s[p]
n=q.getAttribute(o)
b.$2(o,n==null?A.n(n):n)}},
gH(a){var s,r,q,p,o,n,m=this.a.attributes
m.toString
s=A.u([],t.s)
for(r=m.length,q=t.h9,p=0;p<r;++p){if(!(p<m.length))return A.j(m,p)
o=q.a(m[p])
if(o.namespaceURI==null){n=o.name
n.toString
B.a.l(s,n)}}return s},
gC(a){return this.gH(0).length===0},
gM(a){return this.gH(0).length!==0}}
A.cY.prototype={
h(a,b){return this.a.getAttribute(A.n(b))},
n(a,b,c){this.a.setAttribute(b,A.n(c))},
gk(a){return this.gH(0).length}}
A.cZ.prototype={
Z(){var s,r,q,p,o=A.bK(t.N)
for(s=this.a.className.split(" "),r=s.length,q=0;q<r;++q){p=B.d.U(s[q])
if(p.length!==0)o.l(0,p)}return o},
aZ(a){this.a.className=t.c.a(a).X(0," ")},
gk(a){var s=this.a.classList.length
s.toString
return s},
gC(a){var s=this.a.classList.length
s.toString
return s===0},
l(a,b){var s,r
A.n(b)
s=this.a.classList
r=s.contains(b)
r.toString
s.add(b)
return!r},
A(a,b){var s=this.a.classList,r=s.contains(b)
r.toString
s.remove(b)
return r}}
A.fR.prototype={}
A.bY.prototype={}
A.aP.prototype={}
A.d0.prototype={}
A.f7.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:3}
A.aQ.prototype={
bI(a){var s
if($.d2.a===0){for(s=0;s<262;++s)$.d2.n(0,B.P[s],A.kS())
for(s=0;s<12;++s)$.d2.n(0,B.m[s],A.kT())}},
a5(a){return $.iM().v(0,A.bz(a))},
R(a,b,c){var s=$.d2.h(0,A.bz(a)+"::"+b)
if(s==null)s=$.d2.h(0,"*::"+b)
if(s==null)return!1
return A.h2(s.$4(a,b,c,this))},
$iab:1}
A.ag.prototype={
gB(a){return new A.aD(a,a.length,A.a9(a).i("aD<ag.E>"))}}
A.bN.prototype={
a5(a){return B.a.am(this.a,new A.eU(a))},
R(a,b,c){return B.a.am(this.a,new A.eT(a,b,c))},
$iab:1}
A.eU.prototype={
$1(a){return t.B.a(a).a5(this.a)},
$S:12}
A.eT.prototype={
$1(a){return t.B.a(a).R(this.a,this.b,this.c)},
$S:12}
A.c2.prototype={
bJ(a,b,c,d){var s,r,q
this.a.J(0,c)
s=b.aA(0,new A.fp())
r=b.aA(0,new A.fq())
this.b.J(0,s)
q=this.c
q.J(0,B.N)
q.J(0,r)},
a5(a){return this.a.v(0,A.bz(a))},
R(a,b,c){var s,r=this,q=A.bz(a),p=r.c,o=q+"::"+b
if(p.v(0,o))return r.d.c7(c)
else{s="*::"+b
if(p.v(0,s))return r.d.c7(c)
else{p=r.b
if(p.v(0,o))return!0
else if(p.v(0,s))return!0
else if(p.v(0,q+"::*"))return!0
else if(p.v(0,"*::*"))return!0}}return!1},
$iab:1}
A.fp.prototype={
$1(a){return!B.a.v(B.m,A.n(a))},
$S:13}
A.fq.prototype={
$1(a){return B.a.v(B.m,A.n(a))},
$S:13}
A.de.prototype={
R(a,b,c){if(this.bG(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.v(0,b)
return!1}}
A.fr.prototype={
$1(a){return"TEMPLATE::"+A.n(a)},
$S:14}
A.dd.prototype={
a5(a){var s
if(t.ew.b(a))return!1
s=t.g7.b(a)
if(s&&A.bz(a)==="foreignObject")return!1
if(s)return!0
return!1},
R(a,b,c){if(b==="is"||B.d.bC(b,"on"))return!1
return this.a5(a)},
$iab:1}
A.aD.prototype={
q(){var s=this,r=s.c+1,q=s.b
if(r<q){q=s.a
if(!(r>=0&&r<q.length))return A.j(q,r)
s.d=q[r]
s.c=r
return!0}s.d=null
s.c=q
return!1},
gu(){var s=this.d
return s==null?this.$ti.c.a(s):s},
$iZ:1}
A.cX.prototype={$il:1,$iy:1,$if2:1}
A.da.prototype={$ijx:1}
A.c8.prototype={
b_(a){var s,r=new A.fy(this)
do{s=this.b
r.$2(a,null)}while(s!==this.b)},
ab(a,b){++this.b
if(b==null||b!==a.parentNode)J.hi(a)
else b.removeChild(a).toString},
c0(a,b){var s,r,q,p,o,n,m,l=!0,k=null,j=null
try{k=J.iU(a)
j=k.a.getAttribute("is")
t.h.a(a)
p=function(c){if(!(c.attributes instanceof NamedNodeMap)){return true}if(c.id=="lastChild"||c.name=="lastChild"||c.id=="previousSibling"||c.name=="previousSibling"||c.id=="children"||c.name=="children"){return true}var i=c.childNodes
if(c.lastChild&&c.lastChild!==i[i.length-1]){return true}if(c.children){if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList)){return true}}var h=0
if(c.children){h=c.children.length}for(var g=0;g<h;g++){var f=c.children[g]
if(f.id=="attributes"||f.name=="attributes"||f.id=="lastChild"||f.name=="lastChild"||f.id=="previousSibling"||f.name=="previousSibling"||f.id=="children"||f.name=="children"){return true}}return false}(a)
p.toString
s=p
if(s)o=!0
else{p=!(a.attributes instanceof NamedNodeMap)
p.toString
o=p}l=o}catch(n){}r="element unprintable"
try{r=J.I(a)}catch(n){}try{t.h.a(a)
q=A.bz(a)
this.c_(a,b,l,r,q,t.G.a(k),A.ae(j))}catch(n){if(A.ay(n) instanceof A.aa)throw n
else{this.ab(a,b)
window.toString
p=A.c(r)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn("Removing corrupted element "+p)}}},
c_(a,b,c,d,e,f,g){var s,r,q,p,o,n,m,l=this
if(c){l.ab(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing element due to corrupted attributes on <"+d+">")
return}if(!l.a.a5(a)){l.ab(a,b)
window.toString
s=A.c(b)
r=typeof console!="undefined"
r.toString
if(r)window.console.warn("Removing disallowed element <"+e+"> from "+s)
return}if(g!=null)if(!l.a.R(a,"is",g)){l.ab(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing disallowed type extension <"+e+' is="'+g+'">')
return}s=f.gH(0)
q=A.u(s.slice(0),A.G(s))
for(p=f.gH(0).length-1,s=f.a,r="Removing disallowed attribute <"+e+" ";p>=0;--p){if(!(p<q.length))return A.j(q,p)
o=q[p]
n=l.a
m=J.iY(o)
A.n(o)
if(!n.R(a,m,A.n(s.getAttribute(o)))){window.toString
n=s.getAttribute(o)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn(r+o+'="'+A.c(n)+'">')
s.removeAttribute(o)}}if(t.aW.b(a)){s=a.content
s.toString
l.b_(s)}},
bz(a,b){var s=a.nodeType
s.toString
switch(s){case 1:this.c0(a,b)
break
case 8:case 11:case 3:case 4:break
default:this.ab(a,b)}},
$iji:1}
A.fy.prototype={
$2(a,b){var s,r,q,p,o,n=this.a
n.bz(a,b)
s=a.lastChild
while(s!=null){r=null
try{r=s.previousSibling
if(r!=null&&r.nextSibling!==s){q=A.fY("Corrupt HTML")
throw A.f(q)}}catch(p){q=s;++n.b
o=q.parentNode
if(a!==o){if(o!=null)o.removeChild(q).toString}else a.removeChild(q).toString
s=null
r=a.lastChild}if(s!=null)this.$2(s,a)
s=r}},
$S:36}
A.cW.prototype={}
A.d7.prototype={}
A.d8.prototype={}
A.db.prototype={}
A.df.prototype={}
A.dg.prototype={}
A.co.prototype={
bf(a){var s=$.it()
if(s.b.test(a))return a
throw A.f(A.ev(a,"value","Not a valid class token"))},
j(a){return this.Z().X(0," ")},
gB(a){var s=this.Z()
return A.jI(s,s.r,A.A(s).c)},
gC(a){return this.Z().a===0},
gk(a){return this.Z().a},
l(a,b){var s
A.n(b)
this.bf(b)
s=this.ct(new A.ew(b))
return A.h2(s==null?!1:s)},
A(a,b){var s,r
this.bf(b)
s=this.Z()
r=s.A(0,b)
this.aZ(s)
return r},
ct(a){var s,r
t.bU.a(a)
s=this.Z()
r=a.$1(s)
this.aZ(s)
return r}}
A.ew.prototype={
$1(a){return t.c.a(a).l(0,this.a)},
$S:18}
A.fh.prototype={
bq(a){if(a<=0||a>4294967296)throw A.f(A.jn("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
bp(){return Math.random()}}
A.bb.prototype={$ibb:1}
A.ci.prototype={
Z(){var s,r,q,p,o=this.a.getAttribute("class"),n=A.bK(t.N)
if(o==null)return n
for(s=o.split(" "),r=s.length,q=0;q<r;++q){p=B.d.U(s[q])
if(p.length!==0)n.l(0,p)}return n},
aZ(a){this.a.setAttribute("class",a.X(0," "))}}
A.e.prototype={
ga6(a){return new A.ci(a)},
st(a,b){this.aF(a,b)},
L(a,b,c,d){var s,r,q,p=A.u([],t.k)
B.a.l(p,A.hS(null))
B.a.l(p,A.hY())
B.a.l(p,new A.dd())
c=new A.c8(new A.bN(p))
p=document
s=p.body
s.toString
r=B.p.ce(s,'<svg version="1.1">'+b+"</svg>",c)
p=p.createDocumentFragment()
p.toString
q=new A.X(r).ga2(0)
while(s=q.firstChild,s!=null)p.appendChild(s).toString
return p},
gY(a){return new A.aP(a,"click",!1,t.C)},
$ie:1}
A.fK.prototype={
$1(a){t.A.a(a)
new A.dl().S()},
$S:19}
A.dl.prototype={
S(){var s,r,q,p=this,o="waterhall_session",n=document,m=n.getElementById("view-login")
m.toString
p.e=m
m=n.getElementById("view-dashboard")
m.toString
p.f=m
m=n.getElementById("view-directory")
m.toString
p.r=m
m=n.getElementById("view-assets")
m.toString
p.w=m
m=n.getElementById("view-profile")
m.toString
p.x=m
m=n.getElementById("view-billing")
m.toString
p.y=m
m=n.getElementById("view-resident")
m.toString
p.z=m
m=n.getElementById("app-bottom-nav")
m.toString
p.Q=m
p.as=n.getElementById("btn-floating-role-switch")
p.at=n.getElementById("floating-role-switch-text")
n=t.N
p.ax=t.by.a(A.D(["view-dashboard",p.f,"view-directory",p.r,"view-assets",p.w,"view-profile",p.x,"view-billing",p.y,"view-resident",p.z],n,t.h))
m=new A.dS()
m.$0()
A.jw(A.hq(0,10),new A.dR(m))
$.J().S()
s=window.localStorage.getItem(o)
r=window.localStorage.getItem("waterhall_resident_session")
if(s!=null)try{n=A.hz(t.G.a(B.e.a7(0,s)),n,t.z)
p.a=n
p.ah(n)}catch(q){n=window.localStorage
n.toString
B.i.A(n,o)}else if(r!=null)p.a9(r)
p.c9()},
c9(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6="click",a7="input",a8="change",a9=document,b0=t.o,b1=b0.a(a9.getElementById("btn-login")),b2=t.f,b3=b2.a(a9.getElementById("employee-id")),b4=t.Z,b5=b4.a(a9.getElementById("zone-assignment")),b6=a9.getElementById("login-error-msg")
if(b1!=null){s=t.C
A.z(b1,a6,s.i("~(1)?").a(new A.dr(a5,b3,b5,b6)),!1,s.c)}r=b0.a(a9.getElementById("btn-logout"))
if(r!=null){s=t.C
A.z(r,a6,s.i("~(1)?").a(new A.ds(a5,b3)),!1,s.c)}q=b0.a(a9.getElementById("btn-login-resident"))
if(q!=null){s=t.C
A.z(q,a6,s.i("~(1)?").a(new A.dt(a5)),!1,s.c)}p=b0.a(a9.getElementById("btn-switch-resident"))
if(p!=null){s=t.C
A.z(p,a6,s.i("~(1)?").a(new A.dE(a5)),!1,s.c)}o=b0.a(a9.getElementById("btn-switch-worker"))
if(o!=null){s=t.C
A.z(o,a6,s.i("~(1)?").a(new A.dF(a5)),!1,s.c)}n=b0.a(a9.getElementById("btn-resident-logout"))
if(n!=null){s=t.C
A.z(n,a6,s.i("~(1)?").a(new A.dG(a5)),!1,s.c)}s=a5.as
s===$&&A.O()
if(s!=null){s=J.aZ(s)
m=s.$ti
A.z(s.a,s.b,m.i("~(1)?").a(new A.dH(a5)),!1,m.c)}s=t.h
A.ij(s,s,"T","querySelectorAll")
s=a9.querySelectorAll(".nav-tab")
s.toString
l=new A.bj(s,t.r)
l.p(l,new A.dI(a5))
k=b2.a(a9.getElementById("dir-search"))
j=b4.a(a9.getElementById("filter-purok"))
i=b4.a(a9.getElementById("filter-status"))
if(k!=null){b2=t.E
A.z(k,a7,b2.i("~(1)?").a(new A.dJ(a5)),!1,b2.c)}if(j!=null){b2=t.E
A.z(j,a8,b2.i("~(1)?").a(new A.dK(a5)),!1,b2.c)}if(i!=null){b2=t.E
A.z(i,a8,b2.i("~(1)?").a(new A.dL(a5)),!1,b2.c)}h=a9.getElementById("btn-close-modal")
if(h!=null){b2=J.aZ(h)
b4=b2.$ti
A.z(b2.a,b2.b,b4.i("~(1)?").a(new A.du(a5)),!1,b4.c)}g=a9.getElementById("house-detail-modal")
if(g!=null){b2=J.aZ(g)
b4=b2.$ti
A.z(b2.a,b2.b,b4.i("~(1)?").a(new A.dv(a5,g)),!1,b4.c)}f=t.I.a(a9.getElementById("modal-leak-toggle"))
if(f!=null){b2=t.E
A.z(f,a8,b2.i("~(1)?").a(new A.dw(a5,f)),!1,b2.c)}e=b0.a(a9.getElementById("btn-submit-log"))
if(e!=null){b2=t.C
A.z(e,a6,b2.i("~(1)?").a(new A.dx(a5,f)),!1,b2.c)}b2=t.O
d=b2.a(a9.getElementById("slider-tank"))
c=b2.a(a9.getElementById("slider-ph"))
b=b2.a(a9.getElementById("slider-turbidity"))
a=a9.getElementById("sim-tank-val")
a0=a9.getElementById("sim-ph-val")
a1=a9.getElementById("sim-turbidity-val")
if(d!=null){b2=t.E
A.z(d,a7,b2.i("~(1)?").a(new A.dy(a5,d,a)),!1,b2.c)}if(c!=null){b2=t.E
A.z(c,a7,b2.i("~(1)?").a(new A.dz(a5,c,a0)),!1,b2.c)}if(b!=null){b2=t.E
A.z(b,a7,b2.i("~(1)?").a(new A.dA(a5,b,a1)),!1,b2.c)}a2=a9.getElementById("menu-view-logs")
if(a2!=null){b2=J.aZ(a2)
b4=b2.$ti
A.z(b2.a,b2.b,b4.i("~(1)?").a(new A.dB(a5)),!1,b4.c)}a3=a9.getElementById("menu-emergency-call")
if(a3!=null){b2=J.aZ(a3)
b4=b2.$ti
A.z(b2.a,b2.b,b4.i("~(1)?").a(new A.dC(a5)),!1,b4.c)}a4=b0.a(a9.getElementById("btn-resident-submit-log"))
if(a4!=null){a9=t.C
A.z(a4,a6,a9.i("~(1)?").a(new A.dD(a5)),!1,a9.c)}},
b1(a,b){var s
if(b!=null){J.b_(b,a)
s=b.style
s.display="block"}},
ah(a){var s,r=this
t.P.a(a)
s=r.e
s===$&&A.O()
J.a4(s).A(0,"active")
s=r.Q
s===$&&A.O()
s=s.style
s.display="flex"
s=r.as
s===$&&A.O()
if(s!=null){s=s.style
s.display="flex"
s=r.as
s.toString
J.a4(s).A(0,"resident-mode")
s=r.at
s===$&&A.O()
if(s!=null)J.k(s,"Customer Mode")}r.a4("view-dashboard")
r.ad()
r.a8()
r.ac()
r.aT()
r.cp()},
a4(a){var s,r,q,p=this
p.b=a
s=document
s.toString
r=t.h
A.ij(r,r,"T","querySelectorAll")
s=s.querySelectorAll(".nav-tab")
s.toString
q=new A.bj(s,t.r)
q.p(q,new A.es(a))
s=p.ax
s===$&&A.O()
s.p(0,new A.et(a))
if(a==="view-dashboard")p.ad()
else if(a==="view-directory")p.a8()
else if(a==="view-assets")p.ac()
else if(a==="view-profile")p.aT()
else if(a==="view-billing")p.bt(null)},
ad(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=this,a2="var(--alert-green)",a3=".alert-widget-title",a4="var(--amber-safety)"
if(a1.a==null)return
s=document
r=s.getElementById("dash-worker-title")
if(r!=null)J.k(r,"Field Terminal: "+A.c(a1.a.h(0,"selected_zone")))
q=$.J()
p=q.P()
o=q.aE()
n=q.af()
q=A.G(p)
m=q.i("H<1>")
l=A.b6(new A.H(p,q.i("B(1)").a(new A.e2()),m),m.i("i.E"))
k=A.u([],t.gE)
if(J.q(o.h(0,"ph_status"),"warning")){q=t.N
B.a.l(k,A.D(["type","quality","name","Central Reservoir pH Alert","desc",A.n(o.h(0,"ph_desc"))],q,q))
j=1}else j=0
if(J.q(o.h(0,"turbidity_status"),"warning")){++j
q=t.N
B.a.l(k,A.D(["type","quality","name","Central Turbidity Alert","desc",A.n(o.h(0,"turbidity_desc"))],q,q))}i=l.length+j
h=s.getElementById("dash-alert-count")
if(h!=null)J.k(h,B.c.j(i))
g=s.getElementById("dashboard-alert-widget")
f=s.getElementById("dash-alert-list")
if(g!=null&&f!=null){q=J.E(f)
q.st(f,"")
if(i===0){m=g.style
m.borderColor=a2
e=t.u.a(g.querySelector(a3))
if(e!=null){m=e.style
m.color=a2}q.st(f,'          <div class="alert-item" style="border-left-color: var(--alert-green); background-color: rgba(16, 185, 129, 0.05)">\n            <div class="alert-item-icon">\n              <svg style="fill: var(--alert-green)" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n            </div>\n            <div class="alert-item-text" style="color: var(--text-on-dark)">No active leaks or water quality issues in Brgy. Tagpopongan.</div>\n          </div>\n        ')}else{q=g.style
q.borderColor=a4
e=t.u.a(g.querySelector(a3))
if(e!=null){q=e.style
q.color=a4}B.a.p(l,new A.e3(a1,f))
B.a.p(k,new A.e4(a1,f))}}d=A.u(["Purok 1","Purok 2","Purok 3","Purok 4","Purok 5","Purok 6"],t.s)
new A.aJ(d,t.ey).p(0,new A.e5(a1,p))
c=s.getElementById("dashboard-zone-grid")
if(c!=null){J.b_(c,"")
B.a.p(d,new A.e6(a1,p,c))}b=s.getElementById("dash-log-count")
a=s.getElementById("dash-log-list")
if(a!=null){s=J.E(a)
s.st(a,"")
a0=A.jt(n,0,A.fC(3,"count",t.S),A.G(n).c).av(0)
if(b!=null)J.k(b,""+n.length+" logged")
if(a0.length===0)s.st(a,'<div class="log-card" style="color:var(--text-muted)">No maintenance activity logged yet.</div>')
else B.a.p(a0,new A.e7(a1,p,a))}},
a8(){var s,r,q,p,o,n,m=null,l=$.J().P(),k=document,j=t.f.a(k.getElementById("dir-search")),i=t.Z,h=i.a(k.getElementById("filter-purok")),g=i.a(k.getElementById("filter-status"))
if(j==null)s=m
else{i=j.value
i=i==null?m:B.d.U(i.toLowerCase())
s=i}if(s==null)s=""
r=h==null?m:h.value
if(r==null)r="all"
q=g==null?m:g.value
if(q==null)q="all"
p=k.getElementById("dir-empty-state")
o=k.getElementById("dir-household-list")
if(o==null)return
J.b_(o,"")
k=A.G(l)
i=k.i("H<1>")
n=A.b6(new A.H(l,k.i("B(1)").a(new A.e9(s,r,q)),i),i.i("i.E"))
if(n.length===0){if(p!=null){k=p.style
k.display="block"}}else{if(p!=null){k=p.style
k.display="none"}B.a.p(n,new A.ea(this,o))}},
br(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f="current_leak_status"
g.c=a
s=$.J().a1(a)
if(s==null)return
r=document
q=r.getElementById("modal-owner-name")
p=r.getElementById("modal-acct-num")
o=r.getElementById("modal-current-m3")
n=r.getElementById("modal-flow-rate")
if(q!=null)J.k(q,A.ae(J.m(s,"owner_name")))
if(p!=null){m=J.v(s)
J.k(p,A.c(m.h(s,"house_id"))+" | "+A.c(m.h(s,"account_number")))}if(o!=null)J.k(o,B.b.m(A.p(J.m(s,"current_m3_usage")),1))
if(n!=null)J.k(n,B.b.m(A.p(J.m(s,"flow_rate")),2))
m=t.I
l=m.a(r.getElementById("modal-leak-toggle"))
if(l!=null)B.f.san(l,J.q(J.m(s,f),"leak"))
k=J.v(s)
g.aX(A.n(k.h(s,f)))
g.bu(A.aK(t.R.a(k.h(s,"monthly_history")),t.H),"chart-container")
g.aS(a)
j=t.p.a(r.getElementById("log-desc"))
i=m.a(r.getElementById("log-resolved"))
if(j!=null)B.n.sE(j,"")
if(i!=null)B.f.san(i,J.q(k.h(s,f),"leak"))
h=r.getElementById("house-detail-modal")
if(h!=null)J.a4(h).l(0,"active")},
aP(){var s=document.getElementById("house-detail-modal")
if(s!=null)J.a4(s).A(0,"active")
this.c=null
this.ad()
this.a8()},
aX(a){var s=document,r=s.getElementById("modal-leak-title"),q=s.getElementById("modal-leak-desc")
if(r==null||q==null)return
s=J.E(r)
if(a==="leak"){s.sT(r,"Leak State Sim: HIGH CONSTANT FLOW")
s=r.style
s.color="var(--alert-red)"
J.k(q,"Meter detects flow rate exceeds safety coefficient threshold.")}else{s.sT(r,"Flow State Sim: NORMAL FLOW")
s=r.style
s.color="var(--alert-green)"
J.k(q,"Meter flow matches normal residential consumption metrics.")}},
bu(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d="var(--amber-safety)",c={}
t.bj.a(a)
s=document.getElementById(b)
if(s==null)return
r=J.E(s)
r.st(s,"")
if(a.length===0){r.st(s,'<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:12px">No historic telemetry available.</div>')
return}q=B.b.ao(B.a.cu(a,new A.ei())*1.1,10,1000)
p=A.u(["Mar","Apr","May","Jun"],t.s)
o=new A.aJ(a,A.G(a).i("aJ<1>"))
n=o.gcj(o).ar(0,new A.ej(a,q,p),t.U).av(0)
o=A.G(n)
m=o.i("a(1)")
o=o.i("a0<1,a>")
l=new A.a0(n,m.a(new A.ek()),o).X(0," ")
if(0>=n.length)return A.j(n,0)
k=B.b.m(A.p(J.m(n[0],"x")),1)
j=B.c.m(80,1)
o=new A.a0(n,m.a(new A.el()),o).X(0," ")
m=n.length
i=m-1
if(!(i>=0))return A.j(n,i)
i=B.b.m(A.p(J.m(n[i],"x")),1)
m=B.c.m(80,1)
h=b==="resident-chart-container"
g=h?"res-chart-grad":"chart-area-grad"
f=h?"#3B82F6":d
e=h?"#3B82F6":d
c.a='      <svg width="100%" height="100%" viewBox="0 0 340 100" style="overflow:visible">\n        <defs>\n          <linearGradient id="'+g+'" x1="0" y1="0" x2="0" y2="1">\n            <stop offset="0%" stop-color="'+e+'" stop-opacity="0.3"/>\n            <stop offset="100%" stop-color="'+e+'" stop-opacity="0.0"/>\n          </linearGradient>\n        </defs>\n        \n        <line x1="20" y1="20" x2="320" y2="20" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="50" x2="320" y2="50" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="80" x2="320" y2="80" stroke="#CBD5E1" stroke-width="1.5"/>\n        \n        <path d="'+("M "+k+","+j+" "+o+(" L "+i+","+m+" Z"))+'" fill="url(#'+g+')" />\n        <polyline points="'+l+'" fill="none" stroke="'+f+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>\n    '
B.a.p(n,new A.em(c,f))
r.st(s,c.a+="</svg>")},
aS(a){var s,r,q,p,o,n=document.getElementById("modal-historical-logs")
if(n==null)return
s=J.E(n)
s.st(n,"")
r=$.J().af()
q=A.G(r)
p=q.i("H<1>")
o=A.b6(new A.H(r,q.i("B(1)").a(new A.eb(a)),p),p.i("i.E"))
if(o.length===0)s.st(n,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous repair logs recorded for this meter.</div>')
else B.a.p(o,new A.ec(this,n))},
ac(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b="main_tank_level",a="ph_level",a0="turbidity",a1="reservoir-status-banner",a2="var(--amber-safety)",a3="var(--alert-green)",a4="ph_status",a5="turbidity_status",a6=$.J().aE(),a7=document,a8=t.O,a9=a8.a(a7.getElementById("slider-tank")),b0=a8.a(a7.getElementById("slider-ph")),b1=a8.a(a7.getElementById("slider-turbidity")),b2=a7.getElementById("sim-tank-val"),b3=a7.getElementById("sim-ph-val"),b4=a7.getElementById("sim-turbidity-val")
a8=a7.activeElement
if((a8==null?a9!=null:a8!==a9)&&a9!=null){B.f.sE(a9,J.I(a6.h(0,b)))
if(b2!=null)J.k(b2,A.c(a6.h(0,b))+"%")}a8=a7.activeElement
if((a8==null?b0!=null:a8!==b0)&&b0!=null){B.f.sE(b0,J.I(a6.h(0,a)))
if(b3!=null)J.k(b3,B.b.m(A.p(a6.h(0,a)),1))}a8=a7.activeElement
if((a8==null?b1!=null:a8!==b1)&&b1!=null){B.f.sE(b1,J.I(a6.h(0,a0)))
if(b4!=null)J.k(b4,B.b.m(A.p(a6.h(0,a0)),1)+" NTU")}s=a7.getElementById("asset-tank-percent")
r=a7.getElementById("asset-tank-fill")
q=a7.getElementById("asset-tank-banner")
p=A.ca(a6.h(0,b))
if(s!=null)J.k(s,""+p+"%")
a8=r!=null
if(a8){o=r.style
o.height=""+p+"%"}if(q!=null&&a8)if(p<30){J.k(q,"CRITICAL: Low Water Reserve. High pressure risk in Zone 4 & 5!")
q.className="reservoir-status-banner low"
a8=r.style
a8.background="linear-gradient(180deg, #F87171 0%, #DC2626 100%)"}else{a8=J.E(q)
if(p<50){a8.sT(q,"WARNING: Moderate Reserve. Stabilizing flow valves recommended.")
q.className=a1
a8=q.style
a8.backgroundColor="var(--alert-amber-bg)"
a8=q.style
a8.borderColor="rgba(249, 115, 22, 0.3)"
a8=q.style
a8.color=a2
a8=r.style
a8.background="linear-gradient(180deg, #FBBF24 0%, #D97706 100%)"}else{a8.sT(q,"Reservoir Status: Normal Operating Pressure")
q.className=a1
a8=q.style
a8.backgroundColor="var(--alert-green-bg)"
a8=q.style
a8.borderColor="rgba(16, 185, 129, 0.2)"
a8=q.style
a8.color=a3
a8=r.style
a8.background="linear-gradient(180deg, #60A5FA 0%, #2563EB 100%)"}}n=a7.getElementById("asset-ph-val")
m=a7.getElementById("asset-ph-badge")
l=a7.getElementById("asset-ph-pointer")
k=a7.getElementById("asset-ph-desc")
j=A.p(a6.h(0,a))
if(n!=null)J.k(n,B.b.m(j,1))
if(l!=null){i=B.b.ao((j-4)/6*100,0,100)
a8=l.style
a8.left=A.c(i)+"%"}if(m!=null){J.k(m,J.I(a6.h(0,a4)).toUpperCase())
m.className="quality-badge "+A.c(a6.h(0,a4))}if(k!=null)J.k(k,A.ae(a6.h(0,"ph_desc")))
h=a7.getElementById("asset-turbidity-val")
g=a7.getElementById("asset-turbidity-badge")
f=a7.getElementById("asset-turbidity-fill")
e=a7.getElementById("asset-turbidity-desc")
d=A.p(a6.h(0,a0))
if(h!=null)J.k(h,B.b.m(d,1))
if(f!=null){c=B.b.ao(d/12*100,0,100)
a7=f.style
a7.width=A.c(c)+"%"
if(J.q(a6.h(0,a5),"warning")){a7=f.style
a7.backgroundColor=a2}else{a7=f.style
a7.backgroundColor=a3}}if(g!=null){J.k(g,J.I(a6.h(0,a5)).toUpperCase())
g.className="quality-badge "+A.c(a6.h(0,a5))}if(e!=null)J.k(e,A.ae(a6.h(0,"turbidity_desc")))},
aT(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this
if(f.a==null)return
s=document
r=s.getElementById("worker-name")
q=s.getElementById("worker-role")
p=s.getElementById("worker-zone-lbl")
o=s.getElementById("worker-avatar")
if(r!=null)J.k(r,A.ae(f.a.h(0,"name")))
if(q!=null)J.k(q,A.ae(f.a.h(0,"role")))
if(p!=null)J.k(p,"Assigned Zone: "+A.c(f.a.h(0,"selected_zone")))
if(o!=null){n=A.u(J.I(f.a.h(0,"name")).split(" "),t.s)
J.k(o,B.d.a3(new A.a0(n,t.d.a(new A.ed()),t.e).X(0,""),0,B.c.ao(n.length,1,2)).toUpperCase())}m=$.J()
l=m.P()
k=A.G(l)
j=new A.H(l,k.i("B(1)").a(new A.ee(f)),k.i("H<1>")).gk(0)
m=m.af()
k=A.G(m)
i=new A.H(m,k.i("B(1)").a(new A.ef(f)),k.i("H<1>")).gk(0)
h=s.getElementById("profile-stat-total")
g=s.getElementById("profile-stat-logs")
if(h!=null)J.k(h,B.c.j(j))
if(g!=null)J.k(g,B.c.j(i))},
cp(){var s,r,q=this,p=document,o=t.f,n=o.a(p.getElementById("bill-meter-search")),m=p.getElementById("bill-meter-results"),l=o.a(p.getElementById("bill-curr-input")),k=t.o.a(p.getElementById("btn-save-bill"))
if(n==null)return
o=t.E
s=o.i("~(1)?")
o=o.c
A.z(n,"focus",s.a(new A.dM(q)),!1,o)
A.z(n,"input",s.a(new A.dN(q)),!1,o)
if(l!=null)A.z(l,"input",s.a(new A.dO(q)),!1,o)
A.z(p,"click",t.h2.a(new A.dP(n,m)),!1,t.V)
if(k!=null){p=t.C
A.z(k,"click",p.i("~(1)?").a(new A.dQ(q)),!1,p.c)}r=$.J().P()
p=r.length
if(p!==0){if(0>=p)return A.j(r,0)
q.ay=A.ae(J.m(r[0],"house_id"))
if(0>=r.length)return A.j(r,0)
p=A.c(J.m(r[0],"owner_name"))
if(0>=r.length)return A.j(r,0)
B.f.sE(n,p+" ("+A.c(J.m(r[0],"account_number"))+")")}},
b0(){var s,r,q,p,o=document,n=t.f.a(o.getElementById("bill-meter-search")),m=o.getElementById("bill-meter-results")
if(n==null||m==null)return
o=n.value
s=o==null?null:B.d.U(o.toLowerCase())
if(s==null)s=""
r=$.J().P()
o=A.G(r)
q=o.i("H<1>")
p=A.b6(new A.H(r,o.i("B(1)").a(new A.eo(s)),q),q.i("i.E"))
o=J.E(m)
o.st(m,"")
if(p.length===0){o.st(m,'<div class="search-result-item" style="color:var(--text-muted); cursor:default">No households found</div>')
o=m.style
o.display="block"
return}B.a.p(p,new A.ep(this,n,m))
o=m.style
o.display="block"},
bt(a){var s,r,q,p,o,n,m,l,k=this,j="current_m3_usage",i=a!=null
if(i)k.ay=a
s=k.ay
if(s==null)return
r=$.J()
q=r.a1(s)
if(q==null)return
s=document
p=s.getElementById("bill-prev-reading")
o=t.f.a(s.getElementById("bill-curr-input"))
s=k.ay
s.toString
n=r.aC(s)
s=n.length
if(s!==0){if(0>=s)return A.j(n,0)
m=A.p(J.m(n[0],"current_reading"))}else{s=J.v(q)
l=A.aK(t.R.a(s.h(q,"monthly_history")),t.H)
r=l.length
m=r>=2?l[r-2]:A.p(s.h(q,j))-2.5}if(p!=null)J.k(p,B.b.m(m,1))
if(i&&o!=null)B.f.sE(o,B.b.m(A.p(J.m(q,j)),1))
k.aV()
i=k.ay
i.toString
k.bs(i)},
aV(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
if(this.ay==null)return
s=document
r=s.getElementById("bill-prev-reading")
q=t.f.a(s.getElementById("bill-curr-input"))
p=r==null?null:r.textContent
o=A.aM(p==null?"":p)
if(o==null)o=0
p=q==null?null:q.value
n=A.aM(p==null?"":p)
m=(n==null?0:n)-o
if(m<0)m=0
l=s.getElementById("bill-calc-consumption")
if(l!=null)J.k(l,B.b.m(m,1))
k=m>10?(m-10)*15:0
j=s.getElementById("bill-calc-excess")
if(j!=null)J.k(j,B.b.m(k,2))
i=s.getElementById("bill-calc-total")
if(i!=null)J.k(i,B.b.m(120+k+50,2))
p=$.J()
h=this.ay
h.toString
g=p.bl(h,"June 2026")
f=s.getElementById("billing-alert-banner")
e=t.o.a(s.getElementById("btn-save-bill"))
if(f!=null){s=J.E(f)
if(g){s.st(f,'          <svg style="width:18px;height:18px;fill:currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n          <span>DOUBLE-BILLING BLOCKED: Bill already registered for June 2026.</span>\n        ')
f.className="reservoir-status-banner low"
s=f.style
s.backgroundColor="var(--alert-red-bg)"
s=f.style
s.borderColor="rgba(239, 68, 68, 0.3)"
s=f.style
s.color="var(--alert-red)"
if(e!=null){e.disabled=!0
s=e.style
s.toString
B.l.bb(s,B.l.b6(s,"opacity"),"0.5","")
s=e.style
s.cursor="not-allowed"
d=e.querySelector("span")
if(d!=null)J.k(d,"Register Blocked (Billed)")}}else{s.st(f,'          <svg style="width:18px;height:18px;fill:currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n          <span>CLEAR: Safe to bill June 2026. No duplicates found.</span>\n        ')
f.className="reservoir-status-banner"
s=f.style
s.backgroundColor="var(--alert-green-bg)"
s=f.style
s.borderColor="rgba(16, 185, 129, 0.3)"
s=f.style
s.color="var(--alert-green)"
if(e!=null){e.disabled=!1
s=e.style
s.toString
B.l.bb(s,B.l.b6(s,"opacity"),"1","")
s=e.style
s.cursor="pointer"
d=e.querySelector("span")
if(d!=null)J.k(d,"Register & Save Bill")}}}},
bA(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d=null,c=e.ay
if(c==null||e.a==null)return
s=$.J()
if(s.bl(c,"June 2026")){e.F("Operation blocked to prevent double-billing!")
return}c=document
r=c.getElementById("bill-prev-reading")
q=t.f.a(c.getElementById("bill-curr-input"))
p=c.getElementById("bill-calc-consumption")
o=c.getElementById("bill-calc-excess")
c=r==null?d:r.textContent
n=A.aM(c==null?"":c)
if(n==null)n=0
c=q==null?d:q.value
m=A.aM(c==null?"":c)
if(m==null)m=0
c=p==null?d:p.textContent
l=A.aM(c==null?"":c)
if(l==null)l=0
c=o==null?d:o.textContent
k=A.aM(c==null?"":c)
c=120+(k==null?0:k)
j=e.ay
j.toString
i=s.a1(j)
if(i==null)return
j=J.v(i)
h=t.N
g=t.z
c=t.P.a(A.D(["house_id",e.ay,"account_number",j.h(i,"account_number"),"billing_month","June 2026","previous_reading",n,"current_reading",m,"consumption",l,"water_charge",c,"maintenance_fee",50,"total_due",c+50,"billed_by",e.a.h(0,"worker_id")],h,g))
f=s.aD()
s=A.cE(h,g)
s.n(0,"bill_id","BILL-"+(5000+B.k.bq(5000)))
s.n(0,"date",new A.a6(Date.now(),0,!1).az().au())
s.n(0,"status","Pending")
s.J(0,c)
B.a.bm(f,0,s)
s=window.localStorage
s.toString
s.setItem("waterhall_billing_records",B.e.K(f))
e.F("June 2026 bill registered for "+A.c(j.h(i,"owner_name"))+"!")
e.aV()
j=e.ay
j.toString
e.bs(j)
e.aT()},
bs(a){var s,r,q=document.getElementById("billing-history-list")
if(q==null)return
s=J.E(q)
s.st(q,"")
r=$.J().aC(a)
if(r.length===0)s.st(q,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous invoice logs recorded.</div>')
else B.a.p(r,new A.dT(this,q))},
b2(a,b){var s=document,r=s.getElementById("app-toast"),q=s.getElementById("toast-text")
if(r!=null&&q!=null){J.k(q,a)
J.a4(r).l(0,"show")
s=this.ch
if(s!=null)s.cb()
this.ch=A.jv(A.hq(b,0),new A.er(r))}},
F(a){return this.b2(a,2500)},
a9(a){var s,r=this
r.d=a
window.localStorage.setItem("waterhall_resident_session",a)
s=r.ax
s===$&&A.O()
new A.am(s,A.A(s).i("am<2>")).p(0,new A.eq())
s=r.Q
s===$&&A.O()
s=s.style
s.display="none"
s=r.as
s===$&&A.O()
if(s!=null){s=s.style
s.display="flex"
s=r.as
s.toString
J.a4(s).l(0,"resident-mode")
s=r.at
s===$&&A.O()
if(s!=null)J.k(s,"Tech Mode")}s=r.z
s===$&&A.O()
J.a4(s).l(0,"active")
r.b="view-resident"
r.cw()},
cw(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=this,a5="monthly_history",a6="current_m3_usage",a7=a4.d
if(a7==null)return
q=$.J()
p=q.a1(a7)
if(p==null)return
a7=document
o=a7.getElementById("resident-profile-name")
n=a7.getElementById("resident-profile-meta")
if(o!=null)J.k(o,A.ae(J.m(p,"owner_name")))
if(n!=null){m=J.v(p)
J.k(n,"Meter ID: "+A.c(m.h(p,"house_id"))+" | "+A.c(m.h(p,"account_number"))+" | "+A.c(m.h(p,"purok")))}l=a7.getElementById("resident-leak-flag")
if(l!=null){m=J.E(l)
if(J.q(J.m(p,"current_leak_status"),"leak")){m.st(l,'          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n          <span>Leak Alert Warning: High constant flow rate registered. Please inspect on-site faucets.</span>\n        ')
l.className="reservoir-status-banner low"
m=l.style
m.backgroundColor="var(--alert-red-bg)"
m=l.style
m.borderColor="rgba(239, 68, 68, 0.3)"
m=l.style
m.color="var(--alert-red)"}else{m.st(l,'          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n          <span>Normal Flow Clearance: IoT sensors verify secure line pressure. No leak detected.</span>\n        ')
l.className="reservoir-status-banner"
m=l.style
m.backgroundColor="var(--alert-green-bg)"
m=l.style
m.borderColor="rgba(16, 185, 129, 0.2)"
m=l.style
m.color="var(--alert-green)"}}m=a4.d
m.toString
s=q.aC(m)
r=null
try{r=J.dj(s,new A.eg())}catch(k){}if(r!=null){j=A.p(J.m(r,"previous_reading"))
i=A.p(J.m(r,"current_reading"))
h=A.p(J.m(r,"consumption"))
g=h>10?(h-10)*15:0
f=A.p(J.m(r,"total_due"))
e=A.n(J.m(r,"status"))
d=J.q(J.m(r,"status"),"Paid")?"normal":"warning"}else{q=J.v(p)
c=A.aK(t.R.a(q.h(p,a5)),t.H)
m=c.length
j=m>=2?c[m-2]:A.p(q.h(p,a6))-2.5
i=A.p(q.h(p,a6))
h=i-j
if(h<0)h=0
g=h>10?(h-10)*15:0
f=120+g+50
e="Unbilled (Draft)"
d="warning"}b=a7.getElementById("resident-prev-reading")
a=a7.getElementById("resident-curr-reading")
a0=a7.getElementById("resident-calc-consumption")
a1=a7.getElementById("resident-calc-excess")
a2=a7.getElementById("resident-calc-total")
a3=a7.getElementById("resident-bill-status")
if(b!=null)J.k(b,B.b.m(j,1))
if(a!=null)J.k(a,B.b.m(i,1))
if(a0!=null)J.k(a0,B.b.m(h,1))
if(a1!=null)J.k(a1,B.b.m(g,2))
if(a2!=null)J.k(a2,B.b.m(f,2))
if(a3!=null){J.k(a3,e.toUpperCase())
a3.className="quality-badge "+d}a4.bu(A.aK(t.R.a(J.m(p,a5)),t.H),"resident-chart-container")
a4.cz(s)},
cz(a){var s,r
t.fO.a(a)
s=document.getElementById("resident-history-list")
if(s==null)return
r=J.E(s)
r.st(s,"")
if(a.length===0){r.st(s,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No billing history available.</div>')
return}B.a.p(a,new A.eh(this,s))}}
A.dS.prototype={
$0(){var s,r,q,p,o=document.getElementById("phone-time")
if(o!=null){s=new A.a6(Date.now(),0,!1)
r=A.aw(s)
q=B.d.O(B.c.j(A.b8(s)),2,"0")
p=r>=12?"PM":"AM"
r=B.c.ag(r,12)
J.k(o,""+(r!==0?r:12)+":"+q+" "+p)}},
$S:2}
A.dR.prototype={
$1(a){t.D.a(a)
return this.a.$0()},
$S:20}
A.dr.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this,i="waterhall_session"
t.V.a(a)
p=j.b
if(p==null)o=null
else{p=p.value
p=p==null?null:B.d.U(p)
o=p}s=o==null?"":o
p=j.c
n=p==null?null:p.value
if(n==null)n=""
if(J.a5(s)===0){j.a.b1("Credentials are required.",j.d)
return}p=$.J()
m=p.aY(s,n)
if(m!=null){p=j.a
p.a=m
l=window.localStorage
l.toString
l.setItem(i,B.e.K(m))
l=window.localStorage
l.toString
B.i.A(l,"waterhall_resident_session")
l=j.d
if(l!=null){l=l.style
l.display="none"}p.ah(m)
p.F("Logged in as Tech: "+A.c(m.h(0,"name")))
return}r=p.P()
try{q=J.dj(r,new A.dq(s))
p=window.localStorage
p.toString
B.i.A(p,i)
p=j.a
p.a=null
p.a9(A.n(J.m(q,"house_id")))
l=j.d
if(l!=null){l=l.style
l.display="none"}p.F("Logged in as Resident: "+A.c(J.m(q,"owner_name")))
return}catch(k){}j.a.b1('Credentials "'+A.c(s)+'" not recognized. Check details.',j.d)},
$S:0}
A.dq.prototype={
$1(a){var s,r
t.P.a(a)
s=J.v(a)
r=this.a
return J.I(s.h(a,"house_id")).toLowerCase()===r.toLowerCase()||J.I(s.h(a,"account_number")).toLowerCase()===r.toLowerCase()},
$S:1}
A.ds.prototype={
$1(a){var s,r
t.V.a(a)
s=window.localStorage
s.toString
B.i.A(s,"waterhall_session")
s=this.a
s.a=null
r=s.Q
r===$&&A.O()
r=r.style
r.display="none"
r=s.as
r===$&&A.O()
if(r!=null){r=r.style
r.display="none"}r=s.ax
r===$&&A.O()
new A.am(r,A.A(r).i("am<2>")).p(0,new A.dp())
r=s.e
r===$&&A.O()
J.a4(r).l(0,"active")
s.b="view-login"
r=this.b
if(r!=null)B.f.sE(r,"EMP-304")
s.F("Signed out of Tech session")},
$S:0}
A.dp.prototype={
$1(a){return J.a4(t.h.a(a)).A(0,"active")},
$S:5}
A.dt.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.a9("HH-101")
s.F("Logged in as Resident (Maria C. Santos)")},
$S:0}
A.dE.prototype={
$1(a){var s,r
t.V.a(a)
s=window.localStorage
s.toString
B.i.A(s,"waterhall_session")
s=this.a
s.a=null
r=s.Q
r===$&&A.O()
r=r.style
r.display="none"
s.a9("HH-101")
s.F(u.d)},
$S:0}
A.dF.prototype={
$1(a){var s,r,q
t.V.a(a)
s=window.localStorage
s.toString
B.i.A(s,"waterhall_resident_session")
r=$.J().aY("EMP-304","Purok 2")
if(r!=null){s=this.a
s.a=r
q=window.localStorage
q.toString
q.setItem("waterhall_session",B.e.K(r))
s.ah(r)
s.F("Bypassed to Tech Terminal (Juan Luna)")}},
$S:0}
A.dG.prototype={
$1(a){var s,r
t.V.a(a)
s=window.localStorage
s.toString
B.i.A(s,"waterhall_resident_session")
s=this.a
r=s.Q
r===$&&A.O()
r=r.style
r.display="none"
r=s.as
r===$&&A.O()
if(r!=null){r=r.style
r.display="none"}r=s.ax
r===$&&A.O()
new A.am(r,A.A(r).i("am<2>")).p(0,new A.dn())
r=s.e
r===$&&A.O()
J.a4(r).l(0,"active")
s.b="view-login"
s.F("Signed out of Resident Portal")},
$S:0}
A.dn.prototype={
$1(a){return J.a4(t.h.a(a)).A(0,"active")},
$S:5}
A.dH.prototype={
$1(a){var s,r,q,p,o="waterhall_session"
t.V.a(a)
s=this.a
s.aP()
r=document.getElementById("bill-meter-results")
if(r!=null){q=r.style
q.display="none"}if(s.b==="view-resident"){q=window.localStorage
q.toString
B.i.A(q,"waterhall_resident_session")
p=$.J().aY("EMP-304","Purok 2")
if(p!=null){s.a=p
q=window.localStorage
q.toString
q.setItem(o,B.e.K(p))
s.ah(p)
s.F("Bypassed to Tech Terminal (Juan Luna)")}}else{q=window.localStorage
q.toString
B.i.A(q,o)
s.a=null
q=s.Q
q===$&&A.O()
q=q.style
q.display="none"
s.a9("HH-101")
s.F(u.d)}},
$S:0}
A.dI.prototype={
$1(a){var s,r
t.h.a(a)
s=J.aZ(a)
r=s.$ti
A.z(s.a,s.b,r.i("~(1)?").a(new A.dm(this.a,a)),!1,r.c)},
$S:5}
A.dm.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.b.getAttribute("data-target")
if(s==null)s=""
this.a.a4(s)},
$S:0}
A.dJ.prototype={
$1(a){return this.a.a8()},
$S:3}
A.dK.prototype={
$1(a){return this.a.a8()},
$S:3}
A.dL.prototype={
$1(a){return this.a.a8()},
$S:3}
A.du.prototype={
$1(a){t.V.a(a)
return this.a.aP()},
$S:0}
A.dv.prototype={
$1(a){if(A.i6(t.V.a(a).target)===this.b)this.a.aP()},
$S:0}
A.dw.prototype={
$1(a){var s,r,q,p,o,n=this.a,m=n.c
if(m==null)return
s=this.b.checked
r=s===!0?"leak":"normal"
q=$.J().bv(m,r)
if(q!=null){m=document
p=m.getElementById("modal-flow-rate")
if(p!=null)J.k(p,B.b.m(A.p(J.m(q,"flow_rate")),2))
n.aX(r)
n.F(r==="leak"?"Simulated Leak ALERT activated!":"Simulated Normal flow rate restored.")
s=n.c
s.toString
n.aS(s)
o=t.I.a(m.getElementById("log-resolved"))
if(o!=null)B.f.san(o,r==="normal")}},
$S:3}
A.dx.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h
t.V.a(a)
s=this.a
if(s.c==null||s.a==null)return
r=document
q=t.p.a(r.getElementById("log-desc"))
p=q==null
if(p)o=null
else{n=q.value
n=n==null?null:B.d.U(n)
o=n}if(o==null)o=""
m=t.I.a(r.getElementById("log-resolved"))
n=m==null?null:m.checked
l=n!==!1
if(o.length===0){s.F("Please detail the maintenance actions taken.")
return}k=A.D(["house_id",s.c,"worker_id",s.a.h(0,"worker_id"),"purok",s.a.h(0,"selected_zone"),"description",o,"status_resolved",l],t.N,t.z)
n=$.J()
n.bh(k)
if(l){j=s.c
j.toString
n.bv(j,"normal")
j=this.b
if(j!=null)B.f.san(j,!1)
s.aX("normal")}j=s.c
j.toString
i=n.a1(j)
if(i!=null){h=r.getElementById("modal-flow-rate")
if(h!=null)J.k(h,B.b.m(A.p(J.m(i,"flow_rate")),2))}if(!p)B.n.sE(q,"")
s.F("Maintenance Log committed to database!")
r=s.c
r.toString
s.aS(r)
s.ad()},
$S:0}
A.dy.prototype={
$1(a){var s=this.b.value,r=A.hG(s==null?"":s,null)
if(r==null)r=68
s=this.c
if(s!=null)J.k(s,""+r+"%")
s=t.P.a(A.D(["main_tank_level",r],t.N,t.z))
$.J().aW(s)
this.a.ac()},
$S:3}
A.dz.prototype={
$1(a){var s=this.b.value,r=A.aM(s==null?"":s)
if(r==null)r=5.8
s=this.c
if(s!=null)J.k(s,B.b.m(r,1))
s=t.P.a(A.D(["ph_level",r],t.N,t.z))
$.J().aW(s)
this.a.ac()},
$S:3}
A.dA.prototype={
$1(a){var s=this.b.value,r=A.aM(s==null?"":s)
if(r==null)r=6.2
s=this.c
if(s!=null)J.k(s,B.b.m(r,1)+" NTU")
s=t.P.a(A.D(["turbidity",r],t.N,t.z))
$.J().aW(s)
this.a.ac()},
$S:3}
A.dB.prototype={
$1(a){var s,r,q,p,o,n="selected_zone"
t.V.a(a)
s=this.a
if(s.a==null)return
r=document
q=t.Z
p=q.a(r.getElementById("filter-purok"))
o=q.a(r.getElementById("filter-status"))
if(p!=null)B.j.sE(p,A.ae(s.a.h(0,n)))
if(o!=null)B.j.sE(o,"leak")
s.a4("view-directory")
s.F("Showing leaks in your assigned patrol zone "+A.c(s.a.h(0,n)))},
$S:0}
A.dC.prototype={
$1(a){t.V.a(a)
this.a.b2("Dispatching radio ping to Barangay Office...",3500)},
$S:0}
A.dD.prototype={
$1(a){var s,r,q,p,o,n,m
t.V.a(a)
s=this.a
if(s.d==null)return
r=t.p.a(document.getElementById("resident-log-desc"))
q=r==null
if(q)p=null
else{o=r.value
o=o==null?null:B.d.U(o)
p=o}if(p==null)p=""
if(p.length===0){s.F("Please describe the issue (e.g. low pressure, minor leak).")
return}o=$.J()
n=s.d
n.toString
m=o.a1(n)
if(m==null)return
o.bh(A.D(["house_id",s.d,"worker_id","unassigned","purok",J.m(m,"purok"),"description",p+" (RESIDENT REPORTED)","status_resolved",!1],t.N,t.z))
if(!q)B.n.sE(r,"")
s.F("Alert ticket dispatched to field technicians!")
s.ad()},
$S:0}
A.es.prototype={
$1(a){var s
t.h.a(a)
s=J.E(a)
if(a.getAttribute("data-target")===this.a)s.ga6(a).l(0,"active")
else s.ga6(a).A(0,"active")},
$S:5}
A.et.prototype={
$2(a,b){var s
A.n(a)
t.h.a(b)
s=J.E(b)
if(a===this.a)s.ga6(b).l(0,"active")
else s.ga6(b).A(0,"active")},
$S:37}
A.e2.prototype={
$1(a){return J.q(J.m(t.P.a(a),"current_leak_status"),"leak")},
$S:1}
A.e3.prototype={
$1(a){var s,r,q
t.P.a(a)
s=document.createElement("div")
s.className="alert-item leak"
r=s.style
r.cursor="pointer"
r=J.v(a)
q=J.E(s)
q.st(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.c(r.h(a,"owner_name"))+" ("+A.c(r.h(a,"purok"))+")</strong><br>\n              Leak alert: Flow rate at "+B.b.m(A.p(r.h(a,"flow_rate")),2)+" L/s constant.\n            </div>\n          ")
q=q.gY(s)
r=q.$ti
A.z(q.a,q.b,r.i("~(1)?").a(new A.e1(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:4}
A.e1.prototype={
$1(a){t.V.a(a)
this.a.br(A.n(J.m(this.b,"house_id")))},
$S:0}
A.e4.prototype={
$1(a){var s,r,q
t.ck.a(a)
s=document.createElement("div")
s.className="alert-item quality"
r=s.style
r.cursor="pointer"
r=J.v(a)
q=J.E(s)
q.st(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.c(r.h(a,"name"))+"</strong><br>\n              "+A.c(r.h(a,"desc"))+"\n            </div>\n          ")
q=q.gY(s)
r=q.$ti
A.z(q.a,q.b,r.i("~(1)?").a(new A.e0(this.a)),!1,r.c)
this.b.appendChild(s).toString},
$S:26}
A.e0.prototype={
$1(a){t.V.a(a)
this.a.a4("view-assets")},
$S:0}
A.e5.prototype={
$2(a,b){var s,r,q,p,o,n
A.n(b)
s=document.getElementById("pin-p"+(a+1))
if(s!=null){r=s.querySelector(".pin-bg")
q=B.a.am(this.b,new A.dZ(b))
if(r!=null)if(q){r.setAttribute("fill","var(--alert-red)")
r.setAttribute("stroke","#FFF")
r.setAttribute("stroke-width","1.5")}else{r.setAttribute("fill","var(--alert-green)")
r.removeAttribute("stroke")}p=s.style
p.cursor="pointer"
p=J.E(s)
o=t.h.a(p.cd(s,!0))
p.cA(s,o)
p=J.aZ(o)
n=p.$ti
A.z(p.a,p.b,n.i("~(1)?").a(new A.e_(this.a,b)),!1,n.c)}},
$S:27}
A.dZ.prototype={
$1(a){var s
t.P.a(a)
s=J.v(a)
return J.q(s.h(a,"purok"),this.a)&&J.q(s.h(a,"current_leak_status"),"leak")},
$S:1}
A.e_.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Z
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.j.sE(q,this.b)
if(p!=null)B.j.sE(p,"all")
this.a.a4("view-directory")},
$S:0}
A.e6.prototype={
$1(a){var s,r,q,p,o,n,m,l
A.n(a)
s=this.b
r=A.G(s)
q=r.i("B(1)")
r=r.i("H<1>")
p=new A.H(s,q.a(new A.dW(a)),r).gk(0)
o=new A.H(s,q.a(new A.dX(a)),r).gk(0)
r=this.a
n=J.q(r.a.h(0,"selected_zone"),a)
m=document.createElement("div")
m.className="zone-card "+(n?"assigned":"")
s=n?'<span class="zone-badge">ASSIGNED</span>':""
q=o>0?""+o+" Leaks":"Clear"
l=J.E(m)
l.st(m,'          <div class="zone-card-header">\n            <span class="zone-name">'+a+"</span>\n            "+s+'\n          </div>\n          <div class="zone-stats">\n            <span>Meters: <strong>'+p+'</strong></span>\n            <span class="zone-leak-count">'+q+"</span>\n          </div>\n        ")
l=l.gY(m)
q=l.$ti
A.z(l.a,l.b,q.i("~(1)?").a(new A.dY(r,a)),!1,q.c)
this.c.appendChild(m).toString},
$S:28}
A.dW.prototype={
$1(a){return J.q(J.m(t.P.a(a),"purok"),this.a)},
$S:1}
A.dX.prototype={
$1(a){var s
t.P.a(a)
s=J.v(a)
return J.q(s.h(a,"purok"),this.a)&&J.q(s.h(a,"current_leak_status"),"leak")},
$S:1}
A.dY.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Z
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.j.sE(q,this.b)
if(p!=null)B.j.sE(p,"all")
this.a.a4("view-directory")},
$S:0}
A.e7.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j
t.P.a(a)
s=B.a.bk(this.b,new A.dU(a),new A.dV())
r=J.v(s)
q=r.gM(s)?r.h(s,"owner_name"):"Unknown Household"
p=document.createElement("div")
r=J.v(a)
p.className="log-card "+(J.q(r.h(a,"status_resolved"),!0)?"resolved":"pending")
o=A.bv(A.n(r.h(a,"date"))).aw()
n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
m=B.c.ag(A.aw(o),12)===0?12:B.c.ag(A.aw(o),12)
l=B.d.O(B.c.j(A.b8(o)),2,"0")
k=A.aw(o)>=12?"PM":"AM"
j=A.cI(o)-1
if(!(j>=0&&j<12))return A.j(n,j)
j=n[j]
J.b_(p,'            <div class="log-card-header">\n              <span>'+A.c(q)+'</span>\n              <span style="font-size:10px; color:var(--text-muted)">'+(j+" "+A.cH(o)+" "+m+":"+l+" "+k)+'</span>\n            </div>\n            <div class="log-card-desc">'+A.c(r.h(a,"description"))+"</div>\n          ")
this.c.appendChild(p).toString},
$S:4}
A.dU.prototype={
$1(a){var s="house_id"
return J.q(J.m(t.P.a(a),s),J.m(this.a,s))},
$S:1}
A.dV.prototype={
$0(){return A.cE(t.N,t.z)},
$S:29}
A.e9.prototype={
$1(a){var s,r,q,p,o
t.P.a(a)
s=J.v(a)
r=this.a
q=B.d.v(J.I(s.h(a,"owner_name")).toLowerCase(),r)||B.d.v(J.I(s.h(a,"account_number")).toLowerCase(),r)||B.d.v(J.I(s.h(a,"house_id")).toLowerCase(),r)
r=this.b
p=r==="all"||J.q(s.h(a,"purok"),r)
r=this.c
o=r==="all"||J.q(s.h(a,"current_leak_status"),r)
return q&&p&&o},
$S:1}
A.ea.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j="current_leak_status"
t.P.a(a)
s=document.createElement("div")
r=J.v(a)
s.className="household-card "+(J.q(r.h(a,j),"leak")?"has-leak":"")
q=A.c(r.h(a,"owner_name"))
p=A.c(r.h(a,"purok"))
o=A.c(r.h(a,"account_number"))
n=A.c(r.h(a,"current_m3_usage"))
m=A.c(r.h(a,j))
l=J.q(r.h(a,j),"leak")?'<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> Leak':'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Normal'
k=J.E(s)
k.st(s,'          <div class="household-info">\n            <span class="household-name">'+q+'</span>\n            <div class="household-meta">\n              <span class="household-purok">'+p+'</span>\n              <span class="household-acct">'+o+'</span>\n            </div>\n            <div class="household-usage">Usage this Month: <strong>'+n+' m\xb3</strong></div>\n          </div>\n          <div class="household-status-section">\n            <span class="status-indicator '+m+'">\n              '+l+'\n            </span>\n            <span class="household-flow">Flow: <span>'+B.b.m(A.p(r.h(a,"flow_rate")),2)+" L/s</span></span>\n          </div>\n        ")
k=k.gY(s)
r=k.$ti
A.z(k.a,k.b,r.i("~(1)?").a(new A.e8(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:4}
A.e8.prototype={
$1(a){t.V.a(a)
this.a.br(A.n(J.m(this.b,"house_id")))},
$S:0}
A.ei.prototype={
$2(a,b){A.p(a)
A.p(b)
return a>b?a:b},
$S:30}
A.ej.prototype={
$1(a){var s,r,q,p
t.ek.a(a)
s=a.a
r=a.b
q=this.a.length
p=this.c
if(!(s>=0&&s<4))return A.j(p,s)
return A.D(["x",20+s/(q-1)*300,"y",80-r/this.b*60,"val",r,"label",p[s]],t.N,t.K)},
$S:31}
A.ek.prototype={
$1(a){var s
t.U.a(a)
s=J.v(a)
return B.b.m(A.p(s.h(a,"x")),1)+","+B.b.m(A.p(s.h(a,"y")),1)},
$S:16}
A.el.prototype={
$1(a){var s
t.U.a(a)
s=J.v(a)
return"L "+B.b.m(A.p(s.h(a,"x")),1)+","+B.b.m(A.p(s.h(a,"y")),1)},
$S:16}
A.em.prototype={
$1(a){var s,r
t.U.a(a)
s=this.a
r=J.v(a)
s.a=s.a+('        <text x="'+A.c(r.h(a,"x"))+'" y="96" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-weight="600">'+A.c(r.h(a,"label"))+'</text>\n        <line x1="'+A.c(r.h(a,"x"))+'" y1="'+A.c(r.h(a,"y"))+'" x2="'+A.c(r.h(a,"x"))+'" y2="80" stroke="rgba(249,115,22,0.2)" stroke-width="1" stroke-dasharray="2 2" />\n        <circle cx="'+A.c(r.h(a,"x"))+'" cy="'+A.c(r.h(a,"y"))+'" r="4" fill="var(--white)" stroke="'+this.b+'" stroke-width="2" />\n        <text x="'+A.c(r.h(a,"x"))+'" y="'+A.c(A.p(r.h(a,"y"))-8)+'" text-anchor="middle" fill="var(--navy-primary)" font-size="9" font-weight="700">'+A.c(r.h(a,"val"))+"m\xb3</text>\n      ")},
$S:33}
A.eb.prototype={
$1(a){return J.q(J.m(t.P.a(a),"house_id"),this.a)},
$S:1}
A.ec.prototype={
$1(a){var s,r,q,p,o,n,m,l,k="status_resolved"
t.P.a(a)
s=document.createElement("div")
r=J.v(a)
s.className="log-card "+(J.q(r.h(a,k),!0)?"resolved":"pending")
q=A.bv(A.n(r.h(a,"date"))).aw()
p=B.d.O(B.c.j(A.aw(q)),2,"0")
o=B.d.O(B.c.j(A.b8(q)),2,"0")
n=A.c(r.h(a,"worker_id"))
m=A.c(r.h(a,"description"))
l=J.q(r.h(a,k),!0)?"var(--alert-green)":"var(--amber-safety)"
r=J.q(r.h(a,k),!0)?"Resolved (Flow Restored)":"In Progress (Active Monitoring)"
J.b_(s,'          <div class="log-card-header">\n            <span>Tech: <strong>'+n+'</strong></span>\n            <span style="font-size:10px; color:var(--text-muted)">'+(""+A.cI(q)+"/"+A.cH(q)+"/"+A.b9(q)+" @ "+p+":"+o)+'</span>\n          </div>\n          <div class="log-card-desc">'+m+'</div>\n          <div style="font-size: 9px; font-weight:700; color:'+l+'; margin-top:4px; text-transform:uppercase">\n            Status: '+r+"\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:4}
A.ed.prototype={
$1(a){var s
A.n(a)
s=a.length
if(s!==0){if(0>=s)return A.j(a,0)
s=a[0]}else s=""
return s},
$S:14}
A.ee.prototype={
$1(a){return J.q(J.m(t.P.a(a),"purok"),this.a.a.h(0,"selected_zone"))},
$S:1}
A.ef.prototype={
$1(a){var s,r="worker_id"
t.P.a(a)
s=J.v(a)
return J.q(s.h(a,r),this.a.a.h(0,r))&&J.q(s.h(a,"status_resolved"),!0)},
$S:1}
A.dM.prototype={
$1(a){return this.a.b0()},
$S:3}
A.dN.prototype={
$1(a){return this.a.b0()},
$S:3}
A.dO.prototype={
$1(a){return this.a.aV()},
$S:3}
A.dP.prototype={
$1(a){var s=t.b4.a(A.i6(t.V.a(a).target)),r=!1
if(s!=null)if(!B.f.v(this.a,s)){r=this.b
r=r!=null&&!J.iT(r,s)}if(r){r=this.b.style
r.display="none"}},
$S:0}
A.dQ.prototype={
$1(a){t.V.a(a)
return this.a.bA()},
$S:0}
A.eo.prototype={
$1(a){var s,r
t.P.a(a)
s=J.v(a)
r=this.a
return B.d.v(J.I(s.h(a,"owner_name")).toLowerCase(),r)||B.d.v(J.I(s.h(a,"account_number")).toLowerCase(),r)},
$S:1}
A.ep.prototype={
$1(a){var s,r,q,p
t.P.a(a)
s=document.createElement("div")
s.className="search-result-item"
r=J.v(a)
q=J.E(s)
q.sT(s,A.c(r.h(a,"owner_name"))+" ("+A.c(r.h(a,"account_number"))+")")
q=q.gY(s)
r=this.c
p=q.$ti
A.z(q.a,q.b,p.i("~(1)?").a(new A.en(this.a,this.b,a,r)),!1,p.c)
r.appendChild(s).toString},
$S:4}
A.en.prototype={
$1(a){var s,r,q,p=this
t.V.a(a)
s=p.c
r=J.v(s)
B.f.sE(p.b,A.c(r.h(s,"owner_name"))+" ("+A.c(r.h(s,"account_number"))+")")
q=p.d.style
q.display="none"
p.a.bt(A.ae(r.h(s,"house_id")))},
$S:0}
A.dT.prototype={
$1(a){var s,r,q,p,o,n="status"
t.P.a(a)
s=document.createElement("div")
r=J.v(a)
s.className="bill-record-card "+A.c(r.h(a,n))
q=A.bv(A.n(r.h(a,"date"))).aw()
B.d.O(B.c.j(A.aw(q)),2,"0")
B.d.O(B.c.j(A.b8(q)),2,"0")
p=A.c(r.h(a,"billing_month"))
o=J.q(r.h(a,n),"Paid")?"var(--alert-green)":"var(--amber-safety)"
J.b_(s,'          <div class="bill-record-header">\n            <span>Cycle: '+p+'</span>\n            <span style="color:'+o+'">'+J.I(r.h(a,n)).toUpperCase()+'</span>\n          </div>\n          <div class="bill-record-details">\n            <span>Readings: '+B.b.m(A.p(r.h(a,"previous_reading")),1)+" \u2192 "+B.b.m(A.p(r.h(a,"current_reading")),1)+" m\xb3</span>\n            <strong>\u20b1"+B.b.m(A.p(r.h(a,"total_due")),2)+'</strong>\n          </div>\n          <div style="font-size:9px;color:var(--text-muted);margin-top:2px;display:flex;justify-content:space-between">\n            <span>Bill ID: '+A.c(r.h(a,"bill_id"))+"</span>\n            <span>Tech: "+A.c(r.h(a,"billed_by"))+"</span>\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:4}
A.er.prototype={
$0(){J.a4(this.a).A(0,"show")},
$S:2}
A.eq.prototype={
$1(a){return J.a4(t.h.a(a)).A(0,"active")},
$S:5}
A.eg.prototype={
$1(a){return J.q(J.m(t.P.a(a),"billing_month"),"June 2026")},
$S:1}
A.eh.prototype={
$1(a){var s,r,q,p,o,n,m,l="status"
t.P.a(a)
s=document.createElement("div")
r=J.v(a)
s.className="bill-record-card "+A.c(r.h(a,l))
q=A.bv(A.n(r.h(a,"date"))).aw()
p=B.d.O(B.c.j(A.aw(q)),2,"0")
o=B.d.O(B.c.j(A.b8(q)),2,"0")
n=A.c(r.h(a,"billing_month"))
m=J.q(r.h(a,l),"Paid")?"var(--alert-green)":"var(--amber-safety)"
J.b_(s,'        <div class="bill-record-header">\n          <span>Cycle: '+n+'</span>\n          <span style="color:'+m+'">'+J.I(r.h(a,l)).toUpperCase()+'</span>\n        </div>\n        <div class="bill-record-details">\n          <span>Usage: '+B.b.m(A.p(r.h(a,"previous_reading")),1)+" \u2192 "+B.b.m(A.p(r.h(a,"current_reading")),1)+" m\xb3 ("+B.b.m(A.p(r.h(a,"consumption")),1)+" m\xb3)</span>\n          <strong>\u20b1"+B.b.m(A.p(r.h(a,"total_due")),2)+'</strong>\n        </div>\n        <div style="font-size:9px;color:var(--text-muted);margin-top:2px;">\n          Bill Ref ID: '+A.c(r.h(a,"bill_id"))+" | Issued: "+(""+A.cI(q)+"/"+A.cH(q)+"/"+A.b9(q)+" "+p+":"+o)+"\n        </div>\n      ")
this.b.appendChild(s).toString},
$S:4}
A.ey.prototype={
S(){var s,r="waterhall_households",q="waterhall_central_assets",p="waterhall_maintenance_logs",o="waterhall_workers",n="waterhall_billing_records"
if(window.localStorage.getItem(r)==null){s=window.localStorage
s.toString
s.setItem(r,B.e.K($.l3))}if(window.localStorage.getItem(q)==null){s=window.localStorage
s.toString
s.setItem(q,B.e.K($.l2))}if(window.localStorage.getItem(p)==null){s=window.localStorage
s.toString
s.setItem(p,B.e.K($.l4))}if(window.localStorage.getItem(o)==null){s=window.localStorage
s.toString
s.setItem(o,B.e.K($.l5))}if(window.localStorage.getItem(n)==null){s=window.localStorage
s.toString
s.setItem(n,B.e.K($.iP()))}},
P(){this.S()
var s=window.localStorage.getItem("waterhall_households")
s.toString
return A.aK(t.R.a(B.e.a7(0,s)),t.P)},
a1(a){var s,r,q=this.P()
try{s=J.dj(q,new A.eB(a))
return s}catch(r){return null}},
bv(a,b){var s,r="flow_rate",q="leak_detected_at",p=this.P(),o=B.a.co(p,new A.eE(a))
if(o!==-1){if(!(o>=0&&o<p.length))return A.j(p,o)
J.bt(p[o],"current_leak_status",b)
s=p.length
if(b==="leak"){if(!(o<s))return A.j(p,o)
J.bt(p[o],r,0.75+B.k.bp()*0.5)
if(!(o<p.length))return A.j(p,o)
J.bt(p[o],q,new A.a6(Date.now(),0,!1).az().au())}else{if(!(o<s))return A.j(p,o)
J.bt(p[o],r,0.01+B.k.bp()*0.09)
if(!(o<p.length))return A.j(p,o)
J.bt(p[o],q,null)}s=window.localStorage
s.toString
s.setItem("waterhall_households",B.e.K(p))
if(!(o<p.length))return A.j(p,o)
return p[o]}return null},
aE(){this.S()
var s=window.localStorage.getItem("waterhall_central_assets")
s.toString
return A.hz(t.G.a(B.e.a7(0,s)),t.N,t.z)},
aW(a){var s,r,q,p="ph_status",o="turbidity_status",n="turbidity_desc"
t.P.a(a)
s=this.aE()
a.p(0,new A.eD(s))
s.n(0,"last_updated",new A.a6(Date.now(),0,!1).az().au())
r=A.p(s.h(0,"ph_level"))
q=r<6.5
if(q||r>8.5){s.n(0,p,"warning")
s.n(0,"ph_desc",q?"Acidic pH. Check lime feeder.":"Alkaline pH. Run acid neutralizing wash.")}else{s.n(0,p,"normal")
s.n(0,"ph_desc","pH levels normal.")}if(A.p(s.h(0,"turbidity"))>5){s.n(0,o,"warning")
s.n(0,n,"Elevated turbidity. Check backwash filters.")}else{s.n(0,o,"normal")
s.n(0,n,"Turbidity levels normal.")}q=window.localStorage
q.toString
q.setItem("waterhall_central_assets",B.e.K(s))
return s},
af(){this.S()
var s=window.localStorage.getItem("waterhall_maintenance_logs")
s.toString
return A.aK(t.R.a(B.e.a7(0,s)),t.P)},
bh(a){var s,r,q
t.P.a(a)
s=this.af()
r=A.cE(t.N,t.z)
r.n(0,"task_id","LOG-"+(1000+B.k.bq(9000)))
r.n(0,"date",new A.a6(Date.now(),0,!1).az().au())
r.J(0,a)
B.a.bm(s,0,r)
q=window.localStorage
q.toString
q.setItem("waterhall_maintenance_logs",B.e.K(s))
return r},
aY(a,b){var s,r,q,p,o,n
this.S()
p=window.localStorage.getItem("waterhall_workers")
p.toString
s=A.aK(t.R.a(B.e.a7(0,p)),t.P)
try{r=J.dj(s,new A.eF(a))
o=A.hy(t.N,t.z)
o.J(0,r)
q=o
J.bt(q,"selected_zone",b)
return q}catch(n){return null}},
aD(){this.S()
var s=window.localStorage.getItem("waterhall_billing_records")
if(s==null)return A.u([],t.t)
return A.aK(t.R.a(B.e.a7(0,s)),t.P)},
aC(a){var s=this.aD(),r=A.G(s),q=r.i("H<1>"),p=A.b6(new A.H(s,r.i("B(1)").a(new A.ez(a)),q),q.i("i.E"))
B.a.bB(p,new A.eA())
return p},
bl(a,b){return B.a.am(this.aD(),new A.eC(a,b))}}
A.eB.prototype={
$1(a){return J.q(J.m(t.P.a(a),"house_id"),this.a)},
$S:1}
A.eE.prototype={
$1(a){return J.q(J.m(t.P.a(a),"house_id"),this.a)},
$S:1}
A.eD.prototype={
$2(a,b){this.a.n(0,A.n(a),b)},
$S:34}
A.eF.prototype={
$1(a){return J.I(J.m(t.P.a(a),"worker_id")).toLowerCase()===this.a.toLowerCase()},
$S:1}
A.ez.prototype={
$1(a){return J.q(J.m(t.P.a(a),"house_id"),this.a)},
$S:1}
A.eA.prototype={
$2(a,b){var s=t.P
s.a(a)
return A.bv(A.n(J.m(s.a(b),"date"))).W(0,A.bv(A.n(J.m(a,"date"))))},
$S:35}
A.eC.prototype={
$1(a){var s
t.P.a(a)
s=J.v(a)
return J.q(s.h(a,"house_id"),this.a)&&J.I(s.h(a,"billing_month")).toLowerCase()===this.b.toLowerCase()},
$S:1};(function aliases(){var s=J.bC.prototype
s.bD=s.j
s=J.av.prototype
s.bF=s.j
s=A.i.prototype
s.bE=s.aA
s=A.t.prototype
s.aG=s.L
s=A.c2.prototype
s.bG=s.R})();(function installTearOffs(){var s=hunkHelpers._static_1,r=hunkHelpers._static_0,q=hunkHelpers.installStaticTearOff
s(A,"kI","jz",6)
s(A,"kJ","jA",6)
s(A,"kK","jB",6)
r(A,"ii","kA",2)
s(A,"kM","k7",11)
q(A,"kS",4,null,["$4"],["jE"],15,0)
q(A,"kT",4,null,["$4"],["jF"],15,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.o,null)
q(A.o,[A.fU,J.bC,A.bP,J.az,A.C,A.eX,A.i,A.aI,A.bL,A.bW,A.x,A.f0,A.eV,A.c3,A.at,A.eP,A.bI,A.bJ,A.cz,A.fm,A.ac,A.d1,A.fu,A.c4,A.ai,A.bZ,A.a7,A.cU,A.bS,A.c9,A.a2,A.d5,A.aR,A.P,A.as,A.cl,A.cn,A.fk,A.a6,A.bx,A.cF,A.bQ,A.f8,A.eK,A.an,A.W,A.dc,A.be,A.ex,A.fR,A.d0,A.aQ,A.ag,A.bN,A.c2,A.dd,A.aD,A.cX,A.da,A.c8,A.fh,A.dl,A.ey])
q(J.bC,[J.cx,J.bE,J.U,J.b4,J.b5,J.bF,J.aG])
q(J.U,[J.av,J.K,A.y,A.cW,A.cp,A.bw,A.cq,A.b,A.b7,A.d7,A.db,A.df])
q(J.av,[J.cG,J.bg,J.ak])
r(J.cw,A.bP)
r(J.eL,J.K)
q(J.bF,[J.bD,J.cy])
q(A.C,[A.bH,A.aq,A.cB,A.cS,A.cL,A.d_,A.bG,A.cg,A.aa,A.bV,A.cR,A.bd,A.cm])
q(A.i,[A.w,A.aL,A.H])
q(A.w,[A.R,A.aH,A.am])
q(A.R,[A.bT,A.a0,A.d6,A.d4])
r(A.by,A.aL)
q(A.x,[A.bh,A.al,A.d3,A.cV])
r(A.aJ,A.bh)
r(A.bO,A.aq)
q(A.at,[A.cj,A.ck,A.cP,A.fG,A.fI,A.f4,A.f3,A.ff,A.eZ,A.fo,A.eR,A.eH,A.eI,A.eJ,A.f7,A.eU,A.eT,A.fp,A.fq,A.fr,A.ew,A.fK,A.dR,A.dr,A.dq,A.ds,A.dp,A.dt,A.dE,A.dF,A.dG,A.dn,A.dH,A.dI,A.dm,A.dJ,A.dK,A.dL,A.du,A.dv,A.dw,A.dx,A.dy,A.dz,A.dA,A.dB,A.dC,A.dD,A.es,A.e2,A.e3,A.e1,A.e4,A.e0,A.dZ,A.e_,A.e6,A.dW,A.dX,A.dY,A.e7,A.dU,A.e9,A.ea,A.e8,A.ej,A.ek,A.el,A.em,A.eb,A.ec,A.ed,A.ee,A.ef,A.dM,A.dN,A.dO,A.dP,A.dQ,A.eo,A.ep,A.en,A.dT,A.eq,A.eg,A.eh,A.eB,A.eE,A.eF,A.ez,A.eC])
q(A.cP,[A.cM,A.b2])
q(A.ck,[A.eM,A.fH,A.fg,A.eQ,A.eS,A.fl,A.eY,A.fy,A.et,A.e5,A.ei,A.eD,A.eA])
r(A.bl,A.d_)
q(A.cj,[A.f5,A.f6,A.ft,A.fs,A.f9,A.fb,A.fa,A.fe,A.fd,A.fc,A.f_,A.fn,A.fB,A.dS,A.dV,A.er])
r(A.d9,A.c9)
q(A.a2,[A.c1,A.co])
r(A.c_,A.c1)
r(A.cD,A.bG)
r(A.cC,A.cl)
q(A.cn,[A.eO,A.eN])
r(A.fj,A.fk)
q(A.aa,[A.ba,A.cv])
q(A.y,[A.h,A.bX])
q(A.h,[A.t,A.af,A.aC,A.bi])
q(A.t,[A.d,A.e])
q(A.d,[A.b0,A.cf,A.b1,A.aA,A.b3,A.cs,A.aF,A.aN,A.bU,A.cN,A.cO,A.bf,A.aO])
r(A.aB,A.cW)
q(A.P,[A.bj,A.X])
r(A.bA,A.aC)
r(A.ad,A.b)
r(A.a_,A.ad)
r(A.d8,A.d7)
r(A.bM,A.d8)
r(A.bR,A.db)
r(A.dg,A.df)
r(A.c0,A.dg)
r(A.cY,A.cV)
q(A.co,[A.cZ,A.ci])
r(A.bY,A.bS)
r(A.aP,A.bY)
r(A.de,A.c2)
r(A.bb,A.e)
s(A.bh,A.as)
s(A.cW,A.ex)
s(A.d7,A.P)
s(A.d8,A.ag)
s(A.db,A.x)
s(A.df,A.P)
s(A.dg,A.ag)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{F:"int",aV:"double",T:"num",a:"String",B:"bool",W:"Null",V:"List",o:"Object",r:"Map",l:"JSObject"},mangledNames:{},types:["~(a_)","B(r<a,@>)","~()","~(b)","~(r<a,@>)","~(t)","~(~())","W()","W(@)","~(o?,o?)","F(a?)","@(@)","B(ab)","B(a)","a(a)","B(t,a,a,aQ)","a(r<a,o>)","~(a,a)","B(ah<a>)","W(b)","~(cQ)","B(h)","@(@,a)","W(o,bc)","~(@,@)","W(~())","~(r<a,a>)","~(F,a)","~(a)","r<a,@>()","T(T,T)","r<a,o>(an<F,T>)","@(a)","~(r<a,o>)","~(a,@)","F(r<a,@>,r<a,@>)","~(h,h?)","~(a,t)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.jY(v.typeUniverse,JSON.parse('{"cG":"av","bg":"av","ak":"av","lb":"b","lr":"b","la":"e","ls":"e","lc":"d","lu":"d","lx":"h","lp":"h","lJ":"aC","lv":"a_","le":"ad","lq":"U","ld":"af","ly":"af","lt":"t","cx":{"B":[],"ap":[]},"bE":{"ap":[]},"U":{"l":[]},"av":{"l":[]},"K":{"V":["1"],"w":["1"],"l":[],"i":["1"]},"cw":{"bP":[]},"eL":{"K":["1"],"V":["1"],"w":["1"],"l":[],"i":["1"]},"az":{"Z":["1"]},"bF":{"aV":[],"T":[]},"bD":{"aV":[],"F":[],"T":[],"ap":[]},"cy":{"aV":[],"T":[],"ap":[]},"aG":{"a":[],"eW":[],"ap":[]},"bH":{"C":[]},"w":{"i":["1"]},"R":{"w":["1"],"i":["1"]},"bT":{"R":["1"],"w":["1"],"i":["1"],"i.E":"1","R.E":"1"},"aI":{"Z":["1"]},"aL":{"i":["2"],"i.E":"2"},"by":{"aL":["1","2"],"w":["2"],"i":["2"],"i.E":"2"},"bL":{"Z":["2"]},"a0":{"R":["2"],"w":["2"],"i":["2"],"i.E":"2","R.E":"2"},"H":{"i":["1"],"i.E":"1"},"bW":{"Z":["1"]},"d6":{"R":["F"],"w":["F"],"i":["F"],"i.E":"F","R.E":"F"},"aJ":{"x":["F","1"],"as":["F","1"],"r":["F","1"],"x.K":"F","x.V":"1","as.K":"F","as.V":"1"},"bO":{"aq":[],"C":[]},"cB":{"C":[]},"cS":{"C":[]},"c3":{"bc":[]},"at":{"aE":[]},"cj":{"aE":[]},"ck":{"aE":[]},"cP":{"aE":[]},"cM":{"aE":[]},"b2":{"aE":[]},"cL":{"C":[]},"al":{"x":["1","2"],"hx":["1","2"],"r":["1","2"],"x.K":"1","x.V":"2"},"aH":{"w":["1"],"i":["1"],"i.E":"1"},"bI":{"Z":["1"]},"am":{"w":["1"],"i":["1"],"i.E":"1"},"bJ":{"Z":["1"]},"cz":{"jp":[],"eW":[]},"d_":{"C":[]},"bl":{"aq":[],"C":[]},"c4":{"cQ":[]},"ai":{"C":[]},"a7":{"cu":["1"]},"c9":{"hQ":[]},"d9":{"c9":[],"hQ":[]},"c_":{"a2":["1"],"ah":["1"],"w":["1"],"i":["1"],"a2.E":"1"},"aR":{"Z":["1"]},"P":{"V":["1"],"w":["1"],"i":["1"]},"x":{"r":["1","2"]},"bh":{"x":["1","2"],"as":["1","2"],"r":["1","2"]},"a2":{"ah":["1"],"w":["1"],"i":["1"]},"c1":{"a2":["1"],"ah":["1"],"w":["1"],"i":["1"]},"d3":{"x":["a","@"],"r":["a","@"],"x.K":"a","x.V":"@"},"d4":{"R":["a"],"w":["a"],"i":["a"],"i.E":"a","R.E":"a"},"bG":{"C":[]},"cD":{"C":[]},"cC":{"cl":["o?","a"]},"aV":{"T":[]},"F":{"T":[]},"ah":{"w":["1"],"i":["1"]},"a":{"eW":[]},"cg":{"C":[]},"aq":{"C":[]},"aa":{"C":[]},"ba":{"C":[]},"cv":{"C":[]},"bV":{"C":[]},"cR":{"C":[]},"bd":{"C":[]},"cm":{"C":[]},"cF":{"C":[]},"bQ":{"C":[]},"dc":{"bc":[]},"be":{"js":[]},"t":{"h":[],"y":[],"l":[]},"b":{"l":[]},"a_":{"b":[],"l":[]},"h":{"y":[],"l":[]},"aQ":{"ab":[]},"d":{"t":[],"h":[],"y":[],"l":[]},"b0":{"d":[],"t":[],"h":[],"y":[],"l":[]},"cf":{"d":[],"t":[],"h":[],"y":[],"l":[]},"b1":{"d":[],"t":[],"h":[],"y":[],"l":[]},"aA":{"d":[],"t":[],"h":[],"y":[],"l":[]},"b3":{"d":[],"t":[],"h":[],"y":[],"l":[]},"af":{"h":[],"y":[],"l":[]},"aB":{"l":[]},"aC":{"h":[],"y":[],"l":[]},"cp":{"l":[]},"bw":{"l":[]},"cq":{"l":[]},"bj":{"P":["1"],"V":["1"],"w":["1"],"i":["1"],"P.E":"1"},"y":{"l":[]},"cs":{"d":[],"t":[],"h":[],"y":[],"l":[]},"bA":{"h":[],"y":[],"l":[]},"aF":{"hI":[],"hn":[],"d":[],"t":[],"h":[],"y":[],"l":[]},"b7":{"l":[]},"X":{"P":["h"],"V":["h"],"w":["h"],"i":["h"],"P.E":"h"},"bM":{"P":["h"],"ag":["h"],"V":["h"],"cA":["h"],"w":["h"],"l":[],"i":["h"],"P.E":"h","ag.E":"h"},"aN":{"d":[],"t":[],"h":[],"y":[],"l":[]},"bR":{"x":["a","a"],"l":[],"r":["a","a"],"x.K":"a","x.V":"a"},"bU":{"d":[],"t":[],"h":[],"y":[],"l":[]},"cN":{"d":[],"t":[],"h":[],"y":[],"l":[]},"cO":{"d":[],"t":[],"h":[],"y":[],"l":[]},"bf":{"d":[],"t":[],"h":[],"y":[],"l":[]},"aO":{"d":[],"t":[],"h":[],"y":[],"l":[]},"ad":{"b":[],"l":[]},"bX":{"f2":[],"y":[],"l":[]},"bi":{"h":[],"y":[],"l":[]},"c0":{"P":["h"],"ag":["h"],"V":["h"],"cA":["h"],"w":["h"],"l":[],"i":["h"],"P.E":"h","ag.E":"h"},"cV":{"x":["a","a"],"r":["a","a"]},"cY":{"x":["a","a"],"r":["a","a"],"x.K":"a","x.V":"a"},"cZ":{"a2":["a"],"ah":["a"],"w":["a"],"i":["a"],"a2.E":"a"},"bY":{"bS":["1"]},"aP":{"bY":["1"],"bS":["1"]},"bN":{"ab":[]},"c2":{"ab":[]},"de":{"ab":[]},"dd":{"ab":[]},"aD":{"Z":["1"]},"cX":{"f2":[],"y":[],"l":[]},"da":{"jx":[]},"c8":{"ji":[]},"co":{"a2":["a"],"ah":["a"],"w":["a"],"i":["a"]},"bb":{"e":[],"t":[],"h":[],"y":[],"l":[]},"ci":{"a2":["a"],"ah":["a"],"w":["a"],"i":["a"],"a2.E":"a"},"e":{"t":[],"h":[],"y":[],"l":[]}}'))
A.jX(v.typeUniverse,JSON.parse('{"w":1,"bh":2,"c1":1,"cn":2}'))
var u={d:"Bypassed to Resident Portal (Maria C. Santos)",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.fE
return{n:s("ai"),cR:s("b1"),b:s("aA"),dy:s("a6"),gw:s("w<@>"),h:s("t"),W:s("C"),A:s("b"),Y:s("aE"),eh:s("i<h>"),R:s("i<@>"),gE:s("K<r<a,a>>"),t:s("K<r<a,@>>"),k:s("K<ab>"),s:s("K<a>"),gn:s("K<@>"),T:s("bE"),m:s("l"),L:s("ak"),aU:s("cA<@>"),ey:s("aJ<a>"),fO:s("V<r<a,@>>"),j:s("V<@>"),bj:s("V<T>"),a_:s("b7"),ek:s("an<F,T>"),by:s("r<a,t>"),U:s("r<a,o>"),ck:s("r<a,a>"),P:s("r<a,@>"),G:s("r<@,@>"),e:s("a0<a,a>"),V:s("a_"),a0:s("h"),B:s("ab"),a:s("W"),K:s("o"),gT:s("lw"),ew:s("bb"),c:s("ah<a>"),l:s("bc"),N:s("a"),d:s("a(a)"),g7:s("e"),aW:s("bf"),D:s("cQ"),dm:s("ap"),eK:s("aq"),ak:s("bg"),ci:s("f2"),h9:s("bi"),ac:s("X"),E:s("aP<b>"),C:s("aP<a_>"),r:s("bj<t>"),_:s("a7<@>"),fJ:s("a7<F>"),J:s("aQ"),y:s("B"),al:s("B(o)"),i:s("aV"),z:s("@"),he:s("@()"),v:s("@(o)"),Q:s("@(o,bc)"),bU:s("@(ah<a>)"),S:s("F"),o:s("b3?"),I:s("hn?"),b4:s("t?"),ch:s("y?"),eH:s("cu<W>?"),u:s("d?"),f:s("aF?"),an:s("l?"),bM:s("V<@>?"),X:s("o?"),O:s("hI?"),Z:s("aN?"),dk:s("a?"),p:s("aO?"),F:s("bZ<@,@>?"),g:s("d5?"),fQ:s("B?"),cD:s("aV?"),w:s("@(b)?"),h6:s("F?"),cg:s("T?"),g5:s("~()?"),h2:s("~(a_)?"),H:s("T"),q:s("~"),M:s("~()"),x:s("~(a,a)"),cA:s("~(a,@)"),cB:s("~(cQ)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.x=A.b0.prototype
B.p=A.aA.prototype
B.l=A.aB.prototype
B.G=A.bw.prototype
B.t=A.bA.prototype
B.f=A.aF.prototype
B.I=J.bC.prototype
B.a=J.K.prototype
B.c=J.bD.prototype
B.b=J.bF.prototype
B.d=J.aG.prototype
B.J=J.ak.prototype
B.K=J.U.prototype
B.v=J.cG.prototype
B.j=A.aN.prototype
B.i=A.bR.prototype
B.w=A.bU.prototype
B.n=A.aO.prototype
B.o=J.bg.prototype
B.q=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.y=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof HTMLElement == "function";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.D=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var userAgent = navigator.userAgent;
    if (typeof userAgent != "string") return hooks;
    if (userAgent.indexOf("DumpRenderTree") >= 0) return hooks;
    if (userAgent.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.z=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.C=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.B=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.A=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.r=function(hooks) { return hooks; }

B.e=new A.cC()
B.E=new A.cF()
B.R=new A.eX()
B.k=new A.fh()
B.h=new A.d9()
B.F=new A.dc()
B.H=new A.bx(0)
B.L=new A.eN(null)
B.M=new A.eO(null)
B.N=s([],t.s)
B.u=s(["bind","if","ref","repeat","syntax"],t.s)
B.m=s(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"],t.s)
B.O=s(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"],t.s)
B.P=s(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"],t.s)
B.Q=A.l9("o")})();(function staticFields(){$.fi=null
$.a3=A.u([],A.fE("K<o>"))
$.hD=null
$.hl=null
$.hk=null
$.im=null
$.ih=null
$.ir=null
$.fD=null
$.fJ=null
$.ha=null
$.bm=null
$.cc=null
$.cd=null
$.h5=!1
$.L=B.h
$.au=null
$.fQ=null
$.hs=null
$.hr=null
$.d2=A.cE(t.N,t.Y)
$.l5=function(){var s=t.N,r=t.z
return A.u([A.D(["worker_id","EMP-301","name","Jose Rizal","role","Lead Field Tech","zone","Purok 1"],s,r),A.D(["worker_id","EMP-304","name","Juan Luna","role","Field Technician","zone","Purok 2"],s,r),A.D(["worker_id","EMP-308","name","Andres Bonifacio","role","Zone Inspector","zone","Purok 5"],s,r)],t.t)}()
$.l3=function(){var s="current_leak_status",r="current_m3_usage",q="leak_detected_at",p=A.fE("K<aV>"),o=t.N,n=t.z
return A.u([A.D(["house_id","HH-101","owner_name","Maria C. Santos","purok","Purok 1","account_number","TAG-2026-0041",s,"leak",r,18.4,"flow_rate",0.85,"monthly_history",A.u([12.4,14.1,15.8,18.4],p),q,"2026-06-24T18:30:00Z"],o,n),A.D(["house_id","HH-102","owner_name","Ramon P. Del Rosario","purok","Purok 1","account_number","TAG-2026-0105",s,"normal",r,12.1,"flow_rate",0.05,"monthly_history",A.u([11.8,12,11.5,12.1],p),q,null],o,n),A.D(["house_id","HH-103","owner_name","Elena F. Garcia","purok","Purok 2","account_number","TAG-2026-0312",s,"leak",r,24.8,"flow_rate",0.98,"monthly_history",A.u([15.2,16,19.5,24.8],p),q,"2026-06-25T02:15:00Z"],o,n),A.D(["house_id","HH-104","owner_name","Delfin S. Alcantara","purok","Purok 2","account_number","TAG-2026-0421",s,"normal",r,9.3,"flow_rate",0.02,"monthly_history",A.u([8.5,9,9.1,9.3],p),q,null],o,n),A.D(["house_id","HH-105","owner_name","Clara M. Aquino","purok","Purok 3","account_number","TAG-2026-0810",s,"normal",r,15.6,"flow_rate",0.08,"monthly_history",A.u([14,15.2,14.9,15.6],p),q,null],o,n),A.D(["house_id","HH-106","owner_name","Manuel L. Roxas","purok","Purok 3","account_number","TAG-2026-0925",s,"normal",r,21,"flow_rate",0.11,"monthly_history",A.u([19.2,20.1,20.8,21],p),q,null],o,n),A.D(["house_id","HH-107","owner_name","Felipe A. Agoncillo","purok","Purok 4","account_number","TAG-2026-1102",s,"leak",r,32.5,"flow_rate",1.45,"monthly_history",A.u([18.4,21,25.1,32.5],p),q,"2026-06-25T08:45:00Z"],o,n),A.D(["house_id","HH-108","owner_name","Gregoria de Jesus","purok","Purok 4","account_number","TAG-2026-1349",s,"normal",r,14.2,"flow_rate",0.04,"monthly_history",A.u([13.1,13.9,14,14.2],p),q,null],o,n),A.D(["house_id","HH-109","owner_name","Antonio N. Luna","purok","Purok 5","account_number","TAG-2026-1509",s,"normal",r,11,"flow_rate",0.06,"monthly_history",A.u([10.5,10.9,11.2,11],p),q,null],o,n),A.D(["house_id","HH-110","owner_name","Leonor Rivera","purok","Purok 6","account_number","TAG-2026-1772",s,"normal",r,13.7,"flow_rate",0.05,"monthly_history",A.u([12.8,13.2,13.4,13.7],p),q,null],o,n)],t.t)}()
$.l2=A.D(["main_tank_level",68,"ph_level",5.8,"ph_status","warning","ph_desc","Acidic pH detected. Add neutralizing agent.","turbidity",6.2,"turbidity_status","warning","turbidity_desc","Slightly high turbidity. Filter check recommended.","last_updated","2026-06-25T11:00:00Z"],t.N,t.z)
$.l4=function(){var s=t.N,r=t.z
return A.u([A.D(["task_id","LOG-1001","house_id","HH-102","worker_id","EMP-304","purok","Purok 1","description","Replaced main brass pipe fitting. Leak resolved.","date","2026-06-23T09:30:00Z","status_resolved",!0],s,r),A.D(["task_id","LOG-1002","house_id","HH-104","worker_id","EMP-304","purok","Purok 2","description","Inspected meter calibration. Flow rate verified normal.","date","2026-06-24T14:20:00Z","status_resolved",!0],s,r)],t.t)}()})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"li","iw",()=>A.il("_$dart_dartClosure"))
s($,"lh","iv",()=>A.il("_$dart_dartClosure_dartJSInterop"))
s($,"lN","iO",()=>A.u([new J.cw()],A.fE("K<bP>")))
s($,"lz","iC",()=>A.ar(A.f1({
toString:function(){return"$receiver$"}})))
s($,"lA","iD",()=>A.ar(A.f1({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"lB","iE",()=>A.ar(A.f1(null)))
s($,"lC","iF",()=>A.ar(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"lF","iI",()=>A.ar(A.f1(void 0)))
s($,"lG","iJ",()=>A.ar(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"lE","iH",()=>A.ar(A.hO(null)))
s($,"lD","iG",()=>A.ar(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"lI","iL",()=>A.ar(A.hO(void 0)))
s($,"lH","iK",()=>A.ar(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"lK","hf",()=>A.jy())
s($,"lj","ix",()=>A.hJ("^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(?:[.,](\\d+))?)?)?( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$"))
s($,"lM","iN",()=>A.ip(B.Q))
s($,"lg","iu",()=>({}))
s($,"lL","iM",()=>A.hA(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],t.N))
s($,"lf","it",()=>A.hJ("^\\S+$"))
s($,"ln","he",()=>B.d.ap(A.fP(),"Opera",0))
s($,"lm","iA",()=>!$.he()&&B.d.ap(A.fP(),"Trident/",0))
s($,"ll","iz",()=>B.d.ap(A.fP(),"Firefox",0))
s($,"lk","iy",()=>"-"+$.iB()+"-")
s($,"lo","iB",()=>{if($.iz())var r="moz"
else if($.iA())r="ms"
else r=$.he()?"o":"webkit"
return r})
s($,"lQ","iP",()=>{var r="previous_reading",q=t.N,p=t.z
return A.u([A.D(["bill_id","BILL-5001","house_id","HH-101","account_number","TAG-2026-0041","billing_month","June 2026",r,15.8,"current_reading",18.4,"consumption",2.6,"water_charge",120,"maintenance_fee",50,"total_due",170,"billed_by","EMP-304","date","2026-06-24T18:45:00Z","status","Pending"],q,p),A.D(["bill_id","BILL-5002","house_id","HH-101","account_number","TAG-2026-0041","billing_month","May 2026",r,14.1,"current_reading",15.8,"consumption",1.7,"water_charge",120,"maintenance_fee",50,"total_due",170,"billed_by","EMP-304","date","2026-05-24T10:15:00Z","status","Paid"],q,p),A.D(["bill_id","BILL-5003","house_id","HH-102","account_number","TAG-2026-0105","billing_month","May 2026",r,11.5,"current_reading",12.1,"consumption",0.6,"water_charge",120,"maintenance_fee",50,"total_due",170,"billed_by","EMP-304","date","2026-05-24T10:30:00Z","status","Paid"],q,p)],t.t)})
s($,"lO","J",()=>new A.ey())})();(function nativeSupport(){!function(){var s=function(a){var m={}
m[a]=1
return Object.keys(hunkHelpers.convertToFastObject(m))[0]}
v.getIsolateTag=function(a){return s("___dart_"+a+v.isolateTag)}
var r="___dart_isolate_tags_"
var q=Object[r]||(Object[r]=Object.create(null))
var p="_ZxYxX"
for(var o=0;;o++){var n=s(p+"_"+o+"_")
if(!(n in q)){q[n]=1
v.isolateTag=n
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({DOMError:J.U,MediaError:J.U,Navigator:J.U,NavigatorConcurrentHardware:J.U,NavigatorUserMediaError:J.U,OverconstrainedError:J.U,PositionError:J.U,GeolocationPositionError:J.U,Range:J.U,HTMLAudioElement:A.d,HTMLBRElement:A.d,HTMLCanvasElement:A.d,HTMLContentElement:A.d,HTMLDListElement:A.d,HTMLDataElement:A.d,HTMLDataListElement:A.d,HTMLDetailsElement:A.d,HTMLDialogElement:A.d,HTMLDivElement:A.d,HTMLEmbedElement:A.d,HTMLFieldSetElement:A.d,HTMLHRElement:A.d,HTMLHeadElement:A.d,HTMLHeadingElement:A.d,HTMLHtmlElement:A.d,HTMLIFrameElement:A.d,HTMLImageElement:A.d,HTMLLIElement:A.d,HTMLLabelElement:A.d,HTMLLegendElement:A.d,HTMLLinkElement:A.d,HTMLMapElement:A.d,HTMLMediaElement:A.d,HTMLMenuElement:A.d,HTMLMetaElement:A.d,HTMLMeterElement:A.d,HTMLModElement:A.d,HTMLOListElement:A.d,HTMLObjectElement:A.d,HTMLOptGroupElement:A.d,HTMLOptionElement:A.d,HTMLOutputElement:A.d,HTMLParagraphElement:A.d,HTMLParamElement:A.d,HTMLPictureElement:A.d,HTMLPreElement:A.d,HTMLProgressElement:A.d,HTMLQuoteElement:A.d,HTMLScriptElement:A.d,HTMLShadowElement:A.d,HTMLSlotElement:A.d,HTMLSourceElement:A.d,HTMLSpanElement:A.d,HTMLStyleElement:A.d,HTMLTableCaptionElement:A.d,HTMLTableCellElement:A.d,HTMLTableDataCellElement:A.d,HTMLTableHeaderCellElement:A.d,HTMLTableColElement:A.d,HTMLTimeElement:A.d,HTMLTitleElement:A.d,HTMLTrackElement:A.d,HTMLUListElement:A.d,HTMLUnknownElement:A.d,HTMLVideoElement:A.d,HTMLDirectoryElement:A.d,HTMLFontElement:A.d,HTMLFrameElement:A.d,HTMLFrameSetElement:A.d,HTMLMarqueeElement:A.d,HTMLElement:A.d,HTMLAnchorElement:A.b0,HTMLAreaElement:A.cf,HTMLBaseElement:A.b1,HTMLBodyElement:A.aA,HTMLButtonElement:A.b3,CDATASection:A.af,CharacterData:A.af,Comment:A.af,ProcessingInstruction:A.af,Text:A.af,CSSStyleDeclaration:A.aB,MSStyleCSSProperties:A.aB,CSS2Properties:A.aB,XMLDocument:A.aC,Document:A.aC,DOMException:A.cp,DOMImplementation:A.bw,DOMTokenList:A.cq,MathMLElement:A.t,Element:A.t,AbortPaymentEvent:A.b,AnimationEvent:A.b,AnimationPlaybackEvent:A.b,ApplicationCacheErrorEvent:A.b,BackgroundFetchClickEvent:A.b,BackgroundFetchEvent:A.b,BackgroundFetchFailEvent:A.b,BackgroundFetchedEvent:A.b,BeforeInstallPromptEvent:A.b,BeforeUnloadEvent:A.b,BlobEvent:A.b,CanMakePaymentEvent:A.b,ClipboardEvent:A.b,CloseEvent:A.b,CustomEvent:A.b,DeviceMotionEvent:A.b,DeviceOrientationEvent:A.b,ErrorEvent:A.b,ExtendableEvent:A.b,ExtendableMessageEvent:A.b,FetchEvent:A.b,FontFaceSetLoadEvent:A.b,ForeignFetchEvent:A.b,GamepadEvent:A.b,HashChangeEvent:A.b,InstallEvent:A.b,MediaEncryptedEvent:A.b,MediaKeyMessageEvent:A.b,MediaQueryListEvent:A.b,MediaStreamEvent:A.b,MediaStreamTrackEvent:A.b,MessageEvent:A.b,MIDIConnectionEvent:A.b,MIDIMessageEvent:A.b,MutationEvent:A.b,NotificationEvent:A.b,PageTransitionEvent:A.b,PaymentRequestEvent:A.b,PaymentRequestUpdateEvent:A.b,PopStateEvent:A.b,PresentationConnectionAvailableEvent:A.b,PresentationConnectionCloseEvent:A.b,ProgressEvent:A.b,PromiseRejectionEvent:A.b,PushEvent:A.b,RTCDataChannelEvent:A.b,RTCDTMFToneChangeEvent:A.b,RTCPeerConnectionIceEvent:A.b,RTCTrackEvent:A.b,SecurityPolicyViolationEvent:A.b,SensorErrorEvent:A.b,SpeechRecognitionError:A.b,SpeechRecognitionEvent:A.b,SpeechSynthesisEvent:A.b,StorageEvent:A.b,SyncEvent:A.b,TrackEvent:A.b,TransitionEvent:A.b,WebKitTransitionEvent:A.b,VRDeviceEvent:A.b,VRDisplayEvent:A.b,VRSessionEvent:A.b,MojoInterfaceRequestEvent:A.b,ResourceProgressEvent:A.b,USBConnectionEvent:A.b,IDBVersionChangeEvent:A.b,AudioProcessingEvent:A.b,OfflineAudioCompletionEvent:A.b,WebGLContextEvent:A.b,Event:A.b,InputEvent:A.b,SubmitEvent:A.b,EventTarget:A.y,HTMLFormElement:A.cs,HTMLDocument:A.bA,HTMLInputElement:A.aF,Location:A.b7,MouseEvent:A.a_,DragEvent:A.a_,PointerEvent:A.a_,WheelEvent:A.a_,DocumentFragment:A.h,ShadowRoot:A.h,DocumentType:A.h,Node:A.h,NodeList:A.bM,RadioNodeList:A.bM,HTMLSelectElement:A.aN,Storage:A.bR,HTMLTableElement:A.bU,HTMLTableRowElement:A.cN,HTMLTableSectionElement:A.cO,HTMLTemplateElement:A.bf,HTMLTextAreaElement:A.aO,CompositionEvent:A.ad,FocusEvent:A.ad,KeyboardEvent:A.ad,TextEvent:A.ad,TouchEvent:A.ad,UIEvent:A.ad,Window:A.bX,DOMWindow:A.bX,Attr:A.bi,NamedNodeMap:A.c0,MozNamedAttrMap:A.c0,SVGScriptElement:A.bb,SVGAElement:A.e,SVGAnimateElement:A.e,SVGAnimateMotionElement:A.e,SVGAnimateTransformElement:A.e,SVGAnimationElement:A.e,SVGCircleElement:A.e,SVGClipPathElement:A.e,SVGDefsElement:A.e,SVGDescElement:A.e,SVGDiscardElement:A.e,SVGEllipseElement:A.e,SVGFEBlendElement:A.e,SVGFEColorMatrixElement:A.e,SVGFEComponentTransferElement:A.e,SVGFECompositeElement:A.e,SVGFEConvolveMatrixElement:A.e,SVGFEDiffuseLightingElement:A.e,SVGFEDisplacementMapElement:A.e,SVGFEDistantLightElement:A.e,SVGFEFloodElement:A.e,SVGFEFuncAElement:A.e,SVGFEFuncBElement:A.e,SVGFEFuncGElement:A.e,SVGFEFuncRElement:A.e,SVGFEGaussianBlurElement:A.e,SVGFEImageElement:A.e,SVGFEMergeElement:A.e,SVGFEMergeNodeElement:A.e,SVGFEMorphologyElement:A.e,SVGFEOffsetElement:A.e,SVGFEPointLightElement:A.e,SVGFESpecularLightingElement:A.e,SVGFESpotLightElement:A.e,SVGFETileElement:A.e,SVGFETurbulenceElement:A.e,SVGFilterElement:A.e,SVGForeignObjectElement:A.e,SVGGElement:A.e,SVGGeometryElement:A.e,SVGGraphicsElement:A.e,SVGImageElement:A.e,SVGLineElement:A.e,SVGLinearGradientElement:A.e,SVGMarkerElement:A.e,SVGMaskElement:A.e,SVGMetadataElement:A.e,SVGPathElement:A.e,SVGPatternElement:A.e,SVGPolygonElement:A.e,SVGPolylineElement:A.e,SVGRadialGradientElement:A.e,SVGRectElement:A.e,SVGSetElement:A.e,SVGStopElement:A.e,SVGStyleElement:A.e,SVGSVGElement:A.e,SVGSwitchElement:A.e,SVGSymbolElement:A.e,SVGTSpanElement:A.e,SVGTextContentElement:A.e,SVGTextElement:A.e,SVGTextPathElement:A.e,SVGTextPositioningElement:A.e,SVGTitleElement:A.e,SVGUseElement:A.e,SVGViewElement:A.e,SVGGradientElement:A.e,SVGComponentTransferFunctionElement:A.e,SVGFEDropShadowElement:A.e,SVGMPathElement:A.e,SVGElement:A.e})
hunkHelpers.setOrUpdateLeafTags({DOMError:true,MediaError:true,Navigator:true,NavigatorConcurrentHardware:true,NavigatorUserMediaError:true,OverconstrainedError:true,PositionError:true,GeolocationPositionError:true,Range:true,HTMLAudioElement:true,HTMLBRElement:true,HTMLCanvasElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLDivElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHeadingElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLImageElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOptionElement:true,HTMLOutputElement:true,HTMLParagraphElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLSpanElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,HTMLAnchorElement:true,HTMLAreaElement:true,HTMLBaseElement:true,HTMLBodyElement:true,HTMLButtonElement:true,CDATASection:true,CharacterData:true,Comment:true,ProcessingInstruction:true,Text:true,CSSStyleDeclaration:true,MSStyleCSSProperties:true,CSS2Properties:true,XMLDocument:true,Document:false,DOMException:true,DOMImplementation:true,DOMTokenList:true,MathMLElement:true,Element:false,AbortPaymentEvent:true,AnimationEvent:true,AnimationPlaybackEvent:true,ApplicationCacheErrorEvent:true,BackgroundFetchClickEvent:true,BackgroundFetchEvent:true,BackgroundFetchFailEvent:true,BackgroundFetchedEvent:true,BeforeInstallPromptEvent:true,BeforeUnloadEvent:true,BlobEvent:true,CanMakePaymentEvent:true,ClipboardEvent:true,CloseEvent:true,CustomEvent:true,DeviceMotionEvent:true,DeviceOrientationEvent:true,ErrorEvent:true,ExtendableEvent:true,ExtendableMessageEvent:true,FetchEvent:true,FontFaceSetLoadEvent:true,ForeignFetchEvent:true,GamepadEvent:true,HashChangeEvent:true,InstallEvent:true,MediaEncryptedEvent:true,MediaKeyMessageEvent:true,MediaQueryListEvent:true,MediaStreamEvent:true,MediaStreamTrackEvent:true,MessageEvent:true,MIDIConnectionEvent:true,MIDIMessageEvent:true,MutationEvent:true,NotificationEvent:true,PageTransitionEvent:true,PaymentRequestEvent:true,PaymentRequestUpdateEvent:true,PopStateEvent:true,PresentationConnectionAvailableEvent:true,PresentationConnectionCloseEvent:true,ProgressEvent:true,PromiseRejectionEvent:true,PushEvent:true,RTCDataChannelEvent:true,RTCDTMFToneChangeEvent:true,RTCPeerConnectionIceEvent:true,RTCTrackEvent:true,SecurityPolicyViolationEvent:true,SensorErrorEvent:true,SpeechRecognitionError:true,SpeechRecognitionEvent:true,SpeechSynthesisEvent:true,StorageEvent:true,SyncEvent:true,TrackEvent:true,TransitionEvent:true,WebKitTransitionEvent:true,VRDeviceEvent:true,VRDisplayEvent:true,VRSessionEvent:true,MojoInterfaceRequestEvent:true,ResourceProgressEvent:true,USBConnectionEvent:true,IDBVersionChangeEvent:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,WebGLContextEvent:true,Event:false,InputEvent:false,SubmitEvent:false,EventTarget:false,HTMLFormElement:true,HTMLDocument:true,HTMLInputElement:true,Location:true,MouseEvent:true,DragEvent:true,PointerEvent:true,WheelEvent:true,DocumentFragment:true,ShadowRoot:true,DocumentType:true,Node:false,NodeList:true,RadioNodeList:true,HTMLSelectElement:true,Storage:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,CompositionEvent:true,FocusEvent:true,KeyboardEvent:true,TextEvent:true,TouchEvent:true,UIEvent:false,Window:true,DOMWindow:true,Attr:true,NamedNodeMap:true,MozNamedAttrMap:true,SVGScriptElement:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true,SVGElement:false})})()
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$0=function(){return this()}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$1$1=function(a){return this(a)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.l_
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=app.js.map

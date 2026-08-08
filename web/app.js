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
if(a[b]!==s){A.n9(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a){a.immutable$list=Array
a.fixed$length=Array
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.ix(b)
return new s(c,this)}:function(){if(s===null)s=A.ix(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.ix(a).prototype
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
iA(a,b,c,d){return{i:a,p:b,e:c,x:d}},
hU(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.iy==null){A.mV()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.b(A.jk("Return interceptor for "+A.d(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.hp
if(o==null)o=$.hp=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.n_(a)
if(p!=null)return p
if(typeof a=="function")return B.S
s=Object.getPrototypeOf(a)
if(s==null)return B.C
if(s===Object.prototype)return B.C
if(typeof q=="function"){o=$.hp
if(o==null)o=$.hp=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.t,enumerable:false,writable:true,configurable:true})
return B.t}return B.t},
iZ(a,b){if(a<0||a>4294967295)throw A.b(A.aj(a,0,4294967295,"length",null))
return J.kX(new Array(a),b)},
j_(a,b){if(a<0)throw A.b(A.aP("Length must be a non-negative integer: "+a,null))
return A.n(new Array(a),b.h("N<0>"))},
kX(a,b){return J.j0(A.n(a,b.h("N<0>")),b)},
j0(a,b){a.fixed$length=Array
return a},
j1(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
kY(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.j1(r))break;++b}return b},
kZ(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.c(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.j1(q))break}return b},
be(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.c0.prototype
return J.d2.prototype}if(typeof a=="string")return J.aX.prototype
if(a==null)return J.c1.prototype
if(typeof a=="boolean")return J.d1.prototype
if(Array.isArray(a))return J.N.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aw.prototype
if(typeof a=="symbol")return J.bo.prototype
if(typeof a=="bigint")return J.bn.prototype
return a}if(a instanceof A.v)return a
return J.hU(a)},
t(a){if(typeof a=="string")return J.aX.prototype
if(a==null)return a
if(Array.isArray(a))return J.N.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aw.prototype
if(typeof a=="symbol")return J.bo.prototype
if(typeof a=="bigint")return J.bn.prototype
return a}if(a instanceof A.v)return a
return J.hU(a)},
bf(a){if(a==null)return a
if(Array.isArray(a))return J.N.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aw.prototype
if(typeof a=="symbol")return J.bo.prototype
if(typeof a=="bigint")return J.bn.prototype
return a}if(a instanceof A.v)return a
return J.hU(a)},
k2(a){if(typeof a=="string")return J.aX.prototype
if(a==null)return a
if(!(a instanceof A.v))return J.by.prototype
return a},
F(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aw.prototype
if(typeof a=="symbol")return J.bo.prototype
if(typeof a=="bigint")return J.bn.prototype
return a}if(a instanceof A.v)return a
return J.hU(a)},
q(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.be(a).a0(a,b)},
k(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.mZ(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.t(a).i(a,b)},
at(a,b,c){return J.bf(a).m(a,b,c)},
kA(a){return J.F(a).cO(a)},
kB(a,b,c){return J.F(a).cZ(a,b,c)},
kC(a,b,c,d){return J.F(a).bV(a,b,c,d)},
iF(a,b){return J.t(a).B(a,b)},
i3(a,b){return J.F(a).N(a,b)},
iG(a,b){return J.bf(a).L(a,b)},
e0(a,b){return J.bf(a).c0(a,b)},
e1(a,b){return J.bf(a).q(a,b)},
kD(a){return J.F(a).gd9(a)},
ac(a){return J.F(a).gad(a)},
e2(a){return J.be(a).gG(a)},
e3(a){return J.t(a).gH(a)},
i4(a){return J.t(a).gO(a)},
bg(a){return J.bf(a).gI(a)},
U(a){return J.t(a).gk(a)},
au(a){return J.F(a).ga7(a)},
kE(a){return J.be(a).ga_(a)},
iH(a,b,c){return J.bf(a).ar(a,b,c)},
iI(a){return J.bf(a).dH(a)},
kF(a,b){return J.bf(a).v(a,b)},
kG(a,b){return J.F(a).scU(a,b)},
aG(a,b){return J.F(a).sC(a,b)},
o(a,b){return J.F(a).sW(a,b)},
kH(a){return J.k2(a).dP(a)},
L(a){return J.be(a).j(a)},
iJ(a){return J.k2(a).K(a)},
c_:function c_(){},
d1:function d1(){},
c1:function c1(){},
a6:function a6(){},
aY:function aY(){},
da:function da(){},
by:function by(){},
aw:function aw(){},
bn:function bn(){},
bo:function bo(){},
N:function N(a){this.$ti=a},
fF:function fF(a){this.$ti=a},
aQ:function aQ(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
c2:function c2(){},
c0:function c0(){},
d2:function d2(){},
aX:function aX(){}},A={ic:function ic(){},
hV(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
bK(a,b,c){return a},
iz(a){var s,r
for(s=$.ab.length,r=0;r<s;++r)if(a===$.ab[r])return!0
return!1},
le(a,b,c,d){A.fU(b,"start")
if(c!=null){A.fU(c,"end")
if(b>c)A.as(A.aj(b,0,c,"start",null))}return new A.ck(a,b,c,d.h("ck<0>"))},
j6(a,b,c,d){if(t.gw.b(a))return new A.bT(a,b,c.h("@<0>").A(d).h("bT<1,2>"))
return new A.b1(a,b,c.h("@<0>").A(d).h("b1<1,2>"))},
d0(){return new A.bv("No element")},
kV(){return new A.bv("Too many elements")},
bp:function bp(a){this.a=a},
cT:function cT(a){this.a=a},
r:function r(){},
T:function T(){},
ck:function ck(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
aZ:function aZ(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
b1:function b1(a,b,c){this.a=a
this.b=b
this.$ti=c},
bT:function bT(a,b,c){this.a=a
this.b=b
this.$ti=c},
c9:function c9(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
a_:function a_(a,b,c){this.a=a
this.b=b
this.$ti=c},
M:function M(a,b,c){this.a=a
this.b=b
this.$ti=c},
cm:function cm(a,b,c){this.a=a
this.b=b
this.$ti=c},
bm:function bm(){},
b7:function b7(){},
bz:function bz(){},
dF:function dF(a){this.a=a},
b_:function b_(a,b){this.a=a
this.$ti=b},
kP(){throw A.b(A.X("Cannot modify unmodifiable Map"))},
k9(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
mZ(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
d(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.L(a)
return s},
db(a){var s,r=$.j7
if(r==null)r=$.j7=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
ig(a,b){var s,r,q,p,o,n=null,m=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(m==null)return n
if(3>=m.length)return A.c(m,3)
s=m[3]
if(b==null){if(s!=null)return parseInt(a,10)
if(m[2]!=null)return parseInt(a,16)
return n}if(b<2||b>36)throw A.b(A.aj(b,2,36,"radix",n))
if(b===10&&s!=null)return parseInt(a,10)
if(b<10||s==null){r=b<=10?47+b:86+b
q=m[1]
for(p=q.length,o=0;o<p;++o)if((q.charCodeAt(o)|32)>r)return n}return parseInt(a,b)},
b3(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.a.K(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
fT(a){return A.l3(a)},
l3(a){var s,r,q,p
if(a instanceof A.v)return A.Y(A.a4(a),null)
s=J.be(a)
if(s===B.R||s===B.T||t.ak.b(a)){r=B.v(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.Y(A.a4(a),null)},
l5(a){if(typeof a=="number"||A.it(a))return J.L(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.aH)return a.j(0)
return"Instance of '"+A.fT(a)+"'"},
l6(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
I(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.e.ao(s,10)|55296)>>>0,s&1023|56320)}}throw A.b(A.aj(a,0,1114111,null,null))},
l7(a,b,c,d,e,f,g,h){var s,r=b-1
if(0<=a&&a<100){a+=400
r-=4800}s=h?Date.UTC(a,r,c,d,e,f,g):new Date(a,r,c,d,e,f,g).valueOf()
if(isNaN(s)||s<-864e13||s>864e13)return null
return s},
a7(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
b2(a){return a.b?A.a7(a).getUTCFullYear()+0:A.a7(a).getFullYear()+0},
cg(a){return a.b?A.a7(a).getUTCMonth()+1:A.a7(a).getMonth()+1},
cf(a){return a.b?A.a7(a).getUTCDate()+0:A.a7(a).getDate()+0},
aJ(a){return a.b?A.a7(a).getUTCHours()+0:A.a7(a).getHours()+0},
bs(a){return a.b?A.a7(a).getUTCMinutes()+0:A.a7(a).getMinutes()+0},
j9(a){return a.b?A.a7(a).getUTCSeconds()+0:A.a7(a).getSeconds()+0},
j8(a){return a.b?A.a7(a).getUTCMilliseconds()+0:A.a7(a).getMilliseconds()+0},
l4(a){var s=a.$thrownJsError
if(s==null)return null
return A.aM(s)},
mT(a){throw A.b(A.iw(a))},
c(a,b){if(a==null)J.U(a)
throw A.b(A.hR(a,b))},
hR(a,b){var s,r="index"
if(!A.iv(b))return new A.am(!0,b,r,null)
s=A.bc(J.U(a))
if(b<0||b>=s)return A.bZ(b,s,a,null,r)
return A.ja(b,r)},
iw(a){return new A.am(!0,a,null,null)},
b(a){return A.k4(new Error(),a)},
k4(a,b){var s
if(b==null)b=new A.aB()
a.dartException=b
s=A.na
if("defineProperty" in Object){Object.defineProperty(a,"message",{get:s})
a.name=""}else a.toString=s
return a},
na(){return J.L(this.dartException)},
as(a){throw A.b(a)},
iB(a,b){throw A.k4(b,a)},
i2(a){throw A.b(A.V(a))},
aC(a){var s,r,q,p,o,n
a=A.n3(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.n([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.fY(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
fZ(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
jj(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
id(a,b){var s=b==null,r=s?null:b.method
return new A.d4(a,r,s?null:b.receiver)},
a5(a){var s
if(a==null)return new A.fR(a)
if(a instanceof A.bW){s=a.a
return A.aO(a,s==null?t.K.a(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.aO(a,a.dartException)
return A.mE(a)},
aO(a,b){if(t.W.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
mE(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.e.ao(r,16)&8191)===10)switch(q){case 438:return A.aO(a,A.id(A.d(s)+" (Error "+q+")",null))
case 445:case 5007:A.d(s)
return A.aO(a,new A.ce())}}if(a instanceof TypeError){p=$.ki()
o=$.kj()
n=$.kk()
m=$.kl()
l=$.ko()
k=$.kp()
j=$.kn()
$.km()
i=$.kr()
h=$.kq()
g=p.V(s)
if(g!=null)return A.aO(a,A.id(A.l(s),g))
else{g=o.V(s)
if(g!=null){g.method="call"
return A.aO(a,A.id(A.l(s),g))}else if(n.V(s)!=null||m.V(s)!=null||l.V(s)!=null||k.V(s)!=null||j.V(s)!=null||m.V(s)!=null||i.V(s)!=null||h.V(s)!=null){A.l(s)
return A.aO(a,new A.ce())}}return A.aO(a,new A.dk(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.ch()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.aO(a,new A.am(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.ch()
return a},
aM(a){var s
if(a instanceof A.bW)return a.b
if(a==null)return new A.cy(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.cy(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
n2(a){if(a==null)return J.e2(a)
if(typeof a=="object")return A.db(a)
return J.e2(a)},
mN(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.m(0,a[s],a[r])}return b},
mi(a,b,c,d,e,f){t.Y.a(a)
switch(A.bc(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.b(A.iW("Unsupported number of arguments for wrapped closure"))},
bL(a,b){var s
if(a==null)return null
s=a.$identity
if(!!s)return s
s=A.mK(a,b)
a.$identity=s
return s},
mK(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.mi)},
kO(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.df().constructor.prototype):Object.create(new A.bj(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.iR(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.kK(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.iR(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
kK(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.kI)}throw A.b("Error in functionType of tearoff")},
kL(a,b,c,d){var s=A.iP
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
iR(a,b,c,d){if(c)return A.kN(a,b,d)
return A.kL(b.length,d,a,b)},
kM(a,b,c,d){var s=A.iP,r=A.kJ
switch(b?-1:a){case 0:throw A.b(new A.dd("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
kN(a,b,c){var s,r
if($.iN==null)$.iN=A.iM("interceptor")
if($.iO==null)$.iO=A.iM("receiver")
s=b.length
r=A.kM(s,c,a,b)
return r},
ix(a){return A.kO(a)},
kI(a,b){return A.hC(v.typeUniverse,A.a4(a.a),b)},
iP(a){return a.a},
kJ(a){return a.b},
iM(a){var s,r,q,p=new A.bj("receiver","interceptor"),o=J.j0(Object.getOwnPropertyNames(p),t.O)
for(s=o.length,r=0;r<s;++r){q=o[r]
if(p[q]===a)return q}throw A.b(A.aP("Field name "+a+" not found.",null))},
e_(a){if(a==null)A.mG("boolean expression must not be null")
return a},
mG(a){throw A.b(new A.dp(a))},
o3(a){throw A.b(new A.du(a))},
mO(a){return v.getIsolateTag(a)},
o0(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
n_(a){var s,r,q,p,o,n=A.l($.k3.$1(a)),m=$.hS[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.hZ[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.al($.jZ.$2(a,n))
if(q!=null){m=$.hS[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.hZ[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.i0(s)
$.hS[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.hZ[n]=s
return s}if(p==="-"){o=A.i0(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.k6(a,s)
if(p==="*")throw A.b(A.jk(n))
if(v.leafTags[n]===true){o=A.i0(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.k6(a,s)},
k6(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.iA(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
i0(a){return J.iA(a,!1,null,!!a.$iax)},
n1(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.i0(s)
else return J.iA(s,c,null,null)},
mV(){if(!0===$.iy)return
$.iy=!0
A.mW()},
mW(){var s,r,q,p,o,n,m,l
$.hS=Object.create(null)
$.hZ=Object.create(null)
A.mU()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.k7.$1(o)
if(n!=null){m=A.n1(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
mU(){var s,r,q,p,o,n,m=B.G()
m=A.bJ(B.H,A.bJ(B.I,A.bJ(B.w,A.bJ(B.w,A.bJ(B.J,A.bJ(B.K,A.bJ(B.L(B.v),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.k3=new A.hW(p)
$.jZ=new A.hX(o)
$.k7=new A.hY(n)},
bJ(a,b){return a(b)||b},
mM(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
l_(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=f?"g":"",n=function(g,h){try{return new RegExp(g,h)}catch(m){return m}}(a,s+r+q+p+o)
if(n instanceof RegExp)return n
throw A.b(A.S("Illegal RegExp pattern ("+String(n)+")",a,null))},
n8(a,b,c){var s=a.indexOf(b,c)
return s>=0},
n3(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bP:function bP(){},
bQ:function bQ(a,b,c){this.a=a
this.b=b
this.$ti=c},
fY:function fY(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
ce:function ce(){},
d4:function d4(a,b,c){this.a=a
this.b=b
this.c=c},
dk:function dk(a){this.a=a},
fR:function fR(a){this.a=a},
bW:function bW(a,b){this.a=a
this.b=b},
cy:function cy(a){this.a=a
this.b=null},
aH:function aH(){},
cR:function cR(){},
cS:function cS(){},
di:function di(){},
df:function df(){},
bj:function bj(a,b){this.a=a
this.b=b},
du:function du(a){this.a=a},
dd:function dd(a){this.a=a},
dp:function dp(a){this.a=a},
ay:function ay(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
fH:function fH(a){this.a=a},
fG:function fG(a){this.a=a},
fK:function fK(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
az:function az(a,b){this.a=a
this.$ti=b},
c4:function c4(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
hW:function hW(a){this.a=a},
hX:function hX(a){this.a=a},
hY:function hY(a){this.a=a},
d3:function d3(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
ht:function ht(a){this.b=a},
ma(a){return a},
l1(a){return new Uint8Array(a)},
ir(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.hR(b,a))},
d8:function d8(){},
br:function br(){},
ca:function ca(){},
d7:function d7(){},
cb:function cb(){},
cu:function cu(){},
cv:function cv(){},
jd(a,b){var s=b.c
return s==null?b.c=A.im(a,b.x,!0):s},
ih(a,b){var s=b.c
return s==null?b.c=A.cC(a,"ao",[b.x]):s},
je(a){var s=a.w
if(s===6||s===7||s===8)return A.je(a.x)
return s===12||s===13},
la(a){return a.as},
hT(a){return A.dQ(v.typeUniverse,a,!1)},
aL(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.aL(a1,s,a3,a4)
if(r===s)return a2
return A.jD(a1,r,!0)
case 7:s=a2.x
r=A.aL(a1,s,a3,a4)
if(r===s)return a2
return A.im(a1,r,!0)
case 8:s=a2.x
r=A.aL(a1,s,a3,a4)
if(r===s)return a2
return A.jB(a1,r,!0)
case 9:q=a2.y
p=A.bI(a1,q,a3,a4)
if(p===q)return a2
return A.cC(a1,a2.x,p)
case 10:o=a2.x
n=A.aL(a1,o,a3,a4)
m=a2.y
l=A.bI(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.ik(a1,n,l)
case 11:k=a2.x
j=a2.y
i=A.bI(a1,j,a3,a4)
if(i===j)return a2
return A.jC(a1,k,i)
case 12:h=a2.x
g=A.aL(a1,h,a3,a4)
f=a2.y
e=A.mB(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.jA(a1,g,e)
case 13:d=a2.y
a4+=d.length
c=A.bI(a1,d,a3,a4)
o=a2.x
n=A.aL(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.il(a1,n,c,!0)
case 14:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.b(A.cO("Attempted to substitute unexpected RTI kind "+a0))}},
bI(a,b,c,d){var s,r,q,p,o=b.length,n=A.hG(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.aL(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
mC(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.hG(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.aL(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
mB(a,b,c,d){var s,r=b.a,q=A.bI(a,r,c,d),p=b.b,o=A.bI(a,p,c,d),n=b.c,m=A.mC(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dA()
s.a=q
s.b=o
s.c=m
return s},
n(a,b){a[v.arrayRti]=b
return a},
k1(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.mQ(s)
return a.$S()}return null},
mX(a,b){var s
if(A.je(b))if(a instanceof A.aH){s=A.k1(a)
if(s!=null)return s}return A.a4(a)},
a4(a){if(a instanceof A.v)return A.x(a)
if(Array.isArray(a))return A.K(a)
return A.is(J.be(a))},
K(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
x(a){var s=a.$ti
return s!=null?s:A.is(a)},
is(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.mh(a,s)},
mh(a,b){var s=a instanceof A.aH?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.lK(v.typeUniverse,s.name)
b.$ccache=r
return r},
mQ(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.dQ(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
mP(a){return A.bd(A.x(a))},
mA(a){var s=a instanceof A.aH?A.k1(a):null
if(s!=null)return s
if(t.dm.b(a))return J.kE(a).a
if(Array.isArray(a))return A.K(a)
return A.a4(a)},
bd(a){var s=a.r
return s==null?a.r=A.jP(a):s},
jP(a){var s,r,q=a.as,p=q.replace(/\*/g,"")
if(p===q)return a.r=new A.hB(a)
s=A.dQ(v.typeUniverse,p,!0)
r=s.r
return r==null?s.r=A.jP(s):r},
k8(a){return A.bd(A.dQ(v.typeUniverse,a,!1))},
mg(a){var s,r,q,p,o,n,m=this
if(m===t.K)return A.aE(m,a,A.mn)
if(!A.aF(m))s=m===t._
else s=!0
if(s)return A.aE(m,a,A.mr)
s=m.w
if(s===7)return A.aE(m,a,A.me)
if(s===1)return A.aE(m,a,A.jT)
r=s===6?m.x:m
q=r.w
if(q===8)return A.aE(m,a,A.mj)
if(r===t.S)p=A.iv
else if(r===t.i||r===t.o)p=A.mm
else if(r===t.N)p=A.mp
else p=r===t.y?A.it:null
if(p!=null)return A.aE(m,a,p)
if(q===9){o=r.x
if(r.y.every(A.mY)){m.f="$i"+o
if(o==="H")return A.aE(m,a,A.ml)
return A.aE(m,a,A.mq)}}else if(q===11){n=A.mM(r.x,r.y)
return A.aE(m,a,n==null?A.jT:n)}return A.aE(m,a,A.mc)},
aE(a,b,c){a.b=c
return a.b(b)},
mf(a){var s,r=this,q=A.mb
if(!A.aF(r))s=r===t._
else s=!0
if(s)q=A.m6
else if(r===t.K)q=A.m5
else{s=A.cL(r)
if(s)q=A.md}r.a=q
return r.a(a)},
dY(a){var s,r=a.w
if(!A.aF(a))if(!(a===t._))if(!(a===t.aw))if(r!==7)if(!(r===6&&A.dY(a.x)))s=r===8&&A.dY(a.x)||a===t.a||a===t.T
else s=!0
else s=!0
else s=!0
else s=!0
else s=!0
return s},
mc(a){var s=this
if(a==null)return A.dY(s)
return A.k5(v.typeUniverse,A.mX(a,s),s)},
me(a){if(a==null)return!0
return this.x.b(a)},
mq(a){var s,r=this
if(a==null)return A.dY(r)
s=r.f
if(a instanceof A.v)return!!a[s]
return!!J.be(a)[s]},
ml(a){var s,r=this
if(a==null)return A.dY(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.v)return!!a[s]
return!!J.be(a)[s]},
mb(a){var s=this
if(a==null){if(A.cL(s))return a}else if(s.b(a))return a
A.jQ(a,s)},
md(a){var s=this
if(a==null)return a
else if(s.b(a))return a
A.jQ(a,s)},
jQ(a,b){throw A.b(A.jz(A.jq(a,A.Y(b,null))))},
k0(a,b,c,d){if(A.k5(v.typeUniverse,a,b))return a
throw A.b(A.jz("The type argument '"+A.Y(a,null)+"' is not a subtype of the type variable bound '"+A.Y(b,null)+"' of type variable '"+c+"' in '"+d+"'."))},
jq(a,b){return A.bV(a)+": type '"+A.Y(A.mA(a),null)+"' is not a subtype of type '"+b+"'"},
jz(a){return new A.cA("TypeError: "+a)},
a1(a,b){return new A.cA("TypeError: "+A.jq(a,b))},
mj(a){var s=this,r=s.w===6?s.x:s
return r.x.b(a)||A.ih(v.typeUniverse,r).b(a)},
mn(a){return a!=null},
m5(a){if(a!=null)return a
throw A.b(A.a1(a,"Object"))},
mr(a){return!0},
m6(a){return a},
jT(a){return!1},
it(a){return!0===a||!1===a},
jN(a){if(!0===a)return!0
if(!1===a)return!1
throw A.b(A.a1(a,"bool"))},
nS(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.b(A.a1(a,"bool"))},
nR(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.b(A.a1(a,"bool?"))},
nT(a){if(typeof a=="number")return a
throw A.b(A.a1(a,"double"))},
nV(a){if(typeof a=="number")return a
if(a==null)return a
throw A.b(A.a1(a,"double"))},
nU(a){if(typeof a=="number")return a
if(a==null)return a
throw A.b(A.a1(a,"double?"))},
iv(a){return typeof a=="number"&&Math.floor(a)===a},
bc(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.b(A.a1(a,"int"))},
nW(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.b(A.a1(a,"int"))},
m3(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.b(A.a1(a,"int?"))},
mm(a){return typeof a=="number"},
u(a){if(typeof a=="number")return a
throw A.b(A.a1(a,"num"))},
nX(a){if(typeof a=="number")return a
if(a==null)return a
throw A.b(A.a1(a,"num"))},
m4(a){if(typeof a=="number")return a
if(a==null)return a
throw A.b(A.a1(a,"num?"))},
mp(a){return typeof a=="string"},
l(a){if(typeof a=="string")return a
throw A.b(A.a1(a,"String"))},
nY(a){if(typeof a=="string")return a
if(a==null)return a
throw A.b(A.a1(a,"String"))},
al(a){if(typeof a=="string")return a
if(a==null)return a
throw A.b(A.a1(a,"String?"))},
jW(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.Y(a[q],b)
return s},
mv(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.jW(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.Y(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
jR(a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=", "
if(a6!=null){s=a6.length
if(a5==null){a5=A.n([],t.s)
r=null}else r=a5.length
q=a5.length
for(p=s;p>0;--p)B.b.l(a5,"T"+(q+p))
for(o=t.O,n=t._,m="<",l="",p=0;p<s;++p,l=a3){k=a5.length
j=k-1-p
if(!(j>=0))return A.c(a5,j)
m=B.a.cq(m+l,a5[j])
i=a6[p]
h=i.w
if(!(h===2||h===3||h===4||h===5||i===o))k=i===n
else k=!0
if(!k)m+=" extends "+A.Y(i,a5)}m+=">"}else{m=""
r=null}o=a4.x
g=a4.y
f=g.a
e=f.length
d=g.b
c=d.length
b=g.c
a=b.length
a0=A.Y(o,a5)
for(a1="",a2="",p=0;p<e;++p,a2=a3)a1+=a2+A.Y(f[p],a5)
if(c>0){a1+=a2+"["
for(a2="",p=0;p<c;++p,a2=a3)a1+=a2+A.Y(d[p],a5)
a1+="]"}if(a>0){a1+=a2+"{"
for(a2="",p=0;p<a;p+=3,a2=a3){a1+=a2
if(b[p+1])a1+="required "
a1+=A.Y(b[p+2],a5)+" "+b[p]}a1+="}"}if(r!=null){a5.toString
a5.length=r}return m+"("+a1+") => "+a0},
Y(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6)return A.Y(a.x,b)
if(l===7){s=a.x
r=A.Y(s,b)
q=s.w
return(q===12||q===13?"("+r+")":r)+"?"}if(l===8)return"FutureOr<"+A.Y(a.x,b)+">"
if(l===9){p=A.mD(a.x)
o=a.y
return o.length>0?p+("<"+A.jW(o,b)+">"):p}if(l===11)return A.mv(a,b)
if(l===12)return A.jR(a,b,null)
if(l===13)return A.jR(a.x,b,a.y)
if(l===14){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.c(b,n)
return b[n]}return"?"},
mD(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
lL(a,b){var s=a.tR[b]
for(;typeof s=="string";)s=a.tR[s]
return s},
lK(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.dQ(a,b,!1)
else if(typeof m=="number"){s=m
r=A.cD(a,5,"#")
q=A.hG(s)
for(p=0;p<s;++p)q[p]=r
o=A.cC(a,b,q)
n[b]=o
return o}else return m},
lI(a,b){return A.jL(a.tR,b)},
lH(a,b){return A.jL(a.eT,b)},
dQ(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.jw(A.ju(a,null,b,c))
r.set(b,s)
return s},
hC(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.jw(A.ju(a,b,c,!0))
q.set(c,r)
return r},
lJ(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.ik(a,b,c.w===10?c.y:[c])
p.set(s,q)
return q},
aD(a,b){b.a=A.mf
b.b=A.mg
return b},
cD(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.ae(null,null)
s.w=b
s.as=c
r=A.aD(a,s)
a.eC.set(c,r)
return r},
jD(a,b,c){var s,r=b.as+"*",q=a.eC.get(r)
if(q!=null)return q
s=A.lF(a,b,r,c)
a.eC.set(r,s)
return s},
lF(a,b,c,d){var s,r,q
if(d){s=b.w
if(!A.aF(b))r=b===t.a||b===t.T||s===7||s===6
else r=!0
if(r)return b}q=new A.ae(null,null)
q.w=6
q.x=b
q.as=c
return A.aD(a,q)},
im(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.lE(a,b,r,c)
a.eC.set(r,s)
return s},
lE(a,b,c,d){var s,r,q,p
if(d){s=b.w
if(!A.aF(b))if(!(b===t.a||b===t.T))if(s!==7)r=s===8&&A.cL(b.x)
else r=!0
else r=!0
else r=!0
if(r)return b
else if(s===1||b===t.aw)return t.a
else if(s===6){q=b.x
if(q.w===8&&A.cL(q.x))return q
else return A.jd(a,b)}}p=new A.ae(null,null)
p.w=7
p.x=b
p.as=c
return A.aD(a,p)},
jB(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.lC(a,b,r,c)
a.eC.set(r,s)
return s},
lC(a,b,c,d){var s,r
if(d){s=b.w
if(A.aF(b)||b===t.K||b===t._)return b
else if(s===1)return A.cC(a,"ao",[b])
else if(b===t.a||b===t.T)return t.eH}r=new A.ae(null,null)
r.w=8
r.x=b
r.as=c
return A.aD(a,r)},
lG(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.ae(null,null)
s.w=14
s.x=b
s.as=q
r=A.aD(a,s)
a.eC.set(q,r)
return r},
cB(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
lB(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
cC(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.cB(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.ae(null,null)
r.w=9
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.aD(a,r)
a.eC.set(p,q)
return q},
ik(a,b,c){var s,r,q,p,o,n
if(b.w===10){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.cB(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.ae(null,null)
o.w=10
o.x=s
o.y=r
o.as=q
n=A.aD(a,o)
a.eC.set(q,n)
return n},
jC(a,b,c){var s,r,q="+"+(b+"("+A.cB(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.ae(null,null)
s.w=11
s.x=b
s.y=c
s.as=q
r=A.aD(a,s)
a.eC.set(q,r)
return r},
jA(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.cB(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.cB(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.lB(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.ae(null,null)
p.w=12
p.x=b
p.y=c
p.as=r
o=A.aD(a,p)
a.eC.set(r,o)
return o},
il(a,b,c,d){var s,r=b.as+("<"+A.cB(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.lD(a,b,c,r,d)
a.eC.set(r,s)
return s},
lD(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.hG(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.aL(a,b,r,0)
m=A.bI(a,c,r,0)
return A.il(a,n,m,c!==m)}}l=new A.ae(null,null)
l.w=13
l.x=b
l.y=c
l.as=d
return A.aD(a,l)},
ju(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
jw(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.lu(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.jv(a,r,l,k,!1)
else if(q===46)r=A.jv(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.aK(a.u,a.e,k.pop()))
break
case 94:k.push(A.lG(a.u,k.pop()))
break
case 35:k.push(A.cD(a.u,5,"#"))
break
case 64:k.push(A.cD(a.u,2,"@"))
break
case 126:k.push(A.cD(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.lw(a,k)
break
case 38:A.lv(a,k)
break
case 42:p=a.u
k.push(A.jD(p,A.aK(p,a.e,k.pop()),a.n))
break
case 63:p=a.u
k.push(A.im(p,A.aK(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.jB(p,A.aK(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.lt(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.jx(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.ly(a.u,a.e,o)
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
return A.aK(a.u,a.e,m)},
lu(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
jv(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===10)o=o.x
n=A.lL(s,o.x)[p]
if(n==null)A.as('No "'+p+'" in "'+A.la(o)+'"')
d.push(A.hC(s,o,n))}else d.push(p)
return m},
lw(a,b){var s,r=a.u,q=A.jt(a,b),p=b.pop()
if(typeof p=="string")b.push(A.cC(r,p,q))
else{s=A.aK(r,a.e,p)
switch(s.w){case 12:b.push(A.il(r,s,q,a.n))
break
default:b.push(A.ik(r,s,q))
break}}},
lt(a,b){var s,r,q,p,o,n=null,m=a.u,l=b.pop()
if(typeof l=="number")switch(l){case-1:s=b.pop()
r=n
break
case-2:r=b.pop()
s=n
break
default:b.push(l)
r=n
s=r
break}else{b.push(l)
r=n
s=r}q=A.jt(a,b)
l=b.pop()
switch(l){case-3:l=b.pop()
if(s==null)s=m.sEA
if(r==null)r=m.sEA
p=A.aK(m,a.e,l)
o=new A.dA()
o.a=q
o.b=s
o.c=r
b.push(A.jA(m,p,o))
return
case-4:b.push(A.jC(m,b.pop(),q))
return
default:throw A.b(A.cO("Unexpected state under `()`: "+A.d(l)))}},
lv(a,b){var s=b.pop()
if(0===s){b.push(A.cD(a.u,1,"0&"))
return}if(1===s){b.push(A.cD(a.u,4,"1&"))
return}throw A.b(A.cO("Unexpected extended operation "+A.d(s)))},
jt(a,b){var s=b.splice(a.p)
A.jx(a.u,a.e,s)
a.p=b.pop()
return s},
aK(a,b,c){if(typeof c=="string")return A.cC(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.lx(a,b,c)}else return c},
jx(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.aK(a,b,c[s])},
ly(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.aK(a,b,c[s])},
lx(a,b,c){var s,r,q=b.w
if(q===10){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==9)throw A.b(A.cO("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.b(A.cO("Bad index "+c+" for "+b.j(0)))},
k5(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.O(a,b,null,c,null,!1)?1:0
r.set(c,s)}if(0===s)return!1
if(1===s)return!0
return!0},
O(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(!A.aF(d))s=d===t._
else s=!0
if(s)return!0
r=b.w
if(r===4)return!0
if(A.aF(b))return!1
s=b.w
if(s===1)return!0
q=r===14
if(q)if(A.O(a,c[b.x],c,d,e,!1))return!0
p=d.w
s=b===t.a||b===t.T
if(s){if(p===8)return A.O(a,b,c,d.x,e,!1)
return d===t.a||d===t.T||p===7||p===6}if(d===t.K){if(r===8)return A.O(a,b.x,c,d,e,!1)
if(r===6)return A.O(a,b.x,c,d,e,!1)
return r!==7}if(r===6)return A.O(a,b.x,c,d,e,!1)
if(p===6){s=A.jd(a,d)
return A.O(a,b,c,s,e,!1)}if(r===8){if(!A.O(a,b.x,c,d,e,!1))return!1
return A.O(a,A.ih(a,b),c,d,e,!1)}if(r===7){s=A.O(a,t.a,c,d,e,!1)
return s&&A.O(a,b.x,c,d,e,!1)}if(p===8){if(A.O(a,b,c,d.x,e,!1))return!0
return A.O(a,b,c,A.ih(a,d),e,!1)}if(p===7){s=A.O(a,b,c,t.a,e,!1)
return s||A.O(a,b,c,d.x,e,!1)}if(q)return!1
s=r!==12
if((!s||r===13)&&d===t.Y)return!0
o=r===11
if(o&&d===t.gT)return!0
if(p===13){if(b===t.m)return!0
if(r!==13)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.O(a,j,c,i,e,!1)||!A.O(a,i,e,j,c,!1))return!1}return A.jS(a,b.x,c,d.x,e,!1)}if(p===12){if(b===t.m)return!0
if(s)return!1
return A.jS(a,b,c,d,e,!1)}if(r===9){if(p!==9)return!1
return A.mk(a,b,c,d,e,!1)}if(o&&p===11)return A.mo(a,b,c,d,e,!1)
return!1},
jS(a3,a4,a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.O(a3,a4.x,a5,a6.x,a7,!1))return!1
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
if(!A.O(a3,p[h],a7,g,a5,!1))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.O(a3,p[o+h],a7,g,a5,!1))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.O(a3,k[h],a7,g,a5,!1))return!1}f=s.c
e=r.c
d=f.length
c=e.length
for(b=0,a=0;a<c;a+=3){a0=e[a]
for(;!0;){if(b>=d)return!1
a1=f[b]
b+=3
if(a0<a1)return!1
a2=f[b-2]
if(a1<a0){if(a2)return!1
continue}g=e[a+1]
if(a2&&!g)return!1
g=f[b-1]
if(!A.O(a3,e[a+2],a7,g,a5,!1))return!1
break}}for(;b<d;){if(f[b+1])return!1
b+=3}return!0},
mk(a,b,c,d,e,f){var s,r,q,p,o,n=b.x,m=d.x
for(;n!==m;){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.hC(a,b,r[o])
return A.jM(a,p,null,c,d.y,e,!1)}return A.jM(a,b.y,null,c,d.y,e,!1)},
jM(a,b,c,d,e,f,g){var s,r=b.length
for(s=0;s<r;++s)if(!A.O(a,b[s],d,e[s],f,!1))return!1
return!0},
mo(a,b,c,d,e,f){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.O(a,r[s],c,q[s],e,!1))return!1
return!0},
cL(a){var s,r=a.w
if(!(a===t.a||a===t.T))if(!A.aF(a))if(r!==7)if(!(r===6&&A.cL(a.x)))s=r===8&&A.cL(a.x)
else s=!0
else s=!0
else s=!0
else s=!0
return s},
mY(a){var s
if(!A.aF(a))s=a===t._
else s=!0
return s},
aF(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.O},
jL(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
hG(a){return a>0?new Array(a):v.typeUniverse.sEA},
ae:function ae(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dA:function dA(){this.c=this.b=this.a=null},
hB:function hB(a){this.a=a},
dz:function dz(){},
cA:function cA(a){this.a=a},
li(){var s,r,q={}
if(self.scheduleImmediate!=null)return A.mH()
if(self.MutationObserver!=null&&self.document!=null){s=self.document.createElement("div")
r=self.document.createElement("span")
q.a=null
new self.MutationObserver(A.bL(new A.h7(q),1)).observe(s,{childList:true})
return new A.h6(q,s,r)}else if(self.setImmediate!=null)return A.mI()
return A.mJ()},
lj(a){self.scheduleImmediate(A.bL(new A.h8(t.M.a(a)),0))},
lk(a){self.setImmediate(A.bL(new A.h9(t.M.a(a)),0))},
ll(a){A.ii(B.P,t.M.a(a))},
ii(a,b){var s=B.e.a6(a.a,1000)
return A.lz(s,b)},
ji(a,b){var s=B.e.a6(a.a,1000)
return A.lA(s,b)},
lz(a,b){var s=new A.cz(!0)
s.cF(a,b)
return s},
lA(a,b){var s=new A.cz(!1)
s.cG(a,b)
return s},
dX(a){return new A.dq(new A.P($.J,a.h("P<0>")),a.h("dq<0>"))},
dW(a,b){a.$2(0,null)
b.b=!0
return b.a},
dT(a,b){A.m7(a,b)},
dV(a,b){b.bd(0,a)},
dU(a,b){b.aG(A.a5(a),A.aM(a))},
m7(a,b){var s,r,q=new A.hI(b),p=new A.hJ(b)
if(a instanceof A.P)a.bS(q,p,t.z)
else{s=t.z
if(a instanceof A.P)a.bn(q,p,s)
else{r=new A.P($.J,t.c)
r.a=8
r.c=a
r.bS(q,p,s)}}},
dZ(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.J.cd(new A.hQ(s),t.H,t.S,t.z)},
fg(a,b){var s=A.bK(a,"error",t.K)
return new A.bO(s,b==null?A.iK(a):b)},
iK(a){var s
if(t.W.b(a)){s=a.gaz()
if(s!=null)return s}return B.N},
jr(a,b){var s,r,q
for(s=t.c;r=a.a,(r&4)!==0;)a=s.a(a.c)
s=r|b.a&1
a.a=s
if((s&24)!==0){q=b.aB()
b.aA(a)
A.bE(b,q)}else{q=t.F.a(b.c)
b.bN(a)
a.ba(q)}},
ln(a,b){var s,r,q,p={},o=p.a=a
for(s=t.c;r=o.a,(r&4)!==0;o=a){a=s.a(o.c)
p.a=a}if((r&24)===0){q=t.F.a(b.c)
b.bN(o)
p.a.ba(q)
return}if((r&16)===0&&b.c==null){b.aA(o)
return}b.a^=2
A.bH(null,null,b.b,t.M.a(new A.hf(p,b)))},
bE(a,a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c={},b=c.a=a
for(s=t.n,r=t.F,q=t.b9;!0;){p={}
o=b.a
n=(o&16)===0
m=!n
if(a0==null){if(m&&(o&1)===0){l=s.a(b.c)
A.hO(l.a,l.b)}return}p.a=a0
k=a0.a
for(b=a0;k!=null;b=k,k=j){b.a=null
A.bE(c.a,b)
p.a=k
j=k.a}o=c.a
i=o.c
p.b=m
p.c=i
if(n){h=b.c
h=(h&1)!==0||(h&15)===8}else h=!0
if(h){g=b.b.b
if(m){o=o.b===g
o=!(o||o)}else o=!1
if(o){s.a(i)
A.hO(i.a,i.b)
return}f=$.J
if(f!==g)$.J=g
else f=null
b=b.c
if((b&15)===8)new A.hm(p,c,m).$0()
else if(n){if((b&1)!==0)new A.hl(p,i).$0()}else if((b&2)!==0)new A.hk(c,p).$0()
if(f!=null)$.J=f
b=p.c
if(b instanceof A.P){o=p.a.$ti
o=o.h("ao<2>").b(b)||!o.y[1].b(b)}else o=!1
if(o){q.a(b)
e=p.a.b
if((b.a&24)!==0){d=r.a(e.c)
e.c=null
a0=e.aC(d)
e.a=b.a&30|e.a&1
e.c=b.c
c.a=b
continue}else A.jr(b,e)
return}}e=p.a.b
d=r.a(e.c)
e.c=null
a0=e.aC(d)
b=p.b
o=p.c
if(!b){e.$ti.c.a(o)
e.a=8
e.c=o}else{s.a(o)
e.a=e.a&1|16
e.c=o}c.a=e
b=e}},
mw(a,b){var s
if(t.Q.b(a))return b.cd(a,t.z,t.K,t.l)
s=t.v
if(s.b(a))return s.a(a)
throw A.b(A.i5(a,"onError",u.c))},
mt(){var s,r
for(s=$.bG;s!=null;s=$.bG){$.cK=null
r=s.b
$.bG=r
if(r==null)$.cJ=null
s.a.$0()}},
mz(){$.iu=!0
try{A.mt()}finally{$.cK=null
$.iu=!1
if($.bG!=null)$.iE().$1(A.k_())}},
jY(a){var s=new A.dr(a),r=$.cJ
if(r==null){$.bG=$.cJ=s
if(!$.iu)$.iE().$1(A.k_())}else $.cJ=r.b=s},
my(a){var s,r,q,p=$.bG
if(p==null){A.jY(a)
$.cK=$.cJ
return}s=new A.dr(a)
r=$.cK
if(r==null){s.b=p
$.bG=$.cK=s}else{q=r.b
s.b=q
$.cK=r.b=s
if(q==null)$.cJ=s}},
n4(a){var s=null,r=$.J
if(B.h===r){A.bH(s,s,B.h,a)
return}A.bH(s,s,r,t.M.a(r.bc(a)))},
nx(a,b){A.bK(a,"stream",t.K)
return new A.dM(b.h("dM<0>"))},
lf(a,b){var s=$.J
if(s===B.h)return A.ii(a,t.M.a(b))
return A.ii(a,t.M.a(s.bc(b)))},
jh(a,b){var s=$.J
if(s===B.h)return A.ji(a,t.cB.a(b))
return A.ji(a,t.cB.a(s.bX(b,t.D)))},
hO(a,b){A.my(new A.hP(a,b))},
jU(a,b,c,d,e){var s,r=$.J
if(r===c)return d.$0()
$.J=c
s=r
try{r=d.$0()
return r}finally{$.J=s}},
jV(a,b,c,d,e,f,g){var s,r=$.J
if(r===c)return d.$1(e)
$.J=c
s=r
try{r=d.$1(e)
return r}finally{$.J=s}},
mx(a,b,c,d,e,f,g,h,i){var s,r=$.J
if(r===c)return d.$2(e,f)
$.J=c
s=r
try{r=d.$2(e,f)
return r}finally{$.J=s}},
bH(a,b,c,d){t.M.a(d)
if(B.h!==c)d=c.bc(d)
A.jY(d)},
h7:function h7(a){this.a=a},
h6:function h6(a,b,c){this.a=a
this.b=b
this.c=c},
h8:function h8(a){this.a=a},
h9:function h9(a){this.a=a},
cz:function cz(a){this.a=a
this.b=null
this.c=0},
hA:function hA(a,b){this.a=a
this.b=b},
hz:function hz(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dq:function dq(a,b){this.a=a
this.b=!1
this.$ti=b},
hI:function hI(a){this.a=a},
hJ:function hJ(a){this.a=a},
hQ:function hQ(a){this.a=a},
bO:function bO(a,b){this.a=a
this.b=b},
cp:function cp(){},
co:function co(a,b){this.a=a
this.$ti=b},
b9:function b9(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
P:function P(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
hc:function hc(a,b){this.a=a
this.b=b},
hj:function hj(a,b){this.a=a
this.b=b},
hg:function hg(a){this.a=a},
hh:function hh(a){this.a=a},
hi:function hi(a,b,c){this.a=a
this.b=b
this.c=c},
hf:function hf(a,b){this.a=a
this.b=b},
he:function he(a,b){this.a=a
this.b=b},
hd:function hd(a,b,c){this.a=a
this.b=b
this.c=c},
hm:function hm(a,b,c){this.a=a
this.b=b
this.c=c},
hn:function hn(a){this.a=a},
hl:function hl(a,b){this.a=a
this.b=b},
hk:function hk(a,b){this.a=a
this.b=b},
dr:function dr(a){this.a=a
this.b=null},
cj:function cj(){},
fW:function fW(a,b){this.a=a
this.b=b},
fX:function fX(a,b){this.a=a
this.b=b},
dM:function dM(a){this.$ti=a},
cI:function cI(){},
hP:function hP(a,b){this.a=a
this.b=b},
dI:function dI(){},
hu:function hu(a,b){this.a=a
this.b=b},
hv:function hv(a,b,c){this.a=a
this.b=b
this.c=c},
j4(a,b){return new A.ay(a.h("@<0>").A(b).h("ay<1,2>"))},
B(a,b,c){return b.h("@<0>").A(c).h("j3<1,2>").a(A.mN(a,new A.ay(b.h("@<0>").A(c).h("ay<1,2>"))))},
bq(a,b){return new A.ay(a.h("@<0>").A(b).h("ay<1,2>"))},
c6(a){return new A.cs(a.h("cs<0>"))},
ij(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
ls(a,b,c){var s=new A.bb(a,b,c.h("bb<0>"))
s.c=a.e
return s},
c5(a,b,c){var s=A.j4(b,c)
J.e1(a,new A.fL(s,b,c))
return s},
j5(a,b){var s,r,q=A.c6(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.i2)(a),++r)q.l(0,b.a(a[r]))
return q},
ie(a){var s,r={}
if(A.iz(a))return"{...}"
s=new A.W("")
try{B.b.l($.ab,a)
s.a+="{"
r.a=!0
J.e1(a,new A.fO(r,s))
s.a+="}"}finally{if(0>=$.ab.length)return A.c($.ab,-1)
$.ab.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
cs:function cs(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dE:function dE(a){this.a=a
this.c=this.b=null},
bb:function bb(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
fL:function fL(a,b,c){this.a=a
this.b=b
this.c=c},
D:function D(){},
z:function z(){},
fN:function fN(a){this.a=a},
fO:function fO(a,b){this.a=a
this.b=b},
bA:function bA(){},
aa:function aa(){},
c8:function c8(){},
bB:function bB(a,b){this.a=a
this.$ti=b},
a8:function a8(){},
cw:function cw(){},
cE:function cE(){},
mu(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.a5(r)
q=A.S(String(s),null,null)
throw A.b(q)}q=A.hK(p)
return q},
hK(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.dC(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.hK(a[s])
return a},
m1(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.kw()
else s=new Uint8Array(o)
for(r=J.t(a),q=0;q<o;++q){p=r.i(a,b+q)
if((p&255)!==p)p=255
s[q]=p}return s},
m0(a,b,c,d){var s=a?$.kv():$.ku()
if(s==null)return null
if(0===c&&d===b.length)return A.jK(s,b)
return A.jK(s,b.subarray(c,d))},
jK(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
iL(a,b,c,d,e,f){if(B.e.aa(f,4)!==0)throw A.b(A.S("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.b(A.S("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.b(A.S("Invalid base64 padding, more than two '=' characters",a,b))},
j2(a,b,c){return new A.c3(a,b)},
m9(a){return a.dV()},
lq(a,b){return new A.hq(a,[],A.mL())},
lr(a,b,c){var s,r=new A.W(""),q=A.lq(r,b)
q.aP(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
m2(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
dC:function dC(a,b){this.a=a
this.b=b
this.c=null},
dD:function dD(a){this.a=a},
hF:function hF(){},
hE:function hE(){},
cQ:function cQ(){},
fh:function fh(){},
aS:function aS(){},
cV:function cV(){},
cY:function cY(){},
c3:function c3(a,b){this.a=a
this.b=b},
d6:function d6(a,b){this.a=a
this.b=b},
d5:function d5(){},
fJ:function fJ(a){this.b=a},
fI:function fI(a){this.a=a},
hr:function hr(){},
hs:function hs(a,b){this.a=a
this.b=b},
hq:function hq(a,b,c){this.c=a
this.a=b
this.b=c},
dn:function dn(){},
h4:function h4(a){this.a=a},
hD:function hD(a){this.a=a
this.b=16
this.c=0},
aN(a,b){var s=A.ig(a,b)
if(s!=null)return s
throw A.b(A.S(a,null,null))},
kS(a,b){a=A.b(a)
if(a==null)a=t.K.a(a)
a.stack=b.j(0)
throw a
throw A.b("unreachable")},
fM(a,b,c,d){var s,r=c?J.j_(a,d):J.iZ(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
Q(a,b){var s,r=A.n([],b.h("N<0>"))
for(s=J.bg(a);s.u();)B.b.l(r,b.a(s.gE()))
return r},
b0(a,b,c){var s=A.l0(a,c)
return s},
l0(a,b){var s,r
if(Array.isArray(a))return A.n(a.slice(0),b.h("N<0>"))
s=A.n([],b.h("N<0>"))
for(r=J.bg(a);r.u();)B.b.l(s,r.gE())
return s},
jg(a,b,c){var s,r
A.fU(b,"start")
if(c!=null){s=c-b
if(s<0)throw A.b(A.aj(c,b,null,"end",null))
if(s===0)return""}r=A.ld(a,b,c)
return r},
ld(a,b,c){var s=a.length
if(b>=s)return""
return A.l6(a,b,c==null||c>s?s:c)},
jc(a){return new A.d3(a,A.l_(a,!1,!0,!1,!1,!1))},
jf(a,b,c){var s=J.bg(b)
if(!s.u())return a
if(c.length===0){do a+=A.d(s.gE())
while(s.u())}else{a+=A.d(s.gE())
for(;s.u();)a=a+c+A.d(s.gE())}return a},
bR(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=null,b=$.kd().dr(a)
if(b!=null){s=new A.fw()
r=b.b
if(1>=r.length)return A.c(r,1)
q=r[1]
q.toString
p=A.aN(q,c)
if(2>=r.length)return A.c(r,2)
q=r[2]
q.toString
o=A.aN(q,c)
if(3>=r.length)return A.c(r,3)
q=r[3]
q.toString
n=A.aN(q,c)
if(4>=r.length)return A.c(r,4)
m=s.$1(r[4])
if(5>=r.length)return A.c(r,5)
l=s.$1(r[5])
if(6>=r.length)return A.c(r,6)
k=s.$1(r[6])
if(7>=r.length)return A.c(r,7)
j=new A.fx().$1(r[7])
i=B.e.a6(j,1000)
q=r.length
if(8>=q)return A.c(r,8)
h=r[8]!=null
if(h){if(9>=q)return A.c(r,9)
g=r[9]
if(g!=null){f=g==="-"?-1:1
if(10>=q)return A.c(r,10)
q=r[10]
q.toString
e=A.aN(q,c)
if(11>=r.length)return A.c(r,11)
l-=f*(s.$1(r[11])+60*e)}}d=A.l7(p,o,n,m,l,k,i+B.c.dK(j%1000/1000),h)
if(d==null)throw A.b(A.S("Time out of range",a,c))
return A.i6(d,h)}else throw A.b(A.S("Invalid date format",a,c))},
i6(a,b){if(Math.abs(a)>864e13)A.as(A.aP("DateTime is outside valid range: "+a,null))
A.bK(b,"isUtc",t.y)
return new A.af(a,b)},
iS(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
kQ(a){var s=Math.abs(a),r=a<0?"-":"+"
if(s>=1e5)return r+s
return r+"0"+s},
iT(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
av(a){if(a>=10)return""+a
return"0"+a},
i8(a,b){return new A.bS(1000*a+1e6*b)},
bV(a){if(typeof a=="number"||A.it(a)||a==null)return J.L(a)
if(typeof a=="string")return JSON.stringify(a)
return A.l5(a)},
kT(a,b){A.bK(a,"error",t.K)
A.bK(b,"stackTrace",t.l)
A.kS(a,b)},
cO(a){return new A.bN(a)},
aP(a,b){return new A.am(!1,null,b,a)},
i5(a,b,c){return new A.am(!0,a,b,c)},
l8(a){var s=null
return new A.bt(s,s,!1,s,s,a)},
ja(a,b){return new A.bt(null,null,!0,a,b,"Value not in range")},
aj(a,b,c,d,e){return new A.bt(b,c,!0,a,d,"Invalid value")},
dc(a,b,c){if(0>a||a>c)throw A.b(A.aj(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.b(A.aj(b,a,c,"end",null))
return b}return c},
fU(a,b){if(a<0)throw A.b(A.aj(a,0,null,b,null))
return a},
bZ(a,b,c,d,e){return new A.d_(b,!0,a,e,"Index out of range")},
X(a){return new A.dl(a)},
jk(a){return new A.dj(a)},
de(a){return new A.bv(a)},
V(a){return new A.cU(a)},
iW(a){return new A.hb(a)},
S(a,b,c){return new A.fB(a,b,c)},
kW(a,b,c){var s,r
if(A.iz(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.n([],t.s)
B.b.l($.ab,a)
try{A.ms(a,s)}finally{if(0>=$.ab.length)return A.c($.ab,-1)
$.ab.pop()}r=A.jf(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
ib(a,b,c){var s,r
if(A.iz(a))return b+"..."+c
s=new A.W(b)
B.b.l($.ab,a)
try{r=s
r.a=A.jf(r.a,a,", ")}finally{if(0>=$.ab.length)return A.c($.ab,-1)
$.ab.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
ms(a,b){var s,r,q,p,o,n,m,l=a.gI(a),k=0,j=0
while(!0){if(!(k<80||j<3))break
if(!l.u())return
s=A.d(l.gE())
B.b.l(b,s)
k+=s.length+2;++j}if(!l.u()){if(j<=5)return
if(0>=b.length)return A.c(b,-1)
r=b.pop()
if(0>=b.length)return A.c(b,-1)
q=b.pop()}else{p=l.gE();++j
if(!l.u()){if(j<=4){B.b.l(b,A.d(p))
return}r=A.d(p)
if(0>=b.length)return A.c(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gE();++j
for(;l.u();p=o,o=n){n=l.gE();++j
if(j>100){while(!0){if(!(k>75&&j>3))break
if(0>=b.length)return A.c(b,-1)
k-=b.pop().length+2;--j}B.b.l(b,"...")
return}}q=A.d(p)
r=A.d(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
while(!0){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.c(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.b.l(b,m)
B.b.l(b,q)
B.b.l(b,r)},
cM(a){A.i1(a)},
jm(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){if(4>=a4)return A.c(a5,4)
s=((a5.charCodeAt(4)^58)*3|a5.charCodeAt(0)^100|a5.charCodeAt(1)^97|a5.charCodeAt(2)^116|a5.charCodeAt(3)^97)>>>0
if(s===0)return A.jl(a4<a4?B.a.n(a5,0,a4):a5,5,a3).gcl()
else if(s===32)return A.jl(B.a.n(a5,5,a4),0,a3).gcl()}r=A.fM(8,0,!1,t.S)
B.b.m(r,0,0)
B.b.m(r,1,-1)
B.b.m(r,2,-1)
B.b.m(r,7,-1)
B.b.m(r,3,0)
B.b.m(r,4,0)
B.b.m(r,5,a4)
B.b.m(r,6,a4)
if(A.jX(a5,0,a4,0,r)>=14)B.b.m(r,7,a4)
q=r[1]
if(q>=0)if(A.jX(a5,0,q,20,r)===20)r[7]=q
p=r[2]+1
o=r[3]
n=r[4]
m=r[5]
l=r[6]
if(l<m)m=l
if(n<p)n=m
else if(n<=q)n=q+1
if(o<p)o=n
k=r[7]<0
if(k)if(p>q+3){j=a3
k=!1}else{i=o>0
if(i&&o+1===n){j=a3
k=!1}else{if(!B.a.M(a5,"\\",n))if(p>0)h=B.a.M(a5,"\\",p-1)||B.a.M(a5,"\\",p-2)
else h=!1
else h=!0
if(h){j=a3
k=!1}else{if(!(m<a4&&m===n+2&&B.a.M(a5,"..",n)))h=m>n+2&&B.a.M(a5,"/..",m-3)
else h=!0
if(h)j=a3
else if(q===4)if(B.a.M(a5,"file",0)){if(p<=0){if(!B.a.M(a5,"/",n)){g="file:///"
s=3}else{g="file://"
s=2}a5=g+B.a.n(a5,n,a4)
q-=0
i=s-0
m+=i
l+=i
a4=a5.length
p=7
o=7
n=7}else if(n===m){++l
f=m+1
a5=B.a.ah(a5,n,m,"/");++a4
m=f}j="file"}else if(B.a.M(a5,"http",0)){if(i&&o+3===n&&B.a.M(a5,"80",o+1)){l-=3
e=n-3
m-=3
a5=B.a.ah(a5,o,n,"")
a4-=3
n=e}j="http"}else j=a3
else if(q===5&&B.a.M(a5,"https",0)){if(i&&o+4===n&&B.a.M(a5,"443",o+1)){l-=4
e=n-4
m-=4
a5=B.a.ah(a5,o,n,"")
a4-=3
n=e}j="https"}else j=a3
k=!h}}}else j=a3
if(k){if(a4<a5.length){a5=B.a.n(a5,0,a4)
q-=0
p-=0
o-=0
n-=0
m-=0
l-=0}return new A.dK(a5,q,p,o,n,m,l,j)}if(j==null)if(q>0)j=A.lV(a5,0,q)
else{if(q===0)A.bF(a5,0,"Invalid empty scheme")
j=""}if(p>0){d=q+3
c=d<p?A.lW(a5,d,p-1):""
b=A.lR(a5,p,o,!1)
i=o+1
if(i<n){a=A.ig(B.a.n(a5,i,n),a3)
a0=A.lT(a==null?A.as(A.S("Invalid port",a5,i)):a,j)}else a0=a3}else{a0=a3
b=a0
c=""}a1=A.lS(a5,n,m,a3,j,b!=null)
a2=m<l?A.lU(a5,m+1,l,a3):a3
return A.lM(j,c,b,a0,a1,a2,l<a4?A.lQ(a5,l+1,a4):a3)},
jo(a){var s=t.N
return B.b.ds(A.n(a.split("&"),t.s),A.bq(s,s),new A.h3(B.x),t.I)},
lh(a,b,c){var s,r,q,p,o,n,m,l="IPv4 address should contain exactly 4 parts",k="each part must be in the range 0..255",j=new A.h0(a),i=new Uint8Array(4)
for(s=a.length,r=b,q=r,p=0;r<c;++r){if(!(r>=0&&r<s))return A.c(a,r)
o=a.charCodeAt(r)
if(o!==46){if((o^48)>9)j.$2("invalid character",r)}else{if(p===3)j.$2(l,r)
n=A.aN(B.a.n(a,q,r),null)
if(n>255)j.$2(k,q)
m=p+1
if(!(p<4))return A.c(i,p)
i[p]=n
q=r+1
p=m}}if(p!==3)j.$2(l,c)
n=A.aN(B.a.n(a,q,c),null)
if(n>255)j.$2(k,q)
if(!(p<4))return A.c(i,p)
i[p]=n
return i},
jn(a,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=null,d=new A.h1(a),c=new A.h2(d,a),b=a.length
if(b<2)d.$2("address is too short",e)
s=A.n([],t.t)
for(r=a0,q=r,p=!1,o=!1;r<a1;++r){if(!(r>=0&&r<b))return A.c(a,r)
n=a.charCodeAt(r)
if(n===58){if(r===a0){++r
if(!(r<b))return A.c(a,r)
if(a.charCodeAt(r)!==58)d.$2("invalid start colon.",r)
q=r}if(r===q){if(p)d.$2("only one wildcard `::` is allowed",r)
B.b.l(s,-1)
p=!0}else B.b.l(s,c.$2(q,r))
q=r+1}else if(n===46)o=!0}if(s.length===0)d.$2("too few parts",e)
m=q===a1
b=B.b.gaK(s)
if(m&&b!==-1)d.$2("expected a part after last `:`",a1)
if(!m)if(!o)B.b.l(s,c.$2(q,a1))
else{l=A.lh(a,q,a1)
B.b.l(s,(l[0]<<8|l[1])>>>0)
B.b.l(s,(l[2]<<8|l[3])>>>0)}if(p){if(s.length>7)d.$2("an address with a wildcard must have less than 7 parts",e)}else if(s.length!==8)d.$2("an address without a wildcard must contain exactly 8 parts",e)
k=new Uint8Array(16)
for(b=s.length,j=9-b,r=0,i=0;r<b;++r){h=s[r]
if(h===-1)for(g=0;g<j;++g){if(!(i>=0&&i<16))return A.c(k,i)
k[i]=0
f=i+1
if(!(f<16))return A.c(k,f)
k[f]=0
i+=2}else{f=B.e.ao(h,8)
if(!(i>=0&&i<16))return A.c(k,i)
k[i]=f
f=i+1
if(!(f<16))return A.c(k,f)
k[f]=h&255
i+=2}}return k},
lM(a,b,c,d,e,f,g){return new A.cF(a,b,c,d,e,f,g)},
jE(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
bF(a,b,c){throw A.b(A.S(c,a,b))},
lT(a,b){var s=A.jE(b)
if(a===s)return null
return a},
lR(a,b,c,d){var s,r,q,p,o,n
if(b===c)return""
s=a.length
if(!(b>=0&&b<s))return A.c(a,b)
if(a.charCodeAt(b)===91){r=c-1
if(!(r>=0&&r<s))return A.c(a,r)
if(a.charCodeAt(r)!==93)A.bF(a,b,"Missing end `]` to match `[` in host")
s=b+1
q=A.lO(a,s,r)
if(q<r){p=q+1
o=A.jJ(a,B.a.M(a,"25",p)?q+3:p,r,"%25")}else o=""
A.jn(a,s,q)
return B.a.n(a,b,q).toLowerCase()+o+"]"}for(n=b;n<c;++n){if(!(n<s))return A.c(a,n)
if(a.charCodeAt(n)===58){q=B.a.aI(a,"%",b)
q=q>=b&&q<c?q:c
if(q<c){p=q+1
o=A.jJ(a,B.a.M(a,"25",p)?q+3:p,c,"%25")}else o=""
A.jn(a,b,q)
return"["+B.a.n(a,b,q)+o+"]"}}return A.lY(a,b,c)},
lO(a,b,c){var s=B.a.aI(a,"%",b)
return s>=b&&s<c?s:c},
jJ(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=d!==""?new A.W(d):null
for(s=a.length,r=b,q=r,p=!0;r<c;){if(!(r>=0&&r<s))return A.c(a,r)
o=a.charCodeAt(r)
if(o===37){n=A.ip(a,r,!0)
m=n==null
if(m&&p){r+=3
continue}if(h==null)h=new A.W("")
l=h.a+=B.a.n(a,q,r)
if(m)n=B.a.n(a,r,r+3)
else if(n==="%")A.bF(a,r,"ZoneID should not contain % anymore")
h.a=l+n
r+=3
q=r
p=!0}else{if(o<127){m=o>>>4
if(!(m<8))return A.c(B.p,m)
m=(B.p[m]&1<<(o&15))!==0}else m=!1
if(m){if(p&&65<=o&&90>=o){if(h==null)h=new A.W("")
if(q<r){h.a+=B.a.n(a,q,r)
q=r}p=!1}++r}else{if((o&64512)===55296&&r+1<c){m=r+1
if(!(m<s))return A.c(a,m)
k=a.charCodeAt(m)
if((k&64512)===56320){o=(o&1023)<<10|k&1023|65536
j=2}else j=1}else j=1
i=B.a.n(a,q,r)
if(h==null){h=new A.W("")
m=h}else m=h
m.a+=i
l=A.io(o)
m.a+=l
r+=j
q=r}}}if(h==null)return B.a.n(a,b,c)
if(q<c){i=B.a.n(a,q,c)
h.a+=i}s=h.a
return s.charCodeAt(0)==0?s:s},
lY(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=a.length,r=b,q=r,p=null,o=!0;r<c;){if(!(r>=0&&r<s))return A.c(a,r)
n=a.charCodeAt(r)
if(n===37){m=A.ip(a,r,!0)
l=m==null
if(l&&o){r+=3
continue}if(p==null)p=new A.W("")
k=B.a.n(a,q,r)
if(!o)k=k.toLowerCase()
j=p.a+=k
if(l){m=B.a.n(a,r,r+3)
i=3}else if(m==="%"){m="%25"
i=1}else i=3
p.a=j+m
r+=i
q=r
o=!0}else{if(n<127){l=n>>>4
if(!(l<8))return A.c(B.z,l)
l=(B.z[l]&1<<(n&15))!==0}else l=!1
if(l){if(o&&65<=n&&90>=n){if(p==null)p=new A.W("")
if(q<r){p.a+=B.a.n(a,q,r)
q=r}o=!1}++r}else{if(n<=93){l=n>>>4
if(!(l<8))return A.c(B.o,l)
l=(B.o[l]&1<<(n&15))!==0}else l=!1
if(l)A.bF(a,r,"Invalid character")
else{if((n&64512)===55296&&r+1<c){l=r+1
if(!(l<s))return A.c(a,l)
h=a.charCodeAt(l)
if((h&64512)===56320){n=(n&1023)<<10|h&1023|65536
i=2}else i=1}else i=1
k=B.a.n(a,q,r)
if(!o)k=k.toLowerCase()
if(p==null){p=new A.W("")
l=p}else l=p
l.a+=k
j=A.io(n)
l.a+=j
r+=i
q=r}}}}if(p==null)return B.a.n(a,b,c)
if(q<c){k=B.a.n(a,q,c)
if(!o)k=k.toLowerCase()
p.a+=k}s=p.a
return s.charCodeAt(0)==0?s:s},
lV(a,b,c){var s,r,q,p,o
if(b===c)return""
s=a.length
if(!(b<s))return A.c(a,b)
if(!A.jG(a.charCodeAt(b)))A.bF(a,b,"Scheme not starting with alphabetic character")
for(r=b,q=!1;r<c;++r){if(!(r<s))return A.c(a,r)
p=a.charCodeAt(r)
if(p<128){o=p>>>4
if(!(o<8))return A.c(B.n,o)
o=(B.n[o]&1<<(p&15))!==0}else o=!1
if(!o)A.bF(a,r,"Illegal scheme character")
if(65<=p&&p<=90)q=!0}a=B.a.n(a,b,c)
return A.lN(q?a.toLowerCase():a)},
lN(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
lW(a,b,c){return A.cG(a,b,c,B.W,!1,!1)},
lS(a,b,c,d,e,f){var s=e==="file",r=s||f,q=A.cG(a,b,c,B.A,!0,!0)
if(q.length===0){if(s)return"/"}else if(r&&!B.a.P(q,"/"))q="/"+q
return A.lX(q,e,f)},
lX(a,b,c){var s=b.length===0
if(s&&!c&&!B.a.P(a,"/")&&!B.a.P(a,"\\"))return A.lZ(a,!s||c)
return A.m_(a)},
lU(a,b,c,d){return A.cG(a,b,c,B.m,!0,!1)},
lQ(a,b,c){return A.cG(a,b,c,B.m,!0,!1)},
ip(a,b,c){var s,r,q,p,o,n,m=b+2,l=a.length
if(m>=l)return"%"
s=b+1
if(!(s>=0&&s<l))return A.c(a,s)
r=a.charCodeAt(s)
if(!(m>=0))return A.c(a,m)
q=a.charCodeAt(m)
p=A.hV(r)
o=A.hV(q)
if(p<0||o<0)return"%"
n=p*16+o
if(n<127){m=B.e.ao(n,4)
if(!(m<8))return A.c(B.p,m)
m=(B.p[m]&1<<(n&15))!==0}else m=!1
if(m)return A.I(c&&65<=n&&90>=n?(n|32)>>>0:n)
if(r>=97||q>=97)return B.a.n(a,b,b+3).toUpperCase()
return null},
io(a){var s,r,q,p,o,n,m,l,k="0123456789ABCDEF"
if(a<128){s=new Uint8Array(3)
s[0]=37
r=a>>>4
if(!(r<16))return A.c(k,r)
s[1]=k.charCodeAt(r)
s[2]=k.charCodeAt(a&15)}else{if(a>2047)if(a>65535){q=240
p=4}else{q=224
p=3}else{q=192
p=2}r=3*p
s=new Uint8Array(r)
for(o=0;--p,p>=0;q=128){n=B.e.d3(a,6*p)&63|q
if(!(o<r))return A.c(s,o)
s[o]=37
m=o+1
l=n>>>4
if(!(l<16))return A.c(k,l)
if(!(m<r))return A.c(s,m)
s[m]=k.charCodeAt(l)
l=o+2
if(!(l<r))return A.c(s,l)
s[l]=k.charCodeAt(n&15)
o+=3}}return A.jg(s,0,null)},
cG(a,b,c,d,e,f){var s=A.jI(a,b,c,d,e,f)
return s==null?B.a.n(a,b,c):s},
jI(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i,h=null
for(s=!e,r=a.length,q=b,p=q,o=h;q<c;){if(!(q>=0&&q<r))return A.c(a,q)
n=a.charCodeAt(q)
if(n<127){m=n>>>4
if(!(m<8))return A.c(d,m)
m=(d[m]&1<<(n&15))!==0}else m=!1
if(m)++q
else{if(n===37){l=A.ip(a,q,!1)
if(l==null){q+=3
continue}if("%"===l){l="%25"
k=1}else k=3}else if(n===92&&f){l="/"
k=1}else{if(s)if(n<=93){m=n>>>4
if(!(m<8))return A.c(B.o,m)
m=(B.o[m]&1<<(n&15))!==0}else m=!1
else m=!1
if(m){A.bF(a,q,"Invalid character")
k=h
l=k}else{if((n&64512)===55296){m=q+1
if(m<c){if(!(m<r))return A.c(a,m)
j=a.charCodeAt(m)
if((j&64512)===56320){n=(n&1023)<<10|j&1023|65536
k=2}else k=1}else k=1}else k=1
l=A.io(n)}}if(o==null){o=new A.W("")
m=o}else m=o
i=m.a+=B.a.n(a,p,q)
m.a=i+A.d(l)
if(typeof k!=="number")return A.mT(k)
q+=k
p=q}}if(o==null)return h
if(p<c){s=B.a.n(a,p,c)
o.a+=s}s=o.a
return s.charCodeAt(0)==0?s:s},
jH(a){if(B.a.P(a,"."))return!0
return B.a.c7(a,"/.")!==-1},
m_(a){var s,r,q,p,o,n,m
if(!A.jH(a))return a
s=A.n([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(J.q(n,"..")){m=s.length
if(m!==0){if(0>=m)return A.c(s,-1)
s.pop()
if(s.length===0)B.b.l(s,"")}p=!0}else{p="."===n
if(!p)B.b.l(s,n)}}if(p)B.b.l(s,"")
return B.b.U(s,"/")},
lZ(a,b){var s,r,q,p,o,n
if(!A.jH(a))return!b?A.jF(a):a
s=A.n([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n){p=s.length!==0&&B.b.gaK(s)!==".."
if(p){if(0>=s.length)return A.c(s,-1)
s.pop()}else B.b.l(s,"..")}else{p="."===n
if(!p)B.b.l(s,n)}}r=s.length
if(r!==0)if(r===1){if(0>=r)return A.c(s,0)
r=s[0].length===0}else r=!1
else r=!0
if(r)return"./"
if(p||B.b.gaK(s)==="..")B.b.l(s,"")
if(!b){if(0>=s.length)return A.c(s,0)
B.b.m(s,0,A.jF(s[0]))}return B.b.U(s,"/")},
jF(a){var s,r,q,p=a.length
if(p>=2&&A.jG(a.charCodeAt(0)))for(s=1;s<p;++s){r=a.charCodeAt(s)
if(r===58)return B.a.n(a,0,s)+"%3A"+B.a.aT(a,s+1)
if(r<=127){q=r>>>4
if(!(q<8))return A.c(B.n,q)
q=(B.n[q]&1<<(r&15))===0}else q=!0
if(q)break}return a},
lP(a,b){var s,r,q,p,o
for(s=a.length,r=0,q=0;q<2;++q){p=b+q
if(!(p<s))return A.c(a,p)
o=a.charCodeAt(p)
if(48<=o&&o<=57)r=r*16+o-48
else{o|=32
if(97<=o&&o<=102)r=r*16+o-87
else throw A.b(A.aP("Invalid URL encoding",null))}}return r},
iq(a,b,c,d,e){var s,r,q,p,o=a.length,n=b
while(!0){if(!(n<c)){s=!0
break}if(!(n<o))return A.c(a,n)
r=a.charCodeAt(n)
if(r<=127)if(r!==37)q=r===43
else q=!0
else q=!0
if(q){s=!1
break}++n}if(s)if(B.x===d)return B.a.n(a,b,c)
else p=new A.cT(B.a.n(a,b,c))
else{p=A.n([],t.t)
for(n=b;n<c;++n){if(!(n<o))return A.c(a,n)
r=a.charCodeAt(n)
if(r>127)throw A.b(A.aP("Illegal percent encoding in URI",null))
if(r===37){if(n+3>o)throw A.b(A.aP("Truncated URI",null))
B.b.l(p,A.lP(a,n+1))
n+=2}else if(r===43)B.b.l(p,32)
else B.b.l(p,r)}}t.L.a(p)
return B.a4.dh(p)},
jG(a){var s=a|32
return 97<=s&&s<=122},
jl(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.n([b-1],t.t)
for(s=a.length,r=b,q=-1,p=null;r<s;++r){p=a.charCodeAt(r)
if(p===44||p===59)break
if(p===47){if(q<0){q=r
continue}throw A.b(A.S(k,a,r))}}if(q<0&&r>b)throw A.b(A.S(k,a,r))
for(;p!==44;){B.b.l(j,r);++r
for(o=-1;r<s;++r){if(!(r>=0))return A.c(a,r)
p=a.charCodeAt(r)
if(p===61){if(o<0)o=r}else if(p===59||p===44)break}if(o>=0)B.b.l(j,o)
else{n=B.b.gaK(j)
if(p!==44||r!==n+7||!B.a.M(a,"base64",n+1))throw A.b(A.S("Expecting '='",a,r))
break}}B.b.l(j,r)
m=r+1
if((j.length&1)===1)a=B.F.dD(a,m,s)
else{l=A.jI(a,m,s,B.m,!0,!1)
if(l!=null)a=B.a.ah(a,m,s,l)}return new A.h_(a,j,c)},
m8(){var s,r,q,p,o,n="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=",m=".",l=":",k="/",j="\\",i="?",h="#",g="/\\",f=A.n(new Array(22),t.gN)
for(s=0;s<22;++s)f[s]=new Uint8Array(96)
r=new A.hL(f)
q=new A.hM()
p=new A.hN()
o=r.$2(0,225)
q.$3(o,n,1)
q.$3(o,m,14)
q.$3(o,l,34)
q.$3(o,k,3)
q.$3(o,j,227)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(14,225)
q.$3(o,n,1)
q.$3(o,m,15)
q.$3(o,l,34)
q.$3(o,g,234)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(15,225)
q.$3(o,n,1)
q.$3(o,"%",225)
q.$3(o,l,34)
q.$3(o,k,9)
q.$3(o,j,233)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(1,225)
q.$3(o,n,1)
q.$3(o,l,34)
q.$3(o,k,10)
q.$3(o,j,234)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(2,235)
q.$3(o,n,139)
q.$3(o,k,131)
q.$3(o,j,131)
q.$3(o,m,146)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(3,235)
q.$3(o,n,11)
q.$3(o,k,68)
q.$3(o,j,68)
q.$3(o,m,18)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(4,229)
q.$3(o,n,5)
p.$3(o,"AZ",229)
q.$3(o,l,102)
q.$3(o,"@",68)
q.$3(o,"[",232)
q.$3(o,k,138)
q.$3(o,j,138)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(5,229)
q.$3(o,n,5)
p.$3(o,"AZ",229)
q.$3(o,l,102)
q.$3(o,"@",68)
q.$3(o,k,138)
q.$3(o,j,138)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(6,231)
p.$3(o,"19",7)
q.$3(o,"@",68)
q.$3(o,k,138)
q.$3(o,j,138)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(7,231)
p.$3(o,"09",7)
q.$3(o,"@",68)
q.$3(o,k,138)
q.$3(o,j,138)
q.$3(o,i,172)
q.$3(o,h,205)
q.$3(r.$2(8,8),"]",5)
o=r.$2(9,235)
q.$3(o,n,11)
q.$3(o,m,16)
q.$3(o,g,234)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(16,235)
q.$3(o,n,11)
q.$3(o,m,17)
q.$3(o,g,234)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(17,235)
q.$3(o,n,11)
q.$3(o,k,9)
q.$3(o,j,233)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(10,235)
q.$3(o,n,11)
q.$3(o,m,18)
q.$3(o,k,10)
q.$3(o,j,234)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(18,235)
q.$3(o,n,11)
q.$3(o,m,19)
q.$3(o,g,234)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(19,235)
q.$3(o,n,11)
q.$3(o,g,234)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(11,235)
q.$3(o,n,11)
q.$3(o,k,10)
q.$3(o,j,234)
q.$3(o,i,172)
q.$3(o,h,205)
o=r.$2(12,236)
q.$3(o,n,12)
q.$3(o,i,12)
q.$3(o,h,205)
o=r.$2(13,237)
q.$3(o,n,13)
q.$3(o,i,13)
p.$3(r.$2(20,245),"az",21)
o=r.$2(21,245)
p.$3(o,"az",21)
p.$3(o,"09",21)
q.$3(o,"+-.",21)
return f},
jX(a,b,c,d,e){var s,r,q,p,o,n=$.kx()
for(s=a.length,r=b;r<c;++r){if(!(d>=0&&d<n.length))return A.c(n,d)
q=n[d]
if(!(r<s))return A.c(a,r)
p=a.charCodeAt(r)^96
o=q[p>95?31:p]
d=o&31
B.b.m(e,o>>>5,r)}return d},
af:function af(a,b){this.a=a
this.b=b},
fw:function fw(){},
fx:function fx(){},
bS:function bS(a){this.a=a},
C:function C(){},
bN:function bN(a){this.a=a},
aB:function aB(){},
am:function am(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bt:function bt(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
d_:function d_(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
dl:function dl(a){this.a=a},
dj:function dj(a){this.a=a},
bv:function bv(a){this.a=a},
cU:function cU(a){this.a=a},
d9:function d9(){},
ch:function ch(){},
hb:function hb(a){this.a=a},
fB:function fB(a,b,c){this.a=a
this.b=b
this.c=c},
j:function j(){},
aA:function aA(a,b,c){this.a=a
this.b=b
this.$ti=c},
R:function R(){},
v:function v(){},
dN:function dN(){},
W:function W(a){this.a=a},
h3:function h3(a){this.a=a},
h0:function h0(a){this.a=a},
h1:function h1(a){this.a=a},
h2:function h2(a,b){this.a=a
this.b=b},
cF:function cF(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
h_:function h_(a,b,c){this.a=a
this.b=b
this.c=c},
hL:function hL(a){this.a=a},
hM:function hM(){},
hN:function hN(){},
dK:function dK(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=null},
dw:function dw(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
kR(a,b,c){var s,r=document.body
r.toString
s=t.ac
return t.h.a(new A.M(new A.a0(B.u.S(r,a,b,c)),s.h("E(D.E)").a(new A.fA()),s.h("M<D.E>")).gab(0))},
bU(a){var s,r,q="element tag unavailable"
try{s=a.tagName
s.toString
q=s}catch(r){}return q},
iX(a){var s=null
return A.iY(a,s,s,s,s,s).cj(new A.fC(),t.N)},
iY(a,b,c,d,e,f){var s,r,q=new A.P($.J,t.ao),p=new A.co(q,t.gD),o=new XMLHttpRequest()
o.toString
B.Q.dE(o,b==null?"GET":b,a,!0)
if(d!=null)d.q(0,new A.fD(o))
s=t.gx
r=t.x
A.w(o,"load",s.a(new A.fE(o,p)),!1,r)
A.w(o,"error",s.a(p.gdg()),!1,r)
if(e!=null)o.send(e)
else o.send()
return q},
w(a,b,c,d,e){var s=A.mF(new A.ha(c),t.B)
if(s!=null)J.kC(a,b,s,!1)
return new A.cr(a,b,s,!1,e.h("cr<0>"))},
js(a){var s=document.createElement("a")
s.toString
s=new A.dJ(s,t.d.a(window.location))
s=new A.ba(s)
s.cD(a)
return s},
lo(a,b,c,d){t.h.a(a)
A.l(b)
A.l(c)
t.cr.a(d)
return!0},
lp(a,b,c,d){var s,r,q,p,o
t.h.a(a)
A.l(b)
A.l(c)
s=t.cr.a(d).a
r=s.a
B.E.sdu(r,c)
q=r.hostname
s=s.b
if(q==s.hostname){p=r.port
o=s.port
o.toString
if(p===o){p=r.protocol
s=s.protocol
s.toString
s=p===s}else s=!1}else s=!1
if(!s)if(q==="")if(r.port===""){s=r.protocol
s=s===":"||s===""}else s=!1
else s=!1
else s=!0
return s},
jy(){var s=t.N,r=A.j5(B.B,s),q=A.n(["TEMPLATE"],t.s),p=t.dG.a(new A.hy())
s=new A.dP(r,A.c6(s),A.c6(s),A.c6(s),null)
s.cE(null,new A.a_(B.B,p,t.e),q,null)
return s},
jO(a){var s,r="postMessage" in a
r.toString
if(r){s=A.lm(a)
return s}else return t.ch.a(a)},
lm(a){var s=window
s.toString
if(a===s)return t.ci.a(a)
else return new A.dv()},
mF(a,b){var s=$.J
if(s===B.h)return a
return s.bX(a,b)},
f:function f(){},
bh:function bh(){},
cN:function cN(){},
bi:function bi(){},
aR:function aR(){},
bk:function bk(){},
an:function an(){},
bl:function bl(){},
fj:function fj(){},
aT:function aT(){},
fy:function fy(){},
cX:function cX(){},
fz:function fz(){},
bD:function bD(a,b){this.a=a
this.$ti=b},
y:function y(){},
fA:function fA(){},
e:function e(){},
A:function A(){},
cZ:function cZ(){},
bX:function bX(){},
ag:function ag(){},
fC:function fC(){},
fD:function fD(a){this.a=a},
fE:function fE(a,b){this.a=a
this.b=b},
bY:function bY(){},
aW:function aW(){},
c7:function c7(){},
a3:function a3(){},
a0:function a0(a){this.a=a},
m:function m(){},
cc:function cc(){},
ai:function ai(){},
b4:function b4(){},
ci:function ci(){},
fV:function fV(a){this.a=a},
cl:function cl(){},
dg:function dg(){},
dh:function dh(){},
bw:function bw(){},
b5:function b5(){},
ak:function ak(){},
cn:function cn(){},
bC:function bC(){},
ct:function ct(){},
ds:function ds(){},
dx:function dx(a){this.a=a},
dy:function dy(a){this.a=a},
ia:function ia(a,b){this.a=a
this.$ti=b},
cq:function cq(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
b8:function b8(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
cr:function cr(a,b,c,d,e){var _=this
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
ha:function ha(a){this.a=a},
ba:function ba(a){this.a=a},
ap:function ap(){},
cd:function cd(a){this.a=a},
fQ:function fQ(a){this.a=a},
fP:function fP(a,b,c){this.a=a
this.b=b
this.c=c},
cx:function cx(){},
hw:function hw(){},
hx:function hx(){},
dP:function dP(a,b,c,d,e){var _=this
_.e=a
_.a=b
_.b=c
_.c=d
_.d=e},
hy:function hy(){},
dO:function dO(){},
aU:function aU(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.d=null
_.$ti=c},
dv:function dv(){},
dJ:function dJ(a,b){this.a=a
this.b=b},
cH:function cH(a){this.a=a
this.b=0},
hH:function hH(a){this.a=a},
dt:function dt(){},
dG:function dG(){},
dH:function dH(){},
dL:function dL(){},
dR:function dR(){},
dS:function dS(){},
i7(){var s=window.navigator.userAgent
s.toString
return s},
cW:function cW(){},
fi:function fi(a){this.a=a},
ho:function ho(){},
bu:function bu(){},
cP:function cP(a){this.a=a},
h:function h(){},
n0(){var s=document
s.toString
B.y.d7(s,"DOMContentLoaded",new A.i_())},
i_:function i_(){},
e4:function e4(){var _=this
_.a=null
_.b="view-dashboard"
_.d=_.c=null
_.CW=_.ay=_.ax=_.at=_.as=_.Q=_.z=_.y=_.x=_.w=_.r=_.f=_.e=$
_.cy=_.cx=null},
eD:function eD(){},
eB:function eB(a){this.a=a},
eC:function eC(a){this.a=a},
eb:function eb(a,b){this.a=a
this.b=b},
ea:function ea(){},
ec:function ec(a,b){this.a=a
this.b=b},
ed:function ed(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
en:function en(a,b,c){this.a=a
this.b=b
this.c=c},
eo:function eo(a,b){this.a=a
this.b=b},
ep:function ep(a){this.a=a},
e9:function e9(a,b){this.a=a
this.b=b},
eq:function eq(a){this.a=a},
er:function er(a){this.a=a},
es:function es(a){this.a=a},
et:function et(a){this.a=a},
eu:function eu(a,b){this.a=a
this.b=b},
ee:function ee(a,b){this.a=a
this.b=b},
ef:function ef(a){this.a=a},
eg:function eg(a,b,c){this.a=a
this.b=b
this.c=c},
eh:function eh(a,b,c){this.a=a
this.b=b
this.c=c},
ei:function ei(a,b,c){this.a=a
this.b=b
this.c=c},
ej:function ej(a){this.a=a},
ek:function ek(a){this.a=a},
el:function el(a){this.a=a},
em:function em(a){this.a=a},
ev:function ev(){},
f8:function f8(){},
fe:function fe(a){this.a=a},
ff:function ff(a){this.a=a},
eO:function eO(){},
eP:function eP(a,b){this.a=a
this.b=b},
eN:function eN(a,b){this.a=a
this.b=b},
eQ:function eQ(a,b){this.a=a
this.b=b},
eM:function eM(a){this.a=a},
eR:function eR(a,b){this.a=a
this.b=b},
eK:function eK(a){this.a=a},
eL:function eL(a,b){this.a=a
this.b=b},
eS:function eS(a,b,c){this.a=a
this.b=b
this.c=c},
eH:function eH(a){this.a=a},
eI:function eI(a){this.a=a},
eJ:function eJ(a,b){this.a=a
this.b=b},
eT:function eT(a,b,c){this.a=a
this.b=b
this.c=c},
eF:function eF(a){this.a=a},
eG:function eG(){},
eV:function eV(a,b,c){this.a=a
this.b=b
this.c=c},
eW:function eW(a,b){this.a=a
this.b=b},
eU:function eU(a,b){this.a=a
this.b=b},
f3:function f3(){},
f4:function f4(a,b,c){this.a=a
this.b=b
this.c=c},
f5:function f5(){},
f6:function f6(){},
f7:function f7(a,b){this.a=a
this.b=b},
eX:function eX(a){this.a=a},
eY:function eY(a,b){this.a=a
this.b=b},
eZ:function eZ(){},
f_:function f_(a){this.a=a},
f0:function f0(a){this.a=a},
ew:function ew(a){this.a=a},
ex:function ex(a){this.a=a},
ey:function ey(a){this.a=a},
ez:function ez(a,b){this.a=a
this.b=b},
eA:function eA(a){this.a=a},
fa:function fa(a){this.a=a},
fb:function fb(a,b,c){this.a=a
this.b=b
this.c=c},
f9:function f9(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eE:function eE(a,b){this.a=a
this.b=b},
fd:function fd(a){this.a=a},
fc:function fc(){},
f1:function f1(){},
f2:function f2(a,b){this.a=a
this.b=b},
e5:function e5(a,b,c){this.a=a
this.b=b
this.c=c},
e6:function e6(a){this.a=a},
e7:function e7(a){this.a=a},
e8:function e8(a,b,c){this.a=a
this.b=b
this.c=c},
fk:function fk(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=_.r=!1},
fq:function fq(a){this.a=a},
fl:function fl(){},
fo:function fo(a){this.a=a},
ft:function ft(a){this.a=a},
fs:function fs(a){this.a=a},
fu:function fu(a){this.a=a},
fv:function fv(a,b){this.a=a
this.b=b},
fm:function fm(a){this.a=a},
fn:function fn(){},
fp:function fp(a,b){this.a=a
this.b=b},
fr:function fr(a,b){this.a=a
this.b=b},
i1(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
n9(a){A.iB(new A.bp("Field '"+a+"' has been assigned during initialization."),new Error())},
a2(){A.iB(new A.bp("Field '' has not been initialized."),new Error())},
iC(){A.iB(new A.bp("Field '' has been assigned during initialization."),new Error())}},B={}
var w=[A,J,B]
var $={}
A.ic.prototype={}
J.c_.prototype={
a0(a,b){return a===b},
gG(a){return A.db(a)},
j(a){return"Instance of '"+A.fT(a)+"'"},
ga_(a){return A.bd(A.is(this))}}
J.d1.prototype={
j(a){return String(a)},
gG(a){return a?519018:218159},
ga_(a){return A.bd(t.y)},
$ia9:1,
$iE:1}
J.c1.prototype={
a0(a,b){return null==b},
j(a){return"null"},
gG(a){return 0},
$ia9:1,
$iR:1}
J.a6.prototype={}
J.aY.prototype={
gG(a){return 0},
j(a){return String(a)}}
J.da.prototype={}
J.by.prototype={}
J.aw.prototype={
j(a){var s=a[$.kc()]
if(s==null)return this.cA(a)
return"JavaScript function for "+J.L(s)},
$iaV:1}
J.bn.prototype={
gG(a){return 0},
j(a){return String(a)}}
J.bo.prototype={
gG(a){return 0},
j(a){return String(a)}}
J.N.prototype={
l(a,b){A.K(a).c.a(b)
if(!!a.fixed$length)A.as(A.X("add"))
a.push(b)},
bf(a,b,c){var s
A.K(a).c.a(c)
if(!!a.fixed$length)A.as(A.X("insert"))
s=a.length
if(b>s)throw A.b(A.ja(b,null))
a.splice(b,0,c)},
v(a,b){var s
if(!!a.fixed$length)A.as(A.X("remove"))
for(s=0;s<a.length;++s)if(J.q(a[s],b)){a.splice(s,1)
return!0}return!1},
de(a){if(!!a.fixed$length)A.as(A.X("clear"))
a.length=0},
q(a,b){var s,r
A.K(a).h("~(1)").a(b)
s=a.length
for(r=0;r<s;++r){b.$1(a[r])
if(a.length!==s)throw A.b(A.V(a))}},
ar(a,b,c){var s=A.K(a)
return new A.a_(a,s.A(c).h("1(2)").a(b),s.h("@<1>").A(c).h("a_<1,2>"))},
U(a,b){var s,r=A.fM(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.m(r,s,A.d(a[s]))
return r.join(b)},
dF(a,b){var s,r,q
A.K(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.b(A.d0())
if(0>=s)return A.c(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.b(A.V(a))}return r},
ds(a,b,c,d){var s,r,q
d.a(b)
A.K(a).A(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.b(A.V(a))}return r},
c1(a,b,c){var s,r,q,p=A.K(a)
p.h("E(1)").a(b)
p.h("1()?").a(c)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(A.e_(b.$1(q)))return q
if(a.length!==s)throw A.b(A.V(a))}if(c!=null)return c.$0()
throw A.b(A.d0())},
c0(a,b){return this.c1(a,b,null)},
L(a,b){if(!(b>=0&&b<a.length))return A.c(a,b)
return a[b]},
gc_(a){if(a.length>0)return a[0]
throw A.b(A.d0())},
gaK(a){var s=a.length
if(s>0)return a[s-1]
throw A.b(A.d0())},
ap(a,b){var s,r
A.K(a).h("E(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(A.e_(b.$1(a[r])))return!0
if(a.length!==s)throw A.b(A.V(a))}return!1},
cv(a,b){var s,r,q,p,o,n=A.K(a)
n.h("i(1,1)?").a(b)
if(!!a.immutable$list)A.as(A.X("sort"))
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.dT()
if(n>0){a[0]=q
a[1]=r}return}if(n.c.b(null)){for(p=0,o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}}else p=0
a.sort(A.bL(b,2))
if(p>0)this.d_(a,p)},
d_(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
B(a,b){var s
for(s=0;s<a.length;++s)if(J.q(a[s],b))return!0
return!1},
gH(a){return a.length===0},
gO(a){return a.length!==0},
j(a){return A.ib(a,"[","]")},
gI(a){return new J.aQ(a,a.length,A.K(a).h("aQ<1>"))},
gG(a){return A.db(a)},
gk(a){return a.length},
i(a,b){if(!(b>=0&&b<a.length))throw A.b(A.hR(a,b))
return a[b]},
m(a,b,c){var s
A.K(a).c.a(c)
if(!!a.immutable$list)A.as(A.X("indexed set"))
s=a.length
if(b>=s)throw A.b(A.hR(a,b))
a[b]=c},
dv(a,b){var s
A.K(a).h("E(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(A.e_(b.$1(a[s])))return s
return-1},
$ir:1,
$ij:1,
$iH:1}
J.fF.prototype={}
J.aQ.prototype={
gE(){var s=this.d
return s==null?this.$ti.c.a(s):s},
u(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.i2(q)
throw A.b(q)}s=r.c
if(s>=p){r.sbH(null)
return!1}r.sbH(q[s]);++r.c
return!0},
sbH(a){this.d=this.$ti.h("1?").a(a)},
$iad:1}
J.c2.prototype={
aF(a,b){var s
A.u(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaJ(b)
if(this.gaJ(a)===s)return 0
if(this.gaJ(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaJ(a){return a===0?1/a<0:a<0},
dK(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.b(A.X(""+a+".round()"))},
aE(a,b,c){if(B.e.aF(b,c)>0)throw A.b(A.iw(b))
if(this.aF(a,b)<0)return b
if(this.aF(a,c)>0)return c
return a},
p(a,b){var s
if(b>20)throw A.b(A.aj(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaJ(a))return"-"+s
return s},
j(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gG(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
aa(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
cC(a,b){if((a|0)===a)if(b>=1)return a/b|0
return this.bQ(a,b)},
a6(a,b){return(a|0)===a?a/b|0:this.bQ(a,b)},
bQ(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.b(A.X("Result of truncating division is "+A.d(s)+": "+A.d(a)+" ~/ "+b))},
ao(a,b){var s
if(a>0)s=this.bP(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
d3(a,b){if(0>b)throw A.b(A.iw(b))
return this.bP(a,b)},
bP(a,b){return b>31?0:a>>>b},
ga_(a){return A.bd(t.o)},
$ibM:1,
$iZ:1}
J.c0.prototype={
ga_(a){return A.bd(t.S)},
$ia9:1,
$ii:1}
J.d2.prototype={
ga_(a){return A.bd(t.i)},
$ia9:1}
J.aX.prototype={
cq(a,b){return a+b},
ah(a,b,c,d){var s=A.dc(b,c,a.length)
return a.substring(0,b)+d+a.substring(s)},
M(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.aj(c,0,a.length,null,null))
s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)},
P(a,b){return this.M(a,b,0)},
n(a,b,c){A.m3(c)
return a.substring(b,A.dc(b,c,a.length))},
aT(a,b){return this.n(a,b,null)},
dP(a){return a.toLowerCase()},
K(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.c(p,0)
if(p.charCodeAt(0)===133){s=J.kY(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.c(p,r)
q=p.charCodeAt(r)===133?J.kZ(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
aR(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.b(B.M)
for(s=a,r="";!0;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
Z(a,b,c){var s=b-a.length
if(s<=0)return a
return this.aR(c,s)+a},
aI(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.aj(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
c7(a,b){return this.aI(a,b,0)},
aH(a,b,c){var s=a.length
if(c>s)throw A.b(A.aj(c,0,s,null,null))
return A.n8(a,b,c)},
B(a,b){return this.aH(a,b,0)},
j(a){return a},
gG(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
ga_(a){return A.bd(t.N)},
gk(a){return a.length},
$ia9:1,
$ifS:1,
$ia:1}
A.bp.prototype={
j(a){return"LateInitializationError: "+this.a}}
A.cT.prototype={
gk(a){return this.a.length},
i(a,b){var s=this.a
if(!(b>=0&&b<s.length))return A.c(s,b)
return s.charCodeAt(b)}}
A.r.prototype={}
A.T.prototype={
gI(a){var s=this
return new A.aZ(s,s.gk(s),A.x(s).h("aZ<T.E>"))},
gH(a){return this.gk(this)===0},
B(a,b){var s,r=this,q=r.gk(r)
for(s=0;s<q;++s){if(J.q(r.L(0,s),b))return!0
if(q!==r.gk(r))throw A.b(A.V(r))}return!1},
U(a,b){var s,r,q,p=this,o=p.gk(p)
if(b.length!==0){if(o===0)return""
s=A.d(p.L(0,0))
if(o!==p.gk(p))throw A.b(A.V(p))
for(r=s,q=1;q<o;++q){r=r+b+A.d(p.L(0,q))
if(o!==p.gk(p))throw A.b(A.V(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.d(p.L(0,q))
if(o!==p.gk(p))throw A.b(A.V(p))}return r.charCodeAt(0)==0?r:r}},
aO(a,b){return this.cz(0,A.x(this).h("E(T.E)").a(b))},
ar(a,b,c){var s=A.x(this)
return new A.a_(this,s.A(c).h("1(T.E)").a(b),s.h("@<T.E>").A(c).h("a_<1,2>"))},
au(a,b){return A.b0(this,!0,A.x(this).h("T.E"))},
aM(a){return this.au(0,!0)}}
A.ck.prototype={
gcS(){var s=J.U(this.a),r=this.c
if(r==null||r>s)return s
return r},
gd4(){var s=J.U(this.a),r=this.b
if(r>s)return s
return r},
gk(a){var s,r=J.U(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
if(typeof s!=="number")return s.dU()
return s-q},
L(a,b){var s=this,r=s.gd4()+b
if(b<0||r>=s.gcS())throw A.b(A.bZ(b,s.gk(0),s,null,"index"))
return J.iG(s.a,r)},
au(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.t(n),l=m.gk(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.j_(0,n):J.iZ(0,n)}r=A.fM(s,m.L(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.b.m(r,q,m.L(n,o+q))
if(m.gk(n)<l)throw A.b(A.V(p))}return r},
aM(a){return this.au(0,!0)}}
A.aZ.prototype={
gE(){var s=this.d
return s==null?this.$ti.c.a(s):s},
u(){var s,r=this,q=r.a,p=J.t(q),o=p.gk(q)
if(r.b!==o)throw A.b(A.V(q))
s=r.c
if(s>=o){r.sak(null)
return!1}r.sak(p.L(q,s));++r.c
return!0},
sak(a){this.d=this.$ti.h("1?").a(a)},
$iad:1}
A.b1.prototype={
gI(a){var s=A.x(this)
return new A.c9(J.bg(this.a),this.b,s.h("@<1>").A(s.y[1]).h("c9<1,2>"))},
gk(a){return J.U(this.a)},
gH(a){return J.e3(this.a)}}
A.bT.prototype={$ir:1}
A.c9.prototype={
u(){var s=this,r=s.b
if(r.u()){s.sak(s.c.$1(r.gE()))
return!0}s.sak(null)
return!1},
gE(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
sak(a){this.a=this.$ti.h("2?").a(a)},
$iad:1}
A.a_.prototype={
gk(a){return J.U(this.a)},
L(a,b){return this.b.$1(J.iG(this.a,b))}}
A.M.prototype={
gI(a){return new A.cm(J.bg(this.a),this.b,this.$ti.h("cm<1>"))}}
A.cm.prototype={
u(){var s,r
for(s=this.a,r=this.b;s.u();)if(A.e_(r.$1(s.gE())))return!0
return!1},
gE(){return this.a.gE()},
$iad:1}
A.bm.prototype={}
A.b7.prototype={
m(a,b,c){A.x(this).h("b7.E").a(c)
throw A.b(A.X("Cannot modify an unmodifiable list"))}}
A.bz.prototype={}
A.dF.prototype={
gk(a){return J.U(this.a)},
L(a,b){var s=J.U(this.a)
if(0>b||b>=s)A.as(A.bZ(b,s,this,null,"index"))
return b}}
A.b_.prototype={
i(a,b){return this.N(0,b)?J.k(this.a,A.bc(b)):null},
gk(a){return J.U(this.a)},
gJ(a){return new A.dF(this.a)},
gH(a){return J.e3(this.a)},
gO(a){return J.i4(this.a)},
N(a,b){return A.iv(b)&&b>=0&&b<J.U(this.a)},
q(a,b){var s,r,q,p
this.$ti.h("~(i,1)").a(b)
s=this.a
r=J.t(s)
q=r.gk(s)
for(p=0;p<q;++p){b.$2(p,r.i(s,p))
if(q!==r.gk(s))throw A.b(A.V(s))}}}
A.bP.prototype={
gH(a){return this.gk(this)===0},
gO(a){return this.gk(this)!==0},
j(a){return A.ie(this)},
m(a,b,c){var s=A.x(this)
s.c.a(b)
s.y[1].a(c)
A.kP()},
$ip:1}
A.bQ.prototype={
gk(a){return this.b.length},
gcV(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
N(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
i(a,b){if(!this.N(0,b))return null
return this.b[this.a[b]]},
q(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gcV()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])}}
A.fY.prototype={
V(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.ce.prototype={
j(a){return"Null check operator used on a null value"}}
A.d4.prototype={
j(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.dk.prototype={
j(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.fR.prototype={
j(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.bW.prototype={}
A.cy.prototype={
j(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iar:1}
A.aH.prototype={
j(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.k9(r==null?"unknown":r)+"'"},
$iaV:1,
gdS(){return this},
$C:"$1",
$R:1,
$D:null}
A.cR.prototype={$C:"$0",$R:0}
A.cS.prototype={$C:"$2",$R:2}
A.di.prototype={}
A.df.prototype={
j(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.k9(s)+"'"}}
A.bj.prototype={
a0(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.bj))return!1
return this.$_target===b.$_target&&this.a===b.a},
gG(a){return(A.n2(this.a)^A.db(this.$_target))>>>0},
j(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.fT(this.a)+"'")}}
A.du.prototype={
j(a){return"Reading static variable '"+this.a+"' during its initialization"}}
A.dd.prototype={
j(a){return"RuntimeError: "+this.a}}
A.dp.prototype={
j(a){return"Assertion failed: "+A.bV(this.a)}}
A.ay.prototype={
gk(a){return this.a},
gH(a){return this.a===0},
gO(a){return this.a!==0},
gJ(a){return new A.az(this,A.x(this).h("az<1>"))},
gbs(a){var s=A.x(this)
return A.j6(new A.az(this,s.h("az<1>")),new A.fH(this),s.c,s.y[1])},
N(a,b){var s=this.b
if(s==null)return!1
return s[b]!=null},
R(a,b){J.e1(A.x(this).h("p<1,2>").a(b),new A.fG(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.dz(b)},
dz(a){var s,r,q=this.d
if(q==null)return null
s=q[this.c8(a)]
r=this.c9(s,a)
if(r<0)return null
return s[r].b},
m(a,b,c){var s,r,q=this,p=A.x(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bz(s==null?q.b=q.b8():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bz(r==null?q.c=q.b8():r,b,c)}else q.dA(b,c)},
dA(a,b){var s,r,q,p,o=this,n=A.x(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.b8()
r=o.c8(a)
q=s[r]
if(q==null)s[r]=[o.aV(a,b)]
else{p=o.c9(q,a)
if(p>=0)q[p].b=b
else q.push(o.aV(a,b))}},
q(a,b){var s,r,q=this
A.x(q).h("~(1,2)").a(b)
s=q.e
r=q.r
for(;s!=null;){b.$2(s.a,s.b)
if(r!==q.r)throw A.b(A.V(q))
s=s.c}},
bz(a,b,c){var s,r=A.x(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.aV(b,c)
else s.b=c},
cJ(){this.r=this.r+1&1073741823},
aV(a,b){var s=this,r=A.x(s),q=new A.fK(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.cJ()
return q},
c8(a){return J.e2(a)&1073741823},
c9(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.q(a[r].a,b))return r
return-1},
j(a){return A.ie(this)},
b8(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ij3:1}
A.fH.prototype={
$1(a){var s=this.a,r=A.x(s)
s=s.i(0,r.c.a(a))
return s==null?r.y[1].a(s):s},
$S(){return A.x(this.a).h("2(1)")}}
A.fG.prototype={
$2(a,b){var s=this.a,r=A.x(s)
s.m(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.x(this.a).h("~(1,2)")}}
A.fK.prototype={}
A.az.prototype={
gk(a){return this.a.a},
gH(a){return this.a.a===0},
gI(a){var s=this.a,r=new A.c4(s,s.r,this.$ti.h("c4<1>"))
r.c=s.e
return r},
B(a,b){return this.a.N(0,b)}}
A.c4.prototype={
gE(){return this.d},
u(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.V(q))
s=r.c
if(s==null){r.sbA(null)
return!1}else{r.sbA(s.a)
r.c=s.c
return!0}},
sbA(a){this.d=this.$ti.h("1?").a(a)},
$iad:1}
A.hW.prototype={
$1(a){return this.a(a)},
$S:12}
A.hX.prototype={
$2(a,b){return this.a(a,b)},
$S:37}
A.hY.prototype={
$1(a){return this.a(A.l(a))},
$S:36}
A.d3.prototype={
j(a){return"RegExp/"+this.a+"/"+this.b.flags},
dr(a){var s=this.b.exec(a)
if(s==null)return null
return new A.ht(s)},
$ifS:1,
$il9:1}
A.ht.prototype={}
A.d8.prototype={}
A.br.prototype={
gk(a){return a.length},
$iax:1}
A.ca.prototype={
m(a,b,c){A.bc(c)
A.ir(b,a,a.length)
a[b]=c},
$ir:1,
$ij:1,
$iH:1}
A.d7.prototype={
ga_(a){return B.a2},
i(a,b){A.ir(b,a,a.length)
return a[b]},
$ia9:1}
A.cb.prototype={
ga_(a){return B.a3},
gk(a){return a.length},
i(a,b){A.ir(b,a,a.length)
return a[b]},
$ia9:1,
$ib6:1}
A.cu.prototype={}
A.cv.prototype={}
A.ae.prototype={
h(a){return A.hC(v.typeUniverse,this,a)},
A(a){return A.lJ(v.typeUniverse,this,a)}}
A.dA.prototype={}
A.hB.prototype={
j(a){return A.Y(this.a,null)}}
A.dz.prototype={
j(a){return this.a}}
A.cA.prototype={$iaB:1}
A.h7.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:8}
A.h6.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:35}
A.h8.prototype={
$0(){this.a.$0()},
$S:7}
A.h9.prototype={
$0(){this.a.$0()},
$S:7}
A.cz.prototype={
cF(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(A.bL(new A.hA(this,b),0),a)
else throw A.b(A.X("`setTimeout()` not found."))},
cG(a,b){if(self.setTimeout!=null)this.b=self.setInterval(A.bL(new A.hz(this,a,Date.now(),b),0),a)
else throw A.b(A.X("Periodic timer."))},
dd(){if(self.setTimeout!=null){var s=this.b
if(s==null)return
if(this.a)self.clearTimeout(s)
else self.clearInterval(s)
this.b=null}else throw A.b(A.X("Canceling a timer."))},
$ibx:1}
A.hA.prototype={
$0(){var s=this.a
s.b=null
s.c=1
this.b.$0()},
$S:2}
A.hz.prototype={
$0(){var s,r=this,q=r.a,p=q.c+1,o=r.b
if(o>0){s=Date.now()-r.c
if(s>(p+1)*o)p=B.e.cC(s,o)}q.c=p
r.d.$1(q)},
$S:7}
A.dq.prototype={
bd(a,b){var s,r=this,q=r.$ti
q.h("1/?").a(b)
if(b==null)b=q.c.a(b)
if(!r.b)r.a.bC(b)
else{s=r.a
if(q.h("ao<1>").b(b))s.bF(b)
else s.b0(b)}},
aG(a,b){var s=this.a
if(this.b)s.al(a,b)
else s.bD(a,b)}}
A.hI.prototype={
$1(a){return this.a.$2(0,a)},
$S:38}
A.hJ.prototype={
$2(a,b){this.a.$2(1,new A.bW(a,t.l.a(b)))},
$S:22}
A.hQ.prototype={
$2(a,b){this.a(A.bc(a),b)},
$S:25}
A.bO.prototype={
j(a){return A.d(this.a)},
$iC:1,
gaz(){return this.b}}
A.cp.prototype={
aG(a,b){var s
A.bK(a,"error",t.K)
s=this.a
if((s.a&30)!==0)throw A.b(A.de("Future already completed"))
if(b==null)b=A.iK(a)
s.bD(a,b)},
bZ(a){return this.aG(a,null)}}
A.co.prototype={
bd(a,b){var s,r=this.$ti
r.h("1/?").a(b)
s=this.a
if((s.a&30)!==0)throw A.b(A.de("Future already completed"))
s.bC(r.h("1/").a(b))}}
A.b9.prototype={
dB(a){if((this.c&15)!==6)return!0
return this.b.b.bm(t.al.a(this.d),a.a,t.y,t.K)},
dt(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.Q.b(q))p=l.dM(q,m,a.b,o,n,t.l)
else p=l.bm(t.v.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.a5(s))){if((r.c&1)!==0)throw A.b(A.aP("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.b(A.aP("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.P.prototype={
bN(a){this.a=this.a&1|4
this.c=a},
bn(a,b,c){var s,r,q,p=this.$ti
p.A(c).h("1/(2)").a(a)
s=$.J
if(s===B.h){if(b!=null&&!t.Q.b(b)&&!t.v.b(b))throw A.b(A.i5(b,"onError",u.c))}else{c.h("@<0/>").A(p.c).h("1(2)").a(a)
if(b!=null)b=A.mw(b,s)}r=new A.P(s,c.h("P<0>"))
q=b==null?1:3
this.aW(new A.b9(r,q,a,b,p.h("@<1>").A(c).h("b9<1,2>")))
return r},
cj(a,b){return this.bn(a,null,b)},
bS(a,b,c){var s,r=this.$ti
r.A(c).h("1/(2)").a(a)
s=new A.P($.J,c.h("P<0>"))
this.aW(new A.b9(s,19,a,b,r.h("@<1>").A(c).h("b9<1,2>")))
return s},
d2(a){this.a=this.a&1|16
this.c=a},
aA(a){this.a=a.a&30|this.a&1
this.c=a.c},
aW(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t.c.a(r.c)
if((s.a&24)===0){s.aW(a)
return}r.aA(s)}A.bH(null,null,r.b,t.M.a(new A.hc(r,a)))}},
ba(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t.c.a(m.c)
if((n.a&24)===0){n.ba(a)
return}m.aA(n)}l.a=m.aC(a)
A.bH(null,null,m.b,t.M.a(new A.hj(l,m)))}},
aB(){var s=t.F.a(this.c)
this.c=null
return this.aC(s)},
aC(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
cN(a){var s,r,q,p=this
p.a^=2
try{a.bn(new A.hg(p),new A.hh(p),t.a)}catch(q){s=A.a5(q)
r=A.aM(q)
A.n4(new A.hi(p,s,r))}},
b0(a){var s,r=this
r.$ti.c.a(a)
s=r.aB()
r.a=8
r.c=a
A.bE(r,s)},
al(a,b){var s
t.l.a(b)
s=this.aB()
this.d2(A.fg(a,b))
A.bE(this,s)},
bC(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("ao<1>").b(a)){this.bF(a)
return}this.cM(a)},
cM(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.bH(null,null,s.b,t.M.a(new A.he(s,a)))},
bF(a){var s=this.$ti
s.h("ao<1>").a(a)
if(s.b(a)){A.ln(a,this)
return}this.cN(a)},
bD(a,b){this.a^=2
A.bH(null,null,this.b,t.M.a(new A.hd(this,a,b)))},
$iao:1}
A.hc.prototype={
$0(){A.bE(this.a,this.b)},
$S:2}
A.hj.prototype={
$0(){A.bE(this.b,this.a.a)},
$S:2}
A.hg.prototype={
$1(a){var s,r,q,p=this.a
p.a^=2
try{p.b0(p.$ti.c.a(a))}catch(q){s=A.a5(q)
r=A.aM(q)
p.al(s,r)}},
$S:8}
A.hh.prototype={
$2(a,b){this.a.al(t.K.a(a),t.l.a(b))},
$S:28}
A.hi.prototype={
$0(){this.a.al(this.b,this.c)},
$S:2}
A.hf.prototype={
$0(){A.jr(this.a.a,this.b)},
$S:2}
A.he.prototype={
$0(){this.a.b0(this.b)},
$S:2}
A.hd.prototype={
$0(){this.a.al(this.b,this.c)},
$S:2}
A.hm.prototype={
$0(){var s,r,q,p,o,n,m=this,l=null
try{q=m.a.a
l=q.b.b.dL(t.fO.a(q.d),t.z)}catch(p){s=A.a5(p)
r=A.aM(p)
q=m.c&&t.n.a(m.b.a.c).a===s
o=m.a
if(q)o.c=t.n.a(m.b.a.c)
else o.c=A.fg(s,r)
o.b=!0
return}if(l instanceof A.P&&(l.a&24)!==0){if((l.a&16)!==0){q=m.a
q.c=t.n.a(l.c)
q.b=!0}return}if(l instanceof A.P){n=m.b.a
q=m.a
q.c=l.cj(new A.hn(n),t.z)
q.b=!1}},
$S:2}
A.hn.prototype={
$1(a){return this.a},
$S:29}
A.hl.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bm(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.a5(l)
r=A.aM(l)
q=this.a
q.c=A.fg(s,r)
q.b=!0}},
$S:2}
A.hk.prototype={
$0(){var s,r,q,p,o,n,m=this
try{s=t.n.a(m.a.a.c)
p=m.b
if(p.a.dB(s)&&p.a.e!=null){p.c=p.a.dt(s)
p.b=!1}}catch(o){r=A.a5(o)
q=A.aM(o)
p=t.n.a(m.a.a.c)
n=m.b
if(p.a===r)n.c=p
else n.c=A.fg(r,q)
n.b=!0}},
$S:2}
A.dr.prototype={}
A.cj.prototype={
gk(a){var s,r,q=this,p={},o=new A.P($.J,t.fJ)
p.a=0
s=A.x(q)
r=s.h("~(1)?").a(new A.fW(p,q))
t.g5.a(new A.fX(p,o))
A.w(q.a,q.b,r,!1,s.c)
return o}}
A.fW.prototype={
$1(a){A.x(this.b).c.a(a);++this.a.a},
$S(){return A.x(this.b).h("~(1)")}}
A.fX.prototype={
$0(){var s=this.b,r=s.$ti,q=r.h("1/").a(this.a.a),p=s.aB()
r.c.a(q)
s.a=8
s.c=q
A.bE(s,p)},
$S:2}
A.dM.prototype={}
A.cI.prototype={$ijp:1}
A.hP.prototype={
$0(){A.kT(this.a,this.b)},
$S:2}
A.dI.prototype={
dN(a){var s,r,q
t.M.a(a)
try{if(B.h===$.J){a.$0()
return}A.jU(null,null,this,a,t.H)}catch(q){s=A.a5(q)
r=A.aM(q)
A.hO(t.K.a(s),t.l.a(r))}},
dO(a,b,c){var s,r,q
c.h("~(0)").a(a)
c.a(b)
try{if(B.h===$.J){a.$1(b)
return}A.jV(null,null,this,a,b,t.H,c)}catch(q){s=A.a5(q)
r=A.aM(q)
A.hO(t.K.a(s),t.l.a(r))}},
bc(a){return new A.hu(this,t.M.a(a))},
bX(a,b){return new A.hv(this,b.h("~(0)").a(a),b)},
dL(a,b){b.h("0()").a(a)
if($.J===B.h)return a.$0()
return A.jU(null,null,this,a,b)},
bm(a,b,c,d){c.h("@<0>").A(d).h("1(2)").a(a)
d.a(b)
if($.J===B.h)return a.$1(b)
return A.jV(null,null,this,a,b,c,d)},
dM(a,b,c,d,e,f){d.h("@<0>").A(e).A(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.J===B.h)return a.$2(b,c)
return A.mx(null,null,this,a,b,c,d,e,f)},
cd(a,b,c,d){return b.h("@<0>").A(c).A(d).h("1(2,3)").a(a)}}
A.hu.prototype={
$0(){return this.a.dN(this.b)},
$S:2}
A.hv.prototype={
$1(a){var s=this.c
return this.a.dO(this.b,s.a(a),s)},
$S(){return this.c.h("~(0)")}}
A.cs.prototype={
gI(a){var s=this,r=new A.bb(s,s.r,A.x(s).h("bb<1>"))
r.c=s.e
return r},
gk(a){return this.a},
gH(a){return this.a===0},
B(a,b){var s,r
if(b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else{r=this.cQ(b)
return r}},
cQ(a){var s=this.d
if(s==null)return!1
return this.b5(s[this.b1(a)],a)>=0},
l(a,b){var s,r,q=this
A.x(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bB(s==null?q.b=A.ij():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bB(r==null?q.c=A.ij():r,b)}else return q.cK(b)},
cK(a){var s,r,q,p=this
A.x(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.ij()
r=p.b1(a)
q=s[r]
if(q==null)s[r]=[p.b9(a)]
else{if(p.b5(q,a)>=0)return!1
q.push(p.b9(a))}return!0},
v(a,b){var s
if(b!=="__proto__")return this.cY(this.b,b)
else{s=this.cX(b)
return s}},
cX(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.b1(a)
r=n[s]
q=o.b5(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bT(p)
return!0},
bB(a,b){A.x(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.b9(b)
return!0},
cY(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bT(s)
delete a[b]
return!0},
bK(){this.r=this.r+1&1073741823},
b9(a){var s,r=this,q=new A.dE(A.x(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.bK()
return q},
bT(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.bK()},
b1(a){return J.e2(a)&1073741823},
b5(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.q(a[r].a,b))return r
return-1}}
A.dE.prototype={}
A.bb.prototype={
gE(){var s=this.d
return s==null?this.$ti.c.a(s):s},
u(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.b(A.V(q))
else if(r==null){s.sbG(null)
return!1}else{s.sbG(s.$ti.h("1?").a(r.a))
s.c=r.b
return!0}},
sbG(a){this.d=this.$ti.h("1?").a(a)},
$iad:1}
A.fL.prototype={
$2(a,b){this.a.m(0,this.b.a(a),this.c.a(b))},
$S:30}
A.D.prototype={
gI(a){return new A.aZ(a,this.gk(a),A.a4(a).h("aZ<D.E>"))},
L(a,b){return this.i(a,b)},
q(a,b){var s,r
A.a4(a).h("~(D.E)").a(b)
s=this.gk(a)
for(r=0;r<s;++r){b.$1(this.i(a,r))
if(s!==this.gk(a))throw A.b(A.V(a))}},
gH(a){return this.gk(a)===0},
gO(a){return this.gk(a)!==0},
ar(a,b,c){var s=A.a4(a)
return new A.a_(a,s.A(c).h("1(D.E)").a(b),s.h("@<D.E>").A(c).h("a_<1,2>"))},
dq(a,b,c,d){var s
A.a4(a).h("D.E?").a(d)
A.dc(b,c,this.gk(a))
for(s=b;s<c;++s)this.m(a,s,d)},
j(a){return A.ib(a,"[","]")},
$ir:1,
$ij:1,
$iH:1}
A.z.prototype={
q(a,b){var s,r,q,p=A.a4(a)
p.h("~(z.K,z.V)").a(b)
for(s=J.bg(this.gJ(a)),p=p.h("z.V");s.u();){r=s.gE()
q=this.i(a,r)
b.$2(r,q==null?p.a(q):q)}},
gdn(a){return J.iH(this.gJ(a),new A.fN(a),A.a4(a).h("aA<z.K,z.V>"))},
N(a,b){return J.iF(this.gJ(a),b)},
gk(a){return J.U(this.gJ(a))},
gH(a){return J.e3(this.gJ(a))},
gO(a){return J.i4(this.gJ(a))},
j(a){return A.ie(a)},
$ip:1}
A.fN.prototype={
$1(a){var s=this.a,r=A.a4(s)
r.h("z.K").a(a)
s=J.k(s,a)
if(s==null)s=r.h("z.V").a(s)
return new A.aA(a,s,r.h("@<z.K>").A(r.h("z.V")).h("aA<1,2>"))},
$S(){return A.a4(this.a).h("aA<z.K,z.V>(z.K)")}}
A.fO.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.d(a)
s=r.a+=s
r.a=s+": "
s=A.d(b)
r.a+=s},
$S:9}
A.bA.prototype={}
A.aa.prototype={
m(a,b,c){var s=A.x(this)
s.h("aa.K").a(b)
s.h("aa.V").a(c)
throw A.b(A.X("Cannot modify unmodifiable map"))}}
A.c8.prototype={
i(a,b){return J.k(this.a,b)},
m(a,b,c){var s=this.$ti
J.at(this.a,s.c.a(b),s.y[1].a(c))},
N(a,b){return J.i3(this.a,b)},
q(a,b){J.e1(this.a,this.$ti.h("~(1,2)").a(b))},
gH(a){return J.e3(this.a)},
gO(a){return J.i4(this.a)},
gk(a){return J.U(this.a)},
j(a){return J.L(this.a)},
$ip:1}
A.bB.prototype={}
A.a8.prototype={
gH(a){return this.gk(this)===0},
R(a,b){var s
for(s=J.bg(A.x(this).h("j<a8.E>").a(b));s.u();)this.l(0,s.gE())},
j(a){return A.ib(this,"{","}")},
U(a,b){var s,r,q,p,o=this.gI(this)
if(!o.u())return""
s=o.d
r=J.L(s==null?o.$ti.c.a(s):s)
if(!o.u())return r
s=o.$ti.c
if(b.length===0){q=r
do{p=o.d
q+=A.d(p==null?s.a(p):p)}while(o.u())
s=q}else{q=r
do{p=o.d
q=q+b+A.d(p==null?s.a(p):p)}while(o.u())
s=q}return s.charCodeAt(0)==0?s:s},
$ir:1,
$ij:1,
$iaq:1}
A.cw.prototype={}
A.cE.prototype={}
A.dC.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.cW(b):s}},
gk(a){return this.b==null?this.c.a:this.am().length},
gH(a){return this.gk(0)===0},
gO(a){return this.gk(0)>0},
gJ(a){var s
if(this.b==null){s=this.c
return new A.az(s,A.x(s).h("az<1>"))}return new A.dD(this)},
m(a,b,c){var s,r,q=this
if(q.b==null)q.c.m(0,b,c)
else if(q.N(0,b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.d6().m(0,b,c)},
N(a,b){if(this.b==null)return this.c.N(0,b)
return Object.prototype.hasOwnProperty.call(this.a,b)},
q(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.q(0,b)
s=o.am()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.hK(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.b(A.V(o))}},
am(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.n(Object.keys(this.a),t.s)
return s},
d6(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.bq(t.N,t.z)
r=n.am()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.m(0,o,n.i(0,o))}if(p===0)B.b.l(r,"")
else B.b.de(r)
n.a=n.b=null
return n.c=s},
cW(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.hK(this.a[a])
return this.b[a]=s}}
A.dD.prototype={
gk(a){return this.a.gk(0)},
L(a,b){var s=this.a
if(s.b==null)s=s.gJ(0).L(0,b)
else{s=s.am()
if(!(b>=0&&b<s.length))return A.c(s,b)
s=s[b]}return s},
gI(a){var s=this.a
if(s.b==null){s=s.gJ(0)
s=s.gI(s)}else{s=s.am()
s=new J.aQ(s,s.length,A.K(s).h("aQ<1>"))}return s},
B(a,b){return this.a.N(0,b)}}
A.hF.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:10}
A.hE.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:10}
A.cQ.prototype={
dD(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a1="Invalid base64 encoding length ",a2=a3.length
a5=A.dc(a4,a5,a2)
s=$.ks()
for(r=s.length,q=a4,p=q,o=null,n=-1,m=-1,l=0;q<a5;q=k){k=q+1
if(!(q<a2))return A.c(a3,q)
j=a3.charCodeAt(q)
if(j===37){i=k+2
if(i<=a5){if(!(k<a2))return A.c(a3,k)
h=A.hV(a3.charCodeAt(k))
g=k+1
if(!(g<a2))return A.c(a3,g)
f=A.hV(a3.charCodeAt(g))
e=h*16+f-(f&256)
if(e===37)e=-1
k=i}else e=-1}else e=j
if(0<=e&&e<=127){if(!(e>=0&&e<r))return A.c(s,e)
d=s[e]
if(d>=0){if(!(d<64))return A.c(a0,d)
e=a0.charCodeAt(d)
if(e===j)continue
j=e}else{if(d===-1){if(n<0){g=o==null?null:o.a.length
if(g==null)g=0
n=g+(q-p)
m=q}++l
if(j===61)continue}j=e}if(d!==-2){if(o==null){o=new A.W("")
g=o}else g=o
g.a+=B.a.n(a3,p,q)
c=A.I(j)
g.a+=c
p=k
continue}}throw A.b(A.S("Invalid base64 data",a3,q))}if(o!=null){a2=B.a.n(a3,p,a5)
a2=o.a+=a2
r=a2.length
if(n>=0)A.iL(a3,m,a5,n,l,r)
else{b=B.e.aa(r-1,4)+1
if(b===1)throw A.b(A.S(a1,a3,a5))
for(;b<4;){a2+="="
o.a=a2;++b}}a2=o.a
return B.a.ah(a3,a4,a5,a2.charCodeAt(0)==0?a2:a2)}a=a5-a4
if(n>=0)A.iL(a3,m,a5,n,l,a)
else{b=B.e.aa(a,4)
if(b===1)throw A.b(A.S(a1,a3,a5))
if(b>1)a3=B.a.ah(a3,a5,a5,b===2?"==":"=")}return a3}}
A.fh.prototype={}
A.aS.prototype={}
A.cV.prototype={}
A.cY.prototype={}
A.c3.prototype={
j(a){var s=A.bV(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.d6.prototype={
j(a){return"Cyclic error in JSON stringify"}}
A.d5.prototype={
T(a,b){var s=A.mu(b,this.gdl().a)
return s},
t(a){var s=A.lr(a,this.gdm().b,null)
return s},
gdm(){return B.V},
gdl(){return B.U}}
A.fJ.prototype={}
A.fI.prototype={}
A.hr.prototype={
cp(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.a.n(a,r,q)
r=q+1
o=A.I(92)
s.a+=o
o=A.I(117)
s.a+=o
o=A.I(100)
s.a+=o
o=p>>>8&15
o=A.I(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.I(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.I(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.a.n(a,r,q)
r=q+1
o=A.I(92)
s.a+=o
switch(p){case 8:o=A.I(98)
s.a+=o
break
case 9:o=A.I(116)
s.a+=o
break
case 10:o=A.I(110)
s.a+=o
break
case 12:o=A.I(102)
s.a+=o
break
case 13:o=A.I(114)
s.a+=o
break
default:o=A.I(117)
s.a+=o
o=A.I(48)
s.a+=o
o=A.I(48)
s.a+=o
o=p>>>4&15
o=A.I(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.I(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.a.n(a,r,q)
r=q+1
o=A.I(92)
s.a+=o
o=A.I(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.a.n(a,r,m)},
b_(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.b(new A.d6(a,null))}B.b.l(s,a)},
aP(a){var s,r,q,p,o=this
if(o.co(a))return
o.b_(a)
try{s=o.b.$1(a)
if(!o.co(s)){q=A.j2(a,null,o.gbL())
throw A.b(q)}q=o.a
if(0>=q.length)return A.c(q,-1)
q.pop()}catch(p){r=A.a5(p)
q=A.j2(a,r,o.gbL())
throw A.b(q)}},
co(a){var s,r,q,p=this
if(typeof a=="number"){if(!isFinite(a))return!1
s=p.c
r=B.c.j(a)
s.a+=r
return!0}else if(a===!0){p.c.a+="true"
return!0}else if(a===!1){p.c.a+="false"
return!0}else if(a==null){p.c.a+="null"
return!0}else if(typeof a=="string"){s=p.c
s.a+='"'
p.cp(a)
s.a+='"'
return!0}else if(t.j.b(a)){p.b_(a)
p.dQ(a)
s=p.a
if(0>=s.length)return A.c(s,-1)
s.pop()
return!0}else if(t.G.b(a)){p.b_(a)
q=p.dR(a)
s=p.a
if(0>=s.length)return A.c(s,-1)
s.pop()
return q}else return!1},
dQ(a){var s,r,q=this.c
q.a+="["
s=J.t(a)
if(s.gO(a)){this.aP(s.i(a,0))
for(r=1;r<s.gk(a);++r){q.a+=","
this.aP(s.i(a,r))}}q.a+="]"},
dR(a){var s,r,q,p,o,n=this,m={},l=J.t(a)
if(l.gH(a)){n.c.a+="{}"
return!0}s=l.gk(a)*2
r=A.fM(s,null,!1,t.O)
q=m.a=0
m.b=!0
l.q(a,new A.hs(m,r))
if(!m.b)return!1
l=n.c
l.a+="{"
for(p='"';q<s;q+=2,p=',"'){l.a+=p
n.cp(A.l(r[q]))
l.a+='":'
o=q+1
if(!(o<s))return A.c(r,o)
n.aP(r[o])}l.a+="}"
return!0}}
A.hs.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.b.m(s,r.a++,a)
B.b.m(s,r.a++,b)},
$S:9}
A.hq.prototype={
gbL(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.dn.prototype={}
A.h4.prototype={
dh(a){return new A.hD(this.a).cR(t.L.a(a),0,null,!0)}}
A.hD.prototype={
cR(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(a)
s=A.dc(b,c,J.U(a))
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.m1(a,b,s)
s-=b
p=b
b=0}if(s-b>=15){o=l.a
n=A.m0(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.b2(q,b,s,!0)
o=l.b
if((o&1)!==0){m=A.m2(o)
l.b=0
throw A.b(A.S(m,a,p+l.c))}return n},
b2(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.e.a6(b+c,2)
r=q.b2(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.b2(a,s,c,d)}return q.dk(a,b,c,d)},
dk(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.W(""),d=b+1,c=a.length
if(!(b>=0&&b<c))return A.c(a,b)
s=a[b]
$label0$0:for(r=k.a;!0;){for(;!0;d=o){if(!(s>=0&&s<256))return A.c(j,s)
q=j.charCodeAt(s)&31
f=g<=32?s&61694>>>q:(s&63|f<<6)>>>0
p=g+q
if(!(p>=0&&p<144))return A.c(i,p)
g=i.charCodeAt(p)
if(g===0){p=A.I(f)
e.a+=p
if(d===a0)break $label0$0
break}else if((g&1)!==0){if(r)switch(g){case 69:case 67:p=A.I(h)
e.a+=p
break
case 65:p=A.I(h)
e.a+=p;--d
break
default:p=A.I(h)
p=e.a+=p
e.a=p+A.I(h)
break}else{k.b=g
k.c=d-1
return""}g=0}if(d===a0)break $label0$0
o=d+1
if(!(d>=0&&d<c))return A.c(a,d)
s=a[d]}o=d+1
if(!(d>=0&&d<c))return A.c(a,d)
s=a[d]
if(s<128){while(!0){if(!(o<a0)){n=a0
break}m=o+1
if(!(o>=0&&o<c))return A.c(a,o)
s=a[o]
if(s>=128){n=m-1
o=m
break}o=m}if(n-d<20)for(l=d;l<n;++l){if(!(l<c))return A.c(a,l)
p=A.I(a[l])
e.a+=p}else{p=A.jg(a,d,n)
e.a+=p}if(n===a0)break $label0$0
d=o}else d=o}if(a1&&g>32)if(r){c=A.I(h)
e.a+=c}else{k.b=77
k.c=a0
return""}k.b=g
k.c=f
c=e.a
return c.charCodeAt(0)==0?c:c}}
A.af.prototype={
a0(a,b){if(b==null)return!1
return b instanceof A.af&&this.a===b.a&&this.b===b.b},
gG(a){var s=this.a
return(s^B.e.ao(s,30))&1073741823},
aN(){if(this.b)return A.i6(this.a,!1)
return this},
aj(){if(this.b)return this
return A.i6(this.a,!0)},
j(a){var s=this,r=A.iS(A.b2(s)),q=A.av(A.cg(s)),p=A.av(A.cf(s)),o=A.av(A.aJ(s)),n=A.av(A.bs(s)),m=A.av(A.j9(s)),l=A.iT(A.j8(s)),k=r+"-"+q
if(s.b)return k+"-"+p+" "+o+":"+n+":"+m+"."+l+"Z"
else return k+"-"+p+" "+o+":"+n+":"+m+"."+l},
ai(){var s=this,r=A.b2(s)>=-9999&&A.b2(s)<=9999?A.iS(A.b2(s)):A.kQ(A.b2(s)),q=A.av(A.cg(s)),p=A.av(A.cf(s)),o=A.av(A.aJ(s)),n=A.av(A.bs(s)),m=A.av(A.j9(s)),l=A.iT(A.j8(s)),k=r+"-"+q
if(s.b)return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+"Z"
else return k+"-"+p+"T"+o+":"+n+":"+m+"."+l}}
A.fw.prototype={
$1(a){if(a==null)return 0
return A.aN(a,null)},
$S:11}
A.fx.prototype={
$1(a){var s,r,q
if(a==null)return 0
for(s=a.length,r=0,q=0;q<6;++q){r*=10
if(q<s){if(!(q<s))return A.c(a,q)
r+=a.charCodeAt(q)^48}}return r},
$S:11}
A.bS.prototype={
a0(a,b){if(b==null)return!1
return b instanceof A.bS&&this.a===b.a},
gG(a){return B.e.gG(this.a)},
j(a){var s,r,q,p,o=this.a,n=B.e.a6(o,36e8)
o%=36e8
s=B.e.a6(o,6e7)
o%=6e7
r=s<10?"0":""
q=B.e.a6(o,1e6)
p=q<10?"0":""
return""+n+":"+r+s+":"+p+q+"."+B.a.Z(B.e.j(o%1e6),6,"0")}}
A.C.prototype={
gaz(){return A.l4(this)}}
A.bN.prototype={
j(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.bV(s)
return"Assertion failed"}}
A.aB.prototype={}
A.am.prototype={
gb4(){return"Invalid argument"+(!this.a?"(s)":"")},
gb3(){return""},
j(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+p,n=s.gb4()+q+o
if(!s.a)return n
return n+s.gb3()+": "+A.bV(s.gbg())},
gbg(){return this.b}}
A.bt.prototype={
gbg(){return A.m4(this.b)},
gb4(){return"RangeError"},
gb3(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.d(q):""
else if(q==null)s=": Not greater than or equal to "+A.d(r)
else if(q>r)s=": Not in inclusive range "+A.d(r)+".."+A.d(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.d(r)
return s}}
A.d_.prototype={
gbg(){return A.bc(this.b)},
gb4(){return"RangeError"},
gb3(){if(A.bc(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gk(a){return this.f}}
A.dl.prototype={
j(a){return"Unsupported operation: "+this.a}}
A.dj.prototype={
j(a){return"UnimplementedError: "+this.a}}
A.bv.prototype={
j(a){return"Bad state: "+this.a}}
A.cU.prototype={
j(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.bV(s)+"."}}
A.d9.prototype={
j(a){return"Out of Memory"},
gaz(){return null},
$iC:1}
A.ch.prototype={
j(a){return"Stack Overflow"},
gaz(){return null},
$iC:1}
A.hb.prototype={
j(a){return"Exception: "+this.a}}
A.fB.prototype={
j(a){var s,r,q,p,o,n,m,l,k,j,i,h=this.a,g=""!==h?"FormatException: "+h:"FormatException",f=this.c,e=this.b
if(typeof e=="string"){if(f!=null)s=f<0||f>e.length
else s=!1
if(s)f=null
if(f==null){if(e.length>78)e=B.a.n(e,0,75)+"..."
return g+"\n"+e}for(r=e.length,q=1,p=0,o=!1,n=0;n<f;++n){if(!(n<r))return A.c(e,n)
m=e.charCodeAt(n)
if(m===10){if(p!==n||!o)++q
p=n+1
o=!1}else if(m===13){++q
p=n+1
o=!0}}g=q>1?g+(" (at line "+q+", character "+(f-p+1)+")\n"):g+(" (at character "+(f+1)+")\n")
for(n=f;n<r;++n){if(!(n>=0))return A.c(e,n)
m=e.charCodeAt(n)
if(m===10||m===13){r=n
break}}if(r-p>78)if(f-p<75){l=p+75
k=p
j=""
i="..."}else{if(r-f<75){k=r-75
l=r
i=""}else{k=f-36
l=f+36
i="..."}j="..."}else{l=r
k=p
j=""
i=""}return g+j+B.a.n(e,k,l)+i+"\n"+B.a.aR(" ",f-k+j.length)+"^\n"}else return f!=null?g+(" (at offset "+A.d(f)+")"):g}}
A.j.prototype={
ar(a,b,c){var s=A.x(this)
return A.j6(this,s.A(c).h("1(j.E)").a(b),s.h("j.E"),c)},
aO(a,b){var s=A.x(this)
return new A.M(this,s.h("E(j.E)").a(b),s.h("M<j.E>"))},
q(a,b){var s
A.x(this).h("~(j.E)").a(b)
for(s=this.gI(this);s.u();)b.$1(s.gE())},
au(a,b){return A.b0(this,!0,A.x(this).h("j.E"))},
aM(a){return this.au(0,!0)},
gk(a){var s,r=this.gI(this)
for(s=0;r.u();)++s
return s},
gH(a){return!this.gI(this).u()},
gO(a){return!this.gH(this)},
gab(a){var s,r=this.gI(this)
if(!r.u())throw A.b(A.d0())
s=r.gE()
if(r.u())throw A.b(A.kV())
return s},
L(a,b){var s,r
A.fU(b,"index")
s=this.gI(this)
for(r=b;s.u();){if(r===0)return s.gE();--r}throw A.b(A.bZ(b,b-r,this,null,"index"))},
j(a){return A.kW(this,"(",")")}}
A.aA.prototype={
j(a){return"MapEntry("+A.d(this.a)+": "+A.d(this.b)+")"}}
A.R.prototype={
gG(a){return A.v.prototype.gG.call(this,0)},
j(a){return"null"}}
A.v.prototype={$iv:1,
a0(a,b){return this===b},
gG(a){return A.db(this)},
j(a){return"Instance of '"+A.fT(this)+"'"},
ga_(a){return A.mP(this)},
toString(){return this.j(this)}}
A.dN.prototype={
j(a){return""},
$iar:1}
A.W.prototype={
gk(a){return this.a.length},
j(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ilc:1}
A.h3.prototype={
$2(a,b){var s,r,q,p
t.I.a(a)
A.l(b)
s=B.a.c7(b,"=")
if(s===-1){if(b!=="")J.at(a,A.iq(b,0,b.length,this.a,!0),"")}else if(s!==0){r=B.a.n(b,0,s)
q=B.a.aT(b,s+1)
p=this.a
J.at(a,A.iq(r,0,r.length,p,!0),A.iq(q,0,q.length,p,!0))}return a},
$S:20}
A.h0.prototype={
$2(a,b){throw A.b(A.S("Illegal IPv4 address, "+a,this.a,b))},
$S:40}
A.h1.prototype={
$2(a,b){throw A.b(A.S("Illegal IPv6 address, "+a,this.a,b))},
$S:47}
A.h2.prototype={
$2(a,b){var s
if(b-a>4)this.a.$2("an IPv6 part can only contain a maximum of 4 hex digits",a)
s=A.aN(B.a.n(this.b,a,b),16)
if(s<0||s>65535)this.a.$2("each part must be in the range of `0x0..0xFFFF`",a)
return s},
$S:52}
A.cF.prototype={
gbR(){var s,r,q,p,o=this,n=o.w
if(n===$){s=o.a
r=s.length!==0?""+s+":":""
q=o.c
p=q==null
if(!p||s==="file"){s=r+"//"
r=o.b
if(r.length!==0)s=s+r+"@"
if(!p)s+=q
r=o.d
if(r!=null)s=s+":"+A.d(r)}else s=r
s+=o.e
r=o.f
if(r!=null)s=s+"?"+r
r=o.r
if(r!=null)s=s+"#"+r
n!==$&&A.iC()
n=o.w=s.charCodeAt(0)==0?s:s}return n},
gG(a){var s,r=this,q=r.y
if(q===$){s=B.a.gG(r.gbR())
r.y!==$&&A.iC()
r.y=s
q=s}return q},
gbj(){var s,r,q=this,p=q.z
if(p===$){s=q.f
r=new A.bB(A.jo(s==null?"":s),t.dw)
q.z!==$&&A.iC()
q.scI(r)
p=r}return p},
gcm(){return this.b},
gbe(a){var s=this.c
if(s==null)return""
if(B.a.P(s,"["))return B.a.n(s,1,s.length-1)
return s},
gbh(a){var s=this.d
return s==null?A.jE(this.a):s},
gbi(){var s=this.f
return s==null?"":s},
gc2(){var s=this.r
return s==null?"":s},
gc3(){return this.c!=null},
gc6(){return this.f!=null},
gc5(){return this.r!=null},
j(a){return this.gbR()},
a0(a,b){var s,r,q=this
if(b==null)return!1
if(q===b)return!0
if(t.dD.b(b))if(q.a===b.gbv())if(q.c!=null===b.gc3())if(q.b===b.gcm())if(q.gbe(0)===b.gbe(b))if(q.gbh(0)===b.gbh(b))if(q.e===b.gcc(b)){s=q.f
r=s==null
if(!r===b.gc6()){if(r)s=""
if(s===b.gbi()){s=q.r
r=s==null
if(!r===b.gc5()){if(r)s=""
s=s===b.gc2()}else s=!1}else s=!1}else s=!1}else s=!1
else s=!1
else s=!1
else s=!1
else s=!1
else s=!1
else s=!1
return s},
scI(a){this.z=t.I.a(a)},
$idm:1,
gbv(){return this.a},
gcc(a){return this.e}}
A.h_.prototype={
gcl(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.c(m,0)
s=o.a
m=m[0]+1
r=B.a.aI(s,"?",m)
q=s.length
if(r>=0){p=A.cG(s,r+1,q,B.m,!1,!1)
q=r}else p=n
m=o.c=new A.dw("data","",n,n,A.cG(s,m,q,B.A,!1,!1),p,n)}return m},
j(a){var s,r=this.b
if(0>=r.length)return A.c(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.hL.prototype={
$2(a,b){var s=this.a
if(!(a<s.length))return A.c(s,a)
s=s[a]
B.a0.dq(s,0,96,b)
return s},
$S:21}
A.hM.prototype={
$3(a,b,c){var s,r,q
for(s=b.length,r=0;r<s;++r){q=b.charCodeAt(r)^96
if(!(q<96))return A.c(a,q)
a[q]=c}},
$S:13}
A.hN.prototype={
$3(a,b,c){var s,r,q=b.length
if(0>=q)return A.c(b,0)
s=b.charCodeAt(0)
if(1>=q)return A.c(b,1)
r=b.charCodeAt(1)
for(;s<=r;++s){q=(s^96)>>>0
if(!(q<96))return A.c(a,q)
a[q]=c}},
$S:13}
A.dK.prototype={
gc3(){return this.c>0},
gc6(){return this.f<this.r},
gc5(){return this.r<this.a.length},
gbv(){var s=this.w
return s==null?this.w=this.cP():s},
cP(){var s,r=this,q=r.b
if(q<=0)return""
s=q===4
if(s&&B.a.P(r.a,"http"))return"http"
if(q===5&&B.a.P(r.a,"https"))return"https"
if(s&&B.a.P(r.a,"file"))return"file"
if(q===7&&B.a.P(r.a,"package"))return"package"
return B.a.n(r.a,0,q)},
gcm(){var s=this.c,r=this.b+3
return s>r?B.a.n(this.a,r,s-1):""},
gbe(a){var s=this.c
return s>0?B.a.n(this.a,s,this.d):""},
gbh(a){var s,r=this
if(r.c>0&&r.d+1<r.e)return A.aN(B.a.n(r.a,r.d+1,r.e),null)
s=r.b
if(s===4&&B.a.P(r.a,"http"))return 80
if(s===5&&B.a.P(r.a,"https"))return 443
return 0},
gcc(a){return B.a.n(this.a,this.e,this.f)},
gbi(){var s=this.f,r=this.r
return s<r?B.a.n(this.a,s+1,r):""},
gc2(){var s=this.r,r=this.a
return s<r.length?B.a.aT(r,s+1):""},
gbj(){if(this.f>=this.r)return B.a_
return new A.bB(A.jo(this.gbi()),t.dw)},
gG(a){var s=this.x
return s==null?this.x=B.a.gG(this.a):s},
a0(a,b){if(b==null)return!1
if(this===b)return!0
return t.dD.b(b)&&this.a===b.j(0)},
j(a){return this.a},
$idm:1}
A.dw.prototype={}
A.f.prototype={$if:1}
A.bh.prototype={
sdu(a,b){a.href=b},
j(a){var s=String(a)
s.toString
return s},
$ibh:1}
A.cN.prototype={
j(a){var s=String(a)
s.toString
return s}}
A.bi.prototype={$ibi:1}
A.aR.prototype={$iaR:1}
A.bk.prototype={$ibk:1}
A.an.prototype={
gk(a){return a.length}}
A.bl.prototype={
bE(a,b){var s=$.kb(),r=s[b]
if(typeof r=="string")return r
r=this.d5(a,b)
s[b]=r
return r},
d5(a,b){var s,r=b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()})
r.toString
r=r in a
r.toString
if(r)return b
s=$.ke()+b
r=s in a
r.toString
if(r)return s
return b},
bO(a,b,c,d){a.setProperty(b,c,d)},
gk(a){var s=a.length
s.toString
return s}}
A.fj.prototype={}
A.aT.prototype={}
A.fy.prototype={
j(a){var s=String(a)
s.toString
return s}}
A.cX.prototype={
dj(a,b){var s=a.createHTMLDocument(b)
s.toString
return s}}
A.fz.prototype={
gk(a){var s=a.length
s.toString
return s}}
A.bD.prototype={
gk(a){return this.a.length},
i(a,b){var s=this.a
if(!(b>=0&&b<s.length))return A.c(s,b)
return this.$ti.c.a(s[b])},
m(a,b,c){this.$ti.c.a(c)
throw A.b(A.X("Cannot modify list"))}}
A.y.prototype={
gd9(a){return new A.dx(a)},
gad(a){return new A.dy(a)},
j(a){var s=a.localName
s.toString
return s},
S(a,b,c,d){var s,r,q,p
if(c==null){s=$.iV
if(s==null){s=A.n([],t.k)
r=new A.cd(s)
B.b.l(s,A.js(null))
B.b.l(s,A.jy())
$.iV=r
d=r}else d=s
s=$.iU
if(s==null){d.toString
s=new A.cH(d)
$.iU=s
c=s}else{d.toString
s.a=d
c=s}}if($.aI==null){s=document
r=s.implementation
r.toString
r=B.O.dj(r,"")
$.aI=r
r=r.createRange()
r.toString
$.i9=r
r=$.aI.createElement("base")
t.cR.a(r)
s=s.baseURI
s.toString
r.href=s
$.aI.head.appendChild(r).toString}s=$.aI
if(s.body==null){r=s.createElement("body")
B.y.sdc(s,t.b.a(r))}s=$.aI
if(t.b.b(a)){s=s.body
s.toString
q=s}else{s.toString
r=a.tagName
r.toString
q=s.createElement(r)
$.aI.body.appendChild(q).toString}s="createContextualFragment" in window.Range.prototype
s.toString
if(s){s=a.tagName
s.toString
s=!B.b.B(B.Y,s)}else s=!1
if(s){$.i9.selectNodeContents(q)
s=$.i9
s=s.createContextualFragment(b)
s.toString
p=s}else{J.kG(q,b)
s=$.aI.createDocumentFragment()
s.toString
for(;r=q.firstChild,r!=null;)s.appendChild(r).toString
p=s}if(q!==$.aI.body)J.iI(q)
c.bu(p)
document.adoptNode(p).toString
return p},
di(a,b,c){return this.S(a,b,c,null)},
sC(a,b){this.aS(a,b)},
aS(a,b){this.sW(a,null)
a.appendChild(this.S(a,b,null,null)).toString},
scU(a,b){a.innerHTML=b},
ga7(a){return new A.b8(a,"click",!1,t.C)},
$iy:1}
A.fA.prototype={
$1(a){return t.h.b(t.A.a(a))},
$S:23}
A.e.prototype={$ie:1}
A.A.prototype={
bV(a,b,c,d){t.bw.a(c)
if(c!=null)this.cL(a,b,c,d)},
d7(a,b,c){return this.bV(a,b,c,null)},
cL(a,b,c,d){return a.addEventListener(b,A.bL(t.bw.a(c),1),d)},
$iA:1}
A.cZ.prototype={
gk(a){return a.length}}
A.bX.prototype={
sdc(a,b){a.body=b}}
A.ag.prototype={
dE(a,b,c,d){return a.open(b,c,!0)},
$iag:1}
A.fC.prototype={
$1(a){var s=t.bo.a(a).responseText
s.toString
return s},
$S:24}
A.fD.prototype={
$2(a,b){this.a.setRequestHeader(A.l(a),A.l(b))},
$S:14}
A.fE.prototype={
$1(a){var s,r,q,p,o
t.x.a(a)
s=this.a
r=s.status
r.toString
q=r>=200&&r<300
p=r>307&&r<400
r=q||r===0||r===304||p
o=this.b
if(r)o.bd(0,s)
else o.bZ(a)},
$S:26}
A.bY.prototype={}
A.aW.prototype={
saD(a,b){a.checked=b},
sF(a,b){a.value=b},
$iaW:1,
$ijb:1,
$iiQ:1}
A.c7.prototype={
j(a){var s=String(a)
s.toString
return s},
$ic7:1}
A.a3.prototype={$ia3:1}
A.a0.prototype={
gab(a){var s=this.a,r=s.childNodes.length
if(r===0)throw A.b(A.de("No elements"))
if(r>1)throw A.b(A.de("More than one element"))
s=s.firstChild
s.toString
return s},
R(a,b){var s,r,q,p,o
t.eh.a(b)
s=b.a
r=this.a
if(s!==r)for(q=s.childNodes.length,p=0;p<q;++p){o=s.firstChild
o.toString
r.appendChild(o).toString}return},
m(a,b,c){var s,r
t.A.a(c)
s=this.a
r=s.childNodes
if(!(b>=0&&b<r.length))return A.c(r,b)
s.replaceChild(c,r[b]).toString},
gI(a){var s=this.a.childNodes
return new A.aU(s,s.length,A.a4(s).h("aU<ap.E>"))},
gk(a){return this.a.childNodes.length},
i(a,b){var s=this.a.childNodes
if(!(b>=0&&b<s.length))return A.c(s,b)
return s[b]}}
A.m.prototype={
dH(a){var s=a.parentNode
if(s!=null)s.removeChild(a).toString},
dJ(a,b){var s,r,q
try{r=a.parentNode
r.toString
s=r
J.kB(s,b,a)}catch(q){}return a},
cO(a){var s
for(;s=a.firstChild,s!=null;)a.removeChild(s).toString},
j(a){var s=a.nodeValue
return s==null?this.cw(a):s},
sW(a,b){a.textContent=b},
df(a,b){var s=a.cloneNode(!0)
s.toString
return s},
B(a,b){var s=a.contains(b)
s.toString
return s},
cZ(a,b,c){var s=a.replaceChild(b,c)
s.toString
return s},
$im:1}
A.cc.prototype={
gk(a){var s=a.length
s.toString
return s},
i(a,b){var s=a.length,r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.bZ(b,s,a,null,null))
s=a[b]
s.toString
return s},
m(a,b,c){t.A.a(c)
throw A.b(A.X("Cannot assign element of immutable List."))},
L(a,b){if(!(b>=0&&b<a.length))return A.c(a,b)
return a[b]},
$ir:1,
$iax:1,
$ij:1,
$iH:1}
A.ai.prototype={$iai:1}
A.b4.prototype={
gk(a){return a.length},
sF(a,b){a.value=b},
$ib4:1}
A.ci.prototype={
N(a,b){return a.getItem(A.l(b))!=null},
i(a,b){return a.getItem(A.l(b))},
m(a,b,c){a.setItem(b,A.l(c))},
v(a,b){var s=a.getItem(b)
a.removeItem(b)
return s},
q(a,b){var s,r,q
t.eA.a(b)
for(s=0;!0;++s){r=a.key(s)
if(r==null)return
q=a.getItem(r)
q.toString
b.$2(r,q)}},
gJ(a){var s=A.n([],t.s)
this.q(a,new A.fV(s))
return s},
gk(a){var s=a.length
s.toString
return s},
gH(a){return a.key(0)==null},
gO(a){return a.key(0)!=null},
$ip:1}
A.fV.prototype={
$2(a,b){return B.b.l(this.a,a)},
$S:14}
A.cl.prototype={
S(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.aU(a,b,c,d)
s=A.kR("<table>"+b+"</table>",c,d)
r=document.createDocumentFragment()
r.toString
new A.a0(r).R(0,new A.a0(s))
return r}}
A.dg.prototype={
S(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.aU(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.a0(s).R(0,new A.a0(new A.a0(new A.a0(B.D.S(r,b,c,d)).gab(0)).gab(0)))
return s}}
A.dh.prototype={
S(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.aU(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.a0(s).R(0,new A.a0(new A.a0(B.D.S(r,b,c,d)).gab(0)))
return s}}
A.bw.prototype={
aS(a,b){var s,r
this.sW(a,null)
s=a.content
s.toString
J.kA(s)
r=this.S(a,b,null,null)
a.content.appendChild(r).toString},
$ibw:1}
A.b5.prototype={
sF(a,b){a.value=b},
$ib5:1}
A.ak.prototype={}
A.cn.prototype={$ih5:1}
A.bC.prototype={$ibC:1}
A.ct.prototype={
gk(a){var s=a.length
s.toString
return s},
i(a,b){var s=a.length,r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.bZ(b,s,a,null,null))
s=a[b]
s.toString
return s},
m(a,b,c){t.A.a(c)
throw A.b(A.X("Cannot assign element of immutable List."))},
L(a,b){if(!(b>=0&&b<a.length))return A.c(a,b)
return a[b]},
$ir:1,
$iax:1,
$ij:1,
$iH:1}
A.ds.prototype={
q(a,b){var s,r,q,p,o,n
t.eA.a(b)
for(s=this.gJ(0),r=s.length,q=this.a,p=0;p<s.length;s.length===r||(0,A.i2)(s),++p){o=s[p]
n=q.getAttribute(o)
b.$2(o,n==null?A.l(n):n)}},
gJ(a){var s,r,q,p,o,n,m=this.a.attributes
m.toString
s=A.n([],t.s)
for(r=m.length,q=t.h9,p=0;p<r;++p){if(!(p<m.length))return A.c(m,p)
o=q.a(m[p])
if(o.namespaceURI==null){n=o.name
n.toString
B.b.l(s,n)}}return s},
gH(a){return this.gJ(0).length===0},
gO(a){return this.gJ(0).length!==0}}
A.dx.prototype={
N(a,b){var s=this.a.hasAttribute(b)
s.toString
return s},
i(a,b){return this.a.getAttribute(A.l(b))},
m(a,b,c){this.a.setAttribute(b,A.l(c))},
gk(a){return this.gJ(0).length}}
A.dy.prototype={
a8(){var s,r,q,p,o=A.c6(t.N)
for(s=this.a.className.split(" "),r=s.length,q=0;q<r;++q){p=J.iJ(s[q])
if(p.length!==0)o.l(0,p)}return o},
bt(a){this.a.className=t.cq.a(a).U(0," ")},
gk(a){var s=this.a.classList.length
s.toString
return s},
gH(a){var s=this.a.classList.length
s.toString
return s===0},
l(a,b){var s,r
A.l(b)
s=this.a.classList
r=s.contains(b)
r.toString
s.add(b)
return!r},
v(a,b){var s=this.a.classList,r=s.contains(b)
r.toString
s.remove(b)
return r}}
A.ia.prototype={}
A.cq.prototype={}
A.b8.prototype={}
A.cr.prototype={$ilb:1}
A.ha.prototype={
$1(a){return this.a.$1(t.B.a(a))},
$S:3}
A.ba.prototype={
cD(a){var s
if($.dB.a===0){for(s=0;s<262;++s)$.dB.m(0,B.X[s],A.mR())
for(s=0;s<12;++s)$.dB.m(0,B.r[s],A.mS())}},
ac(a){return $.kt().B(0,A.bU(a))},
a2(a,b,c){var s=$.dB.i(0,A.bU(a)+"::"+b)
if(s==null)s=$.dB.i(0,"*::"+b)
if(s==null)return!1
return A.jN(s.$4(a,b,c,this))},
$iah:1}
A.ap.prototype={
gI(a){return new A.aU(a,this.gk(a),A.a4(a).h("aU<ap.E>"))}}
A.cd.prototype={
ac(a){return B.b.ap(this.a,new A.fQ(a))},
a2(a,b,c){return B.b.ap(this.a,new A.fP(a,b,c))},
$iah:1}
A.fQ.prototype={
$1(a){return t.w.a(a).ac(this.a)},
$S:15}
A.fP.prototype={
$1(a){return t.w.a(a).a2(this.a,this.b,this.c)},
$S:15}
A.cx.prototype={
cE(a,b,c,d){var s,r,q
this.a.R(0,c)
s=b.aO(0,new A.hw())
r=b.aO(0,new A.hx())
this.b.R(0,s)
q=this.c
q.R(0,B.Z)
q.R(0,r)},
ac(a){return this.a.B(0,A.bU(a))},
a2(a,b,c){var s,r=this,q=A.bU(a),p=r.c,o=q+"::"+b
if(p.B(0,o))return r.d.d8(c)
else{s="*::"+b
if(p.B(0,s))return r.d.d8(c)
else{p=r.b
if(p.B(0,o))return!0
else if(p.B(0,s))return!0
else if(p.B(0,q+"::*"))return!0
else if(p.B(0,"*::*"))return!0}}return!1},
$iah:1}
A.hw.prototype={
$1(a){return!B.b.B(B.r,A.l(a))},
$S:16}
A.hx.prototype={
$1(a){return B.b.B(B.r,A.l(a))},
$S:16}
A.dP.prototype={
a2(a,b,c){if(this.cB(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.B(0,b)
return!1}}
A.hy.prototype={
$1(a){return"TEMPLATE::"+A.l(a)},
$S:17}
A.dO.prototype={
ac(a){var s
if(t.ew.b(a))return!1
s=t.g7.b(a)
if(s&&A.bU(a)==="foreignObject")return!1
if(s)return!0
return!1},
a2(a,b,c){if(b==="is"||B.a.P(b,"on"))return!1
return this.ac(a)},
$iah:1}
A.aU.prototype={
u(){var s=this,r=s.c+1,q=s.b
if(r<q){s.sbJ(J.k(s.a,r))
s.c=r
return!0}s.sbJ(null)
s.c=q
return!1},
gE(){var s=this.d
return s==null?this.$ti.c.a(s):s},
sbJ(a){this.d=this.$ti.h("1?").a(a)},
$iad:1}
A.dv.prototype={$iA:1,$ih5:1}
A.dJ.prototype={$ilg:1}
A.cH.prototype={
bu(a){var s,r=new A.hH(this)
do{s=this.b
r.$2(a,null)}while(s!==this.b)},
an(a,b){++this.b
if(b==null||b!==a.parentNode)J.iI(a)
else b.removeChild(a).toString},
d1(a,b){var s,r,q,p,o,n,m,l=!0,k=null,j=null
try{k=J.kD(a)
j=k.a.getAttribute("is")
t.h.a(a)
p=function(c){if(!(c.attributes instanceof NamedNodeMap)){return true}if(c.id=="lastChild"||c.name=="lastChild"||c.id=="previousSibling"||c.name=="previousSibling"||c.id=="children"||c.name=="children"){return true}var i=c.childNodes
if(c.lastChild&&c.lastChild!==i[i.length-1]){return true}if(c.children){if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList)){return true}}var h=0
if(c.children){h=c.children.length}for(var g=0;g<h;g++){var f=c.children[g]
if(f.id=="attributes"||f.name=="attributes"||f.id=="lastChild"||f.name=="lastChild"||f.id=="previousSibling"||f.name=="previousSibling"||f.id=="children"||f.name=="children"){return true}}return false}(a)
p.toString
s=p
if(A.e_(s))o=!0
else{p=!(a.attributes instanceof NamedNodeMap)
p.toString
o=p}l=o}catch(n){}r="element unprintable"
try{r=J.L(a)}catch(n){}try{t.h.a(a)
q=A.bU(a)
this.d0(a,b,l,r,q,t.G.a(k),A.al(j))}catch(n){if(A.a5(n) instanceof A.am)throw n
else{this.an(a,b)
window.toString
p=A.d(r)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn("Removing corrupted element "+p)}}},
d0(a,b,c,d,e,f,g){var s,r,q,p,o,n,m,l=this
if(c){l.an(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing element due to corrupted attributes on <"+d+">")
return}if(!l.a.ac(a)){l.an(a,b)
window.toString
s=A.d(b)
r=typeof console!="undefined"
r.toString
if(r)window.console.warn("Removing disallowed element <"+e+"> from "+s)
return}if(g!=null)if(!l.a.a2(a,"is",g)){l.an(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing disallowed type extension <"+e+' is="'+g+'">')
return}s=f.gJ(0)
q=A.n(s.slice(0),A.K(s))
for(p=f.gJ(0).length-1,s=f.a,r="Removing disallowed attribute <"+e+" ";p>=0;--p){if(!(p<q.length))return A.c(q,p)
o=q[p]
n=l.a
m=J.kH(o)
A.l(o)
if(!n.a2(a,m,A.l(s.getAttribute(o)))){window.toString
n=s.getAttribute(o)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn(r+o+'="'+A.d(n)+'">')
s.removeAttribute(o)}}if(t.aW.b(a)){s=a.content
s.toString
l.bu(s)}},
ct(a,b){var s=a.nodeType
s.toString
switch(s){case 1:this.d1(a,b)
break
case 8:case 11:case 3:case 4:break
default:this.an(a,b)}},
$il2:1}
A.hH.prototype={
$2(a,b){var s,r,q,p,o,n,m=this.a
m.ct(a,b)
s=a.lastChild
for(q=t.A;s!=null;){r=null
try{r=s.previousSibling
if(r!=null){p=r.nextSibling
o=s
o=p==null?o!=null:p!==o
p=o}else p=!1
if(p){p=A.de("Corrupt HTML")
throw A.b(p)}}catch(n){p=q.a(s);++m.b
o=p.parentNode
if(a!==o){if(o!=null)o.removeChild(p).toString}else a.removeChild(p).toString
s=null
r=a.lastChild}if(s!=null)this.$2(s,a)
s=r}},
$S:31}
A.dt.prototype={}
A.dG.prototype={}
A.dH.prototype={}
A.dL.prototype={}
A.dR.prototype={}
A.dS.prototype={}
A.cW.prototype={
bU(a){var s=$.ka()
if(s.b.test(a))return a
throw A.b(A.i5(a,"value","Not a valid class token"))},
j(a){return this.a8().U(0," ")},
gI(a){var s=this.a8()
return A.ls(s,s.r,A.x(s).c)},
gH(a){return this.a8().a===0},
gk(a){return this.a8().a},
l(a,b){var s
A.l(b)
this.bU(b)
s=this.dC(new A.fi(b))
return A.jN(s==null?!1:s)},
v(a,b){var s,r
this.bU(b)
s=this.a8()
r=s.v(0,b)
this.bt(s)
return r},
dC(a){var s,r
t.bU.a(a)
s=this.a8()
r=a.$1(s)
this.bt(s)
return r}}
A.fi.prototype={
$1(a){return t.cq.a(a).l(0,this.a)},
$S:32}
A.ho.prototype={
ae(a){if(a<=0||a>4294967296)throw A.b(A.l8("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
ca(){return Math.random()}}
A.bu.prototype={$ibu:1}
A.cP.prototype={
a8(){var s,r,q,p,o=this.a.getAttribute("class"),n=A.c6(t.N)
if(o==null)return n
for(s=o.split(" "),r=s.length,q=0;q<r;++q){p=J.iJ(s[q])
if(p.length!==0)n.l(0,p)}return n},
bt(a){this.a.setAttribute("class",a.U(0," "))}}
A.h.prototype={
gad(a){return new A.cP(a)},
sC(a,b){this.aS(a,b)},
S(a,b,c,d){var s,r,q,p=A.n([],t.k)
B.b.l(p,A.js(null))
B.b.l(p,A.jy())
B.b.l(p,new A.dO())
c=new A.cH(new A.cd(p))
p=document
s=p.body
s.toString
r=B.u.di(s,'<svg version="1.1">'+b+"</svg>",c)
p=p.createDocumentFragment()
p.toString
q=new A.a0(r).gab(0)
for(;s=q.firstChild,s!=null;)p.appendChild(s).toString
return p},
ga7(a){return new A.b8(a,"click",!1,t.C)},
$ih:1}
A.i_.prototype={
$1(a){t.B.a(a)
new A.e4().Y()},
$S:33}
A.e4.prototype={
Y(){var s=0,r=A.dX(t.H),q=this,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
var $async$Y=A.dZ(function(a0,a1){if(a0===1)return A.dU(a1,r)
while(true)switch(s){case 0:c=document
b=c.getElementById("view-login")
b.toString
q.e=b
b=c.getElementById("view-dashboard")
b.toString
q.f=b
b=c.getElementById("view-directory")
b.toString
q.r=b
b=c.getElementById("view-assets")
b.toString
q.w=b
b=c.getElementById("view-profile")
b.toString
q.x=b
b=c.getElementById("view-billing")
b.toString
q.y=b
b=c.getElementById("view-resident-home")
b.toString
q.z=b
b=c.getElementById("view-resident-ledger")
b.toString
q.Q=b
b=c.getElementById("view-resident-support")
b.toString
q.as=b
b=c.getElementById("app-bottom-nav")
b.toString
q.at=b
b=c.getElementById("resident-bottom-nav")
b.toString
q.ax=b
q.ay=c.getElementById("btn-floating-role-switch")
c.getElementById("floating-role-switch-text")
b=t.N
q.scH(t.u.a(A.B(["view-dashboard",q.f,"view-directory",q.r,"view-assets",q.w,"view-profile",q.x,"view-billing",q.y,"view-resident-home",q.z,"view-resident-ledger",q.Q,"view-resident-support",q.as],b,t.h)))
o=t.d.a(window.location).href
o.toString
n=A.jm(o).gbj().i(0,"role")
if(n==="resident"){m=c.getElementById("zone-assignment-container")
if(m!=null){o=m.style
o.display="none"}l=t.f.a(c.getElementById("employee-id"))
if(l!=null)l.placeholder="e.g. TAG-2026-0041"
k=c.querySelector('label[for="employee-id"]')
if(k!=null)J.o(k,"Resident Account Number")
j=c.querySelector(".login-header p")
if(j!=null)J.o(j,"Resident Portal Login")
i=c.querySelector("#btn-login span")
if(i!=null)J.o(i,"Sign In to Portal")
h=c.getElementById("login-error-msg")
if(h!=null)J.aG(h,"Invalid Resident credentials. Use <strong>TAG-2026-0041</strong>.")
g=c.getElementById("btn-quick-login")
if(g!=null){c=g.style
c.display="flex"}}else if(n==="worker"){l=t.f.a(c.getElementById("employee-id"))
if(l!=null)l.placeholder="e.g. EMP-304"
k=c.querySelector('label[for="employee-id"]')
if(k!=null)J.o(k,"Employee Credentials / ID")
j=c.querySelector(".login-header p")
if(j!=null)J.o(j,"Worker & Field Terminal")
i=c.querySelector("#btn-login span")
if(i!=null)J.o(i,"Sign In to Terminal")
h=c.getElementById("login-error-msg")
if(h!=null)J.aG(h,"Invalid Worker credentials. Use <strong>EMP-304</strong>.")
f=c.getElementById("btn-quick-login-worker")
if(f!=null){c=f.style
c.display="flex"}}c=new A.eD()
c.$0()
A.jh(A.i8(0,10),new A.eB(c))
s=2
return A.dT($.G().Y(),$async$Y)
case 2:A.jh(A.i8(0,5),new A.eC(q))
p=window.localStorage.getItem("waterhall_session")
e=window.localStorage.getItem("waterhall_resident_session")
if(p!=null)try{q.sX(A.c5(t.G.a(B.d.T(0,p)),b,t.z))
c=q.a
c.toString
q.av(c)}catch(a){c=window.localStorage
c.toString
B.i.v(c,"waterhall_session")
q.aq()}else if(e!=null)q.aw(e)
else q.aq()
q.da()
return A.dV(null,r)}})
return A.dW($async$Y,r)},
da(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3=this,b4="click",b5="input",b6="change"
b3.cT()
s=document
r=t.r
q=r.a(s.getElementById("btn-login"))
p=r.a(s.getElementById("btn-quick-login"))
o=r.a(s.getElementById("btn-quick-login-worker"))
n=t.f
m=n.a(s.getElementById("employee-id"))
l=n.a(s.getElementById("login-password"))
k=t.Z
j=k.a(s.getElementById("zone-assignment"))
i=s.getElementById("login-error-msg")
if(p!=null){h=t.C
A.w(p,b4,h.h("~(1)?").a(new A.eb(b3,i)),!1,h.c)}if(o!=null){h=t.C
A.w(o,b4,h.h("~(1)?").a(new A.ec(b3,i)),!1,h.c)}if(q!=null){h=t.C
A.w(q,b4,h.h("~(1)?").a(new A.ed(b3,m,l,j,i)),!1,h.c)}g=r.a(s.getElementById("btn-logout"))
if(g!=null){h=t.C
A.w(g,b4,h.h("~(1)?").a(new A.en(b3,m,l)),!1,h.c)}f=r.a(s.getElementById("btn-resident-logout"))
if(f!=null){h=t.C
A.w(f,b4,h.h("~(1)?").a(new A.eo(b3,m)),!1,h.c)}h=t.h
A.k0(h,h,"T","querySelectorAll")
h=s.querySelectorAll(".nav-tab")
h.toString
e=new A.bD(h,t.cD)
e.q(e,new A.ep(b3))
d=n.a(s.getElementById("dir-search"))
c=k.a(s.getElementById("filter-purok"))
b=k.a(s.getElementById("filter-status"))
if(d!=null){n=t.E
A.w(d,b5,n.h("~(1)?").a(new A.eq(b3)),!1,n.c)}if(c!=null){n=t.E
A.w(c,b6,n.h("~(1)?").a(new A.er(b3)),!1,n.c)}if(b!=null){n=t.E
A.w(b,b6,n.h("~(1)?").a(new A.es(b3)),!1,n.c)}a=s.getElementById("btn-close-modal")
if(a!=null){n=J.au(a)
k=n.$ti
A.w(n.a,n.b,k.h("~(1)?").a(new A.et(b3)),!1,k.c)}a0=s.getElementById("house-detail-modal")
if(a0!=null){n=J.au(a0)
k=n.$ti
A.w(n.a,n.b,k.h("~(1)?").a(new A.eu(b3,a0)),!1,k.c)}a1=t.J.a(s.getElementById("modal-leak-toggle"))
if(a1!=null){n=t.E
A.w(a1,b6,n.h("~(1)?").a(new A.ee(b3,a1)),!1,n.c)}a2=r.a(s.getElementById("btn-submit-log"))
if(a2!=null){n=t.C
A.w(a2,b4,n.h("~(1)?").a(new A.ef(b3)),!1,n.c)}n=t.a6
a3=n.a(s.getElementById("slider-tank"))
a4=n.a(s.getElementById("slider-ph"))
a5=n.a(s.getElementById("slider-turbidity"))
a6=s.getElementById("sim-tank-val")
a7=s.getElementById("sim-ph-val")
a8=s.getElementById("sim-turbidity-val")
if(a3!=null){n=t.E
A.w(a3,b5,n.h("~(1)?").a(new A.eg(b3,a3,a6)),!1,n.c)}if(a4!=null){n=t.E
A.w(a4,b5,n.h("~(1)?").a(new A.eh(b3,a4,a7)),!1,n.c)}if(a5!=null){n=t.E
A.w(a5,b5,n.h("~(1)?").a(new A.ei(b3,a5,a8)),!1,n.c)}a9=s.getElementById("menu-view-logs")
if(a9!=null){n=J.au(a9)
k=n.$ti
A.w(n.a,n.b,k.h("~(1)?").a(new A.ej(b3)),!1,k.c)}b0=s.getElementById("menu-emergency-call")
if(b0!=null){n=J.au(b0)
k=n.$ti
A.w(n.a,n.b,k.h("~(1)?").a(new A.ek(b3)),!1,k.c)}b1=r.a(s.getElementById("btn-resident-submit-log"))
if(b1!=null){r=t.C
A.w(b1,b4,r.h("~(1)?").a(new A.el(b3)),!1,r.c)}b2=s.getElementById("btn-broadcast-announcement")
if(b2!=null){s=J.au(b2)
r=s.$ti
A.w(s.a,s.b,r.h("~(1)?").a(new A.em(b3)),!1,r.c)}},
bx(a,b){var s
if(b!=null){J.aG(b,a)
s=b.style
s.display="block"}},
aq(){var s=this,r="none",q=s.CW
q===$&&A.a2()
q.gbs(0).q(0,new A.ev())
q=s.e
q===$&&A.a2()
J.ac(q).l(0,"active")
s.b="view-login"
q=s.at
q===$&&A.a2()
q=q.style
q.display=r
q=s.ax
q===$&&A.a2()
q=q.style
q.display=r
q=s.ay
q===$&&A.a2()
if(q!=null){q=q.style
q.display=r}},
av(a){var s,r=this
t.P.a(a)
s=r.e
s===$&&A.a2()
J.ac(s).v(0,"active")
s=r.CW
s===$&&A.a2()
s.gbs(0).q(0,new A.f8())
r.d=null
s=window.localStorage
s.toString
B.i.v(s,"waterhall_resident_session")
s=r.at
s===$&&A.a2()
s.setAttribute("style","display: flex !important")
s=r.ax
s===$&&A.a2()
s.setAttribute("style","display: none !important")
s=r.ay
s===$&&A.a2()
if(s!=null){s=s.style
s.display="none"}r.a4("view-dashboard")
r.ag()
r.a3()
r.af()
r.bl()
r.dw()},
a4(a){var s,r,q,p=this
if(p.a==null&&p.d==null&&a!=="view-login"){p.aq()
return}p.b=a
s=document
s.toString
r=t.h
A.k0(r,r,"T","querySelectorAll")
s=s.querySelectorAll(".nav-tab")
s.toString
q=new A.bD(s,t.cD)
q.q(q,new A.fe(a))
s=p.CW
s===$&&A.a2()
s.q(0,new A.ff(a))
if(a==="view-dashboard")p.ag()
else if(a==="view-directory")p.a3()
else if(a==="view-assets")p.af()
else if(a==="view-profile")p.bl()
else if(a==="view-billing")p.cf(null)
else if(a==="view-resident-home"||a==="view-resident-ledger"||a==="view-resident-support")p.cg()},
ag(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=this,a2="var(--alert-green)",a3=".alert-widget-title",a4="var(--amber-safety)"
if(a1.a==null)return
s=document
r=s.getElementById("dash-worker-title")
if(r!=null)J.o(r,"Field Terminal: "+A.d(a1.a.i(0,"selected_zone")))
q=$.G()
p=q.a
o=q.b
n=q.c
q=A.K(p)
m=q.h("M<1>")
l=A.b0(new A.M(p,q.h("E(1)").a(new A.eO()),m),!0,m.h("j.E"))
k=A.n([],t.gE)
if(J.q(o.i(0,"ph_status"),"warning")){q=t.N
B.b.l(k,A.B(["type","quality","name","Central Reservoir pH Alert","desc",A.l(o.i(0,"ph_desc"))],q,q))
j=1}else j=0
if(J.q(o.i(0,"turbidity_status"),"warning")){++j
q=t.N
B.b.l(k,A.B(["type","quality","name","Central Turbidity Alert","desc",A.l(o.i(0,"turbidity_desc"))],q,q))}i=l.length+j
h=s.getElementById("dash-alert-count")
if(h!=null)J.o(h,B.e.j(i))
g=s.getElementById("dashboard-alert-widget")
f=s.getElementById("dash-alert-list")
if(g!=null&&f!=null){q=J.F(f)
q.sC(f,"")
if(i===0){m=g.style
m.borderColor=a2
e=t.dg.a(g.querySelector(a3))
if(e!=null){m=e.style
m.color=a2}q.sC(f,'          <div class="alert-item" style="border-left-color: var(--alert-green); background-color: rgba(16, 185, 129, 0.05)">\n            <div class="alert-item-icon">\n              <svg style="fill: var(--alert-green)" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n            </div>\n            <div class="alert-item-text" style="color: var(--text-on-dark)">No active leaks or water quality issues in Brgy. Tagpopongan.</div>\n          </div>\n        ')}else{q=g.style
q.borderColor=a4
e=t.dg.a(g.querySelector(a3))
if(e!=null){q=e.style
q.color=a4}B.b.q(l,new A.eP(a1,f))
B.b.q(k,new A.eQ(a1,f))}}d=A.n(["Purok 1","Purok 2","Purok 3","Purok 4","Purok 5","Purok 6"],t.s)
new A.b_(d,t.ey).q(0,new A.eR(a1,p))
c=s.getElementById("dashboard-zone-grid")
if(c!=null){J.aG(c,"")
B.b.q(d,new A.eS(a1,p,c))}b=s.getElementById("dash-log-count")
a=s.getElementById("dash-log-list")
if(a!=null){s=J.F(a)
s.sC(a,"")
a0=A.le(n,0,A.bK(3,"count",t.S),A.K(n).c).aM(0)
if(b!=null)J.o(b,""+n.length+" logged")
if(a0.length===0)s.sC(a,'<div class="log-card" style="color:var(--text-muted)">No maintenance activity logged yet.</div>')
else B.b.q(a0,new A.eT(a1,p,a))}},
a3(){var s,r,q,p,o,n,m=null,l=$.G().a,k=document,j=t.f.a(k.getElementById("dir-search")),i=t.Z,h=i.a(k.getElementById("filter-purok")),g=i.a(k.getElementById("filter-status"))
if(j==null)s=m
else{i=j.value
i=i==null?m:B.a.K(i.toLowerCase())
s=i}if(s==null)s=""
r=h==null?m:h.value
if(r==null)r="all"
q=g==null?m:g.value
if(q==null)q="all"
p=k.getElementById("dir-empty-state")
o=k.getElementById("dir-household-list")
if(o==null)return
J.aG(o,"")
k=A.K(l)
i=k.h("M<1>")
n=A.b0(new A.M(l,k.h("E(1)").a(new A.eV(s,r,q)),i),!0,i.h("j.E"))
if(n.length===0){if(p!=null){k=p.style
k.display="block"}}else{if(p!=null){k=p.style
k.display="none"}B.b.q(n,new A.eW(this,o))}},
cb(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f="current_leak_status"
g.c=a
s=$.G().a9(a)
if(s==null)return
r=document
q=r.getElementById("modal-owner-name")
p=r.getElementById("modal-acct-num")
o=r.getElementById("modal-current-m3")
n=r.getElementById("modal-flow-rate")
if(q!=null)J.o(q,A.al(J.k(s,"owner_name")))
if(p!=null){m=J.t(s)
J.o(p,A.d(m.i(s,"house_id"))+" | "+A.d(m.i(s,"account_number")))}if(o!=null)J.o(o,B.c.p(A.u(J.k(s,"current_m3_usage")),1))
if(n!=null)J.o(n,B.c.p(A.u(J.k(s,"flow_rate")),2))
m=t.J
l=m.a(r.getElementById("modal-leak-toggle"))
if(l!=null)B.f.saD(l,J.q(J.k(s,f),"leak"))
k=J.t(s)
g.bq(A.l(k.i(s,f)))
g.ci(A.Q(t.R.a(k.i(s,"monthly_history")),t.o),"chart-container")
g.bk(a)
j=t.q.a(r.getElementById("log-desc"))
i=m.a(r.getElementById("log-resolved"))
if(j!=null)B.q.sF(j,"")
if(i!=null)B.f.saD(i,J.q(k.i(s,f),"leak"))
h=r.getElementById("house-detail-modal")
if(h!=null)J.ac(h).l(0,"active")},
bY(){var s=document.getElementById("house-detail-modal")
if(s!=null)J.ac(s).v(0,"active")
this.c=null
this.ag()
this.a3()},
bq(a){var s=document,r=s.getElementById("modal-leak-title"),q=s.getElementById("modal-leak-desc")
if(r==null||q==null)return
s=J.F(r)
if(a==="leak"){s.sW(r,"Leak State Sim: HIGH CONSTANT FLOW")
s=r.style
s.color="var(--alert-red)"
J.o(q,"Meter detects flow rate exceeds safety coefficient threshold.")}else{s.sW(r,"Flow State Sim: NORMAL FLOW")
s=r.style
s.color="var(--alert-green)"
J.o(q,"Meter flow matches normal residential consumption metrics.")}},
ci(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d="var(--amber-safety)",c={}
t.bj.a(a)
s=document.getElementById(b)
if(s==null)return
r=J.F(s)
r.sC(s,"")
if(a.length===0){r.sC(s,'<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:12px">No historic telemetry available.</div>')
return}q=B.b.dF(a,new A.f3())
if(typeof q!=="number")return q.aR()
p=B.c.aE(q*1.1,10,1000)
o=A.n(["Mar","Apr","May","Jun"],t.s)
q=new A.b_(a,A.K(a).h("b_<1>"))
n=q.gdn(q).ar(0,new A.f4(a,p,o),t.U).aM(0)
q=A.K(n)
m=q.h("a(1)")
q=q.h("a_<1,a>")
l=new A.a_(n,m.a(new A.f5()),q).U(0," ")
if(0>=n.length)return A.c(n,0)
k=B.c.p(A.u(J.k(n[0],"x")),1)
j=B.e.p(80,1)
q=new A.a_(n,m.a(new A.f6()),q).U(0," ")
m=n.length
i=m-1
if(!(i>=0))return A.c(n,i)
i=B.c.p(A.u(J.k(n[i],"x")),1)
m=B.e.p(80,1)
h=b==="resident-chart-container"
g=h?"res-chart-grad":"chart-area-grad"
f=h?"#3B82F6":d
e=h?"#3B82F6":d
c.a='      <svg width="100%" height="100%" viewBox="0 0 340 100" style="overflow:visible">\n        <defs>\n          <linearGradient id="'+g+'" x1="0" y1="0" x2="0" y2="1">\n            <stop offset="0%" stop-color="'+e+'" stop-opacity="0.3"/>\n            <stop offset="100%" stop-color="'+e+'" stop-opacity="0.0"/>\n          </linearGradient>\n        </defs>\n        \n        <line x1="20" y1="20" x2="320" y2="20" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="50" x2="320" y2="50" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="80" x2="320" y2="80" stroke="#CBD5E1" stroke-width="1.5"/>\n        \n        <path d="'+("M "+k+","+j+" "+q+(" L "+i+","+m+" Z"))+'" fill="url(#'+g+')" />\n        <polyline points="'+l+'" fill="none" stroke="'+f+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>\n    '
B.b.q(n,new A.f7(c,f))
c=c.a+="</svg>"
r.sC(s,c)},
bk(a){var s,r,q,p,o,n=document.getElementById("modal-historical-logs")
if(n==null)return
s=J.F(n)
s.sC(n,"")
r=$.G().c
q=A.K(r)
p=q.h("M<1>")
o=A.b0(new A.M(r,q.h("E(1)").a(new A.eX(a)),p),!0,p.h("j.E"))
if(o.length===0)s.sC(n,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous repair logs recorded for this meter.</div>')
else B.b.q(o,new A.eY(this,n))},
af(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b="main_tank_level",a="ph_level",a0="turbidity",a1="reservoir-status-banner",a2="var(--amber-safety)",a3="var(--alert-green)",a4="ph_status",a5="turbidity_status",a6=$.G().b,a7=document,a8=t.a6,a9=a8.a(a7.getElementById("slider-tank")),b0=a8.a(a7.getElementById("slider-ph")),b1=a8.a(a7.getElementById("slider-turbidity")),b2=a7.getElementById("sim-tank-val"),b3=a7.getElementById("sim-ph-val"),b4=a7.getElementById("sim-turbidity-val")
a8=a7.activeElement
if((a8==null?a9!=null:a8!==a9)&&a9!=null){B.f.sF(a9,J.L(a6.i(0,b)))
if(b2!=null)J.o(b2,A.d(a6.i(0,b))+"%")}a8=a7.activeElement
if((a8==null?b0!=null:a8!==b0)&&b0!=null){B.f.sF(b0,J.L(a6.i(0,a)))
if(b3!=null)J.o(b3,B.c.p(A.u(a6.i(0,a)),1))}a8=a7.activeElement
if((a8==null?b1!=null:a8!==b1)&&b1!=null){B.f.sF(b1,J.L(a6.i(0,a0)))
if(b4!=null)J.o(b4,B.c.p(A.u(a6.i(0,a0)),1)+" NTU")}s=a7.getElementById("asset-tank-percent")
r=a7.getElementById("asset-tank-fill")
q=a7.getElementById("asset-tank-banner")
p=A.bc(a6.i(0,b))
if(s!=null)J.o(s,""+p+"%")
a8=r!=null
if(a8){o=r.style
o.height=""+p+"%"}if(q!=null&&a8)if(p<30){J.o(q,"CRITICAL: Low Water Reserve. High pressure risk in Zone 4 & 5!")
q.className="reservoir-status-banner low"
a8=r.style
a8.background="linear-gradient(180deg, #F87171 0%, #DC2626 100%)"}else{a8=J.F(q)
if(p<50){a8.sW(q,"WARNING: Moderate Reserve. Stabilizing flow valves recommended.")
q.className=a1
a8=q.style
a8.backgroundColor="var(--alert-amber-bg)"
a8=q.style
a8.borderColor="rgba(249, 115, 22, 0.3)"
a8=q.style
a8.color=a2
a8=r.style
a8.background="linear-gradient(180deg, #FBBF24 0%, #D97706 100%)"}else{a8.sW(q,"Reservoir Status: Normal Operating Pressure")
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
j=A.u(a6.i(0,a))
if(n!=null)J.o(n,B.c.p(j,1))
if(l!=null){i=B.c.aE((j-4)/6*100,0,100)
a8=l.style
a8.left=A.d(i)+"%"}if(m!=null){J.o(m,J.L(a6.i(0,a4)).toUpperCase())
m.className="quality-badge "+A.d(a6.i(0,a4))}if(k!=null)J.o(k,A.al(a6.i(0,"ph_desc")))
h=a7.getElementById("asset-turbidity-val")
g=a7.getElementById("asset-turbidity-badge")
f=a7.getElementById("asset-turbidity-fill")
e=a7.getElementById("asset-turbidity-desc")
d=A.u(a6.i(0,a0))
if(h!=null)J.o(h,B.c.p(d,1))
if(f!=null){c=B.c.aE(d/12*100,0,100)
a7=f.style
a7.width=A.d(c)+"%"
if(J.q(a6.i(0,a5),"warning")){a7=f.style
a7.backgroundColor=a2}else{a7=f.style
a7.backgroundColor=a3}}if(g!=null){J.o(g,J.L(a6.i(0,a5)).toUpperCase())
g.className="quality-badge "+A.d(a6.i(0,a5))}if(e!=null)J.o(e,A.al(a6.i(0,"turbidity_desc")))},
bl(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this
if(f.a==null)return
s=document
r=s.getElementById("worker-name")
q=s.getElementById("worker-role")
p=s.getElementById("worker-zone-lbl")
o=s.getElementById("worker-avatar")
if(r!=null)J.o(r,A.al(f.a.i(0,"name")))
if(q!=null)J.o(q,A.al(f.a.i(0,"role")))
if(p!=null)J.o(p,"Assigned Zone: "+A.d(f.a.i(0,"selected_zone")))
if(o!=null){n=A.n(J.L(f.a.i(0,"name")).split(" "),t.s)
J.o(o,B.a.n(new A.a_(n,t.dG.a(new A.eZ()),t.e).U(0,""),0,B.e.aE(n.length,1,2)).toUpperCase())}m=$.G()
l=m.a
k=A.K(l)
j=new A.M(l,k.h("E(1)").a(new A.f_(f)),k.h("M<1>")).gk(0)
m=m.c
k=A.K(m)
i=new A.M(m,k.h("E(1)").a(new A.f0(f)),k.h("M<1>")).gk(0)
h=s.getElementById("profile-stat-total")
g=s.getElementById("profile-stat-logs")
if(h!=null)J.o(h,B.e.j(j))
if(g!=null)J.o(g,B.e.j(i))},
dw(){var s,r,q=this,p=document,o=t.f,n=o.a(p.getElementById("bill-meter-search")),m=p.getElementById("bill-meter-results"),l=o.a(p.getElementById("bill-curr-input")),k=t.r.a(p.getElementById("btn-save-bill"))
if(n==null)return
o=t.E
s=o.h("~(1)?")
o=o.c
A.w(n,"focus",s.a(new A.ew(q)),!1,o)
A.w(n,"input",s.a(new A.ex(q)),!1,o)
if(l!=null)A.w(l,"input",s.a(new A.ey(q)),!1,o)
A.w(p,"click",t.h2.a(new A.ez(n,m)),!1,t.V)
if(k!=null){p=t.C
A.w(k,"click",p.h("~(1)?").a(new A.eA(q)),!1,p.c)}r=$.G().a
p=r.length
if(p!==0){if(0>=p)return A.c(r,0)
q.cx=A.al(J.k(r[0],"house_id"))
if(0>=r.length)return A.c(r,0)
p=A.d(J.k(r[0],"owner_name"))
if(0>=r.length)return A.c(r,0)
B.f.sF(n,p+" ("+A.d(J.k(r[0],"account_number"))+")")}},
bw(){var s,r,q,p,o=document,n=t.f.a(o.getElementById("bill-meter-search")),m=o.getElementById("bill-meter-results")
if(n==null||m==null)return
o=n.value
s=o==null?null:B.a.K(o.toLowerCase())
if(s==null)s=""
r=$.G().a
o=A.K(r)
q=o.h("M<1>")
p=A.b0(new A.M(r,o.h("E(1)").a(new A.fa(s)),q),!0,q.h("j.E"))
q=J.F(m)
q.sC(m,"")
if(p.length===0){q.sC(m,'<div class="search-result-item" style="color:var(--text-muted); cursor:default">No households found</div>')
o=m.style
o.display="block"
return}B.b.q(p,new A.fb(this,n,m))
o=m.style
o.display="block"},
cf(a){var s,r,q,p,o,n,m,l,k=this,j="current_m3_usage",i=a!=null
if(i)k.cx=a
s=k.cx
if(s==null)return
r=$.G()
q=r.a9(s)
if(q==null)return
s=document
p=s.getElementById("bill-prev-reading")
o=t.f.a(s.getElementById("bill-curr-input"))
s=k.cx
s.toString
n=r.aQ(s)
s=n.length
if(s!==0){if(0>=s)return A.c(n,0)
m=A.u(J.k(n[0],"current_reading"))}else{s=J.t(q)
l=A.Q(t.R.a(s.i(q,"monthly_history")),t.o)
r=l.length
m=r>=2?l[r-2]:A.u(s.i(q,j))-2.5}if(p!=null)J.o(p,B.c.p(m,1))
if(i&&o!=null)B.f.sF(o,B.c.p(A.u(J.k(q,j)),1))
k.bo()
i=k.cx
i.toString
k.ce(i)},
bo(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
if(this.cx==null)return
s=document
r=s.getElementById("bill-prev-reading")
q=t.f.a(s.getElementById("bill-curr-input"))
p=r==null?null:r.textContent
o=A.b3(p==null?"":p)
if(o==null)o=0
p=q==null?null:q.value
n=A.b3(p==null?"":p)
m=(n==null?0:n)-o
if(m<0)m=0
l=s.getElementById("bill-calc-consumption")
if(l!=null)J.o(l,B.c.p(m,1))
k=m>10?(m-10)*15:0
j=s.getElementById("bill-calc-excess")
if(j!=null)J.o(j,B.c.p(k,2))
i=s.getElementById("bill-calc-total")
if(i!=null)J.o(i,B.c.p(120+k+50,2))
p=$.G()
h=this.cx
h.toString
g=p.c4(h,"June 2026")
f=s.getElementById("billing-alert-banner")
e=t.r.a(s.getElementById("btn-save-bill"))
if(f!=null){s=J.F(f)
if(g){s.sC(f,'          <svg style="width:18px;height:18px;fill:currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n          <span>DOUBLE-BILLING BLOCKED: Bill already registered for June 2026.</span>\n        ')
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
B.l.bO(s,B.l.bE(s,"opacity"),"0.5","")
s=e.style
s.cursor="not-allowed"
d=e.querySelector("span")
if(d!=null)J.o(d,"Register Blocked (Billed)")}}else{s.sC(f,'          <svg style="width:18px;height:18px;fill:currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n          <span>CLEAR: Safe to bill June 2026. No duplicates found.</span>\n        ')
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
B.l.bO(s,B.l.bE(s,"opacity"),"1","")
s=e.style
s.cursor="pointer"
d=e.querySelector("span")
if(d!=null)J.o(d,"Register & Save Bill")}}}},
cu(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d=null,c=e.cx
if(c==null||e.a==null)return
s=$.G()
c.toString
if(s.c4(c,"June 2026")){e.D("Operation blocked to prevent double-billing!")
return}c=document
r=c.getElementById("bill-prev-reading")
q=t.f.a(c.getElementById("bill-curr-input"))
p=c.getElementById("bill-calc-consumption")
o=c.getElementById("bill-calc-excess")
c=r==null?d:r.textContent
n=A.b3(c==null?"":c)
if(n==null)n=0
c=q==null?d:q.value
m=A.b3(c==null?"":c)
if(m==null)m=0
c=p==null?d:p.textContent
l=A.b3(c==null?"":c)
if(l==null)l=0
c=o==null?d:o.textContent
k=A.b3(c==null?"":c)
c=120+(k==null?0:k)
j=e.cx
j.toString
i=s.a9(j)
if(i==null)return
j=J.t(i)
h=t.N
g=t.z
c=t.P.a(A.B(["house_id",e.cx,"account_number",j.i(i,"account_number"),"billing_month","June 2026","previous_reading",n,"current_reading",m,"consumption",l,"water_charge",c,"maintenance_fee",50,"total_due",c+50,"billed_by",e.a.i(0,"worker_id")],h,g))
f=s.e
h=A.bq(h,g)
h.m(0,"bill_id","BILL-"+(5000+B.j.ae(5000)))
h.m(0,"date",new A.af(Date.now(),!1).aj().ai())
h.m(0,"status","Pending")
h.R(0,c)
B.b.bf(f,0,h)
s.a1("/api/billing-records/add",h)
h=window.localStorage
h.toString
h.setItem("waterhall_billing_records",B.d.t(f))
e.D("June 2026 bill registered for "+A.d(j.i(i,"owner_name"))+"!")
e.bo()
j=e.cx
j.toString
e.ce(j)
e.bl()},
ce(a){var s,r,q=document.getElementById("billing-history-list")
if(q==null)return
s=J.F(q)
s.sC(q,"")
r=$.G().aQ(a)
if(r.length===0)s.sC(q,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous invoice logs recorded.</div>')
else B.b.q(r,new A.eE(this,q))},
by(a,b){var s=document,r=s.getElementById("app-toast"),q=s.getElementById("toast-text")
if(r!=null&&q!=null){J.o(q,a)
J.ac(r).l(0,"show")
s=this.cy
if(s!=null)s.dd()
this.cy=A.lf(A.i8(b,0),new A.fd(r))}},
D(a){return this.by(a,2500)},
aw(a){var s,r=this
r.d=a
window.localStorage.setItem("waterhall_resident_session",a)
r.sX(null)
s=window.localStorage
s.toString
B.i.v(s,"waterhall_session")
s=r.e
s===$&&A.a2()
J.ac(s).v(0,"active")
s=r.CW
s===$&&A.a2()
s.gbs(0).q(0,new A.fc())
s=r.at
s===$&&A.a2()
s.setAttribute("style","display: none !important")
s=r.ax
s===$&&A.a2()
s.setAttribute("style","display: flex !important")
s=r.ay
s===$&&A.a2()
if(s!=null){s=s.style
s.display="none"}r.a4("view-resident-home")},
cg(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3=this,b4="warning",b5="var(--alert-red)",b6="var(--alert-green)",b7="monthly_history",b8="current_m3_usage",b9=b3.d
if(b9==null)return
q=$.G()
p=q.a9(b9)
if(p==null)return
o=q.cs()
b9=document
n=b9.getElementById("resident-announcement-banner")
m=b9.getElementById("resident-announcement-message")
if(n!=null&&m!=null)if(o!=null){J.o(m,A.al(J.k(o,"message")))
l=n.style
l.display="flex"}else{l=n.style
l.display="none"}k=q.b
j=b9.getElementById("resident-tank-val")
i=b9.getElementById("resident-ph-val")
h=b9.getElementById("resident-turb-val")
g=b9.getElementById("resident-safety-status")
if(j!=null)J.o(j,A.d(k.i(0,"main_tank_level"))+"%")
if(i!=null)J.o(i,B.c.p(A.u(k.i(0,"ph_level")),1))
if(h!=null)J.o(h,B.c.p(A.u(k.i(0,"turbidity")),1))
if(g!=null){l=J.q(k.i(0,"ph_status"),b4)||J.q(k.i(0,"turbidity_status"),b4)
f=J.F(g)
if(l){f.sW(g,"ALERT")
l=g.style
l.color=b5}else{f.sW(g,"SAFE")
l=g.style
l.color=b6}}e=b9.getElementById("resident-profile-name-home")
d=b9.getElementById("resident-profile-meta-home")
if(e!=null)J.o(e,A.al(J.k(p,"owner_name")))
if(d!=null){l=J.t(p)
J.o(d,"Meter ID: "+A.d(l.i(p,"house_id"))+" | "+A.d(l.i(p,"account_number"))+" | "+A.d(l.i(p,"purok")))}c=b9.getElementById("resident-leak-flag")
if(c!=null){l=J.F(c)
if(J.q(J.k(p,"current_leak_status"),"leak")){l.sC(c,'          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n          <span>Leak Alert Warning: High constant flow rate registered. Please inspect on-site faucets.</span>\n        ')
c.className="reservoir-status-banner low"
l=c.style
l.backgroundColor="var(--alert-red-bg)"
l=c.style
l.borderColor="rgba(239, 68, 68, 0.3)"
l=c.style
l.color=b5}else{l.sC(c,'          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n          <span>Normal Flow Clearance: IoT sensors verify secure line pressure. No leak detected.</span>\n        ')
c.className="reservoir-status-banner"
l=c.style
l.backgroundColor="var(--alert-green-bg)"
l=c.style
l.borderColor="rgba(16, 185, 129, 0.2)"
l=c.style
l.color=b6}}l=b3.d
l.toString
s=q.aQ(l)
r=null
try{r=J.e0(s,new A.f1())}catch(b){}if(r!=null){a=A.u(J.k(r,"previous_reading"))
a0=A.u(J.k(r,"current_reading"))
a1=A.u(J.k(r,"consumption"))
a2=a1>10?(a1-10)*15:0
a3=A.u(J.k(r,"total_due"))
a4=A.l(J.k(r,"status"))
a5=J.q(J.k(r,"status"),"Paid")?"normal":b4}else{q=J.t(p)
a6=A.Q(t.R.a(q.i(p,b7)),t.o)
l=a6.length
a=l>=2?a6[l-2]:A.u(q.i(p,b8))-2.5
a0=A.u(q.i(p,b8))
a1=a0-a
if(a1<0)a1=0
a2=a1>10?(a1-10)*15:0
a3=120+a2+50
a5=b4
a4="Unbilled (Draft)"}a7=b9.getElementById("resident-prev-reading")
a8=b9.getElementById("resident-curr-reading")
a9=b9.getElementById("resident-calc-consumption")
b0=b9.getElementById("resident-calc-excess")
b1=b9.getElementById("resident-calc-total")
b2=b9.getElementById("resident-bill-status")
if(a7!=null)J.o(a7,B.c.p(a,1))
if(a8!=null)J.o(a8,B.c.p(a0,1))
if(a9!=null)J.o(a9,B.c.p(a1,1))
if(b0!=null)J.o(b0,B.c.p(a2,2))
if(b1!=null)J.o(b1,B.c.p(a3,2))
if(b2!=null){J.o(b2,a4.toUpperCase())
b2.className="quality-badge "+a5}b3.ci(A.Q(t.R.a(J.k(p,b7)),t.o),"resident-chart-container")
b3.dI(s)},
dI(a){var s,r
t.p.a(a)
s=document.getElementById("resident-history-list")
if(s==null)return
r=J.F(s)
r.sC(s,"")
if(a.length===0){r.sC(s,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No billing history available.</div>')
return}B.b.q(a,new A.f2(this,s))},
cT(){var s,r=document,q=r.getElementById("btn-open-register-modal"),p=r.getElementById("register-user-modal"),o=r.getElementById("btn-close-register-modal"),n=r.getElementById("btn-submit-register"),m=t.Z.a(r.getElementById("reg-role")),l=r.getElementById("reg-resident-fields"),k=r.getElementById("reg-worker-fields")
if(m!=null){r=t.E
A.w(m,"change",r.h("~(1)?").a(new A.e5(m,l,k)),!1,r.c)}if(q!=null){r=J.au(q)
s=r.$ti
A.w(r.a,r.b,s.h("~(1)?").a(new A.e6(p)),!1,s.c)}if(o!=null){r=J.au(o)
s=r.$ti
A.w(r.a,r.b,s.h("~(1)?").a(new A.e7(p)),!1,s.c)}if(n!=null){r=J.au(n)
s=r.$ti
A.w(r.a,r.b,s.h("~(1)?").a(new A.e8(this,m,p)),!1,s.c)}},
sX(a){this.a=t.c9.a(a)},
scH(a){this.CW=t.u.a(a)}}
A.eD.prototype={
$0(){var s,r,q,p,o=document.getElementById("phone-time")
if(o!=null){s=new A.af(Date.now(),!1)
r=A.aJ(s)
q=B.a.Z(B.e.j(A.bs(s)),2,"0")
p=r>=12?"PM":"AM"
r=B.e.aa(r,12)
J.o(o,""+(r!==0?r:12)+":"+q+" "+p)}},
$S:2}
A.eB.prototype={
$1(a){t.D.a(a)
return this.a.$0()},
$S:34}
A.eC.prototype={
$1(a){return this.cr(t.D.a(a))},
cr(a){var s=0,r=A.dX(t.H),q=this,p,o
var $async$$1=A.dZ(function(b,c){if(b===1)return A.dU(c,r)
while(true)switch(s){case 0:o=q.a
s=o.a!=null||o.d!=null?2:3
break
case 2:s=4
return A.dT($.G().aL(),$async$$1)
case 4:if(o.d!=null)o.cg()
else{p=o.b
if(p==="view-dashboard")o.ag()
else if(p==="view-directory")o.a3()
else if(p==="view-assets")o.af()}case 3:return A.dV(null,r)}})
return A.dW($async$$1,r)},
$S:53}
A.eb.prototype={
$1(a){var s,r,q,p,o
t.V.a(a)
s=$.G().a
try{r=J.e0(s,new A.ea())
q=window.localStorage
q.toString
B.i.v(q,"waterhall_session")
q=this.a
q.sX(null)
q.aw(A.l(J.k(r,"house_id")))
p=this.b
if(p!=null){p=p.style
p.display="none"}q.D("Quick Login: "+A.l(J.k(r,"owner_name")))}catch(o){}},
$S:0}
A.ea.prototype={
$1(a){return J.L(J.k(t.P.a(a),"account_number")).toLowerCase()==="tag-2026-0041"},
$S:1}
A.ec.prototype={
$1(a){var s,r,q,p,o,n,m
t.V.a(a)
s=$.G()
r=s.d
if(r.length!==0){q=B.b.gc_(r)
p=J.t(q)
o=A.l(p.i(q,"name"))
n=A.l(p.i(q,"worker_id"))
p=p.i(q,"zone")
m=s.br(o,n,A.l(p==null?"Purok 1":p))
if(m!=null){s=this.a
s.sX(m)
p=window.localStorage
p.toString
p.setItem("waterhall_session",B.d.t(m))
p=window.localStorage
p.toString
B.i.v(p,"waterhall_resident_session")
p=this.b
if(p!=null){p=p.style
p.display="none"}s.av(m)
s.D("Quick Login: Tech "+A.l(m.i(0,"name")))}}},
$S:0}
A.ed.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this,i=null,h="waterhall_session",g="house_id",f="none",e="Logged in as Resident: ",d="owner_name",c="waterhall_resident_session",b="Logged in as Tech: "
t.V.a(a)
s=j.b
if(s==null)r=i
else{s=s.value
s=s==null?i:B.a.K(s)
r=s}if(r==null)r=""
s=j.c
if(s==null)q=i
else{s=s.value
s=s==null?i:B.a.K(s)
q=s}if(q==null)q=""
s=j.d
p=s==null?i:s.value
if(p==null)p=""
if(r.length===0||q.length===0){j.a.bx("Both Username and Password are required.",j.e)
return}s=t.d.a(window.location).href
s.toString
o=A.jm(s).gbj().i(0,"role")
if(o==="resident"){n=$.G().cn(r,q)
if(n!=null){s=window.localStorage
s.toString
B.i.v(s,h)
s=j.a
s.sX(i)
m=J.t(n)
s.aw(A.l(m.i(n,g)))
l=j.e
if(l!=null){l=l.style
l.display=f}s.D(e+A.l(m.i(n,d)))
return}}else if(o==="worker"){k=$.G().br(r,q,p)
if(k!=null){s=j.a
s.sX(k)
m=window.localStorage
m.toString
m.setItem(h,B.d.t(k))
m=window.localStorage
m.toString
B.i.v(m,c)
m=j.e
if(m!=null){m=m.style
m.display=f}s.av(k)
s.D(b+A.l(k.i(0,"name")))
return}}else{s=$.G()
k=s.br(r,q,p)
if(k!=null){s=j.a
s.sX(k)
m=window.localStorage
m.toString
m.setItem(h,B.d.t(k))
m=window.localStorage
m.toString
B.i.v(m,c)
m=j.e
if(m!=null){m=m.style
m.display=f}s.av(k)
s.D(b+A.l(k.i(0,"name")))
return}n=s.cn(r,q)
if(n!=null){s=window.localStorage
s.toString
B.i.v(s,h)
s=j.a
s.sX(i)
m=J.t(n)
s.aw(A.l(m.i(n,g)))
l=j.e
if(l!=null){l=l.style
l.display=f}s.D(e+A.l(m.i(n,d)))
return}}j.a.bx('Credentials "'+r+'" not recognized. Check details.',j.e)},
$S:0}
A.en.prototype={
$1(a){var s,r
t.V.a(a)
s=window.localStorage
s.toString
B.i.v(s,"waterhall_session")
s=this.a
s.sX(null)
s.aq()
r=this.b
if(r!=null)B.f.sF(r,"")
r=this.c
if(r!=null)B.f.sF(r,"")
s.D("Signed out of Tech session")},
$S:0}
A.eo.prototype={
$1(a){var s,r
t.V.a(a)
s=window.localStorage
s.toString
B.i.v(s,"waterhall_resident_session")
s=this.a
s.d=null
s.aq()
r=this.b
if(r!=null)B.f.sF(r,"")
s.D("Signed out of Resident Portal")},
$S:0}
A.ep.prototype={
$1(a){var s,r
t.h.a(a)
s=J.au(a)
r=s.$ti
A.w(s.a,s.b,r.h("~(1)?").a(new A.e9(this.a,a)),!1,r.c)},
$S:5}
A.e9.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.b.getAttribute("data-target")
if(s==null)s=""
this.a.a4(s)},
$S:0}
A.eq.prototype={
$1(a){return this.a.a3()},
$S:3}
A.er.prototype={
$1(a){return this.a.a3()},
$S:3}
A.es.prototype={
$1(a){return this.a.a3()},
$S:3}
A.et.prototype={
$1(a){t.V.a(a)
return this.a.bY()},
$S:0}
A.eu.prototype={
$1(a){var s=A.jO(t.V.a(a).target),r=this.b
if(s==null?r==null:s===r)this.a.bY()},
$S:0}
A.ee.prototype={
$1(a){var s,r,q,p,o,n=this.a,m=n.c
if(m==null)return
s=this.b.checked
r=s===!0?"leak":"normal"
q=$.G().ck(m,r)
if(q!=null){m=document
p=m.getElementById("modal-flow-rate")
if(p!=null)J.o(p,B.c.p(A.u(J.k(q,"flow_rate")),2))
n.bq(r)
n.D(r==="leak"?"Simulated Leak ALERT activated!":"Simulated Normal flow rate restored.")
s=n.c
s.toString
n.bk(s)
o=t.J.a(m.getElementById("log-resolved"))
if(o!=null)B.f.saD(o,r==="normal")}},
$S:3}
A.ef.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f
t.V.a(a)
s=this.a
if(s.c==null||s.a==null)return
r=document
q=t.q.a(r.getElementById("log-desc"))
p=q==null
if(p)o=null
else{n=q.value
n=n==null?null:B.a.K(n)
o=n}if(o==null)o=""
n=t.J
m=n.a(r.getElementById("log-resolved"))
l=m==null?null:m.checked
k=l!==!1
if(o.length===0){s.D("Please detail the maintenance actions taken.")
return}j=A.B(["house_id",s.c,"worker_id",s.a.i(0,"worker_id"),"purok",s.a.i(0,"selected_zone"),"description",o,"status_resolved",k,"date",new A.af(Date.now(),!1).aj().ai()],t.N,t.z)
l=$.G()
l.bW(j)
if(k){i=s.c
i.toString
l.ck(i,"normal")
h=n.a(r.getElementById("modal-leak-toggle"))
if(h!=null)B.f.saD(h,!1)
s.bq("normal")}n=s.c
n.toString
g=l.a9(n)
if(g!=null){f=r.getElementById("modal-flow-rate")
if(f!=null)J.o(f,B.c.p(A.u(J.k(g,"flow_rate")),2))}if(!p)B.q.sF(q,"")
s.D("Maintenance Log committed to database!")
r=s.c
r.toString
s.bk(r)
s.ag()},
$S:0}
A.eg.prototype={
$1(a){var s=this.b.value,r=A.ig(s==null?"":s,null)
if(r==null)r=68
s=this.c
if(s!=null)J.o(s,""+r+"%")
s=t.P.a(A.B(["main_tank_level",r],t.N,t.z))
$.G().bp(s)
this.a.af()},
$S:3}
A.eh.prototype={
$1(a){var s=this.b.value,r=A.b3(s==null?"":s)
if(r==null)r=5.8
s=this.c
if(s!=null)J.o(s,B.c.p(r,1))
s=t.P.a(A.B(["ph_level",r],t.N,t.z))
$.G().bp(s)
this.a.af()},
$S:3}
A.ei.prototype={
$1(a){var s=this.b.value,r=A.b3(s==null?"":s)
if(r==null)r=6.2
s=this.c
if(s!=null)J.o(s,B.c.p(r,1)+" NTU")
s=t.P.a(A.B(["turbidity",r],t.N,t.z))
$.G().bp(s)
this.a.af()},
$S:3}
A.ej.prototype={
$1(a){var s,r,q,p,o,n="selected_zone"
t.V.a(a)
s=this.a
if(s.a==null)return
r=document
q=t.Z
p=q.a(r.getElementById("filter-purok"))
o=q.a(r.getElementById("filter-status"))
if(p!=null)B.k.sF(p,A.al(s.a.i(0,n)))
if(o!=null)B.k.sF(o,"leak")
s.a4("view-directory")
s.D("Showing leaks in your assigned patrol zone "+A.d(s.a.i(0,n)))},
$S:0}
A.ek.prototype={
$1(a){t.V.a(a)
this.a.by("Dispatching radio ping to Barangay Office...",3500)},
$S:0}
A.el.prototype={
$1(a){var s,r,q,p,o,n,m
t.V.a(a)
s=this.a
if(s.d==null)return
r=t.q.a(document.getElementById("resident-log-desc"))
q=r==null
if(q)p=null
else{o=r.value
o=o==null?null:B.a.K(o)
p=o}if(p==null)p=""
if(p.length===0){s.D("Please describe the issue (e.g. low pressure, minor leak).")
return}o=$.G()
n=s.d
n.toString
m=o.a9(n)
if(m==null)return
o.bW(A.B(["house_id",s.d,"worker_id","unassigned","purok",J.k(m,"purok"),"description",p+" (RESIDENT REPORTED)","status_resolved",!1],t.N,t.z))
if(!q)B.q.sF(r,"")
s.D("Alert ticket dispatched to field technicians!")
s.ag()},
$S:0}
A.em.prototype={
$1(a){var s,r,q,p,o,n,m
t.V.a(a)
s=this.a
if(s.a==null)return
r=t.q.a(document.getElementById("worker-announcement-input"))
q=r==null
if(q)p=null
else{o=r.value
o=o==null?null:B.a.K(o)
p=o}if(p==null)p=""
if(p.length===0){s.D("Message cannot be empty")
return}o=$.G()
n=t.N
m=A.B(["message",p,"author",A.l(s.a.i(0,"name")),"timestamp",new A.af(Date.now(),!1).aj().ai()],n,n)
B.b.bf(o.f,0,m)
n=window.localStorage
n.toString
n.setItem("waterhall_announcements",B.d.t(o.f))
o.a1("/api/announcements/add",m)
if(!q)B.q.sF(r,"")
s.D("Announcement broadcasted!")},
$S:0}
A.ev.prototype={
$1(a){return J.ac(t.h.a(a)).v(0,"active")},
$S:5}
A.f8.prototype={
$1(a){return J.ac(t.h.a(a)).v(0,"active")},
$S:5}
A.fe.prototype={
$1(a){var s
t.h.a(a)
s=J.F(a)
if(a.getAttribute("data-target")===this.a)s.gad(a).l(0,"active")
else s.gad(a).v(0,"active")},
$S:5}
A.ff.prototype={
$2(a,b){var s
A.l(a)
t.h.a(b)
s=J.F(b)
if(a===this.a)s.gad(b).l(0,"active")
else s.gad(b).v(0,"active")},
$S:39}
A.eO.prototype={
$1(a){return J.q(J.k(t.P.a(a),"current_leak_status"),"leak")},
$S:1}
A.eP.prototype={
$1(a){var s,r,q
t.P.a(a)
s=document.createElement("div")
s.className="alert-item leak"
r=s.style
r.cursor="pointer"
r=J.t(a)
q=J.F(s)
q.sC(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.d(r.i(a,"owner_name"))+" ("+A.d(r.i(a,"purok"))+")</strong><br>\n              Leak alert: Flow rate at "+B.c.p(A.u(r.i(a,"flow_rate")),2)+" L/s constant.\n            </div>\n          ")
q=q.ga7(s)
r=q.$ti
A.w(q.a,q.b,r.h("~(1)?").a(new A.eN(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:4}
A.eN.prototype={
$1(a){t.V.a(a)
this.a.cb(A.l(J.k(this.b,"house_id")))},
$S:0}
A.eQ.prototype={
$1(a){var s,r,q
t.I.a(a)
s=document.createElement("div")
s.className="alert-item quality"
r=s.style
r.cursor="pointer"
r=J.t(a)
q=J.F(s)
q.sC(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.d(r.i(a,"name"))+"</strong><br>\n              "+A.d(r.i(a,"desc"))+"\n            </div>\n          ")
q=q.ga7(s)
r=q.$ti
A.w(q.a,q.b,r.h("~(1)?").a(new A.eM(this.a)),!1,r.c)
this.b.appendChild(s).toString},
$S:41}
A.eM.prototype={
$1(a){t.V.a(a)
this.a.a4("view-assets")},
$S:0}
A.eR.prototype={
$2(a,b){var s,r,q,p,o,n
A.l(b)
s=document.getElementById("pin-p"+(a+1))
if(s!=null){r=s.querySelector(".pin-bg")
q=B.b.ap(this.b,new A.eK(b))
if(r!=null)if(q){r.setAttribute("fill","var(--alert-red)")
r.setAttribute("stroke","#FFF")
r.setAttribute("stroke-width","1.5")}else{r.setAttribute("fill","var(--alert-green)")
r.removeAttribute("stroke")}p=s.style
p.cursor="pointer"
p=J.F(s)
o=t.h.a(p.df(s,!0))
p.dJ(s,o)
p=J.au(o)
n=p.$ti
A.w(p.a,p.b,n.h("~(1)?").a(new A.eL(this.a,b)),!1,n.c)}},
$S:42}
A.eK.prototype={
$1(a){var s
t.P.a(a)
s=J.t(a)
return J.q(s.i(a,"purok"),this.a)&&J.q(s.i(a,"current_leak_status"),"leak")},
$S:1}
A.eL.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Z
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.k.sF(q,this.b)
if(p!=null)B.k.sF(p,"all")
this.a.a4("view-directory")},
$S:0}
A.eS.prototype={
$1(a){var s,r,q,p,o,n,m,l
A.l(a)
s=this.b
r=A.K(s)
q=r.h("E(1)")
r=r.h("M<1>")
p=new A.M(s,q.a(new A.eH(a)),r).gk(0)
o=new A.M(s,q.a(new A.eI(a)),r).gk(0)
r=this.a
n=J.q(r.a.i(0,"selected_zone"),a)
m=document.createElement("div")
m.className="zone-card "+(n?"assigned":"")
s=n?'<span class="zone-badge">ASSIGNED</span>':""
q=o>0?""+o+" Leaks":"Clear"
l=J.F(m)
l.sC(m,'          <div class="zone-card-header">\n            <span class="zone-name">'+a+"</span>\n            "+s+'\n          </div>\n          <div class="zone-stats">\n            <span>Meters: <strong>'+p+'</strong></span>\n            <span class="zone-leak-count">'+q+"</span>\n          </div>\n        ")
l=l.ga7(m)
q=l.$ti
A.w(l.a,l.b,q.h("~(1)?").a(new A.eJ(r,a)),!1,q.c)
this.c.appendChild(m).toString},
$S:43}
A.eH.prototype={
$1(a){return J.q(J.k(t.P.a(a),"purok"),this.a)},
$S:1}
A.eI.prototype={
$1(a){var s
t.P.a(a)
s=J.t(a)
return J.q(s.i(a,"purok"),this.a)&&J.q(s.i(a,"current_leak_status"),"leak")},
$S:1}
A.eJ.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Z
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.k.sF(q,this.b)
if(p!=null)B.k.sF(p,"all")
this.a.a4("view-directory")},
$S:0}
A.eT.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j
t.P.a(a)
s=B.b.c1(this.b,new A.eF(a),new A.eG())
r=J.t(s)
q=r.gO(s)?r.i(s,"owner_name"):"Unknown Household"
p=document.createElement("div")
r=J.t(a)
p.className="log-card "+(J.q(r.i(a,"status_resolved"),!0)?"resolved":"pending")
o=A.bR(A.l(r.i(a,"date"))).aN()
n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
m=B.e.aa(A.aJ(o),12)===0?12:B.e.aa(A.aJ(o),12)
l=B.a.Z(B.e.j(A.bs(o)),2,"0")
k=A.aJ(o)>=12?"PM":"AM"
j=A.cg(o)-1
if(!(j>=0&&j<12))return A.c(n,j)
j=n[j]
J.aG(p,'            <div class="log-card-header">\n              <span>'+A.d(q)+'</span>\n              <span style="font-size:10px; color:var(--text-muted)">'+(j+" "+A.cf(o)+" "+m+":"+l+" "+k)+'</span>\n            </div>\n            <div class="log-card-desc">'+A.d(r.i(a,"description"))+"</div>\n          ")
this.c.appendChild(p).toString},
$S:4}
A.eF.prototype={
$1(a){var s="house_id"
return J.q(J.k(t.P.a(a),s),J.k(this.a,s))},
$S:1}
A.eG.prototype={
$0(){return A.bq(t.N,t.z)},
$S:44}
A.eV.prototype={
$1(a){var s,r,q,p,o
t.P.a(a)
s=J.t(a)
r=this.a
q=B.a.B(J.L(s.i(a,"owner_name")).toLowerCase(),r)||B.a.B(J.L(s.i(a,"account_number")).toLowerCase(),r)||B.a.B(J.L(s.i(a,"house_id")).toLowerCase(),r)
r=this.b
p=r==="all"||J.q(s.i(a,"purok"),r)
r=this.c
o=r==="all"||J.q(s.i(a,"current_leak_status"),r)
return q&&p&&o},
$S:1}
A.eW.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j="current_leak_status"
t.P.a(a)
s=document.createElement("div")
r=J.t(a)
s.className="household-card "+(J.q(r.i(a,j),"leak")?"has-leak":"")
q=A.d(r.i(a,"owner_name"))
p=A.d(r.i(a,"purok"))
o=A.d(r.i(a,"account_number"))
n=A.d(r.i(a,"current_m3_usage"))
m=A.d(r.i(a,j))
l=J.q(r.i(a,j),"leak")?'<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> Leak':'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Normal'
k=J.F(s)
k.sC(s,'          <div class="household-info">\n            <span class="household-name">'+q+'</span>\n            <div class="household-meta">\n              <span class="household-purok">'+p+'</span>\n              <span class="household-acct">'+o+'</span>\n            </div>\n            <div class="household-usage">Usage this Month: <strong>'+n+' m\xb3</strong></div>\n          </div>\n          <div class="household-status-section">\n            <span class="status-indicator '+m+'">\n              '+l+'\n            </span>\n            <span class="household-flow">Flow: <span>'+B.c.p(A.u(r.i(a,"flow_rate")),2)+" L/s</span></span>\n          </div>\n        ")
k=k.ga7(s)
r=k.$ti
A.w(k.a,k.b,r.h("~(1)?").a(new A.eU(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:4}
A.eU.prototype={
$1(a){t.V.a(a)
this.a.cb(A.l(J.k(this.b,"house_id")))},
$S:0}
A.f3.prototype={
$2(a,b){A.u(a)
A.u(b)
return a>b?a:b},
$S:45}
A.f4.prototype={
$1(a){var s,r,q,p
t.ek.a(a)
s=a.a
r=a.b
q=this.a.length
p=this.c
if(s>>>0!==s||s>=4)return A.c(p,s)
return A.B(["x",20+s/(q-1)*300,"y",80-(r-0)/(this.b-0)*60,"val",r,"label",p[s]],t.N,t.K)},
$S:46}
A.f5.prototype={
$1(a){var s
t.U.a(a)
s=J.t(a)
return B.c.p(A.u(s.i(a,"x")),1)+","+B.c.p(A.u(s.i(a,"y")),1)},
$S:19}
A.f6.prototype={
$1(a){var s
t.U.a(a)
s=J.t(a)
return"L "+B.c.p(A.u(s.i(a,"x")),1)+","+B.c.p(A.u(s.i(a,"y")),1)},
$S:19}
A.f7.prototype={
$1(a){var s,r
t.U.a(a)
s=this.a
r=J.t(a)
s.a=s.a+('        <text x="'+A.d(r.i(a,"x"))+'" y="96" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-weight="600">'+A.d(r.i(a,"label"))+'</text>\n        <line x1="'+A.d(r.i(a,"x"))+'" y1="'+A.d(r.i(a,"y"))+'" x2="'+A.d(r.i(a,"x"))+'" y2="80" stroke="rgba(249,115,22,0.2)" stroke-width="1" stroke-dasharray="2 2" />\n        <circle cx="'+A.d(r.i(a,"x"))+'" cy="'+A.d(r.i(a,"y"))+'" r="4" fill="var(--white)" stroke="'+this.b+'" stroke-width="2" />\n        <text x="'+A.d(r.i(a,"x"))+'" y="'+A.d(A.u(r.i(a,"y"))-8)+'" text-anchor="middle" fill="var(--navy-primary)" font-size="9" font-weight="700">'+A.d(r.i(a,"val"))+"m\xb3</text>\n      ")},
$S:48}
A.eX.prototype={
$1(a){return J.q(J.k(t.P.a(a),"house_id"),this.a)},
$S:1}
A.eY.prototype={
$1(a){var s,r,q,p,o,n,m,l,k="status_resolved"
t.P.a(a)
s=document.createElement("div")
r=J.t(a)
s.className="log-card "+(J.q(r.i(a,k),!0)?"resolved":"pending")
q=A.bR(A.l(r.i(a,"date"))).aN()
p=B.a.Z(B.e.j(A.aJ(q)),2,"0")
o=B.a.Z(B.e.j(A.bs(q)),2,"0")
n=A.d(r.i(a,"worker_id"))
m=A.d(r.i(a,"description"))
l=J.q(r.i(a,k),!0)?"var(--alert-green)":"var(--amber-safety)"
r=J.q(r.i(a,k),!0)?"Resolved (Flow Restored)":"In Progress (Active Monitoring)"
J.aG(s,'          <div class="log-card-header">\n            <span>Tech: <strong>'+n+'</strong></span>\n            <span style="font-size:10px; color:var(--text-muted)">'+(""+A.cg(q)+"/"+A.cf(q)+"/"+A.b2(q)+" @ "+p+":"+o)+'</span>\n          </div>\n          <div class="log-card-desc">'+m+'</div>\n          <div style="font-size: 9px; font-weight:700; color:'+l+'; margin-top:4px; text-transform:uppercase">\n            Status: '+r+"\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:4}
A.eZ.prototype={
$1(a){var s
A.l(a)
s=a.length
if(s!==0){if(0>=s)return A.c(a,0)
s=a[0]}else s=""
return s},
$S:17}
A.f_.prototype={
$1(a){return J.q(J.k(t.P.a(a),"purok"),this.a.a.i(0,"selected_zone"))},
$S:1}
A.f0.prototype={
$1(a){var s,r="worker_id"
t.P.a(a)
s=J.t(a)
return J.q(s.i(a,r),this.a.a.i(0,r))&&J.q(s.i(a,"status_resolved"),!0)},
$S:1}
A.ew.prototype={
$1(a){return this.a.bw()},
$S:3}
A.ex.prototype={
$1(a){return this.a.bw()},
$S:3}
A.ey.prototype={
$1(a){return this.a.bo()},
$S:3}
A.ez.prototype={
$1(a){var s,r=t.b4.a(A.jO(t.V.a(a).target))
if(r!=null)if(!B.f.B(this.a,r)){s=this.b
s=s!=null&&!J.iF(s,r)}else s=!1
else s=!1
if(s){s=this.b.style
s.display="none"}},
$S:0}
A.eA.prototype={
$1(a){t.V.a(a)
return this.a.cu()},
$S:0}
A.fa.prototype={
$1(a){var s,r
t.P.a(a)
s=J.t(a)
r=this.a
return B.a.B(J.L(s.i(a,"owner_name")).toLowerCase(),r)||B.a.B(J.L(s.i(a,"account_number")).toLowerCase(),r)},
$S:1}
A.fb.prototype={
$1(a){var s,r,q,p
t.P.a(a)
s=document.createElement("div")
s.className="search-result-item"
r=J.t(a)
q=J.F(s)
q.sW(s,A.d(r.i(a,"owner_name"))+" ("+A.d(r.i(a,"account_number"))+")")
q=q.ga7(s)
r=this.c
p=q.$ti
A.w(q.a,q.b,p.h("~(1)?").a(new A.f9(this.a,this.b,a,r)),!1,p.c)
r.appendChild(s).toString},
$S:4}
A.f9.prototype={
$1(a){var s,r,q,p=this
t.V.a(a)
s=p.c
r=J.t(s)
B.f.sF(p.b,A.d(r.i(s,"owner_name"))+" ("+A.d(r.i(s,"account_number"))+")")
q=p.d.style
q.display="none"
p.a.cf(A.al(r.i(s,"house_id")))},
$S:0}
A.eE.prototype={
$1(a){var s,r,q,p,o,n,m,l="status"
t.P.a(a)
s=document.createElement("div")
r=J.t(a)
s.className="bill-record-card "+A.d(r.i(a,l))
q=A.bR(A.l(r.i(a,"date"))).aN()
p=B.a.Z(B.e.j(A.aJ(q)),2,"0")
o=B.a.Z(B.e.j(A.bs(q)),2,"0")
n=A.d(r.i(a,"billing_month"))
m=J.q(r.i(a,l),"Paid")?"var(--alert-green)":"var(--amber-safety)"
J.aG(s,'          <div class="bill-record-header">\n            <span>Cycle: '+n+'</span>\n            <span style="color:'+m+'">'+J.L(r.i(a,l)).toUpperCase()+'</span>\n          </div>\n          <div class="bill-record-details">\n            <span>Readings: '+B.c.p(A.u(r.i(a,"previous_reading")),1)+" \u2192 "+B.c.p(A.u(r.i(a,"current_reading")),1)+" m\xb3</span>\n            <strong>\u20b1"+B.c.p(A.u(r.i(a,"total_due")),2)+'</strong>\n          </div>\n          <div style="font-size:9px;color:var(--text-muted);margin-top:2px;display:flex;justify-content:space-between">\n            <span>'+(""+A.cg(q)+"/"+A.cf(q)+"/"+A.b2(q)+" "+p+":"+o)+" ("+A.d(r.i(a,"bill_id"))+")</span>\n            <span>Tech: "+A.d(r.i(a,"billed_by"))+"</span>\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:4}
A.fd.prototype={
$0(){J.ac(this.a).v(0,"show")},
$S:2}
A.fc.prototype={
$1(a){return J.ac(t.h.a(a)).v(0,"active")},
$S:5}
A.f1.prototype={
$1(a){return J.q(J.k(t.P.a(a),"billing_month"),"June 2026")},
$S:1}
A.f2.prototype={
$1(a){var s,r,q,p,o,n,m,l="status"
t.P.a(a)
s=document.createElement("div")
r=J.t(a)
s.className="bill-record-card "+A.d(r.i(a,l))
q=A.bR(A.l(r.i(a,"date"))).aN()
p=B.a.Z(B.e.j(A.aJ(q)),2,"0")
o=B.a.Z(B.e.j(A.bs(q)),2,"0")
n=A.d(r.i(a,"billing_month"))
m=J.q(r.i(a,l),"Paid")?"var(--alert-green)":"var(--amber-safety)"
J.aG(s,'        <div class="bill-record-header">\n          <span>Cycle: '+n+'</span>\n          <span style="color:'+m+'">'+J.L(r.i(a,l)).toUpperCase()+'</span>\n        </div>\n        <div class="bill-record-details">\n          <span>Usage: '+B.c.p(A.u(r.i(a,"previous_reading")),1)+" \u2192 "+B.c.p(A.u(r.i(a,"current_reading")),1)+" m\xb3 ("+B.c.p(A.u(r.i(a,"consumption")),1)+" m\xb3)</span>\n          <strong>\u20b1"+B.c.p(A.u(r.i(a,"total_due")),2)+'</strong>\n        </div>\n        <div style="font-size:9px;color:var(--text-muted);margin-top:2px;">\n          Bill Ref ID: '+A.d(r.i(a,"bill_id"))+" | Issued: "+(""+A.cg(q)+"/"+A.cf(q)+"/"+A.b2(q)+" "+p+":"+o)+"\n        </div>\n      ")
this.b.appendChild(s).toString},
$S:4}
A.e5.prototype={
$1(a){var s=this,r=s.b
if(s.a.value==="resident"){if(r!=null){r=r.style
r.display="block"}r=s.c
if(r!=null){r=r.style
r.display="none"}}else{if(r!=null){r=r.style
r.display="none"}r=s.c
if(r!=null){r=r.style
r.display="block"}}},
$S:3}
A.e6.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null)J.ac(s).l(0,"active")},
$S:0}
A.e7.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null)J.ac(s).v(0,"active")},
$S:0}
A.e8.prototype={
$1(b3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=this,b1=null,b2="worker_id"
t.V.a(b3)
try{c=document
b=t.f
s=b.a(c.getElementById("reg-password"))
a=s
if(a==null)a0=b1
else{a=a.value
a=a==null?b1:B.a.K(a)
a0=a}r=a0==null?"":a0
if(J.U(r)===0){b0.a.D("Password is required!")
return}a=b0.b
a=a==null?b1:a.value
a1=t.Z
if(a==="resident"){q=b.a(c.getElementById("reg-res-name"))
p=a1.a(c.getElementById("reg-res-purok"))
o=b.a(c.getElementById("reg-res-lot"))
c=q
if(c==null)g=b1
else{c=c.value
c=c==null?b1:B.a.K(c)
g=c}n=g==null?"":g
c=p
a2=c==null?b1:c.value
m=a2==null?"Purok 1":a2
c=o
if(c==null)a3=b1
else{c=c.value
c=c==null?b1:B.a.K(c)
a3=c}l=a3==null?"":a3
if(J.U(n)===0||J.U(l)===0){b0.a.D("Name and Lot are required!")
return}k=$.G().dG(n,m,l,r)
c=b0.a
b=J.k(k,"account_number")
c.D("Resident Registered: "+A.l(b==null?"":b))}else{j=b.a(c.getElementById("reg-work-name"))
i=a1.a(c.getElementById("reg-work-role"))
h=a1.a(c.getElementById("reg-work-zone"))
c=j
if(c==null)n=b1
else{c=c.value
c=c==null?b1:B.a.K(c)
n=c}g=n==null?"":n
c=i
a4=c==null?b1:c.value
f=a4==null?"Field Technician":a4
c=h
a5=c==null?b1:c.value
e=a5==null?"Purok 1":a5
if(J.U(g)===0){b0.a.D("Worker Name is required!")
return}c=$.G()
b=A.l(g)
a=A.l(f)
a1=A.l(e)
a6=A.l(r)
a7=t.N
a8=A.B(["worker_id","EMP-"+(300+B.j.ae(900)),"name",b,"role",a,"zone",a1],a7,a7)
a8.m(0,b2,a6.length!==0?a6:"EMP-"+(300+B.j.ae(900)))
B.b.l(c.d,a8)
c.a1("/api/workers/add",a8)
b=window.localStorage
b.toString
b.setItem("waterhall_workers",B.d.t(c.d))
d=a8
c=b0.a
b=J.k(d,b2)
c.D("Worker Registered: "+A.l(b==null?"":b))}b=b0.c
if(b!=null)J.ac(b).v(0,"active")
if(c.b==="view-directory")c.a3()}catch(a9){b0.a.D("Error: $err")}},
$S:0}
A.fk.prototype={
aL(){var s=0,r=A.dX(t.y),q,p=2,o,n=this,m,l,k,j,i,h,g
var $async$aL=A.dZ(function(a,b){if(a===1){o=b
s=p}while(true)switch(s){case 0:p=4
s=7
return A.dT(A.iX("/api/all-data"),$async$aL)
case 7:m=b
j=t.P
l=j.a(B.d.T(0,m))
i=t.R
n.sb6(A.Q(i.a(J.k(l,"households")),j))
n.saZ(A.c5(t.G.a(J.k(l,"centralAssets")),t.N,t.z))
n.sb7(A.Q(i.a(J.k(l,"maintenanceLogs")),j))
n.sbb(A.Q(i.a(J.k(l,"workers")),j))
n.saY(A.Q(i.a(J.k(l,"billingRecords")),j))
if(J.i3(l,"announcements")){n.saX(A.Q(i.a(J.k(l,"announcements")),j))
j=window.localStorage
j.toString
j.setItem("waterhall_announcements",B.d.t(n.f))}j=window.localStorage
j.toString
j.setItem("waterhall_households",B.d.t(n.a))
j=window.localStorage
j.toString
j.setItem("waterhall_central_assets",B.d.t(n.b))
j=window.localStorage
j.toString
j.setItem("waterhall_maintenance_logs",B.d.t(n.c))
j=window.localStorage
j.toString
j.setItem("waterhall_workers",B.d.t(n.d))
j=window.localStorage
j.toString
j.setItem("waterhall_billing_records",B.d.t(n.e))
A.cM("Database refreshed successfully from server.")
n.a5()
q=!0
s=1
break
p=2
s=6
break
case 4:p=3
g=o
k=A.a5(g)
A.cM("Error refreshing data from server: "+A.d(k))
q=!1
s=1
break
s=6
break
case 3:s=2
break
case 6:case 1:return A.dV(q,r)
case 2:return A.dU(o,r)}})
return A.dW($async$aL,r)},
Y(){var s=0,r=A.dX(t.H),q,p=2,o,n=this,m,l,k,j,i,h,g,f
var $async$Y=A.dZ(function(a,b){if(a===1){o=b
s=p}while(true)switch(s){case 0:if(n.r){s=1
break}j=window
j.toString
A.w(j,"online",t.fi.a(new A.fq(n)),!1,t.B)
p=4
s=7
return A.dT(A.iX("/api/all-data"),$async$Y)
case 7:m=b
j=t.P
l=j.a(B.d.T(0,m))
i=t.R
n.sb6(A.Q(i.a(J.k(l,"households")),j))
n.saZ(A.c5(t.G.a(J.k(l,"centralAssets")),t.N,t.z))
n.sb7(A.Q(i.a(J.k(l,"maintenanceLogs")),j))
n.sbb(A.Q(i.a(J.k(l,"workers")),j))
n.saY(A.Q(i.a(J.k(l,"billingRecords")),j))
if(J.i3(l,"announcements")){n.saX(A.Q(i.a(J.k(l,"announcements")),j))
j=window.localStorage
j.toString
j.setItem("waterhall_announcements",B.d.t(n.f))}j=window.localStorage
j.toString
j.setItem("waterhall_households",B.d.t(n.a))
j=window.localStorage
j.toString
j.setItem("waterhall_central_assets",B.d.t(n.b))
j=window.localStorage
j.toString
j.setItem("waterhall_maintenance_logs",B.d.t(n.c))
j=window.localStorage
j.toString
j.setItem("waterhall_workers",B.d.t(n.d))
j=window.localStorage
j.toString
j.setItem("waterhall_billing_records",B.d.t(n.e))
n.r=!0
A.cM("Database successfully synchronized with SQLite backend.")
n.a5()
p=2
s=6
break
case 4:p=3
f=o
k=A.a5(f)
A.cM("Error fetching database from server, using local fallback: "+A.d(k))
if(window.localStorage.getItem("waterhall_households")==null){j=window.localStorage
j.toString
j.setItem("waterhall_households",B.d.t($.kz()))}if(window.localStorage.getItem("waterhall_central_assets")==null){j=window.localStorage
j.toString
j.setItem("waterhall_central_assets",B.d.t($.n5))}if(window.localStorage.getItem("waterhall_maintenance_logs")==null){j=window.localStorage
j.toString
j.setItem("waterhall_maintenance_logs",B.d.t($.n6))}if(window.localStorage.getItem("waterhall_workers")==null){j=window.localStorage
j.toString
j.setItem("waterhall_workers",B.d.t($.n7))}if(window.localStorage.getItem("waterhall_billing_records")==null){j=window.localStorage
j.toString
j.setItem("waterhall_billing_records",B.d.t($.ky()))}if(window.localStorage.getItem("waterhall_announcements")==null){j=window.localStorage
j.toString
j.setItem("waterhall_announcements",B.d.t([]))}j=window.localStorage.getItem("waterhall_households")
j.toString
i=t.R
g=t.P
n.sb6(A.Q(i.a(B.d.T(0,j)),g))
j=window.localStorage.getItem("waterhall_central_assets")
j.toString
n.saZ(A.c5(t.G.a(B.d.T(0,j)),t.N,t.z))
j=window.localStorage.getItem("waterhall_maintenance_logs")
j.toString
n.sb7(A.Q(i.a(B.d.T(0,j)),g))
j=window.localStorage.getItem("waterhall_workers")
j.toString
n.sbb(A.Q(i.a(B.d.T(0,j)),g))
j=window.localStorage.getItem("waterhall_billing_records")
j.toString
n.saY(A.Q(i.a(B.d.T(0,j)),g))
if(window.localStorage.getItem("waterhall_announcements")!=null){j=window.localStorage.getItem("waterhall_announcements")
j.toString
n.saX(A.Q(i.a(B.d.T(0,j)),g))}n.r=!0
s=6
break
case 3:s=2
break
case 6:case 1:return A.dV(q,r)
case 2:return A.dU(o,r)}})
return A.dW($async$Y,r)},
bI(){var s,r,q,p=window.localStorage.getItem("waterhall_unsynced_actions")
if(p==null)return A.n([],t.X)
try{s=t.j.a(B.d.T(0,p))
r=J.iH(s,new A.fl(),t.P)
r=A.b0(r,!0,r.$ti.h("T.E"))
return r}catch(q){r=A.n([],t.X)
return r}},
bM(a){var s
t.p.a(a)
s=window.localStorage
s.toString
s.setItem("waterhall_unsynced_actions",B.d.t(a))},
a1(a,b){var s
t.P.a(b)
s=this.bI()
B.b.l(s,A.B(["path",a,"data",b],t.N,t.z))
this.bM(s)
this.a5()},
a5(){var s=0,r=A.dX(t.H),q,p=2,o,n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$a5=A.dZ(function(a2,a3){if(a2===1){o=a3
s=p}while(true)switch(s){case 0:if(n.w){s=1
break}n.w=!0
g=n.bI()
f=g.length
if(f===0){n.w=!1
s=1
break}A.cM("Found "+f+" unsynced offline operations. Starting auto-upload...")
m=A.Q(g,t.P)
f=g.length,e=t.N,d=t.G,c=t.z,b=0
case 3:if(!(b<g.length)){s=5
break}l=g[b]
k=A.l(J.k(l,"path"))
j=A.c5(d.a(J.k(l,"data")),e,c)
p=7
a=B.d.t(j)
s=10
return A.dT(A.iY(k,"POST",null,A.B(["Content-Type","application/json"],e,e),a,null),$async$a5)
case 10:i=a3
if(i.status===200){J.kF(m,l)
A.i1("Successfully uploaded offline record for "+A.d(k))}else{A.i1("Sync failed for "+A.d(k)+" with status: "+A.d(i.status)+". Postponing sync.")
s=5
break}p=2
s=9
break
case 7:p=6
a1=o
h=A.a5(a1)
f=A.d(k)
e=A.d(h)
A.i1("Network error sync for "+f+": "+e+". Node remains offline.")
s=5
break
s=9
break
case 6:s=2
break
case 9:case 4:g.length===f||(0,A.i2)(g),++b
s=3
break
case 5:n.bM(m)
n.w=!1
case 1:return A.dV(q,r)
case 2:return A.dU(o,r)}})
return A.dW($async$a5,r)},
a9(a){var s,r,q=this.a
try{s=J.e0(q,new A.fo(a))
return s}catch(r){return null}},
ck(a,b){var s,r="flow_rate",q="leak_detected_at",p=this.a,o=B.b.dv(p,new A.ft(a))
if(o!==-1){if(!(o>=0&&o<p.length))return A.c(p,o)
J.at(p[o],"current_leak_status",b)
s=p.length
if(b==="leak"){if(!(o<s))return A.c(p,o)
J.at(p[o],r,0.75+B.j.ca()*0.5)
if(!(o<p.length))return A.c(p,o)
J.at(p[o],q,new A.af(Date.now(),!1).aj().ai())}else{if(!(o<s))return A.c(p,o)
J.at(p[o],r,0.01+B.j.ca()*0.09)
if(!(o<p.length))return A.c(p,o)
J.at(p[o],q,null)}if(!(o<p.length))return A.c(p,o)
this.a1("/api/households/update",p[o])
s=window.localStorage
s.toString
s.setItem("waterhall_households",B.d.t(p))
if(!(o<p.length))return A.c(p,o)
return p[o]}return null},
bp(a){var s,r,q,p="ph_status",o="turbidity_status",n="turbidity_desc"
t.P.a(a)
s=this.b
a.q(0,new A.fs(s))
s.m(0,"last_updated",new A.af(Date.now(),!1).aj().ai())
r=A.u(s.i(0,"ph_level"))
q=r<6.5
if(q||r>8.5){s.m(0,p,"warning")
s.m(0,"ph_desc",q?"Acidic pH. Check lime feeder.":"Alkaline pH. Run acid neutralizing wash.")}else{s.m(0,p,"normal")
s.m(0,"ph_desc","pH levels normal.")}if(A.u(s.i(0,"turbidity"))>5){s.m(0,o,"warning")
s.m(0,n,"Elevated turbidity. Check backwash filters.")}else{s.m(0,o,"normal")
s.m(0,n,"Turbidity levels normal.")}this.a1("/api/central-assets/update",s)
q=window.localStorage
q.toString
q.setItem("waterhall_central_assets",B.d.t(s))
return s},
bW(a){var s,r,q
t.P.a(a)
s=this.c
r=A.bq(t.N,t.z)
r.m(0,"task_id","LOG-"+(1000+B.j.ae(9000)))
r.m(0,"date",new A.af(Date.now(),!1).aj().ai())
r.R(0,a)
B.b.bf(s,0,r)
this.a1("/api/maintenance-logs/add",r)
q=window.localStorage
q.toString
q.setItem("waterhall_maintenance_logs",B.d.t(s))
return r},
cn(a,b){var s,r,q,p="password",o=this.a
try{s=J.e0(o,new A.fu(a))
if(J.k(s,p)==null||J.q(J.k(s,p),"")){J.at(s,p,b)
this.a1("/api/households/update",s)
r=window.localStorage
r.toString
r.setItem("waterhall_households",B.d.t(o))
return s}else if(J.q(J.k(s,p),b))return s
return null}catch(q){return null}},
br(a,b,c){var s,r,q,p
try{s=B.b.c0(this.d,new A.fv(a,b))
q=A.j4(t.N,t.z)
q.R(0,s)
r=q
J.at(r,"selected_zone",c)
return r}catch(p){return null}},
aQ(a){var s=this.e,r=A.K(s),q=r.h("M<1>"),p=A.b0(new A.M(s,r.h("E(1)").a(new A.fm(a)),q),!0,q.h("j.E"))
B.b.cv(p,new A.fn())
return p},
c4(a,b){return B.b.ap(this.e,new A.fp(a,b))},
cs(){var s=this.f
if(s.length===0)return null
return B.b.gc_(s)},
dG(a,b,c,d){var s,r,q=this.a
if(B.b.ap(q,new A.fr(b,c)))throw A.b(A.iW("Lot "+c+" in "+b+" is already registered."))
s=A.B(["house_id","HH-"+(1000+B.j.ae(9000)),"account_number","TAG-2026-"+B.e.j(1000+B.j.ae(9000)),"owner_name",a,"purok",b,"lot",c,"password",d,"monthly_consumption_m3",0,"status","Normal","total_due",0],t.N,t.K)
B.b.l(q,s)
this.a1("/api/households/add",s)
r=window.localStorage
r.toString
r.setItem("waterhall_households",B.d.t(q))
return s},
sb6(a){this.a=t.p.a(a)},
saZ(a){this.b=t.P.a(a)},
sb7(a){this.c=t.p.a(a)},
sbb(a){this.d=t.p.a(a)},
saY(a){this.e=t.p.a(a)},
saX(a){this.f=t.p.a(a)}}
A.fq.prototype={
$1(a){A.cM("Network connection restored. Processing offline actions...")
this.a.a5()},
$S:3}
A.fl.prototype={
$1(a){return A.c5(t.G.a(a),t.N,t.z)},
$S:49}
A.fo.prototype={
$1(a){return J.q(J.k(t.P.a(a),"house_id"),this.a)},
$S:1}
A.ft.prototype={
$1(a){return J.q(J.k(t.P.a(a),"house_id"),this.a)},
$S:1}
A.fs.prototype={
$2(a,b){this.a.m(0,A.l(a),b)},
$S:50}
A.fu.prototype={
$1(a){var s,r,q,p
t.P.a(a)
r=J.t(a)
q=A.d(r.i(a,"purok"))
p=r.i(a,"lot")
s=B.a.K((q+" "+A.d(p==null?"":p)).toLowerCase())
q=this.a
return J.q(s,B.a.K(q.toLowerCase()))||J.L(r.i(a,"account_number")).toLowerCase()===B.a.K(q.toLowerCase())},
$S:1}
A.fv.prototype={
$1(a){var s
t.P.a(a)
s=J.t(a)
return J.L(s.i(a,"name")).toLowerCase()===B.a.K(this.a.toLowerCase())&&J.L(s.i(a,"worker_id")).toLowerCase()===B.a.K(this.b.toLowerCase())},
$S:1}
A.fm.prototype={
$1(a){return J.q(J.k(t.P.a(a),"house_id"),this.a)},
$S:1}
A.fn.prototype={
$2(a,b){var s=t.P
s.a(a)
return B.e.aF(A.bR(A.l(J.k(s.a(b),"date"))).a,A.bR(A.l(J.k(a,"date"))).a)},
$S:51}
A.fp.prototype={
$1(a){var s
t.P.a(a)
s=J.t(a)
return J.q(s.i(a,"house_id"),this.a)&&J.L(s.i(a,"billing_month")).toLowerCase()===this.b.toLowerCase()},
$S:1}
A.fr.prototype={
$1(a){var s
t.P.a(a)
s=J.t(a)
return J.q(s.i(a,"purok"),this.a)&&J.q(s.i(a,"lot"),this.b)},
$S:1};(function aliases(){var s=J.c_.prototype
s.cw=s.j
s=J.aY.prototype
s.cA=s.j
s=A.j.prototype
s.cz=s.aO
s=A.y.prototype
s.aU=s.S
s=A.cx.prototype
s.cB=s.a2})();(function installTearOffs(){var s=hunkHelpers._static_1,r=hunkHelpers._static_0,q=hunkHelpers.installInstanceTearOff,p=hunkHelpers.installStaticTearOff
s(A,"mH","lj",6)
s(A,"mI","lk",6)
s(A,"mJ","ll",6)
r(A,"k_","mz",2)
q(A.cp.prototype,"gdg",0,1,null,["$2","$1"],["aG","bZ"],27,0,0)
s(A,"mL","m9",12)
p(A,"mR",4,null,["$4"],["lo"],18,0)
p(A,"mS",4,null,["$4"],["lp"],18,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.v,null)
q(A.v,[A.ic,J.c_,J.aQ,A.C,A.D,A.j,A.aZ,A.c9,A.cm,A.bm,A.b7,A.z,A.bP,A.fY,A.fR,A.bW,A.cy,A.aH,A.fK,A.c4,A.d3,A.ht,A.ae,A.dA,A.hB,A.cz,A.dq,A.bO,A.cp,A.b9,A.P,A.dr,A.cj,A.dM,A.cI,A.a8,A.dE,A.bb,A.aa,A.c8,A.aS,A.cV,A.hr,A.hD,A.af,A.bS,A.d9,A.ch,A.hb,A.fB,A.aA,A.R,A.dN,A.W,A.cF,A.h_,A.dK,A.fj,A.ia,A.cr,A.ba,A.ap,A.cd,A.cx,A.dO,A.aU,A.dv,A.dJ,A.cH,A.ho,A.e4,A.fk])
q(J.c_,[J.d1,J.c1,J.a6,J.bn,J.bo,J.c2,J.aX])
q(J.a6,[J.aY,J.N,A.d8,A.A,A.dt,A.fy,A.cX,A.fz,A.e,A.c7,A.dG,A.dL,A.dR])
q(J.aY,[J.da,J.by,J.aw])
r(J.fF,J.N)
q(J.c2,[J.c0,J.d2])
q(A.C,[A.bp,A.aB,A.d4,A.dk,A.du,A.dd,A.bN,A.dz,A.c3,A.am,A.dl,A.dj,A.bv,A.cU])
q(A.D,[A.bz,A.bD,A.a0])
r(A.cT,A.bz)
q(A.j,[A.r,A.b1,A.M])
q(A.r,[A.T,A.az])
q(A.T,[A.ck,A.a_,A.dF,A.dD])
r(A.bT,A.b1)
q(A.z,[A.bA,A.ay,A.dC,A.ds])
r(A.b_,A.bA)
r(A.bQ,A.bP)
r(A.ce,A.aB)
q(A.aH,[A.cR,A.cS,A.di,A.fH,A.hW,A.hY,A.h7,A.h6,A.hI,A.hg,A.hn,A.fW,A.hv,A.fN,A.fw,A.fx,A.hM,A.hN,A.fA,A.fC,A.fE,A.ha,A.fQ,A.fP,A.hw,A.hx,A.hy,A.fi,A.i_,A.eB,A.eC,A.eb,A.ea,A.ec,A.ed,A.en,A.eo,A.ep,A.e9,A.eq,A.er,A.es,A.et,A.eu,A.ee,A.ef,A.eg,A.eh,A.ei,A.ej,A.ek,A.el,A.em,A.ev,A.f8,A.fe,A.eO,A.eP,A.eN,A.eQ,A.eM,A.eK,A.eL,A.eS,A.eH,A.eI,A.eJ,A.eT,A.eF,A.eV,A.eW,A.eU,A.f4,A.f5,A.f6,A.f7,A.eX,A.eY,A.eZ,A.f_,A.f0,A.ew,A.ex,A.ey,A.ez,A.eA,A.fa,A.fb,A.f9,A.eE,A.fc,A.f1,A.f2,A.e5,A.e6,A.e7,A.e8,A.fq,A.fl,A.fo,A.ft,A.fu,A.fv,A.fm,A.fp,A.fr])
q(A.di,[A.df,A.bj])
r(A.dp,A.bN)
q(A.cS,[A.fG,A.hX,A.hJ,A.hQ,A.hh,A.fL,A.fO,A.hs,A.h3,A.h0,A.h1,A.h2,A.hL,A.fD,A.fV,A.hH,A.ff,A.eR,A.f3,A.fs,A.fn])
r(A.br,A.d8)
r(A.cu,A.br)
r(A.cv,A.cu)
r(A.ca,A.cv)
q(A.ca,[A.d7,A.cb])
r(A.cA,A.dz)
q(A.cR,[A.h8,A.h9,A.hA,A.hz,A.hc,A.hj,A.hi,A.hf,A.he,A.hd,A.hm,A.hl,A.hk,A.fX,A.hP,A.hu,A.hF,A.hE,A.eD,A.eG,A.fd])
r(A.co,A.cp)
r(A.dI,A.cI)
q(A.a8,[A.cw,A.cW])
r(A.cs,A.cw)
r(A.cE,A.c8)
r(A.bB,A.cE)
q(A.aS,[A.cQ,A.cY,A.d5])
q(A.cV,[A.fh,A.fJ,A.fI,A.h4])
r(A.d6,A.c3)
r(A.hq,A.hr)
r(A.dn,A.cY)
q(A.am,[A.bt,A.d_])
r(A.dw,A.cF)
q(A.A,[A.m,A.bY,A.cn])
q(A.m,[A.y,A.an,A.aT,A.bC])
q(A.y,[A.f,A.h])
q(A.f,[A.bh,A.cN,A.bi,A.aR,A.bk,A.cZ,A.aW,A.b4,A.cl,A.dg,A.dh,A.bw,A.b5])
r(A.bl,A.dt)
r(A.bX,A.aT)
r(A.ag,A.bY)
q(A.e,[A.ak,A.ai])
r(A.a3,A.ak)
r(A.dH,A.dG)
r(A.cc,A.dH)
r(A.ci,A.dL)
r(A.dS,A.dR)
r(A.ct,A.dS)
r(A.dx,A.ds)
q(A.cW,[A.dy,A.cP])
r(A.cq,A.cj)
r(A.b8,A.cq)
r(A.dP,A.cx)
r(A.bu,A.h)
s(A.bz,A.b7)
s(A.cu,A.D)
s(A.cv,A.bm)
s(A.bA,A.aa)
s(A.cE,A.aa)
s(A.dt,A.fj)
s(A.dG,A.D)
s(A.dH,A.ap)
s(A.dL,A.z)
s(A.dR,A.D)
s(A.dS,A.ap)})()
var v={typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{i:"int",bM:"double",Z:"num",a:"String",E:"bool",R:"Null",H:"List",v:"Object",p:"Map"},mangledNames:{},types:["~(a3)","E(p<a,@>)","~()","~(e)","~(p<a,@>)","~(y)","~(~())","R()","R(@)","~(v?,v?)","@()","i(a?)","@(@)","~(b6,a,i)","~(a,a)","E(ah)","E(a)","a(a)","E(y,a,a,ba)","a(p<a,v>)","p<a,a>(p<a,a>,a)","b6(@,@)","R(@,ar)","E(m)","a(ag)","~(i,@)","~(ai)","~(v[ar?])","R(v,ar)","P<@>(@)","~(@,@)","~(m,m?)","E(aq<a>)","R(e)","~(bx)","R(~())","@(a)","@(@,a)","~(@)","~(a,y)","~(a,i)","~(p<a,a>)","~(i,a)","~(a)","p<a,@>()","Z(Z,Z)","p<a,v>(aA<i,Z>)","~(a,i?)","~(p<a,v>)","p<a,@>(@)","~(a,@)","i(p<a,@>,p<a,@>)","i(i,i)","ao<~>(bx)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.lI(v.typeUniverse,JSON.parse('{"da":"aY","by":"aY","aw":"aY","nc":"e","nq":"e","nb":"h","nr":"h","nN":"ai","nd":"f","nt":"f","nw":"m","np":"m","nJ":"aT","nu":"a3","nf":"ak","ne":"an","ny":"an","ns":"y","d1":{"E":[],"a9":[]},"c1":{"R":[],"a9":[]},"N":{"H":["1"],"r":["1"],"j":["1"]},"fF":{"N":["1"],"H":["1"],"r":["1"],"j":["1"]},"aQ":{"ad":["1"]},"c2":{"bM":[],"Z":[]},"c0":{"bM":[],"i":[],"Z":[],"a9":[]},"d2":{"bM":[],"Z":[],"a9":[]},"aX":{"a":[],"fS":[],"a9":[]},"bp":{"C":[]},"cT":{"D":["i"],"b7":["i"],"H":["i"],"r":["i"],"j":["i"],"D.E":"i","b7.E":"i"},"r":{"j":["1"]},"T":{"r":["1"],"j":["1"]},"ck":{"T":["1"],"r":["1"],"j":["1"],"T.E":"1","j.E":"1"},"aZ":{"ad":["1"]},"b1":{"j":["2"],"j.E":"2"},"bT":{"b1":["1","2"],"r":["2"],"j":["2"],"j.E":"2"},"c9":{"ad":["2"]},"a_":{"T":["2"],"r":["2"],"j":["2"],"T.E":"2","j.E":"2"},"M":{"j":["1"],"j.E":"1"},"cm":{"ad":["1"]},"bz":{"D":["1"],"b7":["1"],"H":["1"],"r":["1"],"j":["1"]},"dF":{"T":["i"],"r":["i"],"j":["i"],"T.E":"i","j.E":"i"},"b_":{"z":["i","1"],"aa":["i","1"],"p":["i","1"],"z.K":"i","z.V":"1","aa.K":"i","aa.V":"1"},"bP":{"p":["1","2"]},"bQ":{"bP":["1","2"],"p":["1","2"]},"ce":{"aB":[],"C":[]},"d4":{"C":[]},"dk":{"C":[]},"cy":{"ar":[]},"aH":{"aV":[]},"cR":{"aV":[]},"cS":{"aV":[]},"di":{"aV":[]},"df":{"aV":[]},"bj":{"aV":[]},"du":{"C":[]},"dd":{"C":[]},"dp":{"C":[]},"ay":{"z":["1","2"],"j3":["1","2"],"p":["1","2"],"z.K":"1","z.V":"2"},"az":{"r":["1"],"j":["1"],"j.E":"1"},"c4":{"ad":["1"]},"d3":{"l9":[],"fS":[]},"br":{"ax":["1"]},"ca":{"D":["i"],"H":["i"],"ax":["i"],"r":["i"],"j":["i"],"bm":["i"]},"d7":{"D":["i"],"H":["i"],"ax":["i"],"r":["i"],"j":["i"],"bm":["i"],"a9":[],"D.E":"i"},"cb":{"D":["i"],"b6":[],"H":["i"],"ax":["i"],"r":["i"],"j":["i"],"bm":["i"],"a9":[],"D.E":"i"},"dz":{"C":[]},"cA":{"aB":[],"C":[]},"P":{"ao":["1"]},"cz":{"bx":[]},"bO":{"C":[]},"co":{"cp":["1"]},"cI":{"jp":[]},"dI":{"cI":[],"jp":[]},"cs":{"a8":["1"],"aq":["1"],"r":["1"],"j":["1"],"a8.E":"1"},"bb":{"ad":["1"]},"D":{"H":["1"],"r":["1"],"j":["1"]},"z":{"p":["1","2"]},"bA":{"z":["1","2"],"aa":["1","2"],"p":["1","2"]},"c8":{"p":["1","2"]},"bB":{"cE":["1","2"],"c8":["1","2"],"aa":["1","2"],"p":["1","2"],"aa.K":"1","aa.V":"2"},"a8":{"aq":["1"],"r":["1"],"j":["1"]},"cw":{"a8":["1"],"aq":["1"],"r":["1"],"j":["1"]},"dC":{"z":["a","@"],"p":["a","@"],"z.K":"a","z.V":"@"},"dD":{"T":["a"],"r":["a"],"j":["a"],"T.E":"a","j.E":"a"},"cQ":{"aS":["H<i>","a"]},"cY":{"aS":["a","H<i>"]},"c3":{"C":[]},"d6":{"C":[]},"d5":{"aS":["v?","a"]},"dn":{"aS":["a","H<i>"]},"bM":{"Z":[]},"i":{"Z":[]},"H":{"r":["1"],"j":["1"]},"aq":{"r":["1"],"j":["1"]},"a":{"fS":[]},"bN":{"C":[]},"aB":{"C":[]},"am":{"C":[]},"bt":{"C":[]},"d_":{"C":[]},"dl":{"C":[]},"dj":{"C":[]},"bv":{"C":[]},"cU":{"C":[]},"d9":{"C":[]},"ch":{"C":[]},"dN":{"ar":[]},"W":{"lc":[]},"cF":{"dm":[]},"dK":{"dm":[]},"dw":{"dm":[]},"y":{"m":[],"A":[]},"ag":{"A":[]},"a3":{"e":[]},"m":{"A":[]},"ai":{"e":[]},"ba":{"ah":[]},"f":{"y":[],"m":[],"A":[]},"bh":{"f":[],"y":[],"m":[],"A":[]},"cN":{"f":[],"y":[],"m":[],"A":[]},"bi":{"f":[],"y":[],"m":[],"A":[]},"aR":{"f":[],"y":[],"m":[],"A":[]},"bk":{"f":[],"y":[],"m":[],"A":[]},"an":{"m":[],"A":[]},"aT":{"m":[],"A":[]},"bD":{"D":["1"],"H":["1"],"r":["1"],"j":["1"],"D.E":"1"},"cZ":{"f":[],"y":[],"m":[],"A":[]},"bX":{"m":[],"A":[]},"bY":{"A":[]},"aW":{"jb":[],"iQ":[],"f":[],"y":[],"m":[],"A":[]},"a0":{"D":["m"],"H":["m"],"r":["m"],"j":["m"],"D.E":"m"},"cc":{"D":["m"],"ap":["m"],"H":["m"],"ax":["m"],"r":["m"],"j":["m"],"D.E":"m","ap.E":"m"},"b4":{"f":[],"y":[],"m":[],"A":[]},"ci":{"z":["a","a"],"p":["a","a"],"z.K":"a","z.V":"a"},"cl":{"f":[],"y":[],"m":[],"A":[]},"dg":{"f":[],"y":[],"m":[],"A":[]},"dh":{"f":[],"y":[],"m":[],"A":[]},"bw":{"f":[],"y":[],"m":[],"A":[]},"b5":{"f":[],"y":[],"m":[],"A":[]},"ak":{"e":[]},"cn":{"h5":[],"A":[]},"bC":{"m":[],"A":[]},"ct":{"D":["m"],"ap":["m"],"H":["m"],"ax":["m"],"r":["m"],"j":["m"],"D.E":"m","ap.E":"m"},"ds":{"z":["a","a"],"p":["a","a"]},"dx":{"z":["a","a"],"p":["a","a"],"z.K":"a","z.V":"a"},"dy":{"a8":["a"],"aq":["a"],"r":["a"],"j":["a"],"a8.E":"a"},"cq":{"cj":["1"]},"b8":{"cq":["1"],"cj":["1"]},"cr":{"lb":["1"]},"cd":{"ah":[]},"cx":{"ah":[]},"dP":{"ah":[]},"dO":{"ah":[]},"aU":{"ad":["1"]},"dv":{"h5":[],"A":[]},"dJ":{"lg":[]},"cH":{"l2":[]},"cW":{"a8":["a"],"aq":["a"],"r":["a"],"j":["a"]},"bu":{"h":[],"y":[],"m":[],"A":[]},"cP":{"a8":["a"],"aq":["a"],"r":["a"],"j":["a"],"a8.E":"a"},"h":{"y":[],"m":[],"A":[]},"kU":{"H":["i"],"r":["i"],"j":["i"]},"b6":{"H":["i"],"r":["i"],"j":["i"]}}'))
A.lH(v.typeUniverse,JSON.parse('{"r":1,"bz":1,"br":1,"bA":2,"cw":1,"cV":2}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.hT
return{n:s("bO"),cR:s("bi"),b:s("aR"),gw:s("r<@>"),h:s("y"),W:s("C"),B:s("e"),Y:s("aV"),b9:s("ao<@>"),bo:s("ag"),eh:s("j<m>"),R:s("j<@>"),gE:s("N<p<a,a>>"),X:s("N<p<a,@>>"),k:s("N<ah>"),s:s("N<a>"),gN:s("N<b6>"),gn:s("N<@>"),t:s("N<i>"),T:s("c1"),m:s("aw"),aU:s("ax<@>"),ey:s("b_<a>"),p:s("H<p<a,@>>"),j:s("H<@>"),L:s("H<i>"),bj:s("H<Z>"),d:s("c7"),ek:s("aA<i,Z>"),u:s("p<a,y>"),U:s("p<a,v>"),I:s("p<a,a>"),P:s("p<a,@>"),G:s("p<@,@>"),e:s("a_<a,a>"),V:s("a3"),A:s("m"),w:s("ah"),a:s("R"),K:s("v"),x:s("ai"),gT:s("nv"),ew:s("bu"),cq:s("aq<a>"),l:s("ar"),N:s("a"),dG:s("a(a)"),g7:s("h"),aW:s("bw"),D:s("bx"),dm:s("a9"),eK:s("aB"),ak:s("by"),dw:s("bB<a,a>"),dD:s("dm"),ci:s("h5"),gD:s("co<ag>"),h9:s("bC"),ac:s("a0"),E:s("b8<e>"),C:s("b8<a3>"),cD:s("bD<y>"),ao:s("P<ag>"),c:s("P<@>"),fJ:s("P<i>"),cr:s("ba"),y:s("E"),al:s("E(v)"),i:s("bM"),z:s("@"),fO:s("@()"),v:s("@(v)"),Q:s("@(v,ar)"),bU:s("@(aq<a>)"),S:s("i"),aw:s("0&*"),_:s("v*"),r:s("bk?"),J:s("iQ?"),b4:s("y?"),ch:s("A?"),eH:s("ao<R>?"),dg:s("f?"),f:s("aW?"),bM:s("H<@>?"),c9:s("p<a,@>?"),O:s("v?"),a6:s("jb?"),Z:s("b4?"),q:s("b5?"),F:s("b9<@,@>?"),g:s("dE?"),bw:s("@(e)?"),g5:s("~()?"),fi:s("~(e)?"),h2:s("~(a3)?"),gx:s("~(ai)?"),o:s("Z"),H:s("~"),M:s("~()"),eA:s("~(a,a)"),cA:s("~(a,@)"),cB:s("~(bx)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.E=A.bh.prototype
B.u=A.aR.prototype
B.l=A.bl.prototype
B.O=A.cX.prototype
B.y=A.bX.prototype
B.Q=A.ag.prototype
B.f=A.aW.prototype
B.R=J.c_.prototype
B.b=J.N.prototype
B.e=J.c0.prototype
B.c=J.c2.prototype
B.a=J.aX.prototype
B.S=J.aw.prototype
B.T=J.a6.prototype
B.a0=A.cb.prototype
B.C=J.da.prototype
B.k=A.b4.prototype
B.i=A.ci.prototype
B.D=A.cl.prototype
B.q=A.b5.prototype
B.t=J.by.prototype
B.a5=new A.fh()
B.F=new A.cQ()
B.v=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.G=function() {
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
B.L=function(getTagFallback) {
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
B.H=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.K=function(hooks) {
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
B.J=function(hooks) {
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
B.I=function(hooks) {
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
B.w=function(hooks) { return hooks; }

B.d=new A.d5()
B.M=new A.d9()
B.x=new A.dn()
B.j=new A.ho()
B.h=new A.dI()
B.N=new A.dN()
B.P=new A.bS(0)
B.U=new A.fI(null)
B.V=new A.fJ(null)
B.W=A.n(s([0,0,32722,12287,65534,34815,65534,18431]),t.t)
B.m=A.n(s([0,0,65490,45055,65535,34815,65534,18431]),t.t)
B.z=A.n(s([0,0,32754,11263,65534,34815,65534,18431]),t.t)
B.r=A.n(s(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),t.s)
B.X=A.n(s(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),t.s)
B.n=A.n(s([0,0,26624,1023,65534,2047,65534,2047]),t.t)
B.A=A.n(s([0,0,65490,12287,65535,34815,65534,18431]),t.t)
B.o=A.n(s([0,0,32776,33792,1,10240,0,0]),t.t)
B.Y=A.n(s(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"]),t.s)
B.Z=A.n(s([]),t.s)
B.p=A.n(s([0,0,24576,1023,65534,34815,65534,18431]),t.t)
B.B=A.n(s(["bind","if","ref","repeat","syntax"]),t.s)
B.a1={}
B.a_=new A.bQ(B.a1,[],A.hT("bQ<a,a>"))
B.a2=A.k8("kU")
B.a3=A.k8("b6")
B.a4=new A.h4(!1)})();(function staticFields(){$.hp=null
$.ab=A.n([],A.hT("N<v>"))
$.j7=null
$.iO=null
$.iN=null
$.k3=null
$.jZ=null
$.k7=null
$.hS=null
$.hZ=null
$.iy=null
$.bG=null
$.cJ=null
$.cK=null
$.iu=!1
$.J=B.h
$.aI=null
$.i9=null
$.iV=null
$.iU=null
$.dB=A.bq(t.N,t.Y)
$.n7=function(){var s=t.N,r=t.z
return A.n([A.B(["worker_id","EMP-301","name","Michael Balaga","role","Lead Field Tech","zone","Purok 1"],s,r),A.B(["worker_id","EMP-304","name","Ryiel Banggat","role","Field Technician","zone","Purok 2"],s,r),A.B(["worker_id","EMP-308","name","John Dave Chicote","role","Zone Inspector","zone","Purok 5"],s,r)],t.X)}()
$.n5=A.B(["main_tank_level",68,"ph_level",5.8,"ph_status","warning","ph_desc","Acidic pH detected. Add neutralizing agent.","turbidity",6.2,"turbidity_status","warning","turbidity_desc","Slightly high turbidity. Filter check recommended.","last_updated","2026-06-25T11:00:00Z"],t.N,t.z)
$.n6=function(){var s=t.N,r=t.z
return A.n([A.B(["task_id","LOG-1001","house_id","HH-102","worker_id","EMP-304","purok","Purok 1","description","Replaced main brass pipe fitting. Leak resolved.","date","2026-06-23T09:30:00Z","status_resolved",!0],s,r),A.B(["task_id","LOG-1002","house_id","HH-104","worker_id","EMP-304","purok","Purok 2","description","Inspected meter calibration. Flow rate verified normal.","date","2026-06-24T14:20:00Z","status_resolved",!0],s,r)],t.X)}()})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"ni","kc",()=>A.mO("_$dart_dartClosure"))
s($,"nz","ki",()=>A.aC(A.fZ({
toString:function(){return"$receiver$"}})))
s($,"nA","kj",()=>A.aC(A.fZ({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"nB","kk",()=>A.aC(A.fZ(null)))
s($,"nC","kl",()=>A.aC(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nF","ko",()=>A.aC(A.fZ(void 0)))
s($,"nG","kp",()=>A.aC(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nE","kn",()=>A.aC(A.jj(null)))
s($,"nD","km",()=>A.aC(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"nI","kr",()=>A.aC(A.jj(void 0)))
s($,"nH","kq",()=>A.aC(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"nK","iE",()=>A.li())
s($,"nQ","kw",()=>A.l1(4096))
s($,"nO","ku",()=>new A.hF().$0())
s($,"nP","kv",()=>new A.hE().$0())
s($,"nL","ks",()=>new Int8Array(A.ma(A.n([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.t))))
s($,"nj","kd",()=>A.jc("^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(?:[.,](\\d+))?)?)?( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$"))
s($,"nZ","kx",()=>A.m8())
s($,"nh","kb",()=>({}))
s($,"nM","kt",()=>A.j5(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],t.N))
s($,"ng","ka",()=>A.jc("^\\S+$"))
s($,"nn","iD",()=>B.a.aH(A.i7(),"Opera",0))
s($,"nm","kg",()=>!$.iD()&&B.a.aH(A.i7(),"Trident/",0))
s($,"nl","kf",()=>B.a.aH(A.i7(),"Firefox",0))
s($,"nk","ke",()=>"-"+$.kh()+"-")
s($,"no","kh",()=>{if($.kf())var r="moz"
else if($.kg())r="ms"
else r=$.iD()?"o":"webkit"
return r})
s($,"o1","ky",()=>{var r="previous_reading",q=t.N,p=t.z
return A.n([A.B(["bill_id","BILL-5001","house_id","HH-101","account_number","TAG-2026-0041","billing_month","June 2026",r,15.8,"current_reading",18.4,"consumption",2.6,"water_charge",120,"maintenance_fee",50,"total_due",170,"billed_by","EMP-304","date","2026-06-24T18:45:00Z","status","Pending"],q,p),A.B(["bill_id","BILL-5002","house_id","HH-101","account_number","TAG-2026-0041","billing_month","May 2026",r,14.1,"current_reading",15.8,"consumption",1.7,"water_charge",120,"maintenance_fee",50,"total_due",170,"billed_by","EMP-304","date","2026-05-24T10:15:00Z","status","Paid"],q,p),A.B(["bill_id","BILL-5003","house_id","HH-102","account_number","TAG-2026-0105","billing_month","May 2026",r,11.5,"current_reading",12.1,"consumption",0.6,"water_charge",120,"maintenance_fee",50,"total_due",170,"billed_by","EMP-304","date","2026-05-24T10:30:00Z","status","Paid"],q,p)],t.X)})
s($,"o2","kz",()=>{var r="current_leak_status",q="current_m3_usage",p="leak_detected_at",o=A.hT("N<bM>"),n=t.N,m=t.z
return A.n([A.B(["house_id","HH-101","lot","Lot 1","password",null,"owner_name","Maria C. Santos","purok","Purok 1","account_number","TAG-2026-0041",r,"leak",q,18.4,"flow_rate",0.85,"monthly_history",A.n([12.4,14.1,15.8,18.4],o),p,"2026-06-24T18:30:00Z"],n,m),A.B(["house_id","HH-102","lot","Lot 2","password",null,"owner_name","Ramon P. Del Rosario","purok","Purok 1","account_number","TAG-2026-0105",r,"normal",q,12.1,"flow_rate",0.05,"monthly_history",A.n([11.8,12,11.5,12.1],o),p,null],n,m),A.B(["house_id","HH-103","lot","Lot 3","password",null,"owner_name","Elena F. Garcia","purok","Purok 2","account_number","TAG-2026-0312",r,"leak",q,24.8,"flow_rate",0.98,"monthly_history",A.n([15.2,16,19.5,24.8],o),p,"2026-06-25T02:15:00Z"],n,m),A.B(["house_id","HH-104","lot","Lot 4","password",null,"owner_name","Delfin S. Alcantara","purok","Purok 2","account_number","TAG-2026-0421",r,"normal",q,9.3,"flow_rate",0.02,"monthly_history",A.n([8.5,9,9.1,9.3],o),p,null],n,m),A.B(["house_id","HH-105","lot","Lot 5","password",null,"owner_name","Clara M. Aquino","purok","Purok 3","account_number","TAG-2026-0810",r,"normal",q,15.6,"flow_rate",0.08,"monthly_history",A.n([14,15.2,14.9,15.6],o),p,null],n,m),A.B(["house_id","HH-106","lot","Lot 6","password",null,"owner_name","Manuel L. Roxas","purok","Purok 3","account_number","TAG-2026-0925",r,"normal",q,21,"flow_rate",0.11,"monthly_history",A.n([19.2,20.1,20.8,21],o),p,null],n,m),A.B(["house_id","HH-107","lot","Lot 7","password",null,"owner_name","Felipe A. Agoncillo","purok","Purok 4","account_number","TAG-2026-1102",r,"leak",q,32.5,"flow_rate",1.45,"monthly_history",A.n([18.4,21,25.1,32.5],o),p,"2026-06-25T08:45:00Z"],n,m),A.B(["house_id","HH-108","lot","Lot 8","password",null,"owner_name","Gregoria de Jesus","purok","Purok 4","account_number","TAG-2026-1349",r,"normal",q,14.2,"flow_rate",0.04,"monthly_history",A.n([13.1,13.9,14,14.2],o),p,null],n,m),A.B(["house_id","HH-109","lot","Lot 9","password",null,"owner_name","Antonio N. Luna","purok","Purok 5","account_number","TAG-2026-1509",r,"normal",q,11,"flow_rate",0.06,"monthly_history",A.n([10.5,10.9,11.2,11],o),p,null],n,m),A.B(["house_id","HH-110","lot","Lot 10","password",null,"owner_name","Leonor Rivera","purok","Purok 6","account_number","TAG-2026-1772",r,"normal",q,13.7,"flow_rate",0.05,"monthly_history",A.n([12.8,13.2,13.4,13.7],o),p,null],n,m)],t.X)})
s($,"o_","G",()=>{var r=t.X
return new A.fk(A.n([],r),A.bq(t.N,t.z),A.n([],r),A.n([],r),A.n([],r),A.n([],r))})})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({DOMError:J.a6,MediaError:J.a6,Navigator:J.a6,NavigatorConcurrentHardware:J.a6,NavigatorUserMediaError:J.a6,OverconstrainedError:J.a6,PositionError:J.a6,GeolocationPositionError:J.a6,Range:J.a6,ArrayBufferView:A.d8,Int8Array:A.d7,Uint8Array:A.cb,HTMLAudioElement:A.f,HTMLBRElement:A.f,HTMLCanvasElement:A.f,HTMLContentElement:A.f,HTMLDListElement:A.f,HTMLDataElement:A.f,HTMLDataListElement:A.f,HTMLDetailsElement:A.f,HTMLDialogElement:A.f,HTMLDivElement:A.f,HTMLEmbedElement:A.f,HTMLFieldSetElement:A.f,HTMLHRElement:A.f,HTMLHeadElement:A.f,HTMLHeadingElement:A.f,HTMLHtmlElement:A.f,HTMLIFrameElement:A.f,HTMLImageElement:A.f,HTMLLIElement:A.f,HTMLLabelElement:A.f,HTMLLegendElement:A.f,HTMLLinkElement:A.f,HTMLMapElement:A.f,HTMLMediaElement:A.f,HTMLMenuElement:A.f,HTMLMetaElement:A.f,HTMLMeterElement:A.f,HTMLModElement:A.f,HTMLOListElement:A.f,HTMLObjectElement:A.f,HTMLOptGroupElement:A.f,HTMLOptionElement:A.f,HTMLOutputElement:A.f,HTMLParagraphElement:A.f,HTMLParamElement:A.f,HTMLPictureElement:A.f,HTMLPreElement:A.f,HTMLProgressElement:A.f,HTMLQuoteElement:A.f,HTMLScriptElement:A.f,HTMLShadowElement:A.f,HTMLSlotElement:A.f,HTMLSourceElement:A.f,HTMLSpanElement:A.f,HTMLStyleElement:A.f,HTMLTableCaptionElement:A.f,HTMLTableCellElement:A.f,HTMLTableDataCellElement:A.f,HTMLTableHeaderCellElement:A.f,HTMLTableColElement:A.f,HTMLTimeElement:A.f,HTMLTitleElement:A.f,HTMLTrackElement:A.f,HTMLUListElement:A.f,HTMLUnknownElement:A.f,HTMLVideoElement:A.f,HTMLDirectoryElement:A.f,HTMLFontElement:A.f,HTMLFrameElement:A.f,HTMLFrameSetElement:A.f,HTMLMarqueeElement:A.f,HTMLElement:A.f,HTMLAnchorElement:A.bh,HTMLAreaElement:A.cN,HTMLBaseElement:A.bi,HTMLBodyElement:A.aR,HTMLButtonElement:A.bk,CDATASection:A.an,CharacterData:A.an,Comment:A.an,ProcessingInstruction:A.an,Text:A.an,CSSStyleDeclaration:A.bl,MSStyleCSSProperties:A.bl,CSS2Properties:A.bl,XMLDocument:A.aT,Document:A.aT,DOMException:A.fy,DOMImplementation:A.cX,DOMTokenList:A.fz,MathMLElement:A.y,Element:A.y,AbortPaymentEvent:A.e,AnimationEvent:A.e,AnimationPlaybackEvent:A.e,ApplicationCacheErrorEvent:A.e,BackgroundFetchClickEvent:A.e,BackgroundFetchEvent:A.e,BackgroundFetchFailEvent:A.e,BackgroundFetchedEvent:A.e,BeforeInstallPromptEvent:A.e,BeforeUnloadEvent:A.e,BlobEvent:A.e,CanMakePaymentEvent:A.e,ClipboardEvent:A.e,CloseEvent:A.e,CustomEvent:A.e,DeviceMotionEvent:A.e,DeviceOrientationEvent:A.e,ErrorEvent:A.e,ExtendableEvent:A.e,ExtendableMessageEvent:A.e,FetchEvent:A.e,FontFaceSetLoadEvent:A.e,ForeignFetchEvent:A.e,GamepadEvent:A.e,HashChangeEvent:A.e,InstallEvent:A.e,MediaEncryptedEvent:A.e,MediaKeyMessageEvent:A.e,MediaQueryListEvent:A.e,MediaStreamEvent:A.e,MediaStreamTrackEvent:A.e,MessageEvent:A.e,MIDIConnectionEvent:A.e,MIDIMessageEvent:A.e,MutationEvent:A.e,NotificationEvent:A.e,PageTransitionEvent:A.e,PaymentRequestEvent:A.e,PaymentRequestUpdateEvent:A.e,PopStateEvent:A.e,PresentationConnectionAvailableEvent:A.e,PresentationConnectionCloseEvent:A.e,PromiseRejectionEvent:A.e,PushEvent:A.e,RTCDataChannelEvent:A.e,RTCDTMFToneChangeEvent:A.e,RTCPeerConnectionIceEvent:A.e,RTCTrackEvent:A.e,SecurityPolicyViolationEvent:A.e,SensorErrorEvent:A.e,SpeechRecognitionError:A.e,SpeechRecognitionEvent:A.e,SpeechSynthesisEvent:A.e,StorageEvent:A.e,SyncEvent:A.e,TrackEvent:A.e,TransitionEvent:A.e,WebKitTransitionEvent:A.e,VRDeviceEvent:A.e,VRDisplayEvent:A.e,VRSessionEvent:A.e,MojoInterfaceRequestEvent:A.e,USBConnectionEvent:A.e,IDBVersionChangeEvent:A.e,AudioProcessingEvent:A.e,OfflineAudioCompletionEvent:A.e,WebGLContextEvent:A.e,Event:A.e,InputEvent:A.e,SubmitEvent:A.e,EventTarget:A.A,HTMLFormElement:A.cZ,HTMLDocument:A.bX,XMLHttpRequest:A.ag,XMLHttpRequestEventTarget:A.bY,HTMLInputElement:A.aW,Location:A.c7,MouseEvent:A.a3,DragEvent:A.a3,PointerEvent:A.a3,WheelEvent:A.a3,DocumentFragment:A.m,ShadowRoot:A.m,DocumentType:A.m,Node:A.m,NodeList:A.cc,RadioNodeList:A.cc,ProgressEvent:A.ai,ResourceProgressEvent:A.ai,HTMLSelectElement:A.b4,Storage:A.ci,HTMLTableElement:A.cl,HTMLTableRowElement:A.dg,HTMLTableSectionElement:A.dh,HTMLTemplateElement:A.bw,HTMLTextAreaElement:A.b5,CompositionEvent:A.ak,FocusEvent:A.ak,KeyboardEvent:A.ak,TextEvent:A.ak,TouchEvent:A.ak,UIEvent:A.ak,Window:A.cn,DOMWindow:A.cn,Attr:A.bC,NamedNodeMap:A.ct,MozNamedAttrMap:A.ct,SVGScriptElement:A.bu,SVGAElement:A.h,SVGAnimateElement:A.h,SVGAnimateMotionElement:A.h,SVGAnimateTransformElement:A.h,SVGAnimationElement:A.h,SVGCircleElement:A.h,SVGClipPathElement:A.h,SVGDefsElement:A.h,SVGDescElement:A.h,SVGDiscardElement:A.h,SVGEllipseElement:A.h,SVGFEBlendElement:A.h,SVGFEColorMatrixElement:A.h,SVGFEComponentTransferElement:A.h,SVGFECompositeElement:A.h,SVGFEConvolveMatrixElement:A.h,SVGFEDiffuseLightingElement:A.h,SVGFEDisplacementMapElement:A.h,SVGFEDistantLightElement:A.h,SVGFEFloodElement:A.h,SVGFEFuncAElement:A.h,SVGFEFuncBElement:A.h,SVGFEFuncGElement:A.h,SVGFEFuncRElement:A.h,SVGFEGaussianBlurElement:A.h,SVGFEImageElement:A.h,SVGFEMergeElement:A.h,SVGFEMergeNodeElement:A.h,SVGFEMorphologyElement:A.h,SVGFEOffsetElement:A.h,SVGFEPointLightElement:A.h,SVGFESpecularLightingElement:A.h,SVGFESpotLightElement:A.h,SVGFETileElement:A.h,SVGFETurbulenceElement:A.h,SVGFilterElement:A.h,SVGForeignObjectElement:A.h,SVGGElement:A.h,SVGGeometryElement:A.h,SVGGraphicsElement:A.h,SVGImageElement:A.h,SVGLineElement:A.h,SVGLinearGradientElement:A.h,SVGMarkerElement:A.h,SVGMaskElement:A.h,SVGMetadataElement:A.h,SVGPathElement:A.h,SVGPatternElement:A.h,SVGPolygonElement:A.h,SVGPolylineElement:A.h,SVGRadialGradientElement:A.h,SVGRectElement:A.h,SVGSetElement:A.h,SVGStopElement:A.h,SVGStyleElement:A.h,SVGSVGElement:A.h,SVGSwitchElement:A.h,SVGSymbolElement:A.h,SVGTSpanElement:A.h,SVGTextContentElement:A.h,SVGTextElement:A.h,SVGTextPathElement:A.h,SVGTextPositioningElement:A.h,SVGTitleElement:A.h,SVGUseElement:A.h,SVGViewElement:A.h,SVGGradientElement:A.h,SVGComponentTransferFunctionElement:A.h,SVGFEDropShadowElement:A.h,SVGMPathElement:A.h,SVGElement:A.h})
hunkHelpers.setOrUpdateLeafTags({DOMError:true,MediaError:true,Navigator:true,NavigatorConcurrentHardware:true,NavigatorUserMediaError:true,OverconstrainedError:true,PositionError:true,GeolocationPositionError:true,Range:true,ArrayBufferView:false,Int8Array:true,Uint8Array:false,HTMLAudioElement:true,HTMLBRElement:true,HTMLCanvasElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLDivElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHeadingElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLImageElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOptionElement:true,HTMLOutputElement:true,HTMLParagraphElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLSpanElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,HTMLAnchorElement:true,HTMLAreaElement:true,HTMLBaseElement:true,HTMLBodyElement:true,HTMLButtonElement:true,CDATASection:true,CharacterData:true,Comment:true,ProcessingInstruction:true,Text:true,CSSStyleDeclaration:true,MSStyleCSSProperties:true,CSS2Properties:true,XMLDocument:true,Document:false,DOMException:true,DOMImplementation:true,DOMTokenList:true,MathMLElement:true,Element:false,AbortPaymentEvent:true,AnimationEvent:true,AnimationPlaybackEvent:true,ApplicationCacheErrorEvent:true,BackgroundFetchClickEvent:true,BackgroundFetchEvent:true,BackgroundFetchFailEvent:true,BackgroundFetchedEvent:true,BeforeInstallPromptEvent:true,BeforeUnloadEvent:true,BlobEvent:true,CanMakePaymentEvent:true,ClipboardEvent:true,CloseEvent:true,CustomEvent:true,DeviceMotionEvent:true,DeviceOrientationEvent:true,ErrorEvent:true,ExtendableEvent:true,ExtendableMessageEvent:true,FetchEvent:true,FontFaceSetLoadEvent:true,ForeignFetchEvent:true,GamepadEvent:true,HashChangeEvent:true,InstallEvent:true,MediaEncryptedEvent:true,MediaKeyMessageEvent:true,MediaQueryListEvent:true,MediaStreamEvent:true,MediaStreamTrackEvent:true,MessageEvent:true,MIDIConnectionEvent:true,MIDIMessageEvent:true,MutationEvent:true,NotificationEvent:true,PageTransitionEvent:true,PaymentRequestEvent:true,PaymentRequestUpdateEvent:true,PopStateEvent:true,PresentationConnectionAvailableEvent:true,PresentationConnectionCloseEvent:true,PromiseRejectionEvent:true,PushEvent:true,RTCDataChannelEvent:true,RTCDTMFToneChangeEvent:true,RTCPeerConnectionIceEvent:true,RTCTrackEvent:true,SecurityPolicyViolationEvent:true,SensorErrorEvent:true,SpeechRecognitionError:true,SpeechRecognitionEvent:true,SpeechSynthesisEvent:true,StorageEvent:true,SyncEvent:true,TrackEvent:true,TransitionEvent:true,WebKitTransitionEvent:true,VRDeviceEvent:true,VRDisplayEvent:true,VRSessionEvent:true,MojoInterfaceRequestEvent:true,USBConnectionEvent:true,IDBVersionChangeEvent:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,WebGLContextEvent:true,Event:false,InputEvent:false,SubmitEvent:false,EventTarget:false,HTMLFormElement:true,HTMLDocument:true,XMLHttpRequest:true,XMLHttpRequestEventTarget:false,HTMLInputElement:true,Location:true,MouseEvent:true,DragEvent:true,PointerEvent:true,WheelEvent:true,DocumentFragment:true,ShadowRoot:true,DocumentType:true,Node:false,NodeList:true,RadioNodeList:true,ProgressEvent:true,ResourceProgressEvent:true,HTMLSelectElement:true,Storage:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,CompositionEvent:true,FocusEvent:true,KeyboardEvent:true,TextEvent:true,TouchEvent:true,UIEvent:false,Window:true,DOMWindow:true,Attr:true,NamedNodeMap:true,MozNamedAttrMap:true,SVGScriptElement:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true,SVGElement:false})
A.br.$nativeSuperclassTag="ArrayBufferView"
A.cu.$nativeSuperclassTag="ArrayBufferView"
A.cv.$nativeSuperclassTag="ArrayBufferView"
A.ca.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.n0
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=app.js.map

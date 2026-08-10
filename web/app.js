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
if(a[b]!==s){A.nc(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.q(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.iv(b)
return new s(c,this)}:function(){if(s===null)s=A.iv(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.iv(a).prototype
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
iy(a,b,c,d){return{i:a,p:b,e:c,x:d}},
hR(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.iw==null){A.n0()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.c(A.je("Return interceptor for "+A.d(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.hp
if(o==null)o=$.hp=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.n4(a)
if(p!=null)return p
if(typeof a=="function")return B.N
s=Object.getPrototypeOf(a)
if(s==null)return B.y
if(s===Object.prototype)return B.y
if(typeof q=="function"){o=$.hp
if(o==null)o=$.hp=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.p,enumerable:false,writable:true,configurable:true})
return B.p}return B.p},
iT(a,b){if(a<0||a>4294967295)throw A.c(A.a8(a,0,4294967295,"length",null))
return J.kT(new Array(a),b)},
iU(a,b){if(a<0)throw A.c(A.aS("Length must be a non-negative integer: "+a,null))
return A.q(new Array(a),b.i("O<0>"))},
kT(a,b){var s=A.q(a,b.i("O<0>"))
s.$flags=1
return s},
iV(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
kU(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.iV(r))break;++b}return b},
kV(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.b(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.iV(q))break}return b},
bk(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.c4.prototype
return J.dd.prototype}if(typeof a=="string")return J.b0.prototype
if(a==null)return J.c5.prototype
if(typeof a=="boolean")return J.dc.prototype
if(Array.isArray(a))return J.O.prototype
if(typeof a!="object"){if(typeof a=="function")return J.az.prototype
if(typeof a=="symbol")return J.bv.prototype
if(typeof a=="bigint")return J.bu.prototype
return a}if(a instanceof A.v)return a
return J.hR(a)},
u(a){if(typeof a=="string")return J.b0.prototype
if(a==null)return a
if(Array.isArray(a))return J.O.prototype
if(typeof a!="object"){if(typeof a=="function")return J.az.prototype
if(typeof a=="symbol")return J.bv.prototype
if(typeof a=="bigint")return J.bu.prototype
return a}if(a instanceof A.v)return a
return J.hR(a)},
bl(a){if(a==null)return a
if(Array.isArray(a))return J.O.prototype
if(typeof a!="object"){if(typeof a=="function")return J.az.prototype
if(typeof a=="symbol")return J.bv.prototype
if(typeof a=="bigint")return J.bu.prototype
return a}if(a instanceof A.v)return a
return J.hR(a)},
mU(a){if(typeof a=="string")return J.b0.prototype
if(a==null)return a
if(!(a instanceof A.v))return J.bF.prototype
return a},
F(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.az.prototype
if(typeof a=="symbol")return J.bv.prototype
if(typeof a=="bigint")return J.bu.prototype
return a}if(a instanceof A.v)return a
return J.hR(a)},
r(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bk(a).a_(a,b)},
l(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.n3(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.u(a).h(a,b)},
au(a,b,c){return J.bl(a).l(a,b,c)},
kv(a){return J.F(a).cw(a)},
kw(a,b,c){return J.F(a).cL(a,b,c)},
kx(a,b,c,d){return J.F(a).bH(a,b,c,d)},
iC(a,b){return J.u(a).A(a,b)},
i0(a,b){return J.F(a).N(a,b)},
iD(a,b){return J.bl(a).L(a,b)},
e8(a,b){return J.bl(a).bO(a,b)},
e9(a,b){return J.bl(a).q(a,b)},
ky(a){return J.F(a).gcW(a)},
af(a){return J.F(a).gad(a)},
ea(a){return J.bk(a).gF(a)},
eb(a){return J.u(a).gG(a)},
i1(a){return J.u(a).gO(a)},
bo(a){return J.bl(a).gI(a)},
W(a){return J.u(a).gk(a)},
av(a){return J.F(a).ga8(a)},
kz(a){return J.bk(a).gZ(a)},
iE(a,b,c){return J.bl(a).aq(a,b,c)},
iF(a){return J.bl(a).dr(a)},
kA(a,b){return J.bl(a).v(a,b)},
kB(a,b){return J.F(a).scF(a,b)},
aI(a,b){return J.F(a).sB(a,b)},
n(a,b){return J.F(a).sW(a,b)},
kC(a){return J.mU(a).dB(a)},
L(a){return J.bk(a).j(a)},
c3:function c3(){},
dc:function dc(){},
c5:function c5(){},
a_:function a_(){},
aL:function aL(){},
dk:function dk(){},
bF:function bF(){},
az:function az(){},
bu:function bu(){},
bv:function bv(){},
O:function O(a){this.$ti=a},
db:function db(){},
fL:function fL(a){this.$ti=a},
aT:function aT(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
c6:function c6(){},
c4:function c4(){},
dd:function dd(){},
b0:function b0(){}},A={i8:function i8(){},
iX(a){return new A.c8("Field '"+a+"' has been assigned during initialization.")},
kX(a){return new A.c8("Field '"+a+"' has not been initialized.")},
hS(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
ja(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
ld(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
e6(a,b,c){return a},
ix(a){var s,r
for(s=$.ad.length,r=0;r<s;++r)if(a===$.ad[r])return!0
return!1},
lc(a,b,c,d){A.dn(b,"start")
if(c!=null){A.dn(c,"end")
if(b>c)A.at(A.a8(b,0,c,"start",null))}return new A.cr(a,b,c,d.i("cr<0>"))},
kY(a,b,c,d){if(t.gw.b(a))return new A.bY(a,b,c.i("@<0>").D(d).i("bY<1,2>"))
return new A.b5(a,b,c.i("@<0>").D(d).i("b5<1,2>"))},
da(){return new A.bB("No element")},
kR(){return new A.bB("Too many elements")},
c8:function c8(a){this.a=a},
d0:function d0(a){this.a=a},
fY:function fY(){},
t:function t(){},
V:function V(){},
cr:function cr(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
b2:function b2(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
b5:function b5(a,b,c){this.a=a
this.b=b
this.$ti=c},
bY:function bY(a,b,c){this.a=a
this.b=b
this.$ti=c},
ce:function ce(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
a0:function a0(a,b,c){this.a=a
this.b=b
this.$ti=c},
N:function N(a,b,c){this.a=a
this.b=b
this.$ti=c},
cu:function cu(a,b,c){this.a=a
this.b=b
this.$ti=c},
bt:function bt(){},
ba:function ba(){},
bG:function bG(){},
dN:function dN(a){this.a=a},
b3:function b3(a,b){this.a=a
this.$ti=b},
kK(){throw A.c(A.aH("Cannot modify unmodifiable Map"))},
k2(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
n3(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
d(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.L(a)
return s},
dl(a){var s,r=$.j0
if(r==null)r=$.j0=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
ib(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.b(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
b7(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.a.J(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
dm(a){var s,r,q,p
if(a instanceof A.v)return A.a2(A.a3(a),null)
s=J.bk(a)
if(s===B.M||s===B.O||t.ak.b(a)){r=B.r(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.a2(A.a3(a),null)},
l2(a){var s,r,q
if(typeof a=="number"||A.ir(a))return J.L(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.aJ)return a.j(0)
s=$.ks()
for(r=0;r<1;++r){q=s[r].dC(a)
if(q!=null)return q}return"Instance of '"+A.dm(a)+"'"},
l3(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
M(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.b1(s,10)|55296)>>>0,s&1023|56320)}}throw A.c(A.a8(a,0,1114111,null,null))},
l4(a,b,c,d,e,f,g,h,i){var s,r,q,p=b-1
if(0<=a&&a<100){a+=400
p-=4800}s=B.c.a4(h,1000)
g+=B.c.a1(h-s,1000)
r=i?Date.UTC(a,p,c,d,e,f,g):new Date(a,p,c,d,e,f,g).valueOf()
q=!0
if(!isNaN(r))if(!(r<-864e13))if(!(r>864e13))q=r===864e13&&s!==0
if(q)return null
return r},
a9(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
b6(a){return a.c?A.a9(a).getUTCFullYear()+0:A.a9(a).getFullYear()+0},
cl(a){return a.c?A.a9(a).getUTCMonth()+1:A.a9(a).getMonth()+1},
ck(a){return a.c?A.a9(a).getUTCDate()+0:A.a9(a).getDate()+0},
aN(a){return a.c?A.a9(a).getUTCHours()+0:A.a9(a).getHours()+0},
by(a){return a.c?A.a9(a).getUTCMinutes()+0:A.a9(a).getMinutes()+0},
j2(a){return a.c?A.a9(a).getUTCSeconds()+0:A.a9(a).getSeconds()+0},
j1(a){return a.c?A.a9(a).getUTCMilliseconds()+0:A.a9(a).getMilliseconds()+0},
l1(a){var s=a.$thrownJsError
if(s==null)return null
return A.bm(s)},
j3(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.P(a,s)
a.$thrownJsError=s
s.stack=b.j(0)}},
mZ(a){throw A.c(A.iu(a))},
b(a,b){if(a==null)J.W(a)
throw A.c(A.hP(a,b))},
hP(a,b){var s,r="index"
if(!A.it(b))return new A.aj(!0,b,r,null)
s=A.aP(J.W(a))
if(b<0||b>=s)return A.c2(b,s,a,null,r)
return A.j4(b,r)},
iu(a){return new A.aj(!0,a,null,null)},
c(a){return A.P(a,new Error())},
P(a,b){var s
if(a==null)a=new A.aF()
b.dartException=a
s=A.nd
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
nd(){return J.L(this.dartException)},
at(a,b){throw A.P(a,b==null?new Error():b)},
aR(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.at(A.mb(a,b,c),s)},
mb(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.ct("'"+s+"': Cannot "+o+" "+l+k+n)},
i_(a){throw A.c(A.S(a))},
aG(a){var s,r,q,p,o,n
a=A.n7(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.q([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.h1(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
h2(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
jd(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
i9(a,b){var s=b==null,r=s?null:b.method
return new A.df(a,r,s?null:b.receiver)},
ae(a){var s
if(a==null)return new A.fW(a)
if(a instanceof A.c_){s=a.a
return A.aQ(a,s==null?A.bN(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.aQ(a,a.dartException)
return A.mL(a)},
aQ(a,b){if(t.Q.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
mL(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.b1(r,16)&8191)===10)switch(q){case 438:return A.aQ(a,A.i9(A.d(s)+" (Error "+q+")",null))
case 445:case 5007:A.d(s)
return A.aQ(a,new A.cj())}}if(a instanceof TypeError){p=$.kc()
o=$.kd()
n=$.ke()
m=$.kf()
l=$.ki()
k=$.kj()
j=$.kh()
$.kg()
i=$.kl()
h=$.kk()
g=p.V(s)
if(g!=null)return A.aQ(a,A.i9(A.k(s),g))
else{g=o.V(s)
if(g!=null){g.method="call"
return A.aQ(a,A.i9(A.k(s),g))}else if(n.V(s)!=null||m.V(s)!=null||l.V(s)!=null||k.V(s)!=null||j.V(s)!=null||m.V(s)!=null||i.V(s)!=null||h.V(s)!=null){A.k(s)
return A.aQ(a,new A.cj())}}return A.aQ(a,new A.dv(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.co()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.aQ(a,new A.aj(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.co()
return a},
bm(a){var s
if(a instanceof A.c_)return a.b
if(a==null)return new A.cG(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.cG(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
jZ(a){if(a==null)return J.ea(a)
if(typeof a=="object")return A.dl(a)
return J.ea(a)},
mT(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.l(0,a[s],a[r])}return b},
mm(a,b,c,d,e,f){t.Y.a(a)
switch(A.aP(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.c(A.iQ("Unsupported number of arguments for wrapped closure"))},
bR(a,b){var s
if(a==null)return null
s=a.$identity
if(!!s)return s
s=A.mQ(a,b)
a.$identity=s
return s},
mQ(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.mm)},
kJ(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.dq().constructor.prototype):Object.create(new A.br(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.iM(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.kF(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.iM(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
kF(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.c("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.kD)}throw A.c("Error in functionType of tearoff")},
kG(a,b,c,d){var s=A.iK
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
iM(a,b,c,d){if(c)return A.kI(a,b,d)
return A.kG(b.length,d,a,b)},
kH(a,b,c,d){var s=A.iK,r=A.kE
switch(b?-1:a){case 0:throw A.c(new A.dp("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
kI(a,b,c){var s,r
if($.iI==null)$.iI=A.iH("interceptor")
if($.iJ==null)$.iJ=A.iH("receiver")
s=b.length
r=A.kH(s,c,a,b)
return r},
iv(a){return A.kJ(a)},
kD(a,b){return A.hD(v.typeUniverse,A.a3(a.a),b)},
iK(a){return a.a},
kE(a){return a.b},
iH(a){var s,r,q,p=new A.br("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.c(A.aS("Field name "+a+" not found.",null))},
jW(a){return v.getIsolateTag(a)},
nZ(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
n4(a){var s,r,q,p,o,n=A.k($.jX.$1(a)),m=$.hQ[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.hW[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.ai($.jS.$2(a,n))
if(q!=null){m=$.hQ[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.hW[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.hY(s)
$.hQ[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.hW[n]=s
return s}if(p==="-"){o=A.hY(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.k_(a,s)
if(p==="*")throw A.c(A.je(n))
if(v.leafTags[n]===true){o=A.hY(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.k_(a,s)},
k_(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.iy(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
hY(a){return J.iy(a,!1,null,!!a.$iaA)},
n6(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.hY(s)
else return J.iy(s,c,null,null)},
n0(){if(!0===$.iw)return
$.iw=!0
A.n1()},
n1(){var s,r,q,p,o,n,m,l
$.hQ=Object.create(null)
$.hW=Object.create(null)
A.n_()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.k0.$1(o)
if(n!=null){m=A.n6(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
n_(){var s,r,q,p,o,n,m=B.C()
m=A.bQ(B.D,A.bQ(B.E,A.bQ(B.t,A.bQ(B.t,A.bQ(B.F,A.bQ(B.G,A.bQ(B.H(B.r),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.jX=new A.hT(p)
$.jS=new A.hU(o)
$.k0=new A.hV(n)},
bQ(a,b){return a(b)||b},
mS(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
kW(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.c(A.T("Illegal RegExp pattern ("+String(o)+")",a,null))},
nb(a,b,c){var s=a.indexOf(b,c)
return s>=0},
n7(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bT:function bT(){},
bU:function bU(a,b,c){this.a=a
this.b=b
this.$ti=c},
cn:function cn(){},
h1:function h1(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
cj:function cj(){},
df:function df(a,b,c){this.a=a
this.b=b
this.c=c},
dv:function dv(a){this.a=a},
fW:function fW(a){this.a=a},
c_:function c_(a,b){this.a=a
this.b=b},
cG:function cG(a){this.a=a
this.b=null},
aJ:function aJ(){},
cZ:function cZ(){},
d_:function d_(){},
dt:function dt(){},
dq:function dq(){},
br:function br(a,b){this.a=a
this.b=b},
dp:function dp(a){this.a=a},
aB:function aB(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
fM:function fM(a){this.a=a},
fP:function fP(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
b1:function b1(a,b){this.a=a
this.$ti=b},
c9:function c9(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aC:function aC(a,b){this.a=a
this.$ti=b},
ca:function ca(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
hT:function hT(a){this.a=a},
hU:function hU(a){this.a=a},
hV:function hV(a){this.a=a},
de:function de(a,b){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null},
ht:function ht(a){this.b=a},
mc(a){return a},
kZ(a){return new Uint8Array(a)},
ip(a,b,c){if(a>>>0!==a||a>=c)throw A.c(A.hP(b,a))},
cf:function cf(){},
aE:function aE(){},
aM:function aM(){},
di:function di(){},
cg:function cg(){},
cC:function cC(){},
cD:function cD(){},
ic(a,b){var s=b.c
return s==null?b.c=A.cJ(a,"ay",[b.x]):s},
j7(a){var s=a.w
if(s===6||s===7)return A.j7(a.x)
return s===11||s===12},
l7(a){return a.as},
e7(a){return A.hC(v.typeUniverse,a,!1)},
bh(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.bh(a1,s,a3,a4)
if(r===s)return a2
return A.ju(a1,r,!0)
case 7:s=a2.x
r=A.bh(a1,s,a3,a4)
if(r===s)return a2
return A.jt(a1,r,!0)
case 8:q=a2.y
p=A.bP(a1,q,a3,a4)
if(p===q)return a2
return A.cJ(a1,a2.x,p)
case 9:o=a2.x
n=A.bh(a1,o,a3,a4)
m=a2.y
l=A.bP(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.ii(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bP(a1,j,a3,a4)
if(i===j)return a2
return A.jv(a1,k,i)
case 11:h=a2.x
g=A.bh(a1,h,a3,a4)
f=a2.y
e=A.mI(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.js(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bP(a1,d,a3,a4)
o=a2.x
n=A.bh(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.ij(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.c(A.cW("Attempted to substitute unexpected RTI kind "+a0))}},
bP(a,b,c,d){var s,r,q,p,o=b.length,n=A.hH(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.bh(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
mJ(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.hH(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.bh(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
mI(a,b,c,d){var s,r=b.a,q=A.bP(a,r,c,d),p=b.b,o=A.bP(a,p,c,d),n=b.c,m=A.mJ(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dI()
s.a=q
s.b=o
s.c=m
return s},
q(a,b){a[v.arrayRti]=b
return a},
jV(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.mW(s)
return a.$S()}return null},
n2(a,b){var s
if(A.j7(b))if(a instanceof A.aJ){s=A.jV(a)
if(s!=null)return s}return A.a3(a)},
a3(a){if(a instanceof A.v)return A.z(a)
if(Array.isArray(a))return A.K(a)
return A.iq(J.bk(a))},
K(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
z(a){var s=a.$ti
return s!=null?s:A.iq(a)},
iq(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.mj(a,s)},
mj(a,b){var s=a instanceof A.aJ?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.lK(v.typeUniverse,s.name)
b.$ccache=r
return r},
mW(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.hC(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
mV(a){return A.bi(A.z(a))},
mH(a){var s=a instanceof A.aJ?A.jV(a):null
if(s!=null)return s
if(t.dm.b(a))return J.kz(a).a
if(Array.isArray(a))return A.K(a)
return A.a3(a)},
bi(a){var s=a.r
return s==null?a.r=new A.hB(a):s},
iz(a){return A.bi(A.hC(v.typeUniverse,a,!1))},
mi(a){var s=this
s.b=A.mF(s)
return s.b(a)},
mF(a){var s,r,q,p,o
if(a===t.K)return A.ms
if(A.bn(a))return A.mw
s=a.w
if(s===6)return A.mg
if(s===1)return A.jM
if(s===7)return A.mn
r=A.mE(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bn)){a.f="$i"+q
if(q==="I")return A.mq
if(a===t.m)return A.mp
return A.mv}}else if(s===10){p=A.mS(a.x,a.y)
o=p==null?A.jM:p
return o==null?A.bN(o):o}return A.me},
mE(a){if(a.w===8){if(a===t.S)return A.it
if(a===t.i||a===t.n)return A.mr
if(a===t.N)return A.mu
if(a===t.y)return A.ir}return null},
mh(a){var s=this,r=A.md
if(A.bn(s))r=A.m8
else if(s===t.K)r=A.bN
else if(A.bS(s)){r=A.mf
if(s===t.h6)r=A.jF
else if(s===t.dk)r=A.ai
else if(s===t.fQ)r=A.m3
else if(s===t.cg)r=A.jG
else if(s===t.fW)r=A.m5
else if(s===t.an)r=A.m7}else if(s===t.S)r=A.aP
else if(s===t.N)r=A.k
else if(s===t.y)r=A.io
else if(s===t.n)r=A.w
else if(s===t.i)r=A.m4
else if(s===t.m)r=A.m6
s.a=r
return s.a(a)},
me(a){var s=this
if(a==null)return A.bS(s)
return A.jY(v.typeUniverse,A.n2(a,s),s)},
mg(a){if(a==null)return!0
return this.x.b(a)},
mv(a){var s,r=this
if(a==null)return A.bS(r)
s=r.f
if(a instanceof A.v)return!!a[s]
return!!J.bk(a)[s]},
mq(a){var s,r=this
if(a==null)return A.bS(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.v)return!!a[s]
return!!J.bk(a)[s]},
mp(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.v)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
jL(a){if(typeof a=="object"){if(a instanceof A.v)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
md(a){var s=this
if(a==null){if(A.bS(s))return a}else if(s.b(a))return a
throw A.P(A.jI(a,s),new Error())},
mf(a){var s=this
if(a==null||s.b(a))return a
throw A.P(A.jI(a,s),new Error())},
jI(a,b){return new A.bL("TypeError: "+A.jk(a,A.a2(b,null)))},
jU(a,b,c,d){if(A.jY(v.typeUniverse,a,b))return a
throw A.P(A.lB("The type argument '"+A.a2(a,null)+"' is not a subtype of the type variable bound '"+A.a2(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
jk(a,b){return A.d7(a)+": type '"+A.a2(A.mH(a),null)+"' is not a subtype of type '"+b+"'"},
lB(a){return new A.bL("TypeError: "+a)},
ah(a,b){return new A.bL("TypeError: "+A.jk(a,b))},
mn(a){var s=this
return s.x.b(a)||A.ic(v.typeUniverse,s).b(a)},
ms(a){return a!=null},
bN(a){if(a!=null)return a
throw A.P(A.ah(a,"Object"),new Error())},
mw(a){return!0},
m8(a){return a},
jM(a){return!1},
ir(a){return!0===a||!1===a},
io(a){if(!0===a)return!0
if(!1===a)return!1
throw A.P(A.ah(a,"bool"),new Error())},
m3(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.P(A.ah(a,"bool?"),new Error())},
m4(a){if(typeof a=="number")return a
throw A.P(A.ah(a,"double"),new Error())},
m5(a){if(typeof a=="number")return a
if(a==null)return a
throw A.P(A.ah(a,"double?"),new Error())},
it(a){return typeof a=="number"&&Math.floor(a)===a},
aP(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.P(A.ah(a,"int"),new Error())},
jF(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.P(A.ah(a,"int?"),new Error())},
mr(a){return typeof a=="number"},
w(a){if(typeof a=="number")return a
throw A.P(A.ah(a,"num"),new Error())},
jG(a){if(typeof a=="number")return a
if(a==null)return a
throw A.P(A.ah(a,"num?"),new Error())},
mu(a){return typeof a=="string"},
k(a){if(typeof a=="string")return a
throw A.P(A.ah(a,"String"),new Error())},
ai(a){if(typeof a=="string")return a
if(a==null)return a
throw A.P(A.ah(a,"String?"),new Error())},
m6(a){if(A.jL(a))return a
throw A.P(A.ah(a,"JSObject"),new Error())},
m7(a){if(a==null)return a
if(A.jL(a))return a
throw A.P(A.ah(a,"JSObject?"),new Error())},
jP(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.a2(a[q],b)
return s},
mA(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.jP(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.a2(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
jJ(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.q([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.b.m(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.b(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.a2(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.a2(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.a2(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.a2(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.a2(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
a2(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.a2(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.a2(a.x,b)+">"
if(l===8){p=A.mK(a.x)
o=a.y
return o.length>0?p+("<"+A.jP(o,b)+">"):p}if(l===10)return A.mA(a,b)
if(l===11)return A.jJ(a,b,null)
if(l===12)return A.jJ(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.b(b,n)
return b[n]}return"?"},
mK(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
lL(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
lK(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.hC(a,b,!1)
else if(typeof m=="number"){s=m
r=A.cK(a,5,"#")
q=A.hH(s)
for(p=0;p<s;++p)q[p]=r
o=A.cJ(a,b,q)
n[b]=o
return o}else return m},
lI(a,b){return A.jD(a.tR,b)},
lH(a,b){return A.jD(a.eT,b)},
hC(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.jp(A.jn(a,null,b,!1))
r.set(b,s)
return s},
hD(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.jp(A.jn(a,b,c,!0))
q.set(c,r)
return r},
lJ(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.ii(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
aO(a,b){b.a=A.mh
b.b=A.mi
return b},
cK(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.an(null,null)
s.w=b
s.as=c
r=A.aO(a,s)
a.eC.set(c,r)
return r},
ju(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.lF(a,b,r,c)
a.eC.set(r,s)
return s},
lF(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bn(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.bS(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.an(null,null)
q.w=6
q.x=b
q.as=c
return A.aO(a,q)},
jt(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.lD(a,b,r,c)
a.eC.set(r,s)
return s},
lD(a,b,c,d){var s,r
if(d){s=b.w
if(A.bn(b)||b===t.K)return b
else if(s===1)return A.cJ(a,"ay",[b])
else if(b===t.a||b===t.T)return t.eH}r=new A.an(null,null)
r.w=7
r.x=b
r.as=c
return A.aO(a,r)},
lG(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.an(null,null)
s.w=13
s.x=b
s.as=q
r=A.aO(a,s)
a.eC.set(q,r)
return r},
cI(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
lC(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
cJ(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.cI(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.an(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.aO(a,r)
a.eC.set(p,q)
return q},
ii(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.cI(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.an(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.aO(a,o)
a.eC.set(q,n)
return n},
jv(a,b,c){var s,r,q="+"+(b+"("+A.cI(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.an(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.aO(a,s)
a.eC.set(q,r)
return r},
js(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.cI(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.cI(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.lC(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.an(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.aO(a,p)
a.eC.set(r,o)
return o},
ij(a,b,c,d){var s,r=b.as+("<"+A.cI(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.lE(a,b,c,r,d)
a.eC.set(r,s)
return s},
lE(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.hH(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.bh(a,b,r,0)
m=A.bP(a,c,r,0)
return A.ij(a,n,m,c!==m)}}l=new A.an(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.aO(a,l)},
jn(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
jp(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.lu(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.jo(a,r,l,k,!1)
else if(q===46)r=A.jo(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bg(a.u,a.e,k.pop()))
break
case 94:k.push(A.lG(a.u,k.pop()))
break
case 35:k.push(A.cK(a.u,5,"#"))
break
case 64:k.push(A.cK(a.u,2,"@"))
break
case 126:k.push(A.cK(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.lw(a,k)
break
case 38:A.lv(a,k)
break
case 63:p=a.u
k.push(A.ju(p,A.bg(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.jt(p,A.bg(p,a.e,k.pop()),a.n))
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
A.jq(a.u,a.e,o)
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
return A.bg(a.u,a.e,m)},
lu(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
jo(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.lL(s,o.x)[p]
if(n==null)A.at('No "'+p+'" in "'+A.l7(o)+'"')
d.push(A.hD(s,o,n))}else d.push(p)
return m},
lw(a,b){var s,r=a.u,q=A.jm(a,b),p=b.pop()
if(typeof p=="string")b.push(A.cJ(r,p,q))
else{s=A.bg(r,a.e,p)
switch(s.w){case 11:b.push(A.ij(r,s,q,a.n))
break
default:b.push(A.ii(r,s,q))
break}}},
lt(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.jm(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bg(p,a.e,o)
q=new A.dI()
q.a=s
q.b=n
q.c=m
b.push(A.js(p,r,q))
return
case-4:b.push(A.jv(p,b.pop(),s))
return
default:throw A.c(A.cW("Unexpected state under `()`: "+A.d(o)))}},
lv(a,b){var s=b.pop()
if(0===s){b.push(A.cK(a.u,1,"0&"))
return}if(1===s){b.push(A.cK(a.u,4,"1&"))
return}throw A.c(A.cW("Unexpected extended operation "+A.d(s)))},
jm(a,b){var s=b.splice(a.p)
A.jq(a.u,a.e,s)
a.p=b.pop()
return s},
bg(a,b,c){if(typeof c=="string")return A.cJ(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.lx(a,b,c)}else return c},
jq(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bg(a,b,c[s])},
ly(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bg(a,b,c[s])},
lx(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.c(A.cW("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.c(A.cW("Bad index "+c+" for "+b.j(0)))},
jY(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.R(a,b,null,c,null)
r.set(c,s)}return s},
R(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bn(d))return!0
s=b.w
if(s===4)return!0
if(A.bn(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.R(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.R(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.R(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.R(a,b.x,c,d,e))return!1
return A.R(a,A.ic(a,b),c,d,e)}if(s===6)return A.R(a,p,c,d,e)&&A.R(a,b.x,c,d,e)
if(q===7){if(A.R(a,b,c,d.x,e))return!0
return A.R(a,b,c,A.ic(a,d),e)}if(q===6)return A.R(a,b,c,p,e)||A.R(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.Y)return!0
o=s===10
if(o&&d===t.gT)return!0
if(q===12){if(b===t.r)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.R(a,j,c,i,e)||!A.R(a,i,e,j,c))return!1}return A.jK(a,b.x,c,d.x,e)}if(q===11){if(b===t.r)return!0
if(p)return!1
return A.jK(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.mo(a,b,c,d,e)}if(o&&q===10)return A.mt(a,b,c,d,e)
return!1},
jK(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.R(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.R(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.R(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.R(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.R(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
mo(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.hD(a,b,r[o])
return A.jE(a,p,null,c,d.y,e)}return A.jE(a,b.y,null,c,d.y,e)},
jE(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.R(a,b[s],d,e[s],f))return!1
return!0},
mt(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.R(a,r[s],c,q[s],e))return!1
return!0},
bS(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.bn(a))if(s!==6)r=s===7&&A.bS(a.x)
return r},
bn(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
jD(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
hH(a){return a>0?new Array(a):v.typeUniverse.sEA},
an:function an(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dI:function dI(){this.c=this.b=this.a=null},
hB:function hB(a){this.a=a},
dH:function dH(){},
bL:function bL(a){this.a=a},
lj(){var s,r,q
if(self.scheduleImmediate!=null)return A.mN()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.bR(new A.h9(s),1)).observe(r,{childList:true})
return new A.h8(s,r,q)}else if(self.setImmediate!=null)return A.mO()
return A.mP()},
lk(a){self.scheduleImmediate(A.bR(new A.ha(t.M.a(a)),0))},
ll(a){self.setImmediate(A.bR(new A.hb(t.M.a(a)),0))},
lm(a){A.id(B.K,t.M.a(a))},
id(a,b){var s=B.c.a1(a.a,1000)
return A.lz(s,b)},
jc(a,b){var s=B.c.a1(a.a,1000)
return A.lA(s,b)},
lz(a,b){var s=new A.cH(!0)
s.cq(a,b)
return s},
lA(a,b){var s=new A.cH(!1)
s.cr(a,b)
return s},
e3(a){return new A.dz(new A.Q($.J,a.i("Q<0>")),a.i("dz<0>"))},
e2(a,b){a.$2(0,null)
b.b=!0
return b.a},
e_(a,b){A.m9(a,b)},
e1(a,b){b.b2(0,a)},
e0(a,b){b.aC(A.ae(a),A.bm(a))},
m9(a,b){var s,r,q=new A.hJ(b),p=new A.hK(b)
if(a instanceof A.Q)a.bE(q,p,t.z)
else{s=t.z
if(a instanceof A.Q)a.bc(q,p,s)
else{r=new A.Q($.J,t._)
r.a=8
r.c=a
r.bE(q,p,s)}}},
e5(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.J.c1(new A.hO(s),t.H,t.S,t.z)},
i2(a){var s
if(t.Q.b(a)){s=a.gak()
if(s!=null)return s}return B.l},
mk(a,b){if($.J===B.h)return null
return null},
ml(a,b){if($.J!==B.h)A.mk(a,b)
if(b==null)if(t.Q.b(a)){b=a.gak()
if(b==null){A.j3(a,B.l)
b=B.l}}else b=B.l
else if(t.Q.b(a))A.j3(a,b)
return new A.ag(a,b)},
ig(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t._;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.l8()
b.aS(new A.ag(new A.aj(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.by(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.am()
b.aw(o.a)
A.bd(b,p)
return}b.a^=2
A.e4(null,null,b.b,t.M.a(new A.hh(o,b)))},
bd(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.u,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.hM(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.bd(d.a,c)
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
A.hM(j.a,j.b)
return}g=$.J
if(g!==h)$.J=h
else g=null
c=c.c
if((c&15)===8)new A.hl(q,d,n).$0()
else if(o){if((c&1)!==0)new A.hk(q,j).$0()}else if((c&2)!==0)new A.hj(d,q).$0()
if(g!=null)$.J=g
c=q.c
if(c instanceof A.Q){p=q.a.$ti
p=p.i("ay<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.az(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.ig(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.az(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
mB(a,b){var s
if(t.W.b(a))return b.c1(a,t.z,t.K,t.l)
s=t.v
if(s.b(a))return s.a(a)
throw A.c(A.fo(a,"onError",u.c))},
my(){var s,r
for(s=$.bO;s!=null;s=$.bO){$.cR=null
r=s.b
$.bO=r
if(r==null)$.cQ=null
s.a.$0()}},
mG(){$.is=!0
try{A.my()}finally{$.cR=null
$.is=!1
if($.bO!=null)$.iB().$1(A.jT())}},
jR(a){var s=new A.dA(a),r=$.cQ
if(r==null){$.bO=$.cQ=s
if(!$.is)$.iB().$1(A.jT())}else $.cQ=r.b=s},
mD(a){var s,r,q,p=$.bO
if(p==null){A.jR(a)
$.cR=$.cQ
return}s=new A.dA(a)
r=$.cR
if(r==null){s.b=p
$.bO=$.cR=s}else{q=r.b
s.b=q
$.cR=r.b=s
if(q==null)$.cQ=s}},
nC(a,b){A.e6(a,"stream",t.K)
return new A.dU(b.i("dU<0>"))},
le(a,b){var s=$.J
if(s===B.h)return A.id(a,t.M.a(b))
return A.id(a,t.M.a(s.bJ(b)))},
jb(a,b){var s=$.J
if(s===B.h)return A.jc(a,t.cB.a(b))
return A.jc(a,t.cB.a(s.bK(b,t.p)))},
hM(a,b){A.mD(new A.hN(a,b))},
jN(a,b,c,d,e){var s,r=$.J
if(r===c)return d.$0()
$.J=c
s=r
try{r=d.$0()
return r}finally{$.J=s}},
jO(a,b,c,d,e,f,g){var s,r=$.J
if(r===c)return d.$1(e)
$.J=c
s=r
try{r=d.$1(e)
return r}finally{$.J=s}},
mC(a,b,c,d,e,f,g,h,i){var s,r=$.J
if(r===c)return d.$2(e,f)
$.J=c
s=r
try{r=d.$2(e,f)
return r}finally{$.J=s}},
e4(a,b,c,d){t.M.a(d)
if(B.h!==c){d=c.bJ(d)
d=d}A.jR(d)},
h9:function h9(a){this.a=a},
h8:function h8(a,b,c){this.a=a
this.b=b
this.c=c},
ha:function ha(a){this.a=a},
hb:function hb(a){this.a=a},
cH:function cH(a){this.a=a
this.b=null
this.c=0},
hA:function hA(a,b){this.a=a
this.b=b},
hz:function hz(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dz:function dz(a,b){this.a=a
this.b=!1
this.$ti=b},
hJ:function hJ(a){this.a=a},
hK:function hK(a){this.a=a},
hO:function hO(a){this.a=a},
ag:function ag(a,b){this.a=a
this.b=b},
cx:function cx(){},
cw:function cw(a,b){this.a=a
this.$ti=b},
bc:function bc(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
Q:function Q(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
he:function he(a,b){this.a=a
this.b=b},
hi:function hi(a,b){this.a=a
this.b=b},
hh:function hh(a,b){this.a=a
this.b=b},
hg:function hg(a,b){this.a=a
this.b=b},
hf:function hf(a,b){this.a=a
this.b=b},
hl:function hl(a,b,c){this.a=a
this.b=b
this.c=c},
hm:function hm(a,b){this.a=a
this.b=b},
hn:function hn(a){this.a=a},
hk:function hk(a,b){this.a=a
this.b=b},
hj:function hj(a,b){this.a=a
this.b=b},
dA:function dA(a){this.a=a
this.b=null},
cq:function cq(){},
h_:function h_(a,b){this.a=a
this.b=b},
h0:function h0(a,b){this.a=a
this.b=b},
dU:function dU(a){this.$ti=a},
cP:function cP(){},
dQ:function dQ(){},
hu:function hu(a,b){this.a=a
this.b=b},
hv:function hv(a,b,c){this.a=a
this.b=b
this.c=c},
hN:function hN(a,b){this.a=a
this.b=b},
iZ(a,b){return new A.aB(a.i("@<0>").D(b).i("aB<1,2>"))},
C(a,b,c){return b.i("@<0>").D(c).i("iY<1,2>").a(A.mT(a,new A.aB(b.i("@<0>").D(c).i("aB<1,2>"))))},
bw(a,b){return new A.aB(a.i("@<0>").D(b).i("aB<1,2>"))},
cc(a){return new A.cA(a.i("cA<0>"))},
ih(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
ls(a,b,c){var s=new A.bf(a,b,c.i("bf<0>"))
s.c=a.e
return s},
cb(a,b,c){var s=A.iZ(b,c)
J.e9(a,new A.fQ(s,b,c))
return s},
j_(a,b){var s,r,q=A.cc(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.i_)(a),++r)q.m(0,b.a(a[r]))
return q},
ia(a){var s,r
if(A.ix(a))return"{...}"
s=new A.Z("")
try{r={}
B.b.m($.ad,a)
s.a+="{"
r.a=!0
J.e9(a,new A.fT(r,s))
s.a+="}"}finally{if(0>=$.ad.length)return A.b($.ad,-1)
$.ad.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
cA:function cA(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dM:function dM(a){this.a=a
this.c=this.b=null},
bf:function bf(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
fQ:function fQ(a,b,c){this.a=a
this.b=b
this.c=c},
D:function D(){},
B:function B(){},
fS:function fS(a){this.a=a},
fT:function fT(a,b){this.a=a
this.b=b},
bH:function bH(){},
ac:function ac(){},
cd:function cd(){},
bI:function bI(a,b){this.a=a
this.$ti=b},
aa:function aa(){},
cE:function cE(){},
cL:function cL(){},
mz(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.ae(r)
q=A.T(String(s),null,null)
throw A.c(q)}q=A.hL(p)
return q},
hL(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.dK(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.hL(a[s])
return a},
m1(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.kq()
else s=new Uint8Array(o)
for(r=J.u(a),q=0;q<o;++q){p=r.h(a,b+q)
if((p&255)!==p)p=255
s[q]=p}return s},
m0(a,b,c,d){var s=a?$.kp():$.ko()
if(s==null)return null
if(0===c&&d===b.length)return A.jC(s,b)
return A.jC(s,b.subarray(c,d))},
jC(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
iG(a,b,c,d,e,f){if(B.c.a4(f,4)!==0)throw A.c(A.T("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.c(A.T("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.c(A.T("Invalid base64 padding, more than two '=' characters",a,b))},
iW(a,b,c){return new A.c7(a,b)},
ma(a){return a.dH()},
lq(a,b){return new A.hq(a,[],A.mR())},
lr(a,b,c){var s,r=new A.Z(""),q=A.lq(r,b)
q.aK(a)
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
dK:function dK(a,b){this.a=a
this.b=b
this.c=null},
dL:function dL(a){this.a=a},
hG:function hG(){},
hF:function hF(){},
cY:function cY(){},
fp:function fp(){},
aV:function aV(){},
d2:function d2(){},
d6:function d6(){},
c7:function c7(a,b){this.a=a
this.b=b},
dh:function dh(a,b){this.a=a
this.b=b},
dg:function dg(){},
fO:function fO(a){this.b=a},
fN:function fN(a){this.a=a},
hr:function hr(){},
hs:function hs(a,b){this.a=a
this.b=b},
hq:function hq(a,b,c){this.c=a
this.a=b
this.b=c},
dy:function dy(){},
h6:function h6(a){this.a=a},
hE:function hE(a){this.a=a
this.b=16
this.c=0},
cS(a){var s=A.ib(a,null)
if(s!=null)return s
throw A.c(A.T(a,null,null))},
kO(a,b){a=A.P(a,new Error())
if(a==null)a=A.bN(a)
a.stack=b.j(0)
throw a},
fR(a,b,c,d){var s,r=c?J.iU(a,d):J.iT(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
U(a,b){var s,r=A.q([],b.i("O<0>"))
for(s=J.bo(a);s.u();)B.b.m(r,b.a(s.gE()))
return r},
b4(a,b){var s,r=A.q([],b.i("O<0>"))
for(s=J.bo(a);s.u();)B.b.m(r,s.gE())
return r},
j9(a,b,c){var s,r
A.dn(b,"start")
if(c!=null){s=c-b
if(s<0)throw A.c(A.a8(c,b,null,"end",null))
if(s===0)return""}r=A.lb(a,b,c)
return r},
lb(a,b,c){var s=a.length
if(b>=s)return""
return A.l3(a,b,c==null||c>s?s:c)},
j6(a){return new A.de(a,A.kW(a,!1,!0,!1,!1,""))},
j8(a,b,c){var s=J.bo(b)
if(!s.u())return a
if(c.length===0){do a+=A.d(s.gE())
while(s.u())}else{a+=A.d(s.gE())
while(s.u())a=a+c+A.d(s.gE())}return a},
l8(){return A.bm(new Error())},
kL(a,b,c,d,e,f,g,h,i){var s="microsecond",r=A.l4(a,b,c,d,e,f,g,h,i)
if(r==null)return null
if(h>999)A.at(A.a8(h,0,999,s,null))
if(r<-864e13||r>864e13)A.at(A.a8(r,-864e13,864e13,"millisecondsSinceEpoch",null))
if(r===864e13&&h!==0)A.at(A.fo(h,s,"Time including microseconds is outside valid range"))
A.e6(i,"isUtc",t.y)
return new A.a5(r,h,i)},
bV(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=$.k7().da(a)
if(c!=null){s=new A.fF()
r=c.b
if(1>=r.length)return A.b(r,1)
q=r[1]
q.toString
p=A.cS(q)
if(2>=r.length)return A.b(r,2)
q=r[2]
q.toString
o=A.cS(q)
if(3>=r.length)return A.b(r,3)
q=r[3]
q.toString
n=A.cS(q)
if(4>=r.length)return A.b(r,4)
m=s.$1(r[4])
if(5>=r.length)return A.b(r,5)
l=s.$1(r[5])
if(6>=r.length)return A.b(r,6)
k=s.$1(r[6])
if(7>=r.length)return A.b(r,7)
j=new A.fG().$1(r[7])
i=B.c.a1(j,1000)
q=r.length
if(8>=q)return A.b(r,8)
h=r[8]!=null
if(h){if(9>=q)return A.b(r,9)
g=r[9]
if(g!=null){f=g==="-"?-1:1
if(10>=q)return A.b(r,10)
q=r[10]
q.toString
e=A.cS(q)
if(11>=r.length)return A.b(r,11)
l-=f*(s.$1(r[11])+60*e)}}d=A.kL(p,o,n,m,l,k,i,j%1000,h)
if(d==null)throw A.c(A.T("Time out of range",a,null))
return d}else throw A.c(A.T("Invalid date format",a,null))},
iN(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
kM(a){var s=Math.abs(a),r=a<0?"-":"+"
if(s>=1e5)return r+s
return r+"0"+s},
fE(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
aw(a){if(a>=10)return""+a
return"0"+a},
i4(a,b){return new A.bX(1000*a+1e6*b)},
d7(a){if(typeof a=="number"||A.ir(a)||a==null)return J.L(a)
if(typeof a=="string")return JSON.stringify(a)
return A.l2(a)},
kP(a,b){A.e6(a,"error",t.K)
A.e6(b,"stackTrace",t.l)
A.kO(a,b)},
cW(a){return new A.cV(a)},
aS(a,b){return new A.aj(!1,null,b,a)},
fo(a,b,c){return new A.aj(!0,a,b,c)},
l5(a){var s=null
return new A.bz(s,s,!1,s,s,a)},
j4(a,b){return new A.bz(null,null,!0,a,b,"Value not in range")},
a8(a,b,c,d,e){return new A.bz(b,c,!0,a,d,"Invalid value")},
cm(a,b,c){if(0>a||a>c)throw A.c(A.a8(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.c(A.a8(b,a,c,"end",null))
return b}return c},
dn(a,b){if(a<0)throw A.c(A.a8(a,0,null,b,null))
return a},
c2(a,b,c,d,e){return new A.d9(b,!0,a,e,"Index out of range")},
aH(a){return new A.ct(a)},
je(a){return new A.du(a)},
bC(a){return new A.bB(a)},
S(a){return new A.d1(a)},
iQ(a){return new A.hd(a)},
T(a,b,c){return new A.ax(a,b,c)},
kS(a,b,c){var s,r
if(A.ix(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.q([],t.s)
B.b.m($.ad,a)
try{A.mx(a,s)}finally{if(0>=$.ad.length)return A.b($.ad,-1)
$.ad.pop()}r=A.j8(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
i7(a,b,c){var s,r
if(A.ix(a))return b+"..."+c
s=new A.Z(b)
B.b.m($.ad,a)
try{r=s
r.a=A.j8(r.a,a,", ")}finally{if(0>=$.ad.length)return A.b($.ad,-1)
$.ad.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
mx(a,b){var s,r,q,p,o,n,m,l=a.gI(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.u())return
s=A.d(l.gE())
B.b.m(b,s)
k+=s.length+2;++j}if(!l.u()){if(j<=5)return
if(0>=b.length)return A.b(b,-1)
r=b.pop()
if(0>=b.length)return A.b(b,-1)
q=b.pop()}else{p=l.gE();++j
if(!l.u()){if(j<=4){B.b.m(b,A.d(p))
return}r=A.d(p)
if(0>=b.length)return A.b(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gE();++j
for(;l.u();p=o,o=n){n=l.gE();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.b(b,-1)
k-=b.pop().length+2;--j}B.b.m(b,"...")
return}}q=A.d(p)
r=A.d(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.b(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.b.m(b,m)
B.b.m(b,q)
B.b.m(b,r)},
l0(a,b){var s=B.c.gF(a)
b=B.c.gF(b)
b=A.ld(A.ja(A.ja($.kr(),s),b))
return b},
cT(a){A.hZ(a)},
jg(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){if(4>=a4)return A.b(a5,4)
s=((a5.charCodeAt(4)^58)*3|a5.charCodeAt(0)^100|a5.charCodeAt(1)^97|a5.charCodeAt(2)^116|a5.charCodeAt(3)^97)>>>0
if(s===0)return A.jf(a4<a4?B.a.n(a5,0,a4):a5,5,a3).gc7()
else if(s===32)return A.jf(B.a.n(a5,5,a4),0,a3).gc7()}r=A.fR(8,0,!1,t.S)
B.b.l(r,0,0)
B.b.l(r,1,-1)
B.b.l(r,2,-1)
B.b.l(r,7,-1)
B.b.l(r,3,0)
B.b.l(r,4,0)
B.b.l(r,5,a4)
B.b.l(r,6,a4)
if(A.jQ(a5,0,a4,0,r)>=14)B.b.l(r,7,a4)
q=r[1]
if(q>=0)if(A.jQ(a5,0,q,20,r)===20)r[7]=q
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
j=a3
if(k){k=!1
if(!(p>q+3)){i=o>0
if(!(i&&o+1===n)){if(!B.a.M(a5,"\\",n))if(p>0)h=B.a.M(a5,"\\",p-1)||B.a.M(a5,"\\",p-2)
else h=!1
else h=!0
if(!h){if(!(m<a4&&m===n+2&&B.a.M(a5,"..",n)))h=m>n+2&&B.a.M(a5,"/..",m-3)
else h=!0
if(!h)if(q===4){if(B.a.M(a5,"file",0)){if(p<=0){if(!B.a.M(a5,"/",n)){g="file:///"
s=3}else{g="file://"
s=2}a5=g+B.a.n(a5,n,a4)
m+=s
l+=s
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
n=e}j="http"}}else if(q===5&&B.a.M(a5,"https",0)){if(i&&o+4===n&&B.a.M(a5,"443",o+1)){l-=4
e=n-4
m-=4
a5=B.a.ah(a5,o,n,"")
a4-=3
n=e}j="https"}k=!h}}}}if(k)return new A.dS(a4<a5.length?B.a.n(a5,0,a4):a5,q,p,o,n,m,l,j)
if(j==null)if(q>0)j=A.lV(a5,0,q)
else{if(q===0)A.bM(a5,0,"Invalid empty scheme")
j=""}d=a3
if(p>0){c=q+3
b=c<p?A.lW(a5,c,p-1):""
a=A.lR(a5,p,o,!1)
i=o+1
if(i<n){a0=A.ib(B.a.n(a5,i,n),a3)
d=A.lT(a0==null?A.at(A.T("Invalid port",a5,i)):a0,j)}}else{a=a3
b=""}a1=A.lS(a5,n,m,a3,j,a!=null)
a2=m<l?A.lU(a5,m+1,l,a3):a3
return A.lM(j,b,a,d,a1,a2,l<a4?A.lQ(a5,l+1,a4):a3)},
ji(a){var s=t.N
return B.b.dc(A.q(a.split("&"),t.s),A.bw(s,s),new A.h5(B.u),t.J)},
dx(a,b,c){throw A.c(A.T("Illegal IPv4 address, "+a,b,c))},
lg(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j="invalid character"
for(s=a.length,r=b,q=r,p=0,o=0;;){if(q>=c)n=0
else{if(!(q>=0&&q<s))return A.b(a,q)
n=a.charCodeAt(q)}m=n^48
if(m<=9){if(o!==0||q===r){o=o*10+m
if(o<=255){++q
continue}A.dx("each part must be in the range 0..255",a,r)}A.dx("parts must not have leading zeros",a,r)}if(q===r){if(q===c)break
A.dx(j,a,q)}l=p+1
k=e+p
d.$flags&2&&A.aR(d)
if(!(k<16))return A.b(d,k)
d[k]=o
if(n===46){if(l<4){++q
p=l
r=q
o=0
continue}break}if(q===c){if(l===4)return
break}A.dx(j,a,q)
p=l}A.dx("IPv4 address should contain exactly 4 parts",a,q)},
lh(a,b,c){var s
if(b===c)throw A.c(A.T("Empty IP address",a,b))
if(!(b>=0&&b<a.length))return A.b(a,b)
if(a.charCodeAt(b)===118){s=A.li(a,b,c)
if(s!=null)throw A.c(s)
return!1}A.jh(a,b,c)
return!0},
li(a,b,c){var s,r,q,p,o,n="Missing hex-digit in IPvFuture address",m=u.f;++b
for(s=a.length,r=b;;r=q){if(r<c){q=r+1
if(!(r>=0&&r<s))return A.b(a,r)
p=a.charCodeAt(r)
if((p^48)<=9)continue
o=p|32
if(o>=97&&o<=102)continue
if(p===46){if(q-1===b)return new A.ax(n,a,q)
r=q
break}return new A.ax("Unexpected character",a,q-1)}if(r-1===b)return new A.ax(n,a,r)
return new A.ax("Missing '.' in IPvFuture address",a,r)}if(r===c)return new A.ax("Missing address in IPvFuture address, host, cursor",null,null)
for(;;){if(!(r>=0&&r<s))return A.b(a,r)
p=a.charCodeAt(r)
if(!(p<128))return A.b(m,p)
if((m.charCodeAt(p)&16)!==0){++r
if(r<c)continue
return null}return new A.ax("Invalid IPvFuture address character",a,r)}},
jh(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="an address must contain at most 8 parts",a2=new A.h4(a3)
if(a5-a4<2)a2.$2("address is too short",null)
s=new Uint8Array(16)
r=a3.length
if(!(a4>=0&&a4<r))return A.b(a3,a4)
q=-1
p=0
if(a3.charCodeAt(a4)===58){o=a4+1
if(!(o<r))return A.b(a3,o)
if(a3.charCodeAt(o)===58){n=a4+2
m=n
q=0
p=1}else{a2.$2("invalid start colon",a4)
n=a4
m=n}}else{n=a4
m=n}for(l=0,k=!0;;){if(n>=a5)j=0
else{if(!(n<r))return A.b(a3,n)
j=a3.charCodeAt(n)}A:{i=j^48
h=!1
if(i<=9)g=i
else{f=j|32
if(f>=97&&f<=102)g=f-87
else break A
k=h}if(n<m+4){l=l*16+g;++n
continue}a2.$2("an IPv6 part can contain a maximum of 4 hex digits",m)}if(n>m){if(j===46){if(k){if(p<=6){A.lg(a3,m,a5,s,p*2)
p+=2
n=a5
break}a2.$2(a1,m)}break}o=p*2
e=B.c.b1(l,8)
if(!(o<16))return A.b(s,o)
s[o]=e;++o
if(!(o<16))return A.b(s,o)
s[o]=l&255;++p
if(j===58){if(p<8){++n
m=n
l=0
k=!0
continue}a2.$2(a1,n)}break}if(j===58){if(q<0){d=p+1;++n
q=p
p=d
m=n
continue}a2.$2("only one wildcard `::` is allowed",n)}if(q!==p-1)a2.$2("missing part",n)
break}if(n<a5)a2.$2("invalid character",n)
if(p<8){if(q<0)a2.$2("an address without a wildcard must contain exactly 8 parts",a5)
c=q+1
b=p-c
if(b>0){a=c*2
a0=16-b*2
B.x.aN(s,a0,16,s,a)
B.x.d9(s,a,a0,0)}}return s},
lM(a,b,c,d,e,f,g){return new A.cM(a,b,c,d,e,f,g)},
jw(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
bM(a,b,c){throw A.c(A.T(c,a,b))},
lT(a,b){var s=A.jw(b)
if(a===s)return null
return a},
lR(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(b===c)return""
s=a.length
if(!(b>=0&&b<s))return A.b(a,b)
if(a.charCodeAt(b)===91){r=c-1
if(!(r>=0&&r<s))return A.b(a,r)
if(a.charCodeAt(r)!==93)A.bM(a,b,"Missing end `]` to match `[` in host")
q=b+1
if(!(q<s))return A.b(a,q)
p=""
if(a.charCodeAt(q)!==118){o=A.lO(a,q,r)
if(o<r){n=o+1
p=A.jB(a,B.a.M(a,"25",n)?o+3:n,r,"%25")}}else o=r
m=A.lh(a,q,o)
l=B.a.n(a,q,o)
return"["+(m?l.toLowerCase():l)+p+"]"}for(k=b;k<c;++k){if(!(k<s))return A.b(a,k)
if(a.charCodeAt(k)===58){o=B.a.aE(a,"%",b)
o=o>=b&&o<c?o:c
if(o<c){n=o+1
p=A.jB(a,B.a.M(a,"25",n)?o+3:n,c,"%25")}else p=""
A.jh(a,b,o)
return"["+B.a.n(a,b,o)+p+"]"}}return A.lY(a,b,c)},
lO(a,b,c){var s=B.a.aE(a,"%",b)
return s>=b&&s<c?s:c},
jB(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=d!==""?new A.Z(d):null
for(s=a.length,r=b,q=r,p=!0;r<c;){if(!(r>=0&&r<s))return A.b(a,r)
o=a.charCodeAt(r)
if(o===37){n=A.il(a,r,!0)
m=n==null
if(m&&p){r+=3
continue}if(h==null)h=new A.Z("")
l=h.a+=B.a.n(a,q,r)
if(m)n=B.a.n(a,r,r+3)
else if(n==="%")A.bM(a,r,"ZoneID should not contain % anymore")
h.a=l+n
r+=3
q=r
p=!0}else if(o<127&&(u.f.charCodeAt(o)&1)!==0){if(p&&65<=o&&90>=o){if(h==null)h=new A.Z("")
if(q<r){h.a+=B.a.n(a,q,r)
q=r}p=!1}++r}else{k=1
if((o&64512)===55296&&r+1<c){m=r+1
if(!(m<s))return A.b(a,m)
j=a.charCodeAt(m)
if((j&64512)===56320){o=65536+((o&1023)<<10)+(j&1023)
k=2}}i=B.a.n(a,q,r)
if(h==null){h=new A.Z("")
m=h}else m=h
m.a+=i
l=A.ik(o)
m.a+=l
r+=k
q=r}}if(h==null)return B.a.n(a,b,c)
if(q<c){i=B.a.n(a,q,c)
h.a+=i}s=h.a
return s.charCodeAt(0)==0?s:s},
lY(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.f
for(s=a.length,r=b,q=r,p=null,o=!0;r<c;){if(!(r>=0&&r<s))return A.b(a,r)
n=a.charCodeAt(r)
if(n===37){m=A.il(a,r,!0)
l=m==null
if(l&&o){r+=3
continue}if(p==null)p=new A.Z("")
k=B.a.n(a,q,r)
if(!o)k=k.toLowerCase()
j=p.a+=k
i=3
if(l)m=B.a.n(a,r,r+3)
else if(m==="%"){m="%25"
i=1}p.a=j+m
r+=i
q=r
o=!0}else if(n<127&&(g.charCodeAt(n)&32)!==0){if(o&&65<=n&&90>=n){if(p==null)p=new A.Z("")
if(q<r){p.a+=B.a.n(a,q,r)
q=r}o=!1}++r}else if(n<=93&&(g.charCodeAt(n)&1024)!==0)A.bM(a,r,"Invalid character")
else{i=1
if((n&64512)===55296&&r+1<c){l=r+1
if(!(l<s))return A.b(a,l)
h=a.charCodeAt(l)
if((h&64512)===56320){n=65536+((n&1023)<<10)+(h&1023)
i=2}}k=B.a.n(a,q,r)
if(!o)k=k.toLowerCase()
if(p==null){p=new A.Z("")
l=p}else l=p
l.a+=k
j=A.ik(n)
l.a+=j
r+=i
q=r}}if(p==null)return B.a.n(a,b,c)
if(q<c){k=B.a.n(a,q,c)
if(!o)k=k.toLowerCase()
p.a+=k}s=p.a
return s.charCodeAt(0)==0?s:s},
lV(a,b,c){var s,r,q,p
if(b===c)return""
s=a.length
if(!(b<s))return A.b(a,b)
if(!A.jy(a.charCodeAt(b)))A.bM(a,b,"Scheme not starting with alphabetic character")
for(r=b,q=!1;r<c;++r){if(!(r<s))return A.b(a,r)
p=a.charCodeAt(r)
if(!(p<128&&(u.f.charCodeAt(p)&8)!==0))A.bM(a,r,"Illegal scheme character")
if(65<=p&&p<=90)q=!0}a=B.a.n(a,b,c)
return A.lN(q?a.toLowerCase():a)},
lN(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
lW(a,b,c){return A.cN(a,b,c,16,!1,!1)},
lS(a,b,c,d,e,f){var s=e==="file",r=s||f,q=A.cN(a,b,c,128,!0,!0)
if(q.length===0){if(s)return"/"}else if(r&&!B.a.P(q,"/"))q="/"+q
return A.lX(q,e,f)},
lX(a,b,c){var s=b.length===0
if(s&&!c&&!B.a.P(a,"/")&&!B.a.P(a,"\\"))return A.lZ(a,!s||c)
return A.m_(a)},
lU(a,b,c,d){return A.cN(a,b,c,256,!0,!1)},
lQ(a,b,c){return A.cN(a,b,c,256,!0,!1)},
il(a,b,c){var s,r,q,p,o,n,m=u.f,l=b+2,k=a.length
if(l>=k)return"%"
s=b+1
if(!(s>=0&&s<k))return A.b(a,s)
r=a.charCodeAt(s)
if(!(l>=0))return A.b(a,l)
q=a.charCodeAt(l)
p=A.hS(r)
o=A.hS(q)
if(p<0||o<0)return"%"
n=p*16+o
if(n<127){if(!(n>=0))return A.b(m,n)
l=(m.charCodeAt(n)&1)!==0}else l=!1
if(l)return A.M(c&&65<=n&&90>=n?(n|32)>>>0:n)
if(r>=97||q>=97)return B.a.n(a,b,b+3).toUpperCase()
return null},
ik(a){var s,r,q,p,o,n,m,l,k="0123456789ABCDEF"
if(a<=127){s=new Uint8Array(3)
s[0]=37
r=a>>>4
if(!(r<16))return A.b(k,r)
s[1]=k.charCodeAt(r)
s[2]=k.charCodeAt(a&15)}else{if(a>2047)if(a>65535){q=240
p=4}else{q=224
p=3}else{q=192
p=2}r=3*p
s=new Uint8Array(r)
for(o=0;--p,p>=0;q=128){n=B.c.cQ(a,6*p)&63|q
if(!(o<r))return A.b(s,o)
s[o]=37
m=o+1
l=n>>>4
if(!(l<16))return A.b(k,l)
if(!(m<r))return A.b(s,m)
s[m]=k.charCodeAt(l)
l=o+2
if(!(l<r))return A.b(s,l)
s[l]=k.charCodeAt(n&15)
o+=3}}return A.j9(s,0,null)},
cN(a,b,c,d,e,f){var s=A.jA(a,b,c,d,e,f)
return s==null?B.a.n(a,b,c):s},
jA(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null,h=u.f
for(s=!e,r=a.length,q=b,p=q,o=i;q<c;){if(!(q>=0&&q<r))return A.b(a,q)
n=a.charCodeAt(q)
if(n<127&&(h.charCodeAt(n)&d)!==0)++q
else{m=1
if(n===37){l=A.il(a,q,!1)
if(l==null){q+=3
continue}if("%"===l)l="%25"
else m=3}else if(n===92&&f)l="/"
else if(s&&n<=93&&(h.charCodeAt(n)&1024)!==0){A.bM(a,q,"Invalid character")
m=i
l=m}else{if((n&64512)===55296){k=q+1
if(k<c){if(!(k<r))return A.b(a,k)
j=a.charCodeAt(k)
if((j&64512)===56320){n=65536+((n&1023)<<10)+(j&1023)
m=2}}}l=A.ik(n)}if(o==null){o=new A.Z("")
k=o}else k=o
k.a=(k.a+=B.a.n(a,p,q))+l
if(typeof m!=="number")return A.mZ(m)
q+=m
p=q}}if(o==null)return i
if(p<c){s=B.a.n(a,p,c)
o.a+=s}s=o.a
return s.charCodeAt(0)==0?s:s},
jz(a){if(B.a.P(a,"."))return!0
return B.a.bV(a,"/.")!==-1},
m_(a){var s,r,q,p,o,n,m
if(!A.jz(a))return a
s=A.q([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(n===".."){m=s.length
if(m!==0){if(0>=m)return A.b(s,-1)
s.pop()
if(s.length===0)B.b.m(s,"")}p=!0}else{p="."===n
if(!p)B.b.m(s,n)}}if(p)B.b.m(s,"")
return B.b.U(s,"/")},
lZ(a,b){var s,r,q,p,o,n
if(!A.jz(a))return!b?A.jx(a):a
s=A.q([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n){if(s.length!==0&&B.b.gbY(s)!==".."){if(0>=s.length)return A.b(s,-1)
s.pop()}else B.b.m(s,"..")
p=!0}else{p="."===n
if(!p)B.b.m(s,n.length===0&&s.length===0?"./":n)}}if(s.length===0)return"./"
if(p)B.b.m(s,"")
if(!b){if(0>=s.length)return A.b(s,0)
B.b.l(s,0,A.jx(s[0]))}return B.b.U(s,"/")},
jx(a){var s,r,q,p=u.f,o=a.length
if(o>=2&&A.jy(a.charCodeAt(0)))for(s=1;s<o;++s){r=a.charCodeAt(s)
if(r===58)return B.a.n(a,0,s)+"%3A"+B.a.aO(a,s+1)
if(r<=127){if(!(r<128))return A.b(p,r)
q=(p.charCodeAt(r)&8)===0}else q=!0
if(q)break}return a},
lP(a,b){var s,r,q,p,o
for(s=a.length,r=0,q=0;q<2;++q){p=b+q
if(!(p<s))return A.b(a,p)
o=a.charCodeAt(p)
if(48<=o&&o<=57)r=r*16+o-48
else{o|=32
if(97<=o&&o<=102)r=r*16+o-87
else throw A.c(A.aS("Invalid URL encoding",null))}}return r},
im(a,b,c,d,e){var s,r,q,p,o=a.length,n=b
for(;;){if(!(n<c)){s=!0
break}if(!(n<o))return A.b(a,n)
r=a.charCodeAt(n)
q=!0
if(r<=127)if(r!==37)q=r===43
if(q){s=!1
break}++n}if(s)if(B.u===d)return B.a.n(a,b,c)
else p=new A.d0(B.a.n(a,b,c))
else{p=A.q([],t.b)
for(n=b;n<c;++n){if(!(n<o))return A.b(a,n)
r=a.charCodeAt(n)
if(r>127)throw A.c(A.aS("Illegal percent encoding in URI",null))
if(r===37){if(n+3>o)throw A.c(A.aS("Truncated URI",null))
B.b.m(p,A.lP(a,n+1))
n+=2}else if(r===43)B.b.m(p,32)
else B.b.m(p,r)}}t.L.a(p)
return B.Z.d2(p)},
jy(a){var s=a|32
return 97<=s&&s<=122},
jf(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.q([b-1],t.b)
for(s=a.length,r=b,q=-1,p=null;r<s;++r){p=a.charCodeAt(r)
if(p===44||p===59)break
if(p===47){if(q<0){q=r
continue}throw A.c(A.T(k,a,r))}}if(q<0&&r>b)throw A.c(A.T(k,a,r))
while(p!==44){B.b.m(j,r);++r
for(o=-1;r<s;++r){if(!(r>=0))return A.b(a,r)
p=a.charCodeAt(r)
if(p===61){if(o<0)o=r}else if(p===59||p===44)break}if(o>=0)B.b.m(j,o)
else{n=B.b.gbY(j)
if(p!==44||r!==n+7||!B.a.M(a,"base64",n+1))throw A.c(A.T("Expecting '='",a,r))
break}}B.b.m(j,r)
m=r+1
if((j.length&1)===1)a=B.B.dl(a,m,s)
else{l=A.jA(a,m,s,256,!0,!1)
if(l!=null)a=B.a.ah(a,m,s,l)}return new A.h3(a,j,c)},
jQ(a,b,c,d,e){var s,r,q,p,o,n='\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe3\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0e\x03\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\n\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\xeb\xeb\x8b\xeb\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x83\xeb\xeb\x8b\xeb\x8b\xeb\xcd\x8b\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x92\x83\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x8b\xeb\x8b\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xebD\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12D\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe8\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x05\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x10\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\f\xec\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\xec\f\xec\f\xec\xcd\f\xec\f\f\f\f\f\f\f\f\f\xec\f\f\f\f\f\f\f\f\f\f\xec\f\xec\f\xec\f\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\r\xed\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\xed\r\xed\r\xed\xed\r\xed\r\r\r\r\r\r\r\r\r\xed\r\r\r\r\r\r\r\r\r\r\xed\r\xed\r\xed\r\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0f\xea\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe9\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\t\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x11\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xe9\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\t\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x13\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\xf5\x15\x15\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5'
for(s=a.length,r=b;r<c;++r){if(!(r<s))return A.b(a,r)
q=a.charCodeAt(r)^96
if(q>95)q=31
p=d*96+q
if(!(p<2112))return A.b(n,p)
o=n.charCodeAt(p)
d=o&31
B.b.l(e,o>>>5,r)}return d},
a5:function a5(a,b,c){this.a=a
this.b=b
this.c=c},
fF:function fF(){},
fG:function fG(){},
bX:function bX(a){this.a=a},
H:function H(){},
cV:function cV(a){this.a=a},
aF:function aF(){},
aj:function aj(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bz:function bz(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
d9:function d9(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
ct:function ct(a){this.a=a},
du:function du(a){this.a=a},
bB:function bB(a){this.a=a},
d1:function d1(a){this.a=a},
dj:function dj(){},
co:function co(){},
hd:function hd(a){this.a=a},
ax:function ax(a,b,c){this.a=a
this.b=b
this.c=c},
j:function j(){},
aD:function aD(a,b,c){this.a=a
this.b=b
this.$ti=c},
X:function X(){},
v:function v(){},
dV:function dV(){},
Z:function Z(a){this.a=a},
h5:function h5(a){this.a=a},
h4:function h4(a){this.a=a},
cM:function cM(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
h3:function h3(a,b,c){this.a=a
this.b=b
this.c=c},
dS:function dS(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=null},
dE:function dE(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
kN(a,b,c){var s,r=document.body
r.toString
s=t.ac
return t.h.a(new A.N(new A.a1(B.q.S(r,a,b,c)),s.i("E(D.E)").a(new A.fH()),s.i("N<D.E>")).gab(0))},
bZ(a){var s,r,q="element tag unavailable"
try{s=a.tagName
s.toString
q=s}catch(r){}return q},
iR(a){var s=null
return A.iS(a,s,s,s,s,s).dA(new A.fI(),t.N)},
iS(a,b,c,d,e,f){var s,r,q=new A.Q($.J,t.ao),p=new A.cw(q,t.gD),o=new XMLHttpRequest()
o.toString
B.L.dm(o,b==null?"GET":b,a,!0)
if(d!=null)d.q(0,new A.fJ(o))
s=t.gx
r=t.x
A.x(o,"load",s.a(new A.fK(o,p)),!1,r)
A.x(o,"error",s.a(p.gd1()),!1,r)
if(e!=null)o.send(e)
else o.send()
return q},
x(a,b,c,d,e){var s=A.mM(new A.hc(c),t.B)
if(s!=null)J.kx(a,b,s,!1)
return new A.cz(a,b,s,!1,e.i("cz<0>"))},
jl(a){var s=document.createElement("a")
s.toString
s=new A.dR(s,t.d.a(window.location))
s=new A.be(s)
s.co(a)
return s},
lo(a,b,c,d){t.h.a(a)
A.k(b)
A.k(c)
t.cr.a(d)
return!0},
lp(a,b,c,d){var s,r,q,p,o,n
t.h.a(a)
A.k(b)
A.k(c)
s=t.cr.a(d).a
r=s.a
B.A.sde(r,c)
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
jr(){var s=t.N,r=A.j_(B.w,s),q=A.q(["TEMPLATE"],t.s),p=t.dG.a(new A.hy())
s=new A.dX(r,A.cc(s),A.cc(s),A.cc(s),null)
s.cp(null,new A.a0(B.w,p,t.e),q,null)
return s},
jH(a){var s,r="postMessage" in a
r.toString
if(r){s=A.ln(a)
return s}else return t.ch.a(a)},
ln(a){var s=window
s.toString
if(a===s)return t.ci.a(a)
else return new A.dD()},
mM(a,b){var s=$.J
if(s===B.h)return a
return s.bK(a,b)},
f:function f(){},
bp:function bp(){},
cU:function cU(){},
bq:function bq(){},
aU:function aU(){},
bs:function bs(){},
ap:function ap(){},
aW:function aW(){},
fr:function fr(){},
aX:function aX(){},
d4:function d4(){},
bW:function bW(){},
d5:function d5(){},
bK:function bK(a,b){this.a=a
this.$ti=b},
y:function y(){},
fH:function fH(){},
e:function e(){},
A:function A(){},
d8:function d8(){},
c0:function c0(){},
ak:function ak(){},
fI:function fI(){},
fJ:function fJ(a){this.a=a},
fK:function fK(a,b){this.a=a
this.b=b},
c1:function c1(){},
b_:function b_(){},
bx:function bx(){},
a7:function a7(){},
a1:function a1(a){this.a=a},
m:function m(){},
ch:function ch(){},
am:function am(){},
b8:function b8(){},
cp:function cp(){},
fZ:function fZ(a){this.a=a},
cs:function cs(){},
dr:function dr(){},
ds:function ds(){},
bD:function bD(){},
b9:function b9(){},
ao:function ao(){},
cv:function cv(){},
bJ:function bJ(){},
cB:function cB(){},
dB:function dB(){},
dF:function dF(a){this.a=a},
dG:function dG(a){this.a=a},
i6:function i6(a,b){this.a=a
this.$ti=b},
cy:function cy(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
bb:function bb(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
cz:function cz(a,b,c,d,e){var _=this
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
hc:function hc(a){this.a=a},
be:function be(a){this.a=a},
aq:function aq(){},
ci:function ci(a){this.a=a},
fV:function fV(a){this.a=a},
fU:function fU(a,b,c){this.a=a
this.b=b
this.c=c},
cF:function cF(){},
hw:function hw(){},
hx:function hx(){},
dX:function dX(a,b,c,d,e){var _=this
_.e=a
_.a=b
_.b=c
_.c=d
_.d=e},
hy:function hy(){},
dW:function dW(){},
aY:function aY(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.d=null
_.$ti=c},
dD:function dD(){},
dR:function dR(a,b){this.a=a
this.b=b},
cO:function cO(a){this.a=a
this.b=0},
hI:function hI(a){this.a=a},
dC:function dC(){},
dO:function dO(){},
dP:function dP(){},
dT:function dT(){},
dY:function dY(){},
dZ:function dZ(){},
i3(){var s=window.navigator.userAgent
s.toString
return s},
d3:function d3(){},
fq:function fq(a){this.a=a},
ho:function ho(){},
bA:function bA(){},
cX:function cX(a){this.a=a},
h:function h(){},
n5(){var s=document
s.toString
B.v.cU(s,"DOMContentLoaded",new A.hX())},
hX:function hX(){},
ec:function ec(){var _=this
_.a=null
_.b="view-dashboard"
_.d=_.c=null
_.CW=_.ay=_.ax=_.at=_.as=_.Q=_.z=_.y=_.x=_.w=_.r=_.f=_.e=$
_.cy=_.cx=null},
eL:function eL(){},
eJ:function eJ(a){this.a=a},
eK:function eK(a){this.a=a},
ej:function ej(a,b){this.a=a
this.b=b},
ei:function ei(){},
ek:function ek(a,b){this.a=a
this.b=b},
el:function el(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ev:function ev(a,b,c){this.a=a
this.b=b
this.c=c},
ew:function ew(a,b){this.a=a
this.b=b},
ex:function ex(a){this.a=a},
eh:function eh(a,b){this.a=a
this.b=b},
ey:function ey(a){this.a=a},
ez:function ez(a){this.a=a},
eA:function eA(a){this.a=a},
eB:function eB(a){this.a=a},
eC:function eC(a,b){this.a=a
this.b=b},
em:function em(a,b){this.a=a
this.b=b},
en:function en(a){this.a=a},
eo:function eo(a,b,c){this.a=a
this.b=b
this.c=c},
ep:function ep(a,b,c){this.a=a
this.b=b
this.c=c},
eq:function eq(a,b,c){this.a=a
this.b=b
this.c=c},
er:function er(a){this.a=a},
es:function es(a){this.a=a},
et:function et(a){this.a=a},
eu:function eu(a){this.a=a},
eD:function eD(){},
fg:function fg(){},
fm:function fm(a){this.a=a},
fn:function fn(a){this.a=a},
eW:function eW(){},
eX:function eX(a,b){this.a=a
this.b=b},
eV:function eV(a,b){this.a=a
this.b=b},
eY:function eY(a,b){this.a=a
this.b=b},
eU:function eU(a){this.a=a},
eZ:function eZ(a,b){this.a=a
this.b=b},
eS:function eS(a){this.a=a},
eT:function eT(a,b){this.a=a
this.b=b},
f_:function f_(a,b,c){this.a=a
this.b=b
this.c=c},
eP:function eP(a){this.a=a},
eQ:function eQ(a){this.a=a},
eR:function eR(a,b){this.a=a
this.b=b},
f0:function f0(a,b,c){this.a=a
this.b=b
this.c=c},
eN:function eN(a){this.a=a},
eO:function eO(){},
f2:function f2(a,b,c){this.a=a
this.b=b
this.c=c},
f3:function f3(a,b){this.a=a
this.b=b},
f1:function f1(a,b){this.a=a
this.b=b},
fb:function fb(){},
fc:function fc(a,b,c){this.a=a
this.b=b
this.c=c},
fd:function fd(){},
fe:function fe(){},
ff:function ff(a,b){this.a=a
this.b=b},
f4:function f4(a){this.a=a},
f5:function f5(a,b){this.a=a
this.b=b},
f6:function f6(){},
f7:function f7(a){this.a=a},
f8:function f8(a){this.a=a},
eE:function eE(a){this.a=a},
eF:function eF(a){this.a=a},
eG:function eG(a){this.a=a},
eH:function eH(a,b){this.a=a
this.b=b},
eI:function eI(a){this.a=a},
fi:function fi(a){this.a=a},
fj:function fj(a,b,c){this.a=a
this.b=b
this.c=c},
fh:function fh(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eM:function eM(a,b){this.a=a
this.b=b},
fl:function fl(a){this.a=a},
fk:function fk(){},
f9:function f9(){},
fa:function fa(a,b){this.a=a
this.b=b},
ed:function ed(a,b,c){this.a=a
this.b=b
this.c=c},
ee:function ee(a){this.a=a},
ef:function ef(a){this.a=a},
eg:function eg(a,b,c){this.a=a
this.b=b
this.c=c},
fs:function fs(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=_.r=!1},
fy:function fy(a){this.a=a},
ft:function ft(){},
fw:function fw(a){this.a=a},
fB:function fB(a){this.a=a},
fA:function fA(a){this.a=a},
fC:function fC(a){this.a=a},
fD:function fD(a,b){this.a=a
this.b=b},
fu:function fu(a){this.a=a},
fv:function fv(){},
fx:function fx(a,b){this.a=a
this.b=b},
fz:function fz(a,b){this.a=a
this.b=b},
hZ(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
nc(a){throw A.P(A.iX(a),new Error())},
a4(){throw A.P(A.kX(""),new Error())},
k1(){throw A.P(A.iX(""),new Error())}},B={}
var w=[A,J,B]
var $={}
A.i8.prototype={}
J.c3.prototype={
a_(a,b){return a===b},
gF(a){return A.dl(a)},
j(a){return"Instance of '"+A.dm(a)+"'"},
gZ(a){return A.bi(A.iq(this))}}
J.dc.prototype={
j(a){return String(a)},
gF(a){return a?519018:218159},
gZ(a){return A.bi(t.y)},
$iab:1,
$iE:1}
J.c5.prototype={
a_(a,b){return null==b},
j(a){return"null"},
gF(a){return 0},
$iab:1}
J.a_.prototype={$io:1}
J.aL.prototype={
gF(a){return 0},
j(a){return String(a)}}
J.dk.prototype={}
J.bF.prototype={}
J.az.prototype={
j(a){var s=a[$.k6()]
if(s==null)s=a[$.k5()]
if(s==null)return this.ck(a)
return"JavaScript function for "+J.L(s)},
$iaZ:1}
J.bu.prototype={
gF(a){return 0},
j(a){return String(a)}}
J.bv.prototype={
gF(a){return 0},
j(a){return String(a)}}
J.O.prototype={
m(a,b){A.K(a).c.a(b)
a.$flags&1&&A.aR(a,29)
a.push(b)},
b4(a,b,c){var s
A.K(a).c.a(c)
a.$flags&1&&A.aR(a,"insert",2)
s=a.length
if(b>s)throw A.c(A.j4(b,null))
a.splice(b,0,c)},
v(a,b){var s
a.$flags&1&&A.aR(a,"remove",1)
for(s=0;s<a.length;++s)if(J.r(a[s],b)){a.splice(s,1)
return!0}return!1},
d_(a){a.$flags&1&&A.aR(a,"clear","clear")
a.length=0},
q(a,b){var s,r
A.K(a).i("~(1)").a(b)
s=a.length
for(r=0;r<s;++r){b.$1(a[r])
if(a.length!==s)throw A.c(A.S(a))}},
aq(a,b,c){var s=A.K(a)
return new A.a0(a,s.D(c).i("1(2)").a(b),s.i("@<1>").D(c).i("a0<1,2>"))},
U(a,b){var s,r=A.fR(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.l(r,s,A.d(a[s]))
return r.join(b)},
dn(a,b){var s,r,q
A.K(a).i("1(1,1)").a(b)
s=a.length
if(s===0)throw A.c(A.da())
if(0>=s)return A.b(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.c(A.S(a))}return r},
dc(a,b,c,d){var s,r,q
d.a(b)
A.K(a).D(d).i("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.c(A.S(a))}return r},
bP(a,b,c){var s,r,q,p=A.K(a)
p.i("E(1)").a(b)
p.i("1()?").a(c)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.c(A.S(a))}if(c!=null)return c.$0()
throw A.c(A.da())},
bO(a,b){return this.bP(a,b,null)},
L(a,b){if(!(b>=0&&b<a.length))return A.b(a,b)
return a[b]},
gbN(a){if(a.length>0)return a[0]
throw A.c(A.da())},
gbY(a){var s=a.length
if(s>0)return a[s-1]
throw A.c(A.da())},
ao(a,b){var s,r
A.K(a).i("E(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.c(A.S(a))}return!1},
cg(a,b){var s,r,q,p,o,n=A.K(a)
n.i("i(1,1)?").a(b)
a.$flags&2&&A.aR(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.dG()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.bR(b,2))
if(p>0)this.cM(a,p)},
cM(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
A(a,b){var s
for(s=0;s<a.length;++s)if(J.r(a[s],b))return!0
return!1},
gG(a){return a.length===0},
gO(a){return a.length!==0},
j(a){return A.i7(a,"[","]")},
gI(a){return new J.aT(a,a.length,A.K(a).i("aT<1>"))},
gF(a){return A.dl(a)},
gk(a){return a.length},
h(a,b){if(!(b>=0&&b<a.length))throw A.c(A.hP(a,b))
return a[b]},
l(a,b,c){var s
A.K(a).c.a(c)
a.$flags&2&&A.aR(a)
s=a.length
if(b>=s)throw A.c(A.hP(a,b))
a[b]=c},
df(a,b){var s
A.K(a).i("E(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$it:1,
$ij:1,
$iI:1}
J.db.prototype={
dC(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.dm(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.fL.prototype={}
J.aT.prototype={
gE(){var s=this.d
return s==null?this.$ti.c.a(s):s},
u(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.i_(q)
throw A.c(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$ia6:1}
J.c6.prototype={
a7(a,b){var s
A.w(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaF(b)
if(this.gaF(a)===s)return 0
if(this.gaF(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaF(a){return a===0?1/a<0:a<0},
aB(a,b,c){if(B.c.a7(b,c)>0)throw A.c(A.iu(b))
if(this.a7(a,b)<0)return b
if(this.a7(a,c)>0)return c
return a},
p(a,b){var s
if(b>20)throw A.c(A.a8(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaF(a))return"-"+s
return s},
j(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gF(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
a4(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
cn(a,b){if((a|0)===a)if(b>=1)return a/b|0
return this.bC(a,b)},
a1(a,b){return(a|0)===a?a/b|0:this.bC(a,b)},
bC(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.c(A.aH("Result of truncating division is "+A.d(s)+": "+A.d(a)+" ~/ "+b))},
b1(a,b){var s
if(a>0)s=this.bB(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cQ(a,b){if(0>b)throw A.c(A.iu(b))
return this.bB(a,b)},
bB(a,b){return b>31?0:a>>>b},
gZ(a){return A.bi(t.n)},
$ibj:1,
$iY:1}
J.c4.prototype={
gZ(a){return A.bi(t.S)},
$iab:1,
$ii:1}
J.dd.prototype={
gZ(a){return A.bi(t.i)},
$iab:1}
J.b0.prototype={
ah(a,b,c,d){var s=A.cm(b,c,a.length)
return a.substring(0,b)+d+a.substring(s)},
M(a,b,c){var s
if(c<0||c>a.length)throw A.c(A.a8(c,0,a.length,null,null))
s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)},
P(a,b){return this.M(a,b,0)},
n(a,b,c){A.jF(c)
return a.substring(b,A.cm(b,c,a.length))},
aO(a,b){return this.n(a,b,null)},
dB(a){return a.toLowerCase()},
J(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.b(p,0)
if(p.charCodeAt(0)===133){s=J.kU(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.b(p,r)
q=p.charCodeAt(r)===133?J.kV(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
bi(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.c(B.I)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
Y(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bi(c,s)+a},
aE(a,b,c){var s
if(c<0||c>a.length)throw A.c(A.a8(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
bV(a,b){return this.aE(a,b,0)},
aD(a,b,c){var s=a.length
if(c>s)throw A.c(A.a8(c,0,s,null,null))
return A.nb(a,b,c)},
A(a,b){return this.aD(a,b,0)},
j(a){return a},
gF(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gZ(a){return A.bi(t.N)},
gk(a){return a.length},
$iab:1,
$ifX:1,
$ia:1}
A.c8.prototype={
j(a){return"LateInitializationError: "+this.a}}
A.d0.prototype={
gk(a){return this.a.length},
h(a,b){var s=this.a
if(!(b>=0&&b<s.length))return A.b(s,b)
return s.charCodeAt(b)}}
A.fY.prototype={}
A.t.prototype={}
A.V.prototype={
gI(a){var s=this
return new A.b2(s,s.gk(s),A.z(s).i("b2<V.E>"))},
gG(a){return this.gk(this)===0},
A(a,b){var s,r=this,q=r.gk(r)
for(s=0;s<q;++s){if(J.r(r.L(0,s),b))return!0
if(q!==r.gk(r))throw A.c(A.S(r))}return!1},
U(a,b){var s,r,q,p=this,o=p.gk(p)
if(b.length!==0){if(o===0)return""
s=A.d(p.L(0,0))
if(o!==p.gk(p))throw A.c(A.S(p))
for(r=s,q=1;q<o;++q){r=r+b+A.d(p.L(0,q))
if(o!==p.gk(p))throw A.c(A.S(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.d(p.L(0,q))
if(o!==p.gk(p))throw A.c(A.S(p))}return r.charCodeAt(0)==0?r:r}},
aJ(a,b){return this.cj(0,A.z(this).i("E(V.E)").a(b))},
aq(a,b,c){var s=A.z(this)
return new A.a0(this,s.D(c).i("1(V.E)").a(b),s.i("@<V.E>").D(c).i("a0<1,2>"))},
ar(a,b){var s=A.b4(this,A.z(this).i("V.E"))
return s},
aH(a){return this.ar(0,!0)}}
A.cr.prototype={
gcD(){var s=J.W(this.a),r=this.c
if(r==null||r>s)return s
return r},
gcR(){var s=J.W(this.a),r=this.b
if(r>s)return s
return r},
gk(a){var s,r=J.W(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
L(a,b){var s=this,r=s.gcR()+b
if(b<0||r>=s.gcD())throw A.c(A.c2(b,s.gk(0),s,null,"index"))
return J.iD(s.a,r)},
ar(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.u(n),l=m.gk(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.iU(0,n):J.iT(0,n)}r=A.fR(s,m.L(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.b.l(r,q,m.L(n,o+q))
if(m.gk(n)<l)throw A.c(A.S(p))}return r},
aH(a){return this.ar(0,!0)}}
A.b2.prototype={
gE(){var s=this.d
return s==null?this.$ti.c.a(s):s},
u(){var s,r=this,q=r.a,p=J.u(q),o=p.gk(q)
if(r.b!==o)throw A.c(A.S(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.L(q,s);++r.c
return!0},
$ia6:1}
A.b5.prototype={
gI(a){return new A.ce(J.bo(this.a),this.b,A.z(this).i("ce<1,2>"))},
gk(a){return J.W(this.a)},
gG(a){return J.eb(this.a)}}
A.bY.prototype={$it:1}
A.ce.prototype={
u(){var s=this,r=s.b
if(r.u()){s.a=s.c.$1(r.gE())
return!0}s.a=null
return!1},
gE(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$ia6:1}
A.a0.prototype={
gk(a){return J.W(this.a)},
L(a,b){return this.b.$1(J.iD(this.a,b))}}
A.N.prototype={
gI(a){return new A.cu(J.bo(this.a),this.b,this.$ti.i("cu<1>"))}}
A.cu.prototype={
u(){var s,r
for(s=this.a,r=this.b;s.u();)if(r.$1(s.gE()))return!0
return!1},
gE(){return this.a.gE()},
$ia6:1}
A.bt.prototype={}
A.ba.prototype={
l(a,b,c){A.z(this).i("ba.E").a(c)
throw A.c(A.aH("Cannot modify an unmodifiable list"))}}
A.bG.prototype={}
A.dN.prototype={
gk(a){return J.W(this.a)},
L(a,b){var s=J.W(this.a)
if(0>b||b>=s)A.at(A.c2(b,s,this,null,"index"))
return b}}
A.b3.prototype={
h(a,b){return this.N(0,b)?J.l(this.a,A.aP(b)):null},
gk(a){return J.W(this.a)},
gK(a){return new A.dN(this.a)},
gG(a){return J.eb(this.a)},
gO(a){return J.i1(this.a)},
N(a,b){return A.it(b)&&b>=0&&b<J.W(this.a)},
q(a,b){var s,r,q,p
this.$ti.i("~(i,1)").a(b)
s=this.a
r=J.u(s)
q=r.gk(s)
for(p=0;p<q;++p){b.$2(p,r.h(s,p))
if(q!==r.gk(s))throw A.c(A.S(s))}}}
A.bT.prototype={
gG(a){return this.gk(this)===0},
gO(a){return this.gk(this)!==0},
j(a){return A.ia(this)},
l(a,b,c){var s=A.z(this)
s.c.a(b)
s.y[1].a(c)
A.kK()},
$ip:1}
A.bU.prototype={
gk(a){return this.b.length},
gcH(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
N(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
h(a,b){if(!this.N(0,b))return null
return this.b[this.a[b]]},
q(a,b){var s,r,q,p
this.$ti.i("~(1,2)").a(b)
s=this.gcH()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])}}
A.cn.prototype={}
A.h1.prototype={
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
A.cj.prototype={
j(a){return"Null check operator used on a null value"}}
A.df.prototype={
j(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.dv.prototype={
j(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.fW.prototype={
j(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.c_.prototype={}
A.cG.prototype={
j(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ias:1}
A.aJ.prototype={
j(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.k2(r==null?"unknown":r)+"'"},
$iaZ:1,
gdF(){return this},
$C:"$1",
$R:1,
$D:null}
A.cZ.prototype={$C:"$0",$R:0}
A.d_.prototype={$C:"$2",$R:2}
A.dt.prototype={}
A.dq.prototype={
j(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.k2(s)+"'"}}
A.br.prototype={
a_(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.br))return!1
return this.$_target===b.$_target&&this.a===b.a},
gF(a){return(A.jZ(this.a)^A.dl(this.$_target))>>>0},
j(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.dm(this.a)+"'")}}
A.dp.prototype={
j(a){return"RuntimeError: "+this.a}}
A.aB.prototype={
gk(a){return this.a},
gG(a){return this.a===0},
gO(a){return this.a!==0},
gK(a){return new A.b1(this,A.z(this).i("b1<1>"))},
N(a,b){var s=this.b
if(s==null)return!1
return s[b]!=null},
R(a,b){J.e9(A.z(this).i("p<1,2>").a(b),new A.fM(this))},
h(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.dh(b)},
dh(a){var s,r,q=this.d
if(q==null)return null
s=q[this.bW(a)]
r=this.bX(s,a)
if(r<0)return null
return s[r].b},
l(a,b,c){var s,r,q=this,p=A.z(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bo(s==null?q.b=q.b_():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bo(r==null?q.c=q.b_():r,b,c)}else q.di(b,c)},
di(a,b){var s,r,q,p,o=this,n=A.z(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.b_()
r=o.bW(a)
q=s[r]
if(q==null)s[r]=[o.aQ(a,b)]
else{p=o.bX(q,a)
if(p>=0)q[p].b=b
else q.push(o.aQ(a,b))}},
q(a,b){var s,r,q=this
A.z(q).i("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.c(A.S(q))
s=s.c}},
bo(a,b,c){var s,r=A.z(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.aQ(b,c)
else s.b=c},
cs(){this.r=this.r+1&1073741823},
aQ(a,b){var s=this,r=A.z(s),q=new A.fP(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.cs()
return q},
bW(a){return J.ea(a)&1073741823},
bX(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.r(a[r].a,b))return r
return-1},
j(a){return A.ia(this)},
b_(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$iiY:1}
A.fM.prototype={
$2(a,b){var s=this.a,r=A.z(s)
s.l(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.z(this.a).i("~(1,2)")}}
A.fP.prototype={}
A.b1.prototype={
gk(a){return this.a.a},
gG(a){return this.a.a===0},
gI(a){var s=this.a
return new A.c9(s,s.r,s.e,this.$ti.i("c9<1>"))},
A(a,b){return this.a.N(0,b)}}
A.c9.prototype={
gE(){return this.d},
u(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.S(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$ia6:1}
A.aC.prototype={
gk(a){return this.a.a},
gG(a){return this.a.a===0},
gI(a){var s=this.a
return new A.ca(s,s.r,s.e,this.$ti.i("ca<1>"))},
q(a,b){var s,r,q
this.$ti.i("~(1)").a(b)
s=this.a
r=s.e
q=s.r
while(r!=null){b.$1(r.b)
if(q!==s.r)throw A.c(A.S(s))
r=r.c}}}
A.ca.prototype={
gE(){return this.d},
u(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.S(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$ia6:1}
A.hT.prototype={
$1(a){return this.a(a)},
$S:13}
A.hU.prototype={
$2(a,b){return this.a(a,b)},
$S:31}
A.hV.prototype={
$1(a){return this.a(A.k(a))},
$S:33}
A.de.prototype={
j(a){return"RegExp/"+this.a+"/"+this.b.flags},
da(a){var s=this.b.exec(a)
if(s==null)return null
return new A.ht(s)},
$ifX:1,
$il6:1}
A.ht.prototype={}
A.cf.prototype={
cG(a,b,c,d){var s=A.a8(b,0,c,d,null)
throw A.c(s)},
bt(a,b,c,d){if(b>>>0!==b||b>c)this.cG(a,b,c,d)}}
A.aE.prototype={
gk(a){return a.length},
$iaA:1}
A.aM.prototype={
l(a,b,c){A.aP(c)
a.$flags&2&&A.aR(a)
A.ip(b,a,a.length)
a[b]=c},
aN(a,b,c,d,e){var s,r,q,p
t.hb.a(d)
a.$flags&2&&A.aR(a,5)
if(t.eB.b(d)){s=a.length
this.bt(a,b,s,"start")
this.bt(a,c,s,"end")
if(b>c)A.at(A.a8(b,0,c,null,null))
r=c-b
if(e<0)A.at(A.aS(e,null))
q=d.length
if(q-e<r)A.at(A.bC("Not enough elements"))
p=e!==0||q!==r?d.subarray(e,e+r):d
a.set(p,b)
return}this.cl(a,b,c,d,e)},
$it:1,
$ij:1,
$iI:1}
A.di.prototype={
gZ(a){return B.W},
h(a,b){A.ip(b,a,a.length)
return a[b]},
$iab:1}
A.cg.prototype={
gZ(a){return B.Y},
gk(a){return a.length},
h(a,b){A.ip(b,a,a.length)
return a[b]},
$iab:1,
$iie:1}
A.cC.prototype={}
A.cD.prototype={}
A.an.prototype={
i(a){return A.hD(v.typeUniverse,this,a)},
D(a){return A.lJ(v.typeUniverse,this,a)}}
A.dI.prototype={}
A.hB.prototype={
j(a){return A.a2(this.a,null)}}
A.dH.prototype={
j(a){return this.a}}
A.bL.prototype={$iaF:1}
A.h9.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:18}
A.h8.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:19}
A.ha.prototype={
$0(){this.a.$0()},
$S:7}
A.hb.prototype={
$0(){this.a.$0()},
$S:7}
A.cH.prototype={
cq(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(A.bR(new A.hA(this,b),0),a)
else throw A.c(A.aH("`setTimeout()` not found."))},
cr(a,b){if(self.setTimeout!=null)this.b=self.setInterval(A.bR(new A.hz(this,a,Date.now(),b),0),a)
else throw A.c(A.aH("Periodic timer."))},
cZ(){if(self.setTimeout!=null){var s=this.b
if(s==null)return
if(this.a)self.clearTimeout(s)
else self.clearInterval(s)
this.b=null}else throw A.c(A.aH("Canceling a timer."))},
$ibE:1}
A.hA.prototype={
$0(){var s=this.a
s.b=null
s.c=1
this.b.$0()},
$S:2}
A.hz.prototype={
$0(){var s,r=this,q=r.a,p=q.c+1,o=r.b
if(o>0){s=Date.now()-r.c
if(s>(p+1)*o)p=B.c.cn(s,o)}q.c=p
r.d.$1(q)},
$S:7}
A.dz.prototype={
b2(a,b){var s,r=this,q=r.$ti
q.i("1/?").a(b)
if(b==null)b=q.c.a(b)
if(!r.b)r.a.bq(b)
else{s=r.a
if(q.i("ay<1>").b(b))s.bs(b)
else s.bu(b)}},
aC(a,b){var s=this.a
if(this.b)s.aU(new A.ag(a,b))
else s.aS(new A.ag(a,b))}}
A.hJ.prototype={
$1(a){return this.a.$2(0,a)},
$S:35}
A.hK.prototype={
$2(a,b){this.a.$2(1,new A.c_(a,t.l.a(b)))},
$S:48}
A.hO.prototype={
$2(a,b){this.a(A.aP(a),b)},
$S:22}
A.ag.prototype={
j(a){return A.d(this.a)},
$iH:1,
gak(){return this.b}}
A.cx.prototype={
aC(a,b){var s=this.a
if((s.a&30)!==0)throw A.c(A.bC("Future already completed"))
s.aS(A.ml(a,b))},
bM(a){return this.aC(a,null)}}
A.cw.prototype={
b2(a,b){var s,r=this.$ti
r.i("1/?").a(b)
s=this.a
if((s.a&30)!==0)throw A.c(A.bC("Future already completed"))
s.bq(r.i("1/").a(b))}}
A.bc.prototype={
dj(a){if((this.c&15)!==6)return!0
return this.b.b.bb(t.al.a(this.d),a.a,t.y,t.K)},
dd(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.W.b(q))p=l.dv(q,m,a.b,o,n,t.l)
else p=l.bb(t.v.a(q),m,o,n)
try{o=r.$ti.i("2/").a(p)
return o}catch(s){if(t.eK.b(A.ae(s))){if((r.c&1)!==0)throw A.c(A.aS("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.c(A.aS("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.Q.prototype={
bc(a,b,c){var s,r,q,p=this.$ti
p.D(c).i("1/(2)").a(a)
s=$.J
if(s===B.h){if(b!=null&&!t.W.b(b)&&!t.v.b(b))throw A.c(A.fo(b,"onError",u.c))}else{c.i("@<0/>").D(p.c).i("1(2)").a(a)
if(b!=null)b=A.mB(b,s)}r=new A.Q(s,c.i("Q<0>"))
q=b==null?1:3
this.aR(new A.bc(r,q,a,b,p.i("@<1>").D(c).i("bc<1,2>")))
return r},
dA(a,b){return this.bc(a,null,b)},
bE(a,b,c){var s,r=this.$ti
r.D(c).i("1/(2)").a(a)
s=new A.Q($.J,c.i("Q<0>"))
this.aR(new A.bc(s,19,a,b,r.i("@<1>").D(c).i("bc<1,2>")))
return s},
cP(a){this.a=this.a&1|16
this.c=a},
aw(a){this.a=a.a&30|this.a&1
this.c=a.c},
aR(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.aR(a)
return}r.aw(s)}A.e4(null,null,r.b,t.M.a(new A.he(r,a)))}},
by(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t._.a(m.c)
if((n.a&24)===0){n.by(a)
return}m.aw(n)}l.a=m.az(a)
A.e4(null,null,m.b,t.M.a(new A.hi(l,m)))}},
am(){var s=t.F.a(this.c)
this.c=null
return this.az(s)},
az(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bu(a){var s,r=this
r.$ti.c.a(a)
s=r.am()
r.a=8
r.c=a
A.bd(r,s)},
cz(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.am()
q.aw(a)
A.bd(q,r)},
aU(a){var s=this.am()
this.cP(a)
A.bd(this,s)},
bq(a){var s=this.$ti
s.i("1/").a(a)
if(s.i("ay<1>").b(a)){this.bs(a)
return}this.cv(a)},
cv(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.e4(null,null,s.b,t.M.a(new A.hg(s,a)))},
bs(a){A.ig(this.$ti.i("ay<1>").a(a),this,!1)
return},
aS(a){this.a^=2
A.e4(null,null,this.b,t.M.a(new A.hf(this,a)))},
$iay:1}
A.he.prototype={
$0(){A.bd(this.a,this.b)},
$S:2}
A.hi.prototype={
$0(){A.bd(this.b,this.a.a)},
$S:2}
A.hh.prototype={
$0(){A.ig(this.a.a,this.b,!0)},
$S:2}
A.hg.prototype={
$0(){this.a.bu(this.b)},
$S:2}
A.hf.prototype={
$0(){this.a.aU(this.b)},
$S:2}
A.hl.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.du(t.fO.a(q.d),t.z)}catch(p){s=A.ae(p)
r=A.bm(p)
if(k.c&&t.u.a(k.b.a.c).a===s){q=k.a
q.c=t.u.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.i2(q)
n=k.a
n.c=new A.ag(q,o)
q=n}q.b=!0
return}if(j instanceof A.Q&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.u.a(j.c)
q.b=!0}return}if(j instanceof A.Q){m=k.b.a
l=new A.Q(m.b,m.$ti)
j.bc(new A.hm(l,m),new A.hn(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:2}
A.hm.prototype={
$1(a){this.a.cz(this.b)},
$S:18}
A.hn.prototype={
$2(a,b){A.bN(a)
t.l.a(b)
this.a.aU(new A.ag(a,b))},
$S:20}
A.hk.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.bb(o.i("2/(1)").a(p.d),m,o.i("2/"),n)}catch(l){s=A.ae(l)
r=A.bm(l)
q=s
p=r
if(p==null)p=A.i2(q)
o=this.a
o.c=new A.ag(q,p)
o.b=!0}},
$S:2}
A.hj.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.u.a(l.a.a.c)
p=l.b
if(p.a.dj(s)&&p.a.e!=null){p.c=p.a.dd(s)
p.b=!1}}catch(o){r=A.ae(o)
q=A.bm(o)
p=t.u.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.i2(p)
m=l.b
m.c=new A.ag(p,n)
p=m}p.b=!0}},
$S:2}
A.dA.prototype={}
A.cq.prototype={
gk(a){var s,r,q=this,p={},o=new A.Q($.J,t.fJ)
p.a=0
s=A.z(q)
r=s.i("~(1)?").a(new A.h_(p,q))
t.g5.a(new A.h0(p,o))
A.x(q.a,q.b,r,!1,s.c)
return o}}
A.h_.prototype={
$1(a){A.z(this.b).c.a(a);++this.a.a},
$S(){return A.z(this.b).i("~(1)")}}
A.h0.prototype={
$0(){var s=this.b,r=s.$ti,q=r.i("1/").a(this.a.a),p=s.am()
r.c.a(q)
s.a=8
s.c=q
A.bd(s,p)},
$S:2}
A.dU.prototype={}
A.cP.prototype={$ijj:1}
A.dQ.prototype={
dw(a){var s,r,q
t.M.a(a)
try{if(B.h===$.J){a.$0()
return}A.jN(null,null,this,a,t.H)}catch(q){s=A.ae(q)
r=A.bm(q)
A.hM(A.bN(s),t.l.a(r))}},
dz(a,b,c){var s,r,q
c.i("~(0)").a(a)
c.a(b)
try{if(B.h===$.J){a.$1(b)
return}A.jO(null,null,this,a,b,t.H,c)}catch(q){s=A.ae(q)
r=A.bm(q)
A.hM(A.bN(s),t.l.a(r))}},
bJ(a){return new A.hu(this,t.M.a(a))},
bK(a,b){return new A.hv(this,b.i("~(0)").a(a),b)},
du(a,b){b.i("0()").a(a)
if($.J===B.h)return a.$0()
return A.jN(null,null,this,a,b)},
bb(a,b,c,d){c.i("@<0>").D(d).i("1(2)").a(a)
d.a(b)
if($.J===B.h)return a.$1(b)
return A.jO(null,null,this,a,b,c,d)},
dv(a,b,c,d,e,f){d.i("@<0>").D(e).D(f).i("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.J===B.h)return a.$2(b,c)
return A.mC(null,null,this,a,b,c,d,e,f)},
c1(a,b,c,d){return b.i("@<0>").D(c).D(d).i("1(2,3)").a(a)}}
A.hu.prototype={
$0(){return this.a.dw(this.b)},
$S:2}
A.hv.prototype={
$1(a){var s=this.c
return this.a.dz(this.b,s.a(a),s)},
$S(){return this.c.i("~(0)")}}
A.hN.prototype={
$0(){A.kP(this.a,this.b)},
$S:2}
A.cA.prototype={
gI(a){var s=this,r=new A.bf(s,s.r,A.z(s).i("bf<1>"))
r.c=s.e
return r},
gk(a){return this.a},
gG(a){return this.a===0},
A(a,b){var s,r
if(b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else{r=this.cB(b)
return r}},
cB(a){var s=this.d
if(s==null)return!1
return this.aZ(s[this.aV(a)],a)>=0},
m(a,b){var s,r,q=this
A.z(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bp(s==null?q.b=A.ih():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bp(r==null?q.c=A.ih():r,b)}else return q.ct(b)},
ct(a){var s,r,q,p=this
A.z(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.ih()
r=p.aV(a)
q=s[r]
if(q==null)s[r]=[p.b0(a)]
else{if(p.aZ(q,a)>=0)return!1
q.push(p.b0(a))}return!0},
v(a,b){var s
if(b!=="__proto__")return this.cK(this.b,b)
else{s=this.cJ(b)
return s}},
cJ(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.aV(a)
r=n[s]
q=o.aZ(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bF(p)
return!0},
bp(a,b){A.z(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.b0(b)
return!0},
cK(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bF(s)
delete a[b]
return!0},
bw(){this.r=this.r+1&1073741823},
b0(a){var s,r=this,q=new A.dM(A.z(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.bw()
return q},
bF(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.bw()},
aV(a){return J.ea(a)&1073741823},
aZ(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.r(a[r].a,b))return r
return-1}}
A.dM.prototype={}
A.bf.prototype={
gE(){var s=this.d
return s==null?this.$ti.c.a(s):s},
u(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.c(A.S(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.i("1?").a(r.a)
s.c=r.b
return!0}},
$ia6:1}
A.fQ.prototype={
$2(a,b){this.a.l(0,this.b.a(a),this.c.a(b))},
$S:23}
A.D.prototype={
gI(a){return new A.b2(a,this.gk(a),A.a3(a).i("b2<D.E>"))},
L(a,b){return this.h(a,b)},
q(a,b){var s,r
A.a3(a).i("~(D.E)").a(b)
s=this.gk(a)
for(r=0;r<s;++r){b.$1(this.h(a,r))
if(s!==this.gk(a))throw A.c(A.S(a))}},
gG(a){return this.gk(a)===0},
gO(a){return this.gk(a)!==0},
aq(a,b,c){var s=A.a3(a)
return new A.a0(a,s.D(c).i("1(D.E)").a(b),s.i("@<D.E>").D(c).i("a0<1,2>"))},
d9(a,b,c,d){var s
A.a3(a).i("D.E?").a(d)
A.cm(b,c,this.gk(a))
for(s=b;s<c;++s)this.l(a,s,d)},
aN(a,b,c,d,e){var s,r,q
A.a3(a).i("j<D.E>").a(d)
A.cm(b,c,this.gk(a))
s=c-b
if(s===0)return
A.dn(e,"skipCount")
r=J.u(d)
if(e+s>r.gk(d))throw A.c(A.bC("Too few elements"))
if(e<b)for(q=s-1;q>=0;--q)this.l(a,b+q,r.h(d,e+q))
else for(q=0;q<s;++q)this.l(a,b+q,r.h(d,e+q))},
j(a){return A.i7(a,"[","]")},
$it:1,
$ij:1,
$iI:1}
A.B.prototype={
q(a,b){var s,r,q,p=A.a3(a)
p.i("~(B.K,B.V)").a(b)
for(s=J.bo(this.gK(a)),p=p.i("B.V");s.u();){r=s.gE()
q=this.h(a,r)
b.$2(r,q==null?p.a(q):q)}},
gd8(a){return J.iE(this.gK(a),new A.fS(a),A.a3(a).i("aD<B.K,B.V>"))},
N(a,b){return J.iC(this.gK(a),b)},
gk(a){return J.W(this.gK(a))},
gG(a){return J.eb(this.gK(a))},
gO(a){return J.i1(this.gK(a))},
j(a){return A.ia(a)},
$ip:1}
A.fS.prototype={
$1(a){var s=this.a,r=A.a3(s)
r.i("B.K").a(a)
s=J.l(s,a)
if(s==null)s=r.i("B.V").a(s)
return new A.aD(a,s,r.i("aD<B.K,B.V>"))},
$S(){return A.a3(this.a).i("aD<B.K,B.V>(B.K)")}}
A.fT.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.d(a)
r.a=(r.a+=s)+": "
s=A.d(b)
r.a+=s},
$S:10}
A.bH.prototype={}
A.ac.prototype={
l(a,b,c){var s=A.z(this)
s.i("ac.K").a(b)
s.i("ac.V").a(c)
throw A.c(A.aH("Cannot modify unmodifiable map"))}}
A.cd.prototype={
h(a,b){return J.l(this.a,b)},
l(a,b,c){var s=this.$ti
J.au(this.a,s.c.a(b),s.y[1].a(c))},
N(a,b){return J.i0(this.a,b)},
q(a,b){J.e9(this.a,this.$ti.i("~(1,2)").a(b))},
gG(a){return J.eb(this.a)},
gO(a){return J.i1(this.a)},
gk(a){return J.W(this.a)},
j(a){return J.L(this.a)},
$ip:1}
A.bI.prototype={}
A.aa.prototype={
gG(a){return this.gk(this)===0},
R(a,b){var s
for(s=J.bo(A.z(this).i("j<aa.E>").a(b));s.u();)this.m(0,s.gE())},
j(a){return A.i7(this,"{","}")},
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
$it:1,
$ij:1,
$iar:1}
A.cE.prototype={}
A.cL.prototype={}
A.dK.prototype={
h(a,b){var s,r=this.b
if(r==null)return this.c.h(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.cI(b):s}},
gk(a){return this.b==null?this.c.a:this.al().length},
gG(a){return this.gk(0)===0},
gO(a){return this.gk(0)>0},
gK(a){var s
if(this.b==null){s=this.c
return new A.b1(s,A.z(s).i("b1<1>"))}return new A.dL(this)},
l(a,b,c){var s,r,q=this
if(q.b==null)q.c.l(0,b,c)
else if(q.N(0,b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.cT().l(0,b,c)},
N(a,b){if(this.b==null)return this.c.N(0,b)
return Object.prototype.hasOwnProperty.call(this.a,b)},
q(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.q(0,b)
s=o.al()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.hL(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.c(A.S(o))}},
al(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.q(Object.keys(this.a),t.s)
return s},
cT(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.bw(t.N,t.z)
r=n.al()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.l(0,o,n.h(0,o))}if(p===0)B.b.m(r,"")
else B.b.d_(r)
n.a=n.b=null
return n.c=s},
cI(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.hL(this.a[a])
return this.b[a]=s}}
A.dL.prototype={
gk(a){return this.a.gk(0)},
L(a,b){var s=this.a
if(s.b==null)s=s.gK(0).L(0,b)
else{s=s.al()
if(!(b>=0&&b<s.length))return A.b(s,b)
s=s[b]}return s},
gI(a){var s=this.a
if(s.b==null){s=s.gK(0)
s=s.gI(s)}else{s=s.al()
s=new J.aT(s,s.length,A.K(s).i("aT<1>"))}return s},
A(a,b){return this.a.N(0,b)}}
A.hG.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:11}
A.hF.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:11}
A.cY.prototype={
dl(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a1="Invalid base64 encoding length ",a2=a3.length
a5=A.cm(a4,a5,a2)
s=$.km()
for(r=s.length,q=a4,p=q,o=null,n=-1,m=-1,l=0;q<a5;q=k){k=q+1
if(!(q<a2))return A.b(a3,q)
j=a3.charCodeAt(q)
if(j===37){i=k+2
if(i<=a5){if(!(k<a2))return A.b(a3,k)
h=A.hS(a3.charCodeAt(k))
g=k+1
if(!(g<a2))return A.b(a3,g)
f=A.hS(a3.charCodeAt(g))
e=h*16+f-(f&256)
if(e===37)e=-1
k=i}else e=-1}else e=j
if(0<=e&&e<=127){if(!(e>=0&&e<r))return A.b(s,e)
d=s[e]
if(d>=0){if(!(d<64))return A.b(a0,d)
e=a0.charCodeAt(d)
if(e===j)continue
j=e}else{if(d===-1){if(n<0){g=o==null?null:o.a.length
if(g==null)g=0
n=g+(q-p)
m=q}++l
if(j===61)continue}j=e}if(d!==-2){if(o==null){o=new A.Z("")
g=o}else g=o
g.a+=B.a.n(a3,p,q)
c=A.M(j)
g.a+=c
p=k
continue}}throw A.c(A.T("Invalid base64 data",a3,q))}if(o!=null){a2=B.a.n(a3,p,a5)
a2=o.a+=a2
r=a2.length
if(n>=0)A.iG(a3,m,a5,n,l,r)
else{b=B.c.a4(r-1,4)+1
if(b===1)throw A.c(A.T(a1,a3,a5))
while(b<4){a2+="="
o.a=a2;++b}}a2=o.a
return B.a.ah(a3,a4,a5,a2.charCodeAt(0)==0?a2:a2)}a=a5-a4
if(n>=0)A.iG(a3,m,a5,n,l,a)
else{b=B.c.a4(a,4)
if(b===1)throw A.c(A.T(a1,a3,a5))
if(b>1)a3=B.a.ah(a3,a5,a5,b===2?"==":"=")}return a3}}
A.fp.prototype={}
A.aV.prototype={}
A.d2.prototype={}
A.d6.prototype={}
A.c7.prototype={
j(a){var s=A.d7(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.dh.prototype={
j(a){return"Cyclic error in JSON stringify"}}
A.dg.prototype={
T(a,b){var s=A.mz(b,this.gd6().a)
return s},
t(a){var s=A.lr(a,this.gd7().b,null)
return s},
gd7(){return B.Q},
gd6(){return B.P}}
A.fO.prototype={}
A.fN.prototype={}
A.hr.prototype={
cb(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.a.n(a,r,q)
r=q+1
o=A.M(92)
s.a+=o
o=A.M(117)
s.a+=o
o=A.M(100)
s.a+=o
o=p>>>8&15
o=A.M(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.M(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.M(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.a.n(a,r,q)
r=q+1
o=A.M(92)
s.a+=o
switch(p){case 8:o=A.M(98)
s.a+=o
break
case 9:o=A.M(116)
s.a+=o
break
case 10:o=A.M(110)
s.a+=o
break
case 12:o=A.M(102)
s.a+=o
break
case 13:o=A.M(114)
s.a+=o
break
default:o=A.M(117)
s.a+=o
o=A.M(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.M(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.M(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.a.n(a,r,q)
r=q+1
o=A.M(92)
s.a+=o
o=A.M(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.a.n(a,r,m)},
aT(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.c(new A.dh(a,null))}B.b.m(s,a)},
aK(a){var s,r,q,p,o=this
if(o.ca(a))return
o.aT(a)
try{s=o.b.$1(a)
if(!o.ca(s)){q=A.iW(a,null,o.gbx())
throw A.c(q)}q=o.a
if(0>=q.length)return A.b(q,-1)
q.pop()}catch(p){r=A.ae(p)
q=A.iW(a,r,o.gbx())
throw A.c(q)}},
ca(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.e.j(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.cb(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.aT(a)
q.dD(a)
s=q.a
if(0>=s.length)return A.b(s,-1)
s.pop()
return!0}else if(t.G.b(a)){q.aT(a)
r=q.dE(a)
s=q.a
if(0>=s.length)return A.b(s,-1)
s.pop()
return r}else return!1},
dD(a){var s,r,q=this.c
q.a+="["
s=J.u(a)
if(s.gO(a)){this.aK(s.h(a,0))
for(r=1;r<s.gk(a);++r){q.a+=","
this.aK(s.h(a,r))}}q.a+="]"},
dE(a){var s,r,q,p,o,n=this,m={},l=J.u(a)
if(l.gG(a)){n.c.a+="{}"
return!0}s=l.gk(a)*2
r=A.fR(s,null,!1,t.X)
q=m.a=0
m.b=!0
l.q(a,new A.hs(m,r))
if(!m.b)return!1
l=n.c
l.a+="{"
for(p='"';q<s;q+=2,p=',"'){l.a+=p
n.cb(A.k(r[q]))
l.a+='":'
o=q+1
if(!(o<s))return A.b(r,o)
n.aK(r[o])}l.a+="}"
return!0}}
A.hs.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.b.l(s,r.a++,a)
B.b.l(s,r.a++,b)},
$S:10}
A.hq.prototype={
gbx(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.dy.prototype={}
A.h6.prototype={
d2(a){return new A.hE(this.a).cC(t.L.a(a),0,null,!0)}}
A.hE.prototype={
cC(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(a)
s=A.cm(b,c,J.W(a))
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.m1(a,b,s)
s-=b
p=b
b=0}if(s-b>=15){o=l.a
n=A.m0(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.aW(q,b,s,!0)
o=l.b
if((o&1)!==0){m=A.m2(o)
l.b=0
throw A.c(A.T(m,a,p+l.c))}return n},
aW(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.c.a1(b+c,2)
r=q.aW(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.aW(a,s,c,d)}return q.d5(a,b,c,d)},
d5(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.Z(""),d=b+1,c=a.length
if(!(b>=0&&b<c))return A.b(a,b)
s=a[b]
A:for(r=k.a;;){for(;;d=o){if(!(s>=0&&s<256))return A.b(j,s)
q=j.charCodeAt(s)&31
f=g<=32?s&61694>>>q:(s&63|f<<6)>>>0
p=g+q
if(!(p>=0&&p<144))return A.b(i,p)
g=i.charCodeAt(p)
if(g===0){p=A.M(f)
e.a+=p
if(d===a0)break A
break}else if((g&1)!==0){if(r)switch(g){case 69:case 67:p=A.M(h)
e.a+=p
break
case 65:p=A.M(h)
e.a+=p;--d
break
default:p=A.M(h)
e.a=(e.a+=p)+p
break}else{k.b=g
k.c=d-1
return""}g=0}if(d===a0)break A
o=d+1
if(!(d>=0&&d<c))return A.b(a,d)
s=a[d]}o=d+1
if(!(d>=0&&d<c))return A.b(a,d)
s=a[d]
if(s<128){for(;;){if(!(o<a0)){n=a0
break}m=o+1
if(!(o>=0&&o<c))return A.b(a,o)
s=a[o]
if(s>=128){n=m-1
o=m
break}o=m}if(n-d<20)for(l=d;l<n;++l){if(!(l<c))return A.b(a,l)
p=A.M(a[l])
e.a+=p}else{p=A.j9(a,d,n)
e.a+=p}if(n===a0)break A
d=o}else d=o}if(a1&&g>32)if(r){c=A.M(h)
e.a+=c}else{k.b=77
k.c=a0
return""}k.b=g
k.c=f
c=e.a
return c.charCodeAt(0)==0?c:c}}
A.a5.prototype={
a_(a,b){if(b==null)return!1
return b instanceof A.a5&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gF(a){return A.l0(this.a,this.b)},
a7(a,b){var s
t.dy.a(b)
s=B.c.a7(this.a,b.a)
if(s!==0)return s
return B.c.a7(this.b,b.b)},
aI(){var s=this
if(s.c)return new A.a5(s.a,s.b,!1)
return s},
aj(){var s=this
if(s.c)return s
return new A.a5(s.a,s.b,!0)},
j(a){var s=this,r=A.iN(A.b6(s)),q=A.aw(A.cl(s)),p=A.aw(A.ck(s)),o=A.aw(A.aN(s)),n=A.aw(A.by(s)),m=A.aw(A.j2(s)),l=A.fE(A.j1(s)),k=s.b,j=k===0?"":A.fE(k)
k=r+"-"+q
if(s.c)return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j},
ai(){var s=this,r=A.b6(s)>=-9999&&A.b6(s)<=9999?A.iN(A.b6(s)):A.kM(A.b6(s)),q=A.aw(A.cl(s)),p=A.aw(A.ck(s)),o=A.aw(A.aN(s)),n=A.aw(A.by(s)),m=A.aw(A.j2(s)),l=A.fE(A.j1(s)),k=s.b,j=k===0?"":A.fE(k)
k=r+"-"+q
if(s.c)return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j}}
A.fF.prototype={
$1(a){if(a==null)return 0
return A.cS(a)},
$S:12}
A.fG.prototype={
$1(a){var s,r,q
if(a==null)return 0
for(s=a.length,r=0,q=0;q<6;++q){r*=10
if(q<s){if(!(q<s))return A.b(a,q)
r+=a.charCodeAt(q)^48}}return r},
$S:12}
A.bX.prototype={
a_(a,b){if(b==null)return!1
return b instanceof A.bX&&this.a===b.a},
gF(a){return B.c.gF(this.a)},
j(a){var s,r,q,p,o=this.a,n=B.c.a1(o,36e8)
o%=36e8
s=B.c.a1(o,6e7)
o%=6e7
r=s<10?"0":""
q=B.c.a1(o,1e6)
p=q<10?"0":""
return""+n+":"+r+s+":"+p+q+"."+B.a.Y(B.c.j(o%1e6),6,"0")}}
A.H.prototype={
gak(){return A.l1(this)}}
A.cV.prototype={
j(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.d7(s)
return"Assertion failed"}}
A.aF.prototype={}
A.aj.prototype={
gaY(){return"Invalid argument"+(!this.a?"(s)":"")},
gaX(){return""},
j(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.d(p),n=s.gaY()+q+o
if(!s.a)return n
return n+s.gaX()+": "+A.d7(s.gb5())},
gb5(){return this.b}}
A.bz.prototype={
gb5(){return A.jG(this.b)},
gaY(){return"RangeError"},
gaX(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.d(q):""
else if(q==null)s=": Not greater than or equal to "+A.d(r)
else if(q>r)s=": Not in inclusive range "+A.d(r)+".."+A.d(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.d(r)
return s}}
A.d9.prototype={
gb5(){return A.aP(this.b)},
gaY(){return"RangeError"},
gaX(){if(A.aP(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gk(a){return this.f}}
A.ct.prototype={
j(a){return"Unsupported operation: "+this.a}}
A.du.prototype={
j(a){return"UnimplementedError: "+this.a}}
A.bB.prototype={
j(a){return"Bad state: "+this.a}}
A.d1.prototype={
j(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.d7(s)+"."}}
A.dj.prototype={
j(a){return"Out of Memory"},
gak(){return null},
$iH:1}
A.co.prototype={
j(a){return"Stack Overflow"},
gak(){return null},
$iH:1}
A.hd.prototype={
j(a){return"Exception: "+this.a}}
A.ax.prototype={
j(a){var s,r,q,p,o,n,m,l,k,j,i,h=this.a,g=""!==h?"FormatException: "+h:"FormatException",f=this.c,e=this.b
if(typeof e=="string"){if(f!=null)s=f<0||f>e.length
else s=!1
if(s)f=null
if(f==null){if(e.length>78)e=B.a.n(e,0,75)+"..."
return g+"\n"+e}for(r=e.length,q=1,p=0,o=!1,n=0;n<f;++n){if(!(n<r))return A.b(e,n)
m=e.charCodeAt(n)
if(m===10){if(p!==n||!o)++q
p=n+1
o=!1}else if(m===13){++q
p=n+1
o=!0}}g=q>1?g+(" (at line "+q+", character "+(f-p+1)+")\n"):g+(" (at character "+(f+1)+")\n")
for(n=f;n<r;++n){if(!(n>=0))return A.b(e,n)
m=e.charCodeAt(n)
if(m===10||m===13){r=n
break}}l=""
if(r-p>78){k="..."
if(f-p<75){j=p+75
i=p}else{if(r-f<75){i=r-75
j=r
k=""}else{i=f-36
j=f+36}l="..."}}else{j=r
i=p
k=""}return g+l+B.a.n(e,i,j)+k+"\n"+B.a.bi(" ",f-i+l.length)+"^\n"}else return f!=null?g+(" (at offset "+A.d(f)+")"):g}}
A.j.prototype={
aq(a,b,c){var s=A.z(this)
return A.kY(this,s.D(c).i("1(j.E)").a(b),s.i("j.E"),c)},
aJ(a,b){var s=A.z(this)
return new A.N(this,s.i("E(j.E)").a(b),s.i("N<j.E>"))},
ar(a,b){var s=A.b4(this,A.z(this).i("j.E"))
return s},
aH(a){return this.ar(0,!0)},
gk(a){var s,r=this.gI(this)
for(s=0;r.u();)++s
return s},
gG(a){return!this.gI(this).u()},
gO(a){return!this.gG(this)},
gab(a){var s,r=this.gI(this)
if(!r.u())throw A.c(A.da())
s=r.gE()
if(r.u())throw A.c(A.kR())
return s},
L(a,b){var s,r
A.dn(b,"index")
s=this.gI(this)
for(r=b;s.u();){if(r===0)return s.gE();--r}throw A.c(A.c2(b,b-r,this,null,"index"))},
j(a){return A.kS(this,"(",")")}}
A.aD.prototype={
j(a){return"MapEntry("+A.d(this.a)+": "+A.d(this.b)+")"}}
A.X.prototype={
gF(a){return A.v.prototype.gF.call(this,0)},
j(a){return"null"}}
A.v.prototype={$iv:1,
a_(a,b){return this===b},
gF(a){return A.dl(this)},
j(a){return"Instance of '"+A.dm(this)+"'"},
gZ(a){return A.mV(this)},
toString(){return this.j(this)}}
A.dV.prototype={
j(a){return""},
$ias:1}
A.Z.prototype={
gk(a){return this.a.length},
j(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ila:1}
A.h5.prototype={
$2(a,b){var s,r,q,p
t.J.a(a)
A.k(b)
s=B.a.bV(b,"=")
if(s===-1){if(b!=="")J.au(a,A.im(b,0,b.length,this.a,!0),"")}else if(s!==0){r=B.a.n(b,0,s)
q=B.a.aO(b,s+1)
p=this.a
J.au(a,A.im(r,0,r.length,p,!0),A.im(q,0,q.length,p,!0))}return a},
$S:24}
A.h4.prototype={
$2(a,b){throw A.c(A.T("Illegal IPv6 address, "+a,this.a,b))},
$S:32}
A.cM.prototype={
gbD(){var s,r,q,p,o=this,n=o.w
if(n===$){s=o.a
r=s.length!==0?s+":":""
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
n=o.w=s.charCodeAt(0)==0?s:s}return n},
gF(a){var s,r=this,q=r.y
if(q===$){s=B.a.gF(r.gbD())
r.y!==$&&A.k1()
r.y=s
q=s}return q},
gb8(){var s,r=this,q=r.z
if(q===$){s=r.f
s=A.ji(s==null?"":s)
r.z!==$&&A.k1()
q=r.z=new A.bI(s,t.dw)}return q},
gc8(){return this.b},
gb3(a){var s=this.c
if(s==null)return""
if(B.a.P(s,"[")&&!B.a.M(s,"v",1))return B.a.n(s,1,s.length-1)
return s},
gb6(a){var s=this.d
return s==null?A.jw(this.a):s},
gb7(){var s=this.f
return s==null?"":s},
gbQ(){var s=this.r
return s==null?"":s},
gbR(){return this.c!=null},
gbU(){return this.f!=null},
gbT(){return this.r!=null},
j(a){return this.gbD()},
a_(a,b){var s,r,q,p=this
if(b==null)return!1
if(p===b)return!0
s=!1
if(t.dD.b(b))if(p.a===b.gbk())if(p.c!=null===b.gbR())if(p.b===b.gc8())if(p.gb3(0)===b.gb3(b))if(p.gb6(0)===b.gb6(b))if(p.e===b.gc0(b)){r=p.f
q=r==null
if(!q===b.gbU()){if(q)r=""
if(r===b.gb7()){r=p.r
q=r==null
if(!q===b.gbT()){s=q?"":r
s=s===b.gbQ()}}}}return s},
$idw:1,
gbk(){return this.a},
gc0(a){return this.e}}
A.h3.prototype={
gc7(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.b(m,0)
s=o.a
m=m[0]+1
r=B.a.aE(s,"?",m)
q=s.length
if(r>=0){p=A.cN(s,r+1,q,256,!1,!1)
q=r}else p=n
m=o.c=new A.dE("data","",n,n,A.cN(s,m,q,128,!1,!1),p,n)}return m},
j(a){var s,r=this.b
if(0>=r.length)return A.b(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.dS.prototype={
gbR(){return this.c>0},
gbU(){return this.f<this.r},
gbT(){return this.r<this.a.length},
gbk(){var s=this.w
return s==null?this.w=this.cA():s},
cA(){var s,r=this,q=r.b
if(q<=0)return""
s=q===4
if(s&&B.a.P(r.a,"http"))return"http"
if(q===5&&B.a.P(r.a,"https"))return"https"
if(s&&B.a.P(r.a,"file"))return"file"
if(q===7&&B.a.P(r.a,"package"))return"package"
return B.a.n(r.a,0,q)},
gc8(){var s=this.c,r=this.b+3
return s>r?B.a.n(this.a,r,s-1):""},
gb3(a){var s=this.c
return s>0?B.a.n(this.a,s,this.d):""},
gb6(a){var s,r=this
if(r.c>0&&r.d+1<r.e)return A.cS(B.a.n(r.a,r.d+1,r.e))
s=r.b
if(s===4&&B.a.P(r.a,"http"))return 80
if(s===5&&B.a.P(r.a,"https"))return 443
return 0},
gc0(a){return B.a.n(this.a,this.e,this.f)},
gb7(){var s=this.f,r=this.r
return s<r?B.a.n(this.a,s+1,r):""},
gbQ(){var s=this.r,r=this.a
return s<r.length?B.a.aO(r,s+1):""},
gb8(){if(this.f>=this.r)return B.U
return new A.bI(A.ji(this.gb7()),t.dw)},
gF(a){var s=this.x
return s==null?this.x=B.a.gF(this.a):s},
a_(a,b){if(b==null)return!1
if(this===b)return!0
return t.dD.b(b)&&this.a===b.j(0)},
j(a){return this.a},
$idw:1}
A.dE.prototype={}
A.f.prototype={$if:1}
A.bp.prototype={
sde(a,b){a.href=b},
j(a){var s=String(a)
s.toString
return s},
$ibp:1}
A.cU.prototype={
j(a){var s=String(a)
s.toString
return s}}
A.bq.prototype={$ibq:1}
A.aU.prototype={$iaU:1}
A.bs.prototype={$ibs:1}
A.ap.prototype={
gk(a){return a.length}}
A.aW.prototype={
br(a,b){var s=$.k4(),r=s[b]
if(typeof r=="string")return r
r=this.cS(a,b)
s[b]=r
return r},
cS(a,b){var s,r=b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()})
r.toString
r=r in a
r.toString
if(r)return b
s=$.k8()+b
r=s in a
r.toString
if(r)return s
return b},
bA(a,b,c,d){a.setProperty(b,c,d)},
gk(a){var s=a.length
s.toString
return s}}
A.fr.prototype={}
A.aX.prototype={}
A.d4.prototype={
j(a){var s=String(a)
s.toString
return s}}
A.bW.prototype={
d4(a,b){var s=a.createHTMLDocument(b)
s.toString
return s}}
A.d5.prototype={
gk(a){var s=a.length
s.toString
return s}}
A.bK.prototype={
gk(a){return this.a.length},
h(a,b){var s=this.a
if(!(b>=0&&b<s.length))return A.b(s,b)
return this.$ti.c.a(s[b])},
l(a,b,c){this.$ti.c.a(c)
throw A.c(A.aH("Cannot modify list"))}}
A.y.prototype={
gcW(a){return new A.dF(a)},
gad(a){return new A.dG(a)},
j(a){var s=a.localName
s.toString
return s},
S(a,b,c,d){var s,r,q,p
if(c==null){s=$.iP
if(s==null){s=A.q([],t.k)
r=new A.ci(s)
B.b.m(s,A.jl(null))
B.b.m(s,A.jr())
$.iP=r
d=r}else d=s
s=$.iO
if(s==null){d.toString
s=new A.cO(d)
$.iO=s
c=s}else{d.toString
s.a=d
c=s}}if($.aK==null){s=document
r=s.implementation
r.toString
r=B.J.d4(r,"")
$.aK=r
r=r.createRange()
r.toString
$.i5=r
r=$.aK.createElement("base")
t.cR.a(r)
s=s.baseURI
s.toString
r.href=s
$.aK.head.appendChild(r).toString}s=$.aK
if(s.body==null){r=s.createElement("body")
B.v.scY(s,t.c.a(r))}s=$.aK
if(t.c.b(a)){s=s.body
s.toString
q=s}else{s.toString
r=a.tagName
r.toString
q=s.createElement(r)
$.aK.body.appendChild(q).toString}s="createContextualFragment" in window.Range.prototype
s.toString
if(s){s=a.tagName
s.toString
s=!B.b.A(B.S,s)}else s=!1
if(s){$.i5.selectNodeContents(q)
s=$.i5
s=s.createContextualFragment(b)
s.toString
p=s}else{J.kB(q,b)
s=$.aK.createDocumentFragment()
s.toString
while(r=q.firstChild,r!=null)s.appendChild(r).toString
p=s}if(q!==$.aK.body)J.iF(q)
c.bj(p)
document.adoptNode(p).toString
return p},
d3(a,b,c){return this.S(a,b,c,null)},
sB(a,b){this.aM(a,b)},
aM(a,b){this.sW(a,null)
a.appendChild(this.S(a,b,null,null)).toString},
scF(a,b){a.innerHTML=b},
ga8(a){return new A.bb(a,"click",!1,t.C)},
$iy:1}
A.fH.prototype={
$1(a){return t.h.b(t.A.a(a))},
$S:34}
A.e.prototype={$ie:1}
A.A.prototype={
bH(a,b,c,d){t.bw.a(c)
if(c!=null)this.cu(a,b,c,d)},
cU(a,b,c){return this.bH(a,b,c,null)},
cu(a,b,c,d){return a.addEventListener(b,A.bR(t.bw.a(c),1),d)},
$iA:1}
A.d8.prototype={
gk(a){return a.length}}
A.c0.prototype={
scY(a,b){a.body=b}}
A.ak.prototype={
dm(a,b,c,d){return a.open(b,c,!0)},
$iak:1}
A.fI.prototype={
$1(a){var s=t.bo.a(a).responseText
s.toString
return s},
$S:42}
A.fJ.prototype={
$2(a,b){this.a.setRequestHeader(A.k(a),A.k(b))},
$S:14}
A.fK.prototype={
$1(a){var s,r,q,p,o
t.x.a(a)
s=this.a
r=s.status
r.toString
q=r>=200&&r<300
p=r>307&&r<400
r=q||r===0||r===304||p
o=this.b
if(r)o.b2(0,s)
else o.bM(a)},
$S:21}
A.c1.prototype={}
A.b_.prototype={
saA(a,b){a.checked=b},
sH(a,b){a.value=b},
$ib_:1,
$ij5:1,
$iiL:1}
A.bx.prototype={
j(a){var s=String(a)
s.toString
return s},
$ibx:1}
A.a7.prototype={$ia7:1}
A.a1.prototype={
gab(a){var s=this.a,r=s.childNodes.length
if(r===0)throw A.c(A.bC("No elements"))
if(r>1)throw A.c(A.bC("More than one element"))
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
l(a,b,c){var s,r
t.A.a(c)
s=this.a
r=s.childNodes
if(!(b>=0&&b<r.length))return A.b(r,b)
s.replaceChild(c,r[b]).toString},
gI(a){var s=this.a.childNodes
return new A.aY(s,s.length,A.a3(s).i("aY<aq.E>"))},
gk(a){return this.a.childNodes.length},
h(a,b){var s=this.a.childNodes
if(!(b>=0&&b<s.length))return A.b(s,b)
return s[b]}}
A.m.prototype={
dr(a){var s=a.parentNode
if(s!=null)s.removeChild(a).toString},
dt(a,b){var s,r,q
try{r=a.parentNode
r.toString
s=r
J.kw(s,b,a)}catch(q){}return a},
cw(a){var s
while(s=a.firstChild,s!=null)a.removeChild(s).toString},
j(a){var s=a.nodeValue
return s==null?this.ci(a):s},
sW(a,b){a.textContent=b},
d0(a,b){var s=a.cloneNode(!0)
s.toString
return s},
A(a,b){var s=a.contains(b)
s.toString
return s},
cL(a,b,c){var s=a.replaceChild(b,c)
s.toString
return s},
$im:1}
A.ch.prototype={
gk(a){var s=a.length
s.toString
return s},
h(a,b){var s=a.length,r=b>>>0!==b||b>=s
r.toString
if(r)throw A.c(A.c2(b,s,a,null,null))
s=a[b]
s.toString
return s},
l(a,b,c){t.A.a(c)
throw A.c(A.aH("Cannot assign element of immutable List."))},
L(a,b){if(!(b>=0&&b<a.length))return A.b(a,b)
return a[b]},
$it:1,
$iaA:1,
$ij:1,
$iI:1}
A.am.prototype={$iam:1}
A.b8.prototype={
gk(a){return a.length},
sH(a,b){a.value=b},
$ib8:1}
A.cp.prototype={
N(a,b){return a.getItem(A.k(b))!=null},
h(a,b){return a.getItem(A.k(b))},
l(a,b,c){a.setItem(b,A.k(c))},
v(a,b){var s=a.getItem(b)
a.removeItem(b)
return s},
q(a,b){var s,r,q
t.eA.a(b)
for(s=0;;++s){r=a.key(s)
if(r==null)return
q=a.getItem(r)
q.toString
b.$2(r,q)}},
gK(a){var s=A.q([],t.s)
this.q(a,new A.fZ(s))
return s},
gk(a){var s=a.length
s.toString
return s},
gG(a){return a.key(0)==null},
gO(a){return a.key(0)!=null},
$ip:1}
A.fZ.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:14}
A.cs.prototype={
S(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.aP(a,b,c,d)
s=A.kN("<table>"+b+"</table>",c,d)
r=document.createDocumentFragment()
r.toString
new A.a1(r).R(0,new A.a1(s))
return r}}
A.dr.prototype={
S(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.aP(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.a1(s).R(0,new A.a1(new A.a1(new A.a1(B.z.S(r,b,c,d)).gab(0)).gab(0)))
return s}}
A.ds.prototype={
S(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.aP(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.a1(s).R(0,new A.a1(new A.a1(B.z.S(r,b,c,d)).gab(0)))
return s}}
A.bD.prototype={
aM(a,b){var s,r
this.sW(a,null)
s=a.content
s.toString
J.kv(s)
r=this.S(a,b,null,null)
a.content.appendChild(r).toString},
$ibD:1}
A.b9.prototype={
sH(a,b){a.value=b},
$ib9:1}
A.ao.prototype={}
A.cv.prototype={$ih7:1}
A.bJ.prototype={$ibJ:1}
A.cB.prototype={
gk(a){var s=a.length
s.toString
return s},
h(a,b){var s=a.length,r=b>>>0!==b||b>=s
r.toString
if(r)throw A.c(A.c2(b,s,a,null,null))
s=a[b]
s.toString
return s},
l(a,b,c){t.A.a(c)
throw A.c(A.aH("Cannot assign element of immutable List."))},
L(a,b){if(!(b>=0&&b<a.length))return A.b(a,b)
return a[b]},
$it:1,
$iaA:1,
$ij:1,
$iI:1}
A.dB.prototype={
q(a,b){var s,r,q,p,o,n
t.eA.a(b)
for(s=this.gK(0),r=s.length,q=this.a,p=0;p<s.length;s.length===r||(0,A.i_)(s),++p){o=s[p]
n=q.getAttribute(o)
b.$2(o,n==null?A.k(n):n)}},
gK(a){var s,r,q,p,o,n,m=this.a.attributes
m.toString
s=A.q([],t.s)
for(r=m.length,q=t.h9,p=0;p<r;++p){if(!(p<m.length))return A.b(m,p)
o=q.a(m[p])
if(o.namespaceURI==null){n=o.name
n.toString
B.b.m(s,n)}}return s},
gG(a){return this.gK(0).length===0},
gO(a){return this.gK(0).length!==0}}
A.dF.prototype={
N(a,b){var s=this.a.hasAttribute(b)
s.toString
return s},
h(a,b){return this.a.getAttribute(A.k(b))},
l(a,b,c){this.a.setAttribute(b,A.k(c))},
gk(a){return this.gK(0).length}}
A.dG.prototype={
a9(){var s,r,q,p,o=A.cc(t.N)
for(s=this.a.className.split(" "),r=s.length,q=0;q<r;++q){p=B.a.J(s[q])
if(p.length!==0)o.m(0,p)}return o},
bh(a){this.a.className=t.cq.a(a).U(0," ")},
gk(a){var s=this.a.classList.length
s.toString
return s},
gG(a){var s=this.a.classList.length
s.toString
return s===0},
m(a,b){var s,r
A.k(b)
s=this.a.classList
r=s.contains(b)
r.toString
s.add(b)
return!r},
v(a,b){var s=this.a.classList,r=s.contains(b)
r.toString
s.remove(b)
return r}}
A.i6.prototype={}
A.cy.prototype={}
A.bb.prototype={}
A.cz.prototype={$il9:1}
A.hc.prototype={
$1(a){return this.a.$1(t.B.a(a))},
$S:3}
A.be.prototype={
co(a){var s
if($.dJ.a===0){for(s=0;s<262;++s)$.dJ.l(0,B.T[s],A.mX())
for(s=0;s<12;++s)$.dJ.l(0,B.o[s],A.mY())}},
ac(a){return $.kn().A(0,A.bZ(a))},
a2(a,b,c){var s=$.dJ.h(0,A.bZ(a)+"::"+b)
if(s==null)s=$.dJ.h(0,"*::"+b)
if(s==null)return!1
return A.io(s.$4(a,b,c,this))},
$ial:1}
A.aq.prototype={
gI(a){return new A.aY(a,a.length,A.a3(a).i("aY<aq.E>"))}}
A.ci.prototype={
ac(a){return B.b.ao(this.a,new A.fV(a))},
a2(a,b,c){return B.b.ao(this.a,new A.fU(a,b,c))},
$ial:1}
A.fV.prototype={
$1(a){return t.w.a(a).ac(this.a)},
$S:15}
A.fU.prototype={
$1(a){return t.w.a(a).a2(this.a,this.b,this.c)},
$S:15}
A.cF.prototype={
cp(a,b,c,d){var s,r,q
this.a.R(0,c)
s=b.aJ(0,new A.hw())
r=b.aJ(0,new A.hx())
this.b.R(0,s)
q=this.c
q.R(0,B.R)
q.R(0,r)},
ac(a){return this.a.A(0,A.bZ(a))},
a2(a,b,c){var s,r=this,q=A.bZ(a),p=r.c,o=q+"::"+b
if(p.A(0,o))return r.d.cV(c)
else{s="*::"+b
if(p.A(0,s))return r.d.cV(c)
else{p=r.b
if(p.A(0,o))return!0
else if(p.A(0,s))return!0
else if(p.A(0,q+"::*"))return!0
else if(p.A(0,"*::*"))return!0}}return!1},
$ial:1}
A.hw.prototype={
$1(a){return!B.b.A(B.o,A.k(a))},
$S:8}
A.hx.prototype={
$1(a){return B.b.A(B.o,A.k(a))},
$S:8}
A.dX.prototype={
a2(a,b,c){if(this.cm(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.A(0,b)
return!1}}
A.hy.prototype={
$1(a){return"TEMPLATE::"+A.k(a)},
$S:16}
A.dW.prototype={
ac(a){var s
if(t.ew.b(a))return!1
s=t.g7.b(a)
if(s&&A.bZ(a)==="foreignObject")return!1
if(s)return!0
return!1},
a2(a,b,c){if(b==="is"||B.a.P(b,"on"))return!1
return this.ac(a)},
$ial:1}
A.aY.prototype={
u(){var s=this,r=s.c+1,q=s.b
if(r<q){q=s.a
if(!(r>=0&&r<q.length))return A.b(q,r)
s.d=q[r]
s.c=r
return!0}s.d=null
s.c=q
return!1},
gE(){var s=this.d
return s==null?this.$ti.c.a(s):s},
$ia6:1}
A.dD.prototype={$io:1,$iA:1,$ih7:1}
A.dR.prototype={$ilf:1}
A.cO.prototype={
bj(a){var s,r=new A.hI(this)
do{s=this.b
r.$2(a,null)}while(s!==this.b)},
an(a,b){++this.b
if(b==null||b!==a.parentNode)J.iF(a)
else b.removeChild(a).toString},
cO(a,b){var s,r,q,p,o,n,m,l=!0,k=null,j=null
try{k=J.ky(a)
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
try{r=J.L(a)}catch(n){}try{t.h.a(a)
q=A.bZ(a)
this.cN(a,b,l,r,q,t.G.a(k),A.ai(j))}catch(n){if(A.ae(n) instanceof A.aj)throw n
else{this.an(a,b)
window.toString
p=A.d(r)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn("Removing corrupted element "+p)}}},
cN(a,b,c,d,e,f,g){var s,r,q,p,o,n,m,l=this
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
return}s=f.gK(0)
q=A.q(s.slice(0),A.K(s))
for(p=f.gK(0).length-1,s=f.a,r="Removing disallowed attribute <"+e+" ";p>=0;--p){if(!(p<q.length))return A.b(q,p)
o=q[p]
n=l.a
m=J.kC(o)
A.k(o)
if(!n.a2(a,m,A.k(s.getAttribute(o)))){window.toString
n=s.getAttribute(o)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn(r+o+'="'+A.d(n)+'">')
s.removeAttribute(o)}}if(t.aW.b(a)){s=a.content
s.toString
l.bj(s)}},
ce(a,b){var s=a.nodeType
s.toString
switch(s){case 1:this.cO(a,b)
break
case 8:case 11:case 3:case 4:break
default:this.an(a,b)}},
$il_:1}
A.hI.prototype={
$2(a,b){var s,r,q,p,o,n=this.a
n.ce(a,b)
s=a.lastChild
while(s!=null){r=null
try{r=s.previousSibling
if(r!=null&&r.nextSibling!==s){q=A.bC("Corrupt HTML")
throw A.c(q)}}catch(p){q=s;++n.b
o=q.parentNode
if(a!==o){if(o!=null)o.removeChild(q).toString}else a.removeChild(q).toString
s=null
r=a.lastChild}if(s!=null)this.$2(s,a)
s=r}},
$S:26}
A.dC.prototype={}
A.dO.prototype={}
A.dP.prototype={}
A.dT.prototype={}
A.dY.prototype={}
A.dZ.prototype={}
A.d3.prototype={
bG(a){var s=$.k3()
if(s.b.test(a))return a
throw A.c(A.fo(a,"value","Not a valid class token"))},
j(a){return this.a9().U(0," ")},
gI(a){var s=this.a9()
return A.ls(s,s.r,A.z(s).c)},
gG(a){return this.a9().a===0},
gk(a){return this.a9().a},
m(a,b){var s
A.k(b)
this.bG(b)
s=this.dk(new A.fq(b))
return A.io(s==null?!1:s)},
v(a,b){var s,r
this.bG(b)
s=this.a9()
r=s.v(0,b)
this.bh(s)
return r},
dk(a){var s,r
t.bU.a(a)
s=this.a9()
r=a.$1(s)
this.bh(s)
return r}}
A.fq.prototype={
$1(a){return t.cq.a(a).m(0,this.a)},
$S:27}
A.ho.prototype={
ae(a){if(a<=0||a>4294967296)throw A.c(A.l5("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
bZ(){return Math.random()}}
A.bA.prototype={$ibA:1}
A.cX.prototype={
a9(){var s,r,q,p,o=this.a.getAttribute("class"),n=A.cc(t.N)
if(o==null)return n
for(s=o.split(" "),r=s.length,q=0;q<r;++q){p=B.a.J(s[q])
if(p.length!==0)n.m(0,p)}return n},
bh(a){this.a.setAttribute("class",a.U(0," "))}}
A.h.prototype={
gad(a){return new A.cX(a)},
sB(a,b){this.aM(a,b)},
S(a,b,c,d){var s,r,q,p=A.q([],t.k)
B.b.m(p,A.jl(null))
B.b.m(p,A.jr())
B.b.m(p,new A.dW())
c=new A.cO(new A.ci(p))
p=document
s=p.body
s.toString
r=B.q.d3(s,'<svg version="1.1">'+b+"</svg>",c)
p=p.createDocumentFragment()
p.toString
q=new A.a1(r).gab(0)
while(s=q.firstChild,s!=null)p.appendChild(s).toString
return p},
ga8(a){return new A.bb(a,"click",!1,t.C)},
$ih:1}
A.hX.prototype={
$1(a){t.B.a(a)
new A.ec().X()},
$S:28}
A.ec.prototype={
X(){var s=0,r=A.e3(t.H),q=this,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
var $async$X=A.e5(function(a0,a1){if(a0===1)return A.e0(a1,r)
for(;;)switch(s){case 0:c=document
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
q.CW=t.by.a(A.C(["view-dashboard",q.f,"view-directory",q.r,"view-assets",q.w,"view-profile",q.x,"view-billing",q.y,"view-resident-home",q.z,"view-resident-ledger",q.Q,"view-resident-support",q.as],b,t.h))
o=t.d.a(window.location).href
o.toString
n=A.jg(o).gb8().h(0,"role")
if(n==="resident"){m=c.getElementById("zone-assignment-container")
if(m!=null){o=m.style
o.display="none"}l=t.f.a(c.getElementById("employee-id"))
if(l!=null)l.placeholder="e.g. TAG-2026-0041"
k=c.querySelector('label[for="employee-id"]')
if(k!=null)J.n(k,"Resident Account Number")
j=c.querySelector(".login-header p")
if(j!=null)J.n(j,"Resident Portal Login")
i=c.querySelector("#btn-login span")
if(i!=null)J.n(i,"Sign In to Portal")
h=c.getElementById("login-error-msg")
if(h!=null)J.aI(h,"Invalid Resident credentials. Use <strong>TAG-2026-0041</strong>.")
g=c.getElementById("btn-quick-login")
if(g!=null){c=g.style
c.display="flex"}}else if(n==="worker"){l=t.f.a(c.getElementById("employee-id"))
if(l!=null)l.placeholder="e.g. EMP-304"
k=c.querySelector('label[for="employee-id"]')
if(k!=null)J.n(k,"Employee Credentials / ID")
j=c.querySelector(".login-header p")
if(j!=null)J.n(j,"Worker & Field Terminal")
i=c.querySelector("#btn-login span")
if(i!=null)J.n(i,"Sign In to Terminal")
h=c.getElementById("login-error-msg")
if(h!=null)J.aI(h,"Invalid Worker credentials. Use <strong>EMP-304</strong>.")
f=c.getElementById("btn-quick-login-worker")
if(f!=null){c=f.style
c.display="flex"}}c=new A.eL()
c.$0()
A.jb(A.i4(0,10),new A.eJ(c))
s=2
return A.e_($.G().X(),$async$X)
case 2:A.jb(A.i4(0,5),new A.eK(q))
p=window.localStorage.getItem("waterhall_session")
e=window.localStorage.getItem("waterhall_resident_session")
if(p!=null)try{c=A.cb(t.G.a(B.d.T(0,p)),b,t.z)
q.a=c
q.au(c)}catch(a){c=window.localStorage
c.toString
B.i.v(c,"waterhall_session")
q.ap()}else if(e!=null)q.av(e)
else q.ap()
q.cX()
return A.e1(null,r)}})
return A.e2($async$X,r)},
cX(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3=this,b4="click",b5="input",b6="change"
b3.cE()
s=document
r=t.q
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
A.x(p,b4,h.i("~(1)?").a(new A.ej(b3,i)),!1,h.c)}if(o!=null){h=t.C
A.x(o,b4,h.i("~(1)?").a(new A.ek(b3,i)),!1,h.c)}if(q!=null){h=t.C
A.x(q,b4,h.i("~(1)?").a(new A.el(b3,m,l,j,i)),!1,h.c)}g=r.a(s.getElementById("btn-logout"))
if(g!=null){h=t.C
A.x(g,b4,h.i("~(1)?").a(new A.ev(b3,m,l)),!1,h.c)}f=r.a(s.getElementById("btn-resident-logout"))
if(f!=null){h=t.C
A.x(f,b4,h.i("~(1)?").a(new A.ew(b3,m)),!1,h.c)}h=t.h
A.jU(h,h,"T","querySelectorAll")
h=s.querySelectorAll(".nav-tab")
h.toString
e=new A.bK(h,t.cD)
e.q(e,new A.ex(b3))
d=n.a(s.getElementById("dir-search"))
c=k.a(s.getElementById("filter-purok"))
b=k.a(s.getElementById("filter-status"))
if(d!=null){n=t.E
A.x(d,b5,n.i("~(1)?").a(new A.ey(b3)),!1,n.c)}if(c!=null){n=t.E
A.x(c,b6,n.i("~(1)?").a(new A.ez(b3)),!1,n.c)}if(b!=null){n=t.E
A.x(b,b6,n.i("~(1)?").a(new A.eA(b3)),!1,n.c)}a=s.getElementById("btn-close-modal")
if(a!=null){n=J.av(a)
k=n.$ti
A.x(n.a,n.b,k.i("~(1)?").a(new A.eB(b3)),!1,k.c)}a0=s.getElementById("house-detail-modal")
if(a0!=null){n=J.av(a0)
k=n.$ti
A.x(n.a,n.b,k.i("~(1)?").a(new A.eC(b3,a0)),!1,k.c)}a1=t.I.a(s.getElementById("modal-leak-toggle"))
if(a1!=null){n=t.E
A.x(a1,b6,n.i("~(1)?").a(new A.em(b3,a1)),!1,n.c)}a2=r.a(s.getElementById("btn-submit-log"))
if(a2!=null){n=t.C
A.x(a2,b4,n.i("~(1)?").a(new A.en(b3)),!1,n.c)}n=t.O
a3=n.a(s.getElementById("slider-tank"))
a4=n.a(s.getElementById("slider-ph"))
a5=n.a(s.getElementById("slider-turbidity"))
a6=s.getElementById("sim-tank-val")
a7=s.getElementById("sim-ph-val")
a8=s.getElementById("sim-turbidity-val")
if(a3!=null){n=t.E
A.x(a3,b5,n.i("~(1)?").a(new A.eo(b3,a3,a6)),!1,n.c)}if(a4!=null){n=t.E
A.x(a4,b5,n.i("~(1)?").a(new A.ep(b3,a4,a7)),!1,n.c)}if(a5!=null){n=t.E
A.x(a5,b5,n.i("~(1)?").a(new A.eq(b3,a5,a8)),!1,n.c)}a9=s.getElementById("menu-view-logs")
if(a9!=null){n=J.av(a9)
k=n.$ti
A.x(n.a,n.b,k.i("~(1)?").a(new A.er(b3)),!1,k.c)}b0=s.getElementById("menu-emergency-call")
if(b0!=null){n=J.av(b0)
k=n.$ti
A.x(n.a,n.b,k.i("~(1)?").a(new A.es(b3)),!1,k.c)}b1=r.a(s.getElementById("btn-resident-submit-log"))
if(b1!=null){r=t.C
A.x(b1,b4,r.i("~(1)?").a(new A.et(b3)),!1,r.c)}b2=s.getElementById("btn-broadcast-announcement")
if(b2!=null){s=J.av(b2)
r=s.$ti
A.x(s.a,s.b,r.i("~(1)?").a(new A.eu(b3)),!1,r.c)}},
bm(a,b){var s
if(b!=null){J.aI(b,a)
s=b.style
s.display="block"}},
ap(){var s=this,r="none",q=s.CW
q===$&&A.a4()
new A.aC(q,A.z(q).i("aC<2>")).q(0,new A.eD())
q=s.e
q===$&&A.a4()
J.af(q).m(0,"active")
s.b="view-login"
q=s.at
q===$&&A.a4()
q=q.style
q.display=r
q=s.ax
q===$&&A.a4()
q=q.style
q.display=r
q=s.ay
q===$&&A.a4()
if(q!=null){q=q.style
q.display=r}},
au(a){var s,r=this
t.P.a(a)
s=r.e
s===$&&A.a4()
J.af(s).v(0,"active")
s=r.CW
s===$&&A.a4()
new A.aC(s,A.z(s).i("aC<2>")).q(0,new A.fg())
r.d=null
s=window.localStorage
s.toString
B.i.v(s,"waterhall_resident_session")
s=r.at
s===$&&A.a4()
s.setAttribute("style","display: flex !important")
s=r.ax
s===$&&A.a4()
s.setAttribute("style","display: none !important")
s=r.ay
s===$&&A.a4()
if(s!=null){s=s.style
s.display="none"}r.a5("view-dashboard")
r.ag()
r.a3()
r.af()
r.ba()
r.dg()},
a5(a){var s,r,q,p=this
if(p.a==null&&p.d==null&&a!=="view-login"){p.ap()
return}p.b=a
s=document
s.toString
r=t.h
A.jU(r,r,"T","querySelectorAll")
s=s.querySelectorAll(".nav-tab")
s.toString
q=new A.bK(s,t.cD)
q.q(q,new A.fm(a))
s=p.CW
s===$&&A.a4()
s.q(0,new A.fn(a))
if(a==="view-dashboard")p.ag()
else if(a==="view-directory")p.a3()
else if(a==="view-assets")p.af()
else if(a==="view-profile")p.ba()
else if(a==="view-billing")p.c3(null)
else if(a==="view-resident-home"||a==="view-resident-ledger"||a==="view-resident-support")p.c4()},
ag(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=this,a2="var(--alert-green)",a3=".alert-widget-title",a4="var(--amber-safety)"
if(a1.a==null)return
s=document
r=s.getElementById("dash-worker-title")
if(r!=null)J.n(r,"Field Terminal: "+A.d(a1.a.h(0,"selected_zone")))
q=$.G()
p=q.a
o=q.b
n=q.c
q=A.K(p)
m=q.i("N<1>")
l=A.b4(new A.N(p,q.i("E(1)").a(new A.eW()),m),m.i("j.E"))
k=A.q([],t.gE)
if(J.r(o.h(0,"ph_status"),"warning")){q=t.N
B.b.m(k,A.C(["type","quality","name","Central Reservoir pH Alert","desc",A.k(o.h(0,"ph_desc"))],q,q))
j=1}else j=0
if(J.r(o.h(0,"turbidity_status"),"warning")){++j
q=t.N
B.b.m(k,A.C(["type","quality","name","Central Turbidity Alert","desc",A.k(o.h(0,"turbidity_desc"))],q,q))}i=l.length+j
h=s.getElementById("dash-alert-count")
if(h!=null)J.n(h,B.c.j(i))
g=s.getElementById("dashboard-alert-widget")
f=s.getElementById("dash-alert-list")
if(g!=null&&f!=null){q=J.F(f)
q.sB(f,"")
if(i===0){m=g.style
m.borderColor=a2
e=t.dg.a(g.querySelector(a3))
if(e!=null){m=e.style
m.color=a2}q.sB(f,'          <div class="alert-item" style="border-left-color: var(--alert-green); background-color: rgba(16, 185, 129, 0.05)">\n            <div class="alert-item-icon">\n              <svg style="fill: var(--alert-green)" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n            </div>\n            <div class="alert-item-text" style="color: var(--text-on-dark)">No active leaks or water quality issues in Brgy. Tagpopongan.</div>\n          </div>\n        ')}else{q=g.style
q.borderColor=a4
e=t.dg.a(g.querySelector(a3))
if(e!=null){q=e.style
q.color=a4}B.b.q(l,new A.eX(a1,f))
B.b.q(k,new A.eY(a1,f))}}d=A.q(["Purok 1","Purok 2","Purok 3","Purok 4","Purok 5","Purok 6"],t.s)
new A.b3(d,t.ey).q(0,new A.eZ(a1,p))
c=s.getElementById("dashboard-zone-grid")
if(c!=null){J.aI(c,"")
B.b.q(d,new A.f_(a1,p,c))}b=s.getElementById("dash-log-count")
a=s.getElementById("dash-log-list")
if(a!=null){s=J.F(a)
s.sB(a,"")
a0=A.lc(n,0,A.e6(3,"count",t.S),A.K(n).c).aH(0)
if(b!=null)J.n(b,""+n.length+" logged")
if(a0.length===0)s.sB(a,'<div class="log-card" style="color:var(--text-muted)">No maintenance activity logged yet.</div>')
else B.b.q(a0,new A.f0(a1,p,a))}},
a3(){var s,r,q,p,o,n,m=null,l=$.G().a,k=document,j=t.f.a(k.getElementById("dir-search")),i=t.Z,h=i.a(k.getElementById("filter-purok")),g=i.a(k.getElementById("filter-status"))
if(j==null)s=m
else{i=j.value
i=i==null?m:B.a.J(i.toLowerCase())
s=i}if(s==null)s=""
r=h==null?m:h.value
if(r==null)r="all"
q=g==null?m:g.value
if(q==null)q="all"
p=k.getElementById("dir-empty-state")
o=k.getElementById("dir-household-list")
if(o==null)return
J.aI(o,"")
k=A.K(l)
i=k.i("N<1>")
n=A.b4(new A.N(l,k.i("E(1)").a(new A.f2(s,r,q)),i),i.i("j.E"))
if(n.length===0){if(p!=null){k=p.style
k.display="block"}}else{if(p!=null){k=p.style
k.display="none"}B.b.q(n,new A.f3(this,o))}},
c_(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f="current_leak_status"
g.c=a
s=$.G().aa(a)
if(s==null)return
r=document
q=r.getElementById("modal-owner-name")
p=r.getElementById("modal-acct-num")
o=r.getElementById("modal-current-m3")
n=r.getElementById("modal-flow-rate")
if(q!=null)J.n(q,A.ai(J.l(s,"owner_name")))
if(p!=null){m=J.u(s)
J.n(p,A.d(m.h(s,"house_id"))+" | "+A.d(m.h(s,"account_number")))}if(o!=null)J.n(o,B.e.p(A.w(J.l(s,"current_m3_usage")),1))
if(n!=null)J.n(n,B.e.p(A.w(J.l(s,"flow_rate")),2))
m=t.I
l=m.a(r.getElementById("modal-leak-toggle"))
if(l!=null)B.f.saA(l,J.r(J.l(s,f),"leak"))
k=J.u(s)
g.bf(A.k(k.h(s,f)))
g.c5(A.U(t.R.a(k.h(s,"monthly_history")),t.n),"chart-container")
g.b9(a)
j=t.o.a(r.getElementById("log-desc"))
i=m.a(r.getElementById("log-resolved"))
if(j!=null)B.n.sH(j,"")
if(i!=null)B.f.saA(i,J.r(k.h(s,f),"leak"))
h=r.getElementById("house-detail-modal")
if(h!=null)J.af(h).m(0,"active")},
bL(){var s=document.getElementById("house-detail-modal")
if(s!=null)J.af(s).v(0,"active")
this.c=null
this.ag()
this.a3()},
bf(a){var s=document,r=s.getElementById("modal-leak-title"),q=s.getElementById("modal-leak-desc")
if(r==null||q==null)return
s=J.F(r)
if(a==="leak"){s.sW(r,"Leak State Sim: HIGH CONSTANT FLOW")
s=r.style
s.color="var(--alert-red)"
J.n(q,"Meter detects flow rate exceeds safety coefficient threshold.")}else{s.sW(r,"Flow State Sim: NORMAL FLOW")
s=r.style
s.color="var(--alert-green)"
J.n(q,"Meter flow matches normal residential consumption metrics.")}},
c5(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d="var(--amber-safety)",c={}
t.bj.a(a)
s=document.getElementById(b)
if(s==null)return
r=J.F(s)
r.sB(s,"")
if(a.length===0){r.sB(s,'<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:12px">No historic telemetry available.</div>')
return}q=B.e.aB(B.b.dn(a,new A.fb())*1.1,10,1000)
p=A.q(["Mar","Apr","May","Jun"],t.s)
o=new A.b3(a,A.K(a).i("b3<1>"))
n=o.gd8(o).aq(0,new A.fc(a,q,p),t.U).aH(0)
o=A.K(n)
m=o.i("a(1)")
o=o.i("a0<1,a>")
l=new A.a0(n,m.a(new A.fd()),o).U(0," ")
if(0>=n.length)return A.b(n,0)
k=B.e.p(A.w(J.l(n[0],"x")),1)
j=B.c.p(80,1)
o=new A.a0(n,m.a(new A.fe()),o).U(0," ")
m=n.length
i=m-1
if(!(i>=0))return A.b(n,i)
i=B.e.p(A.w(J.l(n[i],"x")),1)
m=B.c.p(80,1)
h=b==="resident-chart-container"
g=h?"res-chart-grad":"chart-area-grad"
f=h?"#3B82F6":d
e=h?"#3B82F6":d
c.a='      <svg width="100%" height="100%" viewBox="0 0 340 100" style="overflow:visible">\n        <defs>\n          <linearGradient id="'+g+'" x1="0" y1="0" x2="0" y2="1">\n            <stop offset="0%" stop-color="'+e+'" stop-opacity="0.3"/>\n            <stop offset="100%" stop-color="'+e+'" stop-opacity="0.0"/>\n          </linearGradient>\n        </defs>\n        \n        <line x1="20" y1="20" x2="320" y2="20" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="50" x2="320" y2="50" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="80" x2="320" y2="80" stroke="#CBD5E1" stroke-width="1.5"/>\n        \n        <path d="'+("M "+k+","+j+" "+o+(" L "+i+","+m+" Z"))+'" fill="url(#'+g+')" />\n        <polyline points="'+l+'" fill="none" stroke="'+f+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>\n    '
B.b.q(n,new A.ff(c,f))
r.sB(s,c.a+="</svg>")},
b9(a){var s,r,q,p,o,n=document.getElementById("modal-historical-logs")
if(n==null)return
s=J.F(n)
s.sB(n,"")
r=$.G().c
q=A.K(r)
p=q.i("N<1>")
o=A.b4(new A.N(r,q.i("E(1)").a(new A.f4(a)),p),p.i("j.E"))
if(o.length===0)s.sB(n,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous repair logs recorded for this meter.</div>')
else B.b.q(o,new A.f5(this,n))},
af(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b="main_tank_level",a="ph_level",a0="turbidity",a1="reservoir-status-banner",a2="var(--amber-safety)",a3="var(--alert-green)",a4="ph_status",a5="turbidity_status",a6=$.G().b,a7=document,a8=t.O,a9=a8.a(a7.getElementById("slider-tank")),b0=a8.a(a7.getElementById("slider-ph")),b1=a8.a(a7.getElementById("slider-turbidity")),b2=a7.getElementById("sim-tank-val"),b3=a7.getElementById("sim-ph-val"),b4=a7.getElementById("sim-turbidity-val")
a8=a7.activeElement
if((a8==null?a9!=null:a8!==a9)&&a9!=null){B.f.sH(a9,J.L(a6.h(0,b)))
if(b2!=null)J.n(b2,A.d(a6.h(0,b))+"%")}a8=a7.activeElement
if((a8==null?b0!=null:a8!==b0)&&b0!=null){B.f.sH(b0,J.L(a6.h(0,a)))
if(b3!=null)J.n(b3,B.e.p(A.w(a6.h(0,a)),1))}a8=a7.activeElement
if((a8==null?b1!=null:a8!==b1)&&b1!=null){B.f.sH(b1,J.L(a6.h(0,a0)))
if(b4!=null)J.n(b4,B.e.p(A.w(a6.h(0,a0)),1)+" NTU")}s=a7.getElementById("asset-tank-percent")
r=a7.getElementById("asset-tank-fill")
q=a7.getElementById("asset-tank-banner")
p=A.aP(a6.h(0,b))
if(s!=null)J.n(s,""+p+"%")
a8=r!=null
if(a8){o=r.style
o.height=""+p+"%"}if(q!=null&&a8)if(p<30){J.n(q,"CRITICAL: Low Water Reserve. High pressure risk in Zone 4 & 5!")
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
j=A.w(a6.h(0,a))
if(n!=null)J.n(n,B.e.p(j,1))
if(l!=null){i=B.e.aB((j-4)/6*100,0,100)
a8=l.style
a8.left=A.d(i)+"%"}if(m!=null){J.n(m,J.L(a6.h(0,a4)).toUpperCase())
m.className="quality-badge "+A.d(a6.h(0,a4))}if(k!=null)J.n(k,A.ai(a6.h(0,"ph_desc")))
h=a7.getElementById("asset-turbidity-val")
g=a7.getElementById("asset-turbidity-badge")
f=a7.getElementById("asset-turbidity-fill")
e=a7.getElementById("asset-turbidity-desc")
d=A.w(a6.h(0,a0))
if(h!=null)J.n(h,B.e.p(d,1))
if(f!=null){c=B.e.aB(d/12*100,0,100)
a7=f.style
a7.width=A.d(c)+"%"
if(J.r(a6.h(0,a5),"warning")){a7=f.style
a7.backgroundColor=a2}else{a7=f.style
a7.backgroundColor=a3}}if(g!=null){J.n(g,J.L(a6.h(0,a5)).toUpperCase())
g.className="quality-badge "+A.d(a6.h(0,a5))}if(e!=null)J.n(e,A.ai(a6.h(0,"turbidity_desc")))},
ba(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this
if(f.a==null)return
s=document
r=s.getElementById("worker-name")
q=s.getElementById("worker-role")
p=s.getElementById("worker-zone-lbl")
o=s.getElementById("worker-avatar")
if(r!=null)J.n(r,A.ai(f.a.h(0,"name")))
if(q!=null)J.n(q,A.ai(f.a.h(0,"role")))
if(p!=null)J.n(p,"Assigned Zone: "+A.d(f.a.h(0,"selected_zone")))
if(o!=null){n=A.q(J.L(f.a.h(0,"name")).split(" "),t.s)
J.n(o,B.a.n(new A.a0(n,t.dG.a(new A.f6()),t.e).U(0,""),0,B.c.aB(n.length,1,2)).toUpperCase())}m=$.G()
l=m.a
k=A.K(l)
j=new A.N(l,k.i("E(1)").a(new A.f7(f)),k.i("N<1>")).gk(0)
m=m.c
k=A.K(m)
i=new A.N(m,k.i("E(1)").a(new A.f8(f)),k.i("N<1>")).gk(0)
h=s.getElementById("profile-stat-total")
g=s.getElementById("profile-stat-logs")
if(h!=null)J.n(h,B.c.j(j))
if(g!=null)J.n(g,B.c.j(i))},
dg(){var s,r,q=this,p=document,o=t.f,n=o.a(p.getElementById("bill-meter-search")),m=p.getElementById("bill-meter-results"),l=o.a(p.getElementById("bill-curr-input")),k=t.q.a(p.getElementById("btn-save-bill"))
if(n==null)return
o=t.E
s=o.i("~(1)?")
o=o.c
A.x(n,"focus",s.a(new A.eE(q)),!1,o)
A.x(n,"input",s.a(new A.eF(q)),!1,o)
if(l!=null)A.x(l,"input",s.a(new A.eG(q)),!1,o)
A.x(p,"click",t.h2.a(new A.eH(n,m)),!1,t.V)
if(k!=null){p=t.C
A.x(k,"click",p.i("~(1)?").a(new A.eI(q)),!1,p.c)}r=$.G().a
p=r.length
if(p!==0){if(0>=p)return A.b(r,0)
q.cx=A.ai(J.l(r[0],"house_id"))
if(0>=r.length)return A.b(r,0)
p=A.d(J.l(r[0],"owner_name"))
if(0>=r.length)return A.b(r,0)
B.f.sH(n,p+" ("+A.d(J.l(r[0],"account_number"))+")")}},
bl(){var s,r,q,p,o=document,n=t.f.a(o.getElementById("bill-meter-search")),m=o.getElementById("bill-meter-results")
if(n==null||m==null)return
o=n.value
s=o==null?null:B.a.J(o.toLowerCase())
if(s==null)s=""
r=$.G().a
o=A.K(r)
q=o.i("N<1>")
p=A.b4(new A.N(r,o.i("E(1)").a(new A.fi(s)),q),q.i("j.E"))
o=J.F(m)
o.sB(m,"")
if(p.length===0){o.sB(m,'<div class="search-result-item" style="color:var(--text-muted); cursor:default">No households found</div>')
o=m.style
o.display="block"
return}B.b.q(p,new A.fj(this,n,m))
o=m.style
o.display="block"},
c3(a){var s,r,q,p,o,n,m,l,k=this,j="current_m3_usage",i=a!=null
if(i)k.cx=a
s=k.cx
if(s==null)return
r=$.G()
q=r.aa(s)
if(q==null)return
s=document
p=s.getElementById("bill-prev-reading")
o=t.f.a(s.getElementById("bill-curr-input"))
s=k.cx
s.toString
n=r.aL(s)
s=n.length
if(s!==0){if(0>=s)return A.b(n,0)
m=A.w(J.l(n[0],"current_reading"))}else{s=J.u(q)
l=A.U(t.R.a(s.h(q,"monthly_history")),t.n)
r=l.length
m=r>=2?l[r-2]:A.w(s.h(q,j))-2.5}if(p!=null)J.n(p,B.e.p(m,1))
if(i&&o!=null)B.f.sH(o,B.e.p(A.w(J.l(q,j)),1))
k.bd()
i=k.cx
i.toString
k.c2(i)},
bd(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
if(this.cx==null)return
s=document
r=s.getElementById("bill-prev-reading")
q=t.f.a(s.getElementById("bill-curr-input"))
p=r==null?null:r.textContent
o=A.b7(p==null?"":p)
if(o==null)o=0
p=q==null?null:q.value
n=A.b7(p==null?"":p)
m=(n==null?0:n)-o
if(m<0)m=0
l=s.getElementById("bill-calc-consumption")
if(l!=null)J.n(l,B.e.p(m,1))
k=m>10?(m-10)*15:0
j=s.getElementById("bill-calc-excess")
if(j!=null)J.n(j,B.e.p(k,2))
i=s.getElementById("bill-calc-total")
if(i!=null)J.n(i,B.e.p(120+k+50,2))
p=$.G()
h=this.cx
h.toString
g=p.bS(h,"June 2026")
f=s.getElementById("billing-alert-banner")
e=t.q.a(s.getElementById("btn-save-bill"))
if(f!=null){s=J.F(f)
if(g){s.sB(f,'          <svg style="width:18px;height:18px;fill:currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n          <span>DOUBLE-BILLING BLOCKED: Bill already registered for June 2026.</span>\n        ')
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
B.m.bA(s,B.m.br(s,"opacity"),"0.5","")
s=e.style
s.cursor="not-allowed"
d=e.querySelector("span")
if(d!=null)J.n(d,"Register Blocked (Billed)")}}else{s.sB(f,'          <svg style="width:18px;height:18px;fill:currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n          <span>CLEAR: Safe to bill June 2026. No duplicates found.</span>\n        ')
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
B.m.bA(s,B.m.br(s,"opacity"),"1","")
s=e.style
s.cursor="pointer"
d=e.querySelector("span")
if(d!=null)J.n(d,"Register & Save Bill")}}}},
cf(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d=null,c=e.cx
if(c==null||e.a==null)return
s=$.G()
if(s.bS(c,"June 2026")){e.C("Operation blocked to prevent double-billing!")
return}c=document
r=c.getElementById("bill-prev-reading")
q=t.f.a(c.getElementById("bill-curr-input"))
p=c.getElementById("bill-calc-consumption")
o=c.getElementById("bill-calc-excess")
c=r==null?d:r.textContent
n=A.b7(c==null?"":c)
if(n==null)n=0
c=q==null?d:q.value
m=A.b7(c==null?"":c)
if(m==null)m=0
c=p==null?d:p.textContent
l=A.b7(c==null?"":c)
if(l==null)l=0
c=o==null?d:o.textContent
k=A.b7(c==null?"":c)
c=120+(k==null?0:k)
j=e.cx
j.toString
i=s.aa(j)
if(i==null)return
j=J.u(i)
h=t.N
g=t.z
c=t.P.a(A.C(["house_id",e.cx,"account_number",j.h(i,"account_number"),"billing_month","June 2026","previous_reading",n,"current_reading",m,"consumption",l,"water_charge",c,"maintenance_fee",50,"total_due",c+50,"billed_by",e.a.h(0,"worker_id")],h,g))
f=s.e
h=A.bw(h,g)
h.l(0,"bill_id","BILL-"+(5000+B.j.ae(5000)))
h.l(0,"date",new A.a5(Date.now(),0,!1).aj().ai())
h.l(0,"status","Pending")
h.R(0,c)
B.b.b4(f,0,h)
s.a0("/api/billing-records/add",h)
h=window.localStorage
h.toString
h.setItem("waterhall_billing_records",B.d.t(f))
e.C("June 2026 bill registered for "+A.d(j.h(i,"owner_name"))+"!")
e.bd()
j=e.cx
j.toString
e.c2(j)
e.ba()},
c2(a){var s,r,q=document.getElementById("billing-history-list")
if(q==null)return
s=J.F(q)
s.sB(q,"")
r=$.G().aL(a)
if(r.length===0)s.sB(q,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous invoice logs recorded.</div>')
else B.b.q(r,new A.eM(this,q))},
bn(a,b){var s=document,r=s.getElementById("app-toast"),q=s.getElementById("toast-text")
if(r!=null&&q!=null){J.n(q,a)
J.af(r).m(0,"show")
s=this.cy
if(s!=null)s.cZ()
this.cy=A.le(A.i4(b,0),new A.fl(r))}},
C(a){return this.bn(a,2500)},
av(a){var s,r=this
r.d=a
window.localStorage.setItem("waterhall_resident_session",a)
r.a=null
s=window.localStorage
s.toString
B.i.v(s,"waterhall_session")
s=r.e
s===$&&A.a4()
J.af(s).v(0,"active")
s=r.CW
s===$&&A.a4()
new A.aC(s,A.z(s).i("aC<2>")).q(0,new A.fk())
s=r.at
s===$&&A.a4()
s.setAttribute("style","display: none !important")
s=r.ax
s===$&&A.a4()
s.setAttribute("style","display: flex !important")
s=r.ay
s===$&&A.a4()
if(s!=null){s=s.style
s.display="none"}r.a5("view-resident-home")},
c4(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3=this,b4="warning",b5="var(--alert-red)",b6="var(--alert-green)",b7="monthly_history",b8="current_m3_usage",b9=b3.d
if(b9==null)return
q=$.G()
p=q.aa(b9)
if(p==null)return
o=q.cd()
b9=document
n=b9.getElementById("resident-announcement-banner")
m=b9.getElementById("resident-announcement-message")
if(n!=null&&m!=null)if(o!=null){J.n(m,A.ai(J.l(o,"message")))
l=n.style
l.display="flex"}else{l=n.style
l.display="none"}k=q.b
j=b9.getElementById("resident-tank-val")
i=b9.getElementById("resident-ph-val")
h=b9.getElementById("resident-turb-val")
g=b9.getElementById("resident-safety-status")
if(j!=null)J.n(j,A.d(k.h(0,"main_tank_level"))+"%")
if(i!=null)J.n(i,B.e.p(A.w(k.h(0,"ph_level")),1))
if(h!=null)J.n(h,B.e.p(A.w(k.h(0,"turbidity")),1))
if(g!=null){l=J.r(k.h(0,"ph_status"),b4)||J.r(k.h(0,"turbidity_status"),b4)
f=J.F(g)
if(l){f.sW(g,"ALERT")
l=g.style
l.color=b5}else{f.sW(g,"SAFE")
l=g.style
l.color=b6}}e=b9.getElementById("resident-profile-name-home")
d=b9.getElementById("resident-profile-meta-home")
if(e!=null)J.n(e,A.ai(J.l(p,"owner_name")))
if(d!=null){l=J.u(p)
J.n(d,"Meter ID: "+A.d(l.h(p,"house_id"))+" | "+A.d(l.h(p,"account_number"))+" | "+A.d(l.h(p,"purok")))}c=b9.getElementById("resident-leak-flag")
if(c!=null){l=J.F(c)
if(J.r(J.l(p,"current_leak_status"),"leak")){l.sB(c,'          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n          <span>Leak Alert Warning: High constant flow rate registered. Please inspect on-site faucets.</span>\n        ')
c.className="reservoir-status-banner low"
l=c.style
l.backgroundColor="var(--alert-red-bg)"
l=c.style
l.borderColor="rgba(239, 68, 68, 0.3)"
l=c.style
l.color=b5}else{l.sB(c,'          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n          <span>Normal Flow Clearance: IoT sensors verify secure line pressure. No leak detected.</span>\n        ')
c.className="reservoir-status-banner"
l=c.style
l.backgroundColor="var(--alert-green-bg)"
l=c.style
l.borderColor="rgba(16, 185, 129, 0.2)"
l=c.style
l.color=b6}}l=b3.d
l.toString
s=q.aL(l)
r=null
try{r=J.e8(s,new A.f9())}catch(b){}if(r!=null){a=A.w(J.l(r,"previous_reading"))
a0=A.w(J.l(r,"current_reading"))
a1=A.w(J.l(r,"consumption"))
a2=a1>10?(a1-10)*15:0
a3=A.w(J.l(r,"total_due"))
a4=A.k(J.l(r,"status"))
a5=J.r(J.l(r,"status"),"Paid")?"normal":b4}else{q=J.u(p)
a6=A.U(t.R.a(q.h(p,b7)),t.n)
l=a6.length
a=l>=2?a6[l-2]:A.w(q.h(p,b8))-2.5
a0=A.w(q.h(p,b8))
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
if(a7!=null)J.n(a7,B.e.p(a,1))
if(a8!=null)J.n(a8,B.e.p(a0,1))
if(a9!=null)J.n(a9,B.e.p(a1,1))
if(b0!=null)J.n(b0,B.e.p(a2,2))
if(b1!=null)J.n(b1,B.e.p(a3,2))
if(b2!=null){J.n(b2,a4.toUpperCase())
b2.className="quality-badge "+a5}b3.c5(A.U(t.R.a(J.l(p,b7)),t.n),"resident-chart-container")
b3.ds(s)},
ds(a){var s,r
t.D.a(a)
s=document.getElementById("resident-history-list")
if(s==null)return
r=J.F(s)
r.sB(s,"")
if(a.length===0){r.sB(s,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No billing history available.</div>')
return}B.b.q(a,new A.fa(this,s))},
cE(){var s,r=document,q=r.getElementById("btn-open-register-modal"),p=r.getElementById("register-user-modal"),o=r.getElementById("btn-close-register-modal"),n=r.getElementById("btn-submit-register"),m=t.Z.a(r.getElementById("reg-role")),l=r.getElementById("reg-resident-fields"),k=r.getElementById("reg-worker-fields")
if(m!=null){r=t.E
A.x(m,"change",r.i("~(1)?").a(new A.ed(m,l,k)),!1,r.c)}if(q!=null){r=J.av(q)
s=r.$ti
A.x(r.a,r.b,s.i("~(1)?").a(new A.ee(p)),!1,s.c)}if(o!=null){r=J.av(o)
s=r.$ti
A.x(r.a,r.b,s.i("~(1)?").a(new A.ef(p)),!1,s.c)}if(n!=null){r=J.av(n)
s=r.$ti
A.x(r.a,r.b,s.i("~(1)?").a(new A.eg(this,m,p)),!1,s.c)}}}
A.eL.prototype={
$0(){var s,r,q,p,o=document.getElementById("phone-time")
if(o!=null){s=new A.a5(Date.now(),0,!1)
r=A.aN(s)
q=B.a.Y(B.c.j(A.by(s)),2,"0")
p=r>=12?"PM":"AM"
r=B.c.a4(r,12)
J.n(o,""+(r!==0?r:12)+":"+q+" "+p)}},
$S:2}
A.eJ.prototype={
$1(a){t.p.a(a)
return this.a.$0()},
$S:29}
A.eK.prototype={
$1(a){return this.cc(t.p.a(a))},
cc(a){var s=0,r=A.e3(t.H),q=this,p,o
var $async$$1=A.e5(function(b,c){if(b===1)return A.e0(c,r)
for(;;)switch(s){case 0:o=q.a
s=o.a!=null||o.d!=null?2:3
break
case 2:s=4
return A.e_($.G().aG(),$async$$1)
case 4:if(o.d!=null)o.c4()
else{p=o.b
if(p==="view-dashboard")o.ag()
else if(p==="view-directory")o.a3()
else if(p==="view-assets")o.af()}case 3:return A.e1(null,r)}})
return A.e2($async$$1,r)},
$S:30}
A.ej.prototype={
$1(a){var s,r,q,p,o
t.V.a(a)
s=$.G().a
try{r=J.e8(s,new A.ei())
q=window.localStorage
q.toString
B.i.v(q,"waterhall_session")
q=this.a
q.a=null
q.av(A.k(J.l(r,"house_id")))
p=this.b
if(p!=null){p=p.style
p.display="none"}q.C("Quick Login: "+A.k(J.l(r,"owner_name")))}catch(o){}},
$S:0}
A.ei.prototype={
$1(a){return J.L(J.l(t.P.a(a),"account_number")).toLowerCase()==="tag-2026-0041"},
$S:1}
A.ek.prototype={
$1(a){var s,r,q,p,o,n,m
t.V.a(a)
s=$.G()
r=s.d
if(r.length!==0){q=B.b.gbN(r)
p=J.u(q)
o=A.k(p.h(q,"name"))
n=A.k(p.h(q,"worker_id"))
p=p.h(q,"zone")
m=s.bg(o,n,A.k(p==null?"Purok 1":p))
if(m!=null){s=this.a
s.a=m
p=window.localStorage
p.toString
p.setItem("waterhall_session",B.d.t(m))
p=window.localStorage
p.toString
B.i.v(p,"waterhall_resident_session")
p=this.b
if(p!=null){p=p.style
p.display="none"}s.au(m)
s.C("Quick Login: Tech "+A.k(m.h(0,"name")))}}},
$S:0}
A.el.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j=this,i=null,h="waterhall_session",g="house_id",f="none",e="Logged in as Resident: ",d="owner_name",c="waterhall_resident_session",b="Logged in as Tech: "
t.V.a(a)
s=j.b
if(s==null)r=i
else{s=s.value
s=s==null?i:B.a.J(s)
r=s}if(r==null)r=""
s=j.c
if(s==null)q=i
else{s=s.value
s=s==null?i:B.a.J(s)
q=s}if(q==null)q=""
s=j.d
p=s==null?i:s.value
if(p==null)p=""
if(r.length===0||q.length===0){j.a.bm("Both Username and Password are required.",j.e)
return}s=t.d.a(window.location).href
s.toString
o=A.jg(s).gb8().h(0,"role")
if(o==="resident"){n=$.G().c9(r,q)
if(n!=null){s=window.localStorage
s.toString
B.i.v(s,h)
s=j.a
s.a=null
m=J.u(n)
s.av(A.k(m.h(n,g)))
l=j.e
if(l!=null){l=l.style
l.display=f}s.C(e+A.k(m.h(n,d)))
return}}else if(o==="worker"){k=$.G().bg(r,q,p)
if(k!=null){s=j.a
s.a=k
m=window.localStorage
m.toString
m.setItem(h,B.d.t(k))
m=window.localStorage
m.toString
B.i.v(m,c)
m=j.e
if(m!=null){m=m.style
m.display=f}s.au(k)
s.C(b+A.k(k.h(0,"name")))
return}}else{s=$.G()
k=s.bg(r,q,p)
if(k!=null){s=j.a
s.a=k
m=window.localStorage
m.toString
m.setItem(h,B.d.t(k))
m=window.localStorage
m.toString
B.i.v(m,c)
m=j.e
if(m!=null){m=m.style
m.display=f}s.au(k)
s.C(b+A.k(k.h(0,"name")))
return}n=s.c9(r,q)
if(n!=null){s=window.localStorage
s.toString
B.i.v(s,h)
s=j.a
s.a=null
m=J.u(n)
s.av(A.k(m.h(n,g)))
l=j.e
if(l!=null){l=l.style
l.display=f}s.C(e+A.k(m.h(n,d)))
return}}j.a.bm('Credentials "'+r+'" not recognized. Check details.',j.e)},
$S:0}
A.ev.prototype={
$1(a){var s,r
t.V.a(a)
s=window.localStorage
s.toString
B.i.v(s,"waterhall_session")
s=this.a
s.a=null
s.ap()
r=this.b
if(r!=null)B.f.sH(r,"")
r=this.c
if(r!=null)B.f.sH(r,"")
s.C("Signed out of Tech session")},
$S:0}
A.ew.prototype={
$1(a){var s,r
t.V.a(a)
s=window.localStorage
s.toString
B.i.v(s,"waterhall_resident_session")
s=this.a
s.d=null
s.ap()
r=this.b
if(r!=null)B.f.sH(r,"")
s.C("Signed out of Resident Portal")},
$S:0}
A.ex.prototype={
$1(a){var s,r
t.h.a(a)
s=J.av(a)
r=s.$ti
A.x(s.a,s.b,r.i("~(1)?").a(new A.eh(this.a,a)),!1,r.c)},
$S:5}
A.eh.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.b.getAttribute("data-target")
if(s==null)s=""
this.a.a5(s)},
$S:0}
A.ey.prototype={
$1(a){return this.a.a3()},
$S:3}
A.ez.prototype={
$1(a){return this.a.a3()},
$S:3}
A.eA.prototype={
$1(a){return this.a.a3()},
$S:3}
A.eB.prototype={
$1(a){t.V.a(a)
return this.a.bL()},
$S:0}
A.eC.prototype={
$1(a){if(A.jH(t.V.a(a).target)===this.b)this.a.bL()},
$S:0}
A.em.prototype={
$1(a){var s,r,q,p,o,n=this.a,m=n.c
if(m==null)return
s=this.b.checked
r=s===!0?"leak":"normal"
q=$.G().c6(m,r)
if(q!=null){m=document
p=m.getElementById("modal-flow-rate")
if(p!=null)J.n(p,B.e.p(A.w(J.l(q,"flow_rate")),2))
n.bf(r)
n.C(r==="leak"?"Simulated Leak ALERT activated!":"Simulated Normal flow rate restored.")
s=n.c
s.toString
n.b9(s)
o=t.I.a(m.getElementById("log-resolved"))
if(o!=null)B.f.saA(o,r==="normal")}},
$S:3}
A.en.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f
t.V.a(a)
s=this.a
if(s.c==null||s.a==null)return
r=document
q=t.o.a(r.getElementById("log-desc"))
p=q==null
if(p)o=null
else{n=q.value
n=n==null?null:B.a.J(n)
o=n}if(o==null)o=""
n=t.I
m=n.a(r.getElementById("log-resolved"))
l=m==null?null:m.checked
k=l!==!1
if(o.length===0){s.C("Please detail the maintenance actions taken.")
return}j=A.C(["house_id",s.c,"worker_id",s.a.h(0,"worker_id"),"purok",s.a.h(0,"selected_zone"),"description",o,"status_resolved",k,"date",new A.a5(Date.now(),0,!1).aj().ai()],t.N,t.z)
l=$.G()
l.bI(j)
if(k){i=s.c
i.toString
l.c6(i,"normal")
h=n.a(r.getElementById("modal-leak-toggle"))
if(h!=null)B.f.saA(h,!1)
s.bf("normal")}n=s.c
n.toString
g=l.aa(n)
if(g!=null){f=r.getElementById("modal-flow-rate")
if(f!=null)J.n(f,B.e.p(A.w(J.l(g,"flow_rate")),2))}if(!p)B.n.sH(q,"")
s.C("Maintenance Log committed to database!")
r=s.c
r.toString
s.b9(r)
s.ag()},
$S:0}
A.eo.prototype={
$1(a){var s=this.b.value,r=A.ib(s==null?"":s,null)
if(r==null)r=68
s=this.c
if(s!=null)J.n(s,""+r+"%")
s=t.P.a(A.C(["main_tank_level",r],t.N,t.z))
$.G().be(s)
this.a.af()},
$S:3}
A.ep.prototype={
$1(a){var s=this.b.value,r=A.b7(s==null?"":s)
if(r==null)r=5.8
s=this.c
if(s!=null)J.n(s,B.e.p(r,1))
s=t.P.a(A.C(["ph_level",r],t.N,t.z))
$.G().be(s)
this.a.af()},
$S:3}
A.eq.prototype={
$1(a){var s=this.b.value,r=A.b7(s==null?"":s)
if(r==null)r=6.2
s=this.c
if(s!=null)J.n(s,B.e.p(r,1)+" NTU")
s=t.P.a(A.C(["turbidity",r],t.N,t.z))
$.G().be(s)
this.a.af()},
$S:3}
A.er.prototype={
$1(a){var s,r,q,p,o,n="selected_zone"
t.V.a(a)
s=this.a
if(s.a==null)return
r=document
q=t.Z
p=q.a(r.getElementById("filter-purok"))
o=q.a(r.getElementById("filter-status"))
if(p!=null)B.k.sH(p,A.ai(s.a.h(0,n)))
if(o!=null)B.k.sH(o,"leak")
s.a5("view-directory")
s.C("Showing leaks in your assigned patrol zone "+A.d(s.a.h(0,n)))},
$S:0}
A.es.prototype={
$1(a){t.V.a(a)
this.a.bn("Dispatching radio ping to Barangay Office...",3500)},
$S:0}
A.et.prototype={
$1(a){var s,r,q,p,o,n,m
t.V.a(a)
s=this.a
if(s.d==null)return
r=t.o.a(document.getElementById("resident-log-desc"))
q=r==null
if(q)p=null
else{o=r.value
o=o==null?null:B.a.J(o)
p=o}if(p==null)p=""
if(p.length===0){s.C("Please describe the issue (e.g. low pressure, minor leak).")
return}o=$.G()
n=s.d
n.toString
m=o.aa(n)
if(m==null)return
o.bI(A.C(["house_id",s.d,"worker_id","unassigned","purok",J.l(m,"purok"),"description",p+" (RESIDENT REPORTED)","status_resolved",!1],t.N,t.z))
if(!q)B.n.sH(r,"")
s.C("Alert ticket dispatched to field technicians!")
s.ag()},
$S:0}
A.eu.prototype={
$1(a){var s,r,q,p,o,n,m
t.V.a(a)
s=this.a
if(s.a==null)return
r=t.o.a(document.getElementById("worker-announcement-input"))
q=r==null
if(q)p=null
else{o=r.value
o=o==null?null:B.a.J(o)
p=o}if(p==null)p=""
if(p.length===0){s.C("Message cannot be empty")
return}o=$.G()
n=t.N
m=A.C(["message",p,"author",A.k(s.a.h(0,"name")),"timestamp",new A.a5(Date.now(),0,!1).aj().ai()],n,n)
B.b.b4(o.f,0,m)
n=window.localStorage
n.toString
n.setItem("waterhall_announcements",B.d.t(o.f))
o.a0("/api/announcements/add",m)
if(!q)B.n.sH(r,"")
s.C("Announcement broadcasted!")},
$S:0}
A.eD.prototype={
$1(a){return J.af(t.h.a(a)).v(0,"active")},
$S:5}
A.fg.prototype={
$1(a){return J.af(t.h.a(a)).v(0,"active")},
$S:5}
A.fm.prototype={
$1(a){var s
t.h.a(a)
s=J.F(a)
if(a.getAttribute("data-target")===this.a)s.gad(a).m(0,"active")
else s.gad(a).v(0,"active")},
$S:5}
A.fn.prototype={
$2(a,b){var s
A.k(a)
t.h.a(b)
s=J.F(b)
if(a===this.a)s.gad(b).m(0,"active")
else s.gad(b).v(0,"active")},
$S:47}
A.eW.prototype={
$1(a){return J.r(J.l(t.P.a(a),"current_leak_status"),"leak")},
$S:1}
A.eX.prototype={
$1(a){var s,r,q
t.P.a(a)
s=document.createElement("div")
s.className="alert-item leak"
r=s.style
r.cursor="pointer"
r=J.u(a)
q=J.F(s)
q.sB(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.d(r.h(a,"owner_name"))+" ("+A.d(r.h(a,"purok"))+")</strong><br>\n              Leak alert: Flow rate at "+B.e.p(A.w(r.h(a,"flow_rate")),2)+" L/s constant.\n            </div>\n          ")
q=q.ga8(s)
r=q.$ti
A.x(q.a,q.b,r.i("~(1)?").a(new A.eV(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:4}
A.eV.prototype={
$1(a){t.V.a(a)
this.a.c_(A.k(J.l(this.b,"house_id")))},
$S:0}
A.eY.prototype={
$1(a){var s,r,q
t.J.a(a)
s=document.createElement("div")
s.className="alert-item quality"
r=s.style
r.cursor="pointer"
r=J.u(a)
q=J.F(s)
q.sB(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.d(r.h(a,"name"))+"</strong><br>\n              "+A.d(r.h(a,"desc"))+"\n            </div>\n          ")
q=q.ga8(s)
r=q.$ti
A.x(q.a,q.b,r.i("~(1)?").a(new A.eU(this.a)),!1,r.c)
this.b.appendChild(s).toString},
$S:36}
A.eU.prototype={
$1(a){t.V.a(a)
this.a.a5("view-assets")},
$S:0}
A.eZ.prototype={
$2(a,b){var s,r,q,p,o,n
A.k(b)
s=document.getElementById("pin-p"+(a+1))
if(s!=null){r=s.querySelector(".pin-bg")
q=B.b.ao(this.b,new A.eS(b))
if(r!=null)if(q){r.setAttribute("fill","var(--alert-red)")
r.setAttribute("stroke","#FFF")
r.setAttribute("stroke-width","1.5")}else{r.setAttribute("fill","var(--alert-green)")
r.removeAttribute("stroke")}p=s.style
p.cursor="pointer"
p=J.F(s)
o=t.h.a(p.d0(s,!0))
p.dt(s,o)
p=J.av(o)
n=p.$ti
A.x(p.a,p.b,n.i("~(1)?").a(new A.eT(this.a,b)),!1,n.c)}},
$S:37}
A.eS.prototype={
$1(a){var s
t.P.a(a)
s=J.u(a)
return J.r(s.h(a,"purok"),this.a)&&J.r(s.h(a,"current_leak_status"),"leak")},
$S:1}
A.eT.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Z
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.k.sH(q,this.b)
if(p!=null)B.k.sH(p,"all")
this.a.a5("view-directory")},
$S:0}
A.f_.prototype={
$1(a){var s,r,q,p,o,n,m,l
A.k(a)
s=this.b
r=A.K(s)
q=r.i("E(1)")
r=r.i("N<1>")
p=new A.N(s,q.a(new A.eP(a)),r).gk(0)
o=new A.N(s,q.a(new A.eQ(a)),r).gk(0)
r=this.a
n=J.r(r.a.h(0,"selected_zone"),a)
m=document.createElement("div")
m.className="zone-card "+(n?"assigned":"")
s=n?'<span class="zone-badge">ASSIGNED</span>':""
q=o>0?""+o+" Leaks":"Clear"
l=J.F(m)
l.sB(m,'          <div class="zone-card-header">\n            <span class="zone-name">'+a+"</span>\n            "+s+'\n          </div>\n          <div class="zone-stats">\n            <span>Meters: <strong>'+p+'</strong></span>\n            <span class="zone-leak-count">'+q+"</span>\n          </div>\n        ")
l=l.ga8(m)
q=l.$ti
A.x(l.a,l.b,q.i("~(1)?").a(new A.eR(r,a)),!1,q.c)
this.c.appendChild(m).toString},
$S:38}
A.eP.prototype={
$1(a){return J.r(J.l(t.P.a(a),"purok"),this.a)},
$S:1}
A.eQ.prototype={
$1(a){var s
t.P.a(a)
s=J.u(a)
return J.r(s.h(a,"purok"),this.a)&&J.r(s.h(a,"current_leak_status"),"leak")},
$S:1}
A.eR.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Z
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.k.sH(q,this.b)
if(p!=null)B.k.sH(p,"all")
this.a.a5("view-directory")},
$S:0}
A.f0.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j
t.P.a(a)
s=B.b.bP(this.b,new A.eN(a),new A.eO())
r=J.u(s)
q=r.gO(s)?r.h(s,"owner_name"):"Unknown Household"
p=document.createElement("div")
r=J.u(a)
p.className="log-card "+(J.r(r.h(a,"status_resolved"),!0)?"resolved":"pending")
o=A.bV(A.k(r.h(a,"date"))).aI()
n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
m=B.c.a4(A.aN(o),12)===0?12:B.c.a4(A.aN(o),12)
l=B.a.Y(B.c.j(A.by(o)),2,"0")
k=A.aN(o)>=12?"PM":"AM"
j=A.cl(o)-1
if(!(j>=0&&j<12))return A.b(n,j)
j=n[j]
J.aI(p,'            <div class="log-card-header">\n              <span>'+A.d(q)+'</span>\n              <span style="font-size:10px; color:var(--text-muted)">'+(j+" "+A.ck(o)+" "+m+":"+l+" "+k)+'</span>\n            </div>\n            <div class="log-card-desc">'+A.d(r.h(a,"description"))+"</div>\n          ")
this.c.appendChild(p).toString},
$S:4}
A.eN.prototype={
$1(a){var s="house_id"
return J.r(J.l(t.P.a(a),s),J.l(this.a,s))},
$S:1}
A.eO.prototype={
$0(){return A.bw(t.N,t.z)},
$S:39}
A.f2.prototype={
$1(a){var s,r,q,p,o
t.P.a(a)
s=J.u(a)
r=this.a
q=B.a.A(J.L(s.h(a,"owner_name")).toLowerCase(),r)||B.a.A(J.L(s.h(a,"account_number")).toLowerCase(),r)||B.a.A(J.L(s.h(a,"house_id")).toLowerCase(),r)
r=this.b
p=r==="all"||J.r(s.h(a,"purok"),r)
r=this.c
o=r==="all"||J.r(s.h(a,"current_leak_status"),r)
return q&&p&&o},
$S:1}
A.f3.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j="current_leak_status"
t.P.a(a)
s=document.createElement("div")
r=J.u(a)
s.className="household-card "+(J.r(r.h(a,j),"leak")?"has-leak":"")
q=A.d(r.h(a,"owner_name"))
p=A.d(r.h(a,"purok"))
o=A.d(r.h(a,"account_number"))
n=A.d(r.h(a,"current_m3_usage"))
m=A.d(r.h(a,j))
l=J.r(r.h(a,j),"leak")?'<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> Leak':'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Normal'
k=J.F(s)
k.sB(s,'          <div class="household-info">\n            <span class="household-name">'+q+'</span>\n            <div class="household-meta">\n              <span class="household-purok">'+p+'</span>\n              <span class="household-acct">'+o+'</span>\n            </div>\n            <div class="household-usage">Usage this Month: <strong>'+n+' m\xb3</strong></div>\n          </div>\n          <div class="household-status-section">\n            <span class="status-indicator '+m+'">\n              '+l+'\n            </span>\n            <span class="household-flow">Flow: <span>'+B.e.p(A.w(r.h(a,"flow_rate")),2)+" L/s</span></span>\n          </div>\n        ")
k=k.ga8(s)
r=k.$ti
A.x(k.a,k.b,r.i("~(1)?").a(new A.f1(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:4}
A.f1.prototype={
$1(a){t.V.a(a)
this.a.c_(A.k(J.l(this.b,"house_id")))},
$S:0}
A.fb.prototype={
$2(a,b){A.w(a)
A.w(b)
return a>b?a:b},
$S:40}
A.fc.prototype={
$1(a){var s,r,q,p
t.ek.a(a)
s=a.a
r=a.b
q=this.a.length
p=this.c
if(!(s>=0&&s<4))return A.b(p,s)
return A.C(["x",20+s/(q-1)*300,"y",80-r/this.b*60,"val",r,"label",p[s]],t.N,t.K)},
$S:41}
A.fd.prototype={
$1(a){var s
t.U.a(a)
s=J.u(a)
return B.e.p(A.w(s.h(a,"x")),1)+","+B.e.p(A.w(s.h(a,"y")),1)},
$S:9}
A.fe.prototype={
$1(a){var s
t.U.a(a)
s=J.u(a)
return"L "+B.e.p(A.w(s.h(a,"x")),1)+","+B.e.p(A.w(s.h(a,"y")),1)},
$S:9}
A.ff.prototype={
$1(a){var s,r
t.U.a(a)
s=this.a
r=J.u(a)
s.a=s.a+('        <text x="'+A.d(r.h(a,"x"))+'" y="96" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-weight="600">'+A.d(r.h(a,"label"))+'</text>\n        <line x1="'+A.d(r.h(a,"x"))+'" y1="'+A.d(r.h(a,"y"))+'" x2="'+A.d(r.h(a,"x"))+'" y2="80" stroke="rgba(249,115,22,0.2)" stroke-width="1" stroke-dasharray="2 2" />\n        <circle cx="'+A.d(r.h(a,"x"))+'" cy="'+A.d(r.h(a,"y"))+'" r="4" fill="var(--white)" stroke="'+this.b+'" stroke-width="2" />\n        <text x="'+A.d(r.h(a,"x"))+'" y="'+A.d(A.w(r.h(a,"y"))-8)+'" text-anchor="middle" fill="var(--navy-primary)" font-size="9" font-weight="700">'+A.d(r.h(a,"val"))+"m\xb3</text>\n      ")},
$S:43}
A.f4.prototype={
$1(a){return J.r(J.l(t.P.a(a),"house_id"),this.a)},
$S:1}
A.f5.prototype={
$1(a){var s,r,q,p,o,n,m,l,k="status_resolved"
t.P.a(a)
s=document.createElement("div")
r=J.u(a)
s.className="log-card "+(J.r(r.h(a,k),!0)?"resolved":"pending")
q=A.bV(A.k(r.h(a,"date"))).aI()
p=B.a.Y(B.c.j(A.aN(q)),2,"0")
o=B.a.Y(B.c.j(A.by(q)),2,"0")
n=A.d(r.h(a,"worker_id"))
m=A.d(r.h(a,"description"))
l=J.r(r.h(a,k),!0)?"var(--alert-green)":"var(--amber-safety)"
r=J.r(r.h(a,k),!0)?"Resolved (Flow Restored)":"In Progress (Active Monitoring)"
J.aI(s,'          <div class="log-card-header">\n            <span>Tech: <strong>'+n+'</strong></span>\n            <span style="font-size:10px; color:var(--text-muted)">'+(""+A.cl(q)+"/"+A.ck(q)+"/"+A.b6(q)+" @ "+p+":"+o)+'</span>\n          </div>\n          <div class="log-card-desc">'+m+'</div>\n          <div style="font-size: 9px; font-weight:700; color:'+l+'; margin-top:4px; text-transform:uppercase">\n            Status: '+r+"\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:4}
A.f6.prototype={
$1(a){var s
A.k(a)
s=a.length
if(s!==0){if(0>=s)return A.b(a,0)
s=a[0]}else s=""
return s},
$S:16}
A.f7.prototype={
$1(a){return J.r(J.l(t.P.a(a),"purok"),this.a.a.h(0,"selected_zone"))},
$S:1}
A.f8.prototype={
$1(a){var s,r="worker_id"
t.P.a(a)
s=J.u(a)
return J.r(s.h(a,r),this.a.a.h(0,r))&&J.r(s.h(a,"status_resolved"),!0)},
$S:1}
A.eE.prototype={
$1(a){return this.a.bl()},
$S:3}
A.eF.prototype={
$1(a){return this.a.bl()},
$S:3}
A.eG.prototype={
$1(a){return this.a.bd()},
$S:3}
A.eH.prototype={
$1(a){var s=t.b4.a(A.jH(t.V.a(a).target)),r=!1
if(s!=null)if(!B.f.A(this.a,s)){r=this.b
r=r!=null&&!J.iC(r,s)}if(r){r=this.b.style
r.display="none"}},
$S:0}
A.eI.prototype={
$1(a){t.V.a(a)
return this.a.cf()},
$S:0}
A.fi.prototype={
$1(a){var s,r
t.P.a(a)
s=J.u(a)
r=this.a
return B.a.A(J.L(s.h(a,"owner_name")).toLowerCase(),r)||B.a.A(J.L(s.h(a,"account_number")).toLowerCase(),r)},
$S:1}
A.fj.prototype={
$1(a){var s,r,q,p
t.P.a(a)
s=document.createElement("div")
s.className="search-result-item"
r=J.u(a)
q=J.F(s)
q.sW(s,A.d(r.h(a,"owner_name"))+" ("+A.d(r.h(a,"account_number"))+")")
q=q.ga8(s)
r=this.c
p=q.$ti
A.x(q.a,q.b,p.i("~(1)?").a(new A.fh(this.a,this.b,a,r)),!1,p.c)
r.appendChild(s).toString},
$S:4}
A.fh.prototype={
$1(a){var s,r,q,p=this
t.V.a(a)
s=p.c
r=J.u(s)
B.f.sH(p.b,A.d(r.h(s,"owner_name"))+" ("+A.d(r.h(s,"account_number"))+")")
q=p.d.style
q.display="none"
p.a.c3(A.ai(r.h(s,"house_id")))},
$S:0}
A.eM.prototype={
$1(a){var s,r,q,p,o,n,m,l="status"
t.P.a(a)
s=document.createElement("div")
r=J.u(a)
s.className="bill-record-card "+A.d(r.h(a,l))
q=A.bV(A.k(r.h(a,"date"))).aI()
p=B.a.Y(B.c.j(A.aN(q)),2,"0")
o=B.a.Y(B.c.j(A.by(q)),2,"0")
n=A.d(r.h(a,"billing_month"))
m=J.r(r.h(a,l),"Paid")?"var(--alert-green)":"var(--amber-safety)"
J.aI(s,'          <div class="bill-record-header">\n            <span>Cycle: '+n+'</span>\n            <span style="color:'+m+'">'+J.L(r.h(a,l)).toUpperCase()+'</span>\n          </div>\n          <div class="bill-record-details">\n            <span>Readings: '+B.e.p(A.w(r.h(a,"previous_reading")),1)+" \u2192 "+B.e.p(A.w(r.h(a,"current_reading")),1)+" m\xb3</span>\n            <strong>\u20b1"+B.e.p(A.w(r.h(a,"total_due")),2)+'</strong>\n          </div>\n          <div style="font-size:9px;color:var(--text-muted);margin-top:2px;display:flex;justify-content:space-between">\n            <span>'+(""+A.cl(q)+"/"+A.ck(q)+"/"+A.b6(q)+" "+p+":"+o)+" ("+A.d(r.h(a,"bill_id"))+")</span>\n            <span>Tech: "+A.d(r.h(a,"billed_by"))+"</span>\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:4}
A.fl.prototype={
$0(){J.af(this.a).v(0,"show")},
$S:2}
A.fk.prototype={
$1(a){return J.af(t.h.a(a)).v(0,"active")},
$S:5}
A.f9.prototype={
$1(a){return J.r(J.l(t.P.a(a),"billing_month"),"June 2026")},
$S:1}
A.fa.prototype={
$1(a){var s,r,q,p,o,n,m,l="status"
t.P.a(a)
s=document.createElement("div")
r=J.u(a)
s.className="bill-record-card "+A.d(r.h(a,l))
q=A.bV(A.k(r.h(a,"date"))).aI()
p=B.a.Y(B.c.j(A.aN(q)),2,"0")
o=B.a.Y(B.c.j(A.by(q)),2,"0")
n=A.d(r.h(a,"billing_month"))
m=J.r(r.h(a,l),"Paid")?"var(--alert-green)":"var(--amber-safety)"
J.aI(s,'        <div class="bill-record-header">\n          <span>Cycle: '+n+'</span>\n          <span style="color:'+m+'">'+J.L(r.h(a,l)).toUpperCase()+'</span>\n        </div>\n        <div class="bill-record-details">\n          <span>Usage: '+B.e.p(A.w(r.h(a,"previous_reading")),1)+" \u2192 "+B.e.p(A.w(r.h(a,"current_reading")),1)+" m\xb3 ("+B.e.p(A.w(r.h(a,"consumption")),1)+" m\xb3)</span>\n          <strong>\u20b1"+B.e.p(A.w(r.h(a,"total_due")),2)+'</strong>\n        </div>\n        <div style="font-size:9px;color:var(--text-muted);margin-top:2px;">\n          Bill Ref ID: '+A.d(r.h(a,"bill_id"))+" | Issued: "+(""+A.cl(q)+"/"+A.ck(q)+"/"+A.b6(q)+" "+p+":"+o)+"\n        </div>\n      ")
this.b.appendChild(s).toString},
$S:4}
A.ed.prototype={
$1(a){var s=this,r=s.b
if(s.a.value==="resident"){if(r!=null){r=r.style
r.display="block"}r=s.c
if(r!=null){r=r.style
r.display="none"}}else{if(r!=null){r=r.style
r.display="none"}r=s.c
if(r!=null){r=r.style
r.display="block"}}},
$S:3}
A.ee.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null)J.af(s).m(0,"active")},
$S:0}
A.ef.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null)J.af(s).v(0,"active")},
$S:0}
A.eg.prototype={
$1(b4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1=this,b2=null,b3="worker_id"
t.V.a(b4)
try{b=document
a=t.f
s=a.a(b.getElementById("reg-password"))
a0=s
if(a0==null)a1=b2
else{a0=a0.value
a0=a0==null?b2:B.a.J(a0)
a1=a0}r=a1==null?"":a1
if(J.W(r)===0){b1.a.C("Password is required!")
return}a0=b1.b
a0=a0==null?b2:a0.value
a2=t.Z
if(a0==="resident"){q=a.a(b.getElementById("reg-res-name"))
p=a2.a(b.getElementById("reg-res-purok"))
o=a.a(b.getElementById("reg-res-lot"))
b=q
if(b==null)g=b2
else{b=b.value
b=b==null?b2:B.a.J(b)
g=b}n=g==null?"":g
b=p
a3=b==null?b2:b.value
m=a3==null?"Purok 1":a3
b=o
if(b==null)a4=b2
else{b=b.value
b=b==null?b2:B.a.J(b)
a4=b}l=a4==null?"":a4
if(J.W(n)===0||J.W(l)===0){b1.a.C("Name and Lot are required!")
return}k=$.G().dq(n,m,l,r)
b=b1.a
a=J.l(k,"account_number")
b.C("Resident Registered: "+A.k(a==null?"":a))}else{j=a.a(b.getElementById("reg-work-name"))
i=a2.a(b.getElementById("reg-work-role"))
h=a2.a(b.getElementById("reg-work-zone"))
b=j
if(b==null)n=b2
else{b=b.value
b=b==null?b2:B.a.J(b)
n=b}g=n==null?"":n
b=i
a5=b==null?b2:b.value
f=a5==null?"Field Technician":a5
b=h
a6=b==null?b2:b.value
e=a6==null?"Purok 1":a6
if(J.W(g)===0){b1.a.C("Worker Name is required!")
return}b=$.G()
a=A.k(g)
a0=A.k(f)
a2=A.k(e)
a7=A.k(r)
a8=t.N
a9=A.C(["worker_id","EMP-"+(300+B.j.ae(900)),"name",a,"role",a0,"zone",a2],a8,a8)
a9.l(0,b3,a7.length!==0?a7:"EMP-"+(300+B.j.ae(900)))
B.b.m(b.d,a9)
b.a0("/api/workers/add",a9)
a=window.localStorage
a.toString
a.setItem("waterhall_workers",B.d.t(b.d))
d=a9
b=b1.a
a=J.l(d,b3)
b.C("Worker Registered: "+A.k(a==null?"":a))}a=b1.c
if(a!=null)J.af(a).v(0,"active")
if(b.b==="view-directory")b.a3()}catch(b0){c=A.ae(b0)
b1.a.C("Error: "+A.d(c))}},
$S:0}
A.fs.prototype={
aG(){var s=0,r=A.e3(t.y),q,p=2,o=[],n=this,m,l,k,j,i,h,g
var $async$aG=A.e5(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:p=4
s=7
return A.e_(A.iR("/api/all-data"),$async$aG)
case 7:m=b
j=t.P
l=j.a(B.d.T(0,m))
i=t.R
n.a=A.U(i.a(J.l(l,"households")),j)
n.b=A.cb(t.G.a(J.l(l,"centralAssets")),t.N,t.z)
n.c=A.U(i.a(J.l(l,"maintenanceLogs")),j)
n.d=A.U(i.a(J.l(l,"workers")),j)
n.e=A.U(i.a(J.l(l,"billingRecords")),j)
if(J.i0(l,"announcements")){j=A.U(i.a(J.l(l,"announcements")),j)
n.f=j
i=window.localStorage
i.toString
i.setItem("waterhall_announcements",B.d.t(j))}j=window.localStorage
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
A.cT("Database refreshed successfully from server.")
n.a6()
q=!0
s=1
break
p=2
s=6
break
case 4:p=3
g=o.pop()
k=A.ae(g)
A.cT("Error refreshing data from server: "+A.d(k))
q=!1
s=1
break
s=6
break
case 3:s=2
break
case 6:case 1:return A.e1(q,r)
case 2:return A.e0(o.at(-1),r)}})
return A.e2($async$aG,r)},
X(){var s=0,r=A.e3(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f
var $async$X=A.e5(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:if(n.r){s=1
break}j=window
j.toString
A.x(j,"online",t.fi.a(new A.fy(n)),!1,t.B)
p=4
s=7
return A.e_(A.iR("/api/all-data"),$async$X)
case 7:m=b
j=t.P
l=j.a(B.d.T(0,m))
i=t.R
n.a=A.U(i.a(J.l(l,"households")),j)
n.b=A.cb(t.G.a(J.l(l,"centralAssets")),t.N,t.z)
n.c=A.U(i.a(J.l(l,"maintenanceLogs")),j)
n.d=A.U(i.a(J.l(l,"workers")),j)
n.e=A.U(i.a(J.l(l,"billingRecords")),j)
if(J.i0(l,"announcements")){j=A.U(i.a(J.l(l,"announcements")),j)
n.f=j
i=window.localStorage
i.toString
i.setItem("waterhall_announcements",B.d.t(j))}j=window.localStorage
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
A.cT("Database successfully synchronized with SQLite backend.")
n.a6()
p=2
s=6
break
case 4:p=3
f=o.pop()
k=A.ae(f)
A.cT("Error fetching database from server, using local fallback: "+A.d(k))
if(window.localStorage.getItem("waterhall_households")==null){j=window.localStorage
j.toString
j.setItem("waterhall_households",B.d.t($.ku()))}if(window.localStorage.getItem("waterhall_central_assets")==null){j=window.localStorage
j.toString
j.setItem("waterhall_central_assets",B.d.t($.n8))}if(window.localStorage.getItem("waterhall_maintenance_logs")==null){j=window.localStorage
j.toString
j.setItem("waterhall_maintenance_logs",B.d.t($.n9))}if(window.localStorage.getItem("waterhall_workers")==null){j=window.localStorage
j.toString
j.setItem("waterhall_workers",B.d.t($.na))}if(window.localStorage.getItem("waterhall_billing_records")==null){j=window.localStorage
j.toString
j.setItem("waterhall_billing_records",B.d.t($.kt()))}if(window.localStorage.getItem("waterhall_announcements")==null){j=window.localStorage
j.toString
j.setItem("waterhall_announcements",B.d.t([]))}j=window.localStorage.getItem("waterhall_households")
j.toString
i=t.R
g=t.P
n.a=A.U(i.a(B.d.T(0,j)),g)
j=window.localStorage.getItem("waterhall_central_assets")
j.toString
n.b=A.cb(t.G.a(B.d.T(0,j)),t.N,t.z)
j=window.localStorage.getItem("waterhall_maintenance_logs")
j.toString
n.c=A.U(i.a(B.d.T(0,j)),g)
j=window.localStorage.getItem("waterhall_workers")
j.toString
n.d=A.U(i.a(B.d.T(0,j)),g)
j=window.localStorage.getItem("waterhall_billing_records")
j.toString
n.e=A.U(i.a(B.d.T(0,j)),g)
if(window.localStorage.getItem("waterhall_announcements")!=null){j=window.localStorage.getItem("waterhall_announcements")
j.toString
n.f=A.U(i.a(B.d.T(0,j)),g)}n.r=!0
s=6
break
case 3:s=2
break
case 6:case 1:return A.e1(q,r)
case 2:return A.e0(o.at(-1),r)}})
return A.e2($async$X,r)},
bv(){var s,r,q,p=window.localStorage.getItem("waterhall_unsynced_actions")
if(p==null)return A.q([],t.t)
try{s=t.j.a(B.d.T(0,p))
r=J.iE(s,new A.ft(),t.P)
r=A.b4(r,r.$ti.i("V.E"))
return r}catch(q){r=A.q([],t.t)
return r}},
bz(a){var s
t.D.a(a)
s=window.localStorage
s.toString
s.setItem("waterhall_unsynced_actions",B.d.t(a))},
a0(a,b){var s
t.P.a(b)
s=this.bv()
B.b.m(s,A.C(["path",a,"data",b],t.N,t.z))
this.bz(s)
this.a6()},
a6(){var s=0,r=A.e3(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$a6=A.e5(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:if(n.w){s=1
break}n.w=!0
g=n.bv()
f=g.length
if(f===0){n.w=!1
s=1
break}A.cT("Found "+f+" unsynced offline operations. Starting auto-upload...")
m=A.U(g,t.P)
f=g.length,e=t.N,d=t.G,c=t.z,b=0
case 3:if(!(b<g.length)){s=5
break}l=g[b]
k=A.k(J.l(l,"path"))
j=A.cb(d.a(J.l(l,"data")),e,c)
p=7
a=B.d.t(j)
s=10
return A.e_(A.iS(k,"POST",null,A.C(["Content-Type","application/json"],e,e),a,null),$async$a6)
case 10:i=a3
if(i.status===200){J.kA(m,l)
A.hZ("Successfully uploaded offline record for "+A.d(k))}else{A.hZ("Sync failed for "+A.d(k)+" with status: "+A.d(i.status)+". Postponing sync.")
s=5
break}p=2
s=9
break
case 7:p=6
a1=o.pop()
h=A.ae(a1)
f=A.d(k)
e=A.d(h)
A.hZ("Network error sync for "+f+": "+e+". Node remains offline.")
s=5
break
s=9
break
case 6:s=2
break
case 9:case 4:g.length===f||(0,A.i_)(g),++b
s=3
break
case 5:n.bz(m)
n.w=!1
case 1:return A.e1(q,r)
case 2:return A.e0(o.at(-1),r)}})
return A.e2($async$a6,r)},
aa(a){var s,r,q=this.a
try{s=J.e8(q,new A.fw(a))
return s}catch(r){return null}},
c6(a,b){var s,r="flow_rate",q="leak_detected_at",p=this.a,o=B.b.df(p,new A.fB(a))
if(o!==-1){if(!(o>=0&&o<p.length))return A.b(p,o)
J.au(p[o],"current_leak_status",b)
s=p.length
if(b==="leak"){if(!(o<s))return A.b(p,o)
J.au(p[o],r,0.75+B.j.bZ()*0.5)
if(!(o<p.length))return A.b(p,o)
J.au(p[o],q,new A.a5(Date.now(),0,!1).aj().ai())}else{if(!(o<s))return A.b(p,o)
J.au(p[o],r,0.01+B.j.bZ()*0.09)
if(!(o<p.length))return A.b(p,o)
J.au(p[o],q,null)}if(!(o<p.length))return A.b(p,o)
this.a0("/api/households/update",p[o])
s=window.localStorage
s.toString
s.setItem("waterhall_households",B.d.t(p))
if(!(o<p.length))return A.b(p,o)
return p[o]}return null},
be(a){var s,r,q,p="ph_status",o="turbidity_status",n="turbidity_desc"
t.P.a(a)
s=this.b
a.q(0,new A.fA(s))
s.l(0,"last_updated",new A.a5(Date.now(),0,!1).aj().ai())
r=A.w(s.h(0,"ph_level"))
q=r<6.5
if(q||r>8.5){s.l(0,p,"warning")
s.l(0,"ph_desc",q?"Acidic pH. Check lime feeder.":"Alkaline pH. Run acid neutralizing wash.")}else{s.l(0,p,"normal")
s.l(0,"ph_desc","pH levels normal.")}if(A.w(s.h(0,"turbidity"))>5){s.l(0,o,"warning")
s.l(0,n,"Elevated turbidity. Check backwash filters.")}else{s.l(0,o,"normal")
s.l(0,n,"Turbidity levels normal.")}this.a0("/api/central-assets/update",s)
q=window.localStorage
q.toString
q.setItem("waterhall_central_assets",B.d.t(s))
return s},
bI(a){var s,r,q
t.P.a(a)
s=this.c
r=A.bw(t.N,t.z)
r.l(0,"task_id","LOG-"+(1000+B.j.ae(9000)))
r.l(0,"date",new A.a5(Date.now(),0,!1).aj().ai())
r.R(0,a)
B.b.b4(s,0,r)
this.a0("/api/maintenance-logs/add",r)
q=window.localStorage
q.toString
q.setItem("waterhall_maintenance_logs",B.d.t(s))
return r},
c9(a,b){var s,r,q,p="password",o=this.a
try{s=J.e8(o,new A.fC(a))
if(J.l(s,p)==null||J.r(J.l(s,p),"")){J.au(s,p,b)
this.a0("/api/households/update",s)
r=window.localStorage
r.toString
r.setItem("waterhall_households",B.d.t(o))
return s}else if(J.r(J.l(s,p),b))return s
return null}catch(q){return null}},
bg(a,b,c){var s,r,q,p
try{s=B.b.bO(this.d,new A.fD(a,b))
q=A.iZ(t.N,t.z)
q.R(0,s)
r=q
J.au(r,"selected_zone",c)
return r}catch(p){return null}},
aL(a){var s=this.e,r=A.K(s),q=r.i("N<1>"),p=A.b4(new A.N(s,r.i("E(1)").a(new A.fu(a)),q),q.i("j.E"))
B.b.cg(p,new A.fv())
return p},
bS(a,b){return B.b.ao(this.e,new A.fx(a,b))},
cd(){var s=this.f
if(s.length===0)return null
return B.b.gbN(s)},
dq(a,b,c,d){var s,r,q=this.a
if(B.b.ao(q,new A.fz(b,c)))throw A.c(A.iQ("Lot "+c+" in "+b+" is already registered."))
s=A.C(["house_id","HH-"+(1000+B.j.ae(9000)),"account_number","TAG-2026-"+B.c.j(1000+B.j.ae(9000)),"owner_name",a,"purok",b,"lot",c,"password",d,"monthly_consumption_m3",0,"status","Normal","total_due",0],t.N,t.K)
B.b.m(q,s)
this.a0("/api/households/add",s)
r=window.localStorage
r.toString
r.setItem("waterhall_households",B.d.t(q))
return s}}
A.fy.prototype={
$1(a){A.cT("Network connection restored. Processing offline actions...")
this.a.a6()},
$S:3}
A.ft.prototype={
$1(a){return A.cb(t.G.a(a),t.N,t.z)},
$S:44}
A.fw.prototype={
$1(a){return J.r(J.l(t.P.a(a),"house_id"),this.a)},
$S:1}
A.fB.prototype={
$1(a){return J.r(J.l(t.P.a(a),"house_id"),this.a)},
$S:1}
A.fA.prototype={
$2(a,b){this.a.l(0,A.k(a),b)},
$S:45}
A.fC.prototype={
$1(a){var s,r,q,p
t.P.a(a)
r=J.u(a)
q=A.d(r.h(a,"purok"))
p=r.h(a,"lot")
s=B.a.J((q+" "+A.d(p==null?"":p)).toLowerCase())
q=this.a
return J.r(s,B.a.J(q.toLowerCase()))||J.L(r.h(a,"account_number")).toLowerCase()===B.a.J(q.toLowerCase())},
$S:1}
A.fD.prototype={
$1(a){var s
t.P.a(a)
s=J.u(a)
return J.L(s.h(a,"name")).toLowerCase()===B.a.J(this.a.toLowerCase())&&J.L(s.h(a,"worker_id")).toLowerCase()===B.a.J(this.b.toLowerCase())},
$S:1}
A.fu.prototype={
$1(a){return J.r(J.l(t.P.a(a),"house_id"),this.a)},
$S:1}
A.fv.prototype={
$2(a,b){var s=t.P
s.a(a)
return A.bV(A.k(J.l(s.a(b),"date"))).a7(0,A.bV(A.k(J.l(a,"date"))))},
$S:46}
A.fx.prototype={
$1(a){var s
t.P.a(a)
s=J.u(a)
return J.r(s.h(a,"house_id"),this.a)&&J.L(s.h(a,"billing_month")).toLowerCase()===this.b.toLowerCase()},
$S:1}
A.fz.prototype={
$1(a){var s
t.P.a(a)
s=J.u(a)
return J.r(s.h(a,"purok"),this.a)&&J.r(s.h(a,"lot"),this.b)},
$S:1};(function aliases(){var s=J.c3.prototype
s.ci=s.j
s=J.aL.prototype
s.ck=s.j
s=A.D.prototype
s.cl=s.aN
s=A.j.prototype
s.cj=s.aJ
s=A.y.prototype
s.aP=s.S
s=A.cF.prototype
s.cm=s.a2})();(function installTearOffs(){var s=hunkHelpers._static_1,r=hunkHelpers._static_0,q=hunkHelpers.installInstanceTearOff,p=hunkHelpers.installStaticTearOff
s(A,"mN","lk",6)
s(A,"mO","ll",6)
s(A,"mP","lm",6)
r(A,"jT","mG",2)
q(A.cx.prototype,"gd1",0,1,null,["$2","$1"],["aC","bM"],25,0,0)
s(A,"mR","ma",13)
p(A,"mX",4,null,["$4"],["lo"],17,0)
p(A,"mY",4,null,["$4"],["lp"],17,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.v,null)
q(A.v,[A.i8,J.c3,A.cn,J.aT,A.H,A.D,A.fY,A.j,A.b2,A.ce,A.cu,A.bt,A.ba,A.B,A.bT,A.h1,A.fW,A.c_,A.cG,A.aJ,A.fP,A.c9,A.ca,A.de,A.ht,A.an,A.dI,A.hB,A.cH,A.dz,A.ag,A.cx,A.bc,A.Q,A.dA,A.cq,A.dU,A.cP,A.aa,A.dM,A.bf,A.ac,A.cd,A.aV,A.d2,A.hr,A.hE,A.a5,A.bX,A.dj,A.co,A.hd,A.ax,A.aD,A.X,A.dV,A.Z,A.cM,A.h3,A.dS,A.fr,A.i6,A.cz,A.be,A.aq,A.ci,A.cF,A.dW,A.aY,A.dD,A.dR,A.cO,A.ho,A.ec,A.fs])
q(J.c3,[J.dc,J.c5,J.a_,J.bu,J.bv,J.c6,J.b0])
q(J.a_,[J.aL,J.O,A.cf,A.A,A.dC,A.d4,A.bW,A.d5,A.e,A.bx,A.dO,A.dT,A.dY])
q(J.aL,[J.dk,J.bF,J.az])
r(J.db,A.cn)
r(J.fL,J.O)
q(J.c6,[J.c4,J.dd])
q(A.H,[A.c8,A.aF,A.df,A.dv,A.dp,A.dH,A.c7,A.cV,A.aj,A.ct,A.du,A.bB,A.d1])
q(A.D,[A.bG,A.bK,A.a1])
r(A.d0,A.bG)
q(A.j,[A.t,A.b5,A.N])
q(A.t,[A.V,A.b1,A.aC])
q(A.V,[A.cr,A.a0,A.dN,A.dL])
r(A.bY,A.b5)
q(A.B,[A.bH,A.aB,A.dK,A.dB])
r(A.b3,A.bH)
r(A.bU,A.bT)
r(A.cj,A.aF)
q(A.aJ,[A.cZ,A.d_,A.dt,A.hT,A.hV,A.h9,A.h8,A.hJ,A.hm,A.h_,A.hv,A.fS,A.fF,A.fG,A.fH,A.fI,A.fK,A.hc,A.fV,A.fU,A.hw,A.hx,A.hy,A.fq,A.hX,A.eJ,A.eK,A.ej,A.ei,A.ek,A.el,A.ev,A.ew,A.ex,A.eh,A.ey,A.ez,A.eA,A.eB,A.eC,A.em,A.en,A.eo,A.ep,A.eq,A.er,A.es,A.et,A.eu,A.eD,A.fg,A.fm,A.eW,A.eX,A.eV,A.eY,A.eU,A.eS,A.eT,A.f_,A.eP,A.eQ,A.eR,A.f0,A.eN,A.f2,A.f3,A.f1,A.fc,A.fd,A.fe,A.ff,A.f4,A.f5,A.f6,A.f7,A.f8,A.eE,A.eF,A.eG,A.eH,A.eI,A.fi,A.fj,A.fh,A.eM,A.fk,A.f9,A.fa,A.ed,A.ee,A.ef,A.eg,A.fy,A.ft,A.fw,A.fB,A.fC,A.fD,A.fu,A.fx,A.fz])
q(A.dt,[A.dq,A.br])
q(A.d_,[A.fM,A.hU,A.hK,A.hO,A.hn,A.fQ,A.fT,A.hs,A.h5,A.h4,A.fJ,A.fZ,A.hI,A.fn,A.eZ,A.fb,A.fA,A.fv])
r(A.aE,A.cf)
r(A.cC,A.aE)
r(A.cD,A.cC)
r(A.aM,A.cD)
q(A.aM,[A.di,A.cg])
r(A.bL,A.dH)
q(A.cZ,[A.ha,A.hb,A.hA,A.hz,A.he,A.hi,A.hh,A.hg,A.hf,A.hl,A.hk,A.hj,A.h0,A.hu,A.hN,A.hG,A.hF,A.eL,A.eO,A.fl])
r(A.cw,A.cx)
r(A.dQ,A.cP)
q(A.aa,[A.cE,A.d3])
r(A.cA,A.cE)
r(A.cL,A.cd)
r(A.bI,A.cL)
q(A.aV,[A.cY,A.d6,A.dg])
q(A.d2,[A.fp,A.fO,A.fN,A.h6])
r(A.dh,A.c7)
r(A.hq,A.hr)
r(A.dy,A.d6)
q(A.aj,[A.bz,A.d9])
r(A.dE,A.cM)
q(A.A,[A.m,A.c1,A.cv])
q(A.m,[A.y,A.ap,A.aX,A.bJ])
q(A.y,[A.f,A.h])
q(A.f,[A.bp,A.cU,A.bq,A.aU,A.bs,A.d8,A.b_,A.b8,A.cs,A.dr,A.ds,A.bD,A.b9])
r(A.aW,A.dC)
r(A.c0,A.aX)
r(A.ak,A.c1)
q(A.e,[A.ao,A.am])
r(A.a7,A.ao)
r(A.dP,A.dO)
r(A.ch,A.dP)
r(A.cp,A.dT)
r(A.dZ,A.dY)
r(A.cB,A.dZ)
r(A.dF,A.dB)
q(A.d3,[A.dG,A.cX])
r(A.cy,A.cq)
r(A.bb,A.cy)
r(A.dX,A.cF)
r(A.bA,A.h)
s(A.bG,A.ba)
s(A.cC,A.D)
s(A.cD,A.bt)
s(A.bH,A.ac)
s(A.cL,A.ac)
s(A.dC,A.fr)
s(A.dO,A.D)
s(A.dP,A.aq)
s(A.dT,A.B)
s(A.dY,A.D)
s(A.dZ,A.aq)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{i:"int",bj:"double",Y:"num",a:"String",E:"bool",X:"Null",I:"List",v:"Object",p:"Map",o:"JSObject"},mangledNames:{},types:["~(a7)","E(p<a,@>)","~()","~(e)","~(p<a,@>)","~(y)","~(~())","X()","E(a)","a(p<a,v>)","~(v?,v?)","@()","i(a?)","@(@)","~(a,a)","E(al)","a(a)","E(y,a,a,be)","X(@)","X(~())","X(v,as)","~(am)","~(i,@)","~(@,@)","p<a,a>(p<a,a>,a)","~(v[as?])","~(m,m?)","E(ar<a>)","X(e)","~(bE)","ay<~>(bE)","@(@,a)","0&(a,i?)","@(a)","E(m)","~(@)","~(p<a,a>)","~(i,a)","~(a)","p<a,@>()","Y(Y,Y)","p<a,v>(aD<i,Y>)","a(ak)","~(p<a,v>)","p<a,@>(@)","~(a,@)","i(p<a,@>,p<a,@>)","~(a,y)","X(@,as)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.lI(v.typeUniverse,JSON.parse('{"dk":"aL","bF":"aL","az":"aL","nf":"e","nv":"e","ne":"h","nw":"h","nS":"am","ng":"f","ny":"f","nB":"m","nt":"m","nO":"aX","nz":"a7","ni":"ao","nu":"a_","nh":"ap","nD":"ap","nx":"y","dc":{"E":[],"ab":[]},"c5":{"ab":[]},"a_":{"o":[]},"aL":{"o":[]},"O":{"I":["1"],"t":["1"],"o":[],"j":["1"]},"db":{"cn":[]},"fL":{"O":["1"],"I":["1"],"t":["1"],"o":[],"j":["1"]},"aT":{"a6":["1"]},"c6":{"bj":[],"Y":[]},"c4":{"bj":[],"i":[],"Y":[],"ab":[]},"dd":{"bj":[],"Y":[],"ab":[]},"b0":{"a":[],"fX":[],"ab":[]},"c8":{"H":[]},"d0":{"D":["i"],"ba":["i"],"I":["i"],"t":["i"],"j":["i"],"D.E":"i","ba.E":"i"},"t":{"j":["1"]},"V":{"t":["1"],"j":["1"]},"cr":{"V":["1"],"t":["1"],"j":["1"],"V.E":"1","j.E":"1"},"b2":{"a6":["1"]},"b5":{"j":["2"],"j.E":"2"},"bY":{"b5":["1","2"],"t":["2"],"j":["2"],"j.E":"2"},"ce":{"a6":["2"]},"a0":{"V":["2"],"t":["2"],"j":["2"],"V.E":"2","j.E":"2"},"N":{"j":["1"],"j.E":"1"},"cu":{"a6":["1"]},"bG":{"D":["1"],"ba":["1"],"I":["1"],"t":["1"],"j":["1"]},"dN":{"V":["i"],"t":["i"],"j":["i"],"V.E":"i","j.E":"i"},"b3":{"B":["i","1"],"ac":["i","1"],"p":["i","1"],"B.K":"i","B.V":"1","ac.K":"i","ac.V":"1"},"bT":{"p":["1","2"]},"bU":{"bT":["1","2"],"p":["1","2"]},"cj":{"aF":[],"H":[]},"df":{"H":[]},"dv":{"H":[]},"cG":{"as":[]},"aJ":{"aZ":[]},"cZ":{"aZ":[]},"d_":{"aZ":[]},"dt":{"aZ":[]},"dq":{"aZ":[]},"br":{"aZ":[]},"dp":{"H":[]},"aB":{"B":["1","2"],"iY":["1","2"],"p":["1","2"],"B.K":"1","B.V":"2"},"b1":{"t":["1"],"j":["1"],"j.E":"1"},"c9":{"a6":["1"]},"aC":{"t":["1"],"j":["1"],"j.E":"1"},"ca":{"a6":["1"]},"de":{"l6":[],"fX":[]},"cf":{"o":[]},"aE":{"aA":["1"],"o":[]},"aM":{"D":["i"],"aE":["i"],"I":["i"],"aA":["i"],"t":["i"],"o":[],"j":["i"],"bt":["i"]},"di":{"aM":[],"D":["i"],"aE":["i"],"I":["i"],"aA":["i"],"t":["i"],"o":[],"j":["i"],"bt":["i"],"ab":[],"D.E":"i"},"cg":{"aM":[],"ie":[],"D":["i"],"aE":["i"],"I":["i"],"aA":["i"],"t":["i"],"o":[],"j":["i"],"bt":["i"],"ab":[],"D.E":"i"},"dH":{"H":[]},"bL":{"aF":[],"H":[]},"cH":{"bE":[]},"ag":{"H":[]},"cw":{"cx":["1"]},"Q":{"ay":["1"]},"cP":{"jj":[]},"dQ":{"cP":[],"jj":[]},"cA":{"aa":["1"],"ar":["1"],"t":["1"],"j":["1"],"aa.E":"1"},"bf":{"a6":["1"]},"D":{"I":["1"],"t":["1"],"j":["1"]},"B":{"p":["1","2"]},"bH":{"B":["1","2"],"ac":["1","2"],"p":["1","2"]},"cd":{"p":["1","2"]},"bI":{"cL":["1","2"],"cd":["1","2"],"ac":["1","2"],"p":["1","2"],"ac.K":"1","ac.V":"2"},"aa":{"ar":["1"],"t":["1"],"j":["1"]},"cE":{"aa":["1"],"ar":["1"],"t":["1"],"j":["1"]},"dK":{"B":["a","@"],"p":["a","@"],"B.K":"a","B.V":"@"},"dL":{"V":["a"],"t":["a"],"j":["a"],"V.E":"a","j.E":"a"},"cY":{"aV":["I<i>","a"]},"d6":{"aV":["a","I<i>"]},"c7":{"H":[]},"dh":{"H":[]},"dg":{"aV":["v?","a"]},"dy":{"aV":["a","I<i>"]},"bj":{"Y":[]},"i":{"Y":[]},"I":{"t":["1"],"j":["1"]},"ar":{"t":["1"],"j":["1"]},"a":{"fX":[]},"cV":{"H":[]},"aF":{"H":[]},"aj":{"H":[]},"bz":{"H":[]},"d9":{"H":[]},"ct":{"H":[]},"du":{"H":[]},"bB":{"H":[]},"d1":{"H":[]},"dj":{"H":[]},"co":{"H":[]},"dV":{"as":[]},"Z":{"la":[]},"cM":{"dw":[]},"dS":{"dw":[]},"dE":{"dw":[]},"y":{"m":[],"A":[],"o":[]},"e":{"o":[]},"ak":{"A":[],"o":[]},"a7":{"e":[],"o":[]},"m":{"A":[],"o":[]},"am":{"e":[],"o":[]},"be":{"al":[]},"f":{"y":[],"m":[],"A":[],"o":[]},"bp":{"f":[],"y":[],"m":[],"A":[],"o":[]},"cU":{"f":[],"y":[],"m":[],"A":[],"o":[]},"bq":{"f":[],"y":[],"m":[],"A":[],"o":[]},"aU":{"f":[],"y":[],"m":[],"A":[],"o":[]},"bs":{"f":[],"y":[],"m":[],"A":[],"o":[]},"ap":{"m":[],"A":[],"o":[]},"aW":{"o":[]},"aX":{"m":[],"A":[],"o":[]},"d4":{"o":[]},"bW":{"o":[]},"d5":{"o":[]},"bK":{"D":["1"],"I":["1"],"t":["1"],"j":["1"],"D.E":"1"},"A":{"o":[]},"d8":{"f":[],"y":[],"m":[],"A":[],"o":[]},"c0":{"m":[],"A":[],"o":[]},"c1":{"A":[],"o":[]},"b_":{"j5":[],"iL":[],"f":[],"y":[],"m":[],"A":[],"o":[]},"bx":{"o":[]},"a1":{"D":["m"],"I":["m"],"t":["m"],"j":["m"],"D.E":"m"},"ch":{"D":["m"],"aq":["m"],"I":["m"],"aA":["m"],"t":["m"],"o":[],"j":["m"],"D.E":"m","aq.E":"m"},"b8":{"f":[],"y":[],"m":[],"A":[],"o":[]},"cp":{"B":["a","a"],"o":[],"p":["a","a"],"B.K":"a","B.V":"a"},"cs":{"f":[],"y":[],"m":[],"A":[],"o":[]},"dr":{"f":[],"y":[],"m":[],"A":[],"o":[]},"ds":{"f":[],"y":[],"m":[],"A":[],"o":[]},"bD":{"f":[],"y":[],"m":[],"A":[],"o":[]},"b9":{"f":[],"y":[],"m":[],"A":[],"o":[]},"ao":{"e":[],"o":[]},"cv":{"h7":[],"A":[],"o":[]},"bJ":{"m":[],"A":[],"o":[]},"cB":{"D":["m"],"aq":["m"],"I":["m"],"aA":["m"],"t":["m"],"o":[],"j":["m"],"D.E":"m","aq.E":"m"},"dB":{"B":["a","a"],"p":["a","a"]},"dF":{"B":["a","a"],"p":["a","a"],"B.K":"a","B.V":"a"},"dG":{"aa":["a"],"ar":["a"],"t":["a"],"j":["a"],"aa.E":"a"},"cy":{"cq":["1"]},"bb":{"cy":["1"],"cq":["1"]},"cz":{"l9":["1"]},"ci":{"al":[]},"cF":{"al":[]},"dX":{"al":[]},"dW":{"al":[]},"aY":{"a6":["1"]},"dD":{"h7":[],"A":[],"o":[]},"dR":{"lf":[]},"cO":{"l_":[]},"d3":{"aa":["a"],"ar":["a"],"t":["a"],"j":["a"]},"bA":{"h":[],"y":[],"m":[],"A":[],"o":[]},"cX":{"aa":["a"],"ar":["a"],"t":["a"],"j":["a"],"aa.E":"a"},"h":{"y":[],"m":[],"A":[],"o":[]},"kQ":{"I":["i"],"t":["i"],"j":["i"]},"ie":{"I":["i"],"t":["i"],"j":["i"]}}'))
A.lH(v.typeUniverse,JSON.parse('{"t":1,"bG":1,"aE":1,"bH":2,"cE":1,"d2":2}'))
var u={f:"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u03f6\x00\u0404\u03f4 \u03f4\u03f6\u01f6\u01f6\u03f6\u03fc\u01f4\u03ff\u03ff\u0584\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u05d4\u01f4\x00\u01f4\x00\u0504\u05c4\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0400\x00\u0400\u0200\u03f7\u0200\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0200\u0200\u0200\u03f7\x00",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.e7
return{u:s("ag"),cR:s("bq"),c:s("aU"),dy:s("a5"),gw:s("t<@>"),h:s("y"),Q:s("H"),B:s("e"),Y:s("aZ"),bo:s("ak"),eh:s("j<m>"),R:s("j<@>"),hb:s("j<i>"),gE:s("O<p<a,a>>"),t:s("O<p<a,@>>"),k:s("O<al>"),s:s("O<a>"),gn:s("O<@>"),b:s("O<i>"),T:s("c5"),m:s("o"),r:s("az"),aU:s("aA<@>"),ey:s("b3<a>"),D:s("I<p<a,@>>"),j:s("I<@>"),L:s("I<i>"),bj:s("I<Y>"),d:s("bx"),ek:s("aD<i,Y>"),by:s("p<a,y>"),U:s("p<a,v>"),J:s("p<a,a>"),P:s("p<a,@>"),G:s("p<@,@>"),e:s("a0<a,a>"),V:s("a7"),eB:s("aM"),A:s("m"),w:s("al"),a:s("X"),K:s("v"),x:s("am"),gT:s("nA"),ew:s("bA"),cq:s("ar<a>"),l:s("as"),N:s("a"),dG:s("a(a)"),g7:s("h"),aW:s("bD"),p:s("bE"),dm:s("ab"),eK:s("aF"),ak:s("bF"),dw:s("bI<a,a>"),dD:s("dw"),ci:s("h7"),gD:s("cw<ak>"),h9:s("bJ"),ac:s("a1"),E:s("bb<e>"),C:s("bb<a7>"),cD:s("bK<y>"),ao:s("Q<ak>"),_:s("Q<@>"),fJ:s("Q<i>"),cr:s("be"),y:s("E"),al:s("E(v)"),i:s("bj"),z:s("@"),fO:s("@()"),v:s("@(v)"),W:s("@(v,as)"),bU:s("@(ar<a>)"),S:s("i"),q:s("bs?"),I:s("iL?"),b4:s("y?"),ch:s("A?"),eH:s("ay<X>?"),dg:s("f?"),f:s("b_?"),an:s("o?"),bM:s("I<@>?"),X:s("v?"),O:s("j5?"),Z:s("b8?"),dk:s("a?"),o:s("b9?"),F:s("bc<@,@>?"),g:s("dM?"),fQ:s("E?"),fW:s("bj?"),bw:s("@(e)?"),h6:s("i?"),cg:s("Y?"),g5:s("~()?"),fi:s("~(e)?"),h2:s("~(a7)?"),gx:s("~(am)?"),n:s("Y"),H:s("~"),M:s("~()"),eA:s("~(a,a)"),cA:s("~(a,@)"),cB:s("~(bE)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.A=A.bp.prototype
B.q=A.aU.prototype
B.m=A.aW.prototype
B.J=A.bW.prototype
B.v=A.c0.prototype
B.L=A.ak.prototype
B.f=A.b_.prototype
B.M=J.c3.prototype
B.b=J.O.prototype
B.c=J.c4.prototype
B.e=J.c6.prototype
B.a=J.b0.prototype
B.N=J.az.prototype
B.O=J.a_.prototype
B.x=A.cg.prototype
B.y=J.dk.prototype
B.k=A.b8.prototype
B.i=A.cp.prototype
B.z=A.cs.prototype
B.n=A.b9.prototype
B.p=J.bF.prototype
B.a_=new A.fp()
B.B=new A.cY()
B.r=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.C=function() {
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
B.H=function(getTagFallback) {
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
B.D=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.G=function(hooks) {
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
B.F=function(hooks) {
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
B.E=function(hooks) {
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
B.t=function(hooks) { return hooks; }

B.d=new A.dg()
B.I=new A.dj()
B.a0=new A.fY()
B.u=new A.dy()
B.j=new A.ho()
B.h=new A.dQ()
B.l=new A.dV()
B.K=new A.bX(0)
B.P=new A.fN(null)
B.Q=new A.fO(null)
B.R=s([],t.s)
B.w=s(["bind","if","ref","repeat","syntax"],t.s)
B.o=s(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"],t.s)
B.S=s(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"],t.s)
B.T=s(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"],t.s)
B.V={}
B.U=new A.bU(B.V,[],A.e7("bU<a,a>"))
B.W=A.iz("kQ")
B.X=A.iz("v")
B.Y=A.iz("ie")
B.Z=new A.h6(!1)})();(function staticFields(){$.hp=null
$.ad=A.q([],A.e7("O<v>"))
$.j0=null
$.iJ=null
$.iI=null
$.jX=null
$.jS=null
$.k0=null
$.hQ=null
$.hW=null
$.iw=null
$.bO=null
$.cQ=null
$.cR=null
$.is=!1
$.J=B.h
$.aK=null
$.i5=null
$.iP=null
$.iO=null
$.dJ=A.bw(t.N,t.Y)
$.na=function(){var s=t.N,r=t.z
return A.q([A.C(["worker_id","EMP-301","name","Michael Balaga","role","Lead Field Tech","zone","Purok 1"],s,r),A.C(["worker_id","EMP-304","name","Ryiel Banggat","role","Field Technician","zone","Purok 2"],s,r),A.C(["worker_id","EMP-308","name","John Dave Chicote","role","Zone Inspector","zone","Purok 5"],s,r)],t.t)}()
$.n8=A.C(["main_tank_level",68,"ph_level",5.8,"ph_status","warning","ph_desc","Acidic pH detected. Add neutralizing agent.","turbidity",6.2,"turbidity_status","warning","turbidity_desc","Slightly high turbidity. Filter check recommended.","last_updated","2026-06-25T11:00:00Z"],t.N,t.z)
$.n9=function(){var s=t.N,r=t.z
return A.q([A.C(["task_id","LOG-1001","house_id","HH-102","worker_id","EMP-304","purok","Purok 1","description","Replaced main brass pipe fitting. Leak resolved.","date","2026-06-23T09:30:00Z","status_resolved",!0],s,r),A.C(["task_id","LOG-1002","house_id","HH-104","worker_id","EMP-304","purok","Purok 2","description","Inspected meter calibration. Flow rate verified normal.","date","2026-06-24T14:20:00Z","status_resolved",!0],s,r)],t.t)}()})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"nm","k6",()=>A.jW("_$dart_dartClosure"))
s($,"nl","k5",()=>A.jW("_$dart_dartClosure_dartJSInterop"))
s($,"nX","ks",()=>A.q([new J.db()],A.e7("O<cn>")))
s($,"nE","kc",()=>A.aG(A.h2({
toString:function(){return"$receiver$"}})))
s($,"nF","kd",()=>A.aG(A.h2({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"nG","ke",()=>A.aG(A.h2(null)))
s($,"nH","kf",()=>A.aG(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nK","ki",()=>A.aG(A.h2(void 0)))
s($,"nL","kj",()=>A.aG(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nJ","kh",()=>A.aG(A.jd(null)))
s($,"nI","kg",()=>A.aG(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"nN","kl",()=>A.aG(A.jd(void 0)))
s($,"nM","kk",()=>A.aG(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"nP","iB",()=>A.lj())
s($,"nV","kq",()=>A.kZ(4096))
s($,"nT","ko",()=>new A.hG().$0())
s($,"nU","kp",()=>new A.hF().$0())
s($,"nQ","km",()=>new Int8Array(A.mc(A.q([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.b))))
s($,"nn","k7",()=>A.j6("^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(?:[.,](\\d+))?)?)?( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$"))
s($,"nW","kr",()=>A.jZ(B.X))
s($,"nk","k4",()=>({}))
s($,"nR","kn",()=>A.j_(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],t.N))
s($,"nj","k3",()=>A.j6("^\\S+$"))
s($,"nr","iA",()=>B.a.aD(A.i3(),"Opera",0))
s($,"nq","ka",()=>!$.iA()&&B.a.aD(A.i3(),"Trident/",0))
s($,"np","k9",()=>B.a.aD(A.i3(),"Firefox",0))
s($,"no","k8",()=>"-"+$.kb()+"-")
s($,"ns","kb",()=>{if($.k9())var r="moz"
else if($.ka())r="ms"
else r=$.iA()?"o":"webkit"
return r})
s($,"o_","kt",()=>{var r="previous_reading",q=t.N,p=t.z
return A.q([A.C(["bill_id","BILL-5001","house_id","HH-101","account_number","TAG-2026-0041","billing_month","June 2026",r,15.8,"current_reading",18.4,"consumption",2.6,"water_charge",120,"maintenance_fee",50,"total_due",170,"billed_by","EMP-304","date","2026-06-24T18:45:00Z","status","Pending"],q,p),A.C(["bill_id","BILL-5002","house_id","HH-101","account_number","TAG-2026-0041","billing_month","May 2026",r,14.1,"current_reading",15.8,"consumption",1.7,"water_charge",120,"maintenance_fee",50,"total_due",170,"billed_by","EMP-304","date","2026-05-24T10:15:00Z","status","Paid"],q,p),A.C(["bill_id","BILL-5003","house_id","HH-102","account_number","TAG-2026-0105","billing_month","May 2026",r,11.5,"current_reading",12.1,"consumption",0.6,"water_charge",120,"maintenance_fee",50,"total_due",170,"billed_by","EMP-304","date","2026-05-24T10:30:00Z","status","Paid"],q,p)],t.t)})
s($,"o0","ku",()=>{var r="current_leak_status",q="current_m3_usage",p="leak_detected_at",o=A.e7("O<bj>"),n=t.N,m=t.z
return A.q([A.C(["house_id","HH-101","lot","Lot 1","password",null,"owner_name","Maria C. Santos","purok","Purok 1","account_number","TAG-2026-0041",r,"leak",q,18.4,"flow_rate",0.85,"monthly_history",A.q([12.4,14.1,15.8,18.4],o),p,"2026-06-24T18:30:00Z"],n,m),A.C(["house_id","HH-102","lot","Lot 2","password",null,"owner_name","Ramon P. Del Rosario","purok","Purok 1","account_number","TAG-2026-0105",r,"normal",q,12.1,"flow_rate",0.05,"monthly_history",A.q([11.8,12,11.5,12.1],o),p,null],n,m),A.C(["house_id","HH-103","lot","Lot 3","password",null,"owner_name","Elena F. Garcia","purok","Purok 2","account_number","TAG-2026-0312",r,"leak",q,24.8,"flow_rate",0.98,"monthly_history",A.q([15.2,16,19.5,24.8],o),p,"2026-06-25T02:15:00Z"],n,m),A.C(["house_id","HH-104","lot","Lot 4","password",null,"owner_name","Delfin S. Alcantara","purok","Purok 2","account_number","TAG-2026-0421",r,"normal",q,9.3,"flow_rate",0.02,"monthly_history",A.q([8.5,9,9.1,9.3],o),p,null],n,m),A.C(["house_id","HH-105","lot","Lot 5","password",null,"owner_name","Clara M. Aquino","purok","Purok 3","account_number","TAG-2026-0810",r,"normal",q,15.6,"flow_rate",0.08,"monthly_history",A.q([14,15.2,14.9,15.6],o),p,null],n,m),A.C(["house_id","HH-106","lot","Lot 6","password",null,"owner_name","Manuel L. Roxas","purok","Purok 3","account_number","TAG-2026-0925",r,"normal",q,21,"flow_rate",0.11,"monthly_history",A.q([19.2,20.1,20.8,21],o),p,null],n,m),A.C(["house_id","HH-107","lot","Lot 7","password",null,"owner_name","Felipe A. Agoncillo","purok","Purok 4","account_number","TAG-2026-1102",r,"leak",q,32.5,"flow_rate",1.45,"monthly_history",A.q([18.4,21,25.1,32.5],o),p,"2026-06-25T08:45:00Z"],n,m),A.C(["house_id","HH-108","lot","Lot 8","password",null,"owner_name","Gregoria de Jesus","purok","Purok 4","account_number","TAG-2026-1349",r,"normal",q,14.2,"flow_rate",0.04,"monthly_history",A.q([13.1,13.9,14,14.2],o),p,null],n,m),A.C(["house_id","HH-109","lot","Lot 9","password",null,"owner_name","Antonio N. Luna","purok","Purok 5","account_number","TAG-2026-1509",r,"normal",q,11,"flow_rate",0.06,"monthly_history",A.q([10.5,10.9,11.2,11],o),p,null],n,m),A.C(["house_id","HH-110","lot","Lot 10","password",null,"owner_name","Leonor Rivera","purok","Purok 6","account_number","TAG-2026-1772",r,"normal",q,13.7,"flow_rate",0.05,"monthly_history",A.q([12.8,13.2,13.4,13.7],o),p,null],n,m)],t.t)})
s($,"nY","G",()=>{var r=t.t
return new A.fs(A.q([],r),A.bw(t.N,t.z),A.q([],r),A.q([],r),A.q([],r),A.q([],r))})})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({DOMError:J.a_,MediaError:J.a_,Navigator:J.a_,NavigatorConcurrentHardware:J.a_,NavigatorUserMediaError:J.a_,OverconstrainedError:J.a_,PositionError:J.a_,GeolocationPositionError:J.a_,Range:J.a_,ArrayBufferView:A.cf,Int8Array:A.di,Uint8Array:A.cg,HTMLAudioElement:A.f,HTMLBRElement:A.f,HTMLCanvasElement:A.f,HTMLContentElement:A.f,HTMLDListElement:A.f,HTMLDataElement:A.f,HTMLDataListElement:A.f,HTMLDetailsElement:A.f,HTMLDialogElement:A.f,HTMLDivElement:A.f,HTMLEmbedElement:A.f,HTMLFieldSetElement:A.f,HTMLHRElement:A.f,HTMLHeadElement:A.f,HTMLHeadingElement:A.f,HTMLHtmlElement:A.f,HTMLIFrameElement:A.f,HTMLImageElement:A.f,HTMLLIElement:A.f,HTMLLabelElement:A.f,HTMLLegendElement:A.f,HTMLLinkElement:A.f,HTMLMapElement:A.f,HTMLMediaElement:A.f,HTMLMenuElement:A.f,HTMLMetaElement:A.f,HTMLMeterElement:A.f,HTMLModElement:A.f,HTMLOListElement:A.f,HTMLObjectElement:A.f,HTMLOptGroupElement:A.f,HTMLOptionElement:A.f,HTMLOutputElement:A.f,HTMLParagraphElement:A.f,HTMLParamElement:A.f,HTMLPictureElement:A.f,HTMLPreElement:A.f,HTMLProgressElement:A.f,HTMLQuoteElement:A.f,HTMLScriptElement:A.f,HTMLShadowElement:A.f,HTMLSlotElement:A.f,HTMLSourceElement:A.f,HTMLSpanElement:A.f,HTMLStyleElement:A.f,HTMLTableCaptionElement:A.f,HTMLTableCellElement:A.f,HTMLTableDataCellElement:A.f,HTMLTableHeaderCellElement:A.f,HTMLTableColElement:A.f,HTMLTimeElement:A.f,HTMLTitleElement:A.f,HTMLTrackElement:A.f,HTMLUListElement:A.f,HTMLUnknownElement:A.f,HTMLVideoElement:A.f,HTMLDirectoryElement:A.f,HTMLFontElement:A.f,HTMLFrameElement:A.f,HTMLFrameSetElement:A.f,HTMLMarqueeElement:A.f,HTMLElement:A.f,HTMLAnchorElement:A.bp,HTMLAreaElement:A.cU,HTMLBaseElement:A.bq,HTMLBodyElement:A.aU,HTMLButtonElement:A.bs,CDATASection:A.ap,CharacterData:A.ap,Comment:A.ap,ProcessingInstruction:A.ap,Text:A.ap,CSSStyleDeclaration:A.aW,MSStyleCSSProperties:A.aW,CSS2Properties:A.aW,XMLDocument:A.aX,Document:A.aX,DOMException:A.d4,DOMImplementation:A.bW,DOMTokenList:A.d5,MathMLElement:A.y,Element:A.y,AbortPaymentEvent:A.e,AnimationEvent:A.e,AnimationPlaybackEvent:A.e,ApplicationCacheErrorEvent:A.e,BackgroundFetchClickEvent:A.e,BackgroundFetchEvent:A.e,BackgroundFetchFailEvent:A.e,BackgroundFetchedEvent:A.e,BeforeInstallPromptEvent:A.e,BeforeUnloadEvent:A.e,BlobEvent:A.e,CanMakePaymentEvent:A.e,ClipboardEvent:A.e,CloseEvent:A.e,CustomEvent:A.e,DeviceMotionEvent:A.e,DeviceOrientationEvent:A.e,ErrorEvent:A.e,ExtendableEvent:A.e,ExtendableMessageEvent:A.e,FetchEvent:A.e,FontFaceSetLoadEvent:A.e,ForeignFetchEvent:A.e,GamepadEvent:A.e,HashChangeEvent:A.e,InstallEvent:A.e,MediaEncryptedEvent:A.e,MediaKeyMessageEvent:A.e,MediaQueryListEvent:A.e,MediaStreamEvent:A.e,MediaStreamTrackEvent:A.e,MessageEvent:A.e,MIDIConnectionEvent:A.e,MIDIMessageEvent:A.e,MutationEvent:A.e,NotificationEvent:A.e,PageTransitionEvent:A.e,PaymentRequestEvent:A.e,PaymentRequestUpdateEvent:A.e,PopStateEvent:A.e,PresentationConnectionAvailableEvent:A.e,PresentationConnectionCloseEvent:A.e,PromiseRejectionEvent:A.e,PushEvent:A.e,RTCDataChannelEvent:A.e,RTCDTMFToneChangeEvent:A.e,RTCPeerConnectionIceEvent:A.e,RTCTrackEvent:A.e,SecurityPolicyViolationEvent:A.e,SensorErrorEvent:A.e,SpeechRecognitionError:A.e,SpeechRecognitionEvent:A.e,SpeechSynthesisEvent:A.e,StorageEvent:A.e,SyncEvent:A.e,TrackEvent:A.e,TransitionEvent:A.e,WebKitTransitionEvent:A.e,VRDeviceEvent:A.e,VRDisplayEvent:A.e,VRSessionEvent:A.e,MojoInterfaceRequestEvent:A.e,USBConnectionEvent:A.e,IDBVersionChangeEvent:A.e,AudioProcessingEvent:A.e,OfflineAudioCompletionEvent:A.e,WebGLContextEvent:A.e,Event:A.e,InputEvent:A.e,SubmitEvent:A.e,EventTarget:A.A,HTMLFormElement:A.d8,HTMLDocument:A.c0,XMLHttpRequest:A.ak,XMLHttpRequestEventTarget:A.c1,HTMLInputElement:A.b_,Location:A.bx,MouseEvent:A.a7,DragEvent:A.a7,PointerEvent:A.a7,WheelEvent:A.a7,DocumentFragment:A.m,ShadowRoot:A.m,DocumentType:A.m,Node:A.m,NodeList:A.ch,RadioNodeList:A.ch,ProgressEvent:A.am,ResourceProgressEvent:A.am,HTMLSelectElement:A.b8,Storage:A.cp,HTMLTableElement:A.cs,HTMLTableRowElement:A.dr,HTMLTableSectionElement:A.ds,HTMLTemplateElement:A.bD,HTMLTextAreaElement:A.b9,CompositionEvent:A.ao,FocusEvent:A.ao,KeyboardEvent:A.ao,TextEvent:A.ao,TouchEvent:A.ao,UIEvent:A.ao,Window:A.cv,DOMWindow:A.cv,Attr:A.bJ,NamedNodeMap:A.cB,MozNamedAttrMap:A.cB,SVGScriptElement:A.bA,SVGAElement:A.h,SVGAnimateElement:A.h,SVGAnimateMotionElement:A.h,SVGAnimateTransformElement:A.h,SVGAnimationElement:A.h,SVGCircleElement:A.h,SVGClipPathElement:A.h,SVGDefsElement:A.h,SVGDescElement:A.h,SVGDiscardElement:A.h,SVGEllipseElement:A.h,SVGFEBlendElement:A.h,SVGFEColorMatrixElement:A.h,SVGFEComponentTransferElement:A.h,SVGFECompositeElement:A.h,SVGFEConvolveMatrixElement:A.h,SVGFEDiffuseLightingElement:A.h,SVGFEDisplacementMapElement:A.h,SVGFEDistantLightElement:A.h,SVGFEFloodElement:A.h,SVGFEFuncAElement:A.h,SVGFEFuncBElement:A.h,SVGFEFuncGElement:A.h,SVGFEFuncRElement:A.h,SVGFEGaussianBlurElement:A.h,SVGFEImageElement:A.h,SVGFEMergeElement:A.h,SVGFEMergeNodeElement:A.h,SVGFEMorphologyElement:A.h,SVGFEOffsetElement:A.h,SVGFEPointLightElement:A.h,SVGFESpecularLightingElement:A.h,SVGFESpotLightElement:A.h,SVGFETileElement:A.h,SVGFETurbulenceElement:A.h,SVGFilterElement:A.h,SVGForeignObjectElement:A.h,SVGGElement:A.h,SVGGeometryElement:A.h,SVGGraphicsElement:A.h,SVGImageElement:A.h,SVGLineElement:A.h,SVGLinearGradientElement:A.h,SVGMarkerElement:A.h,SVGMaskElement:A.h,SVGMetadataElement:A.h,SVGPathElement:A.h,SVGPatternElement:A.h,SVGPolygonElement:A.h,SVGPolylineElement:A.h,SVGRadialGradientElement:A.h,SVGRectElement:A.h,SVGSetElement:A.h,SVGStopElement:A.h,SVGStyleElement:A.h,SVGSVGElement:A.h,SVGSwitchElement:A.h,SVGSymbolElement:A.h,SVGTSpanElement:A.h,SVGTextContentElement:A.h,SVGTextElement:A.h,SVGTextPathElement:A.h,SVGTextPositioningElement:A.h,SVGTitleElement:A.h,SVGUseElement:A.h,SVGViewElement:A.h,SVGGradientElement:A.h,SVGComponentTransferFunctionElement:A.h,SVGFEDropShadowElement:A.h,SVGMPathElement:A.h,SVGElement:A.h})
hunkHelpers.setOrUpdateLeafTags({DOMError:true,MediaError:true,Navigator:true,NavigatorConcurrentHardware:true,NavigatorUserMediaError:true,OverconstrainedError:true,PositionError:true,GeolocationPositionError:true,Range:true,ArrayBufferView:false,Int8Array:true,Uint8Array:false,HTMLAudioElement:true,HTMLBRElement:true,HTMLCanvasElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLDivElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHeadingElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLImageElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOptionElement:true,HTMLOutputElement:true,HTMLParagraphElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLSpanElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,HTMLAnchorElement:true,HTMLAreaElement:true,HTMLBaseElement:true,HTMLBodyElement:true,HTMLButtonElement:true,CDATASection:true,CharacterData:true,Comment:true,ProcessingInstruction:true,Text:true,CSSStyleDeclaration:true,MSStyleCSSProperties:true,CSS2Properties:true,XMLDocument:true,Document:false,DOMException:true,DOMImplementation:true,DOMTokenList:true,MathMLElement:true,Element:false,AbortPaymentEvent:true,AnimationEvent:true,AnimationPlaybackEvent:true,ApplicationCacheErrorEvent:true,BackgroundFetchClickEvent:true,BackgroundFetchEvent:true,BackgroundFetchFailEvent:true,BackgroundFetchedEvent:true,BeforeInstallPromptEvent:true,BeforeUnloadEvent:true,BlobEvent:true,CanMakePaymentEvent:true,ClipboardEvent:true,CloseEvent:true,CustomEvent:true,DeviceMotionEvent:true,DeviceOrientationEvent:true,ErrorEvent:true,ExtendableEvent:true,ExtendableMessageEvent:true,FetchEvent:true,FontFaceSetLoadEvent:true,ForeignFetchEvent:true,GamepadEvent:true,HashChangeEvent:true,InstallEvent:true,MediaEncryptedEvent:true,MediaKeyMessageEvent:true,MediaQueryListEvent:true,MediaStreamEvent:true,MediaStreamTrackEvent:true,MessageEvent:true,MIDIConnectionEvent:true,MIDIMessageEvent:true,MutationEvent:true,NotificationEvent:true,PageTransitionEvent:true,PaymentRequestEvent:true,PaymentRequestUpdateEvent:true,PopStateEvent:true,PresentationConnectionAvailableEvent:true,PresentationConnectionCloseEvent:true,PromiseRejectionEvent:true,PushEvent:true,RTCDataChannelEvent:true,RTCDTMFToneChangeEvent:true,RTCPeerConnectionIceEvent:true,RTCTrackEvent:true,SecurityPolicyViolationEvent:true,SensorErrorEvent:true,SpeechRecognitionError:true,SpeechRecognitionEvent:true,SpeechSynthesisEvent:true,StorageEvent:true,SyncEvent:true,TrackEvent:true,TransitionEvent:true,WebKitTransitionEvent:true,VRDeviceEvent:true,VRDisplayEvent:true,VRSessionEvent:true,MojoInterfaceRequestEvent:true,USBConnectionEvent:true,IDBVersionChangeEvent:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,WebGLContextEvent:true,Event:false,InputEvent:false,SubmitEvent:false,EventTarget:false,HTMLFormElement:true,HTMLDocument:true,XMLHttpRequest:true,XMLHttpRequestEventTarget:false,HTMLInputElement:true,Location:true,MouseEvent:true,DragEvent:true,PointerEvent:true,WheelEvent:true,DocumentFragment:true,ShadowRoot:true,DocumentType:true,Node:false,NodeList:true,RadioNodeList:true,ProgressEvent:true,ResourceProgressEvent:true,HTMLSelectElement:true,Storage:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,CompositionEvent:true,FocusEvent:true,KeyboardEvent:true,TextEvent:true,TouchEvent:true,UIEvent:false,Window:true,DOMWindow:true,Attr:true,NamedNodeMap:true,MozNamedAttrMap:true,SVGScriptElement:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true,SVGElement:false})
A.aE.$nativeSuperclassTag="ArrayBufferView"
A.cC.$nativeSuperclassTag="ArrayBufferView"
A.cD.$nativeSuperclassTag="ArrayBufferView"
A.aM.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.n5
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=app.js.map

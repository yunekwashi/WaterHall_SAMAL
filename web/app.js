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
if(a[b]!==s){A.n7(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.q(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.ir(b)
return new s(c,this)}:function(){if(s===null)s=A.ir(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.ir(a).prototype
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
iu(a,b,c,d){return{i:a,p:b,e:c,x:d}},
hN(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.is==null){A.mV()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.c(A.j9("Return interceptor for "+A.d(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.hl
if(o==null)o=$.hl=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.mZ(a)
if(p!=null)return p
if(typeof a=="function")return B.N
s=Object.getPrototypeOf(a)
if(s==null)return B.y
if(s===Object.prototype)return B.y
if(typeof q=="function"){o=$.hl
if(o==null)o=$.hl=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.p,enumerable:false,writable:true,configurable:true})
return B.p}return B.p},
iO(a,b){if(a<0||a>4294967295)throw A.c(A.a8(a,0,4294967295,"length",null))
return J.kN(new Array(a),b)},
iP(a,b){if(a<0)throw A.c(A.aR("Length must be a non-negative integer: "+a,null))
return A.q(new Array(a),b.h("O<0>"))},
kN(a,b){var s=A.q(a,b.h("O<0>"))
s.$flags=1
return s},
iQ(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
kO(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.iQ(r))break;++b}return b},
kP(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.b(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.iQ(q))break}return b},
bj(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.c4.prototype
return J.de.prototype}if(typeof a=="string")return J.b_.prototype
if(a==null)return J.c5.prototype
if(typeof a=="boolean")return J.dd.prototype
if(Array.isArray(a))return J.O.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ax.prototype
if(typeof a=="symbol")return J.bv.prototype
if(typeof a=="bigint")return J.bu.prototype
return a}if(a instanceof A.u)return a
return J.hN(a)},
w(a){if(typeof a=="string")return J.b_.prototype
if(a==null)return a
if(Array.isArray(a))return J.O.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ax.prototype
if(typeof a=="symbol")return J.bv.prototype
if(typeof a=="bigint")return J.bu.prototype
return a}if(a instanceof A.u)return a
return J.hN(a)},
bk(a){if(a==null)return a
if(Array.isArray(a))return J.O.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ax.prototype
if(typeof a=="symbol")return J.bv.prototype
if(typeof a=="bigint")return J.bu.prototype
return a}if(a instanceof A.u)return a
return J.hN(a)},
mO(a){if(typeof a=="string")return J.b_.prototype
if(a==null)return a
if(!(a instanceof A.u))return J.bF.prototype
return a},
F(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.ax.prototype
if(typeof a=="symbol")return J.bv.prototype
if(typeof a=="bigint")return J.bu.prototype
return a}if(a instanceof A.u)return a
return J.hN(a)},
t(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bj(a).a_(a,b)},
k(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.mY(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.w(a).i(a,b)},
aG(a,b,c){return J.bk(a).l(a,b,c)},
kp(a){return J.F(a).cu(a)},
kq(a,b,c){return J.F(a).cI(a,b,c)},
kr(a,b,c,d){return J.F(a).bG(a,b,c,d)},
iy(a,b){return J.w(a).A(a,b)},
hX(a,b){return J.F(a).M(a,b)},
iz(a,b){return J.bk(a).K(a,b)},
cU(a,b){return J.bk(a).bM(a,b)},
e9(a,b){return J.bk(a).q(a,b)},
ks(a){return J.F(a).gcT(a)},
at(a){return J.F(a).gac(a)},
ea(a){return J.bj(a).gE(a)},
eb(a){return J.w(a).gF(a)},
hY(a){return J.w(a).gN(a)},
bn(a){return J.bk(a).gH(a)},
a4(a){return J.w(a).gk(a)},
bo(a){return J.F(a).ga6(a)},
kt(a){return J.bj(a).gY(a)},
iA(a,b,c){return J.bk(a).ao(a,b,c)},
iB(a){return J.bk(a).dm(a)},
ku(a,b){return J.bk(a).v(a,b)},
kv(a,b){return J.F(a).scC(a,b)},
aH(a,b){return J.F(a).sB(a,b)},
m(a,b){return J.F(a).sV(a,b)},
kw(a){return J.mO(a).dw(a)},
J(a){return J.bj(a).j(a)},
c3:function c3(){},
dd:function dd(){},
c5:function c5(){},
Z:function Z(){},
aK:function aK(){},
dl:function dl(){},
bF:function bF(){},
ax:function ax(){},
bu:function bu(){},
bv:function bv(){},
O:function O(a){this.$ti=a},
dc:function dc(){},
fH:function fH(a){this.$ti=a},
aS:function aS(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
c6:function c6(){},
c4:function c4(){},
de:function de(){},
b_:function b_(){}},A={i4:function i4(){},
iS(a){return new A.c8("Field '"+a+"' has been assigned during initialization.")},
kR(a){return new A.c8("Field '"+a+"' has not been initialized.")},
hO(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
j5(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
l7(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
e7(a,b,c){return a},
it(a){var s,r
for(s=$.ad.length,r=0;r<s;++r)if(a===$.ad[r])return!0
return!1},
l6(a,b,c,d){A.dp(b,"start")
if(c!=null){A.dp(c,"end")
if(b>c)A.as(A.a8(b,0,c,"start",null))}return new A.cr(a,b,c,d.h("cr<0>"))},
kS(a,b,c,d){if(t.gw.b(a))return new A.bY(a,b,c.h("@<0>").C(d).h("bY<1,2>"))
return new A.b4(a,b,c.h("@<0>").C(d).h("b4<1,2>"))},
db(){return new A.bB("No element")},
kL(){return new A.bB("Too many elements")},
c8:function c8(a){this.a=a},
d1:function d1(a){this.a=a},
fU:function fU(){},
r:function r(){},
V:function V(){},
cr:function cr(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
b1:function b1(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
b4:function b4(a,b,c){this.a=a
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
a_:function a_(a,b,c){this.a=a
this.b=b
this.$ti=c},
N:function N(a,b,c){this.a=a
this.b=b
this.$ti=c},
cu:function cu(a,b,c){this.a=a
this.b=b
this.$ti=c},
bt:function bt(){},
b9:function b9(){},
bG:function bG(){},
dO:function dO(a){this.a=a},
b2:function b2(a,b){this.a=a
this.$ti=b},
kE(){throw A.c(A.aF("Cannot modify unmodifiable Map"))},
jY(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
mY(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.aU.b(a)},
d(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.J(a)
return s},
dm(a){var s,r=$.iW
if(r==null)r=$.iW=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
i7(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.b(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
b6(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.a.Z(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
dn(a){var s,r,q,p
if(a instanceof A.u)return A.a1(A.a2(a),null)
s=J.bj(a)
if(s===B.M||s===B.O||t.ak.b(a)){r=B.r(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.a1(A.a2(a),null)},
kX(a){var s,r,q
if(typeof a=="number"||A.im(a))return J.J(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.aI)return a.j(0)
s=$.kn()
for(r=0;r<1;++r){q=s[r].dz(a)
if(q!=null)return q}return"Instance of '"+A.dn(a)+"'"},
kY(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
M(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.b0(s,10)|55296)>>>0,s&1023|56320)}}throw A.c(A.a8(a,0,1114111,null,null))},
kZ(a,b,c,d,e,f,g,h,i){var s,r,q,p=b-1
if(0<=a&&a<100){a+=400
p-=4800}s=B.c.a2(h,1000)
g+=B.c.a0(h-s,1000)
r=i?Date.UTC(a,p,c,d,e,f,g):new Date(a,p,c,d,e,f,g).valueOf()
q=!0
if(!isNaN(r))if(!(r<-864e13))if(!(r>864e13))q=r===864e13&&s!==0
if(q)return null
return r},
a9(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
b5(a){return a.c?A.a9(a).getUTCFullYear()+0:A.a9(a).getFullYear()+0},
cl(a){return a.c?A.a9(a).getUTCMonth()+1:A.a9(a).getMonth()+1},
ck(a){return a.c?A.a9(a).getUTCDate()+0:A.a9(a).getDate()+0},
aM(a){return a.c?A.a9(a).getUTCHours()+0:A.a9(a).getHours()+0},
by(a){return a.c?A.a9(a).getUTCMinutes()+0:A.a9(a).getMinutes()+0},
iY(a){return a.c?A.a9(a).getUTCSeconds()+0:A.a9(a).getSeconds()+0},
iX(a){return a.c?A.a9(a).getUTCMilliseconds()+0:A.a9(a).getMilliseconds()+0},
kW(a){var s=a.$thrownJsError
if(s==null)return null
return A.bl(s)},
iZ(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.P(a,s)
a.$thrownJsError=s
s.stack=b.j(0)}},
mT(a){throw A.c(A.iq(a))},
b(a,b){if(a==null)J.a4(a)
throw A.c(A.hL(a,b))},
hL(a,b){var s,r="index"
if(!A.ip(b))return new A.ai(!0,b,r,null)
s=A.aO(J.a4(a))
if(b<0||b>=s)return A.c2(b,s,a,null,r)
return A.j_(b,r)},
iq(a){return new A.ai(!0,a,null,null)},
c(a){return A.P(a,new Error())},
P(a,b){var s
if(a==null)a=new A.aD()
b.dartException=a
s=A.n8
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
n8(){return J.J(this.dartException)},
as(a,b){throw A.P(a,b==null?new Error():b)},
aQ(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.as(A.m5(a,b,c),s)},
m5(a,b,c){var s,r,q,p,o,n,m,l,k
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
hW(a){throw A.c(A.S(a))},
aE(a){var s,r,q,p,o,n
a=A.n1(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.q([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.fY(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
fZ(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
j8(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
i5(a,b){var s=b==null,r=s?null:b.method
return new A.dg(a,r,s?null:b.receiver)},
ah(a){var s
if(a==null)return new A.fS(a)
if(a instanceof A.c_){s=a.a
return A.aP(a,s==null?A.bN(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.aP(a,a.dartException)
return A.mF(a)},
aP(a,b){if(t.Q.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
mF(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.b0(r,16)&8191)===10)switch(q){case 438:return A.aP(a,A.i5(A.d(s)+" (Error "+q+")",null))
case 445:case 5007:A.d(s)
return A.aP(a,new A.cj())}}if(a instanceof TypeError){p=$.k7()
o=$.k8()
n=$.k9()
m=$.ka()
l=$.kd()
k=$.ke()
j=$.kc()
$.kb()
i=$.kg()
h=$.kf()
g=p.U(s)
if(g!=null)return A.aP(a,A.i5(A.p(s),g))
else{g=o.U(s)
if(g!=null){g.method="call"
return A.aP(a,A.i5(A.p(s),g))}else if(n.U(s)!=null||m.U(s)!=null||l.U(s)!=null||k.U(s)!=null||j.U(s)!=null||m.U(s)!=null||i.U(s)!=null||h.U(s)!=null){A.p(s)
return A.aP(a,new A.cj())}}return A.aP(a,new A.dw(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.co()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.aP(a,new A.ai(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.co()
return a},
bl(a){var s
if(a instanceof A.c_)return a.b
if(a==null)return new A.cG(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.cG(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
jU(a){if(a==null)return J.ea(a)
if(typeof a=="object")return A.dm(a)
return J.ea(a)},
mN(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.l(0,a[s],a[r])}return b},
mg(a,b,c,d,e,f){t.Y.a(a)
switch(A.aO(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.c(new A.h9("Unsupported number of arguments for wrapped closure"))},
bR(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.mg)},
kD(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.dr().constructor.prototype):Object.create(new A.br(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.iI(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.kz(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.iI(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
kz(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.c("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.kx)}throw A.c("Error in functionType of tearoff")},
kA(a,b,c,d){var s=A.iG
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
iI(a,b,c,d){if(c)return A.kC(a,b,d)
return A.kA(b.length,d,a,b)},
kB(a,b,c,d){var s=A.iG,r=A.ky
switch(b?-1:a){case 0:throw A.c(new A.dq("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
kC(a,b,c){var s,r
if($.iE==null)$.iE=A.iD("interceptor")
if($.iF==null)$.iF=A.iD("receiver")
s=b.length
r=A.kB(s,c,a,b)
return r},
ir(a){return A.kD(a)},
kx(a,b){return A.hz(v.typeUniverse,A.a2(a.a),b)},
iG(a){return a.a},
ky(a){return a.b},
iD(a){var s,r,q,p=new A.br("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.c(A.aR("Field name "+a+" not found.",null))},
jR(a){return v.getIsolateTag(a)},
nU(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
mZ(a){var s,r,q,p,o,n=A.p($.jS.$1(a)),m=$.hM[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.hS[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.ag($.jN.$2(a,n))
if(q!=null){m=$.hM[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.hS[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.hU(s)
$.hM[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.hS[n]=s
return s}if(p==="-"){o=A.hU(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.jV(a,s)
if(p==="*")throw A.c(A.j9(n))
if(v.leafTags[n]===true){o=A.hU(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.jV(a,s)},
jV(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.iu(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
hU(a){return J.iu(a,!1,null,!!a.$iay)},
n0(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.hU(s)
else return J.iu(s,c,null,null)},
mV(){if(!0===$.is)return
$.is=!0
A.mW()},
mW(){var s,r,q,p,o,n,m,l
$.hM=Object.create(null)
$.hS=Object.create(null)
A.mU()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.jW.$1(o)
if(n!=null){m=A.n0(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
mU(){var s,r,q,p,o,n,m=B.C()
m=A.bQ(B.D,A.bQ(B.E,A.bQ(B.t,A.bQ(B.t,A.bQ(B.F,A.bQ(B.G,A.bQ(B.H(B.r),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.jS=new A.hP(p)
$.jN=new A.hQ(o)
$.jW=new A.hR(n)},
bQ(a,b){return a(b)||b},
mM(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
kQ(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.c(A.T("Illegal RegExp pattern ("+String(o)+")",a,null))},
n6(a,b,c){var s=a.indexOf(b,c)
return s>=0},
n1(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
bT:function bT(){},
bU:function bU(a,b,c){this.a=a
this.b=b
this.$ti=c},
cn:function cn(){},
fY:function fY(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
cj:function cj(){},
dg:function dg(a,b,c){this.a=a
this.b=b
this.c=c},
dw:function dw(a){this.a=a},
fS:function fS(a){this.a=a},
c_:function c_(a,b){this.a=a
this.b=b},
cG:function cG(a){this.a=a
this.b=null},
aI:function aI(){},
d_:function d_(){},
d0:function d0(){},
du:function du(){},
dr:function dr(){},
br:function br(a,b){this.a=a
this.b=b},
dq:function dq(a){this.a=a},
az:function az(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
fI:function fI(a){this.a=a},
fL:function fL(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
b0:function b0(a,b){this.a=a
this.$ti=b},
c9:function c9(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aA:function aA(a,b){this.a=a
this.$ti=b},
ca:function ca(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
hP:function hP(a){this.a=a},
hQ:function hQ(a){this.a=a},
hR:function hR(a){this.a=a},
df:function df(a,b){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null},
hp:function hp(a){this.b=a},
m6(a){return a},
kT(a){return new Uint8Array(a)},
ik(a,b,c){if(a>>>0!==a||a>=c)throw A.c(A.hL(b,a))},
cf:function cf(){},
aC:function aC(){},
aL:function aL(){},
dj:function dj(){},
cg:function cg(){},
cC:function cC(){},
cD:function cD(){},
i8(a,b){var s=b.c
return s==null?b.c=A.cJ(a,"aw",[b.x]):s},
j2(a){var s=a.w
if(s===6||s===7)return A.j2(a.x)
return s===11||s===12},
l1(a){return a.as},
e8(a){return A.hy(v.typeUniverse,a,!1)},
bg(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.bg(a1,s,a3,a4)
if(r===s)return a2
return A.jp(a1,r,!0)
case 7:s=a2.x
r=A.bg(a1,s,a3,a4)
if(r===s)return a2
return A.jo(a1,r,!0)
case 8:q=a2.y
p=A.bP(a1,q,a3,a4)
if(p===q)return a2
return A.cJ(a1,a2.x,p)
case 9:o=a2.x
n=A.bg(a1,o,a3,a4)
m=a2.y
l=A.bP(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.id(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.bP(a1,j,a3,a4)
if(i===j)return a2
return A.jq(a1,k,i)
case 11:h=a2.x
g=A.bg(a1,h,a3,a4)
f=a2.y
e=A.mC(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.jn(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.bP(a1,d,a3,a4)
o=a2.x
n=A.bg(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.ie(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.c(A.cX("Attempted to substitute unexpected RTI kind "+a0))}},
bP(a,b,c,d){var s,r,q,p,o=b.length,n=A.hD(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.bg(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
mD(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.hD(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.bg(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
mC(a,b,c,d){var s,r=b.a,q=A.bP(a,r,c,d),p=b.b,o=A.bP(a,p,c,d),n=b.c,m=A.mD(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.dJ()
s.a=q
s.b=o
s.c=m
return s},
q(a,b){a[v.arrayRti]=b
return a},
jQ(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.mQ(s)
return a.$S()}return null},
mX(a,b){var s
if(A.j2(b))if(a instanceof A.aI){s=A.jQ(a)
if(s!=null)return s}return A.a2(a)},
a2(a){if(a instanceof A.u)return A.y(a)
if(Array.isArray(a))return A.L(a)
return A.il(J.bj(a))},
L(a){var s=a[v.arrayRti],r=t.gn
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
y(a){var s=a.$ti
return s!=null?s:A.il(a)},
il(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.md(a,s)},
md(a,b){var s=a instanceof A.aI?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.lE(v.typeUniverse,s.name)
b.$ccache=r
return r},
mQ(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.hy(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
mP(a){return A.bh(A.y(a))},
mB(a){var s=a instanceof A.aI?A.jQ(a):null
if(s!=null)return s
if(t.dm.b(a))return J.kt(a).a
if(Array.isArray(a))return A.L(a)
return A.a2(a)},
bh(a){var s=a.r
return s==null?a.r=new A.hx(a):s},
iv(a){return A.bh(A.hy(v.typeUniverse,a,!1))},
mc(a){var s=this
s.b=A.mz(s)
return s.b(a)},
mz(a){var s,r,q,p,o
if(a===t.K)return A.mm
if(A.bm(a))return A.mq
s=a.w
if(s===6)return A.ma
if(s===1)return A.jH
if(s===7)return A.mh
r=A.my(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.bm)){a.f="$i"+q
if(q==="H")return A.mk
if(a===t.m)return A.mj
return A.mp}}else if(s===10){p=A.mM(a.x,a.y)
o=p==null?A.jH:p
return o==null?A.bN(o):o}return A.m8},
my(a){if(a.w===8){if(a===t.S)return A.ip
if(a===t.i||a===t.n)return A.ml
if(a===t.N)return A.mo
if(a===t.y)return A.im}return null},
mb(a){var s=this,r=A.m7
if(A.bm(s))r=A.m2
else if(s===t.K)r=A.bN
else if(A.bS(s)){r=A.m9
if(s===t.h6)r=A.jA
else if(s===t.dk)r=A.ag
else if(s===t.fQ)r=A.lY
else if(s===t.cg)r=A.jB
else if(s===t.fW)r=A.m_
else if(s===t.an)r=A.m1}else if(s===t.S)r=A.aO
else if(s===t.N)r=A.p
else if(s===t.y)r=A.ij
else if(s===t.n)r=A.v
else if(s===t.i)r=A.lZ
else if(s===t.m)r=A.m0
s.a=r
return s.a(a)},
m8(a){var s=this
if(a==null)return A.bS(s)
return A.jT(v.typeUniverse,A.mX(a,s),s)},
ma(a){if(a==null)return!0
return this.x.b(a)},
mp(a){var s,r=this
if(a==null)return A.bS(r)
s=r.f
if(a instanceof A.u)return!!a[s]
return!!J.bj(a)[s]},
mk(a){var s,r=this
if(a==null)return A.bS(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.u)return!!a[s]
return!!J.bj(a)[s]},
mj(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.u)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
jG(a){if(typeof a=="object"){if(a instanceof A.u)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
m7(a){var s=this
if(a==null){if(A.bS(s))return a}else if(s.b(a))return a
throw A.P(A.jD(a,s),new Error())},
m9(a){var s=this
if(a==null||s.b(a))return a
throw A.P(A.jD(a,s),new Error())},
jD(a,b){return new A.bL("TypeError: "+A.jf(a,A.a1(b,null)))},
jP(a,b,c,d){if(A.jT(v.typeUniverse,a,b))return a
throw A.P(A.lv("The type argument '"+A.a1(a,null)+"' is not a subtype of the type variable bound '"+A.a1(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
jf(a,b){return A.d8(a)+": type '"+A.a1(A.mB(a),null)+"' is not a subtype of type '"+b+"'"},
lv(a){return new A.bL("TypeError: "+a)},
af(a,b){return new A.bL("TypeError: "+A.jf(a,b))},
mh(a){var s=this
return s.x.b(a)||A.i8(v.typeUniverse,s).b(a)},
mm(a){return a!=null},
bN(a){if(a!=null)return a
throw A.P(A.af(a,"Object"),new Error())},
mq(a){return!0},
m2(a){return a},
jH(a){return!1},
im(a){return!0===a||!1===a},
ij(a){if(!0===a)return!0
if(!1===a)return!1
throw A.P(A.af(a,"bool"),new Error())},
lY(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.P(A.af(a,"bool?"),new Error())},
lZ(a){if(typeof a=="number")return a
throw A.P(A.af(a,"double"),new Error())},
m_(a){if(typeof a=="number")return a
if(a==null)return a
throw A.P(A.af(a,"double?"),new Error())},
ip(a){return typeof a=="number"&&Math.floor(a)===a},
aO(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.P(A.af(a,"int"),new Error())},
jA(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.P(A.af(a,"int?"),new Error())},
ml(a){return typeof a=="number"},
v(a){if(typeof a=="number")return a
throw A.P(A.af(a,"num"),new Error())},
jB(a){if(typeof a=="number")return a
if(a==null)return a
throw A.P(A.af(a,"num?"),new Error())},
mo(a){return typeof a=="string"},
p(a){if(typeof a=="string")return a
throw A.P(A.af(a,"String"),new Error())},
ag(a){if(typeof a=="string")return a
if(a==null)return a
throw A.P(A.af(a,"String?"),new Error())},
m0(a){if(A.jG(a))return a
throw A.P(A.af(a,"JSObject"),new Error())},
m1(a){if(a==null)return a
if(A.jG(a))return a
throw A.P(A.af(a,"JSObject?"),new Error())},
jK(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.a1(a[q],b)
return s},
mu(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.jK(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.a1(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
jE(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
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
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.a1(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.a1(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.a1(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.a1(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.a1(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
a1(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.a1(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.a1(a.x,b)+">"
if(l===8){p=A.mE(a.x)
o=a.y
return o.length>0?p+("<"+A.jK(o,b)+">"):p}if(l===10)return A.mu(a,b)
if(l===11)return A.jE(a,b,null)
if(l===12)return A.jE(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.b(b,n)
return b[n]}return"?"},
mE(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
lF(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
lE(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.hy(a,b,!1)
else if(typeof m=="number"){s=m
r=A.cK(a,5,"#")
q=A.hD(s)
for(p=0;p<s;++p)q[p]=r
o=A.cJ(a,b,q)
n[b]=o
return o}else return m},
lC(a,b){return A.jy(a.tR,b)},
lB(a,b){return A.jy(a.eT,b)},
hy(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.jk(A.ji(a,null,b,!1))
r.set(b,s)
return s},
hz(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.jk(A.ji(a,b,c,!0))
q.set(c,r)
return r},
lD(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.id(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
aN(a,b){b.a=A.mb
b.b=A.mc
return b},
cK(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.am(null,null)
s.w=b
s.as=c
r=A.aN(a,s)
a.eC.set(c,r)
return r},
jp(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.lz(a,b,r,c)
a.eC.set(r,s)
return s},
lz(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.bm(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.bS(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.am(null,null)
q.w=6
q.x=b
q.as=c
return A.aN(a,q)},
jo(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.lx(a,b,r,c)
a.eC.set(r,s)
return s},
lx(a,b,c,d){var s,r
if(d){s=b.w
if(A.bm(b)||b===t.K)return b
else if(s===1)return A.cJ(a,"aw",[b])
else if(b===t.a||b===t.T)return t.eH}r=new A.am(null,null)
r.w=7
r.x=b
r.as=c
return A.aN(a,r)},
lA(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.am(null,null)
s.w=13
s.x=b
s.as=q
r=A.aN(a,s)
a.eC.set(q,r)
return r},
cI(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
lw(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
cJ(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.cI(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.am(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.aN(a,r)
a.eC.set(p,q)
return q},
id(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.cI(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.am(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.aN(a,o)
a.eC.set(q,n)
return n},
jq(a,b,c){var s,r,q="+"+(b+"("+A.cI(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.am(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.aN(a,s)
a.eC.set(q,r)
return r},
jn(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.cI(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.cI(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.lw(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.am(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.aN(a,p)
a.eC.set(r,o)
return o},
ie(a,b,c,d){var s,r=b.as+("<"+A.cI(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.ly(a,b,c,r,d)
a.eC.set(r,s)
return s},
ly(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.hD(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.bg(a,b,r,0)
m=A.bP(a,c,r,0)
return A.ie(a,n,m,c!==m)}}l=new A.am(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.aN(a,l)},
ji(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
jk(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.lo(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.jj(a,r,l,k,!1)
else if(q===46)r=A.jj(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.bf(a.u,a.e,k.pop()))
break
case 94:k.push(A.lA(a.u,k.pop()))
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
case 62:A.lq(a,k)
break
case 38:A.lp(a,k)
break
case 63:p=a.u
k.push(A.jp(p,A.bf(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.jo(p,A.bf(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.ln(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.jl(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.ls(a.u,a.e,o)
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
return A.bf(a.u,a.e,m)},
lo(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
jj(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.lF(s,o.x)[p]
if(n==null)A.as('No "'+p+'" in "'+A.l1(o)+'"')
d.push(A.hz(s,o,n))}else d.push(p)
return m},
lq(a,b){var s,r=a.u,q=A.jh(a,b),p=b.pop()
if(typeof p=="string")b.push(A.cJ(r,p,q))
else{s=A.bf(r,a.e,p)
switch(s.w){case 11:b.push(A.ie(r,s,q,a.n))
break
default:b.push(A.id(r,s,q))
break}}},
ln(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.jh(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.bf(p,a.e,o)
q=new A.dJ()
q.a=s
q.b=n
q.c=m
b.push(A.jn(p,r,q))
return
case-4:b.push(A.jq(p,b.pop(),s))
return
default:throw A.c(A.cX("Unexpected state under `()`: "+A.d(o)))}},
lp(a,b){var s=b.pop()
if(0===s){b.push(A.cK(a.u,1,"0&"))
return}if(1===s){b.push(A.cK(a.u,4,"1&"))
return}throw A.c(A.cX("Unexpected extended operation "+A.d(s)))},
jh(a,b){var s=b.splice(a.p)
A.jl(a.u,a.e,s)
a.p=b.pop()
return s},
bf(a,b,c){if(typeof c=="string")return A.cJ(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.lr(a,b,c)}else return c},
jl(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.bf(a,b,c[s])},
ls(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.bf(a,b,c[s])},
lr(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.c(A.cX("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.c(A.cX("Bad index "+c+" for "+b.j(0)))},
jT(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.R(a,b,null,c,null)
r.set(c,s)}return s},
R(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.bm(d))return!0
s=b.w
if(s===4)return!0
if(A.bm(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.R(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.R(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.R(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.R(a,b.x,c,d,e))return!1
return A.R(a,A.i8(a,b),c,d,e)}if(s===6)return A.R(a,p,c,d,e)&&A.R(a,b.x,c,d,e)
if(q===7){if(A.R(a,b,c,d.x,e))return!0
return A.R(a,b,c,A.i8(a,d),e)}if(q===6)return A.R(a,b,c,p,e)||A.R(a,b,c,d.x,e)
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
if(!A.R(a,j,c,i,e)||!A.R(a,i,e,j,c))return!1}return A.jF(a,b.x,c,d.x,e)}if(q===11){if(b===t.r)return!0
if(p)return!1
return A.jF(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.mi(a,b,c,d,e)}if(o&&q===10)return A.mn(a,b,c,d,e)
return!1},
jF(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
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
mi(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.hz(a,b,r[o])
return A.jz(a,p,null,c,d.y,e)}return A.jz(a,b.y,null,c,d.y,e)},
jz(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.R(a,b[s],d,e[s],f))return!1
return!0},
mn(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.R(a,r[s],c,q[s],e))return!1
return!0},
bS(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.bm(a))if(s!==6)r=s===7&&A.bS(a.x)
return r},
bm(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
jy(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
hD(a){return a>0?new Array(a):v.typeUniverse.sEA},
am:function am(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
dJ:function dJ(){this.c=this.b=this.a=null},
hx:function hx(a){this.a=a},
dI:function dI(){},
bL:function bL(a){this.a=a},
ld(){var s,r,q
if(self.scheduleImmediate!=null)return A.mH()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.bR(new A.h5(s),1)).observe(r,{childList:true})
return new A.h4(s,r,q)}else if(self.setImmediate!=null)return A.mI()
return A.mJ()},
le(a){self.scheduleImmediate(A.bR(new A.h6(t.M.a(a)),0))},
lf(a){self.setImmediate(A.bR(new A.h7(t.M.a(a)),0))},
lg(a){A.i9(B.K,t.M.a(a))},
i9(a,b){var s=B.c.a0(a.a,1000)
return A.lt(s,b)},
j7(a,b){var s=B.c.a0(a.a,1000)
return A.lu(s,b)},
lt(a,b){var s=new A.cH(!0)
s.co(a,b)
return s},
lu(a,b){var s=new A.cH(!1)
s.cp(a,b)
return s},
e4(a){return new A.dA(new A.Q($.I,a.h("Q<0>")),a.h("dA<0>"))},
e3(a,b){a.$2(0,null)
b.b=!0
return b.a},
e0(a,b){A.m3(a,b)},
e2(a,b){b.b1(0,a)},
e1(a,b){b.aB(A.ah(a),A.bl(a))},
m3(a,b){var s,r,q=new A.hF(b),p=new A.hG(b)
if(a instanceof A.Q)a.bD(q,p,t.z)
else{s=t.z
if(a instanceof A.Q)a.bb(q,p,s)
else{r=new A.Q($.I,t._)
r.a=8
r.c=a
r.bD(q,p,s)}}},
e6(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.I.c0(new A.hK(s),t.H,t.S,t.z)},
hZ(a){var s
if(t.Q.b(a)){s=a.gai()
if(s!=null)return s}return B.l},
me(a,b){if($.I===B.f)return null
return null},
mf(a,b){if($.I!==B.f)A.me(a,b)
if(b==null)if(t.Q.b(a)){b=a.gai()
if(b==null){A.iZ(a,B.l)
b=B.l}}else b=B.l
else if(t.Q.b(a))A.iZ(a,b)
return new A.ae(a,b)},
ib(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t._;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.l2()
b.aR(new A.ae(new A.ai(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.bx(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.ak()
b.au(o.a)
A.bc(b,p)
return}b.a^=2
A.e5(null,null,b.b,t.M.a(new A.hd(o,b)))},
bc(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.u,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.hI(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.bc(d.a,c)
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
A.hI(j.a,j.b)
return}g=$.I
if(g!==h)$.I=h
else g=null
c=c.c
if((c&15)===8)new A.hh(q,d,n).$0()
else if(o){if((c&1)!==0)new A.hg(q,j).$0()}else if((c&2)!==0)new A.hf(d,q).$0()
if(g!=null)$.I=g
c=q.c
if(c instanceof A.Q){p=q.a.$ti
p=p.h("aw<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.av(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.ib(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.av(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
mv(a,b){var s
if(t.W.b(a))return b.c0(a,t.z,t.K,t.l)
s=t.v
if(s.b(a))return s.a(a)
throw A.c(A.fm(a,"onError",u.c))},
ms(){var s,r
for(s=$.bO;s!=null;s=$.bO){$.cR=null
r=s.b
$.bO=r
if(r==null)$.cQ=null
s.a.$0()}},
mA(){$.io=!0
try{A.ms()}finally{$.cR=null
$.io=!1
if($.bO!=null)$.ix().$1(A.jO())}},
jM(a){var s=new A.dB(a),r=$.cQ
if(r==null){$.bO=$.cQ=s
if(!$.io)$.ix().$1(A.jO())}else $.cQ=r.b=s},
mx(a){var s,r,q,p=$.bO
if(p==null){A.jM(a)
$.cR=$.cQ
return}s=new A.dB(a)
r=$.cR
if(r==null){s.b=p
$.bO=$.cR=s}else{q=r.b
s.b=q
$.cR=r.b=s
if(q==null)$.cQ=s}},
nx(a,b){A.e7(a,"stream",t.K)
return new A.dV(b.h("dV<0>"))},
l8(a,b){var s=$.I
if(s===B.f)return A.i9(a,t.M.a(b))
return A.i9(a,t.M.a(s.bI(b)))},
j6(a,b){var s=$.I
if(s===B.f)return A.j7(a,t.cB.a(b))
return A.j7(a,t.cB.a(s.bJ(b,t.p)))},
hI(a,b){A.mx(new A.hJ(a,b))},
jI(a,b,c,d,e){var s,r=$.I
if(r===c)return d.$0()
$.I=c
s=r
try{r=d.$0()
return r}finally{$.I=s}},
jJ(a,b,c,d,e,f,g){var s,r=$.I
if(r===c)return d.$1(e)
$.I=c
s=r
try{r=d.$1(e)
return r}finally{$.I=s}},
mw(a,b,c,d,e,f,g,h,i){var s,r=$.I
if(r===c)return d.$2(e,f)
$.I=c
s=r
try{r=d.$2(e,f)
return r}finally{$.I=s}},
e5(a,b,c,d){t.M.a(d)
if(B.f!==c){d=c.bI(d)
d=d}A.jM(d)},
h5:function h5(a){this.a=a},
h4:function h4(a,b,c){this.a=a
this.b=b
this.c=c},
h6:function h6(a){this.a=a},
h7:function h7(a){this.a=a},
cH:function cH(a){this.a=a
this.b=null
this.c=0},
hw:function hw(a,b){this.a=a
this.b=b},
hv:function hv(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dA:function dA(a,b){this.a=a
this.b=!1
this.$ti=b},
hF:function hF(a){this.a=a},
hG:function hG(a){this.a=a},
hK:function hK(a){this.a=a},
ae:function ae(a,b){this.a=a
this.b=b},
cx:function cx(){},
cw:function cw(a,b){this.a=a
this.$ti=b},
bb:function bb(a,b,c,d,e){var _=this
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
ha:function ha(a,b){this.a=a
this.b=b},
he:function he(a,b){this.a=a
this.b=b},
hd:function hd(a,b){this.a=a
this.b=b},
hc:function hc(a,b){this.a=a
this.b=b},
hb:function hb(a,b){this.a=a
this.b=b},
hh:function hh(a,b,c){this.a=a
this.b=b
this.c=c},
hi:function hi(a,b){this.a=a
this.b=b},
hj:function hj(a){this.a=a},
hg:function hg(a,b){this.a=a
this.b=b},
hf:function hf(a,b){this.a=a
this.b=b},
dB:function dB(a){this.a=a
this.b=null},
cq:function cq(){},
fW:function fW(a,b){this.a=a
this.b=b},
fX:function fX(a,b){this.a=a
this.b=b},
dV:function dV(a){this.$ti=a},
cP:function cP(){},
dR:function dR(){},
hq:function hq(a,b){this.a=a
this.b=b},
hr:function hr(a,b,c){this.a=a
this.b=b
this.c=c},
hJ:function hJ(a,b){this.a=a
this.b=b},
iU(a,b){return new A.az(a.h("@<0>").C(b).h("az<1,2>"))},
D(a,b,c){return b.h("@<0>").C(c).h("iT<1,2>").a(A.mN(a,new A.az(b.h("@<0>").C(c).h("az<1,2>"))))},
bw(a,b){return new A.az(a.h("@<0>").C(b).h("az<1,2>"))},
cc(a){return new A.cA(a.h("cA<0>"))},
ic(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
lm(a,b,c){var s=new A.be(a,b,c.h("be<0>"))
s.c=a.e
return s},
cb(a,b,c){var s=A.iU(b,c)
J.e9(a,new A.fM(s,b,c))
return s},
iV(a,b){var s,r,q=A.cc(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.hW)(a),++r)q.m(0,b.a(a[r]))
return q},
i6(a){var s,r
if(A.it(a))return"{...}"
s=new A.Y("")
try{r={}
B.b.m($.ad,a)
s.a+="{"
r.a=!0
J.e9(a,new A.fP(r,s))
s.a+="}"}finally{if(0>=$.ad.length)return A.b($.ad,-1)
$.ad.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
cA:function cA(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
dN:function dN(a){this.a=a
this.c=this.b=null},
be:function be(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
fM:function fM(a,b,c){this.a=a
this.b=b
this.c=c},
C:function C(){},
A:function A(){},
fO:function fO(a){this.a=a},
fP:function fP(a,b){this.a=a
this.b=b},
bH:function bH(){},
ac:function ac(){},
cd:function cd(){},
bI:function bI(a,b){this.a=a
this.$ti=b},
aa:function aa(){},
cE:function cE(){},
cL:function cL(){},
mt(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.ah(r)
q=A.T(String(s),null,null)
throw A.c(q)}q=A.hH(p)
return q},
hH(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.dL(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.hH(a[s])
return a},
lW(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.kl()
else s=new Uint8Array(o)
for(r=J.w(a),q=0;q<o;++q){p=r.i(a,b+q)
if((p&255)!==p)p=255
s[q]=p}return s},
lV(a,b,c,d){var s=a?$.kk():$.kj()
if(s==null)return null
if(0===c&&d===b.length)return A.jx(s,b)
return A.jx(s,b.subarray(c,d))},
jx(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
iC(a,b,c,d,e,f){if(B.c.a2(f,4)!==0)throw A.c(A.T("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.c(A.T("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.c(A.T("Invalid base64 padding, more than two '=' characters",a,b))},
iR(a,b,c){return new A.c7(a,b)},
m4(a){return a.dE()},
lk(a,b){return new A.hm(a,[],A.mL())},
ll(a,b,c){var s,r=new A.Y(""),q=A.lk(r,b)
q.aJ(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
lX(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
dL:function dL(a,b){this.a=a
this.b=b
this.c=null},
dM:function dM(a){this.a=a},
hC:function hC(){},
hB:function hB(){},
cZ:function cZ(){},
fn:function fn(){},
aU:function aU(){},
d3:function d3(){},
d7:function d7(){},
c7:function c7(a,b){this.a=a
this.b=b},
di:function di(a,b){this.a=a
this.b=b},
dh:function dh(){},
fK:function fK(a){this.b=a},
fJ:function fJ(a){this.a=a},
hn:function hn(){},
ho:function ho(a,b){this.a=a
this.b=b},
hm:function hm(a,b,c){this.c=a
this.a=b
this.b=c},
dz:function dz(){},
h2:function h2(a){this.a=a},
hA:function hA(a){this.a=a
this.b=16
this.c=0},
cS(a){var s=A.i7(a,null)
if(s!=null)return s
throw A.c(A.T(a,null,null))},
kI(a,b){a=A.P(a,new Error())
if(a==null)a=A.bN(a)
a.stack=b.j(0)
throw a},
fN(a,b,c,d){var s,r=c?J.iP(a,d):J.iO(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
U(a,b){var s,r=A.q([],b.h("O<0>"))
for(s=J.bn(a);s.t();)B.b.m(r,b.a(s.gD()))
return r},
b3(a,b){var s,r=A.q([],b.h("O<0>"))
for(s=J.bn(a);s.t();)B.b.m(r,s.gD())
return r},
j4(a,b,c){var s,r
A.dp(b,"start")
if(c!=null){s=c-b
if(s<0)throw A.c(A.a8(c,b,null,"end",null))
if(s===0)return""}r=A.l5(a,b,c)
return r},
l5(a,b,c){var s=a.length
if(b>=s)return""
return A.kY(a,b,c==null||c>s?s:c)},
j1(a){return new A.df(a,A.kQ(a,!1,!0,!1,!1,""))},
j3(a,b,c){var s=J.bn(b)
if(!s.t())return a
if(c.length===0){do a+=A.d(s.gD())
while(s.t())}else{a+=A.d(s.gD())
while(s.t())a=a+c+A.d(s.gD())}return a},
l2(){return A.bl(new Error())},
kF(a,b,c,d,e,f,g,h,i){var s="microsecond",r=A.kZ(a,b,c,d,e,f,g,h,i)
if(r==null)return null
if(h>999)A.as(A.a8(h,0,999,s,null))
if(r<-864e13||r>864e13)A.as(A.a8(r,-864e13,864e13,"millisecondsSinceEpoch",null))
if(r===864e13&&h!==0)A.as(A.fm(h,s,"Time including microseconds is outside valid range"))
A.e7(i,"isUtc",t.y)
return new A.a5(r,h,i)},
bV(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=$.k2().d8(a)
if(c!=null){s=new A.fB()
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
j=new A.fC().$1(r[7])
i=B.c.a0(j,1000)
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
l-=f*(s.$1(r[11])+60*e)}}d=A.kF(p,o,n,m,l,k,i,j%1000,h)
if(d==null)throw A.c(A.T("Time out of range",a,null))
return d}else throw A.c(A.T("Invalid date format",a,null))},
iJ(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
kG(a){var s=Math.abs(a),r=a<0?"-":"+"
if(s>=1e5)return r+s
return r+"0"+s},
fA(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
au(a){if(a>=10)return""+a
return"0"+a},
i0(a,b){return new A.bX(1000*a+1e6*b)},
d8(a){if(typeof a=="number"||A.im(a)||a==null)return J.J(a)
if(typeof a=="string")return JSON.stringify(a)
return A.kX(a)},
kJ(a,b){A.e7(a,"error",t.K)
A.e7(b,"stackTrace",t.l)
A.kI(a,b)},
cX(a){return new A.cW(a)},
aR(a,b){return new A.ai(!1,null,b,a)},
fm(a,b,c){return new A.ai(!0,a,b,c)},
l_(a){var s=null
return new A.bz(s,s,!1,s,s,a)},
j_(a,b){return new A.bz(null,null,!0,a,b,"Value not in range")},
a8(a,b,c,d,e){return new A.bz(b,c,!0,a,d,"Invalid value")},
cm(a,b,c){if(0>a||a>c)throw A.c(A.a8(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.c(A.a8(b,a,c,"end",null))
return b}return c},
dp(a,b){if(a<0)throw A.c(A.a8(a,0,null,b,null))
return a},
c2(a,b,c,d,e){return new A.da(b,!0,a,e,"Index out of range")},
aF(a){return new A.ct(a)},
j9(a){return new A.dv(a)},
bC(a){return new A.bB(a)},
S(a){return new A.d2(a)},
T(a,b,c){return new A.av(a,b,c)},
kM(a,b,c){var s,r
if(A.it(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.q([],t.s)
B.b.m($.ad,a)
try{A.mr(a,s)}finally{if(0>=$.ad.length)return A.b($.ad,-1)
$.ad.pop()}r=A.j3(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
i3(a,b,c){var s,r
if(A.it(a))return b+"..."+c
s=new A.Y(b)
B.b.m($.ad,a)
try{r=s
r.a=A.j3(r.a,a,", ")}finally{if(0>=$.ad.length)return A.b($.ad,-1)
$.ad.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
mr(a,b){var s,r,q,p,o,n,m,l=a.gH(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.t())return
s=A.d(l.gD())
B.b.m(b,s)
k+=s.length+2;++j}if(!l.t()){if(j<=5)return
if(0>=b.length)return A.b(b,-1)
r=b.pop()
if(0>=b.length)return A.b(b,-1)
q=b.pop()}else{p=l.gD();++j
if(!l.t()){if(j<=4){B.b.m(b,A.d(p))
return}r=A.d(p)
if(0>=b.length)return A.b(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gD();++j
for(;l.t();p=o,o=n){n=l.gD();++j
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
kV(a,b){var s=B.c.gE(a)
b=B.c.gE(b)
b=A.l7(A.j5(A.j5($.km(),s),b))
return b},
cT(a){A.hV(a)},
jb(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){if(4>=a4)return A.b(a5,4)
s=((a5.charCodeAt(4)^58)*3|a5.charCodeAt(0)^100|a5.charCodeAt(1)^97|a5.charCodeAt(2)^116|a5.charCodeAt(3)^97)>>>0
if(s===0)return A.ja(a4<a4?B.a.n(a5,0,a4):a5,5,a3).gc6()
else if(s===32)return A.ja(B.a.n(a5,5,a4),0,a3).gc6()}r=A.fN(8,0,!1,t.S)
B.b.l(r,0,0)
B.b.l(r,1,-1)
B.b.l(r,2,-1)
B.b.l(r,7,-1)
B.b.l(r,3,0)
B.b.l(r,4,0)
B.b.l(r,5,a4)
B.b.l(r,6,a4)
if(A.jL(a5,0,a4,0,r)>=14)B.b.l(r,7,a4)
q=r[1]
if(q>=0)if(A.jL(a5,0,q,20,r)===20)r[7]=q
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
if(!(i&&o+1===n)){if(!B.a.L(a5,"\\",n))if(p>0)h=B.a.L(a5,"\\",p-1)||B.a.L(a5,"\\",p-2)
else h=!1
else h=!0
if(!h){if(!(m<a4&&m===n+2&&B.a.L(a5,"..",n)))h=m>n+2&&B.a.L(a5,"/..",m-3)
else h=!0
if(!h)if(q===4){if(B.a.L(a5,"file",0)){if(p<=0){if(!B.a.L(a5,"/",n)){g="file:///"
s=3}else{g="file://"
s=2}a5=g+B.a.n(a5,n,a4)
m+=s
l+=s
a4=a5.length
p=7
o=7
n=7}else if(n===m){++l
f=m+1
a5=B.a.af(a5,n,m,"/");++a4
m=f}j="file"}else if(B.a.L(a5,"http",0)){if(i&&o+3===n&&B.a.L(a5,"80",o+1)){l-=3
e=n-3
m-=3
a5=B.a.af(a5,o,n,"")
a4-=3
n=e}j="http"}}else if(q===5&&B.a.L(a5,"https",0)){if(i&&o+4===n&&B.a.L(a5,"443",o+1)){l-=4
e=n-4
m-=4
a5=B.a.af(a5,o,n,"")
a4-=3
n=e}j="https"}k=!h}}}}if(k)return new A.dT(a4<a5.length?B.a.n(a5,0,a4):a5,q,p,o,n,m,l,j)
if(j==null)if(q>0)j=A.lP(a5,0,q)
else{if(q===0)A.bM(a5,0,"Invalid empty scheme")
j=""}d=a3
if(p>0){c=q+3
b=c<p?A.lQ(a5,c,p-1):""
a=A.lL(a5,p,o,!1)
i=o+1
if(i<n){a0=A.i7(B.a.n(a5,i,n),a3)
d=A.lN(a0==null?A.as(A.T("Invalid port",a5,i)):a0,j)}}else{a=a3
b=""}a1=A.lM(a5,n,m,a3,j,a!=null)
a2=m<l?A.lO(a5,m+1,l,a3):a3
return A.lG(j,b,a,d,a1,a2,l<a4?A.lK(a5,l+1,a4):a3)},
jd(a){var s=t.N
return B.b.d9(A.q(a.split("&"),t.s),A.bw(s,s),new A.h1(B.u),t.J)},
dy(a,b,c){throw A.c(A.T("Illegal IPv4 address, "+a,b,c))},
la(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j="invalid character"
for(s=a.length,r=b,q=r,p=0,o=0;;){if(q>=c)n=0
else{if(!(q>=0&&q<s))return A.b(a,q)
n=a.charCodeAt(q)}m=n^48
if(m<=9){if(o!==0||q===r){o=o*10+m
if(o<=255){++q
continue}A.dy("each part must be in the range 0..255",a,r)}A.dy("parts must not have leading zeros",a,r)}if(q===r){if(q===c)break
A.dy(j,a,q)}l=p+1
k=e+p
d.$flags&2&&A.aQ(d)
if(!(k<16))return A.b(d,k)
d[k]=o
if(n===46){if(l<4){++q
p=l
r=q
o=0
continue}break}if(q===c){if(l===4)return
break}A.dy(j,a,q)
p=l}A.dy("IPv4 address should contain exactly 4 parts",a,q)},
lb(a,b,c){var s
if(b===c)throw A.c(A.T("Empty IP address",a,b))
if(!(b>=0&&b<a.length))return A.b(a,b)
if(a.charCodeAt(b)===118){s=A.lc(a,b,c)
if(s!=null)throw A.c(s)
return!1}A.jc(a,b,c)
return!0},
lc(a,b,c){var s,r,q,p,o,n="Missing hex-digit in IPvFuture address",m=u.f;++b
for(s=a.length,r=b;;r=q){if(r<c){q=r+1
if(!(r>=0&&r<s))return A.b(a,r)
p=a.charCodeAt(r)
if((p^48)<=9)continue
o=p|32
if(o>=97&&o<=102)continue
if(p===46){if(q-1===b)return new A.av(n,a,q)
r=q
break}return new A.av("Unexpected character",a,q-1)}if(r-1===b)return new A.av(n,a,r)
return new A.av("Missing '.' in IPvFuture address",a,r)}if(r===c)return new A.av("Missing address in IPvFuture address, host, cursor",null,null)
for(;;){if(!(r>=0&&r<s))return A.b(a,r)
p=a.charCodeAt(r)
if(!(p<128))return A.b(m,p)
if((m.charCodeAt(p)&16)!==0){++r
if(r<c)continue
return null}return new A.av("Invalid IPvFuture address character",a,r)}},
jc(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="an address must contain at most 8 parts",a2=new A.h0(a3)
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
continue}a2.$2("an IPv6 part can contain a maximum of 4 hex digits",m)}if(n>m){if(j===46){if(k){if(p<=6){A.la(a3,m,a5,s,p*2)
p+=2
n=a5
break}a2.$2(a1,m)}break}o=p*2
e=B.c.b0(l,8)
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
B.x.aM(s,a0,16,s,a)
B.x.d6(s,a,a0,0)}}return s},
lG(a,b,c,d,e,f,g){return new A.cM(a,b,c,d,e,f,g)},
jr(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
bM(a,b,c){throw A.c(A.T(c,a,b))},
lN(a,b){var s=A.jr(b)
if(a===s)return null
return a},
lL(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(b===c)return""
s=a.length
if(!(b>=0&&b<s))return A.b(a,b)
if(a.charCodeAt(b)===91){r=c-1
if(!(r>=0&&r<s))return A.b(a,r)
if(a.charCodeAt(r)!==93)A.bM(a,b,"Missing end `]` to match `[` in host")
q=b+1
if(!(q<s))return A.b(a,q)
p=""
if(a.charCodeAt(q)!==118){o=A.lI(a,q,r)
if(o<r){n=o+1
p=A.jw(a,B.a.L(a,"25",n)?o+3:n,r,"%25")}}else o=r
m=A.lb(a,q,o)
l=B.a.n(a,q,o)
return"["+(m?l.toLowerCase():l)+p+"]"}for(k=b;k<c;++k){if(!(k<s))return A.b(a,k)
if(a.charCodeAt(k)===58){o=B.a.aD(a,"%",b)
o=o>=b&&o<c?o:c
if(o<c){n=o+1
p=A.jw(a,B.a.L(a,"25",n)?o+3:n,c,"%25")}else p=""
A.jc(a,b,o)
return"["+B.a.n(a,b,o)+p+"]"}}return A.lS(a,b,c)},
lI(a,b,c){var s=B.a.aD(a,"%",b)
return s>=b&&s<c?s:c},
jw(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=d!==""?new A.Y(d):null
for(s=a.length,r=b,q=r,p=!0;r<c;){if(!(r>=0&&r<s))return A.b(a,r)
o=a.charCodeAt(r)
if(o===37){n=A.ih(a,r,!0)
m=n==null
if(m&&p){r+=3
continue}if(h==null)h=new A.Y("")
l=h.a+=B.a.n(a,q,r)
if(m)n=B.a.n(a,r,r+3)
else if(n==="%")A.bM(a,r,"ZoneID should not contain % anymore")
h.a=l+n
r+=3
q=r
p=!0}else if(o<127&&(u.f.charCodeAt(o)&1)!==0){if(p&&65<=o&&90>=o){if(h==null)h=new A.Y("")
if(q<r){h.a+=B.a.n(a,q,r)
q=r}p=!1}++r}else{k=1
if((o&64512)===55296&&r+1<c){m=r+1
if(!(m<s))return A.b(a,m)
j=a.charCodeAt(m)
if((j&64512)===56320){o=65536+((o&1023)<<10)+(j&1023)
k=2}}i=B.a.n(a,q,r)
if(h==null){h=new A.Y("")
m=h}else m=h
m.a+=i
l=A.ig(o)
m.a+=l
r+=k
q=r}}if(h==null)return B.a.n(a,b,c)
if(q<c){i=B.a.n(a,q,c)
h.a+=i}s=h.a
return s.charCodeAt(0)==0?s:s},
lS(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.f
for(s=a.length,r=b,q=r,p=null,o=!0;r<c;){if(!(r>=0&&r<s))return A.b(a,r)
n=a.charCodeAt(r)
if(n===37){m=A.ih(a,r,!0)
l=m==null
if(l&&o){r+=3
continue}if(p==null)p=new A.Y("")
k=B.a.n(a,q,r)
if(!o)k=k.toLowerCase()
j=p.a+=k
i=3
if(l)m=B.a.n(a,r,r+3)
else if(m==="%"){m="%25"
i=1}p.a=j+m
r+=i
q=r
o=!0}else if(n<127&&(g.charCodeAt(n)&32)!==0){if(o&&65<=n&&90>=n){if(p==null)p=new A.Y("")
if(q<r){p.a+=B.a.n(a,q,r)
q=r}o=!1}++r}else if(n<=93&&(g.charCodeAt(n)&1024)!==0)A.bM(a,r,"Invalid character")
else{i=1
if((n&64512)===55296&&r+1<c){l=r+1
if(!(l<s))return A.b(a,l)
h=a.charCodeAt(l)
if((h&64512)===56320){n=65536+((n&1023)<<10)+(h&1023)
i=2}}k=B.a.n(a,q,r)
if(!o)k=k.toLowerCase()
if(p==null){p=new A.Y("")
l=p}else l=p
l.a+=k
j=A.ig(n)
l.a+=j
r+=i
q=r}}if(p==null)return B.a.n(a,b,c)
if(q<c){k=B.a.n(a,q,c)
if(!o)k=k.toLowerCase()
p.a+=k}s=p.a
return s.charCodeAt(0)==0?s:s},
lP(a,b,c){var s,r,q,p
if(b===c)return""
s=a.length
if(!(b<s))return A.b(a,b)
if(!A.jt(a.charCodeAt(b)))A.bM(a,b,"Scheme not starting with alphabetic character")
for(r=b,q=!1;r<c;++r){if(!(r<s))return A.b(a,r)
p=a.charCodeAt(r)
if(!(p<128&&(u.f.charCodeAt(p)&8)!==0))A.bM(a,r,"Illegal scheme character")
if(65<=p&&p<=90)q=!0}a=B.a.n(a,b,c)
return A.lH(q?a.toLowerCase():a)},
lH(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
lQ(a,b,c){return A.cN(a,b,c,16,!1,!1)},
lM(a,b,c,d,e,f){var s=e==="file",r=s||f,q=A.cN(a,b,c,128,!0,!0)
if(q.length===0){if(s)return"/"}else if(r&&!B.a.O(q,"/"))q="/"+q
return A.lR(q,e,f)},
lR(a,b,c){var s=b.length===0
if(s&&!c&&!B.a.O(a,"/")&&!B.a.O(a,"\\"))return A.lT(a,!s||c)
return A.lU(a)},
lO(a,b,c,d){return A.cN(a,b,c,256,!0,!1)},
lK(a,b,c){return A.cN(a,b,c,256,!0,!1)},
ih(a,b,c){var s,r,q,p,o,n,m=u.f,l=b+2,k=a.length
if(l>=k)return"%"
s=b+1
if(!(s>=0&&s<k))return A.b(a,s)
r=a.charCodeAt(s)
if(!(l>=0))return A.b(a,l)
q=a.charCodeAt(l)
p=A.hO(r)
o=A.hO(q)
if(p<0||o<0)return"%"
n=p*16+o
if(n<127){if(!(n>=0))return A.b(m,n)
l=(m.charCodeAt(n)&1)!==0}else l=!1
if(l)return A.M(c&&65<=n&&90>=n?(n|32)>>>0:n)
if(r>=97||q>=97)return B.a.n(a,b,b+3).toUpperCase()
return null},
ig(a){var s,r,q,p,o,n,m,l,k="0123456789ABCDEF"
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
for(o=0;--p,p>=0;q=128){n=B.c.cN(a,6*p)&63|q
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
o+=3}}return A.j4(s,0,null)},
cN(a,b,c,d,e,f){var s=A.jv(a,b,c,d,e,f)
return s==null?B.a.n(a,b,c):s},
jv(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null,h=u.f
for(s=!e,r=a.length,q=b,p=q,o=i;q<c;){if(!(q>=0&&q<r))return A.b(a,q)
n=a.charCodeAt(q)
if(n<127&&(h.charCodeAt(n)&d)!==0)++q
else{m=1
if(n===37){l=A.ih(a,q,!1)
if(l==null){q+=3
continue}if("%"===l)l="%25"
else m=3}else if(n===92&&f)l="/"
else if(s&&n<=93&&(h.charCodeAt(n)&1024)!==0){A.bM(a,q,"Invalid character")
m=i
l=m}else{if((n&64512)===55296){k=q+1
if(k<c){if(!(k<r))return A.b(a,k)
j=a.charCodeAt(k)
if((j&64512)===56320){n=65536+((n&1023)<<10)+(j&1023)
m=2}}}l=A.ig(n)}if(o==null){o=new A.Y("")
k=o}else k=o
k.a=(k.a+=B.a.n(a,p,q))+l
if(typeof m!=="number")return A.mT(m)
q+=m
p=q}}if(o==null)return i
if(p<c){s=B.a.n(a,p,c)
o.a+=s}s=o.a
return s.charCodeAt(0)==0?s:s},
ju(a){if(B.a.O(a,"."))return!0
return B.a.bT(a,"/.")!==-1},
lU(a){var s,r,q,p,o,n,m
if(!A.ju(a))return a
s=A.q([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(n===".."){m=s.length
if(m!==0){if(0>=m)return A.b(s,-1)
s.pop()
if(s.length===0)B.b.m(s,"")}p=!0}else{p="."===n
if(!p)B.b.m(s,n)}}if(p)B.b.m(s,"")
return B.b.T(s,"/")},
lT(a,b){var s,r,q,p,o,n
if(!A.ju(a))return!b?A.js(a):a
s=A.q([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n){if(s.length!==0&&B.b.gbW(s)!==".."){if(0>=s.length)return A.b(s,-1)
s.pop()}else B.b.m(s,"..")
p=!0}else{p="."===n
if(!p)B.b.m(s,n.length===0&&s.length===0?"./":n)}}if(s.length===0)return"./"
if(p)B.b.m(s,"")
if(!b){if(0>=s.length)return A.b(s,0)
B.b.l(s,0,A.js(s[0]))}return B.b.T(s,"/")},
js(a){var s,r,q,p=u.f,o=a.length
if(o>=2&&A.jt(a.charCodeAt(0)))for(s=1;s<o;++s){r=a.charCodeAt(s)
if(r===58)return B.a.n(a,0,s)+"%3A"+B.a.aN(a,s+1)
if(r<=127){if(!(r<128))return A.b(p,r)
q=(p.charCodeAt(r)&8)===0}else q=!0
if(q)break}return a},
lJ(a,b){var s,r,q,p,o
for(s=a.length,r=0,q=0;q<2;++q){p=b+q
if(!(p<s))return A.b(a,p)
o=a.charCodeAt(p)
if(48<=o&&o<=57)r=r*16+o-48
else{o|=32
if(97<=o&&o<=102)r=r*16+o-87
else throw A.c(A.aR("Invalid URL encoding",null))}}return r},
ii(a,b,c,d,e){var s,r,q,p,o=a.length,n=b
for(;;){if(!(n<c)){s=!0
break}if(!(n<o))return A.b(a,n)
r=a.charCodeAt(n)
q=!0
if(r<=127)if(r!==37)q=r===43
if(q){s=!1
break}++n}if(s)if(B.u===d)return B.a.n(a,b,c)
else p=new A.d1(B.a.n(a,b,c))
else{p=A.q([],t.b)
for(n=b;n<c;++n){if(!(n<o))return A.b(a,n)
r=a.charCodeAt(n)
if(r>127)throw A.c(A.aR("Illegal percent encoding in URI",null))
if(r===37){if(n+3>o)throw A.c(A.aR("Truncated URI",null))
B.b.m(p,A.lJ(a,n+1))
n+=2}else if(r===43)B.b.m(p,32)
else B.b.m(p,r)}}t.L.a(p)
return B.Z.d_(p)},
jt(a){var s=a|32
return 97<=s&&s<=122},
ja(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.q([b-1],t.b)
for(s=a.length,r=b,q=-1,p=null;r<s;++r){p=a.charCodeAt(r)
if(p===44||p===59)break
if(p===47){if(q<0){q=r
continue}throw A.c(A.T(k,a,r))}}if(q<0&&r>b)throw A.c(A.T(k,a,r))
while(p!==44){B.b.m(j,r);++r
for(o=-1;r<s;++r){if(!(r>=0))return A.b(a,r)
p=a.charCodeAt(r)
if(p===61){if(o<0)o=r}else if(p===59||p===44)break}if(o>=0)B.b.m(j,o)
else{n=B.b.gbW(j)
if(p!==44||r!==n+7||!B.a.L(a,"base64",n+1))throw A.c(A.T("Expecting '='",a,r))
break}}B.b.m(j,r)
m=r+1
if((j.length&1)===1)a=B.B.dj(a,m,s)
else{l=A.jv(a,m,s,256,!0,!1)
if(l!=null)a=B.a.af(a,m,s,l)}return new A.h_(a,j,c)},
jL(a,b,c,d,e){var s,r,q,p,o,n='\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe3\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0e\x03\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\n\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\xeb\xeb\x8b\xeb\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x83\xeb\xeb\x8b\xeb\x8b\xeb\xcd\x8b\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x92\x83\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x8b\xeb\x8b\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xebD\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12D\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe8\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x05\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x10\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\f\xec\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\xec\f\xec\f\xec\xcd\f\xec\f\f\f\f\f\f\f\f\f\xec\f\f\f\f\f\f\f\f\f\f\xec\f\xec\f\xec\f\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\r\xed\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\xed\r\xed\r\xed\xed\r\xed\r\r\r\r\r\r\r\r\r\xed\r\r\r\r\r\r\r\r\r\r\xed\r\xed\r\xed\r\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0f\xea\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe9\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\t\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x11\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xe9\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\t\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x13\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\xf5\x15\x15\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5'
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
fB:function fB(){},
fC:function fC(){},
bX:function bX(a){this.a=a},
G:function G(){},
cW:function cW(a){this.a=a},
aD:function aD(){},
ai:function ai(a,b,c,d){var _=this
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
da:function da(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
ct:function ct(a){this.a=a},
dv:function dv(a){this.a=a},
bB:function bB(a){this.a=a},
d2:function d2(a){this.a=a},
dk:function dk(){},
co:function co(){},
h9:function h9(a){this.a=a},
av:function av(a,b,c){this.a=a
this.b=b
this.c=c},
j:function j(){},
aB:function aB(a,b,c){this.a=a
this.b=b
this.$ti=c},
W:function W(){},
u:function u(){},
dW:function dW(){},
Y:function Y(a){this.a=a},
h1:function h1(a){this.a=a},
h0:function h0(a){this.a=a},
cM:function cM(a,b,c,d,e,f,g){var _=this
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
dT:function dT(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=null},
dF:function dF(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
kH(a,b,c){var s,r=document.body
r.toString
s=t.ac
return t.h.a(new A.N(new A.a0(B.q.R(r,a,b,c)),s.h("E(C.E)").a(new A.fD()),s.h("N<C.E>")).gaa(0))},
bZ(a){var s,r,q="element tag unavailable"
try{s=a.tagName
s.toString
q=s}catch(r){}return q},
iM(a){var s=null
return A.iN(a,s,s,s,s,s).dv(new A.fE(),t.N)},
iN(a,b,c,d,e,f){var s,r,q=new A.Q($.I,t.ao),p=new A.cw(q,t.gD),o=new XMLHttpRequest()
o.toString
B.L.dk(o,b==null?"GET":b,a,!0)
if(d!=null)d.q(0,new A.fF(o))
s=t.gx
r=t.x
A.B(o,"load",s.a(new A.fG(o,p)),!1,r)
A.B(o,"error",s.a(p.gcZ()),!1,r)
if(e!=null)o.send(e)
else o.send()
return q},
B(a,b,c,d,e){var s=A.mG(new A.h8(c),t.B)
if(s!=null)J.kr(a,b,s,!1)
return new A.cz(a,b,s,!1,e.h("cz<0>"))},
jg(a){var s=document.createElement("a")
s.toString
s=new A.dS(s,t.d.a(window.location))
s=new A.bd(s)
s.cm(a)
return s},
li(a,b,c,d){t.h.a(a)
A.p(b)
A.p(c)
t.cr.a(d)
return!0},
lj(a,b,c,d){var s,r,q,p,o,n
t.h.a(a)
A.p(b)
A.p(c)
s=t.cr.a(d).a
r=s.a
B.A.sdc(r,c)
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
jm(){var s=t.N,r=A.iV(B.w,s),q=A.q(["TEMPLATE"],t.s),p=t.dG.a(new A.hu())
s=new A.dY(r,A.cc(s),A.cc(s),A.cc(s),null)
s.cn(null,new A.a_(B.w,p,t.e),q,null)
return s},
jC(a){var s,r="postMessage" in a
r.toString
if(r){s=A.lh(a)
return s}else return t.ch.a(a)},
lh(a){var s=window
s.toString
if(a===s)return t.ci.a(a)
else return new A.dE()},
mG(a,b){var s=$.I
if(s===B.f)return a
return s.bJ(a,b)},
f:function f(){},
bp:function bp(){},
cV:function cV(){},
bq:function bq(){},
aT:function aT(){},
bs:function bs(){},
ao:function ao(){},
aV:function aV(){},
fp:function fp(){},
aW:function aW(){},
d5:function d5(){},
bW:function bW(){},
d6:function d6(){},
bK:function bK(a,b){this.a=a
this.$ti=b},
x:function x(){},
fD:function fD(){},
e:function e(){},
z:function z(){},
d9:function d9(){},
c0:function c0(){},
aj:function aj(){},
fE:function fE(){},
fF:function fF(a){this.a=a},
fG:function fG(a,b){this.a=a
this.b=b},
c1:function c1(){},
aZ:function aZ(){},
bx:function bx(){},
a7:function a7(){},
a0:function a0(a){this.a=a},
l:function l(){},
ch:function ch(){},
al:function al(){},
b7:function b7(){},
cp:function cp(){},
fV:function fV(a){this.a=a},
cs:function cs(){},
ds:function ds(){},
dt:function dt(){},
bD:function bD(){},
b8:function b8(){},
an:function an(){},
cv:function cv(){},
bJ:function bJ(){},
cB:function cB(){},
dC:function dC(){},
dG:function dG(a){this.a=a},
dH:function dH(a){this.a=a},
i2:function i2(a,b){this.a=a
this.$ti=b},
cy:function cy(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
ba:function ba(a,b,c,d){var _=this
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
h8:function h8(a){this.a=a},
bd:function bd(a){this.a=a},
ap:function ap(){},
ci:function ci(a){this.a=a},
fR:function fR(a){this.a=a},
fQ:function fQ(a,b,c){this.a=a
this.b=b
this.c=c},
cF:function cF(){},
hs:function hs(){},
ht:function ht(){},
dY:function dY(a,b,c,d,e){var _=this
_.e=a
_.a=b
_.b=c
_.c=d
_.d=e},
hu:function hu(){},
dX:function dX(){},
aX:function aX(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.d=null
_.$ti=c},
dE:function dE(){},
dS:function dS(a,b){this.a=a
this.b=b},
cO:function cO(a){this.a=a
this.b=0},
hE:function hE(a){this.a=a},
dD:function dD(){},
dP:function dP(){},
dQ:function dQ(){},
dU:function dU(){},
dZ:function dZ(){},
e_:function e_(){},
i_(){var s=window.navigator.userAgent
s.toString
return s},
d4:function d4(){},
fo:function fo(a){this.a=a},
hk:function hk(){},
bA:function bA(){},
cY:function cY(a){this.a=a},
h:function h(){},
n_(){var s=document
s.toString
B.v.cR(s,"DOMContentLoaded",new A.hT())},
hT:function hT(){},
ec:function ec(){var _=this
_.a=null
_.b="view-dashboard"
_.d=_.c=null
_.CW=_.ay=_.ax=_.at=_.as=_.Q=_.z=_.y=_.x=_.w=_.r=_.f=_.e=$
_.cy=_.cx=null},
eJ:function eJ(){},
eH:function eH(a){this.a=a},
eI:function eI(a){this.a=a},
eh:function eh(a,b){this.a=a
this.b=b},
eg:function eg(){},
ei:function ei(a,b){this.a=a
this.b=b},
ej:function ej(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ee:function ee(a){this.a=a},
ef:function ef(a){this.a=a},
et:function et(a,b){this.a=a
this.b=b},
eu:function eu(a,b){this.a=a
this.b=b},
ev:function ev(a){this.a=a},
ed:function ed(a,b){this.a=a
this.b=b},
ew:function ew(a){this.a=a},
ex:function ex(a){this.a=a},
ey:function ey(a){this.a=a},
ez:function ez(a){this.a=a},
eA:function eA(a,b){this.a=a
this.b=b},
ek:function ek(a,b){this.a=a
this.b=b},
el:function el(a){this.a=a},
em:function em(a,b,c){this.a=a
this.b=b
this.c=c},
en:function en(a,b,c){this.a=a
this.b=b
this.c=c},
eo:function eo(a,b,c){this.a=a
this.b=b
this.c=c},
ep:function ep(a){this.a=a},
eq:function eq(a){this.a=a},
er:function er(a){this.a=a},
es:function es(a){this.a=a},
eB:function eB(){},
fe:function fe(){},
fk:function fk(a){this.a=a},
fl:function fl(a){this.a=a},
eU:function eU(){},
eV:function eV(a,b){this.a=a
this.b=b},
eT:function eT(a,b){this.a=a
this.b=b},
eW:function eW(a,b){this.a=a
this.b=b},
eS:function eS(a){this.a=a},
eX:function eX(a,b){this.a=a
this.b=b},
eQ:function eQ(a){this.a=a},
eR:function eR(a,b){this.a=a
this.b=b},
eY:function eY(a,b,c){this.a=a
this.b=b
this.c=c},
eN:function eN(a){this.a=a},
eO:function eO(a){this.a=a},
eP:function eP(a,b){this.a=a
this.b=b},
eZ:function eZ(a,b,c){this.a=a
this.b=b
this.c=c},
eL:function eL(a){this.a=a},
eM:function eM(){},
f0:function f0(a,b,c){this.a=a
this.b=b
this.c=c},
f1:function f1(a,b){this.a=a
this.b=b},
f_:function f_(a,b){this.a=a
this.b=b},
f9:function f9(){},
fa:function fa(a,b,c){this.a=a
this.b=b
this.c=c},
fb:function fb(){},
fc:function fc(){},
fd:function fd(a,b){this.a=a
this.b=b},
f2:function f2(a){this.a=a},
f3:function f3(a,b){this.a=a
this.b=b},
f4:function f4(){},
f5:function f5(a){this.a=a},
f6:function f6(a){this.a=a},
eC:function eC(a){this.a=a},
eD:function eD(a){this.a=a},
eE:function eE(a){this.a=a},
eF:function eF(a,b){this.a=a
this.b=b},
eG:function eG(a){this.a=a},
fg:function fg(a){this.a=a},
fh:function fh(a,b,c){this.a=a
this.b=b
this.c=c},
ff:function ff(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eK:function eK(a,b){this.a=a
this.b=b},
fj:function fj(a){this.a=a},
fi:function fi(){},
f7:function f7(){},
f8:function f8(a,b){this.a=a
this.b=b},
fq:function fq(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=_.r=!1},
fw:function fw(a){this.a=a},
fr:function fr(){},
fu:function fu(a){this.a=a},
fy:function fy(a){this.a=a},
fx:function fx(a){this.a=a},
fz:function fz(a){this.a=a},
fs:function fs(a){this.a=a},
ft:function ft(){},
fv:function fv(a,b){this.a=a
this.b=b},
hV(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
n7(a){throw A.P(A.iS(a),new Error())},
a3(){throw A.P(A.kR(""),new Error())},
jX(){throw A.P(A.iS(""),new Error())}},B={}
var w=[A,J,B]
var $={}
A.i4.prototype={}
J.c3.prototype={
a_(a,b){return a===b},
gE(a){return A.dm(a)},
j(a){return"Instance of '"+A.dn(a)+"'"},
gY(a){return A.bh(A.il(this))}}
J.dd.prototype={
j(a){return String(a)},
gE(a){return a?519018:218159},
gY(a){return A.bh(t.y)},
$iab:1,
$iE:1}
J.c5.prototype={
a_(a,b){return null==b},
j(a){return"null"},
gE(a){return 0},
$iab:1}
J.Z.prototype={$in:1}
J.aK.prototype={
gE(a){return 0},
j(a){return String(a)}}
J.dl.prototype={}
J.bF.prototype={}
J.ax.prototype={
j(a){var s=a[$.k1()]
if(s==null)s=a[$.k0()]
if(s==null)return this.ci(a)
return"JavaScript function for "+J.J(s)},
$iaY:1}
J.bu.prototype={
gE(a){return 0},
j(a){return String(a)}}
J.bv.prototype={
gE(a){return 0},
j(a){return String(a)}}
J.O.prototype={
m(a,b){A.L(a).c.a(b)
a.$flags&1&&A.aQ(a,29)
a.push(b)},
b3(a,b,c){var s
A.L(a).c.a(c)
a.$flags&1&&A.aQ(a,"insert",2)
s=a.length
if(b>s)throw A.c(A.j_(b,null))
a.splice(b,0,c)},
v(a,b){var s
a.$flags&1&&A.aQ(a,"remove",1)
for(s=0;s<a.length;++s)if(J.t(a[s],b)){a.splice(s,1)
return!0}return!1},
cX(a){a.$flags&1&&A.aQ(a,"clear","clear")
a.length=0},
q(a,b){var s,r
A.L(a).h("~(1)").a(b)
s=a.length
for(r=0;r<s;++r){b.$1(a[r])
if(a.length!==s)throw A.c(A.S(a))}},
ao(a,b,c){var s=A.L(a)
return new A.a_(a,s.C(c).h("1(2)").a(b),s.h("@<1>").C(c).h("a_<1,2>"))},
T(a,b){var s,r=A.fN(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.l(r,s,A.d(a[s]))
return r.join(b)},
dl(a,b){var s,r,q
A.L(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.c(A.db())
if(0>=s)return A.b(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.c(A.S(a))}return r},
d9(a,b,c,d){var s,r,q
d.a(b)
A.L(a).C(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.c(A.S(a))}return r},
bN(a,b,c){var s,r,q,p=A.L(a)
p.h("E(1)").a(b)
p.h("1()?").a(c)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.c(A.S(a))}if(c!=null)return c.$0()
throw A.c(A.db())},
bM(a,b){return this.bN(a,b,null)},
K(a,b){if(!(b>=0&&b<a.length))return A.b(a,b)
return a[b]},
gd7(a){if(a.length>0)return a[0]
throw A.c(A.db())},
gbW(a){var s=a.length
if(s>0)return a[s-1]
throw A.c(A.db())},
aw(a,b){var s,r
A.L(a).h("E(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.c(A.S(a))}return!1},
ce(a,b){var s,r,q,p,o,n=A.L(a)
n.h("i(1,1)?").a(b)
a.$flags&2&&A.aQ(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.dD()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.bR(b,2))
if(p>0)this.cJ(a,p)},
cJ(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
A(a,b){var s
for(s=0;s<a.length;++s)if(J.t(a[s],b))return!0
return!1},
gF(a){return a.length===0},
gN(a){return a.length!==0},
j(a){return A.i3(a,"[","]")},
gH(a){return new J.aS(a,a.length,A.L(a).h("aS<1>"))},
gE(a){return A.dm(a)},
gk(a){return a.length},
i(a,b){if(!(b>=0&&b<a.length))throw A.c(A.hL(a,b))
return a[b]},
l(a,b,c){var s
A.L(a).c.a(c)
a.$flags&2&&A.aQ(a)
s=a.length
if(b>=s)throw A.c(A.hL(a,b))
a[b]=c},
dd(a,b){var s
A.L(a).h("E(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$ir:1,
$ij:1,
$iH:1}
J.dc.prototype={
dz(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.dn(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.fH.prototype={}
J.aS.prototype={
gD(){var s=this.d
return s==null?this.$ti.c.a(s):s},
t(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.hW(q)
throw A.c(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$ia6:1}
J.c6.prototype={
a5(a,b){var s
A.v(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gaE(b)
if(this.gaE(a)===s)return 0
if(this.gaE(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaE(a){return a===0?1/a<0:a<0},
aA(a,b,c){if(B.c.a5(b,c)>0)throw A.c(A.iq(b))
if(this.a5(a,b)<0)return b
if(this.a5(a,c)>0)return c
return a},
p(a,b){var s
if(b>20)throw A.c(A.a8(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gaE(a))return"-"+s
return s},
j(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gE(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
a2(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
cl(a,b){if((a|0)===a)if(b>=1)return a/b|0
return this.bB(a,b)},
a0(a,b){return(a|0)===a?a/b|0:this.bB(a,b)},
bB(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.c(A.aF("Result of truncating division is "+A.d(s)+": "+A.d(a)+" ~/ "+b))},
b0(a,b){var s
if(a>0)s=this.bA(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
cN(a,b){if(0>b)throw A.c(A.iq(b))
return this.bA(a,b)},
bA(a,b){return b>31?0:a>>>b},
gY(a){return A.bh(t.n)},
$ibi:1,
$iX:1}
J.c4.prototype={
gY(a){return A.bh(t.S)},
$iab:1,
$ii:1}
J.de.prototype={
gY(a){return A.bh(t.i)},
$iab:1}
J.b_.prototype={
af(a,b,c,d){var s=A.cm(b,c,a.length)
return a.substring(0,b)+d+a.substring(s)},
L(a,b,c){var s
if(c<0||c>a.length)throw A.c(A.a8(c,0,a.length,null,null))
s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)},
O(a,b){return this.L(a,b,0)},
n(a,b,c){A.jA(c)
return a.substring(b,A.cm(b,c,a.length))},
aN(a,b){return this.n(a,b,null)},
dw(a){return a.toLowerCase()},
Z(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.b(p,0)
if(p.charCodeAt(0)===133){s=J.kO(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.b(p,r)
q=p.charCodeAt(r)===133?J.kP(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
bh(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.c(B.I)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
X(a,b,c){var s=b-a.length
if(s<=0)return a
return this.bh(c,s)+a},
aD(a,b,c){var s
if(c<0||c>a.length)throw A.c(A.a8(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
bT(a,b){return this.aD(a,b,0)},
aC(a,b,c){var s=a.length
if(c>s)throw A.c(A.a8(c,0,s,null,null))
return A.n6(a,b,c)},
A(a,b){return this.aC(a,b,0)},
j(a){return a},
gE(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gY(a){return A.bh(t.N)},
gk(a){return a.length},
$iab:1,
$ifT:1,
$ia:1}
A.c8.prototype={
j(a){return"LateInitializationError: "+this.a}}
A.d1.prototype={
gk(a){return this.a.length},
i(a,b){var s=this.a
if(!(b>=0&&b<s.length))return A.b(s,b)
return s.charCodeAt(b)}}
A.fU.prototype={}
A.r.prototype={}
A.V.prototype={
gH(a){var s=this
return new A.b1(s,s.gk(s),A.y(s).h("b1<V.E>"))},
gF(a){return this.gk(this)===0},
A(a,b){var s,r=this,q=r.gk(r)
for(s=0;s<q;++s){if(J.t(r.K(0,s),b))return!0
if(q!==r.gk(r))throw A.c(A.S(r))}return!1},
T(a,b){var s,r,q,p=this,o=p.gk(p)
if(b.length!==0){if(o===0)return""
s=A.d(p.K(0,0))
if(o!==p.gk(p))throw A.c(A.S(p))
for(r=s,q=1;q<o;++q){r=r+b+A.d(p.K(0,q))
if(o!==p.gk(p))throw A.c(A.S(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.d(p.K(0,q))
if(o!==p.gk(p))throw A.c(A.S(p))}return r.charCodeAt(0)==0?r:r}},
aI(a,b){return this.cg(0,A.y(this).h("E(V.E)").a(b))},
ao(a,b,c){var s=A.y(this)
return new A.a_(this,s.C(c).h("1(V.E)").a(b),s.h("@<V.E>").C(c).h("a_<1,2>"))},
ap(a,b){var s=A.b3(this,A.y(this).h("V.E"))
return s},
aG(a){return this.ap(0,!0)}}
A.cr.prototype={
gcB(){var s=J.a4(this.a),r=this.c
if(r==null||r>s)return s
return r},
gcO(){var s=J.a4(this.a),r=this.b
if(r>s)return s
return r},
gk(a){var s,r=J.a4(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
K(a,b){var s=this,r=s.gcO()+b
if(b<0||r>=s.gcB())throw A.c(A.c2(b,s.gk(0),s,null,"index"))
return J.iz(s.a,r)},
ap(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.w(n),l=m.gk(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.iP(0,n):J.iO(0,n)}r=A.fN(s,m.K(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.b.l(r,q,m.K(n,o+q))
if(m.gk(n)<l)throw A.c(A.S(p))}return r},
aG(a){return this.ap(0,!0)}}
A.b1.prototype={
gD(){var s=this.d
return s==null?this.$ti.c.a(s):s},
t(){var s,r=this,q=r.a,p=J.w(q),o=p.gk(q)
if(r.b!==o)throw A.c(A.S(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.K(q,s);++r.c
return!0},
$ia6:1}
A.b4.prototype={
gH(a){return new A.ce(J.bn(this.a),this.b,A.y(this).h("ce<1,2>"))},
gk(a){return J.a4(this.a)},
gF(a){return J.eb(this.a)}}
A.bY.prototype={$ir:1}
A.ce.prototype={
t(){var s=this,r=s.b
if(r.t()){s.a=s.c.$1(r.gD())
return!0}s.a=null
return!1},
gD(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$ia6:1}
A.a_.prototype={
gk(a){return J.a4(this.a)},
K(a,b){return this.b.$1(J.iz(this.a,b))}}
A.N.prototype={
gH(a){return new A.cu(J.bn(this.a),this.b,this.$ti.h("cu<1>"))}}
A.cu.prototype={
t(){var s,r
for(s=this.a,r=this.b;s.t();)if(r.$1(s.gD()))return!0
return!1},
gD(){return this.a.gD()},
$ia6:1}
A.bt.prototype={}
A.b9.prototype={
l(a,b,c){A.y(this).h("b9.E").a(c)
throw A.c(A.aF("Cannot modify an unmodifiable list"))}}
A.bG.prototype={}
A.dO.prototype={
gk(a){return J.a4(this.a)},
K(a,b){var s=J.a4(this.a)
if(0>b||b>=s)A.as(A.c2(b,s,this,null,"index"))
return b}}
A.b2.prototype={
i(a,b){return this.M(0,b)?J.k(this.a,A.aO(b)):null},
gk(a){return J.a4(this.a)},
gJ(a){return new A.dO(this.a)},
gF(a){return J.eb(this.a)},
gN(a){return J.hY(this.a)},
M(a,b){return A.ip(b)&&b>=0&&b<J.a4(this.a)},
q(a,b){var s,r,q,p
this.$ti.h("~(i,1)").a(b)
s=this.a
r=J.w(s)
q=r.gk(s)
for(p=0;p<q;++p){b.$2(p,r.i(s,p))
if(q!==r.gk(s))throw A.c(A.S(s))}}}
A.bT.prototype={
gF(a){return this.gk(this)===0},
gN(a){return this.gk(this)!==0},
j(a){return A.i6(this)},
l(a,b,c){var s=A.y(this)
s.c.a(b)
s.y[1].a(c)
A.kE()},
$io:1}
A.bU.prototype={
gk(a){return this.b.length},
gcE(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
M(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
i(a,b){if(!this.M(0,b))return null
return this.b[this.a[b]]},
q(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gcE()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])}}
A.cn.prototype={}
A.fY.prototype={
U(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.dg.prototype={
j(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.dw.prototype={
j(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.fS.prototype={
j(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.c_.prototype={}
A.cG.prototype={
j(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$iar:1}
A.aI.prototype={
j(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.jY(r==null?"unknown":r)+"'"},
$iaY:1,
gdC(){return this},
$C:"$1",
$R:1,
$D:null}
A.d_.prototype={$C:"$0",$R:0}
A.d0.prototype={$C:"$2",$R:2}
A.du.prototype={}
A.dr.prototype={
j(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.jY(s)+"'"}}
A.br.prototype={
a_(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.br))return!1
return this.$_target===b.$_target&&this.a===b.a},
gE(a){return(A.jU(this.a)^A.dm(this.$_target))>>>0},
j(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.dn(this.a)+"'")}}
A.dq.prototype={
j(a){return"RuntimeError: "+this.a}}
A.az.prototype={
gk(a){return this.a},
gF(a){return this.a===0},
gN(a){return this.a!==0},
gJ(a){return new A.b0(this,A.y(this).h("b0<1>"))},
M(a,b){var s=this.b
if(s==null)return!1
return s[b]!=null},
P(a,b){J.e9(A.y(this).h("o<1,2>").a(b),new A.fI(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.df(b)},
df(a){var s,r,q=this.d
if(q==null)return null
s=q[this.bU(a)]
r=this.bV(s,a)
if(r<0)return null
return s[r].b},
l(a,b,c){var s,r,q=this,p=A.y(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.bn(s==null?q.b=q.aZ():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.bn(r==null?q.c=q.aZ():r,b,c)}else q.dg(b,c)},
dg(a,b){var s,r,q,p,o=this,n=A.y(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.aZ()
r=o.bU(a)
q=s[r]
if(q==null)s[r]=[o.aP(a,b)]
else{p=o.bV(q,a)
if(p>=0)q[p].b=b
else q.push(o.aP(a,b))}},
q(a,b){var s,r,q=this
A.y(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.c(A.S(q))
s=s.c}},
bn(a,b,c){var s,r=A.y(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.aP(b,c)
else s.b=c},
cq(){this.r=this.r+1&1073741823},
aP(a,b){var s=this,r=A.y(s),q=new A.fL(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.cq()
return q},
bU(a){return J.ea(a)&1073741823},
bV(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.t(a[r].a,b))return r
return-1},
j(a){return A.i6(this)},
aZ(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$iiT:1}
A.fI.prototype={
$2(a,b){var s=this.a,r=A.y(s)
s.l(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.y(this.a).h("~(1,2)")}}
A.fL.prototype={}
A.b0.prototype={
gk(a){return this.a.a},
gF(a){return this.a.a===0},
gH(a){var s=this.a
return new A.c9(s,s.r,s.e,this.$ti.h("c9<1>"))},
A(a,b){return this.a.M(0,b)}}
A.c9.prototype={
gD(){return this.d},
t(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.S(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$ia6:1}
A.aA.prototype={
gk(a){return this.a.a},
gF(a){return this.a.a===0},
gH(a){var s=this.a
return new A.ca(s,s.r,s.e,this.$ti.h("ca<1>"))},
q(a,b){var s,r,q
this.$ti.h("~(1)").a(b)
s=this.a
r=s.e
q=s.r
while(r!=null){b.$1(r.b)
if(q!==s.r)throw A.c(A.S(s))
r=r.c}}}
A.ca.prototype={
gD(){return this.d},
t(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.c(A.S(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$ia6:1}
A.hP.prototype={
$1(a){return this.a(a)},
$S:13}
A.hQ.prototype={
$2(a,b){return this.a(a,b)},
$S:31}
A.hR.prototype={
$1(a){return this.a(A.p(a))},
$S:33}
A.df.prototype={
j(a){return"RegExp/"+this.a+"/"+this.b.flags},
d8(a){var s=this.b.exec(a)
if(s==null)return null
return new A.hp(s)},
$ifT:1,
$il0:1}
A.hp.prototype={}
A.cf.prototype={
cD(a,b,c,d){var s=A.a8(b,0,c,d,null)
throw A.c(s)},
bs(a,b,c,d){if(b>>>0!==b||b>c)this.cD(a,b,c,d)}}
A.aC.prototype={
gk(a){return a.length},
$iay:1}
A.aL.prototype={
l(a,b,c){A.aO(c)
a.$flags&2&&A.aQ(a)
A.ik(b,a,a.length)
a[b]=c},
aM(a,b,c,d,e){var s,r,q,p
t.hb.a(d)
a.$flags&2&&A.aQ(a,5)
if(t.eB.b(d)){s=a.length
this.bs(a,b,s,"start")
this.bs(a,c,s,"end")
if(b>c)A.as(A.a8(b,0,c,null,null))
r=c-b
if(e<0)A.as(A.aR(e,null))
q=d.length
if(q-e<r)A.as(A.bC("Not enough elements"))
p=e!==0||q!==r?d.subarray(e,e+r):d
a.set(p,b)
return}this.cj(a,b,c,d,e)},
$ir:1,
$ij:1,
$iH:1}
A.dj.prototype={
gY(a){return B.W},
i(a,b){A.ik(b,a,a.length)
return a[b]},
$iab:1}
A.cg.prototype={
gY(a){return B.Y},
gk(a){return a.length},
i(a,b){A.ik(b,a,a.length)
return a[b]},
$iab:1,
$iia:1}
A.cC.prototype={}
A.cD.prototype={}
A.am.prototype={
h(a){return A.hz(v.typeUniverse,this,a)},
C(a){return A.lD(v.typeUniverse,this,a)}}
A.dJ.prototype={}
A.hx.prototype={
j(a){return A.a1(this.a,null)}}
A.dI.prototype={
j(a){return this.a}}
A.bL.prototype={$iaD:1}
A.h5.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:18}
A.h4.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:19}
A.h6.prototype={
$0(){this.a.$0()},
$S:7}
A.h7.prototype={
$0(){this.a.$0()},
$S:7}
A.cH.prototype={
co(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(A.bR(new A.hw(this,b),0),a)
else throw A.c(A.aF("`setTimeout()` not found."))},
cp(a,b){if(self.setTimeout!=null)this.b=self.setInterval(A.bR(new A.hv(this,a,Date.now(),b),0),a)
else throw A.c(A.aF("Periodic timer."))},
cW(){if(self.setTimeout!=null){var s=this.b
if(s==null)return
if(this.a)self.clearTimeout(s)
else self.clearInterval(s)
this.b=null}else throw A.c(A.aF("Canceling a timer."))},
$ibE:1}
A.hw.prototype={
$0(){var s=this.a
s.b=null
s.c=1
this.b.$0()},
$S:2}
A.hv.prototype={
$0(){var s,r=this,q=r.a,p=q.c+1,o=r.b
if(o>0){s=Date.now()-r.c
if(s>(p+1)*o)p=B.c.cl(s,o)}q.c=p
r.d.$1(q)},
$S:7}
A.dA.prototype={
b1(a,b){var s,r=this,q=r.$ti
q.h("1/?").a(b)
if(b==null)b=q.c.a(b)
if(!r.b)r.a.bp(b)
else{s=r.a
if(q.h("aw<1>").b(b))s.br(b)
else s.bt(b)}},
aB(a,b){var s=this.a
if(this.b)s.aT(new A.ae(a,b))
else s.aR(new A.ae(a,b))}}
A.hF.prototype={
$1(a){return this.a.$2(0,a)},
$S:35}
A.hG.prototype={
$2(a,b){this.a.$2(1,new A.c_(a,t.l.a(b)))},
$S:48}
A.hK.prototype={
$2(a,b){this.a(A.aO(a),b)},
$S:22}
A.ae.prototype={
j(a){return A.d(this.a)},
$iG:1,
gai(){return this.b}}
A.cx.prototype={
aB(a,b){var s=this.a
if((s.a&30)!==0)throw A.c(A.bC("Future already completed"))
s.aR(A.mf(a,b))},
bL(a){return this.aB(a,null)}}
A.cw.prototype={
b1(a,b){var s,r=this.$ti
r.h("1/?").a(b)
s=this.a
if((s.a&30)!==0)throw A.c(A.bC("Future already completed"))
s.bp(r.h("1/").a(b))}}
A.bb.prototype={
dh(a){if((this.c&15)!==6)return!0
return this.b.b.ba(t.al.a(this.d),a.a,t.y,t.K)},
da(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.W.b(q))p=l.ds(q,m,a.b,o,n,t.l)
else p=l.ba(t.v.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.eK.b(A.ah(s))){if((r.c&1)!==0)throw A.c(A.aR("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.c(A.aR("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.Q.prototype={
bb(a,b,c){var s,r,q,p=this.$ti
p.C(c).h("1/(2)").a(a)
s=$.I
if(s===B.f){if(b!=null&&!t.W.b(b)&&!t.v.b(b))throw A.c(A.fm(b,"onError",u.c))}else{c.h("@<0/>").C(p.c).h("1(2)").a(a)
if(b!=null)b=A.mv(b,s)}r=new A.Q(s,c.h("Q<0>"))
q=b==null?1:3
this.aQ(new A.bb(r,q,a,b,p.h("@<1>").C(c).h("bb<1,2>")))
return r},
dv(a,b){return this.bb(a,null,b)},
bD(a,b,c){var s,r=this.$ti
r.C(c).h("1/(2)").a(a)
s=new A.Q($.I,c.h("Q<0>"))
this.aQ(new A.bb(s,19,a,b,r.h("@<1>").C(c).h("bb<1,2>")))
return s},
cM(a){this.a=this.a&1|16
this.c=a},
au(a){this.a=a.a&30|this.a&1
this.c=a.c},
aQ(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.aQ(a)
return}r.au(s)}A.e5(null,null,r.b,t.M.a(new A.ha(r,a)))}},
bx(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t._.a(m.c)
if((n.a&24)===0){n.bx(a)
return}m.au(n)}l.a=m.av(a)
A.e5(null,null,m.b,t.M.a(new A.he(l,m)))}},
ak(){var s=t.F.a(this.c)
this.c=null
return this.av(s)},
av(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bt(a){var s,r=this
r.$ti.c.a(a)
s=r.ak()
r.a=8
r.c=a
A.bc(r,s)},
cv(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.ak()
q.au(a)
A.bc(q,r)},
aT(a){var s=this.ak()
this.cM(a)
A.bc(this,s)},
bp(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("aw<1>").b(a)){this.br(a)
return}this.ct(a)},
ct(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.e5(null,null,s.b,t.M.a(new A.hc(s,a)))},
br(a){A.ib(this.$ti.h("aw<1>").a(a),this,!1)
return},
aR(a){this.a^=2
A.e5(null,null,this.b,t.M.a(new A.hb(this,a)))},
$iaw:1}
A.ha.prototype={
$0(){A.bc(this.a,this.b)},
$S:2}
A.he.prototype={
$0(){A.bc(this.b,this.a.a)},
$S:2}
A.hd.prototype={
$0(){A.ib(this.a.a,this.b,!0)},
$S:2}
A.hc.prototype={
$0(){this.a.bt(this.b)},
$S:2}
A.hb.prototype={
$0(){this.a.aT(this.b)},
$S:2}
A.hh.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dr(t.fO.a(q.d),t.z)}catch(p){s=A.ah(p)
r=A.bl(p)
if(k.c&&t.u.a(k.b.a.c).a===s){q=k.a
q.c=t.u.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.hZ(q)
n=k.a
n.c=new A.ae(q,o)
q=n}q.b=!0
return}if(j instanceof A.Q&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.u.a(j.c)
q.b=!0}return}if(j instanceof A.Q){m=k.b.a
l=new A.Q(m.b,m.$ti)
j.bb(new A.hi(l,m),new A.hj(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:2}
A.hi.prototype={
$1(a){this.a.cv(this.b)},
$S:18}
A.hj.prototype={
$2(a,b){A.bN(a)
t.l.a(b)
this.a.aT(new A.ae(a,b))},
$S:20}
A.hg.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.ba(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.ah(l)
r=A.bl(l)
q=s
p=r
if(p==null)p=A.hZ(q)
o=this.a
o.c=new A.ae(q,p)
o.b=!0}},
$S:2}
A.hf.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.u.a(l.a.a.c)
p=l.b
if(p.a.dh(s)&&p.a.e!=null){p.c=p.a.da(s)
p.b=!1}}catch(o){r=A.ah(o)
q=A.bl(o)
p=t.u.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.hZ(p)
m=l.b
m.c=new A.ae(p,n)
p=m}p.b=!0}},
$S:2}
A.dB.prototype={}
A.cq.prototype={
gk(a){var s,r,q=this,p={},o=new A.Q($.I,t.fJ)
p.a=0
s=A.y(q)
r=s.h("~(1)?").a(new A.fW(p,q))
t.g5.a(new A.fX(p,o))
A.B(q.a,q.b,r,!1,s.c)
return o}}
A.fW.prototype={
$1(a){A.y(this.b).c.a(a);++this.a.a},
$S(){return A.y(this.b).h("~(1)")}}
A.fX.prototype={
$0(){var s=this.b,r=s.$ti,q=r.h("1/").a(this.a.a),p=s.ak()
r.c.a(q)
s.a=8
s.c=q
A.bc(s,p)},
$S:2}
A.dV.prototype={}
A.cP.prototype={$ije:1}
A.dR.prototype={
dt(a){var s,r,q
t.M.a(a)
try{if(B.f===$.I){a.$0()
return}A.jI(null,null,this,a,t.H)}catch(q){s=A.ah(q)
r=A.bl(q)
A.hI(A.bN(s),t.l.a(r))}},
du(a,b,c){var s,r,q
c.h("~(0)").a(a)
c.a(b)
try{if(B.f===$.I){a.$1(b)
return}A.jJ(null,null,this,a,b,t.H,c)}catch(q){s=A.ah(q)
r=A.bl(q)
A.hI(A.bN(s),t.l.a(r))}},
bI(a){return new A.hq(this,t.M.a(a))},
bJ(a,b){return new A.hr(this,b.h("~(0)").a(a),b)},
dr(a,b){b.h("0()").a(a)
if($.I===B.f)return a.$0()
return A.jI(null,null,this,a,b)},
ba(a,b,c,d){c.h("@<0>").C(d).h("1(2)").a(a)
d.a(b)
if($.I===B.f)return a.$1(b)
return A.jJ(null,null,this,a,b,c,d)},
ds(a,b,c,d,e,f){d.h("@<0>").C(e).C(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.I===B.f)return a.$2(b,c)
return A.mw(null,null,this,a,b,c,d,e,f)},
c0(a,b,c,d){return b.h("@<0>").C(c).C(d).h("1(2,3)").a(a)}}
A.hq.prototype={
$0(){return this.a.dt(this.b)},
$S:2}
A.hr.prototype={
$1(a){var s=this.c
return this.a.du(this.b,s.a(a),s)},
$S(){return this.c.h("~(0)")}}
A.hJ.prototype={
$0(){A.kJ(this.a,this.b)},
$S:2}
A.cA.prototype={
gH(a){var s=this,r=new A.be(s,s.r,A.y(s).h("be<1>"))
r.c=s.e
return r},
gk(a){return this.a},
gF(a){return this.a===0},
A(a,b){var s,r
if(b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else{r=this.cz(b)
return r}},
cz(a){var s=this.d
if(s==null)return!1
return this.aY(s[this.aU(a)],a)>=0},
m(a,b){var s,r,q=this
A.y(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.bo(s==null?q.b=A.ic():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.bo(r==null?q.c=A.ic():r,b)}else return q.cr(b)},
cr(a){var s,r,q,p=this
A.y(p).c.a(a)
s=p.d
if(s==null)s=p.d=A.ic()
r=p.aU(a)
q=s[r]
if(q==null)s[r]=[p.b_(a)]
else{if(p.aY(q,a)>=0)return!1
q.push(p.b_(a))}return!0},
v(a,b){var s
if(b!=="__proto__")return this.cH(this.b,b)
else{s=this.cG(b)
return s}},
cG(a){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.aU(a)
r=n[s]
q=o.aY(r,a)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.bE(p)
return!0},
bo(a,b){A.y(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.b_(b)
return!0},
cH(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.bE(s)
delete a[b]
return!0},
bv(){this.r=this.r+1&1073741823},
b_(a){var s,r=this,q=new A.dN(A.y(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.bv()
return q},
bE(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.bv()},
aU(a){return J.ea(a)&1073741823},
aY(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.t(a[r].a,b))return r
return-1}}
A.dN.prototype={}
A.be.prototype={
gD(){var s=this.d
return s==null?this.$ti.c.a(s):s},
t(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.c(A.S(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$ia6:1}
A.fM.prototype={
$2(a,b){this.a.l(0,this.b.a(a),this.c.a(b))},
$S:23}
A.C.prototype={
gH(a){return new A.b1(a,this.gk(a),A.a2(a).h("b1<C.E>"))},
K(a,b){return this.i(a,b)},
q(a,b){var s,r
A.a2(a).h("~(C.E)").a(b)
s=this.gk(a)
for(r=0;r<s;++r){b.$1(this.i(a,r))
if(s!==this.gk(a))throw A.c(A.S(a))}},
gF(a){return this.gk(a)===0},
gN(a){return this.gk(a)!==0},
ao(a,b,c){var s=A.a2(a)
return new A.a_(a,s.C(c).h("1(C.E)").a(b),s.h("@<C.E>").C(c).h("a_<1,2>"))},
d6(a,b,c,d){var s
A.a2(a).h("C.E?").a(d)
A.cm(b,c,this.gk(a))
for(s=b;s<c;++s)this.l(a,s,d)},
aM(a,b,c,d,e){var s,r,q
A.a2(a).h("j<C.E>").a(d)
A.cm(b,c,this.gk(a))
s=c-b
if(s===0)return
A.dp(e,"skipCount")
r=J.w(d)
if(e+s>r.gk(d))throw A.c(A.bC("Too few elements"))
if(e<b)for(q=s-1;q>=0;--q)this.l(a,b+q,r.i(d,e+q))
else for(q=0;q<s;++q)this.l(a,b+q,r.i(d,e+q))},
j(a){return A.i3(a,"[","]")},
$ir:1,
$ij:1,
$iH:1}
A.A.prototype={
q(a,b){var s,r,q,p=A.a2(a)
p.h("~(A.K,A.V)").a(b)
for(s=J.bn(this.gJ(a)),p=p.h("A.V");s.t();){r=s.gD()
q=this.i(a,r)
b.$2(r,q==null?p.a(q):q)}},
gd5(a){return J.iA(this.gJ(a),new A.fO(a),A.a2(a).h("aB<A.K,A.V>"))},
M(a,b){return J.iy(this.gJ(a),b)},
gk(a){return J.a4(this.gJ(a))},
gF(a){return J.eb(this.gJ(a))},
gN(a){return J.hY(this.gJ(a))},
j(a){return A.i6(a)},
$io:1}
A.fO.prototype={
$1(a){var s=this.a,r=A.a2(s)
r.h("A.K").a(a)
s=J.k(s,a)
if(s==null)s=r.h("A.V").a(s)
return new A.aB(a,s,r.h("aB<A.K,A.V>"))},
$S(){return A.a2(this.a).h("aB<A.K,A.V>(A.K)")}}
A.fP.prototype={
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
l(a,b,c){var s=A.y(this)
s.h("ac.K").a(b)
s.h("ac.V").a(c)
throw A.c(A.aF("Cannot modify unmodifiable map"))}}
A.cd.prototype={
i(a,b){return J.k(this.a,b)},
l(a,b,c){var s=this.$ti
J.aG(this.a,s.c.a(b),s.y[1].a(c))},
M(a,b){return J.hX(this.a,b)},
q(a,b){J.e9(this.a,this.$ti.h("~(1,2)").a(b))},
gF(a){return J.eb(this.a)},
gN(a){return J.hY(this.a)},
gk(a){return J.a4(this.a)},
j(a){return J.J(this.a)},
$io:1}
A.bI.prototype={}
A.aa.prototype={
gF(a){return this.gk(this)===0},
P(a,b){var s
for(s=J.bn(A.y(this).h("j<aa.E>").a(b));s.t();)this.m(0,s.gD())},
j(a){return A.i3(this,"{","}")},
T(a,b){var s,r,q,p,o=this.gH(this)
if(!o.t())return""
s=o.d
r=J.J(s==null?o.$ti.c.a(s):s)
if(!o.t())return r
s=o.$ti.c
if(b.length===0){q=r
do{p=o.d
q+=A.d(p==null?s.a(p):p)}while(o.t())
s=q}else{q=r
do{p=o.d
q=q+b+A.d(p==null?s.a(p):p)}while(o.t())
s=q}return s.charCodeAt(0)==0?s:s},
$ir:1,
$ij:1,
$iaq:1}
A.cE.prototype={}
A.cL.prototype={}
A.dL.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.cF(b):s}},
gk(a){return this.b==null?this.c.a:this.aj().length},
gF(a){return this.gk(0)===0},
gN(a){return this.gk(0)>0},
gJ(a){var s
if(this.b==null){s=this.c
return new A.b0(s,A.y(s).h("b0<1>"))}return new A.dM(this)},
l(a,b,c){var s,r,q=this
if(q.b==null)q.c.l(0,b,c)
else if(q.M(0,b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.cQ().l(0,b,c)},
M(a,b){if(this.b==null)return this.c.M(0,b)
return Object.prototype.hasOwnProperty.call(this.a,b)},
q(a,b){var s,r,q,p,o=this
t.cA.a(b)
if(o.b==null)return o.c.q(0,b)
s=o.aj()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.hH(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.c(A.S(o))}},
aj(){var s=t.bM.a(this.c)
if(s==null)s=this.c=A.q(Object.keys(this.a),t.s)
return s},
cQ(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.bw(t.N,t.z)
r=n.aj()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.l(0,o,n.i(0,o))}if(p===0)B.b.m(r,"")
else B.b.cX(r)
n.a=n.b=null
return n.c=s},
cF(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.hH(this.a[a])
return this.b[a]=s}}
A.dM.prototype={
gk(a){return this.a.gk(0)},
K(a,b){var s=this.a
if(s.b==null)s=s.gJ(0).K(0,b)
else{s=s.aj()
if(!(b>=0&&b<s.length))return A.b(s,b)
s=s[b]}return s},
gH(a){var s=this.a
if(s.b==null){s=s.gJ(0)
s=s.gH(s)}else{s=s.aj()
s=new J.aS(s,s.length,A.L(s).h("aS<1>"))}return s},
A(a,b){return this.a.M(0,b)}}
A.hC.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:11}
A.hB.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:11}
A.cZ.prototype={
dj(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a1="Invalid base64 encoding length ",a2=a3.length
a5=A.cm(a4,a5,a2)
s=$.kh()
for(r=s.length,q=a4,p=q,o=null,n=-1,m=-1,l=0;q<a5;q=k){k=q+1
if(!(q<a2))return A.b(a3,q)
j=a3.charCodeAt(q)
if(j===37){i=k+2
if(i<=a5){if(!(k<a2))return A.b(a3,k)
h=A.hO(a3.charCodeAt(k))
g=k+1
if(!(g<a2))return A.b(a3,g)
f=A.hO(a3.charCodeAt(g))
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
if(j===61)continue}j=e}if(d!==-2){if(o==null){o=new A.Y("")
g=o}else g=o
g.a+=B.a.n(a3,p,q)
c=A.M(j)
g.a+=c
p=k
continue}}throw A.c(A.T("Invalid base64 data",a3,q))}if(o!=null){a2=B.a.n(a3,p,a5)
a2=o.a+=a2
r=a2.length
if(n>=0)A.iC(a3,m,a5,n,l,r)
else{b=B.c.a2(r-1,4)+1
if(b===1)throw A.c(A.T(a1,a3,a5))
while(b<4){a2+="="
o.a=a2;++b}}a2=o.a
return B.a.af(a3,a4,a5,a2.charCodeAt(0)==0?a2:a2)}a=a5-a4
if(n>=0)A.iC(a3,m,a5,n,l,a)
else{b=B.c.a2(a,4)
if(b===1)throw A.c(A.T(a1,a3,a5))
if(b>1)a3=B.a.af(a3,a5,a5,b===2?"==":"=")}return a3}}
A.fn.prototype={}
A.aU.prototype={}
A.d3.prototype={}
A.d7.prototype={}
A.c7.prototype={
j(a){var s=A.d8(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.di.prototype={
j(a){return"Cyclic error in JSON stringify"}}
A.dh.prototype={
S(a,b){var s=A.mt(b,this.gd3().a)
return s},
u(a){var s=A.ll(a,this.gd4().b,null)
return s},
gd4(){return B.Q},
gd3(){return B.P}}
A.fK.prototype={}
A.fJ.prototype={}
A.hn.prototype={
c9(a){var s,r,q,p,o,n,m=a.length
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
aS(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.c(new A.di(a,null))}B.b.m(s,a)},
aJ(a){var s,r,q,p,o=this
if(o.c8(a))return
o.aS(a)
try{s=o.b.$1(a)
if(!o.c8(s)){q=A.iR(a,null,o.gbw())
throw A.c(q)}q=o.a
if(0>=q.length)return A.b(q,-1)
q.pop()}catch(p){r=A.ah(p)
q=A.iR(a,r,o.gbw())
throw A.c(q)}},
c8(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.d.j(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.c9(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.aS(a)
q.dA(a)
s=q.a
if(0>=s.length)return A.b(s,-1)
s.pop()
return!0}else if(t.G.b(a)){q.aS(a)
r=q.dB(a)
s=q.a
if(0>=s.length)return A.b(s,-1)
s.pop()
return r}else return!1},
dA(a){var s,r,q=this.c
q.a+="["
s=J.w(a)
if(s.gN(a)){this.aJ(s.i(a,0))
for(r=1;r<s.gk(a);++r){q.a+=","
this.aJ(s.i(a,r))}}q.a+="]"},
dB(a){var s,r,q,p,o,n=this,m={},l=J.w(a)
if(l.gF(a)){n.c.a+="{}"
return!0}s=l.gk(a)*2
r=A.fN(s,null,!1,t.X)
q=m.a=0
m.b=!0
l.q(a,new A.ho(m,r))
if(!m.b)return!1
l=n.c
l.a+="{"
for(p='"';q<s;q+=2,p=',"'){l.a+=p
n.c9(A.p(r[q]))
l.a+='":'
o=q+1
if(!(o<s))return A.b(r,o)
n.aJ(r[o])}l.a+="}"
return!0}}
A.ho.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.b.l(s,r.a++,a)
B.b.l(s,r.a++,b)},
$S:10}
A.hm.prototype={
gbw(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.dz.prototype={}
A.h2.prototype={
d_(a){return new A.hA(this.a).cA(t.L.a(a),0,null,!0)}}
A.hA.prototype={
cA(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(a)
s=A.cm(b,c,J.a4(a))
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.lW(a,b,s)
s-=b
p=b
b=0}if(s-b>=15){o=l.a
n=A.lV(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.aV(q,b,s,!0)
o=l.b
if((o&1)!==0){m=A.lX(o)
l.b=0
throw A.c(A.T(m,a,p+l.c))}return n},
aV(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.c.a0(b+c,2)
r=q.aV(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.aV(a,s,c,d)}return q.d2(a,b,c,d)},
d2(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.Y(""),d=b+1,c=a.length
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
e.a+=p}else{p=A.j4(a,d,n)
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
gE(a){return A.kV(this.a,this.b)},
a5(a,b){var s
t.dy.a(b)
s=B.c.a5(this.a,b.a)
if(s!==0)return s
return B.c.a5(this.b,b.b)},
aH(){var s=this
if(s.c)return new A.a5(s.a,s.b,!1)
return s},
ah(){var s=this
if(s.c)return s
return new A.a5(s.a,s.b,!0)},
j(a){var s=this,r=A.iJ(A.b5(s)),q=A.au(A.cl(s)),p=A.au(A.ck(s)),o=A.au(A.aM(s)),n=A.au(A.by(s)),m=A.au(A.iY(s)),l=A.fA(A.iX(s)),k=s.b,j=k===0?"":A.fA(k)
k=r+"-"+q
if(s.c)return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j},
ag(){var s=this,r=A.b5(s)>=-9999&&A.b5(s)<=9999?A.iJ(A.b5(s)):A.kG(A.b5(s)),q=A.au(A.cl(s)),p=A.au(A.ck(s)),o=A.au(A.aM(s)),n=A.au(A.by(s)),m=A.au(A.iY(s)),l=A.fA(A.iX(s)),k=s.b,j=k===0?"":A.fA(k)
k=r+"-"+q
if(s.c)return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j}}
A.fB.prototype={
$1(a){if(a==null)return 0
return A.cS(a)},
$S:12}
A.fC.prototype={
$1(a){var s,r,q
if(a==null)return 0
for(s=a.length,r=0,q=0;q<6;++q){r*=10
if(q<s){if(!(q<s))return A.b(a,q)
r+=a.charCodeAt(q)^48}}return r},
$S:12}
A.bX.prototype={
a_(a,b){if(b==null)return!1
return b instanceof A.bX&&this.a===b.a},
gE(a){return B.c.gE(this.a)},
j(a){var s,r,q,p,o=this.a,n=B.c.a0(o,36e8)
o%=36e8
s=B.c.a0(o,6e7)
o%=6e7
r=s<10?"0":""
q=B.c.a0(o,1e6)
p=q<10?"0":""
return""+n+":"+r+s+":"+p+q+"."+B.a.X(B.c.j(o%1e6),6,"0")}}
A.G.prototype={
gai(){return A.kW(this)}}
A.cW.prototype={
j(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.d8(s)
return"Assertion failed"}}
A.aD.prototype={}
A.ai.prototype={
gaX(){return"Invalid argument"+(!this.a?"(s)":"")},
gaW(){return""},
j(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.d(p),n=s.gaX()+q+o
if(!s.a)return n
return n+s.gaW()+": "+A.d8(s.gb4())},
gb4(){return this.b}}
A.bz.prototype={
gb4(){return A.jB(this.b)},
gaX(){return"RangeError"},
gaW(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.d(q):""
else if(q==null)s=": Not greater than or equal to "+A.d(r)
else if(q>r)s=": Not in inclusive range "+A.d(r)+".."+A.d(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.d(r)
return s}}
A.da.prototype={
gb4(){return A.aO(this.b)},
gaX(){return"RangeError"},
gaW(){if(A.aO(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gk(a){return this.f}}
A.ct.prototype={
j(a){return"Unsupported operation: "+this.a}}
A.dv.prototype={
j(a){return"UnimplementedError: "+this.a}}
A.bB.prototype={
j(a){return"Bad state: "+this.a}}
A.d2.prototype={
j(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.d8(s)+"."}}
A.dk.prototype={
j(a){return"Out of Memory"},
gai(){return null},
$iG:1}
A.co.prototype={
j(a){return"Stack Overflow"},
gai(){return null},
$iG:1}
A.h9.prototype={
j(a){return"Exception: "+this.a}}
A.av.prototype={
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
k=""}return g+l+B.a.n(e,i,j)+k+"\n"+B.a.bh(" ",f-i+l.length)+"^\n"}else return f!=null?g+(" (at offset "+A.d(f)+")"):g}}
A.j.prototype={
ao(a,b,c){var s=A.y(this)
return A.kS(this,s.C(c).h("1(j.E)").a(b),s.h("j.E"),c)},
aI(a,b){var s=A.y(this)
return new A.N(this,s.h("E(j.E)").a(b),s.h("N<j.E>"))},
ap(a,b){var s=A.b3(this,A.y(this).h("j.E"))
return s},
aG(a){return this.ap(0,!0)},
gk(a){var s,r=this.gH(this)
for(s=0;r.t();)++s
return s},
gF(a){return!this.gH(this).t()},
gN(a){return!this.gF(this)},
gaa(a){var s,r=this.gH(this)
if(!r.t())throw A.c(A.db())
s=r.gD()
if(r.t())throw A.c(A.kL())
return s},
K(a,b){var s,r
A.dp(b,"index")
s=this.gH(this)
for(r=b;s.t();){if(r===0)return s.gD();--r}throw A.c(A.c2(b,b-r,this,null,"index"))},
j(a){return A.kM(this,"(",")")}}
A.aB.prototype={
j(a){return"MapEntry("+A.d(this.a)+": "+A.d(this.b)+")"}}
A.W.prototype={
gE(a){return A.u.prototype.gE.call(this,0)},
j(a){return"null"}}
A.u.prototype={$iu:1,
a_(a,b){return this===b},
gE(a){return A.dm(this)},
j(a){return"Instance of '"+A.dn(this)+"'"},
gY(a){return A.mP(this)},
toString(){return this.j(this)}}
A.dW.prototype={
j(a){return""},
$iar:1}
A.Y.prototype={
gk(a){return this.a.length},
j(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$il4:1}
A.h1.prototype={
$2(a,b){var s,r,q,p
t.J.a(a)
A.p(b)
s=B.a.bT(b,"=")
if(s===-1){if(b!=="")J.aG(a,A.ii(b,0,b.length,this.a,!0),"")}else if(s!==0){r=B.a.n(b,0,s)
q=B.a.aN(b,s+1)
p=this.a
J.aG(a,A.ii(r,0,r.length,p,!0),A.ii(q,0,q.length,p,!0))}return a},
$S:24}
A.h0.prototype={
$2(a,b){throw A.c(A.T("Illegal IPv6 address, "+a,this.a,b))},
$S:32}
A.cM.prototype={
gbC(){var s,r,q,p,o=this,n=o.w
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
gE(a){var s,r=this,q=r.y
if(q===$){s=B.a.gE(r.gbC())
r.y!==$&&A.jX()
r.y=s
q=s}return q},
gb7(){var s,r=this,q=r.z
if(q===$){s=r.f
s=A.jd(s==null?"":s)
r.z!==$&&A.jX()
q=r.z=new A.bI(s,t.dw)}return q},
gc7(){return this.b},
gb2(a){var s=this.c
if(s==null)return""
if(B.a.O(s,"[")&&!B.a.L(s,"v",1))return B.a.n(s,1,s.length-1)
return s},
gb5(a){var s=this.d
return s==null?A.jr(this.a):s},
gb6(){var s=this.f
return s==null?"":s},
gbO(){var s=this.r
return s==null?"":s},
gbP(){return this.c!=null},
gbS(){return this.f!=null},
gbR(){return this.r!=null},
j(a){return this.gbC()},
a_(a,b){var s,r,q,p=this
if(b==null)return!1
if(p===b)return!0
s=!1
if(t.dD.b(b))if(p.a===b.gbj())if(p.c!=null===b.gbP())if(p.b===b.gc7())if(p.gb2(0)===b.gb2(b))if(p.gb5(0)===b.gb5(b))if(p.e===b.gc_(b)){r=p.f
q=r==null
if(!q===b.gbS()){if(q)r=""
if(r===b.gb6()){r=p.r
q=r==null
if(!q===b.gbR()){s=q?"":r
s=s===b.gbO()}}}}return s},
$idx:1,
gbj(){return this.a},
gc_(a){return this.e}}
A.h_.prototype={
gc6(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.b(m,0)
s=o.a
m=m[0]+1
r=B.a.aD(s,"?",m)
q=s.length
if(r>=0){p=A.cN(s,r+1,q,256,!1,!1)
q=r}else p=n
m=o.c=new A.dF("data","",n,n,A.cN(s,m,q,128,!1,!1),p,n)}return m},
j(a){var s,r=this.b
if(0>=r.length)return A.b(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.dT.prototype={
gbP(){return this.c>0},
gbS(){return this.f<this.r},
gbR(){return this.r<this.a.length},
gbj(){var s=this.w
return s==null?this.w=this.cw():s},
cw(){var s,r=this,q=r.b
if(q<=0)return""
s=q===4
if(s&&B.a.O(r.a,"http"))return"http"
if(q===5&&B.a.O(r.a,"https"))return"https"
if(s&&B.a.O(r.a,"file"))return"file"
if(q===7&&B.a.O(r.a,"package"))return"package"
return B.a.n(r.a,0,q)},
gc7(){var s=this.c,r=this.b+3
return s>r?B.a.n(this.a,r,s-1):""},
gb2(a){var s=this.c
return s>0?B.a.n(this.a,s,this.d):""},
gb5(a){var s,r=this
if(r.c>0&&r.d+1<r.e)return A.cS(B.a.n(r.a,r.d+1,r.e))
s=r.b
if(s===4&&B.a.O(r.a,"http"))return 80
if(s===5&&B.a.O(r.a,"https"))return 443
return 0},
gc_(a){return B.a.n(this.a,this.e,this.f)},
gb6(){var s=this.f,r=this.r
return s<r?B.a.n(this.a,s+1,r):""},
gbO(){var s=this.r,r=this.a
return s<r.length?B.a.aN(r,s+1):""},
gb7(){if(this.f>=this.r)return B.U
return new A.bI(A.jd(this.gb6()),t.dw)},
gE(a){var s=this.x
return s==null?this.x=B.a.gE(this.a):s},
a_(a,b){if(b==null)return!1
if(this===b)return!0
return t.dD.b(b)&&this.a===b.j(0)},
j(a){return this.a},
$idx:1}
A.dF.prototype={}
A.f.prototype={$if:1}
A.bp.prototype={
sdc(a,b){a.href=b},
j(a){var s=String(a)
s.toString
return s},
$ibp:1}
A.cV.prototype={
j(a){var s=String(a)
s.toString
return s}}
A.bq.prototype={$ibq:1}
A.aT.prototype={$iaT:1}
A.bs.prototype={$ibs:1}
A.ao.prototype={
gk(a){return a.length}}
A.aV.prototype={
bq(a,b){var s=$.k_(),r=s[b]
if(typeof r=="string")return r
r=this.cP(a,b)
s[b]=r
return r},
cP(a,b){var s,r=b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()})
r.toString
r=r in a
r.toString
if(r)return b
s=$.k3()+b
r=s in a
r.toString
if(r)return s
return b},
bz(a,b,c,d){a.setProperty(b,c,d)},
gk(a){var s=a.length
s.toString
return s}}
A.fp.prototype={}
A.aW.prototype={}
A.d5.prototype={
j(a){var s=String(a)
s.toString
return s}}
A.bW.prototype={
d1(a,b){var s=a.createHTMLDocument(b)
s.toString
return s}}
A.d6.prototype={
gk(a){var s=a.length
s.toString
return s}}
A.bK.prototype={
gk(a){return this.a.length},
i(a,b){var s=this.a
if(!(b>=0&&b<s.length))return A.b(s,b)
return this.$ti.c.a(s[b])},
l(a,b,c){this.$ti.c.a(c)
throw A.c(A.aF("Cannot modify list"))}}
A.x.prototype={
gcT(a){return new A.dG(a)},
gac(a){return new A.dH(a)},
j(a){var s=a.localName
s.toString
return s},
R(a,b,c,d){var s,r,q,p
if(c==null){s=$.iL
if(s==null){s=A.q([],t.k)
r=new A.ci(s)
B.b.m(s,A.jg(null))
B.b.m(s,A.jm())
$.iL=r
d=r}else d=s
s=$.iK
if(s==null){d.toString
s=new A.cO(d)
$.iK=s
c=s}else{d.toString
s.a=d
c=s}}if($.aJ==null){s=document
r=s.implementation
r.toString
r=B.J.d1(r,"")
$.aJ=r
r=r.createRange()
r.toString
$.i1=r
r=$.aJ.createElement("base")
t.cR.a(r)
s=s.baseURI
s.toString
r.href=s
$.aJ.head.appendChild(r).toString}s=$.aJ
if(s.body==null){r=s.createElement("body")
B.v.scV(s,t.c.a(r))}s=$.aJ
if(t.c.b(a)){s=s.body
s.toString
q=s}else{s.toString
r=a.tagName
r.toString
q=s.createElement(r)
$.aJ.body.appendChild(q).toString}s="createContextualFragment" in window.Range.prototype
s.toString
if(s){s=a.tagName
s.toString
s=!B.b.A(B.S,s)}else s=!1
if(s){$.i1.selectNodeContents(q)
s=$.i1
s=s.createContextualFragment(b)
s.toString
p=s}else{J.kv(q,b)
s=$.aJ.createDocumentFragment()
s.toString
while(r=q.firstChild,r!=null)s.appendChild(r).toString
p=s}if(q!==$.aJ.body)J.iB(q)
c.bi(p)
document.adoptNode(p).toString
return p},
d0(a,b,c){return this.R(a,b,c,null)},
sB(a,b){this.aL(a,b)},
aL(a,b){this.sV(a,null)
a.appendChild(this.R(a,b,null,null)).toString},
scC(a,b){a.innerHTML=b},
ga6(a){return new A.ba(a,"click",!1,t.C)},
$ix:1}
A.fD.prototype={
$1(a){return t.h.b(t.A.a(a))},
$S:34}
A.e.prototype={$ie:1}
A.z.prototype={
bG(a,b,c,d){t.bw.a(c)
if(c!=null)this.cs(a,b,c,d)},
cR(a,b,c){return this.bG(a,b,c,null)},
cs(a,b,c,d){return a.addEventListener(b,A.bR(t.bw.a(c),1),d)},
$iz:1}
A.d9.prototype={
gk(a){return a.length}}
A.c0.prototype={
scV(a,b){a.body=b}}
A.aj.prototype={
dk(a,b,c,d){return a.open(b,c,!0)},
$iaj:1}
A.fE.prototype={
$1(a){var s=t.bo.a(a).responseText
s.toString
return s},
$S:42}
A.fF.prototype={
$2(a,b){this.a.setRequestHeader(A.p(a),A.p(b))},
$S:14}
A.fG.prototype={
$1(a){var s,r,q,p,o
t.x.a(a)
s=this.a
r=s.status
r.toString
q=r>=200&&r<300
p=r>307&&r<400
r=q||r===0||r===304||p
o=this.b
if(r)o.b1(0,s)
else o.bL(a)},
$S:21}
A.c1.prototype={}
A.aZ.prototype={
saz(a,b){a.checked=b},
sG(a,b){a.value=b},
$iaZ:1,
$ij0:1,
$iiH:1}
A.bx.prototype={
j(a){var s=String(a)
s.toString
return s},
$ibx:1}
A.a7.prototype={$ia7:1}
A.a0.prototype={
gaa(a){var s=this.a,r=s.childNodes.length
if(r===0)throw A.c(A.bC("No elements"))
if(r>1)throw A.c(A.bC("More than one element"))
s=s.firstChild
s.toString
return s},
P(a,b){var s,r,q,p,o
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
gH(a){var s=this.a.childNodes
return new A.aX(s,s.length,A.a2(s).h("aX<ap.E>"))},
gk(a){return this.a.childNodes.length},
i(a,b){var s=this.a.childNodes
if(!(b>=0&&b<s.length))return A.b(s,b)
return s[b]}}
A.l.prototype={
dm(a){var s=a.parentNode
if(s!=null)s.removeChild(a).toString},
dq(a,b){var s,r,q
try{r=a.parentNode
r.toString
s=r
J.kq(s,b,a)}catch(q){}return a},
cu(a){var s
while(s=a.firstChild,s!=null)a.removeChild(s).toString},
j(a){var s=a.nodeValue
return s==null?this.cf(a):s},
sV(a,b){a.textContent=b},
cY(a,b){var s=a.cloneNode(!0)
s.toString
return s},
A(a,b){var s=a.contains(b)
s.toString
return s},
cI(a,b,c){var s=a.replaceChild(b,c)
s.toString
return s},
$il:1}
A.ch.prototype={
gk(a){var s=a.length
s.toString
return s},
i(a,b){var s=a.length,r=b>>>0!==b||b>=s
r.toString
if(r)throw A.c(A.c2(b,s,a,null,null))
s=a[b]
s.toString
return s},
l(a,b,c){t.A.a(c)
throw A.c(A.aF("Cannot assign element of immutable List."))},
K(a,b){if(!(b>=0&&b<a.length))return A.b(a,b)
return a[b]},
$ir:1,
$iay:1,
$ij:1,
$iH:1}
A.al.prototype={$ial:1}
A.b7.prototype={
gk(a){return a.length},
sG(a,b){a.value=b},
$ib7:1}
A.cp.prototype={
M(a,b){return a.getItem(A.p(b))!=null},
i(a,b){return a.getItem(A.p(b))},
l(a,b,c){a.setItem(b,A.p(c))},
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
gJ(a){var s=A.q([],t.s)
this.q(a,new A.fV(s))
return s},
gk(a){var s=a.length
s.toString
return s},
gF(a){return a.key(0)==null},
gN(a){return a.key(0)!=null},
$io:1}
A.fV.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:14}
A.cs.prototype={
R(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.aO(a,b,c,d)
s=A.kH("<table>"+b+"</table>",c,d)
r=document.createDocumentFragment()
r.toString
new A.a0(r).P(0,new A.a0(s))
return r}}
A.ds.prototype={
R(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.aO(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.a0(s).P(0,new A.a0(new A.a0(new A.a0(B.z.R(r,b,c,d)).gaa(0)).gaa(0)))
return s}}
A.dt.prototype={
R(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.aO(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.a0(s).P(0,new A.a0(new A.a0(B.z.R(r,b,c,d)).gaa(0)))
return s}}
A.bD.prototype={
aL(a,b){var s,r
this.sV(a,null)
s=a.content
s.toString
J.kp(s)
r=this.R(a,b,null,null)
a.content.appendChild(r).toString},
$ibD:1}
A.b8.prototype={
sG(a,b){a.value=b},
$ib8:1}
A.an.prototype={}
A.cv.prototype={$ih3:1}
A.bJ.prototype={$ibJ:1}
A.cB.prototype={
gk(a){var s=a.length
s.toString
return s},
i(a,b){var s=a.length,r=b>>>0!==b||b>=s
r.toString
if(r)throw A.c(A.c2(b,s,a,null,null))
s=a[b]
s.toString
return s},
l(a,b,c){t.A.a(c)
throw A.c(A.aF("Cannot assign element of immutable List."))},
K(a,b){if(!(b>=0&&b<a.length))return A.b(a,b)
return a[b]},
$ir:1,
$iay:1,
$ij:1,
$iH:1}
A.dC.prototype={
q(a,b){var s,r,q,p,o,n
t.eA.a(b)
for(s=this.gJ(0),r=s.length,q=this.a,p=0;p<s.length;s.length===r||(0,A.hW)(s),++p){o=s[p]
n=q.getAttribute(o)
b.$2(o,n==null?A.p(n):n)}},
gJ(a){var s,r,q,p,o,n,m=this.a.attributes
m.toString
s=A.q([],t.s)
for(r=m.length,q=t.h9,p=0;p<r;++p){if(!(p<m.length))return A.b(m,p)
o=q.a(m[p])
if(o.namespaceURI==null){n=o.name
n.toString
B.b.m(s,n)}}return s},
gF(a){return this.gJ(0).length===0},
gN(a){return this.gJ(0).length!==0}}
A.dG.prototype={
M(a,b){var s=this.a.hasAttribute(b)
s.toString
return s},
i(a,b){return this.a.getAttribute(A.p(b))},
l(a,b,c){this.a.setAttribute(b,A.p(c))},
gk(a){return this.gJ(0).length}}
A.dH.prototype={
a7(){var s,r,q,p,o=A.cc(t.N)
for(s=this.a.className.split(" "),r=s.length,q=0;q<r;++q){p=B.a.Z(s[q])
if(p.length!==0)o.m(0,p)}return o},
bg(a){this.a.className=t.cq.a(a).T(0," ")},
gk(a){var s=this.a.classList.length
s.toString
return s},
gF(a){var s=this.a.classList.length
s.toString
return s===0},
m(a,b){var s,r
A.p(b)
s=this.a.classList
r=s.contains(b)
r.toString
s.add(b)
return!r},
v(a,b){var s=this.a.classList,r=s.contains(b)
r.toString
s.remove(b)
return r}}
A.i2.prototype={}
A.cy.prototype={}
A.ba.prototype={}
A.cz.prototype={$il3:1}
A.h8.prototype={
$1(a){return this.a.$1(t.B.a(a))},
$S:3}
A.bd.prototype={
cm(a){var s
if($.dK.a===0){for(s=0;s<262;++s)$.dK.l(0,B.T[s],A.mR())
for(s=0;s<12;++s)$.dK.l(0,B.o[s],A.mS())}},
ab(a){return $.ki().A(0,A.bZ(a))},
a1(a,b,c){var s=$.dK.i(0,A.bZ(a)+"::"+b)
if(s==null)s=$.dK.i(0,"*::"+b)
if(s==null)return!1
return A.ij(s.$4(a,b,c,this))},
$iak:1}
A.ap.prototype={
gH(a){return new A.aX(a,a.length,A.a2(a).h("aX<ap.E>"))}}
A.ci.prototype={
ab(a){return B.b.aw(this.a,new A.fR(a))},
a1(a,b,c){return B.b.aw(this.a,new A.fQ(a,b,c))},
$iak:1}
A.fR.prototype={
$1(a){return t.w.a(a).ab(this.a)},
$S:15}
A.fQ.prototype={
$1(a){return t.w.a(a).a1(this.a,this.b,this.c)},
$S:15}
A.cF.prototype={
cn(a,b,c,d){var s,r,q
this.a.P(0,c)
s=b.aI(0,new A.hs())
r=b.aI(0,new A.ht())
this.b.P(0,s)
q=this.c
q.P(0,B.R)
q.P(0,r)},
ab(a){return this.a.A(0,A.bZ(a))},
a1(a,b,c){var s,r=this,q=A.bZ(a),p=r.c,o=q+"::"+b
if(p.A(0,o))return r.d.cS(c)
else{s="*::"+b
if(p.A(0,s))return r.d.cS(c)
else{p=r.b
if(p.A(0,o))return!0
else if(p.A(0,s))return!0
else if(p.A(0,q+"::*"))return!0
else if(p.A(0,"*::*"))return!0}}return!1},
$iak:1}
A.hs.prototype={
$1(a){return!B.b.A(B.o,A.p(a))},
$S:8}
A.ht.prototype={
$1(a){return B.b.A(B.o,A.p(a))},
$S:8}
A.dY.prototype={
a1(a,b,c){if(this.ck(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.A(0,b)
return!1}}
A.hu.prototype={
$1(a){return"TEMPLATE::"+A.p(a)},
$S:16}
A.dX.prototype={
ab(a){var s
if(t.ew.b(a))return!1
s=t.g7.b(a)
if(s&&A.bZ(a)==="foreignObject")return!1
if(s)return!0
return!1},
a1(a,b,c){if(b==="is"||B.a.O(b,"on"))return!1
return this.ab(a)},
$iak:1}
A.aX.prototype={
t(){var s=this,r=s.c+1,q=s.b
if(r<q){q=s.a
if(!(r>=0&&r<q.length))return A.b(q,r)
s.d=q[r]
s.c=r
return!0}s.d=null
s.c=q
return!1},
gD(){var s=this.d
return s==null?this.$ti.c.a(s):s},
$ia6:1}
A.dE.prototype={$in:1,$iz:1,$ih3:1}
A.dS.prototype={$il9:1}
A.cO.prototype={
bi(a){var s,r=new A.hE(this)
do{s=this.b
r.$2(a,null)}while(s!==this.b)},
al(a,b){++this.b
if(b==null||b!==a.parentNode)J.iB(a)
else b.removeChild(a).toString},
cL(a,b){var s,r,q,p,o,n,m,l=!0,k=null,j=null
try{k=J.ks(a)
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
try{r=J.J(a)}catch(n){}try{t.h.a(a)
q=A.bZ(a)
this.cK(a,b,l,r,q,t.G.a(k),A.ag(j))}catch(n){if(A.ah(n) instanceof A.ai)throw n
else{this.al(a,b)
window.toString
p=A.d(r)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn("Removing corrupted element "+p)}}},
cK(a,b,c,d,e,f,g){var s,r,q,p,o,n,m,l=this
if(c){l.al(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing element due to corrupted attributes on <"+d+">")
return}if(!l.a.ab(a)){l.al(a,b)
window.toString
s=A.d(b)
r=typeof console!="undefined"
r.toString
if(r)window.console.warn("Removing disallowed element <"+e+"> from "+s)
return}if(g!=null)if(!l.a.a1(a,"is",g)){l.al(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing disallowed type extension <"+e+' is="'+g+'">')
return}s=f.gJ(0)
q=A.q(s.slice(0),A.L(s))
for(p=f.gJ(0).length-1,s=f.a,r="Removing disallowed attribute <"+e+" ";p>=0;--p){if(!(p<q.length))return A.b(q,p)
o=q[p]
n=l.a
m=J.kw(o)
A.p(o)
if(!n.a1(a,m,A.p(s.getAttribute(o)))){window.toString
n=s.getAttribute(o)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn(r+o+'="'+A.d(n)+'">')
s.removeAttribute(o)}}if(t.aW.b(a)){s=a.content
s.toString
l.bi(s)}},
cc(a,b){var s=a.nodeType
s.toString
switch(s){case 1:this.cL(a,b)
break
case 8:case 11:case 3:case 4:break
default:this.al(a,b)}},
$ikU:1}
A.hE.prototype={
$2(a,b){var s,r,q,p,o,n=this.a
n.cc(a,b)
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
A.dD.prototype={}
A.dP.prototype={}
A.dQ.prototype={}
A.dU.prototype={}
A.dZ.prototype={}
A.e_.prototype={}
A.d4.prototype={
bF(a){var s=$.jZ()
if(s.b.test(a))return a
throw A.c(A.fm(a,"value","Not a valid class token"))},
j(a){return this.a7().T(0," ")},
gH(a){var s=this.a7()
return A.lm(s,s.r,A.y(s).c)},
gF(a){return this.a7().a===0},
gk(a){return this.a7().a},
m(a,b){var s
A.p(b)
this.bF(b)
s=this.di(new A.fo(b))
return A.ij(s==null?!1:s)},
v(a,b){var s,r
this.bF(b)
s=this.a7()
r=s.v(0,b)
this.bg(s)
return r},
di(a){var s,r
t.bU.a(a)
s=this.a7()
r=a.$1(s)
this.bg(s)
return r}}
A.fo.prototype={
$1(a){return t.cq.a(a).m(0,this.a)},
$S:27}
A.hk.prototype={
bY(a){if(a<=0||a>4294967296)throw A.c(A.l_("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
bX(){return Math.random()}}
A.bA.prototype={$ibA:1}
A.cY.prototype={
a7(){var s,r,q,p,o=this.a.getAttribute("class"),n=A.cc(t.N)
if(o==null)return n
for(s=o.split(" "),r=s.length,q=0;q<r;++q){p=B.a.Z(s[q])
if(p.length!==0)n.m(0,p)}return n},
bg(a){this.a.setAttribute("class",a.T(0," "))}}
A.h.prototype={
gac(a){return new A.cY(a)},
sB(a,b){this.aL(a,b)},
R(a,b,c,d){var s,r,q,p=A.q([],t.k)
B.b.m(p,A.jg(null))
B.b.m(p,A.jm())
B.b.m(p,new A.dX())
c=new A.cO(new A.ci(p))
p=document
s=p.body
s.toString
r=B.q.d0(s,'<svg version="1.1">'+b+"</svg>",c)
p=p.createDocumentFragment()
p.toString
q=new A.a0(r).gaa(0)
while(s=q.firstChild,s!=null)p.appendChild(s).toString
return p},
ga6(a){return new A.ba(a,"click",!1,t.C)},
$ih:1}
A.hT.prototype={
$1(a){t.B.a(a)
new A.ec().W()},
$S:28}
A.ec.prototype={
W(){var s=0,r=A.e4(t.H),q=this,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
var $async$W=A.e6(function(a0,a1){if(a0===1)return A.e1(a1,r)
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
q.CW=t.by.a(A.D(["view-dashboard",q.f,"view-directory",q.r,"view-assets",q.w,"view-profile",q.x,"view-billing",q.y,"view-resident-home",q.z,"view-resident-ledger",q.Q,"view-resident-support",q.as],b,t.h))
o=t.d.a(window.location).href
o.toString
n=A.jb(o).gb7().i(0,"role")
if(n==="resident"){m=c.getElementById("zone-assignment-container")
if(m!=null){o=m.style
o.display="none"}l=t.f.a(c.getElementById("employee-id"))
if(l!=null)l.placeholder="e.g. TAG-2026-0041"
k=c.querySelector('label[for="employee-id"]')
if(k!=null)J.m(k,"Resident Account Number")
j=c.querySelector(".login-header p")
if(j!=null)J.m(j,"Resident Portal Login")
i=c.querySelector("#btn-login span")
if(i!=null)J.m(i,"Sign In to Portal")
h=c.getElementById("login-error-msg")
if(h!=null)J.aH(h,"Invalid Resident credentials. Use <strong>TAG-2026-0041</strong>.")
g=c.getElementById("btn-quick-login")
if(g!=null){c=g.style
c.display="flex"}}else if(n==="worker"){l=t.f.a(c.getElementById("employee-id"))
if(l!=null)l.placeholder="e.g. EMP-304"
k=c.querySelector('label[for="employee-id"]')
if(k!=null)J.m(k,"Employee Credentials / ID")
j=c.querySelector(".login-header p")
if(j!=null)J.m(j,"Worker & Field Terminal")
i=c.querySelector("#btn-login span")
if(i!=null)J.m(i,"Sign In to Terminal")
h=c.getElementById("login-error-msg")
if(h!=null)J.aH(h,"Invalid Worker credentials. Use <strong>EMP-304</strong>.")
f=c.getElementById("btn-quick-login-worker")
if(f!=null){c=f.style
c.display="flex"}}c=new A.eJ()
c.$0()
A.j6(A.i0(0,10),new A.eH(c))
s=2
return A.e0($.K().W(),$async$W)
case 2:A.j6(A.i0(0,5),new A.eI(q))
p=window.localStorage.getItem("waterhall_session")
e=window.localStorage.getItem("waterhall_resident_session")
if(p!=null)try{c=A.cb(t.G.a(B.e.S(0,p)),b,t.z)
q.a=c
q.aq(c)}catch(a){c=window.localStorage
c.toString
B.i.v(c,"waterhall_session")
q.an()}else if(e!=null)q.ar(e)
else q.an()
q.cU()
return A.e2(null,r)}})
return A.e3($async$W,r)},
cU(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this,a3="click",a4="input",a5="change",a6=document,a7=t.q,a8=a7.a(a6.getElementById("btn-login")),a9=a7.a(a6.getElementById("btn-quick-login")),b0=a7.a(a6.getElementById("btn-quick-login-worker")),b1=t.f,b2=b1.a(a6.getElementById("employee-id")),b3=t.Z,b4=b3.a(a6.getElementById("zone-assignment")),b5=a6.getElementById("login-error-msg")
if(a9!=null){s=t.C
A.B(a9,a3,s.h("~(1)?").a(new A.eh(a2,b5)),!1,s.c)}if(b0!=null){s=t.C
A.B(b0,a3,s.h("~(1)?").a(new A.ei(a2,b5)),!1,s.c)}if(a8!=null){s=t.C
A.B(a8,a3,s.h("~(1)?").a(new A.ej(a2,b2,b4,b5)),!1,s.c)}r=a7.a(a6.getElementById("btn-logout"))
if(r!=null){s=t.C
A.B(r,a3,s.h("~(1)?").a(new A.et(a2,b2)),!1,s.c)}q=a7.a(a6.getElementById("btn-resident-logout"))
if(q!=null){s=t.C
A.B(q,a3,s.h("~(1)?").a(new A.eu(a2,b2)),!1,s.c)}s=t.h
A.jP(s,s,"T","querySelectorAll")
s=a6.querySelectorAll(".nav-tab")
s.toString
p=new A.bK(s,t.cD)
p.q(p,new A.ev(a2))
o=b1.a(a6.getElementById("dir-search"))
n=b3.a(a6.getElementById("filter-purok"))
m=b3.a(a6.getElementById("filter-status"))
if(o!=null){b1=t.E
A.B(o,a4,b1.h("~(1)?").a(new A.ew(a2)),!1,b1.c)}if(n!=null){b1=t.E
A.B(n,a5,b1.h("~(1)?").a(new A.ex(a2)),!1,b1.c)}if(m!=null){b1=t.E
A.B(m,a5,b1.h("~(1)?").a(new A.ey(a2)),!1,b1.c)}l=a6.getElementById("btn-close-modal")
if(l!=null){b1=J.bo(l)
b3=b1.$ti
A.B(b1.a,b1.b,b3.h("~(1)?").a(new A.ez(a2)),!1,b3.c)}k=a6.getElementById("house-detail-modal")
if(k!=null){b1=J.bo(k)
b3=b1.$ti
A.B(b1.a,b1.b,b3.h("~(1)?").a(new A.eA(a2,k)),!1,b3.c)}j=t.I.a(a6.getElementById("modal-leak-toggle"))
if(j!=null){b1=t.E
A.B(j,a5,b1.h("~(1)?").a(new A.ek(a2,j)),!1,b1.c)}i=a7.a(a6.getElementById("btn-submit-log"))
if(i!=null){b1=t.C
A.B(i,a3,b1.h("~(1)?").a(new A.el(a2)),!1,b1.c)}b1=t.O
h=b1.a(a6.getElementById("slider-tank"))
g=b1.a(a6.getElementById("slider-ph"))
f=b1.a(a6.getElementById("slider-turbidity"))
e=a6.getElementById("sim-tank-val")
d=a6.getElementById("sim-ph-val")
c=a6.getElementById("sim-turbidity-val")
if(h!=null){b1=t.E
A.B(h,a4,b1.h("~(1)?").a(new A.em(a2,h,e)),!1,b1.c)}if(g!=null){b1=t.E
A.B(g,a4,b1.h("~(1)?").a(new A.en(a2,g,d)),!1,b1.c)}if(f!=null){b1=t.E
A.B(f,a4,b1.h("~(1)?").a(new A.eo(a2,f,c)),!1,b1.c)}b=a6.getElementById("menu-view-logs")
if(b!=null){b1=J.bo(b)
b3=b1.$ti
A.B(b1.a,b1.b,b3.h("~(1)?").a(new A.ep(a2)),!1,b3.c)}a=a6.getElementById("menu-emergency-call")
if(a!=null){b1=J.bo(a)
b3=b1.$ti
A.B(b1.a,b1.b,b3.h("~(1)?").a(new A.eq(a2)),!1,b3.c)}a0=a7.a(a6.getElementById("btn-resident-submit-log"))
if(a0!=null){a7=t.C
A.B(a0,a3,a7.h("~(1)?").a(new A.er(a2)),!1,a7.c)}a1=a6.getElementById("btn-broadcast-announcement")
if(a1!=null){a6=J.bo(a1)
a7=a6.$ti
A.B(a6.a,a6.b,a7.h("~(1)?").a(new A.es(a2)),!1,a7.c)}},
bl(a,b){var s
if(b!=null){J.aH(b,a)
s=b.style
s.display="block"}},
an(){var s=this,r="none",q=s.CW
q===$&&A.a3()
new A.aA(q,A.y(q).h("aA<2>")).q(0,new A.eB())
q=s.e
q===$&&A.a3()
J.at(q).m(0,"active")
s.b="view-login"
q=s.at
q===$&&A.a3()
q=q.style
q.display=r
q=s.ax
q===$&&A.a3()
q=q.style
q.display=r
q=s.ay
q===$&&A.a3()
if(q!=null){q=q.style
q.display=r}},
aq(a){var s,r=this
t.P.a(a)
s=r.e
s===$&&A.a3()
J.at(s).v(0,"active")
s=r.CW
s===$&&A.a3()
new A.aA(s,A.y(s).h("aA<2>")).q(0,new A.fe())
r.d=null
s=window.localStorage
s.toString
B.i.v(s,"waterhall_resident_session")
s=r.at
s===$&&A.a3()
s.setAttribute("style","display: flex !important")
s=r.ax
s===$&&A.a3()
s.setAttribute("style","display: none !important")
s=r.ay
s===$&&A.a3()
if(s!=null){s=s.style
s.display="none"}r.a3("view-dashboard")
r.ae()
r.a8()
r.ad()
r.b9()
r.de()},
a3(a){var s,r,q,p=this
if(p.a==null&&p.d==null&&a!=="view-login"){p.an()
return}p.b=a
s=document
s.toString
r=t.h
A.jP(r,r,"T","querySelectorAll")
s=s.querySelectorAll(".nav-tab")
s.toString
q=new A.bK(s,t.cD)
q.q(q,new A.fk(a))
s=p.CW
s===$&&A.a3()
s.q(0,new A.fl(a))
if(a==="view-dashboard")p.ae()
else if(a==="view-directory")p.a8()
else if(a==="view-assets")p.ad()
else if(a==="view-profile")p.b9()
else if(a==="view-billing")p.c2(null)
else if(a==="view-resident-home"||a==="view-resident-ledger"||a==="view-resident-support")p.c3()},
ae(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=this,a2="var(--alert-green)",a3=".alert-widget-title",a4="var(--amber-safety)"
if(a1.a==null)return
s=document
r=s.getElementById("dash-worker-title")
if(r!=null)J.m(r,"Field Terminal: "+A.d(a1.a.i(0,"selected_zone")))
q=$.K()
p=q.a
o=q.b
n=q.c
q=A.L(p)
m=q.h("N<1>")
l=A.b3(new A.N(p,q.h("E(1)").a(new A.eU()),m),m.h("j.E"))
k=A.q([],t.gE)
if(J.t(o.i(0,"ph_status"),"warning")){q=t.N
B.b.m(k,A.D(["type","quality","name","Central Reservoir pH Alert","desc",A.p(o.i(0,"ph_desc"))],q,q))
j=1}else j=0
if(J.t(o.i(0,"turbidity_status"),"warning")){++j
q=t.N
B.b.m(k,A.D(["type","quality","name","Central Turbidity Alert","desc",A.p(o.i(0,"turbidity_desc"))],q,q))}i=l.length+j
h=s.getElementById("dash-alert-count")
if(h!=null)J.m(h,B.c.j(i))
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
q.color=a4}B.b.q(l,new A.eV(a1,f))
B.b.q(k,new A.eW(a1,f))}}d=A.q(["Purok 1","Purok 2","Purok 3","Purok 4","Purok 5","Purok 6"],t.s)
new A.b2(d,t.ey).q(0,new A.eX(a1,p))
c=s.getElementById("dashboard-zone-grid")
if(c!=null){J.aH(c,"")
B.b.q(d,new A.eY(a1,p,c))}b=s.getElementById("dash-log-count")
a=s.getElementById("dash-log-list")
if(a!=null){s=J.F(a)
s.sB(a,"")
a0=A.l6(n,0,A.e7(3,"count",t.S),A.L(n).c).aG(0)
if(b!=null)J.m(b,""+n.length+" logged")
if(a0.length===0)s.sB(a,'<div class="log-card" style="color:var(--text-muted)">No maintenance activity logged yet.</div>')
else B.b.q(a0,new A.eZ(a1,p,a))}},
a8(){var s,r,q,p,o,n,m=null,l=$.K().a,k=document,j=t.f.a(k.getElementById("dir-search")),i=t.Z,h=i.a(k.getElementById("filter-purok")),g=i.a(k.getElementById("filter-status"))
if(j==null)s=m
else{i=j.value
i=i==null?m:B.a.Z(i.toLowerCase())
s=i}if(s==null)s=""
r=h==null?m:h.value
if(r==null)r="all"
q=g==null?m:g.value
if(q==null)q="all"
p=k.getElementById("dir-empty-state")
o=k.getElementById("dir-household-list")
if(o==null)return
J.aH(o,"")
k=A.L(l)
i=k.h("N<1>")
n=A.b3(new A.N(l,k.h("E(1)").a(new A.f0(s,r,q)),i),i.h("j.E"))
if(n.length===0){if(p!=null){k=p.style
k.display="block"}}else{if(p!=null){k=p.style
k.display="none"}B.b.q(n,new A.f1(this,o))}},
bZ(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f="current_leak_status"
g.c=a
s=$.K().a9(a)
if(s==null)return
r=document
q=r.getElementById("modal-owner-name")
p=r.getElementById("modal-acct-num")
o=r.getElementById("modal-current-m3")
n=r.getElementById("modal-flow-rate")
if(q!=null)J.m(q,A.ag(J.k(s,"owner_name")))
if(p!=null){m=J.w(s)
J.m(p,A.d(m.i(s,"house_id"))+" | "+A.d(m.i(s,"account_number")))}if(o!=null)J.m(o,B.d.p(A.v(J.k(s,"current_m3_usage")),1))
if(n!=null)J.m(n,B.d.p(A.v(J.k(s,"flow_rate")),2))
m=t.I
l=m.a(r.getElementById("modal-leak-toggle"))
if(l!=null)B.h.saz(l,J.t(J.k(s,f),"leak"))
k=J.w(s)
g.be(A.p(k.i(s,f)))
g.c4(A.U(t.R.a(k.i(s,"monthly_history")),t.n),"chart-container")
g.b8(a)
j=t.o.a(r.getElementById("log-desc"))
i=m.a(r.getElementById("log-resolved"))
if(j!=null)B.n.sG(j,"")
if(i!=null)B.h.saz(i,J.t(k.i(s,f),"leak"))
h=r.getElementById("house-detail-modal")
if(h!=null)J.at(h).m(0,"active")},
bK(){var s=document.getElementById("house-detail-modal")
if(s!=null)J.at(s).v(0,"active")
this.c=null
this.ae()
this.a8()},
be(a){var s=document,r=s.getElementById("modal-leak-title"),q=s.getElementById("modal-leak-desc")
if(r==null||q==null)return
s=J.F(r)
if(a==="leak"){s.sV(r,"Leak State Sim: HIGH CONSTANT FLOW")
s=r.style
s.color="var(--alert-red)"
J.m(q,"Meter detects flow rate exceeds safety coefficient threshold.")}else{s.sV(r,"Flow State Sim: NORMAL FLOW")
s=r.style
s.color="var(--alert-green)"
J.m(q,"Meter flow matches normal residential consumption metrics.")}},
c4(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d="var(--amber-safety)",c={}
t.bj.a(a)
s=document.getElementById(b)
if(s==null)return
r=J.F(s)
r.sB(s,"")
if(a.length===0){r.sB(s,'<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:12px">No historic telemetry available.</div>')
return}q=B.d.aA(B.b.dl(a,new A.f9())*1.1,10,1000)
p=A.q(["Mar","Apr","May","Jun"],t.s)
o=new A.b2(a,A.L(a).h("b2<1>"))
n=o.gd5(o).ao(0,new A.fa(a,q,p),t.U).aG(0)
o=A.L(n)
m=o.h("a(1)")
o=o.h("a_<1,a>")
l=new A.a_(n,m.a(new A.fb()),o).T(0," ")
if(0>=n.length)return A.b(n,0)
k=B.d.p(A.v(J.k(n[0],"x")),1)
j=B.c.p(80,1)
o=new A.a_(n,m.a(new A.fc()),o).T(0," ")
m=n.length
i=m-1
if(!(i>=0))return A.b(n,i)
i=B.d.p(A.v(J.k(n[i],"x")),1)
m=B.c.p(80,1)
h=b==="resident-chart-container"
g=h?"res-chart-grad":"chart-area-grad"
f=h?"#3B82F6":d
e=h?"#3B82F6":d
c.a='      <svg width="100%" height="100%" viewBox="0 0 340 100" style="overflow:visible">\n        <defs>\n          <linearGradient id="'+g+'" x1="0" y1="0" x2="0" y2="1">\n            <stop offset="0%" stop-color="'+e+'" stop-opacity="0.3"/>\n            <stop offset="100%" stop-color="'+e+'" stop-opacity="0.0"/>\n          </linearGradient>\n        </defs>\n        \n        <line x1="20" y1="20" x2="320" y2="20" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="50" x2="320" y2="50" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="80" x2="320" y2="80" stroke="#CBD5E1" stroke-width="1.5"/>\n        \n        <path d="'+("M "+k+","+j+" "+o+(" L "+i+","+m+" Z"))+'" fill="url(#'+g+')" />\n        <polyline points="'+l+'" fill="none" stroke="'+f+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>\n    '
B.b.q(n,new A.fd(c,f))
r.sB(s,c.a+="</svg>")},
b8(a){var s,r,q,p,o,n=document.getElementById("modal-historical-logs")
if(n==null)return
s=J.F(n)
s.sB(n,"")
r=$.K().c
q=A.L(r)
p=q.h("N<1>")
o=A.b3(new A.N(r,q.h("E(1)").a(new A.f2(a)),p),p.h("j.E"))
if(o.length===0)s.sB(n,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous repair logs recorded for this meter.</div>')
else B.b.q(o,new A.f3(this,n))},
ad(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b="main_tank_level",a="ph_level",a0="turbidity",a1="reservoir-status-banner",a2="var(--amber-safety)",a3="var(--alert-green)",a4="ph_status",a5="turbidity_status",a6=$.K().b,a7=document,a8=t.O,a9=a8.a(a7.getElementById("slider-tank")),b0=a8.a(a7.getElementById("slider-ph")),b1=a8.a(a7.getElementById("slider-turbidity")),b2=a7.getElementById("sim-tank-val"),b3=a7.getElementById("sim-ph-val"),b4=a7.getElementById("sim-turbidity-val")
a8=a7.activeElement
if((a8==null?a9!=null:a8!==a9)&&a9!=null){B.h.sG(a9,J.J(a6.i(0,b)))
if(b2!=null)J.m(b2,A.d(a6.i(0,b))+"%")}a8=a7.activeElement
if((a8==null?b0!=null:a8!==b0)&&b0!=null){B.h.sG(b0,J.J(a6.i(0,a)))
if(b3!=null)J.m(b3,B.d.p(A.v(a6.i(0,a)),1))}a8=a7.activeElement
if((a8==null?b1!=null:a8!==b1)&&b1!=null){B.h.sG(b1,J.J(a6.i(0,a0)))
if(b4!=null)J.m(b4,B.d.p(A.v(a6.i(0,a0)),1)+" NTU")}s=a7.getElementById("asset-tank-percent")
r=a7.getElementById("asset-tank-fill")
q=a7.getElementById("asset-tank-banner")
p=A.aO(a6.i(0,b))
if(s!=null)J.m(s,""+p+"%")
a8=r!=null
if(a8){o=r.style
o.height=""+p+"%"}if(q!=null&&a8)if(p<30){J.m(q,"CRITICAL: Low Water Reserve. High pressure risk in Zone 4 & 5!")
q.className="reservoir-status-banner low"
a8=r.style
a8.background="linear-gradient(180deg, #F87171 0%, #DC2626 100%)"}else{a8=J.F(q)
if(p<50){a8.sV(q,"WARNING: Moderate Reserve. Stabilizing flow valves recommended.")
q.className=a1
a8=q.style
a8.backgroundColor="var(--alert-amber-bg)"
a8=q.style
a8.borderColor="rgba(249, 115, 22, 0.3)"
a8=q.style
a8.color=a2
a8=r.style
a8.background="linear-gradient(180deg, #FBBF24 0%, #D97706 100%)"}else{a8.sV(q,"Reservoir Status: Normal Operating Pressure")
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
j=A.v(a6.i(0,a))
if(n!=null)J.m(n,B.d.p(j,1))
if(l!=null){i=B.d.aA((j-4)/6*100,0,100)
a8=l.style
a8.left=A.d(i)+"%"}if(m!=null){J.m(m,J.J(a6.i(0,a4)).toUpperCase())
m.className="quality-badge "+A.d(a6.i(0,a4))}if(k!=null)J.m(k,A.ag(a6.i(0,"ph_desc")))
h=a7.getElementById("asset-turbidity-val")
g=a7.getElementById("asset-turbidity-badge")
f=a7.getElementById("asset-turbidity-fill")
e=a7.getElementById("asset-turbidity-desc")
d=A.v(a6.i(0,a0))
if(h!=null)J.m(h,B.d.p(d,1))
if(f!=null){c=B.d.aA(d/12*100,0,100)
a7=f.style
a7.width=A.d(c)+"%"
if(J.t(a6.i(0,a5),"warning")){a7=f.style
a7.backgroundColor=a2}else{a7=f.style
a7.backgroundColor=a3}}if(g!=null){J.m(g,J.J(a6.i(0,a5)).toUpperCase())
g.className="quality-badge "+A.d(a6.i(0,a5))}if(e!=null)J.m(e,A.ag(a6.i(0,"turbidity_desc")))},
b9(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this
if(f.a==null)return
s=document
r=s.getElementById("worker-name")
q=s.getElementById("worker-role")
p=s.getElementById("worker-zone-lbl")
o=s.getElementById("worker-avatar")
if(r!=null)J.m(r,A.ag(f.a.i(0,"name")))
if(q!=null)J.m(q,A.ag(f.a.i(0,"role")))
if(p!=null)J.m(p,"Assigned Zone: "+A.d(f.a.i(0,"selected_zone")))
if(o!=null){n=A.q(J.J(f.a.i(0,"name")).split(" "),t.s)
J.m(o,B.a.n(new A.a_(n,t.dG.a(new A.f4()),t.e).T(0,""),0,B.c.aA(n.length,1,2)).toUpperCase())}m=$.K()
l=m.a
k=A.L(l)
j=new A.N(l,k.h("E(1)").a(new A.f5(f)),k.h("N<1>")).gk(0)
m=m.c
k=A.L(m)
i=new A.N(m,k.h("E(1)").a(new A.f6(f)),k.h("N<1>")).gk(0)
h=s.getElementById("profile-stat-total")
g=s.getElementById("profile-stat-logs")
if(h!=null)J.m(h,B.c.j(j))
if(g!=null)J.m(g,B.c.j(i))},
de(){var s,r,q=this,p=document,o=t.f,n=o.a(p.getElementById("bill-meter-search")),m=p.getElementById("bill-meter-results"),l=o.a(p.getElementById("bill-curr-input")),k=t.q.a(p.getElementById("btn-save-bill"))
if(n==null)return
o=t.E
s=o.h("~(1)?")
o=o.c
A.B(n,"focus",s.a(new A.eC(q)),!1,o)
A.B(n,"input",s.a(new A.eD(q)),!1,o)
if(l!=null)A.B(l,"input",s.a(new A.eE(q)),!1,o)
A.B(p,"click",t.h2.a(new A.eF(n,m)),!1,t.V)
if(k!=null){p=t.C
A.B(k,"click",p.h("~(1)?").a(new A.eG(q)),!1,p.c)}r=$.K().a
p=r.length
if(p!==0){if(0>=p)return A.b(r,0)
q.cx=A.ag(J.k(r[0],"house_id"))
if(0>=r.length)return A.b(r,0)
p=A.d(J.k(r[0],"owner_name"))
if(0>=r.length)return A.b(r,0)
B.h.sG(n,p+" ("+A.d(J.k(r[0],"account_number"))+")")}},
bk(){var s,r,q,p,o=document,n=t.f.a(o.getElementById("bill-meter-search")),m=o.getElementById("bill-meter-results")
if(n==null||m==null)return
o=n.value
s=o==null?null:B.a.Z(o.toLowerCase())
if(s==null)s=""
r=$.K().a
o=A.L(r)
q=o.h("N<1>")
p=A.b3(new A.N(r,o.h("E(1)").a(new A.fg(s)),q),q.h("j.E"))
o=J.F(m)
o.sB(m,"")
if(p.length===0){o.sB(m,'<div class="search-result-item" style="color:var(--text-muted); cursor:default">No households found</div>')
o=m.style
o.display="block"
return}B.b.q(p,new A.fh(this,n,m))
o=m.style
o.display="block"},
c2(a){var s,r,q,p,o,n,m,l,k=this,j="current_m3_usage",i=a!=null
if(i)k.cx=a
s=k.cx
if(s==null)return
r=$.K()
q=r.a9(s)
if(q==null)return
s=document
p=s.getElementById("bill-prev-reading")
o=t.f.a(s.getElementById("bill-curr-input"))
s=k.cx
s.toString
n=r.aK(s)
s=n.length
if(s!==0){if(0>=s)return A.b(n,0)
m=A.v(J.k(n[0],"current_reading"))}else{s=J.w(q)
l=A.U(t.R.a(s.i(q,"monthly_history")),t.n)
r=l.length
m=r>=2?l[r-2]:A.v(s.i(q,j))-2.5}if(p!=null)J.m(p,B.d.p(m,1))
if(i&&o!=null)B.h.sG(o,B.d.p(A.v(J.k(q,j)),1))
k.bc()
i=k.cx
i.toString
k.c1(i)},
bc(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
if(this.cx==null)return
s=document
r=s.getElementById("bill-prev-reading")
q=t.f.a(s.getElementById("bill-curr-input"))
p=r==null?null:r.textContent
o=A.b6(p==null?"":p)
if(o==null)o=0
p=q==null?null:q.value
n=A.b6(p==null?"":p)
m=(n==null?0:n)-o
if(m<0)m=0
l=s.getElementById("bill-calc-consumption")
if(l!=null)J.m(l,B.d.p(m,1))
k=m>10?(m-10)*15:0
j=s.getElementById("bill-calc-excess")
if(j!=null)J.m(j,B.d.p(k,2))
i=s.getElementById("bill-calc-total")
if(i!=null)J.m(i,B.d.p(120+k+50,2))
p=$.K()
h=this.cx
h.toString
g=p.bQ(h,"June 2026")
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
B.m.bz(s,B.m.bq(s,"opacity"),"0.5","")
s=e.style
s.cursor="not-allowed"
d=e.querySelector("span")
if(d!=null)J.m(d,"Register Blocked (Billed)")}}else{s.sB(f,'          <svg style="width:18px;height:18px;fill:currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n          <span>CLEAR: Safe to bill June 2026. No duplicates found.</span>\n        ')
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
B.m.bz(s,B.m.bq(s,"opacity"),"1","")
s=e.style
s.cursor="pointer"
d=e.querySelector("span")
if(d!=null)J.m(d,"Register & Save Bill")}}}},
cd(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d=null,c=e.cx
if(c==null||e.a==null)return
s=$.K()
if(s.bQ(c,"June 2026")){e.I("Operation blocked to prevent double-billing!")
return}c=document
r=c.getElementById("bill-prev-reading")
q=t.f.a(c.getElementById("bill-curr-input"))
p=c.getElementById("bill-calc-consumption")
o=c.getElementById("bill-calc-excess")
c=r==null?d:r.textContent
n=A.b6(c==null?"":c)
if(n==null)n=0
c=q==null?d:q.value
m=A.b6(c==null?"":c)
if(m==null)m=0
c=p==null?d:p.textContent
l=A.b6(c==null?"":c)
if(l==null)l=0
c=o==null?d:o.textContent
k=A.b6(c==null?"":c)
c=120+(k==null?0:k)
j=e.cx
j.toString
i=s.a9(j)
if(i==null)return
j=J.w(i)
h=t.N
g=t.z
c=t.P.a(A.D(["house_id",e.cx,"account_number",j.i(i,"account_number"),"billing_month","June 2026","previous_reading",n,"current_reading",m,"consumption",l,"water_charge",c,"maintenance_fee",50,"total_due",c+50,"billed_by",e.a.i(0,"worker_id")],h,g))
f=s.e
h=A.bw(h,g)
h.l(0,"bill_id","BILL-"+(5000+B.k.bY(5000)))
h.l(0,"date",new A.a5(Date.now(),0,!1).ah().ag())
h.l(0,"status","Pending")
h.P(0,c)
B.b.b3(f,0,h)
s.am("/api/billing-records/add",h)
h=window.localStorage
h.toString
h.setItem("waterhall_billing_records",B.e.u(f))
e.I("June 2026 bill registered for "+A.d(j.i(i,"owner_name"))+"!")
e.bc()
j=e.cx
j.toString
e.c1(j)
e.b9()},
c1(a){var s,r,q=document.getElementById("billing-history-list")
if(q==null)return
s=J.F(q)
s.sB(q,"")
r=$.K().aK(a)
if(r.length===0)s.sB(q,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous invoice logs recorded.</div>')
else B.b.q(r,new A.eK(this,q))},
bm(a,b){var s=document,r=s.getElementById("app-toast"),q=s.getElementById("toast-text")
if(r!=null&&q!=null){J.m(q,a)
J.at(r).m(0,"show")
s=this.cy
if(s!=null)s.cW()
this.cy=A.l8(A.i0(b,0),new A.fj(r))}},
I(a){return this.bm(a,2500)},
ar(a){var s,r=this
r.d=a
window.localStorage.setItem("waterhall_resident_session",a)
r.a=null
s=window.localStorage
s.toString
B.i.v(s,"waterhall_session")
s=r.e
s===$&&A.a3()
J.at(s).v(0,"active")
s=r.CW
s===$&&A.a3()
new A.aA(s,A.y(s).h("aA<2>")).q(0,new A.fi())
s=r.at
s===$&&A.a3()
s.setAttribute("style","display: none !important")
s=r.ax
s===$&&A.a3()
s.setAttribute("style","display: flex !important")
s=r.ay
s===$&&A.a3()
if(s!=null){s=s.style
s.display="none"}r.a3("view-resident-home")},
c3(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3=this,b4="warning",b5="var(--alert-red)",b6="var(--alert-green)",b7="monthly_history",b8="current_m3_usage",b9=b3.d
if(b9==null)return
q=$.K()
p=q.a9(b9)
if(p==null)return
o=q.cb()
b9=document
n=b9.getElementById("resident-announcement-banner")
m=b9.getElementById("resident-announcement-message")
if(n!=null&&m!=null)if(o!=null){J.m(m,A.ag(J.k(o,"message")))
l=n.style
l.display="flex"}else{l=n.style
l.display="none"}k=q.b
j=b9.getElementById("resident-tank-val")
i=b9.getElementById("resident-ph-val")
h=b9.getElementById("resident-turb-val")
g=b9.getElementById("resident-safety-status")
if(j!=null)J.m(j,A.d(k.i(0,"main_tank_level"))+"%")
if(i!=null)J.m(i,B.d.p(A.v(k.i(0,"ph_level")),1))
if(h!=null)J.m(h,B.d.p(A.v(k.i(0,"turbidity")),1))
if(g!=null){l=J.t(k.i(0,"ph_status"),b4)||J.t(k.i(0,"turbidity_status"),b4)
f=J.F(g)
if(l){f.sV(g,"ALERT")
l=g.style
l.color=b5}else{f.sV(g,"SAFE")
l=g.style
l.color=b6}}e=b9.getElementById("resident-profile-name-home")
d=b9.getElementById("resident-profile-meta-home")
if(e!=null)J.m(e,A.ag(J.k(p,"owner_name")))
if(d!=null){l=J.w(p)
J.m(d,"Meter ID: "+A.d(l.i(p,"house_id"))+" | "+A.d(l.i(p,"account_number"))+" | "+A.d(l.i(p,"purok")))}c=b9.getElementById("resident-leak-flag")
if(c!=null){l=J.F(c)
if(J.t(J.k(p,"current_leak_status"),"leak")){l.sB(c,'          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n          <span>Leak Alert Warning: High constant flow rate registered. Please inspect on-site faucets.</span>\n        ')
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
s=q.aK(l)
r=null
try{r=J.cU(s,new A.f7())}catch(b){}if(r!=null){a=A.v(J.k(r,"previous_reading"))
a0=A.v(J.k(r,"current_reading"))
a1=A.v(J.k(r,"consumption"))
a2=a1>10?(a1-10)*15:0
a3=A.v(J.k(r,"total_due"))
a4=A.p(J.k(r,"status"))
a5=J.t(J.k(r,"status"),"Paid")?"normal":b4}else{q=J.w(p)
a6=A.U(t.R.a(q.i(p,b7)),t.n)
l=a6.length
a=l>=2?a6[l-2]:A.v(q.i(p,b8))-2.5
a0=A.v(q.i(p,b8))
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
if(a7!=null)J.m(a7,B.d.p(a,1))
if(a8!=null)J.m(a8,B.d.p(a0,1))
if(a9!=null)J.m(a9,B.d.p(a1,1))
if(b0!=null)J.m(b0,B.d.p(a2,2))
if(b1!=null)J.m(b1,B.d.p(a3,2))
if(b2!=null){J.m(b2,a4.toUpperCase())
b2.className="quality-badge "+a5}b3.c4(A.U(t.R.a(J.k(p,b7)),t.n),"resident-chart-container")
b3.dn(s)},
dn(a){var s,r
t.D.a(a)
s=document.getElementById("resident-history-list")
if(s==null)return
r=J.F(s)
r.sB(s,"")
if(a.length===0){r.sB(s,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No billing history available.</div>')
return}B.b.q(a,new A.f8(this,s))}}
A.eJ.prototype={
$0(){var s,r,q,p,o=document.getElementById("phone-time")
if(o!=null){s=new A.a5(Date.now(),0,!1)
r=A.aM(s)
q=B.a.X(B.c.j(A.by(s)),2,"0")
p=r>=12?"PM":"AM"
r=B.c.a2(r,12)
J.m(o,""+(r!==0?r:12)+":"+q+" "+p)}},
$S:2}
A.eH.prototype={
$1(a){t.p.a(a)
return this.a.$0()},
$S:29}
A.eI.prototype={
$1(a){return this.ca(t.p.a(a))},
ca(a){var s=0,r=A.e4(t.H),q=this,p,o
var $async$$1=A.e6(function(b,c){if(b===1)return A.e1(c,r)
for(;;)switch(s){case 0:o=q.a
s=o.a!=null||o.d!=null?2:3
break
case 2:s=4
return A.e0($.K().aF(),$async$$1)
case 4:if(o.d!=null)o.c3()
else{p=o.b
if(p==="view-dashboard")o.ae()
else if(p==="view-directory")o.a8()
else if(p==="view-assets")o.ad()}case 3:return A.e2(null,r)}})
return A.e3($async$$1,r)},
$S:30}
A.eh.prototype={
$1(a){var s,r,q,p,o
t.V.a(a)
s=$.K().a
try{r=J.cU(s,new A.eg())
q=window.localStorage
q.toString
B.i.v(q,"waterhall_session")
q=this.a
q.a=null
q.ar(A.p(J.k(r,"house_id")))
p=this.b
if(p!=null){p=p.style
p.display="none"}q.I("Quick Login: "+A.d(J.k(r,"owner_name")))}catch(o){}},
$S:0}
A.eg.prototype={
$1(a){return J.J(J.k(t.P.a(a),"account_number")).toLowerCase()==="tag-2026-0041"},
$S:1}
A.ei.prototype={
$1(a){var s,r,q
t.V.a(a)
s=$.K().bf("EMP-304","Purok 2")
if(s!=null){r=this.a
r.a=s
q=window.localStorage
q.toString
q.setItem("waterhall_session",B.e.u(s))
q=window.localStorage
q.toString
B.i.v(q,"waterhall_resident_session")
q=this.b
if(q!=null){q=q.style
q.display="none"}r.aq(s)
r.I("Quick Login: Tech "+A.d(s.i(0,"name")))}},
$S:0}
A.ej.prototype={
$1(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f="waterhall_session",e="house_id",d="none",c="Logged in as Resident: ",b="owner_name",a="waterhall_resident_session",a0="Logged in as Tech: "
t.V.a(a1)
n=g.b
if(n==null)m=null
else{n=n.value
n=n==null?null:B.a.Z(n)
m=n}s=m==null?"":m
n=g.c
l=n==null?null:n.value
if(l==null)l=""
if(J.a4(s)===0){g.a.bl("Credentials are required.",g.d)
return}n=t.d.a(window.location).href
n.toString
k=A.jb(n).gb7().i(0,"role")
if(k==="resident"){r=$.K().a
try{q=J.cU(r,new A.ee(s))
n=window.localStorage
n.toString
B.i.v(n,f)
n=g.a
n.a=null
n.ar(A.p(J.k(q,e)))
j=g.d
if(j!=null){j=j.style
j.display=d}n.I(c+A.d(J.k(q,b)))
return}catch(i){}}else if(k==="worker"){h=$.K().bf(s,l)
if(h!=null){n=g.a
n.a=h
j=window.localStorage
j.toString
j.setItem(f,B.e.u(h))
j=window.localStorage
j.toString
B.i.v(j,a)
j=g.d
if(j!=null){j=j.style
j.display=d}n.aq(h)
n.I(a0+A.d(h.i(0,"name")))
return}}else{n=$.K()
h=n.bf(s,l)
if(h!=null){n=g.a
n.a=h
j=window.localStorage
j.toString
j.setItem(f,B.e.u(h))
j=window.localStorage
j.toString
B.i.v(j,a)
j=g.d
if(j!=null){j=j.style
j.display=d}n.aq(h)
n.I(a0+A.d(h.i(0,"name")))
return}p=n.a
try{o=J.cU(p,new A.ef(s))
n=window.localStorage
n.toString
B.i.v(n,f)
n=g.a
n.a=null
n.ar(A.p(J.k(o,e)))
j=g.d
if(j!=null){j=j.style
j.display=d}n.I(c+A.d(J.k(o,b)))
return}catch(i){}}g.a.bl('Credentials "'+A.d(s)+'" not recognized. Check details.',g.d)},
$S:0}
A.ee.prototype={
$1(a){var s,r
t.P.a(a)
s=J.w(a)
r=this.a
return J.J(s.i(a,"house_id")).toLowerCase()===r.toLowerCase()||J.J(s.i(a,"account_number")).toLowerCase()===r.toLowerCase()},
$S:1}
A.ef.prototype={
$1(a){var s,r
t.P.a(a)
s=J.w(a)
r=this.a
return J.J(s.i(a,"house_id")).toLowerCase()===r.toLowerCase()||J.J(s.i(a,"account_number")).toLowerCase()===r.toLowerCase()},
$S:1}
A.et.prototype={
$1(a){var s,r
t.V.a(a)
s=window.localStorage
s.toString
B.i.v(s,"waterhall_session")
s=this.a
s.a=null
s.an()
r=this.b
if(r!=null)B.h.sG(r,"")
s.I("Signed out of Tech session")},
$S:0}
A.eu.prototype={
$1(a){var s,r
t.V.a(a)
s=window.localStorage
s.toString
B.i.v(s,"waterhall_resident_session")
s=this.a
s.d=null
s.an()
r=this.b
if(r!=null)B.h.sG(r,"")
s.I("Signed out of Resident Portal")},
$S:0}
A.ev.prototype={
$1(a){var s,r
t.h.a(a)
s=J.bo(a)
r=s.$ti
A.B(s.a,s.b,r.h("~(1)?").a(new A.ed(this.a,a)),!1,r.c)},
$S:5}
A.ed.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.b.getAttribute("data-target")
if(s==null)s=""
this.a.a3(s)},
$S:0}
A.ew.prototype={
$1(a){return this.a.a8()},
$S:3}
A.ex.prototype={
$1(a){return this.a.a8()},
$S:3}
A.ey.prototype={
$1(a){return this.a.a8()},
$S:3}
A.ez.prototype={
$1(a){t.V.a(a)
return this.a.bK()},
$S:0}
A.eA.prototype={
$1(a){if(A.jC(t.V.a(a).target)===this.b)this.a.bK()},
$S:0}
A.ek.prototype={
$1(a){var s,r,q,p,o,n=this.a,m=n.c
if(m==null)return
s=this.b.checked
r=s===!0?"leak":"normal"
q=$.K().c5(m,r)
if(q!=null){m=document
p=m.getElementById("modal-flow-rate")
if(p!=null)J.m(p,B.d.p(A.v(J.k(q,"flow_rate")),2))
n.be(r)
n.I(r==="leak"?"Simulated Leak ALERT activated!":"Simulated Normal flow rate restored.")
s=n.c
s.toString
n.b8(s)
o=t.I.a(m.getElementById("log-resolved"))
if(o!=null)B.h.saz(o,r==="normal")}},
$S:3}
A.el.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f
t.V.a(a)
s=this.a
if(s.c==null||s.a==null)return
r=document
q=t.o.a(r.getElementById("log-desc"))
p=q==null
if(p)o=null
else{n=q.value
n=n==null?null:B.a.Z(n)
o=n}if(o==null)o=""
n=t.I
m=n.a(r.getElementById("log-resolved"))
l=m==null?null:m.checked
k=l!==!1
if(o.length===0){s.I("Please detail the maintenance actions taken.")
return}j=A.D(["house_id",s.c,"worker_id",s.a.i(0,"worker_id"),"purok",s.a.i(0,"selected_zone"),"description",o,"status_resolved",k,"date",new A.a5(Date.now(),0,!1).ah().ag()],t.N,t.z)
l=$.K()
l.bH(j)
if(k){i=s.c
i.toString
l.c5(i,"normal")
h=n.a(r.getElementById("modal-leak-toggle"))
if(h!=null)B.h.saz(h,!1)
s.be("normal")}n=s.c
n.toString
g=l.a9(n)
if(g!=null){f=r.getElementById("modal-flow-rate")
if(f!=null)J.m(f,B.d.p(A.v(J.k(g,"flow_rate")),2))}if(!p)B.n.sG(q,"")
s.I("Maintenance Log committed to database!")
r=s.c
r.toString
s.b8(r)
s.ae()},
$S:0}
A.em.prototype={
$1(a){var s=this.b.value,r=A.i7(s==null?"":s,null)
if(r==null)r=68
s=this.c
if(s!=null)J.m(s,""+r+"%")
s=t.P.a(A.D(["main_tank_level",r],t.N,t.z))
$.K().bd(s)
this.a.ad()},
$S:3}
A.en.prototype={
$1(a){var s=this.b.value,r=A.b6(s==null?"":s)
if(r==null)r=5.8
s=this.c
if(s!=null)J.m(s,B.d.p(r,1))
s=t.P.a(A.D(["ph_level",r],t.N,t.z))
$.K().bd(s)
this.a.ad()},
$S:3}
A.eo.prototype={
$1(a){var s=this.b.value,r=A.b6(s==null?"":s)
if(r==null)r=6.2
s=this.c
if(s!=null)J.m(s,B.d.p(r,1)+" NTU")
s=t.P.a(A.D(["turbidity",r],t.N,t.z))
$.K().bd(s)
this.a.ad()},
$S:3}
A.ep.prototype={
$1(a){var s,r,q,p,o,n="selected_zone"
t.V.a(a)
s=this.a
if(s.a==null)return
r=document
q=t.Z
p=q.a(r.getElementById("filter-purok"))
o=q.a(r.getElementById("filter-status"))
if(p!=null)B.j.sG(p,A.ag(s.a.i(0,n)))
if(o!=null)B.j.sG(o,"leak")
s.a3("view-directory")
s.I("Showing leaks in your assigned patrol zone "+A.d(s.a.i(0,n)))},
$S:0}
A.eq.prototype={
$1(a){t.V.a(a)
this.a.bm("Dispatching radio ping to Barangay Office...",3500)},
$S:0}
A.er.prototype={
$1(a){var s,r,q,p,o,n,m
t.V.a(a)
s=this.a
if(s.d==null)return
r=t.o.a(document.getElementById("resident-log-desc"))
q=r==null
if(q)p=null
else{o=r.value
o=o==null?null:B.a.Z(o)
p=o}if(p==null)p=""
if(p.length===0){s.I("Please describe the issue (e.g. low pressure, minor leak).")
return}o=$.K()
n=s.d
n.toString
m=o.a9(n)
if(m==null)return
o.bH(A.D(["house_id",s.d,"worker_id","unassigned","purok",J.k(m,"purok"),"description",p+" (RESIDENT REPORTED)","status_resolved",!1],t.N,t.z))
if(!q)B.n.sG(r,"")
s.I("Alert ticket dispatched to field technicians!")
s.ae()},
$S:0}
A.es.prototype={
$1(a){var s,r,q,p,o,n,m
t.V.a(a)
s=this.a
if(s.a==null)return
r=t.o.a(document.getElementById("worker-announcement-input"))
q=r==null
if(q)p=null
else{o=r.value
o=o==null?null:B.a.Z(o)
p=o}if(p==null)p=""
if(p.length===0){s.I("Message cannot be empty")
return}o=$.K()
n=t.N
m=A.D(["message",p,"author",A.p(s.a.i(0,"name")),"timestamp",new A.a5(Date.now(),0,!1).ah().ag()],n,n)
B.b.b3(o.f,0,m)
n=window.localStorage
n.toString
n.setItem("waterhall_announcements",B.e.u(o.f))
o.am("/api/announcements/add",m)
if(!q)B.n.sG(r,"")
s.I("Announcement broadcasted!")},
$S:0}
A.eB.prototype={
$1(a){return J.at(t.h.a(a)).v(0,"active")},
$S:5}
A.fe.prototype={
$1(a){return J.at(t.h.a(a)).v(0,"active")},
$S:5}
A.fk.prototype={
$1(a){var s
t.h.a(a)
s=J.F(a)
if(a.getAttribute("data-target")===this.a)s.gac(a).m(0,"active")
else s.gac(a).v(0,"active")},
$S:5}
A.fl.prototype={
$2(a,b){var s
A.p(a)
t.h.a(b)
s=J.F(b)
if(a===this.a)s.gac(b).m(0,"active")
else s.gac(b).v(0,"active")},
$S:47}
A.eU.prototype={
$1(a){return J.t(J.k(t.P.a(a),"current_leak_status"),"leak")},
$S:1}
A.eV.prototype={
$1(a){var s,r,q
t.P.a(a)
s=document.createElement("div")
s.className="alert-item leak"
r=s.style
r.cursor="pointer"
r=J.w(a)
q=J.F(s)
q.sB(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.d(r.i(a,"owner_name"))+" ("+A.d(r.i(a,"purok"))+")</strong><br>\n              Leak alert: Flow rate at "+B.d.p(A.v(r.i(a,"flow_rate")),2)+" L/s constant.\n            </div>\n          ")
q=q.ga6(s)
r=q.$ti
A.B(q.a,q.b,r.h("~(1)?").a(new A.eT(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:4}
A.eT.prototype={
$1(a){t.V.a(a)
this.a.bZ(A.p(J.k(this.b,"house_id")))},
$S:0}
A.eW.prototype={
$1(a){var s,r,q
t.J.a(a)
s=document.createElement("div")
s.className="alert-item quality"
r=s.style
r.cursor="pointer"
r=J.w(a)
q=J.F(s)
q.sB(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.d(r.i(a,"name"))+"</strong><br>\n              "+A.d(r.i(a,"desc"))+"\n            </div>\n          ")
q=q.ga6(s)
r=q.$ti
A.B(q.a,q.b,r.h("~(1)?").a(new A.eS(this.a)),!1,r.c)
this.b.appendChild(s).toString},
$S:36}
A.eS.prototype={
$1(a){t.V.a(a)
this.a.a3("view-assets")},
$S:0}
A.eX.prototype={
$2(a,b){var s,r,q,p,o,n
A.p(b)
s=document.getElementById("pin-p"+(a+1))
if(s!=null){r=s.querySelector(".pin-bg")
q=B.b.aw(this.b,new A.eQ(b))
if(r!=null)if(q){r.setAttribute("fill","var(--alert-red)")
r.setAttribute("stroke","#FFF")
r.setAttribute("stroke-width","1.5")}else{r.setAttribute("fill","var(--alert-green)")
r.removeAttribute("stroke")}p=s.style
p.cursor="pointer"
p=J.F(s)
o=t.h.a(p.cY(s,!0))
p.dq(s,o)
p=J.bo(o)
n=p.$ti
A.B(p.a,p.b,n.h("~(1)?").a(new A.eR(this.a,b)),!1,n.c)}},
$S:37}
A.eQ.prototype={
$1(a){var s
t.P.a(a)
s=J.w(a)
return J.t(s.i(a,"purok"),this.a)&&J.t(s.i(a,"current_leak_status"),"leak")},
$S:1}
A.eR.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Z
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.j.sG(q,this.b)
if(p!=null)B.j.sG(p,"all")
this.a.a3("view-directory")},
$S:0}
A.eY.prototype={
$1(a){var s,r,q,p,o,n,m,l
A.p(a)
s=this.b
r=A.L(s)
q=r.h("E(1)")
r=r.h("N<1>")
p=new A.N(s,q.a(new A.eN(a)),r).gk(0)
o=new A.N(s,q.a(new A.eO(a)),r).gk(0)
r=this.a
n=J.t(r.a.i(0,"selected_zone"),a)
m=document.createElement("div")
m.className="zone-card "+(n?"assigned":"")
s=n?'<span class="zone-badge">ASSIGNED</span>':""
q=o>0?""+o+" Leaks":"Clear"
l=J.F(m)
l.sB(m,'          <div class="zone-card-header">\n            <span class="zone-name">'+a+"</span>\n            "+s+'\n          </div>\n          <div class="zone-stats">\n            <span>Meters: <strong>'+p+'</strong></span>\n            <span class="zone-leak-count">'+q+"</span>\n          </div>\n        ")
l=l.ga6(m)
q=l.$ti
A.B(l.a,l.b,q.h("~(1)?").a(new A.eP(r,a)),!1,q.c)
this.c.appendChild(m).toString},
$S:38}
A.eN.prototype={
$1(a){return J.t(J.k(t.P.a(a),"purok"),this.a)},
$S:1}
A.eO.prototype={
$1(a){var s
t.P.a(a)
s=J.w(a)
return J.t(s.i(a,"purok"),this.a)&&J.t(s.i(a,"current_leak_status"),"leak")},
$S:1}
A.eP.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Z
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.j.sG(q,this.b)
if(p!=null)B.j.sG(p,"all")
this.a.a3("view-directory")},
$S:0}
A.eZ.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j
t.P.a(a)
s=B.b.bN(this.b,new A.eL(a),new A.eM())
r=J.w(s)
q=r.gN(s)?r.i(s,"owner_name"):"Unknown Household"
p=document.createElement("div")
r=J.w(a)
p.className="log-card "+(J.t(r.i(a,"status_resolved"),!0)?"resolved":"pending")
o=A.bV(A.p(r.i(a,"date"))).aH()
n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
m=B.c.a2(A.aM(o),12)===0?12:B.c.a2(A.aM(o),12)
l=B.a.X(B.c.j(A.by(o)),2,"0")
k=A.aM(o)>=12?"PM":"AM"
j=A.cl(o)-1
if(!(j>=0&&j<12))return A.b(n,j)
j=n[j]
J.aH(p,'            <div class="log-card-header">\n              <span>'+A.d(q)+'</span>\n              <span style="font-size:10px; color:var(--text-muted)">'+(j+" "+A.ck(o)+" "+m+":"+l+" "+k)+'</span>\n            </div>\n            <div class="log-card-desc">'+A.d(r.i(a,"description"))+"</div>\n          ")
this.c.appendChild(p).toString},
$S:4}
A.eL.prototype={
$1(a){var s="house_id"
return J.t(J.k(t.P.a(a),s),J.k(this.a,s))},
$S:1}
A.eM.prototype={
$0(){return A.bw(t.N,t.z)},
$S:39}
A.f0.prototype={
$1(a){var s,r,q,p,o
t.P.a(a)
s=J.w(a)
r=this.a
q=B.a.A(J.J(s.i(a,"owner_name")).toLowerCase(),r)||B.a.A(J.J(s.i(a,"account_number")).toLowerCase(),r)||B.a.A(J.J(s.i(a,"house_id")).toLowerCase(),r)
r=this.b
p=r==="all"||J.t(s.i(a,"purok"),r)
r=this.c
o=r==="all"||J.t(s.i(a,"current_leak_status"),r)
return q&&p&&o},
$S:1}
A.f1.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j="current_leak_status"
t.P.a(a)
s=document.createElement("div")
r=J.w(a)
s.className="household-card "+(J.t(r.i(a,j),"leak")?"has-leak":"")
q=A.d(r.i(a,"owner_name"))
p=A.d(r.i(a,"purok"))
o=A.d(r.i(a,"account_number"))
n=A.d(r.i(a,"current_m3_usage"))
m=A.d(r.i(a,j))
l=J.t(r.i(a,j),"leak")?'<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> Leak':'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Normal'
k=J.F(s)
k.sB(s,'          <div class="household-info">\n            <span class="household-name">'+q+'</span>\n            <div class="household-meta">\n              <span class="household-purok">'+p+'</span>\n              <span class="household-acct">'+o+'</span>\n            </div>\n            <div class="household-usage">Usage this Month: <strong>'+n+' m\xb3</strong></div>\n          </div>\n          <div class="household-status-section">\n            <span class="status-indicator '+m+'">\n              '+l+'\n            </span>\n            <span class="household-flow">Flow: <span>'+B.d.p(A.v(r.i(a,"flow_rate")),2)+" L/s</span></span>\n          </div>\n        ")
k=k.ga6(s)
r=k.$ti
A.B(k.a,k.b,r.h("~(1)?").a(new A.f_(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:4}
A.f_.prototype={
$1(a){t.V.a(a)
this.a.bZ(A.p(J.k(this.b,"house_id")))},
$S:0}
A.f9.prototype={
$2(a,b){A.v(a)
A.v(b)
return a>b?a:b},
$S:40}
A.fa.prototype={
$1(a){var s,r,q,p
t.ek.a(a)
s=a.a
r=a.b
q=this.a.length
p=this.c
if(!(s>=0&&s<4))return A.b(p,s)
return A.D(["x",20+s/(q-1)*300,"y",80-r/this.b*60,"val",r,"label",p[s]],t.N,t.K)},
$S:41}
A.fb.prototype={
$1(a){var s
t.U.a(a)
s=J.w(a)
return B.d.p(A.v(s.i(a,"x")),1)+","+B.d.p(A.v(s.i(a,"y")),1)},
$S:9}
A.fc.prototype={
$1(a){var s
t.U.a(a)
s=J.w(a)
return"L "+B.d.p(A.v(s.i(a,"x")),1)+","+B.d.p(A.v(s.i(a,"y")),1)},
$S:9}
A.fd.prototype={
$1(a){var s,r
t.U.a(a)
s=this.a
r=J.w(a)
s.a=s.a+('        <text x="'+A.d(r.i(a,"x"))+'" y="96" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-weight="600">'+A.d(r.i(a,"label"))+'</text>\n        <line x1="'+A.d(r.i(a,"x"))+'" y1="'+A.d(r.i(a,"y"))+'" x2="'+A.d(r.i(a,"x"))+'" y2="80" stroke="rgba(249,115,22,0.2)" stroke-width="1" stroke-dasharray="2 2" />\n        <circle cx="'+A.d(r.i(a,"x"))+'" cy="'+A.d(r.i(a,"y"))+'" r="4" fill="var(--white)" stroke="'+this.b+'" stroke-width="2" />\n        <text x="'+A.d(r.i(a,"x"))+'" y="'+A.d(A.v(r.i(a,"y"))-8)+'" text-anchor="middle" fill="var(--navy-primary)" font-size="9" font-weight="700">'+A.d(r.i(a,"val"))+"m\xb3</text>\n      ")},
$S:43}
A.f2.prototype={
$1(a){return J.t(J.k(t.P.a(a),"house_id"),this.a)},
$S:1}
A.f3.prototype={
$1(a){var s,r,q,p,o,n,m,l,k="status_resolved"
t.P.a(a)
s=document.createElement("div")
r=J.w(a)
s.className="log-card "+(J.t(r.i(a,k),!0)?"resolved":"pending")
q=A.bV(A.p(r.i(a,"date"))).aH()
p=B.a.X(B.c.j(A.aM(q)),2,"0")
o=B.a.X(B.c.j(A.by(q)),2,"0")
n=A.d(r.i(a,"worker_id"))
m=A.d(r.i(a,"description"))
l=J.t(r.i(a,k),!0)?"var(--alert-green)":"var(--amber-safety)"
r=J.t(r.i(a,k),!0)?"Resolved (Flow Restored)":"In Progress (Active Monitoring)"
J.aH(s,'          <div class="log-card-header">\n            <span>Tech: <strong>'+n+'</strong></span>\n            <span style="font-size:10px; color:var(--text-muted)">'+(""+A.cl(q)+"/"+A.ck(q)+"/"+A.b5(q)+" @ "+p+":"+o)+'</span>\n          </div>\n          <div class="log-card-desc">'+m+'</div>\n          <div style="font-size: 9px; font-weight:700; color:'+l+'; margin-top:4px; text-transform:uppercase">\n            Status: '+r+"\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:4}
A.f4.prototype={
$1(a){var s
A.p(a)
s=a.length
if(s!==0){if(0>=s)return A.b(a,0)
s=a[0]}else s=""
return s},
$S:16}
A.f5.prototype={
$1(a){return J.t(J.k(t.P.a(a),"purok"),this.a.a.i(0,"selected_zone"))},
$S:1}
A.f6.prototype={
$1(a){var s,r="worker_id"
t.P.a(a)
s=J.w(a)
return J.t(s.i(a,r),this.a.a.i(0,r))&&J.t(s.i(a,"status_resolved"),!0)},
$S:1}
A.eC.prototype={
$1(a){return this.a.bk()},
$S:3}
A.eD.prototype={
$1(a){return this.a.bk()},
$S:3}
A.eE.prototype={
$1(a){return this.a.bc()},
$S:3}
A.eF.prototype={
$1(a){var s=t.b4.a(A.jC(t.V.a(a).target)),r=!1
if(s!=null)if(!B.h.A(this.a,s)){r=this.b
r=r!=null&&!J.iy(r,s)}if(r){r=this.b.style
r.display="none"}},
$S:0}
A.eG.prototype={
$1(a){t.V.a(a)
return this.a.cd()},
$S:0}
A.fg.prototype={
$1(a){var s,r
t.P.a(a)
s=J.w(a)
r=this.a
return B.a.A(J.J(s.i(a,"owner_name")).toLowerCase(),r)||B.a.A(J.J(s.i(a,"account_number")).toLowerCase(),r)},
$S:1}
A.fh.prototype={
$1(a){var s,r,q,p
t.P.a(a)
s=document.createElement("div")
s.className="search-result-item"
r=J.w(a)
q=J.F(s)
q.sV(s,A.d(r.i(a,"owner_name"))+" ("+A.d(r.i(a,"account_number"))+")")
q=q.ga6(s)
r=this.c
p=q.$ti
A.B(q.a,q.b,p.h("~(1)?").a(new A.ff(this.a,this.b,a,r)),!1,p.c)
r.appendChild(s).toString},
$S:4}
A.ff.prototype={
$1(a){var s,r,q,p=this
t.V.a(a)
s=p.c
r=J.w(s)
B.h.sG(p.b,A.d(r.i(s,"owner_name"))+" ("+A.d(r.i(s,"account_number"))+")")
q=p.d.style
q.display="none"
p.a.c2(A.ag(r.i(s,"house_id")))},
$S:0}
A.eK.prototype={
$1(a){var s,r,q,p,o,n,m,l="status"
t.P.a(a)
s=document.createElement("div")
r=J.w(a)
s.className="bill-record-card "+A.d(r.i(a,l))
q=A.bV(A.p(r.i(a,"date"))).aH()
p=B.a.X(B.c.j(A.aM(q)),2,"0")
o=B.a.X(B.c.j(A.by(q)),2,"0")
n=A.d(r.i(a,"billing_month"))
m=J.t(r.i(a,l),"Paid")?"var(--alert-green)":"var(--amber-safety)"
J.aH(s,'          <div class="bill-record-header">\n            <span>Cycle: '+n+'</span>\n            <span style="color:'+m+'">'+J.J(r.i(a,l)).toUpperCase()+'</span>\n          </div>\n          <div class="bill-record-details">\n            <span>Readings: '+B.d.p(A.v(r.i(a,"previous_reading")),1)+" \u2192 "+B.d.p(A.v(r.i(a,"current_reading")),1)+" m\xb3</span>\n            <strong>\u20b1"+B.d.p(A.v(r.i(a,"total_due")),2)+'</strong>\n          </div>\n          <div style="font-size:9px;color:var(--text-muted);margin-top:2px;display:flex;justify-content:space-between">\n            <span>'+(""+A.cl(q)+"/"+A.ck(q)+"/"+A.b5(q)+" "+p+":"+o)+" ("+A.d(r.i(a,"bill_id"))+")</span>\n            <span>Tech: "+A.d(r.i(a,"billed_by"))+"</span>\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:4}
A.fj.prototype={
$0(){J.at(this.a).v(0,"show")},
$S:2}
A.fi.prototype={
$1(a){return J.at(t.h.a(a)).v(0,"active")},
$S:5}
A.f7.prototype={
$1(a){return J.t(J.k(t.P.a(a),"billing_month"),"June 2026")},
$S:1}
A.f8.prototype={
$1(a){var s,r,q,p,o,n,m,l="status"
t.P.a(a)
s=document.createElement("div")
r=J.w(a)
s.className="bill-record-card "+A.d(r.i(a,l))
q=A.bV(A.p(r.i(a,"date"))).aH()
p=B.a.X(B.c.j(A.aM(q)),2,"0")
o=B.a.X(B.c.j(A.by(q)),2,"0")
n=A.d(r.i(a,"billing_month"))
m=J.t(r.i(a,l),"Paid")?"var(--alert-green)":"var(--amber-safety)"
J.aH(s,'        <div class="bill-record-header">\n          <span>Cycle: '+n+'</span>\n          <span style="color:'+m+'">'+J.J(r.i(a,l)).toUpperCase()+'</span>\n        </div>\n        <div class="bill-record-details">\n          <span>Usage: '+B.d.p(A.v(r.i(a,"previous_reading")),1)+" \u2192 "+B.d.p(A.v(r.i(a,"current_reading")),1)+" m\xb3 ("+B.d.p(A.v(r.i(a,"consumption")),1)+" m\xb3)</span>\n          <strong>\u20b1"+B.d.p(A.v(r.i(a,"total_due")),2)+'</strong>\n        </div>\n        <div style="font-size:9px;color:var(--text-muted);margin-top:2px;">\n          Bill Ref ID: '+A.d(r.i(a,"bill_id"))+" | Issued: "+(""+A.cl(q)+"/"+A.ck(q)+"/"+A.b5(q)+" "+p+":"+o)+"\n        </div>\n      ")
this.b.appendChild(s).toString},
$S:4}
A.fq.prototype={
aF(){var s=0,r=A.e4(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h
var $async$aF=A.e6(function(a,b){if(a===1){p.push(b)
s=q}for(;;)switch(s){case 0:q=3
s=6
return A.e0(A.iM("/api/all-data"),$async$aF)
case 6:n=b
k=t.P
m=k.a(B.e.S(0,n))
j=t.R
o.a=A.U(j.a(J.k(m,"households")),k)
o.b=A.cb(t.G.a(J.k(m,"centralAssets")),t.N,t.z)
o.c=A.U(j.a(J.k(m,"maintenanceLogs")),k)
o.d=A.U(j.a(J.k(m,"workers")),k)
o.e=A.U(j.a(J.k(m,"billingRecords")),k)
if(J.hX(m,"announcements")){k=A.U(j.a(J.k(m,"announcements")),k)
o.f=k
j=window.localStorage
j.toString
j.setItem("waterhall_announcements",B.e.u(k))}k=window.localStorage
k.toString
k.setItem("waterhall_households",B.e.u(o.a))
k=window.localStorage
k.toString
k.setItem("waterhall_central_assets",B.e.u(o.b))
k=window.localStorage
k.toString
k.setItem("waterhall_maintenance_logs",B.e.u(o.c))
k=window.localStorage
k.toString
k.setItem("waterhall_workers",B.e.u(o.d))
k=window.localStorage
k.toString
k.setItem("waterhall_billing_records",B.e.u(o.e))
A.cT("Database refreshed successfully from server.")
o.a4()
q=1
s=5
break
case 3:q=2
h=p.pop()
l=A.ah(h)
A.cT("Error refreshing data from server: "+A.d(l))
s=5
break
case 2:s=1
break
case 5:return A.e2(null,r)
case 1:return A.e1(p.at(-1),r)}})
return A.e3($async$aF,r)},
W(){var s=0,r=A.e4(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f
var $async$W=A.e6(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:if(n.r){s=1
break}j=window
j.toString
A.B(j,"online",t.fi.a(new A.fw(n)),!1,t.B)
p=4
s=7
return A.e0(A.iM("/api/all-data"),$async$W)
case 7:m=b
j=t.P
l=j.a(B.e.S(0,m))
i=t.R
n.a=A.U(i.a(J.k(l,"households")),j)
n.b=A.cb(t.G.a(J.k(l,"centralAssets")),t.N,t.z)
n.c=A.U(i.a(J.k(l,"maintenanceLogs")),j)
n.d=A.U(i.a(J.k(l,"workers")),j)
n.e=A.U(i.a(J.k(l,"billingRecords")),j)
if(J.hX(l,"announcements")){j=A.U(i.a(J.k(l,"announcements")),j)
n.f=j
i=window.localStorage
i.toString
i.setItem("waterhall_announcements",B.e.u(j))}j=window.localStorage
j.toString
j.setItem("waterhall_households",B.e.u(n.a))
j=window.localStorage
j.toString
j.setItem("waterhall_central_assets",B.e.u(n.b))
j=window.localStorage
j.toString
j.setItem("waterhall_maintenance_logs",B.e.u(n.c))
j=window.localStorage
j.toString
j.setItem("waterhall_workers",B.e.u(n.d))
j=window.localStorage
j.toString
j.setItem("waterhall_billing_records",B.e.u(n.e))
n.r=!0
A.cT("Database successfully synchronized with SQLite backend.")
n.a4()
p=2
s=6
break
case 4:p=3
f=o.pop()
k=A.ah(f)
A.cT("Error fetching database from server, using local fallback: "+A.d(k))
if(window.localStorage.getItem("waterhall_households")==null){j=window.localStorage
j.toString
j.setItem("waterhall_households",B.e.u($.n3))}if(window.localStorage.getItem("waterhall_central_assets")==null){j=window.localStorage
j.toString
j.setItem("waterhall_central_assets",B.e.u($.n2))}if(window.localStorage.getItem("waterhall_maintenance_logs")==null){j=window.localStorage
j.toString
j.setItem("waterhall_maintenance_logs",B.e.u($.n4))}if(window.localStorage.getItem("waterhall_workers")==null){j=window.localStorage
j.toString
j.setItem("waterhall_workers",B.e.u($.n5))}if(window.localStorage.getItem("waterhall_billing_records")==null){j=window.localStorage
j.toString
j.setItem("waterhall_billing_records",B.e.u($.ko()))}if(window.localStorage.getItem("waterhall_announcements")==null){j=window.localStorage
j.toString
j.setItem("waterhall_announcements",B.e.u([]))}j=window.localStorage.getItem("waterhall_households")
j.toString
i=t.R
g=t.P
n.a=A.U(i.a(B.e.S(0,j)),g)
j=window.localStorage.getItem("waterhall_central_assets")
j.toString
n.b=A.cb(t.G.a(B.e.S(0,j)),t.N,t.z)
j=window.localStorage.getItem("waterhall_maintenance_logs")
j.toString
n.c=A.U(i.a(B.e.S(0,j)),g)
j=window.localStorage.getItem("waterhall_workers")
j.toString
n.d=A.U(i.a(B.e.S(0,j)),g)
j=window.localStorage.getItem("waterhall_billing_records")
j.toString
n.e=A.U(i.a(B.e.S(0,j)),g)
if(window.localStorage.getItem("waterhall_announcements")!=null){j=window.localStorage.getItem("waterhall_announcements")
j.toString
n.f=A.U(i.a(B.e.S(0,j)),g)}n.r=!0
s=6
break
case 3:s=2
break
case 6:case 1:return A.e2(q,r)
case 2:return A.e1(o.at(-1),r)}})
return A.e3($async$W,r)},
bu(){var s,r,q,p=window.localStorage.getItem("waterhall_unsynced_actions")
if(p==null)return A.q([],t.t)
try{s=t.j.a(B.e.S(0,p))
r=J.iA(s,new A.fr(),t.P)
r=A.b3(r,r.$ti.h("V.E"))
return r}catch(q){r=A.q([],t.t)
return r}},
by(a){var s
t.D.a(a)
s=window.localStorage
s.toString
s.setItem("waterhall_unsynced_actions",B.e.u(a))},
am(a,b){var s
t.P.a(b)
s=this.bu()
B.b.m(s,A.D(["path",a,"data",b],t.N,t.z))
this.by(s)
this.a4()},
a4(){var s=0,r=A.e4(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$a4=A.e6(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:if(n.w){s=1
break}n.w=!0
g=n.bu()
f=g.length
if(f===0){n.w=!1
s=1
break}A.cT("Found "+f+" unsynced offline operations. Starting auto-upload...")
m=A.U(g,t.P)
f=g.length,e=t.N,d=t.G,c=t.z,b=0
case 3:if(!(b<g.length)){s=5
break}l=g[b]
k=A.p(J.k(l,"path"))
j=A.cb(d.a(J.k(l,"data")),e,c)
p=7
a=B.e.u(j)
s=10
return A.e0(A.iN(k,"POST",null,A.D(["Content-Type","application/json"],e,e),a,null),$async$a4)
case 10:i=a3
if(i.status===200){J.ku(m,l)
A.hV("Successfully uploaded offline record for "+A.d(k))}else{A.hV("Sync failed for "+A.d(k)+" with status: "+A.d(i.status)+". Postponing sync.")
s=5
break}p=2
s=9
break
case 7:p=6
a1=o.pop()
h=A.ah(a1)
f=A.d(k)
e=A.d(h)
A.hV("Network error sync for "+f+": "+e+". Node remains offline.")
s=5
break
s=9
break
case 6:s=2
break
case 9:case 4:g.length===f||(0,A.hW)(g),++b
s=3
break
case 5:n.by(m)
n.w=!1
case 1:return A.e2(q,r)
case 2:return A.e1(o.at(-1),r)}})
return A.e3($async$a4,r)},
a9(a){var s,r,q=this.a
try{s=J.cU(q,new A.fu(a))
return s}catch(r){return null}},
c5(a,b){var s,r="flow_rate",q="leak_detected_at",p=this.a,o=B.b.dd(p,new A.fy(a))
if(o!==-1){if(!(o>=0&&o<p.length))return A.b(p,o)
J.aG(p[o],"current_leak_status",b)
s=p.length
if(b==="leak"){if(!(o<s))return A.b(p,o)
J.aG(p[o],r,0.75+B.k.bX()*0.5)
if(!(o<p.length))return A.b(p,o)
J.aG(p[o],q,new A.a5(Date.now(),0,!1).ah().ag())}else{if(!(o<s))return A.b(p,o)
J.aG(p[o],r,0.01+B.k.bX()*0.09)
if(!(o<p.length))return A.b(p,o)
J.aG(p[o],q,null)}if(!(o<p.length))return A.b(p,o)
this.am("/api/households/update",p[o])
s=window.localStorage
s.toString
s.setItem("waterhall_households",B.e.u(p))
if(!(o<p.length))return A.b(p,o)
return p[o]}return null},
bd(a){var s,r,q,p="ph_status",o="turbidity_status",n="turbidity_desc"
t.P.a(a)
s=this.b
a.q(0,new A.fx(s))
s.l(0,"last_updated",new A.a5(Date.now(),0,!1).ah().ag())
r=A.v(s.i(0,"ph_level"))
q=r<6.5
if(q||r>8.5){s.l(0,p,"warning")
s.l(0,"ph_desc",q?"Acidic pH. Check lime feeder.":"Alkaline pH. Run acid neutralizing wash.")}else{s.l(0,p,"normal")
s.l(0,"ph_desc","pH levels normal.")}if(A.v(s.i(0,"turbidity"))>5){s.l(0,o,"warning")
s.l(0,n,"Elevated turbidity. Check backwash filters.")}else{s.l(0,o,"normal")
s.l(0,n,"Turbidity levels normal.")}this.am("/api/central-assets/update",s)
q=window.localStorage
q.toString
q.setItem("waterhall_central_assets",B.e.u(s))
return s},
bH(a){var s,r,q
t.P.a(a)
s=this.c
r=A.bw(t.N,t.z)
r.l(0,"task_id","LOG-"+(1000+B.k.bY(9000)))
r.l(0,"date",new A.a5(Date.now(),0,!1).ah().ag())
r.P(0,a)
B.b.b3(s,0,r)
this.am("/api/maintenance-logs/add",r)
q=window.localStorage
q.toString
q.setItem("waterhall_maintenance_logs",B.e.u(s))
return r},
bf(a,b){var s,r,q,p
try{s=B.b.bM(this.d,new A.fz(a))
q=A.iU(t.N,t.z)
q.P(0,s)
r=q
J.aG(r,"selected_zone",b)
return r}catch(p){return null}},
aK(a){var s=this.e,r=A.L(s),q=r.h("N<1>"),p=A.b3(new A.N(s,r.h("E(1)").a(new A.fs(a)),q),q.h("j.E"))
B.b.ce(p,new A.ft())
return p},
bQ(a,b){return B.b.aw(this.e,new A.fv(a,b))},
cb(){var s=this.f
if(s.length===0)return null
return B.b.gd7(s)}}
A.fw.prototype={
$1(a){A.cT("Network connection restored. Processing offline actions...")
this.a.a4()},
$S:3}
A.fr.prototype={
$1(a){return A.cb(t.G.a(a),t.N,t.z)},
$S:44}
A.fu.prototype={
$1(a){return J.t(J.k(t.P.a(a),"house_id"),this.a)},
$S:1}
A.fy.prototype={
$1(a){return J.t(J.k(t.P.a(a),"house_id"),this.a)},
$S:1}
A.fx.prototype={
$2(a,b){this.a.l(0,A.p(a),b)},
$S:45}
A.fz.prototype={
$1(a){return J.J(J.k(t.P.a(a),"worker_id")).toLowerCase()===this.a.toLowerCase()},
$S:1}
A.fs.prototype={
$1(a){return J.t(J.k(t.P.a(a),"house_id"),this.a)},
$S:1}
A.ft.prototype={
$2(a,b){var s=t.P
s.a(a)
return A.bV(A.p(J.k(s.a(b),"date"))).a5(0,A.bV(A.p(J.k(a,"date"))))},
$S:46}
A.fv.prototype={
$1(a){var s
t.P.a(a)
s=J.w(a)
return J.t(s.i(a,"house_id"),this.a)&&J.J(s.i(a,"billing_month")).toLowerCase()===this.b.toLowerCase()},
$S:1};(function aliases(){var s=J.c3.prototype
s.cf=s.j
s=J.aK.prototype
s.ci=s.j
s=A.C.prototype
s.cj=s.aM
s=A.j.prototype
s.cg=s.aI
s=A.x.prototype
s.aO=s.R
s=A.cF.prototype
s.ck=s.a1})();(function installTearOffs(){var s=hunkHelpers._static_1,r=hunkHelpers._static_0,q=hunkHelpers.installInstanceTearOff,p=hunkHelpers.installStaticTearOff
s(A,"mH","le",6)
s(A,"mI","lf",6)
s(A,"mJ","lg",6)
r(A,"jO","mA",2)
q(A.cx.prototype,"gcZ",0,1,null,["$2","$1"],["aB","bL"],25,0,0)
s(A,"mL","m4",13)
p(A,"mR",4,null,["$4"],["li"],17,0)
p(A,"mS",4,null,["$4"],["lj"],17,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.u,null)
q(A.u,[A.i4,J.c3,A.cn,J.aS,A.G,A.C,A.fU,A.j,A.b1,A.ce,A.cu,A.bt,A.b9,A.A,A.bT,A.fY,A.fS,A.c_,A.cG,A.aI,A.fL,A.c9,A.ca,A.df,A.hp,A.am,A.dJ,A.hx,A.cH,A.dA,A.ae,A.cx,A.bb,A.Q,A.dB,A.cq,A.dV,A.cP,A.aa,A.dN,A.be,A.ac,A.cd,A.aU,A.d3,A.hn,A.hA,A.a5,A.bX,A.dk,A.co,A.h9,A.av,A.aB,A.W,A.dW,A.Y,A.cM,A.h_,A.dT,A.fp,A.i2,A.cz,A.bd,A.ap,A.ci,A.cF,A.dX,A.aX,A.dE,A.dS,A.cO,A.hk,A.ec,A.fq])
q(J.c3,[J.dd,J.c5,J.Z,J.bu,J.bv,J.c6,J.b_])
q(J.Z,[J.aK,J.O,A.cf,A.z,A.dD,A.d5,A.bW,A.d6,A.e,A.bx,A.dP,A.dU,A.dZ])
q(J.aK,[J.dl,J.bF,J.ax])
r(J.dc,A.cn)
r(J.fH,J.O)
q(J.c6,[J.c4,J.de])
q(A.G,[A.c8,A.aD,A.dg,A.dw,A.dq,A.dI,A.c7,A.cW,A.ai,A.ct,A.dv,A.bB,A.d2])
q(A.C,[A.bG,A.bK,A.a0])
r(A.d1,A.bG)
q(A.j,[A.r,A.b4,A.N])
q(A.r,[A.V,A.b0,A.aA])
q(A.V,[A.cr,A.a_,A.dO,A.dM])
r(A.bY,A.b4)
q(A.A,[A.bH,A.az,A.dL,A.dC])
r(A.b2,A.bH)
r(A.bU,A.bT)
r(A.cj,A.aD)
q(A.aI,[A.d_,A.d0,A.du,A.hP,A.hR,A.h5,A.h4,A.hF,A.hi,A.fW,A.hr,A.fO,A.fB,A.fC,A.fD,A.fE,A.fG,A.h8,A.fR,A.fQ,A.hs,A.ht,A.hu,A.fo,A.hT,A.eH,A.eI,A.eh,A.eg,A.ei,A.ej,A.ee,A.ef,A.et,A.eu,A.ev,A.ed,A.ew,A.ex,A.ey,A.ez,A.eA,A.ek,A.el,A.em,A.en,A.eo,A.ep,A.eq,A.er,A.es,A.eB,A.fe,A.fk,A.eU,A.eV,A.eT,A.eW,A.eS,A.eQ,A.eR,A.eY,A.eN,A.eO,A.eP,A.eZ,A.eL,A.f0,A.f1,A.f_,A.fa,A.fb,A.fc,A.fd,A.f2,A.f3,A.f4,A.f5,A.f6,A.eC,A.eD,A.eE,A.eF,A.eG,A.fg,A.fh,A.ff,A.eK,A.fi,A.f7,A.f8,A.fw,A.fr,A.fu,A.fy,A.fz,A.fs,A.fv])
q(A.du,[A.dr,A.br])
q(A.d0,[A.fI,A.hQ,A.hG,A.hK,A.hj,A.fM,A.fP,A.ho,A.h1,A.h0,A.fF,A.fV,A.hE,A.fl,A.eX,A.f9,A.fx,A.ft])
r(A.aC,A.cf)
r(A.cC,A.aC)
r(A.cD,A.cC)
r(A.aL,A.cD)
q(A.aL,[A.dj,A.cg])
r(A.bL,A.dI)
q(A.d_,[A.h6,A.h7,A.hw,A.hv,A.ha,A.he,A.hd,A.hc,A.hb,A.hh,A.hg,A.hf,A.fX,A.hq,A.hJ,A.hC,A.hB,A.eJ,A.eM,A.fj])
r(A.cw,A.cx)
r(A.dR,A.cP)
q(A.aa,[A.cE,A.d4])
r(A.cA,A.cE)
r(A.cL,A.cd)
r(A.bI,A.cL)
q(A.aU,[A.cZ,A.d7,A.dh])
q(A.d3,[A.fn,A.fK,A.fJ,A.h2])
r(A.di,A.c7)
r(A.hm,A.hn)
r(A.dz,A.d7)
q(A.ai,[A.bz,A.da])
r(A.dF,A.cM)
q(A.z,[A.l,A.c1,A.cv])
q(A.l,[A.x,A.ao,A.aW,A.bJ])
q(A.x,[A.f,A.h])
q(A.f,[A.bp,A.cV,A.bq,A.aT,A.bs,A.d9,A.aZ,A.b7,A.cs,A.ds,A.dt,A.bD,A.b8])
r(A.aV,A.dD)
r(A.c0,A.aW)
r(A.aj,A.c1)
q(A.e,[A.an,A.al])
r(A.a7,A.an)
r(A.dQ,A.dP)
r(A.ch,A.dQ)
r(A.cp,A.dU)
r(A.e_,A.dZ)
r(A.cB,A.e_)
r(A.dG,A.dC)
q(A.d4,[A.dH,A.cY])
r(A.cy,A.cq)
r(A.ba,A.cy)
r(A.dY,A.cF)
r(A.bA,A.h)
s(A.bG,A.b9)
s(A.cC,A.C)
s(A.cD,A.bt)
s(A.bH,A.ac)
s(A.cL,A.ac)
s(A.dD,A.fp)
s(A.dP,A.C)
s(A.dQ,A.ap)
s(A.dU,A.A)
s(A.dZ,A.C)
s(A.e_,A.ap)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{i:"int",bi:"double",X:"num",a:"String",E:"bool",W:"Null",H:"List",u:"Object",o:"Map",n:"JSObject"},mangledNames:{},types:["~(a7)","E(o<a,@>)","~()","~(e)","~(o<a,@>)","~(x)","~(~())","W()","E(a)","a(o<a,u>)","~(u?,u?)","@()","i(a?)","@(@)","~(a,a)","E(ak)","a(a)","E(x,a,a,bd)","W(@)","W(~())","W(u,ar)","~(al)","~(i,@)","~(@,@)","o<a,a>(o<a,a>,a)","~(u[ar?])","~(l,l?)","E(aq<a>)","W(e)","~(bE)","aw<~>(bE)","@(@,a)","0&(a,i?)","@(a)","E(l)","~(@)","~(o<a,a>)","~(i,a)","~(a)","o<a,@>()","X(X,X)","o<a,u>(aB<i,X>)","a(aj)","~(o<a,u>)","o<a,@>(@)","~(a,@)","i(o<a,@>,o<a,@>)","~(a,x)","W(@,ar)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.lC(v.typeUniverse,JSON.parse('{"dl":"aK","bF":"aK","ax":"aK","na":"e","nq":"e","n9":"h","nr":"h","nN":"al","nb":"f","nt":"f","nw":"l","no":"l","nJ":"aW","nu":"a7","nd":"an","np":"Z","nc":"ao","ny":"ao","ns":"x","dd":{"E":[],"ab":[]},"c5":{"ab":[]},"Z":{"n":[]},"aK":{"n":[]},"O":{"H":["1"],"r":["1"],"n":[],"j":["1"]},"dc":{"cn":[]},"fH":{"O":["1"],"H":["1"],"r":["1"],"n":[],"j":["1"]},"aS":{"a6":["1"]},"c6":{"bi":[],"X":[]},"c4":{"bi":[],"i":[],"X":[],"ab":[]},"de":{"bi":[],"X":[],"ab":[]},"b_":{"a":[],"fT":[],"ab":[]},"c8":{"G":[]},"d1":{"C":["i"],"b9":["i"],"H":["i"],"r":["i"],"j":["i"],"C.E":"i","b9.E":"i"},"r":{"j":["1"]},"V":{"r":["1"],"j":["1"]},"cr":{"V":["1"],"r":["1"],"j":["1"],"V.E":"1","j.E":"1"},"b1":{"a6":["1"]},"b4":{"j":["2"],"j.E":"2"},"bY":{"b4":["1","2"],"r":["2"],"j":["2"],"j.E":"2"},"ce":{"a6":["2"]},"a_":{"V":["2"],"r":["2"],"j":["2"],"V.E":"2","j.E":"2"},"N":{"j":["1"],"j.E":"1"},"cu":{"a6":["1"]},"bG":{"C":["1"],"b9":["1"],"H":["1"],"r":["1"],"j":["1"]},"dO":{"V":["i"],"r":["i"],"j":["i"],"V.E":"i","j.E":"i"},"b2":{"A":["i","1"],"ac":["i","1"],"o":["i","1"],"A.K":"i","A.V":"1","ac.K":"i","ac.V":"1"},"bT":{"o":["1","2"]},"bU":{"bT":["1","2"],"o":["1","2"]},"cj":{"aD":[],"G":[]},"dg":{"G":[]},"dw":{"G":[]},"cG":{"ar":[]},"aI":{"aY":[]},"d_":{"aY":[]},"d0":{"aY":[]},"du":{"aY":[]},"dr":{"aY":[]},"br":{"aY":[]},"dq":{"G":[]},"az":{"A":["1","2"],"iT":["1","2"],"o":["1","2"],"A.K":"1","A.V":"2"},"b0":{"r":["1"],"j":["1"],"j.E":"1"},"c9":{"a6":["1"]},"aA":{"r":["1"],"j":["1"],"j.E":"1"},"ca":{"a6":["1"]},"df":{"l0":[],"fT":[]},"cf":{"n":[]},"aC":{"ay":["1"],"n":[]},"aL":{"C":["i"],"aC":["i"],"H":["i"],"ay":["i"],"r":["i"],"n":[],"j":["i"],"bt":["i"]},"dj":{"aL":[],"C":["i"],"aC":["i"],"H":["i"],"ay":["i"],"r":["i"],"n":[],"j":["i"],"bt":["i"],"ab":[],"C.E":"i"},"cg":{"aL":[],"ia":[],"C":["i"],"aC":["i"],"H":["i"],"ay":["i"],"r":["i"],"n":[],"j":["i"],"bt":["i"],"ab":[],"C.E":"i"},"dI":{"G":[]},"bL":{"aD":[],"G":[]},"cH":{"bE":[]},"ae":{"G":[]},"cw":{"cx":["1"]},"Q":{"aw":["1"]},"cP":{"je":[]},"dR":{"cP":[],"je":[]},"cA":{"aa":["1"],"aq":["1"],"r":["1"],"j":["1"],"aa.E":"1"},"be":{"a6":["1"]},"C":{"H":["1"],"r":["1"],"j":["1"]},"A":{"o":["1","2"]},"bH":{"A":["1","2"],"ac":["1","2"],"o":["1","2"]},"cd":{"o":["1","2"]},"bI":{"cL":["1","2"],"cd":["1","2"],"ac":["1","2"],"o":["1","2"],"ac.K":"1","ac.V":"2"},"aa":{"aq":["1"],"r":["1"],"j":["1"]},"cE":{"aa":["1"],"aq":["1"],"r":["1"],"j":["1"]},"dL":{"A":["a","@"],"o":["a","@"],"A.K":"a","A.V":"@"},"dM":{"V":["a"],"r":["a"],"j":["a"],"V.E":"a","j.E":"a"},"cZ":{"aU":["H<i>","a"]},"d7":{"aU":["a","H<i>"]},"c7":{"G":[]},"di":{"G":[]},"dh":{"aU":["u?","a"]},"dz":{"aU":["a","H<i>"]},"bi":{"X":[]},"i":{"X":[]},"H":{"r":["1"],"j":["1"]},"aq":{"r":["1"],"j":["1"]},"a":{"fT":[]},"cW":{"G":[]},"aD":{"G":[]},"ai":{"G":[]},"bz":{"G":[]},"da":{"G":[]},"ct":{"G":[]},"dv":{"G":[]},"bB":{"G":[]},"d2":{"G":[]},"dk":{"G":[]},"co":{"G":[]},"dW":{"ar":[]},"Y":{"l4":[]},"cM":{"dx":[]},"dT":{"dx":[]},"dF":{"dx":[]},"x":{"l":[],"z":[],"n":[]},"e":{"n":[]},"aj":{"z":[],"n":[]},"a7":{"e":[],"n":[]},"l":{"z":[],"n":[]},"al":{"e":[],"n":[]},"bd":{"ak":[]},"f":{"x":[],"l":[],"z":[],"n":[]},"bp":{"f":[],"x":[],"l":[],"z":[],"n":[]},"cV":{"f":[],"x":[],"l":[],"z":[],"n":[]},"bq":{"f":[],"x":[],"l":[],"z":[],"n":[]},"aT":{"f":[],"x":[],"l":[],"z":[],"n":[]},"bs":{"f":[],"x":[],"l":[],"z":[],"n":[]},"ao":{"l":[],"z":[],"n":[]},"aV":{"n":[]},"aW":{"l":[],"z":[],"n":[]},"d5":{"n":[]},"bW":{"n":[]},"d6":{"n":[]},"bK":{"C":["1"],"H":["1"],"r":["1"],"j":["1"],"C.E":"1"},"z":{"n":[]},"d9":{"f":[],"x":[],"l":[],"z":[],"n":[]},"c0":{"l":[],"z":[],"n":[]},"c1":{"z":[],"n":[]},"aZ":{"j0":[],"iH":[],"f":[],"x":[],"l":[],"z":[],"n":[]},"bx":{"n":[]},"a0":{"C":["l"],"H":["l"],"r":["l"],"j":["l"],"C.E":"l"},"ch":{"C":["l"],"ap":["l"],"H":["l"],"ay":["l"],"r":["l"],"n":[],"j":["l"],"C.E":"l","ap.E":"l"},"b7":{"f":[],"x":[],"l":[],"z":[],"n":[]},"cp":{"A":["a","a"],"n":[],"o":["a","a"],"A.K":"a","A.V":"a"},"cs":{"f":[],"x":[],"l":[],"z":[],"n":[]},"ds":{"f":[],"x":[],"l":[],"z":[],"n":[]},"dt":{"f":[],"x":[],"l":[],"z":[],"n":[]},"bD":{"f":[],"x":[],"l":[],"z":[],"n":[]},"b8":{"f":[],"x":[],"l":[],"z":[],"n":[]},"an":{"e":[],"n":[]},"cv":{"h3":[],"z":[],"n":[]},"bJ":{"l":[],"z":[],"n":[]},"cB":{"C":["l"],"ap":["l"],"H":["l"],"ay":["l"],"r":["l"],"n":[],"j":["l"],"C.E":"l","ap.E":"l"},"dC":{"A":["a","a"],"o":["a","a"]},"dG":{"A":["a","a"],"o":["a","a"],"A.K":"a","A.V":"a"},"dH":{"aa":["a"],"aq":["a"],"r":["a"],"j":["a"],"aa.E":"a"},"cy":{"cq":["1"]},"ba":{"cy":["1"],"cq":["1"]},"cz":{"l3":["1"]},"ci":{"ak":[]},"cF":{"ak":[]},"dY":{"ak":[]},"dX":{"ak":[]},"aX":{"a6":["1"]},"dE":{"h3":[],"z":[],"n":[]},"dS":{"l9":[]},"cO":{"kU":[]},"d4":{"aa":["a"],"aq":["a"],"r":["a"],"j":["a"]},"bA":{"h":[],"x":[],"l":[],"z":[],"n":[]},"cY":{"aa":["a"],"aq":["a"],"r":["a"],"j":["a"],"aa.E":"a"},"h":{"x":[],"l":[],"z":[],"n":[]},"kK":{"H":["i"],"r":["i"],"j":["i"]},"ia":{"H":["i"],"r":["i"],"j":["i"]}}'))
A.lB(v.typeUniverse,JSON.parse('{"r":1,"bG":1,"aC":1,"bH":2,"cE":1,"d3":2}'))
var u={f:"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u03f6\x00\u0404\u03f4 \u03f4\u03f6\u01f6\u01f6\u03f6\u03fc\u01f4\u03ff\u03ff\u0584\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u05d4\u01f4\x00\u01f4\x00\u0504\u05c4\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0400\x00\u0400\u0200\u03f7\u0200\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0200\u0200\u0200\u03f7\x00",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.e8
return{u:s("ae"),cR:s("bq"),c:s("aT"),dy:s("a5"),gw:s("r<@>"),h:s("x"),Q:s("G"),B:s("e"),Y:s("aY"),bo:s("aj"),eh:s("j<l>"),R:s("j<@>"),hb:s("j<i>"),gE:s("O<o<a,a>>"),t:s("O<o<a,@>>"),k:s("O<ak>"),s:s("O<a>"),gn:s("O<@>"),b:s("O<i>"),T:s("c5"),m:s("n"),r:s("ax"),aU:s("ay<@>"),ey:s("b2<a>"),D:s("H<o<a,@>>"),j:s("H<@>"),L:s("H<i>"),bj:s("H<X>"),d:s("bx"),ek:s("aB<i,X>"),by:s("o<a,x>"),U:s("o<a,u>"),J:s("o<a,a>"),P:s("o<a,@>"),G:s("o<@,@>"),e:s("a_<a,a>"),V:s("a7"),eB:s("aL"),A:s("l"),w:s("ak"),a:s("W"),K:s("u"),x:s("al"),gT:s("nv"),ew:s("bA"),cq:s("aq<a>"),l:s("ar"),N:s("a"),dG:s("a(a)"),g7:s("h"),aW:s("bD"),p:s("bE"),dm:s("ab"),eK:s("aD"),ak:s("bF"),dw:s("bI<a,a>"),dD:s("dx"),ci:s("h3"),gD:s("cw<aj>"),h9:s("bJ"),ac:s("a0"),E:s("ba<e>"),C:s("ba<a7>"),cD:s("bK<x>"),ao:s("Q<aj>"),_:s("Q<@>"),fJ:s("Q<i>"),cr:s("bd"),y:s("E"),al:s("E(u)"),i:s("bi"),z:s("@"),fO:s("@()"),v:s("@(u)"),W:s("@(u,ar)"),bU:s("@(aq<a>)"),S:s("i"),q:s("bs?"),I:s("iH?"),b4:s("x?"),ch:s("z?"),eH:s("aw<W>?"),dg:s("f?"),f:s("aZ?"),an:s("n?"),bM:s("H<@>?"),X:s("u?"),O:s("j0?"),Z:s("b7?"),dk:s("a?"),o:s("b8?"),F:s("bb<@,@>?"),g:s("dN?"),fQ:s("E?"),fW:s("bi?"),bw:s("@(e)?"),h6:s("i?"),cg:s("X?"),g5:s("~()?"),fi:s("~(e)?"),h2:s("~(a7)?"),gx:s("~(al)?"),n:s("X"),H:s("~"),M:s("~()"),eA:s("~(a,a)"),cA:s("~(a,@)"),cB:s("~(bE)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.A=A.bp.prototype
B.q=A.aT.prototype
B.m=A.aV.prototype
B.J=A.bW.prototype
B.v=A.c0.prototype
B.L=A.aj.prototype
B.h=A.aZ.prototype
B.M=J.c3.prototype
B.b=J.O.prototype
B.c=J.c4.prototype
B.d=J.c6.prototype
B.a=J.b_.prototype
B.N=J.ax.prototype
B.O=J.Z.prototype
B.x=A.cg.prototype
B.y=J.dl.prototype
B.j=A.b7.prototype
B.i=A.cp.prototype
B.z=A.cs.prototype
B.n=A.b8.prototype
B.p=J.bF.prototype
B.a_=new A.fn()
B.B=new A.cZ()
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

B.e=new A.dh()
B.I=new A.dk()
B.a0=new A.fU()
B.u=new A.dz()
B.k=new A.hk()
B.f=new A.dR()
B.l=new A.dW()
B.K=new A.bX(0)
B.P=new A.fJ(null)
B.Q=new A.fK(null)
B.R=s([],t.s)
B.w=s(["bind","if","ref","repeat","syntax"],t.s)
B.o=s(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"],t.s)
B.S=s(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"],t.s)
B.T=s(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"],t.s)
B.V={}
B.U=new A.bU(B.V,[],A.e8("bU<a,a>"))
B.W=A.iv("kK")
B.X=A.iv("u")
B.Y=A.iv("ia")
B.Z=new A.h2(!1)})();(function staticFields(){$.hl=null
$.ad=A.q([],A.e8("O<u>"))
$.iW=null
$.iF=null
$.iE=null
$.jS=null
$.jN=null
$.jW=null
$.hM=null
$.hS=null
$.is=null
$.bO=null
$.cQ=null
$.cR=null
$.io=!1
$.I=B.f
$.aJ=null
$.i1=null
$.iL=null
$.iK=null
$.dK=A.bw(t.N,t.Y)
$.n5=function(){var s=t.N,r=t.z
return A.q([A.D(["worker_id","EMP-301","name","Michael Balaga","role","Lead Field Tech","zone","Purok 1"],s,r),A.D(["worker_id","EMP-304","name","Ryiel Banggat","role","Field Technician","zone","Purok 2"],s,r),A.D(["worker_id","EMP-308","name","John Dave Chicote","role","Zone Inspector","zone","Purok 5"],s,r)],t.t)}()
$.n3=function(){var s="current_leak_status",r="current_m3_usage",q="leak_detected_at",p=A.e8("O<bi>"),o=t.N,n=t.z
return A.q([A.D(["house_id","HH-101","owner_name","Maria C. Santos","purok","Purok 1","account_number","TAG-2026-0041",s,"leak",r,18.4,"flow_rate",0.85,"monthly_history",A.q([12.4,14.1,15.8,18.4],p),q,"2026-06-24T18:30:00Z"],o,n),A.D(["house_id","HH-102","owner_name","Ramon P. Del Rosario","purok","Purok 1","account_number","TAG-2026-0105",s,"normal",r,12.1,"flow_rate",0.05,"monthly_history",A.q([11.8,12,11.5,12.1],p),q,null],o,n),A.D(["house_id","HH-103","owner_name","Elena F. Garcia","purok","Purok 2","account_number","TAG-2026-0312",s,"leak",r,24.8,"flow_rate",0.98,"monthly_history",A.q([15.2,16,19.5,24.8],p),q,"2026-06-25T02:15:00Z"],o,n),A.D(["house_id","HH-104","owner_name","Delfin S. Alcantara","purok","Purok 2","account_number","TAG-2026-0421",s,"normal",r,9.3,"flow_rate",0.02,"monthly_history",A.q([8.5,9,9.1,9.3],p),q,null],o,n),A.D(["house_id","HH-105","owner_name","Clara M. Aquino","purok","Purok 3","account_number","TAG-2026-0810",s,"normal",r,15.6,"flow_rate",0.08,"monthly_history",A.q([14,15.2,14.9,15.6],p),q,null],o,n),A.D(["house_id","HH-106","owner_name","Manuel L. Roxas","purok","Purok 3","account_number","TAG-2026-0925",s,"normal",r,21,"flow_rate",0.11,"monthly_history",A.q([19.2,20.1,20.8,21],p),q,null],o,n),A.D(["house_id","HH-107","owner_name","Felipe A. Agoncillo","purok","Purok 4","account_number","TAG-2026-1102",s,"leak",r,32.5,"flow_rate",1.45,"monthly_history",A.q([18.4,21,25.1,32.5],p),q,"2026-06-25T08:45:00Z"],o,n),A.D(["house_id","HH-108","owner_name","Gregoria de Jesus","purok","Purok 4","account_number","TAG-2026-1349",s,"normal",r,14.2,"flow_rate",0.04,"monthly_history",A.q([13.1,13.9,14,14.2],p),q,null],o,n),A.D(["house_id","HH-109","owner_name","Antonio N. Luna","purok","Purok 5","account_number","TAG-2026-1509",s,"normal",r,11,"flow_rate",0.06,"monthly_history",A.q([10.5,10.9,11.2,11],p),q,null],o,n),A.D(["house_id","HH-110","owner_name","Leonor Rivera","purok","Purok 6","account_number","TAG-2026-1772",s,"normal",r,13.7,"flow_rate",0.05,"monthly_history",A.q([12.8,13.2,13.4,13.7],p),q,null],o,n)],t.t)}()
$.n2=A.D(["main_tank_level",68,"ph_level",5.8,"ph_status","warning","ph_desc","Acidic pH detected. Add neutralizing agent.","turbidity",6.2,"turbidity_status","warning","turbidity_desc","Slightly high turbidity. Filter check recommended.","last_updated","2026-06-25T11:00:00Z"],t.N,t.z)
$.n4=function(){var s=t.N,r=t.z
return A.q([A.D(["task_id","LOG-1001","house_id","HH-102","worker_id","EMP-304","purok","Purok 1","description","Replaced main brass pipe fitting. Leak resolved.","date","2026-06-23T09:30:00Z","status_resolved",!0],s,r),A.D(["task_id","LOG-1002","house_id","HH-104","worker_id","EMP-304","purok","Purok 2","description","Inspected meter calibration. Flow rate verified normal.","date","2026-06-24T14:20:00Z","status_resolved",!0],s,r)],t.t)}()})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal
s($,"nh","k1",()=>A.jR("_$dart_dartClosure"))
s($,"ng","k0",()=>A.jR("_$dart_dartClosure_dartJSInterop"))
s($,"nS","kn",()=>A.q([new J.dc()],A.e8("O<cn>")))
s($,"nz","k7",()=>A.aE(A.fZ({
toString:function(){return"$receiver$"}})))
s($,"nA","k8",()=>A.aE(A.fZ({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"nB","k9",()=>A.aE(A.fZ(null)))
s($,"nC","ka",()=>A.aE(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nF","kd",()=>A.aE(A.fZ(void 0)))
s($,"nG","ke",()=>A.aE(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(r){return r.message}}()))
s($,"nE","kc",()=>A.aE(A.j8(null)))
s($,"nD","kb",()=>A.aE(function(){try{null.$method$}catch(r){return r.message}}()))
s($,"nI","kg",()=>A.aE(A.j8(void 0)))
s($,"nH","kf",()=>A.aE(function(){try{(void 0).$method$}catch(r){return r.message}}()))
s($,"nK","ix",()=>A.ld())
s($,"nQ","kl",()=>A.kT(4096))
s($,"nO","kj",()=>new A.hC().$0())
s($,"nP","kk",()=>new A.hB().$0())
s($,"nL","kh",()=>new Int8Array(A.m6(A.q([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.b))))
s($,"ni","k2",()=>A.j1("^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(?:[.,](\\d+))?)?)?( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$"))
s($,"nR","km",()=>A.jU(B.X))
s($,"nf","k_",()=>({}))
s($,"nM","ki",()=>A.iV(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],t.N))
s($,"ne","jZ",()=>A.j1("^\\S+$"))
s($,"nm","iw",()=>B.a.aC(A.i_(),"Opera",0))
s($,"nl","k5",()=>!$.iw()&&B.a.aC(A.i_(),"Trident/",0))
s($,"nk","k4",()=>B.a.aC(A.i_(),"Firefox",0))
s($,"nj","k3",()=>"-"+$.k6()+"-")
s($,"nn","k6",()=>{if($.k4())var r="moz"
else if($.k5())r="ms"
else r=$.iw()?"o":"webkit"
return r})
s($,"nV","ko",()=>{var r="previous_reading",q=t.N,p=t.z
return A.q([A.D(["bill_id","BILL-5001","house_id","HH-101","account_number","TAG-2026-0041","billing_month","June 2026",r,15.8,"current_reading",18.4,"consumption",2.6,"water_charge",120,"maintenance_fee",50,"total_due",170,"billed_by","EMP-304","date","2026-06-24T18:45:00Z","status","Pending"],q,p),A.D(["bill_id","BILL-5002","house_id","HH-101","account_number","TAG-2026-0041","billing_month","May 2026",r,14.1,"current_reading",15.8,"consumption",1.7,"water_charge",120,"maintenance_fee",50,"total_due",170,"billed_by","EMP-304","date","2026-05-24T10:15:00Z","status","Paid"],q,p),A.D(["bill_id","BILL-5003","house_id","HH-102","account_number","TAG-2026-0105","billing_month","May 2026",r,11.5,"current_reading",12.1,"consumption",0.6,"water_charge",120,"maintenance_fee",50,"total_due",170,"billed_by","EMP-304","date","2026-05-24T10:30:00Z","status","Paid"],q,p)],t.t)})
s($,"nT","K",()=>{var r=t.t
return new A.fq(A.q([],r),A.bw(t.N,t.z),A.q([],r),A.q([],r),A.q([],r),A.q([],r))})})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({DOMError:J.Z,MediaError:J.Z,Navigator:J.Z,NavigatorConcurrentHardware:J.Z,NavigatorUserMediaError:J.Z,OverconstrainedError:J.Z,PositionError:J.Z,GeolocationPositionError:J.Z,Range:J.Z,ArrayBufferView:A.cf,Int8Array:A.dj,Uint8Array:A.cg,HTMLAudioElement:A.f,HTMLBRElement:A.f,HTMLCanvasElement:A.f,HTMLContentElement:A.f,HTMLDListElement:A.f,HTMLDataElement:A.f,HTMLDataListElement:A.f,HTMLDetailsElement:A.f,HTMLDialogElement:A.f,HTMLDivElement:A.f,HTMLEmbedElement:A.f,HTMLFieldSetElement:A.f,HTMLHRElement:A.f,HTMLHeadElement:A.f,HTMLHeadingElement:A.f,HTMLHtmlElement:A.f,HTMLIFrameElement:A.f,HTMLImageElement:A.f,HTMLLIElement:A.f,HTMLLabelElement:A.f,HTMLLegendElement:A.f,HTMLLinkElement:A.f,HTMLMapElement:A.f,HTMLMediaElement:A.f,HTMLMenuElement:A.f,HTMLMetaElement:A.f,HTMLMeterElement:A.f,HTMLModElement:A.f,HTMLOListElement:A.f,HTMLObjectElement:A.f,HTMLOptGroupElement:A.f,HTMLOptionElement:A.f,HTMLOutputElement:A.f,HTMLParagraphElement:A.f,HTMLParamElement:A.f,HTMLPictureElement:A.f,HTMLPreElement:A.f,HTMLProgressElement:A.f,HTMLQuoteElement:A.f,HTMLScriptElement:A.f,HTMLShadowElement:A.f,HTMLSlotElement:A.f,HTMLSourceElement:A.f,HTMLSpanElement:A.f,HTMLStyleElement:A.f,HTMLTableCaptionElement:A.f,HTMLTableCellElement:A.f,HTMLTableDataCellElement:A.f,HTMLTableHeaderCellElement:A.f,HTMLTableColElement:A.f,HTMLTimeElement:A.f,HTMLTitleElement:A.f,HTMLTrackElement:A.f,HTMLUListElement:A.f,HTMLUnknownElement:A.f,HTMLVideoElement:A.f,HTMLDirectoryElement:A.f,HTMLFontElement:A.f,HTMLFrameElement:A.f,HTMLFrameSetElement:A.f,HTMLMarqueeElement:A.f,HTMLElement:A.f,HTMLAnchorElement:A.bp,HTMLAreaElement:A.cV,HTMLBaseElement:A.bq,HTMLBodyElement:A.aT,HTMLButtonElement:A.bs,CDATASection:A.ao,CharacterData:A.ao,Comment:A.ao,ProcessingInstruction:A.ao,Text:A.ao,CSSStyleDeclaration:A.aV,MSStyleCSSProperties:A.aV,CSS2Properties:A.aV,XMLDocument:A.aW,Document:A.aW,DOMException:A.d5,DOMImplementation:A.bW,DOMTokenList:A.d6,MathMLElement:A.x,Element:A.x,AbortPaymentEvent:A.e,AnimationEvent:A.e,AnimationPlaybackEvent:A.e,ApplicationCacheErrorEvent:A.e,BackgroundFetchClickEvent:A.e,BackgroundFetchEvent:A.e,BackgroundFetchFailEvent:A.e,BackgroundFetchedEvent:A.e,BeforeInstallPromptEvent:A.e,BeforeUnloadEvent:A.e,BlobEvent:A.e,CanMakePaymentEvent:A.e,ClipboardEvent:A.e,CloseEvent:A.e,CustomEvent:A.e,DeviceMotionEvent:A.e,DeviceOrientationEvent:A.e,ErrorEvent:A.e,ExtendableEvent:A.e,ExtendableMessageEvent:A.e,FetchEvent:A.e,FontFaceSetLoadEvent:A.e,ForeignFetchEvent:A.e,GamepadEvent:A.e,HashChangeEvent:A.e,InstallEvent:A.e,MediaEncryptedEvent:A.e,MediaKeyMessageEvent:A.e,MediaQueryListEvent:A.e,MediaStreamEvent:A.e,MediaStreamTrackEvent:A.e,MessageEvent:A.e,MIDIConnectionEvent:A.e,MIDIMessageEvent:A.e,MutationEvent:A.e,NotificationEvent:A.e,PageTransitionEvent:A.e,PaymentRequestEvent:A.e,PaymentRequestUpdateEvent:A.e,PopStateEvent:A.e,PresentationConnectionAvailableEvent:A.e,PresentationConnectionCloseEvent:A.e,PromiseRejectionEvent:A.e,PushEvent:A.e,RTCDataChannelEvent:A.e,RTCDTMFToneChangeEvent:A.e,RTCPeerConnectionIceEvent:A.e,RTCTrackEvent:A.e,SecurityPolicyViolationEvent:A.e,SensorErrorEvent:A.e,SpeechRecognitionError:A.e,SpeechRecognitionEvent:A.e,SpeechSynthesisEvent:A.e,StorageEvent:A.e,SyncEvent:A.e,TrackEvent:A.e,TransitionEvent:A.e,WebKitTransitionEvent:A.e,VRDeviceEvent:A.e,VRDisplayEvent:A.e,VRSessionEvent:A.e,MojoInterfaceRequestEvent:A.e,USBConnectionEvent:A.e,IDBVersionChangeEvent:A.e,AudioProcessingEvent:A.e,OfflineAudioCompletionEvent:A.e,WebGLContextEvent:A.e,Event:A.e,InputEvent:A.e,SubmitEvent:A.e,EventTarget:A.z,HTMLFormElement:A.d9,HTMLDocument:A.c0,XMLHttpRequest:A.aj,XMLHttpRequestEventTarget:A.c1,HTMLInputElement:A.aZ,Location:A.bx,MouseEvent:A.a7,DragEvent:A.a7,PointerEvent:A.a7,WheelEvent:A.a7,DocumentFragment:A.l,ShadowRoot:A.l,DocumentType:A.l,Node:A.l,NodeList:A.ch,RadioNodeList:A.ch,ProgressEvent:A.al,ResourceProgressEvent:A.al,HTMLSelectElement:A.b7,Storage:A.cp,HTMLTableElement:A.cs,HTMLTableRowElement:A.ds,HTMLTableSectionElement:A.dt,HTMLTemplateElement:A.bD,HTMLTextAreaElement:A.b8,CompositionEvent:A.an,FocusEvent:A.an,KeyboardEvent:A.an,TextEvent:A.an,TouchEvent:A.an,UIEvent:A.an,Window:A.cv,DOMWindow:A.cv,Attr:A.bJ,NamedNodeMap:A.cB,MozNamedAttrMap:A.cB,SVGScriptElement:A.bA,SVGAElement:A.h,SVGAnimateElement:A.h,SVGAnimateMotionElement:A.h,SVGAnimateTransformElement:A.h,SVGAnimationElement:A.h,SVGCircleElement:A.h,SVGClipPathElement:A.h,SVGDefsElement:A.h,SVGDescElement:A.h,SVGDiscardElement:A.h,SVGEllipseElement:A.h,SVGFEBlendElement:A.h,SVGFEColorMatrixElement:A.h,SVGFEComponentTransferElement:A.h,SVGFECompositeElement:A.h,SVGFEConvolveMatrixElement:A.h,SVGFEDiffuseLightingElement:A.h,SVGFEDisplacementMapElement:A.h,SVGFEDistantLightElement:A.h,SVGFEFloodElement:A.h,SVGFEFuncAElement:A.h,SVGFEFuncBElement:A.h,SVGFEFuncGElement:A.h,SVGFEFuncRElement:A.h,SVGFEGaussianBlurElement:A.h,SVGFEImageElement:A.h,SVGFEMergeElement:A.h,SVGFEMergeNodeElement:A.h,SVGFEMorphologyElement:A.h,SVGFEOffsetElement:A.h,SVGFEPointLightElement:A.h,SVGFESpecularLightingElement:A.h,SVGFESpotLightElement:A.h,SVGFETileElement:A.h,SVGFETurbulenceElement:A.h,SVGFilterElement:A.h,SVGForeignObjectElement:A.h,SVGGElement:A.h,SVGGeometryElement:A.h,SVGGraphicsElement:A.h,SVGImageElement:A.h,SVGLineElement:A.h,SVGLinearGradientElement:A.h,SVGMarkerElement:A.h,SVGMaskElement:A.h,SVGMetadataElement:A.h,SVGPathElement:A.h,SVGPatternElement:A.h,SVGPolygonElement:A.h,SVGPolylineElement:A.h,SVGRadialGradientElement:A.h,SVGRectElement:A.h,SVGSetElement:A.h,SVGStopElement:A.h,SVGStyleElement:A.h,SVGSVGElement:A.h,SVGSwitchElement:A.h,SVGSymbolElement:A.h,SVGTSpanElement:A.h,SVGTextContentElement:A.h,SVGTextElement:A.h,SVGTextPathElement:A.h,SVGTextPositioningElement:A.h,SVGTitleElement:A.h,SVGUseElement:A.h,SVGViewElement:A.h,SVGGradientElement:A.h,SVGComponentTransferFunctionElement:A.h,SVGFEDropShadowElement:A.h,SVGMPathElement:A.h,SVGElement:A.h})
hunkHelpers.setOrUpdateLeafTags({DOMError:true,MediaError:true,Navigator:true,NavigatorConcurrentHardware:true,NavigatorUserMediaError:true,OverconstrainedError:true,PositionError:true,GeolocationPositionError:true,Range:true,ArrayBufferView:false,Int8Array:true,Uint8Array:false,HTMLAudioElement:true,HTMLBRElement:true,HTMLCanvasElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLDivElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHeadingElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLImageElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOptionElement:true,HTMLOutputElement:true,HTMLParagraphElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLSpanElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,HTMLAnchorElement:true,HTMLAreaElement:true,HTMLBaseElement:true,HTMLBodyElement:true,HTMLButtonElement:true,CDATASection:true,CharacterData:true,Comment:true,ProcessingInstruction:true,Text:true,CSSStyleDeclaration:true,MSStyleCSSProperties:true,CSS2Properties:true,XMLDocument:true,Document:false,DOMException:true,DOMImplementation:true,DOMTokenList:true,MathMLElement:true,Element:false,AbortPaymentEvent:true,AnimationEvent:true,AnimationPlaybackEvent:true,ApplicationCacheErrorEvent:true,BackgroundFetchClickEvent:true,BackgroundFetchEvent:true,BackgroundFetchFailEvent:true,BackgroundFetchedEvent:true,BeforeInstallPromptEvent:true,BeforeUnloadEvent:true,BlobEvent:true,CanMakePaymentEvent:true,ClipboardEvent:true,CloseEvent:true,CustomEvent:true,DeviceMotionEvent:true,DeviceOrientationEvent:true,ErrorEvent:true,ExtendableEvent:true,ExtendableMessageEvent:true,FetchEvent:true,FontFaceSetLoadEvent:true,ForeignFetchEvent:true,GamepadEvent:true,HashChangeEvent:true,InstallEvent:true,MediaEncryptedEvent:true,MediaKeyMessageEvent:true,MediaQueryListEvent:true,MediaStreamEvent:true,MediaStreamTrackEvent:true,MessageEvent:true,MIDIConnectionEvent:true,MIDIMessageEvent:true,MutationEvent:true,NotificationEvent:true,PageTransitionEvent:true,PaymentRequestEvent:true,PaymentRequestUpdateEvent:true,PopStateEvent:true,PresentationConnectionAvailableEvent:true,PresentationConnectionCloseEvent:true,PromiseRejectionEvent:true,PushEvent:true,RTCDataChannelEvent:true,RTCDTMFToneChangeEvent:true,RTCPeerConnectionIceEvent:true,RTCTrackEvent:true,SecurityPolicyViolationEvent:true,SensorErrorEvent:true,SpeechRecognitionError:true,SpeechRecognitionEvent:true,SpeechSynthesisEvent:true,StorageEvent:true,SyncEvent:true,TrackEvent:true,TransitionEvent:true,WebKitTransitionEvent:true,VRDeviceEvent:true,VRDisplayEvent:true,VRSessionEvent:true,MojoInterfaceRequestEvent:true,USBConnectionEvent:true,IDBVersionChangeEvent:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,WebGLContextEvent:true,Event:false,InputEvent:false,SubmitEvent:false,EventTarget:false,HTMLFormElement:true,HTMLDocument:true,XMLHttpRequest:true,XMLHttpRequestEventTarget:false,HTMLInputElement:true,Location:true,MouseEvent:true,DragEvent:true,PointerEvent:true,WheelEvent:true,DocumentFragment:true,ShadowRoot:true,DocumentType:true,Node:false,NodeList:true,RadioNodeList:true,ProgressEvent:true,ResourceProgressEvent:true,HTMLSelectElement:true,Storage:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,CompositionEvent:true,FocusEvent:true,KeyboardEvent:true,TextEvent:true,TouchEvent:true,UIEvent:false,Window:true,DOMWindow:true,Attr:true,NamedNodeMap:true,MozNamedAttrMap:true,SVGScriptElement:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true,SVGElement:false})
A.aC.$nativeSuperclassTag="ArrayBufferView"
A.cC.$nativeSuperclassTag="ArrayBufferView"
A.cD.$nativeSuperclassTag="ArrayBufferView"
A.aL.$nativeSuperclassTag="ArrayBufferView"})()
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
var s=A.n_
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=app.js.map

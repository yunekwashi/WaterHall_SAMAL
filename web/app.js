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
if(a[b]!==s){A.uV(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.E(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.ob(b)
return new s(c,this)}:function(){if(s===null)s=A.ob(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.ob(a).prototype
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
oh(a,b,c,d){return{i:a,p:b,e:c,x:d}},
n8(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.of==null){A.uH()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.b(A.p4("Return interceptor for "+A.h(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.mv
if(o==null)o=$.mv=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.uO(a)
if(p!=null)return p
if(typeof a=="function")return B.ab
s=Object.getPrototypeOf(a)
if(s==null)return B.M
if(s===Object.prototype)return B.M
if(typeof q=="function"){o=$.mv
if(o==null)o=$.mv=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.x,enumerable:false,writable:true,configurable:true})
return B.x}return B.x},
oG(a,b){if(a<0||a>4294967295)throw A.b(A.aj(a,0,4294967295,"length",null))
return J.rm(new Array(a),b)},
nE(a,b){if(a<0)throw A.b(A.b6("Length must be a non-negative integer: "+a,null))
return A.E(new Array(a),b.h("af<0>"))},
rm(a,b){var s=A.E(a,b.h("af<0>"))
s.$flags=1
return s},
oH(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
rn(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.oH(r))break;++b}return b},
ro(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.e(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.oH(q))break}return b},
bK(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dB.prototype
return J.fj.prototype}if(typeof a=="string")return J.bU.prototype
if(a==null)return J.dC.prototype
if(typeof a=="boolean")return J.fh.prototype
if(Array.isArray(a))return J.af.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bz.prototype
if(typeof a=="symbol")return J.cL.prototype
if(typeof a=="bigint")return J.cK.prototype
return a}if(a instanceof A.F)return a
return J.n8(a)},
C(a){if(typeof a=="string")return J.bU.prototype
if(a==null)return a
if(Array.isArray(a))return J.af.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bz.prototype
if(typeof a=="symbol")return J.cL.prototype
if(typeof a=="bigint")return J.cK.prototype
return a}if(a instanceof A.F)return a
return J.n8(a)},
cz(a){if(a==null)return a
if(Array.isArray(a))return J.af.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bz.prototype
if(typeof a=="symbol")return J.cL.prototype
if(typeof a=="bigint")return J.cK.prototype
return a}if(a instanceof A.F)return a
return J.n8(a)},
uz(a){if(typeof a=="number")return J.cf.prototype
if(a==null)return a
if(!(a instanceof A.F))return J.bF.prototype
return a},
uA(a){if(typeof a=="number")return J.cf.prototype
if(typeof a=="string")return J.bU.prototype
if(a==null)return a
if(!(a instanceof A.F))return J.bF.prototype
return a},
oc(a){if(typeof a=="string")return J.bU.prototype
if(a==null)return a
if(!(a instanceof A.F))return J.bF.prototype
return a},
K(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bz.prototype
if(typeof a=="symbol")return J.cL.prototype
if(typeof a=="bigint")return J.cK.prototype
return a}if(a instanceof A.F)return a
return J.n8(a)},
od(a){if(a==null)return a
if(!(a instanceof A.F))return J.bF.prototype
return a},
m(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bK(a).Z(a,b)},
qF(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.uz(a).b9(a,b)},
qG(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.uA(a).aF(a,b)},
l(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.uK(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.C(a).i(a,b)},
bn(a,b,c){return J.cz(a).k(a,b,c)},
ip(a){return J.K(a).ez(a)},
qH(a,b,c,d){return J.K(a).eJ(a,b,c,d)},
qI(a,b){return J.K(a).eS(a,b)},
qJ(a,b,c,d){return J.K(a).eU(a,b,c,d)},
qK(a,b,c){return J.K(a).eX(a,b,c)},
nt(a,b){return J.cz(a).m(a,b)},
qL(a,b,c,d){return J.K(a).bj(a,b,c,d)},
qM(a,b){return J.K(a).fj(a,b)},
qN(a,b,c){return J.K(a).d6(a,b,c)},
iq(a){return J.od(a).a1(a)},
nu(a,b){return J.C(a).A(a,b)},
nv(a,b){return J.K(a).L(a,b)},
eM(a,b){return J.cz(a).v(a,b)},
qO(a,b){return J.cz(a).fB(a,b)},
eN(a,b){return J.cz(a).p(a,b)},
qP(a){return J.K(a).gfk(a)},
nw(a){return J.K(a).gda(a)},
c7(a){return J.K(a).gal(a)},
qQ(a){return J.K(a).gaz(a)},
cC(a){return J.bK(a).gG(a)},
ir(a){return J.C(a).gE(a)},
nx(a){return J.C(a).gR(a)},
b4(a){return J.cz(a).gD(a)},
qR(a){return J.K(a).gH(a)},
ae(a){return J.C(a).gj(a)},
aa(a){return J.K(a).gaA(a)},
qS(a){return J.od(a).gcd(a)},
op(a){return J.od(a).gae(a)},
qT(a){return J.K(a).gh2(a)},
qU(a){return J.bK(a).gU(a)},
qV(a){return J.K(a).ge3(a)},
di(a,b,c){return J.cz(a).an(a,b,c)},
qW(a,b){return J.bK(a).dq(a,b)},
qX(a,b,c){return J.K(a).fS(a,b,c)},
is(a){return J.K(a).dt(a)},
qY(a,b){return J.K(a).B(a,b)},
qZ(a,b){return J.K(a).dz(a,b)},
r_(a,b){return J.K(a).e2(a,b)},
r0(a,b){return J.K(a).seL(a,b)},
dj(a,b){return J.K(a).sO(a,b)},
r1(a,b){return J.K(a).scv(a,b)},
v(a,b){return J.K(a).sV(a,b)},
r2(a,b,c){return J.K(a).cq(a,b,c)},
oq(a,b){return J.oc(a).e4(a,b)},
r3(a){return J.oc(a).h4(a)},
M(a){return J.bK(a).l(a)},
or(a){return J.oc(a).t(a)},
r4(a,b){return J.cz(a).dJ(a,b)},
cJ:function cJ(){},
fh:function fh(){},
dC:function dC(){},
a:function a(){},
bV:function bV(){},
fF:function fF(){},
bF:function bF(){},
bz:function bz(){},
cK:function cK(){},
cL:function cL(){},
af:function af(a){this.$ti=a},
fg:function fg(){},
lw:function lw(a){this.$ti=a},
b7:function b7(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cf:function cf(){},
dB:function dB(){},
fj:function fj(){},
bU:function bU(){}},A={nF:function nF(){},
oJ(a){return new A.dF("Field '"+a+"' has been assigned during initialization.")},
rq(a){return new A.dF("Field '"+a+"' has not been initialized.")},
n9(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
c0(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
nP(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
cx(a,b,c){return a},
og(a){var s,r
for(s=$.aZ.length,r=0;r<s;++r)if(a===$.aZ[r])return!0
return!1},
nO(a,b,c,d){A.dZ(b,"start")
if(c!=null){A.dZ(c,"end")
if(b>c)A.bM(A.aj(b,0,c,"start",null))}return new A.e1(a,b,c,d.h("e1<0>"))},
rr(a,b,c,d){if(t.gt.b(a))return new A.bw(a,b,c.h("@<0>").J(d).h("bw<1,2>"))
return new A.aE(a,b,c.h("@<0>").J(d).h("aE<1,2>"))},
ff(){return new A.bq("No element")},
rk(){return new A.bq("Too many elements")},
dF:function dF(a){this.a=a},
f_:function f_(a){this.a=a},
nk:function nk(){},
lP:function lP(){},
n:function n(){},
ag:function ag(){},
e1:function e1(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
bA:function bA(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aE:function aE(a,b,c){this.a=a
this.b=b
this.$ti=c},
bw:function bw(a,b,c){this.a=a
this.b=b
this.$ti=c},
dL:function dL(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
a_:function a_(a,b,c){this.a=a
this.b=b
this.$ti=c},
I:function I(a,b,c){this.a=a
this.b=b
this.$ti=c},
bh:function bh(a,b,c){this.a=a
this.b=b
this.$ti=c},
co:function co(a,b){this.a=a
this.$ti=b},
e5:function e5(a,b){this.a=a
this.$ti=b},
aD:function aD(){},
bG:function bG(){},
cX:function cX(){},
hx:function hx(a){this.a=a},
cj:function cj(a,b){this.a=a
this.$ti=b},
c_:function c_(a){this.a=a},
oz(){throw A.b(A.N("Cannot modify unmodifiable Map"))},
qf(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
uK(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.dX.b(a)},
h(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.M(a)
return s},
dW(a){var s,r=$.oT
if(r==null)r=$.oT=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
oW(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.e(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
dY(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.a.t(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
dX(a){var s,r,q,p
if(a instanceof A.F)return A.aF(A.au(a),null)
s=J.bK(a)
if(s===B.aa||s===B.ac||t.cx.b(a)){r=B.A(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.aF(A.au(a),null)},
rC(a){var s,r,q
if(typeof a=="number"||A.d9(a))return J.M(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bQ)return a.l(0)
s=$.oo()
for(r=0;r<s.length;++r){q=s[r].dG(a)
if(q!=null)return q}return"Instance of '"+A.dX(a)+"'"},
rA(){if(!!self.location)return self.location.href
return null},
rD(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
a9(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.b1(s,10)|55296)>>>0,s&1023|56320)}}throw A.b(A.aj(a,0,1114111,null,null))},
oX(a,b,c,d,e,f,g,h,i){var s,r,q,p=b-1
if(0<=a&&a<100){a+=400
p-=4800}s=B.c.ar(h,1000)
g+=B.c.af(h-s,1000)
r=i?Date.UTC(a,p,c,d,e,f,g):new Date(a,p,c,d,e,f,g).valueOf()
q=!0
if(!isNaN(r))if(!(r<-864e13))if(!(r>864e13))q=r===864e13&&s!==0
if(q)return null
return r},
aN(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
bC(a){return a.c?A.aN(a).getUTCFullYear()+0:A.aN(a).getFullYear()+0},
cl(a){return a.c?A.aN(a).getUTCMonth()+1:A.aN(a).getMonth()+1},
dV(a){return a.c?A.aN(a).getUTCDate()+0:A.aN(a).getDate()+0},
bX(a){return a.c?A.aN(a).getUTCHours()+0:A.aN(a).getHours()+0},
cP(a){return a.c?A.aN(a).getUTCMinutes()+0:A.aN(a).getMinutes()+0},
oV(a){return a.c?A.aN(a).getUTCSeconds()+0:A.aN(a).getSeconds()+0},
oU(a){return a.c?A.aN(a).getUTCMilliseconds()+0:A.aN(a).getMilliseconds()+0},
bW(a,b,c){var s,r,q={}
q.a=0
s=[]
r=[]
q.a=b.length
B.b.S(s,b)
q.b=""
if(c!=null&&c.a!==0)c.p(0,new A.lN(q,r,s))
return J.qW(a,new A.fi(B.an,0,s,r,0))},
rz(a,b,c){var s,r,q
if(Array.isArray(b))s=c==null||c.a===0
else s=!1
if(s){r=b.length
if(r===0){if(!!a.$0)return a.$0()}else if(r===1){if(!!a.$1)return a.$1(b[0])}else if(r===2){if(!!a.$2)return a.$2(b[0],b[1])}else if(r===3){if(!!a.$3)return a.$3(b[0],b[1],b[2])}else if(r===4){if(!!a.$4)return a.$4(b[0],b[1],b[2],b[3])}else if(r===5)if(!!a.$5)return a.$5(b[0],b[1],b[2],b[3],b[4])
q=a[""+"$"+r]
if(q!=null)return q.apply(a,b)}return A.ry(a,b,c)},
ry(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(Array.isArray(b))s=b
else s=A.a8(b,t.z)
r=s.length
q=a.$R
if(r<q)return A.bW(a,s,c)
p=a.$D
o=p==null
n=!o?p():null
m=J.bK(a)
l=m.$C
if(typeof l=="string")l=m[l]
if(o){if(c!=null&&c.a!==0)return A.bW(a,s,c)
if(r===q)return l.apply(a,s)
return A.bW(a,s,c)}if(Array.isArray(n)){if(c!=null&&c.a!==0)return A.bW(a,s,c)
k=q+n.length
if(r>k)return A.bW(a,s,null)
if(r<k){j=n.slice(r-q)
if(s===b)s=A.a8(s,t.z)
B.b.S(s,j)}return l.apply(a,s)}else{if(r>q)return A.bW(a,s,c)
if(s===b)s=A.a8(s,t.z)
i=Object.keys(n)
if(c==null)for(o=i.length,h=0;h<i.length;i.length===o||(0,A.av)(i),++h){g=n[A.w(i[h])]
if(B.C===g)return A.bW(a,s,c)
B.b.m(s,g)}else{for(o=i.length,f=0,h=0;h<i.length;i.length===o||(0,A.av)(i),++h){e=A.w(i[h])
if(c.L(0,e)){++f
B.b.m(s,c.i(0,e))}else{g=n[e]
if(B.C===g)return A.bW(a,s,c)
B.b.m(s,g)}}if(f!==c.a)return A.bW(a,s,c)}return l.apply(a,s)}},
rB(a){var s=a.$thrownJsError
if(s==null)return null
return A.c5(s)},
nK(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.ai(a,s)
a.$thrownJsError=s
s.stack=b.l(0)}},
uF(a){throw A.b(A.oa(a))},
e(a,b){if(a==null)J.ae(a)
throw A.b(A.ii(a,b))},
ii(a,b){var s,r="index"
if(!A.eG(b))return new A.b5(!0,b,r,null)
s=A.J(J.ae(a))
if(b<0||b>=s)return A.a7(b,s,a,null,r)
return A.oY(b,r)},
oa(a){return new A.b5(!0,a,null,null)},
b(a){return A.ai(a,new Error())},
ai(a,b){var s
if(a==null)a=new A.bD()
b.dartException=a
s=A.uW
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
uW(){return J.M(this.dartException)},
bM(a,b){throw A.ai(a,b==null?new Error():b)},
aG(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.bM(A.tL(a,b,c),s)},
tL(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.e4("'"+s+"': Cannot "+o+" "+l+k+n)},
av(a){throw A.b(A.a5(a))},
bE(a){var s,r,q,p,o,n
a=A.qb(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.E([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.lW(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
lX(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
p3(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
nG(a,b){var s=b==null,r=s?null:b.method
return new A.fl(a,r,s?null:b.receiver)},
am(a){var s
if(a==null)return new A.lL(a)
if(a instanceof A.dv){s=a.a
return A.c6(a,s==null?A.aY(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.c6(a,a.dartException)
return A.um(a)},
c6(a,b){if(t.W.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
um(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.b1(r,16)&8191)===10)switch(q){case 438:return A.c6(a,A.nG(A.h(s)+" (Error "+q+")",null))
case 445:case 5007:A.h(s)
return A.c6(a,new A.dT())}}if(a instanceof TypeError){p=$.qp()
o=$.qq()
n=$.qr()
m=$.qs()
l=$.qv()
k=$.qw()
j=$.qu()
$.qt()
i=$.qy()
h=$.qx()
g=p.ad(s)
if(g!=null)return A.c6(a,A.nG(A.w(s),g))
else{g=o.ad(s)
if(g!=null){g.method="call"
return A.c6(a,A.nG(A.w(s),g))}else if(n.ad(s)!=null||m.ad(s)!=null||l.ad(s)!=null||k.ad(s)!=null||j.ad(s)!=null||m.ad(s)!=null||i.ad(s)!=null||h.ad(s)!=null){A.w(s)
return A.c6(a,new A.dT())}}return A.c6(a,new A.fZ(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.e_()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.c6(a,new A.b5(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.e_()
return a},
c5(a){var s
if(a instanceof A.dv)return a.b
if(a==null)return new A.eu(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.eu(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
il(a){if(a==null)return J.cC(a)
if(typeof a=="object")return A.dW(a)
return J.cC(a)},
uy(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.k(0,a[s],a[r])}return b},
tV(a,b,c,d,e,f){t.Y.a(a)
switch(A.J(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.b(new A.mf("Unsupported number of arguments for wrapped closure"))},
bt(a,b){var s
if(a==null)return null
s=a.$identity
if(!!s)return s
s=A.uu(a,b)
a.$identity=s
return s},
uu(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.tV)},
rb(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.fM().constructor.prototype):Object.create(new A.cF(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.oy(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.r7(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.oy(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
r7(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.r5)}throw A.b("Error in functionType of tearoff")},
r8(a,b,c,d){var s=A.ow
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
oy(a,b,c,d){if(c)return A.ra(a,b,d)
return A.r8(b.length,d,a,b)},
r9(a,b,c,d){var s=A.ow,r=A.r6
switch(b?-1:a){case 0:throw A.b(new A.fJ("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
ra(a,b,c){var s,r
if($.ou==null)$.ou=A.ot("interceptor")
if($.ov==null)$.ov=A.ot("receiver")
s=b.length
r=A.r9(s,c,a,b)
return r},
ob(a){return A.rb(a)},
r5(a,b){return A.mL(v.typeUniverse,A.au(a.a),b)},
ow(a){return a.a},
r6(a){return a.b},
ot(a){var s,r,q,p=new A.cF("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.b(A.b6("Field name "+a+" not found.",null))},
oe(a){return v.getIsolateTag(a)},
oi(a,b,c){var s,r
try{s=A.tK(a,c,b)
return s}catch(r){}return null},
tK(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=[],h=typeof a=="object",g=typeof a=="function"
if(g){s=A.pP(a)
if(s!=null)i.push("globalThis."+s)
else i.push("name: "+A.bx(A.ih(a,"name")))}if(b?!g:!h)i.push('typeof: "'+typeof a+'"')
if(!(h||g))return i.join(", ")
r=v.G
q=r.Object
p=q.getPrototypeOf(a)
o=p==null
if(o)i.push("prototype: null")
else{n=A.ih(p,"constructor")
if(n!=null){m=A.pP(n)
if(m!=null){if(g)l="Function"
else l=c?"Array":null
if(m!==l)i.push("constructor: "+m)}else{k=A.ih(n,"name")
if(k!=null)i.push("constructor.name: "+A.bx(k))}}}if(r.Array.isArray(a))i.push("isArray")
if(!g){j=A.ih(a,"length")
if(typeof j=="number")i.push("length: "+A.h(j))}if(!o&&!(a instanceof q))i.push("cross-realm")
return i.join(", ")},
ih(a,b){var s=v.G.Object.getOwnPropertyDescriptor(a,b)
if(s==null)return null
return s.value},
pP(a){var s
if(typeof a!="function")return null
s=A.ih(a,"name")
if(typeof s=="string"&&/^[A-Za-z_$][A-Za-z_$0-9]*$/.test(s))if(a===v.G[s])return s
return null},
w4(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
uO(a){var s,r,q,p,o,n=A.w($.q5.$1(a)),m=$.n7[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.nd[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.ak($.q0.$2(a,n))
if(q!=null){m=$.n7[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.nd[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.ng(s)
$.n7[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.nd[n]=s
return s}if(p==="-"){o=A.ng(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.q8(a,s)
if(p==="*")throw A.b(A.p4(n))
if(v.leafTags[n]===true){o=A.ng(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.q8(a,s)},
q8(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.oh(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
ng(a){return J.oh(a,!1,null,!!a.$iL)},
uQ(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.ng(s)
else return J.oh(s,c,null,null)},
uH(){if(!0===$.of)return
$.of=!0
A.uI()},
uI(){var s,r,q,p,o,n,m,l
$.n7=Object.create(null)
$.nd=Object.create(null)
A.uG()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.qa.$1(o)
if(n!=null){m=A.uQ(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
uG(){var s,r,q,p,o,n,m=B.V()
m=A.dd(B.W,A.dd(B.X,A.dd(B.B,A.dd(B.B,A.dd(B.Y,A.dd(B.Z,A.dd(B.a_(B.A),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.q5=new A.na(p)
$.q0=new A.nb(o)
$.qa=new A.nc(n)},
dd(a,b){return a(b)||b},
uw(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
rp(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.b(A.a1("Illegal RegExp pattern ("+String(o)+")",a,null))},
uT(a,b,c){var s=a.indexOf(b,c)
return s>=0},
ux(a){if(a.indexOf("$",0)>=0)return a.replace(/\$/g,"$$$$")
return a},
qb(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
qd(a,b,c){var s=A.uU(a,b,c)
return s},
uU(a,b,c){var s,r,q
if(b===""){if(a==="")return c
s=a.length
for(r=c,q=0;q<s;++q)r=r+a[q]+c
return r.charCodeAt(0)==0?r:r}if(a.indexOf(b,0)<0)return a
if(a.length<500||c.indexOf("$",0)>=0)return a.split(b).join(c)
return a.replace(new RegExp(A.qb(b),"g"),A.ux(c))},
dm:function dm(a,b){this.a=a
this.$ti=b},
dl:function dl(){},
bu:function bu(a,b,c){this.a=a
this.b=b
this.$ti=c},
ej:function ej(a,b){this.a=a
this.$ti=b},
ek:function ek(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
fi:function fi(a,b,c,d,e){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e},
lN:function lN(a,b,c){this.a=a
this.b=b
this.c=c},
cS:function cS(){},
lW:function lW(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dT:function dT(){},
fl:function fl(a,b,c){this.a=a
this.b=b
this.c=c},
fZ:function fZ(a){this.a=a},
lL:function lL(a){this.a=a},
dv:function dv(a,b){this.a=a
this.b=b},
eu:function eu(a){this.a=a
this.b=null},
bQ:function bQ(){},
eY:function eY(){},
eZ:function eZ(){},
fQ:function fQ(){},
fM:function fM(){},
cF:function cF(a,b){this.a=a
this.b=b},
fJ:function fJ(a){this.a=a},
mB:function mB(){},
bb:function bb(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
lx:function lx(a){this.a=a},
lA:function lA(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
ch:function ch(a,b){this.a=a
this.$ti=b},
dI:function dI(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aU:function aU(a,b){this.a=a
this.$ti=b},
dJ:function dJ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
dG:function dG(a,b){this.a=a
this.$ti=b},
dH:function dH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
na:function na(a){this.a=a},
nb:function nb(a){this.a=a},
nc:function nc(a){this.a=a},
fk:function fk(a,b){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null},
mz:function mz(a){this.b=a},
tH(a){return a},
tM(a){return a},
rs(a){return new Int8Array(a)},
oO(a){return new Uint8Array(a)},
oP(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
bI(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.ii(b,a))},
ck:function ck(){},
dO:function dO(){},
i3:function i3(a){this.a=a},
dM:function dM(){},
ar:function ar(){},
dN:function dN(){},
aV:function aV(){},
fu:function fu(){},
fv:function fv(){},
fw:function fw(){},
fx:function fx(){},
fy:function fy(){},
fz:function fz(){},
fA:function fA(){},
dP:function dP(){},
dQ:function dQ(){},
em:function em(){},
en:function en(){},
eo:function eo(){},
ep:function ep(){},
nM(a,b){var s=b.c
return s==null?b.c=A.eA(a,"a6",[b.x]):s},
oZ(a){var s=a.w
if(s===6||s===7)return A.oZ(a.x)
return s===11||s===12},
rG(a){return a.as},
eK(a){return A.mK(v.typeUniverse,a,!1)},
cw(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.cw(a1,s,a3,a4)
if(r===s)return a2
return A.pr(a1,r,!0)
case 7:s=a2.x
r=A.cw(a1,s,a3,a4)
if(r===s)return a2
return A.pq(a1,r,!0)
case 8:q=a2.y
p=A.dc(a1,q,a3,a4)
if(p===q)return a2
return A.eA(a1,a2.x,p)
case 9:o=a2.x
n=A.cw(a1,o,a3,a4)
m=a2.y
l=A.dc(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.nW(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.dc(a1,j,a3,a4)
if(i===j)return a2
return A.ps(a1,k,i)
case 11:h=a2.x
g=A.cw(a1,h,a3,a4)
f=a2.y
e=A.uj(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.pp(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.dc(a1,d,a3,a4)
o=a2.x
n=A.cw(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.nX(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.b(A.eR("Attempted to substitute unexpected RTI kind "+a0))}},
dc(a,b,c,d){var s,r,q,p,o=b.length,n=A.mP(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.cw(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
uk(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.mP(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.cw(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
uj(a,b,c,d){var s,r=b.a,q=A.dc(a,r,c,d),p=b.b,o=A.dc(a,p,c,d),n=b.c,m=A.uk(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.hn()
s.a=q
s.b=o
s.c=m
return s},
E(a,b){a[v.arrayRti]=b
return a},
q2(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.uC(s)
return a.$S()}return null},
uJ(a,b){var s
if(A.oZ(b))if(a instanceof A.bQ){s=A.q2(a)
if(s!=null)return s}return A.au(a)},
au(a){if(a instanceof A.F)return A.A(a)
if(Array.isArray(a))return A.G(a)
return A.o7(J.bK(a))},
G(a){var s=a[v.arrayRti],r=t.J
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
A(a){var s=a.$ti
return s!=null?s:A.o7(a)},
o7(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.tT(a,s)},
tT(a,b){var s=a instanceof A.bQ?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.ti(v.typeUniverse,s.name)
b.$ccache=r
return r},
uC(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.mK(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
uB(a){return A.cy(A.A(a))},
ui(a){var s=a instanceof A.bQ?A.q2(a):null
if(s!=null)return s
if(t.aJ.b(a))return J.qU(a).a
if(Array.isArray(a))return A.G(a)
return A.au(a)},
cy(a){var s=a.r
return s==null?a.r=new A.mJ(a):s},
bm(a){return A.cy(A.mK(v.typeUniverse,a,!1))},
tS(a){var s=this
s.b=A.ug(s)
return s.b(a)},
ug(a){var s,r,q,p,o
if(a===t.K)return A.u0
if(A.cA(a))return A.u4
s=a.w
if(s===6)return A.tQ
if(s===1)return A.pO
if(s===7)return A.tW
r=A.uf(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.cA)){a.f="$i"+q
if(q==="p")return A.tZ
if(a===t.m)return A.tY
return A.u3}}else if(s===10){p=A.uw(a.x,a.y)
o=p==null?A.pO:p
return o==null?A.aY(o):o}return A.tO},
uf(a){if(a.w===8){if(a===t.S)return A.eG
if(a===t.dx||a===t.w)return A.u_
if(a===t.N)return A.u2
if(a===t.y)return A.d9}return null},
tR(a){var s=this,r=A.tN
if(A.cA(s))r=A.tB
else if(s===t.K)r=A.aY
else if(A.df(s)){r=A.tP
if(s===t.aV)r=A.o2
else if(s===t.jv)r=A.ak
else if(s===t.fU)r=A.pD
else if(s===t.jh)r=A.mS
else if(s===t.jX)r=A.ty
else if(s===t.mU)r=A.tA}else if(s===t.S)r=A.J
else if(s===t.N)r=A.w
else if(s===t.y)r=A.mR
else if(s===t.w)r=A.a3
else if(s===t.dx)r=A.pE
else if(s===t.m)r=A.tz
s.a=r
return s.a(a)},
tO(a){var s=this
if(a==null)return A.df(s)
return A.q7(v.typeUniverse,A.uJ(a,s),s)},
tQ(a){if(a==null)return!0
return this.x.b(a)},
u3(a){var s,r=this
if(a==null)return A.df(r)
s=r.f
if(a instanceof A.F)return!!a[s]
return!!J.bK(a)[s]},
tZ(a){var s,r=this
if(a==null)return A.df(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.F)return!!a[s]
return!!J.bK(a)[s]},
tY(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.F)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
pN(a){if(typeof a=="object"){if(a instanceof A.F)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
tN(a){var s=this
if(a==null){if(A.df(s))return a}else if(s.b(a))return a
throw A.ai(A.pI(a,s),new Error())},
tP(a){var s=this
if(a==null||s.b(a))return a
throw A.ai(A.pI(a,s),new Error())},
pI(a,b){return new A.d5("TypeError: "+A.pd(a,A.aF(b,null)))},
eJ(a,b,c,d){if(A.q7(v.typeUniverse,a,b))return a
throw A.ai(A.t9("The type argument '"+A.aF(a,null)+"' is not a subtype of the type variable bound '"+A.aF(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
pd(a,b){return A.bx(a)+": type '"+A.aF(A.ui(a),null)+"' is not a subtype of type '"+b+"'"},
t9(a){return new A.d5("TypeError: "+a)},
b2(a,b){return new A.d5("TypeError: "+A.pd(a,b))},
tW(a){var s=this
return s.x.b(a)||A.nM(v.typeUniverse,s).b(a)},
u0(a){return a!=null},
aY(a){if(a!=null)return a
throw A.ai(A.b2(a,"Object"),new Error())},
u4(a){return!0},
tB(a){return a},
pO(a){return!1},
d9(a){return!0===a||!1===a},
mR(a){if(!0===a)return!0
if(!1===a)return!1
throw A.ai(A.b2(a,"bool"),new Error())},
pD(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.ai(A.b2(a,"bool?"),new Error())},
pE(a){if(typeof a=="number")return a
throw A.ai(A.b2(a,"double"),new Error())},
ty(a){if(typeof a=="number")return a
if(a==null)return a
throw A.ai(A.b2(a,"double?"),new Error())},
eG(a){return typeof a=="number"&&Math.floor(a)===a},
J(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.ai(A.b2(a,"int"),new Error())},
o2(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.ai(A.b2(a,"int?"),new Error())},
u_(a){return typeof a=="number"},
a3(a){if(typeof a=="number")return a
throw A.ai(A.b2(a,"num"),new Error())},
mS(a){if(typeof a=="number")return a
if(a==null)return a
throw A.ai(A.b2(a,"num?"),new Error())},
u2(a){return typeof a=="string"},
w(a){if(typeof a=="string")return a
throw A.ai(A.b2(a,"String"),new Error())},
ak(a){if(typeof a=="string")return a
if(a==null)return a
throw A.ai(A.b2(a,"String?"),new Error())},
tz(a){if(A.pN(a))return a
throw A.ai(A.b2(a,"JSObject"),new Error())},
tA(a){if(a==null)return a
if(A.pN(a))return a
throw A.ai(A.b2(a,"JSObject?"),new Error())},
pU(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aF(a[q],b)
return s},
uc(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.pU(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.aF(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
pJ(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.E([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.b.m(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.e(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.aF(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.aF(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.aF(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.aF(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.aF(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
aF(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.aF(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.aF(a.x,b)+">"
if(l===8){p=A.ul(a.x)
o=a.y
return o.length>0?p+("<"+A.pU(o,b)+">"):p}if(l===10)return A.uc(a,b)
if(l===11)return A.pJ(a,b,null)
if(l===12)return A.pJ(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.e(b,n)
return b[n]}return"?"},
ul(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
tj(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
ti(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.mK(a,b,!1)
else if(typeof m=="number"){s=m
r=A.eB(a,5,"#")
q=A.mP(s)
for(p=0;p<s;++p)q[p]=r
o=A.eA(a,b,q)
n[b]=o
return o}else return m},
tg(a,b){return A.pB(a.tR,b)},
tf(a,b){return A.pB(a.eT,b)},
mK(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.pj(A.ph(a,null,b,!1))
r.set(b,s)
return s},
mL(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.pj(A.ph(a,b,c,!0))
q.set(c,r)
return r},
th(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.nW(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
c4(a,b){b.a=A.tR
b.b=A.tS
return b},
eB(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.be(null,null)
s.w=b
s.as=c
r=A.c4(a,s)
a.eC.set(c,r)
return r},
pr(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.td(a,b,r,c)
a.eC.set(r,s)
return s},
td(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.cA(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.df(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.be(null,null)
q.w=6
q.x=b
q.as=c
return A.c4(a,q)},
pq(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.tb(a,b,r,c)
a.eC.set(r,s)
return s},
tb(a,b,c,d){var s,r
if(d){s=b.w
if(A.cA(b)||b===t.K)return b
else if(s===1)return A.eA(a,"a6",[b])
else if(b===t.a||b===t.T)return t.gK}r=new A.be(null,null)
r.w=7
r.x=b
r.as=c
return A.c4(a,r)},
te(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.be(null,null)
s.w=13
s.x=b
s.as=q
r=A.c4(a,s)
a.eC.set(q,r)
return r},
ez(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
ta(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
eA(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.ez(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.be(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.c4(a,r)
a.eC.set(p,q)
return q},
nW(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.ez(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.be(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.c4(a,o)
a.eC.set(q,n)
return n},
ps(a,b,c){var s,r,q="+"+(b+"("+A.ez(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.be(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.c4(a,s)
a.eC.set(q,r)
return r},
pp(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.ez(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.ez(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.ta(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.be(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.c4(a,p)
a.eC.set(r,o)
return o},
nX(a,b,c,d){var s,r=b.as+("<"+A.ez(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.tc(a,b,c,r,d)
a.eC.set(r,s)
return s},
tc(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.mP(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.cw(a,b,r,0)
m=A.dc(a,c,r,0)
return A.nX(a,n,m,c!==m)}}l=new A.be(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.c4(a,l)},
ph(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
pj(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.t2(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.pi(a,r,l,k,!1)
else if(q===46)r=A.pi(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.cv(a.u,a.e,k.pop()))
break
case 94:k.push(A.te(a.u,k.pop()))
break
case 35:k.push(A.eB(a.u,5,"#"))
break
case 64:k.push(A.eB(a.u,2,"@"))
break
case 126:k.push(A.eB(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.t4(a,k)
break
case 38:A.t3(a,k)
break
case 63:p=a.u
k.push(A.pr(p,A.cv(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.pq(p,A.cv(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.t1(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.pk(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.t6(a.u,a.e,o)
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
return A.cv(a.u,a.e,m)},
t2(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
pi(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.tj(s,o.x)[p]
if(n==null)A.bM('No "'+p+'" in "'+A.rG(o)+'"')
d.push(A.mL(s,o,n))}else d.push(p)
return m},
t4(a,b){var s,r=a.u,q=A.pg(a,b),p=b.pop()
if(typeof p=="string")b.push(A.eA(r,p,q))
else{s=A.cv(r,a.e,p)
switch(s.w){case 11:b.push(A.nX(r,s,q,a.n))
break
default:b.push(A.nW(r,s,q))
break}}},
t1(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.pg(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.cv(p,a.e,o)
q=new A.hn()
q.a=s
q.b=n
q.c=m
b.push(A.pp(p,r,q))
return
case-4:b.push(A.ps(p,b.pop(),s))
return
default:throw A.b(A.eR("Unexpected state under `()`: "+A.h(o)))}},
t3(a,b){var s=b.pop()
if(0===s){b.push(A.eB(a.u,1,"0&"))
return}if(1===s){b.push(A.eB(a.u,4,"1&"))
return}throw A.b(A.eR("Unexpected extended operation "+A.h(s)))},
pg(a,b){var s=b.splice(a.p)
A.pk(a.u,a.e,s)
a.p=b.pop()
return s},
cv(a,b,c){if(typeof c=="string")return A.eA(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.t5(a,b,c)}else return c},
pk(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.cv(a,b,c[s])},
t6(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.cv(a,b,c[s])},
t5(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.b(A.eR("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.b(A.eR("Bad index "+c+" for "+b.l(0)))},
q7(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.al(a,b,null,c,null)
r.set(c,s)}return s},
al(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.cA(d))return!0
s=b.w
if(s===4)return!0
if(A.cA(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.al(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.al(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.al(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.al(a,b.x,c,d,e))return!1
return A.al(a,A.nM(a,b),c,d,e)}if(s===6)return A.al(a,p,c,d,e)&&A.al(a,b.x,c,d,e)
if(q===7){if(A.al(a,b,c,d.x,e))return!0
return A.al(a,b,c,A.nM(a,d),e)}if(q===6)return A.al(a,b,c,p,e)||A.al(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.Y)return!0
o=s===10
if(o&&d===t.lZ)return!0
if(q===12){if(b===t.dY)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.al(a,j,c,i,e)||!A.al(a,i,e,j,c))return!1}return A.pM(a,b.x,c,d.x,e)}if(q===11){if(b===t.dY)return!0
if(p)return!1
return A.pM(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.tX(a,b,c,d,e)}if(o&&q===10)return A.u1(a,b,c,d,e)
return!1},
pM(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.al(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.al(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.al(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.al(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.al(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
tX(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.mL(a,b,r[o])
return A.pC(a,p,null,c,d.y,e)}return A.pC(a,b.y,null,c,d.y,e)},
pC(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.al(a,b[s],d,e[s],f))return!1
return!0},
u1(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.al(a,r[s],c,q[s],e))return!1
return!0},
df(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.cA(a))if(s!==6)r=s===7&&A.df(a.x)
return r},
cA(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
pB(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
mP(a){return a>0?new Array(a):v.typeUniverse.sEA},
be:function be(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
hn:function hn(){this.c=this.b=this.a=null},
mJ:function mJ(a){this.a=a},
hk:function hk(){},
d5:function d5(a){this.a=a},
rN(){var s,r,q
if(self.scheduleImmediate!=null)return A.uo()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.bt(new A.m7(s),1)).observe(r,{childList:true})
return new A.m6(s,r,q)}else if(self.setImmediate!=null)return A.up()
return A.uq()},
rO(a){self.scheduleImmediate(A.bt(new A.m8(t.M.a(a)),0))},
rP(a){self.setImmediate(A.bt(new A.m9(t.M.a(a)),0))},
rQ(a){A.nR(B.a3,t.M.a(a))},
nR(a,b){var s=B.c.af(a.a,1000)
return A.t7(s<0?0:s,b)},
p2(a,b){var s=B.c.af(a.a,1000)
return A.t8(s<0?0:s,b)},
t7(a,b){var s=new A.ey(!0)
s.el(a,b)
return s},
t8(a,b){var s=new A.ey(!1)
s.em(a,b)
return s},
U(a){return new A.h4(new A.Q($.O,a.h("Q<0>")),a.h("h4<0>"))},
T(a,b){a.$2(0,null)
b.b=!0
return b.a},
y(a,b){A.tC(a,b)},
S(a,b){b.aK(0,a)},
R(a,b){b.c3(A.am(a),A.c5(a))},
tC(a,b){var s,r,q=new A.mT(b),p=new A.mU(b)
if(a instanceof A.Q)a.cX(q,p,t.z)
else{s=t.z
if(a instanceof A.Q)a.by(q,p,s)
else{r=new A.Q($.O,t._)
r.a=8
r.c=a
r.cX(q,p,s)}}},
V(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.O.ce(new A.n2(s),t.H,t.S,t.z)},
pn(a,b,c){return 0},
ny(a){var s
if(t.W.b(a)){s=a.gaS()
if(s!=null)return s}return B.q},
nC(a,b){var s
b.a(a)
s=new A.Q($.O,b.h("Q<0>"))
s.aV(a)
return s},
rj(a,b,c){var s=new A.Q($.O,c.h("Q<0>"))
A.fU(a,new A.ls(b,s,c))
return s},
o8(a,b){if($.O===B.h)return null
return null},
tU(a,b){if($.O!==B.h)A.o8(a,b)
if(b==null)if(t.W.b(a)){b=a.gaS()
if(b==null){A.nK(a,B.q)
b=B.q}}else b=B.q
else if(t.W.b(a))A.nK(a,b)
return new A.ao(a,b)},
mj(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t._;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.nN()
b.bI(new A.ao(new A.b5(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.e.a(b.c)
b.a=b.a&1|4
b.c=n
n.cR(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aZ()
b.bd(o.a)
A.cr(b,p)
return}b.a^=2
A.db(null,null,b.b,t.M.a(new A.mk(o,b)))},
cr(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.n,r=t.e;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.ig(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.cr(d.a,c)
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
A.ig(j.a,j.b)
return}g=$.O
if(g!==h)$.O=h
else g=null
c=c.c
if((c&15)===8)new A.mo(q,d,n).$0()
else if(o){if((c&1)!==0)new A.mn(q,j).$0()}else if((c&2)!==0)new A.mm(d,q).$0()
if(g!=null)$.O=g
c=q.c
if(c instanceof A.Q){p=q.a.$ti
p=p.h("a6<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.bh(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.mj(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.bh(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
pR(a,b){var s
if(t.ng.b(a))return b.ce(a,t.z,t.K,t.l)
s=t.v
if(s.b(a))return s.a(a)
throw A.b(A.ko(a,"onError",u.c))},
u6(){var s,r
for(s=$.da;s!=null;s=$.da){$.eI=null
r=s.b
$.da=r
if(r==null)$.eH=null
s.a.$0()}},
uh(){$.o9=!0
try{A.u6()}finally{$.eI=null
$.o9=!1
if($.da!=null)$.ok().$1(A.q1())}},
pX(a){var s=new A.h5(a),r=$.eH
if(r==null){$.da=$.eH=s
if(!$.o9)$.ok().$1(A.q1())}else $.eH=r.b=s},
ue(a){var s,r,q,p=$.da
if(p==null){A.pX(a)
$.eI=$.eH
return}s=new A.h5(a)
r=$.eI
if(r==null){s.b=p
$.da=$.eI=s}else{q=r.b
s.b=q
$.eI=r.b=s
if(q==null)$.eH=s}},
qc(a){var s=null,r=$.O
if(B.h===r){A.db(s,s,B.h,a)
return}A.db(s,s,r,t.M.a(r.c1(a)))},
vC(a,b){A.cx(a,"stream",t.K)
return new A.hR(b.h("hR<0>"))},
pV(a){return},
pc(a,b,c){var s=b==null?A.ur():b
return t.gS.J(c).h("1(2)").a(s)},
rU(a,b){if(b==null)b=A.ut()
if(t.fQ.b(b))return a.ce(b,t.z,t.K,t.l)
if(t.i6.b(b))return t.v.a(b)
throw A.b(A.b6("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace.",null))},
u7(a){},
u9(a,b){A.ig(a,b)},
u8(){},
tF(a,b,c){var s,r,q,p=a.a1(0)
if(p!==$.np()){s=t.mY.a(new A.mV(b,c))
r=p.$ti
q=$.O
p.aU(new A.bk(new A.Q(q,r),8,s,null,r.h("bk<1,1>")))}else b.aW(c)},
fU(a,b){var s=$.O
if(s===B.h)return A.nR(a,t.M.a(b))
return A.nR(a,t.M.a(s.c1(b)))},
nQ(a,b){var s=$.O
if(s===B.h)return A.p2(a,t.my.a(b))
return A.p2(a,t.my.a(s.d7(b,t.I)))},
ig(a,b){A.ue(new A.n1(a,b))},
pS(a,b,c,d,e){var s,r=$.O
if(r===c)return d.$0()
$.O=c
s=r
try{r=d.$0()
return r}finally{$.O=s}},
pT(a,b,c,d,e,f,g){var s,r=$.O
if(r===c)return d.$1(e)
$.O=c
s=r
try{r=d.$1(e)
return r}finally{$.O=s}},
ud(a,b,c,d,e,f,g,h,i){var s,r=$.O
if(r===c)return d.$2(e,f)
$.O=c
s=r
try{r=d.$2(e,f)
return r}finally{$.O=s}},
db(a,b,c,d){t.M.a(d)
if(B.h!==c){d=c.c1(d)
d=d}A.pX(d)},
m7:function m7(a){this.a=a},
m6:function m6(a,b,c){this.a=a
this.b=b
this.c=c},
m8:function m8(a){this.a=a},
m9:function m9(a){this.a=a},
ey:function ey(a){this.a=a
this.b=null
this.c=0},
mI:function mI(a,b){this.a=a
this.b=b},
mH:function mH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h4:function h4(a,b){this.a=a
this.b=!1
this.$ti=b},
mT:function mT(a){this.a=a},
mU:function mU(a){this.a=a},
n2:function n2(a){this.a=a},
ev:function ev(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
d4:function d4(a,b){this.a=a
this.$ti=b},
ao:function ao(a,b){this.a=a
this.b=b},
d_:function d_(a,b){this.a=a
this.$ti=b},
bH:function bH(a,b,c,d,e){var _=this
_.ay=0
_.CW=_.ch=null
_.w=a
_.a=b
_.d=c
_.e=d
_.r=_.f=null
_.$ti=e},
e7:function e7(){},
e6:function e6(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.e=_.d=null
_.$ti=c},
ls:function ls(a,b,c){this.a=a
this.b=b
this.c=c},
lV:function lV(a,b){this.a=a
this.b=b},
h9:function h9(){},
bi:function bi(a,b){this.a=a
this.$ti=b},
bk:function bk(a,b,c,d,e){var _=this
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
mg:function mg(a,b){this.a=a
this.b=b},
ml:function ml(a,b){this.a=a
this.b=b},
mk:function mk(a,b){this.a=a
this.b=b},
mi:function mi(a,b){this.a=a
this.b=b},
mh:function mh(a,b){this.a=a
this.b=b},
mo:function mo(a,b,c){this.a=a
this.b=b
this.c=c},
mp:function mp(a,b){this.a=a
this.b=b},
mq:function mq(a){this.a=a},
mn:function mn(a,b){this.a=a
this.b=b},
mm:function mm(a,b){this.a=a
this.b=b},
mr:function mr(a,b){this.a=a
this.b=b},
ms:function ms(a,b,c){this.a=a
this.b=b
this.c=c},
mt:function mt(a,b){this.a=a
this.b=b},
h5:function h5(a){this.a=a
this.b=null},
bZ:function bZ(){},
lT:function lT(a,b){this.a=a
this.b=b},
lU:function lU(a,b){this.a=a
this.b=b},
lR:function lR(a){this.a=a},
lS:function lS(a,b,c){this.a=a
this.b=b
this.c=c},
e8:function e8(){},
e9:function e9(){},
d0:function d0(){},
d3:function d3(){},
eb:function eb(){},
ea:function ea(a,b){this.b=a
this.a=null
this.$ti=b},
hG:function hG(a){var _=this
_.a=0
_.c=_.b=null
_.$ti=a},
mA:function mA(a,b){this.a=a
this.b=b},
d1:function d1(a,b){var _=this
_.a=1
_.b=a
_.c=null
_.$ti=b},
hR:function hR(a){this.$ti=a},
mV:function mV(a,b){this.a=a
this.b=b},
eF:function eF(){},
hJ:function hJ(){},
mC:function mC(a,b){this.a=a
this.b=b},
mD:function mD(a,b,c){this.a=a
this.b=b
this.c=c},
n1:function n1(a,b){this.a=a
this.b=b},
nT(a,b){var s=a[b]
return s===a?null:s},
nU(a,b,c){if(c==null)a[b]=a
else a[b]=c},
pe(){var s=Object.create(null)
A.nU(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
oL(a,b){return new A.bb(a.h("@<0>").J(b).h("bb<1,2>"))},
a2(a,b,c){return b.h("@<0>").J(c).h("oK<1,2>").a(A.uy(a,new A.bb(b.h("@<0>").J(c).h("bb<1,2>"))))},
ap(a,b){return new A.bb(a.h("@<0>").J(b).h("bb<1,2>"))},
ci(a){return new A.ct(a.h("ct<0>"))},
oM(a){return new A.ct(a.h("ct<0>"))},
nV(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
t0(a,b,c){var s=new A.cu(a,b,c.h("cu<0>"))
s.c=a.e
return s},
aq(a,b,c){var s=A.oL(b,c)
J.eN(a,new A.lB(s,b,c))
return s},
nH(a,b,c){var s=A.oL(b,c)
s.S(0,a)
return s},
oN(a,b){var s,r,q=A.ci(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.av)(a),++r)q.m(0,b.a(a[r]))
return q},
nI(a){var s,r
if(A.og(a))return"{...}"
s=new A.at("")
try{r={}
B.b.m($.aZ,a)
s.a+="{"
r.a=!0
J.eN(a,new A.lD(r,s))
s.a+="}"}finally{if(0>=$.aZ.length)return A.e($.aZ,-1)
$.aZ.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
ef:function ef(){},
ei:function ei(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
eg:function eg(a,b){this.a=a
this.$ti=b},
eh:function eh(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
ct:function ct(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
hw:function hw(a){this.a=a
this.c=this.b=null},
cu:function cu(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
e3:function e3(a,b){this.a=a
this.$ti=b},
lB:function lB(a,b,c){this.a=a
this.b=b
this.c=c},
k:function k(){},
D:function D(){},
lC:function lC(a){this.a=a},
lD:function lD(a,b){this.a=a
this.b=b},
cY:function cY(){},
aB:function aB(){},
cO:function cO(){},
c1:function c1(a,b){this.a=a
this.$ti=b},
as:function as(){},
eq:function eq(){},
d6:function d6(){},
ua(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.am(r)
q=A.a1(String(s),null,null)
throw A.b(q)}q=A.mX(p)
return q},
mX(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.hs(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.mX(a[s])
return a},
tw(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.qD()
else s=new Uint8Array(o)
for(r=J.C(a),q=0;q<o;++q){p=r.i(a,b+q)
if((p&255)!==p)p=255
s[q]=p}return s},
tv(a,b,c,d){var s=a?$.qC():$.qB()
if(s==null)return null
if(0===c&&d===b.length)return A.pA(s,b)
return A.pA(s,b.subarray(c,d))},
pA(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
os(a,b,c,d,e,f){if(B.c.ar(f,4)!==0)throw A.b(A.a1("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.b(A.a1("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.b(A.a1("Invalid base64 padding, more than two '=' characters",a,b))},
rT(a,b,c,d,a0,a1){var s,r,q,p,o,n,m,l,k,j,i="Invalid encoding before padding",h="Invalid character",g=B.c.b1(a1,2),f=a1&3,e=$.ol()
for(s=a.length,r=e.length,q=d.$flags|0,p=b,o=0;p<c;++p){if(!(p<s))return A.e(a,p)
n=a.charCodeAt(p)
o|=n
m=n&127
if(!(m<r))return A.e(e,m)
l=e[m]
if(l>=0){g=(g<<6|l)&16777215
f=f+1&3
if(f===0){k=a0+1
q&2&&A.aG(d)
m=d.length
if(!(a0<m))return A.e(d,a0)
d[a0]=g>>>16&255
a0=k+1
if(!(k<m))return A.e(d,k)
d[k]=g>>>8&255
k=a0+1
if(!(a0<m))return A.e(d,a0)
d[a0]=g&255
a0=k
g=0}continue}else if(l===-1&&f>1){if(o>127)break
if(f===3){if((g&3)!==0)throw A.b(A.a1(i,a,p))
k=a0+1
q&2&&A.aG(d)
s=d.length
if(!(a0<s))return A.e(d,a0)
d[a0]=g>>>10
if(!(k<s))return A.e(d,k)
d[k]=g>>>2}else{if((g&15)!==0)throw A.b(A.a1(i,a,p))
q&2&&A.aG(d)
if(!(a0<d.length))return A.e(d,a0)
d[a0]=g>>>4}j=(3-f)*3
if(n===37)j+=2
return A.pb(a,p+1,c,-j-1)}throw A.b(A.a1(h,a,p))}if(o>=0&&o<=127)return(g<<2|f)>>>0
for(p=b;p<c;++p){if(!(p<s))return A.e(a,p)
if(a.charCodeAt(p)>127)break}throw A.b(A.a1(h,a,p))},
rR(a,b,c,d){var s=A.rS(a,b,c),r=(d&3)+(s-b),q=B.c.b1(r,2)*3,p=r&3
if(p!==0&&s<c)q+=p-1
if(q>0)return new Uint8Array(q)
return $.qz()},
rS(a,b,c){var s,r=a.length,q=c,p=q,o=0
for(;;){if(!(p>b&&o<2))break
A:{--p
if(!(p>=0&&p<r))return A.e(a,p)
s=a.charCodeAt(p)
if(s===61){++o
q=p
break A}if((s|32)===100){if(p===b)break;--p
if(!(p>=0&&p<r))return A.e(a,p)
s=a.charCodeAt(p)}if(s===51){if(p===b)break;--p
if(!(p>=0&&p<r))return A.e(a,p)
s=a.charCodeAt(p)}if(s===37){++o
q=p
break A}break}}return q},
pb(a,b,c,d){var s,r,q
if(b===c)return d
s=-d-1
for(r=a.length;s>0;){if(!(b<r))return A.e(a,b)
q=a.charCodeAt(b)
if(s===3){if(q===61){s-=3;++b
break}if(q===37){--s;++b
if(b===c)break
if(!(b<r))return A.e(a,b)
q=a.charCodeAt(b)}else break}if((s>3?s-3:s)===2){if(q!==51)break;++b;--s
if(b===c)break
if(!(b<r))return A.e(a,b)
q=a.charCodeAt(b)}if((q|32)!==100)break;++b;--s
if(b===c)break}if(b!==c)throw A.b(A.a1("Invalid padding character",a,b))
return-s-1},
oI(a,b,c){return new A.dE(a,b)},
tJ(a){return a.he()},
rZ(a,b){return new A.mw(a,[],A.uv())},
t_(a,b,c){var s,r=new A.at(""),q=A.rZ(r,b)
q.bD(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
tx(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
hs:function hs(a,b){this.a=a
this.b=b
this.c=null},
ht:function ht(a){this.a=a},
mO:function mO(){},
mN:function mN(){},
dk:function dk(a){this.a=a},
eW:function eW(a){this.a=a},
kq:function kq(){},
ma:function ma(){this.a=0},
c9:function c9(){},
f1:function f1(){},
fa:function fa(){},
dE:function dE(a,b){this.a=a
this.b=b},
fn:function fn(a,b){this.a=a
this.b=b},
fm:function fm(){},
lz:function lz(a){this.b=a},
ly:function ly(a){this.a=a},
mx:function mx(){},
my:function my(a,b){this.a=a
this.b=b},
mw:function mw(a,b,c){this.c=a
this.a=b
this.b=c},
h2:function h2(){},
m4:function m4(a){this.a=a},
mM:function mM(a){this.a=a
this.b=16
this.c=0},
oD(a,b){return A.rz(a,b,null)},
eL(a){var s=A.oW(a,null)
if(s!=null)return s
throw A.b(A.a1(a,null,null))},
bJ(a){var s=A.dY(a)
if(s!=null)return s
throw A.b(A.a1("Invalid double",a,null))},
rh(a,b){a=A.ai(a,new Error())
if(a==null)a=A.aY(a)
a.stack=b.l(0)
throw a},
dK(a,b,c,d){var s,r=c?J.nE(a,d):J.oG(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
aK(a,b,c){var s,r=A.E([],c.h("af<0>"))
for(s=J.b4(a);s.q();)B.b.m(r,c.a(s.gu(s)))
if(b)return r
r.$flags=1
return r},
a8(a,b){var s,r
if(Array.isArray(a))return A.E(a.slice(0),b.h("af<0>"))
s=A.E([],b.h("af<0>"))
for(r=J.b4(a);r.q();)B.b.m(s,r.gu(r))
return s},
p1(a,b,c){var s,r
A.dZ(b,"start")
if(c!=null){s=c-b
if(s<0)throw A.b(A.aj(c,b,null,"end",null))
if(s===0)return""}r=A.rI(a,b,c)
return r},
rI(a,b,c){var s=a.length
if(b>=s)return""
return A.rD(a,b,c==null||c>s?s:c)},
nL(a){return new A.fk(a,A.rp(a,!1,!0,!1,!1,""))},
p0(a,b,c){var s=J.b4(b)
if(!s.q())return a
if(c.length===0){do a+=A.h(s.gu(s))
while(s.q())}else{a+=A.h(s.gu(s))
while(s.q())a=a+c+A.h(s.gu(s))}return a},
oQ(a,b){return new A.fB(a,b.gfO(),b.gfT(),b.gfP())},
nS(){var s,r,q=A.rA()
if(q==null)throw A.b(A.N("'Uri.base' is not supported"))
s=$.p7
if(s!=null&&q===$.p6)return s
r=A.cn(q)
$.p7=r
$.p6=q
return r},
nN(){return A.c5(new Error())},
rc(a,b,c,d,e,f,g,h,i){var s=A.oX(a,b,c,d,e,f,g,h,i)
if(s==null)return null
return new A.ab(A.re(s,h,i),h,i)},
lh(a){var s=A.oX(a,1,1,0,0,0,0,0,!1)
return new A.ab(s==null?new A.li(a,1,1,0,0,0,0,0).$0():s,0,!1)},
rf(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=$.qj().df(a)
if(c!=null){s=new A.lk()
r=c.b
if(1>=r.length)return A.e(r,1)
q=r[1]
q.toString
p=A.eL(q)
if(2>=r.length)return A.e(r,2)
q=r[2]
q.toString
o=A.eL(q)
if(3>=r.length)return A.e(r,3)
q=r[3]
q.toString
n=A.eL(q)
if(4>=r.length)return A.e(r,4)
m=s.$1(r[4])
if(5>=r.length)return A.e(r,5)
l=s.$1(r[5])
if(6>=r.length)return A.e(r,6)
k=s.$1(r[6])
if(7>=r.length)return A.e(r,7)
j=new A.ll().$1(r[7])
i=B.c.af(j,1000)
q=r.length
if(8>=q)return A.e(r,8)
h=r[8]!=null
if(h){if(9>=q)return A.e(r,9)
g=r[9]
if(g!=null){f=g==="-"?-1:1
if(10>=q)return A.e(r,10)
q=r[10]
q.toString
e=A.eL(q)
if(11>=r.length)return A.e(r,11)
l-=f*(s.$1(r[11])+60*e)}}d=A.rc(p,o,n,m,l,k,i,j%1000,h)
if(d==null)throw A.b(A.a1("Time out of range",a,null))
return d}else throw A.b(A.a1("Invalid date format",a,null))},
dn(a){var s,r
try{s=A.rf(a)
return s}catch(r){if(A.am(r) instanceof A.ba)return null
else throw r}},
re(a,b,c){var s="microsecond"
if(b>999)throw A.b(A.aj(b,0,999,s,null))
if(a<-864e13||a>864e13)throw A.b(A.aj(a,-864e13,864e13,"millisecondsSinceEpoch",null))
if(a===864e13&&b!==0)throw A.b(A.ko(b,s,"Time including microseconds is outside valid range"))
A.cx(c,"isUtc",t.y)
return a},
oA(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
rd(a){var s=Math.abs(a),r=a<0?"-":"+"
if(s>=1e5)return r+s
return r+"0"+s},
lj(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bv(a){if(a>=10)return""+a
return"0"+a},
lm(a,b){return new A.b9(1000*a+1e6*b)},
bx(a){if(typeof a=="number"||A.d9(a)||a==null)return J.M(a)
if(typeof a=="string")return JSON.stringify(a)
return A.rC(a)},
ri(a,b){A.cx(a,"error",t.K)
A.cx(b,"stackTrace",t.l)
A.rh(a,b)},
eR(a){return new A.eQ(a)},
b6(a,b){return new A.b5(!1,null,b,a)},
ko(a,b,c){return new A.b5(!0,a,b,c)},
rE(a){var s=null
return new A.cQ(s,s,!1,s,s,a)},
oY(a,b){return new A.cQ(null,null,!0,a,b,"Value not in range")},
aj(a,b,c,d,e){return new A.cQ(b,c,!0,a,d,"Invalid value")},
cR(a,b,c){if(0>a||a>c)throw A.b(A.aj(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.b(A.aj(b,a,c,"end",null))
return b}return c},
dZ(a,b){if(a<0)throw A.b(A.aj(a,0,null,b,null))
return a},
a7(a,b,c,d,e){return new A.fe(b,!0,a,e,"Index out of range")},
N(a){return new A.e4(a)},
p4(a){return new A.fY(a)},
ah(a){return new A.bq(a)},
a5(a){return new A.f0(a)},
a1(a,b,c){return new A.ba(a,b,c)},
rl(a,b,c){var s,r
if(A.og(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.E([],t.s)
B.b.m($.aZ,a)
try{A.u5(a,s)}finally{if(0>=$.aZ.length)return A.e($.aZ,-1)
$.aZ.pop()}r=A.p0(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
nD(a,b,c){var s,r
if(A.og(a))return b+"..."+c
s=new A.at(b)
B.b.m($.aZ,a)
try{r=s
r.a=A.p0(r.a,a,", ")}finally{if(0>=$.aZ.length)return A.e($.aZ,-1)
$.aZ.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
u5(a,b){var s,r,q,p,o,n,m,l=a.gD(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.q())return
s=A.h(l.gu(l))
B.b.m(b,s)
k+=s.length+2;++j}if(!l.q()){if(j<=5)return
if(0>=b.length)return A.e(b,-1)
r=b.pop()
if(0>=b.length)return A.e(b,-1)
q=b.pop()}else{p=l.gu(l);++j
if(!l.q()){if(j<=4){B.b.m(b,A.h(p))
return}r=A.h(p)
if(0>=b.length)return A.e(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gu(l);++j
for(;l.q();p=o,o=n){n=l.gu(l);++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.e(b,-1)
k-=b.pop().length+2;--j}B.b.m(b,"...")
return}}q=A.h(p)
r=A.h(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.e(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.b.m(b,m)
B.b.m(b,q)
B.b.m(b,r)},
nJ(a,b,c,d){var s
if(B.o===c){s=B.e.gG(a)
b=B.e.gG(b)
return A.nP(A.c0(A.c0($.nq(),s),b))}if(B.o===d){s=B.e.gG(a)
b=B.e.gG(b)
c=J.cC(c)
return A.nP(A.c0(A.c0(A.c0($.nq(),s),b),c))}s=B.e.gG(a)
b=B.e.gG(b)
c=J.cC(c)
d=J.cC(d)
d=A.nP(A.c0(A.c0(A.c0(A.c0($.nq(),s),b),c),d))
return d},
bL(a){A.uR(a)},
cn(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){if(4>=a4)return A.e(a5,4)
s=((a5.charCodeAt(4)^58)*3|a5.charCodeAt(0)^100|a5.charCodeAt(1)^97|a5.charCodeAt(2)^116|a5.charCodeAt(3)^97)>>>0
if(s===0)return A.p5(a4<a4?B.a.n(a5,0,a4):a5,5,a3).gdI()
else if(s===32)return A.p5(B.a.n(a5,5,a4),0,a3).gdI()}r=A.dK(8,0,!1,t.S)
B.b.k(r,0,0)
B.b.k(r,1,-1)
B.b.k(r,2,-1)
B.b.k(r,7,-1)
B.b.k(r,3,0)
B.b.k(r,4,0)
B.b.k(r,5,a4)
B.b.k(r,6,a4)
if(A.pW(a5,0,a4,0,r)>=14)B.b.k(r,7,a4)
q=r[1]
if(q>=0)if(A.pW(a5,0,q,20,r)===20)r[7]=q
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
if(!(i&&o+1===n)){if(!B.a.P(a5,"\\",n))if(p>0)h=B.a.P(a5,"\\",p-1)||B.a.P(a5,"\\",p-2)
else h=!1
else h=!0
if(!h){if(!(m<a4&&m===n+2&&B.a.P(a5,"..",n)))h=m>n+2&&B.a.P(a5,"/..",m-3)
else h=!0
if(!h)if(q===4){if(B.a.P(a5,"file",0)){if(p<=0){if(!B.a.P(a5,"/",n)){g="file:///"
s=3}else{g="file://"
s=2}a5=g+B.a.n(a5,n,a4)
m+=s
l+=s
a4=a5.length
p=7
o=7
n=7}else if(n===m){++l
f=m+1
a5=B.a.aC(a5,n,m,"/");++a4
m=f}j="file"}else if(B.a.P(a5,"http",0)){if(i&&o+3===n&&B.a.P(a5,"80",o+1)){l-=3
e=n-3
m-=3
a5=B.a.aC(a5,o,n,"")
a4-=3
n=e}j="http"}}else if(q===5&&B.a.P(a5,"https",0)){if(i&&o+4===n&&B.a.P(a5,"443",o+1)){l-=4
e=n-4
m-=4
a5=B.a.aC(a5,o,n,"")
a4-=3
n=e}j="https"}k=!h}}}}if(k)return new A.b1(a4<a5.length?B.a.n(a5,0,a4):a5,q,p,o,n,m,l,j)
if(j==null)if(q>0)j=A.o_(a5,0,q)
else{if(q===0)A.d7(a5,0,"Invalid empty scheme")
j=""}d=a3
if(p>0){c=q+3
b=c<p?A.tr(a5,c,p-1):""
a=A.to(a5,p,o,!1)
i=o+1
if(i<n){a0=A.oW(B.a.n(a5,i,n),a3)
d=A.nZ(a0==null?A.bM(A.a1("Invalid port",a5,i)):a0,j)}}else{a=a3
b=""}a1=A.tp(a5,n,m,a3,j,a!=null)
a2=m<l?A.tq(a5,m+1,l,a3):a3
return A.i4(j,b,a,d,a1,a2,l<a4?A.tn(a5,l+1,a4):a3)},
p9(a){var s=t.N
return B.b.fC(A.E(a.split("&"),t.s),A.ap(s,s),new A.m3(B.p),t.k)},
h0(a,b,c){throw A.b(A.a1("Illegal IPv4 address, "+a,b,c))},
rK(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j="invalid character"
for(s=a.length,r=b,q=r,p=0,o=0;;){if(q>=c)n=0
else{if(!(q>=0&&q<s))return A.e(a,q)
n=a.charCodeAt(q)}m=n^48
if(m<=9){if(o!==0||q===r){o=o*10+m
if(o<=255){++q
continue}A.h0("each part must be in the range 0..255",a,r)}A.h0("parts must not have leading zeros",a,r)}if(q===r){if(q===c)break
A.h0(j,a,q)}l=p+1
k=e+p
d.$flags&2&&A.aG(d)
if(!(k<16))return A.e(d,k)
d[k]=o
if(n===46){if(l<4){++q
p=l
r=q
o=0
continue}break}if(q===c){if(l===4)return
break}A.h0(j,a,q)
p=l}A.h0("IPv4 address should contain exactly 4 parts",a,q)},
rL(a,b,c){var s
if(b===c)throw A.b(A.a1("Empty IP address",a,b))
if(!(b>=0&&b<a.length))return A.e(a,b)
if(a.charCodeAt(b)===118){s=A.rM(a,b,c)
if(s!=null)throw A.b(s)
return!1}A.p8(a,b,c)
return!0},
rM(a,b,c){var s,r,q,p,o,n="Missing hex-digit in IPvFuture address",m=u.f;++b
for(s=a.length,r=b;;r=q){if(r<c){q=r+1
if(!(r>=0&&r<s))return A.e(a,r)
p=a.charCodeAt(r)
if((p^48)<=9)continue
o=p|32
if(o>=97&&o<=102)continue
if(p===46){if(q-1===b)return new A.ba(n,a,q)
r=q
break}return new A.ba("Unexpected character",a,q-1)}if(r-1===b)return new A.ba(n,a,r)
return new A.ba("Missing '.' in IPvFuture address",a,r)}if(r===c)return new A.ba("Missing address in IPvFuture address, host, cursor",null,null)
for(;;){if(!(r>=0&&r<s))return A.e(a,r)
p=a.charCodeAt(r)
if(!(p<128))return A.e(m,p)
if((m.charCodeAt(p)&16)!==0){++r
if(r<c)continue
return null}return new A.ba("Invalid IPvFuture address character",a,r)}},
p8(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="an address must contain at most 8 parts",a2=new A.m2(a3)
if(a5-a4<2)a2.$2("address is too short",null)
s=new Uint8Array(16)
r=a3.length
if(!(a4>=0&&a4<r))return A.e(a3,a4)
q=-1
p=0
if(a3.charCodeAt(a4)===58){o=a4+1
if(!(o<r))return A.e(a3,o)
if(a3.charCodeAt(o)===58){n=a4+2
m=n
q=0
p=1}else{a2.$2("invalid start colon",a4)
n=a4
m=n}}else{n=a4
m=n}for(l=0,k=!0;;){if(n>=a5)j=0
else{if(!(n<r))return A.e(a3,n)
j=a3.charCodeAt(n)}A:{i=j^48
h=!1
if(i<=9)g=i
else{f=j|32
if(f>=97&&f<=102)g=f-87
else break A
k=h}if(n<m+4){l=l*16+g;++n
continue}a2.$2("an IPv6 part can contain a maximum of 4 hex digits",m)}if(n>m){if(j===46){if(k){if(p<=6){A.rK(a3,m,a5,s,p*2)
p+=2
n=a5
break}a2.$2(a1,m)}break}o=p*2
e=B.c.b1(l,8)
if(!(o<16))return A.e(s,o)
s[o]=e;++o
if(!(o<16))return A.e(s,o)
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
B.K.bG(s,a0,16,s,a)
B.K.fA(s,a,a0,0)}}return s},
i4(a,b,c,d,e,f,g){return new A.eC(a,b,c,d,e,f,g)},
pt(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
d7(a,b,c){throw A.b(A.a1(c,a,b))},
nZ(a,b){if(a!=null&&a===A.pt(b))return null
return a},
to(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(b===c)return""
s=a.length
if(!(b>=0&&b<s))return A.e(a,b)
if(a.charCodeAt(b)===91){r=c-1
if(!(r>=0&&r<s))return A.e(a,r)
if(a.charCodeAt(r)!==93)A.d7(a,b,"Missing end `]` to match `[` in host")
q=b+1
if(!(q<s))return A.e(a,q)
p=""
if(a.charCodeAt(q)!==118){o=A.tl(a,q,r)
if(o<r){n=o+1
p=A.pz(a,B.a.P(a,"25",n)?o+3:n,r,"%25")}}else o=r
m=A.rL(a,q,o)
l=B.a.n(a,q,o)
return"["+(m?l.toLowerCase():l)+p+"]"}for(k=b;k<c;++k){if(!(k<s))return A.e(a,k)
if(a.charCodeAt(k)===58){o=B.a.br(a,"%",b)
o=o>=b&&o<c?o:c
if(o<c){n=o+1
p=A.pz(a,B.a.P(a,"25",n)?o+3:n,c,"%25")}else p=""
A.p8(a,b,o)
return"["+B.a.n(a,b,o)+p+"]"}}return A.tt(a,b,c)},
tl(a,b,c){var s=B.a.br(a,"%",b)
return s>=b&&s<c?s:c},
pz(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=d!==""?new A.at(d):null
for(s=a.length,r=b,q=r,p=!0;r<c;){if(!(r>=0&&r<s))return A.e(a,r)
o=a.charCodeAt(r)
if(o===37){n=A.o0(a,r,!0)
m=n==null
if(m&&p){r+=3
continue}if(h==null)h=new A.at("")
l=h.a+=B.a.n(a,q,r)
if(m)n=B.a.n(a,r,r+3)
else if(n==="%")A.d7(a,r,"ZoneID should not contain % anymore")
h.a=l+n
r+=3
q=r
p=!0}else if(o<127&&(u.f.charCodeAt(o)&1)!==0){if(p&&65<=o&&90>=o){if(h==null)h=new A.at("")
if(q<r){h.a+=B.a.n(a,q,r)
q=r}p=!1}++r}else{k=1
if((o&64512)===55296&&r+1<c){m=r+1
if(!(m<s))return A.e(a,m)
j=a.charCodeAt(m)
if((j&64512)===56320){o=65536+((o&1023)<<10)+(j&1023)
k=2}}i=B.a.n(a,q,r)
if(h==null){h=new A.at("")
m=h}else m=h
m.a+=i
l=A.nY(o)
m.a+=l
r+=k
q=r}}if(h==null)return B.a.n(a,b,c)
if(q<c){i=B.a.n(a,q,c)
h.a+=i}s=h.a
return s.charCodeAt(0)==0?s:s},
tt(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.f
for(s=a.length,r=b,q=r,p=null,o=!0;r<c;){if(!(r>=0&&r<s))return A.e(a,r)
n=a.charCodeAt(r)
if(n===37){m=A.o0(a,r,!0)
l=m==null
if(l&&o){r+=3
continue}if(p==null)p=new A.at("")
k=B.a.n(a,q,r)
if(!o)k=k.toLowerCase()
j=p.a+=k
i=3
if(l)m=B.a.n(a,r,r+3)
else if(m==="%"){m="%25"
i=1}p.a=j+m
r+=i
q=r
o=!0}else if(n<127&&(g.charCodeAt(n)&32)!==0){if(o&&65<=n&&90>=n){if(p==null)p=new A.at("")
if(q<r){p.a+=B.a.n(a,q,r)
q=r}o=!1}++r}else if(n<=93&&(g.charCodeAt(n)&1024)!==0)A.d7(a,r,"Invalid character")
else{i=1
if((n&64512)===55296&&r+1<c){l=r+1
if(!(l<s))return A.e(a,l)
h=a.charCodeAt(l)
if((h&64512)===56320){n=65536+((n&1023)<<10)+(h&1023)
i=2}}k=B.a.n(a,q,r)
if(!o)k=k.toLowerCase()
if(p==null){p=new A.at("")
l=p}else l=p
l.a+=k
j=A.nY(n)
l.a+=j
r+=i
q=r}}if(p==null)return B.a.n(a,b,c)
if(q<c){k=B.a.n(a,q,c)
if(!o)k=k.toLowerCase()
p.a+=k}s=p.a
return s.charCodeAt(0)==0?s:s},
o_(a,b,c){var s,r,q,p
if(b===c)return""
s=a.length
if(!(b<s))return A.e(a,b)
if(!A.pv(a.charCodeAt(b)))A.d7(a,b,"Scheme not starting with alphabetic character")
for(r=b,q=!1;r<c;++r){if(!(r<s))return A.e(a,r)
p=a.charCodeAt(r)
if(!(p<128&&(u.f.charCodeAt(p)&8)!==0))A.d7(a,r,"Illegal scheme character")
if(65<=p&&p<=90)q=!0}a=B.a.n(a,b,c)
return A.tk(q?a.toLowerCase():a)},
tk(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
tr(a,b,c){return A.eD(a,b,c,16,!1,!1)},
tp(a,b,c,d,e,f){var s,r=e==="file",q=r||f
if(a==null)return r?"/":""
else s=A.eD(a,b,c,128,!0,!0)
if(s.length===0){if(r)return"/"}else if(q&&!B.a.N(s,"/"))s="/"+s
return A.ts(s,e,f)},
ts(a,b,c){var s=b.length===0
if(s&&!c&&!B.a.N(a,"/")&&!B.a.N(a,"\\"))return A.py(a,!s||c)
return A.d8(a)},
tq(a,b,c,d){if(a!=null)return A.eD(a,b,c,256,!0,!1)
return null},
tn(a,b,c){return A.eD(a,b,c,256,!0,!1)},
o0(a,b,c){var s,r,q,p,o,n,m=u.f,l=b+2,k=a.length
if(l>=k)return"%"
s=b+1
if(!(s>=0&&s<k))return A.e(a,s)
r=a.charCodeAt(s)
if(!(l>=0))return A.e(a,l)
q=a.charCodeAt(l)
p=A.n9(r)
o=A.n9(q)
if(p<0||o<0)return"%"
n=p*16+o
if(n<127){if(!(n>=0))return A.e(m,n)
l=(m.charCodeAt(n)&1)!==0}else l=!1
if(l)return A.a9(c&&65<=n&&90>=n?(n|32)>>>0:n)
if(r>=97||q>=97)return B.a.n(a,b,b+3).toUpperCase()
return null},
nY(a){var s,r,q,p,o,n,m,l,k="0123456789ABCDEF"
if(a<=127){s=new Uint8Array(3)
s[0]=37
r=a>>>4
if(!(r<16))return A.e(k,r)
s[1]=k.charCodeAt(r)
s[2]=k.charCodeAt(a&15)}else{if(a>2047)if(a>65535){q=240
p=4}else{q=224
p=3}else{q=192
p=2}r=3*p
s=new Uint8Array(r)
for(o=0;--p,p>=0;q=128){n=B.c.f5(a,6*p)&63|q
if(!(o<r))return A.e(s,o)
s[o]=37
m=o+1
l=n>>>4
if(!(l<16))return A.e(k,l)
if(!(m<r))return A.e(s,m)
s[m]=k.charCodeAt(l)
l=o+2
if(!(l<r))return A.e(s,l)
s[l]=k.charCodeAt(n&15)
o+=3}}return A.p1(s,0,null)},
eD(a,b,c,d,e,f){var s=A.px(a,b,c,d,e,f)
return s==null?B.a.n(a,b,c):s},
px(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null,h=u.f
for(s=!e,r=a.length,q=b,p=q,o=i;q<c;){if(!(q>=0&&q<r))return A.e(a,q)
n=a.charCodeAt(q)
if(n<127&&(h.charCodeAt(n)&d)!==0)++q
else{m=1
if(n===37){l=A.o0(a,q,!1)
if(l==null){q+=3
continue}if("%"===l)l="%25"
else m=3}else if(n===92&&f)l="/"
else if(s&&n<=93&&(h.charCodeAt(n)&1024)!==0){A.d7(a,q,"Invalid character")
m=i
l=m}else{if((n&64512)===55296){k=q+1
if(k<c){if(!(k<r))return A.e(a,k)
j=a.charCodeAt(k)
if((j&64512)===56320){n=65536+((n&1023)<<10)+(j&1023)
m=2}}}l=A.nY(n)}if(o==null){o=new A.at("")
k=o}else k=o
k.a=(k.a+=B.a.n(a,p,q))+l
if(typeof m!=="number")return A.uF(m)
q+=m
p=q}}if(o==null)return i
if(p<c){s=B.a.n(a,p,c)
o.a+=s}s=o.a
return s.charCodeAt(0)==0?s:s},
pw(a){if(B.a.N(a,"."))return!0
return B.a.di(a,"/.")!==-1},
d8(a){var s,r,q,p,o,n,m
if(!A.pw(a))return a
s=A.E([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(n===".."){m=s.length
if(m!==0){if(0>=m)return A.e(s,-1)
s.pop()
if(s.length===0)B.b.m(s,"")}p=!0}else{p="."===n
if(!p)B.b.m(s,n)}}if(p)B.b.m(s,"")
return B.b.Y(s,"/")},
py(a,b){var s,r,q,p,o,n
if(!A.pw(a))return!b?A.pu(a):a
s=A.E([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n){if(s.length!==0&&B.b.gdl(s)!==".."){if(0>=s.length)return A.e(s,-1)
s.pop()}else B.b.m(s,"..")
p=!0}else{p="."===n
if(!p)B.b.m(s,n.length===0&&s.length===0?"./":n)}}if(s.length===0)return"./"
if(p)B.b.m(s,"")
if(!b){if(0>=s.length)return A.e(s,0)
B.b.k(s,0,A.pu(s[0]))}return B.b.Y(s,"/")},
pu(a){var s,r,q,p=u.f,o=a.length
if(o>=2&&A.pv(a.charCodeAt(0)))for(s=1;s<o;++s){r=a.charCodeAt(s)
if(r===58)return B.a.n(a,0,s)+"%3A"+B.a.X(a,s+1)
if(r<=127){if(!(r<128))return A.e(p,r)
q=(p.charCodeAt(r)&8)===0}else q=!0
if(q)break}return a},
tu(a,b){if(a.fJ("package")&&a.c==null)return A.pY(b,0,b.length)
return-1},
tm(a,b){var s,r,q,p,o
for(s=a.length,r=0,q=0;q<2;++q){p=b+q
if(!(p<s))return A.e(a,p)
o=a.charCodeAt(p)
if(48<=o&&o<=57)r=r*16+o-48
else{o|=32
if(97<=o&&o<=102)r=r*16+o-87
else throw A.b(A.b6("Invalid URL encoding",null))}}return r},
o1(a,b,c,d,e){var s,r,q,p,o=a.length,n=b
for(;;){if(!(n<c)){s=!0
break}if(!(n<o))return A.e(a,n)
r=a.charCodeAt(n)
q=!0
if(r<=127)if(r!==37)q=r===43
if(q){s=!1
break}++n}if(s)if(B.p===d)return B.a.n(a,b,c)
else p=new A.f_(B.a.n(a,b,c))
else{p=A.E([],t.b)
for(n=b;n<c;++n){if(!(n<o))return A.e(a,n)
r=a.charCodeAt(n)
if(r>127)throw A.b(A.b6("Illegal percent encoding in URI",null))
if(r===37){if(n+3>o)throw A.b(A.b6("Truncated URI",null))
B.b.m(p,A.tm(a,n+1))
n+=2}else if(r===43)B.b.m(p,32)
else B.b.m(p,r)}}return d.K(0,p)},
pv(a){var s=a|32
return 97<=s&&s<=122},
p5(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.E([b-1],t.b)
for(s=a.length,r=b,q=-1,p=null;r<s;++r){p=a.charCodeAt(r)
if(p===44||p===59)break
if(p===47){if(q<0){q=r
continue}throw A.b(A.a1(k,a,r))}}if(q<0&&r>b)throw A.b(A.a1(k,a,r))
while(p!==44){B.b.m(j,r);++r
for(o=-1;r<s;++r){if(!(r>=0))return A.e(a,r)
p=a.charCodeAt(r)
if(p===61){if(o<0)o=r}else if(p===59||p===44)break}if(o>=0)B.b.m(j,o)
else{n=B.b.gdl(j)
if(p!==44||r!==n+7||!B.a.P(a,"base64",n+1))throw A.b(A.a1("Expecting '='",a,r))
break}}B.b.m(j,r)
m=r+1
if((j.length&1)===1)a=B.S.ds(0,a,m,s)
else{l=A.px(a,m,s,256,!0,!1)
if(l!=null)a=B.a.aC(a,m,s,l)}return new A.m1(a,j,c)},
pW(a,b,c,d,e){var s,r,q,p,o,n='\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe3\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0e\x03\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\n\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\xeb\xeb\x8b\xeb\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x83\xeb\xeb\x8b\xeb\x8b\xeb\xcd\x8b\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x92\x83\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x8b\xeb\x8b\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xebD\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12D\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe8\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x05\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x10\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\f\xec\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\xec\f\xec\f\xec\xcd\f\xec\f\f\f\f\f\f\f\f\f\xec\f\f\f\f\f\f\f\f\f\f\xec\f\xec\f\xec\f\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\r\xed\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\xed\r\xed\r\xed\xed\r\xed\r\r\r\r\r\r\r\r\r\xed\r\r\r\r\r\r\r\r\r\r\xed\r\xed\r\xed\r\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0f\xea\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe9\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\t\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x11\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xe9\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\t\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x13\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\xf5\x15\x15\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5'
for(s=a.length,r=b;r<c;++r){if(!(r<s))return A.e(a,r)
q=a.charCodeAt(r)^96
if(q>95)q=31
p=d*96+q
if(!(p<2112))return A.e(n,p)
o=n.charCodeAt(p)
d=o&31
B.b.k(e,o>>>5,r)}return d},
pl(a){if(a.b===7&&B.a.N(a.a,"package")&&a.c<=0)return A.pY(a.a,a.e,a.f)
return-1},
pY(a,b,c){var s,r,q,p
for(s=a.length,r=b,q=0;r<c;++r){if(!(r>=0&&r<s))return A.e(a,r)
p=a.charCodeAt(r)
if(p===47)return q!==0?r:-1
if(p===37||p===58)return-1
q|=p^46}return-1},
tG(a,b,c){var s,r,q,p,o,n,m,l
for(s=a.length,r=b.length,q=0,p=0;p<s;++p){o=c+p
if(!(o<r))return A.e(b,o)
n=b.charCodeAt(o)
m=a.charCodeAt(p)^n
if(m!==0){if(m===32){l=n|m
if(97<=l&&l<=122){q=32
continue}}return-1}}return q},
lG:function lG(a,b){this.a=a
this.b=b},
li:function li(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
ab:function ab(a,b,c){this.a=a
this.b=b
this.c=c},
lk:function lk(){},
ll:function ll(){},
b9:function b9(a){this.a=a},
Z:function Z(){},
eQ:function eQ(a){this.a=a},
bD:function bD(){},
b5:function b5(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cQ:function cQ(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
fe:function fe(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
fB:function fB(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
e4:function e4(a){this.a=a},
fY:function fY(a){this.a=a},
bq:function bq(a){this.a=a},
f0:function f0(a){this.a=a},
fE:function fE(){},
e_:function e_(){},
mf:function mf(a){this.a=a},
ba:function ba(a,b,c){this.a=a
this.b=b
this.c=c},
f:function f(){},
an:function an(a,b,c){this.a=a
this.b=b
this.$ti=c},
a4:function a4(){},
F:function F(){},
hU:function hU(){},
at:function at(a){this.a=a},
m3:function m3(a){this.a=a},
m2:function m2(a){this.a=a},
eC:function eC(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
m1:function m1(a,b,c){this.a=a
this.b=b
this.c=c},
b1:function b1(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=null},
he:function he(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
rg(a,b,c){var s,r=document.body
r.toString
s=t.aN
return t.h.a(new A.I(new A.aA(B.z.a3(r,a,b,c)),s.h("H(k.E)").a(new A.ln()),s.h("I<k.E>")).gaG(0))},
dt(a){var s,r,q="element tag unavailable"
try{s=a.tagName
s.toString
q=s}catch(r){}return q},
oE(a){var s=document.createElement("img")
s.toString
if(a!=null)B.F.scv(s,a)
return s},
oR(a,b,c){var s=t.z,r=A.ap(s,s)
r.k(0,"body",b)
r.k(0,"icon",c)
return A.ru(a,r)},
ru(a,b){var s=new Notification(a,A.q3(b))
s.toString
return s},
oS(){return Notification.permission},
rv(a){var s=Notification.requestPermission(A.bt(a,1))
s.toString
return s},
rw(){var s=new A.Q($.O,t.j2)
A.rv(new A.lJ(new A.bi(s,t.cc)))
return s},
rx(a,b,c,d){var s=new Option(a,b,c,!1)
s.toString
return s},
rW(a,b){var s,r=a.classList
r.toString
for(s=0;s<5;++s)r.remove(b[s])},
z(a,b,c,d,e){var s=c==null?null:A.q_(new A.md(c),t.A)
s=new A.ee(a,b,s,!1,e.h("ee<0>"))
s.d_()
return s},
pf(a){var s=document.createElement("a")
s.toString
s=new A.hM(s,t.d.a(window.location))
s=new A.cs(s)
s.ei(a)
return s},
rX(a,b,c,d){t.h.a(a)
A.w(b)
A.w(c)
t.dl.a(d)
return!0},
rY(a,b,c,d){var s,r,q,p,o,n
t.h.a(a)
A.w(b)
A.w(c)
s=t.dl.a(d).a
r=s.a
B.P.sfE(r,c)
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
po(){var s=t.N,r=A.oN(B.H,s),q=A.E(["TEMPLATE"],t.s),p=t.gL.a(new A.mG())
s=new A.hX(r,A.ci(s),A.ci(s),A.ci(s),null)
s.ek(null,new A.a_(B.H,p,t.gQ),q,null)
return s},
pG(a){var s,r="postMessage" in a
r.toString
if(r){s=A.rV(a)
return s}else return t.O.a(a)},
rV(a){var s=window
s.toString
if(a===s)return t.kg.a(a)
else return new A.hc()},
q_(a,b){var s=$.O
if(s===B.h)return a
return s.d7(a,b)},
q:function q(){},
eO:function eO(){},
cD:function cD(){},
eP:function eP(){},
cE:function cE(){},
bO:function bO(){},
c8:function c8(){},
bP:function bP(){},
bo:function bo(){},
f3:function f3(){},
X:function X(){},
ca:function ca(){},
ku:function ku(){},
aC:function aC(){},
b8:function b8(){},
f4:function f4(){},
f5:function f5(){},
f6:function f6(){},
dp:function dp(){},
cb:function cb(){},
f7:function f7(){},
dq:function dq(){},
dr:function dr(){},
ds:function ds(){},
f8:function f8(){},
f9:function f9(){},
h8:function h8(a,b){this.a=a
this.b=b},
bj:function bj(a,b){this.a=a
this.$ti=b},
B:function B(){},
ln:function ln(){},
o:function o(){},
du:function du(){},
d:function d(){},
aI:function aI(){},
dw:function dw(){},
dx:function dx(){},
fb:function fb(){},
cH:function cH(){},
aJ:function aJ(){},
dy:function dy(){},
fd:function fd(){},
bS:function bS(){},
dz:function dz(){},
by:function by(){},
ce:function ce(){},
cI:function cI(){},
dA:function dA(){},
bT:function bT(){},
cN:function cN(){},
fp:function fp(){},
fq:function fq(){},
fr:function fr(){},
lE:function lE(a){this.a=a},
fs:function fs(){},
lF:function lF(a){this.a=a},
aL:function aL(){},
ft:function ft(){},
ax:function ax(){},
aA:function aA(a){this.a=a},
t:function t(){},
dR:function dR(){},
lJ:function lJ(a){this.a=a},
bB:function bB(){},
dU:function dU(){},
aM:function aM(){},
fG:function fG(){},
b_:function b_(){},
fI:function fI(){},
lO:function lO(a){this.a=a},
bY:function bY(){},
aO:function aO(){},
fK:function fK(){},
aP:function aP(){},
fL:function fL(){},
aQ:function aQ(){},
e0:function e0(){},
lQ:function lQ(a){this.a=a},
ay:function ay(){},
e2:function e2(){},
fO:function fO(){},
fP:function fP(){},
cV:function cV(){},
cm:function cm(){},
aR:function aR(){},
az:function az(){},
fR:function fR(){},
fS:function fS(){},
fT:function fT(){},
aS:function aS(){},
fV:function fV(){},
fW:function fW(){},
bg:function bg(){},
h1:function h1(){},
h3:function h3(){},
c2:function c2(){},
bs:function bs(){},
cZ:function cZ(){},
ha:function ha(){},
ec:function ec(){},
ho:function ho(){},
el:function el(){},
hP:function hP(){},
hV:function hV(){},
h6:function h6(){},
ed:function ed(a){this.a=a},
hd:function hd(a){this.a=a},
mb:function mb(a,b){this.a=a
this.b=b},
mc:function mc(a,b){this.a=a
this.b=b},
hj:function hj(a){this.a=a},
nB:function nB(a,b){this.a=a
this.$ti=b},
cq:function cq(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
cp:function cp(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
ee:function ee(a,b,c,d,e){var _=this
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
md:function md(a){this.a=a},
me:function me(a){this.a=a},
cs:function cs(a){this.a=a},
x:function x(){},
dS:function dS(a){this.a=a},
lI:function lI(a){this.a=a},
lH:function lH(a,b,c){this.a=a
this.b=b
this.c=c},
er:function er(){},
mE:function mE(){},
mF:function mF(){},
hX:function hX(a,b,c,d,e){var _=this
_.e=a
_.a=b
_.b=c
_.c=d
_.d=e},
mG:function mG(){},
hW:function hW(){},
cc:function cc(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.d=null
_.$ti=c},
hc:function hc(){},
hM:function hM(a,b){this.a=a
this.b=b},
eE:function eE(a){this.a=a
this.b=0},
mQ:function mQ(a){this.a=a},
hb:function hb(){},
hf:function hf(){},
hg:function hg(){},
hh:function hh(){},
hi:function hi(){},
hl:function hl(){},
hm:function hm(){},
hq:function hq(){},
hr:function hr(){},
hy:function hy(){},
hz:function hz(){},
hA:function hA(){},
hB:function hB(){},
hC:function hC(){},
hD:function hD(){},
hH:function hH(){},
hI:function hI(){},
hK:function hK(){},
es:function es(){},
et:function et(){},
hN:function hN(){},
hO:function hO(){},
hQ:function hQ(){},
hY:function hY(){},
hZ:function hZ(){},
ew:function ew(){},
ex:function ex(){},
i_:function i_(){},
i0:function i0(){},
i5:function i5(){},
i6:function i6(){},
i7:function i7(){},
i8:function i8(){},
i9:function i9(){},
ia:function ia(){},
ib:function ib(){},
ic:function ic(){},
id:function id(){},
ie:function ie(){},
pH(a){var s,r,q,p
if(a==null)return a
if(typeof a=="string"||typeof a=="number"||A.d9(a))return a
s=Object.getPrototypeOf(a)
r=s===Object.prototype
r.toString
if(!r){r=s===null
r.toString}else r=!0
if(r)return A.b3(a)
r=Array.isArray(a)
r.toString
if(r){q=[]
p=0
for(;;){r=a.length
r.toString
if(!(p<r))break
q.push(A.pH(a[p]));++p}return q}return a},
b3(a){var s,r,q,p,o,n
if(a==null)return null
s=A.ap(t.N,t.z)
r=Object.getOwnPropertyNames(a)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.av)(r),++p){o=r[p]
n=o
n.toString
s.k(0,n,A.pH(a[o]))}return s},
pF(a){var s
if(a==null)return a
if(typeof a=="string"||typeof a=="number"||A.d9(a))return a
if(t.f.b(a))return A.q3(a)
if(t.j.b(a)){s=[]
J.eN(a,new A.mW(s))
a=s}return a},
q3(a){var s={}
J.eN(a,new A.n6(s))
return s},
nz(){var s=window.navigator.userAgent
s.toString
return s},
mW:function mW(a){this.a=a},
n6:function n6(a){this.a=a},
f2:function f2(){},
ks:function ks(a){this.a=a},
kt:function kt(a){this.a=a},
fc:function fc(a,b){this.a=a
this.b=b},
lo:function lo(){},
lp:function lp(){},
cM:function cM(){},
tD(a,b,c,d){var s,r,q
A.mR(b)
t.j.a(d)
if(b){s=[c]
B.b.S(s,d)
d=s}r=t.z
q=A.aK(J.di(d,A.uL(),r),!0,r)
return A.o4(A.oD(t.Y.a(a),q))},
o5(a,b,c){var s
try{if(Object.isExtensible(a)&&!Object.prototype.hasOwnProperty.call(a,b)){Object.defineProperty(a,b,{value:c})
return!0}}catch(s){}return!1},
pL(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return null},
o4(a){if(a==null||typeof a=="string"||typeof a=="number"||A.d9(a))return a
if(a instanceof A.bp)return a.a
if(A.q6(a))return a
if(t.bl.b(a))return a
if(a instanceof A.ab)return A.aN(a)
if(t.Y.b(a))return A.pK(a,"$dart_jsFunction",new A.mY())
return A.pK(a,"_$dart_jsObject",new A.mZ($.on()))},
pK(a,b,c){var s=A.pL(a,b)
if(s==null){s=c.$1(a)
A.o5(a,b,s)}return s},
o3(a){var s
if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else if(a instanceof Object&&A.q6(a))return a
else if(a instanceof Object&&t.bl.b(a))return a
else if(a instanceof Date){s=A.J(a.getTime())
if(s<-864e13||s>864e13)A.bM(A.aj(s,-864e13,864e13,"millisecondsSinceEpoch",null))
A.cx(!1,"isUtc",t.y)
return new A.ab(s,0,!1)}else if(a.constructor===$.on())return a.o
else return A.pZ(a)},
pZ(a){if(typeof a=="function")return A.o6(a,$.io(),new A.n3())
if(Array.isArray(a))return A.o6(a,$.om(),new A.n4())
return A.o6(a,$.om(),new A.n5())},
o6(a,b,c){var s=A.pL(a,b)
if(s==null||!(a instanceof Object)){s=c.$1(a)
A.o5(a,b,s)}return s},
hL:function hL(){},
mY:function mY(){},
mZ:function mZ(a){this.a=a},
n3:function n3(){},
n4:function n4(){},
n5:function n5(){},
bp:function bp(a){this.a=a},
dD:function dD(a){this.a=a},
cg:function cg(a,b){this.a=a
this.$ti=b},
d2:function d2(){},
lK:function lK(a){this.a=a},
tI(a){var s,r=a.$dart_jsFunction
if(r!=null)return r
s=function(b,c){return function(){return b(c,Array.prototype.slice.apply(arguments))}}(A.tE,a)
s[$.io()]=a
a.$dart_jsFunction=s
return s},
tE(a,b){t.j.a(b)
return A.oD(t.Y.a(a),b)},
un(a,b){if(typeof a=="function")return a
else return b.a(A.tI(a))},
pQ(a){return a==null||A.d9(a)||typeof a=="number"||typeof a=="string"||t.jx.b(a)||t.ev.b(a)||t.nn.b(a)||t.m6.b(a)||t.hM.b(a)||t.bW.b(a)||t.mC.b(a)||t.pk.b(a)||t.kI.b(a)||t.lo.b(a)||t.fW.b(a)},
uN(a){if(A.pQ(a))return a
return new A.ne(new A.ei(t.mp)).$1(a)},
q9(a,b){var s=new A.Q($.O,b.h("Q<0>")),r=new A.bi(s,b.h("bi<0>"))
a.then(A.bt(new A.nl(r,b),1),A.bt(new A.nm(r),1))
return s},
ne:function ne(a){this.a=a},
nl:function nl(a,b){this.a=a
this.b=b},
nm:function nm(a){this.a=a},
mu:function mu(a){this.a=a},
aT:function aT(){},
fo:function fo(){},
aW:function aW(){},
fC:function fC(){},
fH:function fH(){},
cT:function cT(){},
fN:function fN(){},
eS:function eS(a){this.a=a},
r:function r(){},
aX:function aX(){},
fX:function fX(){},
hu:function hu(){},
hv:function hv(){},
hE:function hE(){},
hF:function hF(){},
hS:function hS(){},
hT:function hT(){},
i1:function i1(){},
i2:function i2(){},
eT:function eT(){},
eU:function eU(){},
kp:function kp(a){this.a=a},
eV:function eV(){},
bN:function bN(){},
fD:function fD(){},
h7:function h7(){},
uP(){var s=document
s.toString
B.E.c_(s,"DOMContentLoaded",new A.nf())},
nf:function nf(){},
it:function it(){var _=this
_.a=null
_.b="view-dashboard"
_.x=_.w=_.r=_.f=_.e=_.d=_.c=null
_.z=_.y=0
_.as=_.Q=!1
_.at=0
_.ch=_.ay=_.ax=null
_.k3=_.k1=_.id=_.go=_.fy=_.fx=_.fr=_.dy=_.dx=_.db=_.cy=_.cx=_.CW=$
_.k4=null
_.ok=!1
_.p1=null},
jz:function jz(){},
jv:function jv(a){this.a=a},
jw:function jw(a){this.a=a},
ju:function ju(){},
jx:function jx(a){this.a=a},
jy:function jy(a){this.a=a},
j3:function j3(a){this.a=a},
j_:function j_(){},
j0:function j0(){},
j1:function j1(a,b){this.a=a
this.b=b},
j2:function j2(a){this.a=a},
j6:function j6(a){this.a=a},
j7:function j7(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
j8:function j8(a){this.a=a},
jg:function jg(a){this.a=a},
jh:function jh(a){this.a=a},
j5:function j5(a,b){this.a=a
this.b=b},
ji:function ji(a){this.a=a},
jj:function jj(a){this.a=a},
jk:function jk(a){this.a=a},
jl:function jl(a){this.a=a},
jm:function jm(a){this.a=a},
jn:function jn(a,b){this.a=a
this.b=b},
j9:function j9(a){this.a=a},
ja:function ja(a){this.a=a},
jb:function jb(a){this.a=a},
jc:function jc(a){this.a=a},
jd:function jd(a){this.a=a},
je:function je(a){this.a=a},
jf:function jf(a){this.a=a},
j4:function j4(a,b){this.a=a
this.b=b},
jo:function jo(){},
ka:function ka(){},
kb:function kb(){},
kc:function kc(){},
kk:function kk(a){this.a=a},
kl:function kl(a){this.a=a},
jL:function jL(){},
jM:function jM(a,b){this.a=a
this.b=b},
jK:function jK(a,b){this.a=a
this.b=b},
jN:function jN(a,b){this.a=a
this.b=b},
jJ:function jJ(a){this.a=a},
jO:function jO(a,b){this.a=a
this.b=b},
jH:function jH(a){this.a=a},
jI:function jI(a,b){this.a=a
this.b=b},
jP:function jP(a,b,c){this.a=a
this.b=b
this.c=c},
jE:function jE(a){this.a=a},
jF:function jF(a){this.a=a},
jG:function jG(a,b){this.a=a
this.b=b},
jQ:function jQ(a,b,c){this.a=a
this.b=b
this.c=c},
jC:function jC(a){this.a=a},
jD:function jD(){},
jS:function jS(a,b,c){this.a=a
this.b=b
this.c=c},
jT:function jT(a,b){this.a=a
this.b=b},
jR:function jR(a,b){this.a=a
this.b=b},
jA:function jA(a){this.a=a},
k5:function k5(){},
k6:function k6(a,b){this.a=a
this.b=b},
k7:function k7(){},
k8:function k8(){},
k9:function k9(a,b){this.a=a
this.b=b},
jU:function jU(a){this.a=a},
jV:function jV(a,b){this.a=a
this.b=b},
jW:function jW(){},
jX:function jX(){},
jY:function jY(a){this.a=a},
jp:function jp(a){this.a=a},
jq:function jq(a){this.a=a},
jr:function jr(a){this.a=a},
js:function js(a,b){this.a=a
this.b=b},
jt:function jt(a){this.a=a},
ke:function ke(a){this.a=a},
kf:function kf(a,b,c){this.a=a
this.b=b
this.c=c},
kd:function kd(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
kn:function kn(){},
jB:function jB(a,b){this.a=a
this.b=b},
km:function km(a,b){this.a=a
this.b=b},
kj:function kj(a){this.a=a},
kg:function kg(){},
kh:function kh(){},
ki:function ki(){},
jZ:function jZ(){},
k_:function k_(){},
k0:function k0(){},
k1:function k1(a){this.a=a},
k2:function k2(){},
k3:function k3(){},
k4:function k4(a,b){this.a=a
this.b=b},
iV:function iV(){},
iU:function iU(a){this.a=a},
iW:function iW(a){this.a=a},
iX:function iX(a,b){this.a=a
this.b=b},
iY:function iY(a,b,c){this.a=a
this.b=b
this.c=c},
iZ:function iZ(){},
iz:function iz(a){this.a=a},
iA:function iA(a){this.a=a},
iB:function iB(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
iS:function iS(a,b,c){this.a=a
this.b=b
this.c=c},
iT:function iT(a){this.a=a},
iv:function iv(a,b,c){this.a=a
this.b=b
this.c=c},
iw:function iw(a){this.a=a},
ix:function ix(a){this.a=a},
iH:function iH(a,b,c){this.a=a
this.b=b
this.c=c},
iR:function iR(a,b){this.a=a
this.b=b},
iy:function iy(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
iQ:function iQ(a,b){this.a=a
this.b=b},
iI:function iI(a,b){this.a=a
this.b=b},
iJ:function iJ(a,b){this.a=a
this.b=b},
iK:function iK(a,b){this.a=a
this.b=b},
iL:function iL(a,b){this.a=a
this.b=b},
iM:function iM(a,b){this.a=a
this.b=b},
iN:function iN(a,b){this.a=a
this.b=b},
iO:function iO(a,b){this.a=a
this.b=b},
iC:function iC(a,b){this.a=a
this.b=b},
iD:function iD(a,b,c){this.a=a
this.b=b
this.c=c},
iP:function iP(a,b){this.a=a
this.b=b},
iE:function iE(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
iF:function iF(a,b,c){this.a=a
this.b=b
this.c=c},
iu:function iu(){},
iG:function iG(a){this.a=a},
aH:function aH(a,b,c){this.a=a
this.b=b
this.c=c},
kv:function kv(a,b,c,d,e,f,g,h,i,j){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=!1
_.y=null
_.z=!1
_.Q=0
_.as=i
_.at=null
_.ax=j
_.ch=_.ay=!1},
ky:function ky(){},
kz:function kz(a){this.a=a},
kG:function kG(a){this.a=a},
kC:function kC(a,b){this.a=a
this.b=b},
kD:function kD(a){this.a=a},
kE:function kE(a){this.a=a},
kF:function kF(a,b){this.a=a
this.b=b},
kR:function kR(){},
kS:function kS(){},
kB:function kB(){},
l2:function l2(){},
l3:function l3(a,b,c){this.a=a
this.b=b
this.c=c},
l7:function l7(){},
l8:function l8(a){this.a=a},
l9:function l9(a){this.a=a},
l6:function l6(a){this.a=a},
la:function la(a){this.a=a},
lb:function lb(){},
kX:function kX(a){this.a=a},
kY:function kY(a){this.a=a},
kZ:function kZ(a){this.a=a},
l_:function l_(a){this.a=a},
l0:function l0(a){this.a=a},
l1:function l1(a){this.a=a},
kH:function kH(){},
kQ:function kQ(){},
l5:function l5(a,b,c){this.a=a
this.b=b
this.c=c},
l4:function l4(a,b){this.a=a
this.b=b},
lc:function lc(){},
ld:function ld(){},
le:function le(a){this.a=a},
lf:function lf(){},
kx:function kx(){},
kw:function kw(a,b,c){this.a=a
this.b=b
this.c=c},
kP:function kP(a,b){this.a=a
this.b=b},
lg:function lg(a){this.a=a},
kO:function kO(){},
kM:function kM(a){this.a=a},
kN:function kN(){},
kI:function kI(){},
kJ:function kJ(){},
kK:function kK(a){this.a=a},
kL:function kL(){},
kT:function kT(a,b){this.a=a
this.b=b},
kU:function kU(){},
kV:function kV(){},
kW:function kW(a,b){this.a=a
this.b=b},
kA:function kA(a){this.a=a},
im(){var s,r=$.qo(),q=A.E(new Array(24),t.s)
for(s=0;s<24;++s)q[s]=B.a.a_(B.c.h5(r.fQ(256),16),2,"0")
return B.b.fK(q)},
bl(){var s,r,q
try{r=window.localStorage.getItem("waterhall_jwt")
r.toString
s=r
r=J.oq(s,".")
if(1>=r.length)return A.e(r,1)
r=A.w(J.l(B.d.K(0,B.p.K(0,B.u.b3(B.y.dr(0,r[1])))),"sub"))
return r}catch(q){return null}},
de(){var s,r,q,p
try{q=window.localStorage.getItem("waterhall_jwt")
q.toString
s=q
q=J.oq(s,".")
if(1>=q.length)return A.e(q,1)
r=B.d.K(0,B.p.K(0,B.u.b3(B.y.dr(0,q[1]))))
q=J.qF(J.qG(J.l(r,"exp"),1000),Date.now())
return q}catch(p){return!1}},
ij(a,b){var s=0,r=A.U(t.z),q
var $async$ij=A.V(function(c,d){if(c===1)return A.R(d,r)
for(;;)switch(s){case 0:if(!$.dh().bo("WaterHallStorage")){q=null
s=1
break}s=3
return A.y(A.q9(A.aY(globalThis.waterhallNativeCall(a,A.uN(b))),t.z),$async$ij)
case 3:q=d
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$ij,r)},
ik(a){var s=0,r=A.U(t.H)
var $async$ik=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:s=$.dh().bo("waterhallSetNativeSession")?2:3
break
case 2:s=4
return A.y(A.q9(A.aY(globalThis.waterhallSetNativeSession(a)),t.z),$async$ik)
case 4:case 3:return A.S(null,r)}})
return A.T($async$ik,r)},
cB(a,b){var s=A.bl(),r=$.qE().ci(new A.ni(s,a,b),t.a)
$.ub=r.d8(new A.nj())
return r},
n_(a,b){var s=0,r=A.U(t.H),q,p,o,n
var $async$n_=A.V(function(c,d){if(c===1)return A.R(d,r)
for(;;)switch(s){case 0:n=A.bl()
if(n==null)throw A.b(A.ah("Sign in before recording an operation"))
q=A.G(b)
p=q.h("I<1>")
o=A.a8(new A.I(b,q.h("H(1)").a(new A.n0(n)),p),p.h("f.E"))
s=2
return A.y(A.ij("save",A.a2(["type",a,"rows",o],t.N,t.z)),$async$n_)
case 2:q=window.localStorage
q.toString
p=a==="collections"?"waterhall_offline_collections":"waterhall_unsynced_actions"
q.setItem(p,B.d.T(b))
return A.S(null,r)}})
return A.T($async$n_,r)},
dg(){var s=0,r=A.U(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$dg=A.V(function(a2,a3){if(a2===1)return A.R(a3,r)
for(;;)switch(s){case 0:a1=window.localStorage.getItem("waterhall_jwt")
if(A.bl()==null){s=1
break}s=3
return A.y(A.ik(window.localStorage.getItem("waterhall_jwt")),$async$dg)
case 3:p=["collections","actions"],o=t.f,n=t.N,m=t.z,l=t.j,k=t.P,j=0
case 4:if(!(j<2)){s=6
break}i=p[j]
if(window.localStorage.getItem("waterhall_jwt")!=a1){s=1
break}s=7
return A.y(A.ij("load",A.a2(["type",i],n,m)),$async$dg)
case 7:h=a3
if(window.localStorage.getItem("waterhall_jwt")!=a1){s=1
break}if(h==null){s=5
break}g=l.a(B.d.K(0,A.w(h)))
f=i==="collections"?"waterhall_offline_collections":"waterhall_unsynced_actions"
e=window.localStorage.getItem(f)
d=A.ap(n,k)
e=A.a8(l.a(B.d.K(0,e==null?"[]":e)),m)
B.b.S(e,g)
c=e.length
b=0
for(;b<e.length;e.length===c||(0,A.av)(e),++b){a=A.aq(o.a(e[b]),n,m)
a0=a.i(0,"transaction_id")
d.k(0,J.M(a0==null?a.i(0,"operation_id"):a0),a)}s=A.bl()!=null?8:9
break
case 8:s=10
return A.y(A.cB(i,new A.no(d)),$async$dg)
case 10:case 9:case 5:++j
s=4
break
case 6:case 1:return A.S(q,r)}})
return A.T($async$dg,r)},
ni:function ni(a,b,c){this.a=a
this.b=b
this.c=c},
nh:function nh(){},
nj:function nj(){},
n0:function n0(a){this.a=a},
no:function no(a){this.a=a},
nn:function nn(a){this.a=a},
q6(a){return t.fj.b(a)||t.A.b(a)||t.mz.b(a)||t.ad.b(a)||t.F.b(a)||t.hE.b(a)||t.f5.b(a)},
uR(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
uV(a){throw A.ai(A.oJ(a),new Error())},
aw(){throw A.ai(A.rq(""),new Error())},
qe(){throw A.ai(A.oJ(""),new Error())}},B={}
var w=[A,J,B]
var $={}
A.nF.prototype={}
J.cJ.prototype={
Z(a,b){return a===b},
gG(a){return A.dW(a)},
l(a){return"Instance of '"+A.dX(a)+"'"},
dq(a,b){throw A.b(A.oQ(a,t.bg.a(b)))},
gU(a){return A.cy(A.o7(this))}}
J.fh.prototype={
l(a){return String(a)},
gG(a){return a?519018:218159},
gU(a){return A.cy(t.y)},
$iY:1,
$iH:1}
J.dC.prototype={
Z(a,b){return null==b},
l(a){return"null"},
gG(a){return 0},
$iY:1,
$ia4:1}
J.a.prototype={$ii:1}
J.bV.prototype={
gG(a){return 0},
l(a){return String(a)}}
J.fF.prototype={}
J.bF.prototype={}
J.bz.prototype={
l(a){var s=a[$.io()]
if(s==null)s=a[$.qi()]
if(s==null)return this.ec(a)
return"JavaScript function for "+J.M(s)},
$icd:1}
J.cK.prototype={
gG(a){return 0},
l(a){return String(a)}}
J.cL.prototype={
gG(a){return 0},
l(a){return String(a)}}
J.af.prototype={
m(a,b){A.G(a).c.a(b)
a.$flags&1&&A.aG(a,29)
a.push(b)},
c9(a,b,c){var s
A.G(a).c.a(c)
a.$flags&1&&A.aG(a,"insert",2)
s=a.length
if(b>s)throw A.b(A.oY(b,null))
a.splice(b,0,c)},
eW(a,b,c){var s,r,q,p,o
A.G(a).h("H(1)").a(b)
s=[]
r=a.length
for(q=0;q<r;++q){p=a[q]
if(!b.$1(p))s.push(p)
if(a.length!==r)throw A.b(A.a5(a))}o=s.length
if(o===r)return
this.sj(a,o)
for(q=0;q<s.length;++q)a[q]=s[q]},
S(a,b){var s
A.G(a).h("f<1>").a(b)
a.$flags&1&&A.aG(a,"addAll",2)
if(Array.isArray(b)){this.eq(a,b)
return}for(s=J.b4(b);s.q();)a.push(s.gu(s))},
eq(a,b){var s,r
t.J.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.b(A.a5(a))
for(r=0;r<s;++r)a.push(b[r])},
aw(a){a.$flags&1&&A.aG(a,"clear","clear")
a.length=0},
p(a,b){var s,r
A.G(a).h("~(1)").a(b)
s=a.length
for(r=0;r<s;++r){b.$1(a[r])
if(a.length!==s)throw A.b(A.a5(a))}},
an(a,b,c){var s=A.G(a)
return new A.a_(a,s.J(c).h("1(2)").a(b),s.h("@<1>").J(c).h("a_<1,2>"))},
Y(a,b){var s,r=A.dK(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.k(r,s,A.h(a[s]))
return r.join(b)},
fK(a){return this.Y(a,"")},
fX(a,b){var s,r,q
A.G(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.b(A.ff())
if(0>=s)return A.e(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.b(A.a5(a))}return r},
fC(a,b,c,d){var s,r,q
d.a(b)
A.G(a).J(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.b(A.a5(a))}return r},
dg(a,b,c){var s,r,q,p=A.G(a)
p.h("H(1)").a(b)
p.h("1()?").a(c)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.b(A.a5(a))}if(c!=null)return c.$0()
throw A.b(A.ff())},
fB(a,b){return this.dg(a,b,null)},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
cw(a,b,c){var s=a.length
if(b>s)throw A.b(A.aj(b,0,s,"start",null))
if(c==null)c=s
else if(c<b||c>s)throw A.b(A.aj(c,b,s,"end",null))
if(b===c)return A.E([],A.G(a))
return A.E(a.slice(b,c),A.G(a))},
e6(a,b){return this.cw(a,b,null)},
gab(a){if(a.length>0)return a[0]
throw A.b(A.ff())},
gdl(a){var s=a.length
if(s>0)return a[s-1]
throw A.b(A.ff())},
a9(a,b){var s,r
A.G(a).h("H(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.b(A.a5(a))}return!1},
bb(a,b){var s,r,q,p,o,n=A.G(a)
n.h("j(1,1)?").a(b)
a.$flags&2&&A.aG(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.b9()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.bt(b,2))
if(p>0)this.eY(a,p)},
eY(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
A(a,b){var s
for(s=0;s<a.length;++s)if(J.m(a[s],b))return!0
return!1},
gE(a){return a.length===0},
gR(a){return a.length!==0},
l(a){return A.nD(a,"[","]")},
gD(a){return new J.b7(a,a.length,A.G(a).h("b7<1>"))},
gG(a){return A.dW(a)},
gj(a){return a.length},
sj(a,b){a.$flags&1&&A.aG(a,"set length","change the length of")
if(b>a.length)A.G(a).c.a(null)
a.length=b},
i(a,b){A.J(b)
if(!(b>=0&&b<a.length))throw A.b(A.ii(a,b))
return a[b]},
k(a,b,c){A.G(a).c.a(c)
a.$flags&2&&A.aG(a)
if(!(b>=0&&b<a.length))throw A.b(A.ii(a,b))
a[b]=c},
dJ(a,b){return new A.co(a,b.h("co<0>"))},
fF(a,b){var s
A.G(a).h("H(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$in:1,
$if:1,
$ip:1}
J.fg.prototype={
dG(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.dX(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.lw.prototype={}
J.b7.prototype={
gu(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.av(q)
throw A.b(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iac:1}
J.cf.prototype={
a2(a,b){var s
A.a3(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gbs(b)
if(this.gbs(a)===s)return 0
if(this.gbs(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbs(a){return a===0?1/a<0:a<0},
aD(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.b(A.N(""+a+".round()"))},
dc(a,b,c){if(B.c.a2(b,c)>0)throw A.b(A.oa(b))
if(this.a2(a,b)<0)return b
if(this.a2(a,c)>0)return c
return a},
F(a,b){var s
if(b>20)throw A.b(A.aj(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gbs(a))return"-"+s
return s},
h5(a,b){var s,r,q,p,o
if(b<2||b>36)throw A.b(A.aj(b,2,36,"radix",null))
s=a.toString(b)
r=s.length
q=r-1
if(!(q>=0))return A.e(s,q)
if(s.charCodeAt(q)!==41)return s
p=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(s)
if(p==null)A.bM(A.N("Unexpected toString result: "+s))
r=p.length
if(1>=r)return A.e(p,1)
s=p[1]
if(3>=r)return A.e(p,3)
o=+p[3]
r=p[2]
if(r!=null){s+=r
o-=r.length}return s+B.a.aF("0",o)},
l(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gG(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
aF(a,b){return a*b},
ar(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
eh(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.cV(a,b)},
af(a,b){return(a|0)===a?a/b|0:this.cV(a,b)},
cV(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.b(A.N("Result of truncating division is "+A.h(s)+": "+A.h(a)+" ~/ "+b))},
b1(a,b){var s
if(a>0)s=this.cU(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
f5(a,b){if(0>b)throw A.b(A.oa(b))
return this.cU(a,b)},
cU(a,b){return b>31?0:a>>>b},
b9(a,b){return a>b},
gU(a){return A.cy(t.w)},
$iW:1,
$ia0:1}
J.dB.prototype={
gU(a){return A.cy(t.S)},
$iY:1,
$ij:1}
J.fj.prototype={
gU(a){return A.cy(t.dx)},
$iY:1}
J.bU.prototype={
cm(a,b){return a+b},
e4(a,b){var s=A.E(a.split(b),t.s)
return s},
aC(a,b,c,d){var s=A.cR(b,c,a.length)
return a.substring(0,b)+d+a.substring(s)},
P(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.aj(c,0,a.length,null,null))
s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)},
N(a,b){return this.P(a,b,0)},
n(a,b,c){return a.substring(b,A.cR(b,c,a.length))},
X(a,b){return this.n(a,b,null)},
h4(a){return a.toLowerCase()},
t(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.e(p,0)
if(p.charCodeAt(0)===133){s=J.rn(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.e(p,r)
q=p.charCodeAt(r)===133?J.ro(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
aF(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.b(B.a0)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
a_(a,b,c){var s=b-a.length
if(s<=0)return a
return this.aF(c,s)+a},
br(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.aj(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
di(a,b){return this.br(a,b,0)},
dm(a,b,c){var s,r
if(c==null)c=a.length
else if(c<0||c>a.length)throw A.b(A.aj(c,0,a.length,null,null))
s=b.length
r=a.length
if(c+s>r)c=r-s
return a.lastIndexOf(b,c)},
fL(a,b){return this.dm(a,b,null)},
bm(a,b,c){var s=a.length
if(c>s)throw A.b(A.aj(c,0,s,null,null))
return A.uT(a,b,c)},
A(a,b){return this.bm(a,b,0)},
a2(a,b){var s
A.w(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
l(a){return a},
gG(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gU(a){return A.cy(t.N)},
gj(a){return a.length},
i(a,b){A.J(b)
if(!(b>=0&&b<a.length))throw A.b(A.ii(a,b))
return a[b]},
$iY:1,
$ilM:1,
$ic:1}
A.dF.prototype={
l(a){return"LateInitializationError: "+this.a}}
A.f_.prototype={
gj(a){return this.a.length},
i(a,b){var s
A.J(b)
s=this.a
if(!(b>=0&&b<s.length))return A.e(s,b)
return s.charCodeAt(b)}}
A.nk.prototype={
$0(){return A.nC(null,t.H)},
$S:67}
A.lP.prototype={}
A.n.prototype={}
A.ag.prototype={
gD(a){var s=this
return new A.bA(s,s.gj(s),A.A(s).h("bA<ag.E>"))},
gE(a){return this.gj(this)===0},
A(a,b){var s,r=this,q=r.gj(r)
for(s=0;s<q;++s){if(J.m(r.v(0,s),b))return!0
if(q!==r.gj(r))throw A.b(A.a5(r))}return!1},
Y(a,b){var s,r,q,p=this,o=p.gj(p)
if(b.length!==0){if(o===0)return""
s=A.h(p.v(0,0))
if(o!==p.gj(p))throw A.b(A.a5(p))
for(r=s,q=1;q<o;++q){r=r+b+A.h(p.v(0,q))
if(o!==p.gj(p))throw A.b(A.a5(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.h(p.v(0,q))
if(o!==p.gj(p))throw A.b(A.a5(p))}return r.charCodeAt(0)==0?r:r}},
bC(a,b){return this.e9(0,A.A(this).h("H(ag.E)").a(b))},
an(a,b,c){var s=A.A(this)
return new A.a_(this,s.J(c).h("1(ag.E)").a(b),s.h("@<ag.E>").J(c).h("a_<1,2>"))},
aE(a,b){var s=A.a8(this,A.A(this).h("ag.E"))
return s},
ap(a){return this.aE(0,!0)},
dF(a){var s,r=this,q=A.ci(A.A(r).h("ag.E"))
for(s=0;s<r.gj(r);++s)q.m(0,r.v(0,s))
return q}}
A.e1.prototype={
geH(){var s=J.ae(this.a),r=this.c
if(r==null||r>s)return s
return r},
gf7(){var s=J.ae(this.a),r=this.b
if(r>s)return s
return r},
gj(a){var s,r=J.ae(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
v(a,b){var s=this,r=s.gf7()+b
if(b<0||r>=s.geH())throw A.b(A.a7(b,s.gj(0),s,null,"index"))
return J.eM(s.a,r)},
aE(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.C(n),l=m.gj(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.nE(0,n):J.oG(0,n)}r=A.dK(s,m.v(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.b.k(r,q,m.v(n,o+q))
if(m.gj(n)<l)throw A.b(A.a5(p))}return r},
ap(a){return this.aE(0,!0)}}
A.bA.prototype={
gu(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s,r=this,q=r.a,p=J.C(q),o=p.gj(q)
if(r.b!==o)throw A.b(A.a5(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.v(q,s);++r.c
return!0},
$iac:1}
A.aE.prototype={
gD(a){return new A.dL(J.b4(this.a),this.b,A.A(this).h("dL<1,2>"))},
gj(a){return J.ae(this.a)},
gE(a){return J.ir(this.a)},
v(a,b){return this.b.$1(J.eM(this.a,b))}}
A.bw.prototype={$in:1}
A.dL.prototype={
q(){var s=this,r=s.b
if(r.q()){s.a=s.c.$1(r.gu(r))
return!0}s.a=null
return!1},
gu(a){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iac:1}
A.a_.prototype={
gj(a){return J.ae(this.a)},
v(a,b){return this.b.$1(J.eM(this.a,b))}}
A.I.prototype={
gD(a){return new A.bh(J.b4(this.a),this.b,this.$ti.h("bh<1>"))},
an(a,b,c){var s=this.$ti
return new A.aE(this,s.J(c).h("1(2)").a(b),s.h("@<1>").J(c).h("aE<1,2>"))}}
A.bh.prototype={
q(){var s,r
for(s=this.a,r=this.b;s.q();)if(r.$1(s.gu(s)))return!0
return!1},
gu(a){var s=this.a
return s.gu(s)},
$iac:1}
A.co.prototype={
gD(a){return new A.e5(J.b4(this.a),this.$ti.h("e5<1>"))}}
A.e5.prototype={
q(){var s,r
for(s=this.a,r=this.$ti.c;s.q();)if(r.b(s.gu(s)))return!0
return!1},
gu(a){var s=this.a
return this.$ti.c.a(s.gu(s))},
$iac:1}
A.aD.prototype={}
A.bG.prototype={
k(a,b,c){A.A(this).h("bG.E").a(c)
throw A.b(A.N("Cannot modify an unmodifiable list"))}}
A.cX.prototype={}
A.hx.prototype={
gj(a){return J.ae(this.a)},
v(a,b){var s=J.ae(this.a)
if(0>b||b>=s)A.bM(A.a7(b,s,this,null,"index"))
return b}}
A.cj.prototype={
i(a,b){return this.L(0,b)?J.l(this.a,A.J(b)):null},
gj(a){return J.ae(this.a)},
gH(a){return new A.hx(this.a)},
gE(a){return J.ir(this.a)},
gR(a){return J.nx(this.a)},
L(a,b){return A.eG(b)&&b>=0&&b<J.ae(this.a)},
p(a,b){var s,r,q,p
this.$ti.h("~(j,1)").a(b)
s=this.a
r=J.C(s)
q=r.gj(s)
for(p=0;p<q;++p){b.$2(p,r.i(s,p))
if(q!==r.gj(s))throw A.b(A.a5(s))}}}
A.c_.prototype={
gG(a){var s=this._hashCode
if(s!=null)return s
s=664597*B.a.gG(this.a)&536870911
this._hashCode=s
return s},
l(a){return'Symbol("'+this.a+'")'},
Z(a,b){if(b==null)return!1
return b instanceof A.c_&&this.a===b.a},
$icU:1}
A.dm.prototype={}
A.dl.prototype={
gE(a){return this.gj(this)===0},
gR(a){return this.gj(this)!==0},
l(a){return A.nI(this)},
k(a,b,c){var s=A.A(this)
s.c.a(b)
s.y[1].a(c)
A.oz()},
B(a,b){A.oz()},
gaz(a){return new A.d4(this.fz(0),A.A(this).h("d4<an<1,2>>"))},
fz(a){var s=this
return function(){var r=a
var q=0,p=1,o=[],n,m,l,k,j
return function $async$gaz(b,c,d){if(c===1){o.push(d)
q=p}for(;;)switch(q){case 0:n=s.gH(s),n=n.gD(n),m=A.A(s),l=m.y[1],m=m.h("an<1,2>")
case 2:if(!n.q()){q=3
break}k=n.gu(n)
j=s.i(0,k)
q=4
return b.b=new A.an(k,j==null?l.a(j):j,m),1
case 4:q=2
break
case 3:return 0
case 1:return b.c=o.at(-1),3}}}},
$iu:1}
A.bu.prototype={
gj(a){return this.b.length},
gcM(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
L(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
i(a,b){if(!this.L(0,b))return null
return this.b[this.a[b]]},
p(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gcM()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gH(a){return new A.ej(this.gcM(),this.$ti.h("ej<1>"))}}
A.ej.prototype={
gj(a){return this.a.length},
gE(a){return 0===this.a.length},
gD(a){var s=this.a
return new A.ek(s,s.length,this.$ti.h("ek<1>"))}}
A.ek.prototype={
gu(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iac:1}
A.fi.prototype={
gfO(){var s=this.a
if(s instanceof A.c_)return s
return this.a=new A.c_(A.w(s))},
gfT(){var s,r,q,p,o,n=this
if(n.c===1)return B.G
s=n.d
r=J.C(s)
q=r.gj(s)-J.ae(n.e)-n.f
if(q===0)return B.G
p=[]
for(o=0;o<q;++o)p.push(r.i(s,o))
p.$flags=3
return p},
gfP(){var s,r,q,p,o,n,m,l,k=this
if(k.c!==0)return B.J
s=k.e
r=J.C(s)
q=r.gj(s)
p=k.d
o=J.C(p)
n=o.gj(p)-q-k.f
if(q===0)return B.J
m=new A.bb(t.bX)
for(l=0;l<q;++l)m.k(0,new A.c_(A.w(r.i(s,l))),o.i(p,n+l))
return new A.dm(m,t.i9)},
$ioF:1}
A.lN.prototype={
$2(a,b){var s
A.w(a)
s=this.a
s.b=s.b+"$"+a
B.b.m(this.b,a)
B.b.m(this.c,b);++s.a},
$S:11}
A.cS.prototype={}
A.lW.prototype={
ad(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.dT.prototype={
l(a){return"Null check operator used on a null value"}}
A.fl.prototype={
l(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.fZ.prototype={
l(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.lL.prototype={
l(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.dv.prototype={}
A.eu.prototype={
l(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibf:1}
A.bQ.prototype={
l(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.qf(r==null?"unknown":r)+"'"},
$icd:1,
gh9(){return this},
$C:"$1",
$R:1,
$D:null}
A.eY.prototype={$C:"$0",$R:0}
A.eZ.prototype={$C:"$2",$R:2}
A.fQ.prototype={}
A.fM.prototype={
l(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.qf(s)+"'"}}
A.cF.prototype={
Z(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.cF))return!1
return this.$_target===b.$_target&&this.a===b.a},
gG(a){return(A.il(this.a)^A.dW(this.$_target))>>>0},
l(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.dX(this.a)+"'")}}
A.fJ.prototype={
l(a){return"RuntimeError: "+this.a}}
A.mB.prototype={}
A.bb.prototype={
gj(a){return this.a},
gE(a){return this.a===0},
gR(a){return this.a!==0},
gH(a){return new A.ch(this,A.A(this).h("ch<1>"))},
gaz(a){return new A.dG(this,A.A(this).h("dG<1,2>"))},
L(a,b){var s=this.b
if(s==null)return!1
return s[b]!=null},
S(a,b){A.A(this).h("u<1,2>").a(b).p(0,new A.lx(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.fH(b)},
fH(a){var s,r,q=this.d
if(q==null)return null
s=q[this.dj(a)]
r=this.dk(s,a)
if(r<0)return null
return s[r].b},
k(a,b,c){var s,r,q=this,p=A.A(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.cz(s==null?q.b=q.bR():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.cz(r==null?q.c=q.bR():r,b,c)}else q.fI(b,c)},
fI(a,b){var s,r,q,p,o=this,n=A.A(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.bR()
r=o.dj(a)
q=s[r]
if(q==null)s[r]=[o.bS(a,b)]
else{p=o.dk(q,a)
if(p>=0)q[p].b=b
else q.push(o.bS(a,b))}},
fU(a,b,c){var s,r,q=this,p=A.A(q)
p.c.a(b)
p.h("2()").a(c)
if(q.L(0,b)){s=q.i(0,b)
return s==null?p.y[1].a(s):s}r=c.$0()
q.k(0,b,r)
return r},
B(a,b){var s=this.en(this.b,b)
return s},
p(a,b){var s,r,q=this
A.A(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.b(A.a5(q))
s=s.c}},
cz(a,b,c){var s,r=A.A(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.bS(b,c)
else s.b=c},
en(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.eo(s)
delete a[b]
return s.b},
cO(){this.r=this.r+1&1073741823},
bS(a,b){var s=this,r=A.A(s),q=new A.lA(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.cO()
return q},
eo(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.cO()},
dj(a){return J.cC(a)&1073741823},
dk(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.m(a[r].a,b))return r
return-1},
l(a){return A.nI(this)},
bR(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ioK:1}
A.lx.prototype={
$2(a,b){var s=this.a,r=A.A(s)
s.k(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.A(this.a).h("~(1,2)")}}
A.lA.prototype={}
A.ch.prototype={
gj(a){return this.a.a},
gE(a){return this.a.a===0},
gD(a){var s=this.a
return new A.dI(s,s.r,s.e,this.$ti.h("dI<1>"))},
A(a,b){return this.a.L(0,b)}}
A.dI.prototype={
gu(a){return this.d},
q(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a5(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iac:1}
A.aU.prototype={
gj(a){return this.a.a},
gE(a){return this.a.a===0},
gD(a){var s=this.a
return new A.dJ(s,s.r,s.e,this.$ti.h("dJ<1>"))},
p(a,b){var s,r,q
this.$ti.h("~(1)").a(b)
s=this.a
r=s.e
q=s.r
while(r!=null){b.$1(r.b)
if(q!==s.r)throw A.b(A.a5(s))
r=r.c}}}
A.dJ.prototype={
gu(a){return this.d},
q(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a5(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iac:1}
A.dG.prototype={
gj(a){return this.a.a},
gE(a){return this.a.a===0},
gD(a){var s=this.a
return new A.dH(s,s.r,s.e,this.$ti.h("dH<1,2>"))}}
A.dH.prototype={
gu(a){var s=this.d
s.toString
return s},
q(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a5(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.an(s.a,s.b,r.$ti.h("an<1,2>"))
r.c=s.c
return!0}},
$iac:1}
A.na.prototype={
$1(a){return this.a(a)},
$S:13}
A.nb.prototype={
$2(a,b){return this.a(a,b)},
$S:65}
A.nc.prototype={
$1(a){return this.a(A.w(a))},
$S:68}
A.fk.prototype={
l(a){return"RegExp/"+this.a+"/"+this.b.flags},
df(a){var s=this.b.exec(a)
if(s==null)return null
return new A.mz(s)},
$ilM:1,
$irF:1}
A.mz.prototype={
i(a,b){var s
A.J(b)
s=this.b
if(!(b<s.length))return A.e(s,b)
return s[b]}}
A.ck.prototype={
gU(a){return B.ao},
d6(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
$iY:1,
$ick:1,
$ieX:1}
A.dO.prototype={
gfn(a){if(((a.$flags|0)&2)!==0)return new A.i3(a.buffer)
else return a.buffer},
eM(a,b,c,d){var s=A.aj(b,0,c,d,null)
throw A.b(s)},
cE(a,b,c,d){if(b>>>0!==b||b>c)this.eM(a,b,c,d)},
$iad:1}
A.i3.prototype={
d6(a,b,c){var s=A.oP(this.a,b,c)
s.$flags=3
return s},
$ieX:1}
A.dM.prototype={
gU(a){return B.ap},
$iY:1,
$ikr:1}
A.ar.prototype={
gj(a){return a.length},
f4(a,b,c,d,e){var s,r,q=a.length
this.cE(a,b,q,"start")
this.cE(a,c,q,"end")
if(b>c)throw A.b(A.aj(b,0,c,null,null))
s=c-b
if(e<0)throw A.b(A.b6(e,null))
r=d.length
if(r-e<s)throw A.b(A.ah("Not enough elements"))
if(e!==0||r!==s)d=d.subarray(e,e+s)
a.set(d,b)},
$iL:1}
A.dN.prototype={
i(a,b){A.J(b)
A.bI(b,a,a.length)
return a[b]},
k(a,b,c){A.pE(c)
a.$flags&2&&A.aG(a)
A.bI(b,a,a.length)
a[b]=c},
$in:1,
$if:1,
$ip:1}
A.aV.prototype={
k(a,b,c){A.J(c)
a.$flags&2&&A.aG(a)
A.bI(b,a,a.length)
a[b]=c},
bG(a,b,c,d,e){t.fm.a(d)
a.$flags&2&&A.aG(a,5)
if(t.aj.b(d)){this.f4(a,b,c,d,e)
return}this.ed(a,b,c,d,e)},
$in:1,
$if:1,
$ip:1}
A.fu.prototype={
gU(a){return B.aq},
$iY:1,
$ilq:1}
A.fv.prototype={
gU(a){return B.ar},
$iY:1,
$ilr:1}
A.fw.prototype={
gU(a){return B.as},
i(a,b){A.J(b)
A.bI(b,a,a.length)
return a[b]},
$iY:1,
$ilt:1}
A.fx.prototype={
gU(a){return B.at},
i(a,b){A.J(b)
A.bI(b,a,a.length)
return a[b]},
$iY:1,
$ilu:1}
A.fy.prototype={
gU(a){return B.au},
i(a,b){A.J(b)
A.bI(b,a,a.length)
return a[b]},
$iY:1,
$ilv:1}
A.fz.prototype={
gU(a){return B.aw},
i(a,b){A.J(b)
A.bI(b,a,a.length)
return a[b]},
$iY:1,
$ilY:1}
A.fA.prototype={
gU(a){return B.ax},
i(a,b){A.J(b)
A.bI(b,a,a.length)
return a[b]},
$iY:1,
$ilZ:1}
A.dP.prototype={
gU(a){return B.ay},
gj(a){return a.length},
i(a,b){A.J(b)
A.bI(b,a,a.length)
return a[b]},
$iY:1,
$im_:1}
A.dQ.prototype={
gU(a){return B.az},
gj(a){return a.length},
i(a,b){A.J(b)
A.bI(b,a,a.length)
return a[b]},
$iY:1,
$im0:1}
A.em.prototype={}
A.en.prototype={}
A.eo.prototype={}
A.ep.prototype={}
A.be.prototype={
h(a){return A.mL(v.typeUniverse,this,a)},
J(a){return A.th(v.typeUniverse,this,a)}}
A.hn.prototype={}
A.mJ.prototype={
l(a){return A.aF(this.a,null)}}
A.hk.prototype={
l(a){return this.a}}
A.d5.prototype={$ibD:1}
A.m7.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:14}
A.m6.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:54}
A.m8.prototype={
$0(){this.a.$0()},
$S:15}
A.m9.prototype={
$0(){this.a.$0()},
$S:15}
A.ey.prototype={
el(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(A.bt(new A.mI(this,b),0),a)
else throw A.b(A.N("`setTimeout()` not found."))},
em(a,b){if(self.setTimeout!=null)this.b=self.setInterval(A.bt(new A.mH(this,a,Date.now(),b),0),a)
else throw A.b(A.N("Periodic timer."))},
a1(a){var s
if(self.setTimeout!=null){s=this.b
if(s==null)return
if(this.a)self.clearTimeout(s)
else self.clearInterval(s)
this.b=null}else throw A.b(A.N("Canceling a timer."))},
$icW:1}
A.mI.prototype={
$0(){var s=this.a
s.b=null
s.c=1
this.b.$0()},
$S:2}
A.mH.prototype={
$0(){var s,r=this,q=r.a,p=q.c+1,o=r.b
if(o>0){s=Date.now()-r.c
if(s>(p+1)*o)p=B.c.eh(s,o)}q.c=p
r.d.$1(q)},
$S:15}
A.h4.prototype={
aK(a,b){var s,r=this,q=r.$ti
q.h("1/?").a(b)
if(b==null)b=q.c.a(b)
if(!r.b)r.a.aV(b)
else{s=r.a
if(q.h("a6<1>").b(b))s.cC(b)
else s.bL(b)}},
c3(a,b){var s=this.a
if(this.b)s.ai(new A.ao(a,b))
else s.bI(new A.ao(a,b))}}
A.mT.prototype={
$1(a){return this.a.$2(0,a)},
$S:12}
A.mU.prototype={
$2(a,b){this.a.$2(1,new A.dv(a,t.l.a(b)))},
$S:53}
A.n2.prototype={
$2(a,b){this.a(A.J(a),b)},
$S:38}
A.ev.prototype={
gu(a){var s=this.b
return s==null?this.$ti.c.a(s):s},
eZ(a,b){var s,r,q
a=A.J(a)
b=b
s=this.a
for(;;)try{r=s(this,a,b)
return r}catch(q){b=q
a=1}},
q(){var s,r,q,p,o,n=this,m=null,l=0
for(;;){s=n.d
if(s!=null)try{if(s.q()){r=s
n.b=r.gu(r)
return!0}else n.d=null}catch(q){m=q
l=1
n.d=null}p=n.eZ(l,m)
if(1===p)return!0
if(0===p){n.b=null
o=n.e
if(o==null||o.length===0){n.a=A.pn
return!1}if(0>=o.length)return A.e(o,-1)
n.a=o.pop()
l=0
m=null
continue}if(2===p){l=0
m=null
continue}if(3===p){m=n.c
n.c=null
o=n.e
if(o==null||o.length===0){n.b=null
n.a=A.pn
throw m
return!1}if(0>=o.length)return A.e(o,-1)
n.a=o.pop()
l=1
continue}throw A.b(A.ah("sync*"))}return!1},
hd(a){var s,r,q=this
if(a instanceof A.d4){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.b.m(r,q.a)
q.a=s
return 2}else{q.d=J.b4(a)
return 2}},
$iac:1}
A.d4.prototype={
gD(a){return new A.ev(this.a(),this.$ti.h("ev<1>"))}}
A.ao.prototype={
l(a){return A.h(this.a)},
$iZ:1,
gaS(){return this.b}}
A.d_.prototype={}
A.bH.prototype={
bT(){},
bU(){},
sbe(a){this.ch=this.$ti.h("bH<1>?").a(a)},
sbV(a){this.CW=this.$ti.h("bH<1>?").a(a)}}
A.e7.prototype={
geO(){return this.c<4},
eV(a){var s,r
A.A(this).h("bH<1>").a(a)
s=a.CW
r=a.ch
if(s==null)this.d=r
else s.sbe(r)
if(r==null)this.e=s
else r.sbV(s)
a.sbV(a)
a.sbe(a)},
f8(a,b,c,d){var s,r,q,p,o,n,m,l=this,k=A.A(l)
k.h("~(1)?").a(a)
t.jE.a(c)
if((l.c&4)!==0){k=new A.d1($.O,k.h("d1<1>"))
A.qc(k.geP())
if(c!=null)k.c=t.M.a(c)
return k}s=$.O
r=d?1:0
q=b!=null?32:0
p=A.pc(s,a,k.c)
A.rU(s,b)
o=c==null?A.us():c
t.M.a(o)
k=k.h("bH<1>")
n=new A.bH(l,p,s,r|q,k)
n.CW=n
n.ch=n
k.a(n)
n.ay=l.c&1
m=l.e
l.e=n
n.sbe(null)
n.sbV(m)
if(m==null)l.d=n
else m.sbe(n)
if(l.d==l.e)A.pV(l.a)
return n},
eT(a){var s=this,r=A.A(s)
a=r.h("bH<1>").a(r.h("br<1>").a(a))
if(a.ch===a)return null
r=a.ay
if((r&2)!==0)a.ay=r|4
else{s.eV(a)
if((s.c&2)===0&&s.d==null)s.ex()}return null},
er(){if((this.c&4)!==0)return new A.bq("Cannot add new events after calling close")
return new A.bq("Cannot add new events while doing an addStream")},
m(a,b){var s=this
A.A(s).c.a(b)
if(!s.geO())throw A.b(s.er())
s.bY(b)},
ex(){if((this.c&4)!==0)if(null.ghc())null.aV(null)
A.pV(this.b)},
$ip_:1,
$ipm:1,
$ic3:1}
A.e6.prototype={
bY(a){var s,r=this.$ti
r.c.a(a)
for(s=this.d,r=r.h("ea<1>");s!=null;s=s.ch)s.eu(new A.ea(a,r))}}
A.ls.prototype={
$0(){var s,r,q,p,o,n,m=this,l=m.a
if(l==null){m.c.a(null)
m.b.aW(null)}else{s=null
try{s=l.$0()}catch(p){r=A.am(p)
q=A.c5(p)
l=r
o=q
n=A.o8(l,o)
l=new A.ao(l,o)
m.b.ai(l)
return}m.b.aW(s)}},
$S:2}
A.lV.prototype={
l(a){var s=this.b.l(0)
return"TimeoutException after "+s+": "+this.a}}
A.h9.prototype={
c3(a,b){var s=this.a
if((s.a&30)!==0)throw A.b(A.ah("Future already completed"))
s.bI(A.tU(a,b))},
bl(a){return this.c3(a,null)}}
A.bi.prototype={
aK(a,b){var s,r=this.$ti
r.h("1/?").a(b)
s=this.a
if((s.a&30)!==0)throw A.b(A.ah("Future already completed"))
s.aV(r.h("1/").a(b))},
fp(a){return this.aK(0,null)}}
A.bk.prototype={
fN(a){if((this.c&15)!==6)return!0
return this.b.b.cg(t.iW.a(this.d),a.a,t.y,t.K)},
fD(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.ng.b(q))p=l.h3(q,m,a.b,o,n,t.l)
else p=l.cg(t.v.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.do.b(A.am(s))){if((r.c&1)!==0)throw A.b(A.b6("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.b(A.b6("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.Q.prototype={
by(a,b,c){var s,r,q,p=this.$ti
p.J(c).h("1/(2)").a(a)
s=$.O
if(s===B.h){if(b!=null&&!t.ng.b(b)&&!t.v.b(b))throw A.b(A.ko(b,"onError",u.c))}else{c.h("@<0/>").J(p.c).h("1(2)").a(a)
if(b!=null)b=A.pR(b,s)}r=new A.Q(s,c.h("Q<0>"))
q=b==null?1:3
this.aU(new A.bk(r,q,a,b,p.h("@<1>").J(c).h("bk<1,2>")))
return r},
ci(a,b){return this.by(a,null,b)},
cX(a,b,c){var s,r=this.$ti
r.J(c).h("1/(2)").a(a)
s=new A.Q($.O,c.h("Q<0>"))
this.aU(new A.bk(s,19,a,b,r.h("@<1>").J(c).h("bk<1,2>")))
return s},
d8(a){var s=this.$ti,r=$.O,q=new A.Q(r,s)
if(r!==B.h)a=A.pR(a,r)
this.aU(new A.bk(q,2,null,a,s.h("bk<1,1>")))
return q},
f3(a){this.a=this.a&1|16
this.c=a},
bd(a){this.a=a.a&30|this.a&1
this.c=a.c},
aU(a){var s,r=this,q=r.a
if(q<=3){a.a=t.e.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.aU(a)
return}r.bd(s)}A.db(null,null,r.b,t.M.a(new A.mg(r,a)))}},
cR(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.e.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t._.a(m.c)
if((n.a&24)===0){n.cR(a)
return}m.bd(n)}l.a=m.bh(a)
A.db(null,null,m.b,t.M.a(new A.ml(l,m)))}},
aZ(){var s=t.e.a(this.c)
this.c=null
return this.bh(s)},
bh(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
aW(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("a6<1>").b(a))A.mj(a,r,!0)
else{s=r.aZ()
q.c.a(a)
r.a=8
r.c=a
A.cr(r,s)}},
bL(a){var s,r=this
r.$ti.c.a(a)
s=r.aZ()
r.a=8
r.c=a
A.cr(r,s)},
eC(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aZ()
q.bd(a)
A.cr(q,r)},
ai(a){var s=this.aZ()
this.f3(a)
A.cr(this,s)},
eB(a,b){A.aY(a)
t.l.a(b)
this.ai(new A.ao(a,b))},
aV(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("a6<1>").b(a)){this.cC(a)
return}this.ev(a)},
ev(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.db(null,null,s.b,t.M.a(new A.mi(s,a)))},
cC(a){A.mj(this.$ti.h("a6<1>").a(a),this,!1)
return},
bI(a){this.a^=2
A.db(null,null,this.b,t.M.a(new A.mh(this,a)))},
dE(a,b){var s,r=this,q={}
if((r.a&24)!==0){q=new A.Q($.O,r.$ti)
q.aV(r)
return q}s=new A.Q($.O,r.$ti)
q.a=null
q.a=A.fU(b,new A.mr(s,b))
r.by(new A.ms(q,r,s),new A.mt(q,s),t.a)
return s},
$ia6:1}
A.mg.prototype={
$0(){A.cr(this.a,this.b)},
$S:2}
A.ml.prototype={
$0(){A.cr(this.b,this.a.a)},
$S:2}
A.mk.prototype={
$0(){A.mj(this.a.a,this.b,!0)},
$S:2}
A.mi.prototype={
$0(){this.a.bL(this.b)},
$S:2}
A.mh.prototype={
$0(){this.a.ai(this.b)},
$S:2}
A.mo.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dB(t.mY.a(q.d),t.z)}catch(p){s=A.am(p)
r=A.c5(p)
if(k.c&&t.n.a(k.b.a.c).a===s){q=k.a
q.c=t.n.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.ny(q)
n=k.a
n.c=new A.ao(q,o)
q=n}q.b=!0
return}if(j instanceof A.Q&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.n.a(j.c)
q.b=!0}return}if(j instanceof A.Q){m=k.b.a
l=new A.Q(m.b,m.$ti)
j.by(new A.mp(l,m),new A.mq(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:2}
A.mp.prototype={
$1(a){this.a.eC(this.b)},
$S:14}
A.mq.prototype={
$2(a,b){A.aY(a)
t.l.a(b)
this.a.ai(new A.ao(a,b))},
$S:34}
A.mn.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.cg(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.am(l)
r=A.c5(l)
q=s
p=r
if(p==null)p=A.ny(q)
o=this.a
o.c=new A.ao(q,p)
o.b=!0}},
$S:2}
A.mm.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.n.a(l.a.a.c)
p=l.b
if(p.a.fN(s)&&p.a.e!=null){p.c=p.a.fD(s)
p.b=!1}}catch(o){r=A.am(o)
q=A.c5(o)
p=t.n.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.ny(p)
m=l.b
m.c=new A.ao(p,n)
p=m}p.b=!0}},
$S:2}
A.mr.prototype={
$0(){var s=A.nN()
this.a.ai(new A.ao(new A.lV("Future not completed",this.b),s))},
$S:2}
A.ms.prototype={
$1(a){var s
this.b.$ti.c.a(a)
s=this.a.a
if(s.b!=null){s.a1(0)
this.c.bL(a)}},
$S(){return this.b.$ti.h("a4(1)")}}
A.mt.prototype={
$2(a,b){var s
A.aY(a)
t.l.a(b)
s=this.a.a
if(s.b!=null){s.a1(0)
this.b.ai(new A.ao(a,b))}},
$S:34}
A.h5.prototype={}
A.bZ.prototype={
gj(a){var s={},r=new A.Q($.O,t.hy)
s.a=0
this.bt(new A.lT(s,this),!0,new A.lU(s,r),r.gcH())
return r},
gab(a){var s=new A.Q($.O,A.A(this).h("Q<1>")),r=this.bt(null,!0,new A.lR(s),s.gcH())
r.cb(new A.lS(this,r,s))
return s}}
A.lT.prototype={
$1(a){A.A(this.b).c.a(a);++this.a.a},
$S(){return A.A(this.b).h("~(1)")}}
A.lU.prototype={
$0(){this.b.aW(this.a.a)},
$S:2}
A.lR.prototype={
$0(){var s,r=A.nN(),q=new A.bq("No element")
A.nK(q,r)
s=A.o8(q,r)
s=new A.ao(q,r)
this.a.ai(s)},
$S:2}
A.lS.prototype={
$1(a){A.tF(this.b,this.c,A.A(this.a).c.a(a))},
$S(){return A.A(this.a).h("~(1)")}}
A.e8.prototype={
gG(a){return(A.dW(this.a)^892482866)>>>0},
Z(a,b){if(b==null)return!1
if(this===b)return!0
return b instanceof A.d_&&b.a===this.a}}
A.e9.prototype={
cP(){return this.w.eT(this)},
bT(){A.A(this.w).h("br<1>").a(this)},
bU(){A.A(this.w).h("br<1>").a(this)}}
A.d0.prototype={
cb(a){var s=A.A(this)
this.a=A.pc(this.d,s.h("~(1)?").a(a),s.c)},
a1(a){var s,r=this,q=r.e&=4294967279
if((q&8)===0){q=r.e=q|8
if((q&128)!==0){s=r.r
if(s.a===1)s.a=3}if((q&64)===0)r.r=null
r.f=r.cP()}q=$.np()
return q},
bT(){},
bU(){},
cP(){return null},
eu(a){var s,r,q=this,p=q.r
if(p==null)p=q.r=new A.hG(A.A(q).h("hG<1>"))
s=p.c
if(s==null)p.b=p.c=a
else p.c=s.a=a
r=q.e
if((r&128)===0){r|=128
q.e=r
if(r<256)p.cp(q)}},
bY(a){var s,r=this,q=A.A(r).c
q.a(a)
s=r.e
r.e=s|64
r.d.dD(r.a,a,q)
r.e&=4294967231
r.ey((s&4)!==0)},
ey(a){var s,r,q=this,p=q.e
if((p&128)!==0&&q.r.c==null){p=q.e=p&4294967167
s=!1
if((p&4)!==0)if(p<256){s=q.r
s=s==null?null:s.c==null
s=s!==!1}if(s){p&=4294967291
q.e=p}}for(;;a=r){if((p&8)!==0){q.r=null
return}r=(p&4)!==0
if(a===r)break
q.e=p^64
if(r)q.bT()
else q.bU()
p=q.e&=4294967231}if((p&128)!==0&&p<256)q.r.cp(q)},
$ibr:1,
$ic3:1}
A.d3.prototype={
bt(a,b,c,d){var s=this.$ti
s.h("~(1)?").a(a)
t.jE.a(c)
return this.a.f8(s.h("~(1)?").a(a),d,c,b===!0)},
fM(a){return this.bt(a,null,null,null)}}
A.eb.prototype={}
A.ea.prototype={}
A.hG.prototype={
cp(a){var s,r=this
r.$ti.h("c3<1>").a(a)
s=r.a
if(s===1)return
if(s>=1){r.a=1
return}A.qc(new A.mA(r,a))
r.a=1}}
A.mA.prototype={
$0(){var s,r,q,p=this.a,o=p.a
p.a=0
if(o===3)return
s=p.$ti.h("c3<1>").a(this.b)
r=p.b
q=r.a
p.b=q
if(q==null)p.c=null
A.A(r).h("c3<1>").a(s).bY(r.b)},
$S:2}
A.d1.prototype={
cb(a){this.$ti.h("~(1)?").a(a)},
a1(a){this.a=-1
this.c=null
return $.np()},
eQ(){var s,r=this,q=r.a-1
if(q===0){r.a=-1
s=r.c
if(s!=null){r.c=null
r.b.dC(s)}}else r.a=q},
$ibr:1}
A.hR.prototype={}
A.mV.prototype={
$0(){return this.a.aW(this.b)},
$S:2}
A.eF.prototype={$ipa:1}
A.hJ.prototype={
dC(a){var s,r,q
t.M.a(a)
try{if(B.h===$.O){a.$0()
return}A.pS(null,null,this,a,t.H)}catch(q){s=A.am(q)
r=A.c5(q)
A.ig(A.aY(s),t.l.a(r))}},
dD(a,b,c){var s,r,q
c.h("~(0)").a(a)
c.a(b)
try{if(B.h===$.O){a.$1(b)
return}A.pT(null,null,this,a,b,t.H,c)}catch(q){s=A.am(q)
r=A.c5(q)
A.ig(A.aY(s),t.l.a(r))}},
c1(a){return new A.mC(this,t.M.a(a))},
d7(a,b){return new A.mD(this,b.h("~(0)").a(a),b)},
i(a,b){return null},
dB(a,b){b.h("0()").a(a)
if($.O===B.h)return a.$0()
return A.pS(null,null,this,a,b)},
cg(a,b,c,d){c.h("@<0>").J(d).h("1(2)").a(a)
d.a(b)
if($.O===B.h)return a.$1(b)
return A.pT(null,null,this,a,b,c,d)},
h3(a,b,c,d,e,f){d.h("@<0>").J(e).J(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.O===B.h)return a.$2(b,c)
return A.ud(null,null,this,a,b,c,d,e,f)},
ce(a,b,c,d){return b.h("@<0>").J(c).J(d).h("1(2,3)").a(a)}}
A.mC.prototype={
$0(){return this.a.dC(this.b)},
$S:2}
A.mD.prototype={
$1(a){var s=this.c
return this.a.dD(this.b,s.a(a),s)},
$S(){return this.c.h("~(0)")}}
A.n1.prototype={
$0(){A.ri(this.a,this.b)},
$S:2}
A.ef.prototype={
gj(a){return this.a},
gE(a){return this.a===0},
gR(a){return this.a!==0},
gH(a){return new A.eg(this,this.$ti.h("eg<1>"))},
L(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
return s==null?!1:s[b]!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
return r==null?!1:r[b]!=null}else return this.eF(b)},
eF(a){var s=this.d
if(s==null)return!1
return this.aj(this.cJ(s,a),a)>=0},
i(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.nT(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.nT(q,b)
return r}else return this.eI(0,b)},
eI(a,b){var s,r,q=this.d
if(q==null)return null
s=this.cJ(q,b)
r=this.aj(s,b)
return r<0?null:s[r+1]},
k(a,b,c){var s,r,q,p,o,n=this,m=n.$ti
m.c.a(b)
m.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=n.b
n.eA(s==null?n.b=A.pe():s,b,c)}else{r=n.d
if(r==null)r=n.d=A.pe()
q=A.il(b)&1073741823
p=r[q]
if(p==null){A.nU(r,q,[b,c]);++n.a
n.e=null}else{o=n.aj(p,b)
if(o>=0)p[o+1]=c
else{p.push(b,c);++n.a
n.e=null}}}},
B(a,b){var s
if(b!=="__proto__")return this.bg(this.b,b)
else{s=this.bW(0,b)
return s}},
bW(a,b){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=A.il(b)&1073741823
r=n[s]
q=o.aj(r,b)
if(q<0)return null;--o.a
o.e=null
p=r.splice(q,2)[1]
if(0===r.length)delete n[s]
return p},
p(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.cI()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.i(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.b(A.a5(m))}},
cI(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.dK(i.a,null,!1,t.z)
s=i.b
r=0
if(s!=null){q=Object.getOwnPropertyNames(s)
p=q.length
for(o=0;o<p;++o){h[r]=q[o];++r}}n=i.c
if(n!=null){q=Object.getOwnPropertyNames(n)
p=q.length
for(o=0;o<p;++o){h[r]=+q[o];++r}}m=i.d
if(m!=null){q=Object.getOwnPropertyNames(m)
p=q.length
for(o=0;o<p;++o){l=m[q[o]]
k=l.length
for(j=0;j<k;j+=2){h[r]=l[j];++r}}}return i.e=h},
eA(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.nU(a,b,c)},
bg(a,b){var s
if(a!=null&&a[b]!=null){s=this.$ti.y[1].a(A.nT(a,b))
delete a[b];--this.a
this.e=null
return s}else return null},
cJ(a,b){return a[A.il(b)&1073741823]}}
A.ei.prototype={
aj(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.eg.prototype={
gj(a){return this.a.a},
gE(a){return this.a.a===0},
gR(a){return this.a.a!==0},
gD(a){var s=this.a
return new A.eh(s,s.cI(),this.$ti.h("eh<1>"))},
A(a,b){return this.a.L(0,b)}}
A.eh.prototype={
gu(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.b(A.a5(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iac:1}
A.ct.prototype={
gD(a){var s=this,r=new A.cu(s,s.r,A.A(s).h("cu<1>"))
r.c=s.e
return r},
gj(a){return this.a},
gE(a){return this.a===0},
gR(a){return this.a!==0},
A(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.eE(b)},
eE(a){var s=this.d
if(s==null)return!1
return this.aj(s[this.bM(a)],a)>=0},
m(a,b){var s,r,q=this
A.A(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.cF(s==null?q.b=A.nV():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.cF(r==null?q.c=A.nV():r,b)}else return q.ep(0,b)},
ep(a,b){var s,r,q,p=this
A.A(p).c.a(b)
s=p.d
if(s==null)s=p.d=A.nV()
r=p.bM(b)
q=s[r]
if(q==null)s[r]=[p.bK(b)]
else{if(p.aj(q,b)>=0)return!1
q.push(p.bK(b))}return!0},
B(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bg(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bg(s.c,b)
else return s.bW(0,b)},
bW(a,b){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.bM(b)
r=n[s]
q=o.aj(r,b)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.d0(p)
return!0},
cF(a,b){A.A(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.bK(b)
return!0},
bg(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.d0(s)
delete a[b]
return!0},
cG(){this.r=this.r+1&1073741823},
bK(a){var s,r=this,q=new A.hw(A.A(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.cG()
return q},
d0(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.cG()},
bM(a){return J.cC(a)&1073741823},
aj(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.m(a[r].a,b))return r
return-1}}
A.hw.prototype={}
A.cu.prototype={
gu(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.b(A.a5(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iac:1}
A.e3.prototype={
gj(a){return this.a.length},
i(a,b){var s
A.J(b)
s=this.a
if(!(b>=0&&b<s.length))return A.e(s,b)
return s[b]}}
A.lB.prototype={
$2(a,b){this.a.k(0,this.b.a(a),this.c.a(b))},
$S:33}
A.k.prototype={
gD(a){return new A.bA(a,this.gj(a),A.au(a).h("bA<k.E>"))},
v(a,b){return this.i(a,b)},
p(a,b){var s,r
A.au(a).h("~(k.E)").a(b)
s=this.gj(a)
for(r=0;r<s;++r){b.$1(this.i(a,r))
if(s!==this.gj(a))throw A.b(A.a5(a))}},
gE(a){return this.gj(a)===0},
gR(a){return!this.gE(a)},
A(a,b){var s,r=this.gj(a)
for(s=0;s<r;++s){if(J.m(this.i(a,s),b))return!0
if(r!==this.gj(a))throw A.b(A.a5(a))}return!1},
dJ(a,b){return new A.co(a,b.h("co<0>"))},
an(a,b,c){var s=A.au(a)
return new A.a_(a,s.J(c).h("1(k.E)").a(b),s.h("@<k.E>").J(c).h("a_<1,2>"))},
aE(a,b){var s,r,q,p,o=this
if(o.gE(a)){s=J.nE(0,A.au(a).h("k.E"))
return s}r=o.i(a,0)
q=A.dK(o.gj(a),r,!0,A.au(a).h("k.E"))
for(p=1;p<o.gj(a);++p)B.b.k(q,p,o.i(a,p))
return q},
ap(a){return this.aE(a,!0)},
fA(a,b,c,d){var s
A.au(a).h("k.E?").a(d)
A.cR(b,c,this.gj(a))
for(s=b;s<c;++s)this.k(a,s,d)},
bG(a,b,c,d,e){var s,r,q
A.au(a).h("f<k.E>").a(d)
A.cR(b,c,this.gj(a))
s=c-b
if(s===0)return
A.dZ(e,"skipCount")
r=J.C(d)
if(e+s>r.gj(d))throw A.b(A.ah("Too few elements"))
if(e<b)for(q=s-1;q>=0;--q)this.k(a,b+q,r.i(d,e+q))
else for(q=0;q<s;++q)this.k(a,b+q,r.i(d,e+q))},
l(a){return A.nD(a,"[","]")},
$in:1,
$if:1,
$ip:1}
A.D.prototype={
p(a,b){var s,r,q,p=A.au(a)
p.h("~(D.K,D.V)").a(b)
for(s=J.b4(this.gH(a)),p=p.h("D.V");s.q();){r=s.gu(s)
q=this.i(a,r)
b.$2(r,q==null?p.a(q):q)}},
gaz(a){return J.di(this.gH(a),new A.lC(a),A.au(a).h("an<D.K,D.V>"))},
L(a,b){return J.nu(this.gH(a),b)},
gj(a){return J.ae(this.gH(a))},
gE(a){return J.ir(this.gH(a))},
gR(a){return J.nx(this.gH(a))},
l(a){return A.nI(a)},
$iu:1}
A.lC.prototype={
$1(a){var s=this.a,r=A.au(s)
r.h("D.K").a(a)
s=J.l(s,a)
if(s==null)s=r.h("D.V").a(s)
return new A.an(a,s,r.h("an<D.K,D.V>"))},
$S(){return A.au(this.a).h("an<D.K,D.V>(D.K)")}}
A.lD.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.h(a)
r.a=(r.a+=s)+": "
s=A.h(b)
r.a+=s},
$S:32}
A.cY.prototype={}
A.aB.prototype={
k(a,b,c){var s=A.A(this)
s.h("aB.K").a(b)
s.h("aB.V").a(c)
throw A.b(A.N("Cannot modify unmodifiable map"))},
B(a,b){throw A.b(A.N("Cannot modify unmodifiable map"))}}
A.cO.prototype={
i(a,b){return J.l(this.a,b)},
k(a,b,c){var s=A.A(this)
J.bn(this.a,s.c.a(b),s.y[1].a(c))},
L(a,b){return J.nv(this.a,b)},
p(a,b){J.eN(this.a,A.A(this).h("~(1,2)").a(b))},
gE(a){return J.ir(this.a)},
gR(a){return J.nx(this.a)},
gj(a){return J.ae(this.a)},
gH(a){return J.qR(this.a)},
B(a,b){return J.qY(this.a,b)},
l(a){return J.M(this.a)},
gaz(a){return J.qQ(this.a)},
$iu:1}
A.c1.prototype={}
A.as.prototype={
gE(a){return this.gj(this)===0},
gR(a){return this.gj(this)!==0},
S(a,b){var s
for(s=J.b4(A.A(this).h("f<as.E>").a(b));s.q();)this.m(0,s.gu(s))},
bv(a){var s
for(s=0;s<5;++s)this.B(0,a[s])},
an(a,b,c){var s=A.A(this)
return new A.bw(this,s.J(c).h("1(as.E)").a(b),s.h("@<as.E>").J(c).h("bw<1,2>"))},
l(a){return A.nD(this,"{","}")},
Y(a,b){var s,r,q,p,o=this.gD(this)
if(!o.q())return""
s=o.d
r=J.M(s==null?o.$ti.c.a(s):s)
if(!o.q())return r
s=o.$ti.c
if(b.length===0){q=r
do{p=o.d
q+=A.h(p==null?s.a(p):p)}while(o.q())
s=q}else{q=r
do{p=o.d
q=q+b+A.h(p==null?s.a(p):p)}while(o.q())
s=q}return s.charCodeAt(0)==0?s:s},
v(a,b){var s,r,q
A.dZ(b,"index")
s=this.gD(this)
for(r=b;s.q();){if(r===0){q=s.d
return q==null?s.$ti.c.a(q):q}--r}throw A.b(A.a7(b,b-r,this,null,"index"))},
$in:1,
$if:1,
$ib0:1}
A.eq.prototype={}
A.d6.prototype={}
A.hs.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.eR(b):s}},
gj(a){return this.b==null?this.c.a:this.aX().length},
gE(a){return this.gj(0)===0},
gR(a){return this.gj(0)>0},
gH(a){var s
if(this.b==null){s=this.c
return new A.ch(s,A.A(s).h("ch<1>"))}return new A.ht(this)},
k(a,b,c){var s,r,q=this
if(q.b==null)q.c.k(0,b,c)
else if(q.L(0,b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.d3().k(0,b,c)},
L(a,b){if(this.b==null)return this.c.L(0,b)
return Object.prototype.hasOwnProperty.call(this.a,b)},
B(a,b){if(this.b!=null&&!this.L(0,b))return null
return this.d3().B(0,b)},
p(a,b){var s,r,q,p,o=this
t.u.a(b)
if(o.b==null)return o.c.p(0,b)
s=o.aX()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.mX(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.b(A.a5(o))}},
aX(){var s=t.lH.a(this.c)
if(s==null)s=this.c=A.E(Object.keys(this.a),t.s)
return s},
d3(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.ap(t.N,t.z)
r=n.aX()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.k(0,o,n.i(0,o))}if(p===0)B.b.m(r,"")
else B.b.aw(r)
n.a=n.b=null
return n.c=s},
eR(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.mX(this.a[a])
return this.b[a]=s}}
A.ht.prototype={
gj(a){return this.a.gj(0)},
v(a,b){var s=this.a
if(s.b==null)s=s.gH(0).v(0,b)
else{s=s.aX()
if(!(b>=0&&b<s.length))return A.e(s,b)
s=s[b]}return s},
gD(a){var s=this.a
if(s.b==null){s=s.gH(0)
s=s.gD(s)}else{s=s.aX()
s=new J.b7(s,s.length,A.G(s).h("b7<1>"))}return s},
A(a,b){return this.a.L(0,b)}}
A.mO.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:31}
A.mN.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:31}
A.dk.prototype={
ds(a3,a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a1="Invalid base64 encoding length ",a2=a4.length
a6=A.cR(a5,a6,a2)
s=$.ol()
for(r=s.length,q=a5,p=q,o=null,n=-1,m=-1,l=0;q<a6;q=k){k=q+1
if(!(q<a2))return A.e(a4,q)
j=a4.charCodeAt(q)
if(j===37){i=k+2
if(i<=a6){if(!(k<a2))return A.e(a4,k)
h=A.n9(a4.charCodeAt(k))
g=k+1
if(!(g<a2))return A.e(a4,g)
f=A.n9(a4.charCodeAt(g))
e=h*16+f-(f&256)
if(e===37)e=-1
k=i}else e=-1}else e=j
if(0<=e&&e<=127){if(!(e>=0&&e<r))return A.e(s,e)
d=s[e]
if(d>=0){if(!(d<64))return A.e(a0,d)
e=a0.charCodeAt(d)
if(e===j)continue
j=e}else{if(d===-1){if(n<0){g=o==null?null:o.a.length
if(g==null)g=0
n=g+(q-p)
m=q}++l
if(j===61)continue}j=e}if(d!==-2){if(o==null){o=new A.at("")
g=o}else g=o
g.a+=B.a.n(a4,p,q)
c=A.a9(j)
g.a+=c
p=k
continue}}throw A.b(A.a1("Invalid base64 data",a4,q))}if(o!=null){a2=B.a.n(a4,p,a6)
a2=o.a+=a2
r=a2.length
if(n>=0)A.os(a4,m,a6,n,l,r)
else{b=B.c.ar(r-1,4)+1
if(b===1)throw A.b(A.a1(a1,a4,a6))
while(b<4){a2+="="
o.a=a2;++b}}a2=o.a
return B.a.aC(a4,a5,a6,a2.charCodeAt(0)==0?a2:a2)}a=a6-a5
if(n>=0)A.os(a4,m,a6,n,l,a)
else{b=B.c.ar(a,4)
if(b===1)throw A.b(A.a1(a1,a4,a6))
if(b>1)a4=B.a.aC(a4,a6,a6,b===2?"==":"=")}return a4},
dr(a,b){return this.ds(0,b,0,null)}}
A.eW.prototype={}
A.kq.prototype={
b3(a){var s,r,q,p=A.cR(0,null,a.length)
if(0===p)return new Uint8Array(0)
s=new A.ma()
r=s.ft(0,a,0,p)
r.toString
q=s.a
if(q<-1)A.bM(A.a1("Missing padding character",a,p))
if(q>0)A.bM(A.a1("Invalid length, must be multiple of four",a,p))
s.a=-1
return r}}
A.ma.prototype={
ft(a,b,c,d){var s,r=this,q=r.a
if(q<0){r.a=A.pb(b,c,d,q)
return null}if(c===d)return new Uint8Array(0)
s=A.rR(b,c,d,q)
r.a=A.rT(b,c,d,s,0,r.a)
return s}}
A.c9.prototype={}
A.f1.prototype={}
A.fa.prototype={}
A.dE.prototype={
l(a){var s=A.bx(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.fn.prototype={
l(a){return"Cyclic error in JSON stringify"}}
A.fm.prototype={
K(a,b){var s=A.ua(b,this.gfv().a)
return s},
T(a){var s=A.t_(a,this.gfw().b,null)
return s},
gfw(){return B.ae},
gfv(){return B.ad}}
A.lz.prototype={}
A.ly.prototype={}
A.mx.prototype={
dL(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.a.n(a,r,q)
r=q+1
o=A.a9(92)
s.a+=o
o=A.a9(117)
s.a+=o
o=A.a9(100)
s.a+=o
o=p>>>8&15
o=A.a9(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.a9(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.a9(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.a.n(a,r,q)
r=q+1
o=A.a9(92)
s.a+=o
switch(p){case 8:o=A.a9(98)
s.a+=o
break
case 9:o=A.a9(116)
s.a+=o
break
case 10:o=A.a9(110)
s.a+=o
break
case 12:o=A.a9(102)
s.a+=o
break
case 13:o=A.a9(114)
s.a+=o
break
default:o=A.a9(117)
s.a+=o
o=A.a9(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.a9(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.a9(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.a.n(a,r,q)
r=q+1
o=A.a9(92)
s.a+=o
o=A.a9(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.a.n(a,r,m)},
bJ(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.b(new A.fn(a,null))}B.b.m(s,a)},
bD(a){var s,r,q,p,o=this
if(o.dK(a))return
o.bJ(a)
try{s=o.b.$1(a)
if(!o.dK(s)){q=A.oI(a,null,o.gcQ())
throw A.b(q)}q=o.a
if(0>=q.length)return A.e(q,-1)
q.pop()}catch(p){r=A.am(p)
q=A.oI(a,r,o.gcQ())
throw A.b(q)}},
dK(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.e.l(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.dL(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.bJ(a)
q.h7(a)
s=q.a
if(0>=s.length)return A.e(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.bJ(a)
r=q.h8(a)
s=q.a
if(0>=s.length)return A.e(s,-1)
s.pop()
return r}else return!1},
h7(a){var s,r,q=this.c
q.a+="["
s=J.C(a)
if(s.gR(a)){this.bD(s.i(a,0))
for(r=1;r<s.gj(a);++r){q.a+=","
this.bD(s.i(a,r))}}q.a+="]"},
h8(a){var s,r,q,p,o,n=this,m={},l=J.C(a)
if(l.gE(a)){n.c.a+="{}"
return!0}s=l.gj(a)*2
r=A.dK(s,null,!1,t.X)
q=m.a=0
m.b=!0
l.p(a,new A.my(m,r))
if(!m.b)return!1
l=n.c
l.a+="{"
for(p='"';q<s;q+=2,p=',"'){l.a+=p
n.dL(A.w(r[q]))
l.a+='":'
o=q+1
if(!(o<s))return A.e(r,o)
n.bD(r[o])}l.a+="}"
return!0}}
A.my.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.b.k(s,r.a++,a)
B.b.k(s,r.a++,b)},
$S:32}
A.mw.prototype={
gcQ(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.h2.prototype={
K(a,b){t.L.a(b)
return B.aA.b3(b)}}
A.m4.prototype={
b3(a){return new A.mM(this.a).eG(t.L.a(a),0,null,!0)}}
A.mM.prototype={
eG(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(a)
s=A.cR(b,c,J.ae(a))
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.tw(a,b,s)
s-=b
p=b
b=0}if(s-b>=15){o=l.a
n=A.tv(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.bN(q,b,s,!0)
o=l.b
if((o&1)!==0){m=A.tx(o)
l.b=0
throw A.b(A.a1(m,a,p+l.c))}return n},
bN(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.c.af(b+c,2)
r=q.bN(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.bN(a,s,c,d)}return q.fu(a,b,c,d)},
fu(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.at(""),d=b+1,c=a.length
if(!(b>=0&&b<c))return A.e(a,b)
s=a[b]
A:for(r=k.a;;){for(;;d=o){if(!(s>=0&&s<256))return A.e(j,s)
q=j.charCodeAt(s)&31
f=g<=32?s&61694>>>q:(s&63|f<<6)>>>0
p=g+q
if(!(p>=0&&p<144))return A.e(i,p)
g=i.charCodeAt(p)
if(g===0){p=A.a9(f)
e.a+=p
if(d===a0)break A
break}else if((g&1)!==0){if(r)switch(g){case 69:case 67:p=A.a9(h)
e.a+=p
break
case 65:p=A.a9(h)
e.a+=p;--d
break
default:p=A.a9(h)
e.a=(e.a+=p)+p
break}else{k.b=g
k.c=d-1
return""}g=0}if(d===a0)break A
o=d+1
if(!(d>=0&&d<c))return A.e(a,d)
s=a[d]}o=d+1
if(!(d>=0&&d<c))return A.e(a,d)
s=a[d]
if(s<128){for(;;){if(!(o<a0)){n=a0
break}m=o+1
if(!(o>=0&&o<c))return A.e(a,o)
s=a[o]
if(s>=128){n=m-1
o=m
break}o=m}if(n-d<20)for(l=d;l<n;++l){if(!(l<c))return A.e(a,l)
p=A.a9(a[l])
e.a+=p}else{p=A.p1(a,d,n)
e.a+=p}if(n===a0)break A
d=o}else d=o}if(a1&&g>32)if(r){c=A.a9(h)
e.a+=c}else{k.b=77
k.c=a0
return""}k.b=g
k.c=f
c=e.a
return c.charCodeAt(0)==0?c:c}}
A.lG.prototype={
$2(a,b){var s,r,q
t.bR.a(a)
s=this.b
r=this.a
q=(s.a+=r.a)+a.a
s.a=q
s.a=q+": "
q=A.bx(b)
s.a+=q
r.a=", "},
$S:63}
A.li.prototype={
$0(){var s=this
return A.bM(A.b6("("+s.a+", "+s.b+", "+s.c+", "+s.d+", "+s.e+", "+s.f+", "+s.r+", "+s.w+")",null))},
$S:64}
A.ab.prototype={
Z(a,b){if(b==null)return!1
return b instanceof A.ab&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gG(a){return A.nJ(this.a,this.b,B.o,B.o)},
a2(a,b){var s
t.cs.a(b)
s=B.c.a2(this.a,b.a)
if(s!==0)return s
return B.c.a2(this.b,b.b)},
bz(){var s=this
if(s.c)return new A.ab(s.a,s.b,!1)
return s},
a5(){var s=this
if(s.c)return s
return new A.ab(s.a,s.b,!0)},
l(a){var s=this,r=A.oA(A.bC(s)),q=A.bv(A.cl(s)),p=A.bv(A.dV(s)),o=A.bv(A.bX(s)),n=A.bv(A.cP(s)),m=A.bv(A.oV(s)),l=A.lj(A.oU(s)),k=s.b,j=k===0?"":A.lj(k)
k=r+"-"+q
if(s.c)return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j},
a0(){var s=this,r=A.bC(s)>=-9999&&A.bC(s)<=9999?A.oA(A.bC(s)):A.rd(A.bC(s)),q=A.bv(A.cl(s)),p=A.bv(A.dV(s)),o=A.bv(A.bX(s)),n=A.bv(A.cP(s)),m=A.bv(A.oV(s)),l=A.lj(A.oU(s)),k=s.b,j=k===0?"":A.lj(k)
k=r+"-"+q
if(s.c)return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j}}
A.lk.prototype={
$1(a){if(a==null)return 0
return A.eL(a)},
$S:36}
A.ll.prototype={
$1(a){var s,r,q
if(a==null)return 0
for(s=a.length,r=0,q=0;q<6;++q){r*=10
if(q<s){if(!(q<s))return A.e(a,q)
r+=a.charCodeAt(q)^48}}return r},
$S:36}
A.b9.prototype={
aF(a,b){return new A.b9(B.c.aD(this.a*b))},
b9(a,b){return B.c.b9(this.a,t.jS.a(b).ghb())},
Z(a,b){if(b==null)return!1
return b instanceof A.b9&&this.a===b.a},
gG(a){return B.c.gG(this.a)},
l(a){var s,r,q,p,o,n=this.a,m=B.c.af(n,36e8),l=n%36e8
if(n<0){m=0-m
n=0-l
s="-"}else{n=l
s=""}r=B.c.af(n,6e7)
n%=6e7
q=r<10?"0":""
p=B.c.af(n,1e6)
o=p<10?"0":""
return s+m+":"+q+r+":"+o+p+"."+B.a.a_(B.c.l(n%1e6),6,"0")}}
A.Z.prototype={
gaS(){return A.rB(this)}}
A.eQ.prototype={
l(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.bx(s)
return"Assertion failed"}}
A.bD.prototype={}
A.b5.prototype={
gbP(){return"Invalid argument"+(!this.a?"(s)":"")},
gbO(){return""},
l(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.h(p),n=s.gbP()+q+o
if(!s.a)return n
return n+s.gbO()+": "+A.bx(s.gca())},
gca(){return this.b}}
A.cQ.prototype={
gca(){return A.mS(this.b)},
gbP(){return"RangeError"},
gbO(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.h(q):""
else if(q==null)s=": Not greater than or equal to "+A.h(r)
else if(q>r)s=": Not in inclusive range "+A.h(r)+".."+A.h(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.h(r)
return s}}
A.fe.prototype={
gca(){return A.J(this.b)},
gbP(){return"RangeError"},
gbO(){if(A.J(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gj(a){return this.f}}
A.fB.prototype={
l(a){var s,r,q,p,o,n,m,l,k=this,j={},i=new A.at("")
j.a=""
s=k.c
for(r=s.length,q=0,p="",o="";q<r;++q,o=", "){n=s[q]
i.a=p+o
p=A.bx(n)
p=i.a+=p
j.a=", "}k.d.p(0,new A.lG(j,i))
m=A.bx(k.a)
l=i.l(0)
return"NoSuchMethodError: method not found: '"+k.b.a+"'\nReceiver: "+m+"\nArguments: ["+l+"]"}}
A.e4.prototype={
l(a){return"Unsupported operation: "+this.a}}
A.fY.prototype={
l(a){var s=this.a
return s!=null?"UnimplementedError: "+s:"UnimplementedError"}}
A.bq.prototype={
l(a){return"Bad state: "+this.a}}
A.f0.prototype={
l(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.bx(s)+"."}}
A.fE.prototype={
l(a){return"Out of Memory"},
gaS(){return null},
$iZ:1}
A.e_.prototype={
l(a){return"Stack Overflow"},
gaS(){return null},
$iZ:1}
A.mf.prototype={
l(a){return"Exception: "+this.a}}
A.ba.prototype={
l(a){var s,r,q,p,o,n,m,l,k,j,i,h=this.a,g=""!==h?"FormatException: "+h:"FormatException",f=this.c,e=this.b
if(typeof e=="string"){if(f!=null)s=f<0||f>e.length
else s=!1
if(s)f=null
if(f==null){if(e.length>78)e=B.a.n(e,0,75)+"..."
return g+"\n"+e}for(r=e.length,q=1,p=0,o=!1,n=0;n<f;++n){if(!(n<r))return A.e(e,n)
m=e.charCodeAt(n)
if(m===10){if(p!==n||!o)++q
p=n+1
o=!1}else if(m===13){++q
p=n+1
o=!0}}g=q>1?g+(" (at line "+q+", character "+(f-p+1)+")\n"):g+(" (at character "+(f+1)+")\n")
for(n=f;n<r;++n){if(!(n>=0))return A.e(e,n)
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
k=""}return g+l+B.a.n(e,i,j)+k+"\n"+B.a.aF(" ",f-i+l.length)+"^\n"}else return f!=null?g+(" (at offset "+A.h(f)+")"):g}}
A.f.prototype={
an(a,b,c){var s=A.A(this)
return A.rr(this,s.J(c).h("1(f.E)").a(b),s.h("f.E"),c)},
bC(a,b){var s=A.A(this)
return new A.I(this,s.h("H(f.E)").a(b),s.h("I<f.E>"))},
A(a,b){var s
for(s=this.gD(this);s.q();)if(J.m(s.gu(s),b))return!0
return!1},
a9(a,b){var s
A.A(this).h("H(f.E)").a(b)
for(s=this.gD(this);s.q();)if(b.$1(s.gu(s)))return!0
return!1},
aE(a,b){var s=A.a8(this,A.A(this).h("f.E"))
return s},
ap(a){return this.aE(0,!0)},
gj(a){var s,r=this.gD(this)
for(s=0;r.q();)++s
return s},
gE(a){return!this.gD(this).q()},
gR(a){return!this.gE(this)},
gaG(a){var s,r=this.gD(this)
if(!r.q())throw A.b(A.ff())
s=r.gu(r)
if(r.q())throw A.b(A.rk())
return s},
v(a,b){var s,r
A.dZ(b,"index")
s=this.gD(this)
for(r=b;s.q();){if(r===0)return s.gu(s);--r}throw A.b(A.a7(b,b-r,this,null,"index"))},
l(a){return A.rl(this,"(",")")}}
A.an.prototype={
l(a){return"MapEntry("+A.h(this.a)+": "+A.h(this.b)+")"}}
A.a4.prototype={
gG(a){return A.F.prototype.gG.call(this,0)},
l(a){return"null"}}
A.F.prototype={$iF:1,
Z(a,b){return this===b},
gG(a){return A.dW(this)},
l(a){return"Instance of '"+A.dX(this)+"'"},
dq(a,b){throw A.b(A.oQ(this,t.bg.a(b)))},
gU(a){return A.uB(this)},
toString(){return this.l(this)}}
A.hU.prototype={
l(a){return""},
$ibf:1}
A.at.prototype={
gj(a){return this.a.length},
l(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$irH:1}
A.m3.prototype={
$2(a,b){var s,r,q,p
t.k.a(a)
A.w(b)
s=B.a.di(b,"=")
if(s===-1){if(b!=="")J.bn(a,A.o1(b,0,b.length,this.a,!0),"")}else if(s!==0){r=B.a.n(b,0,s)
q=B.a.X(b,s+1)
p=this.a
J.bn(a,A.o1(r,0,r.length,p,!0),A.o1(q,0,q.length,p,!0))}return a},
$S:66}
A.m2.prototype={
$2(a,b){throw A.b(A.a1("Illegal IPv6 address, "+a,this.a,b))},
$S:70}
A.eC.prototype={
gcW(){var s,r,q,p,o=this,n=o.w
if(n===$){s=o.a
r=s.length!==0?s+":":""
q=o.c
p=q==null
if(!p||s==="file"){s=r+"//"
r=o.b
if(r.length!==0)s=s+r+"@"
if(!p)s+=q
r=o.d
if(r!=null)s=s+":"+A.h(r)}else s=r
s+=o.e
r=o.f
if(r!=null)s=s+"?"+r
r=o.r
if(r!=null)s=s+"#"+r
n=o.w=s.charCodeAt(0)==0?s:s}return n},
gG(a){var s,r=this,q=r.y
if(q===$){s=B.a.gG(r.gcW())
r.y!==$&&A.qe()
r.y=s
q=s}return q},
gaB(){var s,r=this,q=r.z
if(q===$){s=r.f
s=A.p9(s==null?"":s)
r.z!==$&&A.qe()
q=r.z=new A.c1(s,t.ph)}return q},
gck(){return this.b},
gbq(a){var s=this.c
if(s==null)return""
if(B.a.N(s,"[")&&!B.a.P(s,"v",1))return B.a.n(s,1,s.length-1)
return s},
gb5(a){var s=this.d
return s==null?A.pt(this.a):s},
gaM(a){var s=this.f
return s==null?"":s},
gbn(){var s=this.r
return s==null?"":s},
fJ(a){var s=this.a
if(a.length!==s.length)return!1
return A.tG(a,s,0)>=0},
dw(a,b){var s,r,q,p,o,n,m,l=this
b=A.o_(b,0,b.length)
s=b==="file"
r=l.b
q=l.d
if(b!==l.a)q=A.nZ(q,b)
p=l.c
if(!(p!=null))p=r.length!==0||q!=null||s?"":null
o=l.e
if(!s)n=p!=null&&o.length!==0
else n=!0
if(n&&!B.a.N(o,"/"))o="/"+o
m=o
return A.i4(b,r,p,q,m,l.f,l.r)},
cN(a,b){var s,r,q,p,o,n,m,l,k
for(s=0,r=0;B.a.P(b,"../",r);){r+=3;++s}q=B.a.fL(a,"/")
p=a.length
for(;;){if(!(q>0&&s>0))break
o=B.a.dm(a,"/",q-1)
if(o<0)break
n=q-o
m=n!==2
l=!1
if(!m||n===3){k=o+1
if(!(k<p))return A.e(a,k)
if(a.charCodeAt(k)===46)if(m){m=o+2
if(!(m<p))return A.e(a,m)
m=a.charCodeAt(m)===46}else m=!0
else m=l}else m=l
if(m)break;--s
q=o}return B.a.aC(a,q+1,null,B.a.X(b,r-3*s))},
dA(a){return this.b7(A.cn(a))},
b7(a){var s,r,q,p,o,n,m,l,k,j,i,h=this
if(a.gaR().length!==0)return a
else{s=h.a
if(a.gc5()){r=a.dw(0,s)
return r}else{q=h.b
p=h.c
o=h.d
n=h.e
if(a.gdh())m=a.gbp()?a.gaM(a):h.f
else{l=A.tu(h,n)
if(l>0){k=B.a.n(n,0,l)
n=a.gc4()?k+A.d8(a.gae(a)):k+A.d8(h.cN(B.a.X(n,k.length),a.gae(a)))}else if(a.gc4())n=A.d8(a.gae(a))
else if(n.length===0)if(p==null)n=s.length===0?a.gae(a):A.d8(a.gae(a))
else n=A.d8("/"+a.gae(a))
else{j=h.cN(n,a.gae(a))
r=s.length===0
if(!r||p!=null||B.a.N(n,"/"))n=A.d8(j)
else n=A.py(j,!r||p!=null)}m=a.gbp()?a.gaM(a):null}}}i=a.gc7()?a.gbn():null
return A.i4(s,q,p,o,n,m,i)},
gc5(){return this.c!=null},
gbp(){return this.f!=null},
gc7(){return this.r!=null},
gdh(){return this.e.length===0},
gc4(){return B.a.N(this.e,"/")},
gcd(a){var s,r,q=this,p=q.a
if(p==="")throw A.b(A.ah("Cannot use origin without a scheme: "+q.l(0)))
if(p!=="http"&&p!=="https")throw A.b(A.ah("Origin is only applicable schemes http and https: "+q.l(0)))
s=q.c
if(s==null||s==="")throw A.b(A.ah("A "+p+u.p+q.l(0)))
r=q.d
if(r==null)return p+"://"+s
return p+"://"+s+":"+A.h(r)},
l(a){return this.gcW()},
Z(a,b){var s,r,q,p=this
if(b==null)return!1
if(p===b)return!0
s=!1
if(t.jJ.b(b))if(p.a===b.gaR())if(p.c!=null===b.gc5())if(p.b===b.gck())if(p.gbq(0)===b.gbq(b))if(p.gb5(0)===b.gb5(b))if(p.e===b.gae(b)){r=p.f
q=r==null
if(!q===b.gbp()){if(q)r=""
if(r===b.gaM(b)){r=p.r
q=r==null
if(!q===b.gc7()){s=q?"":r
s=s===b.gbn()}}}}return s},
$ih_:1,
gaR(){return this.a},
gae(a){return this.e}}
A.m1.prototype={
gdI(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.e(m,0)
s=o.a
m=m[0]+1
r=B.a.br(s,"?",m)
q=s.length
if(r>=0){p=A.eD(s,r+1,q,256,!1,!1)
q=r}else p=n
m=o.c=new A.he("data","",n,n,A.eD(s,m,q,128,!1,!1),p,n)}return m},
l(a){var s,r=this.b
if(0>=r.length)return A.e(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.b1.prototype={
gc5(){return this.c>0},
gc8(){return this.c>0&&this.d+1<this.e},
gbp(){return this.f<this.r},
gc7(){return this.r<this.a.length},
gc4(){return B.a.P(this.a,"/",this.e)},
gdh(){return this.e===this.f},
gaR(){var s=this.w
return s==null?this.w=this.eD():s},
eD(){var s,r=this,q=r.b
if(q<=0)return""
s=q===4
if(s&&B.a.N(r.a,"http"))return"http"
if(q===5&&B.a.N(r.a,"https"))return"https"
if(s&&B.a.N(r.a,"file"))return"file"
if(q===7&&B.a.N(r.a,"package"))return"package"
return B.a.n(r.a,0,q)},
gck(){var s=this.c,r=this.b+3
return s>r?B.a.n(this.a,r,s-1):""},
gbq(a){var s=this.c
return s>0?B.a.n(this.a,s,this.d):""},
gb5(a){var s,r=this
if(r.gc8())return A.eL(B.a.n(r.a,r.d+1,r.e))
s=r.b
if(s===4&&B.a.N(r.a,"http"))return 80
if(s===5&&B.a.N(r.a,"https"))return 443
return 0},
gae(a){return B.a.n(this.a,this.e,this.f)},
gaM(a){var s=this.f,r=this.r
return s<r?B.a.n(this.a,s+1,r):""},
gbn(){var s=this.r,r=this.a
return s<r.length?B.a.X(r,s+1):""},
gcd(a){var s,r,q=this,p=q.b,o=p===4&&B.a.N(q.a,"http")
if(p<0)throw A.b(A.ah("Cannot use origin without a scheme: "+q.l(0)))
if(!o)s=!(p===5&&B.a.N(q.a,"https"))
else s=!1
if(s)throw A.b(A.ah("Origin is only applicable to schemes http and https: "+q.l(0)))
s=q.c
if(s===q.d)throw A.b(A.ah("A "+q.gaR()+u.p+q.l(0)))
p+=3
if(s===p)return B.a.n(q.a,0,q.e)
r=q.a
return B.a.n(r,0,p)+B.a.n(r,s,q.e)},
gaB(){if(this.f>=this.r)return B.aj
return new A.c1(A.p9(this.gaM(0)),t.ph)},
cL(a){var s=this.d+1
return s+a.length===this.e&&B.a.P(this.a,a,s)},
fZ(){var s=this,r=s.r,q=s.a
if(r>=q.length)return s
return new A.b1(B.a.n(q,0,r),s.b,s.c,s.d,s.e,s.f,r,s.w)},
dw(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=null
b=A.o_(b,0,b.length)
s=!(h.b===b.length&&B.a.N(h.a,b))
r=b==="file"
q=h.c
p=q>0?B.a.n(h.a,h.b+3,q):""
o=h.gc8()?h.gb5(0):g
if(s)o=A.nZ(o,b)
q=h.c
if(q>0)n=B.a.n(h.a,q,h.d)
else n=p.length!==0||o!=null||r?"":g
q=h.a
m=h.f
l=B.a.n(q,h.e,m)
if(!r)k=n!=null&&l.length!==0
else k=!0
if(k&&!B.a.N(l,"/"))l="/"+l
k=h.r
j=m<k?B.a.n(q,m+1,k):g
m=h.r
i=m<q.length?B.a.X(q,m+1):g
return A.i4(b,p,n,o,l,j,i)},
dA(a){return this.b7(A.cn(a))},
b7(a){if(a instanceof A.b1)return this.f6(this,a)
return this.cZ().b7(a)},
f6(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=b.b
if(c>0)return b
s=b.c
if(s>0){r=a.b
if(r<=0)return b
q=r===4
if(q&&B.a.N(a.a,"file"))p=b.e!==b.f
else if(q&&B.a.N(a.a,"http"))p=!b.cL("80")
else p=!(r===5&&B.a.N(a.a,"https"))||!b.cL("443")
if(p){o=r+1
return new A.b1(B.a.n(a.a,0,o)+B.a.X(b.a,c+1),r,s+o,b.d+o,b.e+o,b.f+o,b.r+o,a.w)}else return this.cZ().b7(b)}n=b.e
c=b.f
if(n===c){s=b.r
if(c<s){r=a.f
o=r-c
return new A.b1(B.a.n(a.a,0,r)+B.a.X(b.a,c),a.b,a.c,a.d,a.e,c+o,s+o,a.w)}c=b.a
if(s<c.length){r=a.r
return new A.b1(B.a.n(a.a,0,r)+B.a.X(c,s),a.b,a.c,a.d,a.e,a.f,s+(r-s),a.w)}return a.fZ()}s=b.a
if(B.a.P(s,"/",n)){m=a.e
l=A.pl(this)
k=l>0?l:m
o=k-n
return new A.b1(B.a.n(a.a,0,k)+B.a.X(s,n),a.b,a.c,a.d,m,c+o,b.r+o,a.w)}j=a.e
i=a.f
if(j===i&&a.c>0){while(B.a.P(s,"../",n))n+=3
o=j-n+1
return new A.b1(B.a.n(a.a,0,j)+"/"+B.a.X(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)}h=a.a
l=A.pl(this)
if(l>=0)g=l
else for(g=j;B.a.P(h,"../",g);)g+=3
f=0
for(;;){e=n+3
if(!(e<=c&&B.a.P(s,"../",n)))break;++f
n=e}for(r=h.length,d="";i>g;){--i
if(!(i>=0&&i<r))return A.e(h,i)
if(h.charCodeAt(i)===47){if(f===0){d="/"
break}--f
d="/"}}if(i===g&&a.b<=0&&!B.a.P(h,"/",j)){n-=f*3
d=""}o=i-n+d.length
return new A.b1(B.a.n(h,0,i)+d+B.a.X(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)},
gG(a){var s=this.x
return s==null?this.x=B.a.gG(this.a):s},
Z(a,b){if(b==null)return!1
if(this===b)return!0
return t.jJ.b(b)&&this.a===b.l(0)},
cZ(){var s=this,r=null,q=s.gaR(),p=s.gck(),o=s.c>0?s.gbq(0):r,n=s.gc8()?s.gb5(0):r,m=s.a,l=s.f,k=B.a.n(m,s.e,l),j=s.r
l=l<j?s.gaM(0):r
return A.i4(q,p,o,n,k,l,j<m.length?s.gbn():r)},
l(a){return this.a},
$ih_:1}
A.he.prototype={}
A.q.prototype={$iq:1}
A.eO.prototype={
gj(a){return a.length}}
A.cD.prototype={
sfE(a,b){a.href=b},
l(a){var s=String(a)
s.toString
return s},
$icD:1}
A.eP.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.cE.prototype={$icE:1}
A.bO.prototype={$ibO:1}
A.c8.prototype={$ic8:1}
A.bP.prototype={$ibP:1}
A.bo.prototype={
gj(a){return a.length}}
A.f3.prototype={
gj(a){return a.length}}
A.X.prototype={$iX:1}
A.ca.prototype={
cB(a,b){var s=$.qh(),r=s[b]
if(typeof r=="string")return r
r=this.f9(a,b)
s[b]=r
return r},
f9(a,b){var s,r=b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()})
r.toString
r=r in a
r.toString
if(r)return b
s=$.qk()+b
r=s in a
r.toString
if(r)return s
return b},
cS(a,b,c,d){a.setProperty(b,c,d)},
gj(a){var s=a.length
s.toString
return s}}
A.ku.prototype={}
A.aC.prototype={}
A.b8.prototype={}
A.f4.prototype={
gj(a){return a.length}}
A.f5.prototype={
gj(a){return a.length}}
A.f6.prototype={
gj(a){return a.length},
i(a,b){var s=a[A.J(b)]
s.toString
return s}}
A.dp.prototype={}
A.cb.prototype={}
A.f7.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.dq.prototype={
fs(a,b){var s=a.createHTMLDocument(b)
s.toString
return s}}
A.dr.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.mx.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.ds.prototype={
l(a){var s,r=a.left
r.toString
s=a.top
s.toString
return"Rectangle ("+A.h(r)+", "+A.h(s)+") "+A.h(this.gaP(a))+" x "+A.h(this.gaL(a))},
Z(a,b){var s,r,q
if(b==null)return!1
s=!1
if(t.ku.b(b)){r=a.left
r.toString
q=b.left
q.toString
if(r===q){r=a.top
r.toString
q=b.top
q.toString
if(r===q){s=J.K(b)
s=this.gaP(a)===s.gaP(b)&&this.gaL(a)===s.gaL(b)}}}return s},
gG(a){var s,r=a.left
r.toString
s=a.top
s.toString
return A.nJ(r,s,this.gaP(a),this.gaL(a))},
gcK(a){return a.height},
gaL(a){var s=this.gcK(a)
s.toString
return s},
gd4(a){return a.width},
gaP(a){var s=this.gd4(a)
s.toString
return s},
$ibd:1}
A.f8.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){A.w(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.f9.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.h8.prototype={
A(a,b){return J.nu(this.b,b)},
gE(a){return this.a.firstElementChild==null},
gj(a){return this.b.length},
i(a,b){var s
A.J(b)
s=this.b
if(!(b>=0&&b<s.length))return A.e(s,b)
return t.h.a(s[b])},
k(a,b,c){var s
t.h.a(c)
s=this.b
if(!(b>=0&&b<s.length))return A.e(s,b)
this.a.replaceChild(c,s[b]).toString},
gD(a){var s=this.ap(this)
return new J.b7(s,s.length,A.G(s).h("b7<1>"))},
aw(a){J.ip(this.a)}}
A.bj.prototype={
gj(a){return this.a.length},
i(a,b){var s
A.J(b)
s=this.a
if(!(b>=0&&b<s.length))return A.e(s,b)
return this.$ti.c.a(s[b])},
k(a,b,c){this.$ti.c.a(c)
throw A.b(A.N("Cannot modify list"))}}
A.B.prototype={
gfk(a){return new A.ed(a)},
gda(a){var s=a.children
s.toString
return new A.h8(a,s)},
gal(a){return new A.hj(a)},
l(a){var s=a.localName
s.toString
return s},
a3(a,b,c,d){var s,r,q,p
if(c==null){s=$.oC
if(s==null){s=A.E([],t.lN)
r=new A.dS(s)
B.b.m(s,A.pf(null))
B.b.m(s,A.po())
$.oC=r
d=r}else d=s
s=$.oB
if(s==null){d.toString
s=new A.eE(d)
$.oB=s
c=s}else{d.toString
s.a=d
c=s}}if($.bR==null){s=document
r=s.implementation
r.toString
r=B.a2.fs(r,"")
$.bR=r
r=r.createRange()
r.toString
$.nA=r
r=$.bR.createElement("base")
t.az.a(r)
s=s.baseURI
s.toString
r.href=s
$.bR.head.appendChild(r).toString}s=$.bR
if(s.body==null){r=s.createElement("body")
B.E.sfm(s,t.hp.a(r))}s=$.bR
if(t.hp.b(a)){s=s.body
s.toString
q=s}else{s.toString
r=a.tagName
r.toString
q=s.createElement(r)
$.bR.body.appendChild(q).toString}s="createContextualFragment" in window.Range.prototype
s.toString
if(s){s=a.tagName
s.toString
s=!B.b.A(B.ag,s)}else s=!1
if(s){$.nA.selectNodeContents(q)
s=$.nA
s=s.createContextualFragment(b)
s.toString
p=s}else{J.r0(q,b)
s=$.bR.createDocumentFragment()
s.toString
while(r=q.firstChild,r!=null)s.appendChild(r).toString
p=s}if(q!==$.bR.body)J.is(q)
c.co(p)
document.adoptNode(p).toString
return p},
fq(a,b,c){return this.a3(a,b,c,null)},
sO(a,b){this.bF(a,b)},
bF(a,b){this.sV(a,null)
a.appendChild(this.a3(a,b,null,null)).toString},
seL(a,b){a.innerHTML=b},
eS(a,b){var s=a.querySelectorAll(b)
s.toString
return s},
gaA(a){return new A.cp(a,"click",!1,t.C)},
$iB:1}
A.ln.prototype={
$1(a){return t.h.b(t.F.a(a))},
$S:37}
A.o.prototype={
eJ(a,b,c,d){return a.initEvent(b,!0,!0)},
$io:1}
A.du.prototype={$idu:1}
A.d.prototype={
bj(a,b,c,d){t.o.a(c)
if(c!=null)this.es(a,b,c,d)},
c_(a,b,c){return this.bj(a,b,c,null)},
es(a,b,c,d){return a.addEventListener(b,A.bt(t.o.a(c),1),d)},
eU(a,b,c,d){return a.removeEventListener(b,A.bt(t.o.a(c),1),!1)},
$id:1}
A.aI.prototype={$iaI:1}
A.dw.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.et.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
gab(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.ah("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.dx.prototype={
gh2(a){var s=a.result
if(t.lo.b(s))return A.oP(s,0,null)
return s},
fW(a,b){return a.readAsDataURL(b)}}
A.fb.prototype={
gj(a){return a.length}}
A.cH.prototype={
gj(a){return a.length},
$icH:1}
A.aJ.prototype={$iaJ:1}
A.dy.prototype={}
A.fd.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.bS.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.F.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1,
$ibS:1}
A.dz.prototype={
sfm(a,b){a.body=b}}
A.by.prototype={
fS(a,b,c){return a.open(b,c)},
e2(a,b){return a.send(b)},
cq(a,b,c){return a.setRequestHeader(A.w(b),A.w(c))},
$iby:1}
A.ce.prototype={}
A.cI.prototype={$icI:1}
A.dA.prototype={
sff(a,b){a.alt=b},
scv(a,b){a.src=b}}
A.bT.prototype={
sd9(a,b){a.checked=b},
scj(a,b){a.type=b},
sI(a,b){a.value=b},
$ibT:1,
$iox:1,
$icG:1}
A.cN.prototype={
l(a){var s=String(a)
s.toString
return s},
$icN:1}
A.fp.prototype={
gj(a){return a.length}}
A.fq.prototype={
bj(a,b,c,d){t.o.a(c)
if(b==="message")a.start()
this.e7(a,b,c,!1)}}
A.fr.prototype={
L(a,b){return A.b3(a.get(b))!=null},
i(a,b){return A.b3(a.get(A.w(b)))},
p(a,b){var s,r,q
t.u.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.b3(r.value[1]))}},
gH(a){var s=A.E([],t.s)
this.p(a,new A.lE(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gE(a){var s=a.size
s.toString
return s===0},
gR(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.N("Not supported"))},
B(a,b){throw A.b(A.N("Not supported"))},
$iu:1}
A.lE.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.fs.prototype={
L(a,b){return A.b3(a.get(b))!=null},
i(a,b){return A.b3(a.get(A.w(b)))},
p(a,b){var s,r,q
t.u.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.b3(r.value[1]))}},
gH(a){var s=A.E([],t.s)
this.p(a,new A.lF(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gE(a){var s=a.size
s.toString
return s===0},
gR(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.N("Not supported"))},
B(a,b){throw A.b(A.N("Not supported"))},
$iu:1}
A.lF.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.aL.prototype={$iaL:1}
A.ft.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.ib.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.ax.prototype={$iax:1}
A.aA.prototype={
gaG(a){var s=this.a,r=s.childNodes.length
if(r===0)throw A.b(A.ah("No elements"))
if(r>1)throw A.b(A.ah("More than one element"))
s=s.firstChild
s.toString
return s},
S(a,b){var s,r,q,p,o
t.hl.a(b)
s=b.a
r=this.a
if(s!==r)for(q=s.childNodes.length,p=0;p<q;++p){o=s.firstChild
o.toString
r.appendChild(o).toString}return},
k(a,b,c){var s,r
t.F.a(c)
s=this.a
r=s.childNodes
if(!(b>=0&&b<r.length))return A.e(r,b)
s.replaceChild(c,r[b]).toString},
gD(a){var s=this.a.childNodes
return new A.cc(s,s.length,A.au(s).h("cc<x.E>"))},
gj(a){return this.a.childNodes.length},
i(a,b){var s
A.J(b)
s=this.a.childNodes
if(!(b>=0&&b<s.length))return A.e(s,b)
return s[b]}}
A.t.prototype={
dt(a){var s=a.parentNode
if(s!=null)s.removeChild(a).toString},
dz(a,b){var s,r,q
try{r=a.parentNode
r.toString
s=r
J.qK(s,b,a)}catch(q){}return a},
ez(a){var s
while(s=a.firstChild,s!=null)a.removeChild(s).toString},
l(a){var s=a.nodeValue
return s==null?this.e8(a):s},
sV(a,b){a.textContent=b},
fj(a,b){var s=a.appendChild(b)
s.toString
return s},
fo(a,b){var s=a.cloneNode(!0)
s.toString
return s},
A(a,b){var s=a.contains(b)
s.toString
return s},
eX(a,b,c){var s=a.replaceChild(b,c)
s.toString
return s},
$it:1}
A.dR.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.F.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.lJ.prototype={
$1(a){this.a.aK(0,A.w(a))},
$S:21}
A.bB.prototype={$ibB:1}
A.dU.prototype={}
A.aM.prototype={
gj(a){return a.length},
$iaM:1}
A.fG.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.d8.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.b_.prototype={$ib_:1}
A.fI.prototype={
L(a,b){return A.b3(a.get(b))!=null},
i(a,b){return A.b3(a.get(A.w(b)))},
p(a,b){var s,r,q
t.u.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.b3(r.value[1]))}},
gH(a){var s=A.E([],t.s)
this.p(a,new A.lO(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gE(a){var s=a.size
s.toString
return s===0},
gR(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.N("Not supported"))},
B(a,b){throw A.b(A.N("Not supported"))},
$iu:1}
A.lO.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.bY.prototype={
gj(a){return a.length},
sI(a,b){a.value=b},
$ibY:1}
A.aO.prototype={$iaO:1}
A.fK.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.ls.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.aP.prototype={$iaP:1}
A.fL.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.cA.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.aQ.prototype={
gj(a){return a.length},
$iaQ:1}
A.e0.prototype={
L(a,b){return a.getItem(b)!=null},
i(a,b){return a.getItem(A.w(b))},
k(a,b,c){a.setItem(b,c)},
B(a,b){var s=a.getItem(b)
a.removeItem(b)
return s},
p(a,b){var s,r,q
t.bm.a(b)
for(s=0;;++s){r=a.key(s)
if(r==null)return
q=a.getItem(r)
q.toString
b.$2(r,q)}},
gH(a){var s=A.E([],t.s)
this.p(a,new A.lQ(s))
return s},
gj(a){var s=a.length
s.toString
return s},
gE(a){return a.key(0)==null},
gR(a){return a.key(0)!=null},
$iu:1}
A.lQ.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:7}
A.ay.prototype={$iay:1}
A.e2.prototype={
a3(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bH(a,b,c,d)
s=A.rg("<table>"+b+"</table>",c,d)
r=document.createDocumentFragment()
r.toString
new A.aA(r).S(0,new A.aA(s))
return r}}
A.fO.prototype={
a3(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bH(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.aA(s).S(0,new A.aA(new A.aA(new A.aA(B.N.a3(r,b,c,d)).gaG(0)).gaG(0)))
return s}}
A.fP.prototype={
a3(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bH(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.aA(s).S(0,new A.aA(new A.aA(B.N.a3(r,b,c,d)).gaG(0)))
return s}}
A.cV.prototype={
bF(a,b){var s,r
this.sV(a,null)
s=a.content
s.toString
J.ip(s)
r=this.a3(a,b,null,null)
a.content.appendChild(r).toString},
$icV:1}
A.cm.prototype={
sI(a,b){a.value=b},
$icm:1}
A.aR.prototype={$iaR:1}
A.az.prototype={$iaz:1}
A.fR.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.gJ.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.fS.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.dQ.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.fT.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.aS.prototype={$iaS:1}
A.fV.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.ki.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.fW.prototype={
gj(a){return a.length}}
A.bg.prototype={}
A.h1.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.h3.prototype={
gj(a){return a.length}}
A.c2.prototype={$ic2:1,$im5:1}
A.bs.prototype={$ibs:1}
A.cZ.prototype={$icZ:1}
A.ha.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.d5.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.ec.prototype={
l(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return"Rectangle ("+A.h(p)+", "+A.h(s)+") "+A.h(r)+" x "+A.h(q)},
Z(a,b){var s,r,q
if(b==null)return!1
s=!1
if(t.ku.b(b)){r=a.left
r.toString
q=b.left
q.toString
if(r===q){r=a.top
r.toString
q=b.top
q.toString
if(r===q){r=a.width
r.toString
q=J.K(b)
if(r===q.gaP(b)){s=a.height
s.toString
q=s===q.gaL(b)
s=q}}}}return s},
gG(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return A.nJ(p,s,r,q)},
gcK(a){return a.height},
gaL(a){var s=a.height
s.toString
return s},
gd4(a){return a.width},
gaP(a){var s=a.width
s.toString
return s}}
A.ho.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
return a[b]},
k(a,b,c){t.ef.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.el.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.F.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.hP.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.hH.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.hV.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.J(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a7(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.lv.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$ip:1}
A.h6.prototype={
p(a,b){var s,r,q,p,o,n
t.bm.a(b)
for(s=this.gH(0),r=s.length,q=this.a,p=0;p<s.length;s.length===r||(0,A.av)(s),++p){o=s[p]
n=q.getAttribute(o)
b.$2(o,n==null?A.w(n):n)}},
gH(a){var s,r,q,p,o,n,m=this.a.attributes
m.toString
s=A.E([],t.s)
for(r=m.length,q=t.nD,p=0;p<r;++p){if(!(p<m.length))return A.e(m,p)
o=q.a(m[p])
if(o.namespaceURI==null){n=o.name
n.toString
B.b.m(s,n)}}return s},
gE(a){return this.gH(0).length===0},
gR(a){return this.gH(0).length!==0}}
A.ed.prototype={
L(a,b){var s=this.a.hasAttribute(b)
s.toString
return s},
i(a,b){return this.a.getAttribute(A.w(b))},
k(a,b,c){this.a.setAttribute(b,c)},
B(a,b){var s,r
if(typeof b=="string"){s=this.a
r=s.getAttribute(b)
s.removeAttribute(b)
s=r}else s=null
return s},
gj(a){return this.gH(0).length}}
A.hd.prototype={
L(a,b){var s=this.a.a.hasAttribute("data-"+this.b2(b))
s.toString
return s},
i(a,b){return this.a.a.getAttribute("data-"+this.b2(A.w(b)))},
k(a,b,c){this.a.a.setAttribute("data-"+this.b2(b),c)},
B(a,b){var s="data-"+this.b2(b),r=this.a.a,q=r.getAttribute(s)
r.removeAttribute(s)
return q},
p(a,b){this.a.p(0,new A.mb(this,t.bm.a(b)))},
gH(a){var s=A.E([],t.s)
this.a.p(0,new A.mc(this,s))
return s},
gj(a){return this.gH(0).length},
gE(a){return this.gH(0).length===0},
gR(a){return this.gH(0).length!==0},
cY(a){var s,r,q=A.E(a.split("-"),t.s)
for(s=1;s<q.length;++s){r=q[s]
if(r.length>0)B.b.k(q,s,r[0].toUpperCase()+B.a.X(r,1))}return B.b.Y(q,"")},
b2(a){var s,r,q,p,o
for(s=a.length,r=0,q="";r<s;++r){p=a[r]
o=p.toLowerCase()
q=(p!==o&&r>0?q+"-":q)+o}return q.charCodeAt(0)==0?q:q}}
A.mb.prototype={
$2(a,b){if(B.a.N(a,"data-"))this.b.$2(this.a.cY(B.a.X(a,5)),b)},
$S:7}
A.mc.prototype={
$2(a,b){if(B.a.N(a,"data-"))B.b.m(this.b,this.a.cY(B.a.X(a,5)))},
$S:7}
A.hj.prototype={
a4(){var s,r,q,p,o=A.ci(t.N)
for(s=this.a.className.split(" "),r=s.length,q=0;q<r;++q){p=B.a.t(s[q])
if(p.length!==0)o.m(0,p)}return o},
cl(a){this.a.className=t.i.a(a).Y(0," ")},
gj(a){var s=this.a.classList.length
s.toString
return s},
gE(a){var s=this.a.classList.length
s.toString
return s===0},
gR(a){var s=this.a.classList.length
s.toString
return s!==0},
A(a,b){var s=this.a.classList.contains(b)
s.toString
return s},
m(a,b){var s,r
A.w(b)
s=this.a.classList
r=s.contains(b)
r.toString
s.add(b)
return!r},
B(a,b){var s,r
if(typeof b=="string"){s=this.a.classList
r=s.contains(b)
r.toString
s.remove(b)}else r=!1
return r},
bv(a){A.rW(this.a,a)}}
A.nB.prototype={}
A.cq.prototype={
bt(a,b,c,d){var s=A.A(this)
s.h("~(1)?").a(a)
t.jE.a(c)
return A.z(this.a,this.b,a,!1,s.c)}}
A.cp.prototype={}
A.ee.prototype={
a1(a){var s=this
if(s.b==null)return $.ns()
s.d1()
s.d=s.b=null
return $.ns()},
cb(a){var s,r=this
r.$ti.h("~(1)?").a(a)
if(r.b==null)throw A.b(A.ah("Subscription has been canceled."))
r.d1()
s=A.q_(new A.me(a),t.A)
r.d=s
r.d_()},
d_(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.qL(s,this.c,r,!1)}},
d1(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.qJ(s,this.c,t.o.a(r),!1)}},
$ibr:1}
A.md.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:3}
A.me.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:3}
A.cs.prototype={
ei(a){var s
if($.hp.a===0){for(s=0;s<262;++s)$.hp.k(0,B.ah[s],A.uD())
for(s=0;s<12;++s)$.hp.k(0,B.w[s],A.uE())}},
aJ(a){return $.qA().A(0,A.dt(a))},
ak(a,b,c){var s=$.hp.i(0,A.dt(a)+"::"+b)
if(s==null)s=$.hp.i(0,"*::"+b)
if(s==null)return!1
return A.mR(s.$4(a,b,c,this))},
$ibc:1}
A.x.prototype={
gD(a){return new A.cc(a,this.gj(a),A.au(a).h("cc<x.E>"))}}
A.dS.prototype={
aJ(a){return B.b.a9(this.a,new A.lI(a))},
ak(a,b,c){return B.b.a9(this.a,new A.lH(a,b,c))},
$ibc:1}
A.lI.prototype={
$1(a){return t.hU.a(a).aJ(this.a)},
$S:23}
A.lH.prototype={
$1(a){return t.hU.a(a).ak(this.a,this.b,this.c)},
$S:23}
A.er.prototype={
ek(a,b,c,d){var s,r,q
this.a.S(0,c)
s=b.bC(0,new A.mE())
r=b.bC(0,new A.mF())
this.b.S(0,s)
q=this.c
q.S(0,B.af)
q.S(0,r)},
aJ(a){return this.a.A(0,A.dt(a))},
ak(a,b,c){var s,r=this,q=A.dt(a),p=r.c,o=q+"::"+b
if(p.A(0,o))return r.d.fe(c)
else{s="*::"+b
if(p.A(0,s))return r.d.fe(c)
else{p=r.b
if(p.A(0,o))return!0
else if(p.A(0,s))return!0
else if(p.A(0,q+"::*"))return!0
else if(p.A(0,"*::*"))return!0}}return!1},
$ibc:1}
A.mE.prototype={
$1(a){return!B.b.A(B.w,A.w(a))},
$S:9}
A.mF.prototype={
$1(a){return B.b.A(B.w,A.w(a))},
$S:9}
A.hX.prototype={
ak(a,b,c){if(this.eg(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.A(0,b)
return!1}}
A.mG.prototype={
$1(a){return"TEMPLATE::"+A.w(a)},
$S:10}
A.hW.prototype={
aJ(a){var s
if(t.nZ.b(a))return!1
s=t.bC.b(a)
if(s&&A.dt(a)==="foreignObject")return!1
if(s)return!0
return!1},
ak(a,b,c){if(b==="is"||B.a.N(b,"on"))return!1
return this.aJ(a)},
$ibc:1}
A.cc.prototype={
q(){var s=this,r=s.c+1,q=s.b
if(r<q){s.d=J.l(s.a,r)
s.c=r
return!0}s.d=null
s.c=q
return!1},
gu(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
$iac:1}
A.hc.prototype={$ii:1,$id:1,$im5:1}
A.hM.prototype={$irJ:1}
A.eE.prototype={
co(a){var s,r=new A.mQ(this)
do{s=this.b
r.$2(a,null)}while(s!==this.b)},
b_(a,b){++this.b
if(b==null||b!==a.parentNode)J.is(a)
else b.removeChild(a).toString},
f1(a,b){var s,r,q,p,o,n,m,l=!0,k=null,j=null
try{k=J.qP(a)
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
try{r=J.M(a)}catch(n){}try{t.h.a(a)
q=A.dt(a)
this.f0(a,b,l,r,q,t.f.a(k),A.ak(j))}catch(n){if(A.am(n) instanceof A.b5)throw n
else{this.b_(a,b)
window.toString
p=A.h(r)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn("Removing corrupted element "+p)}}},
f0(a,b,c,d,e,f,g){var s,r,q,p,o,n,m,l=this
if(c){l.b_(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing element due to corrupted attributes on <"+d+">")
return}if(!l.a.aJ(a)){l.b_(a,b)
window.toString
s=A.h(b)
r=typeof console!="undefined"
r.toString
if(r)window.console.warn("Removing disallowed element <"+e+"> from "+s)
return}if(g!=null)if(!l.a.ak(a,"is",g)){l.b_(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing disallowed type extension <"+e+' is="'+g+'">')
return}s=f.gH(0)
q=A.E(s.slice(0),A.G(s))
for(p=f.gH(0).length-1,s=f.a,r="Removing disallowed attribute <"+e+" ";p>=0;--p){if(!(p<q.length))return A.e(q,p)
o=q[p]
n=l.a
m=J.r3(o)
A.w(o)
if(!n.ak(a,m,A.w(s.getAttribute(o)))){window.toString
n=s.getAttribute(o)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn(r+o+'="'+A.h(n)+'">')
s.removeAttribute(o)}}if(t.fD.b(a)){s=a.content
s.toString
l.co(s)}},
e1(a,b){var s=a.nodeType
s.toString
switch(s){case 1:this.f1(a,b)
break
case 8:case 11:case 3:case 4:break
default:this.b_(a,b)}},
$irt:1}
A.mQ.prototype={
$2(a,b){var s,r,q,p,o,n=this.a
n.e1(a,b)
s=a.lastChild
while(s!=null){r=null
try{r=s.previousSibling
if(r!=null&&r.nextSibling!==s){q=A.ah("Corrupt HTML")
throw A.b(q)}}catch(p){q=s;++n.b
o=q.parentNode
if(a!==o){if(o!=null)o.removeChild(q).toString}else a.removeChild(q).toString
s=null
r=a.lastChild}if(s!=null)this.$2(s,a)
s=r}},
$S:50}
A.hb.prototype={}
A.hf.prototype={}
A.hg.prototype={}
A.hh.prototype={}
A.hi.prototype={}
A.hl.prototype={}
A.hm.prototype={}
A.hq.prototype={}
A.hr.prototype={}
A.hy.prototype={}
A.hz.prototype={}
A.hA.prototype={}
A.hB.prototype={}
A.hC.prototype={}
A.hD.prototype={}
A.hH.prototype={}
A.hI.prototype={}
A.hK.prototype={}
A.es.prototype={}
A.et.prototype={}
A.hN.prototype={}
A.hO.prototype={}
A.hQ.prototype={}
A.hY.prototype={}
A.hZ.prototype={}
A.ew.prototype={}
A.ex.prototype={}
A.i_.prototype={}
A.i0.prototype={}
A.i5.prototype={}
A.i6.prototype={}
A.i7.prototype={}
A.i8.prototype={}
A.i9.prototype={}
A.ia.prototype={}
A.ib.prototype={}
A.ic.prototype={}
A.id.prototype={}
A.ie.prototype={}
A.mW.prototype={
$1(a){this.a.push(A.pF(a))},
$S:12}
A.n6.prototype={
$2(a,b){this.a[a]=A.pF(b)},
$S:33}
A.f2.prototype={
bZ(a){var s=$.qg()
if(s.b.test(a))return a
throw A.b(A.ko(a,"value","Not a valid class token"))},
l(a){return this.a4().Y(0," ")},
gD(a){var s=this.a4()
return A.t0(s,s.r,A.A(s).c)},
an(a,b,c){var s,r
c.h("0(c)").a(b)
s=this.a4()
r=A.A(s)
return new A.bw(s,r.J(c).h("1(as.E)").a(b),r.h("@<as.E>").J(c).h("bw<1,2>"))},
gE(a){return this.a4().a===0},
gR(a){return this.a4().a!==0},
gj(a){return this.a4().a},
A(a,b){this.bZ(b)
return this.a4().A(0,b)},
m(a,b){var s
A.w(b)
this.bZ(b)
s=this.dn(0,new A.ks(b))
return A.mR(s==null?!1:s)},
B(a,b){var s,r
if(typeof b!="string")return!1
this.bZ(b)
s=this.a4()
r=s.B(0,b)
this.cl(s)
return r},
bv(a){this.dn(0,new A.kt(a))},
v(a,b){return this.a4().v(0,b)},
dn(a,b){var s,r
t.gA.a(b)
s=this.a4()
r=b.$1(s)
this.cl(s)
return r}}
A.ks.prototype={
$1(a){return t.i.a(a).m(0,this.a)},
$S:46}
A.kt.prototype={
$1(a){return t.i.a(a).bv(this.a)},
$S:45}
A.fc.prototype={
gaY(){var s=this.b,r=A.A(s)
return new A.aE(new A.I(s,r.h("H(k.E)").a(new A.lo()),r.h("I<k.E>")),r.h("B(k.E)").a(new A.lp()),r.h("aE<k.E,B>"))},
p(a,b){t.p9.a(b)
B.b.p(A.aK(this.gaY(),!1,t.h),b)},
k(a,b,c){var s
t.h.a(c)
s=this.gaY()
J.qZ(s.b.$1(J.eM(s.a,b)),c)},
A(a,b){return!1},
aw(a){J.ip(this.b.a)},
gj(a){return J.ae(this.gaY().a)},
i(a,b){var s
A.J(b)
s=this.gaY()
return s.b.$1(J.eM(s.a,b))},
gD(a){var s=A.aK(this.gaY(),!1,t.h)
return new J.b7(s,s.length,A.G(s).h("b7<1>"))}}
A.lo.prototype={
$1(a){return t.h.b(t.F.a(a))},
$S:37}
A.lp.prototype={
$1(a){return t.h.a(t.F.a(a))},
$S:44}
A.cM.prototype={$icM:1}
A.hL.prototype={
dG(a){if(a instanceof A.bp)return a.f_()
return null}}
A.mY.prototype={
$1(a){var s
t.Y.a(a)
s=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(A.tD,a,!1)
A.o5(s,$.io(),a)
return s},
$S:13}
A.mZ.prototype={
$1(a){return new this.a(a)},
$S:13}
A.n3.prototype={
$1(a){var s=a==null?A.aY(a):a
$.nr()
return new A.dD(s)},
$S:43}
A.n4.prototype={
$1(a){var s=a==null?A.aY(a):a
$.nr()
return new A.cg(s,t.gq)},
$S:41}
A.n5.prototype={
$1(a){var s=a==null?A.aY(a):a
$.nr()
return new A.bp(s)},
$S:40}
A.bp.prototype={
i(a,b){if(typeof b!="string"&&typeof b!="number")throw A.b(A.b6("property is not a String or num",null))
return A.o3(this.a[b])},
k(a,b,c){if(typeof b!="string"&&typeof b!="number")throw A.b(A.b6("property is not a String or num",null))
this.a[b]=A.o4(c)},
Z(a,b){if(b==null)return!1
return b instanceof A.bp&&this.a===b.a},
bo(a){return a in this.a},
c2(a,b){var s,r=this.a
if(b==null)s=null
else{s=A.G(b)
s=A.aK(new A.a_(b,s.h("@(1)").a(A.uM()),s.h("a_<1,@>")),!0,t.z)}return A.o3(r[a].apply(r,s))},
l(a){var s,r
try{s=String(this.a)
return s}catch(r){s=this.ee(0)
return s}},
f_(){var s=this.bX(),r=s!=null&&s.length>0?" ("+s+")":""
return"Instance of '"+A.dX(this)+"'"+r},
bX(){return A.oi(this.a,!1,!1)},
gG(a){return 0}}
A.dD.prototype={
bX(){return A.oi(this.a,!1,!0)}}
A.cg.prototype={
cD(a){var s=a<0||a>=this.gj(0)
if(s)throw A.b(A.aj(a,0,this.gj(0),null,null))},
i(a,b){if(A.eG(b))this.cD(b)
return this.$ti.c.a(this.ea(0,b))},
k(a,b,c){if(A.eG(b))this.cD(b)
this.ef(0,b,c)},
gj(a){var s=this.a.length
if(typeof s==="number"&&s>>>0===s)return s
throw A.b(A.ah("Bad JsArray length"))},
bX(){return A.oi(this.a,!0,!1)},
$in:1,
$if:1,
$ip:1}
A.d2.prototype={
k(a,b,c){return this.eb(0,b,c)}}
A.lK.prototype={
l(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.ne.prototype={
$1(a){var s,r,q,p,o
if(A.pQ(a))return a
s=this.a
if(s.L(0,a))return s.i(0,a)
if(t.f.b(a)){r={}
s.k(0,a,r)
for(s=J.K(a),q=J.b4(s.gH(a));q.q();){p=q.gu(q)
r[p]=this.$1(s.i(a,p))}return r}else if(t.R.b(a)){o=[]
s.k(0,a,o)
B.b.S(o,J.di(a,this,t.z))
return o}else return a},
$S:25}
A.nl.prototype={
$1(a){return this.a.aK(0,this.b.h("0/?").a(a))},
$S:12}
A.nm.prototype={
$1(a){if(a==null)return this.a.bl(new A.lK(a===undefined))
return this.a.bl(a)},
$S:12}
A.mu.prototype={
ej(){var s=self.crypto
if(s!=null)if(s.getRandomValues!=null)return
throw A.b(A.N("No source of cryptographically secure random numbers available."))},
fQ(a){var s,r,q,p,o,n,m,l
if(a<=0||a>4294967296)throw A.b(A.rE("max must be in range 0 < max \u2264 2^32, was "+a))
if(a>255)if(a>65535)s=a>16777215?4:3
else s=2
else s=1
r=this.a
r.$flags&2&&A.aG(r,11)
r.setUint32(0,0,!1)
q=4-s
p=A.J(Math.pow(256,s))
for(o=a-1,n=(a&o)===0;;){crypto.getRandomValues(J.qN(B.ak.gfn(r),q,s))
m=r.getUint32(0,!1)
if(n)return(m&o)>>>0
l=m%a
if(m-l+a<p)return l}}}
A.aT.prototype={$iaT:1}
A.fo.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s
A.J(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a7(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){t.kT.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){return this.i(a,b)},
$in:1,
$if:1,
$ip:1}
A.aW.prototype={$iaW:1}
A.fC.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s
A.J(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a7(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){t.ai.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){return this.i(a,b)},
$in:1,
$if:1,
$ip:1}
A.fH.prototype={
gj(a){return a.length}}
A.cT.prototype={$icT:1}
A.fN.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s
A.J(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a7(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){A.w(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){return this.i(a,b)},
$in:1,
$if:1,
$ip:1}
A.eS.prototype={
a4(){var s,r,q,p,o=this.a.getAttribute("class"),n=A.ci(t.N)
if(o==null)return n
for(s=o.split(" "),r=s.length,q=0;q<r;++q){p=B.a.t(s[q])
if(p.length!==0)n.m(0,p)}return n},
cl(a){this.a.setAttribute("class",a.Y(0," "))}}
A.r.prototype={
gal(a){return new A.eS(a)},
gda(a){return new A.fc(a,new A.aA(a))},
sO(a,b){this.bF(a,b)},
a3(a,b,c,d){var s,r,q,p=A.E([],t.lN)
B.b.m(p,A.pf(null))
B.b.m(p,A.po())
B.b.m(p,new A.hW())
c=new A.eE(new A.dS(p))
p=document
s=p.body
s.toString
r=B.z.fq(s,'<svg version="1.1">'+b+"</svg>",c)
p=p.createDocumentFragment()
p.toString
q=new A.aA(r).gaG(0)
while(s=q.firstChild,s!=null)p.appendChild(s).toString
return p},
gaA(a){return new A.cp(a,"click",!1,t.C)},
$ir:1}
A.aX.prototype={$iaX:1}
A.fX.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s
A.J(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a7(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){t.hk.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){return this.i(a,b)},
$in:1,
$if:1,
$ip:1}
A.hu.prototype={}
A.hv.prototype={}
A.hE.prototype={}
A.hF.prototype={}
A.hS.prototype={}
A.hT.prototype={}
A.i1.prototype={}
A.i2.prototype={}
A.eT.prototype={
gj(a){return a.length}}
A.eU.prototype={
L(a,b){return A.b3(a.get(b))!=null},
i(a,b){return A.b3(a.get(A.w(b)))},
p(a,b){var s,r,q
t.u.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.b3(r.value[1]))}},
gH(a){var s=A.E([],t.s)
this.p(a,new A.kp(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gE(a){var s=a.size
s.toString
return s===0},
gR(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.N("Not supported"))},
B(a,b){throw A.b(A.N("Not supported"))},
$iu:1}
A.kp.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.eV.prototype={
gj(a){return a.length}}
A.bN.prototype={}
A.fD.prototype={
gj(a){return a.length}}
A.h7.prototype={}
A.nf.prototype={
$1(a){t.A.a(a)
new A.it().ac()},
$S:18}
A.it.prototype={
ac(){var s=0,r=A.U(t.H),q=this,p,o,n,m,l,k,j,i,h,g,f
var $async$ac=A.V(function(a,b){if(a===1)return A.R(b,r)
for(;;)switch(s){case 0:g=document
f=g.getElementById("view-login")
f.toString
q.CW=f
f=g.getElementById("view-dashboard")
f.toString
q.cx=f
f=g.getElementById("view-directory")
f.toString
q.cy=f
f=g.getElementById("view-assets")
f.toString
q.db=f
f=g.getElementById("view-profile")
f.toString
q.dx=f
f=g.getElementById("view-billing")
f.toString
q.dy=f
f=g.getElementById("view-resident-home")
f.toString
q.fr=f
f=g.getElementById("view-resident-ledger")
f.toString
q.fx=f
f=g.getElementById("view-resident-support")
f.toString
q.fy=f
f=g.getElementById("app-bottom-nav")
f.toString
q.go=f
f=g.getElementById("resident-bottom-nav")
f.toString
q.id=f
q.k1=g.getElementById("btn-floating-role-switch")
g.getElementById("floating-role-switch-text")
f=q.cx
o=q.cy
n=g.getElementById("view-worker-resident-details")
n.toString
m=t.N
q.k3=t.dW.a(A.a2(["view-dashboard",f,"view-directory",o,"view-worker-resident-details",n,"view-assets",q.db,"view-profile",q.dx,"view-billing",q.dy,"view-resident-home",q.fr,"view-resident-ledger",q.fx,"view-resident-support",q.fy],m,t.h))
n=t.d.a(window.location).href
n.toString
l=A.cn(n).gaB().i(0,"role")
k=g.getElementById("web-portal-title")
f=l==="resident"
if(f){if(k!=null)J.v(k,"Resident Portal")
j=t.G.a(g.getElementById("employee-id"))
if(j!=null)j.placeholder="Resident ID, meter ID, contact or unique name"}else{if(k!=null)J.v(k,"Worker Portal")
j=t.G.a(g.getElementById("employee-id"))
if(j!=null)j.placeholder="Enter employee ID"}o=new A.jz()
o.$0()
A.nQ(A.lm(0,10),new A.jv(o))
o=$.P()
o.sfR(new A.jw(q))
n=o.ax
new A.d_(n,A.A(n).h("d_<1>")).fM(new A.jx(q))
s=2
return A.y(o.ac(),$async$ac)
case 2:q.d2(o.W())
A.nQ(A.lm(0,10),new A.jy(q))
p=A.de()?window.localStorage.getItem("waterhall_session"):null
i=A.de()?window.localStorage.getItem("waterhall_resident_session"):null
if(f)if(i!=null&&i.length!==0){q.ct(i)
q.av()
q.bf("resident")}else q.b4()
else if(p!=null&&p.length!==0)try{f=A.aq(t.f.a(B.d.K(0,p)),m,t.z)
q.a=f
q.cr(f)
q.av()
q.bf("worker")}catch(e){f=window.localStorage
f.toString
B.j.B(f,"waterhall_session")
q.b4()}else q.b4()
q.fl()
if($.P().y==="Session expired. Please sign in again.")q.ah("Session expired. Please sign in again.",g.getElementById("login-error-msg"))
return A.S(null,r)}})
return A.T($async$ac,r)},
d2(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d="btn-review-collections"
t.P.a(a)
s=document
r=s.getElementById("worker-sync-status-pill")
q=s.getElementById("worker-sync-status-text")
p=s.getElementById("db-offline-overlay")
o=s.getElementById("offline-banner-text")
n=J.C(a)
m=n.i(a,"status")
l=A.w(m==null?"online":m)
k=A.o2(n.i(a,"pendingCount"))
if(k==null)k=0
m=A.pD(n.i(a,"isOnline"))
m=m===!1
j=J.m(n.i(a,"authenticated"),!0)
i=A.o2(n.i(a,"reviewCount"))
if(i==null)i=0
h=r==null
if(!h&&q!=null){g=J.K(r)
g.gal(r).bv(["online","offline","pending_sync","syncing","synced"])
g.gal(r).m(0,l)
if(!j)J.v(q,"Sign in required")
else if(m)J.v(q,"Offline Mode")
else if(J.m(n.i(a,"isSyncing"),!0))J.v(q,"Syncing...")
else if(k>0){if(i>0)n=""+k+" Pending ("+i+" need review)"
else{g=""+k
n=n.i(a,"error")!=null?g+" Pending: retry needed":g+" Pending Sync"}J.v(q,n)}else J.v(q,"Connected")}if(p!=null)if(j&&m){n=p.style
n.display="flex"
if(o!=null){n=J.K(o)
if(k>0)n.sV(o,"Offline Mode Active: "+k+" collection(s) saved on this device waiting to sync.")
else n.sV(o,"Offline Mode Active: Local SQLite database enabled. Field operations available.")}}else{n=p.style
n.display="none"}f=s.getElementById(d)
if(f==null)n=(h?null:r.parentElement)!=null
else n=!1
if(n){e=s.createElement("button")
e.id=d
B.n.sV(e,"Review pending operations")
s=t.C
A.z(e,"click",s.h("~(1)?").a(new A.j3(this)),!1,s.c)
r.parentElement.appendChild(e).toString
f=e}if(f!=null){s=f.style
s.toString
n=j&&i>0?"inline-block":"none"
s.display=n}},
cT(){var s,r,q,p,o,n,m,l,k,j,i,h,g="collection-review-modal",f="house_id",e="sync_error",d=$.P()
if(!d.M())return
s=document
r=s.getElementById(g)
if(r!=null)J.is(r)
q=s.createElement("div")
q.id=g
q.className="modal-overlay"
r=q.style
r.display="flex"
p=s.createElement("div")
p.className="offline-card"
r=p.style
r.maxHeight="80vh"
B.r.cS(r,B.r.cB(r,"overflow-y"),"auto","")
r=s.createElement("h2")
r.toString
B.a9.sV(r,"Pending operation review")
p.appendChild(r).toString
r=s.createElement("p")
r.toString
B.t.sV(r,"These records remain saved. Review rejected readings or payments with Admin, then retry. Record IDs are preserved.")
p.appendChild(r).toString
for(d=d.aQ(),r=A.G(d),o=r.h("H(1)").a(new A.j_()),d=B.b.gD(d),r=new A.bh(d,o,r.h("bh<1>"));r.q();){o=d.gu(0)
n=s.createElement("p")
n.toString
m=J.C(o)
B.t.sV(n,A.h(m.i(o,f))+" | "+A.h(m.i(o,"amount_collected"))+" | "+A.h(m.i(o,"transaction_id"))+"\n"+A.h(m.i(o,e)))
p.appendChild(n).toString}for(d=$.P().ag(),r=A.G(d),o=r.h("H(1)").a(new A.j0()),d=B.b.gD(d),r=new A.bh(d,o,r.h("bh<1>")),o=t.f;r.q();){n=d.gu(0)
m=J.C(n)
l=o.a(m.i(n,"body"))
k=B.ai.i(0,m.i(n,"endpoint"))
if(k==null)k="Saved operation"
j=s.createElement("p")
j.toString
i=J.C(l)
h=i.i(l,f)
i=h==null?i.i(l,"household_id"):h
B.t.sV(j,k+" | "+A.h(i==null?"":i)+" | "+A.h(m.i(n,"operation_id"))+"\n"+A.h(m.i(n,e)))
p.appendChild(j).toString}d=s.createElement("button")
d.toString
B.n.sV(d,"Retry pending operations")
r=t.C
o=r.h("~(1)?")
r=r.c
A.z(d,"click",o.a(new A.j1(this,d)),!1,r)
p.appendChild(d).toString
d=s.createElement("button")
d.toString
B.n.sV(d,"Close")
A.z(d,"click",o.a(new A.j2(q)),!1,r)
p.appendChild(d).toString
q.appendChild(p).toString
s.body.appendChild(q).toString},
fl(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=this,b1="click",b2="change"
b0.eK()
b0.ew()
s=document
r=t.q
q=r.a(s.getElementById("btn-login"))
p=t.G
o=p.a(s.getElementById("employee-id"))
n=p.a(s.getElementById("login-password"))
m=t.Z
l=m.a(s.getElementById("zone-assignment"))
k=s.getElementById("login-error-msg")
j=s.getElementById("btn-toggle-web-pw")
if(j!=null){i=J.aa(j)
h=i.$ti
A.z(i.a,i.b,h.h("~(1)?").a(new A.j6(j)),!1,h.c)}if(q!=null){i=t.C
A.z(q,b1,i.h("~(1)?").a(new A.j7(b0,o,n,l,k,q)),!1,i.c)}g=r.a(s.getElementById("btn-logout"))
if(g!=null){i=t.C
A.z(g,b1,i.h("~(1)?").a(new A.j8(b0)),!1,i.c)}f=r.a(s.getElementById("btn-resident-logout"))
if(f!=null){i=t.C
A.z(f,b1,i.h("~(1)?").a(new A.jg(b0)),!1,i.c)}i=t.h
A.eJ(i,i,"T","querySelectorAll")
i=s.querySelectorAll(".nav-tab")
i.toString
e=new A.bj(i,t.U)
e.p(e,new A.jh(b0))
d=p.a(s.getElementById("dir-search"))
c=m.a(s.getElementById("filter-purok"))
b=m.a(s.getElementById("filter-status"))
if(d!=null){p=t.E
A.z(d,"input",p.h("~(1)?").a(new A.ji(b0)),!1,p.c)}if(c!=null){p=t.E
A.z(c,b2,p.h("~(1)?").a(new A.jj(b0)),!1,p.c)}if(b!=null){p=t.E
A.z(b,b2,p.h("~(1)?").a(new A.jk(b0)),!1,p.c)}a=s.getElementById("btn-close-modal")
if(a!=null){p=J.aa(a)
m=p.$ti
A.z(p.a,p.b,m.h("~(1)?").a(new A.jl(b0)),!1,m.c)}a0=s.getElementById("house-detail-modal")
if(a0!=null){p=J.aa(a0)
m=p.$ti
A.z(p.a,p.b,m.h("~(1)?").a(new A.jm(a0)),!1,m.c)}a1=t.aa.a(s.getElementById("modal-leak-toggle"))
if(a1!=null){p=t.E
A.z(a1,b2,p.h("~(1)?").a(new A.jn(b0,a1)),!1,p.c)}a2=r.a(s.getElementById("btn-submit-log"))
if(a2!=null){r=t.C
A.z(a2,b1,r.h("~(1)?").a(new A.j9(b0)),!1,r.c)}a3=s.getElementById("menu-view-logs")
if(a3!=null){r=J.aa(a3)
p=r.$ti
A.z(r.a,r.b,p.h("~(1)?").a(new A.ja(b0)),!1,p.c)}a4=s.getElementById("menu-emergency-call")
if(a4!=null){r=J.aa(a4)
p=r.$ti
A.z(r.a,r.b,p.h("~(1)?").a(new A.jb(b0)),!1,p.c)}a5=s.getElementById("btn-broadcast-announcement")
if(a5!=null){r=J.aa(a5)
p=r.$ti
A.z(r.a,r.b,p.h("~(1)?").a(new A.jc(b0)),!1,p.c)}a6=s.getElementById("btn-web-forgot-password")
a7=s.getElementById("web-modal-forgot-pw")
a8=s.getElementById("btn-web-recover-cancel")
a9=s.getElementById("btn-web-recover-submit")
if(a6!=null){s=J.aa(a6)
r=s.$ti
A.z(s.a,s.b,r.h("~(1)?").a(new A.jd(a7)),!1,r.c)}if(a8!=null){s=J.aa(a8)
r=s.$ti
A.z(s.a,s.b,r.h("~(1)?").a(new A.je(a7)),!1,r.c)}if(a9!=null){s=J.aa(a9)
r=s.$ti
A.z(s.a,s.b,r.h("~(1)?").a(new A.jf(a7)),!1,r.c)}},
ah(a,b){var s
if(b!=null){J.v(b,a)
s=b.style
s.display="block"}},
av(){},
bf(a){var s="WaterHallPush",r=$.dh()
if(r.bo(s))r.i(0,s).c2("registerSubscription",A.E([a],t.s))},
b4(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b="none",a=c.k3
a===$&&A.aw()
new A.aU(a,A.A(a).h("aU<2>")).p(0,new A.jo())
a=c.CW
a===$&&A.aw()
J.c7(a).m(0,"active")
a=c.CW.style
a.display="flex"
c.b="view-login"
a=c.go
a===$&&A.aw()
a=a.style
a.display=b
a=c.id
a===$&&A.aw()
a=a.style
a.display=b
a=c.k1
a===$&&A.aw()
if(a!=null){a=a.style
a.display=b}a=document
s=t.G
r=s.a(a.getElementById("employee-id"))
q=s.a(a.getElementById("login-password"))
p=a.getElementById("login-error-msg")
if(r!=null)B.f.sI(r,"")
if(q!=null)B.f.sI(q,"")
if(p!=null){o=p.style
o.display=b}o=t.r
n=o.a(a.getElementById("resident-log-desc"))
if(n!=null)B.l.sI(n,"")
m=a.getElementById("resident-photo-name")
if(m!=null)J.v(m,"No file chosen")
l=a.getElementById("resident-photo-preview")
if(l!=null){k=l.style
k.display=b
k=l.style
k.backgroundImage=""
J.nw(l).aw(0)}j=s.a(a.getElementById("dir-search"))
if(j!=null)B.f.sI(j,"")
i=s.a(a.getElementById("bill-meter-search"))
if(i!=null)B.f.sI(i,"")
h=s.a(a.getElementById("bill-curr-input"))
if(h!=null)B.f.sI(h,"")
g=o.a(a.getElementById("worker-announcement-input"))
if(g!=null)B.l.sI(g,"")
f=a.getElementById("resident-logout-name")
e=a.getElementById("resident-logout-role")
d=a.getElementById("resident-logout-avatar")
if(f!=null)J.v(f,"---")
if(e!=null)J.v(e,"---")
if(d!=null)J.v(d,"--")},
cr(a){var s,r,q,p,o,n,m,l=this
t.P.a(a)
s=t.d.a(window.location).href
s.toString
if(A.cn(s).gaB().i(0,"role")==="resident"){A.bL("[SECURITY] Resident application is forbidden from loading Worker Portal.")
return}s=l.CW
s===$&&A.aw()
J.c7(s).B(0,"active")
s=l.CW.style
s.display="none"
s=l.k3
s===$&&A.aw()
new A.aU(s,A.A(s).h("aU<2>")).p(0,new A.ka())
l.d=null
s=window.localStorage
s.toString
B.j.B(s,"waterhall_resident_session")
s=l.go
s===$&&A.aw()
s.setAttribute("style","display: flex !important")
s=l.id
s===$&&A.aw()
s.setAttribute("style","display: none !important")
s=l.k1
s===$&&A.aw()
if(s!=null){s=s.style
s.display="none"}l.a=a
s=window.localStorage
s.toString
s.setItem("waterhall_session",B.d.T(a))
s=t.B
r=A.a8(new A.I(A.E(J.M(a.i(0,"name")).split(" "),t.s),t.Q.a(new A.kb()),s),s.h("f.E"))
s=A.G(r)
q=new A.a_(r,s.h("c(1)").a(new A.kc()),s.h("a_<1,c>")).Y(0,"")
s=q.length
s=B.a.n(q,0,s<2?s:2)
p=document
o=p.getElementById("worker-logout-name")
n=p.getElementById("worker-logout-role")
m=p.getElementById("worker-logout-avatar")
if(o!=null)J.v(o,A.ak(a.i(0,"name")))
if(n!=null){p=a.i(0,"role")
J.v(n,A.ak(p==null?"Field Worker":p))}if(m!=null)J.v(m,s.toUpperCase())
l.a6("view-dashboard")
l.bx()
l.aO()
l.cf()
l.fG()},
a6(a){var s,r,q,p,o,n,m=this,l="view-resident-home",k="view-resident-ledger",j="view-resident-support"
if(m.a==null&&m.d==null&&a!=="view-login"){m.b4()
return}s=t.d.a(window.location).href
s.toString
r=A.cn(s).gaB().i(0,"role")
if(r==="worker")s=a===l||a===k||a===j
else s=!1
if(s){A.bL("[SECURITY] Worker application is forbidden from switching to Resident tab "+a+".")
return}if(r==="resident")s=a==="view-dashboard"||a==="view-billing"||a==="view-profile"||a==="view-directory"||a==="view-assets"||a==="view-worker-resident-details"
else s=!1
if(s){A.bL("[SECURITY] Resident application is forbidden from switching to Worker tab "+a+".")
return}m.b=a
s=document
s.toString
q=t.h
A.eJ(q,q,"T","querySelectorAll")
q=s.querySelectorAll(".nav-tab")
q.toString
p=new A.bj(q,t.U)
p.p(p,new A.kk(a))
q=m.k3
q===$&&A.aw()
q.p(0,new A.kl(a))
if(a==="view-dashboard")m.bx()
else if(a==="view-directory")m.aO()
else if(a!=="view-assets")if(a==="view-profile")m.cf()
else if(a==="view-billing"){if(m.k4==null){o=$.P().a
q=o.length
if(q!==0){if(0>=q)return A.e(o,0)
m.k4=A.ak(J.l(o[0],"house_id"))
n=t.G.a(s.getElementById("bill-meter-search"))
if(n!=null){if(0>=o.length)return A.e(o,0)
s=A.h(J.l(o[0],"owner_name"))
if(0>=o.length)return A.e(o,0)
B.f.sI(n,s+" ("+A.h(J.l(o[0],"account_number"))+")")}}}m.bw(m.k4)}else if(a===l||a===k||a===j)m.dv()},
bx(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=this,b5="has_reading",b6="main_tank_level",b7="turbidity_status",b8="var(--alert-green)",b9=".alert-widget-title",c0="var(--amber-safety)"
if(b4.a==null)return
s=document
r=s.getElementById("dash-worker-title")
if(r!=null)J.v(r,"Field Terminal: "+A.h(b4.a.i(0,"selected_zone")))
q=$.P()
p=q.cn("worker")
o=s.getElementById("worker-announcement-banner")
n=s.getElementById("worker-announcement-message")
m=s.getElementById("worker-announcement-tag")
if(o!=null&&n!=null)if(p!=null&&A.w(J.l(p,"message")).length!==0){l=J.C(p)
k=A.w(l.i(p,"message"))
J.v(n,k)
if(m!=null){j=l.i(p,"target_audience")
if(j==null)j="Everyone"
i=l.i(p,"author")
J.v(m,A.h(i==null?"Admin":i)+" \u2022 "+A.h(j))}h=o.style
h.display="flex"
g=A.h(l.i(p,"timestamp"))+"_"+k
if(b4.e!==g){b4.e=g
b4.bA("WaterHall Announcement",k,"announcement")}}else{l=o.style
l.display="none"}f=q.a
e=q.b
d=q.c
c=s.getElementById("worker-tank-val")
b=s.getElementById("worker-safety-status")
a=s.getElementById("worker-turb-val")
a0=s.getElementById("worker-tds-val")
if(c!=null)J.v(c,J.m(e.i(0,b5),!1)||e.i(0,b6)==null?"N/A":A.h(e.i(0,b6))+"%")
if(a!=null)J.v(a,J.m(e.i(0,b5),!1)?"N/A":B.e.F(A.a3(e.i(0,"turbidity")),1))
if(a0!=null)J.v(a0,J.m(e.i(0,b5),!1)?"N/A":A.h(e.i(0,"tds_ppm")))
if(b!=null)if(J.m(e.i(0,b7),"warning")){J.v(b,"ALERT")
q=b.style
q.color="var(--alert-red)"}else{J.v(b,J.m(e.i(0,b5),!1)?"AWAITING DATA":"NO ALERT")
q=b.style
q.color=b8}q=A.G(f)
l=q.h("I<1>")
a1=A.a8(new A.I(f,q.h("H(1)").a(new A.jL()),l),l.h("f.E"))
a2=A.E([],t.hq)
if(J.m(e.i(0,b7),"warning")){q=t.N
B.b.m(a2,A.a2(["type","quality","name","Central Turbidity Alert","desc",A.w(e.i(0,"turbidity_desc"))],q,q))
a3=1}else a3=0
a4=a1.length+a3
a5=s.getElementById("dash-alert-count")
if(a5!=null)J.v(a5,B.c.l(a4))
a6=s.getElementById("dashboard-alert-widget")
a7=s.getElementById("dash-alert-list")
if(a6!=null&&a7!=null){q=J.K(a7)
q.sO(a7,"")
if(a4===0){l=a6.style
l.borderColor=b8
a8=t.dH.a(a6.querySelector(b9))
if(a8!=null){l=a8.style
l.color=b8}q.sO(a7,'          <div class="alert-item" style="border-left-color: var(--alert-green); background-color: rgba(16, 185, 129, 0.05)">\n            <div class="alert-item-icon">\n              <svg style="fill: var(--alert-green)" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n            </div>\n            <div class="alert-item-text" style="color: var(--text-on-dark)">No active leaks or water quality issues in Brgy. Tagpopongan.</div>\n          </div>\n        ')}else{q=a6.style
q.borderColor=c0
a8=t.dH.a(a6.querySelector(b9))
if(a8!=null){q=a8.style
q.color=c0}B.b.p(a1,new A.jM(b4,a7))
B.b.p(a2,new A.jN(b4,a7))}}a9=A.E(["Purok 1","Purok 2","Purok 3","Purok 4","Purok 5","Purok 6"],t.s)
new A.cj(a9,t.fO).p(0,new A.jO(b4,f))
b0=s.getElementById("dashboard-zone-grid")
if(b0!=null){J.dj(b0,"")
B.b.p(a9,new A.jP(b4,f,b0))}b1=s.getElementById("dash-log-count")
b2=s.getElementById("dash-log-list")
if(b2!=null){s=J.K(b2)
s.sO(b2,"")
b3=A.nO(d,0,A.cx(3,"count",t.S),A.G(d).c).ap(0)
if(b1!=null)J.v(b1,""+d.length+" logged")
if(b3.length===0)s.sO(b2,'<div class="log-card" style="color:var(--text-muted)">No maintenance activity logged yet.</div>')
else B.b.p(b3,new A.jQ(b4,f,b2))}},
aO(){var s,r,q,p,o,n,m=null,l=$.P().a,k=document,j=t.G.a(k.getElementById("dir-search")),i=t.Z,h=i.a(k.getElementById("filter-purok")),g=i.a(k.getElementById("filter-status"))
if(j==null)s=m
else{i=j.value
i=i==null?m:B.a.t(i.toLowerCase())
s=i}if(s==null)s=""
r=h==null?m:h.value
if(r==null)r="all"
q=g==null?m:g.value
if(q==null)q="all"
p=k.getElementById("dir-empty-state")
o=k.getElementById("dir-household-list")
if(o==null)return
J.dj(o,"")
k=A.G(l)
i=k.h("I<1>")
n=A.a8(new A.I(l,k.h("H(1)").a(new A.jS(s,r,q)),i),i.h("f.E"))
if(n.length===0){if(p!=null){k=p.style
k.display="block"}}else{if(p!=null){k=p.style
k.display="none"}B.b.p(n,new A.jT(this,o))}},
cc(a){var s,r,q,p,o,n,m,l,k,j
this.c=a
s=$.P()
r=s.aq(a)
if(r==null)return
q=document
p=q.getElementById("worker-res-name")
o=q.getElementById("worker-res-acct")
n=q.getElementById("worker-res-leak-status")
m=q.getElementById("worker-res-consumption")
l=q.getElementById("worker-res-total")
if(p!=null)J.v(p,A.ak(J.l(r,"owner_name")))
if(o!=null)J.v(o,A.ak(J.l(r,"account_number")))
k=s.bE(a)
j=k.length!==0?B.b.gab(k):null
if(m!=null)J.v(m,j==null?"--":B.e.F(A.a3(J.l(j,"consumption")),3))
if(l!=null)J.v(l,j==null?"No billing record":B.e.F(A.a3(J.l(j,"total_due")),2))
if(n!=null){s=J.K(n)
if(J.m(J.l(r,"current_leak_status"),"leak")){s.sO(n,'<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--alert-red)"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> <span style="color:var(--alert-red);font-weight:700">Leak Alert Detected</span>')
s=n.style
s.backgroundColor="var(--alert-red-bg)"
s=n.style
s.border="1px solid var(--alert-red)"}else{s.sO(n,'<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--alert-green)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <span style="color:var(--alert-green);font-weight:700">No leak reported</span>')
s=n.style
s.backgroundColor="var(--alert-green-bg)"
s=n.style
s.border="1px solid rgba(16, 185, 129, 0.3)"}}this.a6("view-worker-resident-details")
s=q.getElementById("btn-back-to-dir")
if(s!=null){s=J.aa(s)
q=s.$ti
A.z(s.a,s.b,q.h("~(1)?").a(new A.jA(this)),!1,q.c)}},
dH(a){var s=document,r=s.getElementById("modal-leak-title"),q=s.getElementById("modal-leak-desc")
if(r==null||q==null)return
s=J.K(r)
if(a==="leak"){s.sV(r,"Leak status: LEAK REPORTED")
s=r.style
s.color="var(--alert-red)"
J.v(q,"A leak has been reported. Inspect the water line on site.")}else{s.sV(r,"Leak status: NO REPORT")
s=r.style
s.color="var(--alert-green)"
J.v(q,"No leak is currently reported. This is not an automatic sensor assessment.")}},
h1(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e="var(--amber-safety)",d={}
t.oT.a(a)
s=document.getElementById(b)
if(s==null)return
r=J.K(s)
r.sO(s,"")
if(a.length===0){r.sO(s,'<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:12px">No historic telemetry available.</div>')
return}q=B.e.dc(B.b.fX(a,new A.k5())*1.1,10,1000)
p=new A.cj(a,A.G(a).h("cj<1>"))
o=p.gaz(p).an(0,new A.k6(a,q),t.c).ap(0)
p=A.G(o)
n=p.h("c(1)")
p=p.h("a_<1,c>")
m=new A.a_(o,n.a(new A.k7()),p).Y(0," ")
if(0>=o.length)return A.e(o,0)
l=B.e.F(A.a3(J.l(o[0],"x")),1)
k=B.c.F(80,1)
p=new A.a_(o,n.a(new A.k8()),p).Y(0," ")
n=o.length
j=n-1
if(!(j>=0))return A.e(o,j)
j=B.e.F(A.a3(J.l(o[j],"x")),1)
n=B.c.F(80,1)
i=b==="resident-chart-container"
h=i?"res-chart-grad":"chart-area-grad"
g=i?"#3B82F6":e
f=i?"#3B82F6":e
d.a='      <svg width="100%" height="100%" viewBox="0 0 340 100" style="overflow:visible">\n        <defs>\n          <linearGradient id="'+h+'" x1="0" y1="0" x2="0" y2="1">\n            <stop offset="0%" stop-color="'+f+'" stop-opacity="0.3"/>\n            <stop offset="100%" stop-color="'+f+'" stop-opacity="0.0"/>\n          </linearGradient>\n        </defs>\n\n        <line x1="20" y1="20" x2="320" y2="20" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="50" x2="320" y2="50" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="80" x2="320" y2="80" stroke="#CBD5E1" stroke-width="1.5"/>\n\n        <path d="'+("M "+l+","+k+" "+p+(" L "+j+","+n+" Z"))+'" fill="url(#'+h+')" />\n        <polyline points="'+m+'" fill="none" stroke="'+g+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>\n    '
B.b.p(o,new A.k9(d,g))
r.sO(s,d.a+="</svg>")},
du(a){var s,r,q,p,o,n=document.getElementById("modal-historical-logs")
if(n==null)return
s=J.K(n)
s.sO(n,"")
r=$.P().c
q=A.G(r)
p=q.h("I<1>")
o=A.a8(new A.I(r,q.h("H(1)").a(new A.jU(a)),p),p.h("f.E"))
if(o.length===0)s.sO(n,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous repair logs recorded for this meter.</div>')
else B.b.p(o,new A.jV(this,n))},
cf(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this
if(f.a==null)return
s=document
r=s.getElementById("worker-name")
q=s.getElementById("worker-role")
p=s.getElementById("worker-zone-lbl")
o=s.getElementById("worker-avatar")
if(r!=null)J.v(r,A.ak(f.a.i(0,"name")))
if(q!=null)J.v(q,A.ak(f.a.i(0,"role")))
if(p!=null)J.v(p,"Assigned Zone: "+A.h(f.a.i(0,"selected_zone")))
if(o!=null){n=t.B
m=A.a8(new A.I(A.E(J.M(f.a.i(0,"name")).split(" "),t.s),t.Q.a(new A.jW()),n),n.h("f.E"))
n=A.G(m)
l=new A.a_(m,n.h("c(1)").a(new A.jX()),n.h("a_<1,c>")).Y(0,"")
n=l.length
J.v(o,B.a.n(l,0,n<2?n:2).toUpperCase())}n=$.P()
k=n.a.length
n=n.c
j=A.G(n)
i=new A.I(n,j.h("H(1)").a(new A.jY(f)),j.h("I<1>")).gj(0)
h=s.getElementById("profile-stat-total")
g=s.getElementById("profile-stat-logs")
if(h!=null)J.v(h,B.c.l(k))
if(g!=null)J.v(g,B.c.l(i))},
fG(){var s,r,q=this,p=document,o=t.G,n=o.a(p.getElementById("bill-meter-search")),m=p.getElementById("bill-meter-results"),l=o.a(p.getElementById("bill-curr-input")),k=t.q.a(p.getElementById("btn-save-bill"))
if(n==null)return
o=t.E
s=o.h("~(1)?")
o=o.c
A.z(n,"focus",s.a(new A.jp(q)),!1,o)
A.z(n,"input",s.a(new A.jq(q)),!1,o)
if(l!=null)A.z(l,"input",s.a(new A.jr(q)),!1,o)
A.z(p,"click",t.b9.a(new A.js(n,m)),!1,t.V)
if(k!=null){p=t.C
A.z(k,"click",p.h("~(1)?").a(new A.jt(q)),!1,p.c)}r=$.P().a
p=r.length
if(p!==0){if(0>=p)return A.e(r,0)
q.k4=A.ak(J.l(r[0],"house_id"))
if(0>=r.length)return A.e(r,0)
p=A.h(J.l(r[0],"owner_name"))
if(0>=r.length)return A.e(r,0)
B.f.sI(n,p+" ("+A.h(J.l(r[0],"account_number"))+")")
q.bw(q.k4)}},
cs(){var s,r,q,p,o=document,n=t.G.a(o.getElementById("bill-meter-search")),m=o.getElementById("bill-meter-results")
if(n==null||m==null)return
o=n.value
s=o==null?null:B.a.t(o.toLowerCase())
if(s==null)s=""
r=$.P().a
o=A.G(r)
q=o.h("I<1>")
p=A.a8(new A.I(r,o.h("H(1)").a(new A.ke(s)),q),q.h("f.E"))
o=J.K(m)
o.sO(m,"")
if(p.length===0){o.sO(m,'<div class="search-result-item" style="color:var(--text-muted); cursor:default">No households found</div>')
o=m.style
o.display="block"
return}B.b.p(p,new A.kf(this,n,m))
o=m.style
o.display="block"},
bw(a){var s,r,q,p,o,n=this,m=a!=null
if(m)n.k4=a
s=n.k4
if(s==null)return
r=$.P()
if(r.aq(s)==null)return
s=document
q=s.getElementById("bill-prev-reading")
p=t.G.a(s.getElementById("bill-curr-input"))
s=n.k4
s.toString
o=r.e_(s)
if(q!=null)J.v(q,o==null?"--":B.e.F(o,3))
if(m&&p!=null)B.f.sI(p,"")
n.bB()
m=n.k4
m.toString
n.h_(m)},
cA(){var s,r,q,p,o,n,m,l,k,j,i=null,h=t.N,g=t.z,f=A.nH($.P().w,h,g),e=document,d=e.getElementById("bill-prev-reading"),c=d==null?i:d.textContent
if(c==null)c=""
e=t.G.a(e.getElementById("bill-curr-input"))
if(e==null)s=i
else{e=e.value
e=e==null?i:B.a.t(e)
s=e}if(s==null)s=""
if(c==="--"||c.length===0||s.length===0)return i
r=A.dY(c)
q=A.dY(s)
if(!J.m(f.i(0,"configured"),!0)||r==null||q==null||!isFinite(r)||r<0||!isFinite(q)||q<0||q<r||q>1e6)return i
p=q*1000
e=B.e.aD(p)
if(Math.abs(p-e)>0.0001)return i
o=e-B.e.aD(r*1000)
if(o<0)return i
n=B.c.af(B.c.dc(o-B.e.aD(A.bJ(A.h(f.i(0,"included_m3")))*1000),0,1e9)*B.e.aD(A.bJ(A.h(f.i(0,"excess_rate")))*100)+500,1000)
m=A.bJ(B.e.F((B.e.aD(A.bJ(A.h(f.i(0,"base_rate")))*100)+B.e.aD(A.bJ(A.h(f.i(0,"environmental_fee")))*100)+n)/100,2))
l=A.bJ(B.e.F(o/1000,3))
k=A.bJ(B.e.F(n/100,2))
j=A.bJ(B.e.F(q,3))
return A.a2(["previous_reading",A.bJ(B.e.F(r,3)),"current_reading",j,"consumption",l,"excess_charge",k,"total_due",m,"billing_config_version",f.i(0,"version")],h,g)},
bB(){var s,r,q,p,o,n,m,l="configured",k="consumption",j="total_due",i=$.P(),h=A.nH(i.w,t.N,t.z),g=this.cA(),f=new A.ab(Date.now(),0,!1),e=""+A.bC(f)+"-"+B.a.a_(B.c.l(A.cl(f)),2,"0"),d=this.k4,c=d!=null&&i.c6(d,e)
i=new A.kn()
i.$2("bill-calc-base",J.m(h.i(0,l),!0)?A.h(h.i(0,"base_rate")):"--")
i.$2("bill-calc-fee",J.m(h.i(0,l),!0)?A.h(h.i(0,"environmental_fee")):"--")
i.$2("bill-rate-description",J.m(h.i(0,l),!0)?"Includes "+A.h(h.i(0,"included_m3"))+" m\xb3; excess at PHP "+A.h(h.i(0,"excess_rate"))+"/m\xb3.":"Admin must confirm billing rates before a bill can be recorded.")
d=g==null
i.$2("bill-calc-consumption",d?"0.000":B.e.F(A.a3(g.i(0,k)),3))
i.$2("bill-calc-excess",d?"0.00":B.e.F(A.a3(g.i(0,"excess_charge")),2))
i.$2("bill-calc-total",d?"--":B.e.F(A.a3(g.i(0,j)),2))
s=document
r=t.G.a(s.getElementById("bill-curr-input"))
if(r==null)q=null
else{r=r.value
r=r==null?null:B.a.t(r)
q=r}if(q==null)q=""
r=s.getElementById("bill-prev-reading")
r=r==null?null:r.textContent
p=A.dY(r==null?"":r)
o=A.dY(q)
if(c)n="A bill or pending bill already exists for this billing cycle ("+e+")."
else if(!J.m(h.i(0,l),!0))n="Admin must confirm billing rates before issuing new bills."
else if(q.length===0)n="Enter current reading at or above previous reading (up to 3 decimal places)."
else if(o==null||!isFinite(o)||o<0)n="Enter a valid non-negative reading (up to 3 decimal places)."
else if(p!=null&&o<p)n="Current reading cannot be lower than previous reading ("+B.e.F(p,3)+" m\xb3)."
else n=d?"Reading format invalid. Up to 3 decimal places supported.":"Draft: "+B.e.F(A.a3(g.i(0,k)),3)+" m\xb3 | Total Due: \u20b1"+B.e.F(A.a3(g.i(0,j)),2)
i.$2("billing-alert-banner",n)
m=t.q.a(s.getElementById("btn-save-bill"))
if(m!=null){m.disabled=this.ok||c||d
i=m.style
i.toString
d=m.disabled
d.toString
d=d?"0.5":"1"
B.r.cS(i,B.r.cB(i,"opacity"),d,"")}},
ba(){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0
var $async$ba=A.V(function(a1,a2){if(a1===1){o.push(a2)
s=p}for(;;)switch(s){case 0:if(m.ok||m.k4==null||m.a==null){s=1
break}l=m.cA()
d=new A.ab(Date.now(),0,!1)
k=""+A.bC(d)+"-"+B.a.a_(B.c.l(A.cl(d)),2,"0")
j=d.a5().a0()
if(l!=null){c=$.P()
b=m.k4
b.toString
b=c.c6(b,k)
c=b}else c=!0
if(c){s=1
break}c=$.P()
b=m.k4
b.toString
i=c.aq(b)
if(i==null){s=1
break}m.ok=!0
m.bB()
h=c.x
p=4
g=A.nH(l,t.N,t.z)
J.bn(g,"house_id",m.k4)
J.bn(g,"account_number",J.l(i,"account_number"))
J.bn(g,"billing_month",k)
J.bn(g,"date",j)
J.bn(g,"billed_by",m.a.i(0,"worker_id"))
s=7
return A.y(c.aI(g),$async$ba)
case 7:f=a2
if(h&&J.m(J.l(f,"is_synced"),!0))m.C("Bill successfully saved.")
else m.C("Bill saved offline. Pending synchronization.")
e=t.G.a(document.getElementById("bill-curr-input"))
if(e!=null)B.f.sI(e,"")
g=m.k4
g.toString
m.bw(g)
m.cf()
n.push(6)
s=5
break
case 4:p=3
a0=o.pop()
m.C("Unable to save the reading. Check storage and your session.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.ok=!1
m.bB()
s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$ba,r)},
h_(a){var s,r,q=document.getElementById("billing-history-list")
if(q==null)return
s=J.K(q)
s.sO(q,"")
r=$.P().bE(a)
if(r.length===0)s.sO(q,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous invoice logs recorded.</div>')
else B.b.p(r,new A.jB(this,q))},
bA(a,b,c){var s,r,q,p
if(b.length===0)return
try{s=$.dh().i(0,"NativeNotificationChannel")
if(s!=null){q=t.N
s.c2("postMessage",A.E([B.d.T(A.a2(["title",a,"body",b,"type",c,"timestamp",new A.ab(Date.now(),0,!1).a0()],q,q))],t.s))}}catch(p){r=A.am(p)
A.bL("Native notification channel error: "+A.h(r))}try{q=!!window.Notification
q.toString
if(q&&A.oS()==="granted")A.oR(a,b,"logo.png")
else{q=!!window.Notification
q.toString
if(q&&A.oS()!=="denied")A.rw().ci(new A.km(a,b),t.a)}}catch(p){}},
cu(a,b){var s=document,r=s.getElementById("app-toast"),q=s.getElementById("toast-text")
if(r!=null&&q!=null){J.v(q,a)
J.c7(r).m(0,"show")
s=this.p1
if(s!=null)s.a1(0)
this.p1=A.fU(A.lm(b,0),new A.kj(r))}},
C(a){return this.cu(a,2500)},
ct(a){var s,r,q,p,o,n,m,l,k,j=this,i=t.d.a(window.location).href
i.toString
if(A.cn(i).gaB().i(0,"role")==="worker"){A.bL("[SECURITY] Worker application is forbidden from loading Resident Portal.")
return}j.d=a
window.localStorage.setItem("waterhall_resident_session",a)
j.a=null
i=window.localStorage
i.toString
B.j.B(i,"waterhall_session")
i=j.CW
i===$&&A.aw()
J.c7(i).B(0,"active")
i=j.CW.style
i.display="none"
i=j.k3
i===$&&A.aw()
new A.aU(i,A.A(i).h("aU<2>")).p(0,new A.kg())
i=j.go
i===$&&A.aw()
i.setAttribute("style","display: none !important")
i=j.id
i===$&&A.aw()
i.setAttribute("style","display: flex !important")
i=j.k1
i===$&&A.aw()
if(i!=null){i=i.style
i.display="none"}s=$.P().aq(a)
if(s!=null){i=document
r=i.getElementById("resident-logout-name")
q=i.getElementById("resident-logout-role")
p=i.getElementById("resident-logout-avatar")
i=J.C(s)
o=i.i(s,"owner_name")
n=J.M(o==null?"":o)
if(r!=null)J.v(r,n.length!==0?n:a)
if(q!=null)J.v(q,A.h(i.i(s,"house_id"))+" \u2022 "+A.h(i.i(s,"purok")))
if(p!=null){i=t.B
m=A.a8(new A.I(A.E(n.split(" "),t.s),t.Q.a(new A.kh()),i),i.h("f.E"))
i=A.G(m)
l=new A.a_(m,i.h("c(1)").a(new A.ki()),i.h("a_<1,c>")).Y(0,"")
i=l.length
k=B.a.n(l,0,i<2?i:2).toUpperCase()
J.v(p,k.length!==0?k:"RES")}}j.a6("view-resident-home")
i=j.ay
if(i!=null)i.$0()},
dv(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6=this,c7=null,c8="has_reading",c9="main_tank_level",d0="turbidity",d1="var(--alert-red)",d2="var(--alert-green)",d3="owner_name",d4="house_id",d5="payment_location",d6="payment_method",d7="operating_hours",d8="payment_instructions",d9=c6.d
if(d9==null)return
s=$.P()
r=s.aq(d9)
if(r==null)return
q=s.cn("resident")
d9=document
p=d9.getElementById("resident-announcement-banner")
o=d9.getElementById("resident-announcement-message")
n=d9.getElementById("resident-announcement-tag")
if(p!=null&&o!=null)if(q!=null&&A.w(J.l(q,"message")).length!==0){m=J.C(q)
l=A.w(m.i(q,"message"))
J.v(o,l)
if(n!=null){k=m.i(q,"target_audience")
if(k==null)k="Everyone"
j=m.i(q,"author")
J.v(n,A.h(j==null?"Admin":j)+" \u2022 "+A.h(k))}i=p.style
i.display="flex"
h=A.h(m.i(q,"timestamp"))+"_"+l
if(c6.e!==h){c6.e=h
c6.bA("WaterHall Announcement",l,"announcement")}}else{m=p.style
m.display="none"}g=s.b
f=d9.getElementById("resident-tank-val")
e=d9.getElementById("resident-turb-val")
d=d9.getElementById("resident-tds-val")
c=d9.getElementById("resident-safety-status")
if(f!=null)J.v(f,J.m(g.i(0,c8),!1)||g.i(0,c9)==null?"N/A":A.h(g.i(0,c9))+"%")
if(e!=null)J.v(e,J.m(g.i(0,c8),!1)?"N/A":B.e.F(A.a3(g.i(0,d0)),1))
if(d!=null)J.v(d,J.m(g.i(0,c8),!1)?"N/A":A.h(g.i(0,"tds_ppm")))
if(c!=null)if(J.m(g.i(0,"turbidity_status"),"warning")){J.v(c,"ALERT")
m=c.style
m.color=d1
b=B.e.F(A.a3(g.i(0,d0)),1)
a="turbidity_"+b
if(c6.f!==a){c6.f=a
c6.bA("\u26a0\ufe0f WATER QUALITY ALERT","Water quality abnormal (Turbidity: "+b+" NTU). Follow local water authority guidance before using this supply.","critical")}}else{J.v(c,J.m(g.i(0,c8),!1)?"AWAITING DATA":"NO ALERT")
m=c.style
m.color=d2}a0=A.mS(g.i(0,c9))
if(!J.m(g.i(0,c8),!1)&&a0!=null&&a0<=20){m=A.h(a0)
a="low_water_"+m
if(c6.f!==a){c6.f=a
c6.bA("\u26a0\ufe0f LOW WATER LEVEL ALERT","Reservoir is critically low ("+m+"% remaining). Please conserve water.","warning")}}a1=d9.getElementById("resident-profile-name-home")
a2=d9.getElementById("resident-profile-meta-home")
if(a1!=null)J.v(a1,A.ak(J.l(r,d3)))
if(a2!=null){m=J.C(r)
J.v(a2,"Resident: "+A.h(m.i(r,d4))+" | Meter: "+A.h(m.i(r,"account_number"))+" | "+A.h(m.i(r,"purok")))}a3=d9.getElementById("resident-logout-name")
a4=d9.getElementById("resident-logout-role")
a5=d9.getElementById("resident-logout-avatar")
m=J.C(r)
i=m.i(r,d3)
a6=J.M(i==null?"":i)
if(a3!=null)J.v(a3,A.ak(a6.length!==0?a6:m.i(r,d4)))
if(a4!=null)J.v(a4,A.h(m.i(r,d4))+" \u2022 "+A.h(m.i(r,"purok")))
if(a5!=null){i=t.B
a7=A.a8(new A.I(A.E(a6.split(" "),t.s),t.Q.a(new A.jZ()),i),i.h("f.E"))
i=A.G(a7)
a8=new A.a_(a7,i.h("c(1)").a(new A.k_()),i.h("a_<1,c>")).Y(0,"")
i=a8.length
a9=B.a.n(a8,0,i<2?i:2).toUpperCase()
J.v(a5,a9.length!==0?a9:"RES")}b0=d9.getElementById("resident-leak-flag")
if(b0!=null){i=J.K(b0)
if(J.m(m.i(r,"current_leak_status"),"leak")){i.sO(b0,'          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n          <span>A leak has been reported. Please contact the water service team.</span>\n        ')
b0.className="reservoir-status-banner low"
i=b0.style
i.backgroundColor="var(--alert-red-bg)"
i=b0.style
i.borderColor="rgba(239, 68, 68, 0.3)"
i=b0.style
i.color=d1}else{i.sO(b0,'          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n          <span>No leak is currently reported. Report any water service concern in Support.</span>\n        ')
b0.className="reservoir-status-banner"
i=b0.style
i.backgroundColor="var(--alert-green-bg)"
i=b0.style
i.borderColor="rgba(16, 185, 129, 0.2)"
i=b0.style
i.color=d2}}i=c6.d
i.toString
b1=s.bE(i)
b2=B.a.n(new A.ab(Date.now(),0,!1).a5().a0(),0,7)
i=A.G(b1)
b3=i.h("H(1)")
i=i.h("I<1>")
b4=i.h("f.E")
b5=A.a8(new A.I(b1,b3.a(new A.k0()),i),b4)
b6=A.a8(new A.I(b1,b3.a(new A.k1(b2)),i),b4)
if(b5.length!==0)b7=B.b.gab(b5)
else if(b6.length!==0)b7=B.b.gab(b6)
else b7=b1.length!==0?B.b.gab(b1):c7
i=b7==null
b3=i?c7:J.l(b7,"billing_breakdown")
t.eO.a(b3)
b4=new A.k2()
b8=new A.k3()
b4.$2("resident-bill-cycle",i?"No recorded cycle":A.h(J.l(b7,"billing_month")))
b4.$2("resident-bill-status",i?"No unpaid or current bill":A.h(J.l(b7,"status")))
b4.$2("resident-prev-reading",b8.$2(i?c7:J.l(b7,"previous_reading"),3))
b4.$2("resident-curr-reading",b8.$2(i?c7:J.l(b7,"current_reading"),3))
b4.$2("resident-calc-consumption",b8.$2(i?c7:J.l(b7,"consumption"),3))
b4.$2("resident-calc-total",b8.$2(i?c7:J.l(b7,"total_due"),2))
b9=b3==null
b4.$2("resident-calc-base",b8.$2(b9?c7:J.l(b3,"base_rate"),2))
b4.$2("resident-calc-fee",b8.$2(b9?c7:J.l(b3,"environmental_fee"),2))
b4.$2("resident-calc-excess",b8.$2(b9?c7:J.l(b3,"excess_charge"),2))
if(i)c0=c7
else{b8=J.l(b7,"payment_date")
b8=b8==null?c7:J.M(b8)
c0=b8}if(c0==null)c0=""
b4.$2("resident-payment-date",!i&&A.h(J.l(b7,"status")).toLowerCase()==="paid"&&c0.length!==0?c0:"Not paid")
if(i)i="No billing record is on file yet. Amounts appear here after a Worker saves a meter reading."
else if(b9)i="Legacy bill: original total preserved; rate breakdown unavailable."
else{i=J.C(b3)
b3="Recorded rates: first "+A.h(i.i(b3,"included_m3"))+" m\xb3 included; excess PHP "+A.h(i.i(b3,"excess_rate"))+"/m\xb3."
i=b3}b4.$2("resident-rate-description",i)
c6.h1(A.aK(t.R.a(m.i(r,"monthly_history")),!0,t.w),"resident-chart-container")
c6.h0(b1)
c1=s.r
c2=d9.getElementById("res-payment-location")
c3=d9.getElementById("res-payment-method")
c4=d9.getElementById("res-payment-hours")
c5=d9.getElementById("res-payment-instructions")
if(c2!=null&&c1.L(0,d5)){d9=c1.i(0,d5)
d9.toString
J.v(c2,d9)}if(c3!=null&&c1.L(0,d6)){d9=c1.i(0,d6)
d9.toString
J.v(c3,d9)}if(c4!=null&&c1.L(0,d7)){d9=c1.i(0,d7)
d9.toString
J.v(c4,d9)}if(c5!=null&&c1.L(0,d8)){d9=c1.i(0,d8)
d9.toString
J.v(c5,d9)}},
h0(a){var s,r
t.p.a(a)
s=document.getElementById("resident-history-list")
if(s==null)return
r=J.K(s)
r.sO(s,"")
if(a.length===0){r.sO(s,'<div class="empty-state" style="padding:16px;text-align:center;color:var(--text-muted);font-size:13px;">No billing history is on file for this household yet.</div>')
return}B.b.p(a,new A.k4(this,s))},
eK(){var s,r=document,q=r.getElementById("btn-open-register-modal"),p=r.getElementById("register-user-modal"),o=t.dD.a(r.getElementById("resident-register-form")),n=r.getElementById("register-status"),m=t.q.a(r.getElementById("btn-submit-register"))
if(A.nS().gaB().i(0,"role")==="resident")if(q!=null){s=q.style
s.display="block"}s=t.h
A.eJ(s,s,"T","querySelectorAll")
s=r.querySelectorAll("[data-toggle-password]")
s.toString
s=new A.bj(s,t.U)
s.p(s,new A.iV())
r=r.getElementById("btn-close-register-modal")
if(r!=null){r=J.aa(r)
s=r.$ti
A.z(r.a,r.b,s.h("~(1)?").a(new A.iW(p)),!1,s.c)}if(q!=null){r=J.aa(q)
s=r.$ti
A.z(r.a,r.b,s.h("~(1)?").a(new A.iX(p,n)),!1,s.c)}if(o!=null){r=t.E
A.z(o,"submit",r.h("~(1)?").a(new A.iY(m,o,n)),!1,r.c)}},
ew(){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f="change",e=document,d=e.getElementById("btn-open-collect-modal"),c=e.getElementById("modal-collect-payment"),b=e.getElementById("btn-collect-cancel"),a=t.q.a(e.getElementById("btn-collect-confirm")),a0=t.G.a(e.getElementById("collect-amount-input")),a1=t.Z,a2=a1.a(e.getElementById("collect-payment-method"))
if(d!=null){s=J.aa(d)
r=s.$ti
A.z(s.a,s.b,r.h("~(1)?").a(new A.iz(g)),!1,r.c)}if(b!=null){s=J.aa(b)
r=s.$ti
A.z(s.a,s.b,r.h("~(1)?").a(new A.iA(c)),!1,r.c)}if(a!=null){s=t.C
A.z(a,"click",s.h("~(1)?").a(new A.iB(g,a0,a2,a,c)),!1,s.c)}s=t.iC
q=s.a(e.getElementById("resident-gallery-input"))
p=s.a(e.getElementById("resident-camera-input"))
o=s.a(e.getElementById("resident-photo-input"))
n=a1.a(e.getElementById("resident-issue-category"))
m=t.r.a(e.getElementById("resident-log-desc"))
a1=new A.iS(g,n,m)
s=new A.iT(g)
r=new A.iv(g,s,a1)
$.dh().k(0,"waterhallPhotoPickerResult",A.un(new A.iH(g,a1,r),t.Y))
l=new A.iR(g,a1)
k=new A.iy(g,q,p,o)
r=new A.iQ(g,r)
if(q!=null){j=t.E
A.z(q,f,j.h("~(1)?").a(new A.iI(r,q)),!1,j.c)}if(p!=null){j=t.E
A.z(p,f,j.h("~(1)?").a(new A.iJ(r,p)),!1,j.c)}if(o!=null){j=t.E
A.z(o,f,j.h("~(1)?").a(new A.iK(r,o)),!1,j.c)}r=e.getElementById("btn-resident-gallery-trigger")
if(r!=null){r=J.aa(r)
j=r.$ti
A.z(r.a,r.b,j.h("~(1)?").a(new A.iL(l,q)),!1,j.c)}r=e.getElementById("btn-resident-camera-trigger")
if(r!=null){r=J.aa(r)
j=r.$ti
A.z(r.a,r.b,j.h("~(1)?").a(new A.iM(l,p)),!1,j.c)}r=e.getElementById("btn-resident-photo-trigger")
if(r!=null){r=J.aa(r)
j=r.$ti
A.z(r.a,r.b,j.h("~(1)?").a(new A.iN(l,q)),!1,j.c)}r=e.getElementById("btn-resident-photo-replace-gallery")
if(r!=null){r=J.aa(r)
j=r.$ti
A.z(r.a,r.b,j.h("~(1)?").a(new A.iO(l,q)),!1,j.c)}r=e.getElementById("btn-resident-photo-replace-camera")
if(r!=null){r=J.aa(r)
j=r.$ti
A.z(r.a,r.b,j.h("~(1)?").a(new A.iC(l,p)),!1,j.c)}r=e.getElementById("btn-resident-photo-remove")
if(r!=null){r=J.aa(r)
j=r.$ti
A.z(r.a,r.b,j.h("~(1)?").a(new A.iD(g,k,a1)),!1,j.c)}r=new A.iP(g,a1)
if(m!=null){j=t.E
A.z(m,"input",j.h("~(1)?").a(r),!1,j.c)}if(n!=null){j=t.E
A.z(n,f,j.h("~(1)?").a(r),!1,j.c)}s=new A.iE(g,k,m,n,s,l)
g.ay=s
s.$0()
i=e.getElementById("btn-resident-submit-log")
if(i!=null){s=J.aa(i)
r=s.$ti
A.z(s.a,s.b,r.h("~(1)?").a(new A.iF(g,a1,k)),!1,r.c)}h=e.getElementById("btn-retry-db-connection")
if(h!=null){e=J.aa(h)
a1=e.$ti
A.z(e.a,e.b,a1.h("~(1)?").a(new A.iG(g)),!1,a1.c)}}}
A.jz.prototype={
$0(){var s,r,q,p,o=document.getElementById("phone-time")
if(o!=null){s=new A.ab(Date.now(),0,!1)
r=A.bX(s)
q=B.a.a_(B.c.l(A.cP(s)),2,"0")
p=r>=12?"PM":"AM"
r=B.c.ar(r,12)
J.v(o,""+(r!==0?r:12)+":"+q+" "+p)}},
$S:2}
A.jv.prototype={
$1(a){t.I.a(a)
return this.a.$0()},
$S:24}
A.jw.prototype={
$1(a){var s,r,q=this.a
q.av()
q.x=q.d=q.a=null;++q.z
q.Q=!1;++q.at
q.as=!1
s=q.fy
s===$&&A.aw()
r=t.h
A.eJ(r,r,"T","querySelectorAll")
s=s.querySelectorAll("[disabled]")
s.toString
s=new A.bj(s,t.U)
s.p(s,new A.ju())
q.ax=null
s=q.ch
if(s!=null)s.a1(0)
s=window.localStorage
s.toString
B.j.B(s,"waterhall_resident_report_draft")
q.w=q.c=null
s=document
r=s.getElementById("collection-review-modal")
if(r!=null)J.is(r)
r=s.getElementById("modal-collect-payment")
if(r!=null){r=r.style
r.display="none"}q.b4()
if(a)q.ah("Session expired. Please sign in again.",s.getElementById("login-error-msg"))},
$S:39}
A.ju.prototype={
$1(a){var s
t.h.a(a)
s=a.getAttribute("disabled")
a.removeAttribute("disabled")
return s},
$S:8}
A.jx.prototype={
$1(a){this.a.d2(t.P.a(a))},
$S:5}
A.jy.prototype={
$1(a){return this.dY(t.I.a(a))},
dY(a){var s=0,r=A.U(t.H),q,p=this,o,n,m
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:m=p.a
s=m.a!=null||m.d!=null?3:4
break
case 3:o=m.d!=null?"resident":"worker"
n=$.P()
s=5
return A.y(n.aN(o),$async$$1)
case 5:if(!n.M()){s=1
break}if(m.d!=null)m.dv()
else{n=m.b
if(n==="view-dashboard")m.bx()
else if(n==="view-directory")m.aO()}case 4:case 1:return A.S(q,r)}})
return A.T($async$$1,r)},
$S:42}
A.j3.prototype={
$1(a){t.V.a(a)
return this.a.cT()},
$S:1}
A.j_.prototype={
$1(a){return J.l(t.P.a(a),"sync_error")!=null},
$S:0}
A.j0.prototype={
$1(a){return J.l(t.P.a(a),"sync_error")!=null},
$S:0}
A.j1.prototype={
$1(a){return this.dR(t.V.a(a))},
dR(a){var s=0,r=A.U(t.H),q=this,p
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:q.b.disabled=!0
p=$.P()
s=2
return A.y(p.a7(),$async$$1)
case 2:s=3
return A.y(p.au(),$async$$1)
case 3:if(p.M())q.a.cT()
return A.S(null,r)}})
return A.T($async$$1,r)},
$S:4}
A.j2.prototype={
$1(a){t.V.a(a)
return B.a1.dt(this.a)},
$S:1}
A.j6.prototype={
$1(a){var s,r,q,p
t.V.a(a).preventDefault()
s=document
r=t.G.a(s.getElementById("login-password"))
q=s.getElementById("web-eye-show")
p=s.getElementById("web-eye-hide")
if(r!=null)if(r.type==="password"){B.f.scj(r,"text")
if(q!=null){s=q.style
s.display="none"}if(p!=null){s=p.style
s.display="block"}s=this.a.style
s.color="#F4D03F"}else{B.f.scj(r,"password")
if(q!=null){s=q.style
s.display="block"}if(p!=null){s=p.style
s.display="none"}s=this.a.style
s.color="var(--text-muted)"}},
$S:1}
A.j7.prototype={
$1(a){return this.dX(t.V.a(a))},
dX(a9){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
var $async$$1=A.V(function(b0,b1){if(b0===1){o.push(b1)
s=p}for(;;)switch(s){case 0:a9.preventDefault()
a=m.b
if(a==null)a0=null
else{a=a.value
a=a==null?null:B.a.t(a)
a0=a}l=a0==null?"":a0
a=m.c
if(a==null)a1=null
else{a=a.value
a=a==null?null:B.a.t(a)
a1=a}k=a1==null?"":a1
a=m.d
a2=a==null?null:a.value
j=a2==null?"":a2
a=t.d.a(window.location).href
a.toString
i=A.cn(a).gaB().i(0,"role")
if(J.ae(l)===0||J.ae(k)===0){m.a.ah("Both Username and Password are required.",m.e)
s=1
break}a=m.f
a.disabled=!0
p=4
a3=$.P()
a4=t.N
s=7
return A.y(a3.aa("/api/login",!1,"POST",A.a2(["Content-Type","application/json"],a4,a4),B.d.T(A.a2(["username",l,"password",k],a4,a4))),$async$$1)
case 7:h=b1
a5=h.responseText
a5.toString
g=t.P.a(B.d.K(0,a5))
f=A.w(J.l(g,"access_token"))
e=A.w(J.l(g,"role"))
d=A.w(J.l(g,"id"))
c=A.w(J.l(g,"name"))
a5=!0
if(!J.m(e,"admin"))if(!(J.m(i,"resident")&&!J.m(e,"resident")))a5=!J.m(i,"resident")&&!J.m(e,"worker")
if(a5){m.a.ah("Use the portal assigned to your account role.",m.e)
n=[1]
s=5
break}a3.dd()
a5=m.a
a5.w=null
s=8
return A.y(a3.aT(f),$async$$1)
case 8:s=9
return A.y(A.dg(),$async$$1)
case 9:s=10
return A.y(a3.b6(),$async$$1)
case 10:if(a3.M()){a3=window.localStorage.getItem("waterhall_jwt")
a6=f
a6=a3==null?a6!=null:a3!==a6
a3=a6}else a3=!0
if(a3){n=[1]
s=5
break}if(J.m(e,"resident")){if(J.m(i,"worker")){a5.ah("This terminal is for Field Workers only. Residents must use the Resident App.",m.e)
n=[1]
s=5
break}a3=window.localStorage
a3.toString
B.j.B(a3,"waterhall_session")
a5.a=null
a5.ct(d)
a5.av()
a5.bf("resident")
a3=m.e
if(a3!=null){a3=a3.style
a3.display="none"}a5.C(B.a.cm("Logged in as Resident: ",c))
n=[1]
s=5
break}else{if(J.m(i,"resident")){a5.ah("This portal is for Residents only. Field Workers must use the Worker App.",m.e)
n=[1]
s=5
break}a3=J.ae(j)!==0?j:"Purok 1"
a4=A.a2(["worker_id",d,"name",c,"role","Collector","selected_zone",a3],a4,t.z)
a5.a=a4
a3=window.localStorage
a3.toString
a3.setItem("waterhall_session",B.d.T(a4))
a4=window.localStorage
a4.toString
B.j.B(a4,"waterhall_resident_session")
a5.av()
a5.bf("worker")
a3=m.e
if(a3!=null){a3=a3.style
a3.display="none"}a3=a5.a
a3.toString
a5.cr(a3)
a5.C(B.a.cm("Logged in as Tech: ",c))
n=[1]
s=5
break}n.push(6)
s=5
break
case 4:p=3
a8=o.pop()
a3=A.am(a8)
if(a3 instanceof A.aH){b=a3
a3=b.c
if(a3==null)a3="Unable to sign in. Check your connection and credentials."
m.a.ah(a3,m.e)
n=[1]
s=5
break}n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
a.disabled=!1
s=n.pop()
break
case 6:a=$.P().y==="Session expired. Please sign in again."?"Session expired. Please sign in again.":"Unable to sign in. Check your credentials and connection. Existing offline sessions resume when the app opens."
m.a.ah(a,m.e)
case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$$1,r)},
$S:4}
A.j8.prototype={
$1(a){return this.dW(t.V.a(a))},
dW(a){var s=0,r=A.U(t.H),q=this,p
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:p=q.a
p.av()
s=2
return A.y($.P().de(),$async$$1)
case 2:p.C("Signed out of Tech session")
return A.S(null,r)}})
return A.T($async$$1,r)},
$S:4}
A.jg.prototype={
$1(a){return this.dV(t.V.a(a))},
dV(a){var s=0,r=A.U(t.H),q=this,p
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:p=q.a
p.av()
s=2
return A.y($.P().de(),$async$$1)
case 2:p.C("Signed out of Resident Portal")
return A.S(null,r)}})
return A.T($async$$1,r)},
$S:4}
A.jh.prototype={
$1(a){var s,r
t.h.a(a)
s=J.aa(a)
r=s.$ti
A.z(s.a,s.b,r.h("~(1)?").a(new A.j5(this.a,a)),!1,r.c)},
$S:8}
A.j5.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.b.getAttribute("data-target")
if(s==null)s=""
this.a.a6(s)},
$S:1}
A.ji.prototype={
$1(a){return this.a.aO()},
$S:3}
A.jj.prototype={
$1(a){return this.a.aO()},
$S:3}
A.jk.prototype={
$1(a){return this.a.aO()},
$S:3}
A.jl.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.a6("view-directory")
s.c=null},
$S:1}
A.jm.prototype={
$1(a){A.pG(t.V.a(a).target)},
$S:1}
A.jn.prototype={
$1(a){var s=0,r=A.U(t.H),q,p=this,o,n,m,l,k,j
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:k=p.a
j=k.c
if(j==null){s=1
break}o=p.b.checked
n=o===!0?"leak":"normal"
s=3
return A.y($.P().b8(j,n),$async$$1)
case 3:if(c!=null){j=document
m=j.getElementById("modal-flow-rate")
if(m!=null)J.v(m,"Manual report")
k.dH(n)
k.C(n==="leak"?"Leak status saved for synchronization.":"Resolved status saved for synchronization.")
o=k.c
o.toString
k.du(o)
l=t.aa.a(j.getElementById("log-resolved"))
if(l!=null)B.f.sd9(l,n==="normal")}case 1:return A.S(q,r)}})
return A.T($async$$1,r)},
$S:22}
A.j9.prototype={
$1(a){return this.dU(t.V.a(a))},
dU(a){var s=0,r=A.U(t.H),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$$1=A.V(function(b,a0){if(b===1)return A.R(a0,r)
for(;;)switch(s){case 0:c=p.a
if(c.c==null||c.a==null){s=1
break}o=document
n=t.r.a(o.getElementById("log-desc"))
m=n==null
if(m)l=null
else{k=n.value
k=k==null?null:B.a.t(k)
l=k}if(l==null)l=""
k=t.aa
j=k.a(o.getElementById("log-resolved"))
i=j==null?null:j.checked
h=i!==!1
if(l.length===0){c.C("Please detail the maintenance actions taken.")
s=1
break}g=A.a2(["house_id",c.c,"worker_id",c.a.i(0,"worker_id"),"purok",c.a.i(0,"selected_zone"),"description",l,"status_resolved",h,"date",new A.ab(Date.now(),0,!1).a5().a0()],t.N,t.z)
i=$.P()
s=3
return A.y(i.bk(g),$async$$1)
case 3:s=h?4:5
break
case 4:f=c.c
f.toString
s=6
return A.y(i.b8(f,"normal"),$async$$1)
case 6:e=k.a(o.getElementById("modal-leak-toggle"))
if(e!=null)B.f.sd9(e,!1)
c.dH("normal")
case 5:k=c.c
k.toString
if(i.aq(k)!=null){d=o.getElementById("modal-flow-rate")
if(d!=null)J.v(d,"Manual reading")}if(!m)B.l.sI(n,"")
c.C("Maintenance Log committed to database!")
o=c.c
o.toString
c.du(o)
c.bx()
case 1:return A.S(q,r)}})
return A.T($async$$1,r)},
$S:4}
A.ja.prototype={
$1(a){var s,r,q,p,o,n="selected_zone"
t.V.a(a)
s=this.a
if(s.a==null)return
r=document
q=t.Z
p=q.a(r.getElementById("filter-purok"))
o=q.a(r.getElementById("filter-status"))
if(p!=null)B.k.sI(p,A.ak(s.a.i(0,n)))
if(o!=null)B.k.sI(o,"leak")
s.a6("view-directory")
s.C("Showing leaks in your assigned patrol zone "+A.h(s.a.i(0,n)))},
$S:1}
A.jb.prototype={
$1(a){var s
t.V.a(a)
s=$.P().r.i(0,"emergency_contact")
if(s==null)s="Emergency contact is not configured; contact the Barangay office."
this.a.cu(s,6000)},
$S:1}
A.jc.prototype={
$1(a){return this.dT(t.V.a(a))},
dT(a){var s=0,r=A.U(t.H),q,p=this,o,n,m,l,k,j,i
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:i=p.a
if(i.a==null){s=1
break}o=document
n=t.r.a(o.getElementById("worker-announcement-input"))
m=t.Z.a(o.getElementById("worker-announcement-audience"))
o=n==null
if(o)l=null
else{k=n.value
k=k==null?null:B.a.t(k)
l=k}if(l==null)l=""
j=m==null?null:m.value
if(j==null)j="Everyone"
if(l.length===0){i.C("Message cannot be empty")
s=1
break}s=3
return A.y($.P().bi(l,A.w(i.a.i(0,"name")),j),$async$$1)
case 3:if(!o)B.l.sI(n,"")
i.C("Announcement queued for "+j+". Pending items retry when online.")
case 1:return A.S(q,r)}})
return A.T($async$$1,r)},
$S:4}
A.jd.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.a
if(s!=null){s=s.style
s.display="flex"}},
$S:1}
A.je.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.jf.prototype={
$1(a){return this.dS(t.V.a(a))},
dS(a8){var s=0,r=A.U(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
var $async$$1=A.V(function(a9,b0){if(a9===1){o.push(b0)
s=p}for(;;)switch(s){case 0:a8.preventDefault()
b=document
a=t.Z.a(b.getElementById("web-recover-role"))
a0=t.G
m=a0.a(b.getElementById("web-recover-username"))
l=a0.a(b.getElementById("web-recover-contact"))
k=a0.a(b.getElementById("web-recover-new-password"))
j=b.getElementById("web-recover-error")
i=b.getElementById("web-recover-success")
if(j!=null){b=j.style
b.display="none"}if(i!=null){b=i.style
b.display="none"}a1=a==null?null:a.value
h=a1==null?"":a1
b=m
if(b==null)a2=null
else{b=b.value
b=b==null?null:B.a.t(b)
a2=b}g=a2==null?"":a2
b=l
if(b==null)a3=null
else{b=b.value
b=b==null?null:B.a.t(b)
a3=b}f=a3==null?"":a3
b=k
if(b==null)a4=null
else{b=b.value
b=b==null?null:B.a.t(b)
a4=b}e=a4==null?"":a4
if(J.ae(g)===0||J.ae(f)===0||J.ae(e)===0){if(j!=null){J.v(j,"All fields are required.")
b=j.style
b.display="block"}s=1
break}p=4
b=$.P()
a0=t.N
a5=B.d.T(A.a2(["role",h,"username",g,"reset_token",f,"new_password",e],a0,a0))
s=7
return A.y(b.aa("/api/recover-account",!1,"POST",A.a2(["Content-Type","application/json"],a0,a0),a5),$async$$1)
case 7:d=b0
if(d.status===200){b=d.responseText
c=B.d.K(0,b==null?"{}":b)
if(i!=null){b=J.l(c,"message")
J.v(i,A.ak(b==null?"Password reset successfully!":b))
b=i.style
b.display="block"}if(m!=null)B.f.sI(m,"")
if(l!=null)B.f.sI(l,"")
if(k!=null)B.f.sI(k,"")
A.rj(A.lm(0,2),new A.j4(n.a,i),t.a)}p=2
s=6
break
case 4:p=3
a7=o.pop()
if(j!=null){J.v(j,"Verification failed. Please check details.")
b=j.style
b.display="block"}s=6
break
case 3:s=2
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$$1,r)},
$S:4}
A.j4.prototype={
$0(){var s=this.a
if(s!=null){s=s.style
s.display="none"}s=this.b
if(s!=null){s=s.style
s.display="none"}},
$S:15}
A.jo.prototype={
$1(a){return J.c7(t.h.a(a)).B(0,"active")},
$S:8}
A.ka.prototype={
$1(a){return J.c7(t.h.a(a)).B(0,"active")},
$S:8}
A.kb.prototype={
$1(a){return B.a.t(A.w(a)).length!==0},
$S:9}
A.kc.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:10}
A.kk.prototype={
$1(a){var s
t.h.a(a)
s=J.K(a)
if(a.getAttribute("data-target")===this.a)s.gal(a).m(0,"active")
else s.gal(a).B(0,"active")},
$S:8}
A.kl.prototype={
$2(a,b){var s
A.w(a)
t.h.a(b)
s=J.K(b)
if(a===this.a)s.gal(b).m(0,"active")
else s.gal(b).B(0,"active")},
$S:47}
A.jL.prototype={
$1(a){return J.m(J.l(t.P.a(a),"current_leak_status"),"leak")},
$S:0}
A.jM.prototype={
$1(a){var s,r,q
t.P.a(a)
s=document.createElement("div")
s.className="alert-item leak"
r=s.style
r.cursor="pointer"
r=J.C(a)
q=J.K(s)
q.sO(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.h(r.i(a,"owner_name"))+" ("+A.h(r.i(a,"purok"))+")</strong><br>\n              Reported leak. Field inspection required.\n            </div>\n          ")
q=q.gaA(s)
r=q.$ti
A.z(q.a,q.b,r.h("~(1)?").a(new A.jK(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:5}
A.jK.prototype={
$1(a){t.V.a(a)
this.a.cc(A.w(J.l(this.b,"house_id")))},
$S:1}
A.jN.prototype={
$1(a){var s,r,q
t.k.a(a)
s=document.createElement("div")
s.className="alert-item quality"
r=s.style
r.cursor="pointer"
r=J.C(a)
q=J.K(s)
q.sO(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.h(r.i(a,"name"))+"</strong><br>\n              "+A.h(r.i(a,"desc"))+"\n            </div>\n          ")
q=q.gaA(s)
r=q.$ti
A.z(q.a,q.b,r.h("~(1)?").a(new A.jJ(this.a)),!1,r.c)
this.b.appendChild(s).toString},
$S:72}
A.jJ.prototype={
$1(a){t.V.a(a)
this.a.a6("view-assets")},
$S:1}
A.jO.prototype={
$2(a,b){var s,r,q,p,o,n
A.w(b)
s=document.getElementById("pin-p"+(a+1))
if(s!=null){r=s.querySelector(".pin-bg")
q=B.b.a9(this.b,new A.jH(b))
if(r!=null)if(q){r.setAttribute("fill","var(--alert-red)")
r.setAttribute("stroke","#FFF")
r.setAttribute("stroke-width","1.5")}else{r.setAttribute("fill","var(--alert-green)")
r.removeAttribute("stroke")}p=s.style
p.cursor="pointer"
p=J.K(s)
o=t.h.a(p.fo(s,!0))
p.dz(s,o)
p=J.aa(o)
n=p.$ti
A.z(p.a,p.b,n.h("~(1)?").a(new A.jI(this.a,b)),!1,n.c)}},
$S:49}
A.jH.prototype={
$1(a){var s
t.P.a(a)
s=J.C(a)
return J.m(s.i(a,"purok"),this.a)&&J.m(s.i(a,"current_leak_status"),"leak")},
$S:0}
A.jI.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Z
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.k.sI(q,this.b)
if(p!=null)B.k.sI(p,"all")
this.a.a6("view-directory")},
$S:1}
A.jP.prototype={
$1(a){var s,r,q,p,o,n,m,l
A.w(a)
s=this.b
r=A.G(s)
q=r.h("H(1)")
r=r.h("I<1>")
p=new A.I(s,q.a(new A.jE(a)),r).gj(0)
o=new A.I(s,q.a(new A.jF(a)),r).gj(0)
r=this.a
n=J.m(r.a.i(0,"selected_zone"),a)
m=document.createElement("div")
m.className="zone-card "+(n?"assigned":"")
s=n?'<span class="zone-badge">ASSIGNED</span>':""
q=o>0?""+o+" Leaks":"Clear"
l=J.K(m)
l.sO(m,'          <div class="zone-card-header">\n            <span class="zone-name">'+a+"</span>\n            "+s+'\n          </div>\n          <div class="zone-stats">\n            <span>Meters: <strong>'+p+'</strong></span>\n            <span class="zone-leak-count">'+q+"</span>\n          </div>\n        ")
l=l.gaA(m)
q=l.$ti
A.z(l.a,l.b,q.h("~(1)?").a(new A.jG(r,a)),!1,q.c)
this.c.appendChild(m).toString},
$S:21}
A.jE.prototype={
$1(a){return J.m(J.l(t.P.a(a),"purok"),this.a)},
$S:0}
A.jF.prototype={
$1(a){var s
t.P.a(a)
s=J.C(a)
return J.m(s.i(a,"purok"),this.a)&&J.m(s.i(a,"current_leak_status"),"leak")},
$S:0}
A.jG.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Z
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.k.sI(q,this.b)
if(p!=null)B.k.sI(p,"all")
this.a.a6("view-directory")},
$S:1}
A.jQ.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i
t.P.a(a)
s=B.b.dg(this.b,new A.jC(a),new A.jD())
r=J.C(s)
q=r.gR(s)?r.i(s,"owner_name"):"Unknown Household"
p=document.createElement("div")
r=J.C(a)
p.className="log-card "+(J.m(r.i(a,"status_resolved"),!0)?"resolved":"pending")
o=r.i(a,"date")
o=A.dn(J.M(o==null?"":o))
n=o==null?null:o.bz()
if(n==null)m="Unknown date"
else{l=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
k=B.c.ar(A.bX(n),12)===0?12:B.c.ar(A.bX(n),12)
j=B.a.a_(B.c.l(A.cP(n)),2,"0")
i=A.bX(n)>=12?"PM":"AM"
o=A.cl(n)-1
if(!(o>=0&&o<12))return A.e(l,o)
m=l[o]+" "+A.dV(n)+" "+k+":"+j+" "+i}J.dj(p,'            <div class="log-card-header">\n              <span>'+A.h(q)+'</span>\n              <span style="font-size:10px; color:var(--text-muted)">'+m+'</span>\n            </div>\n            <div class="log-card-desc">'+A.h(r.i(a,"description"))+"</div>\n          ")
this.c.appendChild(p).toString},
$S:5}
A.jC.prototype={
$1(a){var s="house_id"
return J.m(J.l(t.P.a(a),s),J.l(this.a,s))},
$S:0}
A.jD.prototype={
$0(){return A.ap(t.N,t.z)},
$S:29}
A.jS.prototype={
$1(a){var s,r,q,p,o
t.P.a(a)
s=J.C(a)
r=this.a
q=B.a.A(J.M(s.i(a,"owner_name")).toLowerCase(),r)||B.a.A(J.M(s.i(a,"account_number")).toLowerCase(),r)||B.a.A(J.M(s.i(a,"house_id")).toLowerCase(),r)
r=this.b
p=r==="all"||J.m(s.i(a,"purok"),r)
r=this.c
o=r==="all"||J.m(s.i(a,"current_leak_status"),r)
return q&&p&&o},
$S:0}
A.jT.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j="current_leak_status",i="current_m3_usage"
t.P.a(a)
s=document.createElement("div")
r=J.C(a)
s.className="household-card "+(J.m(r.i(a,j),"leak")?"has-leak":"")
q=A.h(r.i(a,"owner_name"))
p=A.h(r.i(a,"purok"))
o=A.h(r.i(a,"account_number"))
n=A.h(r.i(a,i))
m=A.h(r.i(a,j))
l=J.m(r.i(a,j),"leak")?'<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> Leak':'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Normal'
k=J.K(s)
k.sO(s,'          <div class="household-info">\n            <span class="household-name">'+q+'</span>\n            <div class="household-meta">\n              <span class="household-purok">'+p+'</span>\n              <span class="household-acct">'+o+'</span>\n            </div>\n            <div class="household-usage">Usage this Month: <strong>'+n+' m\xb3</strong></div>\n          </div>\n          <div class="household-status-section">\n            <span class="status-indicator '+m+'">\n              '+l+'\n            </span>\n            <span class="household-flow">Meter: <span>'+A.h(r.i(a,i))+" m\xb3</span></span>\n          </div>\n        ")
k=k.gaA(s)
r=k.$ti
A.z(k.a,k.b,r.h("~(1)?").a(new A.jR(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:5}
A.jR.prototype={
$1(a){t.V.a(a)
this.a.cc(A.w(J.l(this.b,"house_id")))},
$S:1}
A.jA.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.a6("view-directory")
s.c=null},
$S:1}
A.k5.prototype={
$2(a,b){A.a3(a)
A.a3(b)
return a>b?a:b},
$S:51}
A.k6.prototype={
$1(a){var s,r,q
t.if.a(a)
s=a.a
r=a.b
q=this.a.length
return A.a2(["x",20+(q===1?0.5:s/(q-1))*300,"y",80-r/this.b*60,"val",r,"label",""+(s+1)],t.N,t.K)},
$S:52}
A.k7.prototype={
$1(a){var s
t.c.a(a)
s=J.C(a)
return B.e.F(A.a3(s.i(a,"x")),1)+","+B.e.F(A.a3(s.i(a,"y")),1)},
$S:28}
A.k8.prototype={
$1(a){var s
t.c.a(a)
s=J.C(a)
return"L "+B.e.F(A.a3(s.i(a,"x")),1)+","+B.e.F(A.a3(s.i(a,"y")),1)},
$S:28}
A.k9.prototype={
$1(a){var s,r
t.c.a(a)
s=this.a
r=J.C(a)
s.a=s.a+('        <text x="'+A.h(r.i(a,"x"))+'" y="96" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-weight="600">'+A.h(r.i(a,"label"))+'</text>\n        <line x1="'+A.h(r.i(a,"x"))+'" y1="'+A.h(r.i(a,"y"))+'" x2="'+A.h(r.i(a,"x"))+'" y2="80" stroke="rgba(249,115,22,0.2)" stroke-width="1" stroke-dasharray="2 2" />\n        <circle cx="'+A.h(r.i(a,"x"))+'" cy="'+A.h(r.i(a,"y"))+'" r="4" fill="var(--white)" stroke="'+this.b+'" stroke-width="2" />\n        <text x="'+A.h(r.i(a,"x"))+'" y="'+A.h(A.a3(r.i(a,"y"))-8)+'" text-anchor="middle" fill="var(--navy-primary)" font-size="9" font-weight="700">'+A.h(r.i(a,"val"))+"m\xb3</text>\n      ")},
$S:71}
A.jU.prototype={
$1(a){return J.m(J.l(t.P.a(a),"house_id"),this.a)},
$S:0}
A.jV.prototype={
$1(a){var s,r,q,p,o,n,m,l="status_resolved"
t.P.a(a)
s=document.createElement("div")
r=J.C(a)
s.className="log-card "+(J.m(r.i(a,l),!0)?"resolved":"pending")
q=r.i(a,"date")
q=A.dn(J.M(q==null?"":q))
p=q==null?null:q.bz()
o=p==null?"Unknown date":""+A.cl(p)+"/"+A.dV(p)+"/"+A.bC(p)+" @ "+B.a.a_(B.c.l(A.bX(p)),2,"0")+":"+B.a.a_(B.c.l(A.cP(p)),2,"0")
q=A.h(r.i(a,"worker_id"))
n=A.h(r.i(a,"description"))
m=J.m(r.i(a,l),!0)?"var(--alert-green)":"var(--amber-safety)"
r=J.m(r.i(a,l),!0)?"Resolved":"In Progress (Active Monitoring)"
J.dj(s,'          <div class="log-card-header">\n            <span>Tech: <strong>'+q+'</strong></span>\n            <span style="font-size:10px; color:var(--text-muted)">'+o+'</span>\n          </div>\n          <div class="log-card-desc">'+n+'</div>\n          <div style="font-size: 9px; font-weight:700; color:'+m+'; margin-top:4px; text-transform:uppercase">\n            Status: '+r+"\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:5}
A.jW.prototype={
$1(a){return B.a.t(A.w(a)).length!==0},
$S:9}
A.jX.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:10}
A.jY.prototype={
$1(a){var s,r="worker_id"
t.P.a(a)
s=J.C(a)
return J.m(s.i(a,r),this.a.a.i(0,r))&&J.m(s.i(a,"status_resolved"),!0)},
$S:0}
A.jp.prototype={
$1(a){return this.a.cs()},
$S:3}
A.jq.prototype={
$1(a){return this.a.cs()},
$S:3}
A.jr.prototype={
$1(a){return this.a.bB()},
$S:3}
A.js.prototype={
$1(a){var s=t.mV.a(A.pG(t.V.a(a).target)),r=!1
if(s!=null)if(!B.f.A(this.a,s)){r=this.b
r=r!=null&&!J.nu(r,s)}if(r){r=this.b.style
r.display="none"}},
$S:1}
A.jt.prototype={
$1(a){t.V.a(a)
return this.a.ba()},
$S:1}
A.ke.prototype={
$1(a){var s,r
t.P.a(a)
s=J.C(a)
r=this.a
return B.a.A(J.M(s.i(a,"owner_name")).toLowerCase(),r)||B.a.A(J.M(s.i(a,"account_number")).toLowerCase(),r)},
$S:0}
A.kf.prototype={
$1(a){var s,r,q,p
t.P.a(a)
s=document.createElement("div")
s.className="search-result-item"
r=J.C(a)
q=J.K(s)
q.sV(s,A.h(r.i(a,"owner_name"))+" ("+A.h(r.i(a,"account_number"))+")")
q=q.gaA(s)
r=this.c
p=q.$ti
A.z(q.a,q.b,p.h("~(1)?").a(new A.kd(this.a,this.b,a,r)),!1,p.c)
r.appendChild(s).toString},
$S:5}
A.kd.prototype={
$1(a){var s,r,q,p=this
t.V.a(a)
s=p.c
r=J.C(s)
B.f.sI(p.b,A.h(r.i(s,"owner_name"))+" ("+A.h(r.i(s,"account_number"))+")")
q=p.d.style
q.display="none"
p.a.bw(A.ak(r.i(s,"house_id")))},
$S:1}
A.kn.prototype={
$2(a,b){var s=document.getElementById(a)
if(s!=null)J.v(s,b)},
$S:7}
A.jB.prototype={
$1(a){var s,r,q,p,o,n,m="status"
t.P.a(a)
s=document.createElement("div")
r=J.C(a)
s.className="bill-record-card "+A.h(r.i(a,m))
q=r.i(a,"date")
q=A.dn(J.M(q==null?"":q))
p=q==null?null:q.bz()
o=p==null?"Unknown date":""+A.cl(p)+"/"+A.dV(p)+"/"+A.bC(p)+" "+B.a.a_(B.c.l(A.bX(p)),2,"0")+":"+B.a.a_(B.c.l(A.cP(p)),2,"0")
q=A.h(r.i(a,"billing_month"))
n=J.m(r.i(a,m),"Paid")?"var(--alert-green)":"var(--amber-safety)"
J.dj(s,'          <div class="bill-record-header">\n            <span>Cycle: '+q+'</span>\n            <span style="color:'+n+'">'+J.M(r.i(a,m)).toUpperCase()+'</span>\n          </div>\n          <div class="bill-record-details">\n            <span>Readings: '+B.e.F(A.a3(r.i(a,"previous_reading")),1)+" \u2192 "+B.e.F(A.a3(r.i(a,"current_reading")),1)+" m\xb3</span>\n            <strong>\u20b1"+B.e.F(A.a3(r.i(a,"total_due")),2)+'</strong>\n          </div>\n          <div style="font-size:9px;color:var(--text-muted);margin-top:2px;display:flex;justify-content:space-between">\n            <span>'+o+" ("+A.h(r.i(a,"bill_id"))+")</span>\n            <span>Tech: "+A.h(r.i(a,"billed_by"))+"</span>\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:5}
A.km.prototype={
$1(a){if(A.w(a)==="granted")A.oR(this.a,this.b,"logo.png")},
$S:55}
A.kj.prototype={
$0(){J.c7(this.a).B(0,"show")},
$S:2}
A.kg.prototype={
$1(a){return J.c7(t.h.a(a)).B(0,"active")},
$S:8}
A.kh.prototype={
$1(a){return B.a.t(A.w(a)).length!==0},
$S:9}
A.ki.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:10}
A.jZ.prototype={
$1(a){return B.a.t(A.w(a)).length!==0},
$S:9}
A.k_.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:10}
A.k0.prototype={
$1(a){return A.h(J.l(t.P.a(a),"status")).toLowerCase()!=="paid"},
$S:0}
A.k1.prototype={
$1(a){return J.m(J.l(t.P.a(a),"billing_month"),this.a)},
$S:0}
A.k2.prototype={
$2(a,b){var s=document.getElementById(a)
if(s!=null)J.v(s,b)},
$S:7}
A.k3.prototype={
$2(a,b){return a==null?"--":B.e.F(A.bJ(A.h(a)),b)},
$S:56}
A.k4.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c="status",b="payment_date"
t.P.a(a)
s=document
r=s.createElement("div")
q=J.C(a)
r.className="bill-record-card "+A.h(q.i(a,c))
p=q.i(a,"date")
p=A.dn(J.M(p==null?"":p))
o=p==null?null:p.bz()
n=o==null?"Unknown date":""+A.cl(o)+"/"+A.dV(o)+"/"+A.bC(o)+" "+B.a.a_(B.c.l(A.bX(o)),2,"0")+":"+B.a.a_(B.c.l(A.cP(o)),2,"0")
p=A.h(q.i(a,"billing_month"))
m=J.m(q.i(a,c),"Paid")?"var(--alert-green)":"var(--amber-safety)"
l=J.M(q.i(a,c))
k=B.e.F(A.a3(q.i(a,"previous_reading")),1)
j=B.e.F(A.a3(q.i(a,"current_reading")),1)
i=B.e.F(A.a3(q.i(a,"consumption")),1)
h=B.e.F(A.a3(q.i(a,"total_due")),2)
g=A.h(q.i(a,"bill_id"))
if(J.m(q.i(a,c),"Paid")){f=q.i(a,b)
f=J.M(f==null?"":f).length!==0}else f=!1
f=f?" | Paid: "+A.h(q.i(a,b)):""
J.dj(r,'        <div class="bill-record-header">\n          <span>Cycle: '+p+'</span>\n          <span style="color:'+m+'">'+l.toUpperCase()+'</span>\n        </div>\n        <div class="bill-record-details">\n          <span>Usage: '+k+" \u2192 "+j+" m\xb3 ("+i+" m\xb3)</span>\n          <strong>\u20b1"+h+'</strong>\n        </div>\n        <div style="font-size:9px;color:var(--text-muted);margin-top:2px;">\n          Bill Ref ID: '+g+" | Issued: "+n+f+"\n        </div>\n      ")
e=t.eO.a(q.i(a,"billing_breakdown"))
d=s.createElement("p")
s=d.style
s.fontSize="11px"
if(e==null)s="Legacy bill: rate breakdown unavailable. Original total retained."
else{s=J.C(e)
s="Recorded: base PHP "+A.h(s.i(e,"base_rate"))+" (includes "+A.h(s.i(e,"included_m3"))+" m\xb3), excess "+A.h(s.i(e,"excess_m3"))+" m\xb3 x PHP "+A.h(s.i(e,"excess_rate"))+" = PHP "+A.h(s.i(e,"excess_charge"))+", environmental fee PHP "+A.h(s.i(e,"environmental_fee"))+"."}B.t.sV(d,s)
r.appendChild(d).toString
this.b.appendChild(r).toString},
$S:5}
A.iV.prototype={
$1(a){var s,r
t.h.a(a)
s=J.aa(a)
r=s.$ti
A.z(s.a,s.b,r.h("~(1)?").a(new A.iU(a)),!1,r.c)},
$S:8}
A.iU.prototype={
$1(a){var s,r,q,p,o
t.V.a(a).preventDefault()
s=t.f_.a(this.a)
r=document
r.toString
q=s.getAttribute("data-"+new A.hd(new A.ed(s)).b2("togglePassword"))
p=t.G.a(r.getElementById(q==null?"":q))
if(p==null)return
o=p.type==="password"
B.f.scj(p,o?"text":"password")
B.n.sV(s,o?"Hide":"Show")},
$S:1}
A.iW.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.iX.prototype={
$1(a){return this.dQ(t.V.a(a))},
dQ(a){var s=0,r=A.U(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h,g,f
var $async$$1=A.V(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:g=o.a
if(g!=null){g=g.style
g.display="flex"}g=o.b
k=g==null
if(!k)J.v(g,"Loading available puroks...")
q=3
s=6
return A.y($.P().fh("/api/puroks",!1),$async$$1)
case 6:n=c
m=t.gH.a(document.getElementById("reg-res-purok"))
j=m
j.children.toString
J.ip(j)
j=n.responseText
j.toString
j=J.b4(t.R.a(J.l(B.d.K(0,j),"puroks")))
while(j.q()){l=j.gu(j)
J.qM(m,A.rx(A.h(l),A.h(l),null,!1))}if(!k){A.eJ(t.af,t.h,"T","querySelectorAll")
i=new A.bj(J.qI(m,"option"),t.gp)
J.v(g,new A.e3(t.e3.a(i.ap(i)),t.eG).gj(0)===0?"No puroks configured. Contact the administrator.":"")}q=1
s=5
break
case 3:q=2
f=p.pop()
if(!k)J.v(g,"Registration needs an internet connection. Please retry.")
s=5
break
case 2:s=1
break
case 5:return A.S(null,r)
case 1:return A.R(p.at(-1),r)}})
return A.T($async$$1,r)},
$S:4}
A.iY.prototype={
$1(a){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c
var $async$$1=A.V(function(b,a0){if(b===1){o.push(a0)
s=p}for(;;)switch(s){case 0:a.preventDefault()
h=m.a
g=!0
if(h!=null){f=h.disabled
f.toString
if(!f){g=m.b.checkValidity()
g.toString
g=!g}}if(g){s=1
break}l=new A.iZ()
if(!J.m(l.$1("reg-password"),l.$1("reg-verify-password"))){h=m.c
if(h!=null)J.v(h,"Passwords do not match.")
s=1
break}h.disabled=!0
g=m.c
f=g==null
if(!f)J.v(g,"Submitting registration...")
p=4
e=t.N
s=7
return A.y($.P().aa("/api/residents/register",!1,"POST",A.a2(["Content-Type","application/json"],e,e),B.d.T(A.a2(["owner_name",J.or(l.$1("reg-res-name")),"contact",J.or(l.$1("reg-contact")),"purok",t.gH.a(document.getElementById("reg-res-purok")).value,"password",l.$1("reg-password"),"verify_password",l.$1("reg-verify-password")],e,t.jv))),$async$$1)
case 7:k=a0
e=k.responseText
e.toString
j=B.d.K(0,e)
m.b.reset()
if(!f)J.v(g,"Registration submitted. Resident ID: "+A.h(J.l(j,"house_id"))+". Meter ID: "+A.h(J.l(j,"account_number"))+". Wait for Admin approval before signing in.")
n.push(6)
s=5
break
case 4:p=3
c=o.pop()
e=A.am(c)
if(e instanceof A.aH){i=e
if(!f){if(i.a===409)f="This mobile number is already registered. Contact the administrator."
else f=i.a===400?"Check your name, Philippine mobile number, purok, and matching passwords (12-128 characters).":"Registration was not confirmed. Retry with the same contact, or ask Admin to check its status."
J.v(g,f)}}else if(!f)J.v(g,"Unable to submit registration. Please try again.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
h.disabled=!1
s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$$1,r)},
$S:22}
A.iZ.prototype={
$1(a){var s=t.fY.a(document.getElementById(a)).value
return s==null?"":s},
$S:10}
A.iz.prototype={
$1(a){t.V.a(a)
this.a.C("Field payment collection is disabled. Payments must be settled in-person at Barangay Hall.")},
$S:1}
A.iA.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.iB.prototype={
$1(a){return this.dP(t.V.a(a))},
dP(a0){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a
var $async$$1=A.V(function(a1,a2){if(a1===1){o.push(a2)
s=p}for(;;)switch(s){case 0:b=m.a
if(b.c==null||b.a==null){s=1
break}h=m.b
h=h==null?null:h.value
g=A.dY(h==null?"":h)
l=g==null?0:g
h=l
if(typeof h!=="number"){q=h.ha()
s=1
break}if(h<=0){b.C("Please enter a valid payment amount!")
s=1
break}h=m.c
f=h==null?null:h.value
k=f==null?"Cash":f
h=b.a.i(0,"worker_id")
if(h==null)h=b.a.i(0,"name")
j=J.M(h==null?"Collector":h)
h=m.d
h.disabled=!0
p=4
e=$.P()
d=b.c
d.toString
s=7
return A.y(e.bu(l,j,d,k),$async$$1)
case 7:i=a2
d=m.e
if(d!=null){e=d.style
e.display="none"}b.C("Collection recorded! TxID: "+A.h(J.l(i,"transaction_id")))
e=b.c
e.toString
b.cc(e)
n.push(6)
s=5
break
case 4:p=3
a=o.pop()
b.C("Collection not saved. Check device storage and existing pending payments.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
h.disabled=!1
s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$$1,r)},
$S:4}
A.iS.prototype={
$0(){var s,r,q,p,o,n,m,l=this.a
if(l.d==null||!$.P().M())return
try{s=window.localStorage
s.toString
r=A.bl()
q=this.b
q=q==null?null:q.value
p=this.c
p=p==null?null:p.value
o=l.w
n=document.getElementById("resident-photo-name")
n=n==null?null:n.textContent
s.setItem("waterhall_resident_report_draft",B.d.T(A.a2(["owner",r,"category",q,"description",p,"photo",o,"file_name",n,"operation_id",l.ax,"picker_pending",l.x!=null],t.N,t.X)))}catch(m){l.C("Device storage is full. Keep this screen open to retain your draft.")}},
$S:2}
A.iT.prototype={
$2(a,b){var s,r,q,p,o
this.a.w=a
s=document
r=s.getElementById("resident-photo-name")
if(r!=null)J.v(r,b)
q=s.getElementById("resident-photo-preview")
r=q==null
if(!r)J.nw(q).aw(0)
if(!r){p=q.style
p.display="block"}o=A.oE(a)
B.F.sff(o,"Selected evidence preview")
if(!r)q.appendChild(o).toString
r=s.getElementById("resident-photo-preview-card")
if(r!=null){r=r.style
r.display="block"}s=s.getElementById("resident-photo-pickers")
if(s!=null){s=s.style
s.display="none"}},
$S:7}
A.iv.prototype={
dM(a2,a3){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$$2=A.V(function(a4,a5){if(a4===1){o.push(a5)
s=p}for(;;)switch(s){case 0:a=m.a
a0=++a.z
a.Q=!0
l=window.localStorage.getItem("waterhall_jwt")
p=4
k=A.nL("^data:image/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$").df(a2)
if(k==null)throw A.b(B.v)
if(a2.length<=2796302){e=k.b
if(2>=e.length){q=A.e(e,2)
n=[1]
s=5
break}e=e[2]
e.toString
e=B.u.b3(e).length>2097152}else e=!0
if(e){e=A.ah("Photo too large")
throw A.b(e)}j=A.oE(null)
i=new A.bi(new A.Q($.O,t.cU),t.ou)
e=t.h
d=t.E
c=d.h("~(1)?")
d=d.c
h=A.z(e.a(j),"load",c.a(new A.iw(i)),!1,d)
g=A.z(e.a(j),"error",c.a(new A.ix(i)),!1,d)
p=7
J.r1(j,a2)
s=10
return A.y(i.a.dE(0,B.D),$async$$2)
case 10:e=j.naturalWidth
e.toString
d=j.naturalHeight
d.toString
if(e*d>12e6)throw A.b(B.v)
n.push(9)
s=8
break
case 7:n=[4]
case 8:p=4
s=11
return A.y(J.iq(h),$async$$2)
case 11:s=12
return A.y(J.iq(g),$async$$2)
case 12:s=n.pop()
break
case 9:if(!J.m(a0,a.z)||!J.m(l,window.localStorage.getItem("waterhall_jwt"))||a.d==null){n=[1]
s=5
break}a.ax=null
m.b.$2(a2,a3)
m.c.$0()
n.push(6)
s=5
break
case 4:p=3
a1=o.pop()
f=A.am(a1)
if(!J.m(a0,a.z)||!J.m(l,window.localStorage.getItem("waterhall_jwt"))||a.d==null){n=[1]
s=5
break}a.C(f instanceof A.bq?"Photo must be at most 2 MiB.":"Invalid image. Use a JPEG, PNG or WebP photo.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.m(a0,a.z))a.Q=!1
s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$$2,r)},
$2(a,b){return this.dM(a,b)},
$S:57}
A.iw.prototype={
$1(a){var s=this.a
if((s.a.a&30)===0)s.fp(0)},
$S:3}
A.ix.prototype={
$1(a){var s=this.a
if((s.a.a&30)===0)s.bl(B.v)},
$S:3}
A.iH.prototype={
$4(a,b,c,d){var s=this.a
if(s.d==null||a==null||!J.m(a,s.x))return
s.x=null
this.b.$0()
if(typeof d=="string"&&d.length!==0){s.C(d)
return}if(typeof b=="string"&&b.length!==0){s=typeof c=="string"&&c.length!==0?c:"Selected photo"
this.c.$2(b,s)}},
$C:"$4",
$R:4,
$S:58}
A.iR.prototype={
$2(a,b){var s,r,q,p,o,n="NativePhotoPicker",m=this.a
if(m.d==null||m.as||!$.P().M())return
r=$.dh()
if(!r.bo(n)){m=a==null
if(!m)B.f.sI(a,"")
if(!m)a.click()
return}if(m.x!=null)return
s=""+1000*Date.now()+"-"+ ++m.y
m.x=s
q=this.b
q.$0()
try{p=t.N
r.i(0,n).c2("postMessage",A.E([B.d.T(A.a2(["request_id",s,"source",b],p,p))],t.s))}catch(o){m.x=null
q.$0()
m.C("Could not open the photo picker. Please try again.")}},
$S:59}
A.iy.prototype={
$0(){var s,r,q=this,p=q.a;++p.z
p.Q=!1
p.w=null
p=q.b
if(p!=null)B.f.sI(p,"")
p=q.c
if(p!=null)B.f.sI(p,"")
p=q.d
if(p!=null)B.f.sI(p,"")
p=document
s=p.getElementById("resident-photo-name")
if(s!=null)J.v(s,"No file chosen")
r=p.getElementById("resident-photo-preview")
if(r!=null)J.nw(r).aw(0)
s=p.getElementById("resident-photo-preview-card")
if(s!=null){s=s.style
s.display="none"}p=p.getElementById("resident-photo-pickers")
if(p!=null){p=p.style
p.display="flex"}},
$S:2}
A.iQ.prototype={
$1(a){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c
var $async$$1=A.V(function(b,a0){if(b===1){o.push(a0)
s=p}for(;;)switch(s){case 0:d=m.a
if(d.d==null||d.as){s=1
break}h=a==null?null:a.files
if(h==null||h.length===0){s=1
break}l=B.a7.gab(h)
g=l.size
g.toString
if(g>2097152){d.C("Photo must be at most 2 MiB.")
s=1
break}g=l.type
if(!B.b.A(A.E(["image/jpeg","image/png","image/webp"],t.s),g.toLowerCase())){d.C("Use a JPEG, PNG or WebP photo.")
s=1
break}k=window.localStorage.getItem("waterhall_jwt")
j=++d.z
d.Q=!0
p=4
g=new FileReader()
g.toString
B.a8.fW(g,l)
i=g
s=7
return A.y(new A.cq(t.O.a(i),"load",!1,t.h6).gab(0).dE(0,B.D),$async$$1)
case 7:if(!J.m(j,d.z)||!J.m(k,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}g=A.w(J.qT(i))
f=l.name
f.toString
s=8
return A.y(m.b.$2(g,f),$async$$1)
case 8:n.push(6)
s=5
break
case 4:p=3
c=o.pop()
if(J.m(j,d.z)&&J.m(k,window.localStorage.getItem("waterhall_jwt")))d.C("Could not load selected photo.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.m(j,d.z))d.Q=!1
s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$$1,r)},
$S:60}
A.iI.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iJ.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iK.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iL.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iM.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"camera")},
$S:1}
A.iN.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iO.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iC.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"camera")},
$S:1}
A.iD.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s.as)return
s.ax=s.x=null
this.b.$0()
this.c.$0()
s.C("Photo removed.")},
$S:1}
A.iP.prototype={
$1(a){var s,r=this.a
r.ax=null
s=r.ch
if(s!=null)s.a1(0)
r.ch=A.fU(B.a6,this.b)},
$S:3}
A.iE.prototype={
$0(){var s,r,q,p,o=this,n="category",m=o.a
if(m.d==null)return
o.b.$0()
try{r=window.localStorage.getItem("waterhall_resident_report_draft")
s=B.d.K(0,r==null?"{}":r)
if(!J.m(J.l(s,"owner"),A.bl()))return
r=o.c
if(r!=null){q=A.ak(J.l(s,"description"))
B.l.sI(r,q==null?"":q)}if(typeof J.l(s,n)=="string"){r=o.d
if(r!=null)B.k.sI(r,A.ak(J.l(s,n)))}m.ax=A.ak(J.l(s,"operation_id"))
if(typeof J.l(s,"photo")=="string"){r=A.w(J.l(s,"photo"))
q=A.ak(J.l(s,"file_name"))
if(q==null)q="Selected photo"
o.e.$2(r,q)}if(J.m(J.l(s,"picker_pending"),!0))o.f.$2(null,"recover")}catch(p){m.C("Draft could not be restored. Please select your photo again.")}},
$S:2}
A.iF.prototype={
$1(a){return this.dO(t.V.a(a))},
dO(a9){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
var $async$$1=A.V(function(b0,b1){if(b0===1){o.push(b1)
s=p}for(;;)switch(s){case 0:a7=m.a
if(a7.d==null||a7.as){s=1
break}if(a7.x!=null||a7.Q){a7.C("Finish or cancel the photo picker first.")
s=1
break}c=document
b=t.Z.a(c.getElementById("resident-issue-category"))
l=t.r.a(c.getElementById("resident-log-desc"))
a=b==null?null:b.value
k=a==null?"Water Leak":a
c=l
if(c==null)a0=null
else{c=c.value
c=c==null?null:B.a.t(c)
a0=c}j=a0==null?"":a0
if(J.ae(j)===0){a7.C("Please provide details for the report!")
s=1
break}if(!$.P().M()){s=1
break}i=window.localStorage.getItem("waterhall_jwt")
if(a7.ax==null)a7.ax=A.im()
c=a7.ch
if(c!=null)c.a1(0)
m.b.$0()
a7.as=!0
h=++a7.at
c=a7.fy
c===$&&A.aw()
a1=t.h
A.eJ(a1,a1,"T","querySelectorAll")
c=c.querySelectorAll("button, input, textarea, select")
c.toString
a1=t.U
a2=a1.h("I<k.E>")
a3=A.a8(new A.I(new A.bj(c,a1),a1.h("H(k.E)").a(new A.iu()),a2),a2.h("f.E"))
g=a3
for(c=g,a1=c.length,a4=0;a4<c.length;c.length===a1||(0,A.av)(c),++a4)c[a4].setAttribute("disabled","")
p=4
c=$.P()
a1=a7.d
a1.toString
a2=a7.w
a5=a7.ax
a5.toString
s=7
return A.y(c.bc(a1,k,j,a2,a5),$async$$1)
case 7:f=b1
if(!J.m(i,window.localStorage.getItem("waterhall_jwt"))||a7.d==null){n=[1]
s=5
break}if(!f)throw A.b(B.m)
a7.C("Report submitted successfully.")
if(l!=null)B.l.sI(l,"")
m.c.$0()
a7.ax=null
c=window.localStorage
c.toString
B.j.B(c,"waterhall_resident_report_draft")
n.push(6)
s=5
break
case 4:p=3
a8=o.pop()
c=A.am(a8)
if(c instanceof A.aH){e=c
if(e.b||!J.m(i,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}if(e.a===413)c="Photo is too large. Choose a smaller photo; your draft is retained."
else if(e.a===400||e.a===422)c="Report or photo was rejected. Review your draft and retry."
else c=e.a===403?"This account cannot submit this report. Your draft is retained.":"Report was not confirmed. Your draft and photo are retained; retry when connected."
a7.C(c)}else if(J.m(i,window.localStorage.getItem("waterhall_jwt")))a7.C("Report was not confirmed. Your draft and photo are retained.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.m(h,a7.at)){a7.as=!1
for(a7=g,c=a7.length,a4=0;a4<a7.length;a7.length===c||(0,A.av)(a7),++a4){d=a7[a4]
d.removeAttribute("disabled")}}s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$$1,r)},
$S:4}
A.iu.prototype={
$1(a){var s
t.h.a(a)
s=a.id
s.toString
if(s!=="btn-resident-logout"){s=a.hasAttribute("disabled")
s.toString
s=!s}else s=!1
return s},
$S:61}
A.iG.prototype={
$1(a){return this.dN(t.V.a(a))},
dN(a){var s=0,r=A.U(t.H),q=this,p
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:p=q.a
p.C("Testing server connection...")
s=2
return A.y($.P().b6(),$async$$1)
case 2:if(c)p.C("Server connected! Online sync active.")
else p.C("Server unreachable. Continuing in offline mode.")
return A.S(null,r)}})
return A.T($async$$1,r)},
$S:4}
A.aH.prototype={
gh6(){var s=this.a
return s==null||s===429||s>=500},
l(a){return"API request was not completed."}}
A.kv.prototype={
d5(a){return this.as=this.as.d8(new A.ky()).ci(new A.kz(a),t.H)},
aT(a){return this.e5(a)},
e5(a){var s=0,r=A.U(t.H),q=1,p=[],o=this,n,m,l
var $async$aT=A.V(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:m=++o.Q
window.localStorage.setItem("waterhall_jwt",a)
o.y=null
q=3
s=6
return A.y(o.d5(a),$async$aT)
case 6:if(!J.m(m,o.Q)||!o.M())throw A.b(B.i)
q=1
s=5
break
case 3:q=2
l=p.pop()
s=J.m(m,o.Q)?7:8
break
case 7:s=9
return A.y(o.am(!0),$async$aT)
case 9:case 8:throw A.b(B.i)
s=5
break
case 2:s=1
break
case 5:return A.S(null,r)
case 1:return A.R(p.at(-1),r)}})
return A.T($async$aT,r)},
am(a){var s=0,r=A.U(t.H),q=1,p=[],o=this,n,m,l,k
var $async$am=A.V(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:++o.Q
n=window
n.toString
m=document.createEvent("Event")
m.toString
J.qH(m,"waterhall-session-ending",!0,!0)
n.dispatchEvent(m).toString
o.x=!1
m=window.localStorage
m.toString
B.j.B(m,"waterhall_jwt")
m=window.localStorage
m.toString
B.j.B(m,"waterhall_session")
m=window.localStorage
m.toString
B.j.B(m,"waterhall_resident_session")
o.dd()
o.y=a?"Session expired. Please sign in again.":null
n=o.at
if(n!=null)n.$1(a)
n=o.ax
n.m(0,o.W())
q=3
s=6
return A.y(o.d5(null),$async$am)
case 6:q=1
s=5
break
case 3:q=2
k=p.pop()
o.y="Unable to clear native session storage. Please restart the app."
n.m(0,o.W())
s=5
break
case 2:s=1
break
case 5:return A.S(null,r)
case 1:return A.R(p.at(-1),r)}})
return A.T($async$am,r)},
de(){return this.am(!1)},
M(){if(A.de())return!0
if(window.localStorage.getItem("waterhall_jwt")!=null||window.localStorage.getItem("waterhall_session")!=null||window.localStorage.getItem("waterhall_resident_session")!=null)this.am(!0)
return!1},
bQ(){var s=this
s.x=!1
s.y="Server unavailable. Pending operations remain saved and will retry."
s.ax.m(0,s.W())},
aa(a,b,c,d,e){return this.fi(a,b,c,t.lG.a(d),e)},
c0(a,b,c,d){return this.aa(a,!0,b,c,d)},
fh(a,b){return this.aa(a,b,"GET",null,null)},
fg(a){return this.aa(a,!0,"GET",null,null)},
fi(a9,b0,b1,b2,b3){var s=0,r=A.U(t.la),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
var $async$aa=A.V(function(b5,b6){if(b5===1){o.push(b6)
s=p}for(;;)switch(s){case 0:a5=A.nS().dA(a9)
a6=J.qS(a5)
a7=A.nS()
if(a6!==a7.gcd(a7)||!B.a.N(J.op(a5),"/api/"))throw A.b(B.m)
if(b0&&!m.M())throw A.b(B.i)
l=m.Q
k=window.localStorage.getItem("waterhall_jwt")
a6=new XMLHttpRequest()
a6.toString
j=a6
i=new A.bi(new A.Q($.O,t.ax),t.cz)
h=A.E([],t.dw)
g=null
f=new A.kG(i)
p=4
J.qX(j,b1,a9)
if(b2==null){a6=t.N
a6=A.ap(a6,a6)}else a6=b2
a6.p(0,J.qV(j))
if(b0)J.r2(j,"Authorization","Bearer "+A.h(k))
a6=t.O
a7=t.gn
a2=t.D
J.nt(h,A.z(a6.a(j),"load",a7.a(new A.kC(i,j)),!1,a2))
J.nt(h,A.z(a6.a(j),"error",a7.a(new A.kD(f)),!1,a2))
J.nt(h,A.z(a6.a(j),"abort",a7.a(new A.kE(f)),!1,a2))
g=A.fU(B.a5,new A.kF(f,j))
J.r_(j,b3)
s=7
return A.y(i.a,$async$aa)
case 7:e=b6
if(b0)a6=!J.m(l,m.Q)||!m.M()
else a6=!1
if(a6)throw A.b(B.i)
if(e.status===401&&b0){m.am(!0)
throw A.b(B.Q)}a6=!0
if(e.status!=null){a7=e.status
a7.toString
if(a7>=200){a6=e.status
a6.toString
a6=a6>=300}}if(a6){d=null
if(!b0&&J.op(a5)==="/api/login"){d=e.status===429?"Too many attempts. Please try again in 5 minutes.":"Invalid credentials."
try{a6=e.responseText
c=B.d.K(0,a6==null?"{}":a6)
b=J.l(c,"attempts_remaining")
if(e.status===401&&A.eG(b)&&b>=0&&b<=4)d="Invalid credentials. "+A.h(b)+" attempts remaining."
if(e.status===403)d=J.m(J.l(c,"account_status"),"pending")?"Registration is pending Admin approval.":"Registration was rejected. Contact the administrator."}catch(b4){}}a6=e.status===0?null:e.status
a7=d
throw A.b(new A.aH(a6,!1,a7))}q=e
n=[1]
s=5
break
n.push(6)
s=5
break
case 4:p=3
a8=o.pop()
a=A.am(a8)
if(!J.m(l,m.Q))throw A.b(B.i)
a0=a instanceof A.aH?a:B.m
if(!a0.b&&a0.gh6())m.bQ()
throw A.b(a0)
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
a6=g
if(a6!=null)J.iq(a6)
a6=h,a7=a6.length,a4=0
case 8:if(!(a4<a6.length)){s=10
break}a1=a6[a4]
s=11
return A.y(J.iq(a1),$async$aa)
case 11:case 9:a6.length===a7||(0,A.av)(a6),++a4
s=8
break
case 10:s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$aa,r)},
W(){var s,r,q,p,o,n,m=this,l=m.aQ().length+m.ag().length,k=m.x
if(!k)s="offline"
else if(m.ch)s="syncing"
else s=l>0?"pending_sync":"synced"
r=m.ch||m.ay
q=A.de()
p=m.aQ()
o=A.G(p)
o=new A.I(p,o.h("H(1)").a(new A.kR()),o.h("I<1>")).gj(0)
p=m.ag()
n=A.G(p)
return A.a2(["status",s,"isOnline",k,"isSyncing",r,"authenticated",q,"reviewCount",o+new A.I(p,n.h("H(1)").a(new A.kS()),n.h("I<1>")).gj(0),"pendingCount",l,"error",m.y],t.N,t.z)},
fd(){var s=window.localStorage.getItem("waterhall_unsynced_actions")
s=J.di(t.j.a(B.d.K(0,s==null?"[]":s)),new A.kB(),t.P)
s=A.a8(s,s.$ti.h("ag.E"))
return s},
ag(){var s=this.fd(),r=A.G(s),q=r.h("I<1>")
s=A.a8(new A.I(s,r.h("H(1)").a(new A.l2()),q),q.h("f.E"))
return s},
ao(a,b){return this.fV(a,t.P.a(b))},
fV(a,b){var s=0,r=A.U(t.H),q=this,p
var $async$ao=A.V(function(c,d){if(c===1)return A.R(d,r)
for(;;)switch(s){case 0:if(!q.M())throw A.b(B.i)
p=b.i(0,"operation_id")
if(p==null)p=A.im()
b.k(0,"operation_id",p)
s=2
return A.y(A.cB("actions",new A.l3(p,a,b)),$async$ao)
case 2:q.ax.m(0,q.W())
s=q.x?3:4
break
case 3:s=5
return A.y(q.a7(),$async$ao)
case 5:case 4:return A.S(null,r)}})
return A.T($async$ao,r)},
a7(){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$a7=A.V(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:if(m.ay||!m.M()){s=1
break}m.ay=!0
l=m.Q
f=m.ag()
B.b.bb(f,new A.l7())
k=f
p=4
e=k,e=A.nO(e,0,A.cx(100,"count",t.S),A.G(e).c),d=e.$ti,e=new A.bA(e,e.gj(0),d.h("bA<ag.E>")),c=t.N,d=d.h("ag.E")
case 7:if(!e.q()){s=8
break}b=e.d
j=b==null?d.a(b):b
if(!J.m(l,m.Q)||!m.M()){s=8
break}s=9
return A.y(A.cB("actions",new A.l8(j)),$async$a7)
case 9:p=11
s=14
return A.y(m.c0(A.w(J.l(j,"endpoint")),"POST",A.a2(["Content-Type","application/json"],c,c),B.d.T(J.l(j,"body"))),$async$a7)
case 14:i=a3
b=i.responseText
h=B.d.K(0,b==null?"{}":b)
if(!J.m(l,m.Q)||!m.M()){s=8
break}if(!J.m(J.l(h,"status"),"success"))throw A.b(B.R)
s=15
return A.y(A.cB("actions",new A.l9(j)),$async$a7)
case 15:p=4
s=13
break
case 11:p=10
a0=o.pop()
b=A.am(a0)
s=b instanceof A.aH?16:18
break
case 16:g=b
if(!g.b){b=g.a
b=b==null||b===429||b>=500}else b=!0
if(b)throw a0
s=19
return A.y(A.cB("actions",new A.la(j)),$async$a7)
case 19:s=17
break
case 18:throw a0
case 17:s=13
break
case 10:s=4
break
case 13:s=7
break
case 8:if(J.m(l,m.Q))m.y=B.b.a9(m.ag(),new A.lb())?"Saved operations need review. Their original data remains on this device.":null
n.push(6)
s=5
break
case 4:p=3
a1=o.pop()
if(J.m(l,m.Q)&&A.de()&&m.x)m.y="Pending operations remain saved for retry."
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.ay=!1
m.ax.m(0,m.W())
s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$a7,r)},
dd(){var s,r,q,p=this
for(s=B.I.gaz(B.I),s=s.gD(s);s.q();){r=s.gu(s)
q=r.a
if(q!=="offlineCollections"&&q!=="unsyncedActions"){q=window.localStorage
r=r.b
q.getItem(r)
q.removeItem(r)}}s=t.t
p.a=A.E([],s)
p.d=A.E([],s)
p.e=A.E([],s)
p.c=A.E([],s)
p.f=A.E([],s)
s=t.N
r=t.z
p.b=A.ap(s,r)
p.r=A.ap(s,s)
p.w=A.ap(s,r)},
eN(){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=window.localStorage.getItem("waterhall_households")
if(s!=null)i.a=A.aK(t.R.a(B.d.K(0,s)),!0,t.P)
r=window.localStorage.getItem("waterhall_central_assets")
if(r!=null)i.b=A.aq(t.f.a(B.d.K(0,r)),t.N,t.z)
q=window.localStorage.getItem("waterhall_maintenance_logs")
if(q!=null)i.c=A.aK(t.R.a(B.d.K(0,q)),!0,t.P)
p=window.localStorage.getItem("waterhall_workers")
if(p!=null)i.d=A.aK(t.R.a(B.d.K(0,p)),!0,t.P)
o=window.localStorage.getItem("waterhall_billing_records")
if(o!=null)i.e=A.aK(t.R.a(B.d.K(0,o)),!0,t.P)
n=window.localStorage.getItem("waterhall_announcements")
if(n!=null)i.f=A.aK(t.R.a(B.d.K(0,n)),!0,t.P)
m=window.localStorage.getItem("waterhall_billing_config")
if(m!=null)i.w=A.aq(t.f.a(B.d.K(0,m)),t.N,t.z)
l=window.localStorage.getItem("waterhall_payment_settings")
k=t.N
if(l!=null)i.r=A.aq(t.f.a(B.d.K(0,l)),k,k)
else i.r=A.aq($.q4,k,k)}catch(j){A.bL("Unable to load local cache.")}},
aH(){var s,r,q=this
try{s=window.localStorage
s.toString
s.setItem("waterhall_households",B.d.T(q.a))
s=window.localStorage
s.toString
s.setItem("waterhall_central_assets",B.d.T(q.b))
s=window.localStorage
s.toString
s.setItem("waterhall_maintenance_logs",B.d.T(q.c))
s=window.localStorage
s.toString
s.setItem("waterhall_workers",B.d.T(q.d))
s=window.localStorage
s.toString
s.setItem("waterhall_billing_records",B.d.T(q.e))
s=window.localStorage
s.toString
s.setItem("waterhall_announcements",B.d.T(q.f))
s=window.localStorage
s.toString
s.setItem("waterhall_payment_settings",B.d.T(q.r))
s=window.localStorage
s.toString
s.setItem("waterhall_billing_config",B.d.T(q.w))}catch(r){A.bL("Unable to save local cache.")}},
aN(a){return this.fY(a)},
b6(){return this.aN("")},
fY(a){var s=0,r=A.U(t.y),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b
var $async$aN=A.V(function(a0,a1){if(a0===1){o.push(a1)
s=p}for(;;)switch(s){case 0:if(m.z||!m.M()){q=!1
s=1
break}m.z=!0
p=4
l=a.length!==0?"/api/all-data?role="+a:"/api/all-data"
s=7
return A.y(m.fg(l),$async$aN)
case 7:k=a1
h=k.responseText
h.toString
g=t.P
j=g.a(B.d.K(0,h))
h=J.l(j,"billingConfig")
if(h==null){h=t.z
h=A.ap(h,h)}f=t.f
e=t.N
d=t.z
m.w=A.aq(f.a(h),e,d)
h=t.R
m.a=A.aK(h.a(J.l(j,"households")),!0,g)
m.b=A.aq(f.a(J.l(j,"centralAssets")),e,d)
m.c=A.aK(h.a(J.l(j,"maintenanceLogs")),!0,g)
m.d=A.aK(h.a(J.l(j,"workers")),!0,g)
m.e=A.aK(h.a(J.l(j,"billingRecords")),!0,g)
if(J.nv(j,"announcements"))m.f=A.aK(h.a(J.l(j,"announcements")),!0,g)
if(J.nv(j,"paymentSettings"))m.r=A.aq(f.a(J.l(j,"paymentSettings")),e,e)
m.aH()
m.x=!0
m.ax.m(0,m.W())
s=8
return A.y(m.a7(),$async$aN)
case 8:if(m.x&&m.M())m.au()
h=m.x&&A.de()
q=h
n=[1]
s=5
break
n.push(6)
s=5
break
case 4:p=3
b=o.pop()
i=A.am(b)
if(!(i instanceof A.aH)||!i.b)m.bQ()
q=!1
n=[1]
s=5
break
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.z=!1
s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$aN,r)},
ac(){var s=0,r=A.U(t.y),q,p=this,o,n,m
var $async$ac=A.V(function(a,b){if(a===1)return A.R(b,r)
for(;;)switch(s){case 0:p.M()
A.nQ(B.a4,new A.kX(p))
o=window
o.toString
n=t.oV
m=t.A
A.z(o,"focus",n.a(new A.kY(p)),!1,m)
o=window
o.toString
B.O.c_(o,"waterhall-session-expired",new A.kZ(p))
o=window
o.toString
B.O.c_(o,"waterhall-request-unavailable",new A.l_(p))
s=3
return A.y(A.dg(),$async$ac)
case 3:p.eN()
if(p.b.a===0)p.b=A.aq($.uS,t.N,t.z)
if(p.r.a===0){o=t.N
p.r=A.aq($.q4,o,o)}o=window
o.toString
A.z(o,"online",n.a(new A.l0(p)),!1,m)
o=window
o.toString
A.z(o,"offline",n.a(new A.l1(p)),!1,m)
s=4
return A.y(p.b6(),$async$ac)
case 4:q=b
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$ac,r)},
dZ(){var s,r,q,p=window.localStorage.getItem("waterhall_offline_collections")
if(p==null)return A.E([],t.t)
try{s=t.j.a(B.d.K(0,p))
r=J.di(s,new A.kH(),t.P)
r=A.a8(r,r.$ti.h("ag.E"))
return r}catch(q){r=A.E([],t.t)
return r}},
aQ(){var s=this.dZ(),r=A.G(s),q=r.h("I<1>")
r=A.a8(new A.I(s,r.h("H(1)").a(new A.kQ()),q),q.h("f.E"))
return r},
bu(a,b,c,a0){var s=0,r=A.U(t.P),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d
var $async$bu=A.V(function(a1,a2){if(a1===1)return A.R(a2,r)
for(;;)switch(s){case 0:if(!p.M())throw A.b(B.i)
o=p.r.i(0,"allow_worker_collection")
if((o==null?null:o.toLowerCase())!=="true")throw A.b(A.ah("Field payment collection is disabled under the Barangay-only payment policy. All payments must be made at the Barangay Hall."))
n=new A.ab(Date.now(),0,!1).a5()
m=A.im()
l=A.a2(["transaction_id",m,"bill_id",null,"house_id",c,"amount_collected",a,"date",n.a0(),"collected_by",b,"payment_method",a0,"sync_status","PENDING","synced_at",null],t.N,t.X)
s=3
return A.y(A.cB("collections",new A.l5(c,b,l)),$async$bu)
case 3:o=p.ax
o.m(0,p.W())
k=B.a.t(c.toUpperCase())
for(j=p.e,i=j.length,h=0;h<j.length;j.length===i||(0,A.av)(j),++h){g=j[h]
f=J.C(g)
e=f.i(g,"house_id")
d=B.a.t(J.M(e==null?"":e).toUpperCase())
e=f.i(g,"bill_id")
B.a.t(J.M(e==null?"":e).toUpperCase())
e=d===k&&!J.m(f.i(g,"status"),"Paid")
if(e){f.k(g,"status","Pending sync")
f.k(g,"payment_status","Pending sync")}}p.aH()
A.bL("[OFFLINE STORE] Collection recorded locally: "+m+" for "+c+" (\u20b1"+A.h(a)+"). Status: PENDING.")
if(p.x)p.au()
else o.m(0,p.W())
q=l
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$bu,r)},
au(){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d
var $async$au=A.V(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:if(m.ch||!m.M()){s=1
break}i=m.aQ()
B.b.bb(i,new A.lc())
l=A.nO(i,0,A.cx(100,"count",t.S),A.G(i).c).ap(0)
if(J.ae(l)===0){m.ax.m(0,m.W())
s=1
break}m.ch=!0
h=m.ax
h.m(0,m.W())
k=m.Q
p=4
g=l
f=A.G(g)
j=new A.a_(g,f.h("@(1)").a(new A.ld()),f.h("a_<1,@>")).dF(0)
s=7
return A.y(A.cB("collections",new A.le(j)),$async$au)
case 7:s=8
return A.y(m.a8(l,k),$async$au)
case 8:if(J.m(k,m.Q)&&m.M())m.y=B.b.a9(m.aQ(),new A.lf())?"Some collections need review. Unacknowledged payments remain saved.":null
n.push(6)
s=5
break
case 4:p=3
d=o.pop()
if(J.m(k,m.Q)&&A.de()&&m.x)m.y="Sync not confirmed. Pending records remain saved for retry."
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.ch=!1
h.m(0,m.W())
s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$au,r)},
a8(a,b){return this.fa(t.p.a(a),b)},
fa(a,b){var s=0,r=A.U(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c
var $async$a8=A.V(function(a0,a1){if(a0===1){o.push(a1)
s=p}for(;;)switch(s){case 0:if(b!==n.Q||!n.M())throw A.b(B.i)
m=null
p=4
g=t.N
s=7
return A.y(n.c0("/api/collections/sync","POST",A.a2(["Content-Type","application/json"],g,g),B.d.T(A.a2(["collections",a],g,t.p))),$async$a8)
case 7:l=a1
f=l.responseText
k=t.P.a(B.d.K(0,f==null?"{}":f))
j=J.l(k,"synced_ids")
if(J.m(J.l(k,"status"),"success")&&t.j.b(j)){g=J.r4(j,g)
e=A.ci(g.$ti.h("f.E"))
e.S(0,g)}else e=A.oM(g)
m=e
p=2
s=6
break
case 4:p=3
c=o.pop()
g=A.am(c)
s=g instanceof A.aH?8:10
break
case 8:i=g
if(i.b||!B.b.A(A.E([400,403,404,409,422],t.b),i.a))throw c
g=a.length
s=g>1?11:12
break
case 11:h=g/2|0
s=13
return A.y(n.a8(B.b.cw(a,0,h),b),$async$a8)
case 13:s=14
return A.y(n.a8(B.b.e6(a,h),b),$async$a8)
case 14:s=1
break
case 12:if(b!==n.Q||!n.M())throw A.b(B.i)
g=i.a===409?"Bill or transaction conflict. Review before retrying.":"Collection rejected (HTTP "+A.h(i.a)+"). Review before retrying."
s=15
return A.y(n.b0(a,A.oM(t.N),g),$async$a8)
case 15:s=1
break
s=9
break
case 10:throw c
case 9:s=6
break
case 3:s=2
break
case 6:if(b!==n.Q||!n.M())throw A.b(B.i)
s=16
return A.y(n.b0(a,m,"Server did not acknowledge this collection. Retry required."),$async$a8)
case 16:n.x=!0
case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$a8,r)},
b0(a,b,c){return this.f2(t.p.a(a),t.i.a(b),c)},
f2(a,b,c){var s=0,r=A.U(t.H),q=this,p
var $async$b0=A.V(function(d,e){if(d===1)return A.R(e,r)
for(;;)switch(s){case 0:p=A.G(a)
s=2
return A.y(A.cB("collections",new A.kw(new A.a_(a,p.h("@(1)").a(new A.kx()),p.h("a_<1,@>")).dF(0),b,c)),$async$b0)
case 2:q.ax.m(0,q.W())
return A.S(null,r)}})
return A.T($async$b0,r)},
bc(a,b,c,d,e){var s=0,r=A.U(t.y),q,p=this,o,n
var $async$bc=A.V(function(f,g){if(f===1)return A.R(g,r)
for(;;)switch(s){case 0:n=t.N
s=3
return A.y(p.c0("/api/reports/add","POST",A.a2(["Content-Type","application/json"],n,n),B.d.T(A.a2(["operation_id",e,"household_id",a,"report_type",b,"description",c,"photo_base64",d],n,t.jv))),$async$bc)
case 3:n=g.responseText
o=B.d.K(0,n==null?"{}":n)
n=J.C(o)
q=J.m(n.i(o,"status"),"success")&&n.i(o,"report_id")!=null
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$bc,r)},
aq(a){var s,r,q=this.a,p=B.a.t(a.toLowerCase()),o=B.a.t(A.qd(p,"hh-",""))
try{s=J.qO(q,new A.kP(p,o))
return s}catch(r){return null}},
b8(a,b){var s=0,r=A.U(t.dZ),q,p=this,o,n,m
var $async$b8=A.V(function(c,d){if(c===1)return A.R(d,r)
for(;;)switch(s){case 0:n=p.a
m=B.b.fF(n,new A.lg(a))
s=m!==-1?3:4
break
case 3:if(!(m>=0&&m<n.length)){q=A.e(n,m)
s=1
break}o=A.aq(n[m],t.N,t.z)
o.k(0,"current_leak_status",b)
if(b==="leak")o.k(0,"leak_detected_at",new A.ab(Date.now(),0,!1).a5().a0())
else o.k(0,"leak_detected_at",null)
s=5
return A.y(p.ao("/api/households/update",o),$async$b8)
case 5:B.b.k(n,m,o)
p.aH()
if(!(m<n.length)){q=A.e(n,m)
s=1
break}q=n[m]
s=1
break
case 4:q=null
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$b8,r)},
bk(a){return this.fc(t.P.a(a))},
fc(a){var s=0,r=A.U(t.P),q,p=this,o,n
var $async$bk=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:o=p.c
n=A.ap(t.N,t.z)
n.k(0,"task_id","PENDING-"+A.im())
n.k(0,"date",new A.ab(Date.now(),0,!1).a5().a0())
n.S(0,a)
s=3
return A.y(p.ao("/api/maintenance-logs/add",n),$async$bk)
case 3:B.b.c9(o,0,n)
p.aH()
q=n
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$bk,r)},
e0(){var s,r,q,p,o,n,m,l,k=t.N,j=A.ap(k,t.P)
for(s=this.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.av)(s),++q){p=s[q]
j.k(0,A.h(J.l(p,"bill_id")),p)}for(s=this.ag(),r=A.G(s),o=r.h("H(1)").a(new A.kO()),s=B.b.gD(s),r=new A.bh(s,o,r.h("bh<1>")),o=t.f,n=t.z;r.q();){m=s.gu(0)
l=J.C(m)
p=A.aq(o.a(l.i(m,"body")),k,n)
p.k(0,"status",l.i(m,"sync_error")==null?"Pending sync":"Needs review")
j.k(0,A.h(p.i(0,"bill_id")),p)}k=j.$ti.h("aU<2>")
k=A.a8(new A.aU(j,k),k.h("f.E"))
return k},
bE(a){var s=this.e0(),r=A.G(s),q=r.h("I<1>"),p=A.a8(new A.I(s,r.h("H(1)").a(new A.kM(B.a.t(a.toUpperCase()))),q),q.h("f.E"))
B.b.bb(p,new A.kN())
return p},
e_(a){var s,r,q=B.a.t(a.toUpperCase()),p=this.ag(),o=A.G(p),n=o.h("aE<1,u<c,@>>"),m=n.h("I<f.E>"),l=A.a8(new A.I(new A.aE(new A.I(p,o.h("H(1)").a(new A.kI()),o.h("I<1>")),o.h("u<c,@>(1)").a(new A.kJ()),n),n.h("H(f.E)").a(new A.kK(q)),m),m.h("f.E"))
if(l.length!==0){B.b.bb(l,new A.kL())
s=J.l(B.b.gab(l),"current_reading")
if(typeof s=="number")return s}r=this.aq(a)
return A.mS(r==null?null:J.l(r,"current_m3_usage"))},
c6(a,b){var s,r,q=B.a.t(a.toUpperCase()),p=B.a.t(b.toLowerCase())
if(B.b.a9(this.e,new A.kT(q,p)))return!0
s=this.ag()
r=A.G(s)
if(new A.aE(new A.I(s,r.h("H(1)").a(new A.kU()),r.h("I<1>")),r.h("u<c,@>(1)").a(new A.kV()),r.h("aE<1,u<c,@>>")).a9(0,new A.kW(q,p)))return!0
return!1},
aI(a){return this.fb(t.P.a(a))},
fb(a){var s=0,r=A.U(t.P),q,p=this,o,n,m,l
var $async$aI=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:m=a.i(0,"house_id")
l=B.a.t(J.M(m==null?"":m).toUpperCase())
m=a.i(0,"billing_month")
o=B.a.t(J.M(m==null?"":m).toLowerCase())
if(p.c6(l,o))throw A.b(A.ah("A bill for this cycle ("+o+") already exists or is pending synchronization."))
m=A.ap(t.N,t.z)
m.k(0,"bill_id","PENDING-"+A.im())
n=a.i(0,"date")
m.k(0,"date",n==null?new A.ab(Date.now(),0,!1).a5().a0():n)
m.k(0,"status","Pending sync")
m.k(0,"is_synced",!1)
m.S(0,a)
s=3
return A.y(p.ao("/api/billing-records/add",m),$async$aI)
case 3:s=p.x&&p.M()?4:6
break
case 4:s=7
return A.y(p.a7(),$async$aI)
case 7:if(!B.b.a9(p.ag(),new A.kA(m))){m.k(0,"is_synced",!0)
m.k(0,"status","Unpaid")}s=p.M()?8:9
break
case 8:s=10
return A.y(p.b6(),$async$aI)
case 10:case 9:s=5
break
case 6:p.aH()
p.ax.m(0,p.W())
case 5:q=m
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$aI,r)},
cn(a){var s,r,q,p,o,n=this.f,m=n.length
if(m===0)return null
if(a.length===0)return B.b.gab(n)
for(s=a==="worker",r=a==="resident",q=0;q<n.length;n.length===m||(0,A.av)(n),++q){p=n[q]
o=A.ak(J.l(p,"target_audience"))
if(o==null)o="Everyone"
if(r){if(o==="Everyone"||o==="Residents only")return p}else if(s){if(o==="Everyone"||o==="Workers only")return p}else return p}return null},
bi(a,b,c){var s=0,r=A.U(t.H),q=this,p,o
var $async$bi=A.V(function(d,e){if(d===1)return A.R(e,r)
for(;;)switch(s){case 0:p=t.N
o=A.a2(["message",a,"author",b,"target_audience",c,"timestamp",new A.ab(Date.now(),0,!1).a5().a0()],p,p)
s=2
return A.y(q.ao("/api/announcements/add",o),$async$bi)
case 2:B.b.c9(q.f,0,o)
q.aH()
return A.S(null,r)}})
return A.T($async$bi,r)},
sfR(a){this.at=t.mW.a(a)}}
A.ky.prototype={
$1(a){},
$S:14}
A.kz.prototype={
$1(a){return A.ik(this.a)},
$S:62}
A.kG.prototype={
$0(){var s=this.a
if((s.a.a&30)===0)s.bl(B.m)},
$S:2}
A.kC.prototype={
$1(a){var s
t.D.a(a)
s=this.a
if((s.a.a&30)===0)s.aK(0,this.b)},
$S:19}
A.kD.prototype={
$1(a){t.D.a(a)
return this.a.$0()},
$S:19}
A.kE.prototype={
$1(a){t.D.a(a)
return this.a.$0()},
$S:19}
A.kF.prototype={
$0(){this.a.$0()
this.b.abort()},
$S:2}
A.kR.prototype={
$1(a){return J.l(t.P.a(a),"sync_error")!=null},
$S:0}
A.kS.prototype={
$1(a){return J.l(t.P.a(a),"sync_error")!=null},
$S:0}
A.kB.prototype={
$1(a){return A.aq(t.f.a(a),t.N,t.z)},
$S:20}
A.l2.prototype={
$1(a){return J.m(J.l(t.P.a(a),"owner"),A.bl())},
$S:0}
A.l3.prototype={
$1(a){return B.b.m(t.p.a(a),A.a2(["operation_id",this.a,"owner",A.bl(),"endpoint",this.b,"body",this.c],t.N,t.z))},
$S:6}
A.l7.prototype={
$2(a,b){var s,r="last_sync_attempt",q=t.P
q.a(a)
q.a(b)
q=J.l(a,r)
q=J.M(q==null?"":q)
s=J.l(b,r)
return B.a.a2(q,J.M(s==null?"":s))},
$S:16}
A.l8.prototype={
$1(a){var s,r,q,p,o,n="operation_id"
t.p.a(a)
for(r=a.length,q=this.a,p=J.C(q),o=0;o<a.length;a.length===r||(0,A.av)(a),++o){s=a[o]
if(J.m(J.l(s,n),p.i(q,n)))J.bn(s,"last_sync_attempt",new A.ab(Date.now(),0,!1).a5().a0())}},
$S:6}
A.l9.prototype={
$1(a){var s
t.p.a(a)
s=A.G(a).h("H(1)").a(new A.l6(this.a))
a.$flags&1&&A.aG(a,16)
B.b.eW(a,s,!0)
return null},
$S:6}
A.l6.prototype={
$1(a){var s="operation_id"
return J.m(J.l(t.P.a(a),s),J.l(this.a,s))},
$S:0}
A.la.prototype={
$1(a){var s,r,q,p,o,n="operation_id"
t.p.a(a)
for(r=a.length,q=this.a,p=J.C(q),o=0;o<a.length;a.length===r||(0,A.av)(a),++o){s=a[o]
if(J.m(J.l(s,n),p.i(q,n)))J.bn(s,"sync_error","Server rejected this saved operation. Review with Admin; the original operation is retained.")}},
$S:6}
A.lb.prototype={
$1(a){return J.l(t.P.a(a),"sync_error")!=null},
$S:0}
A.kX.prototype={
$1(a){t.I.a(a)
return this.a.M()},
$S:24}
A.kY.prototype={
$1(a){return this.a.M()},
$S:3}
A.kZ.prototype={
$1(a){t.A.a(a)
this.a.am(!0)},
$S:18}
A.l_.prototype={
$1(a){var s
t.A.a(a)
s=this.a
if(s.M())s.bQ()},
$S:18}
A.l0.prototype={
$1(a){A.bL("[NET] Internet restored. Starting automatic synchronization...")
this.a.b6()},
$S:3}
A.l1.prototype={
$1(a){var s
A.bL("[NET] Internet disconnected. Entering offline mode.")
s=this.a
s.x=!1
s.ax.m(0,s.W())},
$S:3}
A.kH.prototype={
$1(a){return A.aq(t.f.a(a),t.N,t.z)},
$S:20}
A.kQ.prototype={
$1(a){var s
t.P.a(a)
s=J.C(a)
return J.m(s.i(a,"sync_status"),"PENDING")&&J.m(s.i(a,"collected_by"),A.bl())},
$S:0}
A.l5.prototype={
$1(a){t.p.a(a)
if(B.b.a9(a,new A.l4(this.a,this.b)))throw A.b(A.ah("A collection for this household is already pending"))
B.b.c9(a,0,this.c)},
$S:6}
A.l4.prototype={
$1(a){var s
t.P.a(a)
s=J.C(a)
return J.m(s.i(a,"house_id"),this.a)&&J.m(s.i(a,"collected_by"),this.b)&&J.m(s.i(a,"sync_status"),"PENDING")},
$S:0}
A.lc.prototype={
$2(a,b){var s,r="last_sync_attempt",q=t.P
q.a(a)
q.a(b)
q=J.l(a,r)
q=J.M(q==null?"":q)
s=J.l(b,r)
return B.a.a2(q,J.M(s==null?"":s))},
$S:16}
A.ld.prototype={
$1(a){return J.l(t.P.a(a),"transaction_id")},
$S:30}
A.le.prototype={
$1(a){var s,r,q,p
t.p.a(a)
for(r=a.length,q=this.a,p=0;p<a.length;a.length===r||(0,A.av)(a),++p){s=a[p]
if(J.m(J.l(s,"collected_by"),A.bl())&&q.A(0,J.l(s,"transaction_id")))J.bn(s,"last_sync_attempt",new A.ab(Date.now(),0,!1).a5().a0())}},
$S:6}
A.lf.prototype={
$1(a){return J.l(t.P.a(a),"sync_error")!=null},
$S:0}
A.kx.prototype={
$1(a){return J.l(t.P.a(a),"transaction_id")},
$S:30}
A.kw.prototype={
$1(a){var s,r,q,p,o,n,m,l="transaction_id",k="sync_status",j="sync_error"
t.p.a(a)
for(s=a.length,r=this.c,q=this.b,p=this.a,o=0;o<a.length;a.length===s||(0,A.av)(a),++o){n=a[o]
m=J.C(n)
if(!J.m(m.i(n,"collected_by"),A.bl())||!p.A(0,m.i(n,l))||!J.m(m.i(n,k),"PENDING"))continue
if(q.A(0,m.i(n,l))){m.k(n,k,"SYNCED")
m.k(n,"synced_at",new A.ab(Date.now(),0,!1).a5().a0())
m.B(n,j)}else m.k(n,j,r)}},
$S:6}
A.kP.prototype={
$1(a){var s,r,q,p,o,n,m
t.P.a(a)
n=J.C(a)
m=n.i(a,"house_id")
s=B.a.t(J.M(m==null?"":m).toLowerCase())
r=B.a.t(A.qd(s,"hh-",""))
m=n.i(a,"account_number")
q=B.a.t(J.M(m==null?"":m).toLowerCase())
m=n.i(a,"owner_name")
p=B.a.t(J.M(m==null?"":m).toLowerCase())
m=A.h(n.i(a,"purok"))
n=n.i(a,"lot")
o=B.a.t((m+" "+A.h(n==null?"":n)).toLowerCase())
n=this.a
return n===s||this.b===r||n===q||n===p||n===o},
$S:0}
A.lg.prototype={
$1(a){return J.m(J.l(t.P.a(a),"house_id"),this.a)},
$S:0}
A.kO.prototype={
$1(a){return J.m(J.l(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.kM.prototype={
$1(a){var s=J.l(t.P.a(a),"house_id")
return B.a.t(J.M(s==null?"":s).toUpperCase())===this.a},
$S:0}
A.kN.prototype={
$2(a,b){var s,r,q="date",p=2026,o=t.P
o.a(a)
o.a(b)
o=J.C(a)
if(o.i(a,q)!=null){o=A.dn(A.w(o.i(a,q)))
s=o==null?A.lh(p):o}else s=A.lh(p)
o=J.C(b)
if(o.i(b,q)!=null){o=A.dn(A.w(o.i(b,q)))
r=o==null?A.lh(p):o}else r=A.lh(p)
return r.a2(0,s)},
$S:16}
A.kI.prototype={
$1(a){return J.m(J.l(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.kJ.prototype={
$1(a){return A.aq(t.f.a(J.l(t.P.a(a),"body")),t.N,t.z)},
$S:26}
A.kK.prototype={
$1(a){var s=J.l(t.P.a(a),"house_id")
return B.a.t(J.M(s==null?"":s).toUpperCase())===this.a},
$S:0}
A.kL.prototype={
$2(a,b){var s,r=t.P
r.a(a)
r=J.l(r.a(b),"date")
r=J.M(r==null?"":r)
s=J.l(a,"date")
return B.a.a2(r,J.M(s==null?"":s))},
$S:16}
A.kT.prototype={
$1(a){var s,r
t.P.a(a)
s=J.C(a)
r=s.i(a,"house_id")
if(B.a.t(J.M(r==null?"":r).toUpperCase())===this.a){s=s.i(a,"billing_month")
s=B.a.t(J.M(s==null?"":s).toLowerCase())===this.b}else s=!1
return s},
$S:0}
A.kU.prototype={
$1(a){return J.m(J.l(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.kV.prototype={
$1(a){return A.aq(t.f.a(J.l(t.P.a(a),"body")),t.N,t.z)},
$S:26}
A.kW.prototype={
$1(a){var s,r
t.P.a(a)
s=J.C(a)
r=s.i(a,"house_id")
if(B.a.t(J.M(r==null?"":r).toUpperCase())===this.a){s=s.i(a,"billing_month")
s=B.a.t(J.M(s==null?"":s).toLowerCase())===this.b}else s=!1
return s},
$S:0}
A.kA.prototype={
$1(a){var s="operation_id"
return J.m(J.l(t.P.a(a),s),this.a.i(0,s))},
$S:0}
A.ni.prototype={
$1(a){var s=0,r=A.U(t.a),q=this,p,o,n,m
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:m=q.a
if(m==null||A.bl()!==m)throw A.b(A.ah("Session changed before local save"))
m=q.b
p=m==="collections"?"waterhall_offline_collections":"waterhall_unsynced_actions"
o=window.localStorage.getItem(p)
o=J.di(t.j.a(B.d.K(0,o==null?"[]":o)),new A.nh(),t.P)
n=A.a8(o,o.$ti.h("ag.E"))
q.c.$1(n)
s=2
return A.y(A.n_(m,n),$async$$1)
case 2:return A.S(null,r)}})
return A.T($async$$1,r)},
$S:69}
A.nh.prototype={
$1(a){return A.aq(t.f.a(a),t.N,t.z)},
$S:20}
A.nj.prototype={
$1(a){},
$S:14}
A.n0.prototype={
$1(a){var s,r
t.P.a(a)
s=J.C(a)
r=s.i(a,"owner")
s=r==null?s.i(a,"collected_by"):r
return J.m(s,this.a)},
$S:0}
A.no.prototype={
$1(a){var s,r,q,p,o,n
t.p.a(a)
for(s=a.length,r=this.a,q=0;q<a.length;a.length===s||(0,A.av)(a),++q){p=a[q]
o=J.C(p)
n=o.i(p,"transaction_id")
r.fU(0,J.M(n==null?o.i(p,"operation_id"):n),new A.nn(p))}B.b.aw(a)
B.b.S(a,new A.aU(r,A.A(r).h("aU<2>")))},
$S:6}
A.nn.prototype={
$0(){return this.a},
$S:29};(function aliases(){var s=J.cJ.prototype
s.e8=s.l
s=J.bV.prototype
s.ec=s.l
s=A.k.prototype
s.ed=s.bG
s=A.f.prototype
s.e9=s.bC
s=A.F.prototype
s.ee=s.l
s=A.B.prototype
s.bH=s.a3
s=A.d.prototype
s.e7=s.bj
s=A.er.prototype
s.eg=s.ak
s=A.bp.prototype
s.ea=s.i
s.eb=s.k
s=A.d2.prototype
s.ef=s.k})();(function installTearOffs(){var s=hunkHelpers._static_1,r=hunkHelpers._static_0,q=hunkHelpers._static_2,p=hunkHelpers._instance_2u,o=hunkHelpers._instance_0u,n=hunkHelpers.installStaticTearOff,m=hunkHelpers._instance_2i
s(A,"uo","rO",17)
s(A,"up","rP",17)
s(A,"uq","rQ",17)
r(A,"q1","uh",2)
s(A,"ur","u7",12)
q(A,"ut","u9",35)
r(A,"us","u8",2)
p(A.Q.prototype,"gcH","eB",35)
o(A.d1.prototype,"geP","eQ",2)
s(A,"uv","tJ",13)
n(A,"uD",4,null,["$4"],["rX"],27,0)
n(A,"uE",4,null,["$4"],["rY"],27,0)
m(A.by.prototype,"ge3","cq",7)
s(A,"uM","o4",25)
s(A,"uL","o3",48)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.mixinHard,q=hunkHelpers.inherit,p=hunkHelpers.inheritMany
q(A.F,null)
p(A.F,[A.nF,J.cJ,A.cS,J.b7,A.Z,A.k,A.bQ,A.lP,A.f,A.bA,A.dL,A.bh,A.e5,A.aD,A.bG,A.D,A.c_,A.cO,A.dl,A.ek,A.fi,A.lW,A.lL,A.dv,A.eu,A.mB,A.lA,A.dI,A.dJ,A.dH,A.fk,A.mz,A.i3,A.be,A.hn,A.mJ,A.ey,A.h4,A.ev,A.ao,A.bZ,A.d0,A.e7,A.lV,A.h9,A.bk,A.Q,A.h5,A.eb,A.hG,A.d1,A.hR,A.eF,A.eh,A.as,A.hw,A.cu,A.aB,A.c9,A.f1,A.ma,A.mx,A.mM,A.ab,A.b9,A.fE,A.e_,A.mf,A.ba,A.an,A.a4,A.hU,A.at,A.eC,A.m1,A.b1,A.ku,A.nB,A.ee,A.cs,A.x,A.dS,A.er,A.hW,A.cc,A.hc,A.hM,A.eE,A.bp,A.lK,A.mu,A.it,A.aH,A.kv])
p(J.cJ,[J.fh,J.dC,J.a,J.cK,J.cL,J.cf,J.bU])
p(J.a,[J.bV,J.af,A.ck,A.dO,A.d,A.eO,A.bO,A.b8,A.X,A.hb,A.aC,A.f6,A.f7,A.dq,A.hf,A.ds,A.hh,A.f9,A.o,A.hl,A.aJ,A.fd,A.hq,A.cI,A.cN,A.fp,A.hy,A.hz,A.aL,A.hA,A.hC,A.aM,A.hH,A.hK,A.aP,A.hN,A.aQ,A.hQ,A.ay,A.hY,A.fT,A.aS,A.i_,A.fW,A.h1,A.i5,A.i7,A.i9,A.ib,A.id,A.cM,A.aT,A.hu,A.aW,A.hE,A.fH,A.hS,A.aX,A.i1,A.eT,A.h7])
p(J.bV,[J.fF,J.bF,J.bz])
p(A.cS,[J.fg,A.hL])
q(J.lw,J.af)
p(J.cf,[J.dB,J.fj])
p(A.Z,[A.dF,A.bD,A.fl,A.fZ,A.fJ,A.hk,A.dE,A.eQ,A.b5,A.fB,A.e4,A.fY,A.bq,A.f0])
p(A.k,[A.cX,A.h8,A.bj,A.aA,A.fc])
p(A.cX,[A.f_,A.e3])
p(A.bQ,[A.eY,A.eZ,A.fQ,A.na,A.nc,A.m7,A.m6,A.mT,A.mp,A.ms,A.lT,A.lS,A.mD,A.lC,A.lk,A.ll,A.ln,A.lJ,A.md,A.me,A.lI,A.lH,A.mE,A.mF,A.mG,A.mW,A.ks,A.kt,A.lo,A.lp,A.mY,A.mZ,A.n3,A.n4,A.n5,A.ne,A.nl,A.nm,A.nf,A.jv,A.jw,A.ju,A.jx,A.jy,A.j3,A.j_,A.j0,A.j1,A.j2,A.j6,A.j7,A.j8,A.jg,A.jh,A.j5,A.ji,A.jj,A.jk,A.jl,A.jm,A.jn,A.j9,A.ja,A.jb,A.jc,A.jd,A.je,A.jf,A.jo,A.ka,A.kb,A.kc,A.kk,A.jL,A.jM,A.jK,A.jN,A.jJ,A.jH,A.jI,A.jP,A.jE,A.jF,A.jG,A.jQ,A.jC,A.jS,A.jT,A.jR,A.jA,A.k6,A.k7,A.k8,A.k9,A.jU,A.jV,A.jW,A.jX,A.jY,A.jp,A.jq,A.jr,A.js,A.jt,A.ke,A.kf,A.kd,A.jB,A.km,A.kg,A.kh,A.ki,A.jZ,A.k_,A.k0,A.k1,A.k4,A.iV,A.iU,A.iW,A.iX,A.iY,A.iZ,A.iz,A.iA,A.iB,A.iw,A.ix,A.iH,A.iQ,A.iI,A.iJ,A.iK,A.iL,A.iM,A.iN,A.iO,A.iC,A.iD,A.iP,A.iF,A.iu,A.iG,A.ky,A.kz,A.kC,A.kD,A.kE,A.kR,A.kS,A.kB,A.l2,A.l3,A.l8,A.l9,A.l6,A.la,A.lb,A.kX,A.kY,A.kZ,A.l_,A.l0,A.l1,A.kH,A.kQ,A.l5,A.l4,A.ld,A.le,A.lf,A.kx,A.kw,A.kP,A.lg,A.kO,A.kM,A.kI,A.kJ,A.kK,A.kT,A.kU,A.kV,A.kW,A.kA,A.ni,A.nh,A.nj,A.n0,A.no])
p(A.eY,[A.nk,A.m8,A.m9,A.mI,A.mH,A.ls,A.mg,A.ml,A.mk,A.mi,A.mh,A.mo,A.mn,A.mm,A.mr,A.lU,A.lR,A.mA,A.mV,A.mC,A.n1,A.mO,A.mN,A.li,A.jz,A.j4,A.jD,A.kj,A.iS,A.iy,A.iE,A.kG,A.kF,A.nn])
p(A.f,[A.n,A.aE,A.I,A.co,A.ej,A.d4])
p(A.n,[A.ag,A.ch,A.aU,A.dG,A.eg])
p(A.ag,[A.e1,A.a_,A.hx,A.ht])
q(A.bw,A.aE)
p(A.D,[A.cY,A.bb,A.ef,A.hs,A.h6,A.hd])
q(A.cj,A.cY)
q(A.d6,A.cO)
q(A.c1,A.d6)
q(A.dm,A.c1)
q(A.bu,A.dl)
p(A.eZ,[A.lN,A.lx,A.nb,A.mU,A.n2,A.mq,A.mt,A.lB,A.lD,A.my,A.lG,A.m3,A.m2,A.lE,A.lF,A.lO,A.lQ,A.mb,A.mc,A.mQ,A.n6,A.kp,A.kl,A.jO,A.k5,A.kn,A.k2,A.k3,A.iT,A.iv,A.iR,A.l7,A.lc,A.kN,A.kL])
q(A.dT,A.bD)
p(A.fQ,[A.fM,A.cF])
p(A.dO,[A.dM,A.ar])
p(A.ar,[A.em,A.eo])
q(A.en,A.em)
q(A.dN,A.en)
q(A.ep,A.eo)
q(A.aV,A.ep)
p(A.dN,[A.fu,A.fv])
p(A.aV,[A.fw,A.fx,A.fy,A.fz,A.fA,A.dP,A.dQ])
q(A.d5,A.hk)
p(A.bZ,[A.d3,A.cq])
q(A.e8,A.d3)
q(A.d_,A.e8)
q(A.e9,A.d0)
q(A.bH,A.e9)
q(A.e6,A.e7)
q(A.bi,A.h9)
q(A.ea,A.eb)
q(A.hJ,A.eF)
q(A.ei,A.ef)
p(A.as,[A.eq,A.f2])
q(A.ct,A.eq)
p(A.c9,[A.dk,A.fa,A.fm])
p(A.f1,[A.eW,A.kq,A.lz,A.ly,A.m4])
q(A.fn,A.dE)
q(A.mw,A.mx)
q(A.h2,A.fa)
p(A.b5,[A.cQ,A.fe])
q(A.he,A.eC)
p(A.d,[A.t,A.du,A.dx,A.fb,A.ce,A.fq,A.aO,A.es,A.aR,A.az,A.ew,A.h3,A.c2,A.bs,A.eV,A.bN])
p(A.t,[A.B,A.bo,A.cb,A.cZ])
p(A.B,[A.q,A.r])
p(A.q,[A.cD,A.eP,A.cE,A.c8,A.bP,A.dp,A.cH,A.dy,A.dA,A.bT,A.bB,A.dU,A.bY,A.e2,A.fO,A.fP,A.cV,A.cm])
q(A.f3,A.b8)
q(A.ca,A.hb)
p(A.aC,[A.f4,A.f5])
q(A.hg,A.hf)
q(A.dr,A.hg)
q(A.hi,A.hh)
q(A.f8,A.hi)
q(A.aI,A.bO)
q(A.hm,A.hl)
q(A.dw,A.hm)
q(A.hr,A.hq)
q(A.bS,A.hr)
q(A.dz,A.cb)
q(A.by,A.ce)
q(A.fr,A.hy)
q(A.fs,A.hz)
q(A.hB,A.hA)
q(A.ft,A.hB)
p(A.o,[A.bg,A.b_])
q(A.ax,A.bg)
q(A.hD,A.hC)
q(A.dR,A.hD)
q(A.hI,A.hH)
q(A.fG,A.hI)
q(A.fI,A.hK)
q(A.et,A.es)
q(A.fK,A.et)
q(A.hO,A.hN)
q(A.fL,A.hO)
q(A.e0,A.hQ)
q(A.hZ,A.hY)
q(A.fR,A.hZ)
q(A.ex,A.ew)
q(A.fS,A.ex)
q(A.i0,A.i_)
q(A.fV,A.i0)
q(A.i6,A.i5)
q(A.ha,A.i6)
q(A.ec,A.ds)
q(A.i8,A.i7)
q(A.ho,A.i8)
q(A.ia,A.i9)
q(A.el,A.ia)
q(A.ic,A.ib)
q(A.hP,A.ic)
q(A.ie,A.id)
q(A.hV,A.ie)
q(A.ed,A.h6)
p(A.f2,[A.hj,A.eS])
q(A.cp,A.cq)
q(A.hX,A.er)
p(A.bp,[A.dD,A.d2])
q(A.cg,A.d2)
q(A.hv,A.hu)
q(A.fo,A.hv)
q(A.hF,A.hE)
q(A.fC,A.hF)
q(A.cT,A.r)
q(A.hT,A.hS)
q(A.fN,A.hT)
q(A.i2,A.i1)
q(A.fX,A.i2)
q(A.eU,A.h7)
q(A.fD,A.bN)
s(A.cX,A.bG)
s(A.em,A.k)
s(A.en,A.aD)
s(A.eo,A.k)
s(A.ep,A.aD)
s(A.cY,A.aB)
s(A.d6,A.aB)
s(A.hb,A.ku)
s(A.hf,A.k)
s(A.hg,A.x)
s(A.hh,A.k)
s(A.hi,A.x)
s(A.hl,A.k)
s(A.hm,A.x)
s(A.hq,A.k)
s(A.hr,A.x)
s(A.hy,A.D)
s(A.hz,A.D)
s(A.hA,A.k)
s(A.hB,A.x)
s(A.hC,A.k)
s(A.hD,A.x)
s(A.hH,A.k)
s(A.hI,A.x)
s(A.hK,A.D)
s(A.es,A.k)
s(A.et,A.x)
s(A.hN,A.k)
s(A.hO,A.x)
s(A.hQ,A.D)
s(A.hY,A.k)
s(A.hZ,A.x)
s(A.ew,A.k)
s(A.ex,A.x)
s(A.i_,A.k)
s(A.i0,A.x)
s(A.i5,A.k)
s(A.i6,A.x)
s(A.i7,A.k)
s(A.i8,A.x)
s(A.i9,A.k)
s(A.ia,A.x)
s(A.ib,A.k)
s(A.ic,A.x)
s(A.id,A.k)
s(A.ie,A.x)
r(A.d2,A.k)
s(A.hu,A.k)
s(A.hv,A.x)
s(A.hE,A.k)
s(A.hF,A.x)
s(A.hS,A.k)
s(A.hT,A.x)
s(A.i1,A.k)
s(A.i2,A.x)
s(A.h7,A.D)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{j:"int",W:"double",a0:"num",c:"String",H:"bool",a4:"Null",p:"List",F:"Object",u:"Map",i:"JSObject"},mangledNames:{},types:["H(u<c,@>)","~(ax)","~()","~(o)","a6<~>(ax)","~(u<c,@>)","~(p<u<c,@>>)","~(c,c)","~(B)","H(c)","c(c)","~(c,@)","~(@)","@(@)","a4(@)","a4()","j(u<c,@>,u<c,@>)","~(~())","a4(o)","~(b_)","u<c,@>(@)","~(c)","a6<~>(o)","H(bc)","~(cW)","F?(F?)","u<c,@>(u<c,@>)","H(B,c,c,cs)","c(u<c,F>)","u<c,@>()","@(u<c,@>)","@()","~(F?,F?)","~(@,@)","a4(F,bf)","~(F,bf)","j(c?)","H(t)","~(j,@)","~(H)","bp(@)","cg<@>(@)","a6<~>(cW)","dD(@)","B(t)","~(b0<c>)","H(b0<c>)","~(c,B)","F?(@)","~(j,c)","~(t,t?)","a0(a0,a0)","u<c,F>(an<j,a0>)","a4(@,bf)","a4(~())","a4(c)","c(@,j)","a6<~>(c,c)","a4(@,@,@,@)","~(cG?,c)","a6<~>(cG?)","H(B)","a6<~>(~)","~(cU,@)","0&()","@(@,c)","u<c,c>(u<c,c>,c)","a6<~>()","@(c)","a6<a4>(~)","0&(c,j?)","~(u<c,F>)","~(u<c,c>)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.tg(v.typeUniverse,JSON.parse('{"fF":"bV","bF":"bV","bz":"bV","vr":"a","vs":"a","v_":"a","uY":"o","vm":"o","v0":"bN","uZ":"d","vw":"d","vA":"d","uX":"r","vo":"r","vV":"b_","v1":"q","vu":"q","vB":"t","vl":"t","vP":"cb","vx":"ax","vO":"az","v3":"bg","vf":"bs","v2":"bo","vD":"bo","vt":"B","vq":"ce","vp":"bS","v4":"X","v7":"b8","va":"ay","vb":"aC","v6":"aC","v8":"aC","vv":"ck","fh":{"H":[],"Y":[]},"dC":{"a4":[],"Y":[]},"a":{"i":[]},"bV":{"i":[]},"af":{"p":["1"],"n":["1"],"i":[],"f":["1"]},"fg":{"cS":[]},"lw":{"af":["1"],"p":["1"],"n":["1"],"i":[],"f":["1"]},"b7":{"ac":["1"]},"cf":{"W":[],"a0":[]},"dB":{"W":[],"j":[],"a0":[],"Y":[]},"fj":{"W":[],"a0":[],"Y":[]},"bU":{"c":[],"lM":[],"Y":[]},"dF":{"Z":[]},"f_":{"k":["j"],"bG":["j"],"p":["j"],"n":["j"],"f":["j"],"k.E":"j","bG.E":"j"},"n":{"f":["1"]},"ag":{"n":["1"],"f":["1"]},"e1":{"ag":["1"],"n":["1"],"f":["1"],"ag.E":"1","f.E":"1"},"bA":{"ac":["1"]},"aE":{"f":["2"],"f.E":"2"},"bw":{"aE":["1","2"],"n":["2"],"f":["2"],"f.E":"2"},"dL":{"ac":["2"]},"a_":{"ag":["2"],"n":["2"],"f":["2"],"ag.E":"2","f.E":"2"},"I":{"f":["1"],"f.E":"1"},"bh":{"ac":["1"]},"co":{"f":["1"],"f.E":"1"},"e5":{"ac":["1"]},"cX":{"k":["1"],"bG":["1"],"p":["1"],"n":["1"],"f":["1"]},"hx":{"ag":["j"],"n":["j"],"f":["j"],"ag.E":"j","f.E":"j"},"cj":{"D":["j","1"],"aB":["j","1"],"u":["j","1"],"D.K":"j","D.V":"1","aB.K":"j","aB.V":"1"},"c_":{"cU":[]},"dm":{"c1":["1","2"],"d6":["1","2"],"cO":["1","2"],"aB":["1","2"],"u":["1","2"],"aB.K":"1","aB.V":"2"},"dl":{"u":["1","2"]},"bu":{"dl":["1","2"],"u":["1","2"]},"ej":{"f":["1"],"f.E":"1"},"ek":{"ac":["1"]},"fi":{"oF":[]},"dT":{"bD":[],"Z":[]},"fl":{"Z":[]},"fZ":{"Z":[]},"eu":{"bf":[]},"bQ":{"cd":[]},"eY":{"cd":[]},"eZ":{"cd":[]},"fQ":{"cd":[]},"fM":{"cd":[]},"cF":{"cd":[]},"fJ":{"Z":[]},"bb":{"D":["1","2"],"oK":["1","2"],"u":["1","2"],"D.K":"1","D.V":"2"},"ch":{"n":["1"],"f":["1"],"f.E":"1"},"dI":{"ac":["1"]},"aU":{"n":["1"],"f":["1"],"f.E":"1"},"dJ":{"ac":["1"]},"dG":{"n":["an<1,2>"],"f":["an<1,2>"],"f.E":"an<1,2>"},"dH":{"ac":["an<1,2>"]},"fk":{"rF":[],"lM":[]},"ck":{"i":[],"eX":[],"Y":[]},"dO":{"i":[],"ad":[]},"i3":{"eX":[]},"dM":{"kr":[],"i":[],"ad":[],"Y":[]},"ar":{"L":["1"],"i":[],"ad":[]},"dN":{"k":["W"],"ar":["W"],"p":["W"],"L":["W"],"n":["W"],"i":[],"ad":[],"f":["W"],"aD":["W"]},"aV":{"k":["j"],"ar":["j"],"p":["j"],"L":["j"],"n":["j"],"i":[],"ad":[],"f":["j"],"aD":["j"]},"fu":{"lq":[],"k":["W"],"ar":["W"],"p":["W"],"L":["W"],"n":["W"],"i":[],"ad":[],"f":["W"],"aD":["W"],"Y":[],"k.E":"W"},"fv":{"lr":[],"k":["W"],"ar":["W"],"p":["W"],"L":["W"],"n":["W"],"i":[],"ad":[],"f":["W"],"aD":["W"],"Y":[],"k.E":"W"},"fw":{"aV":[],"lt":[],"k":["j"],"ar":["j"],"p":["j"],"L":["j"],"n":["j"],"i":[],"ad":[],"f":["j"],"aD":["j"],"Y":[],"k.E":"j"},"fx":{"aV":[],"lu":[],"k":["j"],"ar":["j"],"p":["j"],"L":["j"],"n":["j"],"i":[],"ad":[],"f":["j"],"aD":["j"],"Y":[],"k.E":"j"},"fy":{"aV":[],"lv":[],"k":["j"],"ar":["j"],"p":["j"],"L":["j"],"n":["j"],"i":[],"ad":[],"f":["j"],"aD":["j"],"Y":[],"k.E":"j"},"fz":{"aV":[],"lY":[],"k":["j"],"ar":["j"],"p":["j"],"L":["j"],"n":["j"],"i":[],"ad":[],"f":["j"],"aD":["j"],"Y":[],"k.E":"j"},"fA":{"aV":[],"lZ":[],"k":["j"],"ar":["j"],"p":["j"],"L":["j"],"n":["j"],"i":[],"ad":[],"f":["j"],"aD":["j"],"Y":[],"k.E":"j"},"dP":{"aV":[],"m_":[],"k":["j"],"ar":["j"],"p":["j"],"L":["j"],"n":["j"],"i":[],"ad":[],"f":["j"],"aD":["j"],"Y":[],"k.E":"j"},"dQ":{"aV":[],"m0":[],"k":["j"],"ar":["j"],"p":["j"],"L":["j"],"n":["j"],"i":[],"ad":[],"f":["j"],"aD":["j"],"Y":[],"k.E":"j"},"hk":{"Z":[]},"d5":{"bD":[],"Z":[]},"ey":{"cW":[]},"ev":{"ac":["1"]},"d4":{"f":["1"],"f.E":"1"},"ao":{"Z":[]},"d_":{"e8":["1"],"d3":["1"],"bZ":["1"]},"bH":{"e9":["1"],"d0":["1"],"br":["1"],"c3":["1"]},"e7":{"p_":["1"],"pm":["1"],"c3":["1"]},"e6":{"e7":["1"],"p_":["1"],"pm":["1"],"c3":["1"]},"bi":{"h9":["1"]},"Q":{"a6":["1"]},"e8":{"d3":["1"],"bZ":["1"]},"e9":{"d0":["1"],"br":["1"],"c3":["1"]},"d0":{"br":["1"],"c3":["1"]},"d3":{"bZ":["1"]},"ea":{"eb":["1"]},"d1":{"br":["1"]},"eF":{"pa":[]},"hJ":{"eF":[],"pa":[]},"ef":{"D":["1","2"],"u":["1","2"]},"ei":{"ef":["1","2"],"D":["1","2"],"u":["1","2"],"D.K":"1","D.V":"2"},"eg":{"n":["1"],"f":["1"],"f.E":"1"},"eh":{"ac":["1"]},"ct":{"as":["1"],"b0":["1"],"n":["1"],"f":["1"],"as.E":"1"},"cu":{"ac":["1"]},"e3":{"k":["1"],"bG":["1"],"p":["1"],"n":["1"],"f":["1"],"k.E":"1","bG.E":"1"},"k":{"p":["1"],"n":["1"],"f":["1"]},"D":{"u":["1","2"]},"cY":{"D":["1","2"],"aB":["1","2"],"u":["1","2"]},"cO":{"u":["1","2"]},"c1":{"d6":["1","2"],"cO":["1","2"],"aB":["1","2"],"u":["1","2"],"aB.K":"1","aB.V":"2"},"as":{"b0":["1"],"n":["1"],"f":["1"]},"eq":{"as":["1"],"b0":["1"],"n":["1"],"f":["1"]},"hs":{"D":["c","@"],"u":["c","@"],"D.K":"c","D.V":"@"},"ht":{"ag":["c"],"n":["c"],"f":["c"],"ag.E":"c","f.E":"c"},"dk":{"c9":["p<j>","c"]},"fa":{"c9":["c","p<j>"]},"dE":{"Z":[]},"fn":{"Z":[]},"fm":{"c9":["F?","c"]},"h2":{"c9":["c","p<j>"]},"W":{"a0":[]},"j":{"a0":[]},"p":{"n":["1"],"f":["1"]},"b0":{"n":["1"],"f":["1"]},"c":{"lM":[]},"eQ":{"Z":[]},"bD":{"Z":[]},"b5":{"Z":[]},"cQ":{"Z":[]},"fe":{"Z":[]},"fB":{"Z":[]},"e4":{"Z":[]},"fY":{"Z":[]},"bq":{"Z":[]},"f0":{"Z":[]},"fE":{"Z":[]},"e_":{"Z":[]},"hU":{"bf":[]},"at":{"rH":[]},"eC":{"h_":[]},"b1":{"h_":[]},"he":{"h_":[]},"X":{"i":[]},"B":{"t":[],"d":[],"i":[]},"o":{"i":[]},"aI":{"bO":[],"i":[]},"aJ":{"i":[]},"by":{"d":[],"i":[]},"cG":{"B":[],"t":[],"d":[],"i":[]},"aL":{"i":[]},"ax":{"o":[],"i":[]},"t":{"d":[],"i":[]},"bB":{"q":[],"B":[],"t":[],"d":[],"i":[]},"aM":{"i":[]},"b_":{"o":[],"i":[]},"aO":{"d":[],"i":[]},"aP":{"i":[]},"aQ":{"i":[]},"ay":{"i":[]},"aR":{"d":[],"i":[]},"az":{"d":[],"i":[]},"aS":{"i":[]},"cs":{"bc":[]},"q":{"B":[],"t":[],"d":[],"i":[]},"eO":{"i":[]},"cD":{"q":[],"B":[],"t":[],"d":[],"i":[]},"eP":{"q":[],"B":[],"t":[],"d":[],"i":[]},"cE":{"q":[],"B":[],"t":[],"d":[],"i":[]},"bO":{"i":[]},"c8":{"q":[],"B":[],"t":[],"d":[],"i":[]},"bP":{"q":[],"B":[],"t":[],"d":[],"i":[]},"bo":{"t":[],"d":[],"i":[]},"f3":{"i":[]},"ca":{"i":[]},"aC":{"i":[]},"b8":{"i":[]},"f4":{"i":[]},"f5":{"i":[]},"f6":{"i":[]},"dp":{"q":[],"B":[],"t":[],"d":[],"i":[]},"cb":{"t":[],"d":[],"i":[]},"f7":{"i":[]},"dq":{"i":[]},"dr":{"k":["bd<a0>"],"x":["bd<a0>"],"p":["bd<a0>"],"L":["bd<a0>"],"n":["bd<a0>"],"i":[],"f":["bd<a0>"],"x.E":"bd<a0>","k.E":"bd<a0>"},"ds":{"bd":["a0"],"i":[]},"f8":{"k":["c"],"x":["c"],"p":["c"],"L":["c"],"n":["c"],"i":[],"f":["c"],"x.E":"c","k.E":"c"},"f9":{"i":[]},"h8":{"k":["B"],"p":["B"],"n":["B"],"f":["B"],"k.E":"B"},"bj":{"k":["1"],"p":["1"],"n":["1"],"f":["1"],"k.E":"1"},"du":{"d":[],"i":[]},"d":{"i":[]},"dw":{"k":["aI"],"x":["aI"],"p":["aI"],"L":["aI"],"n":["aI"],"i":[],"f":["aI"],"x.E":"aI","k.E":"aI"},"dx":{"d":[],"i":[]},"fb":{"d":[],"i":[]},"cH":{"q":[],"B":[],"t":[],"d":[],"i":[]},"dy":{"q":[],"B":[],"t":[],"d":[],"i":[]},"fd":{"i":[]},"bS":{"k":["t"],"x":["t"],"p":["t"],"L":["t"],"n":["t"],"i":[],"f":["t"],"x.E":"t","k.E":"t"},"dz":{"t":[],"d":[],"i":[]},"ce":{"d":[],"i":[]},"cI":{"i":[]},"dA":{"q":[],"B":[],"t":[],"d":[],"i":[]},"bT":{"ox":[],"cG":[],"q":[],"B":[],"t":[],"d":[],"i":[]},"cN":{"i":[]},"fp":{"i":[]},"fq":{"d":[],"i":[]},"fr":{"D":["c","@"],"i":[],"u":["c","@"],"D.K":"c","D.V":"@"},"fs":{"D":["c","@"],"i":[],"u":["c","@"],"D.K":"c","D.V":"@"},"ft":{"k":["aL"],"x":["aL"],"p":["aL"],"L":["aL"],"n":["aL"],"i":[],"f":["aL"],"x.E":"aL","k.E":"aL"},"aA":{"k":["t"],"p":["t"],"n":["t"],"f":["t"],"k.E":"t"},"dR":{"k":["t"],"x":["t"],"p":["t"],"L":["t"],"n":["t"],"i":[],"f":["t"],"x.E":"t","k.E":"t"},"dU":{"q":[],"B":[],"t":[],"d":[],"i":[]},"fG":{"k":["aM"],"x":["aM"],"p":["aM"],"L":["aM"],"n":["aM"],"i":[],"f":["aM"],"x.E":"aM","k.E":"aM"},"fI":{"D":["c","@"],"i":[],"u":["c","@"],"D.K":"c","D.V":"@"},"bY":{"q":[],"B":[],"t":[],"d":[],"i":[]},"fK":{"k":["aO"],"x":["aO"],"p":["aO"],"d":[],"L":["aO"],"n":["aO"],"i":[],"f":["aO"],"x.E":"aO","k.E":"aO"},"fL":{"k":["aP"],"x":["aP"],"p":["aP"],"L":["aP"],"n":["aP"],"i":[],"f":["aP"],"x.E":"aP","k.E":"aP"},"e0":{"D":["c","c"],"i":[],"u":["c","c"],"D.K":"c","D.V":"c"},"e2":{"q":[],"B":[],"t":[],"d":[],"i":[]},"fO":{"q":[],"B":[],"t":[],"d":[],"i":[]},"fP":{"q":[],"B":[],"t":[],"d":[],"i":[]},"cV":{"q":[],"B":[],"t":[],"d":[],"i":[]},"cm":{"q":[],"B":[],"t":[],"d":[],"i":[]},"fR":{"k":["az"],"x":["az"],"p":["az"],"L":["az"],"n":["az"],"i":[],"f":["az"],"x.E":"az","k.E":"az"},"fS":{"k":["aR"],"x":["aR"],"p":["aR"],"d":[],"L":["aR"],"n":["aR"],"i":[],"f":["aR"],"x.E":"aR","k.E":"aR"},"fT":{"i":[]},"fV":{"k":["aS"],"x":["aS"],"p":["aS"],"L":["aS"],"n":["aS"],"i":[],"f":["aS"],"x.E":"aS","k.E":"aS"},"fW":{"i":[]},"bg":{"o":[],"i":[]},"h1":{"i":[]},"h3":{"d":[],"i":[]},"c2":{"m5":[],"d":[],"i":[]},"bs":{"d":[],"i":[]},"cZ":{"t":[],"d":[],"i":[]},"ha":{"k":["X"],"x":["X"],"p":["X"],"L":["X"],"n":["X"],"i":[],"f":["X"],"x.E":"X","k.E":"X"},"ec":{"bd":["a0"],"i":[]},"ho":{"k":["aJ?"],"x":["aJ?"],"p":["aJ?"],"L":["aJ?"],"n":["aJ?"],"i":[],"f":["aJ?"],"x.E":"aJ?","k.E":"aJ?"},"el":{"k":["t"],"x":["t"],"p":["t"],"L":["t"],"n":["t"],"i":[],"f":["t"],"x.E":"t","k.E":"t"},"hP":{"k":["aQ"],"x":["aQ"],"p":["aQ"],"L":["aQ"],"n":["aQ"],"i":[],"f":["aQ"],"x.E":"aQ","k.E":"aQ"},"hV":{"k":["ay"],"x":["ay"],"p":["ay"],"L":["ay"],"n":["ay"],"i":[],"f":["ay"],"x.E":"ay","k.E":"ay"},"h6":{"D":["c","c"],"u":["c","c"]},"ed":{"D":["c","c"],"u":["c","c"],"D.K":"c","D.V":"c"},"hd":{"D":["c","c"],"u":["c","c"],"D.K":"c","D.V":"c"},"hj":{"as":["c"],"b0":["c"],"n":["c"],"f":["c"],"as.E":"c"},"cq":{"bZ":["1"]},"cp":{"cq":["1"],"bZ":["1"]},"ee":{"br":["1"]},"dS":{"bc":[]},"er":{"bc":[]},"hX":{"bc":[]},"hW":{"bc":[]},"cc":{"ac":["1"]},"hc":{"m5":[],"d":[],"i":[]},"hM":{"rJ":[]},"eE":{"rt":[]},"f2":{"as":["c"],"b0":["c"],"n":["c"],"f":["c"]},"fc":{"k":["B"],"p":["B"],"n":["B"],"f":["B"],"k.E":"B"},"cM":{"i":[]},"cg":{"k":["1"],"p":["1"],"n":["1"],"f":["1"],"k.E":"1"},"hL":{"cS":[]},"aT":{"i":[]},"aW":{"i":[]},"aX":{"i":[]},"fo":{"k":["aT"],"x":["aT"],"p":["aT"],"n":["aT"],"i":[],"f":["aT"],"x.E":"aT","k.E":"aT"},"fC":{"k":["aW"],"x":["aW"],"p":["aW"],"n":["aW"],"i":[],"f":["aW"],"x.E":"aW","k.E":"aW"},"fH":{"i":[]},"cT":{"r":[],"B":[],"t":[],"d":[],"i":[]},"fN":{"k":["c"],"x":["c"],"p":["c"],"n":["c"],"i":[],"f":["c"],"x.E":"c","k.E":"c"},"eS":{"as":["c"],"b0":["c"],"n":["c"],"f":["c"],"as.E":"c"},"r":{"B":[],"t":[],"d":[],"i":[]},"fX":{"k":["aX"],"x":["aX"],"p":["aX"],"n":["aX"],"i":[],"f":["aX"],"x.E":"aX","k.E":"aX"},"eT":{"i":[]},"eU":{"D":["c","@"],"i":[],"u":["c","@"],"D.K":"c","D.V":"@"},"eV":{"d":[],"i":[]},"bN":{"d":[],"i":[]},"fD":{"d":[],"i":[]},"kr":{"ad":[]},"lv":{"p":["j"],"n":["j"],"ad":[],"f":["j"]},"m0":{"p":["j"],"n":["j"],"ad":[],"f":["j"]},"m_":{"p":["j"],"n":["j"],"ad":[],"f":["j"]},"lt":{"p":["j"],"n":["j"],"ad":[],"f":["j"]},"lY":{"p":["j"],"n":["j"],"ad":[],"f":["j"]},"lu":{"p":["j"],"n":["j"],"ad":[],"f":["j"]},"lZ":{"p":["j"],"n":["j"],"ad":[],"f":["j"]},"lq":{"p":["W"],"n":["W"],"ad":[],"f":["W"]},"lr":{"p":["W"],"n":["W"],"ad":[],"f":["W"]}}'))
A.tf(v.typeUniverse,JSON.parse('{"n":1,"cX":1,"ar":1,"eb":1,"cY":2,"eq":1,"f1":2,"d2":1}'))
var u={f:"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u03f6\x00\u0404\u03f4 \u03f4\u03f6\u01f6\u01f6\u03f6\u03fc\u01f4\u03ff\u03ff\u0584\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u05d4\u01f4\x00\u01f4\x00\u0504\u05c4\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0400\x00\u0400\u0200\u03f7\u0200\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0200\u0200\u0200\u03f7\x00",p:": URI should have a non-empty host name: ",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.eK
return{gS:s("@<~>"),n:s("ao"),az:s("cE"),fj:s("bO"),hp:s("c8"),f_:s("bP"),lo:s("eX"),fW:s("kr"),i9:s("dm<cU,@>"),x:s("bu<c,c>"),d5:s("X"),cs:s("ab"),jS:s("b9"),gt:s("n<@>"),h:s("B"),W:s("Z"),A:s("o"),et:s("aI"),pk:s("lq"),kI:s("lr"),Y:s("cd"),la:s("by"),ad:s("cI"),fY:s("bT"),m6:s("lt"),bW:s("lu"),jx:s("lv"),bg:s("oF"),hl:s("f<t>"),e3:s("f<bB>"),R:s("f<@>"),fm:s("f<j>"),hq:s("af<u<c,c>>"),t:s("af<u<c,@>>"),lN:s("af<bc>"),dw:s("af<br<@>>"),s:s("af<c>"),J:s("af<@>"),b:s("af<j>"),T:s("dC"),m:s("i"),dY:s("bz"),dX:s("L<@>"),gq:s("cg<@>"),bX:s("bb<cU,@>"),mz:s("cM"),kT:s("aT"),fO:s("cj<c>"),p:s("p<u<c,@>>"),j:s("p<@>"),L:s("p<j>"),oT:s("p<a0>"),d:s("cN"),if:s("an<j,a0>"),dW:s("u<c,B>"),c:s("u<c,F>"),k:s("u<c,c>"),P:s("u<c,@>"),f:s("u<@,@>"),gQ:s("a_<c,c>"),ib:s("aL"),V:s("ax"),aj:s("aV"),F:s("t"),hU:s("bc"),a:s("a4"),ai:s("aW"),K:s("F"),af:s("bB"),d8:s("aM"),D:s("b_"),lZ:s("vz"),ku:s("bd<@>"),mx:s("bd<a0>"),nZ:s("cT"),gH:s("bY"),i:s("b0<c>"),ls:s("aO"),cA:s("aP"),hH:s("aQ"),l:s("bf"),N:s("c"),gL:s("c(c)"),lv:s("ay"),bC:s("r"),bR:s("cU"),fD:s("cV"),dQ:s("aR"),gJ:s("az"),I:s("cW"),ki:s("aS"),hk:s("aX"),aJ:s("Y"),do:s("bD"),bl:s("ad"),hM:s("lY"),mC:s("lZ"),nn:s("m_"),ev:s("m0"),cx:s("bF"),eG:s("e3<bB>"),ph:s("c1<c,c>"),jJ:s("h_"),B:s("I<c>"),hE:s("c2"),kg:s("m5"),f5:s("bs"),cz:s("bi<by>"),cc:s("bi<c>"),ou:s("bi<~>"),nD:s("cZ"),aN:s("aA"),E:s("cp<o>"),C:s("cp<ax>"),h6:s("cq<b_>"),U:s("bj<B>"),gp:s("bj<bB>"),ax:s("Q<by>"),j2:s("Q<c>"),_:s("Q<@>"),hy:s("Q<j>"),cU:s("Q<~>"),dl:s("cs"),mp:s("ei<F?,F?>"),y:s("H"),iW:s("H(F)"),Q:s("H(c)"),dx:s("W"),z:s("@"),mY:s("@()"),v:s("@(F)"),ng:s("@(F,bf)"),gA:s("@(b0<c>)"),S:s("j"),q:s("bP?"),aa:s("ox?"),mV:s("B?"),O:s("d?"),iC:s("cG?"),dD:s("cH?"),gK:s("a6<a4>?"),ef:s("aJ?"),dH:s("q?"),G:s("bT?"),mU:s("i?"),lH:s("p<@>?"),lG:s("u<c,c>?"),dZ:s("u<c,@>?"),eO:s("u<@,@>?"),X:s("F?"),Z:s("bY?"),jv:s("c?"),r:s("cm?"),e:s("bk<@,@>?"),g:s("hw?"),fU:s("H?"),jX:s("W?"),o:s("@(o)?"),aV:s("j?"),jh:s("a0?"),jE:s("~()?"),oV:s("~(o)?"),b9:s("~(ax)?"),gn:s("~(b_)?"),mW:s("~(H)?"),w:s("a0"),H:s("~"),M:s("~()"),p9:s("~(B)"),i6:s("~(F)"),fQ:s("~(F,bf)"),bm:s("~(c,c)"),u:s("~(c,@)"),my:s("~(cW)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.P=A.cD.prototype
B.z=A.c8.prototype
B.n=A.bP.prototype
B.r=A.ca.prototype
B.a1=A.dp.prototype
B.a2=A.dq.prototype
B.a7=A.dw.prototype
B.a8=A.dx.prototype
B.a9=A.dy.prototype
B.E=A.dz.prototype
B.F=A.dA.prototype
B.f=A.bT.prototype
B.aa=J.cJ.prototype
B.b=J.af.prototype
B.c=J.dB.prototype
B.e=J.cf.prototype
B.a=J.bU.prototype
B.ab=J.bz.prototype
B.ac=J.a.prototype
B.ak=A.dM.prototype
B.K=A.dQ.prototype
B.t=A.dU.prototype
B.M=J.fF.prototype
B.k=A.bY.prototype
B.j=A.e0.prototype
B.N=A.e2.prototype
B.l=A.cm.prototype
B.x=J.bF.prototype
B.O=A.c2.prototype
B.Q=new A.aH(401,!0,null)
B.R=new A.aH(409,!1,null)
B.m=new A.aH(null,!1,null)
B.i=new A.aH(null,!0,null)
B.T=new A.eW(!1)
B.S=new A.dk(B.T)
B.U=new A.eW(!0)
B.y=new A.dk(B.U)
B.u=new A.kq()
B.A=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.V=function() {
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
B.a_=function(getTagFallback) {
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
B.W=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.Z=function(hooks) {
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
B.Y=function(hooks) {
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
B.X=function(hooks) {
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
B.B=function(hooks) { return hooks; }

B.d=new A.fm()
B.a0=new A.fE()
B.o=new A.lP()
B.p=new A.h2()
B.C=new A.mB()
B.h=new A.hJ()
B.q=new A.hU()
B.a3=new A.b9(0)
B.a4=new A.b9(1e6)
B.D=new A.b9(1e7)
B.a5=new A.b9(15e6)
B.a6=new A.b9(4e5)
B.v=new A.ba("",null,null)
B.ad=new A.ly(null)
B.ae=new A.lz(null)
B.af=s([],t.s)
B.G=s([],t.J)
B.H=s(["bind","if","ref","repeat","syntax"],t.s)
B.w=s(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"],t.s)
B.ag=s(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"],t.s)
B.ah=s(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"],t.s)
B.al={households:0,centralAssets:1,maintenanceLogs:2,workers:3,billingRecords:4,announcements:5,paymentSettings:6,billingConfig:7,offlineCollections:8,unsyncedActions:9}
B.I=new A.bu(B.al,["waterhall_households","waterhall_central_assets","waterhall_maintenance_logs","waterhall_workers","waterhall_billing_records","waterhall_announcements","waterhall_payment_settings","waterhall_billing_config","waterhall_offline_collections","waterhall_unsynced_actions"],t.x)
B.am={"/api/billing-records/add":0,"/api/maintenance-logs/add":1,"/api/reports/add":2,"/api/announcements/add":3,"/api/households/update":4}
B.ai=new A.bu(B.am,["Meter reading and bill","Maintenance report","Service report","Announcement","Household status"],t.x)
B.L={}
B.aj=new A.bu(B.L,[],t.x)
B.J=new A.bu(B.L,[],A.eK("bu<cU,@>"))
B.an=new A.c_("call")
B.ao=A.bm("eX")
B.ap=A.bm("kr")
B.aq=A.bm("lq")
B.ar=A.bm("lr")
B.as=A.bm("lt")
B.at=A.bm("lu")
B.au=A.bm("lv")
B.av=A.bm("F")
B.aw=A.bm("lY")
B.ax=A.bm("lZ")
B.ay=A.bm("m_")
B.az=A.bm("m0")
B.aA=new A.m4(!1)})();(function staticFields(){$.mv=null
$.aZ=A.E([],A.eK("af<F>"))
$.oT=null
$.ov=null
$.ou=null
$.q5=null
$.q0=null
$.qa=null
$.n7=null
$.nd=null
$.of=null
$.da=null
$.eH=null
$.eI=null
$.o9=!1
$.O=B.h
$.p6=""
$.p7=null
$.bR=null
$.nA=null
$.oC=null
$.oB=null
$.hp=A.ap(t.N,t.Y)
$.uS=A.a2(["main_tank_level",null,"turbidity",null,"tds_ppm",null,"turbidity_status","unknown","has_reading",!1,"turbidity_desc","Awaiting sensor readings","last_updated",null],t.N,t.z)
$.q4=function(){var s=t.N
return A.a2(["payment_location","Barangay Tagpopongan Hall - Treasury Office","payment_method","In-Person Payment at Barangay Hall","allow_worker_collection","false","payment_instructions","Water bills are due on or before the 25th of each month. Payments must be settled in-person at the Barangay Hall Treasury Window. Field workers are not authorized to collect payments.","operating_hours","Monday - Friday, 8:00 AM - 5:00 PM","emergency_contact","Not configured; contact the Barangay office"],s,s)}()})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"vd","io",()=>A.oe("_$dart_dartClosure"))
s($,"vc","qi",()=>A.oe("_$dart_dartClosure_dartJSInterop"))
s($,"w5","ns",()=>B.h.dB(new A.nk(),A.eK("a6<~>")))
s($,"w2","oo",()=>A.E([new J.fg()],A.eK("af<cS>")))
s($,"vE","qp",()=>A.bE(A.lX({
toString:function(){return"$receiver$"}})))
s($,"vF","qq",()=>A.bE(A.lX({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"vG","qr",()=>A.bE(A.lX(null)))
s($,"vH","qs",()=>A.bE(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"vK","qv",()=>A.bE(A.lX(void 0)))
s($,"vL","qw",()=>A.bE(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"vJ","qu",()=>A.bE(A.p3(null)))
s($,"vI","qt",()=>A.bE(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"vN","qy",()=>A.bE(A.p3(void 0)))
s($,"vM","qx",()=>A.bE(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"vQ","ok",()=>A.rN())
s($,"vn","np",()=>$.ns())
s($,"vY","qD",()=>A.oO(4096))
s($,"vW","qB",()=>new A.mO().$0())
s($,"vX","qC",()=>new A.mN().$0())
s($,"vS","ol",()=>A.rs(A.tM(A.E([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.b))))
s($,"vR","qz",()=>A.oO(0))
s($,"ve","qj",()=>A.nL("^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(?:[.,](\\d+))?)?)?( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$"))
s($,"w0","nq",()=>A.il(B.av))
s($,"v9","qh",()=>({}))
s($,"vU","qA",()=>A.oN(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],t.N))
s($,"v5","qg",()=>A.nL("^\\S+$"))
s($,"vj","oj",()=>B.a.bm(A.nz(),"Opera",0))
s($,"vi","qm",()=>!$.oj()&&B.a.bm(A.nz(),"Trident/",0))
s($,"vh","ql",()=>B.a.bm(A.nz(),"Firefox",0))
s($,"vg","qk",()=>"-"+$.qn()+"-")
s($,"vk","qn",()=>{if($.ql())var q="moz"
else if($.qm())q="ms"
else q=$.oj()?"o":"webkit"
return q})
s($,"vZ","dh",()=>A.pZ(self))
s($,"w1","nr",()=>{$.oo().push(new A.hL())
return!0})
s($,"vT","om",()=>A.oe("_$dart_dartObject"))
s($,"w_","on",()=>function DartObject(a){this.o=a})
s($,"vy","qo",()=>{var q=new A.mu(new DataView(new ArrayBuffer(A.tH(8))))
q.ej()
return q})
s($,"w3","P",()=>{var q,p=t.t,o=A.E([],p),n=t.N,m=t.z,l=A.E([],p),k=A.E([],p),j=A.E([],p)
p=A.E([],p)
q=A.nC(null,t.H)
return new A.kv(o,A.ap(n,m),l,k,j,p,A.ap(n,n),A.ap(n,m),q,new A.e6(null,null,A.eK("e6<u<c,@>>")))})
r($,"ub","qE",()=>A.nC(null,t.H))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({WebGL:J.cJ,AnimationEffectReadOnly:J.a,AnimationEffectTiming:J.a,AnimationEffectTimingReadOnly:J.a,AnimationTimeline:J.a,AnimationWorkletGlobalScope:J.a,AuthenticatorAssertionResponse:J.a,AuthenticatorAttestationResponse:J.a,AuthenticatorResponse:J.a,BackgroundFetchFetch:J.a,BackgroundFetchManager:J.a,BackgroundFetchSettledFetch:J.a,BarProp:J.a,BarcodeDetector:J.a,BluetoothRemoteGATTDescriptor:J.a,Body:J.a,BudgetState:J.a,CacheStorage:J.a,CanvasGradient:J.a,CanvasPattern:J.a,CanvasRenderingContext2D:J.a,Client:J.a,Clients:J.a,CookieStore:J.a,Coordinates:J.a,Credential:J.a,CredentialUserData:J.a,CredentialsContainer:J.a,Crypto:J.a,CryptoKey:J.a,CSS:J.a,CSSVariableReferenceValue:J.a,CustomElementRegistry:J.a,DataTransfer:J.a,DataTransferItem:J.a,DeprecatedStorageInfo:J.a,DeprecatedStorageQuota:J.a,DeprecationReport:J.a,DetectedBarcode:J.a,DetectedFace:J.a,DetectedText:J.a,DeviceAcceleration:J.a,DeviceRotationRate:J.a,DirectoryEntry:J.a,webkitFileSystemDirectoryEntry:J.a,FileSystemDirectoryEntry:J.a,DirectoryReader:J.a,WebKitDirectoryReader:J.a,webkitFileSystemDirectoryReader:J.a,FileSystemDirectoryReader:J.a,DocumentOrShadowRoot:J.a,DocumentTimeline:J.a,DOMError:J.a,Iterator:J.a,DOMMatrix:J.a,DOMMatrixReadOnly:J.a,DOMParser:J.a,DOMPoint:J.a,DOMPointReadOnly:J.a,DOMQuad:J.a,DOMStringMap:J.a,Entry:J.a,webkitFileSystemEntry:J.a,FileSystemEntry:J.a,External:J.a,FaceDetector:J.a,FederatedCredential:J.a,FileEntry:J.a,webkitFileSystemFileEntry:J.a,FileSystemFileEntry:J.a,DOMFileSystem:J.a,WebKitFileSystem:J.a,webkitFileSystem:J.a,FileSystem:J.a,FontFace:J.a,FontFaceSource:J.a,FormData:J.a,GamepadButton:J.a,GamepadPose:J.a,Geolocation:J.a,Position:J.a,GeolocationPosition:J.a,Headers:J.a,HTMLHyperlinkElementUtils:J.a,IdleDeadline:J.a,ImageBitmap:J.a,ImageBitmapRenderingContext:J.a,ImageCapture:J.a,InputDeviceCapabilities:J.a,IntersectionObserver:J.a,IntersectionObserverEntry:J.a,InterventionReport:J.a,KeyframeEffect:J.a,KeyframeEffectReadOnly:J.a,MediaCapabilities:J.a,MediaCapabilitiesInfo:J.a,MediaDeviceInfo:J.a,MediaError:J.a,MediaKeyStatusMap:J.a,MediaKeySystemAccess:J.a,MediaKeys:J.a,MediaKeysPolicy:J.a,MediaMetadata:J.a,MediaSession:J.a,MediaSettingsRange:J.a,MemoryInfo:J.a,MessageChannel:J.a,Metadata:J.a,MutationObserver:J.a,WebKitMutationObserver:J.a,MutationRecord:J.a,NavigationPreloadManager:J.a,Navigator:J.a,NavigatorAutomationInformation:J.a,NavigatorConcurrentHardware:J.a,NavigatorCookies:J.a,NavigatorUserMediaError:J.a,NodeFilter:J.a,NodeIterator:J.a,NonDocumentTypeChildNode:J.a,NonElementParentNode:J.a,NoncedElement:J.a,OffscreenCanvasRenderingContext2D:J.a,OverconstrainedError:J.a,PaintRenderingContext2D:J.a,PaintSize:J.a,PaintWorkletGlobalScope:J.a,PasswordCredential:J.a,Path2D:J.a,PaymentAddress:J.a,PaymentInstruments:J.a,PaymentManager:J.a,PaymentResponse:J.a,PerformanceEntry:J.a,PerformanceLongTaskTiming:J.a,PerformanceMark:J.a,PerformanceMeasure:J.a,PerformanceNavigation:J.a,PerformanceNavigationTiming:J.a,PerformanceObserver:J.a,PerformanceObserverEntryList:J.a,PerformancePaintTiming:J.a,PerformanceResourceTiming:J.a,PerformanceServerTiming:J.a,PerformanceTiming:J.a,Permissions:J.a,PhotoCapabilities:J.a,PositionError:J.a,GeolocationPositionError:J.a,Presentation:J.a,PresentationReceiver:J.a,PublicKeyCredential:J.a,PushManager:J.a,PushMessageData:J.a,PushSubscription:J.a,PushSubscriptionOptions:J.a,Range:J.a,RelatedApplication:J.a,ReportBody:J.a,ReportingObserver:J.a,ResizeObserver:J.a,ResizeObserverEntry:J.a,RTCCertificate:J.a,RTCIceCandidate:J.a,mozRTCIceCandidate:J.a,RTCLegacyStatsReport:J.a,RTCRtpContributingSource:J.a,RTCRtpReceiver:J.a,RTCRtpSender:J.a,RTCSessionDescription:J.a,mozRTCSessionDescription:J.a,RTCStatsResponse:J.a,Screen:J.a,ScrollState:J.a,ScrollTimeline:J.a,Selection:J.a,SpeechRecognitionAlternative:J.a,SpeechSynthesisVoice:J.a,StaticRange:J.a,StorageManager:J.a,StyleMedia:J.a,StylePropertyMap:J.a,StylePropertyMapReadonly:J.a,SyncManager:J.a,TaskAttributionTiming:J.a,TextDetector:J.a,TextMetrics:J.a,TrackDefault:J.a,TreeWalker:J.a,TrustedHTML:J.a,TrustedScriptURL:J.a,TrustedURL:J.a,UnderlyingSourceBase:J.a,URLSearchParams:J.a,VRCoordinateSystem:J.a,VRDisplayCapabilities:J.a,VREyeParameters:J.a,VRFrameData:J.a,VRFrameOfReference:J.a,VRPose:J.a,VRStageBounds:J.a,VRStageBoundsPoint:J.a,VRStageParameters:J.a,ValidityState:J.a,VideoPlaybackQuality:J.a,VideoTrack:J.a,VTTRegion:J.a,WindowClient:J.a,WorkletAnimation:J.a,WorkletGlobalScope:J.a,XPathEvaluator:J.a,XPathExpression:J.a,XPathNSResolver:J.a,XPathResult:J.a,XMLSerializer:J.a,XSLTProcessor:J.a,Bluetooth:J.a,BluetoothCharacteristicProperties:J.a,BluetoothRemoteGATTServer:J.a,BluetoothRemoteGATTService:J.a,BluetoothUUID:J.a,BudgetService:J.a,Cache:J.a,DOMFileSystemSync:J.a,DirectoryEntrySync:J.a,DirectoryReaderSync:J.a,EntrySync:J.a,FileEntrySync:J.a,FileReaderSync:J.a,FileWriterSync:J.a,HTMLAllCollection:J.a,Mojo:J.a,MojoHandle:J.a,MojoWatcher:J.a,NFC:J.a,PagePopupController:J.a,Report:J.a,Request:J.a,Response:J.a,SubtleCrypto:J.a,USBAlternateInterface:J.a,USBConfiguration:J.a,USBDevice:J.a,USBEndpoint:J.a,USBInTransferResult:J.a,USBInterface:J.a,USBIsochronousInTransferPacket:J.a,USBIsochronousInTransferResult:J.a,USBIsochronousOutTransferPacket:J.a,USBIsochronousOutTransferResult:J.a,USBOutTransferResult:J.a,WorkerLocation:J.a,WorkerNavigator:J.a,Worklet:J.a,IDBCursor:J.a,IDBCursorWithValue:J.a,IDBFactory:J.a,IDBIndex:J.a,IDBObjectStore:J.a,IDBObservation:J.a,IDBObserver:J.a,IDBObserverChanges:J.a,SVGAngle:J.a,SVGAnimatedAngle:J.a,SVGAnimatedBoolean:J.a,SVGAnimatedEnumeration:J.a,SVGAnimatedInteger:J.a,SVGAnimatedLength:J.a,SVGAnimatedLengthList:J.a,SVGAnimatedNumber:J.a,SVGAnimatedNumberList:J.a,SVGAnimatedPreserveAspectRatio:J.a,SVGAnimatedRect:J.a,SVGAnimatedString:J.a,SVGAnimatedTransformList:J.a,SVGMatrix:J.a,SVGPoint:J.a,SVGPreserveAspectRatio:J.a,SVGRect:J.a,SVGUnitTypes:J.a,AudioListener:J.a,AudioParam:J.a,AudioTrack:J.a,AudioWorkletGlobalScope:J.a,AudioWorkletProcessor:J.a,PeriodicWave:J.a,WebGLActiveInfo:J.a,ANGLEInstancedArrays:J.a,ANGLE_instanced_arrays:J.a,WebGLBuffer:J.a,WebGLCanvas:J.a,WebGLColorBufferFloat:J.a,WebGLCompressedTextureASTC:J.a,WebGLCompressedTextureATC:J.a,WEBGL_compressed_texture_atc:J.a,WebGLCompressedTextureETC1:J.a,WEBGL_compressed_texture_etc1:J.a,WebGLCompressedTextureETC:J.a,WebGLCompressedTexturePVRTC:J.a,WEBGL_compressed_texture_pvrtc:J.a,WebGLCompressedTextureS3TC:J.a,WEBGL_compressed_texture_s3tc:J.a,WebGLCompressedTextureS3TCsRGB:J.a,WebGLDebugRendererInfo:J.a,WEBGL_debug_renderer_info:J.a,WebGLDebugShaders:J.a,WEBGL_debug_shaders:J.a,WebGLDepthTexture:J.a,WEBGL_depth_texture:J.a,WebGLDrawBuffers:J.a,WEBGL_draw_buffers:J.a,EXTsRGB:J.a,EXT_sRGB:J.a,EXTBlendMinMax:J.a,EXT_blend_minmax:J.a,EXTColorBufferFloat:J.a,EXTColorBufferHalfFloat:J.a,EXTDisjointTimerQuery:J.a,EXTDisjointTimerQueryWebGL2:J.a,EXTFragDepth:J.a,EXT_frag_depth:J.a,EXTShaderTextureLOD:J.a,EXT_shader_texture_lod:J.a,EXTTextureFilterAnisotropic:J.a,EXT_texture_filter_anisotropic:J.a,WebGLFramebuffer:J.a,WebGLGetBufferSubDataAsync:J.a,WebGLLoseContext:J.a,WebGLExtensionLoseContext:J.a,WEBGL_lose_context:J.a,OESElementIndexUint:J.a,OES_element_index_uint:J.a,OESStandardDerivatives:J.a,OES_standard_derivatives:J.a,OESTextureFloat:J.a,OES_texture_float:J.a,OESTextureFloatLinear:J.a,OES_texture_float_linear:J.a,OESTextureHalfFloat:J.a,OES_texture_half_float:J.a,OESTextureHalfFloatLinear:J.a,OES_texture_half_float_linear:J.a,OESVertexArrayObject:J.a,OES_vertex_array_object:J.a,WebGLProgram:J.a,WebGLQuery:J.a,WebGLRenderbuffer:J.a,WebGLRenderingContext:J.a,WebGL2RenderingContext:J.a,WebGLSampler:J.a,WebGLShader:J.a,WebGLShaderPrecisionFormat:J.a,WebGLSync:J.a,WebGLTexture:J.a,WebGLTimerQueryEXT:J.a,WebGLTransformFeedback:J.a,WebGLUniformLocation:J.a,WebGLVertexArrayObject:J.a,WebGLVertexArrayObjectOES:J.a,WebGL2RenderingContextBase:J.a,ArrayBuffer:A.ck,SharedArrayBuffer:A.ck,ArrayBufferView:A.dO,DataView:A.dM,Float32Array:A.fu,Float64Array:A.fv,Int16Array:A.fw,Int32Array:A.fx,Int8Array:A.fy,Uint16Array:A.fz,Uint32Array:A.fA,Uint8ClampedArray:A.dP,CanvasPixelArray:A.dP,Uint8Array:A.dQ,HTMLAudioElement:A.q,HTMLBRElement:A.q,HTMLCanvasElement:A.q,HTMLContentElement:A.q,HTMLDListElement:A.q,HTMLDataElement:A.q,HTMLDataListElement:A.q,HTMLDetailsElement:A.q,HTMLDialogElement:A.q,HTMLEmbedElement:A.q,HTMLFieldSetElement:A.q,HTMLHRElement:A.q,HTMLHeadElement:A.q,HTMLHtmlElement:A.q,HTMLIFrameElement:A.q,HTMLLIElement:A.q,HTMLLabelElement:A.q,HTMLLegendElement:A.q,HTMLLinkElement:A.q,HTMLMapElement:A.q,HTMLMediaElement:A.q,HTMLMenuElement:A.q,HTMLMetaElement:A.q,HTMLMeterElement:A.q,HTMLModElement:A.q,HTMLOListElement:A.q,HTMLObjectElement:A.q,HTMLOptGroupElement:A.q,HTMLOutputElement:A.q,HTMLParamElement:A.q,HTMLPictureElement:A.q,HTMLPreElement:A.q,HTMLProgressElement:A.q,HTMLQuoteElement:A.q,HTMLScriptElement:A.q,HTMLShadowElement:A.q,HTMLSlotElement:A.q,HTMLSourceElement:A.q,HTMLSpanElement:A.q,HTMLStyleElement:A.q,HTMLTableCaptionElement:A.q,HTMLTableCellElement:A.q,HTMLTableDataCellElement:A.q,HTMLTableHeaderCellElement:A.q,HTMLTableColElement:A.q,HTMLTimeElement:A.q,HTMLTitleElement:A.q,HTMLTrackElement:A.q,HTMLUListElement:A.q,HTMLUnknownElement:A.q,HTMLVideoElement:A.q,HTMLDirectoryElement:A.q,HTMLFontElement:A.q,HTMLFrameElement:A.q,HTMLFrameSetElement:A.q,HTMLMarqueeElement:A.q,HTMLElement:A.q,AccessibleNodeList:A.eO,HTMLAnchorElement:A.cD,HTMLAreaElement:A.eP,HTMLBaseElement:A.cE,Blob:A.bO,HTMLBodyElement:A.c8,HTMLButtonElement:A.bP,CDATASection:A.bo,CharacterData:A.bo,Comment:A.bo,ProcessingInstruction:A.bo,Text:A.bo,CSSPerspective:A.f3,CSSCharsetRule:A.X,CSSConditionRule:A.X,CSSFontFaceRule:A.X,CSSGroupingRule:A.X,CSSImportRule:A.X,CSSKeyframeRule:A.X,MozCSSKeyframeRule:A.X,WebKitCSSKeyframeRule:A.X,CSSKeyframesRule:A.X,MozCSSKeyframesRule:A.X,WebKitCSSKeyframesRule:A.X,CSSMediaRule:A.X,CSSNamespaceRule:A.X,CSSPageRule:A.X,CSSRule:A.X,CSSStyleRule:A.X,CSSSupportsRule:A.X,CSSViewportRule:A.X,CSSStyleDeclaration:A.ca,MSStyleCSSProperties:A.ca,CSS2Properties:A.ca,CSSImageValue:A.aC,CSSKeywordValue:A.aC,CSSNumericValue:A.aC,CSSPositionValue:A.aC,CSSResourceValue:A.aC,CSSUnitValue:A.aC,CSSURLImageValue:A.aC,CSSStyleValue:A.aC,CSSMatrixComponent:A.b8,CSSRotation:A.b8,CSSScale:A.b8,CSSSkew:A.b8,CSSTranslation:A.b8,CSSTransformComponent:A.b8,CSSTransformValue:A.f4,CSSUnparsedValue:A.f5,DataTransferItemList:A.f6,HTMLDivElement:A.dp,XMLDocument:A.cb,Document:A.cb,DOMException:A.f7,DOMImplementation:A.dq,ClientRectList:A.dr,DOMRectList:A.dr,DOMRectReadOnly:A.ds,DOMStringList:A.f8,DOMTokenList:A.f9,MathMLElement:A.B,Element:A.B,AbortPaymentEvent:A.o,AnimationEvent:A.o,AnimationPlaybackEvent:A.o,ApplicationCacheErrorEvent:A.o,BackgroundFetchClickEvent:A.o,BackgroundFetchEvent:A.o,BackgroundFetchFailEvent:A.o,BackgroundFetchedEvent:A.o,BeforeInstallPromptEvent:A.o,BeforeUnloadEvent:A.o,BlobEvent:A.o,CanMakePaymentEvent:A.o,ClipboardEvent:A.o,CloseEvent:A.o,CustomEvent:A.o,DeviceMotionEvent:A.o,DeviceOrientationEvent:A.o,ErrorEvent:A.o,ExtendableEvent:A.o,ExtendableMessageEvent:A.o,FetchEvent:A.o,FontFaceSetLoadEvent:A.o,ForeignFetchEvent:A.o,GamepadEvent:A.o,HashChangeEvent:A.o,InstallEvent:A.o,MediaEncryptedEvent:A.o,MediaKeyMessageEvent:A.o,MediaQueryListEvent:A.o,MediaStreamEvent:A.o,MediaStreamTrackEvent:A.o,MessageEvent:A.o,MIDIConnectionEvent:A.o,MIDIMessageEvent:A.o,MutationEvent:A.o,NotificationEvent:A.o,PageTransitionEvent:A.o,PaymentRequestEvent:A.o,PaymentRequestUpdateEvent:A.o,PopStateEvent:A.o,PresentationConnectionAvailableEvent:A.o,PresentationConnectionCloseEvent:A.o,PromiseRejectionEvent:A.o,PushEvent:A.o,RTCDataChannelEvent:A.o,RTCDTMFToneChangeEvent:A.o,RTCPeerConnectionIceEvent:A.o,RTCTrackEvent:A.o,SecurityPolicyViolationEvent:A.o,SensorErrorEvent:A.o,SpeechRecognitionError:A.o,SpeechRecognitionEvent:A.o,SpeechSynthesisEvent:A.o,StorageEvent:A.o,SyncEvent:A.o,TrackEvent:A.o,TransitionEvent:A.o,WebKitTransitionEvent:A.o,VRDeviceEvent:A.o,VRDisplayEvent:A.o,VRSessionEvent:A.o,MojoInterfaceRequestEvent:A.o,USBConnectionEvent:A.o,IDBVersionChangeEvent:A.o,AudioProcessingEvent:A.o,OfflineAudioCompletionEvent:A.o,WebGLContextEvent:A.o,Event:A.o,InputEvent:A.o,SubmitEvent:A.o,EventSource:A.du,AbsoluteOrientationSensor:A.d,Accelerometer:A.d,AccessibleNode:A.d,AmbientLightSensor:A.d,Animation:A.d,ApplicationCache:A.d,DOMApplicationCache:A.d,OfflineResourceList:A.d,BackgroundFetchRegistration:A.d,BatteryManager:A.d,BroadcastChannel:A.d,CanvasCaptureMediaStreamTrack:A.d,FontFaceSet:A.d,Gyroscope:A.d,LinearAccelerationSensor:A.d,Magnetometer:A.d,MediaDevices:A.d,MediaKeySession:A.d,MediaQueryList:A.d,MediaRecorder:A.d,MediaSource:A.d,MediaStream:A.d,MediaStreamTrack:A.d,MIDIAccess:A.d,MIDIInput:A.d,MIDIOutput:A.d,MIDIPort:A.d,NetworkInformation:A.d,Notification:A.d,OffscreenCanvas:A.d,OrientationSensor:A.d,PaymentRequest:A.d,Performance:A.d,PermissionStatus:A.d,PresentationAvailability:A.d,PresentationConnection:A.d,PresentationConnectionList:A.d,PresentationRequest:A.d,RelativeOrientationSensor:A.d,RemotePlayback:A.d,RTCDataChannel:A.d,DataChannel:A.d,RTCDTMFSender:A.d,RTCPeerConnection:A.d,webkitRTCPeerConnection:A.d,mozRTCPeerConnection:A.d,ScreenOrientation:A.d,Sensor:A.d,ServiceWorker:A.d,ServiceWorkerContainer:A.d,ServiceWorkerRegistration:A.d,SharedWorker:A.d,SpeechRecognition:A.d,webkitSpeechRecognition:A.d,SpeechSynthesis:A.d,SpeechSynthesisUtterance:A.d,VR:A.d,VRDevice:A.d,VRDisplay:A.d,VRSession:A.d,VisualViewport:A.d,WebSocket:A.d,Worker:A.d,WorkerPerformance:A.d,BluetoothDevice:A.d,BluetoothRemoteGATTCharacteristic:A.d,Clipboard:A.d,MojoInterfaceInterceptor:A.d,USB:A.d,IDBDatabase:A.d,IDBOpenDBRequest:A.d,IDBVersionChangeRequest:A.d,IDBRequest:A.d,IDBTransaction:A.d,AnalyserNode:A.d,RealtimeAnalyserNode:A.d,AudioBufferSourceNode:A.d,AudioDestinationNode:A.d,AudioNode:A.d,AudioScheduledSourceNode:A.d,AudioWorkletNode:A.d,BiquadFilterNode:A.d,ChannelMergerNode:A.d,AudioChannelMerger:A.d,ChannelSplitterNode:A.d,AudioChannelSplitter:A.d,ConstantSourceNode:A.d,ConvolverNode:A.d,DelayNode:A.d,DynamicsCompressorNode:A.d,GainNode:A.d,AudioGainNode:A.d,IIRFilterNode:A.d,MediaElementAudioSourceNode:A.d,MediaStreamAudioDestinationNode:A.d,MediaStreamAudioSourceNode:A.d,OscillatorNode:A.d,Oscillator:A.d,PannerNode:A.d,AudioPannerNode:A.d,webkitAudioPannerNode:A.d,ScriptProcessorNode:A.d,JavaScriptAudioNode:A.d,StereoPannerNode:A.d,WaveShaperNode:A.d,EventTarget:A.d,File:A.aI,FileList:A.dw,FileReader:A.dx,FileWriter:A.fb,HTMLFormElement:A.cH,Gamepad:A.aJ,HTMLHeadingElement:A.dy,History:A.fd,HTMLCollection:A.bS,HTMLFormControlsCollection:A.bS,HTMLOptionsCollection:A.bS,HTMLDocument:A.dz,XMLHttpRequest:A.by,XMLHttpRequestUpload:A.ce,XMLHttpRequestEventTarget:A.ce,ImageData:A.cI,HTMLImageElement:A.dA,HTMLInputElement:A.bT,Location:A.cN,MediaList:A.fp,MessagePort:A.fq,MIDIInputMap:A.fr,MIDIOutputMap:A.fs,MimeType:A.aL,MimeTypeArray:A.ft,MouseEvent:A.ax,DragEvent:A.ax,PointerEvent:A.ax,WheelEvent:A.ax,DocumentFragment:A.t,ShadowRoot:A.t,DocumentType:A.t,Node:A.t,NodeList:A.dR,RadioNodeList:A.dR,HTMLOptionElement:A.bB,HTMLParagraphElement:A.dU,Plugin:A.aM,PluginArray:A.fG,ProgressEvent:A.b_,ResourceProgressEvent:A.b_,RTCStatsReport:A.fI,HTMLSelectElement:A.bY,SourceBuffer:A.aO,SourceBufferList:A.fK,SpeechGrammar:A.aP,SpeechGrammarList:A.fL,SpeechRecognitionResult:A.aQ,Storage:A.e0,CSSStyleSheet:A.ay,StyleSheet:A.ay,HTMLTableElement:A.e2,HTMLTableRowElement:A.fO,HTMLTableSectionElement:A.fP,HTMLTemplateElement:A.cV,HTMLTextAreaElement:A.cm,TextTrack:A.aR,TextTrackCue:A.az,VTTCue:A.az,TextTrackCueList:A.fR,TextTrackList:A.fS,TimeRanges:A.fT,Touch:A.aS,TouchList:A.fV,TrackDefaultList:A.fW,CompositionEvent:A.bg,FocusEvent:A.bg,KeyboardEvent:A.bg,TextEvent:A.bg,TouchEvent:A.bg,UIEvent:A.bg,URL:A.h1,VideoTrackList:A.h3,Window:A.c2,DOMWindow:A.c2,DedicatedWorkerGlobalScope:A.bs,ServiceWorkerGlobalScope:A.bs,SharedWorkerGlobalScope:A.bs,WorkerGlobalScope:A.bs,Attr:A.cZ,CSSRuleList:A.ha,ClientRect:A.ec,DOMRect:A.ec,GamepadList:A.ho,NamedNodeMap:A.el,MozNamedAttrMap:A.el,SpeechRecognitionResultList:A.hP,StyleSheetList:A.hV,IDBKeyRange:A.cM,SVGLength:A.aT,SVGLengthList:A.fo,SVGNumber:A.aW,SVGNumberList:A.fC,SVGPointList:A.fH,SVGScriptElement:A.cT,SVGStringList:A.fN,SVGAElement:A.r,SVGAnimateElement:A.r,SVGAnimateMotionElement:A.r,SVGAnimateTransformElement:A.r,SVGAnimationElement:A.r,SVGCircleElement:A.r,SVGClipPathElement:A.r,SVGDefsElement:A.r,SVGDescElement:A.r,SVGDiscardElement:A.r,SVGEllipseElement:A.r,SVGFEBlendElement:A.r,SVGFEColorMatrixElement:A.r,SVGFEComponentTransferElement:A.r,SVGFECompositeElement:A.r,SVGFEConvolveMatrixElement:A.r,SVGFEDiffuseLightingElement:A.r,SVGFEDisplacementMapElement:A.r,SVGFEDistantLightElement:A.r,SVGFEFloodElement:A.r,SVGFEFuncAElement:A.r,SVGFEFuncBElement:A.r,SVGFEFuncGElement:A.r,SVGFEFuncRElement:A.r,SVGFEGaussianBlurElement:A.r,SVGFEImageElement:A.r,SVGFEMergeElement:A.r,SVGFEMergeNodeElement:A.r,SVGFEMorphologyElement:A.r,SVGFEOffsetElement:A.r,SVGFEPointLightElement:A.r,SVGFESpecularLightingElement:A.r,SVGFESpotLightElement:A.r,SVGFETileElement:A.r,SVGFETurbulenceElement:A.r,SVGFilterElement:A.r,SVGForeignObjectElement:A.r,SVGGElement:A.r,SVGGeometryElement:A.r,SVGGraphicsElement:A.r,SVGImageElement:A.r,SVGLineElement:A.r,SVGLinearGradientElement:A.r,SVGMarkerElement:A.r,SVGMaskElement:A.r,SVGMetadataElement:A.r,SVGPathElement:A.r,SVGPatternElement:A.r,SVGPolygonElement:A.r,SVGPolylineElement:A.r,SVGRadialGradientElement:A.r,SVGRectElement:A.r,SVGSetElement:A.r,SVGStopElement:A.r,SVGStyleElement:A.r,SVGSVGElement:A.r,SVGSwitchElement:A.r,SVGSymbolElement:A.r,SVGTSpanElement:A.r,SVGTextContentElement:A.r,SVGTextElement:A.r,SVGTextPathElement:A.r,SVGTextPositioningElement:A.r,SVGTitleElement:A.r,SVGUseElement:A.r,SVGViewElement:A.r,SVGGradientElement:A.r,SVGComponentTransferFunctionElement:A.r,SVGFEDropShadowElement:A.r,SVGMPathElement:A.r,SVGElement:A.r,SVGTransform:A.aX,SVGTransformList:A.fX,AudioBuffer:A.eT,AudioParamMap:A.eU,AudioTrackList:A.eV,AudioContext:A.bN,webkitAudioContext:A.bN,BaseAudioContext:A.bN,OfflineAudioContext:A.fD})
hunkHelpers.setOrUpdateLeafTags({WebGL:true,AnimationEffectReadOnly:true,AnimationEffectTiming:true,AnimationEffectTimingReadOnly:true,AnimationTimeline:true,AnimationWorkletGlobalScope:true,AuthenticatorAssertionResponse:true,AuthenticatorAttestationResponse:true,AuthenticatorResponse:true,BackgroundFetchFetch:true,BackgroundFetchManager:true,BackgroundFetchSettledFetch:true,BarProp:true,BarcodeDetector:true,BluetoothRemoteGATTDescriptor:true,Body:true,BudgetState:true,CacheStorage:true,CanvasGradient:true,CanvasPattern:true,CanvasRenderingContext2D:true,Client:true,Clients:true,CookieStore:true,Coordinates:true,Credential:true,CredentialUserData:true,CredentialsContainer:true,Crypto:true,CryptoKey:true,CSS:true,CSSVariableReferenceValue:true,CustomElementRegistry:true,DataTransfer:true,DataTransferItem:true,DeprecatedStorageInfo:true,DeprecatedStorageQuota:true,DeprecationReport:true,DetectedBarcode:true,DetectedFace:true,DetectedText:true,DeviceAcceleration:true,DeviceRotationRate:true,DirectoryEntry:true,webkitFileSystemDirectoryEntry:true,FileSystemDirectoryEntry:true,DirectoryReader:true,WebKitDirectoryReader:true,webkitFileSystemDirectoryReader:true,FileSystemDirectoryReader:true,DocumentOrShadowRoot:true,DocumentTimeline:true,DOMError:true,Iterator:true,DOMMatrix:true,DOMMatrixReadOnly:true,DOMParser:true,DOMPoint:true,DOMPointReadOnly:true,DOMQuad:true,DOMStringMap:true,Entry:true,webkitFileSystemEntry:true,FileSystemEntry:true,External:true,FaceDetector:true,FederatedCredential:true,FileEntry:true,webkitFileSystemFileEntry:true,FileSystemFileEntry:true,DOMFileSystem:true,WebKitFileSystem:true,webkitFileSystem:true,FileSystem:true,FontFace:true,FontFaceSource:true,FormData:true,GamepadButton:true,GamepadPose:true,Geolocation:true,Position:true,GeolocationPosition:true,Headers:true,HTMLHyperlinkElementUtils:true,IdleDeadline:true,ImageBitmap:true,ImageBitmapRenderingContext:true,ImageCapture:true,InputDeviceCapabilities:true,IntersectionObserver:true,IntersectionObserverEntry:true,InterventionReport:true,KeyframeEffect:true,KeyframeEffectReadOnly:true,MediaCapabilities:true,MediaCapabilitiesInfo:true,MediaDeviceInfo:true,MediaError:true,MediaKeyStatusMap:true,MediaKeySystemAccess:true,MediaKeys:true,MediaKeysPolicy:true,MediaMetadata:true,MediaSession:true,MediaSettingsRange:true,MemoryInfo:true,MessageChannel:true,Metadata:true,MutationObserver:true,WebKitMutationObserver:true,MutationRecord:true,NavigationPreloadManager:true,Navigator:true,NavigatorAutomationInformation:true,NavigatorConcurrentHardware:true,NavigatorCookies:true,NavigatorUserMediaError:true,NodeFilter:true,NodeIterator:true,NonDocumentTypeChildNode:true,NonElementParentNode:true,NoncedElement:true,OffscreenCanvasRenderingContext2D:true,OverconstrainedError:true,PaintRenderingContext2D:true,PaintSize:true,PaintWorkletGlobalScope:true,PasswordCredential:true,Path2D:true,PaymentAddress:true,PaymentInstruments:true,PaymentManager:true,PaymentResponse:true,PerformanceEntry:true,PerformanceLongTaskTiming:true,PerformanceMark:true,PerformanceMeasure:true,PerformanceNavigation:true,PerformanceNavigationTiming:true,PerformanceObserver:true,PerformanceObserverEntryList:true,PerformancePaintTiming:true,PerformanceResourceTiming:true,PerformanceServerTiming:true,PerformanceTiming:true,Permissions:true,PhotoCapabilities:true,PositionError:true,GeolocationPositionError:true,Presentation:true,PresentationReceiver:true,PublicKeyCredential:true,PushManager:true,PushMessageData:true,PushSubscription:true,PushSubscriptionOptions:true,Range:true,RelatedApplication:true,ReportBody:true,ReportingObserver:true,ResizeObserver:true,ResizeObserverEntry:true,RTCCertificate:true,RTCIceCandidate:true,mozRTCIceCandidate:true,RTCLegacyStatsReport:true,RTCRtpContributingSource:true,RTCRtpReceiver:true,RTCRtpSender:true,RTCSessionDescription:true,mozRTCSessionDescription:true,RTCStatsResponse:true,Screen:true,ScrollState:true,ScrollTimeline:true,Selection:true,SpeechRecognitionAlternative:true,SpeechSynthesisVoice:true,StaticRange:true,StorageManager:true,StyleMedia:true,StylePropertyMap:true,StylePropertyMapReadonly:true,SyncManager:true,TaskAttributionTiming:true,TextDetector:true,TextMetrics:true,TrackDefault:true,TreeWalker:true,TrustedHTML:true,TrustedScriptURL:true,TrustedURL:true,UnderlyingSourceBase:true,URLSearchParams:true,VRCoordinateSystem:true,VRDisplayCapabilities:true,VREyeParameters:true,VRFrameData:true,VRFrameOfReference:true,VRPose:true,VRStageBounds:true,VRStageBoundsPoint:true,VRStageParameters:true,ValidityState:true,VideoPlaybackQuality:true,VideoTrack:true,VTTRegion:true,WindowClient:true,WorkletAnimation:true,WorkletGlobalScope:true,XPathEvaluator:true,XPathExpression:true,XPathNSResolver:true,XPathResult:true,XMLSerializer:true,XSLTProcessor:true,Bluetooth:true,BluetoothCharacteristicProperties:true,BluetoothRemoteGATTServer:true,BluetoothRemoteGATTService:true,BluetoothUUID:true,BudgetService:true,Cache:true,DOMFileSystemSync:true,DirectoryEntrySync:true,DirectoryReaderSync:true,EntrySync:true,FileEntrySync:true,FileReaderSync:true,FileWriterSync:true,HTMLAllCollection:true,Mojo:true,MojoHandle:true,MojoWatcher:true,NFC:true,PagePopupController:true,Report:true,Request:true,Response:true,SubtleCrypto:true,USBAlternateInterface:true,USBConfiguration:true,USBDevice:true,USBEndpoint:true,USBInTransferResult:true,USBInterface:true,USBIsochronousInTransferPacket:true,USBIsochronousInTransferResult:true,USBIsochronousOutTransferPacket:true,USBIsochronousOutTransferResult:true,USBOutTransferResult:true,WorkerLocation:true,WorkerNavigator:true,Worklet:true,IDBCursor:true,IDBCursorWithValue:true,IDBFactory:true,IDBIndex:true,IDBObjectStore:true,IDBObservation:true,IDBObserver:true,IDBObserverChanges:true,SVGAngle:true,SVGAnimatedAngle:true,SVGAnimatedBoolean:true,SVGAnimatedEnumeration:true,SVGAnimatedInteger:true,SVGAnimatedLength:true,SVGAnimatedLengthList:true,SVGAnimatedNumber:true,SVGAnimatedNumberList:true,SVGAnimatedPreserveAspectRatio:true,SVGAnimatedRect:true,SVGAnimatedString:true,SVGAnimatedTransformList:true,SVGMatrix:true,SVGPoint:true,SVGPreserveAspectRatio:true,SVGRect:true,SVGUnitTypes:true,AudioListener:true,AudioParam:true,AudioTrack:true,AudioWorkletGlobalScope:true,AudioWorkletProcessor:true,PeriodicWave:true,WebGLActiveInfo:true,ANGLEInstancedArrays:true,ANGLE_instanced_arrays:true,WebGLBuffer:true,WebGLCanvas:true,WebGLColorBufferFloat:true,WebGLCompressedTextureASTC:true,WebGLCompressedTextureATC:true,WEBGL_compressed_texture_atc:true,WebGLCompressedTextureETC1:true,WEBGL_compressed_texture_etc1:true,WebGLCompressedTextureETC:true,WebGLCompressedTexturePVRTC:true,WEBGL_compressed_texture_pvrtc:true,WebGLCompressedTextureS3TC:true,WEBGL_compressed_texture_s3tc:true,WebGLCompressedTextureS3TCsRGB:true,WebGLDebugRendererInfo:true,WEBGL_debug_renderer_info:true,WebGLDebugShaders:true,WEBGL_debug_shaders:true,WebGLDepthTexture:true,WEBGL_depth_texture:true,WebGLDrawBuffers:true,WEBGL_draw_buffers:true,EXTsRGB:true,EXT_sRGB:true,EXTBlendMinMax:true,EXT_blend_minmax:true,EXTColorBufferFloat:true,EXTColorBufferHalfFloat:true,EXTDisjointTimerQuery:true,EXTDisjointTimerQueryWebGL2:true,EXTFragDepth:true,EXT_frag_depth:true,EXTShaderTextureLOD:true,EXT_shader_texture_lod:true,EXTTextureFilterAnisotropic:true,EXT_texture_filter_anisotropic:true,WebGLFramebuffer:true,WebGLGetBufferSubDataAsync:true,WebGLLoseContext:true,WebGLExtensionLoseContext:true,WEBGL_lose_context:true,OESElementIndexUint:true,OES_element_index_uint:true,OESStandardDerivatives:true,OES_standard_derivatives:true,OESTextureFloat:true,OES_texture_float:true,OESTextureFloatLinear:true,OES_texture_float_linear:true,OESTextureHalfFloat:true,OES_texture_half_float:true,OESTextureHalfFloatLinear:true,OES_texture_half_float_linear:true,OESVertexArrayObject:true,OES_vertex_array_object:true,WebGLProgram:true,WebGLQuery:true,WebGLRenderbuffer:true,WebGLRenderingContext:true,WebGL2RenderingContext:true,WebGLSampler:true,WebGLShader:true,WebGLShaderPrecisionFormat:true,WebGLSync:true,WebGLTexture:true,WebGLTimerQueryEXT:true,WebGLTransformFeedback:true,WebGLUniformLocation:true,WebGLVertexArrayObject:true,WebGLVertexArrayObjectOES:true,WebGL2RenderingContextBase:true,ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false,HTMLAudioElement:true,HTMLBRElement:true,HTMLCanvasElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOutputElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLSpanElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,AccessibleNodeList:true,HTMLAnchorElement:true,HTMLAreaElement:true,HTMLBaseElement:true,Blob:false,HTMLBodyElement:true,HTMLButtonElement:true,CDATASection:true,CharacterData:true,Comment:true,ProcessingInstruction:true,Text:true,CSSPerspective:true,CSSCharsetRule:true,CSSConditionRule:true,CSSFontFaceRule:true,CSSGroupingRule:true,CSSImportRule:true,CSSKeyframeRule:true,MozCSSKeyframeRule:true,WebKitCSSKeyframeRule:true,CSSKeyframesRule:true,MozCSSKeyframesRule:true,WebKitCSSKeyframesRule:true,CSSMediaRule:true,CSSNamespaceRule:true,CSSPageRule:true,CSSRule:true,CSSStyleRule:true,CSSSupportsRule:true,CSSViewportRule:true,CSSStyleDeclaration:true,MSStyleCSSProperties:true,CSS2Properties:true,CSSImageValue:true,CSSKeywordValue:true,CSSNumericValue:true,CSSPositionValue:true,CSSResourceValue:true,CSSUnitValue:true,CSSURLImageValue:true,CSSStyleValue:false,CSSMatrixComponent:true,CSSRotation:true,CSSScale:true,CSSSkew:true,CSSTranslation:true,CSSTransformComponent:false,CSSTransformValue:true,CSSUnparsedValue:true,DataTransferItemList:true,HTMLDivElement:true,XMLDocument:true,Document:false,DOMException:true,DOMImplementation:true,ClientRectList:true,DOMRectList:true,DOMRectReadOnly:false,DOMStringList:true,DOMTokenList:true,MathMLElement:true,Element:false,AbortPaymentEvent:true,AnimationEvent:true,AnimationPlaybackEvent:true,ApplicationCacheErrorEvent:true,BackgroundFetchClickEvent:true,BackgroundFetchEvent:true,BackgroundFetchFailEvent:true,BackgroundFetchedEvent:true,BeforeInstallPromptEvent:true,BeforeUnloadEvent:true,BlobEvent:true,CanMakePaymentEvent:true,ClipboardEvent:true,CloseEvent:true,CustomEvent:true,DeviceMotionEvent:true,DeviceOrientationEvent:true,ErrorEvent:true,ExtendableEvent:true,ExtendableMessageEvent:true,FetchEvent:true,FontFaceSetLoadEvent:true,ForeignFetchEvent:true,GamepadEvent:true,HashChangeEvent:true,InstallEvent:true,MediaEncryptedEvent:true,MediaKeyMessageEvent:true,MediaQueryListEvent:true,MediaStreamEvent:true,MediaStreamTrackEvent:true,MessageEvent:true,MIDIConnectionEvent:true,MIDIMessageEvent:true,MutationEvent:true,NotificationEvent:true,PageTransitionEvent:true,PaymentRequestEvent:true,PaymentRequestUpdateEvent:true,PopStateEvent:true,PresentationConnectionAvailableEvent:true,PresentationConnectionCloseEvent:true,PromiseRejectionEvent:true,PushEvent:true,RTCDataChannelEvent:true,RTCDTMFToneChangeEvent:true,RTCPeerConnectionIceEvent:true,RTCTrackEvent:true,SecurityPolicyViolationEvent:true,SensorErrorEvent:true,SpeechRecognitionError:true,SpeechRecognitionEvent:true,SpeechSynthesisEvent:true,StorageEvent:true,SyncEvent:true,TrackEvent:true,TransitionEvent:true,WebKitTransitionEvent:true,VRDeviceEvent:true,VRDisplayEvent:true,VRSessionEvent:true,MojoInterfaceRequestEvent:true,USBConnectionEvent:true,IDBVersionChangeEvent:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,WebGLContextEvent:true,Event:false,InputEvent:false,SubmitEvent:false,EventSource:true,AbsoluteOrientationSensor:true,Accelerometer:true,AccessibleNode:true,AmbientLightSensor:true,Animation:true,ApplicationCache:true,DOMApplicationCache:true,OfflineResourceList:true,BackgroundFetchRegistration:true,BatteryManager:true,BroadcastChannel:true,CanvasCaptureMediaStreamTrack:true,FontFaceSet:true,Gyroscope:true,LinearAccelerationSensor:true,Magnetometer:true,MediaDevices:true,MediaKeySession:true,MediaQueryList:true,MediaRecorder:true,MediaSource:true,MediaStream:true,MediaStreamTrack:true,MIDIAccess:true,MIDIInput:true,MIDIOutput:true,MIDIPort:true,NetworkInformation:true,Notification:true,OffscreenCanvas:true,OrientationSensor:true,PaymentRequest:true,Performance:true,PermissionStatus:true,PresentationAvailability:true,PresentationConnection:true,PresentationConnectionList:true,PresentationRequest:true,RelativeOrientationSensor:true,RemotePlayback:true,RTCDataChannel:true,DataChannel:true,RTCDTMFSender:true,RTCPeerConnection:true,webkitRTCPeerConnection:true,mozRTCPeerConnection:true,ScreenOrientation:true,Sensor:true,ServiceWorker:true,ServiceWorkerContainer:true,ServiceWorkerRegistration:true,SharedWorker:true,SpeechRecognition:true,webkitSpeechRecognition:true,SpeechSynthesis:true,SpeechSynthesisUtterance:true,VR:true,VRDevice:true,VRDisplay:true,VRSession:true,VisualViewport:true,WebSocket:true,Worker:true,WorkerPerformance:true,BluetoothDevice:true,BluetoothRemoteGATTCharacteristic:true,Clipboard:true,MojoInterfaceInterceptor:true,USB:true,IDBDatabase:true,IDBOpenDBRequest:true,IDBVersionChangeRequest:true,IDBRequest:true,IDBTransaction:true,AnalyserNode:true,RealtimeAnalyserNode:true,AudioBufferSourceNode:true,AudioDestinationNode:true,AudioNode:true,AudioScheduledSourceNode:true,AudioWorkletNode:true,BiquadFilterNode:true,ChannelMergerNode:true,AudioChannelMerger:true,ChannelSplitterNode:true,AudioChannelSplitter:true,ConstantSourceNode:true,ConvolverNode:true,DelayNode:true,DynamicsCompressorNode:true,GainNode:true,AudioGainNode:true,IIRFilterNode:true,MediaElementAudioSourceNode:true,MediaStreamAudioDestinationNode:true,MediaStreamAudioSourceNode:true,OscillatorNode:true,Oscillator:true,PannerNode:true,AudioPannerNode:true,webkitAudioPannerNode:true,ScriptProcessorNode:true,JavaScriptAudioNode:true,StereoPannerNode:true,WaveShaperNode:true,EventTarget:false,File:true,FileList:true,FileReader:true,FileWriter:true,HTMLFormElement:true,Gamepad:true,HTMLHeadingElement:true,History:true,HTMLCollection:true,HTMLFormControlsCollection:true,HTMLOptionsCollection:true,HTMLDocument:true,XMLHttpRequest:true,XMLHttpRequestUpload:true,XMLHttpRequestEventTarget:false,ImageData:true,HTMLImageElement:true,HTMLInputElement:true,Location:true,MediaList:true,MessagePort:true,MIDIInputMap:true,MIDIOutputMap:true,MimeType:true,MimeTypeArray:true,MouseEvent:true,DragEvent:true,PointerEvent:true,WheelEvent:true,DocumentFragment:true,ShadowRoot:true,DocumentType:true,Node:false,NodeList:true,RadioNodeList:true,HTMLOptionElement:true,HTMLParagraphElement:true,Plugin:true,PluginArray:true,ProgressEvent:true,ResourceProgressEvent:true,RTCStatsReport:true,HTMLSelectElement:true,SourceBuffer:true,SourceBufferList:true,SpeechGrammar:true,SpeechGrammarList:true,SpeechRecognitionResult:true,Storage:true,CSSStyleSheet:true,StyleSheet:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,TextTrack:true,TextTrackCue:true,VTTCue:true,TextTrackCueList:true,TextTrackList:true,TimeRanges:true,Touch:true,TouchList:true,TrackDefaultList:true,CompositionEvent:true,FocusEvent:true,KeyboardEvent:true,TextEvent:true,TouchEvent:true,UIEvent:false,URL:true,VideoTrackList:true,Window:true,DOMWindow:true,DedicatedWorkerGlobalScope:true,ServiceWorkerGlobalScope:true,SharedWorkerGlobalScope:true,WorkerGlobalScope:true,Attr:true,CSSRuleList:true,ClientRect:true,DOMRect:true,GamepadList:true,NamedNodeMap:true,MozNamedAttrMap:true,SpeechRecognitionResultList:true,StyleSheetList:true,IDBKeyRange:true,SVGLength:true,SVGLengthList:true,SVGNumber:true,SVGNumberList:true,SVGPointList:true,SVGScriptElement:true,SVGStringList:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true,SVGElement:false,SVGTransform:true,SVGTransformList:true,AudioBuffer:true,AudioParamMap:true,AudioTrackList:true,AudioContext:true,webkitAudioContext:true,BaseAudioContext:false,OfflineAudioContext:true})
A.ar.$nativeSuperclassTag="ArrayBufferView"
A.em.$nativeSuperclassTag="ArrayBufferView"
A.en.$nativeSuperclassTag="ArrayBufferView"
A.dN.$nativeSuperclassTag="ArrayBufferView"
A.eo.$nativeSuperclassTag="ArrayBufferView"
A.ep.$nativeSuperclassTag="ArrayBufferView"
A.aV.$nativeSuperclassTag="ArrayBufferView"
A.es.$nativeSuperclassTag="EventTarget"
A.et.$nativeSuperclassTag="EventTarget"
A.ew.$nativeSuperclassTag="EventTarget"
A.ex.$nativeSuperclassTag="EventTarget"})()
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$0=function(){return this()}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$1$1=function(a){return this(a)}
Function.prototype.$1$0=function(){return this()}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.uP
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
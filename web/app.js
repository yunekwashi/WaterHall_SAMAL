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
if(a[b]!==s){A.uH(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.A(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.nW(b)
return new s(c,this)}:function(){if(s===null)s=A.nW(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.nW(a).prototype
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
o1(a,b,c,d){return{i:a,p:b,e:c,x:d}},
mU(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.o_==null){A.ut()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.b(A.oS("Return interceptor for "+A.h(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.mf
if(o==null)o=$.mf=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.uA(a)
if(p!=null)return p
if(typeof a=="function")return B.a8
s=Object.getPrototypeOf(a)
if(s==null)return B.K
if(s===Object.prototype)return B.K
if(typeof q=="function"){o=$.mf
if(o==null)o=$.mf=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.v,enumerable:false,writable:true,configurable:true})
return B.v}return B.v},
or(a,b){if(a<0||a>4294967295)throw A.b(A.aj(a,0,4294967295,"length",null))
return J.r8(new Array(a),b)},
np(a,b){if(a<0)throw A.b(A.b6("Length must be a non-negative integer: "+a,null))
return A.A(new Array(a),b.i("ae<0>"))},
r8(a,b){var s=A.A(a,b.i("ae<0>"))
s.$flags=1
return s},
os(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
r9(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.os(r))break;++b}return b},
ra(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.e(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.os(q))break}return b},
bK(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dB.prototype
return J.fi.prototype}if(typeof a=="string")return J.bU.prototype
if(a==null)return J.dC.prototype
if(typeof a=="boolean")return J.fg.prototype
if(Array.isArray(a))return J.ae.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bv.prototype
if(typeof a=="symbol")return J.cL.prototype
if(typeof a=="bigint")return J.cK.prototype
return a}if(a instanceof A.F)return a
return J.mU(a)},
D(a){if(typeof a=="string")return J.bU.prototype
if(a==null)return a
if(Array.isArray(a))return J.ae.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bv.prototype
if(typeof a=="symbol")return J.cL.prototype
if(typeof a=="bigint")return J.cK.prototype
return a}if(a instanceof A.F)return a
return J.mU(a)},
cz(a){if(a==null)return a
if(Array.isArray(a))return J.ae.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bv.prototype
if(typeof a=="symbol")return J.cL.prototype
if(typeof a=="bigint")return J.cK.prototype
return a}if(a instanceof A.F)return a
return J.mU(a)},
ul(a){if(typeof a=="number")return J.cf.prototype
if(a==null)return a
if(!(a instanceof A.F))return J.bC.prototype
return a},
um(a){if(typeof a=="number")return J.cf.prototype
if(typeof a=="string")return J.bU.prototype
if(a==null)return a
if(!(a instanceof A.F))return J.bC.prototype
return a},
nX(a){if(typeof a=="string")return J.bU.prototype
if(a==null)return a
if(!(a instanceof A.F))return J.bC.prototype
return a},
K(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bv.prototype
if(typeof a=="symbol")return J.cL.prototype
if(typeof a=="bigint")return J.cK.prototype
return a}if(a instanceof A.F)return a
return J.mU(a)},
nY(a){if(a==null)return a
if(!(a instanceof A.F))return J.bC.prototype
return a},
n(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bK(a).Z(a,b)},
qs(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.ul(a).b7(a,b)},
qt(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.um(a).aC(a,b)},
m(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.uw(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.D(a).h(a,b)},
bi(a,b,c){return J.cz(a).k(a,b,c)},
il(a){return J.K(a).ex(a)},
qu(a,b,c,d){return J.K(a).eH(a,b,c,d)},
qv(a,b){return J.K(a).eQ(a,b)},
qw(a,b,c,d){return J.K(a).eS(a,b,c,d)},
qx(a,b,c){return J.K(a).eV(a,b,c)},
nf(a,b){return J.cz(a).m(a,b)},
qy(a,b,c,d){return J.K(a).bi(a,b,c,d)},
qz(a,b){return J.K(a).fh(a,b)},
qA(a,b,c){return J.K(a).d6(a,b,c)},
o9(a){return J.nY(a).aI(a)},
ng(a,b){return J.D(a).A(a,b)},
nh(a,b){return J.K(a).I(a,b)},
eL(a,b){return J.cz(a).v(a,b)},
qB(a,b){return J.cz(a).fz(a,b)},
eM(a,b){return J.cz(a).p(a,b)},
qC(a){return J.K(a).gfi(a)},
oa(a){return J.K(a).gda(a)},
c7(a){return J.K(a).gak(a)},
qD(a){return J.K(a).gau(a)},
cC(a){return J.bK(a).gF(a)},
im(a){return J.D(a).gD(a)},
ni(a){return J.D(a).gR(a)},
b4(a){return J.cz(a).gC(a)},
qE(a){return J.K(a).gG(a)},
ag(a){return J.D(a).gj(a)},
a8(a){return J.K(a).gav(a)},
qF(a){return J.nY(a).gcb(a)},
ob(a){return J.nY(a).gad(a)},
qG(a){return J.K(a).gh0(a)},
qH(a){return J.bK(a).gU(a)},
qI(a){return J.K(a).ge_(a)},
di(a,b,c){return J.cz(a).am(a,b,c)},
qJ(a,b){return J.bK(a).dm(a,b)},
qK(a,b,c){return J.K(a).fQ(a,b,c)},
io(a){return J.K(a).dr(a)},
qL(a,b){return J.K(a).B(a,b)},
qM(a,b){return J.K(a).dv(a,b)},
qN(a,b){return J.K(a).dZ(a,b)},
qO(a,b){return J.K(a).seJ(a,b)},
dj(a,b){return J.K(a).sO(a,b)},
v(a,b){return J.K(a).sV(a,b)},
qP(a,b,c){return J.K(a).cp(a,b,c)},
oc(a,b){return J.nX(a).e0(a,b)},
qQ(a){return J.nX(a).h2(a)},
M(a){return J.bK(a).l(a)},
od(a){return J.nX(a).t(a)},
qR(a,b){return J.cz(a).dG(a,b)},
cJ:function cJ(){},
fg:function fg(){},
dC:function dC(){},
a:function a(){},
bV:function bV(){},
fE:function fE(){},
bC:function bC(){},
bv:function bv(){},
cK:function cK(){},
cL:function cL(){},
ae:function ae(a){this.$ti=a},
ff:function ff(){},
lk:function lk(a){this.$ti=a},
b7:function b7(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cf:function cf(){},
dB:function dB(){},
fi:function fi(){},
bU:function bU(){}},A={nq:function nq(){},
ou(a){return new A.dF("Field '"+a+"' has been assigned during initialization.")},
rc(a){return new A.dF("Field '"+a+"' has not been initialized.")},
mV(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
c0(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
ny(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
cx(a,b,c){return a},
o0(a){var s,r
for(s=$.aY.length,r=0;r<s;++r)if(a===$.aY[r])return!0
return!1},
nx(a,b,c,d){A.dZ(b,"start")
if(c!=null){A.dZ(c,"end")
if(b>c)A.bM(A.aj(b,0,c,"start",null))}return new A.e1(a,b,c,d.i("e1<0>"))},
rd(a,b,c,d){if(t.gt.b(a))return new A.bs(a,b,c.i("@<0>").H(d).i("bs<1,2>"))
return new A.aC(a,b,c.i("@<0>").H(d).i("aC<1,2>"))},
fe(){return new A.bz("No element")},
r6(){return new A.bz("Too many elements")},
dF:function dF(a){this.a=a},
eZ:function eZ(a){this.a=a},
n5:function n5(){},
lD:function lD(){},
l:function l(){},
af:function af(){},
e1:function e1(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
bw:function bw(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aC:function aC(a,b,c){this.a=a
this.b=b
this.$ti=c},
bs:function bs(a,b,c){this.a=a
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
J:function J(a,b,c){this.a=a
this.b=b
this.$ti=c},
bf:function bf(a,b,c){this.a=a
this.b=b
this.$ti=c},
co:function co(a,b){this.a=a
this.$ti=b},
e5:function e5(a,b){this.a=a
this.$ti=b},
aB:function aB(){},
bD:function bD(){},
cX:function cX(){},
hv:function hv(a){this.a=a},
cj:function cj(a,b){this.a=a
this.$ti=b},
c_:function c_(a){this.a=a},
ol(){throw A.b(A.N("Cannot modify unmodifiable Map"))},
q2(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
uw(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.dX.b(a)},
h(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.M(a)
return s},
dW(a){var s,r=$.oE
if(r==null)r=$.oE=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
oH(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
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
if(a instanceof A.F)return A.aD(A.as(a),null)
s=J.bK(a)
if(s===B.a7||s===B.a9||t.cx.b(a)){r=B.z(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.aD(A.as(a),null)},
ro(a){var s,r,q
if(typeof a=="number"||A.d9(a))return J.M(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bQ)return a.l(0)
s=$.o8()
for(r=0;r<s.length;++r){q=s[r].dD(a)
if(q!=null)return q}return"Instance of '"+A.dX(a)+"'"},
rm(){if(!!self.location)return self.location.href
return null},
rp(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
a7(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.b_(s,10)|55296)>>>0,s&1023|56320)}}throw A.b(A.aj(a,0,1114111,null,null))},
oI(a,b,c,d,e,f,g,h,i){var s,r,q,p=b-1
if(0<=a&&a<100){a+=400
p-=4800}s=B.c.ap(h,1000)
g+=B.c.ae(h-s,1000)
r=i?Date.UTC(a,p,c,d,e,f,g):new Date(a,p,c,d,e,f,g).valueOf()
q=!0
if(!isNaN(r))if(!(r<-864e13))if(!(r>864e13))q=r===864e13&&s!==0
if(q)return null
return r},
aM(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
by(a){return a.c?A.aM(a).getUTCFullYear()+0:A.aM(a).getFullYear()+0},
cl(a){return a.c?A.aM(a).getUTCMonth()+1:A.aM(a).getMonth()+1},
dV(a){return a.c?A.aM(a).getUTCDate()+0:A.aM(a).getDate()+0},
bX(a){return a.c?A.aM(a).getUTCHours()+0:A.aM(a).getHours()+0},
cP(a){return a.c?A.aM(a).getUTCMinutes()+0:A.aM(a).getMinutes()+0},
oG(a){return a.c?A.aM(a).getUTCSeconds()+0:A.aM(a).getSeconds()+0},
oF(a){return a.c?A.aM(a).getUTCMilliseconds()+0:A.aM(a).getMilliseconds()+0},
bW(a,b,c){var s,r,q={}
q.a=0
s=[]
r=[]
q.a=b.length
B.b.S(s,b)
q.b=""
if(c!=null&&c.a!==0)c.p(0,new A.lB(q,r,s))
return J.qJ(a,new A.fh(B.ak,0,s,r,0))},
rl(a,b,c){var s,r,q
if(Array.isArray(b))s=c==null||c.a===0
else s=!1
if(s){r=b.length
if(r===0){if(!!a.$0)return a.$0()}else if(r===1){if(!!a.$1)return a.$1(b[0])}else if(r===2){if(!!a.$2)return a.$2(b[0],b[1])}else if(r===3){if(!!a.$3)return a.$3(b[0],b[1],b[2])}else if(r===4){if(!!a.$4)return a.$4(b[0],b[1],b[2],b[3])}else if(r===5)if(!!a.$5)return a.$5(b[0],b[1],b[2],b[3],b[4])
q=a[""+"$"+r]
if(q!=null)return q.apply(a,b)}return A.rk(a,b,c)},
rk(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(Array.isArray(b))s=b
else s=A.ab(b,t.z)
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
if(s===b)s=A.ab(s,t.z)
B.b.S(s,j)}return l.apply(a,s)}else{if(r>q)return A.bW(a,s,c)
if(s===b)s=A.ab(s,t.z)
i=Object.keys(n)
if(c==null)for(o=i.length,h=0;h<i.length;i.length===o||(0,A.aE)(i),++h){g=n[A.w(i[h])]
if(B.B===g)return A.bW(a,s,c)
B.b.m(s,g)}else{for(o=i.length,f=0,h=0;h<i.length;i.length===o||(0,A.aE)(i),++h){e=A.w(i[h])
if(c.I(0,e)){++f
B.b.m(s,c.h(0,e))}else{g=n[e]
if(B.B===g)return A.bW(a,s,c)
B.b.m(s,g)}}if(f!==c.a)return A.bW(a,s,c)}return l.apply(a,s)}},
rn(a){var s=a.$thrownJsError
if(s==null)return null
return A.c5(s)},
nv(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.ah(a,s)
a.$thrownJsError=s
s.stack=b.l(0)}},
ur(a){throw A.b(A.nV(a))},
e(a,b){if(a==null)J.ag(a)
throw A.b(A.ig(a,b))},
ig(a,b){var s,r="index"
if(!A.eG(b))return new A.b5(!0,b,r,null)
s=A.H(J.ag(a))
if(b<0||b>=s)return A.a4(b,s,a,null,r)
return A.oJ(b,r)},
nV(a){return new A.b5(!0,a,null,null)},
b(a){return A.ah(a,new Error())},
ah(a,b){var s
if(a==null)a=new A.bA()
b.dartException=a
s=A.uI
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
uI(){return J.M(this.dartException)},
bM(a,b){throw A.ah(a,b==null?new Error():b)},
aG(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.bM(A.tx(a,b,c),s)},
tx(a,b,c){var s,r,q,p,o,n,m,l,k
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
aE(a){throw A.b(A.a3(a))},
bB(a){var s,r,q,p,o,n
a=A.pZ(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.A([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.lJ(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
lK(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
oR(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
nr(a,b){var s=b==null,r=s?null:b.method
return new A.fk(a,r,s?null:b.receiver)},
am(a){var s
if(a==null)return new A.lz(a)
if(a instanceof A.dv){s=a.a
return A.c6(a,s==null?A.b2(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.c6(a,a.dartException)
return A.u8(a)},
c6(a,b){if(t.W.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
u8(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.b_(r,16)&8191)===10)switch(q){case 438:return A.c6(a,A.nr(A.h(s)+" (Error "+q+")",null))
case 445:case 5007:A.h(s)
return A.c6(a,new A.dT())}}if(a instanceof TypeError){p=$.qc()
o=$.qd()
n=$.qe()
m=$.qf()
l=$.qi()
k=$.qj()
j=$.qh()
$.qg()
i=$.ql()
h=$.qk()
g=p.ac(s)
if(g!=null)return A.c6(a,A.nr(A.w(s),g))
else{g=o.ac(s)
if(g!=null){g.method="call"
return A.c6(a,A.nr(A.w(s),g))}else if(n.ac(s)!=null||m.ac(s)!=null||l.ac(s)!=null||k.ac(s)!=null||j.ac(s)!=null||m.ac(s)!=null||i.ac(s)!=null||h.ac(s)!=null){A.w(s)
return A.c6(a,new A.dT())}}return A.c6(a,new A.fX(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.e_()
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
ij(a){if(a==null)return J.cC(a)
if(typeof a=="object")return A.dW(a)
return J.cC(a)},
uk(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.k(0,a[s],a[r])}return b},
tH(a,b,c,d,e,f){t.Y.a(a)
switch(A.H(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.b(new A.m2("Unsupported number of arguments for wrapped closure"))},
bo(a,b){var s
if(a==null)return null
s=a.$identity
if(!!s)return s
s=A.ug(a,b)
a.$identity=s
return s},
ug(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.tH)},
qY(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.fL().constructor.prototype):Object.create(new A.cF(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.ok(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.qU(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.ok(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
qU(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.qS)}throw A.b("Error in functionType of tearoff")},
qV(a,b,c,d){var s=A.oi
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
ok(a,b,c,d){if(c)return A.qX(a,b,d)
return A.qV(b.length,d,a,b)},
qW(a,b,c,d){var s=A.oi,r=A.qT
switch(b?-1:a){case 0:throw A.b(new A.fI("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
qX(a,b,c){var s,r
if($.og==null)$.og=A.of("interceptor")
if($.oh==null)$.oh=A.of("receiver")
s=b.length
r=A.qW(s,c,a,b)
return r},
nW(a){return A.qY(a)},
qS(a,b){return A.mv(v.typeUniverse,A.as(a.a),b)},
oi(a){return a.a},
qT(a){return a.b},
of(a){var s,r,q,p=new A.cF("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.b(A.b6("Field name "+a+" not found.",null))},
nZ(a){return v.getIsolateTag(a)},
o2(a,b,c){var s,r
try{s=A.tw(a,c,b)
return s}catch(r){}return null},
tw(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=[],h=typeof a=="object",g=typeof a=="function"
if(g){s=A.pC(a)
if(s!=null)i.push("globalThis."+s)
else i.push("name: "+A.bt(A.ie(a,"name")))}if(b?!g:!h)i.push('typeof: "'+typeof a+'"')
if(!(h||g))return i.join(", ")
r=v.G
q=r.Object
p=q.getPrototypeOf(a)
o=p==null
if(o)i.push("prototype: null")
else{n=A.ie(p,"constructor")
if(n!=null){m=A.pC(n)
if(m!=null){if(g)l="Function"
else l=c?"Array":null
if(m!==l)i.push("constructor: "+m)}else{k=A.ie(n,"name")
if(k!=null)i.push("constructor.name: "+A.bt(k))}}}if(r.Array.isArray(a))i.push("isArray")
if(!g){j=A.ie(a,"length")
if(typeof j=="number")i.push("length: "+A.h(j))}if(!o&&!(a instanceof q))i.push("cross-realm")
return i.join(", ")},
ie(a,b){var s=v.G.Object.getOwnPropertyDescriptor(a,b)
if(s==null)return null
return s.value},
pC(a){var s
if(typeof a!="function")return null
s=A.ie(a,"name")
if(typeof s=="string"&&/^[A-Za-z_$][A-Za-z_$0-9]*$/.test(s))if(a===v.G[s])return s
return null},
vR(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
uA(a){var s,r,q,p,o,n=A.w($.pT.$1(a)),m=$.mT[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.mZ[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.ay($.pO.$2(a,n))
if(q!=null){m=$.mT[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.mZ[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.n1(s)
$.mT[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.mZ[n]=s
return s}if(p==="-"){o=A.n1(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.pW(a,s)
if(p==="*")throw A.b(A.oS(n))
if(v.leafTags[n]===true){o=A.n1(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.pW(a,s)},
pW(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.o1(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
n1(a){return J.o1(a,!1,null,!!a.$iL)},
uC(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.n1(s)
else return J.o1(s,c,null,null)},
ut(){if(!0===$.o_)return
$.o_=!0
A.uu()},
uu(){var s,r,q,p,o,n,m,l
$.mT=Object.create(null)
$.mZ=Object.create(null)
A.us()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.pY.$1(o)
if(n!=null){m=A.uC(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
us(){var s,r,q,p,o,n,m=B.T()
m=A.dd(B.U,A.dd(B.V,A.dd(B.A,A.dd(B.A,A.dd(B.W,A.dd(B.X,A.dd(B.Y(B.z),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.pT=new A.mW(p)
$.pO=new A.mX(o)
$.pY=new A.mY(n)},
dd(a,b){return a(b)||b},
ui(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
rb(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.b(A.a1("Illegal RegExp pattern ("+String(o)+")",a,null))},
uF(a,b,c){var s=a.indexOf(b,c)
return s>=0},
uj(a){if(a.indexOf("$",0)>=0)return a.replace(/\$/g,"$$$$")
return a},
pZ(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
q0(a,b,c){var s=A.uG(a,b,c)
return s},
uG(a,b,c){var s,r,q
if(b===""){if(a==="")return c
s=a.length
for(r=c,q=0;q<s;++q)r=r+a[q]+c
return r.charCodeAt(0)==0?r:r}if(a.indexOf(b,0)<0)return a
if(a.length<500||c.indexOf("$",0)>=0)return a.split(b).join(c)
return a.replace(new RegExp(A.pZ(b),"g"),A.uj(c))},
dm:function dm(a,b){this.a=a
this.$ti=b},
dl:function dl(){},
bp:function bp(a,b,c){this.a=a
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
fh:function fh(a,b,c,d,e){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e},
lB:function lB(a,b,c){this.a=a
this.b=b
this.c=c},
cS:function cS(){},
lJ:function lJ(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dT:function dT(){},
fk:function fk(a,b,c){this.a=a
this.b=b
this.c=c},
fX:function fX(a){this.a=a},
lz:function lz(a){this.a=a},
dv:function dv(a,b){this.a=a
this.b=b},
eu:function eu(a){this.a=a
this.b=null},
bQ:function bQ(){},
eX:function eX(){},
eY:function eY(){},
fP:function fP(){},
fL:function fL(){},
cF:function cF(a,b){this.a=a
this.b=b},
fI:function fI(a){this.a=a},
ml:function ml(){},
b9:function b9(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
ll:function ll(a){this.a=a},
lo:function lo(a,b){var _=this
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
mW:function mW(a){this.a=a},
mX:function mX(a){this.a=a},
mY:function mY(a){this.a=a},
fj:function fj(a,b){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null},
mj:function mj(a){this.b=a},
tt(a){return a},
ty(a){return a},
re(a){return new Int8Array(a)},
oz(a){return new Uint8Array(a)},
oA(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
bH(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.ig(b,a))},
ck:function ck(){},
dO:function dO(){},
i1:function i1(a){this.a=a},
dM:function dM(){},
ap:function ap(){},
dN:function dN(){},
aV:function aV(){},
ft:function ft(){},
fu:function fu(){},
fv:function fv(){},
fw:function fw(){},
fx:function fx(){},
fy:function fy(){},
fz:function fz(){},
dP:function dP(){},
dQ:function dQ(){},
em:function em(){},
en:function en(){},
eo:function eo(){},
ep:function ep(){},
nw(a,b){var s=b.c
return s==null?b.c=A.eA(a,"ad",[b.x]):s},
oL(a){var s=a.w
if(s===6||s===7)return A.oL(a.x)
return s===11||s===12},
rs(a){return a.as},
eJ(a){return A.mu(v.typeUniverse,a,!1)},
cw(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.cw(a1,s,a3,a4)
if(r===s)return a2
return A.pe(a1,r,!0)
case 7:s=a2.x
r=A.cw(a1,s,a3,a4)
if(r===s)return a2
return A.pd(a1,r,!0)
case 8:q=a2.y
p=A.dc(a1,q,a3,a4)
if(p===q)return a2
return A.eA(a1,a2.x,p)
case 9:o=a2.x
n=A.cw(a1,o,a3,a4)
m=a2.y
l=A.dc(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.nG(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.dc(a1,j,a3,a4)
if(i===j)return a2
return A.pf(a1,k,i)
case 11:h=a2.x
g=A.cw(a1,h,a3,a4)
f=a2.y
e=A.u5(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.pc(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.dc(a1,d,a3,a4)
o=a2.x
n=A.cw(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.nH(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.b(A.eQ("Attempted to substitute unexpected RTI kind "+a0))}},
dc(a,b,c,d){var s,r,q,p,o=b.length,n=A.mz(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.cw(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
u6(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.mz(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.cw(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
u5(a,b,c,d){var s,r=b.a,q=A.dc(a,r,c,d),p=b.b,o=A.dc(a,p,c,d),n=b.c,m=A.u6(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.hl()
s.a=q
s.b=o
s.c=m
return s},
A(a,b){a[v.arrayRti]=b
return a},
pQ(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.uo(s)
return a.$S()}return null},
uv(a,b){var s
if(A.oL(b))if(a instanceof A.bQ){s=A.pQ(a)
if(s!=null)return s}return A.as(a)},
as(a){if(a instanceof A.F)return A.y(a)
if(Array.isArray(a))return A.G(a)
return A.nS(J.bK(a))},
G(a){var s=a[v.arrayRti],r=t.B
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
y(a){var s=a.$ti
return s!=null?s:A.nS(a)},
nS(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.tF(a,s)},
tF(a,b){var s=a instanceof A.bQ?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.t4(v.typeUniverse,s.name)
b.$ccache=r
return r},
uo(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.mu(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
un(a){return A.cy(A.y(a))},
u4(a){var s=a instanceof A.bQ?A.pQ(a):null
if(s!=null)return s
if(t.aJ.b(a))return J.qH(a).a
if(Array.isArray(a))return A.G(a)
return A.as(a)},
cy(a){var s=a.r
return s==null?a.r=new A.mt(a):s},
bh(a){return A.cy(A.mu(v.typeUniverse,a,!1))},
tE(a){var s=this
s.b=A.u2(s)
return s.b(a)},
u2(a){var s,r,q,p,o
if(a===t.K)return A.tN
if(A.cA(a))return A.tR
s=a.w
if(s===6)return A.tC
if(s===1)return A.pB
if(s===7)return A.tI
r=A.u1(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.cA)){a.f="$i"+q
if(q==="p")return A.tL
if(a===t.m)return A.tK
return A.tQ}}else if(s===10){p=A.ui(a.x,a.y)
o=p==null?A.pB:p
return o==null?A.b2(o):o}return A.tA},
u1(a){if(a.w===8){if(a===t.S)return A.eG
if(a===t.dx||a===t.w)return A.tM
if(a===t.N)return A.tP
if(a===t.y)return A.d9}return null},
tD(a){var s=this,r=A.tz
if(A.cA(s))r=A.tn
else if(s===t.K)r=A.b2
else if(A.df(s)){r=A.tB
if(s===t.aV)r=A.nN
else if(s===t.bl)r=A.ay
else if(s===t.fU)r=A.pq
else if(s===t.jh)r=A.mC
else if(s===t.jX)r=A.tk
else if(s===t.mU)r=A.tm}else if(s===t.S)r=A.H
else if(s===t.N)r=A.w
else if(s===t.y)r=A.mB
else if(s===t.w)r=A.a2
else if(s===t.dx)r=A.pr
else if(s===t.m)r=A.tl
s.a=r
return s.a(a)},
tA(a){var s=this
if(a==null)return A.df(s)
return A.pV(v.typeUniverse,A.uv(a,s),s)},
tC(a){if(a==null)return!0
return this.x.b(a)},
tQ(a){var s,r=this
if(a==null)return A.df(r)
s=r.f
if(a instanceof A.F)return!!a[s]
return!!J.bK(a)[s]},
tL(a){var s,r=this
if(a==null)return A.df(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.F)return!!a[s]
return!!J.bK(a)[s]},
tK(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.F)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
pA(a){if(typeof a=="object"){if(a instanceof A.F)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
tz(a){var s=this
if(a==null){if(A.df(s))return a}else if(s.b(a))return a
throw A.ah(A.pv(a,s),new Error())},
tB(a){var s=this
if(a==null||s.b(a))return a
throw A.ah(A.pv(a,s),new Error())},
pv(a,b){return new A.d5("TypeError: "+A.p0(a,A.aD(b,null)))},
mR(a,b,c,d){if(A.pV(v.typeUniverse,a,b))return a
throw A.ah(A.rW("The type argument '"+A.aD(a,null)+"' is not a subtype of the type variable bound '"+A.aD(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
p0(a,b){return A.bt(a)+": type '"+A.aD(A.u4(a),null)+"' is not a subtype of type '"+b+"'"},
rW(a){return new A.d5("TypeError: "+a)},
b1(a,b){return new A.d5("TypeError: "+A.p0(a,b))},
tI(a){var s=this
return s.x.b(a)||A.nw(v.typeUniverse,s).b(a)},
tN(a){return a!=null},
b2(a){if(a!=null)return a
throw A.ah(A.b1(a,"Object"),new Error())},
tR(a){return!0},
tn(a){return a},
pB(a){return!1},
d9(a){return!0===a||!1===a},
mB(a){if(!0===a)return!0
if(!1===a)return!1
throw A.ah(A.b1(a,"bool"),new Error())},
pq(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.ah(A.b1(a,"bool?"),new Error())},
pr(a){if(typeof a=="number")return a
throw A.ah(A.b1(a,"double"),new Error())},
tk(a){if(typeof a=="number")return a
if(a==null)return a
throw A.ah(A.b1(a,"double?"),new Error())},
eG(a){return typeof a=="number"&&Math.floor(a)===a},
H(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.ah(A.b1(a,"int"),new Error())},
nN(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.ah(A.b1(a,"int?"),new Error())},
tM(a){return typeof a=="number"},
a2(a){if(typeof a=="number")return a
throw A.ah(A.b1(a,"num"),new Error())},
mC(a){if(typeof a=="number")return a
if(a==null)return a
throw A.ah(A.b1(a,"num?"),new Error())},
tP(a){return typeof a=="string"},
w(a){if(typeof a=="string")return a
throw A.ah(A.b1(a,"String"),new Error())},
ay(a){if(typeof a=="string")return a
if(a==null)return a
throw A.ah(A.b1(a,"String?"),new Error())},
tl(a){if(A.pA(a))return a
throw A.ah(A.b1(a,"JSObject"),new Error())},
tm(a){if(a==null)return a
if(A.pA(a))return a
throw A.ah(A.b1(a,"JSObject?"),new Error())},
pH(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aD(a[q],b)
return s},
tZ(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.pH(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.aD(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
pw(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.A([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.b.m(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.e(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.aD(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.aD(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.aD(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.aD(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.aD(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
aD(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.aD(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.aD(a.x,b)+">"
if(l===8){p=A.u7(a.x)
o=a.y
return o.length>0?p+("<"+A.pH(o,b)+">"):p}if(l===10)return A.tZ(a,b)
if(l===11)return A.pw(a,b,null)
if(l===12)return A.pw(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.e(b,n)
return b[n]}return"?"},
u7(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
t5(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
t4(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.mu(a,b,!1)
else if(typeof m=="number"){s=m
r=A.eB(a,5,"#")
q=A.mz(s)
for(p=0;p<s;++p)q[p]=r
o=A.eA(a,b,q)
n[b]=o
return o}else return m},
t2(a,b){return A.po(a.tR,b)},
t1(a,b){return A.po(a.eT,b)},
mu(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.p6(A.p4(a,null,b,!1))
r.set(b,s)
return s},
mv(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.p6(A.p4(a,b,c,!0))
q.set(c,r)
return r},
t3(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.nG(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
c4(a,b){b.a=A.tD
b.b=A.tE
return b},
eB(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.bc(null,null)
s.w=b
s.as=c
r=A.c4(a,s)
a.eC.set(c,r)
return r},
pe(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.t_(a,b,r,c)
a.eC.set(r,s)
return s},
t_(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.cA(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.df(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.bc(null,null)
q.w=6
q.x=b
q.as=c
return A.c4(a,q)},
pd(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.rY(a,b,r,c)
a.eC.set(r,s)
return s},
rY(a,b,c,d){var s,r
if(d){s=b.w
if(A.cA(b)||b===t.K)return b
else if(s===1)return A.eA(a,"ad",[b])
else if(b===t.a||b===t.T)return t.gK}r=new A.bc(null,null)
r.w=7
r.x=b
r.as=c
return A.c4(a,r)},
t0(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.bc(null,null)
s.w=13
s.x=b
s.as=q
r=A.c4(a,s)
a.eC.set(q,r)
return r},
ez(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
rX(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
eA(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.ez(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.bc(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.c4(a,r)
a.eC.set(p,q)
return q},
nG(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.ez(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.bc(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.c4(a,o)
a.eC.set(q,n)
return n},
pf(a,b,c){var s,r,q="+"+(b+"("+A.ez(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.bc(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.c4(a,s)
a.eC.set(q,r)
return r},
pc(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.ez(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.ez(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.rX(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.bc(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.c4(a,p)
a.eC.set(r,o)
return o},
nH(a,b,c,d){var s,r=b.as+("<"+A.ez(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.rZ(a,b,c,r,d)
a.eC.set(r,s)
return s},
rZ(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.mz(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.cw(a,b,r,0)
m=A.dc(a,c,r,0)
return A.nH(a,n,m,c!==m)}}l=new A.bc(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.c4(a,l)},
p4(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
p6(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.rP(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.p5(a,r,l,k,!1)
else if(q===46)r=A.p5(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.cv(a.u,a.e,k.pop()))
break
case 94:k.push(A.t0(a.u,k.pop()))
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
case 62:A.rR(a,k)
break
case 38:A.rQ(a,k)
break
case 63:p=a.u
k.push(A.pe(p,A.cv(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.pd(p,A.cv(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.rO(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.p7(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.rT(a.u,a.e,o)
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
rP(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
p5(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.t5(s,o.x)[p]
if(n==null)A.bM('No "'+p+'" in "'+A.rs(o)+'"')
d.push(A.mv(s,o,n))}else d.push(p)
return m},
rR(a,b){var s,r=a.u,q=A.p3(a,b),p=b.pop()
if(typeof p=="string")b.push(A.eA(r,p,q))
else{s=A.cv(r,a.e,p)
switch(s.w){case 11:b.push(A.nH(r,s,q,a.n))
break
default:b.push(A.nG(r,s,q))
break}}},
rO(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.p3(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.cv(p,a.e,o)
q=new A.hl()
q.a=s
q.b=n
q.c=m
b.push(A.pc(p,r,q))
return
case-4:b.push(A.pf(p,b.pop(),s))
return
default:throw A.b(A.eQ("Unexpected state under `()`: "+A.h(o)))}},
rQ(a,b){var s=b.pop()
if(0===s){b.push(A.eB(a.u,1,"0&"))
return}if(1===s){b.push(A.eB(a.u,4,"1&"))
return}throw A.b(A.eQ("Unexpected extended operation "+A.h(s)))},
p3(a,b){var s=b.splice(a.p)
A.p7(a.u,a.e,s)
a.p=b.pop()
return s},
cv(a,b,c){if(typeof c=="string")return A.eA(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.rS(a,b,c)}else return c},
p7(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.cv(a,b,c[s])},
rT(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.cv(a,b,c[s])},
rS(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.b(A.eQ("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.b(A.eQ("Bad index "+c+" for "+b.l(0)))},
pV(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.ak(a,b,null,c,null)
r.set(c,s)}return s},
ak(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.cA(d))return!0
s=b.w
if(s===4)return!0
if(A.cA(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.ak(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.ak(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.ak(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.ak(a,b.x,c,d,e))return!1
return A.ak(a,A.nw(a,b),c,d,e)}if(s===6)return A.ak(a,p,c,d,e)&&A.ak(a,b.x,c,d,e)
if(q===7){if(A.ak(a,b,c,d.x,e))return!0
return A.ak(a,b,c,A.nw(a,d),e)}if(q===6)return A.ak(a,b,c,p,e)||A.ak(a,b,c,d.x,e)
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
if(!A.ak(a,j,c,i,e)||!A.ak(a,i,e,j,c))return!1}return A.pz(a,b.x,c,d.x,e)}if(q===11){if(b===t.dY)return!0
if(p)return!1
return A.pz(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.tJ(a,b,c,d,e)}if(o&&q===10)return A.tO(a,b,c,d,e)
return!1},
pz(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.ak(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.ak(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.ak(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.ak(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.ak(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
tJ(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.mv(a,b,r[o])
return A.pp(a,p,null,c,d.y,e)}return A.pp(a,b.y,null,c,d.y,e)},
pp(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.ak(a,b[s],d,e[s],f))return!1
return!0},
tO(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.ak(a,r[s],c,q[s],e))return!1
return!0},
df(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.cA(a))if(s!==6)r=s===7&&A.df(a.x)
return r},
cA(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
po(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
mz(a){return a>0?new Array(a):v.typeUniverse.sEA},
bc:function bc(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
hl:function hl(){this.c=this.b=this.a=null},
mt:function mt(a){this.a=a},
hi:function hi(){},
d5:function d5(a){this.a=a},
rz(){var s,r,q
if(self.scheduleImmediate!=null)return A.ua()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.bo(new A.lV(s),1)).observe(r,{childList:true})
return new A.lU(s,r,q)}else if(self.setImmediate!=null)return A.ub()
return A.uc()},
rA(a){self.scheduleImmediate(A.bo(new A.lW(t.M.a(a)),0))},
rB(a){self.setImmediate(A.bo(new A.lX(t.M.a(a)),0))},
rC(a){A.nB(B.a1,t.M.a(a))},
nB(a,b){var s=B.c.ae(a.a,1000)
return A.rU(s<0?0:s,b)},
oQ(a,b){var s=B.c.ae(a.a,1000)
return A.rV(s<0?0:s,b)},
rU(a,b){var s=new A.ey(!0)
s.ej(a,b)
return s},
rV(a,b){var s=new A.ey(!1)
s.ek(a,b)
return s},
S(a){return new A.h2(new A.W($.O,a.i("W<0>")),a.i("h2<0>"))},
R(a,b){a.$2(0,null)
b.b=!0
return b.a},
z(a,b){A.to(a,b)},
Q(a,b){b.b1(0,a)},
P(a,b){b.c0(A.am(a),A.c5(a))},
to(a,b){var s,r,q=new A.mD(b),p=new A.mE(b)
if(a instanceof A.W)a.cW(q,p,t.z)
else{s=t.z
if(a instanceof A.W)a.cg(q,p,s)
else{r=new A.W($.O,t._)
r.a=8
r.c=a
r.cW(q,p,s)}}},
T(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.O.cc(new A.mN(s),t.H,t.S,t.z)},
pa(a,b,c){return 0},
nj(a){var s
if(t.W.b(a)){s=a.gaR()
if(s!=null)return s}return B.p},
nn(a,b){var s
b.a(a)
s=new A.W($.O,b.i("W<0>"))
s.bb(a)
return s},
r5(a,b,c){var s=new A.W($.O,c.i("W<0>"))
A.nz(a,new A.lg(b,s,c))
return s},
nT(a,b){if($.O===B.h)return null
return null},
tG(a,b){if($.O!==B.h)A.nT(a,b)
if(b==null)if(t.W.b(a)){b=a.gaR()
if(b==null){A.nv(a,B.p)
b=B.p}}else b=B.p
else if(t.W.b(a))A.nv(a,b)
return new A.az(a,b)},
m6(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t._;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.oM()
b.bG(new A.az(new A.b5(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.e.a(b.c)
b.a=b.a&1|4
b.c=n
n.cQ(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aX()
b.bc(o.a)
A.cr(b,p)
return}b.a^=2
A.db(null,null,b.b,t.M.a(new A.m7(o,b)))},
cr(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.n,r=t.e;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.id(m.a,m.b)}return}q.a=b
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
A.id(j.a,j.b)
return}g=$.O
if(g!==h)$.O=h
else g=null
c=c.c
if((c&15)===8)new A.mb(q,d,n).$0()
else if(o){if((c&1)!==0)new A.ma(q,j).$0()}else if((c&2)!==0)new A.m9(d,q).$0()
if(g!=null)$.O=g
c=q.c
if(c instanceof A.W){p=q.a.$ti
p=p.i("ad<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.bg(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.m6(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.bg(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
pE(a,b){var s
if(t.ng.b(a))return b.cc(a,t.z,t.K,t.l)
s=t.v
if(s.b(a))return s.a(a)
throw A.b(A.kc(a,"onError",u.c))},
tT(){var s,r
for(s=$.da;s!=null;s=$.da){$.eI=null
r=s.b
$.da=r
if(r==null)$.eH=null
s.a.$0()}},
u3(){$.nU=!0
try{A.tT()}finally{$.eI=null
$.nU=!1
if($.da!=null)$.o4().$1(A.pP())}},
pK(a){var s=new A.h3(a),r=$.eH
if(r==null){$.da=$.eH=s
if(!$.nU)$.o4().$1(A.pP())}else $.eH=r.b=s},
u0(a){var s,r,q,p=$.da
if(p==null){A.pK(a)
$.eI=$.eH
return}s=new A.h3(a)
r=$.eI
if(r==null){s.b=p
$.da=$.eI=s}else{q=r.b
s.b=q
$.eI=r.b=s
if(q==null)$.eH=s}},
q_(a){var s=null,r=$.O
if(B.h===r){A.db(s,s,B.h,a)
return}A.db(s,s,r,t.M.a(r.bY(a)))},
vo(a,b){A.cx(a,"stream",t.K)
return new A.hP(b.i("hP<0>"))},
pI(a){return},
p_(a,b,c){var s=b==null?A.ud():b
return t.gS.H(c).i("1(2)").a(s)},
rG(a,b){if(b==null)b=A.uf()
if(t.fQ.b(b))return a.cc(b,t.z,t.K,t.l)
if(t.i6.b(b))return t.v.a(b)
throw A.b(A.b6("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace.",null))},
tU(a){},
tW(a,b){A.id(a,b)},
tV(){},
tr(a,b,c){var s,r,q,p=a.aI(0)
if(p!==$.nb()){s=t.mY.a(new A.mF(b,c))
r=p.$ti
q=$.O
p.aT(new A.bg(new A.W(q,r),8,s,null,r.i("bg<1,1>")))}else b.aU(c)},
nz(a,b){var s=$.O
if(s===B.h)return A.nB(a,t.M.a(b))
return A.nB(a,t.M.a(s.bY(b)))},
nA(a,b){var s=$.O
if(s===B.h)return A.oQ(a,t.my.a(b))
return A.oQ(a,t.my.a(s.d7(b,t.I)))},
id(a,b){A.u0(new A.mM(a,b))},
pF(a,b,c,d,e){var s,r=$.O
if(r===c)return d.$0()
$.O=c
s=r
try{r=d.$0()
return r}finally{$.O=s}},
pG(a,b,c,d,e,f,g){var s,r=$.O
if(r===c)return d.$1(e)
$.O=c
s=r
try{r=d.$1(e)
return r}finally{$.O=s}},
u_(a,b,c,d,e,f,g,h,i){var s,r=$.O
if(r===c)return d.$2(e,f)
$.O=c
s=r
try{r=d.$2(e,f)
return r}finally{$.O=s}},
db(a,b,c,d){t.M.a(d)
if(B.h!==c){d=c.bY(d)
d=d}A.pK(d)},
lV:function lV(a){this.a=a},
lU:function lU(a,b,c){this.a=a
this.b=b
this.c=c},
lW:function lW(a){this.a=a},
lX:function lX(a){this.a=a},
ey:function ey(a){this.a=a
this.b=null
this.c=0},
ms:function ms(a,b){this.a=a
this.b=b},
mr:function mr(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h2:function h2(a,b){this.a=a
this.b=!1
this.$ti=b},
mD:function mD(a){this.a=a},
mE:function mE(a){this.a=a},
mN:function mN(a){this.a=a},
ev:function ev(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
d4:function d4(a,b){this.a=a
this.$ti=b},
az:function az(a,b){this.a=a
this.b=b},
d_:function d_(a,b){this.a=a
this.$ti=b},
bF:function bF(a,b,c,d,e){var _=this
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
lg:function lg(a,b,c){this.a=a
this.b=b
this.c=c},
h7:function h7(){},
bE:function bE(a,b){this.a=a
this.$ti=b},
bg:function bg(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
W:function W(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
m3:function m3(a,b){this.a=a
this.b=b},
m8:function m8(a,b){this.a=a
this.b=b},
m7:function m7(a,b){this.a=a
this.b=b},
m5:function m5(a,b){this.a=a
this.b=b},
m4:function m4(a,b){this.a=a
this.b=b},
mb:function mb(a,b,c){this.a=a
this.b=b
this.c=c},
mc:function mc(a,b){this.a=a
this.b=b},
md:function md(a){this.a=a},
ma:function ma(a,b){this.a=a
this.b=b},
m9:function m9(a,b){this.a=a
this.b=b},
h3:function h3(a){this.a=a
this.b=null},
bZ:function bZ(){},
lH:function lH(a,b){this.a=a
this.b=b},
lI:function lI(a,b){this.a=a
this.b=b},
lF:function lF(a){this.a=a},
lG:function lG(a,b,c){this.a=a
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
hE:function hE(a){var _=this
_.a=0
_.c=_.b=null
_.$ti=a},
mk:function mk(a,b){this.a=a
this.b=b},
d1:function d1(a,b){var _=this
_.a=1
_.b=a
_.c=null
_.$ti=b},
hP:function hP(a){this.$ti=a},
mF:function mF(a,b){this.a=a
this.b=b},
eF:function eF(){},
hH:function hH(){},
mm:function mm(a,b){this.a=a
this.b=b},
mn:function mn(a,b,c){this.a=a
this.b=b
this.c=c},
mM:function mM(a,b){this.a=a
this.b=b},
nD(a,b){var s=a[b]
return s===a?null:s},
nE(a,b,c){if(c==null)a[b]=a
else a[b]=c},
p1(){var s=Object.create(null)
A.nE(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
ow(a,b){return new A.b9(a.i("@<0>").H(b).i("b9<1,2>"))},
a5(a,b,c){return b.i("@<0>").H(c).i("ov<1,2>").a(A.uk(a,new A.b9(b.i("@<0>").H(c).i("b9<1,2>"))))},
an(a,b){return new A.b9(a.i("@<0>").H(b).i("b9<1,2>"))},
ci(a){return new A.ct(a.i("ct<0>"))},
ox(a){return new A.ct(a.i("ct<0>"))},
nF(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
rN(a,b,c){var s=new A.cu(a,b,c.i("cu<0>"))
s.c=a.e
return s},
ao(a,b,c){var s=A.ow(b,c)
J.eM(a,new A.lp(s,b,c))
return s},
ns(a,b,c){var s=A.ow(b,c)
s.S(0,a)
return s},
oy(a,b){var s,r,q=A.ci(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.aE)(a),++r)q.m(0,b.a(a[r]))
return q},
nt(a){var s,r
if(A.o0(a))return"{...}"
s=new A.ar("")
try{r={}
B.b.m($.aY,a)
s.a+="{"
r.a=!0
J.eM(a,new A.lr(r,s))
s.a+="}"}finally{if(0>=$.aY.length)return A.e($.aY,-1)
$.aY.pop()}r=s.a
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
hu:function hu(a){this.a=a
this.c=this.b=null},
cu:function cu(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
e3:function e3(a,b){this.a=a
this.$ti=b},
lp:function lp(a,b,c){this.a=a
this.b=b
this.c=c},
k:function k(){},
B:function B(){},
lq:function lq(a){this.a=a},
lr:function lr(a,b){this.a=a
this.b=b},
cY:function cY(){},
ax:function ax(){},
cO:function cO(){},
c1:function c1(a,b){this.a=a
this.$ti=b},
aq:function aq(){},
eq:function eq(){},
d6:function d6(){},
tX(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.am(r)
q=A.a1(String(s),null,null)
throw A.b(q)}q=A.mH(p)
return q},
mH(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.hq(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.mH(a[s])
return a},
ti(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.qq()
else s=new Uint8Array(o)
for(r=J.D(a),q=0;q<o;++q){p=r.h(a,b+q)
if((p&255)!==p)p=255
s[q]=p}return s},
th(a,b,c,d){var s=a?$.qp():$.qo()
if(s==null)return null
if(0===c&&d===b.length)return A.pn(s,b)
return A.pn(s,b.subarray(c,d))},
pn(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
oe(a,b,c,d,e,f){if(B.c.ap(f,4)!==0)throw A.b(A.a1("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.b(A.a1("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.b(A.a1("Invalid base64 padding, more than two '=' characters",a,b))},
rF(a,b,c,d,a0,a1){var s,r,q,p,o,n,m,l,k,j,i="Invalid encoding before padding",h="Invalid character",g=B.c.b_(a1,2),f=a1&3,e=$.o5()
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
return A.oZ(a,p+1,c,-j-1)}throw A.b(A.a1(h,a,p))}if(o>=0&&o<=127)return(g<<2|f)>>>0
for(p=b;p<c;++p){if(!(p<s))return A.e(a,p)
if(a.charCodeAt(p)>127)break}throw A.b(A.a1(h,a,p))},
rD(a,b,c,d){var s=A.rE(a,b,c),r=(d&3)+(s-b),q=B.c.b_(r,2)*3,p=r&3
if(p!==0&&s<c)q+=p-1
if(q>0)return new Uint8Array(q)
return $.qm()},
rE(a,b,c){var s,r=a.length,q=c,p=q,o=0
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
oZ(a,b,c,d){var s,r,q
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
ot(a,b,c){return new A.dE(a,b)},
tv(a){return a.hc()},
rL(a,b){return new A.mg(a,[],A.uh())},
rM(a,b,c){var s,r=new A.ar(""),q=A.rL(r,b)
q.bB(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
tj(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
hq:function hq(a,b){this.a=a
this.b=b
this.c=null},
hr:function hr(a){this.a=a},
my:function my(){},
mx:function mx(){},
dk:function dk(a){this.a=a},
eV:function eV(a){this.a=a},
ke:function ke(){},
lY:function lY(){this.a=0},
c9:function c9(){},
f0:function f0(){},
f9:function f9(){},
dE:function dE(a,b){this.a=a
this.b=b},
fm:function fm(a,b){this.a=a
this.b=b},
fl:function fl(){},
ln:function ln(a){this.b=a},
lm:function lm(a){this.a=a},
mh:function mh(){},
mi:function mi(a,b){this.a=a
this.b=b},
mg:function mg(a,b,c){this.c=a
this.a=b
this.b=c},
h0:function h0(){},
lS:function lS(a){this.a=a},
mw:function mw(a){this.a=a
this.b=16
this.c=0},
op(a,b){return A.rl(a,b,null)},
eK(a){var s=A.oH(a,null)
if(s!=null)return s
throw A.b(A.a1(a,null,null))},
bJ(a){var s=A.dY(a)
if(s!=null)return s
throw A.b(A.a1("Invalid double",a,null))},
r3(a,b){a=A.ah(a,new Error())
if(a==null)a=A.b2(a)
a.stack=b.l(0)
throw a},
dK(a,b,c,d){var s,r=c?J.np(a,d):J.or(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
aJ(a,b,c){var s,r=A.A([],c.i("ae<0>"))
for(s=J.b4(a);s.q();)B.b.m(r,c.a(s.gu(s)))
if(b)return r
r.$flags=1
return r},
ab(a,b){var s,r
if(Array.isArray(a))return A.A(a.slice(0),b.i("ae<0>"))
s=A.A([],b.i("ae<0>"))
for(r=J.b4(a);r.q();)B.b.m(s,r.gu(r))
return s},
oP(a,b,c){var s,r
A.dZ(b,"start")
if(c!=null){s=c-b
if(s<0)throw A.b(A.aj(c,b,null,"end",null))
if(s===0)return""}r=A.ru(a,b,c)
return r},
ru(a,b,c){var s=a.length
if(b>=s)return""
return A.rp(a,b,c==null||c>s?s:c)},
oK(a){return new A.fj(a,A.rb(a,!1,!0,!1,!1,""))},
oO(a,b,c){var s=J.b4(b)
if(!s.q())return a
if(c.length===0){do a+=A.h(s.gu(s))
while(s.q())}else{a+=A.h(s.gu(s))
while(s.q())a=a+c+A.h(s.gu(s))}return a},
oB(a,b){return new A.fA(a,b.gfM(),b.gfR(),b.gfN())},
nC(){var s,r,q=A.rm()
if(q==null)throw A.b(A.N("'Uri.base' is not supported"))
s=$.oV
if(s!=null&&q===$.oU)return s
r=A.cn(q)
$.oV=r
$.oU=q
return r},
oM(){return A.c5(new Error())},
qZ(a,b,c,d,e,f,g,h,i){var s=A.oI(a,b,c,d,e,f,g,h,i)
if(s==null)return null
return new A.a9(A.r0(s,h,i),h,i)},
l5(a){var s=A.oI(a,1,1,0,0,0,0,0,!1)
return new A.a9(s==null?new A.l6(a,1,1,0,0,0,0,0).$0():s,0,!1)},
r1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=$.q6().fw(a)
if(c!=null){s=new A.l8()
r=c.b
if(1>=r.length)return A.e(r,1)
q=r[1]
q.toString
p=A.eK(q)
if(2>=r.length)return A.e(r,2)
q=r[2]
q.toString
o=A.eK(q)
if(3>=r.length)return A.e(r,3)
q=r[3]
q.toString
n=A.eK(q)
if(4>=r.length)return A.e(r,4)
m=s.$1(r[4])
if(5>=r.length)return A.e(r,5)
l=s.$1(r[5])
if(6>=r.length)return A.e(r,6)
k=s.$1(r[6])
if(7>=r.length)return A.e(r,7)
j=new A.l9().$1(r[7])
i=B.c.ae(j,1000)
q=r.length
if(8>=q)return A.e(r,8)
h=r[8]!=null
if(h){if(9>=q)return A.e(r,9)
g=r[9]
if(g!=null){f=g==="-"?-1:1
if(10>=q)return A.e(r,10)
q=r[10]
q.toString
e=A.eK(q)
if(11>=r.length)return A.e(r,11)
l-=f*(s.$1(r[11])+60*e)}}d=A.qZ(p,o,n,m,l,k,i,j%1000,h)
if(d==null)throw A.b(A.a1("Time out of range",a,null))
return d}else throw A.b(A.a1("Invalid date format",a,null))},
dn(a){var s,r
try{s=A.r1(a)
return s}catch(r){if(A.am(r) instanceof A.bk)return null
else throw r}},
r0(a,b,c){var s="microsecond"
if(b>999)throw A.b(A.aj(b,0,999,s,null))
if(a<-864e13||a>864e13)throw A.b(A.aj(a,-864e13,864e13,"millisecondsSinceEpoch",null))
if(a===864e13&&b!==0)throw A.b(A.kc(b,s,"Time including microseconds is outside valid range"))
A.cx(c,"isUtc",t.y)
return a},
om(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
r_(a){var s=Math.abs(a),r=a<0?"-":"+"
if(s>=1e5)return r+s
return r+"0"+s},
l7(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bq(a){if(a>=10)return""+a
return"0"+a},
la(a,b){return new A.br(1000*a+1e6*b)},
bt(a){if(typeof a=="number"||A.d9(a)||a==null)return J.M(a)
if(typeof a=="string")return JSON.stringify(a)
return A.ro(a)},
r4(a,b){A.cx(a,"error",t.K)
A.cx(b,"stackTrace",t.l)
A.r3(a,b)},
eQ(a){return new A.eP(a)},
b6(a,b){return new A.b5(!1,null,b,a)},
kc(a,b,c){return new A.b5(!0,a,b,c)},
rq(a){var s=null
return new A.cQ(s,s,!1,s,s,a)},
oJ(a,b){return new A.cQ(null,null,!0,a,b,"Value not in range")},
aj(a,b,c,d,e){return new A.cQ(b,c,!0,a,d,"Invalid value")},
cR(a,b,c){if(0>a||a>c)throw A.b(A.aj(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.b(A.aj(b,a,c,"end",null))
return b}return c},
dZ(a,b){if(a<0)throw A.b(A.aj(a,0,null,b,null))
return a},
a4(a,b,c,d,e){return new A.fd(b,!0,a,e,"Index out of range")},
N(a){return new A.e4(a)},
oS(a){return new A.fW(a)},
ai(a){return new A.bz(a)},
a3(a){return new A.f_(a)},
a1(a,b,c){return new A.bk(a,b,c)},
r7(a,b,c){var s,r
if(A.o0(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.A([],t.s)
B.b.m($.aY,a)
try{A.tS(a,s)}finally{if(0>=$.aY.length)return A.e($.aY,-1)
$.aY.pop()}r=A.oO(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
no(a,b,c){var s,r
if(A.o0(a))return b+"..."+c
s=new A.ar(b)
B.b.m($.aY,a)
try{r=s
r.a=A.oO(r.a,a,", ")}finally{if(0>=$.aY.length)return A.e($.aY,-1)
$.aY.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
tS(a,b){var s,r,q,p,o,n,m,l=a.gC(a),k=0,j=0
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
nu(a,b,c,d){var s
if(B.n===c){s=B.d.gF(a)
b=B.d.gF(b)
return A.ny(A.c0(A.c0($.nc(),s),b))}if(B.n===d){s=B.d.gF(a)
b=B.d.gF(b)
c=J.cC(c)
return A.ny(A.c0(A.c0(A.c0($.nc(),s),b),c))}s=B.d.gF(a)
b=B.d.gF(b)
c=J.cC(c)
d=J.cC(d)
d=A.ny(A.c0(A.c0(A.c0(A.c0($.nc(),s),b),c),d))
return d},
bL(a){A.uD(a)},
cn(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){if(4>=a4)return A.e(a5,4)
s=((a5.charCodeAt(4)^58)*3|a5.charCodeAt(0)^100|a5.charCodeAt(1)^97|a5.charCodeAt(2)^116|a5.charCodeAt(3)^97)>>>0
if(s===0)return A.oT(a4<a4?B.a.n(a5,0,a4):a5,5,a3).gdF()
else if(s===32)return A.oT(B.a.n(a5,5,a4),0,a3).gdF()}r=A.dK(8,0,!1,t.S)
B.b.k(r,0,0)
B.b.k(r,1,-1)
B.b.k(r,2,-1)
B.b.k(r,7,-1)
B.b.k(r,3,0)
B.b.k(r,4,0)
B.b.k(r,5,a4)
B.b.k(r,6,a4)
if(A.pJ(a5,0,a4,0,r)>=14)B.b.k(r,7,a4)
q=r[1]
if(q>=0)if(A.pJ(a5,0,q,20,r)===20)r[7]=q
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
a5=B.a.az(a5,n,m,"/");++a4
m=f}j="file"}else if(B.a.P(a5,"http",0)){if(i&&o+3===n&&B.a.P(a5,"80",o+1)){l-=3
e=n-3
m-=3
a5=B.a.az(a5,o,n,"")
a4-=3
n=e}j="http"}}else if(q===5&&B.a.P(a5,"https",0)){if(i&&o+4===n&&B.a.P(a5,"443",o+1)){l-=4
e=n-4
m-=4
a5=B.a.az(a5,o,n,"")
a4-=3
n=e}j="https"}k=!h}}}}if(k)return new A.b0(a4<a5.length?B.a.n(a5,0,a4):a5,q,p,o,n,m,l,j)
if(j==null)if(q>0)j=A.nK(a5,0,q)
else{if(q===0)A.d7(a5,0,"Invalid empty scheme")
j=""}d=a3
if(p>0){c=q+3
b=c<p?A.td(a5,c,p-1):""
a=A.ta(a5,p,o,!1)
i=o+1
if(i<n){a0=A.oH(B.a.n(a5,i,n),a3)
d=A.nJ(a0==null?A.bM(A.a1("Invalid port",a5,i)):a0,j)}}else{a=a3
b=""}a1=A.tb(a5,n,m,a3,j,a!=null)
a2=m<l?A.tc(a5,m+1,l,a3):a3
return A.i2(j,b,a,d,a1,a2,l<a4?A.t9(a5,l+1,a4):a3)},
oX(a){var s=t.N
return B.b.fA(A.A(a.split("&"),t.s),A.an(s,s),new A.lR(B.o),t.J)},
fZ(a,b,c){throw A.b(A.a1("Illegal IPv4 address, "+a,b,c))},
rw(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j="invalid character"
for(s=a.length,r=b,q=r,p=0,o=0;;){if(q>=c)n=0
else{if(!(q>=0&&q<s))return A.e(a,q)
n=a.charCodeAt(q)}m=n^48
if(m<=9){if(o!==0||q===r){o=o*10+m
if(o<=255){++q
continue}A.fZ("each part must be in the range 0..255",a,r)}A.fZ("parts must not have leading zeros",a,r)}if(q===r){if(q===c)break
A.fZ(j,a,q)}l=p+1
k=e+p
d.$flags&2&&A.aG(d)
if(!(k<16))return A.e(d,k)
d[k]=o
if(n===46){if(l<4){++q
p=l
r=q
o=0
continue}break}if(q===c){if(l===4)return
break}A.fZ(j,a,q)
p=l}A.fZ("IPv4 address should contain exactly 4 parts",a,q)},
rx(a,b,c){var s
if(b===c)throw A.b(A.a1("Empty IP address",a,b))
if(!(b>=0&&b<a.length))return A.e(a,b)
if(a.charCodeAt(b)===118){s=A.ry(a,b,c)
if(s!=null)throw A.b(s)
return!1}A.oW(a,b,c)
return!0},
ry(a,b,c){var s,r,q,p,o,n="Missing hex-digit in IPvFuture address",m=u.f;++b
for(s=a.length,r=b;;r=q){if(r<c){q=r+1
if(!(r>=0&&r<s))return A.e(a,r)
p=a.charCodeAt(r)
if((p^48)<=9)continue
o=p|32
if(o>=97&&o<=102)continue
if(p===46){if(q-1===b)return new A.bk(n,a,q)
r=q
break}return new A.bk("Unexpected character",a,q-1)}if(r-1===b)return new A.bk(n,a,r)
return new A.bk("Missing '.' in IPvFuture address",a,r)}if(r===c)return new A.bk("Missing address in IPvFuture address, host, cursor",null,null)
for(;;){if(!(r>=0&&r<s))return A.e(a,r)
p=a.charCodeAt(r)
if(!(p<128))return A.e(m,p)
if((m.charCodeAt(p)&16)!==0){++r
if(r<c)continue
return null}return new A.bk("Invalid IPvFuture address character",a,r)}},
oW(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="an address must contain at most 8 parts",a2=new A.lQ(a3)
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
continue}a2.$2("an IPv6 part can contain a maximum of 4 hex digits",m)}if(n>m){if(j===46){if(k){if(p<=6){A.rw(a3,m,a5,s,p*2)
p+=2
n=a5
break}a2.$2(a1,m)}break}o=p*2
e=B.c.b_(l,8)
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
B.I.bE(s,a0,16,s,a)
B.I.fv(s,a,a0,0)}}return s},
i2(a,b,c,d,e,f,g){return new A.eC(a,b,c,d,e,f,g)},
pg(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
d7(a,b,c){throw A.b(A.a1(c,a,b))},
nJ(a,b){if(a!=null&&a===A.pg(b))return null
return a},
ta(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(b===c)return""
s=a.length
if(!(b>=0&&b<s))return A.e(a,b)
if(a.charCodeAt(b)===91){r=c-1
if(!(r>=0&&r<s))return A.e(a,r)
if(a.charCodeAt(r)!==93)A.d7(a,b,"Missing end `]` to match `[` in host")
q=b+1
if(!(q<s))return A.e(a,q)
p=""
if(a.charCodeAt(q)!==118){o=A.t7(a,q,r)
if(o<r){n=o+1
p=A.pm(a,B.a.P(a,"25",n)?o+3:n,r,"%25")}}else o=r
m=A.rx(a,q,o)
l=B.a.n(a,q,o)
return"["+(m?l.toLowerCase():l)+p+"]"}for(k=b;k<c;++k){if(!(k<s))return A.e(a,k)
if(a.charCodeAt(k)===58){o=B.a.bq(a,"%",b)
o=o>=b&&o<c?o:c
if(o<c){n=o+1
p=A.pm(a,B.a.P(a,"25",n)?o+3:n,c,"%25")}else p=""
A.oW(a,b,o)
return"["+B.a.n(a,b,o)+p+"]"}}return A.tf(a,b,c)},
t7(a,b,c){var s=B.a.bq(a,"%",b)
return s>=b&&s<c?s:c},
pm(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=d!==""?new A.ar(d):null
for(s=a.length,r=b,q=r,p=!0;r<c;){if(!(r>=0&&r<s))return A.e(a,r)
o=a.charCodeAt(r)
if(o===37){n=A.nL(a,r,!0)
m=n==null
if(m&&p){r+=3
continue}if(h==null)h=new A.ar("")
l=h.a+=B.a.n(a,q,r)
if(m)n=B.a.n(a,r,r+3)
else if(n==="%")A.d7(a,r,"ZoneID should not contain % anymore")
h.a=l+n
r+=3
q=r
p=!0}else if(o<127&&(u.f.charCodeAt(o)&1)!==0){if(p&&65<=o&&90>=o){if(h==null)h=new A.ar("")
if(q<r){h.a+=B.a.n(a,q,r)
q=r}p=!1}++r}else{k=1
if((o&64512)===55296&&r+1<c){m=r+1
if(!(m<s))return A.e(a,m)
j=a.charCodeAt(m)
if((j&64512)===56320){o=65536+((o&1023)<<10)+(j&1023)
k=2}}i=B.a.n(a,q,r)
if(h==null){h=new A.ar("")
m=h}else m=h
m.a+=i
l=A.nI(o)
m.a+=l
r+=k
q=r}}if(h==null)return B.a.n(a,b,c)
if(q<c){i=B.a.n(a,q,c)
h.a+=i}s=h.a
return s.charCodeAt(0)==0?s:s},
tf(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.f
for(s=a.length,r=b,q=r,p=null,o=!0;r<c;){if(!(r>=0&&r<s))return A.e(a,r)
n=a.charCodeAt(r)
if(n===37){m=A.nL(a,r,!0)
l=m==null
if(l&&o){r+=3
continue}if(p==null)p=new A.ar("")
k=B.a.n(a,q,r)
if(!o)k=k.toLowerCase()
j=p.a+=k
i=3
if(l)m=B.a.n(a,r,r+3)
else if(m==="%"){m="%25"
i=1}p.a=j+m
r+=i
q=r
o=!0}else if(n<127&&(g.charCodeAt(n)&32)!==0){if(o&&65<=n&&90>=n){if(p==null)p=new A.ar("")
if(q<r){p.a+=B.a.n(a,q,r)
q=r}o=!1}++r}else if(n<=93&&(g.charCodeAt(n)&1024)!==0)A.d7(a,r,"Invalid character")
else{i=1
if((n&64512)===55296&&r+1<c){l=r+1
if(!(l<s))return A.e(a,l)
h=a.charCodeAt(l)
if((h&64512)===56320){n=65536+((n&1023)<<10)+(h&1023)
i=2}}k=B.a.n(a,q,r)
if(!o)k=k.toLowerCase()
if(p==null){p=new A.ar("")
l=p}else l=p
l.a+=k
j=A.nI(n)
l.a+=j
r+=i
q=r}}if(p==null)return B.a.n(a,b,c)
if(q<c){k=B.a.n(a,q,c)
if(!o)k=k.toLowerCase()
p.a+=k}s=p.a
return s.charCodeAt(0)==0?s:s},
nK(a,b,c){var s,r,q,p
if(b===c)return""
s=a.length
if(!(b<s))return A.e(a,b)
if(!A.pi(a.charCodeAt(b)))A.d7(a,b,"Scheme not starting with alphabetic character")
for(r=b,q=!1;r<c;++r){if(!(r<s))return A.e(a,r)
p=a.charCodeAt(r)
if(!(p<128&&(u.f.charCodeAt(p)&8)!==0))A.d7(a,r,"Illegal scheme character")
if(65<=p&&p<=90)q=!0}a=B.a.n(a,b,c)
return A.t6(q?a.toLowerCase():a)},
t6(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
td(a,b,c){return A.eD(a,b,c,16,!1,!1)},
tb(a,b,c,d,e,f){var s,r=e==="file",q=r||f
if(a==null)return r?"/":""
else s=A.eD(a,b,c,128,!0,!0)
if(s.length===0){if(r)return"/"}else if(q&&!B.a.M(s,"/"))s="/"+s
return A.te(s,e,f)},
te(a,b,c){var s=b.length===0
if(s&&!c&&!B.a.M(a,"/")&&!B.a.M(a,"\\"))return A.pl(a,!s||c)
return A.d8(a)},
tc(a,b,c,d){if(a!=null)return A.eD(a,b,c,256,!0,!1)
return null},
t9(a,b,c){return A.eD(a,b,c,256,!0,!1)},
nL(a,b,c){var s,r,q,p,o,n,m=u.f,l=b+2,k=a.length
if(l>=k)return"%"
s=b+1
if(!(s>=0&&s<k))return A.e(a,s)
r=a.charCodeAt(s)
if(!(l>=0))return A.e(a,l)
q=a.charCodeAt(l)
p=A.mV(r)
o=A.mV(q)
if(p<0||o<0)return"%"
n=p*16+o
if(n<127){if(!(n>=0))return A.e(m,n)
l=(m.charCodeAt(n)&1)!==0}else l=!1
if(l)return A.a7(c&&65<=n&&90>=n?(n|32)>>>0:n)
if(r>=97||q>=97)return B.a.n(a,b,b+3).toUpperCase()
return null},
nI(a){var s,r,q,p,o,n,m,l,k="0123456789ABCDEF"
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
for(o=0;--p,p>=0;q=128){n=B.c.f3(a,6*p)&63|q
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
o+=3}}return A.oP(s,0,null)},
eD(a,b,c,d,e,f){var s=A.pk(a,b,c,d,e,f)
return s==null?B.a.n(a,b,c):s},
pk(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null,h=u.f
for(s=!e,r=a.length,q=b,p=q,o=i;q<c;){if(!(q>=0&&q<r))return A.e(a,q)
n=a.charCodeAt(q)
if(n<127&&(h.charCodeAt(n)&d)!==0)++q
else{m=1
if(n===37){l=A.nL(a,q,!1)
if(l==null){q+=3
continue}if("%"===l)l="%25"
else m=3}else if(n===92&&f)l="/"
else if(s&&n<=93&&(h.charCodeAt(n)&1024)!==0){A.d7(a,q,"Invalid character")
m=i
l=m}else{if((n&64512)===55296){k=q+1
if(k<c){if(!(k<r))return A.e(a,k)
j=a.charCodeAt(k)
if((j&64512)===56320){n=65536+((n&1023)<<10)+(j&1023)
m=2}}}l=A.nI(n)}if(o==null){o=new A.ar("")
k=o}else k=o
k.a=(k.a+=B.a.n(a,p,q))+l
if(typeof m!=="number")return A.ur(m)
q+=m
p=q}}if(o==null)return i
if(p<c){s=B.a.n(a,p,c)
o.a+=s}s=o.a
return s.charCodeAt(0)==0?s:s},
pj(a){if(B.a.M(a,"."))return!0
return B.a.dh(a,"/.")!==-1},
d8(a){var s,r,q,p,o,n,m
if(!A.pj(a))return a
s=A.A([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(n===".."){m=s.length
if(m!==0){if(0>=m)return A.e(s,-1)
s.pop()
if(s.length===0)B.b.m(s,"")}p=!0}else{p="."===n
if(!p)B.b.m(s,n)}}if(p)B.b.m(s,"")
return B.b.Y(s,"/")},
pl(a,b){var s,r,q,p,o,n
if(!A.pj(a))return!b?A.ph(a):a
s=A.A([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n){if(s.length!==0&&B.b.gc8(s)!==".."){if(0>=s.length)return A.e(s,-1)
s.pop()}else B.b.m(s,"..")
p=!0}else{p="."===n
if(!p)B.b.m(s,n.length===0&&s.length===0?"./":n)}}if(s.length===0)return"./"
if(p)B.b.m(s,"")
if(!b){if(0>=s.length)return A.e(s,0)
B.b.k(s,0,A.ph(s[0]))}return B.b.Y(s,"/")},
ph(a){var s,r,q,p=u.f,o=a.length
if(o>=2&&A.pi(a.charCodeAt(0)))for(s=1;s<o;++s){r=a.charCodeAt(s)
if(r===58)return B.a.n(a,0,s)+"%3A"+B.a.X(a,s+1)
if(r<=127){if(!(r<128))return A.e(p,r)
q=(p.charCodeAt(r)&8)===0}else q=!0
if(q)break}return a},
tg(a,b){if(a.fH("package")&&a.c==null)return A.pL(b,0,b.length)
return-1},
t8(a,b){var s,r,q,p,o
for(s=a.length,r=0,q=0;q<2;++q){p=b+q
if(!(p<s))return A.e(a,p)
o=a.charCodeAt(p)
if(48<=o&&o<=57)r=r*16+o-48
else{o|=32
if(97<=o&&o<=102)r=r*16+o-87
else throw A.b(A.b6("Invalid URL encoding",null))}}return r},
nM(a,b,c,d,e){var s,r,q,p,o=a.length,n=b
for(;;){if(!(n<c)){s=!0
break}if(!(n<o))return A.e(a,n)
r=a.charCodeAt(n)
q=!0
if(r<=127)if(r!==37)q=r===43
if(q){s=!1
break}++n}if(s)if(B.o===d)return B.a.n(a,b,c)
else p=new A.eZ(B.a.n(a,b,c))
else{p=A.A([],t.b)
for(n=b;n<c;++n){if(!(n<o))return A.e(a,n)
r=a.charCodeAt(n)
if(r>127)throw A.b(A.b6("Illegal percent encoding in URI",null))
if(r===37){if(n+3>o)throw A.b(A.b6("Truncated URI",null))
B.b.m(p,A.t8(a,n+1))
n+=2}else if(r===43)B.b.m(p,32)
else B.b.m(p,r)}}return d.L(0,p)},
pi(a){var s=a|32
return 97<=s&&s<=122},
oT(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.A([b-1],t.b)
for(s=a.length,r=b,q=-1,p=null;r<s;++r){p=a.charCodeAt(r)
if(p===44||p===59)break
if(p===47){if(q<0){q=r
continue}throw A.b(A.a1(k,a,r))}}if(q<0&&r>b)throw A.b(A.a1(k,a,r))
while(p!==44){B.b.m(j,r);++r
for(o=-1;r<s;++r){if(!(r>=0))return A.e(a,r)
p=a.charCodeAt(r)
if(p===61){if(o<0)o=r}else if(p===59||p===44)break}if(o>=0)B.b.m(j,o)
else{n=B.b.gc8(j)
if(p!==44||r!==n+7||!B.a.P(a,"base64",n+1))throw A.b(A.a1("Expecting '='",a,r))
break}}B.b.m(j,r)
m=r+1
if((j.length&1)===1)a=B.Q.dq(0,a,m,s)
else{l=A.pk(a,m,s,256,!0,!1)
if(l!=null)a=B.a.az(a,m,s,l)}return new A.lP(a,j,c)},
pJ(a,b,c,d,e){var s,r,q,p,o,n='\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe3\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0e\x03\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\n\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\xeb\xeb\x8b\xeb\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x83\xeb\xeb\x8b\xeb\x8b\xeb\xcd\x8b\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x92\x83\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x8b\xeb\x8b\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xebD\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12D\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe8\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x05\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x10\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\f\xec\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\xec\f\xec\f\xec\xcd\f\xec\f\f\f\f\f\f\f\f\f\xec\f\f\f\f\f\f\f\f\f\f\xec\f\xec\f\xec\f\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\r\xed\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\xed\r\xed\r\xed\xed\r\xed\r\r\r\r\r\r\r\r\r\xed\r\r\r\r\r\r\r\r\r\r\xed\r\xed\r\xed\r\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0f\xea\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe9\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\t\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x11\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xe9\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\t\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x13\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\xf5\x15\x15\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5'
for(s=a.length,r=b;r<c;++r){if(!(r<s))return A.e(a,r)
q=a.charCodeAt(r)^96
if(q>95)q=31
p=d*96+q
if(!(p<2112))return A.e(n,p)
o=n.charCodeAt(p)
d=o&31
B.b.k(e,o>>>5,r)}return d},
p8(a){if(a.b===7&&B.a.M(a.a,"package")&&a.c<=0)return A.pL(a.a,a.e,a.f)
return-1},
pL(a,b,c){var s,r,q,p
for(s=a.length,r=b,q=0;r<c;++r){if(!(r>=0&&r<s))return A.e(a,r)
p=a.charCodeAt(r)
if(p===47)return q!==0?r:-1
if(p===37||p===58)return-1
q|=p^46}return-1},
ts(a,b,c){var s,r,q,p,o,n,m,l
for(s=a.length,r=b.length,q=0,p=0;p<s;++p){o=c+p
if(!(o<r))return A.e(b,o)
n=b.charCodeAt(o)
m=a.charCodeAt(p)^n
if(m!==0){if(m===32){l=n|m
if(97<=l&&l<=122){q=32
continue}}return-1}}return q},
lu:function lu(a,b){this.a=a
this.b=b},
l6:function l6(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
a9:function a9(a,b,c){this.a=a
this.b=b
this.c=c},
l8:function l8(){},
l9:function l9(){},
br:function br(a){this.a=a},
Z:function Z(){},
eP:function eP(a){this.a=a},
bA:function bA(){},
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
fd:function fd(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
fA:function fA(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
e4:function e4(a){this.a=a},
fW:function fW(a){this.a=a},
bz:function bz(a){this.a=a},
f_:function f_(a){this.a=a},
fD:function fD(){},
e_:function e_(){},
m2:function m2(a){this.a=a},
bk:function bk(a,b,c){this.a=a
this.b=b
this.c=c},
f:function f(){},
al:function al(a,b,c){this.a=a
this.b=b
this.$ti=c},
a6:function a6(){},
F:function F(){},
hS:function hS(){},
ar:function ar(a){this.a=a},
lR:function lR(a){this.a=a},
lQ:function lQ(a){this.a=a},
eC:function eC(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
lP:function lP(a,b,c){this.a=a
this.b=b
this.c=c},
b0:function b0(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=null},
hc:function hc(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
r2(a,b,c){var s,r=document.body
r.toString
s=t.aN
return t.h.a(new A.J(new A.aw(B.x.a2(r,a,b,c)),s.i("I(k.E)").a(new A.lb()),s.i("J<k.E>")).gaD(0))},
dt(a){var s,r,q="element tag unavailable"
try{s=a.tagName
s.toString
q=s}catch(r){}return q},
oC(a,b,c){var s=t.z,r=A.an(s,s)
r.k(0,"body",b)
r.k(0,"icon",c)
return A.rg(a,r)},
rg(a,b){var s=new Notification(a,A.pR(b))
s.toString
return s},
oD(){return Notification.permission},
rh(a){var s=Notification.requestPermission(A.bo(a,1))
s.toString
return s},
ri(){var s=new A.W($.O,t.j2)
A.rh(new A.lx(new A.bE(s,t.cc)))
return s},
rj(a,b,c,d){var s=new Option(a,b,c,!1)
s.toString
return s},
rI(a,b){var s,r=a.classList
r.toString
for(s=0;s<5;++s)r.remove(b[s])},
C(a,b,c,d,e){var s=c==null?null:A.pN(new A.m0(c),t.A)
s=new A.ee(a,b,s,!1,e.i("ee<0>"))
s.cZ()
return s},
p2(a){var s=document.createElement("a")
s.toString
s=new A.hK(s,t.d.a(window.location))
s=new A.cs(s)
s.eg(a)
return s},
rJ(a,b,c,d){t.h.a(a)
A.w(b)
A.w(c)
t.dl.a(d)
return!0},
rK(a,b,c,d){var s,r,q,p,o,n
t.h.a(a)
A.w(b)
A.w(c)
s=t.dl.a(d).a
r=s.a
B.N.sfC(r,c)
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
pb(){var s=t.N,r=A.oy(B.F,s),q=A.A(["TEMPLATE"],t.s),p=t.gL.a(new A.mq())
s=new A.hV(r,A.ci(s),A.ci(s),A.ci(s),null)
s.ei(null,new A.a_(B.F,p,t.gQ),q,null)
return s},
pt(a){var s,r="postMessage" in a
r.toString
if(r){s=A.rH(a)
return s}else return t.O.a(a)},
rH(a){var s=window
s.toString
if(a===s)return t.kg.a(a)
else return new A.ha()},
pN(a,b){var s=$.O
if(s===B.h)return a
return s.d7(a,b)},
q:function q(){},
eN:function eN(){},
cD:function cD(){},
eO:function eO(){},
cE:function cE(){},
bO:function bO(){},
c8:function c8(){},
bP:function bP(){},
bj:function bj(){},
f2:function f2(){},
X:function X(){},
ca:function ca(){},
ki:function ki(){},
aA:function aA(){},
b8:function b8(){},
f3:function f3(){},
f4:function f4(){},
f5:function f5(){},
dp:function dp(){},
cb:function cb(){},
f6:function f6(){},
dq:function dq(){},
dr:function dr(){},
ds:function ds(){},
f7:function f7(){},
f8:function f8(){},
h6:function h6(a,b){this.a=a
this.b=b},
bG:function bG(a,b){this.a=a
this.$ti=b},
E:function E(){},
lb:function lb(){},
o:function o(){},
du:function du(){},
d:function d(){},
aH:function aH(){},
dw:function dw(){},
dx:function dx(){},
fa:function fa(){},
cH:function cH(){},
aI:function aI(){},
dy:function dy(){},
fc:function fc(){},
bS:function bS(){},
dz:function dz(){},
bu:function bu(){},
ce:function ce(){},
cI:function cI(){},
dA:function dA(){},
bT:function bT(){},
cN:function cN(){},
fo:function fo(){},
fp:function fp(){},
fq:function fq(){},
ls:function ls(a){this.a=a},
fr:function fr(){},
lt:function lt(a){this.a=a},
aK:function aK(){},
fs:function fs(){},
at:function at(){},
aw:function aw(a){this.a=a},
t:function t(){},
dR:function dR(){},
lx:function lx(a){this.a=a},
bx:function bx(){},
dU:function dU(){},
aL:function aL(){},
fF:function fF(){},
aZ:function aZ(){},
fH:function fH(){},
lC:function lC(a){this.a=a},
bY:function bY(){},
aN:function aN(){},
fJ:function fJ(){},
aO:function aO(){},
fK:function fK(){},
aP:function aP(){},
e0:function e0(){},
lE:function lE(a){this.a=a},
au:function au(){},
e2:function e2(){},
fN:function fN(){},
fO:function fO(){},
cV:function cV(){},
cm:function cm(){},
aQ:function aQ(){},
av:function av(){},
fQ:function fQ(){},
fR:function fR(){},
fS:function fS(){},
aR:function aR(){},
fT:function fT(){},
fU:function fU(){},
be:function be(){},
h_:function h_(){},
h1:function h1(){},
c2:function c2(){},
bn:function bn(){},
cZ:function cZ(){},
h8:function h8(){},
ec:function ec(){},
hm:function hm(){},
el:function el(){},
hN:function hN(){},
hT:function hT(){},
h4:function h4(){},
ed:function ed(a){this.a=a},
hb:function hb(a){this.a=a},
lZ:function lZ(a,b){this.a=a
this.b=b},
m_:function m_(a,b){this.a=a
this.b=b},
hh:function hh(a){this.a=a},
nm:function nm(a,b){this.a=a
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
m0:function m0(a){this.a=a},
m1:function m1(a){this.a=a},
cs:function cs(a){this.a=a},
x:function x(){},
dS:function dS(a){this.a=a},
lw:function lw(a){this.a=a},
lv:function lv(a,b,c){this.a=a
this.b=b
this.c=c},
er:function er(){},
mo:function mo(){},
mp:function mp(){},
hV:function hV(a,b,c,d,e){var _=this
_.e=a
_.a=b
_.b=c
_.c=d
_.d=e},
mq:function mq(){},
hU:function hU(){},
cc:function cc(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.d=null
_.$ti=c},
ha:function ha(){},
hK:function hK(a,b){this.a=a
this.b=b},
eE:function eE(a){this.a=a
this.b=0},
mA:function mA(a){this.a=a},
h9:function h9(){},
hd:function hd(){},
he:function he(){},
hf:function hf(){},
hg:function hg(){},
hj:function hj(){},
hk:function hk(){},
ho:function ho(){},
hp:function hp(){},
hw:function hw(){},
hx:function hx(){},
hy:function hy(){},
hz:function hz(){},
hA:function hA(){},
hB:function hB(){},
hF:function hF(){},
hG:function hG(){},
hI:function hI(){},
es:function es(){},
et:function et(){},
hL:function hL(){},
hM:function hM(){},
hO:function hO(){},
hW:function hW(){},
hX:function hX(){},
ew:function ew(){},
ex:function ex(){},
hY:function hY(){},
hZ:function hZ(){},
i3:function i3(){},
i4:function i4(){},
i5:function i5(){},
i6:function i6(){},
i7:function i7(){},
i8:function i8(){},
i9:function i9(){},
ia:function ia(){},
ib:function ib(){},
ic:function ic(){},
pu(a){var s,r,q,p
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
q.push(A.pu(a[p]));++p}return q}return a},
b3(a){var s,r,q,p,o,n
if(a==null)return null
s=A.an(t.N,t.z)
r=Object.getOwnPropertyNames(a)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.aE)(r),++p){o=r[p]
n=o
n.toString
s.k(0,n,A.pu(a[o]))}return s},
ps(a){var s
if(a==null)return a
if(typeof a=="string"||typeof a=="number"||A.d9(a))return a
if(t.f.b(a))return A.pR(a)
if(t.j.b(a)){s=[]
J.eM(a,new A.mG(s))
a=s}return a},
pR(a){var s={}
J.eM(a,new A.mS(s))
return s},
nk(){var s=window.navigator.userAgent
s.toString
return s},
mG:function mG(a){this.a=a},
mS:function mS(a){this.a=a},
f1:function f1(){},
kg:function kg(a){this.a=a},
kh:function kh(a){this.a=a},
fb:function fb(a,b){this.a=a
this.b=b},
lc:function lc(){},
ld:function ld(){},
cM:function cM(){},
tp(a,b,c,d){var s,r,q
A.mB(b)
t.j.a(d)
if(b){s=[c]
B.b.S(s,d)
d=s}r=t.z
q=A.aJ(J.di(d,A.ux(),r),!0,r)
return A.nP(A.op(t.Y.a(a),q))},
nQ(a,b,c){var s
try{if(Object.isExtensible(a)&&!Object.prototype.hasOwnProperty.call(a,b)){Object.defineProperty(a,b,{value:c})
return!0}}catch(s){}return!1},
py(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return null},
nP(a){if(a==null||typeof a=="string"||typeof a=="number"||A.d9(a))return a
if(a instanceof A.bl)return a.a
if(A.pU(a))return a
if(t.jv.b(a))return a
if(a instanceof A.a9)return A.aM(a)
if(t.Y.b(a))return A.px(a,"$dart_jsFunction",new A.mI())
return A.px(a,"_$dart_jsObject",new A.mJ($.o7()))},
px(a,b,c){var s=A.py(a,b)
if(s==null){s=c.$1(a)
A.nQ(a,b,s)}return s},
nO(a){var s
if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else if(a instanceof Object&&A.pU(a))return a
else if(a instanceof Object&&t.jv.b(a))return a
else if(a instanceof Date){s=A.H(a.getTime())
if(s<-864e13||s>864e13)A.bM(A.aj(s,-864e13,864e13,"millisecondsSinceEpoch",null))
A.cx(!1,"isUtc",t.y)
return new A.a9(s,0,!1)}else if(a.constructor===$.o7())return a.o
else return A.pM(a)},
pM(a){if(typeof a=="function")return A.nR(a,$.ik(),new A.mO())
if(Array.isArray(a))return A.nR(a,$.o6(),new A.mP())
return A.nR(a,$.o6(),new A.mQ())},
nR(a,b,c){var s=A.py(a,b)
if(s==null||!(a instanceof Object)){s=c.$1(a)
A.nQ(a,b,s)}return s},
hJ:function hJ(){},
mI:function mI(){},
mJ:function mJ(a){this.a=a},
mO:function mO(){},
mP:function mP(){},
mQ:function mQ(){},
bl:function bl(a){this.a=a},
dD:function dD(a){this.a=a},
cg:function cg(a,b){this.a=a
this.$ti=b},
d2:function d2(){},
ly:function ly(a){this.a=a},
tu(a){var s,r=a.$dart_jsFunction
if(r!=null)return r
s=function(b,c){return function(){return b(c,Array.prototype.slice.apply(arguments))}}(A.tq,a)
s[$.ik()]=a
a.$dart_jsFunction=s
return s},
tq(a,b){t.j.a(b)
return A.op(t.Y.a(a),b)},
u9(a,b){if(typeof a=="function")return a
else return b.a(A.tu(a))},
pD(a){return a==null||A.d9(a)||typeof a=="number"||typeof a=="string"||t.jx.b(a)||t.ev.b(a)||t.nn.b(a)||t.m6.b(a)||t.hM.b(a)||t.bW.b(a)||t.mC.b(a)||t.pk.b(a)||t.kI.b(a)||t.lo.b(a)||t.fW.b(a)},
uz(a){if(A.pD(a))return a
return new A.n_(new A.ei(t.mp)).$1(a)},
pX(a,b){var s=new A.W($.O,b.i("W<0>")),r=new A.bE(s,b.i("bE<0>"))
a.then(A.bo(new A.n7(r,b),1),A.bo(new A.n8(r),1))
return s},
n_:function n_(a){this.a=a},
n7:function n7(a,b){this.a=a
this.b=b},
n8:function n8(a){this.a=a},
me:function me(a){this.a=a},
aT:function aT(){},
fn:function fn(){},
aW:function aW(){},
fB:function fB(){},
fG:function fG(){},
cT:function cT(){},
fM:function fM(){},
eR:function eR(a){this.a=a},
r:function r(){},
aX:function aX(){},
fV:function fV(){},
hs:function hs(){},
ht:function ht(){},
hC:function hC(){},
hD:function hD(){},
hQ:function hQ(){},
hR:function hR(){},
i_:function i_(){},
i0:function i0(){},
eS:function eS(){},
eT:function eT(){},
kd:function kd(a){this.a=a},
eU:function eU(){},
bN:function bN(){},
fC:function fC(){},
h5:function h5(){},
uB(){var s=document
s.toString
B.C.bX(s,"DOMContentLoaded",new A.n0())},
n0:function n0(){},
ip:function ip(){var _=this
_.a=null
_.b="view-dashboard"
_.x=_.w=_.r=_.f=_.e=_.d=_.c=null
_.y=0
_.fr=_.dx=_.db=_.cy=_.cx=_.CW=_.ch=_.ay=_.ax=_.at=_.as=_.Q=_.z=$
_.fx=null
_.fy=!1
_.go=null},
jn:function jn(){},
jj:function jj(a){this.a=a},
jk:function jk(a){this.a=a},
jl:function jl(a){this.a=a},
jm:function jm(a){this.a=a},
iT:function iT(a){this.a=a},
iP:function iP(){},
iQ:function iQ(){},
iR:function iR(a,b){this.a=a
this.b=b},
iS:function iS(a){this.a=a},
iW:function iW(a){this.a=a},
iX:function iX(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
iY:function iY(a){this.a=a},
j5:function j5(a){this.a=a},
j6:function j6(a){this.a=a},
iV:function iV(a,b){this.a=a
this.b=b},
j7:function j7(a){this.a=a},
j8:function j8(a){this.a=a},
j9:function j9(a){this.a=a},
ja:function ja(a){this.a=a},
jb:function jb(a){this.a=a},
jc:function jc(a,b){this.a=a
this.b=b},
iZ:function iZ(a){this.a=a},
j_:function j_(a){this.a=a},
j0:function j0(a){this.a=a},
j1:function j1(a){this.a=a},
j2:function j2(a){this.a=a},
j3:function j3(a){this.a=a},
j4:function j4(a){this.a=a},
iU:function iU(a,b){this.a=a
this.b=b},
jd:function jd(){},
jZ:function jZ(){},
k_:function k_(){},
k0:function k0(){},
k8:function k8(a){this.a=a},
k9:function k9(a){this.a=a},
jz:function jz(){},
jA:function jA(a,b){this.a=a
this.b=b},
jy:function jy(a,b){this.a=a
this.b=b},
jB:function jB(a,b){this.a=a
this.b=b},
jx:function jx(a){this.a=a},
jC:function jC(a,b){this.a=a
this.b=b},
jv:function jv(a){this.a=a},
jw:function jw(a,b){this.a=a
this.b=b},
jD:function jD(a,b,c){this.a=a
this.b=b
this.c=c},
js:function js(a){this.a=a},
jt:function jt(a){this.a=a},
ju:function ju(a,b){this.a=a
this.b=b},
jE:function jE(a,b,c){this.a=a
this.b=b
this.c=c},
jq:function jq(a){this.a=a},
jr:function jr(){},
jG:function jG(a,b,c){this.a=a
this.b=b
this.c=c},
jH:function jH(a,b){this.a=a
this.b=b},
jF:function jF(a,b){this.a=a
this.b=b},
jo:function jo(a){this.a=a},
jU:function jU(){},
jV:function jV(a,b){this.a=a
this.b=b},
jW:function jW(){},
jX:function jX(){},
jY:function jY(a,b){this.a=a
this.b=b},
jI:function jI(a){this.a=a},
jJ:function jJ(a,b){this.a=a
this.b=b},
jK:function jK(){},
jL:function jL(){},
jM:function jM(a){this.a=a},
je:function je(a){this.a=a},
jf:function jf(a){this.a=a},
jg:function jg(a){this.a=a},
jh:function jh(a,b){this.a=a
this.b=b},
ji:function ji(a){this.a=a},
k2:function k2(a){this.a=a},
k3:function k3(a,b,c){this.a=a
this.b=b
this.c=c},
k1:function k1(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
kb:function kb(){},
jp:function jp(a,b){this.a=a
this.b=b},
ka:function ka(a,b){this.a=a
this.b=b},
k7:function k7(a){this.a=a},
k4:function k4(){},
k5:function k5(){},
k6:function k6(){},
jN:function jN(){},
jO:function jO(){},
jP:function jP(){},
jQ:function jQ(a){this.a=a},
jR:function jR(){},
jS:function jS(){},
jT:function jT(a,b){this.a=a
this.b=b},
iK:function iK(){},
iJ:function iJ(a){this.a=a},
iL:function iL(a){this.a=a},
iM:function iM(a,b){this.a=a
this.b=b},
iN:function iN(a,b,c){this.a=a
this.b=b
this.c=c},
iO:function iO(){},
ir:function ir(a){this.a=a},
is:function is(a){this.a=a},
it:function it(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
iI:function iI(a){this.a=a},
iy:function iy(a,b){this.a=a
this.b=b},
iH:function iH(a){this.a=a},
iq:function iq(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
iG:function iG(a,b,c){this.a=a
this.b=b
this.c=c},
iz:function iz(a,b){this.a=a
this.b=b},
iA:function iA(a,b){this.a=a
this.b=b},
iB:function iB(a,b){this.a=a
this.b=b},
iC:function iC(a,b){this.a=a
this.b=b},
iD:function iD(a,b){this.a=a
this.b=b},
iE:function iE(a){this.a=a},
iF:function iF(a,b){this.a=a
this.b=b},
iu:function iu(a,b){this.a=a
this.b=b},
iv:function iv(a,b){this.a=a
this.b=b},
iw:function iw(a,b){this.a=a
this.b=b},
ix:function ix(a){this.a=a},
aS:function aS(a,b,c){this.a=a
this.b=b
this.c=c},
kj:function kj(a,b,c,d,e,f,g,h,i,j){var _=this
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
km:function km(){},
kn:function kn(a){this.a=a},
ku:function ku(a){this.a=a},
kq:function kq(a,b){this.a=a
this.b=b},
kr:function kr(a){this.a=a},
ks:function ks(a){this.a=a},
kt:function kt(a,b){this.a=a
this.b=b},
kF:function kF(){},
kG:function kG(){},
kp:function kp(){},
kR:function kR(){},
kS:function kS(a,b,c){this.a=a
this.b=b
this.c=c},
kW:function kW(){},
kX:function kX(a){this.a=a},
kY:function kY(a){this.a=a},
kV:function kV(a){this.a=a},
kZ:function kZ(a){this.a=a},
l_:function l_(){},
kL:function kL(a){this.a=a},
kM:function kM(a){this.a=a},
kN:function kN(a){this.a=a},
kO:function kO(a){this.a=a},
kP:function kP(a){this.a=a},
kQ:function kQ(a){this.a=a},
kv:function kv(){},
kE:function kE(){},
kU:function kU(a,b,c){this.a=a
this.b=b
this.c=c},
kT:function kT(a,b){this.a=a
this.b=b},
l0:function l0(){},
l1:function l1(){},
l2:function l2(a){this.a=a},
l3:function l3(){},
kl:function kl(){},
kk:function kk(a,b,c){this.a=a
this.b=b
this.c=c},
kD:function kD(a,b){this.a=a
this.b=b},
l4:function l4(a){this.a=a},
kC:function kC(){},
kA:function kA(a){this.a=a},
kB:function kB(){},
kw:function kw(){},
kx:function kx(){},
ky:function ky(a){this.a=a},
kz:function kz(){},
kH:function kH(a,b){this.a=a
this.b=b},
kI:function kI(){},
kJ:function kJ(){},
kK:function kK(a,b){this.a=a
this.b=b},
ko:function ko(a){this.a=a},
n6(){var s,r=$.qb(),q=A.A(new Array(24),t.s)
for(s=0;s<24;++s)q[s]=B.a.a_(B.c.h3(r.fO(256),16),2,"0")
return B.b.fI(q)},
bI(){var s,r,q
try{r=window.localStorage.getItem("waterhall_jwt")
r.toString
s=r
r=J.oc(s,".")
if(1>=r.length)return A.e(r,1)
r=A.w(J.m(B.e.L(0,B.o.L(0,B.y.bl(B.w.dn(0,r[1])))),"sub"))
return r}catch(q){return null}},
de(){var s,r,q,p
try{q=window.localStorage.getItem("waterhall_jwt")
q.toString
s=q
q=J.oc(s,".")
if(1>=q.length)return A.e(q,1)
r=B.e.L(0,B.o.L(0,B.y.bl(B.w.dn(0,q[1]))))
q=J.qs(J.qt(J.m(r,"exp"),1000),Date.now())
return q}catch(p){return!1}},
ih(a,b){var s=0,r=A.S(t.z),q
var $async$ih=A.T(function(c,d){if(c===1)return A.P(d,r)
for(;;)switch(s){case 0:if(!$.dh().bn("WaterHallStorage")){q=null
s=1
break}s=3
return A.z(A.pX(A.b2(globalThis.waterhallNativeCall(a,A.uz(b))),t.z),$async$ih)
case 3:q=d
s=1
break
case 1:return A.Q(q,r)}})
return A.R($async$ih,r)},
ii(a){var s=0,r=A.S(t.H)
var $async$ii=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:s=$.dh().bn("waterhallSetNativeSession")?2:3
break
case 2:s=4
return A.z(A.pX(A.b2(globalThis.waterhallSetNativeSession(a)),t.z),$async$ii)
case 4:case 3:return A.Q(null,r)}})
return A.R($async$ii,r)},
cB(a,b){var s=A.bI(),r=$.qr().cf(new A.n3(s,a,b),t.a)
$.tY=r.d8(new A.n4())
return r},
mK(a,b){var s=0,r=A.S(t.H),q,p,o,n
var $async$mK=A.T(function(c,d){if(c===1)return A.P(d,r)
for(;;)switch(s){case 0:n=A.bI()
if(n==null)throw A.b(A.ai("Sign in before recording an operation"))
q=A.G(b)
p=q.i("J<1>")
o=A.ab(new A.J(b,q.i("I(1)").a(new A.mL(n)),p),p.i("f.E"))
s=2
return A.z(A.ih("save",A.a5(["type",a,"rows",o],t.N,t.z)),$async$mK)
case 2:q=window.localStorage
q.toString
p=a==="collections"?"waterhall_offline_collections":"waterhall_unsynced_actions"
q.setItem(p,B.e.T(b))
return A.Q(null,r)}})
return A.R($async$mK,r)},
dg(){var s=0,r=A.S(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$dg=A.T(function(a2,a3){if(a2===1)return A.P(a3,r)
for(;;)switch(s){case 0:a1=window.localStorage.getItem("waterhall_jwt")
if(A.bI()==null){s=1
break}s=3
return A.z(A.ii(window.localStorage.getItem("waterhall_jwt")),$async$dg)
case 3:p=["collections","actions"],o=t.f,n=t.N,m=t.z,l=t.j,k=t.P,j=0
case 4:if(!(j<2)){s=6
break}i=p[j]
if(window.localStorage.getItem("waterhall_jwt")!=a1){s=1
break}s=7
return A.z(A.ih("load",A.a5(["type",i],n,m)),$async$dg)
case 7:h=a3
if(window.localStorage.getItem("waterhall_jwt")!=a1){s=1
break}if(h==null){s=5
break}g=l.a(B.e.L(0,A.w(h)))
f=i==="collections"?"waterhall_offline_collections":"waterhall_unsynced_actions"
e=window.localStorage.getItem(f)
d=A.an(n,k)
e=A.ab(l.a(B.e.L(0,e==null?"[]":e)),m)
B.b.S(e,g)
c=e.length
b=0
for(;b<e.length;e.length===c||(0,A.aE)(e),++b){a=A.ao(o.a(e[b]),n,m)
a0=a.h(0,"transaction_id")
d.k(0,J.M(a0==null?a.h(0,"operation_id"):a0),a)}s=A.bI()!=null?8:9
break
case 8:s=10
return A.z(A.cB(i,new A.na(d)),$async$dg)
case 10:case 9:case 5:++j
s=4
break
case 6:case 1:return A.Q(q,r)}})
return A.R($async$dg,r)},
n3:function n3(a,b,c){this.a=a
this.b=b
this.c=c},
n2:function n2(){},
n4:function n4(){},
mL:function mL(a){this.a=a},
na:function na(a){this.a=a},
n9:function n9(a){this.a=a},
pU(a){return t.fj.b(a)||t.A.b(a)||t.mz.b(a)||t.ad.b(a)||t.F.b(a)||t.hE.b(a)||t.f5.b(a)},
uD(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
uH(a){throw A.ah(A.ou(a),new Error())},
aF(){throw A.ah(A.rc(""),new Error())},
q1(){throw A.ah(A.ou(""),new Error())}},B={}
var w=[A,J,B]
var $={}
A.nq.prototype={}
J.cJ.prototype={
Z(a,b){return a===b},
gF(a){return A.dW(a)},
l(a){return"Instance of '"+A.dX(a)+"'"},
dm(a,b){throw A.b(A.oB(a,t.bg.a(b)))},
gU(a){return A.cy(A.nS(this))}}
J.fg.prototype={
l(a){return String(a)},
gF(a){return a?519018:218159},
gU(a){return A.cy(t.y)},
$iY:1,
$iI:1}
J.dC.prototype={
Z(a,b){return null==b},
l(a){return"null"},
gF(a){return 0},
$iY:1,
$ia6:1}
J.a.prototype={$ii:1}
J.bV.prototype={
gF(a){return 0},
l(a){return String(a)}}
J.fE.prototype={}
J.bC.prototype={}
J.bv.prototype={
l(a){var s=a[$.ik()]
if(s==null)s=a[$.q5()]
if(s==null)return this.ea(a)
return"JavaScript function for "+J.M(s)},
$icd:1}
J.cK.prototype={
gF(a){return 0},
l(a){return String(a)}}
J.cL.prototype={
gF(a){return 0},
l(a){return String(a)}}
J.ae.prototype={
m(a,b){A.G(a).c.a(b)
a.$flags&1&&A.aG(a,29)
a.push(b)},
c6(a,b,c){var s
A.G(a).c.a(c)
a.$flags&1&&A.aG(a,"insert",2)
s=a.length
if(b>s)throw A.b(A.oJ(b,null))
a.splice(b,0,c)},
eU(a,b,c){var s,r,q,p,o
A.G(a).i("I(1)").a(b)
s=[]
r=a.length
for(q=0;q<r;++q){p=a[q]
if(!b.$1(p))s.push(p)
if(a.length!==r)throw A.b(A.a3(a))}o=s.length
if(o===r)return
this.sj(a,o)
for(q=0;q<s.length;++q)a[q]=s[q]},
S(a,b){var s
A.G(a).i("f<1>").a(b)
a.$flags&1&&A.aG(a,"addAll",2)
if(Array.isArray(b)){this.eo(a,b)
return}for(s=J.b4(b);s.q();)a.push(s.gu(s))},
eo(a,b){var s,r
t.B.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.b(A.a3(a))
for(r=0;r<s;++r)a.push(b[r])},
aJ(a){a.$flags&1&&A.aG(a,"clear","clear")
a.length=0},
p(a,b){var s,r
A.G(a).i("~(1)").a(b)
s=a.length
for(r=0;r<s;++r){b.$1(a[r])
if(a.length!==s)throw A.b(A.a3(a))}},
am(a,b,c){var s=A.G(a)
return new A.a_(a,s.H(c).i("1(2)").a(b),s.i("@<1>").H(c).i("a_<1,2>"))},
Y(a,b){var s,r=A.dK(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.k(r,s,A.h(a[s]))
return r.join(b)},
fI(a){return this.Y(a,"")},
fV(a,b){var s,r,q
A.G(a).i("1(1,1)").a(b)
s=a.length
if(s===0)throw A.b(A.fe())
if(0>=s)return A.e(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.b(A.a3(a))}return r},
fA(a,b,c,d){var s,r,q
d.a(b)
A.G(a).H(d).i("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.b(A.a3(a))}return r},
df(a,b,c){var s,r,q,p=A.G(a)
p.i("I(1)").a(b)
p.i("1()?").a(c)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.b(A.a3(a))}if(c!=null)return c.$0()
throw A.b(A.fe())},
fz(a,b){return this.df(a,b,null)},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
cu(a,b,c){var s=a.length
if(b>s)throw A.b(A.aj(b,0,s,"start",null))
if(c==null)c=s
else if(c<b||c>s)throw A.b(A.aj(c,b,s,"end",null))
if(b===c)return A.A([],A.G(a))
return A.A(a.slice(b,c),A.G(a))},
e3(a,b){return this.cu(a,b,null)},
gaa(a){if(a.length>0)return a[0]
throw A.b(A.fe())},
gc8(a){var s=a.length
if(s>0)return a[s-1]
throw A.b(A.fe())},
a8(a,b){var s,r
A.G(a).i("I(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.b(A.a3(a))}return!1},
b9(a,b){var s,r,q,p,o,n=A.G(a)
n.i("j(1,1)?").a(b)
a.$flags&2&&A.aG(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.b7()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.bo(b,2))
if(p>0)this.eW(a,p)},
eW(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
A(a,b){var s
for(s=0;s<a.length;++s)if(J.n(a[s],b))return!0
return!1},
gD(a){return a.length===0},
gR(a){return a.length!==0},
l(a){return A.no(a,"[","]")},
gC(a){return new J.b7(a,a.length,A.G(a).i("b7<1>"))},
gF(a){return A.dW(a)},
gj(a){return a.length},
sj(a,b){a.$flags&1&&A.aG(a,"set length","change the length of")
if(b>a.length)A.G(a).c.a(null)
a.length=b},
h(a,b){A.H(b)
if(!(b>=0&&b<a.length))throw A.b(A.ig(a,b))
return a[b]},
k(a,b,c){A.G(a).c.a(c)
a.$flags&2&&A.aG(a)
if(!(b>=0&&b<a.length))throw A.b(A.ig(a,b))
a[b]=c},
dG(a,b){return new A.co(a,b.i("co<0>"))},
fD(a,b){var s
A.G(a).i("I(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$il:1,
$if:1,
$ip:1}
J.ff.prototype={
dD(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.dX(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.lk.prototype={}
J.b7.prototype={
gu(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.aE(q)
throw A.b(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iaa:1}
J.cf.prototype={
a1(a,b){var s
A.a2(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gbr(b)
if(this.gbr(a)===s)return 0
if(this.gbr(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbr(a){return a===0?1/a<0:a<0},
aA(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.b(A.N(""+a+".round()"))},
dc(a,b,c){if(B.c.a1(b,c)>0)throw A.b(A.nV(b))
if(this.a1(a,b)<0)return b
if(this.a1(a,c)>0)return c
return a},
E(a,b){var s
if(b>20)throw A.b(A.aj(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gbr(a))return"-"+s
return s},
h3(a,b){var s,r,q,p,o
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
o-=r.length}return s+B.a.aC("0",o)},
l(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gF(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
aC(a,b){return a*b},
ap(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
ef(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.cU(a,b)},
ae(a,b){return(a|0)===a?a/b|0:this.cU(a,b)},
cU(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.b(A.N("Result of truncating division is "+A.h(s)+": "+A.h(a)+" ~/ "+b))},
b_(a,b){var s
if(a>0)s=this.cT(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
f3(a,b){if(0>b)throw A.b(A.nV(b))
return this.cT(a,b)},
cT(a,b){return b>31?0:a>>>b},
b7(a,b){return a>b},
gU(a){return A.cy(t.w)},
$iV:1,
$ia0:1}
J.dB.prototype={
gU(a){return A.cy(t.S)},
$iY:1,
$ij:1}
J.fi.prototype={
gU(a){return A.cy(t.dx)},
$iY:1}
J.bU.prototype={
cl(a,b){return a+b},
e0(a,b){var s=A.A(a.split(b),t.s)
return s},
az(a,b,c,d){var s=A.cR(b,c,a.length)
return a.substring(0,b)+d+a.substring(s)},
P(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.aj(c,0,a.length,null,null))
s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)},
M(a,b){return this.P(a,b,0)},
n(a,b,c){return a.substring(b,A.cR(b,c,a.length))},
X(a,b){return this.n(a,b,null)},
h2(a){return a.toLowerCase()},
t(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.e(p,0)
if(p.charCodeAt(0)===133){s=J.r9(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.e(p,r)
q=p.charCodeAt(r)===133?J.ra(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
aC(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.b(B.Z)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
a_(a,b,c){var s=b-a.length
if(s<=0)return a
return this.aC(c,s)+a},
bq(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.aj(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
dh(a,b){return this.bq(a,b,0)},
dk(a,b,c){var s,r
if(c==null)c=a.length
else if(c<0||c>a.length)throw A.b(A.aj(c,0,a.length,null,null))
s=b.length
r=a.length
if(c+s>r)c=r-s
return a.lastIndexOf(b,c)},
fJ(a,b){return this.dk(a,b,null)},
bk(a,b,c){var s=a.length
if(c>s)throw A.b(A.aj(c,0,s,null,null))
return A.uF(a,b,c)},
A(a,b){return this.bk(a,b,0)},
a1(a,b){var s
A.w(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
l(a){return a},
gF(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gU(a){return A.cy(t.N)},
gj(a){return a.length},
h(a,b){A.H(b)
if(!(b>=0&&b<a.length))throw A.b(A.ig(a,b))
return a[b]},
$iY:1,
$ilA:1,
$ic:1}
A.dF.prototype={
l(a){return"LateInitializationError: "+this.a}}
A.eZ.prototype={
gj(a){return this.a.length},
h(a,b){var s
A.H(b)
s=this.a
if(!(b>=0&&b<s.length))return A.e(s,b)
return s.charCodeAt(b)}}
A.n5.prototype={
$0(){return A.nn(null,t.H)},
$S:65}
A.lD.prototype={}
A.l.prototype={}
A.af.prototype={
gC(a){var s=this
return new A.bw(s,s.gj(s),A.y(s).i("bw<af.E>"))},
gD(a){return this.gj(this)===0},
A(a,b){var s,r=this,q=r.gj(r)
for(s=0;s<q;++s){if(J.n(r.v(0,s),b))return!0
if(q!==r.gj(r))throw A.b(A.a3(r))}return!1},
Y(a,b){var s,r,q,p=this,o=p.gj(p)
if(b.length!==0){if(o===0)return""
s=A.h(p.v(0,0))
if(o!==p.gj(p))throw A.b(A.a3(p))
for(r=s,q=1;q<o;++q){r=r+b+A.h(p.v(0,q))
if(o!==p.gj(p))throw A.b(A.a3(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.h(p.v(0,q))
if(o!==p.gj(p))throw A.b(A.a3(p))}return r.charCodeAt(0)==0?r:r}},
bA(a,b){return this.e7(0,A.y(this).i("I(af.E)").a(b))},
am(a,b,c){var s=A.y(this)
return new A.a_(this,s.H(c).i("1(af.E)").a(b),s.i("@<af.E>").H(c).i("a_<1,2>"))},
aB(a,b){var s=A.ab(this,A.y(this).i("af.E"))
return s},
an(a){return this.aB(0,!0)},
dC(a){var s,r=this,q=A.ci(A.y(r).i("af.E"))
for(s=0;s<r.gj(r);++s)q.m(0,r.v(0,s))
return q}}
A.e1.prototype={
geF(){var s=J.ag(this.a),r=this.c
if(r==null||r>s)return s
return r},
gf5(){var s=J.ag(this.a),r=this.b
if(r>s)return s
return r},
gj(a){var s,r=J.ag(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
v(a,b){var s=this,r=s.gf5()+b
if(b<0||r>=s.geF())throw A.b(A.a4(b,s.gj(0),s,null,"index"))
return J.eL(s.a,r)},
aB(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.D(n),l=m.gj(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.np(0,n):J.or(0,n)}r=A.dK(s,m.v(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.b.k(r,q,m.v(n,o+q))
if(m.gj(n)<l)throw A.b(A.a3(p))}return r},
an(a){return this.aB(0,!0)}}
A.bw.prototype={
gu(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s,r=this,q=r.a,p=J.D(q),o=p.gj(q)
if(r.b!==o)throw A.b(A.a3(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.v(q,s);++r.c
return!0},
$iaa:1}
A.aC.prototype={
gC(a){return new A.dL(J.b4(this.a),this.b,A.y(this).i("dL<1,2>"))},
gj(a){return J.ag(this.a)},
gD(a){return J.im(this.a)},
v(a,b){return this.b.$1(J.eL(this.a,b))}}
A.bs.prototype={$il:1}
A.dL.prototype={
q(){var s=this,r=s.b
if(r.q()){s.a=s.c.$1(r.gu(r))
return!0}s.a=null
return!1},
gu(a){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iaa:1}
A.a_.prototype={
gj(a){return J.ag(this.a)},
v(a,b){return this.b.$1(J.eL(this.a,b))}}
A.J.prototype={
gC(a){return new A.bf(J.b4(this.a),this.b,this.$ti.i("bf<1>"))},
am(a,b,c){var s=this.$ti
return new A.aC(this,s.H(c).i("1(2)").a(b),s.i("@<1>").H(c).i("aC<1,2>"))}}
A.bf.prototype={
q(){var s,r
for(s=this.a,r=this.b;s.q();)if(r.$1(s.gu(s)))return!0
return!1},
gu(a){var s=this.a
return s.gu(s)},
$iaa:1}
A.co.prototype={
gC(a){return new A.e5(J.b4(this.a),this.$ti.i("e5<1>"))}}
A.e5.prototype={
q(){var s,r
for(s=this.a,r=this.$ti.c;s.q();)if(r.b(s.gu(s)))return!0
return!1},
gu(a){var s=this.a
return this.$ti.c.a(s.gu(s))},
$iaa:1}
A.aB.prototype={}
A.bD.prototype={
k(a,b,c){A.y(this).i("bD.E").a(c)
throw A.b(A.N("Cannot modify an unmodifiable list"))}}
A.cX.prototype={}
A.hv.prototype={
gj(a){return J.ag(this.a)},
v(a,b){var s=J.ag(this.a)
if(0>b||b>=s)A.bM(A.a4(b,s,this,null,"index"))
return b}}
A.cj.prototype={
h(a,b){return this.I(0,b)?J.m(this.a,A.H(b)):null},
gj(a){return J.ag(this.a)},
gG(a){return new A.hv(this.a)},
gD(a){return J.im(this.a)},
gR(a){return J.ni(this.a)},
I(a,b){return A.eG(b)&&b>=0&&b<J.ag(this.a)},
p(a,b){var s,r,q,p
this.$ti.i("~(j,1)").a(b)
s=this.a
r=J.D(s)
q=r.gj(s)
for(p=0;p<q;++p){b.$2(p,r.h(s,p))
if(q!==r.gj(s))throw A.b(A.a3(s))}}}
A.c_.prototype={
gF(a){var s=this._hashCode
if(s!=null)return s
s=664597*B.a.gF(this.a)&536870911
this._hashCode=s
return s},
l(a){return'Symbol("'+this.a+'")'},
Z(a,b){if(b==null)return!1
return b instanceof A.c_&&this.a===b.a},
$icU:1}
A.dm.prototype={}
A.dl.prototype={
gD(a){return this.gj(this)===0},
gR(a){return this.gj(this)!==0},
l(a){return A.nt(this)},
k(a,b,c){var s=A.y(this)
s.c.a(b)
s.y[1].a(c)
A.ol()},
B(a,b){A.ol()},
gau(a){return new A.d4(this.fu(0),A.y(this).i("d4<al<1,2>>"))},
fu(a){var s=this
return function(){var r=a
var q=0,p=1,o=[],n,m,l,k,j
return function $async$gau(b,c,d){if(c===1){o.push(d)
q=p}for(;;)switch(q){case 0:n=s.gG(s),n=n.gC(n),m=A.y(s),l=m.y[1],m=m.i("al<1,2>")
case 2:if(!n.q()){q=3
break}k=n.gu(n)
j=s.h(0,k)
q=4
return b.b=new A.al(k,j==null?l.a(j):j,m),1
case 4:q=2
break
case 3:return 0
case 1:return b.c=o.at(-1),3}}}},
$iu:1}
A.bp.prototype={
gj(a){return this.b.length},
gcL(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
I(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
h(a,b){if(!this.I(0,b))return null
return this.b[this.a[b]]},
p(a,b){var s,r,q,p
this.$ti.i("~(1,2)").a(b)
s=this.gcL()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gG(a){return new A.ej(this.gcL(),this.$ti.i("ej<1>"))}}
A.ej.prototype={
gj(a){return this.a.length},
gD(a){return 0===this.a.length},
gC(a){var s=this.a
return new A.ek(s,s.length,this.$ti.i("ek<1>"))}}
A.ek.prototype={
gu(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iaa:1}
A.fh.prototype={
gfM(){var s=this.a
if(s instanceof A.c_)return s
return this.a=new A.c_(A.w(s))},
gfR(){var s,r,q,p,o,n=this
if(n.c===1)return B.E
s=n.d
r=J.D(s)
q=r.gj(s)-J.ag(n.e)-n.f
if(q===0)return B.E
p=[]
for(o=0;o<q;++o)p.push(r.h(s,o))
p.$flags=3
return p},
gfN(){var s,r,q,p,o,n,m,l,k=this
if(k.c!==0)return B.H
s=k.e
r=J.D(s)
q=r.gj(s)
p=k.d
o=J.D(p)
n=o.gj(p)-q-k.f
if(q===0)return B.H
m=new A.b9(t.bX)
for(l=0;l<q;++l)m.k(0,new A.c_(A.w(r.h(s,l))),o.h(p,n+l))
return new A.dm(m,t.i9)},
$ioq:1}
A.lB.prototype={
$2(a,b){var s
A.w(a)
s=this.a
s.b=s.b+"$"+a
B.b.m(this.b,a)
B.b.m(this.c,b);++s.a},
$S:11}
A.cS.prototype={}
A.lJ.prototype={
ac(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.fk.prototype={
l(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.fX.prototype={
l(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.lz.prototype={
l(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.dv.prototype={}
A.eu.prototype={
l(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibd:1}
A.bQ.prototype={
l(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.q2(r==null?"unknown":r)+"'"},
$icd:1,
gh7(){return this},
$C:"$1",
$R:1,
$D:null}
A.eX.prototype={$C:"$0",$R:0}
A.eY.prototype={$C:"$2",$R:2}
A.fP.prototype={}
A.fL.prototype={
l(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.q2(s)+"'"}}
A.cF.prototype={
Z(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.cF))return!1
return this.$_target===b.$_target&&this.a===b.a},
gF(a){return(A.ij(this.a)^A.dW(this.$_target))>>>0},
l(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.dX(this.a)+"'")}}
A.fI.prototype={
l(a){return"RuntimeError: "+this.a}}
A.ml.prototype={}
A.b9.prototype={
gj(a){return this.a},
gD(a){return this.a===0},
gR(a){return this.a!==0},
gG(a){return new A.ch(this,A.y(this).i("ch<1>"))},
gau(a){return new A.dG(this,A.y(this).i("dG<1,2>"))},
I(a,b){var s=this.b
if(s==null)return!1
return s[b]!=null},
S(a,b){A.y(this).i("u<1,2>").a(b).p(0,new A.ll(this))},
h(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.fF(b)},
fF(a){var s,r,q=this.d
if(q==null)return null
s=q[this.di(a)]
r=this.dj(s,a)
if(r<0)return null
return s[r].b},
k(a,b,c){var s,r,q=this,p=A.y(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.cv(s==null?q.b=q.bO():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.cv(r==null?q.c=q.bO():r,b,c)}else q.fG(b,c)},
fG(a,b){var s,r,q,p,o=this,n=A.y(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.bO()
r=o.di(a)
q=s[r]
if(q==null)s[r]=[o.bP(a,b)]
else{p=o.dj(q,a)
if(p>=0)q[p].b=b
else q.push(o.bP(a,b))}},
fS(a,b,c){var s,r,q=this,p=A.y(q)
p.c.a(b)
p.i("2()").a(c)
if(q.I(0,b)){s=q.h(0,b)
return s==null?p.y[1].a(s):s}r=c.$0()
q.k(0,b,r)
return r},
B(a,b){var s=this.el(this.b,b)
return s},
p(a,b){var s,r,q=this
A.y(q).i("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.b(A.a3(q))
s=s.c}},
cv(a,b,c){var s,r=A.y(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.bP(b,c)
else s.b=c},
el(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.em(s)
delete a[b]
return s.b},
cN(){this.r=this.r+1&1073741823},
bP(a,b){var s=this,r=A.y(s),q=new A.lo(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.cN()
return q},
em(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.cN()},
di(a){return J.cC(a)&1073741823},
dj(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.n(a[r].a,b))return r
return-1},
l(a){return A.nt(this)},
bO(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$iov:1}
A.ll.prototype={
$2(a,b){var s=this.a,r=A.y(s)
s.k(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.y(this.a).i("~(1,2)")}}
A.lo.prototype={}
A.ch.prototype={
gj(a){return this.a.a},
gD(a){return this.a.a===0},
gC(a){var s=this.a
return new A.dI(s,s.r,s.e,this.$ti.i("dI<1>"))},
A(a,b){return this.a.I(0,b)}}
A.dI.prototype={
gu(a){return this.d},
q(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a3(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iaa:1}
A.aU.prototype={
gj(a){return this.a.a},
gD(a){return this.a.a===0},
gC(a){var s=this.a
return new A.dJ(s,s.r,s.e,this.$ti.i("dJ<1>"))},
p(a,b){var s,r,q
this.$ti.i("~(1)").a(b)
s=this.a
r=s.e
q=s.r
while(r!=null){b.$1(r.b)
if(q!==s.r)throw A.b(A.a3(s))
r=r.c}}}
A.dJ.prototype={
gu(a){return this.d},
q(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a3(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iaa:1}
A.dG.prototype={
gj(a){return this.a.a},
gD(a){return this.a.a===0},
gC(a){var s=this.a
return new A.dH(s,s.r,s.e,this.$ti.i("dH<1,2>"))}}
A.dH.prototype={
gu(a){var s=this.d
s.toString
return s},
q(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a3(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.al(s.a,s.b,r.$ti.i("al<1,2>"))
r.c=s.c
return!0}},
$iaa:1}
A.mW.prototype={
$1(a){return this.a(a)},
$S:13}
A.mX.prototype={
$2(a,b){return this.a(a,b)},
$S:63}
A.mY.prototype={
$1(a){return this.a(A.w(a))},
$S:66}
A.fj.prototype={
l(a){return"RegExp/"+this.a+"/"+this.b.flags},
fw(a){var s=this.b.exec(a)
if(s==null)return null
return new A.mj(s)},
$ilA:1,
$irr:1}
A.mj.prototype={
h(a,b){var s
A.H(b)
s=this.b
if(!(b<s.length))return A.e(s,b)
return s[b]}}
A.ck.prototype={
gU(a){return B.al},
d6(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
$iY:1,
$ick:1,
$ieW:1}
A.dO.prototype={
gfl(a){if(((a.$flags|0)&2)!==0)return new A.i1(a.buffer)
else return a.buffer},
eK(a,b,c,d){var s=A.aj(b,0,c,d,null)
throw A.b(s)},
cC(a,b,c,d){if(b>>>0!==b||b>c)this.eK(a,b,c,d)},
$iac:1}
A.i1.prototype={
d6(a,b,c){var s=A.oA(this.a,b,c)
s.$flags=3
return s},
$ieW:1}
A.dM.prototype={
gU(a){return B.am},
$iY:1,
$ikf:1}
A.ap.prototype={
gj(a){return a.length},
f2(a,b,c,d,e){var s,r,q=a.length
this.cC(a,b,q,"start")
this.cC(a,c,q,"end")
if(b>c)throw A.b(A.aj(b,0,c,null,null))
s=c-b
if(e<0)throw A.b(A.b6(e,null))
r=d.length
if(r-e<s)throw A.b(A.ai("Not enough elements"))
if(e!==0||r!==s)d=d.subarray(e,e+s)
a.set(d,b)},
$iL:1}
A.dN.prototype={
h(a,b){A.H(b)
A.bH(b,a,a.length)
return a[b]},
k(a,b,c){A.pr(c)
a.$flags&2&&A.aG(a)
A.bH(b,a,a.length)
a[b]=c},
$il:1,
$if:1,
$ip:1}
A.aV.prototype={
k(a,b,c){A.H(c)
a.$flags&2&&A.aG(a)
A.bH(b,a,a.length)
a[b]=c},
bE(a,b,c,d,e){t.fm.a(d)
a.$flags&2&&A.aG(a,5)
if(t.aj.b(d)){this.f2(a,b,c,d,e)
return}this.eb(a,b,c,d,e)},
$il:1,
$if:1,
$ip:1}
A.ft.prototype={
gU(a){return B.an},
$iY:1,
$ile:1}
A.fu.prototype={
gU(a){return B.ao},
$iY:1,
$ilf:1}
A.fv.prototype={
gU(a){return B.ap},
h(a,b){A.H(b)
A.bH(b,a,a.length)
return a[b]},
$iY:1,
$ilh:1}
A.fw.prototype={
gU(a){return B.aq},
h(a,b){A.H(b)
A.bH(b,a,a.length)
return a[b]},
$iY:1,
$ili:1}
A.fx.prototype={
gU(a){return B.ar},
h(a,b){A.H(b)
A.bH(b,a,a.length)
return a[b]},
$iY:1,
$ilj:1}
A.fy.prototype={
gU(a){return B.at},
h(a,b){A.H(b)
A.bH(b,a,a.length)
return a[b]},
$iY:1,
$ilL:1}
A.fz.prototype={
gU(a){return B.au},
h(a,b){A.H(b)
A.bH(b,a,a.length)
return a[b]},
$iY:1,
$ilM:1}
A.dP.prototype={
gU(a){return B.av},
gj(a){return a.length},
h(a,b){A.H(b)
A.bH(b,a,a.length)
return a[b]},
$iY:1,
$ilN:1}
A.dQ.prototype={
gU(a){return B.aw},
gj(a){return a.length},
h(a,b){A.H(b)
A.bH(b,a,a.length)
return a[b]},
$iY:1,
$ilO:1}
A.em.prototype={}
A.en.prototype={}
A.eo.prototype={}
A.ep.prototype={}
A.bc.prototype={
i(a){return A.mv(v.typeUniverse,this,a)},
H(a){return A.t3(v.typeUniverse,this,a)}}
A.hl.prototype={}
A.mt.prototype={
l(a){return A.aD(this.a,null)}}
A.hi.prototype={
l(a){return this.a}}
A.d5.prototype={$ibA:1}
A.lV.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:14}
A.lU.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:53}
A.lW.prototype={
$0(){this.a.$0()},
$S:15}
A.lX.prototype={
$0(){this.a.$0()},
$S:15}
A.ey.prototype={
ej(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(A.bo(new A.ms(this,b),0),a)
else throw A.b(A.N("`setTimeout()` not found."))},
ek(a,b){if(self.setTimeout!=null)this.b=self.setInterval(A.bo(new A.mr(this,a,Date.now(),b),0),a)
else throw A.b(A.N("Periodic timer."))},
aI(a){var s
if(self.setTimeout!=null){s=this.b
if(s==null)return
if(this.a)self.clearTimeout(s)
else self.clearInterval(s)
this.b=null}else throw A.b(A.N("Canceling a timer."))},
$icW:1}
A.ms.prototype={
$0(){var s=this.a
s.b=null
s.c=1
this.b.$0()},
$S:2}
A.mr.prototype={
$0(){var s,r=this,q=r.a,p=q.c+1,o=r.b
if(o>0){s=Date.now()-r.c
if(s>(p+1)*o)p=B.c.ef(s,o)}q.c=p
r.d.$1(q)},
$S:15}
A.h2.prototype={
b1(a,b){var s,r=this,q=r.$ti
q.i("1/?").a(b)
if(b==null)b=q.c.a(b)
if(!r.b)r.a.bb(b)
else{s=r.a
if(q.i("ad<1>").b(b))s.cA(b)
else s.cG(b)}},
c0(a,b){var s=this.a
if(this.b)s.aE(new A.az(a,b))
else s.bG(new A.az(a,b))}}
A.mD.prototype={
$1(a){return this.a.$2(0,a)},
$S:12}
A.mE.prototype={
$2(a,b){this.a.$2(1,new A.dv(a,t.l.a(b)))},
$S:50}
A.mN.prototype={
$2(a,b){this.a(A.H(a),b)},
$S:37}
A.ev.prototype={
gu(a){var s=this.b
return s==null?this.$ti.c.a(s):s},
eX(a,b){var s,r,q
a=A.H(a)
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
n.d=null}p=n.eX(l,m)
if(1===p)return!0
if(0===p){n.b=null
o=n.e
if(o==null||o.length===0){n.a=A.pa
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
n.a=A.pa
throw m
return!1}if(0>=o.length)return A.e(o,-1)
n.a=o.pop()
l=1
continue}throw A.b(A.ai("sync*"))}return!1},
hb(a){var s,r,q=this
if(a instanceof A.d4){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.b.m(r,q.a)
q.a=s
return 2}else{q.d=J.b4(a)
return 2}},
$iaa:1}
A.d4.prototype={
gC(a){return new A.ev(this.a(),this.$ti.i("ev<1>"))}}
A.az.prototype={
l(a){return A.h(this.a)},
$iZ:1,
gaR(){return this.b}}
A.d_.prototype={}
A.bF.prototype={
bQ(){},
bR(){},
sbd(a){this.ch=this.$ti.i("bF<1>?").a(a)},
sbS(a){this.CW=this.$ti.i("bF<1>?").a(a)}}
A.e7.prototype={
geM(){return this.c<4},
eT(a){var s,r
A.y(this).i("bF<1>").a(a)
s=a.CW
r=a.ch
if(s==null)this.d=r
else s.sbd(r)
if(r==null)this.e=s
else r.sbS(s)
a.sbS(a)
a.sbd(a)},
f6(a,b,c,d){var s,r,q,p,o,n,m,l=this,k=A.y(l)
k.i("~(1)?").a(a)
t.jE.a(c)
if((l.c&4)!==0){k=new A.d1($.O,k.i("d1<1>"))
A.q_(k.geN())
if(c!=null)k.c=t.M.a(c)
return k}s=$.O
r=d?1:0
q=b!=null?32:0
p=A.p_(s,a,k.c)
A.rG(s,b)
o=c==null?A.ue():c
t.M.a(o)
k=k.i("bF<1>")
n=new A.bF(l,p,s,r|q,k)
n.CW=n
n.ch=n
k.a(n)
n.ay=l.c&1
m=l.e
l.e=n
n.sbd(null)
n.sbS(m)
if(m==null)l.d=n
else m.sbd(n)
if(l.d==l.e)A.pI(l.a)
return n},
eR(a){var s=this,r=A.y(s)
a=r.i("bF<1>").a(r.i("bm<1>").a(a))
if(a.ch===a)return null
r=a.ay
if((r&2)!==0)a.ay=r|4
else{s.eT(a)
if((s.c&2)===0&&s.d==null)s.ev()}return null},
ep(){if((this.c&4)!==0)return new A.bz("Cannot add new events after calling close")
return new A.bz("Cannot add new events while doing an addStream")},
m(a,b){var s=this
A.y(s).c.a(b)
if(!s.geM())throw A.b(s.ep())
s.bV(b)},
ev(){if((this.c&4)!==0)if(null.gha())null.bb(null)
A.pI(this.b)},
$ioN:1,
$ip9:1,
$ic3:1}
A.e6.prototype={
bV(a){var s,r=this.$ti
r.c.a(a)
for(s=this.d,r=r.i("ea<1>");s!=null;s=s.ch)s.er(new A.ea(a,r))}}
A.lg.prototype={
$0(){var s,r,q,p,o,n,m=this,l=m.a
if(l==null){m.c.a(null)
m.b.aU(null)}else{s=null
try{s=l.$0()}catch(p){r=A.am(p)
q=A.c5(p)
l=r
o=q
n=A.nT(l,o)
l=new A.az(l,o)
m.b.aE(l)
return}m.b.aU(s)}},
$S:2}
A.h7.prototype={
c0(a,b){var s=this.a
if((s.a&30)!==0)throw A.b(A.ai("Future already completed"))
s.bG(A.tG(a,b))},
c_(a){return this.c0(a,null)}}
A.bE.prototype={
b1(a,b){var s,r=this.$ti
r.i("1/?").a(b)
s=this.a
if((s.a&30)!==0)throw A.b(A.ai("Future already completed"))
s.bb(r.i("1/").a(b))}}
A.bg.prototype={
fL(a){if((this.c&15)!==6)return!0
return this.b.b.ce(t.iW.a(this.d),a.a,t.y,t.K)},
fB(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.ng.b(q))p=l.h1(q,m,a.b,o,n,t.l)
else p=l.ce(t.v.a(q),m,o,n)
try{o=r.$ti.i("2/").a(p)
return o}catch(s){if(t.do.b(A.am(s))){if((r.c&1)!==0)throw A.b(A.b6("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.b(A.b6("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.W.prototype={
cg(a,b,c){var s,r,q,p=this.$ti
p.H(c).i("1/(2)").a(a)
s=$.O
if(s===B.h){if(b!=null&&!t.ng.b(b)&&!t.v.b(b))throw A.b(A.kc(b,"onError",u.c))}else{c.i("@<0/>").H(p.c).i("1(2)").a(a)
if(b!=null)b=A.pE(b,s)}r=new A.W(s,c.i("W<0>"))
q=b==null?1:3
this.aT(new A.bg(r,q,a,b,p.i("@<1>").H(c).i("bg<1,2>")))
return r},
cf(a,b){return this.cg(a,null,b)},
cW(a,b,c){var s,r=this.$ti
r.H(c).i("1/(2)").a(a)
s=new A.W($.O,c.i("W<0>"))
this.aT(new A.bg(s,19,a,b,r.i("@<1>").H(c).i("bg<1,2>")))
return s},
d8(a){var s=this.$ti,r=$.O,q=new A.W(r,s)
if(r!==B.h)a=A.pE(a,r)
this.aT(new A.bg(q,2,null,a,s.i("bg<1,1>")))
return q},
f1(a){this.a=this.a&1|16
this.c=a},
bc(a){this.a=a.a&30|this.a&1
this.c=a.c},
aT(a){var s,r=this,q=r.a
if(q<=3){a.a=t.e.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.aT(a)
return}r.bc(s)}A.db(null,null,r.b,t.M.a(new A.m3(r,a)))}},
cQ(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.e.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t._.a(m.c)
if((n.a&24)===0){n.cQ(a)
return}m.bc(n)}l.a=m.bg(a)
A.db(null,null,m.b,t.M.a(new A.m8(l,m)))}},
aX(){var s=t.e.a(this.c)
this.c=null
return this.bg(s)},
bg(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
aU(a){var s,r=this,q=r.$ti
q.i("1/").a(a)
if(q.i("ad<1>").b(a))A.m6(a,r,!0)
else{s=r.aX()
q.c.a(a)
r.a=8
r.c=a
A.cr(r,s)}},
cG(a){var s,r=this
r.$ti.c.a(a)
s=r.aX()
r.a=8
r.c=a
A.cr(r,s)},
eA(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aX()
q.bc(a)
A.cr(q,r)},
aE(a){var s=this.aX()
this.f1(a)
A.cr(this,s)},
ez(a,b){A.b2(a)
t.l.a(b)
this.aE(new A.az(a,b))},
bb(a){var s=this.$ti
s.i("1/").a(a)
if(s.i("ad<1>").b(a)){this.cA(a)
return}this.es(a)},
es(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.db(null,null,s.b,t.M.a(new A.m5(s,a)))},
cA(a){A.m6(this.$ti.i("ad<1>").a(a),this,!1)
return},
bG(a){this.a^=2
A.db(null,null,this.b,t.M.a(new A.m4(this,a)))},
$iad:1}
A.m3.prototype={
$0(){A.cr(this.a,this.b)},
$S:2}
A.m8.prototype={
$0(){A.cr(this.b,this.a.a)},
$S:2}
A.m7.prototype={
$0(){A.m6(this.a.a,this.b,!0)},
$S:2}
A.m5.prototype={
$0(){this.a.cG(this.b)},
$S:2}
A.m4.prototype={
$0(){this.a.aE(this.b)},
$S:2}
A.mb.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dz(t.mY.a(q.d),t.z)}catch(p){s=A.am(p)
r=A.c5(p)
if(k.c&&t.n.a(k.b.a.c).a===s){q=k.a
q.c=t.n.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.nj(q)
n=k.a
n.c=new A.az(q,o)
q=n}q.b=!0
return}if(j instanceof A.W&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.n.a(j.c)
q.b=!0}return}if(j instanceof A.W){m=k.b.a
l=new A.W(m.b,m.$ti)
j.cg(new A.mc(l,m),new A.md(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:2}
A.mc.prototype={
$1(a){this.a.eA(this.b)},
$S:14}
A.md.prototype={
$2(a,b){A.b2(a)
t.l.a(b)
this.a.aE(new A.az(a,b))},
$S:42}
A.ma.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.ce(o.i("2/(1)").a(p.d),m,o.i("2/"),n)}catch(l){s=A.am(l)
r=A.c5(l)
q=s
p=r
if(p==null)p=A.nj(q)
o=this.a
o.c=new A.az(q,p)
o.b=!0}},
$S:2}
A.m9.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.n.a(l.a.a.c)
p=l.b
if(p.a.fL(s)&&p.a.e!=null){p.c=p.a.fB(s)
p.b=!1}}catch(o){r=A.am(o)
q=A.c5(o)
p=t.n.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.nj(p)
m=l.b
m.c=new A.az(p,n)
p=m}p.b=!0}},
$S:2}
A.h3.prototype={}
A.bZ.prototype={
gj(a){var s={},r=new A.W($.O,t.hy)
s.a=0
this.bs(new A.lH(s,this),!0,new A.lI(s,r),r.gcF())
return r},
gaa(a){var s=new A.W($.O,A.y(this).i("W<1>")),r=this.bs(null,!0,new A.lF(s),s.gcF())
r.c9(new A.lG(this,r,s))
return s}}
A.lH.prototype={
$1(a){A.y(this.b).c.a(a);++this.a.a},
$S(){return A.y(this.b).i("~(1)")}}
A.lI.prototype={
$0(){this.b.aU(this.a.a)},
$S:2}
A.lF.prototype={
$0(){var s,r=A.oM(),q=new A.bz("No element")
A.nv(q,r)
s=A.nT(q,r)
s=new A.az(q,r)
this.a.aE(s)},
$S:2}
A.lG.prototype={
$1(a){A.tr(this.b,this.c,A.y(this.a).c.a(a))},
$S(){return A.y(this.a).i("~(1)")}}
A.e8.prototype={
gF(a){return(A.dW(this.a)^892482866)>>>0},
Z(a,b){if(b==null)return!1
if(this===b)return!0
return b instanceof A.d_&&b.a===this.a}}
A.e9.prototype={
cO(){return this.w.eR(this)},
bQ(){A.y(this.w).i("bm<1>").a(this)},
bR(){A.y(this.w).i("bm<1>").a(this)}}
A.d0.prototype={
c9(a){var s=A.y(this)
this.a=A.p_(this.d,s.i("~(1)?").a(a),s.c)},
aI(a){var s,r=this,q=r.e&=4294967279
if((q&8)===0){q=r.e=q|8
if((q&128)!==0){s=r.r
if(s.a===1)s.a=3}if((q&64)===0)r.r=null
r.f=r.cO()}q=$.nb()
return q},
bQ(){},
bR(){},
cO(){return null},
er(a){var s,r,q=this,p=q.r
if(p==null)p=q.r=new A.hE(A.y(q).i("hE<1>"))
s=p.c
if(s==null)p.b=p.c=a
else p.c=s.a=a
r=q.e
if((r&128)===0){r|=128
q.e=r
if(r<256)p.co(q)}},
bV(a){var s,r=this,q=A.y(r).c
q.a(a)
s=r.e
r.e=s|64
r.d.dB(r.a,a,q)
r.e&=4294967231
r.ew((s&4)!==0)},
ew(a){var s,r,q=this,p=q.e
if((p&128)!==0&&q.r.c==null){p=q.e=p&4294967167
s=!1
if((p&4)!==0)if(p<256){s=q.r
s=s==null?null:s.c==null
s=s!==!1}if(s){p&=4294967291
q.e=p}}for(;;a=r){if((p&8)!==0){q.r=null
return}r=(p&4)!==0
if(a===r)break
q.e=p^64
if(r)q.bQ()
else q.bR()
p=q.e&=4294967231}if((p&128)!==0&&p<256)q.r.co(q)},
$ibm:1,
$ic3:1}
A.d3.prototype={
bs(a,b,c,d){var s=this.$ti
s.i("~(1)?").a(a)
t.jE.a(c)
return this.a.f6(s.i("~(1)?").a(a),d,c,b===!0)},
fK(a){return this.bs(a,null,null,null)}}
A.eb.prototype={}
A.ea.prototype={}
A.hE.prototype={
co(a){var s,r=this
r.$ti.i("c3<1>").a(a)
s=r.a
if(s===1)return
if(s>=1){r.a=1
return}A.q_(new A.mk(r,a))
r.a=1}}
A.mk.prototype={
$0(){var s,r,q,p=this.a,o=p.a
p.a=0
if(o===3)return
s=p.$ti.i("c3<1>").a(this.b)
r=p.b
q=r.a
p.b=q
if(q==null)p.c=null
A.y(r).i("c3<1>").a(s).bV(r.b)},
$S:2}
A.d1.prototype={
c9(a){this.$ti.i("~(1)?").a(a)},
aI(a){this.a=-1
this.c=null
return $.nb()},
eO(){var s,r=this,q=r.a-1
if(q===0){r.a=-1
s=r.c
if(s!=null){r.c=null
r.b.dA(s)}}else r.a=q},
$ibm:1}
A.hP.prototype={}
A.mF.prototype={
$0(){return this.a.aU(this.b)},
$S:2}
A.eF.prototype={$ioY:1}
A.hH.prototype={
dA(a){var s,r,q
t.M.a(a)
try{if(B.h===$.O){a.$0()
return}A.pF(null,null,this,a,t.H)}catch(q){s=A.am(q)
r=A.c5(q)
A.id(A.b2(s),t.l.a(r))}},
dB(a,b,c){var s,r,q
c.i("~(0)").a(a)
c.a(b)
try{if(B.h===$.O){a.$1(b)
return}A.pG(null,null,this,a,b,t.H,c)}catch(q){s=A.am(q)
r=A.c5(q)
A.id(A.b2(s),t.l.a(r))}},
bY(a){return new A.mm(this,t.M.a(a))},
d7(a,b){return new A.mn(this,b.i("~(0)").a(a),b)},
h(a,b){return null},
dz(a,b){b.i("0()").a(a)
if($.O===B.h)return a.$0()
return A.pF(null,null,this,a,b)},
ce(a,b,c,d){c.i("@<0>").H(d).i("1(2)").a(a)
d.a(b)
if($.O===B.h)return a.$1(b)
return A.pG(null,null,this,a,b,c,d)},
h1(a,b,c,d,e,f){d.i("@<0>").H(e).H(f).i("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.O===B.h)return a.$2(b,c)
return A.u_(null,null,this,a,b,c,d,e,f)},
cc(a,b,c,d){return b.i("@<0>").H(c).H(d).i("1(2,3)").a(a)}}
A.mm.prototype={
$0(){return this.a.dA(this.b)},
$S:2}
A.mn.prototype={
$1(a){var s=this.c
return this.a.dB(this.b,s.a(a),s)},
$S(){return this.c.i("~(0)")}}
A.mM.prototype={
$0(){A.r4(this.a,this.b)},
$S:2}
A.ef.prototype={
gj(a){return this.a},
gD(a){return this.a===0},
gR(a){return this.a!==0},
gG(a){return new A.eg(this,this.$ti.i("eg<1>"))},
I(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
return s==null?!1:s[b]!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
return r==null?!1:r[b]!=null}else return this.eD(b)},
eD(a){var s=this.d
if(s==null)return!1
return this.ai(this.cI(s,a),a)>=0},
h(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.nD(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.nD(q,b)
return r}else return this.eG(0,b)},
eG(a,b){var s,r,q=this.d
if(q==null)return null
s=this.cI(q,b)
r=this.ai(s,b)
return r<0?null:s[r+1]},
k(a,b,c){var s,r,q,p,o,n=this,m=n.$ti
m.c.a(b)
m.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=n.b
n.ey(s==null?n.b=A.p1():s,b,c)}else{r=n.d
if(r==null)r=n.d=A.p1()
q=A.ij(b)&1073741823
p=r[q]
if(p==null){A.nE(r,q,[b,c]);++n.a
n.e=null}else{o=n.ai(p,b)
if(o>=0)p[o+1]=c
else{p.push(b,c);++n.a
n.e=null}}}},
B(a,b){var s
if(b!=="__proto__")return this.bf(this.b,b)
else{s=this.bT(0,b)
return s}},
bT(a,b){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=A.ij(b)&1073741823
r=n[s]
q=o.ai(r,b)
if(q<0)return null;--o.a
o.e=null
p=r.splice(q,2)[1]
if(0===r.length)delete n[s]
return p},
p(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.i("~(1,2)").a(b)
s=m.cH()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.h(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.b(A.a3(m))}},
cH(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
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
ey(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.nE(a,b,c)},
bf(a,b){var s
if(a!=null&&a[b]!=null){s=this.$ti.y[1].a(A.nD(a,b))
delete a[b];--this.a
this.e=null
return s}else return null},
cI(a,b){return a[A.ij(b)&1073741823]}}
A.ei.prototype={
ai(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.eg.prototype={
gj(a){return this.a.a},
gD(a){return this.a.a===0},
gR(a){return this.a.a!==0},
gC(a){var s=this.a
return new A.eh(s,s.cH(),this.$ti.i("eh<1>"))},
A(a,b){return this.a.I(0,b)}}
A.eh.prototype={
gu(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.b(A.a3(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iaa:1}
A.ct.prototype={
gC(a){var s=this,r=new A.cu(s,s.r,A.y(s).i("cu<1>"))
r.c=s.e
return r},
gj(a){return this.a},
gD(a){return this.a===0},
gR(a){return this.a!==0},
A(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.eC(b)},
eC(a){var s=this.d
if(s==null)return!1
return this.ai(s[this.bJ(a)],a)>=0},
m(a,b){var s,r,q=this
A.y(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.cD(s==null?q.b=A.nF():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.cD(r==null?q.c=A.nF():r,b)}else return q.en(0,b)},
en(a,b){var s,r,q,p=this
A.y(p).c.a(b)
s=p.d
if(s==null)s=p.d=A.nF()
r=p.bJ(b)
q=s[r]
if(q==null)s[r]=[p.bI(b)]
else{if(p.ai(q,b)>=0)return!1
q.push(p.bI(b))}return!0},
B(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bf(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bf(s.c,b)
else return s.bT(0,b)},
bT(a,b){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.bJ(b)
r=n[s]
q=o.ai(r,b)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.d_(p)
return!0},
cD(a,b){A.y(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.bI(b)
return!0},
bf(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.d_(s)
delete a[b]
return!0},
cE(){this.r=this.r+1&1073741823},
bI(a){var s,r=this,q=new A.hu(A.y(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.cE()
return q},
d_(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.cE()},
bJ(a){return J.cC(a)&1073741823},
ai(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.n(a[r].a,b))return r
return-1}}
A.hu.prototype={}
A.cu.prototype={
gu(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
q(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.b(A.a3(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.i("1?").a(r.a)
s.c=r.b
return!0}},
$iaa:1}
A.e3.prototype={
gj(a){return this.a.length},
h(a,b){var s
A.H(b)
s=this.a
if(!(b>=0&&b<s.length))return A.e(s,b)
return s[b]}}
A.lp.prototype={
$2(a,b){this.a.k(0,this.b.a(a),this.c.a(b))},
$S:32}
A.k.prototype={
gC(a){return new A.bw(a,this.gj(a),A.as(a).i("bw<k.E>"))},
v(a,b){return this.h(a,b)},
p(a,b){var s,r
A.as(a).i("~(k.E)").a(b)
s=this.gj(a)
for(r=0;r<s;++r){b.$1(this.h(a,r))
if(s!==this.gj(a))throw A.b(A.a3(a))}},
gD(a){return this.gj(a)===0},
gR(a){return!this.gD(a)},
A(a,b){var s,r=this.gj(a)
for(s=0;s<r;++s){if(J.n(this.h(a,s),b))return!0
if(r!==this.gj(a))throw A.b(A.a3(a))}return!1},
dG(a,b){return new A.co(a,b.i("co<0>"))},
am(a,b,c){var s=A.as(a)
return new A.a_(a,s.H(c).i("1(k.E)").a(b),s.i("@<k.E>").H(c).i("a_<1,2>"))},
aB(a,b){var s,r,q,p,o=this
if(o.gD(a)){s=J.np(0,A.as(a).i("k.E"))
return s}r=o.h(a,0)
q=A.dK(o.gj(a),r,!0,A.as(a).i("k.E"))
for(p=1;p<o.gj(a);++p)B.b.k(q,p,o.h(a,p))
return q},
an(a){return this.aB(a,!0)},
fv(a,b,c,d){var s
A.as(a).i("k.E?").a(d)
A.cR(b,c,this.gj(a))
for(s=b;s<c;++s)this.k(a,s,d)},
bE(a,b,c,d,e){var s,r,q
A.as(a).i("f<k.E>").a(d)
A.cR(b,c,this.gj(a))
s=c-b
if(s===0)return
A.dZ(e,"skipCount")
r=J.D(d)
if(e+s>r.gj(d))throw A.b(A.ai("Too few elements"))
if(e<b)for(q=s-1;q>=0;--q)this.k(a,b+q,r.h(d,e+q))
else for(q=0;q<s;++q)this.k(a,b+q,r.h(d,e+q))},
l(a){return A.no(a,"[","]")},
$il:1,
$if:1,
$ip:1}
A.B.prototype={
p(a,b){var s,r,q,p=A.as(a)
p.i("~(B.K,B.V)").a(b)
for(s=J.b4(this.gG(a)),p=p.i("B.V");s.q();){r=s.gu(s)
q=this.h(a,r)
b.$2(r,q==null?p.a(q):q)}},
gau(a){return J.di(this.gG(a),new A.lq(a),A.as(a).i("al<B.K,B.V>"))},
I(a,b){return J.ng(this.gG(a),b)},
gj(a){return J.ag(this.gG(a))},
gD(a){return J.im(this.gG(a))},
gR(a){return J.ni(this.gG(a))},
l(a){return A.nt(a)},
$iu:1}
A.lq.prototype={
$1(a){var s=this.a,r=A.as(s)
r.i("B.K").a(a)
s=J.m(s,a)
if(s==null)s=r.i("B.V").a(s)
return new A.al(a,s,r.i("al<B.K,B.V>"))},
$S(){return A.as(this.a).i("al<B.K,B.V>(B.K)")}}
A.lr.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.h(a)
r.a=(r.a+=s)+": "
s=A.h(b)
r.a+=s},
$S:31}
A.cY.prototype={}
A.ax.prototype={
k(a,b,c){var s=A.y(this)
s.i("ax.K").a(b)
s.i("ax.V").a(c)
throw A.b(A.N("Cannot modify unmodifiable map"))},
B(a,b){throw A.b(A.N("Cannot modify unmodifiable map"))}}
A.cO.prototype={
h(a,b){return J.m(this.a,b)},
k(a,b,c){var s=A.y(this)
J.bi(this.a,s.c.a(b),s.y[1].a(c))},
I(a,b){return J.nh(this.a,b)},
p(a,b){J.eM(this.a,A.y(this).i("~(1,2)").a(b))},
gD(a){return J.im(this.a)},
gR(a){return J.ni(this.a)},
gj(a){return J.ag(this.a)},
gG(a){return J.qE(this.a)},
B(a,b){return J.qL(this.a,b)},
l(a){return J.M(this.a)},
gau(a){return J.qD(this.a)},
$iu:1}
A.c1.prototype={}
A.aq.prototype={
gD(a){return this.gj(this)===0},
gR(a){return this.gj(this)!==0},
S(a,b){var s
for(s=J.b4(A.y(this).i("f<aq.E>").a(b));s.q();)this.m(0,s.gu(s))},
bu(a){var s
for(s=0;s<5;++s)this.B(0,a[s])},
am(a,b,c){var s=A.y(this)
return new A.bs(this,s.H(c).i("1(aq.E)").a(b),s.i("@<aq.E>").H(c).i("bs<1,2>"))},
l(a){return A.no(this,"{","}")},
Y(a,b){var s,r,q,p,o=this.gC(this)
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
s=this.gC(this)
for(r=b;s.q();){if(r===0){q=s.d
return q==null?s.$ti.c.a(q):q}--r}throw A.b(A.a4(b,b-r,this,null,"index"))},
$il:1,
$if:1,
$ib_:1}
A.eq.prototype={}
A.d6.prototype={}
A.hq.prototype={
h(a,b){var s,r=this.b
if(r==null)return this.c.h(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.eP(b):s}},
gj(a){return this.b==null?this.c.a:this.aV().length},
gD(a){return this.gj(0)===0},
gR(a){return this.gj(0)>0},
gG(a){var s
if(this.b==null){s=this.c
return new A.ch(s,A.y(s).i("ch<1>"))}return new A.hr(this)},
k(a,b,c){var s,r,q=this
if(q.b==null)q.c.k(0,b,c)
else if(q.I(0,b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.d2().k(0,b,c)},
I(a,b){if(this.b==null)return this.c.I(0,b)
return Object.prototype.hasOwnProperty.call(this.a,b)},
B(a,b){if(this.b!=null&&!this.I(0,b))return null
return this.d2().B(0,b)},
p(a,b){var s,r,q,p,o=this
t.u.a(b)
if(o.b==null)return o.c.p(0,b)
s=o.aV()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.mH(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.b(A.a3(o))}},
aV(){var s=t.lH.a(this.c)
if(s==null)s=this.c=A.A(Object.keys(this.a),t.s)
return s},
d2(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.an(t.N,t.z)
r=n.aV()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.k(0,o,n.h(0,o))}if(p===0)B.b.m(r,"")
else B.b.aJ(r)
n.a=n.b=null
return n.c=s},
eP(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.mH(this.a[a])
return this.b[a]=s}}
A.hr.prototype={
gj(a){return this.a.gj(0)},
v(a,b){var s=this.a
if(s.b==null)s=s.gG(0).v(0,b)
else{s=s.aV()
if(!(b>=0&&b<s.length))return A.e(s,b)
s=s[b]}return s},
gC(a){var s=this.a
if(s.b==null){s=s.gG(0)
s=s.gC(s)}else{s=s.aV()
s=new J.b7(s,s.length,A.G(s).i("b7<1>"))}return s},
A(a,b){return this.a.I(0,b)}}
A.my.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:22}
A.mx.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:22}
A.dk.prototype={
dq(a3,a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a1="Invalid base64 encoding length ",a2=a4.length
a6=A.cR(a5,a6,a2)
s=$.o5()
for(r=s.length,q=a5,p=q,o=null,n=-1,m=-1,l=0;q<a6;q=k){k=q+1
if(!(q<a2))return A.e(a4,q)
j=a4.charCodeAt(q)
if(j===37){i=k+2
if(i<=a6){if(!(k<a2))return A.e(a4,k)
h=A.mV(a4.charCodeAt(k))
g=k+1
if(!(g<a2))return A.e(a4,g)
f=A.mV(a4.charCodeAt(g))
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
if(j===61)continue}j=e}if(d!==-2){if(o==null){o=new A.ar("")
g=o}else g=o
g.a+=B.a.n(a4,p,q)
c=A.a7(j)
g.a+=c
p=k
continue}}throw A.b(A.a1("Invalid base64 data",a4,q))}if(o!=null){a2=B.a.n(a4,p,a6)
a2=o.a+=a2
r=a2.length
if(n>=0)A.oe(a4,m,a6,n,l,r)
else{b=B.c.ap(r-1,4)+1
if(b===1)throw A.b(A.a1(a1,a4,a6))
while(b<4){a2+="="
o.a=a2;++b}}a2=o.a
return B.a.az(a4,a5,a6,a2.charCodeAt(0)==0?a2:a2)}a=a6-a5
if(n>=0)A.oe(a4,m,a6,n,l,a)
else{b=B.c.ap(a,4)
if(b===1)throw A.b(A.a1(a1,a4,a6))
if(b>1)a4=B.a.az(a4,a6,a6,b===2?"==":"=")}return a4},
dn(a,b){return this.dq(0,b,0,null)}}
A.eV.prototype={}
A.ke.prototype={
bl(a){var s,r,q,p=A.cR(0,null,a.length)
if(0===p)return new Uint8Array(0)
s=new A.lY()
r=s.fp(0,a,0,p)
r.toString
q=s.a
if(q<-1)A.bM(A.a1("Missing padding character",a,p))
if(q>0)A.bM(A.a1("Invalid length, must be multiple of four",a,p))
s.a=-1
return r}}
A.lY.prototype={
fp(a,b,c,d){var s,r=this,q=r.a
if(q<0){r.a=A.oZ(b,c,d,q)
return null}if(c===d)return new Uint8Array(0)
s=A.rD(b,c,d,q)
r.a=A.rF(b,c,d,s,0,r.a)
return s}}
A.c9.prototype={}
A.f0.prototype={}
A.f9.prototype={}
A.dE.prototype={
l(a){var s=A.bt(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.fm.prototype={
l(a){return"Cyclic error in JSON stringify"}}
A.fl.prototype={
L(a,b){var s=A.tX(b,this.gfs().a)
return s},
T(a){var s=A.rM(a,this.gft().b,null)
return s},
gft(){return B.ab},
gfs(){return B.aa}}
A.ln.prototype={}
A.lm.prototype={}
A.mh.prototype={
dI(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.a.n(a,r,q)
r=q+1
o=A.a7(92)
s.a+=o
o=A.a7(117)
s.a+=o
o=A.a7(100)
s.a+=o
o=p>>>8&15
o=A.a7(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.a7(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.a7(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.a.n(a,r,q)
r=q+1
o=A.a7(92)
s.a+=o
switch(p){case 8:o=A.a7(98)
s.a+=o
break
case 9:o=A.a7(116)
s.a+=o
break
case 10:o=A.a7(110)
s.a+=o
break
case 12:o=A.a7(102)
s.a+=o
break
case 13:o=A.a7(114)
s.a+=o
break
default:o=A.a7(117)
s.a+=o
o=A.a7(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.a7(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.a7(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.a.n(a,r,q)
r=q+1
o=A.a7(92)
s.a+=o
o=A.a7(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.a.n(a,r,m)},
bH(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.b(new A.fm(a,null))}B.b.m(s,a)},
bB(a){var s,r,q,p,o=this
if(o.dH(a))return
o.bH(a)
try{s=o.b.$1(a)
if(!o.dH(s)){q=A.ot(a,null,o.gcP())
throw A.b(q)}q=o.a
if(0>=q.length)return A.e(q,-1)
q.pop()}catch(p){r=A.am(p)
q=A.ot(a,r,o.gcP())
throw A.b(q)}},
dH(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.d.l(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.dI(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.bH(a)
q.h5(a)
s=q.a
if(0>=s.length)return A.e(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.bH(a)
r=q.h6(a)
s=q.a
if(0>=s.length)return A.e(s,-1)
s.pop()
return r}else return!1},
h5(a){var s,r,q=this.c
q.a+="["
s=J.D(a)
if(s.gR(a)){this.bB(s.h(a,0))
for(r=1;r<s.gj(a);++r){q.a+=","
this.bB(s.h(a,r))}}q.a+="]"},
h6(a){var s,r,q,p,o,n=this,m={},l=J.D(a)
if(l.gD(a)){n.c.a+="{}"
return!0}s=l.gj(a)*2
r=A.dK(s,null,!1,t.X)
q=m.a=0
m.b=!0
l.p(a,new A.mi(m,r))
if(!m.b)return!1
l=n.c
l.a+="{"
for(p='"';q<s;q+=2,p=',"'){l.a+=p
n.dI(A.w(r[q]))
l.a+='":'
o=q+1
if(!(o<s))return A.e(r,o)
n.bB(r[o])}l.a+="}"
return!0}}
A.mi.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.b.k(s,r.a++,a)
B.b.k(s,r.a++,b)},
$S:31}
A.mg.prototype={
gcP(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.h0.prototype={
L(a,b){t.L.a(b)
return B.ax.bl(b)}}
A.lS.prototype={
bl(a){return new A.mw(this.a).eE(t.L.a(a),0,null,!0)}}
A.mw.prototype={
eE(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(a)
s=A.cR(b,c,J.ag(a))
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.ti(a,b,s)
s-=b
p=b
b=0}if(s-b>=15){o=l.a
n=A.th(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.bK(q,b,s,!0)
o=l.b
if((o&1)!==0){m=A.tj(o)
l.b=0
throw A.b(A.a1(m,a,p+l.c))}return n},
bK(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.c.ae(b+c,2)
r=q.bK(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.bK(a,s,c,d)}return q.fq(a,b,c,d)},
fq(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.ar(""),d=b+1,c=a.length
if(!(b>=0&&b<c))return A.e(a,b)
s=a[b]
A:for(r=k.a;;){for(;;d=o){if(!(s>=0&&s<256))return A.e(j,s)
q=j.charCodeAt(s)&31
f=g<=32?s&61694>>>q:(s&63|f<<6)>>>0
p=g+q
if(!(p>=0&&p<144))return A.e(i,p)
g=i.charCodeAt(p)
if(g===0){p=A.a7(f)
e.a+=p
if(d===a0)break A
break}else if((g&1)!==0){if(r)switch(g){case 69:case 67:p=A.a7(h)
e.a+=p
break
case 65:p=A.a7(h)
e.a+=p;--d
break
default:p=A.a7(h)
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
p=A.a7(a[l])
e.a+=p}else{p=A.oP(a,d,n)
e.a+=p}if(n===a0)break A
d=o}else d=o}if(a1&&g>32)if(r){c=A.a7(h)
e.a+=c}else{k.b=77
k.c=a0
return""}k.b=g
k.c=f
c=e.a
return c.charCodeAt(0)==0?c:c}}
A.lu.prototype={
$2(a,b){var s,r,q
t.bR.a(a)
s=this.b
r=this.a
q=(s.a+=r.a)+a.a
s.a=q
s.a=q+": "
q=A.bt(b)
s.a+=q
r.a=", "},
$S:61}
A.l6.prototype={
$0(){var s=this
return A.bM(A.b6("("+s.a+", "+s.b+", "+s.c+", "+s.d+", "+s.e+", "+s.f+", "+s.r+", "+s.w+")",null))},
$S:62}
A.a9.prototype={
Z(a,b){if(b==null)return!1
return b instanceof A.a9&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gF(a){return A.nu(this.a,this.b,B.n,B.n)},
a1(a,b){var s
t.cs.a(b)
s=B.c.a1(this.a,b.a)
if(s!==0)return s
return B.c.a1(this.b,b.b)},
bx(){var s=this
if(s.c)return new A.a9(s.a,s.b,!1)
return s},
a4(){var s=this
if(s.c)return s
return new A.a9(s.a,s.b,!0)},
l(a){var s=this,r=A.om(A.by(s)),q=A.bq(A.cl(s)),p=A.bq(A.dV(s)),o=A.bq(A.bX(s)),n=A.bq(A.cP(s)),m=A.bq(A.oG(s)),l=A.l7(A.oF(s)),k=s.b,j=k===0?"":A.l7(k)
k=r+"-"+q
if(s.c)return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j},
a0(){var s=this,r=A.by(s)>=-9999&&A.by(s)<=9999?A.om(A.by(s)):A.r_(A.by(s)),q=A.bq(A.cl(s)),p=A.bq(A.dV(s)),o=A.bq(A.bX(s)),n=A.bq(A.cP(s)),m=A.bq(A.oG(s)),l=A.l7(A.oF(s)),k=s.b,j=k===0?"":A.l7(k)
k=r+"-"+q
if(s.c)return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j}}
A.l8.prototype={
$1(a){if(a==null)return 0
return A.eK(a)},
$S:36}
A.l9.prototype={
$1(a){var s,r,q
if(a==null)return 0
for(s=a.length,r=0,q=0;q<6;++q){r*=10
if(q<s){if(!(q<s))return A.e(a,q)
r+=a.charCodeAt(q)^48}}return r},
$S:36}
A.br.prototype={
aC(a,b){return new A.br(B.c.aA(this.a*b))},
b7(a,b){return B.c.b7(this.a,t.jS.a(b).gh9())},
Z(a,b){if(b==null)return!1
return b instanceof A.br&&this.a===b.a},
gF(a){return B.c.gF(this.a)},
l(a){var s,r,q,p,o,n=this.a,m=B.c.ae(n,36e8),l=n%36e8
if(n<0){m=0-m
n=0-l
s="-"}else{n=l
s=""}r=B.c.ae(n,6e7)
n%=6e7
q=r<10?"0":""
p=B.c.ae(n,1e6)
o=p<10?"0":""
return s+m+":"+q+r+":"+o+p+"."+B.a.a_(B.c.l(n%1e6),6,"0")}}
A.Z.prototype={
gaR(){return A.rn(this)}}
A.eP.prototype={
l(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.bt(s)
return"Assertion failed"}}
A.bA.prototype={}
A.b5.prototype={
gbM(){return"Invalid argument"+(!this.a?"(s)":"")},
gbL(){return""},
l(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.h(p),n=s.gbM()+q+o
if(!s.a)return n
return n+s.gbL()+": "+A.bt(s.gc7())},
gc7(){return this.b}}
A.cQ.prototype={
gc7(){return A.mC(this.b)},
gbM(){return"RangeError"},
gbL(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.h(q):""
else if(q==null)s=": Not greater than or equal to "+A.h(r)
else if(q>r)s=": Not in inclusive range "+A.h(r)+".."+A.h(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.h(r)
return s}}
A.fd.prototype={
gc7(){return A.H(this.b)},
gbM(){return"RangeError"},
gbL(){if(A.H(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gj(a){return this.f}}
A.fA.prototype={
l(a){var s,r,q,p,o,n,m,l,k=this,j={},i=new A.ar("")
j.a=""
s=k.c
for(r=s.length,q=0,p="",o="";q<r;++q,o=", "){n=s[q]
i.a=p+o
p=A.bt(n)
p=i.a+=p
j.a=", "}k.d.p(0,new A.lu(j,i))
m=A.bt(k.a)
l=i.l(0)
return"NoSuchMethodError: method not found: '"+k.b.a+"'\nReceiver: "+m+"\nArguments: ["+l+"]"}}
A.e4.prototype={
l(a){return"Unsupported operation: "+this.a}}
A.fW.prototype={
l(a){var s=this.a
return s!=null?"UnimplementedError: "+s:"UnimplementedError"}}
A.bz.prototype={
l(a){return"Bad state: "+this.a}}
A.f_.prototype={
l(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.bt(s)+"."}}
A.fD.prototype={
l(a){return"Out of Memory"},
gaR(){return null},
$iZ:1}
A.e_.prototype={
l(a){return"Stack Overflow"},
gaR(){return null},
$iZ:1}
A.m2.prototype={
l(a){return"Exception: "+this.a}}
A.bk.prototype={
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
k=""}return g+l+B.a.n(e,i,j)+k+"\n"+B.a.aC(" ",f-i+l.length)+"^\n"}else return f!=null?g+(" (at offset "+A.h(f)+")"):g}}
A.f.prototype={
am(a,b,c){var s=A.y(this)
return A.rd(this,s.H(c).i("1(f.E)").a(b),s.i("f.E"),c)},
bA(a,b){var s=A.y(this)
return new A.J(this,s.i("I(f.E)").a(b),s.i("J<f.E>"))},
A(a,b){var s
for(s=this.gC(this);s.q();)if(J.n(s.gu(s),b))return!0
return!1},
a8(a,b){var s
A.y(this).i("I(f.E)").a(b)
for(s=this.gC(this);s.q();)if(b.$1(s.gu(s)))return!0
return!1},
aB(a,b){var s=A.ab(this,A.y(this).i("f.E"))
return s},
an(a){return this.aB(0,!0)},
gj(a){var s,r=this.gC(this)
for(s=0;r.q();)++s
return s},
gD(a){return!this.gC(this).q()},
gR(a){return!this.gD(this)},
gaD(a){var s,r=this.gC(this)
if(!r.q())throw A.b(A.fe())
s=r.gu(r)
if(r.q())throw A.b(A.r6())
return s},
v(a,b){var s,r
A.dZ(b,"index")
s=this.gC(this)
for(r=b;s.q();){if(r===0)return s.gu(s);--r}throw A.b(A.a4(b,b-r,this,null,"index"))},
l(a){return A.r7(this,"(",")")}}
A.al.prototype={
l(a){return"MapEntry("+A.h(this.a)+": "+A.h(this.b)+")"}}
A.a6.prototype={
gF(a){return A.F.prototype.gF.call(this,0)},
l(a){return"null"}}
A.F.prototype={$iF:1,
Z(a,b){return this===b},
gF(a){return A.dW(this)},
l(a){return"Instance of '"+A.dX(this)+"'"},
dm(a,b){throw A.b(A.oB(this,t.bg.a(b)))},
gU(a){return A.un(this)},
toString(){return this.l(this)}}
A.hS.prototype={
l(a){return""},
$ibd:1}
A.ar.prototype={
gj(a){return this.a.length},
l(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$irt:1}
A.lR.prototype={
$2(a,b){var s,r,q,p
t.J.a(a)
A.w(b)
s=B.a.dh(b,"=")
if(s===-1){if(b!=="")J.bi(a,A.nM(b,0,b.length,this.a,!0),"")}else if(s!==0){r=B.a.n(b,0,s)
q=B.a.X(b,s+1)
p=this.a
J.bi(a,A.nM(r,0,r.length,p,!0),A.nM(q,0,q.length,p,!0))}return a},
$S:64}
A.lQ.prototype={
$2(a,b){throw A.b(A.a1("Illegal IPv6 address, "+a,this.a,b))},
$S:68}
A.eC.prototype={
gcV(){var s,r,q,p,o=this,n=o.w
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
gF(a){var s,r=this,q=r.y
if(q===$){s=B.a.gF(r.gcV())
r.y!==$&&A.q1()
r.y=s
q=s}return q},
gaw(){var s,r=this,q=r.z
if(q===$){s=r.f
s=A.oX(s==null?"":s)
r.z!==$&&A.q1()
q=r.z=new A.c1(s,t.ph)}return q},
gcj(){return this.b},
gbp(a){var s=this.c
if(s==null)return""
if(B.a.M(s,"[")&&!B.a.P(s,"v",1))return B.a.n(s,1,s.length-1)
return s},
gb3(a){var s=this.d
return s==null?A.pg(this.a):s},
gaL(a){var s=this.f
return s==null?"":s},
gbm(){var s=this.r
return s==null?"":s},
fH(a){var s=this.a
if(a.length!==s.length)return!1
return A.ts(a,s,0)>=0},
du(a,b){var s,r,q,p,o,n,m,l=this
b=A.nK(b,0,b.length)
s=b==="file"
r=l.b
q=l.d
if(b!==l.a)q=A.nJ(q,b)
p=l.c
if(!(p!=null))p=r.length!==0||q!=null||s?"":null
o=l.e
if(!s)n=p!=null&&o.length!==0
else n=!0
if(n&&!B.a.M(o,"/"))o="/"+o
m=o
return A.i2(b,r,p,q,m,l.f,l.r)},
cM(a,b){var s,r,q,p,o,n,m,l,k
for(s=0,r=0;B.a.P(b,"../",r);){r+=3;++s}q=B.a.fJ(a,"/")
p=a.length
for(;;){if(!(q>0&&s>0))break
o=B.a.dk(a,"/",q-1)
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
q=o}return B.a.az(a,q+1,null,B.a.X(b,r-3*s))},
dw(a){return this.b5(A.cn(a))},
b5(a){var s,r,q,p,o,n,m,l,k,j,i,h=this
if(a.gaQ().length!==0)return a
else{s=h.a
if(a.gc2()){r=a.du(0,s)
return r}else{q=h.b
p=h.c
o=h.d
n=h.e
if(a.gdg())m=a.gbo()?a.gaL(a):h.f
else{l=A.tg(h,n)
if(l>0){k=B.a.n(n,0,l)
n=a.gc1()?k+A.d8(a.gad(a)):k+A.d8(h.cM(B.a.X(n,k.length),a.gad(a)))}else if(a.gc1())n=A.d8(a.gad(a))
else if(n.length===0)if(p==null)n=s.length===0?a.gad(a):A.d8(a.gad(a))
else n=A.d8("/"+a.gad(a))
else{j=h.cM(n,a.gad(a))
r=s.length===0
if(!r||p!=null||B.a.M(n,"/"))n=A.d8(j)
else n=A.pl(j,!r||p!=null)}m=a.gbo()?a.gaL(a):null}}}i=a.gc4()?a.gbm():null
return A.i2(s,q,p,o,n,m,i)},
gc2(){return this.c!=null},
gbo(){return this.f!=null},
gc4(){return this.r!=null},
gdg(){return this.e.length===0},
gc1(){return B.a.M(this.e,"/")},
gcb(a){var s,r,q=this,p=q.a
if(p==="")throw A.b(A.ai("Cannot use origin without a scheme: "+q.l(0)))
if(p!=="http"&&p!=="https")throw A.b(A.ai("Origin is only applicable schemes http and https: "+q.l(0)))
s=q.c
if(s==null||s==="")throw A.b(A.ai("A "+p+u.p+q.l(0)))
r=q.d
if(r==null)return p+"://"+s
return p+"://"+s+":"+A.h(r)},
l(a){return this.gcV()},
Z(a,b){var s,r,q,p=this
if(b==null)return!1
if(p===b)return!0
s=!1
if(t.jJ.b(b))if(p.a===b.gaQ())if(p.c!=null===b.gc2())if(p.b===b.gcj())if(p.gbp(0)===b.gbp(b))if(p.gb3(0)===b.gb3(b))if(p.e===b.gad(b)){r=p.f
q=r==null
if(!q===b.gbo()){if(q)r=""
if(r===b.gaL(b)){r=p.r
q=r==null
if(!q===b.gc4()){s=q?"":r
s=s===b.gbm()}}}}return s},
$ifY:1,
gaQ(){return this.a},
gad(a){return this.e}}
A.lP.prototype={
gdF(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.e(m,0)
s=o.a
m=m[0]+1
r=B.a.bq(s,"?",m)
q=s.length
if(r>=0){p=A.eD(s,r+1,q,256,!1,!1)
q=r}else p=n
m=o.c=new A.hc("data","",n,n,A.eD(s,m,q,128,!1,!1),p,n)}return m},
l(a){var s,r=this.b
if(0>=r.length)return A.e(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.b0.prototype={
gc2(){return this.c>0},
gc5(){return this.c>0&&this.d+1<this.e},
gbo(){return this.f<this.r},
gc4(){return this.r<this.a.length},
gc1(){return B.a.P(this.a,"/",this.e)},
gdg(){return this.e===this.f},
gaQ(){var s=this.w
return s==null?this.w=this.eB():s},
eB(){var s,r=this,q=r.b
if(q<=0)return""
s=q===4
if(s&&B.a.M(r.a,"http"))return"http"
if(q===5&&B.a.M(r.a,"https"))return"https"
if(s&&B.a.M(r.a,"file"))return"file"
if(q===7&&B.a.M(r.a,"package"))return"package"
return B.a.n(r.a,0,q)},
gcj(){var s=this.c,r=this.b+3
return s>r?B.a.n(this.a,r,s-1):""},
gbp(a){var s=this.c
return s>0?B.a.n(this.a,s,this.d):""},
gb3(a){var s,r=this
if(r.gc5())return A.eK(B.a.n(r.a,r.d+1,r.e))
s=r.b
if(s===4&&B.a.M(r.a,"http"))return 80
if(s===5&&B.a.M(r.a,"https"))return 443
return 0},
gad(a){return B.a.n(this.a,this.e,this.f)},
gaL(a){var s=this.f,r=this.r
return s<r?B.a.n(this.a,s+1,r):""},
gbm(){var s=this.r,r=this.a
return s<r.length?B.a.X(r,s+1):""},
gcb(a){var s,r,q=this,p=q.b,o=p===4&&B.a.M(q.a,"http")
if(p<0)throw A.b(A.ai("Cannot use origin without a scheme: "+q.l(0)))
if(!o)s=!(p===5&&B.a.M(q.a,"https"))
else s=!1
if(s)throw A.b(A.ai("Origin is only applicable to schemes http and https: "+q.l(0)))
s=q.c
if(s===q.d)throw A.b(A.ai("A "+q.gaQ()+u.p+q.l(0)))
p+=3
if(s===p)return B.a.n(q.a,0,q.e)
r=q.a
return B.a.n(r,0,p)+B.a.n(r,s,q.e)},
gaw(){if(this.f>=this.r)return B.ag
return new A.c1(A.oX(this.gaL(0)),t.ph)},
cK(a){var s=this.d+1
return s+a.length===this.e&&B.a.P(this.a,a,s)},
fX(){var s=this,r=s.r,q=s.a
if(r>=q.length)return s
return new A.b0(B.a.n(q,0,r),s.b,s.c,s.d,s.e,s.f,r,s.w)},
du(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=null
b=A.nK(b,0,b.length)
s=!(h.b===b.length&&B.a.M(h.a,b))
r=b==="file"
q=h.c
p=q>0?B.a.n(h.a,h.b+3,q):""
o=h.gc5()?h.gb3(0):g
if(s)o=A.nJ(o,b)
q=h.c
if(q>0)n=B.a.n(h.a,q,h.d)
else n=p.length!==0||o!=null||r?"":g
q=h.a
m=h.f
l=B.a.n(q,h.e,m)
if(!r)k=n!=null&&l.length!==0
else k=!0
if(k&&!B.a.M(l,"/"))l="/"+l
k=h.r
j=m<k?B.a.n(q,m+1,k):g
m=h.r
i=m<q.length?B.a.X(q,m+1):g
return A.i2(b,p,n,o,l,j,i)},
dw(a){return this.b5(A.cn(a))},
b5(a){if(a instanceof A.b0)return this.f4(this,a)
return this.cY().b5(a)},
f4(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=b.b
if(c>0)return b
s=b.c
if(s>0){r=a.b
if(r<=0)return b
q=r===4
if(q&&B.a.M(a.a,"file"))p=b.e!==b.f
else if(q&&B.a.M(a.a,"http"))p=!b.cK("80")
else p=!(r===5&&B.a.M(a.a,"https"))||!b.cK("443")
if(p){o=r+1
return new A.b0(B.a.n(a.a,0,o)+B.a.X(b.a,c+1),r,s+o,b.d+o,b.e+o,b.f+o,b.r+o,a.w)}else return this.cY().b5(b)}n=b.e
c=b.f
if(n===c){s=b.r
if(c<s){r=a.f
o=r-c
return new A.b0(B.a.n(a.a,0,r)+B.a.X(b.a,c),a.b,a.c,a.d,a.e,c+o,s+o,a.w)}c=b.a
if(s<c.length){r=a.r
return new A.b0(B.a.n(a.a,0,r)+B.a.X(c,s),a.b,a.c,a.d,a.e,a.f,s+(r-s),a.w)}return a.fX()}s=b.a
if(B.a.P(s,"/",n)){m=a.e
l=A.p8(this)
k=l>0?l:m
o=k-n
return new A.b0(B.a.n(a.a,0,k)+B.a.X(s,n),a.b,a.c,a.d,m,c+o,b.r+o,a.w)}j=a.e
i=a.f
if(j===i&&a.c>0){while(B.a.P(s,"../",n))n+=3
o=j-n+1
return new A.b0(B.a.n(a.a,0,j)+"/"+B.a.X(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)}h=a.a
l=A.p8(this)
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
return new A.b0(B.a.n(h,0,i)+d+B.a.X(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)},
gF(a){var s=this.x
return s==null?this.x=B.a.gF(this.a):s},
Z(a,b){if(b==null)return!1
if(this===b)return!0
return t.jJ.b(b)&&this.a===b.l(0)},
cY(){var s=this,r=null,q=s.gaQ(),p=s.gcj(),o=s.c>0?s.gbp(0):r,n=s.gc5()?s.gb3(0):r,m=s.a,l=s.f,k=B.a.n(m,s.e,l),j=s.r
l=l<j?s.gaL(0):r
return A.i2(q,p,o,n,k,l,j<m.length?s.gbm():r)},
l(a){return this.a},
$ifY:1}
A.hc.prototype={}
A.q.prototype={$iq:1}
A.eN.prototype={
gj(a){return a.length}}
A.cD.prototype={
sfC(a,b){a.href=b},
l(a){var s=String(a)
s.toString
return s},
$icD:1}
A.eO.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.cE.prototype={$icE:1}
A.bO.prototype={$ibO:1}
A.c8.prototype={$ic8:1}
A.bP.prototype={$ibP:1}
A.bj.prototype={
gj(a){return a.length}}
A.f2.prototype={
gj(a){return a.length}}
A.X.prototype={$iX:1}
A.ca.prototype={
cz(a,b){var s=$.q4(),r=s[b]
if(typeof r=="string")return r
r=this.f7(a,b)
s[b]=r
return r},
f7(a,b){var s,r=b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()})
r.toString
r=r in a
r.toString
if(r)return b
s=$.q7()+b
r=s in a
r.toString
if(r)return s
return b},
cR(a,b,c,d){a.setProperty(b,c,d)},
gj(a){var s=a.length
s.toString
return s}}
A.ki.prototype={}
A.aA.prototype={}
A.b8.prototype={}
A.f3.prototype={
gj(a){return a.length}}
A.f4.prototype={
gj(a){return a.length}}
A.f5.prototype={
gj(a){return a.length},
h(a,b){var s=a[A.H(b)]
s.toString
return s}}
A.dp.prototype={}
A.cb.prototype={}
A.f6.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.dq.prototype={
fo(a,b){var s=a.createHTMLDocument(b)
s.toString
return s}}
A.dr.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.mx.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1}
A.ds.prototype={
l(a){var s,r=a.left
r.toString
s=a.top
s.toString
return"Rectangle ("+A.h(r)+", "+A.h(s)+") "+A.h(this.gaO(a))+" x "+A.h(this.gaK(a))},
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
s=this.gaO(a)===s.gaO(b)&&this.gaK(a)===s.gaK(b)}}}return s},
gF(a){var s,r=a.left
r.toString
s=a.top
s.toString
return A.nu(r,s,this.gaO(a),this.gaK(a))},
gcJ(a){return a.height},
gaK(a){var s=this.gcJ(a)
s.toString
return s},
gd3(a){return a.width},
gaO(a){var s=this.gd3(a)
s.toString
return s},
$ibb:1}
A.f7.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){A.w(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1}
A.f8.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.h6.prototype={
A(a,b){return J.ng(this.b,b)},
gD(a){return this.a.firstElementChild==null},
gj(a){return this.b.length},
h(a,b){var s
A.H(b)
s=this.b
if(!(b>=0&&b<s.length))return A.e(s,b)
return t.h.a(s[b])},
k(a,b,c){var s
t.h.a(c)
s=this.b
if(!(b>=0&&b<s.length))return A.e(s,b)
this.a.replaceChild(c,s[b]).toString},
gC(a){var s=this.an(this)
return new J.b7(s,s.length,A.G(s).i("b7<1>"))},
aJ(a){J.il(this.a)}}
A.bG.prototype={
gj(a){return this.a.length},
h(a,b){var s
A.H(b)
s=this.a
if(!(b>=0&&b<s.length))return A.e(s,b)
return this.$ti.c.a(s[b])},
k(a,b,c){this.$ti.c.a(c)
throw A.b(A.N("Cannot modify list"))}}
A.E.prototype={
gfi(a){return new A.ed(a)},
gda(a){var s=a.children
s.toString
return new A.h6(a,s)},
gak(a){return new A.hh(a)},
l(a){var s=a.localName
s.toString
return s},
a2(a,b,c,d){var s,r,q,p
if(c==null){s=$.oo
if(s==null){s=A.A([],t.lN)
r=new A.dS(s)
B.b.m(s,A.p2(null))
B.b.m(s,A.pb())
$.oo=r
d=r}else d=s
s=$.on
if(s==null){d.toString
s=new A.eE(d)
$.on=s
c=s}else{d.toString
s.a=d
c=s}}if($.bR==null){s=document
r=s.implementation
r.toString
r=B.a0.fo(r,"")
$.bR=r
r=r.createRange()
r.toString
$.nl=r
r=$.bR.createElement("base")
t.az.a(r)
s=s.baseURI
s.toString
r.href=s
$.bR.head.appendChild(r).toString}s=$.bR
if(s.body==null){r=s.createElement("body")
B.C.sfk(s,t.hp.a(r))}s=$.bR
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
s=!B.b.A(B.ad,s)}else s=!1
if(s){$.nl.selectNodeContents(q)
s=$.nl
s=s.createContextualFragment(b)
s.toString
p=s}else{J.qO(q,b)
s=$.bR.createDocumentFragment()
s.toString
while(r=q.firstChild,r!=null)s.appendChild(r).toString
p=s}if(q!==$.bR.body)J.io(q)
c.cn(p)
document.adoptNode(p).toString
return p},
fn(a,b,c){return this.a2(a,b,c,null)},
sO(a,b){this.bD(a,b)},
bD(a,b){this.sV(a,null)
a.appendChild(this.a2(a,b,null,null)).toString},
seJ(a,b){a.innerHTML=b},
eQ(a,b){var s=a.querySelectorAll(b)
s.toString
return s},
gav(a){return new A.cp(a,"click",!1,t.C)},
$iE:1}
A.lb.prototype={
$1(a){return t.h.b(t.F.a(a))},
$S:35}
A.o.prototype={
eH(a,b,c,d){return a.initEvent(b,!0,!0)},
$io:1}
A.du.prototype={$idu:1}
A.d.prototype={
bi(a,b,c,d){t.o.a(c)
if(c!=null)this.eq(a,b,c,d)},
bX(a,b,c){return this.bi(a,b,c,null)},
eq(a,b,c,d){return a.addEventListener(b,A.bo(t.o.a(c),1),d)},
eS(a,b,c,d){return a.removeEventListener(b,A.bo(t.o.a(c),1),!1)},
$id:1}
A.aH.prototype={$iaH:1}
A.dw.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.et.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
gaa(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.ai("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1}
A.dx.prototype={
gh0(a){var s=a.result
if(t.lo.b(s))return A.oA(s,0,null)
return s},
fU(a,b){return a.readAsDataURL(b)}}
A.fa.prototype={
gj(a){return a.length}}
A.cH.prototype={
gj(a){return a.length},
$icH:1}
A.aI.prototype={$iaI:1}
A.dy.prototype={}
A.fc.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.bS.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.F.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1,
$ibS:1}
A.dz.prototype={
sfk(a,b){a.body=b}}
A.bu.prototype={
fQ(a,b,c){return a.open(b,c)},
dZ(a,b){return a.send(b)},
cp(a,b,c){return a.setRequestHeader(A.w(b),A.w(c))},
$ibu:1}
A.ce.prototype={}
A.cI.prototype={$icI:1}
A.dA.prototype={
sfd(a,b){a.alt=b},
se1(a,b){a.src=b}}
A.bT.prototype={
sd9(a,b){a.checked=b},
sci(a,b){a.type=b},
sJ(a,b){a.value=b},
$ibT:1,
$ioj:1,
$icG:1}
A.cN.prototype={
l(a){var s=String(a)
s.toString
return s},
$icN:1}
A.fo.prototype={
gj(a){return a.length}}
A.fp.prototype={
bi(a,b,c,d){t.o.a(c)
if(b==="message")a.start()
this.e5(a,b,c,!1)}}
A.fq.prototype={
I(a,b){return A.b3(a.get(b))!=null},
h(a,b){return A.b3(a.get(A.w(b)))},
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
gG(a){var s=A.A([],t.s)
this.p(a,new A.ls(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gD(a){var s=a.size
s.toString
return s===0},
gR(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.N("Not supported"))},
B(a,b){throw A.b(A.N("Not supported"))},
$iu:1}
A.ls.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.fr.prototype={
I(a,b){return A.b3(a.get(b))!=null},
h(a,b){return A.b3(a.get(A.w(b)))},
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
gG(a){var s=A.A([],t.s)
this.p(a,new A.lt(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gD(a){var s=a.size
s.toString
return s===0},
gR(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.N("Not supported"))},
B(a,b){throw A.b(A.N("Not supported"))},
$iu:1}
A.lt.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.aK.prototype={$iaK:1}
A.fs.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.ib.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1}
A.at.prototype={$iat:1}
A.aw.prototype={
gaD(a){var s=this.a,r=s.childNodes.length
if(r===0)throw A.b(A.ai("No elements"))
if(r>1)throw A.b(A.ai("More than one element"))
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
gC(a){var s=this.a.childNodes
return new A.cc(s,s.length,A.as(s).i("cc<x.E>"))},
gj(a){return this.a.childNodes.length},
h(a,b){var s
A.H(b)
s=this.a.childNodes
if(!(b>=0&&b<s.length))return A.e(s,b)
return s[b]}}
A.t.prototype={
dr(a){var s=a.parentNode
if(s!=null)s.removeChild(a).toString},
dv(a,b){var s,r,q
try{r=a.parentNode
r.toString
s=r
J.qx(s,b,a)}catch(q){}return a},
ex(a){var s
while(s=a.firstChild,s!=null)a.removeChild(s).toString},
l(a){var s=a.nodeValue
return s==null?this.e6(a):s},
sV(a,b){a.textContent=b},
fh(a,b){var s=a.appendChild(b)
s.toString
return s},
fm(a,b){var s=a.cloneNode(!0)
s.toString
return s},
A(a,b){var s=a.contains(b)
s.toString
return s},
eV(a,b,c){var s=a.replaceChild(b,c)
s.toString
return s},
$it:1}
A.dR.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.F.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1}
A.lx.prototype={
$1(a){this.a.b1(0,A.w(a))},
$S:24}
A.bx.prototype={$ibx:1}
A.dU.prototype={}
A.aL.prototype={
gj(a){return a.length},
$iaL:1}
A.fF.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.d8.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1}
A.aZ.prototype={$iaZ:1}
A.fH.prototype={
I(a,b){return A.b3(a.get(b))!=null},
h(a,b){return A.b3(a.get(A.w(b)))},
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
gG(a){var s=A.A([],t.s)
this.p(a,new A.lC(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gD(a){var s=a.size
s.toString
return s===0},
gR(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.N("Not supported"))},
B(a,b){throw A.b(A.N("Not supported"))},
$iu:1}
A.lC.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.bY.prototype={
gj(a){return a.length},
sJ(a,b){a.value=b},
$ibY:1}
A.aN.prototype={$iaN:1}
A.fJ.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.ls.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1}
A.aO.prototype={$iaO:1}
A.fK.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.cA.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1}
A.aP.prototype={
gj(a){return a.length},
$iaP:1}
A.e0.prototype={
I(a,b){return a.getItem(b)!=null},
h(a,b){return a.getItem(A.w(b))},
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
gG(a){var s=A.A([],t.s)
this.p(a,new A.lE(s))
return s},
gj(a){var s=a.length
s.toString
return s},
gD(a){return a.key(0)==null},
gR(a){return a.key(0)!=null},
$iu:1}
A.lE.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:7}
A.au.prototype={$iau:1}
A.e2.prototype={
a2(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bF(a,b,c,d)
s=A.r2("<table>"+b+"</table>",c,d)
r=document.createDocumentFragment()
r.toString
new A.aw(r).S(0,new A.aw(s))
return r}}
A.fN.prototype={
a2(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bF(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.aw(s).S(0,new A.aw(new A.aw(new A.aw(B.L.a2(r,b,c,d)).gaD(0)).gaD(0)))
return s}}
A.fO.prototype={
a2(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bF(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.aw(s).S(0,new A.aw(new A.aw(B.L.a2(r,b,c,d)).gaD(0)))
return s}}
A.cV.prototype={
bD(a,b){var s,r
this.sV(a,null)
s=a.content
s.toString
J.il(s)
r=this.a2(a,b,null,null)
a.content.appendChild(r).toString},
$icV:1}
A.cm.prototype={
sJ(a,b){a.value=b},
$icm:1}
A.aQ.prototype={$iaQ:1}
A.av.prototype={$iav:1}
A.fQ.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.gJ.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1}
A.fR.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.dQ.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1}
A.fS.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.aR.prototype={$iaR:1}
A.fT.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.ki.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1}
A.fU.prototype={
gj(a){return a.length}}
A.be.prototype={}
A.h_.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.h1.prototype={
gj(a){return a.length}}
A.c2.prototype={$ic2:1,$ilT:1}
A.bn.prototype={$ibn:1}
A.cZ.prototype={$icZ:1}
A.h8.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.d5.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
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
if(r===q.gaO(b)){s=a.height
s.toString
q=s===q.gaK(b)
s=q}}}}return s},
gF(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return A.nu(p,s,r,q)},
gcJ(a){return a.height},
gaK(a){var s=a.height
s.toString
return s},
gd3(a){return a.width},
gaO(a){var s=a.width
s.toString
return s}}
A.hm.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
return a[b]},
k(a,b,c){t.ef.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1}
A.el.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.F.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1}
A.hN.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.hH.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1}
A.hT.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.H(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a4(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.lv.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$il:1,
$iL:1,
$if:1,
$ip:1}
A.h4.prototype={
p(a,b){var s,r,q,p,o,n
t.bm.a(b)
for(s=this.gG(0),r=s.length,q=this.a,p=0;p<s.length;s.length===r||(0,A.aE)(s),++p){o=s[p]
n=q.getAttribute(o)
b.$2(o,n==null?A.w(n):n)}},
gG(a){var s,r,q,p,o,n,m=this.a.attributes
m.toString
s=A.A([],t.s)
for(r=m.length,q=t.nD,p=0;p<r;++p){if(!(p<m.length))return A.e(m,p)
o=q.a(m[p])
if(o.namespaceURI==null){n=o.name
n.toString
B.b.m(s,n)}}return s},
gD(a){return this.gG(0).length===0},
gR(a){return this.gG(0).length!==0}}
A.ed.prototype={
I(a,b){var s=this.a.hasAttribute(b)
s.toString
return s},
h(a,b){return this.a.getAttribute(A.w(b))},
k(a,b,c){this.a.setAttribute(b,c)},
B(a,b){var s,r
if(typeof b=="string"){s=this.a
r=s.getAttribute(b)
s.removeAttribute(b)
s=r}else s=null
return s},
gj(a){return this.gG(0).length}}
A.hb.prototype={
I(a,b){var s=this.a.a.hasAttribute("data-"+this.b0(b))
s.toString
return s},
h(a,b){return this.a.a.getAttribute("data-"+this.b0(A.w(b)))},
k(a,b,c){this.a.a.setAttribute("data-"+this.b0(b),c)},
B(a,b){var s="data-"+this.b0(b),r=this.a.a,q=r.getAttribute(s)
r.removeAttribute(s)
return q},
p(a,b){this.a.p(0,new A.lZ(this,t.bm.a(b)))},
gG(a){var s=A.A([],t.s)
this.a.p(0,new A.m_(this,s))
return s},
gj(a){return this.gG(0).length},
gD(a){return this.gG(0).length===0},
gR(a){return this.gG(0).length!==0},
cX(a){var s,r,q=A.A(a.split("-"),t.s)
for(s=1;s<q.length;++s){r=q[s]
if(r.length>0)B.b.k(q,s,r[0].toUpperCase()+B.a.X(r,1))}return B.b.Y(q,"")},
b0(a){var s,r,q,p,o
for(s=a.length,r=0,q="";r<s;++r){p=a[r]
o=p.toLowerCase()
q=(p!==o&&r>0?q+"-":q)+o}return q.charCodeAt(0)==0?q:q}}
A.lZ.prototype={
$2(a,b){if(B.a.M(a,"data-"))this.b.$2(this.a.cX(B.a.X(a,5)),b)},
$S:7}
A.m_.prototype={
$2(a,b){if(B.a.M(a,"data-"))B.b.m(this.b,this.a.cX(B.a.X(a,5)))},
$S:7}
A.hh.prototype={
a3(){var s,r,q,p,o=A.ci(t.N)
for(s=this.a.className.split(" "),r=s.length,q=0;q<r;++q){p=B.a.t(s[q])
if(p.length!==0)o.m(0,p)}return o},
ck(a){this.a.className=t.i.a(a).Y(0," ")},
gj(a){var s=this.a.classList.length
s.toString
return s},
gD(a){var s=this.a.classList.length
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
bu(a){A.rI(this.a,a)}}
A.nm.prototype={}
A.cq.prototype={
bs(a,b,c,d){var s=A.y(this)
s.i("~(1)?").a(a)
t.jE.a(c)
return A.C(this.a,this.b,a,!1,s.c)}}
A.cp.prototype={}
A.ee.prototype={
aI(a){var s=this
if(s.b==null)return $.ne()
s.d0()
s.d=s.b=null
return $.ne()},
c9(a){var s,r=this
r.$ti.i("~(1)?").a(a)
if(r.b==null)throw A.b(A.ai("Subscription has been canceled."))
r.d0()
s=A.pN(new A.m1(a),t.A)
r.d=s
r.cZ()},
cZ(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.qy(s,this.c,r,!1)}},
d0(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.qw(s,this.c,t.o.a(r),!1)}},
$ibm:1}
A.m0.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:3}
A.m1.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:3}
A.cs.prototype={
eg(a){var s
if($.hn.a===0){for(s=0;s<262;++s)$.hn.k(0,B.ae[s],A.up())
for(s=0;s<12;++s)$.hn.k(0,B.u[s],A.uq())}},
aH(a){return $.qn().A(0,A.dt(a))},
aj(a,b,c){var s=$.hn.h(0,A.dt(a)+"::"+b)
if(s==null)s=$.hn.h(0,"*::"+b)
if(s==null)return!1
return A.mB(s.$4(a,b,c,this))},
$iba:1}
A.x.prototype={
gC(a){return new A.cc(a,this.gj(a),A.as(a).i("cc<x.E>"))}}
A.dS.prototype={
aH(a){return B.b.a8(this.a,new A.lw(a))},
aj(a,b,c){return B.b.a8(this.a,new A.lv(a,b,c))},
$iba:1}
A.lw.prototype={
$1(a){return t.hU.a(a).aH(this.a)},
$S:23}
A.lv.prototype={
$1(a){return t.hU.a(a).aj(this.a,this.b,this.c)},
$S:23}
A.er.prototype={
ei(a,b,c,d){var s,r,q
this.a.S(0,c)
s=b.bA(0,new A.mo())
r=b.bA(0,new A.mp())
this.b.S(0,s)
q=this.c
q.S(0,B.ac)
q.S(0,r)},
aH(a){return this.a.A(0,A.dt(a))},
aj(a,b,c){var s,r=this,q=A.dt(a),p=r.c,o=q+"::"+b
if(p.A(0,o))return r.d.fc(c)
else{s="*::"+b
if(p.A(0,s))return r.d.fc(c)
else{p=r.b
if(p.A(0,o))return!0
else if(p.A(0,s))return!0
else if(p.A(0,q+"::*"))return!0
else if(p.A(0,"*::*"))return!0}}return!1},
$iba:1}
A.mo.prototype={
$1(a){return!B.b.A(B.u,A.w(a))},
$S:8}
A.mp.prototype={
$1(a){return B.b.A(B.u,A.w(a))},
$S:8}
A.hV.prototype={
aj(a,b,c){if(this.ee(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.A(0,b)
return!1}}
A.mq.prototype={
$1(a){return"TEMPLATE::"+A.w(a)},
$S:9}
A.hU.prototype={
aH(a){var s
if(t.nZ.b(a))return!1
s=t.bC.b(a)
if(s&&A.dt(a)==="foreignObject")return!1
if(s)return!0
return!1},
aj(a,b,c){if(b==="is"||B.a.M(b,"on"))return!1
return this.aH(a)},
$iba:1}
A.cc.prototype={
q(){var s=this,r=s.c+1,q=s.b
if(r<q){s.d=J.m(s.a,r)
s.c=r
return!0}s.d=null
s.c=q
return!1},
gu(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
$iaa:1}
A.ha.prototype={$ii:1,$id:1,$ilT:1}
A.hK.prototype={$irv:1}
A.eE.prototype={
cn(a){var s,r=new A.mA(this)
do{s=this.b
r.$2(a,null)}while(s!==this.b)},
aY(a,b){++this.b
if(b==null||b!==a.parentNode)J.io(a)
else b.removeChild(a).toString},
f_(a,b){var s,r,q,p,o,n,m,l=!0,k=null,j=null
try{k=J.qC(a)
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
this.eZ(a,b,l,r,q,t.f.a(k),A.ay(j))}catch(n){if(A.am(n) instanceof A.b5)throw n
else{this.aY(a,b)
window.toString
p=A.h(r)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn("Removing corrupted element "+p)}}},
eZ(a,b,c,d,e,f,g){var s,r,q,p,o,n,m,l=this
if(c){l.aY(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing element due to corrupted attributes on <"+d+">")
return}if(!l.a.aH(a)){l.aY(a,b)
window.toString
s=A.h(b)
r=typeof console!="undefined"
r.toString
if(r)window.console.warn("Removing disallowed element <"+e+"> from "+s)
return}if(g!=null)if(!l.a.aj(a,"is",g)){l.aY(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing disallowed type extension <"+e+' is="'+g+'">')
return}s=f.gG(0)
q=A.A(s.slice(0),A.G(s))
for(p=f.gG(0).length-1,s=f.a,r="Removing disallowed attribute <"+e+" ";p>=0;--p){if(!(p<q.length))return A.e(q,p)
o=q[p]
n=l.a
m=J.qQ(o)
A.w(o)
if(!n.aj(a,m,A.w(s.getAttribute(o)))){window.toString
n=s.getAttribute(o)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn(r+o+'="'+A.h(n)+'">')
s.removeAttribute(o)}}if(t.fD.b(a)){s=a.content
s.toString
l.cn(s)}},
dY(a,b){var s=a.nodeType
s.toString
switch(s){case 1:this.f_(a,b)
break
case 8:case 11:case 3:case 4:break
default:this.aY(a,b)}},
$irf:1}
A.mA.prototype={
$2(a,b){var s,r,q,p,o,n=this.a
n.dY(a,b)
s=a.lastChild
while(s!=null){r=null
try{r=s.previousSibling
if(r!=null&&r.nextSibling!==s){q=A.ai("Corrupt HTML")
throw A.b(q)}}catch(p){q=s;++n.b
o=q.parentNode
if(a!==o){if(o!=null)o.removeChild(q).toString}else a.removeChild(q).toString
s=null
r=a.lastChild}if(s!=null)this.$2(s,a)
s=r}},
$S:45}
A.h9.prototype={}
A.hd.prototype={}
A.he.prototype={}
A.hf.prototype={}
A.hg.prototype={}
A.hj.prototype={}
A.hk.prototype={}
A.ho.prototype={}
A.hp.prototype={}
A.hw.prototype={}
A.hx.prototype={}
A.hy.prototype={}
A.hz.prototype={}
A.hA.prototype={}
A.hB.prototype={}
A.hF.prototype={}
A.hG.prototype={}
A.hI.prototype={}
A.es.prototype={}
A.et.prototype={}
A.hL.prototype={}
A.hM.prototype={}
A.hO.prototype={}
A.hW.prototype={}
A.hX.prototype={}
A.ew.prototype={}
A.ex.prototype={}
A.hY.prototype={}
A.hZ.prototype={}
A.i3.prototype={}
A.i4.prototype={}
A.i5.prototype={}
A.i6.prototype={}
A.i7.prototype={}
A.i8.prototype={}
A.i9.prototype={}
A.ia.prototype={}
A.ib.prototype={}
A.ic.prototype={}
A.mG.prototype={
$1(a){this.a.push(A.ps(a))},
$S:12}
A.mS.prototype={
$2(a,b){this.a[a]=A.ps(b)},
$S:32}
A.f1.prototype={
bW(a){var s=$.q3()
if(s.b.test(a))return a
throw A.b(A.kc(a,"value","Not a valid class token"))},
l(a){return this.a3().Y(0," ")},
gC(a){var s=this.a3()
return A.rN(s,s.r,A.y(s).c)},
am(a,b,c){var s,r
c.i("0(c)").a(b)
s=this.a3()
r=A.y(s)
return new A.bs(s,r.H(c).i("1(aq.E)").a(b),r.i("@<aq.E>").H(c).i("bs<1,2>"))},
gD(a){return this.a3().a===0},
gR(a){return this.a3().a!==0},
gj(a){return this.a3().a},
A(a,b){this.bW(b)
return this.a3().A(0,b)},
m(a,b){var s
A.w(b)
this.bW(b)
s=this.dl(0,new A.kg(b))
return A.mB(s==null?!1:s)},
B(a,b){var s,r
if(typeof b!="string")return!1
this.bW(b)
s=this.a3()
r=s.B(0,b)
this.ck(s)
return r},
bu(a){this.dl(0,new A.kh(a))},
v(a,b){return this.a3().v(0,b)},
dl(a,b){var s,r
t.gA.a(b)
s=this.a3()
r=b.$1(s)
this.ck(s)
return r}}
A.kg.prototype={
$1(a){return t.i.a(a).m(0,this.a)},
$S:69}
A.kh.prototype={
$1(a){return t.i.a(a).bu(this.a)},
$S:44}
A.fb.prototype={
gaW(){var s=this.b,r=A.y(s)
return new A.aC(new A.J(s,r.i("I(k.E)").a(new A.lc()),r.i("J<k.E>")),r.i("E(k.E)").a(new A.ld()),r.i("aC<k.E,E>"))},
p(a,b){t.p9.a(b)
B.b.p(A.aJ(this.gaW(),!1,t.h),b)},
k(a,b,c){var s
t.h.a(c)
s=this.gaW()
J.qM(s.b.$1(J.eL(s.a,b)),c)},
A(a,b){return!1},
aJ(a){J.il(this.b.a)},
gj(a){return J.ag(this.gaW().a)},
h(a,b){var s
A.H(b)
s=this.gaW()
return s.b.$1(J.eL(s.a,b))},
gC(a){var s=A.aJ(this.gaW(),!1,t.h)
return new J.b7(s,s.length,A.G(s).i("b7<1>"))}}
A.lc.prototype={
$1(a){return t.h.b(t.F.a(a))},
$S:35}
A.ld.prototype={
$1(a){return t.h.a(t.F.a(a))},
$S:43}
A.cM.prototype={$icM:1}
A.hJ.prototype={
dD(a){if(a instanceof A.bl)return a.eY()
return null}}
A.mI.prototype={
$1(a){var s
t.Y.a(a)
s=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(A.tp,a,!1)
A.nQ(s,$.ik(),a)
return s},
$S:13}
A.mJ.prototype={
$1(a){return new this.a(a)},
$S:13}
A.mO.prototype={
$1(a){var s=a==null?A.b2(a):a
$.nd()
return new A.dD(s)},
$S:40}
A.mP.prototype={
$1(a){var s=a==null?A.b2(a):a
$.nd()
return new A.cg(s,t.gq)},
$S:38}
A.mQ.prototype={
$1(a){var s=a==null?A.b2(a):a
$.nd()
return new A.bl(s)},
$S:70}
A.bl.prototype={
h(a,b){if(typeof b!="string"&&typeof b!="number")throw A.b(A.b6("property is not a String or num",null))
return A.nO(this.a[b])},
k(a,b,c){if(typeof b!="string"&&typeof b!="number")throw A.b(A.b6("property is not a String or num",null))
this.a[b]=A.nP(c)},
Z(a,b){if(b==null)return!1
return b instanceof A.bl&&this.a===b.a},
bn(a){return a in this.a},
bZ(a,b){var s,r=this.a
if(b==null)s=null
else{s=A.G(b)
s=A.aJ(new A.a_(b,s.i("@(1)").a(A.uy()),s.i("a_<1,@>")),!0,t.z)}return A.nO(r[a].apply(r,s))},
l(a){var s,r
try{s=String(this.a)
return s}catch(r){s=this.ec(0)
return s}},
eY(){var s=this.bU(),r=s!=null&&s.length>0?" ("+s+")":""
return"Instance of '"+A.dX(this)+"'"+r},
bU(){return A.o2(this.a,!1,!1)},
gF(a){return 0}}
A.dD.prototype={
bU(){return A.o2(this.a,!1,!0)}}
A.cg.prototype={
cB(a){var s=a<0||a>=this.gj(0)
if(s)throw A.b(A.aj(a,0,this.gj(0),null,null))},
h(a,b){if(A.eG(b))this.cB(b)
return this.$ti.c.a(this.e8(0,b))},
k(a,b,c){if(A.eG(b))this.cB(b)
this.ed(0,b,c)},
gj(a){var s=this.a.length
if(typeof s==="number"&&s>>>0===s)return s
throw A.b(A.ai("Bad JsArray length"))},
bU(){return A.o2(this.a,!0,!1)},
$il:1,
$if:1,
$ip:1}
A.d2.prototype={
k(a,b,c){return this.e9(0,b,c)}}
A.ly.prototype={
l(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.n_.prototype={
$1(a){var s,r,q,p,o
if(A.pD(a))return a
s=this.a
if(s.I(0,a))return s.h(0,a)
if(t.f.b(a)){r={}
s.k(0,a,r)
for(s=J.K(a),q=J.b4(s.gG(a));q.q();){p=q.gu(q)
r[p]=this.$1(s.h(a,p))}return r}else if(t.R.b(a)){o=[]
s.k(0,a,o)
B.b.S(o,J.di(a,this,t.z))
return o}else return a},
$S:25}
A.n7.prototype={
$1(a){return this.a.b1(0,this.b.i("0/?").a(a))},
$S:12}
A.n8.prototype={
$1(a){if(a==null)return this.a.c_(new A.ly(a===undefined))
return this.a.c_(a)},
$S:12}
A.me.prototype={
eh(){var s=self.crypto
if(s!=null)if(s.getRandomValues!=null)return
throw A.b(A.N("No source of cryptographically secure random numbers available."))},
fO(a){var s,r,q,p,o,n,m,l
if(a<=0||a>4294967296)throw A.b(A.rq("max must be in range 0 < max \u2264 2^32, was "+a))
if(a>255)if(a>65535)s=a>16777215?4:3
else s=2
else s=1
r=this.a
r.$flags&2&&A.aG(r,11)
r.setUint32(0,0,!1)
q=4-s
p=A.H(Math.pow(256,s))
for(o=a-1,n=(a&o)===0;;){crypto.getRandomValues(J.qA(B.ah.gfl(r),q,s))
m=r.getUint32(0,!1)
if(n)return(m&o)>>>0
l=m%a
if(m-l+a<p)return l}}}
A.aT.prototype={$iaT:1}
A.fn.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s
A.H(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a4(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){t.kT.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){return this.h(a,b)},
$il:1,
$if:1,
$ip:1}
A.aW.prototype={$iaW:1}
A.fB.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s
A.H(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a4(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){t.ai.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){return this.h(a,b)},
$il:1,
$if:1,
$ip:1}
A.fG.prototype={
gj(a){return a.length}}
A.cT.prototype={$icT:1}
A.fM.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s
A.H(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a4(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){A.w(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){return this.h(a,b)},
$il:1,
$if:1,
$ip:1}
A.eR.prototype={
a3(){var s,r,q,p,o=this.a.getAttribute("class"),n=A.ci(t.N)
if(o==null)return n
for(s=o.split(" "),r=s.length,q=0;q<r;++q){p=B.a.t(s[q])
if(p.length!==0)n.m(0,p)}return n},
ck(a){this.a.setAttribute("class",a.Y(0," "))}}
A.r.prototype={
gak(a){return new A.eR(a)},
gda(a){return new A.fb(a,new A.aw(a))},
sO(a,b){this.bD(a,b)},
a2(a,b,c,d){var s,r,q,p=A.A([],t.lN)
B.b.m(p,A.p2(null))
B.b.m(p,A.pb())
B.b.m(p,new A.hU())
c=new A.eE(new A.dS(p))
p=document
s=p.body
s.toString
r=B.x.fn(s,'<svg version="1.1">'+b+"</svg>",c)
p=p.createDocumentFragment()
p.toString
q=new A.aw(r).gaD(0)
while(s=q.firstChild,s!=null)p.appendChild(s).toString
return p},
gav(a){return new A.cp(a,"click",!1,t.C)},
$ir:1}
A.aX.prototype={$iaX:1}
A.fV.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s
A.H(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a4(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){t.hk.a(c)
throw A.b(A.N("Cannot assign element of immutable List."))},
v(a,b){return this.h(a,b)},
$il:1,
$if:1,
$ip:1}
A.hs.prototype={}
A.ht.prototype={}
A.hC.prototype={}
A.hD.prototype={}
A.hQ.prototype={}
A.hR.prototype={}
A.i_.prototype={}
A.i0.prototype={}
A.eS.prototype={
gj(a){return a.length}}
A.eT.prototype={
I(a,b){return A.b3(a.get(b))!=null},
h(a,b){return A.b3(a.get(A.w(b)))},
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
gG(a){var s=A.A([],t.s)
this.p(a,new A.kd(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gD(a){var s=a.size
s.toString
return s===0},
gR(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.N("Not supported"))},
B(a,b){throw A.b(A.N("Not supported"))},
$iu:1}
A.kd.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.eU.prototype={
gj(a){return a.length}}
A.bN.prototype={}
A.fC.prototype={
gj(a){return a.length}}
A.h5.prototype={}
A.n0.prototype={
$1(a){t.A.a(a)
new A.ip().ab()},
$S:18}
A.ip.prototype={
ab(){var s=0,r=A.S(t.H),q=this,p,o,n,m,l,k,j,i,h,g,f
var $async$ab=A.T(function(a,b){if(a===1)return A.P(b,r)
for(;;)switch(s){case 0:g=document
f=g.getElementById("view-login")
f.toString
q.z=f
f=g.getElementById("view-dashboard")
f.toString
q.Q=f
f=g.getElementById("view-directory")
f.toString
q.as=f
f=g.getElementById("view-assets")
f.toString
q.at=f
f=g.getElementById("view-profile")
f.toString
q.ax=f
f=g.getElementById("view-billing")
f.toString
q.ay=f
f=g.getElementById("view-resident-home")
f.toString
q.ch=f
f=g.getElementById("view-resident-ledger")
f.toString
q.CW=f
f=g.getElementById("view-resident-support")
f.toString
q.cx=f
f=g.getElementById("app-bottom-nav")
f.toString
q.cy=f
f=g.getElementById("resident-bottom-nav")
f.toString
q.db=f
q.dx=g.getElementById("btn-floating-role-switch")
g.getElementById("floating-role-switch-text")
f=q.Q
o=q.as
n=g.getElementById("view-worker-resident-details")
n.toString
m=t.N
q.fr=t.dW.a(A.a5(["view-dashboard",f,"view-directory",o,"view-worker-resident-details",n,"view-assets",q.at,"view-profile",q.ax,"view-billing",q.ay,"view-resident-home",q.ch,"view-resident-ledger",q.CW,"view-resident-support",q.cx],m,t.h))
n=t.d.a(window.location).href
n.toString
l=A.cn(n).gaw().h(0,"role")
k=g.getElementById("web-portal-title")
f=l==="resident"
if(f){if(k!=null)J.v(k,"Resident Portal")
j=t.G.a(g.getElementById("employee-id"))
if(j!=null)j.placeholder="Resident ID, meter ID, contact or unique name"}else{if(k!=null)J.v(k,"Worker Portal")
j=t.G.a(g.getElementById("employee-id"))
if(j!=null)j.placeholder="Enter employee ID"}o=new A.jn()
o.$0()
A.nA(A.la(0,10),new A.jj(o))
o=$.U()
o.sfP(new A.jk(q))
n=o.ax
new A.d_(n,A.y(n).i("d_<1>")).fK(new A.jl(q))
s=2
return A.z(o.ab(),$async$ab)
case 2:q.d1(o.W())
A.nA(A.la(0,10),new A.jm(q))
p=A.de()?window.localStorage.getItem("waterhall_session"):null
i=A.de()?window.localStorage.getItem("waterhall_resident_session"):null
if(f)if(i!=null&&i.length!==0){q.cs(i)
q.ar()
q.be("resident")}else q.b2()
else if(p!=null&&p.length!==0)try{f=A.ao(t.f.a(B.e.L(0,p)),m,t.z)
q.a=f
q.cq(f)
q.ar()
q.be("worker")}catch(e){f=window.localStorage
f.toString
B.j.B(f,"waterhall_session")
q.b2()}else q.b2()
q.fj()
if($.U().y==="Session expired. Please sign in again.")q.ah("Session expired. Please sign in again.",g.getElementById("login-error-msg"))
return A.Q(null,r)}})
return A.R($async$ab,r)},
d1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d="btn-review-collections"
t.P.a(a)
s=document
r=s.getElementById("worker-sync-status-pill")
q=s.getElementById("worker-sync-status-text")
p=s.getElementById("db-offline-overlay")
o=s.getElementById("offline-banner-text")
n=J.D(a)
m=n.h(a,"status")
l=A.w(m==null?"online":m)
k=A.nN(n.h(a,"pendingCount"))
if(k==null)k=0
m=A.pq(n.h(a,"isOnline"))
m=m===!1
j=J.n(n.h(a,"authenticated"),!0)
i=A.nN(n.h(a,"reviewCount"))
if(i==null)i=0
h=r==null
if(!h&&q!=null){g=J.K(r)
g.gak(r).bu(["online","offline","pending_sync","syncing","synced"])
g.gak(r).m(0,l)
if(!j)J.v(q,"Sign in required")
else if(m)J.v(q,"Offline Mode")
else if(J.n(n.h(a,"isSyncing"),!0))J.v(q,"Syncing...")
else if(k>0){if(i>0)n=""+k+" Pending ("+i+" need review)"
else{g=""+k
n=n.h(a,"error")!=null?g+" Pending: retry needed":g+" Pending Sync"}J.v(q,n)}else J.v(q,"Connected")}if(p!=null)if(j&&m){n=p.style
n.display="flex"
if(o!=null){n=J.K(o)
if(k>0)n.sV(o,"Offline Mode Active: "+k+" collection(s) saved on this device waiting to sync.")
else n.sV(o,"Offline Mode Active: Local SQLite database enabled. Field operations available.")}}else{n=p.style
n.display="none"}f=s.getElementById(d)
if(f==null)n=(h?null:r.parentElement)!=null
else n=!1
if(n){e=s.createElement("button")
e.id=d
B.m.sV(e,"Review pending operations")
s=t.C
A.C(e,"click",s.i("~(1)?").a(new A.iT(this)),!1,s.c)
r.parentElement.appendChild(e).toString
f=e}if(f!=null){s=f.style
s.toString
n=j&&i>0?"inline-block":"none"
s.display=n}},
cS(){var s,r,q,p,o,n,m,l,k,j,i,h,g="collection-review-modal",f="house_id",e="sync_error",d=$.U()
if(!d.N())return
s=document
r=s.getElementById(g)
if(r!=null)J.io(r)
q=s.createElement("div")
q.id=g
q.className="modal-overlay"
r=q.style
r.display="flex"
p=s.createElement("div")
p.className="offline-card"
r=p.style
r.maxHeight="80vh"
B.q.cR(r,B.q.cz(r,"overflow-y"),"auto","")
r=s.createElement("h2")
r.toString
B.a6.sV(r,"Pending operation review")
p.appendChild(r).toString
r=s.createElement("p")
r.toString
B.r.sV(r,"These records remain saved. Review rejected readings or payments with Admin, then retry. Record IDs are preserved.")
p.appendChild(r).toString
for(d=d.aP(),r=A.G(d),o=r.i("I(1)").a(new A.iP()),d=B.b.gC(d),r=new A.bf(d,o,r.i("bf<1>"));r.q();){o=d.gu(0)
n=s.createElement("p")
n.toString
m=J.D(o)
B.r.sV(n,A.h(m.h(o,f))+" | "+A.h(m.h(o,"amount_collected"))+" | "+A.h(m.h(o,"transaction_id"))+"\n"+A.h(m.h(o,e)))
p.appendChild(n).toString}for(d=$.U().af(),r=A.G(d),o=r.i("I(1)").a(new A.iQ()),d=B.b.gC(d),r=new A.bf(d,o,r.i("bf<1>")),o=t.f;r.q();){n=d.gu(0)
m=J.D(n)
l=o.a(m.h(n,"body"))
k=B.af.h(0,m.h(n,"endpoint"))
if(k==null)k="Saved operation"
j=s.createElement("p")
j.toString
i=J.D(l)
h=i.h(l,f)
i=h==null?i.h(l,"household_id"):h
B.r.sV(j,k+" | "+A.h(i==null?"":i)+" | "+A.h(m.h(n,"operation_id"))+"\n"+A.h(m.h(n,e)))
p.appendChild(j).toString}d=s.createElement("button")
d.toString
B.m.sV(d,"Retry pending operations")
r=t.C
o=r.i("~(1)?")
r=r.c
A.C(d,"click",o.a(new A.iR(this,d)),!1,r)
p.appendChild(d).toString
d=s.createElement("button")
d.toString
B.m.sV(d,"Close")
A.C(d,"click",o.a(new A.iS(q)),!1,r)
p.appendChild(d).toString
q.appendChild(p).toString
s.body.appendChild(q).toString},
fj(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=this,b1="click",b2="change"
b0.eI()
b0.eu()
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
if(j!=null){i=J.a8(j)
h=i.$ti
A.C(i.a,i.b,h.i("~(1)?").a(new A.iW(j)),!1,h.c)}if(q!=null){i=t.C
A.C(q,b1,i.i("~(1)?").a(new A.iX(b0,o,n,l,k,q)),!1,i.c)}g=r.a(s.getElementById("btn-logout"))
if(g!=null){i=t.C
A.C(g,b1,i.i("~(1)?").a(new A.iY(b0)),!1,i.c)}f=r.a(s.getElementById("btn-resident-logout"))
if(f!=null){i=t.C
A.C(f,b1,i.i("~(1)?").a(new A.j5(b0)),!1,i.c)}i=t.h
A.mR(i,i,"T","querySelectorAll")
i=s.querySelectorAll(".nav-tab")
i.toString
e=new A.bG(i,t.k)
e.p(e,new A.j6(b0))
d=p.a(s.getElementById("dir-search"))
c=m.a(s.getElementById("filter-purok"))
b=m.a(s.getElementById("filter-status"))
if(d!=null){p=t.E
A.C(d,"input",p.i("~(1)?").a(new A.j7(b0)),!1,p.c)}if(c!=null){p=t.E
A.C(c,b2,p.i("~(1)?").a(new A.j8(b0)),!1,p.c)}if(b!=null){p=t.E
A.C(b,b2,p.i("~(1)?").a(new A.j9(b0)),!1,p.c)}a=s.getElementById("btn-close-modal")
if(a!=null){p=J.a8(a)
m=p.$ti
A.C(p.a,p.b,m.i("~(1)?").a(new A.ja(b0)),!1,m.c)}a0=s.getElementById("house-detail-modal")
if(a0!=null){p=J.a8(a0)
m=p.$ti
A.C(p.a,p.b,m.i("~(1)?").a(new A.jb(a0)),!1,m.c)}a1=t.aa.a(s.getElementById("modal-leak-toggle"))
if(a1!=null){p=t.E
A.C(a1,b2,p.i("~(1)?").a(new A.jc(b0,a1)),!1,p.c)}a2=r.a(s.getElementById("btn-submit-log"))
if(a2!=null){r=t.C
A.C(a2,b1,r.i("~(1)?").a(new A.iZ(b0)),!1,r.c)}a3=s.getElementById("menu-view-logs")
if(a3!=null){r=J.a8(a3)
p=r.$ti
A.C(r.a,r.b,p.i("~(1)?").a(new A.j_(b0)),!1,p.c)}a4=s.getElementById("menu-emergency-call")
if(a4!=null){r=J.a8(a4)
p=r.$ti
A.C(r.a,r.b,p.i("~(1)?").a(new A.j0(b0)),!1,p.c)}a5=s.getElementById("btn-broadcast-announcement")
if(a5!=null){r=J.a8(a5)
p=r.$ti
A.C(r.a,r.b,p.i("~(1)?").a(new A.j1(b0)),!1,p.c)}a6=s.getElementById("btn-web-forgot-password")
a7=s.getElementById("web-modal-forgot-pw")
a8=s.getElementById("btn-web-recover-cancel")
a9=s.getElementById("btn-web-recover-submit")
if(a6!=null){s=J.a8(a6)
r=s.$ti
A.C(s.a,s.b,r.i("~(1)?").a(new A.j2(a7)),!1,r.c)}if(a8!=null){s=J.a8(a8)
r=s.$ti
A.C(s.a,s.b,r.i("~(1)?").a(new A.j3(a7)),!1,r.c)}if(a9!=null){s=J.a8(a9)
r=s.$ti
A.C(s.a,s.b,r.i("~(1)?").a(new A.j4(a7)),!1,r.c)}},
ah(a,b){var s
if(b!=null){J.v(b,a)
s=b.style
s.display="block"}},
ar(){},
be(a){var s="WaterHallPush",r=$.dh()
if(r.bn(s))r.h(0,s).bZ("registerSubscription",A.A([a],t.s))},
b2(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b="none",a=c.fr
a===$&&A.aF()
new A.aU(a,A.y(a).i("aU<2>")).p(0,new A.jd())
a=c.z
a===$&&A.aF()
J.c7(a).m(0,"active")
a=c.z.style
a.display="flex"
c.b="view-login"
a=c.cy
a===$&&A.aF()
a=a.style
a.display=b
a=c.db
a===$&&A.aF()
a=a.style
a.display=b
a=c.dx
a===$&&A.aF()
if(a!=null){a=a.style
a.display=b}a=document
s=t.G
r=s.a(a.getElementById("employee-id"))
q=s.a(a.getElementById("login-password"))
p=a.getElementById("login-error-msg")
if(r!=null)B.f.sJ(r,"")
if(q!=null)B.f.sJ(q,"")
if(p!=null){o=p.style
o.display=b}o=t.r
n=o.a(a.getElementById("resident-log-desc"))
if(n!=null)B.l.sJ(n,"")
m=a.getElementById("resident-photo-name")
if(m!=null)J.v(m,"No file chosen")
l=a.getElementById("resident-photo-preview")
if(l!=null){k=l.style
k.display=b
k=l.style
k.backgroundImage=""}j=s.a(a.getElementById("dir-search"))
if(j!=null)B.f.sJ(j,"")
i=s.a(a.getElementById("bill-meter-search"))
if(i!=null)B.f.sJ(i,"")
h=s.a(a.getElementById("bill-curr-input"))
if(h!=null)B.f.sJ(h,"")
g=o.a(a.getElementById("worker-announcement-input"))
if(g!=null)B.l.sJ(g,"")
f=a.getElementById("resident-logout-name")
e=a.getElementById("resident-logout-role")
d=a.getElementById("resident-logout-avatar")
if(f!=null)J.v(f,"---")
if(e!=null)J.v(e,"---")
if(d!=null)J.v(d,"--")},
cq(a){var s,r,q,p,o,n,m,l=this
t.P.a(a)
s=t.d.a(window.location).href
s.toString
if(A.cn(s).gaw().h(0,"role")==="resident"){A.bL("[SECURITY] Resident application is forbidden from loading Worker Portal.")
return}s=l.z
s===$&&A.aF()
J.c7(s).B(0,"active")
s=l.z.style
s.display="none"
s=l.fr
s===$&&A.aF()
new A.aU(s,A.y(s).i("aU<2>")).p(0,new A.jZ())
l.d=null
s=window.localStorage
s.toString
B.j.B(s,"waterhall_resident_session")
s=l.cy
s===$&&A.aF()
s.setAttribute("style","display: flex !important")
s=l.db
s===$&&A.aF()
s.setAttribute("style","display: none !important")
s=l.dx
s===$&&A.aF()
if(s!=null){s=s.style
s.display="none"}l.a=a
s=window.localStorage
s.toString
s.setItem("waterhall_session",B.e.T(a))
s=t.U
r=A.ab(new A.J(A.A(J.M(a.h(0,"name")).split(" "),t.s),t.Q.a(new A.k_()),s),s.i("f.E"))
s=A.G(r)
q=new A.a_(r,s.i("c(1)").a(new A.k0()),s.i("a_<1,c>")).Y(0,"")
s=q.length
s=B.a.n(q,0,s<2?s:2)
p=document
o=p.getElementById("worker-logout-name")
n=p.getElementById("worker-logout-role")
m=p.getElementById("worker-logout-avatar")
if(o!=null)J.v(o,A.ay(a.h(0,"name")))
if(n!=null){p=a.h(0,"role")
J.v(n,A.ay(p==null?"Field Worker":p))}if(m!=null)J.v(m,s.toUpperCase())
l.a5("view-dashboard")
l.bw()
l.aN()
l.cd()
l.fE()},
a5(a){var s,r,q,p,o,n,m=this,l="view-resident-home",k="view-resident-ledger",j="view-resident-support"
if(m.a==null&&m.d==null&&a!=="view-login"){m.b2()
return}s=t.d.a(window.location).href
s.toString
r=A.cn(s).gaw().h(0,"role")
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
A.mR(q,q,"T","querySelectorAll")
q=s.querySelectorAll(".nav-tab")
q.toString
p=new A.bG(q,t.k)
p.p(p,new A.k8(a))
q=m.fr
q===$&&A.aF()
q.p(0,new A.k9(a))
if(a==="view-dashboard")m.bw()
else if(a==="view-directory")m.aN()
else if(a!=="view-assets")if(a==="view-profile")m.cd()
else if(a==="view-billing"){if(m.fx==null){o=$.U().a
q=o.length
if(q!==0){if(0>=q)return A.e(o,0)
m.fx=A.ay(J.m(o[0],"house_id"))
n=t.G.a(s.getElementById("bill-meter-search"))
if(n!=null){if(0>=o.length)return A.e(o,0)
s=A.h(J.m(o[0],"owner_name"))
if(0>=o.length)return A.e(o,0)
B.f.sJ(n,s+" ("+A.h(J.m(o[0],"account_number"))+")")}}}m.bv(m.fx)}else if(a===l||a===k||a===j)m.dt()},
bw(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=this,b5="has_reading",b6="main_tank_level",b7="turbidity_status",b8="var(--alert-green)",b9=".alert-widget-title",c0="var(--amber-safety)"
if(b4.a==null)return
s=document
r=s.getElementById("dash-worker-title")
if(r!=null)J.v(r,"Field Terminal: "+A.h(b4.a.h(0,"selected_zone")))
q=$.U()
p=q.cm("worker")
o=s.getElementById("worker-announcement-banner")
n=s.getElementById("worker-announcement-message")
m=s.getElementById("worker-announcement-tag")
if(o!=null&&n!=null)if(p!=null&&A.w(J.m(p,"message")).length!==0){l=J.D(p)
k=A.w(l.h(p,"message"))
J.v(n,k)
if(m!=null){j=l.h(p,"target_audience")
if(j==null)j="Everyone"
i=l.h(p,"author")
J.v(m,A.h(i==null?"Admin":i)+" \u2022 "+A.h(j))}h=o.style
h.display="flex"
g=A.h(l.h(p,"timestamp"))+"_"+k
if(b4.e!==g){b4.e=g
b4.by("WaterHall Announcement",k,"announcement")}}else{l=o.style
l.display="none"}f=q.a
e=q.b
d=q.c
c=s.getElementById("worker-tank-val")
b=s.getElementById("worker-safety-status")
a=s.getElementById("worker-turb-val")
a0=s.getElementById("worker-tds-val")
if(c!=null)J.v(c,J.n(e.h(0,b5),!1)||e.h(0,b6)==null?"N/A":A.h(e.h(0,b6))+"%")
if(a!=null)J.v(a,J.n(e.h(0,b5),!1)?"N/A":B.d.E(A.a2(e.h(0,"turbidity")),1))
if(a0!=null)J.v(a0,J.n(e.h(0,b5),!1)?"N/A":A.h(e.h(0,"tds_ppm")))
if(b!=null)if(J.n(e.h(0,b7),"warning")){J.v(b,"ALERT")
q=b.style
q.color="var(--alert-red)"}else{J.v(b,J.n(e.h(0,b5),!1)?"AWAITING DATA":"NO ALERT")
q=b.style
q.color=b8}q=A.G(f)
l=q.i("J<1>")
a1=A.ab(new A.J(f,q.i("I(1)").a(new A.jz()),l),l.i("f.E"))
a2=A.A([],t.hq)
if(J.n(e.h(0,b7),"warning")){q=t.N
B.b.m(a2,A.a5(["type","quality","name","Central Turbidity Alert","desc",A.w(e.h(0,"turbidity_desc"))],q,q))
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
q.color=c0}B.b.p(a1,new A.jA(b4,a7))
B.b.p(a2,new A.jB(b4,a7))}}a9=A.A(["Purok 1","Purok 2","Purok 3","Purok 4","Purok 5","Purok 6"],t.s)
new A.cj(a9,t.fO).p(0,new A.jC(b4,f))
b0=s.getElementById("dashboard-zone-grid")
if(b0!=null){J.dj(b0,"")
B.b.p(a9,new A.jD(b4,f,b0))}b1=s.getElementById("dash-log-count")
b2=s.getElementById("dash-log-list")
if(b2!=null){s=J.K(b2)
s.sO(b2,"")
b3=A.nx(d,0,A.cx(3,"count",t.S),A.G(d).c).an(0)
if(b1!=null)J.v(b1,""+d.length+" logged")
if(b3.length===0)s.sO(b2,'<div class="log-card" style="color:var(--text-muted)">No maintenance activity logged yet.</div>')
else B.b.p(b3,new A.jE(b4,f,b2))}},
aN(){var s,r,q,p,o,n,m=null,l=$.U().a,k=document,j=t.G.a(k.getElementById("dir-search")),i=t.Z,h=i.a(k.getElementById("filter-purok")),g=i.a(k.getElementById("filter-status"))
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
i=k.i("J<1>")
n=A.ab(new A.J(l,k.i("I(1)").a(new A.jG(s,r,q)),i),i.i("f.E"))
if(n.length===0){if(p!=null){k=p.style
k.display="block"}}else{if(p!=null){k=p.style
k.display="none"}B.b.p(n,new A.jH(this,o))}},
ca(a){var s,r,q,p,o,n,m,l,k,j
this.c=a
s=$.U()
r=s.ao(a)
if(r==null)return
q=document
p=q.getElementById("worker-res-name")
o=q.getElementById("worker-res-acct")
n=q.getElementById("worker-res-leak-status")
m=q.getElementById("worker-res-consumption")
l=q.getElementById("worker-res-total")
if(p!=null)J.v(p,A.ay(J.m(r,"owner_name")))
if(o!=null)J.v(o,A.ay(J.m(r,"account_number")))
k=s.bC(a)
j=k.length!==0?B.b.gaa(k):null
if(m!=null)J.v(m,j==null?"--":B.d.E(A.a2(J.m(j,"consumption")),3))
if(l!=null)J.v(l,j==null?"No billing record":B.d.E(A.a2(J.m(j,"total_due")),2))
if(n!=null){s=J.K(n)
if(J.n(J.m(r,"current_leak_status"),"leak")){s.sO(n,'<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--alert-red)"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> <span style="color:var(--alert-red);font-weight:700">Leak Alert Detected</span>')
s=n.style
s.backgroundColor="var(--alert-red-bg)"
s=n.style
s.border="1px solid var(--alert-red)"}else{s.sO(n,'<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--alert-green)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <span style="color:var(--alert-green);font-weight:700">No leak reported</span>')
s=n.style
s.backgroundColor="var(--alert-green-bg)"
s=n.style
s.border="1px solid rgba(16, 185, 129, 0.3)"}}this.a5("view-worker-resident-details")
s=q.getElementById("btn-back-to-dir")
if(s!=null){s=J.a8(s)
q=s.$ti
A.C(s.a,s.b,q.i("~(1)?").a(new A.jo(this)),!1,q.c)}},
dE(a){var s=document,r=s.getElementById("modal-leak-title"),q=s.getElementById("modal-leak-desc")
if(r==null||q==null)return
s=J.K(r)
if(a==="leak"){s.sV(r,"Leak status: LEAK REPORTED")
s=r.style
s.color="var(--alert-red)"
J.v(q,"A leak has been reported. Inspect the water line on site.")}else{s.sV(r,"Leak status: NO REPORT")
s=r.style
s.color="var(--alert-green)"
J.v(q,"No leak is currently reported. This is not an automatic sensor assessment.")}},
h_(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e="var(--amber-safety)",d={}
t.oT.a(a)
s=document.getElementById(b)
if(s==null)return
r=J.K(s)
r.sO(s,"")
if(a.length===0){r.sO(s,'<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:12px">No historic telemetry available.</div>')
return}q=B.d.dc(B.b.fV(a,new A.jU())*1.1,10,1000)
p=new A.cj(a,A.G(a).i("cj<1>"))
o=p.gau(p).am(0,new A.jV(a,q),t.c).an(0)
p=A.G(o)
n=p.i("c(1)")
p=p.i("a_<1,c>")
m=new A.a_(o,n.a(new A.jW()),p).Y(0," ")
if(0>=o.length)return A.e(o,0)
l=B.d.E(A.a2(J.m(o[0],"x")),1)
k=B.c.E(80,1)
p=new A.a_(o,n.a(new A.jX()),p).Y(0," ")
n=o.length
j=n-1
if(!(j>=0))return A.e(o,j)
j=B.d.E(A.a2(J.m(o[j],"x")),1)
n=B.c.E(80,1)
i=b==="resident-chart-container"
h=i?"res-chart-grad":"chart-area-grad"
g=i?"#3B82F6":e
f=i?"#3B82F6":e
d.a='      <svg width="100%" height="100%" viewBox="0 0 340 100" style="overflow:visible">\n        <defs>\n          <linearGradient id="'+h+'" x1="0" y1="0" x2="0" y2="1">\n            <stop offset="0%" stop-color="'+f+'" stop-opacity="0.3"/>\n            <stop offset="100%" stop-color="'+f+'" stop-opacity="0.0"/>\n          </linearGradient>\n        </defs>\n\n        <line x1="20" y1="20" x2="320" y2="20" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="50" x2="320" y2="50" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="80" x2="320" y2="80" stroke="#CBD5E1" stroke-width="1.5"/>\n\n        <path d="'+("M "+l+","+k+" "+p+(" L "+j+","+n+" Z"))+'" fill="url(#'+h+')" />\n        <polyline points="'+m+'" fill="none" stroke="'+g+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>\n    '
B.b.p(o,new A.jY(d,g))
r.sO(s,d.a+="</svg>")},
ds(a){var s,r,q,p,o,n=document.getElementById("modal-historical-logs")
if(n==null)return
s=J.K(n)
s.sO(n,"")
r=$.U().c
q=A.G(r)
p=q.i("J<1>")
o=A.ab(new A.J(r,q.i("I(1)").a(new A.jI(a)),p),p.i("f.E"))
if(o.length===0)s.sO(n,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous repair logs recorded for this meter.</div>')
else B.b.p(o,new A.jJ(this,n))},
cd(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this
if(f.a==null)return
s=document
r=s.getElementById("worker-name")
q=s.getElementById("worker-role")
p=s.getElementById("worker-zone-lbl")
o=s.getElementById("worker-avatar")
if(r!=null)J.v(r,A.ay(f.a.h(0,"name")))
if(q!=null)J.v(q,A.ay(f.a.h(0,"role")))
if(p!=null)J.v(p,"Assigned Zone: "+A.h(f.a.h(0,"selected_zone")))
if(o!=null){n=t.U
m=A.ab(new A.J(A.A(J.M(f.a.h(0,"name")).split(" "),t.s),t.Q.a(new A.jK()),n),n.i("f.E"))
n=A.G(m)
l=new A.a_(m,n.i("c(1)").a(new A.jL()),n.i("a_<1,c>")).Y(0,"")
n=l.length
J.v(o,B.a.n(l,0,n<2?n:2).toUpperCase())}n=$.U()
k=n.a.length
n=n.c
j=A.G(n)
i=new A.J(n,j.i("I(1)").a(new A.jM(f)),j.i("J<1>")).gj(0)
h=s.getElementById("profile-stat-total")
g=s.getElementById("profile-stat-logs")
if(h!=null)J.v(h,B.c.l(k))
if(g!=null)J.v(g,B.c.l(i))},
fE(){var s,r,q=this,p=document,o=t.G,n=o.a(p.getElementById("bill-meter-search")),m=p.getElementById("bill-meter-results"),l=o.a(p.getElementById("bill-curr-input")),k=t.q.a(p.getElementById("btn-save-bill"))
if(n==null)return
o=t.E
s=o.i("~(1)?")
o=o.c
A.C(n,"focus",s.a(new A.je(q)),!1,o)
A.C(n,"input",s.a(new A.jf(q)),!1,o)
if(l!=null)A.C(l,"input",s.a(new A.jg(q)),!1,o)
A.C(p,"click",t.b9.a(new A.jh(n,m)),!1,t.V)
if(k!=null){p=t.C
A.C(k,"click",p.i("~(1)?").a(new A.ji(q)),!1,p.c)}r=$.U().a
p=r.length
if(p!==0){if(0>=p)return A.e(r,0)
q.fx=A.ay(J.m(r[0],"house_id"))
if(0>=r.length)return A.e(r,0)
p=A.h(J.m(r[0],"owner_name"))
if(0>=r.length)return A.e(r,0)
B.f.sJ(n,p+" ("+A.h(J.m(r[0],"account_number"))+")")
q.bv(q.fx)}},
cr(){var s,r,q,p,o=document,n=t.G.a(o.getElementById("bill-meter-search")),m=o.getElementById("bill-meter-results")
if(n==null||m==null)return
o=n.value
s=o==null?null:B.a.t(o.toLowerCase())
if(s==null)s=""
r=$.U().a
o=A.G(r)
q=o.i("J<1>")
p=A.ab(new A.J(r,o.i("I(1)").a(new A.k2(s)),q),q.i("f.E"))
o=J.K(m)
o.sO(m,"")
if(p.length===0){o.sO(m,'<div class="search-result-item" style="color:var(--text-muted); cursor:default">No households found</div>')
o=m.style
o.display="block"
return}B.b.p(p,new A.k3(this,n,m))
o=m.style
o.display="block"},
bv(a){var s,r,q,p,o,n=this,m=a!=null
if(m)n.fx=a
s=n.fx
if(s==null)return
r=$.U()
if(r.ao(s)==null)return
s=document
q=s.getElementById("bill-prev-reading")
p=t.G.a(s.getElementById("bill-curr-input"))
s=n.fx
s.toString
o=r.dW(s)
if(q!=null)J.v(q,o==null?"--":B.d.E(o,3))
if(m&&p!=null)B.f.sJ(p,"")
n.bz()
m=n.fx
m.toString
n.fY(m)},
cw(){var s,r,q,p,o,n,m,l,k,j,i=null,h=t.N,g=t.z,f=A.ns($.U().w,h,g),e=document,d=e.getElementById("bill-prev-reading"),c=d==null?i:d.textContent
if(c==null)c=""
e=t.G.a(e.getElementById("bill-curr-input"))
if(e==null)s=i
else{e=e.value
e=e==null?i:B.a.t(e)
s=e}if(s==null)s=""
if(c==="--"||c.length===0||s.length===0)return i
r=A.dY(c)
q=A.dY(s)
if(!J.n(f.h(0,"configured"),!0)||r==null||q==null||!isFinite(r)||r<0||!isFinite(q)||q<0||q<r||q>1e6)return i
p=q*1000
e=B.d.aA(p)
if(Math.abs(p-e)>0.0001)return i
o=e-B.d.aA(r*1000)
if(o<0)return i
n=B.c.ae(B.c.dc(o-B.d.aA(A.bJ(A.h(f.h(0,"included_m3")))*1000),0,1e9)*B.d.aA(A.bJ(A.h(f.h(0,"excess_rate")))*100)+500,1000)
m=A.bJ(B.d.E((B.d.aA(A.bJ(A.h(f.h(0,"base_rate")))*100)+B.d.aA(A.bJ(A.h(f.h(0,"environmental_fee")))*100)+n)/100,2))
l=A.bJ(B.d.E(o/1000,3))
k=A.bJ(B.d.E(n/100,2))
j=A.bJ(B.d.E(q,3))
return A.a5(["previous_reading",A.bJ(B.d.E(r,3)),"current_reading",j,"consumption",l,"excess_charge",k,"total_due",m,"billing_config_version",f.h(0,"version")],h,g)},
bz(){var s,r,q,p,o,n,m,l="configured",k="consumption",j="total_due",i=$.U(),h=A.ns(i.w,t.N,t.z),g=this.cw(),f=new A.a9(Date.now(),0,!1),e=""+A.by(f)+"-"+B.a.a_(B.c.l(A.cl(f)),2,"0"),d=this.fx,c=d!=null&&i.c3(d,e)
i=new A.kb()
i.$2("bill-calc-base",J.n(h.h(0,l),!0)?A.h(h.h(0,"base_rate")):"--")
i.$2("bill-calc-fee",J.n(h.h(0,l),!0)?A.h(h.h(0,"environmental_fee")):"--")
i.$2("bill-rate-description",J.n(h.h(0,l),!0)?"Includes "+A.h(h.h(0,"included_m3"))+" m\xb3; excess at PHP "+A.h(h.h(0,"excess_rate"))+"/m\xb3.":"Admin must confirm billing rates before a bill can be recorded.")
d=g==null
i.$2("bill-calc-consumption",d?"0.000":B.d.E(A.a2(g.h(0,k)),3))
i.$2("bill-calc-excess",d?"0.00":B.d.E(A.a2(g.h(0,"excess_charge")),2))
i.$2("bill-calc-total",d?"--":B.d.E(A.a2(g.h(0,j)),2))
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
else if(!J.n(h.h(0,l),!0))n="Admin must confirm billing rates before issuing new bills."
else if(q.length===0)n="Enter current reading at or above previous reading (up to 3 decimal places)."
else if(o==null||!isFinite(o)||o<0)n="Enter a valid non-negative reading (up to 3 decimal places)."
else if(p!=null&&o<p)n="Current reading cannot be lower than previous reading ("+B.d.E(p,3)+" m\xb3)."
else n=d?"Reading format invalid. Up to 3 decimal places supported.":"Draft: "+B.d.E(A.a2(g.h(0,k)),3)+" m\xb3 | Total Due: \u20b1"+B.d.E(A.a2(g.h(0,j)),2)
i.$2("billing-alert-banner",n)
m=t.q.a(s.getElementById("btn-save-bill"))
if(m!=null){m.disabled=this.fy||c||d
i=m.style
i.toString
d=m.disabled
d.toString
d=d?"0.5":"1"
B.q.cR(i,B.q.cz(i,"opacity"),d,"")}},
b8(){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0
var $async$b8=A.T(function(a1,a2){if(a1===1){o.push(a2)
s=p}for(;;)switch(s){case 0:if(m.fy||m.fx==null||m.a==null){s=1
break}l=m.cw()
d=new A.a9(Date.now(),0,!1)
k=""+A.by(d)+"-"+B.a.a_(B.c.l(A.cl(d)),2,"0")
j=d.a4().a0()
if(l!=null){c=$.U()
b=m.fx
b.toString
b=c.c3(b,k)
c=b}else c=!0
if(c){s=1
break}c=$.U()
b=m.fx
b.toString
i=c.ao(b)
if(i==null){s=1
break}m.fy=!0
m.bz()
h=c.x
p=4
g=A.ns(l,t.N,t.z)
J.bi(g,"house_id",m.fx)
J.bi(g,"account_number",J.m(i,"account_number"))
J.bi(g,"billing_month",k)
J.bi(g,"date",j)
J.bi(g,"billed_by",m.a.h(0,"worker_id"))
s=7
return A.z(c.aG(g),$async$b8)
case 7:f=a2
if(h&&J.n(J.m(f,"is_synced"),!0))m.K("Bill successfully saved.")
else m.K("Bill saved offline. Pending synchronization.")
e=t.G.a(document.getElementById("bill-curr-input"))
if(e!=null)B.f.sJ(e,"")
g=m.fx
g.toString
m.bv(g)
m.cd()
n.push(6)
s=5
break
case 4:p=3
a0=o.pop()
m.K("Unable to save the reading. Check storage and your session.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.fy=!1
m.bz()
s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$b8,r)},
fY(a){var s,r,q=document.getElementById("billing-history-list")
if(q==null)return
s=J.K(q)
s.sO(q,"")
r=$.U().bC(a)
if(r.length===0)s.sO(q,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous invoice logs recorded.</div>')
else B.b.p(r,new A.jp(this,q))},
by(a,b,c){var s,r,q,p
if(b.length===0)return
try{s=$.dh().h(0,"NativeNotificationChannel")
if(s!=null){q=t.N
s.bZ("postMessage",A.A([B.e.T(A.a5(["title",a,"body",b,"type",c,"timestamp",new A.a9(Date.now(),0,!1).a0()],q,q))],t.s))}}catch(p){r=A.am(p)
A.bL("Native notification channel error: "+A.h(r))}try{q=!!window.Notification
q.toString
if(q&&A.oD()==="granted")A.oC(a,b,"logo.png")
else{q=!!window.Notification
q.toString
if(q&&A.oD()!=="denied")A.ri().cf(new A.ka(a,b),t.a)}}catch(p){}},
ct(a,b){var s=document,r=s.getElementById("app-toast"),q=s.getElementById("toast-text")
if(r!=null&&q!=null){J.v(q,a)
J.c7(r).m(0,"show")
s=this.go
if(s!=null)s.aI(0)
this.go=A.nz(A.la(b,0),new A.k7(r))}},
K(a){return this.ct(a,2500)},
cs(a){var s,r,q,p,o,n,m,l,k,j=this,i=t.d.a(window.location).href
i.toString
if(A.cn(i).gaw().h(0,"role")==="worker"){A.bL("[SECURITY] Worker application is forbidden from loading Resident Portal.")
return}j.d=a
window.localStorage.setItem("waterhall_resident_session",a)
j.a=null
i=window.localStorage
i.toString
B.j.B(i,"waterhall_session")
i=j.z
i===$&&A.aF()
J.c7(i).B(0,"active")
i=j.z.style
i.display="none"
i=j.fr
i===$&&A.aF()
new A.aU(i,A.y(i).i("aU<2>")).p(0,new A.k4())
i=j.cy
i===$&&A.aF()
i.setAttribute("style","display: none !important")
i=j.db
i===$&&A.aF()
i.setAttribute("style","display: flex !important")
i=j.dx
i===$&&A.aF()
if(i!=null){i=i.style
i.display="none"}s=$.U().ao(a)
if(s!=null){i=document
r=i.getElementById("resident-logout-name")
q=i.getElementById("resident-logout-role")
p=i.getElementById("resident-logout-avatar")
i=J.D(s)
o=i.h(s,"owner_name")
n=J.M(o==null?"":o)
if(r!=null)J.v(r,n.length!==0?n:a)
if(q!=null)J.v(q,A.h(i.h(s,"house_id"))+" \u2022 "+A.h(i.h(s,"purok")))
if(p!=null){i=t.U
m=A.ab(new A.J(A.A(n.split(" "),t.s),t.Q.a(new A.k5()),i),i.i("f.E"))
i=A.G(m)
l=new A.a_(m,i.i("c(1)").a(new A.k6()),i.i("a_<1,c>")).Y(0,"")
i=l.length
k=B.a.n(l,0,i<2?i:2).toUpperCase()
J.v(p,k.length!==0?k:"RES")}}j.a5("view-resident-home")},
dt(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6=this,c7=null,c8="has_reading",c9="main_tank_level",d0="turbidity",d1="var(--alert-red)",d2="var(--alert-green)",d3="owner_name",d4="house_id",d5="payment_location",d6="payment_method",d7="operating_hours",d8="payment_instructions",d9=c6.d
if(d9==null)return
s=$.U()
r=s.ao(d9)
if(r==null)return
q=s.cm("resident")
d9=document
p=d9.getElementById("resident-announcement-banner")
o=d9.getElementById("resident-announcement-message")
n=d9.getElementById("resident-announcement-tag")
if(p!=null&&o!=null)if(q!=null&&A.w(J.m(q,"message")).length!==0){m=J.D(q)
l=A.w(m.h(q,"message"))
J.v(o,l)
if(n!=null){k=m.h(q,"target_audience")
if(k==null)k="Everyone"
j=m.h(q,"author")
J.v(n,A.h(j==null?"Admin":j)+" \u2022 "+A.h(k))}i=p.style
i.display="flex"
h=A.h(m.h(q,"timestamp"))+"_"+l
if(c6.e!==h){c6.e=h
c6.by("WaterHall Announcement",l,"announcement")}}else{m=p.style
m.display="none"}g=s.b
f=d9.getElementById("resident-tank-val")
e=d9.getElementById("resident-turb-val")
d=d9.getElementById("resident-tds-val")
c=d9.getElementById("resident-safety-status")
if(f!=null)J.v(f,J.n(g.h(0,c8),!1)||g.h(0,c9)==null?"N/A":A.h(g.h(0,c9))+"%")
if(e!=null)J.v(e,J.n(g.h(0,c8),!1)?"N/A":B.d.E(A.a2(g.h(0,d0)),1))
if(d!=null)J.v(d,J.n(g.h(0,c8),!1)?"N/A":A.h(g.h(0,"tds_ppm")))
if(c!=null)if(J.n(g.h(0,"turbidity_status"),"warning")){J.v(c,"ALERT")
m=c.style
m.color=d1
b=B.d.E(A.a2(g.h(0,d0)),1)
a="turbidity_"+b
if(c6.f!==a){c6.f=a
c6.by("\u26a0\ufe0f WATER QUALITY ALERT","Water quality abnormal (Turbidity: "+b+" NTU). Follow local water authority guidance before using this supply.","critical")}}else{J.v(c,J.n(g.h(0,c8),!1)?"AWAITING DATA":"NO ALERT")
m=c.style
m.color=d2}a0=A.mC(g.h(0,c9))
if(!J.n(g.h(0,c8),!1)&&a0!=null&&a0<=20){m=A.h(a0)
a="low_water_"+m
if(c6.f!==a){c6.f=a
c6.by("\u26a0\ufe0f LOW WATER LEVEL ALERT","Reservoir is critically low ("+m+"% remaining). Please conserve water.","warning")}}a1=d9.getElementById("resident-profile-name-home")
a2=d9.getElementById("resident-profile-meta-home")
if(a1!=null)J.v(a1,A.ay(J.m(r,d3)))
if(a2!=null){m=J.D(r)
J.v(a2,"Resident: "+A.h(m.h(r,d4))+" | Meter: "+A.h(m.h(r,"account_number"))+" | "+A.h(m.h(r,"purok")))}a3=d9.getElementById("resident-logout-name")
a4=d9.getElementById("resident-logout-role")
a5=d9.getElementById("resident-logout-avatar")
m=J.D(r)
i=m.h(r,d3)
a6=J.M(i==null?"":i)
if(a3!=null)J.v(a3,A.ay(a6.length!==0?a6:m.h(r,d4)))
if(a4!=null)J.v(a4,A.h(m.h(r,d4))+" \u2022 "+A.h(m.h(r,"purok")))
if(a5!=null){i=t.U
a7=A.ab(new A.J(A.A(a6.split(" "),t.s),t.Q.a(new A.jN()),i),i.i("f.E"))
i=A.G(a7)
a8=new A.a_(a7,i.i("c(1)").a(new A.jO()),i.i("a_<1,c>")).Y(0,"")
i=a8.length
a9=B.a.n(a8,0,i<2?i:2).toUpperCase()
J.v(a5,a9.length!==0?a9:"RES")}b0=d9.getElementById("resident-leak-flag")
if(b0!=null){i=J.K(b0)
if(J.n(m.h(r,"current_leak_status"),"leak")){i.sO(b0,'          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n          <span>A leak has been reported. Please contact the water service team.</span>\n        ')
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
b1=s.bC(i)
b2=B.a.n(new A.a9(Date.now(),0,!1).a4().a0(),0,7)
i=A.G(b1)
b3=i.i("I(1)")
i=i.i("J<1>")
b4=i.i("f.E")
b5=A.ab(new A.J(b1,b3.a(new A.jP()),i),b4)
b6=A.ab(new A.J(b1,b3.a(new A.jQ(b2)),i),b4)
if(b5.length!==0)b7=B.b.gaa(b5)
else if(b6.length!==0)b7=B.b.gaa(b6)
else b7=b1.length!==0?B.b.gaa(b1):c7
i=b7==null
b3=i?c7:J.m(b7,"billing_breakdown")
t.eO.a(b3)
b4=new A.jR()
b8=new A.jS()
b4.$2("resident-bill-cycle",i?"No recorded cycle":A.h(J.m(b7,"billing_month")))
b4.$2("resident-bill-status",i?"No unpaid or current bill":A.h(J.m(b7,"status")))
b4.$2("resident-prev-reading",b8.$2(i?c7:J.m(b7,"previous_reading"),3))
b4.$2("resident-curr-reading",b8.$2(i?c7:J.m(b7,"current_reading"),3))
b4.$2("resident-calc-consumption",b8.$2(i?c7:J.m(b7,"consumption"),3))
b4.$2("resident-calc-total",b8.$2(i?c7:J.m(b7,"total_due"),2))
b9=b3==null
b4.$2("resident-calc-base",b8.$2(b9?c7:J.m(b3,"base_rate"),2))
b4.$2("resident-calc-fee",b8.$2(b9?c7:J.m(b3,"environmental_fee"),2))
b4.$2("resident-calc-excess",b8.$2(b9?c7:J.m(b3,"excess_charge"),2))
if(i)c0=c7
else{b8=J.m(b7,"payment_date")
b8=b8==null?c7:J.M(b8)
c0=b8}if(c0==null)c0=""
b4.$2("resident-payment-date",!i&&A.h(J.m(b7,"status")).toLowerCase()==="paid"&&c0.length!==0?c0:"Not paid")
if(i)i="No billing record is on file yet. Amounts appear here after a Worker saves a meter reading."
else if(b9)i="Legacy bill: original total preserved; rate breakdown unavailable."
else{i=J.D(b3)
b3="Recorded rates: first "+A.h(i.h(b3,"included_m3"))+" m\xb3 included; excess PHP "+A.h(i.h(b3,"excess_rate"))+"/m\xb3."
i=b3}b4.$2("resident-rate-description",i)
c6.h_(A.aJ(t.R.a(m.h(r,"monthly_history")),!0,t.w),"resident-chart-container")
c6.fZ(b1)
c1=s.r
c2=d9.getElementById("res-payment-location")
c3=d9.getElementById("res-payment-method")
c4=d9.getElementById("res-payment-hours")
c5=d9.getElementById("res-payment-instructions")
if(c2!=null&&c1.I(0,d5)){d9=c1.h(0,d5)
d9.toString
J.v(c2,d9)}if(c3!=null&&c1.I(0,d6)){d9=c1.h(0,d6)
d9.toString
J.v(c3,d9)}if(c4!=null&&c1.I(0,d7)){d9=c1.h(0,d7)
d9.toString
J.v(c4,d9)}if(c5!=null&&c1.I(0,d8)){d9=c1.h(0,d8)
d9.toString
J.v(c5,d9)}},
fZ(a){var s,r
t.p.a(a)
s=document.getElementById("resident-history-list")
if(s==null)return
r=J.K(s)
r.sO(s,"")
if(a.length===0){r.sO(s,'<div class="empty-state" style="padding:16px;text-align:center;color:var(--text-muted);font-size:13px;">No billing history is on file for this household yet.</div>')
return}B.b.p(a,new A.jT(this,s))},
eI(){var s,r=document,q=r.getElementById("btn-open-register-modal"),p=r.getElementById("register-user-modal"),o=t.dD.a(r.getElementById("resident-register-form")),n=r.getElementById("register-status"),m=t.q.a(r.getElementById("btn-submit-register"))
if(A.nC().gaw().h(0,"role")==="resident")if(q!=null){s=q.style
s.display="block"}s=t.h
A.mR(s,s,"T","querySelectorAll")
s=r.querySelectorAll("[data-toggle-password]")
s.toString
s=new A.bG(s,t.k)
s.p(s,new A.iK())
r=r.getElementById("btn-close-register-modal")
if(r!=null){r=J.a8(r)
s=r.$ti
A.C(r.a,r.b,s.i("~(1)?").a(new A.iL(p)),!1,s.c)}if(q!=null){r=J.a8(q)
s=r.$ti
A.C(r.a,r.b,s.i("~(1)?").a(new A.iM(p,n)),!1,s.c)}if(o!=null){r=t.E
A.C(o,"submit",r.i("~(1)?").a(new A.iN(m,o,n)),!1,r.c)}},
eu(){var s,r,q,p,o,n,m,l,k,j=this,i="change",h=document,g=h.getElementById("btn-open-collect-modal"),f=h.getElementById("modal-collect-payment"),e=h.getElementById("btn-collect-cancel"),d=t.q.a(h.getElementById("btn-collect-confirm")),c=t.G.a(h.getElementById("collect-amount-input")),b=t.Z.a(h.getElementById("collect-payment-method"))
if(g!=null){s=J.a8(g)
r=s.$ti
A.C(s.a,s.b,r.i("~(1)?").a(new A.ir(j)),!1,r.c)}if(e!=null){s=J.a8(e)
r=s.$ti
A.C(s.a,s.b,r.i("~(1)?").a(new A.is(f)),!1,r.c)}if(d!=null){s=t.C
A.C(d,"click",s.i("~(1)?").a(new A.it(j,c,b,d,f)),!1,s.c)}s=t.iC
q=s.a(h.getElementById("resident-gallery-input"))
p=s.a(h.getElementById("resident-camera-input"))
o=s.a(h.getElementById("resident-photo-input"))
s=new A.iI(j)
$.dh().k(0,"waterhallPhotoPickerResult",A.u9(new A.iy(j,s),t.Y))
r=new A.iH(j)
n=new A.iq(j,q,p,o)
s=new A.iG(j,n,s)
if(q!=null){m=t.E
A.C(q,i,m.i("~(1)?").a(new A.iz(s,q)),!1,m.c)}if(p!=null){m=t.E
A.C(p,i,m.i("~(1)?").a(new A.iA(s,p)),!1,m.c)}if(o!=null){m=t.E
A.C(o,i,m.i("~(1)?").a(new A.iB(s,o)),!1,m.c)}s=h.getElementById("btn-resident-gallery-trigger")
if(s!=null){s=J.a8(s)
m=s.$ti
A.C(s.a,s.b,m.i("~(1)?").a(new A.iC(r,q)),!1,m.c)}s=h.getElementById("btn-resident-camera-trigger")
if(s!=null){s=J.a8(s)
m=s.$ti
A.C(s.a,s.b,m.i("~(1)?").a(new A.iD(r,p)),!1,m.c)}s=h.getElementById("btn-resident-photo-trigger")
if(s!=null){s=J.a8(s)
m=s.$ti
A.C(s.a,s.b,m.i("~(1)?").a(new A.iE(q)),!1,m.c)}s=h.getElementById("btn-resident-photo-replace-gallery")
if(s!=null){s=J.a8(s)
m=s.$ti
A.C(s.a,s.b,m.i("~(1)?").a(new A.iF(r,q)),!1,m.c)}s=h.getElementById("btn-resident-photo-replace-camera")
if(s!=null){s=J.a8(s)
m=s.$ti
A.C(s.a,s.b,m.i("~(1)?").a(new A.iu(r,p)),!1,m.c)}s=h.getElementById("btn-resident-photo-remove")
if(s!=null){s=J.a8(s)
r=s.$ti
A.C(s.a,s.b,r.i("~(1)?").a(new A.iv(j,n)),!1,r.c)}l=h.getElementById("btn-resident-submit-log")
if(l!=null){s=J.a8(l)
r=s.$ti
A.C(s.a,s.b,r.i("~(1)?").a(new A.iw(j,n)),!1,r.c)}k=h.getElementById("btn-retry-db-connection")
if(k!=null){h=J.a8(k)
s=h.$ti
A.C(h.a,h.b,s.i("~(1)?").a(new A.ix(j)),!1,s.c)}}}
A.jn.prototype={
$0(){var s,r,q,p,o=document.getElementById("phone-time")
if(o!=null){s=new A.a9(Date.now(),0,!1)
r=A.bX(s)
q=B.a.a_(B.c.l(A.cP(s)),2,"0")
p=r>=12?"PM":"AM"
r=B.c.ap(r,12)
J.v(o,""+(r!==0?r:12)+":"+q+" "+p)}},
$S:2}
A.jj.prototype={
$1(a){t.I.a(a)
return this.a.$0()},
$S:34}
A.jk.prototype={
$1(a){var s,r,q=this.a
q.ar()
q.w=q.c=q.d=q.a=null
s=document
r=s.getElementById("collection-review-modal")
if(r!=null)J.io(r)
r=s.getElementById("modal-collect-payment")
if(r!=null){r=r.style
r.display="none"}q.b2()
if(a)q.ah("Session expired. Please sign in again.",s.getElementById("login-error-msg"))},
$S:39}
A.jl.prototype={
$1(a){this.a.d1(t.P.a(a))},
$S:5}
A.jm.prototype={
$1(a){return this.dU(t.I.a(a))},
dU(a){var s=0,r=A.S(t.H),q,p=this,o,n,m
var $async$$1=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:m=p.a
s=m.a!=null||m.d!=null?3:4
break
case 3:o=m.d!=null?"resident":"worker"
n=$.U()
s=5
return A.z(n.aM(o),$async$$1)
case 5:if(!n.N()){s=1
break}if(m.d!=null)m.dt()
else{n=m.b
if(n==="view-dashboard")m.bw()
else if(n==="view-directory")m.aN()}case 4:case 1:return A.Q(q,r)}})
return A.R($async$$1,r)},
$S:41}
A.iT.prototype={
$1(a){t.V.a(a)
return this.a.cS()},
$S:1}
A.iP.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.iQ.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.iR.prototype={
$1(a){return this.dN(t.V.a(a))},
dN(a){var s=0,r=A.S(t.H),q=this,p
var $async$$1=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:q.b.disabled=!0
p=$.U()
s=2
return A.z(p.a6(),$async$$1)
case 2:s=3
return A.z(p.aq(),$async$$1)
case 3:if(p.N())q.a.cS()
return A.Q(null,r)}})
return A.R($async$$1,r)},
$S:4}
A.iS.prototype={
$1(a){t.V.a(a)
return B.a_.dr(this.a)},
$S:1}
A.iW.prototype={
$1(a){var s,r,q,p
t.V.a(a).preventDefault()
s=document
r=t.G.a(s.getElementById("login-password"))
q=s.getElementById("web-eye-show")
p=s.getElementById("web-eye-hide")
if(r!=null)if(r.type==="password"){B.f.sci(r,"text")
if(q!=null){s=q.style
s.display="none"}if(p!=null){s=p.style
s.display="block"}s=this.a.style
s.color="#F4D03F"}else{B.f.sci(r,"password")
if(q!=null){s=q.style
s.display="block"}if(p!=null){s=p.style
s.display="none"}s=this.a.style
s.color="var(--text-muted)"}},
$S:1}
A.iX.prototype={
$1(a){return this.dT(t.V.a(a))},
dT(a9){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
var $async$$1=A.T(function(b0,b1){if(b0===1){o.push(b1)
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
i=A.cn(a).gaw().h(0,"role")
if(J.ag(l)===0||J.ag(k)===0){m.a.ah("Both Username and Password are required.",m.e)
s=1
break}a=m.f
a.disabled=!0
p=4
a3=$.U()
a4=t.N
s=7
return A.z(a3.a9("/api/login",!1,"POST",A.a5(["Content-Type","application/json"],a4,a4),B.e.T(A.a5(["username",l,"password",k],a4,a4))),$async$$1)
case 7:h=b1
a5=h.responseText
a5.toString
g=t.P.a(B.e.L(0,a5))
f=A.w(J.m(g,"access_token"))
e=A.w(J.m(g,"role"))
d=A.w(J.m(g,"id"))
c=A.w(J.m(g,"name"))
a5=!0
if(!J.n(e,"admin"))if(!(J.n(i,"resident")&&!J.n(e,"resident")))a5=!J.n(i,"resident")&&!J.n(e,"worker")
if(a5){m.a.ah("Use the portal assigned to your account role.",m.e)
n=[1]
s=5
break}a3.dd()
a5=m.a
a5.w=null
s=8
return A.z(a3.aS(f),$async$$1)
case 8:s=9
return A.z(A.dg(),$async$$1)
case 9:s=10
return A.z(a3.b4(),$async$$1)
case 10:if(a3.N()){a3=window.localStorage.getItem("waterhall_jwt")
a6=f
a6=a3==null?a6!=null:a3!==a6
a3=a6}else a3=!0
if(a3){n=[1]
s=5
break}if(J.n(e,"resident")){if(J.n(i,"worker")){a5.ah("This terminal is for Field Workers only. Residents must use the Resident App.",m.e)
n=[1]
s=5
break}a3=window.localStorage
a3.toString
B.j.B(a3,"waterhall_session")
a5.a=null
a5.cs(d)
a5.ar()
a5.be("resident")
a3=m.e
if(a3!=null){a3=a3.style
a3.display="none"}a5.K(B.a.cl("Logged in as Resident: ",c))
n=[1]
s=5
break}else{if(J.n(i,"resident")){a5.ah("This portal is for Residents only. Field Workers must use the Worker App.",m.e)
n=[1]
s=5
break}a3=J.ag(j)!==0?j:"Purok 1"
a4=A.a5(["worker_id",d,"name",c,"role","Collector","selected_zone",a3],a4,t.z)
a5.a=a4
a3=window.localStorage
a3.toString
a3.setItem("waterhall_session",B.e.T(a4))
a4=window.localStorage
a4.toString
B.j.B(a4,"waterhall_resident_session")
a5.ar()
a5.be("worker")
a3=m.e
if(a3!=null){a3=a3.style
a3.display="none"}a3=a5.a
a3.toString
a5.cq(a3)
a5.K(B.a.cl("Logged in as Tech: ",c))
n=[1]
s=5
break}n.push(6)
s=5
break
case 4:p=3
a8=o.pop()
a3=A.am(a8)
if(a3 instanceof A.aS){b=a3
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
case 6:a=$.U().y==="Session expired. Please sign in again."?"Session expired. Please sign in again.":"Unable to sign in. Check your credentials and connection. Existing offline sessions resume when the app opens."
m.a.ah(a,m.e)
case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$$1,r)},
$S:4}
A.iY.prototype={
$1(a){return this.dS(t.V.a(a))},
dS(a){var s=0,r=A.S(t.H),q=this,p
var $async$$1=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:p=q.a
p.ar()
s=2
return A.z($.U().de(),$async$$1)
case 2:p.K("Signed out of Tech session")
return A.Q(null,r)}})
return A.R($async$$1,r)},
$S:4}
A.j5.prototype={
$1(a){return this.dR(t.V.a(a))},
dR(a){var s=0,r=A.S(t.H),q=this,p
var $async$$1=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:p=q.a
p.ar()
s=2
return A.z($.U().de(),$async$$1)
case 2:p.K("Signed out of Resident Portal")
return A.Q(null,r)}})
return A.R($async$$1,r)},
$S:4}
A.j6.prototype={
$1(a){var s,r
t.h.a(a)
s=J.a8(a)
r=s.$ti
A.C(s.a,s.b,r.i("~(1)?").a(new A.iV(this.a,a)),!1,r.c)},
$S:10}
A.iV.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.b.getAttribute("data-target")
if(s==null)s=""
this.a.a5(s)},
$S:1}
A.j7.prototype={
$1(a){return this.a.aN()},
$S:3}
A.j8.prototype={
$1(a){return this.a.aN()},
$S:3}
A.j9.prototype={
$1(a){return this.a.aN()},
$S:3}
A.ja.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.a5("view-directory")
s.c=null},
$S:1}
A.jb.prototype={
$1(a){A.pt(t.V.a(a).target)},
$S:1}
A.jc.prototype={
$1(a){var s=0,r=A.S(t.H),q,p=this,o,n,m,l,k,j
var $async$$1=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:k=p.a
j=k.c
if(j==null){s=1
break}o=p.b.checked
n=o===!0?"leak":"normal"
s=3
return A.z($.U().b6(j,n),$async$$1)
case 3:if(c!=null){j=document
m=j.getElementById("modal-flow-rate")
if(m!=null)J.v(m,"Manual report")
k.dE(n)
k.K(n==="leak"?"Leak status saved for synchronization.":"Resolved status saved for synchronization.")
o=k.c
o.toString
k.ds(o)
l=t.aa.a(j.getElementById("log-resolved"))
if(l!=null)B.f.sd9(l,n==="normal")}case 1:return A.Q(q,r)}})
return A.R($async$$1,r)},
$S:21}
A.iZ.prototype={
$1(a){return this.dQ(t.V.a(a))},
dQ(a){var s=0,r=A.S(t.H),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$$1=A.T(function(b,a0){if(b===1)return A.P(a0,r)
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
if(l.length===0){c.K("Please detail the maintenance actions taken.")
s=1
break}g=A.a5(["house_id",c.c,"worker_id",c.a.h(0,"worker_id"),"purok",c.a.h(0,"selected_zone"),"description",l,"status_resolved",h,"date",new A.a9(Date.now(),0,!1).a4().a0()],t.N,t.z)
i=$.U()
s=3
return A.z(i.bj(g),$async$$1)
case 3:s=h?4:5
break
case 4:f=c.c
f.toString
s=6
return A.z(i.b6(f,"normal"),$async$$1)
case 6:e=k.a(o.getElementById("modal-leak-toggle"))
if(e!=null)B.f.sd9(e,!1)
c.dE("normal")
case 5:k=c.c
k.toString
if(i.ao(k)!=null){d=o.getElementById("modal-flow-rate")
if(d!=null)J.v(d,"Manual reading")}if(!m)B.l.sJ(n,"")
c.K("Maintenance Log committed to database!")
o=c.c
o.toString
c.ds(o)
c.bw()
case 1:return A.Q(q,r)}})
return A.R($async$$1,r)},
$S:4}
A.j_.prototype={
$1(a){var s,r,q,p,o,n="selected_zone"
t.V.a(a)
s=this.a
if(s.a==null)return
r=document
q=t.Z
p=q.a(r.getElementById("filter-purok"))
o=q.a(r.getElementById("filter-status"))
if(p!=null)B.k.sJ(p,A.ay(s.a.h(0,n)))
if(o!=null)B.k.sJ(o,"leak")
s.a5("view-directory")
s.K("Showing leaks in your assigned patrol zone "+A.h(s.a.h(0,n)))},
$S:1}
A.j0.prototype={
$1(a){var s
t.V.a(a)
s=$.U().r.h(0,"emergency_contact")
if(s==null)s="Emergency contact is not configured; contact the Barangay office."
this.a.ct(s,6000)},
$S:1}
A.j1.prototype={
$1(a){return this.dP(t.V.a(a))},
dP(a){var s=0,r=A.S(t.H),q,p=this,o,n,m,l,k,j,i
var $async$$1=A.T(function(b,c){if(b===1)return A.P(c,r)
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
if(l.length===0){i.K("Message cannot be empty")
s=1
break}s=3
return A.z($.U().bh(l,A.w(i.a.h(0,"name")),j),$async$$1)
case 3:if(!o)B.l.sJ(n,"")
i.K("Announcement queued for "+j+". Pending items retry when online.")
case 1:return A.Q(q,r)}})
return A.R($async$$1,r)},
$S:4}
A.j2.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.a
if(s!=null){s=s.style
s.display="flex"}},
$S:1}
A.j3.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.j4.prototype={
$1(a){return this.dO(t.V.a(a))},
dO(a8){var s=0,r=A.S(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
var $async$$1=A.T(function(a9,b0){if(a9===1){o.push(b0)
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
if(J.ag(g)===0||J.ag(f)===0||J.ag(e)===0){if(j!=null){J.v(j,"All fields are required.")
b=j.style
b.display="block"}s=1
break}p=4
b=$.U()
a0=t.N
a5=B.e.T(A.a5(["role",h,"username",g,"reset_token",f,"new_password",e],a0,a0))
s=7
return A.z(b.a9("/api/recover-account",!1,"POST",A.a5(["Content-Type","application/json"],a0,a0),a5),$async$$1)
case 7:d=b0
if(d.status===200){b=d.responseText
c=B.e.L(0,b==null?"{}":b)
if(i!=null){b=J.m(c,"message")
J.v(i,A.ay(b==null?"Password reset successfully!":b))
b=i.style
b.display="block"}if(m!=null)B.f.sJ(m,"")
if(l!=null)B.f.sJ(l,"")
if(k!=null)B.f.sJ(k,"")
A.r5(A.la(0,2),new A.iU(n.a,i),t.a)}p=2
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
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$$1,r)},
$S:4}
A.iU.prototype={
$0(){var s=this.a
if(s!=null){s=s.style
s.display="none"}s=this.b
if(s!=null){s=s.style
s.display="none"}},
$S:15}
A.jd.prototype={
$1(a){return J.c7(t.h.a(a)).B(0,"active")},
$S:10}
A.jZ.prototype={
$1(a){return J.c7(t.h.a(a)).B(0,"active")},
$S:10}
A.k_.prototype={
$1(a){return B.a.t(A.w(a)).length!==0},
$S:8}
A.k0.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:9}
A.k8.prototype={
$1(a){var s
t.h.a(a)
s=J.K(a)
if(a.getAttribute("data-target")===this.a)s.gak(a).m(0,"active")
else s.gak(a).B(0,"active")},
$S:10}
A.k9.prototype={
$2(a,b){var s
A.w(a)
t.h.a(b)
s=J.K(b)
if(a===this.a)s.gak(b).m(0,"active")
else s.gak(b).B(0,"active")},
$S:47}
A.jz.prototype={
$1(a){return J.n(J.m(t.P.a(a),"current_leak_status"),"leak")},
$S:0}
A.jA.prototype={
$1(a){var s,r,q
t.P.a(a)
s=document.createElement("div")
s.className="alert-item leak"
r=s.style
r.cursor="pointer"
r=J.D(a)
q=J.K(s)
q.sO(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.h(r.h(a,"owner_name"))+" ("+A.h(r.h(a,"purok"))+")</strong><br>\n              Reported leak. Field inspection required.\n            </div>\n          ")
q=q.gav(s)
r=q.$ti
A.C(q.a,q.b,r.i("~(1)?").a(new A.jy(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:5}
A.jy.prototype={
$1(a){t.V.a(a)
this.a.ca(A.w(J.m(this.b,"house_id")))},
$S:1}
A.jB.prototype={
$1(a){var s,r,q
t.J.a(a)
s=document.createElement("div")
s.className="alert-item quality"
r=s.style
r.cursor="pointer"
r=J.D(a)
q=J.K(s)
q.sO(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.h(r.h(a,"name"))+"</strong><br>\n              "+A.h(r.h(a,"desc"))+"\n            </div>\n          ")
q=q.gav(s)
r=q.$ti
A.C(q.a,q.b,r.i("~(1)?").a(new A.jx(this.a)),!1,r.c)
this.b.appendChild(s).toString},
$S:48}
A.jx.prototype={
$1(a){t.V.a(a)
this.a.a5("view-assets")},
$S:1}
A.jC.prototype={
$2(a,b){var s,r,q,p,o,n
A.w(b)
s=document.getElementById("pin-p"+(a+1))
if(s!=null){r=s.querySelector(".pin-bg")
q=B.b.a8(this.b,new A.jv(b))
if(r!=null)if(q){r.setAttribute("fill","var(--alert-red)")
r.setAttribute("stroke","#FFF")
r.setAttribute("stroke-width","1.5")}else{r.setAttribute("fill","var(--alert-green)")
r.removeAttribute("stroke")}p=s.style
p.cursor="pointer"
p=J.K(s)
o=t.h.a(p.fm(s,!0))
p.dv(s,o)
p=J.a8(o)
n=p.$ti
A.C(p.a,p.b,n.i("~(1)?").a(new A.jw(this.a,b)),!1,n.c)}},
$S:49}
A.jv.prototype={
$1(a){var s
t.P.a(a)
s=J.D(a)
return J.n(s.h(a,"purok"),this.a)&&J.n(s.h(a,"current_leak_status"),"leak")},
$S:0}
A.jw.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Z
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.k.sJ(q,this.b)
if(p!=null)B.k.sJ(p,"all")
this.a.a5("view-directory")},
$S:1}
A.jD.prototype={
$1(a){var s,r,q,p,o,n,m,l
A.w(a)
s=this.b
r=A.G(s)
q=r.i("I(1)")
r=r.i("J<1>")
p=new A.J(s,q.a(new A.js(a)),r).gj(0)
o=new A.J(s,q.a(new A.jt(a)),r).gj(0)
r=this.a
n=J.n(r.a.h(0,"selected_zone"),a)
m=document.createElement("div")
m.className="zone-card "+(n?"assigned":"")
s=n?'<span class="zone-badge">ASSIGNED</span>':""
q=o>0?""+o+" Leaks":"Clear"
l=J.K(m)
l.sO(m,'          <div class="zone-card-header">\n            <span class="zone-name">'+a+"</span>\n            "+s+'\n          </div>\n          <div class="zone-stats">\n            <span>Meters: <strong>'+p+'</strong></span>\n            <span class="zone-leak-count">'+q+"</span>\n          </div>\n        ")
l=l.gav(m)
q=l.$ti
A.C(l.a,l.b,q.i("~(1)?").a(new A.ju(r,a)),!1,q.c)
this.c.appendChild(m).toString},
$S:24}
A.js.prototype={
$1(a){return J.n(J.m(t.P.a(a),"purok"),this.a)},
$S:0}
A.jt.prototype={
$1(a){var s
t.P.a(a)
s=J.D(a)
return J.n(s.h(a,"purok"),this.a)&&J.n(s.h(a,"current_leak_status"),"leak")},
$S:0}
A.ju.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Z
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.k.sJ(q,this.b)
if(p!=null)B.k.sJ(p,"all")
this.a.a5("view-directory")},
$S:1}
A.jE.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i
t.P.a(a)
s=B.b.df(this.b,new A.jq(a),new A.jr())
r=J.D(s)
q=r.gR(s)?r.h(s,"owner_name"):"Unknown Household"
p=document.createElement("div")
r=J.D(a)
p.className="log-card "+(J.n(r.h(a,"status_resolved"),!0)?"resolved":"pending")
o=r.h(a,"date")
o=A.dn(J.M(o==null?"":o))
n=o==null?null:o.bx()
if(n==null)m="Unknown date"
else{l=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
k=B.c.ap(A.bX(n),12)===0?12:B.c.ap(A.bX(n),12)
j=B.a.a_(B.c.l(A.cP(n)),2,"0")
i=A.bX(n)>=12?"PM":"AM"
o=A.cl(n)-1
if(!(o>=0&&o<12))return A.e(l,o)
m=l[o]+" "+A.dV(n)+" "+k+":"+j+" "+i}J.dj(p,'            <div class="log-card-header">\n              <span>'+A.h(q)+'</span>\n              <span style="font-size:10px; color:var(--text-muted)">'+m+'</span>\n            </div>\n            <div class="log-card-desc">'+A.h(r.h(a,"description"))+"</div>\n          ")
this.c.appendChild(p).toString},
$S:5}
A.jq.prototype={
$1(a){var s="house_id"
return J.n(J.m(t.P.a(a),s),J.m(this.a,s))},
$S:0}
A.jr.prototype={
$0(){return A.an(t.N,t.z)},
$S:28}
A.jG.prototype={
$1(a){var s,r,q,p,o
t.P.a(a)
s=J.D(a)
r=this.a
q=B.a.A(J.M(s.h(a,"owner_name")).toLowerCase(),r)||B.a.A(J.M(s.h(a,"account_number")).toLowerCase(),r)||B.a.A(J.M(s.h(a,"house_id")).toLowerCase(),r)
r=this.b
p=r==="all"||J.n(s.h(a,"purok"),r)
r=this.c
o=r==="all"||J.n(s.h(a,"current_leak_status"),r)
return q&&p&&o},
$S:0}
A.jH.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j="current_leak_status",i="current_m3_usage"
t.P.a(a)
s=document.createElement("div")
r=J.D(a)
s.className="household-card "+(J.n(r.h(a,j),"leak")?"has-leak":"")
q=A.h(r.h(a,"owner_name"))
p=A.h(r.h(a,"purok"))
o=A.h(r.h(a,"account_number"))
n=A.h(r.h(a,i))
m=A.h(r.h(a,j))
l=J.n(r.h(a,j),"leak")?'<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> Leak':'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Normal'
k=J.K(s)
k.sO(s,'          <div class="household-info">\n            <span class="household-name">'+q+'</span>\n            <div class="household-meta">\n              <span class="household-purok">'+p+'</span>\n              <span class="household-acct">'+o+'</span>\n            </div>\n            <div class="household-usage">Usage this Month: <strong>'+n+' m\xb3</strong></div>\n          </div>\n          <div class="household-status-section">\n            <span class="status-indicator '+m+'">\n              '+l+'\n            </span>\n            <span class="household-flow">Meter: <span>'+A.h(r.h(a,i))+" m\xb3</span></span>\n          </div>\n        ")
k=k.gav(s)
r=k.$ti
A.C(k.a,k.b,r.i("~(1)?").a(new A.jF(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:5}
A.jF.prototype={
$1(a){t.V.a(a)
this.a.ca(A.w(J.m(this.b,"house_id")))},
$S:1}
A.jo.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.a5("view-directory")
s.c=null},
$S:1}
A.jU.prototype={
$2(a,b){A.a2(a)
A.a2(b)
return a>b?a:b},
$S:51}
A.jV.prototype={
$1(a){var s,r,q
t.if.a(a)
s=a.a
r=a.b
q=this.a.length
return A.a5(["x",20+(q===1?0.5:s/(q-1))*300,"y",80-r/this.b*60,"val",r,"label",""+(s+1)],t.N,t.K)},
$S:52}
A.jW.prototype={
$1(a){var s
t.c.a(a)
s=J.D(a)
return B.d.E(A.a2(s.h(a,"x")),1)+","+B.d.E(A.a2(s.h(a,"y")),1)},
$S:29}
A.jX.prototype={
$1(a){var s
t.c.a(a)
s=J.D(a)
return"L "+B.d.E(A.a2(s.h(a,"x")),1)+","+B.d.E(A.a2(s.h(a,"y")),1)},
$S:29}
A.jY.prototype={
$1(a){var s,r
t.c.a(a)
s=this.a
r=J.D(a)
s.a=s.a+('        <text x="'+A.h(r.h(a,"x"))+'" y="96" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-weight="600">'+A.h(r.h(a,"label"))+'</text>\n        <line x1="'+A.h(r.h(a,"x"))+'" y1="'+A.h(r.h(a,"y"))+'" x2="'+A.h(r.h(a,"x"))+'" y2="80" stroke="rgba(249,115,22,0.2)" stroke-width="1" stroke-dasharray="2 2" />\n        <circle cx="'+A.h(r.h(a,"x"))+'" cy="'+A.h(r.h(a,"y"))+'" r="4" fill="var(--white)" stroke="'+this.b+'" stroke-width="2" />\n        <text x="'+A.h(r.h(a,"x"))+'" y="'+A.h(A.a2(r.h(a,"y"))-8)+'" text-anchor="middle" fill="var(--navy-primary)" font-size="9" font-weight="700">'+A.h(r.h(a,"val"))+"m\xb3</text>\n      ")},
$S:54}
A.jI.prototype={
$1(a){return J.n(J.m(t.P.a(a),"house_id"),this.a)},
$S:0}
A.jJ.prototype={
$1(a){var s,r,q,p,o,n,m,l="status_resolved"
t.P.a(a)
s=document.createElement("div")
r=J.D(a)
s.className="log-card "+(J.n(r.h(a,l),!0)?"resolved":"pending")
q=r.h(a,"date")
q=A.dn(J.M(q==null?"":q))
p=q==null?null:q.bx()
o=p==null?"Unknown date":""+A.cl(p)+"/"+A.dV(p)+"/"+A.by(p)+" @ "+B.a.a_(B.c.l(A.bX(p)),2,"0")+":"+B.a.a_(B.c.l(A.cP(p)),2,"0")
q=A.h(r.h(a,"worker_id"))
n=A.h(r.h(a,"description"))
m=J.n(r.h(a,l),!0)?"var(--alert-green)":"var(--amber-safety)"
r=J.n(r.h(a,l),!0)?"Resolved":"In Progress (Active Monitoring)"
J.dj(s,'          <div class="log-card-header">\n            <span>Tech: <strong>'+q+'</strong></span>\n            <span style="font-size:10px; color:var(--text-muted)">'+o+'</span>\n          </div>\n          <div class="log-card-desc">'+n+'</div>\n          <div style="font-size: 9px; font-weight:700; color:'+m+'; margin-top:4px; text-transform:uppercase">\n            Status: '+r+"\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:5}
A.jK.prototype={
$1(a){return B.a.t(A.w(a)).length!==0},
$S:8}
A.jL.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:9}
A.jM.prototype={
$1(a){var s,r="worker_id"
t.P.a(a)
s=J.D(a)
return J.n(s.h(a,r),this.a.a.h(0,r))&&J.n(s.h(a,"status_resolved"),!0)},
$S:0}
A.je.prototype={
$1(a){return this.a.cr()},
$S:3}
A.jf.prototype={
$1(a){return this.a.cr()},
$S:3}
A.jg.prototype={
$1(a){return this.a.bz()},
$S:3}
A.jh.prototype={
$1(a){var s=t.mV.a(A.pt(t.V.a(a).target)),r=!1
if(s!=null)if(!B.f.A(this.a,s)){r=this.b
r=r!=null&&!J.ng(r,s)}if(r){r=this.b.style
r.display="none"}},
$S:1}
A.ji.prototype={
$1(a){t.V.a(a)
return this.a.b8()},
$S:1}
A.k2.prototype={
$1(a){var s,r
t.P.a(a)
s=J.D(a)
r=this.a
return B.a.A(J.M(s.h(a,"owner_name")).toLowerCase(),r)||B.a.A(J.M(s.h(a,"account_number")).toLowerCase(),r)},
$S:0}
A.k3.prototype={
$1(a){var s,r,q,p
t.P.a(a)
s=document.createElement("div")
s.className="search-result-item"
r=J.D(a)
q=J.K(s)
q.sV(s,A.h(r.h(a,"owner_name"))+" ("+A.h(r.h(a,"account_number"))+")")
q=q.gav(s)
r=this.c
p=q.$ti
A.C(q.a,q.b,p.i("~(1)?").a(new A.k1(this.a,this.b,a,r)),!1,p.c)
r.appendChild(s).toString},
$S:5}
A.k1.prototype={
$1(a){var s,r,q,p=this
t.V.a(a)
s=p.c
r=J.D(s)
B.f.sJ(p.b,A.h(r.h(s,"owner_name"))+" ("+A.h(r.h(s,"account_number"))+")")
q=p.d.style
q.display="none"
p.a.bv(A.ay(r.h(s,"house_id")))},
$S:1}
A.kb.prototype={
$2(a,b){var s=document.getElementById(a)
if(s!=null)J.v(s,b)},
$S:7}
A.jp.prototype={
$1(a){var s,r,q,p,o,n,m="status"
t.P.a(a)
s=document.createElement("div")
r=J.D(a)
s.className="bill-record-card "+A.h(r.h(a,m))
q=r.h(a,"date")
q=A.dn(J.M(q==null?"":q))
p=q==null?null:q.bx()
o=p==null?"Unknown date":""+A.cl(p)+"/"+A.dV(p)+"/"+A.by(p)+" "+B.a.a_(B.c.l(A.bX(p)),2,"0")+":"+B.a.a_(B.c.l(A.cP(p)),2,"0")
q=A.h(r.h(a,"billing_month"))
n=J.n(r.h(a,m),"Paid")?"var(--alert-green)":"var(--amber-safety)"
J.dj(s,'          <div class="bill-record-header">\n            <span>Cycle: '+q+'</span>\n            <span style="color:'+n+'">'+J.M(r.h(a,m)).toUpperCase()+'</span>\n          </div>\n          <div class="bill-record-details">\n            <span>Readings: '+B.d.E(A.a2(r.h(a,"previous_reading")),1)+" \u2192 "+B.d.E(A.a2(r.h(a,"current_reading")),1)+" m\xb3</span>\n            <strong>\u20b1"+B.d.E(A.a2(r.h(a,"total_due")),2)+'</strong>\n          </div>\n          <div style="font-size:9px;color:var(--text-muted);margin-top:2px;display:flex;justify-content:space-between">\n            <span>'+o+" ("+A.h(r.h(a,"bill_id"))+")</span>\n            <span>Tech: "+A.h(r.h(a,"billed_by"))+"</span>\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:5}
A.ka.prototype={
$1(a){if(A.w(a)==="granted")A.oC(this.a,this.b,"logo.png")},
$S:55}
A.k7.prototype={
$0(){J.c7(this.a).B(0,"show")},
$S:2}
A.k4.prototype={
$1(a){return J.c7(t.h.a(a)).B(0,"active")},
$S:10}
A.k5.prototype={
$1(a){return B.a.t(A.w(a)).length!==0},
$S:8}
A.k6.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:9}
A.jN.prototype={
$1(a){return B.a.t(A.w(a)).length!==0},
$S:8}
A.jO.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:9}
A.jP.prototype={
$1(a){return A.h(J.m(t.P.a(a),"status")).toLowerCase()!=="paid"},
$S:0}
A.jQ.prototype={
$1(a){return J.n(J.m(t.P.a(a),"billing_month"),this.a)},
$S:0}
A.jR.prototype={
$2(a,b){var s=document.getElementById(a)
if(s!=null)J.v(s,b)},
$S:7}
A.jS.prototype={
$2(a,b){return a==null?"--":B.d.E(A.bJ(A.h(a)),b)},
$S:56}
A.jT.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c="status",b="payment_date"
t.P.a(a)
s=document
r=s.createElement("div")
q=J.D(a)
r.className="bill-record-card "+A.h(q.h(a,c))
p=q.h(a,"date")
p=A.dn(J.M(p==null?"":p))
o=p==null?null:p.bx()
n=o==null?"Unknown date":""+A.cl(o)+"/"+A.dV(o)+"/"+A.by(o)+" "+B.a.a_(B.c.l(A.bX(o)),2,"0")+":"+B.a.a_(B.c.l(A.cP(o)),2,"0")
p=A.h(q.h(a,"billing_month"))
m=J.n(q.h(a,c),"Paid")?"var(--alert-green)":"var(--amber-safety)"
l=J.M(q.h(a,c))
k=B.d.E(A.a2(q.h(a,"previous_reading")),1)
j=B.d.E(A.a2(q.h(a,"current_reading")),1)
i=B.d.E(A.a2(q.h(a,"consumption")),1)
h=B.d.E(A.a2(q.h(a,"total_due")),2)
g=A.h(q.h(a,"bill_id"))
if(J.n(q.h(a,c),"Paid")){f=q.h(a,b)
f=J.M(f==null?"":f).length!==0}else f=!1
f=f?" | Paid: "+A.h(q.h(a,b)):""
J.dj(r,'        <div class="bill-record-header">\n          <span>Cycle: '+p+'</span>\n          <span style="color:'+m+'">'+l.toUpperCase()+'</span>\n        </div>\n        <div class="bill-record-details">\n          <span>Usage: '+k+" \u2192 "+j+" m\xb3 ("+i+" m\xb3)</span>\n          <strong>\u20b1"+h+'</strong>\n        </div>\n        <div style="font-size:9px;color:var(--text-muted);margin-top:2px;">\n          Bill Ref ID: '+g+" | Issued: "+n+f+"\n        </div>\n      ")
e=t.eO.a(q.h(a,"billing_breakdown"))
d=s.createElement("p")
s=d.style
s.fontSize="11px"
if(e==null)s="Legacy bill: rate breakdown unavailable. Original total retained."
else{s=J.D(e)
s="Recorded: base PHP "+A.h(s.h(e,"base_rate"))+" (includes "+A.h(s.h(e,"included_m3"))+" m\xb3), excess "+A.h(s.h(e,"excess_m3"))+" m\xb3 x PHP "+A.h(s.h(e,"excess_rate"))+" = PHP "+A.h(s.h(e,"excess_charge"))+", environmental fee PHP "+A.h(s.h(e,"environmental_fee"))+"."}B.r.sV(d,s)
r.appendChild(d).toString
this.b.appendChild(r).toString},
$S:5}
A.iK.prototype={
$1(a){var s,r
t.h.a(a)
s=J.a8(a)
r=s.$ti
A.C(s.a,s.b,r.i("~(1)?").a(new A.iJ(a)),!1,r.c)},
$S:10}
A.iJ.prototype={
$1(a){var s,r,q,p,o
t.V.a(a).preventDefault()
s=t.f_.a(this.a)
r=document
r.toString
q=s.getAttribute("data-"+new A.hb(new A.ed(s)).b0("togglePassword"))
p=t.G.a(r.getElementById(q==null?"":q))
if(p==null)return
o=p.type==="password"
B.f.sci(p,o?"text":"password")
B.m.sV(s,o?"Hide":"Show")},
$S:1}
A.iL.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.iM.prototype={
$1(a){return this.dM(t.V.a(a))},
dM(a){var s=0,r=A.S(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h,g,f
var $async$$1=A.T(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:g=o.a
if(g!=null){g=g.style
g.display="flex"}g=o.b
k=g==null
if(!k)J.v(g,"Loading available puroks...")
q=3
s=6
return A.z($.U().ff("/api/puroks",!1),$async$$1)
case 6:n=c
m=t.gH.a(document.getElementById("reg-res-purok"))
j=m
j.children.toString
J.il(j)
j=n.responseText
j.toString
j=J.b4(t.R.a(J.m(B.e.L(0,j),"puroks")))
while(j.q()){l=j.gu(j)
J.qz(m,A.rj(A.h(l),A.h(l),null,!1))}if(!k){A.mR(t.af,t.h,"T","querySelectorAll")
i=new A.bG(J.qv(m,"option"),t.gp)
J.v(g,new A.e3(t.e3.a(i.an(i)),t.eG).gj(0)===0?"No puroks configured. Contact the administrator.":"")}q=1
s=5
break
case 3:q=2
f=p.pop()
if(!k)J.v(g,"Registration needs an internet connection. Please retry.")
s=5
break
case 2:s=1
break
case 5:return A.Q(null,r)
case 1:return A.P(p.at(-1),r)}})
return A.R($async$$1,r)},
$S:4}
A.iN.prototype={
$1(a){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c
var $async$$1=A.T(function(b,a0){if(b===1){o.push(a0)
s=p}for(;;)switch(s){case 0:a.preventDefault()
h=m.a
g=!0
if(h!=null){f=h.disabled
f.toString
if(!f){g=m.b.checkValidity()
g.toString
g=!g}}if(g){s=1
break}l=new A.iO()
if(!J.n(l.$1("reg-password"),l.$1("reg-verify-password"))){h=m.c
if(h!=null)J.v(h,"Passwords do not match.")
s=1
break}h.disabled=!0
g=m.c
f=g==null
if(!f)J.v(g,"Submitting registration...")
p=4
e=t.N
s=7
return A.z($.U().a9("/api/residents/register",!1,"POST",A.a5(["Content-Type","application/json"],e,e),B.e.T(A.a5(["owner_name",J.od(l.$1("reg-res-name")),"contact",J.od(l.$1("reg-contact")),"purok",t.gH.a(document.getElementById("reg-res-purok")).value,"password",l.$1("reg-password"),"verify_password",l.$1("reg-verify-password")],e,t.bl))),$async$$1)
case 7:k=a0
e=k.responseText
e.toString
j=B.e.L(0,e)
m.b.reset()
if(!f)J.v(g,"Registration submitted. Resident ID: "+A.h(J.m(j,"house_id"))+". Meter ID: "+A.h(J.m(j,"account_number"))+". Wait for Admin approval before signing in.")
n.push(6)
s=5
break
case 4:p=3
c=o.pop()
e=A.am(c)
if(e instanceof A.aS){i=e
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
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$$1,r)},
$S:21}
A.iO.prototype={
$1(a){var s=t.fY.a(document.getElementById(a)).value
return s==null?"":s},
$S:9}
A.ir.prototype={
$1(a){t.V.a(a)
this.a.K("Field payment collection is disabled. Payments must be settled in-person at Barangay Hall.")},
$S:1}
A.is.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.it.prototype={
$1(a){return this.dL(t.V.a(a))},
dL(a0){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a
var $async$$1=A.T(function(a1,a2){if(a1===1){o.push(a2)
s=p}for(;;)switch(s){case 0:b=m.a
if(b.c==null||b.a==null){s=1
break}h=m.b
h=h==null?null:h.value
g=A.dY(h==null?"":h)
l=g==null?0:g
h=l
if(typeof h!=="number"){q=h.h8()
s=1
break}if(h<=0){b.K("Please enter a valid payment amount!")
s=1
break}h=m.c
f=h==null?null:h.value
k=f==null?"Cash":f
h=b.a.h(0,"worker_id")
if(h==null)h=b.a.h(0,"name")
j=J.M(h==null?"Collector":h)
h=m.d
h.disabled=!0
p=4
e=$.U()
d=b.c
d.toString
s=7
return A.z(e.bt(l,j,d,k),$async$$1)
case 7:i=a2
d=m.e
if(d!=null){e=d.style
e.display="none"}b.K("Collection recorded! TxID: "+A.h(J.m(i,"transaction_id")))
e=b.c
e.toString
b.ca(e)
n.push(6)
s=5
break
case 4:p=3
a=o.pop()
b.K("Collection not saved. Check device storage and existing pending payments.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
h.disabled=!1
s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$$1,r)},
$S:4}
A.iI.prototype={
$2(a,b){var s,r,q,p
this.a.w=a
s=document
r=s.getElementById("resident-photo-name")
if(r!=null)J.v(r,b)
q=s.getElementById("resident-photo-preview")
r=q==null
if(!r)J.oa(q).aJ(0)
p=s.createElement("img")
p.toString
B.D.se1(p,a)
B.D.sfd(p,"Selected evidence preview")
if(!r)q.appendChild(p).toString
r=s.getElementById("resident-photo-preview-card")
if(r!=null){r=r.style
r.display="block"}s=s.getElementById("resident-photo-pickers")
if(s!=null){s=s.style
s.display="none"}},
$S:7}
A.iy.prototype={
$4(a,b,c,d){var s=this.a
if(!J.n(a,s.x))return
s.x=null
if(typeof d=="string"&&d.length!==0){s.K(d)
return}if(typeof b=="string"&&b.length!==0){s=typeof c=="string"&&c.length!==0?c:"Selected photo"
this.b.$2(b,s)}},
$C:"$4",
$R:4,
$S:57}
A.iH.prototype={
$2(a,b){var s,r,q,p,o="NativePhotoPicker",n=$.dh()
if(!n.bn(o)){if(a!=null)a.click()
return}r=this.a
if(r.x!=null)return
s=""+1000*Date.now()+"-"+ ++r.y
r.x=s
try{q=t.N
n.h(0,o).bZ("postMessage",A.A([B.e.T(A.a5(["request_id",s,"source",b],q,q))],t.s))}catch(p){r.x=null
if(a!=null)a.click()}},
$S:58}
A.iq.prototype={
$0(){var s,r,q,p=this
p.a.w=null
s=p.b
if(s!=null)B.f.sJ(s,"")
s=p.c
if(s!=null)B.f.sJ(s,"")
s=p.d
if(s!=null)B.f.sJ(s,"")
s=document
r=s.getElementById("resident-photo-name")
if(r!=null)J.v(r,"No file chosen")
q=s.getElementById("resident-photo-preview")
if(q!=null)J.oa(q).aJ(0)
r=s.getElementById("resident-photo-preview-card")
if(r!=null){r=r.style
r.display="none"}s=s.getElementById("resident-photo-pickers")
if(s!=null){s=s.style
s.display="flex"}},
$S:2}
A.iG.prototype={
$1(a){var s=0,r=A.S(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c
var $async$$1=A.T(function(b,a0){if(b===1){o.push(a0)
s=p}for(;;)switch(s){case 0:d=a==null?null:a.files
if(d==null||d.length===0){s=1
break}m=B.a4.gaa(d)
k=m.size
k.toString
if(k>2097152){n.a.K("Photo must be at most 2 MiB.")
n.b.$0()
s=1
break}k=m.type
j=t.s
i=A.A(["image/jpeg","image/png","image/webp","image/jpg"],j)
h=m.name
h.toString
g=B.a.A(h,".")?B.b.gc8(m.name.split(".")).toLowerCase():""
f=A.A(["jpg","jpeg","png","webp"],j)
if(!B.b.A(i,k.toLowerCase())&&!B.b.A(f,g)){n.a.K("Use a JPEG, PNG or WebP photo.")
n.b.$0()
s=1
break}p=4
k=new FileReader()
k.toString
B.a5.fU(k,m)
l=k
s=7
return A.z(new A.cq(t.O.a(l),"load",!1,t.h6).gaa(0),$async$$1)
case 7:k=A.w(J.qG(l))
j=m.name
j.toString
n.c.$2(k,j)
p=2
s=6
break
case 4:p=3
c=o.pop()
n.a.K("Could not load selected photo.")
n.b.$0()
s=6
break
case 3:s=2
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$$1,r)},
$S:59}
A.iz.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iA.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iB.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iC.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iD.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"camera")},
$S:1}
A.iE.prototype={
$1(a){var s
t.V.a(a)
s=this.a
return s==null?null:s.click()},
$S:1}
A.iF.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iu.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"camera")},
$S:1}
A.iv.prototype={
$1(a){t.V.a(a)
this.b.$0()
this.a.K("Photo removed.")},
$S:1}
A.iw.prototype={
$1(a){return this.dK(t.V.a(a))},
dK(a){var s=0,r=A.S(t.H),q,p=this,o,n,m,l,k,j,i,h
var $async$$1=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:h=p.a
if(h.d==null){s=1
break}o=document
n=t.Z.a(o.getElementById("resident-issue-category"))
m=t.r.a(o.getElementById("resident-log-desc"))
l=n==null?null:n.value
if(l==null)l="Water Leak"
o=m==null
if(o)k=null
else{j=m.value
j=j==null?null:B.a.t(j)
k=j}if(k==null)k=""
if(k.length===0){h.K("Please provide details for the report!")
s=1
break}j=$.U()
i=h.d
i.toString
s=3
return A.z(j.ba(i,l,k,h.w),$async$$1)
case 3:if(c){h.K("Report saved. Pending reports sync when online.")
if(!o)B.l.sJ(m,"")
p.b.$0()}else h.K("Report was not saved. Please retry; keep your description.")
case 1:return A.Q(q,r)}})
return A.R($async$$1,r)},
$S:4}
A.ix.prototype={
$1(a){return this.dJ(t.V.a(a))},
dJ(a){var s=0,r=A.S(t.H),q=this,p
var $async$$1=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:p=q.a
p.K("Testing server connection...")
s=2
return A.z($.U().b4(),$async$$1)
case 2:if(c)p.K("Server connected! Online sync active.")
else p.K("Server unreachable. Continuing in offline mode.")
return A.Q(null,r)}})
return A.R($async$$1,r)},
$S:4}
A.aS.prototype={
gh4(){var s=this.a
return s==null||s===429||s>=500},
l(a){return"API request was not completed."}}
A.kj.prototype={
d4(a){return this.as=this.as.d8(new A.km()).cf(new A.kn(a),t.H)},
aS(a){return this.e2(a)},
e2(a){var s=0,r=A.S(t.H),q=1,p=[],o=this,n,m,l
var $async$aS=A.T(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:m=++o.Q
window.localStorage.setItem("waterhall_jwt",a)
o.y=null
q=3
s=6
return A.z(o.d4(a),$async$aS)
case 6:if(!J.n(m,o.Q)||!o.N())throw A.b(B.i)
q=1
s=5
break
case 3:q=2
l=p.pop()
s=J.n(m,o.Q)?7:8
break
case 7:s=9
return A.z(o.al(!0),$async$aS)
case 9:case 8:throw A.b(B.i)
s=5
break
case 2:s=1
break
case 5:return A.Q(null,r)
case 1:return A.P(p.at(-1),r)}})
return A.R($async$aS,r)},
al(a){var s=0,r=A.S(t.H),q=1,p=[],o=this,n,m,l,k
var $async$al=A.T(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:++o.Q
n=window
n.toString
m=document.createEvent("Event")
m.toString
J.qu(m,"waterhall-session-ending",!0,!0)
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
return A.z(o.d4(null),$async$al)
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
case 5:return A.Q(null,r)
case 1:return A.P(p.at(-1),r)}})
return A.R($async$al,r)},
de(){return this.al(!1)},
N(){if(A.de())return!0
if(window.localStorage.getItem("waterhall_jwt")!=null||window.localStorage.getItem("waterhall_session")!=null||window.localStorage.getItem("waterhall_resident_session")!=null)this.al(!0)
return!1},
bN(){var s=this
s.x=!1
s.y="Server unavailable. Pending operations remain saved and will retry."
s.ax.m(0,s.W())},
a9(a,b,c,d,e){return this.fg(a,b,c,t.lG.a(d),e)},
d5(a,b,c,d){return this.a9(a,!0,b,c,d)},
ff(a,b){return this.a9(a,b,"GET",null,null)},
fe(a){return this.a9(a,!0,"GET",null,null)},
fg(a9,b0,b1,b2,b3){var s=0,r=A.S(t.la),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
var $async$a9=A.T(function(b5,b6){if(b5===1){o.push(b6)
s=p}for(;;)switch(s){case 0:a5=A.nC().dw(a9)
a6=J.qF(a5)
a7=A.nC()
if(a6!==a7.gcb(a7)||!B.a.M(J.ob(a5),"/api/"))throw A.b(B.t)
if(b0&&!m.N())throw A.b(B.i)
l=m.Q
k=window.localStorage.getItem("waterhall_jwt")
a6=new XMLHttpRequest()
a6.toString
j=a6
i=new A.bE(new A.W($.O,t.ax),t.cz)
h=A.A([],t.dw)
g=null
f=new A.ku(i)
p=4
J.qK(j,b1,a9)
if(b2==null){a6=t.N
a6=A.an(a6,a6)}else a6=b2
a6.p(0,J.qI(j))
if(b0)J.qP(j,"Authorization","Bearer "+A.h(k))
a6=t.O
a7=t.gn
a2=t.D
J.nf(h,A.C(a6.a(j),"load",a7.a(new A.kq(i,j)),!1,a2))
J.nf(h,A.C(a6.a(j),"error",a7.a(new A.kr(f)),!1,a2))
J.nf(h,A.C(a6.a(j),"abort",a7.a(new A.ks(f)),!1,a2))
g=A.nz(B.a3,new A.kt(f,j))
J.qN(j,b3)
s=7
return A.z(i.a,$async$a9)
case 7:e=b6
if(b0)a6=!J.n(l,m.Q)||!m.N()
else a6=!1
if(a6)throw A.b(B.i)
if(e.status===401&&b0){m.al(!0)
throw A.b(B.O)}a6=!0
if(e.status!=null){a7=e.status
a7.toString
if(a7>=200){a6=e.status
a6.toString
a6=a6>=300}}if(a6){d=null
if(!b0&&J.ob(a5)==="/api/login"){d=e.status===429?"Too many attempts. Please try again in 5 minutes.":"Invalid credentials."
try{a6=e.responseText
c=B.e.L(0,a6==null?"{}":a6)
b=J.m(c,"attempts_remaining")
if(e.status===401&&A.eG(b)&&b>=0&&b<=4)d="Invalid credentials. "+A.h(b)+" attempts remaining."
if(e.status===403)d=J.n(J.m(c,"account_status"),"pending")?"Registration is pending Admin approval.":"Registration was rejected. Contact the administrator."}catch(b4){}}a6=e.status===0?null:e.status
a7=d
throw A.b(new A.aS(a6,!1,a7))}q=e
n=[1]
s=5
break
n.push(6)
s=5
break
case 4:p=3
a8=o.pop()
a=A.am(a8)
if(!J.n(l,m.Q))throw A.b(B.i)
a0=a instanceof A.aS?a:B.t
if(!a0.b&&a0.gh4())m.bN()
throw A.b(a0)
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
a6=g
if(a6!=null)J.o9(a6)
a6=h,a7=a6.length,a4=0
case 8:if(!(a4<a6.length)){s=10
break}a1=a6[a4]
s=11
return A.z(J.o9(a1),$async$a9)
case 11:case 9:a6.length===a7||(0,A.aE)(a6),++a4
s=8
break
case 10:s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$a9,r)},
W(){var s,r,q,p,o,n,m=this,l=m.aP().length+m.af().length,k=m.x
if(!k)s="offline"
else if(m.ch)s="syncing"
else s=l>0?"pending_sync":"synced"
r=m.ch||m.ay
q=A.de()
p=m.aP()
o=A.G(p)
o=new A.J(p,o.i("I(1)").a(new A.kF()),o.i("J<1>")).gj(0)
p=m.af()
n=A.G(p)
return A.a5(["status",s,"isOnline",k,"isSyncing",r,"authenticated",q,"reviewCount",o+new A.J(p,n.i("I(1)").a(new A.kG()),n.i("J<1>")).gj(0),"pendingCount",l,"error",m.y],t.N,t.z)},
fb(){var s=window.localStorage.getItem("waterhall_unsynced_actions")
s=J.di(t.j.a(B.e.L(0,s==null?"[]":s)),new A.kp(),t.P)
s=A.ab(s,s.$ti.i("af.E"))
return s},
af(){var s=this.fb(),r=A.G(s),q=r.i("J<1>")
s=A.ab(new A.J(s,r.i("I(1)").a(new A.kR()),q),q.i("f.E"))
return s},
ag(a,b){return this.fT(a,t.P.a(b))},
fT(a,b){var s=0,r=A.S(t.H),q=this,p
var $async$ag=A.T(function(c,d){if(c===1)return A.P(d,r)
for(;;)switch(s){case 0:if(!q.N())throw A.b(B.i)
p=b.h(0,"operation_id")
if(p==null)p=A.n6()
b.k(0,"operation_id",p)
s=2
return A.z(A.cB("actions",new A.kS(p,a,b)),$async$ag)
case 2:q.ax.m(0,q.W())
s=q.x?3:4
break
case 3:s=5
return A.z(q.a6(),$async$ag)
case 5:case 4:return A.Q(null,r)}})
return A.R($async$ag,r)},
a6(){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$a6=A.T(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:if(m.ay||!m.N()){s=1
break}m.ay=!0
l=m.Q
f=m.af()
B.b.b9(f,new A.kW())
k=f
p=4
e=k,e=A.nx(e,0,A.cx(100,"count",t.S),A.G(e).c),d=e.$ti,e=new A.bw(e,e.gj(0),d.i("bw<af.E>")),c=t.N,d=d.i("af.E")
case 7:if(!e.q()){s=8
break}b=e.d
j=b==null?d.a(b):b
if(!J.n(l,m.Q)||!m.N()){s=8
break}s=9
return A.z(A.cB("actions",new A.kX(j)),$async$a6)
case 9:p=11
s=14
return A.z(m.d5(A.w(J.m(j,"endpoint")),"POST",A.a5(["Content-Type","application/json"],c,c),B.e.T(J.m(j,"body"))),$async$a6)
case 14:i=a3
b=i.responseText
h=B.e.L(0,b==null?"{}":b)
if(!J.n(l,m.Q)||!m.N()){s=8
break}if(!J.n(J.m(h,"status"),"success"))throw A.b(B.P)
s=15
return A.z(A.cB("actions",new A.kY(j)),$async$a6)
case 15:p=4
s=13
break
case 11:p=10
a0=o.pop()
b=A.am(a0)
s=b instanceof A.aS?16:18
break
case 16:g=b
if(!g.b){b=g.a
b=b==null||b===429||b>=500}else b=!0
if(b)throw a0
s=19
return A.z(A.cB("actions",new A.kZ(j)),$async$a6)
case 19:s=17
break
case 18:throw a0
case 17:s=13
break
case 10:s=4
break
case 13:s=7
break
case 8:if(J.n(l,m.Q))m.y=B.b.a8(m.af(),new A.l_())?"Saved operations need review. Their original data remains on this device.":null
n.push(6)
s=5
break
case 4:p=3
a1=o.pop()
if(J.n(l,m.Q)&&A.de()&&m.x)m.y="Pending operations remain saved for retry."
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.ay=!1
m.ax.m(0,m.W())
s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$a6,r)},
dd(){var s,r,q,p=this
for(s=B.G.gau(B.G),s=s.gC(s);s.q();){r=s.gu(s)
q=r.a
if(q!=="offlineCollections"&&q!=="unsyncedActions"){q=window.localStorage
r=r.b
q.getItem(r)
q.removeItem(r)}}s=t.t
p.a=A.A([],s)
p.d=A.A([],s)
p.e=A.A([],s)
p.c=A.A([],s)
p.f=A.A([],s)
s=t.N
r=t.z
p.b=A.an(s,r)
p.r=A.an(s,s)
p.w=A.an(s,r)},
eL(){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=window.localStorage.getItem("waterhall_households")
if(s!=null)i.a=A.aJ(t.R.a(B.e.L(0,s)),!0,t.P)
r=window.localStorage.getItem("waterhall_central_assets")
if(r!=null)i.b=A.ao(t.f.a(B.e.L(0,r)),t.N,t.z)
q=window.localStorage.getItem("waterhall_maintenance_logs")
if(q!=null)i.c=A.aJ(t.R.a(B.e.L(0,q)),!0,t.P)
p=window.localStorage.getItem("waterhall_workers")
if(p!=null)i.d=A.aJ(t.R.a(B.e.L(0,p)),!0,t.P)
o=window.localStorage.getItem("waterhall_billing_records")
if(o!=null)i.e=A.aJ(t.R.a(B.e.L(0,o)),!0,t.P)
n=window.localStorage.getItem("waterhall_announcements")
if(n!=null)i.f=A.aJ(t.R.a(B.e.L(0,n)),!0,t.P)
m=window.localStorage.getItem("waterhall_billing_config")
if(m!=null)i.w=A.ao(t.f.a(B.e.L(0,m)),t.N,t.z)
l=window.localStorage.getItem("waterhall_payment_settings")
k=t.N
if(l!=null)i.r=A.ao(t.f.a(B.e.L(0,l)),k,k)
else i.r=A.ao($.pS,k,k)}catch(j){A.bL("Unable to load local cache.")}},
aF(){var s,r,q=this
try{s=window.localStorage
s.toString
s.setItem("waterhall_households",B.e.T(q.a))
s=window.localStorage
s.toString
s.setItem("waterhall_central_assets",B.e.T(q.b))
s=window.localStorage
s.toString
s.setItem("waterhall_maintenance_logs",B.e.T(q.c))
s=window.localStorage
s.toString
s.setItem("waterhall_workers",B.e.T(q.d))
s=window.localStorage
s.toString
s.setItem("waterhall_billing_records",B.e.T(q.e))
s=window.localStorage
s.toString
s.setItem("waterhall_announcements",B.e.T(q.f))
s=window.localStorage
s.toString
s.setItem("waterhall_payment_settings",B.e.T(q.r))
s=window.localStorage
s.toString
s.setItem("waterhall_billing_config",B.e.T(q.w))}catch(r){A.bL("Unable to save local cache.")}},
aM(a){return this.fW(a)},
b4(){return this.aM("")},
fW(a){var s=0,r=A.S(t.y),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b
var $async$aM=A.T(function(a0,a1){if(a0===1){o.push(a1)
s=p}for(;;)switch(s){case 0:if(m.z||!m.N()){q=!1
s=1
break}m.z=!0
p=4
l=a.length!==0?"/api/all-data?role="+a:"/api/all-data"
s=7
return A.z(m.fe(l),$async$aM)
case 7:k=a1
h=k.responseText
h.toString
g=t.P
j=g.a(B.e.L(0,h))
h=J.m(j,"billingConfig")
if(h==null){h=t.z
h=A.an(h,h)}f=t.f
e=t.N
d=t.z
m.w=A.ao(f.a(h),e,d)
h=t.R
m.a=A.aJ(h.a(J.m(j,"households")),!0,g)
m.b=A.ao(f.a(J.m(j,"centralAssets")),e,d)
m.c=A.aJ(h.a(J.m(j,"maintenanceLogs")),!0,g)
m.d=A.aJ(h.a(J.m(j,"workers")),!0,g)
m.e=A.aJ(h.a(J.m(j,"billingRecords")),!0,g)
if(J.nh(j,"announcements"))m.f=A.aJ(h.a(J.m(j,"announcements")),!0,g)
if(J.nh(j,"paymentSettings"))m.r=A.ao(f.a(J.m(j,"paymentSettings")),e,e)
m.aF()
m.x=!0
m.ax.m(0,m.W())
s=8
return A.z(m.a6(),$async$aM)
case 8:if(m.x&&m.N())m.aq()
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
if(!(i instanceof A.aS)||!i.b)m.bN()
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
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$aM,r)},
ab(){var s=0,r=A.S(t.y),q,p=this,o,n,m
var $async$ab=A.T(function(a,b){if(a===1)return A.P(b,r)
for(;;)switch(s){case 0:p.N()
A.nA(B.a2,new A.kL(p))
o=window
o.toString
n=t.oV
m=t.A
A.C(o,"focus",n.a(new A.kM(p)),!1,m)
o=window
o.toString
B.M.bX(o,"waterhall-session-expired",new A.kN(p))
o=window
o.toString
B.M.bX(o,"waterhall-request-unavailable",new A.kO(p))
s=3
return A.z(A.dg(),$async$ab)
case 3:p.eL()
if(p.b.a===0)p.b=A.ao($.uE,t.N,t.z)
if(p.r.a===0){o=t.N
p.r=A.ao($.pS,o,o)}o=window
o.toString
A.C(o,"online",n.a(new A.kP(p)),!1,m)
o=window
o.toString
A.C(o,"offline",n.a(new A.kQ(p)),!1,m)
s=4
return A.z(p.b4(),$async$ab)
case 4:q=b
s=1
break
case 1:return A.Q(q,r)}})
return A.R($async$ab,r)},
dV(){var s,r,q,p=window.localStorage.getItem("waterhall_offline_collections")
if(p==null)return A.A([],t.t)
try{s=t.j.a(B.e.L(0,p))
r=J.di(s,new A.kv(),t.P)
r=A.ab(r,r.$ti.i("af.E"))
return r}catch(q){r=A.A([],t.t)
return r}},
aP(){var s=this.dV(),r=A.G(s),q=r.i("J<1>")
r=A.ab(new A.J(s,r.i("I(1)").a(new A.kE()),q),q.i("f.E"))
return r},
bt(a,b,c,a0){var s=0,r=A.S(t.P),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d
var $async$bt=A.T(function(a1,a2){if(a1===1)return A.P(a2,r)
for(;;)switch(s){case 0:if(!p.N())throw A.b(B.i)
o=p.r.h(0,"allow_worker_collection")
if((o==null?null:o.toLowerCase())!=="true")throw A.b(A.ai("Field payment collection is disabled under the Barangay-only payment policy. All payments must be made at the Barangay Hall."))
n=new A.a9(Date.now(),0,!1).a4()
m=A.n6()
l=A.a5(["transaction_id",m,"bill_id",null,"house_id",c,"amount_collected",a,"date",n.a0(),"collected_by",b,"payment_method",a0,"sync_status","PENDING","synced_at",null],t.N,t.X)
s=3
return A.z(A.cB("collections",new A.kU(c,b,l)),$async$bt)
case 3:o=p.ax
o.m(0,p.W())
k=B.a.t(c.toUpperCase())
for(j=p.e,i=j.length,h=0;h<j.length;j.length===i||(0,A.aE)(j),++h){g=j[h]
f=J.D(g)
e=f.h(g,"house_id")
d=B.a.t(J.M(e==null?"":e).toUpperCase())
e=f.h(g,"bill_id")
B.a.t(J.M(e==null?"":e).toUpperCase())
e=d===k&&!J.n(f.h(g,"status"),"Paid")
if(e){f.k(g,"status","Pending sync")
f.k(g,"payment_status","Pending sync")}}p.aF()
A.bL("[OFFLINE STORE] Collection recorded locally: "+m+" for "+c+" (\u20b1"+A.h(a)+"). Status: PENDING.")
if(p.x)p.aq()
else o.m(0,p.W())
q=l
s=1
break
case 1:return A.Q(q,r)}})
return A.R($async$bt,r)},
aq(){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d
var $async$aq=A.T(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:if(m.ch||!m.N()){s=1
break}i=m.aP()
B.b.b9(i,new A.l0())
l=A.nx(i,0,A.cx(100,"count",t.S),A.G(i).c).an(0)
if(J.ag(l)===0){m.ax.m(0,m.W())
s=1
break}m.ch=!0
h=m.ax
h.m(0,m.W())
k=m.Q
p=4
g=l
f=A.G(g)
j=new A.a_(g,f.i("@(1)").a(new A.l1()),f.i("a_<1,@>")).dC(0)
s=7
return A.z(A.cB("collections",new A.l2(j)),$async$aq)
case 7:s=8
return A.z(m.a7(l,k),$async$aq)
case 8:if(J.n(k,m.Q)&&m.N())m.y=B.b.a8(m.aP(),new A.l3())?"Some collections need review. Unacknowledged payments remain saved.":null
n.push(6)
s=5
break
case 4:p=3
d=o.pop()
if(J.n(k,m.Q)&&A.de()&&m.x)m.y="Sync not confirmed. Pending records remain saved for retry."
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.ch=!1
h.m(0,m.W())
s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$aq,r)},
a7(a,b){return this.f8(t.p.a(a),b)},
f8(a,b){var s=0,r=A.S(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c
var $async$a7=A.T(function(a0,a1){if(a0===1){o.push(a1)
s=p}for(;;)switch(s){case 0:if(b!==n.Q||!n.N())throw A.b(B.i)
m=null
p=4
g=t.N
s=7
return A.z(n.d5("/api/collections/sync","POST",A.a5(["Content-Type","application/json"],g,g),B.e.T(A.a5(["collections",a],g,t.p))),$async$a7)
case 7:l=a1
f=l.responseText
k=t.P.a(B.e.L(0,f==null?"{}":f))
j=J.m(k,"synced_ids")
if(J.n(J.m(k,"status"),"success")&&t.j.b(j)){g=J.qR(j,g)
e=A.ci(g.$ti.i("f.E"))
e.S(0,g)}else e=A.ox(g)
m=e
p=2
s=6
break
case 4:p=3
c=o.pop()
g=A.am(c)
s=g instanceof A.aS?8:10
break
case 8:i=g
if(i.b||!B.b.A(A.A([400,403,404,409,422],t.b),i.a))throw c
g=a.length
s=g>1?11:12
break
case 11:h=g/2|0
s=13
return A.z(n.a7(B.b.cu(a,0,h),b),$async$a7)
case 13:s=14
return A.z(n.a7(B.b.e3(a,h),b),$async$a7)
case 14:s=1
break
case 12:if(b!==n.Q||!n.N())throw A.b(B.i)
g=i.a===409?"Bill or transaction conflict. Review before retrying.":"Collection rejected (HTTP "+A.h(i.a)+"). Review before retrying."
s=15
return A.z(n.aZ(a,A.ox(t.N),g),$async$a7)
case 15:s=1
break
s=9
break
case 10:throw c
case 9:s=6
break
case 3:s=2
break
case 6:if(b!==n.Q||!n.N())throw A.b(B.i)
s=16
return A.z(n.aZ(a,m,"Server did not acknowledge this collection. Retry required."),$async$a7)
case 16:n.x=!0
case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$a7,r)},
aZ(a,b,c){return this.f0(t.p.a(a),t.i.a(b),c)},
f0(a,b,c){var s=0,r=A.S(t.H),q=this,p
var $async$aZ=A.T(function(d,e){if(d===1)return A.P(e,r)
for(;;)switch(s){case 0:p=A.G(a)
s=2
return A.z(A.cB("collections",new A.kk(new A.a_(a,p.i("@(1)").a(new A.kl()),p.i("a_<1,@>")).dC(0),b,c)),$async$aZ)
case 2:q.ax.m(0,q.W())
return A.Q(null,r)}})
return A.R($async$aZ,r)},
ba(a,b,c,d){return this.e4(a,b,c,d)},
e4(a,b,c,d){var s=0,r=A.S(t.y),q,p=2,o=[],n=this,m,l
var $async$ba=A.T(function(e,f){if(e===1){o.push(f)
s=p}for(;;)switch(s){case 0:p=4
s=7
return A.z(n.ag("/api/reports/add",A.a5(["household_id",a,"report_type",b,"description",c,"photo_base64",d],t.N,t.z)),$async$ba)
case 7:q=!0
s=1
break
p=2
s=6
break
case 4:p=3
l=o.pop()
q=!1
s=1
break
s=6
break
case 3:s=2
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$ba,r)},
ao(a){var s,r,q=this.a,p=B.a.t(a.toLowerCase()),o=B.a.t(A.q0(p,"hh-",""))
try{s=J.qB(q,new A.kD(p,o))
return s}catch(r){return null}},
b6(a,b){var s=0,r=A.S(t.dZ),q,p=this,o,n,m
var $async$b6=A.T(function(c,d){if(c===1)return A.P(d,r)
for(;;)switch(s){case 0:n=p.a
m=B.b.fD(n,new A.l4(a))
s=m!==-1?3:4
break
case 3:if(!(m>=0&&m<n.length)){q=A.e(n,m)
s=1
break}o=A.ao(n[m],t.N,t.z)
o.k(0,"current_leak_status",b)
if(b==="leak")o.k(0,"leak_detected_at",new A.a9(Date.now(),0,!1).a4().a0())
else o.k(0,"leak_detected_at",null)
s=5
return A.z(p.ag("/api/households/update",o),$async$b6)
case 5:B.b.k(n,m,o)
p.aF()
if(!(m<n.length)){q=A.e(n,m)
s=1
break}q=n[m]
s=1
break
case 4:q=null
s=1
break
case 1:return A.Q(q,r)}})
return A.R($async$b6,r)},
bj(a){return this.fa(t.P.a(a))},
fa(a){var s=0,r=A.S(t.P),q,p=this,o,n
var $async$bj=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:o=p.c
n=A.an(t.N,t.z)
n.k(0,"task_id","PENDING-"+A.n6())
n.k(0,"date",new A.a9(Date.now(),0,!1).a4().a0())
n.S(0,a)
s=3
return A.z(p.ag("/api/maintenance-logs/add",n),$async$bj)
case 3:B.b.c6(o,0,n)
p.aF()
q=n
s=1
break
case 1:return A.Q(q,r)}})
return A.R($async$bj,r)},
dX(){var s,r,q,p,o,n,m,l,k=t.N,j=A.an(k,t.P)
for(s=this.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.aE)(s),++q){p=s[q]
j.k(0,A.h(J.m(p,"bill_id")),p)}for(s=this.af(),r=A.G(s),o=r.i("I(1)").a(new A.kC()),s=B.b.gC(s),r=new A.bf(s,o,r.i("bf<1>")),o=t.f,n=t.z;r.q();){m=s.gu(0)
l=J.D(m)
p=A.ao(o.a(l.h(m,"body")),k,n)
p.k(0,"status",l.h(m,"sync_error")==null?"Pending sync":"Needs review")
j.k(0,A.h(p.h(0,"bill_id")),p)}k=j.$ti.i("aU<2>")
k=A.ab(new A.aU(j,k),k.i("f.E"))
return k},
bC(a){var s=this.dX(),r=A.G(s),q=r.i("J<1>"),p=A.ab(new A.J(s,r.i("I(1)").a(new A.kA(B.a.t(a.toUpperCase()))),q),q.i("f.E"))
B.b.b9(p,new A.kB())
return p},
dW(a){var s,r,q=B.a.t(a.toUpperCase()),p=this.af(),o=A.G(p),n=o.i("aC<1,u<c,@>>"),m=n.i("J<f.E>"),l=A.ab(new A.J(new A.aC(new A.J(p,o.i("I(1)").a(new A.kw()),o.i("J<1>")),o.i("u<c,@>(1)").a(new A.kx()),n),n.i("I(f.E)").a(new A.ky(q)),m),m.i("f.E"))
if(l.length!==0){B.b.b9(l,new A.kz())
s=J.m(B.b.gaa(l),"current_reading")
if(typeof s=="number")return s}r=this.ao(a)
return A.mC(r==null?null:J.m(r,"current_m3_usage"))},
c3(a,b){var s,r,q=B.a.t(a.toUpperCase()),p=B.a.t(b.toLowerCase())
if(B.b.a8(this.e,new A.kH(q,p)))return!0
s=this.af()
r=A.G(s)
if(new A.aC(new A.J(s,r.i("I(1)").a(new A.kI()),r.i("J<1>")),r.i("u<c,@>(1)").a(new A.kJ()),r.i("aC<1,u<c,@>>")).a8(0,new A.kK(q,p)))return!0
return!1},
aG(a){return this.f9(t.P.a(a))},
f9(a){var s=0,r=A.S(t.P),q,p=this,o,n,m,l
var $async$aG=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:m=a.h(0,"house_id")
l=B.a.t(J.M(m==null?"":m).toUpperCase())
m=a.h(0,"billing_month")
o=B.a.t(J.M(m==null?"":m).toLowerCase())
if(p.c3(l,o))throw A.b(A.ai("A bill for this cycle ("+o+") already exists or is pending synchronization."))
m=A.an(t.N,t.z)
m.k(0,"bill_id","PENDING-"+A.n6())
n=a.h(0,"date")
m.k(0,"date",n==null?new A.a9(Date.now(),0,!1).a4().a0():n)
m.k(0,"status","Pending sync")
m.k(0,"is_synced",!1)
m.S(0,a)
s=3
return A.z(p.ag("/api/billing-records/add",m),$async$aG)
case 3:s=p.x&&p.N()?4:6
break
case 4:s=7
return A.z(p.a6(),$async$aG)
case 7:if(!B.b.a8(p.af(),new A.ko(m))){m.k(0,"is_synced",!0)
m.k(0,"status","Unpaid")}s=p.N()?8:9
break
case 8:s=10
return A.z(p.b4(),$async$aG)
case 10:case 9:s=5
break
case 6:p.aF()
p.ax.m(0,p.W())
case 5:q=m
s=1
break
case 1:return A.Q(q,r)}})
return A.R($async$aG,r)},
cm(a){var s,r,q,p,o,n=this.f,m=n.length
if(m===0)return null
if(a.length===0)return B.b.gaa(n)
for(s=a==="worker",r=a==="resident",q=0;q<n.length;n.length===m||(0,A.aE)(n),++q){p=n[q]
o=A.ay(J.m(p,"target_audience"))
if(o==null)o="Everyone"
if(r){if(o==="Everyone"||o==="Residents only")return p}else if(s){if(o==="Everyone"||o==="Workers only")return p}else return p}return null},
bh(a,b,c){var s=0,r=A.S(t.H),q=this,p,o
var $async$bh=A.T(function(d,e){if(d===1)return A.P(e,r)
for(;;)switch(s){case 0:p=t.N
o=A.a5(["message",a,"author",b,"target_audience",c,"timestamp",new A.a9(Date.now(),0,!1).a4().a0()],p,p)
s=2
return A.z(q.ag("/api/announcements/add",o),$async$bh)
case 2:B.b.c6(q.f,0,o)
q.aF()
return A.Q(null,r)}})
return A.R($async$bh,r)},
sfP(a){this.at=t.mW.a(a)}}
A.km.prototype={
$1(a){},
$S:14}
A.kn.prototype={
$1(a){return A.ii(this.a)},
$S:60}
A.ku.prototype={
$0(){var s=this.a
if((s.a.a&30)===0)s.c_(B.t)},
$S:2}
A.kq.prototype={
$1(a){var s
t.D.a(a)
s=this.a
if((s.a.a&30)===0)s.b1(0,this.b)},
$S:19}
A.kr.prototype={
$1(a){t.D.a(a)
return this.a.$0()},
$S:19}
A.ks.prototype={
$1(a){t.D.a(a)
return this.a.$0()},
$S:19}
A.kt.prototype={
$0(){this.a.$0()
this.b.abort()},
$S:2}
A.kF.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.kG.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.kp.prototype={
$1(a){return A.ao(t.f.a(a),t.N,t.z)},
$S:20}
A.kR.prototype={
$1(a){return J.n(J.m(t.P.a(a),"owner"),A.bI())},
$S:0}
A.kS.prototype={
$1(a){return B.b.m(t.p.a(a),A.a5(["operation_id",this.a,"owner",A.bI(),"endpoint",this.b,"body",this.c],t.N,t.z))},
$S:6}
A.kW.prototype={
$2(a,b){var s,r="last_sync_attempt",q=t.P
q.a(a)
q.a(b)
q=J.m(a,r)
q=J.M(q==null?"":q)
s=J.m(b,r)
return B.a.a1(q,J.M(s==null?"":s))},
$S:16}
A.kX.prototype={
$1(a){var s,r,q,p,o,n="operation_id"
t.p.a(a)
for(r=a.length,q=this.a,p=J.D(q),o=0;o<a.length;a.length===r||(0,A.aE)(a),++o){s=a[o]
if(J.n(J.m(s,n),p.h(q,n)))J.bi(s,"last_sync_attempt",new A.a9(Date.now(),0,!1).a4().a0())}},
$S:6}
A.kY.prototype={
$1(a){var s
t.p.a(a)
s=A.G(a).i("I(1)").a(new A.kV(this.a))
a.$flags&1&&A.aG(a,16)
B.b.eU(a,s,!0)
return null},
$S:6}
A.kV.prototype={
$1(a){var s="operation_id"
return J.n(J.m(t.P.a(a),s),J.m(this.a,s))},
$S:0}
A.kZ.prototype={
$1(a){var s,r,q,p,o,n="operation_id"
t.p.a(a)
for(r=a.length,q=this.a,p=J.D(q),o=0;o<a.length;a.length===r||(0,A.aE)(a),++o){s=a[o]
if(J.n(J.m(s,n),p.h(q,n)))J.bi(s,"sync_error","Server rejected this saved operation. Review with Admin; the original operation is retained.")}},
$S:6}
A.l_.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.kL.prototype={
$1(a){t.I.a(a)
return this.a.N()},
$S:34}
A.kM.prototype={
$1(a){return this.a.N()},
$S:3}
A.kN.prototype={
$1(a){t.A.a(a)
this.a.al(!0)},
$S:18}
A.kO.prototype={
$1(a){var s
t.A.a(a)
s=this.a
if(s.N())s.bN()},
$S:18}
A.kP.prototype={
$1(a){A.bL("[NET] Internet restored. Starting automatic synchronization...")
this.a.b4()},
$S:3}
A.kQ.prototype={
$1(a){var s
A.bL("[NET] Internet disconnected. Entering offline mode.")
s=this.a
s.x=!1
s.ax.m(0,s.W())},
$S:3}
A.kv.prototype={
$1(a){return A.ao(t.f.a(a),t.N,t.z)},
$S:20}
A.kE.prototype={
$1(a){var s
t.P.a(a)
s=J.D(a)
return J.n(s.h(a,"sync_status"),"PENDING")&&J.n(s.h(a,"collected_by"),A.bI())},
$S:0}
A.kU.prototype={
$1(a){t.p.a(a)
if(B.b.a8(a,new A.kT(this.a,this.b)))throw A.b(A.ai("A collection for this household is already pending"))
B.b.c6(a,0,this.c)},
$S:6}
A.kT.prototype={
$1(a){var s
t.P.a(a)
s=J.D(a)
return J.n(s.h(a,"house_id"),this.a)&&J.n(s.h(a,"collected_by"),this.b)&&J.n(s.h(a,"sync_status"),"PENDING")},
$S:0}
A.l0.prototype={
$2(a,b){var s,r="last_sync_attempt",q=t.P
q.a(a)
q.a(b)
q=J.m(a,r)
q=J.M(q==null?"":q)
s=J.m(b,r)
return B.a.a1(q,J.M(s==null?"":s))},
$S:16}
A.l1.prototype={
$1(a){return J.m(t.P.a(a),"transaction_id")},
$S:30}
A.l2.prototype={
$1(a){var s,r,q,p
t.p.a(a)
for(r=a.length,q=this.a,p=0;p<a.length;a.length===r||(0,A.aE)(a),++p){s=a[p]
if(J.n(J.m(s,"collected_by"),A.bI())&&q.A(0,J.m(s,"transaction_id")))J.bi(s,"last_sync_attempt",new A.a9(Date.now(),0,!1).a4().a0())}},
$S:6}
A.l3.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.kl.prototype={
$1(a){return J.m(t.P.a(a),"transaction_id")},
$S:30}
A.kk.prototype={
$1(a){var s,r,q,p,o,n,m,l="transaction_id",k="sync_status",j="sync_error"
t.p.a(a)
for(s=a.length,r=this.c,q=this.b,p=this.a,o=0;o<a.length;a.length===s||(0,A.aE)(a),++o){n=a[o]
m=J.D(n)
if(!J.n(m.h(n,"collected_by"),A.bI())||!p.A(0,m.h(n,l))||!J.n(m.h(n,k),"PENDING"))continue
if(q.A(0,m.h(n,l))){m.k(n,k,"SYNCED")
m.k(n,"synced_at",new A.a9(Date.now(),0,!1).a4().a0())
m.B(n,j)}else m.k(n,j,r)}},
$S:6}
A.kD.prototype={
$1(a){var s,r,q,p,o,n,m
t.P.a(a)
n=J.D(a)
m=n.h(a,"house_id")
s=B.a.t(J.M(m==null?"":m).toLowerCase())
r=B.a.t(A.q0(s,"hh-",""))
m=n.h(a,"account_number")
q=B.a.t(J.M(m==null?"":m).toLowerCase())
m=n.h(a,"owner_name")
p=B.a.t(J.M(m==null?"":m).toLowerCase())
m=A.h(n.h(a,"purok"))
n=n.h(a,"lot")
o=B.a.t((m+" "+A.h(n==null?"":n)).toLowerCase())
n=this.a
return n===s||this.b===r||n===q||n===p||n===o},
$S:0}
A.l4.prototype={
$1(a){return J.n(J.m(t.P.a(a),"house_id"),this.a)},
$S:0}
A.kC.prototype={
$1(a){return J.n(J.m(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.kA.prototype={
$1(a){var s=J.m(t.P.a(a),"house_id")
return B.a.t(J.M(s==null?"":s).toUpperCase())===this.a},
$S:0}
A.kB.prototype={
$2(a,b){var s,r,q="date",p=2026,o=t.P
o.a(a)
o.a(b)
o=J.D(a)
if(o.h(a,q)!=null){o=A.dn(A.w(o.h(a,q)))
s=o==null?A.l5(p):o}else s=A.l5(p)
o=J.D(b)
if(o.h(b,q)!=null){o=A.dn(A.w(o.h(b,q)))
r=o==null?A.l5(p):o}else r=A.l5(p)
return r.a1(0,s)},
$S:16}
A.kw.prototype={
$1(a){return J.n(J.m(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.kx.prototype={
$1(a){return A.ao(t.f.a(J.m(t.P.a(a),"body")),t.N,t.z)},
$S:26}
A.ky.prototype={
$1(a){var s=J.m(t.P.a(a),"house_id")
return B.a.t(J.M(s==null?"":s).toUpperCase())===this.a},
$S:0}
A.kz.prototype={
$2(a,b){var s,r=t.P
r.a(a)
r=J.m(r.a(b),"date")
r=J.M(r==null?"":r)
s=J.m(a,"date")
return B.a.a1(r,J.M(s==null?"":s))},
$S:16}
A.kH.prototype={
$1(a){var s,r
t.P.a(a)
s=J.D(a)
r=s.h(a,"house_id")
if(B.a.t(J.M(r==null?"":r).toUpperCase())===this.a){s=s.h(a,"billing_month")
s=B.a.t(J.M(s==null?"":s).toLowerCase())===this.b}else s=!1
return s},
$S:0}
A.kI.prototype={
$1(a){return J.n(J.m(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.kJ.prototype={
$1(a){return A.ao(t.f.a(J.m(t.P.a(a),"body")),t.N,t.z)},
$S:26}
A.kK.prototype={
$1(a){var s,r
t.P.a(a)
s=J.D(a)
r=s.h(a,"house_id")
if(B.a.t(J.M(r==null?"":r).toUpperCase())===this.a){s=s.h(a,"billing_month")
s=B.a.t(J.M(s==null?"":s).toLowerCase())===this.b}else s=!1
return s},
$S:0}
A.ko.prototype={
$1(a){var s="operation_id"
return J.n(J.m(t.P.a(a),s),this.a.h(0,s))},
$S:0}
A.n3.prototype={
$1(a){var s=0,r=A.S(t.a),q=this,p,o,n,m
var $async$$1=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:m=q.a
if(m==null||A.bI()!==m)throw A.b(A.ai("Session changed before local save"))
m=q.b
p=m==="collections"?"waterhall_offline_collections":"waterhall_unsynced_actions"
o=window.localStorage.getItem(p)
o=J.di(t.j.a(B.e.L(0,o==null?"[]":o)),new A.n2(),t.P)
n=A.ab(o,o.$ti.i("af.E"))
q.c.$1(n)
s=2
return A.z(A.mK(m,n),$async$$1)
case 2:return A.Q(null,r)}})
return A.R($async$$1,r)},
$S:67}
A.n2.prototype={
$1(a){return A.ao(t.f.a(a),t.N,t.z)},
$S:20}
A.n4.prototype={
$1(a){},
$S:14}
A.mL.prototype={
$1(a){var s,r
t.P.a(a)
s=J.D(a)
r=s.h(a,"owner")
s=r==null?s.h(a,"collected_by"):r
return J.n(s,this.a)},
$S:0}
A.na.prototype={
$1(a){var s,r,q,p,o,n
t.p.a(a)
for(s=a.length,r=this.a,q=0;q<a.length;a.length===s||(0,A.aE)(a),++q){p=a[q]
o=J.D(p)
n=o.h(p,"transaction_id")
r.fS(0,J.M(n==null?o.h(p,"operation_id"):n),new A.n9(p))}B.b.aJ(a)
B.b.S(a,new A.aU(r,A.y(r).i("aU<2>")))},
$S:6}
A.n9.prototype={
$0(){return this.a},
$S:28};(function aliases(){var s=J.cJ.prototype
s.e6=s.l
s=J.bV.prototype
s.ea=s.l
s=A.k.prototype
s.eb=s.bE
s=A.f.prototype
s.e7=s.bA
s=A.F.prototype
s.ec=s.l
s=A.E.prototype
s.bF=s.a2
s=A.d.prototype
s.e5=s.bi
s=A.er.prototype
s.ee=s.aj
s=A.bl.prototype
s.e8=s.h
s.e9=s.k
s=A.d2.prototype
s.ed=s.k})();(function installTearOffs(){var s=hunkHelpers._static_1,r=hunkHelpers._static_0,q=hunkHelpers._static_2,p=hunkHelpers._instance_2u,o=hunkHelpers._instance_0u,n=hunkHelpers.installStaticTearOff,m=hunkHelpers._instance_2i
s(A,"ua","rA",17)
s(A,"ub","rB",17)
s(A,"uc","rC",17)
r(A,"pP","u3",2)
s(A,"ud","tU",12)
q(A,"uf","tW",33)
r(A,"ue","tV",2)
p(A.W.prototype,"gcF","ez",33)
o(A.d1.prototype,"geN","eO",2)
s(A,"uh","tv",13)
n(A,"up",4,null,["$4"],["rJ"],27,0)
n(A,"uq",4,null,["$4"],["rK"],27,0)
m(A.bu.prototype,"ge_","cp",7)
s(A,"uy","nP",25)
s(A,"ux","nO",46)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.mixinHard,q=hunkHelpers.inherit,p=hunkHelpers.inheritMany
q(A.F,null)
p(A.F,[A.nq,J.cJ,A.cS,J.b7,A.Z,A.k,A.bQ,A.lD,A.f,A.bw,A.dL,A.bf,A.e5,A.aB,A.bD,A.B,A.c_,A.cO,A.dl,A.ek,A.fh,A.lJ,A.lz,A.dv,A.eu,A.ml,A.lo,A.dI,A.dJ,A.dH,A.fj,A.mj,A.i1,A.bc,A.hl,A.mt,A.ey,A.h2,A.ev,A.az,A.bZ,A.d0,A.e7,A.h7,A.bg,A.W,A.h3,A.eb,A.hE,A.d1,A.hP,A.eF,A.eh,A.aq,A.hu,A.cu,A.ax,A.c9,A.f0,A.lY,A.mh,A.mw,A.a9,A.br,A.fD,A.e_,A.m2,A.bk,A.al,A.a6,A.hS,A.ar,A.eC,A.lP,A.b0,A.ki,A.nm,A.ee,A.cs,A.x,A.dS,A.er,A.hU,A.cc,A.ha,A.hK,A.eE,A.bl,A.ly,A.me,A.ip,A.aS,A.kj])
p(J.cJ,[J.fg,J.dC,J.a,J.cK,J.cL,J.cf,J.bU])
p(J.a,[J.bV,J.ae,A.ck,A.dO,A.d,A.eN,A.bO,A.b8,A.X,A.h9,A.aA,A.f5,A.f6,A.dq,A.hd,A.ds,A.hf,A.f8,A.o,A.hj,A.aI,A.fc,A.ho,A.cI,A.cN,A.fo,A.hw,A.hx,A.aK,A.hy,A.hA,A.aL,A.hF,A.hI,A.aO,A.hL,A.aP,A.hO,A.au,A.hW,A.fS,A.aR,A.hY,A.fU,A.h_,A.i3,A.i5,A.i7,A.i9,A.ib,A.cM,A.aT,A.hs,A.aW,A.hC,A.fG,A.hQ,A.aX,A.i_,A.eS,A.h5])
p(J.bV,[J.fE,J.bC,J.bv])
p(A.cS,[J.ff,A.hJ])
q(J.lk,J.ae)
p(J.cf,[J.dB,J.fi])
p(A.Z,[A.dF,A.bA,A.fk,A.fX,A.fI,A.hi,A.dE,A.eP,A.b5,A.fA,A.e4,A.fW,A.bz,A.f_])
p(A.k,[A.cX,A.h6,A.bG,A.aw,A.fb])
p(A.cX,[A.eZ,A.e3])
p(A.bQ,[A.eX,A.eY,A.fP,A.mW,A.mY,A.lV,A.lU,A.mD,A.mc,A.lH,A.lG,A.mn,A.lq,A.l8,A.l9,A.lb,A.lx,A.m0,A.m1,A.lw,A.lv,A.mo,A.mp,A.mq,A.mG,A.kg,A.kh,A.lc,A.ld,A.mI,A.mJ,A.mO,A.mP,A.mQ,A.n_,A.n7,A.n8,A.n0,A.jj,A.jk,A.jl,A.jm,A.iT,A.iP,A.iQ,A.iR,A.iS,A.iW,A.iX,A.iY,A.j5,A.j6,A.iV,A.j7,A.j8,A.j9,A.ja,A.jb,A.jc,A.iZ,A.j_,A.j0,A.j1,A.j2,A.j3,A.j4,A.jd,A.jZ,A.k_,A.k0,A.k8,A.jz,A.jA,A.jy,A.jB,A.jx,A.jv,A.jw,A.jD,A.js,A.jt,A.ju,A.jE,A.jq,A.jG,A.jH,A.jF,A.jo,A.jV,A.jW,A.jX,A.jY,A.jI,A.jJ,A.jK,A.jL,A.jM,A.je,A.jf,A.jg,A.jh,A.ji,A.k2,A.k3,A.k1,A.jp,A.ka,A.k4,A.k5,A.k6,A.jN,A.jO,A.jP,A.jQ,A.jT,A.iK,A.iJ,A.iL,A.iM,A.iN,A.iO,A.ir,A.is,A.it,A.iy,A.iG,A.iz,A.iA,A.iB,A.iC,A.iD,A.iE,A.iF,A.iu,A.iv,A.iw,A.ix,A.km,A.kn,A.kq,A.kr,A.ks,A.kF,A.kG,A.kp,A.kR,A.kS,A.kX,A.kY,A.kV,A.kZ,A.l_,A.kL,A.kM,A.kN,A.kO,A.kP,A.kQ,A.kv,A.kE,A.kU,A.kT,A.l1,A.l2,A.l3,A.kl,A.kk,A.kD,A.l4,A.kC,A.kA,A.kw,A.kx,A.ky,A.kH,A.kI,A.kJ,A.kK,A.ko,A.n3,A.n2,A.n4,A.mL,A.na])
p(A.eX,[A.n5,A.lW,A.lX,A.ms,A.mr,A.lg,A.m3,A.m8,A.m7,A.m5,A.m4,A.mb,A.ma,A.m9,A.lI,A.lF,A.mk,A.mF,A.mm,A.mM,A.my,A.mx,A.l6,A.jn,A.iU,A.jr,A.k7,A.iq,A.ku,A.kt,A.n9])
p(A.f,[A.l,A.aC,A.J,A.co,A.ej,A.d4])
p(A.l,[A.af,A.ch,A.aU,A.dG,A.eg])
p(A.af,[A.e1,A.a_,A.hv,A.hr])
q(A.bs,A.aC)
p(A.B,[A.cY,A.b9,A.ef,A.hq,A.h4,A.hb])
q(A.cj,A.cY)
q(A.d6,A.cO)
q(A.c1,A.d6)
q(A.dm,A.c1)
q(A.bp,A.dl)
p(A.eY,[A.lB,A.ll,A.mX,A.mE,A.mN,A.md,A.lp,A.lr,A.mi,A.lu,A.lR,A.lQ,A.ls,A.lt,A.lC,A.lE,A.lZ,A.m_,A.mA,A.mS,A.kd,A.k9,A.jC,A.jU,A.kb,A.jR,A.jS,A.iI,A.iH,A.kW,A.l0,A.kB,A.kz])
q(A.dT,A.bA)
p(A.fP,[A.fL,A.cF])
p(A.dO,[A.dM,A.ap])
p(A.ap,[A.em,A.eo])
q(A.en,A.em)
q(A.dN,A.en)
q(A.ep,A.eo)
q(A.aV,A.ep)
p(A.dN,[A.ft,A.fu])
p(A.aV,[A.fv,A.fw,A.fx,A.fy,A.fz,A.dP,A.dQ])
q(A.d5,A.hi)
p(A.bZ,[A.d3,A.cq])
q(A.e8,A.d3)
q(A.d_,A.e8)
q(A.e9,A.d0)
q(A.bF,A.e9)
q(A.e6,A.e7)
q(A.bE,A.h7)
q(A.ea,A.eb)
q(A.hH,A.eF)
q(A.ei,A.ef)
p(A.aq,[A.eq,A.f1])
q(A.ct,A.eq)
p(A.c9,[A.dk,A.f9,A.fl])
p(A.f0,[A.eV,A.ke,A.ln,A.lm,A.lS])
q(A.fm,A.dE)
q(A.mg,A.mh)
q(A.h0,A.f9)
p(A.b5,[A.cQ,A.fd])
q(A.hc,A.eC)
p(A.d,[A.t,A.du,A.dx,A.fa,A.ce,A.fp,A.aN,A.es,A.aQ,A.av,A.ew,A.h1,A.c2,A.bn,A.eU,A.bN])
p(A.t,[A.E,A.bj,A.cb,A.cZ])
p(A.E,[A.q,A.r])
p(A.q,[A.cD,A.eO,A.cE,A.c8,A.bP,A.dp,A.cH,A.dy,A.dA,A.bT,A.bx,A.dU,A.bY,A.e2,A.fN,A.fO,A.cV,A.cm])
q(A.f2,A.b8)
q(A.ca,A.h9)
p(A.aA,[A.f3,A.f4])
q(A.he,A.hd)
q(A.dr,A.he)
q(A.hg,A.hf)
q(A.f7,A.hg)
q(A.aH,A.bO)
q(A.hk,A.hj)
q(A.dw,A.hk)
q(A.hp,A.ho)
q(A.bS,A.hp)
q(A.dz,A.cb)
q(A.bu,A.ce)
q(A.fq,A.hw)
q(A.fr,A.hx)
q(A.hz,A.hy)
q(A.fs,A.hz)
p(A.o,[A.be,A.aZ])
q(A.at,A.be)
q(A.hB,A.hA)
q(A.dR,A.hB)
q(A.hG,A.hF)
q(A.fF,A.hG)
q(A.fH,A.hI)
q(A.et,A.es)
q(A.fJ,A.et)
q(A.hM,A.hL)
q(A.fK,A.hM)
q(A.e0,A.hO)
q(A.hX,A.hW)
q(A.fQ,A.hX)
q(A.ex,A.ew)
q(A.fR,A.ex)
q(A.hZ,A.hY)
q(A.fT,A.hZ)
q(A.i4,A.i3)
q(A.h8,A.i4)
q(A.ec,A.ds)
q(A.i6,A.i5)
q(A.hm,A.i6)
q(A.i8,A.i7)
q(A.el,A.i8)
q(A.ia,A.i9)
q(A.hN,A.ia)
q(A.ic,A.ib)
q(A.hT,A.ic)
q(A.ed,A.h4)
p(A.f1,[A.hh,A.eR])
q(A.cp,A.cq)
q(A.hV,A.er)
p(A.bl,[A.dD,A.d2])
q(A.cg,A.d2)
q(A.ht,A.hs)
q(A.fn,A.ht)
q(A.hD,A.hC)
q(A.fB,A.hD)
q(A.cT,A.r)
q(A.hR,A.hQ)
q(A.fM,A.hR)
q(A.i0,A.i_)
q(A.fV,A.i0)
q(A.eT,A.h5)
q(A.fC,A.bN)
s(A.cX,A.bD)
s(A.em,A.k)
s(A.en,A.aB)
s(A.eo,A.k)
s(A.ep,A.aB)
s(A.cY,A.ax)
s(A.d6,A.ax)
s(A.h9,A.ki)
s(A.hd,A.k)
s(A.he,A.x)
s(A.hf,A.k)
s(A.hg,A.x)
s(A.hj,A.k)
s(A.hk,A.x)
s(A.ho,A.k)
s(A.hp,A.x)
s(A.hw,A.B)
s(A.hx,A.B)
s(A.hy,A.k)
s(A.hz,A.x)
s(A.hA,A.k)
s(A.hB,A.x)
s(A.hF,A.k)
s(A.hG,A.x)
s(A.hI,A.B)
s(A.es,A.k)
s(A.et,A.x)
s(A.hL,A.k)
s(A.hM,A.x)
s(A.hO,A.B)
s(A.hW,A.k)
s(A.hX,A.x)
s(A.ew,A.k)
s(A.ex,A.x)
s(A.hY,A.k)
s(A.hZ,A.x)
s(A.i3,A.k)
s(A.i4,A.x)
s(A.i5,A.k)
s(A.i6,A.x)
s(A.i7,A.k)
s(A.i8,A.x)
s(A.i9,A.k)
s(A.ia,A.x)
s(A.ib,A.k)
s(A.ic,A.x)
r(A.d2,A.k)
s(A.hs,A.k)
s(A.ht,A.x)
s(A.hC,A.k)
s(A.hD,A.x)
s(A.hQ,A.k)
s(A.hR,A.x)
s(A.i_,A.k)
s(A.i0,A.x)
s(A.h5,A.B)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{j:"int",V:"double",a0:"num",c:"String",I:"bool",a6:"Null",p:"List",F:"Object",u:"Map",i:"JSObject"},mangledNames:{},types:["I(u<c,@>)","~(at)","~()","~(o)","ad<~>(at)","~(u<c,@>)","~(p<u<c,@>>)","~(c,c)","I(c)","c(c)","~(E)","~(c,@)","~(@)","@(@)","a6(@)","a6()","j(u<c,@>,u<c,@>)","~(~())","a6(o)","~(aZ)","u<c,@>(@)","ad<~>(o)","@()","I(ba)","~(c)","F?(F?)","u<c,@>(u<c,@>)","I(E,c,c,cs)","u<c,@>()","c(u<c,F>)","@(u<c,@>)","~(F?,F?)","~(@,@)","~(F,bd)","~(cW)","I(t)","j(c?)","~(j,@)","cg<@>(@)","~(I)","dD(@)","ad<~>(cW)","a6(F,bd)","E(t)","~(b_<c>)","~(t,t?)","F?(@)","~(c,E)","~(u<c,c>)","~(j,c)","a6(@,bd)","a0(a0,a0)","u<c,F>(al<j,a0>)","a6(~())","~(u<c,F>)","a6(c)","c(@,j)","a6(@,@,@,@)","~(cG?,c)","ad<~>(cG?)","ad<~>(~)","~(cU,@)","0&()","@(@,c)","u<c,c>(u<c,c>,c)","ad<~>()","@(c)","ad<a6>(~)","0&(c,j?)","I(b_<c>)","bl(@)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.t2(v.typeUniverse,JSON.parse('{"fE":"bV","bC":"bV","bv":"bV","vd":"a","ve":"a","uM":"a","uK":"o","v8":"o","uN":"bN","uL":"d","vi":"d","vm":"d","uJ":"r","va":"r","vH":"aZ","uO":"q","vg":"q","vn":"t","v7":"t","vB":"cb","vj":"at","vA":"av","uQ":"be","v1":"bn","uP":"bj","vp":"bj","vf":"E","vc":"ce","vb":"bS","uR":"X","uU":"b8","uX":"au","uY":"aA","uT":"aA","uV":"aA","vh":"ck","fg":{"I":[],"Y":[]},"dC":{"a6":[],"Y":[]},"a":{"i":[]},"bV":{"i":[]},"ae":{"p":["1"],"l":["1"],"i":[],"f":["1"]},"ff":{"cS":[]},"lk":{"ae":["1"],"p":["1"],"l":["1"],"i":[],"f":["1"]},"b7":{"aa":["1"]},"cf":{"V":[],"a0":[]},"dB":{"V":[],"j":[],"a0":[],"Y":[]},"fi":{"V":[],"a0":[],"Y":[]},"bU":{"c":[],"lA":[],"Y":[]},"dF":{"Z":[]},"eZ":{"k":["j"],"bD":["j"],"p":["j"],"l":["j"],"f":["j"],"k.E":"j","bD.E":"j"},"l":{"f":["1"]},"af":{"l":["1"],"f":["1"]},"e1":{"af":["1"],"l":["1"],"f":["1"],"af.E":"1","f.E":"1"},"bw":{"aa":["1"]},"aC":{"f":["2"],"f.E":"2"},"bs":{"aC":["1","2"],"l":["2"],"f":["2"],"f.E":"2"},"dL":{"aa":["2"]},"a_":{"af":["2"],"l":["2"],"f":["2"],"af.E":"2","f.E":"2"},"J":{"f":["1"],"f.E":"1"},"bf":{"aa":["1"]},"co":{"f":["1"],"f.E":"1"},"e5":{"aa":["1"]},"cX":{"k":["1"],"bD":["1"],"p":["1"],"l":["1"],"f":["1"]},"hv":{"af":["j"],"l":["j"],"f":["j"],"af.E":"j","f.E":"j"},"cj":{"B":["j","1"],"ax":["j","1"],"u":["j","1"],"B.K":"j","B.V":"1","ax.K":"j","ax.V":"1"},"c_":{"cU":[]},"dm":{"c1":["1","2"],"d6":["1","2"],"cO":["1","2"],"ax":["1","2"],"u":["1","2"],"ax.K":"1","ax.V":"2"},"dl":{"u":["1","2"]},"bp":{"dl":["1","2"],"u":["1","2"]},"ej":{"f":["1"],"f.E":"1"},"ek":{"aa":["1"]},"fh":{"oq":[]},"dT":{"bA":[],"Z":[]},"fk":{"Z":[]},"fX":{"Z":[]},"eu":{"bd":[]},"bQ":{"cd":[]},"eX":{"cd":[]},"eY":{"cd":[]},"fP":{"cd":[]},"fL":{"cd":[]},"cF":{"cd":[]},"fI":{"Z":[]},"b9":{"B":["1","2"],"ov":["1","2"],"u":["1","2"],"B.K":"1","B.V":"2"},"ch":{"l":["1"],"f":["1"],"f.E":"1"},"dI":{"aa":["1"]},"aU":{"l":["1"],"f":["1"],"f.E":"1"},"dJ":{"aa":["1"]},"dG":{"l":["al<1,2>"],"f":["al<1,2>"],"f.E":"al<1,2>"},"dH":{"aa":["al<1,2>"]},"fj":{"rr":[],"lA":[]},"ck":{"i":[],"eW":[],"Y":[]},"dO":{"i":[],"ac":[]},"i1":{"eW":[]},"dM":{"kf":[],"i":[],"ac":[],"Y":[]},"ap":{"L":["1"],"i":[],"ac":[]},"dN":{"k":["V"],"ap":["V"],"p":["V"],"L":["V"],"l":["V"],"i":[],"ac":[],"f":["V"],"aB":["V"]},"aV":{"k":["j"],"ap":["j"],"p":["j"],"L":["j"],"l":["j"],"i":[],"ac":[],"f":["j"],"aB":["j"]},"ft":{"le":[],"k":["V"],"ap":["V"],"p":["V"],"L":["V"],"l":["V"],"i":[],"ac":[],"f":["V"],"aB":["V"],"Y":[],"k.E":"V"},"fu":{"lf":[],"k":["V"],"ap":["V"],"p":["V"],"L":["V"],"l":["V"],"i":[],"ac":[],"f":["V"],"aB":["V"],"Y":[],"k.E":"V"},"fv":{"aV":[],"lh":[],"k":["j"],"ap":["j"],"p":["j"],"L":["j"],"l":["j"],"i":[],"ac":[],"f":["j"],"aB":["j"],"Y":[],"k.E":"j"},"fw":{"aV":[],"li":[],"k":["j"],"ap":["j"],"p":["j"],"L":["j"],"l":["j"],"i":[],"ac":[],"f":["j"],"aB":["j"],"Y":[],"k.E":"j"},"fx":{"aV":[],"lj":[],"k":["j"],"ap":["j"],"p":["j"],"L":["j"],"l":["j"],"i":[],"ac":[],"f":["j"],"aB":["j"],"Y":[],"k.E":"j"},"fy":{"aV":[],"lL":[],"k":["j"],"ap":["j"],"p":["j"],"L":["j"],"l":["j"],"i":[],"ac":[],"f":["j"],"aB":["j"],"Y":[],"k.E":"j"},"fz":{"aV":[],"lM":[],"k":["j"],"ap":["j"],"p":["j"],"L":["j"],"l":["j"],"i":[],"ac":[],"f":["j"],"aB":["j"],"Y":[],"k.E":"j"},"dP":{"aV":[],"lN":[],"k":["j"],"ap":["j"],"p":["j"],"L":["j"],"l":["j"],"i":[],"ac":[],"f":["j"],"aB":["j"],"Y":[],"k.E":"j"},"dQ":{"aV":[],"lO":[],"k":["j"],"ap":["j"],"p":["j"],"L":["j"],"l":["j"],"i":[],"ac":[],"f":["j"],"aB":["j"],"Y":[],"k.E":"j"},"hi":{"Z":[]},"d5":{"bA":[],"Z":[]},"ey":{"cW":[]},"ev":{"aa":["1"]},"d4":{"f":["1"],"f.E":"1"},"az":{"Z":[]},"d_":{"e8":["1"],"d3":["1"],"bZ":["1"]},"bF":{"e9":["1"],"d0":["1"],"bm":["1"],"c3":["1"]},"e7":{"oN":["1"],"p9":["1"],"c3":["1"]},"e6":{"e7":["1"],"oN":["1"],"p9":["1"],"c3":["1"]},"bE":{"h7":["1"]},"W":{"ad":["1"]},"e8":{"d3":["1"],"bZ":["1"]},"e9":{"d0":["1"],"bm":["1"],"c3":["1"]},"d0":{"bm":["1"],"c3":["1"]},"d3":{"bZ":["1"]},"ea":{"eb":["1"]},"d1":{"bm":["1"]},"eF":{"oY":[]},"hH":{"eF":[],"oY":[]},"ef":{"B":["1","2"],"u":["1","2"]},"ei":{"ef":["1","2"],"B":["1","2"],"u":["1","2"],"B.K":"1","B.V":"2"},"eg":{"l":["1"],"f":["1"],"f.E":"1"},"eh":{"aa":["1"]},"ct":{"aq":["1"],"b_":["1"],"l":["1"],"f":["1"],"aq.E":"1"},"cu":{"aa":["1"]},"e3":{"k":["1"],"bD":["1"],"p":["1"],"l":["1"],"f":["1"],"k.E":"1","bD.E":"1"},"k":{"p":["1"],"l":["1"],"f":["1"]},"B":{"u":["1","2"]},"cY":{"B":["1","2"],"ax":["1","2"],"u":["1","2"]},"cO":{"u":["1","2"]},"c1":{"d6":["1","2"],"cO":["1","2"],"ax":["1","2"],"u":["1","2"],"ax.K":"1","ax.V":"2"},"aq":{"b_":["1"],"l":["1"],"f":["1"]},"eq":{"aq":["1"],"b_":["1"],"l":["1"],"f":["1"]},"hq":{"B":["c","@"],"u":["c","@"],"B.K":"c","B.V":"@"},"hr":{"af":["c"],"l":["c"],"f":["c"],"af.E":"c","f.E":"c"},"dk":{"c9":["p<j>","c"]},"f9":{"c9":["c","p<j>"]},"dE":{"Z":[]},"fm":{"Z":[]},"fl":{"c9":["F?","c"]},"h0":{"c9":["c","p<j>"]},"V":{"a0":[]},"j":{"a0":[]},"p":{"l":["1"],"f":["1"]},"b_":{"l":["1"],"f":["1"]},"c":{"lA":[]},"eP":{"Z":[]},"bA":{"Z":[]},"b5":{"Z":[]},"cQ":{"Z":[]},"fd":{"Z":[]},"fA":{"Z":[]},"e4":{"Z":[]},"fW":{"Z":[]},"bz":{"Z":[]},"f_":{"Z":[]},"fD":{"Z":[]},"e_":{"Z":[]},"hS":{"bd":[]},"ar":{"rt":[]},"eC":{"fY":[]},"b0":{"fY":[]},"hc":{"fY":[]},"X":{"i":[]},"E":{"t":[],"d":[],"i":[]},"o":{"i":[]},"aH":{"bO":[],"i":[]},"aI":{"i":[]},"bu":{"d":[],"i":[]},"cG":{"E":[],"t":[],"d":[],"i":[]},"aK":{"i":[]},"at":{"o":[],"i":[]},"t":{"d":[],"i":[]},"bx":{"q":[],"E":[],"t":[],"d":[],"i":[]},"aL":{"i":[]},"aZ":{"o":[],"i":[]},"aN":{"d":[],"i":[]},"aO":{"i":[]},"aP":{"i":[]},"au":{"i":[]},"aQ":{"d":[],"i":[]},"av":{"d":[],"i":[]},"aR":{"i":[]},"cs":{"ba":[]},"q":{"E":[],"t":[],"d":[],"i":[]},"eN":{"i":[]},"cD":{"q":[],"E":[],"t":[],"d":[],"i":[]},"eO":{"q":[],"E":[],"t":[],"d":[],"i":[]},"cE":{"q":[],"E":[],"t":[],"d":[],"i":[]},"bO":{"i":[]},"c8":{"q":[],"E":[],"t":[],"d":[],"i":[]},"bP":{"q":[],"E":[],"t":[],"d":[],"i":[]},"bj":{"t":[],"d":[],"i":[]},"f2":{"i":[]},"ca":{"i":[]},"aA":{"i":[]},"b8":{"i":[]},"f3":{"i":[]},"f4":{"i":[]},"f5":{"i":[]},"dp":{"q":[],"E":[],"t":[],"d":[],"i":[]},"cb":{"t":[],"d":[],"i":[]},"f6":{"i":[]},"dq":{"i":[]},"dr":{"k":["bb<a0>"],"x":["bb<a0>"],"p":["bb<a0>"],"L":["bb<a0>"],"l":["bb<a0>"],"i":[],"f":["bb<a0>"],"x.E":"bb<a0>","k.E":"bb<a0>"},"ds":{"bb":["a0"],"i":[]},"f7":{"k":["c"],"x":["c"],"p":["c"],"L":["c"],"l":["c"],"i":[],"f":["c"],"x.E":"c","k.E":"c"},"f8":{"i":[]},"h6":{"k":["E"],"p":["E"],"l":["E"],"f":["E"],"k.E":"E"},"bG":{"k":["1"],"p":["1"],"l":["1"],"f":["1"],"k.E":"1"},"du":{"d":[],"i":[]},"d":{"i":[]},"dw":{"k":["aH"],"x":["aH"],"p":["aH"],"L":["aH"],"l":["aH"],"i":[],"f":["aH"],"x.E":"aH","k.E":"aH"},"dx":{"d":[],"i":[]},"fa":{"d":[],"i":[]},"cH":{"q":[],"E":[],"t":[],"d":[],"i":[]},"dy":{"q":[],"E":[],"t":[],"d":[],"i":[]},"fc":{"i":[]},"bS":{"k":["t"],"x":["t"],"p":["t"],"L":["t"],"l":["t"],"i":[],"f":["t"],"x.E":"t","k.E":"t"},"dz":{"t":[],"d":[],"i":[]},"ce":{"d":[],"i":[]},"cI":{"i":[]},"dA":{"q":[],"E":[],"t":[],"d":[],"i":[]},"bT":{"oj":[],"cG":[],"q":[],"E":[],"t":[],"d":[],"i":[]},"cN":{"i":[]},"fo":{"i":[]},"fp":{"d":[],"i":[]},"fq":{"B":["c","@"],"i":[],"u":["c","@"],"B.K":"c","B.V":"@"},"fr":{"B":["c","@"],"i":[],"u":["c","@"],"B.K":"c","B.V":"@"},"fs":{"k":["aK"],"x":["aK"],"p":["aK"],"L":["aK"],"l":["aK"],"i":[],"f":["aK"],"x.E":"aK","k.E":"aK"},"aw":{"k":["t"],"p":["t"],"l":["t"],"f":["t"],"k.E":"t"},"dR":{"k":["t"],"x":["t"],"p":["t"],"L":["t"],"l":["t"],"i":[],"f":["t"],"x.E":"t","k.E":"t"},"dU":{"q":[],"E":[],"t":[],"d":[],"i":[]},"fF":{"k":["aL"],"x":["aL"],"p":["aL"],"L":["aL"],"l":["aL"],"i":[],"f":["aL"],"x.E":"aL","k.E":"aL"},"fH":{"B":["c","@"],"i":[],"u":["c","@"],"B.K":"c","B.V":"@"},"bY":{"q":[],"E":[],"t":[],"d":[],"i":[]},"fJ":{"k":["aN"],"x":["aN"],"p":["aN"],"d":[],"L":["aN"],"l":["aN"],"i":[],"f":["aN"],"x.E":"aN","k.E":"aN"},"fK":{"k":["aO"],"x":["aO"],"p":["aO"],"L":["aO"],"l":["aO"],"i":[],"f":["aO"],"x.E":"aO","k.E":"aO"},"e0":{"B":["c","c"],"i":[],"u":["c","c"],"B.K":"c","B.V":"c"},"e2":{"q":[],"E":[],"t":[],"d":[],"i":[]},"fN":{"q":[],"E":[],"t":[],"d":[],"i":[]},"fO":{"q":[],"E":[],"t":[],"d":[],"i":[]},"cV":{"q":[],"E":[],"t":[],"d":[],"i":[]},"cm":{"q":[],"E":[],"t":[],"d":[],"i":[]},"fQ":{"k":["av"],"x":["av"],"p":["av"],"L":["av"],"l":["av"],"i":[],"f":["av"],"x.E":"av","k.E":"av"},"fR":{"k":["aQ"],"x":["aQ"],"p":["aQ"],"d":[],"L":["aQ"],"l":["aQ"],"i":[],"f":["aQ"],"x.E":"aQ","k.E":"aQ"},"fS":{"i":[]},"fT":{"k":["aR"],"x":["aR"],"p":["aR"],"L":["aR"],"l":["aR"],"i":[],"f":["aR"],"x.E":"aR","k.E":"aR"},"fU":{"i":[]},"be":{"o":[],"i":[]},"h_":{"i":[]},"h1":{"d":[],"i":[]},"c2":{"lT":[],"d":[],"i":[]},"bn":{"d":[],"i":[]},"cZ":{"t":[],"d":[],"i":[]},"h8":{"k":["X"],"x":["X"],"p":["X"],"L":["X"],"l":["X"],"i":[],"f":["X"],"x.E":"X","k.E":"X"},"ec":{"bb":["a0"],"i":[]},"hm":{"k":["aI?"],"x":["aI?"],"p":["aI?"],"L":["aI?"],"l":["aI?"],"i":[],"f":["aI?"],"x.E":"aI?","k.E":"aI?"},"el":{"k":["t"],"x":["t"],"p":["t"],"L":["t"],"l":["t"],"i":[],"f":["t"],"x.E":"t","k.E":"t"},"hN":{"k":["aP"],"x":["aP"],"p":["aP"],"L":["aP"],"l":["aP"],"i":[],"f":["aP"],"x.E":"aP","k.E":"aP"},"hT":{"k":["au"],"x":["au"],"p":["au"],"L":["au"],"l":["au"],"i":[],"f":["au"],"x.E":"au","k.E":"au"},"h4":{"B":["c","c"],"u":["c","c"]},"ed":{"B":["c","c"],"u":["c","c"],"B.K":"c","B.V":"c"},"hb":{"B":["c","c"],"u":["c","c"],"B.K":"c","B.V":"c"},"hh":{"aq":["c"],"b_":["c"],"l":["c"],"f":["c"],"aq.E":"c"},"cq":{"bZ":["1"]},"cp":{"cq":["1"],"bZ":["1"]},"ee":{"bm":["1"]},"dS":{"ba":[]},"er":{"ba":[]},"hV":{"ba":[]},"hU":{"ba":[]},"cc":{"aa":["1"]},"ha":{"lT":[],"d":[],"i":[]},"hK":{"rv":[]},"eE":{"rf":[]},"f1":{"aq":["c"],"b_":["c"],"l":["c"],"f":["c"]},"fb":{"k":["E"],"p":["E"],"l":["E"],"f":["E"],"k.E":"E"},"cM":{"i":[]},"cg":{"k":["1"],"p":["1"],"l":["1"],"f":["1"],"k.E":"1"},"hJ":{"cS":[]},"aT":{"i":[]},"aW":{"i":[]},"aX":{"i":[]},"fn":{"k":["aT"],"x":["aT"],"p":["aT"],"l":["aT"],"i":[],"f":["aT"],"x.E":"aT","k.E":"aT"},"fB":{"k":["aW"],"x":["aW"],"p":["aW"],"l":["aW"],"i":[],"f":["aW"],"x.E":"aW","k.E":"aW"},"fG":{"i":[]},"cT":{"r":[],"E":[],"t":[],"d":[],"i":[]},"fM":{"k":["c"],"x":["c"],"p":["c"],"l":["c"],"i":[],"f":["c"],"x.E":"c","k.E":"c"},"eR":{"aq":["c"],"b_":["c"],"l":["c"],"f":["c"],"aq.E":"c"},"r":{"E":[],"t":[],"d":[],"i":[]},"fV":{"k":["aX"],"x":["aX"],"p":["aX"],"l":["aX"],"i":[],"f":["aX"],"x.E":"aX","k.E":"aX"},"eS":{"i":[]},"eT":{"B":["c","@"],"i":[],"u":["c","@"],"B.K":"c","B.V":"@"},"eU":{"d":[],"i":[]},"bN":{"d":[],"i":[]},"fC":{"d":[],"i":[]},"kf":{"ac":[]},"lj":{"p":["j"],"l":["j"],"ac":[],"f":["j"]},"lO":{"p":["j"],"l":["j"],"ac":[],"f":["j"]},"lN":{"p":["j"],"l":["j"],"ac":[],"f":["j"]},"lh":{"p":["j"],"l":["j"],"ac":[],"f":["j"]},"lL":{"p":["j"],"l":["j"],"ac":[],"f":["j"]},"li":{"p":["j"],"l":["j"],"ac":[],"f":["j"]},"lM":{"p":["j"],"l":["j"],"ac":[],"f":["j"]},"le":{"p":["V"],"l":["V"],"ac":[],"f":["V"]},"lf":{"p":["V"],"l":["V"],"ac":[],"f":["V"]}}'))
A.t1(v.typeUniverse,JSON.parse('{"l":1,"cX":1,"ap":1,"eb":1,"cY":2,"eq":1,"f0":2,"d2":1}'))
var u={f:"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u03f6\x00\u0404\u03f4 \u03f4\u03f6\u01f6\u01f6\u03f6\u03fc\u01f4\u03ff\u03ff\u0584\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u05d4\u01f4\x00\u01f4\x00\u0504\u05c4\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0400\x00\u0400\u0200\u03f7\u0200\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0200\u0200\u0200\u03f7\x00",p:": URI should have a non-empty host name: ",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.eJ
return{gS:s("@<~>"),n:s("az"),az:s("cE"),fj:s("bO"),hp:s("c8"),f_:s("bP"),lo:s("eW"),fW:s("kf"),i9:s("dm<cU,@>"),x:s("bp<c,c>"),d5:s("X"),cs:s("a9"),jS:s("br"),gt:s("l<@>"),h:s("E"),W:s("Z"),A:s("o"),et:s("aH"),pk:s("le"),kI:s("lf"),Y:s("cd"),la:s("bu"),ad:s("cI"),fY:s("bT"),m6:s("lh"),bW:s("li"),jx:s("lj"),bg:s("oq"),hl:s("f<t>"),e3:s("f<bx>"),R:s("f<@>"),fm:s("f<j>"),hq:s("ae<u<c,c>>"),t:s("ae<u<c,@>>"),lN:s("ae<ba>"),dw:s("ae<bm<@>>"),s:s("ae<c>"),B:s("ae<@>"),b:s("ae<j>"),T:s("dC"),m:s("i"),dY:s("bv"),dX:s("L<@>"),gq:s("cg<@>"),bX:s("b9<cU,@>"),mz:s("cM"),kT:s("aT"),fO:s("cj<c>"),p:s("p<u<c,@>>"),j:s("p<@>"),L:s("p<j>"),oT:s("p<a0>"),d:s("cN"),if:s("al<j,a0>"),dW:s("u<c,E>"),c:s("u<c,F>"),J:s("u<c,c>"),P:s("u<c,@>"),f:s("u<@,@>"),gQ:s("a_<c,c>"),ib:s("aK"),V:s("at"),aj:s("aV"),F:s("t"),hU:s("ba"),a:s("a6"),ai:s("aW"),K:s("F"),af:s("bx"),d8:s("aL"),D:s("aZ"),lZ:s("vl"),ku:s("bb<@>"),mx:s("bb<a0>"),nZ:s("cT"),gH:s("bY"),i:s("b_<c>"),ls:s("aN"),cA:s("aO"),hH:s("aP"),l:s("bd"),N:s("c"),gL:s("c(c)"),lv:s("au"),bC:s("r"),bR:s("cU"),fD:s("cV"),dQ:s("aQ"),gJ:s("av"),I:s("cW"),ki:s("aR"),hk:s("aX"),aJ:s("Y"),do:s("bA"),jv:s("ac"),hM:s("lL"),mC:s("lM"),nn:s("lN"),ev:s("lO"),cx:s("bC"),eG:s("e3<bx>"),ph:s("c1<c,c>"),jJ:s("fY"),U:s("J<c>"),hE:s("c2"),kg:s("lT"),f5:s("bn"),cz:s("bE<bu>"),cc:s("bE<c>"),nD:s("cZ"),aN:s("aw"),E:s("cp<o>"),C:s("cp<at>"),h6:s("cq<aZ>"),k:s("bG<E>"),gp:s("bG<bx>"),ax:s("W<bu>"),j2:s("W<c>"),_:s("W<@>"),hy:s("W<j>"),dl:s("cs"),mp:s("ei<F?,F?>"),y:s("I"),iW:s("I(F)"),Q:s("I(c)"),dx:s("V"),z:s("@"),mY:s("@()"),v:s("@(F)"),ng:s("@(F,bd)"),gA:s("@(b_<c>)"),S:s("j"),q:s("bP?"),aa:s("oj?"),mV:s("E?"),O:s("d?"),iC:s("cG?"),dD:s("cH?"),gK:s("ad<a6>?"),ef:s("aI?"),dH:s("q?"),G:s("bT?"),mU:s("i?"),lH:s("p<@>?"),lG:s("u<c,c>?"),dZ:s("u<c,@>?"),eO:s("u<@,@>?"),X:s("F?"),Z:s("bY?"),bl:s("c?"),r:s("cm?"),e:s("bg<@,@>?"),g:s("hu?"),fU:s("I?"),jX:s("V?"),o:s("@(o)?"),aV:s("j?"),jh:s("a0?"),jE:s("~()?"),oV:s("~(o)?"),b9:s("~(at)?"),gn:s("~(aZ)?"),mW:s("~(I)?"),w:s("a0"),H:s("~"),M:s("~()"),p9:s("~(E)"),i6:s("~(F)"),fQ:s("~(F,bd)"),bm:s("~(c,c)"),u:s("~(c,@)"),my:s("~(cW)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.N=A.cD.prototype
B.x=A.c8.prototype
B.m=A.bP.prototype
B.q=A.ca.prototype
B.a_=A.dp.prototype
B.a0=A.dq.prototype
B.a4=A.dw.prototype
B.a5=A.dx.prototype
B.a6=A.dy.prototype
B.C=A.dz.prototype
B.D=A.dA.prototype
B.f=A.bT.prototype
B.a7=J.cJ.prototype
B.b=J.ae.prototype
B.c=J.dB.prototype
B.d=J.cf.prototype
B.a=J.bU.prototype
B.a8=J.bv.prototype
B.a9=J.a.prototype
B.ah=A.dM.prototype
B.I=A.dQ.prototype
B.r=A.dU.prototype
B.K=J.fE.prototype
B.k=A.bY.prototype
B.j=A.e0.prototype
B.L=A.e2.prototype
B.l=A.cm.prototype
B.v=J.bC.prototype
B.M=A.c2.prototype
B.O=new A.aS(401,!0,null)
B.P=new A.aS(409,!1,null)
B.t=new A.aS(null,!1,null)
B.i=new A.aS(null,!0,null)
B.R=new A.eV(!1)
B.Q=new A.dk(B.R)
B.S=new A.eV(!0)
B.w=new A.dk(B.S)
B.y=new A.ke()
B.z=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.T=function() {
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
B.Y=function(getTagFallback) {
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
B.U=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.X=function(hooks) {
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
B.W=function(hooks) {
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
B.V=function(hooks) {
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
B.A=function(hooks) { return hooks; }

B.e=new A.fl()
B.Z=new A.fD()
B.n=new A.lD()
B.o=new A.h0()
B.B=new A.ml()
B.h=new A.hH()
B.p=new A.hS()
B.a1=new A.br(0)
B.a2=new A.br(1e6)
B.a3=new A.br(15e6)
B.aa=new A.lm(null)
B.ab=new A.ln(null)
B.ac=s([],t.s)
B.E=s([],t.B)
B.F=s(["bind","if","ref","repeat","syntax"],t.s)
B.u=s(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"],t.s)
B.ad=s(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"],t.s)
B.ae=s(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"],t.s)
B.ai={households:0,centralAssets:1,maintenanceLogs:2,workers:3,billingRecords:4,announcements:5,paymentSettings:6,billingConfig:7,offlineCollections:8,unsyncedActions:9}
B.G=new A.bp(B.ai,["waterhall_households","waterhall_central_assets","waterhall_maintenance_logs","waterhall_workers","waterhall_billing_records","waterhall_announcements","waterhall_payment_settings","waterhall_billing_config","waterhall_offline_collections","waterhall_unsynced_actions"],t.x)
B.aj={"/api/billing-records/add":0,"/api/maintenance-logs/add":1,"/api/reports/add":2,"/api/announcements/add":3,"/api/households/update":4}
B.af=new A.bp(B.aj,["Meter reading and bill","Maintenance report","Service report","Announcement","Household status"],t.x)
B.J={}
B.ag=new A.bp(B.J,[],t.x)
B.H=new A.bp(B.J,[],A.eJ("bp<cU,@>"))
B.ak=new A.c_("call")
B.al=A.bh("eW")
B.am=A.bh("kf")
B.an=A.bh("le")
B.ao=A.bh("lf")
B.ap=A.bh("lh")
B.aq=A.bh("li")
B.ar=A.bh("lj")
B.as=A.bh("F")
B.at=A.bh("lL")
B.au=A.bh("lM")
B.av=A.bh("lN")
B.aw=A.bh("lO")
B.ax=new A.lS(!1)})();(function staticFields(){$.mf=null
$.aY=A.A([],A.eJ("ae<F>"))
$.oE=null
$.oh=null
$.og=null
$.pT=null
$.pO=null
$.pY=null
$.mT=null
$.mZ=null
$.o_=null
$.da=null
$.eH=null
$.eI=null
$.nU=!1
$.O=B.h
$.oU=""
$.oV=null
$.bR=null
$.nl=null
$.oo=null
$.on=null
$.hn=A.an(t.N,t.Y)
$.uE=A.a5(["main_tank_level",null,"turbidity",null,"tds_ppm",null,"turbidity_status","unknown","has_reading",!1,"turbidity_desc","Awaiting sensor readings","last_updated",null],t.N,t.z)
$.pS=function(){var s=t.N
return A.a5(["payment_location","Barangay Tagpopongan Hall - Treasury Office","payment_method","In-Person Payment at Barangay Hall","allow_worker_collection","false","payment_instructions","Water bills are due on or before the 25th of each month. Payments must be settled in-person at the Barangay Hall Treasury Window. Field workers are not authorized to collect payments.","operating_hours","Monday - Friday, 8:00 AM - 5:00 PM","emergency_contact","Not configured; contact the Barangay office"],s,s)}()})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"v_","ik",()=>A.nZ("_$dart_dartClosure"))
s($,"uZ","q5",()=>A.nZ("_$dart_dartClosure_dartJSInterop"))
s($,"vS","ne",()=>B.h.dz(new A.n5(),A.eJ("ad<~>")))
s($,"vP","o8",()=>A.A([new J.ff()],A.eJ("ae<cS>")))
s($,"vq","qc",()=>A.bB(A.lK({
toString:function(){return"$receiver$"}})))
s($,"vr","qd",()=>A.bB(A.lK({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"vs","qe",()=>A.bB(A.lK(null)))
s($,"vt","qf",()=>A.bB(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"vw","qi",()=>A.bB(A.lK(void 0)))
s($,"vx","qj",()=>A.bB(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"vv","qh",()=>A.bB(A.oR(null)))
s($,"vu","qg",()=>A.bB(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"vz","ql",()=>A.bB(A.oR(void 0)))
s($,"vy","qk",()=>A.bB(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"vC","o4",()=>A.rz())
s($,"v9","nb",()=>$.ne())
s($,"vK","qq",()=>A.oz(4096))
s($,"vI","qo",()=>new A.my().$0())
s($,"vJ","qp",()=>new A.mx().$0())
s($,"vE","o5",()=>A.re(A.ty(A.A([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.b))))
s($,"vD","qm",()=>A.oz(0))
s($,"v0","q6",()=>A.oK("^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(?:[.,](\\d+))?)?)?( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$"))
s($,"vN","nc",()=>A.ij(B.as))
s($,"uW","q4",()=>({}))
s($,"vG","qn",()=>A.oy(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],t.N))
s($,"uS","q3",()=>A.oK("^\\S+$"))
s($,"v5","o3",()=>B.a.bk(A.nk(),"Opera",0))
s($,"v4","q9",()=>!$.o3()&&B.a.bk(A.nk(),"Trident/",0))
s($,"v3","q8",()=>B.a.bk(A.nk(),"Firefox",0))
s($,"v2","q7",()=>"-"+$.qa()+"-")
s($,"v6","qa",()=>{if($.q8())var q="moz"
else if($.q9())q="ms"
else q=$.o3()?"o":"webkit"
return q})
s($,"vL","dh",()=>A.pM(self))
s($,"vO","nd",()=>{$.o8().push(new A.hJ())
return!0})
s($,"vF","o6",()=>A.nZ("_$dart_dartObject"))
s($,"vM","o7",()=>function DartObject(a){this.o=a})
s($,"vk","qb",()=>{var q=new A.me(new DataView(new ArrayBuffer(A.tt(8))))
q.eh()
return q})
s($,"vQ","U",()=>{var q,p=t.t,o=A.A([],p),n=t.N,m=t.z,l=A.A([],p),k=A.A([],p),j=A.A([],p)
p=A.A([],p)
q=A.nn(null,t.H)
return new A.kj(o,A.an(n,m),l,k,j,p,A.an(n,n),A.an(n,m),q,new A.e6(null,null,A.eJ("e6<u<c,@>>")))})
r($,"tY","qr",()=>A.nn(null,t.H))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({WebGL:J.cJ,AnimationEffectReadOnly:J.a,AnimationEffectTiming:J.a,AnimationEffectTimingReadOnly:J.a,AnimationTimeline:J.a,AnimationWorkletGlobalScope:J.a,AuthenticatorAssertionResponse:J.a,AuthenticatorAttestationResponse:J.a,AuthenticatorResponse:J.a,BackgroundFetchFetch:J.a,BackgroundFetchManager:J.a,BackgroundFetchSettledFetch:J.a,BarProp:J.a,BarcodeDetector:J.a,BluetoothRemoteGATTDescriptor:J.a,Body:J.a,BudgetState:J.a,CacheStorage:J.a,CanvasGradient:J.a,CanvasPattern:J.a,CanvasRenderingContext2D:J.a,Client:J.a,Clients:J.a,CookieStore:J.a,Coordinates:J.a,Credential:J.a,CredentialUserData:J.a,CredentialsContainer:J.a,Crypto:J.a,CryptoKey:J.a,CSS:J.a,CSSVariableReferenceValue:J.a,CustomElementRegistry:J.a,DataTransfer:J.a,DataTransferItem:J.a,DeprecatedStorageInfo:J.a,DeprecatedStorageQuota:J.a,DeprecationReport:J.a,DetectedBarcode:J.a,DetectedFace:J.a,DetectedText:J.a,DeviceAcceleration:J.a,DeviceRotationRate:J.a,DirectoryEntry:J.a,webkitFileSystemDirectoryEntry:J.a,FileSystemDirectoryEntry:J.a,DirectoryReader:J.a,WebKitDirectoryReader:J.a,webkitFileSystemDirectoryReader:J.a,FileSystemDirectoryReader:J.a,DocumentOrShadowRoot:J.a,DocumentTimeline:J.a,DOMError:J.a,Iterator:J.a,DOMMatrix:J.a,DOMMatrixReadOnly:J.a,DOMParser:J.a,DOMPoint:J.a,DOMPointReadOnly:J.a,DOMQuad:J.a,DOMStringMap:J.a,Entry:J.a,webkitFileSystemEntry:J.a,FileSystemEntry:J.a,External:J.a,FaceDetector:J.a,FederatedCredential:J.a,FileEntry:J.a,webkitFileSystemFileEntry:J.a,FileSystemFileEntry:J.a,DOMFileSystem:J.a,WebKitFileSystem:J.a,webkitFileSystem:J.a,FileSystem:J.a,FontFace:J.a,FontFaceSource:J.a,FormData:J.a,GamepadButton:J.a,GamepadPose:J.a,Geolocation:J.a,Position:J.a,GeolocationPosition:J.a,Headers:J.a,HTMLHyperlinkElementUtils:J.a,IdleDeadline:J.a,ImageBitmap:J.a,ImageBitmapRenderingContext:J.a,ImageCapture:J.a,InputDeviceCapabilities:J.a,IntersectionObserver:J.a,IntersectionObserverEntry:J.a,InterventionReport:J.a,KeyframeEffect:J.a,KeyframeEffectReadOnly:J.a,MediaCapabilities:J.a,MediaCapabilitiesInfo:J.a,MediaDeviceInfo:J.a,MediaError:J.a,MediaKeyStatusMap:J.a,MediaKeySystemAccess:J.a,MediaKeys:J.a,MediaKeysPolicy:J.a,MediaMetadata:J.a,MediaSession:J.a,MediaSettingsRange:J.a,MemoryInfo:J.a,MessageChannel:J.a,Metadata:J.a,MutationObserver:J.a,WebKitMutationObserver:J.a,MutationRecord:J.a,NavigationPreloadManager:J.a,Navigator:J.a,NavigatorAutomationInformation:J.a,NavigatorConcurrentHardware:J.a,NavigatorCookies:J.a,NavigatorUserMediaError:J.a,NodeFilter:J.a,NodeIterator:J.a,NonDocumentTypeChildNode:J.a,NonElementParentNode:J.a,NoncedElement:J.a,OffscreenCanvasRenderingContext2D:J.a,OverconstrainedError:J.a,PaintRenderingContext2D:J.a,PaintSize:J.a,PaintWorkletGlobalScope:J.a,PasswordCredential:J.a,Path2D:J.a,PaymentAddress:J.a,PaymentInstruments:J.a,PaymentManager:J.a,PaymentResponse:J.a,PerformanceEntry:J.a,PerformanceLongTaskTiming:J.a,PerformanceMark:J.a,PerformanceMeasure:J.a,PerformanceNavigation:J.a,PerformanceNavigationTiming:J.a,PerformanceObserver:J.a,PerformanceObserverEntryList:J.a,PerformancePaintTiming:J.a,PerformanceResourceTiming:J.a,PerformanceServerTiming:J.a,PerformanceTiming:J.a,Permissions:J.a,PhotoCapabilities:J.a,PositionError:J.a,GeolocationPositionError:J.a,Presentation:J.a,PresentationReceiver:J.a,PublicKeyCredential:J.a,PushManager:J.a,PushMessageData:J.a,PushSubscription:J.a,PushSubscriptionOptions:J.a,Range:J.a,RelatedApplication:J.a,ReportBody:J.a,ReportingObserver:J.a,ResizeObserver:J.a,ResizeObserverEntry:J.a,RTCCertificate:J.a,RTCIceCandidate:J.a,mozRTCIceCandidate:J.a,RTCLegacyStatsReport:J.a,RTCRtpContributingSource:J.a,RTCRtpReceiver:J.a,RTCRtpSender:J.a,RTCSessionDescription:J.a,mozRTCSessionDescription:J.a,RTCStatsResponse:J.a,Screen:J.a,ScrollState:J.a,ScrollTimeline:J.a,Selection:J.a,SpeechRecognitionAlternative:J.a,SpeechSynthesisVoice:J.a,StaticRange:J.a,StorageManager:J.a,StyleMedia:J.a,StylePropertyMap:J.a,StylePropertyMapReadonly:J.a,SyncManager:J.a,TaskAttributionTiming:J.a,TextDetector:J.a,TextMetrics:J.a,TrackDefault:J.a,TreeWalker:J.a,TrustedHTML:J.a,TrustedScriptURL:J.a,TrustedURL:J.a,UnderlyingSourceBase:J.a,URLSearchParams:J.a,VRCoordinateSystem:J.a,VRDisplayCapabilities:J.a,VREyeParameters:J.a,VRFrameData:J.a,VRFrameOfReference:J.a,VRPose:J.a,VRStageBounds:J.a,VRStageBoundsPoint:J.a,VRStageParameters:J.a,ValidityState:J.a,VideoPlaybackQuality:J.a,VideoTrack:J.a,VTTRegion:J.a,WindowClient:J.a,WorkletAnimation:J.a,WorkletGlobalScope:J.a,XPathEvaluator:J.a,XPathExpression:J.a,XPathNSResolver:J.a,XPathResult:J.a,XMLSerializer:J.a,XSLTProcessor:J.a,Bluetooth:J.a,BluetoothCharacteristicProperties:J.a,BluetoothRemoteGATTServer:J.a,BluetoothRemoteGATTService:J.a,BluetoothUUID:J.a,BudgetService:J.a,Cache:J.a,DOMFileSystemSync:J.a,DirectoryEntrySync:J.a,DirectoryReaderSync:J.a,EntrySync:J.a,FileEntrySync:J.a,FileReaderSync:J.a,FileWriterSync:J.a,HTMLAllCollection:J.a,Mojo:J.a,MojoHandle:J.a,MojoWatcher:J.a,NFC:J.a,PagePopupController:J.a,Report:J.a,Request:J.a,Response:J.a,SubtleCrypto:J.a,USBAlternateInterface:J.a,USBConfiguration:J.a,USBDevice:J.a,USBEndpoint:J.a,USBInTransferResult:J.a,USBInterface:J.a,USBIsochronousInTransferPacket:J.a,USBIsochronousInTransferResult:J.a,USBIsochronousOutTransferPacket:J.a,USBIsochronousOutTransferResult:J.a,USBOutTransferResult:J.a,WorkerLocation:J.a,WorkerNavigator:J.a,Worklet:J.a,IDBCursor:J.a,IDBCursorWithValue:J.a,IDBFactory:J.a,IDBIndex:J.a,IDBObjectStore:J.a,IDBObservation:J.a,IDBObserver:J.a,IDBObserverChanges:J.a,SVGAngle:J.a,SVGAnimatedAngle:J.a,SVGAnimatedBoolean:J.a,SVGAnimatedEnumeration:J.a,SVGAnimatedInteger:J.a,SVGAnimatedLength:J.a,SVGAnimatedLengthList:J.a,SVGAnimatedNumber:J.a,SVGAnimatedNumberList:J.a,SVGAnimatedPreserveAspectRatio:J.a,SVGAnimatedRect:J.a,SVGAnimatedString:J.a,SVGAnimatedTransformList:J.a,SVGMatrix:J.a,SVGPoint:J.a,SVGPreserveAspectRatio:J.a,SVGRect:J.a,SVGUnitTypes:J.a,AudioListener:J.a,AudioParam:J.a,AudioTrack:J.a,AudioWorkletGlobalScope:J.a,AudioWorkletProcessor:J.a,PeriodicWave:J.a,WebGLActiveInfo:J.a,ANGLEInstancedArrays:J.a,ANGLE_instanced_arrays:J.a,WebGLBuffer:J.a,WebGLCanvas:J.a,WebGLColorBufferFloat:J.a,WebGLCompressedTextureASTC:J.a,WebGLCompressedTextureATC:J.a,WEBGL_compressed_texture_atc:J.a,WebGLCompressedTextureETC1:J.a,WEBGL_compressed_texture_etc1:J.a,WebGLCompressedTextureETC:J.a,WebGLCompressedTexturePVRTC:J.a,WEBGL_compressed_texture_pvrtc:J.a,WebGLCompressedTextureS3TC:J.a,WEBGL_compressed_texture_s3tc:J.a,WebGLCompressedTextureS3TCsRGB:J.a,WebGLDebugRendererInfo:J.a,WEBGL_debug_renderer_info:J.a,WebGLDebugShaders:J.a,WEBGL_debug_shaders:J.a,WebGLDepthTexture:J.a,WEBGL_depth_texture:J.a,WebGLDrawBuffers:J.a,WEBGL_draw_buffers:J.a,EXTsRGB:J.a,EXT_sRGB:J.a,EXTBlendMinMax:J.a,EXT_blend_minmax:J.a,EXTColorBufferFloat:J.a,EXTColorBufferHalfFloat:J.a,EXTDisjointTimerQuery:J.a,EXTDisjointTimerQueryWebGL2:J.a,EXTFragDepth:J.a,EXT_frag_depth:J.a,EXTShaderTextureLOD:J.a,EXT_shader_texture_lod:J.a,EXTTextureFilterAnisotropic:J.a,EXT_texture_filter_anisotropic:J.a,WebGLFramebuffer:J.a,WebGLGetBufferSubDataAsync:J.a,WebGLLoseContext:J.a,WebGLExtensionLoseContext:J.a,WEBGL_lose_context:J.a,OESElementIndexUint:J.a,OES_element_index_uint:J.a,OESStandardDerivatives:J.a,OES_standard_derivatives:J.a,OESTextureFloat:J.a,OES_texture_float:J.a,OESTextureFloatLinear:J.a,OES_texture_float_linear:J.a,OESTextureHalfFloat:J.a,OES_texture_half_float:J.a,OESTextureHalfFloatLinear:J.a,OES_texture_half_float_linear:J.a,OESVertexArrayObject:J.a,OES_vertex_array_object:J.a,WebGLProgram:J.a,WebGLQuery:J.a,WebGLRenderbuffer:J.a,WebGLRenderingContext:J.a,WebGL2RenderingContext:J.a,WebGLSampler:J.a,WebGLShader:J.a,WebGLShaderPrecisionFormat:J.a,WebGLSync:J.a,WebGLTexture:J.a,WebGLTimerQueryEXT:J.a,WebGLTransformFeedback:J.a,WebGLUniformLocation:J.a,WebGLVertexArrayObject:J.a,WebGLVertexArrayObjectOES:J.a,WebGL2RenderingContextBase:J.a,ArrayBuffer:A.ck,SharedArrayBuffer:A.ck,ArrayBufferView:A.dO,DataView:A.dM,Float32Array:A.ft,Float64Array:A.fu,Int16Array:A.fv,Int32Array:A.fw,Int8Array:A.fx,Uint16Array:A.fy,Uint32Array:A.fz,Uint8ClampedArray:A.dP,CanvasPixelArray:A.dP,Uint8Array:A.dQ,HTMLAudioElement:A.q,HTMLBRElement:A.q,HTMLCanvasElement:A.q,HTMLContentElement:A.q,HTMLDListElement:A.q,HTMLDataElement:A.q,HTMLDataListElement:A.q,HTMLDetailsElement:A.q,HTMLDialogElement:A.q,HTMLEmbedElement:A.q,HTMLFieldSetElement:A.q,HTMLHRElement:A.q,HTMLHeadElement:A.q,HTMLHtmlElement:A.q,HTMLIFrameElement:A.q,HTMLLIElement:A.q,HTMLLabelElement:A.q,HTMLLegendElement:A.q,HTMLLinkElement:A.q,HTMLMapElement:A.q,HTMLMediaElement:A.q,HTMLMenuElement:A.q,HTMLMetaElement:A.q,HTMLMeterElement:A.q,HTMLModElement:A.q,HTMLOListElement:A.q,HTMLObjectElement:A.q,HTMLOptGroupElement:A.q,HTMLOutputElement:A.q,HTMLParamElement:A.q,HTMLPictureElement:A.q,HTMLPreElement:A.q,HTMLProgressElement:A.q,HTMLQuoteElement:A.q,HTMLScriptElement:A.q,HTMLShadowElement:A.q,HTMLSlotElement:A.q,HTMLSourceElement:A.q,HTMLSpanElement:A.q,HTMLStyleElement:A.q,HTMLTableCaptionElement:A.q,HTMLTableCellElement:A.q,HTMLTableDataCellElement:A.q,HTMLTableHeaderCellElement:A.q,HTMLTableColElement:A.q,HTMLTimeElement:A.q,HTMLTitleElement:A.q,HTMLTrackElement:A.q,HTMLUListElement:A.q,HTMLUnknownElement:A.q,HTMLVideoElement:A.q,HTMLDirectoryElement:A.q,HTMLFontElement:A.q,HTMLFrameElement:A.q,HTMLFrameSetElement:A.q,HTMLMarqueeElement:A.q,HTMLElement:A.q,AccessibleNodeList:A.eN,HTMLAnchorElement:A.cD,HTMLAreaElement:A.eO,HTMLBaseElement:A.cE,Blob:A.bO,HTMLBodyElement:A.c8,HTMLButtonElement:A.bP,CDATASection:A.bj,CharacterData:A.bj,Comment:A.bj,ProcessingInstruction:A.bj,Text:A.bj,CSSPerspective:A.f2,CSSCharsetRule:A.X,CSSConditionRule:A.X,CSSFontFaceRule:A.X,CSSGroupingRule:A.X,CSSImportRule:A.X,CSSKeyframeRule:A.X,MozCSSKeyframeRule:A.X,WebKitCSSKeyframeRule:A.X,CSSKeyframesRule:A.X,MozCSSKeyframesRule:A.X,WebKitCSSKeyframesRule:A.X,CSSMediaRule:A.X,CSSNamespaceRule:A.X,CSSPageRule:A.X,CSSRule:A.X,CSSStyleRule:A.X,CSSSupportsRule:A.X,CSSViewportRule:A.X,CSSStyleDeclaration:A.ca,MSStyleCSSProperties:A.ca,CSS2Properties:A.ca,CSSImageValue:A.aA,CSSKeywordValue:A.aA,CSSNumericValue:A.aA,CSSPositionValue:A.aA,CSSResourceValue:A.aA,CSSUnitValue:A.aA,CSSURLImageValue:A.aA,CSSStyleValue:A.aA,CSSMatrixComponent:A.b8,CSSRotation:A.b8,CSSScale:A.b8,CSSSkew:A.b8,CSSTranslation:A.b8,CSSTransformComponent:A.b8,CSSTransformValue:A.f3,CSSUnparsedValue:A.f4,DataTransferItemList:A.f5,HTMLDivElement:A.dp,XMLDocument:A.cb,Document:A.cb,DOMException:A.f6,DOMImplementation:A.dq,ClientRectList:A.dr,DOMRectList:A.dr,DOMRectReadOnly:A.ds,DOMStringList:A.f7,DOMTokenList:A.f8,MathMLElement:A.E,Element:A.E,AbortPaymentEvent:A.o,AnimationEvent:A.o,AnimationPlaybackEvent:A.o,ApplicationCacheErrorEvent:A.o,BackgroundFetchClickEvent:A.o,BackgroundFetchEvent:A.o,BackgroundFetchFailEvent:A.o,BackgroundFetchedEvent:A.o,BeforeInstallPromptEvent:A.o,BeforeUnloadEvent:A.o,BlobEvent:A.o,CanMakePaymentEvent:A.o,ClipboardEvent:A.o,CloseEvent:A.o,CustomEvent:A.o,DeviceMotionEvent:A.o,DeviceOrientationEvent:A.o,ErrorEvent:A.o,ExtendableEvent:A.o,ExtendableMessageEvent:A.o,FetchEvent:A.o,FontFaceSetLoadEvent:A.o,ForeignFetchEvent:A.o,GamepadEvent:A.o,HashChangeEvent:A.o,InstallEvent:A.o,MediaEncryptedEvent:A.o,MediaKeyMessageEvent:A.o,MediaQueryListEvent:A.o,MediaStreamEvent:A.o,MediaStreamTrackEvent:A.o,MessageEvent:A.o,MIDIConnectionEvent:A.o,MIDIMessageEvent:A.o,MutationEvent:A.o,NotificationEvent:A.o,PageTransitionEvent:A.o,PaymentRequestEvent:A.o,PaymentRequestUpdateEvent:A.o,PopStateEvent:A.o,PresentationConnectionAvailableEvent:A.o,PresentationConnectionCloseEvent:A.o,PromiseRejectionEvent:A.o,PushEvent:A.o,RTCDataChannelEvent:A.o,RTCDTMFToneChangeEvent:A.o,RTCPeerConnectionIceEvent:A.o,RTCTrackEvent:A.o,SecurityPolicyViolationEvent:A.o,SensorErrorEvent:A.o,SpeechRecognitionError:A.o,SpeechRecognitionEvent:A.o,SpeechSynthesisEvent:A.o,StorageEvent:A.o,SyncEvent:A.o,TrackEvent:A.o,TransitionEvent:A.o,WebKitTransitionEvent:A.o,VRDeviceEvent:A.o,VRDisplayEvent:A.o,VRSessionEvent:A.o,MojoInterfaceRequestEvent:A.o,USBConnectionEvent:A.o,IDBVersionChangeEvent:A.o,AudioProcessingEvent:A.o,OfflineAudioCompletionEvent:A.o,WebGLContextEvent:A.o,Event:A.o,InputEvent:A.o,SubmitEvent:A.o,EventSource:A.du,AbsoluteOrientationSensor:A.d,Accelerometer:A.d,AccessibleNode:A.d,AmbientLightSensor:A.d,Animation:A.d,ApplicationCache:A.d,DOMApplicationCache:A.d,OfflineResourceList:A.d,BackgroundFetchRegistration:A.d,BatteryManager:A.d,BroadcastChannel:A.d,CanvasCaptureMediaStreamTrack:A.d,FontFaceSet:A.d,Gyroscope:A.d,LinearAccelerationSensor:A.d,Magnetometer:A.d,MediaDevices:A.d,MediaKeySession:A.d,MediaQueryList:A.d,MediaRecorder:A.d,MediaSource:A.d,MediaStream:A.d,MediaStreamTrack:A.d,MIDIAccess:A.d,MIDIInput:A.d,MIDIOutput:A.d,MIDIPort:A.d,NetworkInformation:A.d,Notification:A.d,OffscreenCanvas:A.d,OrientationSensor:A.d,PaymentRequest:A.d,Performance:A.d,PermissionStatus:A.d,PresentationAvailability:A.d,PresentationConnection:A.d,PresentationConnectionList:A.d,PresentationRequest:A.d,RelativeOrientationSensor:A.d,RemotePlayback:A.d,RTCDataChannel:A.d,DataChannel:A.d,RTCDTMFSender:A.d,RTCPeerConnection:A.d,webkitRTCPeerConnection:A.d,mozRTCPeerConnection:A.d,ScreenOrientation:A.d,Sensor:A.d,ServiceWorker:A.d,ServiceWorkerContainer:A.d,ServiceWorkerRegistration:A.d,SharedWorker:A.d,SpeechRecognition:A.d,webkitSpeechRecognition:A.d,SpeechSynthesis:A.d,SpeechSynthesisUtterance:A.d,VR:A.d,VRDevice:A.d,VRDisplay:A.d,VRSession:A.d,VisualViewport:A.d,WebSocket:A.d,Worker:A.d,WorkerPerformance:A.d,BluetoothDevice:A.d,BluetoothRemoteGATTCharacteristic:A.d,Clipboard:A.d,MojoInterfaceInterceptor:A.d,USB:A.d,IDBDatabase:A.d,IDBOpenDBRequest:A.d,IDBVersionChangeRequest:A.d,IDBRequest:A.d,IDBTransaction:A.d,AnalyserNode:A.d,RealtimeAnalyserNode:A.d,AudioBufferSourceNode:A.d,AudioDestinationNode:A.d,AudioNode:A.d,AudioScheduledSourceNode:A.d,AudioWorkletNode:A.d,BiquadFilterNode:A.d,ChannelMergerNode:A.d,AudioChannelMerger:A.d,ChannelSplitterNode:A.d,AudioChannelSplitter:A.d,ConstantSourceNode:A.d,ConvolverNode:A.d,DelayNode:A.d,DynamicsCompressorNode:A.d,GainNode:A.d,AudioGainNode:A.d,IIRFilterNode:A.d,MediaElementAudioSourceNode:A.d,MediaStreamAudioDestinationNode:A.d,MediaStreamAudioSourceNode:A.d,OscillatorNode:A.d,Oscillator:A.d,PannerNode:A.d,AudioPannerNode:A.d,webkitAudioPannerNode:A.d,ScriptProcessorNode:A.d,JavaScriptAudioNode:A.d,StereoPannerNode:A.d,WaveShaperNode:A.d,EventTarget:A.d,File:A.aH,FileList:A.dw,FileReader:A.dx,FileWriter:A.fa,HTMLFormElement:A.cH,Gamepad:A.aI,HTMLHeadingElement:A.dy,History:A.fc,HTMLCollection:A.bS,HTMLFormControlsCollection:A.bS,HTMLOptionsCollection:A.bS,HTMLDocument:A.dz,XMLHttpRequest:A.bu,XMLHttpRequestUpload:A.ce,XMLHttpRequestEventTarget:A.ce,ImageData:A.cI,HTMLImageElement:A.dA,HTMLInputElement:A.bT,Location:A.cN,MediaList:A.fo,MessagePort:A.fp,MIDIInputMap:A.fq,MIDIOutputMap:A.fr,MimeType:A.aK,MimeTypeArray:A.fs,MouseEvent:A.at,DragEvent:A.at,PointerEvent:A.at,WheelEvent:A.at,DocumentFragment:A.t,ShadowRoot:A.t,DocumentType:A.t,Node:A.t,NodeList:A.dR,RadioNodeList:A.dR,HTMLOptionElement:A.bx,HTMLParagraphElement:A.dU,Plugin:A.aL,PluginArray:A.fF,ProgressEvent:A.aZ,ResourceProgressEvent:A.aZ,RTCStatsReport:A.fH,HTMLSelectElement:A.bY,SourceBuffer:A.aN,SourceBufferList:A.fJ,SpeechGrammar:A.aO,SpeechGrammarList:A.fK,SpeechRecognitionResult:A.aP,Storage:A.e0,CSSStyleSheet:A.au,StyleSheet:A.au,HTMLTableElement:A.e2,HTMLTableRowElement:A.fN,HTMLTableSectionElement:A.fO,HTMLTemplateElement:A.cV,HTMLTextAreaElement:A.cm,TextTrack:A.aQ,TextTrackCue:A.av,VTTCue:A.av,TextTrackCueList:A.fQ,TextTrackList:A.fR,TimeRanges:A.fS,Touch:A.aR,TouchList:A.fT,TrackDefaultList:A.fU,CompositionEvent:A.be,FocusEvent:A.be,KeyboardEvent:A.be,TextEvent:A.be,TouchEvent:A.be,UIEvent:A.be,URL:A.h_,VideoTrackList:A.h1,Window:A.c2,DOMWindow:A.c2,DedicatedWorkerGlobalScope:A.bn,ServiceWorkerGlobalScope:A.bn,SharedWorkerGlobalScope:A.bn,WorkerGlobalScope:A.bn,Attr:A.cZ,CSSRuleList:A.h8,ClientRect:A.ec,DOMRect:A.ec,GamepadList:A.hm,NamedNodeMap:A.el,MozNamedAttrMap:A.el,SpeechRecognitionResultList:A.hN,StyleSheetList:A.hT,IDBKeyRange:A.cM,SVGLength:A.aT,SVGLengthList:A.fn,SVGNumber:A.aW,SVGNumberList:A.fB,SVGPointList:A.fG,SVGScriptElement:A.cT,SVGStringList:A.fM,SVGAElement:A.r,SVGAnimateElement:A.r,SVGAnimateMotionElement:A.r,SVGAnimateTransformElement:A.r,SVGAnimationElement:A.r,SVGCircleElement:A.r,SVGClipPathElement:A.r,SVGDefsElement:A.r,SVGDescElement:A.r,SVGDiscardElement:A.r,SVGEllipseElement:A.r,SVGFEBlendElement:A.r,SVGFEColorMatrixElement:A.r,SVGFEComponentTransferElement:A.r,SVGFECompositeElement:A.r,SVGFEConvolveMatrixElement:A.r,SVGFEDiffuseLightingElement:A.r,SVGFEDisplacementMapElement:A.r,SVGFEDistantLightElement:A.r,SVGFEFloodElement:A.r,SVGFEFuncAElement:A.r,SVGFEFuncBElement:A.r,SVGFEFuncGElement:A.r,SVGFEFuncRElement:A.r,SVGFEGaussianBlurElement:A.r,SVGFEImageElement:A.r,SVGFEMergeElement:A.r,SVGFEMergeNodeElement:A.r,SVGFEMorphologyElement:A.r,SVGFEOffsetElement:A.r,SVGFEPointLightElement:A.r,SVGFESpecularLightingElement:A.r,SVGFESpotLightElement:A.r,SVGFETileElement:A.r,SVGFETurbulenceElement:A.r,SVGFilterElement:A.r,SVGForeignObjectElement:A.r,SVGGElement:A.r,SVGGeometryElement:A.r,SVGGraphicsElement:A.r,SVGImageElement:A.r,SVGLineElement:A.r,SVGLinearGradientElement:A.r,SVGMarkerElement:A.r,SVGMaskElement:A.r,SVGMetadataElement:A.r,SVGPathElement:A.r,SVGPatternElement:A.r,SVGPolygonElement:A.r,SVGPolylineElement:A.r,SVGRadialGradientElement:A.r,SVGRectElement:A.r,SVGSetElement:A.r,SVGStopElement:A.r,SVGStyleElement:A.r,SVGSVGElement:A.r,SVGSwitchElement:A.r,SVGSymbolElement:A.r,SVGTSpanElement:A.r,SVGTextContentElement:A.r,SVGTextElement:A.r,SVGTextPathElement:A.r,SVGTextPositioningElement:A.r,SVGTitleElement:A.r,SVGUseElement:A.r,SVGViewElement:A.r,SVGGradientElement:A.r,SVGComponentTransferFunctionElement:A.r,SVGFEDropShadowElement:A.r,SVGMPathElement:A.r,SVGElement:A.r,SVGTransform:A.aX,SVGTransformList:A.fV,AudioBuffer:A.eS,AudioParamMap:A.eT,AudioTrackList:A.eU,AudioContext:A.bN,webkitAudioContext:A.bN,BaseAudioContext:A.bN,OfflineAudioContext:A.fC})
hunkHelpers.setOrUpdateLeafTags({WebGL:true,AnimationEffectReadOnly:true,AnimationEffectTiming:true,AnimationEffectTimingReadOnly:true,AnimationTimeline:true,AnimationWorkletGlobalScope:true,AuthenticatorAssertionResponse:true,AuthenticatorAttestationResponse:true,AuthenticatorResponse:true,BackgroundFetchFetch:true,BackgroundFetchManager:true,BackgroundFetchSettledFetch:true,BarProp:true,BarcodeDetector:true,BluetoothRemoteGATTDescriptor:true,Body:true,BudgetState:true,CacheStorage:true,CanvasGradient:true,CanvasPattern:true,CanvasRenderingContext2D:true,Client:true,Clients:true,CookieStore:true,Coordinates:true,Credential:true,CredentialUserData:true,CredentialsContainer:true,Crypto:true,CryptoKey:true,CSS:true,CSSVariableReferenceValue:true,CustomElementRegistry:true,DataTransfer:true,DataTransferItem:true,DeprecatedStorageInfo:true,DeprecatedStorageQuota:true,DeprecationReport:true,DetectedBarcode:true,DetectedFace:true,DetectedText:true,DeviceAcceleration:true,DeviceRotationRate:true,DirectoryEntry:true,webkitFileSystemDirectoryEntry:true,FileSystemDirectoryEntry:true,DirectoryReader:true,WebKitDirectoryReader:true,webkitFileSystemDirectoryReader:true,FileSystemDirectoryReader:true,DocumentOrShadowRoot:true,DocumentTimeline:true,DOMError:true,Iterator:true,DOMMatrix:true,DOMMatrixReadOnly:true,DOMParser:true,DOMPoint:true,DOMPointReadOnly:true,DOMQuad:true,DOMStringMap:true,Entry:true,webkitFileSystemEntry:true,FileSystemEntry:true,External:true,FaceDetector:true,FederatedCredential:true,FileEntry:true,webkitFileSystemFileEntry:true,FileSystemFileEntry:true,DOMFileSystem:true,WebKitFileSystem:true,webkitFileSystem:true,FileSystem:true,FontFace:true,FontFaceSource:true,FormData:true,GamepadButton:true,GamepadPose:true,Geolocation:true,Position:true,GeolocationPosition:true,Headers:true,HTMLHyperlinkElementUtils:true,IdleDeadline:true,ImageBitmap:true,ImageBitmapRenderingContext:true,ImageCapture:true,InputDeviceCapabilities:true,IntersectionObserver:true,IntersectionObserverEntry:true,InterventionReport:true,KeyframeEffect:true,KeyframeEffectReadOnly:true,MediaCapabilities:true,MediaCapabilitiesInfo:true,MediaDeviceInfo:true,MediaError:true,MediaKeyStatusMap:true,MediaKeySystemAccess:true,MediaKeys:true,MediaKeysPolicy:true,MediaMetadata:true,MediaSession:true,MediaSettingsRange:true,MemoryInfo:true,MessageChannel:true,Metadata:true,MutationObserver:true,WebKitMutationObserver:true,MutationRecord:true,NavigationPreloadManager:true,Navigator:true,NavigatorAutomationInformation:true,NavigatorConcurrentHardware:true,NavigatorCookies:true,NavigatorUserMediaError:true,NodeFilter:true,NodeIterator:true,NonDocumentTypeChildNode:true,NonElementParentNode:true,NoncedElement:true,OffscreenCanvasRenderingContext2D:true,OverconstrainedError:true,PaintRenderingContext2D:true,PaintSize:true,PaintWorkletGlobalScope:true,PasswordCredential:true,Path2D:true,PaymentAddress:true,PaymentInstruments:true,PaymentManager:true,PaymentResponse:true,PerformanceEntry:true,PerformanceLongTaskTiming:true,PerformanceMark:true,PerformanceMeasure:true,PerformanceNavigation:true,PerformanceNavigationTiming:true,PerformanceObserver:true,PerformanceObserverEntryList:true,PerformancePaintTiming:true,PerformanceResourceTiming:true,PerformanceServerTiming:true,PerformanceTiming:true,Permissions:true,PhotoCapabilities:true,PositionError:true,GeolocationPositionError:true,Presentation:true,PresentationReceiver:true,PublicKeyCredential:true,PushManager:true,PushMessageData:true,PushSubscription:true,PushSubscriptionOptions:true,Range:true,RelatedApplication:true,ReportBody:true,ReportingObserver:true,ResizeObserver:true,ResizeObserverEntry:true,RTCCertificate:true,RTCIceCandidate:true,mozRTCIceCandidate:true,RTCLegacyStatsReport:true,RTCRtpContributingSource:true,RTCRtpReceiver:true,RTCRtpSender:true,RTCSessionDescription:true,mozRTCSessionDescription:true,RTCStatsResponse:true,Screen:true,ScrollState:true,ScrollTimeline:true,Selection:true,SpeechRecognitionAlternative:true,SpeechSynthesisVoice:true,StaticRange:true,StorageManager:true,StyleMedia:true,StylePropertyMap:true,StylePropertyMapReadonly:true,SyncManager:true,TaskAttributionTiming:true,TextDetector:true,TextMetrics:true,TrackDefault:true,TreeWalker:true,TrustedHTML:true,TrustedScriptURL:true,TrustedURL:true,UnderlyingSourceBase:true,URLSearchParams:true,VRCoordinateSystem:true,VRDisplayCapabilities:true,VREyeParameters:true,VRFrameData:true,VRFrameOfReference:true,VRPose:true,VRStageBounds:true,VRStageBoundsPoint:true,VRStageParameters:true,ValidityState:true,VideoPlaybackQuality:true,VideoTrack:true,VTTRegion:true,WindowClient:true,WorkletAnimation:true,WorkletGlobalScope:true,XPathEvaluator:true,XPathExpression:true,XPathNSResolver:true,XPathResult:true,XMLSerializer:true,XSLTProcessor:true,Bluetooth:true,BluetoothCharacteristicProperties:true,BluetoothRemoteGATTServer:true,BluetoothRemoteGATTService:true,BluetoothUUID:true,BudgetService:true,Cache:true,DOMFileSystemSync:true,DirectoryEntrySync:true,DirectoryReaderSync:true,EntrySync:true,FileEntrySync:true,FileReaderSync:true,FileWriterSync:true,HTMLAllCollection:true,Mojo:true,MojoHandle:true,MojoWatcher:true,NFC:true,PagePopupController:true,Report:true,Request:true,Response:true,SubtleCrypto:true,USBAlternateInterface:true,USBConfiguration:true,USBDevice:true,USBEndpoint:true,USBInTransferResult:true,USBInterface:true,USBIsochronousInTransferPacket:true,USBIsochronousInTransferResult:true,USBIsochronousOutTransferPacket:true,USBIsochronousOutTransferResult:true,USBOutTransferResult:true,WorkerLocation:true,WorkerNavigator:true,Worklet:true,IDBCursor:true,IDBCursorWithValue:true,IDBFactory:true,IDBIndex:true,IDBObjectStore:true,IDBObservation:true,IDBObserver:true,IDBObserverChanges:true,SVGAngle:true,SVGAnimatedAngle:true,SVGAnimatedBoolean:true,SVGAnimatedEnumeration:true,SVGAnimatedInteger:true,SVGAnimatedLength:true,SVGAnimatedLengthList:true,SVGAnimatedNumber:true,SVGAnimatedNumberList:true,SVGAnimatedPreserveAspectRatio:true,SVGAnimatedRect:true,SVGAnimatedString:true,SVGAnimatedTransformList:true,SVGMatrix:true,SVGPoint:true,SVGPreserveAspectRatio:true,SVGRect:true,SVGUnitTypes:true,AudioListener:true,AudioParam:true,AudioTrack:true,AudioWorkletGlobalScope:true,AudioWorkletProcessor:true,PeriodicWave:true,WebGLActiveInfo:true,ANGLEInstancedArrays:true,ANGLE_instanced_arrays:true,WebGLBuffer:true,WebGLCanvas:true,WebGLColorBufferFloat:true,WebGLCompressedTextureASTC:true,WebGLCompressedTextureATC:true,WEBGL_compressed_texture_atc:true,WebGLCompressedTextureETC1:true,WEBGL_compressed_texture_etc1:true,WebGLCompressedTextureETC:true,WebGLCompressedTexturePVRTC:true,WEBGL_compressed_texture_pvrtc:true,WebGLCompressedTextureS3TC:true,WEBGL_compressed_texture_s3tc:true,WebGLCompressedTextureS3TCsRGB:true,WebGLDebugRendererInfo:true,WEBGL_debug_renderer_info:true,WebGLDebugShaders:true,WEBGL_debug_shaders:true,WebGLDepthTexture:true,WEBGL_depth_texture:true,WebGLDrawBuffers:true,WEBGL_draw_buffers:true,EXTsRGB:true,EXT_sRGB:true,EXTBlendMinMax:true,EXT_blend_minmax:true,EXTColorBufferFloat:true,EXTColorBufferHalfFloat:true,EXTDisjointTimerQuery:true,EXTDisjointTimerQueryWebGL2:true,EXTFragDepth:true,EXT_frag_depth:true,EXTShaderTextureLOD:true,EXT_shader_texture_lod:true,EXTTextureFilterAnisotropic:true,EXT_texture_filter_anisotropic:true,WebGLFramebuffer:true,WebGLGetBufferSubDataAsync:true,WebGLLoseContext:true,WebGLExtensionLoseContext:true,WEBGL_lose_context:true,OESElementIndexUint:true,OES_element_index_uint:true,OESStandardDerivatives:true,OES_standard_derivatives:true,OESTextureFloat:true,OES_texture_float:true,OESTextureFloatLinear:true,OES_texture_float_linear:true,OESTextureHalfFloat:true,OES_texture_half_float:true,OESTextureHalfFloatLinear:true,OES_texture_half_float_linear:true,OESVertexArrayObject:true,OES_vertex_array_object:true,WebGLProgram:true,WebGLQuery:true,WebGLRenderbuffer:true,WebGLRenderingContext:true,WebGL2RenderingContext:true,WebGLSampler:true,WebGLShader:true,WebGLShaderPrecisionFormat:true,WebGLSync:true,WebGLTexture:true,WebGLTimerQueryEXT:true,WebGLTransformFeedback:true,WebGLUniformLocation:true,WebGLVertexArrayObject:true,WebGLVertexArrayObjectOES:true,WebGL2RenderingContextBase:true,ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false,HTMLAudioElement:true,HTMLBRElement:true,HTMLCanvasElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOutputElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLSpanElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,AccessibleNodeList:true,HTMLAnchorElement:true,HTMLAreaElement:true,HTMLBaseElement:true,Blob:false,HTMLBodyElement:true,HTMLButtonElement:true,CDATASection:true,CharacterData:true,Comment:true,ProcessingInstruction:true,Text:true,CSSPerspective:true,CSSCharsetRule:true,CSSConditionRule:true,CSSFontFaceRule:true,CSSGroupingRule:true,CSSImportRule:true,CSSKeyframeRule:true,MozCSSKeyframeRule:true,WebKitCSSKeyframeRule:true,CSSKeyframesRule:true,MozCSSKeyframesRule:true,WebKitCSSKeyframesRule:true,CSSMediaRule:true,CSSNamespaceRule:true,CSSPageRule:true,CSSRule:true,CSSStyleRule:true,CSSSupportsRule:true,CSSViewportRule:true,CSSStyleDeclaration:true,MSStyleCSSProperties:true,CSS2Properties:true,CSSImageValue:true,CSSKeywordValue:true,CSSNumericValue:true,CSSPositionValue:true,CSSResourceValue:true,CSSUnitValue:true,CSSURLImageValue:true,CSSStyleValue:false,CSSMatrixComponent:true,CSSRotation:true,CSSScale:true,CSSSkew:true,CSSTranslation:true,CSSTransformComponent:false,CSSTransformValue:true,CSSUnparsedValue:true,DataTransferItemList:true,HTMLDivElement:true,XMLDocument:true,Document:false,DOMException:true,DOMImplementation:true,ClientRectList:true,DOMRectList:true,DOMRectReadOnly:false,DOMStringList:true,DOMTokenList:true,MathMLElement:true,Element:false,AbortPaymentEvent:true,AnimationEvent:true,AnimationPlaybackEvent:true,ApplicationCacheErrorEvent:true,BackgroundFetchClickEvent:true,BackgroundFetchEvent:true,BackgroundFetchFailEvent:true,BackgroundFetchedEvent:true,BeforeInstallPromptEvent:true,BeforeUnloadEvent:true,BlobEvent:true,CanMakePaymentEvent:true,ClipboardEvent:true,CloseEvent:true,CustomEvent:true,DeviceMotionEvent:true,DeviceOrientationEvent:true,ErrorEvent:true,ExtendableEvent:true,ExtendableMessageEvent:true,FetchEvent:true,FontFaceSetLoadEvent:true,ForeignFetchEvent:true,GamepadEvent:true,HashChangeEvent:true,InstallEvent:true,MediaEncryptedEvent:true,MediaKeyMessageEvent:true,MediaQueryListEvent:true,MediaStreamEvent:true,MediaStreamTrackEvent:true,MessageEvent:true,MIDIConnectionEvent:true,MIDIMessageEvent:true,MutationEvent:true,NotificationEvent:true,PageTransitionEvent:true,PaymentRequestEvent:true,PaymentRequestUpdateEvent:true,PopStateEvent:true,PresentationConnectionAvailableEvent:true,PresentationConnectionCloseEvent:true,PromiseRejectionEvent:true,PushEvent:true,RTCDataChannelEvent:true,RTCDTMFToneChangeEvent:true,RTCPeerConnectionIceEvent:true,RTCTrackEvent:true,SecurityPolicyViolationEvent:true,SensorErrorEvent:true,SpeechRecognitionError:true,SpeechRecognitionEvent:true,SpeechSynthesisEvent:true,StorageEvent:true,SyncEvent:true,TrackEvent:true,TransitionEvent:true,WebKitTransitionEvent:true,VRDeviceEvent:true,VRDisplayEvent:true,VRSessionEvent:true,MojoInterfaceRequestEvent:true,USBConnectionEvent:true,IDBVersionChangeEvent:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,WebGLContextEvent:true,Event:false,InputEvent:false,SubmitEvent:false,EventSource:true,AbsoluteOrientationSensor:true,Accelerometer:true,AccessibleNode:true,AmbientLightSensor:true,Animation:true,ApplicationCache:true,DOMApplicationCache:true,OfflineResourceList:true,BackgroundFetchRegistration:true,BatteryManager:true,BroadcastChannel:true,CanvasCaptureMediaStreamTrack:true,FontFaceSet:true,Gyroscope:true,LinearAccelerationSensor:true,Magnetometer:true,MediaDevices:true,MediaKeySession:true,MediaQueryList:true,MediaRecorder:true,MediaSource:true,MediaStream:true,MediaStreamTrack:true,MIDIAccess:true,MIDIInput:true,MIDIOutput:true,MIDIPort:true,NetworkInformation:true,Notification:true,OffscreenCanvas:true,OrientationSensor:true,PaymentRequest:true,Performance:true,PermissionStatus:true,PresentationAvailability:true,PresentationConnection:true,PresentationConnectionList:true,PresentationRequest:true,RelativeOrientationSensor:true,RemotePlayback:true,RTCDataChannel:true,DataChannel:true,RTCDTMFSender:true,RTCPeerConnection:true,webkitRTCPeerConnection:true,mozRTCPeerConnection:true,ScreenOrientation:true,Sensor:true,ServiceWorker:true,ServiceWorkerContainer:true,ServiceWorkerRegistration:true,SharedWorker:true,SpeechRecognition:true,webkitSpeechRecognition:true,SpeechSynthesis:true,SpeechSynthesisUtterance:true,VR:true,VRDevice:true,VRDisplay:true,VRSession:true,VisualViewport:true,WebSocket:true,Worker:true,WorkerPerformance:true,BluetoothDevice:true,BluetoothRemoteGATTCharacteristic:true,Clipboard:true,MojoInterfaceInterceptor:true,USB:true,IDBDatabase:true,IDBOpenDBRequest:true,IDBVersionChangeRequest:true,IDBRequest:true,IDBTransaction:true,AnalyserNode:true,RealtimeAnalyserNode:true,AudioBufferSourceNode:true,AudioDestinationNode:true,AudioNode:true,AudioScheduledSourceNode:true,AudioWorkletNode:true,BiquadFilterNode:true,ChannelMergerNode:true,AudioChannelMerger:true,ChannelSplitterNode:true,AudioChannelSplitter:true,ConstantSourceNode:true,ConvolverNode:true,DelayNode:true,DynamicsCompressorNode:true,GainNode:true,AudioGainNode:true,IIRFilterNode:true,MediaElementAudioSourceNode:true,MediaStreamAudioDestinationNode:true,MediaStreamAudioSourceNode:true,OscillatorNode:true,Oscillator:true,PannerNode:true,AudioPannerNode:true,webkitAudioPannerNode:true,ScriptProcessorNode:true,JavaScriptAudioNode:true,StereoPannerNode:true,WaveShaperNode:true,EventTarget:false,File:true,FileList:true,FileReader:true,FileWriter:true,HTMLFormElement:true,Gamepad:true,HTMLHeadingElement:true,History:true,HTMLCollection:true,HTMLFormControlsCollection:true,HTMLOptionsCollection:true,HTMLDocument:true,XMLHttpRequest:true,XMLHttpRequestUpload:true,XMLHttpRequestEventTarget:false,ImageData:true,HTMLImageElement:true,HTMLInputElement:true,Location:true,MediaList:true,MessagePort:true,MIDIInputMap:true,MIDIOutputMap:true,MimeType:true,MimeTypeArray:true,MouseEvent:true,DragEvent:true,PointerEvent:true,WheelEvent:true,DocumentFragment:true,ShadowRoot:true,DocumentType:true,Node:false,NodeList:true,RadioNodeList:true,HTMLOptionElement:true,HTMLParagraphElement:true,Plugin:true,PluginArray:true,ProgressEvent:true,ResourceProgressEvent:true,RTCStatsReport:true,HTMLSelectElement:true,SourceBuffer:true,SourceBufferList:true,SpeechGrammar:true,SpeechGrammarList:true,SpeechRecognitionResult:true,Storage:true,CSSStyleSheet:true,StyleSheet:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,TextTrack:true,TextTrackCue:true,VTTCue:true,TextTrackCueList:true,TextTrackList:true,TimeRanges:true,Touch:true,TouchList:true,TrackDefaultList:true,CompositionEvent:true,FocusEvent:true,KeyboardEvent:true,TextEvent:true,TouchEvent:true,UIEvent:false,URL:true,VideoTrackList:true,Window:true,DOMWindow:true,DedicatedWorkerGlobalScope:true,ServiceWorkerGlobalScope:true,SharedWorkerGlobalScope:true,WorkerGlobalScope:true,Attr:true,CSSRuleList:true,ClientRect:true,DOMRect:true,GamepadList:true,NamedNodeMap:true,MozNamedAttrMap:true,SpeechRecognitionResultList:true,StyleSheetList:true,IDBKeyRange:true,SVGLength:true,SVGLengthList:true,SVGNumber:true,SVGNumberList:true,SVGPointList:true,SVGScriptElement:true,SVGStringList:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true,SVGElement:false,SVGTransform:true,SVGTransformList:true,AudioBuffer:true,AudioParamMap:true,AudioTrackList:true,AudioContext:true,webkitAudioContext:true,BaseAudioContext:false,OfflineAudioContext:true})
A.ap.$nativeSuperclassTag="ArrayBufferView"
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
var s=A.uB
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
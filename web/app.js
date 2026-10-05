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
if(a[b]!==s){A.uT(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.C(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.od(b)
return new s(c,this)}:function(){if(s===null)s=A.od(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.od(a).prototype
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
oj(a,b,c,d){return{i:a,p:b,e:c,x:d}},
n9(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.oh==null){A.uF()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.b(A.p5("Return interceptor for "+A.h(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.my
if(o==null)o=$.my=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.uM(a)
if(p!=null)return p
if(typeof a=="function")return B.ac
s=Object.getPrototypeOf(a)
if(s==null)return B.M
if(s===Object.prototype)return B.M
if(typeof q=="function"){o=$.my
if(o==null)o=$.my=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.x,enumerable:false,writable:true,configurable:true})
return B.x}return B.x},
oJ(a,b){if(a<0||a>4294967295)throw A.b(A.aj(a,0,4294967295,"length",null))
return J.rk(new Array(a),b)},
nF(a,b){if(a<0)throw A.b(A.b7("Length must be a non-negative integer: "+a,null))
return A.C(new Array(a),b.h("af<0>"))},
rk(a,b){var s=A.C(a,b.h("af<0>"))
s.$flags=1
return s},
oK(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
rl(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.oK(r))break;++b}return b},
rm(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.e(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.oK(q))break}return b},
bK(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dC.prototype
return J.fh.prototype}if(typeof a=="string")return J.bT.prototype
if(a==null)return J.dD.prototype
if(typeof a=="boolean")return J.ff.prototype
if(Array.isArray(a))return J.af.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bx.prototype
if(typeof a=="symbol")return J.cO.prototype
if(typeof a=="bigint")return J.cN.prototype
return a}if(a instanceof A.F)return a
return J.n9(a)},
z(a){if(typeof a=="string")return J.bT.prototype
if(a==null)return a
if(Array.isArray(a))return J.af.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bx.prototype
if(typeof a=="symbol")return J.cO.prototype
if(typeof a=="bigint")return J.cN.prototype
return a}if(a instanceof A.F)return a
return J.n9(a)},
cA(a){if(a==null)return a
if(Array.isArray(a))return J.af.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bx.prototype
if(typeof a=="symbol")return J.cO.prototype
if(typeof a=="bigint")return J.cN.prototype
return a}if(a instanceof A.F)return a
return J.n9(a)},
ux(a){if(typeof a=="number")return J.cf.prototype
if(a==null)return a
if(!(a instanceof A.F))return J.bD.prototype
return a},
uy(a){if(typeof a=="number")return J.cf.prototype
if(typeof a=="string")return J.bT.prototype
if(a==null)return a
if(!(a instanceof A.F))return J.bD.prototype
return a},
oe(a){if(typeof a=="string")return J.bT.prototype
if(a==null)return a
if(!(a instanceof A.F))return J.bD.prototype
return a},
J(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bx.prototype
if(typeof a=="symbol")return J.cO.prototype
if(typeof a=="bigint")return J.cN.prototype
return a}if(a instanceof A.F)return a
return J.n9(a)},
of(a){if(a==null)return a
if(!(a instanceof A.F))return J.bD.prototype
return a},
l(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bK(a).a_(a,b)},
qD(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.ux(a).bb(a,b)},
qE(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.uy(a).aF(a,b)},
m(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.uI(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.z(a).i(a,b)},
bm(a,b,c){return J.cA(a).k(a,b,c)},
ip(a){return J.J(a).eC(a)},
qF(a,b,c,d){return J.J(a).eM(a,b,c,d)},
qG(a,b){return J.J(a).eV(a,b)},
qH(a,b,c,d){return J.J(a).eX(a,b,c,d)},
qI(a,b,c){return J.J(a).f_(a,b,c)},
nu(a,b){return J.cA(a).m(a,b)},
qJ(a,b,c,d){return J.J(a).bm(a,b,c,d)},
qK(a,b){return J.J(a).fm(a,b)},
qL(a,b,c){return J.J(a).da(a,b,c)},
iq(a){return J.of(a).a4(a)},
nv(a,b){return J.z(a).A(a,b)},
nw(a,b){return J.J(a).L(a,b)},
eL(a,b){return J.cA(a).v(a,b)},
qM(a,b){return J.cA(a).fE(a,b)},
nx(a,b){return J.cA(a).q(a,b)},
qN(a){return J.J(a).gfn(a)},
eM(a){return J.J(a).gdf(a)},
c7(a){return J.J(a).gan(a)},
qO(a){return J.J(a).gaz(a)},
cD(a){return J.bK(a).gH(a)},
ir(a){return J.z(a).gD(a)},
ny(a){return J.z(a).gS(a)},
b_(a){return J.cA(a).gE(a)},
qP(a){return J.J(a).gG(a)},
a8(a){return J.z(a).gj(a)},
ah(a){return J.J(a).gaA(a)},
qQ(a){return J.of(a).gcj(a)},
or(a){return J.of(a).gaf(a)},
qR(a){return J.J(a).gh4(a)},
qS(a){return J.bK(a).gW(a)},
qT(a){return J.J(a).ge6(a)},
cE(a,b,c){return J.cA(a).ap(a,b,c)},
qU(a,b){return J.bK(a).ds(a,b)},
qV(a,b,c){return J.J(a).fV(a,b,c)},
is(a){return J.J(a).dw(a)},
qW(a,b){return J.J(a).B(a,b)},
qX(a,b){return J.J(a).dC(a,b)},
qY(a,b){return J.J(a).e5(a,b)},
qZ(a,b){return J.J(a).seO(a,b)},
dk(a,b){return J.J(a).sP(a,b)},
r_(a,b){return J.J(a).scC(a,b)},
v(a,b){return J.J(a).sU(a,b)},
r0(a,b,c){return J.J(a).cw(a,b,c)},
os(a,b){return J.oe(a).e7(a,b)},
r1(a){return J.oe(a).h7(a)},
L(a){return J.bK(a).l(a)},
ot(a){return J.oe(a).u(a)},
r2(a,b){return J.cA(a).dN(a,b)},
cM:function cM(){},
ff:function ff(){},
dD:function dD(){},
a:function a(){},
bU:function bU(){},
fD:function fD(){},
bD:function bD(){},
bx:function bx(){},
cN:function cN(){},
cO:function cO(){},
af:function af(a){this.$ti=a},
fe:function fe(){},
ly:function ly(a){this.$ti=a},
b8:function b8(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cf:function cf(){},
dC:function dC(){},
fh:function fh(){},
bT:function bT(){}},A={nG:function nG(){},
oM(a){return new A.dG("Field '"+a+"' has been assigned during initialization.")},
rp(a){return new A.dG("Field '"+a+"' has not been initialized.")},
na(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
c_(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
nP(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
cy(a,b,c){return a},
oi(a){var s,r
for(s=$.aZ.length,r=0;r<s;++r)if(a===$.aZ[r])return!0
return!1},
nO(a,b,c,d){A.dZ(b,"start")
if(c!=null){A.dZ(c,"end")
if(b>c)A.bL(A.aj(b,0,c,"start",null))}return new A.e1(a,b,c,d.h("e1<0>"))},
rq(a,b,c,d){if(t.gt.b(a))return new A.bu(a,b,c.h("@<0>").J(d).h("bu<1,2>"))
return new A.aE(a,b,c.h("@<0>").J(d).h("aE<1,2>"))},
dB(){return new A.bp("No element")},
ri(){return new A.bp("Too many elements")},
dG:function dG(a){this.a=a},
eZ:function eZ(a){this.a=a},
nl:function nl(){},
lS:function lS(){},
n:function n(){},
ag:function ag(){},
e1:function e1(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
by:function by(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aE:function aE(a,b,c){this.a=a
this.b=b
this.$ti=c},
bu:function bu(a,b,c){this.a=a
this.b=b
this.$ti=c},
dM:function dM(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
a0:function a0(a,b,c){this.a=a
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
bE:function bE(){},
d_:function d_(){},
hw:function hw(a){this.a=a},
cj:function cj(a,b){this.a=a
this.$ti=b},
bZ:function bZ(a){this.a=a},
oB(){throw A.b(A.P("Cannot modify unmodifiable Map"))},
qd(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
uI(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.dX.b(a)},
h(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.L(a)
return s},
dW(a){var s,r=$.oU
if(r==null)r=$.oU=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
oX(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.e(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
dY(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.a.u(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
dX(a){var s,r,q,p
if(a instanceof A.F)return A.aF(A.au(a),null)
s=J.bK(a)
if(s===B.ab||s===B.ad||t.cx.b(a)){r=B.A(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.aF(A.au(a),null)},
ry(a){var s,r,q
if(typeof a=="number"||A.eF(a))return J.L(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bP)return a.l(0)
s=$.oq()
for(r=0;r<s.length;++r){q=s[r].dK(a)
if(q!=null)return q}return"Instance of '"+A.dX(a)+"'"},
rw(){if(!!self.location)return self.location.href
return null},
rz(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
a7(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.c.b0(s,10)|55296)>>>0,s&1023|56320)}}throw A.b(A.aj(a,0,1114111,null,null))},
oY(a,b,c,d,e,f,g,h,i){var s,r,q,p=b-1
if(0<=a&&a<100){a+=400
p-=4800}s=B.c.au(h,1000)
g+=B.c.a3(h-s,1000)
r=i?Date.UTC(a,p,c,d,e,f,g):new Date(a,p,c,d,e,f,g).valueOf()
q=!0
if(!isNaN(r))if(!(r<-864e13))if(!(r>864e13))q=r===864e13&&s!==0
if(q)return null
return r},
aM(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
bA(a){return a.c?A.aM(a).getUTCFullYear()+0:A.aM(a).getFullYear()+0},
cl(a){return a.c?A.aM(a).getUTCMonth()+1:A.aM(a).getMonth()+1},
dV(a){return a.c?A.aM(a).getUTCDate()+0:A.aM(a).getDate()+0},
bW(a){return a.c?A.aM(a).getUTCHours()+0:A.aM(a).getHours()+0},
cT(a){return a.c?A.aM(a).getUTCMinutes()+0:A.aM(a).getMinutes()+0},
oW(a){return a.c?A.aM(a).getUTCSeconds()+0:A.aM(a).getSeconds()+0},
oV(a){return a.c?A.aM(a).getUTCMilliseconds()+0:A.aM(a).getMilliseconds()+0},
bV(a,b,c){var s,r,q={}
q.a=0
s=[]
r=[]
q.a=b.length
B.b.T(s,b)
q.b=""
if(c!=null&&c.a!==0)c.q(0,new A.lP(q,r,s))
return J.qU(a,new A.fg(B.ap,0,s,r,0))},
rv(a,b,c){var s,r,q
if(Array.isArray(b))s=c==null||c.a===0
else s=!1
if(s){r=b.length
if(r===0){if(!!a.$0)return a.$0()}else if(r===1){if(!!a.$1)return a.$1(b[0])}else if(r===2){if(!!a.$2)return a.$2(b[0],b[1])}else if(r===3){if(!!a.$3)return a.$3(b[0],b[1],b[2])}else if(r===4){if(!!a.$4)return a.$4(b[0],b[1],b[2],b[3])}else if(r===5)if(!!a.$5)return a.$5(b[0],b[1],b[2],b[3],b[4])
q=a[""+"$"+r]
if(q!=null)return q.apply(a,b)}return A.ru(a,b,c)},
ru(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(Array.isArray(b))s=b
else s=A.a4(b,t.z)
r=s.length
q=a.$R
if(r<q)return A.bV(a,s,c)
p=a.$D
o=p==null
n=!o?p():null
m=J.bK(a)
l=m.$C
if(typeof l=="string")l=m[l]
if(o){if(c!=null&&c.a!==0)return A.bV(a,s,c)
if(r===q)return l.apply(a,s)
return A.bV(a,s,c)}if(Array.isArray(n)){if(c!=null&&c.a!==0)return A.bV(a,s,c)
k=q+n.length
if(r>k)return A.bV(a,s,null)
if(r<k){j=n.slice(r-q)
if(s===b)s=A.a4(s,t.z)
B.b.T(s,j)}return l.apply(a,s)}else{if(r>q)return A.bV(a,s,c)
if(s===b)s=A.a4(s,t.z)
i=Object.keys(n)
if(c==null)for(o=i.length,h=0;h<i.length;i.length===o||(0,A.aB)(i),++h){g=n[A.w(i[h])]
if(B.C===g)return A.bV(a,s,c)
B.b.m(s,g)}else{for(o=i.length,f=0,h=0;h<i.length;i.length===o||(0,A.aB)(i),++h){e=A.w(i[h])
if(c.L(0,e)){++f
B.b.m(s,c.i(0,e))}else{g=n[e]
if(B.C===g)return A.bV(a,s,c)
B.b.m(s,g)}}if(f!==c.a)return A.bV(a,s,c)}return l.apply(a,s)}},
rx(a){var s=a.$thrownJsError
if(s==null)return null
return A.c4(s)},
nL(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.ai(a,s)
a.$thrownJsError=s
s.stack=b.l(0)}},
uD(a){throw A.b(A.oc(a))},
e(a,b){if(a==null)J.a8(a)
throw A.b(A.ih(a,b))},
ih(a,b){var s,r="index"
if(!A.eG(b))return new A.b6(!0,b,r,null)
s=A.K(J.a8(a))
if(b<0||b>=s)return A.a6(b,s,a,null,r)
return A.oZ(b,r)},
oc(a){return new A.b6(!0,a,null,null)},
b(a){return A.ai(a,new Error())},
ai(a,b){var s
if(a==null)a=new A.bB()
b.dartException=a
s=A.uU
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
uU(){return J.L(this.dartException)},
bL(a,b){throw A.ai(a,b==null?new Error():b)},
aG(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.bL(A.tJ(a,b,c),s)},
tJ(a,b,c){var s,r,q,p,o,n,m,l,k
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
aB(a){throw A.b(A.a5(a))},
bC(a){var s,r,q,p,o,n
a=A.q9(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.C([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.lZ(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
m_(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
p4(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
nH(a,b){var s=b==null,r=s?null:b.method
return new A.fj(a,r,s?null:b.receiver)},
al(a){var s
if(a==null)return new A.lN(a)
if(a instanceof A.dv){s=a.a
return A.c6(a,s==null?A.aY(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.c6(a,a.dartException)
return A.uk(a)},
c6(a,b){if(t.W.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
uk(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.c.b0(r,16)&8191)===10)switch(q){case 438:return A.c6(a,A.nH(A.h(s)+" (Error "+q+")",null))
case 445:case 5007:A.h(s)
return A.c6(a,new A.dT())}}if(a instanceof TypeError){p=$.qn()
o=$.qo()
n=$.qp()
m=$.qq()
l=$.qt()
k=$.qu()
j=$.qs()
$.qr()
i=$.qw()
h=$.qv()
g=p.ae(s)
if(g!=null)return A.c6(a,A.nH(A.w(s),g))
else{g=o.ae(s)
if(g!=null){g.method="call"
return A.c6(a,A.nH(A.w(s),g))}else if(n.ae(s)!=null||m.ae(s)!=null||l.ae(s)!=null||k.ae(s)!=null||j.ae(s)!=null||m.ae(s)!=null||i.ae(s)!=null||h.ae(s)!=null){A.w(s)
return A.c6(a,new A.dT())}}return A.c6(a,new A.fY(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.e_()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.c6(a,new A.b6(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.e_()
return a},
c4(a){var s
if(a instanceof A.dv)return a.b
if(a==null)return new A.et(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.et(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
il(a){if(a==null)return J.cD(a)
if(typeof a=="object")return A.dW(a)
return J.cD(a)},
uw(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.k(0,a[s],a[r])}return b},
tT(a,b,c,d,e,f){t.Z.a(a)
switch(A.K(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.b(new A.mi("Unsupported number of arguments for wrapped closure"))},
bI(a,b){var s
if(a==null)return null
s=a.$identity
if(!!s)return s
s=A.us(a,b)
a.$identity=s
return s},
us(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.tT)},
r9(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.fK().constructor.prototype):Object.create(new A.cH(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.oA(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.r5(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.oA(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
r5(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.r3)}throw A.b("Error in functionType of tearoff")},
r6(a,b,c,d){var s=A.oy
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
oA(a,b,c,d){if(c)return A.r8(a,b,d)
return A.r6(b.length,d,a,b)},
r7(a,b,c,d){var s=A.oy,r=A.r4
switch(b?-1:a){case 0:throw A.b(new A.fH("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
r8(a,b,c){var s,r
if($.ow==null)$.ow=A.ov("interceptor")
if($.ox==null)$.ox=A.ov("receiver")
s=b.length
r=A.r7(s,c,a,b)
return r},
od(a){return A.r9(a)},
r3(a,b){return A.mO(v.typeUniverse,A.au(a.a),b)},
oy(a){return a.a},
r4(a){return a.b},
ov(a){var s,r,q,p=new A.cH("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.b(A.b7("Field name "+a+" not found.",null))},
og(a){return v.getIsolateTag(a)},
ok(a,b,c){var s,r
try{s=A.tI(a,c,b)
return s}catch(r){}return null},
tI(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=[],h=typeof a=="object",g=typeof a=="function"
if(g){s=A.pP(a)
if(s!=null)i.push("globalThis."+s)
else i.push("name: "+A.bv(A.ig(a,"name")))}if(b?!g:!h)i.push('typeof: "'+typeof a+'"')
if(!(h||g))return i.join(", ")
r=v.G
q=r.Object
p=q.getPrototypeOf(a)
o=p==null
if(o)i.push("prototype: null")
else{n=A.ig(p,"constructor")
if(n!=null){m=A.pP(n)
if(m!=null){if(g)l="Function"
else l=c?"Array":null
if(m!==l)i.push("constructor: "+m)}else{k=A.ig(n,"name")
if(k!=null)i.push("constructor.name: "+A.bv(k))}}}if(r.Array.isArray(a))i.push("isArray")
if(!g){j=A.ig(a,"length")
if(typeof j=="number")i.push("length: "+A.h(j))}if(!o&&!(a instanceof q))i.push("cross-realm")
return i.join(", ")},
ig(a,b){var s=v.G.Object.getOwnPropertyDescriptor(a,b)
if(s==null)return null
return s.value},
pP(a){var s
if(typeof a!="function")return null
s=A.ig(a,"name")
if(typeof s=="string"&&/^[A-Za-z_$][A-Za-z_$0-9]*$/.test(s))if(a===v.G[s])return s
return null},
w2(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
uM(a){var s,r,q,p,o,n=A.w($.q3.$1(a)),m=$.n8[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.ne[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.an($.q_.$2(a,n))
if(q!=null){m=$.n8[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.ne[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.nh(s)
$.n8[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.ne[n]=s
return s}if(p==="-"){o=A.nh(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.q6(a,s)
if(p==="*")throw A.b(A.p5(n))
if(v.leafTags[n]===true){o=A.nh(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.q6(a,s)},
q6(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.oj(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
nh(a){return J.oj(a,!1,null,!!a.$iM)},
uO(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.nh(s)
else return J.oj(s,c,null,null)},
uF(){if(!0===$.oh)return
$.oh=!0
A.uG()},
uG(){var s,r,q,p,o,n,m,l
$.n8=Object.create(null)
$.ne=Object.create(null)
A.uE()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.q8.$1(o)
if(n!=null){m=A.uO(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
uE(){var s,r,q,p,o,n,m=B.V()
m=A.df(B.W,A.df(B.X,A.df(B.B,A.df(B.B,A.df(B.Y,A.df(B.Z,A.df(B.a_(B.A),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.q3=new A.nb(p)
$.q_=new A.nc(o)
$.q8=new A.nd(n)},
df(a,b){return a(b)||b},
uu(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
rn(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.b(A.a2("Illegal RegExp pattern ("+String(o)+")",a,null))},
uR(a,b,c){var s=a.indexOf(b,c)
return s>=0},
uv(a){if(a.indexOf("$",0)>=0)return a.replace(/\$/g,"$$$$")
return a},
q9(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
qb(a,b,c){var s=A.uS(a,b,c)
return s},
uS(a,b,c){var s,r,q
if(b===""){if(a==="")return c
s=a.length
for(r=c,q=0;q<s;++q)r=r+a[q]+c
return r.charCodeAt(0)==0?r:r}if(a.indexOf(b,0)<0)return a
if(a.length<500||c.indexOf("$",0)>=0)return a.split(b).join(c)
return a.replace(new RegExp(A.q9(b),"g"),A.uv(c))},
dn:function dn(a,b){this.a=a
this.$ti=b},
dm:function dm(){},
bs:function bs(a,b,c){this.a=a
this.b=b
this.$ti=c},
ei:function ei(a,b){this.a=a
this.$ti=b},
ej:function ej(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
fg:function fg(a,b,c,d,e){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e},
lP:function lP(a,b,c){this.a=a
this.b=b
this.c=c},
cW:function cW(){},
lZ:function lZ(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dT:function dT(){},
fj:function fj(a,b,c){this.a=a
this.b=b
this.c=c},
fY:function fY(a){this.a=a},
lN:function lN(a){this.a=a},
dv:function dv(a,b){this.a=a
this.b=b},
et:function et(a){this.a=a
this.b=null},
bP:function bP(){},
eX:function eX(){},
eY:function eY(){},
fO:function fO(){},
fK:function fK(){},
cH:function cH(a,b){this.a=a
this.b=b},
fH:function fH(a){this.a=a},
mE:function mE(){},
bb:function bb(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
lz:function lz(a){this.a=a},
lD:function lD(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
ch:function ch(a,b){this.a=a
this.$ti=b},
dJ:function dJ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aT:function aT(a,b){this.a=a
this.$ti=b},
dK:function dK(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
dH:function dH(a,b){this.a=a
this.$ti=b},
dI:function dI(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
nb:function nb(a){this.a=a},
nc:function nc(a){this.a=a},
nd:function nd(a){this.a=a},
fi:function fi(a,b){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null},
mC:function mC(a){this.b=a},
tF(a){return a},
tK(a){return a},
rr(a){return new Int8Array(a)},
oR(a){return new Uint8Array(a)},
oS(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
bH(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.ih(b,a))},
ck:function ck(){},
dP:function dP(){},
i2:function i2(a){this.a=a},
dN:function dN(){},
ar:function ar(){},
dO:function dO(){},
aV:function aV(){},
fs:function fs(){},
ft:function ft(){},
fu:function fu(){},
fv:function fv(){},
fw:function fw(){},
fx:function fx(){},
fy:function fy(){},
dQ:function dQ(){},
dR:function dR(){},
el:function el(){},
em:function em(){},
en:function en(){},
eo:function eo(){},
nM(a,b){var s=b.c
return s==null?b.c=A.ez(a,"ae",[b.x]):s},
p_(a){var s=a.w
if(s===6||s===7)return A.p_(a.x)
return s===11||s===12},
rC(a){return a.as},
ii(a){return A.mN(v.typeUniverse,a,!1)},
cx(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.cx(a1,s,a3,a4)
if(r===s)return a2
return A.ps(a1,r,!0)
case 7:s=a2.x
r=A.cx(a1,s,a3,a4)
if(r===s)return a2
return A.pr(a1,r,!0)
case 8:q=a2.y
p=A.de(a1,q,a3,a4)
if(p===q)return a2
return A.ez(a1,a2.x,p)
case 9:o=a2.x
n=A.cx(a1,o,a3,a4)
m=a2.y
l=A.de(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.nX(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.de(a1,j,a3,a4)
if(i===j)return a2
return A.pt(a1,k,i)
case 11:h=a2.x
g=A.cx(a1,h,a3,a4)
f=a2.y
e=A.uh(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.pq(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.de(a1,d,a3,a4)
o=a2.x
n=A.cx(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.nY(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.b(A.eQ("Attempted to substitute unexpected RTI kind "+a0))}},
de(a,b,c,d){var s,r,q,p,o=b.length,n=A.mS(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.cx(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
ui(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.mS(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.cx(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
uh(a,b,c,d){var s,r=b.a,q=A.de(a,r,c,d),p=b.b,o=A.de(a,p,c,d),n=b.c,m=A.ui(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.hm()
s.a=q
s.b=o
s.c=m
return s},
C(a,b){a[v.arrayRti]=b
return a},
q1(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.uA(s)
return a.$S()}return null},
uH(a,b){var s
if(A.p_(b))if(a instanceof A.bP){s=A.q1(a)
if(s!=null)return s}return A.au(a)},
au(a){if(a instanceof A.F)return A.B(a)
if(Array.isArray(a))return A.G(a)
return A.o8(J.bK(a))},
G(a){var s=a[v.arrayRti],r=t.x
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
B(a){var s=a.$ti
return s!=null?s:A.o8(a)},
o8(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.tR(a,s)},
tR(a,b){var s=a instanceof A.bP?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.tf(v.typeUniverse,s.name)
b.$ccache=r
return r},
uA(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.mN(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
uz(a){return A.cz(A.B(a))},
ug(a){var s=a instanceof A.bP?A.q1(a):null
if(s!=null)return s
if(t.aJ.b(a))return J.qS(a).a
if(Array.isArray(a))return A.G(a)
return A.au(a)},
cz(a){var s=a.r
return s==null?a.r=new A.mM(a):s},
bl(a){return A.cz(A.mN(v.typeUniverse,a,!1))},
tQ(a){var s=this
s.b=A.ue(s)
return s.b(a)},
ue(a){var s,r,q,p,o
if(a===t.K)return A.tZ
if(A.cB(a))return A.u2
s=a.w
if(s===6)return A.tO
if(s===1)return A.pO
if(s===7)return A.tU
r=A.ud(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.cB)){a.f="$i"+q
if(q==="o")return A.tX
if(a===t.m)return A.tW
return A.u1}}else if(s===10){p=A.uu(a.x,a.y)
o=p==null?A.pO:p
return o==null?A.aY(o):o}return A.tM},
ud(a){if(a.w===8){if(a===t.S)return A.eG
if(a===t.dx||a===t.r)return A.tY
if(a===t.N)return A.u0
if(a===t.y)return A.eF}return null},
tP(a){var s=this,r=A.tL
if(A.cB(s))r=A.ty
else if(s===t.K)r=A.aY
else if(A.dh(s)){r=A.tN
if(s===t.aV)r=A.o3
else if(s===t.jv)r=A.an
else if(s===t.fU)r=A.pE
else if(s===t.jh)r=A.o4
else if(s===t.jX)r=A.tv
else if(s===t.mU)r=A.tx}else if(s===t.S)r=A.K
else if(s===t.N)r=A.w
else if(s===t.y)r=A.mU
else if(s===t.r)r=A.ad
else if(s===t.dx)r=A.pF
else if(s===t.m)r=A.tw
s.a=r
return s.a(a)},
tM(a){var s=this
if(a==null)return A.dh(s)
return A.q5(v.typeUniverse,A.uH(a,s),s)},
tO(a){if(a==null)return!0
return this.x.b(a)},
u1(a){var s,r=this
if(a==null)return A.dh(r)
s=r.f
if(a instanceof A.F)return!!a[s]
return!!J.bK(a)[s]},
tX(a){var s,r=this
if(a==null)return A.dh(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.F)return!!a[s]
return!!J.bK(a)[s]},
tW(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.F)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
pN(a){if(typeof a=="object"){if(a instanceof A.F)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
tL(a){var s=this
if(a==null){if(A.dh(s))return a}else if(s.b(a))return a
throw A.ai(A.pI(a,s),new Error())},
tN(a){var s=this
if(a==null||s.b(a))return a
throw A.ai(A.pI(a,s),new Error())},
pI(a,b){return new A.d8("TypeError: "+A.pe(a,A.aF(b,null)))},
eJ(a,b,c,d){if(A.q5(v.typeUniverse,a,b))return a
throw A.ai(A.t6("The type argument '"+A.aF(a,null)+"' is not a subtype of the type variable bound '"+A.aF(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
pe(a,b){return A.bv(a)+": type '"+A.aF(A.ug(a),null)+"' is not a subtype of type '"+b+"'"},
t6(a){return new A.d8("TypeError: "+a)},
b4(a,b){return new A.d8("TypeError: "+A.pe(a,b))},
tU(a){var s=this
return s.x.b(a)||A.nM(v.typeUniverse,s).b(a)},
tZ(a){return a!=null},
aY(a){if(a!=null)return a
throw A.ai(A.b4(a,"Object"),new Error())},
u2(a){return!0},
ty(a){return a},
pO(a){return!1},
eF(a){return!0===a||!1===a},
mU(a){if(!0===a)return!0
if(!1===a)return!1
throw A.ai(A.b4(a,"bool"),new Error())},
pE(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.ai(A.b4(a,"bool?"),new Error())},
pF(a){if(typeof a=="number")return a
throw A.ai(A.b4(a,"double"),new Error())},
tv(a){if(typeof a=="number")return a
if(a==null)return a
throw A.ai(A.b4(a,"double?"),new Error())},
eG(a){return typeof a=="number"&&Math.floor(a)===a},
K(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.ai(A.b4(a,"int"),new Error())},
o3(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.ai(A.b4(a,"int?"),new Error())},
tY(a){return typeof a=="number"},
ad(a){if(typeof a=="number")return a
throw A.ai(A.b4(a,"num"),new Error())},
o4(a){if(typeof a=="number")return a
if(a==null)return a
throw A.ai(A.b4(a,"num?"),new Error())},
u0(a){return typeof a=="string"},
w(a){if(typeof a=="string")return a
throw A.ai(A.b4(a,"String"),new Error())},
an(a){if(typeof a=="string")return a
if(a==null)return a
throw A.ai(A.b4(a,"String?"),new Error())},
tw(a){if(A.pN(a))return a
throw A.ai(A.b4(a,"JSObject"),new Error())},
tx(a){if(a==null)return a
if(A.pN(a))return a
throw A.ai(A.b4(a,"JSObject?"),new Error())},
pU(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aF(a[q],b)
return s},
ua(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
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
if(a4==null)a4=A.C([],t.s)
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
if(l===8){p=A.uj(a.x)
o=a.y
return o.length>0?p+("<"+A.pU(o,b)+">"):p}if(l===10)return A.ua(a,b)
if(l===11)return A.pJ(a,b,null)
if(l===12)return A.pJ(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.e(b,n)
return b[n]}return"?"},
uj(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
tg(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
tf(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.mN(a,b,!1)
else if(typeof m=="number"){s=m
r=A.eA(a,5,"#")
q=A.mS(s)
for(p=0;p<s;++p)q[p]=r
o=A.ez(a,b,q)
n[b]=o
return o}else return m},
td(a,b){return A.pC(a.tR,b)},
tc(a,b){return A.pC(a.eT,b)},
mN(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.pk(A.pi(a,null,b,!1))
r.set(b,s)
return s},
mO(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.pk(A.pi(a,b,c,!0))
q.set(c,r)
return r},
te(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.nX(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
c3(a,b){b.a=A.tP
b.b=A.tQ
return b},
eA(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.be(null,null)
s.w=b
s.as=c
r=A.c3(a,s)
a.eC.set(c,r)
return r},
ps(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.ta(a,b,r,c)
a.eC.set(r,s)
return s},
ta(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.cB(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.dh(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.be(null,null)
q.w=6
q.x=b
q.as=c
return A.c3(a,q)},
pr(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.t8(a,b,r,c)
a.eC.set(r,s)
return s},
t8(a,b,c,d){var s,r
if(d){s=b.w
if(A.cB(b)||b===t.K)return b
else if(s===1)return A.ez(a,"ae",[b])
else if(b===t.a||b===t.T)return t.gK}r=new A.be(null,null)
r.w=7
r.x=b
r.as=c
return A.c3(a,r)},
tb(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.be(null,null)
s.w=13
s.x=b
s.as=q
r=A.c3(a,s)
a.eC.set(q,r)
return r},
ey(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
t7(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
ez(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.ey(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.be(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.c3(a,r)
a.eC.set(p,q)
return q},
nX(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.ey(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.be(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.c3(a,o)
a.eC.set(q,n)
return n},
pt(a,b,c){var s,r,q="+"+(b+"("+A.ey(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.be(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.c3(a,s)
a.eC.set(q,r)
return r},
pq(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.ey(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.ey(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.t7(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.be(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.c3(a,p)
a.eC.set(r,o)
return o},
nY(a,b,c,d){var s,r=b.as+("<"+A.ey(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.t9(a,b,c,r,d)
a.eC.set(r,s)
return s},
t9(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.mS(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.cx(a,b,r,0)
m=A.de(a,c,r,0)
return A.nY(a,n,m,c!==m)}}l=new A.be(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.c3(a,l)},
pi(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
pk(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.t_(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.pj(a,r,l,k,!1)
else if(q===46)r=A.pj(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.cw(a.u,a.e,k.pop()))
break
case 94:k.push(A.tb(a.u,k.pop()))
break
case 35:k.push(A.eA(a.u,5,"#"))
break
case 64:k.push(A.eA(a.u,2,"@"))
break
case 126:k.push(A.eA(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.t1(a,k)
break
case 38:A.t0(a,k)
break
case 63:p=a.u
k.push(A.ps(p,A.cw(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.pr(p,A.cw(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.rZ(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.pl(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.t3(a.u,a.e,o)
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
return A.cw(a.u,a.e,m)},
t_(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
pj(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.tg(s,o.x)[p]
if(n==null)A.bL('No "'+p+'" in "'+A.rC(o)+'"')
d.push(A.mO(s,o,n))}else d.push(p)
return m},
t1(a,b){var s,r=a.u,q=A.ph(a,b),p=b.pop()
if(typeof p=="string")b.push(A.ez(r,p,q))
else{s=A.cw(r,a.e,p)
switch(s.w){case 11:b.push(A.nY(r,s,q,a.n))
break
default:b.push(A.nX(r,s,q))
break}}},
rZ(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.ph(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.cw(p,a.e,o)
q=new A.hm()
q.a=s
q.b=n
q.c=m
b.push(A.pq(p,r,q))
return
case-4:b.push(A.pt(p,b.pop(),s))
return
default:throw A.b(A.eQ("Unexpected state under `()`: "+A.h(o)))}},
t0(a,b){var s=b.pop()
if(0===s){b.push(A.eA(a.u,1,"0&"))
return}if(1===s){b.push(A.eA(a.u,4,"1&"))
return}throw A.b(A.eQ("Unexpected extended operation "+A.h(s)))},
ph(a,b){var s=b.splice(a.p)
A.pl(a.u,a.e,s)
a.p=b.pop()
return s},
cw(a,b,c){if(typeof c=="string")return A.ez(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.t2(a,b,c)}else return c},
pl(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.cw(a,b,c[s])},
t3(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.cw(a,b,c[s])},
t2(a,b,c){var s,r,q=b.w
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
q5(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.ak(a,b,null,c,null)
r.set(c,s)}return s},
ak(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.cB(d))return!0
s=b.w
if(s===4)return!0
if(A.cB(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.ak(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.ak(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.ak(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.ak(a,b.x,c,d,e))return!1
return A.ak(a,A.nM(a,b),c,d,e)}if(s===6)return A.ak(a,p,c,d,e)&&A.ak(a,b.x,c,d,e)
if(q===7){if(A.ak(a,b,c,d.x,e))return!0
return A.ak(a,b,c,A.nM(a,d),e)}if(q===6)return A.ak(a,b,c,p,e)||A.ak(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.Z)return!0
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
if(!A.ak(a,j,c,i,e)||!A.ak(a,i,e,j,c))return!1}return A.pM(a,b.x,c,d.x,e)}if(q===11){if(b===t.dY)return!0
if(p)return!1
return A.pM(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.tV(a,b,c,d,e)}if(o&&q===10)return A.u_(a,b,c,d,e)
return!1},
pM(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
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
tV(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.mO(a,b,r[o])
return A.pD(a,p,null,c,d.y,e)}return A.pD(a,b.y,null,c,d.y,e)},
pD(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.ak(a,b[s],d,e[s],f))return!1
return!0},
u_(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.ak(a,r[s],c,q[s],e))return!1
return!0},
dh(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.cB(a))if(s!==6)r=s===7&&A.dh(a.x)
return r},
cB(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
pC(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
mS(a){return a>0?new Array(a):v.typeUniverse.sEA},
be:function be(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
hm:function hm(){this.c=this.b=this.a=null},
mM:function mM(a){this.a=a},
hj:function hj(){},
d8:function d8(a){this.a=a},
rJ(){var s,r,q
if(self.scheduleImmediate!=null)return A.um()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.bI(new A.ma(s),1)).observe(r,{childList:true})
return new A.m9(s,r,q)}else if(self.setImmediate!=null)return A.un()
return A.uo()},
rK(a){self.scheduleImmediate(A.bI(new A.mb(t.M.a(a)),0))},
rL(a){self.setImmediate(A.bI(new A.mc(t.M.a(a)),0))},
rM(a){A.nR(B.a3,t.M.a(a))},
nR(a,b){var s=B.c.a3(a.a,1000)
return A.t4(s<0?0:s,b)},
p3(a,b){var s=B.c.a3(a.a,1000)
return A.t5(s<0?0:s,b)},
t4(a,b){var s=new A.ex(!0)
s.eo(a,b)
return s},
t5(a,b){var s=new A.ex(!1)
s.ep(a,b)
return s},
U(a){return new A.h3(new A.W($.Q,a.h("W<0>")),a.h("h3<0>"))},
T(a,b){a.$2(0,null)
b.b=!0
return b.a},
y(a,b){A.tz(a,b)},
S(a,b){b.b2(0,a)},
R(a,b){b.c7(A.al(a),A.c4(a))},
tz(a,b){var s,r,q=new A.mV(b),p=new A.mW(b)
if(a instanceof A.W)a.d0(q,p,t.z)
else{s=t.z
if(a instanceof A.W)a.bA(q,p,s)
else{r=new A.W($.Q,t._)
r.a=8
r.c=a
r.d0(q,p,s)}}},
V(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.Q.ck(new A.n4(s),t.H,t.S,t.z)},
po(a,b,c){return 0},
nz(a){var s
if(t.W.b(a)){s=a.gaR()
if(s!=null)return s}return B.t},
nD(a,b){var s
b.a(a)
s=new A.W($.Q,b.h("W<0>"))
s.aU(a)
return s},
rh(a,b,c){var s=new A.W($.Q,c.h("W<0>"))
A.fT(a,new A.lu(b,s,c))
return s},
o9(a,b){if($.Q===B.h)return null
return null},
tS(a,b){if($.Q!==B.h)A.o9(a,b)
if(b==null)if(t.W.b(a)){b=a.gaR()
if(b==null){A.nL(a,B.t)
b=B.t}}else b=B.t
else if(t.W.b(a))A.nL(a,b)
return new A.ao(a,b)},
mm(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t._;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.nN()
b.bI(new A.ao(new A.b6(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.e.a(b.c)
b.a=b.a&1|4
b.c=n
n.cU(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.aY()
b.bf(o.a)
A.cr(b,p)
return}b.a^=2
A.dd(null,null,b.b,t.M.a(new A.mn(o,b)))},
cr(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.n,r=t.e;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.ie(m.a,m.b)}return}q.a=b
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
A.ie(j.a,j.b)
return}g=$.Q
if(g!==h)$.Q=h
else g=null
c=c.c
if((c&15)===8)new A.mr(q,d,n).$0()
else if(o){if((c&1)!==0)new A.mq(q,j).$0()}else if((c&2)!==0)new A.mp(d,q).$0()
if(g!=null)$.Q=g
c=q.c
if(c instanceof A.W){p=q.a.$ti
p=p.h("ae<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.bk(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.mm(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.bk(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
pR(a,b){var s
if(t.ng.b(a))return b.ck(a,t.z,t.K,t.l)
s=t.v
if(s.b(a))return s.a(a)
throw A.b(A.ko(a,"onError",u.c))},
u4(){var s,r
for(s=$.dc;s!=null;s=$.dc){$.eI=null
r=s.b
$.dc=r
if(r==null)$.eH=null
s.a.$0()}},
uf(){$.oa=!0
try{A.u4()}finally{$.eI=null
$.oa=!1
if($.dc!=null)$.om().$1(A.q0())}},
pX(a){var s=new A.h4(a),r=$.eH
if(r==null){$.dc=$.eH=s
if(!$.oa)$.om().$1(A.q0())}else $.eH=r.b=s},
uc(a){var s,r,q,p=$.dc
if(p==null){A.pX(a)
$.eI=$.eH
return}s=new A.h4(a)
r=$.eI
if(r==null){s.b=p
$.dc=$.eI=s}else{q=r.b
s.b=q
$.eI=r.b=s
if(q==null)$.eH=s}},
qa(a){var s=null,r=$.Q
if(B.h===r){A.dd(s,s,B.h,a)
return}A.dd(s,s,r,t.M.a(r.c4(a)))},
vA(a,b){A.cy(a,"stream",t.K)
return new A.hQ(b.h("hQ<0>"))},
pV(a){return},
pd(a,b,c){var s=b==null?A.up():b
return t.gS.J(c).h("1(2)").a(s)},
rQ(a,b){if(b==null)b=A.ur()
if(t.fQ.b(b))return a.ck(b,t.z,t.K,t.l)
if(t.i6.b(b))return t.v.a(b)
throw A.b(A.b7("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace.",null))},
u5(a){},
u7(a,b){A.ie(a,b)},
u6(){},
tC(a,b,c){var s,r,q,p=a.a4(0)
if(p!==$.nq()){s=t.mY.a(new A.mX(b,c))
r=p.$ti
q=$.Q
p.aT(new A.bj(new A.W(q,r),8,s,null,r.h("bj<1,1>")))}else b.aV(c)},
fT(a,b){var s=$.Q
if(s===B.h)return A.nR(a,t.M.a(b))
return A.nR(a,t.M.a(s.c4(b)))},
nQ(a,b){var s=$.Q
if(s===B.h)return A.p3(a,t.my.a(b))
return A.p3(a,t.my.a(s.dc(b,t.I)))},
ie(a,b){A.uc(new A.n3(a,b))},
pS(a,b,c,d,e){var s,r=$.Q
if(r===c)return d.$0()
$.Q=c
s=r
try{r=d.$0()
return r}finally{$.Q=s}},
pT(a,b,c,d,e,f,g){var s,r=$.Q
if(r===c)return d.$1(e)
$.Q=c
s=r
try{r=d.$1(e)
return r}finally{$.Q=s}},
ub(a,b,c,d,e,f,g,h,i){var s,r=$.Q
if(r===c)return d.$2(e,f)
$.Q=c
s=r
try{r=d.$2(e,f)
return r}finally{$.Q=s}},
dd(a,b,c,d){t.M.a(d)
if(B.h!==c){d=c.c4(d)
d=d}A.pX(d)},
ma:function ma(a){this.a=a},
m9:function m9(a,b,c){this.a=a
this.b=b
this.c=c},
mb:function mb(a){this.a=a},
mc:function mc(a){this.a=a},
ex:function ex(a){this.a=a
this.b=null
this.c=0},
mL:function mL(a,b){this.a=a
this.b=b},
mK:function mK(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h3:function h3(a,b){this.a=a
this.b=!1
this.$ti=b},
mV:function mV(a){this.a=a},
mW:function mW(a){this.a=a},
n4:function n4(a){this.a=a},
eu:function eu(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
d7:function d7(a,b){this.a=a
this.$ti=b},
ao:function ao(a,b){this.a=a
this.b=b},
d2:function d2(a,b){this.a=a
this.$ti=b},
bG:function bG(a,b,c,d,e){var _=this
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
lu:function lu(a,b,c){this.a=a
this.b=b
this.c=c},
lY:function lY(a,b){this.a=a
this.b=b},
h8:function h8(){},
bF:function bF(a,b){this.a=a
this.$ti=b},
bj:function bj(a,b,c,d,e){var _=this
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
mj:function mj(a,b){this.a=a
this.b=b},
mo:function mo(a,b){this.a=a
this.b=b},
mn:function mn(a,b){this.a=a
this.b=b},
ml:function ml(a,b){this.a=a
this.b=b},
mk:function mk(a,b){this.a=a
this.b=b},
mr:function mr(a,b,c){this.a=a
this.b=b
this.c=c},
ms:function ms(a,b){this.a=a
this.b=b},
mt:function mt(a){this.a=a},
mq:function mq(a,b){this.a=a
this.b=b},
mp:function mp(a,b){this.a=a
this.b=b},
mu:function mu(a,b){this.a=a
this.b=b},
mv:function mv(a,b,c){this.a=a
this.b=b
this.c=c},
mw:function mw(a,b){this.a=a
this.b=b},
h4:function h4(a){this.a=a
this.b=null},
bY:function bY(){},
lW:function lW(a,b){this.a=a
this.b=b},
lX:function lX(a,b){this.a=a
this.b=b},
lU:function lU(a){this.a=a},
lV:function lV(a,b,c){this.a=a
this.b=b
this.c=c},
e8:function e8(){},
e9:function e9(){},
d3:function d3(){},
d6:function d6(){},
eb:function eb(){},
ea:function ea(a,b){this.b=a
this.a=null
this.$ti=b},
hF:function hF(a){var _=this
_.a=0
_.c=_.b=null
_.$ti=a},
mD:function mD(a,b){this.a=a
this.b=b},
d4:function d4(a,b){var _=this
_.a=1
_.b=a
_.c=null
_.$ti=b},
hQ:function hQ(a){this.$ti=a},
mX:function mX(a,b){this.a=a
this.b=b},
eE:function eE(){},
hI:function hI(){},
mF:function mF(a,b){this.a=a
this.b=b},
mG:function mG(a,b,c){this.a=a
this.b=b
this.c=c},
n3:function n3(a,b){this.a=a
this.b=b},
nU(a,b){var s=a[b]
return s===a?null:s},
nV(a,b,c){if(c==null)a[b]=a
else a[b]=c},
pf(){var s=Object.create(null)
A.nV(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
oO(a,b){return new A.bb(a.h("@<0>").J(b).h("bb<1,2>"))},
a3(a,b,c){return b.h("@<0>").J(c).h("oN<1,2>").a(A.uw(a,new A.bb(b.h("@<0>").J(c).h("bb<1,2>"))))},
ap(a,b){return new A.bb(a.h("@<0>").J(b).h("bb<1,2>"))},
ci(a){return new A.cu(a.h("cu<0>"))},
oP(a){return new A.cu(a.h("cu<0>"))},
nW(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
rY(a,b,c){var s=new A.cv(a,b,c.h("cv<0>"))
s.c=a.e
return s},
aq(a,b,c){var s=A.oO(b,c)
J.nx(a,new A.lE(s,b,c))
return s},
nI(a,b,c){var s=A.oO(b,c)
s.T(0,a)
return s},
oQ(a,b){var s,r,q=A.ci(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.aB)(a),++r)q.m(0,b.a(a[r]))
return q},
nJ(a){var s,r
if(A.oi(a))return"{...}"
s=new A.at("")
try{r={}
B.b.m($.aZ,a)
s.a+="{"
r.a=!0
J.nx(a,new A.lG(r,s))
s.a+="}"}finally{if(0>=$.aZ.length)return A.e($.aZ,-1)
$.aZ.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
ef:function ef(){},
ct:function ct(a){var _=this
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
cu:function cu(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
hv:function hv(a){this.a=a
this.c=this.b=null},
cv:function cv(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
e3:function e3(a,b){this.a=a
this.$ti=b},
lE:function lE(a,b,c){this.a=a
this.b=b
this.c=c},
k:function k(){},
E:function E(){},
lF:function lF(a){this.a=a},
lG:function lG(a,b){this.a=a
this.b=b},
d0:function d0(){},
aA:function aA(){},
cR:function cR(){},
c0:function c0(a,b){this.a=a
this.$ti=b},
as:function as(){},
ep:function ep(){},
d9:function d9(){},
u8(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.al(r)
q=A.a2(String(s),null,null)
throw A.b(q)}q=A.mY(p)
return q},
mY(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.hr(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.mY(a[s])
return a},
tt(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.qB()
else s=new Uint8Array(o)
for(r=J.z(a),q=0;q<o;++q){p=r.i(a,b+q)
if((p&255)!==p)p=255
s[q]=p}return s},
ts(a,b,c,d){var s=a?$.qA():$.qz()
if(s==null)return null
if(0===c&&d===b.length)return A.pB(s,b)
return A.pB(s,b.subarray(c,d))},
pB(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
ou(a,b,c,d,e,f){if(B.c.au(f,4)!==0)throw A.b(A.a2("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.b(A.a2("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.b(A.a2("Invalid base64 padding, more than two '=' characters",a,b))},
rP(a,b,c,d,a0,a1){var s,r,q,p,o,n,m,l,k,j,i="Invalid encoding before padding",h="Invalid character",g=B.c.b0(a1,2),f=a1&3,e=$.on()
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
if(f===3){if((g&3)!==0)throw A.b(A.a2(i,a,p))
k=a0+1
q&2&&A.aG(d)
s=d.length
if(!(a0<s))return A.e(d,a0)
d[a0]=g>>>10
if(!(k<s))return A.e(d,k)
d[k]=g>>>2}else{if((g&15)!==0)throw A.b(A.a2(i,a,p))
q&2&&A.aG(d)
if(!(a0<d.length))return A.e(d,a0)
d[a0]=g>>>4}j=(3-f)*3
if(n===37)j+=2
return A.pc(a,p+1,c,-j-1)}throw A.b(A.a2(h,a,p))}if(o>=0&&o<=127)return(g<<2|f)>>>0
for(p=b;p<c;++p){if(!(p<s))return A.e(a,p)
if(a.charCodeAt(p)>127)break}throw A.b(A.a2(h,a,p))},
rN(a,b,c,d){var s=A.rO(a,b,c),r=(d&3)+(s-b),q=B.c.b0(r,2)*3,p=r&3
if(p!==0&&s<c)q+=p-1
if(q>0)return new Uint8Array(q)
return $.qx()},
rO(a,b,c){var s,r=a.length,q=c,p=q,o=0
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
pc(a,b,c,d){var s,r,q
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
if(b===c)break}if(b!==c)throw A.b(A.a2("Invalid padding character",a,b))
return-s-1},
oL(a,b,c){return new A.dF(a,b)},
tH(a){return a.hh()},
rW(a,b){return new A.mz(a,[],A.ut())},
rX(a,b,c){var s,r=new A.at(""),q=A.rW(r,b)
q.bD(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
tu(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
hr:function hr(a,b){this.a=a
this.b=b
this.c=null},
hs:function hs(a){this.a=a},
mR:function mR(){},
mQ:function mQ(){},
dl:function dl(a){this.a=a},
eV:function eV(a){this.a=a},
kq:function kq(){},
md:function md(){this.a=0},
c9:function c9(){},
f0:function f0(){},
f9:function f9(){},
dF:function dF(a,b){this.a=a
this.b=b},
fl:function fl(a,b){this.a=a
this.b=b},
fk:function fk(){},
lC:function lC(a){this.b=a},
lB:function lB(a){this.a=a},
mA:function mA(){},
mB:function mB(a,b){this.a=a
this.b=b},
mz:function mz(a,b,c){this.c=a
this.a=b
this.b=c},
h1:function h1(){},
m7:function m7(a){this.a=a},
mP:function mP(a){this.a=a
this.b=16
this.c=0},
oF(a,b){return A.rv(a,b,null)},
eK(a){var s=A.oX(a,null)
if(s!=null)return s
throw A.b(A.a2(a,null,null))},
bJ(a){var s=A.dY(a)
if(s!=null)return s
throw A.b(A.a2("Invalid double",a,null))},
rf(a,b){a=A.ai(a,new Error())
if(a==null)a=A.aY(a)
a.stack=b.l(0)
throw a},
dL(a,b,c,d){var s,r=c?J.nF(a,d):J.oJ(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
aU(a,b,c){var s,r=A.C([],c.h("af<0>"))
for(s=J.b_(a);s.p();)B.b.m(r,c.a(s.gt(s)))
if(b)return r
r.$flags=1
return r},
a4(a,b){var s,r
if(Array.isArray(a))return A.C(a.slice(0),b.h("af<0>"))
s=A.C([],b.h("af<0>"))
for(r=J.b_(a);r.p();)B.b.m(s,r.gt(r))
return s},
p2(a,b,c){var s,r
A.dZ(b,"start")
if(c!=null){s=c-b
if(s<0)throw A.b(A.aj(c,b,null,"end",null))
if(s===0)return""}r=A.rE(a,b,c)
return r},
rE(a,b,c){var s=a.length
if(b>=s)return""
return A.rz(a,b,c==null||c>s?s:c)},
lQ(a){return new A.fi(a,A.rn(a,!1,!0,!1,!1,""))},
p1(a,b,c){var s=J.b_(b)
if(!s.p())return a
if(c.length===0){do a+=A.h(s.gt(s))
while(s.p())}else{a+=A.h(s.gt(s))
while(s.p())a=a+c+A.h(s.gt(s))}return a},
oT(a,b){return new A.fz(a,b.gfR(),b.gfW(),b.gfS())},
nS(){var s,r,q=A.rw()
if(q==null)throw A.b(A.P("'Uri.base' is not supported"))
s=$.p8
if(s!=null&&q===$.p7)return s
r=A.cn(q)
$.p8=r
$.p7=q
return r},
nN(){return A.c4(new Error())},
ra(a,b,c,d,e,f,g,h,i){var s=A.oY(a,b,c,d,e,f,g,h,i)
if(s==null)return null
return new A.a9(A.rc(s,h,i),h,i)},
lj(a){var s=A.oY(a,1,1,0,0,0,0,0,!1)
return new A.a9(s==null?new A.lk(a,1,1,0,0,0,0,0).$0():s,0,!1)},
rd(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=$.qh().dh(a)
if(c!=null){s=new A.lm()
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
j=new A.ln().$1(r[7])
i=B.c.a3(j,1000)
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
l-=f*(s.$1(r[11])+60*e)}}d=A.ra(p,o,n,m,l,k,i,j%1000,h)
if(d==null)throw A.b(A.a2("Time out of range",a,null))
return d}else throw A.b(A.a2("Invalid date format",a,null))},
cI(a){var s,r
try{s=A.rd(a)
return s}catch(r){if(A.al(r) instanceof A.ba)return null
else throw r}},
rc(a,b,c){var s="microsecond"
if(b>999)throw A.b(A.aj(b,0,999,s,null))
if(a<-864e13||a>864e13)throw A.b(A.aj(a,-864e13,864e13,"millisecondsSinceEpoch",null))
if(a===864e13&&b!==0)throw A.b(A.ko(b,s,"Time including microseconds is outside valid range"))
A.cy(c,"isUtc",t.y)
return a},
oC(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
rb(a){var s=Math.abs(a),r=a<0?"-":"+"
if(s>=1e5)return r+s
return r+"0"+s},
ll(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bt(a){if(a>=10)return""+a
return"0"+a},
lo(a,b,c){return new A.b0(a+1000*b+1e6*c)},
bv(a){if(typeof a=="number"||A.eF(a)||a==null)return J.L(a)
if(typeof a=="string")return JSON.stringify(a)
return A.ry(a)},
rg(a,b){A.cy(a,"error",t.K)
A.cy(b,"stackTrace",t.l)
A.rf(a,b)},
eQ(a){return new A.eP(a)},
b7(a,b){return new A.b6(!1,null,b,a)},
ko(a,b,c){return new A.b6(!0,a,b,c)},
rA(a){var s=null
return new A.cU(s,s,!1,s,s,a)},
oZ(a,b){return new A.cU(null,null,!0,a,b,"Value not in range")},
aj(a,b,c,d,e){return new A.cU(b,c,!0,a,d,"Invalid value")},
cV(a,b,c){if(0>a||a>c)throw A.b(A.aj(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.b(A.aj(b,a,c,"end",null))
return b}return c},
dZ(a,b){if(a<0)throw A.b(A.aj(a,0,null,b,null))
return a},
a6(a,b,c,d,e){return new A.fd(b,!0,a,e,"Index out of range")},
P(a){return new A.e4(a)},
p5(a){return new A.fX(a)},
N(a){return new A.bp(a)},
a5(a){return new A.f_(a)},
a2(a,b,c){return new A.ba(a,b,c)},
rj(a,b,c){var s,r
if(A.oi(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.C([],t.s)
B.b.m($.aZ,a)
try{A.u3(a,s)}finally{if(0>=$.aZ.length)return A.e($.aZ,-1)
$.aZ.pop()}r=A.p1(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
nE(a,b,c){var s,r
if(A.oi(a))return b+"..."+c
s=new A.at(b)
B.b.m($.aZ,a)
try{r=s
r.a=A.p1(r.a,a,", ")}finally{if(0>=$.aZ.length)return A.e($.aZ,-1)
$.aZ.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
u3(a,b){var s,r,q,p,o,n,m,l=a.gE(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.p())return
s=A.h(l.gt(l))
B.b.m(b,s)
k+=s.length+2;++j}if(!l.p()){if(j<=5)return
if(0>=b.length)return A.e(b,-1)
r=b.pop()
if(0>=b.length)return A.e(b,-1)
q=b.pop()}else{p=l.gt(l);++j
if(!l.p()){if(j<=4){B.b.m(b,A.h(p))
return}r=A.h(p)
if(0>=b.length)return A.e(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gt(l);++j
for(;l.p();p=o,o=n){n=l.gt(l);++j
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
nK(a,b,c,d){var s
if(B.q===c){s=B.e.gH(a)
b=B.e.gH(b)
return A.nP(A.c_(A.c_($.nr(),s),b))}if(B.q===d){s=B.e.gH(a)
b=B.e.gH(b)
c=J.cD(c)
return A.nP(A.c_(A.c_(A.c_($.nr(),s),b),c))}s=B.e.gH(a)
b=B.e.gH(b)
c=J.cD(c)
d=J.cD(d)
d=A.nP(A.c_(A.c_(A.c_(A.c_($.nr(),s),b),c),d))
return d},
c5(a){A.uP(a)},
cn(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){if(4>=a4)return A.e(a5,4)
s=((a5.charCodeAt(4)^58)*3|a5.charCodeAt(0)^100|a5.charCodeAt(1)^97|a5.charCodeAt(2)^116|a5.charCodeAt(3)^97)>>>0
if(s===0)return A.p6(a4<a4?B.a.n(a5,0,a4):a5,5,a3).gdM()
else if(s===32)return A.p6(B.a.n(a5,5,a4),0,a3).gdM()}r=A.dL(8,0,!1,t.S)
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
if(!(i&&o+1===n)){if(!B.a.R(a5,"\\",n))if(p>0)h=B.a.R(a5,"\\",p-1)||B.a.R(a5,"\\",p-2)
else h=!1
else h=!0
if(!h){if(!(m<a4&&m===n+2&&B.a.R(a5,"..",n)))h=m>n+2&&B.a.R(a5,"/..",m-3)
else h=!0
if(!h)if(q===4){if(B.a.R(a5,"file",0)){if(p<=0){if(!B.a.R(a5,"/",n)){g="file:///"
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
m=f}j="file"}else if(B.a.R(a5,"http",0)){if(i&&o+3===n&&B.a.R(a5,"80",o+1)){l-=3
e=n-3
m-=3
a5=B.a.aC(a5,o,n,"")
a4-=3
n=e}j="http"}}else if(q===5&&B.a.R(a5,"https",0)){if(i&&o+4===n&&B.a.R(a5,"443",o+1)){l-=4
e=n-4
m-=4
a5=B.a.aC(a5,o,n,"")
a4-=3
n=e}j="https"}k=!h}}}}if(k)return new A.b3(a4<a5.length?B.a.n(a5,0,a4):a5,q,p,o,n,m,l,j)
if(j==null)if(q>0)j=A.o0(a5,0,q)
else{if(q===0)A.da(a5,0,"Invalid empty scheme")
j=""}d=a3
if(p>0){c=q+3
b=c<p?A.to(a5,c,p-1):""
a=A.tl(a5,p,o,!1)
i=o+1
if(i<n){a0=A.oX(B.a.n(a5,i,n),a3)
d=A.o_(a0==null?A.bL(A.a2("Invalid port",a5,i)):a0,j)}}else{a=a3
b=""}a1=A.tm(a5,n,m,a3,j,a!=null)
a2=m<l?A.tn(a5,m+1,l,a3):a3
return A.i3(j,b,a,d,a1,a2,l<a4?A.tk(a5,l+1,a4):a3)},
pa(a){var s=t.N
return B.b.fF(A.C(a.split("&"),t.s),A.ap(s,s),new A.m6(B.r),t.k)},
h_(a,b,c){throw A.b(A.a2("Illegal IPv4 address, "+a,b,c))},
rG(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j="invalid character"
for(s=a.length,r=b,q=r,p=0,o=0;;){if(q>=c)n=0
else{if(!(q>=0&&q<s))return A.e(a,q)
n=a.charCodeAt(q)}m=n^48
if(m<=9){if(o!==0||q===r){o=o*10+m
if(o<=255){++q
continue}A.h_("each part must be in the range 0..255",a,r)}A.h_("parts must not have leading zeros",a,r)}if(q===r){if(q===c)break
A.h_(j,a,q)}l=p+1
k=e+p
d.$flags&2&&A.aG(d)
if(!(k<16))return A.e(d,k)
d[k]=o
if(n===46){if(l<4){++q
p=l
r=q
o=0
continue}break}if(q===c){if(l===4)return
break}A.h_(j,a,q)
p=l}A.h_("IPv4 address should contain exactly 4 parts",a,q)},
rH(a,b,c){var s
if(b===c)throw A.b(A.a2("Empty IP address",a,b))
if(!(b>=0&&b<a.length))return A.e(a,b)
if(a.charCodeAt(b)===118){s=A.rI(a,b,c)
if(s!=null)throw A.b(s)
return!1}A.p9(a,b,c)
return!0},
rI(a,b,c){var s,r,q,p,o,n="Missing hex-digit in IPvFuture address",m=u.f;++b
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
p9(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="an address must contain at most 8 parts",a2=new A.m5(a3)
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
continue}a2.$2("an IPv6 part can contain a maximum of 4 hex digits",m)}if(n>m){if(j===46){if(k){if(p<=6){A.rG(a3,m,a5,s,p*2)
p+=2
n=a5
break}a2.$2(a1,m)}break}o=p*2
e=B.c.b0(l,8)
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
B.K.fD(s,a,a0,0)}}return s},
i3(a,b,c,d,e,f,g){return new A.eB(a,b,c,d,e,f,g)},
pu(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
da(a,b,c){throw A.b(A.a2(c,a,b))},
o_(a,b){if(a!=null&&a===A.pu(b))return null
return a},
tl(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(b===c)return""
s=a.length
if(!(b>=0&&b<s))return A.e(a,b)
if(a.charCodeAt(b)===91){r=c-1
if(!(r>=0&&r<s))return A.e(a,r)
if(a.charCodeAt(r)!==93)A.da(a,b,"Missing end `]` to match `[` in host")
q=b+1
if(!(q<s))return A.e(a,q)
p=""
if(a.charCodeAt(q)!==118){o=A.ti(a,q,r)
if(o<r){n=o+1
p=A.pA(a,B.a.R(a,"25",n)?o+3:n,r,"%25")}}else o=r
m=A.rH(a,q,o)
l=B.a.n(a,q,o)
return"["+(m?l.toLowerCase():l)+p+"]"}for(k=b;k<c;++k){if(!(k<s))return A.e(a,k)
if(a.charCodeAt(k)===58){o=B.a.bt(a,"%",b)
o=o>=b&&o<c?o:c
if(o<c){n=o+1
p=A.pA(a,B.a.R(a,"25",n)?o+3:n,c,"%25")}else p=""
A.p9(a,b,o)
return"["+B.a.n(a,b,o)+p+"]"}}return A.tq(a,b,c)},
ti(a,b,c){var s=B.a.bt(a,"%",b)
return s>=b&&s<c?s:c},
pA(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=d!==""?new A.at(d):null
for(s=a.length,r=b,q=r,p=!0;r<c;){if(!(r>=0&&r<s))return A.e(a,r)
o=a.charCodeAt(r)
if(o===37){n=A.o1(a,r,!0)
m=n==null
if(m&&p){r+=3
continue}if(h==null)h=new A.at("")
l=h.a+=B.a.n(a,q,r)
if(m)n=B.a.n(a,r,r+3)
else if(n==="%")A.da(a,r,"ZoneID should not contain % anymore")
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
l=A.nZ(o)
m.a+=l
r+=k
q=r}}if(h==null)return B.a.n(a,b,c)
if(q<c){i=B.a.n(a,q,c)
h.a+=i}s=h.a
return s.charCodeAt(0)==0?s:s},
tq(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.f
for(s=a.length,r=b,q=r,p=null,o=!0;r<c;){if(!(r>=0&&r<s))return A.e(a,r)
n=a.charCodeAt(r)
if(n===37){m=A.o1(a,r,!0)
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
q=r}o=!1}++r}else if(n<=93&&(g.charCodeAt(n)&1024)!==0)A.da(a,r,"Invalid character")
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
j=A.nZ(n)
l.a+=j
r+=i
q=r}}if(p==null)return B.a.n(a,b,c)
if(q<c){k=B.a.n(a,q,c)
if(!o)k=k.toLowerCase()
p.a+=k}s=p.a
return s.charCodeAt(0)==0?s:s},
o0(a,b,c){var s,r,q,p
if(b===c)return""
s=a.length
if(!(b<s))return A.e(a,b)
if(!A.pw(a.charCodeAt(b)))A.da(a,b,"Scheme not starting with alphabetic character")
for(r=b,q=!1;r<c;++r){if(!(r<s))return A.e(a,r)
p=a.charCodeAt(r)
if(!(p<128&&(u.f.charCodeAt(p)&8)!==0))A.da(a,r,"Illegal scheme character")
if(65<=p&&p<=90)q=!0}a=B.a.n(a,b,c)
return A.th(q?a.toLowerCase():a)},
th(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
to(a,b,c){return A.eC(a,b,c,16,!1,!1)},
tm(a,b,c,d,e,f){var s,r=e==="file",q=r||f
if(a==null)return r?"/":""
else s=A.eC(a,b,c,128,!0,!0)
if(s.length===0){if(r)return"/"}else if(q&&!B.a.O(s,"/"))s="/"+s
return A.tp(s,e,f)},
tp(a,b,c){var s=b.length===0
if(s&&!c&&!B.a.O(a,"/")&&!B.a.O(a,"\\"))return A.pz(a,!s||c)
return A.db(a)},
tn(a,b,c,d){if(a!=null)return A.eC(a,b,c,256,!0,!1)
return null},
tk(a,b,c){return A.eC(a,b,c,256,!0,!1)},
o1(a,b,c){var s,r,q,p,o,n,m=u.f,l=b+2,k=a.length
if(l>=k)return"%"
s=b+1
if(!(s>=0&&s<k))return A.e(a,s)
r=a.charCodeAt(s)
if(!(l>=0))return A.e(a,l)
q=a.charCodeAt(l)
p=A.na(r)
o=A.na(q)
if(p<0||o<0)return"%"
n=p*16+o
if(n<127){if(!(n>=0))return A.e(m,n)
l=(m.charCodeAt(n)&1)!==0}else l=!1
if(l)return A.a7(c&&65<=n&&90>=n?(n|32)>>>0:n)
if(r>=97||q>=97)return B.a.n(a,b,b+3).toUpperCase()
return null},
nZ(a){var s,r,q,p,o,n,m,l,k="0123456789ABCDEF"
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
for(o=0;--p,p>=0;q=128){n=B.c.f8(a,6*p)&63|q
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
o+=3}}return A.p2(s,0,null)},
eC(a,b,c,d,e,f){var s=A.py(a,b,c,d,e,f)
return s==null?B.a.n(a,b,c):s},
py(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null,h=u.f
for(s=!e,r=a.length,q=b,p=q,o=i;q<c;){if(!(q>=0&&q<r))return A.e(a,q)
n=a.charCodeAt(q)
if(n<127&&(h.charCodeAt(n)&d)!==0)++q
else{m=1
if(n===37){l=A.o1(a,q,!1)
if(l==null){q+=3
continue}if("%"===l)l="%25"
else m=3}else if(n===92&&f)l="/"
else if(s&&n<=93&&(h.charCodeAt(n)&1024)!==0){A.da(a,q,"Invalid character")
m=i
l=m}else{if((n&64512)===55296){k=q+1
if(k<c){if(!(k<r))return A.e(a,k)
j=a.charCodeAt(k)
if((j&64512)===56320){n=65536+((n&1023)<<10)+(j&1023)
m=2}}}l=A.nZ(n)}if(o==null){o=new A.at("")
k=o}else k=o
k.a=(k.a+=B.a.n(a,p,q))+l
if(typeof m!=="number")return A.uD(m)
q+=m
p=q}}if(o==null)return i
if(p<c){s=B.a.n(a,p,c)
o.a+=s}s=o.a
return s.charCodeAt(0)==0?s:s},
px(a){if(B.a.O(a,"."))return!0
return B.a.dk(a,"/.")!==-1},
db(a){var s,r,q,p,o,n,m
if(!A.px(a))return a
s=A.C([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(n===".."){m=s.length
if(m!==0){if(0>=m)return A.e(s,-1)
s.pop()
if(s.length===0)B.b.m(s,"")}p=!0}else{p="."===n
if(!p)B.b.m(s,n)}}if(p)B.b.m(s,"")
return B.b.Z(s,"/")},
pz(a,b){var s,r,q,p,o,n
if(!A.px(a))return!b?A.pv(a):a
s=A.C([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n){if(s.length!==0&&B.b.gdn(s)!==".."){if(0>=s.length)return A.e(s,-1)
s.pop()}else B.b.m(s,"..")
p=!0}else{p="."===n
if(!p)B.b.m(s,n.length===0&&s.length===0?"./":n)}}if(s.length===0)return"./"
if(p)B.b.m(s,"")
if(!b){if(0>=s.length)return A.e(s,0)
B.b.k(s,0,A.pv(s[0]))}return B.b.Z(s,"/")},
pv(a){var s,r,q,p=u.f,o=a.length
if(o>=2&&A.pw(a.charCodeAt(0)))for(s=1;s<o;++s){r=a.charCodeAt(s)
if(r===58)return B.a.n(a,0,s)+"%3A"+B.a.Y(a,s+1)
if(r<=127){if(!(r<128))return A.e(p,r)
q=(p.charCodeAt(r)&8)===0}else q=!0
if(q)break}return a},
tr(a,b){if(a.fM("package")&&a.c==null)return A.pY(b,0,b.length)
return-1},
tj(a,b){var s,r,q,p,o
for(s=a.length,r=0,q=0;q<2;++q){p=b+q
if(!(p<s))return A.e(a,p)
o=a.charCodeAt(p)
if(48<=o&&o<=57)r=r*16+o-48
else{o|=32
if(97<=o&&o<=102)r=r*16+o-87
else throw A.b(A.b7("Invalid URL encoding",null))}}return r},
o2(a,b,c,d,e){var s,r,q,p,o=a.length,n=b
for(;;){if(!(n<c)){s=!0
break}if(!(n<o))return A.e(a,n)
r=a.charCodeAt(n)
q=!0
if(r<=127)if(r!==37)q=r===43
if(q){s=!1
break}++n}if(s)if(B.r===d)return B.a.n(a,b,c)
else p=new A.eZ(B.a.n(a,b,c))
else{p=A.C([],t.b)
for(n=b;n<c;++n){if(!(n<o))return A.e(a,n)
r=a.charCodeAt(n)
if(r>127)throw A.b(A.b7("Illegal percent encoding in URI",null))
if(r===37){if(n+3>o)throw A.b(A.b7("Truncated URI",null))
B.b.m(p,A.tj(a,n+1))
n+=2}else if(r===43)B.b.m(p,32)
else B.b.m(p,r)}}return d.M(0,p)},
pw(a){var s=a|32
return 97<=s&&s<=122},
p6(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.C([b-1],t.b)
for(s=a.length,r=b,q=-1,p=null;r<s;++r){p=a.charCodeAt(r)
if(p===44||p===59)break
if(p===47){if(q<0){q=r
continue}throw A.b(A.a2(k,a,r))}}if(q<0&&r>b)throw A.b(A.a2(k,a,r))
while(p!==44){B.b.m(j,r);++r
for(o=-1;r<s;++r){if(!(r>=0))return A.e(a,r)
p=a.charCodeAt(r)
if(p===61){if(o<0)o=r}else if(p===59||p===44)break}if(o>=0)B.b.m(j,o)
else{n=B.b.gdn(j)
if(p!==44||r!==n+7||!B.a.R(a,"base64",n+1))throw A.b(A.a2("Expecting '='",a,r))
break}}B.b.m(j,r)
m=r+1
if((j.length&1)===1)a=B.S.du(0,a,m,s)
else{l=A.py(a,m,s,256,!0,!1)
if(l!=null)a=B.a.aC(a,m,s,l)}return new A.m4(a,j,c)},
pW(a,b,c,d,e){var s,r,q,p,o,n='\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe3\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0e\x03\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\n\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\xeb\xeb\x8b\xeb\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x83\xeb\xeb\x8b\xeb\x8b\xeb\xcd\x8b\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x92\x83\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x8b\xeb\x8b\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xebD\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12D\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe8\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x05\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x10\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\f\xec\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\xec\f\xec\f\xec\xcd\f\xec\f\f\f\f\f\f\f\f\f\xec\f\f\f\f\f\f\f\f\f\f\xec\f\xec\f\xec\f\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\r\xed\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\xed\r\xed\r\xed\xed\r\xed\r\r\r\r\r\r\r\r\r\xed\r\r\r\r\r\r\r\r\r\r\xed\r\xed\r\xed\r\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0f\xea\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe9\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\t\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x11\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xe9\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\t\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x13\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\xf5\x15\x15\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5'
for(s=a.length,r=b;r<c;++r){if(!(r<s))return A.e(a,r)
q=a.charCodeAt(r)^96
if(q>95)q=31
p=d*96+q
if(!(p<2112))return A.e(n,p)
o=n.charCodeAt(p)
d=o&31
B.b.k(e,o>>>5,r)}return d},
pm(a){if(a.b===7&&B.a.O(a.a,"package")&&a.c<=0)return A.pY(a.a,a.e,a.f)
return-1},
pY(a,b,c){var s,r,q,p
for(s=a.length,r=b,q=0;r<c;++r){if(!(r>=0&&r<s))return A.e(a,r)
p=a.charCodeAt(r)
if(p===47)return q!==0?r:-1
if(p===37||p===58)return-1
q|=p^46}return-1},
tD(a,b,c){var s,r,q,p,o,n,m,l
for(s=a.length,r=b.length,q=0,p=0;p<s;++p){o=c+p
if(!(o<r))return A.e(b,o)
n=b.charCodeAt(o)
m=a.charCodeAt(p)^n
if(m!==0){if(m===32){l=n|m
if(97<=l&&l<=122){q=32
continue}}return-1}}return q},
lJ:function lJ(a,b){this.a=a
this.b=b},
lk:function lk(a,b,c,d,e,f,g,h){var _=this
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
lm:function lm(){},
ln:function ln(){},
b0:function b0(a){this.a=a},
a_:function a_(){},
eP:function eP(a){this.a=a},
bB:function bB(){},
b6:function b6(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cU:function cU(a,b,c,d,e,f){var _=this
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
fz:function fz(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
e4:function e4(a){this.a=a},
fX:function fX(a){this.a=a},
bp:function bp(a){this.a=a},
f_:function f_(a){this.a=a},
fC:function fC(){},
e_:function e_(){},
mi:function mi(a){this.a=a},
ba:function ba(a,b,c){this.a=a
this.b=b
this.c=c},
f:function f(){},
am:function am(a,b,c){this.a=a
this.b=b
this.$ti=c},
ab:function ab(){},
F:function F(){},
hT:function hT(){},
at:function at(a){this.a=a},
m6:function m6(a){this.a=a},
m5:function m5(a){this.a=a},
eB:function eB(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
m4:function m4(a,b,c){this.a=a
this.b=b
this.c=c},
b3:function b3(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=null},
hd:function hd(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
rR(a){var s=a.firstElementChild
if(s==null)throw A.b(A.N("No elements"))
return s},
re(a,b,c){var s,r=document.body
r.toString
s=t.aN
return t.h.a(new A.I(new A.az(B.z.a6(r,a,b,c)),s.h("H(k.E)").a(new A.lp()),s.h("I<k.E>")).gaG(0))},
dt(a){var s,r,q="element tag unavailable"
try{s=a.tagName
s.toString
q=s}catch(r){}return q},
oG(a){var s,r="visibilitychange"
t.l5.a(a)
s=typeof a.hidden!=="undefined"
s.toString
if(s)return r
else{s=typeof a.mozHidden!=="undefined"
s.toString
if(s)return"mozvisibilitychange"
else{s=typeof a.msHidden!=="undefined"
s.toString
if(s)return"msvisibilitychange"
else{s=typeof a.webkitHidden!=="undefined"
s.toString
if(s)return"webkitvisibilitychange"}}}return r},
oH(a){var s=document.createElement("img")
s.toString
if(a!=null)B.F.scC(s,a)
return s},
rt(a,b,c,d){var s=new Option(a,b,c,!1)
s.toString
return s},
rT(a,b){var s,r=a.classList
r.toString
for(s=0;s<5;++s)r.remove(b[s])},
A(a,b,c,d,e){var s=c==null?null:A.pZ(new A.mg(c),t.A)
s=new A.ee(a,b,s,!1,e.h("ee<0>"))
s.d3()
return s},
pg(a){var s=document.createElement("a")
s.toString
s=new A.hL(s,t.d.a(window.location))
s=new A.cs(s)
s.el(a)
return s},
rU(a,b,c,d){t.h.a(a)
A.w(b)
A.w(c)
t.dl.a(d)
return!0},
rV(a,b,c,d){var s,r,q,p,o,n
t.h.a(a)
A.w(b)
A.w(c)
s=t.dl.a(d).a
r=s.a
B.P.sfH(r,c)
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
pp(){var s=t.N,r=A.oQ(B.H,s),q=A.C(["TEMPLATE"],t.s),p=t.gL.a(new A.mJ())
s=new A.hW(r,A.ci(s),A.ci(s),A.ci(s),null)
s.en(null,new A.a0(B.H,p,t.gQ),q,null)
return s},
pG(a){var s,r="postMessage" in a
r.toString
if(r){s=A.rS(a)
return s}else return t.O.a(a)},
rS(a){var s=window
s.toString
if(a===s)return t.kg.a(a)
else return new A.hb()},
pZ(a,b){var s=$.Q
if(s===B.h)return a
return s.dc(a,b)},
q:function q(){},
eN:function eN(){},
cF:function cF(){},
eO:function eO(){},
cG:function cG(){},
bN:function bN(){},
c8:function c8(){},
bO:function bO(){},
bn:function bn(){},
f2:function f2(){},
Y:function Y(){},
ca:function ca(){},
ku:function ku(){},
aC:function aC(){},
b9:function b9(){},
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
h7:function h7(a,b){this.a=a
this.b=b},
bi:function bi(a,b){this.a=a
this.$ti=b},
D:function D(){},
lp:function lp(){},
p:function p(){},
du:function du(){},
d:function d(){},
aI:function aI(){},
dw:function dw(){},
dx:function dx(){},
fa:function fa(){},
cK:function cK(){},
aJ:function aJ(){},
dy:function dy(){},
fc:function fc(){},
bR:function bR(){},
dz:function dz(){},
bw:function bw(){},
ce:function ce(){},
cL:function cL(){},
dA:function dA(){},
bS:function bS(){},
cQ:function cQ(){},
fn:function fn(){},
fo:function fo(){},
fp:function fp(){},
lH:function lH(a){this.a=a},
fq:function fq(){},
lI:function lI(a){this.a=a},
aK:function aK(){},
fr:function fr(){},
aw:function aw(){},
az:function az(a){this.a=a},
u:function u(){},
cS:function cS(){},
bz:function bz(){},
dU:function dU(){},
aL:function aL(){},
fE:function fE(){},
b1:function b1(){},
fG:function fG(){},
lR:function lR(a){this.a=a},
bX:function bX(){},
aN:function aN(){},
fI:function fI(){},
aO:function aO(){},
fJ:function fJ(){},
aP:function aP(){},
e0:function e0(){},
lT:function lT(a){this.a=a},
ax:function ax(){},
e2:function e2(){},
fM:function fM(){},
fN:function fN(){},
cZ:function cZ(){},
cm:function cm(){},
aQ:function aQ(){},
ay:function ay(){},
fP:function fP(){},
fQ:function fQ(){},
fR:function fR(){},
aR:function aR(){},
fU:function fU(){},
fV:function fV(){},
bg:function bg(){},
h0:function h0(){},
h2:function h2(){},
c1:function c1(){},
br:function br(){},
d1:function d1(){},
h9:function h9(){},
ec:function ec(){},
hn:function hn(){},
ek:function ek(){},
hO:function hO(){},
hU:function hU(){},
h5:function h5(){},
ed:function ed(a){this.a=a},
hc:function hc(a){this.a=a},
me:function me(a,b){this.a=a
this.b=b},
mf:function mf(a,b){this.a=a
this.b=b},
hi:function hi(a){this.a=a},
nC:function nC(a,b){this.a=a
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
mg:function mg(a){this.a=a},
mh:function mh(a){this.a=a},
nT:function nT(a){this.$ti=a},
cs:function cs(a){this.a=a},
x:function x(){},
dS:function dS(a){this.a=a},
lL:function lL(a){this.a=a},
lK:function lK(a,b,c){this.a=a
this.b=b
this.c=c},
eq:function eq(){},
mH:function mH(){},
mI:function mI(){},
hW:function hW(a,b,c,d,e){var _=this
_.e=a
_.a=b
_.b=c
_.c=d
_.d=e},
mJ:function mJ(){},
hV:function hV(){},
cc:function cc(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.d=null
_.$ti=c},
hb:function hb(){},
hL:function hL(a,b){this.a=a
this.b=b},
eD:function eD(a){this.a=a
this.b=0},
mT:function mT(a){this.a=a},
ha:function ha(){},
he:function he(){},
hf:function hf(){},
hg:function hg(){},
hh:function hh(){},
hk:function hk(){},
hl:function hl(){},
hp:function hp(){},
hq:function hq(){},
hx:function hx(){},
hy:function hy(){},
hz:function hz(){},
hA:function hA(){},
hB:function hB(){},
hC:function hC(){},
hG:function hG(){},
hH:function hH(){},
hJ:function hJ(){},
er:function er(){},
es:function es(){},
hM:function hM(){},
hN:function hN(){},
hP:function hP(){},
hX:function hX(){},
hY:function hY(){},
ev:function ev(){},
ew:function ew(){},
hZ:function hZ(){},
i_:function i_(){},
i4:function i4(){},
i5:function i5(){},
i6:function i6(){},
i7:function i7(){},
i8:function i8(){},
i9:function i9(){},
ia:function ia(){},
ib:function ib(){},
ic:function ic(){},
id:function id(){},
pH(a){var s,r,q,p
if(a==null)return a
if(typeof a=="string"||typeof a=="number"||A.eF(a))return a
s=Object.getPrototypeOf(a)
r=s===Object.prototype
r.toString
if(!r){r=s===null
r.toString}else r=!0
if(r)return A.b5(a)
r=Array.isArray(a)
r.toString
if(r){q=[]
p=0
for(;;){r=a.length
r.toString
if(!(p<r))break
q.push(A.pH(a[p]));++p}return q}return a},
b5(a){var s,r,q,p,o,n
if(a==null)return null
s=A.ap(t.N,t.z)
r=Object.getOwnPropertyNames(a)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.aB)(r),++p){o=r[p]
n=o
n.toString
s.k(0,n,A.pH(a[o]))}return s},
nA(){var s=window.navigator.userAgent
s.toString
return s},
f1:function f1(){},
ks:function ks(a){this.a=a},
kt:function kt(a){this.a=a},
fb:function fb(a,b){this.a=a
this.b=b},
lq:function lq(){},
lr:function lr(){},
cP:function cP(){},
tA(a,b,c,d){var s,r,q
A.mU(b)
t.j.a(d)
if(b){s=[c]
B.b.T(s,d)
d=s}r=t.z
q=A.aU(J.cE(d,A.uJ(),r),!0,r)
return A.mZ(A.oF(t.Z.a(a),q))},
ro(a){return new A.lA(new A.ct(t.mp)).$1(a)},
tE(a){return a},
o6(a,b,c){var s
try{if(Object.isExtensible(a)&&!Object.prototype.hasOwnProperty.call(a,b)){Object.defineProperty(a,b,{value:c})
return!0}}catch(s){}return!1},
pL(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return null},
mZ(a){if(a==null||typeof a=="string"||typeof a=="number"||A.eF(a))return a
if(a instanceof A.bo)return a.a
if(A.q4(a))return a
if(t.bl.b(a))return a
if(a instanceof A.a9)return A.aM(a)
if(t.Z.b(a))return A.pK(a,"$dart_jsFunction",new A.n_())
return A.pK(a,"_$dart_jsObject",new A.n0($.op()))},
pK(a,b,c){var s=A.pL(a,b)
if(s==null){s=c.$1(a)
A.o6(a,b,s)}return s},
o5(a){var s
if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else if(a instanceof Object&&A.q4(a))return a
else if(a instanceof Object&&t.bl.b(a))return a
else if(a instanceof Date){s=A.K(a.getTime())
if(s<-864e13||s>864e13)A.bL(A.aj(s,-864e13,864e13,"millisecondsSinceEpoch",null))
A.cy(!1,"isUtc",t.y)
return new A.a9(s,0,!1)}else if(a.constructor===$.op())return a.o
else return A.ob(a)},
ob(a){if(typeof a=="function")return A.o7(a,$.io(),new A.n5())
if(Array.isArray(a))return A.o7(a,$.oo(),new A.n6())
return A.o7(a,$.oo(),new A.n7())},
o7(a,b,c){var s=A.pL(a,b)
if(s==null||!(a instanceof Object)){s=c.$1(a)
A.o6(a,b,s)}return s},
lA:function lA(a){this.a=a},
hK:function hK(){},
n_:function n_(){},
n0:function n0(a){this.a=a},
n5:function n5(){},
n6:function n6(){},
n7:function n7(){},
bo:function bo(a){this.a=a},
dE:function dE(a){this.a=a},
cg:function cg(a,b){this.a=a
this.$ti=b},
d5:function d5(){},
lM:function lM(a){this.a=a},
tG(a){var s,r=a.$dart_jsFunction
if(r!=null)return r
s=function(b,c){return function(){return b(c,Array.prototype.slice.apply(arguments))}}(A.tB,a)
s[$.io()]=a
a.$dart_jsFunction=s
return s},
tB(a,b){t.j.a(b)
return A.oF(t.Z.a(a),b)},
ul(a,b){if(typeof a=="function")return a
else return b.a(A.tG(a))},
pQ(a){return a==null||A.eF(a)||typeof a=="number"||typeof a=="string"||t.jx.b(a)||t.ev.b(a)||t.nn.b(a)||t.m6.b(a)||t.hM.b(a)||t.bW.b(a)||t.mC.b(a)||t.pk.b(a)||t.kI.b(a)||t.lo.b(a)||t.fW.b(a)},
uL(a){if(A.pQ(a))return a
return new A.nf(new A.ct(t.as)).$1(a)},
q7(a,b){var s=new A.W($.Q,b.h("W<0>")),r=new A.bF(s,b.h("bF<0>"))
a.then(A.bI(new A.nm(r,b),1),A.bI(new A.nn(r),1))
return s},
nf:function nf(a){this.a=a},
nm:function nm(a,b){this.a=a
this.b=b},
nn:function nn(a){this.a=a},
mx:function mx(a){this.a=a},
aS:function aS(){},
fm:function fm(){},
aW:function aW(){},
fA:function fA(){},
fF:function fF(){},
cX:function cX(){},
fL:function fL(){},
eR:function eR(a){this.a=a},
r:function r(){},
aX:function aX(){},
fW:function fW(){},
ht:function ht(){},
hu:function hu(){},
hD:function hD(){},
hE:function hE(){},
hR:function hR(){},
hS:function hS(){},
i0:function i0(){},
i1:function i1(){},
eS:function eS(){},
eT:function eT(){},
kp:function kp(a){this.a=a},
eU:function eU(){},
bM:function bM(){},
fB:function fB(){},
h6:function h6(){},
uN(){var s=document
s.toString
B.E.c2(s,"DOMContentLoaded",new A.ng())},
ng:function ng(){},
it:function it(){var _=this
_.a=null
_.b="view-dashboard"
_.r=_.f=_.e=_.d=_.c=null
_.x=_.w=0
_.z=_.y=!1
_.Q=0
_.ax=_.at=_.as=null
_.ay=!1
_.k2=_.id=_.go=_.fy=_.fx=_.fr=_.dy=_.dx=_.db=_.cy=_.cx=_.CW=_.ch=$
_.k3=null
_.k4=!1
_.ok=null},
jA:function jA(){},
ju:function ju(a){this.a=a},
jv:function jv(){},
jw:function jw(a){this.a=a},
jt:function jt(){},
jx:function jx(a){this.a=a},
jy:function jy(a){this.a=a},
jz:function jz(a){this.a=a},
j4:function j4(a){this.a=a},
j0:function j0(){},
j1:function j1(){},
j2:function j2(a,b){this.a=a
this.b=b},
j3:function j3(a){this.a=a},
j7:function j7(a){this.a=a},
j8:function j8(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
j9:function j9(a){this.a=a},
jf:function jf(a){this.a=a},
jg:function jg(a){this.a=a},
j6:function j6(a,b){this.a=a
this.b=b},
jh:function jh(a){this.a=a},
ji:function ji(a){this.a=a},
jj:function jj(a){this.a=a},
jk:function jk(a){this.a=a},
jl:function jl(a){this.a=a},
jm:function jm(a,b){this.a=a
this.b=b},
ja:function ja(a){this.a=a},
jb:function jb(a,b){this.a=a
this.b=b},
jc:function jc(a){this.a=a},
jd:function jd(a){this.a=a},
je:function je(a){this.a=a},
j5:function j5(a,b){this.a=a
this.b=b},
jn:function jn(){},
kb:function kb(){},
kc:function kc(){},
kd:function kd(){},
kl:function kl(a){this.a=a},
km:function km(a){this.a=a},
jM:function jM(){},
jN:function jN(a,b){this.a=a
this.b=b},
jL:function jL(a,b){this.a=a
this.b=b},
jO:function jO(a,b){this.a=a
this.b=b},
jK:function jK(a){this.a=a},
jP:function jP(a,b){this.a=a
this.b=b},
jI:function jI(a){this.a=a},
jJ:function jJ(a,b){this.a=a
this.b=b},
jQ:function jQ(a,b,c){this.a=a
this.b=b
this.c=c},
jF:function jF(a){this.a=a},
jG:function jG(a){this.a=a},
jH:function jH(a,b){this.a=a
this.b=b},
jR:function jR(a,b,c){this.a=a
this.b=b
this.c=c},
jD:function jD(a){this.a=a},
jE:function jE(){},
jT:function jT(a,b,c){this.a=a
this.b=b
this.c=c},
jU:function jU(a,b){this.a=a
this.b=b},
jS:function jS(a,b){this.a=a
this.b=b},
jB:function jB(a){this.a=a},
k6:function k6(){},
k7:function k7(a,b){this.a=a
this.b=b},
k8:function k8(){},
k9:function k9(){},
ka:function ka(a,b){this.a=a
this.b=b},
jV:function jV(a){this.a=a},
jW:function jW(a,b){this.a=a
this.b=b},
jX:function jX(){},
jY:function jY(){},
jZ:function jZ(a){this.a=a},
jo:function jo(a){this.a=a},
jp:function jp(a){this.a=a},
jq:function jq(a){this.a=a},
jr:function jr(a,b){this.a=a
this.b=b},
js:function js(a){this.a=a},
kf:function kf(a){this.a=a},
kg:function kg(a,b,c){this.a=a
this.b=b
this.c=c},
ke:function ke(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
kn:function kn(){},
jC:function jC(a,b){this.a=a
this.b=b},
kk:function kk(a){this.a=a},
kh:function kh(){},
ki:function ki(){},
kj:function kj(){},
j_:function j_(a){this.a=a},
k_:function k_(){},
k0:function k0(){},
k1:function k1(){},
k2:function k2(a){this.a=a},
k3:function k3(){},
k4:function k4(){},
k5:function k5(a,b){this.a=a
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
iz:function iz(a,b,c){this.a=a
this.b=b
this.c=c},
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
kv:function kv(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
_.as=_.Q=null
_.at=0
_.ax=i
_.ay=0
_.ch=j
_.CW=null
_.cx=k
_.db=_.cy=!1},
ky:function ky(){},
kz:function kz(a){this.a=a},
kG:function kG(a){this.a=a},
kC:function kC(a,b){this.a=a
this.b=b},
kD:function kD(a){this.a=a},
kE:function kE(a){this.a=a},
kF:function kF(a,b){this.a=a
this.b=b},
kT:function kT(){},
kU:function kU(){},
kB:function kB(){},
l4:function l4(){},
l5:function l5(a,b,c){this.a=a
this.b=b
this.c=c},
l9:function l9(){},
la:function la(a){this.a=a},
lb:function lb(a){this.a=a},
l8:function l8(a){this.a=a},
lc:function lc(a){this.a=a},
ld:function ld(){},
kZ:function kZ(a){this.a=a},
l_:function l_(a){this.a=a},
l0:function l0(a){this.a=a},
l1:function l1(a){this.a=a},
l2:function l2(a){this.a=a},
l3:function l3(a){this.a=a},
kH:function kH(){},
kS:function kS(){},
l7:function l7(a,b,c){this.a=a
this.b=b
this.c=c},
l6:function l6(a,b){this.a=a
this.b=b},
le:function le(){},
lf:function lf(){},
lg:function lg(a){this.a=a},
lh:function lh(){},
kx:function kx(){},
kw:function kw(a,b,c){this.a=a
this.b=b
this.c=c},
kR:function kR(a,b){this.a=a
this.b=b},
li:function li(a){this.a=a},
kQ:function kQ(){},
kO:function kO(a){this.a=a},
kP:function kP(){},
kK:function kK(){},
kL:function kL(){},
kM:function kM(a){this.a=a},
kN:function kN(){},
kV:function kV(a,b){this.a=a
this.b=b},
kW:function kW(){},
kX:function kX(){},
kY:function kY(a,b){this.a=a
this.b=b},
kA:function kA(a){this.a=a},
kJ:function kJ(a,b){this.a=a
this.b=b},
kI:function kI(a){this.a=a},
im(){var s,r=$.qm(),q=A.C(new Array(24),t.s)
for(s=0;s<24;++s)q[s]=B.a.a2(B.c.h8(r.fT(256),16),2,"0")
return B.b.fN(q)},
bk(){var s,r,q
try{r=window.localStorage.getItem("waterhall_jwt")
r.toString
s=r
r=J.os(s,".")
if(1>=r.length)return A.e(r,1)
r=A.w(J.m(B.d.M(0,B.r.M(0,B.u.b3(B.y.dt(0,r[1])))),"sub"))
return r}catch(q){return null}},
dg(){var s,r,q,p
try{q=window.localStorage.getItem("waterhall_jwt")
q.toString
s=q
q=J.os(s,".")
if(1>=q.length)return A.e(q,1)
r=B.d.M(0,B.r.M(0,B.u.b3(B.y.dt(0,q[1]))))
q=J.qD(J.qE(J.m(r,"exp"),1000),Date.now())
return q}catch(p){return!1}},
ij(a,b){var s=0,r=A.U(t.z),q
var $async$ij=A.V(function(c,d){if(c===1)return A.R(d,r)
for(;;)switch(s){case 0:if(!$.dj().b5("WaterHallStorage")){q=null
s=1
break}s=3
return A.y(A.q7(A.aY(globalThis.waterhallNativeCall(a,A.uL(b))),t.z),$async$ij)
case 3:q=d
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$ij,r)},
ik(a){var s=0,r=A.U(t.H)
var $async$ik=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:s=$.dj().b5("waterhallSetNativeSession")?2:3
break
case 2:s=4
return A.y(A.q7(A.aY(globalThis.waterhallSetNativeSession(a)),t.z),$async$ik)
case 4:case 3:return A.S(null,r)}})
return A.T($async$ik,r)},
cC(a,b){var s=A.bk(),r=$.qC().dH(new A.nj(s,a,b),t.a)
$.u9=r.dd(new A.nk())
return r},
n1(a,b){var s=0,r=A.U(t.H),q,p,o,n
var $async$n1=A.V(function(c,d){if(c===1)return A.R(d,r)
for(;;)switch(s){case 0:n=A.bk()
if(n==null)throw A.b(A.N("Sign in before recording an operation"))
q=A.G(b)
p=q.h("I<1>")
o=A.a4(new A.I(b,q.h("H(1)").a(new A.n2(n)),p),p.h("f.E"))
s=2
return A.y(A.ij("save",A.a3(["type",a,"rows",o],t.N,t.z)),$async$n1)
case 2:q=window.localStorage
q.toString
p=a==="collections"?"waterhall_offline_collections":"waterhall_unsynced_actions"
q.setItem(p,B.d.V(b))
return A.S(null,r)}})
return A.T($async$n1,r)},
di(){var s=0,r=A.U(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$di=A.V(function(a2,a3){if(a2===1)return A.R(a3,r)
for(;;)switch(s){case 0:a1=window.localStorage.getItem("waterhall_jwt")
if(A.bk()==null){s=1
break}s=3
return A.y(A.ik(window.localStorage.getItem("waterhall_jwt")),$async$di)
case 3:p=["collections","actions"],o=t.f,n=t.N,m=t.z,l=t.j,k=t.P,j=0
case 4:if(!(j<2)){s=6
break}i=p[j]
if(window.localStorage.getItem("waterhall_jwt")!=a1){s=1
break}s=7
return A.y(A.ij("load",A.a3(["type",i],n,m)),$async$di)
case 7:h=a3
if(window.localStorage.getItem("waterhall_jwt")!=a1){s=1
break}if(h==null){s=5
break}g=l.a(B.d.M(0,A.w(h)))
f=i==="collections"?"waterhall_offline_collections":"waterhall_unsynced_actions"
e=window.localStorage.getItem(f)
d=A.ap(n,k)
e=A.a4(l.a(B.d.M(0,e==null?"[]":e)),m)
B.b.T(e,g)
c=e.length
b=0
for(;b<e.length;e.length===c||(0,A.aB)(e),++b){a=A.aq(o.a(e[b]),n,m)
a0=a.i(0,"transaction_id")
d.k(0,J.L(a0==null?a.i(0,"operation_id"):a0),a)}s=A.bk()!=null?8:9
break
case 8:s=10
return A.y(A.cC(i,new A.np(d)),$async$di)
case 10:case 9:case 5:++j
s=4
break
case 6:case 1:return A.S(q,r)}})
return A.T($async$di,r)},
nj:function nj(a,b,c){this.a=a
this.b=b
this.c=c},
ni:function ni(){},
nk:function nk(){},
n2:function n2(a){this.a=a},
np:function np(a){this.a=a},
no:function no(a){this.a=a},
q4(a){return t.fj.b(a)||t.A.b(a)||t.mz.b(a)||t.ad.b(a)||t.F.b(a)||t.hE.b(a)||t.f5.b(a)},
uP(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
uT(a){throw A.ai(A.oM(a),new Error())},
av(){throw A.ai(A.rp(""),new Error())},
qc(){throw A.ai(A.oM(""),new Error())}},B={}
var w=[A,J,B]
var $={}
A.nG.prototype={}
J.cM.prototype={
a_(a,b){return a===b},
gH(a){return A.dW(a)},
l(a){return"Instance of '"+A.dX(a)+"'"},
ds(a,b){throw A.b(A.oT(a,t.bg.a(b)))},
gW(a){return A.cz(A.o8(this))}}
J.ff.prototype={
l(a){return String(a)},
gH(a){return a?519018:218159},
gW(a){return A.cz(t.y)},
$iZ:1,
$iH:1}
J.dD.prototype={
a_(a,b){return null==b},
l(a){return"null"},
gH(a){return 0},
$iZ:1,
$iab:1}
J.a.prototype={$ii:1}
J.bU.prototype={
gH(a){return 0},
l(a){return String(a)}}
J.fD.prototype={}
J.bD.prototype={}
J.bx.prototype={
l(a){var s=a[$.io()]
if(s==null)s=a[$.qg()]
if(s==null)return this.ef(a)
return"JavaScript function for "+J.L(s)},
$icd:1}
J.cN.prototype={
gH(a){return 0},
l(a){return String(a)}}
J.cO.prototype={
gH(a){return 0},
l(a){return String(a)}}
J.af.prototype={
m(a,b){A.G(a).c.a(b)
a.$flags&1&&A.aG(a,29)
a.push(b)},
ce(a,b,c){var s
A.G(a).c.a(c)
a.$flags&1&&A.aG(a,"insert",2)
s=a.length
if(b>s)throw A.b(A.oZ(b,null))
a.splice(b,0,c)},
eZ(a,b,c){var s,r,q,p,o
A.G(a).h("H(1)").a(b)
s=[]
r=a.length
for(q=0;q<r;++q){p=a[q]
if(!b.$1(p))s.push(p)
if(a.length!==r)throw A.b(A.a5(a))}o=s.length
if(o===r)return
this.sj(a,o)
for(q=0;q<s.length;++q)a[q]=s[q]},
T(a,b){var s
A.G(a).h("f<1>").a(b)
a.$flags&1&&A.aG(a,"addAll",2)
if(Array.isArray(b)){this.eu(a,b)
return}for(s=J.b_(b);s.p();)a.push(s.gt(s))},
eu(a,b){var s,r
t.x.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.b(A.a5(a))
for(r=0;r<s;++r)a.push(b[r])},
a0(a){a.$flags&1&&A.aG(a,"clear","clear")
a.length=0},
q(a,b){var s,r
A.G(a).h("~(1)").a(b)
s=a.length
for(r=0;r<s;++r){b.$1(a[r])
if(a.length!==s)throw A.b(A.a5(a))}},
ap(a,b,c){var s=A.G(a)
return new A.a0(a,s.J(c).h("1(2)").a(b),s.h("@<1>").J(c).h("a0<1,2>"))},
Z(a,b){var s,r=A.dL(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.k(r,s,A.h(a[s]))
return r.join(b)},
fN(a){return this.Z(a,"")},
fZ(a,b){var s,r,q
A.G(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.b(A.dB())
if(0>=s)return A.e(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.b(A.a5(a))}return r},
fF(a,b,c,d){var s,r,q
d.a(b)
A.G(a).J(d).h("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.b(A.a5(a))}return r},
di(a,b,c){var s,r,q,p=A.G(a)
p.h("H(1)").a(b)
p.h("1()?").a(c)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.b(A.a5(a))}if(c!=null)return c.$0()
throw A.b(A.dB())},
fE(a,b){return this.di(a,b,null)},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
cD(a,b,c){var s=a.length
if(b>s)throw A.b(A.aj(b,0,s,"start",null))
if(c==null)c=s
else if(c<b||c>s)throw A.b(A.aj(c,b,s,"end",null))
if(b===c)return A.C([],A.G(a))
return A.C(a.slice(b,c),A.G(a))},
e9(a,b){return this.cD(a,b,null)},
gC(a){if(a.length>0)return a[0]
throw A.b(A.dB())},
gdn(a){var s=a.length
if(s>0)return a[s-1]
throw A.b(A.dB())},
ab(a,b){var s,r
A.G(a).h("H(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.b(A.a5(a))}return!1},
bd(a,b){var s,r,q,p,o,n=A.G(a)
n.h("j(1,1)?").a(b)
a.$flags&2&&A.aG(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.bb()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.bI(b,2))
if(p>0)this.f0(a,p)},
f0(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
A(a,b){var s
for(s=0;s<a.length;++s)if(J.l(a[s],b))return!0
return!1},
gD(a){return a.length===0},
gS(a){return a.length!==0},
l(a){return A.nE(a,"[","]")},
gE(a){return new J.b8(a,a.length,A.G(a).h("b8<1>"))},
gH(a){return A.dW(a)},
gj(a){return a.length},
sj(a,b){a.$flags&1&&A.aG(a,"set length","change the length of")
if(b>a.length)A.G(a).c.a(null)
a.length=b},
i(a,b){A.K(b)
if(!(b>=0&&b<a.length))throw A.b(A.ih(a,b))
return a[b]},
k(a,b,c){A.G(a).c.a(c)
a.$flags&2&&A.aG(a)
if(!(b>=0&&b<a.length))throw A.b(A.ih(a,b))
a[b]=c},
dN(a,b){return new A.co(a,b.h("co<0>"))},
fI(a,b){var s
A.G(a).h("H(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$in:1,
$if:1,
$io:1}
J.fe.prototype={
dK(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.dX(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.ly.prototype={}
J.b8.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.aB(q)
throw A.b(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iaa:1}
J.cf.prototype={
a5(a,b){var s
A.ad(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gbu(b)
if(this.gbu(a)===s)return 0
if(this.gbu(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbu(a){return a===0?1/a<0:a<0},
aD(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.b(A.P(""+a+".round()"))},
c6(a,b,c){if(B.c.a5(b,c)>0)throw A.b(A.oc(b))
if(this.a5(a,b)<0)return b
if(this.a5(a,c)>0)return c
return a},
K(a,b){var s
if(b>20)throw A.b(A.aj(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gbu(a))return"-"+s
return s},
h8(a,b){var s,r,q,p,o
if(b<2||b>36)throw A.b(A.aj(b,2,36,"radix",null))
s=a.toString(b)
r=s.length
q=r-1
if(!(q>=0))return A.e(s,q)
if(s.charCodeAt(q)!==41)return s
p=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(s)
if(p==null)A.bL(A.P("Unexpected toString result: "+s))
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
gH(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
aF(a,b){return a*b},
au(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
ek(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.cZ(a,b)},
a3(a,b){return(a|0)===a?a/b|0:this.cZ(a,b)},
cZ(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.b(A.P("Result of truncating division is "+A.h(s)+": "+A.h(a)+" ~/ "+b))},
b0(a,b){var s
if(a>0)s=this.cY(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
f8(a,b){if(0>b)throw A.b(A.oc(b))
return this.cY(a,b)},
cY(a,b){return b>31?0:a>>>b},
bb(a,b){return a>b},
gW(a){return A.cz(t.r)},
$iX:1,
$ia1:1}
J.dC.prototype={
gW(a){return A.cz(t.S)},
$iZ:1,
$ij:1}
J.fh.prototype={
gW(a){return A.cz(t.dx)},
$iZ:1}
J.bT.prototype={
cr(a,b){return a+b},
e7(a,b){var s=A.C(a.split(b),t.s)
return s},
aC(a,b,c,d){var s=A.cV(b,c,a.length)
return a.substring(0,b)+d+a.substring(s)},
R(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.aj(c,0,a.length,null,null))
s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)},
O(a,b){return this.R(a,b,0)},
n(a,b,c){return a.substring(b,A.cV(b,c,a.length))},
Y(a,b){return this.n(a,b,null)},
h7(a){return a.toLowerCase()},
u(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.e(p,0)
if(p.charCodeAt(0)===133){s=J.rl(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.e(p,r)
q=p.charCodeAt(r)===133?J.rm(p,r):o
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
a2(a,b,c){var s=b-a.length
if(s<=0)return a
return this.aF(c,s)+a},
bt(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.aj(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
dk(a,b){return this.bt(a,b,0)},
dq(a,b,c){var s,r
if(c==null)c=a.length
else if(c<0||c>a.length)throw A.b(A.aj(c,0,a.length,null,null))
s=b.length
r=a.length
if(c+s>r)c=r-s
return a.lastIndexOf(b,c)},
fO(a,b){return this.dq(a,b,null)},
bp(a,b,c){var s=a.length
if(c>s)throw A.b(A.aj(c,0,s,null,null))
return A.uR(a,b,c)},
A(a,b){return this.bp(a,b,0)},
a5(a,b){var s
A.w(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
l(a){return a},
gH(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gW(a){return A.cz(t.N)},
gj(a){return a.length},
i(a,b){A.K(b)
if(!(b>=0&&b<a.length))throw A.b(A.ih(a,b))
return a[b]},
$iZ:1,
$ilO:1,
$ic:1}
A.dG.prototype={
l(a){return"LateInitializationError: "+this.a}}
A.eZ.prototype={
gj(a){return this.a.length},
i(a,b){var s
A.K(b)
s=this.a
if(!(b>=0&&b<s.length))return A.e(s,b)
return s.charCodeAt(b)}}
A.nl.prototype={
$0(){return A.nD(null,t.H)},
$S:70}
A.lS.prototype={}
A.n.prototype={}
A.ag.prototype={
gE(a){var s=this
return new A.by(s,s.gj(s),A.B(s).h("by<ag.E>"))},
gD(a){return this.gj(this)===0},
A(a,b){var s,r=this,q=r.gj(r)
for(s=0;s<q;++s){if(J.l(r.v(0,s),b))return!0
if(q!==r.gj(r))throw A.b(A.a5(r))}return!1},
Z(a,b){var s,r,q,p=this,o=p.gj(p)
if(b.length!==0){if(o===0)return""
s=A.h(p.v(0,0))
if(o!==p.gj(p))throw A.b(A.a5(p))
for(r=s,q=1;q<o;++q){r=r+b+A.h(p.v(0,q))
if(o!==p.gj(p))throw A.b(A.a5(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.h(p.v(0,q))
if(o!==p.gj(p))throw A.b(A.a5(p))}return r.charCodeAt(0)==0?r:r}},
bC(a,b){return this.ec(0,A.B(this).h("H(ag.E)").a(b))},
ap(a,b,c){var s=A.B(this)
return new A.a0(this,s.J(c).h("1(ag.E)").a(b),s.h("@<ag.E>").J(c).h("a0<1,2>"))},
aE(a,b){var s=A.a4(this,A.B(this).h("ag.E"))
return s},
ar(a){return this.aE(0,!0)},
dJ(a){var s,r=this,q=A.ci(A.B(r).h("ag.E"))
for(s=0;s<r.gj(r);++s)q.m(0,r.v(0,s))
return q}}
A.e1.prototype={
geK(){var s=J.a8(this.a),r=this.c
if(r==null||r>s)return s
return r},
gfa(){var s=J.a8(this.a),r=this.b
if(r>s)return s
return r},
gj(a){var s,r=J.a8(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
v(a,b){var s=this,r=s.gfa()+b
if(b<0||r>=s.geK())throw A.b(A.a6(b,s.gj(0),s,null,"index"))
return J.eL(s.a,r)},
aE(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.z(n),l=m.gj(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.nF(0,n):J.oJ(0,n)}r=A.dL(s,m.v(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.b.k(r,q,m.v(n,o+q))
if(m.gj(n)<l)throw A.b(A.a5(p))}return r},
ar(a){return this.aE(0,!0)}}
A.by.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s,r=this,q=r.a,p=J.z(q),o=p.gj(q)
if(r.b!==o)throw A.b(A.a5(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.v(q,s);++r.c
return!0},
$iaa:1}
A.aE.prototype={
gE(a){return new A.dM(J.b_(this.a),this.b,A.B(this).h("dM<1,2>"))},
gj(a){return J.a8(this.a)},
gD(a){return J.ir(this.a)},
v(a,b){return this.b.$1(J.eL(this.a,b))}}
A.bu.prototype={$in:1}
A.dM.prototype={
p(){var s=this,r=s.b
if(r.p()){s.a=s.c.$1(r.gt(r))
return!0}s.a=null
return!1},
gt(a){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iaa:1}
A.a0.prototype={
gj(a){return J.a8(this.a)},
v(a,b){return this.b.$1(J.eL(this.a,b))}}
A.I.prototype={
gE(a){return new A.bh(J.b_(this.a),this.b,this.$ti.h("bh<1>"))},
ap(a,b,c){var s=this.$ti
return new A.aE(this,s.J(c).h("1(2)").a(b),s.h("@<1>").J(c).h("aE<1,2>"))}}
A.bh.prototype={
p(){var s,r
for(s=this.a,r=this.b;s.p();)if(r.$1(s.gt(s)))return!0
return!1},
gt(a){var s=this.a
return s.gt(s)},
$iaa:1}
A.co.prototype={
gE(a){return new A.e5(J.b_(this.a),this.$ti.h("e5<1>"))}}
A.e5.prototype={
p(){var s,r
for(s=this.a,r=this.$ti.c;s.p();)if(r.b(s.gt(s)))return!0
return!1},
gt(a){var s=this.a
return this.$ti.c.a(s.gt(s))},
$iaa:1}
A.aD.prototype={}
A.bE.prototype={
k(a,b,c){A.B(this).h("bE.E").a(c)
throw A.b(A.P("Cannot modify an unmodifiable list"))}}
A.d_.prototype={}
A.hw.prototype={
gj(a){return J.a8(this.a)},
v(a,b){var s=J.a8(this.a)
if(0>b||b>=s)A.bL(A.a6(b,s,this,null,"index"))
return b}}
A.cj.prototype={
i(a,b){return this.L(0,b)?J.m(this.a,A.K(b)):null},
gj(a){return J.a8(this.a)},
gG(a){return new A.hw(this.a)},
gD(a){return J.ir(this.a)},
gS(a){return J.ny(this.a)},
L(a,b){return A.eG(b)&&b>=0&&b<J.a8(this.a)},
q(a,b){var s,r,q,p
this.$ti.h("~(j,1)").a(b)
s=this.a
r=J.z(s)
q=r.gj(s)
for(p=0;p<q;++p){b.$2(p,r.i(s,p))
if(q!==r.gj(s))throw A.b(A.a5(s))}}}
A.bZ.prototype={
gH(a){var s=this._hashCode
if(s!=null)return s
s=664597*B.a.gH(this.a)&536870911
this._hashCode=s
return s},
l(a){return'Symbol("'+this.a+'")'},
a_(a,b){if(b==null)return!1
return b instanceof A.bZ&&this.a===b.a},
$icY:1}
A.dn.prototype={}
A.dm.prototype={
gD(a){return this.gj(this)===0},
gS(a){return this.gj(this)!==0},
l(a){return A.nJ(this)},
k(a,b,c){var s=A.B(this)
s.c.a(b)
s.y[1].a(c)
A.oB()},
B(a,b){A.oB()},
gaz(a){return new A.d7(this.fC(0),A.B(this).h("d7<am<1,2>>"))},
fC(a){var s=this
return function(){var r=a
var q=0,p=1,o=[],n,m,l,k,j
return function $async$gaz(b,c,d){if(c===1){o.push(d)
q=p}for(;;)switch(q){case 0:n=s.gG(s),n=n.gE(n),m=A.B(s),l=m.y[1],m=m.h("am<1,2>")
case 2:if(!n.p()){q=3
break}k=n.gt(n)
j=s.i(0,k)
q=4
return b.b=new A.am(k,j==null?l.a(j):j,m),1
case 4:q=2
break
case 3:return 0
case 1:return b.c=o.at(-1),3}}}},
$it:1}
A.bs.prototype={
gj(a){return this.b.length},
gcQ(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
L(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
i(a,b){if(!this.L(0,b))return null
return this.b[this.a[b]]},
q(a,b){var s,r,q,p
this.$ti.h("~(1,2)").a(b)
s=this.gcQ()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gG(a){return new A.ei(this.gcQ(),this.$ti.h("ei<1>"))}}
A.ei.prototype={
gj(a){return this.a.length},
gD(a){return 0===this.a.length},
gE(a){var s=this.a
return new A.ej(s,s.length,this.$ti.h("ej<1>"))}}
A.ej.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iaa:1}
A.fg.prototype={
gfR(){var s=this.a
if(s instanceof A.bZ)return s
return this.a=new A.bZ(A.w(s))},
gfW(){var s,r,q,p,o,n=this
if(n.c===1)return B.G
s=n.d
r=J.z(s)
q=r.gj(s)-J.a8(n.e)-n.f
if(q===0)return B.G
p=[]
for(o=0;o<q;++o)p.push(r.i(s,o))
p.$flags=3
return p},
gfS(){var s,r,q,p,o,n,m,l,k=this
if(k.c!==0)return B.J
s=k.e
r=J.z(s)
q=r.gj(s)
p=k.d
o=J.z(p)
n=o.gj(p)-q-k.f
if(q===0)return B.J
m=new A.bb(t.bX)
for(l=0;l<q;++l)m.k(0,new A.bZ(A.w(r.i(s,l))),o.i(p,n+l))
return new A.dn(m,t.i9)},
$ioI:1}
A.lP.prototype={
$2(a,b){var s
A.w(a)
s=this.a
s.b=s.b+"$"+a
B.b.m(this.b,a)
B.b.m(this.c,b);++s.a},
$S:11}
A.cW.prototype={}
A.lZ.prototype={
ae(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.fj.prototype={
l(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.fY.prototype={
l(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.lN.prototype={
l(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.dv.prototype={}
A.et.prototype={
l(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibf:1}
A.bP.prototype={
l(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.qd(r==null?"unknown":r)+"'"},
$icd:1,
ghc(){return this},
$C:"$1",
$R:1,
$D:null}
A.eX.prototype={$C:"$0",$R:0}
A.eY.prototype={$C:"$2",$R:2}
A.fO.prototype={}
A.fK.prototype={
l(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.qd(s)+"'"}}
A.cH.prototype={
a_(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.cH))return!1
return this.$_target===b.$_target&&this.a===b.a},
gH(a){return(A.il(this.a)^A.dW(this.$_target))>>>0},
l(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.dX(this.a)+"'")}}
A.fH.prototype={
l(a){return"RuntimeError: "+this.a}}
A.mE.prototype={}
A.bb.prototype={
gj(a){return this.a},
gD(a){return this.a===0},
gS(a){return this.a!==0},
gG(a){return new A.ch(this,A.B(this).h("ch<1>"))},
gaz(a){return new A.dH(this,A.B(this).h("dH<1,2>"))},
L(a,b){var s=this.b
if(s==null)return!1
return s[b]!=null},
T(a,b){A.B(this).h("t<1,2>").a(b).q(0,new A.lz(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.fK(b)},
fK(a){var s,r,q=this.d
if(q==null)return null
s=q[this.dl(a)]
r=this.dm(s,a)
if(r<0)return null
return s[r].b},
k(a,b,c){var s,r,q=this,p=A.B(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.cE(s==null?q.b=q.bT():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.cE(r==null?q.c=q.bT():r,b,c)}else q.fL(b,c)},
fL(a,b){var s,r,q,p,o=this,n=A.B(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.bT()
r=o.dl(a)
q=s[r]
if(q==null)s[r]=[o.bU(a,b)]
else{p=o.dm(q,a)
if(p>=0)q[p].b=b
else q.push(o.bU(a,b))}},
dv(a,b,c){var s,r,q=this,p=A.B(q)
p.c.a(b)
p.h("2()").a(c)
if(q.L(0,b)){s=q.i(0,b)
return s==null?p.y[1].a(s):s}r=c.$0()
q.k(0,b,r)
return r},
B(a,b){var s=this.eq(this.b,b)
return s},
a0(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.bS()}},
q(a,b){var s,r,q=this
A.B(q).h("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.b(A.a5(q))
s=s.c}},
cE(a,b,c){var s,r=A.B(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.bU(b,c)
else s.b=c},
eq(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.er(s)
delete a[b]
return s.b},
bS(){this.r=this.r+1&1073741823},
bU(a,b){var s=this,r=A.B(s),q=new A.lD(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.bS()
return q},
er(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.bS()},
dl(a){return J.cD(a)&1073741823},
dm(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.l(a[r].a,b))return r
return-1},
l(a){return A.nJ(this)},
bT(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ioN:1}
A.lz.prototype={
$2(a,b){var s=this.a,r=A.B(s)
s.k(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.B(this.a).h("~(1,2)")}}
A.lD.prototype={}
A.ch.prototype={
gj(a){return this.a.a},
gD(a){return this.a.a===0},
gE(a){var s=this.a
return new A.dJ(s,s.r,s.e,this.$ti.h("dJ<1>"))},
A(a,b){return this.a.L(0,b)}}
A.dJ.prototype={
gt(a){return this.d},
p(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a5(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iaa:1}
A.aT.prototype={
gj(a){return this.a.a},
gD(a){return this.a.a===0},
gE(a){var s=this.a
return new A.dK(s,s.r,s.e,this.$ti.h("dK<1>"))},
q(a,b){var s,r,q
this.$ti.h("~(1)").a(b)
s=this.a
r=s.e
q=s.r
while(r!=null){b.$1(r.b)
if(q!==s.r)throw A.b(A.a5(s))
r=r.c}}}
A.dK.prototype={
gt(a){return this.d},
p(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a5(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iaa:1}
A.dH.prototype={
gj(a){return this.a.a},
gD(a){return this.a.a===0},
gE(a){var s=this.a
return new A.dI(s,s.r,s.e,this.$ti.h("dI<1,2>"))}}
A.dI.prototype={
gt(a){var s=this.d
s.toString
return s},
p(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a5(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.am(s.a,s.b,r.$ti.h("am<1,2>"))
r.c=s.c
return!0}},
$iaa:1}
A.nb.prototype={
$1(a){return this.a(a)},
$S:12}
A.nc.prototype={
$2(a,b){return this.a(a,b)},
$S:39}
A.nd.prototype={
$1(a){return this.a(A.w(a))},
$S:38}
A.fi.prototype={
l(a){return"RegExp/"+this.a+"/"+this.b.flags},
dh(a){var s=this.b.exec(a)
if(s==null)return null
return new A.mC(s)},
$ilO:1,
$irB:1}
A.mC.prototype={
i(a,b){var s
A.K(b)
s=this.b
if(!(b<s.length))return A.e(s,b)
return s[b]}}
A.ck.prototype={
gW(a){return B.aq},
da(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
$iZ:1,
$ick:1,
$ieW:1}
A.dP.prototype={
gfq(a){if(((a.$flags|0)&2)!==0)return new A.i2(a.buffer)
else return a.buffer},
eP(a,b,c,d){var s=A.aj(b,0,c,d,null)
throw A.b(s)},
cI(a,b,c,d){if(b>>>0!==b||b>c)this.eP(a,b,c,d)},
$iac:1}
A.i2.prototype={
da(a,b,c){var s=A.oS(this.a,b,c)
s.$flags=3
return s},
$ieW:1}
A.dN.prototype={
gW(a){return B.ar},
$iZ:1,
$ikr:1}
A.ar.prototype={
gj(a){return a.length},
f7(a,b,c,d,e){var s,r,q=a.length
this.cI(a,b,q,"start")
this.cI(a,c,q,"end")
if(b>c)throw A.b(A.aj(b,0,c,null,null))
s=c-b
if(e<0)throw A.b(A.b7(e,null))
r=d.length
if(r-e<s)throw A.b(A.N("Not enough elements"))
if(e!==0||r!==s)d=d.subarray(e,e+s)
a.set(d,b)},
$iM:1}
A.dO.prototype={
i(a,b){A.K(b)
A.bH(b,a,a.length)
return a[b]},
k(a,b,c){A.pF(c)
a.$flags&2&&A.aG(a)
A.bH(b,a,a.length)
a[b]=c},
$in:1,
$if:1,
$io:1}
A.aV.prototype={
k(a,b,c){A.K(c)
a.$flags&2&&A.aG(a)
A.bH(b,a,a.length)
a[b]=c},
bG(a,b,c,d,e){t.fm.a(d)
a.$flags&2&&A.aG(a,5)
if(t.aj.b(d)){this.f7(a,b,c,d,e)
return}this.eg(a,b,c,d,e)},
$in:1,
$if:1,
$io:1}
A.fs.prototype={
gW(a){return B.as},
$iZ:1,
$ils:1}
A.ft.prototype={
gW(a){return B.at},
$iZ:1,
$ilt:1}
A.fu.prototype={
gW(a){return B.au},
i(a,b){A.K(b)
A.bH(b,a,a.length)
return a[b]},
$iZ:1,
$ilv:1}
A.fv.prototype={
gW(a){return B.av},
i(a,b){A.K(b)
A.bH(b,a,a.length)
return a[b]},
$iZ:1,
$ilw:1}
A.fw.prototype={
gW(a){return B.aw},
i(a,b){A.K(b)
A.bH(b,a,a.length)
return a[b]},
$iZ:1,
$ilx:1}
A.fx.prototype={
gW(a){return B.ay},
i(a,b){A.K(b)
A.bH(b,a,a.length)
return a[b]},
$iZ:1,
$im0:1}
A.fy.prototype={
gW(a){return B.az},
i(a,b){A.K(b)
A.bH(b,a,a.length)
return a[b]},
$iZ:1,
$im1:1}
A.dQ.prototype={
gW(a){return B.aA},
gj(a){return a.length},
i(a,b){A.K(b)
A.bH(b,a,a.length)
return a[b]},
$iZ:1,
$im2:1}
A.dR.prototype={
gW(a){return B.aB},
gj(a){return a.length},
i(a,b){A.K(b)
A.bH(b,a,a.length)
return a[b]},
$iZ:1,
$im3:1}
A.el.prototype={}
A.em.prototype={}
A.en.prototype={}
A.eo.prototype={}
A.be.prototype={
h(a){return A.mO(v.typeUniverse,this,a)},
J(a){return A.te(v.typeUniverse,this,a)}}
A.hm.prototype={}
A.mM.prototype={
l(a){return A.aF(this.a,null)}}
A.hj.prototype={
l(a){return this.a}}
A.d8.prototype={$ibB:1}
A.ma.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:13}
A.m9.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:67}
A.mb.prototype={
$0(){this.a.$0()},
$S:14}
A.mc.prototype={
$0(){this.a.$0()},
$S:14}
A.ex.prototype={
eo(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(A.bI(new A.mL(this,b),0),a)
else throw A.b(A.P("`setTimeout()` not found."))},
ep(a,b){if(self.setTimeout!=null)this.b=self.setInterval(A.bI(new A.mK(this,a,Date.now(),b),0),a)
else throw A.b(A.P("Periodic timer."))},
a4(a){var s
if(self.setTimeout!=null){s=this.b
if(s==null)return
if(this.a)self.clearTimeout(s)
else self.clearInterval(s)
this.b=null}else throw A.b(A.P("Canceling a timer."))},
$ifS:1}
A.mL.prototype={
$0(){var s=this.a
s.b=null
s.c=1
this.b.$0()},
$S:2}
A.mK.prototype={
$0(){var s,r=this,q=r.a,p=q.c+1,o=r.b
if(o>0){s=Date.now()-r.c
if(s>(p+1)*o)p=B.c.ek(s,o)}q.c=p
r.d.$1(q)},
$S:14}
A.h3.prototype={
b2(a,b){var s,r=this,q=r.$ti
q.h("1/?").a(b)
if(b==null)b=q.c.a(b)
if(!r.b)r.a.aU(b)
else{s=r.a
if(q.h("ae<1>").b(b))s.cG(b)
else s.bM(b)}},
c7(a,b){var s=this.a
if(this.b)s.ak(new A.ao(a,b))
else s.bI(new A.ao(a,b))}}
A.mV.prototype={
$1(a){return this.a.$2(0,a)},
$S:15}
A.mW.prototype={
$2(a,b){this.a.$2(1,new A.dv(a,t.l.a(b)))},
$S:66}
A.n4.prototype={
$2(a,b){this.a(A.K(a),b)},
$S:37}
A.eu.prototype={
gt(a){var s=this.b
return s==null?this.$ti.c.a(s):s},
f1(a,b){var s,r,q
a=A.K(a)
b=b
s=this.a
for(;;)try{r=s(this,a,b)
return r}catch(q){b=q
a=1}},
p(){var s,r,q,p,o,n=this,m=null,l=0
for(;;){s=n.d
if(s!=null)try{if(s.p()){r=s
n.b=r.gt(r)
return!0}else n.d=null}catch(q){m=q
l=1
n.d=null}p=n.f1(l,m)
if(1===p)return!0
if(0===p){n.b=null
o=n.e
if(o==null||o.length===0){n.a=A.po
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
n.a=A.po
throw m
return!1}if(0>=o.length)return A.e(o,-1)
n.a=o.pop()
l=1
continue}throw A.b(A.N("sync*"))}return!1},
hg(a){var s,r,q=this
if(a instanceof A.d7){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.b.m(r,q.a)
q.a=s
return 2}else{q.d=J.b_(a)
return 2}},
$iaa:1}
A.d7.prototype={
gE(a){return new A.eu(this.a(),this.$ti.h("eu<1>"))}}
A.ao.prototype={
l(a){return A.h(this.a)},
$ia_:1,
gaR(){return this.b}}
A.d2.prototype={}
A.bG.prototype={
bV(){},
bW(){},
sbh(a){this.ch=this.$ti.h("bG<1>?").a(a)},
sbX(a){this.CW=this.$ti.h("bG<1>?").a(a)}}
A.e7.prototype={
geR(){return this.c<4},
eY(a){var s,r
A.B(this).h("bG<1>").a(a)
s=a.CW
r=a.ch
if(s==null)this.d=r
else s.sbh(r)
if(r==null)this.e=s
else r.sbX(s)
a.sbX(a)
a.sbh(a)},
fb(a,b,c,d){var s,r,q,p,o,n,m,l=this,k=A.B(l)
k.h("~(1)?").a(a)
t.jE.a(c)
if((l.c&4)!==0){k=new A.d4($.Q,k.h("d4<1>"))
A.qa(k.geS())
if(c!=null)k.c=t.M.a(c)
return k}s=$.Q
r=d?1:0
q=b!=null?32:0
p=A.pd(s,a,k.c)
A.rQ(s,b)
o=c==null?A.uq():c
t.M.a(o)
k=k.h("bG<1>")
n=new A.bG(l,p,s,r|q,k)
n.CW=n
n.ch=n
k.a(n)
n.ay=l.c&1
m=l.e
l.e=n
n.sbh(null)
n.sbX(m)
if(m==null)l.d=n
else m.sbh(n)
if(l.d==l.e)A.pV(l.a)
return n},
eW(a){var s=this,r=A.B(s)
a=r.h("bG<1>").a(r.h("bq<1>").a(a))
if(a.ch===a)return null
r=a.ay
if((r&2)!==0)a.ay=r|4
else{s.eY(a)
if((s.c&2)===0&&s.d==null)s.eA()}return null},
ev(){if((this.c&4)!==0)return new A.bp("Cannot add new events after calling close")
return new A.bp("Cannot add new events while doing an addStream")},
m(a,b){var s=this
A.B(s).c.a(b)
if(!s.geR())throw A.b(s.ev())
s.c_(b)},
eA(){if((this.c&4)!==0)if(null.ghf())null.aU(null)
A.pV(this.b)},
$ip0:1,
$ipn:1,
$ic2:1}
A.e6.prototype={
c_(a){var s,r=this.$ti
r.c.a(a)
for(s=this.d,r=r.h("ea<1>");s!=null;s=s.ch)s.ex(new A.ea(a,r))}}
A.lu.prototype={
$0(){var s,r,q,p,o,n,m=this,l=m.a
if(l==null){m.c.a(null)
m.b.aV(null)}else{s=null
try{s=l.$0()}catch(p){r=A.al(p)
q=A.c4(p)
l=r
o=q
n=A.o9(l,o)
l=new A.ao(l,o)
m.b.ak(l)
return}m.b.aV(s)}},
$S:2}
A.lY.prototype={
l(a){var s=this.b.l(0)
return"TimeoutException after "+s+": "+this.a}}
A.h8.prototype={
c7(a,b){var s=this.a
if((s.a&30)!==0)throw A.b(A.N("Future already completed"))
s.bI(A.tS(a,b))},
bo(a){return this.c7(a,null)}}
A.bF.prototype={
b2(a,b){var s,r=this.$ti
r.h("1/?").a(b)
s=this.a
if((s.a&30)!==0)throw A.b(A.N("Future already completed"))
s.aU(r.h("1/").a(b))},
ft(a){return this.b2(0,null)}}
A.bj.prototype={
fQ(a){if((this.c&15)!==6)return!0
return this.b.b.cn(t.iW.a(this.d),a.a,t.y,t.K)},
fG(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.ng.b(q))p=l.h5(q,m,a.b,o,n,t.l)
else p=l.cn(t.v.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.do.b(A.al(s))){if((r.c&1)!==0)throw A.b(A.b7("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.b(A.b7("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.W.prototype={
bA(a,b,c){var s,r,q,p=this.$ti
p.J(c).h("1/(2)").a(a)
s=$.Q
if(s===B.h){if(b!=null&&!t.ng.b(b)&&!t.v.b(b))throw A.b(A.ko(b,"onError",u.c))}else{c.h("@<0/>").J(p.c).h("1(2)").a(a)
if(b!=null)b=A.pR(b,s)}r=new A.W(s,c.h("W<0>"))
q=b==null?1:3
this.aT(new A.bj(r,q,a,b,p.h("@<1>").J(c).h("bj<1,2>")))
return r},
dH(a,b){return this.bA(a,null,b)},
d0(a,b,c){var s,r=this.$ti
r.J(c).h("1/(2)").a(a)
s=new A.W($.Q,c.h("W<0>"))
this.aT(new A.bj(s,19,a,b,r.h("@<1>").J(c).h("bj<1,2>")))
return s},
dd(a){var s=this.$ti,r=$.Q,q=new A.W(r,s)
if(r!==B.h)a=A.pR(a,r)
this.aT(new A.bj(q,2,null,a,s.h("bj<1,1>")))
return q},
f6(a){this.a=this.a&1|16
this.c=a},
bf(a){this.a=a.a&30|this.a&1
this.c=a.c},
aT(a){var s,r=this,q=r.a
if(q<=3){a.a=t.e.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.aT(a)
return}r.bf(s)}A.dd(null,null,r.b,t.M.a(new A.mj(r,a)))}},
cU(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.e.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t._.a(m.c)
if((n.a&24)===0){n.cU(a)
return}m.bf(n)}l.a=m.bk(a)
A.dd(null,null,m.b,t.M.a(new A.mo(l,m)))}},
aY(){var s=t.e.a(this.c)
this.c=null
return this.bk(s)},
bk(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
aV(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("ae<1>").b(a))A.mm(a,r,!0)
else{s=r.aY()
q.c.a(a)
r.a=8
r.c=a
A.cr(r,s)}},
bM(a){var s,r=this
r.$ti.c.a(a)
s=r.aY()
r.a=8
r.c=a
A.cr(r,s)},
eF(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aY()
q.bf(a)
A.cr(q,r)},
ak(a){var s=this.aY()
this.f6(a)
A.cr(this,s)},
eE(a,b){A.aY(a)
t.l.a(b)
this.ak(new A.ao(a,b))},
aU(a){var s=this.$ti
s.h("1/").a(a)
if(s.h("ae<1>").b(a)){this.cG(a)
return}this.ey(a)},
ey(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.dd(null,null,s.b,t.M.a(new A.ml(s,a)))},
cG(a){A.mm(this.$ti.h("ae<1>").a(a),this,!1)
return},
bI(a){this.a^=2
A.dd(null,null,this.b,t.M.a(new A.mk(this,a)))},
dI(a,b){var s,r=this,q={}
if((r.a&24)!==0){q=new A.W($.Q,r.$ti)
q.aU(r)
return q}s=new A.W($.Q,r.$ti)
q.a=null
q.a=A.fT(b,new A.mu(s,b))
r.bA(new A.mv(q,r,s),new A.mw(q,s),t.a)
return s},
$iae:1}
A.mj.prototype={
$0(){A.cr(this.a,this.b)},
$S:2}
A.mo.prototype={
$0(){A.cr(this.b,this.a.a)},
$S:2}
A.mn.prototype={
$0(){A.mm(this.a.a,this.b,!0)},
$S:2}
A.ml.prototype={
$0(){this.a.bM(this.b)},
$S:2}
A.mk.prototype={
$0(){this.a.ak(this.b)},
$S:2}
A.mr.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dE(t.mY.a(q.d),t.z)}catch(p){s=A.al(p)
r=A.c4(p)
if(k.c&&t.n.a(k.b.a.c).a===s){q=k.a
q.c=t.n.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.nz(q)
n=k.a
n.c=new A.ao(q,o)
q=n}q.b=!0
return}if(j instanceof A.W&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.n.a(j.c)
q.b=!0}return}if(j instanceof A.W){m=k.b.a
l=new A.W(m.b,m.$ti)
j.bA(new A.ms(l,m),new A.mt(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:2}
A.ms.prototype={
$1(a){this.a.eF(this.b)},
$S:13}
A.mt.prototype={
$2(a,b){A.aY(a)
t.l.a(b)
this.a.ak(new A.ao(a,b))},
$S:25}
A.mq.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.cn(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.al(l)
r=A.c4(l)
q=s
p=r
if(p==null)p=A.nz(q)
o=this.a
o.c=new A.ao(q,p)
o.b=!0}},
$S:2}
A.mp.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.n.a(l.a.a.c)
p=l.b
if(p.a.fQ(s)&&p.a.e!=null){p.c=p.a.fG(s)
p.b=!1}}catch(o){r=A.al(o)
q=A.c4(o)
p=t.n.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.nz(p)
m=l.b
m.c=new A.ao(p,n)
p=m}p.b=!0}},
$S:2}
A.mu.prototype={
$0(){var s=A.nN()
this.a.ak(new A.ao(new A.lY("Future not completed",this.b),s))},
$S:2}
A.mv.prototype={
$1(a){var s
this.b.$ti.c.a(a)
s=this.a.a
if(s.b!=null){s.a4(0)
this.c.bM(a)}},
$S(){return this.b.$ti.h("ab(1)")}}
A.mw.prototype={
$2(a,b){var s
A.aY(a)
t.l.a(b)
s=this.a.a
if(s.b!=null){s.a4(0)
this.b.ak(new A.ao(a,b))}},
$S:25}
A.h4.prototype={}
A.bY.prototype={
gj(a){var s={},r=new A.W($.Q,t.hy)
s.a=0
this.bv(new A.lW(s,this),!0,new A.lX(s,r),r.gcL())
return r},
gC(a){var s=new A.W($.Q,A.B(this).h("W<1>")),r=this.bv(null,!0,new A.lU(s),s.gcL())
r.cg(new A.lV(this,r,s))
return s}}
A.lW.prototype={
$1(a){A.B(this.b).c.a(a);++this.a.a},
$S(){return A.B(this.b).h("~(1)")}}
A.lX.prototype={
$0(){this.b.aV(this.a.a)},
$S:2}
A.lU.prototype={
$0(){var s,r=A.nN(),q=new A.bp("No element")
A.nL(q,r)
s=A.o9(q,r)
s=new A.ao(q,r)
this.a.ak(s)},
$S:2}
A.lV.prototype={
$1(a){A.tC(this.b,this.c,A.B(this.a).c.a(a))},
$S(){return A.B(this.a).h("~(1)")}}
A.e8.prototype={
gH(a){return(A.dW(this.a)^892482866)>>>0},
a_(a,b){if(b==null)return!1
if(this===b)return!0
return b instanceof A.d2&&b.a===this.a}}
A.e9.prototype={
cS(){return this.w.eW(this)},
bV(){A.B(this.w).h("bq<1>").a(this)},
bW(){A.B(this.w).h("bq<1>").a(this)}}
A.d3.prototype={
cg(a){var s=A.B(this)
this.a=A.pd(this.d,s.h("~(1)?").a(a),s.c)},
a4(a){var s,r=this,q=r.e&=4294967279
if((q&8)===0){q=r.e=q|8
if((q&128)!==0){s=r.r
if(s.a===1)s.a=3}if((q&64)===0)r.r=null
r.f=r.cS()}q=$.nq()
return q},
bV(){},
bW(){},
cS(){return null},
ex(a){var s,r,q=this,p=q.r
if(p==null)p=q.r=new A.hF(A.B(q).h("hF<1>"))
s=p.c
if(s==null)p.b=p.c=a
else p.c=s.a=a
r=q.e
if((r&128)===0){r|=128
q.e=r
if(r<256)p.cv(q)}},
c_(a){var s,r=this,q=A.B(r).c
q.a(a)
s=r.e
r.e=s|64
r.d.dG(r.a,a,q)
r.e&=4294967231
r.eB((s&4)!==0)},
eB(a){var s,r,q=this,p=q.e
if((p&128)!==0&&q.r.c==null){p=q.e=p&4294967167
s=!1
if((p&4)!==0)if(p<256){s=q.r
s=s==null?null:s.c==null
s=s!==!1}if(s){p&=4294967291
q.e=p}}for(;;a=r){if((p&8)!==0){q.r=null
return}r=(p&4)!==0
if(a===r)break
q.e=p^64
if(r)q.bV()
else q.bW()
p=q.e&=4294967231}if((p&128)!==0&&p<256)q.r.cv(q)},
$ibq:1,
$ic2:1}
A.d6.prototype={
bv(a,b,c,d){var s=this.$ti
s.h("~(1)?").a(a)
t.jE.a(c)
return this.a.fb(s.h("~(1)?").a(a),d,c,b===!0)},
fP(a){return this.bv(a,null,null,null)}}
A.eb.prototype={}
A.ea.prototype={}
A.hF.prototype={
cv(a){var s,r=this
r.$ti.h("c2<1>").a(a)
s=r.a
if(s===1)return
if(s>=1){r.a=1
return}A.qa(new A.mD(r,a))
r.a=1}}
A.mD.prototype={
$0(){var s,r,q,p=this.a,o=p.a
p.a=0
if(o===3)return
s=p.$ti.h("c2<1>").a(this.b)
r=p.b
q=r.a
p.b=q
if(q==null)p.c=null
A.B(r).h("c2<1>").a(s).c_(r.b)},
$S:2}
A.d4.prototype={
cg(a){this.$ti.h("~(1)?").a(a)},
a4(a){this.a=-1
this.c=null
return $.nq()},
eT(){var s,r=this,q=r.a-1
if(q===0){r.a=-1
s=r.c
if(s!=null){r.c=null
r.b.dF(s)}}else r.a=q},
$ibq:1}
A.hQ.prototype={}
A.mX.prototype={
$0(){return this.a.aV(this.b)},
$S:2}
A.eE.prototype={$ipb:1}
A.hI.prototype={
dF(a){var s,r,q
t.M.a(a)
try{if(B.h===$.Q){a.$0()
return}A.pS(null,null,this,a,t.H)}catch(q){s=A.al(q)
r=A.c4(q)
A.ie(A.aY(s),t.l.a(r))}},
dG(a,b,c){var s,r,q
c.h("~(0)").a(a)
c.a(b)
try{if(B.h===$.Q){a.$1(b)
return}A.pT(null,null,this,a,b,t.H,c)}catch(q){s=A.al(q)
r=A.c4(q)
A.ie(A.aY(s),t.l.a(r))}},
c4(a){return new A.mF(this,t.M.a(a))},
dc(a,b){return new A.mG(this,b.h("~(0)").a(a),b)},
i(a,b){return null},
dE(a,b){b.h("0()").a(a)
if($.Q===B.h)return a.$0()
return A.pS(null,null,this,a,b)},
cn(a,b,c,d){c.h("@<0>").J(d).h("1(2)").a(a)
d.a(b)
if($.Q===B.h)return a.$1(b)
return A.pT(null,null,this,a,b,c,d)},
h5(a,b,c,d,e,f){d.h("@<0>").J(e).J(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.Q===B.h)return a.$2(b,c)
return A.ub(null,null,this,a,b,c,d,e,f)},
ck(a,b,c,d){return b.h("@<0>").J(c).J(d).h("1(2,3)").a(a)}}
A.mF.prototype={
$0(){return this.a.dF(this.b)},
$S:2}
A.mG.prototype={
$1(a){var s=this.c
return this.a.dG(this.b,s.a(a),s)},
$S(){return this.c.h("~(0)")}}
A.n3.prototype={
$0(){A.rg(this.a,this.b)},
$S:2}
A.ef.prototype={
gj(a){return this.a},
gD(a){return this.a===0},
gS(a){return this.a!==0},
gG(a){return new A.eg(this,this.$ti.h("eg<1>"))},
L(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
return s==null?!1:s[b]!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
return r==null?!1:r[b]!=null}else return this.eI(b)},
eI(a){var s=this.d
if(s==null)return!1
return this.al(this.cN(s,a),a)>=0},
i(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.nU(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.nU(q,b)
return r}else return this.eL(0,b)},
eL(a,b){var s,r,q=this.d
if(q==null)return null
s=this.cN(q,b)
r=this.al(s,b)
return r<0?null:s[r+1]},
k(a,b,c){var s,r,q,p,o,n=this,m=n.$ti
m.c.a(b)
m.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=n.b
n.eD(s==null?n.b=A.pf():s,b,c)}else{r=n.d
if(r==null)r=n.d=A.pf()
q=A.il(b)&1073741823
p=r[q]
if(p==null){A.nV(r,q,[b,c]);++n.a
n.e=null}else{o=n.al(p,b)
if(o>=0)p[o+1]=c
else{p.push(b,c);++n.a
n.e=null}}}},
B(a,b){var s
if(b!=="__proto__")return this.bj(this.b,b)
else{s=this.bY(0,b)
return s}},
bY(a,b){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=A.il(b)&1073741823
r=n[s]
q=o.al(r,b)
if(q<0)return null;--o.a
o.e=null
p=r.splice(q,2)[1]
if(0===r.length)delete n[s]
return p},
q(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.h("~(1,2)").a(b)
s=m.cM()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.i(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.b(A.a5(m))}},
cM(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.dL(i.a,null,!1,t.z)
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
eD(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.nV(a,b,c)},
bj(a,b){var s
if(a!=null&&a[b]!=null){s=this.$ti.y[1].a(A.nU(a,b))
delete a[b];--this.a
this.e=null
return s}else return null},
cN(a,b){return a[A.il(b)&1073741823]}}
A.ct.prototype={
al(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.eg.prototype={
gj(a){return this.a.a},
gD(a){return this.a.a===0},
gS(a){return this.a.a!==0},
gE(a){var s=this.a
return new A.eh(s,s.cM(),this.$ti.h("eh<1>"))},
A(a,b){return this.a.L(0,b)}}
A.eh.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.b(A.a5(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iaa:1}
A.cu.prototype={
gE(a){var s=this,r=new A.cv(s,s.r,A.B(s).h("cv<1>"))
r.c=s.e
return r},
gj(a){return this.a},
gD(a){return this.a===0},
gS(a){return this.a!==0},
A(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.g.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.g.a(r[b])!=null}else return this.eH(b)},
eH(a){var s=this.d
if(s==null)return!1
return this.al(s[this.bN(a)],a)>=0},
m(a,b){var s,r,q=this
A.B(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.cJ(s==null?q.b=A.nW():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.cJ(r==null?q.c=A.nW():r,b)}else return q.es(0,b)},
es(a,b){var s,r,q,p=this
A.B(p).c.a(b)
s=p.d
if(s==null)s=p.d=A.nW()
r=p.bN(b)
q=s[r]
if(q==null)s[r]=[p.bL(b)]
else{if(p.al(q,b)>=0)return!1
q.push(p.bL(b))}return!0},
B(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bj(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bj(s.c,b)
else return s.bY(0,b)},
bY(a,b){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.bN(b)
r=n[s]
q=o.al(r,b)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.d4(p)
return!0},
cJ(a,b){A.B(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.bL(b)
return!0},
bj(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.d4(s)
delete a[b]
return!0},
cK(){this.r=this.r+1&1073741823},
bL(a){var s,r=this,q=new A.hv(A.B(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.cK()
return q},
d4(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.cK()},
bN(a){return J.cD(a)&1073741823},
al(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.l(a[r].a,b))return r
return-1}}
A.hv.prototype={}
A.cv.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.b(A.a5(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$iaa:1}
A.e3.prototype={
gj(a){return this.a.length},
i(a,b){var s
A.K(b)
s=this.a
if(!(b>=0&&b<s.length))return A.e(s,b)
return s[b]}}
A.lE.prototype={
$2(a,b){this.a.k(0,this.b.a(a),this.c.a(b))},
$S:41}
A.k.prototype={
gE(a){return new A.by(a,this.gj(a),A.au(a).h("by<k.E>"))},
v(a,b){return this.i(a,b)},
q(a,b){var s,r
A.au(a).h("~(k.E)").a(b)
s=this.gj(a)
for(r=0;r<s;++r){b.$1(this.i(a,r))
if(s!==this.gj(a))throw A.b(A.a5(a))}},
gD(a){return this.gj(a)===0},
gS(a){return!this.gD(a)},
gC(a){if(this.gj(a)===0)throw A.b(A.dB())
return this.i(a,0)},
A(a,b){var s,r=this.gj(a)
for(s=0;s<r;++s){if(J.l(this.i(a,s),b))return!0
if(r!==this.gj(a))throw A.b(A.a5(a))}return!1},
dN(a,b){return new A.co(a,b.h("co<0>"))},
ap(a,b,c){var s=A.au(a)
return new A.a0(a,s.J(c).h("1(k.E)").a(b),s.h("@<k.E>").J(c).h("a0<1,2>"))},
aE(a,b){var s,r,q,p,o=this
if(o.gD(a)){s=J.nF(0,A.au(a).h("k.E"))
return s}r=o.i(a,0)
q=A.dL(o.gj(a),r,!0,A.au(a).h("k.E"))
for(p=1;p<o.gj(a);++p)B.b.k(q,p,o.i(a,p))
return q},
ar(a){return this.aE(a,!0)},
fD(a,b,c,d){var s
A.au(a).h("k.E?").a(d)
A.cV(b,c,this.gj(a))
for(s=b;s<c;++s)this.k(a,s,d)},
bG(a,b,c,d,e){var s,r,q
A.au(a).h("f<k.E>").a(d)
A.cV(b,c,this.gj(a))
s=c-b
if(s===0)return
A.dZ(e,"skipCount")
r=J.z(d)
if(e+s>r.gj(d))throw A.b(A.N("Too few elements"))
if(e<b)for(q=s-1;q>=0;--q)this.k(a,b+q,r.i(d,e+q))
else for(q=0;q<s;++q)this.k(a,b+q,r.i(d,e+q))},
l(a){return A.nE(a,"[","]")},
$in:1,
$if:1,
$io:1}
A.E.prototype={
q(a,b){var s,r,q,p=A.au(a)
p.h("~(E.K,E.V)").a(b)
for(s=J.b_(this.gG(a)),p=p.h("E.V");s.p();){r=s.gt(s)
q=this.i(a,r)
b.$2(r,q==null?p.a(q):q)}},
gaz(a){return J.cE(this.gG(a),new A.lF(a),A.au(a).h("am<E.K,E.V>"))},
L(a,b){return J.nv(this.gG(a),b)},
gj(a){return J.a8(this.gG(a))},
gD(a){return J.ir(this.gG(a))},
gS(a){return J.ny(this.gG(a))},
l(a){return A.nJ(a)},
$it:1}
A.lF.prototype={
$1(a){var s=this.a,r=A.au(s)
r.h("E.K").a(a)
s=J.m(s,a)
if(s==null)s=r.h("E.V").a(s)
return new A.am(a,s,r.h("am<E.K,E.V>"))},
$S(){return A.au(this.a).h("am<E.K,E.V>(E.K)")}}
A.lG.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.h(a)
r.a=(r.a+=s)+": "
s=A.h(b)
r.a+=s},
$S:35}
A.d0.prototype={}
A.aA.prototype={
k(a,b,c){var s=A.B(this)
s.h("aA.K").a(b)
s.h("aA.V").a(c)
throw A.b(A.P("Cannot modify unmodifiable map"))},
B(a,b){throw A.b(A.P("Cannot modify unmodifiable map"))}}
A.cR.prototype={
i(a,b){return J.m(this.a,b)},
k(a,b,c){var s=A.B(this)
J.bm(this.a,s.c.a(b),s.y[1].a(c))},
L(a,b){return J.nw(this.a,b)},
q(a,b){J.nx(this.a,A.B(this).h("~(1,2)").a(b))},
gD(a){return J.ir(this.a)},
gS(a){return J.ny(this.a)},
gj(a){return J.a8(this.a)},
gG(a){return J.qP(this.a)},
B(a,b){return J.qW(this.a,b)},
l(a){return J.L(this.a)},
gaz(a){return J.qO(this.a)},
$it:1}
A.c0.prototype={}
A.as.prototype={
gD(a){return this.gj(this)===0},
gS(a){return this.gj(this)!==0},
T(a,b){var s
for(s=J.b_(A.B(this).h("f<as.E>").a(b));s.p();)this.m(0,s.gt(s))},
bx(a){var s
for(s=0;s<5;++s)this.B(0,a[s])},
ap(a,b,c){var s=A.B(this)
return new A.bu(this,s.J(c).h("1(as.E)").a(b),s.h("@<as.E>").J(c).h("bu<1,2>"))},
l(a){return A.nE(this,"{","}")},
Z(a,b){var s,r,q,p,o=this.gE(this)
if(!o.p())return""
s=o.d
r=J.L(s==null?o.$ti.c.a(s):s)
if(!o.p())return r
s=o.$ti.c
if(b.length===0){q=r
do{p=o.d
q+=A.h(p==null?s.a(p):p)}while(o.p())
s=q}else{q=r
do{p=o.d
q=q+b+A.h(p==null?s.a(p):p)}while(o.p())
s=q}return s.charCodeAt(0)==0?s:s},
v(a,b){var s,r,q
A.dZ(b,"index")
s=this.gE(this)
for(r=b;s.p();){if(r===0){q=s.d
return q==null?s.$ti.c.a(q):q}--r}throw A.b(A.a6(b,b-r,this,null,"index"))},
$in:1,
$if:1,
$ib2:1}
A.ep.prototype={}
A.d9.prototype={}
A.hr.prototype={
i(a,b){var s,r=this.b
if(r==null)return this.c.i(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.eU(b):s}},
gj(a){return this.b==null?this.c.a:this.aW().length},
gD(a){return this.gj(0)===0},
gS(a){return this.gj(0)>0},
gG(a){var s
if(this.b==null){s=this.c
return new A.ch(s,A.B(s).h("ch<1>"))}return new A.hs(this)},
k(a,b,c){var s,r,q=this
if(q.b==null)q.c.k(0,b,c)
else if(q.L(0,b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.d7().k(0,b,c)},
L(a,b){if(this.b==null)return this.c.L(0,b)
return Object.prototype.hasOwnProperty.call(this.a,b)},
B(a,b){if(this.b!=null&&!this.L(0,b))return null
return this.d7().B(0,b)},
q(a,b){var s,r,q,p,o=this
t.u.a(b)
if(o.b==null)return o.c.q(0,b)
s=o.aW()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.mY(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.b(A.a5(o))}},
aW(){var s=t.lH.a(this.c)
if(s==null)s=this.c=A.C(Object.keys(this.a),t.s)
return s},
d7(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.ap(t.N,t.z)
r=n.aW()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.k(0,o,n.i(0,o))}if(p===0)B.b.m(r,"")
else B.b.a0(r)
n.a=n.b=null
return n.c=s},
eU(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.mY(this.a[a])
return this.b[a]=s}}
A.hs.prototype={
gj(a){return this.a.gj(0)},
v(a,b){var s=this.a
if(s.b==null)s=s.gG(0).v(0,b)
else{s=s.aW()
if(!(b>=0&&b<s.length))return A.e(s,b)
s=s[b]}return s},
gE(a){var s=this.a
if(s.b==null){s=s.gG(0)
s=s.gE(s)}else{s=s.aW()
s=new J.b8(s,s.length,A.G(s).h("b8<1>"))}return s},
A(a,b){return this.a.L(0,b)}}
A.mR.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:34}
A.mQ.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:34}
A.dl.prototype={
du(a3,a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a1="Invalid base64 encoding length ",a2=a4.length
a6=A.cV(a5,a6,a2)
s=$.on()
for(r=s.length,q=a5,p=q,o=null,n=-1,m=-1,l=0;q<a6;q=k){k=q+1
if(!(q<a2))return A.e(a4,q)
j=a4.charCodeAt(q)
if(j===37){i=k+2
if(i<=a6){if(!(k<a2))return A.e(a4,k)
h=A.na(a4.charCodeAt(k))
g=k+1
if(!(g<a2))return A.e(a4,g)
f=A.na(a4.charCodeAt(g))
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
c=A.a7(j)
g.a+=c
p=k
continue}}throw A.b(A.a2("Invalid base64 data",a4,q))}if(o!=null){a2=B.a.n(a4,p,a6)
a2=o.a+=a2
r=a2.length
if(n>=0)A.ou(a4,m,a6,n,l,r)
else{b=B.c.au(r-1,4)+1
if(b===1)throw A.b(A.a2(a1,a4,a6))
while(b<4){a2+="="
o.a=a2;++b}}a2=o.a
return B.a.aC(a4,a5,a6,a2.charCodeAt(0)==0?a2:a2)}a=a6-a5
if(n>=0)A.ou(a4,m,a6,n,l,a)
else{b=B.c.au(a,4)
if(b===1)throw A.b(A.a2(a1,a4,a6))
if(b>1)a4=B.a.aC(a4,a6,a6,b===2?"==":"=")}return a4},
dt(a,b){return this.du(0,b,0,null)}}
A.eV.prototype={}
A.kq.prototype={
b3(a){var s,r,q,p=A.cV(0,null,a.length)
if(0===p)return new Uint8Array(0)
s=new A.md()
r=s.fw(0,a,0,p)
r.toString
q=s.a
if(q<-1)A.bL(A.a2("Missing padding character",a,p))
if(q>0)A.bL(A.a2("Invalid length, must be multiple of four",a,p))
s.a=-1
return r}}
A.md.prototype={
fw(a,b,c,d){var s,r=this,q=r.a
if(q<0){r.a=A.pc(b,c,d,q)
return null}if(c===d)return new Uint8Array(0)
s=A.rN(b,c,d,q)
r.a=A.rP(b,c,d,s,0,r.a)
return s}}
A.c9.prototype={}
A.f0.prototype={}
A.f9.prototype={}
A.dF.prototype={
l(a){var s=A.bv(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.fl.prototype={
l(a){return"Cyclic error in JSON stringify"}}
A.fk.prototype={
M(a,b){var s=A.u8(b,this.gfA().a)
return s},
V(a){var s=A.rX(a,this.gfB().b,null)
return s},
gfB(){return B.af},
gfA(){return B.ae}}
A.lC.prototype={}
A.lB.prototype={}
A.mA.prototype={
dP(a){var s,r,q,p,o,n,m=a.length
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
bK(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.b(new A.fl(a,null))}B.b.m(s,a)},
bD(a){var s,r,q,p,o=this
if(o.dO(a))return
o.bK(a)
try{s=o.b.$1(a)
if(!o.dO(s)){q=A.oL(a,null,o.gcT())
throw A.b(q)}q=o.a
if(0>=q.length)return A.e(q,-1)
q.pop()}catch(p){r=A.al(p)
q=A.oL(a,r,o.gcT())
throw A.b(q)}},
dO(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.e.l(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.dP(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.bK(a)
q.ha(a)
s=q.a
if(0>=s.length)return A.e(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.bK(a)
r=q.hb(a)
s=q.a
if(0>=s.length)return A.e(s,-1)
s.pop()
return r}else return!1},
ha(a){var s,r,q=this.c
q.a+="["
s=J.z(a)
if(s.gS(a)){this.bD(s.i(a,0))
for(r=1;r<s.gj(a);++r){q.a+=","
this.bD(s.i(a,r))}}q.a+="]"},
hb(a){var s,r,q,p,o,n=this,m={},l=J.z(a)
if(l.gD(a)){n.c.a+="{}"
return!0}s=l.gj(a)*2
r=A.dL(s,null,!1,t.X)
q=m.a=0
m.b=!0
l.q(a,new A.mB(m,r))
if(!m.b)return!1
l=n.c
l.a+="{"
for(p='"';q<s;q+=2,p=',"'){l.a+=p
n.dP(A.w(r[q]))
l.a+='":'
o=q+1
if(!(o<s))return A.e(r,o)
n.bD(r[o])}l.a+="}"
return!0}}
A.mB.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.b.k(s,r.a++,a)
B.b.k(s,r.a++,b)},
$S:35}
A.mz.prototype={
gcT(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.h1.prototype={
M(a,b){t.L.a(b)
return B.aC.b3(b)}}
A.m7.prototype={
b3(a){return new A.mP(this.a).eJ(t.L.a(a),0,null,!0)}}
A.mP.prototype={
eJ(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(a)
s=A.cV(b,c,J.a8(a))
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.tt(a,b,s)
s-=b
p=b
b=0}if(s-b>=15){o=l.a
n=A.ts(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.bO(q,b,s,!0)
o=l.b
if((o&1)!==0){m=A.tu(o)
l.b=0
throw A.b(A.a2(m,a,p+l.c))}return n},
bO(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.c.a3(b+c,2)
r=q.bO(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.bO(a,s,c,d)}return q.fz(a,b,c,d)},
fz(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.at(""),d=b+1,c=a.length
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
e.a+=p}else{p=A.p2(a,d,n)
e.a+=p}if(n===a0)break A
d=o}else d=o}if(a1&&g>32)if(r){c=A.a7(h)
e.a+=c}else{k.b=77
k.c=a0
return""}k.b=g
k.c=f
c=e.a
return c.charCodeAt(0)==0?c:c}}
A.lJ.prototype={
$2(a,b){var s,r,q
t.bR.a(a)
s=this.b
r=this.a
q=(s.a+=r.a)+a.a
s.a=q
s.a=q+": "
q=A.bv(b)
s.a+=q
r.a=", "},
$S:44}
A.lk.prototype={
$0(){var s=this
return A.bL(A.b7("("+s.a+", "+s.b+", "+s.c+", "+s.d+", "+s.e+", "+s.f+", "+s.r+", "+s.w+")",null))},
$S:62}
A.a9.prototype={
a_(a,b){if(b==null)return!1
return b instanceof A.a9&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gH(a){return A.nK(this.a,this.b,B.q,B.q)},
a5(a,b){var s
t.cs.a(b)
s=B.c.a5(this.a,b.a)
if(s!==0)return s
return B.c.a5(this.b,b.b)},
b9(){var s=this
if(s.c)return new A.a9(s.a,s.b,!1)
return s},
a1(){var s=this
if(s.c)return s
return new A.a9(s.a,s.b,!0)},
l(a){var s=this,r=A.oC(A.bA(s)),q=A.bt(A.cl(s)),p=A.bt(A.dV(s)),o=A.bt(A.bW(s)),n=A.bt(A.cT(s)),m=A.bt(A.oW(s)),l=A.ll(A.oV(s)),k=s.b,j=k===0?"":A.ll(k)
k=r+"-"+q
if(s.c)return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j},
a8(){var s=this,r=A.bA(s)>=-9999&&A.bA(s)<=9999?A.oC(A.bA(s)):A.rb(A.bA(s)),q=A.bt(A.cl(s)),p=A.bt(A.dV(s)),o=A.bt(A.bW(s)),n=A.bt(A.cT(s)),m=A.bt(A.oW(s)),l=A.ll(A.oV(s)),k=s.b,j=k===0?"":A.ll(k)
k=r+"-"+q
if(s.c)return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j}}
A.lm.prototype={
$1(a){if(a==null)return 0
return A.eK(a)},
$S:28}
A.ln.prototype={
$1(a){var s,r,q
if(a==null)return 0
for(s=a.length,r=0,q=0;q<6;++q){r*=10
if(q<s){if(!(q<s))return A.e(a,q)
r+=a.charCodeAt(q)^48}}return r},
$S:28}
A.b0.prototype={
aF(a,b){return new A.b0(B.c.aD(this.a*b))},
bb(a,b){return B.c.bb(this.a,t.jS.a(b).ghe())},
a_(a,b){if(b==null)return!1
return b instanceof A.b0&&this.a===b.a},
gH(a){return B.c.gH(this.a)},
l(a){var s,r,q,p,o,n=this.a,m=B.c.a3(n,36e8),l=n%36e8
if(n<0){m=0-m
n=0-l
s="-"}else{n=l
s=""}r=B.c.a3(n,6e7)
n%=6e7
q=r<10?"0":""
p=B.c.a3(n,1e6)
o=p<10?"0":""
return s+m+":"+q+r+":"+o+p+"."+B.a.a2(B.c.l(n%1e6),6,"0")}}
A.a_.prototype={
gaR(){return A.rx(this)}}
A.eP.prototype={
l(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.bv(s)
return"Assertion failed"}}
A.bB.prototype={}
A.b6.prototype={
gbQ(){return"Invalid argument"+(!this.a?"(s)":"")},
gbP(){return""},
l(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.h(p),n=s.gbQ()+q+o
if(!s.a)return n
return n+s.gbP()+": "+A.bv(s.gcf())},
gcf(){return this.b}}
A.cU.prototype={
gcf(){return A.o4(this.b)},
gbQ(){return"RangeError"},
gbP(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.h(q):""
else if(q==null)s=": Not greater than or equal to "+A.h(r)
else if(q>r)s=": Not in inclusive range "+A.h(r)+".."+A.h(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.h(r)
return s}}
A.fd.prototype={
gcf(){return A.K(this.b)},
gbQ(){return"RangeError"},
gbP(){if(A.K(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gj(a){return this.f}}
A.fz.prototype={
l(a){var s,r,q,p,o,n,m,l,k=this,j={},i=new A.at("")
j.a=""
s=k.c
for(r=s.length,q=0,p="",o="";q<r;++q,o=", "){n=s[q]
i.a=p+o
p=A.bv(n)
p=i.a+=p
j.a=", "}k.d.q(0,new A.lJ(j,i))
m=A.bv(k.a)
l=i.l(0)
return"NoSuchMethodError: method not found: '"+k.b.a+"'\nReceiver: "+m+"\nArguments: ["+l+"]"}}
A.e4.prototype={
l(a){return"Unsupported operation: "+this.a}}
A.fX.prototype={
l(a){var s=this.a
return s!=null?"UnimplementedError: "+s:"UnimplementedError"}}
A.bp.prototype={
l(a){return"Bad state: "+this.a}}
A.f_.prototype={
l(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.bv(s)+"."}}
A.fC.prototype={
l(a){return"Out of Memory"},
gaR(){return null},
$ia_:1}
A.e_.prototype={
l(a){return"Stack Overflow"},
gaR(){return null},
$ia_:1}
A.mi.prototype={
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
ap(a,b,c){var s=A.B(this)
return A.rq(this,s.J(c).h("1(f.E)").a(b),s.h("f.E"),c)},
bC(a,b){var s=A.B(this)
return new A.I(this,s.h("H(f.E)").a(b),s.h("I<f.E>"))},
A(a,b){var s
for(s=this.gE(this);s.p();)if(J.l(s.gt(s),b))return!0
return!1},
ab(a,b){var s
A.B(this).h("H(f.E)").a(b)
for(s=this.gE(this);s.p();)if(b.$1(s.gt(s)))return!0
return!1},
aE(a,b){var s=A.a4(this,A.B(this).h("f.E"))
return s},
ar(a){return this.aE(0,!0)},
gj(a){var s,r=this.gE(this)
for(s=0;r.p();)++s
return s},
gD(a){return!this.gE(this).p()},
gS(a){return!this.gD(this)},
gaG(a){var s,r=this.gE(this)
if(!r.p())throw A.b(A.dB())
s=r.gt(r)
if(r.p())throw A.b(A.ri())
return s},
v(a,b){var s,r
A.dZ(b,"index")
s=this.gE(this)
for(r=b;s.p();){if(r===0)return s.gt(s);--r}throw A.b(A.a6(b,b-r,this,null,"index"))},
l(a){return A.rj(this,"(",")")}}
A.am.prototype={
l(a){return"MapEntry("+A.h(this.a)+": "+A.h(this.b)+")"}}
A.ab.prototype={
gH(a){return A.F.prototype.gH.call(this,0)},
l(a){return"null"}}
A.F.prototype={$iF:1,
a_(a,b){return this===b},
gH(a){return A.dW(this)},
l(a){return"Instance of '"+A.dX(this)+"'"},
ds(a,b){throw A.b(A.oT(this,t.bg.a(b)))},
gW(a){return A.uz(this)},
toString(){return this.l(this)}}
A.hT.prototype={
l(a){return""},
$ibf:1}
A.at.prototype={
gj(a){return this.a.length},
l(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$irD:1}
A.m6.prototype={
$2(a,b){var s,r,q,p
t.k.a(a)
A.w(b)
s=B.a.dk(b,"=")
if(s===-1){if(b!=="")J.bm(a,A.o2(b,0,b.length,this.a,!0),"")}else if(s!==0){r=B.a.n(b,0,s)
q=B.a.Y(b,s+1)
p=this.a
J.bm(a,A.o2(r,0,r.length,p,!0),A.o2(q,0,q.length,p,!0))}return a},
$S:64}
A.m5.prototype={
$2(a,b){throw A.b(A.a2("Illegal IPv6 address, "+a,this.a,b))},
$S:65}
A.eB.prototype={
gd_(){var s,r,q,p,o=this,n=o.w
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
gH(a){var s,r=this,q=r.y
if(q===$){s=B.a.gH(r.gd_())
r.y!==$&&A.qc()
r.y=s
q=s}return q},
gaB(){var s,r=this,q=r.z
if(q===$){s=r.f
s=A.pa(s==null?"":s)
r.z!==$&&A.qc()
q=r.z=new A.c0(s,t.ph)}return q},
gcp(){return this.b},
gbs(a){var s=this.c
if(s==null)return""
if(B.a.O(s,"[")&&!B.a.R(s,"v",1))return B.a.n(s,1,s.length-1)
return s},
gb6(a){var s=this.d
return s==null?A.pu(this.a):s},
gaL(a){var s=this.f
return s==null?"":s},
gbq(){var s=this.r
return s==null?"":s},
fM(a){var s=this.a
if(a.length!==s.length)return!1
return A.tD(a,s,0)>=0},
dB(a,b){var s,r,q,p,o,n,m,l=this
b=A.o0(b,0,b.length)
s=b==="file"
r=l.b
q=l.d
if(b!==l.a)q=A.o_(q,b)
p=l.c
if(!(p!=null))p=r.length!==0||q!=null||s?"":null
o=l.e
if(!s)n=p!=null&&o.length!==0
else n=!0
if(n&&!B.a.O(o,"/"))o="/"+o
m=o
return A.i3(b,r,p,q,m,l.f,l.r)},
cR(a,b){var s,r,q,p,o,n,m,l,k
for(s=0,r=0;B.a.R(b,"../",r);){r+=3;++s}q=B.a.fO(a,"/")
p=a.length
for(;;){if(!(q>0&&s>0))break
o=B.a.dq(a,"/",q-1)
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
q=o}return B.a.aC(a,q+1,null,B.a.Y(b,r-3*s))},
dD(a){return this.b8(A.cn(a))},
b8(a){var s,r,q,p,o,n,m,l,k,j,i,h=this
if(a.gaQ().length!==0)return a
else{s=h.a
if(a.gca()){r=a.dB(0,s)
return r}else{q=h.b
p=h.c
o=h.d
n=h.e
if(a.gdj())m=a.gbr()?a.gaL(a):h.f
else{l=A.tr(h,n)
if(l>0){k=B.a.n(n,0,l)
n=a.gc9()?k+A.db(a.gaf(a)):k+A.db(h.cR(B.a.Y(n,k.length),a.gaf(a)))}else if(a.gc9())n=A.db(a.gaf(a))
else if(n.length===0)if(p==null)n=s.length===0?a.gaf(a):A.db(a.gaf(a))
else n=A.db("/"+a.gaf(a))
else{j=h.cR(n,a.gaf(a))
r=s.length===0
if(!r||p!=null||B.a.O(n,"/"))n=A.db(j)
else n=A.pz(j,!r||p!=null)}m=a.gbr()?a.gaL(a):null}}}i=a.gcc()?a.gbq():null
return A.i3(s,q,p,o,n,m,i)},
gca(){return this.c!=null},
gbr(){return this.f!=null},
gcc(){return this.r!=null},
gdj(){return this.e.length===0},
gc9(){return B.a.O(this.e,"/")},
gcj(a){var s,r,q=this,p=q.a
if(p==="")throw A.b(A.N("Cannot use origin without a scheme: "+q.l(0)))
if(p!=="http"&&p!=="https")throw A.b(A.N("Origin is only applicable schemes http and https: "+q.l(0)))
s=q.c
if(s==null||s==="")throw A.b(A.N("A "+p+u.p+q.l(0)))
r=q.d
if(r==null)return p+"://"+s
return p+"://"+s+":"+A.h(r)},
l(a){return this.gd_()},
a_(a,b){var s,r,q,p=this
if(b==null)return!1
if(p===b)return!0
s=!1
if(t.jJ.b(b))if(p.a===b.gaQ())if(p.c!=null===b.gca())if(p.b===b.gcp())if(p.gbs(0)===b.gbs(b))if(p.gb6(0)===b.gb6(b))if(p.e===b.gaf(b)){r=p.f
q=r==null
if(!q===b.gbr()){if(q)r=""
if(r===b.gaL(b)){r=p.r
q=r==null
if(!q===b.gcc()){s=q?"":r
s=s===b.gbq()}}}}return s},
$ifZ:1,
gaQ(){return this.a},
gaf(a){return this.e}}
A.m4.prototype={
gdM(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.e(m,0)
s=o.a
m=m[0]+1
r=B.a.bt(s,"?",m)
q=s.length
if(r>=0){p=A.eC(s,r+1,q,256,!1,!1)
q=r}else p=n
m=o.c=new A.hd("data","",n,n,A.eC(s,m,q,128,!1,!1),p,n)}return m},
l(a){var s,r=this.b
if(0>=r.length)return A.e(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.b3.prototype={
gca(){return this.c>0},
gcd(){return this.c>0&&this.d+1<this.e},
gbr(){return this.f<this.r},
gcc(){return this.r<this.a.length},
gc9(){return B.a.R(this.a,"/",this.e)},
gdj(){return this.e===this.f},
gaQ(){var s=this.w
return s==null?this.w=this.eG():s},
eG(){var s,r=this,q=r.b
if(q<=0)return""
s=q===4
if(s&&B.a.O(r.a,"http"))return"http"
if(q===5&&B.a.O(r.a,"https"))return"https"
if(s&&B.a.O(r.a,"file"))return"file"
if(q===7&&B.a.O(r.a,"package"))return"package"
return B.a.n(r.a,0,q)},
gcp(){var s=this.c,r=this.b+3
return s>r?B.a.n(this.a,r,s-1):""},
gbs(a){var s=this.c
return s>0?B.a.n(this.a,s,this.d):""},
gb6(a){var s,r=this
if(r.gcd())return A.eK(B.a.n(r.a,r.d+1,r.e))
s=r.b
if(s===4&&B.a.O(r.a,"http"))return 80
if(s===5&&B.a.O(r.a,"https"))return 443
return 0},
gaf(a){return B.a.n(this.a,this.e,this.f)},
gaL(a){var s=this.f,r=this.r
return s<r?B.a.n(this.a,s+1,r):""},
gbq(){var s=this.r,r=this.a
return s<r.length?B.a.Y(r,s+1):""},
gcj(a){var s,r,q=this,p=q.b,o=p===4&&B.a.O(q.a,"http")
if(p<0)throw A.b(A.N("Cannot use origin without a scheme: "+q.l(0)))
if(!o)s=!(p===5&&B.a.O(q.a,"https"))
else s=!1
if(s)throw A.b(A.N("Origin is only applicable to schemes http and https: "+q.l(0)))
s=q.c
if(s===q.d)throw A.b(A.N("A "+q.gaQ()+u.p+q.l(0)))
p+=3
if(s===p)return B.a.n(q.a,0,q.e)
r=q.a
return B.a.n(r,0,p)+B.a.n(r,s,q.e)},
gaB(){if(this.f>=this.r)return B.ak
return new A.c0(A.pa(this.gaL(0)),t.ph)},
cP(a){var s=this.d+1
return s+a.length===this.e&&B.a.R(this.a,a,s)},
h0(){var s=this,r=s.r,q=s.a
if(r>=q.length)return s
return new A.b3(B.a.n(q,0,r),s.b,s.c,s.d,s.e,s.f,r,s.w)},
dB(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=null
b=A.o0(b,0,b.length)
s=!(h.b===b.length&&B.a.O(h.a,b))
r=b==="file"
q=h.c
p=q>0?B.a.n(h.a,h.b+3,q):""
o=h.gcd()?h.gb6(0):g
if(s)o=A.o_(o,b)
q=h.c
if(q>0)n=B.a.n(h.a,q,h.d)
else n=p.length!==0||o!=null||r?"":g
q=h.a
m=h.f
l=B.a.n(q,h.e,m)
if(!r)k=n!=null&&l.length!==0
else k=!0
if(k&&!B.a.O(l,"/"))l="/"+l
k=h.r
j=m<k?B.a.n(q,m+1,k):g
m=h.r
i=m<q.length?B.a.Y(q,m+1):g
return A.i3(b,p,n,o,l,j,i)},
dD(a){return this.b8(A.cn(a))},
b8(a){if(a instanceof A.b3)return this.f9(this,a)
return this.d2().b8(a)},
f9(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=b.b
if(c>0)return b
s=b.c
if(s>0){r=a.b
if(r<=0)return b
q=r===4
if(q&&B.a.O(a.a,"file"))p=b.e!==b.f
else if(q&&B.a.O(a.a,"http"))p=!b.cP("80")
else p=!(r===5&&B.a.O(a.a,"https"))||!b.cP("443")
if(p){o=r+1
return new A.b3(B.a.n(a.a,0,o)+B.a.Y(b.a,c+1),r,s+o,b.d+o,b.e+o,b.f+o,b.r+o,a.w)}else return this.d2().b8(b)}n=b.e
c=b.f
if(n===c){s=b.r
if(c<s){r=a.f
o=r-c
return new A.b3(B.a.n(a.a,0,r)+B.a.Y(b.a,c),a.b,a.c,a.d,a.e,c+o,s+o,a.w)}c=b.a
if(s<c.length){r=a.r
return new A.b3(B.a.n(a.a,0,r)+B.a.Y(c,s),a.b,a.c,a.d,a.e,a.f,s+(r-s),a.w)}return a.h0()}s=b.a
if(B.a.R(s,"/",n)){m=a.e
l=A.pm(this)
k=l>0?l:m
o=k-n
return new A.b3(B.a.n(a.a,0,k)+B.a.Y(s,n),a.b,a.c,a.d,m,c+o,b.r+o,a.w)}j=a.e
i=a.f
if(j===i&&a.c>0){while(B.a.R(s,"../",n))n+=3
o=j-n+1
return new A.b3(B.a.n(a.a,0,j)+"/"+B.a.Y(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)}h=a.a
l=A.pm(this)
if(l>=0)g=l
else for(g=j;B.a.R(h,"../",g);)g+=3
f=0
for(;;){e=n+3
if(!(e<=c&&B.a.R(s,"../",n)))break;++f
n=e}for(r=h.length,d="";i>g;){--i
if(!(i>=0&&i<r))return A.e(h,i)
if(h.charCodeAt(i)===47){if(f===0){d="/"
break}--f
d="/"}}if(i===g&&a.b<=0&&!B.a.R(h,"/",j)){n-=f*3
d=""}o=i-n+d.length
return new A.b3(B.a.n(h,0,i)+d+B.a.Y(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)},
gH(a){var s=this.x
return s==null?this.x=B.a.gH(this.a):s},
a_(a,b){if(b==null)return!1
if(this===b)return!0
return t.jJ.b(b)&&this.a===b.l(0)},
d2(){var s=this,r=null,q=s.gaQ(),p=s.gcp(),o=s.c>0?s.gbs(0):r,n=s.gcd()?s.gb6(0):r,m=s.a,l=s.f,k=B.a.n(m,s.e,l),j=s.r
l=l<j?s.gaL(0):r
return A.i3(q,p,o,n,k,l,j<m.length?s.gbq():r)},
l(a){return this.a},
$ifZ:1}
A.hd.prototype={}
A.q.prototype={$iq:1}
A.eN.prototype={
gj(a){return a.length}}
A.cF.prototype={
sfH(a,b){a.href=b},
l(a){var s=String(a)
s.toString
return s},
$icF:1}
A.eO.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.cG.prototype={$icG:1}
A.bN.prototype={$ibN:1}
A.c8.prototype={$ic8:1}
A.bO.prototype={$ibO:1}
A.bn.prototype={
gj(a){return a.length}}
A.f2.prototype={
gj(a){return a.length}}
A.Y.prototype={$iY:1}
A.ca.prototype={
bJ(a,b){var s=$.qf(),r=s[b]
if(typeof r=="string")return r
r=this.fc(a,b)
s[b]=r
return r},
fc(a,b){var s,r=b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()})
r.toString
r=r in a
r.toString
if(r)return b
s=$.qi()+b
r=s in a
r.toString
if(r)return s
return b},
c0(a,b,c,d){a.setProperty(b,c,d)},
gj(a){var s=a.length
s.toString
return s}}
A.ku.prototype={}
A.aC.prototype={}
A.b9.prototype={}
A.f3.prototype={
gj(a){return a.length}}
A.f4.prototype={
gj(a){return a.length}}
A.f5.prototype={
gj(a){return a.length},
i(a,b){var s=a[A.K(b)]
s.toString
return s}}
A.dp.prototype={}
A.cb.prototype={}
A.f6.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.dq.prototype={
fv(a,b){var s=a.createHTMLDocument(b)
s.toString
return s}}
A.dr.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.mx.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
A.ds.prototype={
l(a){var s,r=a.left
r.toString
s=a.top
s.toString
return"Rectangle ("+A.h(r)+", "+A.h(s)+") "+A.h(this.gaO(a))+" x "+A.h(this.gaK(a))},
a_(a,b){var s,r,q
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
if(r===q){s=J.J(b)
s=this.gaO(a)===s.gaO(b)&&this.gaK(a)===s.gaK(b)}}}return s},
gH(a){var s,r=a.left
r.toString
s=a.top
s.toString
return A.nK(r,s,this.gaO(a),this.gaK(a))},
gcO(a){return a.height},
gaK(a){var s=this.gcO(a)
s.toString
return s},
gd8(a){return a.width},
gaO(a){var s=this.gd8(a)
s.toString
return s},
$ibd:1}
A.f7.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){A.w(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
A.f8.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.h7.prototype={
A(a,b){return J.nv(this.b,b)},
gD(a){return this.a.firstElementChild==null},
gj(a){return this.b.length},
i(a,b){var s
A.K(b)
s=this.b
if(!(b>=0&&b<s.length))return A.e(s,b)
return t.h.a(s[b])},
k(a,b,c){var s
t.h.a(c)
s=this.b
if(!(b>=0&&b<s.length))return A.e(s,b)
this.a.replaceChild(c,s[b]).toString},
gE(a){var s=this.ar(this)
return new J.b8(s,s.length,A.G(s).h("b8<1>"))},
a0(a){J.ip(this.a)},
gC(a){return A.rR(this.a)}}
A.bi.prototype={
gj(a){return this.a.length},
i(a,b){var s
A.K(b)
s=this.a
if(!(b>=0&&b<s.length))return A.e(s,b)
return this.$ti.c.a(s[b])},
k(a,b,c){this.$ti.c.a(c)
throw A.b(A.P("Cannot modify list"))},
gC(a){return this.$ti.c.a(B.am.gC(this.a))}}
A.D.prototype={
gfn(a){return new A.ed(a)},
gdf(a){var s=a.children
s.toString
return new A.h7(a,s)},
gan(a){return new A.hi(a)},
l(a){var s=a.localName
s.toString
return s},
a6(a,b,c,d){var s,r,q,p
if(c==null){s=$.oE
if(s==null){s=A.C([],t.lN)
r=new A.dS(s)
B.b.m(s,A.pg(null))
B.b.m(s,A.pp())
$.oE=r
d=r}else d=s
s=$.oD
if(s==null){d.toString
s=new A.eD(d)
$.oD=s
c=s}else{d.toString
s.a=d
c=s}}if($.bQ==null){s=document
r=s.implementation
r.toString
r=B.a2.fv(r,"")
$.bQ=r
r=r.createRange()
r.toString
$.nB=r
r=$.bQ.createElement("base")
t.az.a(r)
s=s.baseURI
s.toString
r.href=s
$.bQ.head.appendChild(r).toString}s=$.bQ
if(s.body==null){r=s.createElement("body")
B.E.sfp(s,t.hp.a(r))}s=$.bQ
if(t.hp.b(a)){s=s.body
s.toString
q=s}else{s.toString
r=a.tagName
r.toString
q=s.createElement(r)
$.bQ.body.appendChild(q).toString}s="createContextualFragment" in window.Range.prototype
s.toString
if(s){s=a.tagName
s.toString
s=!B.b.A(B.ah,s)}else s=!1
if(s){$.nB.selectNodeContents(q)
s=$.nB
s=s.createContextualFragment(b)
s.toString
p=s}else{J.qZ(q,b)
s=$.bQ.createDocumentFragment()
s.toString
while(r=q.firstChild,r!=null)s.appendChild(r).toString
p=s}if(q!==$.bQ.body)J.is(q)
c.cu(p)
document.adoptNode(p).toString
return p},
fu(a,b,c){return this.a6(a,b,c,null)},
sP(a,b){this.bF(a,b)},
bF(a,b){this.sU(a,null)
a.appendChild(this.a6(a,b,null,null)).toString},
sh6(a,b){a.title=b},
seO(a,b){a.innerHTML=b},
eV(a,b){var s=a.querySelectorAll(b)
s.toString
return s},
gaA(a){return new A.cp(a,"click",!1,t.C)},
$iD:1}
A.lp.prototype={
$1(a){return t.h.b(t.F.a(a))},
$S:31}
A.p.prototype={
eM(a,b,c,d){return a.initEvent(b,!0,!0)},
$ip:1}
A.du.prototype={$idu:1}
A.d.prototype={
bm(a,b,c,d){t.B.a(c)
if(c!=null)this.ew(a,b,c,d)},
c2(a,b,c){return this.bm(a,b,c,null)},
ew(a,b,c,d){return a.addEventListener(b,A.bI(t.B.a(c),1),d)},
eX(a,b,c,d){return a.removeEventListener(b,A.bI(t.B.a(c),1),!1)},
$id:1}
A.aI.prototype={$iaI:1}
A.dw.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.et.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
A.dx.prototype={
gh4(a){var s=a.result
if(t.lo.b(s))return A.oS(s,0,null)
return s},
fY(a,b){return a.readAsDataURL(b)}}
A.fa.prototype={
gj(a){return a.length}}
A.cK.prototype={
gj(a){return a.length},
$icK:1}
A.aJ.prototype={$iaJ:1}
A.dy.prototype={}
A.fc.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.bR.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.F.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1,
$ibR:1}
A.dz.prototype={
sfp(a,b){a.body=b}}
A.bw.prototype={
fV(a,b,c){return a.open(b,c)},
e5(a,b){return a.send(b)},
cw(a,b,c){return a.setRequestHeader(A.w(b),A.w(c))},
$ibw:1}
A.ce.prototype={}
A.cL.prototype={$icL:1}
A.dA.prototype={
sfi(a,b){a.alt=b},
scC(a,b){a.src=b}}
A.bS.prototype={
sde(a,b){a.checked=b},
sco(a,b){a.type=b},
sI(a,b){a.value=b},
$ibS:1,
$ioz:1,
$icJ:1}
A.cQ.prototype={
l(a){var s=String(a)
s.toString
return s},
$icQ:1}
A.fn.prototype={
gj(a){return a.length}}
A.fo.prototype={
bm(a,b,c,d){t.B.a(c)
if(b==="message")a.start()
this.ea(a,b,c,!1)}}
A.fp.prototype={
L(a,b){return A.b5(a.get(b))!=null},
i(a,b){return A.b5(a.get(A.w(b)))},
q(a,b){var s,r,q
t.u.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.b5(r.value[1]))}},
gG(a){var s=A.C([],t.s)
this.q(a,new A.lH(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gD(a){var s=a.size
s.toString
return s===0},
gS(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.P("Not supported"))},
B(a,b){throw A.b(A.P("Not supported"))},
$it:1}
A.lH.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.fq.prototype={
L(a,b){return A.b5(a.get(b))!=null},
i(a,b){return A.b5(a.get(A.w(b)))},
q(a,b){var s,r,q
t.u.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.b5(r.value[1]))}},
gG(a){var s=A.C([],t.s)
this.q(a,new A.lI(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gD(a){var s=a.size
s.toString
return s===0},
gS(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.P("Not supported"))},
B(a,b){throw A.b(A.P("Not supported"))},
$it:1}
A.lI.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.aK.prototype={$iaK:1}
A.fr.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.ib.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
A.aw.prototype={$iaw:1}
A.az.prototype={
gC(a){var s=this.a.firstChild
if(s==null)throw A.b(A.N("No elements"))
return s},
gaG(a){var s=this.a,r=s.childNodes.length
if(r===0)throw A.b(A.N("No elements"))
if(r>1)throw A.b(A.N("More than one element"))
s=s.firstChild
s.toString
return s},
T(a,b){var s,r,q,p,o
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
gE(a){var s=this.a.childNodes
return new A.cc(s,s.length,A.au(s).h("cc<x.E>"))},
gj(a){return this.a.childNodes.length},
i(a,b){var s
A.K(b)
s=this.a.childNodes
if(!(b>=0&&b<s.length))return A.e(s,b)
return s[b]}}
A.u.prototype={
dw(a){var s=a.parentNode
if(s!=null)s.removeChild(a).toString},
dC(a,b){var s,r,q
try{r=a.parentNode
r.toString
s=r
J.qI(s,b,a)}catch(q){}return a},
eC(a){var s
while(s=a.firstChild,s!=null)a.removeChild(s).toString},
l(a){var s=a.nodeValue
return s==null?this.eb(a):s},
sU(a,b){a.textContent=b},
fm(a,b){var s=a.appendChild(b)
s.toString
return s},
fs(a,b){var s=a.cloneNode(!0)
s.toString
return s},
A(a,b){var s=a.contains(b)
s.toString
return s},
f_(a,b,c){var s=a.replaceChild(b,c)
s.toString
return s},
$iu:1}
A.cS.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.F.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
A.bz.prototype={$ibz:1}
A.dU.prototype={}
A.aL.prototype={
gj(a){return a.length},
$iaL:1}
A.fE.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.d8.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
A.b1.prototype={$ib1:1}
A.fG.prototype={
L(a,b){return A.b5(a.get(b))!=null},
i(a,b){return A.b5(a.get(A.w(b)))},
q(a,b){var s,r,q
t.u.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.b5(r.value[1]))}},
gG(a){var s=A.C([],t.s)
this.q(a,new A.lR(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gD(a){var s=a.size
s.toString
return s===0},
gS(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.P("Not supported"))},
B(a,b){throw A.b(A.P("Not supported"))},
$it:1}
A.lR.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.bX.prototype={
gj(a){return a.length},
sI(a,b){a.value=b},
$ibX:1}
A.aN.prototype={$iaN:1}
A.fI.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.ls.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
A.aO.prototype={$iaO:1}
A.fJ.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.cA.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
A.aP.prototype={
gj(a){return a.length},
$iaP:1}
A.e0.prototype={
L(a,b){return a.getItem(b)!=null},
i(a,b){return a.getItem(A.w(b))},
k(a,b,c){a.setItem(b,c)},
B(a,b){var s=a.getItem(b)
a.removeItem(b)
return s},
q(a,b){var s,r,q
t.bm.a(b)
for(s=0;;++s){r=a.key(s)
if(r==null)return
q=a.getItem(r)
q.toString
b.$2(r,q)}},
gG(a){var s=A.C([],t.s)
this.q(a,new A.lT(s))
return s},
gj(a){var s=a.length
s.toString
return s},
gD(a){return a.key(0)==null},
gS(a){return a.key(0)!=null},
$it:1}
A.lT.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:7}
A.ax.prototype={$iax:1}
A.e2.prototype={
a6(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bH(a,b,c,d)
s=A.re("<table>"+b+"</table>",c,d)
r=document.createDocumentFragment()
r.toString
new A.az(r).T(0,new A.az(s))
return r}}
A.fM.prototype={
a6(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bH(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.az(s).T(0,new A.az(new A.az(new A.az(B.N.a6(r,b,c,d)).gaG(0)).gaG(0)))
return s}}
A.fN.prototype={
a6(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bH(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.az(s).T(0,new A.az(new A.az(B.N.a6(r,b,c,d)).gaG(0)))
return s}}
A.cZ.prototype={
bF(a,b){var s,r
this.sU(a,null)
s=a.content
s.toString
J.ip(s)
r=this.a6(a,b,null,null)
a.content.appendChild(r).toString},
$icZ:1}
A.cm.prototype={
sI(a,b){a.value=b},
$icm:1}
A.aQ.prototype={$iaQ:1}
A.ay.prototype={$iay:1}
A.fP.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.gJ.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
A.fQ.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.dQ.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
A.fR.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.aR.prototype={$iaR:1}
A.fU.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.ki.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
A.fV.prototype={
gj(a){return a.length}}
A.bg.prototype={}
A.h0.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.h2.prototype={
gj(a){return a.length}}
A.c1.prototype={$ic1:1,$im8:1}
A.br.prototype={$ibr:1}
A.d1.prototype={$id1:1}
A.h9.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.d5.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
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
a_(a,b){var s,r,q
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
q=J.J(b)
if(r===q.gaO(b)){s=a.height
s.toString
q=s===q.gaK(b)
s=q}}}}return s},
gH(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return A.nK(p,s,r,q)},
gcO(a){return a.height},
gaK(a){var s=a.height
s.toString
return s},
gd8(a){return a.width},
gaO(a){var s=a.width
s.toString
return s}}
A.hn.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
return a[b]},
k(a,b,c){t.ef.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){if(a.length>0)return a[0]
throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
A.ek.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.F.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
A.hO.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.hH.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
A.hU.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s,r
A.K(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a6(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.lv.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iM:1,
$if:1,
$io:1}
A.h5.prototype={
q(a,b){var s,r,q,p,o,n
t.bm.a(b)
for(s=this.gG(0),r=s.length,q=this.a,p=0;p<s.length;s.length===r||(0,A.aB)(s),++p){o=s[p]
n=q.getAttribute(o)
b.$2(o,n==null?A.w(n):n)}},
gG(a){var s,r,q,p,o,n,m=this.a.attributes
m.toString
s=A.C([],t.s)
for(r=m.length,q=t.nD,p=0;p<r;++p){if(!(p<m.length))return A.e(m,p)
o=q.a(m[p])
if(o.namespaceURI==null){n=o.name
n.toString
B.b.m(s,n)}}return s},
gD(a){return this.gG(0).length===0},
gS(a){return this.gG(0).length!==0}}
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
gj(a){return this.gG(0).length}}
A.hc.prototype={
L(a,b){var s=this.a.a.hasAttribute("data-"+this.b1(b))
s.toString
return s},
i(a,b){return this.a.a.getAttribute("data-"+this.b1(A.w(b)))},
k(a,b,c){this.a.a.setAttribute("data-"+this.b1(b),c)},
B(a,b){var s="data-"+this.b1(b),r=this.a.a,q=r.getAttribute(s)
r.removeAttribute(s)
return q},
q(a,b){this.a.q(0,new A.me(this,t.bm.a(b)))},
gG(a){var s=A.C([],t.s)
this.a.q(0,new A.mf(this,s))
return s},
gj(a){return this.gG(0).length},
gD(a){return this.gG(0).length===0},
gS(a){return this.gG(0).length!==0},
d1(a){var s,r,q=A.C(a.split("-"),t.s)
for(s=1;s<q.length;++s){r=q[s]
if(r.length>0)B.b.k(q,s,r[0].toUpperCase()+B.a.Y(r,1))}return B.b.Z(q,"")},
b1(a){var s,r,q,p,o
for(s=a.length,r=0,q="";r<s;++r){p=a[r]
o=p.toLowerCase()
q=(p!==o&&r>0?q+"-":q)+o}return q.charCodeAt(0)==0?q:q}}
A.me.prototype={
$2(a,b){if(B.a.O(a,"data-"))this.b.$2(this.a.d1(B.a.Y(a,5)),b)},
$S:7}
A.mf.prototype={
$2(a,b){if(B.a.O(a,"data-"))B.b.m(this.b,this.a.d1(B.a.Y(a,5)))},
$S:7}
A.hi.prototype={
a7(){var s,r,q,p,o=A.ci(t.N)
for(s=this.a.className.split(" "),r=s.length,q=0;q<r;++q){p=B.a.u(s[q])
if(p.length!==0)o.m(0,p)}return o},
cq(a){this.a.className=t.i.a(a).Z(0," ")},
gj(a){var s=this.a.classList.length
s.toString
return s},
gD(a){var s=this.a.classList.length
s.toString
return s===0},
gS(a){var s=this.a.classList.length
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
bx(a){A.rT(this.a,a)}}
A.nC.prototype={}
A.cq.prototype={
bv(a,b,c,d){var s=A.B(this)
s.h("~(1)?").a(a)
t.jE.a(c)
return A.A(this.a,this.b,a,!1,s.c)}}
A.cp.prototype={}
A.ee.prototype={
a4(a){var s=this
if(s.b==null)return $.nt()
s.d5()
s.d=s.b=null
return $.nt()},
cg(a){var s,r=this
r.$ti.h("~(1)?").a(a)
if(r.b==null)throw A.b(A.N("Subscription has been canceled."))
r.d5()
s=A.pZ(new A.mh(a),t.A)
r.d=s
r.d3()},
d3(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.qJ(s,this.c,r,!1)}},
d5(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.qH(s,this.c,t.B.a(r),!1)}},
$ibq:1}
A.mg.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:3}
A.mh.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:3}
A.nT.prototype={}
A.cs.prototype={
el(a){var s
if($.ho.a===0){for(s=0;s<262;++s)$.ho.k(0,B.ai[s],A.uB())
for(s=0;s<12;++s)$.ho.k(0,B.w[s],A.uC())}},
aJ(a){return $.qy().A(0,A.dt(a))},
am(a,b,c){var s=$.ho.i(0,A.dt(a)+"::"+b)
if(s==null)s=$.ho.i(0,"*::"+b)
if(s==null)return!1
return A.mU(s.$4(a,b,c,this))},
$ibc:1}
A.x.prototype={
gE(a){return new A.cc(a,this.gj(a),A.au(a).h("cc<x.E>"))}}
A.dS.prototype={
aJ(a){return B.b.ab(this.a,new A.lL(a))},
am(a,b,c){return B.b.ab(this.a,new A.lK(a,b,c))},
$ibc:1}
A.lL.prototype={
$1(a){return t.hU.a(a).aJ(this.a)},
$S:24}
A.lK.prototype={
$1(a){return t.hU.a(a).am(this.a,this.b,this.c)},
$S:24}
A.eq.prototype={
en(a,b,c,d){var s,r,q
this.a.T(0,c)
s=b.bC(0,new A.mH())
r=b.bC(0,new A.mI())
this.b.T(0,s)
q=this.c
q.T(0,B.ag)
q.T(0,r)},
aJ(a){return this.a.A(0,A.dt(a))},
am(a,b,c){var s,r=this,q=A.dt(a),p=r.c,o=q+"::"+b
if(p.A(0,o))return r.d.fh(c)
else{s="*::"+b
if(p.A(0,s))return r.d.fh(c)
else{p=r.b
if(p.A(0,o))return!0
else if(p.A(0,s))return!0
else if(p.A(0,q+"::*"))return!0
else if(p.A(0,"*::*"))return!0}}return!1},
$ibc:1}
A.mH.prototype={
$1(a){return!B.b.A(B.w,A.w(a))},
$S:9}
A.mI.prototype={
$1(a){return B.b.A(B.w,A.w(a))},
$S:9}
A.hW.prototype={
am(a,b,c){if(this.ej(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.A(0,b)
return!1}}
A.mJ.prototype={
$1(a){return"TEMPLATE::"+A.w(a)},
$S:10}
A.hV.prototype={
aJ(a){var s
if(t.nZ.b(a))return!1
s=t.bC.b(a)
if(s&&A.dt(a)==="foreignObject")return!1
if(s)return!0
return!1},
am(a,b,c){if(b==="is"||B.a.O(b,"on"))return!1
return this.aJ(a)},
$ibc:1}
A.cc.prototype={
p(){var s=this,r=s.c+1,q=s.b
if(r<q){s.d=J.m(s.a,r)
s.c=r
return!0}s.d=null
s.c=q
return!1},
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
$iaa:1}
A.hb.prototype={$ii:1,$id:1,$im8:1}
A.hL.prototype={$irF:1}
A.eD.prototype={
cu(a){var s,r=new A.mT(this)
do{s=this.b
r.$2(a,null)}while(s!==this.b)},
aZ(a,b){++this.b
if(b==null||b!==a.parentNode)J.is(a)
else b.removeChild(a).toString},
f4(a,b){var s,r,q,p,o,n,m,l=!0,k=null,j=null
try{k=J.qN(a)
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
q=A.dt(a)
this.f3(a,b,l,r,q,t.f.a(k),A.an(j))}catch(n){if(A.al(n) instanceof A.b6)throw n
else{this.aZ(a,b)
window.toString
p=A.h(r)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn("Removing corrupted element "+p)}}},
f3(a,b,c,d,e,f,g){var s,r,q,p,o,n,m,l=this
if(c){l.aZ(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing element due to corrupted attributes on <"+d+">")
return}if(!l.a.aJ(a)){l.aZ(a,b)
window.toString
s=A.h(b)
r=typeof console!="undefined"
r.toString
if(r)window.console.warn("Removing disallowed element <"+e+"> from "+s)
return}if(g!=null)if(!l.a.am(a,"is",g)){l.aZ(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing disallowed type extension <"+e+' is="'+g+'">')
return}s=f.gG(0)
q=A.C(s.slice(0),A.G(s))
for(p=f.gG(0).length-1,s=f.a,r="Removing disallowed attribute <"+e+" ";p>=0;--p){if(!(p<q.length))return A.e(q,p)
o=q[p]
n=l.a
m=J.r1(o)
A.w(o)
if(!n.am(a,m,A.w(s.getAttribute(o)))){window.toString
n=s.getAttribute(o)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn(r+o+'="'+A.h(n)+'">')
s.removeAttribute(o)}}if(t.fD.b(a)){s=a.content
s.toString
l.cu(s)}},
e4(a,b){var s=a.nodeType
s.toString
switch(s){case 1:this.f4(a,b)
break
case 8:case 11:case 3:case 4:break
default:this.aZ(a,b)}},
$irs:1}
A.mT.prototype={
$2(a,b){var s,r,q,p,o,n=this.a
n.e4(a,b)
s=a.lastChild
while(s!=null){r=null
try{r=s.previousSibling
if(r!=null&&r.nextSibling!==s){q=A.N("Corrupt HTML")
throw A.b(q)}}catch(p){q=s;++n.b
o=q.parentNode
if(a!==o){if(o!=null)o.removeChild(q).toString}else a.removeChild(q).toString
s=null
r=a.lastChild}if(s!=null)this.$2(s,a)
s=r}},
$S:63}
A.ha.prototype={}
A.he.prototype={}
A.hf.prototype={}
A.hg.prototype={}
A.hh.prototype={}
A.hk.prototype={}
A.hl.prototype={}
A.hp.prototype={}
A.hq.prototype={}
A.hx.prototype={}
A.hy.prototype={}
A.hz.prototype={}
A.hA.prototype={}
A.hB.prototype={}
A.hC.prototype={}
A.hG.prototype={}
A.hH.prototype={}
A.hJ.prototype={}
A.er.prototype={}
A.es.prototype={}
A.hM.prototype={}
A.hN.prototype={}
A.hP.prototype={}
A.hX.prototype={}
A.hY.prototype={}
A.ev.prototype={}
A.ew.prototype={}
A.hZ.prototype={}
A.i_.prototype={}
A.i4.prototype={}
A.i5.prototype={}
A.i6.prototype={}
A.i7.prototype={}
A.i8.prototype={}
A.i9.prototype={}
A.ia.prototype={}
A.ib.prototype={}
A.ic.prototype={}
A.id.prototype={}
A.f1.prototype={
c1(a){var s=$.qe()
if(s.b.test(a))return a
throw A.b(A.ko(a,"value","Not a valid class token"))},
l(a){return this.a7().Z(0," ")},
gE(a){var s=this.a7()
return A.rY(s,s.r,A.B(s).c)},
ap(a,b,c){var s,r
c.h("0(c)").a(b)
s=this.a7()
r=A.B(s)
return new A.bu(s,r.J(c).h("1(as.E)").a(b),r.h("@<as.E>").J(c).h("bu<1,2>"))},
gD(a){return this.a7().a===0},
gS(a){return this.a7().a!==0},
gj(a){return this.a7().a},
A(a,b){this.c1(b)
return this.a7().A(0,b)},
m(a,b){var s
A.w(b)
this.c1(b)
s=this.dr(0,new A.ks(b))
return A.mU(s==null?!1:s)},
B(a,b){var s,r
if(typeof b!="string")return!1
this.c1(b)
s=this.a7()
r=s.B(0,b)
this.cq(s)
return r},
bx(a){this.dr(0,new A.kt(a))},
v(a,b){return this.a7().v(0,b)},
dr(a,b){var s,r
t.gA.a(b)
s=this.a7()
r=b.$1(s)
this.cq(s)
return r}}
A.ks.prototype={
$1(a){return t.i.a(a).m(0,this.a)},
$S:55}
A.kt.prototype={
$1(a){return t.i.a(a).bx(this.a)},
$S:53}
A.fb.prototype={
gbg(){var s=this.b,r=A.B(s)
return new A.aE(new A.I(s,r.h("H(k.E)").a(new A.lq()),r.h("I<k.E>")),r.h("D(k.E)").a(new A.lr()),r.h("aE<k.E,D>"))},
k(a,b,c){var s
t.h.a(c)
s=this.gbg()
J.qX(s.b.$1(J.eL(s.a,b)),c)},
A(a,b){return!1},
a0(a){J.ip(this.b.a)},
gj(a){return J.a8(this.gbg().a)},
i(a,b){var s
A.K(b)
s=this.gbg()
return s.b.$1(J.eL(s.a,b))},
gE(a){var s=A.aU(this.gbg(),!1,t.h)
return new J.b8(s,s.length,A.G(s).h("b8<1>"))}}
A.lq.prototype={
$1(a){return t.h.b(t.F.a(a))},
$S:31}
A.lr.prototype={
$1(a){return t.h.a(t.F.a(a))},
$S:47}
A.cP.prototype={$icP:1}
A.lA.prototype={
$1(a){var s,r,q,p,o=this.a
if(o.L(0,a))return o.i(0,a)
if(t.f.b(a)){s={}
o.k(0,a,s)
for(o=J.J(a),r=J.b_(o.gG(a));r.p();){q=r.gt(r)
s[q]=this.$1(o.i(a,q))}return s}else if(t.R.b(a)){p=[]
o.k(0,a,p)
B.b.T(p,J.cE(a,this,t.z))
return p}else return A.mZ(a)},
$S:50}
A.hK.prototype={
dK(a){if(a instanceof A.bo)return a.f2()
return null}}
A.n_.prototype={
$1(a){var s
t.Z.a(a)
s=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(A.tA,a,!1)
A.o6(s,$.io(),a)
return s},
$S:12}
A.n0.prototype={
$1(a){return new this.a(a)},
$S:12}
A.n5.prototype={
$1(a){var s=a==null?A.aY(a):a
$.ns()
return new A.dE(s)},
$S:45}
A.n6.prototype={
$1(a){var s=a==null?A.aY(a):a
$.ns()
return new A.cg(s,t.gq)},
$S:43}
A.n7.prototype={
$1(a){var s=a==null?A.aY(a):a
$.ns()
return new A.bo(s)},
$S:42}
A.bo.prototype={
i(a,b){if(typeof b!="string"&&typeof b!="number")throw A.b(A.b7("property is not a String or num",null))
return A.o5(this.a[b])},
k(a,b,c){if(typeof b!="string"&&typeof b!="number")throw A.b(A.b7("property is not a String or num",null))
this.a[b]=A.mZ(c)},
a_(a,b){if(b==null)return!1
return b instanceof A.bo&&this.a===b.a},
b5(a){return a in this.a},
c5(a,b){var s,r=this.a
if(b==null)s=null
else{s=A.G(b)
s=A.aU(new A.a0(b,s.h("@(1)").a(A.uK()),s.h("a0<1,@>")),!0,t.z)}return A.o5(r[a].apply(r,s))},
l(a){var s,r
try{s=String(this.a)
return s}catch(r){s=this.eh(0)
return s}},
f2(){var s=this.bZ(),r=s!=null&&s.length>0?" ("+s+")":""
return"Instance of '"+A.dX(this)+"'"+r},
bZ(){return A.ok(this.a,!1,!1)},
gH(a){return 0}}
A.dE.prototype={
bZ(){return A.ok(this.a,!1,!0)}}
A.cg.prototype={
cH(a){var s=a<0||a>=this.gj(0)
if(s)throw A.b(A.aj(a,0,this.gj(0),null,null))},
i(a,b){if(A.eG(b))this.cH(b)
return this.$ti.c.a(this.ed(0,b))},
k(a,b,c){if(A.eG(b))this.cH(b)
this.ei(0,b,c)},
gj(a){var s=this.a.length
if(typeof s==="number"&&s>>>0===s)return s
throw A.b(A.N("Bad JsArray length"))},
bZ(){return A.ok(this.a,!0,!1)},
$in:1,
$if:1,
$io:1}
A.d5.prototype={
k(a,b,c){return this.ee(0,b,c)}}
A.lM.prototype={
l(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.nf.prototype={
$1(a){var s,r,q,p,o
if(A.pQ(a))return a
s=this.a
if(s.L(0,a))return s.i(0,a)
if(t.f.b(a)){r={}
s.k(0,a,r)
for(s=J.J(a),q=J.b_(s.gG(a));q.p();){p=q.gt(q)
r[p]=this.$1(s.i(a,p))}return r}else if(t.R.b(a)){o=[]
s.k(0,a,o)
B.b.T(o,J.cE(a,this,t.z))
return o}else return a},
$S:26}
A.nm.prototype={
$1(a){return this.a.b2(0,this.b.h("0/?").a(a))},
$S:15}
A.nn.prototype={
$1(a){if(a==null)return this.a.bo(new A.lM(a===undefined))
return this.a.bo(a)},
$S:15}
A.mx.prototype={
em(){var s=self.crypto
if(s!=null)if(s.getRandomValues!=null)return
throw A.b(A.P("No source of cryptographically secure random numbers available."))},
fT(a){var s,r,q,p,o,n,m,l
if(a<=0||a>4294967296)throw A.b(A.rA("max must be in range 0 < max \u2264 2^32, was "+a))
if(a>255)if(a>65535)s=a>16777215?4:3
else s=2
else s=1
r=this.a
r.$flags&2&&A.aG(r,11)
r.setUint32(0,0,!1)
q=4-s
p=A.K(Math.pow(256,s))
for(o=a-1,n=(a&o)===0;;){crypto.getRandomValues(J.qL(B.al.gfq(r),q,s))
m=r.getUint32(0,!1)
if(n)return(m&o)>>>0
l=m%a
if(m-l+a<p)return l}}}
A.aS.prototype={$iaS:1}
A.fm.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s
A.K(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a6(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){t.kT.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s=a.length
s.toString
if(s>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){return this.i(a,b)},
$in:1,
$if:1,
$io:1}
A.aW.prototype={$iaW:1}
A.fA.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s
A.K(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a6(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){t.ai.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s=a.length
s.toString
if(s>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){return this.i(a,b)},
$in:1,
$if:1,
$io:1}
A.fF.prototype={
gj(a){return a.length}}
A.cX.prototype={$icX:1}
A.fL.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s
A.K(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a6(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){A.w(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s=a.length
s.toString
if(s>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){return this.i(a,b)},
$in:1,
$if:1,
$io:1}
A.eR.prototype={
a7(){var s,r,q,p,o=this.a.getAttribute("class"),n=A.ci(t.N)
if(o==null)return n
for(s=o.split(" "),r=s.length,q=0;q<r;++q){p=B.a.u(s[q])
if(p.length!==0)n.m(0,p)}return n},
cq(a){this.a.setAttribute("class",a.Z(0," "))}}
A.r.prototype={
gan(a){return new A.eR(a)},
gdf(a){return new A.fb(a,new A.az(a))},
sP(a,b){this.bF(a,b)},
a6(a,b,c,d){var s,r,q,p=A.C([],t.lN)
B.b.m(p,A.pg(null))
B.b.m(p,A.pp())
B.b.m(p,new A.hV())
c=new A.eD(new A.dS(p))
p=document
s=p.body
s.toString
r=B.z.fu(s,'<svg version="1.1">'+b+"</svg>",c)
p=p.createDocumentFragment()
p.toString
q=new A.az(r).gaG(0)
while(s=q.firstChild,s!=null)p.appendChild(s).toString
return p},
gaA(a){return new A.cp(a,"click",!1,t.C)},
$ir:1}
A.aX.prototype={$iaX:1}
A.fW.prototype={
gj(a){var s=a.length
s.toString
return s},
i(a,b){var s
A.K(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a6(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){t.hk.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s=a.length
s.toString
if(s>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){return this.i(a,b)},
$in:1,
$if:1,
$io:1}
A.ht.prototype={}
A.hu.prototype={}
A.hD.prototype={}
A.hE.prototype={}
A.hR.prototype={}
A.hS.prototype={}
A.i0.prototype={}
A.i1.prototype={}
A.eS.prototype={
gj(a){return a.length}}
A.eT.prototype={
L(a,b){return A.b5(a.get(b))!=null},
i(a,b){return A.b5(a.get(A.w(b)))},
q(a,b){var s,r,q
t.u.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.b5(r.value[1]))}},
gG(a){var s=A.C([],t.s)
this.q(a,new A.kp(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gD(a){var s=a.size
s.toString
return s===0},
gS(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.P("Not supported"))},
B(a,b){throw A.b(A.P("Not supported"))},
$it:1}
A.kp.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.eU.prototype={
gj(a){return a.length}}
A.bM.prototype={}
A.fB.prototype={
gj(a){return a.length}}
A.h6.prototype={}
A.ng.prototype={
$1(a){t.A.a(a)
new A.it().ad()},
$S:18}
A.it.prototype={
ad(){var s=0,r=A.U(t.H),q=this,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
var $async$ad=A.V(function(a1,a2){if(a1===1)return A.R(a2,r)
for(;;)switch(s){case 0:b=document
a=b.getElementById("view-login")
a.toString
q.ch=a
a=b.getElementById("view-dashboard")
a.toString
q.CW=a
a=b.getElementById("view-directory")
a.toString
q.cx=a
a=b.getElementById("view-assets")
a.toString
q.cy=a
a=b.getElementById("view-profile")
a.toString
q.db=a
a=b.getElementById("view-billing")
a.toString
q.dx=a
a=b.getElementById("view-resident-home")
a.toString
q.dy=a
a=b.getElementById("view-resident-ledger")
a.toString
q.fr=a
a=b.getElementById("view-resident-support")
a.toString
q.fx=a
a=b.getElementById("app-bottom-nav")
a.toString
q.fy=a
a=b.getElementById("resident-bottom-nav")
a.toString
q.go=a
q.id=b.getElementById("btn-floating-role-switch")
b.getElementById("floating-role-switch-text")
a=q.CW
o=q.cx
n=b.getElementById("view-worker-resident-details")
n.toString
m=q.cy
l=q.db
k=q.dx
j=b.getElementById("view-announcements")
j.toString
i=b.getElementById("view-resident-profile")
i.toString
h=t.N
q.k2=t.dW.a(A.a3(["view-dashboard",a,"view-directory",o,"view-worker-resident-details",n,"view-assets",m,"view-profile",l,"view-billing",k,"view-announcements",j,"view-resident-profile",i,"view-resident-home",q.dy,"view-resident-ledger",q.fr,"view-resident-support",q.fx],h,t.h))
i=t.d.a(window.location).href
i.toString
g=A.cn(i).gaB().i(0,"role")
f=b.getElementById("web-portal-title")
a=g==="resident"
if(a){if(f!=null)J.v(f,"Resident Portal")
e=t.G.a(b.getElementById("employee-id"))
if(e!=null)e.placeholder="Resident ID, meter ID, contact or unique name"}else{if(f!=null)J.v(f,"Worker Portal")
e=t.G.a(b.getElementById("employee-id"))
if(e!=null)e.placeholder="Enter employee ID"}o=new A.jA()
o.$0()
A.nQ(A.lo(0,0,10),new A.ju(o))
o=b.getElementById("btn-resident-profile-logout")
if(o!=null){o=J.ah(o)
n=o.$ti
A.A(o.a,o.b,n.h("~(1)?").a(new A.jv()),!1,n.c)}o=$.O()
o.sfU(new A.jw(q))
n=o.cx
new A.d2(n,A.B(n).h("d2<1>")).fP(new A.jx(q))
s=2
return A.y(o.ad(),$async$ad)
case 2:q.d6(o.X())
A.nQ(B.a7,new A.jy(q))
A.A(b,A.w(A.oG(b)),t.oV.a(new A.jz(q)),!1,t.A)
p=A.dg()?window.localStorage.getItem("waterhall_session"):null
d=A.dg()?window.localStorage.getItem("waterhall_resident_session"):null
if(a)if(d!=null&&d.length!==0){q.cB(d)
q.aw()
q.bi("resident")}else q.b4()
else if(p!=null&&p.length!==0)try{a=A.aq(t.f.a(B.d.M(0,p)),h,t.z)
q.a=a
q.cz(a)
q.aw()
q.bi("worker")}catch(a0){a=window.localStorage
a.toString
B.j.B(a,"waterhall_session")
q.b4()}else q.b4()
q.fo()
if($.O().y==="Session expired. Please sign in again.")q.aj("Session expired. Please sign in again.",b.getElementById("login-error-msg"))
return A.S(null,r)}})
return A.T($async$ad,r)},
aX(){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i
var $async$aX=A.V(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:i=!0
if(!m.ay){j=document
j.toString
j=j.visibilityState||j.mozVisibilityState||j.msVisibilityState||j.webkitVisibilityState
j.toString
if(j==="visible")i=m.a==null&&m.d==null}if(i){s=1
break}m.ay=!0
l=window.localStorage.getItem("waterhall_jwt")
i=$.O()
k=i.at
p=3
s=6
return A.y(i.aM(m.d!=null?"resident":"worker"),$async$aX)
case 6:if(!J.l(l,window.localStorage.getItem("waterhall_jwt"))||!i.N()||J.l(k,i.at)){n=[1]
s=4
break}if(m.d!=null)m.cm()
else{i=m.b
if(i==="view-dashboard")m.bz()
else if(i==="view-directory")m.aN()}if(m.b==="view-announcements")m.dz()
n.push(5)
s=4
break
case 3:n=[2]
case 4:p=2
m.ay=!1
s=n.pop()
break
case 5:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$aX,r)},
d6(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d="btn-review-collections"
t.P.a(a)
s=document
r=s.getElementById("worker-sync-status-pill")
q=s.getElementById("worker-sync-status-text")
p=s.getElementById("db-offline-overlay")
o=s.getElementById("offline-banner-text")
n=J.z(a)
m=n.i(a,"status")
l=A.w(m==null?"online":m)
k=A.o3(n.i(a,"pendingCount"))
if(k==null)k=0
m=A.pE(n.i(a,"isOnline"))
m=m===!1
j=J.l(n.i(a,"authenticated"),!0)
i=A.o3(n.i(a,"reviewCount"))
if(i==null)i=0
h=r==null
if(!h&&q!=null){g=J.J(r)
g.gan(r).bx(["online","offline","pending_sync","syncing","synced"])
g.gan(r).m(0,l)
if(!j)J.v(q,"Sign in required")
else if(m)J.v(q,"Offline Mode")
else if(J.l(n.i(a,"isSyncing"),!0))J.v(q,"Syncing...")
else if(k>0){if(i>0)n=""+k+" Pending ("+i+" need review)"
else{g=""+k
n=n.i(a,"error")!=null?g+" Pending: retry needed":g+" Pending Sync"}J.v(q,n)}else J.v(q,"Connected")}if(p!=null)if(j&&m){n=p.style
n.display="flex"
if(o!=null){n=J.J(o)
if(k>0)n.sU(o,"Offline Mode Active: "+k+" collection(s) saved on this device waiting to sync.")
else n.sU(o,"Offline Mode Active: Local SQLite database enabled. Field operations available.")}}else{n=p.style
n.display="none"}f=s.getElementById(d)
if(f==null)n=(h?null:r.parentElement)!=null
else n=!1
if(n){e=s.createElement("button")
e.id=d
B.n.sU(e,"Review pending operations")
s=t.C
A.A(e,"click",s.h("~(1)?").a(new A.j4(this)),!1,s.c)
r.parentElement.appendChild(e).toString
f=e}if(f!=null){s=f.style
s.toString
n=j&&i>0?"inline-block":"none"
s.display=n}},
cX(){var s,r,q,p,o,n,m,l,k,j,i,h,g="collection-review-modal",f="house_id",e="sync_error",d=$.O()
if(!d.N())return
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
B.l.c0(r,B.l.bJ(r,"overflow-y"),"auto","")
r=s.createElement("h2")
r.toString
B.aa.sU(r,"Pending operation review")
p.appendChild(r).toString
r=s.createElement("p")
r.toString
B.k.sU(r,"These records remain saved. Review rejected readings or payments with Admin, then retry. Record IDs are preserved.")
p.appendChild(r).toString
for(d=d.aP(),r=A.G(d),o=r.h("H(1)").a(new A.j0()),d=B.b.gE(d),r=new A.bh(d,o,r.h("bh<1>"));r.p();){o=d.gt(0)
n=s.createElement("p")
n.toString
m=J.z(o)
B.k.sU(n,A.h(m.i(o,f))+" | "+A.h(m.i(o,"amount_collected"))+" | "+A.h(m.i(o,"transaction_id"))+"\n"+A.h(m.i(o,e)))
p.appendChild(n).toString}for(d=$.O().ah(),r=A.G(d),o=r.h("H(1)").a(new A.j1()),d=B.b.gE(d),r=new A.bh(d,o,r.h("bh<1>")),o=t.f;r.p();){n=d.gt(0)
m=J.z(n)
l=o.a(m.i(n,"body"))
k=B.aj.i(0,m.i(n,"endpoint"))
if(k==null)k="Saved operation"
j=s.createElement("p")
j.toString
i=J.z(l)
h=i.i(l,f)
i=h==null?i.i(l,"household_id"):h
B.k.sU(j,k+" | "+A.h(i==null?"":i)+" | "+A.h(m.i(n,"operation_id"))+"\n"+A.h(m.i(n,e)))
p.appendChild(j).toString}d=s.createElement("button")
d.toString
B.n.sU(d,"Retry pending operations")
r=t.C
o=r.h("~(1)?")
r=r.c
A.A(d,"click",o.a(new A.j2(this,d)),!1,r)
p.appendChild(d).toString
d=s.createElement("button")
d.toString
B.n.sU(d,"Close")
A.A(d,"click",o.a(new A.j3(q)),!1,r)
p.appendChild(d).toString
q.appendChild(p).toString
s.body.appendChild(q).toString},
fo(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=this,a9="click",b0="change"
a8.eN()
a8.ez()
s=document
r=t.o
q=r.a(s.getElementById("btn-login"))
p=t.G
o=p.a(s.getElementById("employee-id"))
n=p.a(s.getElementById("login-password"))
m=t.Y
l=m.a(s.getElementById("zone-assignment"))
k=s.getElementById("login-error-msg")
j=s.getElementById("btn-toggle-web-pw")
if(j!=null){i=J.ah(j)
h=i.$ti
A.A(i.a,i.b,h.h("~(1)?").a(new A.j7(j)),!1,h.c)}if(q!=null){i=t.C
A.A(q,a9,i.h("~(1)?").a(new A.j8(a8,o,n,l,k,q)),!1,i.c)}g=r.a(s.getElementById("btn-logout"))
if(g!=null){i=t.C
A.A(g,a9,i.h("~(1)?").a(new A.j9(a8)),!1,i.c)}f=r.a(s.getElementById("btn-resident-logout"))
if(f!=null){i=t.C
A.A(f,a9,i.h("~(1)?").a(new A.jf(a8)),!1,i.c)}i=t.h
A.eJ(i,i,"T","querySelectorAll")
i=s.querySelectorAll(".nav-tab")
i.toString
e=new A.bi(i,t.U)
e.q(e,new A.jg(a8))
d=p.a(s.getElementById("dir-search"))
c=m.a(s.getElementById("filter-purok"))
b=m.a(s.getElementById("filter-status"))
if(d!=null){p=t.E
A.A(d,"input",p.h("~(1)?").a(new A.jh(a8)),!1,p.c)}if(c!=null){p=t.E
A.A(c,b0,p.h("~(1)?").a(new A.ji(a8)),!1,p.c)}if(b!=null){p=t.E
A.A(b,b0,p.h("~(1)?").a(new A.jj(a8)),!1,p.c)}a=s.getElementById("btn-close-modal")
if(a!=null){p=J.ah(a)
m=p.$ti
A.A(p.a,p.b,m.h("~(1)?").a(new A.jk(a8)),!1,m.c)}a0=s.getElementById("house-detail-modal")
if(a0!=null){p=J.ah(a0)
m=p.$ti
A.A(p.a,p.b,m.h("~(1)?").a(new A.jl(a0)),!1,m.c)}a1=t.aa.a(s.getElementById("modal-leak-toggle"))
if(a1!=null){p=t.E
A.A(a1,b0,p.h("~(1)?").a(new A.jm(a8,a1)),!1,p.c)}a2=r.a(s.getElementById("btn-submit-log"))
if(a2!=null){p=t.C
A.A(a2,a9,p.h("~(1)?").a(new A.ja(a8)),!1,p.c)}a3=r.a(s.getElementById("btn-broadcast-announcement"))
if(a3!=null){r=t.C
A.A(a3,a9,r.h("~(1)?").a(new A.jb(a8,a3)),!1,r.c)}a4=s.getElementById("btn-web-forgot-password")
a5=s.getElementById("web-modal-forgot-pw")
a6=s.getElementById("btn-web-recover-cancel")
a7=s.getElementById("btn-web-recover-submit")
if(a4!=null){s=J.ah(a4)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.jc(a5)),!1,r.c)}if(a6!=null){s=J.ah(a6)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.jd(a5)),!1,r.c)}if(a7!=null){s=J.ah(a7)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.je(a5)),!1,r.c)}},
aj(a,b){var s
if(b!=null){J.v(b,a)
s=b.style
s.display="block"}},
aw(){},
bi(a){var s="WaterHallPush",r=$.dj()
if(r.b5(s))r.i(0,s).c5("registerSubscription",A.C([a],t.s))},
b4(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b="none",a=document,a0=a.getElementById("announcement-history")
if(a0!=null)J.eM(a0).a0(0)
for(a0=["resident-profile-name","resident-profile-account","resident-profile-avatar"],s=0;s<3;++s){r=a.getElementById(a0[s])
if(r!=null)J.v(r,"--")}a0=c.k2
a0===$&&A.av()
new A.aT(a0,A.B(a0).h("aT<2>")).q(0,new A.jn())
a0=c.ch
a0===$&&A.av()
J.c7(a0).m(0,"active")
a0=c.ch.style
a0.display="flex"
c.b="view-login"
a0=c.fy
a0===$&&A.av()
a0=a0.style
a0.display=b
a0=c.go
a0===$&&A.av()
a0=a0.style
a0.display=b
a0=c.id
a0===$&&A.av()
if(a0!=null){a0=a0.style
a0.display=b}a0=t.G
q=a0.a(a.getElementById("employee-id"))
p=a0.a(a.getElementById("login-password"))
o=a.getElementById("login-error-msg")
if(q!=null)B.f.sI(q,"")
if(p!=null)B.f.sI(p,"")
if(o!=null){r=o.style
r.display=b}r=t.q
n=r.a(a.getElementById("resident-log-desc"))
if(n!=null)B.m.sI(n,"")
m=a.getElementById("resident-photo-name")
if(m!=null)J.v(m,"No file chosen")
l=a.getElementById("resident-photo-preview")
if(l!=null){k=l.style
k.display=b
k=l.style
k.backgroundImage=""
J.eM(l).a0(0)}j=a0.a(a.getElementById("dir-search"))
if(j!=null)B.f.sI(j,"")
i=a0.a(a.getElementById("bill-meter-search"))
if(i!=null)B.f.sI(i,"")
h=a0.a(a.getElementById("bill-curr-input"))
if(h!=null)B.f.sI(h,"")
g=r.a(a.getElementById("worker-announcement-input"))
if(g!=null)B.m.sI(g,"")
f=a.getElementById("resident-logout-name")
e=a.getElementById("resident-logout-role")
d=a.getElementById("resident-logout-avatar")
if(f!=null)J.v(f,"---")
if(e!=null)J.v(e,"---")
if(d!=null)J.v(d,"--")},
cz(a){var s,r,q,p,o,n,m,l=this
t.P.a(a)
s=t.d.a(window.location).href
s.toString
if(A.cn(s).gaB().i(0,"role")==="resident"){A.c5("[SECURITY] Resident application is forbidden from loading Worker Portal.")
return}s=l.ch
s===$&&A.av()
J.c7(s).B(0,"active")
s=l.ch.style
s.display="none"
s=l.k2
s===$&&A.av()
new A.aT(s,A.B(s).h("aT<2>")).q(0,new A.kb())
l.d=null
s=window.localStorage
s.toString
B.j.B(s,"waterhall_resident_session")
s=l.fy
s===$&&A.av()
s.setAttribute("style","display: flex !important")
s=l.go
s===$&&A.av()
s.setAttribute("style","display: none !important")
s=l.id
s===$&&A.av()
if(s!=null){s=s.style
s.display="none"}l.a=a
s=window.localStorage
s.toString
s.setItem("waterhall_session",B.d.V(a))
s=t.J
r=A.a4(new A.I(A.C(J.L(a.i(0,"name")).split(" "),t.s),t.Q.a(new A.kc()),s),s.h("f.E"))
s=A.G(r)
q=new A.a0(r,s.h("c(1)").a(new A.kd()),s.h("a0<1,c>")).Z(0,"")
s=q.length
s=B.a.n(q,0,s<2?s:2)
p=document
o=p.getElementById("worker-logout-name")
n=p.getElementById("worker-logout-role")
m=p.getElementById("worker-logout-avatar")
if(o!=null)J.v(o,A.an(a.i(0,"name")))
if(n!=null){p=a.i(0,"role")
J.v(n,A.an(p==null?"Field Worker":p))}if(m!=null)J.v(m,s.toUpperCase())
l.ag("view-dashboard")
l.bz()
l.aN()
l.cl()
l.fJ()},
ag(a){var s,r,q,p,o,n,m=this,l="view-resident-home",k="view-resident-ledger",j="view-resident-support",i="view-resident-profile"
if(m.a==null&&m.d==null&&a!=="view-login"){m.b4()
return}s=t.d.a(window.location).href
s.toString
r=A.cn(s).gaB().i(0,"role")
if(r==="worker")s=a===l||a===k||a===j||a===i
else s=!1
if(s){A.c5("[SECURITY] Worker application is forbidden from switching to Resident tab "+a+".")
return}if(r==="resident")s=a==="view-dashboard"||a==="view-billing"||a==="view-profile"||a==="view-directory"||a==="view-assets"||a==="view-worker-resident-details"
else s=!1
if(s){A.c5("[SECURITY] Resident application is forbidden from switching to Worker tab "+a+".")
return}m.b=a
s=document
s.toString
q=t.h
A.eJ(q,q,"T","querySelectorAll")
q=s.querySelectorAll(".nav-tab")
q.toString
p=new A.bi(q,t.U)
p.q(p,new A.kl(a))
q=m.k2
q===$&&A.av()
q.q(0,new A.km(a))
if(a==="view-dashboard")m.bz()
else if(a==="view-directory")m.aN()
else if(a==="view-announcements")m.dz()
else if(a===i)m.cm()
else if(a!=="view-assets")if(a==="view-profile")m.cl()
else if(a==="view-billing"){if(m.k3==null){o=$.O().a
q=o.length
if(q!==0){if(0>=q)return A.e(o,0)
m.k3=A.an(J.m(o[0],"house_id"))
n=t.G.a(s.getElementById("bill-meter-search"))
if(n!=null){if(0>=o.length)return A.e(o,0)
s=A.h(J.m(o[0],"owner_name"))
if(0>=o.length)return A.e(o,0)
B.f.sI(n,s+" ("+A.h(J.m(o[0],"account_number"))+")")}}}m.by(m.k3)}else if(a===l||a===k||a===j)m.cm()},
bz(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9=this,b0="worker",b1="var(--alert-green)",b2=".alert-widget-title",b3="var(--amber-safety)"
if(a9.a==null)return
s=document
r=s.getElementById("dash-worker-title")
if(r!=null)J.v(r,"Field Terminal: "+A.h(a9.a.i(0,"selected_zone")))
q=$.O()
p=q.ct(b0)
if(q.x)a9.cV(p,b0)
o=s.getElementById("worker-announcement-banner")
n=s.getElementById("worker-announcement-message")
m=s.getElementById("worker-announcement-tag")
if(o!=null&&n!=null)if(p!=null&&A.w(J.m(p,"message")).length!==0){l=J.z(p)
J.v(n,A.w(l.i(p,"message")))
if(m!=null){k=l.i(p,"target_audience")
if(k==null)k="Everyone"
j=l.i(p,"author")
J.v(m,A.h(j==null?"Admin":j)+" \u2022 "+A.h(k))}l=o.style
l.display="flex"}else{l=o.style
l.display="none"}i=q.a
h=q.b
g=q.c
f=s.getElementById("worker-tank-val")
e=s.getElementById("worker-safety-status")
a9.cW(b0,h,f,s.getElementById("worker-turb-val"),s.getElementById("worker-tds-val"),e)
q=A.G(i)
l=q.h("I<1>")
d=A.a4(new A.I(i,q.h("H(1)").a(new A.jM()),l),l.h("f.E"))
c=A.C([],t.hq)
if(J.l(h.i(0,"turbidity_status"),"warning")){q=t.N
B.b.m(c,A.a3(["type","quality","name","Central Turbidity Alert","desc",A.w(h.i(0,"turbidity_desc"))],q,q))
b=1}else b=0
a=d.length+b
a0=s.getElementById("dash-alert-count")
if(a0!=null)J.v(a0,B.c.l(a))
a1=s.getElementById("dashboard-alert-widget")
a2=s.getElementById("dash-alert-list")
if(a1!=null&&a2!=null){q=J.J(a2)
q.sP(a2,"")
if(a===0){l=a1.style
l.borderColor=b1
a3=t.dH.a(a1.querySelector(b2))
if(a3!=null){l=a3.style
l.color=b1}q.sP(a2,'          <div class="alert-item" style="border-left-color: var(--alert-green); background-color: rgba(16, 185, 129, 0.05)">\n            <div class="alert-item-icon">\n              <svg style="fill: var(--alert-green)" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n            </div>\n            <div class="alert-item-text" style="color: var(--text-on-dark)">'+(J.l(h.i(0,"has_reading"),!1)?"No leak reports. Water quality is awaiting sensor readings.":"No leak reports or configured water-quality alerts in the latest data.")+"</div>\n          </div>\n        ")}else{q=a1.style
q.borderColor=b3
a3=t.dH.a(a1.querySelector(b2))
if(a3!=null){q=a3.style
q.color=b3}B.b.q(d,new A.jN(a9,a2))
B.b.q(c,new A.jO(a9,a2))}}a4=A.C(["Purok 1","Purok 2","Purok 3","Purok 4","Purok 5","Purok 6"],t.s)
new A.cj(a4,t.fO).q(0,new A.jP(a9,i))
a5=s.getElementById("dashboard-zone-grid")
if(a5!=null){J.dk(a5,"")
B.b.q(a4,new A.jQ(a9,i,a5))}a6=s.getElementById("dash-log-count")
a7=s.getElementById("dash-log-list")
if(a7!=null){s=J.J(a7)
s.sP(a7,"")
a8=A.nO(g,0,A.cy(3,"count",t.S),A.G(g).c).ar(0)
if(a6!=null)J.v(a6,""+g.length+" logged")
if(a8.length===0)s.sP(a7,'<div class="log-card" style="color:var(--text-muted)">No maintenance activity logged yet.</div>')
else B.b.q(a8,new A.jR(a9,i,a7))}},
aN(){var s,r,q,p,o,n,m=null,l=$.O().a,k=document,j=t.G.a(k.getElementById("dir-search")),i=t.Y,h=i.a(k.getElementById("filter-purok")),g=i.a(k.getElementById("filter-status"))
if(j==null)s=m
else{i=j.value
i=i==null?m:B.a.u(i.toLowerCase())
s=i}if(s==null)s=""
r=h==null?m:h.value
if(r==null)r="all"
q=g==null?m:g.value
if(q==null)q="all"
p=k.getElementById("dir-empty-state")
o=k.getElementById("dir-household-list")
if(o==null)return
J.dk(o,"")
k=A.G(l)
i=k.h("I<1>")
n=A.a4(new A.I(l,k.h("H(1)").a(new A.jT(s,r,q)),i),i.h("f.E"))
if(n.length===0){if(p!=null){k=p.style
k.display="block"}}else{if(p!=null){k=p.style
k.display="none"}B.b.q(n,new A.jU(this,o))}},
ci(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
this.c=a
s=$.O()
r=s.ai(a)
if(r==null)return
q=document
p=q.getElementById("worker-res-name")
o=q.getElementById("worker-res-acct")
n=q.getElementById("worker-res-leak-status")
m=q.getElementById("worker-res-consumption")
l=q.getElementById("worker-res-total")
if(p!=null)J.v(p,A.an(J.m(r,"owner_name")))
if(o!=null)J.v(o,A.an(J.m(r,"account_number")))
k=s.r.i(0,"allow_worker_collection")==="true"
j=t.o.a(q.getElementById("btn-open-collect-modal"))
i=j==null
if(!i)j.disabled=!k
if(!i){h=j.style
h.toString
g=k?"1":"0.55"
B.l.c0(h,B.l.bJ(h,"opacity"),g,"")}if(!i){h=j.style
h.toString
g=k?"pointer":"default"
h.cursor=g}if(!i)B.n.sh6(j,k?"Record an authorized collection":"Payments must be made at Barangay Hall.")
i=q.getElementById("worker-collection-policy")
if(i!=null)J.v(i,k?"Field collection is enabled by Admin. Payments remain pending until the server confirms synchronization.":"Barangay policy: make payments in person at Barangay Hall. Field collection is disabled.")
f=s.bE(a)
e=f.length!==0?B.b.gC(f):null
if(m!=null)J.v(m,e==null?"--":B.e.K(A.ad(J.m(e,"consumption")),3))
if(l!=null)J.v(l,e==null?"No billing record":B.e.K(A.ad(J.m(e,"total_due")),2))
if(n!=null){s=J.J(n)
if(J.l(J.m(r,"current_leak_status"),"leak")){s.sP(n,'<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--alert-red)"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> <span style="color:var(--alert-red);font-weight:700">Leak Alert Detected</span>')
s=n.style
s.backgroundColor="var(--alert-red-bg)"
s=n.style
s.border="1px solid var(--alert-red)"}else{s.sP(n,'<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--alert-green)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <span style="color:var(--alert-green);font-weight:700">No leak reported</span>')
s=n.style
s.backgroundColor="var(--alert-green-bg)"
s=n.style
s.border="1px solid rgba(16, 185, 129, 0.3)"}}this.ag("view-worker-resident-details")
s=q.getElementById("btn-back-to-dir")
if(s!=null){s=J.ah(s)
q=s.$ti
A.A(s.a,s.b,q.h("~(1)?").a(new A.jB(this)),!1,q.c)}},
dL(a){var s=document,r=s.getElementById("modal-leak-title"),q=s.getElementById("modal-leak-desc")
if(r==null||q==null)return
s=J.J(r)
if(a==="leak"){s.sU(r,"Leak status: LEAK REPORTED")
s=r.style
s.color="var(--alert-red)"
J.v(q,"A leak has been reported. Inspect the water line on site.")}else{s.sU(r,"Leak status: NO REPORT")
s=r.style
s.color="var(--alert-green)"
J.v(q,"No leak is currently reported. This is not an automatic sensor assessment.")}},
h3(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e="var(--amber-safety)",d={}
t.oT.a(a)
s=document.getElementById(b)
if(s==null)return
r=J.J(s)
r.sP(s,"")
if(a.length===0){r.sP(s,'<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:12px">No historic telemetry available.</div>')
return}q=B.e.c6(B.b.fZ(a,new A.k6())*1.1,10,1000)
p=new A.cj(a,A.G(a).h("cj<1>"))
o=p.gaz(p).ap(0,new A.k7(a,q),t.c).ar(0)
p=A.G(o)
n=p.h("c(1)")
p=p.h("a0<1,c>")
m=new A.a0(o,n.a(new A.k8()),p).Z(0," ")
if(0>=o.length)return A.e(o,0)
l=B.e.K(A.ad(J.m(o[0],"x")),1)
k=B.c.K(80,1)
p=new A.a0(o,n.a(new A.k9()),p).Z(0," ")
n=o.length
j=n-1
if(!(j>=0))return A.e(o,j)
j=B.e.K(A.ad(J.m(o[j],"x")),1)
n=B.c.K(80,1)
i=b==="resident-chart-container"
h=i?"res-chart-grad":"chart-area-grad"
g=i?"#3B82F6":e
f=i?"#3B82F6":e
d.a='      <svg width="100%" height="100%" viewBox="0 0 340 100" style="overflow:visible">\n        <defs>\n          <linearGradient id="'+h+'" x1="0" y1="0" x2="0" y2="1">\n            <stop offset="0%" stop-color="'+f+'" stop-opacity="0.3"/>\n            <stop offset="100%" stop-color="'+f+'" stop-opacity="0.0"/>\n          </linearGradient>\n        </defs>\n\n        <line x1="20" y1="20" x2="320" y2="20" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="50" x2="320" y2="50" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="80" x2="320" y2="80" stroke="#CBD5E1" stroke-width="1.5"/>\n\n        <path d="'+("M "+l+","+k+" "+p+(" L "+j+","+n+" Z"))+'" fill="url(#'+h+')" />\n        <polyline points="'+m+'" fill="none" stroke="'+g+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>\n    '
B.b.q(o,new A.ka(d,g))
r.sP(s,d.a+="</svg>")},
dA(a){var s,r,q,p,o,n=document.getElementById("modal-historical-logs")
if(n==null)return
s=J.J(n)
s.sP(n,"")
r=$.O().c
q=A.G(r)
p=q.h("I<1>")
o=A.a4(new A.I(r,q.h("H(1)").a(new A.jV(a)),p),p.h("f.E"))
if(o.length===0)s.sP(n,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous repair logs recorded for this meter.</div>')
else B.b.q(o,new A.jW(this,n))},
cl(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this
if(f.a==null)return
s=document
r=s.getElementById("worker-name")
q=s.getElementById("worker-role")
p=s.getElementById("worker-zone-lbl")
o=s.getElementById("worker-avatar")
if(r!=null)J.v(r,A.an(f.a.i(0,"name")))
if(q!=null)J.v(q,A.an(f.a.i(0,"role")))
if(p!=null)J.v(p,"Assigned Zone: "+A.h(f.a.i(0,"selected_zone")))
if(o!=null){n=t.J
m=A.a4(new A.I(A.C(J.L(f.a.i(0,"name")).split(" "),t.s),t.Q.a(new A.jX()),n),n.h("f.E"))
n=A.G(m)
l=new A.a0(m,n.h("c(1)").a(new A.jY()),n.h("a0<1,c>")).Z(0,"")
n=l.length
J.v(o,B.a.n(l,0,n<2?n:2).toUpperCase())}n=$.O()
k=n.a.length
n=n.c
j=A.G(n)
i=new A.I(n,j.h("H(1)").a(new A.jZ(f)),j.h("I<1>")).gj(0)
h=s.getElementById("profile-stat-total")
g=s.getElementById("profile-stat-logs")
if(h!=null)J.v(h,B.c.l(k))
if(g!=null)J.v(g,B.c.l(i))},
fJ(){var s,r,q=this,p=document,o=t.G,n=o.a(p.getElementById("bill-meter-search")),m=p.getElementById("bill-meter-results"),l=o.a(p.getElementById("bill-curr-input")),k=t.o.a(p.getElementById("btn-save-bill"))
if(n==null)return
o=t.E
s=o.h("~(1)?")
o=o.c
A.A(n,"focus",s.a(new A.jo(q)),!1,o)
A.A(n,"input",s.a(new A.jp(q)),!1,o)
if(l!=null)A.A(l,"input",s.a(new A.jq(q)),!1,o)
A.A(p,"click",t.b9.a(new A.jr(n,m)),!1,t.V)
if(k!=null){p=t.C
A.A(k,"click",p.h("~(1)?").a(new A.js(q)),!1,p.c)}r=$.O().a
p=r.length
if(p!==0){if(0>=p)return A.e(r,0)
q.k3=A.an(J.m(r[0],"house_id"))
if(0>=r.length)return A.e(r,0)
p=A.h(J.m(r[0],"owner_name"))
if(0>=r.length)return A.e(r,0)
B.f.sI(n,p+" ("+A.h(J.m(r[0],"account_number"))+")")
q.by(q.k3)}},
cA(){var s,r,q,p,o=document,n=t.G.a(o.getElementById("bill-meter-search")),m=o.getElementById("bill-meter-results")
if(n==null||m==null)return
o=n.value
s=o==null?null:B.a.u(o.toLowerCase())
if(s==null)s=""
r=$.O().a
o=A.G(r)
q=o.h("I<1>")
p=A.a4(new A.I(r,o.h("H(1)").a(new A.kf(s)),q),q.h("f.E"))
o=J.J(m)
o.sP(m,"")
if(p.length===0){o.sP(m,'<div class="search-result-item" style="color:var(--text-muted); cursor:default">No households found</div>')
o=m.style
o.display="block"
return}B.b.q(p,new A.kg(this,n,m))
o=m.style
o.display="block"},
by(a){var s,r,q,p,o,n=this,m=a!=null
if(m)n.k3=a
s=n.k3
if(s==null)return
r=$.O()
if(r.ai(s)==null)return
s=document
q=s.getElementById("bill-prev-reading")
p=t.G.a(s.getElementById("bill-curr-input"))
s=n.k3
s.toString
o=r.e2(s)
if(q!=null)J.v(q,o==null?"--":B.e.K(o,3))
if(m&&p!=null)B.f.sI(p,"")
n.bB()
m=n.k3
m.toString
n.h1(m)},
cF(){var s,r,q,p,o,n,m,l,k,j,i=null,h=t.N,g=t.z,f=A.nI($.O().w,h,g),e=document,d=e.getElementById("bill-prev-reading"),c=d==null?i:d.textContent
if(c==null)c=""
e=t.G.a(e.getElementById("bill-curr-input"))
if(e==null)s=i
else{e=e.value
e=e==null?i:B.a.u(e)
s=e}if(s==null)s=""
if(c==="--"||c.length===0||s.length===0)return i
r=A.dY(c)
q=A.dY(s)
if(!J.l(f.i(0,"configured"),!0)||r==null||q==null||!isFinite(r)||r<0||!isFinite(q)||q<0||q<r||q>1e6)return i
p=q*1000
e=B.e.aD(p)
if(Math.abs(p-e)>0.0001)return i
o=e-B.e.aD(r*1000)
if(o<0)return i
n=B.c.a3(B.c.c6(o-B.e.aD(A.bJ(A.h(f.i(0,"included_m3")))*1000),0,1e9)*B.e.aD(A.bJ(A.h(f.i(0,"excess_rate")))*100)+500,1000)
m=A.bJ(B.e.K((B.e.aD(A.bJ(A.h(f.i(0,"base_rate")))*100)+B.e.aD(A.bJ(A.h(f.i(0,"environmental_fee")))*100)+n)/100,2))
l=A.bJ(B.e.K(o/1000,3))
k=A.bJ(B.e.K(n/100,2))
j=A.bJ(B.e.K(q,3))
return A.a3(["previous_reading",A.bJ(B.e.K(r,3)),"current_reading",j,"consumption",l,"excess_charge",k,"total_due",m,"billing_config_version",f.i(0,"version")],h,g)},
bB(){var s,r,q,p,o,n,m,l="configured",k="--",j="included_m3",i="consumption",h="total_due",g=$.O(),f=A.nI(g.w,t.N,t.z),e=this.cF(),d=new A.a9(Date.now(),0,!1),c=""+A.bA(d)+"-"+B.a.a2(B.c.l(A.cl(d)),2,"0"),b=this.k3,a=b!=null&&g.cb(b,c)
g=new A.kn()
g.$2("bill-calc-base",J.l(f.i(0,l),!0)?A.h(f.i(0,"base_rate")):k)
g.$2("bill-calc-fee",J.l(f.i(0,l),!0)?A.h(f.i(0,"environmental_fee")):k)
g.$2("bill-preview-cycle",c)
g.$2("bill-included-volume",J.l(f.i(0,l),!0)?A.h(f.i(0,j))+" m\xb3":k)
g.$2("bill-rate-description",J.l(f.i(0,l),!0)?"Includes "+A.h(f.i(0,j))+" m\xb3; excess at PHP "+A.h(f.i(0,"excess_rate"))+"/m\xb3.":"Admin must confirm billing rates before a bill can be recorded.")
b=e==null
g.$2("bill-calc-consumption",b?"0.000":B.e.K(A.ad(e.i(0,i)),3))
g.$2("bill-calc-excess",b?"0.00":B.e.K(A.ad(e.i(0,"excess_charge")),2))
g.$2("bill-calc-total",b?k:B.e.K(A.ad(e.i(0,h)),2))
s=document
r=t.G.a(s.getElementById("bill-curr-input"))
if(r==null)q=null
else{r=r.value
r=r==null?null:B.a.u(r)
q=r}if(q==null)q=""
r=s.getElementById("bill-prev-reading")
r=r==null?null:r.textContent
p=A.dY(r==null?"":r)
o=A.dY(q)
if(a)n="A bill or pending bill already exists for this billing cycle ("+c+")."
else if(!J.l(f.i(0,l),!0))n="Admin must confirm billing rates before issuing new bills."
else if(q.length===0)n="Enter current reading at or above previous reading (up to 3 decimal places)."
else if(o==null||!isFinite(o)||o<0)n="Enter a valid non-negative reading (up to 3 decimal places)."
else if(p!=null&&o<p)n="Current reading cannot be lower than previous reading ("+B.e.K(p,3)+" m\xb3)."
else n=b?"Reading format invalid. Up to 3 decimal places supported.":"Draft: "+B.e.K(A.ad(e.i(0,i)),3)+" m\xb3 | Total Due: \u20b1"+B.e.K(A.ad(e.i(0,h)),2)
g.$2("billing-alert-banner",n)
m=t.o.a(s.getElementById("btn-save-bill"))
if(m!=null){m.disabled=this.k4||a||b
g=m.style
g.toString
b=m.disabled
b.toString
b=b?"0.5":"1"
B.l.c0(g,B.l.bJ(g,"opacity"),b,"")}},
bc(){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$bc=A.V(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:if(m.k4||m.k3==null||m.a==null){s=1
break}l=m.cF()
c=new A.a9(Date.now(),0,!1)
k=""+A.bA(c)+"-"+B.a.a2(B.c.l(A.cl(c)),2,"0")
j=c.a1().a8()
if(l!=null){b=$.O()
a=m.k3
a.toString
a=b.cb(a,k)
b=a}else b=!0
if(b){s=1
break}b=$.O()
a=m.k3
a.toString
i=b.ai(a)
if(i==null){s=1
break}m.k4=!0
m.bB()
h=window.localStorage.getItem("waterhall_jwt")
g=b.x
p=4
f=A.nI(l,t.N,t.z)
J.bm(f,"house_id",m.k3)
J.bm(f,"account_number",J.m(i,"account_number"))
J.bm(f,"billing_month",k)
J.bm(f,"date",j)
J.bm(f,"billed_by",m.a.i(0,"worker_id"))
s=7
return A.y(b.aI(f),$async$bc)
case 7:e=a3
if(!J.l(h,window.localStorage.getItem("waterhall_jwt"))||m.a==null){n=[1]
s=5
break}if(g&&J.l(J.m(e,"is_synced"),!0))m.F("Bill successfully saved.")
else m.F("Bill saved offline. Pending synchronization.")
d=t.G.a(document.getElementById("bill-curr-input"))
if(d!=null)B.f.sI(d,"")
f=m.k3
f.toString
m.by(f)
m.cl()
n.push(6)
s=5
break
case 4:p=3
a1=o.pop()
if(J.l(h,window.localStorage.getItem("waterhall_jwt")))m.F("Unable to save the reading. Check storage and your session.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.k4=!1
m.bB()
s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$bc,r)},
h1(a){var s,r,q=document.getElementById("billing-history-list")
if(q==null)return
s=J.J(q)
s.sP(q,"")
r=$.O().bE(a)
if(r.length===0)s.sP(q,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous invoice logs recorded.</div>')
else B.b.q(r,new A.jC(this,q))},
cV(a,b){var s,r,q="WaterHallPush"
t.dZ.a(a)
s=$.dj()
if(s.b5(q)){s=s.i(0,q)
r=a==null?[]:A.C([a],t.t)
s.c5("processAnnouncements",A.C([A.ob(A.ro(r)),b],t.hf))}},
dz(){var s,r,q,p,o,n,m=this.d==null?"worker":"resident",l=document,k=l.getElementById("announcement-history")
if(k==null)return
J.eM(k).a0(0)
s=$.O().cs(m)
r=J.z(s)
if(r.gD(s)){l=l.createElement("p")
l.className="empty-state"
B.k.sU(l,"No announcements yet. New Barangay updates will appear here.")
k.appendChild(l).toString
return}for(r=r.gE(s);r.p();){q=r.gt(r)
p=l.createElement("div")
p.className="announcement-history-card"
o=l.createElement("p")
o.className="announcement-meta"
n=J.z(q)
B.k.sU(o,A.h(n.i(q,"author"))+" \xb7 "+A.h(n.i(q,"timestamp")))
p.appendChild(o).toString
o=l.createElement("p")
o.toString
B.k.sU(o,A.h(n.i(q,"message")))
p.appendChild(o).toString
k.appendChild(p).toString}},
F(a){var s=document,r=s.getElementById("app-toast"),q=s.getElementById("toast-text")
if(r!=null&&q!=null){J.v(q,a)
J.c7(r).m(0,"show")
s=this.ok
if(s!=null)s.a4(0)
this.ok=A.fT(A.lo(0,2500,0),new A.kk(r))}},
cB(a){var s,r,q,p,o,n,m,l,k,j=this,i=t.d.a(window.location).href
i.toString
if(A.cn(i).gaB().i(0,"role")==="worker"){A.c5("[SECURITY] Worker application is forbidden from loading Resident Portal.")
return}j.d=a
window.localStorage.setItem("waterhall_resident_session",a)
j.a=null
i=window.localStorage
i.toString
B.j.B(i,"waterhall_session")
i=j.ch
i===$&&A.av()
J.c7(i).B(0,"active")
i=j.ch.style
i.display="none"
i=j.k2
i===$&&A.av()
new A.aT(i,A.B(i).h("aT<2>")).q(0,new A.kh())
i=j.fy
i===$&&A.av()
i.setAttribute("style","display: none !important")
i=j.go
i===$&&A.av()
i.setAttribute("style","display: flex !important")
i=j.id
i===$&&A.av()
if(i!=null){i=i.style
i.display="none"}s=$.O().ai(a)
if(s!=null){i=document
r=i.getElementById("resident-logout-name")
q=i.getElementById("resident-logout-role")
p=i.getElementById("resident-logout-avatar")
i=J.z(s)
o=i.i(s,"owner_name")
n=J.L(o==null?"":o)
if(r!=null)J.v(r,n.length!==0?n:a)
if(q!=null)J.v(q,A.h(i.i(s,"house_id"))+" \u2022 "+A.h(i.i(s,"purok")))
if(p!=null){i=t.J
m=A.a4(new A.I(A.C(n.split(" "),t.s),t.Q.a(new A.ki()),i),i.h("f.E"))
i=A.G(m)
l=new A.a0(m,i.h("c(1)").a(new A.kj()),i.h("a0<1,c>")).Z(0,"")
i=l.length
k=B.a.n(l,0,i<2?i:2).toUpperCase()
J.v(p,k.length!==0?k:"RES")}}j.ag("view-resident-home")
i=j.at
if(i!=null)i.$0()},
cW(a,b,c,d,e,a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f="var(--text-muted)"
t.P.a(b)
s=J.l(b.i(0,"has_reading"),!1)
r=!s
q=new A.j_(r)
p=b.i(0,"main_tank_level")
if(c!=null)J.v(c,r&&typeof p=="number"?A.h(q.$2(p,0))+"%":"N/A")
if(d!=null)J.v(d,q.$2(b.i(0,"turbidity"),1))
if(e!=null)J.v(e,q.$2(b.i(0,"tds_ppm"),0))
q=b.i(0,"last_updated")
o=A.h(q==null?"":q)
q=A.lQ("(Z|[+-]\\d\\d:\\d\\d)$")
n=A.cI(q.b.test(o)?o:o+"Z")
q=n==null
if(q)m=null
else{l=new A.a9(Date.now(),0,!1).a1()
k=n.a1()
m=A.lo(l.b-k.b,l.a-k.a,0)}if(m!=null){l=m.a
j=B.c.a3(l,6e7)>=10||l<0}else j=!1
i=J.l(b.i(0,"turbidity_status"),"warning")
l=a0==null
if(!l){if(s)k="AWAITING DATA"
else if(j)k="STALE DATA"
else k=i?"QUALITY ALERT":"NO ALERT"
J.v(a0,k)}if(!l){l=a0.style
l.toString
if(!r||j)k=f
else k=i?"var(--alert-red)":"var(--alert-green)"
l.color=k}if(s)h="Awaiting sensor readings. No measurement is available."
else if(q)h="Latest recorded measurements \xb7 update time unavailable."
else{if(j)s="Stale reading \xb7 last updated "+n.b9().l(0)+". Refresh when connected."
else{s=B.c.a3(m.a,6e7)
s="Updated "+(s===0?"just now":""+s+" min ago")+" \xb7 sensor readings"}h=s}s=document
q=s.getElementById(a+"-telemetry-freshness")
if(q!=null)J.v(q,h)
g=s.getElementById(a+"-water-level-fill")
s=g==null
if(!s){q=g.style
q.toString
l=r&&typeof p=="number"&&isFinite(p)?A.h(B.e.c6(p,0,100))+"%":"0"
q.width=l}if(!s){s=g.style
s.toString
q=j?f:"var(--navy-primary)"
s.backgroundColor=q}},
cm(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6=this,b7=null,b8="resident",b9="owner_name",c0="house_id",c1="account_number",c2="purok",c3="payment_location",c4="payment_method",c5="operating_hours",c6="payment_instructions",c7=b6.d
if(c7==null)return
s=$.O()
r=s.ai(c7)
if(r==null)return
q=s.ct(b8)
if(s.x)b6.cV(q,b8)
c7=document
p=c7.getElementById("resident-announcement-banner")
o=c7.getElementById("resident-announcement-message")
n=c7.getElementById("resident-announcement-tag")
if(p!=null&&o!=null)if(q!=null&&A.w(J.m(q,"message")).length!==0){m=J.z(q)
J.v(o,A.w(m.i(q,"message")))
if(n!=null){l=m.i(q,"target_audience")
if(l==null)l="Everyone"
k=m.i(q,"author")
J.v(n,A.h(k==null?"Admin":k)+" \u2022 "+A.h(l))}m=p.style
m.display="flex"}else{m=p.style
m.display="none"}b6.cW(b8,s.b,c7.getElementById("resident-tank-val"),c7.getElementById("resident-turb-val"),c7.getElementById("resident-tds-val"),c7.getElementById("resident-safety-status"))
j=c7.getElementById("resident-profile-name-home")
i=c7.getElementById("resident-profile-meta-home")
if(j!=null)J.v(j,A.an(J.m(r,b9)))
if(i!=null){m=J.z(r)
J.v(i,"Resident: "+A.h(m.i(r,c0))+" | Meter: "+A.h(m.i(r,c1))+" | "+A.h(m.i(r,c2)))}h=c7.getElementById("resident-logout-name")
g=c7.getElementById("resident-logout-role")
f=c7.getElementById("resident-logout-avatar")
m=J.z(r)
e=m.i(r,b9)
d=J.L(e==null?"":e)
e=c7.getElementById("resident-profile-name")
if(e!=null)J.v(e,d)
e=c7.getElementById("resident-profile-account")
if(e!=null)J.v(e,A.h(m.i(r,c0))+" \xb7 Meter "+A.h(m.i(r,c1))+" \xb7 "+A.h(m.i(r,c2)))
e=c7.getElementById("resident-profile-avatar")
if(e!=null){c=d.length
if(c===0)c="R"
else{if(0>=c)return A.e(d,0)
c=d[0].toUpperCase()}J.v(e,c)}e=c7.getElementById("resident-report-context")
if(e!=null)J.v(e,"Reporting for "+A.h(m.i(r,c0))+" \xb7 "+A.h(m.i(r,c2)))
if(h!=null)J.v(h,A.an(d.length!==0?d:m.i(r,c0)))
if(g!=null)J.v(g,A.h(m.i(r,c0))+" \u2022 "+A.h(m.i(r,c2)))
if(f!=null){e=t.J
b=A.a4(new A.I(A.C(d.split(" "),t.s),t.Q.a(new A.k_()),e),e.h("f.E"))
e=A.G(b)
a=new A.a0(b,e.h("c(1)").a(new A.k0()),e.h("a0<1,c>")).Z(0,"")
e=a.length
a0=B.a.n(a,0,e<2?e:2).toUpperCase()
J.v(f,a0.length!==0?a0:"RES")}a1=c7.getElementById("resident-leak-flag")
if(a1!=null){e=J.J(a1)
if(J.l(m.i(r,"current_leak_status"),"leak")){e.sP(a1,'          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n          <span>A leak has been reported. Please contact the water service team.</span>\n        ')
a1.className="reservoir-status-banner low"
e=a1.style
e.backgroundColor="var(--alert-red-bg)"
e=a1.style
e.borderColor="rgba(239, 68, 68, 0.3)"
e=a1.style
e.color="var(--alert-red)"}else{e.sP(a1,'          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n          <span>No leak is currently reported. Report any water service concern in Support.</span>\n        ')
a1.className="reservoir-status-banner"
e=a1.style
e.backgroundColor="var(--alert-green-bg)"
e=a1.style
e.borderColor="rgba(16, 185, 129, 0.2)"
e=a1.style
e.color="var(--alert-green)"}}e=b6.d
e.toString
a2=s.bE(e)
a3=B.a.n(new A.a9(Date.now(),0,!1).a1().a8(),0,7)
e=A.G(a2)
c=e.h("H(1)")
e=e.h("I<1>")
a4=e.h("f.E")
a5=A.a4(new A.I(a2,c.a(new A.k1()),e),a4)
a6=A.a4(new A.I(a2,c.a(new A.k2(a3)),e),a4)
if(a5.length!==0)a7=B.b.gC(a5)
else if(a6.length!==0)a7=B.b.gC(a6)
else a7=a2.length!==0?B.b.gC(a2):b7
e=a7==null
c=e?b7:J.m(a7,"billing_breakdown")
t.eO.a(c)
a4=new A.k3()
a8=new A.k4()
a4.$2("resident-bill-cycle",e?"No recorded cycle":A.h(J.m(a7,"billing_month")))
a4.$2("resident-bill-status",e?"No unpaid or current bill":A.h(J.m(a7,"status")))
a4.$2("resident-prev-reading",a8.$2(e?b7:J.m(a7,"previous_reading"),3))
a4.$2("resident-curr-reading",a8.$2(e?b7:J.m(a7,"current_reading"),3))
a4.$2("resident-calc-consumption",a8.$2(e?b7:J.m(a7,"consumption"),3))
a4.$2("resident-calc-total",a8.$2(e?b7:J.m(a7,"total_due"),2))
a9=c==null
a4.$2("resident-calc-base",a8.$2(a9?b7:J.m(c,"base_rate"),2))
a4.$2("resident-calc-fee",a8.$2(a9?b7:J.m(c,"environmental_fee"),2))
a4.$2("resident-calc-excess",a8.$2(a9?b7:J.m(c,"excess_charge"),2))
if(e)b0=b7
else{a8=J.m(a7,"payment_date")
a8=a8==null?b7:J.L(a8)
b0=a8}if(b0==null)b0=""
a4.$2("resident-payment-date",!e&&A.h(J.m(a7,"status")).toLowerCase()==="paid"&&b0.length!==0?b0:"Not paid")
if(e)e="No billing record is on file yet. Amounts appear here after a Worker saves a meter reading."
else if(a9)e="Legacy bill: original total preserved; rate breakdown unavailable."
else{e=J.z(c)
c="Recorded rates: first "+A.h(e.i(c,"included_m3"))+" m\xb3 included; excess PHP "+A.h(e.i(c,"excess_rate"))+"/m\xb3."
e=c}a4.$2("resident-rate-description",e)
b6.h3(A.aU(t.R.a(m.i(r,"monthly_history")),!0,t.r),"resident-chart-container")
b6.h2(a2)
b1=s.r
b2=c7.getElementById("res-payment-location")
b3=c7.getElementById("res-payment-method")
b4=c7.getElementById("res-payment-hours")
b5=c7.getElementById("res-payment-instructions")
if(b2!=null&&b1.L(0,c3)){c7=b1.i(0,c3)
c7.toString
J.v(b2,c7)}if(b3!=null&&b1.L(0,c4)){c7=b1.i(0,c4)
c7.toString
J.v(b3,c7)}if(b4!=null&&b1.L(0,c5)){c7=b1.i(0,c5)
c7.toString
J.v(b4,c7)}if(b5!=null&&b1.L(0,c6)){c7=b1.i(0,c6)
c7.toString
J.v(b5,c7)}},
h2(a){var s,r
t.p.a(a)
s=document.getElementById("resident-history-list")
if(s==null)return
r=J.J(s)
r.sP(s,"")
if(a.length===0){r.sP(s,'<div class="empty-state" style="padding:16px;text-align:center;color:var(--text-muted);font-size:13px;">No billing history is on file for this household yet.</div>')
return}B.b.q(a,new A.k5(this,s))},
eN(){var s,r=document,q=r.getElementById("btn-open-register-modal"),p=r.getElementById("register-user-modal"),o=t.dD.a(r.getElementById("resident-register-form")),n=r.getElementById("register-status"),m=t.o.a(r.getElementById("btn-submit-register"))
if(A.nS().gaB().i(0,"role")==="resident")if(q!=null){s=q.style
s.display="block"}s=t.h
A.eJ(s,s,"T","querySelectorAll")
s=r.querySelectorAll("[data-toggle-password]")
s.toString
s=new A.bi(s,t.U)
s.q(s,new A.iV())
r=r.getElementById("btn-close-register-modal")
if(r!=null){r=J.ah(r)
s=r.$ti
A.A(r.a,r.b,s.h("~(1)?").a(new A.iW(p)),!1,s.c)}if(q!=null){r=J.ah(q)
s=r.$ti
A.A(r.a,r.b,s.h("~(1)?").a(new A.iX(p,n)),!1,s.c)}if(o!=null){r=t.E
A.A(o,"submit",r.h("~(1)?").a(new A.iY(m,o,n)),!1,r.c)}},
ez(){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f="change",e=document,d=e.getElementById("btn-open-collect-modal"),c=e.getElementById("modal-collect-payment"),b=e.getElementById("btn-collect-cancel"),a=t.o.a(e.getElementById("btn-collect-confirm")),a0=t.G.a(e.getElementById("collect-amount-input")),a1=t.Y,a2=a1.a(e.getElementById("collect-payment-method"))
if(d!=null){s=J.ah(d)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.iz(g,a0,c)),!1,r.c)}if(b!=null){s=J.ah(b)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.iA(c)),!1,r.c)}if(a!=null){s=t.C
A.A(a,"click",s.h("~(1)?").a(new A.iB(g,a,a0,a2,c)),!1,s.c)}s=t.iC
q=s.a(e.getElementById("resident-gallery-input"))
p=s.a(e.getElementById("resident-camera-input"))
o=s.a(e.getElementById("resident-photo-input"))
n=a1.a(e.getElementById("resident-issue-category"))
m=t.q.a(e.getElementById("resident-log-desc"))
a1=new A.iS(g,n,m)
s=new A.iT(g)
r=new A.iv(g,s,a1)
$.dj().k(0,"waterhallPhotoPickerResult",A.ul(new A.iH(g,a1,r),t.Z))
l=new A.iR(g,a1)
k=new A.iy(g,q,p,o)
r=new A.iQ(g,r)
if(q!=null){j=t.E
A.A(q,f,j.h("~(1)?").a(new A.iI(r,q)),!1,j.c)}if(p!=null){j=t.E
A.A(p,f,j.h("~(1)?").a(new A.iJ(r,p)),!1,j.c)}if(o!=null){j=t.E
A.A(o,f,j.h("~(1)?").a(new A.iK(r,o)),!1,j.c)}r=e.getElementById("btn-resident-gallery-trigger")
if(r!=null){r=J.ah(r)
j=r.$ti
A.A(r.a,r.b,j.h("~(1)?").a(new A.iL(l,q)),!1,j.c)}r=e.getElementById("btn-resident-camera-trigger")
if(r!=null){r=J.ah(r)
j=r.$ti
A.A(r.a,r.b,j.h("~(1)?").a(new A.iM(l,p)),!1,j.c)}r=e.getElementById("btn-resident-photo-trigger")
if(r!=null){r=J.ah(r)
j=r.$ti
A.A(r.a,r.b,j.h("~(1)?").a(new A.iN(l,q)),!1,j.c)}r=e.getElementById("btn-resident-photo-replace-gallery")
if(r!=null){r=J.ah(r)
j=r.$ti
A.A(r.a,r.b,j.h("~(1)?").a(new A.iO(l,q)),!1,j.c)}r=e.getElementById("btn-resident-photo-replace-camera")
if(r!=null){r=J.ah(r)
j=r.$ti
A.A(r.a,r.b,j.h("~(1)?").a(new A.iC(l,p)),!1,j.c)}r=e.getElementById("btn-resident-photo-remove")
if(r!=null){r=J.ah(r)
j=r.$ti
A.A(r.a,r.b,j.h("~(1)?").a(new A.iD(g,k,a1)),!1,j.c)}r=new A.iP(g,a1)
if(m!=null){j=t.E
A.A(m,"input",j.h("~(1)?").a(r),!1,j.c)}if(n!=null){j=t.E
A.A(n,f,j.h("~(1)?").a(r),!1,j.c)}s=new A.iE(g,k,m,n,s,l)
g.at=s
s.$0()
i=e.getElementById("btn-resident-submit-log")
if(i!=null){s=J.ah(i)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.iF(g,a1,k)),!1,r.c)}h=e.getElementById("btn-retry-db-connection")
if(h!=null){e=J.ah(h)
a1=e.$ti
A.A(e.a,e.b,a1.h("~(1)?").a(new A.iG(g)),!1,a1.c)}}}
A.jA.prototype={
$0(){var s,r,q,p,o=document.getElementById("phone-time")
if(o!=null){s=new A.a9(Date.now(),0,!1)
r=A.bW(s)
q=B.a.a2(B.c.l(A.cT(s)),2,"0")
p=r>=12?"PM":"AM"
r=B.c.au(r,12)
J.v(o,""+(r!==0?r:12)+":"+q+" "+p)}},
$S:2}
A.ju.prototype={
$1(a){t.I.a(a)
return this.a.$0()},
$S:19}
A.jv.prototype={
$1(a){t.V.a(a)
return $.O().c8()},
$S:1}
A.jw.prototype={
$1(a){var s,r,q=this.a
q.aw()
q.r=q.d=q.a=null;++q.x
q.y=!1;++q.Q
q.z=!1
s=q.fx
s===$&&A.av()
r=t.h
A.eJ(r,r,"T","querySelectorAll")
s=s.querySelectorAll("[disabled]")
s.toString
s=new A.bi(s,t.U)
s.q(s,new A.jt())
q.as=null
s=q.ax
if(s!=null)s.a4(0)
s=window.localStorage
s.toString
B.j.B(s,"waterhall_resident_report_draft")
q.f=q.k3=q.c=null
s=document
r=s.getElementById("collection-review-modal")
if(r!=null)J.is(r)
r=s.getElementById("modal-collect-payment")
if(r!=null){r=r.style
r.display="none"}q.b4()
if(a)q.aj("Session expired. Please sign in again.",s.getElementById("login-error-msg"))},
$S:40}
A.jt.prototype={
$1(a){var s
t.h.a(a)
s=a.getAttribute("disabled")
a.removeAttribute("disabled")
return s},
$S:8}
A.jx.prototype={
$1(a){this.a.d6(t.P.a(a))},
$S:5}
A.jy.prototype={
$1(a){t.I.a(a)
return this.a.aX()},
$S:19}
A.jz.prototype={
$1(a){var s=document
s.toString
s=s.visibilityState||s.mozVisibilityState||s.msVisibilityState||s.webkitVisibilityState
s.toString
if(s==="visible")this.a.aX()},
$S:3}
A.j4.prototype={
$1(a){t.V.a(a)
return this.a.cX()},
$S:1}
A.j0.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.j1.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.j2.prototype={
$1(a){return this.dV(t.V.a(a))},
dV(a){var s=0,r=A.U(t.H),q=this,p
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:q.b.disabled=!0
p=$.O()
s=2
return A.y(p.a9(),$async$$1)
case 2:s=3
return A.y(p.av(),$async$$1)
case 3:if(p.N())q.a.cX()
return A.S(null,r)}})
return A.T($async$$1,r)},
$S:4}
A.j3.prototype={
$1(a){t.V.a(a)
return B.a1.dw(this.a)},
$S:1}
A.j7.prototype={
$1(a){var s,r,q,p
t.V.a(a).preventDefault()
s=document
r=t.G.a(s.getElementById("login-password"))
q=s.getElementById("web-eye-show")
p=s.getElementById("web-eye-hide")
if(r!=null)if(r.type==="password"){B.f.sco(r,"text")
if(q!=null){s=q.style
s.display="none"}if(p!=null){s=p.style
s.display="block"}s=this.a.style
s.color="#F4D03F"}else{B.f.sco(r,"password")
if(q!=null){s=q.style
s.display="block"}if(p!=null){s=p.style
s.display="none"}s=this.a.style
s.color="var(--text-muted)"}},
$S:1}
A.j8.prototype={
$1(a){return this.e0(t.V.a(a))},
e0(a9){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
var $async$$1=A.V(function(b0,b1){if(b0===1){o.push(b1)
s=p}for(;;)switch(s){case 0:a9.preventDefault()
a=m.b
if(a==null)a0=null
else{a=a.value
a=a==null?null:B.a.u(a)
a0=a}l=a0==null?"":a0
a=m.c
if(a==null)a1=null
else{a=a.value
a=a==null?null:B.a.u(a)
a1=a}k=a1==null?"":a1
a=m.d
a2=a==null?null:a.value
j=a2==null?"":a2
a=t.d.a(window.location).href
a.toString
i=A.cn(a).gaB().i(0,"role")
if(J.a8(l)===0||J.a8(k)===0){m.a.aj("Both Username and Password are required.",m.e)
s=1
break}a=m.f
a.disabled=!0
p=4
a3=$.O()
a4=t.N
s=7
return A.y(a3.ac("/api/login",!1,"POST",A.a3(["Content-Type","application/json"],a4,a4),B.d.V(A.a3(["username",l,"password",k],a4,a4))),$async$$1)
case 7:h=b1
a5=h.responseText
a5.toString
g=t.P.a(B.d.M(0,a5))
f=A.w(J.m(g,"access_token"))
e=A.w(J.m(g,"role"))
d=A.w(J.m(g,"id"))
c=A.w(J.m(g,"name"))
a5=!0
if(!J.l(e,"admin"))if(!(J.l(i,"resident")&&!J.l(e,"resident")))a5=!J.l(i,"resident")&&!J.l(e,"worker")
if(a5){m.a.aj("Use the portal assigned to your account role.",m.e)
n=[1]
s=5
break}a3.dg()
a5=m.a
a5.f=null
s=8
return A.y(a3.aS(f),$async$$1)
case 8:s=9
return A.y(A.di(),$async$$1)
case 9:s=10
return A.y(a3.b7(),$async$$1)
case 10:if(a3.N()){a3=window.localStorage.getItem("waterhall_jwt")
a6=f
a6=a3==null?a6!=null:a3!==a6
a3=a6}else a3=!0
if(a3){n=[1]
s=5
break}if(J.l(e,"resident")){if(J.l(i,"worker")){a5.aj("This terminal is for Field Workers only. Residents must use the Resident App.",m.e)
n=[1]
s=5
break}a3=window.localStorage
a3.toString
B.j.B(a3,"waterhall_session")
a5.a=null
a5.cB(d)
a5.aw()
a5.bi("resident")
a3=m.e
if(a3!=null){a3=a3.style
a3.display="none"}a5.F(B.a.cr("Logged in as Resident: ",c))
n=[1]
s=5
break}else{if(J.l(i,"resident")){a5.aj("This portal is for Residents only. Field Workers must use the Worker App.",m.e)
n=[1]
s=5
break}a3=J.a8(j)!==0?j:"Purok 1"
a4=A.a3(["worker_id",d,"name",c,"role","Collector","selected_zone",a3],a4,t.z)
a5.a=a4
a3=window.localStorage
a3.toString
a3.setItem("waterhall_session",B.d.V(a4))
a4=window.localStorage
a4.toString
B.j.B(a4,"waterhall_resident_session")
a5.aw()
a5.bi("worker")
a3=m.e
if(a3!=null){a3=a3.style
a3.display="none"}a3=a5.a
a3.toString
a5.cz(a3)
a5.F(B.a.cr("Logged in as Tech: ",c))
n=[1]
s=5
break}n.push(6)
s=5
break
case 4:p=3
a8=o.pop()
a3=A.al(a8)
if(a3 instanceof A.aH){b=a3
a3=b.c
if(a3==null)a3="Unable to sign in. Check your connection and credentials."
m.a.aj(a3,m.e)
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
case 6:a=$.O().y==="Session expired. Please sign in again."?"Session expired. Please sign in again.":"Unable to sign in. Check your credentials and connection. Existing offline sessions resume when the app opens."
m.a.aj(a,m.e)
case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$$1,r)},
$S:4}
A.j9.prototype={
$1(a){return this.e_(t.V.a(a))},
e_(a){var s=0,r=A.U(t.H),q=this,p
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:p=q.a
p.aw()
s=2
return A.y($.O().c8(),$async$$1)
case 2:p.F("Signed out of Tech session")
return A.S(null,r)}})
return A.T($async$$1,r)},
$S:4}
A.jf.prototype={
$1(a){return this.dZ(t.V.a(a))},
dZ(a){var s=0,r=A.U(t.H),q=this,p
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:p=q.a
p.aw()
s=2
return A.y($.O().c8(),$async$$1)
case 2:p.F("Signed out of Resident Portal")
return A.S(null,r)}})
return A.T($async$$1,r)},
$S:4}
A.jg.prototype={
$1(a){var s,r
t.h.a(a)
s=J.ah(a)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.j6(this.a,a)),!1,r.c)},
$S:8}
A.j6.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.b.getAttribute("data-target")
if(s==null)s=""
this.a.ag(s)},
$S:1}
A.jh.prototype={
$1(a){return this.a.aN()},
$S:3}
A.ji.prototype={
$1(a){return this.a.aN()},
$S:3}
A.jj.prototype={
$1(a){return this.a.aN()},
$S:3}
A.jk.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.ag("view-directory")
s.c=null},
$S:1}
A.jl.prototype={
$1(a){A.pG(t.V.a(a).target)},
$S:1}
A.jm.prototype={
$1(a){var s=0,r=A.U(t.H),q,p=this,o,n,m,l,k,j
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:k=p.a
j=k.c
if(j==null){s=1
break}o=p.b.checked
n=o===!0?"leak":"normal"
s=3
return A.y($.O().ba(j,n),$async$$1)
case 3:if(c!=null){j=document
m=j.getElementById("modal-flow-rate")
if(m!=null)J.v(m,"Manual report")
k.dL(n)
k.F(n==="leak"?"Leak status saved for synchronization.":"Resolved status saved for synchronization.")
o=k.c
o.toString
k.dA(o)
l=t.aa.a(j.getElementById("log-resolved"))
if(l!=null)B.f.sde(l,n==="normal")}case 1:return A.S(q,r)}})
return A.T($async$$1,r)},
$S:33}
A.ja.prototype={
$1(a){return this.dY(t.V.a(a))},
dY(a){var s=0,r=A.U(t.H),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$$1=A.V(function(b,a0){if(b===1)return A.R(a0,r)
for(;;)switch(s){case 0:c=p.a
if(c.c==null||c.a==null){s=1
break}o=document
n=t.q.a(o.getElementById("log-desc"))
m=n==null
if(m)l=null
else{k=n.value
k=k==null?null:B.a.u(k)
l=k}if(l==null)l=""
k=t.aa
j=k.a(o.getElementById("log-resolved"))
i=j==null?null:j.checked
h=i!==!1
if(l.length===0){c.F("Please detail the maintenance actions taken.")
s=1
break}g=A.a3(["house_id",c.c,"worker_id",c.a.i(0,"worker_id"),"purok",c.a.i(0,"selected_zone"),"description",l,"status_resolved",h,"date",new A.a9(Date.now(),0,!1).a1().a8()],t.N,t.z)
i=$.O()
s=3
return A.y(i.bn(g),$async$$1)
case 3:s=h?4:5
break
case 4:f=c.c
f.toString
s=6
return A.y(i.ba(f,"normal"),$async$$1)
case 6:e=k.a(o.getElementById("modal-leak-toggle"))
if(e!=null)B.f.sde(e,!1)
c.dL("normal")
case 5:k=c.c
k.toString
if(i.ai(k)!=null){d=o.getElementById("modal-flow-rate")
if(d!=null)J.v(d,"Manual reading")}if(!m)B.m.sI(n,"")
c.F("Maintenance Log committed to database!")
o=c.c
o.toString
c.dA(o)
c.bz()
case 1:return A.S(q,r)}})
return A.T($async$$1,r)},
$S:4}
A.jb.prototype={
$1(a){return this.dX(t.V.a(a))},
dX(a){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b
var $async$$1=A.V(function(a0,a1){if(a0===1){o.push(a1)
s=p}for(;;)switch(s){case 0:c=m.a
if(c.a!=null){h=m.b.disabled
h.toString}else h=!0
if(h){s=1
break}h=document
l=t.q.a(h.getElementById("worker-announcement-input"))
g=t.Y.a(h.getElementById("worker-announcement-audience"))
h=l
if(h==null)f=null
else{h=h.value
h=h==null?null:B.a.u(h)
f=h}k=f==null?"":f
e=g==null?null:g.value
j=e==null?"Everyone":e
if(J.a8(k)===0){c.F("Message cannot be empty")
s=1
break}i=window.localStorage.getItem("waterhall_jwt")
h=m.b
h.disabled=!0
p=4
s=7
return A.y($.O().bl(k,A.w(c.a.i(0,"name")),j),$async$$1)
case 7:if(!J.l(i,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}if(l!=null)B.m.sI(l,"")
c.F("Announcement queued for "+A.h(j)+". Pending items retry when online.")
n.push(6)
s=5
break
case 4:p=3
b=o.pop()
if(J.l(i,window.localStorage.getItem("waterhall_jwt")))c.F("Announcement was not saved. Check storage and retry.")
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
A.jc.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.a
if(s!=null){s=s.style
s.display="flex"}},
$S:1}
A.jd.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.je.prototype={
$1(a){return this.dW(t.V.a(a))},
dW(a8){var s=0,r=A.U(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
var $async$$1=A.V(function(a9,b0){if(a9===1){o.push(b0)
s=p}for(;;)switch(s){case 0:a8.preventDefault()
b=document
a=t.Y.a(b.getElementById("web-recover-role"))
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
b=b==null?null:B.a.u(b)
a2=b}g=a2==null?"":a2
b=l
if(b==null)a3=null
else{b=b.value
b=b==null?null:B.a.u(b)
a3=b}f=a3==null?"":a3
b=k
if(b==null)a4=null
else{b=b.value
b=b==null?null:B.a.u(b)
a4=b}e=a4==null?"":a4
if(J.a8(g)===0||J.a8(f)===0||J.a8(e)===0){if(j!=null){J.v(j,"All fields are required.")
b=j.style
b.display="block"}s=1
break}p=4
b=$.O()
a0=t.N
a5=B.d.V(A.a3(["role",h,"username",g,"reset_token",f,"new_password",e],a0,a0))
s=7
return A.y(b.ac("/api/recover-account",!1,"POST",A.a3(["Content-Type","application/json"],a0,a0),a5),$async$$1)
case 7:d=b0
if(d.status===200){b=d.responseText
c=B.d.M(0,b==null?"{}":b)
if(i!=null){b=J.m(c,"message")
J.v(i,A.an(b==null?"Password reset successfully!":b))
b=i.style
b.display="block"}if(m!=null)B.f.sI(m,"")
if(l!=null)B.f.sI(l,"")
if(k!=null)B.f.sI(k,"")
A.rh(A.lo(0,0,2),new A.j5(n.a,i),t.a)}p=2
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
A.j5.prototype={
$0(){var s=this.a
if(s!=null){s=s.style
s.display="none"}s=this.b
if(s!=null){s=s.style
s.display="none"}},
$S:14}
A.jn.prototype={
$1(a){return J.c7(t.h.a(a)).B(0,"active")},
$S:8}
A.kb.prototype={
$1(a){return J.c7(t.h.a(a)).B(0,"active")},
$S:8}
A.kc.prototype={
$1(a){return B.a.u(A.w(a)).length!==0},
$S:9}
A.kd.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:10}
A.kl.prototype={
$1(a){var s
t.h.a(a)
s=J.J(a)
if(a.getAttribute("data-target")===this.a)s.gan(a).m(0,"active")
else s.gan(a).B(0,"active")},
$S:8}
A.km.prototype={
$2(a,b){var s
A.w(a)
t.h.a(b)
s=J.J(b)
if(a===this.a)s.gan(b).m(0,"active")
else s.gan(b).B(0,"active")},
$S:46}
A.jM.prototype={
$1(a){return J.l(J.m(t.P.a(a),"current_leak_status"),"leak")},
$S:0}
A.jN.prototype={
$1(a){var s,r,q
t.P.a(a)
s=document.createElement("div")
s.className="alert-item leak"
r=s.style
r.cursor="pointer"
r=J.z(a)
q=J.J(s)
q.sP(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.h(r.i(a,"owner_name"))+" ("+A.h(r.i(a,"purok"))+")</strong><br>\n              Reported leak. Field inspection required.\n            </div>\n          ")
q=q.gaA(s)
r=q.$ti
A.A(q.a,q.b,r.h("~(1)?").a(new A.jL(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:5}
A.jL.prototype={
$1(a){t.V.a(a)
this.a.ci(A.w(J.m(this.b,"house_id")))},
$S:1}
A.jO.prototype={
$1(a){var s,r,q
t.k.a(a)
s=document.createElement("div")
s.className="alert-item quality"
r=s.style
r.cursor="pointer"
r=J.z(a)
q=J.J(s)
q.sP(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.h(r.i(a,"name"))+"</strong><br>\n              "+A.h(r.i(a,"desc"))+"\n            </div>\n          ")
q=q.gaA(s)
r=q.$ti
A.A(q.a,q.b,r.h("~(1)?").a(new A.jK(this.a)),!1,r.c)
this.b.appendChild(s).toString},
$S:72}
A.jK.prototype={
$1(a){var s,r
t.V.a(a)
this.a.ag("view-dashboard")
s=document.getElementById("worker-telemetry-freshness")
if(s!=null){r=!!s.scrollIntoViewIfNeeded
r.toString
if(r)s.scrollIntoViewIfNeeded()
else s.scrollIntoView()}},
$S:1}
A.jP.prototype={
$2(a,b){var s,r,q,p,o,n
A.w(b)
s=document.getElementById("pin-p"+(a+1))
if(s!=null){r=s.querySelector(".pin-bg")
q=B.b.ab(this.b,new A.jI(b))
if(r!=null)if(q){r.setAttribute("fill","var(--alert-red)")
r.setAttribute("stroke","#FFF")
r.setAttribute("stroke-width","1.5")}else{r.setAttribute("fill","var(--alert-green)")
r.removeAttribute("stroke")}p=s.style
p.cursor="pointer"
p=J.J(s)
o=t.h.a(p.fs(s,!0))
p.dC(s,o)
p=J.ah(o)
n=p.$ti
A.A(p.a,p.b,n.h("~(1)?").a(new A.jJ(this.a,b)),!1,n.c)}},
$S:73}
A.jI.prototype={
$1(a){var s
t.P.a(a)
s=J.z(a)
return J.l(s.i(a,"purok"),this.a)&&J.l(s.i(a,"current_leak_status"),"leak")},
$S:0}
A.jJ.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Y
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.o.sI(q,this.b)
if(p!=null)B.o.sI(p,"all")
this.a.ag("view-directory")},
$S:1}
A.jQ.prototype={
$1(a){var s,r,q,p,o,n,m,l
A.w(a)
s=this.b
r=A.G(s)
q=r.h("H(1)")
r=r.h("I<1>")
p=new A.I(s,q.a(new A.jF(a)),r).gj(0)
o=new A.I(s,q.a(new A.jG(a)),r).gj(0)
r=this.a
n=J.l(r.a.i(0,"selected_zone"),a)
m=document.createElement("div")
m.className="zone-card "+(n?"assigned":"")
s=n?'<span class="zone-badge">ASSIGNED</span>':""
q=o>0?""+o+" Leaks":"Clear"
l=J.J(m)
l.sP(m,'          <div class="zone-card-header">\n            <span class="zone-name">'+a+"</span>\n            "+s+'\n          </div>\n          <div class="zone-stats">\n            <span>Meters: <strong>'+p+'</strong></span>\n            <span class="zone-leak-count">'+q+"</span>\n          </div>\n        ")
l=l.gaA(m)
q=l.$ti
A.A(l.a,l.b,q.h("~(1)?").a(new A.jH(r,a)),!1,q.c)
this.c.appendChild(m).toString},
$S:49}
A.jF.prototype={
$1(a){return J.l(J.m(t.P.a(a),"purok"),this.a)},
$S:0}
A.jG.prototype={
$1(a){var s
t.P.a(a)
s=J.z(a)
return J.l(s.i(a,"purok"),this.a)&&J.l(s.i(a,"current_leak_status"),"leak")},
$S:0}
A.jH.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Y
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.o.sI(q,this.b)
if(p!=null)B.o.sI(p,"all")
this.a.ag("view-directory")},
$S:1}
A.jR.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i
t.P.a(a)
s=B.b.di(this.b,new A.jD(a),new A.jE())
r=J.z(s)
q=r.gS(s)?r.i(s,"owner_name"):"Unknown Household"
p=document.createElement("div")
r=J.z(a)
p.className="log-card "+(J.l(r.i(a,"status_resolved"),!0)?"resolved":"pending")
o=r.i(a,"date")
o=A.cI(J.L(o==null?"":o))
n=o==null?null:o.b9()
if(n==null)m="Unknown date"
else{l=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
k=B.c.au(A.bW(n),12)===0?12:B.c.au(A.bW(n),12)
j=B.a.a2(B.c.l(A.cT(n)),2,"0")
i=A.bW(n)>=12?"PM":"AM"
o=A.cl(n)-1
if(!(o>=0&&o<12))return A.e(l,o)
m=l[o]+" "+A.dV(n)+" "+k+":"+j+" "+i}J.dk(p,'            <div class="log-card-header">\n              <span>'+A.h(q)+'</span>\n              <span style="font-size:10px; color:var(--text-muted)">'+m+'</span>\n            </div>\n            <div class="log-card-desc">'+A.h(r.i(a,"description"))+"</div>\n          ")
this.c.appendChild(p).toString},
$S:5}
A.jD.prototype={
$1(a){var s="house_id"
return J.l(J.m(t.P.a(a),s),J.m(this.a,s))},
$S:0}
A.jE.prototype={
$0(){return A.ap(t.N,t.z)},
$S:32}
A.jT.prototype={
$1(a){var s,r,q,p,o
t.P.a(a)
s=J.z(a)
r=this.a
q=B.a.A(J.L(s.i(a,"owner_name")).toLowerCase(),r)||B.a.A(J.L(s.i(a,"account_number")).toLowerCase(),r)||B.a.A(J.L(s.i(a,"house_id")).toLowerCase(),r)
r=this.b
p=r==="all"||J.l(s.i(a,"purok"),r)
r=this.c
o=r==="all"||J.l(s.i(a,"current_leak_status"),r)
return q&&p&&o},
$S:0}
A.jU.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j="current_leak_status",i="current_m3_usage"
t.P.a(a)
s=document.createElement("div")
r=J.z(a)
s.className="household-card "+(J.l(r.i(a,j),"leak")?"has-leak":"")
q=A.h(r.i(a,"owner_name"))
p=A.h(r.i(a,"purok"))
o=A.h(r.i(a,"account_number"))
n=A.h(r.i(a,i))
m=A.h(r.i(a,j))
l=J.l(r.i(a,j),"leak")?'<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> Leak':'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Normal'
k=J.J(s)
k.sP(s,'          <div class="household-info">\n            <span class="household-name">'+q+'</span>\n            <div class="household-meta">\n              <span class="household-purok">'+p+'</span>\n              <span class="household-acct">'+o+'</span>\n            </div>\n            <div class="household-usage">Usage this Month: <strong>'+n+' m\xb3</strong></div>\n          </div>\n          <div class="household-status-section">\n            <span class="status-indicator '+m+'">\n              '+l+'\n            </span>\n            <span class="household-flow">Meter: <span>'+A.h(r.i(a,i))+" m\xb3</span></span>\n          </div>\n        ")
k=k.gaA(s)
r=k.$ti
A.A(k.a,k.b,r.h("~(1)?").a(new A.jS(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:5}
A.jS.prototype={
$1(a){t.V.a(a)
this.a.ci(A.w(J.m(this.b,"house_id")))},
$S:1}
A.jB.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.ag("view-directory")
s.c=null},
$S:1}
A.k6.prototype={
$2(a,b){A.ad(a)
A.ad(b)
return a>b?a:b},
$S:51}
A.k7.prototype={
$1(a){var s,r,q
t.if.a(a)
s=a.a
r=a.b
q=this.a.length
return A.a3(["x",20+(q===1?0.5:s/(q-1))*300,"y",80-r/this.b*60,"val",r,"label",""+(s+1)],t.N,t.K)},
$S:52}
A.k8.prototype={
$1(a){var s
t.c.a(a)
s=J.z(a)
return B.e.K(A.ad(s.i(a,"x")),1)+","+B.e.K(A.ad(s.i(a,"y")),1)},
$S:30}
A.k9.prototype={
$1(a){var s
t.c.a(a)
s=J.z(a)
return"L "+B.e.K(A.ad(s.i(a,"x")),1)+","+B.e.K(A.ad(s.i(a,"y")),1)},
$S:30}
A.ka.prototype={
$1(a){var s,r
t.c.a(a)
s=this.a
r=J.z(a)
s.a=s.a+('        <text x="'+A.h(r.i(a,"x"))+'" y="96" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-weight="600">'+A.h(r.i(a,"label"))+'</text>\n        <line x1="'+A.h(r.i(a,"x"))+'" y1="'+A.h(r.i(a,"y"))+'" x2="'+A.h(r.i(a,"x"))+'" y2="80" stroke="rgba(249,115,22,0.2)" stroke-width="1" stroke-dasharray="2 2" />\n        <circle cx="'+A.h(r.i(a,"x"))+'" cy="'+A.h(r.i(a,"y"))+'" r="4" fill="var(--white)" stroke="'+this.b+'" stroke-width="2" />\n        <text x="'+A.h(r.i(a,"x"))+'" y="'+A.h(A.ad(r.i(a,"y"))-8)+'" text-anchor="middle" fill="var(--navy-primary)" font-size="9" font-weight="700">'+A.h(r.i(a,"val"))+"m\xb3</text>\n      ")},
$S:54}
A.jV.prototype={
$1(a){return J.l(J.m(t.P.a(a),"house_id"),this.a)},
$S:0}
A.jW.prototype={
$1(a){var s,r,q,p,o,n,m,l="status_resolved"
t.P.a(a)
s=document.createElement("div")
r=J.z(a)
s.className="log-card "+(J.l(r.i(a,l),!0)?"resolved":"pending")
q=r.i(a,"date")
q=A.cI(J.L(q==null?"":q))
p=q==null?null:q.b9()
o=p==null?"Unknown date":""+A.cl(p)+"/"+A.dV(p)+"/"+A.bA(p)+" @ "+B.a.a2(B.c.l(A.bW(p)),2,"0")+":"+B.a.a2(B.c.l(A.cT(p)),2,"0")
q=A.h(r.i(a,"worker_id"))
n=A.h(r.i(a,"description"))
m=J.l(r.i(a,l),!0)?"var(--alert-green)":"var(--amber-safety)"
r=J.l(r.i(a,l),!0)?"Resolved":"In Progress (Active Monitoring)"
J.dk(s,'          <div class="log-card-header">\n            <span>Tech: <strong>'+q+'</strong></span>\n            <span style="font-size:10px; color:var(--text-muted)">'+o+'</span>\n          </div>\n          <div class="log-card-desc">'+n+'</div>\n          <div style="font-size: 9px; font-weight:700; color:'+m+'; margin-top:4px; text-transform:uppercase">\n            Status: '+r+"\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:5}
A.jX.prototype={
$1(a){return B.a.u(A.w(a)).length!==0},
$S:9}
A.jY.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:10}
A.jZ.prototype={
$1(a){var s,r="worker_id"
t.P.a(a)
s=J.z(a)
return J.l(s.i(a,r),this.a.a.i(0,r))&&J.l(s.i(a,"status_resolved"),!0)},
$S:0}
A.jo.prototype={
$1(a){return this.a.cA()},
$S:3}
A.jp.prototype={
$1(a){return this.a.cA()},
$S:3}
A.jq.prototype={
$1(a){return this.a.bB()},
$S:3}
A.jr.prototype={
$1(a){var s=t.mV.a(A.pG(t.V.a(a).target)),r=!1
if(s!=null)if(!B.f.A(this.a,s)){r=this.b
r=r!=null&&!J.nv(r,s)}if(r){r=this.b.style
r.display="none"}},
$S:1}
A.js.prototype={
$1(a){t.V.a(a)
return this.a.bc()},
$S:1}
A.kf.prototype={
$1(a){var s,r
t.P.a(a)
s=J.z(a)
r=this.a
return B.a.A(J.L(s.i(a,"owner_name")).toLowerCase(),r)||B.a.A(J.L(s.i(a,"account_number")).toLowerCase(),r)},
$S:0}
A.kg.prototype={
$1(a){var s,r,q,p
t.P.a(a)
s=document.createElement("div")
s.className="search-result-item"
r=J.z(a)
q=J.J(s)
q.sU(s,A.h(r.i(a,"owner_name"))+" ("+A.h(r.i(a,"account_number"))+")")
q=q.gaA(s)
r=this.c
p=q.$ti
A.A(q.a,q.b,p.h("~(1)?").a(new A.ke(this.a,this.b,a,r)),!1,p.c)
r.appendChild(s).toString},
$S:5}
A.ke.prototype={
$1(a){var s,r,q,p=this
t.V.a(a)
s=p.c
r=J.z(s)
B.f.sI(p.b,A.h(r.i(s,"owner_name"))+" ("+A.h(r.i(s,"account_number"))+")")
q=p.d.style
q.display="none"
p.a.by(A.an(r.i(s,"house_id")))},
$S:1}
A.kn.prototype={
$2(a,b){var s=document.getElementById(a)
if(s!=null)J.v(s,b)},
$S:7}
A.jC.prototype={
$1(a){var s,r,q,p,o,n,m="status"
t.P.a(a)
s=document.createElement("div")
r=J.z(a)
s.className="bill-record-card "+A.h(r.i(a,m))
q=r.i(a,"date")
q=A.cI(J.L(q==null?"":q))
p=q==null?null:q.b9()
o=p==null?"Unknown date":""+A.cl(p)+"/"+A.dV(p)+"/"+A.bA(p)+" "+B.a.a2(B.c.l(A.bW(p)),2,"0")+":"+B.a.a2(B.c.l(A.cT(p)),2,"0")
q=A.h(r.i(a,"billing_month"))
n=J.l(r.i(a,m),"Paid")?"var(--alert-green)":"var(--amber-safety)"
J.dk(s,'          <div class="bill-record-header">\n            <span>Cycle: '+q+'</span>\n            <span style="color:'+n+'">'+J.L(r.i(a,m)).toUpperCase()+'</span>\n          </div>\n          <div class="bill-record-details">\n            <span>Readings: '+B.e.K(A.ad(r.i(a,"previous_reading")),1)+" \u2192 "+B.e.K(A.ad(r.i(a,"current_reading")),1)+" m\xb3</span>\n            <strong>\u20b1"+B.e.K(A.ad(r.i(a,"total_due")),2)+'</strong>\n          </div>\n          <div style="font-size:9px;color:var(--text-muted);margin-top:2px;display:flex;justify-content:space-between">\n            <span>'+o+" ("+A.h(r.i(a,"bill_id"))+")</span>\n            <span>Tech: "+A.h(r.i(a,"billed_by"))+"</span>\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:5}
A.kk.prototype={
$0(){J.c7(this.a).B(0,"show")},
$S:2}
A.kh.prototype={
$1(a){return J.c7(t.h.a(a)).B(0,"active")},
$S:8}
A.ki.prototype={
$1(a){return B.a.u(A.w(a)).length!==0},
$S:9}
A.kj.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:10}
A.j_.prototype={
$2(a,b){return this.a&&typeof a=="number"&&isFinite(a)?B.e.K(a,b):"N/A"},
$S:23}
A.k_.prototype={
$1(a){return B.a.u(A.w(a)).length!==0},
$S:9}
A.k0.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:10}
A.k1.prototype={
$1(a){return A.h(J.m(t.P.a(a),"status")).toLowerCase()!=="paid"},
$S:0}
A.k2.prototype={
$1(a){return J.l(J.m(t.P.a(a),"billing_month"),this.a)},
$S:0}
A.k3.prototype={
$2(a,b){var s=document.getElementById(a)
if(s!=null)J.v(s,b)},
$S:7}
A.k4.prototype={
$2(a,b){return a==null?"--":B.e.K(A.bJ(A.h(a)),b)},
$S:23}
A.k5.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c="status",b="payment_date"
t.P.a(a)
s=document
r=s.createElement("div")
q=J.z(a)
r.className="bill-record-card "+A.h(q.i(a,c))
p=q.i(a,"date")
p=A.cI(J.L(p==null?"":p))
o=p==null?null:p.b9()
n=o==null?"Unknown date":""+A.cl(o)+"/"+A.dV(o)+"/"+A.bA(o)+" "+B.a.a2(B.c.l(A.bW(o)),2,"0")+":"+B.a.a2(B.c.l(A.cT(o)),2,"0")
p=A.h(q.i(a,"billing_month"))
m=J.l(q.i(a,c),"Paid")?"var(--alert-green)":"var(--amber-safety)"
l=J.L(q.i(a,c))
k=B.e.K(A.ad(q.i(a,"previous_reading")),1)
j=B.e.K(A.ad(q.i(a,"current_reading")),1)
i=B.e.K(A.ad(q.i(a,"consumption")),1)
h=B.e.K(A.ad(q.i(a,"total_due")),2)
g=A.h(q.i(a,"bill_id"))
if(J.l(q.i(a,c),"Paid")){f=q.i(a,b)
f=J.L(f==null?"":f).length!==0}else f=!1
f=f?" | Paid: "+A.h(q.i(a,b)):""
J.dk(r,'        <div class="bill-record-header">\n          <span>Cycle: '+p+'</span>\n          <span style="color:'+m+'">'+l.toUpperCase()+'</span>\n        </div>\n        <div class="bill-record-details">\n          <span>Usage: '+k+" \u2192 "+j+" m\xb3 ("+i+" m\xb3)</span>\n          <strong>\u20b1"+h+'</strong>\n        </div>\n        <div style="font-size:9px;color:var(--text-muted);margin-top:2px;">\n          Bill Ref ID: '+g+" | Issued: "+n+f+"\n        </div>\n      ")
e=t.eO.a(q.i(a,"billing_breakdown"))
d=s.createElement("p")
s=d.style
s.fontSize="11px"
if(e==null)s="Legacy bill: rate breakdown unavailable. Original total retained."
else{s=J.z(e)
s="Recorded: base PHP "+A.h(s.i(e,"base_rate"))+" (includes "+A.h(s.i(e,"included_m3"))+" m\xb3), excess "+A.h(s.i(e,"excess_m3"))+" m\xb3 x PHP "+A.h(s.i(e,"excess_rate"))+" = PHP "+A.h(s.i(e,"excess_charge"))+", environmental fee PHP "+A.h(s.i(e,"environmental_fee"))+"."}B.k.sU(d,s)
r.appendChild(d).toString
this.b.appendChild(r).toString},
$S:5}
A.iV.prototype={
$1(a){var s,r
t.h.a(a)
s=J.ah(a)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.iU(a)),!1,r.c)},
$S:8}
A.iU.prototype={
$1(a){var s,r,q,p,o
t.V.a(a).preventDefault()
s=t.f_.a(this.a)
r=document
r.toString
q=s.getAttribute("data-"+new A.hc(new A.ed(s)).b1("togglePassword"))
p=t.G.a(r.getElementById(q==null?"":q))
if(p==null)return
o=p.type==="password"
B.f.sco(p,o?"text":"password")
B.n.sU(s,o?"Hide":"Show")},
$S:1}
A.iW.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.iX.prototype={
$1(a){return this.dU(t.V.a(a))},
dU(a){var s=0,r=A.U(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h,g,f
var $async$$1=A.V(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:g=o.a
if(g!=null){g=g.style
g.display="flex"}g=o.b
k=g==null
if(!k)J.v(g,"Loading available puroks...")
q=3
s=6
return A.y($.O().fk("/api/puroks",!1),$async$$1)
case 6:n=c
m=t.gH.a(document.getElementById("reg-res-purok"))
j=m
j.children.toString
J.ip(j)
j=n.responseText
j.toString
j=J.b_(t.R.a(J.m(B.d.M(0,j),"puroks")))
while(j.p()){l=j.gt(j)
J.qK(m,A.rt(A.h(l),A.h(l),null,!1))}if(!k){A.eJ(t.af,t.h,"T","querySelectorAll")
i=new A.bi(J.qG(m,"option"),t.gp)
J.v(g,new A.e3(t.e3.a(i.ar(i)),t.eG).gj(0)===0?"No puroks configured. Contact the administrator.":"")}q=1
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
if(!J.l(l.$1("reg-password"),l.$1("reg-verify-password"))){h=m.c
if(h!=null)J.v(h,"Passwords do not match.")
s=1
break}h.disabled=!0
g=m.c
f=g==null
if(!f)J.v(g,"Submitting registration...")
p=4
e=t.N
s=7
return A.y($.O().ac("/api/residents/register",!1,"POST",A.a3(["Content-Type","application/json"],e,e),B.d.V(A.a3(["owner_name",J.ot(l.$1("reg-res-name")),"contact",J.ot(l.$1("reg-contact")),"purok",t.gH.a(document.getElementById("reg-res-purok")).value,"password",l.$1("reg-password"),"verify_password",l.$1("reg-verify-password")],e,t.jv))),$async$$1)
case 7:k=a0
e=k.responseText
e.toString
j=B.d.M(0,e)
m.b.reset()
if(!f)J.v(g,"Registration submitted. Resident ID: "+A.h(J.m(j,"house_id"))+". Meter ID: "+A.h(J.m(j,"account_number"))+". Wait for Admin approval before signing in.")
n.push(6)
s=5
break
case 4:p=3
c=o.pop()
e=A.al(c)
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
$S:33}
A.iZ.prototype={
$1(a){var s=t.fY.a(document.getElementById(a)).value
return s==null?"":s},
$S:10}
A.iz.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=this.a
if(s.a==null||s.c==null||$.O().r.i(0,"allow_worker_collection")!=="true"){s.F("Field payment collection is disabled. Payments must be settled in person at Barangay Hall.")
return}r=t.G.a(document.getElementById("collect-hh-name"))
if(r!=null){q=$.O()
p=s.c
p.toString
p=q.ai(p)
if(p==null)q=null
else{q=J.m(p,"owner_name")
q=q==null?null:J.L(q)}if(q==null){s=s.c
s.toString}else s=q
B.f.sI(r,s)}s=this.b
if(s!=null)B.f.sI(s,"")
s=this.c
if(s!=null){s=s.style
s.display="flex"}},
$S:1}
A.iA.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.iB.prototype={
$1(a){return this.dT(t.V.a(a))},
dT(a1){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0
var $async$$1=A.V(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:b=m.a
a=!0
if(b.c!=null)if(b.a!=null){a=m.b.disabled
a.toString}if(a){s=1
break}a=m.c
a=a==null?null:a.value
f=A.dY(a==null?"":a)
l=f==null?0:f
a=l
if(typeof a!=="number"){q=a.hd()
s=1
break}if(a<=0){b.F("Please enter a valid payment amount!")
s=1
break}a=m.d
e=a==null?null:a.value
k=e==null?"Cash":e
a=b.a.i(0,"worker_id")
if(a==null)a=b.a.i(0,"name")
j=J.L(a==null?"Collector":a)
i=window.localStorage.getItem("waterhall_jwt")
a=b.c
a.toString
h=a
a=m.b
a.disabled=!0
p=4
s=7
return A.y($.O().bw(l,j,h,k),$async$$1)
case 7:g=a3
if(!J.l(i,window.localStorage.getItem("waterhall_jwt"))||b.a==null){n=[1]
s=5
break}d=m.e
if(d!=null){d=d.style
d.display="none"}b.F("Collection recorded! TxID: "+A.h(J.m(g,"transaction_id")))
b.ci(h)
n.push(6)
s=5
break
case 4:p=3
a0=o.pop()
if(J.l(i,window.localStorage.getItem("waterhall_jwt")))b.F("Collection not saved. Check device storage and existing pending payments.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
a.disabled=!1
s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$$1,r)},
$S:4}
A.iS.prototype={
$0(){var s,r,q,p,o,n,m,l=this.a
if(l.d==null||!$.O().N())return
try{s=window.localStorage
s.toString
r=A.bk()
q=this.b
q=q==null?null:q.value
p=this.c
p=p==null?null:p.value
o=l.f
n=document.getElementById("resident-photo-name")
n=n==null?null:n.textContent
s.setItem("waterhall_resident_report_draft",B.d.V(A.a3(["owner",r,"category",q,"description",p,"photo",o,"file_name",n,"operation_id",l.as,"picker_pending",l.r!=null],t.N,t.X)))}catch(m){l.F("Device storage is full. Keep this screen open to retain your draft.")}},
$S:2}
A.iT.prototype={
$2(a,b){var s,r,q,p,o
this.a.f=a
s=document
r=s.getElementById("resident-photo-name")
if(r!=null)J.v(r,b)
q=s.getElementById("resident-photo-preview")
r=q==null
if(!r)J.eM(q).a0(0)
if(!r){p=q.style
p.display="block"}o=A.oH(a)
B.F.sfi(o,"Selected evidence preview")
if(!r)q.appendChild(o).toString
r=s.getElementById("resident-photo-preview-card")
if(r!=null){r=r.style
r.display="block"}s=s.getElementById("resident-photo-pickers")
if(s!=null){s=s.style
s.display="none"}},
$S:7}
A.iv.prototype={
dQ(a2,a3){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$$2=A.V(function(a4,a5){if(a4===1){o.push(a5)
s=p}for(;;)switch(s){case 0:a=m.a
a0=++a.x
a.y=!0
l=window.localStorage.getItem("waterhall_jwt")
p=4
k=A.lQ("^data:image/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$").dh(a2)
if(k==null)throw A.b(B.v)
if(a2.length<=2796302){e=k.b
if(2>=e.length){q=A.e(e,2)
n=[1]
s=5
break}e=e[2]
e.toString
e=B.u.b3(e).length>2097152}else e=!0
if(e){e=A.N("Photo too large")
throw A.b(e)}j=A.oH(null)
i=new A.bF(new A.W($.Q,t.cU),t.ou)
e=t.h
d=t.E
c=d.h("~(1)?")
d=d.c
h=A.A(e.a(j),"load",c.a(new A.iw(i)),!1,d)
g=A.A(e.a(j),"error",c.a(new A.ix(i)),!1,d)
p=7
J.r_(j,a2)
s=10
return A.y(i.a.dI(0,B.D),$async$$2)
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
case 9:if(!J.l(a0,a.x)||!J.l(l,window.localStorage.getItem("waterhall_jwt"))||a.d==null){n=[1]
s=5
break}a.as=null
m.b.$2(a2,a3)
m.c.$0()
n.push(6)
s=5
break
case 4:p=3
a1=o.pop()
f=A.al(a1)
if(!J.l(a0,a.x)||!J.l(l,window.localStorage.getItem("waterhall_jwt"))||a.d==null){n=[1]
s=5
break}a.F(f instanceof A.bp?"Photo must be at most 2 MiB.":"Invalid image. Use a JPEG, PNG or WebP photo.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.l(a0,a.x))a.y=!1
s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$$2,r)},
$2(a,b){return this.dQ(a,b)},
$S:56}
A.iw.prototype={
$1(a){var s=this.a
if((s.a.a&30)===0)s.ft(0)},
$S:3}
A.ix.prototype={
$1(a){var s=this.a
if((s.a.a&30)===0)s.bo(B.v)},
$S:3}
A.iH.prototype={
$4(a,b,c,d){var s=this.a
if(s.d==null||a==null||!J.l(a,s.r))return
s.r=null
this.b.$0()
if(typeof d=="string"&&d.length!==0){s.F(d)
return}if(typeof b=="string"&&b.length!==0){s=typeof c=="string"&&c.length!==0?c:"Selected photo"
this.c.$2(b,s)}},
$C:"$4",
$R:4,
$S:57}
A.iR.prototype={
$2(a,b){var s,r,q,p,o,n="NativePhotoPicker",m=this.a
if(m.d==null||m.z||!$.O().N())return
r=$.dj()
if(!r.b5(n)){m=a==null
if(!m)B.f.sI(a,"")
if(!m)a.click()
return}if(m.r!=null)return
s=""+1000*Date.now()+"-"+ ++m.w
m.r=s
q=this.b
q.$0()
try{p=t.N
r.i(0,n).c5("postMessage",A.C([B.d.V(A.a3(["request_id",s,"source",b],p,p))],t.s))}catch(o){m.r=null
q.$0()
m.F("Could not open the photo picker. Please try again.")}},
$S:58}
A.iy.prototype={
$0(){var s,r,q=this,p=q.a;++p.x
p.y=!1
p.f=null
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
if(r!=null)J.eM(r).a0(0)
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
if(d.d==null||d.z){s=1
break}h=a==null?null:a.files
if(h==null||h.length===0){s=1
break}l=B.a8.gC(h)
g=l.size
g.toString
if(g>2097152){d.F("Photo must be at most 2 MiB.")
s=1
break}g=l.type
if(!B.b.A(A.C(["image/jpeg","image/png","image/webp"],t.s),g.toLowerCase())){d.F("Use a JPEG, PNG or WebP photo.")
s=1
break}k=window.localStorage.getItem("waterhall_jwt")
j=++d.x
d.y=!0
p=4
g=new FileReader()
g.toString
B.a9.fY(g,l)
i=g
s=7
return A.y(new A.cq(t.O.a(i),"load",!1,t.h6).gC(0).dI(0,B.D),$async$$1)
case 7:if(!J.l(j,d.x)||!J.l(k,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}g=A.w(J.qR(i))
f=l.name
f.toString
s=8
return A.y(m.b.$2(g,f),$async$$1)
case 8:n.push(6)
s=5
break
case 4:p=3
c=o.pop()
if(J.l(j,d.x)&&J.l(k,window.localStorage.getItem("waterhall_jwt")))d.F("Could not load selected photo.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.l(j,d.x))d.y=!1
s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$$1,r)},
$S:59}
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
if(s.z)return
s.as=s.r=null
this.b.$0()
this.c.$0()
s.F("Photo removed.")},
$S:1}
A.iP.prototype={
$1(a){var s,r=this.a
r.as=null
s=r.ax
if(s!=null)s.a4(0)
r.ax=A.fT(B.a6,this.b)},
$S:3}
A.iE.prototype={
$0(){var s,r,q,p,o=this,n="category",m=o.a
if(m.d==null)return
o.b.$0()
try{r=window.localStorage.getItem("waterhall_resident_report_draft")
s=B.d.M(0,r==null?"{}":r)
if(!J.l(J.m(s,"owner"),A.bk()))return
r=o.c
if(r!=null){q=A.an(J.m(s,"description"))
B.m.sI(r,q==null?"":q)}if(typeof J.m(s,n)=="string"){r=o.d
if(r!=null)B.o.sI(r,A.an(J.m(s,n)))}m.as=A.an(J.m(s,"operation_id"))
if(typeof J.m(s,"photo")=="string"){r=A.w(J.m(s,"photo"))
q=A.an(J.m(s,"file_name"))
if(q==null)q="Selected photo"
o.e.$2(r,q)}if(J.l(J.m(s,"picker_pending"),!0))o.f.$2(null,"recover")}catch(p){m.F("Draft could not be restored. Please select your photo again.")}},
$S:2}
A.iF.prototype={
$1(a){return this.dS(t.V.a(a))},
dS(a9){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
var $async$$1=A.V(function(b0,b1){if(b0===1){o.push(b1)
s=p}for(;;)switch(s){case 0:a7=m.a
if(a7.d==null||a7.z){s=1
break}if(a7.r!=null||a7.y){a7.F("Finish or cancel the photo picker first.")
s=1
break}c=document
b=t.Y.a(c.getElementById("resident-issue-category"))
l=t.q.a(c.getElementById("resident-log-desc"))
a=b==null?null:b.value
k=a==null?"Water Leak":a
c=l
if(c==null)a0=null
else{c=c.value
c=c==null?null:B.a.u(c)
a0=c}j=a0==null?"":a0
if(J.a8(j)===0){a7.F("Please provide details for the report!")
s=1
break}if(!$.O().N()){s=1
break}i=window.localStorage.getItem("waterhall_jwt")
if(a7.as==null)a7.as=A.im()
c=a7.ax
if(c!=null)c.a4(0)
m.b.$0()
a7.z=!0
h=++a7.Q
c=a7.fx
c===$&&A.av()
a1=t.h
A.eJ(a1,a1,"T","querySelectorAll")
c=c.querySelectorAll("button, input, textarea, select")
c.toString
a1=t.U
a2=a1.h("I<k.E>")
a3=A.a4(new A.I(new A.bi(c,a1),a1.h("H(k.E)").a(new A.iu()),a2),a2.h("f.E"))
g=a3
for(c=g,a1=c.length,a4=0;a4<c.length;c.length===a1||(0,A.aB)(c),++a4)c[a4].setAttribute("disabled","")
p=4
c=$.O()
a1=a7.d
a1.toString
a2=a7.f
a5=a7.as
a5.toString
s=7
return A.y(c.be(a1,k,j,a2,a5),$async$$1)
case 7:f=b1
if(!J.l(i,window.localStorage.getItem("waterhall_jwt"))||a7.d==null){n=[1]
s=5
break}if(!f)throw A.b(B.p)
a7.F("Report submitted successfully.")
if(l!=null)B.m.sI(l,"")
m.c.$0()
a7.as=null
c=window.localStorage
c.toString
B.j.B(c,"waterhall_resident_report_draft")
n.push(6)
s=5
break
case 4:p=3
a8=o.pop()
c=A.al(a8)
if(c instanceof A.aH){e=c
if(e.b||!J.l(i,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}if(e.a===413)c="Photo is too large. Choose a smaller photo; your draft is retained."
else if(e.a===400||e.a===422)c="Report or photo was rejected. Review your draft and retry."
else c=e.a===403?"This account cannot submit this report. Your draft is retained.":"Report was not confirmed. Your draft and photo are retained; retry when connected."
a7.F(c)}else if(J.l(i,window.localStorage.getItem("waterhall_jwt")))a7.F("Report was not confirmed. Your draft and photo are retained.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.l(h,a7.Q)){a7.z=!1
for(a7=g,c=a7.length,a4=0;a4<a7.length;a7.length===c||(0,A.aB)(a7),++a4){d=a7[a4]
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
$S:60}
A.iG.prototype={
$1(a){return this.dR(t.V.a(a))},
dR(a){var s=0,r=A.U(t.H),q=this,p
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:p=q.a
p.F("Testing server connection...")
s=2
return A.y($.O().b7(),$async$$1)
case 2:if(c)p.F("Server connected! Online sync active.")
else p.F("Server unreachable. Continuing in offline mode.")
return A.S(null,r)}})
return A.T($async$$1,r)},
$S:4}
A.aH.prototype={
gh9(){var s=this.a
return s==null||s===429||s>=500},
l(a){return"API request was not completed."}}
A.kv.prototype={
d9(a){return this.ch=this.ch.dd(new A.ky()).dH(new A.kz(a),t.H)},
aS(a){return this.e8(a)},
e8(a){var s=0,r=A.U(t.H),q=1,p=[],o=this,n,m,l
var $async$aS=A.V(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:m=++o.ay
window.localStorage.setItem("waterhall_jwt",a)
o.y=null
q=3
s=6
return A.y(o.d9(a),$async$aS)
case 6:if(!J.l(m,o.ay)||!o.N())throw A.b(B.i)
q=1
s=5
break
case 3:q=2
l=p.pop()
s=J.l(m,o.ay)?7:8
break
case 7:s=9
return A.y(o.ao(!0),$async$aS)
case 9:case 8:throw A.b(B.i)
s=5
break
case 2:s=1
break
case 5:return A.S(null,r)
case 1:return A.R(p.at(-1),r)}})
return A.T($async$aS,r)},
ao(a){var s=0,r=A.U(t.H),q=1,p=[],o=this,n,m,l,k
var $async$ao=A.V(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:++o.ay
o.z=!1
o.as=o.Q=null
o.ax.a0(0)
n=window
n.toString
m=document.createEvent("Event")
m.toString
J.qF(m,"waterhall-session-ending",!0,!0)
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
o.dg()
o.y=a?"Session expired. Please sign in again.":null
n=o.CW
if(n!=null)n.$1(a)
n=o.cx
n.m(0,o.X())
q=3
s=6
return A.y(o.d9(null),$async$ao)
case 6:q=1
s=5
break
case 3:q=2
k=p.pop()
o.y="Unable to clear native session storage. Please restart the app."
n.m(0,o.X())
s=5
break
case 2:s=1
break
case 5:return A.S(null,r)
case 1:return A.R(p.at(-1),r)}})
return A.T($async$ao,r)},
c8(){return this.ao(!1)},
N(){if(A.dg())return!0
if(window.localStorage.getItem("waterhall_jwt")!=null||window.localStorage.getItem("waterhall_session")!=null||window.localStorage.getItem("waterhall_resident_session")!=null)this.ao(!0)
return!1},
bR(){var s=this
s.x=!1
s.y="Server unavailable. Pending operations remain saved and will retry."
s.cx.m(0,s.X())},
ac(a,b,c,d,e){return this.fl(a,b,c,t.lG.a(d),e)},
c3(a,b,c,d){return this.ac(a,!0,b,c,d)},
fk(a,b){return this.ac(a,b,"GET",null,null)},
fj(a){return this.ac(a,!0,"GET",null,null)},
fl(a9,b0,b1,b2,b3){var s=0,r=A.U(t.la),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
var $async$ac=A.V(function(b5,b6){if(b5===1){o.push(b6)
s=p}for(;;)switch(s){case 0:a5=A.nS().dD(a9)
a6=J.qQ(a5)
a7=A.nS()
if(a6!==a7.gcj(a7)||!B.a.O(J.or(a5),"/api/"))throw A.b(B.p)
if(b0&&!m.N())throw A.b(B.i)
l=m.ay
k=window.localStorage.getItem("waterhall_jwt")
a6=new XMLHttpRequest()
a6.toString
j=a6
i=new A.bF(new A.W($.Q,t.ax),t.cz)
h=A.C([],t.dw)
g=null
f=new A.kG(i)
p=4
J.qV(j,b1,a9)
if(b2==null){a6=t.N
a6=A.ap(a6,a6)}else a6=b2
a6.q(0,J.qT(j))
if(b0)J.r0(j,"Authorization","Bearer "+A.h(k))
a6=t.O
a7=t.gn
a2=t.D
J.nu(h,A.A(a6.a(j),"load",a7.a(new A.kC(i,j)),!1,a2))
J.nu(h,A.A(a6.a(j),"error",a7.a(new A.kD(f)),!1,a2))
J.nu(h,A.A(a6.a(j),"abort",a7.a(new A.kE(f)),!1,a2))
g=A.fT(B.a5,new A.kF(f,j))
J.qY(j,b3)
s=7
return A.y(i.a,$async$ac)
case 7:e=b6
if(b0)a6=!J.l(l,m.ay)||!m.N()
else a6=!1
if(a6)throw A.b(B.i)
if(e.status===401&&b0){m.ao(!0)
throw A.b(B.Q)}a6=!0
if(e.status!=null){a7=e.status
a7.toString
if(a7>=200){a6=e.status
a6.toString
a6=a6>=300}}if(a6){d=null
if(!b0&&J.or(a5)==="/api/login"){d=e.status===429?"Too many attempts. Please try again in 5 minutes.":"Invalid credentials."
try{a6=e.responseText
c=B.d.M(0,a6==null?"{}":a6)
b=J.m(c,"attempts_remaining")
if(e.status===401&&A.eG(b)&&b>=0&&b<=4)d="Invalid credentials. "+A.h(b)+" attempts remaining."
if(e.status===403)d=J.l(J.m(c,"account_status"),"pending")?"Registration is pending Admin approval.":"Registration was rejected. Contact the administrator."}catch(b4){}}a6=e.status===0?null:e.status
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
a=A.al(a8)
if(!J.l(l,m.ay))throw A.b(B.i)
a0=a instanceof A.aH?a:B.p
if(!a0.b&&a0.gh9())m.bR()
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
return A.y(J.iq(a1),$async$ac)
case 11:case 9:a6.length===a7||(0,A.aB)(a6),++a4
s=8
break
case 10:s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$ac,r)},
X(){var s,r,q,p,o,n,m=this,l=m.aP().length+m.ah().length,k=m.x
if(!k)s="offline"
else if(m.db)s="syncing"
else s=l>0?"pending_sync":"synced"
r=m.db||m.cy
q=A.dg()
p=m.aP()
o=A.G(p)
o=new A.I(p,o.h("H(1)").a(new A.kT()),o.h("I<1>")).gj(0)
p=m.ah()
n=A.G(p)
return A.a3(["status",s,"isOnline",k,"isSyncing",r,"authenticated",q,"reviewCount",o+new A.I(p,n.h("H(1)").a(new A.kU()),n.h("I<1>")).gj(0),"pendingCount",l,"error",m.y],t.N,t.z)},
fg(){var s=window.localStorage.getItem("waterhall_unsynced_actions")
s=J.cE(t.j.a(B.d.M(0,s==null?"[]":s)),new A.kB(),t.P)
s=A.a4(s,s.$ti.h("ag.E"))
return s},
ah(){var s=this.fg(),r=A.G(s),q=r.h("I<1>")
s=A.a4(new A.I(s,r.h("H(1)").a(new A.l4()),q),q.h("f.E"))
return s},
aq(a,b){return this.fX(a,t.P.a(b))},
fX(a,b){var s=0,r=A.U(t.H),q=this,p
var $async$aq=A.V(function(c,d){if(c===1)return A.R(d,r)
for(;;)switch(s){case 0:if(!q.N())throw A.b(B.i)
p=b.i(0,"operation_id")
if(p==null)p=A.im()
b.k(0,"operation_id",p)
s=2
return A.y(A.cC("actions",new A.l5(p,a,b)),$async$aq)
case 2:q.cx.m(0,q.X())
s=q.x?3:4
break
case 3:s=5
return A.y(q.a9(),$async$aq)
case 5:case 4:return A.S(null,r)}})
return A.T($async$aq,r)},
a9(){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$a9=A.V(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:if(m.cy||!m.N()){s=1
break}m.cy=!0
l=m.ay
f=m.ah()
B.b.bd(f,new A.l9())
k=f
p=4
e=k,e=A.nO(e,0,A.cy(100,"count",t.S),A.G(e).c),d=e.$ti,e=new A.by(e,e.gj(0),d.h("by<ag.E>")),c=t.N,d=d.h("ag.E")
case 7:if(!e.p()){s=8
break}b=e.d
j=b==null?d.a(b):b
if(!J.l(l,m.ay)||!m.N()){s=8
break}s=9
return A.y(A.cC("actions",new A.la(j)),$async$a9)
case 9:p=11
s=14
return A.y(m.c3(A.w(J.m(j,"endpoint")),"POST",A.a3(["Content-Type","application/json"],c,c),B.d.V(J.m(j,"body"))),$async$a9)
case 14:i=a3
b=i.responseText
h=B.d.M(0,b==null?"{}":b)
if(!J.l(l,m.ay)||!m.N()){s=8
break}if(!J.l(J.m(h,"status"),"success"))throw A.b(B.R)
s=15
return A.y(A.cC("actions",new A.lb(j)),$async$a9)
case 15:p=4
s=13
break
case 11:p=10
a0=o.pop()
b=A.al(a0)
s=b instanceof A.aH?16:18
break
case 16:g=b
if(!g.b){b=g.a
b=b==null||b===429||b>=500}else b=!0
if(b)throw a0
s=19
return A.y(A.cC("actions",new A.lc(j)),$async$a9)
case 19:s=17
break
case 18:throw a0
case 17:s=13
break
case 10:s=4
break
case 13:s=7
break
case 8:if(J.l(l,m.ay))m.y=B.b.ab(m.ah(),new A.ld())?"Saved operations need review. Their original data remains on this device.":null
n.push(6)
s=5
break
case 4:p=3
a1=o.pop()
if(J.l(l,m.ay)&&A.dg()&&m.x)m.y="Pending operations remain saved for retry."
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.cy=!1
m.cx.m(0,m.X())
s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$a9,r)},
dg(){var s,r,q,p=this
for(s=B.I.gaz(B.I),s=s.gE(s);s.p();){r=s.gt(s)
q=r.a
if(q!=="offlineCollections"&&q!=="unsyncedActions"){q=window.localStorage
r=r.b
q.getItem(r)
q.removeItem(r)}}s=t.t
p.a=A.C([],s)
p.d=A.C([],s)
p.e=A.C([],s)
p.c=A.C([],s)
p.f=A.C([],s)
s=t.N
r=t.z
p.b=A.ap(s,r)
p.r=A.ap(s,s)
p.w=A.ap(s,r)},
eQ(){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=window.localStorage.getItem("waterhall_households")
if(s!=null)i.a=A.aU(t.R.a(B.d.M(0,s)),!0,t.P)
r=window.localStorage.getItem("waterhall_central_assets")
if(r!=null)i.b=A.aq(t.f.a(B.d.M(0,r)),t.N,t.z)
q=window.localStorage.getItem("waterhall_maintenance_logs")
if(q!=null)i.c=A.aU(t.R.a(B.d.M(0,q)),!0,t.P)
p=window.localStorage.getItem("waterhall_workers")
if(p!=null)i.d=A.aU(t.R.a(B.d.M(0,p)),!0,t.P)
o=window.localStorage.getItem("waterhall_billing_records")
if(o!=null)i.e=A.aU(t.R.a(B.d.M(0,o)),!0,t.P)
n=window.localStorage.getItem("waterhall_announcements")
if(n!=null)i.f=A.aU(t.R.a(B.d.M(0,n)),!0,t.P)
m=window.localStorage.getItem("waterhall_billing_config")
if(m!=null)i.w=A.aq(t.f.a(B.d.M(0,m)),t.N,t.z)
l=window.localStorage.getItem("waterhall_payment_settings")
k=t.N
if(l!=null)i.r=A.aq(t.f.a(B.d.M(0,l)),k,k)
else i.r=A.aq($.q2,k,k)}catch(j){A.c5("Unable to load local cache.")}},
aH(){var s,r,q=this
try{s=window.localStorage
s.toString
s.setItem("waterhall_households",B.d.V(q.a))
s=window.localStorage
s.toString
s.setItem("waterhall_central_assets",B.d.V(q.b))
s=window.localStorage
s.toString
s.setItem("waterhall_maintenance_logs",B.d.V(q.c))
s=window.localStorage
s.toString
s.setItem("waterhall_workers",B.d.V(q.d))
s=window.localStorage
s.toString
s.setItem("waterhall_billing_records",B.d.V(q.e))
s=window.localStorage
s.toString
s.setItem("waterhall_announcements",B.d.V(q.f))
s=window.localStorage
s.toString
s.setItem("waterhall_payment_settings",B.d.V(q.r))
s=window.localStorage
s.toString
s.setItem("waterhall_billing_config",B.d.V(q.w))}catch(r){A.c5("Unable to save local cache.")}},
aM(a){return this.h_(a)},
b7(){return this.aM("")},
h_(a1){var s=0,r=A.U(t.y),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0
var $async$aM=A.V(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:if(!m.N()){q=!1
s=1
break}l=window.localStorage.getItem("waterhall_jwt")
if(m.z){f=m.Q
e=l
e=f==null?e==null:f===e
f=e}else f=!1
if(f){q=!1
s=1
break}m.z=!0
m.Q=l
p=4
k=a1.length!==0?"/api/all-data?role="+a1:"/api/all-data"
s=7
return A.y(m.fj(k),$async$aM)
case 7:j=a3
f=j.responseText
f.toString
i=f
if(!J.l(i,m.as)){f=t.P
h=f.a(B.d.M(0,i))
e=J.m(h,"billingConfig")
if(e==null){e=t.z
e=A.ap(e,e)}d=t.f
c=t.N
b=t.z
m.w=A.aq(d.a(e),c,b)
e=t.R
m.a=A.aU(e.a(J.m(h,"households")),!0,f)
m.b=A.aq(d.a(J.m(h,"centralAssets")),c,b)
m.c=A.aU(e.a(J.m(h,"maintenanceLogs")),!0,f)
m.d=A.aU(e.a(J.m(h,"workers")),!0,f)
m.e=A.aU(e.a(J.m(h,"billingRecords")),!0,f)
if(J.nw(h,"announcements"))m.f=A.aU(e.a(J.m(h,"announcements")),!0,f)
if(J.nw(h,"paymentSettings"))m.r=A.aq(d.a(J.m(h,"paymentSettings")),c,c)
m.as=i;++m.at
m.ax.a0(0)
m.aH()}m.x=!0
m.cx.m(0,m.X())
s=8
return A.y(m.a9(),$async$aM)
case 8:if(m.x&&m.N())m.av()
f=m.x&&A.dg()
q=f
n=[1]
s=5
break
n.push(6)
s=5
break
case 4:p=3
a0=o.pop()
g=A.al(a0)
if(!(g instanceof A.aH)||!g.b)m.bR()
q=!1
n=[1]
s=5
break
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
f=m.Q
e=l
if(f==null?e==null:f===e){m.z=!1
m.Q=null}s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$aM,r)},
ad(){var s=0,r=A.U(t.y),q,p=this,o,n,m
var $async$ad=A.V(function(a,b){if(a===1)return A.R(b,r)
for(;;)switch(s){case 0:p.N()
A.nQ(B.a4,new A.kZ(p))
o=window
o.toString
n=t.oV
m=t.A
A.A(o,"focus",n.a(new A.l_(p)),!1,m)
o=window
o.toString
B.O.c2(o,"waterhall-session-expired",new A.l0(p))
o=window
o.toString
B.O.c2(o,"waterhall-request-unavailable",new A.l1(p))
s=3
return A.y(A.di(),$async$ad)
case 3:p.eQ()
if(p.b.a===0)p.b=A.aq($.uQ,t.N,t.z)
if(p.r.a===0){o=t.N
p.r=A.aq($.q2,o,o)}o=window
o.toString
A.A(o,"online",n.a(new A.l2(p)),!1,m)
o=window
o.toString
A.A(o,"offline",n.a(new A.l3(p)),!1,m)
s=4
return A.y(p.b7(),$async$ad)
case 4:q=b
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$ad,r)},
e1(){var s,r,q,p=window.localStorage.getItem("waterhall_offline_collections")
if(p==null)return A.C([],t.t)
try{s=t.j.a(B.d.M(0,p))
r=J.cE(s,new A.kH(),t.P)
r=A.a4(r,r.$ti.h("ag.E"))
return r}catch(q){r=A.C([],t.t)
return r}},
aP(){var s=this.e1(),r=A.G(s),q=r.h("I<1>")
r=A.a4(new A.I(s,r.h("H(1)").a(new A.kS()),q),q.h("f.E"))
return r},
bw(a,b,c,a0){var s=0,r=A.U(t.P),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d
var $async$bw=A.V(function(a1,a2){if(a1===1)return A.R(a2,r)
for(;;)switch(s){case 0:if(!p.N())throw A.b(B.i)
o=p.r.i(0,"allow_worker_collection")
if((o==null?null:o.toLowerCase())!=="true")throw A.b(A.N("Field payment collection is disabled under the Barangay-only payment policy. All payments must be made at the Barangay Hall."))
n=new A.a9(Date.now(),0,!1).a1()
m=A.im()
l=A.a3(["transaction_id",m,"bill_id",null,"house_id",c,"amount_collected",a,"date",n.a8(),"collected_by",b,"payment_method",a0,"sync_status","PENDING","synced_at",null],t.N,t.X)
s=3
return A.y(A.cC("collections",new A.l7(c,b,l)),$async$bw)
case 3:o=p.cx
o.m(0,p.X())
k=B.a.u(c.toUpperCase())
for(j=p.e,i=j.length,h=0;h<j.length;j.length===i||(0,A.aB)(j),++h){g=j[h]
f=J.z(g)
e=f.i(g,"house_id")
d=B.a.u(J.L(e==null?"":e).toUpperCase())
e=f.i(g,"bill_id")
B.a.u(J.L(e==null?"":e).toUpperCase())
e=d===k&&!J.l(f.i(g,"status"),"Paid")
if(e){f.k(g,"status","Pending sync")
f.k(g,"payment_status","Pending sync")}}p.aH()
A.c5("[OFFLINE STORE] Collection recorded locally: "+m+" for "+c+" (\u20b1"+A.h(a)+"). Status: PENDING.")
if(p.x)p.av()
else o.m(0,p.X())
q=l
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$bw,r)},
av(){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d
var $async$av=A.V(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:if(m.db||!m.N()){s=1
break}i=m.aP()
B.b.bd(i,new A.le())
l=A.nO(i,0,A.cy(100,"count",t.S),A.G(i).c).ar(0)
if(J.a8(l)===0){m.cx.m(0,m.X())
s=1
break}m.db=!0
h=m.cx
h.m(0,m.X())
k=m.ay
p=4
g=l
f=A.G(g)
j=new A.a0(g,f.h("@(1)").a(new A.lf()),f.h("a0<1,@>")).dJ(0)
s=7
return A.y(A.cC("collections",new A.lg(j)),$async$av)
case 7:s=8
return A.y(m.aa(l,k),$async$av)
case 8:if(J.l(k,m.ay)&&m.N())m.y=B.b.ab(m.aP(),new A.lh())?"Some collections need review. Unacknowledged payments remain saved.":null
n.push(6)
s=5
break
case 4:p=3
d=o.pop()
if(J.l(k,m.ay)&&A.dg()&&m.x)m.y="Sync not confirmed. Pending records remain saved for retry."
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.db=!1
h.m(0,m.X())
s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$av,r)},
aa(a,b){return this.fd(t.p.a(a),b)},
fd(a,b){var s=0,r=A.U(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c
var $async$aa=A.V(function(a0,a1){if(a0===1){o.push(a1)
s=p}for(;;)switch(s){case 0:if(b!==n.ay||!n.N())throw A.b(B.i)
m=null
p=4
g=t.N
s=7
return A.y(n.c3("/api/collections/sync","POST",A.a3(["Content-Type","application/json"],g,g),B.d.V(A.a3(["collections",a],g,t.p))),$async$aa)
case 7:l=a1
f=l.responseText
k=t.P.a(B.d.M(0,f==null?"{}":f))
j=J.m(k,"synced_ids")
if(J.l(J.m(k,"status"),"success")&&t.j.b(j)){g=J.r2(j,g)
e=A.ci(g.$ti.h("f.E"))
e.T(0,g)}else e=A.oP(g)
m=e
p=2
s=6
break
case 4:p=3
c=o.pop()
g=A.al(c)
s=g instanceof A.aH?8:10
break
case 8:i=g
if(i.b||!B.b.A(A.C([400,403,404,409,422],t.b),i.a))throw c
g=a.length
s=g>1?11:12
break
case 11:h=g/2|0
s=13
return A.y(n.aa(B.b.cD(a,0,h),b),$async$aa)
case 13:s=14
return A.y(n.aa(B.b.e9(a,h),b),$async$aa)
case 14:s=1
break
case 12:if(b!==n.ay||!n.N())throw A.b(B.i)
g=i.a===409?"Bill or transaction conflict. Review before retrying.":"Collection rejected (HTTP "+A.h(i.a)+"). Review before retrying."
s=15
return A.y(n.b_(a,A.oP(t.N),g),$async$aa)
case 15:s=1
break
s=9
break
case 10:throw c
case 9:s=6
break
case 3:s=2
break
case 6:if(b!==n.ay||!n.N())throw A.b(B.i)
s=16
return A.y(n.b_(a,m,"Server did not acknowledge this collection. Retry required."),$async$aa)
case 16:n.x=!0
case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$aa,r)},
b_(a,b,c){return this.f5(t.p.a(a),t.i.a(b),c)},
f5(a,b,c){var s=0,r=A.U(t.H),q=this,p
var $async$b_=A.V(function(d,e){if(d===1)return A.R(e,r)
for(;;)switch(s){case 0:p=A.G(a)
s=2
return A.y(A.cC("collections",new A.kw(new A.a0(a,p.h("@(1)").a(new A.kx()),p.h("a0<1,@>")).dJ(0),b,c)),$async$b_)
case 2:q.cx.m(0,q.X())
return A.S(null,r)}})
return A.T($async$b_,r)},
be(a,b,c,d,e){var s=0,r=A.U(t.y),q,p=this,o,n
var $async$be=A.V(function(f,g){if(f===1)return A.R(g,r)
for(;;)switch(s){case 0:n=t.N
s=3
return A.y(p.c3("/api/reports/add","POST",A.a3(["Content-Type","application/json"],n,n),B.d.V(A.a3(["operation_id",e,"household_id",a,"report_type",b,"description",c,"photo_base64",d],n,t.jv))),$async$be)
case 3:n=g.responseText
o=B.d.M(0,n==null?"{}":n)
n=J.z(o)
q=J.l(n.i(o,"status"),"success")&&n.i(o,"report_id")!=null
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$be,r)},
ai(a){var s,r,q=this.a,p=B.a.u(a.toLowerCase()),o=B.a.u(A.qb(p,"hh-",""))
try{s=J.qM(q,new A.kR(p,o))
return s}catch(r){return null}},
ba(a,b){var s=0,r=A.U(t.dZ),q,p=this,o,n,m
var $async$ba=A.V(function(c,d){if(c===1)return A.R(d,r)
for(;;)switch(s){case 0:n=p.a
m=B.b.fI(n,new A.li(a))
s=m!==-1?3:4
break
case 3:if(!(m>=0&&m<n.length)){q=A.e(n,m)
s=1
break}o=A.aq(n[m],t.N,t.z)
o.k(0,"current_leak_status",b)
if(b==="leak")o.k(0,"leak_detected_at",new A.a9(Date.now(),0,!1).a1().a8())
else o.k(0,"leak_detected_at",null)
s=5
return A.y(p.aq("/api/households/update",o),$async$ba)
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
return A.T($async$ba,r)},
bn(a){return this.ff(t.P.a(a))},
ff(a){var s=0,r=A.U(t.P),q,p=this,o,n
var $async$bn=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:o=p.c
n=A.ap(t.N,t.z)
n.k(0,"task_id","PENDING-"+A.im())
n.k(0,"date",new A.a9(Date.now(),0,!1).a1().a8())
n.T(0,a)
s=3
return A.y(p.aq("/api/maintenance-logs/add",n),$async$bn)
case 3:B.b.ce(o,0,n)
p.aH()
q=n
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$bn,r)},
e3(){var s,r,q,p,o,n,m,l,k=t.N,j=A.ap(k,t.P)
for(s=this.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.aB)(s),++q){p=s[q]
j.k(0,A.h(J.m(p,"bill_id")),p)}for(s=this.ah(),r=A.G(s),o=r.h("H(1)").a(new A.kQ()),s=B.b.gE(s),r=new A.bh(s,o,r.h("bh<1>")),o=t.f,n=t.z;r.p();){m=s.gt(0)
l=J.z(m)
p=A.aq(o.a(l.i(m,"body")),k,n)
p.k(0,"status",l.i(m,"sync_error")==null?"Pending sync":"Needs review")
j.k(0,A.h(p.i(0,"bill_id")),p)}k=j.$ti.h("aT<2>")
k=A.a4(new A.aT(j,k),k.h("f.E"))
return k},
bE(a){var s=this.e3(),r=A.G(s),q=r.h("I<1>"),p=A.a4(new A.I(s,r.h("H(1)").a(new A.kO(B.a.u(a.toUpperCase()))),q),q.h("f.E"))
B.b.bd(p,new A.kP())
return p},
e2(a){var s,r,q=B.a.u(a.toUpperCase()),p=this.ah(),o=A.G(p),n=o.h("aE<1,t<c,@>>"),m=n.h("I<f.E>"),l=A.a4(new A.I(new A.aE(new A.I(p,o.h("H(1)").a(new A.kK()),o.h("I<1>")),o.h("t<c,@>(1)").a(new A.kL()),n),n.h("H(f.E)").a(new A.kM(q)),m),m.h("f.E"))
if(l.length!==0){B.b.bd(l,new A.kN())
s=J.m(B.b.gC(l),"current_reading")
if(typeof s=="number")return s}r=this.ai(a)
return A.o4(r==null?null:J.m(r,"current_m3_usage"))},
cb(a,b){var s,r,q=B.a.u(a.toUpperCase()),p=B.a.u(b.toLowerCase())
if(B.b.ab(this.e,new A.kV(q,p)))return!0
s=this.ah()
r=A.G(s)
if(new A.aE(new A.I(s,r.h("H(1)").a(new A.kW()),r.h("I<1>")),r.h("t<c,@>(1)").a(new A.kX()),r.h("aE<1,t<c,@>>")).ab(0,new A.kY(q,p)))return!0
return!1},
aI(a){return this.fe(t.P.a(a))},
fe(a){var s=0,r=A.U(t.P),q,p=this,o,n,m,l
var $async$aI=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:m=a.i(0,"house_id")
l=B.a.u(J.L(m==null?"":m).toUpperCase())
m=a.i(0,"billing_month")
o=B.a.u(J.L(m==null?"":m).toLowerCase())
if(p.cb(l,o))throw A.b(A.N("A bill for this cycle ("+o+") already exists or is pending synchronization."))
m=A.ap(t.N,t.z)
m.k(0,"bill_id","PENDING-"+A.im())
n=a.i(0,"date")
m.k(0,"date",n==null?new A.a9(Date.now(),0,!1).a1().a8():n)
m.k(0,"status","Pending sync")
m.k(0,"is_synced",!1)
m.T(0,a)
s=3
return A.y(p.aq("/api/billing-records/add",m),$async$aI)
case 3:s=p.x&&p.N()?4:6
break
case 4:s=7
return A.y(p.a9(),$async$aI)
case 7:if(!B.b.ab(p.ah(),new A.kA(m))){m.k(0,"is_synced",!0)
m.k(0,"status","Unpaid")}s=p.N()?8:9
break
case 8:s=10
return A.y(p.b7(),$async$aI)
case 10:case 9:s=5
break
case 6:p.aH()
p.cx.m(0,p.X())
case 5:q=m
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$aI,r)},
cs(a){return this.ax.dv(0,a,new A.kJ(this,a))},
ct(a){var s=a.length===0?this.f:this.cs(a),r=J.z(s)
return r.gD(s)?null:r.gC(s)},
bl(a,b,c){var s=0,r=A.U(t.H),q=this,p,o
var $async$bl=A.V(function(d,e){if(d===1)return A.R(e,r)
for(;;)switch(s){case 0:p=t.N
o=A.a3(["message",a,"author",b,"target_audience",c,"timestamp",new A.a9(Date.now(),0,!1).a1().a8()],p,p)
s=2
return A.y(q.aq("/api/announcements/add",o),$async$bl)
case 2:B.b.ce(q.f,0,o)
q.ax.a0(0)
q.aH()
return A.S(null,r)}})
return A.T($async$bl,r)},
sfU(a){this.CW=t.mW.a(a)}}
A.ky.prototype={
$1(a){},
$S:13}
A.kz.prototype={
$1(a){return A.ik(this.a)},
$S:61}
A.kG.prototype={
$0(){var s=this.a
if((s.a.a&30)===0)s.bo(B.p)},
$S:2}
A.kC.prototype={
$1(a){var s
t.D.a(a)
s=this.a
if((s.a.a&30)===0)s.b2(0,this.b)},
$S:20}
A.kD.prototype={
$1(a){t.D.a(a)
return this.a.$0()},
$S:20}
A.kE.prototype={
$1(a){t.D.a(a)
return this.a.$0()},
$S:20}
A.kF.prototype={
$0(){this.a.$0()
this.b.abort()},
$S:2}
A.kT.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.kU.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.kB.prototype={
$1(a){return A.aq(t.f.a(a),t.N,t.z)},
$S:21}
A.l4.prototype={
$1(a){return J.l(J.m(t.P.a(a),"owner"),A.bk())},
$S:0}
A.l5.prototype={
$1(a){return B.b.m(t.p.a(a),A.a3(["operation_id",this.a,"owner",A.bk(),"endpoint",this.b,"body",this.c],t.N,t.z))},
$S:6}
A.l9.prototype={
$2(a,b){var s,r="last_sync_attempt",q=t.P
q.a(a)
q.a(b)
q=J.m(a,r)
q=J.L(q==null?"":q)
s=J.m(b,r)
return B.a.a5(q,J.L(s==null?"":s))},
$S:16}
A.la.prototype={
$1(a){var s,r,q,p,o,n="operation_id"
t.p.a(a)
for(r=a.length,q=this.a,p=J.z(q),o=0;o<a.length;a.length===r||(0,A.aB)(a),++o){s=a[o]
if(J.l(J.m(s,n),p.i(q,n)))J.bm(s,"last_sync_attempt",new A.a9(Date.now(),0,!1).a1().a8())}},
$S:6}
A.lb.prototype={
$1(a){var s
t.p.a(a)
s=A.G(a).h("H(1)").a(new A.l8(this.a))
a.$flags&1&&A.aG(a,16)
B.b.eZ(a,s,!0)
return null},
$S:6}
A.l8.prototype={
$1(a){var s="operation_id"
return J.l(J.m(t.P.a(a),s),J.m(this.a,s))},
$S:0}
A.lc.prototype={
$1(a){var s,r,q,p,o,n="operation_id"
t.p.a(a)
for(r=a.length,q=this.a,p=J.z(q),o=0;o<a.length;a.length===r||(0,A.aB)(a),++o){s=a[o]
if(J.l(J.m(s,n),p.i(q,n)))J.bm(s,"sync_error","Server rejected this saved operation. Review with Admin; the original operation is retained.")}},
$S:6}
A.ld.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.kZ.prototype={
$1(a){t.I.a(a)
return this.a.N()},
$S:19}
A.l_.prototype={
$1(a){return this.a.N()},
$S:3}
A.l0.prototype={
$1(a){t.A.a(a)
this.a.ao(!0)},
$S:18}
A.l1.prototype={
$1(a){var s
t.A.a(a)
s=this.a
if(s.N())s.bR()},
$S:18}
A.l2.prototype={
$1(a){A.c5("[NET] Internet restored. Starting automatic synchronization...")
this.a.b7()},
$S:3}
A.l3.prototype={
$1(a){var s
A.c5("[NET] Internet disconnected. Entering offline mode.")
s=this.a
s.x=!1
s.cx.m(0,s.X())},
$S:3}
A.kH.prototype={
$1(a){return A.aq(t.f.a(a),t.N,t.z)},
$S:21}
A.kS.prototype={
$1(a){var s
t.P.a(a)
s=J.z(a)
return J.l(s.i(a,"sync_status"),"PENDING")&&J.l(s.i(a,"collected_by"),A.bk())},
$S:0}
A.l7.prototype={
$1(a){t.p.a(a)
if(B.b.ab(a,new A.l6(this.a,this.b)))throw A.b(A.N("A collection for this household is already pending"))
B.b.ce(a,0,this.c)},
$S:6}
A.l6.prototype={
$1(a){var s
t.P.a(a)
s=J.z(a)
return J.l(s.i(a,"house_id"),this.a)&&J.l(s.i(a,"collected_by"),this.b)&&J.l(s.i(a,"sync_status"),"PENDING")},
$S:0}
A.le.prototype={
$2(a,b){var s,r="last_sync_attempt",q=t.P
q.a(a)
q.a(b)
q=J.m(a,r)
q=J.L(q==null?"":q)
s=J.m(b,r)
return B.a.a5(q,J.L(s==null?"":s))},
$S:16}
A.lf.prototype={
$1(a){return J.m(t.P.a(a),"transaction_id")},
$S:27}
A.lg.prototype={
$1(a){var s,r,q,p
t.p.a(a)
for(r=a.length,q=this.a,p=0;p<a.length;a.length===r||(0,A.aB)(a),++p){s=a[p]
if(J.l(J.m(s,"collected_by"),A.bk())&&q.A(0,J.m(s,"transaction_id")))J.bm(s,"last_sync_attempt",new A.a9(Date.now(),0,!1).a1().a8())}},
$S:6}
A.lh.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.kx.prototype={
$1(a){return J.m(t.P.a(a),"transaction_id")},
$S:27}
A.kw.prototype={
$1(a){var s,r,q,p,o,n,m,l="transaction_id",k="sync_status",j="sync_error"
t.p.a(a)
for(s=a.length,r=this.c,q=this.b,p=this.a,o=0;o<a.length;a.length===s||(0,A.aB)(a),++o){n=a[o]
m=J.z(n)
if(!J.l(m.i(n,"collected_by"),A.bk())||!p.A(0,m.i(n,l))||!J.l(m.i(n,k),"PENDING"))continue
if(q.A(0,m.i(n,l))){m.k(n,k,"SYNCED")
m.k(n,"synced_at",new A.a9(Date.now(),0,!1).a1().a8())
m.B(n,j)}else m.k(n,j,r)}},
$S:6}
A.kR.prototype={
$1(a){var s,r,q,p,o,n,m
t.P.a(a)
n=J.z(a)
m=n.i(a,"house_id")
s=B.a.u(J.L(m==null?"":m).toLowerCase())
r=B.a.u(A.qb(s,"hh-",""))
m=n.i(a,"account_number")
q=B.a.u(J.L(m==null?"":m).toLowerCase())
m=n.i(a,"owner_name")
p=B.a.u(J.L(m==null?"":m).toLowerCase())
m=A.h(n.i(a,"purok"))
n=n.i(a,"lot")
o=B.a.u((m+" "+A.h(n==null?"":n)).toLowerCase())
n=this.a
return n===s||this.b===r||n===q||n===p||n===o},
$S:0}
A.li.prototype={
$1(a){return J.l(J.m(t.P.a(a),"house_id"),this.a)},
$S:0}
A.kQ.prototype={
$1(a){return J.l(J.m(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.kO.prototype={
$1(a){var s=J.m(t.P.a(a),"house_id")
return B.a.u(J.L(s==null?"":s).toUpperCase())===this.a},
$S:0}
A.kP.prototype={
$2(a,b){var s,r,q="date",p=2026,o=t.P
o.a(a)
o.a(b)
o=J.z(a)
if(o.i(a,q)!=null){o=A.cI(A.w(o.i(a,q)))
s=o==null?A.lj(p):o}else s=A.lj(p)
o=J.z(b)
if(o.i(b,q)!=null){o=A.cI(A.w(o.i(b,q)))
r=o==null?A.lj(p):o}else r=A.lj(p)
return r.a5(0,s)},
$S:16}
A.kK.prototype={
$1(a){return J.l(J.m(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.kL.prototype={
$1(a){return A.aq(t.f.a(J.m(t.P.a(a),"body")),t.N,t.z)},
$S:36}
A.kM.prototype={
$1(a){var s=J.m(t.P.a(a),"house_id")
return B.a.u(J.L(s==null?"":s).toUpperCase())===this.a},
$S:0}
A.kN.prototype={
$2(a,b){var s,r=t.P
r.a(a)
r=J.m(r.a(b),"date")
r=J.L(r==null?"":r)
s=J.m(a,"date")
return B.a.a5(r,J.L(s==null?"":s))},
$S:16}
A.kV.prototype={
$1(a){var s,r
t.P.a(a)
s=J.z(a)
r=s.i(a,"house_id")
if(B.a.u(J.L(r==null?"":r).toUpperCase())===this.a){s=s.i(a,"billing_month")
s=B.a.u(J.L(s==null?"":s).toLowerCase())===this.b}else s=!1
return s},
$S:0}
A.kW.prototype={
$1(a){return J.l(J.m(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.kX.prototype={
$1(a){return A.aq(t.f.a(J.m(t.P.a(a),"body")),t.N,t.z)},
$S:36}
A.kY.prototype={
$1(a){var s,r
t.P.a(a)
s=J.z(a)
r=s.i(a,"house_id")
if(B.a.u(J.L(r==null?"":r).toUpperCase())===this.a){s=s.i(a,"billing_month")
s=B.a.u(J.L(s==null?"":s).toLowerCase())===this.b}else s=!1
return s},
$S:0}
A.kA.prototype={
$1(a){var s="operation_id"
return J.l(J.m(t.P.a(a),s),this.a.i(0,s))},
$S:0}
A.kJ.prototype={
$0(){var s=this.a.f,r=A.G(s),q=r.h("I<1>")
s=A.a4(new A.I(s,r.h("H(1)").a(new A.kI(this.b)),q),q.h("f.E"))
return s},
$S:68}
A.kI.prototype={
$1(a){var s,r="target_audience"
t.P.a(a)
s=J.z(a)
if(!J.l(s.i(a,r),"Everyone")){s=s.i(a,r)
s=J.l(s,this.a==="resident"?"Residents only":"Workers only")}else s=!0
return s},
$S:0}
A.nj.prototype={
$1(a){var s=0,r=A.U(t.a),q=this,p,o,n,m
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:m=q.a
if(m==null||A.bk()!==m)throw A.b(A.N("Session changed before local save"))
m=q.b
p=m==="collections"?"waterhall_offline_collections":"waterhall_unsynced_actions"
o=window.localStorage.getItem(p)
o=J.cE(t.j.a(B.d.M(0,o==null?"[]":o)),new A.ni(),t.P)
n=A.a4(o,o.$ti.h("ag.E"))
q.c.$1(n)
s=2
return A.y(A.n1(m,n),$async$$1)
case 2:return A.S(null,r)}})
return A.T($async$$1,r)},
$S:69}
A.ni.prototype={
$1(a){return A.aq(t.f.a(a),t.N,t.z)},
$S:21}
A.nk.prototype={
$1(a){},
$S:13}
A.n2.prototype={
$1(a){var s,r
t.P.a(a)
s=J.z(a)
r=s.i(a,"owner")
s=r==null?s.i(a,"collected_by"):r
return J.l(s,this.a)},
$S:0}
A.np.prototype={
$1(a){var s,r,q,p,o,n
t.p.a(a)
for(s=a.length,r=this.a,q=0;q<a.length;a.length===s||(0,A.aB)(a),++q){p=a[q]
o=J.z(p)
n=o.i(p,"transaction_id")
r.dv(0,J.L(n==null?o.i(p,"operation_id"):n),new A.no(p))}B.b.a0(a)
B.b.T(a,new A.aT(r,A.B(r).h("aT<2>")))},
$S:6}
A.no.prototype={
$0(){return this.a},
$S:32};(function aliases(){var s=J.cM.prototype
s.eb=s.l
s=J.bU.prototype
s.ef=s.l
s=A.k.prototype
s.eg=s.bG
s=A.f.prototype
s.ec=s.bC
s=A.F.prototype
s.eh=s.l
s=A.D.prototype
s.bH=s.a6
s=A.d.prototype
s.ea=s.bm
s=A.eq.prototype
s.ej=s.am
s=A.bo.prototype
s.ed=s.i
s.ee=s.k
s=A.d5.prototype
s.ei=s.k})();(function installTearOffs(){var s=hunkHelpers._static_1,r=hunkHelpers._static_0,q=hunkHelpers._static_2,p=hunkHelpers._instance_2u,o=hunkHelpers._instance_0u,n=hunkHelpers.installStaticTearOff,m=hunkHelpers._instance_2i
s(A,"um","rK",17)
s(A,"un","rL",17)
s(A,"uo","rM",17)
r(A,"q0","uf",2)
s(A,"up","u5",15)
q(A,"ur","u7",22)
r(A,"uq","u6",2)
p(A.W.prototype,"gcL","eE",22)
o(A.d4.prototype,"geS","eT",2)
s(A,"ut","tH",12)
s(A,"w3","oG",71)
n(A,"uB",4,null,["$4"],["rU"],29,0)
n(A,"uC",4,null,["$4"],["rV"],29,0)
m(A.bw.prototype,"ge6","cw",7)
s(A,"uK","mZ",26)
s(A,"uJ","o5",48)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.mixinHard,q=hunkHelpers.inherit,p=hunkHelpers.inheritMany
q(A.F,null)
p(A.F,[A.nG,J.cM,A.cW,J.b8,A.a_,A.k,A.bP,A.lS,A.f,A.by,A.dM,A.bh,A.e5,A.aD,A.bE,A.E,A.bZ,A.cR,A.dm,A.ej,A.fg,A.lZ,A.lN,A.dv,A.et,A.mE,A.lD,A.dJ,A.dK,A.dI,A.fi,A.mC,A.i2,A.be,A.hm,A.mM,A.ex,A.h3,A.eu,A.ao,A.bY,A.d3,A.e7,A.lY,A.h8,A.bj,A.W,A.h4,A.eb,A.hF,A.d4,A.hQ,A.eE,A.eh,A.as,A.hv,A.cv,A.aA,A.c9,A.f0,A.md,A.mA,A.mP,A.a9,A.b0,A.fC,A.e_,A.mi,A.ba,A.am,A.ab,A.hT,A.at,A.eB,A.m4,A.b3,A.ku,A.nC,A.ee,A.nT,A.cs,A.x,A.dS,A.eq,A.hV,A.cc,A.hb,A.hL,A.eD,A.bo,A.lM,A.mx,A.it,A.aH,A.kv])
p(J.cM,[J.ff,J.dD,J.a,J.cN,J.cO,J.cf,J.bT])
p(J.a,[J.bU,J.af,A.ck,A.dP,A.d,A.eN,A.bN,A.b9,A.Y,A.ha,A.aC,A.f5,A.f6,A.dq,A.he,A.ds,A.hg,A.f8,A.p,A.hk,A.aJ,A.fc,A.hp,A.cL,A.cQ,A.fn,A.hx,A.hy,A.aK,A.hz,A.hB,A.aL,A.hG,A.hJ,A.aO,A.hM,A.aP,A.hP,A.ax,A.hX,A.fR,A.aR,A.hZ,A.fV,A.h0,A.i4,A.i6,A.i8,A.ia,A.ic,A.cP,A.aS,A.ht,A.aW,A.hD,A.fF,A.hR,A.aX,A.i0,A.eS,A.h6])
p(J.bU,[J.fD,J.bD,J.bx])
p(A.cW,[J.fe,A.hK])
q(J.ly,J.af)
p(J.cf,[J.dC,J.fh])
p(A.a_,[A.dG,A.bB,A.fj,A.fY,A.fH,A.hj,A.dF,A.eP,A.b6,A.fz,A.e4,A.fX,A.bp,A.f_])
p(A.k,[A.d_,A.h7,A.bi,A.az,A.fb])
p(A.d_,[A.eZ,A.e3])
p(A.bP,[A.eX,A.eY,A.fO,A.nb,A.nd,A.ma,A.m9,A.mV,A.ms,A.mv,A.lW,A.lV,A.mG,A.lF,A.lm,A.ln,A.lp,A.mg,A.mh,A.lL,A.lK,A.mH,A.mI,A.mJ,A.ks,A.kt,A.lq,A.lr,A.lA,A.n_,A.n0,A.n5,A.n6,A.n7,A.nf,A.nm,A.nn,A.ng,A.ju,A.jv,A.jw,A.jt,A.jx,A.jy,A.jz,A.j4,A.j0,A.j1,A.j2,A.j3,A.j7,A.j8,A.j9,A.jf,A.jg,A.j6,A.jh,A.ji,A.jj,A.jk,A.jl,A.jm,A.ja,A.jb,A.jc,A.jd,A.je,A.jn,A.kb,A.kc,A.kd,A.kl,A.jM,A.jN,A.jL,A.jO,A.jK,A.jI,A.jJ,A.jQ,A.jF,A.jG,A.jH,A.jR,A.jD,A.jT,A.jU,A.jS,A.jB,A.k7,A.k8,A.k9,A.ka,A.jV,A.jW,A.jX,A.jY,A.jZ,A.jo,A.jp,A.jq,A.jr,A.js,A.kf,A.kg,A.ke,A.jC,A.kh,A.ki,A.kj,A.k_,A.k0,A.k1,A.k2,A.k5,A.iV,A.iU,A.iW,A.iX,A.iY,A.iZ,A.iz,A.iA,A.iB,A.iw,A.ix,A.iH,A.iQ,A.iI,A.iJ,A.iK,A.iL,A.iM,A.iN,A.iO,A.iC,A.iD,A.iP,A.iF,A.iu,A.iG,A.ky,A.kz,A.kC,A.kD,A.kE,A.kT,A.kU,A.kB,A.l4,A.l5,A.la,A.lb,A.l8,A.lc,A.ld,A.kZ,A.l_,A.l0,A.l1,A.l2,A.l3,A.kH,A.kS,A.l7,A.l6,A.lf,A.lg,A.lh,A.kx,A.kw,A.kR,A.li,A.kQ,A.kO,A.kK,A.kL,A.kM,A.kV,A.kW,A.kX,A.kY,A.kA,A.kI,A.nj,A.ni,A.nk,A.n2,A.np])
p(A.eX,[A.nl,A.mb,A.mc,A.mL,A.mK,A.lu,A.mj,A.mo,A.mn,A.ml,A.mk,A.mr,A.mq,A.mp,A.mu,A.lX,A.lU,A.mD,A.mX,A.mF,A.n3,A.mR,A.mQ,A.lk,A.jA,A.j5,A.jE,A.kk,A.iS,A.iy,A.iE,A.kG,A.kF,A.kJ,A.no])
p(A.f,[A.n,A.aE,A.I,A.co,A.ei,A.d7])
p(A.n,[A.ag,A.ch,A.aT,A.dH,A.eg])
p(A.ag,[A.e1,A.a0,A.hw,A.hs])
q(A.bu,A.aE)
p(A.E,[A.d0,A.bb,A.ef,A.hr,A.h5,A.hc])
q(A.cj,A.d0)
q(A.d9,A.cR)
q(A.c0,A.d9)
q(A.dn,A.c0)
q(A.bs,A.dm)
p(A.eY,[A.lP,A.lz,A.nc,A.mW,A.n4,A.mt,A.mw,A.lE,A.lG,A.mB,A.lJ,A.m6,A.m5,A.lH,A.lI,A.lR,A.lT,A.me,A.mf,A.mT,A.kp,A.km,A.jP,A.k6,A.kn,A.j_,A.k3,A.k4,A.iT,A.iv,A.iR,A.l9,A.le,A.kP,A.kN])
q(A.dT,A.bB)
p(A.fO,[A.fK,A.cH])
p(A.dP,[A.dN,A.ar])
p(A.ar,[A.el,A.en])
q(A.em,A.el)
q(A.dO,A.em)
q(A.eo,A.en)
q(A.aV,A.eo)
p(A.dO,[A.fs,A.ft])
p(A.aV,[A.fu,A.fv,A.fw,A.fx,A.fy,A.dQ,A.dR])
q(A.d8,A.hj)
p(A.bY,[A.d6,A.cq])
q(A.e8,A.d6)
q(A.d2,A.e8)
q(A.e9,A.d3)
q(A.bG,A.e9)
q(A.e6,A.e7)
q(A.bF,A.h8)
q(A.ea,A.eb)
q(A.hI,A.eE)
q(A.ct,A.ef)
p(A.as,[A.ep,A.f1])
q(A.cu,A.ep)
p(A.c9,[A.dl,A.f9,A.fk])
p(A.f0,[A.eV,A.kq,A.lC,A.lB,A.m7])
q(A.fl,A.dF)
q(A.mz,A.mA)
q(A.h1,A.f9)
p(A.b6,[A.cU,A.fd])
q(A.hd,A.eB)
p(A.d,[A.u,A.du,A.dx,A.fa,A.ce,A.fo,A.aN,A.er,A.aQ,A.ay,A.ev,A.h2,A.c1,A.br,A.eU,A.bM])
p(A.u,[A.D,A.bn,A.cb,A.d1])
p(A.D,[A.q,A.r])
p(A.q,[A.cF,A.eO,A.cG,A.c8,A.bO,A.dp,A.cK,A.dy,A.dA,A.bS,A.bz,A.dU,A.bX,A.e2,A.fM,A.fN,A.cZ,A.cm])
q(A.f2,A.b9)
q(A.ca,A.ha)
p(A.aC,[A.f3,A.f4])
q(A.hf,A.he)
q(A.dr,A.hf)
q(A.hh,A.hg)
q(A.f7,A.hh)
q(A.aI,A.bN)
q(A.hl,A.hk)
q(A.dw,A.hl)
q(A.hq,A.hp)
q(A.bR,A.hq)
q(A.dz,A.cb)
q(A.bw,A.ce)
q(A.fp,A.hx)
q(A.fq,A.hy)
q(A.hA,A.hz)
q(A.fr,A.hA)
p(A.p,[A.bg,A.b1])
q(A.aw,A.bg)
q(A.hC,A.hB)
q(A.cS,A.hC)
q(A.hH,A.hG)
q(A.fE,A.hH)
q(A.fG,A.hJ)
q(A.es,A.er)
q(A.fI,A.es)
q(A.hN,A.hM)
q(A.fJ,A.hN)
q(A.e0,A.hP)
q(A.hY,A.hX)
q(A.fP,A.hY)
q(A.ew,A.ev)
q(A.fQ,A.ew)
q(A.i_,A.hZ)
q(A.fU,A.i_)
q(A.i5,A.i4)
q(A.h9,A.i5)
q(A.ec,A.ds)
q(A.i7,A.i6)
q(A.hn,A.i7)
q(A.i9,A.i8)
q(A.ek,A.i9)
q(A.ib,A.ia)
q(A.hO,A.ib)
q(A.id,A.ic)
q(A.hU,A.id)
q(A.ed,A.h5)
p(A.f1,[A.hi,A.eR])
q(A.cp,A.cq)
q(A.hW,A.eq)
p(A.bo,[A.dE,A.d5])
q(A.cg,A.d5)
q(A.hu,A.ht)
q(A.fm,A.hu)
q(A.hE,A.hD)
q(A.fA,A.hE)
q(A.cX,A.r)
q(A.hS,A.hR)
q(A.fL,A.hS)
q(A.i1,A.i0)
q(A.fW,A.i1)
q(A.eT,A.h6)
q(A.fB,A.bM)
s(A.d_,A.bE)
s(A.el,A.k)
s(A.em,A.aD)
s(A.en,A.k)
s(A.eo,A.aD)
s(A.d0,A.aA)
s(A.d9,A.aA)
s(A.ha,A.ku)
s(A.he,A.k)
s(A.hf,A.x)
s(A.hg,A.k)
s(A.hh,A.x)
s(A.hk,A.k)
s(A.hl,A.x)
s(A.hp,A.k)
s(A.hq,A.x)
s(A.hx,A.E)
s(A.hy,A.E)
s(A.hz,A.k)
s(A.hA,A.x)
s(A.hB,A.k)
s(A.hC,A.x)
s(A.hG,A.k)
s(A.hH,A.x)
s(A.hJ,A.E)
s(A.er,A.k)
s(A.es,A.x)
s(A.hM,A.k)
s(A.hN,A.x)
s(A.hP,A.E)
s(A.hX,A.k)
s(A.hY,A.x)
s(A.ev,A.k)
s(A.ew,A.x)
s(A.hZ,A.k)
s(A.i_,A.x)
s(A.i4,A.k)
s(A.i5,A.x)
s(A.i6,A.k)
s(A.i7,A.x)
s(A.i8,A.k)
s(A.i9,A.x)
s(A.ia,A.k)
s(A.ib,A.x)
s(A.ic,A.k)
s(A.id,A.x)
r(A.d5,A.k)
s(A.ht,A.k)
s(A.hu,A.x)
s(A.hD,A.k)
s(A.hE,A.x)
s(A.hR,A.k)
s(A.hS,A.x)
s(A.i0,A.k)
s(A.i1,A.x)
s(A.h6,A.E)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{j:"int",X:"double",a1:"num",c:"String",H:"bool",ab:"Null",o:"List",F:"Object",t:"Map",i:"JSObject"},mangledNames:{},types:["H(t<c,@>)","~(aw)","~()","~(p)","ae<~>(aw)","~(t<c,@>)","~(o<t<c,@>>)","~(c,c)","~(D)","H(c)","c(c)","~(c,@)","@(@)","ab(@)","ab()","~(@)","j(t<c,@>,t<c,@>)","~(~())","ab(p)","~(fS)","~(b1)","t<c,@>(@)","~(F,bf)","c(@,j)","H(bc)","ab(F,bf)","F?(F?)","@(t<c,@>)","j(c?)","H(D,c,c,cs)","c(t<c,F>)","H(u)","t<c,@>()","ae<~>(p)","@()","~(F?,F?)","t<c,@>(t<c,@>)","~(j,@)","@(c)","@(@,c)","~(H)","~(@,@)","bo(@)","cg<@>(@)","~(cY,@)","dE(@)","~(c,D)","D(u)","F?(@)","~(c)","@(F?)","a1(a1,a1)","t<c,F>(am<j,a1>)","~(b2<c>)","~(t<c,F>)","H(b2<c>)","ae<~>(c,c)","ab(@,@,@,@)","~(cJ?,c)","ae<~>(cJ?)","H(D)","ae<~>(~)","0&()","~(u,u?)","t<c,c>(t<c,c>,c)","0&(c,j?)","ab(@,bf)","ab(~())","o<t<c,@>>()","ae<ab>(~)","ae<~>()","c(d)","~(t<c,c>)","~(j,c)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.td(v.typeUniverse,JSON.parse('{"fD":"bU","bD":"bU","bx":"bU","vp":"a","vq":"a","uY":"a","uW":"p","vk":"p","uZ":"bM","uX":"d","vu":"d","vy":"d","uV":"r","vm":"r","vT":"b1","v_":"q","vs":"q","vz":"u","vj":"u","vN":"cb","vv":"aw","vM":"ay","v1":"bg","vd":"br","v0":"bn","vB":"bn","vr":"D","vo":"ce","vn":"bR","v2":"Y","v5":"b9","v8":"ax","v9":"aC","v4":"aC","v6":"aC","vt":"ck","ff":{"H":[],"Z":[]},"dD":{"ab":[],"Z":[]},"a":{"i":[]},"bU":{"i":[]},"af":{"o":["1"],"n":["1"],"i":[],"f":["1"]},"fe":{"cW":[]},"ly":{"af":["1"],"o":["1"],"n":["1"],"i":[],"f":["1"]},"b8":{"aa":["1"]},"cf":{"X":[],"a1":[]},"dC":{"X":[],"j":[],"a1":[],"Z":[]},"fh":{"X":[],"a1":[],"Z":[]},"bT":{"c":[],"lO":[],"Z":[]},"dG":{"a_":[]},"eZ":{"k":["j"],"bE":["j"],"o":["j"],"n":["j"],"f":["j"],"k.E":"j","bE.E":"j"},"n":{"f":["1"]},"ag":{"n":["1"],"f":["1"]},"e1":{"ag":["1"],"n":["1"],"f":["1"],"ag.E":"1","f.E":"1"},"by":{"aa":["1"]},"aE":{"f":["2"],"f.E":"2"},"bu":{"aE":["1","2"],"n":["2"],"f":["2"],"f.E":"2"},"dM":{"aa":["2"]},"a0":{"ag":["2"],"n":["2"],"f":["2"],"ag.E":"2","f.E":"2"},"I":{"f":["1"],"f.E":"1"},"bh":{"aa":["1"]},"co":{"f":["1"],"f.E":"1"},"e5":{"aa":["1"]},"d_":{"k":["1"],"bE":["1"],"o":["1"],"n":["1"],"f":["1"]},"hw":{"ag":["j"],"n":["j"],"f":["j"],"ag.E":"j","f.E":"j"},"cj":{"E":["j","1"],"aA":["j","1"],"t":["j","1"],"E.K":"j","E.V":"1","aA.K":"j","aA.V":"1"},"bZ":{"cY":[]},"dn":{"c0":["1","2"],"d9":["1","2"],"cR":["1","2"],"aA":["1","2"],"t":["1","2"],"aA.K":"1","aA.V":"2"},"dm":{"t":["1","2"]},"bs":{"dm":["1","2"],"t":["1","2"]},"ei":{"f":["1"],"f.E":"1"},"ej":{"aa":["1"]},"fg":{"oI":[]},"dT":{"bB":[],"a_":[]},"fj":{"a_":[]},"fY":{"a_":[]},"et":{"bf":[]},"bP":{"cd":[]},"eX":{"cd":[]},"eY":{"cd":[]},"fO":{"cd":[]},"fK":{"cd":[]},"cH":{"cd":[]},"fH":{"a_":[]},"bb":{"E":["1","2"],"oN":["1","2"],"t":["1","2"],"E.K":"1","E.V":"2"},"ch":{"n":["1"],"f":["1"],"f.E":"1"},"dJ":{"aa":["1"]},"aT":{"n":["1"],"f":["1"],"f.E":"1"},"dK":{"aa":["1"]},"dH":{"n":["am<1,2>"],"f":["am<1,2>"],"f.E":"am<1,2>"},"dI":{"aa":["am<1,2>"]},"fi":{"rB":[],"lO":[]},"ck":{"i":[],"eW":[],"Z":[]},"dP":{"i":[],"ac":[]},"i2":{"eW":[]},"dN":{"kr":[],"i":[],"ac":[],"Z":[]},"ar":{"M":["1"],"i":[],"ac":[]},"dO":{"k":["X"],"ar":["X"],"o":["X"],"M":["X"],"n":["X"],"i":[],"ac":[],"f":["X"],"aD":["X"]},"aV":{"k":["j"],"ar":["j"],"o":["j"],"M":["j"],"n":["j"],"i":[],"ac":[],"f":["j"],"aD":["j"]},"fs":{"ls":[],"k":["X"],"ar":["X"],"o":["X"],"M":["X"],"n":["X"],"i":[],"ac":[],"f":["X"],"aD":["X"],"Z":[],"k.E":"X"},"ft":{"lt":[],"k":["X"],"ar":["X"],"o":["X"],"M":["X"],"n":["X"],"i":[],"ac":[],"f":["X"],"aD":["X"],"Z":[],"k.E":"X"},"fu":{"aV":[],"lv":[],"k":["j"],"ar":["j"],"o":["j"],"M":["j"],"n":["j"],"i":[],"ac":[],"f":["j"],"aD":["j"],"Z":[],"k.E":"j"},"fv":{"aV":[],"lw":[],"k":["j"],"ar":["j"],"o":["j"],"M":["j"],"n":["j"],"i":[],"ac":[],"f":["j"],"aD":["j"],"Z":[],"k.E":"j"},"fw":{"aV":[],"lx":[],"k":["j"],"ar":["j"],"o":["j"],"M":["j"],"n":["j"],"i":[],"ac":[],"f":["j"],"aD":["j"],"Z":[],"k.E":"j"},"fx":{"aV":[],"m0":[],"k":["j"],"ar":["j"],"o":["j"],"M":["j"],"n":["j"],"i":[],"ac":[],"f":["j"],"aD":["j"],"Z":[],"k.E":"j"},"fy":{"aV":[],"m1":[],"k":["j"],"ar":["j"],"o":["j"],"M":["j"],"n":["j"],"i":[],"ac":[],"f":["j"],"aD":["j"],"Z":[],"k.E":"j"},"dQ":{"aV":[],"m2":[],"k":["j"],"ar":["j"],"o":["j"],"M":["j"],"n":["j"],"i":[],"ac":[],"f":["j"],"aD":["j"],"Z":[],"k.E":"j"},"dR":{"aV":[],"m3":[],"k":["j"],"ar":["j"],"o":["j"],"M":["j"],"n":["j"],"i":[],"ac":[],"f":["j"],"aD":["j"],"Z":[],"k.E":"j"},"hj":{"a_":[]},"d8":{"bB":[],"a_":[]},"ex":{"fS":[]},"eu":{"aa":["1"]},"d7":{"f":["1"],"f.E":"1"},"ao":{"a_":[]},"d2":{"e8":["1"],"d6":["1"],"bY":["1"]},"bG":{"e9":["1"],"d3":["1"],"bq":["1"],"c2":["1"]},"e7":{"p0":["1"],"pn":["1"],"c2":["1"]},"e6":{"e7":["1"],"p0":["1"],"pn":["1"],"c2":["1"]},"bF":{"h8":["1"]},"W":{"ae":["1"]},"e8":{"d6":["1"],"bY":["1"]},"e9":{"d3":["1"],"bq":["1"],"c2":["1"]},"d3":{"bq":["1"],"c2":["1"]},"d6":{"bY":["1"]},"ea":{"eb":["1"]},"d4":{"bq":["1"]},"eE":{"pb":[]},"hI":{"eE":[],"pb":[]},"ef":{"E":["1","2"],"t":["1","2"]},"ct":{"ef":["1","2"],"E":["1","2"],"t":["1","2"],"E.K":"1","E.V":"2"},"eg":{"n":["1"],"f":["1"],"f.E":"1"},"eh":{"aa":["1"]},"cu":{"as":["1"],"b2":["1"],"n":["1"],"f":["1"],"as.E":"1"},"cv":{"aa":["1"]},"e3":{"k":["1"],"bE":["1"],"o":["1"],"n":["1"],"f":["1"],"k.E":"1","bE.E":"1"},"k":{"o":["1"],"n":["1"],"f":["1"]},"E":{"t":["1","2"]},"d0":{"E":["1","2"],"aA":["1","2"],"t":["1","2"]},"cR":{"t":["1","2"]},"c0":{"d9":["1","2"],"cR":["1","2"],"aA":["1","2"],"t":["1","2"],"aA.K":"1","aA.V":"2"},"as":{"b2":["1"],"n":["1"],"f":["1"]},"ep":{"as":["1"],"b2":["1"],"n":["1"],"f":["1"]},"hr":{"E":["c","@"],"t":["c","@"],"E.K":"c","E.V":"@"},"hs":{"ag":["c"],"n":["c"],"f":["c"],"ag.E":"c","f.E":"c"},"dl":{"c9":["o<j>","c"]},"f9":{"c9":["c","o<j>"]},"dF":{"a_":[]},"fl":{"a_":[]},"fk":{"c9":["F?","c"]},"h1":{"c9":["c","o<j>"]},"X":{"a1":[]},"j":{"a1":[]},"o":{"n":["1"],"f":["1"]},"b2":{"n":["1"],"f":["1"]},"c":{"lO":[]},"eP":{"a_":[]},"bB":{"a_":[]},"b6":{"a_":[]},"cU":{"a_":[]},"fd":{"a_":[]},"fz":{"a_":[]},"e4":{"a_":[]},"fX":{"a_":[]},"bp":{"a_":[]},"f_":{"a_":[]},"fC":{"a_":[]},"e_":{"a_":[]},"hT":{"bf":[]},"at":{"rD":[]},"eB":{"fZ":[]},"b3":{"fZ":[]},"hd":{"fZ":[]},"Y":{"i":[]},"D":{"u":[],"d":[],"i":[]},"p":{"i":[]},"d":{"i":[]},"aI":{"bN":[],"i":[]},"aJ":{"i":[]},"bw":{"d":[],"i":[]},"cJ":{"D":[],"u":[],"d":[],"i":[]},"aK":{"i":[]},"aw":{"p":[],"i":[]},"u":{"d":[],"i":[]},"bz":{"q":[],"D":[],"u":[],"d":[],"i":[]},"aL":{"i":[]},"b1":{"p":[],"i":[]},"aN":{"d":[],"i":[]},"aO":{"i":[]},"aP":{"i":[]},"ax":{"i":[]},"aQ":{"d":[],"i":[]},"ay":{"d":[],"i":[]},"aR":{"i":[]},"cs":{"bc":[]},"q":{"D":[],"u":[],"d":[],"i":[]},"eN":{"i":[]},"cF":{"q":[],"D":[],"u":[],"d":[],"i":[]},"eO":{"q":[],"D":[],"u":[],"d":[],"i":[]},"cG":{"q":[],"D":[],"u":[],"d":[],"i":[]},"bN":{"i":[]},"c8":{"q":[],"D":[],"u":[],"d":[],"i":[]},"bO":{"q":[],"D":[],"u":[],"d":[],"i":[]},"bn":{"u":[],"d":[],"i":[]},"f2":{"i":[]},"ca":{"i":[]},"aC":{"i":[]},"b9":{"i":[]},"f3":{"i":[]},"f4":{"i":[]},"f5":{"i":[]},"dp":{"q":[],"D":[],"u":[],"d":[],"i":[]},"cb":{"u":[],"d":[],"i":[]},"f6":{"i":[]},"dq":{"i":[]},"dr":{"k":["bd<a1>"],"x":["bd<a1>"],"o":["bd<a1>"],"M":["bd<a1>"],"n":["bd<a1>"],"i":[],"f":["bd<a1>"],"x.E":"bd<a1>","k.E":"bd<a1>"},"ds":{"bd":["a1"],"i":[]},"f7":{"k":["c"],"x":["c"],"o":["c"],"M":["c"],"n":["c"],"i":[],"f":["c"],"x.E":"c","k.E":"c"},"f8":{"i":[]},"h7":{"k":["D"],"o":["D"],"n":["D"],"f":["D"],"k.E":"D"},"bi":{"k":["1"],"o":["1"],"n":["1"],"f":["1"],"k.E":"1"},"du":{"d":[],"i":[]},"dw":{"k":["aI"],"x":["aI"],"o":["aI"],"M":["aI"],"n":["aI"],"i":[],"f":["aI"],"x.E":"aI","k.E":"aI"},"dx":{"d":[],"i":[]},"fa":{"d":[],"i":[]},"cK":{"q":[],"D":[],"u":[],"d":[],"i":[]},"dy":{"q":[],"D":[],"u":[],"d":[],"i":[]},"fc":{"i":[]},"bR":{"k":["u"],"x":["u"],"o":["u"],"M":["u"],"n":["u"],"i":[],"f":["u"],"x.E":"u","k.E":"u"},"dz":{"u":[],"d":[],"i":[]},"ce":{"d":[],"i":[]},"cL":{"i":[]},"dA":{"q":[],"D":[],"u":[],"d":[],"i":[]},"bS":{"oz":[],"cJ":[],"q":[],"D":[],"u":[],"d":[],"i":[]},"cQ":{"i":[]},"fn":{"i":[]},"fo":{"d":[],"i":[]},"fp":{"E":["c","@"],"i":[],"t":["c","@"],"E.K":"c","E.V":"@"},"fq":{"E":["c","@"],"i":[],"t":["c","@"],"E.K":"c","E.V":"@"},"fr":{"k":["aK"],"x":["aK"],"o":["aK"],"M":["aK"],"n":["aK"],"i":[],"f":["aK"],"x.E":"aK","k.E":"aK"},"az":{"k":["u"],"o":["u"],"n":["u"],"f":["u"],"k.E":"u"},"cS":{"k":["u"],"x":["u"],"o":["u"],"M":["u"],"n":["u"],"i":[],"f":["u"],"x.E":"u","k.E":"u"},"dU":{"q":[],"D":[],"u":[],"d":[],"i":[]},"fE":{"k":["aL"],"x":["aL"],"o":["aL"],"M":["aL"],"n":["aL"],"i":[],"f":["aL"],"x.E":"aL","k.E":"aL"},"fG":{"E":["c","@"],"i":[],"t":["c","@"],"E.K":"c","E.V":"@"},"bX":{"q":[],"D":[],"u":[],"d":[],"i":[]},"fI":{"k":["aN"],"x":["aN"],"o":["aN"],"d":[],"M":["aN"],"n":["aN"],"i":[],"f":["aN"],"x.E":"aN","k.E":"aN"},"fJ":{"k":["aO"],"x":["aO"],"o":["aO"],"M":["aO"],"n":["aO"],"i":[],"f":["aO"],"x.E":"aO","k.E":"aO"},"e0":{"E":["c","c"],"i":[],"t":["c","c"],"E.K":"c","E.V":"c"},"e2":{"q":[],"D":[],"u":[],"d":[],"i":[]},"fM":{"q":[],"D":[],"u":[],"d":[],"i":[]},"fN":{"q":[],"D":[],"u":[],"d":[],"i":[]},"cZ":{"q":[],"D":[],"u":[],"d":[],"i":[]},"cm":{"q":[],"D":[],"u":[],"d":[],"i":[]},"fP":{"k":["ay"],"x":["ay"],"o":["ay"],"M":["ay"],"n":["ay"],"i":[],"f":["ay"],"x.E":"ay","k.E":"ay"},"fQ":{"k":["aQ"],"x":["aQ"],"o":["aQ"],"d":[],"M":["aQ"],"n":["aQ"],"i":[],"f":["aQ"],"x.E":"aQ","k.E":"aQ"},"fR":{"i":[]},"fU":{"k":["aR"],"x":["aR"],"o":["aR"],"M":["aR"],"n":["aR"],"i":[],"f":["aR"],"x.E":"aR","k.E":"aR"},"fV":{"i":[]},"bg":{"p":[],"i":[]},"h0":{"i":[]},"h2":{"d":[],"i":[]},"c1":{"m8":[],"d":[],"i":[]},"br":{"d":[],"i":[]},"d1":{"u":[],"d":[],"i":[]},"h9":{"k":["Y"],"x":["Y"],"o":["Y"],"M":["Y"],"n":["Y"],"i":[],"f":["Y"],"x.E":"Y","k.E":"Y"},"ec":{"bd":["a1"],"i":[]},"hn":{"k":["aJ?"],"x":["aJ?"],"o":["aJ?"],"M":["aJ?"],"n":["aJ?"],"i":[],"f":["aJ?"],"x.E":"aJ?","k.E":"aJ?"},"ek":{"k":["u"],"x":["u"],"o":["u"],"M":["u"],"n":["u"],"i":[],"f":["u"],"x.E":"u","k.E":"u"},"hO":{"k":["aP"],"x":["aP"],"o":["aP"],"M":["aP"],"n":["aP"],"i":[],"f":["aP"],"x.E":"aP","k.E":"aP"},"hU":{"k":["ax"],"x":["ax"],"o":["ax"],"M":["ax"],"n":["ax"],"i":[],"f":["ax"],"x.E":"ax","k.E":"ax"},"h5":{"E":["c","c"],"t":["c","c"]},"ed":{"E":["c","c"],"t":["c","c"],"E.K":"c","E.V":"c"},"hc":{"E":["c","c"],"t":["c","c"],"E.K":"c","E.V":"c"},"hi":{"as":["c"],"b2":["c"],"n":["c"],"f":["c"],"as.E":"c"},"cq":{"bY":["1"]},"cp":{"cq":["1"],"bY":["1"]},"ee":{"bq":["1"]},"dS":{"bc":[]},"eq":{"bc":[]},"hW":{"bc":[]},"hV":{"bc":[]},"cc":{"aa":["1"]},"hb":{"m8":[],"d":[],"i":[]},"hL":{"rF":[]},"eD":{"rs":[]},"f1":{"as":["c"],"b2":["c"],"n":["c"],"f":["c"]},"fb":{"k":["D"],"o":["D"],"n":["D"],"f":["D"],"k.E":"D"},"cP":{"i":[]},"cg":{"k":["1"],"o":["1"],"n":["1"],"f":["1"],"k.E":"1"},"hK":{"cW":[]},"aS":{"i":[]},"aW":{"i":[]},"aX":{"i":[]},"fm":{"k":["aS"],"x":["aS"],"o":["aS"],"n":["aS"],"i":[],"f":["aS"],"x.E":"aS","k.E":"aS"},"fA":{"k":["aW"],"x":["aW"],"o":["aW"],"n":["aW"],"i":[],"f":["aW"],"x.E":"aW","k.E":"aW"},"fF":{"i":[]},"cX":{"r":[],"D":[],"u":[],"d":[],"i":[]},"fL":{"k":["c"],"x":["c"],"o":["c"],"n":["c"],"i":[],"f":["c"],"x.E":"c","k.E":"c"},"eR":{"as":["c"],"b2":["c"],"n":["c"],"f":["c"],"as.E":"c"},"r":{"D":[],"u":[],"d":[],"i":[]},"fW":{"k":["aX"],"x":["aX"],"o":["aX"],"n":["aX"],"i":[],"f":["aX"],"x.E":"aX","k.E":"aX"},"eS":{"i":[]},"eT":{"E":["c","@"],"i":[],"t":["c","@"],"E.K":"c","E.V":"@"},"eU":{"d":[],"i":[]},"bM":{"d":[],"i":[]},"fB":{"d":[],"i":[]},"kr":{"ac":[]},"lx":{"o":["j"],"n":["j"],"ac":[],"f":["j"]},"m3":{"o":["j"],"n":["j"],"ac":[],"f":["j"]},"m2":{"o":["j"],"n":["j"],"ac":[],"f":["j"]},"lv":{"o":["j"],"n":["j"],"ac":[],"f":["j"]},"m0":{"o":["j"],"n":["j"],"ac":[],"f":["j"]},"lw":{"o":["j"],"n":["j"],"ac":[],"f":["j"]},"m1":{"o":["j"],"n":["j"],"ac":[],"f":["j"]},"ls":{"o":["X"],"n":["X"],"ac":[],"f":["X"]},"lt":{"o":["X"],"n":["X"],"ac":[],"f":["X"]}}'))
A.tc(v.typeUniverse,JSON.parse('{"n":1,"d_":1,"ar":1,"eb":1,"d0":2,"ep":1,"f0":2,"d5":1}'))
var u={f:"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u03f6\x00\u0404\u03f4 \u03f4\u03f6\u01f6\u01f6\u03f6\u03fc\u01f4\u03ff\u03ff\u0584\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u05d4\u01f4\x00\u01f4\x00\u0504\u05c4\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0400\x00\u0400\u0200\u03f7\u0200\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0200\u0200\u0200\u03f7\x00",p:": URI should have a non-empty host name: ",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.ii
return{gS:s("@<~>"),n:s("ao"),az:s("cG"),fj:s("bN"),hp:s("c8"),f_:s("bO"),lo:s("eW"),fW:s("kr"),i9:s("dn<cY,@>"),w:s("bs<c,c>"),d5:s("Y"),cs:s("a9"),jS:s("b0"),gt:s("n<@>"),h:s("D"),W:s("a_"),A:s("p"),l5:s("d"),et:s("aI"),pk:s("ls"),kI:s("lt"),Z:s("cd"),la:s("bw"),ad:s("cL"),fY:s("bS"),m6:s("lv"),bW:s("lw"),jx:s("lx"),bg:s("oI"),hl:s("f<u>"),e3:s("f<bz>"),R:s("f<@>"),fm:s("f<j>"),hq:s("af<t<c,c>>"),t:s("af<t<c,@>>"),lN:s("af<bc>"),hf:s("af<F>"),dw:s("af<bq<@>>"),s:s("af<c>"),x:s("af<@>"),b:s("af<j>"),T:s("dD"),m:s("i"),dY:s("bx"),dX:s("M<@>"),gq:s("cg<@>"),bX:s("bb<cY,@>"),mz:s("cP"),kT:s("aS"),fO:s("cj<c>"),p:s("o<t<c,@>>"),j:s("o<@>"),L:s("o<j>"),oT:s("o<a1>"),d:s("cQ"),if:s("am<j,a1>"),dW:s("t<c,D>"),c:s("t<c,F>"),k:s("t<c,c>"),P:s("t<c,@>"),f:s("t<@,@>"),gQ:s("a0<c,c>"),ib:s("aK"),V:s("aw"),aj:s("aV"),F:s("u"),hU:s("bc"),a:s("ab"),ai:s("aW"),K:s("F"),af:s("bz"),d8:s("aL"),D:s("b1"),lZ:s("vx"),ku:s("bd<@>"),mx:s("bd<a1>"),nZ:s("cX"),gH:s("bX"),i:s("b2<c>"),ls:s("aN"),cA:s("aO"),hH:s("aP"),l:s("bf"),N:s("c"),gL:s("c(c)"),lv:s("ax"),bC:s("r"),bR:s("cY"),fD:s("cZ"),dQ:s("aQ"),gJ:s("ay"),I:s("fS"),ki:s("aR"),hk:s("aX"),aJ:s("Z"),do:s("bB"),bl:s("ac"),hM:s("m0"),mC:s("m1"),nn:s("m2"),ev:s("m3"),cx:s("bD"),eG:s("e3<bz>"),ph:s("c0<c,c>"),jJ:s("fZ"),J:s("I<c>"),hE:s("c1"),kg:s("m8"),f5:s("br"),cz:s("bF<bw>"),ou:s("bF<~>"),nD:s("d1"),aN:s("az"),E:s("cp<p>"),C:s("cp<aw>"),h6:s("cq<b1>"),U:s("bi<D>"),gp:s("bi<bz>"),ax:s("W<bw>"),_:s("W<@>"),hy:s("W<j>"),cU:s("W<~>"),dl:s("cs"),mp:s("ct<@,@>"),as:s("ct<F?,F?>"),y:s("H"),iW:s("H(F)"),Q:s("H(c)"),dx:s("X"),z:s("@"),mY:s("@()"),v:s("@(F)"),ng:s("@(F,bf)"),gA:s("@(b2<c>)"),S:s("j"),o:s("bO?"),aa:s("oz?"),mV:s("D?"),O:s("d?"),iC:s("cJ?"),dD:s("cK?"),gK:s("ae<ab>?"),ef:s("aJ?"),dH:s("q?"),G:s("bS?"),mU:s("i?"),lH:s("o<@>?"),lG:s("t<c,c>?"),dZ:s("t<c,@>?"),eO:s("t<@,@>?"),X:s("F?"),Y:s("bX?"),jv:s("c?"),q:s("cm?"),e:s("bj<@,@>?"),g:s("hv?"),fU:s("H?"),jX:s("X?"),B:s("@(p)?"),aV:s("j?"),jh:s("a1?"),jE:s("~()?"),oV:s("~(p)?"),b9:s("~(aw)?"),gn:s("~(b1)?"),mW:s("~(H)?"),r:s("a1"),H:s("~"),M:s("~()"),i6:s("~(F)"),fQ:s("~(F,bf)"),bm:s("~(c,c)"),u:s("~(c,@)"),my:s("~(fS)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.P=A.cF.prototype
B.z=A.c8.prototype
B.n=A.bO.prototype
B.l=A.ca.prototype
B.a1=A.dp.prototype
B.a2=A.dq.prototype
B.a8=A.dw.prototype
B.a9=A.dx.prototype
B.aa=A.dy.prototype
B.E=A.dz.prototype
B.F=A.dA.prototype
B.f=A.bS.prototype
B.ab=J.cM.prototype
B.b=J.af.prototype
B.c=J.dC.prototype
B.e=J.cf.prototype
B.a=J.bT.prototype
B.ac=J.bx.prototype
B.ad=J.a.prototype
B.al=A.dN.prototype
B.K=A.dR.prototype
B.am=A.cS.prototype
B.k=A.dU.prototype
B.M=J.fD.prototype
B.o=A.bX.prototype
B.j=A.e0.prototype
B.N=A.e2.prototype
B.m=A.cm.prototype
B.x=J.bD.prototype
B.O=A.c1.prototype
B.Q=new A.aH(401,!0,null)
B.R=new A.aH(409,!1,null)
B.p=new A.aH(null,!1,null)
B.i=new A.aH(null,!0,null)
B.T=new A.eV(!1)
B.S=new A.dl(B.T)
B.U=new A.eV(!0)
B.y=new A.dl(B.U)
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

B.d=new A.fk()
B.a0=new A.fC()
B.q=new A.lS()
B.r=new A.h1()
B.C=new A.mE()
B.h=new A.hI()
B.t=new A.hT()
B.a3=new A.b0(0)
B.a4=new A.b0(1e6)
B.D=new A.b0(1e7)
B.a5=new A.b0(15e6)
B.a6=new A.b0(4e5)
B.a7=new A.b0(6e7)
B.v=new A.ba("",null,null)
B.ae=new A.lB(null)
B.af=new A.lC(null)
B.ag=s([],t.s)
B.G=s([],t.x)
B.H=s(["bind","if","ref","repeat","syntax"],t.s)
B.w=s(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"],t.s)
B.ah=s(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"],t.s)
B.ai=s(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"],t.s)
B.an={households:0,centralAssets:1,maintenanceLogs:2,workers:3,billingRecords:4,announcements:5,paymentSettings:6,billingConfig:7,offlineCollections:8,unsyncedActions:9}
B.I=new A.bs(B.an,["waterhall_households","waterhall_central_assets","waterhall_maintenance_logs","waterhall_workers","waterhall_billing_records","waterhall_announcements","waterhall_payment_settings","waterhall_billing_config","waterhall_offline_collections","waterhall_unsynced_actions"],t.w)
B.ao={"/api/billing-records/add":0,"/api/maintenance-logs/add":1,"/api/reports/add":2,"/api/announcements/add":3,"/api/households/update":4}
B.aj=new A.bs(B.ao,["Meter reading and bill","Maintenance report","Service report","Announcement","Household status"],t.w)
B.L={}
B.ak=new A.bs(B.L,[],t.w)
B.J=new A.bs(B.L,[],A.ii("bs<cY,@>"))
B.ap=new A.bZ("call")
B.aq=A.bl("eW")
B.ar=A.bl("kr")
B.as=A.bl("ls")
B.at=A.bl("lt")
B.au=A.bl("lv")
B.av=A.bl("lw")
B.aw=A.bl("lx")
B.ax=A.bl("F")
B.ay=A.bl("m0")
B.az=A.bl("m1")
B.aA=A.bl("m2")
B.aB=A.bl("m3")
B.aC=new A.m7(!1)})();(function staticFields(){$.my=null
$.aZ=A.C([],t.hf)
$.oU=null
$.ox=null
$.ow=null
$.q3=null
$.q_=null
$.q8=null
$.n8=null
$.ne=null
$.oh=null
$.dc=null
$.eH=null
$.eI=null
$.oa=!1
$.Q=B.h
$.p7=""
$.p8=null
$.bQ=null
$.nB=null
$.oE=null
$.oD=null
$.ho=A.ap(t.N,t.Z)
$.uQ=A.a3(["main_tank_level",null,"turbidity",null,"tds_ppm",null,"turbidity_status","unknown","has_reading",!1,"turbidity_desc","Awaiting sensor readings","last_updated",null],t.N,t.z)
$.q2=function(){var s=t.N
return A.a3(["payment_location","Barangay Tagpopongan Hall - Treasury Office","payment_method","In-Person Payment at Barangay Hall","allow_worker_collection","false","payment_instructions","Water bills are due on or before the 25th of each month. Payments must be settled in-person at the Barangay Hall Treasury Window. Field workers are not authorized to collect payments.","operating_hours","Monday - Friday, 8:00 AM - 5:00 PM","emergency_contact","Not configured; contact the Barangay office"],s,s)}()})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"vb","io",()=>A.og("_$dart_dartClosure"))
s($,"va","qg",()=>A.og("_$dart_dartClosure_dartJSInterop"))
s($,"w4","nt",()=>B.h.dE(new A.nl(),A.ii("ae<~>")))
s($,"w0","oq",()=>A.C([new J.fe()],A.ii("af<cW>")))
s($,"vC","qn",()=>A.bC(A.m_({
toString:function(){return"$receiver$"}})))
s($,"vD","qo",()=>A.bC(A.m_({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"vE","qp",()=>A.bC(A.m_(null)))
s($,"vF","qq",()=>A.bC(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"vI","qt",()=>A.bC(A.m_(void 0)))
s($,"vJ","qu",()=>A.bC(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"vH","qs",()=>A.bC(A.p4(null)))
s($,"vG","qr",()=>A.bC(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"vL","qw",()=>A.bC(A.p4(void 0)))
s($,"vK","qv",()=>A.bC(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"vO","om",()=>A.rJ())
s($,"vl","nq",()=>$.nt())
s($,"vW","qB",()=>A.oR(4096))
s($,"vU","qz",()=>new A.mR().$0())
s($,"vV","qA",()=>new A.mQ().$0())
s($,"vQ","on",()=>A.rr(A.tK(A.C([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.b))))
s($,"vP","qx",()=>A.oR(0))
s($,"vc","qh",()=>A.lQ("^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(?:[.,](\\d+))?)?)?( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$"))
s($,"vZ","nr",()=>A.il(B.ax))
s($,"v7","qf",()=>({}))
s($,"vS","qy",()=>A.oQ(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],t.N))
s($,"v3","qe",()=>A.lQ("^\\S+$"))
s($,"vh","ol",()=>B.a.bp(A.nA(),"Opera",0))
s($,"vg","qk",()=>!$.ol()&&B.a.bp(A.nA(),"Trident/",0))
s($,"vf","qj",()=>B.a.bp(A.nA(),"Firefox",0))
s($,"ve","qi",()=>"-"+$.ql()+"-")
s($,"vi","ql",()=>{if($.qj())var q="moz"
else if($.qk())q="ms"
else q=$.ol()?"o":"webkit"
return q})
s($,"vX","dj",()=>A.tE(A.ob(self)))
s($,"w_","ns",()=>{$.oq().push(new A.hK())
return!0})
s($,"vR","oo",()=>A.og("_$dart_dartObject"))
s($,"vY","op",()=>function DartObject(a){this.o=a})
s($,"vw","qm",()=>{var q=new A.mx(new DataView(new ArrayBuffer(A.tF(8))))
q.em()
return q})
s($,"w1","O",()=>{var q,p=t.t,o=A.C([],p),n=t.N,m=t.z,l=A.C([],p),k=A.C([],p),j=A.C([],p)
p=A.C([],p)
q=A.nD(null,t.H)
return new A.kv(o,A.ap(n,m),l,k,j,p,A.ap(n,n),A.ap(n,m),A.ap(n,t.p),q,new A.e6(null,null,A.ii("e6<t<c,@>>")))})
r($,"u9","qC",()=>A.nD(null,t.H))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({WebGL:J.cM,AnimationEffectReadOnly:J.a,AnimationEffectTiming:J.a,AnimationEffectTimingReadOnly:J.a,AnimationTimeline:J.a,AnimationWorkletGlobalScope:J.a,AuthenticatorAssertionResponse:J.a,AuthenticatorAttestationResponse:J.a,AuthenticatorResponse:J.a,BackgroundFetchFetch:J.a,BackgroundFetchManager:J.a,BackgroundFetchSettledFetch:J.a,BarProp:J.a,BarcodeDetector:J.a,BluetoothRemoteGATTDescriptor:J.a,Body:J.a,BudgetState:J.a,CacheStorage:J.a,CanvasGradient:J.a,CanvasPattern:J.a,CanvasRenderingContext2D:J.a,Client:J.a,Clients:J.a,CookieStore:J.a,Coordinates:J.a,Credential:J.a,CredentialUserData:J.a,CredentialsContainer:J.a,Crypto:J.a,CryptoKey:J.a,CSS:J.a,CSSVariableReferenceValue:J.a,CustomElementRegistry:J.a,DataTransfer:J.a,DataTransferItem:J.a,DeprecatedStorageInfo:J.a,DeprecatedStorageQuota:J.a,DeprecationReport:J.a,DetectedBarcode:J.a,DetectedFace:J.a,DetectedText:J.a,DeviceAcceleration:J.a,DeviceRotationRate:J.a,DirectoryEntry:J.a,webkitFileSystemDirectoryEntry:J.a,FileSystemDirectoryEntry:J.a,DirectoryReader:J.a,WebKitDirectoryReader:J.a,webkitFileSystemDirectoryReader:J.a,FileSystemDirectoryReader:J.a,DocumentOrShadowRoot:J.a,DocumentTimeline:J.a,DOMError:J.a,Iterator:J.a,DOMMatrix:J.a,DOMMatrixReadOnly:J.a,DOMParser:J.a,DOMPoint:J.a,DOMPointReadOnly:J.a,DOMQuad:J.a,DOMStringMap:J.a,Entry:J.a,webkitFileSystemEntry:J.a,FileSystemEntry:J.a,External:J.a,FaceDetector:J.a,FederatedCredential:J.a,FileEntry:J.a,webkitFileSystemFileEntry:J.a,FileSystemFileEntry:J.a,DOMFileSystem:J.a,WebKitFileSystem:J.a,webkitFileSystem:J.a,FileSystem:J.a,FontFace:J.a,FontFaceSource:J.a,FormData:J.a,GamepadButton:J.a,GamepadPose:J.a,Geolocation:J.a,Position:J.a,GeolocationPosition:J.a,Headers:J.a,HTMLHyperlinkElementUtils:J.a,IdleDeadline:J.a,ImageBitmap:J.a,ImageBitmapRenderingContext:J.a,ImageCapture:J.a,InputDeviceCapabilities:J.a,IntersectionObserver:J.a,IntersectionObserverEntry:J.a,InterventionReport:J.a,KeyframeEffect:J.a,KeyframeEffectReadOnly:J.a,MediaCapabilities:J.a,MediaCapabilitiesInfo:J.a,MediaDeviceInfo:J.a,MediaError:J.a,MediaKeyStatusMap:J.a,MediaKeySystemAccess:J.a,MediaKeys:J.a,MediaKeysPolicy:J.a,MediaMetadata:J.a,MediaSession:J.a,MediaSettingsRange:J.a,MemoryInfo:J.a,MessageChannel:J.a,Metadata:J.a,MutationObserver:J.a,WebKitMutationObserver:J.a,MutationRecord:J.a,NavigationPreloadManager:J.a,Navigator:J.a,NavigatorAutomationInformation:J.a,NavigatorConcurrentHardware:J.a,NavigatorCookies:J.a,NavigatorUserMediaError:J.a,NodeFilter:J.a,NodeIterator:J.a,NonDocumentTypeChildNode:J.a,NonElementParentNode:J.a,NoncedElement:J.a,OffscreenCanvasRenderingContext2D:J.a,OverconstrainedError:J.a,PaintRenderingContext2D:J.a,PaintSize:J.a,PaintWorkletGlobalScope:J.a,PasswordCredential:J.a,Path2D:J.a,PaymentAddress:J.a,PaymentInstruments:J.a,PaymentManager:J.a,PaymentResponse:J.a,PerformanceEntry:J.a,PerformanceLongTaskTiming:J.a,PerformanceMark:J.a,PerformanceMeasure:J.a,PerformanceNavigation:J.a,PerformanceNavigationTiming:J.a,PerformanceObserver:J.a,PerformanceObserverEntryList:J.a,PerformancePaintTiming:J.a,PerformanceResourceTiming:J.a,PerformanceServerTiming:J.a,PerformanceTiming:J.a,Permissions:J.a,PhotoCapabilities:J.a,PositionError:J.a,GeolocationPositionError:J.a,Presentation:J.a,PresentationReceiver:J.a,PublicKeyCredential:J.a,PushManager:J.a,PushMessageData:J.a,PushSubscription:J.a,PushSubscriptionOptions:J.a,Range:J.a,RelatedApplication:J.a,ReportBody:J.a,ReportingObserver:J.a,ResizeObserver:J.a,ResizeObserverEntry:J.a,RTCCertificate:J.a,RTCIceCandidate:J.a,mozRTCIceCandidate:J.a,RTCLegacyStatsReport:J.a,RTCRtpContributingSource:J.a,RTCRtpReceiver:J.a,RTCRtpSender:J.a,RTCSessionDescription:J.a,mozRTCSessionDescription:J.a,RTCStatsResponse:J.a,Screen:J.a,ScrollState:J.a,ScrollTimeline:J.a,Selection:J.a,SpeechRecognitionAlternative:J.a,SpeechSynthesisVoice:J.a,StaticRange:J.a,StorageManager:J.a,StyleMedia:J.a,StylePropertyMap:J.a,StylePropertyMapReadonly:J.a,SyncManager:J.a,TaskAttributionTiming:J.a,TextDetector:J.a,TextMetrics:J.a,TrackDefault:J.a,TreeWalker:J.a,TrustedHTML:J.a,TrustedScriptURL:J.a,TrustedURL:J.a,UnderlyingSourceBase:J.a,URLSearchParams:J.a,VRCoordinateSystem:J.a,VRDisplayCapabilities:J.a,VREyeParameters:J.a,VRFrameData:J.a,VRFrameOfReference:J.a,VRPose:J.a,VRStageBounds:J.a,VRStageBoundsPoint:J.a,VRStageParameters:J.a,ValidityState:J.a,VideoPlaybackQuality:J.a,VideoTrack:J.a,VTTRegion:J.a,WindowClient:J.a,WorkletAnimation:J.a,WorkletGlobalScope:J.a,XPathEvaluator:J.a,XPathExpression:J.a,XPathNSResolver:J.a,XPathResult:J.a,XMLSerializer:J.a,XSLTProcessor:J.a,Bluetooth:J.a,BluetoothCharacteristicProperties:J.a,BluetoothRemoteGATTServer:J.a,BluetoothRemoteGATTService:J.a,BluetoothUUID:J.a,BudgetService:J.a,Cache:J.a,DOMFileSystemSync:J.a,DirectoryEntrySync:J.a,DirectoryReaderSync:J.a,EntrySync:J.a,FileEntrySync:J.a,FileReaderSync:J.a,FileWriterSync:J.a,HTMLAllCollection:J.a,Mojo:J.a,MojoHandle:J.a,MojoWatcher:J.a,NFC:J.a,PagePopupController:J.a,Report:J.a,Request:J.a,Response:J.a,SubtleCrypto:J.a,USBAlternateInterface:J.a,USBConfiguration:J.a,USBDevice:J.a,USBEndpoint:J.a,USBInTransferResult:J.a,USBInterface:J.a,USBIsochronousInTransferPacket:J.a,USBIsochronousInTransferResult:J.a,USBIsochronousOutTransferPacket:J.a,USBIsochronousOutTransferResult:J.a,USBOutTransferResult:J.a,WorkerLocation:J.a,WorkerNavigator:J.a,Worklet:J.a,IDBCursor:J.a,IDBCursorWithValue:J.a,IDBFactory:J.a,IDBIndex:J.a,IDBObjectStore:J.a,IDBObservation:J.a,IDBObserver:J.a,IDBObserverChanges:J.a,SVGAngle:J.a,SVGAnimatedAngle:J.a,SVGAnimatedBoolean:J.a,SVGAnimatedEnumeration:J.a,SVGAnimatedInteger:J.a,SVGAnimatedLength:J.a,SVGAnimatedLengthList:J.a,SVGAnimatedNumber:J.a,SVGAnimatedNumberList:J.a,SVGAnimatedPreserveAspectRatio:J.a,SVGAnimatedRect:J.a,SVGAnimatedString:J.a,SVGAnimatedTransformList:J.a,SVGMatrix:J.a,SVGPoint:J.a,SVGPreserveAspectRatio:J.a,SVGRect:J.a,SVGUnitTypes:J.a,AudioListener:J.a,AudioParam:J.a,AudioTrack:J.a,AudioWorkletGlobalScope:J.a,AudioWorkletProcessor:J.a,PeriodicWave:J.a,WebGLActiveInfo:J.a,ANGLEInstancedArrays:J.a,ANGLE_instanced_arrays:J.a,WebGLBuffer:J.a,WebGLCanvas:J.a,WebGLColorBufferFloat:J.a,WebGLCompressedTextureASTC:J.a,WebGLCompressedTextureATC:J.a,WEBGL_compressed_texture_atc:J.a,WebGLCompressedTextureETC1:J.a,WEBGL_compressed_texture_etc1:J.a,WebGLCompressedTextureETC:J.a,WebGLCompressedTexturePVRTC:J.a,WEBGL_compressed_texture_pvrtc:J.a,WebGLCompressedTextureS3TC:J.a,WEBGL_compressed_texture_s3tc:J.a,WebGLCompressedTextureS3TCsRGB:J.a,WebGLDebugRendererInfo:J.a,WEBGL_debug_renderer_info:J.a,WebGLDebugShaders:J.a,WEBGL_debug_shaders:J.a,WebGLDepthTexture:J.a,WEBGL_depth_texture:J.a,WebGLDrawBuffers:J.a,WEBGL_draw_buffers:J.a,EXTsRGB:J.a,EXT_sRGB:J.a,EXTBlendMinMax:J.a,EXT_blend_minmax:J.a,EXTColorBufferFloat:J.a,EXTColorBufferHalfFloat:J.a,EXTDisjointTimerQuery:J.a,EXTDisjointTimerQueryWebGL2:J.a,EXTFragDepth:J.a,EXT_frag_depth:J.a,EXTShaderTextureLOD:J.a,EXT_shader_texture_lod:J.a,EXTTextureFilterAnisotropic:J.a,EXT_texture_filter_anisotropic:J.a,WebGLFramebuffer:J.a,WebGLGetBufferSubDataAsync:J.a,WebGLLoseContext:J.a,WebGLExtensionLoseContext:J.a,WEBGL_lose_context:J.a,OESElementIndexUint:J.a,OES_element_index_uint:J.a,OESStandardDerivatives:J.a,OES_standard_derivatives:J.a,OESTextureFloat:J.a,OES_texture_float:J.a,OESTextureFloatLinear:J.a,OES_texture_float_linear:J.a,OESTextureHalfFloat:J.a,OES_texture_half_float:J.a,OESTextureHalfFloatLinear:J.a,OES_texture_half_float_linear:J.a,OESVertexArrayObject:J.a,OES_vertex_array_object:J.a,WebGLProgram:J.a,WebGLQuery:J.a,WebGLRenderbuffer:J.a,WebGLRenderingContext:J.a,WebGL2RenderingContext:J.a,WebGLSampler:J.a,WebGLShader:J.a,WebGLShaderPrecisionFormat:J.a,WebGLSync:J.a,WebGLTexture:J.a,WebGLTimerQueryEXT:J.a,WebGLTransformFeedback:J.a,WebGLUniformLocation:J.a,WebGLVertexArrayObject:J.a,WebGLVertexArrayObjectOES:J.a,WebGL2RenderingContextBase:J.a,ArrayBuffer:A.ck,SharedArrayBuffer:A.ck,ArrayBufferView:A.dP,DataView:A.dN,Float32Array:A.fs,Float64Array:A.ft,Int16Array:A.fu,Int32Array:A.fv,Int8Array:A.fw,Uint16Array:A.fx,Uint32Array:A.fy,Uint8ClampedArray:A.dQ,CanvasPixelArray:A.dQ,Uint8Array:A.dR,HTMLAudioElement:A.q,HTMLBRElement:A.q,HTMLCanvasElement:A.q,HTMLContentElement:A.q,HTMLDListElement:A.q,HTMLDataElement:A.q,HTMLDataListElement:A.q,HTMLDetailsElement:A.q,HTMLDialogElement:A.q,HTMLEmbedElement:A.q,HTMLFieldSetElement:A.q,HTMLHRElement:A.q,HTMLHeadElement:A.q,HTMLHtmlElement:A.q,HTMLIFrameElement:A.q,HTMLLIElement:A.q,HTMLLabelElement:A.q,HTMLLegendElement:A.q,HTMLLinkElement:A.q,HTMLMapElement:A.q,HTMLMediaElement:A.q,HTMLMenuElement:A.q,HTMLMetaElement:A.q,HTMLMeterElement:A.q,HTMLModElement:A.q,HTMLOListElement:A.q,HTMLObjectElement:A.q,HTMLOptGroupElement:A.q,HTMLOutputElement:A.q,HTMLParamElement:A.q,HTMLPictureElement:A.q,HTMLPreElement:A.q,HTMLProgressElement:A.q,HTMLQuoteElement:A.q,HTMLScriptElement:A.q,HTMLShadowElement:A.q,HTMLSlotElement:A.q,HTMLSourceElement:A.q,HTMLSpanElement:A.q,HTMLStyleElement:A.q,HTMLTableCaptionElement:A.q,HTMLTableCellElement:A.q,HTMLTableDataCellElement:A.q,HTMLTableHeaderCellElement:A.q,HTMLTableColElement:A.q,HTMLTimeElement:A.q,HTMLTitleElement:A.q,HTMLTrackElement:A.q,HTMLUListElement:A.q,HTMLUnknownElement:A.q,HTMLVideoElement:A.q,HTMLDirectoryElement:A.q,HTMLFontElement:A.q,HTMLFrameElement:A.q,HTMLFrameSetElement:A.q,HTMLMarqueeElement:A.q,HTMLElement:A.q,AccessibleNodeList:A.eN,HTMLAnchorElement:A.cF,HTMLAreaElement:A.eO,HTMLBaseElement:A.cG,Blob:A.bN,HTMLBodyElement:A.c8,HTMLButtonElement:A.bO,CDATASection:A.bn,CharacterData:A.bn,Comment:A.bn,ProcessingInstruction:A.bn,Text:A.bn,CSSPerspective:A.f2,CSSCharsetRule:A.Y,CSSConditionRule:A.Y,CSSFontFaceRule:A.Y,CSSGroupingRule:A.Y,CSSImportRule:A.Y,CSSKeyframeRule:A.Y,MozCSSKeyframeRule:A.Y,WebKitCSSKeyframeRule:A.Y,CSSKeyframesRule:A.Y,MozCSSKeyframesRule:A.Y,WebKitCSSKeyframesRule:A.Y,CSSMediaRule:A.Y,CSSNamespaceRule:A.Y,CSSPageRule:A.Y,CSSRule:A.Y,CSSStyleRule:A.Y,CSSSupportsRule:A.Y,CSSViewportRule:A.Y,CSSStyleDeclaration:A.ca,MSStyleCSSProperties:A.ca,CSS2Properties:A.ca,CSSImageValue:A.aC,CSSKeywordValue:A.aC,CSSNumericValue:A.aC,CSSPositionValue:A.aC,CSSResourceValue:A.aC,CSSUnitValue:A.aC,CSSURLImageValue:A.aC,CSSStyleValue:A.aC,CSSMatrixComponent:A.b9,CSSRotation:A.b9,CSSScale:A.b9,CSSSkew:A.b9,CSSTranslation:A.b9,CSSTransformComponent:A.b9,CSSTransformValue:A.f3,CSSUnparsedValue:A.f4,DataTransferItemList:A.f5,HTMLDivElement:A.dp,XMLDocument:A.cb,Document:A.cb,DOMException:A.f6,DOMImplementation:A.dq,ClientRectList:A.dr,DOMRectList:A.dr,DOMRectReadOnly:A.ds,DOMStringList:A.f7,DOMTokenList:A.f8,MathMLElement:A.D,Element:A.D,AbortPaymentEvent:A.p,AnimationEvent:A.p,AnimationPlaybackEvent:A.p,ApplicationCacheErrorEvent:A.p,BackgroundFetchClickEvent:A.p,BackgroundFetchEvent:A.p,BackgroundFetchFailEvent:A.p,BackgroundFetchedEvent:A.p,BeforeInstallPromptEvent:A.p,BeforeUnloadEvent:A.p,BlobEvent:A.p,CanMakePaymentEvent:A.p,ClipboardEvent:A.p,CloseEvent:A.p,CustomEvent:A.p,DeviceMotionEvent:A.p,DeviceOrientationEvent:A.p,ErrorEvent:A.p,ExtendableEvent:A.p,ExtendableMessageEvent:A.p,FetchEvent:A.p,FontFaceSetLoadEvent:A.p,ForeignFetchEvent:A.p,GamepadEvent:A.p,HashChangeEvent:A.p,InstallEvent:A.p,MediaEncryptedEvent:A.p,MediaKeyMessageEvent:A.p,MediaQueryListEvent:A.p,MediaStreamEvent:A.p,MediaStreamTrackEvent:A.p,MessageEvent:A.p,MIDIConnectionEvent:A.p,MIDIMessageEvent:A.p,MutationEvent:A.p,NotificationEvent:A.p,PageTransitionEvent:A.p,PaymentRequestEvent:A.p,PaymentRequestUpdateEvent:A.p,PopStateEvent:A.p,PresentationConnectionAvailableEvent:A.p,PresentationConnectionCloseEvent:A.p,PromiseRejectionEvent:A.p,PushEvent:A.p,RTCDataChannelEvent:A.p,RTCDTMFToneChangeEvent:A.p,RTCPeerConnectionIceEvent:A.p,RTCTrackEvent:A.p,SecurityPolicyViolationEvent:A.p,SensorErrorEvent:A.p,SpeechRecognitionError:A.p,SpeechRecognitionEvent:A.p,SpeechSynthesisEvent:A.p,StorageEvent:A.p,SyncEvent:A.p,TrackEvent:A.p,TransitionEvent:A.p,WebKitTransitionEvent:A.p,VRDeviceEvent:A.p,VRDisplayEvent:A.p,VRSessionEvent:A.p,MojoInterfaceRequestEvent:A.p,USBConnectionEvent:A.p,IDBVersionChangeEvent:A.p,AudioProcessingEvent:A.p,OfflineAudioCompletionEvent:A.p,WebGLContextEvent:A.p,Event:A.p,InputEvent:A.p,SubmitEvent:A.p,EventSource:A.du,AbsoluteOrientationSensor:A.d,Accelerometer:A.d,AccessibleNode:A.d,AmbientLightSensor:A.d,Animation:A.d,ApplicationCache:A.d,DOMApplicationCache:A.d,OfflineResourceList:A.d,BackgroundFetchRegistration:A.d,BatteryManager:A.d,BroadcastChannel:A.d,CanvasCaptureMediaStreamTrack:A.d,FontFaceSet:A.d,Gyroscope:A.d,LinearAccelerationSensor:A.d,Magnetometer:A.d,MediaDevices:A.d,MediaKeySession:A.d,MediaQueryList:A.d,MediaRecorder:A.d,MediaSource:A.d,MediaStream:A.d,MediaStreamTrack:A.d,MIDIAccess:A.d,MIDIInput:A.d,MIDIOutput:A.d,MIDIPort:A.d,NetworkInformation:A.d,Notification:A.d,OffscreenCanvas:A.d,OrientationSensor:A.d,PaymentRequest:A.d,Performance:A.d,PermissionStatus:A.d,PresentationAvailability:A.d,PresentationConnection:A.d,PresentationConnectionList:A.d,PresentationRequest:A.d,RelativeOrientationSensor:A.d,RemotePlayback:A.d,RTCDataChannel:A.d,DataChannel:A.d,RTCDTMFSender:A.d,RTCPeerConnection:A.d,webkitRTCPeerConnection:A.d,mozRTCPeerConnection:A.d,ScreenOrientation:A.d,Sensor:A.d,ServiceWorker:A.d,ServiceWorkerContainer:A.d,ServiceWorkerRegistration:A.d,SharedWorker:A.d,SpeechRecognition:A.d,webkitSpeechRecognition:A.d,SpeechSynthesis:A.d,SpeechSynthesisUtterance:A.d,VR:A.d,VRDevice:A.d,VRDisplay:A.d,VRSession:A.d,VisualViewport:A.d,WebSocket:A.d,Worker:A.d,WorkerPerformance:A.d,BluetoothDevice:A.d,BluetoothRemoteGATTCharacteristic:A.d,Clipboard:A.d,MojoInterfaceInterceptor:A.d,USB:A.d,IDBDatabase:A.d,IDBOpenDBRequest:A.d,IDBVersionChangeRequest:A.d,IDBRequest:A.d,IDBTransaction:A.d,AnalyserNode:A.d,RealtimeAnalyserNode:A.d,AudioBufferSourceNode:A.d,AudioDestinationNode:A.d,AudioNode:A.d,AudioScheduledSourceNode:A.d,AudioWorkletNode:A.d,BiquadFilterNode:A.d,ChannelMergerNode:A.d,AudioChannelMerger:A.d,ChannelSplitterNode:A.d,AudioChannelSplitter:A.d,ConstantSourceNode:A.d,ConvolverNode:A.d,DelayNode:A.d,DynamicsCompressorNode:A.d,GainNode:A.d,AudioGainNode:A.d,IIRFilterNode:A.d,MediaElementAudioSourceNode:A.d,MediaStreamAudioDestinationNode:A.d,MediaStreamAudioSourceNode:A.d,OscillatorNode:A.d,Oscillator:A.d,PannerNode:A.d,AudioPannerNode:A.d,webkitAudioPannerNode:A.d,ScriptProcessorNode:A.d,JavaScriptAudioNode:A.d,StereoPannerNode:A.d,WaveShaperNode:A.d,EventTarget:A.d,File:A.aI,FileList:A.dw,FileReader:A.dx,FileWriter:A.fa,HTMLFormElement:A.cK,Gamepad:A.aJ,HTMLHeadingElement:A.dy,History:A.fc,HTMLCollection:A.bR,HTMLFormControlsCollection:A.bR,HTMLOptionsCollection:A.bR,HTMLDocument:A.dz,XMLHttpRequest:A.bw,XMLHttpRequestUpload:A.ce,XMLHttpRequestEventTarget:A.ce,ImageData:A.cL,HTMLImageElement:A.dA,HTMLInputElement:A.bS,Location:A.cQ,MediaList:A.fn,MessagePort:A.fo,MIDIInputMap:A.fp,MIDIOutputMap:A.fq,MimeType:A.aK,MimeTypeArray:A.fr,MouseEvent:A.aw,DragEvent:A.aw,PointerEvent:A.aw,WheelEvent:A.aw,DocumentFragment:A.u,ShadowRoot:A.u,DocumentType:A.u,Node:A.u,NodeList:A.cS,RadioNodeList:A.cS,HTMLOptionElement:A.bz,HTMLParagraphElement:A.dU,Plugin:A.aL,PluginArray:A.fE,ProgressEvent:A.b1,ResourceProgressEvent:A.b1,RTCStatsReport:A.fG,HTMLSelectElement:A.bX,SourceBuffer:A.aN,SourceBufferList:A.fI,SpeechGrammar:A.aO,SpeechGrammarList:A.fJ,SpeechRecognitionResult:A.aP,Storage:A.e0,CSSStyleSheet:A.ax,StyleSheet:A.ax,HTMLTableElement:A.e2,HTMLTableRowElement:A.fM,HTMLTableSectionElement:A.fN,HTMLTemplateElement:A.cZ,HTMLTextAreaElement:A.cm,TextTrack:A.aQ,TextTrackCue:A.ay,VTTCue:A.ay,TextTrackCueList:A.fP,TextTrackList:A.fQ,TimeRanges:A.fR,Touch:A.aR,TouchList:A.fU,TrackDefaultList:A.fV,CompositionEvent:A.bg,FocusEvent:A.bg,KeyboardEvent:A.bg,TextEvent:A.bg,TouchEvent:A.bg,UIEvent:A.bg,URL:A.h0,VideoTrackList:A.h2,Window:A.c1,DOMWindow:A.c1,DedicatedWorkerGlobalScope:A.br,ServiceWorkerGlobalScope:A.br,SharedWorkerGlobalScope:A.br,WorkerGlobalScope:A.br,Attr:A.d1,CSSRuleList:A.h9,ClientRect:A.ec,DOMRect:A.ec,GamepadList:A.hn,NamedNodeMap:A.ek,MozNamedAttrMap:A.ek,SpeechRecognitionResultList:A.hO,StyleSheetList:A.hU,IDBKeyRange:A.cP,SVGLength:A.aS,SVGLengthList:A.fm,SVGNumber:A.aW,SVGNumberList:A.fA,SVGPointList:A.fF,SVGScriptElement:A.cX,SVGStringList:A.fL,SVGAElement:A.r,SVGAnimateElement:A.r,SVGAnimateMotionElement:A.r,SVGAnimateTransformElement:A.r,SVGAnimationElement:A.r,SVGCircleElement:A.r,SVGClipPathElement:A.r,SVGDefsElement:A.r,SVGDescElement:A.r,SVGDiscardElement:A.r,SVGEllipseElement:A.r,SVGFEBlendElement:A.r,SVGFEColorMatrixElement:A.r,SVGFEComponentTransferElement:A.r,SVGFECompositeElement:A.r,SVGFEConvolveMatrixElement:A.r,SVGFEDiffuseLightingElement:A.r,SVGFEDisplacementMapElement:A.r,SVGFEDistantLightElement:A.r,SVGFEFloodElement:A.r,SVGFEFuncAElement:A.r,SVGFEFuncBElement:A.r,SVGFEFuncGElement:A.r,SVGFEFuncRElement:A.r,SVGFEGaussianBlurElement:A.r,SVGFEImageElement:A.r,SVGFEMergeElement:A.r,SVGFEMergeNodeElement:A.r,SVGFEMorphologyElement:A.r,SVGFEOffsetElement:A.r,SVGFEPointLightElement:A.r,SVGFESpecularLightingElement:A.r,SVGFESpotLightElement:A.r,SVGFETileElement:A.r,SVGFETurbulenceElement:A.r,SVGFilterElement:A.r,SVGForeignObjectElement:A.r,SVGGElement:A.r,SVGGeometryElement:A.r,SVGGraphicsElement:A.r,SVGImageElement:A.r,SVGLineElement:A.r,SVGLinearGradientElement:A.r,SVGMarkerElement:A.r,SVGMaskElement:A.r,SVGMetadataElement:A.r,SVGPathElement:A.r,SVGPatternElement:A.r,SVGPolygonElement:A.r,SVGPolylineElement:A.r,SVGRadialGradientElement:A.r,SVGRectElement:A.r,SVGSetElement:A.r,SVGStopElement:A.r,SVGStyleElement:A.r,SVGSVGElement:A.r,SVGSwitchElement:A.r,SVGSymbolElement:A.r,SVGTSpanElement:A.r,SVGTextContentElement:A.r,SVGTextElement:A.r,SVGTextPathElement:A.r,SVGTextPositioningElement:A.r,SVGTitleElement:A.r,SVGUseElement:A.r,SVGViewElement:A.r,SVGGradientElement:A.r,SVGComponentTransferFunctionElement:A.r,SVGFEDropShadowElement:A.r,SVGMPathElement:A.r,SVGElement:A.r,SVGTransform:A.aX,SVGTransformList:A.fW,AudioBuffer:A.eS,AudioParamMap:A.eT,AudioTrackList:A.eU,AudioContext:A.bM,webkitAudioContext:A.bM,BaseAudioContext:A.bM,OfflineAudioContext:A.fB})
hunkHelpers.setOrUpdateLeafTags({WebGL:true,AnimationEffectReadOnly:true,AnimationEffectTiming:true,AnimationEffectTimingReadOnly:true,AnimationTimeline:true,AnimationWorkletGlobalScope:true,AuthenticatorAssertionResponse:true,AuthenticatorAttestationResponse:true,AuthenticatorResponse:true,BackgroundFetchFetch:true,BackgroundFetchManager:true,BackgroundFetchSettledFetch:true,BarProp:true,BarcodeDetector:true,BluetoothRemoteGATTDescriptor:true,Body:true,BudgetState:true,CacheStorage:true,CanvasGradient:true,CanvasPattern:true,CanvasRenderingContext2D:true,Client:true,Clients:true,CookieStore:true,Coordinates:true,Credential:true,CredentialUserData:true,CredentialsContainer:true,Crypto:true,CryptoKey:true,CSS:true,CSSVariableReferenceValue:true,CustomElementRegistry:true,DataTransfer:true,DataTransferItem:true,DeprecatedStorageInfo:true,DeprecatedStorageQuota:true,DeprecationReport:true,DetectedBarcode:true,DetectedFace:true,DetectedText:true,DeviceAcceleration:true,DeviceRotationRate:true,DirectoryEntry:true,webkitFileSystemDirectoryEntry:true,FileSystemDirectoryEntry:true,DirectoryReader:true,WebKitDirectoryReader:true,webkitFileSystemDirectoryReader:true,FileSystemDirectoryReader:true,DocumentOrShadowRoot:true,DocumentTimeline:true,DOMError:true,Iterator:true,DOMMatrix:true,DOMMatrixReadOnly:true,DOMParser:true,DOMPoint:true,DOMPointReadOnly:true,DOMQuad:true,DOMStringMap:true,Entry:true,webkitFileSystemEntry:true,FileSystemEntry:true,External:true,FaceDetector:true,FederatedCredential:true,FileEntry:true,webkitFileSystemFileEntry:true,FileSystemFileEntry:true,DOMFileSystem:true,WebKitFileSystem:true,webkitFileSystem:true,FileSystem:true,FontFace:true,FontFaceSource:true,FormData:true,GamepadButton:true,GamepadPose:true,Geolocation:true,Position:true,GeolocationPosition:true,Headers:true,HTMLHyperlinkElementUtils:true,IdleDeadline:true,ImageBitmap:true,ImageBitmapRenderingContext:true,ImageCapture:true,InputDeviceCapabilities:true,IntersectionObserver:true,IntersectionObserverEntry:true,InterventionReport:true,KeyframeEffect:true,KeyframeEffectReadOnly:true,MediaCapabilities:true,MediaCapabilitiesInfo:true,MediaDeviceInfo:true,MediaError:true,MediaKeyStatusMap:true,MediaKeySystemAccess:true,MediaKeys:true,MediaKeysPolicy:true,MediaMetadata:true,MediaSession:true,MediaSettingsRange:true,MemoryInfo:true,MessageChannel:true,Metadata:true,MutationObserver:true,WebKitMutationObserver:true,MutationRecord:true,NavigationPreloadManager:true,Navigator:true,NavigatorAutomationInformation:true,NavigatorConcurrentHardware:true,NavigatorCookies:true,NavigatorUserMediaError:true,NodeFilter:true,NodeIterator:true,NonDocumentTypeChildNode:true,NonElementParentNode:true,NoncedElement:true,OffscreenCanvasRenderingContext2D:true,OverconstrainedError:true,PaintRenderingContext2D:true,PaintSize:true,PaintWorkletGlobalScope:true,PasswordCredential:true,Path2D:true,PaymentAddress:true,PaymentInstruments:true,PaymentManager:true,PaymentResponse:true,PerformanceEntry:true,PerformanceLongTaskTiming:true,PerformanceMark:true,PerformanceMeasure:true,PerformanceNavigation:true,PerformanceNavigationTiming:true,PerformanceObserver:true,PerformanceObserverEntryList:true,PerformancePaintTiming:true,PerformanceResourceTiming:true,PerformanceServerTiming:true,PerformanceTiming:true,Permissions:true,PhotoCapabilities:true,PositionError:true,GeolocationPositionError:true,Presentation:true,PresentationReceiver:true,PublicKeyCredential:true,PushManager:true,PushMessageData:true,PushSubscription:true,PushSubscriptionOptions:true,Range:true,RelatedApplication:true,ReportBody:true,ReportingObserver:true,ResizeObserver:true,ResizeObserverEntry:true,RTCCertificate:true,RTCIceCandidate:true,mozRTCIceCandidate:true,RTCLegacyStatsReport:true,RTCRtpContributingSource:true,RTCRtpReceiver:true,RTCRtpSender:true,RTCSessionDescription:true,mozRTCSessionDescription:true,RTCStatsResponse:true,Screen:true,ScrollState:true,ScrollTimeline:true,Selection:true,SpeechRecognitionAlternative:true,SpeechSynthesisVoice:true,StaticRange:true,StorageManager:true,StyleMedia:true,StylePropertyMap:true,StylePropertyMapReadonly:true,SyncManager:true,TaskAttributionTiming:true,TextDetector:true,TextMetrics:true,TrackDefault:true,TreeWalker:true,TrustedHTML:true,TrustedScriptURL:true,TrustedURL:true,UnderlyingSourceBase:true,URLSearchParams:true,VRCoordinateSystem:true,VRDisplayCapabilities:true,VREyeParameters:true,VRFrameData:true,VRFrameOfReference:true,VRPose:true,VRStageBounds:true,VRStageBoundsPoint:true,VRStageParameters:true,ValidityState:true,VideoPlaybackQuality:true,VideoTrack:true,VTTRegion:true,WindowClient:true,WorkletAnimation:true,WorkletGlobalScope:true,XPathEvaluator:true,XPathExpression:true,XPathNSResolver:true,XPathResult:true,XMLSerializer:true,XSLTProcessor:true,Bluetooth:true,BluetoothCharacteristicProperties:true,BluetoothRemoteGATTServer:true,BluetoothRemoteGATTService:true,BluetoothUUID:true,BudgetService:true,Cache:true,DOMFileSystemSync:true,DirectoryEntrySync:true,DirectoryReaderSync:true,EntrySync:true,FileEntrySync:true,FileReaderSync:true,FileWriterSync:true,HTMLAllCollection:true,Mojo:true,MojoHandle:true,MojoWatcher:true,NFC:true,PagePopupController:true,Report:true,Request:true,Response:true,SubtleCrypto:true,USBAlternateInterface:true,USBConfiguration:true,USBDevice:true,USBEndpoint:true,USBInTransferResult:true,USBInterface:true,USBIsochronousInTransferPacket:true,USBIsochronousInTransferResult:true,USBIsochronousOutTransferPacket:true,USBIsochronousOutTransferResult:true,USBOutTransferResult:true,WorkerLocation:true,WorkerNavigator:true,Worklet:true,IDBCursor:true,IDBCursorWithValue:true,IDBFactory:true,IDBIndex:true,IDBObjectStore:true,IDBObservation:true,IDBObserver:true,IDBObserverChanges:true,SVGAngle:true,SVGAnimatedAngle:true,SVGAnimatedBoolean:true,SVGAnimatedEnumeration:true,SVGAnimatedInteger:true,SVGAnimatedLength:true,SVGAnimatedLengthList:true,SVGAnimatedNumber:true,SVGAnimatedNumberList:true,SVGAnimatedPreserveAspectRatio:true,SVGAnimatedRect:true,SVGAnimatedString:true,SVGAnimatedTransformList:true,SVGMatrix:true,SVGPoint:true,SVGPreserveAspectRatio:true,SVGRect:true,SVGUnitTypes:true,AudioListener:true,AudioParam:true,AudioTrack:true,AudioWorkletGlobalScope:true,AudioWorkletProcessor:true,PeriodicWave:true,WebGLActiveInfo:true,ANGLEInstancedArrays:true,ANGLE_instanced_arrays:true,WebGLBuffer:true,WebGLCanvas:true,WebGLColorBufferFloat:true,WebGLCompressedTextureASTC:true,WebGLCompressedTextureATC:true,WEBGL_compressed_texture_atc:true,WebGLCompressedTextureETC1:true,WEBGL_compressed_texture_etc1:true,WebGLCompressedTextureETC:true,WebGLCompressedTexturePVRTC:true,WEBGL_compressed_texture_pvrtc:true,WebGLCompressedTextureS3TC:true,WEBGL_compressed_texture_s3tc:true,WebGLCompressedTextureS3TCsRGB:true,WebGLDebugRendererInfo:true,WEBGL_debug_renderer_info:true,WebGLDebugShaders:true,WEBGL_debug_shaders:true,WebGLDepthTexture:true,WEBGL_depth_texture:true,WebGLDrawBuffers:true,WEBGL_draw_buffers:true,EXTsRGB:true,EXT_sRGB:true,EXTBlendMinMax:true,EXT_blend_minmax:true,EXTColorBufferFloat:true,EXTColorBufferHalfFloat:true,EXTDisjointTimerQuery:true,EXTDisjointTimerQueryWebGL2:true,EXTFragDepth:true,EXT_frag_depth:true,EXTShaderTextureLOD:true,EXT_shader_texture_lod:true,EXTTextureFilterAnisotropic:true,EXT_texture_filter_anisotropic:true,WebGLFramebuffer:true,WebGLGetBufferSubDataAsync:true,WebGLLoseContext:true,WebGLExtensionLoseContext:true,WEBGL_lose_context:true,OESElementIndexUint:true,OES_element_index_uint:true,OESStandardDerivatives:true,OES_standard_derivatives:true,OESTextureFloat:true,OES_texture_float:true,OESTextureFloatLinear:true,OES_texture_float_linear:true,OESTextureHalfFloat:true,OES_texture_half_float:true,OESTextureHalfFloatLinear:true,OES_texture_half_float_linear:true,OESVertexArrayObject:true,OES_vertex_array_object:true,WebGLProgram:true,WebGLQuery:true,WebGLRenderbuffer:true,WebGLRenderingContext:true,WebGL2RenderingContext:true,WebGLSampler:true,WebGLShader:true,WebGLShaderPrecisionFormat:true,WebGLSync:true,WebGLTexture:true,WebGLTimerQueryEXT:true,WebGLTransformFeedback:true,WebGLUniformLocation:true,WebGLVertexArrayObject:true,WebGLVertexArrayObjectOES:true,WebGL2RenderingContextBase:true,ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false,HTMLAudioElement:true,HTMLBRElement:true,HTMLCanvasElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOutputElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLSpanElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,AccessibleNodeList:true,HTMLAnchorElement:true,HTMLAreaElement:true,HTMLBaseElement:true,Blob:false,HTMLBodyElement:true,HTMLButtonElement:true,CDATASection:true,CharacterData:true,Comment:true,ProcessingInstruction:true,Text:true,CSSPerspective:true,CSSCharsetRule:true,CSSConditionRule:true,CSSFontFaceRule:true,CSSGroupingRule:true,CSSImportRule:true,CSSKeyframeRule:true,MozCSSKeyframeRule:true,WebKitCSSKeyframeRule:true,CSSKeyframesRule:true,MozCSSKeyframesRule:true,WebKitCSSKeyframesRule:true,CSSMediaRule:true,CSSNamespaceRule:true,CSSPageRule:true,CSSRule:true,CSSStyleRule:true,CSSSupportsRule:true,CSSViewportRule:true,CSSStyleDeclaration:true,MSStyleCSSProperties:true,CSS2Properties:true,CSSImageValue:true,CSSKeywordValue:true,CSSNumericValue:true,CSSPositionValue:true,CSSResourceValue:true,CSSUnitValue:true,CSSURLImageValue:true,CSSStyleValue:false,CSSMatrixComponent:true,CSSRotation:true,CSSScale:true,CSSSkew:true,CSSTranslation:true,CSSTransformComponent:false,CSSTransformValue:true,CSSUnparsedValue:true,DataTransferItemList:true,HTMLDivElement:true,XMLDocument:true,Document:false,DOMException:true,DOMImplementation:true,ClientRectList:true,DOMRectList:true,DOMRectReadOnly:false,DOMStringList:true,DOMTokenList:true,MathMLElement:true,Element:false,AbortPaymentEvent:true,AnimationEvent:true,AnimationPlaybackEvent:true,ApplicationCacheErrorEvent:true,BackgroundFetchClickEvent:true,BackgroundFetchEvent:true,BackgroundFetchFailEvent:true,BackgroundFetchedEvent:true,BeforeInstallPromptEvent:true,BeforeUnloadEvent:true,BlobEvent:true,CanMakePaymentEvent:true,ClipboardEvent:true,CloseEvent:true,CustomEvent:true,DeviceMotionEvent:true,DeviceOrientationEvent:true,ErrorEvent:true,ExtendableEvent:true,ExtendableMessageEvent:true,FetchEvent:true,FontFaceSetLoadEvent:true,ForeignFetchEvent:true,GamepadEvent:true,HashChangeEvent:true,InstallEvent:true,MediaEncryptedEvent:true,MediaKeyMessageEvent:true,MediaQueryListEvent:true,MediaStreamEvent:true,MediaStreamTrackEvent:true,MessageEvent:true,MIDIConnectionEvent:true,MIDIMessageEvent:true,MutationEvent:true,NotificationEvent:true,PageTransitionEvent:true,PaymentRequestEvent:true,PaymentRequestUpdateEvent:true,PopStateEvent:true,PresentationConnectionAvailableEvent:true,PresentationConnectionCloseEvent:true,PromiseRejectionEvent:true,PushEvent:true,RTCDataChannelEvent:true,RTCDTMFToneChangeEvent:true,RTCPeerConnectionIceEvent:true,RTCTrackEvent:true,SecurityPolicyViolationEvent:true,SensorErrorEvent:true,SpeechRecognitionError:true,SpeechRecognitionEvent:true,SpeechSynthesisEvent:true,StorageEvent:true,SyncEvent:true,TrackEvent:true,TransitionEvent:true,WebKitTransitionEvent:true,VRDeviceEvent:true,VRDisplayEvent:true,VRSessionEvent:true,MojoInterfaceRequestEvent:true,USBConnectionEvent:true,IDBVersionChangeEvent:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,WebGLContextEvent:true,Event:false,InputEvent:false,SubmitEvent:false,EventSource:true,AbsoluteOrientationSensor:true,Accelerometer:true,AccessibleNode:true,AmbientLightSensor:true,Animation:true,ApplicationCache:true,DOMApplicationCache:true,OfflineResourceList:true,BackgroundFetchRegistration:true,BatteryManager:true,BroadcastChannel:true,CanvasCaptureMediaStreamTrack:true,FontFaceSet:true,Gyroscope:true,LinearAccelerationSensor:true,Magnetometer:true,MediaDevices:true,MediaKeySession:true,MediaQueryList:true,MediaRecorder:true,MediaSource:true,MediaStream:true,MediaStreamTrack:true,MIDIAccess:true,MIDIInput:true,MIDIOutput:true,MIDIPort:true,NetworkInformation:true,Notification:true,OffscreenCanvas:true,OrientationSensor:true,PaymentRequest:true,Performance:true,PermissionStatus:true,PresentationAvailability:true,PresentationConnection:true,PresentationConnectionList:true,PresentationRequest:true,RelativeOrientationSensor:true,RemotePlayback:true,RTCDataChannel:true,DataChannel:true,RTCDTMFSender:true,RTCPeerConnection:true,webkitRTCPeerConnection:true,mozRTCPeerConnection:true,ScreenOrientation:true,Sensor:true,ServiceWorker:true,ServiceWorkerContainer:true,ServiceWorkerRegistration:true,SharedWorker:true,SpeechRecognition:true,webkitSpeechRecognition:true,SpeechSynthesis:true,SpeechSynthesisUtterance:true,VR:true,VRDevice:true,VRDisplay:true,VRSession:true,VisualViewport:true,WebSocket:true,Worker:true,WorkerPerformance:true,BluetoothDevice:true,BluetoothRemoteGATTCharacteristic:true,Clipboard:true,MojoInterfaceInterceptor:true,USB:true,IDBDatabase:true,IDBOpenDBRequest:true,IDBVersionChangeRequest:true,IDBRequest:true,IDBTransaction:true,AnalyserNode:true,RealtimeAnalyserNode:true,AudioBufferSourceNode:true,AudioDestinationNode:true,AudioNode:true,AudioScheduledSourceNode:true,AudioWorkletNode:true,BiquadFilterNode:true,ChannelMergerNode:true,AudioChannelMerger:true,ChannelSplitterNode:true,AudioChannelSplitter:true,ConstantSourceNode:true,ConvolverNode:true,DelayNode:true,DynamicsCompressorNode:true,GainNode:true,AudioGainNode:true,IIRFilterNode:true,MediaElementAudioSourceNode:true,MediaStreamAudioDestinationNode:true,MediaStreamAudioSourceNode:true,OscillatorNode:true,Oscillator:true,PannerNode:true,AudioPannerNode:true,webkitAudioPannerNode:true,ScriptProcessorNode:true,JavaScriptAudioNode:true,StereoPannerNode:true,WaveShaperNode:true,EventTarget:false,File:true,FileList:true,FileReader:true,FileWriter:true,HTMLFormElement:true,Gamepad:true,HTMLHeadingElement:true,History:true,HTMLCollection:true,HTMLFormControlsCollection:true,HTMLOptionsCollection:true,HTMLDocument:true,XMLHttpRequest:true,XMLHttpRequestUpload:true,XMLHttpRequestEventTarget:false,ImageData:true,HTMLImageElement:true,HTMLInputElement:true,Location:true,MediaList:true,MessagePort:true,MIDIInputMap:true,MIDIOutputMap:true,MimeType:true,MimeTypeArray:true,MouseEvent:true,DragEvent:true,PointerEvent:true,WheelEvent:true,DocumentFragment:true,ShadowRoot:true,DocumentType:true,Node:false,NodeList:true,RadioNodeList:true,HTMLOptionElement:true,HTMLParagraphElement:true,Plugin:true,PluginArray:true,ProgressEvent:true,ResourceProgressEvent:true,RTCStatsReport:true,HTMLSelectElement:true,SourceBuffer:true,SourceBufferList:true,SpeechGrammar:true,SpeechGrammarList:true,SpeechRecognitionResult:true,Storage:true,CSSStyleSheet:true,StyleSheet:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,TextTrack:true,TextTrackCue:true,VTTCue:true,TextTrackCueList:true,TextTrackList:true,TimeRanges:true,Touch:true,TouchList:true,TrackDefaultList:true,CompositionEvent:true,FocusEvent:true,KeyboardEvent:true,TextEvent:true,TouchEvent:true,UIEvent:false,URL:true,VideoTrackList:true,Window:true,DOMWindow:true,DedicatedWorkerGlobalScope:true,ServiceWorkerGlobalScope:true,SharedWorkerGlobalScope:true,WorkerGlobalScope:true,Attr:true,CSSRuleList:true,ClientRect:true,DOMRect:true,GamepadList:true,NamedNodeMap:true,MozNamedAttrMap:true,SpeechRecognitionResultList:true,StyleSheetList:true,IDBKeyRange:true,SVGLength:true,SVGLengthList:true,SVGNumber:true,SVGNumberList:true,SVGPointList:true,SVGScriptElement:true,SVGStringList:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true,SVGElement:false,SVGTransform:true,SVGTransformList:true,AudioBuffer:true,AudioParamMap:true,AudioTrackList:true,AudioContext:true,webkitAudioContext:true,BaseAudioContext:false,OfflineAudioContext:true})
A.ar.$nativeSuperclassTag="ArrayBufferView"
A.el.$nativeSuperclassTag="ArrayBufferView"
A.em.$nativeSuperclassTag="ArrayBufferView"
A.dO.$nativeSuperclassTag="ArrayBufferView"
A.en.$nativeSuperclassTag="ArrayBufferView"
A.eo.$nativeSuperclassTag="ArrayBufferView"
A.aV.$nativeSuperclassTag="ArrayBufferView"
A.er.$nativeSuperclassTag="EventTarget"
A.es.$nativeSuperclassTag="EventTarget"
A.ev.$nativeSuperclassTag="EventTarget"
A.ew.$nativeSuperclassTag="EventTarget"})()
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
var s=A.uN
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=app.js.map

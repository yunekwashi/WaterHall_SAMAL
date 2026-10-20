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
if(a[b]!==s){A.w_(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.B(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.p7(b)
return new s(c,this)}:function(){if(s===null)s=A.p7(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.p7(a).prototype
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
pd(a,b,c,d){return{i:a,p:b,e:c,x:d}},
o1(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.pb==null){A.vM()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.b(A.h1("Return interceptor for "+A.e(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.nf
if(o==null)o=$.nf=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.vT(a)
if(p!=null)return p
if(typeof a=="function")return B.ah
s=Object.getPrototypeOf(a)
if(s==null)return B.S
if(s===Object.prototype)return B.S
if(typeof q=="function"){o=$.nf
if(o==null)o=$.nf=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.B,enumerable:false,writable:true,configurable:true})
return B.B}return B.B},
pH(a,b){if(a<0||a>4294967295)throw A.b(A.ak(a,0,4294967295,"length",null))
return J.tq(new Array(a),b)},
oB(a,b){if(a<0)throw A.b(A.aZ("Length must be a non-negative integer: "+a,null))
return A.B(new Array(a),b.i("a5<0>"))},
pG(a,b){return A.B(new Array(a),b.i("a5<0>"))},
tq(a,b){var s=A.B(a,b.i("a5<0>"))
s.$flags=1
return s},
pI(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
tr(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.pI(r))break;++b}return b},
ts(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.d(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.pI(q))break}return b},
bQ(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dK.prototype
return J.fl.prototype}if(typeof a=="string")return J.bY.prototype
if(a==null)return J.dL.prototype
if(typeof a=="boolean")return J.fj.prototype
if(Array.isArray(a))return J.a5.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bD.prototype
if(typeof a=="symbol")return J.cW.prototype
if(typeof a=="bigint")return J.cV.prototype
return a}if(a instanceof A.H)return a
return J.o1(a)},
y(a){if(typeof a=="string")return J.bY.prototype
if(a==null)return a
if(Array.isArray(a))return J.a5.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bD.prototype
if(typeof a=="symbol")return J.cW.prototype
if(typeof a=="bigint")return J.cV.prototype
return a}if(a instanceof A.H)return a
return J.o1(a)},
c8(a){if(a==null)return a
if(Array.isArray(a))return J.a5.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bD.prototype
if(typeof a=="symbol")return J.cW.prototype
if(typeof a=="bigint")return J.cV.prototype
return a}if(a instanceof A.H)return a
return J.o1(a)},
vE(a){if(typeof a=="number")return J.cp.prototype
if(a==null)return a
if(!(a instanceof A.H))return J.bJ.prototype
return a},
vF(a){if(typeof a=="number")return J.cp.prototype
if(typeof a=="string")return J.bY.prototype
if(a==null)return a
if(!(a instanceof A.H))return J.bJ.prototype
return a},
p8(a){if(typeof a=="string")return J.bY.prototype
if(a==null)return a
if(!(a instanceof A.H))return J.bJ.prototype
return a},
K(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bD.prototype
if(typeof a=="symbol")return J.cW.prototype
if(typeof a=="bigint")return J.cV.prototype
return a}if(a instanceof A.H)return a
return J.o1(a)},
p9(a){if(a==null)return a
if(!(a instanceof A.H))return J.bJ.prototype
return a},
i(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bQ(a).a0(a,b)},
rH(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.vE(a).bn(a,b)},
rI(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.vF(a).aK(a,b)},
j(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.vP(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.y(a).h(a,b)},
an(a,b,c){return J.c8(a).k(a,b,c)},
iv(a){return J.K(a).f3(a)},
om(a,b,c,d,e){return J.K(a).fe(a,b,c,d,e)},
rJ(a,b,c,d){return J.K(a).ff(a,b,c,d)},
rK(a,b){return J.K(a).fp(a,b)},
rL(a,b,c,d){return J.K(a).fs(a,b,c,d)},
rM(a,b,c){return J.K(a).fv(a,b,c)},
on(a,b){return J.c8(a).m(a,b)},
rN(a,b,c,d){return J.K(a).bA(a,b,c,d)},
rO(a,b){return J.K(a).fT(a,b)},
rP(a,b,c){return J.K(a).dF(a,b,c)},
iw(a){return J.p9(a).a3(a)},
oo(a,b){return J.y(a).v(a,b)},
op(a,b){return J.K(a).N(a,b)},
eQ(a,b){return J.c8(a).u(a,b)},
rQ(a,b){return J.c8(a).hb(a,b)},
oq(a){return J.K(a).dM(a)},
eR(a,b){return J.c8(a).q(a,b)},
rR(a){return J.K(a).gfU(a)},
cL(a){return J.K(a).gbC(a)},
cd(a){return J.K(a).gar(a)},
rS(a){return J.K(a).gaF(a)},
cM(a){return J.bQ(a).gL(a)},
ix(a){return J.y(a).gE(a)},
or(a){return J.y(a).gT(a)},
aH(a){return J.c8(a).gB(a)},
rT(a){return J.K(a).gJ(a)},
ao(a){return J.y(a).gj(a)},
rU(a){return J.K(a).gdY(a)},
a4(a){return J.K(a).gaU(a)},
rV(a){return J.K(a).gdZ(a)},
pm(a){return J.K(a).ge_(a)},
rW(a){return J.p9(a).gcG(a)},
os(a){return J.p9(a).gag(a)},
rX(a){return J.K(a).ghI(a)},
rY(a){return J.bQ(a).gW(a)},
rZ(a){return J.K(a).geB(a)},
t_(a){return J.K(a).geb(a)},
ce(a,b,c){return J.c8(a).av(a,b,c)},
t0(a,b){return J.bQ(a).dV(a,b)},
t1(a,b,c){return J.K(a).hw(a,b,c)},
iy(a){return J.K(a).e2(a)},
t2(a,b){return J.K(a).C(a,b)},
t3(a,b){return J.K(a).e6(a,b)},
t4(a,b){return J.K(a).eA(a,b)},
t5(a,b){return J.K(a).sfh(a,b)},
dv(a,b){return J.K(a).sU(a,b)},
t6(a,b){return J.K(a).scX(a,b)},
q(a,b){return J.K(a).sG(a,b)},
t7(a,b,c){return J.K(a).cT(a,b,c)},
pn(a,b){return J.p8(a).eC(a,b)},
t8(a){return J.p8(a).hM(a)},
M(a){return J.bQ(a).l(a)},
po(a){return J.p8(a).A(a)},
t9(a,b){return J.c8(a).ei(a,b)},
cU:function cU(){},
fj:function fj(){},
dL:function dL(){},
a:function a(){},
bZ:function bZ(){},
fH:function fH(){},
bJ:function bJ(){},
bD:function bD(){},
cV:function cV(){},
cW:function cW(){},
a5:function a5(a){this.$ti=a},
fi:function fi(){},
m0:function m0(a){this.$ti=a},
be:function be(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cp:function cp(){},
dK:function dK(){},
fl:function fl(){},
bY:function bY(){}},A={oC:function oC(){},
pK(a){return new A.dO("Field '"+a+"' has been assigned during initialization.")},
tv(a){return new A.dO("Field '"+a+"' has not been initialized.")},
o2(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
c3(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
oN(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
ds(a,b,c){return a},
pc(a){var s,r
for(s=$.b6.length,r=0;r<s;++r)if(a===$.b6[r])return!0
return!1},
e8(a,b,c,d){A.d5(b,"start")
if(c!=null){A.d5(c,"end")
if(b>c)A.cc(A.ak(b,0,c,"start",null))}return new A.e7(a,b,c,d.i("e7<0>"))},
tw(a,b,c,d){if(t.gt.b(a))return new A.bA(a,b,c.i("@<0>").K(d).i("bA<1,2>"))
return new A.aK(a,b,c.i("@<0>").K(d).i("aK<1,2>"))},
dJ(){return new A.br("No element")},
to(){return new A.br("Too many elements")},
dO:function dO(a){this.a=a},
f2:function f2(a){this.a=a},
od:function od(){},
mt:function mt(){},
n:function n(){},
a7:function a7(){},
e7:function e7(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
bi:function bi(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aK:function aK(a,b,c){this.a=a
this.b=b
this.$ti=c},
bA:function bA(a,b,c){this.a=a
this.b=b
this.$ti=c},
dU:function dU(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
a1:function a1(a,b,c){this.a=a
this.b=b
this.$ti=c},
I:function I(a,b,c){this.a=a
this.b=b
this.$ti=c},
ay:function ay(a,b,c){this.a=a
this.b=b
this.$ti=c},
cx:function cx(a,b){this.a=a
this.$ti=b},
ec:function ec(a,b){this.a=a
this.$ti=b},
aJ:function aJ(){},
bK:function bK(){},
da:function da(){},
hD:function hD(a){this.a=a},
ct:function ct(a,b){this.a=a
this.$ti=b},
c2:function c2(a){this.a=a},
px(){throw A.b(A.U("Cannot modify unmodifiable Map"))},
rf(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
vP(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.dX.b(a)},
e(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.M(a)
return s},
e0(a){var s,r=$.pQ
if(r==null)r=$.pQ=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
pU(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.d(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
e2(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.a.A(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
e1(a){var s,r,q,p
if(a instanceof A.H)return A.aL(A.az(a),null)
s=J.bQ(a)
if(s===B.ag||s===B.ai||t.cx.b(a)){r=B.E(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.aL(A.az(a),null)},
tE(a){var s,r,q
if(typeof a=="number"||A.cG(a))return J.M(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bU)return a.l(0)
s=$.pl()
for(r=0;r<s.length;++r){q=s[r].ee(a)
if(q!=null)return q}return"Instance of '"+A.e1(a)+"'"},
tC(){if(!!self.location)return self.location.href
return null},
tF(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
a9(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.e.b9(s,10)|55296)>>>0,s&1023|56320)}}throw A.b(A.ak(a,0,1114111,null,null))},
pV(a,b,c,d,e,f,g,h,i){var s,r,q,p=b-1
if(0<=a&&a<100){a+=400
p-=4800}s=B.e.aZ(h,1000)
g+=B.e.ad(h-s,1000)
r=i?Date.UTC(a,p,c,d,e,f,g):new Date(a,p,c,d,e,f,g).valueOf()
q=!0
if(!isNaN(r))if(!(r<-864e13))if(!(r>864e13))q=r===864e13&&s!==0
if(q)return null
return r},
aR(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
d3(a){return a.c?A.aR(a).getUTCFullYear()+0:A.aR(a).getFullYear()+0},
mj(a){return a.c?A.aR(a).getUTCMonth()+1:A.aR(a).getMonth()+1},
pR(a){return a.c?A.aR(a).getUTCDate()+0:A.aR(a).getDate()+0},
oI(a){return a.c?A.aR(a).getUTCHours()+0:A.aR(a).getHours()+0},
oJ(a){return a.c?A.aR(a).getUTCMinutes()+0:A.aR(a).getMinutes()+0},
pT(a){return a.c?A.aR(a).getUTCSeconds()+0:A.aR(a).getSeconds()+0},
pS(a){return a.c?A.aR(a).getUTCMilliseconds()+0:A.aR(a).getMilliseconds()+0},
c_(a,b,c){var s,r,q={}
q.a=0
s=[]
r=[]
q.a=b.length
B.b.R(s,b)
q.b=""
if(c!=null&&c.a!==0)c.q(0,new A.mi(q,r,s))
return J.t0(a,new A.fk(B.au,0,s,r,0))},
tB(a,b,c){var s,r,q
if(Array.isArray(b))s=c==null||c.a===0
else s=!1
if(s){r=b.length
if(r===0){if(!!a.$0)return a.$0()}else if(r===1){if(!!a.$1)return a.$1(b[0])}else if(r===2){if(!!a.$2)return a.$2(b[0],b[1])}else if(r===3){if(!!a.$3)return a.$3(b[0],b[1],b[2])}else if(r===4){if(!!a.$4)return a.$4(b[0],b[1],b[2],b[3])}else if(r===5)if(!!a.$5)return a.$5(b[0],b[1],b[2],b[3],b[4])
q=a[""+"$"+r]
if(q!=null)return q.apply(a,b)}return A.tA(a,b,c)},
tA(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(Array.isArray(b))s=b
else s=A.a3(b,t.z)
r=s.length
q=a.$R
if(r<q)return A.c_(a,s,c)
p=a.$D
o=p==null
n=!o?p():null
m=J.bQ(a)
l=m.$C
if(typeof l=="string")l=m[l]
if(o){if(c!=null&&c.a!==0)return A.c_(a,s,c)
if(r===q)return l.apply(a,s)
return A.c_(a,s,c)}if(Array.isArray(n)){if(c!=null&&c.a!==0)return A.c_(a,s,c)
k=q+n.length
if(r>k)return A.c_(a,s,null)
if(r<k){j=n.slice(r-q)
if(s===b)s=A.a3(s,t.z)
B.b.R(s,j)}return l.apply(a,s)}else{if(r>q)return A.c_(a,s,c)
if(s===b)s=A.a3(s,t.z)
i=Object.keys(n)
if(c==null)for(o=i.length,h=0;h<i.length;i.length===o||(0,A.ar)(i),++h){g=n[A.x(i[h])]
if(B.G===g)return A.c_(a,s,c)
B.b.m(s,g)}else{for(o=i.length,f=0,h=0;h<i.length;i.length===o||(0,A.ar)(i),++h){e=A.x(i[h])
if(c.N(0,e)){++f
B.b.m(s,c.h(0,e))}else{g=n[e]
if(B.G===g)return A.c_(a,s,c)
B.b.m(s,g)}}if(f!==c.a)return A.c_(a,s,c)}return l.apply(a,s)}},
tD(a){var s=a.$thrownJsError
if(s==null)return null
return A.cJ(s)},
oK(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.ah(a,s)
a.$thrownJsError=s
s.stack=b.l(0)}},
vK(a){throw A.b(A.p6(a))},
d(a,b){if(a==null)J.ao(a)
throw A.b(A.io(a,b))},
io(a,b){var s,r="index"
if(!A.dm(b))return new A.b8(!0,b,r,null)
s=A.L(J.ao(a))
if(b<0||b>=s)return A.ab(b,s,a,null,r)
return A.pW(b,r)},
vB(a,b,c){if(a>c)return A.ak(a,0,c,"start",null)
if(b!=null)if(b<a||b>c)return A.ak(b,a,c,"end",null)
return new A.b8(!0,b,"end",null)},
p6(a){return new A.b8(!0,a,null,null)},
b(a){return A.ah(a,new Error())},
ah(a,b){var s
if(a==null)a=new A.bH()
b.dartException=a
s=A.w0
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
w0(){return J.M(this.dartException)},
cc(a,b){throw A.ah(a,b==null?new Error():b)},
am(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.cc(A.uP(a,b,c),s)},
uP(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.eb("'"+s+"': Cannot "+o+" "+l+k+n)},
ar(a){throw A.b(A.aa(a))},
bI(a){var s,r,q,p,o,n
a=A.rb(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.B([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.mB(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
mC(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
q2(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
oD(a,b){var s=b==null,r=s?null:b.method
return new A.fm(a,r,s?null:b.receiver)},
as(a){var s
if(a==null)return new A.mg(a)
if(a instanceof A.dF){s=a.a
return A.cb(a,s==null?A.aY(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.cb(a,a.dartException)
return A.vq(a)},
cb(a,b){if(t.W.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
vq(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.e.b9(r,16)&8191)===10)switch(q){case 438:return A.cb(a,A.oD(A.e(s)+" (Error "+q+")",null))
case 445:case 5007:A.e(s)
return A.cb(a,new A.e_())}}if(a instanceof TypeError){p=$.rp()
o=$.rq()
n=$.rr()
m=$.rs()
l=$.rv()
k=$.rw()
j=$.ru()
$.rt()
i=$.ry()
h=$.rx()
g=p.af(s)
if(g!=null)return A.cb(a,A.oD(A.x(s),g))
else{g=o.af(s)
if(g!=null){g.method="call"
return A.cb(a,A.oD(A.x(s),g))}else if(n.af(s)!=null||m.af(s)!=null||l.af(s)!=null||k.af(s)!=null||j.af(s)!=null||m.af(s)!=null||i.af(s)!=null||h.af(s)!=null){A.x(s)
return A.cb(a,new A.e_())}}return A.cb(a,new A.h2(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.e5()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.cb(a,new A.b8(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.e5()
return a},
cJ(a){var s
if(a instanceof A.dF)return a.b
if(a==null)return new A.ez(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.ez(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
is(a){if(a==null)return J.cM(a)
if(typeof a=="object")return A.e0(a)
return J.cM(a)},
vD(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.k(0,a[s],a[r])}return b},
uZ(a,b,c,d,e,f){t.Z.a(a)
switch(A.L(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.b(new A.n_("Unsupported number of arguments for wrapped closure"))},
bO(a,b){var s
if(a==null)return null
s=a.$identity
if(!!s)return s
s=A.vy(a,b)
a.$identity=s
return s},
vy(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.uZ)},
tg(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.fO().constructor.prototype):Object.create(new A.cP(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.pw(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.tc(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.pw(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
tc(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.ta)}throw A.b("Error in functionType of tearoff")},
td(a,b,c,d){var s=A.pu
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
pw(a,b,c,d){if(c)return A.tf(a,b,d)
return A.td(b.length,d,a,b)},
te(a,b,c,d){var s=A.pu,r=A.tb
switch(b?-1:a){case 0:throw A.b(new A.fL("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
tf(a,b,c){var s,r
if($.ps==null)$.ps=A.pr("interceptor")
if($.pt==null)$.pt=A.pr("receiver")
s=b.length
r=A.te(s,c,a,b)
return r},
p7(a){return A.tg(a)},
ta(a,b){return A.nz(v.typeUniverse,A.az(a.a),b)},
pu(a){return a.a},
tb(a){return a.b},
pr(a){var s,r,q,p=new A.cP("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.b(A.aZ("Field name "+a+" not found.",null))},
pa(a){return v.getIsolateTag(a)},
pf(a,b,c){var s,r
try{s=A.uO(a,c,b)
return s}catch(r){}return null},
uO(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=[],h=typeof a=="object",g=typeof a=="function"
if(g){s=A.qR(a)
if(s!=null)i.push("globalThis."+s)
else i.push("name: "+A.bB(A.im(a,"name")))}if(b?!g:!h)i.push('typeof: "'+typeof a+'"')
if(!(h||g))return i.join(", ")
r=v.G
q=r.Object
p=q.getPrototypeOf(a)
o=p==null
if(o)i.push("prototype: null")
else{n=A.im(p,"constructor")
if(n!=null){m=A.qR(n)
if(m!=null){if(g)l="Function"
else l=c?"Array":null
if(m!==l)i.push("constructor: "+m)}else{k=A.im(n,"name")
if(k!=null)i.push("constructor.name: "+A.bB(k))}}}if(r.Array.isArray(a))i.push("isArray")
if(!g){j=A.im(a,"length")
if(typeof j=="number")i.push("length: "+A.e(j))}if(!o&&!(a instanceof q))i.push("cross-realm")
return i.join(", ")},
im(a,b){var s=v.G.Object.getOwnPropertyDescriptor(a,b)
if(s==null)return null
return s.value},
qR(a){var s
if(typeof a!="function")return null
s=A.im(a,"name")
if(typeof s=="string"&&/^[A-Za-z_$][A-Za-z_$0-9]*$/.test(s))if(a===v.G[s])return s
return null},
xb(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
vT(a){var s,r,q,p,o,n=A.x($.r5.$1(a)),m=$.o0[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.o6[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.al($.r1.$2(a,n))
if(q!=null){m=$.o0[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.o6[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.o9(s)
$.o0[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.o6[n]=s
return s}if(p==="-"){o=A.o9(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.r9(a,s)
if(p==="*")throw A.b(A.h1(n))
if(v.leafTags[n]===true){o=A.o9(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.r9(a,s)},
r9(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.pd(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
o9(a){return J.pd(a,!1,null,!!a.$iN)},
vV(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.o9(s)
else return J.pd(s,c,null,null)},
vM(){if(!0===$.pb)return
$.pb=!0
A.vN()},
vN(){var s,r,q,p,o,n,m,l
$.o0=Object.create(null)
$.o6=Object.create(null)
A.vL()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.ra.$1(o)
if(n!=null){m=A.vV(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
vL(){var s,r,q,p,o,n,m=B.a0()
m=A.dr(B.a1,A.dr(B.a2,A.dr(B.F,A.dr(B.F,A.dr(B.a3,A.dr(B.a4,A.dr(B.a5(B.E),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.r5=new A.o3(p)
$.r1=new A.o4(o)
$.ra=new A.o5(n)},
dr(a,b){return a(b)||b},
vA(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
tt(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.b(A.a2("Illegal RegExp pattern ("+String(o)+")",a,null))},
vY(a,b,c){var s=a.indexOf(b,c)
return s>=0},
vC(a){if(a.indexOf("$",0)>=0)return a.replace(/\$/g,"$$$$")
return a},
rb(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
rd(a,b,c){var s=A.vZ(a,b,c)
return s},
vZ(a,b,c){var s,r,q
if(b===""){if(a==="")return c
s=a.length
for(r=c,q=0;q<s;++q)r=r+a[q]+c
return r.charCodeAt(0)==0?r:r}if(a.indexOf(b,0)<0)return a
if(a.length<500||c.indexOf("$",0)>=0)return a.split(b).join(c)
return a.replace(new RegExp(A.rb(b),"g"),A.vC(c))},
dz:function dz(a,b){this.a=a
this.$ti=b},
dy:function dy(){},
by:function by(a,b,c){this.a=a
this.b=b
this.$ti=c},
eo:function eo(a,b){this.a=a
this.$ti=b},
ep:function ep(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
fk:function fk(a,b,c,d,e){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e},
mi:function mi(a,b,c){this.a=a
this.b=b
this.c=c},
d6:function d6(){},
mB:function mB(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
e_:function e_(){},
fm:function fm(a,b,c){this.a=a
this.b=b
this.c=c},
h2:function h2(a){this.a=a},
mg:function mg(a){this.a=a},
dF:function dF(a,b){this.a=a
this.b=b},
ez:function ez(a){this.a=a
this.b=null},
bU:function bU(){},
f0:function f0(){},
f1:function f1(){},
fS:function fS(){},
fO:function fO(){},
cP:function cP(a,b){this.a=a
this.b=b},
fL:function fL(a){this.a=a},
nl:function nl(){},
bh:function bh(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
m1:function m1(a){this.a=a},
m6:function m6(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
cr:function cr(a,b){this.a=a
this.$ti=b},
dR:function dR(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b2:function b2(a,b){this.a=a
this.$ti=b},
dS:function dS(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
dP:function dP(a,b){this.a=a
this.$ti=b},
dQ:function dQ(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
o3:function o3(a){this.a=a},
o4:function o4(a){this.a=a},
o5:function o5(a){this.a=a},
dM:function dM(a,b){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null},
nj:function nj(a){this.b=a},
uK(a){return a},
uQ(a){return a},
tx(a){return new Int8Array(a)},
pN(a){return new Uint8Array(a)},
pO(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
bN(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.io(b,a))},
uL(a,b,c){var s
if(!(a>>>0!==a))s=b>>>0!==b||a>b||b>c
else s=!0
if(s)throw A.b(A.vB(a,b,c))
return b},
bF:function bF(){},
fA:function fA(){},
ap:function ap(){},
i9:function i9(a){this.a=a},
dV:function dV(){},
aw:function aw(){},
dW:function dW(){},
b3:function b3(){},
fv:function fv(){},
fw:function fw(){},
fx:function fx(){},
fy:function fy(){},
fz:function fz(){},
fB:function fB(){},
fC:function fC(){},
dX:function dX(){},
dY:function dY(){},
er:function er(){},
es:function es(){},
et:function et(){},
eu:function eu(){},
oL(a,b){var s=b.c
return s==null?b.c=A.eF(a,"ag",[b.x]):s},
pX(a){var s=a.w
if(s===6||s===7)return A.pX(a.x)
return s===11||s===12},
tJ(a){return a.as},
ip(a){return A.ny(v.typeUniverse,a,!1)},
cH(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.cH(a1,s,a3,a4)
if(r===s)return a2
return A.qp(a1,r,!0)
case 7:s=a2.x
r=A.cH(a1,s,a3,a4)
if(r===s)return a2
return A.qo(a1,r,!0)
case 8:q=a2.y
p=A.dq(a1,q,a3,a4)
if(p===q)return a2
return A.eF(a1,a2.x,p)
case 9:o=a2.x
n=A.cH(a1,o,a3,a4)
m=a2.y
l=A.dq(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.oT(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.dq(a1,j,a3,a4)
if(i===j)return a2
return A.qq(a1,k,i)
case 11:h=a2.x
g=A.cH(a1,h,a3,a4)
f=a2.y
e=A.vn(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.qn(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.dq(a1,d,a3,a4)
o=a2.x
n=A.cH(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.oU(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.b(A.eV("Attempted to substitute unexpected RTI kind "+a0))}},
dq(a,b,c,d){var s,r,q,p,o=b.length,n=A.nI(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.cH(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
vo(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.nI(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.cH(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
vn(a,b,c,d){var s,r=b.a,q=A.dq(a,r,c,d),p=b.b,o=A.dq(a,p,c,d),n=b.c,m=A.vo(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.ht()
s.a=q
s.b=o
s.c=m
return s},
B(a,b){a[v.arrayRti]=b
return a},
r3(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.vH(s)
return a.$S()}return null},
vO(a,b){var s
if(A.pX(b))if(a instanceof A.bU){s=A.r3(a)
if(s!=null)return s}return A.az(a)},
az(a){if(a instanceof A.H)return A.C(a)
if(Array.isArray(a))return A.E(a)
return A.p3(J.bQ(a))},
E(a){var s=a[v.arrayRti],r=t.dG
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
C(a){var s=a.$ti
return s!=null?s:A.p3(a)},
p3(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.uX(a,s)},
uX(a,b){var s=a instanceof A.bU?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.un(v.typeUniverse,s.name)
b.$ccache=r
return r},
vH(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.ny(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
vG(a){return A.cI(A.C(a))},
vm(a){var s=a instanceof A.bU?A.r3(a):null
if(s!=null)return s
if(t.aJ.b(a))return J.rY(a).a
if(Array.isArray(a))return A.E(a)
return A.az(a)},
cI(a){var s=a.r
return s==null?a.r=new A.nx(a):s},
bp(a){return A.cI(A.ny(v.typeUniverse,a,!1))},
uW(a){var s=this
s.b=A.vk(s)
return s.b(a)},
vk(a){var s,r,q,p,o
if(a===t.K)return A.v4
if(A.cK(a))return A.v8
s=a.w
if(s===6)return A.uU
if(s===1)return A.qQ
if(s===7)return A.v_
r=A.vj(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.cK)){a.f="$i"+q
if(q==="p")return A.v2
if(a===t.m)return A.v1
return A.v7}}else if(s===10){p=A.vA(a.x,a.y)
o=p==null?A.qQ:p
return o==null?A.aY(o):o}return A.uS},
vj(a){if(a.w===8){if(a===t.q)return A.dm
if(a===t.dx||a===t.u)return A.v3
if(a===t.N)return A.v6
if(a===t.y)return A.cG}return null},
uV(a){var s=this,r=A.uR
if(A.cK(s))r=A.uD
else if(s===t.K)r=A.aY
else if(A.dt(s)){r=A.uT
if(s===t.aV)r=A.nL
else if(s===t.x)r=A.al
else if(s===t.fU)r=A.qG
else if(s===t.jh)r=A.nM
else if(s===t.jX)r=A.uA
else if(s===t.mU)r=A.uC}else if(s===t.q)r=A.L
else if(s===t.N)r=A.x
else if(s===t.y)r=A.nK
else if(s===t.u)r=A.ac
else if(s===t.dx)r=A.qH
else if(s===t.m)r=A.uB
s.a=r
return s.a(a)},
uS(a){var s=this
if(a==null)return A.dt(s)
return A.r8(v.typeUniverse,A.vO(a,s),s)},
uU(a){if(a==null)return!0
return this.x.b(a)},
v7(a){var s,r=this
if(a==null)return A.dt(r)
s=r.f
if(a instanceof A.H)return!!a[s]
return!!J.bQ(a)[s]},
v2(a){var s,r=this
if(a==null)return A.dt(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.H)return!!a[s]
return!!J.bQ(a)[s]},
v1(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.H)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
qP(a){if(typeof a=="object"){if(a instanceof A.H)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
uR(a){var s=this
if(a==null){if(A.dt(s))return a}else if(s.b(a))return a
throw A.ah(A.qJ(a,s),new Error())},
uT(a){var s=this
if(a==null||s.b(a))return a
throw A.ah(A.qJ(a,s),new Error())},
qJ(a,b){return new A.dj("TypeError: "+A.qb(a,A.aL(b,null)))},
eO(a,b,c,d){if(A.r8(v.typeUniverse,a,b))return a
throw A.ah(A.ue("The type argument '"+A.aL(a,null)+"' is not a subtype of the type variable bound '"+A.aL(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
qb(a,b){return A.bB(a)+": type '"+A.aL(A.vm(a),null)+"' is not a subtype of type '"+b+"'"},
ue(a){return new A.dj("TypeError: "+a)},
bc(a,b){return new A.dj("TypeError: "+A.qb(a,b))},
v_(a){var s=this
return s.x.b(a)||A.oL(v.typeUniverse,s).b(a)},
v4(a){return a!=null},
aY(a){if(a!=null)return a
throw A.ah(A.bc(a,"Object"),new Error())},
v8(a){return!0},
uD(a){return a},
qQ(a){return!1},
cG(a){return!0===a||!1===a},
nK(a){if(!0===a)return!0
if(!1===a)return!1
throw A.ah(A.bc(a,"bool"),new Error())},
qG(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.ah(A.bc(a,"bool?"),new Error())},
qH(a){if(typeof a=="number")return a
throw A.ah(A.bc(a,"double"),new Error())},
uA(a){if(typeof a=="number")return a
if(a==null)return a
throw A.ah(A.bc(a,"double?"),new Error())},
dm(a){return typeof a=="number"&&Math.floor(a)===a},
L(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.ah(A.bc(a,"int"),new Error())},
nL(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.ah(A.bc(a,"int?"),new Error())},
v3(a){return typeof a=="number"},
ac(a){if(typeof a=="number")return a
throw A.ah(A.bc(a,"num"),new Error())},
nM(a){if(typeof a=="number")return a
if(a==null)return a
throw A.ah(A.bc(a,"num?"),new Error())},
v6(a){return typeof a=="string"},
x(a){if(typeof a=="string")return a
throw A.ah(A.bc(a,"String"),new Error())},
al(a){if(typeof a=="string")return a
if(a==null)return a
throw A.ah(A.bc(a,"String?"),new Error())},
uB(a){if(A.qP(a))return a
throw A.ah(A.bc(a,"JSObject"),new Error())},
uC(a){if(a==null)return a
if(A.qP(a))return a
throw A.ah(A.bc(a,"JSObject?"),new Error())},
qW(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aL(a[q],b)
return s},
vg(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.qW(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.aL(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
qK(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.B([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.b.m(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.d(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.aL(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.aL(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.aL(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.aL(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.aL(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
aL(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.aL(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.aL(a.x,b)+">"
if(l===8){p=A.vp(a.x)
o=a.y
return o.length>0?p+("<"+A.qW(o,b)+">"):p}if(l===10)return A.vg(a,b)
if(l===11)return A.qK(a,b,null)
if(l===12)return A.qK(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.d(b,n)
return b[n]}return"?"},
vp(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
uo(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
un(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.ny(a,b,!1)
else if(typeof m=="number"){s=m
r=A.eG(a,5,"#")
q=A.nI(s)
for(p=0;p<s;++p)q[p]=r
o=A.eF(a,b,q)
n[b]=o
return o}else return m},
ul(a,b){return A.qE(a.tR,b)},
uk(a,b){return A.qE(a.eT,b)},
ny(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.qh(A.qf(a,null,b,!1))
r.set(b,s)
return s},
nz(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.qh(A.qf(a,b,c,!0))
q.set(c,r)
return r},
um(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.oT(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
c7(a,b){b.a=A.uV
b.b=A.uW
return b},
eG(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.bl(null,null)
s.w=b
s.as=c
r=A.c7(a,s)
a.eC.set(c,r)
return r},
qp(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.ui(a,b,r,c)
a.eC.set(r,s)
return s},
ui(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.cK(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.dt(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.bl(null,null)
q.w=6
q.x=b
q.as=c
return A.c7(a,q)},
qo(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.ug(a,b,r,c)
a.eC.set(r,s)
return s},
ug(a,b,c,d){var s,r
if(d){s=b.w
if(A.cK(b)||b===t.K)return b
else if(s===1)return A.eF(a,"ag",[b])
else if(b===t.a||b===t.T)return t.gK}r=new A.bl(null,null)
r.w=7
r.x=b
r.as=c
return A.c7(a,r)},
uj(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.bl(null,null)
s.w=13
s.x=b
s.as=q
r=A.c7(a,s)
a.eC.set(q,r)
return r},
eE(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
uf(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
eF(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.eE(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.bl(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.c7(a,r)
a.eC.set(p,q)
return q},
oT(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.eE(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.bl(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.c7(a,o)
a.eC.set(q,n)
return n},
qq(a,b,c){var s,r,q="+"+(b+"("+A.eE(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.bl(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.c7(a,s)
a.eC.set(q,r)
return r},
qn(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.eE(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.eE(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.uf(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.bl(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.c7(a,p)
a.eC.set(r,o)
return o},
oU(a,b,c,d){var s,r=b.as+("<"+A.eE(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.uh(a,b,c,r,d)
a.eC.set(r,s)
return s},
uh(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.nI(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.cH(a,b,r,0)
m=A.dq(a,c,r,0)
return A.oU(a,n,m,c!==m)}}l=new A.bl(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.c7(a,l)},
qf(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
qh(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.u7(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.qg(a,r,l,k,!1)
else if(q===46)r=A.qg(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.cE(a.u,a.e,k.pop()))
break
case 94:k.push(A.uj(a.u,k.pop()))
break
case 35:k.push(A.eG(a.u,5,"#"))
break
case 64:k.push(A.eG(a.u,2,"@"))
break
case 126:k.push(A.eG(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.u9(a,k)
break
case 38:A.u8(a,k)
break
case 63:p=a.u
k.push(A.qp(p,A.cE(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.qo(p,A.cE(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.u6(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.qi(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.ub(a.u,a.e,o)
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
return A.cE(a.u,a.e,m)},
u7(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
qg(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.uo(s,o.x)[p]
if(n==null)A.cc('No "'+p+'" in "'+A.tJ(o)+'"')
d.push(A.nz(s,o,n))}else d.push(p)
return m},
u9(a,b){var s,r=a.u,q=A.qe(a,b),p=b.pop()
if(typeof p=="string")b.push(A.eF(r,p,q))
else{s=A.cE(r,a.e,p)
switch(s.w){case 11:b.push(A.oU(r,s,q,a.n))
break
default:b.push(A.oT(r,s,q))
break}}},
u6(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.qe(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.cE(p,a.e,o)
q=new A.ht()
q.a=s
q.b=n
q.c=m
b.push(A.qn(p,r,q))
return
case-4:b.push(A.qq(p,b.pop(),s))
return
default:throw A.b(A.eV("Unexpected state under `()`: "+A.e(o)))}},
u8(a,b){var s=b.pop()
if(0===s){b.push(A.eG(a.u,1,"0&"))
return}if(1===s){b.push(A.eG(a.u,4,"1&"))
return}throw A.b(A.eV("Unexpected extended operation "+A.e(s)))},
qe(a,b){var s=b.splice(a.p)
A.qi(a.u,a.e,s)
a.p=b.pop()
return s},
cE(a,b,c){if(typeof c=="string")return A.eF(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.ua(a,b,c)}else return c},
qi(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.cE(a,b,c[s])},
ub(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.cE(a,b,c[s])},
ua(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.b(A.eV("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.b(A.eV("Bad index "+c+" for "+b.l(0)))},
r8(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.aq(a,b,null,c,null)
r.set(c,s)}return s},
aq(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.cK(d))return!0
s=b.w
if(s===4)return!0
if(A.cK(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.aq(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.aq(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.aq(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.aq(a,b.x,c,d,e))return!1
return A.aq(a,A.oL(a,b),c,d,e)}if(s===6)return A.aq(a,p,c,d,e)&&A.aq(a,b.x,c,d,e)
if(q===7){if(A.aq(a,b,c,d.x,e))return!0
return A.aq(a,b,c,A.oL(a,d),e)}if(q===6)return A.aq(a,b,c,p,e)||A.aq(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.Z)return!0
o=s===10
if(o&&d===t.lZ)return!0
if(q===12){if(b===t.et)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.aq(a,j,c,i,e)||!A.aq(a,i,e,j,c))return!1}return A.qO(a,b.x,c,d.x,e)}if(q===11){if(b===t.et)return!0
if(p)return!1
return A.qO(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.v0(a,b,c,d,e)}if(o&&q===10)return A.v5(a,b,c,d,e)
return!1},
qO(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.aq(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.aq(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.aq(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.aq(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.aq(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
v0(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.nz(a,b,r[o])
return A.qF(a,p,null,c,d.y,e)}return A.qF(a,b.y,null,c,d.y,e)},
qF(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.aq(a,b[s],d,e[s],f))return!1
return!0},
v5(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.aq(a,r[s],c,q[s],e))return!1
return!0},
dt(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.cK(a))if(s!==6)r=s===7&&A.dt(a.x)
return r},
cK(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
qE(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
nI(a){return a>0?new Array(a):v.typeUniverse.sEA},
bl:function bl(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
ht:function ht(){this.c=this.b=this.a=null},
nx:function nx(a){this.a=a},
hq:function hq(){},
dj:function dj(a){this.a=a},
tQ(){var s,r,q
if(self.scheduleImmediate!=null)return A.vs()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.bO(new A.mR(s),1)).observe(r,{childList:true})
return new A.mQ(s,r,q)}else if(self.setImmediate!=null)return A.vt()
return A.vu()},
tR(a){self.scheduleImmediate(A.bO(new A.mS(t.M.a(a)),0))},
tS(a){self.setImmediate(A.bO(new A.mT(t.M.a(a)),0))},
tT(a){A.oO(B.aa,t.M.a(a))},
oO(a,b){var s=B.e.ad(a.a,1000)
return A.uc(s<0?0:s,b)},
q1(a,b){var s=B.e.ad(a.a,1000)
return A.ud(s<0?0:s,b)},
uc(a,b){var s=new A.eD(!0)
s.eT(a,b)
return s},
ud(a,b){var s=new A.eD(!1)
s.eU(a,b)
return s},
S(a){return new A.ha(new A.W($.V,a.i("W<0>")),a.i("ha<0>"))},
R(a,b){a.$2(0,null)
b.b=!0
return b.a},
w(a,b){A.uE(a,b)},
Q(a,b){b.bc(0,a)},
P(a,b){b.cr(A.as(a),A.cJ(a))},
uE(a,b){var s,r,q=new A.nN(b),p=new A.nO(b)
if(a instanceof A.W)a.dr(q,p,t.z)
else{s=t.z
if(a instanceof A.W)a.bR(q,p,s)
else{r=new A.W($.V,t._)
r.a=8
r.c=a
r.dr(q,p,s)}}},
T(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.V.cH(new A.nX(s),t.H,t.q,t.z)},
ql(a,b,c){return 0},
ot(a){var s
if(t.W.b(a)){s=a.gb0()
if(s!=null)return s}return B.u},
oy(a,b){var s
b.a(a)
s=new A.W($.V,b.i("W<0>"))
s.b3(a)
return s},
qN(a,b){if($.V===B.h)return null
return null},
uY(a,b){if($.V!==B.h)A.qN(a,b)
if(b==null)if(t.W.b(a)){b=a.gb0()
if(b==null){A.oK(a,B.u)
b=B.u}}else b=B.u
else if(t.W.b(a))A.oK(a,b)
return new A.aB(a,b)},
n3(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t._;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.oM()
b.bZ(new A.aB(new A.b8(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.e.a(b.c)
b.a=b.a&1|4
b.c=n
n.di(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.b6()
b.br(o.a)
A.cz(b,p)
return}b.a^=2
A.dp(null,null,b.b,t.M.a(new A.n4(o,b)))},
cz(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.n,r=t.e;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.il(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.cz(d.a,c)
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
A.il(j.a,j.b)
return}g=$.V
if(g!==h)$.V=h
else g=null
c=c.c
if((c&15)===8)new A.n8(q,d,n).$0()
else if(o){if((c&1)!==0)new A.n7(q,j).$0()}else if((c&2)!==0)new A.n6(d,q).$0()
if(g!=null)$.V=g
c=q.c
if(c instanceof A.W){p=q.a.$ti
p=p.i("ag<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.bx(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.n3(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.bx(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
qT(a,b){var s
if(t.ng.b(a))return b.cH(a,t.z,t.K,t.l)
s=t.w
if(s.b(a))return s.a(a)
throw A.b(A.kM(a,"onError",u.c))},
va(){var s,r
for(s=$.dn;s!=null;s=$.dn){$.eN=null
r=s.b
$.dn=r
if(r==null)$.eM=null
s.a.$0()}},
vl(){$.p4=!0
try{A.va()}finally{$.eN=null
$.p4=!1
if($.dn!=null)$.ph().$1(A.r2())}},
qZ(a){var s=new A.hb(a),r=$.eM
if(r==null){$.dn=$.eM=s
if(!$.p4)$.ph().$1(A.r2())}else $.eM=r.b=s},
vi(a){var s,r,q,p=$.dn
if(p==null){A.qZ(a)
$.eN=$.eM
return}s=new A.hb(a)
r=$.eN
if(r==null){s.b=p
$.dn=$.eN=s}else{q=r.b
s.b=q
$.eN=r.b=s
if(q==null)$.eM=s}},
rc(a){var s=null,r=$.V
if(B.h===r){A.dp(s,s,B.h,a)
return}A.dp(s,s,r,t.M.a(r.cp(a)))},
wH(a,b){A.ds(a,"stream",t.K)
return new A.hX(b.i("hX<0>"))},
qX(a){return},
qa(a,b,c){var s=b==null?A.vv():b
return t.gS.K(c).i("1(2)").a(s)},
tX(a,b){if(b==null)b=A.vx()
if(t.fQ.b(b))return a.cH(b,t.z,t.K,t.l)
if(t.i6.b(b))return t.w.a(b)
throw A.b(A.aZ("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace.",null))},
vb(a){},
vd(a,b){A.il(A.aY(a),t.l.a(b))},
vc(){},
uH(a,b,c){var s,r,q,p=a.a3(0)
if(p!==$.oi()){s=t.mY.a(new A.nP(b,c))
r=p.$ti
q=$.V
p.b2(new A.bo(new A.W(q,r),8,s,null,r.i("bo<1,1>")))}else b.c2(c)},
fX(a,b){var s=$.V
if(s===B.h)return A.oO(a,t.M.a(b))
return A.oO(a,t.M.a(s.cp(b)))},
mA(a,b){var s=$.V
if(s===B.h)return A.q1(a,t.my.a(b))
return A.q1(a,t.my.a(s.dG(b,t.D)))},
il(a,b){A.vi(new A.nW(a,b))},
qU(a,b,c,d,e){var s,r=$.V
if(r===c)return d.$0()
$.V=c
s=r
try{r=d.$0()
return r}finally{$.V=s}},
qV(a,b,c,d,e,f,g){var s,r=$.V
if(r===c)return d.$1(e)
$.V=c
s=r
try{r=d.$1(e)
return r}finally{$.V=s}},
vh(a,b,c,d,e,f,g,h,i){var s,r=$.V
if(r===c)return d.$2(e,f)
$.V=c
s=r
try{r=d.$2(e,f)
return r}finally{$.V=s}},
dp(a,b,c,d){t.M.a(d)
if(B.h!==c){d=c.cp(d)
d=d}A.qZ(d)},
mR:function mR(a){this.a=a},
mQ:function mQ(a,b,c){this.a=a
this.b=b
this.c=c},
mS:function mS(a){this.a=a},
mT:function mT(a){this.a=a},
eD:function eD(a){this.a=a
this.b=null
this.c=0},
nw:function nw(a,b){this.a=a
this.b=b},
nv:function nv(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
ha:function ha(a,b){this.a=a
this.b=!1
this.$ti=b},
nN:function nN(a){this.a=a},
nO:function nO(a){this.a=a},
nX:function nX(a){this.a=a},
eA:function eA(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
di:function di(a,b){this.a=a
this.$ti=b},
aB:function aB(a,b){this.a=a
this.b=b},
bv:function bv(a,b){this.a=a
this.$ti=b},
bM:function bM(a,b,c,d,e){var _=this
_.ay=0
_.CW=_.ch=null
_.w=a
_.a=b
_.d=c
_.e=d
_.r=_.f=null
_.$ti=e},
ee:function ee(){},
ed:function ed(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.e=_.d=null
_.$ti=c},
mz:function mz(a,b){this.a=a
this.b=b},
hf:function hf(){},
bL:function bL(a,b){this.a=a
this.$ti=b},
bo:function bo(a,b,c,d,e){var _=this
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
n0:function n0(a,b){this.a=a
this.b=b},
n5:function n5(a,b){this.a=a
this.b=b},
n4:function n4(a,b){this.a=a
this.b=b},
n2:function n2(a,b){this.a=a
this.b=b},
n1:function n1(a,b){this.a=a
this.b=b},
n8:function n8(a,b,c){this.a=a
this.b=b
this.c=c},
n9:function n9(a,b){this.a=a
this.b=b},
na:function na(a){this.a=a},
n7:function n7(a,b){this.a=a
this.b=b},
n6:function n6(a,b){this.a=a
this.b=b},
nb:function nb(a,b){this.a=a
this.b=b},
nc:function nc(a,b,c){this.a=a
this.b=b
this.c=c},
nd:function nd(a,b){this.a=a
this.b=b},
hb:function hb(a){this.a=a
this.b=null},
c1:function c1(){},
mx:function mx(a,b){this.a=a
this.b=b},
my:function my(a,b){this.a=a
this.b=b},
mv:function mv(a){this.a=a},
mw:function mw(a,b,c){this.a=a
this.b=b
this.c=c},
ef:function ef(){},
eg:function eg(){},
dd:function dd(){},
dh:function dh(){},
ei:function ei(){},
eh:function eh(a,b){this.b=a
this.a=null
this.$ti=b},
hM:function hM(a){var _=this
_.a=0
_.c=_.b=null
_.$ti=a},
nk:function nk(a,b){this.a=a
this.b=b},
de:function de(a,b){var _=this
_.a=1
_.b=a
_.c=null
_.$ti=b},
hX:function hX(a){this.$ti=a},
nP:function nP(a,b){this.a=a
this.b=b},
eL:function eL(){},
hP:function hP(){},
nm:function nm(a,b){this.a=a
this.b=b},
nn:function nn(a,b,c){this.a=a
this.b=b
this.c=c},
nW:function nW(a,b){this.a=a
this.b=b},
oQ(a,b){var s=a[b]
return s===a?null:s},
oR(a,b,c){if(c==null)a[b]=a
else a[b]=c},
qc(){var s=Object.create(null)
A.oR(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
fq(a,b){return new A.bh(a.i("@<0>").K(b).i("bh<1,2>"))},
a6(a,b,c){return b.i("@<0>").K(c).i("pL<1,2>").a(A.vD(a,new A.bh(b.i("@<0>").K(c).i("bh<1,2>"))))},
ai(a,b){return new A.bh(a.i("@<0>").K(b).i("bh<1,2>"))},
cs(a){return new A.cC(a.i("cC<0>"))},
oF(a){return new A.cC(a.i("cC<0>"))},
oS(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
u5(a,b,c){var s=new A.cD(a,b,c.i("cD<0>"))
s.c=a.e
return s},
aj(a,b,c){var s=A.fq(b,c)
J.eR(a,new A.m7(s,b,c))
return s},
oE(a,b,c){var s=A.fq(b,c)
s.R(0,a)
return s},
pM(a,b){var s,r,q=A.cs(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.ar)(a),++r)q.m(0,b.a(a[r]))
return q},
oG(a){var s,r
if(A.pc(a))return"{...}"
s=new A.av("")
try{r={}
B.b.m($.b6,a)
s.a+="{"
r.a=!0
J.eR(a,new A.m9(r,s))
s.a+="}"}finally{if(0>=$.b6.length)return A.d($.b6,-1)
$.b6.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
el:function el(){},
cB:function cB(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
em:function em(a,b){this.a=a
this.$ti=b},
en:function en(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cC:function cC(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
hC:function hC(a){this.a=a
this.c=this.b=null},
cD:function cD(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
ea:function ea(a,b){this.a=a
this.$ti=b},
m7:function m7(a,b,c){this.a=a
this.b=b
this.c=c},
m:function m(){},
G:function G(){},
m8:function m8(a){this.a=a},
m9:function m9(a,b){this.a=a
this.b=b},
db:function db(){},
aG:function aG(){},
d_:function d_(){},
c4:function c4(a,b){this.a=a
this.$ti=b},
ax:function ax(){},
ev:function ev(){},
dk:function dk(){},
ve(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.as(r)
q=A.a2(String(s),null,null)
throw A.b(q)}q=A.nQ(p)
return q},
nQ(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.hy(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.nQ(a[s])
return a},
uy(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.rF()
else s=new Uint8Array(o)
for(r=J.y(a),q=0;q<o;++q){p=r.h(a,b+q)
if((p&255)!==p)p=255
s[q]=p}return s},
ux(a,b,c,d){var s=a?$.rE():$.rD()
if(s==null)return null
if(0===c&&d===b.length)return A.qD(s,b)
return A.qD(s,b.subarray(c,d))},
qD(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
pq(a,b,c,d,e,f){if(B.e.aZ(f,4)!==0)throw A.b(A.a2("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.b(A.a2("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.b(A.a2("Invalid base64 padding, more than two '=' characters",a,b))},
tW(a,b,c,d,a0,a1){var s,r,q,p,o,n,m,l,k,j,i="Invalid encoding before padding",h="Invalid character",g=B.e.b9(a1,2),f=a1&3,e=$.pi()
for(s=a.length,r=e.length,q=d.$flags|0,p=b,o=0;p<c;++p){if(!(p<s))return A.d(a,p)
n=a.charCodeAt(p)
o|=n
m=n&127
if(!(m<r))return A.d(e,m)
l=e[m]
if(l>=0){g=(g<<6|l)&16777215
f=f+1&3
if(f===0){k=a0+1
q&2&&A.am(d)
m=d.length
if(!(a0<m))return A.d(d,a0)
d[a0]=g>>>16&255
a0=k+1
if(!(k<m))return A.d(d,k)
d[k]=g>>>8&255
k=a0+1
if(!(a0<m))return A.d(d,a0)
d[a0]=g&255
a0=k
g=0}continue}else if(l===-1&&f>1){if(o>127)break
if(f===3){if((g&3)!==0)throw A.b(A.a2(i,a,p))
k=a0+1
q&2&&A.am(d)
s=d.length
if(!(a0<s))return A.d(d,a0)
d[a0]=g>>>10
if(!(k<s))return A.d(d,k)
d[k]=g>>>2}else{if((g&15)!==0)throw A.b(A.a2(i,a,p))
q&2&&A.am(d)
if(!(a0<d.length))return A.d(d,a0)
d[a0]=g>>>4}j=(3-f)*3
if(n===37)j+=2
return A.q9(a,p+1,c,-j-1)}throw A.b(A.a2(h,a,p))}if(o>=0&&o<=127)return(g<<2|f)>>>0
for(p=b;p<c;++p){if(!(p<s))return A.d(a,p)
if(a.charCodeAt(p)>127)break}throw A.b(A.a2(h,a,p))},
tU(a,b,c,d){var s=A.tV(a,b,c),r=(d&3)+(s-b),q=B.e.b9(r,2)*3,p=r&3
if(p!==0&&s<c)q+=p-1
if(q>0)return new Uint8Array(q)
return $.rz()},
tV(a,b,c){var s,r=a.length,q=c,p=q,o=0
for(;;){if(!(p>b&&o<2))break
A:{--p
if(!(p>=0&&p<r))return A.d(a,p)
s=a.charCodeAt(p)
if(s===61){++o
q=p
break A}if((s|32)===100){if(p===b)break;--p
if(!(p>=0&&p<r))return A.d(a,p)
s=a.charCodeAt(p)}if(s===51){if(p===b)break;--p
if(!(p>=0&&p<r))return A.d(a,p)
s=a.charCodeAt(p)}if(s===37){++o
q=p
break A}break}}return q},
q9(a,b,c,d){var s,r,q
if(b===c)return d
s=-d-1
for(r=a.length;s>0;){if(!(b<r))return A.d(a,b)
q=a.charCodeAt(b)
if(s===3){if(q===61){s-=3;++b
break}if(q===37){--s;++b
if(b===c)break
if(!(b<r))return A.d(a,b)
q=a.charCodeAt(b)}else break}if((s>3?s-3:s)===2){if(q!==51)break;++b;--s
if(b===c)break
if(!(b<r))return A.d(a,b)
q=a.charCodeAt(b)}if((q|32)!==100)break;++b;--s
if(b===c)break}if(b!==c)throw A.b(A.a2("Invalid padding character",a,b))
return-s-1},
pJ(a,b,c){return new A.dN(a,b)},
uN(a){return a.hW()},
u3(a,b){return new A.ng(a,[],A.vz())},
u4(a,b,c){var s,r=new A.av(""),q=A.u3(r,b)
q.bU(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
uz(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
hy:function hy(a,b){this.a=a
this.b=b
this.c=null},
hz:function hz(a){this.a=a},
nG:function nG(){},
nF:function nF(){},
dw:function dw(a){this.a=a},
f_:function f_(a){this.a=a},
kO:function kO(){},
mV:function mV(){this.a=0},
cg:function cg(){},
f4:function f4(){},
fd:function fd(){},
dN:function dN(a,b){this.a=a
this.b=b},
fo:function fo(a,b){this.a=a
this.b=b},
fn:function fn(){},
m5:function m5(a){this.b=a},
m4:function m4(a){this.a=a},
nh:function nh(){},
ni:function ni(a,b){this.a=a
this.b=b},
ng:function ng(a,b,c){this.c=a
this.a=b
this.b=c},
h7:function h7(){},
mL:function mL(){},
nH:function nH(a){this.b=0
this.c=a},
mK:function mK(a){this.a=a},
nE:function nE(a){this.a=a
this.b=16
this.c=0},
pD(a,b){return A.tB(a,b,null)},
eP(a){var s=A.pU(a,null)
if(s!=null)return s
throw A.b(A.a2(a,null,null))},
bP(a){var s=A.e2(a)
if(s!=null)return s
throw A.b(A.a2("Invalid double",a,null))},
tm(a,b){a=A.ah(a,new Error())
if(a==null)a=A.aY(a)
a.stack=b.l(0)
throw a},
dT(a,b,c,d){var s,r=c?J.oB(a,d):J.pH(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
aO(a,b,c){var s,r=A.B([],c.i("a5<0>"))
for(s=J.aH(a);s.p();)B.b.m(r,c.a(s.gt(s)))
if(b)return r
r.$flags=1
return r},
a3(a,b){var s,r
if(Array.isArray(a))return A.B(a.slice(0),b.i("a5<0>"))
s=A.B([],b.i("a5<0>"))
for(r=J.aH(a);r.p();)B.b.m(s,r.gt(r))
return s},
q0(a,b,c){var s,r
A.d5(b,"start")
if(c!=null){s=c-b
if(s<0)throw A.b(A.ak(c,b,null,"end",null))
if(s===0)return""}r=A.tL(a,b,c)
return r},
tL(a,b,c){var s=a.length
if(b>=s)return""
return A.tF(a,b,c==null||c>s?s:c)},
e3(a){return new A.dM(a,A.tt(a,!1,!0,!1,!1,""))},
q_(a,b,c){var s=J.aH(b)
if(!s.p())return a
if(c.length===0){do a+=A.e(s.gt(s))
while(s.p())}else{a+=A.e(s.gt(s))
while(s.p())a=a+c+A.e(s.gt(s))}return a},
pP(a,b){return new A.fD(a,b.ghs(),b.ghy(),b.ght())},
h5(){var s,r,q=A.tC()
if(q==null)throw A.b(A.U("'Uri.base' is not supported"))
s=$.q5
if(s!=null&&q===$.q4)return s
r=A.cw(q)
$.q5=r
$.q4=q
return r},
qC(a,b,c,d){var s,r,q,p,o,n="0123456789ABCDEF"
if(c===B.m){s=$.rB()
s=s.b.test(b)}else s=!1
if(s)return b
r=B.a7.aE(b)
for(s=r.length,q=0,p="";q<s;++q){o=r[q]
if(o<128&&(u.f.charCodeAt(o)&a)!==0)p+=A.a9(o)
else p=d&&o===32?p+"+":p+"%"+n[o>>>4&15]+n[o&15]}return p.charCodeAt(0)==0?p:p},
us(a){var s,r,q
if(!$.rC())return A.ut(a)
s=new URLSearchParams()
a.q(0,new A.nD(s))
r=s.toString()
q=r.length
if(q>0&&r[q-1]==="=")r=B.a.n(r,0,q-1)
return r.replace(/=&|\*|%7E/g,b=>b==="=&"?"&":b==="*"?"%2A":"~")},
oM(){return A.cJ(new Error())},
ti(a,b,c,d,e,f,g,h,i){var s=A.pV(a,b,c,d,e,f,g,h,i)
if(s==null)return null
return new A.ad(A.ou(s,h,i),h,i)},
lO(a){var s=A.pV(a,1,1,0,0,0,0,0,!1)
return new A.ad(s==null?new A.lP(a,1,1,0,0,0,0,0).$0():s,0,!1)},
tk(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=$.rj().dK(a)
if(c!=null){s=new A.lR()
r=c.b
if(1>=r.length)return A.d(r,1)
q=r[1]
q.toString
p=A.eP(q)
if(2>=r.length)return A.d(r,2)
q=r[2]
q.toString
o=A.eP(q)
if(3>=r.length)return A.d(r,3)
q=r[3]
q.toString
n=A.eP(q)
if(4>=r.length)return A.d(r,4)
m=s.$1(r[4])
if(5>=r.length)return A.d(r,5)
l=s.$1(r[5])
if(6>=r.length)return A.d(r,6)
k=s.$1(r[6])
if(7>=r.length)return A.d(r,7)
j=new A.lS().$1(r[7])
i=B.e.ad(j,1000)
q=r.length
if(8>=q)return A.d(r,8)
h=r[8]!=null
if(h){if(9>=q)return A.d(r,9)
g=r[9]
if(g!=null){f=g==="-"?-1:1
if(10>=q)return A.d(r,10)
q=r[10]
q.toString
e=A.eP(q)
if(11>=r.length)return A.d(r,11)
l-=f*(s.$1(r[11])+60*e)}}d=A.ti(p,o,n,m,l,k,i,j%1000,h)
if(d==null)throw A.b(A.a2("Time out of range",a,null))
return d}else throw A.b(A.a2("Invalid date format",a,null))},
pz(a){var s,r
try{s=A.tk(a)
return s}catch(r){if(A.as(r) instanceof A.bg)return null
else throw r}},
ou(a,b,c){var s="microsecond"
if(b>999)throw A.b(A.ak(b,0,999,s,null))
if(a<-864e13||a>864e13)throw A.b(A.ak(a,-864e13,864e13,"millisecondsSinceEpoch",null))
if(a===864e13&&b!==0)throw A.b(A.kM(b,s,"Time including microseconds is outside valid range"))
A.ds(c,"isUtc",t.y)
return a},
py(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
tj(a){var s=Math.abs(a),r=a<0?"-":"+"
if(s>=1e5)return r+s
return r+"0"+s},
lQ(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bz(a){if(a>=10)return""+a
return"0"+a},
pA(a,b){return new A.b_(1000*a+1e6*b)},
bB(a){if(typeof a=="number"||A.cG(a)||a==null)return J.M(a)
if(typeof a=="string")return JSON.stringify(a)
return A.tE(a)},
tn(a,b){A.ds(a,"error",t.K)
A.ds(b,"stackTrace",t.l)
A.tm(a,b)},
eV(a){return new A.eU(a)},
aZ(a,b){return new A.b8(!1,null,b,a)},
kM(a,b,c){return new A.b8(!0,a,b,c)},
tG(a){var s=null
return new A.d4(s,s,!1,s,s,a)},
pW(a,b){return new A.d4(null,null,!0,a,b,"Value not in range")},
ak(a,b,c,d,e){return new A.d4(b,c,!0,a,d,"Invalid value")},
cu(a,b,c){if(0>a||a>c)throw A.b(A.ak(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.b(A.ak(b,a,c,"end",null))
return b}return c},
d5(a,b){if(a<0)throw A.b(A.ak(a,0,null,b,null))
return a},
ab(a,b,c,d,e){return new A.fh(b,!0,a,e,"Index out of range")},
U(a){return new A.eb(a)},
h1(a){return new A.h0(a)},
O(a){return new A.br(a)},
aa(a){return new A.f3(a)},
a2(a,b,c){return new A.bg(a,b,c)},
tp(a,b,c){var s,r
if(A.pc(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.B([],t.s)
B.b.m($.b6,a)
try{A.v9(a,s)}finally{if(0>=$.b6.length)return A.d($.b6,-1)
$.b6.pop()}r=A.q_(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
oA(a,b,c){var s,r
if(A.pc(a))return b+"..."+c
s=new A.av(b)
B.b.m($.b6,a)
try{r=s
r.a=A.q_(r.a,a,", ")}finally{if(0>=$.b6.length)return A.d($.b6,-1)
$.b6.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
v9(a,b){var s,r,q,p,o,n,m,l=a.gB(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.p())return
s=A.e(l.gt(l))
B.b.m(b,s)
k+=s.length+2;++j}if(!l.p()){if(j<=5)return
if(0>=b.length)return A.d(b,-1)
r=b.pop()
if(0>=b.length)return A.d(b,-1)
q=b.pop()}else{p=l.gt(l);++j
if(!l.p()){if(j<=4){B.b.m(b,A.e(p))
return}r=A.e(p)
if(0>=b.length)return A.d(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gt(l);++j
for(;l.p();p=o,o=n){n=l.gt(l);++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.d(b,-1)
k-=b.pop().length+2;--j}B.b.m(b,"...")
return}}q=A.e(p)
r=A.e(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.d(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.b.m(b,m)
B.b.m(b,q)
B.b.m(b,r)},
oH(a,b,c,d){var s
if(B.t===c){s=B.d.gL(a)
b=B.d.gL(b)
return A.oN(A.c3(A.c3($.oj(),s),b))}if(B.t===d){s=B.d.gL(a)
b=B.d.gL(b)
c=J.cM(c)
return A.oN(A.c3(A.c3(A.c3($.oj(),s),b),c))}s=B.d.gL(a)
b=B.d.gL(b)
c=J.cM(c)
d=J.cM(d)
d=A.oN(A.c3(A.c3(A.c3(A.c3($.oj(),s),b),c),d))
return d},
ca(a){A.vW(a)},
cw(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){if(4>=a4)return A.d(a5,4)
s=((a5.charCodeAt(4)^58)*3|a5.charCodeAt(0)^100|a5.charCodeAt(1)^97|a5.charCodeAt(2)^116|a5.charCodeAt(3)^97)>>>0
if(s===0)return A.q3(a4<a4?B.a.n(a5,0,a4):a5,5,a3).geh()
else if(s===32)return A.q3(B.a.n(a5,5,a4),0,a3).geh()}r=A.dT(8,0,!1,t.q)
B.b.k(r,0,0)
B.b.k(r,1,-1)
B.b.k(r,2,-1)
B.b.k(r,7,-1)
B.b.k(r,3,0)
B.b.k(r,4,0)
B.b.k(r,5,a4)
B.b.k(r,6,a4)
if(A.qY(a5,0,a4,0,r)>=14)B.b.k(r,7,a4)
q=r[1]
if(q>=0)if(A.qY(a5,0,q,20,r)===20)r[7]=q
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
if(!(i&&o+1===n)){if(!B.a.S(a5,"\\",n))if(p>0)h=B.a.S(a5,"\\",p-1)||B.a.S(a5,"\\",p-2)
else h=!1
else h=!0
if(!h){if(!(m<a4&&m===n+2&&B.a.S(a5,"..",n)))h=m>n+2&&B.a.S(a5,"/..",m-3)
else h=!0
if(!h)if(q===4){if(B.a.S(a5,"file",0)){if(p<=0){if(!B.a.S(a5,"/",n)){g="file:///"
s=3}else{g="file://"
s=2}a5=g+B.a.n(a5,n,a4)
m+=s
l+=s
a4=a5.length
p=7
o=7
n=7}else if(n===m){++l
f=m+1
a5=B.a.aH(a5,n,m,"/");++a4
m=f}j="file"}else if(B.a.S(a5,"http",0)){if(i&&o+3===n&&B.a.S(a5,"80",o+1)){l-=3
e=n-3
m-=3
a5=B.a.aH(a5,o,n,"")
a4-=3
n=e}j="http"}}else if(q===5&&B.a.S(a5,"https",0)){if(i&&o+4===n&&B.a.S(a5,"443",o+1)){l-=4
e=n-4
m-=4
a5=B.a.aH(a5,o,n,"")
a4-=3
n=e}j="https"}k=!h}}}}if(k)return new A.bb(a4<a5.length?B.a.n(a5,0,a4):a5,q,p,o,n,m,l,j)
if(j==null)if(q>0)j=A.oW(a5,0,q)
else{if(q===0)A.dl(a5,0,"Invalid empty scheme")
j=""}d=a3
if(p>0){c=q+3
b=c<p?A.qy(a5,c,p-1):""
a=A.qv(a5,p,o,!1)
i=o+1
if(i<n){a0=A.pU(B.a.n(a5,i,n),a3)
d=A.nA(a0==null?A.cc(A.a2("Invalid port",a5,i)):a0,j)}}else{a=a3
b=""}a1=A.qw(a5,n,m,a3,j,a!=null)
a2=m<l?A.qx(a5,m+1,l,a3):a3
return A.eI(j,b,a,d,a1,a2,l<a4?A.qu(a5,l+1,a4):a3)},
q7(a){var s=t.N
return B.b.ct(A.B(a.split("&"),t.s),A.ai(s,s),new A.mJ(B.m),t.I)},
h4(a,b,c){throw A.b(A.a2("Illegal IPv4 address, "+a,b,c))},
tN(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j="invalid character"
for(s=a.length,r=b,q=r,p=0,o=0;;){if(q>=c)n=0
else{if(!(q>=0&&q<s))return A.d(a,q)
n=a.charCodeAt(q)}m=n^48
if(m<=9){if(o!==0||q===r){o=o*10+m
if(o<=255){++q
continue}A.h4("each part must be in the range 0..255",a,r)}A.h4("parts must not have leading zeros",a,r)}if(q===r){if(q===c)break
A.h4(j,a,q)}l=p+1
k=e+p
d.$flags&2&&A.am(d)
if(!(k<16))return A.d(d,k)
d[k]=o
if(n===46){if(l<4){++q
p=l
r=q
o=0
continue}break}if(q===c){if(l===4)return
break}A.h4(j,a,q)
p=l}A.h4("IPv4 address should contain exactly 4 parts",a,q)},
tO(a,b,c){var s
if(b===c)throw A.b(A.a2("Empty IP address",a,b))
if(!(b>=0&&b<a.length))return A.d(a,b)
if(a.charCodeAt(b)===118){s=A.tP(a,b,c)
if(s!=null)throw A.b(s)
return!1}A.q6(a,b,c)
return!0},
tP(a,b,c){var s,r,q,p,o,n="Missing hex-digit in IPvFuture address",m=u.f;++b
for(s=a.length,r=b;;r=q){if(r<c){q=r+1
if(!(r>=0&&r<s))return A.d(a,r)
p=a.charCodeAt(r)
if((p^48)<=9)continue
o=p|32
if(o>=97&&o<=102)continue
if(p===46){if(q-1===b)return new A.bg(n,a,q)
r=q
break}return new A.bg("Unexpected character",a,q-1)}if(r-1===b)return new A.bg(n,a,r)
return new A.bg("Missing '.' in IPvFuture address",a,r)}if(r===c)return new A.bg("Missing address in IPvFuture address, host, cursor",null,null)
for(;;){if(!(r>=0&&r<s))return A.d(a,r)
p=a.charCodeAt(r)
if(!(p<128))return A.d(m,p)
if((m.charCodeAt(p)&16)!==0){++r
if(r<c)continue
return null}return new A.bg("Invalid IPvFuture address character",a,r)}},
q6(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="an address must contain at most 8 parts",a2=new A.mI(a3)
if(a5-a4<2)a2.$2("address is too short",null)
s=new Uint8Array(16)
r=a3.length
if(!(a4>=0&&a4<r))return A.d(a3,a4)
q=-1
p=0
if(a3.charCodeAt(a4)===58){o=a4+1
if(!(o<r))return A.d(a3,o)
if(a3.charCodeAt(o)===58){n=a4+2
m=n
q=0
p=1}else{a2.$2("invalid start colon",a4)
n=a4
m=n}}else{n=a4
m=n}for(l=0,k=!0;;){if(n>=a5)j=0
else{if(!(n<r))return A.d(a3,n)
j=a3.charCodeAt(n)}A:{i=j^48
h=!1
if(i<=9)g=i
else{f=j|32
if(f>=97&&f<=102)g=f-87
else break A
k=h}if(n<m+4){l=l*16+g;++n
continue}a2.$2("an IPv6 part can contain a maximum of 4 hex digits",m)}if(n>m){if(j===46){if(k){if(p<=6){A.tN(a3,m,a5,s,p*2)
p+=2
n=a5
break}a2.$2(a1,m)}break}o=p*2
e=B.e.b9(l,8)
if(!(o<16))return A.d(s,o)
s[o]=e;++o
if(!(o<16))return A.d(s,o)
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
B.Q.bX(s,a0,16,s,a)
B.Q.ha(s,a,a0,0)}}return s},
eI(a,b,c,d,e,f,g){return new A.eH(a,b,c,d,e,f,g)},
qr(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
dl(a,b,c){throw A.b(A.a2(c,a,b))},
nA(a,b){if(a!=null&&a===A.qr(b))return null
return a},
qv(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(a==null)return null
if(b===c)return""
s=a.length
if(!(b>=0&&b<s))return A.d(a,b)
if(a.charCodeAt(b)===91){r=c-1
if(!(r>=0&&r<s))return A.d(a,r)
if(a.charCodeAt(r)!==93)A.dl(a,b,"Missing end `]` to match `[` in host")
q=b+1
if(!(q<s))return A.d(a,q)
p=""
if(a.charCodeAt(q)!==118){o=A.uq(a,q,r)
if(o<r){n=o+1
p=A.qB(a,B.a.S(a,"25",n)?o+3:n,r,"%25")}}else o=r
m=A.tO(a,q,o)
l=B.a.n(a,q,o)
return"["+(m?l.toLowerCase():l)+p+"]"}for(k=b;k<c;++k){if(!(k<s))return A.d(a,k)
if(a.charCodeAt(k)===58){o=B.a.bJ(a,"%",b)
o=o>=b&&o<c?o:c
if(o<c){n=o+1
p=A.qB(a,B.a.S(a,"25",n)?o+3:n,c,"%25")}else p=""
A.q6(a,b,o)
return"["+B.a.n(a,b,o)+p+"]"}}return A.uv(a,b,c)},
uq(a,b,c){var s=B.a.bJ(a,"%",b)
return s>=b&&s<c?s:c},
qB(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=d!==""?new A.av(d):null
for(s=a.length,r=b,q=r,p=!0;r<c;){if(!(r>=0&&r<s))return A.d(a,r)
o=a.charCodeAt(r)
if(o===37){n=A.oX(a,r,!0)
m=n==null
if(m&&p){r+=3
continue}if(h==null)h=new A.av("")
l=h.a+=B.a.n(a,q,r)
if(m)n=B.a.n(a,r,r+3)
else if(n==="%")A.dl(a,r,"ZoneID should not contain % anymore")
h.a=l+n
r+=3
q=r
p=!0}else if(o<127&&(u.f.charCodeAt(o)&1)!==0){if(p&&65<=o&&90>=o){if(h==null)h=new A.av("")
if(q<r){h.a+=B.a.n(a,q,r)
q=r}p=!1}++r}else{k=1
if((o&64512)===55296&&r+1<c){m=r+1
if(!(m<s))return A.d(a,m)
j=a.charCodeAt(m)
if((j&64512)===56320){o=65536+((o&1023)<<10)+(j&1023)
k=2}}i=B.a.n(a,q,r)
if(h==null){h=new A.av("")
m=h}else m=h
m.a+=i
l=A.oV(o)
m.a+=l
r+=k
q=r}}if(h==null)return B.a.n(a,b,c)
if(q<c){i=B.a.n(a,q,c)
h.a+=i}s=h.a
return s.charCodeAt(0)==0?s:s},
uv(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.f
for(s=a.length,r=b,q=r,p=null,o=!0;r<c;){if(!(r>=0&&r<s))return A.d(a,r)
n=a.charCodeAt(r)
if(n===37){m=A.oX(a,r,!0)
l=m==null
if(l&&o){r+=3
continue}if(p==null)p=new A.av("")
k=B.a.n(a,q,r)
if(!o)k=k.toLowerCase()
j=p.a+=k
i=3
if(l)m=B.a.n(a,r,r+3)
else if(m==="%"){m="%25"
i=1}p.a=j+m
r+=i
q=r
o=!0}else if(n<127&&(g.charCodeAt(n)&32)!==0){if(o&&65<=n&&90>=n){if(p==null)p=new A.av("")
if(q<r){p.a+=B.a.n(a,q,r)
q=r}o=!1}++r}else if(n<=93&&(g.charCodeAt(n)&1024)!==0)A.dl(a,r,"Invalid character")
else{i=1
if((n&64512)===55296&&r+1<c){l=r+1
if(!(l<s))return A.d(a,l)
h=a.charCodeAt(l)
if((h&64512)===56320){n=65536+((n&1023)<<10)+(h&1023)
i=2}}k=B.a.n(a,q,r)
if(!o)k=k.toLowerCase()
if(p==null){p=new A.av("")
l=p}else l=p
l.a+=k
j=A.oV(n)
l.a+=j
r+=i
q=r}}if(p==null)return B.a.n(a,b,c)
if(q<c){k=B.a.n(a,q,c)
if(!o)k=k.toLowerCase()
p.a+=k}s=p.a
return s.charCodeAt(0)==0?s:s},
oW(a,b,c){var s,r,q,p
if(b===c)return""
s=a.length
if(!(b<s))return A.d(a,b)
if(!A.qt(a.charCodeAt(b)))A.dl(a,b,"Scheme not starting with alphabetic character")
for(r=b,q=!1;r<c;++r){if(!(r<s))return A.d(a,r)
p=a.charCodeAt(r)
if(!(p<128&&(u.f.charCodeAt(p)&8)!==0))A.dl(a,r,"Illegal scheme character")
if(65<=p&&p<=90)q=!0}a=B.a.n(a,b,c)
return A.up(q?a.toLowerCase():a)},
up(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
qy(a,b,c){if(a==null)return""
return A.eJ(a,b,c,16,!1,!1)},
qw(a,b,c,d,e,f){var s,r=e==="file",q=r||f
if(a==null)return r?"/":""
else s=A.eJ(a,b,c,128,!0,!0)
if(s.length===0){if(r)return"/"}else if(q&&!B.a.O(s,"/"))s="/"+s
return A.uu(s,e,f)},
uu(a,b,c){var s=b.length===0
if(s&&!c&&!B.a.O(a,"/")&&!B.a.O(a,"\\"))return A.oY(a,!s||c)
return A.cF(a)},
qx(a,b,c,d){if(a!=null){if(d!=null)throw A.b(A.aZ("Both query and queryParameters specified",null))
return A.eJ(a,b,c,256,!0,!1)}if(d==null)return null
return A.us(d)},
ut(a){var s={},r=new A.av("")
s.a=""
a.q(0,new A.nB(new A.nC(s,r)))
s=r.a
return s.charCodeAt(0)==0?s:s},
qu(a,b,c){if(a==null)return null
return A.eJ(a,b,c,256,!0,!1)},
oX(a,b,c){var s,r,q,p,o,n,m=u.f,l=b+2,k=a.length
if(l>=k)return"%"
s=b+1
if(!(s>=0&&s<k))return A.d(a,s)
r=a.charCodeAt(s)
if(!(l>=0))return A.d(a,l)
q=a.charCodeAt(l)
p=A.o2(r)
o=A.o2(q)
if(p<0||o<0)return"%"
n=p*16+o
if(n<127){if(!(n>=0))return A.d(m,n)
l=(m.charCodeAt(n)&1)!==0}else l=!1
if(l)return A.a9(c&&65<=n&&90>=n?(n|32)>>>0:n)
if(r>=97||q>=97)return B.a.n(a,b,b+3).toUpperCase()
return null},
oV(a){var s,r,q,p,o,n,m,l,k="0123456789ABCDEF"
if(a<=127){s=new Uint8Array(3)
s[0]=37
r=a>>>4
if(!(r<16))return A.d(k,r)
s[1]=k.charCodeAt(r)
s[2]=k.charCodeAt(a&15)}else{if(a>2047)if(a>65535){q=240
p=4}else{q=224
p=3}else{q=192
p=2}r=3*p
s=new Uint8Array(r)
for(o=0;--p,p>=0;q=128){n=B.e.fG(a,6*p)&63|q
if(!(o<r))return A.d(s,o)
s[o]=37
m=o+1
l=n>>>4
if(!(l<16))return A.d(k,l)
if(!(m<r))return A.d(s,m)
s[m]=k.charCodeAt(l)
l=o+2
if(!(l<r))return A.d(s,l)
s[l]=k.charCodeAt(n&15)
o+=3}}return A.q0(s,0,null)},
eJ(a,b,c,d,e,f){var s=A.qA(a,b,c,d,e,f)
return s==null?B.a.n(a,b,c):s},
qA(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null,h=u.f
for(s=!e,r=a.length,q=b,p=q,o=i;q<c;){if(!(q>=0&&q<r))return A.d(a,q)
n=a.charCodeAt(q)
if(n<127&&(h.charCodeAt(n)&d)!==0)++q
else{m=1
if(n===37){l=A.oX(a,q,!1)
if(l==null){q+=3
continue}if("%"===l)l="%25"
else m=3}else if(n===92&&f)l="/"
else if(s&&n<=93&&(h.charCodeAt(n)&1024)!==0){A.dl(a,q,"Invalid character")
m=i
l=m}else{if((n&64512)===55296){k=q+1
if(k<c){if(!(k<r))return A.d(a,k)
j=a.charCodeAt(k)
if((j&64512)===56320){n=65536+((n&1023)<<10)+(j&1023)
m=2}}}l=A.oV(n)}if(o==null){o=new A.av("")
k=o}else k=o
k.a=(k.a+=B.a.n(a,p,q))+l
if(typeof m!=="number")return A.vK(m)
q+=m
p=q}}if(o==null)return i
if(p<c){s=B.a.n(a,p,c)
o.a+=s}s=o.a
return s.charCodeAt(0)==0?s:s},
qz(a){if(B.a.O(a,"."))return!0
return B.a.dO(a,"/.")!==-1},
cF(a){var s,r,q,p,o,n,m
if(!A.qz(a))return a
s=A.B([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(n===".."){m=s.length
if(m!==0){if(0>=m)return A.d(s,-1)
s.pop()
if(s.length===0)B.b.m(s,"")}p=!0}else{p="."===n
if(!p)B.b.m(s,n)}}if(p)B.b.m(s,"")
return B.b.a_(s,"/")},
oY(a,b){var s,r,q,p,o,n
if(!A.qz(a))return!b?A.qs(a):a
s=A.B([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n){if(s.length!==0&&B.b.gdR(s)!==".."){if(0>=s.length)return A.d(s,-1)
s.pop()}else B.b.m(s,"..")
p=!0}else{p="."===n
if(!p)B.b.m(s,n.length===0&&s.length===0?"./":n)}}if(s.length===0)return"./"
if(p)B.b.m(s,"")
if(!b){if(0>=s.length)return A.d(s,0)
B.b.k(s,0,A.qs(s[0]))}return B.b.a_(s,"/")},
qs(a){var s,r,q,p=u.f,o=a.length
if(o>=2&&A.qt(a.charCodeAt(0)))for(s=1;s<o;++s){r=a.charCodeAt(s)
if(r===58)return B.a.n(a,0,s)+"%3A"+B.a.Z(a,s+1)
if(r<=127){if(!(r<128))return A.d(p,r)
q=(p.charCodeAt(r)&8)===0}else q=!0
if(q)break}return a},
uw(a,b){if(a.hn("package")&&a.c==null)return A.r_(b,0,b.length)
return-1},
ur(a,b){var s,r,q,p,o
for(s=a.length,r=0,q=0;q<2;++q){p=b+q
if(!(p<s))return A.d(a,p)
o=a.charCodeAt(p)
if(48<=o&&o<=57)r=r*16+o-48
else{o|=32
if(97<=o&&o<=102)r=r*16+o-87
else throw A.b(A.aZ("Invalid URL encoding",null))}}return r},
oZ(a,b,c,d,e){var s,r,q,p,o=a.length,n=b
for(;;){if(!(n<c)){s=!0
break}if(!(n<o))return A.d(a,n)
r=a.charCodeAt(n)
q=!0
if(r<=127)if(r!==37)q=r===43
if(q){s=!1
break}++n}if(s)if(B.m===d)return B.a.n(a,b,c)
else p=new A.f2(B.a.n(a,b,c))
else{p=A.B([],t.b)
for(n=b;n<c;++n){if(!(n<o))return A.d(a,n)
r=a.charCodeAt(n)
if(r>127)throw A.b(A.aZ("Illegal percent encoding in URI",null))
if(r===37){if(n+3>o)throw A.b(A.aZ("Truncated URI",null))
B.b.m(p,A.ur(a,n+1))
n+=2}else if(r===43)B.b.m(p,32)
else B.b.m(p,r)}}return d.I(0,p)},
qt(a){var s=a|32
return 97<=s&&s<=122},
q3(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.B([b-1],t.b)
for(s=a.length,r=b,q=-1,p=null;r<s;++r){p=a.charCodeAt(r)
if(p===44||p===59)break
if(p===47){if(q<0){q=r
continue}throw A.b(A.a2(k,a,r))}}if(q<0&&r>b)throw A.b(A.a2(k,a,r))
while(p!==44){B.b.m(j,r);++r
for(o=-1;r<s;++r){if(!(r>=0))return A.d(a,r)
p=a.charCodeAt(r)
if(p===61){if(o<0)o=r}else if(p===59||p===44)break}if(o>=0)B.b.m(j,o)
else{n=B.b.gdR(j)
if(p!==44||r!==n+7||!B.a.S(a,"base64",n+1))throw A.b(A.a2("Expecting '='",a,r))
break}}B.b.m(j,r)
m=r+1
if((j.length&1)===1)a=B.Y.dX(0,a,m,s)
else{l=A.qA(a,m,s,256,!0,!1)
if(l!=null)a=B.a.aH(a,m,s,l)}return new A.mH(a,j,c)},
qY(a,b,c,d,e){var s,r,q,p,o,n='\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe3\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0e\x03\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\n\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\xeb\xeb\x8b\xeb\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x83\xeb\xeb\x8b\xeb\x8b\xeb\xcd\x8b\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x92\x83\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x8b\xeb\x8b\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xebD\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12D\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe8\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x05\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x10\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\f\xec\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\xec\f\xec\f\xec\xcd\f\xec\f\f\f\f\f\f\f\f\f\xec\f\f\f\f\f\f\f\f\f\f\xec\f\xec\f\xec\f\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\r\xed\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\xed\r\xed\r\xed\xed\r\xed\r\r\r\r\r\r\r\r\r\xed\r\r\r\r\r\r\r\r\r\r\xed\r\xed\r\xed\r\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0f\xea\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe9\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\t\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x11\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xe9\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\t\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x13\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\xf5\x15\x15\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5'
for(s=a.length,r=b;r<c;++r){if(!(r<s))return A.d(a,r)
q=a.charCodeAt(r)^96
if(q>95)q=31
p=d*96+q
if(!(p<2112))return A.d(n,p)
o=n.charCodeAt(p)
d=o&31
B.b.k(e,o>>>5,r)}return d},
qj(a){if(a.b===7&&B.a.O(a.a,"package")&&a.c<=0)return A.r_(a.a,a.e,a.f)
return-1},
r_(a,b,c){var s,r,q,p
for(s=a.length,r=b,q=0;r<c;++r){if(!(r>=0&&r<s))return A.d(a,r)
p=a.charCodeAt(r)
if(p===47)return q!==0?r:-1
if(p===37||p===58)return-1
q|=p^46}return-1},
uI(a,b,c){var s,r,q,p,o,n,m,l
for(s=a.length,r=b.length,q=0,p=0;p<s;++p){o=c+p
if(!(o<r))return A.d(b,o)
n=b.charCodeAt(o)
m=a.charCodeAt(p)^n
if(m!==0){if(m===32){l=n|m
if(97<=l&&l<=122){q=32
continue}}return-1}}return q},
mc:function mc(a,b){this.a=a
this.b=b},
nD:function nD(a){this.a=a},
lP:function lP(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
ad:function ad(a,b,c){this.a=a
this.b=b
this.c=c},
lR:function lR(){},
lS:function lS(){},
b_:function b_(a){this.a=a},
a0:function a0(){},
eU:function eU(a){this.a=a},
bH:function bH(){},
b8:function b8(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
d4:function d4(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
fh:function fh(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
fD:function fD(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eb:function eb(a){this.a=a},
h0:function h0(a){this.a=a},
br:function br(a){this.a=a},
f3:function f3(a){this.a=a},
fG:function fG(){},
e5:function e5(){},
n_:function n_(a){this.a=a},
bg:function bg(a,b,c){this.a=a
this.b=b
this.c=c},
h:function h(){},
au:function au(a,b,c){this.a=a
this.b=b
this.$ti=c},
a8:function a8(){},
H:function H(){},
i_:function i_(){},
av:function av(a){this.a=a},
mJ:function mJ(a){this.a=a},
mI:function mI(a){this.a=a},
eH:function eH(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
nC:function nC(a,b){this.a=a
this.b=b},
nB:function nB(a){this.a=a},
mH:function mH(a,b,c){this.a=a
this.b=b
this.c=c},
bb:function bb(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=null},
hk:function hk(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
th(a,b){var s,r,q,p=!0,o=!0
b=b
r=document.createEvent("CustomEvent")
r.toString
s=t.l7.a(r)
s._dartDetail=b
if(t.j.b(b)||t.f.b(b)||typeof b=="string"||typeof b=="number")try{b=new A.nr([],[]).aA(b)
J.om(s,a,p,o,b)}catch(q){J.om(s,a,p,o,null)}else J.om(s,a,p,o,null)
return s},
tY(a,b){var s
for(s=0;s<4;++s)a.appendChild(b[s]).toString},
tZ(a){var s=a.firstElementChild
if(s==null)throw A.b(A.O("No elements"))
return s},
tl(a,b,c){var s,r=document.body
r.toString
s=t.aN
return t.h.a(new A.I(new A.aF(B.D.a7(r,a,b,c)),s.i("F(m.E)").a(new A.lT()),s.i("I<m.E>")).gaL(0))},
dD(a){var s,r,q="element tag unavailable"
try{s=a.tagName
s.toString
q=s}catch(r){}return q},
pE(a){var s,r="visibilitychange"
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
oz(a){var s=document.createElement("img")
s.toString
if(a!=null)B.z.scX(s,a)
return s},
tz(a,b,c,d){var s=new Option(a,b,c,!1)
s.toString
return s},
u0(a,b){var s,r=a.classList
r.toString
for(s=0;s<5;++s)r.remove(b[s])},
z(a,b,c,d,e){var s=c==null?null:A.r0(new A.mY(c),t.A)
s=new A.ek(a,b,s,!1,e.i("ek<0>"))
s.du()
return s},
qd(a){var s=document.createElement("a")
s.toString
s=new A.hS(s,t.d.a(window.location))
s=new A.cA(s)
s.eQ(a)
return s},
u1(a,b,c,d){t.h.a(a)
A.x(b)
A.x(c)
t.dl.a(d)
return!0},
u2(a,b,c,d){var s,r,q,p,o,n
t.h.a(a)
A.x(b)
A.x(c)
s=t.dl.a(d).a
r=s.a
B.U.shf(r,c)
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
qm(){var s=t.N,r=A.pM(B.N,s),q=A.B(["TEMPLATE"],t.s),p=t.gL.a(new A.nu())
s=new A.i2(r,A.cs(s),A.cs(s),A.cs(s),null)
s.eS(null,new A.a1(B.N,p,t.gQ),q,null)
return s},
p_(a){var s,r="postMessage" in a
r.toString
if(r){s=A.u_(a)
return s}else return t.iB.a(a)},
u_(a){var s=window
s.toString
if(a===s)return t.kg.a(a)
else return new A.hi()},
r0(a,b){var s=$.V
if(s===B.h)return a
return s.dG(a,b)},
r:function r(){},
eS:function eS(){},
cN:function cN(){},
eT:function eT(){},
cO:function cO(){},
bS:function bS(){},
cf:function cf(){},
bT:function bT(){},
bq:function bq(){},
f6:function f6(){},
Y:function Y(){},
ch:function ch(){},
kS:function kS(){},
aI:function aI(){},
bf:function bf(){},
f7:function f7(){},
f8:function f8(){},
ci:function ci(){},
f9:function f9(){},
cQ:function cQ(){},
cj:function cj(){},
fa:function fa(){},
dA:function dA(){},
dB:function dB(){},
dC:function dC(){},
fb:function fb(){},
fc:function fc(){},
he:function he(a,b){this.a=a
this.b=b},
bn:function bn(a,b){this.a=a
this.$ti=b},
D:function D(){},
lT:function lT(){},
o:function o(){},
dE:function dE(){},
f:function f(){},
aM:function aM(){},
ck:function ck(){},
dG:function dG(){},
fe:function fe(){},
cm:function cm(){},
aN:function aN(){},
cS:function cS(){},
fg:function fg(){},
bW:function bW(){},
dH:function dH(){},
bC:function bC(){},
co:function co(){},
cT:function cT(){},
dI:function dI(){},
bX:function bX(){},
bE:function bE(){},
cZ:function cZ(){},
fr:function fr(){},
d0:function d0(){},
fs:function fs(){},
ma:function ma(a){this.a=a},
ft:function ft(){},
mb:function mb(a){this.a=a},
aP:function aP(){},
fu:function fu(){},
aC:function aC(){},
aF:function aF(a){this.a=a},
v:function v(){},
d1:function d1(){},
bG:function bG(){},
d2:function d2(){},
aQ:function aQ(){},
fI:function fI(){},
b9:function b9(){},
fK:function fK(){},
ms:function ms(a){this.a=a},
c0:function c0(){},
aS:function aS(){},
fM:function fM(){},
e4:function e4(){},
aT:function aT(){},
fN:function fN(){},
aU:function aU(){},
e6:function e6(){},
mu:function mu(a){this.a=a},
aD:function aD(){},
e9:function e9(){},
fQ:function fQ(){},
fR:function fR(){},
d9:function d9(){},
cv:function cv(){},
aV:function aV(){},
aE:function aE(){},
fT:function fT(){},
fU:function fU(){},
fV:function fV(){},
aW:function aW(){},
fY:function fY(){},
fZ:function fZ(){},
bt:function bt(){},
h6:function h6(){},
h9:function h9(){},
c5:function c5(){},
bu:function bu(){},
dc:function dc(){},
hg:function hg(){},
ej:function ej(){},
hu:function hu(){},
eq:function eq(){},
hV:function hV(){},
i0:function i0(){},
hc:function hc(){},
mU:function mU(a){this.a=a},
df:function df(a){this.a=a},
hj:function hj(a){this.a=a},
mW:function mW(a,b){this.a=a
this.b=b},
mX:function mX(a,b){this.a=a
this.b=b},
hp:function hp(a){this.a=a},
ox:function ox(a,b){this.a=a
this.$ti=b},
cy:function cy(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
aX:function aX(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
ek:function ek(a,b,c,d,e){var _=this
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
mY:function mY(a){this.a=a},
mZ:function mZ(a){this.a=a},
oP:function oP(a){this.$ti=a},
cA:function cA(a){this.a=a},
A:function A(){},
dZ:function dZ(a){this.a=a},
me:function me(a){this.a=a},
md:function md(a,b,c){this.a=a
this.b=b
this.c=c},
ew:function ew(){},
no:function no(){},
np:function np(){},
i2:function i2(a,b,c,d,e){var _=this
_.e=a
_.a=b
_.b=c
_.c=d
_.d=e},
nu:function nu(){},
i1:function i1(){},
cl:function cl(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.d=null
_.$ti=c},
hi:function hi(){},
hS:function hS(a,b){this.a=a
this.b=b},
eK:function eK(a){this.a=a
this.b=0},
nJ:function nJ(a){this.a=a},
hh:function hh(){},
hl:function hl(){},
hm:function hm(){},
hn:function hn(){},
ho:function ho(){},
hr:function hr(){},
hs:function hs(){},
hw:function hw(){},
hx:function hx(){},
hE:function hE(){},
hF:function hF(){},
hG:function hG(){},
hH:function hH(){},
hI:function hI(){},
hJ:function hJ(){},
hN:function hN(){},
hO:function hO(){},
hQ:function hQ(){},
ex:function ex(){},
ey:function ey(){},
hT:function hT(){},
hU:function hU(){},
hW:function hW(){},
i3:function i3(){},
i4:function i4(){},
eB:function eB(){},
eC:function eC(){},
i5:function i5(){},
i6:function i6(){},
ia:function ia(){},
ib:function ib(){},
ic:function ic(){},
id:function id(){},
ie:function ie(){},
ig:function ig(){},
ih:function ih(){},
ii:function ii(){},
ij:function ij(){},
ik:function ik(){},
qI(a){var s,r,q
if(a==null)return a
if(typeof a=="string"||typeof a=="number"||A.cG(a))return a
if(A.r7(a))return A.bd(a)
s=Array.isArray(a)
s.toString
if(s){r=[]
q=0
for(;;){s=a.length
s.toString
if(!(q<s))break
r.push(A.qI(a[q]));++q}return r}return a},
bd(a){var s,r,q,p,o,n
if(a==null)return null
s=A.ai(t.N,t.z)
r=Object.getOwnPropertyNames(a)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.ar)(r),++p){o=r[p]
n=o
n.toString
s.k(0,n,A.qI(a[o]))}return s},
r7(a){var s=Object.getPrototypeOf(a),r=s===Object.prototype
r.toString
if(!r){r=s===null
r.toString}else r=!0
return r},
ov(){var s=window.navigator.userAgent
s.toString
return s},
nq:function nq(){},
ns:function ns(a,b){this.a=a
this.b=b},
nt:function nt(a,b){this.a=a
this.b=b},
mN:function mN(){},
mP:function mP(a,b){this.a=a
this.b=b},
nr:function nr(a,b){this.a=a
this.b=b},
mO:function mO(a,b){this.a=a
this.b=b
this.c=!1},
f5:function f5(){},
kQ:function kQ(a){this.a=a},
kR:function kR(a){this.a=a},
ff:function ff(a,b){this.a=a
this.b=b},
lU:function lU(){},
lV:function lV(){},
cY:function cY(){},
h8:function h8(){},
uF(a,b,c,d){var s,r,q
A.nK(b)
t.j.a(d)
if(b){s=[c]
B.b.R(s,d)
d=s}r=t.z
q=A.aO(J.ce(d,A.vQ(),r),!0,r)
return A.nR(A.pD(t.Z.a(a),q))},
m2(a){if(!t.f.b(a)&&!t.R.b(a))throw A.b(A.aZ("object must be a Map or Iterable",null))
return A.p5(A.tu(a))},
tu(a){return new A.m3(new A.cB(t.mp)).$1(a)},
uJ(a){return a},
p1(a,b,c){var s
try{if(Object.isExtensible(a)&&!Object.prototype.hasOwnProperty.call(a,b)){Object.defineProperty(a,b,{value:c})
return!0}}catch(s){}return!1},
qM(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return null},
nR(a){if(a==null||typeof a=="string"||typeof a=="number"||A.cG(a))return a
if(a instanceof A.b0)return a.a
if(A.r6(a))return a
if(t.jv.b(a))return a
if(a instanceof A.ad)return A.aR(a)
if(t.Z.b(a))return A.qL(a,"$dart_jsFunction",new A.nS())
return A.qL(a,"_$dart_jsObject",new A.nT($.pk()))},
qL(a,b,c){var s=A.qM(a,b)
if(s==null){s=c.$1(a)
A.p1(a,b,s)}return s},
p0(a){if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else if(a instanceof Object&&A.r6(a))return a
else if(a instanceof Object&&t.jv.b(a))return a
else if(a instanceof Date)return new A.ad(A.ou(A.L(a.getTime()),0,!1),0,!1)
else if(a.constructor===$.pk())return a.o
else return A.p5(a)},
p5(a){if(typeof a=="function")return A.p2(a,$.iu(),new A.nY())
if(Array.isArray(a))return A.p2(a,$.pj(),new A.nZ())
return A.p2(a,$.pj(),new A.o_())},
p2(a,b,c){var s=A.qM(a,b)
if(s==null||!(a instanceof Object)){s=c.$1(a)
A.p1(a,b,s)}return s},
m3:function m3(a){this.a=a},
hR:function hR(){},
nS:function nS(){},
nT:function nT(a){this.a=a},
nY:function nY(){},
nZ:function nZ(){},
o_:function o_(){},
b0:function b0(a){this.a=a},
cX:function cX(a){this.a=a},
cq:function cq(a,b){this.a=a
this.$ti=b},
dg:function dg(){},
mf:function mf(a){this.a=a},
uM(a){var s,r=a.$dart_jsFunction
if(r!=null)return r
s=function(b,c){return function(){return b(c,Array.prototype.slice.apply(arguments))}}(A.uG,a)
s[$.iu()]=a
a.$dart_jsFunction=s
return s},
uG(a,b){t.j.a(b)
return A.pD(t.Z.a(a),b)},
vr(a,b){if(typeof a=="function")return a
else return b.a(A.uM(a))},
qS(a){return a==null||A.cG(a)||typeof a=="number"||typeof a=="string"||t.jx.b(a)||t.ev.b(a)||t.nn.b(a)||t.m6.b(a)||t.hM.b(a)||t.bW.b(a)||t.mC.b(a)||t.pk.b(a)||t.kI.b(a)||t.lo.b(a)||t.fW.b(a)},
vS(a){if(A.qS(a))return a
return new A.o7(new A.cB(t.as)).$1(a)},
pe(a,b){var s=new A.W($.V,b.i("W<0>")),r=new A.bL(s,b.i("bL<0>"))
a.then(A.bO(new A.oe(r,b),1),A.bO(new A.of(r),1))
return s},
o7:function o7(a){this.a=a},
oe:function oe(a,b){this.a=a
this.b=b},
of:function of(a){this.a=a},
ne:function ne(a){this.a=a},
b1:function b1(){},
fp:function fp(){},
b4:function b4(){},
fE:function fE(){},
fJ:function fJ(){},
d7:function d7(){},
fP:function fP(){},
eW:function eW(a){this.a=a},
u:function u(){},
b5:function b5(){},
h_:function h_(){},
hA:function hA(){},
hB:function hB(){},
hK:function hK(){},
hL:function hL(){},
hY:function hY(){},
hZ:function hZ(){},
i7:function i7(){},
i8:function i8(){},
eX:function eX(){},
eY:function eY(){},
kN:function kN(a){this.a=a},
eZ:function eZ(){},
bR:function bR(){},
fF:function fF(){},
hd:function hd(){},
vU(){var s=document
s.toString
B.L.aP(s,"DOMContentLoaded",new A.o8())},
o8:function o8(){},
iz:function iz(){var _=this
_.a=null
_.b="view-dashboard"
_.r=_.f=_.e=_.d=_.c=null
_.x=_.w=0
_.z=_.y=!1
_.Q=0
_.ax=_.at=_.as=null
_.ay=!1
_.ch=null
_.k3=_.k1=_.id=_.go=_.fy=_.fx=_.fr=_.dy=_.dx=_.db=_.cy=_.cx=_.CW=$
_.k4=null
_.ok=!1
_.p1=0
_.p2=null
_.p4=_.p3=0
_.R8=!1
_.ry=_.rx=_.RG=null
_.to=!1
_.x1="name"
_.x2=!1
_.xr=null},
jM:function jM(a){this.a=a},
jU:function jU(){},
jN:function jN(a){this.a=a},
jO:function jO(){},
jP:function jP(a){this.a=a},
jL:function jL(){},
jQ:function jQ(a){this.a=a},
jR:function jR(a){this.a=a},
jS:function jS(a){this.a=a},
jT:function jT(a){this.a=a},
ja:function ja(a){this.a=a},
j6:function j6(){},
j7:function j7(){},
j8:function j8(a,b){this.a=a
this.b=b},
j9:function j9(a){this.a=a},
jc:function jc(a){this.a=a},
jd:function jd(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
je:function je(a){this.a=a},
jh:function jh(a){this.a=a},
ji:function ji(a){this.a=a},
jb:function jb(a,b){this.a=a
this.b=b},
jj:function jj(a){this.a=a},
jk:function jk(a){this.a=a},
jl:function jl(a){this.a=a},
jm:function jm(a){this.a=a},
jn:function jn(a){this.a=a},
jo:function jo(a,b){this.a=a
this.b=b},
jf:function jf(a){this.a=a},
jg:function jg(a,b){this.a=a
this.b=b},
jC:function jC(a){this.a=a},
jD:function jD(a){this.a=a},
jE:function jE(a){this.a=a},
jF:function jF(a){this.a=a},
jx:function jx(a){this.a=a},
jy:function jy(a){this.a=a},
jz:function jz(a){this.a=a},
jA:function jA(){},
jB:function jB(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jp:function jp(){},
kA:function kA(){},
kB:function kB(){},
kC:function kC(){},
kJ:function kJ(a){this.a=a},
kK:function kK(a){this.a=a},
k9:function k9(){},
ka:function ka(a,b){this.a=a
this.b=b},
k8:function k8(a,b){this.a=a
this.b=b},
kb:function kb(a,b){this.a=a
this.b=b},
k7:function k7(a){this.a=a},
kc:function kc(a,b){this.a=a
this.b=b},
k5:function k5(a){this.a=a},
k6:function k6(a,b){this.a=a
this.b=b},
kd:function kd(a,b,c){this.a=a
this.b=b
this.c=c},
k2:function k2(a){this.a=a},
k3:function k3(a){this.a=a},
k4:function k4(a,b){this.a=a
this.b=b},
ke:function ke(a,b,c){this.a=a
this.b=b
this.c=c},
k0:function k0(a){this.a=a},
k1:function k1(){},
kg:function kg(a,b,c){this.a=a
this.b=b
this.c=c},
kh:function kh(a,b){this.a=a
this.b=b},
kf:function kf(a,b){this.a=a
this.b=b},
jV:function jV(a){this.a=a},
ku:function ku(){},
kv:function kv(a,b){this.a=a
this.b=b},
kw:function kw(){},
kx:function kx(){},
ky:function ky(a,b){this.a=a
this.b=b},
ki:function ki(a){this.a=a},
kj:function kj(a,b){this.a=a
this.b=b},
kk:function kk(){},
kl:function kl(){},
km:function km(a){this.a=a},
jH:function jH(a){this.a=a},
jI:function jI(a){this.a=a},
jG:function jG(a){this.a=a},
jJ:function jJ(a){this.a=a},
jK:function jK(a){this.a=a},
jq:function jq(a,b){this.a=a
this.b=b},
kz:function kz(a){this.a=a},
jr:function jr(a,b){this.a=a
this.b=b},
js:function js(a){this.a=a},
jt:function jt(a){this.a=a},
ju:function ju(a){this.a=a},
jv:function jv(a,b){this.a=a
this.b=b},
jw:function jw(a){this.a=a},
kD:function kD(a,b){this.a=a
this.b=b},
kE:function kE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jX:function jX(a){this.a=a},
jY:function jY(){},
jZ:function jZ(){},
k_:function k_(){},
kL:function kL(){},
jW:function jW(a,b){this.a=a
this.b=b},
kI:function kI(a){this.a=a},
kF:function kF(){},
kG:function kG(){},
kH:function kH(){},
j5:function j5(a){this.a=a},
kn:function kn(){},
ko:function ko(){},
kp:function kp(){},
kq:function kq(a){this.a=a},
kr:function kr(){},
ks:function ks(){},
kt:function kt(a,b){this.a=a
this.b=b},
j0:function j0(){},
j_:function j_(a){this.a=a},
j1:function j1(a){this.a=a},
j2:function j2(a,b){this.a=a
this.b=b},
j3:function j3(a,b,c){this.a=a
this.b=b
this.c=c},
j4:function j4(){},
iF:function iF(a,b,c){this.a=a
this.b=b
this.c=c},
iG:function iG(a){this.a=a},
iH:function iH(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
iY:function iY(a,b,c){this.a=a
this.b=b
this.c=c},
iZ:function iZ(a){this.a=a},
iB:function iB(a,b,c){this.a=a
this.b=b
this.c=c},
iC:function iC(a){this.a=a},
iD:function iD(a){this.a=a},
iN:function iN(a,b,c){this.a=a
this.b=b
this.c=c},
iX:function iX(a,b){this.a=a
this.b=b},
iE:function iE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
iW:function iW(a,b){this.a=a
this.b=b},
iO:function iO(a,b){this.a=a
this.b=b},
iP:function iP(a,b){this.a=a
this.b=b},
iQ:function iQ(a,b){this.a=a
this.b=b},
iR:function iR(a,b){this.a=a
this.b=b},
iS:function iS(a,b){this.a=a
this.b=b},
iT:function iT(a,b){this.a=a
this.b=b},
iU:function iU(a,b){this.a=a
this.b=b},
iI:function iI(a,b){this.a=a
this.b=b},
iJ:function iJ(a,b,c){this.a=a
this.b=b
this.c=c},
iV:function iV(a,b){this.a=a
this.b=b},
iK:function iK(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
iL:function iL(a,b,c){this.a=a
this.b=b
this.c=c},
iA:function iA(){},
iM:function iM(a){this.a=a},
pp(a,b){return new A.at(a,!1,b)},
at:function at(a,b,c){this.a=a
this.b=b
this.c=c},
kT:function kT(a,b,c,d,e,f,g,h,i,j,k){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=!1
_.z=_.y=null
_.Q=!1
_.at=_.as=null
_.ax=0
_.ay=i
_.ch=0
_.CW=j
_.cx=null
_.cy=k
_.dx=_.db=!1},
kW:function kW(){},
kX:function kX(a){this.a=a},
l3:function l3(a){this.a=a},
l_:function l_(a,b){this.a=a
this.b=b},
l0:function l0(a){this.a=a},
l1:function l1(a){this.a=a},
l2:function l2(a,b){this.a=a
this.b=b},
li:function li(){},
lj:function lj(){},
kZ:function kZ(){},
lu:function lu(){},
lv:function lv(a,b,c){this.a=a
this.b=b
this.c=c},
lz:function lz(){},
lA:function lA(a){this.a=a},
lB:function lB(a){this.a=a},
ly:function ly(a){this.a=a},
lC:function lC(a){this.a=a},
lD:function lD(){},
lo:function lo(a){this.a=a},
lp:function lp(a){this.a=a},
lq:function lq(a){this.a=a},
lr:function lr(a){this.a=a},
ls:function ls(a){this.a=a},
lt:function lt(a){this.a=a},
l6:function l6(){},
lh:function lh(){},
lx:function lx(a,b,c){this.a=a
this.b=b
this.c=c},
lw:function lw(a,b){this.a=a
this.b=b},
lE:function lE(){},
lF:function lF(){},
lG:function lG(a){this.a=a},
lH:function lH(){},
kV:function kV(){},
kU:function kU(a,b,c){this.a=a
this.b=b
this.c=c},
lg:function lg(a,b){this.a=a
this.b=b},
lI:function lI(a){this.a=a},
lf:function lf(){},
lJ:function lJ(){},
lK:function lK(a){this.a=a},
lL:function lL(){},
lM:function lM(a){this.a=a},
lN:function lN(){},
l5:function l5(a,b){this.a=a
this.b=b},
l4:function l4(a,b){this.a=a
this.b=b},
ld:function ld(a){this.a=a},
le:function le(){},
l9:function l9(){},
la:function la(){},
lb:function lb(a){this.a=a},
lc:function lc(){},
lk:function lk(a,b){this.a=a
this.b=b},
ll:function ll(){},
lm:function lm(){},
ln:function ln(a,b){this.a=a
this.b=b},
kY:function kY(a){this.a=a},
l8:function l8(a,b){this.a=a
this.b=b},
l7:function l7(a){this.a=a},
it(){var s,r=$.ro(),q=J.pG(24,t.N)
for(s=0;s<24;++s)q[s]=B.a.bh(B.e.hN(r.hu(256),16),2,"0")
return B.b.ho(q)},
b7(){var s,r,q
try{r=window.localStorage.getItem("waterhall_jwt")
r.toString
s=r
r=J.pn(s,".")
if(1>=r.length)return A.d(r,1)
r=A.x(J.j(B.c.I(0,B.m.I(0,B.x.aE(B.C.dW(0,r[1])))),"sub"))
return r}catch(q){return null}},
bw(){var s,r,q,p
try{q=window.localStorage.getItem("waterhall_jwt")
q.toString
s=q
q=J.pn(s,".")
if(1>=q.length)return A.d(q,1)
r=B.c.I(0,B.m.I(0,B.x.aE(B.C.dW(0,q[1]))))
q=J.rH(J.rI(J.j(r,"exp"),1000),Date.now())
return q}catch(p){return!1}},
iq(a,b){var s=0,r=A.S(t.z),q
var $async$iq=A.T(function(c,d){if(c===1)return A.P(d,r)
for(;;)switch(s){case 0:if(!$.bx().bf("WaterHallStorage")){q=null
s=1
break}s=3
return A.w(A.pe(A.aY(globalThis.waterhallNativeCall(a,A.vS(b))),t.z),$async$iq)
case 3:q=d
s=1
break
case 1:return A.Q(q,r)}})
return A.R($async$iq,r)},
ir(a){var s=0,r=A.S(t.H)
var $async$ir=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:s=$.bx().bf("waterhallSetNativeSession")?2:3
break
case 2:s=4
return A.w(A.pe(A.aY(globalThis.waterhallSetNativeSession(a)),t.z),$async$ir)
case 4:case 3:return A.Q(null,r)}})
return A.R($async$ir,r)},
c9(a,b){var s=A.b7(),r=$.rG().ec(new A.ob(s,a,b),t.a)
$.vf=r.dH(new A.oc())
return r},
nU(a,b){var s=0,r=A.S(t.H),q,p,o,n
var $async$nU=A.T(function(c,d){if(c===1)return A.P(d,r)
for(;;)switch(s){case 0:n=A.b7()
if(n==null)throw A.b(A.O("Sign in before recording an operation"))
q=A.E(b)
p=q.i("I<1>")
o=A.a3(new A.I(b,q.i("F(1)").a(new A.nV(n)),p),p.i("h.E"))
q=a==="bill_history"
s=!q||J.i($.bx().h(0,"waterhallBillHistoryStorage"),!0)?2:3
break
case 2:s=4
return A.w(A.iq("save",A.a6(["type",a,"rows",o],t.N,t.z)),$async$nU)
case 4:case 3:p=window.localStorage
p.toString
if(a==="collections")q="waterhall_offline_collections"
else q=q?"waterhall_bill_history":"waterhall_unsynced_actions"
p.setItem(q,B.c.V(b))
return A.Q(null,r)}})
return A.R($async$nU,r)},
du(){var s=0,r=A.S(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
var $async$du=A.T(function(a5,a6){if(a5===1)return A.P(a6,r)
for(;;)switch(s){case 0:a4=window.localStorage.getItem("waterhall_jwt")
if(A.b7()==null){s=1
break}s=3
return A.w(A.ir(window.localStorage.getItem("waterhall_jwt")),$async$du)
case 3:p=A.B(["collections","actions"],t.s)
if(A.h5().gal().h(0,"role")!=="resident")p.push("bill_history")
o=p.length
n=t.f
m=t.N
l=t.z
k=t.j
j=t.P
i=0
case 4:if(!(i<p.length)){s=6
break}h=p[i]
if(window.localStorage.getItem("waterhall_jwt")!=a4){s=1
break}g=h==="bill_history"
if(g&&!J.i($.bx().h(0,"waterhallBillHistoryStorage"),!0)){s=5
break}s=7
return A.w(A.iq("load",A.a6(["type",h],m,l)),$async$du)
case 7:f=a6
if(window.localStorage.getItem("waterhall_jwt")!=a4){s=1
break}if(f==null){s=5
break}e=k.a(B.c.I(0,A.x(f)))
if(h==="collections")d="waterhall_offline_collections"
else d=g?"waterhall_bill_history":"waterhall_unsynced_actions"
c=window.localStorage.getItem(d)
b=A.ai(m,j)
c=A.a3(k.a(B.c.I(0,c==null?"[]":c)),l)
B.b.R(c,e)
a=c.length
a0=0
for(;a0<c.length;c.length===a||(0,A.ar)(c),++a0){a1=A.aj(n.a(c[a0]),m,l)
if(g){a2=A.e(a1.h(0,"owner"))
a3=a1.h(0,"bill_id")
a2=a2+"|"+A.e(a3==null?a1.h(0,"operation_id"):a3)}else{a2=a1.h(0,"transaction_id")
a2=J.M(a2==null?a1.h(0,"operation_id"):a2)}b.k(0,a2,a1)}s=A.b7()!=null?8:9
break
case 8:s=10
return A.w(A.c9(h,new A.oh(b,h)),$async$du)
case 10:case 9:case 5:p.length===o||(0,A.ar)(p),++i
s=4
break
case 6:case 1:return A.Q(q,r)}})
return A.R($async$du,r)},
ob:function ob(a,b,c){this.a=a
this.b=b
this.c=c},
oa:function oa(){},
oc:function oc(){},
nV:function nV(a){this.a=a},
oh:function oh(a,b){this.a=a
this.b=b},
og:function og(a){this.a=a},
tI(a,b){var s,r,q="resident-connection-screen",p=document,o=p.createElement("div")
o.id=q
o.className=q
s=p.createElement("h2")
s.toString
r=p.createElement("p")
r.toString
p=p.createElement("button")
p.id="resident-connection-retry"
p.className="btn"
B.i.sG(p,"Retry")
p=new A.mk(a,b,o,s,r,p)
p.eP(a,b)
return p},
mk:function mk(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.w=_.r=!1
_.x=0},
ml:function ml(a){this.a=a},
mm:function mm(a){this.a=a},
mn:function mn(a){this.a=a},
mo:function mo(a){this.a=a},
mp:function mp(a){this.a=a},
mq:function mq(a){this.a=a},
mr:function mr(a){this.a=a},
r6(a){return t.fj.b(a)||t.A.b(a)||t.mz.b(a)||t.ad.b(a)||t.F.b(a)||t.hE.b(a)||t.f5.b(a)},
vW(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
w_(a){throw A.ah(A.pK(a),new Error())},
aA(){throw A.ah(A.tv(""),new Error())},
re(){throw A.ah(A.pK(""),new Error())}},B={}
var w=[A,J,B]
var $={}
A.oC.prototype={}
J.cU.prototype={
a0(a,b){return a===b},
gL(a){return A.e0(a)},
l(a){return"Instance of '"+A.e1(a)+"'"},
dV(a,b){throw A.b(A.pP(a,t.bg.a(b)))},
gW(a){return A.cI(A.p3(this))}}
J.fj.prototype={
l(a){return String(a)},
gL(a){return a?519018:218159},
gW(a){return A.cI(t.y)},
$iZ:1,
$iF:1}
J.dL.prototype={
a0(a,b){return null==b},
l(a){return"null"},
gL(a){return 0},
$iZ:1,
$ia8:1}
J.a.prototype={$ik:1}
J.bZ.prototype={
gL(a){return 0},
l(a){return String(a)}}
J.fH.prototype={}
J.bJ.prototype={}
J.bD.prototype={
l(a){var s=a[$.iu()]
if(s==null)s=a[$.ri()]
if(s==null)return this.eJ(a)
return"JavaScript function for "+J.M(s)},
$icn:1}
J.cV.prototype={
gL(a){return 0},
l(a){return String(a)}}
J.cW.prototype={
gL(a){return 0},
l(a){return String(a)}}
J.a5.prototype={
m(a,b){A.E(a).c.a(b)
a.$flags&1&&A.am(a,29)
a.push(b)},
cB(a,b,c){var s
A.E(a).c.a(c)
a.$flags&1&&A.am(a,"insert",2)
s=a.length
if(b>s)throw A.b(A.pW(b,null))
a.splice(b,0,c)},
hE(a,b){A.E(a).i("F(1)").a(b)
a.$flags&1&&A.am(a,16)
this.dk(a,b,!0)},
dk(a,b,c){var s,r,q,p,o
A.E(a).i("F(1)").a(b)
s=[]
r=a.length
for(q=0;q<r;++q){p=a[q]
if(!b.$1(p))s.push(p)
if(a.length!==r)throw A.b(A.aa(a))}o=s.length
if(o===r)return
this.sj(a,o)
for(q=0;q<s.length;++q)a[q]=s[q]},
R(a,b){var s
A.E(a).i("h<1>").a(b)
a.$flags&1&&A.am(a,"addAll",2)
if(Array.isArray(b)){this.eW(a,b)
return}for(s=J.aH(b);s.p();)a.push(s.gt(s))},
eW(a,b){var s,r
t.dG.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.b(A.aa(a))
for(r=0;r<s;++r)a.push(b[r])},
X(a){a.$flags&1&&A.am(a,"clear","clear")
a.length=0},
q(a,b){var s,r
A.E(a).i("~(1)").a(b)
s=a.length
for(r=0;r<s;++r){b.$1(a[r])
if(a.length!==s)throw A.b(A.aa(a))}},
av(a,b,c){var s=A.E(a)
return new A.a1(a,s.K(c).i("1(2)").a(b),s.i("@<1>").K(c).i("a1<1,2>"))},
a_(a,b){var s,r=A.dT(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.k(r,s,A.e(a[s]))
return r.join(b)},
ho(a){return this.a_(a,"")},
hB(a,b){var s,r,q
A.E(a).i("1(1,1)").a(b)
s=a.length
if(s===0)throw A.b(A.dJ())
if(0>=s)return A.d(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.b(A.aa(a))}return r},
ct(a,b,c,d){var s,r,q
d.a(b)
A.E(a).K(d).i("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.b(A.aa(a))}return r},
dL(a,b,c){var s,r,q,p=A.E(a)
p.i("F(1)").a(b)
p.i("1()?").a(c)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.b(A.aa(a))}if(c!=null)return c.$0()
throw A.b(A.dJ())},
hb(a,b){return this.dL(a,b,null)},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
cY(a,b,c){var s=a.length
if(b>s)throw A.b(A.ak(b,0,s,"start",null))
if(c==null)c=s
else if(c<b||c>s)throw A.b(A.ak(c,b,s,"end",null))
if(b===c)return A.B([],A.E(a))
return A.B(a.slice(b,c),A.E(a))},
eE(a,b){return this.cY(a,b,null)},
gD(a){if(a.length>0)return a[0]
throw A.b(A.dJ())},
gdR(a){var s=a.length
if(s>0)return a[s-1]
throw A.b(A.dJ())},
a6(a,b){var s,r
A.E(a).i("F(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.b(A.aa(a))}return!1},
aM(a,b){var s,r,q,p,o,n=A.E(a)
n.i("l(1,1)?").a(b)
a.$flags&2&&A.am(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.bn()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.bO(b,2))
if(p>0)this.fw(a,p)},
fw(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
v(a,b){var s
for(s=0;s<a.length;++s)if(J.i(a[s],b))return!0
return!1},
gE(a){return a.length===0},
gT(a){return a.length!==0},
l(a){return A.oA(a,"[","]")},
gB(a){return new J.be(a,a.length,A.E(a).i("be<1>"))},
gL(a){return A.e0(a)},
gj(a){return a.length},
sj(a,b){a.$flags&1&&A.am(a,"set length","change the length of")
if(b>a.length)A.E(a).c.a(null)
a.length=b},
h(a,b){A.L(b)
if(!(b>=0&&b<a.length))throw A.b(A.io(a,b))
return a[b]},
k(a,b,c){A.E(a).c.a(c)
a.$flags&2&&A.am(a)
if(!(b>=0&&b<a.length))throw A.b(A.io(a,b))
a[b]=c},
ei(a,b){return new A.cx(a,b.i("cx<0>"))},
hg(a,b){var s
A.E(a).i("F(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$in:1,
$ih:1,
$ip:1}
J.fi.prototype={
ee(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.e1(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.m0.prototype={}
J.be.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.ar(q)
throw A.b(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iae:1}
J.cp.prototype={
a1(a,b){var s
A.ac(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gbK(b)
if(this.gbK(a)===s)return 0
if(this.gbK(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbK(a){return a===0?1/a<0:a<0},
aI(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.b(A.U(""+a+".round()"))},
cq(a,b,c){if(B.e.a1(b,c)>0)throw A.b(A.p6(b))
if(this.a1(a,b)<0)return b
if(this.a1(a,c)>0)return c
return a},
H(a,b){var s
if(b>20)throw A.b(A.ak(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gbK(a))return"-"+s
return s},
hN(a,b){var s,r,q,p,o
if(b<2||b>36)throw A.b(A.ak(b,2,36,"radix",null))
s=a.toString(b)
r=s.length
q=r-1
if(!(q>=0))return A.d(s,q)
if(s.charCodeAt(q)!==41)return s
p=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(s)
if(p==null)A.cc(A.U("Unexpected toString result: "+s))
r=p.length
if(1>=r)return A.d(p,1)
s=p[1]
if(3>=r)return A.d(p,3)
o=+p[3]
r=p[2]
if(r!=null){s+=r
o-=r.length}return s+B.a.aK("0",o)},
l(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gL(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
aK(a,b){return a*b},
aZ(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
eO(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.dn(a,b)},
ad(a,b){return(a|0)===a?a/b|0:this.dn(a,b)},
dn(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.b(A.U("Result of truncating division is "+A.e(s)+": "+A.e(a)+" ~/ "+b))},
b9(a,b){var s
if(a>0)s=this.dm(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
fG(a,b){if(0>b)throw A.b(A.p6(b))
return this.dm(a,b)},
dm(a,b){return b>31?0:a>>>b},
bn(a,b){return a>b},
gW(a){return A.cI(t.u)},
$iX:1,
$ia_:1}
J.dK.prototype={
gW(a){return A.cI(t.q)},
$iZ:1,
$il:1}
J.fl.prototype={
gW(a){return A.cI(t.dx)},
$iZ:1}
J.bY.prototype={
cN(a,b){return a+b},
eC(a,b){var s=A.B(a.split(b),t.s)
return s},
aH(a,b,c,d){var s=A.cu(b,c,a.length)
return a.substring(0,b)+d+a.substring(s)},
S(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.ak(c,0,a.length,null,null))
s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)},
O(a,b){return this.S(a,b,0)},
n(a,b,c){return a.substring(b,A.cu(b,c,a.length))},
Z(a,b){return this.n(a,b,null)},
hM(a){return a.toLowerCase()},
A(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.d(p,0)
if(p.charCodeAt(0)===133){s=J.tr(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.d(p,r)
q=p.charCodeAt(r)===133?J.ts(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
aK(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.b(B.a6)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
bh(a,b,c){var s=b-a.length
if(s<=0)return a
return this.aK(c,s)+a},
bJ(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.ak(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
dO(a,b){return this.bJ(a,b,0)},
dS(a,b,c){var s,r
if(c==null)c=a.length
else if(c<0||c>a.length)throw A.b(A.ak(c,0,a.length,null,null))
s=b.length
r=a.length
if(c+s>r)c=r-s
return a.lastIndexOf(b,c)},
hp(a,b){return this.dS(a,b,null)},
bF(a,b,c){var s=a.length
if(c>s)throw A.b(A.ak(c,0,s,null,null))
return A.vY(a,b,c)},
v(a,b){return this.bF(a,b,0)},
a1(a,b){var s
A.x(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
l(a){return a},
gL(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gW(a){return A.cI(t.N)},
gj(a){return a.length},
h(a,b){A.L(b)
if(!(b>=0&&b<a.length))throw A.b(A.io(a,b))
return a[b]},
$iZ:1,
$imh:1,
$ic:1}
A.dO.prototype={
l(a){return"LateInitializationError: "+this.a}}
A.f2.prototype={
gj(a){return this.a.length},
h(a,b){var s
A.L(b)
s=this.a
if(!(b>=0&&b<s.length))return A.d(s,b)
return s.charCodeAt(b)}}
A.od.prototype={
$0(){return A.oy(null,t.H)},
$S:39}
A.mt.prototype={}
A.n.prototype={}
A.a7.prototype={
gB(a){var s=this
return new A.bi(s,s.gj(s),A.C(s).i("bi<a7.E>"))},
gE(a){return this.gj(this)===0},
v(a,b){var s,r=this,q=r.gj(r)
for(s=0;s<q;++s){if(J.i(r.u(0,s),b))return!0
if(q!==r.gj(r))throw A.b(A.aa(r))}return!1},
a_(a,b){var s,r,q,p=this,o=p.gj(p)
if(b.length!==0){if(o===0)return""
s=A.e(p.u(0,0))
if(o!==p.gj(p))throw A.b(A.aa(p))
for(r=s,q=1;q<o;++q){r=r+b+A.e(p.u(0,q))
if(o!==p.gj(p))throw A.b(A.aa(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.e(p.u(0,q))
if(o!==p.gj(p))throw A.b(A.aa(p))}return r.charCodeAt(0)==0?r:r}},
bT(a,b){return this.cZ(0,A.C(this).i("F(a7.E)").a(b))},
av(a,b,c){var s=A.C(this)
return new A.a1(this,s.K(c).i("1(a7.E)").a(b),s.i("@<a7.E>").K(c).i("a1<1,2>"))},
aJ(a,b){var s=A.a3(this,A.C(this).i("a7.E"))
return s},
az(a){return this.aJ(0,!0)},
ed(a){var s,r=this,q=A.cs(A.C(r).i("a7.E"))
for(s=0;s<r.gj(r);++s)q.m(0,r.u(0,s))
return q}}
A.e7.prototype={
gfb(){var s=J.ao(this.a),r=this.c
if(r==null||r>s)return s
return r},
gfI(){var s=J.ao(this.a),r=this.b
if(r>s)return s
return r},
gj(a){var s,r=J.ao(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
u(a,b){var s=this,r=s.gfI()+b
if(b<0||r>=s.gfb())throw A.b(A.ab(b,s.gj(0),s,null,"index"))
return J.eQ(s.a,r)},
hK(a,b){var s,r,q,p=this
A.d5(b,"count")
s=p.c
r=p.b
q=r+b
if(s==null)return A.e8(p.a,r,q,p.$ti.c)
else{if(s<q)return p
return A.e8(p.a,r,q,p.$ti.c)}},
aJ(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.y(n),l=m.gj(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.oB(0,n):J.pH(0,n)}r=A.dT(s,m.u(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.b.k(r,q,m.u(n,o+q))
if(m.gj(n)<l)throw A.b(A.aa(p))}return r},
az(a){return this.aJ(0,!0)}}
A.bi.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s,r=this,q=r.a,p=J.y(q),o=p.gj(q)
if(r.b!==o)throw A.b(A.aa(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.u(q,s);++r.c
return!0},
$iae:1}
A.aK.prototype={
gB(a){return new A.dU(J.aH(this.a),this.b,A.C(this).i("dU<1,2>"))},
gj(a){return J.ao(this.a)},
gE(a){return J.ix(this.a)},
u(a,b){return this.b.$1(J.eQ(this.a,b))}}
A.bA.prototype={$in:1}
A.dU.prototype={
p(){var s=this,r=s.b
if(r.p()){s.a=s.c.$1(r.gt(r))
return!0}s.a=null
return!1},
gt(a){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iae:1}
A.a1.prototype={
gj(a){return J.ao(this.a)},
u(a,b){return this.b.$1(J.eQ(this.a,b))}}
A.I.prototype={
gB(a){return new A.ay(J.aH(this.a),this.b,this.$ti.i("ay<1>"))},
av(a,b,c){var s=this.$ti
return new A.aK(this,s.K(c).i("1(2)").a(b),s.i("@<1>").K(c).i("aK<1,2>"))}}
A.ay.prototype={
p(){var s,r
for(s=this.a,r=this.b;s.p();)if(r.$1(s.gt(s)))return!0
return!1},
gt(a){var s=this.a
return s.gt(s)},
$iae:1}
A.cx.prototype={
gB(a){return new A.ec(J.aH(this.a),this.$ti.i("ec<1>"))}}
A.ec.prototype={
p(){var s,r
for(s=this.a,r=this.$ti.c;s.p();)if(r.b(s.gt(s)))return!0
return!1},
gt(a){var s=this.a
return this.$ti.c.a(s.gt(s))},
$iae:1}
A.aJ.prototype={}
A.bK.prototype={
k(a,b,c){A.C(this).i("bK.E").a(c)
throw A.b(A.U("Cannot modify an unmodifiable list"))}}
A.da.prototype={}
A.hD.prototype={
gj(a){return J.ao(this.a)},
u(a,b){var s=J.ao(this.a)
if(0>b||b>=s)A.cc(A.ab(b,s,this,null,"index"))
return b}}
A.ct.prototype={
h(a,b){return this.N(0,b)?J.j(this.a,A.L(b)):null},
gj(a){return J.ao(this.a)},
gJ(a){return new A.hD(this.a)},
gE(a){return J.ix(this.a)},
gT(a){return J.or(this.a)},
N(a,b){return A.dm(b)&&b>=0&&b<J.ao(this.a)},
q(a,b){var s,r,q,p
this.$ti.i("~(l,1)").a(b)
s=this.a
r=J.y(s)
q=r.gj(s)
for(p=0;p<q;++p){b.$2(p,r.h(s,p))
if(q!==r.gj(s))throw A.b(A.aa(s))}}}
A.c2.prototype={
gL(a){var s=this._hashCode
if(s!=null)return s
s=664597*B.a.gL(this.a)&536870911
this._hashCode=s
return s},
l(a){return'Symbol("'+this.a+'")'},
a0(a,b){if(b==null)return!1
return b instanceof A.c2&&this.a===b.a},
$id8:1}
A.dz.prototype={}
A.dy.prototype={
gE(a){return this.gj(this)===0},
gT(a){return this.gj(this)!==0},
l(a){return A.oG(this)},
k(a,b,c){var s=A.C(this)
s.c.a(b)
s.y[1].a(c)
A.px()},
C(a,b){A.px()},
gaF(a){return new A.di(this.h9(0),A.C(this).i("di<au<1,2>>"))},
h9(a){var s=this
return function(){var r=a
var q=0,p=1,o=[],n,m,l,k,j
return function $async$gaF(b,c,d){if(c===1){o.push(d)
q=p}for(;;)switch(q){case 0:n=s.gJ(s),n=n.gB(n),m=A.C(s),l=m.y[1],m=m.i("au<1,2>")
case 2:if(!n.p()){q=3
break}k=n.gt(n)
j=s.h(0,k)
q=4
return b.b=new A.au(k,j==null?l.a(j):j,m),1
case 4:q=2
break
case 3:return 0
case 1:return b.c=o.at(-1),3}}}},
$it:1}
A.by.prototype={
gj(a){return this.b.length},
gdd(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
N(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
h(a,b){if(!this.N(0,b))return null
return this.b[this.a[b]]},
q(a,b){var s,r,q,p
this.$ti.i("~(1,2)").a(b)
s=this.gdd()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gJ(a){return new A.eo(this.gdd(),this.$ti.i("eo<1>"))}}
A.eo.prototype={
gj(a){return this.a.length},
gE(a){return 0===this.a.length},
gB(a){var s=this.a
return new A.ep(s,s.length,this.$ti.i("ep<1>"))}}
A.ep.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iae:1}
A.fk.prototype={
ghs(){var s=this.a
if(s instanceof A.c2)return s
return this.a=new A.c2(A.x(s))},
ghy(){var s,r,q,p,o,n=this
if(n.c===1)return B.M
s=n.d
r=J.y(s)
q=r.gj(s)-J.ao(n.e)-n.f
if(q===0)return B.M
p=[]
for(o=0;o<q;++o)p.push(r.h(s,o))
p.$flags=3
return p},
ght(){var s,r,q,p,o,n,m,l,k=this
if(k.c!==0)return B.P
s=k.e
r=J.y(s)
q=r.gj(s)
p=k.d
o=J.y(p)
n=o.gj(p)-q-k.f
if(q===0)return B.P
m=new A.bh(t.bX)
for(l=0;l<q;++l)m.k(0,new A.c2(A.x(r.h(s,l))),o.h(p,n+l))
return new A.dz(m,t.i9)},
$ipF:1}
A.mi.prototype={
$2(a,b){var s
A.x(a)
s=this.a
s.b=s.b+"$"+a
B.b.m(this.b,a)
B.b.m(this.c,b);++s.a},
$S:6}
A.d6.prototype={}
A.mB.prototype={
af(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
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
A.e_.prototype={
l(a){return"Null check operator used on a null value"}}
A.fm.prototype={
l(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.h2.prototype={
l(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.mg.prototype={
l(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.dF.prototype={}
A.ez.prototype={
l(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibm:1}
A.bU.prototype={
l(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.rf(r==null?"unknown":r)+"'"},
$icn:1,
ghR(){return this},
$C:"$1",
$R:1,
$D:null}
A.f0.prototype={$C:"$0",$R:0}
A.f1.prototype={$C:"$2",$R:2}
A.fS.prototype={}
A.fO.prototype={
l(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.rf(s)+"'"}}
A.cP.prototype={
a0(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.cP))return!1
return this.$_target===b.$_target&&this.a===b.a},
gL(a){return(A.is(this.a)^A.e0(this.$_target))>>>0},
l(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.e1(this.a)+"'")}}
A.fL.prototype={
l(a){return"RuntimeError: "+this.a}}
A.nl.prototype={}
A.bh.prototype={
gj(a){return this.a},
gE(a){return this.a===0},
gT(a){return this.a!==0},
gJ(a){return new A.cr(this,A.C(this).i("cr<1>"))},
gaF(a){return new A.dP(this,A.C(this).i("dP<1,2>"))},
N(a,b){var s=this.b
if(s==null)return!1
return s[b]!=null},
R(a,b){J.eR(A.C(this).i("t<1,2>").a(b),new A.m1(this))},
h(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.hl(b)},
hl(a){var s,r,q=this.d
if(q==null)return null
s=q[this.dP(a)]
r=this.dQ(s,a)
if(r<0)return null
return s[r].b},
k(a,b,c){var s,r,q=this,p=A.C(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.d_(s==null?q.b=q.ca():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.d_(r==null?q.c=q.ca():r,b,c)}else q.hm(b,c)},
hm(a,b){var s,r,q,p,o=this,n=A.C(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.ca()
r=o.dP(a)
q=s[r]
if(q==null)s[r]=[o.cb(a,b)]
else{p=o.dQ(q,a)
if(p>=0)q[p].b=b
else q.push(o.cb(a,b))}},
e1(a,b,c){var s,r,q=this,p=A.C(q)
p.c.a(b)
p.i("2()").a(c)
if(q.N(0,b)){s=q.h(0,b)
return s==null?p.y[1].a(s):s}r=c.$0()
q.k(0,b,r)
return r},
C(a,b){var s=this.ft(this.b,b)
return s},
X(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.c9()}},
q(a,b){var s,r,q=this
A.C(q).i("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.b(A.aa(q))
s=s.c}},
d_(a,b,c){var s,r=A.C(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.cb(b,c)
else s.b=c},
ft(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.fM(s)
delete a[b]
return s.b},
c9(){this.r=this.r+1&1073741823},
cb(a,b){var s=this,r=A.C(s),q=new A.m6(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.c9()
return q},
fM(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.c9()},
dP(a){return J.cM(a)&1073741823},
dQ(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.i(a[r].a,b))return r
return-1},
l(a){return A.oG(this)},
ca(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ipL:1}
A.m1.prototype={
$2(a,b){var s=this.a,r=A.C(s)
s.k(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.C(this.a).i("~(1,2)")}}
A.m6.prototype={}
A.cr.prototype={
gj(a){return this.a.a},
gE(a){return this.a.a===0},
gB(a){var s=this.a
return new A.dR(s,s.r,s.e,this.$ti.i("dR<1>"))},
v(a,b){return this.a.N(0,b)}}
A.dR.prototype={
gt(a){return this.d},
p(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.aa(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iae:1}
A.b2.prototype={
gj(a){return this.a.a},
gE(a){return this.a.a===0},
gB(a){var s=this.a
return new A.dS(s,s.r,s.e,this.$ti.i("dS<1>"))},
q(a,b){var s,r,q
this.$ti.i("~(1)").a(b)
s=this.a
r=s.e
q=s.r
while(r!=null){b.$1(r.b)
if(q!==s.r)throw A.b(A.aa(s))
r=r.c}}}
A.dS.prototype={
gt(a){return this.d},
p(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.aa(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iae:1}
A.dP.prototype={
gj(a){return this.a.a},
gE(a){return this.a.a===0},
gB(a){var s=this.a
return new A.dQ(s,s.r,s.e,this.$ti.i("dQ<1,2>"))}}
A.dQ.prototype={
gt(a){var s=this.d
s.toString
return s},
p(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.aa(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.au(s.a,s.b,r.$ti.i("au<1,2>"))
r.c=s.c
return!0}},
$iae:1}
A.o3.prototype={
$1(a){return this.a(a)},
$S:14}
A.o4.prototype={
$2(a,b){return this.a(a,b)},
$S:57}
A.o5.prototype={
$1(a){return this.a(A.x(a))},
$S:42}
A.dM.prototype={
l(a){return"RegExp/"+this.a+"/"+this.b.flags},
dK(a){var s=this.b.exec(a)
if(s==null)return null
return new A.nj(s)},
$imh:1,
$itH:1}
A.nj.prototype={
h(a,b){var s
A.L(b)
s=this.b
if(!(b<s.length))return A.d(s,b)
return s[b]}}
A.bF.prototype={
gW(a){return B.av},
dF(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
$iZ:1,
$ibF:1,
$idx:1}
A.fA.prototype={$ipY:1}
A.ap.prototype={
gfX(a){if(((a.$flags|0)&2)!==0)return new A.i9(a.buffer)
else return a.buffer},
fi(a,b,c,d){var s=A.ak(b,0,c,d,null)
throw A.b(s)},
d3(a,b,c,d){if(b>>>0!==b||b>c)this.fi(a,b,c,d)},
$iap:1,
$iaf:1}
A.i9.prototype={
dF(a,b,c){var s=A.pO(this.a,b,c)
s.$flags=3
return s},
$idx:1}
A.dV.prototype={
gW(a){return B.aw},
$iZ:1,
$ikP:1}
A.aw.prototype={
gj(a){return a.length},
fF(a,b,c,d,e){var s,r,q=a.length
this.d3(a,b,q,"start")
this.d3(a,c,q,"end")
if(b>c)throw A.b(A.ak(b,0,c,null,null))
s=c-b
if(e<0)throw A.b(A.aZ(e,null))
r=d.length
if(r-e<s)throw A.b(A.O("Not enough elements"))
if(e!==0||r!==s)d=d.subarray(e,e+s)
a.set(d,b)},
$iN:1}
A.dW.prototype={
h(a,b){A.L(b)
A.bN(b,a,a.length)
return a[b]},
k(a,b,c){A.qH(c)
a.$flags&2&&A.am(a)
A.bN(b,a,a.length)
a[b]=c},
$in:1,
$ih:1,
$ip:1}
A.b3.prototype={
k(a,b,c){A.L(c)
a.$flags&2&&A.am(a)
A.bN(b,a,a.length)
a[b]=c},
bX(a,b,c,d,e){t.fm.a(d)
a.$flags&2&&A.am(a,5)
if(t.aj.b(d)){this.fF(a,b,c,d,e)
return}this.eK(a,b,c,d,e)},
$in:1,
$ih:1,
$ip:1}
A.fv.prototype={
gW(a){return B.ax},
$iZ:1,
$ilW:1}
A.fw.prototype={
gW(a){return B.ay},
$iZ:1,
$ilX:1}
A.fx.prototype={
gW(a){return B.az},
h(a,b){A.L(b)
A.bN(b,a,a.length)
return a[b]},
$iZ:1,
$ilY:1}
A.fy.prototype={
gW(a){return B.aA},
h(a,b){A.L(b)
A.bN(b,a,a.length)
return a[b]},
$iZ:1,
$ilZ:1}
A.fz.prototype={
gW(a){return B.aB},
h(a,b){A.L(b)
A.bN(b,a,a.length)
return a[b]},
$iZ:1,
$im_:1}
A.fB.prototype={
gW(a){return B.aD},
h(a,b){A.L(b)
A.bN(b,a,a.length)
return a[b]},
$iZ:1,
$imD:1}
A.fC.prototype={
gW(a){return B.aE},
h(a,b){A.L(b)
A.bN(b,a,a.length)
return a[b]},
$iZ:1,
$imE:1}
A.dX.prototype={
gW(a){return B.aF},
gj(a){return a.length},
h(a,b){A.L(b)
A.bN(b,a,a.length)
return a[b]},
$iZ:1,
$imF:1}
A.dY.prototype={
gW(a){return B.aG},
gj(a){return a.length},
h(a,b){A.L(b)
A.bN(b,a,a.length)
return a[b]},
$iZ:1,
$imG:1}
A.er.prototype={}
A.es.prototype={}
A.et.prototype={}
A.eu.prototype={}
A.bl.prototype={
i(a){return A.nz(v.typeUniverse,this,a)},
K(a){return A.um(v.typeUniverse,this,a)}}
A.ht.prototype={}
A.nx.prototype={
l(a){return A.aL(this.a,null)}}
A.hq.prototype={
l(a){return this.a}}
A.dj.prototype={$ibH:1}
A.mR.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:15}
A.mQ.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:41}
A.mS.prototype={
$0(){this.a.$0()},
$S:20}
A.mT.prototype={
$0(){this.a.$0()},
$S:20}
A.eD.prototype={
eT(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(A.bO(new A.nw(this,b),0),a)
else throw A.b(A.U("`setTimeout()` not found."))},
eU(a,b){if(self.setTimeout!=null)this.b=self.setInterval(A.bO(new A.nv(this,a,Date.now(),b),0),a)
else throw A.b(A.U("Periodic timer."))},
a3(a){var s
if(self.setTimeout!=null){s=this.b
if(s==null)return
if(this.a)self.clearTimeout(s)
else self.clearInterval(s)
this.b=null}else throw A.b(A.U("Canceling a timer."))},
$ifW:1}
A.nw.prototype={
$0(){var s=this.a
s.b=null
s.c=1
this.b.$0()},
$S:2}
A.nv.prototype={
$0(){var s,r=this,q=r.a,p=q.c+1,o=r.b
if(o>0){s=Date.now()-r.c
if(s>(p+1)*o)p=B.e.eO(s,o)}q.c=p
r.d.$1(q)},
$S:20}
A.ha.prototype={
bc(a,b){var s,r=this,q=r.$ti
q.i("1/?").a(b)
if(b==null)b=q.c.a(b)
if(!r.b)r.a.b3(b)
else{s=r.a
if(q.i("ag<1>").b(b))s.d1(b)
else s.c3(b)}},
cr(a,b){var s=this.a
if(this.b)s.aD(new A.aB(a,b))
else s.bZ(new A.aB(a,b))}}
A.nN.prototype={
$1(a){return this.a.$2(0,a)},
$S:16}
A.nO.prototype={
$2(a,b){this.a.$2(1,new A.dF(a,t.l.a(b)))},
$S:44}
A.nX.prototype={
$2(a,b){this.a(A.L(a),b)},
$S:40}
A.eA.prototype={
gt(a){var s=this.b
return s==null?this.$ti.c.a(s):s},
fz(a,b){var s,r,q
a=A.L(a)
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
n.d=null}p=n.fz(l,m)
if(1===p)return!0
if(0===p){n.b=null
o=n.e
if(o==null||o.length===0){n.a=A.ql
return!1}if(0>=o.length)return A.d(o,-1)
n.a=o.pop()
l=0
m=null
continue}if(2===p){l=0
m=null
continue}if(3===p){m=n.c
n.c=null
o=n.e
if(o==null||o.length===0){n.b=null
n.a=A.ql
throw m
return!1}if(0>=o.length)return A.d(o,-1)
n.a=o.pop()
l=1
continue}throw A.b(A.O("sync*"))}return!1},
hV(a){var s,r,q=this
if(a instanceof A.di){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.b.m(r,q.a)
q.a=s
return 2}else{q.d=J.aH(a)
return 2}},
$iae:1}
A.di.prototype={
gB(a){return new A.eA(this.a(),this.$ti.i("eA<1>"))}}
A.aB.prototype={
l(a){return A.e(this.a)},
$ia0:1,
gb0(){return this.b}}
A.bv.prototype={}
A.bM.prototype={
cc(){},
cd(){},
sbu(a){this.ch=this.$ti.i("bM<1>?").a(a)},
sce(a){this.CW=this.$ti.i("bM<1>?").a(a)}}
A.ee.prototype={
gfl(){return this.c<4},
fu(a){var s,r
A.C(this).i("bM<1>").a(a)
s=a.CW
r=a.ch
if(s==null)this.d=r
else s.sbu(r)
if(r==null)this.e=s
else r.sce(s)
a.sce(a)
a.sbu(a)},
fJ(a,b,c,d){var s,r,q,p,o,n,m,l=this,k=A.C(l)
k.i("~(1)?").a(a)
t.jE.a(c)
if((l.c&4)!==0){k=new A.de($.V,k.i("de<1>"))
A.rc(k.gfm())
if(c!=null)k.c=t.M.a(c)
return k}s=$.V
r=d?1:0
q=b!=null?32:0
p=A.qa(s,a,k.c)
A.tX(s,b)
o=c==null?A.vw():c
t.M.a(o)
k=k.i("bM<1>")
n=new A.bM(l,p,s,r|q,k)
n.CW=n
n.ch=n
k.a(n)
n.ay=l.c&1
m=l.e
l.e=n
n.sbu(null)
n.sce(m)
if(m==null)l.d=n
else m.sbu(n)
if(l.d==l.e)A.qX(l.a)
return n},
fq(a){var s=this,r=A.C(s)
a=r.i("bM<1>").a(r.i("bs<1>").a(a))
if(a.ch===a)return null
r=a.ay
if((r&2)!==0)a.ay=r|4
else{s.fu(a)
if((s.c&2)===0&&s.d==null)s.f1()}return null},
eX(){if((this.c&4)!==0)return new A.br("Cannot add new events after calling close")
return new A.br("Cannot add new events while doing an addStream")},
m(a,b){var s=this
A.C(s).c.a(b)
if(!s.gfl())throw A.b(s.eX())
s.cj(b)},
f1(){if((this.c&4)!==0)if(null.ghU())null.b3(null)
A.qX(this.b)},
$ipZ:1,
$iqk:1,
$ic6:1}
A.ed.prototype={
cj(a){var s,r=this.$ti
r.c.a(a)
for(s=this.d,r=r.i("eh<1>");s!=null;s=s.ch)s.eZ(new A.eh(a,r))}}
A.mz.prototype={
l(a){var s=this.b.l(0)
return"TimeoutException after "+s+": "+this.a}}
A.hf.prototype={
cr(a,b){var s=this.a
if((s.a&30)!==0)throw A.b(A.O("Future already completed"))
s.bZ(A.uY(a,b))},
bE(a){return this.cr(a,null)}}
A.bL.prototype={
bc(a,b){var s,r=this.$ti
r.i("1/?").a(b)
s=this.a
if((s.a&30)!==0)throw A.b(A.O("Future already completed"))
s.b3(r.i("1/").a(b))},
h_(a){return this.bc(0,null)}}
A.bo.prototype={
hr(a){if((this.c&15)!==6)return!0
return this.b.b.cJ(t.iW.a(this.d),a.a,t.y,t.K)},
he(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.ng.b(q))p=l.hJ(q,m,a.b,o,n,t.l)
else p=l.cJ(t.w.a(q),m,o,n)
try{o=r.$ti.i("2/").a(p)
return o}catch(s){if(t.do.b(A.as(s))){if((r.c&1)!==0)throw A.b(A.aZ("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.b(A.aZ("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.W.prototype={
bR(a,b,c){var s,r,q,p=this.$ti
p.K(c).i("1/(2)").a(a)
s=$.V
if(s===B.h){if(b!=null&&!t.ng.b(b)&&!t.w.b(b))throw A.b(A.kM(b,"onError",u.c))}else{c.i("@<0/>").K(p.c).i("1(2)").a(a)
if(b!=null)b=A.qT(b,s)}r=new A.W(s,c.i("W<0>"))
q=b==null?1:3
this.b2(new A.bo(r,q,a,b,p.i("@<1>").K(c).i("bo<1,2>")))
return r},
ec(a,b){return this.bR(a,null,b)},
dr(a,b,c){var s,r=this.$ti
r.K(c).i("1/(2)").a(a)
s=new A.W($.V,c.i("W<0>"))
this.b2(new A.bo(s,19,a,b,r.i("@<1>").K(c).i("bo<1,2>")))
return s},
dH(a){var s=this.$ti,r=$.V,q=new A.W(r,s)
if(r!==B.h)a=A.qT(a,r)
this.b2(new A.bo(q,2,null,a,s.i("bo<1,1>")))
return q},
fE(a){this.a=this.a&1|16
this.c=a},
br(a){this.a=a.a&30|this.a&1
this.c=a.c},
b2(a){var s,r=this,q=r.a
if(q<=3){a.a=t.e.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.b2(a)
return}r.br(s)}A.dp(null,null,r.b,t.M.a(new A.n0(r,a)))}},
di(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.e.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t._.a(m.c)
if((n.a&24)===0){n.di(a)
return}m.br(n)}l.a=m.bx(a)
A.dp(null,null,m.b,t.M.a(new A.n5(l,m)))}},
b6(){var s=t.e.a(this.c)
this.c=null
return this.bx(s)},
bx(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
c2(a){var s,r=this,q=r.$ti
q.i("1/").a(a)
if(q.i("ag<1>").b(a))A.n3(a,r,!0)
else{s=r.b6()
q.c.a(a)
r.a=8
r.c=a
A.cz(r,s)}},
c3(a){var s,r=this
r.$ti.c.a(a)
s=r.b6()
r.a=8
r.c=a
A.cz(r,s)},
f6(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.b6()
q.br(a)
A.cz(q,r)},
aD(a){var s=this.b6()
this.fE(a)
A.cz(this,s)},
f5(a,b){A.aY(a)
t.l.a(b)
this.aD(new A.aB(a,b))},
b3(a){var s=this.$ti
s.i("1/").a(a)
if(s.i("ag<1>").b(a)){this.d1(a)
return}this.f_(a)},
f_(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.dp(null,null,s.b,t.M.a(new A.n2(s,a)))},
d1(a){A.n3(this.$ti.i("ag<1>").a(a),this,!1)
return},
bZ(a){this.a^=2
A.dp(null,null,this.b,t.M.a(new A.n1(this,a)))},
cK(a,b){var s,r=this,q={}
if((r.a&24)!==0){q=new A.W($.V,r.$ti)
q.b3(r)
return q}s=new A.W($.V,r.$ti)
q.a=null
q.a=A.fX(b,new A.nb(s,b))
r.bR(new A.nc(q,r,s),new A.nd(q,s),t.a)
return s},
$iag:1}
A.n0.prototype={
$0(){A.cz(this.a,this.b)},
$S:2}
A.n5.prototype={
$0(){A.cz(this.b,this.a.a)},
$S:2}
A.n4.prototype={
$0(){A.n3(this.a.a,this.b,!0)},
$S:2}
A.n2.prototype={
$0(){this.a.c3(this.b)},
$S:2}
A.n1.prototype={
$0(){this.a.aD(this.b)},
$S:2}
A.n8.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.e8(t.mY.a(q.d),t.z)}catch(p){s=A.as(p)
r=A.cJ(p)
if(k.c&&t.n.a(k.b.a.c).a===s){q=k.a
q.c=t.n.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.ot(q)
n=k.a
n.c=new A.aB(q,o)
q=n}q.b=!0
return}if(j instanceof A.W&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.n.a(j.c)
q.b=!0}return}if(j instanceof A.W){m=k.b.a
l=new A.W(m.b,m.$ti)
j.bR(new A.n9(l,m),new A.na(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:2}
A.n9.prototype={
$1(a){this.a.f6(this.b)},
$S:15}
A.na.prototype={
$2(a,b){A.aY(a)
t.l.a(b)
this.a.aD(new A.aB(a,b))},
$S:25}
A.n7.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.cJ(o.i("2/(1)").a(p.d),m,o.i("2/"),n)}catch(l){s=A.as(l)
r=A.cJ(l)
q=s
p=r
if(p==null)p=A.ot(q)
o=this.a
o.c=new A.aB(q,p)
o.b=!0}},
$S:2}
A.n6.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.n.a(l.a.a.c)
p=l.b
if(p.a.hr(s)&&p.a.e!=null){p.c=p.a.he(s)
p.b=!1}}catch(o){r=A.as(o)
q=A.cJ(o)
p=t.n.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.ot(p)
m=l.b
m.c=new A.aB(p,n)
p=m}p.b=!0}},
$S:2}
A.nb.prototype={
$0(){var s=A.oM()
this.a.aD(new A.aB(new A.mz("Future not completed",this.b),s))},
$S:2}
A.nc.prototype={
$1(a){var s
this.b.$ti.c.a(a)
s=this.a.a
if(s.b!=null){s.a3(0)
this.c.c3(a)}},
$S(){return this.b.$ti.i("a8(1)")}}
A.nd.prototype={
$2(a,b){var s
A.aY(a)
t.l.a(b)
s=this.a.a
if(s.b!=null){s.a3(0)
this.b.aD(new A.aB(a,b))}},
$S:25}
A.hb.prototype={}
A.c1.prototype={
gj(a){var s={},r=new A.W($.V,t.hy)
s.a=0
this.bL(new A.mx(s,this),!0,new A.my(s,r),r.gd7())
return r},
gD(a){var s=new A.W($.V,A.C(this).i("W<1>")),r=this.bL(null,!0,new A.mv(s),s.gd7())
r.cE(new A.mw(this,r,s))
return s}}
A.mx.prototype={
$1(a){A.C(this.b).c.a(a);++this.a.a},
$S(){return A.C(this.b).i("~(1)")}}
A.my.prototype={
$0(){this.b.c2(this.a.a)},
$S:2}
A.mv.prototype={
$0(){var s,r=A.oM(),q=new A.br("No element")
A.oK(q,r)
s=A.qN(q,r)
s=new A.aB(q,r)
this.a.aD(s)},
$S:2}
A.mw.prototype={
$1(a){A.uH(this.b,this.c,A.C(this.a).c.a(a))},
$S(){return A.C(this.a).i("~(1)")}}
A.ef.prototype={
gL(a){return(A.e0(this.a)^892482866)>>>0},
a0(a,b){if(b==null)return!1
if(this===b)return!0
return b instanceof A.bv&&b.a===this.a}}
A.eg.prototype={
dg(){return this.w.fq(this)},
cc(){A.C(this.w).i("bs<1>").a(this)},
cd(){A.C(this.w).i("bs<1>").a(this)}}
A.dd.prototype={
cE(a){var s=A.C(this)
this.a=A.qa(this.d,s.i("~(1)?").a(a),s.c)},
a3(a){var s,r=this,q=r.e&=4294967279
if((q&8)===0){q=r.e=q|8
if((q&128)!==0){s=r.r
if(s.a===1)s.a=3}if((q&64)===0)r.r=null
r.f=r.dg()}q=$.oi()
return q},
cc(){},
cd(){},
dg(){return null},
eZ(a){var s,r,q=this,p=q.r
if(p==null)p=q.r=new A.hM(A.C(q).i("hM<1>"))
s=p.c
if(s==null)p.b=p.c=a
else p.c=s.a=a
r=q.e
if((r&128)===0){r|=128
q.e=r
if(r<256)p.cS(q)}},
cj(a){var s,r=this,q=A.C(r).c
q.a(a)
s=r.e
r.e=s|64
r.d.ea(r.a,a,q)
r.e&=4294967231
r.f2((s&4)!==0)},
f2(a){var s,r,q=this,p=q.e
if((p&128)!==0&&q.r.c==null){p=q.e=p&4294967167
s=!1
if((p&4)!==0)if(p<256){s=q.r
s=s==null?null:s.c==null
s=s!==!1}if(s){p&=4294967291
q.e=p}}for(;;a=r){if((p&8)!==0){q.r=null
return}r=(p&4)!==0
if(a===r)break
q.e=p^64
if(r)q.cc()
else q.cd()
p=q.e&=4294967231}if((p&128)!==0&&p<256)q.r.cS(q)},
$ibs:1,
$ic6:1}
A.dh.prototype={
bL(a,b,c,d){var s=this.$ti
s.i("~(1)?").a(a)
t.jE.a(c)
return this.a.fJ(s.i("~(1)?").a(a),d,c,b===!0)},
dT(a){return this.bL(a,null,null,null)}}
A.ei.prototype={}
A.eh.prototype={}
A.hM.prototype={
cS(a){var s,r=this
r.$ti.i("c6<1>").a(a)
s=r.a
if(s===1)return
if(s>=1){r.a=1
return}A.rc(new A.nk(r,a))
r.a=1}}
A.nk.prototype={
$0(){var s,r,q,p=this.a,o=p.a
p.a=0
if(o===3)return
s=p.$ti.i("c6<1>").a(this.b)
r=p.b
q=r.a
p.b=q
if(q==null)p.c=null
A.C(r).i("c6<1>").a(s).cj(r.b)},
$S:2}
A.de.prototype={
cE(a){this.$ti.i("~(1)?").a(a)},
a3(a){this.a=-1
this.c=null
return $.oi()},
fn(){var s,r=this,q=r.a-1
if(q===0){r.a=-1
s=r.c
if(s!=null){r.c=null
r.b.e9(s)}}else r.a=q},
$ibs:1}
A.hX.prototype={}
A.nP.prototype={
$0(){return this.a.c2(this.b)},
$S:2}
A.eL.prototype={$iq8:1}
A.hP.prototype={
e9(a){var s,r,q
t.M.a(a)
try{if(B.h===$.V){a.$0()
return}A.qU(null,null,this,a,t.H)}catch(q){s=A.as(q)
r=A.cJ(q)
A.il(A.aY(s),t.l.a(r))}},
ea(a,b,c){var s,r,q
c.i("~(0)").a(a)
c.a(b)
try{if(B.h===$.V){a.$1(b)
return}A.qV(null,null,this,a,b,t.H,c)}catch(q){s=A.as(q)
r=A.cJ(q)
A.il(A.aY(s),t.l.a(r))}},
cp(a){return new A.nm(this,t.M.a(a))},
dG(a,b){return new A.nn(this,b.i("~(0)").a(a),b)},
h(a,b){return null},
e8(a,b){b.i("0()").a(a)
if($.V===B.h)return a.$0()
return A.qU(null,null,this,a,b)},
cJ(a,b,c,d){c.i("@<0>").K(d).i("1(2)").a(a)
d.a(b)
if($.V===B.h)return a.$1(b)
return A.qV(null,null,this,a,b,c,d)},
hJ(a,b,c,d,e,f){d.i("@<0>").K(e).K(f).i("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.V===B.h)return a.$2(b,c)
return A.vh(null,null,this,a,b,c,d,e,f)},
cH(a,b,c,d){return b.i("@<0>").K(c).K(d).i("1(2,3)").a(a)}}
A.nm.prototype={
$0(){return this.a.e9(this.b)},
$S:2}
A.nn.prototype={
$1(a){var s=this.c
return this.a.ea(this.b,s.a(a),s)},
$S(){return this.c.i("~(0)")}}
A.nW.prototype={
$0(){A.tn(this.a,this.b)},
$S:2}
A.el.prototype={
gj(a){return this.a},
gE(a){return this.a===0},
gT(a){return this.a!==0},
gJ(a){return new A.em(this,this.$ti.i("em<1>"))},
N(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
return s==null?!1:s[b]!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
return r==null?!1:r[b]!=null}else return this.f9(b)},
f9(a){var s=this.d
if(s==null)return!1
return this.ao(this.d9(s,a),a)>=0},
h(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.oQ(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.oQ(q,b)
return r}else return this.fd(0,b)},
fd(a,b){var s,r,q=this.d
if(q==null)return null
s=this.d9(q,b)
r=this.ao(s,b)
return r<0?null:s[r+1]},
k(a,b,c){var s,r,q,p,o,n=this,m=n.$ti
m.c.a(b)
m.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=n.b
n.f4(s==null?n.b=A.qc():s,b,c)}else{r=n.d
if(r==null)r=n.d=A.qc()
q=A.is(b)&1073741823
p=r[q]
if(p==null){A.oR(r,q,[b,c]);++n.a
n.e=null}else{o=n.ao(p,b)
if(o>=0)p[o+1]=c
else{p.push(b,c);++n.a
n.e=null}}}},
C(a,b){var s
if(b!=="__proto__")return this.bs(this.b,b)
else{s=this.cf(0,b)
return s}},
cf(a,b){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=A.is(b)&1073741823
r=n[s]
q=o.ao(r,b)
if(q<0)return null;--o.a
o.e=null
p=r.splice(q,2)[1]
if(0===r.length)delete n[s]
return p},
q(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.i("~(1,2)").a(b)
s=m.d8()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.h(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.b(A.aa(m))}},
d8(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.dT(i.a,null,!1,t.z)
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
f4(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.oR(a,b,c)},
bs(a,b){var s
if(a!=null&&a[b]!=null){s=this.$ti.y[1].a(A.oQ(a,b))
delete a[b];--this.a
this.e=null
return s}else return null},
d9(a,b){return a[A.is(b)&1073741823]}}
A.cB.prototype={
ao(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.em.prototype={
gj(a){return this.a.a},
gE(a){return this.a.a===0},
gT(a){return this.a.a!==0},
gB(a){var s=this.a
return new A.en(s,s.d8(),this.$ti.i("en<1>"))},
v(a,b){return this.a.N(0,b)}}
A.en.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.b(A.aa(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iae:1}
A.cC.prototype={
gB(a){var s=this,r=new A.cD(s,s.r,A.C(s).i("cD<1>"))
r.c=s.e
return r},
gj(a){return this.a},
gE(a){return this.a===0},
gT(a){return this.a!==0},
v(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.k.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.k.a(r[b])!=null}else return this.f8(b)},
f8(a){var s=this.d
if(s==null)return!1
return this.ao(s[this.c4(a)],a)>=0},
m(a,b){var s,r,q=this
A.C(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.d4(s==null?q.b=A.oS():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.d4(r==null?q.c=A.oS():r,b)}else return q.eV(0,b)},
eV(a,b){var s,r,q,p=this
A.C(p).c.a(b)
s=p.d
if(s==null)s=p.d=A.oS()
r=p.c4(b)
q=s[r]
if(q==null)s[r]=[p.c1(b)]
else{if(p.ao(q,b)>=0)return!1
q.push(p.c1(b))}return!0},
C(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bs(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bs(s.c,b)
else return s.cf(0,b)},
cf(a,b){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.c4(b)
r=n[s]
q=o.ao(r,b)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.d6(p)
return!0},
d4(a,b){A.C(this).c.a(b)
if(t.k.a(a[b])!=null)return!1
a[b]=this.c1(b)
return!0},
bs(a,b){var s
if(a==null)return!1
s=t.k.a(a[b])
if(s==null)return!1
this.d6(s)
delete a[b]
return!0},
d5(){this.r=this.r+1&1073741823},
c1(a){var s,r=this,q=new A.hC(A.C(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.d5()
return q},
d6(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.d5()},
c4(a){return J.cM(a)&1073741823},
ao(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.i(a[r].a,b))return r
return-1}}
A.hC.prototype={}
A.cD.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.b(A.aa(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.i("1?").a(r.a)
s.c=r.b
return!0}},
$iae:1}
A.ea.prototype={
gj(a){return this.a.length},
h(a,b){var s
A.L(b)
s=this.a
if(!(b>=0&&b<s.length))return A.d(s,b)
return s[b]}}
A.m7.prototype={
$2(a,b){this.a.k(0,this.b.a(a),this.c.a(b))},
$S:28}
A.m.prototype={
gB(a){return new A.bi(a,this.gj(a),A.az(a).i("bi<m.E>"))},
u(a,b){return this.h(a,b)},
q(a,b){var s,r
A.az(a).i("~(m.E)").a(b)
s=this.gj(a)
for(r=0;r<s;++r){b.$1(this.h(a,r))
if(s!==this.gj(a))throw A.b(A.aa(a))}},
gE(a){return this.gj(a)===0},
gT(a){return!this.gE(a)},
gD(a){if(this.gj(a)===0)throw A.b(A.dJ())
return this.h(a,0)},
v(a,b){var s,r=this.gj(a)
for(s=0;s<r;++s){if(J.i(this.h(a,s),b))return!0
if(r!==this.gj(a))throw A.b(A.aa(a))}return!1},
ei(a,b){return new A.cx(a,b.i("cx<0>"))},
av(a,b,c){var s=A.az(a)
return new A.a1(a,s.K(c).i("1(m.E)").a(b),s.i("@<m.E>").K(c).i("a1<1,2>"))},
aJ(a,b){var s,r,q,p,o=this
if(o.gE(a)){s=J.oB(0,A.az(a).i("m.E"))
return s}r=o.h(a,0)
q=A.dT(o.gj(a),r,!0,A.az(a).i("m.E"))
for(p=1;p<o.gj(a);++p)B.b.k(q,p,o.h(a,p))
return q},
az(a){return this.aJ(a,!0)},
ha(a,b,c,d){var s
A.az(a).i("m.E?").a(d)
A.cu(b,c,this.gj(a))
for(s=b;s<c;++s)this.k(a,s,d)},
bX(a,b,c,d,e){var s,r,q
A.az(a).i("h<m.E>").a(d)
A.cu(b,c,this.gj(a))
s=c-b
if(s===0)return
A.d5(e,"skipCount")
r=J.y(d)
if(e+s>r.gj(d))throw A.b(A.O("Too few elements"))
if(e<b)for(q=s-1;q>=0;--q)this.k(a,b+q,r.h(d,e+q))
else for(q=0;q<s;++q)this.k(a,b+q,r.h(d,e+q))},
l(a){return A.oA(a,"[","]")},
$in:1,
$ih:1,
$ip:1}
A.G.prototype={
q(a,b){var s,r,q,p=A.az(a)
p.i("~(G.K,G.V)").a(b)
for(s=J.aH(this.gJ(a)),p=p.i("G.V");s.p();){r=s.gt(s)
q=this.h(a,r)
b.$2(r,q==null?p.a(q):q)}},
gaF(a){return J.ce(this.gJ(a),new A.m8(a),A.az(a).i("au<G.K,G.V>"))},
N(a,b){return J.oo(this.gJ(a),b)},
gj(a){return J.ao(this.gJ(a))},
gE(a){return J.ix(this.gJ(a))},
gT(a){return J.or(this.gJ(a))},
l(a){return A.oG(a)},
$it:1}
A.m8.prototype={
$1(a){var s=this.a,r=A.az(s)
r.i("G.K").a(a)
s=J.j(s,a)
if(s==null)s=r.i("G.V").a(s)
return new A.au(a,s,r.i("au<G.K,G.V>"))},
$S(){return A.az(this.a).i("au<G.K,G.V>(G.K)")}}
A.m9.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.e(a)
r.a=(r.a+=s)+": "
s=A.e(b)
r.a+=s},
$S:29}
A.db.prototype={}
A.aG.prototype={
k(a,b,c){var s=A.C(this)
s.i("aG.K").a(b)
s.i("aG.V").a(c)
throw A.b(A.U("Cannot modify unmodifiable map"))},
C(a,b){throw A.b(A.U("Cannot modify unmodifiable map"))}}
A.d_.prototype={
h(a,b){return J.j(this.a,b)},
k(a,b,c){var s=A.C(this)
J.an(this.a,s.c.a(b),s.y[1].a(c))},
N(a,b){return J.op(this.a,b)},
q(a,b){J.eR(this.a,A.C(this).i("~(1,2)").a(b))},
gE(a){return J.ix(this.a)},
gT(a){return J.or(this.a)},
gj(a){return J.ao(this.a)},
gJ(a){return J.rT(this.a)},
C(a,b){return J.t2(this.a,b)},
l(a){return J.M(this.a)},
gaF(a){return J.rS(this.a)},
$it:1}
A.c4.prototype={}
A.ax.prototype={
gE(a){return this.gj(this)===0},
gT(a){return this.gj(this)!==0},
R(a,b){var s
for(s=J.aH(A.C(this).i("h<ax.E>").a(b));s.p();)this.m(0,s.gt(s))},
bN(a){var s
for(s=0;s<5;++s)this.C(0,a[s])},
av(a,b,c){var s=A.C(this)
return new A.bA(this,s.K(c).i("1(ax.E)").a(b),s.i("@<ax.E>").K(c).i("bA<1,2>"))},
l(a){return A.oA(this,"{","}")},
a_(a,b){var s,r,q,p,o=this.gB(this)
if(!o.p())return""
s=o.d
r=J.M(s==null?o.$ti.c.a(s):s)
if(!o.p())return r
s=o.$ti.c
if(b.length===0){q=r
do{p=o.d
q+=A.e(p==null?s.a(p):p)}while(o.p())
s=q}else{q=r
do{p=o.d
q=q+b+A.e(p==null?s.a(p):p)}while(o.p())
s=q}return s.charCodeAt(0)==0?s:s},
u(a,b){var s,r,q
A.d5(b,"index")
s=this.gB(this)
for(r=b;s.p();){if(r===0){q=s.d
return q==null?s.$ti.c.a(q):q}--r}throw A.b(A.ab(b,b-r,this,null,"index"))},
$in:1,
$ih:1,
$iba:1}
A.ev.prototype={}
A.dk.prototype={}
A.hy.prototype={
h(a,b){var s,r=this.b
if(r==null)return this.c.h(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.fo(b):s}},
gj(a){return this.b==null?this.c.a:this.b4().length},
gE(a){return this.gj(0)===0},
gT(a){return this.gj(0)>0},
gJ(a){var s
if(this.b==null){s=this.c
return new A.cr(s,A.C(s).i("cr<1>"))}return new A.hz(this)},
k(a,b,c){var s,r,q=this
if(q.b==null)q.c.k(0,b,c)
else if(q.N(0,b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.dz().k(0,b,c)},
N(a,b){if(this.b==null)return this.c.N(0,b)
return Object.prototype.hasOwnProperty.call(this.a,b)},
C(a,b){if(this.b!=null&&!this.N(0,b))return null
return this.dz().C(0,b)},
q(a,b){var s,r,q,p,o=this
t.v.a(b)
if(o.b==null)return o.c.q(0,b)
s=o.b4()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.nQ(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.b(A.aa(o))}},
b4(){var s=t.lH.a(this.c)
if(s==null)s=this.c=A.B(Object.keys(this.a),t.s)
return s},
dz(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.ai(t.N,t.z)
r=n.b4()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.k(0,o,n.h(0,o))}if(p===0)B.b.m(r,"")
else B.b.X(r)
n.a=n.b=null
return n.c=s},
fo(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.nQ(this.a[a])
return this.b[a]=s}}
A.hz.prototype={
gj(a){return this.a.gj(0)},
u(a,b){var s=this.a
if(s.b==null)s=s.gJ(0).u(0,b)
else{s=s.b4()
if(!(b>=0&&b<s.length))return A.d(s,b)
s=s[b]}return s},
gB(a){var s=this.a
if(s.b==null){s=s.gJ(0)
s=s.gB(s)}else{s=s.b4()
s=new J.be(s,s.length,A.E(s).i("be<1>"))}return s},
v(a,b){return this.a.N(0,b)}}
A.nG.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:30}
A.nF.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:30}
A.dw.prototype={
dX(a3,a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a1="Invalid base64 encoding length ",a2=a4.length
a6=A.cu(a5,a6,a2)
s=$.pi()
for(r=s.length,q=a5,p=q,o=null,n=-1,m=-1,l=0;q<a6;q=k){k=q+1
if(!(q<a2))return A.d(a4,q)
j=a4.charCodeAt(q)
if(j===37){i=k+2
if(i<=a6){if(!(k<a2))return A.d(a4,k)
h=A.o2(a4.charCodeAt(k))
g=k+1
if(!(g<a2))return A.d(a4,g)
f=A.o2(a4.charCodeAt(g))
e=h*16+f-(f&256)
if(e===37)e=-1
k=i}else e=-1}else e=j
if(0<=e&&e<=127){if(!(e>=0&&e<r))return A.d(s,e)
d=s[e]
if(d>=0){if(!(d<64))return A.d(a0,d)
e=a0.charCodeAt(d)
if(e===j)continue
j=e}else{if(d===-1){if(n<0){g=o==null?null:o.a.length
if(g==null)g=0
n=g+(q-p)
m=q}++l
if(j===61)continue}j=e}if(d!==-2){if(o==null){o=new A.av("")
g=o}else g=o
g.a+=B.a.n(a4,p,q)
c=A.a9(j)
g.a+=c
p=k
continue}}throw A.b(A.a2("Invalid base64 data",a4,q))}if(o!=null){a2=B.a.n(a4,p,a6)
a2=o.a+=a2
r=a2.length
if(n>=0)A.pq(a4,m,a6,n,l,r)
else{b=B.e.aZ(r-1,4)+1
if(b===1)throw A.b(A.a2(a1,a4,a6))
while(b<4){a2+="="
o.a=a2;++b}}a2=o.a
return B.a.aH(a4,a5,a6,a2.charCodeAt(0)==0?a2:a2)}a=a6-a5
if(n>=0)A.pq(a4,m,a6,n,l,a)
else{b=B.e.aZ(a,4)
if(b===1)throw A.b(A.a2(a1,a4,a6))
if(b>1)a4=B.a.aH(a4,a6,a6,b===2?"==":"=")}return a4},
dW(a,b){return this.dX(0,b,0,null)}}
A.f_.prototype={}
A.kO.prototype={
aE(a){var s,r,q,p=A.cu(0,null,a.length)
if(0===p)return new Uint8Array(0)
s=new A.mV()
r=s.h3(0,a,0,p)
r.toString
q=s.a
if(q<-1)A.cc(A.a2("Missing padding character",a,p))
if(q>0)A.cc(A.a2("Invalid length, must be multiple of four",a,p))
s.a=-1
return r}}
A.mV.prototype={
h3(a,b,c,d){var s,r=this,q=r.a
if(q<0){r.a=A.q9(b,c,d,q)
return null}if(c===d)return new Uint8Array(0)
s=A.tU(b,c,d,q)
r.a=A.tW(b,c,d,s,0,r.a)
return s}}
A.cg.prototype={}
A.f4.prototype={}
A.fd.prototype={}
A.dN.prototype={
l(a){var s=A.bB(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.fo.prototype={
l(a){return"Cyclic error in JSON stringify"}}
A.fn.prototype={
I(a,b){var s=A.ve(b,this.gh5().a)
return s},
V(a){var s=A.u4(a,this.gh8().b,null)
return s},
gh8(){return B.ak},
gh5(){return B.aj}}
A.m5.prototype={}
A.m4.prototype={}
A.nh.prototype={
ek(a){var s,r,q,p,o,n,m=a.length
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
c0(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.b(new A.fo(a,null))}B.b.m(s,a)},
bU(a){var s,r,q,p,o=this
if(o.ej(a))return
o.c0(a)
try{s=o.b.$1(a)
if(!o.ej(s)){q=A.pJ(a,null,o.gdh())
throw A.b(q)}q=o.a
if(0>=q.length)return A.d(q,-1)
q.pop()}catch(p){r=A.as(p)
q=A.pJ(a,r,o.gdh())
throw A.b(q)}},
ej(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.d.l(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.ek(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.c0(a)
q.hP(a)
s=q.a
if(0>=s.length)return A.d(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.c0(a)
r=q.hQ(a)
s=q.a
if(0>=s.length)return A.d(s,-1)
s.pop()
return r}else return!1},
hP(a){var s,r,q=this.c
q.a+="["
s=J.y(a)
if(s.gT(a)){this.bU(s.h(a,0))
for(r=1;r<s.gj(a);++r){q.a+=","
this.bU(s.h(a,r))}}q.a+="]"},
hQ(a){var s,r,q,p,o,n=this,m={},l=J.y(a)
if(l.gE(a)){n.c.a+="{}"
return!0}s=l.gj(a)*2
r=A.dT(s,null,!1,t.X)
q=m.a=0
m.b=!0
l.q(a,new A.ni(m,r))
if(!m.b)return!1
l=n.c
l.a+="{"
for(p='"';q<s;q+=2,p=',"'){l.a+=p
n.ek(A.x(r[q]))
l.a+='":'
o=q+1
if(!(o<s))return A.d(r,o)
n.bU(r[o])}l.a+="}"
return!0}}
A.ni.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.b.k(s,r.a++,a)
B.b.k(s,r.a++,b)},
$S:29}
A.ng.prototype={
gdh(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.h7.prototype={
I(a,b){t.f4.a(b)
return B.aH.aE(b)}}
A.mL.prototype={
aE(a){var s,r,q,p,o=a.length,n=A.cu(0,null,o)
if(n===0)return new Uint8Array(0)
s=n*3
r=new Uint8Array(s)
q=new A.nH(r)
if(q.fc(a,0,n)!==n){p=n-1
if(!(p>=0&&p<o))return A.d(a,p)
q.cn()}return new Uint8Array(r.subarray(0,A.uL(0,q.b,s)))}}
A.nH.prototype={
cn(){var s,r=this,q=r.c,p=r.b,o=r.b=p+1
q.$flags&2&&A.am(q)
s=q.length
if(!(p<s))return A.d(q,p)
q[p]=239
p=r.b=o+1
if(!(o<s))return A.d(q,o)
q[o]=191
r.b=p+1
if(!(p<s))return A.d(q,p)
q[p]=189},
fN(a,b){var s,r,q,p,o,n=this
if((b&64512)===56320){s=65536+((a&1023)<<10)|b&1023
r=n.c
q=n.b
p=n.b=q+1
r.$flags&2&&A.am(r)
o=r.length
if(!(q<o))return A.d(r,q)
r[q]=s>>>18|240
q=n.b=p+1
if(!(p<o))return A.d(r,p)
r[p]=s>>>12&63|128
p=n.b=q+1
if(!(q<o))return A.d(r,q)
r[q]=s>>>6&63|128
n.b=p+1
if(!(p<o))return A.d(r,p)
r[p]=s&63|128
return!0}else{n.cn()
return!1}},
fc(a,b,c){var s,r,q,p,o,n,m,l,k=this
if(b!==c){s=c-1
if(!(s>=0&&s<a.length))return A.d(a,s)
s=(a.charCodeAt(s)&64512)===55296}else s=!1
if(s)--c
for(s=k.c,r=s.$flags|0,q=s.length,p=a.length,o=b;o<c;++o){if(!(o<p))return A.d(a,o)
n=a.charCodeAt(o)
if(n<=127){m=k.b
if(m>=q)break
k.b=m+1
r&2&&A.am(s)
s[m]=n}else{m=n&64512
if(m===55296){if(k.b+4>q)break
m=o+1
if(!(m<p))return A.d(a,m)
if(k.fN(n,a.charCodeAt(m)))o=m}else if(m===56320){if(k.b+3>q)break
k.cn()}else if(n<=2047){m=k.b
l=m+1
if(l>=q)break
k.b=l
r&2&&A.am(s)
if(!(m<q))return A.d(s,m)
s[m]=n>>>6|192
k.b=l+1
s[l]=n&63|128}else{m=k.b
if(m+2>=q)break
l=k.b=m+1
r&2&&A.am(s)
if(!(m<q))return A.d(s,m)
s[m]=n>>>12|224
m=k.b=l+1
if(!(l<q))return A.d(s,l)
s[l]=n>>>6&63|128
k.b=m+1
if(!(m<q))return A.d(s,m)
s[m]=n&63|128}}}return o}}
A.mK.prototype={
aE(a){return new A.nE(this.a).fa(t.f4.a(a),0,null,!0)}}
A.nE.prototype={
fa(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.f4.a(a)
s=A.cu(b,c,J.ao(a))
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.uy(a,b,s)
s-=b
p=b
b=0}if(s-b>=15){o=l.a
n=A.ux(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.c5(q,b,s,!0)
o=l.b
if((o&1)!==0){m=A.uz(o)
l.b=0
throw A.b(A.a2(m,a,p+l.c))}return n},
c5(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.e.ad(b+c,2)
r=q.c5(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.c5(a,s,c,d)}return q.h4(a,b,c,d)},
h4(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.av(""),d=b+1,c=a.length
if(!(b>=0&&b<c))return A.d(a,b)
s=a[b]
A:for(r=k.a;;){for(;;d=o){if(!(s>=0&&s<256))return A.d(j,s)
q=j.charCodeAt(s)&31
f=g<=32?s&61694>>>q:(s&63|f<<6)>>>0
p=g+q
if(!(p>=0&&p<144))return A.d(i,p)
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
if(!(d>=0&&d<c))return A.d(a,d)
s=a[d]}o=d+1
if(!(d>=0&&d<c))return A.d(a,d)
s=a[d]
if(s<128){for(;;){if(!(o<a0)){n=a0
break}m=o+1
if(!(o>=0&&o<c))return A.d(a,o)
s=a[o]
if(s>=128){n=m-1
o=m
break}o=m}if(n-d<20)for(l=d;l<n;++l){if(!(l<c))return A.d(a,l)
p=A.a9(a[l])
e.a+=p}else{p=A.q0(a,d,n)
e.a+=p}if(n===a0)break A
d=o}else d=o}if(a1&&g>32)if(r){c=A.a9(h)
e.a+=c}else{k.b=77
k.c=a0
return""}k.b=g
k.c=f
c=e.a
return c.charCodeAt(0)==0?c:c}}
A.mc.prototype={
$2(a,b){var s,r,q
t.bR.a(a)
s=this.b
r=this.a
q=(s.a+=r.a)+a.a
s.a=q
s.a=q+": "
q=A.bB(b)
s.a+=q
r.a=", "},
$S:47}
A.nD.prototype={
$2(a,b){var s,r
A.x(a)
if(typeof b=="string")this.a.set(a,b)
else if(b==null)this.a.set(a,"")
else for(s=J.aH(t.R.a(b)),r=this.a;s.p();){b=s.gt(s)
if(typeof b=="string")r.append(a,b)
else if(b==null)r.append(a,"")
else A.al(b)}},
$S:6}
A.lP.prototype={
$0(){var s=this
return A.cc(A.aZ("("+s.a+", "+s.b+", "+s.c+", "+s.d+", "+s.e+", "+s.f+", "+s.r+", "+s.w+")",null))},
$S:48}
A.ad.prototype={
a0(a,b){if(b==null)return!1
return b instanceof A.ad&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gL(a){return A.oH(this.a,this.b,B.t,B.t)},
a1(a,b){var s
t.cs.a(b)
s=B.e.a1(this.a,b.a)
if(s!==0)return s
return B.e.a1(this.b,b.b)},
ab(){var s=this
if(s.c)return s
return new A.ad(s.a,s.b,!0)},
l(a){var s=this,r=A.py(A.d3(s)),q=A.bz(A.mj(s)),p=A.bz(A.pR(s)),o=A.bz(A.oI(s)),n=A.bz(A.oJ(s)),m=A.bz(A.pT(s)),l=A.lQ(A.pS(s)),k=s.b,j=k===0?"":A.lQ(k)
k=r+"-"+q
if(s.c)return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j},
aa(){var s=this,r=A.d3(s)>=-9999&&A.d3(s)<=9999?A.py(A.d3(s)):A.tj(A.d3(s)),q=A.bz(A.mj(s)),p=A.bz(A.pR(s)),o=A.bz(A.oI(s)),n=A.bz(A.oJ(s)),m=A.bz(A.pT(s)),l=A.lQ(A.pS(s)),k=s.b,j=k===0?"":A.lQ(k)
k=r+"-"+q
if(s.c)return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j}}
A.lR.prototype={
$1(a){if(a==null)return 0
return A.eP(a)},
$S:34}
A.lS.prototype={
$1(a){var s,r,q
if(a==null)return 0
for(s=a.length,r=0,q=0;q<6;++q){r*=10
if(q<s){if(!(q<s))return A.d(a,q)
r+=a.charCodeAt(q)^48}}return r},
$S:34}
A.b_.prototype={
aK(a,b){return new A.b_(B.e.aI(this.a*b))},
bn(a,b){return B.e.bn(this.a,t.jS.a(b).ghT())},
a0(a,b){if(b==null)return!1
return b instanceof A.b_&&this.a===b.a},
gL(a){return B.e.gL(this.a)},
l(a){var s,r,q,p,o,n=this.a,m=B.e.ad(n,36e8),l=n%36e8
if(n<0){m=0-m
n=0-l
s="-"}else{n=l
s=""}r=B.e.ad(n,6e7)
n%=6e7
q=r<10?"0":""
p=B.e.ad(n,1e6)
o=p<10?"0":""
return s+m+":"+q+r+":"+o+p+"."+B.a.bh(B.e.l(n%1e6),6,"0")}}
A.a0.prototype={
gb0(){return A.tD(this)}}
A.eU.prototype={
l(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.bB(s)
return"Assertion failed"}}
A.bH.prototype={}
A.b8.prototype={
gc7(){return"Invalid argument"+(!this.a?"(s)":"")},
gc6(){return""},
l(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.e(p),n=s.gc7()+q+o
if(!s.a)return n
return n+s.gc6()+": "+A.bB(s.gcC())},
gcC(){return this.b}}
A.d4.prototype={
gcC(){return A.nM(this.b)},
gc7(){return"RangeError"},
gc6(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.e(q):""
else if(q==null)s=": Not greater than or equal to "+A.e(r)
else if(q>r)s=": Not in inclusive range "+A.e(r)+".."+A.e(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.e(r)
return s}}
A.fh.prototype={
gcC(){return A.L(this.b)},
gc7(){return"RangeError"},
gc6(){if(A.L(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gj(a){return this.f}}
A.fD.prototype={
l(a){var s,r,q,p,o,n,m,l,k=this,j={},i=new A.av("")
j.a=""
s=k.c
for(r=s.length,q=0,p="",o="";q<r;++q,o=", "){n=s[q]
i.a=p+o
p=A.bB(n)
p=i.a+=p
j.a=", "}k.d.q(0,new A.mc(j,i))
m=A.bB(k.a)
l=i.l(0)
return"NoSuchMethodError: method not found: '"+k.b.a+"'\nReceiver: "+m+"\nArguments: ["+l+"]"}}
A.eb.prototype={
l(a){return"Unsupported operation: "+this.a}}
A.h0.prototype={
l(a){var s=this.a
return s!=null?"UnimplementedError: "+s:"UnimplementedError"}}
A.br.prototype={
l(a){return"Bad state: "+this.a}}
A.f3.prototype={
l(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.bB(s)+"."}}
A.fG.prototype={
l(a){return"Out of Memory"},
gb0(){return null},
$ia0:1}
A.e5.prototype={
l(a){return"Stack Overflow"},
gb0(){return null},
$ia0:1}
A.n_.prototype={
l(a){return"Exception: "+this.a}}
A.bg.prototype={
l(a){var s,r,q,p,o,n,m,l,k,j,i,h=this.a,g=""!==h?"FormatException: "+h:"FormatException",f=this.c,e=this.b
if(typeof e=="string"){if(f!=null)s=f<0||f>e.length
else s=!1
if(s)f=null
if(f==null){if(e.length>78)e=B.a.n(e,0,75)+"..."
return g+"\n"+e}for(r=e.length,q=1,p=0,o=!1,n=0;n<f;++n){if(!(n<r))return A.d(e,n)
m=e.charCodeAt(n)
if(m===10){if(p!==n||!o)++q
p=n+1
o=!1}else if(m===13){++q
p=n+1
o=!0}}g=q>1?g+(" (at line "+q+", character "+(f-p+1)+")\n"):g+(" (at character "+(f+1)+")\n")
for(n=f;n<r;++n){if(!(n>=0))return A.d(e,n)
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
k=""}return g+l+B.a.n(e,i,j)+k+"\n"+B.a.aK(" ",f-i+l.length)+"^\n"}else return f!=null?g+(" (at offset "+A.e(f)+")"):g}}
A.h.prototype={
av(a,b,c){var s=A.C(this)
return A.tw(this,s.K(c).i("1(h.E)").a(b),s.i("h.E"),c)},
bT(a,b){var s=A.C(this)
return new A.I(this,s.i("F(h.E)").a(b),s.i("I<h.E>"))},
v(a,b){var s
for(s=this.gB(this);s.p();)if(J.i(s.gt(s),b))return!0
return!1},
ct(a,b,c,d){var s,r
d.a(b)
A.C(this).K(d).i("1(1,h.E)").a(c)
for(s=this.gB(this),r=b;s.p();)r=c.$2(r,s.gt(s))
return r},
a6(a,b){var s
A.C(this).i("F(h.E)").a(b)
for(s=this.gB(this);s.p();)if(b.$1(s.gt(s)))return!0
return!1},
aJ(a,b){var s=A.a3(this,A.C(this).i("h.E"))
return s},
az(a){return this.aJ(0,!0)},
gj(a){var s,r=this.gB(this)
for(s=0;r.p();)++s
return s},
gE(a){return!this.gB(this).p()},
gT(a){return!this.gE(this)},
gaL(a){var s,r=this.gB(this)
if(!r.p())throw A.b(A.dJ())
s=r.gt(r)
if(r.p())throw A.b(A.to())
return s},
u(a,b){var s,r
A.d5(b,"index")
s=this.gB(this)
for(r=b;s.p();){if(r===0)return s.gt(s);--r}throw A.b(A.ab(b,b-r,this,null,"index"))},
l(a){return A.tp(this,"(",")")}}
A.au.prototype={
l(a){return"MapEntry("+A.e(this.a)+": "+A.e(this.b)+")"}}
A.a8.prototype={
gL(a){return A.H.prototype.gL.call(this,0)},
l(a){return"null"}}
A.H.prototype={$iH:1,
a0(a,b){return this===b},
gL(a){return A.e0(this)},
l(a){return"Instance of '"+A.e1(this)+"'"},
dV(a,b){throw A.b(A.pP(this,t.bg.a(b)))},
gW(a){return A.vG(this)},
toString(){return this.l(this)}}
A.i_.prototype={
l(a){return""},
$ibm:1}
A.av.prototype={
gj(a){return this.a.length},
l(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$itK:1}
A.mJ.prototype={
$2(a,b){var s,r,q,p
t.I.a(a)
A.x(b)
s=B.a.dO(b,"=")
if(s===-1){if(b!=="")J.an(a,A.oZ(b,0,b.length,this.a,!0),"")}else if(s!==0){r=B.a.n(b,0,s)
q=B.a.Z(b,s+1)
p=this.a
J.an(a,A.oZ(r,0,r.length,p,!0),A.oZ(q,0,q.length,p,!0))}return a},
$S:69}
A.mI.prototype={
$2(a,b){throw A.b(A.a2("Illegal IPv6 address, "+a,this.a,b))},
$S:70}
A.eH.prototype={
gdq(){var s,r,q,p,o=this,n=o.w
if(n===$){s=o.a
r=s.length!==0?s+":":""
q=o.c
p=q==null
if(!p||s==="file"){s=r+"//"
r=o.b
if(r.length!==0)s=s+r+"@"
if(!p)s+=q
r=o.d
if(r!=null)s=s+":"+A.e(r)}else s=r
s+=o.e
r=o.f
if(r!=null)s=s+"?"+r
r=o.r
if(r!=null)s=s+"#"+r
n=o.w=s.charCodeAt(0)==0?s:s}return n},
gL(a){var s,r=this,q=r.y
if(q===$){s=B.a.gL(r.gdq())
r.y!==$&&A.re()
r.y=s
q=s}return q},
gal(){var s,r=this,q=r.z
if(q===$){s=r.f
s=A.q7(s==null?"":s)
r.z!==$&&A.re()
q=r.z=new A.c4(s,t.ph)}return q},
gcL(){return this.b},
gbI(a){var s=this.c
if(s==null)return""
if(B.a.O(s,"[")&&!B.a.S(s,"v",1))return B.a.n(s,1,s.length-1)
return s},
gbi(a){var s=this.d
return s==null?A.qr(this.a):s},
gaV(a){var s=this.f
return s==null?"":s},
gbG(){var s=this.r
return s==null?"":s},
hn(a){var s=this.a
if(a.length!==s.length)return!1
return A.uI(a,s,0)>=0},
e5(a,b){var s,r,q,p,o,n,m,l=this
b=A.oW(b,0,b.length)
s=b==="file"
r=l.b
q=l.d
if(b!==l.a)q=A.nA(q,b)
p=l.c
if(!(p!=null))p=r.length!==0||q!=null||s?"":null
o=l.e
if(!s)n=p!=null&&o.length!==0
else n=!0
if(n&&!B.a.O(o,"/"))o="/"+o
m=o
return A.eI(b,r,p,q,m,l.f,l.r)},
df(a,b){var s,r,q,p,o,n,m,l,k
for(s=0,r=0;B.a.S(b,"../",r);){r+=3;++s}q=B.a.hp(a,"/")
p=a.length
for(;;){if(!(q>0&&s>0))break
o=B.a.dS(a,"/",q-1)
if(o<0)break
n=q-o
m=n!==2
l=!1
if(!m||n===3){k=o+1
if(!(k<p))return A.d(a,k)
if(a.charCodeAt(k)===46)if(m){m=o+2
if(!(m<p))return A.d(a,m)
m=a.charCodeAt(m)===46}else m=!0
else m=l}else m=l
if(m)break;--s
q=o}return B.a.aH(a,q+1,null,B.a.Z(b,r-3*s))},
e7(a){return this.bk(A.cw(a))},
bk(a){var s,r,q,p,o,n,m,l,k,j,i,h=this
if(a.gb_().length!==0)return a
else{s=h.a
if(a.gcv()){r=a.e5(0,s)
return r}else{q=h.b
p=h.c
o=h.d
n=h.e
if(a.gdN())m=a.gbH()?a.gaV(a):h.f
else{l=A.uw(h,n)
if(l>0){k=B.a.n(n,0,l)
n=a.gcu()?k+A.cF(a.gag(a)):k+A.cF(h.df(B.a.Z(n,k.length),a.gag(a)))}else if(a.gcu())n=A.cF(a.gag(a))
else if(n.length===0)if(p==null)n=s.length===0?a.gag(a):A.cF(a.gag(a))
else n=A.cF("/"+a.gag(a))
else{j=h.df(n,a.gag(a))
r=s.length===0
if(!r||p!=null||B.a.O(n,"/"))n=A.cF(j)
else n=A.oY(j,!r||p!=null)}m=a.gbH()?a.gaV(a):null}}}i=a.gcz()?a.gbG():null
return A.eI(s,q,p,o,n,m,i)},
gcv(){return this.c!=null},
gbH(){return this.f!=null},
gcz(){return this.r!=null},
gdN(){return this.e.length===0},
gcu(){return B.a.O(this.e,"/")},
gcG(a){var s,r,q=this,p=q.a
if(p==="")throw A.b(A.O("Cannot use origin without a scheme: "+q.l(0)))
if(p!=="http"&&p!=="https")throw A.b(A.O("Origin is only applicable schemes http and https: "+q.l(0)))
s=q.c
if(s==null||s==="")throw A.b(A.O("A "+p+u.p+q.l(0)))
r=q.d
if(r==null)return p+"://"+s
return p+"://"+s+":"+A.e(r)},
l(a){return this.gdq()},
a0(a,b){var s,r,q,p=this
if(b==null)return!1
if(p===b)return!0
s=!1
if(t.jJ.b(b))if(p.a===b.gb_())if(p.c!=null===b.gcv())if(p.b===b.gcL())if(p.gbI(0)===b.gbI(b))if(p.gbi(0)===b.gbi(b))if(p.e===b.gag(b)){r=p.f
q=r==null
if(!q===b.gbH()){if(q)r=""
if(r===b.gaV(b)){r=p.r
q=r==null
if(!q===b.gcz()){s=q?"":r
s=s===b.gbG()}}}}return s},
$ih3:1,
gb_(){return this.a},
gag(a){return this.e}}
A.nC.prototype={
$2(a,b){var s=this.b,r=this.a
s.a+=r.a
r.a="&"
r=A.qC(1,a,B.m,!0)
r=s.a+=r
if(b!=null&&b.length!==0){s.a=r+"="
r=A.qC(1,b,B.m,!0)
s.a+=r}},
$S:71}
A.nB.prototype={
$2(a,b){var s,r
A.x(a)
if(b==null||typeof b=="string")this.a.$2(a,A.al(b))
else for(s=J.aH(t.R.a(b)),r=this.a;s.p();)r.$2(a,A.x(s.gt(s)))},
$S:6}
A.mH.prototype={
geh(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.d(m,0)
s=o.a
m=m[0]+1
r=B.a.bJ(s,"?",m)
q=s.length
if(r>=0){p=A.eJ(s,r+1,q,256,!1,!1)
q=r}else p=n
m=o.c=new A.hk("data","",n,n,A.eJ(s,m,q,128,!1,!1),p,n)}return m},
l(a){var s,r=this.b
if(0>=r.length)return A.d(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.bb.prototype={
gcv(){return this.c>0},
gcA(){return this.c>0&&this.d+1<this.e},
gbH(){return this.f<this.r},
gcz(){return this.r<this.a.length},
gcu(){return B.a.S(this.a,"/",this.e)},
gdN(){return this.e===this.f},
gb_(){var s=this.w
return s==null?this.w=this.f7():s},
f7(){var s,r=this,q=r.b
if(q<=0)return""
s=q===4
if(s&&B.a.O(r.a,"http"))return"http"
if(q===5&&B.a.O(r.a,"https"))return"https"
if(s&&B.a.O(r.a,"file"))return"file"
if(q===7&&B.a.O(r.a,"package"))return"package"
return B.a.n(r.a,0,q)},
gcL(){var s=this.c,r=this.b+3
return s>r?B.a.n(this.a,r,s-1):""},
gbI(a){var s=this.c
return s>0?B.a.n(this.a,s,this.d):""},
gbi(a){var s,r=this
if(r.gcA())return A.eP(B.a.n(r.a,r.d+1,r.e))
s=r.b
if(s===4&&B.a.O(r.a,"http"))return 80
if(s===5&&B.a.O(r.a,"https"))return 443
return 0},
gag(a){return B.a.n(this.a,this.e,this.f)},
gaV(a){var s=this.f,r=this.r
return s<r?B.a.n(this.a,s+1,r):""},
gbG(){var s=this.r,r=this.a
return s<r.length?B.a.Z(r,s+1):""},
gcG(a){var s,r,q=this,p=q.b,o=p===4&&B.a.O(q.a,"http")
if(p<0)throw A.b(A.O("Cannot use origin without a scheme: "+q.l(0)))
if(!o)s=!(p===5&&B.a.O(q.a,"https"))
else s=!1
if(s)throw A.b(A.O("Origin is only applicable to schemes http and https: "+q.l(0)))
s=q.c
if(s===q.d)throw A.b(A.O("A "+q.gb_()+u.p+q.l(0)))
p+=3
if(s===p)return B.a.n(q.a,0,q.e)
r=q.a
return B.a.n(r,0,p)+B.a.n(r,s,q.e)},
gal(){if(this.f>=this.r)return B.ap
return new A.c4(A.q7(this.gaV(0)),t.ph)},
dc(a){var s=this.d+1
return s+a.length===this.e&&B.a.S(this.a,a,s)},
hD(){var s=this,r=s.r,q=s.a
if(r>=q.length)return s
return new A.bb(B.a.n(q,0,r),s.b,s.c,s.d,s.e,s.f,r,s.w)},
e5(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=null
b=A.oW(b,0,b.length)
s=!(h.b===b.length&&B.a.O(h.a,b))
r=b==="file"
q=h.c
p=q>0?B.a.n(h.a,h.b+3,q):""
o=h.gcA()?h.gbi(0):g
if(s)o=A.nA(o,b)
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
i=m<q.length?B.a.Z(q,m+1):g
return A.eI(b,p,n,o,l,j,i)},
e7(a){return this.bk(A.cw(a))},
bk(a){if(a instanceof A.bb)return this.fH(this,a)
return this.dt().bk(a)},
fH(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=b.b
if(c>0)return b
s=b.c
if(s>0){r=a.b
if(r<=0)return b
q=r===4
if(q&&B.a.O(a.a,"file"))p=b.e!==b.f
else if(q&&B.a.O(a.a,"http"))p=!b.dc("80")
else p=!(r===5&&B.a.O(a.a,"https"))||!b.dc("443")
if(p){o=r+1
return new A.bb(B.a.n(a.a,0,o)+B.a.Z(b.a,c+1),r,s+o,b.d+o,b.e+o,b.f+o,b.r+o,a.w)}else return this.dt().bk(b)}n=b.e
c=b.f
if(n===c){s=b.r
if(c<s){r=a.f
o=r-c
return new A.bb(B.a.n(a.a,0,r)+B.a.Z(b.a,c),a.b,a.c,a.d,a.e,c+o,s+o,a.w)}c=b.a
if(s<c.length){r=a.r
return new A.bb(B.a.n(a.a,0,r)+B.a.Z(c,s),a.b,a.c,a.d,a.e,a.f,s+(r-s),a.w)}return a.hD()}s=b.a
if(B.a.S(s,"/",n)){m=a.e
l=A.qj(this)
k=l>0?l:m
o=k-n
return new A.bb(B.a.n(a.a,0,k)+B.a.Z(s,n),a.b,a.c,a.d,m,c+o,b.r+o,a.w)}j=a.e
i=a.f
if(j===i&&a.c>0){while(B.a.S(s,"../",n))n+=3
o=j-n+1
return new A.bb(B.a.n(a.a,0,j)+"/"+B.a.Z(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)}h=a.a
l=A.qj(this)
if(l>=0)g=l
else for(g=j;B.a.S(h,"../",g);)g+=3
f=0
for(;;){e=n+3
if(!(e<=c&&B.a.S(s,"../",n)))break;++f
n=e}for(r=h.length,d="";i>g;){--i
if(!(i>=0&&i<r))return A.d(h,i)
if(h.charCodeAt(i)===47){if(f===0){d="/"
break}--f
d="/"}}if(i===g&&a.b<=0&&!B.a.S(h,"/",j)){n-=f*3
d=""}o=i-n+d.length
return new A.bb(B.a.n(h,0,i)+d+B.a.Z(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)},
gL(a){var s=this.x
return s==null?this.x=B.a.gL(this.a):s},
a0(a,b){if(b==null)return!1
if(this===b)return!0
return t.jJ.b(b)&&this.a===b.l(0)},
dt(){var s=this,r=null,q=s.gb_(),p=s.gcL(),o=s.c>0?s.gbI(0):r,n=s.gcA()?s.gbi(0):r,m=s.a,l=s.f,k=B.a.n(m,s.e,l),j=s.r
l=l<j?s.gaV(0):r
return A.eI(q,p,o,n,k,l,j<m.length?s.gbG():r)},
l(a){return this.a},
$ih3:1}
A.hk.prototype={}
A.r.prototype={$ir:1}
A.eS.prototype={
gj(a){return a.length}}
A.cN.prototype={
shf(a,b){a.href=b},
l(a){var s=String(a)
s.toString
return s},
$icN:1}
A.eT.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.cO.prototype={$icO:1}
A.bS.prototype={$ibS:1}
A.cf.prototype={$icf:1}
A.bT.prototype={$ibT:1}
A.bq.prototype={
gj(a){return a.length}}
A.f6.prototype={
gj(a){return a.length}}
A.Y.prototype={$iY:1}
A.ch.prototype={
c_(a,b){var s=$.rh(),r=s[b]
if(typeof r=="string")return r
r=this.fK(a,b)
s[b]=r
return r},
fK(a,b){var s,r=b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()})
r.toString
r=r in a
r.toString
if(r)return b
s=$.rk()+b
r=s in a
r.toString
if(r)return s
return b},
ck(a,b,c,d){a.setProperty(b,c,d)},
gj(a){var s=a.length
s.toString
return s}}
A.kS.prototype={}
A.aI.prototype={}
A.bf.prototype={}
A.f7.prototype={
gj(a){return a.length}}
A.f8.prototype={
gj(a){return a.length}}
A.ci.prototype={
gh6(a){var s,r=a._dartDetail
if(r!=null)return r
r=a.detail
s=new A.mO([],[])
s.c=!0
return s.aA(r)},
fe(a,b,c,d,e){return a.initCustomEvent(b,!0,!0,e)},
$ici:1}
A.f9.prototype={
gj(a){return a.length},
h(a,b){var s=a[A.L(b)]
s.toString
return s}}
A.cQ.prototype={$icQ:1}
A.cj.prototype={}
A.fa.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.dA.prototype={
h2(a,b){var s=a.createHTMLDocument(b)
s.toString
return s}}
A.dB.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.mx.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.dC.prototype={
l(a){var s,r=a.left
r.toString
s=a.top
s.toString
return"Rectangle ("+A.e(r)+", "+A.e(s)+") "+A.e(this.gaX(a))+" x "+A.e(this.gaT(a))},
a0(a,b){var s,r,q
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
s=this.gaX(a)===s.gaX(b)&&this.gaT(a)===s.gaT(b)}}}return s},
gL(a){var s,r=a.left
r.toString
s=a.top
s.toString
return A.oH(r,s,this.gaX(a),this.gaT(a))},
gda(a){return a.height},
gaT(a){var s=this.gda(a)
s.toString
return s},
gdA(a){return a.width},
gaX(a){var s=this.gdA(a)
s.toString
return s},
$ibk:1}
A.fb.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){A.x(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.fc.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.he.prototype={
v(a,b){return J.oo(this.b,b)},
gE(a){return this.a.firstElementChild==null},
gj(a){return this.b.length},
h(a,b){var s
A.L(b)
s=this.b
if(!(b>=0&&b<s.length))return A.d(s,b)
return t.h.a(s[b])},
k(a,b,c){var s
t.h.a(c)
s=this.b
if(!(b>=0&&b<s.length))return A.d(s,b)
this.a.replaceChild(c,s[b]).toString},
gB(a){var s=this.az(this)
return new J.be(s,s.length,A.E(s).i("be<1>"))},
X(a){J.iv(this.a)},
gD(a){return A.tZ(this.a)}}
A.bn.prototype={
gj(a){return this.a.length},
h(a,b){var s
A.L(b)
s=this.a
if(!(b>=0&&b<s.length))return A.d(s,b)
return this.$ti.c.a(s[b])},
k(a,b,c){this.$ti.c.a(c)
throw A.b(A.U("Cannot modify list"))},
gD(a){return this.$ti.c.a(B.ar.gD(this.a))}}
A.D.prototype={
gfU(a){return new A.df(a)},
gbC(a){var s=a.children
s.toString
return new A.he(a,s)},
gar(a){return new A.hp(a)},
l(a){var s=a.localName
s.toString
return s},
a7(a,b,c,d){var s,r,q,p
if(c==null){s=$.pC
if(s==null){s=A.B([],t.lN)
r=new A.dZ(s)
B.b.m(s,A.qd(null))
B.b.m(s,A.qm())
$.pC=r
d=r}else d=s
s=$.pB
if(s==null){d.toString
s=new A.eK(d)
$.pB=s
c=s}else{d.toString
s.a=d
c=s}}if($.bV==null){s=document
r=s.implementation
r.toString
r=B.a9.h2(r,"")
$.bV=r
r=r.createRange()
r.toString
$.ow=r
r=$.bV.createElement("base")
t.az.a(r)
s=s.baseURI
s.toString
r.href=s
$.bV.head.appendChild(r).toString}s=$.bV
if(s.body==null){r=s.createElement("body")
B.L.sfW(s,t.hp.a(r))}s=$.bV
if(t.hp.b(a)){s=s.body
s.toString
q=s}else{s.toString
r=a.tagName
r.toString
q=s.createElement(r)
$.bV.body.appendChild(q).toString}s="createContextualFragment" in window.Range.prototype
s.toString
if(s){s=a.tagName
s.toString
s=!B.b.v(B.am,s)}else s=!1
if(s){$.ow.selectNodeContents(q)
s=$.ow
s=s.createContextualFragment(b)
s.toString
p=s}else{J.t5(q,b)
s=$.bV.createDocumentFragment()
s.toString
while(r=q.firstChild,r!=null)s.appendChild(r).toString
p=s}if(q!==$.bV.body)J.iy(q)
c.cR(p)
document.adoptNode(p).toString
return p},
h1(a,b,c){return this.a7(a,b,c,null)},
sU(a,b){this.bW(a,b)},
bW(a,b){this.sG(a,null)
a.appendChild(this.a7(a,b,null,null)).toString},
shL(a,b){a.title=b},
dM(a){return a.focus()},
sfh(a,b){a.innerHTML=b},
fp(a,b){var s=a.querySelectorAll(b)
s.toString
return s},
gdY(a){return new A.aX(a,"change",!1,t.E)},
gaU(a){return new A.aX(a,"click",!1,t.C)},
gdZ(a){return new A.aX(a,"input",!1,t.E)},
ge_(a){return new A.aX(a,"keydown",!1,t.kN)},
$iD:1}
A.lT.prototype={
$1(a){return t.h.b(t.F.a(a))},
$S:24}
A.o.prototype={
geb(a){return A.p_(a.target)},
ff(a,b,c,d){return a.initEvent(b,!0,!0)},
$io:1}
A.dE.prototype={$idE:1}
A.f.prototype={
bA(a,b,c,d){t.B.a(c)
if(c!=null)this.eY(a,b,c,d)},
aP(a,b,c){return this.bA(a,b,c,null)},
eY(a,b,c,d){return a.addEventListener(b,A.bO(t.B.a(c),1),d)},
fs(a,b,c,d){return a.removeEventListener(b,A.bO(t.B.a(c),1),!1)},
$if:1}
A.aM.prototype={$iaM:1}
A.ck.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.dY.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1,
$ick:1}
A.dG.prototype={
ghI(a){var s=a.result
if(t.lo.b(s))return A.pO(s,0,null)
return s},
hA(a,b){return a.readAsDataURL(b)}}
A.fe.prototype={
gj(a){return a.length}}
A.cm.prototype={
gj(a){return a.length},
$icm:1}
A.aN.prototype={$iaN:1}
A.cS.prototype={$icS:1}
A.fg.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.bW.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.F.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1,
$ibW:1}
A.dH.prototype={
sfW(a,b){a.body=b}}
A.bC.prototype={
hw(a,b,c){return a.open(b,c)},
eA(a,b){return a.send(b)},
cT(a,b,c){return a.setRequestHeader(A.x(b),A.x(c))},
$ibC:1}
A.co.prototype={}
A.cT.prototype={$icT:1}
A.dI.prototype={
sdC(a,b){a.alt=b},
scX(a,b){a.src=b}}
A.bX.prototype={
sdI(a,b){a.checked=b},
sh7(a,b){a.disabled=b},
sbl(a,b){a.type=b},
sM(a,b){a.value=b},
$ibX:1,
$ipv:1,
$icR:1}
A.bE.prototype={$ibE:1}
A.cZ.prototype={
l(a){var s=String(a)
s.toString
return s},
$icZ:1}
A.fr.prototype={
gj(a){return a.length}}
A.d0.prototype={
bA(a,b,c,d){t.B.a(c)
if(b==="message")a.start()
this.eF(a,b,c,!1)},
$id0:1}
A.fs.prototype={
N(a,b){return A.bd(a.get(b))!=null},
h(a,b){return A.bd(a.get(A.x(b)))},
q(a,b){var s,r,q
t.v.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.bd(r.value[1]))}},
gJ(a){var s=A.B([],t.s)
this.q(a,new A.ma(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gE(a){var s=a.size
s.toString
return s===0},
gT(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.U("Not supported"))},
C(a,b){throw A.b(A.U("Not supported"))},
$it:1}
A.ma.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:6}
A.ft.prototype={
N(a,b){return A.bd(a.get(b))!=null},
h(a,b){return A.bd(a.get(A.x(b)))},
q(a,b){var s,r,q
t.v.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.bd(r.value[1]))}},
gJ(a){var s=A.B([],t.s)
this.q(a,new A.mb(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gE(a){var s=a.size
s.toString
return s===0},
gT(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.U("Not supported"))},
C(a,b){throw A.b(A.U("Not supported"))},
$it:1}
A.mb.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:6}
A.aP.prototype={$iaP:1}
A.fu.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.ib.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.aC.prototype={$iaC:1}
A.aF.prototype={
gD(a){var s=this.a.firstChild
if(s==null)throw A.b(A.O("No elements"))
return s},
gaL(a){var s=this.a,r=s.childNodes.length
if(r===0)throw A.b(A.O("No elements"))
if(r>1)throw A.b(A.O("More than one element"))
s=s.firstChild
s.toString
return s},
R(a,b){var s,r,q,p,o
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
if(!(b>=0&&b<r.length))return A.d(r,b)
s.replaceChild(c,r[b]).toString},
gB(a){var s=this.a.childNodes
return new A.cl(s,s.length,A.az(s).i("cl<A.E>"))},
gj(a){return this.a.childNodes.length},
h(a,b){var s
A.L(b)
s=this.a.childNodes
if(!(b>=0&&b<s.length))return A.d(s,b)
return s[b]}}
A.v.prototype={
e2(a){var s=a.parentNode
if(s!=null)s.removeChild(a).toString},
e6(a,b){var s,r,q
try{r=a.parentNode
r.toString
s=r
J.rM(s,b,a)}catch(q){}return a},
f3(a){var s
while(s=a.firstChild,s!=null)a.removeChild(s).toString},
l(a){var s=a.nodeValue
return s==null?this.eG(a):s},
sG(a,b){a.textContent=b},
fT(a,b){var s=a.appendChild(b)
s.toString
return s},
fZ(a,b){var s=a.cloneNode(!0)
s.toString
return s},
v(a,b){var s=a.contains(b)
s.toString
return s},
fv(a,b,c){var s=a.replaceChild(b,c)
s.toString
return s},
$iv:1}
A.d1.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.F.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.bG.prototype={$ibG:1}
A.d2.prototype={$id2:1}
A.aQ.prototype={
gj(a){return a.length},
$iaQ:1}
A.fI.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.d8.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.b9.prototype={$ib9:1}
A.fK.prototype={
N(a,b){return A.bd(a.get(b))!=null},
h(a,b){return A.bd(a.get(A.x(b)))},
q(a,b){var s,r,q
t.v.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.bd(r.value[1]))}},
gJ(a){var s=A.B([],t.s)
this.q(a,new A.ms(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gE(a){var s=a.size
s.toString
return s===0},
gT(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.U("Not supported"))},
C(a,b){throw A.b(A.U("Not supported"))},
$it:1}
A.ms.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:6}
A.c0.prototype={
gj(a){return a.length},
sM(a,b){a.value=b},
$ic0:1}
A.aS.prototype={$iaS:1}
A.fM.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.ls.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.e4.prototype={}
A.aT.prototype={$iaT:1}
A.fN.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.cA.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.aU.prototype={
gj(a){return a.length},
$iaU:1}
A.e6.prototype={
N(a,b){return a.getItem(b)!=null},
h(a,b){return a.getItem(A.x(b))},
k(a,b,c){a.setItem(b,c)},
C(a,b){var s=a.getItem(b)
a.removeItem(b)
return s},
q(a,b){var s,r,q
t.bm.a(b)
for(s=0;;++s){r=a.key(s)
if(r==null)return
q=a.getItem(r)
q.toString
b.$2(r,q)}},
gJ(a){var s=A.B([],t.s)
this.q(a,new A.mu(s))
return s},
gj(a){var s=a.length
s.toString
return s},
gE(a){return a.key(0)==null},
gT(a){return a.key(0)!=null},
$it:1}
A.mu.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:7}
A.aD.prototype={$iaD:1}
A.e9.prototype={
a7(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bY(a,b,c,d)
s=A.tl("<table>"+b+"</table>",c,d)
r=document.createDocumentFragment()
r.toString
new A.aF(r).R(0,new A.aF(s))
return r}}
A.fQ.prototype={
a7(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bY(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.aF(s).R(0,new A.aF(new A.aF(new A.aF(B.T.a7(r,b,c,d)).gaL(0)).gaL(0)))
return s}}
A.fR.prototype={
a7(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bY(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.aF(s).R(0,new A.aF(new A.aF(B.T.a7(r,b,c,d)).gaL(0)))
return s}}
A.d9.prototype={
bW(a,b){var s,r
this.sG(a,null)
s=a.content
s.toString
J.iv(s)
r=this.a7(a,b,null,null)
a.content.appendChild(r).toString},
$id9:1}
A.cv.prototype={
sM(a,b){a.value=b},
$icv:1}
A.aV.prototype={$iaV:1}
A.aE.prototype={$iaE:1}
A.fT.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.gJ.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.fU.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.dQ.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.fV.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.aW.prototype={$iaW:1}
A.fY.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.ki.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.fZ.prototype={
gj(a){return a.length}}
A.bt.prototype={}
A.h6.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.h9.prototype={
gj(a){return a.length}}
A.c5.prototype={$ic5:1,$imM:1}
A.bu.prototype={$ibu:1}
A.dc.prototype={$idc:1}
A.hg.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.d5.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.ej.prototype={
l(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return"Rectangle ("+A.e(p)+", "+A.e(s)+") "+A.e(r)+" x "+A.e(q)},
a0(a,b){var s,r,q
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
if(r===q.gaX(b)){s=a.height
s.toString
q=s===q.gaT(b)
s=q}}}}return s},
gL(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return A.oH(p,s,r,q)},
gda(a){return a.height},
gaT(a){var s=a.height
s.toString
return s},
gdA(a){return a.width},
gaX(a){var s=a.width
s.toString
return s}}
A.hu.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
return a[b]},
k(a,b,c){t.ef.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){if(a.length>0)return a[0]
throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.eq.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.F.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.hV.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.hI.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.i0.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.ab(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.lv.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.hc.prototype={
R(a,b){t.I.a(b).q(0,new A.mU(this))},
q(a,b){var s,r,q,p,o,n
t.bm.a(b)
for(s=this.gJ(0),r=s.length,q=this.a,p=0;p<s.length;s.length===r||(0,A.ar)(s),++p){o=s[p]
n=q.getAttribute(o)
b.$2(o,n==null?A.x(n):n)}},
gJ(a){var s,r,q,p,o,n,m=this.a.attributes
m.toString
s=A.B([],t.s)
for(r=m.length,q=t.nD,p=0;p<r;++p){if(!(p<m.length))return A.d(m,p)
o=q.a(m[p])
if(o.namespaceURI==null){n=o.name
n.toString
B.b.m(s,n)}}return s},
gE(a){return this.gJ(0).length===0},
gT(a){return this.gJ(0).length!==0}}
A.mU.prototype={
$2(a,b){this.a.a.setAttribute(A.x(a),A.x(b))},
$S:7}
A.df.prototype={
N(a,b){var s=this.a.hasAttribute(b)
s.toString
return s},
h(a,b){return this.a.getAttribute(A.x(b))},
k(a,b,c){this.a.setAttribute(b,c)},
C(a,b){var s,r
if(typeof b=="string"){s=this.a
r=s.getAttribute(b)
s.removeAttribute(b)
s=r}else s=null
return s},
gj(a){return this.gJ(0).length}}
A.hj.prototype={
N(a,b){var s=this.a.a.hasAttribute("data-"+this.ba(b))
s.toString
return s},
h(a,b){return this.a.a.getAttribute("data-"+this.ba(A.x(b)))},
k(a,b,c){this.a.a.setAttribute("data-"+this.ba(b),c)},
C(a,b){var s="data-"+this.ba(b),r=this.a.a,q=r.getAttribute(s)
r.removeAttribute(s)
return q},
q(a,b){this.a.q(0,new A.mW(this,t.bm.a(b)))},
gJ(a){var s=A.B([],t.s)
this.a.q(0,new A.mX(this,s))
return s},
gj(a){return this.gJ(0).length},
gE(a){return this.gJ(0).length===0},
gT(a){return this.gJ(0).length!==0},
ds(a){var s,r,q=A.B(a.split("-"),t.s)
for(s=1;s<q.length;++s){r=q[s]
if(r.length>0)B.b.k(q,s,r[0].toUpperCase()+B.a.Z(r,1))}return B.b.a_(q,"")},
ba(a){var s,r,q,p,o
for(s=a.length,r=0,q="";r<s;++r){p=a[r]
o=p.toLowerCase()
q=(p!==o&&r>0?q+"-":q)+o}return q.charCodeAt(0)==0?q:q}}
A.mW.prototype={
$2(a,b){if(B.a.O(a,"data-"))this.b.$2(this.a.ds(B.a.Z(a,5)),b)},
$S:7}
A.mX.prototype={
$2(a,b){if(B.a.O(a,"data-"))B.b.m(this.b,this.a.ds(B.a.Z(a,5)))},
$S:7}
A.hp.prototype={
a9(){var s,r,q,p,o=A.cs(t.N)
for(s=this.a.className.split(" "),r=s.length,q=0;q<r;++q){p=B.a.A(s[q])
if(p.length!==0)o.m(0,p)}return o},
cM(a){this.a.className=t.i.a(a).a_(0," ")},
gj(a){var s=this.a.classList.length
s.toString
return s},
gE(a){var s=this.a.classList.length
s.toString
return s===0},
gT(a){var s=this.a.classList.length
s.toString
return s!==0},
v(a,b){var s=this.a.classList.contains(b)
s.toString
return s},
m(a,b){var s,r
A.x(b)
s=this.a.classList
r=s.contains(b)
r.toString
s.add(b)
return!r},
C(a,b){var s,r
if(typeof b=="string"){s=this.a.classList
r=s.contains(b)
r.toString
s.remove(b)}else r=!1
return r},
bN(a){A.u0(this.a,a)}}
A.ox.prototype={}
A.cy.prototype={
bL(a,b,c,d){var s=A.C(this)
s.i("~(1)?").a(a)
t.jE.a(c)
return A.z(this.a,this.b,a,!1,s.c)}}
A.aX.prototype={}
A.ek.prototype={
a3(a){var s=this
if(s.b==null)return $.ol()
s.dv()
s.d=s.b=null
return $.ol()},
cE(a){var s,r=this
r.$ti.i("~(1)?").a(a)
if(r.b==null)throw A.b(A.O("Subscription has been canceled."))
r.dv()
s=A.r0(new A.mZ(a),t.A)
r.d=s
r.du()},
du(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.rN(s,this.c,r,!1)}},
dv(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.rL(s,this.c,t.B.a(r),!1)}},
$ibs:1}
A.mY.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:3}
A.mZ.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:3}
A.oP.prototype={}
A.cA.prototype={
eQ(a){var s
if($.hv.a===0){for(s=0;s<262;++s)$.hv.k(0,B.an[s],A.vI())
for(s=0;s<12;++s)$.hv.k(0,B.A[s],A.vJ())}},
aQ(a){return $.rA().v(0,A.dD(a))},
ap(a,b,c){var s=$.hv.h(0,A.dD(a)+"::"+b)
if(s==null)s=$.hv.h(0,"*::"+b)
if(s==null)return!1
return A.nK(s.$4(a,b,c,this))},
$ibj:1}
A.A.prototype={
gB(a){return new A.cl(a,this.gj(a),A.az(a).i("cl<A.E>"))}}
A.dZ.prototype={
aQ(a){return B.b.a6(this.a,new A.me(a))},
ap(a,b,c){return B.b.a6(this.a,new A.md(a,b,c))},
$ibj:1}
A.me.prototype={
$1(a){return t.hU.a(a).aQ(this.a)},
$S:23}
A.md.prototype={
$1(a){return t.hU.a(a).ap(this.a,this.b,this.c)},
$S:23}
A.ew.prototype={
eS(a,b,c,d){var s,r,q
this.a.R(0,c)
s=b.bT(0,new A.no())
r=b.bT(0,new A.np())
this.b.R(0,s)
q=this.c
q.R(0,B.al)
q.R(0,r)},
aQ(a){return this.a.v(0,A.dD(a))},
ap(a,b,c){var s,r=this,q=A.dD(a),p=r.c,o=q+"::"+b
if(p.v(0,o))return r.d.fR(c)
else{s="*::"+b
if(p.v(0,s))return r.d.fR(c)
else{p=r.b
if(p.v(0,o))return!0
else if(p.v(0,s))return!0
else if(p.v(0,q+"::*"))return!0
else if(p.v(0,"*::*"))return!0}}return!1},
$ibj:1}
A.no.prototype={
$1(a){return!B.b.v(B.A,A.x(a))},
$S:10}
A.np.prototype={
$1(a){return B.b.v(B.A,A.x(a))},
$S:10}
A.i2.prototype={
ap(a,b,c){if(this.eN(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.v(0,b)
return!1}}
A.nu.prototype={
$1(a){return"TEMPLATE::"+A.x(a)},
$S:11}
A.i1.prototype={
aQ(a){var s
if(t.nZ.b(a))return!1
s=t.bC.b(a)
if(s&&A.dD(a)==="foreignObject")return!1
if(s)return!0
return!1},
ap(a,b,c){if(b==="is"||B.a.O(b,"on"))return!1
return this.aQ(a)},
$ibj:1}
A.cl.prototype={
p(){var s=this,r=s.c+1,q=s.b
if(r<q){s.d=J.j(s.a,r)
s.c=r
return!0}s.d=null
s.c=q
return!1},
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
$iae:1}
A.hi.prototype={$ik:1,$if:1,$imM:1}
A.hS.prototype={$itM:1}
A.eK.prototype={
cR(a){var s,r=new A.nJ(this)
do{s=this.b
r.$2(a,null)}while(s!==this.b)},
b7(a,b){++this.b
if(b==null||b!==a.parentNode)J.iy(a)
else b.removeChild(a).toString},
fC(a,b){var s,r,q,p,o,n,m,l=!0,k=null,j=null
try{k=J.rR(a)
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
q=A.dD(a)
this.fB(a,b,l,r,q,t.f.a(k),A.al(j))}catch(n){if(A.as(n) instanceof A.b8)throw n
else{this.b7(a,b)
window.toString
p=A.e(r)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn("Removing corrupted element "+p)}}},
fB(a,b,c,d,e,f,g){var s,r,q,p,o,n,m,l=this
if(c){l.b7(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing element due to corrupted attributes on <"+d+">")
return}if(!l.a.aQ(a)){l.b7(a,b)
window.toString
s=A.e(b)
r=typeof console!="undefined"
r.toString
if(r)window.console.warn("Removing disallowed element <"+e+"> from "+s)
return}if(g!=null)if(!l.a.ap(a,"is",g)){l.b7(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing disallowed type extension <"+e+' is="'+g+'">')
return}s=f.gJ(0)
q=A.B(s.slice(0),A.E(s))
for(p=f.gJ(0).length-1,s=f.a,r="Removing disallowed attribute <"+e+" ";p>=0;--p){if(!(p<q.length))return A.d(q,p)
o=q[p]
n=l.a
m=J.t8(o)
A.x(o)
if(!n.ap(a,m,A.x(s.getAttribute(o)))){window.toString
n=s.getAttribute(o)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn(r+o+'="'+A.e(n)+'">')
s.removeAttribute(o)}}if(t.fD.b(a)){s=a.content
s.toString
l.cR(s)}},
ez(a,b){var s=a.nodeType
s.toString
switch(s){case 1:this.fC(a,b)
break
case 8:case 11:case 3:case 4:break
default:this.b7(a,b)}},
$ity:1}
A.nJ.prototype={
$2(a,b){var s,r,q,p,o,n=this.a
n.ez(a,b)
s=a.lastChild
while(s!=null){r=null
try{r=s.previousSibling
if(r!=null&&r.nextSibling!==s){q=A.O("Corrupt HTML")
throw A.b(q)}}catch(p){q=s;++n.b
o=q.parentNode
if(a!==o){if(o!=null)o.removeChild(q).toString}else a.removeChild(q).toString
s=null
r=a.lastChild}if(s!=null)this.$2(s,a)
s=r}},
$S:45}
A.hh.prototype={}
A.hl.prototype={}
A.hm.prototype={}
A.hn.prototype={}
A.ho.prototype={}
A.hr.prototype={}
A.hs.prototype={}
A.hw.prototype={}
A.hx.prototype={}
A.hE.prototype={}
A.hF.prototype={}
A.hG.prototype={}
A.hH.prototype={}
A.hI.prototype={}
A.hJ.prototype={}
A.hN.prototype={}
A.hO.prototype={}
A.hQ.prototype={}
A.ex.prototype={}
A.ey.prototype={}
A.hT.prototype={}
A.hU.prototype={}
A.hW.prototype={}
A.i3.prototype={}
A.i4.prototype={}
A.eB.prototype={}
A.eC.prototype={}
A.i5.prototype={}
A.i6.prototype={}
A.ia.prototype={}
A.ib.prototype={}
A.ic.prototype={}
A.id.prototype={}
A.ie.prototype={}
A.ig.prototype={}
A.ih.prototype={}
A.ii.prototype={}
A.ij.prototype={}
A.ik.prototype={}
A.nq.prototype={
aS(a){var s,r=this.a,q=r.length
for(s=0;s<q;++s)if(r[s]===a)return s
B.b.m(r,a)
B.b.m(this.b,null)
return q},
aA(a){var s,r,q,p,o,n=this
if(a==null)return a
if(A.cG(a))return a
if(typeof a=="number")return a
if(typeof a=="string")return a
if(a instanceof A.ad)return new Date(a.a)
if(a instanceof A.dM)throw A.b(A.h1("structured clone of RegExp"))
if(t.dY.b(a))return a
if(t.fj.b(a))return a
if(t.kL.b(a))return a
if(t.ad.b(a))return a
if(t.hH.b(a)||t.hK.b(a)||t.oA.b(a)||t.hn.b(a))return a
if(t.f.b(a)){s={}
r=n.aS(a)
q=n.b
if(!(r<q.length))return A.d(q,r)
p=s.a=q[r]
if(p!=null)return p
p={}
s.a=p
B.b.k(q,r,p)
J.eR(a,new A.ns(s,n))
return s.a}if(t.j.b(a)){r=n.aS(a)
s=n.b
if(!(r<s.length))return A.d(s,r)
p=s[r]
if(p!=null)return p
return n.h0(a,r)}if(t.m.b(a)){s={}
r=n.aS(a)
q=n.b
if(!(r<q.length))return A.d(q,r)
p=s.a=q[r]
if(p!=null)return p
o={}
o.toString
s.a=o
B.b.k(q,r,o)
n.hd(a,new A.nt(s,n))
return s.a}throw A.b(A.h1("structured clone of other type"))},
h0(a,b){var s,r=J.y(a),q=r.gj(a),p=new Array(q)
p.toString
B.b.k(this.b,b,p)
for(s=0;s<q;++s)B.b.k(p,s,this.aA(r.h(a,s)))
return p}}
A.ns.prototype={
$2(a,b){this.a.a[a]=this.b.aA(b)},
$S:28}
A.nt.prototype={
$2(a,b){this.a.a[a]=this.b.aA(b)},
$S:46}
A.mN.prototype={
aS(a){var s,r=this.a,q=r.length
for(s=0;s<q;++s)if(r[s]===a)return s
B.b.m(r,a)
B.b.m(this.b,null)
return q},
aA(a){var s,r,q,p,o,n,m,l,k,j=this
if(a==null)return a
if(A.cG(a))return a
if(typeof a=="number")return a
if(typeof a=="string")return a
s=a instanceof Date
s.toString
if(s){s=a.getTime()
s.toString
return new A.ad(A.ou(s,0,!0),0,!0)}s=a instanceof RegExp
s.toString
if(s)throw A.b(A.h1("structured clone of RegExp"))
s=typeof Promise!="undefined"&&a instanceof Promise
s.toString
if(s)return A.pe(a,t.z)
if(A.r7(a)){r=j.aS(a)
s=j.b
if(!(r<s.length))return A.d(s,r)
q=s[r]
if(q!=null)return q
p=t.z
o=A.ai(p,p)
B.b.k(s,r,o)
j.hc(a,new A.mP(j,o))
return o}s=a instanceof Array
s.toString
if(s){s=a
s.toString
r=j.aS(s)
p=j.b
if(!(r<p.length))return A.d(p,r)
q=p[r]
if(q!=null)return q
n=J.y(s)
m=n.gj(s)
if(j.c){l=new Array(m)
l.toString
q=l}else q=s
B.b.k(p,r,q)
for(p=J.c8(q),k=0;k<m;++k)p.k(q,k,j.aA(n.h(s,k)))
return q}return a}}
A.mP.prototype={
$2(a,b){var s=this.a.aA(b)
this.b.k(0,a,s)
return s},
$S:49}
A.nr.prototype={
hd(a,b){var s,r,q,p
t.ny.a(b)
for(s=Object.keys(a),r=s.length,q=0;q<s.length;s.length===r||(0,A.ar)(s),++q){p=s[q]
b.$2(p,a[p])}}}
A.mO.prototype={
hc(a,b){var s,r,q,p
t.ny.a(b)
for(s=Object.keys(a),r=s.length,q=0;q<s.length;s.length===r||(0,A.ar)(s),++q){p=s[q]
b.$2(p,a[p])}}}
A.f5.prototype={
cm(a){var s=$.rg()
if(s.b.test(a))return a
throw A.b(A.kM(a,"value","Not a valid class token"))},
l(a){return this.a9().a_(0," ")},
gB(a){var s=this.a9()
return A.u5(s,s.r,A.C(s).c)},
av(a,b,c){var s,r
c.i("0(c)").a(b)
s=this.a9()
r=A.C(s)
return new A.bA(s,r.K(c).i("1(ax.E)").a(b),r.i("@<ax.E>").K(c).i("bA<1,2>"))},
gE(a){return this.a9().a===0},
gT(a){return this.a9().a!==0},
gj(a){return this.a9().a},
v(a,b){this.cm(b)
return this.a9().v(0,b)},
m(a,b){var s
A.x(b)
this.cm(b)
s=this.dU(0,new A.kQ(b))
return A.nK(s==null?!1:s)},
C(a,b){var s,r
if(typeof b!="string")return!1
this.cm(b)
s=this.a9()
r=s.C(0,b)
this.cM(s)
return r},
bN(a){this.dU(0,new A.kR(a))},
u(a,b){return this.a9().u(0,b)},
dU(a,b){var s,r
t.gA.a(b)
s=this.a9()
r=b.$1(s)
this.cM(s)
return r}}
A.kQ.prototype={
$1(a){return t.i.a(a).m(0,this.a)},
$S:54}
A.kR.prototype={
$1(a){return t.i.a(a).bN(this.a)},
$S:38}
A.ff.prototype={
gbt(){var s=this.b,r=A.C(s)
return new A.aK(new A.I(s,r.i("F(m.E)").a(new A.lU()),r.i("I<m.E>")),r.i("D(m.E)").a(new A.lV()),r.i("aK<m.E,D>"))},
k(a,b,c){var s
t.h.a(c)
s=this.gbt()
J.t3(s.b.$1(J.eQ(s.a,b)),c)},
v(a,b){return!1},
X(a){J.iv(this.b.a)},
gj(a){return J.ao(this.gbt().a)},
h(a,b){var s
A.L(b)
s=this.gbt()
return s.b.$1(J.eQ(s.a,b))},
gB(a){var s=A.aO(this.gbt(),!1,t.h)
return new J.be(s,s.length,A.E(s).i("be<1>"))}}
A.lU.prototype={
$1(a){return t.h.b(t.F.a(a))},
$S:24}
A.lV.prototype={
$1(a){return t.h.a(t.F.a(a))},
$S:59}
A.cY.prototype={$icY:1}
A.h8.prototype={
geb(a){var s=a.target
s.toString
return s}}
A.m3.prototype={
$1(a){var s,r,q,p,o=this.a
if(o.N(0,a))return o.h(0,a)
if(t.f.b(a)){s={}
o.k(0,a,s)
for(o=J.K(a),r=J.aH(o.gJ(a));r.p();){q=r.gt(r)
s[q]=this.$1(o.h(a,q))}return s}else if(t.R.b(a)){p=[]
o.k(0,a,p)
B.b.R(p,J.ce(a,this,t.z))
return p}else return A.nR(a)},
$S:60}
A.hR.prototype={
ee(a){if(a instanceof A.b0)return a.fA()
return null}}
A.nS.prototype={
$1(a){var s
t.Z.a(a)
s=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(A.uF,a,!1)
A.p1(s,$.iu(),a)
return s},
$S:14}
A.nT.prototype={
$1(a){return new this.a(a)},
$S:14}
A.nY.prototype={
$1(a){var s=a==null?A.aY(a):a
$.ok()
return new A.cX(s)},
$S:72}
A.nZ.prototype={
$1(a){var s=a==null?A.aY(a):a
$.ok()
return new A.cq(s,t.gq)},
$S:73}
A.o_.prototype={
$1(a){var s=a==null?A.aY(a):a
$.ok()
return new A.b0(s)},
$S:76}
A.b0.prototype={
h(a,b){if(typeof b!="string"&&typeof b!="number")throw A.b(A.aZ("property is not a String or num",null))
return A.p0(this.a[b])},
k(a,b,c){if(typeof b!="string"&&typeof b!="number")throw A.b(A.aZ("property is not a String or num",null))
this.a[b]=A.nR(c)},
a0(a,b){if(b==null)return!1
return b instanceof A.b0&&this.a===b.a},
bf(a){return a in this.a},
aq(a,b){var s,r=this.a
if(b==null)s=null
else{s=A.E(b)
s=A.aO(new A.a1(b,s.i("@(1)").a(A.vR()),s.i("a1<1,@>")),!0,t.z)}return A.p0(r[a].apply(r,s))},
l(a){var s,r
try{s=String(this.a)
return s}catch(r){s=this.eL(0)
return s}},
fA(){var s=this.ci(),r=s!=null&&s.length>0?" ("+s+")":""
return"Instance of '"+A.e1(this)+"'"+r},
ci(){return A.pf(this.a,!1,!1)},
gL(a){return 0}}
A.cX.prototype={
ci(){return A.pf(this.a,!1,!0)}}
A.cq.prototype={
d2(a){var s=a<0||a>=this.gj(0)
if(s)throw A.b(A.ak(a,0,this.gj(0),null,null))},
h(a,b){if(A.dm(b))this.d2(b)
return this.$ti.c.a(this.eH(0,b))},
k(a,b,c){if(A.dm(b))this.d2(b)
this.eM(0,b,c)},
gj(a){var s=this.a.length
if(typeof s==="number"&&s>>>0===s)return s
throw A.b(A.O("Bad JsArray length"))},
ci(){return A.pf(this.a,!0,!1)},
$in:1,
$ih:1,
$ip:1}
A.dg.prototype={
k(a,b,c){return this.eI(0,b,c)}}
A.mf.prototype={
l(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.o7.prototype={
$1(a){var s,r,q,p,o
if(A.qS(a))return a
s=this.a
if(s.N(0,a))return s.h(0,a)
if(t.f.b(a)){r={}
s.k(0,a,r)
for(s=J.K(a),q=J.aH(s.gJ(a));q.p();){p=q.gt(q)
r[p]=this.$1(s.h(a,p))}return r}else if(t.R.b(a)){o=[]
s.k(0,a,o)
B.b.R(o,J.ce(a,this,t.z))
return o}else return a},
$S:26}
A.oe.prototype={
$1(a){return this.a.bc(0,this.b.i("0/?").a(a))},
$S:16}
A.of.prototype={
$1(a){if(a==null)return this.a.bE(new A.mf(a===undefined))
return this.a.bE(a)},
$S:16}
A.ne.prototype={
eR(){var s=self.crypto
if(s!=null)if(s.getRandomValues!=null)return
throw A.b(A.U("No source of cryptographically secure random numbers available."))},
hu(a){var s,r,q,p,o,n,m,l
if(a<=0||a>4294967296)throw A.b(A.tG("max must be in range 0 < max \u2264 2^32, was "+a))
if(a>255)if(a>65535)s=a>16777215?4:3
else s=2
else s=1
r=this.a
r.$flags&2&&A.am(r,11)
r.setUint32(0,0,!1)
q=4-s
p=A.L(Math.pow(256,s))
for(o=a-1,n=(a&o)===0;;){crypto.getRandomValues(J.rP(B.aq.gfX(r),q,s))
m=r.getUint32(0,!1)
if(n)return(m&o)>>>0
l=m%a
if(m-l+a<p)return l}}}
A.b1.prototype={$ib1:1}
A.fp.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s
A.L(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.ab(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){t.kT.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s=a.length
s.toString
if(s>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){return this.h(a,b)},
$in:1,
$ih:1,
$ip:1}
A.b4.prototype={$ib4:1}
A.fE.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s
A.L(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.ab(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){t.ai.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s=a.length
s.toString
if(s>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){return this.h(a,b)},
$in:1,
$ih:1,
$ip:1}
A.fJ.prototype={
gj(a){return a.length}}
A.d7.prototype={$id7:1}
A.fP.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s
A.L(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.ab(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){A.x(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s=a.length
s.toString
if(s>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){return this.h(a,b)},
$in:1,
$ih:1,
$ip:1}
A.eW.prototype={
a9(){var s,r,q,p,o=this.a.getAttribute("class"),n=A.cs(t.N)
if(o==null)return n
for(s=o.split(" "),r=s.length,q=0;q<r;++q){p=B.a.A(s[q])
if(p.length!==0)n.m(0,p)}return n},
cM(a){this.a.setAttribute("class",a.a_(0," "))}}
A.u.prototype={
gar(a){return new A.eW(a)},
gbC(a){return new A.ff(a,new A.aF(a))},
sU(a,b){this.bW(a,b)},
a7(a,b,c,d){var s,r,q,p=A.B([],t.lN)
B.b.m(p,A.qd(null))
B.b.m(p,A.qm())
B.b.m(p,new A.i1())
c=new A.eK(new A.dZ(p))
p=document
s=p.body
s.toString
r=B.D.h1(s,'<svg version="1.1">'+b+"</svg>",c)
p=p.createDocumentFragment()
p.toString
q=new A.aF(r).gaL(0)
while(s=q.firstChild,s!=null)p.appendChild(s).toString
return p},
dM(a){return a.focus()},
gdY(a){return new A.aX(a,"change",!1,t.E)},
gaU(a){return new A.aX(a,"click",!1,t.C)},
gdZ(a){return new A.aX(a,"input",!1,t.E)},
ge_(a){return new A.aX(a,"keydown",!1,t.kN)},
$iu:1}
A.b5.prototype={$ib5:1}
A.h_.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s
A.L(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.ab(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){t.hk.a(c)
throw A.b(A.U("Cannot assign element of immutable List."))},
gD(a){var s=a.length
s.toString
if(s>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){return this.h(a,b)},
$in:1,
$ih:1,
$ip:1}
A.hA.prototype={}
A.hB.prototype={}
A.hK.prototype={}
A.hL.prototype={}
A.hY.prototype={}
A.hZ.prototype={}
A.i7.prototype={}
A.i8.prototype={}
A.eX.prototype={
gj(a){return a.length}}
A.eY.prototype={
N(a,b){return A.bd(a.get(b))!=null},
h(a,b){return A.bd(a.get(A.x(b)))},
q(a,b){var s,r,q
t.v.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.bd(r.value[1]))}},
gJ(a){var s=A.B([],t.s)
this.q(a,new A.kN(s))
return s},
gj(a){var s=a.size
s.toString
return s},
gE(a){var s=a.size
s.toString
return s===0},
gT(a){var s=a.size
s.toString
return s!==0},
k(a,b,c){throw A.b(A.U("Not supported"))},
C(a,b){throw A.b(A.U("Not supported"))},
$it:1}
A.kN.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:6}
A.eZ.prototype={
gj(a){return a.length}}
A.bR.prototype={}
A.fF.prototype={
gj(a){return a.length}}
A.hd.prototype={}
A.o8.prototype={
$1(a){t.A.a(a)
new A.iz().a8()},
$S:13}
A.iz.prototype={
a8(){var s=0,r=A.S(t.H),q=this,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
var $async$a8=A.T(function(a1,a2){if(a1===1)return A.P(a2,r)
for(;;)switch(s){case 0:b=document
a=b.getElementById("view-login")
a.toString
q.CW=a
a=b.getElementById("view-dashboard")
a.toString
q.cx=a
a=b.getElementById("view-directory")
a.toString
q.cy=a
a=b.getElementById("view-assets")
a.toString
q.db=a
a=b.getElementById("view-profile")
a.toString
q.dx=a
a=b.getElementById("view-billing")
a.toString
q.dy=a
a=b.getElementById("view-resident-home")
a.toString
q.fr=a
a=b.getElementById("view-resident-ledger")
a.toString
q.fx=a
a=b.getElementById("view-resident-support")
a.toString
q.fy=a
a=b.getElementById("app-bottom-nav")
a.toString
q.go=a
a=b.getElementById("resident-bottom-nav")
a.toString
q.id=a
q.k1=b.getElementById("btn-floating-role-switch")
b.getElementById("floating-role-switch-text")
a=q.cx
o=q.cy
n=b.getElementById("view-worker-resident-details")
n.toString
m=q.db
l=q.dx
k=q.dy
j=b.getElementById("view-transactions")
j.toString
i=b.getElementById("view-announcements")
i.toString
h=b.getElementById("view-resident-profile")
h.toString
g=t.N
q.k3=t.dW.a(A.a6(["view-dashboard",a,"view-directory",o,"view-worker-resident-details",n,"view-assets",m,"view-profile",l,"view-billing",k,"view-transactions",j,"view-announcements",i,"view-resident-profile",h,"view-resident-home",q.fr,"view-resident-ledger",q.fx,"view-resident-support",q.fy],g,t.h))
h=t.d.a(window.location).href
h.toString
a=A.cw(h).gal().h(0,"role")==="resident"
if(a)q.ch=A.tI($.J(),new A.jM(q))
f=b.getElementById("web-portal-title")
if(a){if(f!=null)J.q(f,"Resident Portal")
e=t.G.a(b.getElementById("employee-id"))
if(e!=null)e.placeholder="Resident ID, meter ID, contact or unique name"}else{if(f!=null)J.q(f,"Worker Portal")
e=t.G.a(b.getElementById("employee-id"))
if(e!=null)e.placeholder="Enter employee ID"}o=new A.jU()
o.$0()
A.mA(A.pA(0,10),new A.jN(o))
o=b.getElementById("btn-resident-profile-logout")
if(o!=null){o=J.a4(o)
n=o.$ti
A.z(o.a,o.b,n.i("~(1)?").a(new A.jO()),!1,n.c)}o=$.J()
o.shv(new A.jP(q))
n=o.cy
new A.bv(n,A.C(n).i("bv<1>")).dT(new A.jQ(q))
s=2
return A.w(o.a8(),$async$a8)
case 2:q.dw(o.Y())
A.mA(B.ad,new A.jR(q))
A.mA(B.I,new A.jS(q))
A.z(b,A.x(A.pE(b)),t.oV.a(new A.jT(q)),!1,t.A)
p=A.bw()?window.localStorage.getItem("waterhall_session"):null
d=A.bw()?window.localStorage.getItem("waterhall_resident_session"):null
if(a)if(d!=null&&d.length!==0){q.cW(d)
q.aC()
q.bw("resident")}else q.bd()
else if(p!=null&&p.length!==0)try{a=A.aj(t.f.a(B.c.I(0,p)),g,t.z)
q.a=a
q.cU(a)
q.aC()
q.bw("worker")}catch(a0){a=window.localStorage
a.toString
B.k.C(a,"waterhall_session")
q.bd()}else q.bd()
q.fV()
q.hk()
if($.J().z==="Session expired. Please sign in again.")q.ai("Session expired. Please sign in again.",b.getElementById("login-error-msg"))
b=q.ch
b=b==null?null:b.bp(0)
if(!(b instanceof A.W)){a=new A.W($.V,t.cU)
a.a=8
a.c=b
b=a}s=3
return A.w(b,$async$a8)
case 3:return A.Q(null,r)}})
return A.R($async$a8,r)},
b5(){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i
var $async$b5=A.T(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:i=!0
if(!m.ay){j=document
j.toString
j=j.visibilityState||j.mozVisibilityState||j.msVisibilityState||j.webkitVisibilityState
j.toString
if(j==="visible")i=m.a==null&&m.d==null}if(i){s=1
break}m.ay=!0
l=window.localStorage.getItem("waterhall_jwt")
i=$.J()
k=i.ax
p=3
s=6
return A.w(i.aG(m.d!=null?"resident":"worker"),$async$b5)
case 6:if(!J.i(l,window.localStorage.getItem("waterhall_jwt"))||!i.P()||J.i(k,i.ax)){n=[1]
s=4
break}if(m.d!=null)m.bQ()
else{i=m.b
if(i==="view-dashboard")m.bP()
else if(i==="view-directory")m.aW()}if(m.b==="view-announcements")m.e3()
n.push(5)
s=4
break
case 3:n=[2]
case 4:p=2
m.ay=!1
m.bv()
s=n.pop()
break
case 5:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$b5,r)},
dw(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e="btn-review-collections"
t.P.a(a)
s=document
r=s.getElementById("worker-sync-status-pill")
q=s.getElementById("worker-sync-status-text")
p=s.getElementById("db-offline-overlay")
o=J.y(a)
n=o.h(a,"status")
m=A.x(n==null?"online":n)
l=A.nL(o.h(a,"pendingCount"))
if(l==null)l=0
n=A.qG(o.h(a,"isOnline"))
k=J.i(o.h(a,"authenticated"),!0)
j=A.nL(o.h(a,"reviewCount"))
if(j==null)j=0
i=r==null
if(!i&&q!=null){h=J.K(r)
h.gar(r).bN(["online","offline","pending_sync","syncing","synced"])
h.gar(r).m(0,m)
if(!k)J.q(q,"Sign in required")
else if(n===!1)J.q(q,"Offline Mode")
else if(J.i(o.h(a,"isSyncing"),!0))J.q(q,"Syncing...")
else if(l>0){if(j>0)o=""+l+" Pending ("+j+" need review)"
else{n=""+l
o=o.h(a,"error")!=null?n+" Pending: retry needed":n+" Pending Sync"}J.q(q,o)}else J.q(q,"Connected")}if(p!=null){o=p.style
o.display="none"}g=s.getElementById(e)
if(g==null)o=(i?null:r.parentElement)!=null
else o=!1
if(o){f=s.createElement("button")
f.id=e
B.i.sG(f,"Review pending operations")
s=t.C
A.z(f,"click",s.i("~(1)?").a(new A.ja(this)),!1,s.c)
r.parentElement.appendChild(f).toString
g=f}if(g!=null){s=g.style
s.toString
o=k&&j>0?"inline-block":"none"
s.display=o}},
dl(){var s,r,q,p,o,n,m,l,k,j,i,h,g="collection-review-modal",f="house_id",e="sync_error",d=$.J()
if(!d.P())return
s=document
r=s.getElementById(g)
if(r!=null)J.iy(r)
q=s.createElement("div")
q.id=g
q.className="modal-overlay"
r=q.style
r.display="flex"
p=s.createElement("div")
p.className="offline-card"
r=p.style
r.maxHeight="80vh"
B.n.ck(r,B.n.c_(r,"overflow-y"),"auto","")
r=s.createElement("h2")
r.toString
B.v.sG(r,"Pending operation review")
p.appendChild(r).toString
r=s.createElement("p")
r.toString
B.l.sG(r,"These records remain saved. Review rejected readings or payments with Admin, then retry. Record IDs are preserved.")
p.appendChild(r).toString
for(d=d.aY(),r=A.E(d),o=r.i("F(1)").a(new A.j6()),d=B.b.gB(d),r=new A.ay(d,o,r.i("ay<1>"));r.p();){o=d.gt(0)
n=s.createElement("p")
n.toString
m=J.y(o)
B.l.sG(n,A.e(m.h(o,f))+" | "+A.e(m.h(o,"amount_collected"))+" | "+A.e(m.h(o,"transaction_id"))+"\n"+A.e(m.h(o,e)))
p.appendChild(n).toString}for(d=$.J().ah(),r=A.E(d),o=r.i("F(1)").a(new A.j7()),d=B.b.gB(d),r=new A.ay(d,o,r.i("ay<1>")),o=t.f;r.p();){n=d.gt(0)
m=J.y(n)
l=o.a(m.h(n,"body"))
k=B.ao.h(0,m.h(n,"endpoint"))
if(k==null)k="Saved operation"
j=s.createElement("p")
j.toString
i=J.y(l)
h=i.h(l,f)
i=h==null?i.h(l,"household_id"):h
B.l.sG(j,k+" | "+A.e(i==null?"":i)+" | "+A.e(m.h(n,"operation_id"))+"\n"+A.e(m.h(n,e)))
p.appendChild(j).toString}d=s.createElement("button")
d.toString
B.i.sG(d,"Retry pending operations")
r=t.C
o=r.i("~(1)?")
r=r.c
A.z(d,"click",o.a(new A.j8(this,d)),!1,r)
p.appendChild(d).toString
d=s.createElement("button")
d.toString
B.i.sG(d,"Close")
A.z(d,"click",o.a(new A.j9(q)),!1,r)
p.appendChild(d).toString
q.appendChild(p).toString
s.body.appendChild(q).toString},
fV(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this,a3="click",a4="change"
a2.fg()
a2.f0()
s=document
r=t.o
q=r.a(s.getElementById("btn-login"))
p=t.G
o=p.a(s.getElementById("employee-id"))
n=p.a(s.getElementById("login-password"))
m=s.getElementById("login-error-msg")
l=s.getElementById("btn-toggle-web-pw")
if(l!=null){k=J.a4(l)
j=k.$ti
A.z(k.a,k.b,j.i("~(1)?").a(new A.jc(l)),!1,j.c)}if(q!=null){k=t.C
A.z(q,a3,k.i("~(1)?").a(new A.jd(a2,o,n,m,q)),!1,k.c)}i=r.a(s.getElementById("btn-logout"))
if(i!=null){k=t.C
A.z(i,a3,k.i("~(1)?").a(new A.je(a2)),!1,k.c)}h=r.a(s.getElementById("btn-resident-logout"))
if(h!=null){k=t.C
A.z(h,a3,k.i("~(1)?").a(new A.jh(a2)),!1,k.c)}k=t.h
A.eO(k,k,"T","querySelectorAll")
k=s.querySelectorAll(".nav-tab")
k.toString
g=new A.bn(k,t.U)
g.q(g,new A.ji(a2))
f=p.a(s.getElementById("dir-search"))
p=t.Y
e=p.a(s.getElementById("filter-purok"))
d=p.a(s.getElementById("filter-status"))
if(f!=null){p=t.E
A.z(f,"input",p.i("~(1)?").a(new A.jj(a2)),!1,p.c)}if(e!=null){p=t.E
A.z(e,a4,p.i("~(1)?").a(new A.jk(a2)),!1,p.c)}if(d!=null){p=t.E
A.z(d,a4,p.i("~(1)?").a(new A.jl(a2)),!1,p.c)}c=s.getElementById("btn-close-modal")
if(c!=null){p=J.a4(c)
k=p.$ti
A.z(p.a,p.b,k.i("~(1)?").a(new A.jm(a2)),!1,k.c)}b=s.getElementById("house-detail-modal")
if(b!=null){p=J.a4(b)
k=p.$ti
A.z(p.a,p.b,k.i("~(1)?").a(new A.jn(b)),!1,k.c)}a=t.aa.a(s.getElementById("modal-leak-toggle"))
if(a!=null){p=t.E
A.z(a,a4,p.i("~(1)?").a(new A.jo(a2,a)),!1,p.c)}a0=r.a(s.getElementById("btn-submit-log"))
if(a0!=null){p=t.C
A.z(a0,a3,p.i("~(1)?").a(new A.jf(a2)),!1,p.c)}a1=r.a(s.getElementById("btn-broadcast-announcement"))
if(a1!=null){s=t.C
A.z(a1,a3,s.i("~(1)?").a(new A.jg(a2,a1)),!1,s.c)}a2.hj()},
hj(){var s,r,q,p=document,o=p.getElementById("web-modal-forgot-pw")
o.toString
s=new A.jC(o)
r=p.getElementById("btn-web-forgot-password")
if(r!=null){r=J.a4(r)
q=r.$ti
A.z(r.a,r.b,q.i("~(1)?").a(new A.jD(o)),!1,q.c)}p=p.getElementById("btn-web-recover-cancel")
if(p!=null){p=J.a4(p)
r=p.$ti
A.z(p.a,p.b,r.i("~(1)?").a(new A.jE(s)),!1,r.c)}p=J.pm(o)
o=p.$ti
A.z(p.a,p.b,o.i("~(1)?").a(new A.jF(s)),!1,o.c)
this.hi()},
bD(){var s,r;++this.p1
this.k4=null
s=document
r=t.O.a(s.activeElement)
if(r!=null)r.blur()
r=s.getElementById("web-modal-change-password")
if(r!=null){r=r.style
r.display="none"}t.h4.a(s.getElementById("web-change-password-form")).reset()},
e0(a){var s,r,q,p,o,n,m="change-current-password",l="change-new-password";++this.p1
this.k4=a
s=a==null
r=!s
q=document
t.h4.a(q.getElementById("web-change-password-form")).reset()
p=q.getElementById("change-password-title")
if(p!=null)J.q(p,r?"Create New Password":"Change Password")
p=q.getElementById("change-password-help")
if(p!=null)J.q(p,r?"Create a new password before using your account. Your temporary sign-in expires after 15 minutes.":"Confirm your current password. After saving, sign in with the new password.")
p=q.getElementById("change-current-field")
if(p!=null)p.hidden=r
p=t.S
o=p.a(q.getElementById(m))
o.required=s
B.f.sh7(o,r)
s=q.getElementById("btn-change-password-cancel")
if(s!=null)J.q(s,r?"Return to Login":"Cancel")
s=q.getElementById("change-password-error")
if(s!=null)s.hidden=!0
for(s=[m,l,"change-confirm-password"],n=0;n<3;++n)B.f.sbl(p.a(q.getElementById(s[n])),"password")
s=q.getElementById("web-modal-change-password")
if(s!=null){s=s.style
s.display="flex"}s=q.getElementById(r?l:m)
if(s!=null)J.oq(s)},
hx(){return this.e0(null)},
hi(){var s,r,q,p,o,n,m,l=this,k=document,j=k.getElementById("web-modal-change-password")
j.toString
s=t.h4.a(k.getElementById("web-change-password-form"))
r=t.f_.a(k.getElementById("btn-change-password-save"))
q=k.getElementById("change-password-error")
q.toString
for(p=["btn-worker-change-password","btn-resident-change-password"],o=0;o<2;++o){n=k.getElementById(p[o])
if(n!=null){n=J.a4(n)
m=n.$ti
A.z(n.a,n.b,m.i("~(1)?").a(new A.jx(l)),!1,m.c)}}p=k.getElementById("btn-change-password-cancel")
if(p!=null){p=J.a4(p)
n=p.$ti
A.z(p.a,p.b,n.i("~(1)?").a(new A.jy(l)),!1,n.c)}j=J.pm(j)
p=j.$ti
A.z(j.a,j.b,p.i("~(1)?").a(new A.jz(l)),!1,p.c)
p=t.E
j=p.i("~(1)?")
p=p.c
A.z(t.S.a(k.getElementById("change-show-password")),"change",j.a(new A.jA()),!1,p)
A.z(s,"submit",j.a(new A.jB(l,q,s,r)),!1,p)},
ai(a,b){var s
if(b!=null){J.q(b,a)
s=b.style
s.display="block"}},
aC(){},
bw(a){var s="WaterHallPush",r=$.bx()
if(r.bf(s))r.h(0,s).aq("registerSubscription",A.B([a],t.s))},
bd(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b="none",a=document,a0=a.getElementById("announcement-history")
if(a0!=null)J.cL(a0).X(0)
for(a0=["resident-profile-name","resident-profile-account","resident-profile-avatar"],s=0;s<3;++s){r=a.getElementById(a0[s])
if(r!=null)J.q(r,"--")}a0=c.k3
a0===$&&A.aA()
new A.b2(a0,A.C(a0).i("b2<2>")).q(0,new A.jp())
a0=c.CW
a0===$&&A.aA()
J.cd(a0).m(0,"active")
a0=c.CW.style
a0.display="flex"
c.b="view-login"
a0=c.go
a0===$&&A.aA()
a0=a0.style
a0.display=b
a0=c.id
a0===$&&A.aA()
a0=a0.style
a0.display=b
a0=c.k1
a0===$&&A.aA()
if(a0!=null){a0=a0.style
a0.display=b}a0=t.G
q=a0.a(a.getElementById("employee-id"))
p=a0.a(a.getElementById("login-password"))
o=a.getElementById("login-error-msg")
if(q!=null)B.f.sM(q,"")
if(p!=null)B.f.sM(p,"")
if(o!=null){r=o.style
r.display=b}r=t.r
n=r.a(a.getElementById("resident-log-desc"))
if(n!=null)B.o.sM(n,"")
m=a.getElementById("resident-photo-name")
if(m!=null)J.q(m,"No file chosen")
l=a.getElementById("resident-photo-preview")
if(l!=null){k=l.style
k.display=b
k=l.style
k.backgroundImage=""
J.cL(l).X(0)}j=a0.a(a.getElementById("dir-search"))
if(j!=null)B.f.sM(j,"")
i=a0.a(a.getElementById("bill-meter-search"))
if(i!=null)B.f.sM(i,"")
h=a0.a(a.getElementById("bill-curr-input"))
if(h!=null)B.f.sM(h,"")
g=r.a(a.getElementById("worker-announcement-input"))
if(g!=null)B.o.sM(g,"")
f=a.getElementById("resident-logout-name")
e=a.getElementById("resident-logout-role")
d=a.getElementById("resident-logout-avatar")
if(f!=null)J.q(f,"---")
if(e!=null)J.q(e,"---")
if(d!=null)J.q(d,"--")},
cU(a){var s,r,q,p,o,n,m,l=this
t.P.a(a)
s=t.d.a(window.location).href
s.toString
if(A.cw(s).gal().h(0,"role")==="resident"){A.ca("[SECURITY] Resident application is forbidden from loading Worker Portal.")
return}s=l.CW
s===$&&A.aA()
J.cd(s).C(0,"active")
s=l.CW.style
s.display="none"
s=l.k3
s===$&&A.aA()
new A.b2(s,A.C(s).i("b2<2>")).q(0,new A.kA())
l.d=null
s=window.localStorage
s.toString
B.k.C(s,"waterhall_resident_session")
s=l.go
s===$&&A.aA()
s=s.style
s.display="flex"
s=l.id
s===$&&A.aA()
s.setAttribute("style","display: none !important")
s=l.k1
s===$&&A.aA()
if(s!=null){s=s.style
s.display="none"}l.a=a
s=window.localStorage
s.toString
s.setItem("waterhall_session",B.c.V(a))
s=t.L
r=A.a3(new A.I(A.B(J.M(a.h(0,"name")).split(" "),t.s),t.Q.a(new A.kB()),s),s.i("h.E"))
s=A.E(r)
q=new A.a1(r,s.i("c(1)").a(new A.kC()),s.i("a1<1,c>")).a_(0,"")
s=q.length
s=B.a.n(q,0,s<2?s:2)
p=document
o=p.getElementById("worker-logout-name")
n=p.getElementById("worker-logout-role")
m=p.getElementById("worker-logout-avatar")
if(o!=null)J.q(o,A.al(a.h(0,"name")))
if(n!=null){p=a.h(0,"role")
J.q(n,A.al(p==null?"Field Worker":p))}if(m!=null)J.q(m,s.toUpperCase())
l.aj("view-dashboard")
l.bP()
l.aW()
l.cI()
l.hh()},
aj(a){var s,r,q,p,o,n,m=this,l="view-resident-home",k="view-resident-ledger",j="view-resident-support",i="view-resident-profile",h="view-transactions",g="house_id"
if(m.a==null&&m.d==null&&a!=="view-login"){m.bd()
return}s=t.d.a(window.location).href
s.toString
r=A.cw(s).gal().h(0,"role")
if(r==="worker")s=a===l||a===k||a===j||a===i
else s=!1
if(s){A.ca("[SECURITY] Worker application is forbidden from switching to Resident tab "+a+".")
return}if(r==="resident")s=a==="view-dashboard"||a==="view-billing"||a==="view-profile"||a===h||a==="view-directory"||a==="view-assets"||a==="view-worker-resident-details"
else s=!1
if(s){A.ca("[SECURITY] Resident application is forbidden from switching to Worker tab "+a+".")
return}m.b=a
s=document
s.toString
q=t.h
A.eO(q,q,"T","querySelectorAll")
q=s.querySelectorAll(".nav-tab")
q.toString
p=new A.bn(q,t.U)
p.q(p,new A.kJ(a))
q=m.k3
q===$&&A.aA()
q.q(0,new A.kK(a))
if(a==="view-dashboard")m.bP()
else if(a==="view-directory")m.aW()
else if(a==="view-announcements")m.e3()
else if(a===i)m.bQ()
else if(a!=="view-assets")if(a==="view-profile")m.cI()
else if(a===h){m.am()
m.cD()}else if(a==="view-billing"){if(m.ry==null){o=$.J().a
q=o.length
if(q!==0){if(0>=q)return A.d(o,0)
m.ry=A.al(J.j(o[0],g))
n=t.G.a(s.getElementById("bill-meter-search"))
if(n!=null){if(0>=o.length)return A.d(o,0)
s=A.e(J.j(o[0],"owner_name"))
if(0>=o.length)return A.d(o,0)
B.f.sM(n,s+" ("+A.e(J.j(o[0],g))+")")}}}m.bO(m.ry)}else if(a===l||a===k||a===j)m.bQ()},
bP(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1=this,b2="worker",b3="var(--alert-green)",b4=".alert-widget-title",b5="var(--amber-safety)"
if(b1.a==null)return
s=document
r=s.getElementById("dash-worker-title")
if(r!=null)J.q(r,"WaterHall Field Terminal")
q=$.J()
p=q.cQ(b2)
if(q.x)b1.dj(p,b2)
o=s.getElementById("worker-announcement-banner")
n=s.getElementById("worker-announcement-message")
m=s.getElementById("worker-announcement-tag")
if(o!=null&&n!=null)if(p!=null&&A.x(J.j(p,"message")).length!==0){l=J.y(p)
J.q(n,A.x(l.h(p,"message")))
if(m!=null){k=l.h(p,"target_audience")
if(k==null)k="Everyone"
j=l.h(p,"author")
J.q(m,A.e(j==null?"Admin":j)+" \u2022 "+b1.a5(l.h(p,"timestamp"))+" \u2022 "+A.e(k))}l=o.style
l.display="flex"}else{l=o.style
l.display="none"}i=q.a
h=q.b
g=q.c
f=s.getElementById("worker-tank-val")
e=s.getElementById("worker-safety-status")
b1.cg(b2,h,f,s.getElementById("worker-turb-val"),s.getElementById("worker-tds-val"),e)
q=A.E(i)
l=q.i("I<1>")
d=A.a3(new A.I(i,q.i("F(1)").a(new A.k9()),l),l.i("h.E"))
c=A.B([],t.hq)
if(J.i(h.h(0,"turbidity_status"),"warning")){q=t.N
B.b.m(c,A.a6(["type","quality","name","Elevated Turbidity Index (Provisional)","desc",A.x(h.h(0,"turbidity_desc"))],q,q))
b=1}else b=0
a=d.length+b
a0=s.getElementById("dash-alert-count")
if(a0!=null)J.q(a0,B.e.l(a))
a1=s.getElementById("dashboard-alert-widget")
a2=s.getElementById("dash-alert-list")
if(a1!=null&&a2!=null){q=J.K(a2)
q.sU(a2,"")
if(a===0){l=a1.style
l.borderColor=b3
a3=t.O.a(a1.querySelector(b4))
if(a3!=null){l=a3.style
l.color=b3}q.sU(a2,'          <div class="alert-item" style="border-left-color: var(--alert-green); background-color: rgba(16, 185, 129, 0.05)">\n            <div class="alert-item-icon">\n              <svg style="fill: var(--alert-green)" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n            </div>\n            <div class="alert-item-text" style="color: var(--text-on-dark)">'+(J.i(h.h(0,"has_reading"),!1)?"No leak reports. Water quality is awaiting sensor readings.":"No leak reports or configured water-quality alerts in the latest data.")+"</div>\n          </div>\n        ")}else{q=a1.style
q.borderColor=b5
a3=t.O.a(a1.querySelector(b4))
if(a3!=null){q=a3.style
q.color=b5}B.b.q(d,new A.ka(b1,a2))
B.b.q(c,new A.kb(b1,a2))}}a4=J.pG(8,t.N)
for(a5=0;a5<8;a5=a6){a6=a5+1
a4[a5]="Purok "+a6}new A.ct(a4,A.E(a4).i("ct<1>")).q(0,new A.kc(b1,i))
a7=s.getElementById("dashboard-zone-grid")
if(a7!=null){J.dv(a7,"")
B.b.q(a4,new A.kd(b1,i,a7))}a8=s.getElementById("dash-log-count")
a9=s.getElementById("dash-log-list")
if(a9!=null){s=J.K(a9)
s.sU(a9,"")
b0=A.e8(g,0,A.ds(3,"count",t.q),A.E(g).c).az(0)
if(a8!=null)J.q(a8,""+g.length+" logged")
if(b0.length===0)s.sU(a9,'<div class="log-card" style="color:var(--text-muted)">No maintenance activity logged yet.</div>')
else B.b.q(b0,new A.ke(b1,i,a9))}},
a5(a){var s=$.bx().h(0,"WaterHallDisplay"),r=a==null?null:J.M(a)
return J.M(s.aq("formatTimestamp",A.B([r==null?"":r,"Unknown date"],t.s)))},
aW(){var s,r,q,p,o,n,m=null,l=$.J().a,k=document,j=t.G.a(k.getElementById("dir-search")),i=t.Y,h=i.a(k.getElementById("filter-purok")),g=i.a(k.getElementById("filter-status"))
if(j==null)s=m
else{i=j.value
i=i==null?m:B.a.A(i.toLowerCase())
s=i}if(s==null)s=""
r=h==null?m:h.value
if(r==null)r="all"
q=g==null?m:g.value
if(q==null)q="all"
p=k.getElementById("dir-empty-state")
o=k.getElementById("dir-household-list")
if(o==null)return
J.dv(o,"")
k=A.E(l)
i=k.i("I<1>")
n=A.a3(new A.I(l,k.i("F(1)").a(new A.kg(s,r,q)),i),i.i("h.E"))
if(n.length===0){if(p!=null){k=p.style
k.display="block"}}else{if(p!=null){k=p.style
k.display="none"}B.b.q(n,new A.kh(this,o))}},
cF(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
this.c=a
s=$.J()
r=s.a2(a)
if(r==null)return
q=document
p=q.getElementById("worker-res-name")
o=q.getElementById("worker-res-acct")
n=q.getElementById("worker-res-leak-status")
m=q.getElementById("worker-res-consumption")
l=q.getElementById("worker-res-total")
if(p!=null)J.q(p,A.al(J.j(r,"owner_name")))
if(o!=null)J.q(o,A.al(J.j(r,"account_number")))
k=s.r.h(0,"allow_worker_collection")==="true"
j=t.o.a(q.getElementById("btn-open-collect-modal"))
i=j==null
if(!i)j.disabled=!k
if(!i){h=j.style
h.toString
g=k?"1":"0.55"
B.n.ck(h,B.n.c_(h,"opacity"),g,"")}if(!i){h=j.style
h.toString
g=k?"pointer":"default"
h.cursor=g}if(!i)B.i.shL(j,k?"Record an authorized collection":"Payments must be made at Barangay Hall.")
i=q.getElementById("worker-collection-policy")
if(i!=null)J.q(i,k?"Field collection is enabled by Admin. Payments remain pending until the server confirms synchronization.":"Barangay policy: make payments in person at Barangay Hall. Field collection is disabled.")
f=s.bV(a)
e=f.length!==0?B.b.gD(f):null
if(m!=null)J.q(m,e==null?"--":B.d.H(A.ac(J.j(e,"consumption")),3))
if(l!=null)J.q(l,e==null?"No billing record":B.d.H(A.ac(J.j(e,"total_due")),2))
if(n!=null){s=J.K(n)
if(J.i(J.j(r,"current_leak_status"),"leak")){s.sU(n,'<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--alert-red)"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> <span style="color:var(--alert-red);font-weight:700">Leak Alert Detected</span>')
s=n.style
s.backgroundColor="var(--alert-red-bg)"
s=n.style
s.border="1px solid var(--alert-red)"}else{s.sU(n,'<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--alert-green)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <span style="color:var(--alert-green);font-weight:700">No leak reported</span>')
s=n.style
s.backgroundColor="var(--alert-green-bg)"
s=n.style
s.border="1px solid rgba(16, 185, 129, 0.3)"}}this.aj("view-worker-resident-details")
s=q.getElementById("btn-back-to-dir")
if(s!=null){s=J.a4(s)
q=s.$ti
A.z(s.a,s.b,q.i("~(1)?").a(new A.jV(this)),!1,q.c)}},
eg(a){var s=document,r=s.getElementById("modal-leak-title"),q=s.getElementById("modal-leak-desc")
if(r==null||q==null)return
s=J.K(r)
if(a==="leak"){s.sG(r,"Leak status: LEAK REPORTED")
s=r.style
s.color="var(--alert-red)"
J.q(q,"A leak has been reported. Inspect the water line on site.")}else{s.sG(r,"Leak status: NO REPORT")
s=r.style
s.color="var(--alert-green)"
J.q(q,"No leak is currently reported. This is not an automatic sensor assessment.")}},
hH(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e="var(--amber-safety)",d={}
t.oT.a(a)
s=document.getElementById(b)
if(s==null)return
r=J.K(s)
r.sU(s,"")
if(a.length===0){r.sU(s,'<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:12px">No historic telemetry available.</div>')
return}q=B.d.cq(B.b.hB(a,new A.ku())*1.1,10,1000)
p=new A.ct(a,A.E(a).i("ct<1>"))
o=p.gaF(p).av(0,new A.kv(a,q),t.c).az(0)
p=A.E(o)
n=p.i("c(1)")
p=p.i("a1<1,c>")
m=new A.a1(o,n.a(new A.kw()),p).a_(0," ")
if(0>=o.length)return A.d(o,0)
l=B.d.H(A.ac(J.j(o[0],"x")),1)
k=B.e.H(80,1)
p=new A.a1(o,n.a(new A.kx()),p).a_(0," ")
n=o.length
j=n-1
if(!(j>=0))return A.d(o,j)
j=B.d.H(A.ac(J.j(o[j],"x")),1)
n=B.e.H(80,1)
i=b==="resident-chart-container"
h=i?"res-chart-grad":"chart-area-grad"
g=i?"#3B82F6":e
f=i?"#3B82F6":e
d.a='      <svg width="100%" height="100%" viewBox="0 0 340 100" style="overflow:visible">\n        <defs>\n          <linearGradient id="'+h+'" x1="0" y1="0" x2="0" y2="1">\n            <stop offset="0%" stop-color="'+f+'" stop-opacity="0.3"/>\n            <stop offset="100%" stop-color="'+f+'" stop-opacity="0.0"/>\n          </linearGradient>\n        </defs>\n\n        <line x1="20" y1="20" x2="320" y2="20" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="50" x2="320" y2="50" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="80" x2="320" y2="80" stroke="#CBD5E1" stroke-width="1.5"/>\n\n        <path d="'+("M "+l+","+k+" "+p+(" L "+j+","+n+" Z"))+'" fill="url(#'+h+')" />\n        <polyline points="'+m+'" fill="none" stroke="'+g+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>\n    '
B.b.q(o,new A.ky(d,g))
r.sU(s,d.a+="</svg>")},
e4(a){var s,r,q,p,o,n=document.getElementById("modal-historical-logs")
if(n==null)return
s=J.K(n)
s.sU(n,"")
r=$.J().c
q=A.E(r)
p=q.i("I<1>")
o=A.a3(new A.I(r,q.i("F(1)").a(new A.ki(a)),p),p.i("h.E"))
if(o.length===0)s.sU(n,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous repair logs recorded for this meter.</div>')
else B.b.q(o,new A.kj(this,n))},
cI(){var s,r,q,p,o,n,m,l,k,j,i,h,g=this
if(g.a==null)return
s=document
r=s.getElementById("worker-name")
q=s.getElementById("worker-role")
p=s.getElementById("worker-avatar")
if(r!=null)J.q(r,A.al(g.a.h(0,"name")))
if(q!=null)J.q(q,A.al(g.a.h(0,"role")))
if(p!=null){o=t.L
n=A.a3(new A.I(A.B(J.M(g.a.h(0,"name")).split(" "),t.s),t.Q.a(new A.kk()),o),o.i("h.E"))
o=A.E(n)
m=new A.a1(n,o.i("c(1)").a(new A.kl()),o.i("a1<1,c>")).a_(0,"")
o=m.length
J.q(p,B.a.n(m,0,o<2?o:2).toUpperCase())}o=$.J()
l=o.a.length
o=o.c
k=A.E(o)
j=new A.I(o,k.i("F(1)").a(new A.km(g)),k.i("I<1>")).gj(0)
i=s.getElementById("profile-stat-total")
h=s.getElementById("profile-stat-logs")
if(i!=null)J.q(i,B.e.l(l))
if(h!=null)J.q(h,B.e.l(j))},
hk(){var s,r=this,q=document,p=q.getElementById("transaction-filter")
if(p!=null){p=J.rU(p)
s=p.$ti
A.z(p.a,p.b,s.i("~(1)?").a(new A.jH(r)),!1,s.c)}p=q.getElementById("transaction-search")
if(p!=null){p=J.rV(p)
s=p.$ti
A.z(p.a,p.b,s.i("~(1)?").a(new A.jI(r)),!1,s.c)}p=q.getElementById("transaction-more")
if(p!=null){p=J.a4(p)
s=p.$ti
A.z(p.a,p.b,s.i("~(1)?").a(new A.jJ(r)),!1,s.c)}q=q.getElementById("transaction-previous")
if(q!=null){q=J.a4(q)
p=q.$ti
A.z(q.a,q.b,p.i("~(1)?").a(new A.jK(r)),!1,p.c)}},
bg(a){return this.hq(a)},
cD(){return this.bg(!1)},
hq(a){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c
var $async$bg=A.T(function(b,a0){if(b===1){o.push(a0)
s=p}for(;;)switch(s){case 0:e=document
d=t.g.a(e.getElementById("transaction-filter")).value
if(m.a==null||!$.J().x||d==="Pending Sync"||d==="Failed Sync"){++m.p4
m.R8=!1
m.p2=null
m.am()
s=1
break}l=++m.p4
k=window.localStorage.getItem("waterhall_jwt")
if(!a){m.p2=null
m.p3=0}m.R8=!0
m.RG=null
m.am()
p=4
h=t.S.a(e.getElementById("transaction-search")).value
j=h==null?"":h
e=$.J()
g=a?m.p2:null
s=7
return A.w(e.be(g,j),$async$bg)
case 7:i=a0
if(!J.i(l,m.p4)||!J.i(k,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}m.p2=A.nL(J.j(i,"next_cursor"))
if(a&&m.cs().length>m.p3+25)m.p3+=25
n.push(6)
s=5
break
case 4:p=3
c=o.pop()
if(J.i(l,m.p4))m.RG="History could not load. Saved device records remain available; reopen Transactions to retry."
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.i(l,m.p4)){m.R8=!1
m.am()}s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$bg,r)},
cs(){var s,r,q,p=document,o=t.g.a(p.getElementById("transaction-filter")).value
if(o==null)o="All"
p=t.S.a(p.getElementById("transaction-search")).value
p=B.a.A(p==null?"":p)
s=$.J().hO()
r=A.E(s)
q=r.i("I<1>")
p=A.a3(new A.I(s,r.i("F(1)").a(new A.jq(o,p.toLowerCase())),q),q.i("h.E"))
return p},
am(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d="house_id",c=document,b=c.getElementById("transaction-list")
if(b==null||e.a==null)return
s=t.g.a(c.getElementById("transaction-filter")).value
if(s==null)s="All"
r=J.K(b)
r.gbC(b).X(0)
q=e.cs()
for(p=A.e8(q,e.p3,null,A.E(q).c).hK(0,25),o=p.$ti,p=new A.bi(p,p.gj(0),o.i("bi<a7.E>")),n=t.N,m=t.z,o=o.i("a7.E");p.p();){l=p.d
if(l==null)l=o.a(l)
k=c.createElement("div")
k.className="bill-record-card"
j=c.createElement("h3")
j.toString
i=J.y(l)
h=i.h(l,"family_head_name")
if(h==null){h=$.J().a2(A.e(i.h(l,d)))
h=h==null?null:J.j(h,"owner_name")}B.v.sG(j,A.e(h==null?"Household":h)+" \xb7 "+A.e(i.h(l,d)))
k.appendChild(j).toString
j=c.createElement("p")
j.toString
B.l.sG(j,A.e(i.h(l,"sync_status"))+" \xb7 Billing status: "+A.e(i.h(l,"status")))
k.appendChild(j).toString
g=c.createElement("div")
g.className="transaction-details"
A.a6(["Meter",i.h(l,"account_number"),"Previous reading",i.h(l,"previous_reading"),"Current reading",i.h(l,"current_reading"),"Consumption (m\xb3)",i.h(l,"consumption"),"Bill amount (PHP)",i.h(l,"total_due"),"Billing date",e.a5(i.h(l,"date")),"Reference",i.h(l,"bill_id"),"Operation",i.h(l,"operation_id")],n,m).q(0,new A.kz(g))
k.appendChild(g).toString
b.appendChild(k).toString}p=c.getElementById("transaction-message")
if(p!=null){o=e.RG
if(o==null)if(e.R8)r="Loading history\u2026"
else if(!$.J().x)r="Offline Mode \u2014 showing saved device history."
else{r=r.gbC(b)
r=r.gE(r)?"No matching transactions.":"Page "+(B.e.ad(e.p3,25)+1)+" \u2014 newest bills first."}else r=o
J.q(p,r)}r=t.f_
f=r.a(c.getElementById("transaction-more"))
if(q.length<=e.p3+25)p=!$.J().x||e.p2==null||s==="Pending Sync"||s==="Failed Sync"
else p=!1
f.hidden=p
f.disabled=e.R8
r.a(c.getElementById("transaction-previous")).hidden=e.p3===0},
hh(){var s,r,q,p,o,n,m,l,k,j,i=this,h="house_id"
if(i.to)return
i.to=!0
for(s=["name","id"],r=0;r<2;++r){q=s[r]
p=document.getElementById("bill-search-"+q)
if(p!=null){p=J.a4(p)
o=p.$ti
A.z(p.a,p.b,o.i("~(1)?").a(new A.jr(i,q)),!1,o.c)}}s=document
p=t.G
n=p.a(s.getElementById("bill-meter-search"))
m=s.getElementById("bill-meter-results")
l=p.a(s.getElementById("bill-curr-input"))
k=t.o.a(s.getElementById("btn-save-bill"))
if(n==null)return
p=t.E
o=p.i("~(1)?")
p=p.c
A.z(n,"focus",o.a(new A.js(i)),!1,p)
A.z(n,"input",o.a(new A.jt(i)),!1,p)
if(l!=null)A.z(l,"input",o.a(new A.ju(i)),!1,p)
A.z(s,"click",t.b9.a(new A.jv(n,m)),!1,t.V)
if(k!=null){s=t.C
A.z(k,"click",s.i("~(1)?").a(new A.jw(i)),!1,s.c)}j=$.J().a
s=j.length
if(s!==0){if(0>=s)return A.d(j,0)
i.ry=A.al(J.j(j[0],h))
if(0>=j.length)return A.d(j,0)
s=A.e(J.j(j[0],"owner_name"))
if(0>=j.length)return A.d(j,0)
B.f.sM(n,s+" ("+A.e(J.j(j[0],h))+")")
i.bO(i.ry)}},
cV(){var s,r,q,p,o,n,m,l,k,j,i,h="owner_name",g="house_id",f="search-result-item",e=document,d=t.G.a(e.getElementById("bill-meter-search")),c=e.getElementById("bill-meter-results")
if(d==null||c==null)return
s=d.value
r=s==null?null:B.a.A(s.toLowerCase())
if(r==null)r=""
s=this.ry
q=s==null?null:$.J().a2(s)
J.cL(c).X(0)
if(q==null)p=""
else{s=J.y(q)
p=A.e(s.h(q,h))+" ("+A.e(s.h(q,g))+")"}if(r.length===0||d.value===p){e=c.style
e.display="none"
return}s=$.J().a
o=A.E(s)
n=o.i("F(1)").a(new A.kD(this,r))
m=A.oF(t.N)
for(s=B.b.gB(s),o=new A.ay(s,n,o.i("ay<1>")),n=t.C,l=n.i("~(1)?"),n=n.c;o.p();){k=s.gt(0)
j=J.y(k)
if(!m.m(0,A.e(j.h(k,g))))continue
i=e.createElement("button")
i.type="button"
i.className=f
B.i.sG(i,A.e(j.h(k,h))+" ("+A.e(j.h(k,g))+")")
A.z(i,"click",l.a(new A.kE(this,d,k,c)),!1,n)
c.appendChild(i).toString}if(m.a===0){e=e.createElement("div")
e.className=f
B.H.sG(e,$.J().x?"No households found":"No matching cached households. Reconnect to check availability.")
c.appendChild(e).toString}e=c.style
e.display="block"},
bO(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=a!=null
if(c)d.ry=a
s=d.ry
if(s==null)return
r=$.J()
q=r.a2(s)
if(q==null)return
s=document
p=s.getElementById("bill-prev-reading")
o=t.G.a(s.getElementById("bill-curr-input"))
n=s.getElementById("bill-selected-details")
if(n!=null){s=r.cP()
m=A.E(s)
l=m.i("I<1>")
k=A.a3(new A.I(s,m.i("F(1)").a(new A.jX(d)),l),l.i("h.E"))
B.b.aM(k,new A.jY())
j=k.length===0?null:B.b.gD(k)
s=A.E(k)
i=new A.I(k,s.i("F(1)").a(new A.jZ()),s.i("I<1>")).ct(0,0,new A.k_(),t.u)
s=J.y(q)
m=A.e(s.h(q,"owner_name"))
l=A.e(s.h(q,"house_id"))
s=A.e(s.h(q,"account_number"))
if(j==null)h="None"
else{h=J.y(j)
h=A.e(h.h(j,"bill_id"))+" / "+A.e(h.h(j,"status"))+" / PHP "+A.e(h.h(j,"total_due"))}g=B.d.H(i,2)
f=r.x?"":" (cached)"
J.q(n,m+" \xb7 "+l+"\nMeter: "+s+"\nCurrent issued bill: "+h+"\nOutstanding balance: PHP "+g+f)}s=d.ry
s.toString
e=r.ey(s)
if(p!=null)J.q(p,e==null?"--":B.d.H(e,3))
if(c&&o!=null)B.f.sM(o,"")
d.bS()
c=d.ry
c.toString
d.hF(c)},
d0(){var s,r,q,p,o,n,m,l,k,j,i=null,h=t.N,g=t.z,f=A.oE($.J().w,h,g),e=document,d=e.getElementById("bill-prev-reading"),c=d==null?i:d.textContent
if(c==null)c=""
e=t.G.a(e.getElementById("bill-curr-input"))
if(e==null)s=i
else{e=e.value
e=e==null?i:B.a.A(e)
s=e}if(s==null)s=""
if(c==="--"||c.length===0||s.length===0)return i
r=A.e2(c)
q=A.e2(s)
if(!J.i(f.h(0,"configured"),!0)||r==null||q==null||!isFinite(r)||r<0||!isFinite(q)||q<0||q<r||q>1e6)return i
p=q*1000
e=B.d.aI(p)
if(Math.abs(p-e)>0.0001)return i
o=e-B.d.aI(r*1000)
if(o<0)return i
n=B.e.ad(B.e.cq(o-B.d.aI(A.bP(A.e(f.h(0,"included_m3")))*1000),0,1e9)*B.d.aI(A.bP(A.e(f.h(0,"excess_rate")))*100)+500,1000)
m=A.bP(B.d.H((B.d.aI(A.bP(A.e(f.h(0,"base_rate")))*100)+B.d.aI(A.bP(A.e(f.h(0,"environmental_fee")))*100)+n)/100,2))
l=A.bP(B.d.H(o/1000,3))
k=A.bP(B.d.H(n/100,2))
j=A.bP(B.d.H(q,3))
return A.a6(["previous_reading",A.bP(B.d.H(r,3)),"current_reading",j,"consumption",l,"excess_charge",k,"total_due",m,"billing_config_version",f.h(0,"version")],h,g)},
bS(){var s,r,q,p,o,n,m,l="configured",k="--",j="included_m3",i="consumption",h="total_due",g=$.J(),f=A.oE(g.w,t.N,t.z),e=this.d0(),d=new A.ad(Date.now(),0,!1),c=""+A.d3(d)+"-"+B.a.bh(B.e.l(A.mj(d)),2,"0"),b=this.ry,a=b!=null&&g.cw(b,c)
g=new A.kL()
g.$2("bill-calc-base",J.i(f.h(0,l),!0)?A.e(f.h(0,"base_rate")):k)
g.$2("bill-calc-fee",J.i(f.h(0,l),!0)?A.e(f.h(0,"environmental_fee")):k)
g.$2("bill-preview-cycle",c)
g.$2("bill-included-volume",J.i(f.h(0,l),!0)?A.e(f.h(0,j))+" m\xb3":k)
g.$2("bill-rate-description",J.i(f.h(0,l),!0)?"Includes "+A.e(f.h(0,j))+" m\xb3; excess at PHP "+A.e(f.h(0,"excess_rate"))+"/m\xb3.":"Admin must confirm billing rates before a bill can be recorded.")
b=e==null
g.$2("bill-calc-consumption",b?"0.000":B.d.H(A.ac(e.h(0,i)),3))
g.$2("bill-calc-excess",b?"0.00":B.d.H(A.ac(e.h(0,"excess_charge")),2))
g.$2("bill-calc-total",b?k:B.d.H(A.ac(e.h(0,h)),2))
s=document
r=t.G.a(s.getElementById("bill-curr-input"))
if(r==null)q=null
else{r=r.value
r=r==null?null:B.a.A(r)
q=r}if(q==null)q=""
r=s.getElementById("bill-prev-reading")
r=r==null?null:r.textContent
p=A.e2(r==null?"":r)
o=A.e2(q)
if(a)n="A bill or pending bill already exists for this billing cycle ("+c+")."
else if(!J.i(f.h(0,l),!0))n="Admin must confirm billing rates before issuing new bills."
else if(q.length===0)n="Enter current reading at or above previous reading (up to 3 decimal places)."
else if(o==null||!isFinite(o)||o<0)n="Enter a valid non-negative reading (up to 3 decimal places)."
else if(p!=null&&o<p)n="Current reading cannot be lower than previous reading ("+B.d.H(p,3)+" m\xb3)."
else n=b?"Reading format invalid. Up to 3 decimal places supported.":"Draft: "+B.d.H(A.ac(e.h(0,i)),3)+" m\xb3 | Total Due: \u20b1"+B.d.H(A.ac(e.h(0,h)),2)
g.$2("billing-alert-banner",n)
m=t.o.a(s.getElementById("btn-save-bill"))
if(m!=null){m.disabled=this.x2||a||b
g=m.style
g.toString
b=m.disabled
b.toString
b=b?"0.5":"1"
B.n.ck(g,B.n.c_(g,"opacity"),b,"")}},
bo(){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$bo=A.T(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:if(m.x2||m.ry==null||m.a==null){s=1
break}l=m.d0()
c=new A.ad(Date.now(),0,!1)
k=""+A.d3(c)+"-"+B.a.bh(B.e.l(A.mj(c)),2,"0")
j=c.ab().aa()
if(l!=null){b=$.J()
a=m.ry
a.toString
a=b.cw(a,k)
b=a}else b=!0
if(b){s=1
break}b=$.J()
a=m.ry
a.toString
i=b.a2(a)
if(i==null){s=1
break}m.x2=!0
m.bS()
h=window.localStorage.getItem("waterhall_jwt")
g=b.x
p=4
f=A.oE(l,t.N,t.z)
J.an(f,"house_id",m.ry)
J.an(f,"account_number",J.j(i,"account_number"))
J.an(f,"billing_month",k)
J.an(f,"date",j)
J.an(f,"billed_by",m.a.h(0,"worker_id"))
s=7
return A.w(b.aO(f),$async$bo)
case 7:e=a3
if(!J.i(h,window.localStorage.getItem("waterhall_jwt"))||m.a==null){n=[1]
s=5
break}if(g&&J.i(J.j(e,"is_synced"),!0))m.F("Bill successfully saved.")
else m.F("Bill saved offline. Pending synchronization.")
d=t.G.a(document.getElementById("bill-curr-input"))
if(d!=null)B.f.sM(d,"")
f=m.ry
f.toString
m.bO(f)
m.cI()
n.push(6)
s=5
break
case 4:p=3
a1=o.pop()
if(J.i(h,window.localStorage.getItem("waterhall_jwt")))m.F("Unable to save the reading. Check storage and your session.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.x2=!1
m.bS()
s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$bo,r)},
hF(a){var s,r,q=document.getElementById("billing-history-list")
if(q==null)return
s=J.K(q)
s.sU(q,"")
r=$.J().bV(a)
if(r.length===0)s.sU(q,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous invoice logs recorded.</div>')
else B.b.q(r,new A.jW(this,q))},
dj(a,b){var s,r="WaterHallPush"
t.dZ.a(a)
s=$.bx()
if(s.bf(r)){s=s.h(0,r)
s.aq("processAnnouncements",A.B([A.m2(a==null?[]:A.B([a],t.t)),b],t.hf))}},
e3(){var s,r,q,p,o,n,m,l=this.d==null?"worker":"resident",k=document,j=k.getElementById("announcement-history")
if(j==null)return
J.cL(j).X(0)
s=$.J().cO(l)
r=J.y(s)
if(r.gE(s)){k=k.createElement("p")
k.className="empty-state"
B.l.sG(k,"No announcements yet. New Barangay updates will appear here.")
j.appendChild(k).toString
return}for(r=r.gB(s);r.p();){q=r.gt(r)
p=k.createElement("div")
p.className="announcement-history-card"
o=k.createElement("p")
o.className="announcement-meta"
n=k.createElement("span")
n.className="announcement-author"
m=J.y(q)
B.w.sG(n,A.e(m.h(q,"author")))
o.appendChild(n).toString
n=k.createElement("span")
n.toString
B.w.sG(n,"\u2022 "+this.a5(m.h(q,"timestamp")))
o.appendChild(n).toString
p.appendChild(o).toString
n=k.createElement("p")
n.toString
B.l.sG(n,A.e(m.h(q,"message")))
p.appendChild(n).toString
j.appendChild(p).toString}},
F(a){var s=document,r=s.getElementById("app-toast"),q=s.getElementById("toast-text")
if(r!=null&&q!=null){J.q(q,a)
J.cd(r).m(0,"show")
s=this.xr
if(s!=null)s.a3(0)
this.xr=A.fX(A.pA(2500,0),new A.kI(r))}},
cW(a){var s,r,q,p,o,n,m,l,k,j=this,i=t.d.a(window.location).href
i.toString
if(A.cw(i).gal().h(0,"role")==="worker"){A.ca("[SECURITY] Worker application is forbidden from loading Resident Portal.")
return}j.d=a
window.localStorage.setItem("waterhall_resident_session",a)
j.a=null
i=window.localStorage
i.toString
B.k.C(i,"waterhall_session")
i=j.CW
i===$&&A.aA()
J.cd(i).C(0,"active")
i=j.CW.style
i.display="none"
i=j.k3
i===$&&A.aA()
new A.b2(i,A.C(i).i("b2<2>")).q(0,new A.kF())
i=j.go
i===$&&A.aA()
i.setAttribute("style","display: none !important")
i=j.id
i===$&&A.aA()
i.setAttribute("style","display: flex !important")
i=j.k1
i===$&&A.aA()
if(i!=null){i=i.style
i.display="none"}s=$.J().a2(a)
if(s!=null){i=document
r=i.getElementById("resident-logout-name")
q=i.getElementById("resident-logout-role")
p=i.getElementById("resident-logout-avatar")
i=J.y(s)
o=i.h(s,"owner_name")
n=J.M(o==null?"":o)
if(r!=null)J.q(r,n.length!==0?n:a)
if(q!=null)J.q(q,A.e(i.h(s,"house_id"))+" \u2022 "+A.e(i.h(s,"purok")))
if(p!=null){i=t.L
m=A.a3(new A.I(A.B(n.split(" "),t.s),t.Q.a(new A.kG()),i),i.i("h.E"))
i=A.E(m)
l=new A.a1(m,i.i("c(1)").a(new A.kH()),i.i("a1<1,c>")).a_(0,"")
i=l.length
k=B.a.n(l,0,i<2?i:2).toUpperCase()
J.q(p,k.length!==0?k:"RES")}}j.aj("view-resident-home")
i=j.at
if(i!=null)i.$0()},
bv(){var s,r,q
if(!A.bw())return
if(this.d!=null)s="resident"
else s=this.a!=null?"worker":null
if(s==null)return
r=$.J().b
q=document
this.cg(s,r,q.getElementById(s+"-tank-val"),q.getElementById(s+"-turb-val"),q.getElementById(s+"-tds-val"),q.getElementById(s+"-safety-status"))},
cg(a7,a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4="WaterHallDisplay",a5="var(--alert-red)",a6="var(--text-muted)"
t.P.a(a8)
s=$.bx()
r=t.gZ
q=s.h(0,a4).aq("telemetryFreshness",A.B([A.m2(a8)],r))
p=J.y(q)
o=J.i(p.h(q,"fresh"),!0)
n=a8.h(0,"last_updated")
m=A.e(n==null?"":n)
l=a8.h(0,"main_tank_level")
new A.j5(o).$4(a9,l,0,"%")
k=s.h(0,a4).aq("turbidityIndexState",A.B([A.m2(a8)],r))
n=J.y(k)
j=n.h(k,"value")
i=A.e(n.h(k,"status"))
h=typeof j=="number"?B.d.H(j,2):"N/A"
n=b0==null
if((n?a3:b0.textContent)!==h)if(!n)J.q(b0,h)
g=s.h(0,a4).aq("tdsIndexState",A.B([A.m2(a8)],r))
r=J.y(g)
f=r.h(g,"value")
e=typeof f=="number"?B.d.H(f,2):"N/A"
n=b1==null
if((n?a3:b1.textContent)!==e)if(!n)J.q(b1,e)
n=document
d=n.getElementById(a7+"-tds-status")
c=A.e(r.h(g,"status"))
r=d==null
if((r?a3:d.textContent)!==c)if(!r)J.q(d,c)
if(!r){r=d.style
r.toString
b=c==="Elevated"?a5:a6
r.color=b}r=b2==null
if((r?a3:b2.textContent)!==i)if(!r)J.q(b2,i)
if(!r){r=b2.style
r.toString
b=i==="Elevated"?a5:a6
r.color=b}if(o)a="Current sensor readings."
else a=J.i(p.h(q,"hasReading"),!0)?"IoT offline.":"Awaiting current sensor readings."
a0=n.getElementById(a7+"-telemetry-freshness")
r=a0==null
if((r?a3:a0.textContent)!==a)if(!r)J.q(a0,a)
a1=n.getElementById(a7+"-reading-time")
a2=this.a5(m)
r=a1==null
if((r?a3:a1.textContent)!==a2)if(!r)J.q(a1,a2)
s.h(0,a4).aq("renderTank",[a7+"-water-tank",l,o])},
bQ(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6=this,b7=null,b8="resident",b9="owner_name",c0="house_id",c1="account_number",c2="purok",c3="payment_location",c4="payment_method",c5="operating_hours",c6="payment_instructions",c7=b6.d
if(c7==null)return
s=$.J()
r=s.a2(c7)
if(r==null)return
q=s.cQ(b8)
if(s.x)b6.dj(q,b8)
c7=document
p=c7.getElementById("resident-announcement-banner")
o=c7.getElementById("resident-announcement-message")
n=c7.getElementById("resident-announcement-tag")
if(p!=null&&o!=null)if(q!=null&&A.x(J.j(q,"message")).length!==0){m=J.y(q)
J.q(o,A.x(m.h(q,"message")))
if(n!=null){l=m.h(q,"target_audience")
if(l==null)l="Everyone"
k=m.h(q,"author")
J.q(n,A.e(k==null?"Admin":k)+" \u2022 "+b6.a5(m.h(q,"timestamp"))+" \u2022 "+A.e(l))}m=p.style
m.display="flex"}else{m=p.style
m.display="none"}b6.cg(b8,s.b,c7.getElementById("resident-tank-val"),c7.getElementById("resident-turb-val"),c7.getElementById("resident-tds-val"),c7.getElementById("resident-safety-status"))
j=c7.getElementById("resident-profile-name-home")
i=c7.getElementById("resident-profile-meta-home")
if(j!=null)J.q(j,A.al(J.j(r,b9)))
if(i!=null){m=J.y(r)
J.q(i,"Resident: "+A.e(m.h(r,c0))+" | Meter: "+A.e(m.h(r,c1))+" | "+A.e(m.h(r,c2)))}h=c7.getElementById("resident-logout-name")
g=c7.getElementById("resident-logout-role")
f=c7.getElementById("resident-logout-avatar")
m=J.y(r)
e=m.h(r,b9)
d=J.M(e==null?"":e)
e=c7.getElementById("resident-profile-name")
if(e!=null)J.q(e,d)
e=c7.getElementById("resident-profile-account")
if(e!=null)J.q(e,A.e(m.h(r,c0))+" \xb7 Meter "+A.e(m.h(r,c1))+" \xb7 "+A.e(m.h(r,c2)))
e=c7.getElementById("resident-profile-avatar")
if(e!=null){c=d.length
if(c===0)c="R"
else{if(0>=c)return A.d(d,0)
c=d[0].toUpperCase()}J.q(e,c)}e=c7.getElementById("resident-report-context")
if(e!=null)J.q(e,"Reporting for "+A.e(m.h(r,c0))+" \xb7 "+A.e(m.h(r,c2)))
if(h!=null)J.q(h,A.al(d.length!==0?d:m.h(r,c0)))
if(g!=null)J.q(g,A.e(m.h(r,c0))+" \u2022 "+A.e(m.h(r,c2)))
if(f!=null){e=t.L
b=A.a3(new A.I(A.B(d.split(" "),t.s),t.Q.a(new A.kn()),e),e.i("h.E"))
e=A.E(b)
a=new A.a1(b,e.i("c(1)").a(new A.ko()),e.i("a1<1,c>")).a_(0,"")
e=a.length
a0=B.a.n(a,0,e<2?e:2).toUpperCase()
J.q(f,a0.length!==0?a0:"RES")}a1=c7.getElementById("resident-leak-flag")
if(a1!=null){e=J.K(a1)
if(J.i(m.h(r,"current_leak_status"),"leak")){e.sU(a1,'          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n          <span>A leak has been reported. Please contact the water service team.</span>\n        ')
a1.className="reservoir-status-banner low"
e=a1.style
e.backgroundColor="var(--alert-red-bg)"
e=a1.style
e.borderColor="rgba(239, 68, 68, 0.3)"
e=a1.style
e.color="var(--alert-red)"}else{e.sU(a1,'          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n          <span>No leak is currently reported. Report any water service concern in Support.</span>\n        ')
a1.className="reservoir-status-banner"
e=a1.style
e.backgroundColor="var(--alert-green-bg)"
e=a1.style
e.borderColor="rgba(16, 185, 129, 0.2)"
e=a1.style
e.color="var(--alert-green)"}}e=b6.d
e.toString
a2=s.bV(e)
a3=B.a.n(new A.ad(Date.now(),0,!1).ab().aa(),0,7)
e=A.E(a2)
c=e.i("F(1)")
e=e.i("I<1>")
a4=e.i("h.E")
a5=A.a3(new A.I(a2,c.a(new A.kp()),e),a4)
a6=A.a3(new A.I(a2,c.a(new A.kq(a3)),e),a4)
if(a5.length!==0)a7=B.b.gD(a5)
else if(a6.length!==0)a7=B.b.gD(a6)
else a7=a2.length!==0?B.b.gD(a2):b7
e=a7==null
c=e?b7:J.j(a7,"billing_breakdown")
t.eO.a(c)
a4=new A.kr()
a8=new A.ks()
a4.$2("resident-bill-cycle",e?"No recorded cycle":A.e(J.j(a7,"billing_month")))
a4.$2("resident-bill-status",e?"No unpaid or current bill":A.e(J.j(a7,"status")))
a4.$2("resident-prev-reading",a8.$2(e?b7:J.j(a7,"previous_reading"),3))
a4.$2("resident-curr-reading",a8.$2(e?b7:J.j(a7,"current_reading"),3))
a4.$2("resident-calc-consumption",a8.$2(e?b7:J.j(a7,"consumption"),3))
a4.$2("resident-calc-total",a8.$2(e?b7:J.j(a7,"total_due"),2))
a9=c==null
a4.$2("resident-calc-base",a8.$2(a9?b7:J.j(c,"base_rate"),2))
a4.$2("resident-calc-fee",a8.$2(a9?b7:J.j(c,"environmental_fee"),2))
a4.$2("resident-calc-excess",a8.$2(a9?b7:J.j(c,"excess_charge"),2))
if(e)b0=b7
else{a8=J.j(a7,"payment_date")
a8=a8==null?b7:J.M(a8)
b0=a8}if(b0==null)b0=""
a4.$2("resident-payment-date",!e&&A.e(J.j(a7,"status")).toLowerCase()==="paid"&&b0.length!==0?b6.a5(b0):"Not paid")
if(e)e="No billing record is on file yet. Amounts appear here after a Worker saves a meter reading."
else if(a9)e="Legacy bill: original total preserved; rate breakdown unavailable."
else{e=J.y(c)
c="Recorded rates: first "+A.e(e.h(c,"included_m3"))+" m\xb3 included; excess PHP "+A.e(e.h(c,"excess_rate"))+"/m\xb3."
e=c}a4.$2("resident-rate-description",e)
b6.hH(A.aO(t.R.a(m.h(r,"monthly_history")),!0,t.u),"resident-chart-container")
b6.hG(a2)
b1=s.r
b2=c7.getElementById("res-payment-location")
b3=c7.getElementById("res-payment-method")
b4=c7.getElementById("res-payment-hours")
b5=c7.getElementById("res-payment-instructions")
if(b2!=null&&b1.N(0,c3)){c7=b1.h(0,c3)
c7.toString
J.q(b2,c7)}if(b3!=null&&b1.N(0,c4)){c7=b1.h(0,c4)
c7.toString
J.q(b3,c7)}if(b4!=null&&b1.N(0,c5)){c7=b1.h(0,c5)
c7.toString
J.q(b4,c7)}if(b5!=null&&b1.N(0,c6)){c7=b1.h(0,c6)
c7.toString
J.q(b5,c7)}},
hG(a){var s,r
t.p.a(a)
s=document.getElementById("resident-history-list")
if(s==null)return
r=J.K(s)
r.sU(s,"")
if(a.length===0){r.sU(s,'<div class="empty-state" style="padding:16px;text-align:center;color:var(--text-muted);font-size:13px;">No billing history is on file for this household yet.</div>')
return}B.b.q(a,new A.kt(this,s))},
fg(){var s,r=document,q=r.getElementById("btn-open-register-modal"),p=r.getElementById("register-user-modal"),o=t.dD.a(r.getElementById("resident-register-form")),n=r.getElementById("register-status"),m=t.o.a(r.getElementById("btn-submit-register"))
if(A.h5().gal().h(0,"role")==="resident")if(q!=null){s=q.style
s.display="block"}s=t.h
A.eO(s,s,"T","querySelectorAll")
s=r.querySelectorAll("[data-toggle-password]")
s.toString
s=new A.bn(s,t.U)
s.q(s,new A.j0())
r=r.getElementById("btn-close-register-modal")
if(r!=null){r=J.a4(r)
s=r.$ti
A.z(r.a,r.b,s.i("~(1)?").a(new A.j1(p)),!1,s.c)}if(q!=null){r=J.a4(q)
s=r.$ti
A.z(r.a,r.b,s.i("~(1)?").a(new A.j2(p,n)),!1,s.c)}if(o!=null){r=t.E
A.z(o,"submit",r.i("~(1)?").a(new A.j3(m,o,n)),!1,r.c)}},
f0(){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f="change",e=document,d=e.getElementById("btn-open-collect-modal"),c=e.getElementById("modal-collect-payment"),b=e.getElementById("btn-collect-cancel"),a=t.o.a(e.getElementById("btn-collect-confirm")),a0=t.G.a(e.getElementById("collect-amount-input")),a1=t.Y,a2=a1.a(e.getElementById("collect-payment-method"))
if(d!=null){s=J.a4(d)
r=s.$ti
A.z(s.a,s.b,r.i("~(1)?").a(new A.iF(g,a0,c)),!1,r.c)}if(b!=null){s=J.a4(b)
r=s.$ti
A.z(s.a,s.b,r.i("~(1)?").a(new A.iG(c)),!1,r.c)}if(a!=null){s=t.C
A.z(a,"click",s.i("~(1)?").a(new A.iH(g,a,a0,a2,c)),!1,s.c)}s=t.iC
q=s.a(e.getElementById("resident-gallery-input"))
p=s.a(e.getElementById("resident-camera-input"))
o=s.a(e.getElementById("resident-photo-input"))
n=a1.a(e.getElementById("resident-issue-category"))
m=t.r.a(e.getElementById("resident-log-desc"))
a1=new A.iY(g,n,m)
s=new A.iZ(g)
r=new A.iB(g,s,a1)
$.bx().k(0,"waterhallPhotoPickerResult",A.vr(new A.iN(g,a1,r),t.Z))
l=new A.iX(g,a1)
k=new A.iE(g,q,p,o)
r=new A.iW(g,r)
if(q!=null){j=t.E
A.z(q,f,j.i("~(1)?").a(new A.iO(r,q)),!1,j.c)}if(p!=null){j=t.E
A.z(p,f,j.i("~(1)?").a(new A.iP(r,p)),!1,j.c)}if(o!=null){j=t.E
A.z(o,f,j.i("~(1)?").a(new A.iQ(r,o)),!1,j.c)}r=e.getElementById("btn-resident-gallery-trigger")
if(r!=null){r=J.a4(r)
j=r.$ti
A.z(r.a,r.b,j.i("~(1)?").a(new A.iR(l,q)),!1,j.c)}r=e.getElementById("btn-resident-camera-trigger")
if(r!=null){r=J.a4(r)
j=r.$ti
A.z(r.a,r.b,j.i("~(1)?").a(new A.iS(l,p)),!1,j.c)}r=e.getElementById("btn-resident-photo-trigger")
if(r!=null){r=J.a4(r)
j=r.$ti
A.z(r.a,r.b,j.i("~(1)?").a(new A.iT(l,q)),!1,j.c)}r=e.getElementById("btn-resident-photo-replace-gallery")
if(r!=null){r=J.a4(r)
j=r.$ti
A.z(r.a,r.b,j.i("~(1)?").a(new A.iU(l,q)),!1,j.c)}r=e.getElementById("btn-resident-photo-replace-camera")
if(r!=null){r=J.a4(r)
j=r.$ti
A.z(r.a,r.b,j.i("~(1)?").a(new A.iI(l,p)),!1,j.c)}r=e.getElementById("btn-resident-photo-remove")
if(r!=null){r=J.a4(r)
j=r.$ti
A.z(r.a,r.b,j.i("~(1)?").a(new A.iJ(g,k,a1)),!1,j.c)}r=new A.iV(g,a1)
if(m!=null){j=t.E
A.z(m,"input",j.i("~(1)?").a(r),!1,j.c)}if(n!=null){j=t.E
A.z(n,f,j.i("~(1)?").a(r),!1,j.c)}s=new A.iK(g,k,m,n,s,l)
g.at=s
s.$0()
i=e.getElementById("btn-resident-submit-log")
if(i!=null){s=J.a4(i)
r=s.$ti
A.z(s.a,s.b,r.i("~(1)?").a(new A.iL(g,a1,k)),!1,r.c)}h=e.getElementById("btn-retry-db-connection")
if(h!=null){e=J.a4(h)
a1=e.$ti
A.z(e.a,e.b,a1.i("~(1)?").a(new A.iM(g)),!1,a1.c)}}}
A.jM.prototype={
$0(){var s=this.a
if(s.d!=null&&$.J().x)s.bQ()
s.bv()},
$S:2}
A.jU.prototype={
$0(){var s,r,q,p,o=document.getElementById("phone-time")
if(o!=null){s=new A.ad(Date.now(),0,!1)
r=A.oI(s)
q=B.a.bh(B.e.l(A.oJ(s)),2,"0")
p=r>=12?"PM":"AM"
r=B.e.aZ(r,12)
J.q(o,""+(r!==0?r:12)+":"+q+" "+p)}},
$S:2}
A.jN.prototype={
$1(a){t.D.a(a)
return this.a.$0()},
$S:17}
A.jO.prototype={
$1(a){t.V.a(a)
return $.J().aR()},
$S:1}
A.jP.prototype={
$1(a){var s,r,q=this.a
q.aC()
q.bD()
q.r=q.d=q.a=null;++q.x
q.y=!1;++q.Q
q.z=!1
s=q.fy
s===$&&A.aA()
r=t.h
A.eO(r,r,"T","querySelectorAll")
s=s.querySelectorAll("[disabled]")
s.toString
s=new A.bn(s,t.U)
s.q(s,new A.jL())
q.as=null
s=q.ax
if(s!=null)s.a3(0)
s=window.localStorage
s.toString
B.k.C(s,"waterhall_resident_report_draft")
q.ry=q.c=null;++q.p4
q.p2=null
q.R8=!1
s=document
r=s.getElementById("transaction-list")
if(r!=null)J.cL(r).X(0)
q.f=null
r=s.getElementById("collection-review-modal")
if(r!=null)J.iy(r)
r=s.getElementById("modal-collect-payment")
if(r!=null){r=r.style
r.display="none"}q.bd()
if(a)q.ai("Session expired. Please sign in again.",s.getElementById("login-error-msg"))},
$S:43}
A.jL.prototype={
$1(a){var s
t.h.a(a)
s=a.getAttribute("disabled")
a.removeAttribute("disabled")
return s},
$S:9}
A.jQ.prototype={
$1(a){var s=this.a
s.dw(t.P.a(a))
if(s.b==="view-transactions"&&s.a!=null)s.am()},
$S:8}
A.jR.prototype={
$1(a){t.D.a(a)
return this.a.b5()},
$S:17}
A.jS.prototype={
$1(a){t.D.a(a)
return this.a.bv()},
$S:17}
A.jT.prototype={
$1(a){var s=document
s.toString
s=s.visibilityState||s.mozVisibilityState||s.msVisibilityState||s.webkitVisibilityState
s.toString
if(s==="visible"){s=this.a
s.bv()
s.b5()}},
$S:3}
A.ja.prototype={
$1(a){t.V.a(a)
return this.a.dl()},
$S:1}
A.j6.prototype={
$1(a){return J.j(t.P.a(a),"sync_error")!=null},
$S:0}
A.j7.prototype={
$1(a){return J.j(t.P.a(a),"sync_error")!=null},
$S:0}
A.j8.prototype={
$1(a){return this.eq(t.V.a(a))},
eq(a){var s=0,r=A.S(t.H),q=this,p
var $async$$1=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:q.b.disabled=!0
p=$.J()
s=2
return A.w(p.a4(),$async$$1)
case 2:s=3
return A.w(p.aB(),$async$$1)
case 3:if(p.P())q.a.dl()
return A.Q(null,r)}})
return A.R($async$$1,r)},
$S:4}
A.j9.prototype={
$1(a){t.V.a(a)
return B.H.e2(this.a)},
$S:1}
A.jc.prototype={
$1(a){var s,r,q,p
t.V.a(a).preventDefault()
s=document
r=t.G.a(s.getElementById("login-password"))
q=s.getElementById("web-eye-show")
p=s.getElementById("web-eye-hide")
if(r!=null)if(r.type==="password"){B.f.sbl(r,"text")
if(q!=null){s=q.style
s.display="none"}if(p!=null){s=p.style
s.display="block"}s=this.a.style
s.color="#F4D03F"}else{B.f.sbl(r,"password")
if(q!=null){s=q.style
s.display="block"}if(p!=null){s=p.style
s.display="none"}s=this.a.style
s.color="var(--text-muted)"}},
$S:1}
A.jd.prototype={
$1(a){return this.ew(t.V.a(a))},
ew(a8){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
var $async$$1=A.T(function(a9,b0){if(a9===1){o.push(b0)
s=p}for(;;)switch(s){case 0:a8.preventDefault()
b=m.b
if(b==null)a=null
else{b=b.value
b=b==null?null:B.a.A(b)
a=b}l=a==null?"":a
b=m.c
a0=b==null
a1=a0?null:b.value
k=a1==null?"":a1
a2=t.d.a(window.location).href
a2.toString
j=A.cw(a2).gal().h(0,"role")
if(J.ao(l)===0||J.ao(k)===0){m.a.ai("Both Username and Password are required.",m.d)
s=1
break}a2=m.e
a2.disabled=!0
p=4
a3=$.J()
a4=t.N
s=7
return A.w(a3.ae("/api/login",!1,"POST",A.a6(["Content-Type","application/json"],a4,a4),B.c.V(A.a6(["username",l,"password",k],a4,a4))),$async$$1)
case 7:i=b0
a5=i.responseText
a5.toString
h=t.P.a(B.c.I(0,a5))
g=A.x(J.j(h,"access_token"))
f=A.x(J.j(h,"role"))
e=A.x(J.j(h,"id"))
d=A.x(J.j(h,"name"))
a5=!0
if(!J.i(f,"admin"))if(!(J.i(j,"resident")&&!J.i(f,"resident")))a5=!J.i(j,"resident")&&!J.i(f,"worker")
if(a5){m.a.ai("Use the portal assigned to your account role.",m.d)
n=[1]
s=5
break}s=J.i(J.j(h,"password_change_required"),!0)?8:9
break
case 8:s=10
return A.w(a3.aR(),$async$$1)
case 10:if(!a0)B.f.sM(b,"")
m.a.e0(g)
n=[1]
s=5
break
case 9:a3.dJ()
b=m.a
b.f=null
s=11
return A.w(a3.b1(g),$async$$1)
case 11:s=12
return A.w(A.du(),$async$$1)
case 12:s=13
return A.w(a3.bj(),$async$$1)
case 13:if(a3.P()){a0=window.localStorage.getItem("waterhall_jwt")
a3=g
a3=a0==null?a3!=null:a0!==a3
a0=a3}else a0=!0
if(a0){n=[1]
s=5
break}if(J.i(f,"resident")){if(J.i(j,"worker")){b.ai("This terminal is for Field Workers only. Residents must use the Resident App.",m.d)
n=[1]
s=5
break}a0=window.localStorage
a0.toString
B.k.C(a0,"waterhall_session")
b.a=null
b.cW(e)
b.aC()
b.bw("resident")
a0=m.d
if(a0!=null){a0=a0.style
a0.display="none"}b.F(B.a.cN("Logged in as Resident: ",d))
n=[1]
s=5
break}else{if(J.i(j,"resident")){b.ai("This portal is for Residents only. Field Workers must use the Worker App.",m.d)
n=[1]
s=5
break}a0=A.a6(["worker_id",e,"name",d,"role","Collector"],a4,t.z)
b.a=a0
a3=window.localStorage
a3.toString
a3.setItem("waterhall_session",B.c.V(a0))
a0=window.localStorage
a0.toString
B.k.C(a0,"waterhall_resident_session")
b.aC()
b.bw("worker")
a0=m.d
if(a0!=null){a0=a0.style
a0.display="none"}a0=b.a
a0.toString
b.cU(a0)
b.F(B.a.cN("Logged in as Tech: ",d))
n=[1]
s=5
break}n.push(6)
s=5
break
case 4:p=3
a7=o.pop()
b=A.as(a7)
if(b instanceof A.at){c=b
b=c.c
if(b==null)b="Unable to sign in. Check your connection and credentials."
m.a.ai(b,m.d)
n=[1]
s=5
break}n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
a2.disabled=!1
s=n.pop()
break
case 6:b=$.J().z==="Session expired. Please sign in again."?"Session expired. Please sign in again.":"Unable to sign in. Check your credentials and connection. Existing offline sessions resume when the app opens."
m.a.ai(b,m.d)
case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$$1,r)},
$S:4}
A.je.prototype={
$1(a){return this.ev(t.V.a(a))},
ev(a){var s=0,r=A.S(t.H),q=this,p
var $async$$1=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:p=q.a
p.aC()
s=2
return A.w($.J().aR(),$async$$1)
case 2:p.F("Signed out of Tech session")
return A.Q(null,r)}})
return A.R($async$$1,r)},
$S:4}
A.jh.prototype={
$1(a){return this.eu(t.V.a(a))},
eu(a){var s=0,r=A.S(t.H),q=this,p
var $async$$1=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:p=q.a
p.aC()
s=2
return A.w($.J().aR(),$async$$1)
case 2:p.F("Signed out of Resident Portal")
return A.Q(null,r)}})
return A.R($async$$1,r)},
$S:4}
A.ji.prototype={
$1(a){var s,r
t.h.a(a)
s=J.a4(a)
r=s.$ti
A.z(s.a,s.b,r.i("~(1)?").a(new A.jb(this.a,a)),!1,r.c)},
$S:9}
A.jb.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.b.getAttribute("data-target")
if(s==null)s=""
this.a.aj(s)},
$S:1}
A.jj.prototype={
$1(a){return this.a.aW()},
$S:3}
A.jk.prototype={
$1(a){return this.a.aW()},
$S:3}
A.jl.prototype={
$1(a){return this.a.aW()},
$S:3}
A.jm.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.aj("view-directory")
s.c=null},
$S:1}
A.jn.prototype={
$1(a){A.p_(t.V.a(a).target)},
$S:1}
A.jo.prototype={
$1(a){var s=0,r=A.S(t.H),q,p=this,o,n,m,l,k,j
var $async$$1=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:k=p.a
j=k.c
if(j==null){s=1
break}o=p.b.checked
n=o===!0?"leak":"normal"
s=3
return A.w($.J().bm(j,n),$async$$1)
case 3:if(c!=null){j=document
m=j.getElementById("modal-flow-rate")
if(m!=null)J.q(m,"Manual report")
k.eg(n)
k.F(n==="leak"?"Leak status saved for synchronization.":"Resolved status saved for synchronization.")
o=k.c
o.toString
k.e4(o)
l=t.aa.a(j.getElementById("log-resolved"))
if(l!=null)B.f.sdI(l,n==="normal")}case 1:return A.Q(q,r)}})
return A.R($async$$1,r)},
$S:21}
A.jf.prototype={
$1(a){return this.es(t.V.a(a))},
es(a){var s=0,r=A.S(t.H),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$$1=A.T(function(b,a0){if(b===1)return A.P(a0,r)
for(;;)switch(s){case 0:c=p.a
if(c.c==null||c.a==null){s=1
break}o=document
n=t.r.a(o.getElementById("log-desc"))
m=n==null
if(m)l=null
else{k=n.value
k=k==null?null:B.a.A(k)
l=k}if(l==null)l=""
k=t.aa
j=k.a(o.getElementById("log-resolved"))
i=j==null?null:j.checked
h=i!==!1
if(l.length===0){c.F("Please detail the maintenance actions taken.")
s=1
break}g=A.a6(["house_id",c.c,"worker_id",c.a.h(0,"worker_id"),"description",l,"status_resolved",h,"date",new A.ad(Date.now(),0,!1).ab().aa()],t.N,t.z)
i=$.J()
s=3
return A.w(i.bB(g),$async$$1)
case 3:s=h?4:5
break
case 4:f=c.c
f.toString
s=6
return A.w(i.bm(f,"normal"),$async$$1)
case 6:e=k.a(o.getElementById("modal-leak-toggle"))
if(e!=null)B.f.sdI(e,!1)
c.eg("normal")
case 5:k=c.c
k.toString
if(i.a2(k)!=null){d=o.getElementById("modal-flow-rate")
if(d!=null)J.q(d,"Manual reading")}if(!m)B.o.sM(n,"")
c.F("Maintenance Log committed to database!")
o=c.c
o.toString
c.e4(o)
c.bP()
case 1:return A.Q(q,r)}})
return A.R($async$$1,r)},
$S:4}
A.jg.prototype={
$1(a){return this.er(t.V.a(a))},
er(a){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b
var $async$$1=A.T(function(a0,a1){if(a0===1){o.push(a1)
s=p}for(;;)switch(s){case 0:c=m.a
if(c.a!=null){h=m.b.disabled
h.toString}else h=!0
if(h){s=1
break}h=document
l=t.r.a(h.getElementById("worker-announcement-input"))
g=t.Y.a(h.getElementById("worker-announcement-audience"))
h=l
if(h==null)f=null
else{h=h.value
h=h==null?null:B.a.A(h)
f=h}k=f==null?"":f
e=g==null?null:g.value
j=e==null?"Everyone":e
if(J.ao(k)===0){c.F("Message cannot be empty")
s=1
break}i=window.localStorage.getItem("waterhall_jwt")
h=m.b
h.disabled=!0
p=4
s=7
return A.w($.J().bz(k,A.x(c.a.h(0,"name")),j),$async$$1)
case 7:if(!J.i(i,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}if(l!=null)B.o.sM(l,"")
c.F("Announcement queued for "+A.e(j)+". Pending items retry when online.")
n.push(6)
s=5
break
case 4:p=3
b=o.pop()
if(J.i(i,window.localStorage.getItem("waterhall_jwt")))c.F("Announcement was not saved. Check storage and retry.")
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
A.jC.prototype={
$0(){var s=document,r=t.O.a(s.activeElement)
if(r!=null)r.blur()
r=this.a.style
r.display="none"
s=s.getElementById("btn-web-forgot-password")
if(s!=null)J.oq(s)},
$S:2}
A.jD.prototype={
$1(a){var s,r
t.V.a(a).preventDefault()
s=document
r=s.getElementById("web-recovery-role")
if(r!=null)J.q(r,A.h5().gal().h(0,"role")==="resident"?"Resident account":"Worker account")
r=this.a.style
r.display="flex"
s=s.getElementById("btn-web-recover-cancel")
if(s!=null)J.oq(s)},
$S:1}
A.jE.prototype={
$1(a){t.V.a(a).preventDefault()
this.a.$0()},
$S:1}
A.jF.prototype={
$1(a){if(t.mT.a(a).key==="Escape")this.a.$0()},
$S:31}
A.jx.prototype={
$1(a){t.V.a(a)
if($.J().P())this.a.hx()},
$S:1}
A.jy.prototype={
$1(a){t.V.a(a)
return this.a.bD()},
$S:1}
A.jz.prototype={
$1(a){if(t.mT.a(a).key==="Escape")this.a.bD()},
$S:31}
A.jA.prototype={
$1(a){var s,r,q,p,o=t.S,n=o.a(J.t_(a)).checked===!0
for(s=["change-current-password","change-new-password","change-confirm-password"],r=0;r<3;++r){q=s[r]
p=o.a(document.getElementById(q))
B.f.sbl(p,n?"text":"password")}},
$S:3}
A.jB.prototype={
$1(a6){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
var $async$$1=A.T(function(a7,a8){if(a7===1){o.push(a8)
s=p}for(;;)switch(s){case 0:a6.preventDefault()
d=m.a
if(d.ok){s=1
break}c=m.b
c.hidden=!0
b=m.c
a=b.checkValidity()
a.toString
if(!a){b.reportValidity().toString
s=1
break}b=document
a=t.S
a0=a.a(b.getElementById("change-new-password")).value
a0.toString
l=a0
a0=a.a(b.getElementById("change-confirm-password")).value
a0.toString
k=a0
if(!J.i(l,k)){J.q(c,"Passwords do not match.")
c.hidden=!1
s=1
break}a1=d.k4
j=a1==null?window.localStorage.getItem("waterhall_jwt"):a1
if(j==null){J.q(c,"Please sign in again.")
c.hidden=!1
s=1
break}i=d.p1
h=d.k4!=null
d.ok=!0
a0=m.d
a0.disabled=!0
B.i.sG(a0,"Saving\u2026")
p=4
a2=$.J()
a3=t.N
g=A.ai(a3,a3)
J.an(g,"Content-Type","application/json")
if(h)J.an(g,"Authorization","Bearer "+j)
f=A.ai(a3,t.x)
J.an(f,"new_password",l)
J.an(f,"confirm_password",k)
if(!h)J.an(f,"current_password",a.a(b.getElementById("change-current-password")).value)
s=7
return A.w(a2.ae("/api/password/change",!h,"POST",g,B.c.V(f)),$async$$1)
case 7:s=!J.i(i,d.p1)?8:9
break
case 8:s=!h&&window.localStorage.getItem("waterhall_jwt")===j?10:11
break
case 10:s=12
return A.w(a2.aR(),$async$$1)
case 12:case 11:n=[1]
s=5
break
case 9:s=13
return A.w(a2.aR(),$async$$1)
case 13:d.bD()
d.ai("Password saved. Sign in with your new password.",b.getElementById("login-error-msg"))
n.push(6)
s=5
break
case 4:p=3
a5=o.pop()
g=A.as(a5)
if(g instanceof A.at){e=g
if(!J.i(i,d.p1)){n=[1]
s=5
break}g=e.c
if(g==null)if(e.a===401)g="Sign-in expired. Return to Login and try again."
else if(e.a===429)g="Too many attempts. Please try again shortly."
else g=e.gef()?"Unable to reach the server. Check your connection and retry.":"Unable to save the password. Please sign in again."
J.q(c,g)
c.hidden=!1}else throw a5
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
d.ok=!1
a0.disabled=!1
B.i.sG(a0,"Save New Password")
s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$$1,r)},
$S:21}
A.jp.prototype={
$1(a){return J.cd(t.h.a(a)).C(0,"active")},
$S:9}
A.kA.prototype={
$1(a){return J.cd(t.h.a(a)).C(0,"active")},
$S:9}
A.kB.prototype={
$1(a){return B.a.A(A.x(a)).length!==0},
$S:10}
A.kC.prototype={
$1(a){var s
A.x(a)
s=a.length
if(s!==0){if(0>=s)return A.d(a,0)
s=a[0]}else s=""
return s},
$S:11}
A.kJ.prototype={
$1(a){var s
t.h.a(a)
s=J.K(a)
if(a.getAttribute("data-target")===this.a)s.gar(a).m(0,"active")
else s.gar(a).C(0,"active")},
$S:9}
A.kK.prototype={
$2(a,b){var s
A.x(a)
t.h.a(b)
s=J.K(b)
if(a===this.a)s.gar(b).m(0,"active")
else s.gar(b).C(0,"active")},
$S:50}
A.k9.prototype={
$1(a){return J.i(J.j(t.P.a(a),"current_leak_status"),"leak")},
$S:0}
A.ka.prototype={
$1(a){var s,r,q
t.P.a(a)
s=document.createElement("div")
s.className="alert-item leak"
r=s.style
r.cursor="pointer"
r=J.y(a)
q=J.K(s)
q.sU(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.e(r.h(a,"owner_name"))+" ("+A.e(r.h(a,"purok"))+")</strong><br>\n              Reported leak. Field inspection required.\n            </div>\n          ")
q=q.gaU(s)
r=q.$ti
A.z(q.a,q.b,r.i("~(1)?").a(new A.k8(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:8}
A.k8.prototype={
$1(a){t.V.a(a)
this.a.cF(A.x(J.j(this.b,"house_id")))},
$S:1}
A.kb.prototype={
$1(a){var s,r,q
t.I.a(a)
s=document.createElement("div")
s.className="alert-item quality"
r=s.style
r.cursor="pointer"
r=J.y(a)
q=J.K(s)
q.sU(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.e(r.h(a,"name"))+"</strong><br>\n              "+A.e(r.h(a,"desc"))+"\n            </div>\n          ")
q=q.gaU(s)
r=q.$ti
A.z(q.a,q.b,r.i("~(1)?").a(new A.k7(this.a)),!1,r.c)
this.b.appendChild(s).toString},
$S:51}
A.k7.prototype={
$1(a){var s,r
t.V.a(a)
this.a.aj("view-dashboard")
s=document.getElementById("worker-telemetry-freshness")
if(s!=null){r=!!s.scrollIntoViewIfNeeded
r.toString
if(r)s.scrollIntoViewIfNeeded()
else s.scrollIntoView()}},
$S:1}
A.kc.prototype={
$2(a,b){var s,r,q,p,o,n
A.x(b)
s=document.getElementById("pin-p"+(a+1))
if(s!=null){r=s.querySelector(".pin-bg")
q=B.b.a6(this.b,new A.k5(b))
if(r!=null)if(q){r.setAttribute("fill","var(--alert-red)")
r.setAttribute("stroke","#FFF")
r.setAttribute("stroke-width","1.5")}else{r.setAttribute("fill","var(--alert-green)")
r.removeAttribute("stroke")}p=s.style
p.cursor="pointer"
p=J.K(s)
o=t.h.a(p.fZ(s,!0))
p.e6(s,o)
p=J.a4(o)
n=p.$ti
A.z(p.a,p.b,n.i("~(1)?").a(new A.k6(this.a,b)),!1,n.c)}},
$S:79}
A.k5.prototype={
$1(a){var s
t.P.a(a)
s=J.y(a)
return J.i(s.h(a,"purok"),this.a)&&J.i(s.h(a,"current_leak_status"),"leak")},
$S:0}
A.k6.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Y
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.p.sM(q,this.b)
if(p!=null)B.p.sM(p,"all")
this.a.aj("view-directory")},
$S:1}
A.kd.prototype={
$1(a){var s,r,q,p,o,n
A.x(a)
s=this.b
r=A.E(s)
q=r.i("F(1)")
r=r.i("I<1>")
p=new A.I(s,q.a(new A.k2(a)),r).gj(0)
o=new A.I(s,q.a(new A.k3(a)),r).gj(0)
n=document.createElement("div")
n.className="zone-card"
s=o>0?""+o+" Leaks":"Clear"
r=J.K(n)
r.sU(n,'          <div class="zone-card-header">\n            <span class="zone-name">'+a+'</span>\n          </div>\n          <div class="zone-stats">\n            <span>Meters: <strong>'+p+'</strong></span>\n            <span class="zone-leak-count">'+s+"</span>\n          </div>\n        ")
r=r.gaU(n)
s=r.$ti
A.z(r.a,r.b,s.i("~(1)?").a(new A.k4(this.a,a)),!1,s.c)
this.c.appendChild(n).toString},
$S:53}
A.k2.prototype={
$1(a){return J.i(J.j(t.P.a(a),"purok"),this.a)},
$S:0}
A.k3.prototype={
$1(a){var s
t.P.a(a)
s=J.y(a)
return J.i(s.h(a,"purok"),this.a)&&J.i(s.h(a,"current_leak_status"),"leak")},
$S:0}
A.k4.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Y
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.p.sM(q,this.b)
if(p!=null)B.p.sM(p,"all")
this.a.aj("view-directory")},
$S:1}
A.ke.prototype={
$1(a){var s,r,q,p,o
t.P.a(a)
s=B.b.dL(this.b,new A.k0(a),new A.k1())
r=J.y(s)
q=r.gT(s)?r.h(s,"owner_name"):"Unknown Household"
p=document.createElement("div")
r=J.y(a)
p.className="log-card "+(J.i(r.h(a,"status_resolved"),!0)?"resolved":"pending")
o=this.a.a5(r.h(a,"date"))
J.dv(p,'            <div class="log-card-header">\n              <span>'+A.e(q)+'</span>\n              <span style="font-size:10px; color:var(--text-muted)">'+o+'</span>\n            </div>\n            <div class="log-card-desc">'+A.e(r.h(a,"description"))+"</div>\n          ")
this.c.appendChild(p).toString},
$S:8}
A.k0.prototype={
$1(a){var s="house_id"
return J.i(J.j(t.P.a(a),s),J.j(this.a,s))},
$S:0}
A.k1.prototype={
$0(){return A.ai(t.N,t.z)},
$S:32}
A.kg.prototype={
$1(a){var s,r,q,p,o
t.P.a(a)
s=J.y(a)
r=this.a
q=B.a.v(J.M(s.h(a,"owner_name")).toLowerCase(),r)||B.a.v(J.M(s.h(a,"account_number")).toLowerCase(),r)||B.a.v(J.M(s.h(a,"house_id")).toLowerCase(),r)
r=this.b
p=r==="all"||J.i(s.h(a,"purok"),r)
r=this.c
o=r==="all"||J.i(s.h(a,"current_leak_status"),r)
return q&&p&&o},
$S:0}
A.kh.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j="current_leak_status",i="current_m3_usage"
t.P.a(a)
s=document.createElement("div")
r=J.y(a)
s.className="household-card "+(J.i(r.h(a,j),"leak")?"has-leak":"")
q=A.e(r.h(a,"owner_name"))
p=A.e(r.h(a,"purok"))
o=A.e(r.h(a,"account_number"))
n=A.e(r.h(a,i))
m=A.e(r.h(a,j))
l=J.i(r.h(a,j),"leak")?'<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> Leak':'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Normal'
k=J.K(s)
k.sU(s,'          <div class="household-info">\n            <span class="household-name">'+q+'</span>\n            <div class="household-meta">\n              <span class="household-purok">'+p+'</span>\n              <span class="household-acct">'+o+'</span>\n            </div>\n            <div class="household-usage">Usage this Month: <strong>'+n+' m\xb3</strong></div>\n          </div>\n          <div class="household-status-section">\n            <span class="status-indicator '+m+'">\n              '+l+'\n            </span>\n            <span class="household-flow">Meter: <span>'+A.e(r.h(a,i))+" m\xb3</span></span>\n          </div>\n        ")
k=k.gaU(s)
r=k.$ti
A.z(k.a,k.b,r.i("~(1)?").a(new A.kf(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:8}
A.kf.prototype={
$1(a){t.V.a(a)
this.a.cF(A.x(J.j(this.b,"house_id")))},
$S:1}
A.jV.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.aj("view-directory")
s.c=null},
$S:1}
A.ku.prototype={
$2(a,b){A.ac(a)
A.ac(b)
return a>b?a:b},
$S:55}
A.kv.prototype={
$1(a){var s,r,q
t.if.a(a)
s=a.a
r=a.b
q=this.a.length
return A.a6(["x",20+(q===1?0.5:s/(q-1))*300,"y",80-r/this.b*60,"val",r,"label",""+(s+1)],t.N,t.K)},
$S:56}
A.kw.prototype={
$1(a){var s
t.c.a(a)
s=J.y(a)
return B.d.H(A.ac(s.h(a,"x")),1)+","+B.d.H(A.ac(s.h(a,"y")),1)},
$S:33}
A.kx.prototype={
$1(a){var s
t.c.a(a)
s=J.y(a)
return"L "+B.d.H(A.ac(s.h(a,"x")),1)+","+B.d.H(A.ac(s.h(a,"y")),1)},
$S:33}
A.ky.prototype={
$1(a){var s,r
t.c.a(a)
s=this.a
r=J.y(a)
s.a=s.a+('        <text x="'+A.e(r.h(a,"x"))+'" y="96" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-weight="600">'+A.e(r.h(a,"label"))+'</text>\n        <line x1="'+A.e(r.h(a,"x"))+'" y1="'+A.e(r.h(a,"y"))+'" x2="'+A.e(r.h(a,"x"))+'" y2="80" stroke="rgba(249,115,22,0.2)" stroke-width="1" stroke-dasharray="2 2" />\n        <circle cx="'+A.e(r.h(a,"x"))+'" cy="'+A.e(r.h(a,"y"))+'" r="4" fill="var(--white)" stroke="'+this.b+'" stroke-width="2" />\n        <text x="'+A.e(r.h(a,"x"))+'" y="'+A.e(A.ac(r.h(a,"y"))-8)+'" text-anchor="middle" fill="var(--navy-primary)" font-size="9" font-weight="700">'+A.e(r.h(a,"val"))+"m\xb3</text>\n      ")},
$S:58}
A.ki.prototype={
$1(a){return J.i(J.j(t.P.a(a),"house_id"),this.a)},
$S:0}
A.kj.prototype={
$1(a){var s,r,q,p,o,n,m="status_resolved"
t.P.a(a)
s=document.createElement("div")
r=J.y(a)
s.className="log-card "+(J.i(r.h(a,m),!0)?"resolved":"pending")
q=this.a.a5(r.h(a,"date"))
p=A.e(r.h(a,"worker_id"))
o=A.e(r.h(a,"description"))
n=J.i(r.h(a,m),!0)?"var(--alert-green)":"var(--amber-safety)"
r=J.i(r.h(a,m),!0)?"Resolved":"In Progress (Active Monitoring)"
J.dv(s,'          <div class="log-card-header">\n            <span>Tech: <strong>'+p+'</strong></span>\n            <span style="font-size:10px; color:var(--text-muted)">'+q+'</span>\n          </div>\n          <div class="log-card-desc">'+o+'</div>\n          <div style="font-size: 9px; font-weight:700; color:'+n+'; margin-top:4px; text-transform:uppercase">\n            Status: '+r+"\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:8}
A.kk.prototype={
$1(a){return B.a.A(A.x(a)).length!==0},
$S:10}
A.kl.prototype={
$1(a){var s
A.x(a)
s=a.length
if(s!==0){if(0>=s)return A.d(a,0)
s=a[0]}else s=""
return s},
$S:11}
A.km.prototype={
$1(a){var s,r="worker_id"
t.P.a(a)
s=J.y(a)
return J.i(s.h(a,r),this.a.a.h(0,r))&&J.i(s.h(a,"status_resolved"),!0)},
$S:0}
A.jH.prototype={
$1(a){var s=this.a
s.p3=0
s.am()
s.cD()},
$S:3}
A.jI.prototype={
$1(a){var s,r=this.a;++r.p4
r.p3=0
s=r.rx
if(s!=null)s.a3(0)
r.am()
r.rx=A.fX(B.ab,new A.jG(r))},
$S:3}
A.jG.prototype={
$0(){return this.a.cD()},
$S:2}
A.jJ.prototype={
$1(a){var s,r,q
t.V.a(a)
s=this.a
r=s.cs().length
q=s.p3+25
if(r>q){s.p3=q
s.am()}else s.bg(!0)},
$S:1}
A.jK.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.p3=B.e.cq(s.p3-25,0,1e6)
s.am()},
$S:1}
A.jq.prototype={
$1(a){var s,r
t.P.a(a)
s=this.a
if(s==="All"||J.i(J.j(a,"sync_status"),s)){s=J.y(a)
r=s.h(a,"family_head_name")
if(r==null){s=$.J().a2(A.e(s.h(a,"house_id")))
s=s==null?null:J.j(s,"owner_name")}else s=r
s=B.a.v(J.M(s==null?"":s).toLowerCase(),this.b)}else s=!1
return s},
$S:0}
A.kz.prototype={
$2(a,b){var s,r,q
A.x(a)
if(b==null||A.e(b).length===0)return
s=document
r=s.createElement("div")
r.toString
q=s.createElement("span")
q.toString
B.w.sG(q,a)
r.appendChild(q).toString
s=s.createElement("span")
s.toString
B.w.sG(s,A.e(b))
r.appendChild(s).toString
this.a.appendChild(r).toString},
$S:6}
A.jr.prototype={
$1(a){var s,r,q,p,o,n,m
t.V.a(a)
s=this.a.x1=this.b
r=document
q=t.S.a(r.getElementById("bill-meter-search"))
B.f.sM(q,"")
p=s==="name"
q.placeholder=p?"Type any part of the household name":"Type any part of HH-\u2026"
q.setAttribute("aria-label",p?"Search by Name":"Search by ID")
for(p=["name","id"],o=0;o<2;++o){n=p[o]
m=r.getElementById("bill-search-"+n)
if(m!=null)m.setAttribute("aria-pressed",""+(n===s))}s=r.getElementById("bill-meter-results")
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.js.prototype={
$1(a){return this.a.cV()},
$S:3}
A.jt.prototype={
$1(a){return this.a.cV()},
$S:3}
A.ju.prototype={
$1(a){return this.a.bS()},
$S:3}
A.jv.prototype={
$1(a){var s=t.mV.a(A.p_(t.V.a(a).target)),r=!1
if(s!=null)if(!B.f.v(this.a,s)){r=this.b
r=r!=null&&!J.oo(r,s)}if(r){r=this.b.style
r.display="none"}},
$S:1}
A.jw.prototype={
$1(a){t.V.a(a)
return this.a.bo()},
$S:1}
A.kD.prototype={
$1(a){var s
t.P.a(a)
s=J.j(a,this.a.x1==="name"?"owner_name":"house_id")
return B.a.v(J.M(s==null?"":s).toLowerCase(),this.b)},
$S:0}
A.kE.prototype={
$1(a){var s,r,q,p=this,o="house_id"
t.V.a(a)
s=p.c
r=J.y(s)
B.f.sM(p.b,A.e(r.h(s,"owner_name"))+" ("+A.e(r.h(s,o))+")")
q=p.d.style
q.display="none"
p.a.bO(A.al(r.h(s,o)))},
$S:1}
A.jX.prototype={
$1(a){var s
t.P.a(a)
s=J.y(a)
return J.i(s.h(a,"house_id"),this.a.ry)&&!B.a.O(A.e(s.h(a,"bill_id")),"PENDING-")},
$S:0}
A.jY.prototype={
$2(a,b){var s=t.P
s.a(a)
return B.a.a1(A.e(J.j(s.a(b),"date")),A.e(J.j(a,"date")))},
$S:12}
A.jZ.prototype={
$1(a){return!J.i(J.j(t.P.a(a),"status"),"Paid")},
$S:0}
A.k_.prototype={
$2(a,b){var s
A.ac(a)
s=A.nM(J.j(t.P.a(b),"total_due"))
return a+(s==null?0:s)},
$S:78}
A.kL.prototype={
$2(a,b){var s=document.getElementById(a)
if(s!=null)J.q(s,b)},
$S:7}
A.jW.prototype={
$1(a){var s,r,q,p,o,n="status"
t.P.a(a)
s=document.createElement("div")
r=J.y(a)
s.className="bill-record-card "+A.e(r.h(a,n))
q=this.a.a5(r.h(a,"date"))
p=A.e(r.h(a,"billing_month"))
o=J.i(r.h(a,n),"Paid")?"var(--alert-green)":"var(--amber-safety)"
J.dv(s,'          <div class="bill-record-header">\n            <span>Cycle: '+p+'</span>\n            <span style="color:'+o+'">'+J.M(r.h(a,n)).toUpperCase()+'</span>\n          </div>\n          <div class="bill-record-details">\n            <span>Readings: '+B.d.H(A.ac(r.h(a,"previous_reading")),1)+" \u2192 "+B.d.H(A.ac(r.h(a,"current_reading")),1)+" m\xb3</span>\n            <strong>\u20b1"+B.d.H(A.ac(r.h(a,"total_due")),2)+'</strong>\n          </div>\n          <div style="font-size:9px;color:var(--text-muted);margin-top:2px;display:flex;justify-content:space-between">\n            <span>'+q+" ("+A.e(r.h(a,"bill_id"))+")</span>\n            <span>Tech: "+A.e(r.h(a,"billed_by"))+"</span>\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:8}
A.kI.prototype={
$0(){J.cd(this.a).C(0,"show")},
$S:2}
A.kF.prototype={
$1(a){return J.cd(t.h.a(a)).C(0,"active")},
$S:9}
A.kG.prototype={
$1(a){return B.a.A(A.x(a)).length!==0},
$S:10}
A.kH.prototype={
$1(a){var s
A.x(a)
s=a.length
if(s!==0){if(0>=s)return A.d(a,0)
s=a[0]}else s=""
return s},
$S:11}
A.j5.prototype={
$4(a,b,c,d){var s,r=this.a&&typeof b=="number"&&isFinite(b),q=r?B.d.H(b,c)+d:"N/A",p=a==null
if((p?null:a.textContent)!==q)if(!p)J.q(a,q)
if(!p){p=a.parentElement
if(p!=null){p=p.querySelector("small")
if(p!=null){p=p.style
p.toString
s=r?"":"none"
p.display=s}}}},
$3(a,b,c){return this.$4(a,b,c,"")},
$S:61}
A.kn.prototype={
$1(a){return B.a.A(A.x(a)).length!==0},
$S:10}
A.ko.prototype={
$1(a){var s
A.x(a)
s=a.length
if(s!==0){if(0>=s)return A.d(a,0)
s=a[0]}else s=""
return s},
$S:11}
A.kp.prototype={
$1(a){return A.e(J.j(t.P.a(a),"status")).toLowerCase()!=="paid"},
$S:0}
A.kq.prototype={
$1(a){return J.i(J.j(t.P.a(a),"billing_month"),this.a)},
$S:0}
A.kr.prototype={
$2(a,b){var s=document.getElementById(a)
if(s!=null)J.q(s,b)},
$S:7}
A.ks.prototype={
$2(a,b){return a==null?"--":B.d.H(A.bP(A.e(a)),b)},
$S:62}
A.kt.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c="status",b="payment_date"
t.P.a(a)
s=document
r=s.createElement("div")
q=J.y(a)
r.className="bill-record-card "+A.e(q.h(a,c))
p=this.a
o=p.a5(q.h(a,"date"))
n=A.e(q.h(a,"billing_month"))
m=J.i(q.h(a,c),"Paid")?"var(--alert-green)":"var(--amber-safety)"
l=J.M(q.h(a,c))
k=B.d.H(A.ac(q.h(a,"previous_reading")),1)
j=B.d.H(A.ac(q.h(a,"current_reading")),1)
i=B.d.H(A.ac(q.h(a,"consumption")),1)
h=B.d.H(A.ac(q.h(a,"total_due")),2)
g=A.e(q.h(a,"bill_id"))
if(J.i(q.h(a,c),"Paid")){f=q.h(a,b)
f=J.M(f==null?"":f).length!==0}else f=!1
p=f?" | Paid: "+p.a5(q.h(a,b)):""
J.dv(r,'        <div class="bill-record-header">\n          <span>Cycle: '+n+'</span>\n          <span style="color:'+m+'">'+l.toUpperCase()+'</span>\n        </div>\n        <div class="bill-record-details">\n          <span>Usage: '+k+" \u2192 "+j+" m\xb3 ("+i+" m\xb3)</span>\n          <strong>\u20b1"+h+'</strong>\n        </div>\n        <div style="font-size:9px;color:var(--text-muted);margin-top:2px;">\n          Bill Ref ID: '+g+" | Issued: "+o+p+"\n        </div>\n      ")
e=t.eO.a(q.h(a,"billing_breakdown"))
d=s.createElement("p")
s=d.style
s.fontSize="11px"
if(e==null)s="Legacy bill: rate breakdown unavailable. Original total retained."
else{s=J.y(e)
s="Recorded: base PHP "+A.e(s.h(e,"base_rate"))+" (includes "+A.e(s.h(e,"included_m3"))+" m\xb3), excess "+A.e(s.h(e,"excess_m3"))+" m\xb3 x PHP "+A.e(s.h(e,"excess_rate"))+" = PHP "+A.e(s.h(e,"excess_charge"))+", environmental fee PHP "+A.e(s.h(e,"environmental_fee"))+"."}B.l.sG(d,s)
r.appendChild(d).toString
this.b.appendChild(r).toString},
$S:8}
A.j0.prototype={
$1(a){var s,r
t.h.a(a)
s=J.a4(a)
r=s.$ti
A.z(s.a,s.b,r.i("~(1)?").a(new A.j_(a)),!1,r.c)},
$S:9}
A.j_.prototype={
$1(a){var s,r,q,p,o
t.V.a(a).preventDefault()
s=t.f_.a(this.a)
r=document
r.toString
q=s.getAttribute("data-"+new A.hj(new A.df(s)).ba("togglePassword"))
p=t.G.a(r.getElementById(q==null?"":q))
if(p==null)return
o=p.type==="password"
B.f.sbl(p,o?"text":"password")
B.i.sG(s,o?"Hide":"Show")},
$S:1}
A.j1.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.j2.prototype={
$1(a){return this.ep(t.V.a(a))},
ep(a){var s=0,r=A.S(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h,g,f
var $async$$1=A.T(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:g=o.a
if(g!=null){g=g.style
g.display="flex"}g=o.b
k=g==null
if(!k)J.q(g,"Loading available puroks...")
q=3
s=6
return A.w($.J().dE("/api/puroks",!1),$async$$1)
case 6:n=c
m=t.g.a(document.getElementById("reg-res-purok"))
j=m
j.children.toString
J.iv(j)
j=n.responseText
j.toString
j=J.aH(t.R.a(J.j(B.c.I(0,j),"puroks")))
while(j.p()){l=j.gt(j)
J.rO(m,A.tz(A.e(l),A.e(l),null,!1))}if(!k){A.eO(t.af,t.h,"T","querySelectorAll")
i=new A.bn(J.rK(m,"option"),t.gp)
J.q(g,new A.ea(t.e3.a(i.az(i)),t.eG).gj(0)===0?"No puroks configured. Contact the administrator.":"")}q=1
s=5
break
case 3:q=2
f=p.pop()
if(!k)J.q(g,"Registration needs an internet connection. Please retry.")
s=5
break
case 2:s=1
break
case 5:return A.Q(null,r)
case 1:return A.P(p.at(-1),r)}})
return A.R($async$$1,r)},
$S:4}
A.j3.prototype={
$1(a0){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a
var $async$$1=A.T(function(a1,a2){if(a1===1){o.push(a2)
s=p}for(;;)switch(s){case 0:a0.preventDefault()
h=m.a
g=!0
if(h!=null){f=h.disabled
f.toString
if(!f){g=m.b.checkValidity()
g.toString
g=!g}}if(g){s=1
break}l=new A.j4()
if(!J.i(l.$1("reg-password"),l.$1("reg-verify-password"))){h=m.c
if(h!=null)J.q(h,"Passwords do not match.")
s=1
break}h.disabled=!0
g=m.c
f=g==null
if(!f)J.q(g,"Submitting registration...")
p=4
e=t.N
s=7
return A.w($.J().ae("/api/residents/register",!1,"POST",A.a6(["Content-Type","application/json"],e,e),B.c.V(A.a6(["owner_name",J.po(l.$1("reg-res-name")),"contact",J.po(l.$1("reg-contact")),"purok",t.g.a(document.getElementById("reg-res-purok")).value,"password",l.$1("reg-password"),"verify_password",l.$1("reg-verify-password")],e,t.x))),$async$$1)
case 7:k=a2
e=k.responseText
e.toString
j=B.c.I(0,e)
e=!0
if(k.status===201)if(t.f.b(j))if(J.i(J.j(j,"status"),"success"))if(J.i(J.j(j,"account_status"),"pending"))if(typeof J.j(j,"house_id")=="string"){d=A.e3("^HH-[1-9][0-9]{0,9}$")
c=A.x(J.j(j,"house_id"))
if(d.b.test(c))if(typeof J.j(j,"account_number")=="string"){e=A.e3("^[A-Za-z0-9][A-Za-z0-9-]{0,99}$")
d=A.x(J.j(j,"account_number"))
e=!e.b.test(d)||!J.i(J.j(j,"resident_id"),J.j(j,"account_number"))}}if(e){e=A.pp(k.status,null)
throw A.b(e)}m.b.reset()
if(!f)J.q(g,"Registration submitted. Resident ID: "+A.e(J.j(j,"house_id"))+". Meter ID: "+A.e(J.j(j,"account_number"))+". Wait for Admin approval before signing in.")
n.push(6)
s=5
break
case 4:p=3
a=o.pop()
e=A.as(a)
if(e instanceof A.at){i=e
if(!f){if(i.a===409)f="This mobile number is already registered. Contact the administrator."
else f=i.a===400?"Check your name, Philippine mobile number, purok, and matching passwords (12-128 characters).":"Registration was not confirmed. Retry with the same contact, or ask Admin to check its status."
J.q(g,f)}}else if(!f)J.q(g,"Unable to submit registration. Please try again.")
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
A.j4.prototype={
$1(a){var s=t.S.a(document.getElementById(a)).value
return s==null?"":s},
$S:11}
A.iF.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=this.a
if(s.a==null||s.c==null||$.J().r.h(0,"allow_worker_collection")!=="true"){s.F("Field payment collection is disabled. Payments must be settled in person at Barangay Hall.")
return}r=t.G.a(document.getElementById("collect-hh-name"))
if(r!=null){q=$.J()
p=s.c
p.toString
p=q.a2(p)
if(p==null)q=null
else{q=J.j(p,"owner_name")
q=q==null?null:J.M(q)}if(q==null){s=s.c
s.toString}else s=q
B.f.sM(r,s)}s=this.b
if(s!=null)B.f.sM(s,"")
s=this.c
if(s!=null){s=s.style
s.display="flex"}},
$S:1}
A.iG.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.iH.prototype={
$1(a){return this.eo(t.V.a(a))},
eo(a1){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0
var $async$$1=A.T(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:b=m.a
a=!0
if(b.c!=null)if(b.a!=null){a=m.b.disabled
a.toString}if(a){s=1
break}a=m.c
a=a==null?null:a.value
f=A.e2(a==null?"":a)
l=f==null?0:f
a=l
if(typeof a!=="number"){q=a.hS()
s=1
break}if(a<=0){b.F("Please enter a valid payment amount!")
s=1
break}a=m.d
e=a==null?null:a.value
k=e==null?"Cash":e
a=b.a.h(0,"worker_id")
if(a==null)a=b.a.h(0,"name")
j=J.M(a==null?"Collector":a)
i=window.localStorage.getItem("waterhall_jwt")
a=b.c
a.toString
h=a
a=m.b
a.disabled=!0
p=4
s=7
return A.w($.J().bM(l,j,h,k),$async$$1)
case 7:g=a3
if(!J.i(i,window.localStorage.getItem("waterhall_jwt"))||b.a==null){n=[1]
s=5
break}d=m.e
if(d!=null){d=d.style
d.display="none"}b.F("Collection recorded! TxID: "+A.e(J.j(g,"transaction_id")))
b.cF(h)
n.push(6)
s=5
break
case 4:p=3
a0=o.pop()
if(J.i(i,window.localStorage.getItem("waterhall_jwt")))b.F("Collection not saved. Check device storage and existing pending payments.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
a.disabled=!1
s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$$1,r)},
$S:4}
A.iY.prototype={
$0(){var s,r,q,p,o,n,m,l=this.a
if(l.d==null||!$.J().P())return
try{s=window.localStorage
s.toString
r=A.b7()
q=this.b
q=q==null?null:q.value
p=this.c
p=p==null?null:p.value
o=l.f
n=document.getElementById("resident-photo-name")
n=n==null?null:n.textContent
s.setItem("waterhall_resident_report_draft",B.c.V(A.a6(["owner",r,"category",q,"description",p,"photo",o,"file_name",n,"operation_id",l.as,"picker_pending",l.r!=null],t.N,t.X)))}catch(m){l.F("Device storage is full. Keep this screen open to retain your draft.")}},
$S:2}
A.iZ.prototype={
$2(a,b){var s,r,q,p,o
this.a.f=a
s=document
r=s.getElementById("resident-photo-name")
if(r!=null)J.q(r,b)
q=s.getElementById("resident-photo-preview")
r=q==null
if(!r)J.cL(q).X(0)
if(!r){p=q.style
p.display="block"}o=A.oz(a)
B.z.sdC(o,"Selected evidence preview")
if(!r)q.appendChild(o).toString
r=s.getElementById("resident-photo-preview-card")
if(r!=null){r=r.style
r.display="block"}s=s.getElementById("resident-photo-pickers")
if(s!=null){s=s.style
s.display="none"}},
$S:7}
A.iB.prototype={
el(a2,a3){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$$2=A.T(function(a4,a5){if(a4===1){o.push(a5)
s=p}for(;;)switch(s){case 0:a=m.a
a0=++a.x
a.y=!0
l=window.localStorage.getItem("waterhall_jwt")
p=4
k=A.e3("^data:image/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$").dK(a2)
if(k==null)throw A.b(B.y)
if(a2.length<=2796302){e=k.b
if(2>=e.length){q=A.d(e,2)
n=[1]
s=5
break}e=e[2]
e.toString
e=B.x.aE(e).length>2097152}else e=!0
if(e){e=A.O("Photo too large")
throw A.b(e)}j=A.oz(null)
i=new A.bL(new A.W($.V,t.cU),t.ou)
e=t.h
d=t.E
c=d.i("~(1)?")
d=d.c
h=A.z(e.a(j),"load",c.a(new A.iC(i)),!1,d)
g=A.z(e.a(j),"error",c.a(new A.iD(i)),!1,d)
p=7
J.t6(j,a2)
s=10
return A.w(i.a.cK(0,B.J),$async$$2)
case 10:e=j.naturalWidth
e.toString
d=j.naturalHeight
d.toString
if(e*d>12e6)throw A.b(B.y)
n.push(9)
s=8
break
case 7:n=[4]
case 8:p=4
s=11
return A.w(J.iw(h),$async$$2)
case 11:s=12
return A.w(J.iw(g),$async$$2)
case 12:s=n.pop()
break
case 9:if(!J.i(a0,a.x)||!J.i(l,window.localStorage.getItem("waterhall_jwt"))||a.d==null){n=[1]
s=5
break}a.as=null
m.b.$2(a2,a3)
m.c.$0()
n.push(6)
s=5
break
case 4:p=3
a1=o.pop()
f=A.as(a1)
if(!J.i(a0,a.x)||!J.i(l,window.localStorage.getItem("waterhall_jwt"))||a.d==null){n=[1]
s=5
break}a.F(f instanceof A.br?"Photo must be at most 2 MiB.":"Invalid image. Use a JPEG, PNG or WebP photo.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.i(a0,a.x))a.y=!1
s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$$2,r)},
$2(a,b){return this.el(a,b)},
$S:63}
A.iC.prototype={
$1(a){var s=this.a
if((s.a.a&30)===0)s.h_(0)},
$S:3}
A.iD.prototype={
$1(a){var s=this.a
if((s.a.a&30)===0)s.bE(B.y)},
$S:3}
A.iN.prototype={
$4(a,b,c,d){var s=this.a
if(s.d==null||a==null||!J.i(a,s.r))return
s.r=null
this.b.$0()
if(typeof d=="string"&&d.length!==0){s.F(d)
return}if(typeof b=="string"&&b.length!==0){s=typeof c=="string"&&c.length!==0?c:"Selected photo"
this.c.$2(b,s)}},
$C:"$4",
$R:4,
$S:64}
A.iX.prototype={
$2(a,b){var s,r,q,p,o,n="NativePhotoPicker",m=this.a
if(m.d==null||m.z||!$.J().P())return
r=$.bx()
if(!r.bf(n)){m=a==null
if(!m)B.f.sM(a,"")
if(!m)a.click()
return}if(m.r!=null)return
s=""+1000*Date.now()+"-"+ ++m.w
m.r=s
q=this.b
q.$0()
try{p=t.N
r.h(0,n).aq("postMessage",A.B([B.c.V(A.a6(["request_id",s,"source",b],p,p))],t.s))}catch(o){m.r=null
q.$0()
m.F("Could not open the photo picker. Please try again.")}},
$S:65}
A.iE.prototype={
$0(){var s,r,q=this,p=q.a;++p.x
p.y=!1
p.f=null
p=q.b
if(p!=null)B.f.sM(p,"")
p=q.c
if(p!=null)B.f.sM(p,"")
p=q.d
if(p!=null)B.f.sM(p,"")
p=document
s=p.getElementById("resident-photo-name")
if(s!=null)J.q(s,"No file chosen")
r=p.getElementById("resident-photo-preview")
if(r!=null)J.cL(r).X(0)
s=p.getElementById("resident-photo-preview-card")
if(s!=null){s=s.style
s.display="none"}p=p.getElementById("resident-photo-pickers")
if(p!=null){p=p.style
p.display="flex"}},
$S:2}
A.iW.prototype={
$1(a){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c
var $async$$1=A.T(function(b,a0){if(b===1){o.push(a0)
s=p}for(;;)switch(s){case 0:d=m.a
if(d.d==null||d.z){s=1
break}h=a==null?null:a.files
if(h==null||h.length===0){s=1
break}l=B.ae.gD(h)
g=l.size
g.toString
if(g>2097152){d.F("Photo must be at most 2 MiB.")
s=1
break}g=l.type
if(!B.b.v(A.B(["image/jpeg","image/png","image/webp"],t.s),g.toLowerCase())){d.F("Use a JPEG, PNG or WebP photo.")
s=1
break}k=window.localStorage.getItem("waterhall_jwt")
j=++d.x
d.y=!0
p=4
g=new FileReader()
g.toString
B.af.hA(g,l)
i=g
s=7
return A.w(new A.cy(t.iB.a(i),"load",!1,t.h6).gD(0).cK(0,B.J),$async$$1)
case 7:if(!J.i(j,d.x)||!J.i(k,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}g=A.x(J.rX(i))
f=l.name
f.toString
s=8
return A.w(m.b.$2(g,f),$async$$1)
case 8:n.push(6)
s=5
break
case 4:p=3
c=o.pop()
if(J.i(j,d.x)&&J.i(k,window.localStorage.getItem("waterhall_jwt")))d.F("Could not load selected photo.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.i(j,d.x))d.y=!1
s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$$1,r)},
$S:66}
A.iO.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iP.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iQ.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iR.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iS.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"camera")},
$S:1}
A.iT.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iU.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iI.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"camera")},
$S:1}
A.iJ.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s.z)return
s.as=s.r=null
this.b.$0()
this.c.$0()
s.F("Photo removed.")},
$S:1}
A.iV.prototype={
$1(a){var s,r=this.a
r.as=null
s=r.ax
if(s!=null)s.a3(0)
r.ax=A.fX(B.ac,this.b)},
$S:3}
A.iK.prototype={
$0(){var s,r,q,p,o=this,n="category",m=o.a
if(m.d==null)return
o.b.$0()
try{r=window.localStorage.getItem("waterhall_resident_report_draft")
s=B.c.I(0,r==null?"{}":r)
if(!J.i(J.j(s,"owner"),A.b7()))return
r=o.c
if(r!=null){q=A.al(J.j(s,"description"))
B.o.sM(r,q==null?"":q)}if(typeof J.j(s,n)=="string"){r=o.d
if(r!=null)B.p.sM(r,A.al(J.j(s,n)))}m.as=A.al(J.j(s,"operation_id"))
if(typeof J.j(s,"photo")=="string"){r=A.x(J.j(s,"photo"))
q=A.al(J.j(s,"file_name"))
if(q==null)q="Selected photo"
o.e.$2(r,q)}if(J.i(J.j(s,"picker_pending"),!0))o.f.$2(null,"recover")}catch(p){m.F("Draft could not be restored. Please select your photo again.")}},
$S:2}
A.iL.prototype={
$1(a){return this.en(t.V.a(a))},
en(a9){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
var $async$$1=A.T(function(b0,b1){if(b0===1){o.push(b1)
s=p}for(;;)switch(s){case 0:a7=m.a
if(a7.d==null||a7.z){s=1
break}if(a7.r!=null||a7.y){a7.F("Finish or cancel the photo picker first.")
s=1
break}c=document
b=t.Y.a(c.getElementById("resident-issue-category"))
l=t.r.a(c.getElementById("resident-log-desc"))
a=b==null?null:b.value
k=a==null?"Water Leak":a
c=l
if(c==null)a0=null
else{c=c.value
c=c==null?null:B.a.A(c)
a0=c}j=a0==null?"":a0
if(J.ao(j)===0){a7.F("Please provide details for the report!")
s=1
break}if(!$.J().P()){s=1
break}i=window.localStorage.getItem("waterhall_jwt")
if(a7.as==null)a7.as=A.it()
c=a7.ax
if(c!=null)c.a3(0)
m.b.$0()
a7.z=!0
h=++a7.Q
c=a7.fy
c===$&&A.aA()
a1=t.h
A.eO(a1,a1,"T","querySelectorAll")
c=c.querySelectorAll("button, input, textarea, select")
c.toString
a1=t.U
a2=a1.i("I<m.E>")
a3=A.a3(new A.I(new A.bn(c,a1),a1.i("F(m.E)").a(new A.iA()),a2),a2.i("h.E"))
g=a3
for(c=g,a1=c.length,a4=0;a4<c.length;c.length===a1||(0,A.ar)(c),++a4)c[a4].setAttribute("disabled","")
p=4
c=$.J()
a1=a7.d
a1.toString
a2=a7.f
a5=a7.as
a5.toString
s=7
return A.w(c.bq(a1,k,j,a2,a5),$async$$1)
case 7:f=b1
if(!J.i(i,window.localStorage.getItem("waterhall_jwt"))||a7.d==null){n=[1]
s=5
break}if(!f)throw A.b(B.r)
a7.F("Report submitted successfully.")
if(l!=null)B.o.sM(l,"")
m.c.$0()
a7.as=null
c=window.localStorage
c.toString
B.k.C(c,"waterhall_resident_report_draft")
n.push(6)
s=5
break
case 4:p=3
a8=o.pop()
c=A.as(a8)
if(c instanceof A.at){e=c
if(e.b||!J.i(i,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}if(e.a===413)c="Photo is too large. Choose a smaller photo; your draft is retained."
else if(e.a===400||e.a===422)c="Report or photo was rejected. Review your draft and retry."
else c=e.a===403?"This account cannot submit this report. Your draft is retained.":"Report was not confirmed. Your draft and photo are retained; retry when connected."
a7.F(c)}else if(J.i(i,window.localStorage.getItem("waterhall_jwt")))a7.F("Report was not confirmed. Your draft and photo are retained.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.i(h,a7.Q)){a7.z=!1
for(a7=g,c=a7.length,a4=0;a4<a7.length;a7.length===c||(0,A.ar)(a7),++a4){d=a7[a4]
d.removeAttribute("disabled")}}s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$$1,r)},
$S:4}
A.iA.prototype={
$1(a){var s
t.h.a(a)
s=a.id
s.toString
if(s!=="btn-resident-logout"){s=a.hasAttribute("disabled")
s.toString
s=!s}else s=!1
return s},
$S:67}
A.iM.prototype={
$1(a){return this.em(t.V.a(a))},
em(a){var s=0,r=A.S(t.H),q,p=this,o,n
var $async$$1=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:o=p.a
n=o.ch
s=n!=null?3:4
break
case 3:s=5
return A.w(n.an(),$async$$1)
case 5:s=1
break
case 4:o.F("Testing server connection...")
s=6
return A.w($.J().bj(),$async$$1)
case 6:if(c)o.F("Server connected! Online sync active.")
else o.F("Server unreachable. Continuing in offline mode.")
case 1:return A.Q(q,r)}})
return A.R($async$$1,r)},
$S:4}
A.at.prototype={
gef(){var s=this.a
return s==null||s===429||s>=500},
l(a){return"API request was not completed."}}
A.kT.prototype={
dB(a){return this.CW=this.CW.dH(new A.kW()).ec(new A.kX(a),t.H)},
b1(a){return this.eD(a)},
eD(a){var s=0,r=A.S(t.H),q=1,p=[],o=this,n,m,l
var $async$b1=A.T(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:m=++o.ch
window.localStorage.setItem("waterhall_jwt",a)
o.z=null
q=3
s=6
return A.w(o.dB(a),$async$b1)
case 6:if(!J.i(m,o.ch)||!o.P())throw A.b(B.j)
q=1
s=5
break
case 3:q=2
l=p.pop()
s=J.i(m,o.ch)?7:8
break
case 7:s=9
return A.w(o.au(!0),$async$b1)
case 9:case 8:throw A.b(B.j)
s=5
break
case 2:s=1
break
case 5:return A.Q(null,r)
case 1:return A.P(p.at(-1),r)}})
return A.R($async$b1,r)},
au(a){var s=0,r=A.S(t.H),q=1,p=[],o=this,n,m,l,k
var $async$au=A.T(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:++o.ch
o.Q=!1
o.at=o.as=null
o.ay.X(0)
n=window
n.toString
m=document.createEvent("Event")
m.toString
J.rJ(m,"waterhall-session-ending",!0,!0)
n.dispatchEvent(m).toString
o.x=!1
m=window.localStorage
m.toString
B.k.C(m,"waterhall_jwt")
m=window.localStorage
m.toString
B.k.C(m,"waterhall_session")
m=window.localStorage
m.toString
B.k.C(m,"waterhall_resident_session")
o.dJ()
o.z=a?"Session expired. Please sign in again.":null
n=o.cx
if(n!=null)n.$1(a)
n=o.cy
n.m(0,o.Y())
q=3
s=6
return A.w(o.dB(null),$async$au)
case 6:q=1
s=5
break
case 3:q=2
k=p.pop()
o.z="Unable to clear native session storage. Please restart the app."
n.m(0,o.Y())
s=5
break
case 2:s=1
break
case 5:return A.Q(null,r)
case 1:return A.P(p.at(-1),r)}})
return A.R($async$au,r)},
aR(){return this.au(!1)},
P(){if(A.bw())return!0
if(window.localStorage.getItem("waterhall_jwt")!=null||window.localStorage.getItem("waterhall_session")!=null||window.localStorage.getItem("waterhall_resident_session")!=null)this.au(!0)
return!1},
c8(a){var s,r=this
r.x=!1
r.y=a
r.z="Server unavailable. Pending operations remain saved and will retry."
s=window
s.toString
s.dispatchEvent(A.th("waterhall-api-unavailable",a)).toString
r.cy.m(0,r.Y())},
fk(){return this.c8(null)},
ae(a,b,c,d,e){return this.fS(a,b,c,t.lG.a(d),e)},
dE(a,b){return this.ae(a,b,"GET",null,null)},
dD(a){return this.ae(a,!0,"GET",null,null)},
co(a,b,c,d){return this.ae(a,!0,b,c,d)},
fS(b0,b1,b2,b3,b4){var s=0,r=A.S(t.la),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9
var $async$ae=A.T(function(b6,b7){if(b6===1){o.push(b7)
s=p}for(;;)switch(s){case 0:a6=A.h5().e7(b0)
a7=J.rW(a6)
a8=A.h5()
if(a7!==a8.gcG(a8)||!B.a.O(J.os(a6),"/api/"))throw A.b(B.r)
if(b1&&!m.P())throw A.b(B.j)
l=m.ch
k=window.localStorage.getItem("waterhall_jwt")
a7=new XMLHttpRequest()
a7.toString
j=a7
i=new A.bL(new A.W($.V,t.ax),t.cz)
h=A.B([],t.dw)
g=null
f=new A.l3(i)
p=4
J.t1(j,b2,b0)
if(b3==null){a7=t.N
a7=A.ai(a7,a7)}else a7=b3
a7.q(0,J.rZ(j))
if(b1)J.t7(j,"Authorization","Bearer "+A.e(k))
a7=t.iB
a8=t.gn
a3=t.J
J.on(h,A.z(a7.a(j),"load",a8.a(new A.l_(i,j)),!1,a3))
J.on(h,A.z(a7.a(j),"error",a8.a(new A.l0(f)),!1,a3))
J.on(h,A.z(a7.a(j),"abort",a8.a(new A.l1(f)),!1,a3))
g=A.fX(B.K,new A.l2(f,j))
J.t4(j,b4)
s=7
return A.w(i.a,$async$ae)
case 7:e=b7
if(b1)a7=!J.i(l,m.ch)||!m.P()
else a7=!1
if(a7)throw A.b(B.j)
if(e.status===401&&b1){m.au(!0)
throw A.b(B.V)}a7=!0
if(e.status!=null){a8=e.status
a8.toString
if(a8>=200){a7=e.status
a7.toString
a7=a7>=300}}if(a7){d=null
if(!b1&&J.os(a6)==="/api/login"){d=e.status===429?"Too many attempts. Please try again in 5 minutes.":"Invalid credentials."
try{a7=e.responseText
c=B.c.I(0,a7==null?"{}":a7)
b=J.j(c,"attempts_remaining")
if(e.status===401&&A.dm(b)&&b>=0&&b<=4)d="Invalid credentials. "+A.e(b)+" attempts remaining."
if(e.status===401&&J.i(J.j(c,"msg"),"Temporary password expired. Contact your administrator."))d=A.al(J.j(c,"msg"))
if(e.status===403)d=J.i(J.j(c,"account_status"),"pending")?"Registration is pending Admin approval.":"Registration was rejected. Contact the administrator."}catch(b5){}}if(J.os(a6)==="/api/password/change"&&e.status===400)try{a7=e.responseText
a=J.j(B.c.I(0,a7==null?"{}":a7),"msg")
if(B.b.v(A.B(["Passwords do not match","Current password is incorrect","Choose a different password","Password must contain 12 to 128 characters"],t.s),a))d=A.al(a)}catch(b5){}a7=e.status===0?null:e.status
a7=A.pp(a7,d)
throw A.b(a7)}q=e
n=[1]
s=5
break
n.push(6)
s=5
break
case 4:p=3
a9=o.pop()
a0=A.as(a9)
if(!J.i(l,m.ch))throw A.b(B.j)
a1=a0 instanceof A.at?a0:B.r
if(!a1.b&&a1.gef())m.c8(a1.a)
throw A.b(a1)
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
a7=g
if(a7!=null)J.iw(a7)
a7=h,a8=a7.length,a5=0
case 8:if(!(a5<a7.length)){s=10
break}a2=a7[a5]
s=11
return A.w(J.iw(a2),$async$ae)
case 11:case 9:a7.length===a8||(0,A.ar)(a7),++a5
s=8
break
case 10:s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$ae,r)},
Y(){var s,r,q,p,o,n,m=this,l=m.aY().length+m.ah().length,k=m.x
if(!k)s="offline"
else if(m.dx)s="syncing"
else s=l>0?"pending_sync":"synced"
r=m.dx||m.db
q=A.bw()
p=m.aY()
o=A.E(p)
o=new A.I(p,o.i("F(1)").a(new A.li()),o.i("I<1>")).gj(0)
p=m.ah()
n=A.E(p)
return A.a6(["status",s,"isOnline",k,"isSyncing",r,"authenticated",q,"reviewCount",o+new A.I(p,n.i("F(1)").a(new A.lj()),n.i("I<1>")).gj(0),"pendingCount",l,"error",m.z],t.N,t.z)},
fQ(){var s=window.localStorage.getItem("waterhall_unsynced_actions")
s=J.ce(t.j.a(B.c.I(0,s==null?"[]":s)),new A.kZ(),t.P)
s=A.a3(s,s.$ti.i("a7.E"))
return s},
ah(){var s=this.fQ(),r=A.E(s),q=r.i("I<1>")
s=A.a3(new A.I(s,r.i("F(1)").a(new A.lu()),q),q.i("h.E"))
return s},
aw(a,b){return this.hz(a,t.P.a(b))},
hz(a,b){var s=0,r=A.S(t.H),q=this,p
var $async$aw=A.T(function(c,d){if(c===1)return A.P(d,r)
for(;;)switch(s){case 0:if(!q.P())throw A.b(B.j)
p=b.h(0,"operation_id")
if(p==null)p=A.it()
b.k(0,"operation_id",p)
s=2
return A.w(A.c9("actions",new A.lv(p,a,b)),$async$aw)
case 2:q.cy.m(0,q.Y())
s=q.x?3:4
break
case 3:s=5
return A.w(q.a4(),$async$aw)
case 5:case 4:return A.Q(null,r)}})
return A.R($async$aw,r)},
a4(){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
var $async$a4=A.T(function(a7,a8){if(a7===1){o.push(a8)
s=p}for(;;)switch(s){case 0:if(m.db||!m.P()){s=1
break}m.db=!0
l=m.ch
e=m.ah()
B.b.aM(e,new A.lz())
k=e
p=4
d=k,d=A.e8(d,0,A.ds(100,"count",t.q),A.E(d).c),c=d.$ti,d=new A.bi(d,d.gj(0),c.i("bi<a7.E>")),b=t.N,c=c.i("a7.E"),a=t.f,a0=t.z,a1=t.t
case 7:if(!d.p()){s=8
break}a2=d.d
j=a2==null?c.a(a2):a2
if(!J.i(l,m.ch)||!m.P()){s=8
break}s=9
return A.w(A.c9("actions",new A.lA(j)),$async$a4)
case 9:p=11
s=14
return A.w(m.co(A.x(J.j(j,"endpoint")),"POST",A.a6(["Content-Type","application/json"],b,b),B.c.V(J.j(j,"body"))),$async$a4)
case 14:i=a8
a2=i.responseText
h=B.c.I(0,a2==null?"{}":a2)
if(!J.i(l,m.ch)||!m.P()){s=8
break}if(!J.i(J.j(h,"status"),"success"))throw A.b(B.W)
s=J.i(J.j(j,"endpoint"),"/api/billing-records/add")?15:16
break
case 15:a2=A.aj(a.a(J.j(j,"body")),b,a0)
a3=A.fq(b,a0)
a3.R(0,a2)
g=a3
J.an(g,"operation_id",J.j(j,"operation_id"))
J.an(g,"bill_id",J.j(h,"bill_id"))
J.an(g,"owner",J.j(j,"owner"))
J.an(g,"sync_status","Synced")
J.an(g,"status","Unpaid")
s=17
return A.w(m.bb(A.B([g],a1)),$async$a4)
case 17:case 16:s=18
return A.w(A.c9("actions",new A.lB(j)),$async$a4)
case 18:p=4
s=13
break
case 11:p=10
a5=o.pop()
a2=A.as(a5)
s=a2 instanceof A.at?19:21
break
case 19:f=a2
if(!f.b){a2=f.a
a2=a2==null||a2===429||a2>=500}else a2=!0
if(a2)throw a5
s=22
return A.w(A.c9("actions",new A.lC(j)),$async$a4)
case 22:s=20
break
case 21:throw a5
case 20:s=13
break
case 10:s=4
break
case 13:s=7
break
case 8:if(J.i(l,m.ch))m.z=B.b.a6(m.ah(),new A.lD())?"Saved operations need review. Their original data remains on this device.":null
n.push(6)
s=5
break
case 4:p=3
a6=o.pop()
if(J.i(l,m.ch)&&A.bw()&&m.x)m.z="Pending operations remain saved for retry."
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.db=!1
m.cy.m(0,m.Y())
s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$a4,r)},
dJ(){var s,r,q,p=this
for(s=B.O.gaF(B.O),s=s.gB(s);s.p();){r=s.gt(s)
q=r.a
if(q!=="offlineCollections"&&q!=="unsyncedActions"){q=window.localStorage
r=r.b
q.getItem(r)
q.removeItem(r)}}s=t.t
p.a=A.B([],s)
p.d=A.B([],s)
p.e=A.B([],s)
p.c=A.B([],s)
p.f=A.B([],s)
s=t.N
r=t.z
p.b=A.ai(s,r)
p.r=A.ai(s,s)
p.w=A.ai(s,r)},
fj(){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=window.localStorage.getItem("waterhall_households")
if(s!=null)i.a=A.aO(t.R.a(B.c.I(0,s)),!0,t.P)
r=window.localStorage.getItem("waterhall_central_assets")
if(r!=null)i.b=A.aj(t.f.a(B.c.I(0,r)),t.N,t.z)
q=window.localStorage.getItem("waterhall_maintenance_logs")
if(q!=null)i.c=A.aO(t.R.a(B.c.I(0,q)),!0,t.P)
p=window.localStorage.getItem("waterhall_workers")
if(p!=null)i.d=A.aO(t.R.a(B.c.I(0,p)),!0,t.P)
o=window.localStorage.getItem("waterhall_billing_records")
if(o!=null)i.e=A.aO(t.R.a(B.c.I(0,o)),!0,t.P)
n=window.localStorage.getItem("waterhall_announcements")
if(n!=null)i.f=A.aO(t.R.a(B.c.I(0,n)),!0,t.P)
m=window.localStorage.getItem("waterhall_billing_config")
if(m!=null)i.w=A.aj(t.f.a(B.c.I(0,m)),t.N,t.z)
l=window.localStorage.getItem("waterhall_payment_settings")
k=t.N
if(l!=null)i.r=A.aj(t.f.a(B.c.I(0,l)),k,k)
else i.r=A.aj($.r4,k,k)}catch(j){A.ca("Unable to load local cache.")}},
aN(){var s,r,q=this
try{s=window.localStorage
s.toString
s.setItem("waterhall_households",B.c.V(q.a))
s=window.localStorage
s.toString
s.setItem("waterhall_central_assets",B.c.V(q.b))
s=window.localStorage
s.toString
s.setItem("waterhall_maintenance_logs",B.c.V(q.c))
s=window.localStorage
s.toString
s.setItem("waterhall_workers",B.c.V(q.d))
s=window.localStorage
s.toString
s.setItem("waterhall_billing_records",B.c.V(q.e))
s=window.localStorage
s.toString
s.setItem("waterhall_announcements",B.c.V(q.f))
s=window.localStorage
s.toString
s.setItem("waterhall_payment_settings",B.c.V(q.r))
s=window.localStorage
s.toString
s.setItem("waterhall_billing_config",B.c.V(q.w))}catch(r){A.ca("Unable to save local cache.")}},
aG(a){return this.hC(a)},
bj(){return this.aG("")},
hC(a1){var s=0,r=A.S(t.y),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0
var $async$aG=A.T(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:if(!m.P()){q=!1
s=1
break}l=window.localStorage.getItem("waterhall_jwt")
if(m.Q){f=m.as
e=l
e=f==null?e==null:f===e
f=e}else f=!1
if(f){q=!1
s=1
break}m.Q=!0
m.as=l
p=4
k=a1.length!==0?"/api/all-data?role="+a1:"/api/all-data"
s=7
return A.w(m.dD(k),$async$aG)
case 7:j=a3
f=j.responseText
f.toString
i=f
if(!J.i(i,m.at)){f=t.P
h=f.a(B.c.I(0,i))
e=J.j(h,"billingConfig")
if(e==null){e=t.z
e=A.ai(e,e)}d=t.f
c=t.N
b=t.z
m.w=A.aj(d.a(e),c,b)
e=t.R
m.a=A.aO(e.a(J.j(h,"households")),!0,f)
m.b=A.aj(d.a(J.j(h,"centralAssets")),c,b)
m.c=A.aO(e.a(J.j(h,"maintenanceLogs")),!0,f)
m.d=A.aO(e.a(J.j(h,"workers")),!0,f)
m.e=A.aO(e.a(J.j(h,"billingRecords")),!0,f)
if(J.op(h,"announcements"))m.f=A.aO(e.a(J.j(h,"announcements")),!0,f)
if(J.op(h,"paymentSettings"))m.r=A.aj(d.a(J.j(h,"paymentSettings")),c,c)
m.at=i;++m.ax
m.ay.X(0)
m.aN()}m.x=!0
m.y=null
m.cy.m(0,m.Y())
s=8
return A.w(m.a4(),$async$aG)
case 8:if(m.x&&m.P())m.aB()
f=m.x&&A.bw()
q=f
n=[1]
s=5
break
n.push(6)
s=5
break
case 4:p=3
a0=o.pop()
g=A.as(a0)
if(!(g instanceof A.at)||!g.b)m.c8(g instanceof A.at?g.a:502)
q=!1
n=[1]
s=5
break
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
f=m.as
e=l
if(f==null?e==null:f===e){m.Q=!1
m.as=null}s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$aG,r)},
a8(){var s=0,r=A.S(t.y),q,p=this,o,n,m
var $async$a8=A.T(function(a,b){if(a===1)return A.P(b,r)
for(;;)switch(s){case 0:p.P()
A.mA(B.I,new A.lo(p))
o=window
o.toString
n=t.oV
m=t.A
A.z(o,"focus",n.a(new A.lp(p)),!1,m)
o=window
o.toString
B.q.aP(o,"waterhall-session-expired",new A.lq(p))
o=window
o.toString
B.q.aP(o,"waterhall-request-unavailable",new A.lr(p))
s=3
return A.w(A.du(),$async$a8)
case 3:p.fj()
if(p.b.a===0)p.b=A.aj($.vX,t.N,t.z)
if(p.r.a===0){o=t.N
p.r=A.aj($.r4,o,o)}o=window
o.toString
A.z(o,"online",n.a(new A.ls(p)),!1,m)
o=window
o.toString
A.z(o,"offline",n.a(new A.lt(p)),!1,m)
s=4
return A.w(p.bj(),$async$a8)
case 4:q=b
s=1
break
case 1:return A.Q(q,r)}})
return A.R($async$a8,r)},
ex(){var s,r,q,p=window.localStorage.getItem("waterhall_offline_collections")
if(p==null)return A.B([],t.t)
try{s=t.j.a(B.c.I(0,p))
r=J.ce(s,new A.l6(),t.P)
r=A.a3(r,r.$ti.i("a7.E"))
return r}catch(q){r=A.B([],t.t)
return r}},
aY(){var s=this.ex(),r=A.E(s),q=r.i("I<1>")
r=A.a3(new A.I(s,r.i("F(1)").a(new A.lh()),q),q.i("h.E"))
return r},
bM(a,b,c,a0){var s=0,r=A.S(t.P),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d
var $async$bM=A.T(function(a1,a2){if(a1===1)return A.P(a2,r)
for(;;)switch(s){case 0:if(!p.P())throw A.b(B.j)
o=p.r.h(0,"allow_worker_collection")
if((o==null?null:o.toLowerCase())!=="true")throw A.b(A.O("Field payment collection is disabled under the Barangay-only payment policy. All payments must be made at the Barangay Hall."))
n=new A.ad(Date.now(),0,!1).ab()
m=A.it()
l=A.a6(["transaction_id",m,"bill_id",null,"house_id",c,"amount_collected",a,"date",n.aa(),"collected_by",b,"payment_method",a0,"sync_status","PENDING","synced_at",null],t.N,t.X)
s=3
return A.w(A.c9("collections",new A.lx(c,b,l)),$async$bM)
case 3:o=p.cy
o.m(0,p.Y())
k=B.a.A(c.toUpperCase())
for(j=p.e,i=j.length,h=0;h<j.length;j.length===i||(0,A.ar)(j),++h){g=j[h]
f=J.y(g)
e=f.h(g,"house_id")
d=B.a.A(J.M(e==null?"":e).toUpperCase())
e=f.h(g,"bill_id")
B.a.A(J.M(e==null?"":e).toUpperCase())
e=d===k&&!J.i(f.h(g,"status"),"Paid")
if(e){f.k(g,"status","Pending sync")
f.k(g,"payment_status","Pending sync")}}p.aN()
A.ca("[OFFLINE STORE] Collection recorded locally: "+m+" for "+c+" (\u20b1"+A.e(a)+"). Status: PENDING.")
if(p.x)p.aB()
else o.m(0,p.Y())
q=l
s=1
break
case 1:return A.Q(q,r)}})
return A.R($async$bM,r)},
aB(){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d
var $async$aB=A.T(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:if(m.dx||!m.P()){s=1
break}i=m.aY()
B.b.aM(i,new A.lE())
l=A.e8(i,0,A.ds(100,"count",t.q),A.E(i).c).az(0)
if(J.ao(l)===0){m.cy.m(0,m.Y())
s=1
break}m.dx=!0
h=m.cy
h.m(0,m.Y())
k=m.ch
p=4
g=l
f=A.E(g)
j=new A.a1(g,f.i("@(1)").a(new A.lF()),f.i("a1<1,@>")).ed(0)
s=7
return A.w(A.c9("collections",new A.lG(j)),$async$aB)
case 7:s=8
return A.w(m.ac(l,k),$async$aB)
case 8:if(J.i(k,m.ch)&&m.P())m.z=B.b.a6(m.aY(),new A.lH())?"Some collections need review. Unacknowledged payments remain saved.":null
n.push(6)
s=5
break
case 4:p=3
d=o.pop()
if(J.i(k,m.ch)&&A.bw()&&m.x)m.z="Sync not confirmed. Pending records remain saved for retry."
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.dx=!1
h.m(0,m.Y())
s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$aB,r)},
ac(a,b){return this.fL(t.p.a(a),b)},
fL(a,b){var s=0,r=A.S(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c
var $async$ac=A.T(function(a0,a1){if(a0===1){o.push(a1)
s=p}for(;;)switch(s){case 0:if(b!==n.ch||!n.P())throw A.b(B.j)
m=null
p=4
g=t.N
s=7
return A.w(n.co("/api/collections/sync","POST",A.a6(["Content-Type","application/json"],g,g),B.c.V(A.a6(["collections",a],g,t.p))),$async$ac)
case 7:l=a1
f=l.responseText
k=t.P.a(B.c.I(0,f==null?"{}":f))
j=J.j(k,"synced_ids")
if(J.i(J.j(k,"status"),"success")&&t.j.b(j)){g=J.t9(j,g)
e=A.cs(g.$ti.i("h.E"))
e.R(0,g)}else e=A.oF(g)
m=e
p=2
s=6
break
case 4:p=3
c=o.pop()
g=A.as(c)
s=g instanceof A.at?8:10
break
case 8:i=g
if(i.b||!B.b.v(A.B([400,403,404,409,422],t.b),i.a))throw c
g=a.length
s=g>1?11:12
break
case 11:h=g/2|0
s=13
return A.w(n.ac(B.b.cY(a,0,h),b),$async$ac)
case 13:s=14
return A.w(n.ac(B.b.eE(a,h),b),$async$ac)
case 14:s=1
break
case 12:if(b!==n.ch||!n.P())throw A.b(B.j)
g=i.a===409?"Bill or transaction conflict. Review before retrying.":"Collection rejected (HTTP "+A.e(i.a)+"). Review before retrying."
s=15
return A.w(n.b8(a,A.oF(t.N),g),$async$ac)
case 15:s=1
break
s=9
break
case 10:throw c
case 9:s=6
break
case 3:s=2
break
case 6:if(b!==n.ch||!n.P())throw A.b(B.j)
s=16
return A.w(n.b8(a,m,"Server did not acknowledge this collection. Retry required."),$async$ac)
case 16:n.x=!0
case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$ac,r)},
b8(a,b,c){return this.fD(t.p.a(a),t.i.a(b),c)},
fD(a,b,c){var s=0,r=A.S(t.H),q=this,p
var $async$b8=A.T(function(d,e){if(d===1)return A.P(e,r)
for(;;)switch(s){case 0:p=A.E(a)
s=2
return A.w(A.c9("collections",new A.kU(new A.a1(a,p.i("@(1)").a(new A.kV()),p.i("a1<1,@>")).ed(0),b,c)),$async$b8)
case 2:q.cy.m(0,q.Y())
return A.Q(null,r)}})
return A.R($async$b8,r)},
bq(a,b,c,d,e){var s=0,r=A.S(t.y),q,p=this,o,n
var $async$bq=A.T(function(f,g){if(f===1)return A.P(g,r)
for(;;)switch(s){case 0:n=t.N
s=3
return A.w(p.co("/api/reports/add","POST",A.a6(["Content-Type","application/json"],n,n),B.c.V(A.a6(["operation_id",e,"household_id",a,"report_type",b,"description",c,"photo_base64",d],n,t.x))),$async$bq)
case 3:n=g.responseText
o=B.c.I(0,n==null?"{}":n)
n=J.y(o)
q=J.i(n.h(o,"status"),"success")&&n.h(o,"report_id")!=null
s=1
break
case 1:return A.Q(q,r)}})
return A.R($async$bq,r)},
a2(a){var s,r,q=this.a,p=B.a.A(a.toLowerCase()),o=B.a.A(A.rd(p,"hh-",""))
try{s=J.rQ(q,new A.lg(p,o))
return s}catch(r){return null}},
bm(a,b){var s=0,r=A.S(t.dZ),q,p=this,o,n,m
var $async$bm=A.T(function(c,d){if(c===1)return A.P(d,r)
for(;;)switch(s){case 0:n=p.a
m=B.b.hg(n,new A.lI(a))
s=m!==-1?3:4
break
case 3:if(!(m>=0&&m<n.length)){q=A.d(n,m)
s=1
break}o=A.aj(n[m],t.N,t.z)
o.k(0,"current_leak_status",b)
if(b==="leak")o.k(0,"leak_detected_at",new A.ad(Date.now(),0,!1).ab().aa())
else o.k(0,"leak_detected_at",null)
s=5
return A.w(p.aw("/api/households/update",o),$async$bm)
case 5:B.b.k(n,m,o)
p.aN()
if(!(m<n.length)){q=A.d(n,m)
s=1
break}q=n[m]
s=1
break
case 4:q=null
s=1
break
case 1:return A.Q(q,r)}})
return A.R($async$bm,r)},
bB(a){return this.fP(t.P.a(a))},
fP(a){var s=0,r=A.S(t.P),q,p=this,o,n
var $async$bB=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:o=p.c
n=A.ai(t.N,t.z)
n.k(0,"task_id","PENDING-"+A.it())
n.k(0,"date",new A.ad(Date.now(),0,!1).ab().aa())
n.R(0,a)
s=3
return A.w(p.aw("/api/maintenance-logs/add",n),$async$bB)
case 3:B.b.cB(o,0,n)
p.aN()
q=n
s=1
break
case 1:return A.Q(q,r)}})
return A.R($async$bB,r)},
cP(){var s,r,q,p,o,n,m,l,k=t.N,j=A.ai(k,t.P)
for(s=this.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.ar)(s),++q){p=s[q]
j.k(0,A.e(J.j(p,"bill_id")),p)}for(s=this.ah(),r=A.E(s),o=r.i("F(1)").a(new A.lf()),s=B.b.gB(s),r=new A.ay(s,o,r.i("ay<1>")),o=t.f,n=t.z;r.p();){m=s.gt(0)
l=J.y(m)
p=A.aj(o.a(l.h(m,"body")),k,n)
p.k(0,"status",l.h(m,"sync_error")==null?"Pending sync":"Needs review")
j.k(0,A.e(p.h(0,"bill_id")),p)}k=j.$ti.i("b2<2>")
k=A.a3(new A.b2(j,k),k.i("h.E"))
return k},
hO(){var s,r,q,p,o,n,m,l,k,j="operation_id",i=A.b7(),h=A.B([],t.t),g=window.localStorage
g=g.getItem("waterhall_bill_history")
g=J.ce(t.j.a(B.c.I(0,g==null?"[]":g)),new A.lJ(),t.P)
s=g.cZ(0,g.$ti.i("F(a7.E)").a(new A.lK(i)))
for(g=J.aH(s.a),r=new A.ay(g,s.b,s.$ti.i("ay<1>"));r.p();)B.b.m(h,g.gt(g))
for(g=this.ah(),r=A.E(g),q=r.i("F(1)").a(new A.lL()),g=B.b.gB(g),r=new A.ay(g,q,r.i("ay<1>")),q=t.f,p=t.N,o=t.z;r.p();){n=g.gt(0)
if(B.b.a6(h,new A.lM(n)))continue
m=J.y(n)
l=A.aj(q.a(m.h(n,"body")),p,o)
k=A.fq(p,o)
k.R(0,l)
k.k(0,j,m.h(n,j))
k.k(0,"sync_status",m.h(n,"sync_error")==null?"Pending Sync":"Failed Sync")
k.k(0,"status","Not yet issued")
B.b.m(h,k)}B.b.aM(h,new A.lN())
return h},
bb(a){return this.fY(t.p.a(a))},
fY(a){var s=0,r=A.S(t.H)
var $async$bb=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:s=2
return A.w(A.c9("bill_history",new A.l5(a,A.b7())),$async$bb)
case 2:return A.Q(null,r)}})
return A.R($async$bb,r)},
be(a,b){var s=0,r=A.S(t.P),q,p=this,o,n,m,l,k,j,i,h,g,f
var $async$be=A.T(function(c,d){if(c===1)return A.P(d,r)
for(;;)switch(s){case 0:g=t.N
f=A.ai(g,g)
f.k(0,"limit","25")
f.k(0,"q",b)
if(a!=null)f.k(0,"before",A.e(a))
o=A.qy(null,0,0)
n=A.qv(null,0,0,!1)
b=A.qx(null,0,0,f)
m=A.qu(null,0,0)
l=A.nA(null,"")
if(n==null)if(o.length===0)f=l!=null
else f=!0
else f=!1
if(f)n=""
f=n==null
k=!f
j=A.qw(null,0,0,null,"",k)
if(f&&!B.a.O(j,"/"))j=A.oY(j,k)
else j=A.cF(j)
i=A.eI("",o,f&&B.a.O(j,"//")?"":n,l,j,b,m).f
s=3
return A.w(p.dD("/api/worker/transactions?"+(i==null?"":i)),$async$be)
case 3:f=d.responseText
f.toString
h=A.aj(t.f.a(B.c.I(0,f)),g,t.z)
s=4
return A.w(p.bb(A.aO(t.R.a(h.h(0,"records")),!0,t.P)),$async$be)
case 4:q=h
s=1
break
case 1:return A.Q(q,r)}})
return A.R($async$be,r)},
bV(a){var s=this.cP(),r=A.E(s),q=r.i("I<1>"),p=A.a3(new A.I(s,r.i("F(1)").a(new A.ld(B.a.A(a.toUpperCase()))),q),q.i("h.E"))
B.b.aM(p,new A.le())
return p},
ey(a){var s,r,q=B.a.A(a.toUpperCase()),p=this.ah(),o=A.E(p),n=o.i("aK<1,t<c,@>>"),m=n.i("I<h.E>"),l=A.a3(new A.I(new A.aK(new A.I(p,o.i("F(1)").a(new A.l9()),o.i("I<1>")),o.i("t<c,@>(1)").a(new A.la()),n),n.i("F(h.E)").a(new A.lb(q)),m),m.i("h.E"))
if(l.length!==0){B.b.aM(l,new A.lc())
s=J.j(B.b.gD(l),"current_reading")
if(typeof s=="number")return s}r=this.a2(a)
return A.nM(r==null?null:J.j(r,"current_m3_usage"))},
cw(a,b){var s,r,q=B.a.A(a.toUpperCase()),p=B.a.A(b.toLowerCase())
if(B.b.a6(this.e,new A.lk(q,p)))return!0
s=this.ah()
r=A.E(s)
if(new A.aK(new A.I(s,r.i("F(1)").a(new A.ll()),r.i("I<1>")),r.i("t<c,@>(1)").a(new A.lm()),r.i("aK<1,t<c,@>>")).a6(0,new A.ln(q,p)))return!0
return!1},
aO(a){return this.fO(t.P.a(a))},
fO(a){var s=0,r=A.S(t.P),q,p=this,o,n,m,l
var $async$aO=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:m=a.h(0,"house_id")
l=B.a.A(J.M(m==null?"":m).toUpperCase())
m=a.h(0,"billing_month")
o=B.a.A(J.M(m==null?"":m).toLowerCase())
if(p.cw(l,o))throw A.b(A.O("A bill for this cycle ("+o+") already exists or is pending synchronization."))
m=A.ai(t.N,t.z)
m.k(0,"bill_id","PENDING-"+A.it())
n=a.h(0,"date")
m.k(0,"date",n==null?new A.ad(Date.now(),0,!1).ab().aa():n)
m.k(0,"status","Pending sync")
m.k(0,"is_synced",!1)
m.R(0,a)
n=p.a2(l)
m.k(0,"family_head_name",n==null?null:J.j(n,"owner_name"))
s=3
return A.w(p.aw("/api/billing-records/add",m),$async$aO)
case 3:s=p.x&&p.P()?4:6
break
case 4:s=7
return A.w(p.a4(),$async$aO)
case 7:if(!B.b.a6(p.ah(),new A.kY(m))){m.k(0,"is_synced",!0)
m.k(0,"status","Unpaid")}s=p.P()?8:9
break
case 8:s=10
return A.w(p.bj(),$async$aO)
case 10:case 9:s=5
break
case 6:p.aN()
p.cy.m(0,p.Y())
case 5:q=m
s=1
break
case 1:return A.Q(q,r)}})
return A.R($async$aO,r)},
cO(a){return this.ay.e1(0,a,new A.l8(this,a))},
cQ(a){var s=a.length===0?this.f:this.cO(a),r=J.y(s)
return r.gE(s)?null:r.gD(s)},
bz(a,b,c){var s=0,r=A.S(t.H),q=this,p,o
var $async$bz=A.T(function(d,e){if(d===1)return A.P(e,r)
for(;;)switch(s){case 0:p=t.N
o=A.a6(["message",a,"author",b,"target_audience",c,"timestamp",new A.ad(Date.now(),0,!1).ab().aa()],p,p)
s=2
return A.w(q.aw("/api/announcements/add",o),$async$bz)
case 2:B.b.cB(q.f,0,o)
q.ay.X(0)
q.aN()
return A.Q(null,r)}})
return A.R($async$bz,r)},
shv(a){this.cx=t.mW.a(a)}}
A.kW.prototype={
$1(a){},
$S:15}
A.kX.prototype={
$1(a){return A.ir(this.a)},
$S:68}
A.l3.prototype={
$0(){var s=this.a
if((s.a.a&30)===0)s.bE(B.r)},
$S:2}
A.l_.prototype={
$1(a){var s
t.J.a(a)
s=this.a
if((s.a.a&30)===0)s.bc(0,this.b)},
$S:22}
A.l0.prototype={
$1(a){t.J.a(a)
return this.a.$0()},
$S:22}
A.l1.prototype={
$1(a){t.J.a(a)
return this.a.$0()},
$S:22}
A.l2.prototype={
$0(){this.a.$0()
this.b.abort()},
$S:2}
A.li.prototype={
$1(a){return J.j(t.P.a(a),"sync_error")!=null},
$S:0}
A.lj.prototype={
$1(a){return J.j(t.P.a(a),"sync_error")!=null},
$S:0}
A.kZ.prototype={
$1(a){return A.aj(t.f.a(a),t.N,t.z)},
$S:18}
A.lu.prototype={
$1(a){return J.i(J.j(t.P.a(a),"owner"),A.b7())},
$S:0}
A.lv.prototype={
$1(a){return B.b.m(t.p.a(a),A.a6(["operation_id",this.a,"owner",A.b7(),"endpoint",this.b,"body",this.c],t.N,t.z))},
$S:5}
A.lz.prototype={
$2(a,b){var s,r="last_sync_attempt",q=t.P
q.a(a)
q.a(b)
q=J.j(a,r)
q=J.M(q==null?"":q)
s=J.j(b,r)
return B.a.a1(q,J.M(s==null?"":s))},
$S:12}
A.lA.prototype={
$1(a){var s,r,q,p,o,n="operation_id"
t.p.a(a)
for(r=a.length,q=this.a,p=J.y(q),o=0;o<a.length;a.length===r||(0,A.ar)(a),++o){s=a[o]
if(J.i(J.j(s,n),p.h(q,n)))J.an(s,"last_sync_attempt",new A.ad(Date.now(),0,!1).ab().aa())}},
$S:5}
A.lB.prototype={
$1(a){return B.b.hE(t.p.a(a),new A.ly(this.a))},
$S:5}
A.ly.prototype={
$1(a){var s="operation_id"
return J.i(J.j(t.P.a(a),s),J.j(this.a,s))},
$S:0}
A.lC.prototype={
$1(a){var s,r,q,p,o,n="operation_id"
t.p.a(a)
for(r=a.length,q=this.a,p=J.y(q),o=0;o<a.length;a.length===r||(0,A.ar)(a),++o){s=a[o]
if(J.i(J.j(s,n),p.h(q,n)))J.an(s,"sync_error","Server rejected this saved operation. Review with Admin; the original operation is retained.")}},
$S:5}
A.lD.prototype={
$1(a){return J.j(t.P.a(a),"sync_error")!=null},
$S:0}
A.lo.prototype={
$1(a){t.D.a(a)
return this.a.P()},
$S:17}
A.lp.prototype={
$1(a){return this.a.P()},
$S:3}
A.lq.prototype={
$1(a){t.A.a(a)
this.a.au(!0)},
$S:13}
A.lr.prototype={
$1(a){var s
t.A.a(a)
s=this.a
if(s.P())s.fk()},
$S:13}
A.ls.prototype={
$1(a){A.ca("[NET] Internet restored. Starting automatic synchronization...")
this.a.bj()},
$S:3}
A.lt.prototype={
$1(a){var s
A.ca("[NET] Internet disconnected. Entering offline mode.")
s=this.a
s.x=!1
s.cy.m(0,s.Y())},
$S:3}
A.l6.prototype={
$1(a){return A.aj(t.f.a(a),t.N,t.z)},
$S:18}
A.lh.prototype={
$1(a){var s
t.P.a(a)
s=J.y(a)
return J.i(s.h(a,"sync_status"),"PENDING")&&J.i(s.h(a,"collected_by"),A.b7())},
$S:0}
A.lx.prototype={
$1(a){t.p.a(a)
if(B.b.a6(a,new A.lw(this.a,this.b)))throw A.b(A.O("A collection for this household is already pending"))
B.b.cB(a,0,this.c)},
$S:5}
A.lw.prototype={
$1(a){var s
t.P.a(a)
s=J.y(a)
return J.i(s.h(a,"house_id"),this.a)&&J.i(s.h(a,"collected_by"),this.b)&&J.i(s.h(a,"sync_status"),"PENDING")},
$S:0}
A.lE.prototype={
$2(a,b){var s,r="last_sync_attempt",q=t.P
q.a(a)
q.a(b)
q=J.j(a,r)
q=J.M(q==null?"":q)
s=J.j(b,r)
return B.a.a1(q,J.M(s==null?"":s))},
$S:12}
A.lF.prototype={
$1(a){return J.j(t.P.a(a),"transaction_id")},
$S:36}
A.lG.prototype={
$1(a){var s,r,q,p
t.p.a(a)
for(r=a.length,q=this.a,p=0;p<a.length;a.length===r||(0,A.ar)(a),++p){s=a[p]
if(J.i(J.j(s,"collected_by"),A.b7())&&q.v(0,J.j(s,"transaction_id")))J.an(s,"last_sync_attempt",new A.ad(Date.now(),0,!1).ab().aa())}},
$S:5}
A.lH.prototype={
$1(a){return J.j(t.P.a(a),"sync_error")!=null},
$S:0}
A.kV.prototype={
$1(a){return J.j(t.P.a(a),"transaction_id")},
$S:36}
A.kU.prototype={
$1(a){var s,r,q,p,o,n,m,l="transaction_id",k="sync_status",j="sync_error"
t.p.a(a)
for(s=a.length,r=this.c,q=this.b,p=this.a,o=0;o<a.length;a.length===s||(0,A.ar)(a),++o){n=a[o]
m=J.y(n)
if(!J.i(m.h(n,"collected_by"),A.b7())||!p.v(0,m.h(n,l))||!J.i(m.h(n,k),"PENDING"))continue
if(q.v(0,m.h(n,l))){m.k(n,k,"SYNCED")
m.k(n,"synced_at",new A.ad(Date.now(),0,!1).ab().aa())
m.C(n,j)}else m.k(n,j,r)}},
$S:5}
A.lg.prototype={
$1(a){var s,r,q,p,o,n,m
t.P.a(a)
n=J.y(a)
m=n.h(a,"house_id")
s=B.a.A(J.M(m==null?"":m).toLowerCase())
r=B.a.A(A.rd(s,"hh-",""))
m=n.h(a,"account_number")
q=B.a.A(J.M(m==null?"":m).toLowerCase())
m=n.h(a,"owner_name")
p=B.a.A(J.M(m==null?"":m).toLowerCase())
m=A.e(n.h(a,"purok"))
n=n.h(a,"lot")
o=B.a.A((m+" "+A.e(n==null?"":n)).toLowerCase())
n=this.a
return n===s||this.b===r||n===q||n===p||n===o},
$S:0}
A.lI.prototype={
$1(a){return J.i(J.j(t.P.a(a),"house_id"),this.a)},
$S:0}
A.lf.prototype={
$1(a){return J.i(J.j(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.lJ.prototype={
$1(a){return A.aj(t.f.a(a),t.N,t.z)},
$S:18}
A.lK.prototype={
$1(a){return J.i(J.j(t.P.a(a),"owner"),this.a)},
$S:0}
A.lL.prototype={
$1(a){return J.i(J.j(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.lM.prototype={
$1(a){var s="operation_id"
return J.i(J.j(t.P.a(a),s),J.j(this.a,s))},
$S:0}
A.lN.prototype={
$2(a,b){var s,r=t.P
r.a(a)
r=J.j(r.a(b),"date")
r=J.M(r==null?"":r)
s=J.j(a,"date")
return B.a.a1(r,J.M(s==null?"":s))},
$S:12}
A.l5.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j
t.p.a(a)
for(s=this.a,r=s.length,q=this.b,p=A.E(a).i("F(1)"),o=a.$flags|0,n=t.N,m=t.z,l=0;l<s.length;s.length===r||(0,A.ar)(s),++l){k=s[l]
j=p.a(new A.l4(q,k))
o&1&&A.am(a,16)
B.b.dk(a,j,!0)
j=A.fq(n,m)
j.R(0,k)
j.k(0,"owner",q)
B.b.m(a,j)}},
$S:5}
A.l4.prototype={
$1(a){var s,r,q,p="operation_id",o="bill_id"
t.P.a(a)
s=J.y(a)
if(J.i(s.h(a,"owner"),this.a)){r=this.b
q=J.y(r)
if(!(q.h(r,p)!=null&&J.i(s.h(a,p),q.h(r,p))))s=q.h(r,o)!=null&&J.i(s.h(a,o),q.h(r,o))
else s=!0}else s=!1
return s},
$S:0}
A.ld.prototype={
$1(a){var s=J.j(t.P.a(a),"house_id")
return B.a.A(J.M(s==null?"":s).toUpperCase())===this.a},
$S:0}
A.le.prototype={
$2(a,b){var s,r,q="date",p=2026,o=t.P
o.a(a)
o.a(b)
o=J.y(a)
if(o.h(a,q)!=null){o=A.pz(A.x(o.h(a,q)))
s=o==null?A.lO(p):o}else s=A.lO(p)
o=J.y(b)
if(o.h(b,q)!=null){o=A.pz(A.x(o.h(b,q)))
r=o==null?A.lO(p):o}else r=A.lO(p)
return r.a1(0,s)},
$S:12}
A.l9.prototype={
$1(a){return J.i(J.j(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.la.prototype={
$1(a){return A.aj(t.f.a(J.j(t.P.a(a),"body")),t.N,t.z)},
$S:37}
A.lb.prototype={
$1(a){var s=J.j(t.P.a(a),"house_id")
return B.a.A(J.M(s==null?"":s).toUpperCase())===this.a},
$S:0}
A.lc.prototype={
$2(a,b){var s,r=t.P
r.a(a)
r=J.j(r.a(b),"date")
r=J.M(r==null?"":r)
s=J.j(a,"date")
return B.a.a1(r,J.M(s==null?"":s))},
$S:12}
A.lk.prototype={
$1(a){var s,r
t.P.a(a)
s=J.y(a)
r=s.h(a,"house_id")
if(B.a.A(J.M(r==null?"":r).toUpperCase())===this.a){s=s.h(a,"billing_month")
s=B.a.A(J.M(s==null?"":s).toLowerCase())===this.b}else s=!1
return s},
$S:0}
A.ll.prototype={
$1(a){return J.i(J.j(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.lm.prototype={
$1(a){return A.aj(t.f.a(J.j(t.P.a(a),"body")),t.N,t.z)},
$S:37}
A.ln.prototype={
$1(a){var s,r
t.P.a(a)
s=J.y(a)
r=s.h(a,"house_id")
if(B.a.A(J.M(r==null?"":r).toUpperCase())===this.a){s=s.h(a,"billing_month")
s=B.a.A(J.M(s==null?"":s).toLowerCase())===this.b}else s=!1
return s},
$S:0}
A.kY.prototype={
$1(a){var s="operation_id"
return J.i(J.j(t.P.a(a),s),this.a.h(0,s))},
$S:0}
A.l8.prototype={
$0(){var s=this.a.f,r=A.E(s),q=r.i("I<1>")
s=A.a3(new A.I(s,r.i("F(1)").a(new A.l7(this.b)),q),q.i("h.E"))
return s},
$S:74}
A.l7.prototype={
$1(a){var s,r="target_audience"
t.P.a(a)
s=J.y(a)
if(!J.i(s.h(a,r),"Everyone")){s=s.h(a,r)
s=J.i(s,this.a==="resident"?"Residents only":"Workers only")}else s=!0
return s},
$S:0}
A.ob.prototype={
$1(a){var s=0,r=A.S(t.a),q=this,p,o,n,m
var $async$$1=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:m=q.a
if(m==null||A.b7()!==m)throw A.b(A.O("Session changed before local save"))
m=q.b
if(m==="collections")p="waterhall_offline_collections"
else p=m==="bill_history"?"waterhall_bill_history":"waterhall_unsynced_actions"
o=window.localStorage.getItem(p)
o=J.ce(t.j.a(B.c.I(0,o==null?"[]":o)),new A.oa(),t.P)
n=A.a3(o,o.$ti.i("a7.E"))
q.c.$1(n)
s=2
return A.w(A.nU(m,n),$async$$1)
case 2:return A.Q(null,r)}})
return A.R($async$$1,r)},
$S:75}
A.oa.prototype={
$1(a){return A.aj(t.f.a(a),t.N,t.z)},
$S:18}
A.oc.prototype={
$1(a){},
$S:15}
A.nV.prototype={
$1(a){var s,r
t.P.a(a)
s=J.y(a)
r=s.h(a,"owner")
s=r==null?s.h(a,"collected_by"):r
return J.i(s,this.a)},
$S:0}
A.oh.prototype={
$1(a){var s,r,q,p,o,n,m,l,k="operation_id"
t.p.a(a)
for(s=a.length,r=this.b==="bill_history",q=this.a,p=0;p<a.length;a.length===s||(0,A.ar)(a),++p){o=a[p]
n=J.y(o)
if(r){m=A.e(n.h(o,"owner"))
l=n.h(o,"bill_id")
n=m+"|"+A.e(l==null?n.h(o,k):l)}else{m=n.h(o,"transaction_id")
n=J.M(m==null?n.h(o,k):m)}q.e1(0,n,new A.og(o))}B.b.X(a)
B.b.R(a,new A.b2(q,A.C(q).i("b2<2>")))},
$S:5}
A.og.prototype={
$0(){return this.a},
$S:32}
A.mk.prototype={
eP(a,b){var s,r,q,p,o=this,n="resident-connection-title",m=o.c,l=t.N
new A.df(m).R(0,A.a6(["role","dialog","aria-modal","true","aria-labelledby",n],l,l))
l=o.d
l.id=n
s=document
r=s.createElement("div")
r.className="resident-connection-card"
r.children.toString
q=A.oz("logo.png")
B.z.sdC(q,"WaterHall")
p=o.f
A.tY(r,t.cj.a(A.B([q,l,o.e,p],t.il)))
m.appendChild(r).toString
s.body.appendChild(m).toString
m=t.C
A.z(p,"click",m.i("~(1)?").a(new A.ml(o)),!1,m.c)
m=window
m.toString
p=t.oV
s=t.A
A.z(m,"offline",p.a(new A.mm(o)),!1,s)
m=window
m.toString
A.z(m,"online",p.a(new A.mn(o)),!1,s)
s=window
s.toString
B.q.aP(s,"waterhall-request-unavailable",new A.mo(o))
s=window
s.toString
B.q.aP(s,"waterhall-api-unavailable",new A.mp(o))
s=window
s.toString
B.q.aP(s,"waterhall-session-ending",new A.mq(o))
s=o.a.cy
new A.bv(s,A.C(s).i("bv<1>")).dT(new A.mr(o))
o.de()},
by(a){var s
this.c.hidden=!a
s=document.querySelector(".device-container")
if(a){if(s!=null)s.setAttribute("inert","")}else if(s!=null)s.removeAttribute("inert")},
de(){var s,r=this
r.r=!1
B.v.sG(r.d,"Connecting\u2026")
B.l.sG(r.e,"Checking the WaterHall connection\u2026")
s=r.f
B.i.sG(s,"Retrying\u2026")
s.disabled=!0
r.by(!0)},
ak(a){var s,r,q=this
q.r=!1
s=a==null
r=s?"Internet Error":"Service Unavailable"
B.v.sG(q.d,r)
if(s)s="No internet connection. Please check your connection and try again."
else s=a===429?"Too many requests. Please try again shortly.":"WaterHall is temporarily unavailable. Please try again."
B.l.sG(q.e,s)
s=q.f
B.i.sG(s,"Retry")
s.disabled=q.w
q.by(!0)},
cl(){var s,r=this
if(window.navigator.onLine===!1){r.ak(null)
return}s=r.r
r.r=!0
r.by(!1)
if(!s)r.b.$0()},
bp(a){var s=0,r=A.S(t.H),q=this,p
var $async$bp=A.T(function(b,c){if(b===1)return A.P(c,r)
for(;;)switch(s){case 0:s=A.bw()&&window.localStorage.getItem("waterhall_resident_session")!=null?2:4
break
case 2:p=q.a
if(p.x)q.cl()
else q.ak(p.y)
s=3
break
case 4:s=5
return A.w(q.an(),$async$bp)
case 5:case 3:return A.Q(null,r)}})
return A.R($async$bp,r)},
an(){var s=0,r=A.S(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e
var $async$an=A.T(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:if(m.w){s=1
break}m.w=!0
l=m.x
m.de()
p=4
k=null
s=A.bw()&&window.localStorage.getItem("waterhall_resident_session")!=null?7:9
break
case 7:h=m.a
s=h.Q?10:12
break
case 10:g=h.cy
s=13
return A.w(new A.bv(g,A.C(g).i("bv<1>")).gD(0).cK(0,B.K),$async$an)
case 13:k=h.x
s=11
break
case 12:s=14
return A.w(h.aG("resident"),$async$an)
case 14:k=b
case 11:s=8
break
case 9:h=m.a
s=15
return A.w(h.dE("/api/ready",!1),$async$an)
case 15:j=b
g=j.responseText
k=J.i(J.j(B.c.I(0,g==null?"{}":g),"status"),"ready")
if(!k)throw A.b(B.X)
case 8:if(!J.i(l,m.x)){n=[1]
s=5
break}if(k)m.cl()
else m.ak(h.y)
n.push(6)
s=5
break
case 4:p=3
e=o.pop()
h=A.as(e)
if(h instanceof A.at){i=h
if(!J.i(l,m.x)||i.b){n=[1]
s=5
break}m.ak(i.a)}else if(J.i(l,m.x))m.ak(502)
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.i(l,m.x)){m.w=!1
h=m.f
B.i.sG(h,"Retry")
h.disabled=!1}s=n.pop()
break
case 6:case 1:return A.Q(q,r)
case 2:return A.P(o.at(-1),r)}})
return A.R($async$an,r)}}
A.ml.prototype={
$1(a){t.V.a(a)
return this.a.an()},
$S:1}
A.mm.prototype={
$1(a){return this.a.ak(null)},
$S:3}
A.mn.prototype={
$1(a){return this.a.an()},
$S:3}
A.mo.prototype={
$1(a){t.A.a(a)
return this.a.ak(null)},
$S:3}
A.mp.prototype={
$1(a){var s=B.a8.gh6(t.l7.a(t.A.a(a))),r=A.dm(s)?s:null
this.a.ak(r)},
$S:13}
A.mq.prototype={
$1(a){var s
t.A.a(a)
s=this.a;++s.x
s.w=!1
s.by(!1)},
$S:13}
A.mr.prototype={
$1(a){var s,r,q="isOnline"
t.P.a(a)
s=this.a
if(s.w)return
r=J.y(a)
if(J.i(r.h(a,q),!0)&&A.bw()&&window.localStorage.getItem("waterhall_resident_session")!=null)s.cl()
else if(J.i(r.h(a,q),!1)&&J.i(r.h(a,"authenticated"),!0))s.ak(s.a.y)},
$S:8};(function aliases(){var s=J.cU.prototype
s.eG=s.l
s=J.bZ.prototype
s.eJ=s.l
s=A.m.prototype
s.eK=s.bX
s=A.h.prototype
s.cZ=s.bT
s=A.H.prototype
s.eL=s.l
s=A.D.prototype
s.bY=s.a7
s=A.f.prototype
s.eF=s.bA
s=A.ew.prototype
s.eN=s.ap
s=A.b0.prototype
s.eH=s.h
s.eI=s.k
s=A.dg.prototype
s.eM=s.k})();(function installTearOffs(){var s=hunkHelpers._static_1,r=hunkHelpers._static_0,q=hunkHelpers._static_2,p=hunkHelpers._instance_2u,o=hunkHelpers._instance_0u,n=hunkHelpers.installStaticTearOff,m=hunkHelpers._instance_2i
s(A,"vs","tR",19)
s(A,"vt","tS",19)
s(A,"vu","tT",19)
r(A,"r2","vl",2)
s(A,"vv","vb",16)
q(A,"vx","vd",27)
r(A,"vw","vc",2)
p(A.W.prototype,"gd7","f5",27)
o(A.de.prototype,"gfm","fn",2)
s(A,"vz","uN",14)
s(A,"xc","pE",77)
n(A,"vI",4,null,["$4"],["u1"],35,0)
n(A,"vJ",4,null,["$4"],["u2"],35,0)
m(A.bC.prototype,"geB","cT",7)
s(A,"vR","nR",26)
s(A,"vQ","p0",52)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.mixinHard,q=hunkHelpers.inherit,p=hunkHelpers.inheritMany
q(A.H,null)
p(A.H,[A.oC,J.cU,A.d6,J.be,A.a0,A.m,A.bU,A.mt,A.h,A.bi,A.dU,A.ay,A.ec,A.aJ,A.bK,A.G,A.c2,A.d_,A.dy,A.ep,A.fk,A.mB,A.mg,A.dF,A.ez,A.nl,A.m6,A.dR,A.dS,A.dQ,A.dM,A.nj,A.i9,A.bl,A.ht,A.nx,A.eD,A.ha,A.eA,A.aB,A.c1,A.dd,A.ee,A.mz,A.hf,A.bo,A.W,A.hb,A.ei,A.hM,A.de,A.hX,A.eL,A.en,A.ax,A.hC,A.cD,A.aG,A.cg,A.f4,A.mV,A.nh,A.nH,A.nE,A.ad,A.b_,A.fG,A.e5,A.n_,A.bg,A.au,A.a8,A.i_,A.av,A.eH,A.mH,A.bb,A.kS,A.ox,A.ek,A.oP,A.cA,A.A,A.dZ,A.ew,A.i1,A.cl,A.hi,A.hS,A.eK,A.nq,A.mN,A.b0,A.mf,A.ne,A.iz,A.at,A.kT,A.mk])
p(J.cU,[J.fj,J.dL,J.a,J.cV,J.cW,J.cp,J.bY])
p(J.a,[J.bZ,J.a5,A.bF,A.ap,A.f,A.eS,A.bS,A.bf,A.Y,A.hh,A.aI,A.o,A.f9,A.fa,A.dA,A.hl,A.dC,A.hn,A.fc,A.hr,A.aN,A.fg,A.hw,A.cT,A.cZ,A.fr,A.hE,A.hF,A.aP,A.hG,A.hI,A.aQ,A.hN,A.hQ,A.aT,A.hT,A.aU,A.hW,A.aD,A.i3,A.fV,A.aW,A.i5,A.fZ,A.h6,A.ia,A.ic,A.ie,A.ih,A.ij,A.cY,A.b1,A.hA,A.b4,A.hK,A.fJ,A.hY,A.b5,A.i7,A.eX,A.hd])
p(J.bZ,[J.fH,J.bJ,J.bD])
p(A.d6,[J.fi,A.hR])
q(J.m0,J.a5)
p(J.cp,[J.dK,J.fl])
p(A.a0,[A.dO,A.bH,A.fm,A.h2,A.fL,A.hq,A.dN,A.eU,A.b8,A.fD,A.eb,A.h0,A.br,A.f3])
p(A.m,[A.da,A.he,A.bn,A.aF,A.ff])
p(A.da,[A.f2,A.ea])
p(A.bU,[A.f0,A.f1,A.fS,A.o3,A.o5,A.mR,A.mQ,A.nN,A.n9,A.nc,A.mx,A.mw,A.nn,A.m8,A.lR,A.lS,A.lT,A.mY,A.mZ,A.me,A.md,A.no,A.np,A.nu,A.kQ,A.kR,A.lU,A.lV,A.m3,A.nS,A.nT,A.nY,A.nZ,A.o_,A.o7,A.oe,A.of,A.o8,A.jN,A.jO,A.jP,A.jL,A.jQ,A.jR,A.jS,A.jT,A.ja,A.j6,A.j7,A.j8,A.j9,A.jc,A.jd,A.je,A.jh,A.ji,A.jb,A.jj,A.jk,A.jl,A.jm,A.jn,A.jo,A.jf,A.jg,A.jD,A.jE,A.jF,A.jx,A.jy,A.jz,A.jA,A.jB,A.jp,A.kA,A.kB,A.kC,A.kJ,A.k9,A.ka,A.k8,A.kb,A.k7,A.k5,A.k6,A.kd,A.k2,A.k3,A.k4,A.ke,A.k0,A.kg,A.kh,A.kf,A.jV,A.kv,A.kw,A.kx,A.ky,A.ki,A.kj,A.kk,A.kl,A.km,A.jH,A.jI,A.jJ,A.jK,A.jq,A.jr,A.js,A.jt,A.ju,A.jv,A.jw,A.kD,A.kE,A.jX,A.jZ,A.jW,A.kF,A.kG,A.kH,A.j5,A.kn,A.ko,A.kp,A.kq,A.kt,A.j0,A.j_,A.j1,A.j2,A.j3,A.j4,A.iF,A.iG,A.iH,A.iC,A.iD,A.iN,A.iW,A.iO,A.iP,A.iQ,A.iR,A.iS,A.iT,A.iU,A.iI,A.iJ,A.iV,A.iL,A.iA,A.iM,A.kW,A.kX,A.l_,A.l0,A.l1,A.li,A.lj,A.kZ,A.lu,A.lv,A.lA,A.lB,A.ly,A.lC,A.lD,A.lo,A.lp,A.lq,A.lr,A.ls,A.lt,A.l6,A.lh,A.lx,A.lw,A.lF,A.lG,A.lH,A.kV,A.kU,A.lg,A.lI,A.lf,A.lJ,A.lK,A.lL,A.lM,A.l5,A.l4,A.ld,A.l9,A.la,A.lb,A.lk,A.ll,A.lm,A.ln,A.kY,A.l7,A.ob,A.oa,A.oc,A.nV,A.oh,A.ml,A.mm,A.mn,A.mo,A.mp,A.mq,A.mr])
p(A.f0,[A.od,A.mS,A.mT,A.nw,A.nv,A.n0,A.n5,A.n4,A.n2,A.n1,A.n8,A.n7,A.n6,A.nb,A.my,A.mv,A.nk,A.nP,A.nm,A.nW,A.nG,A.nF,A.lP,A.jM,A.jU,A.jC,A.k1,A.jG,A.kI,A.iY,A.iE,A.iK,A.l3,A.l2,A.l8,A.og])
p(A.h,[A.n,A.aK,A.I,A.cx,A.eo,A.di])
p(A.n,[A.a7,A.cr,A.b2,A.dP,A.em])
p(A.a7,[A.e7,A.a1,A.hD,A.hz])
q(A.bA,A.aK)
p(A.G,[A.db,A.bh,A.el,A.hy,A.hc,A.hj])
q(A.ct,A.db)
q(A.dk,A.d_)
q(A.c4,A.dk)
q(A.dz,A.c4)
q(A.by,A.dy)
p(A.f1,[A.mi,A.m1,A.o4,A.nO,A.nX,A.na,A.nd,A.m7,A.m9,A.ni,A.mc,A.nD,A.mJ,A.mI,A.nC,A.nB,A.ma,A.mb,A.ms,A.mu,A.mU,A.mW,A.mX,A.nJ,A.ns,A.nt,A.mP,A.kN,A.kK,A.kc,A.ku,A.kz,A.jY,A.k_,A.kL,A.kr,A.ks,A.iZ,A.iB,A.iX,A.lz,A.lE,A.lN,A.le,A.lc])
q(A.e_,A.bH)
p(A.fS,[A.fO,A.cP])
q(A.fA,A.bF)
p(A.ap,[A.dV,A.aw])
p(A.aw,[A.er,A.et])
q(A.es,A.er)
q(A.dW,A.es)
q(A.eu,A.et)
q(A.b3,A.eu)
p(A.dW,[A.fv,A.fw])
p(A.b3,[A.fx,A.fy,A.fz,A.fB,A.fC,A.dX,A.dY])
q(A.dj,A.hq)
p(A.c1,[A.dh,A.cy])
q(A.ef,A.dh)
q(A.bv,A.ef)
q(A.eg,A.dd)
q(A.bM,A.eg)
q(A.ed,A.ee)
q(A.bL,A.hf)
q(A.eh,A.ei)
q(A.hP,A.eL)
q(A.cB,A.el)
p(A.ax,[A.ev,A.f5])
q(A.cC,A.ev)
p(A.cg,[A.dw,A.fd,A.fn])
p(A.f4,[A.f_,A.kO,A.m5,A.m4,A.mL,A.mK])
q(A.fo,A.dN)
q(A.ng,A.nh)
q(A.h7,A.fd)
p(A.b8,[A.d4,A.fh])
q(A.hk,A.eH)
p(A.f,[A.v,A.dE,A.dG,A.fe,A.co,A.d0,A.aS,A.ex,A.aV,A.aE,A.eB,A.h9,A.c5,A.bu,A.eZ,A.bR])
p(A.v,[A.D,A.bq,A.cj,A.dc])
p(A.D,[A.r,A.u])
p(A.r,[A.cN,A.eT,A.cO,A.cf,A.bT,A.cQ,A.cm,A.cS,A.dI,A.bX,A.bG,A.d2,A.c0,A.e4,A.e9,A.fQ,A.fR,A.d9,A.cv])
q(A.f6,A.bf)
q(A.ch,A.hh)
p(A.aI,[A.f7,A.f8])
p(A.o,[A.ci,A.bt,A.b9,A.h8])
q(A.hm,A.hl)
q(A.dB,A.hm)
q(A.ho,A.hn)
q(A.fb,A.ho)
q(A.aM,A.bS)
q(A.hs,A.hr)
q(A.ck,A.hs)
q(A.hx,A.hw)
q(A.bW,A.hx)
q(A.dH,A.cj)
q(A.bC,A.co)
p(A.bt,[A.bE,A.aC])
q(A.fs,A.hE)
q(A.ft,A.hF)
q(A.hH,A.hG)
q(A.fu,A.hH)
q(A.hJ,A.hI)
q(A.d1,A.hJ)
q(A.hO,A.hN)
q(A.fI,A.hO)
q(A.fK,A.hQ)
q(A.ey,A.ex)
q(A.fM,A.ey)
q(A.hU,A.hT)
q(A.fN,A.hU)
q(A.e6,A.hW)
q(A.i4,A.i3)
q(A.fT,A.i4)
q(A.eC,A.eB)
q(A.fU,A.eC)
q(A.i6,A.i5)
q(A.fY,A.i6)
q(A.ib,A.ia)
q(A.hg,A.ib)
q(A.ej,A.dC)
q(A.id,A.ic)
q(A.hu,A.id)
q(A.ig,A.ie)
q(A.eq,A.ig)
q(A.ii,A.ih)
q(A.hV,A.ii)
q(A.ik,A.ij)
q(A.i0,A.ik)
q(A.df,A.hc)
p(A.f5,[A.hp,A.eW])
q(A.aX,A.cy)
q(A.i2,A.ew)
q(A.nr,A.nq)
q(A.mO,A.mN)
p(A.b0,[A.cX,A.dg])
q(A.cq,A.dg)
q(A.hB,A.hA)
q(A.fp,A.hB)
q(A.hL,A.hK)
q(A.fE,A.hL)
q(A.d7,A.u)
q(A.hZ,A.hY)
q(A.fP,A.hZ)
q(A.i8,A.i7)
q(A.h_,A.i8)
q(A.eY,A.hd)
q(A.fF,A.bR)
s(A.da,A.bK)
s(A.er,A.m)
s(A.es,A.aJ)
s(A.et,A.m)
s(A.eu,A.aJ)
s(A.db,A.aG)
s(A.dk,A.aG)
s(A.hh,A.kS)
s(A.hl,A.m)
s(A.hm,A.A)
s(A.hn,A.m)
s(A.ho,A.A)
s(A.hr,A.m)
s(A.hs,A.A)
s(A.hw,A.m)
s(A.hx,A.A)
s(A.hE,A.G)
s(A.hF,A.G)
s(A.hG,A.m)
s(A.hH,A.A)
s(A.hI,A.m)
s(A.hJ,A.A)
s(A.hN,A.m)
s(A.hO,A.A)
s(A.hQ,A.G)
s(A.ex,A.m)
s(A.ey,A.A)
s(A.hT,A.m)
s(A.hU,A.A)
s(A.hW,A.G)
s(A.i3,A.m)
s(A.i4,A.A)
s(A.eB,A.m)
s(A.eC,A.A)
s(A.i5,A.m)
s(A.i6,A.A)
s(A.ia,A.m)
s(A.ib,A.A)
s(A.ic,A.m)
s(A.id,A.A)
s(A.ie,A.m)
s(A.ig,A.A)
s(A.ih,A.m)
s(A.ii,A.A)
s(A.ij,A.m)
s(A.ik,A.A)
r(A.dg,A.m)
s(A.hA,A.m)
s(A.hB,A.A)
s(A.hK,A.m)
s(A.hL,A.A)
s(A.hY,A.m)
s(A.hZ,A.A)
s(A.i7,A.m)
s(A.i8,A.A)
s(A.hd,A.G)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{l:"int",X:"double",a_:"num",c:"String",F:"bool",a8:"Null",p:"List",H:"Object",t:"Map",k:"JSObject"},mangledNames:{},types:["F(t<c,@>)","~(aC)","~()","~(o)","ag<~>(aC)","~(p<t<c,@>>)","~(c,@)","~(c,c)","~(t<c,@>)","~(D)","F(c)","c(c)","l(t<c,@>,t<c,@>)","a8(o)","@(@)","a8(@)","~(@)","~(fW)","t<c,@>(@)","~(~())","a8()","ag<~>(o)","~(b9)","F(bj)","F(v)","a8(H,bm)","H?(H?)","~(H,bm)","~(@,@)","~(H?,H?)","@()","~(bE)","t<c,@>()","c(t<c,H>)","l(c?)","F(D,c,c,cA)","@(t<c,@>)","t<c,@>(t<c,@>)","~(ba<c>)","ag<~>()","~(l,@)","a8(~())","@(c)","~(F)","a8(@,bm)","~(v,v?)","a8(@,@)","~(d8,@)","0&()","@(@,@)","~(c,D)","~(t<c,c>)","H?(@)","~(c)","F(ba<c>)","a_(a_,a_)","t<c,H>(au<l,a_>)","@(@,c)","~(t<c,H>)","D(v)","@(H?)","~(D?,@,l[c])","c(@,l)","ag<~>(c,c)","a8(@,@,@,@)","~(cR?,c)","ag<~>(cR?)","F(D)","ag<~>(~)","t<c,c>(t<c,c>,c)","0&(c,l?)","~(c,c?)","cX(@)","cq<@>(@)","p<t<c,@>>()","ag<a8>(~)","b0(@)","c(f)","a_(a_,t<c,@>)","~(l,c)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.ul(v.typeUniverse,JSON.parse('{"fH":"bZ","bJ":"bZ","bD":"bZ","ww":"a","wx":"a","w4":"a","w2":"o","wr":"o","w5":"bR","w3":"f","wB":"f","wF":"f","w1":"u","wt":"u","x_":"b9","w6":"r","wz":"r","wG":"v","wq":"v","wU":"cj","wC":"aC","wT":"aE","w8":"bt","wk":"bu","w7":"bq","wI":"bq","wy":"D","wv":"co","wu":"bW","w9":"Y","wc":"bf","wf":"aD","wg":"aI","wb":"aI","wd":"aI","wA":"bF","fj":{"F":[],"Z":[]},"dL":{"a8":[],"Z":[]},"a":{"k":[]},"bZ":{"k":[]},"a5":{"p":["1"],"n":["1"],"k":[],"h":["1"]},"fi":{"d6":[]},"m0":{"a5":["1"],"p":["1"],"n":["1"],"k":[],"h":["1"]},"be":{"ae":["1"]},"cp":{"X":[],"a_":[]},"dK":{"X":[],"l":[],"a_":[],"Z":[]},"fl":{"X":[],"a_":[],"Z":[]},"bY":{"c":[],"mh":[],"Z":[]},"dO":{"a0":[]},"f2":{"m":["l"],"bK":["l"],"p":["l"],"n":["l"],"h":["l"],"m.E":"l","bK.E":"l"},"n":{"h":["1"]},"a7":{"n":["1"],"h":["1"]},"e7":{"a7":["1"],"n":["1"],"h":["1"],"a7.E":"1","h.E":"1"},"bi":{"ae":["1"]},"aK":{"h":["2"],"h.E":"2"},"bA":{"aK":["1","2"],"n":["2"],"h":["2"],"h.E":"2"},"dU":{"ae":["2"]},"a1":{"a7":["2"],"n":["2"],"h":["2"],"a7.E":"2","h.E":"2"},"I":{"h":["1"],"h.E":"1"},"ay":{"ae":["1"]},"cx":{"h":["1"],"h.E":"1"},"ec":{"ae":["1"]},"da":{"m":["1"],"bK":["1"],"p":["1"],"n":["1"],"h":["1"]},"hD":{"a7":["l"],"n":["l"],"h":["l"],"a7.E":"l","h.E":"l"},"ct":{"G":["l","1"],"aG":["l","1"],"t":["l","1"],"G.K":"l","G.V":"1","aG.K":"l","aG.V":"1"},"c2":{"d8":[]},"dz":{"c4":["1","2"],"dk":["1","2"],"d_":["1","2"],"aG":["1","2"],"t":["1","2"],"aG.K":"1","aG.V":"2"},"dy":{"t":["1","2"]},"by":{"dy":["1","2"],"t":["1","2"]},"eo":{"h":["1"],"h.E":"1"},"ep":{"ae":["1"]},"fk":{"pF":[]},"e_":{"bH":[],"a0":[]},"fm":{"a0":[]},"h2":{"a0":[]},"ez":{"bm":[]},"bU":{"cn":[]},"f0":{"cn":[]},"f1":{"cn":[]},"fS":{"cn":[]},"fO":{"cn":[]},"cP":{"cn":[]},"fL":{"a0":[]},"bh":{"G":["1","2"],"pL":["1","2"],"t":["1","2"],"G.K":"1","G.V":"2"},"cr":{"n":["1"],"h":["1"],"h.E":"1"},"dR":{"ae":["1"]},"b2":{"n":["1"],"h":["1"],"h.E":"1"},"dS":{"ae":["1"]},"dP":{"n":["au<1,2>"],"h":["au<1,2>"],"h.E":"au<1,2>"},"dQ":{"ae":["au<1,2>"]},"dM":{"tH":[],"mh":[]},"bF":{"k":[],"dx":[],"Z":[]},"fA":{"bF":[],"pY":[],"k":[],"dx":[],"Z":[]},"ap":{"k":[],"af":[]},"i9":{"dx":[]},"dV":{"ap":[],"kP":[],"k":[],"af":[],"Z":[]},"aw":{"ap":[],"N":["1"],"k":[],"af":[]},"dW":{"m":["X"],"aw":["X"],"p":["X"],"ap":[],"N":["X"],"n":["X"],"k":[],"af":[],"h":["X"],"aJ":["X"]},"b3":{"m":["l"],"aw":["l"],"p":["l"],"ap":[],"N":["l"],"n":["l"],"k":[],"af":[],"h":["l"],"aJ":["l"]},"fv":{"lW":[],"m":["X"],"aw":["X"],"p":["X"],"ap":[],"N":["X"],"n":["X"],"k":[],"af":[],"h":["X"],"aJ":["X"],"Z":[],"m.E":"X"},"fw":{"lX":[],"m":["X"],"aw":["X"],"p":["X"],"ap":[],"N":["X"],"n":["X"],"k":[],"af":[],"h":["X"],"aJ":["X"],"Z":[],"m.E":"X"},"fx":{"b3":[],"lY":[],"m":["l"],"aw":["l"],"p":["l"],"ap":[],"N":["l"],"n":["l"],"k":[],"af":[],"h":["l"],"aJ":["l"],"Z":[],"m.E":"l"},"fy":{"b3":[],"lZ":[],"m":["l"],"aw":["l"],"p":["l"],"ap":[],"N":["l"],"n":["l"],"k":[],"af":[],"h":["l"],"aJ":["l"],"Z":[],"m.E":"l"},"fz":{"b3":[],"m_":[],"m":["l"],"aw":["l"],"p":["l"],"ap":[],"N":["l"],"n":["l"],"k":[],"af":[],"h":["l"],"aJ":["l"],"Z":[],"m.E":"l"},"fB":{"b3":[],"mD":[],"m":["l"],"aw":["l"],"p":["l"],"ap":[],"N":["l"],"n":["l"],"k":[],"af":[],"h":["l"],"aJ":["l"],"Z":[],"m.E":"l"},"fC":{"b3":[],"mE":[],"m":["l"],"aw":["l"],"p":["l"],"ap":[],"N":["l"],"n":["l"],"k":[],"af":[],"h":["l"],"aJ":["l"],"Z":[],"m.E":"l"},"dX":{"b3":[],"mF":[],"m":["l"],"aw":["l"],"p":["l"],"ap":[],"N":["l"],"n":["l"],"k":[],"af":[],"h":["l"],"aJ":["l"],"Z":[],"m.E":"l"},"dY":{"b3":[],"mG":[],"m":["l"],"aw":["l"],"p":["l"],"ap":[],"N":["l"],"n":["l"],"k":[],"af":[],"h":["l"],"aJ":["l"],"Z":[],"m.E":"l"},"hq":{"a0":[]},"dj":{"bH":[],"a0":[]},"eD":{"fW":[]},"eA":{"ae":["1"]},"di":{"h":["1"],"h.E":"1"},"aB":{"a0":[]},"bv":{"ef":["1"],"dh":["1"],"c1":["1"]},"bM":{"eg":["1"],"dd":["1"],"bs":["1"],"c6":["1"]},"ee":{"pZ":["1"],"qk":["1"],"c6":["1"]},"ed":{"ee":["1"],"pZ":["1"],"qk":["1"],"c6":["1"]},"bL":{"hf":["1"]},"W":{"ag":["1"]},"ef":{"dh":["1"],"c1":["1"]},"eg":{"dd":["1"],"bs":["1"],"c6":["1"]},"dd":{"bs":["1"],"c6":["1"]},"dh":{"c1":["1"]},"eh":{"ei":["1"]},"de":{"bs":["1"]},"eL":{"q8":[]},"hP":{"eL":[],"q8":[]},"el":{"G":["1","2"],"t":["1","2"]},"cB":{"el":["1","2"],"G":["1","2"],"t":["1","2"],"G.K":"1","G.V":"2"},"em":{"n":["1"],"h":["1"],"h.E":"1"},"en":{"ae":["1"]},"cC":{"ax":["1"],"ba":["1"],"n":["1"],"h":["1"],"ax.E":"1"},"cD":{"ae":["1"]},"ea":{"m":["1"],"bK":["1"],"p":["1"],"n":["1"],"h":["1"],"m.E":"1","bK.E":"1"},"m":{"p":["1"],"n":["1"],"h":["1"]},"G":{"t":["1","2"]},"db":{"G":["1","2"],"aG":["1","2"],"t":["1","2"]},"d_":{"t":["1","2"]},"c4":{"dk":["1","2"],"d_":["1","2"],"aG":["1","2"],"t":["1","2"],"aG.K":"1","aG.V":"2"},"ax":{"ba":["1"],"n":["1"],"h":["1"]},"ev":{"ax":["1"],"ba":["1"],"n":["1"],"h":["1"]},"hy":{"G":["c","@"],"t":["c","@"],"G.K":"c","G.V":"@"},"hz":{"a7":["c"],"n":["c"],"h":["c"],"a7.E":"c","h.E":"c"},"dw":{"cg":["p<l>","c"]},"fd":{"cg":["c","p<l>"]},"dN":{"a0":[]},"fo":{"a0":[]},"fn":{"cg":["H?","c"]},"h7":{"cg":["c","p<l>"]},"X":{"a_":[]},"l":{"a_":[]},"p":{"n":["1"],"h":["1"]},"ba":{"n":["1"],"h":["1"]},"c":{"mh":[]},"eU":{"a0":[]},"bH":{"a0":[]},"b8":{"a0":[]},"d4":{"a0":[]},"fh":{"a0":[]},"fD":{"a0":[]},"eb":{"a0":[]},"h0":{"a0":[]},"br":{"a0":[]},"f3":{"a0":[]},"fG":{"a0":[]},"e5":{"a0":[]},"i_":{"bm":[]},"av":{"tK":[]},"eH":{"h3":[]},"bb":{"h3":[]},"hk":{"h3":[]},"Y":{"k":[]},"D":{"v":[],"f":[],"k":[]},"o":{"k":[]},"f":{"k":[]},"aM":{"bS":[],"k":[]},"aN":{"k":[]},"bC":{"f":[],"k":[]},"cR":{"D":[],"v":[],"f":[],"k":[]},"bE":{"o":[],"k":[]},"aP":{"k":[]},"aC":{"o":[],"k":[]},"v":{"f":[],"k":[]},"bG":{"r":[],"D":[],"v":[],"f":[],"k":[]},"aQ":{"k":[]},"b9":{"o":[],"k":[]},"aS":{"f":[],"k":[]},"aT":{"k":[]},"aU":{"k":[]},"aD":{"k":[]},"aV":{"f":[],"k":[]},"aE":{"f":[],"k":[]},"aW":{"k":[]},"cA":{"bj":[]},"r":{"D":[],"v":[],"f":[],"k":[]},"eS":{"k":[]},"cN":{"r":[],"D":[],"v":[],"f":[],"k":[]},"eT":{"r":[],"D":[],"v":[],"f":[],"k":[]},"cO":{"r":[],"D":[],"v":[],"f":[],"k":[]},"bS":{"k":[]},"cf":{"r":[],"D":[],"v":[],"f":[],"k":[]},"bT":{"r":[],"D":[],"v":[],"f":[],"k":[]},"bq":{"v":[],"f":[],"k":[]},"f6":{"k":[]},"ch":{"k":[]},"aI":{"k":[]},"bf":{"k":[]},"f7":{"k":[]},"f8":{"k":[]},"ci":{"o":[],"k":[]},"f9":{"k":[]},"cQ":{"r":[],"D":[],"v":[],"f":[],"k":[]},"cj":{"v":[],"f":[],"k":[]},"fa":{"k":[]},"dA":{"k":[]},"dB":{"m":["bk<a_>"],"A":["bk<a_>"],"p":["bk<a_>"],"N":["bk<a_>"],"n":["bk<a_>"],"k":[],"h":["bk<a_>"],"m.E":"bk<a_>","A.E":"bk<a_>"},"dC":{"bk":["a_"],"k":[]},"fb":{"m":["c"],"A":["c"],"p":["c"],"N":["c"],"n":["c"],"k":[],"h":["c"],"m.E":"c","A.E":"c"},"fc":{"k":[]},"he":{"m":["D"],"p":["D"],"n":["D"],"h":["D"],"m.E":"D"},"bn":{"m":["1"],"p":["1"],"n":["1"],"h":["1"],"m.E":"1"},"dE":{"f":[],"k":[]},"ck":{"m":["aM"],"A":["aM"],"p":["aM"],"N":["aM"],"n":["aM"],"k":[],"h":["aM"],"m.E":"aM","A.E":"aM"},"dG":{"f":[],"k":[]},"fe":{"f":[],"k":[]},"cm":{"r":[],"D":[],"v":[],"f":[],"k":[]},"cS":{"r":[],"D":[],"v":[],"f":[],"k":[]},"fg":{"k":[]},"bW":{"m":["v"],"A":["v"],"p":["v"],"N":["v"],"n":["v"],"k":[],"h":["v"],"m.E":"v","A.E":"v"},"dH":{"v":[],"f":[],"k":[]},"co":{"f":[],"k":[]},"cT":{"k":[]},"dI":{"r":[],"D":[],"v":[],"f":[],"k":[]},"bX":{"pv":[],"cR":[],"r":[],"D":[],"v":[],"f":[],"k":[]},"cZ":{"k":[]},"fr":{"k":[]},"d0":{"f":[],"k":[]},"fs":{"G":["c","@"],"k":[],"t":["c","@"],"G.K":"c","G.V":"@"},"ft":{"G":["c","@"],"k":[],"t":["c","@"],"G.K":"c","G.V":"@"},"fu":{"m":["aP"],"A":["aP"],"p":["aP"],"N":["aP"],"n":["aP"],"k":[],"h":["aP"],"m.E":"aP","A.E":"aP"},"aF":{"m":["v"],"p":["v"],"n":["v"],"h":["v"],"m.E":"v"},"d1":{"m":["v"],"A":["v"],"p":["v"],"N":["v"],"n":["v"],"k":[],"h":["v"],"m.E":"v","A.E":"v"},"d2":{"r":[],"D":[],"v":[],"f":[],"k":[]},"fI":{"m":["aQ"],"A":["aQ"],"p":["aQ"],"N":["aQ"],"n":["aQ"],"k":[],"h":["aQ"],"m.E":"aQ","A.E":"aQ"},"fK":{"G":["c","@"],"k":[],"t":["c","@"],"G.K":"c","G.V":"@"},"c0":{"r":[],"D":[],"v":[],"f":[],"k":[]},"fM":{"m":["aS"],"A":["aS"],"p":["aS"],"f":[],"N":["aS"],"n":["aS"],"k":[],"h":["aS"],"m.E":"aS","A.E":"aS"},"e4":{"r":[],"D":[],"v":[],"f":[],"k":[]},"fN":{"m":["aT"],"A":["aT"],"p":["aT"],"N":["aT"],"n":["aT"],"k":[],"h":["aT"],"m.E":"aT","A.E":"aT"},"e6":{"G":["c","c"],"k":[],"t":["c","c"],"G.K":"c","G.V":"c"},"e9":{"r":[],"D":[],"v":[],"f":[],"k":[]},"fQ":{"r":[],"D":[],"v":[],"f":[],"k":[]},"fR":{"r":[],"D":[],"v":[],"f":[],"k":[]},"d9":{"r":[],"D":[],"v":[],"f":[],"k":[]},"cv":{"r":[],"D":[],"v":[],"f":[],"k":[]},"fT":{"m":["aE"],"A":["aE"],"p":["aE"],"N":["aE"],"n":["aE"],"k":[],"h":["aE"],"m.E":"aE","A.E":"aE"},"fU":{"m":["aV"],"A":["aV"],"p":["aV"],"f":[],"N":["aV"],"n":["aV"],"k":[],"h":["aV"],"m.E":"aV","A.E":"aV"},"fV":{"k":[]},"fY":{"m":["aW"],"A":["aW"],"p":["aW"],"N":["aW"],"n":["aW"],"k":[],"h":["aW"],"m.E":"aW","A.E":"aW"},"fZ":{"k":[]},"bt":{"o":[],"k":[]},"h6":{"k":[]},"h9":{"f":[],"k":[]},"c5":{"mM":[],"f":[],"k":[]},"bu":{"f":[],"k":[]},"dc":{"v":[],"f":[],"k":[]},"hg":{"m":["Y"],"A":["Y"],"p":["Y"],"N":["Y"],"n":["Y"],"k":[],"h":["Y"],"m.E":"Y","A.E":"Y"},"ej":{"bk":["a_"],"k":[]},"hu":{"m":["aN?"],"A":["aN?"],"p":["aN?"],"N":["aN?"],"n":["aN?"],"k":[],"h":["aN?"],"m.E":"aN?","A.E":"aN?"},"eq":{"m":["v"],"A":["v"],"p":["v"],"N":["v"],"n":["v"],"k":[],"h":["v"],"m.E":"v","A.E":"v"},"hV":{"m":["aU"],"A":["aU"],"p":["aU"],"N":["aU"],"n":["aU"],"k":[],"h":["aU"],"m.E":"aU","A.E":"aU"},"i0":{"m":["aD"],"A":["aD"],"p":["aD"],"N":["aD"],"n":["aD"],"k":[],"h":["aD"],"m.E":"aD","A.E":"aD"},"hc":{"G":["c","c"],"t":["c","c"]},"df":{"G":["c","c"],"t":["c","c"],"G.K":"c","G.V":"c"},"hj":{"G":["c","c"],"t":["c","c"],"G.K":"c","G.V":"c"},"hp":{"ax":["c"],"ba":["c"],"n":["c"],"h":["c"],"ax.E":"c"},"cy":{"c1":["1"]},"aX":{"cy":["1"],"c1":["1"]},"ek":{"bs":["1"]},"dZ":{"bj":[]},"ew":{"bj":[]},"i2":{"bj":[]},"i1":{"bj":[]},"cl":{"ae":["1"]},"hi":{"mM":[],"f":[],"k":[]},"hS":{"tM":[]},"eK":{"ty":[]},"f5":{"ax":["c"],"ba":["c"],"n":["c"],"h":["c"]},"ff":{"m":["D"],"p":["D"],"n":["D"],"h":["D"],"m.E":"D"},"cY":{"k":[]},"h8":{"o":[],"k":[]},"cX":{"b0":[]},"cq":{"m":["1"],"p":["1"],"n":["1"],"b0":[],"h":["1"],"m.E":"1"},"hR":{"d6":[]},"b1":{"k":[]},"b4":{"k":[]},"b5":{"k":[]},"fp":{"m":["b1"],"A":["b1"],"p":["b1"],"n":["b1"],"k":[],"h":["b1"],"m.E":"b1","A.E":"b1"},"fE":{"m":["b4"],"A":["b4"],"p":["b4"],"n":["b4"],"k":[],"h":["b4"],"m.E":"b4","A.E":"b4"},"fJ":{"k":[]},"d7":{"u":[],"D":[],"v":[],"f":[],"k":[]},"fP":{"m":["c"],"A":["c"],"p":["c"],"n":["c"],"k":[],"h":["c"],"m.E":"c","A.E":"c"},"eW":{"ax":["c"],"ba":["c"],"n":["c"],"h":["c"],"ax.E":"c"},"u":{"D":[],"v":[],"f":[],"k":[]},"h_":{"m":["b5"],"A":["b5"],"p":["b5"],"n":["b5"],"k":[],"h":["b5"],"m.E":"b5","A.E":"b5"},"eX":{"k":[]},"eY":{"G":["c","@"],"k":[],"t":["c","@"],"G.K":"c","G.V":"@"},"eZ":{"f":[],"k":[]},"bR":{"f":[],"k":[]},"fF":{"f":[],"k":[]},"kP":{"af":[]},"m_":{"p":["l"],"n":["l"],"af":[],"h":["l"]},"mG":{"p":["l"],"n":["l"],"af":[],"h":["l"]},"mF":{"p":["l"],"n":["l"],"af":[],"h":["l"]},"lY":{"p":["l"],"n":["l"],"af":[],"h":["l"]},"mD":{"p":["l"],"n":["l"],"af":[],"h":["l"]},"lZ":{"p":["l"],"n":["l"],"af":[],"h":["l"]},"mE":{"p":["l"],"n":["l"],"af":[],"h":["l"]},"lW":{"p":["X"],"n":["X"],"af":[],"h":["X"]},"lX":{"p":["X"],"n":["X"],"af":[],"h":["X"]}}'))
A.uk(v.typeUniverse,JSON.parse('{"n":1,"da":1,"aw":1,"ei":1,"db":2,"ev":1,"f4":2,"dg":1}'))
var u={f:"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u03f6\x00\u0404\u03f4 \u03f4\u03f6\u01f6\u01f6\u03f6\u03fc\u01f4\u03ff\u03ff\u0584\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u05d4\u01f4\x00\u01f4\x00\u0504\u05c4\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0400\x00\u0400\u0200\u03f7\u0200\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0200\u0200\u0200\u03f7\x00",p:": URI should have a non-empty host name: ",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.ip
return{gS:s("@<~>"),n:s("aB"),az:s("cO"),fj:s("bS"),hp:s("cf"),f_:s("bT"),lo:s("dx"),fW:s("kP"),i9:s("dz<d8,@>"),p1:s("by<c,c>"),d5:s("Y"),l7:s("ci"),cs:s("ad"),jS:s("b_"),gt:s("n<@>"),h:s("D"),W:s("a0"),A:s("o"),l5:s("f"),dY:s("aM"),kL:s("ck"),pk:s("lW"),kI:s("lX"),h4:s("cm"),Z:s("cn"),la:s("bC"),ad:s("cT"),S:s("bX"),m6:s("lY"),bW:s("lZ"),jx:s("m_"),bg:s("pF"),cj:s("h<D>"),hl:s("h<v>"),e3:s("h<bG>"),R:s("h<@>"),fm:s("h<l>"),il:s("a5<D>"),gZ:s("a5<b0>"),hq:s("a5<t<c,c>>"),t:s("a5<t<c,@>>"),lN:s("a5<bj>"),hf:s("a5<H>"),dw:s("a5<bs<@>>"),s:s("a5<c>"),dG:s("a5<@>"),b:s("a5<l>"),T:s("dL"),m:s("k"),et:s("bD"),dX:s("N<@>"),gq:s("cq<@>"),bX:s("bh<d8,@>"),mz:s("cY"),mT:s("bE"),kT:s("b1"),p:s("p<t<c,@>>"),j:s("p<@>"),f4:s("p<l>"),oT:s("p<a_>"),d:s("cZ"),if:s("au<l,a_>"),dW:s("t<c,D>"),c:s("t<c,H>"),I:s("t<c,c>"),P:s("t<c,@>"),f:s("t<@,@>"),gQ:s("a1<c,c>"),oA:s("d0"),ib:s("aP"),V:s("aC"),hH:s("bF"),aj:s("b3"),hK:s("ap"),F:s("v"),hU:s("bj"),a:s("a8"),ai:s("b4"),K:s("H"),af:s("bG"),d8:s("aQ"),J:s("b9"),lZ:s("wE"),ku:s("bk<@>"),mx:s("bk<a_>"),nZ:s("d7"),g:s("c0"),i:s("ba<c>"),hn:s("pY"),ls:s("aS"),cA:s("aT"),hI:s("aU"),l:s("bm"),N:s("c"),gL:s("c(c)"),lv:s("aD"),bC:s("u"),bR:s("d8"),fD:s("d9"),dQ:s("aV"),gJ:s("aE"),D:s("fW"),ki:s("aW"),hk:s("b5"),aJ:s("Z"),do:s("bH"),jv:s("af"),hM:s("mD"),mC:s("mE"),nn:s("mF"),ev:s("mG"),cx:s("bJ"),eG:s("ea<bG>"),ph:s("c4<c,c>"),jJ:s("h3"),L:s("I<c>"),hE:s("c5"),kg:s("mM"),f5:s("bu"),cz:s("bL<bC>"),ou:s("bL<~>"),nD:s("dc"),aN:s("aF"),E:s("aX<o>"),kN:s("aX<bE>"),C:s("aX<aC>"),h6:s("cy<b9>"),U:s("bn<D>"),gp:s("bn<bG>"),ax:s("W<bC>"),_:s("W<@>"),hy:s("W<l>"),cU:s("W<~>"),dl:s("cA"),mp:s("cB<@,@>"),as:s("cB<H?,H?>"),y:s("F"),iW:s("F(H)"),Q:s("F(c)"),dx:s("X"),z:s("@"),mY:s("@()"),w:s("@(H)"),ng:s("@(H,bm)"),gA:s("@(ba<c>)"),ny:s("@(@,@)"),q:s("l"),o:s("bT?"),aa:s("pv?"),mV:s("D?"),iB:s("f?"),iC:s("cR?"),dD:s("cm?"),gK:s("ag<a8>?"),ef:s("aN?"),O:s("r?"),G:s("bX?"),mU:s("k?"),lH:s("p<@>?"),lG:s("t<c,c>?"),dZ:s("t<c,@>?"),eO:s("t<@,@>?"),X:s("H?"),Y:s("c0?"),x:s("c?"),r:s("cv?"),e:s("bo<@,@>?"),k:s("hC?"),fU:s("F?"),jX:s("X?"),B:s("@(o)?"),aV:s("l?"),jh:s("a_?"),jE:s("~()?"),oV:s("~(o)?"),b9:s("~(aC)?"),gn:s("~(b9)?"),mW:s("~(F)?"),u:s("a_"),H:s("~"),M:s("~()"),i6:s("~(H)"),fQ:s("~(H,bm)"),bm:s("~(c,c)"),v:s("~(c,@)"),my:s("~(fW)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.U=A.cN.prototype
B.D=A.cf.prototype
B.i=A.bT.prototype
B.n=A.ch.prototype
B.a8=A.ci.prototype
B.H=A.cQ.prototype
B.a9=A.dA.prototype
B.ae=A.ck.prototype
B.af=A.dG.prototype
B.v=A.cS.prototype
B.L=A.dH.prototype
B.z=A.dI.prototype
B.f=A.bX.prototype
B.ag=J.cU.prototype
B.b=J.a5.prototype
B.e=J.dK.prototype
B.d=J.cp.prototype
B.a=J.bY.prototype
B.ah=J.bD.prototype
B.ai=J.a.prototype
B.aq=A.dV.prototype
B.Q=A.dY.prototype
B.ar=A.d1.prototype
B.l=A.d2.prototype
B.S=J.fH.prototype
B.p=A.c0.prototype
B.w=A.e4.prototype
B.k=A.e6.prototype
B.T=A.e9.prototype
B.o=A.cv.prototype
B.B=J.bJ.prototype
B.q=A.c5.prototype
B.V=new A.at(401,!0,null)
B.W=new A.at(409,!1,null)
B.X=new A.at(502,!1,null)
B.r=new A.at(null,!1,null)
B.j=new A.at(null,!0,null)
B.Z=new A.f_(!1)
B.Y=new A.dw(B.Z)
B.a_=new A.f_(!0)
B.C=new A.dw(B.a_)
B.x=new A.kO()
B.E=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.a0=function() {
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
B.a5=function(getTagFallback) {
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
B.a1=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.a4=function(hooks) {
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
B.a3=function(hooks) {
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
B.a2=function(hooks) {
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
B.F=function(hooks) { return hooks; }

B.c=new A.fn()
B.a6=new A.fG()
B.t=new A.mt()
B.m=new A.h7()
B.a7=new A.mL()
B.G=new A.nl()
B.h=new A.hP()
B.u=new A.i_()
B.aa=new A.b_(0)
B.I=new A.b_(1e6)
B.J=new A.b_(1e7)
B.K=new A.b_(15e6)
B.ab=new A.b_(3e5)
B.ac=new A.b_(4e5)
B.ad=new A.b_(6e7)
B.y=new A.bg("",null,null)
B.aj=new A.m4(null)
B.ak=new A.m5(null)
B.al=s([],t.s)
B.M=s([],t.dG)
B.N=s(["bind","if","ref","repeat","syntax"],t.s)
B.A=s(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"],t.s)
B.am=s(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"],t.s)
B.an=s(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"],t.s)
B.as={households:0,centralAssets:1,maintenanceLogs:2,workers:3,billingRecords:4,announcements:5,paymentSettings:6,billingConfig:7,offlineCollections:8,unsyncedActions:9}
B.O=new A.by(B.as,["waterhall_households","waterhall_central_assets","waterhall_maintenance_logs","waterhall_workers","waterhall_billing_records","waterhall_announcements","waterhall_payment_settings","waterhall_billing_config","waterhall_offline_collections","waterhall_unsynced_actions"],t.p1)
B.at={"/api/billing-records/add":0,"/api/maintenance-logs/add":1,"/api/reports/add":2,"/api/announcements/add":3,"/api/households/update":4}
B.ao=new A.by(B.at,["Meter reading and bill","Maintenance report","Service report","Announcement","Household status"],t.p1)
B.R={}
B.ap=new A.by(B.R,[],t.p1)
B.P=new A.by(B.R,[],A.ip("by<d8,@>"))
B.au=new A.c2("call")
B.av=A.bp("dx")
B.aw=A.bp("kP")
B.ax=A.bp("lW")
B.ay=A.bp("lX")
B.az=A.bp("lY")
B.aA=A.bp("lZ")
B.aB=A.bp("m_")
B.aC=A.bp("H")
B.aD=A.bp("mD")
B.aE=A.bp("mE")
B.aF=A.bp("mF")
B.aG=A.bp("mG")
B.aH=new A.mK(!1)})();(function staticFields(){$.nf=null
$.b6=A.B([],t.hf)
$.pQ=null
$.pt=null
$.ps=null
$.r5=null
$.r1=null
$.ra=null
$.o0=null
$.o6=null
$.pb=null
$.dn=null
$.eM=null
$.eN=null
$.p4=!1
$.V=B.h
$.q4=""
$.q5=null
$.bV=null
$.ow=null
$.pC=null
$.pB=null
$.hv=A.ai(t.N,t.Z)
$.vX=A.a6(["main_tank_level",null,"turbidity",null,"tds_ppm",null,"turbidity_status","unknown","has_reading",!1,"turbidity_desc","Awaiting sensor readings","last_updated",null],t.N,t.z)
$.r4=function(){var s=t.N
return A.a6(["payment_location","Barangay Tagpopongan Hall - Treasury Office","payment_method","In-Person Payment at Barangay Hall","allow_worker_collection","false","payment_instructions","Water bills are due on or before the 25th of each month. Payments must be settled in-person at the Barangay Hall Treasury Window. Field workers are not authorized to collect payments.","operating_hours","Monday - Friday, 8:00 AM - 5:00 PM","emergency_contact","Not configured; contact the Barangay office"],s,s)}()})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"wi","iu",()=>A.pa("_$dart_dartClosure"))
s($,"wh","ri",()=>A.pa("_$dart_dartClosure_dartJSInterop"))
s($,"xd","ol",()=>B.h.e8(new A.od(),A.ip("ag<~>")))
s($,"x9","pl",()=>A.B([new J.fi()],A.ip("a5<d6>")))
s($,"wJ","rp",()=>A.bI(A.mC({
toString:function(){return"$receiver$"}})))
s($,"wK","rq",()=>A.bI(A.mC({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"wL","rr",()=>A.bI(A.mC(null)))
s($,"wM","rs",()=>A.bI(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"wP","rv",()=>A.bI(A.mC(void 0)))
s($,"wQ","rw",()=>A.bI(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"wO","ru",()=>A.bI(A.q2(null)))
s($,"wN","rt",()=>A.bI(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"wS","ry",()=>A.bI(A.q2(void 0)))
s($,"wR","rx",()=>A.bI(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"wV","ph",()=>A.tQ())
s($,"ws","oi",()=>$.ol())
s($,"x4","rF",()=>A.pN(4096))
s($,"x2","rD",()=>new A.nG().$0())
s($,"x3","rE",()=>new A.nF().$0())
s($,"wX","pi",()=>A.tx(A.uQ(A.B([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.b))))
s($,"wW","rz",()=>A.pN(0))
s($,"x0","rB",()=>A.e3("^[\\-\\.0-9A-Z_a-z~]*$"))
s($,"x1","rC",()=>typeof URLSearchParams=="function")
s($,"wj","rj",()=>A.e3("^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(?:[.,](\\d+))?)?)?( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$"))
s($,"x7","oj",()=>A.is(B.aC))
s($,"we","rh",()=>({}))
s($,"wZ","rA",()=>A.pM(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],t.N))
s($,"wa","rg",()=>A.e3("^\\S+$"))
s($,"wo","pg",()=>B.a.bF(A.ov(),"Opera",0))
s($,"wn","rm",()=>!$.pg()&&B.a.bF(A.ov(),"Trident/",0))
s($,"wm","rl",()=>B.a.bF(A.ov(),"Firefox",0))
s($,"wl","rk",()=>"-"+$.rn()+"-")
s($,"wp","rn",()=>{if($.rl())var q="moz"
else if($.rm())q="ms"
else q=$.pg()?"o":"webkit"
return q})
s($,"x5","bx",()=>A.uJ(A.p5(self)))
s($,"x8","ok",()=>{$.pl().push(new A.hR())
return!0})
s($,"wY","pj",()=>A.pa("_$dart_dartObject"))
s($,"x6","pk",()=>function DartObject(a){this.o=a})
s($,"wD","ro",()=>{var q=new A.ne(new DataView(new ArrayBuffer(A.uK(8))))
q.eR()
return q})
s($,"xa","J",()=>{var q,p=t.t,o=A.B([],p),n=t.N,m=t.z,l=A.B([],p),k=A.B([],p),j=A.B([],p)
p=A.B([],p)
q=A.oy(null,t.H)
return new A.kT(o,A.ai(n,m),l,k,j,p,A.ai(n,n),A.ai(n,m),A.ai(n,t.p),q,new A.ed(null,null,A.ip("ed<t<c,@>>")))})
r($,"vf","rG",()=>A.oy(null,t.H))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({WebGL:J.cU,AnimationEffectReadOnly:J.a,AnimationEffectTiming:J.a,AnimationEffectTimingReadOnly:J.a,AnimationTimeline:J.a,AnimationWorkletGlobalScope:J.a,AuthenticatorAssertionResponse:J.a,AuthenticatorAttestationResponse:J.a,AuthenticatorResponse:J.a,BackgroundFetchFetch:J.a,BackgroundFetchManager:J.a,BackgroundFetchSettledFetch:J.a,BarProp:J.a,BarcodeDetector:J.a,BluetoothRemoteGATTDescriptor:J.a,Body:J.a,BudgetState:J.a,CacheStorage:J.a,CanvasGradient:J.a,CanvasPattern:J.a,CanvasRenderingContext2D:J.a,Client:J.a,Clients:J.a,CookieStore:J.a,Coordinates:J.a,Credential:J.a,CredentialUserData:J.a,CredentialsContainer:J.a,Crypto:J.a,CryptoKey:J.a,CSS:J.a,CSSVariableReferenceValue:J.a,CustomElementRegistry:J.a,DataTransfer:J.a,DataTransferItem:J.a,DeprecatedStorageInfo:J.a,DeprecatedStorageQuota:J.a,DeprecationReport:J.a,DetectedBarcode:J.a,DetectedFace:J.a,DetectedText:J.a,DeviceAcceleration:J.a,DeviceRotationRate:J.a,DirectoryEntry:J.a,webkitFileSystemDirectoryEntry:J.a,FileSystemDirectoryEntry:J.a,DirectoryReader:J.a,WebKitDirectoryReader:J.a,webkitFileSystemDirectoryReader:J.a,FileSystemDirectoryReader:J.a,DocumentOrShadowRoot:J.a,DocumentTimeline:J.a,DOMError:J.a,Iterator:J.a,DOMMatrix:J.a,DOMMatrixReadOnly:J.a,DOMParser:J.a,DOMPoint:J.a,DOMPointReadOnly:J.a,DOMQuad:J.a,DOMStringMap:J.a,Entry:J.a,webkitFileSystemEntry:J.a,FileSystemEntry:J.a,External:J.a,FaceDetector:J.a,FederatedCredential:J.a,FileEntry:J.a,webkitFileSystemFileEntry:J.a,FileSystemFileEntry:J.a,DOMFileSystem:J.a,WebKitFileSystem:J.a,webkitFileSystem:J.a,FileSystem:J.a,FontFace:J.a,FontFaceSource:J.a,FormData:J.a,GamepadButton:J.a,GamepadPose:J.a,Geolocation:J.a,Position:J.a,GeolocationPosition:J.a,Headers:J.a,HTMLHyperlinkElementUtils:J.a,IdleDeadline:J.a,ImageBitmap:J.a,ImageBitmapRenderingContext:J.a,ImageCapture:J.a,InputDeviceCapabilities:J.a,IntersectionObserver:J.a,IntersectionObserverEntry:J.a,InterventionReport:J.a,KeyframeEffect:J.a,KeyframeEffectReadOnly:J.a,MediaCapabilities:J.a,MediaCapabilitiesInfo:J.a,MediaDeviceInfo:J.a,MediaError:J.a,MediaKeyStatusMap:J.a,MediaKeySystemAccess:J.a,MediaKeys:J.a,MediaKeysPolicy:J.a,MediaMetadata:J.a,MediaSession:J.a,MediaSettingsRange:J.a,MemoryInfo:J.a,MessageChannel:J.a,Metadata:J.a,MutationObserver:J.a,WebKitMutationObserver:J.a,MutationRecord:J.a,NavigationPreloadManager:J.a,Navigator:J.a,NavigatorAutomationInformation:J.a,NavigatorConcurrentHardware:J.a,NavigatorCookies:J.a,NavigatorUserMediaError:J.a,NodeFilter:J.a,NodeIterator:J.a,NonDocumentTypeChildNode:J.a,NonElementParentNode:J.a,NoncedElement:J.a,OffscreenCanvasRenderingContext2D:J.a,OverconstrainedError:J.a,PaintRenderingContext2D:J.a,PaintSize:J.a,PaintWorkletGlobalScope:J.a,PasswordCredential:J.a,Path2D:J.a,PaymentAddress:J.a,PaymentInstruments:J.a,PaymentManager:J.a,PaymentResponse:J.a,PerformanceEntry:J.a,PerformanceLongTaskTiming:J.a,PerformanceMark:J.a,PerformanceMeasure:J.a,PerformanceNavigation:J.a,PerformanceNavigationTiming:J.a,PerformanceObserver:J.a,PerformanceObserverEntryList:J.a,PerformancePaintTiming:J.a,PerformanceResourceTiming:J.a,PerformanceServerTiming:J.a,PerformanceTiming:J.a,Permissions:J.a,PhotoCapabilities:J.a,PositionError:J.a,GeolocationPositionError:J.a,Presentation:J.a,PresentationReceiver:J.a,PublicKeyCredential:J.a,PushManager:J.a,PushMessageData:J.a,PushSubscription:J.a,PushSubscriptionOptions:J.a,Range:J.a,RelatedApplication:J.a,ReportBody:J.a,ReportingObserver:J.a,ResizeObserver:J.a,ResizeObserverEntry:J.a,RTCCertificate:J.a,RTCIceCandidate:J.a,mozRTCIceCandidate:J.a,RTCLegacyStatsReport:J.a,RTCRtpContributingSource:J.a,RTCRtpReceiver:J.a,RTCRtpSender:J.a,RTCSessionDescription:J.a,mozRTCSessionDescription:J.a,RTCStatsResponse:J.a,Screen:J.a,ScrollState:J.a,ScrollTimeline:J.a,Selection:J.a,SpeechRecognitionAlternative:J.a,SpeechSynthesisVoice:J.a,StaticRange:J.a,StorageManager:J.a,StyleMedia:J.a,StylePropertyMap:J.a,StylePropertyMapReadonly:J.a,SyncManager:J.a,TaskAttributionTiming:J.a,TextDetector:J.a,TextMetrics:J.a,TrackDefault:J.a,TreeWalker:J.a,TrustedHTML:J.a,TrustedScriptURL:J.a,TrustedURL:J.a,UnderlyingSourceBase:J.a,URLSearchParams:J.a,VRCoordinateSystem:J.a,VRDisplayCapabilities:J.a,VREyeParameters:J.a,VRFrameData:J.a,VRFrameOfReference:J.a,VRPose:J.a,VRStageBounds:J.a,VRStageBoundsPoint:J.a,VRStageParameters:J.a,ValidityState:J.a,VideoPlaybackQuality:J.a,VideoTrack:J.a,VTTRegion:J.a,WindowClient:J.a,WorkletAnimation:J.a,WorkletGlobalScope:J.a,XPathEvaluator:J.a,XPathExpression:J.a,XPathNSResolver:J.a,XPathResult:J.a,XMLSerializer:J.a,XSLTProcessor:J.a,Bluetooth:J.a,BluetoothCharacteristicProperties:J.a,BluetoothRemoteGATTServer:J.a,BluetoothRemoteGATTService:J.a,BluetoothUUID:J.a,BudgetService:J.a,Cache:J.a,DOMFileSystemSync:J.a,DirectoryEntrySync:J.a,DirectoryReaderSync:J.a,EntrySync:J.a,FileEntrySync:J.a,FileReaderSync:J.a,FileWriterSync:J.a,HTMLAllCollection:J.a,Mojo:J.a,MojoHandle:J.a,MojoWatcher:J.a,NFC:J.a,PagePopupController:J.a,Report:J.a,Request:J.a,Response:J.a,SubtleCrypto:J.a,USBAlternateInterface:J.a,USBConfiguration:J.a,USBDevice:J.a,USBEndpoint:J.a,USBInTransferResult:J.a,USBInterface:J.a,USBIsochronousInTransferPacket:J.a,USBIsochronousInTransferResult:J.a,USBIsochronousOutTransferPacket:J.a,USBIsochronousOutTransferResult:J.a,USBOutTransferResult:J.a,WorkerLocation:J.a,WorkerNavigator:J.a,Worklet:J.a,IDBCursor:J.a,IDBCursorWithValue:J.a,IDBFactory:J.a,IDBIndex:J.a,IDBObjectStore:J.a,IDBObservation:J.a,IDBObserver:J.a,IDBObserverChanges:J.a,SVGAngle:J.a,SVGAnimatedAngle:J.a,SVGAnimatedBoolean:J.a,SVGAnimatedEnumeration:J.a,SVGAnimatedInteger:J.a,SVGAnimatedLength:J.a,SVGAnimatedLengthList:J.a,SVGAnimatedNumber:J.a,SVGAnimatedNumberList:J.a,SVGAnimatedPreserveAspectRatio:J.a,SVGAnimatedRect:J.a,SVGAnimatedString:J.a,SVGAnimatedTransformList:J.a,SVGMatrix:J.a,SVGPoint:J.a,SVGPreserveAspectRatio:J.a,SVGRect:J.a,SVGUnitTypes:J.a,AudioListener:J.a,AudioParam:J.a,AudioTrack:J.a,AudioWorkletGlobalScope:J.a,AudioWorkletProcessor:J.a,PeriodicWave:J.a,WebGLActiveInfo:J.a,ANGLEInstancedArrays:J.a,ANGLE_instanced_arrays:J.a,WebGLBuffer:J.a,WebGLCanvas:J.a,WebGLColorBufferFloat:J.a,WebGLCompressedTextureASTC:J.a,WebGLCompressedTextureATC:J.a,WEBGL_compressed_texture_atc:J.a,WebGLCompressedTextureETC1:J.a,WEBGL_compressed_texture_etc1:J.a,WebGLCompressedTextureETC:J.a,WebGLCompressedTexturePVRTC:J.a,WEBGL_compressed_texture_pvrtc:J.a,WebGLCompressedTextureS3TC:J.a,WEBGL_compressed_texture_s3tc:J.a,WebGLCompressedTextureS3TCsRGB:J.a,WebGLDebugRendererInfo:J.a,WEBGL_debug_renderer_info:J.a,WebGLDebugShaders:J.a,WEBGL_debug_shaders:J.a,WebGLDepthTexture:J.a,WEBGL_depth_texture:J.a,WebGLDrawBuffers:J.a,WEBGL_draw_buffers:J.a,EXTsRGB:J.a,EXT_sRGB:J.a,EXTBlendMinMax:J.a,EXT_blend_minmax:J.a,EXTColorBufferFloat:J.a,EXTColorBufferHalfFloat:J.a,EXTDisjointTimerQuery:J.a,EXTDisjointTimerQueryWebGL2:J.a,EXTFragDepth:J.a,EXT_frag_depth:J.a,EXTShaderTextureLOD:J.a,EXT_shader_texture_lod:J.a,EXTTextureFilterAnisotropic:J.a,EXT_texture_filter_anisotropic:J.a,WebGLFramebuffer:J.a,WebGLGetBufferSubDataAsync:J.a,WebGLLoseContext:J.a,WebGLExtensionLoseContext:J.a,WEBGL_lose_context:J.a,OESElementIndexUint:J.a,OES_element_index_uint:J.a,OESStandardDerivatives:J.a,OES_standard_derivatives:J.a,OESTextureFloat:J.a,OES_texture_float:J.a,OESTextureFloatLinear:J.a,OES_texture_float_linear:J.a,OESTextureHalfFloat:J.a,OES_texture_half_float:J.a,OESTextureHalfFloatLinear:J.a,OES_texture_half_float_linear:J.a,OESVertexArrayObject:J.a,OES_vertex_array_object:J.a,WebGLProgram:J.a,WebGLQuery:J.a,WebGLRenderbuffer:J.a,WebGLRenderingContext:J.a,WebGL2RenderingContext:J.a,WebGLSampler:J.a,WebGLShader:J.a,WebGLShaderPrecisionFormat:J.a,WebGLSync:J.a,WebGLTexture:J.a,WebGLTimerQueryEXT:J.a,WebGLTransformFeedback:J.a,WebGLUniformLocation:J.a,WebGLVertexArrayObject:J.a,WebGLVertexArrayObjectOES:J.a,WebGL2RenderingContextBase:J.a,ArrayBuffer:A.bF,SharedArrayBuffer:A.fA,ArrayBufferView:A.ap,DataView:A.dV,Float32Array:A.fv,Float64Array:A.fw,Int16Array:A.fx,Int32Array:A.fy,Int8Array:A.fz,Uint16Array:A.fB,Uint32Array:A.fC,Uint8ClampedArray:A.dX,CanvasPixelArray:A.dX,Uint8Array:A.dY,HTMLAudioElement:A.r,HTMLBRElement:A.r,HTMLCanvasElement:A.r,HTMLContentElement:A.r,HTMLDListElement:A.r,HTMLDataElement:A.r,HTMLDataListElement:A.r,HTMLDetailsElement:A.r,HTMLDialogElement:A.r,HTMLEmbedElement:A.r,HTMLFieldSetElement:A.r,HTMLHRElement:A.r,HTMLHeadElement:A.r,HTMLHtmlElement:A.r,HTMLIFrameElement:A.r,HTMLLIElement:A.r,HTMLLabelElement:A.r,HTMLLegendElement:A.r,HTMLLinkElement:A.r,HTMLMapElement:A.r,HTMLMediaElement:A.r,HTMLMenuElement:A.r,HTMLMetaElement:A.r,HTMLMeterElement:A.r,HTMLModElement:A.r,HTMLOListElement:A.r,HTMLObjectElement:A.r,HTMLOptGroupElement:A.r,HTMLOutputElement:A.r,HTMLParamElement:A.r,HTMLPictureElement:A.r,HTMLPreElement:A.r,HTMLProgressElement:A.r,HTMLQuoteElement:A.r,HTMLScriptElement:A.r,HTMLShadowElement:A.r,HTMLSlotElement:A.r,HTMLSourceElement:A.r,HTMLStyleElement:A.r,HTMLTableCaptionElement:A.r,HTMLTableCellElement:A.r,HTMLTableDataCellElement:A.r,HTMLTableHeaderCellElement:A.r,HTMLTableColElement:A.r,HTMLTimeElement:A.r,HTMLTitleElement:A.r,HTMLTrackElement:A.r,HTMLUListElement:A.r,HTMLUnknownElement:A.r,HTMLVideoElement:A.r,HTMLDirectoryElement:A.r,HTMLFontElement:A.r,HTMLFrameElement:A.r,HTMLFrameSetElement:A.r,HTMLMarqueeElement:A.r,HTMLElement:A.r,AccessibleNodeList:A.eS,HTMLAnchorElement:A.cN,HTMLAreaElement:A.eT,HTMLBaseElement:A.cO,Blob:A.bS,HTMLBodyElement:A.cf,HTMLButtonElement:A.bT,CDATASection:A.bq,CharacterData:A.bq,Comment:A.bq,ProcessingInstruction:A.bq,Text:A.bq,CSSPerspective:A.f6,CSSCharsetRule:A.Y,CSSConditionRule:A.Y,CSSFontFaceRule:A.Y,CSSGroupingRule:A.Y,CSSImportRule:A.Y,CSSKeyframeRule:A.Y,MozCSSKeyframeRule:A.Y,WebKitCSSKeyframeRule:A.Y,CSSKeyframesRule:A.Y,MozCSSKeyframesRule:A.Y,WebKitCSSKeyframesRule:A.Y,CSSMediaRule:A.Y,CSSNamespaceRule:A.Y,CSSPageRule:A.Y,CSSRule:A.Y,CSSStyleRule:A.Y,CSSSupportsRule:A.Y,CSSViewportRule:A.Y,CSSStyleDeclaration:A.ch,MSStyleCSSProperties:A.ch,CSS2Properties:A.ch,CSSImageValue:A.aI,CSSKeywordValue:A.aI,CSSNumericValue:A.aI,CSSPositionValue:A.aI,CSSResourceValue:A.aI,CSSUnitValue:A.aI,CSSURLImageValue:A.aI,CSSStyleValue:A.aI,CSSMatrixComponent:A.bf,CSSRotation:A.bf,CSSScale:A.bf,CSSSkew:A.bf,CSSTranslation:A.bf,CSSTransformComponent:A.bf,CSSTransformValue:A.f7,CSSUnparsedValue:A.f8,CustomEvent:A.ci,DataTransferItemList:A.f9,HTMLDivElement:A.cQ,XMLDocument:A.cj,Document:A.cj,DOMException:A.fa,DOMImplementation:A.dA,ClientRectList:A.dB,DOMRectList:A.dB,DOMRectReadOnly:A.dC,DOMStringList:A.fb,DOMTokenList:A.fc,MathMLElement:A.D,Element:A.D,AbortPaymentEvent:A.o,AnimationEvent:A.o,AnimationPlaybackEvent:A.o,ApplicationCacheErrorEvent:A.o,BackgroundFetchClickEvent:A.o,BackgroundFetchEvent:A.o,BackgroundFetchFailEvent:A.o,BackgroundFetchedEvent:A.o,BeforeInstallPromptEvent:A.o,BeforeUnloadEvent:A.o,BlobEvent:A.o,CanMakePaymentEvent:A.o,ClipboardEvent:A.o,CloseEvent:A.o,DeviceMotionEvent:A.o,DeviceOrientationEvent:A.o,ErrorEvent:A.o,ExtendableEvent:A.o,ExtendableMessageEvent:A.o,FetchEvent:A.o,FontFaceSetLoadEvent:A.o,ForeignFetchEvent:A.o,GamepadEvent:A.o,HashChangeEvent:A.o,InstallEvent:A.o,MediaEncryptedEvent:A.o,MediaKeyMessageEvent:A.o,MediaQueryListEvent:A.o,MediaStreamEvent:A.o,MediaStreamTrackEvent:A.o,MessageEvent:A.o,MIDIConnectionEvent:A.o,MIDIMessageEvent:A.o,MutationEvent:A.o,NotificationEvent:A.o,PageTransitionEvent:A.o,PaymentRequestEvent:A.o,PaymentRequestUpdateEvent:A.o,PopStateEvent:A.o,PresentationConnectionAvailableEvent:A.o,PresentationConnectionCloseEvent:A.o,PromiseRejectionEvent:A.o,PushEvent:A.o,RTCDataChannelEvent:A.o,RTCDTMFToneChangeEvent:A.o,RTCPeerConnectionIceEvent:A.o,RTCTrackEvent:A.o,SecurityPolicyViolationEvent:A.o,SensorErrorEvent:A.o,SpeechRecognitionError:A.o,SpeechRecognitionEvent:A.o,SpeechSynthesisEvent:A.o,StorageEvent:A.o,SyncEvent:A.o,TrackEvent:A.o,TransitionEvent:A.o,WebKitTransitionEvent:A.o,VRDeviceEvent:A.o,VRDisplayEvent:A.o,VRSessionEvent:A.o,MojoInterfaceRequestEvent:A.o,USBConnectionEvent:A.o,AudioProcessingEvent:A.o,OfflineAudioCompletionEvent:A.o,WebGLContextEvent:A.o,Event:A.o,InputEvent:A.o,SubmitEvent:A.o,EventSource:A.dE,AbsoluteOrientationSensor:A.f,Accelerometer:A.f,AccessibleNode:A.f,AmbientLightSensor:A.f,Animation:A.f,ApplicationCache:A.f,DOMApplicationCache:A.f,OfflineResourceList:A.f,BackgroundFetchRegistration:A.f,BatteryManager:A.f,BroadcastChannel:A.f,CanvasCaptureMediaStreamTrack:A.f,FontFaceSet:A.f,Gyroscope:A.f,LinearAccelerationSensor:A.f,Magnetometer:A.f,MediaDevices:A.f,MediaKeySession:A.f,MediaQueryList:A.f,MediaRecorder:A.f,MediaSource:A.f,MediaStream:A.f,MediaStreamTrack:A.f,MIDIAccess:A.f,MIDIInput:A.f,MIDIOutput:A.f,MIDIPort:A.f,NetworkInformation:A.f,Notification:A.f,OffscreenCanvas:A.f,OrientationSensor:A.f,PaymentRequest:A.f,Performance:A.f,PermissionStatus:A.f,PresentationAvailability:A.f,PresentationConnection:A.f,PresentationConnectionList:A.f,PresentationRequest:A.f,RelativeOrientationSensor:A.f,RemotePlayback:A.f,RTCDataChannel:A.f,DataChannel:A.f,RTCDTMFSender:A.f,RTCPeerConnection:A.f,webkitRTCPeerConnection:A.f,mozRTCPeerConnection:A.f,ScreenOrientation:A.f,Sensor:A.f,ServiceWorker:A.f,ServiceWorkerContainer:A.f,ServiceWorkerRegistration:A.f,SharedWorker:A.f,SpeechRecognition:A.f,webkitSpeechRecognition:A.f,SpeechSynthesis:A.f,SpeechSynthesisUtterance:A.f,VR:A.f,VRDevice:A.f,VRDisplay:A.f,VRSession:A.f,VisualViewport:A.f,WebSocket:A.f,Worker:A.f,WorkerPerformance:A.f,BluetoothDevice:A.f,BluetoothRemoteGATTCharacteristic:A.f,Clipboard:A.f,MojoInterfaceInterceptor:A.f,USB:A.f,IDBDatabase:A.f,IDBOpenDBRequest:A.f,IDBVersionChangeRequest:A.f,IDBRequest:A.f,IDBTransaction:A.f,AnalyserNode:A.f,RealtimeAnalyserNode:A.f,AudioBufferSourceNode:A.f,AudioDestinationNode:A.f,AudioNode:A.f,AudioScheduledSourceNode:A.f,AudioWorkletNode:A.f,BiquadFilterNode:A.f,ChannelMergerNode:A.f,AudioChannelMerger:A.f,ChannelSplitterNode:A.f,AudioChannelSplitter:A.f,ConstantSourceNode:A.f,ConvolverNode:A.f,DelayNode:A.f,DynamicsCompressorNode:A.f,GainNode:A.f,AudioGainNode:A.f,IIRFilterNode:A.f,MediaElementAudioSourceNode:A.f,MediaStreamAudioDestinationNode:A.f,MediaStreamAudioSourceNode:A.f,OscillatorNode:A.f,Oscillator:A.f,PannerNode:A.f,AudioPannerNode:A.f,webkitAudioPannerNode:A.f,ScriptProcessorNode:A.f,JavaScriptAudioNode:A.f,StereoPannerNode:A.f,WaveShaperNode:A.f,EventTarget:A.f,File:A.aM,FileList:A.ck,FileReader:A.dG,FileWriter:A.fe,HTMLFormElement:A.cm,Gamepad:A.aN,HTMLHeadingElement:A.cS,History:A.fg,HTMLCollection:A.bW,HTMLFormControlsCollection:A.bW,HTMLOptionsCollection:A.bW,HTMLDocument:A.dH,XMLHttpRequest:A.bC,XMLHttpRequestUpload:A.co,XMLHttpRequestEventTarget:A.co,ImageData:A.cT,HTMLImageElement:A.dI,HTMLInputElement:A.bX,KeyboardEvent:A.bE,Location:A.cZ,MediaList:A.fr,MessagePort:A.d0,MIDIInputMap:A.fs,MIDIOutputMap:A.ft,MimeType:A.aP,MimeTypeArray:A.fu,MouseEvent:A.aC,DragEvent:A.aC,PointerEvent:A.aC,WheelEvent:A.aC,DocumentFragment:A.v,ShadowRoot:A.v,DocumentType:A.v,Node:A.v,NodeList:A.d1,RadioNodeList:A.d1,HTMLOptionElement:A.bG,HTMLParagraphElement:A.d2,Plugin:A.aQ,PluginArray:A.fI,ProgressEvent:A.b9,ResourceProgressEvent:A.b9,RTCStatsReport:A.fK,HTMLSelectElement:A.c0,SourceBuffer:A.aS,SourceBufferList:A.fM,HTMLSpanElement:A.e4,SpeechGrammar:A.aT,SpeechGrammarList:A.fN,SpeechRecognitionResult:A.aU,Storage:A.e6,CSSStyleSheet:A.aD,StyleSheet:A.aD,HTMLTableElement:A.e9,HTMLTableRowElement:A.fQ,HTMLTableSectionElement:A.fR,HTMLTemplateElement:A.d9,HTMLTextAreaElement:A.cv,TextTrack:A.aV,TextTrackCue:A.aE,VTTCue:A.aE,TextTrackCueList:A.fT,TextTrackList:A.fU,TimeRanges:A.fV,Touch:A.aW,TouchList:A.fY,TrackDefaultList:A.fZ,CompositionEvent:A.bt,FocusEvent:A.bt,TextEvent:A.bt,TouchEvent:A.bt,UIEvent:A.bt,URL:A.h6,VideoTrackList:A.h9,Window:A.c5,DOMWindow:A.c5,DedicatedWorkerGlobalScope:A.bu,ServiceWorkerGlobalScope:A.bu,SharedWorkerGlobalScope:A.bu,WorkerGlobalScope:A.bu,Attr:A.dc,CSSRuleList:A.hg,ClientRect:A.ej,DOMRect:A.ej,GamepadList:A.hu,NamedNodeMap:A.eq,MozNamedAttrMap:A.eq,SpeechRecognitionResultList:A.hV,StyleSheetList:A.i0,IDBKeyRange:A.cY,IDBVersionChangeEvent:A.h8,SVGLength:A.b1,SVGLengthList:A.fp,SVGNumber:A.b4,SVGNumberList:A.fE,SVGPointList:A.fJ,SVGScriptElement:A.d7,SVGStringList:A.fP,SVGAElement:A.u,SVGAnimateElement:A.u,SVGAnimateMotionElement:A.u,SVGAnimateTransformElement:A.u,SVGAnimationElement:A.u,SVGCircleElement:A.u,SVGClipPathElement:A.u,SVGDefsElement:A.u,SVGDescElement:A.u,SVGDiscardElement:A.u,SVGEllipseElement:A.u,SVGFEBlendElement:A.u,SVGFEColorMatrixElement:A.u,SVGFEComponentTransferElement:A.u,SVGFECompositeElement:A.u,SVGFEConvolveMatrixElement:A.u,SVGFEDiffuseLightingElement:A.u,SVGFEDisplacementMapElement:A.u,SVGFEDistantLightElement:A.u,SVGFEFloodElement:A.u,SVGFEFuncAElement:A.u,SVGFEFuncBElement:A.u,SVGFEFuncGElement:A.u,SVGFEFuncRElement:A.u,SVGFEGaussianBlurElement:A.u,SVGFEImageElement:A.u,SVGFEMergeElement:A.u,SVGFEMergeNodeElement:A.u,SVGFEMorphologyElement:A.u,SVGFEOffsetElement:A.u,SVGFEPointLightElement:A.u,SVGFESpecularLightingElement:A.u,SVGFESpotLightElement:A.u,SVGFETileElement:A.u,SVGFETurbulenceElement:A.u,SVGFilterElement:A.u,SVGForeignObjectElement:A.u,SVGGElement:A.u,SVGGeometryElement:A.u,SVGGraphicsElement:A.u,SVGImageElement:A.u,SVGLineElement:A.u,SVGLinearGradientElement:A.u,SVGMarkerElement:A.u,SVGMaskElement:A.u,SVGMetadataElement:A.u,SVGPathElement:A.u,SVGPatternElement:A.u,SVGPolygonElement:A.u,SVGPolylineElement:A.u,SVGRadialGradientElement:A.u,SVGRectElement:A.u,SVGSetElement:A.u,SVGStopElement:A.u,SVGStyleElement:A.u,SVGSVGElement:A.u,SVGSwitchElement:A.u,SVGSymbolElement:A.u,SVGTSpanElement:A.u,SVGTextContentElement:A.u,SVGTextElement:A.u,SVGTextPathElement:A.u,SVGTextPositioningElement:A.u,SVGTitleElement:A.u,SVGUseElement:A.u,SVGViewElement:A.u,SVGGradientElement:A.u,SVGComponentTransferFunctionElement:A.u,SVGFEDropShadowElement:A.u,SVGMPathElement:A.u,SVGElement:A.u,SVGTransform:A.b5,SVGTransformList:A.h_,AudioBuffer:A.eX,AudioParamMap:A.eY,AudioTrackList:A.eZ,AudioContext:A.bR,webkitAudioContext:A.bR,BaseAudioContext:A.bR,OfflineAudioContext:A.fF})
hunkHelpers.setOrUpdateLeafTags({WebGL:true,AnimationEffectReadOnly:true,AnimationEffectTiming:true,AnimationEffectTimingReadOnly:true,AnimationTimeline:true,AnimationWorkletGlobalScope:true,AuthenticatorAssertionResponse:true,AuthenticatorAttestationResponse:true,AuthenticatorResponse:true,BackgroundFetchFetch:true,BackgroundFetchManager:true,BackgroundFetchSettledFetch:true,BarProp:true,BarcodeDetector:true,BluetoothRemoteGATTDescriptor:true,Body:true,BudgetState:true,CacheStorage:true,CanvasGradient:true,CanvasPattern:true,CanvasRenderingContext2D:true,Client:true,Clients:true,CookieStore:true,Coordinates:true,Credential:true,CredentialUserData:true,CredentialsContainer:true,Crypto:true,CryptoKey:true,CSS:true,CSSVariableReferenceValue:true,CustomElementRegistry:true,DataTransfer:true,DataTransferItem:true,DeprecatedStorageInfo:true,DeprecatedStorageQuota:true,DeprecationReport:true,DetectedBarcode:true,DetectedFace:true,DetectedText:true,DeviceAcceleration:true,DeviceRotationRate:true,DirectoryEntry:true,webkitFileSystemDirectoryEntry:true,FileSystemDirectoryEntry:true,DirectoryReader:true,WebKitDirectoryReader:true,webkitFileSystemDirectoryReader:true,FileSystemDirectoryReader:true,DocumentOrShadowRoot:true,DocumentTimeline:true,DOMError:true,Iterator:true,DOMMatrix:true,DOMMatrixReadOnly:true,DOMParser:true,DOMPoint:true,DOMPointReadOnly:true,DOMQuad:true,DOMStringMap:true,Entry:true,webkitFileSystemEntry:true,FileSystemEntry:true,External:true,FaceDetector:true,FederatedCredential:true,FileEntry:true,webkitFileSystemFileEntry:true,FileSystemFileEntry:true,DOMFileSystem:true,WebKitFileSystem:true,webkitFileSystem:true,FileSystem:true,FontFace:true,FontFaceSource:true,FormData:true,GamepadButton:true,GamepadPose:true,Geolocation:true,Position:true,GeolocationPosition:true,Headers:true,HTMLHyperlinkElementUtils:true,IdleDeadline:true,ImageBitmap:true,ImageBitmapRenderingContext:true,ImageCapture:true,InputDeviceCapabilities:true,IntersectionObserver:true,IntersectionObserverEntry:true,InterventionReport:true,KeyframeEffect:true,KeyframeEffectReadOnly:true,MediaCapabilities:true,MediaCapabilitiesInfo:true,MediaDeviceInfo:true,MediaError:true,MediaKeyStatusMap:true,MediaKeySystemAccess:true,MediaKeys:true,MediaKeysPolicy:true,MediaMetadata:true,MediaSession:true,MediaSettingsRange:true,MemoryInfo:true,MessageChannel:true,Metadata:true,MutationObserver:true,WebKitMutationObserver:true,MutationRecord:true,NavigationPreloadManager:true,Navigator:true,NavigatorAutomationInformation:true,NavigatorConcurrentHardware:true,NavigatorCookies:true,NavigatorUserMediaError:true,NodeFilter:true,NodeIterator:true,NonDocumentTypeChildNode:true,NonElementParentNode:true,NoncedElement:true,OffscreenCanvasRenderingContext2D:true,OverconstrainedError:true,PaintRenderingContext2D:true,PaintSize:true,PaintWorkletGlobalScope:true,PasswordCredential:true,Path2D:true,PaymentAddress:true,PaymentInstruments:true,PaymentManager:true,PaymentResponse:true,PerformanceEntry:true,PerformanceLongTaskTiming:true,PerformanceMark:true,PerformanceMeasure:true,PerformanceNavigation:true,PerformanceNavigationTiming:true,PerformanceObserver:true,PerformanceObserverEntryList:true,PerformancePaintTiming:true,PerformanceResourceTiming:true,PerformanceServerTiming:true,PerformanceTiming:true,Permissions:true,PhotoCapabilities:true,PositionError:true,GeolocationPositionError:true,Presentation:true,PresentationReceiver:true,PublicKeyCredential:true,PushManager:true,PushMessageData:true,PushSubscription:true,PushSubscriptionOptions:true,Range:true,RelatedApplication:true,ReportBody:true,ReportingObserver:true,ResizeObserver:true,ResizeObserverEntry:true,RTCCertificate:true,RTCIceCandidate:true,mozRTCIceCandidate:true,RTCLegacyStatsReport:true,RTCRtpContributingSource:true,RTCRtpReceiver:true,RTCRtpSender:true,RTCSessionDescription:true,mozRTCSessionDescription:true,RTCStatsResponse:true,Screen:true,ScrollState:true,ScrollTimeline:true,Selection:true,SpeechRecognitionAlternative:true,SpeechSynthesisVoice:true,StaticRange:true,StorageManager:true,StyleMedia:true,StylePropertyMap:true,StylePropertyMapReadonly:true,SyncManager:true,TaskAttributionTiming:true,TextDetector:true,TextMetrics:true,TrackDefault:true,TreeWalker:true,TrustedHTML:true,TrustedScriptURL:true,TrustedURL:true,UnderlyingSourceBase:true,URLSearchParams:true,VRCoordinateSystem:true,VRDisplayCapabilities:true,VREyeParameters:true,VRFrameData:true,VRFrameOfReference:true,VRPose:true,VRStageBounds:true,VRStageBoundsPoint:true,VRStageParameters:true,ValidityState:true,VideoPlaybackQuality:true,VideoTrack:true,VTTRegion:true,WindowClient:true,WorkletAnimation:true,WorkletGlobalScope:true,XPathEvaluator:true,XPathExpression:true,XPathNSResolver:true,XPathResult:true,XMLSerializer:true,XSLTProcessor:true,Bluetooth:true,BluetoothCharacteristicProperties:true,BluetoothRemoteGATTServer:true,BluetoothRemoteGATTService:true,BluetoothUUID:true,BudgetService:true,Cache:true,DOMFileSystemSync:true,DirectoryEntrySync:true,DirectoryReaderSync:true,EntrySync:true,FileEntrySync:true,FileReaderSync:true,FileWriterSync:true,HTMLAllCollection:true,Mojo:true,MojoHandle:true,MojoWatcher:true,NFC:true,PagePopupController:true,Report:true,Request:true,Response:true,SubtleCrypto:true,USBAlternateInterface:true,USBConfiguration:true,USBDevice:true,USBEndpoint:true,USBInTransferResult:true,USBInterface:true,USBIsochronousInTransferPacket:true,USBIsochronousInTransferResult:true,USBIsochronousOutTransferPacket:true,USBIsochronousOutTransferResult:true,USBOutTransferResult:true,WorkerLocation:true,WorkerNavigator:true,Worklet:true,IDBCursor:true,IDBCursorWithValue:true,IDBFactory:true,IDBIndex:true,IDBObjectStore:true,IDBObservation:true,IDBObserver:true,IDBObserverChanges:true,SVGAngle:true,SVGAnimatedAngle:true,SVGAnimatedBoolean:true,SVGAnimatedEnumeration:true,SVGAnimatedInteger:true,SVGAnimatedLength:true,SVGAnimatedLengthList:true,SVGAnimatedNumber:true,SVGAnimatedNumberList:true,SVGAnimatedPreserveAspectRatio:true,SVGAnimatedRect:true,SVGAnimatedString:true,SVGAnimatedTransformList:true,SVGMatrix:true,SVGPoint:true,SVGPreserveAspectRatio:true,SVGRect:true,SVGUnitTypes:true,AudioListener:true,AudioParam:true,AudioTrack:true,AudioWorkletGlobalScope:true,AudioWorkletProcessor:true,PeriodicWave:true,WebGLActiveInfo:true,ANGLEInstancedArrays:true,ANGLE_instanced_arrays:true,WebGLBuffer:true,WebGLCanvas:true,WebGLColorBufferFloat:true,WebGLCompressedTextureASTC:true,WebGLCompressedTextureATC:true,WEBGL_compressed_texture_atc:true,WebGLCompressedTextureETC1:true,WEBGL_compressed_texture_etc1:true,WebGLCompressedTextureETC:true,WebGLCompressedTexturePVRTC:true,WEBGL_compressed_texture_pvrtc:true,WebGLCompressedTextureS3TC:true,WEBGL_compressed_texture_s3tc:true,WebGLCompressedTextureS3TCsRGB:true,WebGLDebugRendererInfo:true,WEBGL_debug_renderer_info:true,WebGLDebugShaders:true,WEBGL_debug_shaders:true,WebGLDepthTexture:true,WEBGL_depth_texture:true,WebGLDrawBuffers:true,WEBGL_draw_buffers:true,EXTsRGB:true,EXT_sRGB:true,EXTBlendMinMax:true,EXT_blend_minmax:true,EXTColorBufferFloat:true,EXTColorBufferHalfFloat:true,EXTDisjointTimerQuery:true,EXTDisjointTimerQueryWebGL2:true,EXTFragDepth:true,EXT_frag_depth:true,EXTShaderTextureLOD:true,EXT_shader_texture_lod:true,EXTTextureFilterAnisotropic:true,EXT_texture_filter_anisotropic:true,WebGLFramebuffer:true,WebGLGetBufferSubDataAsync:true,WebGLLoseContext:true,WebGLExtensionLoseContext:true,WEBGL_lose_context:true,OESElementIndexUint:true,OES_element_index_uint:true,OESStandardDerivatives:true,OES_standard_derivatives:true,OESTextureFloat:true,OES_texture_float:true,OESTextureFloatLinear:true,OES_texture_float_linear:true,OESTextureHalfFloat:true,OES_texture_half_float:true,OESTextureHalfFloatLinear:true,OES_texture_half_float_linear:true,OESVertexArrayObject:true,OES_vertex_array_object:true,WebGLProgram:true,WebGLQuery:true,WebGLRenderbuffer:true,WebGLRenderingContext:true,WebGL2RenderingContext:true,WebGLSampler:true,WebGLShader:true,WebGLShaderPrecisionFormat:true,WebGLSync:true,WebGLTexture:true,WebGLTimerQueryEXT:true,WebGLTransformFeedback:true,WebGLUniformLocation:true,WebGLVertexArrayObject:true,WebGLVertexArrayObjectOES:true,WebGL2RenderingContextBase:true,ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false,HTMLAudioElement:true,HTMLBRElement:true,HTMLCanvasElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOutputElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,AccessibleNodeList:true,HTMLAnchorElement:true,HTMLAreaElement:true,HTMLBaseElement:true,Blob:false,HTMLBodyElement:true,HTMLButtonElement:true,CDATASection:true,CharacterData:true,Comment:true,ProcessingInstruction:true,Text:true,CSSPerspective:true,CSSCharsetRule:true,CSSConditionRule:true,CSSFontFaceRule:true,CSSGroupingRule:true,CSSImportRule:true,CSSKeyframeRule:true,MozCSSKeyframeRule:true,WebKitCSSKeyframeRule:true,CSSKeyframesRule:true,MozCSSKeyframesRule:true,WebKitCSSKeyframesRule:true,CSSMediaRule:true,CSSNamespaceRule:true,CSSPageRule:true,CSSRule:true,CSSStyleRule:true,CSSSupportsRule:true,CSSViewportRule:true,CSSStyleDeclaration:true,MSStyleCSSProperties:true,CSS2Properties:true,CSSImageValue:true,CSSKeywordValue:true,CSSNumericValue:true,CSSPositionValue:true,CSSResourceValue:true,CSSUnitValue:true,CSSURLImageValue:true,CSSStyleValue:false,CSSMatrixComponent:true,CSSRotation:true,CSSScale:true,CSSSkew:true,CSSTranslation:true,CSSTransformComponent:false,CSSTransformValue:true,CSSUnparsedValue:true,CustomEvent:true,DataTransferItemList:true,HTMLDivElement:true,XMLDocument:true,Document:false,DOMException:true,DOMImplementation:true,ClientRectList:true,DOMRectList:true,DOMRectReadOnly:false,DOMStringList:true,DOMTokenList:true,MathMLElement:true,Element:false,AbortPaymentEvent:true,AnimationEvent:true,AnimationPlaybackEvent:true,ApplicationCacheErrorEvent:true,BackgroundFetchClickEvent:true,BackgroundFetchEvent:true,BackgroundFetchFailEvent:true,BackgroundFetchedEvent:true,BeforeInstallPromptEvent:true,BeforeUnloadEvent:true,BlobEvent:true,CanMakePaymentEvent:true,ClipboardEvent:true,CloseEvent:true,DeviceMotionEvent:true,DeviceOrientationEvent:true,ErrorEvent:true,ExtendableEvent:true,ExtendableMessageEvent:true,FetchEvent:true,FontFaceSetLoadEvent:true,ForeignFetchEvent:true,GamepadEvent:true,HashChangeEvent:true,InstallEvent:true,MediaEncryptedEvent:true,MediaKeyMessageEvent:true,MediaQueryListEvent:true,MediaStreamEvent:true,MediaStreamTrackEvent:true,MessageEvent:true,MIDIConnectionEvent:true,MIDIMessageEvent:true,MutationEvent:true,NotificationEvent:true,PageTransitionEvent:true,PaymentRequestEvent:true,PaymentRequestUpdateEvent:true,PopStateEvent:true,PresentationConnectionAvailableEvent:true,PresentationConnectionCloseEvent:true,PromiseRejectionEvent:true,PushEvent:true,RTCDataChannelEvent:true,RTCDTMFToneChangeEvent:true,RTCPeerConnectionIceEvent:true,RTCTrackEvent:true,SecurityPolicyViolationEvent:true,SensorErrorEvent:true,SpeechRecognitionError:true,SpeechRecognitionEvent:true,SpeechSynthesisEvent:true,StorageEvent:true,SyncEvent:true,TrackEvent:true,TransitionEvent:true,WebKitTransitionEvent:true,VRDeviceEvent:true,VRDisplayEvent:true,VRSessionEvent:true,MojoInterfaceRequestEvent:true,USBConnectionEvent:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,WebGLContextEvent:true,Event:false,InputEvent:false,SubmitEvent:false,EventSource:true,AbsoluteOrientationSensor:true,Accelerometer:true,AccessibleNode:true,AmbientLightSensor:true,Animation:true,ApplicationCache:true,DOMApplicationCache:true,OfflineResourceList:true,BackgroundFetchRegistration:true,BatteryManager:true,BroadcastChannel:true,CanvasCaptureMediaStreamTrack:true,FontFaceSet:true,Gyroscope:true,LinearAccelerationSensor:true,Magnetometer:true,MediaDevices:true,MediaKeySession:true,MediaQueryList:true,MediaRecorder:true,MediaSource:true,MediaStream:true,MediaStreamTrack:true,MIDIAccess:true,MIDIInput:true,MIDIOutput:true,MIDIPort:true,NetworkInformation:true,Notification:true,OffscreenCanvas:true,OrientationSensor:true,PaymentRequest:true,Performance:true,PermissionStatus:true,PresentationAvailability:true,PresentationConnection:true,PresentationConnectionList:true,PresentationRequest:true,RelativeOrientationSensor:true,RemotePlayback:true,RTCDataChannel:true,DataChannel:true,RTCDTMFSender:true,RTCPeerConnection:true,webkitRTCPeerConnection:true,mozRTCPeerConnection:true,ScreenOrientation:true,Sensor:true,ServiceWorker:true,ServiceWorkerContainer:true,ServiceWorkerRegistration:true,SharedWorker:true,SpeechRecognition:true,webkitSpeechRecognition:true,SpeechSynthesis:true,SpeechSynthesisUtterance:true,VR:true,VRDevice:true,VRDisplay:true,VRSession:true,VisualViewport:true,WebSocket:true,Worker:true,WorkerPerformance:true,BluetoothDevice:true,BluetoothRemoteGATTCharacteristic:true,Clipboard:true,MojoInterfaceInterceptor:true,USB:true,IDBDatabase:true,IDBOpenDBRequest:true,IDBVersionChangeRequest:true,IDBRequest:true,IDBTransaction:true,AnalyserNode:true,RealtimeAnalyserNode:true,AudioBufferSourceNode:true,AudioDestinationNode:true,AudioNode:true,AudioScheduledSourceNode:true,AudioWorkletNode:true,BiquadFilterNode:true,ChannelMergerNode:true,AudioChannelMerger:true,ChannelSplitterNode:true,AudioChannelSplitter:true,ConstantSourceNode:true,ConvolverNode:true,DelayNode:true,DynamicsCompressorNode:true,GainNode:true,AudioGainNode:true,IIRFilterNode:true,MediaElementAudioSourceNode:true,MediaStreamAudioDestinationNode:true,MediaStreamAudioSourceNode:true,OscillatorNode:true,Oscillator:true,PannerNode:true,AudioPannerNode:true,webkitAudioPannerNode:true,ScriptProcessorNode:true,JavaScriptAudioNode:true,StereoPannerNode:true,WaveShaperNode:true,EventTarget:false,File:true,FileList:true,FileReader:true,FileWriter:true,HTMLFormElement:true,Gamepad:true,HTMLHeadingElement:true,History:true,HTMLCollection:true,HTMLFormControlsCollection:true,HTMLOptionsCollection:true,HTMLDocument:true,XMLHttpRequest:true,XMLHttpRequestUpload:true,XMLHttpRequestEventTarget:false,ImageData:true,HTMLImageElement:true,HTMLInputElement:true,KeyboardEvent:true,Location:true,MediaList:true,MessagePort:true,MIDIInputMap:true,MIDIOutputMap:true,MimeType:true,MimeTypeArray:true,MouseEvent:true,DragEvent:true,PointerEvent:true,WheelEvent:true,DocumentFragment:true,ShadowRoot:true,DocumentType:true,Node:false,NodeList:true,RadioNodeList:true,HTMLOptionElement:true,HTMLParagraphElement:true,Plugin:true,PluginArray:true,ProgressEvent:true,ResourceProgressEvent:true,RTCStatsReport:true,HTMLSelectElement:true,SourceBuffer:true,SourceBufferList:true,HTMLSpanElement:true,SpeechGrammar:true,SpeechGrammarList:true,SpeechRecognitionResult:true,Storage:true,CSSStyleSheet:true,StyleSheet:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,TextTrack:true,TextTrackCue:true,VTTCue:true,TextTrackCueList:true,TextTrackList:true,TimeRanges:true,Touch:true,TouchList:true,TrackDefaultList:true,CompositionEvent:true,FocusEvent:true,TextEvent:true,TouchEvent:true,UIEvent:false,URL:true,VideoTrackList:true,Window:true,DOMWindow:true,DedicatedWorkerGlobalScope:true,ServiceWorkerGlobalScope:true,SharedWorkerGlobalScope:true,WorkerGlobalScope:true,Attr:true,CSSRuleList:true,ClientRect:true,DOMRect:true,GamepadList:true,NamedNodeMap:true,MozNamedAttrMap:true,SpeechRecognitionResultList:true,StyleSheetList:true,IDBKeyRange:true,IDBVersionChangeEvent:true,SVGLength:true,SVGLengthList:true,SVGNumber:true,SVGNumberList:true,SVGPointList:true,SVGScriptElement:true,SVGStringList:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true,SVGElement:false,SVGTransform:true,SVGTransformList:true,AudioBuffer:true,AudioParamMap:true,AudioTrackList:true,AudioContext:true,webkitAudioContext:true,BaseAudioContext:false,OfflineAudioContext:true})
A.aw.$nativeSuperclassTag="ArrayBufferView"
A.er.$nativeSuperclassTag="ArrayBufferView"
A.es.$nativeSuperclassTag="ArrayBufferView"
A.dW.$nativeSuperclassTag="ArrayBufferView"
A.et.$nativeSuperclassTag="ArrayBufferView"
A.eu.$nativeSuperclassTag="ArrayBufferView"
A.b3.$nativeSuperclassTag="ArrayBufferView"
A.ex.$nativeSuperclassTag="EventTarget"
A.ey.$nativeSuperclassTag="EventTarget"
A.eB.$nativeSuperclassTag="EventTarget"
A.eC.$nativeSuperclassTag="EventTarget"})()
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$0=function(){return this()}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$1$0=function(){return this()}
Function.prototype.$1$1=function(a){return this(a)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.vU
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
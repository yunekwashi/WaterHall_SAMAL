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
if(a[b]!==s){A.uU(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.D(a,b)
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
n6(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.oh==null){A.uG()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.b(A.p6("Return interceptor for "+A.h(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.mv
if(o==null)o=$.mv=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.uN(a)
if(p!=null)return p
if(typeof a=="function")return B.ad
s=Object.getPrototypeOf(a)
if(s==null)return B.M
if(s===Object.prototype)return B.M
if(typeof q=="function"){o=$.mv
if(o==null)o=$.mv=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.x,enumerable:false,writable:true,configurable:true})
return B.x}return B.x},
oJ(a,b){if(a<0||a>4294967295)throw A.b(A.aj(a,0,4294967295,"length",null))
return J.rl(new Array(a),b)},
nD(a,b){if(a<0)throw A.b(A.b7("Length must be a non-negative integer: "+a,null))
return A.D(new Array(a),b.h("af<0>"))},
rl(a,b){var s=A.D(a,b.h("af<0>"))
s.$flags=1
return s},
oK(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
rm(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.oK(r))break;++b}return b},
rn(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.e(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.oK(q))break}return b},
bJ(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dy.prototype
return J.fd.prototype}if(typeof a=="string")return J.bS.prototype
if(a==null)return J.dz.prototype
if(typeof a=="boolean")return J.fb.prototype
if(Array.isArray(a))return J.af.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bx.prototype
if(typeof a=="symbol")return J.cM.prototype
if(typeof a=="bigint")return J.cL.prototype
return a}if(a instanceof A.F)return a
return J.n6(a)},
z(a){if(typeof a=="string")return J.bS.prototype
if(a==null)return a
if(Array.isArray(a))return J.af.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bx.prototype
if(typeof a=="symbol")return J.cM.prototype
if(typeof a=="bigint")return J.cL.prototype
return a}if(a instanceof A.F)return a
return J.n6(a)},
cy(a){if(a==null)return a
if(Array.isArray(a))return J.af.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bx.prototype
if(typeof a=="symbol")return J.cM.prototype
if(typeof a=="bigint")return J.cL.prototype
return a}if(a instanceof A.F)return a
return J.n6(a)},
uy(a){if(typeof a=="number")return J.ce.prototype
if(a==null)return a
if(!(a instanceof A.F))return J.bC.prototype
return a},
uz(a){if(typeof a=="number")return J.ce.prototype
if(typeof a=="string")return J.bS.prototype
if(a==null)return a
if(!(a instanceof A.F))return J.bC.prototype
return a},
oe(a){if(typeof a=="string")return J.bS.prototype
if(a==null)return a
if(!(a instanceof A.F))return J.bC.prototype
return a},
J(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bx.prototype
if(typeof a=="symbol")return J.cM.prototype
if(typeof a=="bigint")return J.cL.prototype
return a}if(a instanceof A.F)return a
return J.n6(a)},
of(a){if(a==null)return a
if(!(a instanceof A.F))return J.bC.prototype
return a},
l(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bJ(a).a_(a,b)},
qE(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.uy(a).bc(a,b)},
qF(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.uz(a).aE(a,b)},
m(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.uJ(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.z(a).i(a,b)},
bm(a,b,c){return J.cy(a).k(a,b,c)},
ik(a){return J.J(a).eC(a)},
qG(a,b,c,d){return J.J(a).eM(a,b,c,d)},
qH(a,b){return J.J(a).eV(a,b)},
qI(a,b,c,d){return J.J(a).eY(a,b,c,d)},
qJ(a,b,c){return J.J(a).f0(a,b,c)},
nr(a,b){return J.cy(a).m(a,b)},
qK(a,b,c,d){return J.J(a).bn(a,b,c,d)},
qL(a,b){return J.J(a).fn(a,b)},
qM(a,b,c){return J.J(a).d9(a,b,c)},
il(a){return J.of(a).a2(a)},
ns(a,b){return J.z(a).A(a,b)},
nt(a,b){return J.J(a).L(a,b)},
eH(a,b){return J.cy(a).v(a,b)},
qN(a,b){return J.cy(a).fF(a,b)},
nu(a,b){return J.cy(a).q(a,b)},
qO(a){return J.J(a).gfo(a)},
eI(a){return J.J(a).gde(a)},
c6(a){return J.J(a).gan(a)},
qP(a){return J.J(a).gaw(a)},
cC(a){return J.bJ(a).gH(a)},
im(a){return J.z(a).gD(a)},
nv(a){return J.z(a).gS(a)},
b_(a){return J.cy(a).gE(a)},
qQ(a){return J.J(a).gG(a)},
a8(a){return J.z(a).gj(a)},
ah(a){return J.J(a).gaz(a)},
qR(a){return J.of(a).gcj(a)},
or(a){return J.of(a).gaf(a)},
qS(a){return J.J(a).gh5(a)},
qT(a){return J.bJ(a).gW(a)},
qU(a){return J.J(a).ge6(a)},
cD(a,b,c){return J.cy(a).ap(a,b,c)},
qV(a,b){return J.bJ(a).ds(a,b)},
qW(a,b,c){return J.J(a).fW(a,b,c)},
io(a){return J.J(a).dw(a)},
qX(a,b){return J.J(a).B(a,b)},
qY(a,b){return J.J(a).dC(a,b)},
qZ(a,b){return J.J(a).e5(a,b)},
r_(a,b){return J.J(a).seO(a,b)},
dg(a,b){return J.J(a).sP(a,b)},
r0(a,b){return J.J(a).scC(a,b)},
v(a,b){return J.J(a).sU(a,b)},
r1(a,b,c){return J.J(a).cw(a,b,c)},
os(a,b){return J.oe(a).e7(a,b)},
r2(a){return J.oe(a).h8(a)},
M(a){return J.bJ(a).l(a)},
ot(a){return J.oe(a).u(a)},
r3(a,b){return J.cy(a).dN(a,b)},
cK:function cK(){},
fb:function fb(){},
dz:function dz(){},
a:function a(){},
bT:function bT(){},
fz:function fz(){},
bC:function bC(){},
bx:function bx(){},
cL:function cL(){},
cM:function cM(){},
af:function af(a){this.$ti=a},
fa:function fa(){},
lu:function lu(a){this.$ti=a},
b8:function b8(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
ce:function ce(){},
dy:function dy(){},
fd:function fd(){},
bS:function bS(){}},A={nE:function nE(){},
oM(a){return new A.dC("Field '"+a+"' has been assigned during initialization.")},
rq(a){return new A.dC("Field '"+a+"' has not been initialized.")},
n7(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
bY(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
nP(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
cw(a,b,c){return a},
oi(a){var s,r
for(s=$.aZ.length,r=0;r<s;++r)if(a===$.aZ[r])return!0
return!1},
nO(a,b,c,d){A.dU(b,"start")
if(c!=null){A.dU(c,"end")
if(b>c)A.bK(A.aj(b,0,c,"start",null))}return new A.dY(a,b,c,d.h("dY<0>"))},
rr(a,b,c,d){if(t.gt.b(a))return new A.bu(a,b,c.h("@<0>").J(d).h("bu<1,2>"))
return new A.aE(a,b,c.h("@<0>").J(d).h("aE<1,2>"))},
dx(){return new A.bp("No element")},
rj(){return new A.bp("Too many elements")},
dC:function dC(a){this.a=a},
eV:function eV(a){this.a=a},
ni:function ni(){},
lP:function lP(){},
n:function n(){},
ag:function ag(){},
dY:function dY(a,b,c,d){var _=this
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
dI:function dI(a,b,c){var _=this
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
cm:function cm(a,b){this.a=a
this.$ti=b},
e1:function e1(a,b){this.a=a
this.$ti=b},
aD:function aD(){},
bD:function bD(){},
cY:function cY(){},
hs:function hs(a){this.a=a},
ci:function ci(a,b){this.a=a
this.$ti=b},
bX:function bX(a){this.a=a},
oB(){throw A.b(A.P("Cannot modify unmodifiable Map"))},
qe(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
uJ(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.dX.b(a)},
h(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.M(a)
return s},
dR(a){var s,r=$.oU
if(r==null)r=$.oU=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
oY(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.e(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
dT(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.a.u(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
dS(a){var s,r,q,p
if(a instanceof A.F)return A.aF(A.au(a),null)
s=J.bJ(a)
if(s===B.ac||s===B.ae||t.cx.b(a)){r=B.A(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.aF(A.au(a),null)},
rz(a){var s,r,q
if(typeof a=="number"||A.eB(a))return J.M(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bO)return a.l(0)
s=$.oq()
for(r=0;r<s.length;++r){q=s[r].dK(a)
if(q!=null)return q}return"Instance of '"+A.dS(a)+"'"},
rx(){if(!!self.location)return self.location.href
return null},
rA(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
a7(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.e.b0(s,10)|55296)>>>0,s&1023|56320)}}throw A.b(A.aj(a,0,1114111,null,null))},
oZ(a,b,c,d,e,f,g,h,i){var s,r,q,p=b-1
if(0<=a&&a<100){a+=400
p-=4800}s=B.e.aP(h,1000)
g+=B.e.aa(h-s,1000)
r=i?Date.UTC(a,p,c,d,e,f,g):new Date(a,p,c,d,e,f,g).valueOf()
q=!0
if(!isNaN(r))if(!(r<-864e13))if(!(r>864e13))q=r===864e13&&s!==0
if(q)return null
return r},
aM(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cR(a){return a.c?A.aM(a).getUTCFullYear()+0:A.aM(a).getFullYear()+0},
lM(a){return a.c?A.aM(a).getUTCMonth()+1:A.aM(a).getMonth()+1},
oV(a){return a.c?A.aM(a).getUTCDate()+0:A.aM(a).getDate()+0},
nJ(a){return a.c?A.aM(a).getUTCHours()+0:A.aM(a).getHours()+0},
nK(a){return a.c?A.aM(a).getUTCMinutes()+0:A.aM(a).getMinutes()+0},
oX(a){return a.c?A.aM(a).getUTCSeconds()+0:A.aM(a).getSeconds()+0},
oW(a){return a.c?A.aM(a).getUTCMilliseconds()+0:A.aM(a).getMilliseconds()+0},
bU(a,b,c){var s,r,q={}
q.a=0
s=[]
r=[]
q.a=b.length
B.b.T(s,b)
q.b=""
if(c!=null&&c.a!==0)c.q(0,new A.lL(q,r,s))
return J.qV(a,new A.fc(B.aq,0,s,r,0))},
rw(a,b,c){var s,r,q
if(Array.isArray(b))s=c==null||c.a===0
else s=!1
if(s){r=b.length
if(r===0){if(!!a.$0)return a.$0()}else if(r===1){if(!!a.$1)return a.$1(b[0])}else if(r===2){if(!!a.$2)return a.$2(b[0],b[1])}else if(r===3){if(!!a.$3)return a.$3(b[0],b[1],b[2])}else if(r===4){if(!!a.$4)return a.$4(b[0],b[1],b[2],b[3])}else if(r===5)if(!!a.$5)return a.$5(b[0],b[1],b[2],b[3],b[4])
q=a[""+"$"+r]
if(q!=null)return q.apply(a,b)}return A.rv(a,b,c)},
rv(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(Array.isArray(b))s=b
else s=A.a4(b,t.z)
r=s.length
q=a.$R
if(r<q)return A.bU(a,s,c)
p=a.$D
o=p==null
n=!o?p():null
m=J.bJ(a)
l=m.$C
if(typeof l=="string")l=m[l]
if(o){if(c!=null&&c.a!==0)return A.bU(a,s,c)
if(r===q)return l.apply(a,s)
return A.bU(a,s,c)}if(Array.isArray(n)){if(c!=null&&c.a!==0)return A.bU(a,s,c)
k=q+n.length
if(r>k)return A.bU(a,s,null)
if(r<k){j=n.slice(r-q)
if(s===b)s=A.a4(s,t.z)
B.b.T(s,j)}return l.apply(a,s)}else{if(r>q)return A.bU(a,s,c)
if(s===b)s=A.a4(s,t.z)
i=Object.keys(n)
if(c==null)for(o=i.length,h=0;h<i.length;i.length===o||(0,A.aB)(i),++h){g=n[A.w(i[h])]
if(B.C===g)return A.bU(a,s,c)
B.b.m(s,g)}else{for(o=i.length,f=0,h=0;h<i.length;i.length===o||(0,A.aB)(i),++h){e=A.w(i[h])
if(c.L(0,e)){++f
B.b.m(s,c.i(0,e))}else{g=n[e]
if(B.C===g)return A.bU(a,s,c)
B.b.m(s,g)}}if(f!==c.a)return A.bU(a,s,c)}return l.apply(a,s)}},
ry(a){var s=a.$thrownJsError
if(s==null)return null
return A.c2(s)},
nL(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.ai(a,s)
a.$thrownJsError=s
s.stack=b.l(0)}},
uE(a){throw A.b(A.oc(a))},
e(a,b){if(a==null)J.a8(a)
throw A.b(A.ic(a,b))},
ic(a,b){var s,r="index"
if(!A.eC(b))return new A.b6(!0,b,r,null)
s=A.K(J.a8(a))
if(b<0||b>=s)return A.a6(b,s,a,null,r)
return A.p_(b,r)},
oc(a){return new A.b6(!0,a,null,null)},
b(a){return A.ai(a,new Error())},
ai(a,b){var s
if(a==null)a=new A.bA()
b.dartException=a
s=A.uV
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
uV(){return J.M(this.dartException)},
bK(a,b){throw A.ai(a,b==null?new Error():b)},
aG(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.bK(A.tK(a,b,c),s)},
tK(a,b,c){var s,r,q,p,o,n,m,l,k
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
return new A.e0("'"+s+"': Cannot "+o+" "+l+k+n)},
aB(a){throw A.b(A.a5(a))},
bB(a){var s,r,q,p,o,n
a=A.qa(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.D([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.lW(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
lX(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
p5(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
nF(a,b){var s=b==null,r=s?null:b.method
return new A.ff(a,r,s?null:b.receiver)},
al(a){var s
if(a==null)return new A.lJ(a)
if(a instanceof A.dr){s=a.a
return A.c4(a,s==null?A.aY(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.c4(a,a.dartException)
return A.ul(a)},
c4(a,b){if(t.W.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
ul(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.e.b0(r,16)&8191)===10)switch(q){case 438:return A.c4(a,A.nF(A.h(s)+" (Error "+q+")",null))
case 445:case 5007:A.h(s)
return A.c4(a,new A.dP())}}if(a instanceof TypeError){p=$.qo()
o=$.qp()
n=$.qq()
m=$.qr()
l=$.qu()
k=$.qv()
j=$.qt()
$.qs()
i=$.qx()
h=$.qw()
g=p.ae(s)
if(g!=null)return A.c4(a,A.nF(A.w(s),g))
else{g=o.ae(s)
if(g!=null){g.method="call"
return A.c4(a,A.nF(A.w(s),g))}else if(n.ae(s)!=null||m.ae(s)!=null||l.ae(s)!=null||k.ae(s)!=null||j.ae(s)!=null||m.ae(s)!=null||i.ae(s)!=null||h.ae(s)!=null){A.w(s)
return A.c4(a,new A.dP())}}return A.c4(a,new A.fU(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.dW()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.c4(a,new A.b6(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.dW()
return a},
c2(a){var s
if(a instanceof A.dr)return a.b
if(a==null)return new A.ep(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.ep(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
ih(a){if(a==null)return J.cC(a)
if(typeof a=="object")return A.dR(a)
return J.cC(a)},
ux(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.k(0,a[s],a[r])}return b},
tU(a,b,c,d,e,f){t.Z.a(a)
switch(A.K(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.b(new A.mf("Unsupported number of arguments for wrapped closure"))},
bH(a,b){var s
if(a==null)return null
s=a.$identity
if(!!s)return s
s=A.ut(a,b)
a.$identity=s
return s},
ut(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.tU)},
ra(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.fG().constructor.prototype):Object.create(new A.cG(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.oA(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.r6(a1,h,g)
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
r6(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.r4)}throw A.b("Error in functionType of tearoff")},
r7(a,b,c,d){var s=A.oy
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
oA(a,b,c,d){if(c)return A.r9(a,b,d)
return A.r7(b.length,d,a,b)},
r8(a,b,c,d){var s=A.oy,r=A.r5
switch(b?-1:a){case 0:throw A.b(new A.fD("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
r9(a,b,c){var s,r
if($.ow==null)$.ow=A.ov("interceptor")
if($.ox==null)$.ox=A.ov("receiver")
s=b.length
r=A.r8(s,c,a,b)
return r},
od(a){return A.ra(a)},
r4(a,b){return A.mL(v.typeUniverse,A.au(a.a),b)},
oy(a){return a.a},
r5(a){return a.b},
ov(a){var s,r,q,p=new A.cG("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.b(A.b7("Field name "+a+" not found.",null))},
og(a){return v.getIsolateTag(a)},
ok(a,b,c){var s,r
try{s=A.tJ(a,c,b)
return s}catch(r){}return null},
tJ(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=[],h=typeof a=="object",g=typeof a=="function"
if(g){s=A.pQ(a)
if(s!=null)i.push("globalThis."+s)
else i.push("name: "+A.bv(A.ib(a,"name")))}if(b?!g:!h)i.push('typeof: "'+typeof a+'"')
if(!(h||g))return i.join(", ")
r=v.G
q=r.Object
p=q.getPrototypeOf(a)
o=p==null
if(o)i.push("prototype: null")
else{n=A.ib(p,"constructor")
if(n!=null){m=A.pQ(n)
if(m!=null){if(g)l="Function"
else l=c?"Array":null
if(m!==l)i.push("constructor: "+m)}else{k=A.ib(n,"name")
if(k!=null)i.push("constructor.name: "+A.bv(k))}}}if(r.Array.isArray(a))i.push("isArray")
if(!g){j=A.ib(a,"length")
if(typeof j=="number")i.push("length: "+A.h(j))}if(!o&&!(a instanceof q))i.push("cross-realm")
return i.join(", ")},
ib(a,b){var s=v.G.Object.getOwnPropertyDescriptor(a,b)
if(s==null)return null
return s.value},
pQ(a){var s
if(typeof a!="function")return null
s=A.ib(a,"name")
if(typeof s=="string"&&/^[A-Za-z_$][A-Za-z_$0-9]*$/.test(s))if(a===v.G[s])return s
return null},
w3(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
uN(a){var s,r,q,p,o,n=A.w($.q4.$1(a)),m=$.n5[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.nb[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.an($.q0.$2(a,n))
if(q!=null){m=$.n5[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.nb[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.ne(s)
$.n5[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.nb[n]=s
return s}if(p==="-"){o=A.ne(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.q7(a,s)
if(p==="*")throw A.b(A.p6(n))
if(v.leafTags[n]===true){o=A.ne(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.q7(a,s)},
q7(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.oj(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
ne(a){return J.oj(a,!1,null,!!a.$iL)},
uP(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.ne(s)
else return J.oj(s,c,null,null)},
uG(){if(!0===$.oh)return
$.oh=!0
A.uH()},
uH(){var s,r,q,p,o,n,m,l
$.n5=Object.create(null)
$.nb=Object.create(null)
A.uF()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.q9.$1(o)
if(n!=null){m=A.uP(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
uF(){var s,r,q,p,o,n,m=B.W()
m=A.dd(B.X,A.dd(B.Y,A.dd(B.B,A.dd(B.B,A.dd(B.Z,A.dd(B.a_,A.dd(B.a0(B.A),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.q4=new A.n8(p)
$.q0=new A.n9(o)
$.q9=new A.na(n)},
dd(a,b){return a(b)||b},
uv(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
ro(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.b(A.a2("Illegal RegExp pattern ("+String(o)+")",a,null))},
uS(a,b,c){var s=a.indexOf(b,c)
return s>=0},
uw(a){if(a.indexOf("$",0)>=0)return a.replace(/\$/g,"$$$$")
return a},
qa(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
qc(a,b,c){var s=A.uT(a,b,c)
return s},
uT(a,b,c){var s,r,q
if(b===""){if(a==="")return c
s=a.length
for(r=c,q=0;q<s;++q)r=r+a[q]+c
return r.charCodeAt(0)==0?r:r}if(a.indexOf(b,0)<0)return a
if(a.length<500||c.indexOf("$",0)>=0)return a.split(b).join(c)
return a.replace(new RegExp(A.qa(b),"g"),A.uw(c))},
dj:function dj(a,b){this.a=a
this.$ti=b},
di:function di(){},
bs:function bs(a,b,c){this.a=a
this.b=b
this.$ti=c},
ee:function ee(a,b){this.a=a
this.$ti=b},
ef:function ef(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
fc:function fc(a,b,c,d,e){var _=this
_.a=a
_.c=b
_.d=c
_.e=d
_.f=e},
lL:function lL(a,b,c){this.a=a
this.b=b
this.c=c},
cU:function cU(){},
lW:function lW(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dP:function dP(){},
ff:function ff(a,b,c){this.a=a
this.b=b
this.c=c},
fU:function fU(a){this.a=a},
lJ:function lJ(a){this.a=a},
dr:function dr(a,b){this.a=a
this.b=b},
ep:function ep(a){this.a=a
this.b=null},
bO:function bO(){},
eT:function eT(){},
eU:function eU(){},
fK:function fK(){},
fG:function fG(){},
cG:function cG(a,b){this.a=a
this.b=b},
fD:function fD(a){this.a=a},
mB:function mB(){},
bb:function bb(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
lv:function lv(a){this.a=a},
lz:function lz(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
cg:function cg(a,b){this.a=a
this.$ti=b},
dF:function dF(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
aT:function aT(a,b){this.a=a
this.$ti=b},
dG:function dG(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
dD:function dD(a,b){this.a=a
this.$ti=b},
dE:function dE(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
n8:function n8(a){this.a=a},
n9:function n9(a){this.a=a},
na:function na(a){this.a=a},
fe:function fe(a,b){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null},
mz:function mz(a){this.b=a},
tG(a){return a},
tL(a){return a},
rs(a){return new Int8Array(a)},
oR(a){return new Uint8Array(a)},
oS(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
bG(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.ic(b,a))},
cj:function cj(){},
dL:function dL(){},
hZ:function hZ(a){this.a=a},
dJ:function dJ(){},
ar:function ar(){},
dK:function dK(){},
aV:function aV(){},
fo:function fo(){},
fp:function fp(){},
fq:function fq(){},
fr:function fr(){},
fs:function fs(){},
ft:function ft(){},
fu:function fu(){},
dM:function dM(){},
dN:function dN(){},
eh:function eh(){},
ei:function ei(){},
ej:function ej(){},
ek:function ek(){},
nM(a,b){var s=b.c
return s==null?b.c=A.ev(a,"ae",[b.x]):s},
p0(a){var s=a.w
if(s===6||s===7)return A.p0(a.x)
return s===11||s===12},
rD(a){return a.as},
id(a){return A.mK(v.typeUniverse,a,!1)},
cv(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.cv(a1,s,a3,a4)
if(r===s)return a2
return A.pt(a1,r,!0)
case 7:s=a2.x
r=A.cv(a1,s,a3,a4)
if(r===s)return a2
return A.ps(a1,r,!0)
case 8:q=a2.y
p=A.dc(a1,q,a3,a4)
if(p===q)return a2
return A.ev(a1,a2.x,p)
case 9:o=a2.x
n=A.cv(a1,o,a3,a4)
m=a2.y
l=A.dc(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.nX(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.dc(a1,j,a3,a4)
if(i===j)return a2
return A.pu(a1,k,i)
case 11:h=a2.x
g=A.cv(a1,h,a3,a4)
f=a2.y
e=A.ui(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.pr(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.dc(a1,d,a3,a4)
o=a2.x
n=A.cv(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.nY(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.b(A.eM("Attempted to substitute unexpected RTI kind "+a0))}},
dc(a,b,c,d){var s,r,q,p,o=b.length,n=A.mP(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.cv(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
uj(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.mP(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.cv(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
ui(a,b,c,d){var s,r=b.a,q=A.dc(a,r,c,d),p=b.b,o=A.dc(a,p,c,d),n=b.c,m=A.uj(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.hi()
s.a=q
s.b=o
s.c=m
return s},
D(a,b){a[v.arrayRti]=b
return a},
q2(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.uB(s)
return a.$S()}return null},
uI(a,b){var s
if(A.p0(b))if(a instanceof A.bO){s=A.q2(a)
if(s!=null)return s}return A.au(a)},
au(a){if(a instanceof A.F)return A.B(a)
if(Array.isArray(a))return A.G(a)
return A.o8(J.bJ(a))},
G(a){var s=a[v.arrayRti],r=t.x
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
B(a){var s=a.$ti
return s!=null?s:A.o8(a)},
o8(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.tS(a,s)},
tS(a,b){var s=a instanceof A.bO?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.tg(v.typeUniverse,s.name)
b.$ccache=r
return r},
uB(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.mK(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
uA(a){return A.cx(A.B(a))},
uh(a){var s=a instanceof A.bO?A.q2(a):null
if(s!=null)return s
if(t.aJ.b(a))return J.qT(a).a
if(Array.isArray(a))return A.G(a)
return A.au(a)},
cx(a){var s=a.r
return s==null?a.r=new A.mJ(a):s},
bl(a){return A.cx(A.mK(v.typeUniverse,a,!1))},
tR(a){var s=this
s.b=A.uf(s)
return s.b(a)},
uf(a){var s,r,q,p,o
if(a===t.K)return A.u_
if(A.cA(a))return A.u3
s=a.w
if(s===6)return A.tP
if(s===1)return A.pP
if(s===7)return A.tV
r=A.ue(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.cA)){a.f="$i"+q
if(q==="o")return A.tY
if(a===t.m)return A.tX
return A.u2}}else if(s===10){p=A.uv(a.x,a.y)
o=p==null?A.pP:p
return o==null?A.aY(o):o}return A.tN},
ue(a){if(a.w===8){if(a===t.S)return A.eC
if(a===t.dx||a===t.r)return A.tZ
if(a===t.N)return A.u1
if(a===t.y)return A.eB}return null},
tQ(a){var s=this,r=A.tM
if(A.cA(s))r=A.tz
else if(s===t.K)r=A.aY
else if(A.de(s)){r=A.tO
if(s===t.aV)r=A.o3
else if(s===t.jv)r=A.an
else if(s===t.fU)r=A.pF
else if(s===t.jh)r=A.o4
else if(s===t.jX)r=A.tw
else if(s===t.mU)r=A.ty}else if(s===t.S)r=A.K
else if(s===t.N)r=A.w
else if(s===t.y)r=A.mR
else if(s===t.r)r=A.ac
else if(s===t.dx)r=A.pG
else if(s===t.m)r=A.tx
s.a=r
return s.a(a)},
tN(a){var s=this
if(a==null)return A.de(s)
return A.q6(v.typeUniverse,A.uI(a,s),s)},
tP(a){if(a==null)return!0
return this.x.b(a)},
u2(a){var s,r=this
if(a==null)return A.de(r)
s=r.f
if(a instanceof A.F)return!!a[s]
return!!J.bJ(a)[s]},
tY(a){var s,r=this
if(a==null)return A.de(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.F)return!!a[s]
return!!J.bJ(a)[s]},
tX(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.F)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
pO(a){if(typeof a=="object"){if(a instanceof A.F)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
tM(a){var s=this
if(a==null){if(A.de(s))return a}else if(s.b(a))return a
throw A.ai(A.pJ(a,s),new Error())},
tO(a){var s=this
if(a==null||s.b(a))return a
throw A.ai(A.pJ(a,s),new Error())},
pJ(a,b){return new A.d6("TypeError: "+A.pf(a,A.aF(b,null)))},
eF(a,b,c,d){if(A.q6(v.typeUniverse,a,b))return a
throw A.ai(A.t7("The type argument '"+A.aF(a,null)+"' is not a subtype of the type variable bound '"+A.aF(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
pf(a,b){return A.bv(a)+": type '"+A.aF(A.uh(a),null)+"' is not a subtype of type '"+b+"'"},
t7(a){return new A.d6("TypeError: "+a)},
b4(a,b){return new A.d6("TypeError: "+A.pf(a,b))},
tV(a){var s=this
return s.x.b(a)||A.nM(v.typeUniverse,s).b(a)},
u_(a){return a!=null},
aY(a){if(a!=null)return a
throw A.ai(A.b4(a,"Object"),new Error())},
u3(a){return!0},
tz(a){return a},
pP(a){return!1},
eB(a){return!0===a||!1===a},
mR(a){if(!0===a)return!0
if(!1===a)return!1
throw A.ai(A.b4(a,"bool"),new Error())},
pF(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.ai(A.b4(a,"bool?"),new Error())},
pG(a){if(typeof a=="number")return a
throw A.ai(A.b4(a,"double"),new Error())},
tw(a){if(typeof a=="number")return a
if(a==null)return a
throw A.ai(A.b4(a,"double?"),new Error())},
eC(a){return typeof a=="number"&&Math.floor(a)===a},
K(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.ai(A.b4(a,"int"),new Error())},
o3(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.ai(A.b4(a,"int?"),new Error())},
tZ(a){return typeof a=="number"},
ac(a){if(typeof a=="number")return a
throw A.ai(A.b4(a,"num"),new Error())},
o4(a){if(typeof a=="number")return a
if(a==null)return a
throw A.ai(A.b4(a,"num?"),new Error())},
u1(a){return typeof a=="string"},
w(a){if(typeof a=="string")return a
throw A.ai(A.b4(a,"String"),new Error())},
an(a){if(typeof a=="string")return a
if(a==null)return a
throw A.ai(A.b4(a,"String?"),new Error())},
tx(a){if(A.pO(a))return a
throw A.ai(A.b4(a,"JSObject"),new Error())},
ty(a){if(a==null)return a
if(A.pO(a))return a
throw A.ai(A.b4(a,"JSObject?"),new Error())},
pV(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aF(a[q],b)
return s},
ub(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.pV(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.aF(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
pK(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.D([],t.s)
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
if(l===8){p=A.uk(a.x)
o=a.y
return o.length>0?p+("<"+A.pV(o,b)+">"):p}if(l===10)return A.ub(a,b)
if(l===11)return A.pK(a,b,null)
if(l===12)return A.pK(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.e(b,n)
return b[n]}return"?"},
uk(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
th(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
tg(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.mK(a,b,!1)
else if(typeof m=="number"){s=m
r=A.ew(a,5,"#")
q=A.mP(s)
for(p=0;p<s;++p)q[p]=r
o=A.ev(a,b,q)
n[b]=o
return o}else return m},
te(a,b){return A.pD(a.tR,b)},
td(a,b){return A.pD(a.eT,b)},
mK(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.pl(A.pj(a,null,b,!1))
r.set(b,s)
return s},
mL(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.pl(A.pj(a,b,c,!0))
q.set(c,r)
return r},
tf(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.nX(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
c1(a,b){b.a=A.tQ
b.b=A.tR
return b},
ew(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.be(null,null)
s.w=b
s.as=c
r=A.c1(a,s)
a.eC.set(c,r)
return r},
pt(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.tb(a,b,r,c)
a.eC.set(r,s)
return s},
tb(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.cA(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.de(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.be(null,null)
q.w=6
q.x=b
q.as=c
return A.c1(a,q)},
ps(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.t9(a,b,r,c)
a.eC.set(r,s)
return s},
t9(a,b,c,d){var s,r
if(d){s=b.w
if(A.cA(b)||b===t.K)return b
else if(s===1)return A.ev(a,"ae",[b])
else if(b===t.a||b===t.T)return t.gK}r=new A.be(null,null)
r.w=7
r.x=b
r.as=c
return A.c1(a,r)},
tc(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.be(null,null)
s.w=13
s.x=b
s.as=q
r=A.c1(a,s)
a.eC.set(q,r)
return r},
eu(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
t8(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
ev(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.eu(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.be(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.c1(a,r)
a.eC.set(p,q)
return q},
nX(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.eu(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.be(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.c1(a,o)
a.eC.set(q,n)
return n},
pu(a,b,c){var s,r,q="+"+(b+"("+A.eu(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.be(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.c1(a,s)
a.eC.set(q,r)
return r},
pr(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.eu(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.eu(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.t8(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.be(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.c1(a,p)
a.eC.set(r,o)
return o},
nY(a,b,c,d){var s,r=b.as+("<"+A.eu(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.ta(a,b,c,r,d)
a.eC.set(r,s)
return s},
ta(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.mP(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.cv(a,b,r,0)
m=A.dc(a,c,r,0)
return A.nY(a,n,m,c!==m)}}l=new A.be(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.c1(a,l)},
pj(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
pl(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.t0(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.pk(a,r,l,k,!1)
else if(q===46)r=A.pk(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.cu(a.u,a.e,k.pop()))
break
case 94:k.push(A.tc(a.u,k.pop()))
break
case 35:k.push(A.ew(a.u,5,"#"))
break
case 64:k.push(A.ew(a.u,2,"@"))
break
case 126:k.push(A.ew(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.t2(a,k)
break
case 38:A.t1(a,k)
break
case 63:p=a.u
k.push(A.pt(p,A.cu(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.ps(p,A.cu(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.t_(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.pm(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.t4(a.u,a.e,o)
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
return A.cu(a.u,a.e,m)},
t0(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
pk(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.th(s,o.x)[p]
if(n==null)A.bK('No "'+p+'" in "'+A.rD(o)+'"')
d.push(A.mL(s,o,n))}else d.push(p)
return m},
t2(a,b){var s,r=a.u,q=A.pi(a,b),p=b.pop()
if(typeof p=="string")b.push(A.ev(r,p,q))
else{s=A.cu(r,a.e,p)
switch(s.w){case 11:b.push(A.nY(r,s,q,a.n))
break
default:b.push(A.nX(r,s,q))
break}}},
t_(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.pi(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.cu(p,a.e,o)
q=new A.hi()
q.a=s
q.b=n
q.c=m
b.push(A.pr(p,r,q))
return
case-4:b.push(A.pu(p,b.pop(),s))
return
default:throw A.b(A.eM("Unexpected state under `()`: "+A.h(o)))}},
t1(a,b){var s=b.pop()
if(0===s){b.push(A.ew(a.u,1,"0&"))
return}if(1===s){b.push(A.ew(a.u,4,"1&"))
return}throw A.b(A.eM("Unexpected extended operation "+A.h(s)))},
pi(a,b){var s=b.splice(a.p)
A.pm(a.u,a.e,s)
a.p=b.pop()
return s},
cu(a,b,c){if(typeof c=="string")return A.ev(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.t3(a,b,c)}else return c},
pm(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.cu(a,b,c[s])},
t4(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.cu(a,b,c[s])},
t3(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.b(A.eM("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.b(A.eM("Bad index "+c+" for "+b.l(0)))},
q6(a,b,c){var s,r=b.d
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
if(!A.ak(a,j,c,i,e)||!A.ak(a,i,e,j,c))return!1}return A.pN(a,b.x,c,d.x,e)}if(q===11){if(b===t.dY)return!0
if(p)return!1
return A.pN(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.tW(a,b,c,d,e)}if(o&&q===10)return A.u0(a,b,c,d,e)
return!1},
pN(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
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
tW(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.mL(a,b,r[o])
return A.pE(a,p,null,c,d.y,e)}return A.pE(a,b.y,null,c,d.y,e)},
pE(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.ak(a,b[s],d,e[s],f))return!1
return!0},
u0(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.ak(a,r[s],c,q[s],e))return!1
return!0},
de(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.cA(a))if(s!==6)r=s===7&&A.de(a.x)
return r},
cA(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
pD(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
mP(a){return a>0?new Array(a):v.typeUniverse.sEA},
be:function be(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
hi:function hi(){this.c=this.b=this.a=null},
mJ:function mJ(a){this.a=a},
hf:function hf(){},
d6:function d6(a){this.a=a},
rK(){var s,r,q
if(self.scheduleImmediate!=null)return A.un()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.bH(new A.m7(s),1)).observe(r,{childList:true})
return new A.m6(s,r,q)}else if(self.setImmediate!=null)return A.uo()
return A.up()},
rL(a){self.scheduleImmediate(A.bH(new A.m8(t.M.a(a)),0))},
rM(a){self.setImmediate(A.bH(new A.m9(t.M.a(a)),0))},
rN(a){A.nR(B.a4,t.M.a(a))},
nR(a,b){var s=B.e.aa(a.a,1000)
return A.t5(s<0?0:s,b)},
p4(a,b){var s=B.e.aa(a.a,1000)
return A.t6(s<0?0:s,b)},
t5(a,b){var s=new A.et(!0)
s.eo(a,b)
return s},
t6(a,b){var s=new A.et(!1)
s.ep(a,b)
return s},
U(a){return new A.h_(new A.W($.Q,a.h("W<0>")),a.h("h_<0>"))},
T(a,b){a.$2(0,null)
b.b=!0
return b.a},
y(a,b){A.tA(a,b)},
S(a,b){b.b3(0,a)},
R(a,b){b.c7(A.al(a),A.c2(a))},
tA(a,b){var s,r,q=new A.mS(b),p=new A.mT(b)
if(a instanceof A.W)a.d_(q,p,t.z)
else{s=t.z
if(a instanceof A.W)a.bB(q,p,s)
else{r=new A.W($.Q,t._)
r.a=8
r.c=a
r.d_(q,p,s)}}},
V(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.Q.ck(new A.n1(s),t.H,t.S,t.z)},
pp(a,b,c){return 0},
nw(a){var s
if(t.W.b(a)){s=a.gaR()
if(s!=null)return s}return B.t},
nB(a,b){var s
b.a(a)
s=new A.W($.Q,b.h("W<0>"))
s.aU(a)
return s},
ri(a,b,c){var s=new A.W($.Q,c.h("W<0>"))
A.fP(a,new A.lq(b,s,c))
return s},
o9(a,b){if($.Q===B.h)return null
return null},
tT(a,b){if($.Q!==B.h)A.o9(a,b)
if(b==null)if(t.W.b(a)){b=a.gaR()
if(b==null){A.nL(a,B.t)
b=B.t}}else b=B.t
else if(t.W.b(a))A.nL(a,b)
return new A.ao(a,b)},
mj(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t._;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.nN()
b.bJ(new A.ao(new A.b6(!0,n,null,"Cannot complete a future with itself"),s))
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
b.bg(o.a)
A.cp(b,p)
return}b.a^=2
A.db(null,null,b.b,t.M.a(new A.mk(o,b)))},
cp(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.n,r=t.e;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.ia(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.cp(d.a,c)
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
A.ia(j.a,j.b)
return}g=$.Q
if(g!==h)$.Q=h
else g=null
c=c.c
if((c&15)===8)new A.mo(q,d,n).$0()
else if(o){if((c&1)!==0)new A.mn(q,j).$0()}else if((c&2)!==0)new A.mm(d,q).$0()
if(g!=null)$.Q=g
c=q.c
if(c instanceof A.W){p=q.a.$ti
p=p.h("ae<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.bl(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.mj(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.bl(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
pS(a,b){var s
if(t.ng.b(a))return b.ck(a,t.z,t.K,t.l)
s=t.v
if(s.b(a))return s.a(a)
throw A.b(A.kk(a,"onError",u.c))},
u5(){var s,r
for(s=$.da;s!=null;s=$.da){$.eE=null
r=s.b
$.da=r
if(r==null)$.eD=null
s.a.$0()}},
ug(){$.oa=!0
try{A.u5()}finally{$.eE=null
$.oa=!1
if($.da!=null)$.om().$1(A.q1())}},
pY(a){var s=new A.h0(a),r=$.eD
if(r==null){$.da=$.eD=s
if(!$.oa)$.om().$1(A.q1())}else $.eD=r.b=s},
ud(a){var s,r,q,p=$.da
if(p==null){A.pY(a)
$.eE=$.eD
return}s=new A.h0(a)
r=$.eE
if(r==null){s.b=p
$.da=$.eE=s}else{q=r.b
s.b=q
$.eE=r.b=s
if(q==null)$.eD=s}},
qb(a){var s=null,r=$.Q
if(B.h===r){A.db(s,s,B.h,a)
return}A.db(s,s,r,t.M.a(r.c6(a)))},
vB(a,b){A.cw(a,"stream",t.K)
return new A.hM(b.h("hM<0>"))},
pW(a){return},
pe(a,b,c){var s=b==null?A.uq():b
return t.gS.J(c).h("1(2)").a(s)},
rR(a,b){if(b==null)b=A.us()
if(t.fQ.b(b))return a.ck(b,t.z,t.K,t.l)
if(t.i6.b(b))return t.v.a(b)
throw A.b(A.b7("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace.",null))},
u6(a){},
u8(a,b){A.ia(a,b)},
u7(){},
tD(a,b,c){var s,r,q,p=a.a2(0)
if(p!==$.nn()){s=t.mY.a(new A.mU(b,c))
r=p.$ti
q=$.Q
p.aT(new A.bj(new A.W(q,r),8,s,null,r.h("bj<1,1>")))}else b.aV(c)},
fP(a,b){var s=$.Q
if(s===B.h)return A.nR(a,t.M.a(b))
return A.nR(a,t.M.a(s.c6(b)))},
nQ(a,b){var s=$.Q
if(s===B.h)return A.p4(a,t.my.a(b))
return A.p4(a,t.my.a(s.da(b,t.I)))},
ia(a,b){A.ud(new A.n0(a,b))},
pT(a,b,c,d,e){var s,r=$.Q
if(r===c)return d.$0()
$.Q=c
s=r
try{r=d.$0()
return r}finally{$.Q=s}},
pU(a,b,c,d,e,f,g){var s,r=$.Q
if(r===c)return d.$1(e)
$.Q=c
s=r
try{r=d.$1(e)
return r}finally{$.Q=s}},
uc(a,b,c,d,e,f,g,h,i){var s,r=$.Q
if(r===c)return d.$2(e,f)
$.Q=c
s=r
try{r=d.$2(e,f)
return r}finally{$.Q=s}},
db(a,b,c,d){t.M.a(d)
if(B.h!==c){d=c.c6(d)
d=d}A.pY(d)},
m7:function m7(a){this.a=a},
m6:function m6(a,b,c){this.a=a
this.b=b
this.c=c},
m8:function m8(a){this.a=a},
m9:function m9(a){this.a=a},
et:function et(a){this.a=a
this.b=null
this.c=0},
mI:function mI(a,b){this.a=a
this.b=b},
mH:function mH(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h_:function h_(a,b){this.a=a
this.b=!1
this.$ti=b},
mS:function mS(a){this.a=a},
mT:function mT(a){this.a=a},
n1:function n1(a){this.a=a},
eq:function eq(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
d5:function d5(a,b){this.a=a
this.$ti=b},
ao:function ao(a,b){this.a=a
this.b=b},
d0:function d0(a,b){this.a=a
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
e3:function e3(){},
e2:function e2(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.e=_.d=null
_.$ti=c},
lq:function lq(a,b,c){this.a=a
this.b=b
this.c=c},
lV:function lV(a,b){this.a=a
this.b=b},
h4:function h4(){},
bE:function bE(a,b){this.a=a
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
h0:function h0(a){this.a=a
this.b=null},
bW:function bW(){},
lT:function lT(a,b){this.a=a
this.b=b},
lU:function lU(a,b){this.a=a
this.b=b},
lR:function lR(a){this.a=a},
lS:function lS(a,b,c){this.a=a
this.b=b
this.c=c},
e4:function e4(){},
e5:function e5(){},
d1:function d1(){},
d4:function d4(){},
e7:function e7(){},
e6:function e6(a,b){this.b=a
this.a=null
this.$ti=b},
hB:function hB(a){var _=this
_.a=0
_.c=_.b=null
_.$ti=a},
mA:function mA(a,b){this.a=a
this.b=b},
d2:function d2(a,b){var _=this
_.a=1
_.b=a
_.c=null
_.$ti=b},
hM:function hM(a){this.$ti=a},
mU:function mU(a,b){this.a=a
this.b=b},
eA:function eA(){},
hE:function hE(){},
mC:function mC(a,b){this.a=a
this.b=b},
mD:function mD(a,b,c){this.a=a
this.b=b
this.c=c},
n0:function n0(a,b){this.a=a
this.b=b},
nU(a,b){var s=a[b]
return s===a?null:s},
nV(a,b,c){if(c==null)a[b]=a
else a[b]=c},
pg(){var s=Object.create(null)
A.nV(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
oO(a,b){return new A.bb(a.h("@<0>").J(b).h("bb<1,2>"))},
a3(a,b,c){return b.h("@<0>").J(c).h("oN<1,2>").a(A.ux(a,new A.bb(b.h("@<0>").J(c).h("bb<1,2>"))))},
ap(a,b){return new A.bb(a.h("@<0>").J(b).h("bb<1,2>"))},
ch(a){return new A.cs(a.h("cs<0>"))},
oP(a){return new A.cs(a.h("cs<0>"))},
nW(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
rZ(a,b,c){var s=new A.ct(a,b,c.h("ct<0>"))
s.c=a.e
return s},
aq(a,b,c){var s=A.oO(b,c)
J.nu(a,new A.lA(s,b,c))
return s},
nG(a,b,c){var s=A.oO(b,c)
s.T(0,a)
return s},
oQ(a,b){var s,r,q=A.ch(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.aB)(a),++r)q.m(0,b.a(a[r]))
return q},
nH(a){var s,r
if(A.oi(a))return"{...}"
s=new A.at("")
try{r={}
B.b.m($.aZ,a)
s.a+="{"
r.a=!0
J.nu(a,new A.lC(r,s))
s.a+="}"}finally{if(0>=$.aZ.length)return A.e($.aZ,-1)
$.aZ.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
eb:function eb(){},
cr:function cr(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
ec:function ec(a,b){this.a=a
this.$ti=b},
ed:function ed(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cs:function cs(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
hr:function hr(a){this.a=a
this.c=this.b=null},
ct:function ct(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
e_:function e_(a,b){this.a=a
this.$ti=b},
lA:function lA(a,b,c){this.a=a
this.b=b
this.c=c},
k:function k(){},
E:function E(){},
lB:function lB(a){this.a=a},
lC:function lC(a,b){this.a=a
this.b=b},
cZ:function cZ(){},
aA:function aA(){},
cP:function cP(){},
bZ:function bZ(a,b){this.a=a
this.$ti=b},
as:function as(){},
el:function el(){},
d7:function d7(){},
u9(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.al(r)
q=A.a2(String(s),null,null)
throw A.b(q)}q=A.mV(p)
return q},
mV(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.hn(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.mV(a[s])
return a},
tu(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.qC()
else s=new Uint8Array(o)
for(r=J.z(a),q=0;q<o;++q){p=r.i(a,b+q)
if((p&255)!==p)p=255
s[q]=p}return s},
tt(a,b,c,d){var s=a?$.qB():$.qA()
if(s==null)return null
if(0===c&&d===b.length)return A.pC(s,b)
return A.pC(s,b.subarray(c,d))},
pC(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
ou(a,b,c,d,e,f){if(B.e.aP(f,4)!==0)throw A.b(A.a2("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.b(A.a2("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.b(A.a2("Invalid base64 padding, more than two '=' characters",a,b))},
rQ(a,b,c,d,a0,a1){var s,r,q,p,o,n,m,l,k,j,i="Invalid encoding before padding",h="Invalid character",g=B.e.b0(a1,2),f=a1&3,e=$.on()
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
return A.pd(a,p+1,c,-j-1)}throw A.b(A.a2(h,a,p))}if(o>=0&&o<=127)return(g<<2|f)>>>0
for(p=b;p<c;++p){if(!(p<s))return A.e(a,p)
if(a.charCodeAt(p)>127)break}throw A.b(A.a2(h,a,p))},
rO(a,b,c,d){var s=A.rP(a,b,c),r=(d&3)+(s-b),q=B.e.b0(r,2)*3,p=r&3
if(p!==0&&s<c)q+=p-1
if(q>0)return new Uint8Array(q)
return $.qy()},
rP(a,b,c){var s,r=a.length,q=c,p=q,o=0
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
pd(a,b,c,d){var s,r,q
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
oL(a,b,c){return new A.dB(a,b)},
tI(a){return a.hi()},
rX(a,b){return new A.mw(a,[],A.uu())},
rY(a,b,c){var s,r=new A.at(""),q=A.rX(r,b)
q.bE(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
tv(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
hn:function hn(a,b){this.a=a
this.b=b
this.c=null},
ho:function ho(a){this.a=a},
mO:function mO(){},
mN:function mN(){},
dh:function dh(a){this.a=a},
eR:function eR(a){this.a=a},
km:function km(){},
ma:function ma(){this.a=0},
c8:function c8(){},
eX:function eX(){},
f5:function f5(){},
dB:function dB(a,b){this.a=a
this.b=b},
fh:function fh(a,b){this.a=a
this.b=b},
fg:function fg(){},
ly:function ly(a){this.b=a},
lx:function lx(a){this.a=a},
mx:function mx(){},
my:function my(a,b){this.a=a
this.b=b},
mw:function mw(a,b,c){this.c=a
this.a=b
this.b=c},
fY:function fY(){},
m4:function m4(a){this.a=a},
mM:function mM(a){this.a=a
this.b=16
this.c=0},
oF(a,b){return A.rw(a,b,null)},
eG(a){var s=A.oY(a,null)
if(s!=null)return s
throw A.b(A.a2(a,null,null))},
bI(a){var s=A.dT(a)
if(s!=null)return s
throw A.b(A.a2("Invalid double",a,null))},
rg(a,b){a=A.ai(a,new Error())
if(a==null)a=A.aY(a)
a.stack=b.l(0)
throw a},
dH(a,b,c,d){var s,r=c?J.nD(a,d):J.oJ(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
aU(a,b,c){var s,r=A.D([],c.h("af<0>"))
for(s=J.b_(a);s.p();)B.b.m(r,c.a(s.gt(s)))
if(b)return r
r.$flags=1
return r},
a4(a,b){var s,r
if(Array.isArray(a))return A.D(a.slice(0),b.h("af<0>"))
s=A.D([],b.h("af<0>"))
for(r=J.b_(a);r.p();)B.b.m(s,r.gt(r))
return s},
p3(a,b,c){var s,r
A.dU(b,"start")
if(c!=null){s=c-b
if(s<0)throw A.b(A.aj(c,b,null,"end",null))
if(s===0)return""}r=A.rF(a,b,c)
return r},
rF(a,b,c){var s=a.length
if(b>=s)return""
return A.rA(a,b,c==null||c>s?s:c)},
lN(a){return new A.fe(a,A.ro(a,!1,!0,!1,!1,""))},
p2(a,b,c){var s=J.b_(b)
if(!s.p())return a
if(c.length===0){do a+=A.h(s.gt(s))
while(s.p())}else{a+=A.h(s.gt(s))
while(s.p())a=a+c+A.h(s.gt(s))}return a},
oT(a,b){return new A.fv(a,b.gfS(),b.gfX(),b.gfT())},
nS(){var s,r,q=A.rx()
if(q==null)throw A.b(A.P("'Uri.base' is not supported"))
s=$.p9
if(s!=null&&q===$.p8)return s
r=A.cl(q)
$.p9=r
$.p8=q
return r},
nN(){return A.c2(new Error())},
rb(a,b,c,d,e,f,g,h,i){var s=A.oZ(a,b,c,d,e,f,g,h,i)
if(s==null)return null
return new A.ad(A.rd(s,h,i),h,i)},
lf(a){var s=A.oZ(a,1,1,0,0,0,0,0,!1)
return new A.ad(s==null?new A.lg(a,1,1,0,0,0,0,0).$0():s,0,!1)},
re(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=$.qi().dh(a)
if(c!=null){s=new A.li()
r=c.b
if(1>=r.length)return A.e(r,1)
q=r[1]
q.toString
p=A.eG(q)
if(2>=r.length)return A.e(r,2)
q=r[2]
q.toString
o=A.eG(q)
if(3>=r.length)return A.e(r,3)
q=r[3]
q.toString
n=A.eG(q)
if(4>=r.length)return A.e(r,4)
m=s.$1(r[4])
if(5>=r.length)return A.e(r,5)
l=s.$1(r[5])
if(6>=r.length)return A.e(r,6)
k=s.$1(r[6])
if(7>=r.length)return A.e(r,7)
j=new A.lj().$1(r[7])
i=B.e.aa(j,1000)
q=r.length
if(8>=q)return A.e(r,8)
h=r[8]!=null
if(h){if(9>=q)return A.e(r,9)
g=r[9]
if(g!=null){f=g==="-"?-1:1
if(10>=q)return A.e(r,10)
q=r[10]
q.toString
e=A.eG(q)
if(11>=r.length)return A.e(r,11)
l-=f*(s.$1(r[11])+60*e)}}d=A.rb(p,o,n,m,l,k,i,j%1000,h)
if(d==null)throw A.b(A.a2("Time out of range",a,null))
return d}else throw A.b(A.a2("Invalid date format",a,null))},
nx(a){var s,r
try{s=A.re(a)
return s}catch(r){if(A.al(r) instanceof A.ba)return null
else throw r}},
rd(a,b,c){var s="microsecond"
if(b>999)throw A.b(A.aj(b,0,999,s,null))
if(a<-864e13||a>864e13)throw A.b(A.aj(a,-864e13,864e13,"millisecondsSinceEpoch",null))
if(a===864e13&&b!==0)throw A.b(A.kk(b,s,"Time including microseconds is outside valid range"))
A.cw(c,"isUtc",t.y)
return a},
oC(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
rc(a){var s=Math.abs(a),r=a<0?"-":"+"
if(s>=1e5)return r+s
return r+"0"+s},
lh(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bt(a){if(a>=10)return""+a
return"0"+a},
lk(a,b,c){return new A.b0(a+1000*b+1e6*c)},
bv(a){if(typeof a=="number"||A.eB(a)||a==null)return J.M(a)
if(typeof a=="string")return JSON.stringify(a)
return A.rz(a)},
rh(a,b){A.cw(a,"error",t.K)
A.cw(b,"stackTrace",t.l)
A.rg(a,b)},
eM(a){return new A.eL(a)},
b7(a,b){return new A.b6(!1,null,b,a)},
kk(a,b,c){return new A.b6(!0,a,b,c)},
rB(a){var s=null
return new A.cS(s,s,!1,s,s,a)},
p_(a,b){return new A.cS(null,null,!0,a,b,"Value not in range")},
aj(a,b,c,d,e){return new A.cS(b,c,!0,a,d,"Invalid value")},
cT(a,b,c){if(0>a||a>c)throw A.b(A.aj(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.b(A.aj(b,a,c,"end",null))
return b}return c},
dU(a,b){if(a<0)throw A.b(A.aj(a,0,null,b,null))
return a},
a6(a,b,c,d,e){return new A.f9(b,!0,a,e,"Index out of range")},
P(a){return new A.e0(a)},
p6(a){return new A.fT(a)},
N(a){return new A.bp(a)},
a5(a){return new A.eW(a)},
a2(a,b,c){return new A.ba(a,b,c)},
rk(a,b,c){var s,r
if(A.oi(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.D([],t.s)
B.b.m($.aZ,a)
try{A.u4(a,s)}finally{if(0>=$.aZ.length)return A.e($.aZ,-1)
$.aZ.pop()}r=A.p2(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
nC(a,b,c){var s,r
if(A.oi(a))return b+"..."+c
s=new A.at(b)
B.b.m($.aZ,a)
try{r=s
r.a=A.p2(r.a,a,", ")}finally{if(0>=$.aZ.length)return A.e($.aZ,-1)
$.aZ.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
u4(a,b){var s,r,q,p,o,n,m,l=a.gE(a),k=0,j=0
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
nI(a,b,c,d){var s
if(B.q===c){s=B.d.gH(a)
b=B.d.gH(b)
return A.nP(A.bY(A.bY($.no(),s),b))}if(B.q===d){s=B.d.gH(a)
b=B.d.gH(b)
c=J.cC(c)
return A.nP(A.bY(A.bY(A.bY($.no(),s),b),c))}s=B.d.gH(a)
b=B.d.gH(b)
c=J.cC(c)
d=J.cC(d)
d=A.nP(A.bY(A.bY(A.bY(A.bY($.no(),s),b),c),d))
return d},
c3(a){A.uQ(a)},
cl(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){if(4>=a4)return A.e(a5,4)
s=((a5.charCodeAt(4)^58)*3|a5.charCodeAt(0)^100|a5.charCodeAt(1)^97|a5.charCodeAt(2)^116|a5.charCodeAt(3)^97)>>>0
if(s===0)return A.p7(a4<a4?B.a.n(a5,0,a4):a5,5,a3).gdM()
else if(s===32)return A.p7(B.a.n(a5,5,a4),0,a3).gdM()}r=A.dH(8,0,!1,t.S)
B.b.k(r,0,0)
B.b.k(r,1,-1)
B.b.k(r,2,-1)
B.b.k(r,7,-1)
B.b.k(r,3,0)
B.b.k(r,4,0)
B.b.k(r,5,a4)
B.b.k(r,6,a4)
if(A.pX(a5,0,a4,0,r)>=14)B.b.k(r,7,a4)
q=r[1]
if(q>=0)if(A.pX(a5,0,q,20,r)===20)r[7]=q
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
a5=B.a.aB(a5,n,m,"/");++a4
m=f}j="file"}else if(B.a.R(a5,"http",0)){if(i&&o+3===n&&B.a.R(a5,"80",o+1)){l-=3
e=n-3
m-=3
a5=B.a.aB(a5,o,n,"")
a4-=3
n=e}j="http"}}else if(q===5&&B.a.R(a5,"https",0)){if(i&&o+4===n&&B.a.R(a5,"443",o+1)){l-=4
e=n-4
m-=4
a5=B.a.aB(a5,o,n,"")
a4-=3
n=e}j="https"}k=!h}}}}if(k)return new A.b3(a4<a5.length?B.a.n(a5,0,a4):a5,q,p,o,n,m,l,j)
if(j==null)if(q>0)j=A.o0(a5,0,q)
else{if(q===0)A.d8(a5,0,"Invalid empty scheme")
j=""}d=a3
if(p>0){c=q+3
b=c<p?A.tp(a5,c,p-1):""
a=A.tm(a5,p,o,!1)
i=o+1
if(i<n){a0=A.oY(B.a.n(a5,i,n),a3)
d=A.o_(a0==null?A.bK(A.a2("Invalid port",a5,i)):a0,j)}}else{a=a3
b=""}a1=A.tn(a5,n,m,a3,j,a!=null)
a2=m<l?A.to(a5,m+1,l,a3):a3
return A.i_(j,b,a,d,a1,a2,l<a4?A.tl(a5,l+1,a4):a3)},
pb(a){var s=t.N
return B.b.fG(A.D(a.split("&"),t.s),A.ap(s,s),new A.m3(B.r),t.k)},
fW(a,b,c){throw A.b(A.a2("Illegal IPv4 address, "+a,b,c))},
rH(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j="invalid character"
for(s=a.length,r=b,q=r,p=0,o=0;;){if(q>=c)n=0
else{if(!(q>=0&&q<s))return A.e(a,q)
n=a.charCodeAt(q)}m=n^48
if(m<=9){if(o!==0||q===r){o=o*10+m
if(o<=255){++q
continue}A.fW("each part must be in the range 0..255",a,r)}A.fW("parts must not have leading zeros",a,r)}if(q===r){if(q===c)break
A.fW(j,a,q)}l=p+1
k=e+p
d.$flags&2&&A.aG(d)
if(!(k<16))return A.e(d,k)
d[k]=o
if(n===46){if(l<4){++q
p=l
r=q
o=0
continue}break}if(q===c){if(l===4)return
break}A.fW(j,a,q)
p=l}A.fW("IPv4 address should contain exactly 4 parts",a,q)},
rI(a,b,c){var s
if(b===c)throw A.b(A.a2("Empty IP address",a,b))
if(!(b>=0&&b<a.length))return A.e(a,b)
if(a.charCodeAt(b)===118){s=A.rJ(a,b,c)
if(s!=null)throw A.b(s)
return!1}A.pa(a,b,c)
return!0},
rJ(a,b,c){var s,r,q,p,o,n="Missing hex-digit in IPvFuture address",m=u.f;++b
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
pa(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="an address must contain at most 8 parts",a2=new A.m2(a3)
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
continue}a2.$2("an IPv6 part can contain a maximum of 4 hex digits",m)}if(n>m){if(j===46){if(k){if(p<=6){A.rH(a3,m,a5,s,p*2)
p+=2
n=a5
break}a2.$2(a1,m)}break}o=p*2
e=B.e.b0(l,8)
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
B.K.bH(s,a0,16,s,a)
B.K.fE(s,a,a0,0)}}return s},
i_(a,b,c,d,e,f,g){return new A.ex(a,b,c,d,e,f,g)},
pv(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
d8(a,b,c){throw A.b(A.a2(c,a,b))},
o_(a,b){if(a!=null&&a===A.pv(b))return null
return a},
tm(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(b===c)return""
s=a.length
if(!(b>=0&&b<s))return A.e(a,b)
if(a.charCodeAt(b)===91){r=c-1
if(!(r>=0&&r<s))return A.e(a,r)
if(a.charCodeAt(r)!==93)A.d8(a,b,"Missing end `]` to match `[` in host")
q=b+1
if(!(q<s))return A.e(a,q)
p=""
if(a.charCodeAt(q)!==118){o=A.tj(a,q,r)
if(o<r){n=o+1
p=A.pB(a,B.a.R(a,"25",n)?o+3:n,r,"%25")}}else o=r
m=A.rI(a,q,o)
l=B.a.n(a,q,o)
return"["+(m?l.toLowerCase():l)+p+"]"}for(k=b;k<c;++k){if(!(k<s))return A.e(a,k)
if(a.charCodeAt(k)===58){o=B.a.bu(a,"%",b)
o=o>=b&&o<c?o:c
if(o<c){n=o+1
p=A.pB(a,B.a.R(a,"25",n)?o+3:n,c,"%25")}else p=""
A.pa(a,b,o)
return"["+B.a.n(a,b,o)+p+"]"}}return A.tr(a,b,c)},
tj(a,b,c){var s=B.a.bu(a,"%",b)
return s>=b&&s<c?s:c},
pB(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=d!==""?new A.at(d):null
for(s=a.length,r=b,q=r,p=!0;r<c;){if(!(r>=0&&r<s))return A.e(a,r)
o=a.charCodeAt(r)
if(o===37){n=A.o1(a,r,!0)
m=n==null
if(m&&p){r+=3
continue}if(h==null)h=new A.at("")
l=h.a+=B.a.n(a,q,r)
if(m)n=B.a.n(a,r,r+3)
else if(n==="%")A.d8(a,r,"ZoneID should not contain % anymore")
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
tr(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.f
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
q=r}o=!1}++r}else if(n<=93&&(g.charCodeAt(n)&1024)!==0)A.d8(a,r,"Invalid character")
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
if(!A.px(a.charCodeAt(b)))A.d8(a,b,"Scheme not starting with alphabetic character")
for(r=b,q=!1;r<c;++r){if(!(r<s))return A.e(a,r)
p=a.charCodeAt(r)
if(!(p<128&&(u.f.charCodeAt(p)&8)!==0))A.d8(a,r,"Illegal scheme character")
if(65<=p&&p<=90)q=!0}a=B.a.n(a,b,c)
return A.ti(q?a.toLowerCase():a)},
ti(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
tp(a,b,c){return A.ey(a,b,c,16,!1,!1)},
tn(a,b,c,d,e,f){var s,r=e==="file",q=r||f
if(a==null)return r?"/":""
else s=A.ey(a,b,c,128,!0,!0)
if(s.length===0){if(r)return"/"}else if(q&&!B.a.O(s,"/"))s="/"+s
return A.tq(s,e,f)},
tq(a,b,c){var s=b.length===0
if(s&&!c&&!B.a.O(a,"/")&&!B.a.O(a,"\\"))return A.pA(a,!s||c)
return A.d9(a)},
to(a,b,c,d){if(a!=null)return A.ey(a,b,c,256,!0,!1)
return null},
tl(a,b,c){return A.ey(a,b,c,256,!0,!1)},
o1(a,b,c){var s,r,q,p,o,n,m=u.f,l=b+2,k=a.length
if(l>=k)return"%"
s=b+1
if(!(s>=0&&s<k))return A.e(a,s)
r=a.charCodeAt(s)
if(!(l>=0))return A.e(a,l)
q=a.charCodeAt(l)
p=A.n7(r)
o=A.n7(q)
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
for(o=0;--p,p>=0;q=128){n=B.e.f9(a,6*p)&63|q
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
o+=3}}return A.p3(s,0,null)},
ey(a,b,c,d,e,f){var s=A.pz(a,b,c,d,e,f)
return s==null?B.a.n(a,b,c):s},
pz(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null,h=u.f
for(s=!e,r=a.length,q=b,p=q,o=i;q<c;){if(!(q>=0&&q<r))return A.e(a,q)
n=a.charCodeAt(q)
if(n<127&&(h.charCodeAt(n)&d)!==0)++q
else{m=1
if(n===37){l=A.o1(a,q,!1)
if(l==null){q+=3
continue}if("%"===l)l="%25"
else m=3}else if(n===92&&f)l="/"
else if(s&&n<=93&&(h.charCodeAt(n)&1024)!==0){A.d8(a,q,"Invalid character")
m=i
l=m}else{if((n&64512)===55296){k=q+1
if(k<c){if(!(k<r))return A.e(a,k)
j=a.charCodeAt(k)
if((j&64512)===56320){n=65536+((n&1023)<<10)+(j&1023)
m=2}}}l=A.nZ(n)}if(o==null){o=new A.at("")
k=o}else k=o
k.a=(k.a+=B.a.n(a,p,q))+l
if(typeof m!=="number")return A.uE(m)
q+=m
p=q}}if(o==null)return i
if(p<c){s=B.a.n(a,p,c)
o.a+=s}s=o.a
return s.charCodeAt(0)==0?s:s},
py(a){if(B.a.O(a,"."))return!0
return B.a.dk(a,"/.")!==-1},
d9(a){var s,r,q,p,o,n,m
if(!A.py(a))return a
s=A.D([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(n===".."){m=s.length
if(m!==0){if(0>=m)return A.e(s,-1)
s.pop()
if(s.length===0)B.b.m(s,"")}p=!0}else{p="."===n
if(!p)B.b.m(s,n)}}if(p)B.b.m(s,"")
return B.b.Z(s,"/")},
pA(a,b){var s,r,q,p,o,n
if(!A.py(a))return!b?A.pw(a):a
s=A.D([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n){if(s.length!==0&&B.b.gdn(s)!==".."){if(0>=s.length)return A.e(s,-1)
s.pop()}else B.b.m(s,"..")
p=!0}else{p="."===n
if(!p)B.b.m(s,n.length===0&&s.length===0?"./":n)}}if(s.length===0)return"./"
if(p)B.b.m(s,"")
if(!b){if(0>=s.length)return A.e(s,0)
B.b.k(s,0,A.pw(s[0]))}return B.b.Z(s,"/")},
pw(a){var s,r,q,p=u.f,o=a.length
if(o>=2&&A.px(a.charCodeAt(0)))for(s=1;s<o;++s){r=a.charCodeAt(s)
if(r===58)return B.a.n(a,0,s)+"%3A"+B.a.Y(a,s+1)
if(r<=127){if(!(r<128))return A.e(p,r)
q=(p.charCodeAt(r)&8)===0}else q=!0
if(q)break}return a},
ts(a,b){if(a.fN("package")&&a.c==null)return A.pZ(b,0,b.length)
return-1},
tk(a,b){var s,r,q,p,o
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
else p=new A.eV(B.a.n(a,b,c))
else{p=A.D([],t.b)
for(n=b;n<c;++n){if(!(n<o))return A.e(a,n)
r=a.charCodeAt(n)
if(r>127)throw A.b(A.b7("Illegal percent encoding in URI",null))
if(r===37){if(n+3>o)throw A.b(A.b7("Truncated URI",null))
B.b.m(p,A.tk(a,n+1))
n+=2}else if(r===43)B.b.m(p,32)
else B.b.m(p,r)}}return d.M(0,p)},
px(a){var s=a|32
return 97<=s&&s<=122},
p7(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.D([b-1],t.b)
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
if((j.length&1)===1)a=B.T.du(0,a,m,s)
else{l=A.pz(a,m,s,256,!0,!1)
if(l!=null)a=B.a.aB(a,m,s,l)}return new A.m1(a,j,c)},
pX(a,b,c,d,e){var s,r,q,p,o,n='\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe3\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0e\x03\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\n\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\xeb\xeb\x8b\xeb\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x83\xeb\xeb\x8b\xeb\x8b\xeb\xcd\x8b\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x92\x83\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x8b\xeb\x8b\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xebD\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12D\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe8\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x05\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x10\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\f\xec\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\xec\f\xec\f\xec\xcd\f\xec\f\f\f\f\f\f\f\f\f\xec\f\f\f\f\f\f\f\f\f\f\xec\f\xec\f\xec\f\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\r\xed\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\xed\r\xed\r\xed\xed\r\xed\r\r\r\r\r\r\r\r\r\xed\r\r\r\r\r\r\r\r\r\r\xed\r\xed\r\xed\r\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0f\xea\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe9\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\t\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x11\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xe9\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\t\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x13\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\xf5\x15\x15\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5'
for(s=a.length,r=b;r<c;++r){if(!(r<s))return A.e(a,r)
q=a.charCodeAt(r)^96
if(q>95)q=31
p=d*96+q
if(!(p<2112))return A.e(n,p)
o=n.charCodeAt(p)
d=o&31
B.b.k(e,o>>>5,r)}return d},
pn(a){if(a.b===7&&B.a.O(a.a,"package")&&a.c<=0)return A.pZ(a.a,a.e,a.f)
return-1},
pZ(a,b,c){var s,r,q,p
for(s=a.length,r=b,q=0;r<c;++r){if(!(r>=0&&r<s))return A.e(a,r)
p=a.charCodeAt(r)
if(p===47)return q!==0?r:-1
if(p===37||p===58)return-1
q|=p^46}return-1},
tE(a,b,c){var s,r,q,p,o,n,m,l
for(s=a.length,r=b.length,q=0,p=0;p<s;++p){o=c+p
if(!(o<r))return A.e(b,o)
n=b.charCodeAt(o)
m=a.charCodeAt(p)^n
if(m!==0){if(m===32){l=n|m
if(97<=l&&l<=122){q=32
continue}}return-1}}return q},
lF:function lF(a,b){this.a=a
this.b=b},
lg:function lg(a,b,c,d,e,f,g,h){var _=this
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
li:function li(){},
lj:function lj(){},
b0:function b0(a){this.a=a},
a_:function a_(){},
eL:function eL(a){this.a=a},
bA:function bA(){},
b6:function b6(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cS:function cS(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
f9:function f9(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
fv:function fv(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
e0:function e0(a){this.a=a},
fT:function fT(a){this.a=a},
bp:function bp(a){this.a=a},
eW:function eW(a){this.a=a},
fy:function fy(){},
dW:function dW(){},
mf:function mf(a){this.a=a},
ba:function ba(a,b,c){this.a=a
this.b=b
this.c=c},
f:function f(){},
am:function am(a,b,c){this.a=a
this.b=b
this.$ti=c},
aa:function aa(){},
F:function F(){},
hP:function hP(){},
at:function at(a){this.a=a},
m3:function m3(a){this.a=a},
m2:function m2(a){this.a=a},
ex:function ex(a,b,c,d,e,f,g){var _=this
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
h9:function h9(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
rS(a){var s=a.firstElementChild
if(s==null)throw A.b(A.N("No elements"))
return s},
rf(a,b,c){var s,r=document.body
r.toString
s=t.aN
return t.h.a(new A.I(new A.az(B.z.a4(r,a,b,c)),s.h("H(k.E)").a(new A.ll()),s.h("I<k.E>")).gaF(0))},
dp(a){var s,r,q="element tag unavailable"
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
ru(a,b,c,d){var s=new Option(a,b,c,!1)
s.toString
return s},
rU(a,b){var s,r=a.classList
r.toString
for(s=0;s<5;++s)r.remove(b[s])},
A(a,b,c,d,e){var s=c==null?null:A.q_(new A.md(c),t.A)
s=new A.ea(a,b,s,!1,e.h("ea<0>"))
s.d2()
return s},
ph(a){var s=document.createElement("a")
s.toString
s=new A.hH(s,t.d.a(window.location))
s=new A.cq(s)
s.el(a)
return s},
rV(a,b,c,d){t.h.a(a)
A.w(b)
A.w(c)
t.dl.a(d)
return!0},
rW(a,b,c,d){var s,r,q,p,o,n
t.h.a(a)
A.w(b)
A.w(c)
s=t.dl.a(d).a
r=s.a
B.Q.sfI(r,c)
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
pq(){var s=t.N,r=A.oQ(B.H,s),q=A.D(["TEMPLATE"],t.s),p=t.gL.a(new A.mG())
s=new A.hS(r,A.ch(s),A.ch(s),A.ch(s),null)
s.en(null,new A.a0(B.H,p,t.gQ),q,null)
return s},
pH(a){var s,r="postMessage" in a
r.toString
if(r){s=A.rT(a)
return s}else return t.O.a(a)},
rT(a){var s=window
s.toString
if(a===s)return t.kg.a(a)
else return new A.h7()},
q_(a,b){var s=$.Q
if(s===B.h)return a
return s.da(a,b)},
q:function q(){},
eJ:function eJ(){},
cE:function cE(){},
eK:function eK(){},
cF:function cF(){},
bM:function bM(){},
c7:function c7(){},
bN:function bN(){},
bn:function bn(){},
eZ:function eZ(){},
Y:function Y(){},
c9:function c9(){},
kq:function kq(){},
aC:function aC(){},
b9:function b9(){},
f_:function f_(){},
f0:function f0(){},
f1:function f1(){},
dk:function dk(){},
ca:function ca(){},
f2:function f2(){},
dl:function dl(){},
dm:function dm(){},
dn:function dn(){},
f3:function f3(){},
f4:function f4(){},
h3:function h3(a,b){this.a=a
this.b=b},
bi:function bi(a,b){this.a=a
this.$ti=b},
C:function C(){},
ll:function ll(){},
p:function p(){},
dq:function dq(){},
d:function d(){},
aI:function aI(){},
ds:function ds(){},
dt:function dt(){},
f6:function f6(){},
cI:function cI(){},
aJ:function aJ(){},
du:function du(){},
f8:function f8(){},
bQ:function bQ(){},
dv:function dv(){},
bw:function bw(){},
cd:function cd(){},
cJ:function cJ(){},
dw:function dw(){},
bR:function bR(){},
cO:function cO(){},
fj:function fj(){},
fk:function fk(){},
fl:function fl(){},
lD:function lD(a){this.a=a},
fm:function fm(){},
lE:function lE(a){this.a=a},
aK:function aK(){},
fn:function fn(){},
aw:function aw(){},
az:function az(a){this.a=a},
u:function u(){},
cQ:function cQ(){},
bz:function bz(){},
dQ:function dQ(){},
aL:function aL(){},
fA:function fA(){},
b1:function b1(){},
fC:function fC(){},
lO:function lO(a){this.a=a},
bV:function bV(){},
aN:function aN(){},
fE:function fE(){},
dV:function dV(){},
aO:function aO(){},
fF:function fF(){},
aP:function aP(){},
dX:function dX(){},
lQ:function lQ(a){this.a=a},
ax:function ax(){},
dZ:function dZ(){},
fI:function fI(){},
fJ:function fJ(){},
cX:function cX(){},
ck:function ck(){},
aQ:function aQ(){},
ay:function ay(){},
fL:function fL(){},
fM:function fM(){},
fN:function fN(){},
aR:function aR(){},
fQ:function fQ(){},
fR:function fR(){},
bg:function bg(){},
fX:function fX(){},
fZ:function fZ(){},
c_:function c_(){},
br:function br(){},
d_:function d_(){},
h5:function h5(){},
e8:function e8(){},
hj:function hj(){},
eg:function eg(){},
hK:function hK(){},
hQ:function hQ(){},
h1:function h1(){},
e9:function e9(a){this.a=a},
h8:function h8(a){this.a=a},
mb:function mb(a,b){this.a=a
this.b=b},
mc:function mc(a,b){this.a=a
this.b=b},
he:function he(a){this.a=a},
nA:function nA(a,b){this.a=a
this.$ti=b},
co:function co(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
cn:function cn(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
ea:function ea(a,b,c,d,e){var _=this
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
md:function md(a){this.a=a},
me:function me(a){this.a=a},
nT:function nT(a){this.$ti=a},
cq:function cq(a){this.a=a},
x:function x(){},
dO:function dO(a){this.a=a},
lH:function lH(a){this.a=a},
lG:function lG(a,b,c){this.a=a
this.b=b
this.c=c},
em:function em(){},
mE:function mE(){},
mF:function mF(){},
hS:function hS(a,b,c,d,e){var _=this
_.e=a
_.a=b
_.b=c
_.c=d
_.d=e},
mG:function mG(){},
hR:function hR(){},
cb:function cb(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.d=null
_.$ti=c},
h7:function h7(){},
hH:function hH(a,b){this.a=a
this.b=b},
ez:function ez(a){this.a=a
this.b=0},
mQ:function mQ(a){this.a=a},
h6:function h6(){},
ha:function ha(){},
hb:function hb(){},
hc:function hc(){},
hd:function hd(){},
hg:function hg(){},
hh:function hh(){},
hl:function hl(){},
hm:function hm(){},
ht:function ht(){},
hu:function hu(){},
hv:function hv(){},
hw:function hw(){},
hx:function hx(){},
hy:function hy(){},
hC:function hC(){},
hD:function hD(){},
hF:function hF(){},
en:function en(){},
eo:function eo(){},
hI:function hI(){},
hJ:function hJ(){},
hL:function hL(){},
hT:function hT(){},
hU:function hU(){},
er:function er(){},
es:function es(){},
hV:function hV(){},
hW:function hW(){},
i0:function i0(){},
i1:function i1(){},
i2:function i2(){},
i3:function i3(){},
i4:function i4(){},
i5:function i5(){},
i6:function i6(){},
i7:function i7(){},
i8:function i8(){},
i9:function i9(){},
pI(a){var s,r,q,p
if(a==null)return a
if(typeof a=="string"||typeof a=="number"||A.eB(a))return a
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
q.push(A.pI(a[p]));++p}return q}return a},
b5(a){var s,r,q,p,o,n
if(a==null)return null
s=A.ap(t.N,t.z)
r=Object.getOwnPropertyNames(a)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.aB)(r),++p){o=r[p]
n=o
n.toString
s.k(0,n,A.pI(a[o]))}return s},
ny(){var s=window.navigator.userAgent
s.toString
return s},
eY:function eY(){},
ko:function ko(a){this.a=a},
kp:function kp(a){this.a=a},
f7:function f7(a,b){this.a=a
this.b=b},
lm:function lm(){},
ln:function ln(){},
cN:function cN(){},
tB(a,b,c,d){var s,r,q
A.mR(b)
t.j.a(d)
if(b){s=[c]
B.b.T(s,d)
d=s}r=t.z
q=A.aU(J.cD(d,A.uK(),r),!0,r)
return A.mW(A.oF(t.Z.a(a),q))},
rp(a){return new A.lw(new A.cr(t.mp)).$1(a)},
tF(a){return a},
o6(a,b,c){var s
try{if(Object.isExtensible(a)&&!Object.prototype.hasOwnProperty.call(a,b)){Object.defineProperty(a,b,{value:c})
return!0}}catch(s){}return!1},
pM(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return null},
mW(a){if(a==null||typeof a=="string"||typeof a=="number"||A.eB(a))return a
if(a instanceof A.bo)return a.a
if(A.q5(a))return a
if(t.bl.b(a))return a
if(a instanceof A.ad)return A.aM(a)
if(t.Z.b(a))return A.pL(a,"$dart_jsFunction",new A.mX())
return A.pL(a,"_$dart_jsObject",new A.mY($.op()))},
pL(a,b,c){var s=A.pM(a,b)
if(s==null){s=c.$1(a)
A.o6(a,b,s)}return s},
o5(a){var s
if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else if(a instanceof Object&&A.q5(a))return a
else if(a instanceof Object&&t.bl.b(a))return a
else if(a instanceof Date){s=A.K(a.getTime())
if(s<-864e13||s>864e13)A.bK(A.aj(s,-864e13,864e13,"millisecondsSinceEpoch",null))
A.cw(!1,"isUtc",t.y)
return new A.ad(s,0,!1)}else if(a.constructor===$.op())return a.o
else return A.ob(a)},
ob(a){if(typeof a=="function")return A.o7(a,$.ij(),new A.n2())
if(Array.isArray(a))return A.o7(a,$.oo(),new A.n3())
return A.o7(a,$.oo(),new A.n4())},
o7(a,b,c){var s=A.pM(a,b)
if(s==null||!(a instanceof Object)){s=c.$1(a)
A.o6(a,b,s)}return s},
lw:function lw(a){this.a=a},
hG:function hG(){},
mX:function mX(){},
mY:function mY(a){this.a=a},
n2:function n2(){},
n3:function n3(){},
n4:function n4(){},
bo:function bo(a){this.a=a},
dA:function dA(a){this.a=a},
cf:function cf(a,b){this.a=a
this.$ti=b},
d3:function d3(){},
lI:function lI(a){this.a=a},
tH(a){var s,r=a.$dart_jsFunction
if(r!=null)return r
s=function(b,c){return function(){return b(c,Array.prototype.slice.apply(arguments))}}(A.tC,a)
s[$.ij()]=a
a.$dart_jsFunction=s
return s},
tC(a,b){t.j.a(b)
return A.oF(t.Z.a(a),b)},
um(a,b){if(typeof a=="function")return a
else return b.a(A.tH(a))},
pR(a){return a==null||A.eB(a)||typeof a=="number"||typeof a=="string"||t.jx.b(a)||t.ev.b(a)||t.nn.b(a)||t.m6.b(a)||t.hM.b(a)||t.bW.b(a)||t.mC.b(a)||t.pk.b(a)||t.kI.b(a)||t.lo.b(a)||t.fW.b(a)},
uM(a){if(A.pR(a))return a
return new A.nc(new A.cr(t.as)).$1(a)},
q8(a,b){var s=new A.W($.Q,b.h("W<0>")),r=new A.bE(s,b.h("bE<0>"))
a.then(A.bH(new A.nj(r,b),1),A.bH(new A.nk(r),1))
return s},
nc:function nc(a){this.a=a},
nj:function nj(a,b){this.a=a
this.b=b},
nk:function nk(a){this.a=a},
mu:function mu(a){this.a=a},
aS:function aS(){},
fi:function fi(){},
aW:function aW(){},
fw:function fw(){},
fB:function fB(){},
cV:function cV(){},
fH:function fH(){},
eN:function eN(a){this.a=a},
r:function r(){},
aX:function aX(){},
fS:function fS(){},
hp:function hp(){},
hq:function hq(){},
hz:function hz(){},
hA:function hA(){},
hN:function hN(){},
hO:function hO(){},
hX:function hX(){},
hY:function hY(){},
eO:function eO(){},
eP:function eP(){},
kl:function kl(a){this.a=a},
eQ:function eQ(){},
bL:function bL(){},
fx:function fx(){},
h2:function h2(){},
uO(){var s=document
s.toString
B.E.c4(s,"DOMContentLoaded",new A.nd())},
nd:function nd(){},
ip:function ip(){var _=this
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
jw:function jw(){},
jq:function jq(a){this.a=a},
jr:function jr(){},
js:function js(a){this.a=a},
jp:function jp(){},
jt:function jt(a){this.a=a},
ju:function ju(a){this.a=a},
jv:function jv(a){this.a=a},
j0:function j0(a){this.a=a},
iX:function iX(){},
iY:function iY(){},
iZ:function iZ(a,b){this.a=a
this.b=b},
j_:function j_(a){this.a=a},
j3:function j3(a){this.a=a},
j4:function j4(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
j5:function j5(a){this.a=a},
jb:function jb(a){this.a=a},
jc:function jc(a){this.a=a},
j2:function j2(a,b){this.a=a
this.b=b},
jd:function jd(a){this.a=a},
je:function je(a){this.a=a},
jf:function jf(a){this.a=a},
jg:function jg(a){this.a=a},
jh:function jh(a){this.a=a},
ji:function ji(a,b){this.a=a
this.b=b},
j6:function j6(a){this.a=a},
j7:function j7(a,b){this.a=a
this.b=b},
j8:function j8(a){this.a=a},
j9:function j9(a){this.a=a},
ja:function ja(a){this.a=a},
j1:function j1(a,b){this.a=a
this.b=b},
jj:function jj(){},
k7:function k7(){},
k8:function k8(){},
k9:function k9(){},
kh:function kh(a){this.a=a},
ki:function ki(a){this.a=a},
jI:function jI(){},
jJ:function jJ(a,b){this.a=a
this.b=b},
jH:function jH(a,b){this.a=a
this.b=b},
jK:function jK(a,b){this.a=a
this.b=b},
jG:function jG(a){this.a=a},
jL:function jL(a,b){this.a=a
this.b=b},
jE:function jE(a){this.a=a},
jF:function jF(a,b){this.a=a
this.b=b},
jM:function jM(a,b,c){this.a=a
this.b=b
this.c=c},
jB:function jB(a){this.a=a},
jC:function jC(a){this.a=a},
jD:function jD(a,b){this.a=a
this.b=b},
jN:function jN(a,b,c){this.a=a
this.b=b
this.c=c},
jz:function jz(a){this.a=a},
jA:function jA(){},
jP:function jP(a,b,c){this.a=a
this.b=b
this.c=c},
jQ:function jQ(a,b){this.a=a
this.b=b},
jO:function jO(a,b){this.a=a
this.b=b},
jx:function jx(a){this.a=a},
k2:function k2(){},
k3:function k3(a,b){this.a=a
this.b=b},
k4:function k4(){},
k5:function k5(){},
k6:function k6(a,b){this.a=a
this.b=b},
jR:function jR(a){this.a=a},
jS:function jS(a,b){this.a=a
this.b=b},
jT:function jT(){},
jU:function jU(){},
jV:function jV(a){this.a=a},
jk:function jk(a){this.a=a},
jl:function jl(a){this.a=a},
jm:function jm(a){this.a=a},
jn:function jn(a,b){this.a=a
this.b=b},
jo:function jo(a){this.a=a},
kb:function kb(a){this.a=a},
kc:function kc(a,b,c){this.a=a
this.b=b
this.c=c},
ka:function ka(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
kj:function kj(){},
jy:function jy(a,b){this.a=a
this.b=b},
kg:function kg(a){this.a=a},
kd:function kd(){},
ke:function ke(){},
kf:function kf(){},
iW:function iW(a){this.a=a},
jW:function jW(){},
jX:function jX(){},
jY:function jY(){},
jZ:function jZ(a){this.a=a},
k_:function k_(){},
k0:function k0(){},
k1:function k1(a,b){this.a=a
this.b=b},
iR:function iR(){},
iQ:function iQ(a){this.a=a},
iS:function iS(a){this.a=a},
iT:function iT(a,b){this.a=a
this.b=b},
iU:function iU(a,b,c){this.a=a
this.b=b
this.c=c},
iV:function iV(){},
iv:function iv(a,b,c){this.a=a
this.b=b
this.c=c},
iw:function iw(a){this.a=a},
ix:function ix(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
iO:function iO(a,b,c){this.a=a
this.b=b
this.c=c},
iP:function iP(a){this.a=a},
ir:function ir(a,b,c){this.a=a
this.b=b
this.c=c},
is:function is(a){this.a=a},
it:function it(a){this.a=a},
iD:function iD(a,b,c){this.a=a
this.b=b
this.c=c},
iN:function iN(a,b){this.a=a
this.b=b},
iu:function iu(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
iM:function iM(a,b){this.a=a
this.b=b},
iE:function iE(a,b){this.a=a
this.b=b},
iF:function iF(a,b){this.a=a
this.b=b},
iG:function iG(a,b){this.a=a
this.b=b},
iH:function iH(a,b){this.a=a
this.b=b},
iI:function iI(a,b){this.a=a
this.b=b},
iJ:function iJ(a,b){this.a=a
this.b=b},
iK:function iK(a,b){this.a=a
this.b=b},
iy:function iy(a,b){this.a=a
this.b=b},
iz:function iz(a,b,c){this.a=a
this.b=b
this.c=c},
iL:function iL(a,b){this.a=a
this.b=b},
iA:function iA(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
iB:function iB(a,b,c){this.a=a
this.b=b
this.c=c},
iq:function iq(){},
iC:function iC(a){this.a=a},
aH:function aH(a,b,c){this.a=a
this.b=b
this.c=c},
kr:function kr(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
ku:function ku(){},
kv:function kv(a){this.a=a},
kC:function kC(a){this.a=a},
ky:function ky(a,b){this.a=a
this.b=b},
kz:function kz(a){this.a=a},
kA:function kA(a){this.a=a},
kB:function kB(a,b){this.a=a
this.b=b},
kP:function kP(){},
kQ:function kQ(){},
kx:function kx(){},
l0:function l0(){},
l1:function l1(a,b,c){this.a=a
this.b=b
this.c=c},
l5:function l5(){},
l6:function l6(a){this.a=a},
l7:function l7(a){this.a=a},
l4:function l4(a){this.a=a},
l8:function l8(a){this.a=a},
l9:function l9(){},
kV:function kV(a){this.a=a},
kW:function kW(a){this.a=a},
kX:function kX(a){this.a=a},
kY:function kY(a){this.a=a},
kZ:function kZ(a){this.a=a},
l_:function l_(a){this.a=a},
kD:function kD(){},
kO:function kO(){},
l3:function l3(a,b,c){this.a=a
this.b=b
this.c=c},
l2:function l2(a,b){this.a=a
this.b=b},
la:function la(){},
lb:function lb(){},
lc:function lc(a){this.a=a},
ld:function ld(){},
kt:function kt(){},
ks:function ks(a,b,c){this.a=a
this.b=b
this.c=c},
kN:function kN(a,b){this.a=a
this.b=b},
le:function le(a){this.a=a},
kM:function kM(){},
kK:function kK(a){this.a=a},
kL:function kL(){},
kG:function kG(){},
kH:function kH(){},
kI:function kI(a){this.a=a},
kJ:function kJ(){},
kR:function kR(a,b){this.a=a
this.b=b},
kS:function kS(){},
kT:function kT(){},
kU:function kU(a,b){this.a=a
this.b=b},
kw:function kw(a){this.a=a},
kF:function kF(a,b){this.a=a
this.b=b},
kE:function kE(a){this.a=a},
ii(){var s,r=$.qn(),q=A.D(new Array(24),t.s)
for(s=0;s<24;++s)q[s]=B.a.b7(B.e.h9(r.fU(256),16),2,"0")
return B.b.fO(q)},
bk(){var s,r,q
try{r=window.localStorage.getItem("waterhall_jwt")
r.toString
s=r
r=J.os(s,".")
if(1>=r.length)return A.e(r,1)
r=A.w(J.m(B.c.M(0,B.r.M(0,B.u.b4(B.y.dt(0,r[1])))),"sub"))
return r}catch(q){return null}},
cz(){var s,r,q,p
try{q=window.localStorage.getItem("waterhall_jwt")
q.toString
s=q
q=J.os(s,".")
if(1>=q.length)return A.e(q,1)
r=B.c.M(0,B.r.M(0,B.u.b4(B.y.dt(0,q[1]))))
q=J.qE(J.qF(J.m(r,"exp"),1000),Date.now())
return q}catch(p){return!1}},
ie(a,b){var s=0,r=A.U(t.z),q
var $async$ie=A.V(function(c,d){if(c===1)return A.R(d,r)
for(;;)switch(s){case 0:if(!$.c5().b6("WaterHallStorage")){q=null
s=1
break}s=3
return A.y(A.q8(A.aY(globalThis.waterhallNativeCall(a,A.uM(b))),t.z),$async$ie)
case 3:q=d
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$ie,r)},
ig(a){var s=0,r=A.U(t.H)
var $async$ig=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:s=$.c5().b6("waterhallSetNativeSession")?2:3
break
case 2:s=4
return A.y(A.q8(A.aY(globalThis.waterhallSetNativeSession(a)),t.z),$async$ig)
case 4:case 3:return A.S(null,r)}})
return A.T($async$ig,r)},
cB(a,b){var s=A.bk(),r=$.qD().dH(new A.ng(s,a,b),t.a)
$.ua=r.dc(new A.nh())
return r},
mZ(a,b){var s=0,r=A.U(t.H),q,p,o,n
var $async$mZ=A.V(function(c,d){if(c===1)return A.R(d,r)
for(;;)switch(s){case 0:n=A.bk()
if(n==null)throw A.b(A.N("Sign in before recording an operation"))
q=A.G(b)
p=q.h("I<1>")
o=A.a4(new A.I(b,q.h("H(1)").a(new A.n_(n)),p),p.h("f.E"))
s=2
return A.y(A.ie("save",A.a3(["type",a,"rows",o],t.N,t.z)),$async$mZ)
case 2:q=window.localStorage
q.toString
p=a==="collections"?"waterhall_offline_collections":"waterhall_unsynced_actions"
q.setItem(p,B.c.V(b))
return A.S(null,r)}})
return A.T($async$mZ,r)},
df(){var s=0,r=A.U(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$df=A.V(function(a2,a3){if(a2===1)return A.R(a3,r)
for(;;)switch(s){case 0:a1=window.localStorage.getItem("waterhall_jwt")
if(A.bk()==null){s=1
break}s=3
return A.y(A.ig(window.localStorage.getItem("waterhall_jwt")),$async$df)
case 3:p=["collections","actions"],o=t.f,n=t.N,m=t.z,l=t.j,k=t.P,j=0
case 4:if(!(j<2)){s=6
break}i=p[j]
if(window.localStorage.getItem("waterhall_jwt")!=a1){s=1
break}s=7
return A.y(A.ie("load",A.a3(["type",i],n,m)),$async$df)
case 7:h=a3
if(window.localStorage.getItem("waterhall_jwt")!=a1){s=1
break}if(h==null){s=5
break}g=l.a(B.c.M(0,A.w(h)))
f=i==="collections"?"waterhall_offline_collections":"waterhall_unsynced_actions"
e=window.localStorage.getItem(f)
d=A.ap(n,k)
e=A.a4(l.a(B.c.M(0,e==null?"[]":e)),m)
B.b.T(e,g)
c=e.length
b=0
for(;b<e.length;e.length===c||(0,A.aB)(e),++b){a=A.aq(o.a(e[b]),n,m)
a0=a.i(0,"transaction_id")
d.k(0,J.M(a0==null?a.i(0,"operation_id"):a0),a)}s=A.bk()!=null?8:9
break
case 8:s=10
return A.y(A.cB(i,new A.nm(d)),$async$df)
case 10:case 9:case 5:++j
s=4
break
case 6:case 1:return A.S(q,r)}})
return A.T($async$df,r)},
ng:function ng(a,b,c){this.a=a
this.b=b
this.c=c},
nf:function nf(){},
nh:function nh(){},
n_:function n_(a){this.a=a},
nm:function nm(a){this.a=a},
nl:function nl(a){this.a=a},
q5(a){return t.fj.b(a)||t.A.b(a)||t.mz.b(a)||t.ad.b(a)||t.F.b(a)||t.hE.b(a)||t.f5.b(a)},
uQ(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
uU(a){throw A.ai(A.oM(a),new Error())},
av(){throw A.ai(A.rq(""),new Error())},
qd(){throw A.ai(A.oM(""),new Error())}},B={}
var w=[A,J,B]
var $={}
A.nE.prototype={}
J.cK.prototype={
a_(a,b){return a===b},
gH(a){return A.dR(a)},
l(a){return"Instance of '"+A.dS(a)+"'"},
ds(a,b){throw A.b(A.oT(a,t.bg.a(b)))},
gW(a){return A.cx(A.o8(this))}}
J.fb.prototype={
l(a){return String(a)},
gH(a){return a?519018:218159},
gW(a){return A.cx(t.y)},
$iZ:1,
$iH:1}
J.dz.prototype={
a_(a,b){return null==b},
l(a){return"null"},
gH(a){return 0},
$iZ:1,
$iaa:1}
J.a.prototype={$ii:1}
J.bT.prototype={
gH(a){return 0},
l(a){return String(a)}}
J.fz.prototype={}
J.bC.prototype={}
J.bx.prototype={
l(a){var s=a[$.ij()]
if(s==null)s=a[$.qh()]
if(s==null)return this.ef(a)
return"JavaScript function for "+J.M(s)},
$icc:1}
J.cL.prototype={
gH(a){return 0},
l(a){return String(a)}}
J.cM.prototype={
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
if(b>s)throw A.b(A.p_(b,null))
a.splice(b,0,c)},
f_(a,b,c){var s,r,q,p,o
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
Z(a,b){var s,r=A.dH(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.k(r,s,A.h(a[s]))
return r.join(b)},
fO(a){return this.Z(a,"")},
h_(a,b){var s,r,q
A.G(a).h("1(1,1)").a(b)
s=a.length
if(s===0)throw A.b(A.dx())
if(0>=s)return A.e(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.b(A.a5(a))}return r},
fG(a,b,c,d){var s,r,q
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
throw A.b(A.dx())},
fF(a,b){return this.di(a,b,null)},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
cD(a,b,c){var s=a.length
if(b>s)throw A.b(A.aj(b,0,s,"start",null))
if(c==null)c=s
else if(c<b||c>s)throw A.b(A.aj(c,b,s,"end",null))
if(b===c)return A.D([],A.G(a))
return A.D(a.slice(b,c),A.G(a))},
e9(a,b){return this.cD(a,b,null)},
gC(a){if(a.length>0)return a[0]
throw A.b(A.dx())},
gdn(a){var s=a.length
if(s>0)return a[s-1]
throw A.b(A.dx())},
ab(a,b){var s,r
A.G(a).h("H(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.b(A.a5(a))}return!1},
be(a,b){var s,r,q,p,o,n=A.G(a)
n.h("j(1,1)?").a(b)
a.$flags&2&&A.aG(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.bc()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.bH(b,2))
if(p>0)this.f1(a,p)},
f1(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
A(a,b){var s
for(s=0;s<a.length;++s)if(J.l(a[s],b))return!0
return!1},
gD(a){return a.length===0},
gS(a){return a.length!==0},
l(a){return A.nC(a,"[","]")},
gE(a){return new J.b8(a,a.length,A.G(a).h("b8<1>"))},
gH(a){return A.dR(a)},
gj(a){return a.length},
sj(a,b){a.$flags&1&&A.aG(a,"set length","change the length of")
if(b>a.length)A.G(a).c.a(null)
a.length=b},
i(a,b){A.K(b)
if(!(b>=0&&b<a.length))throw A.b(A.ic(a,b))
return a[b]},
k(a,b,c){A.G(a).c.a(c)
a.$flags&2&&A.aG(a)
if(!(b>=0&&b<a.length))throw A.b(A.ic(a,b))
a[b]=c},
dN(a,b){return new A.cm(a,b.h("cm<0>"))},
fJ(a,b){var s
A.G(a).h("H(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$in:1,
$if:1,
$io:1}
J.fa.prototype={
dK(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.dS(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.lu.prototype={}
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
$ia9:1}
J.ce.prototype={
a3(a,b){var s
A.ac(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gbv(b)
if(this.gbv(a)===s)return 0
if(this.gbv(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbv(a){return a===0?1/a<0:a<0},
aC(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.b(A.P(""+a+".round()"))},
df(a,b,c){if(B.e.a3(b,c)>0)throw A.b(A.oc(b))
if(this.a3(a,b)<0)return b
if(this.a3(a,c)>0)return c
return a},
K(a,b){var s
if(b>20)throw A.b(A.aj(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gbv(a))return"-"+s
return s},
h9(a,b){var s,r,q,p,o
if(b<2||b>36)throw A.b(A.aj(b,2,36,"radix",null))
s=a.toString(b)
r=s.length
q=r-1
if(!(q>=0))return A.e(s,q)
if(s.charCodeAt(q)!==41)return s
p=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(s)
if(p==null)A.bK(A.P("Unexpected toString result: "+s))
r=p.length
if(1>=r)return A.e(p,1)
s=p[1]
if(3>=r)return A.e(p,3)
o=+p[3]
r=p[2]
if(r!=null){s+=r
o-=r.length}return s+B.a.aE("0",o)},
l(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gH(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
aE(a,b){return a*b},
aP(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
ek(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.cY(a,b)},
aa(a,b){return(a|0)===a?a/b|0:this.cY(a,b)},
cY(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.b(A.P("Result of truncating division is "+A.h(s)+": "+A.h(a)+" ~/ "+b))},
b0(a,b){var s
if(a>0)s=this.cX(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
f9(a,b){if(0>b)throw A.b(A.oc(b))
return this.cX(a,b)},
cX(a,b){return b>31?0:a>>>b},
bc(a,b){return a>b},
gW(a){return A.cx(t.r)},
$iX:1,
$ia1:1}
J.dy.prototype={
gW(a){return A.cx(t.S)},
$iZ:1,
$ij:1}
J.fd.prototype={
gW(a){return A.cx(t.dx)},
$iZ:1}
J.bS.prototype={
cr(a,b){return a+b},
e7(a,b){var s=A.D(a.split(b),t.s)
return s},
aB(a,b,c,d){var s=A.cT(b,c,a.length)
return a.substring(0,b)+d+a.substring(s)},
R(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.aj(c,0,a.length,null,null))
s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)},
O(a,b){return this.R(a,b,0)},
n(a,b,c){return a.substring(b,A.cT(b,c,a.length))},
Y(a,b){return this.n(a,b,null)},
h8(a){return a.toLowerCase()},
u(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.e(p,0)
if(p.charCodeAt(0)===133){s=J.rm(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.e(p,r)
q=p.charCodeAt(r)===133?J.rn(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
aE(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.b(B.a1)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
b7(a,b,c){var s=b-a.length
if(s<=0)return a
return this.aE(c,s)+a},
bu(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.aj(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
dk(a,b){return this.bu(a,b,0)},
dq(a,b,c){var s,r
if(c==null)c=a.length
else if(c<0||c>a.length)throw A.b(A.aj(c,0,a.length,null,null))
s=b.length
r=a.length
if(c+s>r)c=r-s
return a.lastIndexOf(b,c)},
fP(a,b){return this.dq(a,b,null)},
bq(a,b,c){var s=a.length
if(c>s)throw A.b(A.aj(c,0,s,null,null))
return A.uS(a,b,c)},
A(a,b){return this.bq(a,b,0)},
a3(a,b){var s
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
gW(a){return A.cx(t.N)},
gj(a){return a.length},
i(a,b){A.K(b)
if(!(b>=0&&b<a.length))throw A.b(A.ic(a,b))
return a[b]},
$iZ:1,
$ilK:1,
$ic:1}
A.dC.prototype={
l(a){return"LateInitializationError: "+this.a}}
A.eV.prototype={
gj(a){return this.a.length},
i(a,b){var s
A.K(b)
s=this.a
if(!(b>=0&&b<s.length))return A.e(s,b)
return s.charCodeAt(b)}}
A.ni.prototype={
$0(){return A.nB(null,t.H)},
$S:37}
A.lP.prototype={}
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
bD(a,b){return this.ec(0,A.B(this).h("H(ag.E)").a(b))},
ap(a,b,c){var s=A.B(this)
return new A.a0(this,s.J(c).h("1(ag.E)").a(b),s.h("@<ag.E>").J(c).h("a0<1,2>"))},
aD(a,b){var s=A.a4(this,A.B(this).h("ag.E"))
return s},
ar(a){return this.aD(0,!0)},
dJ(a){var s,r=this,q=A.ch(A.B(r).h("ag.E"))
for(s=0;s<r.gj(r);++s)q.m(0,r.v(0,s))
return q}}
A.dY.prototype={
geK(){var s=J.a8(this.a),r=this.c
if(r==null||r>s)return s
return r},
gfb(){var s=J.a8(this.a),r=this.b
if(r>s)return s
return r},
gj(a){var s,r=J.a8(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
v(a,b){var s=this,r=s.gfb()+b
if(b<0||r>=s.geK())throw A.b(A.a6(b,s.gj(0),s,null,"index"))
return J.eH(s.a,r)},
aD(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.z(n),l=m.gj(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.nD(0,n):J.oJ(0,n)}r=A.dH(s,m.v(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.b.k(r,q,m.v(n,o+q))
if(m.gj(n)<l)throw A.b(A.a5(p))}return r},
ar(a){return this.aD(0,!0)}}
A.by.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s,r=this,q=r.a,p=J.z(q),o=p.gj(q)
if(r.b!==o)throw A.b(A.a5(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.v(q,s);++r.c
return!0},
$ia9:1}
A.aE.prototype={
gE(a){return new A.dI(J.b_(this.a),this.b,A.B(this).h("dI<1,2>"))},
gj(a){return J.a8(this.a)},
gD(a){return J.im(this.a)},
v(a,b){return this.b.$1(J.eH(this.a,b))}}
A.bu.prototype={$in:1}
A.dI.prototype={
p(){var s=this,r=s.b
if(r.p()){s.a=s.c.$1(r.gt(r))
return!0}s.a=null
return!1},
gt(a){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$ia9:1}
A.a0.prototype={
gj(a){return J.a8(this.a)},
v(a,b){return this.b.$1(J.eH(this.a,b))}}
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
$ia9:1}
A.cm.prototype={
gE(a){return new A.e1(J.b_(this.a),this.$ti.h("e1<1>"))}}
A.e1.prototype={
p(){var s,r
for(s=this.a,r=this.$ti.c;s.p();)if(r.b(s.gt(s)))return!0
return!1},
gt(a){var s=this.a
return this.$ti.c.a(s.gt(s))},
$ia9:1}
A.aD.prototype={}
A.bD.prototype={
k(a,b,c){A.B(this).h("bD.E").a(c)
throw A.b(A.P("Cannot modify an unmodifiable list"))}}
A.cY.prototype={}
A.hs.prototype={
gj(a){return J.a8(this.a)},
v(a,b){var s=J.a8(this.a)
if(0>b||b>=s)A.bK(A.a6(b,s,this,null,"index"))
return b}}
A.ci.prototype={
i(a,b){return this.L(0,b)?J.m(this.a,A.K(b)):null},
gj(a){return J.a8(this.a)},
gG(a){return new A.hs(this.a)},
gD(a){return J.im(this.a)},
gS(a){return J.nv(this.a)},
L(a,b){return A.eC(b)&&b>=0&&b<J.a8(this.a)},
q(a,b){var s,r,q,p
this.$ti.h("~(j,1)").a(b)
s=this.a
r=J.z(s)
q=r.gj(s)
for(p=0;p<q;++p){b.$2(p,r.i(s,p))
if(q!==r.gj(s))throw A.b(A.a5(s))}}}
A.bX.prototype={
gH(a){var s=this._hashCode
if(s!=null)return s
s=664597*B.a.gH(this.a)&536870911
this._hashCode=s
return s},
l(a){return'Symbol("'+this.a+'")'},
a_(a,b){if(b==null)return!1
return b instanceof A.bX&&this.a===b.a},
$icW:1}
A.dj.prototype={}
A.di.prototype={
gD(a){return this.gj(this)===0},
gS(a){return this.gj(this)!==0},
l(a){return A.nH(this)},
k(a,b,c){var s=A.B(this)
s.c.a(b)
s.y[1].a(c)
A.oB()},
B(a,b){A.oB()},
gaw(a){return new A.d5(this.fD(0),A.B(this).h("d5<am<1,2>>"))},
fD(a){var s=this
return function(){var r=a
var q=0,p=1,o=[],n,m,l,k,j
return function $async$gaw(b,c,d){if(c===1){o.push(d)
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
gG(a){return new A.ee(this.gcQ(),this.$ti.h("ee<1>"))}}
A.ee.prototype={
gj(a){return this.a.length},
gD(a){return 0===this.a.length},
gE(a){var s=this.a
return new A.ef(s,s.length,this.$ti.h("ef<1>"))}}
A.ef.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$ia9:1}
A.fc.prototype={
gfS(){var s=this.a
if(s instanceof A.bX)return s
return this.a=new A.bX(A.w(s))},
gfX(){var s,r,q,p,o,n=this
if(n.c===1)return B.G
s=n.d
r=J.z(s)
q=r.gj(s)-J.a8(n.e)-n.f
if(q===0)return B.G
p=[]
for(o=0;o<q;++o)p.push(r.i(s,o))
p.$flags=3
return p},
gfT(){var s,r,q,p,o,n,m,l,k=this
if(k.c!==0)return B.J
s=k.e
r=J.z(s)
q=r.gj(s)
p=k.d
o=J.z(p)
n=o.gj(p)-q-k.f
if(q===0)return B.J
m=new A.bb(t.bX)
for(l=0;l<q;++l)m.k(0,new A.bX(A.w(r.i(s,l))),o.i(p,n+l))
return new A.dj(m,t.i9)},
$ioI:1}
A.lL.prototype={
$2(a,b){var s
A.w(a)
s=this.a
s.b=s.b+"$"+a
B.b.m(this.b,a)
B.b.m(this.c,b);++s.a},
$S:11}
A.cU.prototype={}
A.lW.prototype={
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
A.dP.prototype={
l(a){return"Null check operator used on a null value"}}
A.ff.prototype={
l(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.fU.prototype={
l(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.lJ.prototype={
l(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.dr.prototype={}
A.ep.prototype={
l(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibf:1}
A.bO.prototype={
l(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.qe(r==null?"unknown":r)+"'"},
$icc:1,
ghd(){return this},
$C:"$1",
$R:1,
$D:null}
A.eT.prototype={$C:"$0",$R:0}
A.eU.prototype={$C:"$2",$R:2}
A.fK.prototype={}
A.fG.prototype={
l(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.qe(s)+"'"}}
A.cG.prototype={
a_(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.cG))return!1
return this.$_target===b.$_target&&this.a===b.a},
gH(a){return(A.ih(this.a)^A.dR(this.$_target))>>>0},
l(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.dS(this.a)+"'")}}
A.fD.prototype={
l(a){return"RuntimeError: "+this.a}}
A.mB.prototype={}
A.bb.prototype={
gj(a){return this.a},
gD(a){return this.a===0},
gS(a){return this.a!==0},
gG(a){return new A.cg(this,A.B(this).h("cg<1>"))},
gaw(a){return new A.dD(this,A.B(this).h("dD<1,2>"))},
L(a,b){var s=this.b
if(s==null)return!1
return s[b]!=null},
T(a,b){A.B(this).h("t<1,2>").a(b).q(0,new A.lv(this))},
i(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.fL(b)},
fL(a){var s,r,q=this.d
if(q==null)return null
s=q[this.dl(a)]
r=this.dm(s,a)
if(r<0)return null
return s[r].b},
k(a,b,c){var s,r,q=this,p=A.B(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.cE(s==null?q.b=q.bU():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.cE(r==null?q.c=q.bU():r,b,c)}else q.fM(b,c)},
fM(a,b){var s,r,q,p,o=this,n=A.B(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.bU()
r=o.dl(a)
q=s[r]
if(q==null)s[r]=[o.bV(a,b)]
else{p=o.dm(q,a)
if(p>=0)q[p].b=b
else q.push(o.bV(a,b))}},
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
s.bT()}},
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
if(s==null)a[b]=this.bV(b,c)
else s.b=c},
eq(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.er(s)
delete a[b]
return s.b},
bT(){this.r=this.r+1&1073741823},
bV(a,b){var s=this,r=A.B(s),q=new A.lz(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.bT()
return q},
er(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.bT()},
dl(a){return J.cC(a)&1073741823},
dm(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.l(a[r].a,b))return r
return-1},
l(a){return A.nH(this)},
bU(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ioN:1}
A.lv.prototype={
$2(a,b){var s=this.a,r=A.B(s)
s.k(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.B(this.a).h("~(1,2)")}}
A.lz.prototype={}
A.cg.prototype={
gj(a){return this.a.a},
gD(a){return this.a.a===0},
gE(a){var s=this.a
return new A.dF(s,s.r,s.e,this.$ti.h("dF<1>"))},
A(a,b){return this.a.L(0,b)}}
A.dF.prototype={
gt(a){return this.d},
p(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a5(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$ia9:1}
A.aT.prototype={
gj(a){return this.a.a},
gD(a){return this.a.a===0},
gE(a){var s=this.a
return new A.dG(s,s.r,s.e,this.$ti.h("dG<1>"))},
q(a,b){var s,r,q
this.$ti.h("~(1)").a(b)
s=this.a
r=s.e
q=s.r
while(r!=null){b.$1(r.b)
if(q!==s.r)throw A.b(A.a5(s))
r=r.c}}}
A.dG.prototype={
gt(a){return this.d},
p(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a5(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$ia9:1}
A.dD.prototype={
gj(a){return this.a.a},
gD(a){return this.a.a===0},
gE(a){var s=this.a
return new A.dE(s,s.r,s.e,this.$ti.h("dE<1,2>"))}}
A.dE.prototype={
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
$ia9:1}
A.n8.prototype={
$1(a){return this.a(a)},
$S:12}
A.n9.prototype={
$2(a,b){return this.a(a,b)},
$S:40}
A.na.prototype={
$1(a){return this.a(A.w(a))},
$S:38}
A.fe.prototype={
l(a){return"RegExp/"+this.a+"/"+this.b.flags},
dh(a){var s=this.b.exec(a)
if(s==null)return null
return new A.mz(s)},
$ilK:1,
$irC:1}
A.mz.prototype={
i(a,b){var s
A.K(b)
s=this.b
if(!(b<s.length))return A.e(s,b)
return s[b]}}
A.cj.prototype={
gW(a){return B.ar},
d9(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
$iZ:1,
$icj:1,
$ieS:1}
A.dL.prototype={
gfs(a){if(((a.$flags|0)&2)!==0)return new A.hZ(a.buffer)
else return a.buffer},
eP(a,b,c,d){var s=A.aj(b,0,c,d,null)
throw A.b(s)},
cI(a,b,c,d){if(b>>>0!==b||b>c)this.eP(a,b,c,d)},
$iab:1}
A.hZ.prototype={
d9(a,b,c){var s=A.oS(this.a,b,c)
s.$flags=3
return s},
$ieS:1}
A.dJ.prototype={
gW(a){return B.as},
$iZ:1,
$ikn:1}
A.ar.prototype={
gj(a){return a.length},
f8(a,b,c,d,e){var s,r,q=a.length
this.cI(a,b,q,"start")
this.cI(a,c,q,"end")
if(b>c)throw A.b(A.aj(b,0,c,null,null))
s=c-b
if(e<0)throw A.b(A.b7(e,null))
r=d.length
if(r-e<s)throw A.b(A.N("Not enough elements"))
if(e!==0||r!==s)d=d.subarray(e,e+s)
a.set(d,b)},
$iL:1}
A.dK.prototype={
i(a,b){A.K(b)
A.bG(b,a,a.length)
return a[b]},
k(a,b,c){A.pG(c)
a.$flags&2&&A.aG(a)
A.bG(b,a,a.length)
a[b]=c},
$in:1,
$if:1,
$io:1}
A.aV.prototype={
k(a,b,c){A.K(c)
a.$flags&2&&A.aG(a)
A.bG(b,a,a.length)
a[b]=c},
bH(a,b,c,d,e){t.fm.a(d)
a.$flags&2&&A.aG(a,5)
if(t.aj.b(d)){this.f8(a,b,c,d,e)
return}this.eg(a,b,c,d,e)},
$in:1,
$if:1,
$io:1}
A.fo.prototype={
gW(a){return B.at},
$iZ:1,
$ilo:1}
A.fp.prototype={
gW(a){return B.au},
$iZ:1,
$ilp:1}
A.fq.prototype={
gW(a){return B.av},
i(a,b){A.K(b)
A.bG(b,a,a.length)
return a[b]},
$iZ:1,
$ilr:1}
A.fr.prototype={
gW(a){return B.aw},
i(a,b){A.K(b)
A.bG(b,a,a.length)
return a[b]},
$iZ:1,
$ils:1}
A.fs.prototype={
gW(a){return B.ax},
i(a,b){A.K(b)
A.bG(b,a,a.length)
return a[b]},
$iZ:1,
$ilt:1}
A.ft.prototype={
gW(a){return B.az},
i(a,b){A.K(b)
A.bG(b,a,a.length)
return a[b]},
$iZ:1,
$ilY:1}
A.fu.prototype={
gW(a){return B.aA},
i(a,b){A.K(b)
A.bG(b,a,a.length)
return a[b]},
$iZ:1,
$ilZ:1}
A.dM.prototype={
gW(a){return B.aB},
gj(a){return a.length},
i(a,b){A.K(b)
A.bG(b,a,a.length)
return a[b]},
$iZ:1,
$im_:1}
A.dN.prototype={
gW(a){return B.aC},
gj(a){return a.length},
i(a,b){A.K(b)
A.bG(b,a,a.length)
return a[b]},
$iZ:1,
$im0:1}
A.eh.prototype={}
A.ei.prototype={}
A.ej.prototype={}
A.ek.prototype={}
A.be.prototype={
h(a){return A.mL(v.typeUniverse,this,a)},
J(a){return A.tf(v.typeUniverse,this,a)}}
A.hi.prototype={}
A.mJ.prototype={
l(a){return A.aF(this.a,null)}}
A.hf.prototype={
l(a){return this.a}}
A.d6.prototype={$ibA:1}
A.m7.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:13}
A.m6.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:71}
A.m8.prototype={
$0(){this.a.$0()},
$S:14}
A.m9.prototype={
$0(){this.a.$0()},
$S:14}
A.et.prototype={
eo(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(A.bH(new A.mI(this,b),0),a)
else throw A.b(A.P("`setTimeout()` not found."))},
ep(a,b){if(self.setTimeout!=null)this.b=self.setInterval(A.bH(new A.mH(this,a,Date.now(),b),0),a)
else throw A.b(A.P("Periodic timer."))},
a2(a){var s
if(self.setTimeout!=null){s=this.b
if(s==null)return
if(this.a)self.clearTimeout(s)
else self.clearInterval(s)
this.b=null}else throw A.b(A.P("Canceling a timer."))},
$ifO:1}
A.mI.prototype={
$0(){var s=this.a
s.b=null
s.c=1
this.b.$0()},
$S:2}
A.mH.prototype={
$0(){var s,r=this,q=r.a,p=q.c+1,o=r.b
if(o>0){s=Date.now()-r.c
if(s>(p+1)*o)p=B.e.ek(s,o)}q.c=p
r.d.$1(q)},
$S:14}
A.h_.prototype={
b3(a,b){var s,r=this,q=r.$ti
q.h("1/?").a(b)
if(b==null)b=q.c.a(b)
if(!r.b)r.a.aU(b)
else{s=r.a
if(q.h("ae<1>").b(b))s.cG(b)
else s.bN(b)}},
c7(a,b){var s=this.a
if(this.b)s.ak(new A.ao(a,b))
else s.bJ(new A.ao(a,b))}}
A.mS.prototype={
$1(a){return this.a.$2(0,a)},
$S:15}
A.mT.prototype={
$2(a,b){this.a.$2(1,new A.dr(a,t.l.a(b)))},
$S:39}
A.n1.prototype={
$2(a,b){this.a(A.K(a),b)},
$S:42}
A.eq.prototype={
gt(a){var s=this.b
return s==null?this.$ti.c.a(s):s},
f2(a,b){var s,r,q
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
n.d=null}p=n.f2(l,m)
if(1===p)return!0
if(0===p){n.b=null
o=n.e
if(o==null||o.length===0){n.a=A.pp
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
n.a=A.pp
throw m
return!1}if(0>=o.length)return A.e(o,-1)
n.a=o.pop()
l=1
continue}throw A.b(A.N("sync*"))}return!1},
hh(a){var s,r,q=this
if(a instanceof A.d5){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.b.m(r,q.a)
q.a=s
return 2}else{q.d=J.b_(a)
return 2}},
$ia9:1}
A.d5.prototype={
gE(a){return new A.eq(this.a(),this.$ti.h("eq<1>"))}}
A.ao.prototype={
l(a){return A.h(this.a)},
$ia_:1,
gaR(){return this.b}}
A.d0.prototype={}
A.bF.prototype={
bW(){},
bX(){},
sbi(a){this.ch=this.$ti.h("bF<1>?").a(a)},
sbY(a){this.CW=this.$ti.h("bF<1>?").a(a)}}
A.e3.prototype={
geR(){return this.c<4},
eZ(a){var s,r
A.B(this).h("bF<1>").a(a)
s=a.CW
r=a.ch
if(s==null)this.d=r
else s.sbi(r)
if(r==null)this.e=s
else r.sbY(s)
a.sbY(a)
a.sbi(a)},
fc(a,b,c,d){var s,r,q,p,o,n,m,l=this,k=A.B(l)
k.h("~(1)?").a(a)
t.jE.a(c)
if((l.c&4)!==0){k=new A.d2($.Q,k.h("d2<1>"))
A.qb(k.geS())
if(c!=null)k.c=t.M.a(c)
return k}s=$.Q
r=d?1:0
q=b!=null?32:0
p=A.pe(s,a,k.c)
A.rR(s,b)
o=c==null?A.ur():c
t.M.a(o)
k=k.h("bF<1>")
n=new A.bF(l,p,s,r|q,k)
n.CW=n
n.ch=n
k.a(n)
n.ay=l.c&1
m=l.e
l.e=n
n.sbi(null)
n.sbY(m)
if(m==null)l.d=n
else m.sbi(n)
if(l.d==l.e)A.pW(l.a)
return n},
eW(a){var s=this,r=A.B(s)
a=r.h("bF<1>").a(r.h("bq<1>").a(a))
if(a.ch===a)return null
r=a.ay
if((r&2)!==0)a.ay=r|4
else{s.eZ(a)
if((s.c&2)===0&&s.d==null)s.eA()}return null},
ev(){if((this.c&4)!==0)return new A.bp("Cannot add new events after calling close")
return new A.bp("Cannot add new events while doing an addStream")},
m(a,b){var s=this
A.B(s).c.a(b)
if(!s.geR())throw A.b(s.ev())
s.c1(b)},
eA(){if((this.c&4)!==0)if(null.ghg())null.aU(null)
A.pW(this.b)},
$ip1:1,
$ipo:1,
$ic0:1}
A.e2.prototype={
c1(a){var s,r=this.$ti
r.c.a(a)
for(s=this.d,r=r.h("e6<1>");s!=null;s=s.ch)s.ex(new A.e6(a,r))}}
A.lq.prototype={
$0(){var s,r,q,p,o,n,m=this,l=m.a
if(l==null){m.c.a(null)
m.b.aV(null)}else{s=null
try{s=l.$0()}catch(p){r=A.al(p)
q=A.c2(p)
l=r
o=q
n=A.o9(l,o)
l=new A.ao(l,o)
m.b.ak(l)
return}m.b.aV(s)}},
$S:2}
A.lV.prototype={
l(a){var s=this.b.l(0)
return"TimeoutException after "+s+": "+this.a}}
A.h4.prototype={
c7(a,b){var s=this.a
if((s.a&30)!==0)throw A.b(A.N("Future already completed"))
s.bJ(A.tT(a,b))},
bp(a){return this.c7(a,null)}}
A.bE.prototype={
b3(a,b){var s,r=this.$ti
r.h("1/?").a(b)
s=this.a
if((s.a&30)!==0)throw A.b(A.N("Future already completed"))
s.aU(r.h("1/").a(b))},
fu(a){return this.b3(0,null)}}
A.bj.prototype={
fR(a){if((this.c&15)!==6)return!0
return this.b.b.cn(t.iW.a(this.d),a.a,t.y,t.K)},
fH(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.ng.b(q))p=l.h6(q,m,a.b,o,n,t.l)
else p=l.cn(t.v.a(q),m,o,n)
try{o=r.$ti.h("2/").a(p)
return o}catch(s){if(t.do.b(A.al(s))){if((r.c&1)!==0)throw A.b(A.b7("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.b(A.b7("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.W.prototype={
bB(a,b,c){var s,r,q,p=this.$ti
p.J(c).h("1/(2)").a(a)
s=$.Q
if(s===B.h){if(b!=null&&!t.ng.b(b)&&!t.v.b(b))throw A.b(A.kk(b,"onError",u.c))}else{c.h("@<0/>").J(p.c).h("1(2)").a(a)
if(b!=null)b=A.pS(b,s)}r=new A.W(s,c.h("W<0>"))
q=b==null?1:3
this.aT(new A.bj(r,q,a,b,p.h("@<1>").J(c).h("bj<1,2>")))
return r},
dH(a,b){return this.bB(a,null,b)},
d_(a,b,c){var s,r=this.$ti
r.J(c).h("1/(2)").a(a)
s=new A.W($.Q,c.h("W<0>"))
this.aT(new A.bj(s,19,a,b,r.h("@<1>").J(c).h("bj<1,2>")))
return s},
dc(a){var s=this.$ti,r=$.Q,q=new A.W(r,s)
if(r!==B.h)a=A.pS(a,r)
this.aT(new A.bj(q,2,null,a,s.h("bj<1,1>")))
return q},
f7(a){this.a=this.a&1|16
this.c=a},
bg(a){this.a=a.a&30|this.a&1
this.c=a.c},
aT(a){var s,r=this,q=r.a
if(q<=3){a.a=t.e.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.aT(a)
return}r.bg(s)}A.db(null,null,r.b,t.M.a(new A.mg(r,a)))}},
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
return}m.bg(n)}l.a=m.bl(a)
A.db(null,null,m.b,t.M.a(new A.ml(l,m)))}},
aY(){var s=t.e.a(this.c)
this.c=null
return this.bl(s)},
bl(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
aV(a){var s,r=this,q=r.$ti
q.h("1/").a(a)
if(q.h("ae<1>").b(a))A.mj(a,r,!0)
else{s=r.aY()
q.c.a(a)
r.a=8
r.c=a
A.cp(r,s)}},
bN(a){var s,r=this
r.$ti.c.a(a)
s=r.aY()
r.a=8
r.c=a
A.cp(r,s)},
eF(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.aY()
q.bg(a)
A.cp(q,r)},
ak(a){var s=this.aY()
this.f7(a)
A.cp(this,s)},
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
A.db(null,null,s.b,t.M.a(new A.mi(s,a)))},
cG(a){A.mj(this.$ti.h("ae<1>").a(a),this,!1)
return},
bJ(a){this.a^=2
A.db(null,null,this.b,t.M.a(new A.mh(this,a)))},
dI(a,b){var s,r=this,q={}
if((r.a&24)!==0){q=new A.W($.Q,r.$ti)
q.aU(r)
return q}s=new A.W($.Q,r.$ti)
q.a=null
q.a=A.fP(b,new A.mr(s,b))
r.bB(new A.ms(q,r,s),new A.mt(q,s),t.a)
return s},
$iae:1}
A.mg.prototype={
$0(){A.cp(this.a,this.b)},
$S:2}
A.ml.prototype={
$0(){A.cp(this.b,this.a.a)},
$S:2}
A.mk.prototype={
$0(){A.mj(this.a.a,this.b,!0)},
$S:2}
A.mi.prototype={
$0(){this.a.bN(this.b)},
$S:2}
A.mh.prototype={
$0(){this.a.ak(this.b)},
$S:2}
A.mo.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dE(t.mY.a(q.d),t.z)}catch(p){s=A.al(p)
r=A.c2(p)
if(k.c&&t.n.a(k.b.a.c).a===s){q=k.a
q.c=t.n.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.nw(q)
n=k.a
n.c=new A.ao(q,o)
q=n}q.b=!0
return}if(j instanceof A.W&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.n.a(j.c)
q.b=!0}return}if(j instanceof A.W){m=k.b.a
l=new A.W(m.b,m.$ti)
j.bB(new A.mp(l,m),new A.mq(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:2}
A.mp.prototype={
$1(a){this.a.eF(this.b)},
$S:13}
A.mq.prototype={
$2(a,b){A.aY(a)
t.l.a(b)
this.a.ak(new A.ao(a,b))},
$S:26}
A.mn.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.cn(o.h("2/(1)").a(p.d),m,o.h("2/"),n)}catch(l){s=A.al(l)
r=A.c2(l)
q=s
p=r
if(p==null)p=A.nw(q)
o=this.a
o.c=new A.ao(q,p)
o.b=!0}},
$S:2}
A.mm.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.n.a(l.a.a.c)
p=l.b
if(p.a.fR(s)&&p.a.e!=null){p.c=p.a.fH(s)
p.b=!1}}catch(o){r=A.al(o)
q=A.c2(o)
p=t.n.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.nw(p)
m=l.b
m.c=new A.ao(p,n)
p=m}p.b=!0}},
$S:2}
A.mr.prototype={
$0(){var s=A.nN()
this.a.ak(new A.ao(new A.lV("Future not completed",this.b),s))},
$S:2}
A.ms.prototype={
$1(a){var s
this.b.$ti.c.a(a)
s=this.a.a
if(s.b!=null){s.a2(0)
this.c.bN(a)}},
$S(){return this.b.$ti.h("aa(1)")}}
A.mt.prototype={
$2(a,b){var s
A.aY(a)
t.l.a(b)
s=this.a.a
if(s.b!=null){s.a2(0)
this.b.ak(new A.ao(a,b))}},
$S:26}
A.h0.prototype={}
A.bW.prototype={
gj(a){var s={},r=new A.W($.Q,t.hy)
s.a=0
this.bw(new A.lT(s,this),!0,new A.lU(s,r),r.gcL())
return r},
gC(a){var s=new A.W($.Q,A.B(this).h("W<1>")),r=this.bw(null,!0,new A.lR(s),s.gcL())
r.cg(new A.lS(this,r,s))
return s}}
A.lT.prototype={
$1(a){A.B(this.b).c.a(a);++this.a.a},
$S(){return A.B(this.b).h("~(1)")}}
A.lU.prototype={
$0(){this.b.aV(this.a.a)},
$S:2}
A.lR.prototype={
$0(){var s,r=A.nN(),q=new A.bp("No element")
A.nL(q,r)
s=A.o9(q,r)
s=new A.ao(q,r)
this.a.ak(s)},
$S:2}
A.lS.prototype={
$1(a){A.tD(this.b,this.c,A.B(this.a).c.a(a))},
$S(){return A.B(this.a).h("~(1)")}}
A.e4.prototype={
gH(a){return(A.dR(this.a)^892482866)>>>0},
a_(a,b){if(b==null)return!1
if(this===b)return!0
return b instanceof A.d0&&b.a===this.a}}
A.e5.prototype={
cS(){return this.w.eW(this)},
bW(){A.B(this.w).h("bq<1>").a(this)},
bX(){A.B(this.w).h("bq<1>").a(this)}}
A.d1.prototype={
cg(a){var s=A.B(this)
this.a=A.pe(this.d,s.h("~(1)?").a(a),s.c)},
a2(a){var s,r=this,q=r.e&=4294967279
if((q&8)===0){q=r.e=q|8
if((q&128)!==0){s=r.r
if(s.a===1)s.a=3}if((q&64)===0)r.r=null
r.f=r.cS()}q=$.nn()
return q},
bW(){},
bX(){},
cS(){return null},
ex(a){var s,r,q=this,p=q.r
if(p==null)p=q.r=new A.hB(A.B(q).h("hB<1>"))
s=p.c
if(s==null)p.b=p.c=a
else p.c=s.a=a
r=q.e
if((r&128)===0){r|=128
q.e=r
if(r<256)p.cv(q)}},
c1(a){var s,r=this,q=A.B(r).c
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
if(r)q.bW()
else q.bX()
p=q.e&=4294967231}if((p&128)!==0&&p<256)q.r.cv(q)},
$ibq:1,
$ic0:1}
A.d4.prototype={
bw(a,b,c,d){var s=this.$ti
s.h("~(1)?").a(a)
t.jE.a(c)
return this.a.fc(s.h("~(1)?").a(a),d,c,b===!0)},
fQ(a){return this.bw(a,null,null,null)}}
A.e7.prototype={}
A.e6.prototype={}
A.hB.prototype={
cv(a){var s,r=this
r.$ti.h("c0<1>").a(a)
s=r.a
if(s===1)return
if(s>=1){r.a=1
return}A.qb(new A.mA(r,a))
r.a=1}}
A.mA.prototype={
$0(){var s,r,q,p=this.a,o=p.a
p.a=0
if(o===3)return
s=p.$ti.h("c0<1>").a(this.b)
r=p.b
q=r.a
p.b=q
if(q==null)p.c=null
A.B(r).h("c0<1>").a(s).c1(r.b)},
$S:2}
A.d2.prototype={
cg(a){this.$ti.h("~(1)?").a(a)},
a2(a){this.a=-1
this.c=null
return $.nn()},
eT(){var s,r=this,q=r.a-1
if(q===0){r.a=-1
s=r.c
if(s!=null){r.c=null
r.b.dF(s)}}else r.a=q},
$ibq:1}
A.hM.prototype={}
A.mU.prototype={
$0(){return this.a.aV(this.b)},
$S:2}
A.eA.prototype={$ipc:1}
A.hE.prototype={
dF(a){var s,r,q
t.M.a(a)
try{if(B.h===$.Q){a.$0()
return}A.pT(null,null,this,a,t.H)}catch(q){s=A.al(q)
r=A.c2(q)
A.ia(A.aY(s),t.l.a(r))}},
dG(a,b,c){var s,r,q
c.h("~(0)").a(a)
c.a(b)
try{if(B.h===$.Q){a.$1(b)
return}A.pU(null,null,this,a,b,t.H,c)}catch(q){s=A.al(q)
r=A.c2(q)
A.ia(A.aY(s),t.l.a(r))}},
c6(a){return new A.mC(this,t.M.a(a))},
da(a,b){return new A.mD(this,b.h("~(0)").a(a),b)},
i(a,b){return null},
dE(a,b){b.h("0()").a(a)
if($.Q===B.h)return a.$0()
return A.pT(null,null,this,a,b)},
cn(a,b,c,d){c.h("@<0>").J(d).h("1(2)").a(a)
d.a(b)
if($.Q===B.h)return a.$1(b)
return A.pU(null,null,this,a,b,c,d)},
h6(a,b,c,d,e,f){d.h("@<0>").J(e).J(f).h("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.Q===B.h)return a.$2(b,c)
return A.uc(null,null,this,a,b,c,d,e,f)},
ck(a,b,c,d){return b.h("@<0>").J(c).J(d).h("1(2,3)").a(a)}}
A.mC.prototype={
$0(){return this.a.dF(this.b)},
$S:2}
A.mD.prototype={
$1(a){var s=this.c
return this.a.dG(this.b,s.a(a),s)},
$S(){return this.c.h("~(0)")}}
A.n0.prototype={
$0(){A.rh(this.a,this.b)},
$S:2}
A.eb.prototype={
gj(a){return this.a},
gD(a){return this.a===0},
gS(a){return this.a!==0},
gG(a){return new A.ec(this,this.$ti.h("ec<1>"))},
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
n.eD(s==null?n.b=A.pg():s,b,c)}else{r=n.d
if(r==null)r=n.d=A.pg()
q=A.ih(b)&1073741823
p=r[q]
if(p==null){A.nV(r,q,[b,c]);++n.a
n.e=null}else{o=n.al(p,b)
if(o>=0)p[o+1]=c
else{p.push(b,c);++n.a
n.e=null}}}},
B(a,b){var s
if(b!=="__proto__")return this.bk(this.b,b)
else{s=this.bZ(0,b)
return s}},
bZ(a,b){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=A.ih(b)&1073741823
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
h=A.dH(i.a,null,!1,t.z)
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
bk(a,b){var s
if(a!=null&&a[b]!=null){s=this.$ti.y[1].a(A.nU(a,b))
delete a[b];--this.a
this.e=null
return s}else return null},
cN(a,b){return a[A.ih(b)&1073741823]}}
A.cr.prototype={
al(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.ec.prototype={
gj(a){return this.a.a},
gD(a){return this.a.a===0},
gS(a){return this.a.a!==0},
gE(a){var s=this.a
return new A.ed(s,s.cM(),this.$ti.h("ed<1>"))},
A(a,b){return this.a.L(0,b)}}
A.ed.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.b(A.a5(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$ia9:1}
A.cs.prototype={
gE(a){var s=this,r=new A.ct(s,s.r,A.B(s).h("ct<1>"))
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
return this.al(s[this.bO(a)],a)>=0},
m(a,b){var s,r,q=this
A.B(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.cJ(s==null?q.b=A.nW():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.cJ(r==null?q.c=A.nW():r,b)}else return q.es(0,b)},
es(a,b){var s,r,q,p=this
A.B(p).c.a(b)
s=p.d
if(s==null)s=p.d=A.nW()
r=p.bO(b)
q=s[r]
if(q==null)s[r]=[p.bM(b)]
else{if(p.al(q,b)>=0)return!1
q.push(p.bM(b))}return!0},
B(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bk(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bk(s.c,b)
else return s.bZ(0,b)},
bZ(a,b){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.bO(b)
r=n[s]
q=o.al(r,b)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.d3(p)
return!0},
cJ(a,b){A.B(this).c.a(b)
if(t.g.a(a[b])!=null)return!1
a[b]=this.bM(b)
return!0},
bk(a,b){var s
if(a==null)return!1
s=t.g.a(a[b])
if(s==null)return!1
this.d3(s)
delete a[b]
return!0},
cK(){this.r=this.r+1&1073741823},
bM(a){var s,r=this,q=new A.hr(A.B(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.cK()
return q},
d3(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.cK()},
bO(a){return J.cC(a)&1073741823},
al(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.l(a[r].a,b))return r
return-1}}
A.hr.prototype={}
A.ct.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.b(A.a5(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.h("1?").a(r.a)
s.c=r.b
return!0}},
$ia9:1}
A.e_.prototype={
gj(a){return this.a.length},
i(a,b){var s
A.K(b)
s=this.a
if(!(b>=0&&b<s.length))return A.e(s,b)
return s[b]}}
A.lA.prototype={
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
gC(a){if(this.gj(a)===0)throw A.b(A.dx())
return this.i(a,0)},
A(a,b){var s,r=this.gj(a)
for(s=0;s<r;++s){if(J.l(this.i(a,s),b))return!0
if(r!==this.gj(a))throw A.b(A.a5(a))}return!1},
dN(a,b){return new A.cm(a,b.h("cm<0>"))},
ap(a,b,c){var s=A.au(a)
return new A.a0(a,s.J(c).h("1(k.E)").a(b),s.h("@<k.E>").J(c).h("a0<1,2>"))},
aD(a,b){var s,r,q,p,o=this
if(o.gD(a)){s=J.nD(0,A.au(a).h("k.E"))
return s}r=o.i(a,0)
q=A.dH(o.gj(a),r,!0,A.au(a).h("k.E"))
for(p=1;p<o.gj(a);++p)B.b.k(q,p,o.i(a,p))
return q},
ar(a){return this.aD(a,!0)},
fE(a,b,c,d){var s
A.au(a).h("k.E?").a(d)
A.cT(b,c,this.gj(a))
for(s=b;s<c;++s)this.k(a,s,d)},
bH(a,b,c,d,e){var s,r,q
A.au(a).h("f<k.E>").a(d)
A.cT(b,c,this.gj(a))
s=c-b
if(s===0)return
A.dU(e,"skipCount")
r=J.z(d)
if(e+s>r.gj(d))throw A.b(A.N("Too few elements"))
if(e<b)for(q=s-1;q>=0;--q)this.k(a,b+q,r.i(d,e+q))
else for(q=0;q<s;++q)this.k(a,b+q,r.i(d,e+q))},
l(a){return A.nC(a,"[","]")},
$in:1,
$if:1,
$io:1}
A.E.prototype={
q(a,b){var s,r,q,p=A.au(a)
p.h("~(E.K,E.V)").a(b)
for(s=J.b_(this.gG(a)),p=p.h("E.V");s.p();){r=s.gt(s)
q=this.i(a,r)
b.$2(r,q==null?p.a(q):q)}},
gaw(a){return J.cD(this.gG(a),new A.lB(a),A.au(a).h("am<E.K,E.V>"))},
L(a,b){return J.ns(this.gG(a),b)},
gj(a){return J.a8(this.gG(a))},
gD(a){return J.im(this.gG(a))},
gS(a){return J.nv(this.gG(a))},
l(a){return A.nH(a)},
$it:1}
A.lB.prototype={
$1(a){var s=this.a,r=A.au(s)
r.h("E.K").a(a)
s=J.m(s,a)
if(s==null)s=r.h("E.V").a(s)
return new A.am(a,s,r.h("am<E.K,E.V>"))},
$S(){return A.au(this.a).h("am<E.K,E.V>(E.K)")}}
A.lC.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.h(a)
r.a=(r.a+=s)+": "
s=A.h(b)
r.a+=s},
$S:27}
A.cZ.prototype={}
A.aA.prototype={
k(a,b,c){var s=A.B(this)
s.h("aA.K").a(b)
s.h("aA.V").a(c)
throw A.b(A.P("Cannot modify unmodifiable map"))},
B(a,b){throw A.b(A.P("Cannot modify unmodifiable map"))}}
A.cP.prototype={
i(a,b){return J.m(this.a,b)},
k(a,b,c){var s=A.B(this)
J.bm(this.a,s.c.a(b),s.y[1].a(c))},
L(a,b){return J.nt(this.a,b)},
q(a,b){J.nu(this.a,A.B(this).h("~(1,2)").a(b))},
gD(a){return J.im(this.a)},
gS(a){return J.nv(this.a)},
gj(a){return J.a8(this.a)},
gG(a){return J.qQ(this.a)},
B(a,b){return J.qX(this.a,b)},
l(a){return J.M(this.a)},
gaw(a){return J.qP(this.a)},
$it:1}
A.bZ.prototype={}
A.as.prototype={
gD(a){return this.gj(this)===0},
gS(a){return this.gj(this)!==0},
T(a,b){var s
for(s=J.b_(A.B(this).h("f<as.E>").a(b));s.p();)this.m(0,s.gt(s))},
by(a){var s
for(s=0;s<5;++s)this.B(0,a[s])},
ap(a,b,c){var s=A.B(this)
return new A.bu(this,s.J(c).h("1(as.E)").a(b),s.h("@<as.E>").J(c).h("bu<1,2>"))},
l(a){return A.nC(this,"{","}")},
Z(a,b){var s,r,q,p,o=this.gE(this)
if(!o.p())return""
s=o.d
r=J.M(s==null?o.$ti.c.a(s):s)
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
A.dU(b,"index")
s=this.gE(this)
for(r=b;s.p();){if(r===0){q=s.d
return q==null?s.$ti.c.a(q):q}--r}throw A.b(A.a6(b,b-r,this,null,"index"))},
$in:1,
$if:1,
$ib2:1}
A.el.prototype={}
A.d7.prototype={}
A.hn.prototype={
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
return new A.cg(s,A.B(s).h("cg<1>"))}return new A.ho(this)},
k(a,b,c){var s,r,q=this
if(q.b==null)q.c.k(0,b,c)
else if(q.L(0,b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.d6().k(0,b,c)},
L(a,b){if(this.b==null)return this.c.L(0,b)
return Object.prototype.hasOwnProperty.call(this.a,b)},
B(a,b){if(this.b!=null&&!this.L(0,b))return null
return this.d6().B(0,b)},
q(a,b){var s,r,q,p,o=this
t.u.a(b)
if(o.b==null)return o.c.q(0,b)
s=o.aW()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.mV(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.b(A.a5(o))}},
aW(){var s=t.lH.a(this.c)
if(s==null)s=this.c=A.D(Object.keys(this.a),t.s)
return s},
d6(){var s,r,q,p,o,n=this
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
s=A.mV(this.a[a])
return this.b[a]=s}}
A.ho.prototype={
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
A.mO.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:28}
A.mN.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:28}
A.dh.prototype={
du(a3,a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a1="Invalid base64 encoding length ",a2=a4.length
a6=A.cT(a5,a6,a2)
s=$.on()
for(r=s.length,q=a5,p=q,o=null,n=-1,m=-1,l=0;q<a6;q=k){k=q+1
if(!(q<a2))return A.e(a4,q)
j=a4.charCodeAt(q)
if(j===37){i=k+2
if(i<=a6){if(!(k<a2))return A.e(a4,k)
h=A.n7(a4.charCodeAt(k))
g=k+1
if(!(g<a2))return A.e(a4,g)
f=A.n7(a4.charCodeAt(g))
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
else{b=B.e.aP(r-1,4)+1
if(b===1)throw A.b(A.a2(a1,a4,a6))
while(b<4){a2+="="
o.a=a2;++b}}a2=o.a
return B.a.aB(a4,a5,a6,a2.charCodeAt(0)==0?a2:a2)}a=a6-a5
if(n>=0)A.ou(a4,m,a6,n,l,a)
else{b=B.e.aP(a,4)
if(b===1)throw A.b(A.a2(a1,a4,a6))
if(b>1)a4=B.a.aB(a4,a6,a6,b===2?"==":"=")}return a4},
dt(a,b){return this.du(0,b,0,null)}}
A.eR.prototype={}
A.km.prototype={
b4(a){var s,r,q,p=A.cT(0,null,a.length)
if(0===p)return new Uint8Array(0)
s=new A.ma()
r=s.fz(0,a,0,p)
r.toString
q=s.a
if(q<-1)A.bK(A.a2("Missing padding character",a,p))
if(q>0)A.bK(A.a2("Invalid length, must be multiple of four",a,p))
s.a=-1
return r}}
A.ma.prototype={
fz(a,b,c,d){var s,r=this,q=r.a
if(q<0){r.a=A.pd(b,c,d,q)
return null}if(c===d)return new Uint8Array(0)
s=A.rO(b,c,d,q)
r.a=A.rQ(b,c,d,s,0,r.a)
return s}}
A.c8.prototype={}
A.eX.prototype={}
A.f5.prototype={}
A.dB.prototype={
l(a){var s=A.bv(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.fh.prototype={
l(a){return"Cyclic error in JSON stringify"}}
A.fg.prototype={
M(a,b){var s=A.u9(b,this.gfB().a)
return s},
V(a){var s=A.rY(a,this.gfC().b,null)
return s},
gfC(){return B.ag},
gfB(){return B.af}}
A.ly.prototype={}
A.lx.prototype={}
A.mx.prototype={
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
bL(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.b(new A.fh(a,null))}B.b.m(s,a)},
bE(a){var s,r,q,p,o=this
if(o.dO(a))return
o.bL(a)
try{s=o.b.$1(a)
if(!o.dO(s)){q=A.oL(a,null,o.gcT())
throw A.b(q)}q=o.a
if(0>=q.length)return A.e(q,-1)
q.pop()}catch(p){r=A.al(p)
q=A.oL(a,r,o.gcT())
throw A.b(q)}},
dO(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.d.l(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.dP(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.bL(a)
q.hb(a)
s=q.a
if(0>=s.length)return A.e(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.bL(a)
r=q.hc(a)
s=q.a
if(0>=s.length)return A.e(s,-1)
s.pop()
return r}else return!1},
hb(a){var s,r,q=this.c
q.a+="["
s=J.z(a)
if(s.gS(a)){this.bE(s.i(a,0))
for(r=1;r<s.gj(a);++r){q.a+=","
this.bE(s.i(a,r))}}q.a+="]"},
hc(a){var s,r,q,p,o,n=this,m={},l=J.z(a)
if(l.gD(a)){n.c.a+="{}"
return!0}s=l.gj(a)*2
r=A.dH(s,null,!1,t.X)
q=m.a=0
m.b=!0
l.q(a,new A.my(m,r))
if(!m.b)return!1
l=n.c
l.a+="{"
for(p='"';q<s;q+=2,p=',"'){l.a+=p
n.dP(A.w(r[q]))
l.a+='":'
o=q+1
if(!(o<s))return A.e(r,o)
n.bE(r[o])}l.a+="}"
return!0}}
A.my.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.b.k(s,r.a++,a)
B.b.k(s,r.a++,b)},
$S:27}
A.mw.prototype={
gcT(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.fY.prototype={
M(a,b){t.L.a(b)
return B.aD.b4(b)}}
A.m4.prototype={
b4(a){return new A.mM(this.a).eJ(t.L.a(a),0,null,!0)}}
A.mM.prototype={
eJ(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(a)
s=A.cT(b,c,J.a8(a))
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.tu(a,b,s)
s-=b
p=b
b=0}if(s-b>=15){o=l.a
n=A.tt(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.bP(q,b,s,!0)
o=l.b
if((o&1)!==0){m=A.tv(o)
l.b=0
throw A.b(A.a2(m,a,p+l.c))}return n},
bP(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.e.aa(b+c,2)
r=q.bP(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.bP(a,s,c,d)}return q.fA(a,b,c,d)},
fA(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.at(""),d=b+1,c=a.length
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
e.a+=p}else{p=A.p3(a,d,n)
e.a+=p}if(n===a0)break A
d=o}else d=o}if(a1&&g>32)if(r){c=A.a7(h)
e.a+=c}else{k.b=77
k.c=a0
return""}k.b=g
k.c=f
c=e.a
return c.charCodeAt(0)==0?c:c}}
A.lF.prototype={
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
A.lg.prototype={
$0(){var s=this
return A.bK(A.b7("("+s.a+", "+s.b+", "+s.c+", "+s.d+", "+s.e+", "+s.f+", "+s.r+", "+s.w+")",null))},
$S:63}
A.ad.prototype={
a_(a,b){if(b==null)return!1
return b instanceof A.ad&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gH(a){return A.nI(this.a,this.b,B.q,B.q)},
a3(a,b){var s
t.cs.a(b)
s=B.e.a3(this.a,b.a)
if(s!==0)return s
return B.e.a3(this.b,b.b)},
a1(){var s=this
if(s.c)return s
return new A.ad(s.a,s.b,!0)},
l(a){var s=this,r=A.oC(A.cR(s)),q=A.bt(A.lM(s)),p=A.bt(A.oV(s)),o=A.bt(A.nJ(s)),n=A.bt(A.nK(s)),m=A.bt(A.oX(s)),l=A.lh(A.oW(s)),k=s.b,j=k===0?"":A.lh(k)
k=r+"-"+q
if(s.c)return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j},
a6(){var s=this,r=A.cR(s)>=-9999&&A.cR(s)<=9999?A.oC(A.cR(s)):A.rc(A.cR(s)),q=A.bt(A.lM(s)),p=A.bt(A.oV(s)),o=A.bt(A.nJ(s)),n=A.bt(A.nK(s)),m=A.bt(A.oX(s)),l=A.lh(A.oW(s)),k=s.b,j=k===0?"":A.lh(k)
k=r+"-"+q
if(s.c)return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j}}
A.li.prototype={
$1(a){if(a==null)return 0
return A.eG(a)},
$S:33}
A.lj.prototype={
$1(a){var s,r,q
if(a==null)return 0
for(s=a.length,r=0,q=0;q<6;++q){r*=10
if(q<s){if(!(q<s))return A.e(a,q)
r+=a.charCodeAt(q)^48}}return r},
$S:33}
A.b0.prototype={
aE(a,b){return new A.b0(B.e.aC(this.a*b))},
bc(a,b){return B.e.bc(this.a,t.jS.a(b).ghf())},
a_(a,b){if(b==null)return!1
return b instanceof A.b0&&this.a===b.a},
gH(a){return B.e.gH(this.a)},
l(a){var s,r,q,p,o,n=this.a,m=B.e.aa(n,36e8),l=n%36e8
if(n<0){m=0-m
n=0-l
s="-"}else{n=l
s=""}r=B.e.aa(n,6e7)
n%=6e7
q=r<10?"0":""
p=B.e.aa(n,1e6)
o=p<10?"0":""
return s+m+":"+q+r+":"+o+p+"."+B.a.b7(B.e.l(n%1e6),6,"0")}}
A.a_.prototype={
gaR(){return A.ry(this)}}
A.eL.prototype={
l(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.bv(s)
return"Assertion failed"}}
A.bA.prototype={}
A.b6.prototype={
gbR(){return"Invalid argument"+(!this.a?"(s)":"")},
gbQ(){return""},
l(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.h(p),n=s.gbR()+q+o
if(!s.a)return n
return n+s.gbQ()+": "+A.bv(s.gcf())},
gcf(){return this.b}}
A.cS.prototype={
gcf(){return A.o4(this.b)},
gbR(){return"RangeError"},
gbQ(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.h(q):""
else if(q==null)s=": Not greater than or equal to "+A.h(r)
else if(q>r)s=": Not in inclusive range "+A.h(r)+".."+A.h(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.h(r)
return s}}
A.f9.prototype={
gcf(){return A.K(this.b)},
gbR(){return"RangeError"},
gbQ(){if(A.K(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gj(a){return this.f}}
A.fv.prototype={
l(a){var s,r,q,p,o,n,m,l,k=this,j={},i=new A.at("")
j.a=""
s=k.c
for(r=s.length,q=0,p="",o="";q<r;++q,o=", "){n=s[q]
i.a=p+o
p=A.bv(n)
p=i.a+=p
j.a=", "}k.d.q(0,new A.lF(j,i))
m=A.bv(k.a)
l=i.l(0)
return"NoSuchMethodError: method not found: '"+k.b.a+"'\nReceiver: "+m+"\nArguments: ["+l+"]"}}
A.e0.prototype={
l(a){return"Unsupported operation: "+this.a}}
A.fT.prototype={
l(a){var s=this.a
return s!=null?"UnimplementedError: "+s:"UnimplementedError"}}
A.bp.prototype={
l(a){return"Bad state: "+this.a}}
A.eW.prototype={
l(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.bv(s)+"."}}
A.fy.prototype={
l(a){return"Out of Memory"},
gaR(){return null},
$ia_:1}
A.dW.prototype={
l(a){return"Stack Overflow"},
gaR(){return null},
$ia_:1}
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
k=""}return g+l+B.a.n(e,i,j)+k+"\n"+B.a.aE(" ",f-i+l.length)+"^\n"}else return f!=null?g+(" (at offset "+A.h(f)+")"):g}}
A.f.prototype={
ap(a,b,c){var s=A.B(this)
return A.rr(this,s.J(c).h("1(f.E)").a(b),s.h("f.E"),c)},
bD(a,b){var s=A.B(this)
return new A.I(this,s.h("H(f.E)").a(b),s.h("I<f.E>"))},
A(a,b){var s
for(s=this.gE(this);s.p();)if(J.l(s.gt(s),b))return!0
return!1},
ab(a,b){var s
A.B(this).h("H(f.E)").a(b)
for(s=this.gE(this);s.p();)if(b.$1(s.gt(s)))return!0
return!1},
aD(a,b){var s=A.a4(this,A.B(this).h("f.E"))
return s},
ar(a){return this.aD(0,!0)},
gj(a){var s,r=this.gE(this)
for(s=0;r.p();)++s
return s},
gD(a){return!this.gE(this).p()},
gS(a){return!this.gD(this)},
gaF(a){var s,r=this.gE(this)
if(!r.p())throw A.b(A.dx())
s=r.gt(r)
if(r.p())throw A.b(A.rj())
return s},
v(a,b){var s,r
A.dU(b,"index")
s=this.gE(this)
for(r=b;s.p();){if(r===0)return s.gt(s);--r}throw A.b(A.a6(b,b-r,this,null,"index"))},
l(a){return A.rk(this,"(",")")}}
A.am.prototype={
l(a){return"MapEntry("+A.h(this.a)+": "+A.h(this.b)+")"}}
A.aa.prototype={
gH(a){return A.F.prototype.gH.call(this,0)},
l(a){return"null"}}
A.F.prototype={$iF:1,
a_(a,b){return this===b},
gH(a){return A.dR(this)},
l(a){return"Instance of '"+A.dS(this)+"'"},
ds(a,b){throw A.b(A.oT(this,t.bg.a(b)))},
gW(a){return A.uA(this)},
toString(){return this.l(this)}}
A.hP.prototype={
l(a){return""},
$ibf:1}
A.at.prototype={
gj(a){return this.a.length},
l(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$irE:1}
A.m3.prototype={
$2(a,b){var s,r,q,p
t.k.a(a)
A.w(b)
s=B.a.dk(b,"=")
if(s===-1){if(b!=="")J.bm(a,A.o2(b,0,b.length,this.a,!0),"")}else if(s!==0){r=B.a.n(b,0,s)
q=B.a.Y(b,s+1)
p=this.a
J.bm(a,A.o2(r,0,r.length,p,!0),A.o2(q,0,q.length,p,!0))}return a},
$S:65}
A.m2.prototype={
$2(a,b){throw A.b(A.a2("Illegal IPv6 address, "+a,this.a,b))},
$S:66}
A.ex.prototype={
gcZ(){var s,r,q,p,o=this,n=o.w
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
if(q===$){s=B.a.gH(r.gcZ())
r.y!==$&&A.qd()
r.y=s
q=s}return q},
gaA(){var s,r=this,q=r.z
if(q===$){s=r.f
s=A.pb(s==null?"":s)
r.z!==$&&A.qd()
q=r.z=new A.bZ(s,t.ph)}return q},
gcp(){return this.b},
gbt(a){var s=this.c
if(s==null)return""
if(B.a.O(s,"[")&&!B.a.R(s,"v",1))return B.a.n(s,1,s.length-1)
return s},
gb8(a){var s=this.d
return s==null?A.pv(this.a):s},
gaK(a){var s=this.f
return s==null?"":s},
gbr(){var s=this.r
return s==null?"":s},
fN(a){var s=this.a
if(a.length!==s.length)return!1
return A.tE(a,s,0)>=0},
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
return A.i_(b,r,p,q,m,l.f,l.r)},
cR(a,b){var s,r,q,p,o,n,m,l,k
for(s=0,r=0;B.a.R(b,"../",r);){r+=3;++s}q=B.a.fP(a,"/")
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
q=o}return B.a.aB(a,q+1,null,B.a.Y(b,r-3*s))},
dD(a){return this.ba(A.cl(a))},
ba(a){var s,r,q,p,o,n,m,l,k,j,i,h=this
if(a.gaQ().length!==0)return a
else{s=h.a
if(a.gca()){r=a.dB(0,s)
return r}else{q=h.b
p=h.c
o=h.d
n=h.e
if(a.gdj())m=a.gbs()?a.gaK(a):h.f
else{l=A.ts(h,n)
if(l>0){k=B.a.n(n,0,l)
n=a.gc9()?k+A.d9(a.gaf(a)):k+A.d9(h.cR(B.a.Y(n,k.length),a.gaf(a)))}else if(a.gc9())n=A.d9(a.gaf(a))
else if(n.length===0)if(p==null)n=s.length===0?a.gaf(a):A.d9(a.gaf(a))
else n=A.d9("/"+a.gaf(a))
else{j=h.cR(n,a.gaf(a))
r=s.length===0
if(!r||p!=null||B.a.O(n,"/"))n=A.d9(j)
else n=A.pA(j,!r||p!=null)}m=a.gbs()?a.gaK(a):null}}}i=a.gcc()?a.gbr():null
return A.i_(s,q,p,o,n,m,i)},
gca(){return this.c!=null},
gbs(){return this.f!=null},
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
l(a){return this.gcZ()},
a_(a,b){var s,r,q,p=this
if(b==null)return!1
if(p===b)return!0
s=!1
if(t.jJ.b(b))if(p.a===b.gaQ())if(p.c!=null===b.gca())if(p.b===b.gcp())if(p.gbt(0)===b.gbt(b))if(p.gb8(0)===b.gb8(b))if(p.e===b.gaf(b)){r=p.f
q=r==null
if(!q===b.gbs()){if(q)r=""
if(r===b.gaK(b)){r=p.r
q=r==null
if(!q===b.gcc()){s=q?"":r
s=s===b.gbr()}}}}return s},
$ifV:1,
gaQ(){return this.a},
gaf(a){return this.e}}
A.m1.prototype={
gdM(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.e(m,0)
s=o.a
m=m[0]+1
r=B.a.bu(s,"?",m)
q=s.length
if(r>=0){p=A.ey(s,r+1,q,256,!1,!1)
q=r}else p=n
m=o.c=new A.h9("data","",n,n,A.ey(s,m,q,128,!1,!1),p,n)}return m},
l(a){var s,r=this.b
if(0>=r.length)return A.e(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.b3.prototype={
gca(){return this.c>0},
gcd(){return this.c>0&&this.d+1<this.e},
gbs(){return this.f<this.r},
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
gbt(a){var s=this.c
return s>0?B.a.n(this.a,s,this.d):""},
gb8(a){var s,r=this
if(r.gcd())return A.eG(B.a.n(r.a,r.d+1,r.e))
s=r.b
if(s===4&&B.a.O(r.a,"http"))return 80
if(s===5&&B.a.O(r.a,"https"))return 443
return 0},
gaf(a){return B.a.n(this.a,this.e,this.f)},
gaK(a){var s=this.f,r=this.r
return s<r?B.a.n(this.a,s+1,r):""},
gbr(){var s=this.r,r=this.a
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
gaA(){if(this.f>=this.r)return B.al
return new A.bZ(A.pb(this.gaK(0)),t.ph)},
cP(a){var s=this.d+1
return s+a.length===this.e&&B.a.R(this.a,a,s)},
h1(){var s=this,r=s.r,q=s.a
if(r>=q.length)return s
return new A.b3(B.a.n(q,0,r),s.b,s.c,s.d,s.e,s.f,r,s.w)},
dB(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=null
b=A.o0(b,0,b.length)
s=!(h.b===b.length&&B.a.O(h.a,b))
r=b==="file"
q=h.c
p=q>0?B.a.n(h.a,h.b+3,q):""
o=h.gcd()?h.gb8(0):g
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
return A.i_(b,p,n,o,l,j,i)},
dD(a){return this.ba(A.cl(a))},
ba(a){if(a instanceof A.b3)return this.fa(this,a)
return this.d1().ba(a)},
fa(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=b.b
if(c>0)return b
s=b.c
if(s>0){r=a.b
if(r<=0)return b
q=r===4
if(q&&B.a.O(a.a,"file"))p=b.e!==b.f
else if(q&&B.a.O(a.a,"http"))p=!b.cP("80")
else p=!(r===5&&B.a.O(a.a,"https"))||!b.cP("443")
if(p){o=r+1
return new A.b3(B.a.n(a.a,0,o)+B.a.Y(b.a,c+1),r,s+o,b.d+o,b.e+o,b.f+o,b.r+o,a.w)}else return this.d1().ba(b)}n=b.e
c=b.f
if(n===c){s=b.r
if(c<s){r=a.f
o=r-c
return new A.b3(B.a.n(a.a,0,r)+B.a.Y(b.a,c),a.b,a.c,a.d,a.e,c+o,s+o,a.w)}c=b.a
if(s<c.length){r=a.r
return new A.b3(B.a.n(a.a,0,r)+B.a.Y(c,s),a.b,a.c,a.d,a.e,a.f,s+(r-s),a.w)}return a.h1()}s=b.a
if(B.a.R(s,"/",n)){m=a.e
l=A.pn(this)
k=l>0?l:m
o=k-n
return new A.b3(B.a.n(a.a,0,k)+B.a.Y(s,n),a.b,a.c,a.d,m,c+o,b.r+o,a.w)}j=a.e
i=a.f
if(j===i&&a.c>0){while(B.a.R(s,"../",n))n+=3
o=j-n+1
return new A.b3(B.a.n(a.a,0,j)+"/"+B.a.Y(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)}h=a.a
l=A.pn(this)
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
d1(){var s=this,r=null,q=s.gaQ(),p=s.gcp(),o=s.c>0?s.gbt(0):r,n=s.gcd()?s.gb8(0):r,m=s.a,l=s.f,k=B.a.n(m,s.e,l),j=s.r
l=l<j?s.gaK(0):r
return A.i_(q,p,o,n,k,l,j<m.length?s.gbr():r)},
l(a){return this.a},
$ifV:1}
A.h9.prototype={}
A.q.prototype={$iq:1}
A.eJ.prototype={
gj(a){return a.length}}
A.cE.prototype={
sfI(a,b){a.href=b},
l(a){var s=String(a)
s.toString
return s},
$icE:1}
A.eK.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.cF.prototype={$icF:1}
A.bM.prototype={$ibM:1}
A.c7.prototype={$ic7:1}
A.bN.prototype={$ibN:1}
A.bn.prototype={
gj(a){return a.length}}
A.eZ.prototype={
gj(a){return a.length}}
A.Y.prototype={$iY:1}
A.c9.prototype={
bK(a,b){var s=$.qg(),r=s[b]
if(typeof r=="string")return r
r=this.fd(a,b)
s[b]=r
return r},
fd(a,b){var s,r=b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()})
r.toString
r=r in a
r.toString
if(r)return b
s=$.qj()+b
r=s in a
r.toString
if(r)return s
return b},
c2(a,b,c,d){a.setProperty(b,c,d)},
gj(a){var s=a.length
s.toString
return s}}
A.kq.prototype={}
A.aC.prototype={}
A.b9.prototype={}
A.f_.prototype={
gj(a){return a.length}}
A.f0.prototype={
gj(a){return a.length}}
A.f1.prototype={
gj(a){return a.length},
i(a,b){var s=a[A.K(b)]
s.toString
return s}}
A.dk.prototype={}
A.ca.prototype={}
A.f2.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.dl.prototype={
fw(a,b){var s=a.createHTMLDocument(b)
s.toString
return s}}
A.dm.prototype={
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
$iL:1,
$if:1,
$io:1}
A.dn.prototype={
l(a){var s,r=a.left
r.toString
s=a.top
s.toString
return"Rectangle ("+A.h(r)+", "+A.h(s)+") "+A.h(this.gaN(a))+" x "+A.h(this.gaJ(a))},
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
s=this.gaN(a)===s.gaN(b)&&this.gaJ(a)===s.gaJ(b)}}}return s},
gH(a){var s,r=a.left
r.toString
s=a.top
s.toString
return A.nI(r,s,this.gaN(a),this.gaJ(a))},
gcO(a){return a.height},
gaJ(a){var s=this.gcO(a)
s.toString
return s},
gd7(a){return a.width},
gaN(a){var s=this.gd7(a)
s.toString
return s},
$ibd:1}
A.f3.prototype={
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
$iL:1,
$if:1,
$io:1}
A.f4.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.h3.prototype={
A(a,b){return J.ns(this.b,b)},
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
a0(a){J.ik(this.a)},
gC(a){return A.rS(this.a)}}
A.bi.prototype={
gj(a){return this.a.length},
i(a,b){var s
A.K(b)
s=this.a
if(!(b>=0&&b<s.length))return A.e(s,b)
return this.$ti.c.a(s[b])},
k(a,b,c){this.$ti.c.a(c)
throw A.b(A.P("Cannot modify list"))},
gC(a){return this.$ti.c.a(B.an.gC(this.a))}}
A.C.prototype={
gfo(a){return new A.e9(a)},
gde(a){var s=a.children
s.toString
return new A.h3(a,s)},
gan(a){return new A.he(a)},
l(a){var s=a.localName
s.toString
return s},
a4(a,b,c,d){var s,r,q,p
if(c==null){s=$.oE
if(s==null){s=A.D([],t.lN)
r=new A.dO(s)
B.b.m(s,A.ph(null))
B.b.m(s,A.pq())
$.oE=r
d=r}else d=s
s=$.oD
if(s==null){d.toString
s=new A.ez(d)
$.oD=s
c=s}else{d.toString
s.a=d
c=s}}if($.bP==null){s=document
r=s.implementation
r.toString
r=B.a3.fw(r,"")
$.bP=r
r=r.createRange()
r.toString
$.nz=r
r=$.bP.createElement("base")
t.az.a(r)
s=s.baseURI
s.toString
r.href=s
$.bP.head.appendChild(r).toString}s=$.bP
if(s.body==null){r=s.createElement("body")
B.E.sfq(s,t.hp.a(r))}s=$.bP
if(t.hp.b(a)){s=s.body
s.toString
q=s}else{s.toString
r=a.tagName
r.toString
q=s.createElement(r)
$.bP.body.appendChild(q).toString}s="createContextualFragment" in window.Range.prototype
s.toString
if(s){s=a.tagName
s.toString
s=!B.b.A(B.ai,s)}else s=!1
if(s){$.nz.selectNodeContents(q)
s=$.nz
s=s.createContextualFragment(b)
s.toString
p=s}else{J.r_(q,b)
s=$.bP.createDocumentFragment()
s.toString
while(r=q.firstChild,r!=null)s.appendChild(r).toString
p=s}if(q!==$.bP.body)J.io(q)
c.cu(p)
document.adoptNode(p).toString
return p},
fv(a,b,c){return this.a4(a,b,c,null)},
sP(a,b){this.bG(a,b)},
bG(a,b){this.sU(a,null)
a.appendChild(this.a4(a,b,null,null)).toString},
sh7(a,b){a.title=b},
seO(a,b){a.innerHTML=b},
eV(a,b){var s=a.querySelectorAll(b)
s.toString
return s},
gaz(a){return new A.cn(a,"click",!1,t.C)},
$iC:1}
A.ll.prototype={
$1(a){return t.h.b(t.F.a(a))},
$S:23}
A.p.prototype={
eM(a,b,c,d){return a.initEvent(b,!0,!0)},
$ip:1}
A.dq.prototype={$idq:1}
A.d.prototype={
bn(a,b,c,d){t.B.a(c)
if(c!=null)this.ew(a,b,c,d)},
c4(a,b,c){return this.bn(a,b,c,null)},
ew(a,b,c,d){return a.addEventListener(b,A.bH(t.B.a(c),1),d)},
eY(a,b,c,d){return a.removeEventListener(b,A.bH(t.B.a(c),1),!1)},
$id:1}
A.aI.prototype={$iaI:1}
A.ds.prototype={
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
$iL:1,
$if:1,
$io:1}
A.dt.prototype={
gh5(a){var s=a.result
if(t.lo.b(s))return A.oS(s,0,null)
return s},
fZ(a,b){return a.readAsDataURL(b)}}
A.f6.prototype={
gj(a){return a.length}}
A.cI.prototype={
gj(a){return a.length},
$icI:1}
A.aJ.prototype={$iaJ:1}
A.du.prototype={}
A.f8.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.bQ.prototype={
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
$iL:1,
$if:1,
$io:1,
$ibQ:1}
A.dv.prototype={
sfq(a,b){a.body=b}}
A.bw.prototype={
fW(a,b,c){return a.open(b,c)},
e5(a,b){return a.send(b)},
cw(a,b,c){return a.setRequestHeader(A.w(b),A.w(c))},
$ibw:1}
A.cd.prototype={}
A.cJ.prototype={$icJ:1}
A.dw.prototype={
sfj(a,b){a.alt=b},
scC(a,b){a.src=b}}
A.bR.prototype={
sdd(a,b){a.checked=b},
sco(a,b){a.type=b},
sI(a,b){a.value=b},
$ibR:1,
$ioz:1,
$icH:1}
A.cO.prototype={
l(a){var s=String(a)
s.toString
return s},
$icO:1}
A.fj.prototype={
gj(a){return a.length}}
A.fk.prototype={
bn(a,b,c,d){t.B.a(c)
if(b==="message")a.start()
this.ea(a,b,c,!1)}}
A.fl.prototype={
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
gG(a){var s=A.D([],t.s)
this.q(a,new A.lD(s))
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
A.lD.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.fm.prototype={
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
gG(a){var s=A.D([],t.s)
this.q(a,new A.lE(s))
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
A.lE.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.aK.prototype={$iaK:1}
A.fn.prototype={
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
$iL:1,
$if:1,
$io:1}
A.aw.prototype={$iaw:1}
A.az.prototype={
gC(a){var s=this.a.firstChild
if(s==null)throw A.b(A.N("No elements"))
return s},
gaF(a){var s=this.a,r=s.childNodes.length
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
return new A.cb(s,s.length,A.au(s).h("cb<x.E>"))},
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
J.qJ(s,b,a)}catch(q){}return a},
eC(a){var s
while(s=a.firstChild,s!=null)a.removeChild(s).toString},
l(a){var s=a.nodeValue
return s==null?this.eb(a):s},
sU(a,b){a.textContent=b},
fn(a,b){var s=a.appendChild(b)
s.toString
return s},
ft(a,b){var s=a.cloneNode(!0)
s.toString
return s},
A(a,b){var s=a.contains(b)
s.toString
return s},
f0(a,b,c){var s=a.replaceChild(b,c)
s.toString
return s},
$iu:1}
A.cQ.prototype={
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
$iL:1,
$if:1,
$io:1}
A.bz.prototype={$ibz:1}
A.dQ.prototype={}
A.aL.prototype={
gj(a){return a.length},
$iaL:1}
A.fA.prototype={
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
$iL:1,
$if:1,
$io:1}
A.b1.prototype={$ib1:1}
A.fC.prototype={
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
gG(a){var s=A.D([],t.s)
this.q(a,new A.lO(s))
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
A.lO.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.bV.prototype={
gj(a){return a.length},
sI(a,b){a.value=b},
$ibV:1}
A.aN.prototype={$iaN:1}
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
k(a,b,c){t.ls.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$io:1}
A.dV.prototype={}
A.aO.prototype={$iaO:1}
A.fF.prototype={
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
$iL:1,
$if:1,
$io:1}
A.aP.prototype={
gj(a){return a.length},
$iaP:1}
A.dX.prototype={
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
gG(a){var s=A.D([],t.s)
this.q(a,new A.lQ(s))
return s},
gj(a){var s=a.length
s.toString
return s},
gD(a){return a.key(0)==null},
gS(a){return a.key(0)!=null},
$it:1}
A.lQ.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:7}
A.ax.prototype={$iax:1}
A.dZ.prototype={
a4(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bI(a,b,c,d)
s=A.rf("<table>"+b+"</table>",c,d)
r=document.createDocumentFragment()
r.toString
new A.az(r).T(0,new A.az(s))
return r}}
A.fI.prototype={
a4(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bI(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.az(s).T(0,new A.az(new A.az(new A.az(B.O.a4(r,b,c,d)).gaF(0)).gaF(0)))
return s}}
A.fJ.prototype={
a4(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bI(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.az(s).T(0,new A.az(new A.az(B.O.a4(r,b,c,d)).gaF(0)))
return s}}
A.cX.prototype={
bG(a,b){var s,r
this.sU(a,null)
s=a.content
s.toString
J.ik(s)
r=this.a4(a,b,null,null)
a.content.appendChild(r).toString},
$icX:1}
A.ck.prototype={
sI(a,b){a.value=b},
$ick:1}
A.aQ.prototype={$iaQ:1}
A.ay.prototype={$iay:1}
A.fL.prototype={
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
$iL:1,
$if:1,
$io:1}
A.fM.prototype={
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
$iL:1,
$if:1,
$io:1}
A.fN.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.aR.prototype={$iaR:1}
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
k(a,b,c){t.ki.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gC(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.N("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iL:1,
$if:1,
$io:1}
A.fR.prototype={
gj(a){return a.length}}
A.bg.prototype={}
A.fX.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.fZ.prototype={
gj(a){return a.length}}
A.c_.prototype={$ic_:1,$im5:1}
A.br.prototype={$ibr:1}
A.d_.prototype={$id_:1}
A.h5.prototype={
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
$iL:1,
$if:1,
$io:1}
A.e8.prototype={
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
if(r===q.gaN(b)){s=a.height
s.toString
q=s===q.gaJ(b)
s=q}}}}return s},
gH(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return A.nI(p,s,r,q)},
gcO(a){return a.height},
gaJ(a){var s=a.height
s.toString
return s},
gd7(a){return a.width},
gaN(a){var s=a.width
s.toString
return s}}
A.hj.prototype={
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
$iL:1,
$if:1,
$io:1}
A.eg.prototype={
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
$iL:1,
$if:1,
$io:1}
A.hK.prototype={
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
$iL:1,
$if:1,
$io:1}
A.hQ.prototype={
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
$iL:1,
$if:1,
$io:1}
A.h1.prototype={
q(a,b){var s,r,q,p,o,n
t.bm.a(b)
for(s=this.gG(0),r=s.length,q=this.a,p=0;p<s.length;s.length===r||(0,A.aB)(s),++p){o=s[p]
n=q.getAttribute(o)
b.$2(o,n==null?A.w(n):n)}},
gG(a){var s,r,q,p,o,n,m=this.a.attributes
m.toString
s=A.D([],t.s)
for(r=m.length,q=t.nD,p=0;p<r;++p){if(!(p<m.length))return A.e(m,p)
o=q.a(m[p])
if(o.namespaceURI==null){n=o.name
n.toString
B.b.m(s,n)}}return s},
gD(a){return this.gG(0).length===0},
gS(a){return this.gG(0).length!==0}}
A.e9.prototype={
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
A.h8.prototype={
L(a,b){var s=this.a.a.hasAttribute("data-"+this.b1(b))
s.toString
return s},
i(a,b){return this.a.a.getAttribute("data-"+this.b1(A.w(b)))},
k(a,b,c){this.a.a.setAttribute("data-"+this.b1(b),c)},
B(a,b){var s="data-"+this.b1(b),r=this.a.a,q=r.getAttribute(s)
r.removeAttribute(s)
return q},
q(a,b){this.a.q(0,new A.mb(this,t.bm.a(b)))},
gG(a){var s=A.D([],t.s)
this.a.q(0,new A.mc(this,s))
return s},
gj(a){return this.gG(0).length},
gD(a){return this.gG(0).length===0},
gS(a){return this.gG(0).length!==0},
d0(a){var s,r,q=A.D(a.split("-"),t.s)
for(s=1;s<q.length;++s){r=q[s]
if(r.length>0)B.b.k(q,s,r[0].toUpperCase()+B.a.Y(r,1))}return B.b.Z(q,"")},
b1(a){var s,r,q,p,o
for(s=a.length,r=0,q="";r<s;++r){p=a[r]
o=p.toLowerCase()
q=(p!==o&&r>0?q+"-":q)+o}return q.charCodeAt(0)==0?q:q}}
A.mb.prototype={
$2(a,b){if(B.a.O(a,"data-"))this.b.$2(this.a.d0(B.a.Y(a,5)),b)},
$S:7}
A.mc.prototype={
$2(a,b){if(B.a.O(a,"data-"))B.b.m(this.b,this.a.d0(B.a.Y(a,5)))},
$S:7}
A.he.prototype={
a5(){var s,r,q,p,o=A.ch(t.N)
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
by(a){A.rU(this.a,a)}}
A.nA.prototype={}
A.co.prototype={
bw(a,b,c,d){var s=A.B(this)
s.h("~(1)?").a(a)
t.jE.a(c)
return A.A(this.a,this.b,a,!1,s.c)}}
A.cn.prototype={}
A.ea.prototype={
a2(a){var s=this
if(s.b==null)return $.nq()
s.d4()
s.d=s.b=null
return $.nq()},
cg(a){var s,r=this
r.$ti.h("~(1)?").a(a)
if(r.b==null)throw A.b(A.N("Subscription has been canceled."))
r.d4()
s=A.q_(new A.me(a),t.A)
r.d=s
r.d2()},
d2(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.qK(s,this.c,r,!1)}},
d4(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.qI(s,this.c,t.B.a(r),!1)}},
$ibq:1}
A.md.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:3}
A.me.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:3}
A.nT.prototype={}
A.cq.prototype={
el(a){var s
if($.hk.a===0){for(s=0;s<262;++s)$.hk.k(0,B.aj[s],A.uC())
for(s=0;s<12;++s)$.hk.k(0,B.w[s],A.uD())}},
aI(a){return $.qz().A(0,A.dp(a))},
am(a,b,c){var s=$.hk.i(0,A.dp(a)+"::"+b)
if(s==null)s=$.hk.i(0,"*::"+b)
if(s==null)return!1
return A.mR(s.$4(a,b,c,this))},
$ibc:1}
A.x.prototype={
gE(a){return new A.cb(a,this.gj(a),A.au(a).h("cb<x.E>"))}}
A.dO.prototype={
aI(a){return B.b.ab(this.a,new A.lH(a))},
am(a,b,c){return B.b.ab(this.a,new A.lG(a,b,c))},
$ibc:1}
A.lH.prototype={
$1(a){return t.hU.a(a).aI(this.a)},
$S:22}
A.lG.prototype={
$1(a){return t.hU.a(a).am(this.a,this.b,this.c)},
$S:22}
A.em.prototype={
en(a,b,c,d){var s,r,q
this.a.T(0,c)
s=b.bD(0,new A.mE())
r=b.bD(0,new A.mF())
this.b.T(0,s)
q=this.c
q.T(0,B.ah)
q.T(0,r)},
aI(a){return this.a.A(0,A.dp(a))},
am(a,b,c){var s,r=this,q=A.dp(a),p=r.c,o=q+"::"+b
if(p.A(0,o))return r.d.fi(c)
else{s="*::"+b
if(p.A(0,s))return r.d.fi(c)
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
A.hS.prototype={
am(a,b,c){if(this.ej(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.A(0,b)
return!1}}
A.mG.prototype={
$1(a){return"TEMPLATE::"+A.w(a)},
$S:10}
A.hR.prototype={
aI(a){var s
if(t.nZ.b(a))return!1
s=t.bC.b(a)
if(s&&A.dp(a)==="foreignObject")return!1
if(s)return!0
return!1},
am(a,b,c){if(b==="is"||B.a.O(b,"on"))return!1
return this.aI(a)},
$ibc:1}
A.cb.prototype={
p(){var s=this,r=s.c+1,q=s.b
if(r<q){s.d=J.m(s.a,r)
s.c=r
return!0}s.d=null
s.c=q
return!1},
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
$ia9:1}
A.h7.prototype={$ii:1,$id:1,$im5:1}
A.hH.prototype={$irG:1}
A.ez.prototype={
cu(a){var s,r=new A.mQ(this)
do{s=this.b
r.$2(a,null)}while(s!==this.b)},
aZ(a,b){++this.b
if(b==null||b!==a.parentNode)J.io(a)
else b.removeChild(a).toString},
f5(a,b){var s,r,q,p,o,n,m,l=!0,k=null,j=null
try{k=J.qO(a)
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
q=A.dp(a)
this.f4(a,b,l,r,q,t.f.a(k),A.an(j))}catch(n){if(A.al(n) instanceof A.b6)throw n
else{this.aZ(a,b)
window.toString
p=A.h(r)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn("Removing corrupted element "+p)}}},
f4(a,b,c,d,e,f,g){var s,r,q,p,o,n,m,l=this
if(c){l.aZ(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing element due to corrupted attributes on <"+d+">")
return}if(!l.a.aI(a)){l.aZ(a,b)
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
q=A.D(s.slice(0),A.G(s))
for(p=f.gG(0).length-1,s=f.a,r="Removing disallowed attribute <"+e+" ";p>=0;--p){if(!(p<q.length))return A.e(q,p)
o=q[p]
n=l.a
m=J.r2(o)
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
switch(s){case 1:this.f5(a,b)
break
case 8:case 11:case 3:case 4:break
default:this.aZ(a,b)}},
$irt:1}
A.mQ.prototype={
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
$S:43}
A.h6.prototype={}
A.ha.prototype={}
A.hb.prototype={}
A.hc.prototype={}
A.hd.prototype={}
A.hg.prototype={}
A.hh.prototype={}
A.hl.prototype={}
A.hm.prototype={}
A.ht.prototype={}
A.hu.prototype={}
A.hv.prototype={}
A.hw.prototype={}
A.hx.prototype={}
A.hy.prototype={}
A.hC.prototype={}
A.hD.prototype={}
A.hF.prototype={}
A.en.prototype={}
A.eo.prototype={}
A.hI.prototype={}
A.hJ.prototype={}
A.hL.prototype={}
A.hT.prototype={}
A.hU.prototype={}
A.er.prototype={}
A.es.prototype={}
A.hV.prototype={}
A.hW.prototype={}
A.i0.prototype={}
A.i1.prototype={}
A.i2.prototype={}
A.i3.prototype={}
A.i4.prototype={}
A.i5.prototype={}
A.i6.prototype={}
A.i7.prototype={}
A.i8.prototype={}
A.i9.prototype={}
A.eY.prototype={
c3(a){var s=$.qf()
if(s.b.test(a))return a
throw A.b(A.kk(a,"value","Not a valid class token"))},
l(a){return this.a5().Z(0," ")},
gE(a){var s=this.a5()
return A.rZ(s,s.r,A.B(s).c)},
ap(a,b,c){var s,r
c.h("0(c)").a(b)
s=this.a5()
r=A.B(s)
return new A.bu(s,r.J(c).h("1(as.E)").a(b),r.h("@<as.E>").J(c).h("bu<1,2>"))},
gD(a){return this.a5().a===0},
gS(a){return this.a5().a!==0},
gj(a){return this.a5().a},
A(a,b){this.c3(b)
return this.a5().A(0,b)},
m(a,b){var s
A.w(b)
this.c3(b)
s=this.dr(0,new A.ko(b))
return A.mR(s==null?!1:s)},
B(a,b){var s,r
if(typeof b!="string")return!1
this.c3(b)
s=this.a5()
r=s.B(0,b)
this.cq(s)
return r},
by(a){this.dr(0,new A.kp(a))},
v(a,b){return this.a5().v(0,b)},
dr(a,b){var s,r
t.gA.a(b)
s=this.a5()
r=b.$1(s)
this.cq(s)
return r}}
A.ko.prototype={
$1(a){return t.i.a(a).m(0,this.a)},
$S:45}
A.kp.prototype={
$1(a){return t.i.a(a).by(this.a)},
$S:50}
A.f7.prototype={
gbh(){var s=this.b,r=A.B(s)
return new A.aE(new A.I(s,r.h("H(k.E)").a(new A.lm()),r.h("I<k.E>")),r.h("C(k.E)").a(new A.ln()),r.h("aE<k.E,C>"))},
k(a,b,c){var s
t.h.a(c)
s=this.gbh()
J.qY(s.b.$1(J.eH(s.a,b)),c)},
A(a,b){return!1},
a0(a){J.ik(this.b.a)},
gj(a){return J.a8(this.gbh().a)},
i(a,b){var s
A.K(b)
s=this.gbh()
return s.b.$1(J.eH(s.a,b))},
gE(a){var s=A.aU(this.gbh(),!1,t.h)
return new J.b8(s,s.length,A.G(s).h("b8<1>"))}}
A.lm.prototype={
$1(a){return t.h.b(t.F.a(a))},
$S:23}
A.ln.prototype={
$1(a){return t.h.a(t.F.a(a))},
$S:53}
A.cN.prototype={$icN:1}
A.lw.prototype={
$1(a){var s,r,q,p,o=this.a
if(o.L(0,a))return o.i(0,a)
if(t.f.b(a)){s={}
o.k(0,a,s)
for(o=J.J(a),r=J.b_(o.gG(a));r.p();){q=r.gt(r)
s[q]=this.$1(o.i(a,q))}return s}else if(t.R.b(a)){p=[]
o.k(0,a,p)
B.b.T(p,J.cD(a,this,t.z))
return p}else return A.mW(a)},
$S:56}
A.hG.prototype={
dK(a){if(a instanceof A.bo)return a.f3()
return null}}
A.mX.prototype={
$1(a){var s
t.Z.a(a)
s=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(A.tB,a,!1)
A.o6(s,$.ij(),a)
return s},
$S:12}
A.mY.prototype={
$1(a){return new this.a(a)},
$S:12}
A.n2.prototype={
$1(a){var s=a==null?A.aY(a):a
$.np()
return new A.dA(s)},
$S:64}
A.n3.prototype={
$1(a){var s=a==null?A.aY(a):a
$.np()
return new A.cf(s,t.gq)},
$S:67}
A.n4.prototype={
$1(a){var s=a==null?A.aY(a):a
$.np()
return new A.bo(s)},
$S:68}
A.bo.prototype={
i(a,b){if(typeof b!="string"&&typeof b!="number")throw A.b(A.b7("property is not a String or num",null))
return A.o5(this.a[b])},
k(a,b,c){if(typeof b!="string"&&typeof b!="number")throw A.b(A.b7("property is not a String or num",null))
this.a[b]=A.mW(c)},
a_(a,b){if(b==null)return!1
return b instanceof A.bo&&this.a===b.a},
b6(a){return a in this.a},
b2(a,b){var s,r=this.a
if(b==null)s=null
else{s=A.G(b)
s=A.aU(new A.a0(b,s.h("@(1)").a(A.uL()),s.h("a0<1,@>")),!0,t.z)}return A.o5(r[a].apply(r,s))},
l(a){var s,r
try{s=String(this.a)
return s}catch(r){s=this.eh(0)
return s}},
f3(){var s=this.c0(),r=s!=null&&s.length>0?" ("+s+")":""
return"Instance of '"+A.dS(this)+"'"+r},
c0(){return A.ok(this.a,!1,!1)},
gH(a){return 0}}
A.dA.prototype={
c0(){return A.ok(this.a,!1,!0)}}
A.cf.prototype={
cH(a){var s=a<0||a>=this.gj(0)
if(s)throw A.b(A.aj(a,0,this.gj(0),null,null))},
i(a,b){if(A.eC(b))this.cH(b)
return this.$ti.c.a(this.ed(0,b))},
k(a,b,c){if(A.eC(b))this.cH(b)
this.ei(0,b,c)},
gj(a){var s=this.a.length
if(typeof s==="number"&&s>>>0===s)return s
throw A.b(A.N("Bad JsArray length"))},
c0(){return A.ok(this.a,!0,!1)},
$in:1,
$if:1,
$io:1}
A.d3.prototype={
k(a,b,c){return this.ee(0,b,c)}}
A.lI.prototype={
l(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.nc.prototype={
$1(a){var s,r,q,p,o
if(A.pR(a))return a
s=this.a
if(s.L(0,a))return s.i(0,a)
if(t.f.b(a)){r={}
s.k(0,a,r)
for(s=J.J(a),q=J.b_(s.gG(a));q.p();){p=q.gt(q)
r[p]=this.$1(s.i(a,p))}return r}else if(t.R.b(a)){o=[]
s.k(0,a,o)
B.b.T(o,J.cD(a,this,t.z))
return o}else return a},
$S:24}
A.nj.prototype={
$1(a){return this.a.b3(0,this.b.h("0/?").a(a))},
$S:15}
A.nk.prototype={
$1(a){if(a==null)return this.a.bp(new A.lI(a===undefined))
return this.a.bp(a)},
$S:15}
A.mu.prototype={
em(){var s=self.crypto
if(s!=null)if(s.getRandomValues!=null)return
throw A.b(A.P("No source of cryptographically secure random numbers available."))},
fU(a){var s,r,q,p,o,n,m,l
if(a<=0||a>4294967296)throw A.b(A.rB("max must be in range 0 < max \u2264 2^32, was "+a))
if(a>255)if(a>65535)s=a>16777215?4:3
else s=2
else s=1
r=this.a
r.$flags&2&&A.aG(r,11)
r.setUint32(0,0,!1)
q=4-s
p=A.K(Math.pow(256,s))
for(o=a-1,n=(a&o)===0;;){crypto.getRandomValues(J.qM(B.am.gfs(r),q,s))
m=r.getUint32(0,!1)
if(n)return(m&o)>>>0
l=m%a
if(m-l+a<p)return l}}}
A.aS.prototype={$iaS:1}
A.fi.prototype={
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
A.fw.prototype={
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
A.fB.prototype={
gj(a){return a.length}}
A.cV.prototype={$icV:1}
A.fH.prototype={
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
A.eN.prototype={
a5(){var s,r,q,p,o=this.a.getAttribute("class"),n=A.ch(t.N)
if(o==null)return n
for(s=o.split(" "),r=s.length,q=0;q<r;++q){p=B.a.u(s[q])
if(p.length!==0)n.m(0,p)}return n},
cq(a){this.a.setAttribute("class",a.Z(0," "))}}
A.r.prototype={
gan(a){return new A.eN(a)},
gde(a){return new A.f7(a,new A.az(a))},
sP(a,b){this.bG(a,b)},
a4(a,b,c,d){var s,r,q,p=A.D([],t.lN)
B.b.m(p,A.ph(null))
B.b.m(p,A.pq())
B.b.m(p,new A.hR())
c=new A.ez(new A.dO(p))
p=document
s=p.body
s.toString
r=B.z.fv(s,'<svg version="1.1">'+b+"</svg>",c)
p=p.createDocumentFragment()
p.toString
q=new A.az(r).gaF(0)
while(s=q.firstChild,s!=null)p.appendChild(s).toString
return p},
gaz(a){return new A.cn(a,"click",!1,t.C)},
$ir:1}
A.aX.prototype={$iaX:1}
A.fS.prototype={
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
A.hp.prototype={}
A.hq.prototype={}
A.hz.prototype={}
A.hA.prototype={}
A.hN.prototype={}
A.hO.prototype={}
A.hX.prototype={}
A.hY.prototype={}
A.eO.prototype={
gj(a){return a.length}}
A.eP.prototype={
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
gG(a){var s=A.D([],t.s)
this.q(a,new A.kl(s))
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
A.kl.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:11}
A.eQ.prototype={
gj(a){return a.length}}
A.bL.prototype={}
A.fx.prototype={
gj(a){return a.length}}
A.h2.prototype={}
A.nd.prototype={
$1(a){t.A.a(a)
new A.ip().ad()},
$S:18}
A.ip.prototype={
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
g=A.cl(i).gaA().i(0,"role")
f=b.getElementById("web-portal-title")
a=g==="resident"
if(a){if(f!=null)J.v(f,"Resident Portal")
e=t.G.a(b.getElementById("employee-id"))
if(e!=null)e.placeholder="Resident ID, meter ID, contact or unique name"}else{if(f!=null)J.v(f,"Worker Portal")
e=t.G.a(b.getElementById("employee-id"))
if(e!=null)e.placeholder="Enter employee ID"}o=new A.jw()
o.$0()
A.nQ(A.lk(0,0,10),new A.jq(o))
o=b.getElementById("btn-resident-profile-logout")
if(o!=null){o=J.ah(o)
n=o.$ti
A.A(o.a,o.b,n.h("~(1)?").a(new A.jr()),!1,n.c)}o=$.O()
o.sfV(new A.js(q))
n=o.cx
new A.d0(n,A.B(n).h("d0<1>")).fQ(new A.jt(q))
s=2
return A.y(o.ad(),$async$ad)
case 2:q.d5(o.X())
A.nQ(B.a8,new A.ju(q))
A.A(b,A.w(A.oG(b)),t.oV.a(new A.jv(q)),!1,t.A)
p=A.cz()?window.localStorage.getItem("waterhall_session"):null
d=A.cz()?window.localStorage.getItem("waterhall_resident_session"):null
if(a)if(d!=null&&d.length!==0){q.cB(d)
q.av()
q.bj("resident")}else q.b5()
else if(p!=null&&p.length!==0)try{a=A.aq(t.f.a(B.c.M(0,p)),h,t.z)
q.a=a
q.cz(a)
q.av()
q.bj("worker")}catch(a0){a=window.localStorage
a.toString
B.j.B(a,"waterhall_session")
q.b5()}else q.b5()
q.fp()
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
return A.y(i.aL(m.d!=null?"resident":"worker"),$async$aX)
case 6:if(!J.l(l,window.localStorage.getItem("waterhall_jwt"))||!i.N()||J.l(k,i.at)){n=[1]
s=4
break}if(m.d!=null)m.cm()
else{i=m.b
if(i==="view-dashboard")m.bA()
else if(i==="view-directory")m.aM()}if(m.b==="view-announcements")m.dz()
n.push(5)
s=4
break
case 3:n=[2]
case 4:p=2
m.ay=!1
m.eX()
s=n.pop()
break
case 5:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$aX,r)},
d5(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d="btn-review-collections"
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
m=A.pF(n.i(a,"isOnline"))
m=m===!1
j=J.l(n.i(a,"authenticated"),!0)
i=A.o3(n.i(a,"reviewCount"))
if(i==null)i=0
h=r==null
if(!h&&q!=null){g=J.J(r)
g.gan(r).by(["online","offline","pending_sync","syncing","synced"])
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
A.A(e,"click",s.h("~(1)?").a(new A.j0(this)),!1,s.c)
r.parentElement.appendChild(e).toString
f=e}if(f!=null){s=f.style
s.toString
n=j&&i>0?"inline-block":"none"
s.display=n}},
cW(){var s,r,q,p,o,n,m,l,k,j,i,h,g="collection-review-modal",f="house_id",e="sync_error",d=$.O()
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
B.k.c2(r,B.k.bK(r,"overflow-y"),"auto","")
r=s.createElement("h2")
r.toString
B.ab.sU(r,"Pending operation review")
p.appendChild(r).toString
r=s.createElement("p")
r.toString
B.l.sU(r,"These records remain saved. Review rejected readings or payments with Admin, then retry. Record IDs are preserved.")
p.appendChild(r).toString
for(d=d.aO(),r=A.G(d),o=r.h("H(1)").a(new A.iX()),d=B.b.gE(d),r=new A.bh(d,o,r.h("bh<1>"));r.p();){o=d.gt(0)
n=s.createElement("p")
n.toString
m=J.z(o)
B.l.sU(n,A.h(m.i(o,f))+" | "+A.h(m.i(o,"amount_collected"))+" | "+A.h(m.i(o,"transaction_id"))+"\n"+A.h(m.i(o,e)))
p.appendChild(n).toString}for(d=$.O().ah(),r=A.G(d),o=r.h("H(1)").a(new A.iY()),d=B.b.gE(d),r=new A.bh(d,o,r.h("bh<1>")),o=t.f;r.p();){n=d.gt(0)
m=J.z(n)
l=o.a(m.i(n,"body"))
k=B.ak.i(0,m.i(n,"endpoint"))
if(k==null)k="Saved operation"
j=s.createElement("p")
j.toString
i=J.z(l)
h=i.i(l,f)
i=h==null?i.i(l,"household_id"):h
B.l.sU(j,k+" | "+A.h(i==null?"":i)+" | "+A.h(m.i(n,"operation_id"))+"\n"+A.h(m.i(n,e)))
p.appendChild(j).toString}d=s.createElement("button")
d.toString
B.n.sU(d,"Retry pending operations")
r=t.C
o=r.h("~(1)?")
r=r.c
A.A(d,"click",o.a(new A.iZ(this,d)),!1,r)
p.appendChild(d).toString
d=s.createElement("button")
d.toString
B.n.sU(d,"Close")
A.A(d,"click",o.a(new A.j_(q)),!1,r)
p.appendChild(d).toString
q.appendChild(p).toString
s.body.appendChild(q).toString},
fp(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=this,a9="click",b0="change"
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
A.A(i.a,i.b,h.h("~(1)?").a(new A.j3(j)),!1,h.c)}if(q!=null){i=t.C
A.A(q,a9,i.h("~(1)?").a(new A.j4(a8,o,n,l,k,q)),!1,i.c)}g=r.a(s.getElementById("btn-logout"))
if(g!=null){i=t.C
A.A(g,a9,i.h("~(1)?").a(new A.j5(a8)),!1,i.c)}f=r.a(s.getElementById("btn-resident-logout"))
if(f!=null){i=t.C
A.A(f,a9,i.h("~(1)?").a(new A.jb(a8)),!1,i.c)}i=t.h
A.eF(i,i,"T","querySelectorAll")
i=s.querySelectorAll(".nav-tab")
i.toString
e=new A.bi(i,t.U)
e.q(e,new A.jc(a8))
d=p.a(s.getElementById("dir-search"))
c=m.a(s.getElementById("filter-purok"))
b=m.a(s.getElementById("filter-status"))
if(d!=null){p=t.E
A.A(d,"input",p.h("~(1)?").a(new A.jd(a8)),!1,p.c)}if(c!=null){p=t.E
A.A(c,b0,p.h("~(1)?").a(new A.je(a8)),!1,p.c)}if(b!=null){p=t.E
A.A(b,b0,p.h("~(1)?").a(new A.jf(a8)),!1,p.c)}a=s.getElementById("btn-close-modal")
if(a!=null){p=J.ah(a)
m=p.$ti
A.A(p.a,p.b,m.h("~(1)?").a(new A.jg(a8)),!1,m.c)}a0=s.getElementById("house-detail-modal")
if(a0!=null){p=J.ah(a0)
m=p.$ti
A.A(p.a,p.b,m.h("~(1)?").a(new A.jh(a0)),!1,m.c)}a1=t.aa.a(s.getElementById("modal-leak-toggle"))
if(a1!=null){p=t.E
A.A(a1,b0,p.h("~(1)?").a(new A.ji(a8,a1)),!1,p.c)}a2=r.a(s.getElementById("btn-submit-log"))
if(a2!=null){p=t.C
A.A(a2,a9,p.h("~(1)?").a(new A.j6(a8)),!1,p.c)}a3=r.a(s.getElementById("btn-broadcast-announcement"))
if(a3!=null){r=t.C
A.A(a3,a9,r.h("~(1)?").a(new A.j7(a8,a3)),!1,r.c)}a4=s.getElementById("btn-web-forgot-password")
a5=s.getElementById("web-modal-forgot-pw")
a6=s.getElementById("btn-web-recover-cancel")
a7=s.getElementById("btn-web-recover-submit")
if(a4!=null){s=J.ah(a4)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.j8(a5)),!1,r.c)}if(a6!=null){s=J.ah(a6)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.j9(a5)),!1,r.c)}if(a7!=null){s=J.ah(a7)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.ja(a5)),!1,r.c)}},
aj(a,b){var s
if(b!=null){J.v(b,a)
s=b.style
s.display="block"}},
av(){},
bj(a){var s="WaterHallPush",r=$.c5()
if(r.b6(s))r.i(0,s).b2("registerSubscription",A.D([a],t.s))},
b5(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b="none",a=document,a0=a.getElementById("announcement-history")
if(a0!=null)J.eI(a0).a0(0)
for(a0=["resident-profile-name","resident-profile-account","resident-profile-avatar"],s=0;s<3;++s){r=a.getElementById(a0[s])
if(r!=null)J.v(r,"--")}a0=c.k2
a0===$&&A.av()
new A.aT(a0,A.B(a0).h("aT<2>")).q(0,new A.jj())
a0=c.ch
a0===$&&A.av()
J.c6(a0).m(0,"active")
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
J.eI(l).a0(0)}j=a0.a(a.getElementById("dir-search"))
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
if(A.cl(s).gaA().i(0,"role")==="resident"){A.c3("[SECURITY] Resident application is forbidden from loading Worker Portal.")
return}s=l.ch
s===$&&A.av()
J.c6(s).B(0,"active")
s=l.ch.style
s.display="none"
s=l.k2
s===$&&A.av()
new A.aT(s,A.B(s).h("aT<2>")).q(0,new A.k7())
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
s.setItem("waterhall_session",B.c.V(a))
s=t.J
r=A.a4(new A.I(A.D(J.M(a.i(0,"name")).split(" "),t.s),t.Q.a(new A.k8()),s),s.h("f.E"))
s=A.G(r)
q=new A.a0(r,s.h("c(1)").a(new A.k9()),s.h("a0<1,c>")).Z(0,"")
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
l.bA()
l.aM()
l.cl()
l.fK()},
ag(a){var s,r,q,p,o,n,m=this,l="view-resident-home",k="view-resident-ledger",j="view-resident-support",i="view-resident-profile"
if(m.a==null&&m.d==null&&a!=="view-login"){m.b5()
return}s=t.d.a(window.location).href
s.toString
r=A.cl(s).gaA().i(0,"role")
if(r==="worker")s=a===l||a===k||a===j||a===i
else s=!1
if(s){A.c3("[SECURITY] Worker application is forbidden from switching to Resident tab "+a+".")
return}if(r==="resident")s=a==="view-dashboard"||a==="view-billing"||a==="view-profile"||a==="view-directory"||a==="view-assets"||a==="view-worker-resident-details"
else s=!1
if(s){A.c3("[SECURITY] Resident application is forbidden from switching to Worker tab "+a+".")
return}m.b=a
s=document
s.toString
q=t.h
A.eF(q,q,"T","querySelectorAll")
q=s.querySelectorAll(".nav-tab")
q.toString
p=new A.bi(q,t.U)
p.q(p,new A.kh(a))
q=m.k2
q===$&&A.av()
q.q(0,new A.ki(a))
if(a==="view-dashboard")m.bA()
else if(a==="view-directory")m.aM()
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
B.f.sI(n,s+" ("+A.h(J.m(o[0],"account_number"))+")")}}}m.bz(m.k3)}else if(a===l||a===k||a===j)m.cm()},
bA(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9=this,b0="worker",b1="var(--alert-green)",b2=".alert-widget-title",b3="var(--amber-safety)"
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
J.v(m,A.h(j==null?"Admin":j)+" \u2022 "+a9.a8(l.i(p,"timestamp"))+" \u2022 "+A.h(k))}l=o.style
l.display="flex"}else{l=o.style
l.display="none"}i=q.a
h=q.b
g=q.c
f=s.getElementById("worker-tank-val")
e=s.getElementById("worker-safety-status")
a9.c_(b0,h,f,s.getElementById("worker-turb-val"),s.getElementById("worker-tds-val"),e)
q=A.G(i)
l=q.h("I<1>")
d=A.a4(new A.I(i,q.h("H(1)").a(new A.jI()),l),l.h("f.E"))
c=A.D([],t.hq)
if(J.l(h.i(0,"turbidity_status"),"warning")){q=t.N
B.b.m(c,A.a3(["type","quality","name","Central Turbidity Alert","desc",A.w(h.i(0,"turbidity_desc"))],q,q))
b=1}else b=0
a=d.length+b
a0=s.getElementById("dash-alert-count")
if(a0!=null)J.v(a0,B.e.l(a))
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
q.color=b3}B.b.q(d,new A.jJ(a9,a2))
B.b.q(c,new A.jK(a9,a2))}}a4=A.D(["Purok 1","Purok 2","Purok 3","Purok 4","Purok 5","Purok 6"],t.s)
new A.ci(a4,t.fO).q(0,new A.jL(a9,i))
a5=s.getElementById("dashboard-zone-grid")
if(a5!=null){J.dg(a5,"")
B.b.q(a4,new A.jM(a9,i,a5))}a6=s.getElementById("dash-log-count")
a7=s.getElementById("dash-log-list")
if(a7!=null){s=J.J(a7)
s.sP(a7,"")
a8=A.nO(g,0,A.cw(3,"count",t.S),A.G(g).c).ar(0)
if(a6!=null)J.v(a6,""+g.length+" logged")
if(a8.length===0)s.sP(a7,'<div class="log-card" style="color:var(--text-muted)">No maintenance activity logged yet.</div>')
else B.b.q(a8,new A.jN(a9,i,a7))}},
a8(a){var s=$.c5().i(0,"WaterHallDisplay"),r=a==null?null:J.M(a)
return J.M(s.b2("formatTimestamp",A.D([r==null?"":r,"Unknown date"],t.s)))},
aM(){var s,r,q,p,o,n,m=null,l=$.O().a,k=document,j=t.G.a(k.getElementById("dir-search")),i=t.Y,h=i.a(k.getElementById("filter-purok")),g=i.a(k.getElementById("filter-status"))
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
J.dg(o,"")
k=A.G(l)
i=k.h("I<1>")
n=A.a4(new A.I(l,k.h("H(1)").a(new A.jP(s,r,q)),i),i.h("f.E"))
if(n.length===0){if(p!=null){k=p.style
k.display="block"}}else{if(p!=null){k=p.style
k.display="none"}B.b.q(n,new A.jQ(this,o))}},
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
B.k.c2(h,B.k.bK(h,"opacity"),g,"")}if(!i){h=j.style
h.toString
g=k?"pointer":"default"
h.cursor=g}if(!i)B.n.sh7(j,k?"Record an authorized collection":"Payments must be made at Barangay Hall.")
i=q.getElementById("worker-collection-policy")
if(i!=null)J.v(i,k?"Field collection is enabled by Admin. Payments remain pending until the server confirms synchronization.":"Barangay policy: make payments in person at Barangay Hall. Field collection is disabled.")
f=s.bF(a)
e=f.length!==0?B.b.gC(f):null
if(m!=null)J.v(m,e==null?"--":B.d.K(A.ac(J.m(e,"consumption")),3))
if(l!=null)J.v(l,e==null?"No billing record":B.d.K(A.ac(J.m(e,"total_due")),2))
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
A.A(s.a,s.b,q.h("~(1)?").a(new A.jx(this)),!1,q.c)}},
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
h4(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e="var(--amber-safety)",d={}
t.oT.a(a)
s=document.getElementById(b)
if(s==null)return
r=J.J(s)
r.sP(s,"")
if(a.length===0){r.sP(s,'<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:12px">No historic telemetry available.</div>')
return}q=B.d.df(B.b.h_(a,new A.k2())*1.1,10,1000)
p=new A.ci(a,A.G(a).h("ci<1>"))
o=p.gaw(p).ap(0,new A.k3(a,q),t.c).ar(0)
p=A.G(o)
n=p.h("c(1)")
p=p.h("a0<1,c>")
m=new A.a0(o,n.a(new A.k4()),p).Z(0," ")
if(0>=o.length)return A.e(o,0)
l=B.d.K(A.ac(J.m(o[0],"x")),1)
k=B.e.K(80,1)
p=new A.a0(o,n.a(new A.k5()),p).Z(0," ")
n=o.length
j=n-1
if(!(j>=0))return A.e(o,j)
j=B.d.K(A.ac(J.m(o[j],"x")),1)
n=B.e.K(80,1)
i=b==="resident-chart-container"
h=i?"res-chart-grad":"chart-area-grad"
g=i?"#3B82F6":e
f=i?"#3B82F6":e
d.a='      <svg width="100%" height="100%" viewBox="0 0 340 100" style="overflow:visible">\n        <defs>\n          <linearGradient id="'+h+'" x1="0" y1="0" x2="0" y2="1">\n            <stop offset="0%" stop-color="'+f+'" stop-opacity="0.3"/>\n            <stop offset="100%" stop-color="'+f+'" stop-opacity="0.0"/>\n          </linearGradient>\n        </defs>\n\n        <line x1="20" y1="20" x2="320" y2="20" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="50" x2="320" y2="50" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="80" x2="320" y2="80" stroke="#CBD5E1" stroke-width="1.5"/>\n\n        <path d="'+("M "+l+","+k+" "+p+(" L "+j+","+n+" Z"))+'" fill="url(#'+h+')" />\n        <polyline points="'+m+'" fill="none" stroke="'+g+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>\n    '
B.b.q(o,new A.k6(d,g))
r.sP(s,d.a+="</svg>")},
dA(a){var s,r,q,p,o,n=document.getElementById("modal-historical-logs")
if(n==null)return
s=J.J(n)
s.sP(n,"")
r=$.O().c
q=A.G(r)
p=q.h("I<1>")
o=A.a4(new A.I(r,q.h("H(1)").a(new A.jR(a)),p),p.h("f.E"))
if(o.length===0)s.sP(n,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous repair logs recorded for this meter.</div>')
else B.b.q(o,new A.jS(this,n))},
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
m=A.a4(new A.I(A.D(J.M(f.a.i(0,"name")).split(" "),t.s),t.Q.a(new A.jT()),n),n.h("f.E"))
n=A.G(m)
l=new A.a0(m,n.h("c(1)").a(new A.jU()),n.h("a0<1,c>")).Z(0,"")
n=l.length
J.v(o,B.a.n(l,0,n<2?n:2).toUpperCase())}n=$.O()
k=n.a.length
n=n.c
j=A.G(n)
i=new A.I(n,j.h("H(1)").a(new A.jV(f)),j.h("I<1>")).gj(0)
h=s.getElementById("profile-stat-total")
g=s.getElementById("profile-stat-logs")
if(h!=null)J.v(h,B.e.l(k))
if(g!=null)J.v(g,B.e.l(i))},
fK(){var s,r,q=this,p=document,o=t.G,n=o.a(p.getElementById("bill-meter-search")),m=p.getElementById("bill-meter-results"),l=o.a(p.getElementById("bill-curr-input")),k=t.o.a(p.getElementById("btn-save-bill"))
if(n==null)return
o=t.E
s=o.h("~(1)?")
o=o.c
A.A(n,"focus",s.a(new A.jk(q)),!1,o)
A.A(n,"input",s.a(new A.jl(q)),!1,o)
if(l!=null)A.A(l,"input",s.a(new A.jm(q)),!1,o)
A.A(p,"click",t.b9.a(new A.jn(n,m)),!1,t.V)
if(k!=null){p=t.C
A.A(k,"click",p.h("~(1)?").a(new A.jo(q)),!1,p.c)}r=$.O().a
p=r.length
if(p!==0){if(0>=p)return A.e(r,0)
q.k3=A.an(J.m(r[0],"house_id"))
if(0>=r.length)return A.e(r,0)
p=A.h(J.m(r[0],"owner_name"))
if(0>=r.length)return A.e(r,0)
B.f.sI(n,p+" ("+A.h(J.m(r[0],"account_number"))+")")
q.bz(q.k3)}},
cA(){var s,r,q,p,o=document,n=t.G.a(o.getElementById("bill-meter-search")),m=o.getElementById("bill-meter-results")
if(n==null||m==null)return
o=n.value
s=o==null?null:B.a.u(o.toLowerCase())
if(s==null)s=""
r=$.O().a
o=A.G(r)
q=o.h("I<1>")
p=A.a4(new A.I(r,o.h("H(1)").a(new A.kb(s)),q),q.h("f.E"))
o=J.J(m)
o.sP(m,"")
if(p.length===0){o.sP(m,'<div class="search-result-item" style="color:var(--text-muted); cursor:default">No households found</div>')
o=m.style
o.display="block"
return}B.b.q(p,new A.kc(this,n,m))
o=m.style
o.display="block"},
bz(a){var s,r,q,p,o,n=this,m=a!=null
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
if(q!=null)J.v(q,o==null?"--":B.d.K(o,3))
if(m&&p!=null)B.f.sI(p,"")
n.bC()
m=n.k3
m.toString
n.h2(m)},
cF(){var s,r,q,p,o,n,m,l,k,j,i=null,h=t.N,g=t.z,f=A.nG($.O().w,h,g),e=document,d=e.getElementById("bill-prev-reading"),c=d==null?i:d.textContent
if(c==null)c=""
e=t.G.a(e.getElementById("bill-curr-input"))
if(e==null)s=i
else{e=e.value
e=e==null?i:B.a.u(e)
s=e}if(s==null)s=""
if(c==="--"||c.length===0||s.length===0)return i
r=A.dT(c)
q=A.dT(s)
if(!J.l(f.i(0,"configured"),!0)||r==null||q==null||!isFinite(r)||r<0||!isFinite(q)||q<0||q<r||q>1e6)return i
p=q*1000
e=B.d.aC(p)
if(Math.abs(p-e)>0.0001)return i
o=e-B.d.aC(r*1000)
if(o<0)return i
n=B.e.aa(B.e.df(o-B.d.aC(A.bI(A.h(f.i(0,"included_m3")))*1000),0,1e9)*B.d.aC(A.bI(A.h(f.i(0,"excess_rate")))*100)+500,1000)
m=A.bI(B.d.K((B.d.aC(A.bI(A.h(f.i(0,"base_rate")))*100)+B.d.aC(A.bI(A.h(f.i(0,"environmental_fee")))*100)+n)/100,2))
l=A.bI(B.d.K(o/1000,3))
k=A.bI(B.d.K(n/100,2))
j=A.bI(B.d.K(q,3))
return A.a3(["previous_reading",A.bI(B.d.K(r,3)),"current_reading",j,"consumption",l,"excess_charge",k,"total_due",m,"billing_config_version",f.i(0,"version")],h,g)},
bC(){var s,r,q,p,o,n,m,l="configured",k="--",j="included_m3",i="consumption",h="total_due",g=$.O(),f=A.nG(g.w,t.N,t.z),e=this.cF(),d=new A.ad(Date.now(),0,!1),c=""+A.cR(d)+"-"+B.a.b7(B.e.l(A.lM(d)),2,"0"),b=this.k3,a=b!=null&&g.cb(b,c)
g=new A.kj()
g.$2("bill-calc-base",J.l(f.i(0,l),!0)?A.h(f.i(0,"base_rate")):k)
g.$2("bill-calc-fee",J.l(f.i(0,l),!0)?A.h(f.i(0,"environmental_fee")):k)
g.$2("bill-preview-cycle",c)
g.$2("bill-included-volume",J.l(f.i(0,l),!0)?A.h(f.i(0,j))+" m\xb3":k)
g.$2("bill-rate-description",J.l(f.i(0,l),!0)?"Includes "+A.h(f.i(0,j))+" m\xb3; excess at PHP "+A.h(f.i(0,"excess_rate"))+"/m\xb3.":"Admin must confirm billing rates before a bill can be recorded.")
b=e==null
g.$2("bill-calc-consumption",b?"0.000":B.d.K(A.ac(e.i(0,i)),3))
g.$2("bill-calc-excess",b?"0.00":B.d.K(A.ac(e.i(0,"excess_charge")),2))
g.$2("bill-calc-total",b?k:B.d.K(A.ac(e.i(0,h)),2))
s=document
r=t.G.a(s.getElementById("bill-curr-input"))
if(r==null)q=null
else{r=r.value
r=r==null?null:B.a.u(r)
q=r}if(q==null)q=""
r=s.getElementById("bill-prev-reading")
r=r==null?null:r.textContent
p=A.dT(r==null?"":r)
o=A.dT(q)
if(a)n="A bill or pending bill already exists for this billing cycle ("+c+")."
else if(!J.l(f.i(0,l),!0))n="Admin must confirm billing rates before issuing new bills."
else if(q.length===0)n="Enter current reading at or above previous reading (up to 3 decimal places)."
else if(o==null||!isFinite(o)||o<0)n="Enter a valid non-negative reading (up to 3 decimal places)."
else if(p!=null&&o<p)n="Current reading cannot be lower than previous reading ("+B.d.K(p,3)+" m\xb3)."
else n=b?"Reading format invalid. Up to 3 decimal places supported.":"Draft: "+B.d.K(A.ac(e.i(0,i)),3)+" m\xb3 | Total Due: \u20b1"+B.d.K(A.ac(e.i(0,h)),2)
g.$2("billing-alert-banner",n)
m=t.o.a(s.getElementById("btn-save-bill"))
if(m!=null){m.disabled=this.k4||a||b
g=m.style
g.toString
b=m.disabled
b.toString
b=b?"0.5":"1"
B.k.c2(g,B.k.bK(g,"opacity"),b,"")}},
bd(){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$bd=A.V(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:if(m.k4||m.k3==null||m.a==null){s=1
break}l=m.cF()
c=new A.ad(Date.now(),0,!1)
k=""+A.cR(c)+"-"+B.a.b7(B.e.l(A.lM(c)),2,"0")
j=c.a1().a6()
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
m.bC()
h=window.localStorage.getItem("waterhall_jwt")
g=b.x
p=4
f=A.nG(l,t.N,t.z)
J.bm(f,"house_id",m.k3)
J.bm(f,"account_number",J.m(i,"account_number"))
J.bm(f,"billing_month",k)
J.bm(f,"date",j)
J.bm(f,"billed_by",m.a.i(0,"worker_id"))
s=7
return A.y(b.aH(f),$async$bd)
case 7:e=a3
if(!J.l(h,window.localStorage.getItem("waterhall_jwt"))||m.a==null){n=[1]
s=5
break}if(g&&J.l(J.m(e,"is_synced"),!0))m.F("Bill successfully saved.")
else m.F("Bill saved offline. Pending synchronization.")
d=t.G.a(document.getElementById("bill-curr-input"))
if(d!=null)B.f.sI(d,"")
f=m.k3
f.toString
m.bz(f)
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
m.bC()
s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$bd,r)},
h2(a){var s,r,q=document.getElementById("billing-history-list")
if(q==null)return
s=J.J(q)
s.sP(q,"")
r=$.O().bF(a)
if(r.length===0)s.sP(q,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous invoice logs recorded.</div>')
else B.b.q(r,new A.jy(this,q))},
cV(a,b){var s,r,q="WaterHallPush"
t.dZ.a(a)
s=$.c5()
if(s.b6(q)){s=s.i(0,q)
r=a==null?[]:A.D([a],t.t)
s.b2("processAnnouncements",A.D([A.ob(A.rp(r)),b],t.hf))}},
dz(){var s,r,q,p,o,n,m,l=this.d==null?"worker":"resident",k=document,j=k.getElementById("announcement-history")
if(j==null)return
J.eI(j).a0(0)
s=$.O().cs(l)
r=J.z(s)
if(r.gD(s)){k=k.createElement("p")
k.className="empty-state"
B.l.sU(k,"No announcements yet. New Barangay updates will appear here.")
j.appendChild(k).toString
return}for(r=r.gE(s);r.p();){q=r.gt(r)
p=k.createElement("div")
p.className="announcement-history-card"
o=k.createElement("p")
o.className="announcement-meta"
n=k.createElement("span")
n.className="announcement-author"
m=J.z(q)
B.N.sU(n,A.h(m.i(q,"author")))
o.appendChild(n).toString
n=k.createElement("span")
n.toString
B.N.sU(n,"\u2022 "+this.a8(m.i(q,"timestamp")))
o.appendChild(n).toString
p.appendChild(o).toString
n=k.createElement("p")
n.toString
B.l.sU(n,A.h(m.i(q,"message")))
p.appendChild(n).toString
j.appendChild(p).toString}},
F(a){var s=document,r=s.getElementById("app-toast"),q=s.getElementById("toast-text")
if(r!=null&&q!=null){J.v(q,a)
J.c6(r).m(0,"show")
s=this.ok
if(s!=null)s.a2(0)
this.ok=A.fP(A.lk(0,2500,0),new A.kg(r))}},
cB(a){var s,r,q,p,o,n,m,l,k,j=this,i=t.d.a(window.location).href
i.toString
if(A.cl(i).gaA().i(0,"role")==="worker"){A.c3("[SECURITY] Worker application is forbidden from loading Resident Portal.")
return}j.d=a
window.localStorage.setItem("waterhall_resident_session",a)
j.a=null
i=window.localStorage
i.toString
B.j.B(i,"waterhall_session")
i=j.ch
i===$&&A.av()
J.c6(i).B(0,"active")
i=j.ch.style
i.display="none"
i=j.k2
i===$&&A.av()
new A.aT(i,A.B(i).h("aT<2>")).q(0,new A.kd())
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
n=J.M(o==null?"":o)
if(r!=null)J.v(r,n.length!==0?n:a)
if(q!=null)J.v(q,A.h(i.i(s,"house_id"))+" \u2022 "+A.h(i.i(s,"purok")))
if(p!=null){i=t.J
m=A.a4(new A.I(A.D(n.split(" "),t.s),t.Q.a(new A.ke()),i),i.h("f.E"))
i=A.G(m)
l=new A.a0(m,i.h("c(1)").a(new A.kf()),i.h("a0<1,c>")).Z(0,"")
i=l.length
k=B.a.n(l,0,i<2?i:2).toUpperCase()
J.v(p,k.length!==0?k:"RES")}}j.ag("view-resident-home")
i=j.at
if(i!=null)i.$0()},
eX(){var s,r,q
if(!A.cz())return
if(this.d!=null)s="resident"
else s=this.a!=null?"worker":null
if(s==null)return
r=$.O().b
q=document
this.c_(s,r,q.getElementById(s+"-tank-val"),q.getElementById(s+"-turb-val"),q.getElementById(s+"-tds-val"),q.getElementById(s+"-safety-status"))},
c_(a,a0,a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=null,b="var(--text-muted)"
t.P.a(a0)
s=J.l(a0.i(0,"has_reading"),!1)
r=!s
q=a0.i(0,"last_updated")
p=A.h(q==null?"":q)
q=A.lN("(Z|[+-]\\d\\d:\\d\\d)$")
o=A.nx(q.b.test(p)?p:p+"Z")
q=o==null
if(q)n=c
else{m=new A.ad(Date.now(),0,!1).a1()
l=o.a1()
n=A.lk(m.b-l.b,m.a-l.a,0)}if(n!=null){m=n.a
k=B.e.aa(m,6e7)>=10||m<0}else k=!1
m=new A.iW(r)
j=a0.i(0,"main_tank_level")
m.$4(a1,j,0,"%")
m.$3(a2,a0.i(0,"turbidity"),1)
m.$3(a3,a0.i(0,"tds_ppm"),0)
i=J.l(a0.i(0,"turbidity_status"),"warning")
if(s)h="AWAITING DATA"
else if(k)h="STALE DATA"
else{m=i?"QUALITY ALERT":"NO ALERT"
h=m}m=a4==null
if((m?c:a4.textContent)!==h)if(!m)J.v(a4,h)
if(!m){m=a4.style
m.toString
if(!r||k)l=b
else l=i?"var(--alert-red)":b
m.color=l}if(s)g="Awaiting current sensor readings."
else if(q)g="Update time unavailable."
else{s=k?"Stale reading. Refresh when connected.":"Current sensor readings."
g=s}s=document
f=s.getElementById(a+"-telemetry-freshness")
m=f==null
if((m?c:f.textContent)!==g)if(!m)J.v(f,g)
e=s.getElementById(a+"-reading-time")
d=this.a8(p)
s=e==null
if((s?c:e.textContent)!==d)if(!s)J.v(e,d)
s=$.c5().i(0,"WaterHallDisplay")
q=r&&!k&&!q
s.b2("renderTank",[a+"-water-tank",j,q])},
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
J.v(n,A.h(k==null?"Admin":k)+" \u2022 "+b6.a8(m.i(q,"timestamp"))+" \u2022 "+A.h(l))}m=p.style
m.display="flex"}else{m=p.style
m.display="none"}b6.c_(b8,s.b,c7.getElementById("resident-tank-val"),c7.getElementById("resident-turb-val"),c7.getElementById("resident-tds-val"),c7.getElementById("resident-safety-status"))
j=c7.getElementById("resident-profile-name-home")
i=c7.getElementById("resident-profile-meta-home")
if(j!=null)J.v(j,A.an(J.m(r,b9)))
if(i!=null){m=J.z(r)
J.v(i,"Resident: "+A.h(m.i(r,c0))+" | Meter: "+A.h(m.i(r,c1))+" | "+A.h(m.i(r,c2)))}h=c7.getElementById("resident-logout-name")
g=c7.getElementById("resident-logout-role")
f=c7.getElementById("resident-logout-avatar")
m=J.z(r)
e=m.i(r,b9)
d=J.M(e==null?"":e)
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
b=A.a4(new A.I(A.D(d.split(" "),t.s),t.Q.a(new A.jW()),e),e.h("f.E"))
e=A.G(b)
a=new A.a0(b,e.h("c(1)").a(new A.jX()),e.h("a0<1,c>")).Z(0,"")
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
a2=s.bF(e)
a3=B.a.n(new A.ad(Date.now(),0,!1).a1().a6(),0,7)
e=A.G(a2)
c=e.h("H(1)")
e=e.h("I<1>")
a4=e.h("f.E")
a5=A.a4(new A.I(a2,c.a(new A.jY()),e),a4)
a6=A.a4(new A.I(a2,c.a(new A.jZ(a3)),e),a4)
if(a5.length!==0)a7=B.b.gC(a5)
else if(a6.length!==0)a7=B.b.gC(a6)
else a7=a2.length!==0?B.b.gC(a2):b7
e=a7==null
c=e?b7:J.m(a7,"billing_breakdown")
t.eO.a(c)
a4=new A.k_()
a8=new A.k0()
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
a8=a8==null?b7:J.M(a8)
b0=a8}if(b0==null)b0=""
a4.$2("resident-payment-date",!e&&A.h(J.m(a7,"status")).toLowerCase()==="paid"&&b0.length!==0?b6.a8(b0):"Not paid")
if(e)e="No billing record is on file yet. Amounts appear here after a Worker saves a meter reading."
else if(a9)e="Legacy bill: original total preserved; rate breakdown unavailable."
else{e=J.z(c)
c="Recorded rates: first "+A.h(e.i(c,"included_m3"))+" m\xb3 included; excess PHP "+A.h(e.i(c,"excess_rate"))+"/m\xb3."
e=c}a4.$2("resident-rate-description",e)
b6.h4(A.aU(t.R.a(m.i(r,"monthly_history")),!0,t.r),"resident-chart-container")
b6.h3(a2)
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
h3(a){var s,r
t.p.a(a)
s=document.getElementById("resident-history-list")
if(s==null)return
r=J.J(s)
r.sP(s,"")
if(a.length===0){r.sP(s,'<div class="empty-state" style="padding:16px;text-align:center;color:var(--text-muted);font-size:13px;">No billing history is on file for this household yet.</div>')
return}B.b.q(a,new A.k1(this,s))},
eN(){var s,r=document,q=r.getElementById("btn-open-register-modal"),p=r.getElementById("register-user-modal"),o=t.dD.a(r.getElementById("resident-register-form")),n=r.getElementById("register-status"),m=t.o.a(r.getElementById("btn-submit-register"))
if(A.nS().gaA().i(0,"role")==="resident")if(q!=null){s=q.style
s.display="block"}s=t.h
A.eF(s,s,"T","querySelectorAll")
s=r.querySelectorAll("[data-toggle-password]")
s.toString
s=new A.bi(s,t.U)
s.q(s,new A.iR())
r=r.getElementById("btn-close-register-modal")
if(r!=null){r=J.ah(r)
s=r.$ti
A.A(r.a,r.b,s.h("~(1)?").a(new A.iS(p)),!1,s.c)}if(q!=null){r=J.ah(q)
s=r.$ti
A.A(r.a,r.b,s.h("~(1)?").a(new A.iT(p,n)),!1,s.c)}if(o!=null){r=t.E
A.A(o,"submit",r.h("~(1)?").a(new A.iU(m,o,n)),!1,r.c)}},
ez(){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f="change",e=document,d=e.getElementById("btn-open-collect-modal"),c=e.getElementById("modal-collect-payment"),b=e.getElementById("btn-collect-cancel"),a=t.o.a(e.getElementById("btn-collect-confirm")),a0=t.G.a(e.getElementById("collect-amount-input")),a1=t.Y,a2=a1.a(e.getElementById("collect-payment-method"))
if(d!=null){s=J.ah(d)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.iv(g,a0,c)),!1,r.c)}if(b!=null){s=J.ah(b)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.iw(c)),!1,r.c)}if(a!=null){s=t.C
A.A(a,"click",s.h("~(1)?").a(new A.ix(g,a,a0,a2,c)),!1,s.c)}s=t.iC
q=s.a(e.getElementById("resident-gallery-input"))
p=s.a(e.getElementById("resident-camera-input"))
o=s.a(e.getElementById("resident-photo-input"))
n=a1.a(e.getElementById("resident-issue-category"))
m=t.q.a(e.getElementById("resident-log-desc"))
a1=new A.iO(g,n,m)
s=new A.iP(g)
r=new A.ir(g,s,a1)
$.c5().k(0,"waterhallPhotoPickerResult",A.um(new A.iD(g,a1,r),t.Z))
l=new A.iN(g,a1)
k=new A.iu(g,q,p,o)
r=new A.iM(g,r)
if(q!=null){j=t.E
A.A(q,f,j.h("~(1)?").a(new A.iE(r,q)),!1,j.c)}if(p!=null){j=t.E
A.A(p,f,j.h("~(1)?").a(new A.iF(r,p)),!1,j.c)}if(o!=null){j=t.E
A.A(o,f,j.h("~(1)?").a(new A.iG(r,o)),!1,j.c)}r=e.getElementById("btn-resident-gallery-trigger")
if(r!=null){r=J.ah(r)
j=r.$ti
A.A(r.a,r.b,j.h("~(1)?").a(new A.iH(l,q)),!1,j.c)}r=e.getElementById("btn-resident-camera-trigger")
if(r!=null){r=J.ah(r)
j=r.$ti
A.A(r.a,r.b,j.h("~(1)?").a(new A.iI(l,p)),!1,j.c)}r=e.getElementById("btn-resident-photo-trigger")
if(r!=null){r=J.ah(r)
j=r.$ti
A.A(r.a,r.b,j.h("~(1)?").a(new A.iJ(l,q)),!1,j.c)}r=e.getElementById("btn-resident-photo-replace-gallery")
if(r!=null){r=J.ah(r)
j=r.$ti
A.A(r.a,r.b,j.h("~(1)?").a(new A.iK(l,q)),!1,j.c)}r=e.getElementById("btn-resident-photo-replace-camera")
if(r!=null){r=J.ah(r)
j=r.$ti
A.A(r.a,r.b,j.h("~(1)?").a(new A.iy(l,p)),!1,j.c)}r=e.getElementById("btn-resident-photo-remove")
if(r!=null){r=J.ah(r)
j=r.$ti
A.A(r.a,r.b,j.h("~(1)?").a(new A.iz(g,k,a1)),!1,j.c)}r=new A.iL(g,a1)
if(m!=null){j=t.E
A.A(m,"input",j.h("~(1)?").a(r),!1,j.c)}if(n!=null){j=t.E
A.A(n,f,j.h("~(1)?").a(r),!1,j.c)}s=new A.iA(g,k,m,n,s,l)
g.at=s
s.$0()
i=e.getElementById("btn-resident-submit-log")
if(i!=null){s=J.ah(i)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.iB(g,a1,k)),!1,r.c)}h=e.getElementById("btn-retry-db-connection")
if(h!=null){e=J.ah(h)
a1=e.$ti
A.A(e.a,e.b,a1.h("~(1)?").a(new A.iC(g)),!1,a1.c)}}}
A.jw.prototype={
$0(){var s,r,q,p,o=document.getElementById("phone-time")
if(o!=null){s=new A.ad(Date.now(),0,!1)
r=A.nJ(s)
q=B.a.b7(B.e.l(A.nK(s)),2,"0")
p=r>=12?"PM":"AM"
r=B.e.aP(r,12)
J.v(o,""+(r!==0?r:12)+":"+q+" "+p)}},
$S:2}
A.jq.prototype={
$1(a){t.I.a(a)
return this.a.$0()},
$S:19}
A.jr.prototype={
$1(a){t.V.a(a)
return $.O().c8()},
$S:1}
A.js.prototype={
$1(a){var s,r,q=this.a
q.av()
q.r=q.d=q.a=null;++q.x
q.y=!1;++q.Q
q.z=!1
s=q.fx
s===$&&A.av()
r=t.h
A.eF(r,r,"T","querySelectorAll")
s=s.querySelectorAll("[disabled]")
s.toString
s=new A.bi(s,t.U)
s.q(s,new A.jp())
q.as=null
s=q.ax
if(s!=null)s.a2(0)
s=window.localStorage
s.toString
B.j.B(s,"waterhall_resident_report_draft")
q.f=q.k3=q.c=null
s=document
r=s.getElementById("collection-review-modal")
if(r!=null)J.io(r)
r=s.getElementById("modal-collect-payment")
if(r!=null){r=r.style
r.display="none"}q.b5()
if(a)q.aj("Session expired. Please sign in again.",s.getElementById("login-error-msg"))},
$S:36}
A.jp.prototype={
$1(a){var s
t.h.a(a)
s=a.getAttribute("disabled")
a.removeAttribute("disabled")
return s},
$S:8}
A.jt.prototype={
$1(a){this.a.d5(t.P.a(a))},
$S:5}
A.ju.prototype={
$1(a){t.I.a(a)
return this.a.aX()},
$S:19}
A.jv.prototype={
$1(a){var s=document
s.toString
s=s.visibilityState||s.mozVisibilityState||s.msVisibilityState||s.webkitVisibilityState
s.toString
if(s==="visible")this.a.aX()},
$S:3}
A.j0.prototype={
$1(a){t.V.a(a)
return this.a.cW()},
$S:1}
A.iX.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.iY.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.iZ.prototype={
$1(a){return this.dV(t.V.a(a))},
dV(a){var s=0,r=A.U(t.H),q=this,p
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:q.b.disabled=!0
p=$.O()
s=2
return A.y(p.a7(),$async$$1)
case 2:s=3
return A.y(p.au(),$async$$1)
case 3:if(p.N())q.a.cW()
return A.S(null,r)}})
return A.T($async$$1,r)},
$S:4}
A.j_.prototype={
$1(a){t.V.a(a)
return B.a2.dw(this.a)},
$S:1}
A.j3.prototype={
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
A.j4.prototype={
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
i=A.cl(a).gaA().i(0,"role")
if(J.a8(l)===0||J.a8(k)===0){m.a.aj("Both Username and Password are required.",m.e)
s=1
break}a=m.f
a.disabled=!0
p=4
a3=$.O()
a4=t.N
s=7
return A.y(a3.ac("/api/login",!1,"POST",A.a3(["Content-Type","application/json"],a4,a4),B.c.V(A.a3(["username",l,"password",k],a4,a4))),$async$$1)
case 7:h=b1
a5=h.responseText
a5.toString
g=t.P.a(B.c.M(0,a5))
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
return A.y(A.df(),$async$$1)
case 9:s=10
return A.y(a3.b9(),$async$$1)
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
a5.av()
a5.bj("resident")
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
a3.setItem("waterhall_session",B.c.V(a4))
a4=window.localStorage
a4.toString
B.j.B(a4,"waterhall_resident_session")
a5.av()
a5.bj("worker")
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
A.j5.prototype={
$1(a){return this.e_(t.V.a(a))},
e_(a){var s=0,r=A.U(t.H),q=this,p
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:p=q.a
p.av()
s=2
return A.y($.O().c8(),$async$$1)
case 2:p.F("Signed out of Tech session")
return A.S(null,r)}})
return A.T($async$$1,r)},
$S:4}
A.jb.prototype={
$1(a){return this.dZ(t.V.a(a))},
dZ(a){var s=0,r=A.U(t.H),q=this,p
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:p=q.a
p.av()
s=2
return A.y($.O().c8(),$async$$1)
case 2:p.F("Signed out of Resident Portal")
return A.S(null,r)}})
return A.T($async$$1,r)},
$S:4}
A.jc.prototype={
$1(a){var s,r
t.h.a(a)
s=J.ah(a)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.j2(this.a,a)),!1,r.c)},
$S:8}
A.j2.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.b.getAttribute("data-target")
if(s==null)s=""
this.a.ag(s)},
$S:1}
A.jd.prototype={
$1(a){return this.a.aM()},
$S:3}
A.je.prototype={
$1(a){return this.a.aM()},
$S:3}
A.jf.prototype={
$1(a){return this.a.aM()},
$S:3}
A.jg.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.ag("view-directory")
s.c=null},
$S:1}
A.jh.prototype={
$1(a){A.pH(t.V.a(a).target)},
$S:1}
A.ji.prototype={
$1(a){var s=0,r=A.U(t.H),q,p=this,o,n,m,l,k,j
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:k=p.a
j=k.c
if(j==null){s=1
break}o=p.b.checked
n=o===!0?"leak":"normal"
s=3
return A.y($.O().bb(j,n),$async$$1)
case 3:if(c!=null){j=document
m=j.getElementById("modal-flow-rate")
if(m!=null)J.v(m,"Manual report")
k.dL(n)
k.F(n==="leak"?"Leak status saved for synchronization.":"Resolved status saved for synchronization.")
o=k.c
o.toString
k.dA(o)
l=t.aa.a(j.getElementById("log-resolved"))
if(l!=null)B.f.sdd(l,n==="normal")}case 1:return A.S(q,r)}})
return A.T($async$$1,r)},
$S:29}
A.j6.prototype={
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
break}g=A.a3(["house_id",c.c,"worker_id",c.a.i(0,"worker_id"),"purok",c.a.i(0,"selected_zone"),"description",l,"status_resolved",h,"date",new A.ad(Date.now(),0,!1).a1().a6()],t.N,t.z)
i=$.O()
s=3
return A.y(i.bo(g),$async$$1)
case 3:s=h?4:5
break
case 4:f=c.c
f.toString
s=6
return A.y(i.bb(f,"normal"),$async$$1)
case 6:e=k.a(o.getElementById("modal-leak-toggle"))
if(e!=null)B.f.sdd(e,!1)
c.dL("normal")
case 5:k=c.c
k.toString
if(i.ai(k)!=null){d=o.getElementById("modal-flow-rate")
if(d!=null)J.v(d,"Manual reading")}if(!m)B.m.sI(n,"")
c.F("Maintenance Log committed to database!")
o=c.c
o.toString
c.dA(o)
c.bA()
case 1:return A.S(q,r)}})
return A.T($async$$1,r)},
$S:4}
A.j7.prototype={
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
return A.y($.O().bm(k,A.w(c.a.i(0,"name")),j),$async$$1)
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
A.j8.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.a
if(s!=null){s=s.style
s.display="flex"}},
$S:1}
A.j9.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.ja.prototype={
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
a5=B.c.V(A.a3(["role",h,"username",g,"reset_token",f,"new_password",e],a0,a0))
s=7
return A.y(b.ac("/api/recover-account",!1,"POST",A.a3(["Content-Type","application/json"],a0,a0),a5),$async$$1)
case 7:d=b0
if(d.status===200){b=d.responseText
c=B.c.M(0,b==null?"{}":b)
if(i!=null){b=J.m(c,"message")
J.v(i,A.an(b==null?"Password reset successfully!":b))
b=i.style
b.display="block"}if(m!=null)B.f.sI(m,"")
if(l!=null)B.f.sI(l,"")
if(k!=null)B.f.sI(k,"")
A.ri(A.lk(0,0,2),new A.j1(n.a,i),t.a)}p=2
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
A.j1.prototype={
$0(){var s=this.a
if(s!=null){s=s.style
s.display="none"}s=this.b
if(s!=null){s=s.style
s.display="none"}},
$S:14}
A.jj.prototype={
$1(a){return J.c6(t.h.a(a)).B(0,"active")},
$S:8}
A.k7.prototype={
$1(a){return J.c6(t.h.a(a)).B(0,"active")},
$S:8}
A.k8.prototype={
$1(a){return B.a.u(A.w(a)).length!==0},
$S:9}
A.k9.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:10}
A.kh.prototype={
$1(a){var s
t.h.a(a)
s=J.J(a)
if(a.getAttribute("data-target")===this.a)s.gan(a).m(0,"active")
else s.gan(a).B(0,"active")},
$S:8}
A.ki.prototype={
$2(a,b){var s
A.w(a)
t.h.a(b)
s=J.J(b)
if(a===this.a)s.gan(b).m(0,"active")
else s.gan(b).B(0,"active")},
$S:46}
A.jI.prototype={
$1(a){return J.l(J.m(t.P.a(a),"current_leak_status"),"leak")},
$S:0}
A.jJ.prototype={
$1(a){var s,r,q
t.P.a(a)
s=document.createElement("div")
s.className="alert-item leak"
r=s.style
r.cursor="pointer"
r=J.z(a)
q=J.J(s)
q.sP(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.h(r.i(a,"owner_name"))+" ("+A.h(r.i(a,"purok"))+")</strong><br>\n              Reported leak. Field inspection required.\n            </div>\n          ")
q=q.gaz(s)
r=q.$ti
A.A(q.a,q.b,r.h("~(1)?").a(new A.jH(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:5}
A.jH.prototype={
$1(a){t.V.a(a)
this.a.ci(A.w(J.m(this.b,"house_id")))},
$S:1}
A.jK.prototype={
$1(a){var s,r,q
t.k.a(a)
s=document.createElement("div")
s.className="alert-item quality"
r=s.style
r.cursor="pointer"
r=J.z(a)
q=J.J(s)
q.sP(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.h(r.i(a,"name"))+"</strong><br>\n              "+A.h(r.i(a,"desc"))+"\n            </div>\n          ")
q=q.gaz(s)
r=q.$ti
A.A(q.a,q.b,r.h("~(1)?").a(new A.jG(this.a)),!1,r.c)
this.b.appendChild(s).toString},
$S:47}
A.jG.prototype={
$1(a){var s,r
t.V.a(a)
this.a.ag("view-dashboard")
s=document.getElementById("worker-telemetry-freshness")
if(s!=null){r=!!s.scrollIntoViewIfNeeded
r.toString
if(r)s.scrollIntoViewIfNeeded()
else s.scrollIntoView()}},
$S:1}
A.jL.prototype={
$2(a,b){var s,r,q,p,o,n
A.w(b)
s=document.getElementById("pin-p"+(a+1))
if(s!=null){r=s.querySelector(".pin-bg")
q=B.b.ab(this.b,new A.jE(b))
if(r!=null)if(q){r.setAttribute("fill","var(--alert-red)")
r.setAttribute("stroke","#FFF")
r.setAttribute("stroke-width","1.5")}else{r.setAttribute("fill","var(--alert-green)")
r.removeAttribute("stroke")}p=s.style
p.cursor="pointer"
p=J.J(s)
o=t.h.a(p.ft(s,!0))
p.dC(s,o)
p=J.ah(o)
n=p.$ti
A.A(p.a,p.b,n.h("~(1)?").a(new A.jF(this.a,b)),!1,n.c)}},
$S:48}
A.jE.prototype={
$1(a){var s
t.P.a(a)
s=J.z(a)
return J.l(s.i(a,"purok"),this.a)&&J.l(s.i(a,"current_leak_status"),"leak")},
$S:0}
A.jF.prototype={
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
A.jM.prototype={
$1(a){var s,r,q,p,o,n,m,l
A.w(a)
s=this.b
r=A.G(s)
q=r.h("H(1)")
r=r.h("I<1>")
p=new A.I(s,q.a(new A.jB(a)),r).gj(0)
o=new A.I(s,q.a(new A.jC(a)),r).gj(0)
r=this.a
n=J.l(r.a.i(0,"selected_zone"),a)
m=document.createElement("div")
m.className="zone-card "+(n?"assigned":"")
s=n?'<span class="zone-badge">ASSIGNED</span>':""
q=o>0?""+o+" Leaks":"Clear"
l=J.J(m)
l.sP(m,'          <div class="zone-card-header">\n            <span class="zone-name">'+a+"</span>\n            "+s+'\n          </div>\n          <div class="zone-stats">\n            <span>Meters: <strong>'+p+'</strong></span>\n            <span class="zone-leak-count">'+q+"</span>\n          </div>\n        ")
l=l.gaz(m)
q=l.$ti
A.A(l.a,l.b,q.h("~(1)?").a(new A.jD(r,a)),!1,q.c)
this.c.appendChild(m).toString},
$S:74}
A.jB.prototype={
$1(a){return J.l(J.m(t.P.a(a),"purok"),this.a)},
$S:0}
A.jC.prototype={
$1(a){var s
t.P.a(a)
s=J.z(a)
return J.l(s.i(a,"purok"),this.a)&&J.l(s.i(a,"current_leak_status"),"leak")},
$S:0}
A.jD.prototype={
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
A.jN.prototype={
$1(a){var s,r,q,p,o
t.P.a(a)
s=B.b.di(this.b,new A.jz(a),new A.jA())
r=J.z(s)
q=r.gS(s)?r.i(s,"owner_name"):"Unknown Household"
p=document.createElement("div")
r=J.z(a)
p.className="log-card "+(J.l(r.i(a,"status_resolved"),!0)?"resolved":"pending")
o=this.a.a8(r.i(a,"date"))
J.dg(p,'            <div class="log-card-header">\n              <span>'+A.h(q)+'</span>\n              <span style="font-size:10px; color:var(--text-muted)">'+o+'</span>\n            </div>\n            <div class="log-card-desc">'+A.h(r.i(a,"description"))+"</div>\n          ")
this.c.appendChild(p).toString},
$S:5}
A.jz.prototype={
$1(a){var s="house_id"
return J.l(J.m(t.P.a(a),s),J.m(this.a,s))},
$S:0}
A.jA.prototype={
$0(){return A.ap(t.N,t.z)},
$S:30}
A.jP.prototype={
$1(a){var s,r,q,p,o
t.P.a(a)
s=J.z(a)
r=this.a
q=B.a.A(J.M(s.i(a,"owner_name")).toLowerCase(),r)||B.a.A(J.M(s.i(a,"account_number")).toLowerCase(),r)||B.a.A(J.M(s.i(a,"house_id")).toLowerCase(),r)
r=this.b
p=r==="all"||J.l(s.i(a,"purok"),r)
r=this.c
o=r==="all"||J.l(s.i(a,"current_leak_status"),r)
return q&&p&&o},
$S:0}
A.jQ.prototype={
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
k=k.gaz(s)
r=k.$ti
A.A(k.a,k.b,r.h("~(1)?").a(new A.jO(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:5}
A.jO.prototype={
$1(a){t.V.a(a)
this.a.ci(A.w(J.m(this.b,"house_id")))},
$S:1}
A.jx.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.ag("view-directory")
s.c=null},
$S:1}
A.k2.prototype={
$2(a,b){A.ac(a)
A.ac(b)
return a>b?a:b},
$S:51}
A.k3.prototype={
$1(a){var s,r,q
t.if.a(a)
s=a.a
r=a.b
q=this.a.length
return A.a3(["x",20+(q===1?0.5:s/(q-1))*300,"y",80-r/this.b*60,"val",r,"label",""+(s+1)],t.N,t.K)},
$S:52}
A.k4.prototype={
$1(a){var s
t.c.a(a)
s=J.z(a)
return B.d.K(A.ac(s.i(a,"x")),1)+","+B.d.K(A.ac(s.i(a,"y")),1)},
$S:31}
A.k5.prototype={
$1(a){var s
t.c.a(a)
s=J.z(a)
return"L "+B.d.K(A.ac(s.i(a,"x")),1)+","+B.d.K(A.ac(s.i(a,"y")),1)},
$S:31}
A.k6.prototype={
$1(a){var s,r
t.c.a(a)
s=this.a
r=J.z(a)
s.a=s.a+('        <text x="'+A.h(r.i(a,"x"))+'" y="96" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-weight="600">'+A.h(r.i(a,"label"))+'</text>\n        <line x1="'+A.h(r.i(a,"x"))+'" y1="'+A.h(r.i(a,"y"))+'" x2="'+A.h(r.i(a,"x"))+'" y2="80" stroke="rgba(249,115,22,0.2)" stroke-width="1" stroke-dasharray="2 2" />\n        <circle cx="'+A.h(r.i(a,"x"))+'" cy="'+A.h(r.i(a,"y"))+'" r="4" fill="var(--white)" stroke="'+this.b+'" stroke-width="2" />\n        <text x="'+A.h(r.i(a,"x"))+'" y="'+A.h(A.ac(r.i(a,"y"))-8)+'" text-anchor="middle" fill="var(--navy-primary)" font-size="9" font-weight="700">'+A.h(r.i(a,"val"))+"m\xb3</text>\n      ")},
$S:54}
A.jR.prototype={
$1(a){return J.l(J.m(t.P.a(a),"house_id"),this.a)},
$S:0}
A.jS.prototype={
$1(a){var s,r,q,p,o,n,m="status_resolved"
t.P.a(a)
s=document.createElement("div")
r=J.z(a)
s.className="log-card "+(J.l(r.i(a,m),!0)?"resolved":"pending")
q=this.a.a8(r.i(a,"date"))
p=A.h(r.i(a,"worker_id"))
o=A.h(r.i(a,"description"))
n=J.l(r.i(a,m),!0)?"var(--alert-green)":"var(--amber-safety)"
r=J.l(r.i(a,m),!0)?"Resolved":"In Progress (Active Monitoring)"
J.dg(s,'          <div class="log-card-header">\n            <span>Tech: <strong>'+p+'</strong></span>\n            <span style="font-size:10px; color:var(--text-muted)">'+q+'</span>\n          </div>\n          <div class="log-card-desc">'+o+'</div>\n          <div style="font-size: 9px; font-weight:700; color:'+n+'; margin-top:4px; text-transform:uppercase">\n            Status: '+r+"\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:5}
A.jT.prototype={
$1(a){return B.a.u(A.w(a)).length!==0},
$S:9}
A.jU.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:10}
A.jV.prototype={
$1(a){var s,r="worker_id"
t.P.a(a)
s=J.z(a)
return J.l(s.i(a,r),this.a.a.i(0,r))&&J.l(s.i(a,"status_resolved"),!0)},
$S:0}
A.jk.prototype={
$1(a){return this.a.cA()},
$S:3}
A.jl.prototype={
$1(a){return this.a.cA()},
$S:3}
A.jm.prototype={
$1(a){return this.a.bC()},
$S:3}
A.jn.prototype={
$1(a){var s=t.mV.a(A.pH(t.V.a(a).target)),r=!1
if(s!=null)if(!B.f.A(this.a,s)){r=this.b
r=r!=null&&!J.ns(r,s)}if(r){r=this.b.style
r.display="none"}},
$S:1}
A.jo.prototype={
$1(a){t.V.a(a)
return this.a.bd()},
$S:1}
A.kb.prototype={
$1(a){var s,r
t.P.a(a)
s=J.z(a)
r=this.a
return B.a.A(J.M(s.i(a,"owner_name")).toLowerCase(),r)||B.a.A(J.M(s.i(a,"account_number")).toLowerCase(),r)},
$S:0}
A.kc.prototype={
$1(a){var s,r,q,p
t.P.a(a)
s=document.createElement("div")
s.className="search-result-item"
r=J.z(a)
q=J.J(s)
q.sU(s,A.h(r.i(a,"owner_name"))+" ("+A.h(r.i(a,"account_number"))+")")
q=q.gaz(s)
r=this.c
p=q.$ti
A.A(q.a,q.b,p.h("~(1)?").a(new A.ka(this.a,this.b,a,r)),!1,p.c)
r.appendChild(s).toString},
$S:5}
A.ka.prototype={
$1(a){var s,r,q,p=this
t.V.a(a)
s=p.c
r=J.z(s)
B.f.sI(p.b,A.h(r.i(s,"owner_name"))+" ("+A.h(r.i(s,"account_number"))+")")
q=p.d.style
q.display="none"
p.a.bz(A.an(r.i(s,"house_id")))},
$S:1}
A.kj.prototype={
$2(a,b){var s=document.getElementById(a)
if(s!=null)J.v(s,b)},
$S:7}
A.jy.prototype={
$1(a){var s,r,q,p,o,n="status"
t.P.a(a)
s=document.createElement("div")
r=J.z(a)
s.className="bill-record-card "+A.h(r.i(a,n))
q=this.a.a8(r.i(a,"date"))
p=A.h(r.i(a,"billing_month"))
o=J.l(r.i(a,n),"Paid")?"var(--alert-green)":"var(--amber-safety)"
J.dg(s,'          <div class="bill-record-header">\n            <span>Cycle: '+p+'</span>\n            <span style="color:'+o+'">'+J.M(r.i(a,n)).toUpperCase()+'</span>\n          </div>\n          <div class="bill-record-details">\n            <span>Readings: '+B.d.K(A.ac(r.i(a,"previous_reading")),1)+" \u2192 "+B.d.K(A.ac(r.i(a,"current_reading")),1)+" m\xb3</span>\n            <strong>\u20b1"+B.d.K(A.ac(r.i(a,"total_due")),2)+'</strong>\n          </div>\n          <div style="font-size:9px;color:var(--text-muted);margin-top:2px;display:flex;justify-content:space-between">\n            <span>'+q+" ("+A.h(r.i(a,"bill_id"))+")</span>\n            <span>Tech: "+A.h(r.i(a,"billed_by"))+"</span>\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:5}
A.kg.prototype={
$0(){J.c6(this.a).B(0,"show")},
$S:2}
A.kd.prototype={
$1(a){return J.c6(t.h.a(a)).B(0,"active")},
$S:8}
A.ke.prototype={
$1(a){return B.a.u(A.w(a)).length!==0},
$S:9}
A.kf.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:10}
A.iW.prototype={
$4(a,b,c,d){var s,r=this.a&&typeof b=="number"&&isFinite(b),q=r?B.d.K(b,c)+d:"N/A",p=a==null
if((p?null:a.textContent)!==q)if(!p)J.v(a,q)
if(!p){p=a.parentElement
if(p!=null){p=p.querySelector("small")
if(p!=null){p=p.style
p.toString
s=r?"":"none"
p.display=s}}}},
$3(a,b,c){return this.$4(a,b,c,"")},
$S:55}
A.jW.prototype={
$1(a){return B.a.u(A.w(a)).length!==0},
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
$1(a){return A.h(J.m(t.P.a(a),"status")).toLowerCase()!=="paid"},
$S:0}
A.jZ.prototype={
$1(a){return J.l(J.m(t.P.a(a),"billing_month"),this.a)},
$S:0}
A.k_.prototype={
$2(a,b){var s=document.getElementById(a)
if(s!=null)J.v(s,b)},
$S:7}
A.k0.prototype={
$2(a,b){return a==null?"--":B.d.K(A.bI(A.h(a)),b)},
$S:73}
A.k1.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c="status",b="payment_date"
t.P.a(a)
s=document
r=s.createElement("div")
q=J.z(a)
r.className="bill-record-card "+A.h(q.i(a,c))
p=this.a
o=p.a8(q.i(a,"date"))
n=A.h(q.i(a,"billing_month"))
m=J.l(q.i(a,c),"Paid")?"var(--alert-green)":"var(--amber-safety)"
l=J.M(q.i(a,c))
k=B.d.K(A.ac(q.i(a,"previous_reading")),1)
j=B.d.K(A.ac(q.i(a,"current_reading")),1)
i=B.d.K(A.ac(q.i(a,"consumption")),1)
h=B.d.K(A.ac(q.i(a,"total_due")),2)
g=A.h(q.i(a,"bill_id"))
if(J.l(q.i(a,c),"Paid")){f=q.i(a,b)
f=J.M(f==null?"":f).length!==0}else f=!1
p=f?" | Paid: "+p.a8(q.i(a,b)):""
J.dg(r,'        <div class="bill-record-header">\n          <span>Cycle: '+n+'</span>\n          <span style="color:'+m+'">'+l.toUpperCase()+'</span>\n        </div>\n        <div class="bill-record-details">\n          <span>Usage: '+k+" \u2192 "+j+" m\xb3 ("+i+" m\xb3)</span>\n          <strong>\u20b1"+h+'</strong>\n        </div>\n        <div style="font-size:9px;color:var(--text-muted);margin-top:2px;">\n          Bill Ref ID: '+g+" | Issued: "+o+p+"\n        </div>\n      ")
e=t.eO.a(q.i(a,"billing_breakdown"))
d=s.createElement("p")
s=d.style
s.fontSize="11px"
if(e==null)s="Legacy bill: rate breakdown unavailable. Original total retained."
else{s=J.z(e)
s="Recorded: base PHP "+A.h(s.i(e,"base_rate"))+" (includes "+A.h(s.i(e,"included_m3"))+" m\xb3), excess "+A.h(s.i(e,"excess_m3"))+" m\xb3 x PHP "+A.h(s.i(e,"excess_rate"))+" = PHP "+A.h(s.i(e,"excess_charge"))+", environmental fee PHP "+A.h(s.i(e,"environmental_fee"))+"."}B.l.sU(d,s)
r.appendChild(d).toString
this.b.appendChild(r).toString},
$S:5}
A.iR.prototype={
$1(a){var s,r
t.h.a(a)
s=J.ah(a)
r=s.$ti
A.A(s.a,s.b,r.h("~(1)?").a(new A.iQ(a)),!1,r.c)},
$S:8}
A.iQ.prototype={
$1(a){var s,r,q,p,o
t.V.a(a).preventDefault()
s=t.f_.a(this.a)
r=document
r.toString
q=s.getAttribute("data-"+new A.h8(new A.e9(s)).b1("togglePassword"))
p=t.G.a(r.getElementById(q==null?"":q))
if(p==null)return
o=p.type==="password"
B.f.sco(p,o?"text":"password")
B.n.sU(s,o?"Hide":"Show")},
$S:1}
A.iS.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.iT.prototype={
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
return A.y($.O().fl("/api/puroks",!1),$async$$1)
case 6:n=c
m=t.gH.a(document.getElementById("reg-res-purok"))
j=m
j.children.toString
J.ik(j)
j=n.responseText
j.toString
j=J.b_(t.R.a(J.m(B.c.M(0,j),"puroks")))
while(j.p()){l=j.gt(j)
J.qL(m,A.ru(A.h(l),A.h(l),null,!1))}if(!k){A.eF(t.af,t.h,"T","querySelectorAll")
i=new A.bi(J.qH(m,"option"),t.gp)
J.v(g,new A.e_(t.e3.a(i.ar(i)),t.eG).gj(0)===0?"No puroks configured. Contact the administrator.":"")}q=1
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
A.iU.prototype={
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
break}l=new A.iV()
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
return A.y($.O().ac("/api/residents/register",!1,"POST",A.a3(["Content-Type","application/json"],e,e),B.c.V(A.a3(["owner_name",J.ot(l.$1("reg-res-name")),"contact",J.ot(l.$1("reg-contact")),"purok",t.gH.a(document.getElementById("reg-res-purok")).value,"password",l.$1("reg-password"),"verify_password",l.$1("reg-verify-password")],e,t.jv))),$async$$1)
case 7:k=a0
e=k.responseText
e.toString
j=B.c.M(0,e)
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
$S:29}
A.iV.prototype={
$1(a){var s=t.fY.a(document.getElementById(a)).value
return s==null?"":s},
$S:10}
A.iv.prototype={
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
q=q==null?null:J.M(q)}if(q==null){s=s.c
s.toString}else s=q
B.f.sI(r,s)}s=this.b
if(s!=null)B.f.sI(s,"")
s=this.c
if(s!=null){s=s.style
s.display="flex"}},
$S:1}
A.iw.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.ix.prototype={
$1(a){return this.dT(t.V.a(a))},
dT(a1){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0
var $async$$1=A.V(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:b=m.a
a=!0
if(b.c!=null)if(b.a!=null){a=m.b.disabled
a.toString}if(a){s=1
break}a=m.c
a=a==null?null:a.value
f=A.dT(a==null?"":a)
l=f==null?0:f
a=l
if(typeof a!=="number"){q=a.he()
s=1
break}if(a<=0){b.F("Please enter a valid payment amount!")
s=1
break}a=m.d
e=a==null?null:a.value
k=e==null?"Cash":e
a=b.a.i(0,"worker_id")
if(a==null)a=b.a.i(0,"name")
j=J.M(a==null?"Collector":a)
i=window.localStorage.getItem("waterhall_jwt")
a=b.c
a.toString
h=a
a=m.b
a.disabled=!0
p=4
s=7
return A.y($.O().bx(l,j,h,k),$async$$1)
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
A.iO.prototype={
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
s.setItem("waterhall_resident_report_draft",B.c.V(A.a3(["owner",r,"category",q,"description",p,"photo",o,"file_name",n,"operation_id",l.as,"picker_pending",l.r!=null],t.N,t.X)))}catch(m){l.F("Device storage is full. Keep this screen open to retain your draft.")}},
$S:2}
A.iP.prototype={
$2(a,b){var s,r,q,p,o
this.a.f=a
s=document
r=s.getElementById("resident-photo-name")
if(r!=null)J.v(r,b)
q=s.getElementById("resident-photo-preview")
r=q==null
if(!r)J.eI(q).a0(0)
if(!r){p=q.style
p.display="block"}o=A.oH(a)
B.F.sfj(o,"Selected evidence preview")
if(!r)q.appendChild(o).toString
r=s.getElementById("resident-photo-preview-card")
if(r!=null){r=r.style
r.display="block"}s=s.getElementById("resident-photo-pickers")
if(s!=null){s=s.style
s.display="none"}},
$S:7}
A.ir.prototype={
dQ(a2,a3){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$$2=A.V(function(a4,a5){if(a4===1){o.push(a5)
s=p}for(;;)switch(s){case 0:a=m.a
a0=++a.x
a.y=!0
l=window.localStorage.getItem("waterhall_jwt")
p=4
k=A.lN("^data:image/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$").dh(a2)
if(k==null)throw A.b(B.v)
if(a2.length<=2796302){e=k.b
if(2>=e.length){q=A.e(e,2)
n=[1]
s=5
break}e=e[2]
e.toString
e=B.u.b4(e).length>2097152}else e=!0
if(e){e=A.N("Photo too large")
throw A.b(e)}j=A.oH(null)
i=new A.bE(new A.W($.Q,t.cU),t.ou)
e=t.h
d=t.E
c=d.h("~(1)?")
d=d.c
h=A.A(e.a(j),"load",c.a(new A.is(i)),!1,d)
g=A.A(e.a(j),"error",c.a(new A.it(i)),!1,d)
p=7
J.r0(j,a2)
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
return A.y(J.il(h),$async$$2)
case 11:s=12
return A.y(J.il(g),$async$$2)
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
$S:57}
A.is.prototype={
$1(a){var s=this.a
if((s.a.a&30)===0)s.fu(0)},
$S:3}
A.it.prototype={
$1(a){var s=this.a
if((s.a.a&30)===0)s.bp(B.v)},
$S:3}
A.iD.prototype={
$4(a,b,c,d){var s=this.a
if(s.d==null||a==null||!J.l(a,s.r))return
s.r=null
this.b.$0()
if(typeof d=="string"&&d.length!==0){s.F(d)
return}if(typeof b=="string"&&b.length!==0){s=typeof c=="string"&&c.length!==0?c:"Selected photo"
this.c.$2(b,s)}},
$C:"$4",
$R:4,
$S:58}
A.iN.prototype={
$2(a,b){var s,r,q,p,o,n="NativePhotoPicker",m=this.a
if(m.d==null||m.z||!$.O().N())return
r=$.c5()
if(!r.b6(n)){m=a==null
if(!m)B.f.sI(a,"")
if(!m)a.click()
return}if(m.r!=null)return
s=""+1000*Date.now()+"-"+ ++m.w
m.r=s
q=this.b
q.$0()
try{p=t.N
r.i(0,n).b2("postMessage",A.D([B.c.V(A.a3(["request_id",s,"source",b],p,p))],t.s))}catch(o){m.r=null
q.$0()
m.F("Could not open the photo picker. Please try again.")}},
$S:59}
A.iu.prototype={
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
if(r!=null)J.eI(r).a0(0)
s=p.getElementById("resident-photo-preview-card")
if(s!=null){s=s.style
s.display="none"}p=p.getElementById("resident-photo-pickers")
if(p!=null){p=p.style
p.display="flex"}},
$S:2}
A.iM.prototype={
$1(a){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c
var $async$$1=A.V(function(b,a0){if(b===1){o.push(a0)
s=p}for(;;)switch(s){case 0:d=m.a
if(d.d==null||d.z){s=1
break}h=a==null?null:a.files
if(h==null||h.length===0){s=1
break}l=B.a9.gC(h)
g=l.size
g.toString
if(g>2097152){d.F("Photo must be at most 2 MiB.")
s=1
break}g=l.type
if(!B.b.A(A.D(["image/jpeg","image/png","image/webp"],t.s),g.toLowerCase())){d.F("Use a JPEG, PNG or WebP photo.")
s=1
break}k=window.localStorage.getItem("waterhall_jwt")
j=++d.x
d.y=!0
p=4
g=new FileReader()
g.toString
B.aa.fZ(g,l)
i=g
s=7
return A.y(new A.co(t.O.a(i),"load",!1,t.h6).gC(0).dI(0,B.D),$async$$1)
case 7:if(!J.l(j,d.x)||!J.l(k,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}g=A.w(J.qS(i))
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
$S:60}
A.iE.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iF.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iG.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iH.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iI.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"camera")},
$S:1}
A.iJ.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iK.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iy.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"camera")},
$S:1}
A.iz.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s.z)return
s.as=s.r=null
this.b.$0()
this.c.$0()
s.F("Photo removed.")},
$S:1}
A.iL.prototype={
$1(a){var s,r=this.a
r.as=null
s=r.ax
if(s!=null)s.a2(0)
r.ax=A.fP(B.a7,this.b)},
$S:3}
A.iA.prototype={
$0(){var s,r,q,p,o=this,n="category",m=o.a
if(m.d==null)return
o.b.$0()
try{r=window.localStorage.getItem("waterhall_resident_report_draft")
s=B.c.M(0,r==null?"{}":r)
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
A.iB.prototype={
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
if(a7.as==null)a7.as=A.ii()
c=a7.ax
if(c!=null)c.a2(0)
m.b.$0()
a7.z=!0
h=++a7.Q
c=a7.fx
c===$&&A.av()
a1=t.h
A.eF(a1,a1,"T","querySelectorAll")
c=c.querySelectorAll("button, input, textarea, select")
c.toString
a1=t.U
a2=a1.h("I<k.E>")
a3=A.a4(new A.I(new A.bi(c,a1),a1.h("H(k.E)").a(new A.iq()),a2),a2.h("f.E"))
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
return A.y(c.bf(a1,k,j,a2,a5),$async$$1)
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
A.iq.prototype={
$1(a){var s
t.h.a(a)
s=a.id
s.toString
if(s!=="btn-resident-logout"){s=a.hasAttribute("disabled")
s.toString
s=!s}else s=!1
return s},
$S:61}
A.iC.prototype={
$1(a){return this.dR(t.V.a(a))},
dR(a){var s=0,r=A.U(t.H),q=this,p
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:p=q.a
p.F("Testing server connection...")
s=2
return A.y($.O().b9(),$async$$1)
case 2:if(c)p.F("Server connected! Online sync active.")
else p.F("Server unreachable. Continuing in offline mode.")
return A.S(null,r)}})
return A.T($async$$1,r)},
$S:4}
A.aH.prototype={
gha(){var s=this.a
return s==null||s===429||s>=500},
l(a){return"API request was not completed."}}
A.kr.prototype={
d8(a){return this.ch=this.ch.dc(new A.ku()).dH(new A.kv(a),t.H)},
aS(a){return this.e8(a)},
e8(a){var s=0,r=A.U(t.H),q=1,p=[],o=this,n,m,l
var $async$aS=A.V(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:m=++o.ay
window.localStorage.setItem("waterhall_jwt",a)
o.y=null
q=3
s=6
return A.y(o.d8(a),$async$aS)
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
J.qG(m,"waterhall-session-ending",!0,!0)
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
return A.y(o.d8(null),$async$ao)
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
N(){if(A.cz())return!0
if(window.localStorage.getItem("waterhall_jwt")!=null||window.localStorage.getItem("waterhall_session")!=null||window.localStorage.getItem("waterhall_resident_session")!=null)this.ao(!0)
return!1},
bS(){var s=this
s.x=!1
s.y="Server unavailable. Pending operations remain saved and will retry."
s.cx.m(0,s.X())},
ac(a,b,c,d,e){return this.fm(a,b,c,t.lG.a(d),e)},
c5(a,b,c,d){return this.ac(a,!0,b,c,d)},
fl(a,b){return this.ac(a,b,"GET",null,null)},
fk(a){return this.ac(a,!0,"GET",null,null)},
fm(a9,b0,b1,b2,b3){var s=0,r=A.U(t.la),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
var $async$ac=A.V(function(b5,b6){if(b5===1){o.push(b6)
s=p}for(;;)switch(s){case 0:a5=A.nS().dD(a9)
a6=J.qR(a5)
a7=A.nS()
if(a6!==a7.gcj(a7)||!B.a.O(J.or(a5),"/api/"))throw A.b(B.p)
if(b0&&!m.N())throw A.b(B.i)
l=m.ay
k=window.localStorage.getItem("waterhall_jwt")
a6=new XMLHttpRequest()
a6.toString
j=a6
i=new A.bE(new A.W($.Q,t.ax),t.cz)
h=A.D([],t.dw)
g=null
f=new A.kC(i)
p=4
J.qW(j,b1,a9)
if(b2==null){a6=t.N
a6=A.ap(a6,a6)}else a6=b2
a6.q(0,J.qU(j))
if(b0)J.r1(j,"Authorization","Bearer "+A.h(k))
a6=t.O
a7=t.gn
a2=t.D
J.nr(h,A.A(a6.a(j),"load",a7.a(new A.ky(i,j)),!1,a2))
J.nr(h,A.A(a6.a(j),"error",a7.a(new A.kz(f)),!1,a2))
J.nr(h,A.A(a6.a(j),"abort",a7.a(new A.kA(f)),!1,a2))
g=A.fP(B.a6,new A.kB(f,j))
J.qZ(j,b3)
s=7
return A.y(i.a,$async$ac)
case 7:e=b6
if(b0)a6=!J.l(l,m.ay)||!m.N()
else a6=!1
if(a6)throw A.b(B.i)
if(e.status===401&&b0){m.ao(!0)
throw A.b(B.R)}a6=!0
if(e.status!=null){a7=e.status
a7.toString
if(a7>=200){a6=e.status
a6.toString
a6=a6>=300}}if(a6){d=null
if(!b0&&J.or(a5)==="/api/login"){d=e.status===429?"Too many attempts. Please try again in 5 minutes.":"Invalid credentials."
try{a6=e.responseText
c=B.c.M(0,a6==null?"{}":a6)
b=J.m(c,"attempts_remaining")
if(e.status===401&&A.eC(b)&&b>=0&&b<=4)d="Invalid credentials. "+A.h(b)+" attempts remaining."
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
if(!a0.b&&a0.gha())m.bS()
throw A.b(a0)
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
a6=g
if(a6!=null)J.il(a6)
a6=h,a7=a6.length,a4=0
case 8:if(!(a4<a6.length)){s=10
break}a1=a6[a4]
s=11
return A.y(J.il(a1),$async$ac)
case 11:case 9:a6.length===a7||(0,A.aB)(a6),++a4
s=8
break
case 10:s=n.pop()
break
case 6:case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$ac,r)},
X(){var s,r,q,p,o,n,m=this,l=m.aO().length+m.ah().length,k=m.x
if(!k)s="offline"
else if(m.db)s="syncing"
else s=l>0?"pending_sync":"synced"
r=m.db||m.cy
q=A.cz()
p=m.aO()
o=A.G(p)
o=new A.I(p,o.h("H(1)").a(new A.kP()),o.h("I<1>")).gj(0)
p=m.ah()
n=A.G(p)
return A.a3(["status",s,"isOnline",k,"isSyncing",r,"authenticated",q,"reviewCount",o+new A.I(p,n.h("H(1)").a(new A.kQ()),n.h("I<1>")).gj(0),"pendingCount",l,"error",m.y],t.N,t.z)},
fh(){var s=window.localStorage.getItem("waterhall_unsynced_actions")
s=J.cD(t.j.a(B.c.M(0,s==null?"[]":s)),new A.kx(),t.P)
s=A.a4(s,s.$ti.h("ag.E"))
return s},
ah(){var s=this.fh(),r=A.G(s),q=r.h("I<1>")
s=A.a4(new A.I(s,r.h("H(1)").a(new A.l0()),q),q.h("f.E"))
return s},
aq(a,b){return this.fY(a,t.P.a(b))},
fY(a,b){var s=0,r=A.U(t.H),q=this,p
var $async$aq=A.V(function(c,d){if(c===1)return A.R(d,r)
for(;;)switch(s){case 0:if(!q.N())throw A.b(B.i)
p=b.i(0,"operation_id")
if(p==null)p=A.ii()
b.k(0,"operation_id",p)
s=2
return A.y(A.cB("actions",new A.l1(p,a,b)),$async$aq)
case 2:q.cx.m(0,q.X())
s=q.x?3:4
break
case 3:s=5
return A.y(q.a7(),$async$aq)
case 5:case 4:return A.S(null,r)}})
return A.T($async$aq,r)},
a7(){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$a7=A.V(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:if(m.cy||!m.N()){s=1
break}m.cy=!0
l=m.ay
f=m.ah()
B.b.be(f,new A.l5())
k=f
p=4
e=k,e=A.nO(e,0,A.cw(100,"count",t.S),A.G(e).c),d=e.$ti,e=new A.by(e,e.gj(0),d.h("by<ag.E>")),c=t.N,d=d.h("ag.E")
case 7:if(!e.p()){s=8
break}b=e.d
j=b==null?d.a(b):b
if(!J.l(l,m.ay)||!m.N()){s=8
break}s=9
return A.y(A.cB("actions",new A.l6(j)),$async$a7)
case 9:p=11
s=14
return A.y(m.c5(A.w(J.m(j,"endpoint")),"POST",A.a3(["Content-Type","application/json"],c,c),B.c.V(J.m(j,"body"))),$async$a7)
case 14:i=a3
b=i.responseText
h=B.c.M(0,b==null?"{}":b)
if(!J.l(l,m.ay)||!m.N()){s=8
break}if(!J.l(J.m(h,"status"),"success"))throw A.b(B.S)
s=15
return A.y(A.cB("actions",new A.l7(j)),$async$a7)
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
return A.y(A.cB("actions",new A.l8(j)),$async$a7)
case 19:s=17
break
case 18:throw a0
case 17:s=13
break
case 10:s=4
break
case 13:s=7
break
case 8:if(J.l(l,m.ay))m.y=B.b.ab(m.ah(),new A.l9())?"Saved operations need review. Their original data remains on this device.":null
n.push(6)
s=5
break
case 4:p=3
a1=o.pop()
if(J.l(l,m.ay)&&A.cz()&&m.x)m.y="Pending operations remain saved for retry."
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
return A.T($async$a7,r)},
dg(){var s,r,q,p=this
for(s=B.I.gaw(B.I),s=s.gE(s);s.p();){r=s.gt(s)
q=r.a
if(q!=="offlineCollections"&&q!=="unsyncedActions"){q=window.localStorage
r=r.b
q.getItem(r)
q.removeItem(r)}}s=t.t
p.a=A.D([],s)
p.d=A.D([],s)
p.e=A.D([],s)
p.c=A.D([],s)
p.f=A.D([],s)
s=t.N
r=t.z
p.b=A.ap(s,r)
p.r=A.ap(s,s)
p.w=A.ap(s,r)},
eQ(){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=window.localStorage.getItem("waterhall_households")
if(s!=null)i.a=A.aU(t.R.a(B.c.M(0,s)),!0,t.P)
r=window.localStorage.getItem("waterhall_central_assets")
if(r!=null)i.b=A.aq(t.f.a(B.c.M(0,r)),t.N,t.z)
q=window.localStorage.getItem("waterhall_maintenance_logs")
if(q!=null)i.c=A.aU(t.R.a(B.c.M(0,q)),!0,t.P)
p=window.localStorage.getItem("waterhall_workers")
if(p!=null)i.d=A.aU(t.R.a(B.c.M(0,p)),!0,t.P)
o=window.localStorage.getItem("waterhall_billing_records")
if(o!=null)i.e=A.aU(t.R.a(B.c.M(0,o)),!0,t.P)
n=window.localStorage.getItem("waterhall_announcements")
if(n!=null)i.f=A.aU(t.R.a(B.c.M(0,n)),!0,t.P)
m=window.localStorage.getItem("waterhall_billing_config")
if(m!=null)i.w=A.aq(t.f.a(B.c.M(0,m)),t.N,t.z)
l=window.localStorage.getItem("waterhall_payment_settings")
k=t.N
if(l!=null)i.r=A.aq(t.f.a(B.c.M(0,l)),k,k)
else i.r=A.aq($.q3,k,k)}catch(j){A.c3("Unable to load local cache.")}},
aG(){var s,r,q=this
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
s.setItem("waterhall_billing_config",B.c.V(q.w))}catch(r){A.c3("Unable to save local cache.")}},
aL(a){return this.h0(a)},
b9(){return this.aL("")},
h0(a1){var s=0,r=A.U(t.y),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0
var $async$aL=A.V(function(a2,a3){if(a2===1){o.push(a3)
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
return A.y(m.fk(k),$async$aL)
case 7:j=a3
f=j.responseText
f.toString
i=f
if(!J.l(i,m.as)){f=t.P
h=f.a(B.c.M(0,i))
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
if(J.nt(h,"announcements"))m.f=A.aU(e.a(J.m(h,"announcements")),!0,f)
if(J.nt(h,"paymentSettings"))m.r=A.aq(d.a(J.m(h,"paymentSettings")),c,c)
m.as=i;++m.at
m.ax.a0(0)
m.aG()}m.x=!0
m.cx.m(0,m.X())
s=8
return A.y(m.a7(),$async$aL)
case 8:if(m.x&&m.N())m.au()
f=m.x&&A.cz()
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
if(!(g instanceof A.aH)||!g.b)m.bS()
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
return A.T($async$aL,r)},
ad(){var s=0,r=A.U(t.y),q,p=this,o,n,m
var $async$ad=A.V(function(a,b){if(a===1)return A.R(b,r)
for(;;)switch(s){case 0:p.N()
A.nQ(B.a5,new A.kV(p))
o=window
o.toString
n=t.oV
m=t.A
A.A(o,"focus",n.a(new A.kW(p)),!1,m)
o=window
o.toString
B.P.c4(o,"waterhall-session-expired",new A.kX(p))
o=window
o.toString
B.P.c4(o,"waterhall-request-unavailable",new A.kY(p))
s=3
return A.y(A.df(),$async$ad)
case 3:p.eQ()
if(p.b.a===0)p.b=A.aq($.uR,t.N,t.z)
if(p.r.a===0){o=t.N
p.r=A.aq($.q3,o,o)}o=window
o.toString
A.A(o,"online",n.a(new A.kZ(p)),!1,m)
o=window
o.toString
A.A(o,"offline",n.a(new A.l_(p)),!1,m)
s=4
return A.y(p.b9(),$async$ad)
case 4:q=b
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$ad,r)},
e1(){var s,r,q,p=window.localStorage.getItem("waterhall_offline_collections")
if(p==null)return A.D([],t.t)
try{s=t.j.a(B.c.M(0,p))
r=J.cD(s,new A.kD(),t.P)
r=A.a4(r,r.$ti.h("ag.E"))
return r}catch(q){r=A.D([],t.t)
return r}},
aO(){var s=this.e1(),r=A.G(s),q=r.h("I<1>")
r=A.a4(new A.I(s,r.h("H(1)").a(new A.kO()),q),q.h("f.E"))
return r},
bx(a,b,c,a0){var s=0,r=A.U(t.P),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d
var $async$bx=A.V(function(a1,a2){if(a1===1)return A.R(a2,r)
for(;;)switch(s){case 0:if(!p.N())throw A.b(B.i)
o=p.r.i(0,"allow_worker_collection")
if((o==null?null:o.toLowerCase())!=="true")throw A.b(A.N("Field payment collection is disabled under the Barangay-only payment policy. All payments must be made at the Barangay Hall."))
n=new A.ad(Date.now(),0,!1).a1()
m=A.ii()
l=A.a3(["transaction_id",m,"bill_id",null,"house_id",c,"amount_collected",a,"date",n.a6(),"collected_by",b,"payment_method",a0,"sync_status","PENDING","synced_at",null],t.N,t.X)
s=3
return A.y(A.cB("collections",new A.l3(c,b,l)),$async$bx)
case 3:o=p.cx
o.m(0,p.X())
k=B.a.u(c.toUpperCase())
for(j=p.e,i=j.length,h=0;h<j.length;j.length===i||(0,A.aB)(j),++h){g=j[h]
f=J.z(g)
e=f.i(g,"house_id")
d=B.a.u(J.M(e==null?"":e).toUpperCase())
e=f.i(g,"bill_id")
B.a.u(J.M(e==null?"":e).toUpperCase())
e=d===k&&!J.l(f.i(g,"status"),"Paid")
if(e){f.k(g,"status","Pending sync")
f.k(g,"payment_status","Pending sync")}}p.aG()
A.c3("[OFFLINE STORE] Collection recorded locally: "+m+" for "+c+" (\u20b1"+A.h(a)+"). Status: PENDING.")
if(p.x)p.au()
else o.m(0,p.X())
q=l
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$bx,r)},
au(){var s=0,r=A.U(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d
var $async$au=A.V(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:if(m.db||!m.N()){s=1
break}i=m.aO()
B.b.be(i,new A.la())
l=A.nO(i,0,A.cw(100,"count",t.S),A.G(i).c).ar(0)
if(J.a8(l)===0){m.cx.m(0,m.X())
s=1
break}m.db=!0
h=m.cx
h.m(0,m.X())
k=m.ay
p=4
g=l
f=A.G(g)
j=new A.a0(g,f.h("@(1)").a(new A.lb()),f.h("a0<1,@>")).dJ(0)
s=7
return A.y(A.cB("collections",new A.lc(j)),$async$au)
case 7:s=8
return A.y(m.a9(l,k),$async$au)
case 8:if(J.l(k,m.ay)&&m.N())m.y=B.b.ab(m.aO(),new A.ld())?"Some collections need review. Unacknowledged payments remain saved.":null
n.push(6)
s=5
break
case 4:p=3
d=o.pop()
if(J.l(k,m.ay)&&A.cz()&&m.x)m.y="Sync not confirmed. Pending records remain saved for retry."
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
return A.T($async$au,r)},
a9(a,b){return this.fe(t.p.a(a),b)},
fe(a,b){var s=0,r=A.U(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c
var $async$a9=A.V(function(a0,a1){if(a0===1){o.push(a1)
s=p}for(;;)switch(s){case 0:if(b!==n.ay||!n.N())throw A.b(B.i)
m=null
p=4
g=t.N
s=7
return A.y(n.c5("/api/collections/sync","POST",A.a3(["Content-Type","application/json"],g,g),B.c.V(A.a3(["collections",a],g,t.p))),$async$a9)
case 7:l=a1
f=l.responseText
k=t.P.a(B.c.M(0,f==null?"{}":f))
j=J.m(k,"synced_ids")
if(J.l(J.m(k,"status"),"success")&&t.j.b(j)){g=J.r3(j,g)
e=A.ch(g.$ti.h("f.E"))
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
if(i.b||!B.b.A(A.D([400,403,404,409,422],t.b),i.a))throw c
g=a.length
s=g>1?11:12
break
case 11:h=g/2|0
s=13
return A.y(n.a9(B.b.cD(a,0,h),b),$async$a9)
case 13:s=14
return A.y(n.a9(B.b.e9(a,h),b),$async$a9)
case 14:s=1
break
case 12:if(b!==n.ay||!n.N())throw A.b(B.i)
g=i.a===409?"Bill or transaction conflict. Review before retrying.":"Collection rejected (HTTP "+A.h(i.a)+"). Review before retrying."
s=15
return A.y(n.b_(a,A.oP(t.N),g),$async$a9)
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
return A.y(n.b_(a,m,"Server did not acknowledge this collection. Retry required."),$async$a9)
case 16:n.x=!0
case 1:return A.S(q,r)
case 2:return A.R(o.at(-1),r)}})
return A.T($async$a9,r)},
b_(a,b,c){return this.f6(t.p.a(a),t.i.a(b),c)},
f6(a,b,c){var s=0,r=A.U(t.H),q=this,p
var $async$b_=A.V(function(d,e){if(d===1)return A.R(e,r)
for(;;)switch(s){case 0:p=A.G(a)
s=2
return A.y(A.cB("collections",new A.ks(new A.a0(a,p.h("@(1)").a(new A.kt()),p.h("a0<1,@>")).dJ(0),b,c)),$async$b_)
case 2:q.cx.m(0,q.X())
return A.S(null,r)}})
return A.T($async$b_,r)},
bf(a,b,c,d,e){var s=0,r=A.U(t.y),q,p=this,o,n
var $async$bf=A.V(function(f,g){if(f===1)return A.R(g,r)
for(;;)switch(s){case 0:n=t.N
s=3
return A.y(p.c5("/api/reports/add","POST",A.a3(["Content-Type","application/json"],n,n),B.c.V(A.a3(["operation_id",e,"household_id",a,"report_type",b,"description",c,"photo_base64",d],n,t.jv))),$async$bf)
case 3:n=g.responseText
o=B.c.M(0,n==null?"{}":n)
n=J.z(o)
q=J.l(n.i(o,"status"),"success")&&n.i(o,"report_id")!=null
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$bf,r)},
ai(a){var s,r,q=this.a,p=B.a.u(a.toLowerCase()),o=B.a.u(A.qc(p,"hh-",""))
try{s=J.qN(q,new A.kN(p,o))
return s}catch(r){return null}},
bb(a,b){var s=0,r=A.U(t.dZ),q,p=this,o,n,m
var $async$bb=A.V(function(c,d){if(c===1)return A.R(d,r)
for(;;)switch(s){case 0:n=p.a
m=B.b.fJ(n,new A.le(a))
s=m!==-1?3:4
break
case 3:if(!(m>=0&&m<n.length)){q=A.e(n,m)
s=1
break}o=A.aq(n[m],t.N,t.z)
o.k(0,"current_leak_status",b)
if(b==="leak")o.k(0,"leak_detected_at",new A.ad(Date.now(),0,!1).a1().a6())
else o.k(0,"leak_detected_at",null)
s=5
return A.y(p.aq("/api/households/update",o),$async$bb)
case 5:B.b.k(n,m,o)
p.aG()
if(!(m<n.length)){q=A.e(n,m)
s=1
break}q=n[m]
s=1
break
case 4:q=null
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$bb,r)},
bo(a){return this.fg(t.P.a(a))},
fg(a){var s=0,r=A.U(t.P),q,p=this,o,n
var $async$bo=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:o=p.c
n=A.ap(t.N,t.z)
n.k(0,"task_id","PENDING-"+A.ii())
n.k(0,"date",new A.ad(Date.now(),0,!1).a1().a6())
n.T(0,a)
s=3
return A.y(p.aq("/api/maintenance-logs/add",n),$async$bo)
case 3:B.b.ce(o,0,n)
p.aG()
q=n
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$bo,r)},
e3(){var s,r,q,p,o,n,m,l,k=t.N,j=A.ap(k,t.P)
for(s=this.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.aB)(s),++q){p=s[q]
j.k(0,A.h(J.m(p,"bill_id")),p)}for(s=this.ah(),r=A.G(s),o=r.h("H(1)").a(new A.kM()),s=B.b.gE(s),r=new A.bh(s,o,r.h("bh<1>")),o=t.f,n=t.z;r.p();){m=s.gt(0)
l=J.z(m)
p=A.aq(o.a(l.i(m,"body")),k,n)
p.k(0,"status",l.i(m,"sync_error")==null?"Pending sync":"Needs review")
j.k(0,A.h(p.i(0,"bill_id")),p)}k=j.$ti.h("aT<2>")
k=A.a4(new A.aT(j,k),k.h("f.E"))
return k},
bF(a){var s=this.e3(),r=A.G(s),q=r.h("I<1>"),p=A.a4(new A.I(s,r.h("H(1)").a(new A.kK(B.a.u(a.toUpperCase()))),q),q.h("f.E"))
B.b.be(p,new A.kL())
return p},
e2(a){var s,r,q=B.a.u(a.toUpperCase()),p=this.ah(),o=A.G(p),n=o.h("aE<1,t<c,@>>"),m=n.h("I<f.E>"),l=A.a4(new A.I(new A.aE(new A.I(p,o.h("H(1)").a(new A.kG()),o.h("I<1>")),o.h("t<c,@>(1)").a(new A.kH()),n),n.h("H(f.E)").a(new A.kI(q)),m),m.h("f.E"))
if(l.length!==0){B.b.be(l,new A.kJ())
s=J.m(B.b.gC(l),"current_reading")
if(typeof s=="number")return s}r=this.ai(a)
return A.o4(r==null?null:J.m(r,"current_m3_usage"))},
cb(a,b){var s,r,q=B.a.u(a.toUpperCase()),p=B.a.u(b.toLowerCase())
if(B.b.ab(this.e,new A.kR(q,p)))return!0
s=this.ah()
r=A.G(s)
if(new A.aE(new A.I(s,r.h("H(1)").a(new A.kS()),r.h("I<1>")),r.h("t<c,@>(1)").a(new A.kT()),r.h("aE<1,t<c,@>>")).ab(0,new A.kU(q,p)))return!0
return!1},
aH(a){return this.ff(t.P.a(a))},
ff(a){var s=0,r=A.U(t.P),q,p=this,o,n,m,l
var $async$aH=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:m=a.i(0,"house_id")
l=B.a.u(J.M(m==null?"":m).toUpperCase())
m=a.i(0,"billing_month")
o=B.a.u(J.M(m==null?"":m).toLowerCase())
if(p.cb(l,o))throw A.b(A.N("A bill for this cycle ("+o+") already exists or is pending synchronization."))
m=A.ap(t.N,t.z)
m.k(0,"bill_id","PENDING-"+A.ii())
n=a.i(0,"date")
m.k(0,"date",n==null?new A.ad(Date.now(),0,!1).a1().a6():n)
m.k(0,"status","Pending sync")
m.k(0,"is_synced",!1)
m.T(0,a)
s=3
return A.y(p.aq("/api/billing-records/add",m),$async$aH)
case 3:s=p.x&&p.N()?4:6
break
case 4:s=7
return A.y(p.a7(),$async$aH)
case 7:if(!B.b.ab(p.ah(),new A.kw(m))){m.k(0,"is_synced",!0)
m.k(0,"status","Unpaid")}s=p.N()?8:9
break
case 8:s=10
return A.y(p.b9(),$async$aH)
case 10:case 9:s=5
break
case 6:p.aG()
p.cx.m(0,p.X())
case 5:q=m
s=1
break
case 1:return A.S(q,r)}})
return A.T($async$aH,r)},
cs(a){return this.ax.dv(0,a,new A.kF(this,a))},
ct(a){var s=a.length===0?this.f:this.cs(a),r=J.z(s)
return r.gD(s)?null:r.gC(s)},
bm(a,b,c){var s=0,r=A.U(t.H),q=this,p,o
var $async$bm=A.V(function(d,e){if(d===1)return A.R(e,r)
for(;;)switch(s){case 0:p=t.N
o=A.a3(["message",a,"author",b,"target_audience",c,"timestamp",new A.ad(Date.now(),0,!1).a1().a6()],p,p)
s=2
return A.y(q.aq("/api/announcements/add",o),$async$bm)
case 2:B.b.ce(q.f,0,o)
q.ax.a0(0)
q.aG()
return A.S(null,r)}})
return A.T($async$bm,r)},
sfV(a){this.CW=t.mW.a(a)}}
A.ku.prototype={
$1(a){},
$S:13}
A.kv.prototype={
$1(a){return A.ig(this.a)},
$S:62}
A.kC.prototype={
$0(){var s=this.a
if((s.a.a&30)===0)s.bp(B.p)},
$S:2}
A.ky.prototype={
$1(a){var s
t.D.a(a)
s=this.a
if((s.a.a&30)===0)s.b3(0,this.b)},
$S:20}
A.kz.prototype={
$1(a){t.D.a(a)
return this.a.$0()},
$S:20}
A.kA.prototype={
$1(a){t.D.a(a)
return this.a.$0()},
$S:20}
A.kB.prototype={
$0(){this.a.$0()
this.b.abort()},
$S:2}
A.kP.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.kQ.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.kx.prototype={
$1(a){return A.aq(t.f.a(a),t.N,t.z)},
$S:21}
A.l0.prototype={
$1(a){return J.l(J.m(t.P.a(a),"owner"),A.bk())},
$S:0}
A.l1.prototype={
$1(a){return B.b.m(t.p.a(a),A.a3(["operation_id",this.a,"owner",A.bk(),"endpoint",this.b,"body",this.c],t.N,t.z))},
$S:6}
A.l5.prototype={
$2(a,b){var s,r="last_sync_attempt",q=t.P
q.a(a)
q.a(b)
q=J.m(a,r)
q=J.M(q==null?"":q)
s=J.m(b,r)
return B.a.a3(q,J.M(s==null?"":s))},
$S:16}
A.l6.prototype={
$1(a){var s,r,q,p,o,n="operation_id"
t.p.a(a)
for(r=a.length,q=this.a,p=J.z(q),o=0;o<a.length;a.length===r||(0,A.aB)(a),++o){s=a[o]
if(J.l(J.m(s,n),p.i(q,n)))J.bm(s,"last_sync_attempt",new A.ad(Date.now(),0,!1).a1().a6())}},
$S:6}
A.l7.prototype={
$1(a){var s
t.p.a(a)
s=A.G(a).h("H(1)").a(new A.l4(this.a))
a.$flags&1&&A.aG(a,16)
B.b.f_(a,s,!0)
return null},
$S:6}
A.l4.prototype={
$1(a){var s="operation_id"
return J.l(J.m(t.P.a(a),s),J.m(this.a,s))},
$S:0}
A.l8.prototype={
$1(a){var s,r,q,p,o,n="operation_id"
t.p.a(a)
for(r=a.length,q=this.a,p=J.z(q),o=0;o<a.length;a.length===r||(0,A.aB)(a),++o){s=a[o]
if(J.l(J.m(s,n),p.i(q,n)))J.bm(s,"sync_error","Server rejected this saved operation. Review with Admin; the original operation is retained.")}},
$S:6}
A.l9.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.kV.prototype={
$1(a){t.I.a(a)
return this.a.N()},
$S:19}
A.kW.prototype={
$1(a){return this.a.N()},
$S:3}
A.kX.prototype={
$1(a){t.A.a(a)
this.a.ao(!0)},
$S:18}
A.kY.prototype={
$1(a){var s
t.A.a(a)
s=this.a
if(s.N())s.bS()},
$S:18}
A.kZ.prototype={
$1(a){A.c3("[NET] Internet restored. Starting automatic synchronization...")
this.a.b9()},
$S:3}
A.l_.prototype={
$1(a){var s
A.c3("[NET] Internet disconnected. Entering offline mode.")
s=this.a
s.x=!1
s.cx.m(0,s.X())},
$S:3}
A.kD.prototype={
$1(a){return A.aq(t.f.a(a),t.N,t.z)},
$S:21}
A.kO.prototype={
$1(a){var s
t.P.a(a)
s=J.z(a)
return J.l(s.i(a,"sync_status"),"PENDING")&&J.l(s.i(a,"collected_by"),A.bk())},
$S:0}
A.l3.prototype={
$1(a){t.p.a(a)
if(B.b.ab(a,new A.l2(this.a,this.b)))throw A.b(A.N("A collection for this household is already pending"))
B.b.ce(a,0,this.c)},
$S:6}
A.l2.prototype={
$1(a){var s
t.P.a(a)
s=J.z(a)
return J.l(s.i(a,"house_id"),this.a)&&J.l(s.i(a,"collected_by"),this.b)&&J.l(s.i(a,"sync_status"),"PENDING")},
$S:0}
A.la.prototype={
$2(a,b){var s,r="last_sync_attempt",q=t.P
q.a(a)
q.a(b)
q=J.m(a,r)
q=J.M(q==null?"":q)
s=J.m(b,r)
return B.a.a3(q,J.M(s==null?"":s))},
$S:16}
A.lb.prototype={
$1(a){return J.m(t.P.a(a),"transaction_id")},
$S:34}
A.lc.prototype={
$1(a){var s,r,q,p
t.p.a(a)
for(r=a.length,q=this.a,p=0;p<a.length;a.length===r||(0,A.aB)(a),++p){s=a[p]
if(J.l(J.m(s,"collected_by"),A.bk())&&q.A(0,J.m(s,"transaction_id")))J.bm(s,"last_sync_attempt",new A.ad(Date.now(),0,!1).a1().a6())}},
$S:6}
A.ld.prototype={
$1(a){return J.m(t.P.a(a),"sync_error")!=null},
$S:0}
A.kt.prototype={
$1(a){return J.m(t.P.a(a),"transaction_id")},
$S:34}
A.ks.prototype={
$1(a){var s,r,q,p,o,n,m,l="transaction_id",k="sync_status",j="sync_error"
t.p.a(a)
for(s=a.length,r=this.c,q=this.b,p=this.a,o=0;o<a.length;a.length===s||(0,A.aB)(a),++o){n=a[o]
m=J.z(n)
if(!J.l(m.i(n,"collected_by"),A.bk())||!p.A(0,m.i(n,l))||!J.l(m.i(n,k),"PENDING"))continue
if(q.A(0,m.i(n,l))){m.k(n,k,"SYNCED")
m.k(n,"synced_at",new A.ad(Date.now(),0,!1).a1().a6())
m.B(n,j)}else m.k(n,j,r)}},
$S:6}
A.kN.prototype={
$1(a){var s,r,q,p,o,n,m
t.P.a(a)
n=J.z(a)
m=n.i(a,"house_id")
s=B.a.u(J.M(m==null?"":m).toLowerCase())
r=B.a.u(A.qc(s,"hh-",""))
m=n.i(a,"account_number")
q=B.a.u(J.M(m==null?"":m).toLowerCase())
m=n.i(a,"owner_name")
p=B.a.u(J.M(m==null?"":m).toLowerCase())
m=A.h(n.i(a,"purok"))
n=n.i(a,"lot")
o=B.a.u((m+" "+A.h(n==null?"":n)).toLowerCase())
n=this.a
return n===s||this.b===r||n===q||n===p||n===o},
$S:0}
A.le.prototype={
$1(a){return J.l(J.m(t.P.a(a),"house_id"),this.a)},
$S:0}
A.kM.prototype={
$1(a){return J.l(J.m(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.kK.prototype={
$1(a){var s=J.m(t.P.a(a),"house_id")
return B.a.u(J.M(s==null?"":s).toUpperCase())===this.a},
$S:0}
A.kL.prototype={
$2(a,b){var s,r,q="date",p=2026,o=t.P
o.a(a)
o.a(b)
o=J.z(a)
if(o.i(a,q)!=null){o=A.nx(A.w(o.i(a,q)))
s=o==null?A.lf(p):o}else s=A.lf(p)
o=J.z(b)
if(o.i(b,q)!=null){o=A.nx(A.w(o.i(b,q)))
r=o==null?A.lf(p):o}else r=A.lf(p)
return r.a3(0,s)},
$S:16}
A.kG.prototype={
$1(a){return J.l(J.m(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.kH.prototype={
$1(a){return A.aq(t.f.a(J.m(t.P.a(a),"body")),t.N,t.z)},
$S:35}
A.kI.prototype={
$1(a){var s=J.m(t.P.a(a),"house_id")
return B.a.u(J.M(s==null?"":s).toUpperCase())===this.a},
$S:0}
A.kJ.prototype={
$2(a,b){var s,r=t.P
r.a(a)
r=J.m(r.a(b),"date")
r=J.M(r==null?"":r)
s=J.m(a,"date")
return B.a.a3(r,J.M(s==null?"":s))},
$S:16}
A.kR.prototype={
$1(a){var s,r
t.P.a(a)
s=J.z(a)
r=s.i(a,"house_id")
if(B.a.u(J.M(r==null?"":r).toUpperCase())===this.a){s=s.i(a,"billing_month")
s=B.a.u(J.M(s==null?"":s).toLowerCase())===this.b}else s=!1
return s},
$S:0}
A.kS.prototype={
$1(a){return J.l(J.m(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.kT.prototype={
$1(a){return A.aq(t.f.a(J.m(t.P.a(a),"body")),t.N,t.z)},
$S:35}
A.kU.prototype={
$1(a){var s,r
t.P.a(a)
s=J.z(a)
r=s.i(a,"house_id")
if(B.a.u(J.M(r==null?"":r).toUpperCase())===this.a){s=s.i(a,"billing_month")
s=B.a.u(J.M(s==null?"":s).toLowerCase())===this.b}else s=!1
return s},
$S:0}
A.kw.prototype={
$1(a){var s="operation_id"
return J.l(J.m(t.P.a(a),s),this.a.i(0,s))},
$S:0}
A.kF.prototype={
$0(){var s=this.a.f,r=A.G(s),q=r.h("I<1>")
s=A.a4(new A.I(s,r.h("H(1)").a(new A.kE(this.b)),q),q.h("f.E"))
return s},
$S:69}
A.kE.prototype={
$1(a){var s,r="target_audience"
t.P.a(a)
s=J.z(a)
if(!J.l(s.i(a,r),"Everyone")){s=s.i(a,r)
s=J.l(s,this.a==="resident"?"Residents only":"Workers only")}else s=!0
return s},
$S:0}
A.ng.prototype={
$1(a){var s=0,r=A.U(t.a),q=this,p,o,n,m
var $async$$1=A.V(function(b,c){if(b===1)return A.R(c,r)
for(;;)switch(s){case 0:m=q.a
if(m==null||A.bk()!==m)throw A.b(A.N("Session changed before local save"))
m=q.b
p=m==="collections"?"waterhall_offline_collections":"waterhall_unsynced_actions"
o=window.localStorage.getItem(p)
o=J.cD(t.j.a(B.c.M(0,o==null?"[]":o)),new A.nf(),t.P)
n=A.a4(o,o.$ti.h("ag.E"))
q.c.$1(n)
s=2
return A.y(A.mZ(m,n),$async$$1)
case 2:return A.S(null,r)}})
return A.T($async$$1,r)},
$S:70}
A.nf.prototype={
$1(a){return A.aq(t.f.a(a),t.N,t.z)},
$S:21}
A.nh.prototype={
$1(a){},
$S:13}
A.n_.prototype={
$1(a){var s,r
t.P.a(a)
s=J.z(a)
r=s.i(a,"owner")
s=r==null?s.i(a,"collected_by"):r
return J.l(s,this.a)},
$S:0}
A.nm.prototype={
$1(a){var s,r,q,p,o,n
t.p.a(a)
for(s=a.length,r=this.a,q=0;q<a.length;a.length===s||(0,A.aB)(a),++q){p=a[q]
o=J.z(p)
n=o.i(p,"transaction_id")
r.dv(0,J.M(n==null?o.i(p,"operation_id"):n),new A.nl(p))}B.b.a0(a)
B.b.T(a,new A.aT(r,A.B(r).h("aT<2>")))},
$S:6}
A.nl.prototype={
$0(){return this.a},
$S:30};(function aliases(){var s=J.cK.prototype
s.eb=s.l
s=J.bT.prototype
s.ef=s.l
s=A.k.prototype
s.eg=s.bH
s=A.f.prototype
s.ec=s.bD
s=A.F.prototype
s.eh=s.l
s=A.C.prototype
s.bI=s.a4
s=A.d.prototype
s.ea=s.bn
s=A.em.prototype
s.ej=s.am
s=A.bo.prototype
s.ed=s.i
s.ee=s.k
s=A.d3.prototype
s.ei=s.k})();(function installTearOffs(){var s=hunkHelpers._static_1,r=hunkHelpers._static_0,q=hunkHelpers._static_2,p=hunkHelpers._instance_2u,o=hunkHelpers._instance_0u,n=hunkHelpers.installStaticTearOff,m=hunkHelpers._instance_2i
s(A,"un","rL",17)
s(A,"uo","rM",17)
s(A,"up","rN",17)
r(A,"q1","ug",2)
s(A,"uq","u6",15)
q(A,"us","u8",25)
r(A,"ur","u7",2)
p(A.W.prototype,"gcL","eE",25)
o(A.d2.prototype,"geS","eT",2)
s(A,"uu","tI",12)
s(A,"w4","oG",72)
n(A,"uC",4,null,["$4"],["rV"],32,0)
n(A,"uD",4,null,["$4"],["rW"],32,0)
m(A.bw.prototype,"ge6","cw",7)
s(A,"uL","mW",24)
s(A,"uK","o5",49)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.mixinHard,q=hunkHelpers.inherit,p=hunkHelpers.inheritMany
q(A.F,null)
p(A.F,[A.nE,J.cK,A.cU,J.b8,A.a_,A.k,A.bO,A.lP,A.f,A.by,A.dI,A.bh,A.e1,A.aD,A.bD,A.E,A.bX,A.cP,A.di,A.ef,A.fc,A.lW,A.lJ,A.dr,A.ep,A.mB,A.lz,A.dF,A.dG,A.dE,A.fe,A.mz,A.hZ,A.be,A.hi,A.mJ,A.et,A.h_,A.eq,A.ao,A.bW,A.d1,A.e3,A.lV,A.h4,A.bj,A.W,A.h0,A.e7,A.hB,A.d2,A.hM,A.eA,A.ed,A.as,A.hr,A.ct,A.aA,A.c8,A.eX,A.ma,A.mx,A.mM,A.ad,A.b0,A.fy,A.dW,A.mf,A.ba,A.am,A.aa,A.hP,A.at,A.ex,A.m1,A.b3,A.kq,A.nA,A.ea,A.nT,A.cq,A.x,A.dO,A.em,A.hR,A.cb,A.h7,A.hH,A.ez,A.bo,A.lI,A.mu,A.ip,A.aH,A.kr])
p(J.cK,[J.fb,J.dz,J.a,J.cL,J.cM,J.ce,J.bS])
p(J.a,[J.bT,J.af,A.cj,A.dL,A.d,A.eJ,A.bM,A.b9,A.Y,A.h6,A.aC,A.f1,A.f2,A.dl,A.ha,A.dn,A.hc,A.f4,A.p,A.hg,A.aJ,A.f8,A.hl,A.cJ,A.cO,A.fj,A.ht,A.hu,A.aK,A.hv,A.hx,A.aL,A.hC,A.hF,A.aO,A.hI,A.aP,A.hL,A.ax,A.hT,A.fN,A.aR,A.hV,A.fR,A.fX,A.i0,A.i2,A.i4,A.i6,A.i8,A.cN,A.aS,A.hp,A.aW,A.hz,A.fB,A.hN,A.aX,A.hX,A.eO,A.h2])
p(J.bT,[J.fz,J.bC,J.bx])
p(A.cU,[J.fa,A.hG])
q(J.lu,J.af)
p(J.ce,[J.dy,J.fd])
p(A.a_,[A.dC,A.bA,A.ff,A.fU,A.fD,A.hf,A.dB,A.eL,A.b6,A.fv,A.e0,A.fT,A.bp,A.eW])
p(A.k,[A.cY,A.h3,A.bi,A.az,A.f7])
p(A.cY,[A.eV,A.e_])
p(A.bO,[A.eT,A.eU,A.fK,A.n8,A.na,A.m7,A.m6,A.mS,A.mp,A.ms,A.lT,A.lS,A.mD,A.lB,A.li,A.lj,A.ll,A.md,A.me,A.lH,A.lG,A.mE,A.mF,A.mG,A.ko,A.kp,A.lm,A.ln,A.lw,A.mX,A.mY,A.n2,A.n3,A.n4,A.nc,A.nj,A.nk,A.nd,A.jq,A.jr,A.js,A.jp,A.jt,A.ju,A.jv,A.j0,A.iX,A.iY,A.iZ,A.j_,A.j3,A.j4,A.j5,A.jb,A.jc,A.j2,A.jd,A.je,A.jf,A.jg,A.jh,A.ji,A.j6,A.j7,A.j8,A.j9,A.ja,A.jj,A.k7,A.k8,A.k9,A.kh,A.jI,A.jJ,A.jH,A.jK,A.jG,A.jE,A.jF,A.jM,A.jB,A.jC,A.jD,A.jN,A.jz,A.jP,A.jQ,A.jO,A.jx,A.k3,A.k4,A.k5,A.k6,A.jR,A.jS,A.jT,A.jU,A.jV,A.jk,A.jl,A.jm,A.jn,A.jo,A.kb,A.kc,A.ka,A.jy,A.kd,A.ke,A.kf,A.iW,A.jW,A.jX,A.jY,A.jZ,A.k1,A.iR,A.iQ,A.iS,A.iT,A.iU,A.iV,A.iv,A.iw,A.ix,A.is,A.it,A.iD,A.iM,A.iE,A.iF,A.iG,A.iH,A.iI,A.iJ,A.iK,A.iy,A.iz,A.iL,A.iB,A.iq,A.iC,A.ku,A.kv,A.ky,A.kz,A.kA,A.kP,A.kQ,A.kx,A.l0,A.l1,A.l6,A.l7,A.l4,A.l8,A.l9,A.kV,A.kW,A.kX,A.kY,A.kZ,A.l_,A.kD,A.kO,A.l3,A.l2,A.lb,A.lc,A.ld,A.kt,A.ks,A.kN,A.le,A.kM,A.kK,A.kG,A.kH,A.kI,A.kR,A.kS,A.kT,A.kU,A.kw,A.kE,A.ng,A.nf,A.nh,A.n_,A.nm])
p(A.eT,[A.ni,A.m8,A.m9,A.mI,A.mH,A.lq,A.mg,A.ml,A.mk,A.mi,A.mh,A.mo,A.mn,A.mm,A.mr,A.lU,A.lR,A.mA,A.mU,A.mC,A.n0,A.mO,A.mN,A.lg,A.jw,A.j1,A.jA,A.kg,A.iO,A.iu,A.iA,A.kC,A.kB,A.kF,A.nl])
p(A.f,[A.n,A.aE,A.I,A.cm,A.ee,A.d5])
p(A.n,[A.ag,A.cg,A.aT,A.dD,A.ec])
p(A.ag,[A.dY,A.a0,A.hs,A.ho])
q(A.bu,A.aE)
p(A.E,[A.cZ,A.bb,A.eb,A.hn,A.h1,A.h8])
q(A.ci,A.cZ)
q(A.d7,A.cP)
q(A.bZ,A.d7)
q(A.dj,A.bZ)
q(A.bs,A.di)
p(A.eU,[A.lL,A.lv,A.n9,A.mT,A.n1,A.mq,A.mt,A.lA,A.lC,A.my,A.lF,A.m3,A.m2,A.lD,A.lE,A.lO,A.lQ,A.mb,A.mc,A.mQ,A.kl,A.ki,A.jL,A.k2,A.kj,A.k_,A.k0,A.iP,A.ir,A.iN,A.l5,A.la,A.kL,A.kJ])
q(A.dP,A.bA)
p(A.fK,[A.fG,A.cG])
p(A.dL,[A.dJ,A.ar])
p(A.ar,[A.eh,A.ej])
q(A.ei,A.eh)
q(A.dK,A.ei)
q(A.ek,A.ej)
q(A.aV,A.ek)
p(A.dK,[A.fo,A.fp])
p(A.aV,[A.fq,A.fr,A.fs,A.ft,A.fu,A.dM,A.dN])
q(A.d6,A.hf)
p(A.bW,[A.d4,A.co])
q(A.e4,A.d4)
q(A.d0,A.e4)
q(A.e5,A.d1)
q(A.bF,A.e5)
q(A.e2,A.e3)
q(A.bE,A.h4)
q(A.e6,A.e7)
q(A.hE,A.eA)
q(A.cr,A.eb)
p(A.as,[A.el,A.eY])
q(A.cs,A.el)
p(A.c8,[A.dh,A.f5,A.fg])
p(A.eX,[A.eR,A.km,A.ly,A.lx,A.m4])
q(A.fh,A.dB)
q(A.mw,A.mx)
q(A.fY,A.f5)
p(A.b6,[A.cS,A.f9])
q(A.h9,A.ex)
p(A.d,[A.u,A.dq,A.dt,A.f6,A.cd,A.fk,A.aN,A.en,A.aQ,A.ay,A.er,A.fZ,A.c_,A.br,A.eQ,A.bL])
p(A.u,[A.C,A.bn,A.ca,A.d_])
p(A.C,[A.q,A.r])
p(A.q,[A.cE,A.eK,A.cF,A.c7,A.bN,A.dk,A.cI,A.du,A.dw,A.bR,A.bz,A.dQ,A.bV,A.dV,A.dZ,A.fI,A.fJ,A.cX,A.ck])
q(A.eZ,A.b9)
q(A.c9,A.h6)
p(A.aC,[A.f_,A.f0])
q(A.hb,A.ha)
q(A.dm,A.hb)
q(A.hd,A.hc)
q(A.f3,A.hd)
q(A.aI,A.bM)
q(A.hh,A.hg)
q(A.ds,A.hh)
q(A.hm,A.hl)
q(A.bQ,A.hm)
q(A.dv,A.ca)
q(A.bw,A.cd)
q(A.fl,A.ht)
q(A.fm,A.hu)
q(A.hw,A.hv)
q(A.fn,A.hw)
p(A.p,[A.bg,A.b1])
q(A.aw,A.bg)
q(A.hy,A.hx)
q(A.cQ,A.hy)
q(A.hD,A.hC)
q(A.fA,A.hD)
q(A.fC,A.hF)
q(A.eo,A.en)
q(A.fE,A.eo)
q(A.hJ,A.hI)
q(A.fF,A.hJ)
q(A.dX,A.hL)
q(A.hU,A.hT)
q(A.fL,A.hU)
q(A.es,A.er)
q(A.fM,A.es)
q(A.hW,A.hV)
q(A.fQ,A.hW)
q(A.i1,A.i0)
q(A.h5,A.i1)
q(A.e8,A.dn)
q(A.i3,A.i2)
q(A.hj,A.i3)
q(A.i5,A.i4)
q(A.eg,A.i5)
q(A.i7,A.i6)
q(A.hK,A.i7)
q(A.i9,A.i8)
q(A.hQ,A.i9)
q(A.e9,A.h1)
p(A.eY,[A.he,A.eN])
q(A.cn,A.co)
q(A.hS,A.em)
p(A.bo,[A.dA,A.d3])
q(A.cf,A.d3)
q(A.hq,A.hp)
q(A.fi,A.hq)
q(A.hA,A.hz)
q(A.fw,A.hA)
q(A.cV,A.r)
q(A.hO,A.hN)
q(A.fH,A.hO)
q(A.hY,A.hX)
q(A.fS,A.hY)
q(A.eP,A.h2)
q(A.fx,A.bL)
s(A.cY,A.bD)
s(A.eh,A.k)
s(A.ei,A.aD)
s(A.ej,A.k)
s(A.ek,A.aD)
s(A.cZ,A.aA)
s(A.d7,A.aA)
s(A.h6,A.kq)
s(A.ha,A.k)
s(A.hb,A.x)
s(A.hc,A.k)
s(A.hd,A.x)
s(A.hg,A.k)
s(A.hh,A.x)
s(A.hl,A.k)
s(A.hm,A.x)
s(A.ht,A.E)
s(A.hu,A.E)
s(A.hv,A.k)
s(A.hw,A.x)
s(A.hx,A.k)
s(A.hy,A.x)
s(A.hC,A.k)
s(A.hD,A.x)
s(A.hF,A.E)
s(A.en,A.k)
s(A.eo,A.x)
s(A.hI,A.k)
s(A.hJ,A.x)
s(A.hL,A.E)
s(A.hT,A.k)
s(A.hU,A.x)
s(A.er,A.k)
s(A.es,A.x)
s(A.hV,A.k)
s(A.hW,A.x)
s(A.i0,A.k)
s(A.i1,A.x)
s(A.i2,A.k)
s(A.i3,A.x)
s(A.i4,A.k)
s(A.i5,A.x)
s(A.i6,A.k)
s(A.i7,A.x)
s(A.i8,A.k)
s(A.i9,A.x)
r(A.d3,A.k)
s(A.hp,A.k)
s(A.hq,A.x)
s(A.hz,A.k)
s(A.hA,A.x)
s(A.hN,A.k)
s(A.hO,A.x)
s(A.hX,A.k)
s(A.hY,A.x)
s(A.h2,A.E)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{j:"int",X:"double",a1:"num",c:"String",H:"bool",aa:"Null",o:"List",F:"Object",t:"Map",i:"JSObject"},mangledNames:{},types:["H(t<c,@>)","~(aw)","~()","~(p)","ae<~>(aw)","~(t<c,@>)","~(o<t<c,@>>)","~(c,c)","~(C)","H(c)","c(c)","~(c,@)","@(@)","aa(@)","aa()","~(@)","j(t<c,@>,t<c,@>)","~(~())","aa(p)","~(fO)","~(b1)","t<c,@>(@)","H(bc)","H(u)","F?(F?)","~(F,bf)","aa(F,bf)","~(F?,F?)","@()","ae<~>(p)","t<c,@>()","c(t<c,F>)","H(C,c,c,cq)","j(c?)","@(t<c,@>)","t<c,@>(t<c,@>)","~(H)","ae<~>()","@(c)","aa(@,bf)","@(@,c)","~(@,@)","~(j,@)","~(u,u?)","~(cW,@)","H(b2<c>)","~(c,C)","~(t<c,c>)","~(j,c)","F?(@)","~(b2<c>)","a1(a1,a1)","t<c,F>(am<j,a1>)","C(u)","~(t<c,F>)","~(C?,@,j[c])","@(F?)","ae<~>(c,c)","aa(@,@,@,@)","~(cH?,c)","ae<~>(cH?)","H(C)","ae<~>(~)","0&()","dA(@)","t<c,c>(t<c,c>,c)","0&(c,j?)","cf<@>(@)","bo(@)","o<t<c,@>>()","ae<aa>(~)","aa(~())","c(d)","c(@,j)","~(c)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.te(v.typeUniverse,JSON.parse('{"fz":"bT","bC":"bT","bx":"bT","vq":"a","vr":"a","uZ":"a","uX":"p","vl":"p","v_":"bL","uY":"d","vv":"d","vz":"d","uW":"r","vn":"r","vU":"b1","v0":"q","vt":"q","vA":"u","vk":"u","vO":"ca","vw":"aw","vN":"ay","v2":"bg","ve":"br","v1":"bn","vC":"bn","vs":"C","vp":"cd","vo":"bQ","v3":"Y","v6":"b9","v9":"ax","va":"aC","v5":"aC","v7":"aC","vu":"cj","fb":{"H":[],"Z":[]},"dz":{"aa":[],"Z":[]},"a":{"i":[]},"bT":{"i":[]},"af":{"o":["1"],"n":["1"],"i":[],"f":["1"]},"fa":{"cU":[]},"lu":{"af":["1"],"o":["1"],"n":["1"],"i":[],"f":["1"]},"b8":{"a9":["1"]},"ce":{"X":[],"a1":[]},"dy":{"X":[],"j":[],"a1":[],"Z":[]},"fd":{"X":[],"a1":[],"Z":[]},"bS":{"c":[],"lK":[],"Z":[]},"dC":{"a_":[]},"eV":{"k":["j"],"bD":["j"],"o":["j"],"n":["j"],"f":["j"],"k.E":"j","bD.E":"j"},"n":{"f":["1"]},"ag":{"n":["1"],"f":["1"]},"dY":{"ag":["1"],"n":["1"],"f":["1"],"ag.E":"1","f.E":"1"},"by":{"a9":["1"]},"aE":{"f":["2"],"f.E":"2"},"bu":{"aE":["1","2"],"n":["2"],"f":["2"],"f.E":"2"},"dI":{"a9":["2"]},"a0":{"ag":["2"],"n":["2"],"f":["2"],"ag.E":"2","f.E":"2"},"I":{"f":["1"],"f.E":"1"},"bh":{"a9":["1"]},"cm":{"f":["1"],"f.E":"1"},"e1":{"a9":["1"]},"cY":{"k":["1"],"bD":["1"],"o":["1"],"n":["1"],"f":["1"]},"hs":{"ag":["j"],"n":["j"],"f":["j"],"ag.E":"j","f.E":"j"},"ci":{"E":["j","1"],"aA":["j","1"],"t":["j","1"],"E.K":"j","E.V":"1","aA.K":"j","aA.V":"1"},"bX":{"cW":[]},"dj":{"bZ":["1","2"],"d7":["1","2"],"cP":["1","2"],"aA":["1","2"],"t":["1","2"],"aA.K":"1","aA.V":"2"},"di":{"t":["1","2"]},"bs":{"di":["1","2"],"t":["1","2"]},"ee":{"f":["1"],"f.E":"1"},"ef":{"a9":["1"]},"fc":{"oI":[]},"dP":{"bA":[],"a_":[]},"ff":{"a_":[]},"fU":{"a_":[]},"ep":{"bf":[]},"bO":{"cc":[]},"eT":{"cc":[]},"eU":{"cc":[]},"fK":{"cc":[]},"fG":{"cc":[]},"cG":{"cc":[]},"fD":{"a_":[]},"bb":{"E":["1","2"],"oN":["1","2"],"t":["1","2"],"E.K":"1","E.V":"2"},"cg":{"n":["1"],"f":["1"],"f.E":"1"},"dF":{"a9":["1"]},"aT":{"n":["1"],"f":["1"],"f.E":"1"},"dG":{"a9":["1"]},"dD":{"n":["am<1,2>"],"f":["am<1,2>"],"f.E":"am<1,2>"},"dE":{"a9":["am<1,2>"]},"fe":{"rC":[],"lK":[]},"cj":{"i":[],"eS":[],"Z":[]},"dL":{"i":[],"ab":[]},"hZ":{"eS":[]},"dJ":{"kn":[],"i":[],"ab":[],"Z":[]},"ar":{"L":["1"],"i":[],"ab":[]},"dK":{"k":["X"],"ar":["X"],"o":["X"],"L":["X"],"n":["X"],"i":[],"ab":[],"f":["X"],"aD":["X"]},"aV":{"k":["j"],"ar":["j"],"o":["j"],"L":["j"],"n":["j"],"i":[],"ab":[],"f":["j"],"aD":["j"]},"fo":{"lo":[],"k":["X"],"ar":["X"],"o":["X"],"L":["X"],"n":["X"],"i":[],"ab":[],"f":["X"],"aD":["X"],"Z":[],"k.E":"X"},"fp":{"lp":[],"k":["X"],"ar":["X"],"o":["X"],"L":["X"],"n":["X"],"i":[],"ab":[],"f":["X"],"aD":["X"],"Z":[],"k.E":"X"},"fq":{"aV":[],"lr":[],"k":["j"],"ar":["j"],"o":["j"],"L":["j"],"n":["j"],"i":[],"ab":[],"f":["j"],"aD":["j"],"Z":[],"k.E":"j"},"fr":{"aV":[],"ls":[],"k":["j"],"ar":["j"],"o":["j"],"L":["j"],"n":["j"],"i":[],"ab":[],"f":["j"],"aD":["j"],"Z":[],"k.E":"j"},"fs":{"aV":[],"lt":[],"k":["j"],"ar":["j"],"o":["j"],"L":["j"],"n":["j"],"i":[],"ab":[],"f":["j"],"aD":["j"],"Z":[],"k.E":"j"},"ft":{"aV":[],"lY":[],"k":["j"],"ar":["j"],"o":["j"],"L":["j"],"n":["j"],"i":[],"ab":[],"f":["j"],"aD":["j"],"Z":[],"k.E":"j"},"fu":{"aV":[],"lZ":[],"k":["j"],"ar":["j"],"o":["j"],"L":["j"],"n":["j"],"i":[],"ab":[],"f":["j"],"aD":["j"],"Z":[],"k.E":"j"},"dM":{"aV":[],"m_":[],"k":["j"],"ar":["j"],"o":["j"],"L":["j"],"n":["j"],"i":[],"ab":[],"f":["j"],"aD":["j"],"Z":[],"k.E":"j"},"dN":{"aV":[],"m0":[],"k":["j"],"ar":["j"],"o":["j"],"L":["j"],"n":["j"],"i":[],"ab":[],"f":["j"],"aD":["j"],"Z":[],"k.E":"j"},"hf":{"a_":[]},"d6":{"bA":[],"a_":[]},"et":{"fO":[]},"eq":{"a9":["1"]},"d5":{"f":["1"],"f.E":"1"},"ao":{"a_":[]},"d0":{"e4":["1"],"d4":["1"],"bW":["1"]},"bF":{"e5":["1"],"d1":["1"],"bq":["1"],"c0":["1"]},"e3":{"p1":["1"],"po":["1"],"c0":["1"]},"e2":{"e3":["1"],"p1":["1"],"po":["1"],"c0":["1"]},"bE":{"h4":["1"]},"W":{"ae":["1"]},"e4":{"d4":["1"],"bW":["1"]},"e5":{"d1":["1"],"bq":["1"],"c0":["1"]},"d1":{"bq":["1"],"c0":["1"]},"d4":{"bW":["1"]},"e6":{"e7":["1"]},"d2":{"bq":["1"]},"eA":{"pc":[]},"hE":{"eA":[],"pc":[]},"eb":{"E":["1","2"],"t":["1","2"]},"cr":{"eb":["1","2"],"E":["1","2"],"t":["1","2"],"E.K":"1","E.V":"2"},"ec":{"n":["1"],"f":["1"],"f.E":"1"},"ed":{"a9":["1"]},"cs":{"as":["1"],"b2":["1"],"n":["1"],"f":["1"],"as.E":"1"},"ct":{"a9":["1"]},"e_":{"k":["1"],"bD":["1"],"o":["1"],"n":["1"],"f":["1"],"k.E":"1","bD.E":"1"},"k":{"o":["1"],"n":["1"],"f":["1"]},"E":{"t":["1","2"]},"cZ":{"E":["1","2"],"aA":["1","2"],"t":["1","2"]},"cP":{"t":["1","2"]},"bZ":{"d7":["1","2"],"cP":["1","2"],"aA":["1","2"],"t":["1","2"],"aA.K":"1","aA.V":"2"},"as":{"b2":["1"],"n":["1"],"f":["1"]},"el":{"as":["1"],"b2":["1"],"n":["1"],"f":["1"]},"hn":{"E":["c","@"],"t":["c","@"],"E.K":"c","E.V":"@"},"ho":{"ag":["c"],"n":["c"],"f":["c"],"ag.E":"c","f.E":"c"},"dh":{"c8":["o<j>","c"]},"f5":{"c8":["c","o<j>"]},"dB":{"a_":[]},"fh":{"a_":[]},"fg":{"c8":["F?","c"]},"fY":{"c8":["c","o<j>"]},"X":{"a1":[]},"j":{"a1":[]},"o":{"n":["1"],"f":["1"]},"b2":{"n":["1"],"f":["1"]},"c":{"lK":[]},"eL":{"a_":[]},"bA":{"a_":[]},"b6":{"a_":[]},"cS":{"a_":[]},"f9":{"a_":[]},"fv":{"a_":[]},"e0":{"a_":[]},"fT":{"a_":[]},"bp":{"a_":[]},"eW":{"a_":[]},"fy":{"a_":[]},"dW":{"a_":[]},"hP":{"bf":[]},"at":{"rE":[]},"ex":{"fV":[]},"b3":{"fV":[]},"h9":{"fV":[]},"Y":{"i":[]},"C":{"u":[],"d":[],"i":[]},"p":{"i":[]},"d":{"i":[]},"aI":{"bM":[],"i":[]},"aJ":{"i":[]},"bw":{"d":[],"i":[]},"cH":{"C":[],"u":[],"d":[],"i":[]},"aK":{"i":[]},"aw":{"p":[],"i":[]},"u":{"d":[],"i":[]},"bz":{"q":[],"C":[],"u":[],"d":[],"i":[]},"aL":{"i":[]},"b1":{"p":[],"i":[]},"aN":{"d":[],"i":[]},"aO":{"i":[]},"aP":{"i":[]},"ax":{"i":[]},"aQ":{"d":[],"i":[]},"ay":{"d":[],"i":[]},"aR":{"i":[]},"cq":{"bc":[]},"q":{"C":[],"u":[],"d":[],"i":[]},"eJ":{"i":[]},"cE":{"q":[],"C":[],"u":[],"d":[],"i":[]},"eK":{"q":[],"C":[],"u":[],"d":[],"i":[]},"cF":{"q":[],"C":[],"u":[],"d":[],"i":[]},"bM":{"i":[]},"c7":{"q":[],"C":[],"u":[],"d":[],"i":[]},"bN":{"q":[],"C":[],"u":[],"d":[],"i":[]},"bn":{"u":[],"d":[],"i":[]},"eZ":{"i":[]},"c9":{"i":[]},"aC":{"i":[]},"b9":{"i":[]},"f_":{"i":[]},"f0":{"i":[]},"f1":{"i":[]},"dk":{"q":[],"C":[],"u":[],"d":[],"i":[]},"ca":{"u":[],"d":[],"i":[]},"f2":{"i":[]},"dl":{"i":[]},"dm":{"k":["bd<a1>"],"x":["bd<a1>"],"o":["bd<a1>"],"L":["bd<a1>"],"n":["bd<a1>"],"i":[],"f":["bd<a1>"],"x.E":"bd<a1>","k.E":"bd<a1>"},"dn":{"bd":["a1"],"i":[]},"f3":{"k":["c"],"x":["c"],"o":["c"],"L":["c"],"n":["c"],"i":[],"f":["c"],"x.E":"c","k.E":"c"},"f4":{"i":[]},"h3":{"k":["C"],"o":["C"],"n":["C"],"f":["C"],"k.E":"C"},"bi":{"k":["1"],"o":["1"],"n":["1"],"f":["1"],"k.E":"1"},"dq":{"d":[],"i":[]},"ds":{"k":["aI"],"x":["aI"],"o":["aI"],"L":["aI"],"n":["aI"],"i":[],"f":["aI"],"x.E":"aI","k.E":"aI"},"dt":{"d":[],"i":[]},"f6":{"d":[],"i":[]},"cI":{"q":[],"C":[],"u":[],"d":[],"i":[]},"du":{"q":[],"C":[],"u":[],"d":[],"i":[]},"f8":{"i":[]},"bQ":{"k":["u"],"x":["u"],"o":["u"],"L":["u"],"n":["u"],"i":[],"f":["u"],"x.E":"u","k.E":"u"},"dv":{"u":[],"d":[],"i":[]},"cd":{"d":[],"i":[]},"cJ":{"i":[]},"dw":{"q":[],"C":[],"u":[],"d":[],"i":[]},"bR":{"oz":[],"cH":[],"q":[],"C":[],"u":[],"d":[],"i":[]},"cO":{"i":[]},"fj":{"i":[]},"fk":{"d":[],"i":[]},"fl":{"E":["c","@"],"i":[],"t":["c","@"],"E.K":"c","E.V":"@"},"fm":{"E":["c","@"],"i":[],"t":["c","@"],"E.K":"c","E.V":"@"},"fn":{"k":["aK"],"x":["aK"],"o":["aK"],"L":["aK"],"n":["aK"],"i":[],"f":["aK"],"x.E":"aK","k.E":"aK"},"az":{"k":["u"],"o":["u"],"n":["u"],"f":["u"],"k.E":"u"},"cQ":{"k":["u"],"x":["u"],"o":["u"],"L":["u"],"n":["u"],"i":[],"f":["u"],"x.E":"u","k.E":"u"},"dQ":{"q":[],"C":[],"u":[],"d":[],"i":[]},"fA":{"k":["aL"],"x":["aL"],"o":["aL"],"L":["aL"],"n":["aL"],"i":[],"f":["aL"],"x.E":"aL","k.E":"aL"},"fC":{"E":["c","@"],"i":[],"t":["c","@"],"E.K":"c","E.V":"@"},"bV":{"q":[],"C":[],"u":[],"d":[],"i":[]},"fE":{"k":["aN"],"x":["aN"],"o":["aN"],"d":[],"L":["aN"],"n":["aN"],"i":[],"f":["aN"],"x.E":"aN","k.E":"aN"},"dV":{"q":[],"C":[],"u":[],"d":[],"i":[]},"fF":{"k":["aO"],"x":["aO"],"o":["aO"],"L":["aO"],"n":["aO"],"i":[],"f":["aO"],"x.E":"aO","k.E":"aO"},"dX":{"E":["c","c"],"i":[],"t":["c","c"],"E.K":"c","E.V":"c"},"dZ":{"q":[],"C":[],"u":[],"d":[],"i":[]},"fI":{"q":[],"C":[],"u":[],"d":[],"i":[]},"fJ":{"q":[],"C":[],"u":[],"d":[],"i":[]},"cX":{"q":[],"C":[],"u":[],"d":[],"i":[]},"ck":{"q":[],"C":[],"u":[],"d":[],"i":[]},"fL":{"k":["ay"],"x":["ay"],"o":["ay"],"L":["ay"],"n":["ay"],"i":[],"f":["ay"],"x.E":"ay","k.E":"ay"},"fM":{"k":["aQ"],"x":["aQ"],"o":["aQ"],"d":[],"L":["aQ"],"n":["aQ"],"i":[],"f":["aQ"],"x.E":"aQ","k.E":"aQ"},"fN":{"i":[]},"fQ":{"k":["aR"],"x":["aR"],"o":["aR"],"L":["aR"],"n":["aR"],"i":[],"f":["aR"],"x.E":"aR","k.E":"aR"},"fR":{"i":[]},"bg":{"p":[],"i":[]},"fX":{"i":[]},"fZ":{"d":[],"i":[]},"c_":{"m5":[],"d":[],"i":[]},"br":{"d":[],"i":[]},"d_":{"u":[],"d":[],"i":[]},"h5":{"k":["Y"],"x":["Y"],"o":["Y"],"L":["Y"],"n":["Y"],"i":[],"f":["Y"],"x.E":"Y","k.E":"Y"},"e8":{"bd":["a1"],"i":[]},"hj":{"k":["aJ?"],"x":["aJ?"],"o":["aJ?"],"L":["aJ?"],"n":["aJ?"],"i":[],"f":["aJ?"],"x.E":"aJ?","k.E":"aJ?"},"eg":{"k":["u"],"x":["u"],"o":["u"],"L":["u"],"n":["u"],"i":[],"f":["u"],"x.E":"u","k.E":"u"},"hK":{"k":["aP"],"x":["aP"],"o":["aP"],"L":["aP"],"n":["aP"],"i":[],"f":["aP"],"x.E":"aP","k.E":"aP"},"hQ":{"k":["ax"],"x":["ax"],"o":["ax"],"L":["ax"],"n":["ax"],"i":[],"f":["ax"],"x.E":"ax","k.E":"ax"},"h1":{"E":["c","c"],"t":["c","c"]},"e9":{"E":["c","c"],"t":["c","c"],"E.K":"c","E.V":"c"},"h8":{"E":["c","c"],"t":["c","c"],"E.K":"c","E.V":"c"},"he":{"as":["c"],"b2":["c"],"n":["c"],"f":["c"],"as.E":"c"},"co":{"bW":["1"]},"cn":{"co":["1"],"bW":["1"]},"ea":{"bq":["1"]},"dO":{"bc":[]},"em":{"bc":[]},"hS":{"bc":[]},"hR":{"bc":[]},"cb":{"a9":["1"]},"h7":{"m5":[],"d":[],"i":[]},"hH":{"rG":[]},"ez":{"rt":[]},"eY":{"as":["c"],"b2":["c"],"n":["c"],"f":["c"]},"f7":{"k":["C"],"o":["C"],"n":["C"],"f":["C"],"k.E":"C"},"cN":{"i":[]},"cf":{"k":["1"],"o":["1"],"n":["1"],"f":["1"],"k.E":"1"},"hG":{"cU":[]},"aS":{"i":[]},"aW":{"i":[]},"aX":{"i":[]},"fi":{"k":["aS"],"x":["aS"],"o":["aS"],"n":["aS"],"i":[],"f":["aS"],"x.E":"aS","k.E":"aS"},"fw":{"k":["aW"],"x":["aW"],"o":["aW"],"n":["aW"],"i":[],"f":["aW"],"x.E":"aW","k.E":"aW"},"fB":{"i":[]},"cV":{"r":[],"C":[],"u":[],"d":[],"i":[]},"fH":{"k":["c"],"x":["c"],"o":["c"],"n":["c"],"i":[],"f":["c"],"x.E":"c","k.E":"c"},"eN":{"as":["c"],"b2":["c"],"n":["c"],"f":["c"],"as.E":"c"},"r":{"C":[],"u":[],"d":[],"i":[]},"fS":{"k":["aX"],"x":["aX"],"o":["aX"],"n":["aX"],"i":[],"f":["aX"],"x.E":"aX","k.E":"aX"},"eO":{"i":[]},"eP":{"E":["c","@"],"i":[],"t":["c","@"],"E.K":"c","E.V":"@"},"eQ":{"d":[],"i":[]},"bL":{"d":[],"i":[]},"fx":{"d":[],"i":[]},"kn":{"ab":[]},"lt":{"o":["j"],"n":["j"],"ab":[],"f":["j"]},"m0":{"o":["j"],"n":["j"],"ab":[],"f":["j"]},"m_":{"o":["j"],"n":["j"],"ab":[],"f":["j"]},"lr":{"o":["j"],"n":["j"],"ab":[],"f":["j"]},"lY":{"o":["j"],"n":["j"],"ab":[],"f":["j"]},"ls":{"o":["j"],"n":["j"],"ab":[],"f":["j"]},"lZ":{"o":["j"],"n":["j"],"ab":[],"f":["j"]},"lo":{"o":["X"],"n":["X"],"ab":[],"f":["X"]},"lp":{"o":["X"],"n":["X"],"ab":[],"f":["X"]}}'))
A.td(v.typeUniverse,JSON.parse('{"n":1,"cY":1,"ar":1,"e7":1,"cZ":2,"el":1,"eX":2,"d3":1}'))
var u={f:"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u03f6\x00\u0404\u03f4 \u03f4\u03f6\u01f6\u01f6\u03f6\u03fc\u01f4\u03ff\u03ff\u0584\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u05d4\u01f4\x00\u01f4\x00\u0504\u05c4\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0400\x00\u0400\u0200\u03f7\u0200\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0200\u0200\u0200\u03f7\x00",p:": URI should have a non-empty host name: ",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.id
return{gS:s("@<~>"),n:s("ao"),az:s("cF"),fj:s("bM"),hp:s("c7"),f_:s("bN"),lo:s("eS"),fW:s("kn"),i9:s("dj<cW,@>"),w:s("bs<c,c>"),d5:s("Y"),cs:s("ad"),jS:s("b0"),gt:s("n<@>"),h:s("C"),W:s("a_"),A:s("p"),l5:s("d"),et:s("aI"),pk:s("lo"),kI:s("lp"),Z:s("cc"),la:s("bw"),ad:s("cJ"),fY:s("bR"),m6:s("lr"),bW:s("ls"),jx:s("lt"),bg:s("oI"),hl:s("f<u>"),e3:s("f<bz>"),R:s("f<@>"),fm:s("f<j>"),hq:s("af<t<c,c>>"),t:s("af<t<c,@>>"),lN:s("af<bc>"),hf:s("af<F>"),dw:s("af<bq<@>>"),s:s("af<c>"),x:s("af<@>"),b:s("af<j>"),T:s("dz"),m:s("i"),dY:s("bx"),dX:s("L<@>"),gq:s("cf<@>"),bX:s("bb<cW,@>"),mz:s("cN"),kT:s("aS"),fO:s("ci<c>"),p:s("o<t<c,@>>"),j:s("o<@>"),L:s("o<j>"),oT:s("o<a1>"),d:s("cO"),if:s("am<j,a1>"),dW:s("t<c,C>"),c:s("t<c,F>"),k:s("t<c,c>"),P:s("t<c,@>"),f:s("t<@,@>"),gQ:s("a0<c,c>"),ib:s("aK"),V:s("aw"),aj:s("aV"),F:s("u"),hU:s("bc"),a:s("aa"),ai:s("aW"),K:s("F"),af:s("bz"),d8:s("aL"),D:s("b1"),lZ:s("vy"),ku:s("bd<@>"),mx:s("bd<a1>"),nZ:s("cV"),gH:s("bV"),i:s("b2<c>"),ls:s("aN"),cA:s("aO"),hH:s("aP"),l:s("bf"),N:s("c"),gL:s("c(c)"),lv:s("ax"),bC:s("r"),bR:s("cW"),fD:s("cX"),dQ:s("aQ"),gJ:s("ay"),I:s("fO"),ki:s("aR"),hk:s("aX"),aJ:s("Z"),do:s("bA"),bl:s("ab"),hM:s("lY"),mC:s("lZ"),nn:s("m_"),ev:s("m0"),cx:s("bC"),eG:s("e_<bz>"),ph:s("bZ<c,c>"),jJ:s("fV"),J:s("I<c>"),hE:s("c_"),kg:s("m5"),f5:s("br"),cz:s("bE<bw>"),ou:s("bE<~>"),nD:s("d_"),aN:s("az"),E:s("cn<p>"),C:s("cn<aw>"),h6:s("co<b1>"),U:s("bi<C>"),gp:s("bi<bz>"),ax:s("W<bw>"),_:s("W<@>"),hy:s("W<j>"),cU:s("W<~>"),dl:s("cq"),mp:s("cr<@,@>"),as:s("cr<F?,F?>"),y:s("H"),iW:s("H(F)"),Q:s("H(c)"),dx:s("X"),z:s("@"),mY:s("@()"),v:s("@(F)"),ng:s("@(F,bf)"),gA:s("@(b2<c>)"),S:s("j"),o:s("bN?"),aa:s("oz?"),mV:s("C?"),O:s("d?"),iC:s("cH?"),dD:s("cI?"),gK:s("ae<aa>?"),ef:s("aJ?"),dH:s("q?"),G:s("bR?"),mU:s("i?"),lH:s("o<@>?"),lG:s("t<c,c>?"),dZ:s("t<c,@>?"),eO:s("t<@,@>?"),X:s("F?"),Y:s("bV?"),jv:s("c?"),q:s("ck?"),e:s("bj<@,@>?"),g:s("hr?"),fU:s("H?"),jX:s("X?"),B:s("@(p)?"),aV:s("j?"),jh:s("a1?"),jE:s("~()?"),oV:s("~(p)?"),b9:s("~(aw)?"),gn:s("~(b1)?"),mW:s("~(H)?"),r:s("a1"),H:s("~"),M:s("~()"),i6:s("~(F)"),fQ:s("~(F,bf)"),bm:s("~(c,c)"),u:s("~(c,@)"),my:s("~(fO)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.Q=A.cE.prototype
B.z=A.c7.prototype
B.n=A.bN.prototype
B.k=A.c9.prototype
B.a2=A.dk.prototype
B.a3=A.dl.prototype
B.a9=A.ds.prototype
B.aa=A.dt.prototype
B.ab=A.du.prototype
B.E=A.dv.prototype
B.F=A.dw.prototype
B.f=A.bR.prototype
B.ac=J.cK.prototype
B.b=J.af.prototype
B.e=J.dy.prototype
B.d=J.ce.prototype
B.a=J.bS.prototype
B.ad=J.bx.prototype
B.ae=J.a.prototype
B.am=A.dJ.prototype
B.K=A.dN.prototype
B.an=A.cQ.prototype
B.l=A.dQ.prototype
B.M=J.fz.prototype
B.o=A.bV.prototype
B.N=A.dV.prototype
B.j=A.dX.prototype
B.O=A.dZ.prototype
B.m=A.ck.prototype
B.x=J.bC.prototype
B.P=A.c_.prototype
B.R=new A.aH(401,!0,null)
B.S=new A.aH(409,!1,null)
B.p=new A.aH(null,!1,null)
B.i=new A.aH(null,!0,null)
B.U=new A.eR(!1)
B.T=new A.dh(B.U)
B.V=new A.eR(!0)
B.y=new A.dh(B.V)
B.u=new A.km()
B.A=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.W=function() {
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
B.a0=function(getTagFallback) {
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
B.X=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.a_=function(hooks) {
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
B.Z=function(hooks) {
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
B.Y=function(hooks) {
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

B.c=new A.fg()
B.a1=new A.fy()
B.q=new A.lP()
B.r=new A.fY()
B.C=new A.mB()
B.h=new A.hE()
B.t=new A.hP()
B.a4=new A.b0(0)
B.a5=new A.b0(1e6)
B.D=new A.b0(1e7)
B.a6=new A.b0(15e6)
B.a7=new A.b0(4e5)
B.a8=new A.b0(6e7)
B.v=new A.ba("",null,null)
B.af=new A.lx(null)
B.ag=new A.ly(null)
B.ah=s([],t.s)
B.G=s([],t.x)
B.H=s(["bind","if","ref","repeat","syntax"],t.s)
B.w=s(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"],t.s)
B.ai=s(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"],t.s)
B.aj=s(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"],t.s)
B.ao={households:0,centralAssets:1,maintenanceLogs:2,workers:3,billingRecords:4,announcements:5,paymentSettings:6,billingConfig:7,offlineCollections:8,unsyncedActions:9}
B.I=new A.bs(B.ao,["waterhall_households","waterhall_central_assets","waterhall_maintenance_logs","waterhall_workers","waterhall_billing_records","waterhall_announcements","waterhall_payment_settings","waterhall_billing_config","waterhall_offline_collections","waterhall_unsynced_actions"],t.w)
B.ap={"/api/billing-records/add":0,"/api/maintenance-logs/add":1,"/api/reports/add":2,"/api/announcements/add":3,"/api/households/update":4}
B.ak=new A.bs(B.ap,["Meter reading and bill","Maintenance report","Service report","Announcement","Household status"],t.w)
B.L={}
B.al=new A.bs(B.L,[],t.w)
B.J=new A.bs(B.L,[],A.id("bs<cW,@>"))
B.aq=new A.bX("call")
B.ar=A.bl("eS")
B.as=A.bl("kn")
B.at=A.bl("lo")
B.au=A.bl("lp")
B.av=A.bl("lr")
B.aw=A.bl("ls")
B.ax=A.bl("lt")
B.ay=A.bl("F")
B.az=A.bl("lY")
B.aA=A.bl("lZ")
B.aB=A.bl("m_")
B.aC=A.bl("m0")
B.aD=new A.m4(!1)})();(function staticFields(){$.mv=null
$.aZ=A.D([],t.hf)
$.oU=null
$.ox=null
$.ow=null
$.q4=null
$.q0=null
$.q9=null
$.n5=null
$.nb=null
$.oh=null
$.da=null
$.eD=null
$.eE=null
$.oa=!1
$.Q=B.h
$.p8=""
$.p9=null
$.bP=null
$.nz=null
$.oE=null
$.oD=null
$.hk=A.ap(t.N,t.Z)
$.uR=A.a3(["main_tank_level",null,"turbidity",null,"tds_ppm",null,"turbidity_status","unknown","has_reading",!1,"turbidity_desc","Awaiting sensor readings","last_updated",null],t.N,t.z)
$.q3=function(){var s=t.N
return A.a3(["payment_location","Barangay Tagpopongan Hall - Treasury Office","payment_method","In-Person Payment at Barangay Hall","allow_worker_collection","false","payment_instructions","Water bills are due on or before the 25th of each month. Payments must be settled in-person at the Barangay Hall Treasury Window. Field workers are not authorized to collect payments.","operating_hours","Monday - Friday, 8:00 AM - 5:00 PM","emergency_contact","Not configured; contact the Barangay office"],s,s)}()})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"vc","ij",()=>A.og("_$dart_dartClosure"))
s($,"vb","qh",()=>A.og("_$dart_dartClosure_dartJSInterop"))
s($,"w5","nq",()=>B.h.dE(new A.ni(),A.id("ae<~>")))
s($,"w1","oq",()=>A.D([new J.fa()],A.id("af<cU>")))
s($,"vD","qo",()=>A.bB(A.lX({
toString:function(){return"$receiver$"}})))
s($,"vE","qp",()=>A.bB(A.lX({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"vF","qq",()=>A.bB(A.lX(null)))
s($,"vG","qr",()=>A.bB(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"vJ","qu",()=>A.bB(A.lX(void 0)))
s($,"vK","qv",()=>A.bB(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"vI","qt",()=>A.bB(A.p5(null)))
s($,"vH","qs",()=>A.bB(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"vM","qx",()=>A.bB(A.p5(void 0)))
s($,"vL","qw",()=>A.bB(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"vP","om",()=>A.rK())
s($,"vm","nn",()=>$.nq())
s($,"vX","qC",()=>A.oR(4096))
s($,"vV","qA",()=>new A.mO().$0())
s($,"vW","qB",()=>new A.mN().$0())
s($,"vR","on",()=>A.rs(A.tL(A.D([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.b))))
s($,"vQ","qy",()=>A.oR(0))
s($,"vd","qi",()=>A.lN("^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(?:[.,](\\d+))?)?)?( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$"))
s($,"w_","no",()=>A.ih(B.ay))
s($,"v8","qg",()=>({}))
s($,"vT","qz",()=>A.oQ(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],t.N))
s($,"v4","qf",()=>A.lN("^\\S+$"))
s($,"vi","ol",()=>B.a.bq(A.ny(),"Opera",0))
s($,"vh","ql",()=>!$.ol()&&B.a.bq(A.ny(),"Trident/",0))
s($,"vg","qk",()=>B.a.bq(A.ny(),"Firefox",0))
s($,"vf","qj",()=>"-"+$.qm()+"-")
s($,"vj","qm",()=>{if($.qk())var q="moz"
else if($.ql())q="ms"
else q=$.ol()?"o":"webkit"
return q})
s($,"vY","c5",()=>A.tF(A.ob(self)))
s($,"w0","np",()=>{$.oq().push(new A.hG())
return!0})
s($,"vS","oo",()=>A.og("_$dart_dartObject"))
s($,"vZ","op",()=>function DartObject(a){this.o=a})
s($,"vx","qn",()=>{var q=new A.mu(new DataView(new ArrayBuffer(A.tG(8))))
q.em()
return q})
s($,"w2","O",()=>{var q,p=t.t,o=A.D([],p),n=t.N,m=t.z,l=A.D([],p),k=A.D([],p),j=A.D([],p)
p=A.D([],p)
q=A.nB(null,t.H)
return new A.kr(o,A.ap(n,m),l,k,j,p,A.ap(n,n),A.ap(n,m),A.ap(n,t.p),q,new A.e2(null,null,A.id("e2<t<c,@>>")))})
r($,"ua","qD",()=>A.nB(null,t.H))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({WebGL:J.cK,AnimationEffectReadOnly:J.a,AnimationEffectTiming:J.a,AnimationEffectTimingReadOnly:J.a,AnimationTimeline:J.a,AnimationWorkletGlobalScope:J.a,AuthenticatorAssertionResponse:J.a,AuthenticatorAttestationResponse:J.a,AuthenticatorResponse:J.a,BackgroundFetchFetch:J.a,BackgroundFetchManager:J.a,BackgroundFetchSettledFetch:J.a,BarProp:J.a,BarcodeDetector:J.a,BluetoothRemoteGATTDescriptor:J.a,Body:J.a,BudgetState:J.a,CacheStorage:J.a,CanvasGradient:J.a,CanvasPattern:J.a,CanvasRenderingContext2D:J.a,Client:J.a,Clients:J.a,CookieStore:J.a,Coordinates:J.a,Credential:J.a,CredentialUserData:J.a,CredentialsContainer:J.a,Crypto:J.a,CryptoKey:J.a,CSS:J.a,CSSVariableReferenceValue:J.a,CustomElementRegistry:J.a,DataTransfer:J.a,DataTransferItem:J.a,DeprecatedStorageInfo:J.a,DeprecatedStorageQuota:J.a,DeprecationReport:J.a,DetectedBarcode:J.a,DetectedFace:J.a,DetectedText:J.a,DeviceAcceleration:J.a,DeviceRotationRate:J.a,DirectoryEntry:J.a,webkitFileSystemDirectoryEntry:J.a,FileSystemDirectoryEntry:J.a,DirectoryReader:J.a,WebKitDirectoryReader:J.a,webkitFileSystemDirectoryReader:J.a,FileSystemDirectoryReader:J.a,DocumentOrShadowRoot:J.a,DocumentTimeline:J.a,DOMError:J.a,Iterator:J.a,DOMMatrix:J.a,DOMMatrixReadOnly:J.a,DOMParser:J.a,DOMPoint:J.a,DOMPointReadOnly:J.a,DOMQuad:J.a,DOMStringMap:J.a,Entry:J.a,webkitFileSystemEntry:J.a,FileSystemEntry:J.a,External:J.a,FaceDetector:J.a,FederatedCredential:J.a,FileEntry:J.a,webkitFileSystemFileEntry:J.a,FileSystemFileEntry:J.a,DOMFileSystem:J.a,WebKitFileSystem:J.a,webkitFileSystem:J.a,FileSystem:J.a,FontFace:J.a,FontFaceSource:J.a,FormData:J.a,GamepadButton:J.a,GamepadPose:J.a,Geolocation:J.a,Position:J.a,GeolocationPosition:J.a,Headers:J.a,HTMLHyperlinkElementUtils:J.a,IdleDeadline:J.a,ImageBitmap:J.a,ImageBitmapRenderingContext:J.a,ImageCapture:J.a,InputDeviceCapabilities:J.a,IntersectionObserver:J.a,IntersectionObserverEntry:J.a,InterventionReport:J.a,KeyframeEffect:J.a,KeyframeEffectReadOnly:J.a,MediaCapabilities:J.a,MediaCapabilitiesInfo:J.a,MediaDeviceInfo:J.a,MediaError:J.a,MediaKeyStatusMap:J.a,MediaKeySystemAccess:J.a,MediaKeys:J.a,MediaKeysPolicy:J.a,MediaMetadata:J.a,MediaSession:J.a,MediaSettingsRange:J.a,MemoryInfo:J.a,MessageChannel:J.a,Metadata:J.a,MutationObserver:J.a,WebKitMutationObserver:J.a,MutationRecord:J.a,NavigationPreloadManager:J.a,Navigator:J.a,NavigatorAutomationInformation:J.a,NavigatorConcurrentHardware:J.a,NavigatorCookies:J.a,NavigatorUserMediaError:J.a,NodeFilter:J.a,NodeIterator:J.a,NonDocumentTypeChildNode:J.a,NonElementParentNode:J.a,NoncedElement:J.a,OffscreenCanvasRenderingContext2D:J.a,OverconstrainedError:J.a,PaintRenderingContext2D:J.a,PaintSize:J.a,PaintWorkletGlobalScope:J.a,PasswordCredential:J.a,Path2D:J.a,PaymentAddress:J.a,PaymentInstruments:J.a,PaymentManager:J.a,PaymentResponse:J.a,PerformanceEntry:J.a,PerformanceLongTaskTiming:J.a,PerformanceMark:J.a,PerformanceMeasure:J.a,PerformanceNavigation:J.a,PerformanceNavigationTiming:J.a,PerformanceObserver:J.a,PerformanceObserverEntryList:J.a,PerformancePaintTiming:J.a,PerformanceResourceTiming:J.a,PerformanceServerTiming:J.a,PerformanceTiming:J.a,Permissions:J.a,PhotoCapabilities:J.a,PositionError:J.a,GeolocationPositionError:J.a,Presentation:J.a,PresentationReceiver:J.a,PublicKeyCredential:J.a,PushManager:J.a,PushMessageData:J.a,PushSubscription:J.a,PushSubscriptionOptions:J.a,Range:J.a,RelatedApplication:J.a,ReportBody:J.a,ReportingObserver:J.a,ResizeObserver:J.a,ResizeObserverEntry:J.a,RTCCertificate:J.a,RTCIceCandidate:J.a,mozRTCIceCandidate:J.a,RTCLegacyStatsReport:J.a,RTCRtpContributingSource:J.a,RTCRtpReceiver:J.a,RTCRtpSender:J.a,RTCSessionDescription:J.a,mozRTCSessionDescription:J.a,RTCStatsResponse:J.a,Screen:J.a,ScrollState:J.a,ScrollTimeline:J.a,Selection:J.a,SpeechRecognitionAlternative:J.a,SpeechSynthesisVoice:J.a,StaticRange:J.a,StorageManager:J.a,StyleMedia:J.a,StylePropertyMap:J.a,StylePropertyMapReadonly:J.a,SyncManager:J.a,TaskAttributionTiming:J.a,TextDetector:J.a,TextMetrics:J.a,TrackDefault:J.a,TreeWalker:J.a,TrustedHTML:J.a,TrustedScriptURL:J.a,TrustedURL:J.a,UnderlyingSourceBase:J.a,URLSearchParams:J.a,VRCoordinateSystem:J.a,VRDisplayCapabilities:J.a,VREyeParameters:J.a,VRFrameData:J.a,VRFrameOfReference:J.a,VRPose:J.a,VRStageBounds:J.a,VRStageBoundsPoint:J.a,VRStageParameters:J.a,ValidityState:J.a,VideoPlaybackQuality:J.a,VideoTrack:J.a,VTTRegion:J.a,WindowClient:J.a,WorkletAnimation:J.a,WorkletGlobalScope:J.a,XPathEvaluator:J.a,XPathExpression:J.a,XPathNSResolver:J.a,XPathResult:J.a,XMLSerializer:J.a,XSLTProcessor:J.a,Bluetooth:J.a,BluetoothCharacteristicProperties:J.a,BluetoothRemoteGATTServer:J.a,BluetoothRemoteGATTService:J.a,BluetoothUUID:J.a,BudgetService:J.a,Cache:J.a,DOMFileSystemSync:J.a,DirectoryEntrySync:J.a,DirectoryReaderSync:J.a,EntrySync:J.a,FileEntrySync:J.a,FileReaderSync:J.a,FileWriterSync:J.a,HTMLAllCollection:J.a,Mojo:J.a,MojoHandle:J.a,MojoWatcher:J.a,NFC:J.a,PagePopupController:J.a,Report:J.a,Request:J.a,Response:J.a,SubtleCrypto:J.a,USBAlternateInterface:J.a,USBConfiguration:J.a,USBDevice:J.a,USBEndpoint:J.a,USBInTransferResult:J.a,USBInterface:J.a,USBIsochronousInTransferPacket:J.a,USBIsochronousInTransferResult:J.a,USBIsochronousOutTransferPacket:J.a,USBIsochronousOutTransferResult:J.a,USBOutTransferResult:J.a,WorkerLocation:J.a,WorkerNavigator:J.a,Worklet:J.a,IDBCursor:J.a,IDBCursorWithValue:J.a,IDBFactory:J.a,IDBIndex:J.a,IDBObjectStore:J.a,IDBObservation:J.a,IDBObserver:J.a,IDBObserverChanges:J.a,SVGAngle:J.a,SVGAnimatedAngle:J.a,SVGAnimatedBoolean:J.a,SVGAnimatedEnumeration:J.a,SVGAnimatedInteger:J.a,SVGAnimatedLength:J.a,SVGAnimatedLengthList:J.a,SVGAnimatedNumber:J.a,SVGAnimatedNumberList:J.a,SVGAnimatedPreserveAspectRatio:J.a,SVGAnimatedRect:J.a,SVGAnimatedString:J.a,SVGAnimatedTransformList:J.a,SVGMatrix:J.a,SVGPoint:J.a,SVGPreserveAspectRatio:J.a,SVGRect:J.a,SVGUnitTypes:J.a,AudioListener:J.a,AudioParam:J.a,AudioTrack:J.a,AudioWorkletGlobalScope:J.a,AudioWorkletProcessor:J.a,PeriodicWave:J.a,WebGLActiveInfo:J.a,ANGLEInstancedArrays:J.a,ANGLE_instanced_arrays:J.a,WebGLBuffer:J.a,WebGLCanvas:J.a,WebGLColorBufferFloat:J.a,WebGLCompressedTextureASTC:J.a,WebGLCompressedTextureATC:J.a,WEBGL_compressed_texture_atc:J.a,WebGLCompressedTextureETC1:J.a,WEBGL_compressed_texture_etc1:J.a,WebGLCompressedTextureETC:J.a,WebGLCompressedTexturePVRTC:J.a,WEBGL_compressed_texture_pvrtc:J.a,WebGLCompressedTextureS3TC:J.a,WEBGL_compressed_texture_s3tc:J.a,WebGLCompressedTextureS3TCsRGB:J.a,WebGLDebugRendererInfo:J.a,WEBGL_debug_renderer_info:J.a,WebGLDebugShaders:J.a,WEBGL_debug_shaders:J.a,WebGLDepthTexture:J.a,WEBGL_depth_texture:J.a,WebGLDrawBuffers:J.a,WEBGL_draw_buffers:J.a,EXTsRGB:J.a,EXT_sRGB:J.a,EXTBlendMinMax:J.a,EXT_blend_minmax:J.a,EXTColorBufferFloat:J.a,EXTColorBufferHalfFloat:J.a,EXTDisjointTimerQuery:J.a,EXTDisjointTimerQueryWebGL2:J.a,EXTFragDepth:J.a,EXT_frag_depth:J.a,EXTShaderTextureLOD:J.a,EXT_shader_texture_lod:J.a,EXTTextureFilterAnisotropic:J.a,EXT_texture_filter_anisotropic:J.a,WebGLFramebuffer:J.a,WebGLGetBufferSubDataAsync:J.a,WebGLLoseContext:J.a,WebGLExtensionLoseContext:J.a,WEBGL_lose_context:J.a,OESElementIndexUint:J.a,OES_element_index_uint:J.a,OESStandardDerivatives:J.a,OES_standard_derivatives:J.a,OESTextureFloat:J.a,OES_texture_float:J.a,OESTextureFloatLinear:J.a,OES_texture_float_linear:J.a,OESTextureHalfFloat:J.a,OES_texture_half_float:J.a,OESTextureHalfFloatLinear:J.a,OES_texture_half_float_linear:J.a,OESVertexArrayObject:J.a,OES_vertex_array_object:J.a,WebGLProgram:J.a,WebGLQuery:J.a,WebGLRenderbuffer:J.a,WebGLRenderingContext:J.a,WebGL2RenderingContext:J.a,WebGLSampler:J.a,WebGLShader:J.a,WebGLShaderPrecisionFormat:J.a,WebGLSync:J.a,WebGLTexture:J.a,WebGLTimerQueryEXT:J.a,WebGLTransformFeedback:J.a,WebGLUniformLocation:J.a,WebGLVertexArrayObject:J.a,WebGLVertexArrayObjectOES:J.a,WebGL2RenderingContextBase:J.a,ArrayBuffer:A.cj,SharedArrayBuffer:A.cj,ArrayBufferView:A.dL,DataView:A.dJ,Float32Array:A.fo,Float64Array:A.fp,Int16Array:A.fq,Int32Array:A.fr,Int8Array:A.fs,Uint16Array:A.ft,Uint32Array:A.fu,Uint8ClampedArray:A.dM,CanvasPixelArray:A.dM,Uint8Array:A.dN,HTMLAudioElement:A.q,HTMLBRElement:A.q,HTMLCanvasElement:A.q,HTMLContentElement:A.q,HTMLDListElement:A.q,HTMLDataElement:A.q,HTMLDataListElement:A.q,HTMLDetailsElement:A.q,HTMLDialogElement:A.q,HTMLEmbedElement:A.q,HTMLFieldSetElement:A.q,HTMLHRElement:A.q,HTMLHeadElement:A.q,HTMLHtmlElement:A.q,HTMLIFrameElement:A.q,HTMLLIElement:A.q,HTMLLabelElement:A.q,HTMLLegendElement:A.q,HTMLLinkElement:A.q,HTMLMapElement:A.q,HTMLMediaElement:A.q,HTMLMenuElement:A.q,HTMLMetaElement:A.q,HTMLMeterElement:A.q,HTMLModElement:A.q,HTMLOListElement:A.q,HTMLObjectElement:A.q,HTMLOptGroupElement:A.q,HTMLOutputElement:A.q,HTMLParamElement:A.q,HTMLPictureElement:A.q,HTMLPreElement:A.q,HTMLProgressElement:A.q,HTMLQuoteElement:A.q,HTMLScriptElement:A.q,HTMLShadowElement:A.q,HTMLSlotElement:A.q,HTMLSourceElement:A.q,HTMLStyleElement:A.q,HTMLTableCaptionElement:A.q,HTMLTableCellElement:A.q,HTMLTableDataCellElement:A.q,HTMLTableHeaderCellElement:A.q,HTMLTableColElement:A.q,HTMLTimeElement:A.q,HTMLTitleElement:A.q,HTMLTrackElement:A.q,HTMLUListElement:A.q,HTMLUnknownElement:A.q,HTMLVideoElement:A.q,HTMLDirectoryElement:A.q,HTMLFontElement:A.q,HTMLFrameElement:A.q,HTMLFrameSetElement:A.q,HTMLMarqueeElement:A.q,HTMLElement:A.q,AccessibleNodeList:A.eJ,HTMLAnchorElement:A.cE,HTMLAreaElement:A.eK,HTMLBaseElement:A.cF,Blob:A.bM,HTMLBodyElement:A.c7,HTMLButtonElement:A.bN,CDATASection:A.bn,CharacterData:A.bn,Comment:A.bn,ProcessingInstruction:A.bn,Text:A.bn,CSSPerspective:A.eZ,CSSCharsetRule:A.Y,CSSConditionRule:A.Y,CSSFontFaceRule:A.Y,CSSGroupingRule:A.Y,CSSImportRule:A.Y,CSSKeyframeRule:A.Y,MozCSSKeyframeRule:A.Y,WebKitCSSKeyframeRule:A.Y,CSSKeyframesRule:A.Y,MozCSSKeyframesRule:A.Y,WebKitCSSKeyframesRule:A.Y,CSSMediaRule:A.Y,CSSNamespaceRule:A.Y,CSSPageRule:A.Y,CSSRule:A.Y,CSSStyleRule:A.Y,CSSSupportsRule:A.Y,CSSViewportRule:A.Y,CSSStyleDeclaration:A.c9,MSStyleCSSProperties:A.c9,CSS2Properties:A.c9,CSSImageValue:A.aC,CSSKeywordValue:A.aC,CSSNumericValue:A.aC,CSSPositionValue:A.aC,CSSResourceValue:A.aC,CSSUnitValue:A.aC,CSSURLImageValue:A.aC,CSSStyleValue:A.aC,CSSMatrixComponent:A.b9,CSSRotation:A.b9,CSSScale:A.b9,CSSSkew:A.b9,CSSTranslation:A.b9,CSSTransformComponent:A.b9,CSSTransformValue:A.f_,CSSUnparsedValue:A.f0,DataTransferItemList:A.f1,HTMLDivElement:A.dk,XMLDocument:A.ca,Document:A.ca,DOMException:A.f2,DOMImplementation:A.dl,ClientRectList:A.dm,DOMRectList:A.dm,DOMRectReadOnly:A.dn,DOMStringList:A.f3,DOMTokenList:A.f4,MathMLElement:A.C,Element:A.C,AbortPaymentEvent:A.p,AnimationEvent:A.p,AnimationPlaybackEvent:A.p,ApplicationCacheErrorEvent:A.p,BackgroundFetchClickEvent:A.p,BackgroundFetchEvent:A.p,BackgroundFetchFailEvent:A.p,BackgroundFetchedEvent:A.p,BeforeInstallPromptEvent:A.p,BeforeUnloadEvent:A.p,BlobEvent:A.p,CanMakePaymentEvent:A.p,ClipboardEvent:A.p,CloseEvent:A.p,CustomEvent:A.p,DeviceMotionEvent:A.p,DeviceOrientationEvent:A.p,ErrorEvent:A.p,ExtendableEvent:A.p,ExtendableMessageEvent:A.p,FetchEvent:A.p,FontFaceSetLoadEvent:A.p,ForeignFetchEvent:A.p,GamepadEvent:A.p,HashChangeEvent:A.p,InstallEvent:A.p,MediaEncryptedEvent:A.p,MediaKeyMessageEvent:A.p,MediaQueryListEvent:A.p,MediaStreamEvent:A.p,MediaStreamTrackEvent:A.p,MessageEvent:A.p,MIDIConnectionEvent:A.p,MIDIMessageEvent:A.p,MutationEvent:A.p,NotificationEvent:A.p,PageTransitionEvent:A.p,PaymentRequestEvent:A.p,PaymentRequestUpdateEvent:A.p,PopStateEvent:A.p,PresentationConnectionAvailableEvent:A.p,PresentationConnectionCloseEvent:A.p,PromiseRejectionEvent:A.p,PushEvent:A.p,RTCDataChannelEvent:A.p,RTCDTMFToneChangeEvent:A.p,RTCPeerConnectionIceEvent:A.p,RTCTrackEvent:A.p,SecurityPolicyViolationEvent:A.p,SensorErrorEvent:A.p,SpeechRecognitionError:A.p,SpeechRecognitionEvent:A.p,SpeechSynthesisEvent:A.p,StorageEvent:A.p,SyncEvent:A.p,TrackEvent:A.p,TransitionEvent:A.p,WebKitTransitionEvent:A.p,VRDeviceEvent:A.p,VRDisplayEvent:A.p,VRSessionEvent:A.p,MojoInterfaceRequestEvent:A.p,USBConnectionEvent:A.p,IDBVersionChangeEvent:A.p,AudioProcessingEvent:A.p,OfflineAudioCompletionEvent:A.p,WebGLContextEvent:A.p,Event:A.p,InputEvent:A.p,SubmitEvent:A.p,EventSource:A.dq,AbsoluteOrientationSensor:A.d,Accelerometer:A.d,AccessibleNode:A.d,AmbientLightSensor:A.d,Animation:A.d,ApplicationCache:A.d,DOMApplicationCache:A.d,OfflineResourceList:A.d,BackgroundFetchRegistration:A.d,BatteryManager:A.d,BroadcastChannel:A.d,CanvasCaptureMediaStreamTrack:A.d,FontFaceSet:A.d,Gyroscope:A.d,LinearAccelerationSensor:A.d,Magnetometer:A.d,MediaDevices:A.d,MediaKeySession:A.d,MediaQueryList:A.d,MediaRecorder:A.d,MediaSource:A.d,MediaStream:A.d,MediaStreamTrack:A.d,MIDIAccess:A.d,MIDIInput:A.d,MIDIOutput:A.d,MIDIPort:A.d,NetworkInformation:A.d,Notification:A.d,OffscreenCanvas:A.d,OrientationSensor:A.d,PaymentRequest:A.d,Performance:A.d,PermissionStatus:A.d,PresentationAvailability:A.d,PresentationConnection:A.d,PresentationConnectionList:A.d,PresentationRequest:A.d,RelativeOrientationSensor:A.d,RemotePlayback:A.d,RTCDataChannel:A.d,DataChannel:A.d,RTCDTMFSender:A.d,RTCPeerConnection:A.d,webkitRTCPeerConnection:A.d,mozRTCPeerConnection:A.d,ScreenOrientation:A.d,Sensor:A.d,ServiceWorker:A.d,ServiceWorkerContainer:A.d,ServiceWorkerRegistration:A.d,SharedWorker:A.d,SpeechRecognition:A.d,webkitSpeechRecognition:A.d,SpeechSynthesis:A.d,SpeechSynthesisUtterance:A.d,VR:A.d,VRDevice:A.d,VRDisplay:A.d,VRSession:A.d,VisualViewport:A.d,WebSocket:A.d,Worker:A.d,WorkerPerformance:A.d,BluetoothDevice:A.d,BluetoothRemoteGATTCharacteristic:A.d,Clipboard:A.d,MojoInterfaceInterceptor:A.d,USB:A.d,IDBDatabase:A.d,IDBOpenDBRequest:A.d,IDBVersionChangeRequest:A.d,IDBRequest:A.d,IDBTransaction:A.d,AnalyserNode:A.d,RealtimeAnalyserNode:A.d,AudioBufferSourceNode:A.d,AudioDestinationNode:A.d,AudioNode:A.d,AudioScheduledSourceNode:A.d,AudioWorkletNode:A.d,BiquadFilterNode:A.d,ChannelMergerNode:A.d,AudioChannelMerger:A.d,ChannelSplitterNode:A.d,AudioChannelSplitter:A.d,ConstantSourceNode:A.d,ConvolverNode:A.d,DelayNode:A.d,DynamicsCompressorNode:A.d,GainNode:A.d,AudioGainNode:A.d,IIRFilterNode:A.d,MediaElementAudioSourceNode:A.d,MediaStreamAudioDestinationNode:A.d,MediaStreamAudioSourceNode:A.d,OscillatorNode:A.d,Oscillator:A.d,PannerNode:A.d,AudioPannerNode:A.d,webkitAudioPannerNode:A.d,ScriptProcessorNode:A.d,JavaScriptAudioNode:A.d,StereoPannerNode:A.d,WaveShaperNode:A.d,EventTarget:A.d,File:A.aI,FileList:A.ds,FileReader:A.dt,FileWriter:A.f6,HTMLFormElement:A.cI,Gamepad:A.aJ,HTMLHeadingElement:A.du,History:A.f8,HTMLCollection:A.bQ,HTMLFormControlsCollection:A.bQ,HTMLOptionsCollection:A.bQ,HTMLDocument:A.dv,XMLHttpRequest:A.bw,XMLHttpRequestUpload:A.cd,XMLHttpRequestEventTarget:A.cd,ImageData:A.cJ,HTMLImageElement:A.dw,HTMLInputElement:A.bR,Location:A.cO,MediaList:A.fj,MessagePort:A.fk,MIDIInputMap:A.fl,MIDIOutputMap:A.fm,MimeType:A.aK,MimeTypeArray:A.fn,MouseEvent:A.aw,DragEvent:A.aw,PointerEvent:A.aw,WheelEvent:A.aw,DocumentFragment:A.u,ShadowRoot:A.u,DocumentType:A.u,Node:A.u,NodeList:A.cQ,RadioNodeList:A.cQ,HTMLOptionElement:A.bz,HTMLParagraphElement:A.dQ,Plugin:A.aL,PluginArray:A.fA,ProgressEvent:A.b1,ResourceProgressEvent:A.b1,RTCStatsReport:A.fC,HTMLSelectElement:A.bV,SourceBuffer:A.aN,SourceBufferList:A.fE,HTMLSpanElement:A.dV,SpeechGrammar:A.aO,SpeechGrammarList:A.fF,SpeechRecognitionResult:A.aP,Storage:A.dX,CSSStyleSheet:A.ax,StyleSheet:A.ax,HTMLTableElement:A.dZ,HTMLTableRowElement:A.fI,HTMLTableSectionElement:A.fJ,HTMLTemplateElement:A.cX,HTMLTextAreaElement:A.ck,TextTrack:A.aQ,TextTrackCue:A.ay,VTTCue:A.ay,TextTrackCueList:A.fL,TextTrackList:A.fM,TimeRanges:A.fN,Touch:A.aR,TouchList:A.fQ,TrackDefaultList:A.fR,CompositionEvent:A.bg,FocusEvent:A.bg,KeyboardEvent:A.bg,TextEvent:A.bg,TouchEvent:A.bg,UIEvent:A.bg,URL:A.fX,VideoTrackList:A.fZ,Window:A.c_,DOMWindow:A.c_,DedicatedWorkerGlobalScope:A.br,ServiceWorkerGlobalScope:A.br,SharedWorkerGlobalScope:A.br,WorkerGlobalScope:A.br,Attr:A.d_,CSSRuleList:A.h5,ClientRect:A.e8,DOMRect:A.e8,GamepadList:A.hj,NamedNodeMap:A.eg,MozNamedAttrMap:A.eg,SpeechRecognitionResultList:A.hK,StyleSheetList:A.hQ,IDBKeyRange:A.cN,SVGLength:A.aS,SVGLengthList:A.fi,SVGNumber:A.aW,SVGNumberList:A.fw,SVGPointList:A.fB,SVGScriptElement:A.cV,SVGStringList:A.fH,SVGAElement:A.r,SVGAnimateElement:A.r,SVGAnimateMotionElement:A.r,SVGAnimateTransformElement:A.r,SVGAnimationElement:A.r,SVGCircleElement:A.r,SVGClipPathElement:A.r,SVGDefsElement:A.r,SVGDescElement:A.r,SVGDiscardElement:A.r,SVGEllipseElement:A.r,SVGFEBlendElement:A.r,SVGFEColorMatrixElement:A.r,SVGFEComponentTransferElement:A.r,SVGFECompositeElement:A.r,SVGFEConvolveMatrixElement:A.r,SVGFEDiffuseLightingElement:A.r,SVGFEDisplacementMapElement:A.r,SVGFEDistantLightElement:A.r,SVGFEFloodElement:A.r,SVGFEFuncAElement:A.r,SVGFEFuncBElement:A.r,SVGFEFuncGElement:A.r,SVGFEFuncRElement:A.r,SVGFEGaussianBlurElement:A.r,SVGFEImageElement:A.r,SVGFEMergeElement:A.r,SVGFEMergeNodeElement:A.r,SVGFEMorphologyElement:A.r,SVGFEOffsetElement:A.r,SVGFEPointLightElement:A.r,SVGFESpecularLightingElement:A.r,SVGFESpotLightElement:A.r,SVGFETileElement:A.r,SVGFETurbulenceElement:A.r,SVGFilterElement:A.r,SVGForeignObjectElement:A.r,SVGGElement:A.r,SVGGeometryElement:A.r,SVGGraphicsElement:A.r,SVGImageElement:A.r,SVGLineElement:A.r,SVGLinearGradientElement:A.r,SVGMarkerElement:A.r,SVGMaskElement:A.r,SVGMetadataElement:A.r,SVGPathElement:A.r,SVGPatternElement:A.r,SVGPolygonElement:A.r,SVGPolylineElement:A.r,SVGRadialGradientElement:A.r,SVGRectElement:A.r,SVGSetElement:A.r,SVGStopElement:A.r,SVGStyleElement:A.r,SVGSVGElement:A.r,SVGSwitchElement:A.r,SVGSymbolElement:A.r,SVGTSpanElement:A.r,SVGTextContentElement:A.r,SVGTextElement:A.r,SVGTextPathElement:A.r,SVGTextPositioningElement:A.r,SVGTitleElement:A.r,SVGUseElement:A.r,SVGViewElement:A.r,SVGGradientElement:A.r,SVGComponentTransferFunctionElement:A.r,SVGFEDropShadowElement:A.r,SVGMPathElement:A.r,SVGElement:A.r,SVGTransform:A.aX,SVGTransformList:A.fS,AudioBuffer:A.eO,AudioParamMap:A.eP,AudioTrackList:A.eQ,AudioContext:A.bL,webkitAudioContext:A.bL,BaseAudioContext:A.bL,OfflineAudioContext:A.fx})
hunkHelpers.setOrUpdateLeafTags({WebGL:true,AnimationEffectReadOnly:true,AnimationEffectTiming:true,AnimationEffectTimingReadOnly:true,AnimationTimeline:true,AnimationWorkletGlobalScope:true,AuthenticatorAssertionResponse:true,AuthenticatorAttestationResponse:true,AuthenticatorResponse:true,BackgroundFetchFetch:true,BackgroundFetchManager:true,BackgroundFetchSettledFetch:true,BarProp:true,BarcodeDetector:true,BluetoothRemoteGATTDescriptor:true,Body:true,BudgetState:true,CacheStorage:true,CanvasGradient:true,CanvasPattern:true,CanvasRenderingContext2D:true,Client:true,Clients:true,CookieStore:true,Coordinates:true,Credential:true,CredentialUserData:true,CredentialsContainer:true,Crypto:true,CryptoKey:true,CSS:true,CSSVariableReferenceValue:true,CustomElementRegistry:true,DataTransfer:true,DataTransferItem:true,DeprecatedStorageInfo:true,DeprecatedStorageQuota:true,DeprecationReport:true,DetectedBarcode:true,DetectedFace:true,DetectedText:true,DeviceAcceleration:true,DeviceRotationRate:true,DirectoryEntry:true,webkitFileSystemDirectoryEntry:true,FileSystemDirectoryEntry:true,DirectoryReader:true,WebKitDirectoryReader:true,webkitFileSystemDirectoryReader:true,FileSystemDirectoryReader:true,DocumentOrShadowRoot:true,DocumentTimeline:true,DOMError:true,Iterator:true,DOMMatrix:true,DOMMatrixReadOnly:true,DOMParser:true,DOMPoint:true,DOMPointReadOnly:true,DOMQuad:true,DOMStringMap:true,Entry:true,webkitFileSystemEntry:true,FileSystemEntry:true,External:true,FaceDetector:true,FederatedCredential:true,FileEntry:true,webkitFileSystemFileEntry:true,FileSystemFileEntry:true,DOMFileSystem:true,WebKitFileSystem:true,webkitFileSystem:true,FileSystem:true,FontFace:true,FontFaceSource:true,FormData:true,GamepadButton:true,GamepadPose:true,Geolocation:true,Position:true,GeolocationPosition:true,Headers:true,HTMLHyperlinkElementUtils:true,IdleDeadline:true,ImageBitmap:true,ImageBitmapRenderingContext:true,ImageCapture:true,InputDeviceCapabilities:true,IntersectionObserver:true,IntersectionObserverEntry:true,InterventionReport:true,KeyframeEffect:true,KeyframeEffectReadOnly:true,MediaCapabilities:true,MediaCapabilitiesInfo:true,MediaDeviceInfo:true,MediaError:true,MediaKeyStatusMap:true,MediaKeySystemAccess:true,MediaKeys:true,MediaKeysPolicy:true,MediaMetadata:true,MediaSession:true,MediaSettingsRange:true,MemoryInfo:true,MessageChannel:true,Metadata:true,MutationObserver:true,WebKitMutationObserver:true,MutationRecord:true,NavigationPreloadManager:true,Navigator:true,NavigatorAutomationInformation:true,NavigatorConcurrentHardware:true,NavigatorCookies:true,NavigatorUserMediaError:true,NodeFilter:true,NodeIterator:true,NonDocumentTypeChildNode:true,NonElementParentNode:true,NoncedElement:true,OffscreenCanvasRenderingContext2D:true,OverconstrainedError:true,PaintRenderingContext2D:true,PaintSize:true,PaintWorkletGlobalScope:true,PasswordCredential:true,Path2D:true,PaymentAddress:true,PaymentInstruments:true,PaymentManager:true,PaymentResponse:true,PerformanceEntry:true,PerformanceLongTaskTiming:true,PerformanceMark:true,PerformanceMeasure:true,PerformanceNavigation:true,PerformanceNavigationTiming:true,PerformanceObserver:true,PerformanceObserverEntryList:true,PerformancePaintTiming:true,PerformanceResourceTiming:true,PerformanceServerTiming:true,PerformanceTiming:true,Permissions:true,PhotoCapabilities:true,PositionError:true,GeolocationPositionError:true,Presentation:true,PresentationReceiver:true,PublicKeyCredential:true,PushManager:true,PushMessageData:true,PushSubscription:true,PushSubscriptionOptions:true,Range:true,RelatedApplication:true,ReportBody:true,ReportingObserver:true,ResizeObserver:true,ResizeObserverEntry:true,RTCCertificate:true,RTCIceCandidate:true,mozRTCIceCandidate:true,RTCLegacyStatsReport:true,RTCRtpContributingSource:true,RTCRtpReceiver:true,RTCRtpSender:true,RTCSessionDescription:true,mozRTCSessionDescription:true,RTCStatsResponse:true,Screen:true,ScrollState:true,ScrollTimeline:true,Selection:true,SpeechRecognitionAlternative:true,SpeechSynthesisVoice:true,StaticRange:true,StorageManager:true,StyleMedia:true,StylePropertyMap:true,StylePropertyMapReadonly:true,SyncManager:true,TaskAttributionTiming:true,TextDetector:true,TextMetrics:true,TrackDefault:true,TreeWalker:true,TrustedHTML:true,TrustedScriptURL:true,TrustedURL:true,UnderlyingSourceBase:true,URLSearchParams:true,VRCoordinateSystem:true,VRDisplayCapabilities:true,VREyeParameters:true,VRFrameData:true,VRFrameOfReference:true,VRPose:true,VRStageBounds:true,VRStageBoundsPoint:true,VRStageParameters:true,ValidityState:true,VideoPlaybackQuality:true,VideoTrack:true,VTTRegion:true,WindowClient:true,WorkletAnimation:true,WorkletGlobalScope:true,XPathEvaluator:true,XPathExpression:true,XPathNSResolver:true,XPathResult:true,XMLSerializer:true,XSLTProcessor:true,Bluetooth:true,BluetoothCharacteristicProperties:true,BluetoothRemoteGATTServer:true,BluetoothRemoteGATTService:true,BluetoothUUID:true,BudgetService:true,Cache:true,DOMFileSystemSync:true,DirectoryEntrySync:true,DirectoryReaderSync:true,EntrySync:true,FileEntrySync:true,FileReaderSync:true,FileWriterSync:true,HTMLAllCollection:true,Mojo:true,MojoHandle:true,MojoWatcher:true,NFC:true,PagePopupController:true,Report:true,Request:true,Response:true,SubtleCrypto:true,USBAlternateInterface:true,USBConfiguration:true,USBDevice:true,USBEndpoint:true,USBInTransferResult:true,USBInterface:true,USBIsochronousInTransferPacket:true,USBIsochronousInTransferResult:true,USBIsochronousOutTransferPacket:true,USBIsochronousOutTransferResult:true,USBOutTransferResult:true,WorkerLocation:true,WorkerNavigator:true,Worklet:true,IDBCursor:true,IDBCursorWithValue:true,IDBFactory:true,IDBIndex:true,IDBObjectStore:true,IDBObservation:true,IDBObserver:true,IDBObserverChanges:true,SVGAngle:true,SVGAnimatedAngle:true,SVGAnimatedBoolean:true,SVGAnimatedEnumeration:true,SVGAnimatedInteger:true,SVGAnimatedLength:true,SVGAnimatedLengthList:true,SVGAnimatedNumber:true,SVGAnimatedNumberList:true,SVGAnimatedPreserveAspectRatio:true,SVGAnimatedRect:true,SVGAnimatedString:true,SVGAnimatedTransformList:true,SVGMatrix:true,SVGPoint:true,SVGPreserveAspectRatio:true,SVGRect:true,SVGUnitTypes:true,AudioListener:true,AudioParam:true,AudioTrack:true,AudioWorkletGlobalScope:true,AudioWorkletProcessor:true,PeriodicWave:true,WebGLActiveInfo:true,ANGLEInstancedArrays:true,ANGLE_instanced_arrays:true,WebGLBuffer:true,WebGLCanvas:true,WebGLColorBufferFloat:true,WebGLCompressedTextureASTC:true,WebGLCompressedTextureATC:true,WEBGL_compressed_texture_atc:true,WebGLCompressedTextureETC1:true,WEBGL_compressed_texture_etc1:true,WebGLCompressedTextureETC:true,WebGLCompressedTexturePVRTC:true,WEBGL_compressed_texture_pvrtc:true,WebGLCompressedTextureS3TC:true,WEBGL_compressed_texture_s3tc:true,WebGLCompressedTextureS3TCsRGB:true,WebGLDebugRendererInfo:true,WEBGL_debug_renderer_info:true,WebGLDebugShaders:true,WEBGL_debug_shaders:true,WebGLDepthTexture:true,WEBGL_depth_texture:true,WebGLDrawBuffers:true,WEBGL_draw_buffers:true,EXTsRGB:true,EXT_sRGB:true,EXTBlendMinMax:true,EXT_blend_minmax:true,EXTColorBufferFloat:true,EXTColorBufferHalfFloat:true,EXTDisjointTimerQuery:true,EXTDisjointTimerQueryWebGL2:true,EXTFragDepth:true,EXT_frag_depth:true,EXTShaderTextureLOD:true,EXT_shader_texture_lod:true,EXTTextureFilterAnisotropic:true,EXT_texture_filter_anisotropic:true,WebGLFramebuffer:true,WebGLGetBufferSubDataAsync:true,WebGLLoseContext:true,WebGLExtensionLoseContext:true,WEBGL_lose_context:true,OESElementIndexUint:true,OES_element_index_uint:true,OESStandardDerivatives:true,OES_standard_derivatives:true,OESTextureFloat:true,OES_texture_float:true,OESTextureFloatLinear:true,OES_texture_float_linear:true,OESTextureHalfFloat:true,OES_texture_half_float:true,OESTextureHalfFloatLinear:true,OES_texture_half_float_linear:true,OESVertexArrayObject:true,OES_vertex_array_object:true,WebGLProgram:true,WebGLQuery:true,WebGLRenderbuffer:true,WebGLRenderingContext:true,WebGL2RenderingContext:true,WebGLSampler:true,WebGLShader:true,WebGLShaderPrecisionFormat:true,WebGLSync:true,WebGLTexture:true,WebGLTimerQueryEXT:true,WebGLTransformFeedback:true,WebGLUniformLocation:true,WebGLVertexArrayObject:true,WebGLVertexArrayObjectOES:true,WebGL2RenderingContextBase:true,ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false,HTMLAudioElement:true,HTMLBRElement:true,HTMLCanvasElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOutputElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,AccessibleNodeList:true,HTMLAnchorElement:true,HTMLAreaElement:true,HTMLBaseElement:true,Blob:false,HTMLBodyElement:true,HTMLButtonElement:true,CDATASection:true,CharacterData:true,Comment:true,ProcessingInstruction:true,Text:true,CSSPerspective:true,CSSCharsetRule:true,CSSConditionRule:true,CSSFontFaceRule:true,CSSGroupingRule:true,CSSImportRule:true,CSSKeyframeRule:true,MozCSSKeyframeRule:true,WebKitCSSKeyframeRule:true,CSSKeyframesRule:true,MozCSSKeyframesRule:true,WebKitCSSKeyframesRule:true,CSSMediaRule:true,CSSNamespaceRule:true,CSSPageRule:true,CSSRule:true,CSSStyleRule:true,CSSSupportsRule:true,CSSViewportRule:true,CSSStyleDeclaration:true,MSStyleCSSProperties:true,CSS2Properties:true,CSSImageValue:true,CSSKeywordValue:true,CSSNumericValue:true,CSSPositionValue:true,CSSResourceValue:true,CSSUnitValue:true,CSSURLImageValue:true,CSSStyleValue:false,CSSMatrixComponent:true,CSSRotation:true,CSSScale:true,CSSSkew:true,CSSTranslation:true,CSSTransformComponent:false,CSSTransformValue:true,CSSUnparsedValue:true,DataTransferItemList:true,HTMLDivElement:true,XMLDocument:true,Document:false,DOMException:true,DOMImplementation:true,ClientRectList:true,DOMRectList:true,DOMRectReadOnly:false,DOMStringList:true,DOMTokenList:true,MathMLElement:true,Element:false,AbortPaymentEvent:true,AnimationEvent:true,AnimationPlaybackEvent:true,ApplicationCacheErrorEvent:true,BackgroundFetchClickEvent:true,BackgroundFetchEvent:true,BackgroundFetchFailEvent:true,BackgroundFetchedEvent:true,BeforeInstallPromptEvent:true,BeforeUnloadEvent:true,BlobEvent:true,CanMakePaymentEvent:true,ClipboardEvent:true,CloseEvent:true,CustomEvent:true,DeviceMotionEvent:true,DeviceOrientationEvent:true,ErrorEvent:true,ExtendableEvent:true,ExtendableMessageEvent:true,FetchEvent:true,FontFaceSetLoadEvent:true,ForeignFetchEvent:true,GamepadEvent:true,HashChangeEvent:true,InstallEvent:true,MediaEncryptedEvent:true,MediaKeyMessageEvent:true,MediaQueryListEvent:true,MediaStreamEvent:true,MediaStreamTrackEvent:true,MessageEvent:true,MIDIConnectionEvent:true,MIDIMessageEvent:true,MutationEvent:true,NotificationEvent:true,PageTransitionEvent:true,PaymentRequestEvent:true,PaymentRequestUpdateEvent:true,PopStateEvent:true,PresentationConnectionAvailableEvent:true,PresentationConnectionCloseEvent:true,PromiseRejectionEvent:true,PushEvent:true,RTCDataChannelEvent:true,RTCDTMFToneChangeEvent:true,RTCPeerConnectionIceEvent:true,RTCTrackEvent:true,SecurityPolicyViolationEvent:true,SensorErrorEvent:true,SpeechRecognitionError:true,SpeechRecognitionEvent:true,SpeechSynthesisEvent:true,StorageEvent:true,SyncEvent:true,TrackEvent:true,TransitionEvent:true,WebKitTransitionEvent:true,VRDeviceEvent:true,VRDisplayEvent:true,VRSessionEvent:true,MojoInterfaceRequestEvent:true,USBConnectionEvent:true,IDBVersionChangeEvent:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,WebGLContextEvent:true,Event:false,InputEvent:false,SubmitEvent:false,EventSource:true,AbsoluteOrientationSensor:true,Accelerometer:true,AccessibleNode:true,AmbientLightSensor:true,Animation:true,ApplicationCache:true,DOMApplicationCache:true,OfflineResourceList:true,BackgroundFetchRegistration:true,BatteryManager:true,BroadcastChannel:true,CanvasCaptureMediaStreamTrack:true,FontFaceSet:true,Gyroscope:true,LinearAccelerationSensor:true,Magnetometer:true,MediaDevices:true,MediaKeySession:true,MediaQueryList:true,MediaRecorder:true,MediaSource:true,MediaStream:true,MediaStreamTrack:true,MIDIAccess:true,MIDIInput:true,MIDIOutput:true,MIDIPort:true,NetworkInformation:true,Notification:true,OffscreenCanvas:true,OrientationSensor:true,PaymentRequest:true,Performance:true,PermissionStatus:true,PresentationAvailability:true,PresentationConnection:true,PresentationConnectionList:true,PresentationRequest:true,RelativeOrientationSensor:true,RemotePlayback:true,RTCDataChannel:true,DataChannel:true,RTCDTMFSender:true,RTCPeerConnection:true,webkitRTCPeerConnection:true,mozRTCPeerConnection:true,ScreenOrientation:true,Sensor:true,ServiceWorker:true,ServiceWorkerContainer:true,ServiceWorkerRegistration:true,SharedWorker:true,SpeechRecognition:true,webkitSpeechRecognition:true,SpeechSynthesis:true,SpeechSynthesisUtterance:true,VR:true,VRDevice:true,VRDisplay:true,VRSession:true,VisualViewport:true,WebSocket:true,Worker:true,WorkerPerformance:true,BluetoothDevice:true,BluetoothRemoteGATTCharacteristic:true,Clipboard:true,MojoInterfaceInterceptor:true,USB:true,IDBDatabase:true,IDBOpenDBRequest:true,IDBVersionChangeRequest:true,IDBRequest:true,IDBTransaction:true,AnalyserNode:true,RealtimeAnalyserNode:true,AudioBufferSourceNode:true,AudioDestinationNode:true,AudioNode:true,AudioScheduledSourceNode:true,AudioWorkletNode:true,BiquadFilterNode:true,ChannelMergerNode:true,AudioChannelMerger:true,ChannelSplitterNode:true,AudioChannelSplitter:true,ConstantSourceNode:true,ConvolverNode:true,DelayNode:true,DynamicsCompressorNode:true,GainNode:true,AudioGainNode:true,IIRFilterNode:true,MediaElementAudioSourceNode:true,MediaStreamAudioDestinationNode:true,MediaStreamAudioSourceNode:true,OscillatorNode:true,Oscillator:true,PannerNode:true,AudioPannerNode:true,webkitAudioPannerNode:true,ScriptProcessorNode:true,JavaScriptAudioNode:true,StereoPannerNode:true,WaveShaperNode:true,EventTarget:false,File:true,FileList:true,FileReader:true,FileWriter:true,HTMLFormElement:true,Gamepad:true,HTMLHeadingElement:true,History:true,HTMLCollection:true,HTMLFormControlsCollection:true,HTMLOptionsCollection:true,HTMLDocument:true,XMLHttpRequest:true,XMLHttpRequestUpload:true,XMLHttpRequestEventTarget:false,ImageData:true,HTMLImageElement:true,HTMLInputElement:true,Location:true,MediaList:true,MessagePort:true,MIDIInputMap:true,MIDIOutputMap:true,MimeType:true,MimeTypeArray:true,MouseEvent:true,DragEvent:true,PointerEvent:true,WheelEvent:true,DocumentFragment:true,ShadowRoot:true,DocumentType:true,Node:false,NodeList:true,RadioNodeList:true,HTMLOptionElement:true,HTMLParagraphElement:true,Plugin:true,PluginArray:true,ProgressEvent:true,ResourceProgressEvent:true,RTCStatsReport:true,HTMLSelectElement:true,SourceBuffer:true,SourceBufferList:true,HTMLSpanElement:true,SpeechGrammar:true,SpeechGrammarList:true,SpeechRecognitionResult:true,Storage:true,CSSStyleSheet:true,StyleSheet:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,TextTrack:true,TextTrackCue:true,VTTCue:true,TextTrackCueList:true,TextTrackList:true,TimeRanges:true,Touch:true,TouchList:true,TrackDefaultList:true,CompositionEvent:true,FocusEvent:true,KeyboardEvent:true,TextEvent:true,TouchEvent:true,UIEvent:false,URL:true,VideoTrackList:true,Window:true,DOMWindow:true,DedicatedWorkerGlobalScope:true,ServiceWorkerGlobalScope:true,SharedWorkerGlobalScope:true,WorkerGlobalScope:true,Attr:true,CSSRuleList:true,ClientRect:true,DOMRect:true,GamepadList:true,NamedNodeMap:true,MozNamedAttrMap:true,SpeechRecognitionResultList:true,StyleSheetList:true,IDBKeyRange:true,SVGLength:true,SVGLengthList:true,SVGNumber:true,SVGNumberList:true,SVGPointList:true,SVGScriptElement:true,SVGStringList:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true,SVGElement:false,SVGTransform:true,SVGTransformList:true,AudioBuffer:true,AudioParamMap:true,AudioTrackList:true,AudioContext:true,webkitAudioContext:true,BaseAudioContext:false,OfflineAudioContext:true})
A.ar.$nativeSuperclassTag="ArrayBufferView"
A.eh.$nativeSuperclassTag="ArrayBufferView"
A.ei.$nativeSuperclassTag="ArrayBufferView"
A.dK.$nativeSuperclassTag="ArrayBufferView"
A.ej.$nativeSuperclassTag="ArrayBufferView"
A.ek.$nativeSuperclassTag="ArrayBufferView"
A.aV.$nativeSuperclassTag="ArrayBufferView"
A.en.$nativeSuperclassTag="EventTarget"
A.eo.$nativeSuperclassTag="EventTarget"
A.er.$nativeSuperclassTag="EventTarget"
A.es.$nativeSuperclassTag="EventTarget"})()
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
var s=A.uO
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=app.js.map

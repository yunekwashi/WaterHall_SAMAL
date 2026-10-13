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
if(a[b]!==s){A.vw(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.B(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.oG(b)
return new s(c,this)}:function(){if(s===null)s=A.oG(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.oG(a).prototype
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
oM(a,b,c,d){return{i:a,p:b,e:c,x:d}},
nF(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.oK==null){A.vi()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.b(A.pz("Return interceptor for "+A.d(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.mX
if(o==null)o=$.mX=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.vp(a)
if(p!=null)return p
if(typeof a=="function")return B.ag
s=Object.getPrototypeOf(a)
if(s==null)return B.Q
if(s===Object.prototype)return B.Q
if(typeof q=="function"){o=$.mX
if(o==null)o=$.mX=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.y,enumerable:false,writable:true,configurable:true})
return B.y}return B.y},
pd(a,b){if(a<0||a>4294967295)throw A.b(A.ah(a,0,4294967295,"length",null))
return J.rZ(new Array(a),b)},
o9(a,b){if(a<0)throw A.b(A.aY("Length must be a non-negative integer: "+a,null))
return A.B(new Array(a),b.i("ac<0>"))},
rZ(a,b){var s=A.B(a,b.i("ac<0>"))
s.$flags=1
return s},
pe(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
t_(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.pe(r))break;++b}return b},
t0(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.e(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.pe(q))break}return b},
bM(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dC.prototype
return J.fi.prototype}if(typeof a=="string")return J.bV.prototype
if(a==null)return J.dD.prototype
if(typeof a=="boolean")return J.fg.prototype
if(Array.isArray(a))return J.ac.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bA.prototype
if(typeof a=="symbol")return J.cQ.prototype
if(typeof a=="bigint")return J.cP.prototype
return a}if(a instanceof A.H)return a
return J.nF(a)},
w(a){if(typeof a=="string")return J.bV.prototype
if(a==null)return a
if(Array.isArray(a))return J.ac.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bA.prototype
if(typeof a=="symbol")return J.cQ.prototype
if(typeof a=="bigint")return J.cP.prototype
return a}if(a instanceof A.H)return a
return J.nF(a)},
cE(a){if(a==null)return a
if(Array.isArray(a))return J.ac.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bA.prototype
if(typeof a=="symbol")return J.cQ.prototype
if(typeof a=="bigint")return J.cP.prototype
return a}if(a instanceof A.H)return a
return J.nF(a)},
va(a){if(typeof a=="number")return J.cj.prototype
if(a==null)return a
if(!(a instanceof A.H))return J.bF.prototype
return a},
vb(a){if(typeof a=="number")return J.cj.prototype
if(typeof a=="string")return J.bV.prototype
if(a==null)return a
if(!(a instanceof A.H))return J.bF.prototype
return a},
oH(a){if(typeof a=="string")return J.bV.prototype
if(a==null)return a
if(!(a instanceof A.H))return J.bF.prototype
return a},
J(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bA.prototype
if(typeof a=="symbol")return J.cQ.prototype
if(typeof a=="bigint")return J.cP.prototype
return a}if(a instanceof A.H)return a
return J.nF(a)},
oI(a){if(a==null)return a
if(!(a instanceof A.H))return J.bF.prototype
return a},
j(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bM(a).a0(a,b)},
rd(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.va(a).bh(a,b)},
re(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.vb(a).aG(a,b)},
k(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.vl(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.w(a).h(a,b)},
aE(a,b,c){return J.cE(a).k(a,b,c)},
ip(a){return J.J(a).eR(a)},
rf(a,b,c,d){return J.J(a).f1(a,b,c,d)},
rg(a,b){return J.J(a).fa(a,b)},
rh(a,b,c,d){return J.J(a).fc(a,b,c,d)},
ri(a,b,c){return J.J(a).fe(a,b,c)},
o_(a,b){return J.cE(a).m(a,b)},
rj(a,b,c,d){return J.J(a).br(a,b,c,d)},
rk(a,b){return J.J(a).fE(a,b)},
rl(a,b,c){return J.J(a).dr(a,b,c)},
iq(a){return J.oI(a).a3(a)},
o0(a,b){return J.w(a).A(a,b)},
o1(a,b){return J.J(a).M(a,b)},
eN(a,b){return J.cE(a).v(a,b)},
rm(a,b){return J.cE(a).fU(a,b)},
rn(a){return J.J(a).dA(a)},
ir(a,b){return J.cE(a).q(a,b)},
ro(a){return J.J(a).gfF(a)},
cH(a){return J.J(a).gbt(a)},
c9(a){return J.J(a).gaq(a)},
rp(a){return J.J(a).gaC(a)},
cI(a){return J.bM(a).gK(a)},
is(a){return J.w(a).gE(a)},
o2(a){return J.w(a).gT(a)},
aF(a){return J.cE(a).gB(a)},
rq(a){return J.J(a).gI(a)},
aj(a){return J.w(a).gj(a)},
rr(a){return J.J(a).gdL(a)},
aa(a){return J.J(a).gaN(a)},
rs(a){return J.J(a).gdM(a)},
rt(a){return J.J(a).gdN(a)},
ru(a){return J.oI(a).gcu(a)},
oU(a){return J.oI(a).gag(a)},
rv(a){return J.J(a).ghn(a)},
rw(a){return J.bM(a).gW(a)},
rx(a){return J.J(a).gem(a)},
ca(a,b,c){return J.cE(a).au(a,b,c)},
ry(a,b){return J.bM(a).dI(a,b)},
rz(a,b,c){return J.J(a).hc(a,b,c)},
it(a){return J.J(a).dP(a)},
rA(a,b){return J.J(a).C(a,b)},
rB(a,b){return J.J(a).dT(a,b)},
rC(a,b){return J.J(a).el(a,b)},
rD(a,b){return J.J(a).sf3(a,b)},
dk(a,b){return J.J(a).sU(a,b)},
rE(a,b){return J.J(a).scO(a,b)},
r(a,b){return J.J(a).sP(a,b)},
rF(a,b,c){return J.J(a).cK(a,b,c)},
oV(a,b){return J.oH(a).en(a,b)},
rG(a){return J.oH(a).hr(a)},
M(a){return J.bM(a).l(a)},
oW(a){return J.oH(a).u(a)},
rH(a,b){return J.cE(a).e4(a,b)},
cO:function cO(){},
fg:function fg(){},
dD:function dD(){},
a:function a(){},
bW:function bW(){},
fF:function fF(){},
bF:function bF(){},
bA:function bA(){},
cP:function cP(){},
cQ:function cQ(){},
ac:function ac(a){this.$ti=a},
ff:function ff(){},
lT:function lT(a){this.$ti=a},
bd:function bd(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cj:function cj(){},
dC:function dC(){},
fi:function fi(){},
bV:function bV(){}},A={oa:function oa(){},
pg(a){return new A.dF("Field '"+a+"' has been assigned during initialization.")},
t3(a){return new A.dF("Field '"+a+"' has not been initialized.")},
nG(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
c0(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
ol(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
cC(a,b,c){return a},
oL(a){var s,r
for(s=$.b5.length,r=0;r<s;++r)if(a===$.b5[r])return!0
return!1},
e0(a,b,c,d){A.cY(b,"start")
if(c!=null){A.cY(c,"end")
if(b>c)A.bN(A.ah(b,0,c,"start",null))}return new A.e_(a,b,c,d.i("e_<0>"))},
t4(a,b,c,d){if(t.gt.b(a))return new A.bx(a,b,c.i("@<0>").J(d).i("bx<1,2>"))
return new A.aJ(a,b,c.i("@<0>").J(d).i("aJ<1,2>"))},
dB(){return new A.bq("No element")},
rX(){return new A.bq("Too many elements")},
dF:function dF(a){this.a=a},
f_:function f_(a){this.a=a},
nR:function nR(){},
me:function me(){},
n:function n(){},
a5:function a5(){},
e_:function e_(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
bh:function bh(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
aJ:function aJ(a,b,c){this.a=a
this.b=b
this.$ti=c},
bx:function bx(a,b,c){this.a=a
this.b=b
this.$ti=c},
dL:function dL(a,b,c){var _=this
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
aw:function aw(a,b,c){this.a=a
this.b=b
this.$ti=c},
cs:function cs(a,b){this.a=a
this.$ti=b},
e6:function e6(a,b){this.a=a
this.$ti=b},
aI:function aI(){},
bG:function bG(){},
d2:function d2(){},
hx:function hx(a){this.a=a},
cn:function cn(a,b){this.a=a
this.$ti=b},
c_:function c_(a){this.a=a},
p3(){throw A.b(A.P("Cannot modify unmodifiable Map"))},
qM(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
vl(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.dX.b(a)},
d(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.M(a)
return s},
dU(a){var s,r=$.pm
if(r==null)r=$.pm=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
pq(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.e(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
dW(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.a.u(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
dV(a){var s,r,q,p
if(a instanceof A.H)return A.aK(A.ax(a),null)
s=J.bM(a)
if(s===B.af||s===B.ah||t.cx.b(a)){r=B.B(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.aK(A.ax(a),null)},
tc(a){var s,r,q
if(typeof a=="number"||A.eH(a))return J.M(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bR)return a.l(0)
s=$.oT()
for(r=0;r<s.length;++r){q=s[r].e0(a)
if(q!=null)return q}return"Instance of '"+A.dV(a)+"'"},
ta(){if(!!self.location)return self.location.href
return null},
td(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
a6(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.e.b4(s,10)|55296)>>>0,s&1023|56320)}}throw A.b(A.ah(a,0,1114111,null,null))},
pr(a,b,c,d,e,f,g,h,i){var s,r,q,p=b-1
if(0<=a&&a<100){a+=400
p-=4800}s=B.e.aT(h,1000)
g+=B.e.ac(h-s,1000)
r=i?Date.UTC(a,p,c,d,e,f,g):new Date(a,p,c,d,e,f,g).valueOf()
q=!0
if(!isNaN(r))if(!(r<-864e13))if(!(r>864e13))q=r===864e13&&s!==0
if(q)return null
return r},
aR(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cW(a){return a.c?A.aR(a).getUTCFullYear()+0:A.aR(a).getFullYear()+0},
mb(a){return a.c?A.aR(a).getUTCMonth()+1:A.aR(a).getMonth()+1},
pn(a){return a.c?A.aR(a).getUTCDate()+0:A.aR(a).getDate()+0},
og(a){return a.c?A.aR(a).getUTCHours()+0:A.aR(a).getHours()+0},
oh(a){return a.c?A.aR(a).getUTCMinutes()+0:A.aR(a).getMinutes()+0},
pp(a){return a.c?A.aR(a).getUTCSeconds()+0:A.aR(a).getSeconds()+0},
po(a){return a.c?A.aR(a).getUTCMilliseconds()+0:A.aR(a).getMilliseconds()+0},
bX(a,b,c){var s,r,q={}
q.a=0
s=[]
r=[]
q.a=b.length
B.b.S(s,b)
q.b=""
if(c!=null&&c.a!==0)c.q(0,new A.ma(q,r,s))
return J.ry(a,new A.fh(B.at,0,s,r,0))},
t9(a,b,c){var s,r,q
if(Array.isArray(b))s=c==null||c.a===0
else s=!1
if(s){r=b.length
if(r===0){if(!!a.$0)return a.$0()}else if(r===1){if(!!a.$1)return a.$1(b[0])}else if(r===2){if(!!a.$2)return a.$2(b[0],b[1])}else if(r===3){if(!!a.$3)return a.$3(b[0],b[1],b[2])}else if(r===4){if(!!a.$4)return a.$4(b[0],b[1],b[2],b[3])}else if(r===5)if(!!a.$5)return a.$5(b[0],b[1],b[2],b[3],b[4])
q=a[""+"$"+r]
if(q!=null)return q.apply(a,b)}return A.t8(a,b,c)},
t8(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(Array.isArray(b))s=b
else s=A.a4(b,t.z)
r=s.length
q=a.$R
if(r<q)return A.bX(a,s,c)
p=a.$D
o=p==null
n=!o?p():null
m=J.bM(a)
l=m.$C
if(typeof l=="string")l=m[l]
if(o){if(c!=null&&c.a!==0)return A.bX(a,s,c)
if(r===q)return l.apply(a,s)
return A.bX(a,s,c)}if(Array.isArray(n)){if(c!=null&&c.a!==0)return A.bX(a,s,c)
k=q+n.length
if(r>k)return A.bX(a,s,null)
if(r<k){j=n.slice(r-q)
if(s===b)s=A.a4(s,t.z)
B.b.S(s,j)}return l.apply(a,s)}else{if(r>q)return A.bX(a,s,c)
if(s===b)s=A.a4(s,t.z)
i=Object.keys(n)
if(c==null)for(o=i.length,h=0;h<i.length;i.length===o||(0,A.as)(i),++h){g=n[A.x(i[h])]
if(B.D===g)return A.bX(a,s,c)
B.b.m(s,g)}else{for(o=i.length,f=0,h=0;h<i.length;i.length===o||(0,A.as)(i),++h){e=A.x(i[h])
if(c.M(0,e)){++f
B.b.m(s,c.h(0,e))}else{g=n[e]
if(B.D===g)return A.bX(a,s,c)
B.b.m(s,g)}}if(f!==c.a)return A.bX(a,s,c)}return l.apply(a,s)}},
tb(a){var s=a.$thrownJsError
if(s==null)return null
return A.c5(s)},
oi(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.ai(a,s)
a.$thrownJsError=s
s.stack=b.l(0)}},
vg(a){throw A.b(A.oF(a))},
e(a,b){if(a==null)J.aj(a)
throw A.b(A.ih(a,b))},
ih(a,b){var s,r="index"
if(!A.eI(b))return new A.b7(!0,b,r,null)
s=A.L(J.aj(a))
if(b<0||b>=s)return A.a8(b,s,a,null,r)
return A.ps(b,r)},
v7(a,b,c){if(a>c)return A.ah(a,0,c,"start",null)
if(b!=null)if(b<a||b>c)return A.ah(b,a,c,"end",null)
return new A.b7(!0,b,"end",null)},
oF(a){return new A.b7(!0,a,null,null)},
b(a){return A.ai(a,new Error())},
ai(a,b){var s
if(a==null)a=new A.bD()
b.dartException=a
s=A.vx
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
vx(){return J.M(this.dartException)},
bN(a,b){throw A.ai(a,b==null?new Error():b)},
al(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.bN(A.ul(a,b,c),s)},
ul(a,b,c){var s,r,q,p,o,n,m,l,k
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
as(a){throw A.b(A.a7(a))},
bE(a){var s,r,q,p,o,n
a=A.qI(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.B([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.mm(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
mn(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
py(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
ob(a,b){var s=b==null,r=s?null:b.method
return new A.fk(a,r,s?null:b.receiver)},
an(a){var s
if(a==null)return new A.m8(a)
if(a instanceof A.dv){s=a.a
return A.c8(a,s==null?A.b4(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.c8(a,a.dartException)
return A.uX(a)},
c8(a,b){if(t.W.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
uX(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.e.b4(r,16)&8191)===10)switch(q){case 438:return A.c8(a,A.ob(A.d(s)+" (Error "+q+")",null))
case 445:case 5007:A.d(s)
return A.c8(a,new A.dS())}}if(a instanceof TypeError){p=$.qW()
o=$.qX()
n=$.qY()
m=$.qZ()
l=$.r1()
k=$.r2()
j=$.r0()
$.r_()
i=$.r4()
h=$.r3()
g=p.af(s)
if(g!=null)return A.c8(a,A.ob(A.x(s),g))
else{g=o.af(s)
if(g!=null){g.method="call"
return A.c8(a,A.ob(A.x(s),g))}else if(n.af(s)!=null||m.af(s)!=null||l.af(s)!=null||k.af(s)!=null||j.af(s)!=null||m.af(s)!=null||i.af(s)!=null||h.af(s)!=null){A.x(s)
return A.c8(a,new A.dS())}}return A.c8(a,new A.fZ(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.dY()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.c8(a,new A.b7(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.dY()
return a},
c5(a){var s
if(a instanceof A.dv)return a.b
if(a==null)return new A.eu(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.eu(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
il(a){if(a==null)return J.cI(a)
if(typeof a=="object")return A.dU(a)
return J.cI(a)},
v9(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.k(0,a[s],a[r])}return b},
uv(a,b,c,d,e,f){t.Z.a(a)
switch(A.L(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.b(new A.mH("Unsupported number of arguments for wrapped closure"))},
bK(a,b){var s
if(a==null)return null
s=a.$identity
if(!!s)return s
s=A.v4(a,b)
a.$identity=s
return s},
v4(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.uv)},
rO(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.fM().constructor.prototype):Object.create(new A.cL(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.p2(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.rK(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.p2(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
rK(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.rI)}throw A.b("Error in functionType of tearoff")},
rL(a,b,c,d){var s=A.p0
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
p2(a,b,c,d){if(c)return A.rN(a,b,d)
return A.rL(b.length,d,a,b)},
rM(a,b,c,d){var s=A.p0,r=A.rJ
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
rN(a,b,c){var s,r
if($.oZ==null)$.oZ=A.oY("interceptor")
if($.p_==null)$.p_=A.oY("receiver")
s=b.length
r=A.rM(s,c,a,b)
return r},
oG(a){return A.rO(a)},
rI(a,b){return A.nc(v.typeUniverse,A.ax(a.a),b)},
p0(a){return a.a},
rJ(a){return a.b},
oY(a){var s,r,q,p=new A.cL("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.b(A.aY("Field name "+a+" not found.",null))},
oJ(a){return v.getIsolateTag(a)},
oN(a,b,c){var s,r
try{s=A.uk(a,c,b)
return s}catch(r){}return null},
uk(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=[],h=typeof a=="object",g=typeof a=="function"
if(g){s=A.qn(a)
if(s!=null)i.push("globalThis."+s)
else i.push("name: "+A.by(A.ig(a,"name")))}if(b?!g:!h)i.push('typeof: "'+typeof a+'"')
if(!(h||g))return i.join(", ")
r=v.G
q=r.Object
p=q.getPrototypeOf(a)
o=p==null
if(o)i.push("prototype: null")
else{n=A.ig(p,"constructor")
if(n!=null){m=A.qn(n)
if(m!=null){if(g)l="Function"
else l=c?"Array":null
if(m!==l)i.push("constructor: "+m)}else{k=A.ig(n,"name")
if(k!=null)i.push("constructor.name: "+A.by(k))}}}if(r.Array.isArray(a))i.push("isArray")
if(!g){j=A.ig(a,"length")
if(typeof j=="number")i.push("length: "+A.d(j))}if(!o&&!(a instanceof q))i.push("cross-realm")
return i.join(", ")},
ig(a,b){var s=v.G.Object.getOwnPropertyDescriptor(a,b)
if(s==null)return null
return s.value},
qn(a){var s
if(typeof a!="function")return null
s=A.ig(a,"name")
if(typeof s=="string"&&/^[A-Za-z_$][A-Za-z_$0-9]*$/.test(s))if(a===v.G[s])return s
return null},
wI(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
vp(a){var s,r,q,p,o,n=A.x($.qC.$1(a)),m=$.nE[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.nK[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.ao($.qy.$2(a,n))
if(q!=null){m=$.nE[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.nK[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.nN(s)
$.nE[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.nK[n]=s
return s}if(p==="-"){o=A.nN(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.qF(a,s)
if(p==="*")throw A.b(A.pz(n))
if(v.leafTags[n]===true){o=A.nN(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.qF(a,s)},
qF(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.oM(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
nN(a){return J.oM(a,!1,null,!!a.$iN)},
vr(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.nN(s)
else return J.oM(s,c,null,null)},
vi(){if(!0===$.oK)return
$.oK=!0
A.vj()},
vj(){var s,r,q,p,o,n,m,l
$.nE=Object.create(null)
$.nK=Object.create(null)
A.vh()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.qH.$1(o)
if(n!=null){m=A.vr(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
vh(){var s,r,q,p,o,n,m=B.Z()
m=A.dh(B.a_,A.dh(B.a0,A.dh(B.C,A.dh(B.C,A.dh(B.a1,A.dh(B.a2,A.dh(B.a3(B.B),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.qC=new A.nH(p)
$.qy=new A.nI(o)
$.qH=new A.nJ(n)},
dh(a,b){return a(b)||b},
v6(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
t1(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.b(A.a2("Illegal RegExp pattern ("+String(o)+")",a,null))},
vu(a,b,c){var s=a.indexOf(b,c)
return s>=0},
v8(a){if(a.indexOf("$",0)>=0)return a.replace(/\$/g,"$$$$")
return a},
qI(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
qK(a,b,c){var s=A.vv(a,b,c)
return s},
vv(a,b,c){var s,r,q
if(b===""){if(a==="")return c
s=a.length
for(r=c,q=0;q<s;++q)r=r+a[q]+c
return r.charCodeAt(0)==0?r:r}if(a.indexOf(b,0)<0)return a
if(a.length<500||c.indexOf("$",0)>=0)return a.split(b).join(c)
return a.replace(new RegExp(A.qI(b),"g"),A.v8(c))},
dn:function dn(a,b){this.a=a
this.$ti=b},
dm:function dm(){},
bv:function bv(a,b,c){this.a=a
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
ma:function ma(a,b,c){this.a=a
this.b=b
this.c=c},
cZ:function cZ(){},
mm:function mm(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
dS:function dS(){},
fk:function fk(a,b,c){this.a=a
this.b=b
this.c=c},
fZ:function fZ(a){this.a=a},
m8:function m8(a){this.a=a},
dv:function dv(a,b){this.a=a
this.b=b},
eu:function eu(a){this.a=a
this.b=null},
bR:function bR(){},
eY:function eY(){},
eZ:function eZ(){},
fQ:function fQ(){},
fM:function fM(){},
cL:function cL(a,b){this.a=a
this.b=b},
fJ:function fJ(a){this.a=a},
n2:function n2(){},
bg:function bg(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
lU:function lU(a){this.a=a},
lZ:function lZ(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
cl:function cl(a,b){this.a=a
this.$ti=b},
dI:function dI(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
b0:function b0(a,b){this.a=a
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
nH:function nH(a){this.a=a},
nI:function nI(a){this.a=a},
nJ:function nJ(a){this.a=a},
fj:function fj(a,b){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null},
n0:function n0(a){this.b=a},
ug(a){return a},
um(a){return a},
t5(a){return new Int8Array(a)},
pj(a){return new Uint8Array(a)},
pk(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
bJ(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.ih(b,a))},
uh(a,b,c){var s
if(!(a>>>0!==a))s=b>>>0!==b||a>b||b>c
else s=!0
if(s)throw A.b(A.v7(a,b,c))
return b},
co:function co(){},
dO:function dO(){},
i3:function i3(a){this.a=a},
dM:function dM(){},
au:function au(){},
dN:function dN(){},
b1:function b1(){},
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
oj(a,b){var s=b.c
return s==null?b.c=A.eA(a,"af",[b.x]):s},
pt(a){var s=a.w
if(s===6||s===7)return A.pt(a.x)
return s===11||s===12},
tg(a){return a.as},
ii(a){return A.nb(v.typeUniverse,a,!1)},
cB(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.cB(a1,s,a3,a4)
if(r===s)return a2
return A.pW(a1,r,!0)
case 7:s=a2.x
r=A.cB(a1,s,a3,a4)
if(r===s)return a2
return A.pV(a1,r,!0)
case 8:q=a2.y
p=A.dg(a1,q,a3,a4)
if(p===q)return a2
return A.eA(a1,a2.x,p)
case 9:o=a2.x
n=A.cB(a1,o,a3,a4)
m=a2.y
l=A.dg(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.or(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.dg(a1,j,a3,a4)
if(i===j)return a2
return A.pX(a1,k,i)
case 11:h=a2.x
g=A.cB(a1,h,a3,a4)
f=a2.y
e=A.uU(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.pU(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.dg(a1,d,a3,a4)
o=a2.x
n=A.cB(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.os(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.b(A.eR("Attempted to substitute unexpected RTI kind "+a0))}},
dg(a,b,c,d){var s,r,q,p,o=b.length,n=A.nl(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.cB(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
uV(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.nl(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.cB(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
uU(a,b,c,d){var s,r=b.a,q=A.dg(a,r,c,d),p=b.b,o=A.dg(a,p,c,d),n=b.c,m=A.uV(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.hn()
s.a=q
s.b=o
s.c=m
return s},
B(a,b){a[v.arrayRti]=b
return a},
qA(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.vd(s)
return a.$S()}return null},
vk(a,b){var s
if(A.pt(b))if(a instanceof A.bR){s=A.qA(a)
if(s!=null)return s}return A.ax(a)},
ax(a){if(a instanceof A.H)return A.C(a)
if(Array.isArray(a))return A.E(a)
return A.oB(J.bM(a))},
E(a){var s=a[v.arrayRti],r=t.dG
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
C(a){var s=a.$ti
return s!=null?s:A.oB(a)},
oB(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.ut(a,s)},
ut(a,b){var s=a instanceof A.bR?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.tU(v.typeUniverse,s.name)
b.$ccache=r
return r},
vd(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.nb(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
vc(a){return A.cD(A.C(a))},
uT(a){var s=a instanceof A.bR?A.qA(a):null
if(s!=null)return s
if(t.aJ.b(a))return J.rw(a).a
if(Array.isArray(a))return A.E(a)
return A.ax(a)},
cD(a){var s=a.r
return s==null?a.r=new A.na(a):s},
bo(a){return A.cD(A.nb(v.typeUniverse,a,!1))},
us(a){var s=this
s.b=A.uR(s)
return s.b(a)},
uR(a){var s,r,q,p,o
if(a===t.K)return A.uB
if(A.cG(a))return A.uF
s=a.w
if(s===6)return A.uq
if(s===1)return A.qm
if(s===7)return A.uw
r=A.uQ(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.cG)){a.f="$i"+q
if(q==="p")return A.uz
if(a===t.m)return A.uy
return A.uE}}else if(s===10){p=A.v6(a.x,a.y)
o=p==null?A.qm:p
return o==null?A.b4(o):o}return A.uo},
uQ(a){if(a.w===8){if(a===t.S)return A.eI
if(a===t.dx||a===t.u)return A.uA
if(a===t.N)return A.uD
if(a===t.y)return A.eH}return null},
ur(a){var s=this,r=A.un
if(A.cG(s))r=A.u9
else if(s===t.K)r=A.b4
else if(A.di(s)){r=A.up
if(s===t.aV)r=A.no
else if(s===t.x)r=A.ao
else if(s===t.fU)r=A.qc
else if(s===t.jh)r=A.np
else if(s===t.jX)r=A.u6
else if(s===t.mU)r=A.u8}else if(s===t.S)r=A.L
else if(s===t.N)r=A.x
else if(s===t.y)r=A.nn
else if(s===t.u)r=A.a9
else if(s===t.dx)r=A.qd
else if(s===t.m)r=A.u7
s.a=r
return s.a(a)},
uo(a){var s=this
if(a==null)return A.di(s)
return A.qE(v.typeUniverse,A.vk(a,s),s)},
uq(a){if(a==null)return!0
return this.x.b(a)},
uE(a){var s,r=this
if(a==null)return A.di(r)
s=r.f
if(a instanceof A.H)return!!a[s]
return!!J.bM(a)[s]},
uz(a){var s,r=this
if(a==null)return A.di(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.H)return!!a[s]
return!!J.bM(a)[s]},
uy(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.H)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
ql(a){if(typeof a=="object"){if(a instanceof A.H)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
un(a){var s=this
if(a==null){if(A.di(s))return a}else if(s.b(a))return a
throw A.ai(A.qg(a,s),new Error())},
up(a){var s=this
if(a==null||s.b(a))return a
throw A.ai(A.qg(a,s),new Error())},
qg(a,b){return new A.db("TypeError: "+A.pI(a,A.aK(b,null)))},
eL(a,b,c,d){if(A.qE(v.typeUniverse,a,b))return a
throw A.ai(A.tL("The type argument '"+A.aK(a,null)+"' is not a subtype of the type variable bound '"+A.aK(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
pI(a,b){return A.by(a)+": type '"+A.aK(A.uT(a),null)+"' is not a subtype of type '"+b+"'"},
tL(a){return new A.db("TypeError: "+a)},
bb(a,b){return new A.db("TypeError: "+A.pI(a,b))},
uw(a){var s=this
return s.x.b(a)||A.oj(v.typeUniverse,s).b(a)},
uB(a){return a!=null},
b4(a){if(a!=null)return a
throw A.ai(A.bb(a,"Object"),new Error())},
uF(a){return!0},
u9(a){return a},
qm(a){return!1},
eH(a){return!0===a||!1===a},
nn(a){if(!0===a)return!0
if(!1===a)return!1
throw A.ai(A.bb(a,"bool"),new Error())},
qc(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.ai(A.bb(a,"bool?"),new Error())},
qd(a){if(typeof a=="number")return a
throw A.ai(A.bb(a,"double"),new Error())},
u6(a){if(typeof a=="number")return a
if(a==null)return a
throw A.ai(A.bb(a,"double?"),new Error())},
eI(a){return typeof a=="number"&&Math.floor(a)===a},
L(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.ai(A.bb(a,"int"),new Error())},
no(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.ai(A.bb(a,"int?"),new Error())},
uA(a){return typeof a=="number"},
a9(a){if(typeof a=="number")return a
throw A.ai(A.bb(a,"num"),new Error())},
np(a){if(typeof a=="number")return a
if(a==null)return a
throw A.ai(A.bb(a,"num?"),new Error())},
uD(a){return typeof a=="string"},
x(a){if(typeof a=="string")return a
throw A.ai(A.bb(a,"String"),new Error())},
ao(a){if(typeof a=="string")return a
if(a==null)return a
throw A.ai(A.bb(a,"String?"),new Error())},
u7(a){if(A.ql(a))return a
throw A.ai(A.bb(a,"JSObject"),new Error())},
u8(a){if(a==null)return a
if(A.ql(a))return a
throw A.ai(A.bb(a,"JSObject?"),new Error())},
qs(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aK(a[q],b)
return s},
uN(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.qs(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.aK(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
qh(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.B([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.b.m(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.e(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.aK(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.aK(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.aK(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.aK(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.aK(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
aK(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.aK(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.aK(a.x,b)+">"
if(l===8){p=A.uW(a.x)
o=a.y
return o.length>0?p+("<"+A.qs(o,b)+">"):p}if(l===10)return A.uN(a,b)
if(l===11)return A.qh(a,b,null)
if(l===12)return A.qh(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.e(b,n)
return b[n]}return"?"},
uW(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
tV(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
tU(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.nb(a,b,!1)
else if(typeof m=="number"){s=m
r=A.eB(a,5,"#")
q=A.nl(s)
for(p=0;p<s;++p)q[p]=r
o=A.eA(a,b,q)
n[b]=o
return o}else return m},
tS(a,b){return A.qa(a.tR,b)},
tR(a,b){return A.qa(a.eT,b)},
nb(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.pO(A.pM(a,null,b,!1))
r.set(b,s)
return s},
nc(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.pO(A.pM(a,b,c,!0))
q.set(c,r)
return r},
tT(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.or(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
c4(a,b){b.a=A.ur
b.b=A.us
return b},
eB(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.bk(null,null)
s.w=b
s.as=c
r=A.c4(a,s)
a.eC.set(c,r)
return r},
pW(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.tP(a,b,r,c)
a.eC.set(r,s)
return s},
tP(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.cG(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.di(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.bk(null,null)
q.w=6
q.x=b
q.as=c
return A.c4(a,q)},
pV(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.tN(a,b,r,c)
a.eC.set(r,s)
return s},
tN(a,b,c,d){var s,r
if(d){s=b.w
if(A.cG(b)||b===t.K)return b
else if(s===1)return A.eA(a,"af",[b])
else if(b===t.a||b===t.T)return t.gK}r=new A.bk(null,null)
r.w=7
r.x=b
r.as=c
return A.c4(a,r)},
tQ(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.bk(null,null)
s.w=13
s.x=b
s.as=q
r=A.c4(a,s)
a.eC.set(q,r)
return r},
ez(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
tM(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
eA(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.ez(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.bk(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.c4(a,r)
a.eC.set(p,q)
return q},
or(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.ez(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.bk(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.c4(a,o)
a.eC.set(q,n)
return n},
pX(a,b,c){var s,r,q="+"+(b+"("+A.ez(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.bk(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.c4(a,s)
a.eC.set(q,r)
return r},
pU(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.ez(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.ez(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.tM(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.bk(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.c4(a,p)
a.eC.set(r,o)
return o},
os(a,b,c,d){var s,r=b.as+("<"+A.ez(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.tO(a,b,c,r,d)
a.eC.set(r,s)
return s},
tO(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.nl(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.cB(a,b,r,0)
m=A.dg(a,c,r,0)
return A.os(a,n,m,c!==m)}}l=new A.bk(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.c4(a,l)},
pM(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
pO(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.tE(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.pN(a,r,l,k,!1)
else if(q===46)r=A.pN(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.cz(a.u,a.e,k.pop()))
break
case 94:k.push(A.tQ(a.u,k.pop()))
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
case 62:A.tG(a,k)
break
case 38:A.tF(a,k)
break
case 63:p=a.u
k.push(A.pW(p,A.cz(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.pV(p,A.cz(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.tD(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.pP(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.tI(a.u,a.e,o)
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
return A.cz(a.u,a.e,m)},
tE(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
pN(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.tV(s,o.x)[p]
if(n==null)A.bN('No "'+p+'" in "'+A.tg(o)+'"')
d.push(A.nc(s,o,n))}else d.push(p)
return m},
tG(a,b){var s,r=a.u,q=A.pL(a,b),p=b.pop()
if(typeof p=="string")b.push(A.eA(r,p,q))
else{s=A.cz(r,a.e,p)
switch(s.w){case 11:b.push(A.os(r,s,q,a.n))
break
default:b.push(A.or(r,s,q))
break}}},
tD(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.pL(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.cz(p,a.e,o)
q=new A.hn()
q.a=s
q.b=n
q.c=m
b.push(A.pU(p,r,q))
return
case-4:b.push(A.pX(p,b.pop(),s))
return
default:throw A.b(A.eR("Unexpected state under `()`: "+A.d(o)))}},
tF(a,b){var s=b.pop()
if(0===s){b.push(A.eB(a.u,1,"0&"))
return}if(1===s){b.push(A.eB(a.u,4,"1&"))
return}throw A.b(A.eR("Unexpected extended operation "+A.d(s)))},
pL(a,b){var s=b.splice(a.p)
A.pP(a.u,a.e,s)
a.p=b.pop()
return s},
cz(a,b,c){if(typeof c=="string")return A.eA(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.tH(a,b,c)}else return c},
pP(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.cz(a,b,c[s])},
tI(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.cz(a,b,c[s])},
tH(a,b,c){var s,r,q=b.w
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
qE(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.am(a,b,null,c,null)
r.set(c,s)}return s},
am(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.cG(d))return!0
s=b.w
if(s===4)return!0
if(A.cG(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.am(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.am(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.am(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.am(a,b.x,c,d,e))return!1
return A.am(a,A.oj(a,b),c,d,e)}if(s===6)return A.am(a,p,c,d,e)&&A.am(a,b.x,c,d,e)
if(q===7){if(A.am(a,b,c,d.x,e))return!0
return A.am(a,b,c,A.oj(a,d),e)}if(q===6)return A.am(a,b,c,p,e)||A.am(a,b,c,d.x,e)
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
if(!A.am(a,j,c,i,e)||!A.am(a,i,e,j,c))return!1}return A.qk(a,b.x,c,d.x,e)}if(q===11){if(b===t.dY)return!0
if(p)return!1
return A.qk(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.ux(a,b,c,d,e)}if(o&&q===10)return A.uC(a,b,c,d,e)
return!1},
qk(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.am(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.am(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.am(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.am(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.am(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
ux(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.nc(a,b,r[o])
return A.qb(a,p,null,c,d.y,e)}return A.qb(a,b.y,null,c,d.y,e)},
qb(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.am(a,b[s],d,e[s],f))return!1
return!0},
uC(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.am(a,r[s],c,q[s],e))return!1
return!0},
di(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.cG(a))if(s!==6)r=s===7&&A.di(a.x)
return r},
cG(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
qa(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
nl(a){return a>0?new Array(a):v.typeUniverse.sEA},
bk:function bk(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
hn:function hn(){this.c=this.b=this.a=null},
na:function na(a){this.a=a},
hk:function hk(){},
db:function db(a){this.a=a},
tn(){var s,r,q
if(self.scheduleImmediate!=null)return A.uZ()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.bK(new A.mz(s),1)).observe(r,{childList:true})
return new A.my(s,r,q)}else if(self.setImmediate!=null)return A.v_()
return A.v0()},
to(a){self.scheduleImmediate(A.bK(new A.mA(t.M.a(a)),0))},
tp(a){self.setImmediate(A.bK(new A.mB(t.M.a(a)),0))},
tq(a){A.om(B.a7,t.M.a(a))},
om(a,b){var s=B.e.ac(a.a,1000)
return A.tJ(s<0?0:s,b)},
px(a,b){var s=B.e.ac(a.a,1000)
return A.tK(s<0?0:s,b)},
tJ(a,b){var s=new A.ey(!0)
s.eE(a,b)
return s},
tK(a,b){var s=new A.ey(!1)
s.eF(a,b)
return s},
T(a){return new A.h4(new A.W($.V,a.i("W<0>")),a.i("h4<0>"))},
S(a,b){a.$2(0,null)
b.b=!0
return b.a},
y(a,b){A.ua(a,b)},
R(a,b){b.b7(0,a)},
Q(a,b){b.cg(A.an(a),A.c5(a))},
ua(a,b){var s,r,q=new A.nq(b),p=new A.nr(b)
if(a instanceof A.W)a.de(q,p,t.z)
else{s=t.z
if(a instanceof A.W)a.bH(q,p,s)
else{r=new A.W($.V,t._)
r.a=8
r.c=a
r.de(q,p,s)}}},
U(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.V.cv(new A.nA(s),t.H,t.S,t.z)},
pS(a,b,c){return 0},
o3(a){var s
if(t.W.b(a)){s=a.gaV()
if(s!=null)return s}return B.t},
o7(a,b){var s
b.a(a)
s=new A.W($.V,b.i("W<0>"))
s.aY(a)
return s},
rW(a,b,c){var s=new A.W($.V,c.i("W<0>"))
A.e2(a,new A.lP(b,s,c))
return s},
oC(a,b){if($.V===B.h)return null
return null},
uu(a,b){if($.V!==B.h)A.oC(a,b)
if(b==null)if(t.W.b(a)){b=a.gaV()
if(b==null){A.oi(a,B.t)
b=B.t}}else b=B.t
else if(t.W.b(a))A.oi(a,b)
return new A.at(a,b)},
mL(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t._;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.ok()
b.bP(new A.at(new A.b7(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.e.a(b.c)
b.a=b.a&1|4
b.c=n
n.d6(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.b1()
b.bk(o.a)
A.cu(b,p)
return}b.a^=2
A.df(null,null,b.b,t.M.a(new A.mM(o,b)))},
cu(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.n,r=t.e;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.ie(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.cu(d.a,c)
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
return}g=$.V
if(g!==h)$.V=h
else g=null
c=c.c
if((c&15)===8)new A.mQ(q,d,n).$0()
else if(o){if((c&1)!==0)new A.mP(q,j).$0()}else if((c&2)!==0)new A.mO(d,q).$0()
if(g!=null)$.V=g
c=q.c
if(c instanceof A.W){p=q.a.$ti
p=p.i("af<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.bp(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.mL(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.bp(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
qp(a,b){var s
if(t.ng.b(a))return b.cv(a,t.z,t.K,t.l)
s=t.w
if(s.b(a))return s.a(a)
throw A.b(A.kD(a,"onError",u.c))},
uH(){var s,r
for(s=$.de;s!=null;s=$.de){$.eK=null
r=s.b
$.de=r
if(r==null)$.eJ=null
s.a.$0()}},
uS(){$.oD=!0
try{A.uH()}finally{$.eK=null
$.oD=!1
if($.de!=null)$.oP().$1(A.qz())}},
qv(a){var s=new A.h5(a),r=$.eJ
if(r==null){$.de=$.eJ=s
if(!$.oD)$.oP().$1(A.qz())}else $.eJ=r.b=s},
uP(a){var s,r,q,p=$.de
if(p==null){A.qv(a)
$.eK=$.eJ
return}s=new A.h5(a)
r=$.eK
if(r==null){s.b=p
$.de=$.eK=s}else{q=r.b
s.b=q
$.eK=r.b=s
if(q==null)$.eJ=s}},
qJ(a){var s=null,r=$.V
if(B.h===r){A.df(s,s,B.h,a)
return}A.df(s,s,r,t.M.a(r.ce(a)))},
wd(a,b){A.cC(a,"stream",t.K)
return new A.hR(b.i("hR<0>"))},
qt(a){return},
pH(a,b,c){var s=b==null?A.v1():b
return t.gS.J(c).i("1(2)").a(s)},
tu(a,b){if(b==null)b=A.v3()
if(t.fQ.b(b))return a.cv(b,t.z,t.K,t.l)
if(t.i6.b(b))return t.w.a(b)
throw A.b(A.aY("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace.",null))},
uI(a){},
uK(a,b){A.ie(a,b)},
uJ(){},
ud(a,b,c){var s,r,q,p=a.a3(0)
if(p!==$.nW()){s=t.mY.a(new A.ns(b,c))
r=p.$ti
q=$.V
p.aX(new A.bn(new A.W(q,r),8,s,null,r.i("bn<1,1>")))}else b.aZ(c)},
e2(a,b){var s=$.V
if(s===B.h)return A.om(a,t.M.a(b))
return A.om(a,t.M.a(s.ce(b)))},
ml(a,b){var s=$.V
if(s===B.h)return A.px(a,t.my.a(b))
return A.px(a,t.my.a(s.ds(b,t.D)))},
ie(a,b){A.uP(new A.nz(a,b))},
qq(a,b,c,d,e){var s,r=$.V
if(r===c)return d.$0()
$.V=c
s=r
try{r=d.$0()
return r}finally{$.V=s}},
qr(a,b,c,d,e,f,g){var s,r=$.V
if(r===c)return d.$1(e)
$.V=c
s=r
try{r=d.$1(e)
return r}finally{$.V=s}},
uO(a,b,c,d,e,f,g,h,i){var s,r=$.V
if(r===c)return d.$2(e,f)
$.V=c
s=r
try{r=d.$2(e,f)
return r}finally{$.V=s}},
df(a,b,c,d){t.M.a(d)
if(B.h!==c){d=c.ce(d)
d=d}A.qv(d)},
mz:function mz(a){this.a=a},
my:function my(a,b,c){this.a=a
this.b=b
this.c=c},
mA:function mA(a){this.a=a},
mB:function mB(a){this.a=a},
ey:function ey(a){this.a=a
this.b=null
this.c=0},
n9:function n9(a,b){this.a=a
this.b=b},
n8:function n8(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h4:function h4(a,b){this.a=a
this.b=!1
this.$ti=b},
nq:function nq(a){this.a=a},
nr:function nr(a){this.a=a},
nA:function nA(a){this.a=a},
ev:function ev(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
da:function da(a,b){this.a=a
this.$ti=b},
at:function at(a,b){this.a=a
this.b=b},
d5:function d5(a,b){this.a=a
this.$ti=b},
bI:function bI(a,b,c,d,e){var _=this
_.ay=0
_.CW=_.ch=null
_.w=a
_.a=b
_.d=c
_.e=d
_.r=_.f=null
_.$ti=e},
e8:function e8(){},
e7:function e7(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.e=_.d=null
_.$ti=c},
lP:function lP(a,b,c){this.a=a
this.b=b
this.c=c},
mk:function mk(a,b){this.a=a
this.b=b},
h9:function h9(){},
bH:function bH(a,b){this.a=a
this.$ti=b},
bn:function bn(a,b,c,d,e){var _=this
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
mI:function mI(a,b){this.a=a
this.b=b},
mN:function mN(a,b){this.a=a
this.b=b},
mM:function mM(a,b){this.a=a
this.b=b},
mK:function mK(a,b){this.a=a
this.b=b},
mJ:function mJ(a,b){this.a=a
this.b=b},
mQ:function mQ(a,b,c){this.a=a
this.b=b
this.c=c},
mR:function mR(a,b){this.a=a
this.b=b},
mS:function mS(a){this.a=a},
mP:function mP(a,b){this.a=a
this.b=b},
mO:function mO(a,b){this.a=a
this.b=b},
mT:function mT(a,b){this.a=a
this.b=b},
mU:function mU(a,b,c){this.a=a
this.b=b
this.c=c},
mV:function mV(a,b){this.a=a
this.b=b},
h5:function h5(a){this.a=a
this.b=null},
bZ:function bZ(){},
mi:function mi(a,b){this.a=a
this.b=b},
mj:function mj(a,b){this.a=a
this.b=b},
mg:function mg(a){this.a=a},
mh:function mh(a,b,c){this.a=a
this.b=b
this.c=c},
e9:function e9(){},
ea:function ea(){},
d6:function d6(){},
d9:function d9(){},
ec:function ec(){},
eb:function eb(a,b){this.b=a
this.a=null
this.$ti=b},
hG:function hG(a){var _=this
_.a=0
_.c=_.b=null
_.$ti=a},
n1:function n1(a,b){this.a=a
this.b=b},
d7:function d7(a,b){var _=this
_.a=1
_.b=a
_.c=null
_.$ti=b},
hR:function hR(a){this.$ti=a},
ns:function ns(a,b){this.a=a
this.b=b},
eG:function eG(){},
hJ:function hJ(){},
n3:function n3(a,b){this.a=a
this.b=b},
n4:function n4(a,b,c){this.a=a
this.b=b
this.c=c},
nz:function nz(a,b){this.a=a
this.b=b},
oo(a,b){var s=a[b]
return s===a?null:s},
op(a,b,c){if(c==null)a[b]=a
else a[b]=c},
pJ(){var s=Object.create(null)
A.op(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
fo(a,b){return new A.bg(a.i("@<0>").J(b).i("bg<1,2>"))},
a3(a,b,c){return b.i("@<0>").J(c).i("ph<1,2>").a(A.v9(a,new A.bg(b.i("@<0>").J(c).i("bg<1,2>"))))},
ap(a,b){return new A.bg(a.i("@<0>").J(b).i("bg<1,2>"))},
cm(a){return new A.cx(a.i("cx<0>"))},
od(a){return new A.cx(a.i("cx<0>"))},
oq(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
tC(a,b,c){var s=new A.cy(a,b,c.i("cy<0>"))
s.c=a.e
return s},
ak(a,b,c){var s=A.fo(b,c)
J.ir(a,new A.m_(s,b,c))
return s},
oc(a,b,c){var s=A.fo(b,c)
s.S(0,a)
return s},
pi(a,b){var s,r,q=A.cm(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.as)(a),++r)q.m(0,b.a(a[r]))
return q},
oe(a){var s,r
if(A.oL(a))return"{...}"
s=new A.ar("")
try{r={}
B.b.m($.b5,a)
s.a+="{"
r.a=!0
J.ir(a,new A.m1(r,s))
s.a+="}"}finally{if(0>=$.b5.length)return A.e($.b5,-1)
$.b5.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
eg:function eg(){},
cw:function cw(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
eh:function eh(a,b){this.a=a
this.$ti=b},
ei:function ei(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cx:function cx(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
hw:function hw(a){this.a=a
this.c=this.b=null},
cy:function cy(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
e3:function e3(a,b){this.a=a
this.$ti=b},
m_:function m_(a,b,c){this.a=a
this.b=b
this.c=c},
m:function m(){},
G:function G(){},
m0:function m0(a){this.a=a},
m1:function m1(a,b){this.a=a
this.b=b},
d3:function d3(){},
aD:function aD(){},
cU:function cU(){},
c1:function c1(a,b){this.a=a
this.$ti=b},
av:function av(){},
eq:function eq(){},
dc:function dc(){},
uL(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.an(r)
q=A.a2(String(s),null,null)
throw A.b(q)}q=A.nt(p)
return q},
nt(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.hs(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.nt(a[s])
return a},
u4(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.rb()
else s=new Uint8Array(o)
for(r=J.w(a),q=0;q<o;++q){p=r.h(a,b+q)
if((p&255)!==p)p=255
s[q]=p}return s},
u3(a,b,c,d){var s=a?$.ra():$.r9()
if(s==null)return null
if(0===c&&d===b.length)return A.q9(s,b)
return A.q9(s,b.subarray(c,d))},
q9(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
oX(a,b,c,d,e,f){if(B.e.aT(f,4)!==0)throw A.b(A.a2("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.b(A.a2("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.b(A.a2("Invalid base64 padding, more than two '=' characters",a,b))},
tt(a,b,c,d,a0,a1){var s,r,q,p,o,n,m,l,k,j,i="Invalid encoding before padding",h="Invalid character",g=B.e.b4(a1,2),f=a1&3,e=$.oQ()
for(s=a.length,r=e.length,q=d.$flags|0,p=b,o=0;p<c;++p){if(!(p<s))return A.e(a,p)
n=a.charCodeAt(p)
o|=n
m=n&127
if(!(m<r))return A.e(e,m)
l=e[m]
if(l>=0){g=(g<<6|l)&16777215
f=f+1&3
if(f===0){k=a0+1
q&2&&A.al(d)
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
q&2&&A.al(d)
s=d.length
if(!(a0<s))return A.e(d,a0)
d[a0]=g>>>10
if(!(k<s))return A.e(d,k)
d[k]=g>>>2}else{if((g&15)!==0)throw A.b(A.a2(i,a,p))
q&2&&A.al(d)
if(!(a0<d.length))return A.e(d,a0)
d[a0]=g>>>4}j=(3-f)*3
if(n===37)j+=2
return A.pG(a,p+1,c,-j-1)}throw A.b(A.a2(h,a,p))}if(o>=0&&o<=127)return(g<<2|f)>>>0
for(p=b;p<c;++p){if(!(p<s))return A.e(a,p)
if(a.charCodeAt(p)>127)break}throw A.b(A.a2(h,a,p))},
tr(a,b,c,d){var s=A.ts(a,b,c),r=(d&3)+(s-b),q=B.e.b4(r,2)*3,p=r&3
if(p!==0&&s<c)q+=p-1
if(q>0)return new Uint8Array(q)
return $.r5()},
ts(a,b,c){var s,r=a.length,q=c,p=q,o=0
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
pG(a,b,c,d){var s,r,q
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
pf(a,b,c){return new A.dE(a,b)},
uj(a){return a.hB()},
tA(a,b){return new A.mY(a,[],A.v5())},
tB(a,b,c){var s,r=new A.ar(""),q=A.tA(r,b)
q.bK(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
u5(a){switch(a){case 65:return"Missing extension byte"
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
nj:function nj(){},
ni:function ni(){},
dl:function dl(a){this.a=a},
eW:function eW(a){this.a=a},
kF:function kF(){},
mC:function mC(){this.a=0},
cc:function cc(){},
f1:function f1(){},
fa:function fa(){},
dE:function dE(a,b){this.a=a
this.b=b},
fm:function fm(a,b){this.a=a
this.b=b},
fl:function fl(){},
lY:function lY(a){this.b=a},
lX:function lX(a){this.a=a},
mZ:function mZ(){},
n_:function n_(a,b){this.a=a
this.b=b},
mY:function mY(a,b,c){this.c=a
this.a=b
this.b=c},
h2:function h2(){},
mw:function mw(){},
nk:function nk(a){this.b=0
this.c=a},
mv:function mv(a){this.a=a},
nh:function nh(a){this.a=a
this.b=16
this.c=0},
p9(a,b){return A.t9(a,b,null)},
eM(a){var s=A.pq(a,null)
if(s!=null)return s
throw A.b(A.a2(a,null,null))},
bL(a){var s=A.dW(a)
if(s!=null)return s
throw A.b(A.a2("Invalid double",a,null))},
rU(a,b){a=A.ai(a,new Error())
if(a==null)a=A.b4(a)
a.stack=b.l(0)
throw a},
dK(a,b,c,d){var s,r=c?J.o9(a,d):J.pd(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
aO(a,b,c){var s,r=A.B([],c.i("ac<0>"))
for(s=J.aF(a);s.p();)B.b.m(r,c.a(s.gt(s)))
if(b)return r
r.$flags=1
return r},
a4(a,b){var s,r
if(Array.isArray(a))return A.B(a.slice(0),b.i("ac<0>"))
s=A.B([],b.i("ac<0>"))
for(r=J.aF(a);r.p();)B.b.m(s,r.gt(r))
return s},
pw(a,b,c){var s,r
A.cY(b,"start")
if(c!=null){s=c-b
if(s<0)throw A.b(A.ah(c,b,null,"end",null))
if(s===0)return""}r=A.ti(a,b,c)
return r},
ti(a,b,c){var s=a.length
if(b>=s)return""
return A.td(a,b,c==null||c>s?s:c)},
mc(a){return new A.fj(a,A.t1(a,!1,!0,!1,!1,""))},
pv(a,b,c){var s=J.aF(b)
if(!s.p())return a
if(c.length===0){do a+=A.d(s.gt(s))
while(s.p())}else{a+=A.d(s.gt(s))
while(s.p())a=a+c+A.d(s.gt(s))}return a},
pl(a,b){return new A.fB(a,b.gh8(),b.ghd(),b.gh9())},
e5(){var s,r,q=A.ta()
if(q==null)throw A.b(A.P("'Uri.base' is not supported"))
s=$.pC
if(s!=null&&q===$.pB)return s
r=A.cr(q)
$.pC=r
$.pB=q
return r},
q8(a,b,c,d){var s,r,q,p,o,n="0123456789ABCDEF"
if(c===B.l){s=$.r7()
s=s.b.test(b)}else s=!1
if(s)return b
r=B.a5.aB(b)
for(s=r.length,q=0,p="";q<s;++q){o=r[q]
if(o<128&&(u.f.charCodeAt(o)&a)!==0)p+=A.a6(o)
else p=d&&o===32?p+"+":p+"%"+n[o>>>4&15]+n[o&15]}return p.charCodeAt(0)==0?p:p},
tZ(a){var s,r,q
if(!$.r8())return A.u_(a)
s=new URLSearchParams()
a.q(0,new A.ng(s))
r=s.toString()
q=r.length
if(q>0&&r[q-1]==="=")r=B.a.n(r,0,q-1)
return r.replace(/=&|\*|%7E/g,b=>b==="=&"?"&":b==="*"?"%2A":"~")},
ok(){return A.c5(new Error())},
rP(a,b,c,d,e,f,g,h,i){var s=A.pr(a,b,c,d,e,f,g,h,i)
if(s==null)return null
return new A.ag(A.rR(s,h,i),h,i)},
lF(a){var s=A.pr(a,1,1,0,0,0,0,0,!1)
return new A.ag(s==null?new A.lG(a,1,1,0,0,0,0,0).$0():s,0,!1)},
rS(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=$.qQ().dw(a)
if(c!=null){s=new A.lI()
r=c.b
if(1>=r.length)return A.e(r,1)
q=r[1]
q.toString
p=A.eM(q)
if(2>=r.length)return A.e(r,2)
q=r[2]
q.toString
o=A.eM(q)
if(3>=r.length)return A.e(r,3)
q=r[3]
q.toString
n=A.eM(q)
if(4>=r.length)return A.e(r,4)
m=s.$1(r[4])
if(5>=r.length)return A.e(r,5)
l=s.$1(r[5])
if(6>=r.length)return A.e(r,6)
k=s.$1(r[6])
if(7>=r.length)return A.e(r,7)
j=new A.lJ().$1(r[7])
i=B.e.ac(j,1000)
q=r.length
if(8>=q)return A.e(r,8)
h=r[8]!=null
if(h){if(9>=q)return A.e(r,9)
g=r[9]
if(g!=null){f=g==="-"?-1:1
if(10>=q)return A.e(r,10)
q=r[10]
q.toString
e=A.eM(q)
if(11>=r.length)return A.e(r,11)
l-=f*(s.$1(r[11])+60*e)}}d=A.rP(p,o,n,m,l,k,i,j%1000,h)
if(d==null)throw A.b(A.a2("Time out of range",a,null))
return d}else throw A.b(A.a2("Invalid date format",a,null))},
p5(a){var s,r
try{s=A.rS(a)
return s}catch(r){if(A.an(r) instanceof A.bf)return null
else throw r}},
rR(a,b,c){var s="microsecond"
if(b>999)throw A.b(A.ah(b,0,999,s,null))
if(a<-864e13||a>864e13)throw A.b(A.ah(a,-864e13,864e13,"millisecondsSinceEpoch",null))
if(a===864e13&&b!==0)throw A.b(A.kD(b,s,"Time including microseconds is outside valid range"))
A.cC(c,"isUtc",t.y)
return a},
p4(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
rQ(a){var s=Math.abs(a),r=a<0?"-":"+"
if(s>=1e5)return r+s
return r+"0"+s},
lH(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bw(a){if(a>=10)return""+a
return"0"+a},
p6(a,b){return new A.aL(1000*a+1e6*b)},
by(a){if(typeof a=="number"||A.eH(a)||a==null)return J.M(a)
if(typeof a=="string")return JSON.stringify(a)
return A.tc(a)},
rV(a,b){A.cC(a,"error",t.K)
A.cC(b,"stackTrace",t.l)
A.rU(a,b)},
eR(a){return new A.eQ(a)},
aY(a,b){return new A.b7(!1,null,b,a)},
kD(a,b,c){return new A.b7(!0,a,b,c)},
te(a){var s=null
return new A.cX(s,s,!1,s,s,a)},
ps(a,b){return new A.cX(null,null,!0,a,b,"Value not in range")},
ah(a,b,c,d,e){return new A.cX(b,c,!0,a,d,"Invalid value")},
cp(a,b,c){if(0>a||a>c)throw A.b(A.ah(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.b(A.ah(b,a,c,"end",null))
return b}return c},
cY(a,b){if(a<0)throw A.b(A.ah(a,0,null,b,null))
return a},
a8(a,b,c,d,e){return new A.fe(b,!0,a,e,"Index out of range")},
P(a){return new A.e4(a)},
pz(a){return new A.fY(a)},
O(a){return new A.bq(a)},
a7(a){return new A.f0(a)},
a2(a,b,c){return new A.bf(a,b,c)},
rY(a,b,c){var s,r
if(A.oL(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.B([],t.s)
B.b.m($.b5,a)
try{A.uG(a,s)}finally{if(0>=$.b5.length)return A.e($.b5,-1)
$.b5.pop()}r=A.pv(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
o8(a,b,c){var s,r
if(A.oL(a))return b+"..."+c
s=new A.ar(b)
B.b.m($.b5,a)
try{r=s
r.a=A.pv(r.a,a,", ")}finally{if(0>=$.b5.length)return A.e($.b5,-1)
$.b5.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
uG(a,b){var s,r,q,p,o,n,m,l=a.gB(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.p())return
s=A.d(l.gt(l))
B.b.m(b,s)
k+=s.length+2;++j}if(!l.p()){if(j<=5)return
if(0>=b.length)return A.e(b,-1)
r=b.pop()
if(0>=b.length)return A.e(b,-1)
q=b.pop()}else{p=l.gt(l);++j
if(!l.p()){if(j<=4){B.b.m(b,A.d(p))
return}r=A.d(p)
if(0>=b.length)return A.e(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gt(l);++j
for(;l.p();p=o,o=n){n=l.gt(l);++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.e(b,-1)
k-=b.pop().length+2;--j}B.b.m(b,"...")
return}}q=A.d(p)
r=A.d(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.e(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.b.m(b,m)
B.b.m(b,q)
B.b.m(b,r)},
of(a,b,c,d){var s
if(B.r===c){s=B.d.gK(a)
b=B.d.gK(b)
return A.ol(A.c0(A.c0($.nX(),s),b))}if(B.r===d){s=B.d.gK(a)
b=B.d.gK(b)
c=J.cI(c)
return A.ol(A.c0(A.c0(A.c0($.nX(),s),b),c))}s=B.d.gK(a)
b=B.d.gK(b)
c=J.cI(c)
d=J.cI(d)
d=A.ol(A.c0(A.c0(A.c0(A.c0($.nX(),s),b),c),d))
return d},
c7(a){A.vs(a)},
cr(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){if(4>=a4)return A.e(a5,4)
s=((a5.charCodeAt(4)^58)*3|a5.charCodeAt(0)^100|a5.charCodeAt(1)^97|a5.charCodeAt(2)^116|a5.charCodeAt(3)^97)>>>0
if(s===0)return A.pA(a4<a4?B.a.n(a5,0,a4):a5,5,a3).ge3()
else if(s===32)return A.pA(B.a.n(a5,5,a4),0,a3).ge3()}r=A.dK(8,0,!1,t.S)
B.b.k(r,0,0)
B.b.k(r,1,-1)
B.b.k(r,2,-1)
B.b.k(r,7,-1)
B.b.k(r,3,0)
B.b.k(r,4,0)
B.b.k(r,5,a4)
B.b.k(r,6,a4)
if(A.qu(a5,0,a4,0,r)>=14)B.b.k(r,7,a4)
q=r[1]
if(q>=0)if(A.qu(a5,0,q,20,r)===20)r[7]=q
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
a5=B.a.aD(a5,n,m,"/");++a4
m=f}j="file"}else if(B.a.R(a5,"http",0)){if(i&&o+3===n&&B.a.R(a5,"80",o+1)){l-=3
e=n-3
m-=3
a5=B.a.aD(a5,o,n,"")
a4-=3
n=e}j="http"}}else if(q===5&&B.a.R(a5,"https",0)){if(i&&o+4===n&&B.a.R(a5,"443",o+1)){l-=4
e=n-4
m-=4
a5=B.a.aD(a5,o,n,"")
a4-=3
n=e}j="https"}k=!h}}}}if(k)return new A.ba(a4<a5.length?B.a.n(a5,0,a4):a5,q,p,o,n,m,l,j)
if(j==null)if(q>0)j=A.ou(a5,0,q)
else{if(q===0)A.dd(a5,0,"Invalid empty scheme")
j=""}d=a3
if(p>0){c=q+3
b=c<p?A.q4(a5,c,p-1):""
a=A.q1(a5,p,o,!1)
i=o+1
if(i<n){a0=A.pq(B.a.n(a5,i,n),a3)
d=A.nd(a0==null?A.bN(A.a2("Invalid port",a5,i)):a0,j)}}else{a=a3
b=""}a1=A.q2(a5,n,m,a3,j,a!=null)
a2=m<l?A.q3(a5,m+1,l,a3):a3
return A.eD(j,b,a,d,a1,a2,l<a4?A.q0(a5,l+1,a4):a3)},
pE(a){var s=t.N
return B.b.cj(A.B(a.split("&"),t.s),A.ap(s,s),new A.mu(B.l),t.je)},
h0(a,b,c){throw A.b(A.a2("Illegal IPv4 address, "+a,b,c))},
tk(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j="invalid character"
for(s=a.length,r=b,q=r,p=0,o=0;;){if(q>=c)n=0
else{if(!(q>=0&&q<s))return A.e(a,q)
n=a.charCodeAt(q)}m=n^48
if(m<=9){if(o!==0||q===r){o=o*10+m
if(o<=255){++q
continue}A.h0("each part must be in the range 0..255",a,r)}A.h0("parts must not have leading zeros",a,r)}if(q===r){if(q===c)break
A.h0(j,a,q)}l=p+1
k=e+p
d.$flags&2&&A.al(d)
if(!(k<16))return A.e(d,k)
d[k]=o
if(n===46){if(l<4){++q
p=l
r=q
o=0
continue}break}if(q===c){if(l===4)return
break}A.h0(j,a,q)
p=l}A.h0("IPv4 address should contain exactly 4 parts",a,q)},
tl(a,b,c){var s
if(b===c)throw A.b(A.a2("Empty IP address",a,b))
if(!(b>=0&&b<a.length))return A.e(a,b)
if(a.charCodeAt(b)===118){s=A.tm(a,b,c)
if(s!=null)throw A.b(s)
return!1}A.pD(a,b,c)
return!0},
tm(a,b,c){var s,r,q,p,o,n="Missing hex-digit in IPvFuture address",m=u.f;++b
for(s=a.length,r=b;;r=q){if(r<c){q=r+1
if(!(r>=0&&r<s))return A.e(a,r)
p=a.charCodeAt(r)
if((p^48)<=9)continue
o=p|32
if(o>=97&&o<=102)continue
if(p===46){if(q-1===b)return new A.bf(n,a,q)
r=q
break}return new A.bf("Unexpected character",a,q-1)}if(r-1===b)return new A.bf(n,a,r)
return new A.bf("Missing '.' in IPvFuture address",a,r)}if(r===c)return new A.bf("Missing address in IPvFuture address, host, cursor",null,null)
for(;;){if(!(r>=0&&r<s))return A.e(a,r)
p=a.charCodeAt(r)
if(!(p<128))return A.e(m,p)
if((m.charCodeAt(p)&16)!==0){++r
if(r<c)continue
return null}return new A.bf("Invalid IPvFuture address character",a,r)}},
pD(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="an address must contain at most 8 parts",a2=new A.mt(a3)
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
continue}a2.$2("an IPv6 part can contain a maximum of 4 hex digits",m)}if(n>m){if(j===46){if(k){if(p<=6){A.tk(a3,m,a5,s,p*2)
p+=2
n=a5
break}a2.$2(a1,m)}break}o=p*2
e=B.e.b4(l,8)
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
B.O.bN(s,a0,16,s,a)
B.O.fT(s,a,a0,0)}}return s},
eD(a,b,c,d,e,f,g){return new A.eC(a,b,c,d,e,f,g)},
pY(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
dd(a,b,c){throw A.b(A.a2(c,a,b))},
nd(a,b){if(a!=null&&a===A.pY(b))return null
return a},
q1(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(a==null)return null
if(b===c)return""
s=a.length
if(!(b>=0&&b<s))return A.e(a,b)
if(a.charCodeAt(b)===91){r=c-1
if(!(r>=0&&r<s))return A.e(a,r)
if(a.charCodeAt(r)!==93)A.dd(a,b,"Missing end `]` to match `[` in host")
q=b+1
if(!(q<s))return A.e(a,q)
p=""
if(a.charCodeAt(q)!==118){o=A.tX(a,q,r)
if(o<r){n=o+1
p=A.q7(a,B.a.R(a,"25",n)?o+3:n,r,"%25")}}else o=r
m=A.tl(a,q,o)
l=B.a.n(a,q,o)
return"["+(m?l.toLowerCase():l)+p+"]"}for(k=b;k<c;++k){if(!(k<s))return A.e(a,k)
if(a.charCodeAt(k)===58){o=B.a.bA(a,"%",b)
o=o>=b&&o<c?o:c
if(o<c){n=o+1
p=A.q7(a,B.a.R(a,"25",n)?o+3:n,c,"%25")}else p=""
A.pD(a,b,o)
return"["+B.a.n(a,b,o)+p+"]"}}return A.u1(a,b,c)},
tX(a,b,c){var s=B.a.bA(a,"%",b)
return s>=b&&s<c?s:c},
q7(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=d!==""?new A.ar(d):null
for(s=a.length,r=b,q=r,p=!0;r<c;){if(!(r>=0&&r<s))return A.e(a,r)
o=a.charCodeAt(r)
if(o===37){n=A.ov(a,r,!0)
m=n==null
if(m&&p){r+=3
continue}if(h==null)h=new A.ar("")
l=h.a+=B.a.n(a,q,r)
if(m)n=B.a.n(a,r,r+3)
else if(n==="%")A.dd(a,r,"ZoneID should not contain % anymore")
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
l=A.ot(o)
m.a+=l
r+=k
q=r}}if(h==null)return B.a.n(a,b,c)
if(q<c){i=B.a.n(a,q,c)
h.a+=i}s=h.a
return s.charCodeAt(0)==0?s:s},
u1(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.f
for(s=a.length,r=b,q=r,p=null,o=!0;r<c;){if(!(r>=0&&r<s))return A.e(a,r)
n=a.charCodeAt(r)
if(n===37){m=A.ov(a,r,!0)
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
q=r}o=!1}++r}else if(n<=93&&(g.charCodeAt(n)&1024)!==0)A.dd(a,r,"Invalid character")
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
j=A.ot(n)
l.a+=j
r+=i
q=r}}if(p==null)return B.a.n(a,b,c)
if(q<c){k=B.a.n(a,q,c)
if(!o)k=k.toLowerCase()
p.a+=k}s=p.a
return s.charCodeAt(0)==0?s:s},
ou(a,b,c){var s,r,q,p
if(b===c)return""
s=a.length
if(!(b<s))return A.e(a,b)
if(!A.q_(a.charCodeAt(b)))A.dd(a,b,"Scheme not starting with alphabetic character")
for(r=b,q=!1;r<c;++r){if(!(r<s))return A.e(a,r)
p=a.charCodeAt(r)
if(!(p<128&&(u.f.charCodeAt(p)&8)!==0))A.dd(a,r,"Illegal scheme character")
if(65<=p&&p<=90)q=!0}a=B.a.n(a,b,c)
return A.tW(q?a.toLowerCase():a)},
tW(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
q4(a,b,c){if(a==null)return""
return A.eE(a,b,c,16,!1,!1)},
q2(a,b,c,d,e,f){var s,r=e==="file",q=r||f
if(a==null)return r?"/":""
else s=A.eE(a,b,c,128,!0,!0)
if(s.length===0){if(r)return"/"}else if(q&&!B.a.N(s,"/"))s="/"+s
return A.u0(s,e,f)},
u0(a,b,c){var s=b.length===0
if(s&&!c&&!B.a.N(a,"/")&&!B.a.N(a,"\\"))return A.ow(a,!s||c)
return A.cA(a)},
q3(a,b,c,d){if(a!=null){if(d!=null)throw A.b(A.aY("Both query and queryParameters specified",null))
return A.eE(a,b,c,256,!0,!1)}if(d==null)return null
return A.tZ(d)},
u_(a){var s={},r=new A.ar("")
s.a=""
a.q(0,new A.ne(new A.nf(s,r)))
s=r.a
return s.charCodeAt(0)==0?s:s},
q0(a,b,c){if(a==null)return null
return A.eE(a,b,c,256,!0,!1)},
ov(a,b,c){var s,r,q,p,o,n,m=u.f,l=b+2,k=a.length
if(l>=k)return"%"
s=b+1
if(!(s>=0&&s<k))return A.e(a,s)
r=a.charCodeAt(s)
if(!(l>=0))return A.e(a,l)
q=a.charCodeAt(l)
p=A.nG(r)
o=A.nG(q)
if(p<0||o<0)return"%"
n=p*16+o
if(n<127){if(!(n>=0))return A.e(m,n)
l=(m.charCodeAt(n)&1)!==0}else l=!1
if(l)return A.a6(c&&65<=n&&90>=n?(n|32)>>>0:n)
if(r>=97||q>=97)return B.a.n(a,b,b+3).toUpperCase()
return null},
ot(a){var s,r,q,p,o,n,m,l,k="0123456789ABCDEF"
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
for(o=0;--p,p>=0;q=128){n=B.e.fn(a,6*p)&63|q
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
o+=3}}return A.pw(s,0,null)},
eE(a,b,c,d,e,f){var s=A.q6(a,b,c,d,e,f)
return s==null?B.a.n(a,b,c):s},
q6(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null,h=u.f
for(s=!e,r=a.length,q=b,p=q,o=i;q<c;){if(!(q>=0&&q<r))return A.e(a,q)
n=a.charCodeAt(q)
if(n<127&&(h.charCodeAt(n)&d)!==0)++q
else{m=1
if(n===37){l=A.ov(a,q,!1)
if(l==null){q+=3
continue}if("%"===l)l="%25"
else m=3}else if(n===92&&f)l="/"
else if(s&&n<=93&&(h.charCodeAt(n)&1024)!==0){A.dd(a,q,"Invalid character")
m=i
l=m}else{if((n&64512)===55296){k=q+1
if(k<c){if(!(k<r))return A.e(a,k)
j=a.charCodeAt(k)
if((j&64512)===56320){n=65536+((n&1023)<<10)+(j&1023)
m=2}}}l=A.ot(n)}if(o==null){o=new A.ar("")
k=o}else k=o
k.a=(k.a+=B.a.n(a,p,q))+l
if(typeof m!=="number")return A.vg(m)
q+=m
p=q}}if(o==null)return i
if(p<c){s=B.a.n(a,p,c)
o.a+=s}s=o.a
return s.charCodeAt(0)==0?s:s},
q5(a){if(B.a.N(a,"."))return!0
return B.a.dC(a,"/.")!==-1},
cA(a){var s,r,q,p,o,n,m
if(!A.q5(a))return a
s=A.B([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(n===".."){m=s.length
if(m!==0){if(0>=m)return A.e(s,-1)
s.pop()
if(s.length===0)B.b.m(s,"")}p=!0}else{p="."===n
if(!p)B.b.m(s,n)}}if(p)B.b.m(s,"")
return B.b.a_(s,"/")},
ow(a,b){var s,r,q,p,o,n
if(!A.q5(a))return!b?A.pZ(a):a
s=A.B([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n){if(s.length!==0&&B.b.gdF(s)!==".."){if(0>=s.length)return A.e(s,-1)
s.pop()}else B.b.m(s,"..")
p=!0}else{p="."===n
if(!p)B.b.m(s,n.length===0&&s.length===0?"./":n)}}if(s.length===0)return"./"
if(p)B.b.m(s,"")
if(!b){if(0>=s.length)return A.e(s,0)
B.b.k(s,0,A.pZ(s[0]))}return B.b.a_(s,"/")},
pZ(a){var s,r,q,p=u.f,o=a.length
if(o>=2&&A.q_(a.charCodeAt(0)))for(s=1;s<o;++s){r=a.charCodeAt(s)
if(r===58)return B.a.n(a,0,s)+"%3A"+B.a.Z(a,s+1)
if(r<=127){if(!(r<128))return A.e(p,r)
q=(p.charCodeAt(r)&8)===0}else q=!0
if(q)break}return a},
u2(a,b){if(a.h2("package")&&a.c==null)return A.qw(b,0,b.length)
return-1},
tY(a,b){var s,r,q,p,o
for(s=a.length,r=0,q=0;q<2;++q){p=b+q
if(!(p<s))return A.e(a,p)
o=a.charCodeAt(p)
if(48<=o&&o<=57)r=r*16+o-48
else{o|=32
if(97<=o&&o<=102)r=r*16+o-87
else throw A.b(A.aY("Invalid URL encoding",null))}}return r},
ox(a,b,c,d,e){var s,r,q,p,o=a.length,n=b
for(;;){if(!(n<c)){s=!0
break}if(!(n<o))return A.e(a,n)
r=a.charCodeAt(n)
q=!0
if(r<=127)if(r!==37)q=r===43
if(q){s=!1
break}++n}if(s)if(B.l===d)return B.a.n(a,b,c)
else p=new A.f_(B.a.n(a,b,c))
else{p=A.B([],t.b)
for(n=b;n<c;++n){if(!(n<o))return A.e(a,n)
r=a.charCodeAt(n)
if(r>127)throw A.b(A.aY("Illegal percent encoding in URI",null))
if(r===37){if(n+3>o)throw A.b(A.aY("Truncated URI",null))
B.b.m(p,A.tY(a,n+1))
n+=2}else if(r===43)B.b.m(p,32)
else B.b.m(p,r)}}return d.L(0,p)},
q_(a){var s=a|32
return 97<=s&&s<=122},
pA(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.B([b-1],t.b)
for(s=a.length,r=b,q=-1,p=null;r<s;++r){p=a.charCodeAt(r)
if(p===44||p===59)break
if(p===47){if(q<0){q=r
continue}throw A.b(A.a2(k,a,r))}}if(q<0&&r>b)throw A.b(A.a2(k,a,r))
while(p!==44){B.b.m(j,r);++r
for(o=-1;r<s;++r){if(!(r>=0))return A.e(a,r)
p=a.charCodeAt(r)
if(p===61){if(o<0)o=r}else if(p===59||p===44)break}if(o>=0)B.b.m(j,o)
else{n=B.b.gdF(j)
if(p!==44||r!==n+7||!B.a.R(a,"base64",n+1))throw A.b(A.a2("Expecting '='",a,r))
break}}B.b.m(j,r)
m=r+1
if((j.length&1)===1)a=B.W.dK(0,a,m,s)
else{l=A.q6(a,m,s,256,!0,!1)
if(l!=null)a=B.a.aD(a,m,s,l)}return new A.ms(a,j,c)},
qu(a,b,c,d,e){var s,r,q,p,o,n='\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe3\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0e\x03\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\n\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\xeb\xeb\x8b\xeb\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x83\xeb\xeb\x8b\xeb\x8b\xeb\xcd\x8b\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x92\x83\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x8b\xeb\x8b\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xebD\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12D\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe8\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x05\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x10\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\f\xec\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\xec\f\xec\f\xec\xcd\f\xec\f\f\f\f\f\f\f\f\f\xec\f\f\f\f\f\f\f\f\f\f\xec\f\xec\f\xec\f\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\r\xed\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\xed\r\xed\r\xed\xed\r\xed\r\r\r\r\r\r\r\r\r\xed\r\r\r\r\r\r\r\r\r\r\xed\r\xed\r\xed\r\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0f\xea\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe9\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\t\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x11\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xe9\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\t\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x13\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\xf5\x15\x15\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5'
for(s=a.length,r=b;r<c;++r){if(!(r<s))return A.e(a,r)
q=a.charCodeAt(r)^96
if(q>95)q=31
p=d*96+q
if(!(p<2112))return A.e(n,p)
o=n.charCodeAt(p)
d=o&31
B.b.k(e,o>>>5,r)}return d},
pQ(a){if(a.b===7&&B.a.N(a.a,"package")&&a.c<=0)return A.qw(a.a,a.e,a.f)
return-1},
qw(a,b,c){var s,r,q,p
for(s=a.length,r=b,q=0;r<c;++r){if(!(r>=0&&r<s))return A.e(a,r)
p=a.charCodeAt(r)
if(p===47)return q!==0?r:-1
if(p===37||p===58)return-1
q|=p^46}return-1},
ue(a,b,c){var s,r,q,p,o,n,m,l
for(s=a.length,r=b.length,q=0,p=0;p<s;++p){o=c+p
if(!(o<r))return A.e(b,o)
n=b.charCodeAt(o)
m=a.charCodeAt(p)^n
if(m!==0){if(m===32){l=n|m
if(97<=l&&l<=122){q=32
continue}}return-1}}return q},
m4:function m4(a,b){this.a=a
this.b=b},
ng:function ng(a){this.a=a},
lG:function lG(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h},
ag:function ag(a,b,c){this.a=a
this.b=b
this.c=c},
lI:function lI(){},
lJ:function lJ(){},
aL:function aL(a){this.a=a},
a0:function a0(){},
eQ:function eQ(a){this.a=a},
bD:function bD(){},
b7:function b7(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
cX:function cX(a,b,c,d,e,f){var _=this
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
dY:function dY(){},
mH:function mH(a){this.a=a},
bf:function bf(a,b,c){this.a=a
this.b=b
this.c=c},
h:function h(){},
aq:function aq(a,b,c){this.a=a
this.b=b
this.$ti=c},
ad:function ad(){},
H:function H(){},
hU:function hU(){},
ar:function ar(a){this.a=a},
mu:function mu(a){this.a=a},
mt:function mt(a){this.a=a},
eC:function eC(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
nf:function nf(a,b){this.a=a
this.b=b},
ne:function ne(a){this.a=a},
ms:function ms(a,b,c){this.a=a
this.b=b
this.c=c},
ba:function ba(a,b,c,d,e,f,g,h){var _=this
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
tv(a){var s=a.firstElementChild
if(s==null)throw A.b(A.O("No elements"))
return s},
rT(a,b,c){var s,r=document.body
r.toString
s=t.aN
return t.h.a(new A.I(new A.aC(B.A.a7(r,a,b,c)),s.i("F(m.E)").a(new A.lK()),s.i("I<m.E>")).gaH(0))},
dt(a){var s,r,q="element tag unavailable"
try{s=a.tagName
s.toString
q=s}catch(r){}return q},
pa(a){var s,r="visibilitychange"
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
pb(a){var s=document.createElement("img")
s.toString
if(a!=null)B.J.scO(s,a)
return s},
t7(a,b,c,d){var s=new Option(a,b,c,!1)
s.toString
return s},
tx(a,b){var s,r=a.classList
r.toString
for(s=0;s<5;++s)r.remove(b[s])},
A(a,b,c,d,e){var s=c==null?null:A.qx(new A.mF(c),t.A)
s=new A.ef(a,b,s,!1,e.i("ef<0>"))
s.dh()
return s},
pK(a){var s=document.createElement("a")
s.toString
s=new A.hM(s,t.d.a(window.location))
s=new A.cv(s)
s.eB(a)
return s},
ty(a,b,c,d){t.h.a(a)
A.x(b)
A.x(c)
t.dl.a(d)
return!0},
tz(a,b,c,d){var s,r,q,p,o,n
t.h.a(a)
A.x(b)
A.x(c)
s=t.dl.a(d).a
r=s.a
B.T.sfW(r,c)
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
pT(){var s=t.N,r=A.pi(B.L,s),q=A.B(["TEMPLATE"],t.s),p=t.gL.a(new A.n7())
s=new A.hX(r,A.cm(s),A.cm(s),A.cm(s),null)
s.eD(null,new A.a1(B.L,p,t.gQ),q,null)
return s},
qe(a){var s,r="postMessage" in a
r.toString
if(r){s=A.tw(a)
return s}else return t.O.a(a)},
tw(a){var s=window
s.toString
if(a===s)return t.kg.a(a)
else return new A.hc()},
qx(a,b){var s=$.V
if(s===B.h)return a
return s.ds(a,b)},
q:function q(){},
eO:function eO(){},
cJ:function cJ(){},
eP:function eP(){},
cK:function cK(){},
bP:function bP(){},
cb:function cb(){},
bQ:function bQ(){},
bp:function bp(){},
f3:function f3(){},
Y:function Y(){},
cd:function cd(){},
kJ:function kJ(){},
aH:function aH(){},
be:function be(){},
f4:function f4(){},
f5:function f5(){},
f6:function f6(){},
dp:function dp(){},
ce:function ce(){},
f7:function f7(){},
dq:function dq(){},
dr:function dr(){},
ds:function ds(){},
f8:function f8(){},
f9:function f9(){},
h8:function h8(a,b){this.a=a
this.b=b},
bm:function bm(a,b){this.a=a
this.$ti=b},
D:function D(){},
lK:function lK(){},
o:function o(){},
du:function du(){},
f:function f(){},
aM:function aM(){},
dw:function dw(){},
dx:function dx(){},
fb:function fb(){},
cg:function cg(){},
aN:function aN(){},
dy:function dy(){},
fd:function fd(){},
bT:function bT(){},
dz:function dz(){},
bz:function bz(){},
ci:function ci(){},
cN:function cN(){},
dA:function dA(){},
bU:function bU(){},
bB:function bB(){},
cT:function cT(){},
fp:function fp(){},
fq:function fq(){},
fr:function fr(){},
m2:function m2(a){this.a=a},
fs:function fs(){},
m3:function m3(a){this.a=a},
aP:function aP(){},
ft:function ft(){},
az:function az(){},
aC:function aC(a){this.a=a},
v:function v(){},
cV:function cV(){},
bC:function bC(){},
dT:function dT(){},
aQ:function aQ(){},
fG:function fG(){},
b8:function b8(){},
fI:function fI(){},
md:function md(a){this.a=a},
bY:function bY(){},
aS:function aS(){},
fK:function fK(){},
dX:function dX(){},
aT:function aT(){},
fL:function fL(){},
aU:function aU(){},
dZ:function dZ(){},
mf:function mf(a){this.a=a},
aA:function aA(){},
e1:function e1(){},
fO:function fO(){},
fP:function fP(){},
d1:function d1(){},
cq:function cq(){},
aV:function aV(){},
aB:function aB(){},
fR:function fR(){},
fS:function fS(){},
fT:function fT(){},
aW:function aW(){},
fV:function fV(){},
fW:function fW(){},
bs:function bs(){},
h1:function h1(){},
h3:function h3(){},
c2:function c2(){},
bt:function bt(){},
d4:function d4(){},
ha:function ha(){},
ed:function ed(){},
ho:function ho(){},
el:function el(){},
hP:function hP(){},
hV:function hV(){},
h6:function h6(){},
ee:function ee(a){this.a=a},
hd:function hd(a){this.a=a},
mD:function mD(a,b){this.a=a
this.b=b},
mE:function mE(a,b){this.a=a
this.b=b},
hj:function hj(a){this.a=a},
o6:function o6(a,b){this.a=a
this.$ti=b},
ct:function ct(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
aX:function aX(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
ef:function ef(a,b,c,d,e){var _=this
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
mF:function mF(a){this.a=a},
mG:function mG(a){this.a=a},
on:function on(a){this.$ti=a},
cv:function cv(a){this.a=a},
z:function z(){},
dR:function dR(a){this.a=a},
m6:function m6(a){this.a=a},
m5:function m5(a,b,c){this.a=a
this.b=b
this.c=c},
er:function er(){},
n5:function n5(){},
n6:function n6(){},
hX:function hX(a,b,c,d,e){var _=this
_.e=a
_.a=b
_.b=c
_.c=d
_.d=e},
n7:function n7(){},
hW:function hW(){},
cf:function cf(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.d=null
_.$ti=c},
hc:function hc(){},
hM:function hM(a,b){this.a=a
this.b=b},
eF:function eF(a){this.a=a
this.b=0},
nm:function nm(a){this.a=a},
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
qf(a){var s,r,q,p
if(a==null)return a
if(typeof a=="string"||typeof a=="number"||A.eH(a))return a
s=Object.getPrototypeOf(a)
r=s===Object.prototype
r.toString
if(!r){r=s===null
r.toString}else r=!0
if(r)return A.bc(a)
r=Array.isArray(a)
r.toString
if(r){q=[]
p=0
for(;;){r=a.length
r.toString
if(!(p<r))break
q.push(A.qf(a[p]));++p}return q}return a},
bc(a){var s,r,q,p,o,n
if(a==null)return null
s=A.ap(t.N,t.z)
r=Object.getOwnPropertyNames(a)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.as)(r),++p){o=r[p]
n=o
n.toString
s.k(0,n,A.qf(a[o]))}return s},
o4(){var s=window.navigator.userAgent
s.toString
return s},
f2:function f2(){},
kH:function kH(a){this.a=a},
kI:function kI(a){this.a=a},
fc:function fc(a,b){this.a=a
this.b=b},
lL:function lL(){},
lM:function lM(){},
cS:function cS(){},
ub(a,b,c,d){var s,r,q
A.nn(b)
t.j.a(d)
if(b){s=[c]
B.b.S(s,d)
d=s}r=t.z
q=A.aO(J.ca(d,A.vm(),r),!0,r)
return A.nu(A.p9(t.Z.a(a),q))},
lV(a){if(!t.f.b(a)&&!t.R.b(a))throw A.b(A.aY("object must be a Map or Iterable",null))
return A.oE(A.t2(a))},
t2(a){return new A.lW(new A.cw(t.mp)).$1(a)},
uf(a){return a},
oz(a,b,c){var s
try{if(Object.isExtensible(a)&&!Object.prototype.hasOwnProperty.call(a,b)){Object.defineProperty(a,b,{value:c})
return!0}}catch(s){}return!1},
qj(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return null},
nu(a){if(a==null||typeof a=="string"||typeof a=="number"||A.eH(a))return a
if(a instanceof A.aZ)return a.a
if(A.qD(a))return a
if(t.jv.b(a))return a
if(a instanceof A.ag)return A.aR(a)
if(t.Z.b(a))return A.qi(a,"$dart_jsFunction",new A.nv())
return A.qi(a,"_$dart_jsObject",new A.nw($.oS()))},
qi(a,b,c){var s=A.qj(a,b)
if(s==null){s=c.$1(a)
A.oz(a,b,s)}return s},
oy(a){var s
if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else if(a instanceof Object&&A.qD(a))return a
else if(a instanceof Object&&t.jv.b(a))return a
else if(a instanceof Date){s=A.L(a.getTime())
if(s<-864e13||s>864e13)A.bN(A.ah(s,-864e13,864e13,"millisecondsSinceEpoch",null))
A.cC(!1,"isUtc",t.y)
return new A.ag(s,0,!1)}else if(a.constructor===$.oS())return a.o
else return A.oE(a)},
oE(a){if(typeof a=="function")return A.oA(a,$.io(),new A.nB())
if(Array.isArray(a))return A.oA(a,$.oR(),new A.nC())
return A.oA(a,$.oR(),new A.nD())},
oA(a,b,c){var s=A.qj(a,b)
if(s==null||!(a instanceof Object)){s=c.$1(a)
A.oz(a,b,s)}return s},
lW:function lW(a){this.a=a},
hL:function hL(){},
nv:function nv(){},
nw:function nw(a){this.a=a},
nB:function nB(){},
nC:function nC(){},
nD:function nD(){},
aZ:function aZ(a){this.a=a},
cR:function cR(a){this.a=a},
ck:function ck(a,b){this.a=a
this.$ti=b},
d8:function d8(){},
m7:function m7(a){this.a=a},
ui(a){var s,r=a.$dart_jsFunction
if(r!=null)return r
s=function(b,c){return function(){return b(c,Array.prototype.slice.apply(arguments))}}(A.uc,a)
s[$.io()]=a
a.$dart_jsFunction=s
return s},
uc(a,b){t.j.a(b)
return A.p9(t.Z.a(a),b)},
uY(a,b){if(typeof a=="function")return a
else return b.a(A.ui(a))},
qo(a){return a==null||A.eH(a)||typeof a=="number"||typeof a=="string"||t.jx.b(a)||t.ev.b(a)||t.nn.b(a)||t.m6.b(a)||t.hM.b(a)||t.bW.b(a)||t.mC.b(a)||t.pk.b(a)||t.kI.b(a)||t.lo.b(a)||t.fW.b(a)},
vo(a){if(A.qo(a))return a
return new A.nL(new A.cw(t.as)).$1(a)},
qG(a,b){var s=new A.W($.V,b.i("W<0>")),r=new A.bH(s,b.i("bH<0>"))
a.then(A.bK(new A.nS(r,b),1),A.bK(new A.nT(r),1))
return s},
nL:function nL(a){this.a=a},
nS:function nS(a,b){this.a=a
this.b=b},
nT:function nT(a){this.a=a},
mW:function mW(a){this.a=a},
b_:function b_(){},
fn:function fn(){},
b2:function b2(){},
fC:function fC(){},
fH:function fH(){},
d_:function d_(){},
fN:function fN(){},
eS:function eS(a){this.a=a},
u:function u(){},
b3:function b3(){},
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
kE:function kE(a){this.a=a},
eV:function eV(){},
bO:function bO(){},
fD:function fD(){},
h7:function h7(){},
vq(){var s=document
s.toString
B.I.cc(s,"DOMContentLoaded",new A.nM())},
nM:function nM(){},
iu:function iu(){var _=this
_.a=null
_.b="view-dashboard"
_.r=_.f=_.e=_.d=_.c=null
_.x=_.w=0
_.z=_.y=!1
_.Q=0
_.ax=_.at=_.as=null
_.ay=!1
_.k2=_.id=_.go=_.fy=_.fx=_.fr=_.dy=_.dx=_.db=_.cy=_.cx=_.CW=_.ch=$
_.k3=!1
_.k4=0
_.ok=null
_.p2=_.p1=0
_.p3=!1
_.RG=_.R8=_.p4=null
_.rx=!1
_.ry="name"
_.to=!1
_.x1=null},
jL:function jL(){},
jE:function jE(a){this.a=a},
jF:function jF(){},
jG:function jG(a){this.a=a},
jD:function jD(){},
jH:function jH(a){this.a=a},
jI:function jI(a){this.a=a},
jJ:function jJ(a){this.a=a},
jK:function jK(a){this.a=a},
j5:function j5(a){this.a=a},
j1:function j1(){},
j2:function j2(){},
j3:function j3(a,b){this.a=a
this.b=b},
j4:function j4(a){this.a=a},
j7:function j7(a){this.a=a},
j8:function j8(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
j9:function j9(a){this.a=a},
jc:function jc(a){this.a=a},
jd:function jd(a){this.a=a},
j6:function j6(a,b){this.a=a
this.b=b},
je:function je(a){this.a=a},
jf:function jf(a){this.a=a},
jg:function jg(a){this.a=a},
jh:function jh(a){this.a=a},
ji:function ji(a){this.a=a},
jj:function jj(a,b){this.a=a
this.b=b},
ja:function ja(a){this.a=a},
jb:function jb(a,b){this.a=a
this.b=b},
jt:function jt(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
ju:function ju(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jv:function jv(a){this.a=a},
jw:function jw(a){this.a=a},
jx:function jx(a,b,c,d,e,f,g,h,i,j){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j},
js:function js(a,b,c){this.a=a
this.b=b
this.c=c},
jk:function jk(){},
kr:function kr(){},
ks:function ks(){},
kt:function kt(){},
kA:function kA(a){this.a=a},
kB:function kB(a){this.a=a},
k0:function k0(){},
k1:function k1(a,b){this.a=a
this.b=b},
k_:function k_(a,b){this.a=a
this.b=b},
k2:function k2(a,b){this.a=a
this.b=b},
jZ:function jZ(a){this.a=a},
k3:function k3(a,b){this.a=a
this.b=b},
jX:function jX(a){this.a=a},
jY:function jY(a,b){this.a=a
this.b=b},
k4:function k4(a,b,c){this.a=a
this.b=b
this.c=c},
jU:function jU(a){this.a=a},
jV:function jV(a){this.a=a},
jW:function jW(a,b){this.a=a
this.b=b},
k5:function k5(a,b,c){this.a=a
this.b=b
this.c=c},
jS:function jS(a){this.a=a},
jT:function jT(){},
k7:function k7(a,b,c){this.a=a
this.b=b
this.c=c},
k8:function k8(a,b){this.a=a
this.b=b},
k6:function k6(a,b){this.a=a
this.b=b},
jM:function jM(a){this.a=a},
kl:function kl(){},
km:function km(a,b){this.a=a
this.b=b},
kn:function kn(){},
ko:function ko(){},
kp:function kp(a,b){this.a=a
this.b=b},
k9:function k9(a){this.a=a},
ka:function ka(a,b){this.a=a
this.b=b},
kb:function kb(){},
kc:function kc(){},
kd:function kd(a){this.a=a},
jz:function jz(a){this.a=a},
jA:function jA(a){this.a=a},
jy:function jy(a){this.a=a},
jB:function jB(a){this.a=a},
jC:function jC(a){this.a=a},
jl:function jl(a,b){this.a=a
this.b=b},
kq:function kq(a){this.a=a},
jm:function jm(a,b){this.a=a
this.b=b},
jn:function jn(a){this.a=a},
jo:function jo(a){this.a=a},
jp:function jp(a){this.a=a},
jq:function jq(a,b){this.a=a
this.b=b},
jr:function jr(a){this.a=a},
ku:function ku(a,b){this.a=a
this.b=b},
kv:function kv(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jO:function jO(a){this.a=a},
jP:function jP(){},
jQ:function jQ(){},
jR:function jR(){},
kC:function kC(){},
jN:function jN(a,b){this.a=a
this.b=b},
kz:function kz(a){this.a=a},
kw:function kw(){},
kx:function kx(){},
ky:function ky(){},
j0:function j0(a){this.a=a},
ke:function ke(){},
kf:function kf(){},
kg:function kg(){},
kh:function kh(a){this.a=a},
ki:function ki(){},
kj:function kj(){},
kk:function kk(a,b){this.a=a
this.b=b},
iW:function iW(){},
iV:function iV(a){this.a=a},
iX:function iX(a){this.a=a},
iY:function iY(a,b){this.a=a
this.b=b},
iZ:function iZ(a,b,c){this.a=a
this.b=b
this.c=c},
j_:function j_(){},
iA:function iA(a,b,c){this.a=a
this.b=b
this.c=c},
iB:function iB(a){this.a=a},
iC:function iC(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
iT:function iT(a,b,c){this.a=a
this.b=b
this.c=c},
iU:function iU(a){this.a=a},
iw:function iw(a,b,c){this.a=a
this.b=b
this.c=c},
ix:function ix(a){this.a=a},
iy:function iy(a){this.a=a},
iI:function iI(a,b,c){this.a=a
this.b=b
this.c=c},
iS:function iS(a,b){this.a=a
this.b=b},
iz:function iz(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
iR:function iR(a,b){this.a=a
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
iP:function iP(a,b){this.a=a
this.b=b},
iD:function iD(a,b){this.a=a
this.b=b},
iE:function iE(a,b,c){this.a=a
this.b=b
this.c=c},
iQ:function iQ(a,b){this.a=a
this.b=b},
iF:function iF(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
iG:function iG(a,b,c){this.a=a
this.b=b
this.c=c},
iv:function iv(){},
iH:function iH(a){this.a=a},
aG:function aG(a,b,c){this.a=a
this.b=b
this.c=c},
kK:function kK(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
kN:function kN(){},
kO:function kO(a){this.a=a},
kV:function kV(a){this.a=a},
kR:function kR(a,b){this.a=a
this.b=b},
kS:function kS(a){this.a=a},
kT:function kT(a){this.a=a},
kU:function kU(a,b){this.a=a
this.b=b},
l9:function l9(){},
la:function la(){},
kQ:function kQ(){},
ll:function ll(){},
lm:function lm(a,b,c){this.a=a
this.b=b
this.c=c},
lq:function lq(){},
lr:function lr(a){this.a=a},
ls:function ls(a){this.a=a},
lp:function lp(a){this.a=a},
lt:function lt(a){this.a=a},
lu:function lu(){},
lf:function lf(a){this.a=a},
lg:function lg(a){this.a=a},
lh:function lh(a){this.a=a},
li:function li(a){this.a=a},
lj:function lj(a){this.a=a},
lk:function lk(a){this.a=a},
kY:function kY(){},
l8:function l8(){},
lo:function lo(a,b,c){this.a=a
this.b=b
this.c=c},
ln:function ln(a,b){this.a=a
this.b=b},
lv:function lv(){},
lw:function lw(){},
lx:function lx(a){this.a=a},
ly:function ly(){},
kM:function kM(){},
kL:function kL(a,b,c){this.a=a
this.b=b
this.c=c},
l7:function l7(a,b){this.a=a
this.b=b},
lz:function lz(a){this.a=a},
l6:function l6(){},
lA:function lA(){},
lB:function lB(a){this.a=a},
lC:function lC(){},
lD:function lD(a){this.a=a},
lE:function lE(){},
kX:function kX(a,b){this.a=a
this.b=b},
kW:function kW(a,b){this.a=a
this.b=b},
l4:function l4(a){this.a=a},
l5:function l5(){},
l0:function l0(){},
l1:function l1(){},
l2:function l2(a){this.a=a},
l3:function l3(){},
lb:function lb(a,b){this.a=a
this.b=b},
lc:function lc(){},
ld:function ld(){},
le:function le(a,b){this.a=a
this.b=b},
kP:function kP(a){this.a=a},
l_:function l_(a,b){this.a=a
this.b=b},
kZ:function kZ(a){this.a=a},
im(){var s,r=$.qV(),q=A.B(new Array(24),t.s)
for(s=0;s<24;++s)q[s]=B.a.bc(B.e.hs(r.ha(256),16),2,"0")
return B.b.h3(q)},
b6(){var s,r,q
try{r=window.localStorage.getItem("waterhall_jwt")
r.toString
s=r
r=J.oV(s,".")
if(1>=r.length)return A.e(r,1)
r=A.x(J.k(B.c.L(0,B.l.L(0,B.v.aB(B.z.dJ(0,r[1])))),"sub"))
return r}catch(q){return null}},
cF(){var s,r,q,p
try{q=window.localStorage.getItem("waterhall_jwt")
q.toString
s=q
q=J.oV(s,".")
if(1>=q.length)return A.e(q,1)
r=B.c.L(0,B.l.L(0,B.v.aB(B.z.dJ(0,q[1]))))
q=J.rd(J.re(J.k(r,"exp"),1000),Date.now())
return q}catch(p){return!1}},
ij(a,b){var s=0,r=A.T(t.z),q
var $async$ij=A.U(function(c,d){if(c===1)return A.Q(d,r)
for(;;)switch(s){case 0:if(!$.bu().ba("WaterHallStorage")){q=null
s=1
break}s=3
return A.y(A.qG(A.b4(globalThis.waterhallNativeCall(a,A.vo(b))),t.z),$async$ij)
case 3:q=d
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$ij,r)},
ik(a){var s=0,r=A.T(t.H)
var $async$ik=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:s=$.bu().ba("waterhallSetNativeSession")?2:3
break
case 2:s=4
return A.y(A.qG(A.b4(globalThis.waterhallSetNativeSession(a)),t.z),$async$ik)
case 4:case 3:return A.R(null,r)}})
return A.S($async$ik,r)},
c6(a,b){var s=A.b6(),r=$.rc().dY(new A.nP(s,a,b),t.a)
$.uM=r.dt(new A.nQ())
return r},
nx(a,b){var s=0,r=A.T(t.H),q,p,o,n
var $async$nx=A.U(function(c,d){if(c===1)return A.Q(d,r)
for(;;)switch(s){case 0:n=A.b6()
if(n==null)throw A.b(A.O("Sign in before recording an operation"))
q=A.E(b)
p=q.i("I<1>")
o=A.a4(new A.I(b,q.i("F(1)").a(new A.ny(n)),p),p.i("h.E"))
q=a==="bill_history"
s=!q||J.j($.bu().h(0,"waterhallBillHistoryStorage"),!0)?2:3
break
case 2:s=4
return A.y(A.ij("save",A.a3(["type",a,"rows",o],t.N,t.z)),$async$nx)
case 4:case 3:p=window.localStorage
p.toString
if(a==="collections")q="waterhall_offline_collections"
else q=q?"waterhall_bill_history":"waterhall_unsynced_actions"
p.setItem(q,B.c.V(b))
return A.R(null,r)}})
return A.S($async$nx,r)},
dj(){var s=0,r=A.T(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
var $async$dj=A.U(function(a5,a6){if(a5===1)return A.Q(a6,r)
for(;;)switch(s){case 0:a4=window.localStorage.getItem("waterhall_jwt")
if(A.b6()==null){s=1
break}s=3
return A.y(A.ik(window.localStorage.getItem("waterhall_jwt")),$async$dj)
case 3:p=A.B(["collections","actions"],t.s)
if(A.e5().gai().h(0,"role")!=="resident")p.push("bill_history")
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
if(g&&!J.j($.bu().h(0,"waterhallBillHistoryStorage"),!0)){s=5
break}s=7
return A.y(A.ij("load",A.a3(["type",h],m,l)),$async$dj)
case 7:f=a6
if(window.localStorage.getItem("waterhall_jwt")!=a4){s=1
break}if(f==null){s=5
break}e=k.a(B.c.L(0,A.x(f)))
if(h==="collections")d="waterhall_offline_collections"
else d=g?"waterhall_bill_history":"waterhall_unsynced_actions"
c=window.localStorage.getItem(d)
b=A.ap(m,j)
c=A.a4(k.a(B.c.L(0,c==null?"[]":c)),l)
B.b.S(c,e)
a=c.length
a0=0
for(;a0<c.length;c.length===a||(0,A.as)(c),++a0){a1=A.ak(n.a(c[a0]),m,l)
if(g){a2=A.d(a1.h(0,"owner"))
a3=a1.h(0,"bill_id")
a2=a2+"|"+A.d(a3==null?a1.h(0,"operation_id"):a3)}else{a2=a1.h(0,"transaction_id")
a2=J.M(a2==null?a1.h(0,"operation_id"):a2)}b.k(0,a2,a1)}s=A.b6()!=null?8:9
break
case 8:s=10
return A.y(A.c6(h,new A.nV(b,h)),$async$dj)
case 10:case 9:case 5:p.length===o||(0,A.as)(p),++i
s=4
break
case 6:case 1:return A.R(q,r)}})
return A.S($async$dj,r)},
nP:function nP(a,b,c){this.a=a
this.b=b
this.c=c},
nO:function nO(){},
nQ:function nQ(){},
ny:function ny(a){this.a=a},
nV:function nV(a,b){this.a=a
this.b=b},
nU:function nU(a){this.a=a},
qD(a){return t.fj.b(a)||t.A.b(a)||t.mz.b(a)||t.ad.b(a)||t.F.b(a)||t.hE.b(a)||t.f5.b(a)},
vs(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
vw(a){throw A.ai(A.pg(a),new Error())},
ay(){throw A.ai(A.t3(""),new Error())},
qL(){throw A.ai(A.pg(""),new Error())}},B={}
var w=[A,J,B]
var $={}
A.oa.prototype={}
J.cO.prototype={
a0(a,b){return a===b},
gK(a){return A.dU(a)},
l(a){return"Instance of '"+A.dV(a)+"'"},
dI(a,b){throw A.b(A.pl(a,t.bg.a(b)))},
gW(a){return A.cD(A.oB(this))}}
J.fg.prototype={
l(a){return String(a)},
gK(a){return a?519018:218159},
gW(a){return A.cD(t.y)},
$ia_:1,
$iF:1}
J.dD.prototype={
a0(a,b){return null==b},
l(a){return"null"},
gK(a){return 0},
$ia_:1,
$iad:1}
J.a.prototype={$ii:1}
J.bW.prototype={
gK(a){return 0},
l(a){return String(a)}}
J.fF.prototype={}
J.bF.prototype={}
J.bA.prototype={
l(a){var s=a[$.io()]
if(s==null)s=a[$.qP()]
if(s==null)return this.ev(a)
return"JavaScript function for "+J.M(s)},
$ich:1}
J.cP.prototype={
gK(a){return 0},
l(a){return String(a)}}
J.cQ.prototype={
gK(a){return 0},
l(a){return String(a)}}
J.ac.prototype={
m(a,b){A.E(a).c.a(b)
a.$flags&1&&A.al(a,29)
a.push(b)},
cp(a,b,c){var s
A.E(a).c.a(c)
a.$flags&1&&A.al(a,"insert",2)
s=a.length
if(b>s)throw A.b(A.ps(b,null))
a.splice(b,0,c)},
hj(a,b){A.E(a).i("F(1)").a(b)
a.$flags&1&&A.al(a,16)
this.d8(a,b,!0)},
d8(a,b,c){var s,r,q,p,o
A.E(a).i("F(1)").a(b)
s=[]
r=a.length
for(q=0;q<r;++q){p=a[q]
if(!b.$1(p))s.push(p)
if(a.length!==r)throw A.b(A.a7(a))}o=s.length
if(o===r)return
this.sj(a,o)
for(q=0;q<s.length;++q)a[q]=s[q]},
S(a,b){var s
A.E(a).i("h<1>").a(b)
a.$flags&1&&A.al(a,"addAll",2)
if(Array.isArray(b)){this.eJ(a,b)
return}for(s=J.aF(b);s.p();)a.push(s.gt(s))},
eJ(a,b){var s,r
t.dG.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.b(A.a7(a))
for(r=0;r<s;++r)a.push(b[r])},
X(a){a.$flags&1&&A.al(a,"clear","clear")
a.length=0},
q(a,b){var s,r
A.E(a).i("~(1)").a(b)
s=a.length
for(r=0;r<s;++r){b.$1(a[r])
if(a.length!==s)throw A.b(A.a7(a))}},
au(a,b,c){var s=A.E(a)
return new A.a1(a,s.J(c).i("1(2)").a(b),s.i("@<1>").J(c).i("a1<1,2>"))},
a_(a,b){var s,r=A.dK(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.k(r,s,A.d(a[s]))
return r.join(b)},
h3(a){return this.a_(a,"")},
hg(a,b){var s,r,q
A.E(a).i("1(1,1)").a(b)
s=a.length
if(s===0)throw A.b(A.dB())
if(0>=s)return A.e(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.b(A.a7(a))}return r},
cj(a,b,c,d){var s,r,q
d.a(b)
A.E(a).J(d).i("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.b(A.a7(a))}return r},
dz(a,b,c){var s,r,q,p=A.E(a)
p.i("F(1)").a(b)
p.i("1()?").a(c)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.b(A.a7(a))}if(c!=null)return c.$0()
throw A.b(A.dB())},
fU(a,b){return this.dz(a,b,null)},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
cP(a,b,c){var s=a.length
if(b>s)throw A.b(A.ah(b,0,s,"start",null))
if(c==null)c=s
else if(c<b||c>s)throw A.b(A.ah(c,b,s,"end",null))
if(b===c)return A.B([],A.E(a))
return A.B(a.slice(b,c),A.E(a))},
ep(a,b){return this.cP(a,b,null)},
gD(a){if(a.length>0)return a[0]
throw A.b(A.dB())},
gdF(a){var s=a.length
if(s>0)return a[s-1]
throw A.b(A.dB())},
a6(a,b){var s,r
A.E(a).i("F(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.b(A.a7(a))}return!1},
aI(a,b){var s,r,q,p,o,n=A.E(a)
n.i("l(1,1)?").a(b)
a.$flags&2&&A.al(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.bh()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.bK(b,2))
if(p>0)this.ff(a,p)},
ff(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
A(a,b){var s
for(s=0;s<a.length;++s)if(J.j(a[s],b))return!0
return!1},
gE(a){return a.length===0},
gT(a){return a.length!==0},
l(a){return A.o8(a,"[","]")},
gB(a){return new J.bd(a,a.length,A.E(a).i("bd<1>"))},
gK(a){return A.dU(a)},
gj(a){return a.length},
sj(a,b){a.$flags&1&&A.al(a,"set length","change the length of")
if(b>a.length)A.E(a).c.a(null)
a.length=b},
h(a,b){A.L(b)
if(!(b>=0&&b<a.length))throw A.b(A.ih(a,b))
return a[b]},
k(a,b,c){A.E(a).c.a(c)
a.$flags&2&&A.al(a)
if(!(b>=0&&b<a.length))throw A.b(A.ih(a,b))
a[b]=c},
e4(a,b){return new A.cs(a,b.i("cs<0>"))},
fX(a,b){var s
A.E(a).i("F(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$in:1,
$ih:1,
$ip:1}
J.ff.prototype={
e0(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.dV(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.lT.prototype={}
J.bd.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.as(q)
throw A.b(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iab:1}
J.cj.prototype={
a1(a,b){var s
A.a9(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gbB(b)
if(this.gbB(a)===s)return 0
if(this.gbB(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbB(a){return a===0?1/a<0:a<0},
aE(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.b(A.P(""+a+".round()"))},
cf(a,b,c){if(B.e.a1(b,c)>0)throw A.b(A.oF(b))
if(this.a1(a,b)<0)return b
if(this.a1(a,c)>0)return c
return a},
G(a,b){var s
if(b>20)throw A.b(A.ah(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gbB(a))return"-"+s
return s},
hs(a,b){var s,r,q,p,o
if(b<2||b>36)throw A.b(A.ah(b,2,36,"radix",null))
s=a.toString(b)
r=s.length
q=r-1
if(!(q>=0))return A.e(s,q)
if(s.charCodeAt(q)!==41)return s
p=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(s)
if(p==null)A.bN(A.P("Unexpected toString result: "+s))
r=p.length
if(1>=r)return A.e(p,1)
s=p[1]
if(3>=r)return A.e(p,3)
o=+p[3]
r=p[2]
if(r!=null){s+=r
o-=r.length}return s+B.a.aG("0",o)},
l(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gK(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
aG(a,b){return a*b},
aT(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
eA(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.dc(a,b)},
ac(a,b){return(a|0)===a?a/b|0:this.dc(a,b)},
dc(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.b(A.P("Result of truncating division is "+A.d(s)+": "+A.d(a)+" ~/ "+b))},
b4(a,b){var s
if(a>0)s=this.da(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
fn(a,b){if(0>b)throw A.b(A.oF(b))
return this.da(a,b)},
da(a,b){return b>31?0:a>>>b},
bh(a,b){return a>b},
gW(a){return A.cD(t.u)},
$iX:1,
$iZ:1}
J.dC.prototype={
gW(a){return A.cD(t.S)},
$ia_:1,
$il:1}
J.fi.prototype={
gW(a){return A.cD(t.dx)},
$ia_:1}
J.bV.prototype={
cE(a,b){return a+b},
en(a,b){var s=A.B(a.split(b),t.s)
return s},
aD(a,b,c,d){var s=A.cp(b,c,a.length)
return a.substring(0,b)+d+a.substring(s)},
R(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.ah(c,0,a.length,null,null))
s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)},
N(a,b){return this.R(a,b,0)},
n(a,b,c){return a.substring(b,A.cp(b,c,a.length))},
Z(a,b){return this.n(a,b,null)},
hr(a){return a.toLowerCase()},
u(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.e(p,0)
if(p.charCodeAt(0)===133){s=J.t_(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.e(p,r)
q=p.charCodeAt(r)===133?J.t0(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
aG(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.b(B.a4)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
bc(a,b,c){var s=b-a.length
if(s<=0)return a
return this.aG(c,s)+a},
bA(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.ah(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
dC(a,b){return this.bA(a,b,0)},
dG(a,b,c){var s,r
if(c==null)c=a.length
else if(c<0||c>a.length)throw A.b(A.ah(c,0,a.length,null,null))
s=b.length
r=a.length
if(c+s>r)c=r-s
return a.lastIndexOf(b,c)},
h4(a,b){return this.dG(a,b,null)},
bv(a,b,c){var s=a.length
if(c>s)throw A.b(A.ah(c,0,s,null,null))
return A.vu(a,b,c)},
A(a,b){return this.bv(a,b,0)},
a1(a,b){var s
A.x(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
l(a){return a},
gK(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gW(a){return A.cD(t.N)},
gj(a){return a.length},
h(a,b){A.L(b)
if(!(b>=0&&b<a.length))throw A.b(A.ih(a,b))
return a[b]},
$ia_:1,
$im9:1,
$ic:1}
A.dF.prototype={
l(a){return"LateInitializationError: "+this.a}}
A.f_.prototype={
gj(a){return this.a.length},
h(a,b){var s
A.L(b)
s=this.a
if(!(b>=0&&b<s.length))return A.e(s,b)
return s.charCodeAt(b)}}
A.nR.prototype={
$0(){return A.o7(null,t.H)},
$S:38}
A.me.prototype={}
A.n.prototype={}
A.a5.prototype={
gB(a){var s=this
return new A.bh(s,s.gj(s),A.C(s).i("bh<a5.E>"))},
gE(a){return this.gj(this)===0},
A(a,b){var s,r=this,q=r.gj(r)
for(s=0;s<q;++s){if(J.j(r.v(0,s),b))return!0
if(q!==r.gj(r))throw A.b(A.a7(r))}return!1},
a_(a,b){var s,r,q,p=this,o=p.gj(p)
if(b.length!==0){if(o===0)return""
s=A.d(p.v(0,0))
if(o!==p.gj(p))throw A.b(A.a7(p))
for(r=s,q=1;q<o;++q){r=r+b+A.d(p.v(0,q))
if(o!==p.gj(p))throw A.b(A.a7(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.d(p.v(0,q))
if(o!==p.gj(p))throw A.b(A.a7(p))}return r.charCodeAt(0)==0?r:r}},
bJ(a,b){return this.cQ(0,A.C(this).i("F(a5.E)").a(b))},
au(a,b,c){var s=A.C(this)
return new A.a1(this,s.J(c).i("1(a5.E)").a(b),s.i("@<a5.E>").J(c).i("a1<1,2>"))},
aF(a,b){var s=A.a4(this,A.C(this).i("a5.E"))
return s},
aw(a){return this.aF(0,!0)},
e_(a){var s,r=this,q=A.cm(A.C(r).i("a5.E"))
for(s=0;s<r.gj(r);++s)q.m(0,r.v(0,s))
return q}}
A.e_.prototype={
geZ(){var s=J.aj(this.a),r=this.c
if(r==null||r>s)return s
return r},
gfp(){var s=J.aj(this.a),r=this.b
if(r>s)return s
return r},
gj(a){var s,r=J.aj(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
v(a,b){var s=this,r=s.gfp()+b
if(b<0||r>=s.geZ())throw A.b(A.a8(b,s.gj(0),s,null,"index"))
return J.eN(s.a,r)},
hp(a,b){var s,r,q,p=this
A.cY(b,"count")
s=p.c
r=p.b
q=r+b
if(s==null)return A.e0(p.a,r,q,p.$ti.c)
else{if(s<q)return p
return A.e0(p.a,r,q,p.$ti.c)}},
aF(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.w(n),l=m.gj(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.o9(0,n):J.pd(0,n)}r=A.dK(s,m.v(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.b.k(r,q,m.v(n,o+q))
if(m.gj(n)<l)throw A.b(A.a7(p))}return r},
aw(a){return this.aF(0,!0)}}
A.bh.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s,r=this,q=r.a,p=J.w(q),o=p.gj(q)
if(r.b!==o)throw A.b(A.a7(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.v(q,s);++r.c
return!0},
$iab:1}
A.aJ.prototype={
gB(a){return new A.dL(J.aF(this.a),this.b,A.C(this).i("dL<1,2>"))},
gj(a){return J.aj(this.a)},
gE(a){return J.is(this.a)},
v(a,b){return this.b.$1(J.eN(this.a,b))}}
A.bx.prototype={$in:1}
A.dL.prototype={
p(){var s=this,r=s.b
if(r.p()){s.a=s.c.$1(r.gt(r))
return!0}s.a=null
return!1},
gt(a){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iab:1}
A.a1.prototype={
gj(a){return J.aj(this.a)},
v(a,b){return this.b.$1(J.eN(this.a,b))}}
A.I.prototype={
gB(a){return new A.aw(J.aF(this.a),this.b,this.$ti.i("aw<1>"))},
au(a,b,c){var s=this.$ti
return new A.aJ(this,s.J(c).i("1(2)").a(b),s.i("@<1>").J(c).i("aJ<1,2>"))}}
A.aw.prototype={
p(){var s,r
for(s=this.a,r=this.b;s.p();)if(r.$1(s.gt(s)))return!0
return!1},
gt(a){var s=this.a
return s.gt(s)},
$iab:1}
A.cs.prototype={
gB(a){return new A.e6(J.aF(this.a),this.$ti.i("e6<1>"))}}
A.e6.prototype={
p(){var s,r
for(s=this.a,r=this.$ti.c;s.p();)if(r.b(s.gt(s)))return!0
return!1},
gt(a){var s=this.a
return this.$ti.c.a(s.gt(s))},
$iab:1}
A.aI.prototype={}
A.bG.prototype={
k(a,b,c){A.C(this).i("bG.E").a(c)
throw A.b(A.P("Cannot modify an unmodifiable list"))}}
A.d2.prototype={}
A.hx.prototype={
gj(a){return J.aj(this.a)},
v(a,b){var s=J.aj(this.a)
if(0>b||b>=s)A.bN(A.a8(b,s,this,null,"index"))
return b}}
A.cn.prototype={
h(a,b){return this.M(0,b)?J.k(this.a,A.L(b)):null},
gj(a){return J.aj(this.a)},
gI(a){return new A.hx(this.a)},
gE(a){return J.is(this.a)},
gT(a){return J.o2(this.a)},
M(a,b){return A.eI(b)&&b>=0&&b<J.aj(this.a)},
q(a,b){var s,r,q,p
this.$ti.i("~(l,1)").a(b)
s=this.a
r=J.w(s)
q=r.gj(s)
for(p=0;p<q;++p){b.$2(p,r.h(s,p))
if(q!==r.gj(s))throw A.b(A.a7(s))}}}
A.c_.prototype={
gK(a){var s=this._hashCode
if(s!=null)return s
s=664597*B.a.gK(this.a)&536870911
this._hashCode=s
return s},
l(a){return'Symbol("'+this.a+'")'},
a0(a,b){if(b==null)return!1
return b instanceof A.c_&&this.a===b.a},
$id0:1}
A.dn.prototype={}
A.dm.prototype={
gE(a){return this.gj(this)===0},
gT(a){return this.gj(this)!==0},
l(a){return A.oe(this)},
k(a,b,c){var s=A.C(this)
s.c.a(b)
s.y[1].a(c)
A.p3()},
C(a,b){A.p3()},
gaC(a){return new A.da(this.fS(0),A.C(this).i("da<aq<1,2>>"))},
fS(a){var s=this
return function(){var r=a
var q=0,p=1,o=[],n,m,l,k,j
return function $async$gaC(b,c,d){if(c===1){o.push(d)
q=p}for(;;)switch(q){case 0:n=s.gI(s),n=n.gB(n),m=A.C(s),l=m.y[1],m=m.i("aq<1,2>")
case 2:if(!n.p()){q=3
break}k=n.gt(n)
j=s.h(0,k)
q=4
return b.b=new A.aq(k,j==null?l.a(j):j,m),1
case 4:q=2
break
case 3:return 0
case 1:return b.c=o.at(-1),3}}}},
$it:1}
A.bv.prototype={
gj(a){return this.b.length},
gd2(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
M(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
h(a,b){if(!this.M(0,b))return null
return this.b[this.a[b]]},
q(a,b){var s,r,q,p
this.$ti.i("~(1,2)").a(b)
s=this.gd2()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gI(a){return new A.ej(this.gd2(),this.$ti.i("ej<1>"))}}
A.ej.prototype={
gj(a){return this.a.length},
gE(a){return 0===this.a.length},
gB(a){var s=this.a
return new A.ek(s,s.length,this.$ti.i("ek<1>"))}}
A.ek.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iab:1}
A.fh.prototype={
gh8(){var s=this.a
if(s instanceof A.c_)return s
return this.a=new A.c_(A.x(s))},
ghd(){var s,r,q,p,o,n=this
if(n.c===1)return B.K
s=n.d
r=J.w(s)
q=r.gj(s)-J.aj(n.e)-n.f
if(q===0)return B.K
p=[]
for(o=0;o<q;++o)p.push(r.h(s,o))
p.$flags=3
return p},
gh9(){var s,r,q,p,o,n,m,l,k=this
if(k.c!==0)return B.N
s=k.e
r=J.w(s)
q=r.gj(s)
p=k.d
o=J.w(p)
n=o.gj(p)-q-k.f
if(q===0)return B.N
m=new A.bg(t.bX)
for(l=0;l<q;++l)m.k(0,new A.c_(A.x(r.h(s,l))),o.h(p,n+l))
return new A.dn(m,t.i9)},
$ipc:1}
A.ma.prototype={
$2(a,b){var s
A.x(a)
s=this.a
s.b=s.b+"$"+a
B.b.m(this.b,a)
B.b.m(this.c,b);++s.a},
$S:6}
A.cZ.prototype={}
A.mm.prototype={
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
A.dS.prototype={
l(a){return"Null check operator used on a null value"}}
A.fk.prototype={
l(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.fZ.prototype={
l(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.m8.prototype={
l(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.dv.prototype={}
A.eu.prototype={
l(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$ibl:1}
A.bR.prototype={
l(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.qM(r==null?"unknown":r)+"'"},
$ich:1,
ghw(){return this},
$C:"$1",
$R:1,
$D:null}
A.eY.prototype={$C:"$0",$R:0}
A.eZ.prototype={$C:"$2",$R:2}
A.fQ.prototype={}
A.fM.prototype={
l(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.qM(s)+"'"}}
A.cL.prototype={
a0(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.cL))return!1
return this.$_target===b.$_target&&this.a===b.a},
gK(a){return(A.il(this.a)^A.dU(this.$_target))>>>0},
l(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.dV(this.a)+"'")}}
A.fJ.prototype={
l(a){return"RuntimeError: "+this.a}}
A.n2.prototype={}
A.bg.prototype={
gj(a){return this.a},
gE(a){return this.a===0},
gT(a){return this.a!==0},
gI(a){return new A.cl(this,A.C(this).i("cl<1>"))},
gaC(a){return new A.dG(this,A.C(this).i("dG<1,2>"))},
M(a,b){var s=this.b
if(s==null)return!1
return s[b]!=null},
S(a,b){J.ir(A.C(this).i("t<1,2>").a(b),new A.lU(this))},
h(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.h0(b)},
h0(a){var s,r,q=this.d
if(q==null)return null
s=q[this.dD(a)]
r=this.dE(s,a)
if(r<0)return null
return s[r].b},
k(a,b,c){var s,r,q=this,p=A.C(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.cR(s==null?q.b=q.c_():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.cR(r==null?q.c=q.c_():r,b,c)}else q.h1(b,c)},
h1(a,b){var s,r,q,p,o=this,n=A.C(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.c_()
r=o.dD(a)
q=s[r]
if(q==null)s[r]=[o.c0(a,b)]
else{p=o.dE(q,a)
if(p>=0)q[p].b=b
else q.push(o.c0(a,b))}},
dO(a,b,c){var s,r,q=this,p=A.C(q)
p.c.a(b)
p.i("2()").a(c)
if(q.M(0,b)){s=q.h(0,b)
return s==null?p.y[1].a(s):s}r=c.$0()
q.k(0,b,r)
return r},
C(a,b){var s=this.eG(this.b,b)
return s},
X(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.bZ()}},
q(a,b){var s,r,q=this
A.C(q).i("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.b(A.a7(q))
s=s.c}},
cR(a,b,c){var s,r=A.C(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.c0(b,c)
else s.b=c},
eG(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.eH(s)
delete a[b]
return s.b},
bZ(){this.r=this.r+1&1073741823},
c0(a,b){var s=this,r=A.C(s),q=new A.lZ(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.bZ()
return q},
eH(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.bZ()},
dD(a){return J.cI(a)&1073741823},
dE(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.j(a[r].a,b))return r
return-1},
l(a){return A.oe(this)},
c_(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$iph:1}
A.lU.prototype={
$2(a,b){var s=this.a,r=A.C(s)
s.k(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.C(this.a).i("~(1,2)")}}
A.lZ.prototype={}
A.cl.prototype={
gj(a){return this.a.a},
gE(a){return this.a.a===0},
gB(a){var s=this.a
return new A.dI(s,s.r,s.e,this.$ti.i("dI<1>"))},
A(a,b){return this.a.M(0,b)}}
A.dI.prototype={
gt(a){return this.d},
p(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a7(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iab:1}
A.b0.prototype={
gj(a){return this.a.a},
gE(a){return this.a.a===0},
gB(a){var s=this.a
return new A.dJ(s,s.r,s.e,this.$ti.i("dJ<1>"))},
q(a,b){var s,r,q
this.$ti.i("~(1)").a(b)
s=this.a
r=s.e
q=s.r
while(r!=null){b.$1(r.b)
if(q!==s.r)throw A.b(A.a7(s))
r=r.c}}}
A.dJ.prototype={
gt(a){return this.d},
p(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a7(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iab:1}
A.dG.prototype={
gj(a){return this.a.a},
gE(a){return this.a.a===0},
gB(a){var s=this.a
return new A.dH(s,s.r,s.e,this.$ti.i("dH<1,2>"))}}
A.dH.prototype={
gt(a){var s=this.d
s.toString
return s},
p(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a7(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=new A.aq(s.a,s.b,r.$ti.i("aq<1,2>"))
r.c=s.c
return!0}},
$iab:1}
A.nH.prototype={
$1(a){return this.a(a)},
$S:13}
A.nI.prototype={
$2(a,b){return this.a(a,b)},
$S:37}
A.nJ.prototype={
$1(a){return this.a(A.x(a))},
$S:42}
A.fj.prototype={
l(a){return"RegExp/"+this.a+"/"+this.b.flags},
dw(a){var s=this.b.exec(a)
if(s==null)return null
return new A.n0(s)},
$im9:1,
$itf:1}
A.n0.prototype={
h(a,b){var s
A.L(b)
s=this.b
if(!(b<s.length))return A.e(s,b)
return s[b]}}
A.co.prototype={
gW(a){return B.au},
dr(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
$ia_:1,
$ico:1,
$ieX:1}
A.dO.prototype={
gfI(a){if(((a.$flags|0)&2)!==0)return new A.i3(a.buffer)
else return a.buffer},
f4(a,b,c,d){var s=A.ah(b,0,c,d,null)
throw A.b(s)},
cV(a,b,c,d){if(b>>>0!==b||b>c)this.f4(a,b,c,d)},
$iae:1}
A.i3.prototype={
dr(a,b,c){var s=A.pk(this.a,b,c)
s.$flags=3
return s},
$ieX:1}
A.dM.prototype={
gW(a){return B.av},
$ia_:1,
$ikG:1}
A.au.prototype={
gj(a){return a.length},
fm(a,b,c,d,e){var s,r,q=a.length
this.cV(a,b,q,"start")
this.cV(a,c,q,"end")
if(b>c)throw A.b(A.ah(b,0,c,null,null))
s=c-b
if(e<0)throw A.b(A.aY(e,null))
r=d.length
if(r-e<s)throw A.b(A.O("Not enough elements"))
if(e!==0||r!==s)d=d.subarray(e,e+s)
a.set(d,b)},
$iN:1}
A.dN.prototype={
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
k(a,b,c){A.qd(c)
a.$flags&2&&A.al(a)
A.bJ(b,a,a.length)
a[b]=c},
$in:1,
$ih:1,
$ip:1}
A.b1.prototype={
k(a,b,c){A.L(c)
a.$flags&2&&A.al(a)
A.bJ(b,a,a.length)
a[b]=c},
bN(a,b,c,d,e){t.fm.a(d)
a.$flags&2&&A.al(a,5)
if(t.aj.b(d)){this.fm(a,b,c,d,e)
return}this.ew(a,b,c,d,e)},
$in:1,
$ih:1,
$ip:1}
A.fu.prototype={
gW(a){return B.aw},
$ia_:1,
$ilN:1}
A.fv.prototype={
gW(a){return B.ax},
$ia_:1,
$ilO:1}
A.fw.prototype={
gW(a){return B.ay},
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
$ia_:1,
$ilQ:1}
A.fx.prototype={
gW(a){return B.az},
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
$ia_:1,
$ilR:1}
A.fy.prototype={
gW(a){return B.aA},
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
$ia_:1,
$ilS:1}
A.fz.prototype={
gW(a){return B.aC},
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
$ia_:1,
$imo:1}
A.fA.prototype={
gW(a){return B.aD},
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
$ia_:1,
$imp:1}
A.dP.prototype={
gW(a){return B.aE},
gj(a){return a.length},
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
$ia_:1,
$imq:1}
A.dQ.prototype={
gW(a){return B.aF},
gj(a){return a.length},
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
$ia_:1,
$imr:1}
A.em.prototype={}
A.en.prototype={}
A.eo.prototype={}
A.ep.prototype={}
A.bk.prototype={
i(a){return A.nc(v.typeUniverse,this,a)},
J(a){return A.tT(v.typeUniverse,this,a)}}
A.hn.prototype={}
A.na.prototype={
l(a){return A.aK(this.a,null)}}
A.hk.prototype={
l(a){return this.a}}
A.db.prototype={$ibD:1}
A.mz.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:14}
A.my.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:44}
A.mA.prototype={
$0(){this.a.$0()},
$S:15}
A.mB.prototype={
$0(){this.a.$0()},
$S:15}
A.ey.prototype={
eE(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(A.bK(new A.n9(this,b),0),a)
else throw A.b(A.P("`setTimeout()` not found."))},
eF(a,b){if(self.setTimeout!=null)this.b=self.setInterval(A.bK(new A.n8(this,a,Date.now(),b),0),a)
else throw A.b(A.P("Periodic timer."))},
a3(a){var s
if(self.setTimeout!=null){s=this.b
if(s==null)return
if(this.a)self.clearTimeout(s)
else self.clearInterval(s)
this.b=null}else throw A.b(A.P("Canceling a timer."))},
$ifU:1}
A.n9.prototype={
$0(){var s=this.a
s.b=null
s.c=1
this.b.$0()},
$S:2}
A.n8.prototype={
$0(){var s,r=this,q=r.a,p=q.c+1,o=r.b
if(o>0){s=Date.now()-r.c
if(s>(p+1)*o)p=B.e.eA(s,o)}q.c=p
r.d.$1(q)},
$S:15}
A.h4.prototype={
b7(a,b){var s,r=this,q=r.$ti
q.i("1/?").a(b)
if(b==null)b=q.c.a(b)
if(!r.b)r.a.aY(b)
else{s=r.a
if(q.i("af<1>").b(b))s.cT(b)
else s.bT(b)}},
cg(a,b){var s=this.a
if(this.b)s.am(new A.at(a,b))
else s.bP(new A.at(a,b))}}
A.nq.prototype={
$1(a){return this.a.$2(0,a)},
$S:16}
A.nr.prototype={
$2(a,b){this.a.$2(1,new A.dv(a,t.l.a(b)))},
$S:45}
A.nA.prototype={
$2(a,b){this.a(A.L(a),b)},
$S:36}
A.ev.prototype={
gt(a){var s=this.b
return s==null?this.$ti.c.a(s):s},
fg(a,b){var s,r,q
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
n.d=null}p=n.fg(l,m)
if(1===p)return!0
if(0===p){n.b=null
o=n.e
if(o==null||o.length===0){n.a=A.pS
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
n.a=A.pS
throw m
return!1}if(0>=o.length)return A.e(o,-1)
n.a=o.pop()
l=1
continue}throw A.b(A.O("sync*"))}return!1},
hA(a){var s,r,q=this
if(a instanceof A.da){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.b.m(r,q.a)
q.a=s
return 2}else{q.d=J.aF(a)
return 2}},
$iab:1}
A.da.prototype={
gB(a){return new A.ev(this.a(),this.$ti.i("ev<1>"))}}
A.at.prototype={
l(a){return A.d(this.a)},
$ia0:1,
gaV(){return this.b}}
A.d5.prototype={}
A.bI.prototype={
c1(){},
c2(){},
sbm(a){this.ch=this.$ti.i("bI<1>?").a(a)},
sc3(a){this.CW=this.$ti.i("bI<1>?").a(a)}}
A.e8.prototype={
gf6(){return this.c<4},
fd(a){var s,r
A.C(this).i("bI<1>").a(a)
s=a.CW
r=a.ch
if(s==null)this.d=r
else s.sbm(r)
if(r==null)this.e=s
else r.sc3(s)
a.sc3(a)
a.sbm(a)},
fq(a,b,c,d){var s,r,q,p,o,n,m,l=this,k=A.C(l)
k.i("~(1)?").a(a)
t.jE.a(c)
if((l.c&4)!==0){k=new A.d7($.V,k.i("d7<1>"))
A.qJ(k.gf7())
if(c!=null)k.c=t.M.a(c)
return k}s=$.V
r=d?1:0
q=b!=null?32:0
p=A.pH(s,a,k.c)
A.tu(s,b)
o=c==null?A.v2():c
t.M.a(o)
k=k.i("bI<1>")
n=new A.bI(l,p,s,r|q,k)
n.CW=n
n.ch=n
k.a(n)
n.ay=l.c&1
m=l.e
l.e=n
n.sbm(null)
n.sc3(m)
if(m==null)l.d=n
else m.sbm(n)
if(l.d==l.e)A.qt(l.a)
return n},
fb(a){var s=this,r=A.C(s)
a=r.i("bI<1>").a(r.i("br<1>").a(a))
if(a.ch===a)return null
r=a.ay
if((r&2)!==0)a.ay=r|4
else{s.fd(a)
if((s.c&2)===0&&s.d==null)s.eP()}return null},
eK(){if((this.c&4)!==0)return new A.bq("Cannot add new events after calling close")
return new A.bq("Cannot add new events while doing an addStream")},
m(a,b){var s=this
A.C(s).c.a(b)
if(!s.gf6())throw A.b(s.eK())
s.c8(b)},
eP(){if((this.c&4)!==0)if(null.ghz())null.aY(null)
A.qt(this.b)},
$ipu:1,
$ipR:1,
$ic3:1}
A.e7.prototype={
c8(a){var s,r=this.$ti
r.c.a(a)
for(s=this.d,r=r.i("eb<1>");s!=null;s=s.ch)s.eM(new A.eb(a,r))}}
A.lP.prototype={
$0(){var s,r,q,p,o,n,m=this,l=m.a
if(l==null){m.c.a(null)
m.b.aZ(null)}else{s=null
try{s=l.$0()}catch(p){r=A.an(p)
q=A.c5(p)
l=r
o=q
n=A.oC(l,o)
l=new A.at(l,o)
m.b.am(l)
return}m.b.aZ(s)}},
$S:2}
A.mk.prototype={
l(a){var s=this.b.l(0)
return"TimeoutException after "+s+": "+this.a}}
A.h9.prototype={
cg(a,b){var s=this.a
if((s.a&30)!==0)throw A.b(A.O("Future already completed"))
s.bP(A.uu(a,b))},
bu(a){return this.cg(a,null)}}
A.bH.prototype={
b7(a,b){var s,r=this.$ti
r.i("1/?").a(b)
s=this.a
if((s.a&30)!==0)throw A.b(A.O("Future already completed"))
s.aY(r.i("1/").a(b))},
fL(a){return this.b7(0,null)}}
A.bn.prototype={
h7(a){if((this.c&15)!==6)return!0
return this.b.b.cA(t.iW.a(this.d),a.a,t.y,t.K)},
fV(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.ng.b(q))p=l.ho(q,m,a.b,o,n,t.l)
else p=l.cA(t.w.a(q),m,o,n)
try{o=r.$ti.i("2/").a(p)
return o}catch(s){if(t.do.b(A.an(s))){if((r.c&1)!==0)throw A.b(A.aY("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.b(A.aY("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.W.prototype={
bH(a,b,c){var s,r,q,p=this.$ti
p.J(c).i("1/(2)").a(a)
s=$.V
if(s===B.h){if(b!=null&&!t.ng.b(b)&&!t.w.b(b))throw A.b(A.kD(b,"onError",u.c))}else{c.i("@<0/>").J(p.c).i("1(2)").a(a)
if(b!=null)b=A.qp(b,s)}r=new A.W(s,c.i("W<0>"))
q=b==null?1:3
this.aX(new A.bn(r,q,a,b,p.i("@<1>").J(c).i("bn<1,2>")))
return r},
dY(a,b){return this.bH(a,null,b)},
de(a,b,c){var s,r=this.$ti
r.J(c).i("1/(2)").a(a)
s=new A.W($.V,c.i("W<0>"))
this.aX(new A.bn(s,19,a,b,r.i("@<1>").J(c).i("bn<1,2>")))
return s},
dt(a){var s=this.$ti,r=$.V,q=new A.W(r,s)
if(r!==B.h)a=A.qp(a,r)
this.aX(new A.bn(q,2,null,a,s.i("bn<1,1>")))
return q},
fl(a){this.a=this.a&1|16
this.c=a},
bk(a){this.a=a.a&30|this.a&1
this.c=a.c},
aX(a){var s,r=this,q=r.a
if(q<=3){a.a=t.e.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.aX(a)
return}r.bk(s)}A.df(null,null,r.b,t.M.a(new A.mI(r,a)))}},
d6(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.e.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t._.a(m.c)
if((n.a&24)===0){n.d6(a)
return}m.bk(n)}l.a=m.bp(a)
A.df(null,null,m.b,t.M.a(new A.mN(l,m)))}},
b1(){var s=t.e.a(this.c)
this.c=null
return this.bp(s)},
bp(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
aZ(a){var s,r=this,q=r.$ti
q.i("1/").a(a)
if(q.i("af<1>").b(a))A.mL(a,r,!0)
else{s=r.b1()
q.c.a(a)
r.a=8
r.c=a
A.cu(r,s)}},
bT(a){var s,r=this
r.$ti.c.a(a)
s=r.b1()
r.a=8
r.c=a
A.cu(r,s)},
eU(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.b1()
q.bk(a)
A.cu(q,r)},
am(a){var s=this.b1()
this.fl(a)
A.cu(this,s)},
eT(a,b){A.b4(a)
t.l.a(b)
this.am(new A.at(a,b))},
aY(a){var s=this.$ti
s.i("1/").a(a)
if(s.i("af<1>").b(a)){this.cT(a)
return}this.eN(a)},
eN(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.df(null,null,s.b,t.M.a(new A.mK(s,a)))},
cT(a){A.mL(this.$ti.i("af<1>").a(a),this,!1)
return},
bP(a){this.a^=2
A.df(null,null,this.b,t.M.a(new A.mJ(this,a)))},
dZ(a,b){var s,r=this,q={}
if((r.a&24)!==0){q=new A.W($.V,r.$ti)
q.aY(r)
return q}s=new A.W($.V,r.$ti)
q.a=null
q.a=A.e2(b,new A.mT(s,b))
r.bH(new A.mU(q,r,s),new A.mV(q,s),t.a)
return s},
$iaf:1}
A.mI.prototype={
$0(){A.cu(this.a,this.b)},
$S:2}
A.mN.prototype={
$0(){A.cu(this.b,this.a.a)},
$S:2}
A.mM.prototype={
$0(){A.mL(this.a.a,this.b,!0)},
$S:2}
A.mK.prototype={
$0(){this.a.bT(this.b)},
$S:2}
A.mJ.prototype={
$0(){this.a.am(this.b)},
$S:2}
A.mQ.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dV(t.mY.a(q.d),t.z)}catch(p){s=A.an(p)
r=A.c5(p)
if(k.c&&t.n.a(k.b.a.c).a===s){q=k.a
q.c=t.n.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.o3(q)
n=k.a
n.c=new A.at(q,o)
q=n}q.b=!0
return}if(j instanceof A.W&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.n.a(j.c)
q.b=!0}return}if(j instanceof A.W){m=k.b.a
l=new A.W(m.b,m.$ti)
j.bH(new A.mR(l,m),new A.mS(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:2}
A.mR.prototype={
$1(a){this.a.eU(this.b)},
$S:14}
A.mS.prototype={
$2(a,b){A.b4(a)
t.l.a(b)
this.a.am(new A.at(a,b))},
$S:26}
A.mP.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.cA(o.i("2/(1)").a(p.d),m,o.i("2/"),n)}catch(l){s=A.an(l)
r=A.c5(l)
q=s
p=r
if(p==null)p=A.o3(q)
o=this.a
o.c=new A.at(q,p)
o.b=!0}},
$S:2}
A.mO.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.n.a(l.a.a.c)
p=l.b
if(p.a.h7(s)&&p.a.e!=null){p.c=p.a.fV(s)
p.b=!1}}catch(o){r=A.an(o)
q=A.c5(o)
p=t.n.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.o3(p)
m=l.b
m.c=new A.at(p,n)
p=m}p.b=!0}},
$S:2}
A.mT.prototype={
$0(){var s=A.ok()
this.a.am(new A.at(new A.mk("Future not completed",this.b),s))},
$S:2}
A.mU.prototype={
$1(a){var s
this.b.$ti.c.a(a)
s=this.a.a
if(s.b!=null){s.a3(0)
this.c.bT(a)}},
$S(){return this.b.$ti.i("ad(1)")}}
A.mV.prototype={
$2(a,b){var s
A.b4(a)
t.l.a(b)
s=this.a.a
if(s.b!=null){s.a3(0)
this.b.am(new A.at(a,b))}},
$S:26}
A.h5.prototype={}
A.bZ.prototype={
gj(a){var s={},r=new A.W($.V,t.hy)
s.a=0
this.bC(new A.mi(s,this),!0,new A.mj(s,r),r.gcY())
return r},
gD(a){var s=new A.W($.V,A.C(this).i("W<1>")),r=this.bC(null,!0,new A.mg(s),s.gcY())
r.cs(new A.mh(this,r,s))
return s}}
A.mi.prototype={
$1(a){A.C(this.b).c.a(a);++this.a.a},
$S(){return A.C(this.b).i("~(1)")}}
A.mj.prototype={
$0(){this.b.aZ(this.a.a)},
$S:2}
A.mg.prototype={
$0(){var s,r=A.ok(),q=new A.bq("No element")
A.oi(q,r)
s=A.oC(q,r)
s=new A.at(q,r)
this.a.am(s)},
$S:2}
A.mh.prototype={
$1(a){A.ud(this.b,this.c,A.C(this.a).c.a(a))},
$S(){return A.C(this.a).i("~(1)")}}
A.e9.prototype={
gK(a){return(A.dU(this.a)^892482866)>>>0},
a0(a,b){if(b==null)return!1
if(this===b)return!0
return b instanceof A.d5&&b.a===this.a}}
A.ea.prototype={
d4(){return this.w.fb(this)},
c1(){A.C(this.w).i("br<1>").a(this)},
c2(){A.C(this.w).i("br<1>").a(this)}}
A.d6.prototype={
cs(a){var s=A.C(this)
this.a=A.pH(this.d,s.i("~(1)?").a(a),s.c)},
a3(a){var s,r=this,q=r.e&=4294967279
if((q&8)===0){q=r.e=q|8
if((q&128)!==0){s=r.r
if(s.a===1)s.a=3}if((q&64)===0)r.r=null
r.f=r.d4()}q=$.nW()
return q},
c1(){},
c2(){},
d4(){return null},
eM(a){var s,r,q=this,p=q.r
if(p==null)p=q.r=new A.hG(A.C(q).i("hG<1>"))
s=p.c
if(s==null)p.b=p.c=a
else p.c=s.a=a
r=q.e
if((r&128)===0){r|=128
q.e=r
if(r<256)p.cJ(q)}},
c8(a){var s,r=this,q=A.C(r).c
q.a(a)
s=r.e
r.e=s|64
r.d.dX(r.a,a,q)
r.e&=4294967231
r.eQ((s&4)!==0)},
eQ(a){var s,r,q=this,p=q.e
if((p&128)!==0&&q.r.c==null){p=q.e=p&4294967167
s=!1
if((p&4)!==0)if(p<256){s=q.r
s=s==null?null:s.c==null
s=s!==!1}if(s){p&=4294967291
q.e=p}}for(;;a=r){if((p&8)!==0){q.r=null
return}r=(p&4)!==0
if(a===r)break
q.e=p^64
if(r)q.c1()
else q.c2()
p=q.e&=4294967231}if((p&128)!==0&&p<256)q.r.cJ(q)},
$ibr:1,
$ic3:1}
A.d9.prototype={
bC(a,b,c,d){var s=this.$ti
s.i("~(1)?").a(a)
t.jE.a(c)
return this.a.fq(s.i("~(1)?").a(a),d,c,b===!0)},
h5(a){return this.bC(a,null,null,null)}}
A.ec.prototype={}
A.eb.prototype={}
A.hG.prototype={
cJ(a){var s,r=this
r.$ti.i("c3<1>").a(a)
s=r.a
if(s===1)return
if(s>=1){r.a=1
return}A.qJ(new A.n1(r,a))
r.a=1}}
A.n1.prototype={
$0(){var s,r,q,p=this.a,o=p.a
p.a=0
if(o===3)return
s=p.$ti.i("c3<1>").a(this.b)
r=p.b
q=r.a
p.b=q
if(q==null)p.c=null
A.C(r).i("c3<1>").a(s).c8(r.b)},
$S:2}
A.d7.prototype={
cs(a){this.$ti.i("~(1)?").a(a)},
a3(a){this.a=-1
this.c=null
return $.nW()},
f8(){var s,r=this,q=r.a-1
if(q===0){r.a=-1
s=r.c
if(s!=null){r.c=null
r.b.dW(s)}}else r.a=q},
$ibr:1}
A.hR.prototype={}
A.ns.prototype={
$0(){return this.a.aZ(this.b)},
$S:2}
A.eG.prototype={$ipF:1}
A.hJ.prototype={
dW(a){var s,r,q
t.M.a(a)
try{if(B.h===$.V){a.$0()
return}A.qq(null,null,this,a,t.H)}catch(q){s=A.an(q)
r=A.c5(q)
A.ie(A.b4(s),t.l.a(r))}},
dX(a,b,c){var s,r,q
c.i("~(0)").a(a)
c.a(b)
try{if(B.h===$.V){a.$1(b)
return}A.qr(null,null,this,a,b,t.H,c)}catch(q){s=A.an(q)
r=A.c5(q)
A.ie(A.b4(s),t.l.a(r))}},
ce(a){return new A.n3(this,t.M.a(a))},
ds(a,b){return new A.n4(this,b.i("~(0)").a(a),b)},
h(a,b){return null},
dV(a,b){b.i("0()").a(a)
if($.V===B.h)return a.$0()
return A.qq(null,null,this,a,b)},
cA(a,b,c,d){c.i("@<0>").J(d).i("1(2)").a(a)
d.a(b)
if($.V===B.h)return a.$1(b)
return A.qr(null,null,this,a,b,c,d)},
ho(a,b,c,d,e,f){d.i("@<0>").J(e).J(f).i("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.V===B.h)return a.$2(b,c)
return A.uO(null,null,this,a,b,c,d,e,f)},
cv(a,b,c,d){return b.i("@<0>").J(c).J(d).i("1(2,3)").a(a)}}
A.n3.prototype={
$0(){return this.a.dW(this.b)},
$S:2}
A.n4.prototype={
$1(a){var s=this.c
return this.a.dX(this.b,s.a(a),s)},
$S(){return this.c.i("~(0)")}}
A.nz.prototype={
$0(){A.rV(this.a,this.b)},
$S:2}
A.eg.prototype={
gj(a){return this.a},
gE(a){return this.a===0},
gT(a){return this.a!==0},
gI(a){return new A.eh(this,this.$ti.i("eh<1>"))},
M(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
return s==null?!1:s[b]!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
return r==null?!1:r[b]!=null}else return this.eX(b)},
eX(a){var s=this.d
if(s==null)return!1
return this.an(this.d_(s,a),a)>=0},
h(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.oo(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.oo(q,b)
return r}else return this.f0(0,b)},
f0(a,b){var s,r,q=this.d
if(q==null)return null
s=this.d_(q,b)
r=this.an(s,b)
return r<0?null:s[r+1]},
k(a,b,c){var s,r,q,p,o,n=this,m=n.$ti
m.c.a(b)
m.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=n.b
n.eS(s==null?n.b=A.pJ():s,b,c)}else{r=n.d
if(r==null)r=n.d=A.pJ()
q=A.il(b)&1073741823
p=r[q]
if(p==null){A.op(r,q,[b,c]);++n.a
n.e=null}else{o=n.an(p,b)
if(o>=0)p[o+1]=c
else{p.push(b,c);++n.a
n.e=null}}}},
C(a,b){var s
if(b!=="__proto__")return this.bo(this.b,b)
else{s=this.c5(0,b)
return s}},
c5(a,b){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=A.il(b)&1073741823
r=n[s]
q=o.an(r,b)
if(q<0)return null;--o.a
o.e=null
p=r.splice(q,2)[1]
if(0===r.length)delete n[s]
return p},
q(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.i("~(1,2)").a(b)
s=m.cZ()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.h(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.b(A.a7(m))}},
cZ(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
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
eS(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.op(a,b,c)},
bo(a,b){var s
if(a!=null&&a[b]!=null){s=this.$ti.y[1].a(A.oo(a,b))
delete a[b];--this.a
this.e=null
return s}else return null},
d_(a,b){return a[A.il(b)&1073741823]}}
A.cw.prototype={
an(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.eh.prototype={
gj(a){return this.a.a},
gE(a){return this.a.a===0},
gT(a){return this.a.a!==0},
gB(a){var s=this.a
return new A.ei(s,s.cZ(),this.$ti.i("ei<1>"))},
A(a,b){return this.a.M(0,b)}}
A.ei.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.b(A.a7(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iab:1}
A.cx.prototype={
gB(a){var s=this,r=new A.cy(s,s.r,A.C(s).i("cy<1>"))
r.c=s.e
return r},
gj(a){return this.a},
gE(a){return this.a===0},
gT(a){return this.a!==0},
A(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.L.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.L.a(r[b])!=null}else return this.eW(b)},
eW(a){var s=this.d
if(s==null)return!1
return this.an(s[this.bU(a)],a)>=0},
m(a,b){var s,r,q=this
A.C(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.cW(s==null?q.b=A.oq():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.cW(r==null?q.c=A.oq():r,b)}else return q.eI(0,b)},
eI(a,b){var s,r,q,p=this
A.C(p).c.a(b)
s=p.d
if(s==null)s=p.d=A.oq()
r=p.bU(b)
q=s[r]
if(q==null)s[r]=[p.bS(b)]
else{if(p.an(q,b)>=0)return!1
q.push(p.bS(b))}return!0},
C(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bo(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bo(s.c,b)
else return s.c5(0,b)},
c5(a,b){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.bU(b)
r=n[s]
q=o.an(r,b)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.di(p)
return!0},
cW(a,b){A.C(this).c.a(b)
if(t.L.a(a[b])!=null)return!1
a[b]=this.bS(b)
return!0},
bo(a,b){var s
if(a==null)return!1
s=t.L.a(a[b])
if(s==null)return!1
this.di(s)
delete a[b]
return!0},
cX(){this.r=this.r+1&1073741823},
bS(a){var s,r=this,q=new A.hw(A.C(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.cX()
return q},
di(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.cX()},
bU(a){return J.cI(a)&1073741823},
an(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.j(a[r].a,b))return r
return-1}}
A.hw.prototype={}
A.cy.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.b(A.a7(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.i("1?").a(r.a)
s.c=r.b
return!0}},
$iab:1}
A.e3.prototype={
gj(a){return this.a.length},
h(a,b){var s
A.L(b)
s=this.a
if(!(b>=0&&b<s.length))return A.e(s,b)
return s[b]}}
A.m_.prototype={
$2(a,b){this.a.k(0,this.b.a(a),this.c.a(b))},
$S:43}
A.m.prototype={
gB(a){return new A.bh(a,this.gj(a),A.ax(a).i("bh<m.E>"))},
v(a,b){return this.h(a,b)},
q(a,b){var s,r
A.ax(a).i("~(m.E)").a(b)
s=this.gj(a)
for(r=0;r<s;++r){b.$1(this.h(a,r))
if(s!==this.gj(a))throw A.b(A.a7(a))}},
gE(a){return this.gj(a)===0},
gT(a){return!this.gE(a)},
gD(a){if(this.gj(a)===0)throw A.b(A.dB())
return this.h(a,0)},
A(a,b){var s,r=this.gj(a)
for(s=0;s<r;++s){if(J.j(this.h(a,s),b))return!0
if(r!==this.gj(a))throw A.b(A.a7(a))}return!1},
e4(a,b){return new A.cs(a,b.i("cs<0>"))},
au(a,b,c){var s=A.ax(a)
return new A.a1(a,s.J(c).i("1(m.E)").a(b),s.i("@<m.E>").J(c).i("a1<1,2>"))},
aF(a,b){var s,r,q,p,o=this
if(o.gE(a)){s=J.o9(0,A.ax(a).i("m.E"))
return s}r=o.h(a,0)
q=A.dK(o.gj(a),r,!0,A.ax(a).i("m.E"))
for(p=1;p<o.gj(a);++p)B.b.k(q,p,o.h(a,p))
return q},
aw(a){return this.aF(a,!0)},
fT(a,b,c,d){var s
A.ax(a).i("m.E?").a(d)
A.cp(b,c,this.gj(a))
for(s=b;s<c;++s)this.k(a,s,d)},
bN(a,b,c,d,e){var s,r,q
A.ax(a).i("h<m.E>").a(d)
A.cp(b,c,this.gj(a))
s=c-b
if(s===0)return
A.cY(e,"skipCount")
r=J.w(d)
if(e+s>r.gj(d))throw A.b(A.O("Too few elements"))
if(e<b)for(q=s-1;q>=0;--q)this.k(a,b+q,r.h(d,e+q))
else for(q=0;q<s;++q)this.k(a,b+q,r.h(d,e+q))},
l(a){return A.o8(a,"[","]")},
$in:1,
$ih:1,
$ip:1}
A.G.prototype={
q(a,b){var s,r,q,p=A.ax(a)
p.i("~(G.K,G.V)").a(b)
for(s=J.aF(this.gI(a)),p=p.i("G.V");s.p();){r=s.gt(s)
q=this.h(a,r)
b.$2(r,q==null?p.a(q):q)}},
gaC(a){return J.ca(this.gI(a),new A.m0(a),A.ax(a).i("aq<G.K,G.V>"))},
M(a,b){return J.o0(this.gI(a),b)},
gj(a){return J.aj(this.gI(a))},
gE(a){return J.is(this.gI(a))},
gT(a){return J.o2(this.gI(a))},
l(a){return A.oe(a)},
$it:1}
A.m0.prototype={
$1(a){var s=this.a,r=A.ax(s)
r.i("G.K").a(a)
s=J.k(s,a)
if(s==null)s=r.i("G.V").a(s)
return new A.aq(a,s,r.i("aq<G.K,G.V>"))},
$S(){return A.ax(this.a).i("aq<G.K,G.V>(G.K)")}}
A.m1.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.d(a)
r.a=(r.a+=s)+": "
s=A.d(b)
r.a+=s},
$S:28}
A.d3.prototype={}
A.aD.prototype={
k(a,b,c){var s=A.C(this)
s.i("aD.K").a(b)
s.i("aD.V").a(c)
throw A.b(A.P("Cannot modify unmodifiable map"))},
C(a,b){throw A.b(A.P("Cannot modify unmodifiable map"))}}
A.cU.prototype={
h(a,b){return J.k(this.a,b)},
k(a,b,c){var s=A.C(this)
J.aE(this.a,s.c.a(b),s.y[1].a(c))},
M(a,b){return J.o1(this.a,b)},
q(a,b){J.ir(this.a,A.C(this).i("~(1,2)").a(b))},
gE(a){return J.is(this.a)},
gT(a){return J.o2(this.a)},
gj(a){return J.aj(this.a)},
gI(a){return J.rq(this.a)},
C(a,b){return J.rA(this.a,b)},
l(a){return J.M(this.a)},
gaC(a){return J.rp(this.a)},
$it:1}
A.c1.prototype={}
A.av.prototype={
gE(a){return this.gj(this)===0},
gT(a){return this.gj(this)!==0},
S(a,b){var s
for(s=J.aF(A.C(this).i("h<av.E>").a(b));s.p();)this.m(0,s.gt(s))},
bE(a){var s
for(s=0;s<5;++s)this.C(0,a[s])},
au(a,b,c){var s=A.C(this)
return new A.bx(this,s.J(c).i("1(av.E)").a(b),s.i("@<av.E>").J(c).i("bx<1,2>"))},
l(a){return A.o8(this,"{","}")},
a_(a,b){var s,r,q,p,o=this.gB(this)
if(!o.p())return""
s=o.d
r=J.M(s==null?o.$ti.c.a(s):s)
if(!o.p())return r
s=o.$ti.c
if(b.length===0){q=r
do{p=o.d
q+=A.d(p==null?s.a(p):p)}while(o.p())
s=q}else{q=r
do{p=o.d
q=q+b+A.d(p==null?s.a(p):p)}while(o.p())
s=q}return s.charCodeAt(0)==0?s:s},
v(a,b){var s,r,q
A.cY(b,"index")
s=this.gB(this)
for(r=b;s.p();){if(r===0){q=s.d
return q==null?s.$ti.c.a(q):q}--r}throw A.b(A.a8(b,b-r,this,null,"index"))},
$in:1,
$ih:1,
$ib9:1}
A.eq.prototype={}
A.dc.prototype={}
A.hs.prototype={
h(a,b){var s,r=this.b
if(r==null)return this.c.h(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.f9(b):s}},
gj(a){return this.b==null?this.c.a:this.b_().length},
gE(a){return this.gj(0)===0},
gT(a){return this.gj(0)>0},
gI(a){var s
if(this.b==null){s=this.c
return new A.cl(s,A.C(s).i("cl<1>"))}return new A.ht(this)},
k(a,b,c){var s,r,q=this
if(q.b==null)q.c.k(0,b,c)
else if(q.M(0,b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.dl().k(0,b,c)},
M(a,b){if(this.b==null)return this.c.M(0,b)
return Object.prototype.hasOwnProperty.call(this.a,b)},
C(a,b){if(this.b!=null&&!this.M(0,b))return null
return this.dl().C(0,b)},
q(a,b){var s,r,q,p,o=this
t.v.a(b)
if(o.b==null)return o.c.q(0,b)
s=o.b_()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.nt(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.b(A.a7(o))}},
b_(){var s=t.lH.a(this.c)
if(s==null)s=this.c=A.B(Object.keys(this.a),t.s)
return s},
dl(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.ap(t.N,t.z)
r=n.b_()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.k(0,o,n.h(0,o))}if(p===0)B.b.m(r,"")
else B.b.X(r)
n.a=n.b=null
return n.c=s},
f9(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.nt(this.a[a])
return this.b[a]=s}}
A.ht.prototype={
gj(a){return this.a.gj(0)},
v(a,b){var s=this.a
if(s.b==null)s=s.gI(0).v(0,b)
else{s=s.b_()
if(!(b>=0&&b<s.length))return A.e(s,b)
s=s[b]}return s},
gB(a){var s=this.a
if(s.b==null){s=s.gI(0)
s=s.gB(s)}else{s=s.b_()
s=new J.bd(s,s.length,A.E(s).i("bd<1>"))}return s},
A(a,b){return this.a.M(0,b)}}
A.nj.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:29}
A.ni.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:29}
A.dl.prototype={
dK(a3,a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a1="Invalid base64 encoding length ",a2=a4.length
a6=A.cp(a5,a6,a2)
s=$.oQ()
for(r=s.length,q=a5,p=q,o=null,n=-1,m=-1,l=0;q<a6;q=k){k=q+1
if(!(q<a2))return A.e(a4,q)
j=a4.charCodeAt(q)
if(j===37){i=k+2
if(i<=a6){if(!(k<a2))return A.e(a4,k)
h=A.nG(a4.charCodeAt(k))
g=k+1
if(!(g<a2))return A.e(a4,g)
f=A.nG(a4.charCodeAt(g))
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
c=A.a6(j)
g.a+=c
p=k
continue}}throw A.b(A.a2("Invalid base64 data",a4,q))}if(o!=null){a2=B.a.n(a4,p,a6)
a2=o.a+=a2
r=a2.length
if(n>=0)A.oX(a4,m,a6,n,l,r)
else{b=B.e.aT(r-1,4)+1
if(b===1)throw A.b(A.a2(a1,a4,a6))
while(b<4){a2+="="
o.a=a2;++b}}a2=o.a
return B.a.aD(a4,a5,a6,a2.charCodeAt(0)==0?a2:a2)}a=a6-a5
if(n>=0)A.oX(a4,m,a6,n,l,a)
else{b=B.e.aT(a,4)
if(b===1)throw A.b(A.a2(a1,a4,a6))
if(b>1)a4=B.a.aD(a4,a6,a6,b===2?"==":"=")}return a4},
dJ(a,b){return this.dK(0,b,0,null)}}
A.eW.prototype={}
A.kF.prototype={
aB(a){var s,r,q,p=A.cp(0,null,a.length)
if(0===p)return new Uint8Array(0)
s=new A.mC()
r=s.fO(0,a,0,p)
r.toString
q=s.a
if(q<-1)A.bN(A.a2("Missing padding character",a,p))
if(q>0)A.bN(A.a2("Invalid length, must be multiple of four",a,p))
s.a=-1
return r}}
A.mC.prototype={
fO(a,b,c,d){var s,r=this,q=r.a
if(q<0){r.a=A.pG(b,c,d,q)
return null}if(c===d)return new Uint8Array(0)
s=A.tr(b,c,d,q)
r.a=A.tt(b,c,d,s,0,r.a)
return s}}
A.cc.prototype={}
A.f1.prototype={}
A.fa.prototype={}
A.dE.prototype={
l(a){var s=A.by(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.fm.prototype={
l(a){return"Cyclic error in JSON stringify"}}
A.fl.prototype={
L(a,b){var s=A.uL(b,this.gfQ().a)
return s},
V(a){var s=A.tB(a,this.gfR().b,null)
return s},
gfR(){return B.aj},
gfQ(){return B.ai}}
A.lY.prototype={}
A.lX.prototype={}
A.mZ.prototype={
e6(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.a.n(a,r,q)
r=q+1
o=A.a6(92)
s.a+=o
o=A.a6(117)
s.a+=o
o=A.a6(100)
s.a+=o
o=p>>>8&15
o=A.a6(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.a6(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.a6(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.a.n(a,r,q)
r=q+1
o=A.a6(92)
s.a+=o
switch(p){case 8:o=A.a6(98)
s.a+=o
break
case 9:o=A.a6(116)
s.a+=o
break
case 10:o=A.a6(110)
s.a+=o
break
case 12:o=A.a6(102)
s.a+=o
break
case 13:o=A.a6(114)
s.a+=o
break
default:o=A.a6(117)
s.a+=o
o=A.a6(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.a6(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.a6(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.a.n(a,r,q)
r=q+1
o=A.a6(92)
s.a+=o
o=A.a6(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.a.n(a,r,m)},
bR(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.b(new A.fm(a,null))}B.b.m(s,a)},
bK(a){var s,r,q,p,o=this
if(o.e5(a))return
o.bR(a)
try{s=o.b.$1(a)
if(!o.e5(s)){q=A.pf(a,null,o.gd5())
throw A.b(q)}q=o.a
if(0>=q.length)return A.e(q,-1)
q.pop()}catch(p){r=A.an(p)
q=A.pf(a,r,o.gd5())
throw A.b(q)}},
e5(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.d.l(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.e6(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.bR(a)
q.hu(a)
s=q.a
if(0>=s.length)return A.e(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.bR(a)
r=q.hv(a)
s=q.a
if(0>=s.length)return A.e(s,-1)
s.pop()
return r}else return!1},
hu(a){var s,r,q=this.c
q.a+="["
s=J.w(a)
if(s.gT(a)){this.bK(s.h(a,0))
for(r=1;r<s.gj(a);++r){q.a+=","
this.bK(s.h(a,r))}}q.a+="]"},
hv(a){var s,r,q,p,o,n=this,m={},l=J.w(a)
if(l.gE(a)){n.c.a+="{}"
return!0}s=l.gj(a)*2
r=A.dK(s,null,!1,t.X)
q=m.a=0
m.b=!0
l.q(a,new A.n_(m,r))
if(!m.b)return!1
l=n.c
l.a+="{"
for(p='"';q<s;q+=2,p=',"'){l.a+=p
n.e6(A.x(r[q]))
l.a+='":'
o=q+1
if(!(o<s))return A.e(r,o)
n.bK(r[o])}l.a+="}"
return!0}}
A.n_.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.b.k(s,r.a++,a)
B.b.k(s,r.a++,b)},
$S:28}
A.mY.prototype={
gd5(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.h2.prototype={
L(a,b){t.f4.a(b)
return B.aG.aB(b)}}
A.mw.prototype={
aB(a){var s,r,q,p,o=a.length,n=A.cp(0,null,o)
if(n===0)return new Uint8Array(0)
s=n*3
r=new Uint8Array(s)
q=new A.nk(r)
if(q.f_(a,0,n)!==n){p=n-1
if(!(p>=0&&p<o))return A.e(a,p)
q.cb()}return new Uint8Array(r.subarray(0,A.uh(0,q.b,s)))}}
A.nk.prototype={
cb(){var s,r=this,q=r.c,p=r.b,o=r.b=p+1
q.$flags&2&&A.al(q)
s=q.length
if(!(p<s))return A.e(q,p)
q[p]=239
p=r.b=o+1
if(!(o<s))return A.e(q,o)
q[o]=191
r.b=p+1
if(!(p<s))return A.e(q,p)
q[p]=189},
fu(a,b){var s,r,q,p,o,n=this
if((b&64512)===56320){s=65536+((a&1023)<<10)|b&1023
r=n.c
q=n.b
p=n.b=q+1
r.$flags&2&&A.al(r)
o=r.length
if(!(q<o))return A.e(r,q)
r[q]=s>>>18|240
q=n.b=p+1
if(!(p<o))return A.e(r,p)
r[p]=s>>>12&63|128
p=n.b=q+1
if(!(q<o))return A.e(r,q)
r[q]=s>>>6&63|128
n.b=p+1
if(!(p<o))return A.e(r,p)
r[p]=s&63|128
return!0}else{n.cb()
return!1}},
f_(a,b,c){var s,r,q,p,o,n,m,l,k=this
if(b!==c){s=c-1
if(!(s>=0&&s<a.length))return A.e(a,s)
s=(a.charCodeAt(s)&64512)===55296}else s=!1
if(s)--c
for(s=k.c,r=s.$flags|0,q=s.length,p=a.length,o=b;o<c;++o){if(!(o<p))return A.e(a,o)
n=a.charCodeAt(o)
if(n<=127){m=k.b
if(m>=q)break
k.b=m+1
r&2&&A.al(s)
s[m]=n}else{m=n&64512
if(m===55296){if(k.b+4>q)break
m=o+1
if(!(m<p))return A.e(a,m)
if(k.fu(n,a.charCodeAt(m)))o=m}else if(m===56320){if(k.b+3>q)break
k.cb()}else if(n<=2047){m=k.b
l=m+1
if(l>=q)break
k.b=l
r&2&&A.al(s)
if(!(m<q))return A.e(s,m)
s[m]=n>>>6|192
k.b=l+1
s[l]=n&63|128}else{m=k.b
if(m+2>=q)break
l=k.b=m+1
r&2&&A.al(s)
if(!(m<q))return A.e(s,m)
s[m]=n>>>12|224
m=k.b=l+1
if(!(l<q))return A.e(s,l)
s[l]=n>>>6&63|128
k.b=m+1
if(!(m<q))return A.e(s,m)
s[m]=n&63|128}}}return o}}
A.mv.prototype={
aB(a){return new A.nh(this.a).eY(t.f4.a(a),0,null,!0)}}
A.nh.prototype={
eY(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.f4.a(a)
s=A.cp(b,c,J.aj(a))
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.u4(a,b,s)
s-=b
p=b
b=0}if(s-b>=15){o=l.a
n=A.u3(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.bV(q,b,s,!0)
o=l.b
if((o&1)!==0){m=A.u5(o)
l.b=0
throw A.b(A.a2(m,a,p+l.c))}return n},
bV(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.e.ac(b+c,2)
r=q.bV(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.bV(a,s,c,d)}return q.fP(a,b,c,d)},
fP(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.ar(""),d=b+1,c=a.length
if(!(b>=0&&b<c))return A.e(a,b)
s=a[b]
A:for(r=k.a;;){for(;;d=o){if(!(s>=0&&s<256))return A.e(j,s)
q=j.charCodeAt(s)&31
f=g<=32?s&61694>>>q:(s&63|f<<6)>>>0
p=g+q
if(!(p>=0&&p<144))return A.e(i,p)
g=i.charCodeAt(p)
if(g===0){p=A.a6(f)
e.a+=p
if(d===a0)break A
break}else if((g&1)!==0){if(r)switch(g){case 69:case 67:p=A.a6(h)
e.a+=p
break
case 65:p=A.a6(h)
e.a+=p;--d
break
default:p=A.a6(h)
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
p=A.a6(a[l])
e.a+=p}else{p=A.pw(a,d,n)
e.a+=p}if(n===a0)break A
d=o}else d=o}if(a1&&g>32)if(r){c=A.a6(h)
e.a+=c}else{k.b=77
k.c=a0
return""}k.b=g
k.c=f
c=e.a
return c.charCodeAt(0)==0?c:c}}
A.m4.prototype={
$2(a,b){var s,r,q
t.bR.a(a)
s=this.b
r=this.a
q=(s.a+=r.a)+a.a
s.a=q
s.a=q+": "
q=A.by(b)
s.a+=q
r.a=", "},
$S:67}
A.ng.prototype={
$2(a,b){var s,r
A.x(a)
if(typeof b=="string")this.a.set(a,b)
else if(b==null)this.a.set(a,"")
else for(s=J.aF(t.R.a(b)),r=this.a;s.p();){b=s.gt(s)
if(typeof b=="string")r.append(a,b)
else if(b==null)r.append(a,"")
else A.ao(b)}},
$S:6}
A.lG.prototype={
$0(){var s=this
return A.bN(A.aY("("+s.a+", "+s.b+", "+s.c+", "+s.d+", "+s.e+", "+s.f+", "+s.r+", "+s.w+")",null))},
$S:68}
A.ag.prototype={
a0(a,b){if(b==null)return!1
return b instanceof A.ag&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gK(a){return A.of(this.a,this.b,B.r,B.r)},
a1(a,b){var s
t.cs.a(b)
s=B.e.a1(this.a,b.a)
if(s!==0)return s
return B.e.a1(this.b,b.b)},
aa(){var s=this
if(s.c)return s
return new A.ag(s.a,s.b,!0)},
l(a){var s=this,r=A.p4(A.cW(s)),q=A.bw(A.mb(s)),p=A.bw(A.pn(s)),o=A.bw(A.og(s)),n=A.bw(A.oh(s)),m=A.bw(A.pp(s)),l=A.lH(A.po(s)),k=s.b,j=k===0?"":A.lH(k)
k=r+"-"+q
if(s.c)return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j},
a9(){var s=this,r=A.cW(s)>=-9999&&A.cW(s)<=9999?A.p4(A.cW(s)):A.rQ(A.cW(s)),q=A.bw(A.mb(s)),p=A.bw(A.pn(s)),o=A.bw(A.og(s)),n=A.bw(A.oh(s)),m=A.bw(A.pp(s)),l=A.lH(A.po(s)),k=s.b,j=k===0?"":A.lH(k)
k=r+"-"+q
if(s.c)return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j}}
A.lI.prototype={
$1(a){if(a==null)return 0
return A.eM(a)},
$S:33}
A.lJ.prototype={
$1(a){var s,r,q
if(a==null)return 0
for(s=a.length,r=0,q=0;q<6;++q){r*=10
if(q<s){if(!(q<s))return A.e(a,q)
r+=a.charCodeAt(q)^48}}return r},
$S:33}
A.aL.prototype={
aG(a,b){return new A.aL(B.e.aE(this.a*b))},
bh(a,b){return B.e.bh(this.a,t.jS.a(b).ghy())},
a0(a,b){if(b==null)return!1
return b instanceof A.aL&&this.a===b.a},
gK(a){return B.e.gK(this.a)},
l(a){var s,r,q,p,o,n=this.a,m=B.e.ac(n,36e8),l=n%36e8
if(n<0){m=0-m
n=0-l
s="-"}else{n=l
s=""}r=B.e.ac(n,6e7)
n%=6e7
q=r<10?"0":""
p=B.e.ac(n,1e6)
o=p<10?"0":""
return s+m+":"+q+r+":"+o+p+"."+B.a.bc(B.e.l(n%1e6),6,"0")}}
A.a0.prototype={
gaV(){return A.tb(this)}}
A.eQ.prototype={
l(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.by(s)
return"Assertion failed"}}
A.bD.prototype={}
A.b7.prototype={
gbX(){return"Invalid argument"+(!this.a?"(s)":"")},
gbW(){return""},
l(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.d(p),n=s.gbX()+q+o
if(!s.a)return n
return n+s.gbW()+": "+A.by(s.gcq())},
gcq(){return this.b}}
A.cX.prototype={
gcq(){return A.np(this.b)},
gbX(){return"RangeError"},
gbW(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.d(q):""
else if(q==null)s=": Not greater than or equal to "+A.d(r)
else if(q>r)s=": Not in inclusive range "+A.d(r)+".."+A.d(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.d(r)
return s}}
A.fe.prototype={
gcq(){return A.L(this.b)},
gbX(){return"RangeError"},
gbW(){if(A.L(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gj(a){return this.f}}
A.fB.prototype={
l(a){var s,r,q,p,o,n,m,l,k=this,j={},i=new A.ar("")
j.a=""
s=k.c
for(r=s.length,q=0,p="",o="";q<r;++q,o=", "){n=s[q]
i.a=p+o
p=A.by(n)
p=i.a+=p
j.a=", "}k.d.q(0,new A.m4(j,i))
m=A.by(k.a)
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
return"Concurrent modification during iteration: "+A.by(s)+"."}}
A.fE.prototype={
l(a){return"Out of Memory"},
gaV(){return null},
$ia0:1}
A.dY.prototype={
l(a){return"Stack Overflow"},
gaV(){return null},
$ia0:1}
A.mH.prototype={
l(a){return"Exception: "+this.a}}
A.bf.prototype={
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
k=""}return g+l+B.a.n(e,i,j)+k+"\n"+B.a.aG(" ",f-i+l.length)+"^\n"}else return f!=null?g+(" (at offset "+A.d(f)+")"):g}}
A.h.prototype={
au(a,b,c){var s=A.C(this)
return A.t4(this,s.J(c).i("1(h.E)").a(b),s.i("h.E"),c)},
bJ(a,b){var s=A.C(this)
return new A.I(this,s.i("F(h.E)").a(b),s.i("I<h.E>"))},
A(a,b){var s
for(s=this.gB(this);s.p();)if(J.j(s.gt(s),b))return!0
return!1},
cj(a,b,c,d){var s,r
d.a(b)
A.C(this).J(d).i("1(1,h.E)").a(c)
for(s=this.gB(this),r=b;s.p();)r=c.$2(r,s.gt(s))
return r},
a6(a,b){var s
A.C(this).i("F(h.E)").a(b)
for(s=this.gB(this);s.p();)if(b.$1(s.gt(s)))return!0
return!1},
aF(a,b){var s=A.a4(this,A.C(this).i("h.E"))
return s},
aw(a){return this.aF(0,!0)},
gj(a){var s,r=this.gB(this)
for(s=0;r.p();)++s
return s},
gE(a){return!this.gB(this).p()},
gT(a){return!this.gE(this)},
gaH(a){var s,r=this.gB(this)
if(!r.p())throw A.b(A.dB())
s=r.gt(r)
if(r.p())throw A.b(A.rX())
return s},
v(a,b){var s,r
A.cY(b,"index")
s=this.gB(this)
for(r=b;s.p();){if(r===0)return s.gt(s);--r}throw A.b(A.a8(b,b-r,this,null,"index"))},
l(a){return A.rY(this,"(",")")}}
A.aq.prototype={
l(a){return"MapEntry("+A.d(this.a)+": "+A.d(this.b)+")"}}
A.ad.prototype={
gK(a){return A.H.prototype.gK.call(this,0)},
l(a){return"null"}}
A.H.prototype={$iH:1,
a0(a,b){return this===b},
gK(a){return A.dU(this)},
l(a){return"Instance of '"+A.dV(this)+"'"},
dI(a,b){throw A.b(A.pl(this,t.bg.a(b)))},
gW(a){return A.vc(this)},
toString(){return this.l(this)}}
A.hU.prototype={
l(a){return""},
$ibl:1}
A.ar.prototype={
gj(a){return this.a.length},
l(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$ith:1}
A.mu.prototype={
$2(a,b){var s,r,q,p
t.je.a(a)
A.x(b)
s=B.a.dC(b,"=")
if(s===-1){if(b!=="")J.aE(a,A.ox(b,0,b.length,this.a,!0),"")}else if(s!==0){r=B.a.n(b,0,s)
q=B.a.Z(b,s+1)
p=this.a
J.aE(a,A.ox(r,0,r.length,p,!0),A.ox(q,0,q.length,p,!0))}return a},
$S:39}
A.mt.prototype={
$2(a,b){throw A.b(A.a2("Illegal IPv6 address, "+a,this.a,b))},
$S:46}
A.eC.prototype={
gdd(){var s,r,q,p,o=this,n=o.w
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
gK(a){var s,r=this,q=r.y
if(q===$){s=B.a.gK(r.gdd())
r.y!==$&&A.qL()
r.y=s
q=s}return q},
gai(){var s,r=this,q=r.z
if(q===$){s=r.f
s=A.pE(s==null?"":s)
r.z!==$&&A.qL()
q=r.z=new A.c1(s,t.ph)}return q},
gcC(){return this.b},
gbz(a){var s=this.c
if(s==null)return""
if(B.a.N(s,"[")&&!B.a.R(s,"v",1))return B.a.n(s,1,s.length-1)
return s},
gbd(a){var s=this.d
return s==null?A.pY(this.a):s},
gaO(a){var s=this.f
return s==null?"":s},
gbx(){var s=this.r
return s==null?"":s},
h2(a){var s=this.a
if(a.length!==s.length)return!1
return A.ue(a,s,0)>=0},
dS(a,b){var s,r,q,p,o,n,m,l=this
b=A.ou(b,0,b.length)
s=b==="file"
r=l.b
q=l.d
if(b!==l.a)q=A.nd(q,b)
p=l.c
if(!(p!=null))p=r.length!==0||q!=null||s?"":null
o=l.e
if(!s)n=p!=null&&o.length!==0
else n=!0
if(n&&!B.a.N(o,"/"))o="/"+o
m=o
return A.eD(b,r,p,q,m,l.f,l.r)},
d3(a,b){var s,r,q,p,o,n,m,l,k
for(s=0,r=0;B.a.R(b,"../",r);){r+=3;++s}q=B.a.h4(a,"/")
p=a.length
for(;;){if(!(q>0&&s>0))break
o=B.a.dG(a,"/",q-1)
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
q=o}return B.a.aD(a,q+1,null,B.a.Z(b,r-3*s))},
dU(a){return this.bf(A.cr(a))},
bf(a){var s,r,q,p,o,n,m,l,k,j,i,h=this
if(a.gaU().length!==0)return a
else{s=h.a
if(a.gcl()){r=a.dS(0,s)
return r}else{q=h.b
p=h.c
o=h.d
n=h.e
if(a.gdB())m=a.gby()?a.gaO(a):h.f
else{l=A.u2(h,n)
if(l>0){k=B.a.n(n,0,l)
n=a.gck()?k+A.cA(a.gag(a)):k+A.cA(h.d3(B.a.Z(n,k.length),a.gag(a)))}else if(a.gck())n=A.cA(a.gag(a))
else if(n.length===0)if(p==null)n=s.length===0?a.gag(a):A.cA(a.gag(a))
else n=A.cA("/"+a.gag(a))
else{j=h.d3(n,a.gag(a))
r=s.length===0
if(!r||p!=null||B.a.N(n,"/"))n=A.cA(j)
else n=A.ow(j,!r||p!=null)}m=a.gby()?a.gaO(a):null}}}i=a.gcn()?a.gbx():null
return A.eD(s,q,p,o,n,m,i)},
gcl(){return this.c!=null},
gby(){return this.f!=null},
gcn(){return this.r!=null},
gdB(){return this.e.length===0},
gck(){return B.a.N(this.e,"/")},
gcu(a){var s,r,q=this,p=q.a
if(p==="")throw A.b(A.O("Cannot use origin without a scheme: "+q.l(0)))
if(p!=="http"&&p!=="https")throw A.b(A.O("Origin is only applicable schemes http and https: "+q.l(0)))
s=q.c
if(s==null||s==="")throw A.b(A.O("A "+p+u.p+q.l(0)))
r=q.d
if(r==null)return p+"://"+s
return p+"://"+s+":"+A.d(r)},
l(a){return this.gdd()},
a0(a,b){var s,r,q,p=this
if(b==null)return!1
if(p===b)return!0
s=!1
if(t.jJ.b(b))if(p.a===b.gaU())if(p.c!=null===b.gcl())if(p.b===b.gcC())if(p.gbz(0)===b.gbz(b))if(p.gbd(0)===b.gbd(b))if(p.e===b.gag(b)){r=p.f
q=r==null
if(!q===b.gby()){if(q)r=""
if(r===b.gaO(b)){r=p.r
q=r==null
if(!q===b.gcn()){s=q?"":r
s=s===b.gbx()}}}}return s},
$ih_:1,
gaU(){return this.a},
gag(a){return this.e}}
A.nf.prototype={
$2(a,b){var s=this.b,r=this.a
s.a+=r.a
r.a="&"
r=A.q8(1,a,B.l,!0)
r=s.a+=r
if(b!=null&&b.length!==0){s.a=r+"="
r=A.q8(1,b,B.l,!0)
s.a+=r}},
$S:40}
A.ne.prototype={
$2(a,b){var s,r
A.x(a)
if(b==null||typeof b=="string")this.a.$2(a,A.ao(b))
else for(s=J.aF(t.R.a(b)),r=this.a;s.p();)r.$2(a,A.x(s.gt(s)))},
$S:6}
A.ms.prototype={
ge3(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.e(m,0)
s=o.a
m=m[0]+1
r=B.a.bA(s,"?",m)
q=s.length
if(r>=0){p=A.eE(s,r+1,q,256,!1,!1)
q=r}else p=n
m=o.c=new A.he("data","",n,n,A.eE(s,m,q,128,!1,!1),p,n)}return m},
l(a){var s,r=this.b
if(0>=r.length)return A.e(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.ba.prototype={
gcl(){return this.c>0},
gco(){return this.c>0&&this.d+1<this.e},
gby(){return this.f<this.r},
gcn(){return this.r<this.a.length},
gck(){return B.a.R(this.a,"/",this.e)},
gdB(){return this.e===this.f},
gaU(){var s=this.w
return s==null?this.w=this.eV():s},
eV(){var s,r=this,q=r.b
if(q<=0)return""
s=q===4
if(s&&B.a.N(r.a,"http"))return"http"
if(q===5&&B.a.N(r.a,"https"))return"https"
if(s&&B.a.N(r.a,"file"))return"file"
if(q===7&&B.a.N(r.a,"package"))return"package"
return B.a.n(r.a,0,q)},
gcC(){var s=this.c,r=this.b+3
return s>r?B.a.n(this.a,r,s-1):""},
gbz(a){var s=this.c
return s>0?B.a.n(this.a,s,this.d):""},
gbd(a){var s,r=this
if(r.gco())return A.eM(B.a.n(r.a,r.d+1,r.e))
s=r.b
if(s===4&&B.a.N(r.a,"http"))return 80
if(s===5&&B.a.N(r.a,"https"))return 443
return 0},
gag(a){return B.a.n(this.a,this.e,this.f)},
gaO(a){var s=this.f,r=this.r
return s<r?B.a.n(this.a,s+1,r):""},
gbx(){var s=this.r,r=this.a
return s<r.length?B.a.Z(r,s+1):""},
gcu(a){var s,r,q=this,p=q.b,o=p===4&&B.a.N(q.a,"http")
if(p<0)throw A.b(A.O("Cannot use origin without a scheme: "+q.l(0)))
if(!o)s=!(p===5&&B.a.N(q.a,"https"))
else s=!1
if(s)throw A.b(A.O("Origin is only applicable to schemes http and https: "+q.l(0)))
s=q.c
if(s===q.d)throw A.b(A.O("A "+q.gaU()+u.p+q.l(0)))
p+=3
if(s===p)return B.a.n(q.a,0,q.e)
r=q.a
return B.a.n(r,0,p)+B.a.n(r,s,q.e)},
gai(){if(this.f>=this.r)return B.ao
return new A.c1(A.pE(this.gaO(0)),t.ph)},
d1(a){var s=this.d+1
return s+a.length===this.e&&B.a.R(this.a,a,s)},
hi(){var s=this,r=s.r,q=s.a
if(r>=q.length)return s
return new A.ba(B.a.n(q,0,r),s.b,s.c,s.d,s.e,s.f,r,s.w)},
dS(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=null
b=A.ou(b,0,b.length)
s=!(h.b===b.length&&B.a.N(h.a,b))
r=b==="file"
q=h.c
p=q>0?B.a.n(h.a,h.b+3,q):""
o=h.gco()?h.gbd(0):g
if(s)o=A.nd(o,b)
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
i=m<q.length?B.a.Z(q,m+1):g
return A.eD(b,p,n,o,l,j,i)},
dU(a){return this.bf(A.cr(a))},
bf(a){if(a instanceof A.ba)return this.fo(this,a)
return this.dg().bf(a)},
fo(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=b.b
if(c>0)return b
s=b.c
if(s>0){r=a.b
if(r<=0)return b
q=r===4
if(q&&B.a.N(a.a,"file"))p=b.e!==b.f
else if(q&&B.a.N(a.a,"http"))p=!b.d1("80")
else p=!(r===5&&B.a.N(a.a,"https"))||!b.d1("443")
if(p){o=r+1
return new A.ba(B.a.n(a.a,0,o)+B.a.Z(b.a,c+1),r,s+o,b.d+o,b.e+o,b.f+o,b.r+o,a.w)}else return this.dg().bf(b)}n=b.e
c=b.f
if(n===c){s=b.r
if(c<s){r=a.f
o=r-c
return new A.ba(B.a.n(a.a,0,r)+B.a.Z(b.a,c),a.b,a.c,a.d,a.e,c+o,s+o,a.w)}c=b.a
if(s<c.length){r=a.r
return new A.ba(B.a.n(a.a,0,r)+B.a.Z(c,s),a.b,a.c,a.d,a.e,a.f,s+(r-s),a.w)}return a.hi()}s=b.a
if(B.a.R(s,"/",n)){m=a.e
l=A.pQ(this)
k=l>0?l:m
o=k-n
return new A.ba(B.a.n(a.a,0,k)+B.a.Z(s,n),a.b,a.c,a.d,m,c+o,b.r+o,a.w)}j=a.e
i=a.f
if(j===i&&a.c>0){while(B.a.R(s,"../",n))n+=3
o=j-n+1
return new A.ba(B.a.n(a.a,0,j)+"/"+B.a.Z(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)}h=a.a
l=A.pQ(this)
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
return new A.ba(B.a.n(h,0,i)+d+B.a.Z(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)},
gK(a){var s=this.x
return s==null?this.x=B.a.gK(this.a):s},
a0(a,b){if(b==null)return!1
if(this===b)return!0
return t.jJ.b(b)&&this.a===b.l(0)},
dg(){var s=this,r=null,q=s.gaU(),p=s.gcC(),o=s.c>0?s.gbz(0):r,n=s.gco()?s.gbd(0):r,m=s.a,l=s.f,k=B.a.n(m,s.e,l),j=s.r
l=l<j?s.gaO(0):r
return A.eD(q,p,o,n,k,l,j<m.length?s.gbx():r)},
l(a){return this.a},
$ih_:1}
A.he.prototype={}
A.q.prototype={$iq:1}
A.eO.prototype={
gj(a){return a.length}}
A.cJ.prototype={
sfW(a,b){a.href=b},
l(a){var s=String(a)
s.toString
return s},
$icJ:1}
A.eP.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.cK.prototype={$icK:1}
A.bP.prototype={$ibP:1}
A.cb.prototype={$icb:1}
A.bQ.prototype={$ibQ:1}
A.bp.prototype={
gj(a){return a.length}}
A.f3.prototype={
gj(a){return a.length}}
A.Y.prototype={$iY:1}
A.cd.prototype={
bQ(a,b){var s=$.qO(),r=s[b]
if(typeof r=="string")return r
r=this.fs(a,b)
s[b]=r
return r},
fs(a,b){var s,r=b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()})
r.toString
r=r in a
r.toString
if(r)return b
s=$.qR()+b
r=s in a
r.toString
if(r)return s
return b},
c9(a,b,c,d){a.setProperty(b,c,d)},
gj(a){var s=a.length
s.toString
return s}}
A.kJ.prototype={}
A.aH.prototype={}
A.be.prototype={}
A.f4.prototype={
gj(a){return a.length}}
A.f5.prototype={
gj(a){return a.length}}
A.f6.prototype={
gj(a){return a.length},
h(a,b){var s=a[A.L(b)]
s.toString
return s}}
A.dp.prototype={}
A.ce.prototype={}
A.f7.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.dq.prototype={
fN(a,b){var s=a.createHTMLDocument(b)
s.toString
return s}}
A.dr.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.mx.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.ds.prototype={
l(a){var s,r=a.left
r.toString
s=a.top
s.toString
return"Rectangle ("+A.d(r)+", "+A.d(s)+") "+A.d(this.gaR(a))+" x "+A.d(this.gaM(a))},
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
if(r===q){s=J.J(b)
s=this.gaR(a)===s.gaR(b)&&this.gaM(a)===s.gaM(b)}}}return s},
gK(a){var s,r=a.left
r.toString
s=a.top
s.toString
return A.of(r,s,this.gaR(a),this.gaM(a))},
gd0(a){return a.height},
gaM(a){var s=this.gd0(a)
s.toString
return s},
gdm(a){return a.width},
gaR(a){var s=this.gdm(a)
s.toString
return s},
$ibj:1}
A.f8.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){A.x(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.f9.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.h8.prototype={
A(a,b){return J.o0(this.b,b)},
gE(a){return this.a.firstElementChild==null},
gj(a){return this.b.length},
h(a,b){var s
A.L(b)
s=this.b
if(!(b>=0&&b<s.length))return A.e(s,b)
return t.h.a(s[b])},
k(a,b,c){var s
t.h.a(c)
s=this.b
if(!(b>=0&&b<s.length))return A.e(s,b)
this.a.replaceChild(c,s[b]).toString},
gB(a){var s=this.aw(this)
return new J.bd(s,s.length,A.E(s).i("bd<1>"))},
X(a){J.ip(this.a)},
gD(a){return A.tv(this.a)}}
A.bm.prototype={
gj(a){return this.a.length},
h(a,b){var s
A.L(b)
s=this.a
if(!(b>=0&&b<s.length))return A.e(s,b)
return this.$ti.c.a(s[b])},
k(a,b,c){this.$ti.c.a(c)
throw A.b(A.P("Cannot modify list"))},
gD(a){return this.$ti.c.a(B.aq.gD(this.a))}}
A.D.prototype={
gfF(a){return new A.ee(a)},
gbt(a){var s=a.children
s.toString
return new A.h8(a,s)},
gaq(a){return new A.hj(a)},
l(a){var s=a.localName
s.toString
return s},
a7(a,b,c,d){var s,r,q,p
if(c==null){s=$.p8
if(s==null){s=A.B([],t.lN)
r=new A.dR(s)
B.b.m(s,A.pK(null))
B.b.m(s,A.pT())
$.p8=r
d=r}else d=s
s=$.p7
if(s==null){d.toString
s=new A.eF(d)
$.p7=s
c=s}else{d.toString
s.a=d
c=s}}if($.bS==null){s=document
r=s.implementation
r.toString
r=B.a6.fN(r,"")
$.bS=r
r=r.createRange()
r.toString
$.o5=r
r=$.bS.createElement("base")
t.az.a(r)
s=s.baseURI
s.toString
r.href=s
$.bS.head.appendChild(r).toString}s=$.bS
if(s.body==null){r=s.createElement("body")
B.I.sfH(s,t.hp.a(r))}s=$.bS
if(t.hp.b(a)){s=s.body
s.toString
q=s}else{s.toString
r=a.tagName
r.toString
q=s.createElement(r)
$.bS.body.appendChild(q).toString}s="createContextualFragment" in window.Range.prototype
s.toString
if(s){s=a.tagName
s.toString
s=!B.b.A(B.al,s)}else s=!1
if(s){$.o5.selectNodeContents(q)
s=$.o5
s=s.createContextualFragment(b)
s.toString
p=s}else{J.rD(q,b)
s=$.bS.createDocumentFragment()
s.toString
while(r=q.firstChild,r!=null)s.appendChild(r).toString
p=s}if(q!==$.bS.body)J.it(q)
c.cI(p)
document.adoptNode(p).toString
return p},
fM(a,b,c){return this.a7(a,b,c,null)},
sU(a,b){this.bM(a,b)},
bM(a,b){this.sP(a,null)
a.appendChild(this.a7(a,b,null,null)).toString},
shq(a,b){a.title=b},
dA(a){return a.focus()},
sf3(a,b){a.innerHTML=b},
fa(a,b){var s=a.querySelectorAll(b)
s.toString
return s},
gdL(a){return new A.aX(a,"change",!1,t.E)},
gaN(a){return new A.aX(a,"click",!1,t.C)},
gdM(a){return new A.aX(a,"input",!1,t.E)},
gdN(a){return new A.aX(a,"keydown",!1,t.kN)},
$iD:1}
A.lK.prototype={
$1(a){return t.h.b(t.F.a(a))},
$S:23}
A.o.prototype={
f1(a,b,c,d){return a.initEvent(b,!0,!0)},
$io:1}
A.du.prototype={$idu:1}
A.f.prototype={
br(a,b,c,d){t.B.a(c)
if(c!=null)this.eL(a,b,c,d)},
cc(a,b,c){return this.br(a,b,c,null)},
eL(a,b,c,d){return a.addEventListener(b,A.bK(t.B.a(c),1),d)},
fc(a,b,c,d){return a.removeEventListener(b,A.bK(t.B.a(c),1),!1)},
$if:1}
A.aM.prototype={$iaM:1}
A.dw.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.et.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.dx.prototype={
ghn(a){var s=a.result
if(t.lo.b(s))return A.pk(s,0,null)
return s},
hf(a,b){return a.readAsDataURL(b)}}
A.fb.prototype={
gj(a){return a.length}}
A.cg.prototype={
gj(a){return a.length},
$icg:1}
A.aN.prototype={$iaN:1}
A.dy.prototype={}
A.fd.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.bT.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.F.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1,
$ibT:1}
A.dz.prototype={
sfH(a,b){a.body=b}}
A.bz.prototype={
hc(a,b,c){return a.open(b,c)},
el(a,b){return a.send(b)},
cK(a,b,c){return a.setRequestHeader(A.x(b),A.x(c))},
$ibz:1}
A.ci.prototype={}
A.cN.prototype={$icN:1}
A.dA.prototype={
sfB(a,b){a.alt=b},
scO(a,b){a.src=b}}
A.bU.prototype={
sdu(a,b){a.checked=b},
scB(a,b){a.type=b},
sH(a,b){a.value=b},
$ibU:1,
$ip1:1,
$icM:1}
A.bB.prototype={$ibB:1}
A.cT.prototype={
l(a){var s=String(a)
s.toString
return s},
$icT:1}
A.fp.prototype={
gj(a){return a.length}}
A.fq.prototype={
br(a,b,c,d){t.B.a(c)
if(b==="message")a.start()
this.eq(a,b,c,!1)}}
A.fr.prototype={
M(a,b){return A.bc(a.get(b))!=null},
h(a,b){return A.bc(a.get(A.x(b)))},
q(a,b){var s,r,q
t.v.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.bc(r.value[1]))}},
gI(a){var s=A.B([],t.s)
this.q(a,new A.m2(s))
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
k(a,b,c){throw A.b(A.P("Not supported"))},
C(a,b){throw A.b(A.P("Not supported"))},
$it:1}
A.m2.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:6}
A.fs.prototype={
M(a,b){return A.bc(a.get(b))!=null},
h(a,b){return A.bc(a.get(A.x(b)))},
q(a,b){var s,r,q
t.v.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.bc(r.value[1]))}},
gI(a){var s=A.B([],t.s)
this.q(a,new A.m3(s))
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
k(a,b,c){throw A.b(A.P("Not supported"))},
C(a,b){throw A.b(A.P("Not supported"))},
$it:1}
A.m3.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:6}
A.aP.prototype={$iaP:1}
A.ft.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.ib.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.az.prototype={$iaz:1}
A.aC.prototype={
gD(a){var s=this.a.firstChild
if(s==null)throw A.b(A.O("No elements"))
return s},
gaH(a){var s=this.a,r=s.childNodes.length
if(r===0)throw A.b(A.O("No elements"))
if(r>1)throw A.b(A.O("More than one element"))
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
gB(a){var s=this.a.childNodes
return new A.cf(s,s.length,A.ax(s).i("cf<z.E>"))},
gj(a){return this.a.childNodes.length},
h(a,b){var s
A.L(b)
s=this.a.childNodes
if(!(b>=0&&b<s.length))return A.e(s,b)
return s[b]}}
A.v.prototype={
dP(a){var s=a.parentNode
if(s!=null)s.removeChild(a).toString},
dT(a,b){var s,r,q
try{r=a.parentNode
r.toString
s=r
J.ri(s,b,a)}catch(q){}return a},
eR(a){var s
while(s=a.firstChild,s!=null)a.removeChild(s).toString},
l(a){var s=a.nodeValue
return s==null?this.er(a):s},
sP(a,b){a.textContent=b},
fE(a,b){var s=a.appendChild(b)
s.toString
return s},
fK(a,b){var s=a.cloneNode(!0)
s.toString
return s},
A(a,b){var s=a.contains(b)
s.toString
return s},
fe(a,b,c){var s=a.replaceChild(b,c)
s.toString
return s},
$iv:1}
A.cV.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.F.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.bC.prototype={$ibC:1}
A.dT.prototype={}
A.aQ.prototype={
gj(a){return a.length},
$iaQ:1}
A.fG.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.d8.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.b8.prototype={$ib8:1}
A.fI.prototype={
M(a,b){return A.bc(a.get(b))!=null},
h(a,b){return A.bc(a.get(A.x(b)))},
q(a,b){var s,r,q
t.v.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.bc(r.value[1]))}},
gI(a){var s=A.B([],t.s)
this.q(a,new A.md(s))
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
k(a,b,c){throw A.b(A.P("Not supported"))},
C(a,b){throw A.b(A.P("Not supported"))},
$it:1}
A.md.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:6}
A.bY.prototype={
gj(a){return a.length},
sH(a,b){a.value=b},
$ibY:1}
A.aS.prototype={$iaS:1}
A.fK.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.ls.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.dX.prototype={}
A.aT.prototype={$iaT:1}
A.fL.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.cA.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.aU.prototype={
gj(a){return a.length},
$iaU:1}
A.dZ.prototype={
M(a,b){return a.getItem(b)!=null},
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
gI(a){var s=A.B([],t.s)
this.q(a,new A.mf(s))
return s},
gj(a){var s=a.length
s.toString
return s},
gE(a){return a.key(0)==null},
gT(a){return a.key(0)!=null},
$it:1}
A.mf.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:7}
A.aA.prototype={$iaA:1}
A.e1.prototype={
a7(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bO(a,b,c,d)
s=A.rT("<table>"+b+"</table>",c,d)
r=document.createDocumentFragment()
r.toString
new A.aC(r).S(0,new A.aC(s))
return r}}
A.fO.prototype={
a7(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bO(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.aC(s).S(0,new A.aC(new A.aC(new A.aC(B.R.a7(r,b,c,d)).gaH(0)).gaH(0)))
return s}}
A.fP.prototype={
a7(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bO(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.aC(s).S(0,new A.aC(new A.aC(B.R.a7(r,b,c,d)).gaH(0)))
return s}}
A.d1.prototype={
bM(a,b){var s,r
this.sP(a,null)
s=a.content
s.toString
J.ip(s)
r=this.a7(a,b,null,null)
a.content.appendChild(r).toString},
$id1:1}
A.cq.prototype={
sH(a,b){a.value=b},
$icq:1}
A.aV.prototype={$iaV:1}
A.aB.prototype={$iaB:1}
A.fR.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.gJ.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.fS.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.dQ.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.fT.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.aW.prototype={$iaW:1}
A.fV.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.ki.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.fW.prototype={
gj(a){return a.length}}
A.bs.prototype={}
A.h1.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.h3.prototype={
gj(a){return a.length}}
A.c2.prototype={$ic2:1,$imx:1}
A.bt.prototype={$ibt:1}
A.d4.prototype={$id4:1}
A.ha.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.d5.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.ed.prototype={
l(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return"Rectangle ("+A.d(p)+", "+A.d(s)+") "+A.d(r)+" x "+A.d(q)},
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
q=J.J(b)
if(r===q.gaR(b)){s=a.height
s.toString
q=s===q.gaM(b)
s=q}}}}return s},
gK(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return A.of(p,s,r,q)},
gd0(a){return a.height},
gaM(a){var s=a.height
s.toString
return s},
gdm(a){return a.width},
gaR(a){var s=a.width
s.toString
return s}}
A.ho.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
return a[b]},
k(a,b,c){t.ef.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){if(a.length>0)return a[0]
throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.el.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.F.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.hP.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s,r
A.L(b)
s=a.length
r=b>>>0!==b||b>=s
r.toString
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.hH.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
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
if(r)throw A.b(A.a8(b,s,a,null,null))
s=a[b]
s.toString
return s},
k(a,b,c){t.lv.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s
if(a.length>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){if(!(b>=0&&b<a.length))return A.e(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.h6.prototype={
q(a,b){var s,r,q,p,o,n
t.bm.a(b)
for(s=this.gI(0),r=s.length,q=this.a,p=0;p<s.length;s.length===r||(0,A.as)(s),++p){o=s[p]
n=q.getAttribute(o)
b.$2(o,n==null?A.x(n):n)}},
gI(a){var s,r,q,p,o,n,m=this.a.attributes
m.toString
s=A.B([],t.s)
for(r=m.length,q=t.nD,p=0;p<r;++p){if(!(p<m.length))return A.e(m,p)
o=q.a(m[p])
if(o.namespaceURI==null){n=o.name
n.toString
B.b.m(s,n)}}return s},
gE(a){return this.gI(0).length===0},
gT(a){return this.gI(0).length!==0}}
A.ee.prototype={
M(a,b){var s=this.a.hasAttribute(b)
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
gj(a){return this.gI(0).length}}
A.hd.prototype={
M(a,b){var s=this.a.a.hasAttribute("data-"+this.b5(b))
s.toString
return s},
h(a,b){return this.a.a.getAttribute("data-"+this.b5(A.x(b)))},
k(a,b,c){this.a.a.setAttribute("data-"+this.b5(b),c)},
C(a,b){var s="data-"+this.b5(b),r=this.a.a,q=r.getAttribute(s)
r.removeAttribute(s)
return q},
q(a,b){this.a.q(0,new A.mD(this,t.bm.a(b)))},
gI(a){var s=A.B([],t.s)
this.a.q(0,new A.mE(this,s))
return s},
gj(a){return this.gI(0).length},
gE(a){return this.gI(0).length===0},
gT(a){return this.gI(0).length!==0},
df(a){var s,r,q=A.B(a.split("-"),t.s)
for(s=1;s<q.length;++s){r=q[s]
if(r.length>0)B.b.k(q,s,r[0].toUpperCase()+B.a.Z(r,1))}return B.b.a_(q,"")},
b5(a){var s,r,q,p,o
for(s=a.length,r=0,q="";r<s;++r){p=a[r]
o=p.toLowerCase()
q=(p!==o&&r>0?q+"-":q)+o}return q.charCodeAt(0)==0?q:q}}
A.mD.prototype={
$2(a,b){if(B.a.N(a,"data-"))this.b.$2(this.a.df(B.a.Z(a,5)),b)},
$S:7}
A.mE.prototype={
$2(a,b){if(B.a.N(a,"data-"))B.b.m(this.b,this.a.df(B.a.Z(a,5)))},
$S:7}
A.hj.prototype={
a8(){var s,r,q,p,o=A.cm(t.N)
for(s=this.a.className.split(" "),r=s.length,q=0;q<r;++q){p=B.a.u(s[q])
if(p.length!==0)o.m(0,p)}return o},
cD(a){this.a.className=t.i.a(a).a_(0," ")},
gj(a){var s=this.a.classList.length
s.toString
return s},
gE(a){var s=this.a.classList.length
s.toString
return s===0},
gT(a){var s=this.a.classList.length
s.toString
return s!==0},
A(a,b){var s=this.a.classList.contains(b)
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
bE(a){A.tx(this.a,a)}}
A.o6.prototype={}
A.ct.prototype={
bC(a,b,c,d){var s=A.C(this)
s.i("~(1)?").a(a)
t.jE.a(c)
return A.A(this.a,this.b,a,!1,s.c)}}
A.aX.prototype={}
A.ef.prototype={
a3(a){var s=this
if(s.b==null)return $.nZ()
s.dj()
s.d=s.b=null
return $.nZ()},
cs(a){var s,r=this
r.$ti.i("~(1)?").a(a)
if(r.b==null)throw A.b(A.O("Subscription has been canceled."))
r.dj()
s=A.qx(new A.mG(a),t.A)
r.d=s
r.dh()},
dh(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.rj(s,this.c,r,!1)}},
dj(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.rh(s,this.c,t.B.a(r),!1)}},
$ibr:1}
A.mF.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:3}
A.mG.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:3}
A.on.prototype={}
A.cv.prototype={
eB(a){var s
if($.hp.a===0){for(s=0;s<262;++s)$.hp.k(0,B.am[s],A.ve())
for(s=0;s<12;++s)$.hp.k(0,B.x[s],A.vf())}},
aL(a){return $.r6().A(0,A.dt(a))},
ao(a,b,c){var s=$.hp.h(0,A.dt(a)+"::"+b)
if(s==null)s=$.hp.h(0,"*::"+b)
if(s==null)return!1
return A.nn(s.$4(a,b,c,this))},
$ibi:1}
A.z.prototype={
gB(a){return new A.cf(a,this.gj(a),A.ax(a).i("cf<z.E>"))}}
A.dR.prototype={
aL(a){return B.b.a6(this.a,new A.m6(a))},
ao(a,b,c){return B.b.a6(this.a,new A.m5(a,b,c))},
$ibi:1}
A.m6.prototype={
$1(a){return t.hU.a(a).aL(this.a)},
$S:24}
A.m5.prototype={
$1(a){return t.hU.a(a).ao(this.a,this.b,this.c)},
$S:24}
A.er.prototype={
eD(a,b,c,d){var s,r,q
this.a.S(0,c)
s=b.bJ(0,new A.n5())
r=b.bJ(0,new A.n6())
this.b.S(0,s)
q=this.c
q.S(0,B.ak)
q.S(0,r)},
aL(a){return this.a.A(0,A.dt(a))},
ao(a,b,c){var s,r=this,q=A.dt(a),p=r.c,o=q+"::"+b
if(p.A(0,o))return r.d.fA(c)
else{s="*::"+b
if(p.A(0,s))return r.d.fA(c)
else{p=r.b
if(p.A(0,o))return!0
else if(p.A(0,s))return!0
else if(p.A(0,q+"::*"))return!0
else if(p.A(0,"*::*"))return!0}}return!1},
$ibi:1}
A.n5.prototype={
$1(a){return!B.b.A(B.x,A.x(a))},
$S:10}
A.n6.prototype={
$1(a){return B.b.A(B.x,A.x(a))},
$S:10}
A.hX.prototype={
ao(a,b,c){if(this.ez(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.A(0,b)
return!1}}
A.n7.prototype={
$1(a){return"TEMPLATE::"+A.x(a)},
$S:11}
A.hW.prototype={
aL(a){var s
if(t.nZ.b(a))return!1
s=t.bC.b(a)
if(s&&A.dt(a)==="foreignObject")return!1
if(s)return!0
return!1},
ao(a,b,c){if(b==="is"||B.a.N(b,"on"))return!1
return this.aL(a)},
$ibi:1}
A.cf.prototype={
p(){var s=this,r=s.c+1,q=s.b
if(r<q){s.d=J.k(s.a,r)
s.c=r
return!0}s.d=null
s.c=q
return!1},
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
$iab:1}
A.hc.prototype={$ii:1,$if:1,$imx:1}
A.hM.prototype={$itj:1}
A.eF.prototype={
cI(a){var s,r=new A.nm(this)
do{s=this.b
r.$2(a,null)}while(s!==this.b)},
b2(a,b){++this.b
if(b==null||b!==a.parentNode)J.it(a)
else b.removeChild(a).toString},
fj(a,b){var s,r,q,p,o,n,m,l=!0,k=null,j=null
try{k=J.ro(a)
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
this.fi(a,b,l,r,q,t.f.a(k),A.ao(j))}catch(n){if(A.an(n) instanceof A.b7)throw n
else{this.b2(a,b)
window.toString
p=A.d(r)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn("Removing corrupted element "+p)}}},
fi(a,b,c,d,e,f,g){var s,r,q,p,o,n,m,l=this
if(c){l.b2(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing element due to corrupted attributes on <"+d+">")
return}if(!l.a.aL(a)){l.b2(a,b)
window.toString
s=A.d(b)
r=typeof console!="undefined"
r.toString
if(r)window.console.warn("Removing disallowed element <"+e+"> from "+s)
return}if(g!=null)if(!l.a.ao(a,"is",g)){l.b2(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing disallowed type extension <"+e+' is="'+g+'">')
return}s=f.gI(0)
q=A.B(s.slice(0),A.E(s))
for(p=f.gI(0).length-1,s=f.a,r="Removing disallowed attribute <"+e+" ";p>=0;--p){if(!(p<q.length))return A.e(q,p)
o=q[p]
n=l.a
m=J.rG(o)
A.x(o)
if(!n.ao(a,m,A.x(s.getAttribute(o)))){window.toString
n=s.getAttribute(o)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn(r+o+'="'+A.d(n)+'">')
s.removeAttribute(o)}}if(t.fD.b(a)){s=a.content
s.toString
l.cI(s)}},
ek(a,b){var s=a.nodeType
s.toString
switch(s){case 1:this.fj(a,b)
break
case 8:case 11:case 3:case 4:break
default:this.b2(a,b)}},
$it6:1}
A.nm.prototype={
$2(a,b){var s,r,q,p,o,n=this.a
n.ek(a,b)
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
$S:76}
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
A.f2.prototype={
ca(a){var s=$.qN()
if(s.b.test(a))return a
throw A.b(A.kD(a,"value","Not a valid class token"))},
l(a){return this.a8().a_(0," ")},
gB(a){var s=this.a8()
return A.tC(s,s.r,A.C(s).c)},
au(a,b,c){var s,r
c.i("0(c)").a(b)
s=this.a8()
r=A.C(s)
return new A.bx(s,r.J(c).i("1(av.E)").a(b),r.i("@<av.E>").J(c).i("bx<1,2>"))},
gE(a){return this.a8().a===0},
gT(a){return this.a8().a!==0},
gj(a){return this.a8().a},
A(a,b){this.ca(b)
return this.a8().A(0,b)},
m(a,b){var s
A.x(b)
this.ca(b)
s=this.dH(0,new A.kH(b))
return A.nn(s==null?!1:s)},
C(a,b){var s,r
if(typeof b!="string")return!1
this.ca(b)
s=this.a8()
r=s.C(0,b)
this.cD(s)
return r},
bE(a){this.dH(0,new A.kI(a))},
v(a,b){return this.a8().v(0,b)},
dH(a,b){var s,r
t.gA.a(b)
s=this.a8()
r=b.$1(s)
this.cD(s)
return r}}
A.kH.prototype={
$1(a){return t.i.a(a).m(0,this.a)},
$S:52}
A.kI.prototype={
$1(a){return t.i.a(a).bE(this.a)},
$S:55}
A.fc.prototype={
gbl(){var s=this.b,r=A.C(s)
return new A.aJ(new A.I(s,r.i("F(m.E)").a(new A.lL()),r.i("I<m.E>")),r.i("D(m.E)").a(new A.lM()),r.i("aJ<m.E,D>"))},
k(a,b,c){var s
t.h.a(c)
s=this.gbl()
J.rB(s.b.$1(J.eN(s.a,b)),c)},
A(a,b){return!1},
X(a){J.ip(this.b.a)},
gj(a){return J.aj(this.gbl().a)},
h(a,b){var s
A.L(b)
s=this.gbl()
return s.b.$1(J.eN(s.a,b))},
gB(a){var s=A.aO(this.gbl(),!1,t.h)
return new J.bd(s,s.length,A.E(s).i("bd<1>"))}}
A.lL.prototype={
$1(a){return t.h.b(t.F.a(a))},
$S:23}
A.lM.prototype={
$1(a){return t.h.a(t.F.a(a))},
$S:57}
A.cS.prototype={$icS:1}
A.lW.prototype={
$1(a){var s,r,q,p,o=this.a
if(o.M(0,a))return o.h(0,a)
if(t.f.b(a)){s={}
o.k(0,a,s)
for(o=J.J(a),r=J.aF(o.gI(a));r.p();){q=r.gt(r)
s[q]=this.$1(o.h(a,q))}return s}else if(t.R.b(a)){p=[]
o.k(0,a,p)
B.b.S(p,J.ca(a,this,t.z))
return p}else return A.nu(a)},
$S:69}
A.hL.prototype={
e0(a){if(a instanceof A.aZ)return a.fh()
return null}}
A.nv.prototype={
$1(a){var s
t.Z.a(a)
s=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(A.ub,a,!1)
A.oz(s,$.io(),a)
return s},
$S:13}
A.nw.prototype={
$1(a){return new this.a(a)},
$S:13}
A.nB.prototype={
$1(a){var s=a==null?A.b4(a):a
$.nY()
return new A.cR(s)},
$S:70}
A.nC.prototype={
$1(a){var s=a==null?A.b4(a):a
$.nY()
return new A.ck(s,t.gq)},
$S:71}
A.nD.prototype={
$1(a){var s=a==null?A.b4(a):a
$.nY()
return new A.aZ(s)},
$S:74}
A.aZ.prototype={
h(a,b){if(typeof b!="string"&&typeof b!="number")throw A.b(A.aY("property is not a String or num",null))
return A.oy(this.a[b])},
k(a,b,c){if(typeof b!="string"&&typeof b!="number")throw A.b(A.aY("property is not a String or num",null))
this.a[b]=A.nu(c)},
a0(a,b){if(b==null)return!1
return b instanceof A.aZ&&this.a===b.a},
ba(a){return a in this.a},
ap(a,b){var s,r=this.a
if(b==null)s=null
else{s=A.E(b)
s=A.aO(new A.a1(b,s.i("@(1)").a(A.vn()),s.i("a1<1,@>")),!0,t.z)}return A.oy(r[a].apply(r,s))},
l(a){var s,r
try{s=String(this.a)
return s}catch(r){s=this.ex(0)
return s}},
fh(){var s=this.c7(),r=s!=null&&s.length>0?" ("+s+")":""
return"Instance of '"+A.dV(this)+"'"+r},
c7(){return A.oN(this.a,!1,!1)},
gK(a){return 0}}
A.cR.prototype={
c7(){return A.oN(this.a,!1,!0)}}
A.ck.prototype={
cU(a){var s=a<0||a>=this.gj(0)
if(s)throw A.b(A.ah(a,0,this.gj(0),null,null))},
h(a,b){if(A.eI(b))this.cU(b)
return this.$ti.c.a(this.es(0,b))},
k(a,b,c){if(A.eI(b))this.cU(b)
this.ey(0,b,c)},
gj(a){var s=this.a.length
if(typeof s==="number"&&s>>>0===s)return s
throw A.b(A.O("Bad JsArray length"))},
c7(){return A.oN(this.a,!0,!1)},
$in:1,
$ih:1,
$ip:1}
A.d8.prototype={
k(a,b,c){return this.eu(0,b,c)}}
A.m7.prototype={
l(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.nL.prototype={
$1(a){var s,r,q,p,o
if(A.qo(a))return a
s=this.a
if(s.M(0,a))return s.h(0,a)
if(t.f.b(a)){r={}
s.k(0,a,r)
for(s=J.J(a),q=J.aF(s.gI(a));q.p();){p=q.gt(q)
r[p]=this.$1(s.h(a,p))}return r}else if(t.R.b(a)){o=[]
s.k(0,a,o)
B.b.S(o,J.ca(a,this,t.z))
return o}else return a},
$S:25}
A.nS.prototype={
$1(a){return this.a.b7(0,this.b.i("0/?").a(a))},
$S:16}
A.nT.prototype={
$1(a){if(a==null)return this.a.bu(new A.m7(a===undefined))
return this.a.bu(a)},
$S:16}
A.mW.prototype={
eC(){var s=self.crypto
if(s!=null)if(s.getRandomValues!=null)return
throw A.b(A.P("No source of cryptographically secure random numbers available."))},
ha(a){var s,r,q,p,o,n,m,l
if(a<=0||a>4294967296)throw A.b(A.te("max must be in range 0 < max \u2264 2^32, was "+a))
if(a>255)if(a>65535)s=a>16777215?4:3
else s=2
else s=1
r=this.a
r.$flags&2&&A.al(r,11)
r.setUint32(0,0,!1)
q=4-s
p=A.L(Math.pow(256,s))
for(o=a-1,n=(a&o)===0;;){crypto.getRandomValues(J.rl(B.ap.gfI(r),q,s))
m=r.getUint32(0,!1)
if(n)return(m&o)>>>0
l=m%a
if(m-l+a<p)return l}}}
A.b_.prototype={$ib_:1}
A.fn.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s
A.L(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a8(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){t.kT.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s=a.length
s.toString
if(s>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){return this.h(a,b)},
$in:1,
$ih:1,
$ip:1}
A.b2.prototype={$ib2:1}
A.fC.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s
A.L(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a8(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){t.ai.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s=a.length
s.toString
if(s>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){return this.h(a,b)},
$in:1,
$ih:1,
$ip:1}
A.fH.prototype={
gj(a){return a.length}}
A.d_.prototype={$id_:1}
A.fN.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s
A.L(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a8(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){A.x(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s=a.length
s.toString
if(s>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){return this.h(a,b)},
$in:1,
$ih:1,
$ip:1}
A.eS.prototype={
a8(){var s,r,q,p,o=this.a.getAttribute("class"),n=A.cm(t.N)
if(o==null)return n
for(s=o.split(" "),r=s.length,q=0;q<r;++q){p=B.a.u(s[q])
if(p.length!==0)n.m(0,p)}return n},
cD(a){this.a.setAttribute("class",a.a_(0," "))}}
A.u.prototype={
gaq(a){return new A.eS(a)},
gbt(a){return new A.fc(a,new A.aC(a))},
sU(a,b){this.bM(a,b)},
a7(a,b,c,d){var s,r,q,p=A.B([],t.lN)
B.b.m(p,A.pK(null))
B.b.m(p,A.pT())
B.b.m(p,new A.hW())
c=new A.eF(new A.dR(p))
p=document
s=p.body
s.toString
r=B.A.fM(s,'<svg version="1.1">'+b+"</svg>",c)
p=p.createDocumentFragment()
p.toString
q=new A.aC(r).gaH(0)
while(s=q.firstChild,s!=null)p.appendChild(s).toString
return p},
dA(a){return a.focus()},
gdL(a){return new A.aX(a,"change",!1,t.E)},
gaN(a){return new A.aX(a,"click",!1,t.C)},
gdM(a){return new A.aX(a,"input",!1,t.E)},
gdN(a){return new A.aX(a,"keydown",!1,t.kN)},
$iu:1}
A.b3.prototype={$ib3:1}
A.fX.prototype={
gj(a){var s=a.length
s.toString
return s},
h(a,b){var s
A.L(b)
s=a.length
s.toString
s=b>>>0!==b||b>=s
s.toString
if(s)throw A.b(A.a8(b,this.gj(a),a,null,null))
s=a.getItem(b)
s.toString
return s},
k(a,b,c){t.hk.a(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s=a.length
s.toString
if(s>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
v(a,b){return this.h(a,b)},
$in:1,
$ih:1,
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
M(a,b){return A.bc(a.get(b))!=null},
h(a,b){return A.bc(a.get(A.x(b)))},
q(a,b){var s,r,q
t.v.a(b)
s=a.entries()
for(;;){r=s.next()
q=r.done
q.toString
if(q)return
q=r.value[0]
q.toString
b.$2(q,A.bc(r.value[1]))}},
gI(a){var s=A.B([],t.s)
this.q(a,new A.kE(s))
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
k(a,b,c){throw A.b(A.P("Not supported"))},
C(a,b){throw A.b(A.P("Not supported"))},
$it:1}
A.kE.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:6}
A.eV.prototype={
gj(a){return a.length}}
A.bO.prototype={}
A.fD.prototype={
gj(a){return a.length}}
A.h7.prototype={}
A.nM.prototype={
$1(a){t.A.a(a)
new A.iu().ae()},
$S:19}
A.iu.prototype={
ae(){var s=0,r=A.T(t.H),q=this,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
var $async$ae=A.U(function(a2,a3){if(a2===1)return A.Q(a3,r)
for(;;)switch(s){case 0:a=document
a0=a.getElementById("view-login")
a0.toString
q.ch=a0
a0=a.getElementById("view-dashboard")
a0.toString
q.CW=a0
a0=a.getElementById("view-directory")
a0.toString
q.cx=a0
a0=a.getElementById("view-assets")
a0.toString
q.cy=a0
a0=a.getElementById("view-profile")
a0.toString
q.db=a0
a0=a.getElementById("view-billing")
a0.toString
q.dx=a0
a0=a.getElementById("view-resident-home")
a0.toString
q.dy=a0
a0=a.getElementById("view-resident-ledger")
a0.toString
q.fr=a0
a0=a.getElementById("view-resident-support")
a0.toString
q.fx=a0
a0=a.getElementById("app-bottom-nav")
a0.toString
q.fy=a0
a0=a.getElementById("resident-bottom-nav")
a0.toString
q.go=a0
q.id=a.getElementById("btn-floating-role-switch")
a.getElementById("floating-role-switch-text")
a0=q.CW
o=q.cx
n=a.getElementById("view-worker-resident-details")
n.toString
m=q.cy
l=q.db
k=q.dx
j=a.getElementById("view-transactions")
j.toString
i=a.getElementById("view-announcements")
i.toString
h=a.getElementById("view-resident-profile")
h.toString
g=t.N
q.k2=t.dW.a(A.a3(["view-dashboard",a0,"view-directory",o,"view-worker-resident-details",n,"view-assets",m,"view-profile",l,"view-billing",k,"view-transactions",j,"view-announcements",i,"view-resident-profile",h,"view-resident-home",q.dy,"view-resident-ledger",q.fr,"view-resident-support",q.fx],g,t.h))
h=t.d.a(window.location).href
h.toString
f=A.cr(h).gai().h(0,"role")
e=a.getElementById("web-portal-title")
a0=f==="resident"
if(a0){if(e!=null)J.r(e,"Resident Portal")
d=t.G.a(a.getElementById("employee-id"))
if(d!=null)d.placeholder="Resident ID, meter ID, contact or unique name"}else{if(e!=null)J.r(e,"Worker Portal")
d=t.G.a(a.getElementById("employee-id"))
if(d!=null)d.placeholder="Enter employee ID"}o=new A.jL()
o.$0()
A.ml(A.p6(0,10),new A.jE(o))
o=a.getElementById("btn-resident-profile-logout")
if(o!=null){o=J.aa(o)
n=o.$ti
A.A(o.a,o.b,n.i("~(1)?").a(new A.jF()),!1,n.c)}o=$.K()
o.shb(new A.jG(q))
n=o.cx
new A.d5(n,A.C(n).i("d5<1>")).h5(new A.jH(q))
s=2
return A.y(o.ae(),$async$ae)
case 2:q.dk(o.Y())
A.ml(B.ac,new A.jI(q))
A.ml(B.F,new A.jJ(q))
A.A(a,A.x(A.pa(a)),t.oV.a(new A.jK(q)),!1,t.A)
p=A.cF()?window.localStorage.getItem("waterhall_session"):null
c=A.cF()?window.localStorage.getItem("waterhall_resident_session"):null
if(a0)if(c!=null&&c.length!==0){q.cN(c)
q.aA()
q.bn("resident")}else q.b8()
else if(p!=null&&p.length!==0)try{a0=A.ak(t.f.a(B.c.L(0,p)),g,t.z)
q.a=a0
q.cL(a0)
q.aA()
q.bn("worker")}catch(a1){a0=window.localStorage
a0.toString
B.j.C(a0,"waterhall_session")
q.b8()}else q.b8()
q.fG()
q.h_()
if($.K().y==="Session expired. Please sign in again.")q.aj("Session expired. Please sign in again.",a.getElementById("login-error-msg"))
return A.R(null,r)}})
return A.S($async$ae,r)},
b0(){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i
var $async$b0=A.U(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:i=!0
if(!m.ay){j=document
j.toString
j=j.visibilityState||j.mozVisibilityState||j.msVisibilityState||j.webkitVisibilityState
j.toString
if(j==="visible")i=m.a==null&&m.d==null}if(i){s=1
break}m.ay=!0
l=window.localStorage.getItem("waterhall_jwt")
i=$.K()
k=i.at
p=3
s=6
return A.y(i.aP(m.d!=null?"resident":"worker"),$async$b0)
case 6:if(!J.j(l,window.localStorage.getItem("waterhall_jwt"))||!i.O()||J.j(k,i.at)){n=[1]
s=4
break}if(m.d!=null)m.cz()
else{i=m.b
if(i==="view-dashboard")m.bG()
else if(i==="view-directory")m.aQ()}if(m.b==="view-announcements")m.dQ()
n.push(5)
s=4
break
case 3:n=[2]
case 4:p=2
m.ay=!1
m.c4()
s=n.pop()
break
case 5:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$b0,r)},
dk(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c="btn-review-collections"
t.P.a(a)
s=document
r=s.getElementById("worker-sync-status-pill")
q=s.getElementById("worker-sync-status-text")
p=s.getElementById("db-offline-overlay")
o=s.getElementById("offline-banner-text")
n=J.w(a)
m=n.h(a,"status")
l=A.x(m==null?"online":m)
k=A.no(n.h(a,"pendingCount"))
if(k==null)k=0
m=A.qc(n.h(a,"isOnline"))
m=m===!1
j=J.j(n.h(a,"authenticated"),!0)
i=A.no(n.h(a,"reviewCount"))
if(i==null)i=0
h=r==null
if(!h&&q!=null){g=J.J(r)
g.gaq(r).bE(["online","offline","pending_sync","syncing","synced"])
g.gaq(r).m(0,l)
if(!j)J.r(q,"Sign in required")
else if(m)J.r(q,"Offline Mode")
else if(J.j(n.h(a,"isSyncing"),!0))J.r(q,"Syncing...")
else if(k>0){if(i>0)n=""+k+" Pending ("+i+" need review)"
else{g=""+k
n=n.h(a,"error")!=null?g+" Pending: retry needed":g+" Pending Sync"}J.r(q,n)}else J.r(q,"Connected")}if(p!=null){f=A.e5().gai().h(0,"role")==="resident"&&j&&m
n=p.style
n.toString
m=f?"flex":"none"
n.display=m
if(f)if(o!=null)J.r(o,"Offline Mode Active: Local SQLite storage enabled. Data will auto-sync when online.")}e=s.getElementById(c)
if(e==null)n=(h?null:r.parentElement)!=null
else n=!1
if(n){d=s.createElement("button")
d.id=c
B.k.sP(d,"Review pending operations")
s=t.C
A.A(d,"click",s.i("~(1)?").a(new A.j5(this)),!1,s.c)
r.parentElement.appendChild(d).toString
e=d}if(e!=null){s=e.style
s.toString
n=j&&i>0?"inline-block":"none"
s.display=n}},
d9(){var s,r,q,p,o,n,m,l,k,j,i,h,g="collection-review-modal",f="house_id",e="sync_error",d=$.K()
if(!d.O())return
s=document
r=s.getElementById(g)
if(r!=null)J.it(r)
q=s.createElement("div")
q.id=g
q.className="modal-overlay"
r=q.style
r.display="flex"
p=s.createElement("div")
p.className="offline-card"
r=p.style
r.maxHeight="80vh"
B.n.c9(r,B.n.bQ(r,"overflow-y"),"auto","")
r=s.createElement("h2")
r.toString
B.H.sP(r,"Pending operation review")
p.appendChild(r).toString
r=s.createElement("p")
r.toString
B.m.sP(r,"These records remain saved. Review rejected readings or payments with Admin, then retry. Record IDs are preserved.")
p.appendChild(r).toString
for(d=d.aS(),r=A.E(d),o=r.i("F(1)").a(new A.j1()),d=B.b.gB(d),r=new A.aw(d,o,r.i("aw<1>"));r.p();){o=d.gt(0)
n=s.createElement("p")
n.toString
m=J.w(o)
B.m.sP(n,A.d(m.h(o,f))+" | "+A.d(m.h(o,"amount_collected"))+" | "+A.d(m.h(o,"transaction_id"))+"\n"+A.d(m.h(o,e)))
p.appendChild(n).toString}for(d=$.K().ah(),r=A.E(d),o=r.i("F(1)").a(new A.j2()),d=B.b.gB(d),r=new A.aw(d,o,r.i("aw<1>")),o=t.f;r.p();){n=d.gt(0)
m=J.w(n)
l=o.a(m.h(n,"body"))
k=B.an.h(0,m.h(n,"endpoint"))
if(k==null)k="Saved operation"
j=s.createElement("p")
j.toString
i=J.w(l)
h=i.h(l,f)
i=h==null?i.h(l,"household_id"):h
B.m.sP(j,k+" | "+A.d(i==null?"":i)+" | "+A.d(m.h(n,"operation_id"))+"\n"+A.d(m.h(n,e)))
p.appendChild(j).toString}d=s.createElement("button")
d.toString
B.k.sP(d,"Retry pending operations")
r=t.C
o=r.i("~(1)?")
r=r.c
A.A(d,"click",o.a(new A.j3(this,d)),!1,r)
p.appendChild(d).toString
d=s.createElement("button")
d.toString
B.k.sP(d,"Close")
A.A(d,"click",o.a(new A.j4(q)),!1,r)
p.appendChild(d).toString
q.appendChild(p).toString
s.body.appendChild(q).toString},
fG(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=this,a5="click",a6="change"
a4.f2()
a4.eO()
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
if(j!=null){i=J.aa(j)
h=i.$ti
A.A(i.a,i.b,h.i("~(1)?").a(new A.j7(j)),!1,h.c)}if(q!=null){i=t.C
A.A(q,a5,i.i("~(1)?").a(new A.j8(a4,o,n,l,k,q)),!1,i.c)}g=r.a(s.getElementById("btn-logout"))
if(g!=null){i=t.C
A.A(g,a5,i.i("~(1)?").a(new A.j9(a4)),!1,i.c)}f=r.a(s.getElementById("btn-resident-logout"))
if(f!=null){i=t.C
A.A(f,a5,i.i("~(1)?").a(new A.jc(a4)),!1,i.c)}i=t.h
A.eL(i,i,"T","querySelectorAll")
i=s.querySelectorAll(".nav-tab")
i.toString
e=new A.bm(i,t.U)
e.q(e,new A.jd(a4))
d=p.a(s.getElementById("dir-search"))
c=m.a(s.getElementById("filter-purok"))
b=m.a(s.getElementById("filter-status"))
if(d!=null){p=t.E
A.A(d,"input",p.i("~(1)?").a(new A.je(a4)),!1,p.c)}if(c!=null){p=t.E
A.A(c,a6,p.i("~(1)?").a(new A.jf(a4)),!1,p.c)}if(b!=null){p=t.E
A.A(b,a6,p.i("~(1)?").a(new A.jg(a4)),!1,p.c)}a=s.getElementById("btn-close-modal")
if(a!=null){p=J.aa(a)
m=p.$ti
A.A(p.a,p.b,m.i("~(1)?").a(new A.jh(a4)),!1,m.c)}a0=s.getElementById("house-detail-modal")
if(a0!=null){p=J.aa(a0)
m=p.$ti
A.A(p.a,p.b,m.i("~(1)?").a(new A.ji(a0)),!1,m.c)}a1=t.aa.a(s.getElementById("modal-leak-toggle"))
if(a1!=null){p=t.E
A.A(a1,a6,p.i("~(1)?").a(new A.jj(a4,a1)),!1,p.c)}a2=r.a(s.getElementById("btn-submit-log"))
if(a2!=null){p=t.C
A.A(a2,a5,p.i("~(1)?").a(new A.ja(a4)),!1,p.c)}a3=r.a(s.getElementById("btn-broadcast-announcement"))
if(a3!=null){s=t.C
A.A(a3,a5,s.i("~(1)?").a(new A.jb(a4,a3)),!1,s.c)}a4.fZ()},
fZ(){var s,r,q,p,o,n,m,l,k,j,i,h=document,g=h.getElementById("web-modal-forgot-pw")
g.toString
s=t.h4.a(h.getElementById("web-recovery-form"))
r=t.k.a(h.getElementById("btn-web-recover-submit"))
q=h.getElementById("web-recover-error")
q.toString
p=h.getElementById("web-recover-success")
p.toString
o=t.g.a(h.getElementById("web-recover-role"))
n=t.q
m=n.a(h.getElementById("web-recover-username"))
l=n.a(h.getElementById("web-recover-contact"))
k=n.a(h.getElementById("web-recover-new-password"))
n=new A.jt(this,g,s,q,p)
j=h.getElementById("btn-web-forgot-password")
if(j!=null){j=J.aa(j)
i=j.$ti
A.A(j.a,j.b,i.i("~(1)?").a(new A.ju(this,o,g,m)),!1,i.c)}h=h.getElementById("btn-web-recover-cancel")
if(h!=null){h=J.aa(h)
j=h.$ti
A.A(h.a,h.b,j.i("~(1)?").a(new A.jv(n)),!1,j.c)}h=J.rt(g)
g=h.$ti
A.A(h.a,h.b,g.i("~(1)?").a(new A.jw(n)),!1,g.c)
g=t.E
A.A(s,"submit",g.i("~(1)?").a(new A.jx(this,q,p,s,r,o,m,l,k,n)),!1,g.c)},
aj(a,b){var s
if(b!=null){J.r(b,a)
s=b.style
s.display="block"}},
aA(){},
bn(a){var s="WaterHallPush",r=$.bu()
if(r.ba(s))r.h(0,s).ap("registerSubscription",A.B([a],t.s))},
b8(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b="none",a=document,a0=a.getElementById("announcement-history")
if(a0!=null)J.cH(a0).X(0)
for(a0=["resident-profile-name","resident-profile-account","resident-profile-avatar"],s=0;s<3;++s){r=a.getElementById(a0[s])
if(r!=null)J.r(r,"--")}a0=c.k2
a0===$&&A.ay()
new A.b0(a0,A.C(a0).i("b0<2>")).q(0,new A.jk())
a0=c.ch
a0===$&&A.ay()
J.c9(a0).m(0,"active")
a0=c.ch.style
a0.display="flex"
c.b="view-login"
a0=c.fy
a0===$&&A.ay()
a0=a0.style
a0.display=b
a0=c.go
a0===$&&A.ay()
a0=a0.style
a0.display=b
a0=c.id
a0===$&&A.ay()
if(a0!=null){a0=a0.style
a0.display=b}a0=t.G
q=a0.a(a.getElementById("employee-id"))
p=a0.a(a.getElementById("login-password"))
o=a.getElementById("login-error-msg")
if(q!=null)B.f.sH(q,"")
if(p!=null)B.f.sH(p,"")
if(o!=null){r=o.style
r.display=b}r=t.r
n=r.a(a.getElementById("resident-log-desc"))
if(n!=null)B.p.sH(n,"")
m=a.getElementById("resident-photo-name")
if(m!=null)J.r(m,"No file chosen")
l=a.getElementById("resident-photo-preview")
if(l!=null){k=l.style
k.display=b
k=l.style
k.backgroundImage=""
J.cH(l).X(0)}j=a0.a(a.getElementById("dir-search"))
if(j!=null)B.f.sH(j,"")
i=a0.a(a.getElementById("bill-meter-search"))
if(i!=null)B.f.sH(i,"")
h=a0.a(a.getElementById("bill-curr-input"))
if(h!=null)B.f.sH(h,"")
g=r.a(a.getElementById("worker-announcement-input"))
if(g!=null)B.p.sH(g,"")
f=a.getElementById("resident-logout-name")
e=a.getElementById("resident-logout-role")
d=a.getElementById("resident-logout-avatar")
if(f!=null)J.r(f,"---")
if(e!=null)J.r(e,"---")
if(d!=null)J.r(d,"--")},
cL(a){var s,r,q,p,o,n,m,l=this
t.P.a(a)
s=t.d.a(window.location).href
s.toString
if(A.cr(s).gai().h(0,"role")==="resident"){A.c7("[SECURITY] Resident application is forbidden from loading Worker Portal.")
return}s=l.ch
s===$&&A.ay()
J.c9(s).C(0,"active")
s=l.ch.style
s.display="none"
s=l.k2
s===$&&A.ay()
new A.b0(s,A.C(s).i("b0<2>")).q(0,new A.kr())
l.d=null
s=window.localStorage
s.toString
B.j.C(s,"waterhall_resident_session")
s=l.fy
s===$&&A.ay()
s=s.style
s.display="flex"
s=l.go
s===$&&A.ay()
s.setAttribute("style","display: none !important")
s=l.id
s===$&&A.ay()
if(s!=null){s=s.style
s.display="none"}l.a=a
s=window.localStorage
s.toString
s.setItem("waterhall_session",B.c.V(a))
s=t.J
r=A.a4(new A.I(A.B(J.M(a.h(0,"name")).split(" "),t.s),t.Q.a(new A.ks()),s),s.i("h.E"))
s=A.E(r)
q=new A.a1(r,s.i("c(1)").a(new A.kt()),s.i("a1<1,c>")).a_(0,"")
s=q.length
s=B.a.n(q,0,s<2?s:2)
p=document
o=p.getElementById("worker-logout-name")
n=p.getElementById("worker-logout-role")
m=p.getElementById("worker-logout-avatar")
if(o!=null)J.r(o,A.ao(a.h(0,"name")))
if(n!=null){p=a.h(0,"role")
J.r(n,A.ao(p==null?"Field Worker":p))}if(m!=null)J.r(m,s.toUpperCase())
l.ak("view-dashboard")
l.bG()
l.aQ()
l.cw()
l.fY()},
ak(a){var s,r,q,p,o,n,m=this,l="view-resident-home",k="view-resident-ledger",j="view-resident-support",i="view-resident-profile",h="view-transactions",g="house_id"
if(m.a==null&&m.d==null&&a!=="view-login"){m.b8()
return}s=t.d.a(window.location).href
s.toString
r=A.cr(s).gai().h(0,"role")
if(r==="worker")s=a===l||a===k||a===j||a===i
else s=!1
if(s){A.c7("[SECURITY] Worker application is forbidden from switching to Resident tab "+a+".")
return}if(r==="resident")s=a==="view-dashboard"||a==="view-billing"||a==="view-profile"||a===h||a==="view-directory"||a==="view-assets"||a==="view-worker-resident-details"
else s=!1
if(s){A.c7("[SECURITY] Resident application is forbidden from switching to Worker tab "+a+".")
return}m.b=a
s=document
s.toString
q=t.h
A.eL(q,q,"T","querySelectorAll")
q=s.querySelectorAll(".nav-tab")
q.toString
p=new A.bm(q,t.U)
p.q(p,new A.kA(a))
q=m.k2
q===$&&A.ay()
q.q(0,new A.kB(a))
if(a==="view-dashboard")m.bG()
else if(a==="view-directory")m.aQ()
else if(a==="view-announcements")m.dQ()
else if(a===i)m.cz()
else if(a!=="view-assets")if(a==="view-profile")m.cw()
else if(a===h){m.al()
m.cr()}else if(a==="view-billing"){if(m.RG==null){o=$.K().a
q=o.length
if(q!==0){if(0>=q)return A.e(o,0)
m.RG=A.ao(J.k(o[0],g))
n=t.G.a(s.getElementById("bill-meter-search"))
if(n!=null){if(0>=o.length)return A.e(o,0)
s=A.d(J.k(o[0],"owner_name"))
if(0>=o.length)return A.e(o,0)
B.f.sH(n,s+" ("+A.d(J.k(o[0],g))+")")}}}m.bF(m.RG)}else if(a===l||a===k||a===j)m.cz()},
bG(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9=this,b0="worker",b1="var(--alert-green)",b2=".alert-widget-title",b3="var(--amber-safety)"
if(a9.a==null)return
s=document
r=s.getElementById("dash-worker-title")
if(r!=null)J.r(r,"Field Terminal: "+A.d(a9.a.h(0,"selected_zone")))
q=$.K()
p=q.cH(b0)
if(q.x)a9.d7(p,b0)
o=s.getElementById("worker-announcement-banner")
n=s.getElementById("worker-announcement-message")
m=s.getElementById("worker-announcement-tag")
if(o!=null&&n!=null)if(p!=null&&A.x(J.k(p,"message")).length!==0){l=J.w(p)
J.r(n,A.x(l.h(p,"message")))
if(m!=null){k=l.h(p,"target_audience")
if(k==null)k="Everyone"
j=l.h(p,"author")
J.r(m,A.d(j==null?"Admin":j)+" \u2022 "+a9.a5(l.h(p,"timestamp"))+" \u2022 "+A.d(k))}l=o.style
l.display="flex"}else{l=o.style
l.display="none"}i=q.a
h=q.b
g=q.c
f=s.getElementById("worker-tank-val")
e=s.getElementById("worker-safety-status")
a9.c6(b0,h,f,s.getElementById("worker-turb-val"),s.getElementById("worker-tds-val"),e)
q=A.E(i)
l=q.i("I<1>")
d=A.a4(new A.I(i,q.i("F(1)").a(new A.k0()),l),l.i("h.E"))
c=A.B([],t.hq)
if(J.j(h.h(0,"turbidity_status"),"warning")){q=t.N
B.b.m(c,A.a3(["type","quality","name","Elevated Turbidity Index (Provisional)","desc",A.x(h.h(0,"turbidity_desc"))],q,q))
b=1}else b=0
a=d.length+b
a0=s.getElementById("dash-alert-count")
if(a0!=null)J.r(a0,B.e.l(a))
a1=s.getElementById("dashboard-alert-widget")
a2=s.getElementById("dash-alert-list")
if(a1!=null&&a2!=null){q=J.J(a2)
q.sU(a2,"")
if(a===0){l=a1.style
l.borderColor=b1
a3=t.dH.a(a1.querySelector(b2))
if(a3!=null){l=a3.style
l.color=b1}q.sU(a2,'          <div class="alert-item" style="border-left-color: var(--alert-green); background-color: rgba(16, 185, 129, 0.05)">\n            <div class="alert-item-icon">\n              <svg style="fill: var(--alert-green)" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n            </div>\n            <div class="alert-item-text" style="color: var(--text-on-dark)">'+(J.j(h.h(0,"has_reading"),!1)?"No leak reports. Water quality is awaiting sensor readings.":"No leak reports or configured water-quality alerts in the latest data.")+"</div>\n          </div>\n        ")}else{q=a1.style
q.borderColor=b3
a3=t.dH.a(a1.querySelector(b2))
if(a3!=null){q=a3.style
q.color=b3}B.b.q(d,new A.k1(a9,a2))
B.b.q(c,new A.k2(a9,a2))}}a4=A.B(["Purok 1","Purok 2","Purok 3","Purok 4","Purok 5","Purok 6"],t.s)
new A.cn(a4,t.fO).q(0,new A.k3(a9,i))
a5=s.getElementById("dashboard-zone-grid")
if(a5!=null){J.dk(a5,"")
B.b.q(a4,new A.k4(a9,i,a5))}a6=s.getElementById("dash-log-count")
a7=s.getElementById("dash-log-list")
if(a7!=null){s=J.J(a7)
s.sU(a7,"")
a8=A.e0(g,0,A.cC(3,"count",t.S),A.E(g).c).aw(0)
if(a6!=null)J.r(a6,""+g.length+" logged")
if(a8.length===0)s.sU(a7,'<div class="log-card" style="color:var(--text-muted)">No maintenance activity logged yet.</div>')
else B.b.q(a8,new A.k5(a9,i,a7))}},
a5(a){var s=$.bu().h(0,"WaterHallDisplay"),r=a==null?null:J.M(a)
return J.M(s.ap("formatTimestamp",A.B([r==null?"":r,"Unknown date"],t.s)))},
aQ(){var s,r,q,p,o,n,m=null,l=$.K().a,k=document,j=t.G.a(k.getElementById("dir-search")),i=t.Y,h=i.a(k.getElementById("filter-purok")),g=i.a(k.getElementById("filter-status"))
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
k=A.E(l)
i=k.i("I<1>")
n=A.a4(new A.I(l,k.i("F(1)").a(new A.k7(s,r,q)),i),i.i("h.E"))
if(n.length===0){if(p!=null){k=p.style
k.display="block"}}else{if(p!=null){k=p.style
k.display="none"}B.b.q(n,new A.k8(this,o))}},
ct(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
this.c=a
s=$.K()
r=s.a2(a)
if(r==null)return
q=document
p=q.getElementById("worker-res-name")
o=q.getElementById("worker-res-acct")
n=q.getElementById("worker-res-leak-status")
m=q.getElementById("worker-res-consumption")
l=q.getElementById("worker-res-total")
if(p!=null)J.r(p,A.ao(J.k(r,"owner_name")))
if(o!=null)J.r(o,A.ao(J.k(r,"account_number")))
k=s.r.h(0,"allow_worker_collection")==="true"
j=t.o.a(q.getElementById("btn-open-collect-modal"))
i=j==null
if(!i)j.disabled=!k
if(!i){h=j.style
h.toString
g=k?"1":"0.55"
B.n.c9(h,B.n.bQ(h,"opacity"),g,"")}if(!i){h=j.style
h.toString
g=k?"pointer":"default"
h.cursor=g}if(!i)B.k.shq(j,k?"Record an authorized collection":"Payments must be made at Barangay Hall.")
i=q.getElementById("worker-collection-policy")
if(i!=null)J.r(i,k?"Field collection is enabled by Admin. Payments remain pending until the server confirms synchronization.":"Barangay policy: make payments in person at Barangay Hall. Field collection is disabled.")
f=s.bL(a)
e=f.length!==0?B.b.gD(f):null
if(m!=null)J.r(m,e==null?"--":B.d.G(A.a9(J.k(e,"consumption")),3))
if(l!=null)J.r(l,e==null?"No billing record":B.d.G(A.a9(J.k(e,"total_due")),2))
if(n!=null){s=J.J(n)
if(J.j(J.k(r,"current_leak_status"),"leak")){s.sU(n,'<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--alert-red)"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> <span style="color:var(--alert-red);font-weight:700">Leak Alert Detected</span>')
s=n.style
s.backgroundColor="var(--alert-red-bg)"
s=n.style
s.border="1px solid var(--alert-red)"}else{s.sU(n,'<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--alert-green)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <span style="color:var(--alert-green);font-weight:700">No leak reported</span>')
s=n.style
s.backgroundColor="var(--alert-green-bg)"
s=n.style
s.border="1px solid rgba(16, 185, 129, 0.3)"}}this.ak("view-worker-resident-details")
s=q.getElementById("btn-back-to-dir")
if(s!=null){s=J.aa(s)
q=s.$ti
A.A(s.a,s.b,q.i("~(1)?").a(new A.jM(this)),!1,q.c)}},
e2(a){var s=document,r=s.getElementById("modal-leak-title"),q=s.getElementById("modal-leak-desc")
if(r==null||q==null)return
s=J.J(r)
if(a==="leak"){s.sP(r,"Leak status: LEAK REPORTED")
s=r.style
s.color="var(--alert-red)"
J.r(q,"A leak has been reported. Inspect the water line on site.")}else{s.sP(r,"Leak status: NO REPORT")
s=r.style
s.color="var(--alert-green)"
J.r(q,"No leak is currently reported. This is not an automatic sensor assessment.")}},
hm(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e="var(--amber-safety)",d={}
t.oT.a(a)
s=document.getElementById(b)
if(s==null)return
r=J.J(s)
r.sU(s,"")
if(a.length===0){r.sU(s,'<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:12px">No historic telemetry available.</div>')
return}q=B.d.cf(B.b.hg(a,new A.kl())*1.1,10,1000)
p=new A.cn(a,A.E(a).i("cn<1>"))
o=p.gaC(p).au(0,new A.km(a,q),t.c).aw(0)
p=A.E(o)
n=p.i("c(1)")
p=p.i("a1<1,c>")
m=new A.a1(o,n.a(new A.kn()),p).a_(0," ")
if(0>=o.length)return A.e(o,0)
l=B.d.G(A.a9(J.k(o[0],"x")),1)
k=B.e.G(80,1)
p=new A.a1(o,n.a(new A.ko()),p).a_(0," ")
n=o.length
j=n-1
if(!(j>=0))return A.e(o,j)
j=B.d.G(A.a9(J.k(o[j],"x")),1)
n=B.e.G(80,1)
i=b==="resident-chart-container"
h=i?"res-chart-grad":"chart-area-grad"
g=i?"#3B82F6":e
f=i?"#3B82F6":e
d.a='      <svg width="100%" height="100%" viewBox="0 0 340 100" style="overflow:visible">\n        <defs>\n          <linearGradient id="'+h+'" x1="0" y1="0" x2="0" y2="1">\n            <stop offset="0%" stop-color="'+f+'" stop-opacity="0.3"/>\n            <stop offset="100%" stop-color="'+f+'" stop-opacity="0.0"/>\n          </linearGradient>\n        </defs>\n\n        <line x1="20" y1="20" x2="320" y2="20" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="50" x2="320" y2="50" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="80" x2="320" y2="80" stroke="#CBD5E1" stroke-width="1.5"/>\n\n        <path d="'+("M "+l+","+k+" "+p+(" L "+j+","+n+" Z"))+'" fill="url(#'+h+')" />\n        <polyline points="'+m+'" fill="none" stroke="'+g+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>\n    '
B.b.q(o,new A.kp(d,g))
r.sU(s,d.a+="</svg>")},
dR(a){var s,r,q,p,o,n=document.getElementById("modal-historical-logs")
if(n==null)return
s=J.J(n)
s.sU(n,"")
r=$.K().c
q=A.E(r)
p=q.i("I<1>")
o=A.a4(new A.I(r,q.i("F(1)").a(new A.k9(a)),p),p.i("h.E"))
if(o.length===0)s.sU(n,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous repair logs recorded for this meter.</div>')
else B.b.q(o,new A.ka(this,n))},
cw(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this
if(f.a==null)return
s=document
r=s.getElementById("worker-name")
q=s.getElementById("worker-role")
p=s.getElementById("worker-zone-lbl")
o=s.getElementById("worker-avatar")
if(r!=null)J.r(r,A.ao(f.a.h(0,"name")))
if(q!=null)J.r(q,A.ao(f.a.h(0,"role")))
if(p!=null)J.r(p,"Assigned Zone: "+A.d(f.a.h(0,"selected_zone")))
if(o!=null){n=t.J
m=A.a4(new A.I(A.B(J.M(f.a.h(0,"name")).split(" "),t.s),t.Q.a(new A.kb()),n),n.i("h.E"))
n=A.E(m)
l=new A.a1(m,n.i("c(1)").a(new A.kc()),n.i("a1<1,c>")).a_(0,"")
n=l.length
J.r(o,B.a.n(l,0,n<2?n:2).toUpperCase())}n=$.K()
k=n.a.length
n=n.c
j=A.E(n)
i=new A.I(n,j.i("F(1)").a(new A.kd(f)),j.i("I<1>")).gj(0)
h=s.getElementById("profile-stat-total")
g=s.getElementById("profile-stat-logs")
if(h!=null)J.r(h,B.e.l(k))
if(g!=null)J.r(g,B.e.l(i))},
h_(){var s,r=this,q=document,p=q.getElementById("transaction-filter")
if(p!=null){p=J.rr(p)
s=p.$ti
A.A(p.a,p.b,s.i("~(1)?").a(new A.jz(r)),!1,s.c)}p=q.getElementById("transaction-search")
if(p!=null){p=J.rs(p)
s=p.$ti
A.A(p.a,p.b,s.i("~(1)?").a(new A.jA(r)),!1,s.c)}p=q.getElementById("transaction-more")
if(p!=null){p=J.aa(p)
s=p.$ti
A.A(p.a,p.b,s.i("~(1)?").a(new A.jB(r)),!1,s.c)}q=q.getElementById("transaction-previous")
if(q!=null){q=J.aa(q)
p=q.$ti
A.A(q.a,q.b,p.i("~(1)?").a(new A.jC(r)),!1,p.c)}},
bb(a){return this.h6(a)},
cr(){return this.bb(!1)},
h6(a){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c
var $async$bb=A.U(function(b,a0){if(b===1){o.push(a0)
s=p}for(;;)switch(s){case 0:e=document
d=t.g.a(e.getElementById("transaction-filter")).value
if(m.a==null||!$.K().x||d==="Pending Sync"||d==="Failed Sync"){++m.p2
m.p3=!1
m.ok=null
m.al()
s=1
break}l=++m.p2
k=window.localStorage.getItem("waterhall_jwt")
if(!a){m.ok=null
m.p1=0}m.p3=!0
m.p4=null
m.al()
p=4
h=t.q.a(e.getElementById("transaction-search")).value
j=h==null?"":h
e=$.K()
g=a?m.ok:null
s=7
return A.y(e.b9(g,j),$async$bb)
case 7:i=a0
if(!J.j(l,m.p2)||!J.j(k,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}m.ok=A.no(J.k(i,"next_cursor"))
if(a&&m.ci().length>m.p1+25)m.p1+=25
n.push(6)
s=5
break
case 4:p=3
c=o.pop()
if(J.j(l,m.p2))m.p4="History could not load. Saved device records remain available; reopen Transactions to retry."
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.j(l,m.p2)){m.p3=!1
m.al()}s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$bb,r)},
ci(){var s,r,q,p=document,o=t.g.a(p.getElementById("transaction-filter")).value
if(o==null)o="All"
p=t.q.a(p.getElementById("transaction-search")).value
p=B.a.u(p==null?"":p)
s=$.K().ht()
r=A.E(s)
q=r.i("I<1>")
p=A.a4(new A.I(s,r.i("F(1)").a(new A.jl(o,p.toLowerCase())),q),q.i("h.E"))
return p},
al(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d="house_id",c=document,b=c.getElementById("transaction-list")
if(b==null||e.a==null)return
s=t.g.a(c.getElementById("transaction-filter")).value
if(s==null)s="All"
r=J.J(b)
r.gbt(b).X(0)
q=e.ci()
for(p=A.e0(q,e.p1,null,A.E(q).c).hp(0,25),o=p.$ti,p=new A.bh(p,p.gj(0),o.i("bh<a5.E>")),n=t.N,m=t.z,o=o.i("a5.E");p.p();){l=p.d
if(l==null)l=o.a(l)
k=c.createElement("div")
k.className="bill-record-card"
j=c.createElement("h3")
j.toString
i=J.w(l)
h=i.h(l,"family_head_name")
if(h==null){h=$.K().a2(A.d(i.h(l,d)))
h=h==null?null:J.k(h,"owner_name")}B.H.sP(j,A.d(h==null?"Household":h)+" \xb7 "+A.d(i.h(l,d)))
k.appendChild(j).toString
j=c.createElement("p")
j.toString
B.m.sP(j,A.d(i.h(l,"sync_status"))+" \xb7 Billing status: "+A.d(i.h(l,"status")))
k.appendChild(j).toString
g=c.createElement("div")
g.className="transaction-details"
A.a3(["Meter",i.h(l,"account_number"),"Previous reading",i.h(l,"previous_reading"),"Current reading",i.h(l,"current_reading"),"Consumption (m\xb3)",i.h(l,"consumption"),"Bill amount (PHP)",i.h(l,"total_due"),"Billing date",e.a5(i.h(l,"date")),"Reference",i.h(l,"bill_id"),"Operation",i.h(l,"operation_id")],n,m).q(0,new A.kq(g))
k.appendChild(g).toString
b.appendChild(k).toString}p=c.getElementById("transaction-message")
if(p!=null){o=e.p4
if(o==null)if(e.p3)r="Loading history\u2026"
else if(!$.K().x)r="Offline Mode \u2014 showing saved device history."
else{r=r.gbt(b)
r=r.gE(r)?"No matching transactions.":"Page "+(B.e.ac(e.p1,25)+1)+" \u2014 newest bills first."}else r=o
J.r(p,r)}r=t.k
f=r.a(c.getElementById("transaction-more"))
if(q.length<=e.p1+25)p=!$.K().x||e.ok==null||s==="Pending Sync"||s==="Failed Sync"
else p=!1
f.hidden=p
f.disabled=e.p3
r.a(c.getElementById("transaction-previous")).hidden=e.p1===0},
fY(){var s,r,q,p,o,n,m,l,k,j,i=this,h="house_id"
if(i.rx)return
i.rx=!0
for(s=["name","id"],r=0;r<2;++r){q=s[r]
p=document.getElementById("bill-search-"+q)
if(p!=null){p=J.aa(p)
o=p.$ti
A.A(p.a,p.b,o.i("~(1)?").a(new A.jm(i,q)),!1,o.c)}}s=document
p=t.G
n=p.a(s.getElementById("bill-meter-search"))
m=s.getElementById("bill-meter-results")
l=p.a(s.getElementById("bill-curr-input"))
k=t.o.a(s.getElementById("btn-save-bill"))
if(n==null)return
p=t.E
o=p.i("~(1)?")
p=p.c
A.A(n,"focus",o.a(new A.jn(i)),!1,p)
A.A(n,"input",o.a(new A.jo(i)),!1,p)
if(l!=null)A.A(l,"input",o.a(new A.jp(i)),!1,p)
A.A(s,"click",t.b9.a(new A.jq(n,m)),!1,t.V)
if(k!=null){s=t.C
A.A(k,"click",s.i("~(1)?").a(new A.jr(i)),!1,s.c)}j=$.K().a
s=j.length
if(s!==0){if(0>=s)return A.e(j,0)
i.RG=A.ao(J.k(j[0],h))
if(0>=j.length)return A.e(j,0)
s=A.d(J.k(j[0],"owner_name"))
if(0>=j.length)return A.e(j,0)
B.f.sH(n,s+" ("+A.d(J.k(j[0],h))+")")
i.bF(i.RG)}},
cM(){var s,r,q,p,o,n,m,l,k,j,i,h="owner_name",g="house_id",f="search-result-item",e=document,d=t.G.a(e.getElementById("bill-meter-search")),c=e.getElementById("bill-meter-results")
if(d==null||c==null)return
s=d.value
r=s==null?null:B.a.u(s.toLowerCase())
if(r==null)r=""
s=this.RG
q=s==null?null:$.K().a2(s)
J.cH(c).X(0)
if(q==null)p=""
else{s=J.w(q)
p=A.d(s.h(q,h))+" ("+A.d(s.h(q,g))+")"}if(r.length===0||d.value===p){e=c.style
e.display="none"
return}s=$.K().a
o=A.E(s)
n=o.i("F(1)").a(new A.ku(this,r))
m=A.od(t.N)
for(s=B.b.gB(s),o=new A.aw(s,n,o.i("aw<1>")),n=t.C,l=n.i("~(1)?"),n=n.c;o.p();){k=s.gt(0)
j=J.w(k)
if(!m.m(0,A.d(j.h(k,g))))continue
i=e.createElement("button")
i.type="button"
i.className=f
B.k.sP(i,A.d(j.h(k,h))+" ("+A.d(j.h(k,g))+")")
A.A(i,"click",l.a(new A.kv(this,d,k,c)),!1,n)
c.appendChild(i).toString}if(m.a===0){e=e.createElement("div")
e.className=f
B.E.sP(e,$.K().x?"No households found":"No matching cached households. Reconnect to check availability.")
c.appendChild(e).toString}e=c.style
e.display="block"},
bF(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=a!=null
if(c)d.RG=a
s=d.RG
if(s==null)return
r=$.K()
q=r.a2(s)
if(q==null)return
s=document
p=s.getElementById("bill-prev-reading")
o=t.G.a(s.getElementById("bill-curr-input"))
n=s.getElementById("bill-selected-details")
if(n!=null){s=r.cG()
m=A.E(s)
l=m.i("I<1>")
k=A.a4(new A.I(s,m.i("F(1)").a(new A.jO(d)),l),l.i("h.E"))
B.b.aI(k,new A.jP())
j=k.length===0?null:B.b.gD(k)
s=A.E(k)
i=new A.I(k,s.i("F(1)").a(new A.jQ()),s.i("I<1>")).cj(0,0,new A.jR(),t.u)
s=J.w(q)
m=A.d(s.h(q,"owner_name"))
l=A.d(s.h(q,"house_id"))
s=A.d(s.h(q,"account_number"))
if(j==null)h="None"
else{h=J.w(j)
h=A.d(h.h(j,"bill_id"))+" / "+A.d(h.h(j,"status"))+" / PHP "+A.d(h.h(j,"total_due"))}g=B.d.G(i,2)
f=r.x?"":" (cached)"
J.r(n,m+" \xb7 "+l+"\nMeter: "+s+"\nCurrent issued bill: "+h+"\nOutstanding balance: PHP "+g+f)}s=d.RG
s.toString
e=r.ej(s)
if(p!=null)J.r(p,e==null?"--":B.d.G(e,3))
if(c&&o!=null)B.f.sH(o,"")
d.bI()
c=d.RG
c.toString
d.hk(c)},
cS(){var s,r,q,p,o,n,m,l,k,j,i=null,h=t.N,g=t.z,f=A.oc($.K().w,h,g),e=document,d=e.getElementById("bill-prev-reading"),c=d==null?i:d.textContent
if(c==null)c=""
e=t.G.a(e.getElementById("bill-curr-input"))
if(e==null)s=i
else{e=e.value
e=e==null?i:B.a.u(e)
s=e}if(s==null)s=""
if(c==="--"||c.length===0||s.length===0)return i
r=A.dW(c)
q=A.dW(s)
if(!J.j(f.h(0,"configured"),!0)||r==null||q==null||!isFinite(r)||r<0||!isFinite(q)||q<0||q<r||q>1e6)return i
p=q*1000
e=B.d.aE(p)
if(Math.abs(p-e)>0.0001)return i
o=e-B.d.aE(r*1000)
if(o<0)return i
n=B.e.ac(B.e.cf(o-B.d.aE(A.bL(A.d(f.h(0,"included_m3")))*1000),0,1e9)*B.d.aE(A.bL(A.d(f.h(0,"excess_rate")))*100)+500,1000)
m=A.bL(B.d.G((B.d.aE(A.bL(A.d(f.h(0,"base_rate")))*100)+B.d.aE(A.bL(A.d(f.h(0,"environmental_fee")))*100)+n)/100,2))
l=A.bL(B.d.G(o/1000,3))
k=A.bL(B.d.G(n/100,2))
j=A.bL(B.d.G(q,3))
return A.a3(["previous_reading",A.bL(B.d.G(r,3)),"current_reading",j,"consumption",l,"excess_charge",k,"total_due",m,"billing_config_version",f.h(0,"version")],h,g)},
bI(){var s,r,q,p,o,n,m,l="configured",k="--",j="included_m3",i="consumption",h="total_due",g=$.K(),f=A.oc(g.w,t.N,t.z),e=this.cS(),d=new A.ag(Date.now(),0,!1),c=""+A.cW(d)+"-"+B.a.bc(B.e.l(A.mb(d)),2,"0"),b=this.RG,a=b!=null&&g.cm(b,c)
g=new A.kC()
g.$2("bill-calc-base",J.j(f.h(0,l),!0)?A.d(f.h(0,"base_rate")):k)
g.$2("bill-calc-fee",J.j(f.h(0,l),!0)?A.d(f.h(0,"environmental_fee")):k)
g.$2("bill-preview-cycle",c)
g.$2("bill-included-volume",J.j(f.h(0,l),!0)?A.d(f.h(0,j))+" m\xb3":k)
g.$2("bill-rate-description",J.j(f.h(0,l),!0)?"Includes "+A.d(f.h(0,j))+" m\xb3; excess at PHP "+A.d(f.h(0,"excess_rate"))+"/m\xb3.":"Admin must confirm billing rates before a bill can be recorded.")
b=e==null
g.$2("bill-calc-consumption",b?"0.000":B.d.G(A.a9(e.h(0,i)),3))
g.$2("bill-calc-excess",b?"0.00":B.d.G(A.a9(e.h(0,"excess_charge")),2))
g.$2("bill-calc-total",b?k:B.d.G(A.a9(e.h(0,h)),2))
s=document
r=t.G.a(s.getElementById("bill-curr-input"))
if(r==null)q=null
else{r=r.value
r=r==null?null:B.a.u(r)
q=r}if(q==null)q=""
r=s.getElementById("bill-prev-reading")
r=r==null?null:r.textContent
p=A.dW(r==null?"":r)
o=A.dW(q)
if(a)n="A bill or pending bill already exists for this billing cycle ("+c+")."
else if(!J.j(f.h(0,l),!0))n="Admin must confirm billing rates before issuing new bills."
else if(q.length===0)n="Enter current reading at or above previous reading (up to 3 decimal places)."
else if(o==null||!isFinite(o)||o<0)n="Enter a valid non-negative reading (up to 3 decimal places)."
else if(p!=null&&o<p)n="Current reading cannot be lower than previous reading ("+B.d.G(p,3)+" m\xb3)."
else n=b?"Reading format invalid. Up to 3 decimal places supported.":"Draft: "+B.d.G(A.a9(e.h(0,i)),3)+" m\xb3 | Total Due: \u20b1"+B.d.G(A.a9(e.h(0,h)),2)
g.$2("billing-alert-banner",n)
m=t.o.a(s.getElementById("btn-save-bill"))
if(m!=null){m.disabled=this.to||a||b
g=m.style
g.toString
b=m.disabled
b.toString
b=b?"0.5":"1"
B.n.c9(g,B.n.bQ(g,"opacity"),b,"")}},
bi(){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$bi=A.U(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:if(m.to||m.RG==null||m.a==null){s=1
break}l=m.cS()
c=new A.ag(Date.now(),0,!1)
k=""+A.cW(c)+"-"+B.a.bc(B.e.l(A.mb(c)),2,"0")
j=c.aa().a9()
if(l!=null){b=$.K()
a=m.RG
a.toString
a=b.cm(a,k)
b=a}else b=!0
if(b){s=1
break}b=$.K()
a=m.RG
a.toString
i=b.a2(a)
if(i==null){s=1
break}m.to=!0
m.bI()
h=window.localStorage.getItem("waterhall_jwt")
g=b.x
p=4
f=A.oc(l,t.N,t.z)
J.aE(f,"house_id",m.RG)
J.aE(f,"account_number",J.k(i,"account_number"))
J.aE(f,"billing_month",k)
J.aE(f,"date",j)
J.aE(f,"billed_by",m.a.h(0,"worker_id"))
s=7
return A.y(b.aK(f),$async$bi)
case 7:e=a3
if(!J.j(h,window.localStorage.getItem("waterhall_jwt"))||m.a==null){n=[1]
s=5
break}if(g&&J.j(J.k(e,"is_synced"),!0))m.F("Bill successfully saved.")
else m.F("Bill saved offline. Pending synchronization.")
d=t.G.a(document.getElementById("bill-curr-input"))
if(d!=null)B.f.sH(d,"")
f=m.RG
f.toString
m.bF(f)
m.cw()
n.push(6)
s=5
break
case 4:p=3
a1=o.pop()
if(J.j(h,window.localStorage.getItem("waterhall_jwt")))m.F("Unable to save the reading. Check storage and your session.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.to=!1
m.bI()
s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$bi,r)},
hk(a){var s,r,q=document.getElementById("billing-history-list")
if(q==null)return
s=J.J(q)
s.sU(q,"")
r=$.K().bL(a)
if(r.length===0)s.sU(q,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous invoice logs recorded.</div>')
else B.b.q(r,new A.jN(this,q))},
d7(a,b){var s,r="WaterHallPush"
t.dZ.a(a)
s=$.bu()
if(s.ba(r)){s=s.h(0,r)
s.ap("processAnnouncements",A.B([A.lV(a==null?[]:A.B([a],t.t)),b],t.hf))}},
dQ(){var s,r,q,p,o,n,m,l=this.d==null?"worker":"resident",k=document,j=k.getElementById("announcement-history")
if(j==null)return
J.cH(j).X(0)
s=$.K().cF(l)
r=J.w(s)
if(r.gE(s)){k=k.createElement("p")
k.className="empty-state"
B.m.sP(k,"No announcements yet. New Barangay updates will appear here.")
j.appendChild(k).toString
return}for(r=r.gB(s);r.p();){q=r.gt(r)
p=k.createElement("div")
p.className="announcement-history-card"
o=k.createElement("p")
o.className="announcement-meta"
n=k.createElement("span")
n.className="announcement-author"
m=J.w(q)
B.u.sP(n,A.d(m.h(q,"author")))
o.appendChild(n).toString
n=k.createElement("span")
n.toString
B.u.sP(n,"\u2022 "+this.a5(m.h(q,"timestamp")))
o.appendChild(n).toString
p.appendChild(o).toString
n=k.createElement("p")
n.toString
B.m.sP(n,A.d(m.h(q,"message")))
p.appendChild(n).toString
j.appendChild(p).toString}},
F(a){var s=document,r=s.getElementById("app-toast"),q=s.getElementById("toast-text")
if(r!=null&&q!=null){J.r(q,a)
J.c9(r).m(0,"show")
s=this.x1
if(s!=null)s.a3(0)
this.x1=A.e2(A.p6(2500,0),new A.kz(r))}},
cN(a){var s,r,q,p,o,n,m,l,k,j=this,i=t.d.a(window.location).href
i.toString
if(A.cr(i).gai().h(0,"role")==="worker"){A.c7("[SECURITY] Worker application is forbidden from loading Resident Portal.")
return}j.d=a
window.localStorage.setItem("waterhall_resident_session",a)
j.a=null
i=window.localStorage
i.toString
B.j.C(i,"waterhall_session")
i=j.ch
i===$&&A.ay()
J.c9(i).C(0,"active")
i=j.ch.style
i.display="none"
i=j.k2
i===$&&A.ay()
new A.b0(i,A.C(i).i("b0<2>")).q(0,new A.kw())
i=j.fy
i===$&&A.ay()
i.setAttribute("style","display: none !important")
i=j.go
i===$&&A.ay()
i.setAttribute("style","display: flex !important")
i=j.id
i===$&&A.ay()
if(i!=null){i=i.style
i.display="none"}s=$.K().a2(a)
if(s!=null){i=document
r=i.getElementById("resident-logout-name")
q=i.getElementById("resident-logout-role")
p=i.getElementById("resident-logout-avatar")
i=J.w(s)
o=i.h(s,"owner_name")
n=J.M(o==null?"":o)
if(r!=null)J.r(r,n.length!==0?n:a)
if(q!=null)J.r(q,A.d(i.h(s,"house_id"))+" \u2022 "+A.d(i.h(s,"purok")))
if(p!=null){i=t.J
m=A.a4(new A.I(A.B(n.split(" "),t.s),t.Q.a(new A.kx()),i),i.i("h.E"))
i=A.E(m)
l=new A.a1(m,i.i("c(1)").a(new A.ky()),i.i("a1<1,c>")).a_(0,"")
i=l.length
k=B.a.n(l,0,i<2?i:2).toUpperCase()
J.r(p,k.length!==0?k:"RES")}}j.ak("view-resident-home")
i=j.at
if(i!=null)i.$0()},
c4(){var s,r,q
if(!A.cF())return
if(this.d!=null)s="resident"
else s=this.a!=null?"worker":null
if(s==null)return
r=$.K().b
q=document
this.c6(s,r,q.getElementById(s+"-tank-val"),q.getElementById(s+"-turb-val"),q.getElementById(s+"-tds-val"),q.getElementById(s+"-safety-status"))},
c6(a7,a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4="WaterHallDisplay",a5="var(--alert-red)",a6="var(--text-muted)"
t.P.a(a8)
s=$.bu()
r=t.gZ
q=s.h(0,a4).ap("telemetryFreshness",A.B([A.lV(a8)],r))
p=J.w(q)
o=J.j(p.h(q,"fresh"),!0)
n=a8.h(0,"last_updated")
m=A.d(n==null?"":n)
l=a8.h(0,"main_tank_level")
new A.j0(o).$4(a9,l,0,"%")
k=s.h(0,a4).ap("turbidityIndexState",A.B([A.lV(a8)],r))
n=J.w(k)
j=n.h(k,"value")
i=A.d(n.h(k,"status"))
h=typeof j=="number"?B.d.G(j,2):"N/A"
n=b0==null
if((n?a3:b0.textContent)!==h)if(!n)J.r(b0,h)
g=s.h(0,a4).ap("tdsIndexState",A.B([A.lV(a8)],r))
r=J.w(g)
f=r.h(g,"value")
e=typeof f=="number"?B.d.G(f,2):"N/A"
n=b1==null
if((n?a3:b1.textContent)!==e)if(!n)J.r(b1,e)
n=document
d=n.getElementById(a7+"-tds-status")
c=A.d(r.h(g,"status"))
r=d==null
if((r?a3:d.textContent)!==c)if(!r)J.r(d,c)
if(!r){r=d.style
r.toString
b=c==="Elevated"?a5:a6
r.color=b}r=b2==null
if((r?a3:b2.textContent)!==i)if(!r)J.r(b2,i)
if(!r){r=b2.style
r.toString
b=i==="Elevated"?a5:a6
r.color=b}if(o)a="Current sensor readings."
else a=J.j(p.h(q,"hasReading"),!0)?"IoT offline.":"Awaiting current sensor readings."
a0=n.getElementById(a7+"-telemetry-freshness")
r=a0==null
if((r?a3:a0.textContent)!==a)if(!r)J.r(a0,a)
a1=n.getElementById(a7+"-reading-time")
a2=this.a5(m)
r=a1==null
if((r?a3:a1.textContent)!==a2)if(!r)J.r(a1,a2)
s.h(0,a4).ap("renderTank",[a7+"-water-tank",l,o])},
cz(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6=this,b7=null,b8="resident",b9="owner_name",c0="house_id",c1="account_number",c2="purok",c3="payment_location",c4="payment_method",c5="operating_hours",c6="payment_instructions",c7=b6.d
if(c7==null)return
s=$.K()
r=s.a2(c7)
if(r==null)return
q=s.cH(b8)
if(s.x)b6.d7(q,b8)
c7=document
p=c7.getElementById("resident-announcement-banner")
o=c7.getElementById("resident-announcement-message")
n=c7.getElementById("resident-announcement-tag")
if(p!=null&&o!=null)if(q!=null&&A.x(J.k(q,"message")).length!==0){m=J.w(q)
J.r(o,A.x(m.h(q,"message")))
if(n!=null){l=m.h(q,"target_audience")
if(l==null)l="Everyone"
k=m.h(q,"author")
J.r(n,A.d(k==null?"Admin":k)+" \u2022 "+b6.a5(m.h(q,"timestamp"))+" \u2022 "+A.d(l))}m=p.style
m.display="flex"}else{m=p.style
m.display="none"}b6.c6(b8,s.b,c7.getElementById("resident-tank-val"),c7.getElementById("resident-turb-val"),c7.getElementById("resident-tds-val"),c7.getElementById("resident-safety-status"))
j=c7.getElementById("resident-profile-name-home")
i=c7.getElementById("resident-profile-meta-home")
if(j!=null)J.r(j,A.ao(J.k(r,b9)))
if(i!=null){m=J.w(r)
J.r(i,"Resident: "+A.d(m.h(r,c0))+" | Meter: "+A.d(m.h(r,c1))+" | "+A.d(m.h(r,c2)))}h=c7.getElementById("resident-logout-name")
g=c7.getElementById("resident-logout-role")
f=c7.getElementById("resident-logout-avatar")
m=J.w(r)
e=m.h(r,b9)
d=J.M(e==null?"":e)
e=c7.getElementById("resident-profile-name")
if(e!=null)J.r(e,d)
e=c7.getElementById("resident-profile-account")
if(e!=null)J.r(e,A.d(m.h(r,c0))+" \xb7 Meter "+A.d(m.h(r,c1))+" \xb7 "+A.d(m.h(r,c2)))
e=c7.getElementById("resident-profile-avatar")
if(e!=null){c=d.length
if(c===0)c="R"
else{if(0>=c)return A.e(d,0)
c=d[0].toUpperCase()}J.r(e,c)}e=c7.getElementById("resident-report-context")
if(e!=null)J.r(e,"Reporting for "+A.d(m.h(r,c0))+" \xb7 "+A.d(m.h(r,c2)))
if(h!=null)J.r(h,A.ao(d.length!==0?d:m.h(r,c0)))
if(g!=null)J.r(g,A.d(m.h(r,c0))+" \u2022 "+A.d(m.h(r,c2)))
if(f!=null){e=t.J
b=A.a4(new A.I(A.B(d.split(" "),t.s),t.Q.a(new A.ke()),e),e.i("h.E"))
e=A.E(b)
a=new A.a1(b,e.i("c(1)").a(new A.kf()),e.i("a1<1,c>")).a_(0,"")
e=a.length
a0=B.a.n(a,0,e<2?e:2).toUpperCase()
J.r(f,a0.length!==0?a0:"RES")}a1=c7.getElementById("resident-leak-flag")
if(a1!=null){e=J.J(a1)
if(J.j(m.h(r,"current_leak_status"),"leak")){e.sU(a1,'          <svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:currentColor;"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n          <span>A leak has been reported. Please contact the water service team.</span>\n        ')
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
a2=s.bL(e)
a3=B.a.n(new A.ag(Date.now(),0,!1).aa().a9(),0,7)
e=A.E(a2)
c=e.i("F(1)")
e=e.i("I<1>")
a4=e.i("h.E")
a5=A.a4(new A.I(a2,c.a(new A.kg()),e),a4)
a6=A.a4(new A.I(a2,c.a(new A.kh(a3)),e),a4)
if(a5.length!==0)a7=B.b.gD(a5)
else if(a6.length!==0)a7=B.b.gD(a6)
else a7=a2.length!==0?B.b.gD(a2):b7
e=a7==null
c=e?b7:J.k(a7,"billing_breakdown")
t.eO.a(c)
a4=new A.ki()
a8=new A.kj()
a4.$2("resident-bill-cycle",e?"No recorded cycle":A.d(J.k(a7,"billing_month")))
a4.$2("resident-bill-status",e?"No unpaid or current bill":A.d(J.k(a7,"status")))
a4.$2("resident-prev-reading",a8.$2(e?b7:J.k(a7,"previous_reading"),3))
a4.$2("resident-curr-reading",a8.$2(e?b7:J.k(a7,"current_reading"),3))
a4.$2("resident-calc-consumption",a8.$2(e?b7:J.k(a7,"consumption"),3))
a4.$2("resident-calc-total",a8.$2(e?b7:J.k(a7,"total_due"),2))
a9=c==null
a4.$2("resident-calc-base",a8.$2(a9?b7:J.k(c,"base_rate"),2))
a4.$2("resident-calc-fee",a8.$2(a9?b7:J.k(c,"environmental_fee"),2))
a4.$2("resident-calc-excess",a8.$2(a9?b7:J.k(c,"excess_charge"),2))
if(e)b0=b7
else{a8=J.k(a7,"payment_date")
a8=a8==null?b7:J.M(a8)
b0=a8}if(b0==null)b0=""
a4.$2("resident-payment-date",!e&&A.d(J.k(a7,"status")).toLowerCase()==="paid"&&b0.length!==0?b6.a5(b0):"Not paid")
if(e)e="No billing record is on file yet. Amounts appear here after a Worker saves a meter reading."
else if(a9)e="Legacy bill: original total preserved; rate breakdown unavailable."
else{e=J.w(c)
c="Recorded rates: first "+A.d(e.h(c,"included_m3"))+" m\xb3 included; excess PHP "+A.d(e.h(c,"excess_rate"))+"/m\xb3."
e=c}a4.$2("resident-rate-description",e)
b6.hm(A.aO(t.R.a(m.h(r,"monthly_history")),!0,t.u),"resident-chart-container")
b6.hl(a2)
b1=s.r
b2=c7.getElementById("res-payment-location")
b3=c7.getElementById("res-payment-method")
b4=c7.getElementById("res-payment-hours")
b5=c7.getElementById("res-payment-instructions")
if(b2!=null&&b1.M(0,c3)){c7=b1.h(0,c3)
c7.toString
J.r(b2,c7)}if(b3!=null&&b1.M(0,c4)){c7=b1.h(0,c4)
c7.toString
J.r(b3,c7)}if(b4!=null&&b1.M(0,c5)){c7=b1.h(0,c5)
c7.toString
J.r(b4,c7)}if(b5!=null&&b1.M(0,c6)){c7=b1.h(0,c6)
c7.toString
J.r(b5,c7)}},
hl(a){var s,r
t.p.a(a)
s=document.getElementById("resident-history-list")
if(s==null)return
r=J.J(s)
r.sU(s,"")
if(a.length===0){r.sU(s,'<div class="empty-state" style="padding:16px;text-align:center;color:var(--text-muted);font-size:13px;">No billing history is on file for this household yet.</div>')
return}B.b.q(a,new A.kk(this,s))},
f2(){var s,r=document,q=r.getElementById("btn-open-register-modal"),p=r.getElementById("register-user-modal"),o=t.dD.a(r.getElementById("resident-register-form")),n=r.getElementById("register-status"),m=t.o.a(r.getElementById("btn-submit-register"))
if(A.e5().gai().h(0,"role")==="resident")if(q!=null){s=q.style
s.display="block"}s=t.h
A.eL(s,s,"T","querySelectorAll")
s=r.querySelectorAll("[data-toggle-password]")
s.toString
s=new A.bm(s,t.U)
s.q(s,new A.iW())
r=r.getElementById("btn-close-register-modal")
if(r!=null){r=J.aa(r)
s=r.$ti
A.A(r.a,r.b,s.i("~(1)?").a(new A.iX(p)),!1,s.c)}if(q!=null){r=J.aa(q)
s=r.$ti
A.A(r.a,r.b,s.i("~(1)?").a(new A.iY(p,n)),!1,s.c)}if(o!=null){r=t.E
A.A(o,"submit",r.i("~(1)?").a(new A.iZ(m,o,n)),!1,r.c)}},
eO(){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f="change",e=document,d=e.getElementById("btn-open-collect-modal"),c=e.getElementById("modal-collect-payment"),b=e.getElementById("btn-collect-cancel"),a=t.o.a(e.getElementById("btn-collect-confirm")),a0=t.G.a(e.getElementById("collect-amount-input")),a1=t.Y,a2=a1.a(e.getElementById("collect-payment-method"))
if(d!=null){s=J.aa(d)
r=s.$ti
A.A(s.a,s.b,r.i("~(1)?").a(new A.iA(g,a0,c)),!1,r.c)}if(b!=null){s=J.aa(b)
r=s.$ti
A.A(s.a,s.b,r.i("~(1)?").a(new A.iB(c)),!1,r.c)}if(a!=null){s=t.C
A.A(a,"click",s.i("~(1)?").a(new A.iC(g,a,a0,a2,c)),!1,s.c)}s=t.iC
q=s.a(e.getElementById("resident-gallery-input"))
p=s.a(e.getElementById("resident-camera-input"))
o=s.a(e.getElementById("resident-photo-input"))
n=a1.a(e.getElementById("resident-issue-category"))
m=t.r.a(e.getElementById("resident-log-desc"))
a1=new A.iT(g,n,m)
s=new A.iU(g)
r=new A.iw(g,s,a1)
$.bu().k(0,"waterhallPhotoPickerResult",A.uY(new A.iI(g,a1,r),t.Z))
l=new A.iS(g,a1)
k=new A.iz(g,q,p,o)
r=new A.iR(g,r)
if(q!=null){j=t.E
A.A(q,f,j.i("~(1)?").a(new A.iJ(r,q)),!1,j.c)}if(p!=null){j=t.E
A.A(p,f,j.i("~(1)?").a(new A.iK(r,p)),!1,j.c)}if(o!=null){j=t.E
A.A(o,f,j.i("~(1)?").a(new A.iL(r,o)),!1,j.c)}r=e.getElementById("btn-resident-gallery-trigger")
if(r!=null){r=J.aa(r)
j=r.$ti
A.A(r.a,r.b,j.i("~(1)?").a(new A.iM(l,q)),!1,j.c)}r=e.getElementById("btn-resident-camera-trigger")
if(r!=null){r=J.aa(r)
j=r.$ti
A.A(r.a,r.b,j.i("~(1)?").a(new A.iN(l,p)),!1,j.c)}r=e.getElementById("btn-resident-photo-trigger")
if(r!=null){r=J.aa(r)
j=r.$ti
A.A(r.a,r.b,j.i("~(1)?").a(new A.iO(l,q)),!1,j.c)}r=e.getElementById("btn-resident-photo-replace-gallery")
if(r!=null){r=J.aa(r)
j=r.$ti
A.A(r.a,r.b,j.i("~(1)?").a(new A.iP(l,q)),!1,j.c)}r=e.getElementById("btn-resident-photo-replace-camera")
if(r!=null){r=J.aa(r)
j=r.$ti
A.A(r.a,r.b,j.i("~(1)?").a(new A.iD(l,p)),!1,j.c)}r=e.getElementById("btn-resident-photo-remove")
if(r!=null){r=J.aa(r)
j=r.$ti
A.A(r.a,r.b,j.i("~(1)?").a(new A.iE(g,k,a1)),!1,j.c)}r=new A.iQ(g,a1)
if(m!=null){j=t.E
A.A(m,"input",j.i("~(1)?").a(r),!1,j.c)}if(n!=null){j=t.E
A.A(n,f,j.i("~(1)?").a(r),!1,j.c)}s=new A.iF(g,k,m,n,s,l)
g.at=s
s.$0()
i=e.getElementById("btn-resident-submit-log")
if(i!=null){s=J.aa(i)
r=s.$ti
A.A(s.a,s.b,r.i("~(1)?").a(new A.iG(g,a1,k)),!1,r.c)}h=e.getElementById("btn-retry-db-connection")
if(h!=null){e=J.aa(h)
a1=e.$ti
A.A(e.a,e.b,a1.i("~(1)?").a(new A.iH(g)),!1,a1.c)}}}
A.jL.prototype={
$0(){var s,r,q,p,o=document.getElementById("phone-time")
if(o!=null){s=new A.ag(Date.now(),0,!1)
r=A.og(s)
q=B.a.bc(B.e.l(A.oh(s)),2,"0")
p=r>=12?"PM":"AM"
r=B.e.aT(r,12)
J.r(o,""+(r!==0?r:12)+":"+q+" "+p)}},
$S:2}
A.jE.prototype={
$1(a){t.D.a(a)
return this.a.$0()},
$S:17}
A.jF.prototype={
$1(a){t.V.a(a)
return $.K().bw()},
$S:1}
A.jG.prototype={
$1(a){var s,r,q=this.a
q.aA()
q.r=q.d=q.a=null;++q.x
q.y=!1;++q.Q
q.z=!1
s=q.fx
s===$&&A.ay()
r=t.h
A.eL(r,r,"T","querySelectorAll")
s=s.querySelectorAll("[disabled]")
s.toString
s=new A.bm(s,t.U)
s.q(s,new A.jD())
q.as=null
s=q.ax
if(s!=null)s.a3(0)
s=window.localStorage
s.toString
B.j.C(s,"waterhall_resident_report_draft")
q.RG=q.c=null;++q.p2
q.ok=null
q.p3=!1
s=document
r=s.getElementById("transaction-list")
if(r!=null)J.cH(r).X(0)
q.f=null
r=s.getElementById("collection-review-modal")
if(r!=null)J.it(r)
r=s.getElementById("modal-collect-payment")
if(r!=null){r=r.style
r.display="none"}q.b8()
if(a)q.aj("Session expired. Please sign in again.",s.getElementById("login-error-msg"))},
$S:41}
A.jD.prototype={
$1(a){var s
t.h.a(a)
s=a.getAttribute("disabled")
a.removeAttribute("disabled")
return s},
$S:8}
A.jH.prototype={
$1(a){var s=this.a
s.dk(t.P.a(a))
if(s.b==="view-transactions"&&s.a!=null)s.al()},
$S:9}
A.jI.prototype={
$1(a){t.D.a(a)
return this.a.b0()},
$S:17}
A.jJ.prototype={
$1(a){t.D.a(a)
return this.a.c4()},
$S:17}
A.jK.prototype={
$1(a){var s=document
s.toString
s=s.visibilityState||s.mozVisibilityState||s.msVisibilityState||s.webkitVisibilityState
s.toString
if(s==="visible"){s=this.a
s.c4()
s.b0()}},
$S:3}
A.j5.prototype={
$1(a){t.V.a(a)
return this.a.d9()},
$S:1}
A.j1.prototype={
$1(a){return J.k(t.P.a(a),"sync_error")!=null},
$S:0}
A.j2.prototype={
$1(a){return J.k(t.P.a(a),"sync_error")!=null},
$S:0}
A.j3.prototype={
$1(a){return this.ec(t.V.a(a))},
ec(a){var s=0,r=A.T(t.H),q=this,p
var $async$$1=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:q.b.disabled=!0
p=$.K()
s=2
return A.y(p.a4(),$async$$1)
case 2:s=3
return A.y(p.az(),$async$$1)
case 3:if(p.O())q.a.d9()
return A.R(null,r)}})
return A.S($async$$1,r)},
$S:4}
A.j4.prototype={
$1(a){t.V.a(a)
return B.E.dP(this.a)},
$S:1}
A.j7.prototype={
$1(a){var s,r,q,p
t.V.a(a).preventDefault()
s=document
r=t.G.a(s.getElementById("login-password"))
q=s.getElementById("web-eye-show")
p=s.getElementById("web-eye-hide")
if(r!=null)if(r.type==="password"){B.f.scB(r,"text")
if(q!=null){s=q.style
s.display="none"}if(p!=null){s=p.style
s.display="block"}s=this.a.style
s.color="#F4D03F"}else{B.f.scB(r,"password")
if(q!=null){s=q.style
s.display="block"}if(p!=null){s=p.style
s.display="none"}s=this.a.style
s.color="var(--text-muted)"}},
$S:1}
A.j8.prototype={
$1(a){return this.eh(t.V.a(a))},
eh(a9){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
var $async$$1=A.U(function(b0,b1){if(b0===1){o.push(b1)
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
i=A.cr(a).gai().h(0,"role")
if(J.aj(l)===0||J.aj(k)===0){m.a.aj("Both Username and Password are required.",m.e)
s=1
break}a=m.f
a.disabled=!0
p=4
a3=$.K()
a4=t.N
s=7
return A.y(a3.ad("/api/login",!1,"POST",A.a3(["Content-Type","application/json"],a4,a4),B.c.V(A.a3(["username",l,"password",k],a4,a4))),$async$$1)
case 7:h=b1
a5=h.responseText
a5.toString
g=t.P.a(B.c.L(0,a5))
f=A.x(J.k(g,"access_token"))
e=A.x(J.k(g,"role"))
d=A.x(J.k(g,"id"))
c=A.x(J.k(g,"name"))
a5=!0
if(!J.j(e,"admin"))if(!(J.j(i,"resident")&&!J.j(e,"resident")))a5=!J.j(i,"resident")&&!J.j(e,"worker")
if(a5){m.a.aj("Use the portal assigned to your account role.",m.e)
n=[1]
s=5
break}a3.dv()
a5=m.a
a5.f=null
s=8
return A.y(a3.aW(f),$async$$1)
case 8:s=9
return A.y(A.dj(),$async$$1)
case 9:s=10
return A.y(a3.be(),$async$$1)
case 10:if(a3.O()){a3=window.localStorage.getItem("waterhall_jwt")
a6=f
a6=a3==null?a6!=null:a3!==a6
a3=a6}else a3=!0
if(a3){n=[1]
s=5
break}if(J.j(e,"resident")){if(J.j(i,"worker")){a5.aj("This terminal is for Field Workers only. Residents must use the Resident App.",m.e)
n=[1]
s=5
break}a3=window.localStorage
a3.toString
B.j.C(a3,"waterhall_session")
a5.a=null
a5.cN(d)
a5.aA()
a5.bn("resident")
a3=m.e
if(a3!=null){a3=a3.style
a3.display="none"}a5.F(B.a.cE("Logged in as Resident: ",c))
n=[1]
s=5
break}else{if(J.j(i,"resident")){a5.aj("This portal is for Residents only. Field Workers must use the Worker App.",m.e)
n=[1]
s=5
break}a3=J.aj(j)!==0?j:"Purok 1"
a4=A.a3(["worker_id",d,"name",c,"role","Collector","selected_zone",a3],a4,t.z)
a5.a=a4
a3=window.localStorage
a3.toString
a3.setItem("waterhall_session",B.c.V(a4))
a4=window.localStorage
a4.toString
B.j.C(a4,"waterhall_resident_session")
a5.aA()
a5.bn("worker")
a3=m.e
if(a3!=null){a3=a3.style
a3.display="none"}a3=a5.a
a3.toString
a5.cL(a3)
a5.F(B.a.cE("Logged in as Tech: ",c))
n=[1]
s=5
break}n.push(6)
s=5
break
case 4:p=3
a8=o.pop()
a3=A.an(a8)
if(a3 instanceof A.aG){b=a3
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
case 6:a=$.K().y==="Session expired. Please sign in again."?"Session expired. Please sign in again.":"Unable to sign in. Check your credentials and connection. Existing offline sessions resume when the app opens."
m.a.aj(a,m.e)
case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$$1,r)},
$S:4}
A.j9.prototype={
$1(a){return this.eg(t.V.a(a))},
eg(a){var s=0,r=A.T(t.H),q=this,p
var $async$$1=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:p=q.a
p.aA()
s=2
return A.y($.K().bw(),$async$$1)
case 2:p.F("Signed out of Tech session")
return A.R(null,r)}})
return A.S($async$$1,r)},
$S:4}
A.jc.prototype={
$1(a){return this.ef(t.V.a(a))},
ef(a){var s=0,r=A.T(t.H),q=this,p
var $async$$1=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:p=q.a
p.aA()
s=2
return A.y($.K().bw(),$async$$1)
case 2:p.F("Signed out of Resident Portal")
return A.R(null,r)}})
return A.S($async$$1,r)},
$S:4}
A.jd.prototype={
$1(a){var s,r
t.h.a(a)
s=J.aa(a)
r=s.$ti
A.A(s.a,s.b,r.i("~(1)?").a(new A.j6(this.a,a)),!1,r.c)},
$S:8}
A.j6.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.b.getAttribute("data-target")
if(s==null)s=""
this.a.ak(s)},
$S:1}
A.je.prototype={
$1(a){return this.a.aQ()},
$S:3}
A.jf.prototype={
$1(a){return this.a.aQ()},
$S:3}
A.jg.prototype={
$1(a){return this.a.aQ()},
$S:3}
A.jh.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.ak("view-directory")
s.c=null},
$S:1}
A.ji.prototype={
$1(a){A.qe(t.V.a(a).target)},
$S:1}
A.jj.prototype={
$1(a){var s=0,r=A.T(t.H),q,p=this,o,n,m,l,k,j
var $async$$1=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:k=p.a
j=k.c
if(j==null){s=1
break}o=p.b.checked
n=o===!0?"leak":"normal"
s=3
return A.y($.K().bg(j,n),$async$$1)
case 3:if(c!=null){j=document
m=j.getElementById("modal-flow-rate")
if(m!=null)J.r(m,"Manual report")
k.e2(n)
k.F(n==="leak"?"Leak status saved for synchronization.":"Resolved status saved for synchronization.")
o=k.c
o.toString
k.dR(o)
l=t.aa.a(j.getElementById("log-resolved"))
if(l!=null)B.f.sdu(l,n==="normal")}case 1:return A.R(q,r)}})
return A.S($async$$1,r)},
$S:22}
A.ja.prototype={
$1(a){return this.ee(t.V.a(a))},
ee(a){var s=0,r=A.T(t.H),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$$1=A.U(function(b,a0){if(b===1)return A.Q(a0,r)
for(;;)switch(s){case 0:c=p.a
if(c.c==null||c.a==null){s=1
break}o=document
n=t.r.a(o.getElementById("log-desc"))
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
break}g=A.a3(["house_id",c.c,"worker_id",c.a.h(0,"worker_id"),"purok",c.a.h(0,"selected_zone"),"description",l,"status_resolved",h,"date",new A.ag(Date.now(),0,!1).aa().a9()],t.N,t.z)
i=$.K()
s=3
return A.y(i.bs(g),$async$$1)
case 3:s=h?4:5
break
case 4:f=c.c
f.toString
s=6
return A.y(i.bg(f,"normal"),$async$$1)
case 6:e=k.a(o.getElementById("modal-leak-toggle"))
if(e!=null)B.f.sdu(e,!1)
c.e2("normal")
case 5:k=c.c
k.toString
if(i.a2(k)!=null){d=o.getElementById("modal-flow-rate")
if(d!=null)J.r(d,"Manual reading")}if(!m)B.p.sH(n,"")
c.F("Maintenance Log committed to database!")
o=c.c
o.toString
c.dR(o)
c.bG()
case 1:return A.R(q,r)}})
return A.S($async$$1,r)},
$S:4}
A.jb.prototype={
$1(a){return this.ed(t.V.a(a))},
ed(a){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b
var $async$$1=A.U(function(a0,a1){if(a0===1){o.push(a1)
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
h=h==null?null:B.a.u(h)
f=h}k=f==null?"":f
e=g==null?null:g.value
j=e==null?"Everyone":e
if(J.aj(k)===0){c.F("Message cannot be empty")
s=1
break}i=window.localStorage.getItem("waterhall_jwt")
h=m.b
h.disabled=!0
p=4
s=7
return A.y($.K().bq(k,A.x(c.a.h(0,"name")),j),$async$$1)
case 7:if(!J.j(i,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}if(l!=null)B.p.sH(l,"")
c.F("Announcement queued for "+A.d(j)+". Pending items retry when online.")
n.push(6)
s=5
break
case 4:p=3
b=o.pop()
if(J.j(i,window.localStorage.getItem("waterhall_jwt")))c.F("Announcement was not saved. Check storage and retry.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
h.disabled=!1
s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$$1,r)},
$S:4}
A.jt.prototype={
$0(){var s,r,q=this;++q.a.k4
s=document
r=t.dH.a(s.activeElement)
if(r!=null)r.blur()
r=q.b.style
r.display="none"
q.c.reset()
q.d.hidden=!0
q.e.hidden=!0
s=s.getElementById("btn-web-forgot-password")
if(s!=null)J.rn(s)},
$S:2}
A.ju.prototype={
$1(a){var s,r,q=this
t.V.a(a).preventDefault();++q.a.k4
s=A.e5().gai().h(0,"role")==="resident"?"resident":"worker"
B.o.sH(q.b,s)
s=q.c.style
s.display="flex"
s=q.d
r=t.G.a(document.getElementById("employee-id"))
r=r==null?null:r.value
B.f.sH(s,r==null?"":r)
s.focus()},
$S:1}
A.jv.prototype={
$1(a){t.V.a(a).preventDefault()
this.a.$0()},
$S:1}
A.jw.prototype={
$1(a){if(t.mT.a(a).key==="Escape")this.a.$0()},
$S:47}
A.jx.prototype={
$1(a4){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
var $async$$1=A.U(function(a5,a6){if(a5===1){o.push(a6)
s=p}for(;;)switch(s){case 0:a4.preventDefault()
j=m.a
if(j.k3){s=1
break}i=m.b
i.hidden=!0
h=m.c
h.hidden=!0
g=m.d
f=g.checkValidity()
f.toString
if(!f){g.reportValidity().toString
s=1
break}j.k3=!0
g=m.e
g.disabled=!0
B.k.sP(g,"Resetting\u2026")
l=j.k4
p=4
f=$.K()
e=t.N
d=A.a3(["Content-Type","application/json"],e,e)
c=m.f.value
b=m.r.value
b.toString
b=B.a.u(b)
a=m.w
a0=a.value
a0.toString
a1=m.x
s=7
return A.y(f.ad("/api/recover-account",!1,"POST",d,B.c.V(A.a3(["role",c,"username",b,"reset_token",B.a.u(a0),"new_password",a1.value],e,t.x))),$async$$1)
case 7:if(!J.j(l,j.k4)){n=[1]
s=5
break}s=8
return A.y(f.bw(),$async$$1)
case 8:J.r(h,u.n)
h.hidden=!1
B.f.sH(a,"")
B.f.sH(a1,"")
j.aj(u.n,document.getElementById("login-error-msg"))
A.rW(B.a9,new A.js(j,l,m.y),t.a)
n.push(6)
s=5
break
case 4:p=3
a3=o.pop()
h=A.an(a3)
if(h instanceof A.aG){k=h
if(!J.j(l,j.k4)){n=[1]
s=5
break}if(k.a===429)h="Too many attempts. Please try again shortly."
else h=k.ge1()?"Unable to reach the server. Check your connection and retry.":"Invalid or expired code, account, or password. Contact your administrator."
J.r(i,h)
i.hidden=!1}else throw a3
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
j.k3=!1
g.disabled=!1
B.k.sP(g,"Reset Password")
s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$$1,r)},
$S:22}
A.js.prototype={
$0(){if(this.b===this.a.k4)this.c.$0()},
$S:15}
A.jk.prototype={
$1(a){return J.c9(t.h.a(a)).C(0,"active")},
$S:8}
A.kr.prototype={
$1(a){return J.c9(t.h.a(a)).C(0,"active")},
$S:8}
A.ks.prototype={
$1(a){return B.a.u(A.x(a)).length!==0},
$S:10}
A.kt.prototype={
$1(a){var s
A.x(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:11}
A.kA.prototype={
$1(a){var s
t.h.a(a)
s=J.J(a)
if(a.getAttribute("data-target")===this.a)s.gaq(a).m(0,"active")
else s.gaq(a).C(0,"active")},
$S:8}
A.kB.prototype={
$2(a,b){var s
A.x(a)
t.h.a(b)
s=J.J(b)
if(a===this.a)s.gaq(b).m(0,"active")
else s.gaq(b).C(0,"active")},
$S:48}
A.k0.prototype={
$1(a){return J.j(J.k(t.P.a(a),"current_leak_status"),"leak")},
$S:0}
A.k1.prototype={
$1(a){var s,r,q
t.P.a(a)
s=document.createElement("div")
s.className="alert-item leak"
r=s.style
r.cursor="pointer"
r=J.w(a)
q=J.J(s)
q.sU(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.d(r.h(a,"owner_name"))+" ("+A.d(r.h(a,"purok"))+")</strong><br>\n              Reported leak. Field inspection required.\n            </div>\n          ")
q=q.gaN(s)
r=q.$ti
A.A(q.a,q.b,r.i("~(1)?").a(new A.k_(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:9}
A.k_.prototype={
$1(a){t.V.a(a)
this.a.ct(A.x(J.k(this.b,"house_id")))},
$S:1}
A.k2.prototype={
$1(a){var s,r,q
t.je.a(a)
s=document.createElement("div")
s.className="alert-item quality"
r=s.style
r.cursor="pointer"
r=J.w(a)
q=J.J(s)
q.sU(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.d(r.h(a,"name"))+"</strong><br>\n              "+A.d(r.h(a,"desc"))+"\n            </div>\n          ")
q=q.gaN(s)
r=q.$ti
A.A(q.a,q.b,r.i("~(1)?").a(new A.jZ(this.a)),!1,r.c)
this.b.appendChild(s).toString},
$S:49}
A.jZ.prototype={
$1(a){var s,r
t.V.a(a)
this.a.ak("view-dashboard")
s=document.getElementById("worker-telemetry-freshness")
if(s!=null){r=!!s.scrollIntoViewIfNeeded
r.toString
if(r)s.scrollIntoViewIfNeeded()
else s.scrollIntoView()}},
$S:1}
A.k3.prototype={
$2(a,b){var s,r,q,p,o,n
A.x(b)
s=document.getElementById("pin-p"+(a+1))
if(s!=null){r=s.querySelector(".pin-bg")
q=B.b.a6(this.b,new A.jX(b))
if(r!=null)if(q){r.setAttribute("fill","var(--alert-red)")
r.setAttribute("stroke","#FFF")
r.setAttribute("stroke-width","1.5")}else{r.setAttribute("fill","var(--alert-green)")
r.removeAttribute("stroke")}p=s.style
p.cursor="pointer"
p=J.J(s)
o=t.h.a(p.fK(s,!0))
p.dT(s,o)
p=J.aa(o)
n=p.$ti
A.A(p.a,p.b,n.i("~(1)?").a(new A.jY(this.a,b)),!1,n.c)}},
$S:50}
A.jX.prototype={
$1(a){var s
t.P.a(a)
s=J.w(a)
return J.j(s.h(a,"purok"),this.a)&&J.j(s.h(a,"current_leak_status"),"leak")},
$S:0}
A.jY.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Y
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.o.sH(q,this.b)
if(p!=null)B.o.sH(p,"all")
this.a.ak("view-directory")},
$S:1}
A.k4.prototype={
$1(a){var s,r,q,p,o,n,m,l
A.x(a)
s=this.b
r=A.E(s)
q=r.i("F(1)")
r=r.i("I<1>")
p=new A.I(s,q.a(new A.jU(a)),r).gj(0)
o=new A.I(s,q.a(new A.jV(a)),r).gj(0)
r=this.a
n=J.j(r.a.h(0,"selected_zone"),a)
m=document.createElement("div")
m.className="zone-card "+(n?"assigned":"")
s=n?'<span class="zone-badge">ASSIGNED</span>':""
q=o>0?""+o+" Leaks":"Clear"
l=J.J(m)
l.sU(m,'          <div class="zone-card-header">\n            <span class="zone-name">'+a+"</span>\n            "+s+'\n          </div>\n          <div class="zone-stats">\n            <span>Meters: <strong>'+p+'</strong></span>\n            <span class="zone-leak-count">'+q+"</span>\n          </div>\n        ")
l=l.gaN(m)
q=l.$ti
A.A(l.a,l.b,q.i("~(1)?").a(new A.jW(r,a)),!1,q.c)
this.c.appendChild(m).toString},
$S:77}
A.jU.prototype={
$1(a){return J.j(J.k(t.P.a(a),"purok"),this.a)},
$S:0}
A.jV.prototype={
$1(a){var s
t.P.a(a)
s=J.w(a)
return J.j(s.h(a,"purok"),this.a)&&J.j(s.h(a,"current_leak_status"),"leak")},
$S:0}
A.jW.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Y
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.o.sH(q,this.b)
if(p!=null)B.o.sH(p,"all")
this.a.ak("view-directory")},
$S:1}
A.k5.prototype={
$1(a){var s,r,q,p,o
t.P.a(a)
s=B.b.dz(this.b,new A.jS(a),new A.jT())
r=J.w(s)
q=r.gT(s)?r.h(s,"owner_name"):"Unknown Household"
p=document.createElement("div")
r=J.w(a)
p.className="log-card "+(J.j(r.h(a,"status_resolved"),!0)?"resolved":"pending")
o=this.a.a5(r.h(a,"date"))
J.dk(p,'            <div class="log-card-header">\n              <span>'+A.d(q)+'</span>\n              <span style="font-size:10px; color:var(--text-muted)">'+o+'</span>\n            </div>\n            <div class="log-card-desc">'+A.d(r.h(a,"description"))+"</div>\n          ")
this.c.appendChild(p).toString},
$S:9}
A.jS.prototype={
$1(a){var s="house_id"
return J.j(J.k(t.P.a(a),s),J.k(this.a,s))},
$S:0}
A.jT.prototype={
$0(){return A.ap(t.N,t.z)},
$S:30}
A.k7.prototype={
$1(a){var s,r,q,p,o
t.P.a(a)
s=J.w(a)
r=this.a
q=B.a.A(J.M(s.h(a,"owner_name")).toLowerCase(),r)||B.a.A(J.M(s.h(a,"account_number")).toLowerCase(),r)||B.a.A(J.M(s.h(a,"house_id")).toLowerCase(),r)
r=this.b
p=r==="all"||J.j(s.h(a,"purok"),r)
r=this.c
o=r==="all"||J.j(s.h(a,"current_leak_status"),r)
return q&&p&&o},
$S:0}
A.k8.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j="current_leak_status",i="current_m3_usage"
t.P.a(a)
s=document.createElement("div")
r=J.w(a)
s.className="household-card "+(J.j(r.h(a,j),"leak")?"has-leak":"")
q=A.d(r.h(a,"owner_name"))
p=A.d(r.h(a,"purok"))
o=A.d(r.h(a,"account_number"))
n=A.d(r.h(a,i))
m=A.d(r.h(a,j))
l=J.j(r.h(a,j),"leak")?'<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> Leak':'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Normal'
k=J.J(s)
k.sU(s,'          <div class="household-info">\n            <span class="household-name">'+q+'</span>\n            <div class="household-meta">\n              <span class="household-purok">'+p+'</span>\n              <span class="household-acct">'+o+'</span>\n            </div>\n            <div class="household-usage">Usage this Month: <strong>'+n+' m\xb3</strong></div>\n          </div>\n          <div class="household-status-section">\n            <span class="status-indicator '+m+'">\n              '+l+'\n            </span>\n            <span class="household-flow">Meter: <span>'+A.d(r.h(a,i))+" m\xb3</span></span>\n          </div>\n        ")
k=k.gaN(s)
r=k.$ti
A.A(k.a,k.b,r.i("~(1)?").a(new A.k6(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:9}
A.k6.prototype={
$1(a){t.V.a(a)
this.a.ct(A.x(J.k(this.b,"house_id")))},
$S:1}
A.jM.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.ak("view-directory")
s.c=null},
$S:1}
A.kl.prototype={
$2(a,b){A.a9(a)
A.a9(b)
return a>b?a:b},
$S:53}
A.km.prototype={
$1(a){var s,r,q
t.if.a(a)
s=a.a
r=a.b
q=this.a.length
return A.a3(["x",20+(q===1?0.5:s/(q-1))*300,"y",80-r/this.b*60,"val",r,"label",""+(s+1)],t.N,t.K)},
$S:54}
A.kn.prototype={
$1(a){var s
t.c.a(a)
s=J.w(a)
return B.d.G(A.a9(s.h(a,"x")),1)+","+B.d.G(A.a9(s.h(a,"y")),1)},
$S:31}
A.ko.prototype={
$1(a){var s
t.c.a(a)
s=J.w(a)
return"L "+B.d.G(A.a9(s.h(a,"x")),1)+","+B.d.G(A.a9(s.h(a,"y")),1)},
$S:31}
A.kp.prototype={
$1(a){var s,r
t.c.a(a)
s=this.a
r=J.w(a)
s.a=s.a+('        <text x="'+A.d(r.h(a,"x"))+'" y="96" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-weight="600">'+A.d(r.h(a,"label"))+'</text>\n        <line x1="'+A.d(r.h(a,"x"))+'" y1="'+A.d(r.h(a,"y"))+'" x2="'+A.d(r.h(a,"x"))+'" y2="80" stroke="rgba(249,115,22,0.2)" stroke-width="1" stroke-dasharray="2 2" />\n        <circle cx="'+A.d(r.h(a,"x"))+'" cy="'+A.d(r.h(a,"y"))+'" r="4" fill="var(--white)" stroke="'+this.b+'" stroke-width="2" />\n        <text x="'+A.d(r.h(a,"x"))+'" y="'+A.d(A.a9(r.h(a,"y"))-8)+'" text-anchor="middle" fill="var(--navy-primary)" font-size="9" font-weight="700">'+A.d(r.h(a,"val"))+"m\xb3</text>\n      ")},
$S:56}
A.k9.prototype={
$1(a){return J.j(J.k(t.P.a(a),"house_id"),this.a)},
$S:0}
A.ka.prototype={
$1(a){var s,r,q,p,o,n,m="status_resolved"
t.P.a(a)
s=document.createElement("div")
r=J.w(a)
s.className="log-card "+(J.j(r.h(a,m),!0)?"resolved":"pending")
q=this.a.a5(r.h(a,"date"))
p=A.d(r.h(a,"worker_id"))
o=A.d(r.h(a,"description"))
n=J.j(r.h(a,m),!0)?"var(--alert-green)":"var(--amber-safety)"
r=J.j(r.h(a,m),!0)?"Resolved":"In Progress (Active Monitoring)"
J.dk(s,'          <div class="log-card-header">\n            <span>Tech: <strong>'+p+'</strong></span>\n            <span style="font-size:10px; color:var(--text-muted)">'+q+'</span>\n          </div>\n          <div class="log-card-desc">'+o+'</div>\n          <div style="font-size: 9px; font-weight:700; color:'+n+'; margin-top:4px; text-transform:uppercase">\n            Status: '+r+"\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:9}
A.kb.prototype={
$1(a){return B.a.u(A.x(a)).length!==0},
$S:10}
A.kc.prototype={
$1(a){var s
A.x(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:11}
A.kd.prototype={
$1(a){var s,r="worker_id"
t.P.a(a)
s=J.w(a)
return J.j(s.h(a,r),this.a.a.h(0,r))&&J.j(s.h(a,"status_resolved"),!0)},
$S:0}
A.jz.prototype={
$1(a){var s=this.a
s.p1=0
s.al()
s.cr()},
$S:3}
A.jA.prototype={
$1(a){var s,r=this.a;++r.p2
r.p1=0
s=r.R8
if(s!=null)s.a3(0)
r.al()
r.R8=A.e2(B.aa,new A.jy(r))},
$S:3}
A.jy.prototype={
$0(){return this.a.cr()},
$S:2}
A.jB.prototype={
$1(a){var s,r,q
t.V.a(a)
s=this.a
r=s.ci().length
q=s.p1+25
if(r>q){s.p1=q
s.al()}else s.bb(!0)},
$S:1}
A.jC.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.p1=B.e.cf(s.p1-25,0,1e6)
s.al()},
$S:1}
A.jl.prototype={
$1(a){var s,r
t.P.a(a)
s=this.a
if(s==="All"||J.j(J.k(a,"sync_status"),s)){s=J.w(a)
r=s.h(a,"family_head_name")
if(r==null){s=$.K().a2(A.d(s.h(a,"house_id")))
s=s==null?null:J.k(s,"owner_name")}else s=r
s=B.a.A(J.M(s==null?"":s).toLowerCase(),this.b)}else s=!1
return s},
$S:0}
A.kq.prototype={
$2(a,b){var s,r,q
A.x(a)
if(b==null||A.d(b).length===0)return
s=document
r=s.createElement("div")
r.toString
q=s.createElement("span")
q.toString
B.u.sP(q,a)
r.appendChild(q).toString
s=s.createElement("span")
s.toString
B.u.sP(s,A.d(b))
r.appendChild(s).toString
this.a.appendChild(r).toString},
$S:6}
A.jm.prototype={
$1(a){var s,r,q,p,o,n,m
t.V.a(a)
s=this.a.ry=this.b
r=document
q=t.q.a(r.getElementById("bill-meter-search"))
B.f.sH(q,"")
p=s==="name"
q.placeholder=p?"Type any part of the household name":"Type any part of HH-\u2026"
q.setAttribute("aria-label",p?"Search by Name":"Search by ID")
for(p=["name","id"],o=0;o<2;++o){n=p[o]
m=r.getElementById("bill-search-"+n)
if(m!=null)m.setAttribute("aria-pressed",""+(n===s))}s=r.getElementById("bill-meter-results")
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.jn.prototype={
$1(a){return this.a.cM()},
$S:3}
A.jo.prototype={
$1(a){return this.a.cM()},
$S:3}
A.jp.prototype={
$1(a){return this.a.bI()},
$S:3}
A.jq.prototype={
$1(a){var s=t.mV.a(A.qe(t.V.a(a).target)),r=!1
if(s!=null)if(!B.f.A(this.a,s)){r=this.b
r=r!=null&&!J.o0(r,s)}if(r){r=this.b.style
r.display="none"}},
$S:1}
A.jr.prototype={
$1(a){t.V.a(a)
return this.a.bi()},
$S:1}
A.ku.prototype={
$1(a){var s
t.P.a(a)
s=J.k(a,this.a.ry==="name"?"owner_name":"house_id")
return B.a.A(J.M(s==null?"":s).toLowerCase(),this.b)},
$S:0}
A.kv.prototype={
$1(a){var s,r,q,p=this,o="house_id"
t.V.a(a)
s=p.c
r=J.w(s)
B.f.sH(p.b,A.d(r.h(s,"owner_name"))+" ("+A.d(r.h(s,o))+")")
q=p.d.style
q.display="none"
p.a.bF(A.ao(r.h(s,o)))},
$S:1}
A.jO.prototype={
$1(a){var s
t.P.a(a)
s=J.w(a)
return J.j(s.h(a,"house_id"),this.a.RG)&&!B.a.N(A.d(s.h(a,"bill_id")),"PENDING-")},
$S:0}
A.jP.prototype={
$2(a,b){var s=t.P
s.a(a)
return B.a.a1(A.d(J.k(s.a(b),"date")),A.d(J.k(a,"date")))},
$S:12}
A.jQ.prototype={
$1(a){return!J.j(J.k(t.P.a(a),"status"),"Paid")},
$S:0}
A.jR.prototype={
$2(a,b){var s
A.a9(a)
s=A.np(J.k(t.P.a(b),"total_due"))
return a+(s==null?0:s)},
$S:58}
A.kC.prototype={
$2(a,b){var s=document.getElementById(a)
if(s!=null)J.r(s,b)},
$S:7}
A.jN.prototype={
$1(a){var s,r,q,p,o,n="status"
t.P.a(a)
s=document.createElement("div")
r=J.w(a)
s.className="bill-record-card "+A.d(r.h(a,n))
q=this.a.a5(r.h(a,"date"))
p=A.d(r.h(a,"billing_month"))
o=J.j(r.h(a,n),"Paid")?"var(--alert-green)":"var(--amber-safety)"
J.dk(s,'          <div class="bill-record-header">\n            <span>Cycle: '+p+'</span>\n            <span style="color:'+o+'">'+J.M(r.h(a,n)).toUpperCase()+'</span>\n          </div>\n          <div class="bill-record-details">\n            <span>Readings: '+B.d.G(A.a9(r.h(a,"previous_reading")),1)+" \u2192 "+B.d.G(A.a9(r.h(a,"current_reading")),1)+" m\xb3</span>\n            <strong>\u20b1"+B.d.G(A.a9(r.h(a,"total_due")),2)+'</strong>\n          </div>\n          <div style="font-size:9px;color:var(--text-muted);margin-top:2px;display:flex;justify-content:space-between">\n            <span>'+q+" ("+A.d(r.h(a,"bill_id"))+")</span>\n            <span>Tech: "+A.d(r.h(a,"billed_by"))+"</span>\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:9}
A.kz.prototype={
$0(){J.c9(this.a).C(0,"show")},
$S:2}
A.kw.prototype={
$1(a){return J.c9(t.h.a(a)).C(0,"active")},
$S:8}
A.kx.prototype={
$1(a){return B.a.u(A.x(a)).length!==0},
$S:10}
A.ky.prototype={
$1(a){var s
A.x(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:11}
A.j0.prototype={
$4(a,b,c,d){var s,r=this.a&&typeof b=="number"&&isFinite(b),q=r?B.d.G(b,c)+d:"N/A",p=a==null
if((p?null:a.textContent)!==q)if(!p)J.r(a,q)
if(!p){p=a.parentElement
if(p!=null){p=p.querySelector("small")
if(p!=null){p=p.style
p.toString
s=r?"":"none"
p.display=s}}}},
$3(a,b,c){return this.$4(a,b,c,"")},
$S:59}
A.ke.prototype={
$1(a){return B.a.u(A.x(a)).length!==0},
$S:10}
A.kf.prototype={
$1(a){var s
A.x(a)
s=a.length
if(s!==0){if(0>=s)return A.e(a,0)
s=a[0]}else s=""
return s},
$S:11}
A.kg.prototype={
$1(a){return A.d(J.k(t.P.a(a),"status")).toLowerCase()!=="paid"},
$S:0}
A.kh.prototype={
$1(a){return J.j(J.k(t.P.a(a),"billing_month"),this.a)},
$S:0}
A.ki.prototype={
$2(a,b){var s=document.getElementById(a)
if(s!=null)J.r(s,b)},
$S:7}
A.kj.prototype={
$2(a,b){return a==null?"--":B.d.G(A.bL(A.d(a)),b)},
$S:60}
A.kk.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c="status",b="payment_date"
t.P.a(a)
s=document
r=s.createElement("div")
q=J.w(a)
r.className="bill-record-card "+A.d(q.h(a,c))
p=this.a
o=p.a5(q.h(a,"date"))
n=A.d(q.h(a,"billing_month"))
m=J.j(q.h(a,c),"Paid")?"var(--alert-green)":"var(--amber-safety)"
l=J.M(q.h(a,c))
k=B.d.G(A.a9(q.h(a,"previous_reading")),1)
j=B.d.G(A.a9(q.h(a,"current_reading")),1)
i=B.d.G(A.a9(q.h(a,"consumption")),1)
h=B.d.G(A.a9(q.h(a,"total_due")),2)
g=A.d(q.h(a,"bill_id"))
if(J.j(q.h(a,c),"Paid")){f=q.h(a,b)
f=J.M(f==null?"":f).length!==0}else f=!1
p=f?" | Paid: "+p.a5(q.h(a,b)):""
J.dk(r,'        <div class="bill-record-header">\n          <span>Cycle: '+n+'</span>\n          <span style="color:'+m+'">'+l.toUpperCase()+'</span>\n        </div>\n        <div class="bill-record-details">\n          <span>Usage: '+k+" \u2192 "+j+" m\xb3 ("+i+" m\xb3)</span>\n          <strong>\u20b1"+h+'</strong>\n        </div>\n        <div style="font-size:9px;color:var(--text-muted);margin-top:2px;">\n          Bill Ref ID: '+g+" | Issued: "+o+p+"\n        </div>\n      ")
e=t.eO.a(q.h(a,"billing_breakdown"))
d=s.createElement("p")
s=d.style
s.fontSize="11px"
if(e==null)s="Legacy bill: rate breakdown unavailable. Original total retained."
else{s=J.w(e)
s="Recorded: base PHP "+A.d(s.h(e,"base_rate"))+" (includes "+A.d(s.h(e,"included_m3"))+" m\xb3), excess "+A.d(s.h(e,"excess_m3"))+" m\xb3 x PHP "+A.d(s.h(e,"excess_rate"))+" = PHP "+A.d(s.h(e,"excess_charge"))+", environmental fee PHP "+A.d(s.h(e,"environmental_fee"))+"."}B.m.sP(d,s)
r.appendChild(d).toString
this.b.appendChild(r).toString},
$S:9}
A.iW.prototype={
$1(a){var s,r
t.h.a(a)
s=J.aa(a)
r=s.$ti
A.A(s.a,s.b,r.i("~(1)?").a(new A.iV(a)),!1,r.c)},
$S:8}
A.iV.prototype={
$1(a){var s,r,q,p,o
t.V.a(a).preventDefault()
s=t.k.a(this.a)
r=document
r.toString
q=s.getAttribute("data-"+new A.hd(new A.ee(s)).b5("togglePassword"))
p=t.G.a(r.getElementById(q==null?"":q))
if(p==null)return
o=p.type==="password"
B.f.scB(p,o?"text":"password")
B.k.sP(s,o?"Hide":"Show")},
$S:1}
A.iX.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.iY.prototype={
$1(a){return this.eb(t.V.a(a))},
eb(a){var s=0,r=A.T(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h,g,f
var $async$$1=A.U(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:g=o.a
if(g!=null){g=g.style
g.display="flex"}g=o.b
k=g==null
if(!k)J.r(g,"Loading available puroks...")
q=3
s=6
return A.y($.K().fC("/api/puroks",!1),$async$$1)
case 6:n=c
m=t.g.a(document.getElementById("reg-res-purok"))
j=m
j.children.toString
J.ip(j)
j=n.responseText
j.toString
j=J.aF(t.R.a(J.k(B.c.L(0,j),"puroks")))
while(j.p()){l=j.gt(j)
J.rk(m,A.t7(A.d(l),A.d(l),null,!1))}if(!k){A.eL(t.af,t.h,"T","querySelectorAll")
i=new A.bm(J.rg(m,"option"),t.gp)
J.r(g,new A.e3(t.e3.a(i.aw(i)),t.eG).gj(0)===0?"No puroks configured. Contact the administrator.":"")}q=1
s=5
break
case 3:q=2
f=p.pop()
if(!k)J.r(g,"Registration needs an internet connection. Please retry.")
s=5
break
case 2:s=1
break
case 5:return A.R(null,r)
case 1:return A.Q(p.at(-1),r)}})
return A.S($async$$1,r)},
$S:4}
A.iZ.prototype={
$1(a){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c
var $async$$1=A.U(function(b,a0){if(b===1){o.push(a0)
s=p}for(;;)switch(s){case 0:a.preventDefault()
h=m.a
g=!0
if(h!=null){f=h.disabled
f.toString
if(!f){g=m.b.checkValidity()
g.toString
g=!g}}if(g){s=1
break}l=new A.j_()
if(!J.j(l.$1("reg-password"),l.$1("reg-verify-password"))){h=m.c
if(h!=null)J.r(h,"Passwords do not match.")
s=1
break}h.disabled=!0
g=m.c
f=g==null
if(!f)J.r(g,"Submitting registration...")
p=4
e=t.N
s=7
return A.y($.K().ad("/api/residents/register",!1,"POST",A.a3(["Content-Type","application/json"],e,e),B.c.V(A.a3(["owner_name",J.oW(l.$1("reg-res-name")),"contact",J.oW(l.$1("reg-contact")),"purok",t.g.a(document.getElementById("reg-res-purok")).value,"password",l.$1("reg-password"),"verify_password",l.$1("reg-verify-password")],e,t.x))),$async$$1)
case 7:k=a0
e=k.responseText
e.toString
j=B.c.L(0,e)
m.b.reset()
if(!f)J.r(g,"Registration submitted. Resident ID: "+A.d(J.k(j,"house_id"))+". Meter ID: "+A.d(J.k(j,"account_number"))+". Wait for Admin approval before signing in.")
n.push(6)
s=5
break
case 4:p=3
c=o.pop()
e=A.an(c)
if(e instanceof A.aG){i=e
if(!f){if(i.a===409)f="This mobile number is already registered. Contact the administrator."
else f=i.a===400?"Check your name, Philippine mobile number, purok, and matching passwords (12-128 characters).":"Registration was not confirmed. Retry with the same contact, or ask Admin to check its status."
J.r(g,f)}}else if(!f)J.r(g,"Unable to submit registration. Please try again.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
h.disabled=!1
s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$$1,r)},
$S:22}
A.j_.prototype={
$1(a){var s=t.q.a(document.getElementById(a)).value
return s==null?"":s},
$S:11}
A.iA.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=this.a
if(s.a==null||s.c==null||$.K().r.h(0,"allow_worker_collection")!=="true"){s.F("Field payment collection is disabled. Payments must be settled in person at Barangay Hall.")
return}r=t.G.a(document.getElementById("collect-hh-name"))
if(r!=null){q=$.K()
p=s.c
p.toString
p=q.a2(p)
if(p==null)q=null
else{q=J.k(p,"owner_name")
q=q==null?null:J.M(q)}if(q==null){s=s.c
s.toString}else s=q
B.f.sH(r,s)}s=this.b
if(s!=null)B.f.sH(s,"")
s=this.c
if(s!=null){s=s.style
s.display="flex"}},
$S:1}
A.iB.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.iC.prototype={
$1(a){return this.ea(t.V.a(a))},
ea(a1){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0
var $async$$1=A.U(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:b=m.a
a=!0
if(b.c!=null)if(b.a!=null){a=m.b.disabled
a.toString}if(a){s=1
break}a=m.c
a=a==null?null:a.value
f=A.dW(a==null?"":a)
l=f==null?0:f
a=l
if(typeof a!=="number"){q=a.hx()
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
return A.y($.K().bD(l,j,h,k),$async$$1)
case 7:g=a3
if(!J.j(i,window.localStorage.getItem("waterhall_jwt"))||b.a==null){n=[1]
s=5
break}d=m.e
if(d!=null){d=d.style
d.display="none"}b.F("Collection recorded! TxID: "+A.d(J.k(g,"transaction_id")))
b.ct(h)
n.push(6)
s=5
break
case 4:p=3
a0=o.pop()
if(J.j(i,window.localStorage.getItem("waterhall_jwt")))b.F("Collection not saved. Check device storage and existing pending payments.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
a.disabled=!1
s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$$1,r)},
$S:4}
A.iT.prototype={
$0(){var s,r,q,p,o,n,m,l=this.a
if(l.d==null||!$.K().O())return
try{s=window.localStorage
s.toString
r=A.b6()
q=this.b
q=q==null?null:q.value
p=this.c
p=p==null?null:p.value
o=l.f
n=document.getElementById("resident-photo-name")
n=n==null?null:n.textContent
s.setItem("waterhall_resident_report_draft",B.c.V(A.a3(["owner",r,"category",q,"description",p,"photo",o,"file_name",n,"operation_id",l.as,"picker_pending",l.r!=null],t.N,t.X)))}catch(m){l.F("Device storage is full. Keep this screen open to retain your draft.")}},
$S:2}
A.iU.prototype={
$2(a,b){var s,r,q,p,o
this.a.f=a
s=document
r=s.getElementById("resident-photo-name")
if(r!=null)J.r(r,b)
q=s.getElementById("resident-photo-preview")
r=q==null
if(!r)J.cH(q).X(0)
if(!r){p=q.style
p.display="block"}o=A.pb(a)
B.J.sfB(o,"Selected evidence preview")
if(!r)q.appendChild(o).toString
r=s.getElementById("resident-photo-preview-card")
if(r!=null){r=r.style
r.display="block"}s=s.getElementById("resident-photo-pickers")
if(s!=null){s=s.style
s.display="none"}},
$S:7}
A.iw.prototype={
e7(a2,a3){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$$2=A.U(function(a4,a5){if(a4===1){o.push(a5)
s=p}for(;;)switch(s){case 0:a=m.a
a0=++a.x
a.y=!0
l=window.localStorage.getItem("waterhall_jwt")
p=4
k=A.mc("^data:image/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$").dw(a2)
if(k==null)throw A.b(B.w)
if(a2.length<=2796302){e=k.b
if(2>=e.length){q=A.e(e,2)
n=[1]
s=5
break}e=e[2]
e.toString
e=B.v.aB(e).length>2097152}else e=!0
if(e){e=A.O("Photo too large")
throw A.b(e)}j=A.pb(null)
i=new A.bH(new A.W($.V,t.cU),t.ou)
e=t.h
d=t.E
c=d.i("~(1)?")
d=d.c
h=A.A(e.a(j),"load",c.a(new A.ix(i)),!1,d)
g=A.A(e.a(j),"error",c.a(new A.iy(i)),!1,d)
p=7
J.rE(j,a2)
s=10
return A.y(i.a.dZ(0,B.G),$async$$2)
case 10:e=j.naturalWidth
e.toString
d=j.naturalHeight
d.toString
if(e*d>12e6)throw A.b(B.w)
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
case 9:if(!J.j(a0,a.x)||!J.j(l,window.localStorage.getItem("waterhall_jwt"))||a.d==null){n=[1]
s=5
break}a.as=null
m.b.$2(a2,a3)
m.c.$0()
n.push(6)
s=5
break
case 4:p=3
a1=o.pop()
f=A.an(a1)
if(!J.j(a0,a.x)||!J.j(l,window.localStorage.getItem("waterhall_jwt"))||a.d==null){n=[1]
s=5
break}a.F(f instanceof A.bq?"Photo must be at most 2 MiB.":"Invalid image. Use a JPEG, PNG or WebP photo.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.j(a0,a.x))a.y=!1
s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$$2,r)},
$2(a,b){return this.e7(a,b)},
$S:61}
A.ix.prototype={
$1(a){var s=this.a
if((s.a.a&30)===0)s.fL(0)},
$S:3}
A.iy.prototype={
$1(a){var s=this.a
if((s.a.a&30)===0)s.bu(B.w)},
$S:3}
A.iI.prototype={
$4(a,b,c,d){var s=this.a
if(s.d==null||a==null||!J.j(a,s.r))return
s.r=null
this.b.$0()
if(typeof d=="string"&&d.length!==0){s.F(d)
return}if(typeof b=="string"&&b.length!==0){s=typeof c=="string"&&c.length!==0?c:"Selected photo"
this.c.$2(b,s)}},
$C:"$4",
$R:4,
$S:62}
A.iS.prototype={
$2(a,b){var s,r,q,p,o,n="NativePhotoPicker",m=this.a
if(m.d==null||m.z||!$.K().O())return
r=$.bu()
if(!r.ba(n)){m=a==null
if(!m)B.f.sH(a,"")
if(!m)a.click()
return}if(m.r!=null)return
s=""+1000*Date.now()+"-"+ ++m.w
m.r=s
q=this.b
q.$0()
try{p=t.N
r.h(0,n).ap("postMessage",A.B([B.c.V(A.a3(["request_id",s,"source",b],p,p))],t.s))}catch(o){m.r=null
q.$0()
m.F("Could not open the photo picker. Please try again.")}},
$S:63}
A.iz.prototype={
$0(){var s,r,q=this,p=q.a;++p.x
p.y=!1
p.f=null
p=q.b
if(p!=null)B.f.sH(p,"")
p=q.c
if(p!=null)B.f.sH(p,"")
p=q.d
if(p!=null)B.f.sH(p,"")
p=document
s=p.getElementById("resident-photo-name")
if(s!=null)J.r(s,"No file chosen")
r=p.getElementById("resident-photo-preview")
if(r!=null)J.cH(r).X(0)
s=p.getElementById("resident-photo-preview-card")
if(s!=null){s=s.style
s.display="none"}p=p.getElementById("resident-photo-pickers")
if(p!=null){p=p.style
p.display="flex"}},
$S:2}
A.iR.prototype={
$1(a){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c
var $async$$1=A.U(function(b,a0){if(b===1){o.push(a0)
s=p}for(;;)switch(s){case 0:d=m.a
if(d.d==null||d.z){s=1
break}h=a==null?null:a.files
if(h==null||h.length===0){s=1
break}l=B.ad.gD(h)
g=l.size
g.toString
if(g>2097152){d.F("Photo must be at most 2 MiB.")
s=1
break}g=l.type
if(!B.b.A(A.B(["image/jpeg","image/png","image/webp"],t.s),g.toLowerCase())){d.F("Use a JPEG, PNG or WebP photo.")
s=1
break}k=window.localStorage.getItem("waterhall_jwt")
j=++d.x
d.y=!0
p=4
g=new FileReader()
g.toString
B.ae.hf(g,l)
i=g
s=7
return A.y(new A.ct(t.O.a(i),"load",!1,t.h6).gD(0).dZ(0,B.G),$async$$1)
case 7:if(!J.j(j,d.x)||!J.j(k,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}g=A.x(J.rv(i))
f=l.name
f.toString
s=8
return A.y(m.b.$2(g,f),$async$$1)
case 8:n.push(6)
s=5
break
case 4:p=3
c=o.pop()
if(J.j(j,d.x)&&J.j(k,window.localStorage.getItem("waterhall_jwt")))d.F("Could not load selected photo.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.j(j,d.x))d.y=!1
s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$$1,r)},
$S:64}
A.iJ.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iK.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iL.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iM.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iN.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"camera")},
$S:1}
A.iO.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iP.prototype={
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
if(s.z)return
s.as=s.r=null
this.b.$0()
this.c.$0()
s.F("Photo removed.")},
$S:1}
A.iQ.prototype={
$1(a){var s,r=this.a
r.as=null
s=r.ax
if(s!=null)s.a3(0)
r.ax=A.e2(B.ab,this.b)},
$S:3}
A.iF.prototype={
$0(){var s,r,q,p,o=this,n="category",m=o.a
if(m.d==null)return
o.b.$0()
try{r=window.localStorage.getItem("waterhall_resident_report_draft")
s=B.c.L(0,r==null?"{}":r)
if(!J.j(J.k(s,"owner"),A.b6()))return
r=o.c
if(r!=null){q=A.ao(J.k(s,"description"))
B.p.sH(r,q==null?"":q)}if(typeof J.k(s,n)=="string"){r=o.d
if(r!=null)B.o.sH(r,A.ao(J.k(s,n)))}m.as=A.ao(J.k(s,"operation_id"))
if(typeof J.k(s,"photo")=="string"){r=A.x(J.k(s,"photo"))
q=A.ao(J.k(s,"file_name"))
if(q==null)q="Selected photo"
o.e.$2(r,q)}if(J.j(J.k(s,"picker_pending"),!0))o.f.$2(null,"recover")}catch(p){m.F("Draft could not be restored. Please select your photo again.")}},
$S:2}
A.iG.prototype={
$1(a){return this.e9(t.V.a(a))},
e9(a9){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
var $async$$1=A.U(function(b0,b1){if(b0===1){o.push(b1)
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
c=c==null?null:B.a.u(c)
a0=c}j=a0==null?"":a0
if(J.aj(j)===0){a7.F("Please provide details for the report!")
s=1
break}if(!$.K().O()){s=1
break}i=window.localStorage.getItem("waterhall_jwt")
if(a7.as==null)a7.as=A.im()
c=a7.ax
if(c!=null)c.a3(0)
m.b.$0()
a7.z=!0
h=++a7.Q
c=a7.fx
c===$&&A.ay()
a1=t.h
A.eL(a1,a1,"T","querySelectorAll")
c=c.querySelectorAll("button, input, textarea, select")
c.toString
a1=t.U
a2=a1.i("I<m.E>")
a3=A.a4(new A.I(new A.bm(c,a1),a1.i("F(m.E)").a(new A.iv()),a2),a2.i("h.E"))
g=a3
for(c=g,a1=c.length,a4=0;a4<c.length;c.length===a1||(0,A.as)(c),++a4)c[a4].setAttribute("disabled","")
p=4
c=$.K()
a1=a7.d
a1.toString
a2=a7.f
a5=a7.as
a5.toString
s=7
return A.y(c.bj(a1,k,j,a2,a5),$async$$1)
case 7:f=b1
if(!J.j(i,window.localStorage.getItem("waterhall_jwt"))||a7.d==null){n=[1]
s=5
break}if(!f)throw A.b(B.q)
a7.F("Report submitted successfully.")
if(l!=null)B.p.sH(l,"")
m.c.$0()
a7.as=null
c=window.localStorage
c.toString
B.j.C(c,"waterhall_resident_report_draft")
n.push(6)
s=5
break
case 4:p=3
a8=o.pop()
c=A.an(a8)
if(c instanceof A.aG){e=c
if(e.b||!J.j(i,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}if(e.a===413)c="Photo is too large. Choose a smaller photo; your draft is retained."
else if(e.a===400||e.a===422)c="Report or photo was rejected. Review your draft and retry."
else c=e.a===403?"This account cannot submit this report. Your draft is retained.":"Report was not confirmed. Your draft and photo are retained; retry when connected."
a7.F(c)}else if(J.j(i,window.localStorage.getItem("waterhall_jwt")))a7.F("Report was not confirmed. Your draft and photo are retained.")
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.j(h,a7.Q)){a7.z=!1
for(a7=g,c=a7.length,a4=0;a4<a7.length;a7.length===c||(0,A.as)(a7),++a4){d=a7[a4]
d.removeAttribute("disabled")}}s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$$1,r)},
$S:4}
A.iv.prototype={
$1(a){var s
t.h.a(a)
s=a.id
s.toString
if(s!=="btn-resident-logout"){s=a.hasAttribute("disabled")
s.toString
s=!s}else s=!1
return s},
$S:65}
A.iH.prototype={
$1(a){return this.e8(t.V.a(a))},
e8(a){var s=0,r=A.T(t.H),q=this,p
var $async$$1=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:p=q.a
p.F("Testing server connection...")
s=2
return A.y($.K().be(),$async$$1)
case 2:if(c)p.F("Server connected! Online sync active.")
else p.F("Server unreachable. Continuing in offline mode.")
return A.R(null,r)}})
return A.S($async$$1,r)},
$S:4}
A.aG.prototype={
ge1(){var s=this.a
return s==null||s===429||s>=500},
l(a){return"API request was not completed."}}
A.kK.prototype={
dn(a){return this.ch=this.ch.dt(new A.kN()).dY(new A.kO(a),t.H)},
aW(a){return this.eo(a)},
eo(a){var s=0,r=A.T(t.H),q=1,p=[],o=this,n,m,l
var $async$aW=A.U(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:m=++o.ay
window.localStorage.setItem("waterhall_jwt",a)
o.y=null
q=3
s=6
return A.y(o.dn(a),$async$aW)
case 6:if(!J.j(m,o.ay)||!o.O())throw A.b(B.i)
q=1
s=5
break
case 3:q=2
l=p.pop()
s=J.j(m,o.ay)?7:8
break
case 7:s=9
return A.y(o.ar(!0),$async$aW)
case 9:case 8:throw A.b(B.i)
s=5
break
case 2:s=1
break
case 5:return A.R(null,r)
case 1:return A.Q(p.at(-1),r)}})
return A.S($async$aW,r)},
ar(a){var s=0,r=A.T(t.H),q=1,p=[],o=this,n,m,l,k
var $async$ar=A.U(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:++o.ay
o.z=!1
o.as=o.Q=null
o.ax.X(0)
n=window
n.toString
m=document.createEvent("Event")
m.toString
J.rf(m,"waterhall-session-ending",!0,!0)
n.dispatchEvent(m).toString
o.x=!1
m=window.localStorage
m.toString
B.j.C(m,"waterhall_jwt")
m=window.localStorage
m.toString
B.j.C(m,"waterhall_session")
m=window.localStorage
m.toString
B.j.C(m,"waterhall_resident_session")
o.dv()
o.y=a?"Session expired. Please sign in again.":null
n=o.CW
if(n!=null)n.$1(a)
n=o.cx
n.m(0,o.Y())
q=3
s=6
return A.y(o.dn(null),$async$ar)
case 6:q=1
s=5
break
case 3:q=2
k=p.pop()
o.y="Unable to clear native session storage. Please restart the app."
n.m(0,o.Y())
s=5
break
case 2:s=1
break
case 5:return A.R(null,r)
case 1:return A.Q(p.at(-1),r)}})
return A.S($async$ar,r)},
bw(){return this.ar(!1)},
O(){if(A.cF())return!0
if(window.localStorage.getItem("waterhall_jwt")!=null||window.localStorage.getItem("waterhall_session")!=null||window.localStorage.getItem("waterhall_resident_session")!=null)this.ar(!0)
return!1},
bY(){var s=this
s.x=!1
s.y="Server unavailable. Pending operations remain saved and will retry."
s.cx.m(0,s.Y())},
ad(a,b,c,d,e){return this.fD(a,b,c,t.lG.a(d),e)},
dq(a){return this.ad(a,!0,"GET",null,null)},
cd(a,b,c,d){return this.ad(a,!0,b,c,d)},
fC(a,b){return this.ad(a,b,"GET",null,null)},
fD(a9,b0,b1,b2,b3){var s=0,r=A.T(t.la),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
var $async$ad=A.U(function(b5,b6){if(b5===1){o.push(b6)
s=p}for(;;)switch(s){case 0:a5=A.e5().dU(a9)
a6=J.ru(a5)
a7=A.e5()
if(a6!==a7.gcu(a7)||!B.a.N(J.oU(a5),"/api/"))throw A.b(B.q)
if(b0&&!m.O())throw A.b(B.i)
l=m.ay
k=window.localStorage.getItem("waterhall_jwt")
a6=new XMLHttpRequest()
a6.toString
j=a6
i=new A.bH(new A.W($.V,t.ax),t.cz)
h=A.B([],t.dw)
g=null
f=new A.kV(i)
p=4
J.rz(j,b1,a9)
if(b2==null){a6=t.N
a6=A.ap(a6,a6)}else a6=b2
a6.q(0,J.rx(j))
if(b0)J.rF(j,"Authorization","Bearer "+A.d(k))
a6=t.O
a7=t.gn
a2=t.I
J.o_(h,A.A(a6.a(j),"load",a7.a(new A.kR(i,j)),!1,a2))
J.o_(h,A.A(a6.a(j),"error",a7.a(new A.kS(f)),!1,a2))
J.o_(h,A.A(a6.a(j),"abort",a7.a(new A.kT(f)),!1,a2))
g=A.e2(B.a8,new A.kU(f,j))
J.rC(j,b3)
s=7
return A.y(i.a,$async$ad)
case 7:e=b6
if(b0)a6=!J.j(l,m.ay)||!m.O()
else a6=!1
if(a6)throw A.b(B.i)
if(e.status===401&&b0){m.ar(!0)
throw A.b(B.U)}a6=!0
if(e.status!=null){a7=e.status
a7.toString
if(a7>=200){a6=e.status
a6.toString
a6=a6>=300}}if(a6){d=null
if(!b0&&J.oU(a5)==="/api/login"){d=e.status===429?"Too many attempts. Please try again in 5 minutes.":"Invalid credentials."
try{a6=e.responseText
c=B.c.L(0,a6==null?"{}":a6)
b=J.k(c,"attempts_remaining")
if(e.status===401&&A.eI(b)&&b>=0&&b<=4)d="Invalid credentials. "+A.d(b)+" attempts remaining."
if(e.status===403)d=J.j(J.k(c,"account_status"),"pending")?"Registration is pending Admin approval.":"Registration was rejected. Contact the administrator."}catch(b4){}}a6=e.status===0?null:e.status
a7=d
throw A.b(new A.aG(a6,!1,a7))}q=e
n=[1]
s=5
break
n.push(6)
s=5
break
case 4:p=3
a8=o.pop()
a=A.an(a8)
if(!J.j(l,m.ay))throw A.b(B.i)
a0=a instanceof A.aG?a:B.q
if(!a0.b&&a0.ge1())m.bY()
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
return A.y(J.iq(a1),$async$ad)
case 11:case 9:a6.length===a7||(0,A.as)(a6),++a4
s=8
break
case 10:s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$ad,r)},
Y(){var s,r,q,p,o,n,m=this,l=m.aS().length+m.ah().length,k=m.x
if(!k)s="offline"
else if(m.db)s="syncing"
else s=l>0?"pending_sync":"synced"
r=m.db||m.cy
q=A.cF()
p=m.aS()
o=A.E(p)
o=new A.I(p,o.i("F(1)").a(new A.l9()),o.i("I<1>")).gj(0)
p=m.ah()
n=A.E(p)
return A.a3(["status",s,"isOnline",k,"isSyncing",r,"authenticated",q,"reviewCount",o+new A.I(p,n.i("F(1)").a(new A.la()),n.i("I<1>")).gj(0),"pendingCount",l,"error",m.y],t.N,t.z)},
fz(){var s=window.localStorage.getItem("waterhall_unsynced_actions")
s=J.ca(t.j.a(B.c.L(0,s==null?"[]":s)),new A.kQ(),t.P)
s=A.a4(s,s.$ti.i("a5.E"))
return s},
ah(){var s=this.fz(),r=A.E(s),q=r.i("I<1>")
s=A.a4(new A.I(s,r.i("F(1)").a(new A.ll()),q),q.i("h.E"))
return s},
av(a,b){return this.he(a,t.P.a(b))},
he(a,b){var s=0,r=A.T(t.H),q=this,p
var $async$av=A.U(function(c,d){if(c===1)return A.Q(d,r)
for(;;)switch(s){case 0:if(!q.O())throw A.b(B.i)
p=b.h(0,"operation_id")
if(p==null)p=A.im()
b.k(0,"operation_id",p)
s=2
return A.y(A.c6("actions",new A.lm(p,a,b)),$async$av)
case 2:q.cx.m(0,q.Y())
s=q.x?3:4
break
case 3:s=5
return A.y(q.a4(),$async$av)
case 5:case 4:return A.R(null,r)}})
return A.S($async$av,r)},
a4(){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
var $async$a4=A.U(function(a7,a8){if(a7===1){o.push(a8)
s=p}for(;;)switch(s){case 0:if(m.cy||!m.O()){s=1
break}m.cy=!0
l=m.ay
e=m.ah()
B.b.aI(e,new A.lq())
k=e
p=4
d=k,d=A.e0(d,0,A.cC(100,"count",t.S),A.E(d).c),c=d.$ti,d=new A.bh(d,d.gj(0),c.i("bh<a5.E>")),b=t.N,c=c.i("a5.E"),a=t.f,a0=t.z,a1=t.t
case 7:if(!d.p()){s=8
break}a2=d.d
j=a2==null?c.a(a2):a2
if(!J.j(l,m.ay)||!m.O()){s=8
break}s=9
return A.y(A.c6("actions",new A.lr(j)),$async$a4)
case 9:p=11
s=14
return A.y(m.cd(A.x(J.k(j,"endpoint")),"POST",A.a3(["Content-Type","application/json"],b,b),B.c.V(J.k(j,"body"))),$async$a4)
case 14:i=a8
a2=i.responseText
h=B.c.L(0,a2==null?"{}":a2)
if(!J.j(l,m.ay)||!m.O()){s=8
break}if(!J.j(J.k(h,"status"),"success"))throw A.b(B.V)
s=J.j(J.k(j,"endpoint"),"/api/billing-records/add")?15:16
break
case 15:a2=A.ak(a.a(J.k(j,"body")),b,a0)
a3=A.fo(b,a0)
a3.S(0,a2)
g=a3
J.aE(g,"operation_id",J.k(j,"operation_id"))
J.aE(g,"bill_id",J.k(h,"bill_id"))
J.aE(g,"owner",J.k(j,"owner"))
J.aE(g,"sync_status","Synced")
J.aE(g,"status","Unpaid")
s=17
return A.y(m.b6(A.B([g],a1)),$async$a4)
case 17:case 16:s=18
return A.y(A.c6("actions",new A.ls(j)),$async$a4)
case 18:p=4
s=13
break
case 11:p=10
a5=o.pop()
a2=A.an(a5)
s=a2 instanceof A.aG?19:21
break
case 19:f=a2
if(!f.b){a2=f.a
a2=a2==null||a2===429||a2>=500}else a2=!0
if(a2)throw a5
s=22
return A.y(A.c6("actions",new A.lt(j)),$async$a4)
case 22:s=20
break
case 21:throw a5
case 20:s=13
break
case 10:s=4
break
case 13:s=7
break
case 8:if(J.j(l,m.ay))m.y=B.b.a6(m.ah(),new A.lu())?"Saved operations need review. Their original data remains on this device.":null
n.push(6)
s=5
break
case 4:p=3
a6=o.pop()
if(J.j(l,m.ay)&&A.cF()&&m.x)m.y="Pending operations remain saved for retry."
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.cy=!1
m.cx.m(0,m.Y())
s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$a4,r)},
dv(){var s,r,q,p=this
for(s=B.M.gaC(B.M),s=s.gB(s);s.p();){r=s.gt(s)
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
p.b=A.ap(s,r)
p.r=A.ap(s,s)
p.w=A.ap(s,r)},
f5(){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=window.localStorage.getItem("waterhall_households")
if(s!=null)i.a=A.aO(t.R.a(B.c.L(0,s)),!0,t.P)
r=window.localStorage.getItem("waterhall_central_assets")
if(r!=null)i.b=A.ak(t.f.a(B.c.L(0,r)),t.N,t.z)
q=window.localStorage.getItem("waterhall_maintenance_logs")
if(q!=null)i.c=A.aO(t.R.a(B.c.L(0,q)),!0,t.P)
p=window.localStorage.getItem("waterhall_workers")
if(p!=null)i.d=A.aO(t.R.a(B.c.L(0,p)),!0,t.P)
o=window.localStorage.getItem("waterhall_billing_records")
if(o!=null)i.e=A.aO(t.R.a(B.c.L(0,o)),!0,t.P)
n=window.localStorage.getItem("waterhall_announcements")
if(n!=null)i.f=A.aO(t.R.a(B.c.L(0,n)),!0,t.P)
m=window.localStorage.getItem("waterhall_billing_config")
if(m!=null)i.w=A.ak(t.f.a(B.c.L(0,m)),t.N,t.z)
l=window.localStorage.getItem("waterhall_payment_settings")
k=t.N
if(l!=null)i.r=A.ak(t.f.a(B.c.L(0,l)),k,k)
else i.r=A.ak($.qB,k,k)}catch(j){A.c7("Unable to load local cache.")}},
aJ(){var s,r,q=this
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
s.setItem("waterhall_billing_config",B.c.V(q.w))}catch(r){A.c7("Unable to save local cache.")}},
aP(a){return this.hh(a)},
be(){return this.aP("")},
hh(a1){var s=0,r=A.T(t.y),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0
var $async$aP=A.U(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:if(!m.O()){q=!1
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
return A.y(m.dq(k),$async$aP)
case 7:j=a3
f=j.responseText
f.toString
i=f
if(!J.j(i,m.as)){f=t.P
h=f.a(B.c.L(0,i))
e=J.k(h,"billingConfig")
if(e==null){e=t.z
e=A.ap(e,e)}d=t.f
c=t.N
b=t.z
m.w=A.ak(d.a(e),c,b)
e=t.R
m.a=A.aO(e.a(J.k(h,"households")),!0,f)
m.b=A.ak(d.a(J.k(h,"centralAssets")),c,b)
m.c=A.aO(e.a(J.k(h,"maintenanceLogs")),!0,f)
m.d=A.aO(e.a(J.k(h,"workers")),!0,f)
m.e=A.aO(e.a(J.k(h,"billingRecords")),!0,f)
if(J.o1(h,"announcements"))m.f=A.aO(e.a(J.k(h,"announcements")),!0,f)
if(J.o1(h,"paymentSettings"))m.r=A.ak(d.a(J.k(h,"paymentSettings")),c,c)
m.as=i;++m.at
m.ax.X(0)
m.aJ()}m.x=!0
m.cx.m(0,m.Y())
s=8
return A.y(m.a4(),$async$aP)
case 8:if(m.x&&m.O())m.az()
f=m.x&&A.cF()
q=f
n=[1]
s=5
break
n.push(6)
s=5
break
case 4:p=3
a0=o.pop()
g=A.an(a0)
if(!(g instanceof A.aG)||!g.b)m.bY()
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
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$aP,r)},
ae(){var s=0,r=A.T(t.y),q,p=this,o,n,m
var $async$ae=A.U(function(a,b){if(a===1)return A.Q(b,r)
for(;;)switch(s){case 0:p.O()
A.ml(B.F,new A.lf(p))
o=window
o.toString
n=t.oV
m=t.A
A.A(o,"focus",n.a(new A.lg(p)),!1,m)
o=window
o.toString
B.S.cc(o,"waterhall-session-expired",new A.lh(p))
o=window
o.toString
B.S.cc(o,"waterhall-request-unavailable",new A.li(p))
s=3
return A.y(A.dj(),$async$ae)
case 3:p.f5()
if(p.b.a===0)p.b=A.ak($.vt,t.N,t.z)
if(p.r.a===0){o=t.N
p.r=A.ak($.qB,o,o)}o=window
o.toString
A.A(o,"online",n.a(new A.lj(p)),!1,m)
o=window
o.toString
A.A(o,"offline",n.a(new A.lk(p)),!1,m)
s=4
return A.y(p.be(),$async$ae)
case 4:q=b
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$ae,r)},
ei(){var s,r,q,p=window.localStorage.getItem("waterhall_offline_collections")
if(p==null)return A.B([],t.t)
try{s=t.j.a(B.c.L(0,p))
r=J.ca(s,new A.kY(),t.P)
r=A.a4(r,r.$ti.i("a5.E"))
return r}catch(q){r=A.B([],t.t)
return r}},
aS(){var s=this.ei(),r=A.E(s),q=r.i("I<1>")
r=A.a4(new A.I(s,r.i("F(1)").a(new A.l8()),q),q.i("h.E"))
return r},
bD(a,b,c,a0){var s=0,r=A.T(t.P),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d
var $async$bD=A.U(function(a1,a2){if(a1===1)return A.Q(a2,r)
for(;;)switch(s){case 0:if(!p.O())throw A.b(B.i)
o=p.r.h(0,"allow_worker_collection")
if((o==null?null:o.toLowerCase())!=="true")throw A.b(A.O("Field payment collection is disabled under the Barangay-only payment policy. All payments must be made at the Barangay Hall."))
n=new A.ag(Date.now(),0,!1).aa()
m=A.im()
l=A.a3(["transaction_id",m,"bill_id",null,"house_id",c,"amount_collected",a,"date",n.a9(),"collected_by",b,"payment_method",a0,"sync_status","PENDING","synced_at",null],t.N,t.X)
s=3
return A.y(A.c6("collections",new A.lo(c,b,l)),$async$bD)
case 3:o=p.cx
o.m(0,p.Y())
k=B.a.u(c.toUpperCase())
for(j=p.e,i=j.length,h=0;h<j.length;j.length===i||(0,A.as)(j),++h){g=j[h]
f=J.w(g)
e=f.h(g,"house_id")
d=B.a.u(J.M(e==null?"":e).toUpperCase())
e=f.h(g,"bill_id")
B.a.u(J.M(e==null?"":e).toUpperCase())
e=d===k&&!J.j(f.h(g,"status"),"Paid")
if(e){f.k(g,"status","Pending sync")
f.k(g,"payment_status","Pending sync")}}p.aJ()
A.c7("[OFFLINE STORE] Collection recorded locally: "+m+" for "+c+" (\u20b1"+A.d(a)+"). Status: PENDING.")
if(p.x)p.az()
else o.m(0,p.Y())
q=l
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$bD,r)},
az(){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d
var $async$az=A.U(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:if(m.db||!m.O()){s=1
break}i=m.aS()
B.b.aI(i,new A.lv())
l=A.e0(i,0,A.cC(100,"count",t.S),A.E(i).c).aw(0)
if(J.aj(l)===0){m.cx.m(0,m.Y())
s=1
break}m.db=!0
h=m.cx
h.m(0,m.Y())
k=m.ay
p=4
g=l
f=A.E(g)
j=new A.a1(g,f.i("@(1)").a(new A.lw()),f.i("a1<1,@>")).e_(0)
s=7
return A.y(A.c6("collections",new A.lx(j)),$async$az)
case 7:s=8
return A.y(m.ab(l,k),$async$az)
case 8:if(J.j(k,m.ay)&&m.O())m.y=B.b.a6(m.aS(),new A.ly())?"Some collections need review. Unacknowledged payments remain saved.":null
n.push(6)
s=5
break
case 4:p=3
d=o.pop()
if(J.j(k,m.ay)&&A.cF()&&m.x)m.y="Sync not confirmed. Pending records remain saved for retry."
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
m.db=!1
h.m(0,m.Y())
s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$az,r)},
ab(a,b){return this.ft(t.p.a(a),b)},
ft(a,b){var s=0,r=A.T(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c
var $async$ab=A.U(function(a0,a1){if(a0===1){o.push(a1)
s=p}for(;;)switch(s){case 0:if(b!==n.ay||!n.O())throw A.b(B.i)
m=null
p=4
g=t.N
s=7
return A.y(n.cd("/api/collections/sync","POST",A.a3(["Content-Type","application/json"],g,g),B.c.V(A.a3(["collections",a],g,t.p))),$async$ab)
case 7:l=a1
f=l.responseText
k=t.P.a(B.c.L(0,f==null?"{}":f))
j=J.k(k,"synced_ids")
if(J.j(J.k(k,"status"),"success")&&t.j.b(j)){g=J.rH(j,g)
e=A.cm(g.$ti.i("h.E"))
e.S(0,g)}else e=A.od(g)
m=e
p=2
s=6
break
case 4:p=3
c=o.pop()
g=A.an(c)
s=g instanceof A.aG?8:10
break
case 8:i=g
if(i.b||!B.b.A(A.B([400,403,404,409,422],t.b),i.a))throw c
g=a.length
s=g>1?11:12
break
case 11:h=g/2|0
s=13
return A.y(n.ab(B.b.cP(a,0,h),b),$async$ab)
case 13:s=14
return A.y(n.ab(B.b.ep(a,h),b),$async$ab)
case 14:s=1
break
case 12:if(b!==n.ay||!n.O())throw A.b(B.i)
g=i.a===409?"Bill or transaction conflict. Review before retrying.":"Collection rejected (HTTP "+A.d(i.a)+"). Review before retrying."
s=15
return A.y(n.b3(a,A.od(t.N),g),$async$ab)
case 15:s=1
break
s=9
break
case 10:throw c
case 9:s=6
break
case 3:s=2
break
case 6:if(b!==n.ay||!n.O())throw A.b(B.i)
s=16
return A.y(n.b3(a,m,"Server did not acknowledge this collection. Retry required."),$async$ab)
case 16:n.x=!0
case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$ab,r)},
b3(a,b,c){return this.fk(t.p.a(a),t.i.a(b),c)},
fk(a,b,c){var s=0,r=A.T(t.H),q=this,p
var $async$b3=A.U(function(d,e){if(d===1)return A.Q(e,r)
for(;;)switch(s){case 0:p=A.E(a)
s=2
return A.y(A.c6("collections",new A.kL(new A.a1(a,p.i("@(1)").a(new A.kM()),p.i("a1<1,@>")).e_(0),b,c)),$async$b3)
case 2:q.cx.m(0,q.Y())
return A.R(null,r)}})
return A.S($async$b3,r)},
bj(a,b,c,d,e){var s=0,r=A.T(t.y),q,p=this,o,n
var $async$bj=A.U(function(f,g){if(f===1)return A.Q(g,r)
for(;;)switch(s){case 0:n=t.N
s=3
return A.y(p.cd("/api/reports/add","POST",A.a3(["Content-Type","application/json"],n,n),B.c.V(A.a3(["operation_id",e,"household_id",a,"report_type",b,"description",c,"photo_base64",d],n,t.x))),$async$bj)
case 3:n=g.responseText
o=B.c.L(0,n==null?"{}":n)
n=J.w(o)
q=J.j(n.h(o,"status"),"success")&&n.h(o,"report_id")!=null
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$bj,r)},
a2(a){var s,r,q=this.a,p=B.a.u(a.toLowerCase()),o=B.a.u(A.qK(p,"hh-",""))
try{s=J.rm(q,new A.l7(p,o))
return s}catch(r){return null}},
bg(a,b){var s=0,r=A.T(t.dZ),q,p=this,o,n,m
var $async$bg=A.U(function(c,d){if(c===1)return A.Q(d,r)
for(;;)switch(s){case 0:n=p.a
m=B.b.fX(n,new A.lz(a))
s=m!==-1?3:4
break
case 3:if(!(m>=0&&m<n.length)){q=A.e(n,m)
s=1
break}o=A.ak(n[m],t.N,t.z)
o.k(0,"current_leak_status",b)
if(b==="leak")o.k(0,"leak_detected_at",new A.ag(Date.now(),0,!1).aa().a9())
else o.k(0,"leak_detected_at",null)
s=5
return A.y(p.av("/api/households/update",o),$async$bg)
case 5:B.b.k(n,m,o)
p.aJ()
if(!(m<n.length)){q=A.e(n,m)
s=1
break}q=n[m]
s=1
break
case 4:q=null
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$bg,r)},
bs(a){return this.fw(t.P.a(a))},
fw(a){var s=0,r=A.T(t.P),q,p=this,o,n
var $async$bs=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:o=p.c
n=A.ap(t.N,t.z)
n.k(0,"task_id","PENDING-"+A.im())
n.k(0,"date",new A.ag(Date.now(),0,!1).aa().a9())
n.S(0,a)
s=3
return A.y(p.av("/api/maintenance-logs/add",n),$async$bs)
case 3:B.b.cp(o,0,n)
p.aJ()
q=n
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$bs,r)},
cG(){var s,r,q,p,o,n,m,l,k=t.N,j=A.ap(k,t.P)
for(s=this.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.as)(s),++q){p=s[q]
j.k(0,A.d(J.k(p,"bill_id")),p)}for(s=this.ah(),r=A.E(s),o=r.i("F(1)").a(new A.l6()),s=B.b.gB(s),r=new A.aw(s,o,r.i("aw<1>")),o=t.f,n=t.z;r.p();){m=s.gt(0)
l=J.w(m)
p=A.ak(o.a(l.h(m,"body")),k,n)
p.k(0,"status",l.h(m,"sync_error")==null?"Pending sync":"Needs review")
j.k(0,A.d(p.h(0,"bill_id")),p)}k=j.$ti.i("b0<2>")
k=A.a4(new A.b0(j,k),k.i("h.E"))
return k},
ht(){var s,r,q,p,o,n,m,l,k,j="operation_id",i=A.b6(),h=A.B([],t.t),g=window.localStorage
g=g.getItem("waterhall_bill_history")
g=J.ca(t.j.a(B.c.L(0,g==null?"[]":g)),new A.lA(),t.P)
s=g.cQ(0,g.$ti.i("F(a5.E)").a(new A.lB(i)))
for(g=J.aF(s.a),r=new A.aw(g,s.b,s.$ti.i("aw<1>"));r.p();)B.b.m(h,g.gt(g))
for(g=this.ah(),r=A.E(g),q=r.i("F(1)").a(new A.lC()),g=B.b.gB(g),r=new A.aw(g,q,r.i("aw<1>")),q=t.f,p=t.N,o=t.z;r.p();){n=g.gt(0)
if(B.b.a6(h,new A.lD(n)))continue
m=J.w(n)
l=A.ak(q.a(m.h(n,"body")),p,o)
k=A.fo(p,o)
k.S(0,l)
k.k(0,j,m.h(n,j))
k.k(0,"sync_status",m.h(n,"sync_error")==null?"Pending Sync":"Failed Sync")
k.k(0,"status","Not yet issued")
B.b.m(h,k)}B.b.aI(h,new A.lE())
return h},
b6(a){return this.fJ(t.p.a(a))},
fJ(a){var s=0,r=A.T(t.H)
var $async$b6=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:s=2
return A.y(A.c6("bill_history",new A.kX(a,A.b6())),$async$b6)
case 2:return A.R(null,r)}})
return A.S($async$b6,r)},
b9(a,b){var s=0,r=A.T(t.P),q,p=this,o,n,m,l,k,j,i,h,g,f
var $async$b9=A.U(function(c,d){if(c===1)return A.Q(d,r)
for(;;)switch(s){case 0:g=t.N
f=A.ap(g,g)
f.k(0,"limit","25")
f.k(0,"q",b)
if(a!=null)f.k(0,"before",A.d(a))
o=A.q4(null,0,0)
n=A.q1(null,0,0,!1)
b=A.q3(null,0,0,f)
m=A.q0(null,0,0)
l=A.nd(null,"")
if(n==null)if(o.length===0)f=l!=null
else f=!0
else f=!1
if(f)n=""
f=n==null
k=!f
j=A.q2(null,0,0,null,"",k)
if(f&&!B.a.N(j,"/"))j=A.ow(j,k)
else j=A.cA(j)
i=A.eD("",o,f&&B.a.N(j,"//")?"":n,l,j,b,m).f
s=3
return A.y(p.dq("/api/worker/transactions?"+(i==null?"":i)),$async$b9)
case 3:f=d.responseText
f.toString
h=A.ak(t.f.a(B.c.L(0,f)),g,t.z)
s=4
return A.y(p.b6(A.aO(t.R.a(h.h(0,"records")),!0,t.P)),$async$b9)
case 4:q=h
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$b9,r)},
bL(a){var s=this.cG(),r=A.E(s),q=r.i("I<1>"),p=A.a4(new A.I(s,r.i("F(1)").a(new A.l4(B.a.u(a.toUpperCase()))),q),q.i("h.E"))
B.b.aI(p,new A.l5())
return p},
ej(a){var s,r,q=B.a.u(a.toUpperCase()),p=this.ah(),o=A.E(p),n=o.i("aJ<1,t<c,@>>"),m=n.i("I<h.E>"),l=A.a4(new A.I(new A.aJ(new A.I(p,o.i("F(1)").a(new A.l0()),o.i("I<1>")),o.i("t<c,@>(1)").a(new A.l1()),n),n.i("F(h.E)").a(new A.l2(q)),m),m.i("h.E"))
if(l.length!==0){B.b.aI(l,new A.l3())
s=J.k(B.b.gD(l),"current_reading")
if(typeof s=="number")return s}r=this.a2(a)
return A.np(r==null?null:J.k(r,"current_m3_usage"))},
cm(a,b){var s,r,q=B.a.u(a.toUpperCase()),p=B.a.u(b.toLowerCase())
if(B.b.a6(this.e,new A.lb(q,p)))return!0
s=this.ah()
r=A.E(s)
if(new A.aJ(new A.I(s,r.i("F(1)").a(new A.lc()),r.i("I<1>")),r.i("t<c,@>(1)").a(new A.ld()),r.i("aJ<1,t<c,@>>")).a6(0,new A.le(q,p)))return!0
return!1},
aK(a){return this.fv(t.P.a(a))},
fv(a){var s=0,r=A.T(t.P),q,p=this,o,n,m,l
var $async$aK=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:m=a.h(0,"house_id")
l=B.a.u(J.M(m==null?"":m).toUpperCase())
m=a.h(0,"billing_month")
o=B.a.u(J.M(m==null?"":m).toLowerCase())
if(p.cm(l,o))throw A.b(A.O("A bill for this cycle ("+o+") already exists or is pending synchronization."))
m=A.ap(t.N,t.z)
m.k(0,"bill_id","PENDING-"+A.im())
n=a.h(0,"date")
m.k(0,"date",n==null?new A.ag(Date.now(),0,!1).aa().a9():n)
m.k(0,"status","Pending sync")
m.k(0,"is_synced",!1)
m.S(0,a)
n=p.a2(l)
m.k(0,"family_head_name",n==null?null:J.k(n,"owner_name"))
s=3
return A.y(p.av("/api/billing-records/add",m),$async$aK)
case 3:s=p.x&&p.O()?4:6
break
case 4:s=7
return A.y(p.a4(),$async$aK)
case 7:if(!B.b.a6(p.ah(),new A.kP(m))){m.k(0,"is_synced",!0)
m.k(0,"status","Unpaid")}s=p.O()?8:9
break
case 8:s=10
return A.y(p.be(),$async$aK)
case 10:case 9:s=5
break
case 6:p.aJ()
p.cx.m(0,p.Y())
case 5:q=m
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$aK,r)},
cF(a){return this.ax.dO(0,a,new A.l_(this,a))},
cH(a){var s=a.length===0?this.f:this.cF(a),r=J.w(s)
return r.gE(s)?null:r.gD(s)},
bq(a,b,c){var s=0,r=A.T(t.H),q=this,p,o
var $async$bq=A.U(function(d,e){if(d===1)return A.Q(e,r)
for(;;)switch(s){case 0:p=t.N
o=A.a3(["message",a,"author",b,"target_audience",c,"timestamp",new A.ag(Date.now(),0,!1).aa().a9()],p,p)
s=2
return A.y(q.av("/api/announcements/add",o),$async$bq)
case 2:B.b.cp(q.f,0,o)
q.ax.X(0)
q.aJ()
return A.R(null,r)}})
return A.S($async$bq,r)},
shb(a){this.CW=t.mW.a(a)}}
A.kN.prototype={
$1(a){},
$S:14}
A.kO.prototype={
$1(a){return A.ik(this.a)},
$S:66}
A.kV.prototype={
$0(){var s=this.a
if((s.a.a&30)===0)s.bu(B.q)},
$S:2}
A.kR.prototype={
$1(a){var s
t.I.a(a)
s=this.a
if((s.a.a&30)===0)s.b7(0,this.b)},
$S:21}
A.kS.prototype={
$1(a){t.I.a(a)
return this.a.$0()},
$S:21}
A.kT.prototype={
$1(a){t.I.a(a)
return this.a.$0()},
$S:21}
A.kU.prototype={
$0(){this.a.$0()
this.b.abort()},
$S:2}
A.l9.prototype={
$1(a){return J.k(t.P.a(a),"sync_error")!=null},
$S:0}
A.la.prototype={
$1(a){return J.k(t.P.a(a),"sync_error")!=null},
$S:0}
A.kQ.prototype={
$1(a){return A.ak(t.f.a(a),t.N,t.z)},
$S:18}
A.ll.prototype={
$1(a){return J.j(J.k(t.P.a(a),"owner"),A.b6())},
$S:0}
A.lm.prototype={
$1(a){return B.b.m(t.p.a(a),A.a3(["operation_id",this.a,"owner",A.b6(),"endpoint",this.b,"body",this.c],t.N,t.z))},
$S:5}
A.lq.prototype={
$2(a,b){var s,r="last_sync_attempt",q=t.P
q.a(a)
q.a(b)
q=J.k(a,r)
q=J.M(q==null?"":q)
s=J.k(b,r)
return B.a.a1(q,J.M(s==null?"":s))},
$S:12}
A.lr.prototype={
$1(a){var s,r,q,p,o,n="operation_id"
t.p.a(a)
for(r=a.length,q=this.a,p=J.w(q),o=0;o<a.length;a.length===r||(0,A.as)(a),++o){s=a[o]
if(J.j(J.k(s,n),p.h(q,n)))J.aE(s,"last_sync_attempt",new A.ag(Date.now(),0,!1).aa().a9())}},
$S:5}
A.ls.prototype={
$1(a){return B.b.hj(t.p.a(a),new A.lp(this.a))},
$S:5}
A.lp.prototype={
$1(a){var s="operation_id"
return J.j(J.k(t.P.a(a),s),J.k(this.a,s))},
$S:0}
A.lt.prototype={
$1(a){var s,r,q,p,o,n="operation_id"
t.p.a(a)
for(r=a.length,q=this.a,p=J.w(q),o=0;o<a.length;a.length===r||(0,A.as)(a),++o){s=a[o]
if(J.j(J.k(s,n),p.h(q,n)))J.aE(s,"sync_error","Server rejected this saved operation. Review with Admin; the original operation is retained.")}},
$S:5}
A.lu.prototype={
$1(a){return J.k(t.P.a(a),"sync_error")!=null},
$S:0}
A.lf.prototype={
$1(a){t.D.a(a)
return this.a.O()},
$S:17}
A.lg.prototype={
$1(a){return this.a.O()},
$S:3}
A.lh.prototype={
$1(a){t.A.a(a)
this.a.ar(!0)},
$S:19}
A.li.prototype={
$1(a){var s
t.A.a(a)
s=this.a
if(s.O())s.bY()},
$S:19}
A.lj.prototype={
$1(a){A.c7("[NET] Internet restored. Starting automatic synchronization...")
this.a.be()},
$S:3}
A.lk.prototype={
$1(a){var s
A.c7("[NET] Internet disconnected. Entering offline mode.")
s=this.a
s.x=!1
s.cx.m(0,s.Y())},
$S:3}
A.kY.prototype={
$1(a){return A.ak(t.f.a(a),t.N,t.z)},
$S:18}
A.l8.prototype={
$1(a){var s
t.P.a(a)
s=J.w(a)
return J.j(s.h(a,"sync_status"),"PENDING")&&J.j(s.h(a,"collected_by"),A.b6())},
$S:0}
A.lo.prototype={
$1(a){t.p.a(a)
if(B.b.a6(a,new A.ln(this.a,this.b)))throw A.b(A.O("A collection for this household is already pending"))
B.b.cp(a,0,this.c)},
$S:5}
A.ln.prototype={
$1(a){var s
t.P.a(a)
s=J.w(a)
return J.j(s.h(a,"house_id"),this.a)&&J.j(s.h(a,"collected_by"),this.b)&&J.j(s.h(a,"sync_status"),"PENDING")},
$S:0}
A.lv.prototype={
$2(a,b){var s,r="last_sync_attempt",q=t.P
q.a(a)
q.a(b)
q=J.k(a,r)
q=J.M(q==null?"":q)
s=J.k(b,r)
return B.a.a1(q,J.M(s==null?"":s))},
$S:12}
A.lw.prototype={
$1(a){return J.k(t.P.a(a),"transaction_id")},
$S:34}
A.lx.prototype={
$1(a){var s,r,q,p
t.p.a(a)
for(r=a.length,q=this.a,p=0;p<a.length;a.length===r||(0,A.as)(a),++p){s=a[p]
if(J.j(J.k(s,"collected_by"),A.b6())&&q.A(0,J.k(s,"transaction_id")))J.aE(s,"last_sync_attempt",new A.ag(Date.now(),0,!1).aa().a9())}},
$S:5}
A.ly.prototype={
$1(a){return J.k(t.P.a(a),"sync_error")!=null},
$S:0}
A.kM.prototype={
$1(a){return J.k(t.P.a(a),"transaction_id")},
$S:34}
A.kL.prototype={
$1(a){var s,r,q,p,o,n,m,l="transaction_id",k="sync_status",j="sync_error"
t.p.a(a)
for(s=a.length,r=this.c,q=this.b,p=this.a,o=0;o<a.length;a.length===s||(0,A.as)(a),++o){n=a[o]
m=J.w(n)
if(!J.j(m.h(n,"collected_by"),A.b6())||!p.A(0,m.h(n,l))||!J.j(m.h(n,k),"PENDING"))continue
if(q.A(0,m.h(n,l))){m.k(n,k,"SYNCED")
m.k(n,"synced_at",new A.ag(Date.now(),0,!1).aa().a9())
m.C(n,j)}else m.k(n,j,r)}},
$S:5}
A.l7.prototype={
$1(a){var s,r,q,p,o,n,m
t.P.a(a)
n=J.w(a)
m=n.h(a,"house_id")
s=B.a.u(J.M(m==null?"":m).toLowerCase())
r=B.a.u(A.qK(s,"hh-",""))
m=n.h(a,"account_number")
q=B.a.u(J.M(m==null?"":m).toLowerCase())
m=n.h(a,"owner_name")
p=B.a.u(J.M(m==null?"":m).toLowerCase())
m=A.d(n.h(a,"purok"))
n=n.h(a,"lot")
o=B.a.u((m+" "+A.d(n==null?"":n)).toLowerCase())
n=this.a
return n===s||this.b===r||n===q||n===p||n===o},
$S:0}
A.lz.prototype={
$1(a){return J.j(J.k(t.P.a(a),"house_id"),this.a)},
$S:0}
A.l6.prototype={
$1(a){return J.j(J.k(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.lA.prototype={
$1(a){return A.ak(t.f.a(a),t.N,t.z)},
$S:18}
A.lB.prototype={
$1(a){return J.j(J.k(t.P.a(a),"owner"),this.a)},
$S:0}
A.lC.prototype={
$1(a){return J.j(J.k(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.lD.prototype={
$1(a){var s="operation_id"
return J.j(J.k(t.P.a(a),s),J.k(this.a,s))},
$S:0}
A.lE.prototype={
$2(a,b){var s,r=t.P
r.a(a)
r=J.k(r.a(b),"date")
r=J.M(r==null?"":r)
s=J.k(a,"date")
return B.a.a1(r,J.M(s==null?"":s))},
$S:12}
A.kX.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j
t.p.a(a)
for(s=this.a,r=s.length,q=this.b,p=A.E(a).i("F(1)"),o=a.$flags|0,n=t.N,m=t.z,l=0;l<s.length;s.length===r||(0,A.as)(s),++l){k=s[l]
j=p.a(new A.kW(q,k))
o&1&&A.al(a,16)
B.b.d8(a,j,!0)
j=A.fo(n,m)
j.S(0,k)
j.k(0,"owner",q)
B.b.m(a,j)}},
$S:5}
A.kW.prototype={
$1(a){var s,r,q,p="operation_id",o="bill_id"
t.P.a(a)
s=J.w(a)
if(J.j(s.h(a,"owner"),this.a)){r=this.b
q=J.w(r)
if(!(q.h(r,p)!=null&&J.j(s.h(a,p),q.h(r,p))))s=q.h(r,o)!=null&&J.j(s.h(a,o),q.h(r,o))
else s=!0}else s=!1
return s},
$S:0}
A.l4.prototype={
$1(a){var s=J.k(t.P.a(a),"house_id")
return B.a.u(J.M(s==null?"":s).toUpperCase())===this.a},
$S:0}
A.l5.prototype={
$2(a,b){var s,r,q="date",p=2026,o=t.P
o.a(a)
o.a(b)
o=J.w(a)
if(o.h(a,q)!=null){o=A.p5(A.x(o.h(a,q)))
s=o==null?A.lF(p):o}else s=A.lF(p)
o=J.w(b)
if(o.h(b,q)!=null){o=A.p5(A.x(o.h(b,q)))
r=o==null?A.lF(p):o}else r=A.lF(p)
return r.a1(0,s)},
$S:12}
A.l0.prototype={
$1(a){return J.j(J.k(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.l1.prototype={
$1(a){return A.ak(t.f.a(J.k(t.P.a(a),"body")),t.N,t.z)},
$S:35}
A.l2.prototype={
$1(a){var s=J.k(t.P.a(a),"house_id")
return B.a.u(J.M(s==null?"":s).toUpperCase())===this.a},
$S:0}
A.l3.prototype={
$2(a,b){var s,r=t.P
r.a(a)
r=J.k(r.a(b),"date")
r=J.M(r==null?"":r)
s=J.k(a,"date")
return B.a.a1(r,J.M(s==null?"":s))},
$S:12}
A.lb.prototype={
$1(a){var s,r
t.P.a(a)
s=J.w(a)
r=s.h(a,"house_id")
if(B.a.u(J.M(r==null?"":r).toUpperCase())===this.a){s=s.h(a,"billing_month")
s=B.a.u(J.M(s==null?"":s).toLowerCase())===this.b}else s=!1
return s},
$S:0}
A.lc.prototype={
$1(a){return J.j(J.k(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.ld.prototype={
$1(a){return A.ak(t.f.a(J.k(t.P.a(a),"body")),t.N,t.z)},
$S:35}
A.le.prototype={
$1(a){var s,r
t.P.a(a)
s=J.w(a)
r=s.h(a,"house_id")
if(B.a.u(J.M(r==null?"":r).toUpperCase())===this.a){s=s.h(a,"billing_month")
s=B.a.u(J.M(s==null?"":s).toLowerCase())===this.b}else s=!1
return s},
$S:0}
A.kP.prototype={
$1(a){var s="operation_id"
return J.j(J.k(t.P.a(a),s),this.a.h(0,s))},
$S:0}
A.l_.prototype={
$0(){var s=this.a.f,r=A.E(s),q=r.i("I<1>")
s=A.a4(new A.I(s,r.i("F(1)").a(new A.kZ(this.b)),q),q.i("h.E"))
return s},
$S:72}
A.kZ.prototype={
$1(a){var s,r="target_audience"
t.P.a(a)
s=J.w(a)
if(!J.j(s.h(a,r),"Everyone")){s=s.h(a,r)
s=J.j(s,this.a==="resident"?"Residents only":"Workers only")}else s=!0
return s},
$S:0}
A.nP.prototype={
$1(a){var s=0,r=A.T(t.a),q=this,p,o,n,m
var $async$$1=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:m=q.a
if(m==null||A.b6()!==m)throw A.b(A.O("Session changed before local save"))
m=q.b
if(m==="collections")p="waterhall_offline_collections"
else p=m==="bill_history"?"waterhall_bill_history":"waterhall_unsynced_actions"
o=window.localStorage.getItem(p)
o=J.ca(t.j.a(B.c.L(0,o==null?"[]":o)),new A.nO(),t.P)
n=A.a4(o,o.$ti.i("a5.E"))
q.c.$1(n)
s=2
return A.y(A.nx(m,n),$async$$1)
case 2:return A.R(null,r)}})
return A.S($async$$1,r)},
$S:73}
A.nO.prototype={
$1(a){return A.ak(t.f.a(a),t.N,t.z)},
$S:18}
A.nQ.prototype={
$1(a){},
$S:14}
A.ny.prototype={
$1(a){var s,r
t.P.a(a)
s=J.w(a)
r=s.h(a,"owner")
s=r==null?s.h(a,"collected_by"):r
return J.j(s,this.a)},
$S:0}
A.nV.prototype={
$1(a){var s,r,q,p,o,n,m,l,k="operation_id"
t.p.a(a)
for(s=a.length,r=this.b==="bill_history",q=this.a,p=0;p<a.length;a.length===s||(0,A.as)(a),++p){o=a[p]
n=J.w(o)
if(r){m=A.d(n.h(o,"owner"))
l=n.h(o,"bill_id")
n=m+"|"+A.d(l==null?n.h(o,k):l)}else{m=n.h(o,"transaction_id")
n=J.M(m==null?n.h(o,k):m)}q.dO(0,n,new A.nU(o))}B.b.X(a)
B.b.S(a,new A.b0(q,A.C(q).i("b0<2>")))},
$S:5}
A.nU.prototype={
$0(){return this.a},
$S:30};(function aliases(){var s=J.cO.prototype
s.er=s.l
s=J.bW.prototype
s.ev=s.l
s=A.m.prototype
s.ew=s.bN
s=A.h.prototype
s.cQ=s.bJ
s=A.H.prototype
s.ex=s.l
s=A.D.prototype
s.bO=s.a7
s=A.f.prototype
s.eq=s.br
s=A.er.prototype
s.ez=s.ao
s=A.aZ.prototype
s.es=s.h
s.eu=s.k
s=A.d8.prototype
s.ey=s.k})();(function installTearOffs(){var s=hunkHelpers._static_1,r=hunkHelpers._static_0,q=hunkHelpers._static_2,p=hunkHelpers._instance_2u,o=hunkHelpers._instance_0u,n=hunkHelpers.installStaticTearOff,m=hunkHelpers._instance_2i
s(A,"uZ","to",20)
s(A,"v_","tp",20)
s(A,"v0","tq",20)
r(A,"qz","uS",2)
s(A,"v1","uI",16)
q(A,"v3","uK",27)
r(A,"v2","uJ",2)
p(A.W.prototype,"gcY","eT",27)
o(A.d7.prototype,"gf7","f8",2)
s(A,"v5","uj",13)
s(A,"wJ","pa",75)
n(A,"ve",4,null,["$4"],["ty"],32,0)
n(A,"vf",4,null,["$4"],["tz"],32,0)
m(A.bz.prototype,"gem","cK",7)
s(A,"vn","nu",25)
s(A,"vm","oy",51)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.mixinHard,q=hunkHelpers.inherit,p=hunkHelpers.inheritMany
q(A.H,null)
p(A.H,[A.oa,J.cO,A.cZ,J.bd,A.a0,A.m,A.bR,A.me,A.h,A.bh,A.dL,A.aw,A.e6,A.aI,A.bG,A.G,A.c_,A.cU,A.dm,A.ek,A.fh,A.mm,A.m8,A.dv,A.eu,A.n2,A.lZ,A.dI,A.dJ,A.dH,A.fj,A.n0,A.i3,A.bk,A.hn,A.na,A.ey,A.h4,A.ev,A.at,A.bZ,A.d6,A.e8,A.mk,A.h9,A.bn,A.W,A.h5,A.ec,A.hG,A.d7,A.hR,A.eG,A.ei,A.av,A.hw,A.cy,A.aD,A.cc,A.f1,A.mC,A.mZ,A.nk,A.nh,A.ag,A.aL,A.fE,A.dY,A.mH,A.bf,A.aq,A.ad,A.hU,A.ar,A.eC,A.ms,A.ba,A.kJ,A.o6,A.ef,A.on,A.cv,A.z,A.dR,A.er,A.hW,A.cf,A.hc,A.hM,A.eF,A.aZ,A.m7,A.mW,A.iu,A.aG,A.kK])
p(J.cO,[J.fg,J.dD,J.a,J.cP,J.cQ,J.cj,J.bV])
p(J.a,[J.bW,J.ac,A.co,A.dO,A.f,A.eO,A.bP,A.be,A.Y,A.hb,A.aH,A.f6,A.f7,A.dq,A.hf,A.ds,A.hh,A.f9,A.o,A.hl,A.aN,A.fd,A.hq,A.cN,A.cT,A.fp,A.hy,A.hz,A.aP,A.hA,A.hC,A.aQ,A.hH,A.hK,A.aT,A.hN,A.aU,A.hQ,A.aA,A.hY,A.fT,A.aW,A.i_,A.fW,A.h1,A.i4,A.i6,A.i8,A.ia,A.ic,A.cS,A.b_,A.hu,A.b2,A.hE,A.fH,A.hS,A.b3,A.i1,A.eT,A.h7])
p(J.bW,[J.fF,J.bF,J.bA])
p(A.cZ,[J.ff,A.hL])
q(J.lT,J.ac)
p(J.cj,[J.dC,J.fi])
p(A.a0,[A.dF,A.bD,A.fk,A.fZ,A.fJ,A.hk,A.dE,A.eQ,A.b7,A.fB,A.e4,A.fY,A.bq,A.f0])
p(A.m,[A.d2,A.h8,A.bm,A.aC,A.fc])
p(A.d2,[A.f_,A.e3])
p(A.bR,[A.eY,A.eZ,A.fQ,A.nH,A.nJ,A.mz,A.my,A.nq,A.mR,A.mU,A.mi,A.mh,A.n4,A.m0,A.lI,A.lJ,A.lK,A.mF,A.mG,A.m6,A.m5,A.n5,A.n6,A.n7,A.kH,A.kI,A.lL,A.lM,A.lW,A.nv,A.nw,A.nB,A.nC,A.nD,A.nL,A.nS,A.nT,A.nM,A.jE,A.jF,A.jG,A.jD,A.jH,A.jI,A.jJ,A.jK,A.j5,A.j1,A.j2,A.j3,A.j4,A.j7,A.j8,A.j9,A.jc,A.jd,A.j6,A.je,A.jf,A.jg,A.jh,A.ji,A.jj,A.ja,A.jb,A.ju,A.jv,A.jw,A.jx,A.jk,A.kr,A.ks,A.kt,A.kA,A.k0,A.k1,A.k_,A.k2,A.jZ,A.jX,A.jY,A.k4,A.jU,A.jV,A.jW,A.k5,A.jS,A.k7,A.k8,A.k6,A.jM,A.km,A.kn,A.ko,A.kp,A.k9,A.ka,A.kb,A.kc,A.kd,A.jz,A.jA,A.jB,A.jC,A.jl,A.jm,A.jn,A.jo,A.jp,A.jq,A.jr,A.ku,A.kv,A.jO,A.jQ,A.jN,A.kw,A.kx,A.ky,A.j0,A.ke,A.kf,A.kg,A.kh,A.kk,A.iW,A.iV,A.iX,A.iY,A.iZ,A.j_,A.iA,A.iB,A.iC,A.ix,A.iy,A.iI,A.iR,A.iJ,A.iK,A.iL,A.iM,A.iN,A.iO,A.iP,A.iD,A.iE,A.iQ,A.iG,A.iv,A.iH,A.kN,A.kO,A.kR,A.kS,A.kT,A.l9,A.la,A.kQ,A.ll,A.lm,A.lr,A.ls,A.lp,A.lt,A.lu,A.lf,A.lg,A.lh,A.li,A.lj,A.lk,A.kY,A.l8,A.lo,A.ln,A.lw,A.lx,A.ly,A.kM,A.kL,A.l7,A.lz,A.l6,A.lA,A.lB,A.lC,A.lD,A.kX,A.kW,A.l4,A.l0,A.l1,A.l2,A.lb,A.lc,A.ld,A.le,A.kP,A.kZ,A.nP,A.nO,A.nQ,A.ny,A.nV])
p(A.eY,[A.nR,A.mA,A.mB,A.n9,A.n8,A.lP,A.mI,A.mN,A.mM,A.mK,A.mJ,A.mQ,A.mP,A.mO,A.mT,A.mj,A.mg,A.n1,A.ns,A.n3,A.nz,A.nj,A.ni,A.lG,A.jL,A.jt,A.js,A.jT,A.jy,A.kz,A.iT,A.iz,A.iF,A.kV,A.kU,A.l_,A.nU])
p(A.h,[A.n,A.aJ,A.I,A.cs,A.ej,A.da])
p(A.n,[A.a5,A.cl,A.b0,A.dG,A.eh])
p(A.a5,[A.e_,A.a1,A.hx,A.ht])
q(A.bx,A.aJ)
p(A.G,[A.d3,A.bg,A.eg,A.hs,A.h6,A.hd])
q(A.cn,A.d3)
q(A.dc,A.cU)
q(A.c1,A.dc)
q(A.dn,A.c1)
q(A.bv,A.dm)
p(A.eZ,[A.ma,A.lU,A.nI,A.nr,A.nA,A.mS,A.mV,A.m_,A.m1,A.n_,A.m4,A.ng,A.mu,A.mt,A.nf,A.ne,A.m2,A.m3,A.md,A.mf,A.mD,A.mE,A.nm,A.kE,A.kB,A.k3,A.kl,A.kq,A.jP,A.jR,A.kC,A.ki,A.kj,A.iU,A.iw,A.iS,A.lq,A.lv,A.lE,A.l5,A.l3])
q(A.dS,A.bD)
p(A.fQ,[A.fM,A.cL])
p(A.dO,[A.dM,A.au])
p(A.au,[A.em,A.eo])
q(A.en,A.em)
q(A.dN,A.en)
q(A.ep,A.eo)
q(A.b1,A.ep)
p(A.dN,[A.fu,A.fv])
p(A.b1,[A.fw,A.fx,A.fy,A.fz,A.fA,A.dP,A.dQ])
q(A.db,A.hk)
p(A.bZ,[A.d9,A.ct])
q(A.e9,A.d9)
q(A.d5,A.e9)
q(A.ea,A.d6)
q(A.bI,A.ea)
q(A.e7,A.e8)
q(A.bH,A.h9)
q(A.eb,A.ec)
q(A.hJ,A.eG)
q(A.cw,A.eg)
p(A.av,[A.eq,A.f2])
q(A.cx,A.eq)
p(A.cc,[A.dl,A.fa,A.fl])
p(A.f1,[A.eW,A.kF,A.lY,A.lX,A.mw,A.mv])
q(A.fm,A.dE)
q(A.mY,A.mZ)
q(A.h2,A.fa)
p(A.b7,[A.cX,A.fe])
q(A.he,A.eC)
p(A.f,[A.v,A.du,A.dx,A.fb,A.ci,A.fq,A.aS,A.es,A.aV,A.aB,A.ew,A.h3,A.c2,A.bt,A.eV,A.bO])
p(A.v,[A.D,A.bp,A.ce,A.d4])
p(A.D,[A.q,A.u])
p(A.q,[A.cJ,A.eP,A.cK,A.cb,A.bQ,A.dp,A.cg,A.dy,A.dA,A.bU,A.bC,A.dT,A.bY,A.dX,A.e1,A.fO,A.fP,A.d1,A.cq])
q(A.f3,A.be)
q(A.cd,A.hb)
p(A.aH,[A.f4,A.f5])
q(A.hg,A.hf)
q(A.dr,A.hg)
q(A.hi,A.hh)
q(A.f8,A.hi)
q(A.aM,A.bP)
q(A.hm,A.hl)
q(A.dw,A.hm)
q(A.hr,A.hq)
q(A.bT,A.hr)
q(A.dz,A.ce)
q(A.bz,A.ci)
p(A.o,[A.bs,A.b8])
p(A.bs,[A.bB,A.az])
q(A.fr,A.hy)
q(A.fs,A.hz)
q(A.hB,A.hA)
q(A.ft,A.hB)
q(A.hD,A.hC)
q(A.cV,A.hD)
q(A.hI,A.hH)
q(A.fG,A.hI)
q(A.fI,A.hK)
q(A.et,A.es)
q(A.fK,A.et)
q(A.hO,A.hN)
q(A.fL,A.hO)
q(A.dZ,A.hQ)
q(A.hZ,A.hY)
q(A.fR,A.hZ)
q(A.ex,A.ew)
q(A.fS,A.ex)
q(A.i0,A.i_)
q(A.fV,A.i0)
q(A.i5,A.i4)
q(A.ha,A.i5)
q(A.ed,A.ds)
q(A.i7,A.i6)
q(A.ho,A.i7)
q(A.i9,A.i8)
q(A.el,A.i9)
q(A.ib,A.ia)
q(A.hP,A.ib)
q(A.id,A.ic)
q(A.hV,A.id)
q(A.ee,A.h6)
p(A.f2,[A.hj,A.eS])
q(A.aX,A.ct)
q(A.hX,A.er)
p(A.aZ,[A.cR,A.d8])
q(A.ck,A.d8)
q(A.hv,A.hu)
q(A.fn,A.hv)
q(A.hF,A.hE)
q(A.fC,A.hF)
q(A.d_,A.u)
q(A.hT,A.hS)
q(A.fN,A.hT)
q(A.i2,A.i1)
q(A.fX,A.i2)
q(A.eU,A.h7)
q(A.fD,A.bO)
s(A.d2,A.bG)
s(A.em,A.m)
s(A.en,A.aI)
s(A.eo,A.m)
s(A.ep,A.aI)
s(A.d3,A.aD)
s(A.dc,A.aD)
s(A.hb,A.kJ)
s(A.hf,A.m)
s(A.hg,A.z)
s(A.hh,A.m)
s(A.hi,A.z)
s(A.hl,A.m)
s(A.hm,A.z)
s(A.hq,A.m)
s(A.hr,A.z)
s(A.hy,A.G)
s(A.hz,A.G)
s(A.hA,A.m)
s(A.hB,A.z)
s(A.hC,A.m)
s(A.hD,A.z)
s(A.hH,A.m)
s(A.hI,A.z)
s(A.hK,A.G)
s(A.es,A.m)
s(A.et,A.z)
s(A.hN,A.m)
s(A.hO,A.z)
s(A.hQ,A.G)
s(A.hY,A.m)
s(A.hZ,A.z)
s(A.ew,A.m)
s(A.ex,A.z)
s(A.i_,A.m)
s(A.i0,A.z)
s(A.i4,A.m)
s(A.i5,A.z)
s(A.i6,A.m)
s(A.i7,A.z)
s(A.i8,A.m)
s(A.i9,A.z)
s(A.ia,A.m)
s(A.ib,A.z)
s(A.ic,A.m)
s(A.id,A.z)
r(A.d8,A.m)
s(A.hu,A.m)
s(A.hv,A.z)
s(A.hE,A.m)
s(A.hF,A.z)
s(A.hS,A.m)
s(A.hT,A.z)
s(A.i1,A.m)
s(A.i2,A.z)
s(A.h7,A.G)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{l:"int",X:"double",Z:"num",c:"String",F:"bool",ad:"Null",p:"List",H:"Object",t:"Map",i:"JSObject"},mangledNames:{},types:["F(t<c,@>)","~(az)","~()","~(o)","af<~>(az)","~(p<t<c,@>>)","~(c,@)","~(c,c)","~(D)","~(t<c,@>)","F(c)","c(c)","l(t<c,@>,t<c,@>)","@(@)","ad(@)","ad()","~(@)","~(fU)","t<c,@>(@)","ad(o)","~(~())","~(b8)","af<~>(o)","F(v)","F(bi)","H?(H?)","ad(H,bl)","~(H,bl)","~(H?,H?)","@()","t<c,@>()","c(t<c,H>)","F(D,c,c,cv)","l(c?)","@(t<c,@>)","t<c,@>(t<c,@>)","~(l,@)","@(@,c)","af<~>()","t<c,c>(t<c,c>,c)","~(c,c?)","~(F)","@(c)","~(@,@)","ad(~())","ad(@,bl)","0&(c,l?)","~(bB)","~(c,D)","~(t<c,c>)","~(l,c)","H?(@)","F(b9<c>)","Z(Z,Z)","t<c,H>(aq<l,Z>)","~(b9<c>)","~(t<c,H>)","D(v)","Z(Z,t<c,@>)","~(D?,@,l[c])","c(@,l)","af<~>(c,c)","ad(@,@,@,@)","~(cM?,c)","af<~>(cM?)","F(D)","af<~>(~)","~(d0,@)","0&()","@(H?)","cR(@)","ck<@>(@)","p<t<c,@>>()","af<ad>(~)","aZ(@)","c(f)","~(v,v?)","~(c)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.tS(v.typeUniverse,JSON.parse('{"fF":"bW","bF":"bW","bA":"bW","w2":"a","w3":"a","vB":"a","vz":"o","vY":"o","vC":"bO","vA":"f","w7":"f","wb":"f","vy":"u","w_":"u","ww":"b8","vD":"q","w5":"q","wc":"v","vX":"v","wq":"ce","w8":"az","wp":"aB","vF":"bs","vR":"bt","vE":"bp","we":"bp","w4":"D","w1":"ci","w0":"bT","vG":"Y","vJ":"be","vM":"aA","vN":"aH","vI":"aH","vK":"aH","w6":"co","fg":{"F":[],"a_":[]},"dD":{"ad":[],"a_":[]},"a":{"i":[]},"bW":{"i":[]},"ac":{"p":["1"],"n":["1"],"i":[],"h":["1"]},"ff":{"cZ":[]},"lT":{"ac":["1"],"p":["1"],"n":["1"],"i":[],"h":["1"]},"bd":{"ab":["1"]},"cj":{"X":[],"Z":[]},"dC":{"X":[],"l":[],"Z":[],"a_":[]},"fi":{"X":[],"Z":[],"a_":[]},"bV":{"c":[],"m9":[],"a_":[]},"dF":{"a0":[]},"f_":{"m":["l"],"bG":["l"],"p":["l"],"n":["l"],"h":["l"],"m.E":"l","bG.E":"l"},"n":{"h":["1"]},"a5":{"n":["1"],"h":["1"]},"e_":{"a5":["1"],"n":["1"],"h":["1"],"a5.E":"1","h.E":"1"},"bh":{"ab":["1"]},"aJ":{"h":["2"],"h.E":"2"},"bx":{"aJ":["1","2"],"n":["2"],"h":["2"],"h.E":"2"},"dL":{"ab":["2"]},"a1":{"a5":["2"],"n":["2"],"h":["2"],"a5.E":"2","h.E":"2"},"I":{"h":["1"],"h.E":"1"},"aw":{"ab":["1"]},"cs":{"h":["1"],"h.E":"1"},"e6":{"ab":["1"]},"d2":{"m":["1"],"bG":["1"],"p":["1"],"n":["1"],"h":["1"]},"hx":{"a5":["l"],"n":["l"],"h":["l"],"a5.E":"l","h.E":"l"},"cn":{"G":["l","1"],"aD":["l","1"],"t":["l","1"],"G.K":"l","G.V":"1","aD.K":"l","aD.V":"1"},"c_":{"d0":[]},"dn":{"c1":["1","2"],"dc":["1","2"],"cU":["1","2"],"aD":["1","2"],"t":["1","2"],"aD.K":"1","aD.V":"2"},"dm":{"t":["1","2"]},"bv":{"dm":["1","2"],"t":["1","2"]},"ej":{"h":["1"],"h.E":"1"},"ek":{"ab":["1"]},"fh":{"pc":[]},"dS":{"bD":[],"a0":[]},"fk":{"a0":[]},"fZ":{"a0":[]},"eu":{"bl":[]},"bR":{"ch":[]},"eY":{"ch":[]},"eZ":{"ch":[]},"fQ":{"ch":[]},"fM":{"ch":[]},"cL":{"ch":[]},"fJ":{"a0":[]},"bg":{"G":["1","2"],"ph":["1","2"],"t":["1","2"],"G.K":"1","G.V":"2"},"cl":{"n":["1"],"h":["1"],"h.E":"1"},"dI":{"ab":["1"]},"b0":{"n":["1"],"h":["1"],"h.E":"1"},"dJ":{"ab":["1"]},"dG":{"n":["aq<1,2>"],"h":["aq<1,2>"],"h.E":"aq<1,2>"},"dH":{"ab":["aq<1,2>"]},"fj":{"tf":[],"m9":[]},"co":{"i":[],"eX":[],"a_":[]},"dO":{"i":[],"ae":[]},"i3":{"eX":[]},"dM":{"kG":[],"i":[],"ae":[],"a_":[]},"au":{"N":["1"],"i":[],"ae":[]},"dN":{"m":["X"],"au":["X"],"p":["X"],"N":["X"],"n":["X"],"i":[],"ae":[],"h":["X"],"aI":["X"]},"b1":{"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"i":[],"ae":[],"h":["l"],"aI":["l"]},"fu":{"lN":[],"m":["X"],"au":["X"],"p":["X"],"N":["X"],"n":["X"],"i":[],"ae":[],"h":["X"],"aI":["X"],"a_":[],"m.E":"X"},"fv":{"lO":[],"m":["X"],"au":["X"],"p":["X"],"N":["X"],"n":["X"],"i":[],"ae":[],"h":["X"],"aI":["X"],"a_":[],"m.E":"X"},"fw":{"b1":[],"lQ":[],"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"i":[],"ae":[],"h":["l"],"aI":["l"],"a_":[],"m.E":"l"},"fx":{"b1":[],"lR":[],"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"i":[],"ae":[],"h":["l"],"aI":["l"],"a_":[],"m.E":"l"},"fy":{"b1":[],"lS":[],"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"i":[],"ae":[],"h":["l"],"aI":["l"],"a_":[],"m.E":"l"},"fz":{"b1":[],"mo":[],"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"i":[],"ae":[],"h":["l"],"aI":["l"],"a_":[],"m.E":"l"},"fA":{"b1":[],"mp":[],"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"i":[],"ae":[],"h":["l"],"aI":["l"],"a_":[],"m.E":"l"},"dP":{"b1":[],"mq":[],"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"i":[],"ae":[],"h":["l"],"aI":["l"],"a_":[],"m.E":"l"},"dQ":{"b1":[],"mr":[],"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"i":[],"ae":[],"h":["l"],"aI":["l"],"a_":[],"m.E":"l"},"hk":{"a0":[]},"db":{"bD":[],"a0":[]},"ey":{"fU":[]},"ev":{"ab":["1"]},"da":{"h":["1"],"h.E":"1"},"at":{"a0":[]},"d5":{"e9":["1"],"d9":["1"],"bZ":["1"]},"bI":{"ea":["1"],"d6":["1"],"br":["1"],"c3":["1"]},"e8":{"pu":["1"],"pR":["1"],"c3":["1"]},"e7":{"e8":["1"],"pu":["1"],"pR":["1"],"c3":["1"]},"bH":{"h9":["1"]},"W":{"af":["1"]},"e9":{"d9":["1"],"bZ":["1"]},"ea":{"d6":["1"],"br":["1"],"c3":["1"]},"d6":{"br":["1"],"c3":["1"]},"d9":{"bZ":["1"]},"eb":{"ec":["1"]},"d7":{"br":["1"]},"eG":{"pF":[]},"hJ":{"eG":[],"pF":[]},"eg":{"G":["1","2"],"t":["1","2"]},"cw":{"eg":["1","2"],"G":["1","2"],"t":["1","2"],"G.K":"1","G.V":"2"},"eh":{"n":["1"],"h":["1"],"h.E":"1"},"ei":{"ab":["1"]},"cx":{"av":["1"],"b9":["1"],"n":["1"],"h":["1"],"av.E":"1"},"cy":{"ab":["1"]},"e3":{"m":["1"],"bG":["1"],"p":["1"],"n":["1"],"h":["1"],"m.E":"1","bG.E":"1"},"m":{"p":["1"],"n":["1"],"h":["1"]},"G":{"t":["1","2"]},"d3":{"G":["1","2"],"aD":["1","2"],"t":["1","2"]},"cU":{"t":["1","2"]},"c1":{"dc":["1","2"],"cU":["1","2"],"aD":["1","2"],"t":["1","2"],"aD.K":"1","aD.V":"2"},"av":{"b9":["1"],"n":["1"],"h":["1"]},"eq":{"av":["1"],"b9":["1"],"n":["1"],"h":["1"]},"hs":{"G":["c","@"],"t":["c","@"],"G.K":"c","G.V":"@"},"ht":{"a5":["c"],"n":["c"],"h":["c"],"a5.E":"c","h.E":"c"},"dl":{"cc":["p<l>","c"]},"fa":{"cc":["c","p<l>"]},"dE":{"a0":[]},"fm":{"a0":[]},"fl":{"cc":["H?","c"]},"h2":{"cc":["c","p<l>"]},"X":{"Z":[]},"l":{"Z":[]},"p":{"n":["1"],"h":["1"]},"b9":{"n":["1"],"h":["1"]},"c":{"m9":[]},"eQ":{"a0":[]},"bD":{"a0":[]},"b7":{"a0":[]},"cX":{"a0":[]},"fe":{"a0":[]},"fB":{"a0":[]},"e4":{"a0":[]},"fY":{"a0":[]},"bq":{"a0":[]},"f0":{"a0":[]},"fE":{"a0":[]},"dY":{"a0":[]},"hU":{"bl":[]},"ar":{"th":[]},"eC":{"h_":[]},"ba":{"h_":[]},"he":{"h_":[]},"Y":{"i":[]},"D":{"v":[],"f":[],"i":[]},"o":{"i":[]},"f":{"i":[]},"aM":{"bP":[],"i":[]},"aN":{"i":[]},"bz":{"f":[],"i":[]},"cM":{"D":[],"v":[],"f":[],"i":[]},"bB":{"o":[],"i":[]},"aP":{"i":[]},"az":{"o":[],"i":[]},"v":{"f":[],"i":[]},"bC":{"q":[],"D":[],"v":[],"f":[],"i":[]},"aQ":{"i":[]},"b8":{"o":[],"i":[]},"aS":{"f":[],"i":[]},"aT":{"i":[]},"aU":{"i":[]},"aA":{"i":[]},"aV":{"f":[],"i":[]},"aB":{"f":[],"i":[]},"aW":{"i":[]},"cv":{"bi":[]},"q":{"D":[],"v":[],"f":[],"i":[]},"eO":{"i":[]},"cJ":{"q":[],"D":[],"v":[],"f":[],"i":[]},"eP":{"q":[],"D":[],"v":[],"f":[],"i":[]},"cK":{"q":[],"D":[],"v":[],"f":[],"i":[]},"bP":{"i":[]},"cb":{"q":[],"D":[],"v":[],"f":[],"i":[]},"bQ":{"q":[],"D":[],"v":[],"f":[],"i":[]},"bp":{"v":[],"f":[],"i":[]},"f3":{"i":[]},"cd":{"i":[]},"aH":{"i":[]},"be":{"i":[]},"f4":{"i":[]},"f5":{"i":[]},"f6":{"i":[]},"dp":{"q":[],"D":[],"v":[],"f":[],"i":[]},"ce":{"v":[],"f":[],"i":[]},"f7":{"i":[]},"dq":{"i":[]},"dr":{"m":["bj<Z>"],"z":["bj<Z>"],"p":["bj<Z>"],"N":["bj<Z>"],"n":["bj<Z>"],"i":[],"h":["bj<Z>"],"z.E":"bj<Z>","m.E":"bj<Z>"},"ds":{"bj":["Z"],"i":[]},"f8":{"m":["c"],"z":["c"],"p":["c"],"N":["c"],"n":["c"],"i":[],"h":["c"],"z.E":"c","m.E":"c"},"f9":{"i":[]},"h8":{"m":["D"],"p":["D"],"n":["D"],"h":["D"],"m.E":"D"},"bm":{"m":["1"],"p":["1"],"n":["1"],"h":["1"],"m.E":"1"},"du":{"f":[],"i":[]},"dw":{"m":["aM"],"z":["aM"],"p":["aM"],"N":["aM"],"n":["aM"],"i":[],"h":["aM"],"z.E":"aM","m.E":"aM"},"dx":{"f":[],"i":[]},"fb":{"f":[],"i":[]},"cg":{"q":[],"D":[],"v":[],"f":[],"i":[]},"dy":{"q":[],"D":[],"v":[],"f":[],"i":[]},"fd":{"i":[]},"bT":{"m":["v"],"z":["v"],"p":["v"],"N":["v"],"n":["v"],"i":[],"h":["v"],"z.E":"v","m.E":"v"},"dz":{"v":[],"f":[],"i":[]},"ci":{"f":[],"i":[]},"cN":{"i":[]},"dA":{"q":[],"D":[],"v":[],"f":[],"i":[]},"bU":{"p1":[],"cM":[],"q":[],"D":[],"v":[],"f":[],"i":[]},"cT":{"i":[]},"fp":{"i":[]},"fq":{"f":[],"i":[]},"fr":{"G":["c","@"],"i":[],"t":["c","@"],"G.K":"c","G.V":"@"},"fs":{"G":["c","@"],"i":[],"t":["c","@"],"G.K":"c","G.V":"@"},"ft":{"m":["aP"],"z":["aP"],"p":["aP"],"N":["aP"],"n":["aP"],"i":[],"h":["aP"],"z.E":"aP","m.E":"aP"},"aC":{"m":["v"],"p":["v"],"n":["v"],"h":["v"],"m.E":"v"},"cV":{"m":["v"],"z":["v"],"p":["v"],"N":["v"],"n":["v"],"i":[],"h":["v"],"z.E":"v","m.E":"v"},"dT":{"q":[],"D":[],"v":[],"f":[],"i":[]},"fG":{"m":["aQ"],"z":["aQ"],"p":["aQ"],"N":["aQ"],"n":["aQ"],"i":[],"h":["aQ"],"z.E":"aQ","m.E":"aQ"},"fI":{"G":["c","@"],"i":[],"t":["c","@"],"G.K":"c","G.V":"@"},"bY":{"q":[],"D":[],"v":[],"f":[],"i":[]},"fK":{"m":["aS"],"z":["aS"],"p":["aS"],"f":[],"N":["aS"],"n":["aS"],"i":[],"h":["aS"],"z.E":"aS","m.E":"aS"},"dX":{"q":[],"D":[],"v":[],"f":[],"i":[]},"fL":{"m":["aT"],"z":["aT"],"p":["aT"],"N":["aT"],"n":["aT"],"i":[],"h":["aT"],"z.E":"aT","m.E":"aT"},"dZ":{"G":["c","c"],"i":[],"t":["c","c"],"G.K":"c","G.V":"c"},"e1":{"q":[],"D":[],"v":[],"f":[],"i":[]},"fO":{"q":[],"D":[],"v":[],"f":[],"i":[]},"fP":{"q":[],"D":[],"v":[],"f":[],"i":[]},"d1":{"q":[],"D":[],"v":[],"f":[],"i":[]},"cq":{"q":[],"D":[],"v":[],"f":[],"i":[]},"fR":{"m":["aB"],"z":["aB"],"p":["aB"],"N":["aB"],"n":["aB"],"i":[],"h":["aB"],"z.E":"aB","m.E":"aB"},"fS":{"m":["aV"],"z":["aV"],"p":["aV"],"f":[],"N":["aV"],"n":["aV"],"i":[],"h":["aV"],"z.E":"aV","m.E":"aV"},"fT":{"i":[]},"fV":{"m":["aW"],"z":["aW"],"p":["aW"],"N":["aW"],"n":["aW"],"i":[],"h":["aW"],"z.E":"aW","m.E":"aW"},"fW":{"i":[]},"bs":{"o":[],"i":[]},"h1":{"i":[]},"h3":{"f":[],"i":[]},"c2":{"mx":[],"f":[],"i":[]},"bt":{"f":[],"i":[]},"d4":{"v":[],"f":[],"i":[]},"ha":{"m":["Y"],"z":["Y"],"p":["Y"],"N":["Y"],"n":["Y"],"i":[],"h":["Y"],"z.E":"Y","m.E":"Y"},"ed":{"bj":["Z"],"i":[]},"ho":{"m":["aN?"],"z":["aN?"],"p":["aN?"],"N":["aN?"],"n":["aN?"],"i":[],"h":["aN?"],"z.E":"aN?","m.E":"aN?"},"el":{"m":["v"],"z":["v"],"p":["v"],"N":["v"],"n":["v"],"i":[],"h":["v"],"z.E":"v","m.E":"v"},"hP":{"m":["aU"],"z":["aU"],"p":["aU"],"N":["aU"],"n":["aU"],"i":[],"h":["aU"],"z.E":"aU","m.E":"aU"},"hV":{"m":["aA"],"z":["aA"],"p":["aA"],"N":["aA"],"n":["aA"],"i":[],"h":["aA"],"z.E":"aA","m.E":"aA"},"h6":{"G":["c","c"],"t":["c","c"]},"ee":{"G":["c","c"],"t":["c","c"],"G.K":"c","G.V":"c"},"hd":{"G":["c","c"],"t":["c","c"],"G.K":"c","G.V":"c"},"hj":{"av":["c"],"b9":["c"],"n":["c"],"h":["c"],"av.E":"c"},"ct":{"bZ":["1"]},"aX":{"ct":["1"],"bZ":["1"]},"ef":{"br":["1"]},"dR":{"bi":[]},"er":{"bi":[]},"hX":{"bi":[]},"hW":{"bi":[]},"cf":{"ab":["1"]},"hc":{"mx":[],"f":[],"i":[]},"hM":{"tj":[]},"eF":{"t6":[]},"f2":{"av":["c"],"b9":["c"],"n":["c"],"h":["c"]},"fc":{"m":["D"],"p":["D"],"n":["D"],"h":["D"],"m.E":"D"},"cS":{"i":[]},"cR":{"aZ":[]},"ck":{"m":["1"],"p":["1"],"n":["1"],"aZ":[],"h":["1"],"m.E":"1"},"hL":{"cZ":[]},"b_":{"i":[]},"b2":{"i":[]},"b3":{"i":[]},"fn":{"m":["b_"],"z":["b_"],"p":["b_"],"n":["b_"],"i":[],"h":["b_"],"z.E":"b_","m.E":"b_"},"fC":{"m":["b2"],"z":["b2"],"p":["b2"],"n":["b2"],"i":[],"h":["b2"],"z.E":"b2","m.E":"b2"},"fH":{"i":[]},"d_":{"u":[],"D":[],"v":[],"f":[],"i":[]},"fN":{"m":["c"],"z":["c"],"p":["c"],"n":["c"],"i":[],"h":["c"],"z.E":"c","m.E":"c"},"eS":{"av":["c"],"b9":["c"],"n":["c"],"h":["c"],"av.E":"c"},"u":{"D":[],"v":[],"f":[],"i":[]},"fX":{"m":["b3"],"z":["b3"],"p":["b3"],"n":["b3"],"i":[],"h":["b3"],"z.E":"b3","m.E":"b3"},"eT":{"i":[]},"eU":{"G":["c","@"],"i":[],"t":["c","@"],"G.K":"c","G.V":"@"},"eV":{"f":[],"i":[]},"bO":{"f":[],"i":[]},"fD":{"f":[],"i":[]},"kG":{"ae":[]},"lS":{"p":["l"],"n":["l"],"ae":[],"h":["l"]},"mr":{"p":["l"],"n":["l"],"ae":[],"h":["l"]},"mq":{"p":["l"],"n":["l"],"ae":[],"h":["l"]},"lQ":{"p":["l"],"n":["l"],"ae":[],"h":["l"]},"mo":{"p":["l"],"n":["l"],"ae":[],"h":["l"]},"lR":{"p":["l"],"n":["l"],"ae":[],"h":["l"]},"mp":{"p":["l"],"n":["l"],"ae":[],"h":["l"]},"lN":{"p":["X"],"n":["X"],"ae":[],"h":["X"]},"lO":{"p":["X"],"n":["X"],"ae":[],"h":["X"]}}'))
A.tR(v.typeUniverse,JSON.parse('{"n":1,"d2":1,"au":1,"ec":1,"d3":2,"eq":1,"f1":2,"d8":1}'))
var u={f:"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u03f6\x00\u0404\u03f4 \u03f4\u03f6\u01f6\u01f6\u03f6\u03fc\u01f4\u03ff\u03ff\u0584\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u05d4\u01f4\x00\u01f4\x00\u0504\u05c4\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0400\x00\u0400\u0200\u03f7\u0200\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0200\u0200\u0200\u03f7\x00",p:": URI should have a non-empty host name: ",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type",n:"Password reset. Sign in with your new password."}
var t=(function rtii(){var s=A.ii
return{gS:s("@<~>"),n:s("at"),az:s("cK"),fj:s("bP"),hp:s("cb"),k:s("bQ"),lo:s("eX"),fW:s("kG"),i9:s("dn<d0,@>"),p1:s("bv<c,c>"),d5:s("Y"),cs:s("ag"),jS:s("aL"),gt:s("n<@>"),h:s("D"),W:s("a0"),A:s("o"),l5:s("f"),et:s("aM"),pk:s("lN"),kI:s("lO"),h4:s("cg"),Z:s("ch"),la:s("bz"),ad:s("cN"),q:s("bU"),m6:s("lQ"),bW:s("lR"),jx:s("lS"),bg:s("pc"),hl:s("h<v>"),e3:s("h<bC>"),R:s("h<@>"),fm:s("h<l>"),gZ:s("ac<aZ>"),hq:s("ac<t<c,c>>"),t:s("ac<t<c,@>>"),lN:s("ac<bi>"),hf:s("ac<H>"),dw:s("ac<br<@>>"),s:s("ac<c>"),dG:s("ac<@>"),b:s("ac<l>"),T:s("dD"),m:s("i"),dY:s("bA"),dX:s("N<@>"),gq:s("ck<@>"),bX:s("bg<d0,@>"),mz:s("cS"),mT:s("bB"),kT:s("b_"),fO:s("cn<c>"),p:s("p<t<c,@>>"),j:s("p<@>"),f4:s("p<l>"),oT:s("p<Z>"),d:s("cT"),if:s("aq<l,Z>"),dW:s("t<c,D>"),c:s("t<c,H>"),je:s("t<c,c>"),P:s("t<c,@>"),f:s("t<@,@>"),gQ:s("a1<c,c>"),ib:s("aP"),V:s("az"),aj:s("b1"),F:s("v"),hU:s("bi"),a:s("ad"),ai:s("b2"),K:s("H"),af:s("bC"),d8:s("aQ"),I:s("b8"),lZ:s("wa"),ku:s("bj<@>"),mx:s("bj<Z>"),nZ:s("d_"),g:s("bY"),i:s("b9<c>"),ls:s("aS"),cA:s("aT"),hH:s("aU"),l:s("bl"),N:s("c"),gL:s("c(c)"),lv:s("aA"),bC:s("u"),bR:s("d0"),fD:s("d1"),dQ:s("aV"),gJ:s("aB"),D:s("fU"),ki:s("aW"),hk:s("b3"),aJ:s("a_"),do:s("bD"),jv:s("ae"),hM:s("mo"),mC:s("mp"),nn:s("mq"),ev:s("mr"),cx:s("bF"),eG:s("e3<bC>"),ph:s("c1<c,c>"),jJ:s("h_"),J:s("I<c>"),hE:s("c2"),kg:s("mx"),f5:s("bt"),cz:s("bH<bz>"),ou:s("bH<~>"),nD:s("d4"),aN:s("aC"),E:s("aX<o>"),kN:s("aX<bB>"),C:s("aX<az>"),h6:s("ct<b8>"),U:s("bm<D>"),gp:s("bm<bC>"),ax:s("W<bz>"),_:s("W<@>"),hy:s("W<l>"),cU:s("W<~>"),dl:s("cv"),mp:s("cw<@,@>"),as:s("cw<H?,H?>"),y:s("F"),iW:s("F(H)"),Q:s("F(c)"),dx:s("X"),z:s("@"),mY:s("@()"),w:s("@(H)"),ng:s("@(H,bl)"),gA:s("@(b9<c>)"),S:s("l"),o:s("bQ?"),aa:s("p1?"),mV:s("D?"),O:s("f?"),iC:s("cM?"),dD:s("cg?"),gK:s("af<ad>?"),ef:s("aN?"),dH:s("q?"),G:s("bU?"),mU:s("i?"),lH:s("p<@>?"),lG:s("t<c,c>?"),dZ:s("t<c,@>?"),eO:s("t<@,@>?"),X:s("H?"),Y:s("bY?"),x:s("c?"),r:s("cq?"),e:s("bn<@,@>?"),L:s("hw?"),fU:s("F?"),jX:s("X?"),B:s("@(o)?"),aV:s("l?"),jh:s("Z?"),jE:s("~()?"),oV:s("~(o)?"),b9:s("~(az)?"),gn:s("~(b8)?"),mW:s("~(F)?"),u:s("Z"),H:s("~"),M:s("~()"),i6:s("~(H)"),fQ:s("~(H,bl)"),bm:s("~(c,c)"),v:s("~(c,@)"),my:s("~(fU)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.T=A.cJ.prototype
B.A=A.cb.prototype
B.k=A.bQ.prototype
B.n=A.cd.prototype
B.E=A.dp.prototype
B.a6=A.dq.prototype
B.ad=A.dw.prototype
B.ae=A.dx.prototype
B.H=A.dy.prototype
B.I=A.dz.prototype
B.J=A.dA.prototype
B.f=A.bU.prototype
B.af=J.cO.prototype
B.b=J.ac.prototype
B.e=J.dC.prototype
B.d=J.cj.prototype
B.a=J.bV.prototype
B.ag=J.bA.prototype
B.ah=J.a.prototype
B.ap=A.dM.prototype
B.O=A.dQ.prototype
B.aq=A.cV.prototype
B.m=A.dT.prototype
B.Q=J.fF.prototype
B.o=A.bY.prototype
B.u=A.dX.prototype
B.j=A.dZ.prototype
B.R=A.e1.prototype
B.p=A.cq.prototype
B.y=J.bF.prototype
B.S=A.c2.prototype
B.U=new A.aG(401,!0,null)
B.V=new A.aG(409,!1,null)
B.q=new A.aG(null,!1,null)
B.i=new A.aG(null,!0,null)
B.X=new A.eW(!1)
B.W=new A.dl(B.X)
B.Y=new A.eW(!0)
B.z=new A.dl(B.Y)
B.v=new A.kF()
B.B=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.Z=function() {
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
B.a3=function(getTagFallback) {
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
B.a_=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.a2=function(hooks) {
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
B.a1=function(hooks) {
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
B.a0=function(hooks) {
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
B.C=function(hooks) { return hooks; }

B.c=new A.fl()
B.a4=new A.fE()
B.r=new A.me()
B.l=new A.h2()
B.a5=new A.mw()
B.D=new A.n2()
B.h=new A.hJ()
B.t=new A.hU()
B.a7=new A.aL(0)
B.F=new A.aL(1e6)
B.G=new A.aL(1e7)
B.a8=new A.aL(15e6)
B.a9=new A.aL(2e6)
B.aa=new A.aL(3e5)
B.ab=new A.aL(4e5)
B.ac=new A.aL(6e7)
B.w=new A.bf("",null,null)
B.ai=new A.lX(null)
B.aj=new A.lY(null)
B.ak=s([],t.s)
B.K=s([],t.dG)
B.L=s(["bind","if","ref","repeat","syntax"],t.s)
B.x=s(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"],t.s)
B.al=s(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"],t.s)
B.am=s(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"],t.s)
B.ar={households:0,centralAssets:1,maintenanceLogs:2,workers:3,billingRecords:4,announcements:5,paymentSettings:6,billingConfig:7,offlineCollections:8,unsyncedActions:9}
B.M=new A.bv(B.ar,["waterhall_households","waterhall_central_assets","waterhall_maintenance_logs","waterhall_workers","waterhall_billing_records","waterhall_announcements","waterhall_payment_settings","waterhall_billing_config","waterhall_offline_collections","waterhall_unsynced_actions"],t.p1)
B.as={"/api/billing-records/add":0,"/api/maintenance-logs/add":1,"/api/reports/add":2,"/api/announcements/add":3,"/api/households/update":4}
B.an=new A.bv(B.as,["Meter reading and bill","Maintenance report","Service report","Announcement","Household status"],t.p1)
B.P={}
B.ao=new A.bv(B.P,[],t.p1)
B.N=new A.bv(B.P,[],A.ii("bv<d0,@>"))
B.at=new A.c_("call")
B.au=A.bo("eX")
B.av=A.bo("kG")
B.aw=A.bo("lN")
B.ax=A.bo("lO")
B.ay=A.bo("lQ")
B.az=A.bo("lR")
B.aA=A.bo("lS")
B.aB=A.bo("H")
B.aC=A.bo("mo")
B.aD=A.bo("mp")
B.aE=A.bo("mq")
B.aF=A.bo("mr")
B.aG=new A.mv(!1)})();(function staticFields(){$.mX=null
$.b5=A.B([],t.hf)
$.pm=null
$.p_=null
$.oZ=null
$.qC=null
$.qy=null
$.qH=null
$.nE=null
$.nK=null
$.oK=null
$.de=null
$.eJ=null
$.eK=null
$.oD=!1
$.V=B.h
$.pB=""
$.pC=null
$.bS=null
$.o5=null
$.p8=null
$.p7=null
$.hp=A.ap(t.N,t.Z)
$.vt=A.a3(["main_tank_level",null,"turbidity",null,"tds_ppm",null,"turbidity_status","unknown","has_reading",!1,"turbidity_desc","Awaiting sensor readings","last_updated",null],t.N,t.z)
$.qB=function(){var s=t.N
return A.a3(["payment_location","Barangay Tagpopongan Hall - Treasury Office","payment_method","In-Person Payment at Barangay Hall","allow_worker_collection","false","payment_instructions","Water bills are due on or before the 25th of each month. Payments must be settled in-person at the Barangay Hall Treasury Window. Field workers are not authorized to collect payments.","operating_hours","Monday - Friday, 8:00 AM - 5:00 PM","emergency_contact","Not configured; contact the Barangay office"],s,s)}()})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"vP","io",()=>A.oJ("_$dart_dartClosure"))
s($,"vO","qP",()=>A.oJ("_$dart_dartClosure_dartJSInterop"))
s($,"wK","nZ",()=>B.h.dV(new A.nR(),A.ii("af<~>")))
s($,"wG","oT",()=>A.B([new J.ff()],A.ii("ac<cZ>")))
s($,"wf","qW",()=>A.bE(A.mn({
toString:function(){return"$receiver$"}})))
s($,"wg","qX",()=>A.bE(A.mn({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"wh","qY",()=>A.bE(A.mn(null)))
s($,"wi","qZ",()=>A.bE(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"wl","r1",()=>A.bE(A.mn(void 0)))
s($,"wm","r2",()=>A.bE(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"wk","r0",()=>A.bE(A.py(null)))
s($,"wj","r_",()=>A.bE(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"wo","r4",()=>A.bE(A.py(void 0)))
s($,"wn","r3",()=>A.bE(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"wr","oP",()=>A.tn())
s($,"vZ","nW",()=>$.nZ())
s($,"wB","rb",()=>A.pj(4096))
s($,"wz","r9",()=>new A.nj().$0())
s($,"wA","ra",()=>new A.ni().$0())
s($,"wt","oQ",()=>A.t5(A.um(A.B([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.b))))
s($,"ws","r5",()=>A.pj(0))
s($,"wx","r7",()=>A.mc("^[\\-\\.0-9A-Z_a-z~]*$"))
s($,"wy","r8",()=>typeof URLSearchParams=="function")
s($,"vQ","qQ",()=>A.mc("^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(?:[.,](\\d+))?)?)?( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$"))
s($,"wE","nX",()=>A.il(B.aB))
s($,"vL","qO",()=>({}))
s($,"wv","r6",()=>A.pi(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],t.N))
s($,"vH","qN",()=>A.mc("^\\S+$"))
s($,"vV","oO",()=>B.a.bv(A.o4(),"Opera",0))
s($,"vU","qT",()=>!$.oO()&&B.a.bv(A.o4(),"Trident/",0))
s($,"vT","qS",()=>B.a.bv(A.o4(),"Firefox",0))
s($,"vS","qR",()=>"-"+$.qU()+"-")
s($,"vW","qU",()=>{if($.qS())var q="moz"
else if($.qT())q="ms"
else q=$.oO()?"o":"webkit"
return q})
s($,"wC","bu",()=>A.uf(A.oE(self)))
s($,"wF","nY",()=>{$.oT().push(new A.hL())
return!0})
s($,"wu","oR",()=>A.oJ("_$dart_dartObject"))
s($,"wD","oS",()=>function DartObject(a){this.o=a})
s($,"w9","qV",()=>{var q=new A.mW(new DataView(new ArrayBuffer(A.ug(8))))
q.eC()
return q})
s($,"wH","K",()=>{var q,p=t.t,o=A.B([],p),n=t.N,m=t.z,l=A.B([],p),k=A.B([],p),j=A.B([],p)
p=A.B([],p)
q=A.o7(null,t.H)
return new A.kK(o,A.ap(n,m),l,k,j,p,A.ap(n,n),A.ap(n,m),A.ap(n,t.p),q,new A.e7(null,null,A.ii("e7<t<c,@>>")))})
r($,"uM","rc",()=>A.o7(null,t.H))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({WebGL:J.cO,AnimationEffectReadOnly:J.a,AnimationEffectTiming:J.a,AnimationEffectTimingReadOnly:J.a,AnimationTimeline:J.a,AnimationWorkletGlobalScope:J.a,AuthenticatorAssertionResponse:J.a,AuthenticatorAttestationResponse:J.a,AuthenticatorResponse:J.a,BackgroundFetchFetch:J.a,BackgroundFetchManager:J.a,BackgroundFetchSettledFetch:J.a,BarProp:J.a,BarcodeDetector:J.a,BluetoothRemoteGATTDescriptor:J.a,Body:J.a,BudgetState:J.a,CacheStorage:J.a,CanvasGradient:J.a,CanvasPattern:J.a,CanvasRenderingContext2D:J.a,Client:J.a,Clients:J.a,CookieStore:J.a,Coordinates:J.a,Credential:J.a,CredentialUserData:J.a,CredentialsContainer:J.a,Crypto:J.a,CryptoKey:J.a,CSS:J.a,CSSVariableReferenceValue:J.a,CustomElementRegistry:J.a,DataTransfer:J.a,DataTransferItem:J.a,DeprecatedStorageInfo:J.a,DeprecatedStorageQuota:J.a,DeprecationReport:J.a,DetectedBarcode:J.a,DetectedFace:J.a,DetectedText:J.a,DeviceAcceleration:J.a,DeviceRotationRate:J.a,DirectoryEntry:J.a,webkitFileSystemDirectoryEntry:J.a,FileSystemDirectoryEntry:J.a,DirectoryReader:J.a,WebKitDirectoryReader:J.a,webkitFileSystemDirectoryReader:J.a,FileSystemDirectoryReader:J.a,DocumentOrShadowRoot:J.a,DocumentTimeline:J.a,DOMError:J.a,Iterator:J.a,DOMMatrix:J.a,DOMMatrixReadOnly:J.a,DOMParser:J.a,DOMPoint:J.a,DOMPointReadOnly:J.a,DOMQuad:J.a,DOMStringMap:J.a,Entry:J.a,webkitFileSystemEntry:J.a,FileSystemEntry:J.a,External:J.a,FaceDetector:J.a,FederatedCredential:J.a,FileEntry:J.a,webkitFileSystemFileEntry:J.a,FileSystemFileEntry:J.a,DOMFileSystem:J.a,WebKitFileSystem:J.a,webkitFileSystem:J.a,FileSystem:J.a,FontFace:J.a,FontFaceSource:J.a,FormData:J.a,GamepadButton:J.a,GamepadPose:J.a,Geolocation:J.a,Position:J.a,GeolocationPosition:J.a,Headers:J.a,HTMLHyperlinkElementUtils:J.a,IdleDeadline:J.a,ImageBitmap:J.a,ImageBitmapRenderingContext:J.a,ImageCapture:J.a,InputDeviceCapabilities:J.a,IntersectionObserver:J.a,IntersectionObserverEntry:J.a,InterventionReport:J.a,KeyframeEffect:J.a,KeyframeEffectReadOnly:J.a,MediaCapabilities:J.a,MediaCapabilitiesInfo:J.a,MediaDeviceInfo:J.a,MediaError:J.a,MediaKeyStatusMap:J.a,MediaKeySystemAccess:J.a,MediaKeys:J.a,MediaKeysPolicy:J.a,MediaMetadata:J.a,MediaSession:J.a,MediaSettingsRange:J.a,MemoryInfo:J.a,MessageChannel:J.a,Metadata:J.a,MutationObserver:J.a,WebKitMutationObserver:J.a,MutationRecord:J.a,NavigationPreloadManager:J.a,Navigator:J.a,NavigatorAutomationInformation:J.a,NavigatorConcurrentHardware:J.a,NavigatorCookies:J.a,NavigatorUserMediaError:J.a,NodeFilter:J.a,NodeIterator:J.a,NonDocumentTypeChildNode:J.a,NonElementParentNode:J.a,NoncedElement:J.a,OffscreenCanvasRenderingContext2D:J.a,OverconstrainedError:J.a,PaintRenderingContext2D:J.a,PaintSize:J.a,PaintWorkletGlobalScope:J.a,PasswordCredential:J.a,Path2D:J.a,PaymentAddress:J.a,PaymentInstruments:J.a,PaymentManager:J.a,PaymentResponse:J.a,PerformanceEntry:J.a,PerformanceLongTaskTiming:J.a,PerformanceMark:J.a,PerformanceMeasure:J.a,PerformanceNavigation:J.a,PerformanceNavigationTiming:J.a,PerformanceObserver:J.a,PerformanceObserverEntryList:J.a,PerformancePaintTiming:J.a,PerformanceResourceTiming:J.a,PerformanceServerTiming:J.a,PerformanceTiming:J.a,Permissions:J.a,PhotoCapabilities:J.a,PositionError:J.a,GeolocationPositionError:J.a,Presentation:J.a,PresentationReceiver:J.a,PublicKeyCredential:J.a,PushManager:J.a,PushMessageData:J.a,PushSubscription:J.a,PushSubscriptionOptions:J.a,Range:J.a,RelatedApplication:J.a,ReportBody:J.a,ReportingObserver:J.a,ResizeObserver:J.a,ResizeObserverEntry:J.a,RTCCertificate:J.a,RTCIceCandidate:J.a,mozRTCIceCandidate:J.a,RTCLegacyStatsReport:J.a,RTCRtpContributingSource:J.a,RTCRtpReceiver:J.a,RTCRtpSender:J.a,RTCSessionDescription:J.a,mozRTCSessionDescription:J.a,RTCStatsResponse:J.a,Screen:J.a,ScrollState:J.a,ScrollTimeline:J.a,Selection:J.a,SpeechRecognitionAlternative:J.a,SpeechSynthesisVoice:J.a,StaticRange:J.a,StorageManager:J.a,StyleMedia:J.a,StylePropertyMap:J.a,StylePropertyMapReadonly:J.a,SyncManager:J.a,TaskAttributionTiming:J.a,TextDetector:J.a,TextMetrics:J.a,TrackDefault:J.a,TreeWalker:J.a,TrustedHTML:J.a,TrustedScriptURL:J.a,TrustedURL:J.a,UnderlyingSourceBase:J.a,URLSearchParams:J.a,VRCoordinateSystem:J.a,VRDisplayCapabilities:J.a,VREyeParameters:J.a,VRFrameData:J.a,VRFrameOfReference:J.a,VRPose:J.a,VRStageBounds:J.a,VRStageBoundsPoint:J.a,VRStageParameters:J.a,ValidityState:J.a,VideoPlaybackQuality:J.a,VideoTrack:J.a,VTTRegion:J.a,WindowClient:J.a,WorkletAnimation:J.a,WorkletGlobalScope:J.a,XPathEvaluator:J.a,XPathExpression:J.a,XPathNSResolver:J.a,XPathResult:J.a,XMLSerializer:J.a,XSLTProcessor:J.a,Bluetooth:J.a,BluetoothCharacteristicProperties:J.a,BluetoothRemoteGATTServer:J.a,BluetoothRemoteGATTService:J.a,BluetoothUUID:J.a,BudgetService:J.a,Cache:J.a,DOMFileSystemSync:J.a,DirectoryEntrySync:J.a,DirectoryReaderSync:J.a,EntrySync:J.a,FileEntrySync:J.a,FileReaderSync:J.a,FileWriterSync:J.a,HTMLAllCollection:J.a,Mojo:J.a,MojoHandle:J.a,MojoWatcher:J.a,NFC:J.a,PagePopupController:J.a,Report:J.a,Request:J.a,Response:J.a,SubtleCrypto:J.a,USBAlternateInterface:J.a,USBConfiguration:J.a,USBDevice:J.a,USBEndpoint:J.a,USBInTransferResult:J.a,USBInterface:J.a,USBIsochronousInTransferPacket:J.a,USBIsochronousInTransferResult:J.a,USBIsochronousOutTransferPacket:J.a,USBIsochronousOutTransferResult:J.a,USBOutTransferResult:J.a,WorkerLocation:J.a,WorkerNavigator:J.a,Worklet:J.a,IDBCursor:J.a,IDBCursorWithValue:J.a,IDBFactory:J.a,IDBIndex:J.a,IDBObjectStore:J.a,IDBObservation:J.a,IDBObserver:J.a,IDBObserverChanges:J.a,SVGAngle:J.a,SVGAnimatedAngle:J.a,SVGAnimatedBoolean:J.a,SVGAnimatedEnumeration:J.a,SVGAnimatedInteger:J.a,SVGAnimatedLength:J.a,SVGAnimatedLengthList:J.a,SVGAnimatedNumber:J.a,SVGAnimatedNumberList:J.a,SVGAnimatedPreserveAspectRatio:J.a,SVGAnimatedRect:J.a,SVGAnimatedString:J.a,SVGAnimatedTransformList:J.a,SVGMatrix:J.a,SVGPoint:J.a,SVGPreserveAspectRatio:J.a,SVGRect:J.a,SVGUnitTypes:J.a,AudioListener:J.a,AudioParam:J.a,AudioTrack:J.a,AudioWorkletGlobalScope:J.a,AudioWorkletProcessor:J.a,PeriodicWave:J.a,WebGLActiveInfo:J.a,ANGLEInstancedArrays:J.a,ANGLE_instanced_arrays:J.a,WebGLBuffer:J.a,WebGLCanvas:J.a,WebGLColorBufferFloat:J.a,WebGLCompressedTextureASTC:J.a,WebGLCompressedTextureATC:J.a,WEBGL_compressed_texture_atc:J.a,WebGLCompressedTextureETC1:J.a,WEBGL_compressed_texture_etc1:J.a,WebGLCompressedTextureETC:J.a,WebGLCompressedTexturePVRTC:J.a,WEBGL_compressed_texture_pvrtc:J.a,WebGLCompressedTextureS3TC:J.a,WEBGL_compressed_texture_s3tc:J.a,WebGLCompressedTextureS3TCsRGB:J.a,WebGLDebugRendererInfo:J.a,WEBGL_debug_renderer_info:J.a,WebGLDebugShaders:J.a,WEBGL_debug_shaders:J.a,WebGLDepthTexture:J.a,WEBGL_depth_texture:J.a,WebGLDrawBuffers:J.a,WEBGL_draw_buffers:J.a,EXTsRGB:J.a,EXT_sRGB:J.a,EXTBlendMinMax:J.a,EXT_blend_minmax:J.a,EXTColorBufferFloat:J.a,EXTColorBufferHalfFloat:J.a,EXTDisjointTimerQuery:J.a,EXTDisjointTimerQueryWebGL2:J.a,EXTFragDepth:J.a,EXT_frag_depth:J.a,EXTShaderTextureLOD:J.a,EXT_shader_texture_lod:J.a,EXTTextureFilterAnisotropic:J.a,EXT_texture_filter_anisotropic:J.a,WebGLFramebuffer:J.a,WebGLGetBufferSubDataAsync:J.a,WebGLLoseContext:J.a,WebGLExtensionLoseContext:J.a,WEBGL_lose_context:J.a,OESElementIndexUint:J.a,OES_element_index_uint:J.a,OESStandardDerivatives:J.a,OES_standard_derivatives:J.a,OESTextureFloat:J.a,OES_texture_float:J.a,OESTextureFloatLinear:J.a,OES_texture_float_linear:J.a,OESTextureHalfFloat:J.a,OES_texture_half_float:J.a,OESTextureHalfFloatLinear:J.a,OES_texture_half_float_linear:J.a,OESVertexArrayObject:J.a,OES_vertex_array_object:J.a,WebGLProgram:J.a,WebGLQuery:J.a,WebGLRenderbuffer:J.a,WebGLRenderingContext:J.a,WebGL2RenderingContext:J.a,WebGLSampler:J.a,WebGLShader:J.a,WebGLShaderPrecisionFormat:J.a,WebGLSync:J.a,WebGLTexture:J.a,WebGLTimerQueryEXT:J.a,WebGLTransformFeedback:J.a,WebGLUniformLocation:J.a,WebGLVertexArrayObject:J.a,WebGLVertexArrayObjectOES:J.a,WebGL2RenderingContextBase:J.a,ArrayBuffer:A.co,SharedArrayBuffer:A.co,ArrayBufferView:A.dO,DataView:A.dM,Float32Array:A.fu,Float64Array:A.fv,Int16Array:A.fw,Int32Array:A.fx,Int8Array:A.fy,Uint16Array:A.fz,Uint32Array:A.fA,Uint8ClampedArray:A.dP,CanvasPixelArray:A.dP,Uint8Array:A.dQ,HTMLAudioElement:A.q,HTMLBRElement:A.q,HTMLCanvasElement:A.q,HTMLContentElement:A.q,HTMLDListElement:A.q,HTMLDataElement:A.q,HTMLDataListElement:A.q,HTMLDetailsElement:A.q,HTMLDialogElement:A.q,HTMLEmbedElement:A.q,HTMLFieldSetElement:A.q,HTMLHRElement:A.q,HTMLHeadElement:A.q,HTMLHtmlElement:A.q,HTMLIFrameElement:A.q,HTMLLIElement:A.q,HTMLLabelElement:A.q,HTMLLegendElement:A.q,HTMLLinkElement:A.q,HTMLMapElement:A.q,HTMLMediaElement:A.q,HTMLMenuElement:A.q,HTMLMetaElement:A.q,HTMLMeterElement:A.q,HTMLModElement:A.q,HTMLOListElement:A.q,HTMLObjectElement:A.q,HTMLOptGroupElement:A.q,HTMLOutputElement:A.q,HTMLParamElement:A.q,HTMLPictureElement:A.q,HTMLPreElement:A.q,HTMLProgressElement:A.q,HTMLQuoteElement:A.q,HTMLScriptElement:A.q,HTMLShadowElement:A.q,HTMLSlotElement:A.q,HTMLSourceElement:A.q,HTMLStyleElement:A.q,HTMLTableCaptionElement:A.q,HTMLTableCellElement:A.q,HTMLTableDataCellElement:A.q,HTMLTableHeaderCellElement:A.q,HTMLTableColElement:A.q,HTMLTimeElement:A.q,HTMLTitleElement:A.q,HTMLTrackElement:A.q,HTMLUListElement:A.q,HTMLUnknownElement:A.q,HTMLVideoElement:A.q,HTMLDirectoryElement:A.q,HTMLFontElement:A.q,HTMLFrameElement:A.q,HTMLFrameSetElement:A.q,HTMLMarqueeElement:A.q,HTMLElement:A.q,AccessibleNodeList:A.eO,HTMLAnchorElement:A.cJ,HTMLAreaElement:A.eP,HTMLBaseElement:A.cK,Blob:A.bP,HTMLBodyElement:A.cb,HTMLButtonElement:A.bQ,CDATASection:A.bp,CharacterData:A.bp,Comment:A.bp,ProcessingInstruction:A.bp,Text:A.bp,CSSPerspective:A.f3,CSSCharsetRule:A.Y,CSSConditionRule:A.Y,CSSFontFaceRule:A.Y,CSSGroupingRule:A.Y,CSSImportRule:A.Y,CSSKeyframeRule:A.Y,MozCSSKeyframeRule:A.Y,WebKitCSSKeyframeRule:A.Y,CSSKeyframesRule:A.Y,MozCSSKeyframesRule:A.Y,WebKitCSSKeyframesRule:A.Y,CSSMediaRule:A.Y,CSSNamespaceRule:A.Y,CSSPageRule:A.Y,CSSRule:A.Y,CSSStyleRule:A.Y,CSSSupportsRule:A.Y,CSSViewportRule:A.Y,CSSStyleDeclaration:A.cd,MSStyleCSSProperties:A.cd,CSS2Properties:A.cd,CSSImageValue:A.aH,CSSKeywordValue:A.aH,CSSNumericValue:A.aH,CSSPositionValue:A.aH,CSSResourceValue:A.aH,CSSUnitValue:A.aH,CSSURLImageValue:A.aH,CSSStyleValue:A.aH,CSSMatrixComponent:A.be,CSSRotation:A.be,CSSScale:A.be,CSSSkew:A.be,CSSTranslation:A.be,CSSTransformComponent:A.be,CSSTransformValue:A.f4,CSSUnparsedValue:A.f5,DataTransferItemList:A.f6,HTMLDivElement:A.dp,XMLDocument:A.ce,Document:A.ce,DOMException:A.f7,DOMImplementation:A.dq,ClientRectList:A.dr,DOMRectList:A.dr,DOMRectReadOnly:A.ds,DOMStringList:A.f8,DOMTokenList:A.f9,MathMLElement:A.D,Element:A.D,AbortPaymentEvent:A.o,AnimationEvent:A.o,AnimationPlaybackEvent:A.o,ApplicationCacheErrorEvent:A.o,BackgroundFetchClickEvent:A.o,BackgroundFetchEvent:A.o,BackgroundFetchFailEvent:A.o,BackgroundFetchedEvent:A.o,BeforeInstallPromptEvent:A.o,BeforeUnloadEvent:A.o,BlobEvent:A.o,CanMakePaymentEvent:A.o,ClipboardEvent:A.o,CloseEvent:A.o,CustomEvent:A.o,DeviceMotionEvent:A.o,DeviceOrientationEvent:A.o,ErrorEvent:A.o,ExtendableEvent:A.o,ExtendableMessageEvent:A.o,FetchEvent:A.o,FontFaceSetLoadEvent:A.o,ForeignFetchEvent:A.o,GamepadEvent:A.o,HashChangeEvent:A.o,InstallEvent:A.o,MediaEncryptedEvent:A.o,MediaKeyMessageEvent:A.o,MediaQueryListEvent:A.o,MediaStreamEvent:A.o,MediaStreamTrackEvent:A.o,MessageEvent:A.o,MIDIConnectionEvent:A.o,MIDIMessageEvent:A.o,MutationEvent:A.o,NotificationEvent:A.o,PageTransitionEvent:A.o,PaymentRequestEvent:A.o,PaymentRequestUpdateEvent:A.o,PopStateEvent:A.o,PresentationConnectionAvailableEvent:A.o,PresentationConnectionCloseEvent:A.o,PromiseRejectionEvent:A.o,PushEvent:A.o,RTCDataChannelEvent:A.o,RTCDTMFToneChangeEvent:A.o,RTCPeerConnectionIceEvent:A.o,RTCTrackEvent:A.o,SecurityPolicyViolationEvent:A.o,SensorErrorEvent:A.o,SpeechRecognitionError:A.o,SpeechRecognitionEvent:A.o,SpeechSynthesisEvent:A.o,StorageEvent:A.o,SyncEvent:A.o,TrackEvent:A.o,TransitionEvent:A.o,WebKitTransitionEvent:A.o,VRDeviceEvent:A.o,VRDisplayEvent:A.o,VRSessionEvent:A.o,MojoInterfaceRequestEvent:A.o,USBConnectionEvent:A.o,IDBVersionChangeEvent:A.o,AudioProcessingEvent:A.o,OfflineAudioCompletionEvent:A.o,WebGLContextEvent:A.o,Event:A.o,InputEvent:A.o,SubmitEvent:A.o,EventSource:A.du,AbsoluteOrientationSensor:A.f,Accelerometer:A.f,AccessibleNode:A.f,AmbientLightSensor:A.f,Animation:A.f,ApplicationCache:A.f,DOMApplicationCache:A.f,OfflineResourceList:A.f,BackgroundFetchRegistration:A.f,BatteryManager:A.f,BroadcastChannel:A.f,CanvasCaptureMediaStreamTrack:A.f,FontFaceSet:A.f,Gyroscope:A.f,LinearAccelerationSensor:A.f,Magnetometer:A.f,MediaDevices:A.f,MediaKeySession:A.f,MediaQueryList:A.f,MediaRecorder:A.f,MediaSource:A.f,MediaStream:A.f,MediaStreamTrack:A.f,MIDIAccess:A.f,MIDIInput:A.f,MIDIOutput:A.f,MIDIPort:A.f,NetworkInformation:A.f,Notification:A.f,OffscreenCanvas:A.f,OrientationSensor:A.f,PaymentRequest:A.f,Performance:A.f,PermissionStatus:A.f,PresentationAvailability:A.f,PresentationConnection:A.f,PresentationConnectionList:A.f,PresentationRequest:A.f,RelativeOrientationSensor:A.f,RemotePlayback:A.f,RTCDataChannel:A.f,DataChannel:A.f,RTCDTMFSender:A.f,RTCPeerConnection:A.f,webkitRTCPeerConnection:A.f,mozRTCPeerConnection:A.f,ScreenOrientation:A.f,Sensor:A.f,ServiceWorker:A.f,ServiceWorkerContainer:A.f,ServiceWorkerRegistration:A.f,SharedWorker:A.f,SpeechRecognition:A.f,webkitSpeechRecognition:A.f,SpeechSynthesis:A.f,SpeechSynthesisUtterance:A.f,VR:A.f,VRDevice:A.f,VRDisplay:A.f,VRSession:A.f,VisualViewport:A.f,WebSocket:A.f,Worker:A.f,WorkerPerformance:A.f,BluetoothDevice:A.f,BluetoothRemoteGATTCharacteristic:A.f,Clipboard:A.f,MojoInterfaceInterceptor:A.f,USB:A.f,IDBDatabase:A.f,IDBOpenDBRequest:A.f,IDBVersionChangeRequest:A.f,IDBRequest:A.f,IDBTransaction:A.f,AnalyserNode:A.f,RealtimeAnalyserNode:A.f,AudioBufferSourceNode:A.f,AudioDestinationNode:A.f,AudioNode:A.f,AudioScheduledSourceNode:A.f,AudioWorkletNode:A.f,BiquadFilterNode:A.f,ChannelMergerNode:A.f,AudioChannelMerger:A.f,ChannelSplitterNode:A.f,AudioChannelSplitter:A.f,ConstantSourceNode:A.f,ConvolverNode:A.f,DelayNode:A.f,DynamicsCompressorNode:A.f,GainNode:A.f,AudioGainNode:A.f,IIRFilterNode:A.f,MediaElementAudioSourceNode:A.f,MediaStreamAudioDestinationNode:A.f,MediaStreamAudioSourceNode:A.f,OscillatorNode:A.f,Oscillator:A.f,PannerNode:A.f,AudioPannerNode:A.f,webkitAudioPannerNode:A.f,ScriptProcessorNode:A.f,JavaScriptAudioNode:A.f,StereoPannerNode:A.f,WaveShaperNode:A.f,EventTarget:A.f,File:A.aM,FileList:A.dw,FileReader:A.dx,FileWriter:A.fb,HTMLFormElement:A.cg,Gamepad:A.aN,HTMLHeadingElement:A.dy,History:A.fd,HTMLCollection:A.bT,HTMLFormControlsCollection:A.bT,HTMLOptionsCollection:A.bT,HTMLDocument:A.dz,XMLHttpRequest:A.bz,XMLHttpRequestUpload:A.ci,XMLHttpRequestEventTarget:A.ci,ImageData:A.cN,HTMLImageElement:A.dA,HTMLInputElement:A.bU,KeyboardEvent:A.bB,Location:A.cT,MediaList:A.fp,MessagePort:A.fq,MIDIInputMap:A.fr,MIDIOutputMap:A.fs,MimeType:A.aP,MimeTypeArray:A.ft,MouseEvent:A.az,DragEvent:A.az,PointerEvent:A.az,WheelEvent:A.az,DocumentFragment:A.v,ShadowRoot:A.v,DocumentType:A.v,Node:A.v,NodeList:A.cV,RadioNodeList:A.cV,HTMLOptionElement:A.bC,HTMLParagraphElement:A.dT,Plugin:A.aQ,PluginArray:A.fG,ProgressEvent:A.b8,ResourceProgressEvent:A.b8,RTCStatsReport:A.fI,HTMLSelectElement:A.bY,SourceBuffer:A.aS,SourceBufferList:A.fK,HTMLSpanElement:A.dX,SpeechGrammar:A.aT,SpeechGrammarList:A.fL,SpeechRecognitionResult:A.aU,Storage:A.dZ,CSSStyleSheet:A.aA,StyleSheet:A.aA,HTMLTableElement:A.e1,HTMLTableRowElement:A.fO,HTMLTableSectionElement:A.fP,HTMLTemplateElement:A.d1,HTMLTextAreaElement:A.cq,TextTrack:A.aV,TextTrackCue:A.aB,VTTCue:A.aB,TextTrackCueList:A.fR,TextTrackList:A.fS,TimeRanges:A.fT,Touch:A.aW,TouchList:A.fV,TrackDefaultList:A.fW,CompositionEvent:A.bs,FocusEvent:A.bs,TextEvent:A.bs,TouchEvent:A.bs,UIEvent:A.bs,URL:A.h1,VideoTrackList:A.h3,Window:A.c2,DOMWindow:A.c2,DedicatedWorkerGlobalScope:A.bt,ServiceWorkerGlobalScope:A.bt,SharedWorkerGlobalScope:A.bt,WorkerGlobalScope:A.bt,Attr:A.d4,CSSRuleList:A.ha,ClientRect:A.ed,DOMRect:A.ed,GamepadList:A.ho,NamedNodeMap:A.el,MozNamedAttrMap:A.el,SpeechRecognitionResultList:A.hP,StyleSheetList:A.hV,IDBKeyRange:A.cS,SVGLength:A.b_,SVGLengthList:A.fn,SVGNumber:A.b2,SVGNumberList:A.fC,SVGPointList:A.fH,SVGScriptElement:A.d_,SVGStringList:A.fN,SVGAElement:A.u,SVGAnimateElement:A.u,SVGAnimateMotionElement:A.u,SVGAnimateTransformElement:A.u,SVGAnimationElement:A.u,SVGCircleElement:A.u,SVGClipPathElement:A.u,SVGDefsElement:A.u,SVGDescElement:A.u,SVGDiscardElement:A.u,SVGEllipseElement:A.u,SVGFEBlendElement:A.u,SVGFEColorMatrixElement:A.u,SVGFEComponentTransferElement:A.u,SVGFECompositeElement:A.u,SVGFEConvolveMatrixElement:A.u,SVGFEDiffuseLightingElement:A.u,SVGFEDisplacementMapElement:A.u,SVGFEDistantLightElement:A.u,SVGFEFloodElement:A.u,SVGFEFuncAElement:A.u,SVGFEFuncBElement:A.u,SVGFEFuncGElement:A.u,SVGFEFuncRElement:A.u,SVGFEGaussianBlurElement:A.u,SVGFEImageElement:A.u,SVGFEMergeElement:A.u,SVGFEMergeNodeElement:A.u,SVGFEMorphologyElement:A.u,SVGFEOffsetElement:A.u,SVGFEPointLightElement:A.u,SVGFESpecularLightingElement:A.u,SVGFESpotLightElement:A.u,SVGFETileElement:A.u,SVGFETurbulenceElement:A.u,SVGFilterElement:A.u,SVGForeignObjectElement:A.u,SVGGElement:A.u,SVGGeometryElement:A.u,SVGGraphicsElement:A.u,SVGImageElement:A.u,SVGLineElement:A.u,SVGLinearGradientElement:A.u,SVGMarkerElement:A.u,SVGMaskElement:A.u,SVGMetadataElement:A.u,SVGPathElement:A.u,SVGPatternElement:A.u,SVGPolygonElement:A.u,SVGPolylineElement:A.u,SVGRadialGradientElement:A.u,SVGRectElement:A.u,SVGSetElement:A.u,SVGStopElement:A.u,SVGStyleElement:A.u,SVGSVGElement:A.u,SVGSwitchElement:A.u,SVGSymbolElement:A.u,SVGTSpanElement:A.u,SVGTextContentElement:A.u,SVGTextElement:A.u,SVGTextPathElement:A.u,SVGTextPositioningElement:A.u,SVGTitleElement:A.u,SVGUseElement:A.u,SVGViewElement:A.u,SVGGradientElement:A.u,SVGComponentTransferFunctionElement:A.u,SVGFEDropShadowElement:A.u,SVGMPathElement:A.u,SVGElement:A.u,SVGTransform:A.b3,SVGTransformList:A.fX,AudioBuffer:A.eT,AudioParamMap:A.eU,AudioTrackList:A.eV,AudioContext:A.bO,webkitAudioContext:A.bO,BaseAudioContext:A.bO,OfflineAudioContext:A.fD})
hunkHelpers.setOrUpdateLeafTags({WebGL:true,AnimationEffectReadOnly:true,AnimationEffectTiming:true,AnimationEffectTimingReadOnly:true,AnimationTimeline:true,AnimationWorkletGlobalScope:true,AuthenticatorAssertionResponse:true,AuthenticatorAttestationResponse:true,AuthenticatorResponse:true,BackgroundFetchFetch:true,BackgroundFetchManager:true,BackgroundFetchSettledFetch:true,BarProp:true,BarcodeDetector:true,BluetoothRemoteGATTDescriptor:true,Body:true,BudgetState:true,CacheStorage:true,CanvasGradient:true,CanvasPattern:true,CanvasRenderingContext2D:true,Client:true,Clients:true,CookieStore:true,Coordinates:true,Credential:true,CredentialUserData:true,CredentialsContainer:true,Crypto:true,CryptoKey:true,CSS:true,CSSVariableReferenceValue:true,CustomElementRegistry:true,DataTransfer:true,DataTransferItem:true,DeprecatedStorageInfo:true,DeprecatedStorageQuota:true,DeprecationReport:true,DetectedBarcode:true,DetectedFace:true,DetectedText:true,DeviceAcceleration:true,DeviceRotationRate:true,DirectoryEntry:true,webkitFileSystemDirectoryEntry:true,FileSystemDirectoryEntry:true,DirectoryReader:true,WebKitDirectoryReader:true,webkitFileSystemDirectoryReader:true,FileSystemDirectoryReader:true,DocumentOrShadowRoot:true,DocumentTimeline:true,DOMError:true,Iterator:true,DOMMatrix:true,DOMMatrixReadOnly:true,DOMParser:true,DOMPoint:true,DOMPointReadOnly:true,DOMQuad:true,DOMStringMap:true,Entry:true,webkitFileSystemEntry:true,FileSystemEntry:true,External:true,FaceDetector:true,FederatedCredential:true,FileEntry:true,webkitFileSystemFileEntry:true,FileSystemFileEntry:true,DOMFileSystem:true,WebKitFileSystem:true,webkitFileSystem:true,FileSystem:true,FontFace:true,FontFaceSource:true,FormData:true,GamepadButton:true,GamepadPose:true,Geolocation:true,Position:true,GeolocationPosition:true,Headers:true,HTMLHyperlinkElementUtils:true,IdleDeadline:true,ImageBitmap:true,ImageBitmapRenderingContext:true,ImageCapture:true,InputDeviceCapabilities:true,IntersectionObserver:true,IntersectionObserverEntry:true,InterventionReport:true,KeyframeEffect:true,KeyframeEffectReadOnly:true,MediaCapabilities:true,MediaCapabilitiesInfo:true,MediaDeviceInfo:true,MediaError:true,MediaKeyStatusMap:true,MediaKeySystemAccess:true,MediaKeys:true,MediaKeysPolicy:true,MediaMetadata:true,MediaSession:true,MediaSettingsRange:true,MemoryInfo:true,MessageChannel:true,Metadata:true,MutationObserver:true,WebKitMutationObserver:true,MutationRecord:true,NavigationPreloadManager:true,Navigator:true,NavigatorAutomationInformation:true,NavigatorConcurrentHardware:true,NavigatorCookies:true,NavigatorUserMediaError:true,NodeFilter:true,NodeIterator:true,NonDocumentTypeChildNode:true,NonElementParentNode:true,NoncedElement:true,OffscreenCanvasRenderingContext2D:true,OverconstrainedError:true,PaintRenderingContext2D:true,PaintSize:true,PaintWorkletGlobalScope:true,PasswordCredential:true,Path2D:true,PaymentAddress:true,PaymentInstruments:true,PaymentManager:true,PaymentResponse:true,PerformanceEntry:true,PerformanceLongTaskTiming:true,PerformanceMark:true,PerformanceMeasure:true,PerformanceNavigation:true,PerformanceNavigationTiming:true,PerformanceObserver:true,PerformanceObserverEntryList:true,PerformancePaintTiming:true,PerformanceResourceTiming:true,PerformanceServerTiming:true,PerformanceTiming:true,Permissions:true,PhotoCapabilities:true,PositionError:true,GeolocationPositionError:true,Presentation:true,PresentationReceiver:true,PublicKeyCredential:true,PushManager:true,PushMessageData:true,PushSubscription:true,PushSubscriptionOptions:true,Range:true,RelatedApplication:true,ReportBody:true,ReportingObserver:true,ResizeObserver:true,ResizeObserverEntry:true,RTCCertificate:true,RTCIceCandidate:true,mozRTCIceCandidate:true,RTCLegacyStatsReport:true,RTCRtpContributingSource:true,RTCRtpReceiver:true,RTCRtpSender:true,RTCSessionDescription:true,mozRTCSessionDescription:true,RTCStatsResponse:true,Screen:true,ScrollState:true,ScrollTimeline:true,Selection:true,SpeechRecognitionAlternative:true,SpeechSynthesisVoice:true,StaticRange:true,StorageManager:true,StyleMedia:true,StylePropertyMap:true,StylePropertyMapReadonly:true,SyncManager:true,TaskAttributionTiming:true,TextDetector:true,TextMetrics:true,TrackDefault:true,TreeWalker:true,TrustedHTML:true,TrustedScriptURL:true,TrustedURL:true,UnderlyingSourceBase:true,URLSearchParams:true,VRCoordinateSystem:true,VRDisplayCapabilities:true,VREyeParameters:true,VRFrameData:true,VRFrameOfReference:true,VRPose:true,VRStageBounds:true,VRStageBoundsPoint:true,VRStageParameters:true,ValidityState:true,VideoPlaybackQuality:true,VideoTrack:true,VTTRegion:true,WindowClient:true,WorkletAnimation:true,WorkletGlobalScope:true,XPathEvaluator:true,XPathExpression:true,XPathNSResolver:true,XPathResult:true,XMLSerializer:true,XSLTProcessor:true,Bluetooth:true,BluetoothCharacteristicProperties:true,BluetoothRemoteGATTServer:true,BluetoothRemoteGATTService:true,BluetoothUUID:true,BudgetService:true,Cache:true,DOMFileSystemSync:true,DirectoryEntrySync:true,DirectoryReaderSync:true,EntrySync:true,FileEntrySync:true,FileReaderSync:true,FileWriterSync:true,HTMLAllCollection:true,Mojo:true,MojoHandle:true,MojoWatcher:true,NFC:true,PagePopupController:true,Report:true,Request:true,Response:true,SubtleCrypto:true,USBAlternateInterface:true,USBConfiguration:true,USBDevice:true,USBEndpoint:true,USBInTransferResult:true,USBInterface:true,USBIsochronousInTransferPacket:true,USBIsochronousInTransferResult:true,USBIsochronousOutTransferPacket:true,USBIsochronousOutTransferResult:true,USBOutTransferResult:true,WorkerLocation:true,WorkerNavigator:true,Worklet:true,IDBCursor:true,IDBCursorWithValue:true,IDBFactory:true,IDBIndex:true,IDBObjectStore:true,IDBObservation:true,IDBObserver:true,IDBObserverChanges:true,SVGAngle:true,SVGAnimatedAngle:true,SVGAnimatedBoolean:true,SVGAnimatedEnumeration:true,SVGAnimatedInteger:true,SVGAnimatedLength:true,SVGAnimatedLengthList:true,SVGAnimatedNumber:true,SVGAnimatedNumberList:true,SVGAnimatedPreserveAspectRatio:true,SVGAnimatedRect:true,SVGAnimatedString:true,SVGAnimatedTransformList:true,SVGMatrix:true,SVGPoint:true,SVGPreserveAspectRatio:true,SVGRect:true,SVGUnitTypes:true,AudioListener:true,AudioParam:true,AudioTrack:true,AudioWorkletGlobalScope:true,AudioWorkletProcessor:true,PeriodicWave:true,WebGLActiveInfo:true,ANGLEInstancedArrays:true,ANGLE_instanced_arrays:true,WebGLBuffer:true,WebGLCanvas:true,WebGLColorBufferFloat:true,WebGLCompressedTextureASTC:true,WebGLCompressedTextureATC:true,WEBGL_compressed_texture_atc:true,WebGLCompressedTextureETC1:true,WEBGL_compressed_texture_etc1:true,WebGLCompressedTextureETC:true,WebGLCompressedTexturePVRTC:true,WEBGL_compressed_texture_pvrtc:true,WebGLCompressedTextureS3TC:true,WEBGL_compressed_texture_s3tc:true,WebGLCompressedTextureS3TCsRGB:true,WebGLDebugRendererInfo:true,WEBGL_debug_renderer_info:true,WebGLDebugShaders:true,WEBGL_debug_shaders:true,WebGLDepthTexture:true,WEBGL_depth_texture:true,WebGLDrawBuffers:true,WEBGL_draw_buffers:true,EXTsRGB:true,EXT_sRGB:true,EXTBlendMinMax:true,EXT_blend_minmax:true,EXTColorBufferFloat:true,EXTColorBufferHalfFloat:true,EXTDisjointTimerQuery:true,EXTDisjointTimerQueryWebGL2:true,EXTFragDepth:true,EXT_frag_depth:true,EXTShaderTextureLOD:true,EXT_shader_texture_lod:true,EXTTextureFilterAnisotropic:true,EXT_texture_filter_anisotropic:true,WebGLFramebuffer:true,WebGLGetBufferSubDataAsync:true,WebGLLoseContext:true,WebGLExtensionLoseContext:true,WEBGL_lose_context:true,OESElementIndexUint:true,OES_element_index_uint:true,OESStandardDerivatives:true,OES_standard_derivatives:true,OESTextureFloat:true,OES_texture_float:true,OESTextureFloatLinear:true,OES_texture_float_linear:true,OESTextureHalfFloat:true,OES_texture_half_float:true,OESTextureHalfFloatLinear:true,OES_texture_half_float_linear:true,OESVertexArrayObject:true,OES_vertex_array_object:true,WebGLProgram:true,WebGLQuery:true,WebGLRenderbuffer:true,WebGLRenderingContext:true,WebGL2RenderingContext:true,WebGLSampler:true,WebGLShader:true,WebGLShaderPrecisionFormat:true,WebGLSync:true,WebGLTexture:true,WebGLTimerQueryEXT:true,WebGLTransformFeedback:true,WebGLUniformLocation:true,WebGLVertexArrayObject:true,WebGLVertexArrayObjectOES:true,WebGL2RenderingContextBase:true,ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false,HTMLAudioElement:true,HTMLBRElement:true,HTMLCanvasElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOutputElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,AccessibleNodeList:true,HTMLAnchorElement:true,HTMLAreaElement:true,HTMLBaseElement:true,Blob:false,HTMLBodyElement:true,HTMLButtonElement:true,CDATASection:true,CharacterData:true,Comment:true,ProcessingInstruction:true,Text:true,CSSPerspective:true,CSSCharsetRule:true,CSSConditionRule:true,CSSFontFaceRule:true,CSSGroupingRule:true,CSSImportRule:true,CSSKeyframeRule:true,MozCSSKeyframeRule:true,WebKitCSSKeyframeRule:true,CSSKeyframesRule:true,MozCSSKeyframesRule:true,WebKitCSSKeyframesRule:true,CSSMediaRule:true,CSSNamespaceRule:true,CSSPageRule:true,CSSRule:true,CSSStyleRule:true,CSSSupportsRule:true,CSSViewportRule:true,CSSStyleDeclaration:true,MSStyleCSSProperties:true,CSS2Properties:true,CSSImageValue:true,CSSKeywordValue:true,CSSNumericValue:true,CSSPositionValue:true,CSSResourceValue:true,CSSUnitValue:true,CSSURLImageValue:true,CSSStyleValue:false,CSSMatrixComponent:true,CSSRotation:true,CSSScale:true,CSSSkew:true,CSSTranslation:true,CSSTransformComponent:false,CSSTransformValue:true,CSSUnparsedValue:true,DataTransferItemList:true,HTMLDivElement:true,XMLDocument:true,Document:false,DOMException:true,DOMImplementation:true,ClientRectList:true,DOMRectList:true,DOMRectReadOnly:false,DOMStringList:true,DOMTokenList:true,MathMLElement:true,Element:false,AbortPaymentEvent:true,AnimationEvent:true,AnimationPlaybackEvent:true,ApplicationCacheErrorEvent:true,BackgroundFetchClickEvent:true,BackgroundFetchEvent:true,BackgroundFetchFailEvent:true,BackgroundFetchedEvent:true,BeforeInstallPromptEvent:true,BeforeUnloadEvent:true,BlobEvent:true,CanMakePaymentEvent:true,ClipboardEvent:true,CloseEvent:true,CustomEvent:true,DeviceMotionEvent:true,DeviceOrientationEvent:true,ErrorEvent:true,ExtendableEvent:true,ExtendableMessageEvent:true,FetchEvent:true,FontFaceSetLoadEvent:true,ForeignFetchEvent:true,GamepadEvent:true,HashChangeEvent:true,InstallEvent:true,MediaEncryptedEvent:true,MediaKeyMessageEvent:true,MediaQueryListEvent:true,MediaStreamEvent:true,MediaStreamTrackEvent:true,MessageEvent:true,MIDIConnectionEvent:true,MIDIMessageEvent:true,MutationEvent:true,NotificationEvent:true,PageTransitionEvent:true,PaymentRequestEvent:true,PaymentRequestUpdateEvent:true,PopStateEvent:true,PresentationConnectionAvailableEvent:true,PresentationConnectionCloseEvent:true,PromiseRejectionEvent:true,PushEvent:true,RTCDataChannelEvent:true,RTCDTMFToneChangeEvent:true,RTCPeerConnectionIceEvent:true,RTCTrackEvent:true,SecurityPolicyViolationEvent:true,SensorErrorEvent:true,SpeechRecognitionError:true,SpeechRecognitionEvent:true,SpeechSynthesisEvent:true,StorageEvent:true,SyncEvent:true,TrackEvent:true,TransitionEvent:true,WebKitTransitionEvent:true,VRDeviceEvent:true,VRDisplayEvent:true,VRSessionEvent:true,MojoInterfaceRequestEvent:true,USBConnectionEvent:true,IDBVersionChangeEvent:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,WebGLContextEvent:true,Event:false,InputEvent:false,SubmitEvent:false,EventSource:true,AbsoluteOrientationSensor:true,Accelerometer:true,AccessibleNode:true,AmbientLightSensor:true,Animation:true,ApplicationCache:true,DOMApplicationCache:true,OfflineResourceList:true,BackgroundFetchRegistration:true,BatteryManager:true,BroadcastChannel:true,CanvasCaptureMediaStreamTrack:true,FontFaceSet:true,Gyroscope:true,LinearAccelerationSensor:true,Magnetometer:true,MediaDevices:true,MediaKeySession:true,MediaQueryList:true,MediaRecorder:true,MediaSource:true,MediaStream:true,MediaStreamTrack:true,MIDIAccess:true,MIDIInput:true,MIDIOutput:true,MIDIPort:true,NetworkInformation:true,Notification:true,OffscreenCanvas:true,OrientationSensor:true,PaymentRequest:true,Performance:true,PermissionStatus:true,PresentationAvailability:true,PresentationConnection:true,PresentationConnectionList:true,PresentationRequest:true,RelativeOrientationSensor:true,RemotePlayback:true,RTCDataChannel:true,DataChannel:true,RTCDTMFSender:true,RTCPeerConnection:true,webkitRTCPeerConnection:true,mozRTCPeerConnection:true,ScreenOrientation:true,Sensor:true,ServiceWorker:true,ServiceWorkerContainer:true,ServiceWorkerRegistration:true,SharedWorker:true,SpeechRecognition:true,webkitSpeechRecognition:true,SpeechSynthesis:true,SpeechSynthesisUtterance:true,VR:true,VRDevice:true,VRDisplay:true,VRSession:true,VisualViewport:true,WebSocket:true,Worker:true,WorkerPerformance:true,BluetoothDevice:true,BluetoothRemoteGATTCharacteristic:true,Clipboard:true,MojoInterfaceInterceptor:true,USB:true,IDBDatabase:true,IDBOpenDBRequest:true,IDBVersionChangeRequest:true,IDBRequest:true,IDBTransaction:true,AnalyserNode:true,RealtimeAnalyserNode:true,AudioBufferSourceNode:true,AudioDestinationNode:true,AudioNode:true,AudioScheduledSourceNode:true,AudioWorkletNode:true,BiquadFilterNode:true,ChannelMergerNode:true,AudioChannelMerger:true,ChannelSplitterNode:true,AudioChannelSplitter:true,ConstantSourceNode:true,ConvolverNode:true,DelayNode:true,DynamicsCompressorNode:true,GainNode:true,AudioGainNode:true,IIRFilterNode:true,MediaElementAudioSourceNode:true,MediaStreamAudioDestinationNode:true,MediaStreamAudioSourceNode:true,OscillatorNode:true,Oscillator:true,PannerNode:true,AudioPannerNode:true,webkitAudioPannerNode:true,ScriptProcessorNode:true,JavaScriptAudioNode:true,StereoPannerNode:true,WaveShaperNode:true,EventTarget:false,File:true,FileList:true,FileReader:true,FileWriter:true,HTMLFormElement:true,Gamepad:true,HTMLHeadingElement:true,History:true,HTMLCollection:true,HTMLFormControlsCollection:true,HTMLOptionsCollection:true,HTMLDocument:true,XMLHttpRequest:true,XMLHttpRequestUpload:true,XMLHttpRequestEventTarget:false,ImageData:true,HTMLImageElement:true,HTMLInputElement:true,KeyboardEvent:true,Location:true,MediaList:true,MessagePort:true,MIDIInputMap:true,MIDIOutputMap:true,MimeType:true,MimeTypeArray:true,MouseEvent:true,DragEvent:true,PointerEvent:true,WheelEvent:true,DocumentFragment:true,ShadowRoot:true,DocumentType:true,Node:false,NodeList:true,RadioNodeList:true,HTMLOptionElement:true,HTMLParagraphElement:true,Plugin:true,PluginArray:true,ProgressEvent:true,ResourceProgressEvent:true,RTCStatsReport:true,HTMLSelectElement:true,SourceBuffer:true,SourceBufferList:true,HTMLSpanElement:true,SpeechGrammar:true,SpeechGrammarList:true,SpeechRecognitionResult:true,Storage:true,CSSStyleSheet:true,StyleSheet:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,TextTrack:true,TextTrackCue:true,VTTCue:true,TextTrackCueList:true,TextTrackList:true,TimeRanges:true,Touch:true,TouchList:true,TrackDefaultList:true,CompositionEvent:true,FocusEvent:true,TextEvent:true,TouchEvent:true,UIEvent:false,URL:true,VideoTrackList:true,Window:true,DOMWindow:true,DedicatedWorkerGlobalScope:true,ServiceWorkerGlobalScope:true,SharedWorkerGlobalScope:true,WorkerGlobalScope:true,Attr:true,CSSRuleList:true,ClientRect:true,DOMRect:true,GamepadList:true,NamedNodeMap:true,MozNamedAttrMap:true,SpeechRecognitionResultList:true,StyleSheetList:true,IDBKeyRange:true,SVGLength:true,SVGLengthList:true,SVGNumber:true,SVGNumberList:true,SVGPointList:true,SVGScriptElement:true,SVGStringList:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true,SVGElement:false,SVGTransform:true,SVGTransformList:true,AudioBuffer:true,AudioParamMap:true,AudioTrackList:true,AudioContext:true,webkitAudioContext:true,BaseAudioContext:false,OfflineAudioContext:true})
A.au.$nativeSuperclassTag="ArrayBufferView"
A.em.$nativeSuperclassTag="ArrayBufferView"
A.en.$nativeSuperclassTag="ArrayBufferView"
A.dN.$nativeSuperclassTag="ArrayBufferView"
A.eo.$nativeSuperclassTag="ArrayBufferView"
A.ep.$nativeSuperclassTag="ArrayBufferView"
A.b1.$nativeSuperclassTag="ArrayBufferView"
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
var s=A.vq
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
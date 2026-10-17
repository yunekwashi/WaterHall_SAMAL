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
if(a[b]!==s){A.vB(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.B(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.oL(b)
return new s(c,this)}:function(){if(s===null)s=A.oL(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.oL(a).prototype
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
oR(a,b,c,d){return{i:a,p:b,e:c,x:d}},
nI(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.oP==null){A.vn()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.b(A.pG("Return interceptor for "+A.e(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.n_
if(o==null)o=$.n_=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.vu(a)
if(p!=null)return p
if(typeof a=="function")return B.af
s=Object.getPrototypeOf(a)
if(s==null)return B.Q
if(s===Object.prototype)return B.Q
if(typeof q=="function"){o=$.n_
if(o==null)o=$.n_=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.y,enumerable:false,writable:true,configurable:true})
return B.y}return B.y},
pk(a,b){if(a<0||a>4294967295)throw A.b(A.ah(a,0,4294967295,"length",null))
return J.t3(new Array(a),b)},
oe(a,b){if(a<0)throw A.b(A.aX("Length must be a non-negative integer: "+a,null))
return A.B(new Array(a),b.i("a9<0>"))},
pj(a,b){return A.B(new Array(a),b.i("a9<0>"))},
t3(a,b){var s=A.B(a,b.i("a9<0>"))
s.$flags=1
return s},
pl(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
t4(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.pl(r))break;++b}return b},
t5(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.d(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.pl(q))break}return b},
bM(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dC.prototype
return J.fi.prototype}if(typeof a=="string")return J.bV.prototype
if(a==null)return J.dD.prototype
if(typeof a=="boolean")return J.fg.prototype
if(Array.isArray(a))return J.a9.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bA.prototype
if(typeof a=="symbol")return J.cQ.prototype
if(typeof a=="bigint")return J.cP.prototype
return a}if(a instanceof A.H)return a
return J.nI(a)},
x(a){if(typeof a=="string")return J.bV.prototype
if(a==null)return a
if(Array.isArray(a))return J.a9.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bA.prototype
if(typeof a=="symbol")return J.cQ.prototype
if(typeof a=="bigint")return J.cP.prototype
return a}if(a instanceof A.H)return a
return J.nI(a)},
cD(a){if(a==null)return a
if(Array.isArray(a))return J.a9.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bA.prototype
if(typeof a=="symbol")return J.cQ.prototype
if(typeof a=="bigint")return J.cP.prototype
return a}if(a instanceof A.H)return a
return J.nI(a)},
vf(a){if(typeof a=="number")return J.ci.prototype
if(a==null)return a
if(!(a instanceof A.H))return J.bF.prototype
return a},
vg(a){if(typeof a=="number")return J.ci.prototype
if(typeof a=="string")return J.bV.prototype
if(a==null)return a
if(!(a instanceof A.H))return J.bF.prototype
return a},
oM(a){if(typeof a=="string")return J.bV.prototype
if(a==null)return a
if(!(a instanceof A.H))return J.bF.prototype
return a},
J(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bA.prototype
if(typeof a=="symbol")return J.cQ.prototype
if(typeof a=="bigint")return J.cP.prototype
return a}if(a instanceof A.H)return a
return J.nI(a)},
oN(a){if(a==null)return a
if(!(a instanceof A.H))return J.bF.prototype
return a},
j(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.bM(a).a0(a,b)},
rk(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.vf(a).bi(a,b)},
rl(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.vg(a).aG(a,b)},
i(a,b){if(typeof b==="number")if(Array.isArray(a)||typeof a=="string"||A.vq(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.x(a).h(a,b)},
am(a,b,c){return J.cD(a).k(a,b,c)},
ir(a){return J.J(a).eU(a)},
rm(a,b,c,d){return J.J(a).f4(a,b,c,d)},
rn(a,b){return J.J(a).fd(a,b)},
ro(a,b,c,d){return J.J(a).ff(a,b,c,d)},
rp(a,b,c){return J.J(a).fh(a,b,c)},
o2(a,b){return J.cD(a).m(a,b)},
rq(a,b,c,d){return J.J(a).bs(a,b,c,d)},
rr(a,b){return J.J(a).fH(a,b)},
rs(a,b,c){return J.J(a).ds(a,b,c)},
is(a){return J.oN(a).a3(a)},
o3(a,b){return J.x(a).v(a,b)},
o4(a,b){return J.J(a).M(a,b)},
eN(a,b){return J.cD(a).u(a,b)},
rt(a,b){return J.cD(a).fY(a,b)},
o5(a){return J.J(a).dB(a)},
it(a,b){return J.cD(a).q(a,b)},
ru(a){return J.J(a).gfI(a)},
cH(a){return J.J(a).gbu(a)},
c8(a){return J.J(a).gap(a)},
rv(a){return J.J(a).gaC(a)},
cI(a){return J.bM(a).gK(a)},
iu(a){return J.x(a).gE(a)},
o6(a){return J.x(a).gT(a)},
aF(a){return J.cD(a).gB(a)},
rw(a){return J.J(a).gH(a)},
an(a){return J.x(a).gj(a)},
rx(a){return J.J(a).gdM(a)},
a4(a){return J.J(a).gaO(a)},
ry(a){return J.J(a).gdN(a)},
oZ(a){return J.J(a).gdO(a)},
rz(a){return J.oN(a).gcw(a)},
o7(a){return J.oN(a).gag(a)},
rA(a){return J.J(a).ght(a)},
rB(a){return J.bM(a).gW(a)},
rC(a){return J.J(a).gep(a)},
rD(a){return J.J(a).ge_(a)},
c9(a,b,c){return J.cD(a).ar(a,b,c)},
rE(a,b){return J.bM(a).dJ(a,b)},
rF(a,b,c){return J.J(a).hh(a,b,c)},
iv(a){return J.J(a).dR(a)},
rG(a,b){return J.J(a).C(a,b)},
rH(a,b){return J.J(a).dV(a,b)},
rI(a,b){return J.J(a).eo(a,b)},
rJ(a,b){return J.J(a).sf6(a,b)},
dk(a,b){return J.J(a).sU(a,b)},
rK(a,b){return J.J(a).scP(a,b)},
q(a,b){return J.J(a).sP(a,b)},
rL(a,b,c){return J.J(a).cL(a,b,c)},
p_(a,b){return J.oM(a).eq(a,b)},
rM(a){return J.oM(a).hx(a)},
M(a){return J.bM(a).l(a)},
p0(a){return J.oM(a).A(a)},
rN(a,b){return J.cD(a).e7(a,b)},
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
a9:function a9(a){this.$ti=a},
ff:function ff(){},
lX:function lX(a){this.$ti=a},
bd:function bd(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
ci:function ci(){},
dC:function dC(){},
fi:function fi(){},
bV:function bV(){}},A={of:function of(){},
pn(a){return new A.dF("Field '"+a+"' has been assigned during initialization.")},
t8(a){return new A.dF("Field '"+a+"' has not been initialized.")},
nJ(a){var s,r=a^48
if(r<=9)return r
s=a|32
if(97<=s&&s<=102)return s-87
return-1},
c0(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
oq(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
cB(a,b,c){return a},
oQ(a){var s,r
for(s=$.b5.length,r=0;r<s;++r)if(a===$.b5[r])return!0
return!1},
e1(a,b,c,d){A.cY(b,"start")
if(c!=null){A.cY(c,"end")
if(b>c)A.bN(A.ah(b,0,c,"start",null))}return new A.e0(a,b,c,d.i("e0<0>"))},
t9(a,b,c,d){if(t.gt.b(a))return new A.bx(a,b,c.i("@<0>").I(d).i("bx<1,2>"))
return new A.aJ(a,b,c.i("@<0>").I(d).i("aJ<1,2>"))},
dB(){return new A.bq("No element")},
t1(){return new A.bq("Too many elements")},
dF:function dF(a){this.a=a},
f_:function f_(a){this.a=a},
nU:function nU(){},
mh:function mh(){},
n:function n(){},
a5:function a5(){},
e0:function e0(a,b,c,d){var _=this
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
cr:function cr(a,b){this.a=a
this.$ti=b},
e6:function e6(a,b){this.a=a
this.$ti=b},
aI:function aI(){},
bG:function bG(){},
d2:function d2(){},
hz:function hz(a){this.a=a},
cm:function cm(a,b){this.a=a
this.$ti=b},
c_:function c_(a){this.a=a},
p9(){throw A.b(A.P("Cannot modify unmodifiable Map"))},
qT(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
vq(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.dX.b(a)},
e(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.M(a)
return s},
dU(a){var s,r=$.pt
if(r==null)r=$.pt=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
px(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.d(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
dW(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.a.A(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
dV(a){var s,r,q,p
if(a instanceof A.H)return A.aK(A.ax(a),null)
s=J.bM(a)
if(s===B.ae||s===B.ag||t.cx.b(a)){r=B.B(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.aK(A.ax(a),null)},
th(a){var s,r,q
if(typeof a=="number"||A.eH(a))return J.M(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bR)return a.l(0)
s=$.oY()
for(r=0;r<s.length;++r){q=s[r].e3(a)
if(q!=null)return q}return"Instance of '"+A.dV(a)+"'"},
tf(){if(!!self.location)return self.location.href
return null},
ti(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
a6(a){var s
if(0<=a){if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.e.b4(s,10)|55296)>>>0,s&1023|56320)}}throw A.b(A.ah(a,0,1114111,null,null))},
py(a,b,c,d,e,f,g,h,i){var s,r,q,p=b-1
if(0<=a&&a<100){a+=400
p-=4800}s=B.e.aU(h,1000)
g+=B.e.ac(h-s,1000)
r=i?Date.UTC(a,p,c,d,e,f,g):new Date(a,p,c,d,e,f,g).valueOf()
q=!0
if(!isNaN(r))if(!(r<-864e13))if(!(r>864e13))q=r===864e13&&s!==0
if(q)return null
return r},
aQ(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
cW(a){return a.c?A.aQ(a).getUTCFullYear()+0:A.aQ(a).getFullYear()+0},
mf(a){return a.c?A.aQ(a).getUTCMonth()+1:A.aQ(a).getMonth()+1},
pu(a){return a.c?A.aQ(a).getUTCDate()+0:A.aQ(a).getDate()+0},
ol(a){return a.c?A.aQ(a).getUTCHours()+0:A.aQ(a).getHours()+0},
om(a){return a.c?A.aQ(a).getUTCMinutes()+0:A.aQ(a).getMinutes()+0},
pw(a){return a.c?A.aQ(a).getUTCSeconds()+0:A.aQ(a).getSeconds()+0},
pv(a){return a.c?A.aQ(a).getUTCMilliseconds()+0:A.aQ(a).getMilliseconds()+0},
bX(a,b,c){var s,r,q={}
q.a=0
s=[]
r=[]
q.a=b.length
B.b.S(s,b)
q.b=""
if(c!=null&&c.a!==0)c.q(0,new A.me(q,r,s))
return J.rE(a,new A.fh(B.as,0,s,r,0))},
te(a,b,c){var s,r,q
if(Array.isArray(b))s=c==null||c.a===0
else s=!1
if(s){r=b.length
if(r===0){if(!!a.$0)return a.$0()}else if(r===1){if(!!a.$1)return a.$1(b[0])}else if(r===2){if(!!a.$2)return a.$2(b[0],b[1])}else if(r===3){if(!!a.$3)return a.$3(b[0],b[1],b[2])}else if(r===4){if(!!a.$4)return a.$4(b[0],b[1],b[2],b[3])}else if(r===5)if(!!a.$5)return a.$5(b[0],b[1],b[2],b[3],b[4])
q=a[""+"$"+r]
if(q!=null)return q.apply(a,b)}return A.td(a,b,c)},
td(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(Array.isArray(b))s=b
else s=A.a3(b,t.z)
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
if(s===b)s=A.a3(s,t.z)
B.b.S(s,j)}return l.apply(a,s)}else{if(r>q)return A.bX(a,s,c)
if(s===b)s=A.a3(s,t.z)
i=Object.keys(n)
if(c==null)for(o=i.length,h=0;h<i.length;i.length===o||(0,A.at)(i),++h){g=n[A.w(i[h])]
if(B.D===g)return A.bX(a,s,c)
B.b.m(s,g)}else{for(o=i.length,f=0,h=0;h<i.length;i.length===o||(0,A.at)(i),++h){e=A.w(i[h])
if(c.M(0,e)){++f
B.b.m(s,c.h(0,e))}else{g=n[e]
if(B.D===g)return A.bX(a,s,c)
B.b.m(s,g)}}if(f!==c.a)return A.bX(a,s,c)}return l.apply(a,s)}},
tg(a){var s=a.$thrownJsError
if(s==null)return null
return A.cE(s)},
on(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.ai(a,s)
a.$thrownJsError=s
s.stack=b.l(0)}},
vl(a){throw A.b(A.oK(a))},
d(a,b){if(a==null)J.an(a)
throw A.b(A.ij(a,b))},
ij(a,b){var s,r="index"
if(!A.eI(b))return new A.b7(!0,b,r,null)
s=A.L(J.an(a))
if(b<0||b>=s)return A.a8(b,s,a,null,r)
return A.pz(b,r)},
vc(a,b,c){if(a>c)return A.ah(a,0,c,"start",null)
if(b!=null)if(b<a||b>c)return A.ah(b,a,c,"end",null)
return new A.b7(!0,b,"end",null)},
oK(a){return new A.b7(!0,a,null,null)},
b(a){return A.ai(a,new Error())},
ai(a,b){var s
if(a==null)a=new A.bD()
b.dartException=a
s=A.vC
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
vC(){return J.M(this.dartException)},
bN(a,b){throw A.ai(a,b==null?new Error():b)},
al(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.bN(A.uq(a,b,c),s)},
uq(a,b,c){var s,r,q,p,o,n,m,l,k
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
at(a){throw A.b(A.a7(a))},
bE(a){var s,r,q,p,o,n
a=A.qP(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.B([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.mp(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
mq(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
pF(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
og(a,b){var s=b==null,r=s?null:b.method
return new A.fk(a,r,s?null:b.receiver)},
aq(a){var s
if(a==null)return new A.mc(a)
if(a instanceof A.dv){s=a.a
return A.c7(a,s==null?A.b4(s):s)}if(typeof a!=="object")return a
if("dartException" in a)return A.c7(a,a.dartException)
return A.v1(a)},
c7(a,b){if(t.W.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
v1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.e.b4(r,16)&8191)===10)switch(q){case 438:return A.c7(a,A.og(A.e(s)+" (Error "+q+")",null))
case 445:case 5007:A.e(s)
return A.c7(a,new A.dS())}}if(a instanceof TypeError){p=$.r2()
o=$.r3()
n=$.r4()
m=$.r5()
l=$.r8()
k=$.r9()
j=$.r7()
$.r6()
i=$.rb()
h=$.ra()
g=p.af(s)
if(g!=null)return A.c7(a,A.og(A.w(s),g))
else{g=o.af(s)
if(g!=null){g.method="call"
return A.c7(a,A.og(A.w(s),g))}else if(n.af(s)!=null||m.af(s)!=null||l.af(s)!=null||k.af(s)!=null||j.af(s)!=null||m.af(s)!=null||i.af(s)!=null||h.af(s)!=null){A.w(s)
return A.c7(a,new A.dS())}}return A.c7(a,new A.h_(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.dZ()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.c7(a,new A.b7(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.dZ()
return a},
cE(a){var s
if(a instanceof A.dv)return a.b
if(a==null)return new A.eu(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.eu(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
io(a){if(a==null)return J.cI(a)
if(typeof a=="object")return A.dU(a)
return J.cI(a)},
ve(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.k(0,a[s],a[r])}return b},
uA(a,b,c,d,e,f){t.Z.a(a)
switch(A.L(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.b(new A.mK("Unsupported number of arguments for wrapped closure"))},
bK(a,b){var s
if(a==null)return null
s=a.$identity
if(!!s)return s
s=A.v9(a,b)
a.$identity=s
return s},
v9(a,b){var s
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
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.uA)},
rU(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.fM().constructor.prototype):Object.create(new A.cL(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.p8(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.rQ(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.p8(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
rQ(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.b("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.rO)}throw A.b("Error in functionType of tearoff")},
rR(a,b,c,d){var s=A.p6
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
p8(a,b,c,d){if(c)return A.rT(a,b,d)
return A.rR(b.length,d,a,b)},
rS(a,b,c,d){var s=A.p6,r=A.rP
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
rT(a,b,c){var s,r
if($.p4==null)$.p4=A.p3("interceptor")
if($.p5==null)$.p5=A.p3("receiver")
s=b.length
r=A.rS(s,c,a,b)
return r},
oL(a){return A.rU(a)},
rO(a,b){return A.nf(v.typeUniverse,A.ax(a.a),b)},
p6(a){return a.a},
rP(a){return a.b},
p3(a){var s,r,q,p=new A.cL("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.b(A.aX("Field name "+a+" not found.",null))},
oO(a){return v.getIsolateTag(a)},
oS(a,b,c){var s,r
try{s=A.up(a,c,b)
return s}catch(r){}return null},
up(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=[],h=typeof a=="object",g=typeof a=="function"
if(g){s=A.qu(a)
if(s!=null)i.push("globalThis."+s)
else i.push("name: "+A.by(A.ii(a,"name")))}if(b?!g:!h)i.push('typeof: "'+typeof a+'"')
if(!(h||g))return i.join(", ")
r=v.G
q=r.Object
p=q.getPrototypeOf(a)
o=p==null
if(o)i.push("prototype: null")
else{n=A.ii(p,"constructor")
if(n!=null){m=A.qu(n)
if(m!=null){if(g)l="Function"
else l=c?"Array":null
if(m!==l)i.push("constructor: "+m)}else{k=A.ii(n,"name")
if(k!=null)i.push("constructor.name: "+A.by(k))}}}if(r.Array.isArray(a))i.push("isArray")
if(!g){j=A.ii(a,"length")
if(typeof j=="number")i.push("length: "+A.e(j))}if(!o&&!(a instanceof q))i.push("cross-realm")
return i.join(", ")},
ii(a,b){var s=v.G.Object.getOwnPropertyDescriptor(a,b)
if(s==null)return null
return s.value},
qu(a){var s
if(typeof a!="function")return null
s=A.ii(a,"name")
if(typeof s=="string"&&/^[A-Za-z_$][A-Za-z_$0-9]*$/.test(s))if(a===v.G[s])return s
return null},
wN(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
vu(a){var s,r,q,p,o,n=A.w($.qJ.$1(a)),m=$.nH[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.nN[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.ak($.qF.$2(a,n))
if(q!=null){m=$.nH[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.nN[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.nQ(s)
$.nH[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.nN[n]=s
return s}if(p==="-"){o=A.nQ(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.qM(a,s)
if(p==="*")throw A.b(A.pG(n))
if(v.leafTags[n]===true){o=A.nQ(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.qM(a,s)},
qM(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.oR(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
nQ(a){return J.oR(a,!1,null,!!a.$iN)},
vw(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.nQ(s)
else return J.oR(s,c,null,null)},
vn(){if(!0===$.oP)return
$.oP=!0
A.vo()},
vo(){var s,r,q,p,o,n,m,l
$.nH=Object.create(null)
$.nN=Object.create(null)
A.vm()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.qO.$1(o)
if(n!=null){m=A.vw(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
vm(){var s,r,q,p,o,n,m=B.Z()
m=A.dh(B.a_,A.dh(B.a0,A.dh(B.C,A.dh(B.C,A.dh(B.a1,A.dh(B.a2,A.dh(B.a3(B.B),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.qJ=new A.nK(p)
$.qF=new A.nL(o)
$.qO=new A.nM(n)},
dh(a,b){return a(b)||b},
vb(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
t6(a,b,c,d,e,f){var s=b?"m":"",r=c?"":"i",q=d?"u":"",p=e?"s":"",o=function(g,h){try{return new RegExp(g,h)}catch(n){return n}}(a,s+r+q+p+f)
if(o instanceof RegExp)return o
throw A.b(A.a2("Illegal RegExp pattern ("+String(o)+")",a,null))},
vz(a,b,c){var s=a.indexOf(b,c)
return s>=0},
vd(a){if(a.indexOf("$",0)>=0)return a.replace(/\$/g,"$$$$")
return a},
qP(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
qR(a,b,c){var s=A.vA(a,b,c)
return s},
vA(a,b,c){var s,r,q
if(b===""){if(a==="")return c
s=a.length
for(r=c,q=0;q<s;++q)r=r+a[q]+c
return r.charCodeAt(0)==0?r:r}if(a.indexOf(b,0)<0)return a
if(a.length<500||c.indexOf("$",0)>=0)return a.split(b).join(c)
return a.replace(new RegExp(A.qP(b),"g"),A.vd(c))},
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
me:function me(a,b,c){this.a=a
this.b=b
this.c=c},
cZ:function cZ(){},
mp:function mp(a,b,c,d,e,f){var _=this
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
h_:function h_(a){this.a=a},
mc:function mc(a){this.a=a},
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
n5:function n5(){},
bg:function bg(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
lY:function lY(a){this.a=a},
m2:function m2(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
ck:function ck(a,b){this.a=a
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
nK:function nK(a){this.a=a},
nL:function nL(a){this.a=a},
nM:function nM(a){this.a=a},
fj:function fj(a,b){var _=this
_.a=a
_.b=b
_.e=_.d=_.c=null},
n3:function n3(a){this.b=a},
ul(a){return a},
ur(a){return a},
ta(a){return new Int8Array(a)},
pq(a){return new Uint8Array(a)},
pr(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
bJ(a,b,c){if(a>>>0!==a||a>=c)throw A.b(A.ij(b,a))},
um(a,b,c){var s
if(!(a>>>0!==a))s=b>>>0!==b||a>b||b>c
else s=!0
if(s)throw A.b(A.vc(a,b,c))
return b},
cn:function cn(){},
dO:function dO(){},
i5:function i5(a){this.a=a},
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
oo(a,b){var s=b.c
return s==null?b.c=A.eA(a,"af",[b.x]):s},
pA(a){var s=a.w
if(s===6||s===7)return A.pA(a.x)
return s===11||s===12},
tl(a){return a.as},
ik(a){return A.ne(v.typeUniverse,a,!1)},
cA(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.cA(a1,s,a3,a4)
if(r===s)return a2
return A.q2(a1,r,!0)
case 7:s=a2.x
r=A.cA(a1,s,a3,a4)
if(r===s)return a2
return A.q1(a1,r,!0)
case 8:q=a2.y
p=A.dg(a1,q,a3,a4)
if(p===q)return a2
return A.eA(a1,a2.x,p)
case 9:o=a2.x
n=A.cA(a1,o,a3,a4)
m=a2.y
l=A.dg(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.ow(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.dg(a1,j,a3,a4)
if(i===j)return a2
return A.q3(a1,k,i)
case 11:h=a2.x
g=A.cA(a1,h,a3,a4)
f=a2.y
e=A.uZ(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.q0(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.dg(a1,d,a3,a4)
o=a2.x
n=A.cA(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.ox(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.b(A.eR("Attempted to substitute unexpected RTI kind "+a0))}},
dg(a,b,c,d){var s,r,q,p,o=b.length,n=A.no(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.cA(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
v_(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.no(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.cA(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
uZ(a,b,c,d){var s,r=b.a,q=A.dg(a,r,c,d),p=b.b,o=A.dg(a,p,c,d),n=b.c,m=A.v_(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.hp()
s.a=q
s.b=o
s.c=m
return s},
B(a,b){a[v.arrayRti]=b
return a},
qH(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.vi(s)
return a.$S()}return null},
vp(a,b){var s
if(A.pA(b))if(a instanceof A.bR){s=A.qH(a)
if(s!=null)return s}return A.ax(a)},
ax(a){if(a instanceof A.H)return A.C(a)
if(Array.isArray(a))return A.D(a)
return A.oH(J.bM(a))},
D(a){var s=a[v.arrayRti],r=t.dG
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
C(a){var s=a.$ti
return s!=null?s:A.oH(a)},
oH(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.uy(a,s)},
uy(a,b){var s=a instanceof A.bR?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.tZ(v.typeUniverse,s.name)
b.$ccache=r
return r},
vi(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.ne(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
vh(a){return A.cC(A.C(a))},
uY(a){var s=a instanceof A.bR?A.qH(a):null
if(s!=null)return s
if(t.aJ.b(a))return J.rB(a).a
if(Array.isArray(a))return A.D(a)
return A.ax(a)},
cC(a){var s=a.r
return s==null?a.r=new A.nd(a):s},
bo(a){return A.cC(A.ne(v.typeUniverse,a,!1))},
ux(a){var s=this
s.b=A.uW(s)
return s.b(a)},
uW(a){var s,r,q,p,o
if(a===t.K)return A.uG
if(A.cG(a))return A.uK
s=a.w
if(s===6)return A.uv
if(s===1)return A.qt
if(s===7)return A.uB
r=A.uV(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.cG)){a.f="$i"+q
if(q==="p")return A.uE
if(a===t.m)return A.uD
return A.uJ}}else if(s===10){p=A.vb(a.x,a.y)
o=p==null?A.qt:p
return o==null?A.b4(o):o}return A.ut},
uV(a){if(a.w===8){if(a===t.q)return A.eI
if(a===t.dx||a===t.u)return A.uF
if(a===t.N)return A.uI
if(a===t.y)return A.eH}return null},
uw(a){var s=this,r=A.us
if(A.cG(s))r=A.ue
else if(s===t.K)r=A.b4
else if(A.di(s)){r=A.uu
if(s===t.aV)r=A.nr
else if(s===t.x)r=A.ak
else if(s===t.fU)r=A.qj
else if(s===t.jh)r=A.ns
else if(s===t.jX)r=A.ub
else if(s===t.mU)r=A.ud}else if(s===t.q)r=A.L
else if(s===t.N)r=A.w
else if(s===t.y)r=A.nq
else if(s===t.u)r=A.ab
else if(s===t.dx)r=A.qk
else if(s===t.m)r=A.uc
s.a=r
return s.a(a)},
ut(a){var s=this
if(a==null)return A.di(s)
return A.qL(v.typeUniverse,A.vp(a,s),s)},
uv(a){if(a==null)return!0
return this.x.b(a)},
uJ(a){var s,r=this
if(a==null)return A.di(r)
s=r.f
if(a instanceof A.H)return!!a[s]
return!!J.bM(a)[s]},
uE(a){var s,r=this
if(a==null)return A.di(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.H)return!!a[s]
return!!J.bM(a)[s]},
uD(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.H)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
qs(a){if(typeof a=="object"){if(a instanceof A.H)return t.m.b(a)
return!0}if(typeof a=="function")return!0
return!1},
us(a){var s=this
if(a==null){if(A.di(s))return a}else if(s.b(a))return a
throw A.ai(A.qm(a,s),new Error())},
uu(a){var s=this
if(a==null||s.b(a))return a
throw A.ai(A.qm(a,s),new Error())},
qm(a,b){return new A.db("TypeError: "+A.pP(a,A.aK(b,null)))},
eL(a,b,c,d){if(A.qL(v.typeUniverse,a,b))return a
throw A.ai(A.tQ("The type argument '"+A.aK(a,null)+"' is not a subtype of the type variable bound '"+A.aK(b,null)+"' of type variable '"+c+"' in '"+d+"'."),new Error())},
pP(a,b){return A.by(a)+": type '"+A.aK(A.uY(a),null)+"' is not a subtype of type '"+b+"'"},
tQ(a){return new A.db("TypeError: "+a)},
bb(a,b){return new A.db("TypeError: "+A.pP(a,b))},
uB(a){var s=this
return s.x.b(a)||A.oo(v.typeUniverse,s).b(a)},
uG(a){return a!=null},
b4(a){if(a!=null)return a
throw A.ai(A.bb(a,"Object"),new Error())},
uK(a){return!0},
ue(a){return a},
qt(a){return!1},
eH(a){return!0===a||!1===a},
nq(a){if(!0===a)return!0
if(!1===a)return!1
throw A.ai(A.bb(a,"bool"),new Error())},
qj(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.ai(A.bb(a,"bool?"),new Error())},
qk(a){if(typeof a=="number")return a
throw A.ai(A.bb(a,"double"),new Error())},
ub(a){if(typeof a=="number")return a
if(a==null)return a
throw A.ai(A.bb(a,"double?"),new Error())},
eI(a){return typeof a=="number"&&Math.floor(a)===a},
L(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.ai(A.bb(a,"int"),new Error())},
nr(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.ai(A.bb(a,"int?"),new Error())},
uF(a){return typeof a=="number"},
ab(a){if(typeof a=="number")return a
throw A.ai(A.bb(a,"num"),new Error())},
ns(a){if(typeof a=="number")return a
if(a==null)return a
throw A.ai(A.bb(a,"num?"),new Error())},
uI(a){return typeof a=="string"},
w(a){if(typeof a=="string")return a
throw A.ai(A.bb(a,"String"),new Error())},
ak(a){if(typeof a=="string")return a
if(a==null)return a
throw A.ai(A.bb(a,"String?"),new Error())},
uc(a){if(A.qs(a))return a
throw A.ai(A.bb(a,"JSObject"),new Error())},
ud(a){if(a==null)return a
if(A.qs(a))return a
throw A.ai(A.bb(a,"JSObject?"),new Error())},
qz(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aK(a[q],b)
return s},
uS(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.qz(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.aK(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
qn(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
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
if(l===8){p=A.v0(a.x)
o=a.y
return o.length>0?p+("<"+A.qz(o,b)+">"):p}if(l===10)return A.uS(a,b)
if(l===11)return A.qn(a,b,null)
if(l===12)return A.qn(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.d(b,n)
return b[n]}return"?"},
v0(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
u_(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
tZ(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.ne(a,b,!1)
else if(typeof m=="number"){s=m
r=A.eB(a,5,"#")
q=A.no(s)
for(p=0;p<s;++p)q[p]=r
o=A.eA(a,b,q)
n[b]=o
return o}else return m},
tX(a,b){return A.qh(a.tR,b)},
tW(a,b){return A.qh(a.eT,b)},
ne(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.pV(A.pT(a,null,b,!1))
r.set(b,s)
return s},
nf(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.pV(A.pT(a,b,c,!0))
q.set(c,r)
return r},
tY(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.ow(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
c4(a,b){b.a=A.uw
b.b=A.ux
return b},
eB(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.bk(null,null)
s.w=b
s.as=c
r=A.c4(a,s)
a.eC.set(c,r)
return r},
q2(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.tU(a,b,r,c)
a.eC.set(r,s)
return s},
tU(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.cG(b))if(!(b===t.a||b===t.T))if(s!==6)r=s===7&&A.di(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.bk(null,null)
q.w=6
q.x=b
q.as=c
return A.c4(a,q)},
q1(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.tS(a,b,r,c)
a.eC.set(r,s)
return s},
tS(a,b,c,d){var s,r
if(d){s=b.w
if(A.cG(b)||b===t.K)return b
else if(s===1)return A.eA(a,"af",[b])
else if(b===t.a||b===t.T)return t.gK}r=new A.bk(null,null)
r.w=7
r.x=b
r.as=c
return A.c4(a,r)},
tV(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
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
tR(a){var s,r,q,p,o,n=a.length
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
ow(a,b,c){var s,r,q,p,o,n
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
q3(a,b,c){var s,r,q="+"+(b+"("+A.ez(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.bk(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.c4(a,s)
a.eC.set(q,r)
return r},
q0(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.ez(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.ez(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.tR(i)+"}"}r=n+(g+")")
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
ox(a,b,c,d){var s,r=b.as+("<"+A.ez(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.tT(a,b,c,r,d)
a.eC.set(r,s)
return s},
tT(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.no(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.cA(a,b,r,0)
m=A.dg(a,c,r,0)
return A.ox(a,n,m,c!==m)}}l=new A.bk(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.c4(a,l)},
pT(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
pV(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.tJ(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.pU(a,r,l,k,!1)
else if(q===46)r=A.pU(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.cy(a.u,a.e,k.pop()))
break
case 94:k.push(A.tV(a.u,k.pop()))
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
case 62:A.tL(a,k)
break
case 38:A.tK(a,k)
break
case 63:p=a.u
k.push(A.q2(p,A.cy(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.q1(p,A.cy(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.tI(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.pW(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.tN(a.u,a.e,o)
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
return A.cy(a.u,a.e,m)},
tJ(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
pU(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.u_(s,o.x)[p]
if(n==null)A.bN('No "'+p+'" in "'+A.tl(o)+'"')
d.push(A.nf(s,o,n))}else d.push(p)
return m},
tL(a,b){var s,r=a.u,q=A.pS(a,b),p=b.pop()
if(typeof p=="string")b.push(A.eA(r,p,q))
else{s=A.cy(r,a.e,p)
switch(s.w){case 11:b.push(A.ox(r,s,q,a.n))
break
default:b.push(A.ow(r,s,q))
break}}},
tI(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.pS(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.cy(p,a.e,o)
q=new A.hp()
q.a=s
q.b=n
q.c=m
b.push(A.q0(p,r,q))
return
case-4:b.push(A.q3(p,b.pop(),s))
return
default:throw A.b(A.eR("Unexpected state under `()`: "+A.e(o)))}},
tK(a,b){var s=b.pop()
if(0===s){b.push(A.eB(a.u,1,"0&"))
return}if(1===s){b.push(A.eB(a.u,4,"1&"))
return}throw A.b(A.eR("Unexpected extended operation "+A.e(s)))},
pS(a,b){var s=b.splice(a.p)
A.pW(a.u,a.e,s)
a.p=b.pop()
return s},
cy(a,b,c){if(typeof c=="string")return A.eA(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.tM(a,b,c)}else return c},
pW(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.cy(a,b,c[s])},
tN(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.cy(a,b,c[s])},
tM(a,b,c){var s,r,q=b.w
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
qL(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.ap(a,b,null,c,null)
r.set(c,s)}return s},
ap(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.cG(d))return!0
s=b.w
if(s===4)return!0
if(A.cG(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.ap(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.T){if(q===7)return A.ap(a,b,c,d.x,e)
return d===p||d===t.T||q===6}if(d===t.K){if(s===7)return A.ap(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.ap(a,b.x,c,d,e))return!1
return A.ap(a,A.oo(a,b),c,d,e)}if(s===6)return A.ap(a,p,c,d,e)&&A.ap(a,b.x,c,d,e)
if(q===7){if(A.ap(a,b,c,d.x,e))return!0
return A.ap(a,b,c,A.oo(a,d),e)}if(q===6)return A.ap(a,b,c,p,e)||A.ap(a,b,c,d.x,e)
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
if(!A.ap(a,j,c,i,e)||!A.ap(a,i,e,j,c))return!1}return A.qr(a,b.x,c,d.x,e)}if(q===11){if(b===t.dY)return!0
if(p)return!1
return A.qr(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.uC(a,b,c,d,e)}if(o&&q===10)return A.uH(a,b,c,d,e)
return!1},
qr(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.ap(a3,a4.x,a5,a6.x,a7))return!1
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
if(!A.ap(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.ap(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.ap(a3,k[h],a7,g,a5))return!1}f=s.c
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
if(!A.ap(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
uC(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.nf(a,b,r[o])
return A.qi(a,p,null,c,d.y,e)}return A.qi(a,b.y,null,c,d.y,e)},
qi(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.ap(a,b[s],d,e[s],f))return!1
return!0},
uH(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.ap(a,r[s],c,q[s],e))return!1
return!0},
di(a){var s=a.w,r=!0
if(!(a===t.a||a===t.T))if(!A.cG(a))if(s!==6)r=s===7&&A.di(a.x)
return r},
cG(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
qh(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
no(a){return a>0?new Array(a):v.typeUniverse.sEA},
bk:function bk(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
hp:function hp(){this.c=this.b=this.a=null},
nd:function nd(a){this.a=a},
hm:function hm(){},
db:function db(a){this.a=a},
ts(){var s,r,q
if(self.scheduleImmediate!=null)return A.v3()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.bK(new A.mC(s),1)).observe(r,{childList:true})
return new A.mB(s,r,q)}else if(self.setImmediate!=null)return A.v4()
return A.v5()},
tt(a){self.scheduleImmediate(A.bK(new A.mD(t.M.a(a)),0))},
tu(a){self.setImmediate(A.bK(new A.mE(t.M.a(a)),0))},
tv(a){A.or(B.a7,t.M.a(a))},
or(a,b){var s=B.e.ac(a.a,1000)
return A.tO(s<0?0:s,b)},
pE(a,b){var s=B.e.ac(a.a,1000)
return A.tP(s<0?0:s,b)},
tO(a,b){var s=new A.ey(!0)
s.eH(a,b)
return s},
tP(a,b){var s=new A.ey(!1)
s.eI(a,b)
return s},
T(a){return new A.h6(new A.X($.V,a.i("X<0>")),a.i("h6<0>"))},
S(a,b){a.$2(0,null)
b.b=!0
return b.a},
z(a,b){A.uf(a,b)},
R(a,b){b.b7(0,a)},
Q(a,b){b.cj(A.aq(a),A.cE(a))},
uf(a,b){var s,r,q=new A.nt(b),p=new A.nu(b)
if(a instanceof A.X)a.df(q,p,t.z)
else{s=t.z
if(a instanceof A.X)a.bI(q,p,s)
else{r=new A.X($.V,t._)
r.a=8
r.c=a
r.df(q,p,s)}}},
U(a){var s=function(b,c){return function(d,e){while(true){try{b(d,e)
break}catch(r){e=r
d=c}}}}(a,1)
return $.V.cz(new A.nD(s),t.H,t.q,t.z)},
pZ(a,b,c){return 0},
o8(a){var s
if(t.W.b(a)){s=a.gaW()
if(s!=null)return s}return B.t},
oc(a,b){var s
b.a(a)
s=new A.X($.V,b.i("X<0>"))
s.aZ(a)
return s},
qq(a,b){if($.V===B.h)return null
return null},
uz(a,b){if($.V!==B.h)A.qq(a,b)
if(b==null)if(t.W.b(a)){b=a.gaW()
if(b==null){A.on(a,B.t)
b=B.t}}else b=B.t
else if(t.W.b(a))A.on(a,b)
return new A.az(a,b)},
mO(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t._;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.op()
b.bQ(new A.az(new A.b7(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.e.a(b.c)
b.a=b.a&1|4
b.c=n
n.d7(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.b1()
b.bl(o.a)
A.ct(b,p)
return}b.a^=2
A.df(null,null,b.b,t.M.a(new A.mP(o,b)))},
ct(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.n,r=t.e;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.ih(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.ct(d.a,c)
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
A.ih(j.a,j.b)
return}g=$.V
if(g!==h)$.V=h
else g=null
c=c.c
if((c&15)===8)new A.mT(q,d,n).$0()
else if(o){if((c&1)!==0)new A.mS(q,j).$0()}else if((c&2)!==0)new A.mR(d,q).$0()
if(g!=null)$.V=g
c=q.c
if(c instanceof A.X){p=q.a.$ti
p=p.i("af<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.bq(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.mO(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.bq(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
qw(a,b){var s
if(t.ng.b(a))return b.cz(a,t.z,t.K,t.l)
s=t.w
if(s.b(a))return s.a(a)
throw A.b(A.kI(a,"onError",u.c))},
uM(){var s,r
for(s=$.de;s!=null;s=$.de){$.eK=null
r=s.b
$.de=r
if(r==null)$.eJ=null
s.a.$0()}},
uX(){$.oI=!0
try{A.uM()}finally{$.eK=null
$.oI=!1
if($.de!=null)$.oU().$1(A.qG())}},
qC(a){var s=new A.h7(a),r=$.eJ
if(r==null){$.de=$.eJ=s
if(!$.oI)$.oU().$1(A.qG())}else $.eJ=r.b=s},
uU(a){var s,r,q,p=$.de
if(p==null){A.qC(a)
$.eK=$.eJ
return}s=new A.h7(a)
r=$.eK
if(r==null){s.b=p
$.de=$.eK=s}else{q=r.b
s.b=q
$.eK=r.b=s
if(q==null)$.eJ=s}},
qQ(a){var s=null,r=$.V
if(B.h===r){A.df(s,s,B.h,a)
return}A.df(s,s,r,t.M.a(r.cg(a)))},
wi(a,b){A.cB(a,"stream",t.K)
return new A.hT(b.i("hT<0>"))},
qA(a){return},
pO(a,b,c){var s=b==null?A.v6():b
return t.gS.I(c).i("1(2)").a(s)},
tz(a,b){if(b==null)b=A.v8()
if(t.fQ.b(b))return a.cz(b,t.z,t.K,t.l)
if(t.i6.b(b))return t.w.a(b)
throw A.b(A.aX("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace.",null))},
uN(a){},
uP(a,b){A.ih(a,b)},
uO(){},
ui(a,b,c){var s,r,q,p=a.a3(0)
if(p!==$.nZ()){s=t.mY.a(new A.nv(b,c))
r=p.$ti
q=$.V
p.aY(new A.bn(new A.X(q,r),8,s,null,r.i("bn<1,1>")))}else b.bU(c)},
fV(a,b){var s=$.V
if(s===B.h)return A.or(a,t.M.a(b))
return A.or(a,t.M.a(s.cg(b)))},
mo(a,b){var s=$.V
if(s===B.h)return A.pE(a,t.my.a(b))
return A.pE(a,t.my.a(s.dt(b,t.D)))},
ih(a,b){A.uU(new A.nC(a,b))},
qx(a,b,c,d,e){var s,r=$.V
if(r===c)return d.$0()
$.V=c
s=r
try{r=d.$0()
return r}finally{$.V=s}},
qy(a,b,c,d,e,f,g){var s,r=$.V
if(r===c)return d.$1(e)
$.V=c
s=r
try{r=d.$1(e)
return r}finally{$.V=s}},
uT(a,b,c,d,e,f,g,h,i){var s,r=$.V
if(r===c)return d.$2(e,f)
$.V=c
s=r
try{r=d.$2(e,f)
return r}finally{$.V=s}},
df(a,b,c,d){t.M.a(d)
if(B.h!==c){d=c.cg(d)
d=d}A.qC(d)},
mC:function mC(a){this.a=a},
mB:function mB(a,b,c){this.a=a
this.b=b
this.c=c},
mD:function mD(a){this.a=a},
mE:function mE(a){this.a=a},
ey:function ey(a){this.a=a
this.b=null
this.c=0},
nc:function nc(a,b){this.a=a
this.b=b},
nb:function nb(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
h6:function h6(a,b){this.a=a
this.b=!1
this.$ti=b},
nt:function nt(a){this.a=a},
nu:function nu(a){this.a=a},
nD:function nD(a){this.a=a},
ev:function ev(a,b){var _=this
_.a=a
_.e=_.d=_.c=_.b=null
_.$ti=b},
da:function da(a,b){this.a=a
this.$ti=b},
az:function az(a,b){this.a=a
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
mn:function mn(a,b){this.a=a
this.b=b},
hb:function hb(){},
bH:function bH(a,b){this.a=a
this.$ti=b},
bn:function bn(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
X:function X(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
mL:function mL(a,b){this.a=a
this.b=b},
mQ:function mQ(a,b){this.a=a
this.b=b},
mP:function mP(a,b){this.a=a
this.b=b},
mN:function mN(a,b){this.a=a
this.b=b},
mM:function mM(a,b){this.a=a
this.b=b},
mT:function mT(a,b,c){this.a=a
this.b=b
this.c=c},
mU:function mU(a,b){this.a=a
this.b=b},
mV:function mV(a){this.a=a},
mS:function mS(a,b){this.a=a
this.b=b},
mR:function mR(a,b){this.a=a
this.b=b},
mW:function mW(a,b){this.a=a
this.b=b},
mX:function mX(a,b,c){this.a=a
this.b=b
this.c=c},
mY:function mY(a,b){this.a=a
this.b=b},
h7:function h7(a){this.a=a
this.b=null},
bZ:function bZ(){},
ml:function ml(a,b){this.a=a
this.b=b},
mm:function mm(a,b){this.a=a
this.b=b},
mj:function mj(a){this.a=a},
mk:function mk(a,b,c){this.a=a
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
hI:function hI(a){var _=this
_.a=0
_.c=_.b=null
_.$ti=a},
n4:function n4(a,b){this.a=a
this.b=b},
d7:function d7(a,b){var _=this
_.a=1
_.b=a
_.c=null
_.$ti=b},
hT:function hT(a){this.$ti=a},
nv:function nv(a,b){this.a=a
this.b=b},
eG:function eG(){},
hL:function hL(){},
n6:function n6(a,b){this.a=a
this.b=b},
n7:function n7(a,b,c){this.a=a
this.b=b
this.c=c},
nC:function nC(a,b){this.a=a
this.b=b},
ot(a,b){var s=a[b]
return s===a?null:s},
ou(a,b,c){if(c==null)a[b]=a
else a[b]=c},
pQ(){var s=Object.create(null)
A.ou(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
fo(a,b){return new A.bg(a.i("@<0>").I(b).i("bg<1,2>"))},
aa(a,b,c){return b.i("@<0>").I(c).i("po<1,2>").a(A.ve(a,new A.bg(b.i("@<0>").I(c).i("bg<1,2>"))))},
ao(a,b){return new A.bg(a.i("@<0>").I(b).i("bg<1,2>"))},
cl(a){return new A.cw(a.i("cw<0>"))},
oi(a){return new A.cw(a.i("cw<0>"))},
ov(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
tH(a,b,c){var s=new A.cx(a,b,c.i("cx<0>"))
s.c=a.e
return s},
aj(a,b,c){var s=A.fo(b,c)
J.it(a,new A.m3(s,b,c))
return s},
oh(a,b,c){var s=A.fo(b,c)
s.S(0,a)
return s},
pp(a,b){var s,r,q=A.cl(b)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.at)(a),++r)q.m(0,b.a(a[r]))
return q},
oj(a){var s,r
if(A.oQ(a))return"{...}"
s=new A.as("")
try{r={}
B.b.m($.b5,a)
s.a+="{"
r.a=!0
J.it(a,new A.m5(r,s))
s.a+="}"}finally{if(0>=$.b5.length)return A.d($.b5,-1)
$.b5.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
eg:function eg(){},
cv:function cv(a){var _=this
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
cw:function cw(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
hy:function hy(a){this.a=a
this.c=this.b=null},
cx:function cx(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
e3:function e3(a,b){this.a=a
this.$ti=b},
m3:function m3(a,b,c){this.a=a
this.b=b
this.c=c},
m:function m(){},
G:function G(){},
m4:function m4(a){this.a=a},
m5:function m5(a,b){this.a=a
this.b=b},
d3:function d3(){},
aE:function aE(){},
cU:function cU(){},
c1:function c1(a,b){this.a=a
this.$ti=b},
av:function av(){},
eq:function eq(){},
dc:function dc(){},
uQ(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.aq(r)
q=A.a2(String(s),null,null)
throw A.b(q)}q=A.nw(p)
return q},
nw(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.hu(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.nw(a[s])
return a},
u9(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.ri()
else s=new Uint8Array(o)
for(r=J.x(a),q=0;q<o;++q){p=r.h(a,b+q)
if((p&255)!==p)p=255
s[q]=p}return s},
u8(a,b,c,d){var s=a?$.rh():$.rg()
if(s==null)return null
if(0===c&&d===b.length)return A.qg(s,b)
return A.qg(s,b.subarray(c,d))},
qg(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
p2(a,b,c,d,e,f){if(B.e.aU(f,4)!==0)throw A.b(A.a2("Invalid base64 padding, padded length must be multiple of four, is "+f,a,c))
if(d+e!==f)throw A.b(A.a2("Invalid base64 padding, '=' not at the end",a,b))
if(e>2)throw A.b(A.a2("Invalid base64 padding, more than two '=' characters",a,b))},
ty(a,b,c,d,a0,a1){var s,r,q,p,o,n,m,l,k,j,i="Invalid encoding before padding",h="Invalid character",g=B.e.b4(a1,2),f=a1&3,e=$.oV()
for(s=a.length,r=e.length,q=d.$flags|0,p=b,o=0;p<c;++p){if(!(p<s))return A.d(a,p)
n=a.charCodeAt(p)
o|=n
m=n&127
if(!(m<r))return A.d(e,m)
l=e[m]
if(l>=0){g=(g<<6|l)&16777215
f=f+1&3
if(f===0){k=a0+1
q&2&&A.al(d)
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
q&2&&A.al(d)
s=d.length
if(!(a0<s))return A.d(d,a0)
d[a0]=g>>>10
if(!(k<s))return A.d(d,k)
d[k]=g>>>2}else{if((g&15)!==0)throw A.b(A.a2(i,a,p))
q&2&&A.al(d)
if(!(a0<d.length))return A.d(d,a0)
d[a0]=g>>>4}j=(3-f)*3
if(n===37)j+=2
return A.pN(a,p+1,c,-j-1)}throw A.b(A.a2(h,a,p))}if(o>=0&&o<=127)return(g<<2|f)>>>0
for(p=b;p<c;++p){if(!(p<s))return A.d(a,p)
if(a.charCodeAt(p)>127)break}throw A.b(A.a2(h,a,p))},
tw(a,b,c,d){var s=A.tx(a,b,c),r=(d&3)+(s-b),q=B.e.b4(r,2)*3,p=r&3
if(p!==0&&s<c)q+=p-1
if(q>0)return new Uint8Array(q)
return $.rc()},
tx(a,b,c){var s,r=a.length,q=c,p=q,o=0
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
pN(a,b,c,d){var s,r,q
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
pm(a,b,c){return new A.dE(a,b)},
uo(a){return a.hH()},
tF(a,b){return new A.n0(a,[],A.va())},
tG(a,b,c){var s,r=new A.as(""),q=A.tF(r,b)
q.bL(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
ua(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
hu:function hu(a,b){this.a=a
this.b=b
this.c=null},
hv:function hv(a){this.a=a},
nm:function nm(){},
nl:function nl(){},
dl:function dl(a){this.a=a},
eW:function eW(a){this.a=a},
kK:function kK(){},
mF:function mF(){this.a=0},
cb:function cb(){},
f1:function f1(){},
fa:function fa(){},
dE:function dE(a,b){this.a=a
this.b=b},
fm:function fm(a,b){this.a=a
this.b=b},
fl:function fl(){},
m1:function m1(a){this.b=a},
m0:function m0(a){this.a=a},
n1:function n1(){},
n2:function n2(a,b){this.a=a
this.b=b},
n0:function n0(a,b,c){this.c=a
this.a=b
this.b=c},
h3:function h3(){},
mz:function mz(){},
nn:function nn(a){this.b=0
this.c=a},
my:function my(a){this.a=a},
nk:function nk(a){this.a=a
this.b=16
this.c=0},
pf(a,b){return A.te(a,b,null)},
eM(a){var s=A.px(a,null)
if(s!=null)return s
throw A.b(A.a2(a,null,null))},
bL(a){var s=A.dW(a)
if(s!=null)return s
throw A.b(A.a2("Invalid double",a,null))},
t_(a,b){a=A.ai(a,new Error())
if(a==null)a=A.b4(a)
a.stack=b.l(0)
throw a},
dK(a,b,c,d){var s,r=c?J.oe(a,d):J.pk(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
aN(a,b,c){var s,r=A.B([],c.i("a9<0>"))
for(s=J.aF(a);s.p();)B.b.m(r,c.a(s.gt(s)))
if(b)return r
r.$flags=1
return r},
a3(a,b){var s,r
if(Array.isArray(a))return A.B(a.slice(0),b.i("a9<0>"))
s=A.B([],b.i("a9<0>"))
for(r=J.aF(a);r.p();)B.b.m(s,r.gt(r))
return s},
pD(a,b,c){var s,r
A.cY(b,"start")
if(c!=null){s=c-b
if(s<0)throw A.b(A.ah(c,b,null,"end",null))
if(s===0)return""}r=A.tn(a,b,c)
return r},
tn(a,b,c){var s=a.length
if(b>=s)return""
return A.ti(a,b,c==null||c>s?s:c)},
dX(a){return new A.fj(a,A.t6(a,!1,!0,!1,!1,""))},
pC(a,b,c){var s=J.aF(b)
if(!s.p())return a
if(c.length===0){do a+=A.e(s.gt(s))
while(s.p())}else{a+=A.e(s.gt(s))
while(s.p())a=a+c+A.e(s.gt(s))}return a},
ps(a,b){return new A.fB(a,b.ghd(),b.ghj(),b.ghe())},
e5(){var s,r,q=A.tf()
if(q==null)throw A.b(A.P("'Uri.base' is not supported"))
s=$.pJ
if(s!=null&&q===$.pI)return s
r=A.cq(q)
$.pJ=r
$.pI=q
return r},
qf(a,b,c,d){var s,r,q,p,o,n="0123456789ABCDEF"
if(c===B.l){s=$.re()
s=s.b.test(b)}else s=!1
if(s)return b
r=B.a5.aB(b)
for(s=r.length,q=0,p="";q<s;++q){o=r[q]
if(o<128&&(u.f.charCodeAt(o)&a)!==0)p+=A.a6(o)
else p=d&&o===32?p+"+":p+"%"+n[o>>>4&15]+n[o&15]}return p.charCodeAt(0)==0?p:p},
u3(a){var s,r,q
if(!$.rf())return A.u4(a)
s=new URLSearchParams()
a.q(0,new A.nj(s))
r=s.toString()
q=r.length
if(q>0&&r[q-1]==="=")r=B.a.n(r,0,q-1)
return r.replace(/=&|\*|%7E/g,b=>b==="=&"?"&":b==="*"?"%2A":"~")},
op(){return A.cE(new Error())},
rV(a,b,c,d,e,f,g,h,i){var s=A.py(a,b,c,d,e,f,g,h,i)
if(s==null)return null
return new A.ag(A.rX(s,h,i),h,i)},
lK(a){var s=A.py(a,1,1,0,0,0,0,0,!1)
return new A.ag(s==null?new A.lL(a,1,1,0,0,0,0,0).$0():s,0,!1)},
rY(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=$.qX().dz(a)
if(c!=null){s=new A.lN()
r=c.b
if(1>=r.length)return A.d(r,1)
q=r[1]
q.toString
p=A.eM(q)
if(2>=r.length)return A.d(r,2)
q=r[2]
q.toString
o=A.eM(q)
if(3>=r.length)return A.d(r,3)
q=r[3]
q.toString
n=A.eM(q)
if(4>=r.length)return A.d(r,4)
m=s.$1(r[4])
if(5>=r.length)return A.d(r,5)
l=s.$1(r[5])
if(6>=r.length)return A.d(r,6)
k=s.$1(r[6])
if(7>=r.length)return A.d(r,7)
j=new A.lO().$1(r[7])
i=B.e.ac(j,1000)
q=r.length
if(8>=q)return A.d(r,8)
h=r[8]!=null
if(h){if(9>=q)return A.d(r,9)
g=r[9]
if(g!=null){f=g==="-"?-1:1
if(10>=q)return A.d(r,10)
q=r[10]
q.toString
e=A.eM(q)
if(11>=r.length)return A.d(r,11)
l-=f*(s.$1(r[11])+60*e)}}d=A.rV(p,o,n,m,l,k,i,j%1000,h)
if(d==null)throw A.b(A.a2("Time out of range",a,null))
return d}else throw A.b(A.a2("Invalid date format",a,null))},
pb(a){var s,r
try{s=A.rY(a)
return s}catch(r){if(A.aq(r) instanceof A.bf)return null
else throw r}},
rX(a,b,c){var s="microsecond"
if(b>999)throw A.b(A.ah(b,0,999,s,null))
if(a<-864e13||a>864e13)throw A.b(A.ah(a,-864e13,864e13,"millisecondsSinceEpoch",null))
if(a===864e13&&b!==0)throw A.b(A.kI(b,s,"Time including microseconds is outside valid range"))
A.cB(c,"isUtc",t.y)
return a},
pa(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
rW(a){var s=Math.abs(a),r=a<0?"-":"+"
if(s>=1e5)return r+s
return r+"0"+s},
lM(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bw(a){if(a>=10)return""+a
return"0"+a},
pc(a,b){return new A.aY(1000*a+1e6*b)},
by(a){if(typeof a=="number"||A.eH(a)||a==null)return J.M(a)
if(typeof a=="string")return JSON.stringify(a)
return A.th(a)},
t0(a,b){A.cB(a,"error",t.K)
A.cB(b,"stackTrace",t.l)
A.t_(a,b)},
eR(a){return new A.eQ(a)},
aX(a,b){return new A.b7(!1,null,b,a)},
kI(a,b,c){return new A.b7(!0,a,b,c)},
tj(a){var s=null
return new A.cX(s,s,!1,s,s,a)},
pz(a,b){return new A.cX(null,null,!0,a,b,"Value not in range")},
ah(a,b,c,d,e){return new A.cX(b,c,!0,a,d,"Invalid value")},
co(a,b,c){if(0>a||a>c)throw A.b(A.ah(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.b(A.ah(b,a,c,"end",null))
return b}return c},
cY(a,b){if(a<0)throw A.b(A.ah(a,0,null,b,null))
return a},
a8(a,b,c,d,e){return new A.fe(b,!0,a,e,"Index out of range")},
P(a){return new A.e4(a)},
pG(a){return new A.fZ(a)},
O(a){return new A.bq(a)},
a7(a){return new A.f0(a)},
a2(a,b,c){return new A.bf(a,b,c)},
t2(a,b,c){var s,r
if(A.oQ(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.B([],t.s)
B.b.m($.b5,a)
try{A.uL(a,s)}finally{if(0>=$.b5.length)return A.d($.b5,-1)
$.b5.pop()}r=A.pC(b,t.R.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
od(a,b,c){var s,r
if(A.oQ(a))return b+"..."+c
s=new A.as(b)
B.b.m($.b5,a)
try{r=s
r.a=A.pC(r.a,a,", ")}finally{if(0>=$.b5.length)return A.d($.b5,-1)
$.b5.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
uL(a,b){var s,r,q,p,o,n,m,l=a.gB(a),k=0,j=0
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
ok(a,b,c,d){var s
if(B.r===c){s=B.d.gK(a)
b=B.d.gK(b)
return A.oq(A.c0(A.c0($.o_(),s),b))}if(B.r===d){s=B.d.gK(a)
b=B.d.gK(b)
c=J.cI(c)
return A.oq(A.c0(A.c0(A.c0($.o_(),s),b),c))}s=B.d.gK(a)
b=B.d.gK(b)
c=J.cI(c)
d=J.cI(d)
d=A.oq(A.c0(A.c0(A.c0(A.c0($.o_(),s),b),c),d))
return d},
c6(a){A.vx(a)},
cq(a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4=a5.length
if(a4>=5){if(4>=a4)return A.d(a5,4)
s=((a5.charCodeAt(4)^58)*3|a5.charCodeAt(0)^100|a5.charCodeAt(1)^97|a5.charCodeAt(2)^116|a5.charCodeAt(3)^97)>>>0
if(s===0)return A.pH(a4<a4?B.a.n(a5,0,a4):a5,5,a3).ge6()
else if(s===32)return A.pH(B.a.n(a5,5,a4),0,a3).ge6()}r=A.dK(8,0,!1,t.q)
B.b.k(r,0,0)
B.b.k(r,1,-1)
B.b.k(r,2,-1)
B.b.k(r,7,-1)
B.b.k(r,3,0)
B.b.k(r,4,0)
B.b.k(r,5,a4)
B.b.k(r,6,a4)
if(A.qB(a5,0,a4,0,r)>=14)B.b.k(r,7,a4)
q=r[1]
if(q>=0)if(A.qB(a5,0,q,20,r)===20)r[7]=q
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
if(j==null)if(q>0)j=A.oz(a5,0,q)
else{if(q===0)A.dd(a5,0,"Invalid empty scheme")
j=""}d=a3
if(p>0){c=q+3
b=c<p?A.qb(a5,c,p-1):""
a=A.q8(a5,p,o,!1)
i=o+1
if(i<n){a0=A.px(B.a.n(a5,i,n),a3)
d=A.ng(a0==null?A.bN(A.a2("Invalid port",a5,i)):a0,j)}}else{a=a3
b=""}a1=A.q9(a5,n,m,a3,j,a!=null)
a2=m<l?A.qa(a5,m+1,l,a3):a3
return A.eD(j,b,a,d,a1,a2,l<a4?A.q7(a5,l+1,a4):a3)},
pL(a){var s=t.N
return B.b.cl(A.B(a.split("&"),t.s),A.ao(s,s),new A.mx(B.l),t.je)},
h1(a,b,c){throw A.b(A.a2("Illegal IPv4 address, "+a,b,c))},
tp(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j="invalid character"
for(s=a.length,r=b,q=r,p=0,o=0;;){if(q>=c)n=0
else{if(!(q>=0&&q<s))return A.d(a,q)
n=a.charCodeAt(q)}m=n^48
if(m<=9){if(o!==0||q===r){o=o*10+m
if(o<=255){++q
continue}A.h1("each part must be in the range 0..255",a,r)}A.h1("parts must not have leading zeros",a,r)}if(q===r){if(q===c)break
A.h1(j,a,q)}l=p+1
k=e+p
d.$flags&2&&A.al(d)
if(!(k<16))return A.d(d,k)
d[k]=o
if(n===46){if(l<4){++q
p=l
r=q
o=0
continue}break}if(q===c){if(l===4)return
break}A.h1(j,a,q)
p=l}A.h1("IPv4 address should contain exactly 4 parts",a,q)},
tq(a,b,c){var s
if(b===c)throw A.b(A.a2("Empty IP address",a,b))
if(!(b>=0&&b<a.length))return A.d(a,b)
if(a.charCodeAt(b)===118){s=A.tr(a,b,c)
if(s!=null)throw A.b(s)
return!1}A.pK(a,b,c)
return!0},
tr(a,b,c){var s,r,q,p,o,n="Missing hex-digit in IPvFuture address",m=u.f;++b
for(s=a.length,r=b;;r=q){if(r<c){q=r+1
if(!(r>=0&&r<s))return A.d(a,r)
p=a.charCodeAt(r)
if((p^48)<=9)continue
o=p|32
if(o>=97&&o<=102)continue
if(p===46){if(q-1===b)return new A.bf(n,a,q)
r=q
break}return new A.bf("Unexpected character",a,q-1)}if(r-1===b)return new A.bf(n,a,r)
return new A.bf("Missing '.' in IPvFuture address",a,r)}if(r===c)return new A.bf("Missing address in IPvFuture address, host, cursor",null,null)
for(;;){if(!(r>=0&&r<s))return A.d(a,r)
p=a.charCodeAt(r)
if(!(p<128))return A.d(m,p)
if((m.charCodeAt(p)&16)!==0){++r
if(r<c)continue
return null}return new A.bf("Invalid IPvFuture address character",a,r)}},
pK(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1="an address must contain at most 8 parts",a2=new A.mw(a3)
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
continue}a2.$2("an IPv6 part can contain a maximum of 4 hex digits",m)}if(n>m){if(j===46){if(k){if(p<=6){A.tp(a3,m,a5,s,p*2)
p+=2
n=a5
break}a2.$2(a1,m)}break}o=p*2
e=B.e.b4(l,8)
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
B.O.bO(s,a0,16,s,a)
B.O.fX(s,a,a0,0)}}return s},
eD(a,b,c,d,e,f,g){return new A.eC(a,b,c,d,e,f,g)},
q4(a){if(a==="http")return 80
if(a==="https")return 443
return 0},
dd(a,b,c){throw A.b(A.a2(c,a,b))},
ng(a,b){if(a!=null&&a===A.q4(b))return null
return a},
q8(a,b,c,d){var s,r,q,p,o,n,m,l,k
if(a==null)return null
if(b===c)return""
s=a.length
if(!(b>=0&&b<s))return A.d(a,b)
if(a.charCodeAt(b)===91){r=c-1
if(!(r>=0&&r<s))return A.d(a,r)
if(a.charCodeAt(r)!==93)A.dd(a,b,"Missing end `]` to match `[` in host")
q=b+1
if(!(q<s))return A.d(a,q)
p=""
if(a.charCodeAt(q)!==118){o=A.u1(a,q,r)
if(o<r){n=o+1
p=A.qe(a,B.a.R(a,"25",n)?o+3:n,r,"%25")}}else o=r
m=A.tq(a,q,o)
l=B.a.n(a,q,o)
return"["+(m?l.toLowerCase():l)+p+"]"}for(k=b;k<c;++k){if(!(k<s))return A.d(a,k)
if(a.charCodeAt(k)===58){o=B.a.bB(a,"%",b)
o=o>=b&&o<c?o:c
if(o<c){n=o+1
p=A.qe(a,B.a.R(a,"25",n)?o+3:n,c,"%25")}else p=""
A.pK(a,b,o)
return"["+B.a.n(a,b,o)+p+"]"}}return A.u6(a,b,c)},
u1(a,b,c){var s=B.a.bB(a,"%",b)
return s>=b&&s<c?s:c},
qe(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=d!==""?new A.as(d):null
for(s=a.length,r=b,q=r,p=!0;r<c;){if(!(r>=0&&r<s))return A.d(a,r)
o=a.charCodeAt(r)
if(o===37){n=A.oA(a,r,!0)
m=n==null
if(m&&p){r+=3
continue}if(h==null)h=new A.as("")
l=h.a+=B.a.n(a,q,r)
if(m)n=B.a.n(a,r,r+3)
else if(n==="%")A.dd(a,r,"ZoneID should not contain % anymore")
h.a=l+n
r+=3
q=r
p=!0}else if(o<127&&(u.f.charCodeAt(o)&1)!==0){if(p&&65<=o&&90>=o){if(h==null)h=new A.as("")
if(q<r){h.a+=B.a.n(a,q,r)
q=r}p=!1}++r}else{k=1
if((o&64512)===55296&&r+1<c){m=r+1
if(!(m<s))return A.d(a,m)
j=a.charCodeAt(m)
if((j&64512)===56320){o=65536+((o&1023)<<10)+(j&1023)
k=2}}i=B.a.n(a,q,r)
if(h==null){h=new A.as("")
m=h}else m=h
m.a+=i
l=A.oy(o)
m.a+=l
r+=k
q=r}}if(h==null)return B.a.n(a,b,c)
if(q<c){i=B.a.n(a,q,c)
h.a+=i}s=h.a
return s.charCodeAt(0)==0?s:s},
u6(a,b,c){var s,r,q,p,o,n,m,l,k,j,i,h,g=u.f
for(s=a.length,r=b,q=r,p=null,o=!0;r<c;){if(!(r>=0&&r<s))return A.d(a,r)
n=a.charCodeAt(r)
if(n===37){m=A.oA(a,r,!0)
l=m==null
if(l&&o){r+=3
continue}if(p==null)p=new A.as("")
k=B.a.n(a,q,r)
if(!o)k=k.toLowerCase()
j=p.a+=k
i=3
if(l)m=B.a.n(a,r,r+3)
else if(m==="%"){m="%25"
i=1}p.a=j+m
r+=i
q=r
o=!0}else if(n<127&&(g.charCodeAt(n)&32)!==0){if(o&&65<=n&&90>=n){if(p==null)p=new A.as("")
if(q<r){p.a+=B.a.n(a,q,r)
q=r}o=!1}++r}else if(n<=93&&(g.charCodeAt(n)&1024)!==0)A.dd(a,r,"Invalid character")
else{i=1
if((n&64512)===55296&&r+1<c){l=r+1
if(!(l<s))return A.d(a,l)
h=a.charCodeAt(l)
if((h&64512)===56320){n=65536+((n&1023)<<10)+(h&1023)
i=2}}k=B.a.n(a,q,r)
if(!o)k=k.toLowerCase()
if(p==null){p=new A.as("")
l=p}else l=p
l.a+=k
j=A.oy(n)
l.a+=j
r+=i
q=r}}if(p==null)return B.a.n(a,b,c)
if(q<c){k=B.a.n(a,q,c)
if(!o)k=k.toLowerCase()
p.a+=k}s=p.a
return s.charCodeAt(0)==0?s:s},
oz(a,b,c){var s,r,q,p
if(b===c)return""
s=a.length
if(!(b<s))return A.d(a,b)
if(!A.q6(a.charCodeAt(b)))A.dd(a,b,"Scheme not starting with alphabetic character")
for(r=b,q=!1;r<c;++r){if(!(r<s))return A.d(a,r)
p=a.charCodeAt(r)
if(!(p<128&&(u.f.charCodeAt(p)&8)!==0))A.dd(a,r,"Illegal scheme character")
if(65<=p&&p<=90)q=!0}a=B.a.n(a,b,c)
return A.u0(q?a.toLowerCase():a)},
u0(a){if(a==="http")return"http"
if(a==="file")return"file"
if(a==="https")return"https"
if(a==="package")return"package"
return a},
qb(a,b,c){if(a==null)return""
return A.eE(a,b,c,16,!1,!1)},
q9(a,b,c,d,e,f){var s,r=e==="file",q=r||f
if(a==null)return r?"/":""
else s=A.eE(a,b,c,128,!0,!0)
if(s.length===0){if(r)return"/"}else if(q&&!B.a.N(s,"/"))s="/"+s
return A.u5(s,e,f)},
u5(a,b,c){var s=b.length===0
if(s&&!c&&!B.a.N(a,"/")&&!B.a.N(a,"\\"))return A.oB(a,!s||c)
return A.cz(a)},
qa(a,b,c,d){if(a!=null){if(d!=null)throw A.b(A.aX("Both query and queryParameters specified",null))
return A.eE(a,b,c,256,!0,!1)}if(d==null)return null
return A.u3(d)},
u4(a){var s={},r=new A.as("")
s.a=""
a.q(0,new A.nh(new A.ni(s,r)))
s=r.a
return s.charCodeAt(0)==0?s:s},
q7(a,b,c){if(a==null)return null
return A.eE(a,b,c,256,!0,!1)},
oA(a,b,c){var s,r,q,p,o,n,m=u.f,l=b+2,k=a.length
if(l>=k)return"%"
s=b+1
if(!(s>=0&&s<k))return A.d(a,s)
r=a.charCodeAt(s)
if(!(l>=0))return A.d(a,l)
q=a.charCodeAt(l)
p=A.nJ(r)
o=A.nJ(q)
if(p<0||o<0)return"%"
n=p*16+o
if(n<127){if(!(n>=0))return A.d(m,n)
l=(m.charCodeAt(n)&1)!==0}else l=!1
if(l)return A.a6(c&&65<=n&&90>=n?(n|32)>>>0:n)
if(r>=97||q>=97)return B.a.n(a,b,b+3).toUpperCase()
return null},
oy(a){var s,r,q,p,o,n,m,l,k="0123456789ABCDEF"
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
for(o=0;--p,p>=0;q=128){n=B.e.fq(a,6*p)&63|q
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
o+=3}}return A.pD(s,0,null)},
eE(a,b,c,d,e,f){var s=A.qd(a,b,c,d,e,f)
return s==null?B.a.n(a,b,c):s},
qd(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j,i=null,h=u.f
for(s=!e,r=a.length,q=b,p=q,o=i;q<c;){if(!(q>=0&&q<r))return A.d(a,q)
n=a.charCodeAt(q)
if(n<127&&(h.charCodeAt(n)&d)!==0)++q
else{m=1
if(n===37){l=A.oA(a,q,!1)
if(l==null){q+=3
continue}if("%"===l)l="%25"
else m=3}else if(n===92&&f)l="/"
else if(s&&n<=93&&(h.charCodeAt(n)&1024)!==0){A.dd(a,q,"Invalid character")
m=i
l=m}else{if((n&64512)===55296){k=q+1
if(k<c){if(!(k<r))return A.d(a,k)
j=a.charCodeAt(k)
if((j&64512)===56320){n=65536+((n&1023)<<10)+(j&1023)
m=2}}}l=A.oy(n)}if(o==null){o=new A.as("")
k=o}else k=o
k.a=(k.a+=B.a.n(a,p,q))+l
if(typeof m!=="number")return A.vl(m)
q+=m
p=q}}if(o==null)return i
if(p<c){s=B.a.n(a,p,c)
o.a+=s}s=o.a
return s.charCodeAt(0)==0?s:s},
qc(a){if(B.a.N(a,"."))return!0
return B.a.dD(a,"/.")!==-1},
cz(a){var s,r,q,p,o,n,m
if(!A.qc(a))return a
s=A.B([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(n===".."){m=s.length
if(m!==0){if(0>=m)return A.d(s,-1)
s.pop()
if(s.length===0)B.b.m(s,"")}p=!0}else{p="."===n
if(!p)B.b.m(s,n)}}if(p)B.b.m(s,"")
return B.b.a_(s,"/")},
oB(a,b){var s,r,q,p,o,n
if(!A.qc(a))return!b?A.q5(a):a
s=A.B([],t.s)
for(r=a.split("/"),q=r.length,p=!1,o=0;o<q;++o){n=r[o]
if(".."===n){if(s.length!==0&&B.b.gdG(s)!==".."){if(0>=s.length)return A.d(s,-1)
s.pop()}else B.b.m(s,"..")
p=!0}else{p="."===n
if(!p)B.b.m(s,n.length===0&&s.length===0?"./":n)}}if(s.length===0)return"./"
if(p)B.b.m(s,"")
if(!b){if(0>=s.length)return A.d(s,0)
B.b.k(s,0,A.q5(s[0]))}return B.b.a_(s,"/")},
q5(a){var s,r,q,p=u.f,o=a.length
if(o>=2&&A.q6(a.charCodeAt(0)))for(s=1;s<o;++s){r=a.charCodeAt(s)
if(r===58)return B.a.n(a,0,s)+"%3A"+B.a.Z(a,s+1)
if(r<=127){if(!(r<128))return A.d(p,r)
q=(p.charCodeAt(r)&8)===0}else q=!0
if(q)break}return a},
u7(a,b){if(a.h7("package")&&a.c==null)return A.qD(b,0,b.length)
return-1},
u2(a,b){var s,r,q,p,o
for(s=a.length,r=0,q=0;q<2;++q){p=b+q
if(!(p<s))return A.d(a,p)
o=a.charCodeAt(p)
if(48<=o&&o<=57)r=r*16+o-48
else{o|=32
if(97<=o&&o<=102)r=r*16+o-87
else throw A.b(A.aX("Invalid URL encoding",null))}}return r},
oC(a,b,c,d,e){var s,r,q,p,o=a.length,n=b
for(;;){if(!(n<c)){s=!0
break}if(!(n<o))return A.d(a,n)
r=a.charCodeAt(n)
q=!0
if(r<=127)if(r!==37)q=r===43
if(q){s=!1
break}++n}if(s)if(B.l===d)return B.a.n(a,b,c)
else p=new A.f_(B.a.n(a,b,c))
else{p=A.B([],t.b)
for(n=b;n<c;++n){if(!(n<o))return A.d(a,n)
r=a.charCodeAt(n)
if(r>127)throw A.b(A.aX("Illegal percent encoding in URI",null))
if(r===37){if(n+3>o)throw A.b(A.aX("Truncated URI",null))
B.b.m(p,A.u2(a,n+1))
n+=2}else if(r===43)B.b.m(p,32)
else B.b.m(p,r)}}return d.J(0,p)},
q6(a){var s=a|32
return 97<=s&&s<=122},
pH(a,b,c){var s,r,q,p,o,n,m,l,k="Invalid MIME type",j=A.B([b-1],t.b)
for(s=a.length,r=b,q=-1,p=null;r<s;++r){p=a.charCodeAt(r)
if(p===44||p===59)break
if(p===47){if(q<0){q=r
continue}throw A.b(A.a2(k,a,r))}}if(q<0&&r>b)throw A.b(A.a2(k,a,r))
while(p!==44){B.b.m(j,r);++r
for(o=-1;r<s;++r){if(!(r>=0))return A.d(a,r)
p=a.charCodeAt(r)
if(p===61){if(o<0)o=r}else if(p===59||p===44)break}if(o>=0)B.b.m(j,o)
else{n=B.b.gdG(j)
if(p!==44||r!==n+7||!B.a.R(a,"base64",n+1))throw A.b(A.a2("Expecting '='",a,r))
break}}B.b.m(j,r)
m=r+1
if((j.length&1)===1)a=B.W.dL(0,a,m,s)
else{l=A.qd(a,m,s,256,!0,!1)
if(l!=null)a=B.a.aD(a,m,s,l)}return new A.mv(a,j,c)},
qB(a,b,c,d,e){var s,r,q,p,o,n='\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe3\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0e\x03\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\n\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\xeb\xeb\x8b\xeb\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x83\xeb\xeb\x8b\xeb\x8b\xeb\xcd\x8b\xeb\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x92\x83\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\x8b\xeb\x8b\xeb\x8b\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xebD\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12D\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe8\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\xe5\xe5\xe5\x05\xe5D\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\xe5\x8a\xe5\xe5\x05\xe5\x05\xe5\xcd\x05\xe5\x05\x05\x05\x05\x05\x05\x05\x05\x05\x8a\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05f\x05\xe5\x05\xe5\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7D\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\xe7\xe7\xe7\xe7\xe7\xe7\xcd\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\xe7\x8a\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\xe7\xe7\xe7\xe7\xe7\xac\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x05\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x10\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x12\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\n\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\f\xec\xec\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\f\xec\xec\xec\xec\f\xec\f\xec\xcd\f\xec\f\f\f\f\f\f\f\f\f\xec\f\f\f\f\f\f\f\f\f\f\xec\f\xec\f\xec\f\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\r\xed\xed\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\xed\xed\xed\xed\r\xed\r\xed\xed\r\xed\r\r\r\r\r\r\r\r\r\xed\r\r\r\r\r\r\r\r\r\r\xed\r\xed\r\xed\r\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xea\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x0f\xea\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe1\xe1\x01\xe1\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01\xe1\xe9\xe1\xe1\x01\xe1\x01\xe1\xcd\x01\xe1\x01\x01\x01\x01\x01\x01\x01\x01\x01\t\x01\x01\x01\x01\x01\x01\x01\x01\x01\x01"\x01\xe1\x01\xe1\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x11\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xe9\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\t\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\x13\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xeb\xeb\v\xeb\xeb\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\xeb\xea\xeb\xeb\v\xeb\v\xeb\xcd\v\xeb\v\v\v\v\v\v\v\v\v\xea\v\v\v\v\v\v\v\v\v\v\xeb\v\xeb\v\xeb\xac\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\xf5\x15\xf5\x15\x15\xf5\x15\x15\x15\x15\x15\x15\x15\x15\x15\x15\xf5\xf5\xf5\xf5\xf5\xf5'
for(s=a.length,r=b;r<c;++r){if(!(r<s))return A.d(a,r)
q=a.charCodeAt(r)^96
if(q>95)q=31
p=d*96+q
if(!(p<2112))return A.d(n,p)
o=n.charCodeAt(p)
d=o&31
B.b.k(e,o>>>5,r)}return d},
pX(a){if(a.b===7&&B.a.N(a.a,"package")&&a.c<=0)return A.qD(a.a,a.e,a.f)
return-1},
qD(a,b,c){var s,r,q,p
for(s=a.length,r=b,q=0;r<c;++r){if(!(r>=0&&r<s))return A.d(a,r)
p=a.charCodeAt(r)
if(p===47)return q!==0?r:-1
if(p===37||p===58)return-1
q|=p^46}return-1},
uj(a,b,c){var s,r,q,p,o,n,m,l
for(s=a.length,r=b.length,q=0,p=0;p<s;++p){o=c+p
if(!(o<r))return A.d(b,o)
n=b.charCodeAt(o)
m=a.charCodeAt(p)^n
if(m!==0){if(m===32){l=n|m
if(97<=l&&l<=122){q=32
continue}}return-1}}return q},
m8:function m8(a,b){this.a=a
this.b=b},
nj:function nj(a){this.a=a},
lL:function lL(a,b,c,d,e,f,g,h){var _=this
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
lN:function lN(){},
lO:function lO(){},
aY:function aY(a){this.a=a},
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
fZ:function fZ(a){this.a=a},
bq:function bq(a){this.a=a},
f0:function f0(a){this.a=a},
fE:function fE(){},
dZ:function dZ(){},
mK:function mK(a){this.a=a},
bf:function bf(a,b,c){this.a=a
this.b=b
this.c=c},
h:function h(){},
ar:function ar(a,b,c){this.a=a
this.b=b
this.$ti=c},
ad:function ad(){},
H:function H(){},
hW:function hW(){},
as:function as(a){this.a=a},
mx:function mx(a){this.a=a},
mw:function mw(a){this.a=a},
eC:function eC(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
ni:function ni(a,b){this.a=a
this.b=b},
nh:function nh(a){this.a=a},
mv:function mv(a,b,c){this.a=a
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
hg:function hg(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=_.y=_.w=$},
tA(a){var s=a.firstElementChild
if(s==null)throw A.b(A.O("No elements"))
return s},
rZ(a,b,c){var s,r=document.body
r.toString
s=t.aN
return t.h.a(new A.I(new A.aD(B.A.a7(r,a,b,c)),s.i("F(m.E)").a(new A.lP()),s.i("I<m.E>")).gaH(0))},
dt(a){var s,r,q="element tag unavailable"
try{s=a.tagName
s.toString
q=s}catch(r){}return q},
pg(a){var s,r="visibilitychange"
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
ph(a){var s=document.createElement("img")
s.toString
if(a!=null)B.J.scP(s,a)
return s},
tc(a,b,c,d){var s=new Option(a,b,c,!1)
s.toString
return s},
tC(a,b){var s,r=a.classList
r.toString
for(s=0;s<5;++s)r.remove(b[s])},
y(a,b,c,d,e){var s=c==null?null:A.qE(new A.mI(c),t.A)
s=new A.ef(a,b,s,!1,e.i("ef<0>"))
s.di()
return s},
pR(a){var s=document.createElement("a")
s.toString
s=new A.hO(s,t.d.a(window.location))
s=new A.cu(s)
s.eE(a)
return s},
tD(a,b,c,d){t.h.a(a)
A.w(b)
A.w(c)
t.dl.a(d)
return!0},
tE(a,b,c,d){var s,r,q,p,o,n
t.h.a(a)
A.w(b)
A.w(c)
s=t.dl.a(d).a
r=s.a
B.T.sh_(r,c)
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
q_(){var s=t.N,r=A.pp(B.L,s),q=A.B(["TEMPLATE"],t.s),p=t.gL.a(new A.na())
s=new A.hZ(r,A.cl(s),A.cl(s),A.cl(s),null)
s.eG(null,new A.a1(B.L,p,t.gQ),q,null)
return s},
oD(a){var s,r="postMessage" in a
r.toString
if(r){s=A.tB(a)
return s}else return t.iB.a(a)},
tB(a){var s=window
s.toString
if(a===s)return t.kg.a(a)
else return new A.he()},
qE(a,b){var s=$.V
if(s===B.h)return a
return s.dt(a,b)},
r:function r(){},
eO:function eO(){},
cJ:function cJ(){},
eP:function eP(){},
cK:function cK(){},
bP:function bP(){},
ca:function ca(){},
bQ:function bQ(){},
bp:function bp(){},
f3:function f3(){},
Y:function Y(){},
cc:function cc(){},
kO:function kO(){},
aH:function aH(){},
be:function be(){},
f4:function f4(){},
f5:function f5(){},
f6:function f6(){},
dp:function dp(){},
cd:function cd(){},
f7:function f7(){},
dq:function dq(){},
dr:function dr(){},
ds:function ds(){},
f8:function f8(){},
f9:function f9(){},
ha:function ha(a,b){this.a=a
this.b=b},
bm:function bm(a,b){this.a=a
this.$ti=b},
E:function E(){},
lP:function lP(){},
o:function o(){},
du:function du(){},
f:function f(){},
aL:function aL(){},
dw:function dw(){},
dx:function dx(){},
fb:function fb(){},
cf:function cf(){},
aM:function aM(){},
dy:function dy(){},
fd:function fd(){},
bT:function bT(){},
dz:function dz(){},
bz:function bz(){},
ch:function ch(){},
cN:function cN(){},
dA:function dA(){},
bU:function bU(){},
bB:function bB(){},
cT:function cT(){},
fp:function fp(){},
fq:function fq(){},
fr:function fr(){},
m6:function m6(a){this.a=a},
fs:function fs(){},
m7:function m7(a){this.a=a},
aO:function aO(){},
ft:function ft(){},
aA:function aA(){},
aD:function aD(a){this.a=a},
v:function v(){},
cV:function cV(){},
bC:function bC(){},
dT:function dT(){},
aP:function aP(){},
fG:function fG(){},
b8:function b8(){},
fI:function fI(){},
mg:function mg(a){this.a=a},
bY:function bY(){},
aR:function aR(){},
fK:function fK(){},
dY:function dY(){},
aS:function aS(){},
fL:function fL(){},
aT:function aT(){},
e_:function e_(){},
mi:function mi(a){this.a=a},
aB:function aB(){},
e2:function e2(){},
fO:function fO(){},
fP:function fP(){},
d1:function d1(){},
cp:function cp(){},
aU:function aU(){},
aC:function aC(){},
fR:function fR(){},
fS:function fS(){},
fT:function fT(){},
aV:function aV(){},
fW:function fW(){},
fX:function fX(){},
bs:function bs(){},
h2:function h2(){},
h5:function h5(){},
c2:function c2(){},
bt:function bt(){},
d4:function d4(){},
hc:function hc(){},
ed:function ed(){},
hq:function hq(){},
el:function el(){},
hR:function hR(){},
hX:function hX(){},
h8:function h8(){},
ee:function ee(a){this.a=a},
hf:function hf(a){this.a=a},
mG:function mG(a,b){this.a=a
this.b=b},
mH:function mH(a,b){this.a=a
this.b=b},
hl:function hl(a){this.a=a},
ob:function ob(a,b){this.a=a
this.$ti=b},
cs:function cs(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
aW:function aW(a,b,c,d){var _=this
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
mI:function mI(a){this.a=a},
mJ:function mJ(a){this.a=a},
os:function os(a){this.$ti=a},
cu:function cu(a){this.a=a},
A:function A(){},
dR:function dR(a){this.a=a},
ma:function ma(a){this.a=a},
m9:function m9(a,b,c){this.a=a
this.b=b
this.c=c},
er:function er(){},
n8:function n8(){},
n9:function n9(){},
hZ:function hZ(a,b,c,d,e){var _=this
_.e=a
_.a=b
_.b=c
_.c=d
_.d=e},
na:function na(){},
hY:function hY(){},
ce:function ce(a,b,c){var _=this
_.a=a
_.b=b
_.c=-1
_.d=null
_.$ti=c},
he:function he(){},
hO:function hO(a,b){this.a=a
this.b=b},
eF:function eF(a){this.a=a
this.b=0},
np:function np(a){this.a=a},
hd:function hd(){},
hh:function hh(){},
hi:function hi(){},
hj:function hj(){},
hk:function hk(){},
hn:function hn(){},
ho:function ho(){},
hs:function hs(){},
ht:function ht(){},
hA:function hA(){},
hB:function hB(){},
hC:function hC(){},
hD:function hD(){},
hE:function hE(){},
hF:function hF(){},
hJ:function hJ(){},
hK:function hK(){},
hM:function hM(){},
es:function es(){},
et:function et(){},
hP:function hP(){},
hQ:function hQ(){},
hS:function hS(){},
i_:function i_(){},
i0:function i0(){},
ew:function ew(){},
ex:function ex(){},
i1:function i1(){},
i2:function i2(){},
i6:function i6(){},
i7:function i7(){},
i8:function i8(){},
i9:function i9(){},
ia:function ia(){},
ib:function ib(){},
ic:function ic(){},
id:function id(){},
ie:function ie(){},
ig:function ig(){},
ql(a){var s,r,q,p
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
q.push(A.ql(a[p]));++p}return q}return a},
bc(a){var s,r,q,p,o,n
if(a==null)return null
s=A.ao(t.N,t.z)
r=Object.getOwnPropertyNames(a)
for(q=r.length,p=0;p<r.length;r.length===q||(0,A.at)(r),++p){o=r[p]
n=o
n.toString
s.k(0,n,A.ql(a[o]))}return s},
o9(){var s=window.navigator.userAgent
s.toString
return s},
f2:function f2(){},
kM:function kM(a){this.a=a},
kN:function kN(a){this.a=a},
fc:function fc(a,b){this.a=a
this.b=b},
lQ:function lQ(){},
lR:function lR(){},
cS:function cS(){},
h4:function h4(){},
ug(a,b,c,d){var s,r,q
A.nq(b)
t.j.a(d)
if(b){s=[c]
B.b.S(s,d)
d=s}r=t.z
q=A.aN(J.c9(d,A.vr(),r),!0,r)
return A.nx(A.pf(t.Z.a(a),q))},
lZ(a){if(!t.f.b(a)&&!t.R.b(a))throw A.b(A.aX("object must be a Map or Iterable",null))
return A.oJ(A.t7(a))},
t7(a){return new A.m_(new A.cv(t.mp)).$1(a)},
uk(a){return a},
oF(a,b,c){var s
try{if(Object.isExtensible(a)&&!Object.prototype.hasOwnProperty.call(a,b)){Object.defineProperty(a,b,{value:c})
return!0}}catch(s){}return!1},
qp(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]
return null},
nx(a){if(a==null||typeof a=="string"||typeof a=="number"||A.eH(a))return a
if(a instanceof A.aZ)return a.a
if(A.qK(a))return a
if(t.jv.b(a))return a
if(a instanceof A.ag)return A.aQ(a)
if(t.Z.b(a))return A.qo(a,"$dart_jsFunction",new A.ny())
return A.qo(a,"_$dart_jsObject",new A.nz($.oX()))},
qo(a,b,c){var s=A.qp(a,b)
if(s==null){s=c.$1(a)
A.oF(a,b,s)}return s},
oE(a){var s
if(a==null||typeof a=="string"||typeof a=="number"||typeof a=="boolean")return a
else if(a instanceof Object&&A.qK(a))return a
else if(a instanceof Object&&t.jv.b(a))return a
else if(a instanceof Date){s=A.L(a.getTime())
if(s<-864e13||s>864e13)A.bN(A.ah(s,-864e13,864e13,"millisecondsSinceEpoch",null))
A.cB(!1,"isUtc",t.y)
return new A.ag(s,0,!1)}else if(a.constructor===$.oX())return a.o
else return A.oJ(a)},
oJ(a){if(typeof a=="function")return A.oG(a,$.iq(),new A.nE())
if(Array.isArray(a))return A.oG(a,$.oW(),new A.nF())
return A.oG(a,$.oW(),new A.nG())},
oG(a,b,c){var s=A.qp(a,b)
if(s==null||!(a instanceof Object)){s=c.$1(a)
A.oF(a,b,s)}return s},
m_:function m_(a){this.a=a},
hN:function hN(){},
ny:function ny(){},
nz:function nz(a){this.a=a},
nE:function nE(){},
nF:function nF(){},
nG:function nG(){},
aZ:function aZ(a){this.a=a},
cR:function cR(a){this.a=a},
cj:function cj(a,b){this.a=a
this.$ti=b},
d8:function d8(){},
mb:function mb(a){this.a=a},
un(a){var s,r=a.$dart_jsFunction
if(r!=null)return r
s=function(b,c){return function(){return b(c,Array.prototype.slice.apply(arguments))}}(A.uh,a)
s[$.iq()]=a
a.$dart_jsFunction=s
return s},
uh(a,b){t.j.a(b)
return A.pf(t.Z.a(a),b)},
v2(a,b){if(typeof a=="function")return a
else return b.a(A.un(a))},
qv(a){return a==null||A.eH(a)||typeof a=="number"||typeof a=="string"||t.jx.b(a)||t.ev.b(a)||t.nn.b(a)||t.m6.b(a)||t.hM.b(a)||t.bW.b(a)||t.mC.b(a)||t.pk.b(a)||t.kI.b(a)||t.lo.b(a)||t.fW.b(a)},
vt(a){if(A.qv(a))return a
return new A.nO(new A.cv(t.as)).$1(a)},
qN(a,b){var s=new A.X($.V,b.i("X<0>")),r=new A.bH(s,b.i("bH<0>"))
a.then(A.bK(new A.nV(r,b),1),A.bK(new A.nW(r),1))
return s},
nO:function nO(a){this.a=a},
nV:function nV(a,b){this.a=a
this.b=b},
nW:function nW(a){this.a=a},
mZ:function mZ(a){this.a=a},
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
fY:function fY(){},
hw:function hw(){},
hx:function hx(){},
hG:function hG(){},
hH:function hH(){},
hU:function hU(){},
hV:function hV(){},
i3:function i3(){},
i4:function i4(){},
eT:function eT(){},
eU:function eU(){},
kJ:function kJ(a){this.a=a},
eV:function eV(){},
bO:function bO(){},
fD:function fD(){},
h9:function h9(){},
vv(){var s=document
s.toString
B.I.ce(s,"DOMContentLoaded",new A.nP())},
nP:function nP(){},
iw:function iw(){var _=this
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
_.ok=0
_.p1=null
_.p3=_.p2=0
_.p4=!1
_.rx=_.RG=_.R8=null
_.ry=!1
_.to="name"
_.x1=!1
_.x2=null},
jQ:function jQ(){},
jJ:function jJ(a){this.a=a},
jK:function jK(){},
jL:function jL(a){this.a=a},
jI:function jI(){},
jM:function jM(a){this.a=a},
jN:function jN(a){this.a=a},
jO:function jO(a){this.a=a},
jP:function jP(a){this.a=a},
j7:function j7(a){this.a=a},
j3:function j3(){},
j4:function j4(){},
j5:function j5(a,b){this.a=a
this.b=b},
j6:function j6(a){this.a=a},
j9:function j9(a){this.a=a},
ja:function ja(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
jb:function jb(a){this.a=a},
je:function je(a){this.a=a},
jf:function jf(a){this.a=a},
j8:function j8(a,b){this.a=a
this.b=b},
jg:function jg(a){this.a=a},
jh:function jh(a){this.a=a},
ji:function ji(a){this.a=a},
jj:function jj(a){this.a=a},
jk:function jk(a){this.a=a},
jl:function jl(a,b){this.a=a
this.b=b},
jc:function jc(a){this.a=a},
jd:function jd(a,b){this.a=a
this.b=b},
jz:function jz(a){this.a=a},
jA:function jA(a){this.a=a},
jB:function jB(a){this.a=a},
jC:function jC(a){this.a=a},
ju:function ju(a){this.a=a},
jv:function jv(a){this.a=a},
jw:function jw(a){this.a=a},
jx:function jx(){},
jy:function jy(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jm:function jm(){},
kw:function kw(){},
kx:function kx(){},
ky:function ky(){},
kF:function kF(a){this.a=a},
kG:function kG(a){this.a=a},
k5:function k5(){},
k6:function k6(a,b){this.a=a
this.b=b},
k4:function k4(a,b){this.a=a
this.b=b},
k7:function k7(a,b){this.a=a
this.b=b},
k3:function k3(a){this.a=a},
k8:function k8(a,b){this.a=a
this.b=b},
k1:function k1(a){this.a=a},
k2:function k2(a,b){this.a=a
this.b=b},
k9:function k9(a,b,c){this.a=a
this.b=b
this.c=c},
jZ:function jZ(a){this.a=a},
k_:function k_(a){this.a=a},
k0:function k0(a,b){this.a=a
this.b=b},
ka:function ka(a,b,c){this.a=a
this.b=b
this.c=c},
jX:function jX(a){this.a=a},
jY:function jY(){},
kc:function kc(a,b,c){this.a=a
this.b=b
this.c=c},
kd:function kd(a,b){this.a=a
this.b=b},
kb:function kb(a,b){this.a=a
this.b=b},
jR:function jR(a){this.a=a},
kq:function kq(){},
kr:function kr(a,b){this.a=a
this.b=b},
ks:function ks(){},
kt:function kt(){},
ku:function ku(a,b){this.a=a
this.b=b},
ke:function ke(a){this.a=a},
kf:function kf(a,b){this.a=a
this.b=b},
kg:function kg(){},
kh:function kh(){},
ki:function ki(a){this.a=a},
jE:function jE(a){this.a=a},
jF:function jF(a){this.a=a},
jD:function jD(a){this.a=a},
jG:function jG(a){this.a=a},
jH:function jH(a){this.a=a},
jn:function jn(a,b){this.a=a
this.b=b},
kv:function kv(a){this.a=a},
jo:function jo(a,b){this.a=a
this.b=b},
jp:function jp(a){this.a=a},
jq:function jq(a){this.a=a},
jr:function jr(a){this.a=a},
js:function js(a,b){this.a=a
this.b=b},
jt:function jt(a){this.a=a},
kz:function kz(a,b){this.a=a
this.b=b},
kA:function kA(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jT:function jT(a){this.a=a},
jU:function jU(){},
jV:function jV(){},
jW:function jW(){},
kH:function kH(){},
jS:function jS(a,b){this.a=a
this.b=b},
kE:function kE(a){this.a=a},
kB:function kB(){},
kC:function kC(){},
kD:function kD(){},
j2:function j2(a){this.a=a},
kj:function kj(){},
kk:function kk(){},
kl:function kl(){},
km:function km(a){this.a=a},
kn:function kn(){},
ko:function ko(){},
kp:function kp(a,b){this.a=a
this.b=b},
iY:function iY(){},
iX:function iX(a){this.a=a},
iZ:function iZ(a){this.a=a},
j_:function j_(a,b){this.a=a
this.b=b},
j0:function j0(a,b,c){this.a=a
this.b=b
this.c=c},
j1:function j1(){},
iC:function iC(a,b,c){this.a=a
this.b=b
this.c=c},
iD:function iD(a){this.a=a},
iE:function iE(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
iV:function iV(a,b,c){this.a=a
this.b=b
this.c=c},
iW:function iW(a){this.a=a},
iy:function iy(a,b,c){this.a=a
this.b=b
this.c=c},
iz:function iz(a){this.a=a},
iA:function iA(a){this.a=a},
iK:function iK(a,b,c){this.a=a
this.b=b
this.c=c},
iU:function iU(a,b){this.a=a
this.b=b},
iB:function iB(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
iT:function iT(a,b){this.a=a
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
iQ:function iQ(a,b){this.a=a
this.b=b},
iR:function iR(a,b){this.a=a
this.b=b},
iF:function iF(a,b){this.a=a
this.b=b},
iG:function iG(a,b,c){this.a=a
this.b=b
this.c=c},
iS:function iS(a,b){this.a=a
this.b=b},
iH:function iH(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
iI:function iI(a,b,c){this.a=a
this.b=b
this.c=c},
ix:function ix(){},
iJ:function iJ(a){this.a=a},
p1(a,b){return new A.aG(a,!1,b)},
aG:function aG(a,b,c){this.a=a
this.b=b
this.c=c},
kP:function kP(a,b,c,d,e,f,g,h,i,j,k){var _=this
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
kS:function kS(){},
kT:function kT(a){this.a=a},
l_:function l_(a){this.a=a},
kW:function kW(a,b){this.a=a
this.b=b},
kX:function kX(a){this.a=a},
kY:function kY(a){this.a=a},
kZ:function kZ(a,b){this.a=a
this.b=b},
le:function le(){},
lf:function lf(){},
kV:function kV(){},
lq:function lq(){},
lr:function lr(a,b,c){this.a=a
this.b=b
this.c=c},
lv:function lv(){},
lw:function lw(a){this.a=a},
lx:function lx(a){this.a=a},
lu:function lu(a){this.a=a},
ly:function ly(a){this.a=a},
lz:function lz(){},
lk:function lk(a){this.a=a},
ll:function ll(a){this.a=a},
lm:function lm(a){this.a=a},
ln:function ln(a){this.a=a},
lo:function lo(a){this.a=a},
lp:function lp(a){this.a=a},
l2:function l2(){},
ld:function ld(){},
lt:function lt(a,b,c){this.a=a
this.b=b
this.c=c},
ls:function ls(a,b){this.a=a
this.b=b},
lA:function lA(){},
lB:function lB(){},
lC:function lC(a){this.a=a},
lD:function lD(){},
kR:function kR(){},
kQ:function kQ(a,b,c){this.a=a
this.b=b
this.c=c},
lc:function lc(a,b){this.a=a
this.b=b},
lE:function lE(a){this.a=a},
lb:function lb(){},
lF:function lF(){},
lG:function lG(a){this.a=a},
lH:function lH(){},
lI:function lI(a){this.a=a},
lJ:function lJ(){},
l1:function l1(a,b){this.a=a
this.b=b},
l0:function l0(a,b){this.a=a
this.b=b},
l9:function l9(a){this.a=a},
la:function la(){},
l5:function l5(){},
l6:function l6(){},
l7:function l7(a){this.a=a},
l8:function l8(){},
lg:function lg(a,b){this.a=a
this.b=b},
lh:function lh(){},
li:function li(){},
lj:function lj(a,b){this.a=a
this.b=b},
kU:function kU(a){this.a=a},
l4:function l4(a,b){this.a=a
this.b=b},
l3:function l3(a){this.a=a},
ip(){var s,r=$.r1(),q=J.pj(24,t.N)
for(s=0;s<24;++s)q[s]=B.a.bc(B.e.hy(r.hf(256),16),2,"0")
return B.b.h8(q)},
b6(){var s,r,q
try{r=window.localStorage.getItem("waterhall_jwt")
r.toString
s=r
r=J.p_(s,".")
if(1>=r.length)return A.d(r,1)
r=A.w(J.i(B.c.J(0,B.l.J(0,B.v.aB(B.z.dK(0,r[1])))),"sub"))
return r}catch(q){return null}},
cF(){var s,r,q,p
try{q=window.localStorage.getItem("waterhall_jwt")
q.toString
s=q
q=J.p_(s,".")
if(1>=q.length)return A.d(q,1)
r=B.c.J(0,B.l.J(0,B.v.aB(B.z.dK(0,q[1]))))
q=J.rk(J.rl(J.i(r,"exp"),1000),Date.now())
return q}catch(p){return!1}},
il(a,b){var s=0,r=A.T(t.z),q
var $async$il=A.U(function(c,d){if(c===1)return A.Q(d,r)
for(;;)switch(s){case 0:if(!$.bu().ba("WaterHallStorage")){q=null
s=1
break}s=3
return A.z(A.qN(A.b4(globalThis.waterhallNativeCall(a,A.vt(b))),t.z),$async$il)
case 3:q=d
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$il,r)},
im(a){var s=0,r=A.T(t.H)
var $async$im=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:s=$.bu().ba("waterhallSetNativeSession")?2:3
break
case 2:s=4
return A.z(A.qN(A.b4(globalThis.waterhallSetNativeSession(a)),t.z),$async$im)
case 4:case 3:return A.R(null,r)}})
return A.S($async$im,r)},
c5(a,b){var s=A.b6(),r=$.rj().e0(new A.nS(s,a,b),t.a)
$.uR=r.du(new A.nT())
return r},
nA(a,b){var s=0,r=A.T(t.H),q,p,o,n
var $async$nA=A.U(function(c,d){if(c===1)return A.Q(d,r)
for(;;)switch(s){case 0:n=A.b6()
if(n==null)throw A.b(A.O("Sign in before recording an operation"))
q=A.D(b)
p=q.i("I<1>")
o=A.a3(new A.I(b,q.i("F(1)").a(new A.nB(n)),p),p.i("h.E"))
q=a==="bill_history"
s=!q||J.j($.bu().h(0,"waterhallBillHistoryStorage"),!0)?2:3
break
case 2:s=4
return A.z(A.il("save",A.aa(["type",a,"rows",o],t.N,t.z)),$async$nA)
case 4:case 3:p=window.localStorage
p.toString
if(a==="collections")q="waterhall_offline_collections"
else q=q?"waterhall_bill_history":"waterhall_unsynced_actions"
p.setItem(q,B.c.V(b))
return A.R(null,r)}})
return A.S($async$nA,r)},
dj(){var s=0,r=A.T(t.H),q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
var $async$dj=A.U(function(a5,a6){if(a5===1)return A.Q(a6,r)
for(;;)switch(s){case 0:a4=window.localStorage.getItem("waterhall_jwt")
if(A.b6()==null){s=1
break}s=3
return A.z(A.im(window.localStorage.getItem("waterhall_jwt")),$async$dj)
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
return A.z(A.il("load",A.aa(["type",h],m,l)),$async$dj)
case 7:f=a6
if(window.localStorage.getItem("waterhall_jwt")!=a4){s=1
break}if(f==null){s=5
break}e=k.a(B.c.J(0,A.w(f)))
if(h==="collections")d="waterhall_offline_collections"
else d=g?"waterhall_bill_history":"waterhall_unsynced_actions"
c=window.localStorage.getItem(d)
b=A.ao(m,j)
c=A.a3(k.a(B.c.J(0,c==null?"[]":c)),l)
B.b.S(c,e)
a=c.length
a0=0
for(;a0<c.length;c.length===a||(0,A.at)(c),++a0){a1=A.aj(n.a(c[a0]),m,l)
if(g){a2=A.e(a1.h(0,"owner"))
a3=a1.h(0,"bill_id")
a2=a2+"|"+A.e(a3==null?a1.h(0,"operation_id"):a3)}else{a2=a1.h(0,"transaction_id")
a2=J.M(a2==null?a1.h(0,"operation_id"):a2)}b.k(0,a2,a1)}s=A.b6()!=null?8:9
break
case 8:s=10
return A.z(A.c5(h,new A.nY(b,h)),$async$dj)
case 10:case 9:case 5:p.length===o||(0,A.at)(p),++i
s=4
break
case 6:case 1:return A.R(q,r)}})
return A.S($async$dj,r)},
nS:function nS(a,b,c){this.a=a
this.b=b
this.c=c},
nR:function nR(){},
nT:function nT(){},
nB:function nB(a){this.a=a},
nY:function nY(a,b){this.a=a
this.b=b},
nX:function nX(a){this.a=a},
qK(a){return t.fj.b(a)||t.A.b(a)||t.mz.b(a)||t.ad.b(a)||t.F.b(a)||t.hE.b(a)||t.f5.b(a)},
vx(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)},
vB(a){throw A.ai(A.pn(a),new Error())},
ay(){throw A.ai(A.t8(""),new Error())},
qS(){throw A.ai(A.pn(""),new Error())}},B={}
var w=[A,J,B]
var $={}
A.of.prototype={}
J.cO.prototype={
a0(a,b){return a===b},
gK(a){return A.dU(a)},
l(a){return"Instance of '"+A.dV(a)+"'"},
dJ(a,b){throw A.b(A.ps(a,t.bg.a(b)))},
gW(a){return A.cC(A.oH(this))}}
J.fg.prototype={
l(a){return String(a)},
gK(a){return a?519018:218159},
gW(a){return A.cC(t.y)},
$ia_:1,
$iF:1}
J.dD.prototype={
a0(a,b){return null==b},
l(a){return"null"},
gK(a){return 0},
$ia_:1,
$iad:1}
J.a.prototype={$ik:1}
J.bW.prototype={
gK(a){return 0},
l(a){return String(a)}}
J.fF.prototype={}
J.bF.prototype={}
J.bA.prototype={
l(a){var s=a[$.iq()]
if(s==null)s=a[$.qW()]
if(s==null)return this.ey(a)
return"JavaScript function for "+J.M(s)},
$icg:1}
J.cP.prototype={
gK(a){return 0},
l(a){return String(a)}}
J.cQ.prototype={
gK(a){return 0},
l(a){return String(a)}}
J.a9.prototype={
m(a,b){A.D(a).c.a(b)
a.$flags&1&&A.al(a,29)
a.push(b)},
cr(a,b,c){var s
A.D(a).c.a(c)
a.$flags&1&&A.al(a,"insert",2)
s=a.length
if(b>s)throw A.b(A.pz(b,null))
a.splice(b,0,c)},
hp(a,b){A.D(a).i("F(1)").a(b)
a.$flags&1&&A.al(a,16)
this.d9(a,b,!0)},
d9(a,b,c){var s,r,q,p,o
A.D(a).i("F(1)").a(b)
s=[]
r=a.length
for(q=0;q<r;++q){p=a[q]
if(!b.$1(p))s.push(p)
if(a.length!==r)throw A.b(A.a7(a))}o=s.length
if(o===r)return
this.sj(a,o)
for(q=0;q<s.length;++q)a[q]=s[q]},
S(a,b){var s
A.D(a).i("h<1>").a(b)
a.$flags&1&&A.al(a,"addAll",2)
if(Array.isArray(b)){this.eM(a,b)
return}for(s=J.aF(b);s.p();)a.push(s.gt(s))},
eM(a,b){var s,r
t.dG.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.b(A.a7(a))
for(r=0;r<s;++r)a.push(b[r])},
X(a){a.$flags&1&&A.al(a,"clear","clear")
a.length=0},
q(a,b){var s,r
A.D(a).i("~(1)").a(b)
s=a.length
for(r=0;r<s;++r){b.$1(a[r])
if(a.length!==s)throw A.b(A.a7(a))}},
ar(a,b,c){var s=A.D(a)
return new A.a1(a,s.I(c).i("1(2)").a(b),s.i("@<1>").I(c).i("a1<1,2>"))},
a_(a,b){var s,r=A.dK(a.length,"",!1,t.N)
for(s=0;s<a.length;++s)this.k(r,s,A.e(a[s]))
return r.join(b)},
h8(a){return this.a_(a,"")},
hm(a,b){var s,r,q
A.D(a).i("1(1,1)").a(b)
s=a.length
if(s===0)throw A.b(A.dB())
if(0>=s)return A.d(a,0)
r=a[0]
for(q=1;q<s;++q){r=b.$2(r,a[q])
if(s!==a.length)throw A.b(A.a7(a))}return r},
cl(a,b,c,d){var s,r,q
d.a(b)
A.D(a).I(d).i("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.b(A.a7(a))}return r},
dA(a,b,c){var s,r,q,p=A.D(a)
p.i("F(1)").a(b)
p.i("1()?").a(c)
s=a.length
for(r=0;r<s;++r){q=a[r]
if(b.$1(q))return q
if(a.length!==s)throw A.b(A.a7(a))}if(c!=null)return c.$0()
throw A.b(A.dB())},
fY(a,b){return this.dA(a,b,null)},
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
cQ(a,b,c){var s=a.length
if(b>s)throw A.b(A.ah(b,0,s,"start",null))
if(c==null)c=s
else if(c<b||c>s)throw A.b(A.ah(c,b,s,"end",null))
if(b===c)return A.B([],A.D(a))
return A.B(a.slice(b,c),A.D(a))},
es(a,b){return this.cQ(a,b,null)},
gD(a){if(a.length>0)return a[0]
throw A.b(A.dB())},
gdG(a){var s=a.length
if(s>0)return a[s-1]
throw A.b(A.dB())},
a6(a,b){var s,r
A.D(a).i("F(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.b(A.a7(a))}return!1},
aI(a,b){var s,r,q,p,o,n=A.D(a)
n.i("l(1,1)?").a(b)
a.$flags&2&&A.al(a,"sort")
s=a.length
if(s<2)return
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.bi()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.bK(b,2))
if(p>0)this.fi(a,p)},
fi(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
v(a,b){var s
for(s=0;s<a.length;++s)if(J.j(a[s],b))return!0
return!1},
gE(a){return a.length===0},
gT(a){return a.length!==0},
l(a){return A.od(a,"[","]")},
gB(a){return new J.bd(a,a.length,A.D(a).i("bd<1>"))},
gK(a){return A.dU(a)},
gj(a){return a.length},
sj(a,b){a.$flags&1&&A.al(a,"set length","change the length of")
if(b>a.length)A.D(a).c.a(null)
a.length=b},
h(a,b){A.L(b)
if(!(b>=0&&b<a.length))throw A.b(A.ij(a,b))
return a[b]},
k(a,b,c){A.D(a).c.a(c)
a.$flags&2&&A.al(a)
if(!(b>=0&&b<a.length))throw A.b(A.ij(a,b))
a[b]=c},
e7(a,b){return new A.cr(a,b.i("cr<0>"))},
h0(a,b){var s
A.D(a).i("F(1)").a(b)
if(0>=a.length)return-1
for(s=0;s<a.length;++s)if(b.$1(a[s]))return s
return-1},
$in:1,
$ih:1,
$ip:1}
J.ff.prototype={
e3(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.dV(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.lX.prototype={}
J.bd.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.at(q)
throw A.b(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iac:1}
J.ci.prototype={
a1(a,b){var s
A.ab(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gbC(b)
if(this.gbC(a)===s)return 0
if(this.gbC(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbC(a){return a===0?1/a<0:a<0},
aE(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.b(A.P(""+a+".round()"))},
ci(a,b,c){if(B.e.a1(b,c)>0)throw A.b(A.oK(b))
if(this.a1(a,b)<0)return b
if(this.a1(a,c)>0)return c
return a},
G(a,b){var s
if(b>20)throw A.b(A.ah(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gbC(a))return"-"+s
return s},
hy(a,b){var s,r,q,p,o
if(b<2||b>36)throw A.b(A.ah(b,2,36,"radix",null))
s=a.toString(b)
r=s.length
q=r-1
if(!(q>=0))return A.d(s,q)
if(s.charCodeAt(q)!==41)return s
p=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(s)
if(p==null)A.bN(A.P("Unexpected toString result: "+s))
r=p.length
if(1>=r)return A.d(p,1)
s=p[1]
if(3>=r)return A.d(p,3)
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
aU(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
return s+b},
eD(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.dd(a,b)},
ac(a,b){return(a|0)===a?a/b|0:this.dd(a,b)},
dd(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.b(A.P("Result of truncating division is "+A.e(s)+": "+A.e(a)+" ~/ "+b))},
b4(a,b){var s
if(a>0)s=this.dc(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
fq(a,b){if(0>b)throw A.b(A.oK(b))
return this.dc(a,b)},
dc(a,b){return b>31?0:a>>>b},
bi(a,b){return a>b},
gW(a){return A.cC(t.u)},
$iW:1,
$iZ:1}
J.dC.prototype={
gW(a){return A.cC(t.q)},
$ia_:1,
$il:1}
J.fi.prototype={
gW(a){return A.cC(t.dx)},
$ia_:1}
J.bV.prototype={
cF(a,b){return a+b},
eq(a,b){var s=A.B(a.split(b),t.s)
return s},
aD(a,b,c,d){var s=A.co(b,c,a.length)
return a.substring(0,b)+d+a.substring(s)},
R(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.ah(c,0,a.length,null,null))
s=c+b.length
if(s>a.length)return!1
return b===a.substring(c,s)},
N(a,b){return this.R(a,b,0)},
n(a,b,c){return a.substring(b,A.co(b,c,a.length))},
Z(a,b){return this.n(a,b,null)},
hx(a){return a.toLowerCase()},
A(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.d(p,0)
if(p.charCodeAt(0)===133){s=J.t4(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.d(p,r)
q=p.charCodeAt(r)===133?J.t5(p,r):o
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
bB(a,b,c){var s
if(c<0||c>a.length)throw A.b(A.ah(c,0,a.length,null,null))
s=a.indexOf(b,c)
return s},
dD(a,b){return this.bB(a,b,0)},
dH(a,b,c){var s,r
if(c==null)c=a.length
else if(c<0||c>a.length)throw A.b(A.ah(c,0,a.length,null,null))
s=b.length
r=a.length
if(c+s>r)c=r-s
return a.lastIndexOf(b,c)},
h9(a,b){return this.dH(a,b,null)},
bx(a,b,c){var s=a.length
if(c>s)throw A.b(A.ah(c,0,s,null,null))
return A.vz(a,b,c)},
v(a,b){return this.bx(a,b,0)},
a1(a,b){var s
A.w(b)
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
gW(a){return A.cC(t.N)},
gj(a){return a.length},
h(a,b){A.L(b)
if(!(b>=0&&b<a.length))throw A.b(A.ij(a,b))
return a[b]},
$ia_:1,
$imd:1,
$ic:1}
A.dF.prototype={
l(a){return"LateInitializationError: "+this.a}}
A.f_.prototype={
gj(a){return this.a.length},
h(a,b){var s
A.L(b)
s=this.a
if(!(b>=0&&b<s.length))return A.d(s,b)
return s.charCodeAt(b)}}
A.nU.prototype={
$0(){return A.oc(null,t.H)},
$S:71}
A.mh.prototype={}
A.n.prototype={}
A.a5.prototype={
gB(a){var s=this
return new A.bh(s,s.gj(s),A.C(s).i("bh<a5.E>"))},
gE(a){return this.gj(this)===0},
v(a,b){var s,r=this,q=r.gj(r)
for(s=0;s<q;++s){if(J.j(r.u(0,s),b))return!0
if(q!==r.gj(r))throw A.b(A.a7(r))}return!1},
a_(a,b){var s,r,q,p=this,o=p.gj(p)
if(b.length!==0){if(o===0)return""
s=A.e(p.u(0,0))
if(o!==p.gj(p))throw A.b(A.a7(p))
for(r=s,q=1;q<o;++q){r=r+b+A.e(p.u(0,q))
if(o!==p.gj(p))throw A.b(A.a7(p))}return r.charCodeAt(0)==0?r:r}else{for(q=0,r="";q<o;++q){r+=A.e(p.u(0,q))
if(o!==p.gj(p))throw A.b(A.a7(p))}return r.charCodeAt(0)==0?r:r}},
bK(a,b){return this.cR(0,A.C(this).i("F(a5.E)").a(b))},
ar(a,b,c){var s=A.C(this)
return new A.a1(this,s.I(c).i("1(a5.E)").a(b),s.i("@<a5.E>").I(c).i("a1<1,2>"))},
aF(a,b){var s=A.a3(this,A.C(this).i("a5.E"))
return s},
av(a){return this.aF(0,!0)},
e2(a){var s,r=this,q=A.cl(A.C(r).i("a5.E"))
for(s=0;s<r.gj(r);++s)q.m(0,r.u(0,s))
return q}}
A.e0.prototype={
gf1(){var s=J.an(this.a),r=this.c
if(r==null||r>s)return s
return r},
gft(){var s=J.an(this.a),r=this.b
if(r>s)return s
return r},
gj(a){var s,r=J.an(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
u(a,b){var s=this,r=s.gft()+b
if(b<0||r>=s.gf1())throw A.b(A.a8(b,s.gj(0),s,null,"index"))
return J.eN(s.a,r)},
hv(a,b){var s,r,q,p=this
A.cY(b,"count")
s=p.c
r=p.b
q=r+b
if(s==null)return A.e1(p.a,r,q,p.$ti.c)
else{if(s<q)return p
return A.e1(p.a,r,q,p.$ti.c)}},
aF(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.x(n),l=m.gj(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.oe(0,n):J.pk(0,n)}r=A.dK(s,m.u(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.b.k(r,q,m.u(n,o+q))
if(m.gj(n)<l)throw A.b(A.a7(p))}return r},
av(a){return this.aF(0,!0)}}
A.bh.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s,r=this,q=r.a,p=J.x(q),o=p.gj(q)
if(r.b!==o)throw A.b(A.a7(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.u(q,s);++r.c
return!0},
$iac:1}
A.aJ.prototype={
gB(a){return new A.dL(J.aF(this.a),this.b,A.C(this).i("dL<1,2>"))},
gj(a){return J.an(this.a)},
gE(a){return J.iu(this.a)},
u(a,b){return this.b.$1(J.eN(this.a,b))}}
A.bx.prototype={$in:1}
A.dL.prototype={
p(){var s=this,r=s.b
if(r.p()){s.a=s.c.$1(r.gt(r))
return!0}s.a=null
return!1},
gt(a){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iac:1}
A.a1.prototype={
gj(a){return J.an(this.a)},
u(a,b){return this.b.$1(J.eN(this.a,b))}}
A.I.prototype={
gB(a){return new A.aw(J.aF(this.a),this.b,this.$ti.i("aw<1>"))},
ar(a,b,c){var s=this.$ti
return new A.aJ(this,s.I(c).i("1(2)").a(b),s.i("@<1>").I(c).i("aJ<1,2>"))}}
A.aw.prototype={
p(){var s,r
for(s=this.a,r=this.b;s.p();)if(r.$1(s.gt(s)))return!0
return!1},
gt(a){var s=this.a
return s.gt(s)},
$iac:1}
A.cr.prototype={
gB(a){return new A.e6(J.aF(this.a),this.$ti.i("e6<1>"))}}
A.e6.prototype={
p(){var s,r
for(s=this.a,r=this.$ti.c;s.p();)if(r.b(s.gt(s)))return!0
return!1},
gt(a){var s=this.a
return this.$ti.c.a(s.gt(s))},
$iac:1}
A.aI.prototype={}
A.bG.prototype={
k(a,b,c){A.C(this).i("bG.E").a(c)
throw A.b(A.P("Cannot modify an unmodifiable list"))}}
A.d2.prototype={}
A.hz.prototype={
gj(a){return J.an(this.a)},
u(a,b){var s=J.an(this.a)
if(0>b||b>=s)A.bN(A.a8(b,s,this,null,"index"))
return b}}
A.cm.prototype={
h(a,b){return this.M(0,b)?J.i(this.a,A.L(b)):null},
gj(a){return J.an(this.a)},
gH(a){return new A.hz(this.a)},
gE(a){return J.iu(this.a)},
gT(a){return J.o6(this.a)},
M(a,b){return A.eI(b)&&b>=0&&b<J.an(this.a)},
q(a,b){var s,r,q,p
this.$ti.i("~(l,1)").a(b)
s=this.a
r=J.x(s)
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
l(a){return A.oj(this)},
k(a,b,c){var s=A.C(this)
s.c.a(b)
s.y[1].a(c)
A.p9()},
C(a,b){A.p9()},
gaC(a){return new A.da(this.fW(0),A.C(this).i("da<ar<1,2>>"))},
fW(a){var s=this
return function(){var r=a
var q=0,p=1,o=[],n,m,l,k,j
return function $async$gaC(b,c,d){if(c===1){o.push(d)
q=p}for(;;)switch(q){case 0:n=s.gH(s),n=n.gB(n),m=A.C(s),l=m.y[1],m=m.i("ar<1,2>")
case 2:if(!n.p()){q=3
break}k=n.gt(n)
j=s.h(0,k)
q=4
return b.b=new A.ar(k,j==null?l.a(j):j,m),1
case 4:q=2
break
case 3:return 0
case 1:return b.c=o.at(-1),3}}}},
$it:1}
A.bv.prototype={
gj(a){return this.b.length},
gd3(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
M(a,b){if(typeof b!="string")return!1
if("__proto__"===b)return!1
return this.a.hasOwnProperty(b)},
h(a,b){if(!this.M(0,b))return null
return this.b[this.a[b]]},
q(a,b){var s,r,q,p
this.$ti.i("~(1,2)").a(b)
s=this.gd3()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gH(a){return new A.ej(this.gd3(),this.$ti.i("ej<1>"))}}
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
$iac:1}
A.fh.prototype={
ghd(){var s=this.a
if(s instanceof A.c_)return s
return this.a=new A.c_(A.w(s))},
ghj(){var s,r,q,p,o,n=this
if(n.c===1)return B.K
s=n.d
r=J.x(s)
q=r.gj(s)-J.an(n.e)-n.f
if(q===0)return B.K
p=[]
for(o=0;o<q;++o)p.push(r.h(s,o))
p.$flags=3
return p},
ghe(){var s,r,q,p,o,n,m,l,k=this
if(k.c!==0)return B.N
s=k.e
r=J.x(s)
q=r.gj(s)
p=k.d
o=J.x(p)
n=o.gj(p)-q-k.f
if(q===0)return B.N
m=new A.bg(t.bX)
for(l=0;l<q;++l)m.k(0,new A.c_(A.w(r.h(s,l))),o.h(p,n+l))
return new A.dn(m,t.i9)},
$ipi:1}
A.me.prototype={
$2(a,b){var s
A.w(a)
s=this.a
s.b=s.b+"$"+a
B.b.m(this.b,a)
B.b.m(this.c,b);++s.a},
$S:6}
A.cZ.prototype={}
A.mp.prototype={
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
A.h_.prototype={
l(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.mc.prototype={
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
return"Closure '"+A.qT(r==null?"unknown":r)+"'"},
$icg:1,
ghC(){return this},
$C:"$1",
$R:1,
$D:null}
A.eY.prototype={$C:"$0",$R:0}
A.eZ.prototype={$C:"$2",$R:2}
A.fQ.prototype={}
A.fM.prototype={
l(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.qT(s)+"'"}}
A.cL.prototype={
a0(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.cL))return!1
return this.$_target===b.$_target&&this.a===b.a},
gK(a){return(A.io(this.a)^A.dU(this.$_target))>>>0},
l(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.dV(this.a)+"'")}}
A.fJ.prototype={
l(a){return"RuntimeError: "+this.a}}
A.n5.prototype={}
A.bg.prototype={
gj(a){return this.a},
gE(a){return this.a===0},
gT(a){return this.a!==0},
gH(a){return new A.ck(this,A.C(this).i("ck<1>"))},
gaC(a){return new A.dG(this,A.C(this).i("dG<1,2>"))},
M(a,b){var s=this.b
if(s==null)return!1
return s[b]!=null},
S(a,b){J.it(A.C(this).i("t<1,2>").a(b),new A.lY(this))},
h(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.h5(b)},
h5(a){var s,r,q=this.d
if(q==null)return null
s=q[this.dE(a)]
r=this.dF(s,a)
if(r<0)return null
return s[r].b},
k(a,b,c){var s,r,q=this,p=A.C(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.cS(s==null?q.b=q.c1():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.cS(r==null?q.c=q.c1():r,b,c)}else q.h6(b,c)},
h6(a,b){var s,r,q,p,o=this,n=A.C(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.c1()
r=o.dE(a)
q=s[r]
if(q==null)s[r]=[o.c2(a,b)]
else{p=o.dF(q,a)
if(p>=0)q[p].b=b
else q.push(o.c2(a,b))}},
dQ(a,b,c){var s,r,q=this,p=A.C(q)
p.c.a(b)
p.i("2()").a(c)
if(q.M(0,b)){s=q.h(0,b)
return s==null?p.y[1].a(s):s}r=c.$0()
q.k(0,b,r)
return r},
C(a,b){var s=this.eJ(this.b,b)
return s},
X(a){var s=this
if(s.a>0){s.b=s.c=s.d=s.e=s.f=null
s.a=0
s.c0()}},
q(a,b){var s,r,q=this
A.C(q).i("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.b(A.a7(q))
s=s.c}},
cS(a,b,c){var s,r=A.C(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.c2(b,c)
else s.b=c},
eJ(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.eK(s)
delete a[b]
return s.b},
c0(){this.r=this.r+1&1073741823},
c2(a,b){var s=this,r=A.C(s),q=new A.m2(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.c0()
return q},
eK(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.c0()},
dE(a){return J.cI(a)&1073741823},
dF(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.j(a[r].a,b))return r
return-1},
l(a){return A.oj(this)},
c1(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ipo:1}
A.lY.prototype={
$2(a,b){var s=this.a,r=A.C(s)
s.k(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.C(this.a).i("~(1,2)")}}
A.m2.prototype={}
A.ck.prototype={
gj(a){return this.a.a},
gE(a){return this.a.a===0},
gB(a){var s=this.a
return new A.dI(s,s.r,s.e,this.$ti.i("dI<1>"))},
v(a,b){return this.a.M(0,b)}}
A.dI.prototype={
gt(a){return this.d},
p(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.b(A.a7(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iac:1}
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
$iac:1}
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
return!1}else{r.d=new A.ar(s.a,s.b,r.$ti.i("ar<1,2>"))
r.c=s.c
return!0}},
$iac:1}
A.nK.prototype={
$1(a){return this.a(a)},
$S:13}
A.nL.prototype={
$2(a,b){return this.a(a,b)},
$S:76}
A.nM.prototype={
$1(a){return this.a(A.w(a))},
$S:70}
A.fj.prototype={
l(a){return"RegExp/"+this.a+"/"+this.b.flags},
dz(a){var s=this.b.exec(a)
if(s==null)return null
return new A.n3(s)},
$imd:1,
$itk:1}
A.n3.prototype={
h(a,b){var s
A.L(b)
s=this.b
if(!(b<s.length))return A.d(s,b)
return s[b]}}
A.cn.prototype={
gW(a){return B.at},
ds(a,b,c){return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
$ia_:1,
$icn:1,
$ieX:1}
A.dO.prototype={
gfL(a){if(((a.$flags|0)&2)!==0)return new A.i5(a.buffer)
else return a.buffer},
f7(a,b,c,d){var s=A.ah(b,0,c,d,null)
throw A.b(s)},
cW(a,b,c,d){if(b>>>0!==b||b>c)this.f7(a,b,c,d)},
$iae:1}
A.i5.prototype={
ds(a,b,c){var s=A.pr(this.a,b,c)
s.$flags=3
return s},
$ieX:1}
A.dM.prototype={
gW(a){return B.au},
$ia_:1,
$ikL:1}
A.au.prototype={
gj(a){return a.length},
fp(a,b,c,d,e){var s,r,q=a.length
this.cW(a,b,q,"start")
this.cW(a,c,q,"end")
if(b>c)throw A.b(A.ah(b,0,c,null,null))
s=c-b
if(e<0)throw A.b(A.aX(e,null))
r=d.length
if(r-e<s)throw A.b(A.O("Not enough elements"))
if(e!==0||r!==s)d=d.subarray(e,e+s)
a.set(d,b)},
$iN:1}
A.dN.prototype={
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
k(a,b,c){A.qk(c)
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
bO(a,b,c,d,e){t.fm.a(d)
a.$flags&2&&A.al(a,5)
if(t.aj.b(d)){this.fp(a,b,c,d,e)
return}this.ez(a,b,c,d,e)},
$in:1,
$ih:1,
$ip:1}
A.fu.prototype={
gW(a){return B.av},
$ia_:1,
$ilS:1}
A.fv.prototype={
gW(a){return B.aw},
$ia_:1,
$ilT:1}
A.fw.prototype={
gW(a){return B.ax},
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
$ia_:1,
$ilU:1}
A.fx.prototype={
gW(a){return B.ay},
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
$ia_:1,
$ilV:1}
A.fy.prototype={
gW(a){return B.az},
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
$ia_:1,
$ilW:1}
A.fz.prototype={
gW(a){return B.aB},
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
$ia_:1,
$imr:1}
A.fA.prototype={
gW(a){return B.aC},
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
$ia_:1,
$ims:1}
A.dP.prototype={
gW(a){return B.aD},
gj(a){return a.length},
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
$ia_:1,
$imt:1}
A.dQ.prototype={
gW(a){return B.aE},
gj(a){return a.length},
h(a,b){A.L(b)
A.bJ(b,a,a.length)
return a[b]},
$ia_:1,
$imu:1}
A.em.prototype={}
A.en.prototype={}
A.eo.prototype={}
A.ep.prototype={}
A.bk.prototype={
i(a){return A.nf(v.typeUniverse,this,a)},
I(a){return A.tY(v.typeUniverse,this,a)}}
A.hp.prototype={}
A.nd.prototype={
l(a){return A.aK(this.a,null)}}
A.hm.prototype={
l(a){return this.a}}
A.db.prototype={$ibD:1}
A.mC.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:14}
A.mB.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:43}
A.mD.prototype={
$0(){this.a.$0()},
$S:20}
A.mE.prototype={
$0(){this.a.$0()},
$S:20}
A.ey.prototype={
eH(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(A.bK(new A.nc(this,b),0),a)
else throw A.b(A.P("`setTimeout()` not found."))},
eI(a,b){if(self.setTimeout!=null)this.b=self.setInterval(A.bK(new A.nb(this,a,Date.now(),b),0),a)
else throw A.b(A.P("Periodic timer."))},
a3(a){var s
if(self.setTimeout!=null){s=this.b
if(s==null)return
if(this.a)self.clearTimeout(s)
else self.clearInterval(s)
this.b=null}else throw A.b(A.P("Canceling a timer."))},
$ifU:1}
A.nc.prototype={
$0(){var s=this.a
s.b=null
s.c=1
this.b.$0()},
$S:2}
A.nb.prototype={
$0(){var s,r=this,q=r.a,p=q.c+1,o=r.b
if(o>0){s=Date.now()-r.c
if(s>(p+1)*o)p=B.e.eD(s,o)}q.c=p
r.d.$1(q)},
$S:20}
A.h6.prototype={
b7(a,b){var s,r=this,q=r.$ti
q.i("1/?").a(b)
if(b==null)b=q.c.a(b)
if(!r.b)r.a.aZ(b)
else{s=r.a
if(q.i("af<1>").b(b))s.cU(b)
else s.bV(b)}},
cj(a,b){var s=this.a
if(this.b)s.aA(new A.az(a,b))
else s.bQ(new A.az(a,b))}}
A.nt.prototype={
$1(a){return this.a.$2(0,a)},
$S:15}
A.nu.prototype={
$2(a,b){this.a.$2(1,new A.dv(a,t.l.a(b)))},
$S:39}
A.nD.prototype={
$2(a,b){this.a(A.L(a),b)},
$S:40}
A.ev.prototype={
gt(a){var s=this.b
return s==null?this.$ti.c.a(s):s},
fj(a,b){var s,r,q
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
n.d=null}p=n.fj(l,m)
if(1===p)return!0
if(0===p){n.b=null
o=n.e
if(o==null||o.length===0){n.a=A.pZ
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
n.a=A.pZ
throw m
return!1}if(0>=o.length)return A.d(o,-1)
n.a=o.pop()
l=1
continue}throw A.b(A.O("sync*"))}return!1},
hG(a){var s,r,q=this
if(a instanceof A.da){s=a.a()
r=q.e
if(r==null)r=q.e=[]
B.b.m(r,q.a)
q.a=s
return 2}else{q.d=J.aF(a)
return 2}},
$iac:1}
A.da.prototype={
gB(a){return new A.ev(this.a(),this.$ti.i("ev<1>"))}}
A.az.prototype={
l(a){return A.e(this.a)},
$ia0:1,
gaW(){return this.b}}
A.d5.prototype={}
A.bI.prototype={
c3(){},
c4(){},
sbn(a){this.ch=this.$ti.i("bI<1>?").a(a)},
sc5(a){this.CW=this.$ti.i("bI<1>?").a(a)}}
A.e8.prototype={
gf9(){return this.c<4},
fg(a){var s,r
A.C(this).i("bI<1>").a(a)
s=a.CW
r=a.ch
if(s==null)this.d=r
else s.sbn(r)
if(r==null)this.e=s
else r.sc5(s)
a.sc5(a)
a.sbn(a)},
fu(a,b,c,d){var s,r,q,p,o,n,m,l=this,k=A.C(l)
k.i("~(1)?").a(a)
t.jE.a(c)
if((l.c&4)!==0){k=new A.d7($.V,k.i("d7<1>"))
A.qQ(k.gfa())
if(c!=null)k.c=t.M.a(c)
return k}s=$.V
r=d?1:0
q=b!=null?32:0
p=A.pO(s,a,k.c)
A.tz(s,b)
o=c==null?A.v7():c
t.M.a(o)
k=k.i("bI<1>")
n=new A.bI(l,p,s,r|q,k)
n.CW=n
n.ch=n
k.a(n)
n.ay=l.c&1
m=l.e
l.e=n
n.sbn(null)
n.sc5(m)
if(m==null)l.d=n
else m.sbn(n)
if(l.d==l.e)A.qA(l.a)
return n},
fe(a){var s=this,r=A.C(s)
a=r.i("bI<1>").a(r.i("br<1>").a(a))
if(a.ch===a)return null
r=a.ay
if((r&2)!==0)a.ay=r|4
else{s.fg(a)
if((s.c&2)===0&&s.d==null)s.eS()}return null},
eN(){if((this.c&4)!==0)return new A.bq("Cannot add new events after calling close")
return new A.bq("Cannot add new events while doing an addStream")},
m(a,b){var s=this
A.C(s).c.a(b)
if(!s.gf9())throw A.b(s.eN())
s.ca(b)},
eS(){if((this.c&4)!==0)if(null.ghF())null.aZ(null)
A.qA(this.b)},
$ipB:1,
$ipY:1,
$ic3:1}
A.e7.prototype={
ca(a){var s,r=this.$ti
r.c.a(a)
for(s=this.d,r=r.i("eb<1>");s!=null;s=s.ch)s.eP(new A.eb(a,r))}}
A.mn.prototype={
l(a){var s=this.b.l(0)
return"TimeoutException after "+s+": "+this.a}}
A.hb.prototype={
cj(a,b){var s=this.a
if((s.a&30)!==0)throw A.b(A.O("Future already completed"))
s.bQ(A.uz(a,b))},
bw(a){return this.cj(a,null)}}
A.bH.prototype={
b7(a,b){var s,r=this.$ti
r.i("1/?").a(b)
s=this.a
if((s.a&30)!==0)throw A.b(A.O("Future already completed"))
s.aZ(r.i("1/").a(b))},
fO(a){return this.b7(0,null)}}
A.bn.prototype={
hc(a){if((this.c&15)!==6)return!0
return this.b.b.cC(t.iW.a(this.d),a.a,t.y,t.K)},
fZ(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.ng.b(q))p=l.hu(q,m,a.b,o,n,t.l)
else p=l.cC(t.w.a(q),m,o,n)
try{o=r.$ti.i("2/").a(p)
return o}catch(s){if(t.do.b(A.aq(s))){if((r.c&1)!==0)throw A.b(A.aX("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.b(A.aX("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.X.prototype={
bI(a,b,c){var s,r,q,p=this.$ti
p.I(c).i("1/(2)").a(a)
s=$.V
if(s===B.h){if(b!=null&&!t.ng.b(b)&&!t.w.b(b))throw A.b(A.kI(b,"onError",u.c))}else{c.i("@<0/>").I(p.c).i("1(2)").a(a)
if(b!=null)b=A.qw(b,s)}r=new A.X(s,c.i("X<0>"))
q=b==null?1:3
this.aY(new A.bn(r,q,a,b,p.i("@<1>").I(c).i("bn<1,2>")))
return r},
e0(a,b){return this.bI(a,null,b)},
df(a,b,c){var s,r=this.$ti
r.I(c).i("1/(2)").a(a)
s=new A.X($.V,c.i("X<0>"))
this.aY(new A.bn(s,19,a,b,r.i("@<1>").I(c).i("bn<1,2>")))
return s},
du(a){var s=this.$ti,r=$.V,q=new A.X(r,s)
if(r!==B.h)a=A.qw(a,r)
this.aY(new A.bn(q,2,null,a,s.i("bn<1,1>")))
return q},
fo(a){this.a=this.a&1|16
this.c=a},
bl(a){this.a=a.a&30|this.a&1
this.c=a.c},
aY(a){var s,r=this,q=r.a
if(q<=3){a.a=t.e.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.aY(a)
return}r.bl(s)}A.df(null,null,r.b,t.M.a(new A.mL(r,a)))}},
d7(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.e.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t._.a(m.c)
if((n.a&24)===0){n.d7(a)
return}m.bl(n)}l.a=m.bq(a)
A.df(null,null,m.b,t.M.a(new A.mQ(l,m)))}},
b1(){var s=t.e.a(this.c)
this.c=null
return this.bq(s)},
bq(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
bU(a){var s,r=this,q=r.$ti
q.i("1/").a(a)
if(q.i("af<1>").b(a))A.mO(a,r,!0)
else{s=r.b1()
q.c.a(a)
r.a=8
r.c=a
A.ct(r,s)}},
bV(a){var s,r=this
r.$ti.c.a(a)
s=r.b1()
r.a=8
r.c=a
A.ct(r,s)},
eX(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.b1()
q.bl(a)
A.ct(q,r)},
aA(a){var s=this.b1()
this.fo(a)
A.ct(this,s)},
eW(a,b){A.b4(a)
t.l.a(b)
this.aA(new A.az(a,b))},
aZ(a){var s=this.$ti
s.i("1/").a(a)
if(s.i("af<1>").b(a)){this.cU(a)
return}this.eQ(a)},
eQ(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.df(null,null,s.b,t.M.a(new A.mN(s,a)))},
cU(a){A.mO(this.$ti.i("af<1>").a(a),this,!1)
return},
bQ(a){this.a^=2
A.df(null,null,this.b,t.M.a(new A.mM(this,a)))},
e1(a,b){var s,r=this,q={}
if((r.a&24)!==0){q=new A.X($.V,r.$ti)
q.aZ(r)
return q}s=new A.X($.V,r.$ti)
q.a=null
q.a=A.fV(b,new A.mW(s,b))
r.bI(new A.mX(q,r,s),new A.mY(q,s),t.a)
return s},
$iaf:1}
A.mL.prototype={
$0(){A.ct(this.a,this.b)},
$S:2}
A.mQ.prototype={
$0(){A.ct(this.b,this.a.a)},
$S:2}
A.mP.prototype={
$0(){A.mO(this.a.a,this.b,!0)},
$S:2}
A.mN.prototype={
$0(){this.a.bV(this.b)},
$S:2}
A.mM.prototype={
$0(){this.a.aA(this.b)},
$S:2}
A.mT.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.dX(t.mY.a(q.d),t.z)}catch(p){s=A.aq(p)
r=A.cE(p)
if(k.c&&t.n.a(k.b.a.c).a===s){q=k.a
q.c=t.n.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.o8(q)
n=k.a
n.c=new A.az(q,o)
q=n}q.b=!0
return}if(j instanceof A.X&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.n.a(j.c)
q.b=!0}return}if(j instanceof A.X){m=k.b.a
l=new A.X(m.b,m.$ti)
j.bI(new A.mU(l,m),new A.mV(l),t.H)
q=k.a
q.c=l
q.b=!1}},
$S:2}
A.mU.prototype={
$1(a){this.a.eX(this.b)},
$S:14}
A.mV.prototype={
$2(a,b){A.b4(a)
t.l.a(b)
this.a.aA(new A.az(a,b))},
$S:32}
A.mS.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.cC(o.i("2/(1)").a(p.d),m,o.i("2/"),n)}catch(l){s=A.aq(l)
r=A.cE(l)
q=s
p=r
if(p==null)p=A.o8(q)
o=this.a
o.c=new A.az(q,p)
o.b=!0}},
$S:2}
A.mR.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.n.a(l.a.a.c)
p=l.b
if(p.a.hc(s)&&p.a.e!=null){p.c=p.a.fZ(s)
p.b=!1}}catch(o){r=A.aq(o)
q=A.cE(o)
p=t.n.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.o8(p)
m=l.b
m.c=new A.az(p,n)
p=m}p.b=!0}},
$S:2}
A.mW.prototype={
$0(){var s=A.op()
this.a.aA(new A.az(new A.mn("Future not completed",this.b),s))},
$S:2}
A.mX.prototype={
$1(a){var s
this.b.$ti.c.a(a)
s=this.a.a
if(s.b!=null){s.a3(0)
this.c.bV(a)}},
$S(){return this.b.$ti.i("ad(1)")}}
A.mY.prototype={
$2(a,b){var s
A.b4(a)
t.l.a(b)
s=this.a.a
if(s.b!=null){s.a3(0)
this.b.aA(new A.az(a,b))}},
$S:32}
A.h7.prototype={}
A.bZ.prototype={
gj(a){var s={},r=new A.X($.V,t.hy)
s.a=0
this.bD(new A.ml(s,this),!0,new A.mm(s,r),r.gcZ())
return r},
gD(a){var s=new A.X($.V,A.C(this).i("X<1>")),r=this.bD(null,!0,new A.mj(s),s.gcZ())
r.cu(new A.mk(this,r,s))
return s}}
A.ml.prototype={
$1(a){A.C(this.b).c.a(a);++this.a.a},
$S(){return A.C(this.b).i("~(1)")}}
A.mm.prototype={
$0(){this.b.bU(this.a.a)},
$S:2}
A.mj.prototype={
$0(){var s,r=A.op(),q=new A.bq("No element")
A.on(q,r)
s=A.qq(q,r)
s=new A.az(q,r)
this.a.aA(s)},
$S:2}
A.mk.prototype={
$1(a){A.ui(this.b,this.c,A.C(this.a).c.a(a))},
$S(){return A.C(this.a).i("~(1)")}}
A.e9.prototype={
gK(a){return(A.dU(this.a)^892482866)>>>0},
a0(a,b){if(b==null)return!1
if(this===b)return!0
return b instanceof A.d5&&b.a===this.a}}
A.ea.prototype={
d5(){return this.w.fe(this)},
c3(){A.C(this.w).i("br<1>").a(this)},
c4(){A.C(this.w).i("br<1>").a(this)}}
A.d6.prototype={
cu(a){var s=A.C(this)
this.a=A.pO(this.d,s.i("~(1)?").a(a),s.c)},
a3(a){var s,r=this,q=r.e&=4294967279
if((q&8)===0){q=r.e=q|8
if((q&128)!==0){s=r.r
if(s.a===1)s.a=3}if((q&64)===0)r.r=null
r.f=r.d5()}q=$.nZ()
return q},
c3(){},
c4(){},
d5(){return null},
eP(a){var s,r,q=this,p=q.r
if(p==null)p=q.r=new A.hI(A.C(q).i("hI<1>"))
s=p.c
if(s==null)p.b=p.c=a
else p.c=s.a=a
r=q.e
if((r&128)===0){r|=128
q.e=r
if(r<256)p.cK(q)}},
ca(a){var s,r=this,q=A.C(r).c
q.a(a)
s=r.e
r.e=s|64
r.d.dZ(r.a,a,q)
r.e&=4294967231
r.eT((s&4)!==0)},
eT(a){var s,r,q=this,p=q.e
if((p&128)!==0&&q.r.c==null){p=q.e=p&4294967167
s=!1
if((p&4)!==0)if(p<256){s=q.r
s=s==null?null:s.c==null
s=s!==!1}if(s){p&=4294967291
q.e=p}}for(;;a=r){if((p&8)!==0){q.r=null
return}r=(p&4)!==0
if(a===r)break
q.e=p^64
if(r)q.c3()
else q.c4()
p=q.e&=4294967231}if((p&128)!==0&&p<256)q.r.cK(q)},
$ibr:1,
$ic3:1}
A.d9.prototype={
bD(a,b,c,d){var s=this.$ti
s.i("~(1)?").a(a)
t.jE.a(c)
return this.a.fu(s.i("~(1)?").a(a),d,c,b===!0)},
ha(a){return this.bD(a,null,null,null)}}
A.ec.prototype={}
A.eb.prototype={}
A.hI.prototype={
cK(a){var s,r=this
r.$ti.i("c3<1>").a(a)
s=r.a
if(s===1)return
if(s>=1){r.a=1
return}A.qQ(new A.n4(r,a))
r.a=1}}
A.n4.prototype={
$0(){var s,r,q,p=this.a,o=p.a
p.a=0
if(o===3)return
s=p.$ti.i("c3<1>").a(this.b)
r=p.b
q=r.a
p.b=q
if(q==null)p.c=null
A.C(r).i("c3<1>").a(s).ca(r.b)},
$S:2}
A.d7.prototype={
cu(a){this.$ti.i("~(1)?").a(a)},
a3(a){this.a=-1
this.c=null
return $.nZ()},
fb(){var s,r=this,q=r.a-1
if(q===0){r.a=-1
s=r.c
if(s!=null){r.c=null
r.b.dY(s)}}else r.a=q},
$ibr:1}
A.hT.prototype={}
A.nv.prototype={
$0(){return this.a.bU(this.b)},
$S:2}
A.eG.prototype={$ipM:1}
A.hL.prototype={
dY(a){var s,r,q
t.M.a(a)
try{if(B.h===$.V){a.$0()
return}A.qx(null,null,this,a,t.H)}catch(q){s=A.aq(q)
r=A.cE(q)
A.ih(A.b4(s),t.l.a(r))}},
dZ(a,b,c){var s,r,q
c.i("~(0)").a(a)
c.a(b)
try{if(B.h===$.V){a.$1(b)
return}A.qy(null,null,this,a,b,t.H,c)}catch(q){s=A.aq(q)
r=A.cE(q)
A.ih(A.b4(s),t.l.a(r))}},
cg(a){return new A.n6(this,t.M.a(a))},
dt(a,b){return new A.n7(this,b.i("~(0)").a(a),b)},
h(a,b){return null},
dX(a,b){b.i("0()").a(a)
if($.V===B.h)return a.$0()
return A.qx(null,null,this,a,b)},
cC(a,b,c,d){c.i("@<0>").I(d).i("1(2)").a(a)
d.a(b)
if($.V===B.h)return a.$1(b)
return A.qy(null,null,this,a,b,c,d)},
hu(a,b,c,d,e,f){d.i("@<0>").I(e).I(f).i("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.V===B.h)return a.$2(b,c)
return A.uT(null,null,this,a,b,c,d,e,f)},
cz(a,b,c,d){return b.i("@<0>").I(c).I(d).i("1(2,3)").a(a)}}
A.n6.prototype={
$0(){return this.a.dY(this.b)},
$S:2}
A.n7.prototype={
$1(a){var s=this.c
return this.a.dZ(this.b,s.a(a),s)},
$S(){return this.c.i("~(0)")}}
A.nC.prototype={
$0(){A.t0(this.a,this.b)},
$S:2}
A.eg.prototype={
gj(a){return this.a},
gE(a){return this.a===0},
gT(a){return this.a!==0},
gH(a){return new A.eh(this,this.$ti.i("eh<1>"))},
M(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
return s==null?!1:s[b]!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
return r==null?!1:r[b]!=null}else return this.f_(b)},
f_(a){var s=this.d
if(s==null)return!1
return this.am(this.d0(s,a),a)>=0},
h(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.ot(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.ot(q,b)
return r}else return this.f3(0,b)},
f3(a,b){var s,r,q=this.d
if(q==null)return null
s=this.d0(q,b)
r=this.am(s,b)
return r<0?null:s[r+1]},
k(a,b,c){var s,r,q,p,o,n=this,m=n.$ti
m.c.a(b)
m.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=n.b
n.eV(s==null?n.b=A.pQ():s,b,c)}else{r=n.d
if(r==null)r=n.d=A.pQ()
q=A.io(b)&1073741823
p=r[q]
if(p==null){A.ou(r,q,[b,c]);++n.a
n.e=null}else{o=n.am(p,b)
if(o>=0)p[o+1]=c
else{p.push(b,c);++n.a
n.e=null}}}},
C(a,b){var s
if(b!=="__proto__")return this.bp(this.b,b)
else{s=this.c7(0,b)
return s}},
c7(a,b){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=A.io(b)&1073741823
r=n[s]
q=o.am(r,b)
if(q<0)return null;--o.a
o.e=null
p=r.splice(q,2)[1]
if(0===r.length)delete n[s]
return p},
q(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.i("~(1,2)").a(b)
s=m.d_()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.h(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.b(A.a7(m))}},
d_(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
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
eV(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.ou(a,b,c)},
bp(a,b){var s
if(a!=null&&a[b]!=null){s=this.$ti.y[1].a(A.ot(a,b))
delete a[b];--this.a
this.e=null
return s}else return null},
d0(a,b){return a[A.io(b)&1073741823]}}
A.cv.prototype={
am(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.eh.prototype={
gj(a){return this.a.a},
gE(a){return this.a.a===0},
gT(a){return this.a.a!==0},
gB(a){var s=this.a
return new A.ei(s,s.d_(),this.$ti.i("ei<1>"))},
v(a,b){return this.a.M(0,b)}}
A.ei.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.b(A.a7(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iac:1}
A.cw.prototype={
gB(a){var s=this,r=new A.cx(s,s.r,A.C(s).i("cx<1>"))
r.c=s.e
return r},
gj(a){return this.a},
gE(a){return this.a===0},
gT(a){return this.a!==0},
v(a,b){var s,r
if(typeof b=="string"&&b!=="__proto__"){s=this.b
if(s==null)return!1
return t.O.a(s[b])!=null}else if(typeof b=="number"&&(b&1073741823)===b){r=this.c
if(r==null)return!1
return t.O.a(r[b])!=null}else return this.eZ(b)},
eZ(a){var s=this.d
if(s==null)return!1
return this.am(s[this.bW(a)],a)>=0},
m(a,b){var s,r,q=this
A.C(q).c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.cX(s==null?q.b=A.ov():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.cX(r==null?q.c=A.ov():r,b)}else return q.eL(0,b)},
eL(a,b){var s,r,q,p=this
A.C(p).c.a(b)
s=p.d
if(s==null)s=p.d=A.ov()
r=p.bW(b)
q=s[r]
if(q==null)s[r]=[p.bT(b)]
else{if(p.am(q,b)>=0)return!1
q.push(p.bT(b))}return!0},
C(a,b){var s=this
if(typeof b=="string"&&b!=="__proto__")return s.bp(s.b,b)
else if(typeof b=="number"&&(b&1073741823)===b)return s.bp(s.c,b)
else return s.c7(0,b)},
c7(a,b){var s,r,q,p,o=this,n=o.d
if(n==null)return!1
s=o.bW(b)
r=n[s]
q=o.am(r,b)
if(q<0)return!1
p=r.splice(q,1)[0]
if(0===r.length)delete n[s]
o.dj(p)
return!0},
cX(a,b){A.C(this).c.a(b)
if(t.O.a(a[b])!=null)return!1
a[b]=this.bT(b)
return!0},
bp(a,b){var s
if(a==null)return!1
s=t.O.a(a[b])
if(s==null)return!1
this.dj(s)
delete a[b]
return!0},
cY(){this.r=this.r+1&1073741823},
bT(a){var s,r=this,q=new A.hy(A.C(r).c.a(a))
if(r.e==null)r.e=r.f=q
else{s=r.f
s.toString
q.c=s
r.f=s.b=q}++r.a
r.cY()
return q},
dj(a){var s=this,r=a.c,q=a.b
if(r==null)s.e=q
else r.b=q
if(q==null)s.f=r
else q.c=r;--s.a
s.cY()},
bW(a){return J.cI(a)&1073741823},
am(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.j(a[r].a,b))return r
return-1}}
A.hy.prototype={}
A.cx.prototype={
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
p(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.b(A.a7(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.i("1?").a(r.a)
s.c=r.b
return!0}},
$iac:1}
A.e3.prototype={
gj(a){return this.a.length},
h(a,b){var s
A.L(b)
s=this.a
if(!(b>=0&&b<s.length))return A.d(s,b)
return s[b]}}
A.m3.prototype={
$2(a,b){this.a.k(0,this.b.a(a),this.c.a(b))},
$S:44}
A.m.prototype={
gB(a){return new A.bh(a,this.gj(a),A.ax(a).i("bh<m.E>"))},
u(a,b){return this.h(a,b)},
q(a,b){var s,r
A.ax(a).i("~(m.E)").a(b)
s=this.gj(a)
for(r=0;r<s;++r){b.$1(this.h(a,r))
if(s!==this.gj(a))throw A.b(A.a7(a))}},
gE(a){return this.gj(a)===0},
gT(a){return!this.gE(a)},
gD(a){if(this.gj(a)===0)throw A.b(A.dB())
return this.h(a,0)},
v(a,b){var s,r=this.gj(a)
for(s=0;s<r;++s){if(J.j(this.h(a,s),b))return!0
if(r!==this.gj(a))throw A.b(A.a7(a))}return!1},
e7(a,b){return new A.cr(a,b.i("cr<0>"))},
ar(a,b,c){var s=A.ax(a)
return new A.a1(a,s.I(c).i("1(m.E)").a(b),s.i("@<m.E>").I(c).i("a1<1,2>"))},
aF(a,b){var s,r,q,p,o=this
if(o.gE(a)){s=J.oe(0,A.ax(a).i("m.E"))
return s}r=o.h(a,0)
q=A.dK(o.gj(a),r,!0,A.ax(a).i("m.E"))
for(p=1;p<o.gj(a);++p)B.b.k(q,p,o.h(a,p))
return q},
av(a){return this.aF(a,!0)},
fX(a,b,c,d){var s
A.ax(a).i("m.E?").a(d)
A.co(b,c,this.gj(a))
for(s=b;s<c;++s)this.k(a,s,d)},
bO(a,b,c,d,e){var s,r,q
A.ax(a).i("h<m.E>").a(d)
A.co(b,c,this.gj(a))
s=c-b
if(s===0)return
A.cY(e,"skipCount")
r=J.x(d)
if(e+s>r.gj(d))throw A.b(A.O("Too few elements"))
if(e<b)for(q=s-1;q>=0;--q)this.k(a,b+q,r.h(d,e+q))
else for(q=0;q<s;++q)this.k(a,b+q,r.h(d,e+q))},
l(a){return A.od(a,"[","]")},
$in:1,
$ih:1,
$ip:1}
A.G.prototype={
q(a,b){var s,r,q,p=A.ax(a)
p.i("~(G.K,G.V)").a(b)
for(s=J.aF(this.gH(a)),p=p.i("G.V");s.p();){r=s.gt(s)
q=this.h(a,r)
b.$2(r,q==null?p.a(q):q)}},
gaC(a){return J.c9(this.gH(a),new A.m4(a),A.ax(a).i("ar<G.K,G.V>"))},
M(a,b){return J.o3(this.gH(a),b)},
gj(a){return J.an(this.gH(a))},
gE(a){return J.iu(this.gH(a))},
gT(a){return J.o6(this.gH(a))},
l(a){return A.oj(a)},
$it:1}
A.m4.prototype={
$1(a){var s=this.a,r=A.ax(s)
r.i("G.K").a(a)
s=J.i(s,a)
if(s==null)s=r.i("G.V").a(s)
return new A.ar(a,s,r.i("ar<G.K,G.V>"))},
$S(){return A.ax(this.a).i("ar<G.K,G.V>(G.K)")}}
A.m5.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.e(a)
r.a=(r.a+=s)+": "
s=A.e(b)
r.a+=s},
$S:33}
A.d3.prototype={}
A.aE.prototype={
k(a,b,c){var s=A.C(this)
s.i("aE.K").a(b)
s.i("aE.V").a(c)
throw A.b(A.P("Cannot modify unmodifiable map"))},
C(a,b){throw A.b(A.P("Cannot modify unmodifiable map"))}}
A.cU.prototype={
h(a,b){return J.i(this.a,b)},
k(a,b,c){var s=A.C(this)
J.am(this.a,s.c.a(b),s.y[1].a(c))},
M(a,b){return J.o4(this.a,b)},
q(a,b){J.it(this.a,A.C(this).i("~(1,2)").a(b))},
gE(a){return J.iu(this.a)},
gT(a){return J.o6(this.a)},
gj(a){return J.an(this.a)},
gH(a){return J.rw(this.a)},
C(a,b){return J.rG(this.a,b)},
l(a){return J.M(this.a)},
gaC(a){return J.rv(this.a)},
$it:1}
A.c1.prototype={}
A.av.prototype={
gE(a){return this.gj(this)===0},
gT(a){return this.gj(this)!==0},
S(a,b){var s
for(s=J.aF(A.C(this).i("h<av.E>").a(b));s.p();)this.m(0,s.gt(s))},
bF(a){var s
for(s=0;s<5;++s)this.C(0,a[s])},
ar(a,b,c){var s=A.C(this)
return new A.bx(this,s.I(c).i("1(av.E)").a(b),s.i("@<av.E>").I(c).i("bx<1,2>"))},
l(a){return A.od(this,"{","}")},
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
A.cY(b,"index")
s=this.gB(this)
for(r=b;s.p();){if(r===0){q=s.d
return q==null?s.$ti.c.a(q):q}--r}throw A.b(A.a8(b,b-r,this,null,"index"))},
$in:1,
$ih:1,
$ib9:1}
A.eq.prototype={}
A.dc.prototype={}
A.hu.prototype={
h(a,b){var s,r=this.b
if(r==null)return this.c.h(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.fc(b):s}},
gj(a){return this.b==null?this.c.a:this.b_().length},
gE(a){return this.gj(0)===0},
gT(a){return this.gj(0)>0},
gH(a){var s
if(this.b==null){s=this.c
return new A.ck(s,A.C(s).i("ck<1>"))}return new A.hv(this)},
k(a,b,c){var s,r,q=this
if(q.b==null)q.c.k(0,b,c)
else if(q.M(0,b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.dm().k(0,b,c)},
M(a,b){if(this.b==null)return this.c.M(0,b)
return Object.prototype.hasOwnProperty.call(this.a,b)},
C(a,b){if(this.b!=null&&!this.M(0,b))return null
return this.dm().C(0,b)},
q(a,b){var s,r,q,p,o=this
t.v.a(b)
if(o.b==null)return o.c.q(0,b)
s=o.b_()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.nw(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.b(A.a7(o))}},
b_(){var s=t.lH.a(this.c)
if(s==null)s=this.c=A.B(Object.keys(this.a),t.s)
return s},
dm(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.ao(t.N,t.z)
r=n.b_()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.k(0,o,n.h(0,o))}if(p===0)B.b.m(r,"")
else B.b.X(r)
n.a=n.b=null
return n.c=s},
fc(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.nw(this.a[a])
return this.b[a]=s}}
A.hv.prototype={
gj(a){return this.a.gj(0)},
u(a,b){var s=this.a
if(s.b==null)s=s.gH(0).u(0,b)
else{s=s.b_()
if(!(b>=0&&b<s.length))return A.d(s,b)
s=s[b]}return s},
gB(a){var s=this.a
if(s.b==null){s=s.gH(0)
s=s.gB(s)}else{s=s.b_()
s=new J.bd(s,s.length,A.D(s).i("bd<1>"))}return s},
v(a,b){return this.a.M(0,b)}}
A.nm.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:28}
A.nl.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:28}
A.dl.prototype={
dL(a3,a4,a5,a6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a1="Invalid base64 encoding length ",a2=a4.length
a6=A.co(a5,a6,a2)
s=$.oV()
for(r=s.length,q=a5,p=q,o=null,n=-1,m=-1,l=0;q<a6;q=k){k=q+1
if(!(q<a2))return A.d(a4,q)
j=a4.charCodeAt(q)
if(j===37){i=k+2
if(i<=a6){if(!(k<a2))return A.d(a4,k)
h=A.nJ(a4.charCodeAt(k))
g=k+1
if(!(g<a2))return A.d(a4,g)
f=A.nJ(a4.charCodeAt(g))
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
if(j===61)continue}j=e}if(d!==-2){if(o==null){o=new A.as("")
g=o}else g=o
g.a+=B.a.n(a4,p,q)
c=A.a6(j)
g.a+=c
p=k
continue}}throw A.b(A.a2("Invalid base64 data",a4,q))}if(o!=null){a2=B.a.n(a4,p,a6)
a2=o.a+=a2
r=a2.length
if(n>=0)A.p2(a4,m,a6,n,l,r)
else{b=B.e.aU(r-1,4)+1
if(b===1)throw A.b(A.a2(a1,a4,a6))
while(b<4){a2+="="
o.a=a2;++b}}a2=o.a
return B.a.aD(a4,a5,a6,a2.charCodeAt(0)==0?a2:a2)}a=a6-a5
if(n>=0)A.p2(a4,m,a6,n,l,a)
else{b=B.e.aU(a,4)
if(b===1)throw A.b(A.a2(a1,a4,a6))
if(b>1)a4=B.a.aD(a4,a6,a6,b===2?"==":"=")}return a4},
dK(a,b){return this.dL(0,b,0,null)}}
A.eW.prototype={}
A.kK.prototype={
aB(a){var s,r,q,p=A.co(0,null,a.length)
if(0===p)return new Uint8Array(0)
s=new A.mF()
r=s.fR(0,a,0,p)
r.toString
q=s.a
if(q<-1)A.bN(A.a2("Missing padding character",a,p))
if(q>0)A.bN(A.a2("Invalid length, must be multiple of four",a,p))
s.a=-1
return r}}
A.mF.prototype={
fR(a,b,c,d){var s,r=this,q=r.a
if(q<0){r.a=A.pN(b,c,d,q)
return null}if(c===d)return new Uint8Array(0)
s=A.tw(b,c,d,q)
r.a=A.ty(b,c,d,s,0,r.a)
return s}}
A.cb.prototype={}
A.f1.prototype={}
A.fa.prototype={}
A.dE.prototype={
l(a){var s=A.by(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.fm.prototype={
l(a){return"Cyclic error in JSON stringify"}}
A.fl.prototype={
J(a,b){var s=A.uQ(b,this.gfT().a)
return s},
V(a){var s=A.tG(a,this.gfV().b,null)
return s},
gfV(){return B.ai},
gfT(){return B.ah}}
A.m1.prototype={}
A.m0.prototype={}
A.n1.prototype={
e9(a){var s,r,q,p,o,n,m=a.length
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
bS(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.b(new A.fm(a,null))}B.b.m(s,a)},
bL(a){var s,r,q,p,o=this
if(o.e8(a))return
o.bS(a)
try{s=o.b.$1(a)
if(!o.e8(s)){q=A.pm(a,null,o.gd6())
throw A.b(q)}q=o.a
if(0>=q.length)return A.d(q,-1)
q.pop()}catch(p){r=A.aq(p)
q=A.pm(a,r,o.gd6())
throw A.b(q)}},
e8(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.d.l(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.e9(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.bS(a)
q.hA(a)
s=q.a
if(0>=s.length)return A.d(s,-1)
s.pop()
return!0}else if(t.f.b(a)){q.bS(a)
r=q.hB(a)
s=q.a
if(0>=s.length)return A.d(s,-1)
s.pop()
return r}else return!1},
hA(a){var s,r,q=this.c
q.a+="["
s=J.x(a)
if(s.gT(a)){this.bL(s.h(a,0))
for(r=1;r<s.gj(a);++r){q.a+=","
this.bL(s.h(a,r))}}q.a+="]"},
hB(a){var s,r,q,p,o,n=this,m={},l=J.x(a)
if(l.gE(a)){n.c.a+="{}"
return!0}s=l.gj(a)*2
r=A.dK(s,null,!1,t.X)
q=m.a=0
m.b=!0
l.q(a,new A.n2(m,r))
if(!m.b)return!1
l=n.c
l.a+="{"
for(p='"';q<s;q+=2,p=',"'){l.a+=p
n.e9(A.w(r[q]))
l.a+='":'
o=q+1
if(!(o<s))return A.d(r,o)
n.bL(r[o])}l.a+="}"
return!0}}
A.n2.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.b.k(s,r.a++,a)
B.b.k(s,r.a++,b)},
$S:33}
A.n0.prototype={
gd6(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.h3.prototype={
J(a,b){t.f4.a(b)
return B.aF.aB(b)}}
A.mz.prototype={
aB(a){var s,r,q,p,o=a.length,n=A.co(0,null,o)
if(n===0)return new Uint8Array(0)
s=n*3
r=new Uint8Array(s)
q=new A.nn(r)
if(q.f2(a,0,n)!==n){p=n-1
if(!(p>=0&&p<o))return A.d(a,p)
q.cd()}return new Uint8Array(r.subarray(0,A.um(0,q.b,s)))}}
A.nn.prototype={
cd(){var s,r=this,q=r.c,p=r.b,o=r.b=p+1
q.$flags&2&&A.al(q)
s=q.length
if(!(p<s))return A.d(q,p)
q[p]=239
p=r.b=o+1
if(!(o<s))return A.d(q,o)
q[o]=191
r.b=p+1
if(!(p<s))return A.d(q,p)
q[p]=189},
fz(a,b){var s,r,q,p,o,n=this
if((b&64512)===56320){s=65536+((a&1023)<<10)|b&1023
r=n.c
q=n.b
p=n.b=q+1
r.$flags&2&&A.al(r)
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
return!0}else{n.cd()
return!1}},
f2(a,b,c){var s,r,q,p,o,n,m,l,k=this
if(b!==c){s=c-1
if(!(s>=0&&s<a.length))return A.d(a,s)
s=(a.charCodeAt(s)&64512)===55296}else s=!1
if(s)--c
for(s=k.c,r=s.$flags|0,q=s.length,p=a.length,o=b;o<c;++o){if(!(o<p))return A.d(a,o)
n=a.charCodeAt(o)
if(n<=127){m=k.b
if(m>=q)break
k.b=m+1
r&2&&A.al(s)
s[m]=n}else{m=n&64512
if(m===55296){if(k.b+4>q)break
m=o+1
if(!(m<p))return A.d(a,m)
if(k.fz(n,a.charCodeAt(m)))o=m}else if(m===56320){if(k.b+3>q)break
k.cd()}else if(n<=2047){m=k.b
l=m+1
if(l>=q)break
k.b=l
r&2&&A.al(s)
if(!(m<q))return A.d(s,m)
s[m]=n>>>6|192
k.b=l+1
s[l]=n&63|128}else{m=k.b
if(m+2>=q)break
l=k.b=m+1
r&2&&A.al(s)
if(!(m<q))return A.d(s,m)
s[m]=n>>>12|224
m=k.b=l+1
if(!(l<q))return A.d(s,l)
s[l]=n>>>6&63|128
k.b=m+1
if(!(m<q))return A.d(s,m)
s[m]=n&63|128}}}return o}}
A.my.prototype={
aB(a){return new A.nk(this.a).f0(t.f4.a(a),0,null,!0)}}
A.nk.prototype={
f0(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.f4.a(a)
s=A.co(b,c,J.an(a))
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.u9(a,b,s)
s-=b
p=b
b=0}if(s-b>=15){o=l.a
n=A.u8(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.bX(q,b,s,!0)
o=l.b
if((o&1)!==0){m=A.ua(o)
l.b=0
throw A.b(A.a2(m,a,p+l.c))}return n},
bX(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.e.ac(b+c,2)
r=q.bX(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.bX(a,s,c,d)}return q.fS(a,b,c,d)},
fS(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.as(""),d=b+1,c=a.length
if(!(b>=0&&b<c))return A.d(a,b)
s=a[b]
A:for(r=k.a;;){for(;;d=o){if(!(s>=0&&s<256))return A.d(j,s)
q=j.charCodeAt(s)&31
f=g<=32?s&61694>>>q:(s&63|f<<6)>>>0
p=g+q
if(!(p>=0&&p<144))return A.d(i,p)
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
p=A.a6(a[l])
e.a+=p}else{p=A.pD(a,d,n)
e.a+=p}if(n===a0)break A
d=o}else d=o}if(a1&&g>32)if(r){c=A.a6(h)
e.a+=c}else{k.b=77
k.c=a0
return""}k.b=g
k.c=f
c=e.a
return c.charCodeAt(0)==0?c:c}}
A.m8.prototype={
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
$S:68}
A.nj.prototype={
$2(a,b){var s,r
A.w(a)
if(typeof b=="string")this.a.set(a,b)
else if(b==null)this.a.set(a,"")
else for(s=J.aF(t.R.a(b)),r=this.a;s.p();){b=s.gt(s)
if(typeof b=="string")r.append(a,b)
else if(b==null)r.append(a,"")
else A.ak(b)}},
$S:6}
A.lL.prototype={
$0(){var s=this
return A.bN(A.aX("("+s.a+", "+s.b+", "+s.c+", "+s.d+", "+s.e+", "+s.f+", "+s.r+", "+s.w+")",null))},
$S:69}
A.ag.prototype={
a0(a,b){if(b==null)return!1
return b instanceof A.ag&&this.a===b.a&&this.b===b.b&&this.c===b.c},
gK(a){return A.ok(this.a,this.b,B.r,B.r)},
a1(a,b){var s
t.cs.a(b)
s=B.e.a1(this.a,b.a)
if(s!==0)return s
return B.e.a1(this.b,b.b)},
aa(){var s=this
if(s.c)return s
return new A.ag(s.a,s.b,!0)},
l(a){var s=this,r=A.pa(A.cW(s)),q=A.bw(A.mf(s)),p=A.bw(A.pu(s)),o=A.bw(A.ol(s)),n=A.bw(A.om(s)),m=A.bw(A.pw(s)),l=A.lM(A.pv(s)),k=s.b,j=k===0?"":A.lM(k)
k=r+"-"+q
if(s.c)return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+" "+o+":"+n+":"+m+"."+l+j},
a9(){var s=this,r=A.cW(s)>=-9999&&A.cW(s)<=9999?A.pa(A.cW(s)):A.rW(A.cW(s)),q=A.bw(A.mf(s)),p=A.bw(A.pu(s)),o=A.bw(A.ol(s)),n=A.bw(A.om(s)),m=A.bw(A.pw(s)),l=A.lM(A.pv(s)),k=s.b,j=k===0?"":A.lM(k)
k=r+"-"+q
if(s.c)return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j+"Z"
else return k+"-"+p+"T"+o+":"+n+":"+m+"."+l+j}}
A.lN.prototype={
$1(a){if(a==null)return 0
return A.eM(a)},
$S:35}
A.lO.prototype={
$1(a){var s,r,q
if(a==null)return 0
for(s=a.length,r=0,q=0;q<6;++q){r*=10
if(q<s){if(!(q<s))return A.d(a,q)
r+=a.charCodeAt(q)^48}}return r},
$S:35}
A.aY.prototype={
aG(a,b){return new A.aY(B.e.aE(this.a*b))},
bi(a,b){return B.e.bi(this.a,t.jS.a(b).ghE())},
a0(a,b){if(b==null)return!1
return b instanceof A.aY&&this.a===b.a},
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
gaW(){return A.tg(this)}}
A.eQ.prototype={
l(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.by(s)
return"Assertion failed"}}
A.bD.prototype={}
A.b7.prototype={
gbZ(){return"Invalid argument"+(!this.a?"(s)":"")},
gbY(){return""},
l(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.e(p),n=s.gbZ()+q+o
if(!s.a)return n
return n+s.gbY()+": "+A.by(s.gcs())},
gcs(){return this.b}}
A.cX.prototype={
gcs(){return A.ns(this.b)},
gbZ(){return"RangeError"},
gbY(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.e(q):""
else if(q==null)s=": Not greater than or equal to "+A.e(r)
else if(q>r)s=": Not in inclusive range "+A.e(r)+".."+A.e(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.e(r)
return s}}
A.fe.prototype={
gcs(){return A.L(this.b)},
gbZ(){return"RangeError"},
gbY(){if(A.L(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
gj(a){return this.f}}
A.fB.prototype={
l(a){var s,r,q,p,o,n,m,l,k=this,j={},i=new A.as("")
j.a=""
s=k.c
for(r=s.length,q=0,p="",o="";q<r;++q,o=", "){n=s[q]
i.a=p+o
p=A.by(n)
p=i.a+=p
j.a=", "}k.d.q(0,new A.m8(j,i))
m=A.by(k.a)
l=i.l(0)
return"NoSuchMethodError: method not found: '"+k.b.a+"'\nReceiver: "+m+"\nArguments: ["+l+"]"}}
A.e4.prototype={
l(a){return"Unsupported operation: "+this.a}}
A.fZ.prototype={
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
gaW(){return null},
$ia0:1}
A.dZ.prototype={
l(a){return"Stack Overflow"},
gaW(){return null},
$ia0:1}
A.mK.prototype={
l(a){return"Exception: "+this.a}}
A.bf.prototype={
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
k=""}return g+l+B.a.n(e,i,j)+k+"\n"+B.a.aG(" ",f-i+l.length)+"^\n"}else return f!=null?g+(" (at offset "+A.e(f)+")"):g}}
A.h.prototype={
ar(a,b,c){var s=A.C(this)
return A.t9(this,s.I(c).i("1(h.E)").a(b),s.i("h.E"),c)},
bK(a,b){var s=A.C(this)
return new A.I(this,s.i("F(h.E)").a(b),s.i("I<h.E>"))},
v(a,b){var s
for(s=this.gB(this);s.p();)if(J.j(s.gt(s),b))return!0
return!1},
cl(a,b,c,d){var s,r
d.a(b)
A.C(this).I(d).i("1(1,h.E)").a(c)
for(s=this.gB(this),r=b;s.p();)r=c.$2(r,s.gt(s))
return r},
a6(a,b){var s
A.C(this).i("F(h.E)").a(b)
for(s=this.gB(this);s.p();)if(b.$1(s.gt(s)))return!0
return!1},
aF(a,b){var s=A.a3(this,A.C(this).i("h.E"))
return s},
av(a){return this.aF(0,!0)},
gj(a){var s,r=this.gB(this)
for(s=0;r.p();)++s
return s},
gE(a){return!this.gB(this).p()},
gT(a){return!this.gE(this)},
gaH(a){var s,r=this.gB(this)
if(!r.p())throw A.b(A.dB())
s=r.gt(r)
if(r.p())throw A.b(A.t1())
return s},
u(a,b){var s,r
A.cY(b,"index")
s=this.gB(this)
for(r=b;s.p();){if(r===0)return s.gt(s);--r}throw A.b(A.a8(b,b-r,this,null,"index"))},
l(a){return A.t2(this,"(",")")}}
A.ar.prototype={
l(a){return"MapEntry("+A.e(this.a)+": "+A.e(this.b)+")"}}
A.ad.prototype={
gK(a){return A.H.prototype.gK.call(this,0)},
l(a){return"null"}}
A.H.prototype={$iH:1,
a0(a,b){return this===b},
gK(a){return A.dU(this)},
l(a){return"Instance of '"+A.dV(this)+"'"},
dJ(a,b){throw A.b(A.ps(this,t.bg.a(b)))},
gW(a){return A.vh(this)},
toString(){return this.l(this)}}
A.hW.prototype={
l(a){return""},
$ibl:1}
A.as.prototype={
gj(a){return this.a.length},
l(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$itm:1}
A.mx.prototype={
$2(a,b){var s,r,q,p
t.je.a(a)
A.w(b)
s=B.a.dD(b,"=")
if(s===-1){if(b!=="")J.am(a,A.oC(b,0,b.length,this.a,!0),"")}else if(s!==0){r=B.a.n(b,0,s)
q=B.a.Z(b,s+1)
p=this.a
J.am(a,A.oC(r,0,r.length,p,!0),A.oC(q,0,q.length,p,!0))}return a},
$S:74}
A.mw.prototype={
$2(a,b){throw A.b(A.a2("Illegal IPv6 address, "+a,this.a,b))},
$S:57}
A.eC.prototype={
gde(){var s,r,q,p,o=this,n=o.w
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
gK(a){var s,r=this,q=r.y
if(q===$){s=B.a.gK(r.gde())
r.y!==$&&A.qS()
r.y=s
q=s}return q},
gai(){var s,r=this,q=r.z
if(q===$){s=r.f
s=A.pL(s==null?"":s)
r.z!==$&&A.qS()
q=r.z=new A.c1(s,t.ph)}return q},
gcD(){return this.b},
gbA(a){var s=this.c
if(s==null)return""
if(B.a.N(s,"[")&&!B.a.R(s,"v",1))return B.a.n(s,1,s.length-1)
return s},
gbd(a){var s=this.d
return s==null?A.q4(this.a):s},
gaP(a){var s=this.f
return s==null?"":s},
gby(){var s=this.r
return s==null?"":s},
h7(a){var s=this.a
if(a.length!==s.length)return!1
return A.uj(a,s,0)>=0},
dU(a,b){var s,r,q,p,o,n,m,l=this
b=A.oz(b,0,b.length)
s=b==="file"
r=l.b
q=l.d
if(b!==l.a)q=A.ng(q,b)
p=l.c
if(!(p!=null))p=r.length!==0||q!=null||s?"":null
o=l.e
if(!s)n=p!=null&&o.length!==0
else n=!0
if(n&&!B.a.N(o,"/"))o="/"+o
m=o
return A.eD(b,r,p,q,m,l.f,l.r)},
d4(a,b){var s,r,q,p,o,n,m,l,k
for(s=0,r=0;B.a.R(b,"../",r);){r+=3;++s}q=B.a.h9(a,"/")
p=a.length
for(;;){if(!(q>0&&s>0))break
o=B.a.dH(a,"/",q-1)
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
q=o}return B.a.aD(a,q+1,null,B.a.Z(b,r-3*s))},
dW(a){return this.bf(A.cq(a))},
bf(a){var s,r,q,p,o,n,m,l,k,j,i,h=this
if(a.gaV().length!==0)return a
else{s=h.a
if(a.gcn()){r=a.dU(0,s)
return r}else{q=h.b
p=h.c
o=h.d
n=h.e
if(a.gdC())m=a.gbz()?a.gaP(a):h.f
else{l=A.u7(h,n)
if(l>0){k=B.a.n(n,0,l)
n=a.gcm()?k+A.cz(a.gag(a)):k+A.cz(h.d4(B.a.Z(n,k.length),a.gag(a)))}else if(a.gcm())n=A.cz(a.gag(a))
else if(n.length===0)if(p==null)n=s.length===0?a.gag(a):A.cz(a.gag(a))
else n=A.cz("/"+a.gag(a))
else{j=h.d4(n,a.gag(a))
r=s.length===0
if(!r||p!=null||B.a.N(n,"/"))n=A.cz(j)
else n=A.oB(j,!r||p!=null)}m=a.gbz()?a.gaP(a):null}}}i=a.gcp()?a.gby():null
return A.eD(s,q,p,o,n,m,i)},
gcn(){return this.c!=null},
gbz(){return this.f!=null},
gcp(){return this.r!=null},
gdC(){return this.e.length===0},
gcm(){return B.a.N(this.e,"/")},
gcw(a){var s,r,q=this,p=q.a
if(p==="")throw A.b(A.O("Cannot use origin without a scheme: "+q.l(0)))
if(p!=="http"&&p!=="https")throw A.b(A.O("Origin is only applicable schemes http and https: "+q.l(0)))
s=q.c
if(s==null||s==="")throw A.b(A.O("A "+p+u.p+q.l(0)))
r=q.d
if(r==null)return p+"://"+s
return p+"://"+s+":"+A.e(r)},
l(a){return this.gde()},
a0(a,b){var s,r,q,p=this
if(b==null)return!1
if(p===b)return!0
s=!1
if(t.jJ.b(b))if(p.a===b.gaV())if(p.c!=null===b.gcn())if(p.b===b.gcD())if(p.gbA(0)===b.gbA(b))if(p.gbd(0)===b.gbd(b))if(p.e===b.gag(b)){r=p.f
q=r==null
if(!q===b.gbz()){if(q)r=""
if(r===b.gaP(b)){r=p.r
q=r==null
if(!q===b.gcp()){s=q?"":r
s=s===b.gby()}}}}return s},
$ih0:1,
gaV(){return this.a},
gag(a){return this.e}}
A.ni.prototype={
$2(a,b){var s=this.b,r=this.a
s.a+=r.a
r.a="&"
r=A.qf(1,a,B.l,!0)
r=s.a+=r
if(b!=null&&b.length!==0){s.a=r+"="
r=A.qf(1,b,B.l,!0)
s.a+=r}},
$S:46}
A.nh.prototype={
$2(a,b){var s,r
A.w(a)
if(b==null||typeof b=="string")this.a.$2(a,A.ak(b))
else for(s=J.aF(t.R.a(b)),r=this.a;s.p();)r.$2(a,A.w(s.gt(s)))},
$S:6}
A.mv.prototype={
ge6(){var s,r,q,p,o=this,n=null,m=o.c
if(m==null){m=o.b
if(0>=m.length)return A.d(m,0)
s=o.a
m=m[0]+1
r=B.a.bB(s,"?",m)
q=s.length
if(r>=0){p=A.eE(s,r+1,q,256,!1,!1)
q=r}else p=n
m=o.c=new A.hg("data","",n,n,A.eE(s,m,q,128,!1,!1),p,n)}return m},
l(a){var s,r=this.b
if(0>=r.length)return A.d(r,0)
s=this.a
return r[0]===-1?"data:"+s:s}}
A.ba.prototype={
gcn(){return this.c>0},
gcq(){return this.c>0&&this.d+1<this.e},
gbz(){return this.f<this.r},
gcp(){return this.r<this.a.length},
gcm(){return B.a.R(this.a,"/",this.e)},
gdC(){return this.e===this.f},
gaV(){var s=this.w
return s==null?this.w=this.eY():s},
eY(){var s,r=this,q=r.b
if(q<=0)return""
s=q===4
if(s&&B.a.N(r.a,"http"))return"http"
if(q===5&&B.a.N(r.a,"https"))return"https"
if(s&&B.a.N(r.a,"file"))return"file"
if(q===7&&B.a.N(r.a,"package"))return"package"
return B.a.n(r.a,0,q)},
gcD(){var s=this.c,r=this.b+3
return s>r?B.a.n(this.a,r,s-1):""},
gbA(a){var s=this.c
return s>0?B.a.n(this.a,s,this.d):""},
gbd(a){var s,r=this
if(r.gcq())return A.eM(B.a.n(r.a,r.d+1,r.e))
s=r.b
if(s===4&&B.a.N(r.a,"http"))return 80
if(s===5&&B.a.N(r.a,"https"))return 443
return 0},
gag(a){return B.a.n(this.a,this.e,this.f)},
gaP(a){var s=this.f,r=this.r
return s<r?B.a.n(this.a,s+1,r):""},
gby(){var s=this.r,r=this.a
return s<r.length?B.a.Z(r,s+1):""},
gcw(a){var s,r,q=this,p=q.b,o=p===4&&B.a.N(q.a,"http")
if(p<0)throw A.b(A.O("Cannot use origin without a scheme: "+q.l(0)))
if(!o)s=!(p===5&&B.a.N(q.a,"https"))
else s=!1
if(s)throw A.b(A.O("Origin is only applicable to schemes http and https: "+q.l(0)))
s=q.c
if(s===q.d)throw A.b(A.O("A "+q.gaV()+u.p+q.l(0)))
p+=3
if(s===p)return B.a.n(q.a,0,q.e)
r=q.a
return B.a.n(r,0,p)+B.a.n(r,s,q.e)},
gai(){if(this.f>=this.r)return B.an
return new A.c1(A.pL(this.gaP(0)),t.ph)},
d2(a){var s=this.d+1
return s+a.length===this.e&&B.a.R(this.a,a,s)},
ho(){var s=this,r=s.r,q=s.a
if(r>=q.length)return s
return new A.ba(B.a.n(q,0,r),s.b,s.c,s.d,s.e,s.f,r,s.w)},
dU(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=null
b=A.oz(b,0,b.length)
s=!(h.b===b.length&&B.a.N(h.a,b))
r=b==="file"
q=h.c
p=q>0?B.a.n(h.a,h.b+3,q):""
o=h.gcq()?h.gbd(0):g
if(s)o=A.ng(o,b)
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
dW(a){return this.bf(A.cq(a))},
bf(a){if(a instanceof A.ba)return this.fs(this,a)
return this.dh().bf(a)},
fs(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=b.b
if(c>0)return b
s=b.c
if(s>0){r=a.b
if(r<=0)return b
q=r===4
if(q&&B.a.N(a.a,"file"))p=b.e!==b.f
else if(q&&B.a.N(a.a,"http"))p=!b.d2("80")
else p=!(r===5&&B.a.N(a.a,"https"))||!b.d2("443")
if(p){o=r+1
return new A.ba(B.a.n(a.a,0,o)+B.a.Z(b.a,c+1),r,s+o,b.d+o,b.e+o,b.f+o,b.r+o,a.w)}else return this.dh().bf(b)}n=b.e
c=b.f
if(n===c){s=b.r
if(c<s){r=a.f
o=r-c
return new A.ba(B.a.n(a.a,0,r)+B.a.Z(b.a,c),a.b,a.c,a.d,a.e,c+o,s+o,a.w)}c=b.a
if(s<c.length){r=a.r
return new A.ba(B.a.n(a.a,0,r)+B.a.Z(c,s),a.b,a.c,a.d,a.e,a.f,s+(r-s),a.w)}return a.ho()}s=b.a
if(B.a.R(s,"/",n)){m=a.e
l=A.pX(this)
k=l>0?l:m
o=k-n
return new A.ba(B.a.n(a.a,0,k)+B.a.Z(s,n),a.b,a.c,a.d,m,c+o,b.r+o,a.w)}j=a.e
i=a.f
if(j===i&&a.c>0){while(B.a.R(s,"../",n))n+=3
o=j-n+1
return new A.ba(B.a.n(a.a,0,j)+"/"+B.a.Z(s,n),a.b,a.c,a.d,j,c+o,b.r+o,a.w)}h=a.a
l=A.pX(this)
if(l>=0)g=l
else for(g=j;B.a.R(h,"../",g);)g+=3
f=0
for(;;){e=n+3
if(!(e<=c&&B.a.R(s,"../",n)))break;++f
n=e}for(r=h.length,d="";i>g;){--i
if(!(i>=0&&i<r))return A.d(h,i)
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
dh(){var s=this,r=null,q=s.gaV(),p=s.gcD(),o=s.c>0?s.gbA(0):r,n=s.gcq()?s.gbd(0):r,m=s.a,l=s.f,k=B.a.n(m,s.e,l),j=s.r
l=l<j?s.gaP(0):r
return A.eD(q,p,o,n,k,l,j<m.length?s.gby():r)},
l(a){return this.a},
$ih0:1}
A.hg.prototype={}
A.r.prototype={$ir:1}
A.eO.prototype={
gj(a){return a.length}}
A.cJ.prototype={
sh_(a,b){a.href=b},
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
A.ca.prototype={$ica:1}
A.bQ.prototype={$ibQ:1}
A.bp.prototype={
gj(a){return a.length}}
A.f3.prototype={
gj(a){return a.length}}
A.Y.prototype={$iY:1}
A.cc.prototype={
bR(a,b){var s=$.qV(),r=s[b]
if(typeof r=="string")return r
r=this.fv(a,b)
s[b]=r
return r},
fv(a,b){var s,r=b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()})
r.toString
r=r in a
r.toString
if(r)return b
s=$.qY()+b
r=s in a
r.toString
if(r)return s
return b},
cb(a,b,c,d){a.setProperty(b,c,d)},
gj(a){var s=a.length
s.toString
return s}}
A.kO.prototype={}
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
A.cd.prototype={}
A.f7.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.dq.prototype={
fQ(a,b){var s=a.createHTMLDocument(b)
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
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
return"Rectangle ("+A.e(r)+", "+A.e(s)+") "+A.e(this.gaS(a))+" x "+A.e(this.gaN(a))},
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
s=this.gaS(a)===s.gaS(b)&&this.gaN(a)===s.gaN(b)}}}return s},
gK(a){var s,r=a.left
r.toString
s=a.top
s.toString
return A.ok(r,s,this.gaS(a),this.gaN(a))},
gd1(a){return a.height},
gaN(a){var s=this.gd1(a)
s.toString
return s},
gdn(a){return a.width},
gaS(a){var s=this.gdn(a)
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
k(a,b,c){A.w(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
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
A.f9.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.ha.prototype={
v(a,b){return J.o3(this.b,b)},
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
gB(a){var s=this.av(this)
return new J.bd(s,s.length,A.D(s).i("bd<1>"))},
X(a){J.ir(this.a)},
gD(a){return A.tA(this.a)}}
A.bm.prototype={
gj(a){return this.a.length},
h(a,b){var s
A.L(b)
s=this.a
if(!(b>=0&&b<s.length))return A.d(s,b)
return this.$ti.c.a(s[b])},
k(a,b,c){this.$ti.c.a(c)
throw A.b(A.P("Cannot modify list"))},
gD(a){return this.$ti.c.a(B.ap.gD(this.a))}}
A.E.prototype={
gfI(a){return new A.ee(a)},
gbu(a){var s=a.children
s.toString
return new A.ha(a,s)},
gap(a){return new A.hl(a)},
l(a){var s=a.localName
s.toString
return s},
a7(a,b,c,d){var s,r,q,p
if(c==null){s=$.pe
if(s==null){s=A.B([],t.lN)
r=new A.dR(s)
B.b.m(s,A.pR(null))
B.b.m(s,A.q_())
$.pe=r
d=r}else d=s
s=$.pd
if(s==null){d.toString
s=new A.eF(d)
$.pd=s
c=s}else{d.toString
s.a=d
c=s}}if($.bS==null){s=document
r=s.implementation
r.toString
r=B.a6.fQ(r,"")
$.bS=r
r=r.createRange()
r.toString
$.oa=r
r=$.bS.createElement("base")
t.az.a(r)
s=s.baseURI
s.toString
r.href=s
$.bS.head.appendChild(r).toString}s=$.bS
if(s.body==null){r=s.createElement("body")
B.I.sfK(s,t.hp.a(r))}s=$.bS
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
s=!B.b.v(B.ak,s)}else s=!1
if(s){$.oa.selectNodeContents(q)
s=$.oa
s=s.createContextualFragment(b)
s.toString
p=s}else{J.rJ(q,b)
s=$.bS.createDocumentFragment()
s.toString
while(r=q.firstChild,r!=null)s.appendChild(r).toString
p=s}if(q!==$.bS.body)J.iv(q)
c.cJ(p)
document.adoptNode(p).toString
return p},
fP(a,b,c){return this.a7(a,b,c,null)},
sU(a,b){this.bN(a,b)},
bN(a,b){this.sP(a,null)
a.appendChild(this.a7(a,b,null,null)).toString},
shw(a,b){a.title=b},
dB(a){return a.focus()},
sf6(a,b){a.innerHTML=b},
fd(a,b){var s=a.querySelectorAll(b)
s.toString
return s},
gdM(a){return new A.aW(a,"change",!1,t.E)},
gaO(a){return new A.aW(a,"click",!1,t.C)},
gdN(a){return new A.aW(a,"input",!1,t.E)},
gdO(a){return new A.aW(a,"keydown",!1,t.kN)},
$iE:1}
A.lP.prototype={
$1(a){return t.h.b(t.F.a(a))},
$S:26}
A.o.prototype={
ge_(a){return A.oD(a.target)},
f4(a,b,c,d){return a.initEvent(b,!0,!0)},
$io:1}
A.du.prototype={$idu:1}
A.f.prototype={
bs(a,b,c,d){t.B.a(c)
if(c!=null)this.eO(a,b,c,d)},
ce(a,b,c){return this.bs(a,b,c,null)},
eO(a,b,c,d){return a.addEventListener(b,A.bK(t.B.a(c),1),d)},
ff(a,b,c,d){return a.removeEventListener(b,A.bK(t.B.a(c),1),!1)},
$if:1}
A.aL.prototype={$iaL:1}
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.dx.prototype={
ght(a){var s=a.result
if(t.lo.b(s))return A.pr(s,0,null)
return s},
hl(a,b){return a.readAsDataURL(b)}}
A.fb.prototype={
gj(a){return a.length}}
A.cf.prototype={
gj(a){return a.length},
$icf:1}
A.aM.prototype={$iaM:1}
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1,
$ibT:1}
A.dz.prototype={
sfK(a,b){a.body=b}}
A.bz.prototype={
hh(a,b,c){return a.open(b,c)},
eo(a,b){return a.send(b)},
cL(a,b,c){return a.setRequestHeader(A.w(b),A.w(c))},
$ibz:1}
A.ch.prototype={}
A.cN.prototype={$icN:1}
A.dA.prototype={
sfE(a,b){a.alt=b},
scP(a,b){a.src=b}}
A.bU.prototype={
sdv(a,b){a.checked=b},
sfU(a,b){a.disabled=b},
sbg(a,b){a.type=b},
sL(a,b){a.value=b},
$ibU:1,
$ip7:1,
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
bs(a,b,c,d){t.B.a(c)
if(b==="message")a.start()
this.eu(a,b,c,!1)}}
A.fr.prototype={
M(a,b){return A.bc(a.get(b))!=null},
h(a,b){return A.bc(a.get(A.w(b)))},
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
gH(a){var s=A.B([],t.s)
this.q(a,new A.m6(s))
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
A.m6.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:6}
A.fs.prototype={
M(a,b){return A.bc(a.get(b))!=null},
h(a,b){return A.bc(a.get(A.w(b)))},
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
gH(a){var s=A.B([],t.s)
this.q(a,new A.m7(s))
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
A.m7.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:6}
A.aO.prototype={$iaO:1}
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.aA.prototype={$iaA:1}
A.aD.prototype={
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
if(!(b>=0&&b<r.length))return A.d(r,b)
s.replaceChild(c,r[b]).toString},
gB(a){var s=this.a.childNodes
return new A.ce(s,s.length,A.ax(s).i("ce<A.E>"))},
gj(a){return this.a.childNodes.length},
h(a,b){var s
A.L(b)
s=this.a.childNodes
if(!(b>=0&&b<s.length))return A.d(s,b)
return s[b]}}
A.v.prototype={
dR(a){var s=a.parentNode
if(s!=null)s.removeChild(a).toString},
dV(a,b){var s,r,q
try{r=a.parentNode
r.toString
s=r
J.rp(s,b,a)}catch(q){}return a},
eU(a){var s
while(s=a.firstChild,s!=null)a.removeChild(s).toString},
l(a){var s=a.nodeValue
return s==null?this.ev(a):s},
sP(a,b){a.textContent=b},
fH(a,b){var s=a.appendChild(b)
s.toString
return s},
fN(a,b){var s=a.cloneNode(!0)
s.toString
return s},
v(a,b){var s=a.contains(b)
s.toString
return s},
fh(a,b,c){var s=a.replaceChild(b,c)
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.bC.prototype={$ibC:1}
A.dT.prototype={}
A.aP.prototype={
gj(a){return a.length},
$iaP:1}
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.b8.prototype={$ib8:1}
A.fI.prototype={
M(a,b){return A.bc(a.get(b))!=null},
h(a,b){return A.bc(a.get(A.w(b)))},
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
gH(a){var s=A.B([],t.s)
this.q(a,new A.mg(s))
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
A.mg.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:6}
A.bY.prototype={
gj(a){return a.length},
sL(a,b){a.value=b},
$ibY:1}
A.aR.prototype={$iaR:1}
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.dY.prototype={}
A.aS.prototype={$iaS:1}
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.aT.prototype={
gj(a){return a.length},
$iaT:1}
A.e_.prototype={
M(a,b){return a.getItem(b)!=null},
h(a,b){return a.getItem(A.w(b))},
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
gH(a){var s=A.B([],t.s)
this.q(a,new A.mi(s))
return s},
gj(a){var s=a.length
s.toString
return s},
gE(a){return a.key(0)==null},
gT(a){return a.key(0)!=null},
$it:1}
A.mi.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:7}
A.aB.prototype={$iaB:1}
A.e2.prototype={
a7(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bP(a,b,c,d)
s=A.rZ("<table>"+b+"</table>",c,d)
r=document.createDocumentFragment()
r.toString
new A.aD(r).S(0,new A.aD(s))
return r}}
A.fO.prototype={
a7(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bP(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.aD(s).S(0,new A.aD(new A.aD(new A.aD(B.R.a7(r,b,c,d)).gaH(0)).gaH(0)))
return s}}
A.fP.prototype={
a7(a,b,c,d){var s,r="createContextualFragment" in window.Range.prototype
r.toString
if(r)return this.bP(a,b,c,d)
r=document
s=r.createDocumentFragment()
s.toString
r=r.createElement("table")
r.toString
new A.aD(s).S(0,new A.aD(new A.aD(B.R.a7(r,b,c,d)).gaH(0)))
return s}}
A.d1.prototype={
bN(a,b){var s,r
this.sP(a,null)
s=a.content
s.toString
J.ir(s)
r=this.a7(a,b,null,null)
a.content.appendChild(r).toString},
$id1:1}
A.cp.prototype={
sL(a,b){a.value=b},
$icp:1}
A.aU.prototype={$iaU:1}
A.aC.prototype={$iaC:1}
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.fT.prototype={
gj(a){var s=a.length
s.toString
return s}}
A.aV.prototype={$iaV:1}
A.fW.prototype={
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.fX.prototype={
gj(a){return a.length}}
A.bs.prototype={}
A.h2.prototype={
l(a){var s=String(a)
s.toString
return s}}
A.h5.prototype={
gj(a){return a.length}}
A.c2.prototype={$ic2:1,$imA:1}
A.bt.prototype={$ibt:1}
A.d4.prototype={$id4:1}
A.hc.prototype={
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
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
q=J.J(b)
if(r===q.gaS(b)){s=a.height
s.toString
q=s===q.gaN(b)
s=q}}}}return s},
gK(a){var s,r,q,p=a.left
p.toString
s=a.top
s.toString
r=a.width
r.toString
q=a.height
q.toString
return A.ok(p,s,r,q)},
gd1(a){return a.height},
gaN(a){var s=a.height
s.toString
return s},
gdn(a){return a.width},
gaS(a){var s=a.width
s.toString
return s}}
A.hq.prototype={
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.hR.prototype={
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.hX.prototype={
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
u(a,b){if(!(b>=0&&b<a.length))return A.d(a,b)
return a[b]},
$in:1,
$iN:1,
$ih:1,
$ip:1}
A.h8.prototype={
q(a,b){var s,r,q,p,o,n
t.bm.a(b)
for(s=this.gH(0),r=s.length,q=this.a,p=0;p<s.length;s.length===r||(0,A.at)(s),++p){o=s[p]
n=q.getAttribute(o)
b.$2(o,n==null?A.w(n):n)}},
gH(a){var s,r,q,p,o,n,m=this.a.attributes
m.toString
s=A.B([],t.s)
for(r=m.length,q=t.nD,p=0;p<r;++p){if(!(p<m.length))return A.d(m,p)
o=q.a(m[p])
if(o.namespaceURI==null){n=o.name
n.toString
B.b.m(s,n)}}return s},
gE(a){return this.gH(0).length===0},
gT(a){return this.gH(0).length!==0}}
A.ee.prototype={
M(a,b){var s=this.a.hasAttribute(b)
s.toString
return s},
h(a,b){return this.a.getAttribute(A.w(b))},
k(a,b,c){this.a.setAttribute(b,c)},
C(a,b){var s,r
if(typeof b=="string"){s=this.a
r=s.getAttribute(b)
s.removeAttribute(b)
s=r}else s=null
return s},
gj(a){return this.gH(0).length}}
A.hf.prototype={
M(a,b){var s=this.a.a.hasAttribute("data-"+this.b5(b))
s.toString
return s},
h(a,b){return this.a.a.getAttribute("data-"+this.b5(A.w(b)))},
k(a,b,c){this.a.a.setAttribute("data-"+this.b5(b),c)},
C(a,b){var s="data-"+this.b5(b),r=this.a.a,q=r.getAttribute(s)
r.removeAttribute(s)
return q},
q(a,b){this.a.q(0,new A.mG(this,t.bm.a(b)))},
gH(a){var s=A.B([],t.s)
this.a.q(0,new A.mH(this,s))
return s},
gj(a){return this.gH(0).length},
gE(a){return this.gH(0).length===0},
gT(a){return this.gH(0).length!==0},
dg(a){var s,r,q=A.B(a.split("-"),t.s)
for(s=1;s<q.length;++s){r=q[s]
if(r.length>0)B.b.k(q,s,r[0].toUpperCase()+B.a.Z(r,1))}return B.b.a_(q,"")},
b5(a){var s,r,q,p,o
for(s=a.length,r=0,q="";r<s;++r){p=a[r]
o=p.toLowerCase()
q=(p!==o&&r>0?q+"-":q)+o}return q.charCodeAt(0)==0?q:q}}
A.mG.prototype={
$2(a,b){if(B.a.N(a,"data-"))this.b.$2(this.a.dg(B.a.Z(a,5)),b)},
$S:7}
A.mH.prototype={
$2(a,b){if(B.a.N(a,"data-"))B.b.m(this.b,this.a.dg(B.a.Z(a,5)))},
$S:7}
A.hl.prototype={
a8(){var s,r,q,p,o=A.cl(t.N)
for(s=this.a.className.split(" "),r=s.length,q=0;q<r;++q){p=B.a.A(s[q])
if(p.length!==0)o.m(0,p)}return o},
cE(a){this.a.className=t.i.a(a).a_(0," ")},
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
A.w(b)
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
bF(a){A.tC(this.a,a)}}
A.ob.prototype={}
A.cs.prototype={
bD(a,b,c,d){var s=A.C(this)
s.i("~(1)?").a(a)
t.jE.a(c)
return A.y(this.a,this.b,a,!1,s.c)}}
A.aW.prototype={}
A.ef.prototype={
a3(a){var s=this
if(s.b==null)return $.o1()
s.dk()
s.d=s.b=null
return $.o1()},
cu(a){var s,r=this
r.$ti.i("~(1)?").a(a)
if(r.b==null)throw A.b(A.O("Subscription has been canceled."))
r.dk()
s=A.qE(new A.mJ(a),t.A)
r.d=s
r.di()},
di(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.rq(s,this.c,r,!1)}},
dk(){var s,r=this.d
if(r!=null){s=this.b
s.toString
J.ro(s,this.c,t.B.a(r),!1)}},
$ibr:1}
A.mI.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:3}
A.mJ.prototype={
$1(a){return this.a.$1(t.A.a(a))},
$S:3}
A.os.prototype={}
A.cu.prototype={
eE(a){var s
if($.hr.a===0){for(s=0;s<262;++s)$.hr.k(0,B.al[s],A.vj())
for(s=0;s<12;++s)$.hr.k(0,B.x[s],A.vk())}},
aL(a){return $.rd().v(0,A.dt(a))},
an(a,b,c){var s=$.hr.h(0,A.dt(a)+"::"+b)
if(s==null)s=$.hr.h(0,"*::"+b)
if(s==null)return!1
return A.nq(s.$4(a,b,c,this))},
$ibi:1}
A.A.prototype={
gB(a){return new A.ce(a,this.gj(a),A.ax(a).i("ce<A.E>"))}}
A.dR.prototype={
aL(a){return B.b.a6(this.a,new A.ma(a))},
an(a,b,c){return B.b.a6(this.a,new A.m9(a,b,c))},
$ibi:1}
A.ma.prototype={
$1(a){return t.hU.a(a).aL(this.a)},
$S:24}
A.m9.prototype={
$1(a){return t.hU.a(a).an(this.a,this.b,this.c)},
$S:24}
A.er.prototype={
eG(a,b,c,d){var s,r,q
this.a.S(0,c)
s=b.bK(0,new A.n8())
r=b.bK(0,new A.n9())
this.b.S(0,s)
q=this.c
q.S(0,B.aj)
q.S(0,r)},
aL(a){return this.a.v(0,A.dt(a))},
an(a,b,c){var s,r=this,q=A.dt(a),p=r.c,o=q+"::"+b
if(p.v(0,o))return r.d.fD(c)
else{s="*::"+b
if(p.v(0,s))return r.d.fD(c)
else{p=r.b
if(p.v(0,o))return!0
else if(p.v(0,s))return!0
else if(p.v(0,q+"::*"))return!0
else if(p.v(0,"*::*"))return!0}}return!1},
$ibi:1}
A.n8.prototype={
$1(a){return!B.b.v(B.x,A.w(a))},
$S:10}
A.n9.prototype={
$1(a){return B.b.v(B.x,A.w(a))},
$S:10}
A.hZ.prototype={
an(a,b,c){if(this.eC(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.v(0,b)
return!1}}
A.na.prototype={
$1(a){return"TEMPLATE::"+A.w(a)},
$S:11}
A.hY.prototype={
aL(a){var s
if(t.nZ.b(a))return!1
s=t.bC.b(a)
if(s&&A.dt(a)==="foreignObject")return!1
if(s)return!0
return!1},
an(a,b,c){if(b==="is"||B.a.N(b,"on"))return!1
return this.aL(a)},
$ibi:1}
A.ce.prototype={
p(){var s=this,r=s.c+1,q=s.b
if(r<q){s.d=J.i(s.a,r)
s.c=r
return!0}s.d=null
s.c=q
return!1},
gt(a){var s=this.d
return s==null?this.$ti.c.a(s):s},
$iac:1}
A.he.prototype={$ik:1,$if:1,$imA:1}
A.hO.prototype={$ito:1}
A.eF.prototype={
cJ(a){var s,r=new A.np(this)
do{s=this.b
r.$2(a,null)}while(s!==this.b)},
b2(a,b){++this.b
if(b==null||b!==a.parentNode)J.iv(a)
else b.removeChild(a).toString},
fm(a,b){var s,r,q,p,o,n,m,l=!0,k=null,j=null
try{k=J.ru(a)
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
this.fl(a,b,l,r,q,t.f.a(k),A.ak(j))}catch(n){if(A.aq(n) instanceof A.b7)throw n
else{this.b2(a,b)
window.toString
p=A.e(r)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn("Removing corrupted element "+p)}}},
fl(a,b,c,d,e,f,g){var s,r,q,p,o,n,m,l=this
if(c){l.b2(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing element due to corrupted attributes on <"+d+">")
return}if(!l.a.aL(a)){l.b2(a,b)
window.toString
s=A.e(b)
r=typeof console!="undefined"
r.toString
if(r)window.console.warn("Removing disallowed element <"+e+"> from "+s)
return}if(g!=null)if(!l.a.an(a,"is",g)){l.b2(a,b)
window.toString
s=typeof console!="undefined"
s.toString
if(s)window.console.warn("Removing disallowed type extension <"+e+' is="'+g+'">')
return}s=f.gH(0)
q=A.B(s.slice(0),A.D(s))
for(p=f.gH(0).length-1,s=f.a,r="Removing disallowed attribute <"+e+" ";p>=0;--p){if(!(p<q.length))return A.d(q,p)
o=q[p]
n=l.a
m=J.rM(o)
A.w(o)
if(!n.an(a,m,A.w(s.getAttribute(o)))){window.toString
n=s.getAttribute(o)
m=typeof console!="undefined"
m.toString
if(m)window.console.warn(r+o+'="'+A.e(n)+'">')
s.removeAttribute(o)}}if(t.fD.b(a)){s=a.content
s.toString
l.cJ(s)}},
en(a,b){var s=a.nodeType
s.toString
switch(s){case 1:this.fm(a,b)
break
case 8:case 11:case 3:case 4:break
default:this.b2(a,b)}},
$itb:1}
A.np.prototype={
$2(a,b){var s,r,q,p,o,n=this.a
n.en(a,b)
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
$S:56}
A.hd.prototype={}
A.hh.prototype={}
A.hi.prototype={}
A.hj.prototype={}
A.hk.prototype={}
A.hn.prototype={}
A.ho.prototype={}
A.hs.prototype={}
A.ht.prototype={}
A.hA.prototype={}
A.hB.prototype={}
A.hC.prototype={}
A.hD.prototype={}
A.hE.prototype={}
A.hF.prototype={}
A.hJ.prototype={}
A.hK.prototype={}
A.hM.prototype={}
A.es.prototype={}
A.et.prototype={}
A.hP.prototype={}
A.hQ.prototype={}
A.hS.prototype={}
A.i_.prototype={}
A.i0.prototype={}
A.ew.prototype={}
A.ex.prototype={}
A.i1.prototype={}
A.i2.prototype={}
A.i6.prototype={}
A.i7.prototype={}
A.i8.prototype={}
A.i9.prototype={}
A.ia.prototype={}
A.ib.prototype={}
A.ic.prototype={}
A.id.prototype={}
A.ie.prototype={}
A.ig.prototype={}
A.f2.prototype={
cc(a){var s=$.qU()
if(s.b.test(a))return a
throw A.b(A.kI(a,"value","Not a valid class token"))},
l(a){return this.a8().a_(0," ")},
gB(a){var s=this.a8()
return A.tH(s,s.r,A.C(s).c)},
ar(a,b,c){var s,r
c.i("0(c)").a(b)
s=this.a8()
r=A.C(s)
return new A.bx(s,r.I(c).i("1(av.E)").a(b),r.i("@<av.E>").I(c).i("bx<1,2>"))},
gE(a){return this.a8().a===0},
gT(a){return this.a8().a!==0},
gj(a){return this.a8().a},
v(a,b){this.cc(b)
return this.a8().v(0,b)},
m(a,b){var s
A.w(b)
this.cc(b)
s=this.dI(0,new A.kM(b))
return A.nq(s==null?!1:s)},
C(a,b){var s,r
if(typeof b!="string")return!1
this.cc(b)
s=this.a8()
r=s.C(0,b)
this.cE(s)
return r},
bF(a){this.dI(0,new A.kN(a))},
u(a,b){return this.a8().u(0,b)},
dI(a,b){var s,r
t.gA.a(b)
s=this.a8()
r=b.$1(s)
this.cE(s)
return r}}
A.kM.prototype={
$1(a){return t.i.a(a).m(0,this.a)},
$S:55}
A.kN.prototype={
$1(a){return t.i.a(a).bF(this.a)},
$S:52}
A.fc.prototype={
gbm(){var s=this.b,r=A.C(s)
return new A.aJ(new A.I(s,r.i("F(m.E)").a(new A.lQ()),r.i("I<m.E>")),r.i("E(m.E)").a(new A.lR()),r.i("aJ<m.E,E>"))},
k(a,b,c){var s
t.h.a(c)
s=this.gbm()
J.rH(s.b.$1(J.eN(s.a,b)),c)},
v(a,b){return!1},
X(a){J.ir(this.b.a)},
gj(a){return J.an(this.gbm().a)},
h(a,b){var s
A.L(b)
s=this.gbm()
return s.b.$1(J.eN(s.a,b))},
gB(a){var s=A.aN(this.gbm(),!1,t.h)
return new J.bd(s,s.length,A.D(s).i("bd<1>"))}}
A.lQ.prototype={
$1(a){return t.h.b(t.F.a(a))},
$S:26}
A.lR.prototype={
$1(a){return t.h.a(t.F.a(a))},
$S:47}
A.cS.prototype={$icS:1}
A.h4.prototype={
ge_(a){var s=a.target
s.toString
return s}}
A.m_.prototype={
$1(a){var s,r,q,p,o=this.a
if(o.M(0,a))return o.h(0,a)
if(t.f.b(a)){s={}
o.k(0,a,s)
for(o=J.J(a),r=J.aF(o.gH(a));r.p();){q=r.gt(r)
s[q]=this.$1(o.h(a,q))}return s}else if(t.R.b(a)){p=[]
o.k(0,a,p)
B.b.S(p,J.c9(a,this,t.z))
return p}else return A.nx(a)},
$S:45}
A.hN.prototype={
e3(a){if(a instanceof A.aZ)return a.fk()
return null}}
A.ny.prototype={
$1(a){var s
t.Z.a(a)
s=function(b,c,d){return function(){return b(c,d,this,Array.prototype.slice.apply(arguments))}}(A.ug,a,!1)
A.oF(s,$.iq(),a)
return s},
$S:13}
A.nz.prototype={
$1(a){return new this.a(a)},
$S:13}
A.nE.prototype={
$1(a){var s=a==null?A.b4(a):a
$.o0()
return new A.cR(s)},
$S:42}
A.nF.prototype={
$1(a){var s=a==null?A.b4(a):a
$.o0()
return new A.cj(s,t.gq)},
$S:38}
A.nG.prototype={
$1(a){var s=a==null?A.b4(a):a
$.o0()
return new A.aZ(s)},
$S:37}
A.aZ.prototype={
h(a,b){if(typeof b!="string"&&typeof b!="number")throw A.b(A.aX("property is not a String or num",null))
return A.oE(this.a[b])},
k(a,b,c){if(typeof b!="string"&&typeof b!="number")throw A.b(A.aX("property is not a String or num",null))
this.a[b]=A.nx(c)},
a0(a,b){if(b==null)return!1
return b instanceof A.aZ&&this.a===b.a},
ba(a){return a in this.a},
ao(a,b){var s,r=this.a
if(b==null)s=null
else{s=A.D(b)
s=A.aN(new A.a1(b,s.i("@(1)").a(A.vs()),s.i("a1<1,@>")),!0,t.z)}return A.oE(r[a].apply(r,s))},
l(a){var s,r
try{s=String(this.a)
return s}catch(r){s=this.eA(0)
return s}},
fk(){var s=this.c9(),r=s!=null&&s.length>0?" ("+s+")":""
return"Instance of '"+A.dV(this)+"'"+r},
c9(){return A.oS(this.a,!1,!1)},
gK(a){return 0}}
A.cR.prototype={
c9(){return A.oS(this.a,!1,!0)}}
A.cj.prototype={
cV(a){var s=a<0||a>=this.gj(0)
if(s)throw A.b(A.ah(a,0,this.gj(0),null,null))},
h(a,b){if(A.eI(b))this.cV(b)
return this.$ti.c.a(this.ew(0,b))},
k(a,b,c){if(A.eI(b))this.cV(b)
this.eB(0,b,c)},
gj(a){var s=this.a.length
if(typeof s==="number"&&s>>>0===s)return s
throw A.b(A.O("Bad JsArray length"))},
c9(){return A.oS(this.a,!0,!1)},
$in:1,
$ih:1,
$ip:1}
A.d8.prototype={
k(a,b,c){return this.ex(0,b,c)}}
A.mb.prototype={
l(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.nO.prototype={
$1(a){var s,r,q,p,o
if(A.qv(a))return a
s=this.a
if(s.M(0,a))return s.h(0,a)
if(t.f.b(a)){r={}
s.k(0,a,r)
for(s=J.J(a),q=J.aF(s.gH(a));q.p();){p=q.gt(q)
r[p]=this.$1(s.h(a,p))}return r}else if(t.R.b(a)){o=[]
s.k(0,a,o)
B.b.S(o,J.c9(a,this,t.z))
return o}else return a},
$S:36}
A.nV.prototype={
$1(a){return this.a.b7(0,this.b.i("0/?").a(a))},
$S:15}
A.nW.prototype={
$1(a){if(a==null)return this.a.bw(new A.mb(a===undefined))
return this.a.bw(a)},
$S:15}
A.mZ.prototype={
eF(){var s=self.crypto
if(s!=null)if(s.getRandomValues!=null)return
throw A.b(A.P("No source of cryptographically secure random numbers available."))},
hf(a){var s,r,q,p,o,n,m,l
if(a<=0||a>4294967296)throw A.b(A.tj("max must be in range 0 < max \u2264 2^32, was "+a))
if(a>255)if(a>65535)s=a>16777215?4:3
else s=2
else s=1
r=this.a
r.$flags&2&&A.al(r,11)
r.setUint32(0,0,!1)
q=4-s
p=A.L(Math.pow(256,s))
for(o=a-1,n=(a&o)===0;;){crypto.getRandomValues(J.rs(B.ao.gfL(r),q,s))
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
u(a,b){return this.h(a,b)},
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
u(a,b){return this.h(a,b)},
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
k(a,b,c){A.w(c)
throw A.b(A.P("Cannot assign element of immutable List."))},
gD(a){var s=a.length
s.toString
if(s>0){s=a[0]
s.toString
return s}throw A.b(A.O("No elements"))},
u(a,b){return this.h(a,b)},
$in:1,
$ih:1,
$ip:1}
A.eS.prototype={
a8(){var s,r,q,p,o=this.a.getAttribute("class"),n=A.cl(t.N)
if(o==null)return n
for(s=o.split(" "),r=s.length,q=0;q<r;++q){p=B.a.A(s[q])
if(p.length!==0)n.m(0,p)}return n},
cE(a){this.a.setAttribute("class",a.a_(0," "))}}
A.u.prototype={
gap(a){return new A.eS(a)},
gbu(a){return new A.fc(a,new A.aD(a))},
sU(a,b){this.bN(a,b)},
a7(a,b,c,d){var s,r,q,p=A.B([],t.lN)
B.b.m(p,A.pR(null))
B.b.m(p,A.q_())
B.b.m(p,new A.hY())
c=new A.eF(new A.dR(p))
p=document
s=p.body
s.toString
r=B.A.fP(s,'<svg version="1.1">'+b+"</svg>",c)
p=p.createDocumentFragment()
p.toString
q=new A.aD(r).gaH(0)
while(s=q.firstChild,s!=null)p.appendChild(s).toString
return p},
dB(a){return a.focus()},
gdM(a){return new A.aW(a,"change",!1,t.E)},
gaO(a){return new A.aW(a,"click",!1,t.C)},
gdN(a){return new A.aW(a,"input",!1,t.E)},
gdO(a){return new A.aW(a,"keydown",!1,t.kN)},
$iu:1}
A.b3.prototype={$ib3:1}
A.fY.prototype={
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
u(a,b){return this.h(a,b)},
$in:1,
$ih:1,
$ip:1}
A.hw.prototype={}
A.hx.prototype={}
A.hG.prototype={}
A.hH.prototype={}
A.hU.prototype={}
A.hV.prototype={}
A.i3.prototype={}
A.i4.prototype={}
A.eT.prototype={
gj(a){return a.length}}
A.eU.prototype={
M(a,b){return A.bc(a.get(b))!=null},
h(a,b){return A.bc(a.get(A.w(b)))},
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
gH(a){var s=A.B([],t.s)
this.q(a,new A.kJ(s))
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
A.kJ.prototype={
$2(a,b){return B.b.m(this.a,a)},
$S:6}
A.eV.prototype={
gj(a){return a.length}}
A.bO.prototype={}
A.fD.prototype={
gj(a){return a.length}}
A.h9.prototype={}
A.nP.prototype={
$1(a){t.A.a(a)
new A.iw().ae()},
$S:18}
A.iw.prototype={
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
q.k2=t.dW.a(A.aa(["view-dashboard",a0,"view-directory",o,"view-worker-resident-details",n,"view-assets",m,"view-profile",l,"view-billing",k,"view-transactions",j,"view-announcements",i,"view-resident-profile",h,"view-resident-home",q.dy,"view-resident-ledger",q.fr,"view-resident-support",q.fx],g,t.h))
h=t.d.a(window.location).href
h.toString
f=A.cq(h).gai().h(0,"role")
e=a.getElementById("web-portal-title")
a0=f==="resident"
if(a0){if(e!=null)J.q(e,"Resident Portal")
d=t.G.a(a.getElementById("employee-id"))
if(d!=null)d.placeholder="Resident ID, meter ID, contact or unique name"}else{if(e!=null)J.q(e,"Worker Portal")
d=t.G.a(a.getElementById("employee-id"))
if(d!=null)d.placeholder="Enter employee ID"}o=new A.jQ()
o.$0()
A.mo(A.pc(0,10),new A.jJ(o))
o=a.getElementById("btn-resident-profile-logout")
if(o!=null){o=J.a4(o)
n=o.$ti
A.y(o.a,o.b,n.i("~(1)?").a(new A.jK()),!1,n.c)}o=$.K()
o.shg(new A.jL(q))
n=o.cx
new A.d5(n,A.C(n).i("d5<1>")).ha(new A.jM(q))
s=2
return A.z(o.ae(),$async$ae)
case 2:q.dl(o.Y())
A.mo(B.ab,new A.jN(q))
A.mo(B.F,new A.jO(q))
A.y(a,A.w(A.pg(a)),t.oV.a(new A.jP(q)),!1,t.A)
p=A.cF()?window.localStorage.getItem("waterhall_session"):null
c=A.cF()?window.localStorage.getItem("waterhall_resident_session"):null
if(a0)if(c!=null&&c.length!==0){q.cO(c)
q.az()
q.bo("resident")}else q.b8()
else if(p!=null&&p.length!==0)try{a0=A.aj(t.f.a(B.c.J(0,p)),g,t.z)
q.a=a0
q.cM(a0)
q.az()
q.bo("worker")}catch(a1){a0=window.localStorage
a0.toString
B.j.C(a0,"waterhall_session")
q.b8()}else q.b8()
q.fJ()
q.h4()
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
return A.z(i.aQ(m.d!=null?"resident":"worker"),$async$b0)
case 6:if(!J.j(l,window.localStorage.getItem("waterhall_jwt"))||!i.O()||J.j(k,i.at)){n=[1]
s=4
break}if(m.d!=null)m.cB()
else{i=m.b
if(i==="view-dashboard")m.bH()
else if(i==="view-directory")m.aR()}if(m.b==="view-announcements")m.dS()
n.push(5)
s=4
break
case 3:n=[2]
case 4:p=2
m.ay=!1
m.c6()
s=n.pop()
break
case 5:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$b0,r)},
dl(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c="btn-review-collections"
t.P.a(a)
s=document
r=s.getElementById("worker-sync-status-pill")
q=s.getElementById("worker-sync-status-text")
p=s.getElementById("db-offline-overlay")
o=s.getElementById("offline-banner-text")
n=J.x(a)
m=n.h(a,"status")
l=A.w(m==null?"online":m)
k=A.nr(n.h(a,"pendingCount"))
if(k==null)k=0
m=A.qj(n.h(a,"isOnline"))
m=m===!1
j=J.j(n.h(a,"authenticated"),!0)
i=A.nr(n.h(a,"reviewCount"))
if(i==null)i=0
h=r==null
if(!h&&q!=null){g=J.J(r)
g.gap(r).bF(["online","offline","pending_sync","syncing","synced"])
g.gap(r).m(0,l)
if(!j)J.q(q,"Sign in required")
else if(m)J.q(q,"Offline Mode")
else if(J.j(n.h(a,"isSyncing"),!0))J.q(q,"Syncing...")
else if(k>0){if(i>0)n=""+k+" Pending ("+i+" need review)"
else{g=""+k
n=n.h(a,"error")!=null?g+" Pending: retry needed":g+" Pending Sync"}J.q(q,n)}else J.q(q,"Connected")}if(p!=null){f=A.e5().gai().h(0,"role")==="resident"&&j&&m
n=p.style
n.toString
m=f?"flex":"none"
n.display=m
if(f)if(o!=null)J.q(o,"Offline Mode Active: Local SQLite storage enabled. Data will auto-sync when online.")}e=s.getElementById(c)
if(e==null)n=(h?null:r.parentElement)!=null
else n=!1
if(n){d=s.createElement("button")
d.id=c
B.k.sP(d,"Review pending operations")
s=t.C
A.y(d,"click",s.i("~(1)?").a(new A.j7(this)),!1,s.c)
r.parentElement.appendChild(d).toString
e=d}if(e!=null){s=e.style
s.toString
n=j&&i>0?"inline-block":"none"
s.display=n}},
da(){var s,r,q,p,o,n,m,l,k,j,i,h,g="collection-review-modal",f="house_id",e="sync_error",d=$.K()
if(!d.O())return
s=document
r=s.getElementById(g)
if(r!=null)J.iv(r)
q=s.createElement("div")
q.id=g
q.className="modal-overlay"
r=q.style
r.display="flex"
p=s.createElement("div")
p.className="offline-card"
r=p.style
r.maxHeight="80vh"
B.n.cb(r,B.n.bR(r,"overflow-y"),"auto","")
r=s.createElement("h2")
r.toString
B.H.sP(r,"Pending operation review")
p.appendChild(r).toString
r=s.createElement("p")
r.toString
B.m.sP(r,"These records remain saved. Review rejected readings or payments with Admin, then retry. Record IDs are preserved.")
p.appendChild(r).toString
for(d=d.aT(),r=A.D(d),o=r.i("F(1)").a(new A.j3()),d=B.b.gB(d),r=new A.aw(d,o,r.i("aw<1>"));r.p();){o=d.gt(0)
n=s.createElement("p")
n.toString
m=J.x(o)
B.m.sP(n,A.e(m.h(o,f))+" | "+A.e(m.h(o,"amount_collected"))+" | "+A.e(m.h(o,"transaction_id"))+"\n"+A.e(m.h(o,e)))
p.appendChild(n).toString}for(d=$.K().ah(),r=A.D(d),o=r.i("F(1)").a(new A.j4()),d=B.b.gB(d),r=new A.aw(d,o,r.i("aw<1>")),o=t.f;r.p();){n=d.gt(0)
m=J.x(n)
l=o.a(m.h(n,"body"))
k=B.am.h(0,m.h(n,"endpoint"))
if(k==null)k="Saved operation"
j=s.createElement("p")
j.toString
i=J.x(l)
h=i.h(l,f)
i=h==null?i.h(l,"household_id"):h
B.m.sP(j,k+" | "+A.e(i==null?"":i)+" | "+A.e(m.h(n,"operation_id"))+"\n"+A.e(m.h(n,e)))
p.appendChild(j).toString}d=s.createElement("button")
d.toString
B.k.sP(d,"Retry pending operations")
r=t.C
o=r.i("~(1)?")
r=r.c
A.y(d,"click",o.a(new A.j5(this,d)),!1,r)
p.appendChild(d).toString
d=s.createElement("button")
d.toString
B.k.sP(d,"Close")
A.y(d,"click",o.a(new A.j6(q)),!1,r)
p.appendChild(d).toString
q.appendChild(p).toString
s.body.appendChild(q).toString},
fJ(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this,a3="click",a4="change"
a2.f5()
a2.eR()
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
A.y(k.a,k.b,j.i("~(1)?").a(new A.j9(l)),!1,j.c)}if(q!=null){k=t.C
A.y(q,a3,k.i("~(1)?").a(new A.ja(a2,o,n,m,q)),!1,k.c)}i=r.a(s.getElementById("btn-logout"))
if(i!=null){k=t.C
A.y(i,a3,k.i("~(1)?").a(new A.jb(a2)),!1,k.c)}h=r.a(s.getElementById("btn-resident-logout"))
if(h!=null){k=t.C
A.y(h,a3,k.i("~(1)?").a(new A.je(a2)),!1,k.c)}k=t.h
A.eL(k,k,"T","querySelectorAll")
k=s.querySelectorAll(".nav-tab")
k.toString
g=new A.bm(k,t.U)
g.q(g,new A.jf(a2))
f=p.a(s.getElementById("dir-search"))
p=t.Y
e=p.a(s.getElementById("filter-purok"))
d=p.a(s.getElementById("filter-status"))
if(f!=null){p=t.E
A.y(f,"input",p.i("~(1)?").a(new A.jg(a2)),!1,p.c)}if(e!=null){p=t.E
A.y(e,a4,p.i("~(1)?").a(new A.jh(a2)),!1,p.c)}if(d!=null){p=t.E
A.y(d,a4,p.i("~(1)?").a(new A.ji(a2)),!1,p.c)}c=s.getElementById("btn-close-modal")
if(c!=null){p=J.a4(c)
k=p.$ti
A.y(p.a,p.b,k.i("~(1)?").a(new A.jj(a2)),!1,k.c)}b=s.getElementById("house-detail-modal")
if(b!=null){p=J.a4(b)
k=p.$ti
A.y(p.a,p.b,k.i("~(1)?").a(new A.jk(b)),!1,k.c)}a=t.aa.a(s.getElementById("modal-leak-toggle"))
if(a!=null){p=t.E
A.y(a,a4,p.i("~(1)?").a(new A.jl(a2,a)),!1,p.c)}a0=r.a(s.getElementById("btn-submit-log"))
if(a0!=null){p=t.C
A.y(a0,a3,p.i("~(1)?").a(new A.jc(a2)),!1,p.c)}a1=r.a(s.getElementById("btn-broadcast-announcement"))
if(a1!=null){s=t.C
A.y(a1,a3,s.i("~(1)?").a(new A.jd(a2,a1)),!1,s.c)}a2.h3()},
h3(){var s,r,q,p=document,o=p.getElementById("web-modal-forgot-pw")
o.toString
s=new A.jz(o)
r=p.getElementById("btn-web-forgot-password")
if(r!=null){r=J.a4(r)
q=r.$ti
A.y(r.a,r.b,q.i("~(1)?").a(new A.jA(o)),!1,q.c)}p=p.getElementById("btn-web-recover-cancel")
if(p!=null){p=J.a4(p)
r=p.$ti
A.y(p.a,p.b,r.i("~(1)?").a(new A.jB(s)),!1,r.c)}p=J.oZ(o)
o=p.$ti
A.y(p.a,p.b,o.i("~(1)?").a(new A.jC(s)),!1,o.c)
this.h2()},
bv(){var s,r;++this.ok
this.k3=null
s=document
r=t.L.a(s.activeElement)
if(r!=null)r.blur()
r=s.getElementById("web-modal-change-password")
if(r!=null){r=r.style
r.display="none"}t.h4.a(s.getElementById("web-change-password-form")).reset()},
dP(a){var s,r,q,p,o,n,m="change-current-password",l="change-new-password";++this.ok
this.k3=a
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
B.f.sfU(o,r)
s=q.getElementById("btn-change-password-cancel")
if(s!=null)J.q(s,r?"Return to Login":"Cancel")
s=q.getElementById("change-password-error")
if(s!=null)s.hidden=!0
for(s=[m,l,"change-confirm-password"],n=0;n<3;++n)B.f.sbg(p.a(q.getElementById(s[n])),"password")
s=q.getElementById("web-modal-change-password")
if(s!=null){s=s.style
s.display="flex"}s=q.getElementById(r?l:m)
if(s!=null)J.o5(s)},
hi(){return this.dP(null)},
h2(){var s,r,q,p,o,n,m,l=this,k=document,j=k.getElementById("web-modal-change-password")
j.toString
s=t.h4.a(k.getElementById("web-change-password-form"))
r=t.k.a(k.getElementById("btn-change-password-save"))
q=k.getElementById("change-password-error")
q.toString
for(p=["btn-worker-change-password","btn-resident-change-password"],o=0;o<2;++o){n=k.getElementById(p[o])
if(n!=null){n=J.a4(n)
m=n.$ti
A.y(n.a,n.b,m.i("~(1)?").a(new A.ju(l)),!1,m.c)}}p=k.getElementById("btn-change-password-cancel")
if(p!=null){p=J.a4(p)
n=p.$ti
A.y(p.a,p.b,n.i("~(1)?").a(new A.jv(l)),!1,n.c)}j=J.oZ(j)
p=j.$ti
A.y(j.a,j.b,p.i("~(1)?").a(new A.jw(l)),!1,p.c)
p=t.E
j=p.i("~(1)?")
p=p.c
A.y(t.S.a(k.getElementById("change-show-password")),"change",j.a(new A.jx()),!1,p)
A.y(s,"submit",j.a(new A.jy(l,q,s,r)),!1,p)},
aj(a,b){var s
if(b!=null){J.q(b,a)
s=b.style
s.display="block"}},
az(){},
bo(a){var s="WaterHallPush",r=$.bu()
if(r.ba(s))r.h(0,s).ao("registerSubscription",A.B([a],t.s))},
b8(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b="none",a=document,a0=a.getElementById("announcement-history")
if(a0!=null)J.cH(a0).X(0)
for(a0=["resident-profile-name","resident-profile-account","resident-profile-avatar"],s=0;s<3;++s){r=a.getElementById(a0[s])
if(r!=null)J.q(r,"--")}a0=c.k2
a0===$&&A.ay()
new A.b0(a0,A.C(a0).i("b0<2>")).q(0,new A.jm())
a0=c.ch
a0===$&&A.ay()
J.c8(a0).m(0,"active")
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
if(q!=null)B.f.sL(q,"")
if(p!=null)B.f.sL(p,"")
if(o!=null){r=o.style
r.display=b}r=t.r
n=r.a(a.getElementById("resident-log-desc"))
if(n!=null)B.o.sL(n,"")
m=a.getElementById("resident-photo-name")
if(m!=null)J.q(m,"No file chosen")
l=a.getElementById("resident-photo-preview")
if(l!=null){k=l.style
k.display=b
k=l.style
k.backgroundImage=""
J.cH(l).X(0)}j=a0.a(a.getElementById("dir-search"))
if(j!=null)B.f.sL(j,"")
i=a0.a(a.getElementById("bill-meter-search"))
if(i!=null)B.f.sL(i,"")
h=a0.a(a.getElementById("bill-curr-input"))
if(h!=null)B.f.sL(h,"")
g=r.a(a.getElementById("worker-announcement-input"))
if(g!=null)B.o.sL(g,"")
f=a.getElementById("resident-logout-name")
e=a.getElementById("resident-logout-role")
d=a.getElementById("resident-logout-avatar")
if(f!=null)J.q(f,"---")
if(e!=null)J.q(e,"---")
if(d!=null)J.q(d,"--")},
cM(a){var s,r,q,p,o,n,m,l=this
t.P.a(a)
s=t.d.a(window.location).href
s.toString
if(A.cq(s).gai().h(0,"role")==="resident"){A.c6("[SECURITY] Resident application is forbidden from loading Worker Portal.")
return}s=l.ch
s===$&&A.ay()
J.c8(s).C(0,"active")
s=l.ch.style
s.display="none"
s=l.k2
s===$&&A.ay()
new A.b0(s,A.C(s).i("b0<2>")).q(0,new A.kw())
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
r=A.a3(new A.I(A.B(J.M(a.h(0,"name")).split(" "),t.s),t.Q.a(new A.kx()),s),s.i("h.E"))
s=A.D(r)
q=new A.a1(r,s.i("c(1)").a(new A.ky()),s.i("a1<1,c>")).a_(0,"")
s=q.length
s=B.a.n(q,0,s<2?s:2)
p=document
o=p.getElementById("worker-logout-name")
n=p.getElementById("worker-logout-role")
m=p.getElementById("worker-logout-avatar")
if(o!=null)J.q(o,A.ak(a.h(0,"name")))
if(n!=null){p=a.h(0,"role")
J.q(n,A.ak(p==null?"Field Worker":p))}if(m!=null)J.q(m,s.toUpperCase())
l.ak("view-dashboard")
l.bH()
l.aR()
l.cA()
l.h1()},
ak(a){var s,r,q,p,o,n,m=this,l="view-resident-home",k="view-resident-ledger",j="view-resident-support",i="view-resident-profile",h="view-transactions",g="house_id"
if(m.a==null&&m.d==null&&a!=="view-login"){m.b8()
return}s=t.d.a(window.location).href
s.toString
r=A.cq(s).gai().h(0,"role")
if(r==="worker")s=a===l||a===k||a===j||a===i
else s=!1
if(s){A.c6("[SECURITY] Worker application is forbidden from switching to Resident tab "+a+".")
return}if(r==="resident")s=a==="view-dashboard"||a==="view-billing"||a==="view-profile"||a===h||a==="view-directory"||a==="view-assets"||a==="view-worker-resident-details"
else s=!1
if(s){A.c6("[SECURITY] Resident application is forbidden from switching to Worker tab "+a+".")
return}m.b=a
s=document
s.toString
q=t.h
A.eL(q,q,"T","querySelectorAll")
q=s.querySelectorAll(".nav-tab")
q.toString
p=new A.bm(q,t.U)
p.q(p,new A.kF(a))
q=m.k2
q===$&&A.ay()
q.q(0,new A.kG(a))
if(a==="view-dashboard")m.bH()
else if(a==="view-directory")m.aR()
else if(a==="view-announcements")m.dS()
else if(a===i)m.cB()
else if(a!=="view-assets")if(a==="view-profile")m.cA()
else if(a===h){m.al()
m.ct()}else if(a==="view-billing"){if(m.rx==null){o=$.K().a
q=o.length
if(q!==0){if(0>=q)return A.d(o,0)
m.rx=A.ak(J.i(o[0],g))
n=t.G.a(s.getElementById("bill-meter-search"))
if(n!=null){if(0>=o.length)return A.d(o,0)
s=A.e(J.i(o[0],"owner_name"))
if(0>=o.length)return A.d(o,0)
B.f.sL(n,s+" ("+A.e(J.i(o[0],g))+")")}}}m.bG(m.rx)}else if(a===l||a===k||a===j)m.cB()},
bH(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1=this,b2="worker",b3="var(--alert-green)",b4=".alert-widget-title",b5="var(--amber-safety)"
if(b1.a==null)return
s=document
r=s.getElementById("dash-worker-title")
if(r!=null)J.q(r,"WaterHall Field Terminal")
q=$.K()
p=q.cI(b2)
if(q.x)b1.d8(p,b2)
o=s.getElementById("worker-announcement-banner")
n=s.getElementById("worker-announcement-message")
m=s.getElementById("worker-announcement-tag")
if(o!=null&&n!=null)if(p!=null&&A.w(J.i(p,"message")).length!==0){l=J.x(p)
J.q(n,A.w(l.h(p,"message")))
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
b1.c8(b2,h,f,s.getElementById("worker-turb-val"),s.getElementById("worker-tds-val"),e)
q=A.D(i)
l=q.i("I<1>")
d=A.a3(new A.I(i,q.i("F(1)").a(new A.k5()),l),l.i("h.E"))
c=A.B([],t.hq)
if(J.j(h.h(0,"turbidity_status"),"warning")){q=t.N
B.b.m(c,A.aa(["type","quality","name","Elevated Turbidity Index (Provisional)","desc",A.w(h.h(0,"turbidity_desc"))],q,q))
b=1}else b=0
a=d.length+b
a0=s.getElementById("dash-alert-count")
if(a0!=null)J.q(a0,B.e.l(a))
a1=s.getElementById("dashboard-alert-widget")
a2=s.getElementById("dash-alert-list")
if(a1!=null&&a2!=null){q=J.J(a2)
q.sU(a2,"")
if(a===0){l=a1.style
l.borderColor=b3
a3=t.L.a(a1.querySelector(b4))
if(a3!=null){l=a3.style
l.color=b3}q.sU(a2,'          <div class="alert-item" style="border-left-color: var(--alert-green); background-color: rgba(16, 185, 129, 0.05)">\n            <div class="alert-item-icon">\n              <svg style="fill: var(--alert-green)" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>\n            </div>\n            <div class="alert-item-text" style="color: var(--text-on-dark)">'+(J.j(h.h(0,"has_reading"),!1)?"No leak reports. Water quality is awaiting sensor readings.":"No leak reports or configured water-quality alerts in the latest data.")+"</div>\n          </div>\n        ")}else{q=a1.style
q.borderColor=b5
a3=t.L.a(a1.querySelector(b4))
if(a3!=null){q=a3.style
q.color=b5}B.b.q(d,new A.k6(b1,a2))
B.b.q(c,new A.k7(b1,a2))}}a4=J.pj(8,t.N)
for(a5=0;a5<8;a5=a6){a6=a5+1
a4[a5]="Purok "+a6}new A.cm(a4,A.D(a4).i("cm<1>")).q(0,new A.k8(b1,i))
a7=s.getElementById("dashboard-zone-grid")
if(a7!=null){J.dk(a7,"")
B.b.q(a4,new A.k9(b1,i,a7))}a8=s.getElementById("dash-log-count")
a9=s.getElementById("dash-log-list")
if(a9!=null){s=J.J(a9)
s.sU(a9,"")
b0=A.e1(g,0,A.cB(3,"count",t.q),A.D(g).c).av(0)
if(a8!=null)J.q(a8,""+g.length+" logged")
if(b0.length===0)s.sU(a9,'<div class="log-card" style="color:var(--text-muted)">No maintenance activity logged yet.</div>')
else B.b.q(b0,new A.ka(b1,i,a9))}},
a5(a){var s=$.bu().h(0,"WaterHallDisplay"),r=a==null?null:J.M(a)
return J.M(s.ao("formatTimestamp",A.B([r==null?"":r,"Unknown date"],t.s)))},
aR(){var s,r,q,p,o,n,m=null,l=$.K().a,k=document,j=t.G.a(k.getElementById("dir-search")),i=t.Y,h=i.a(k.getElementById("filter-purok")),g=i.a(k.getElementById("filter-status"))
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
J.dk(o,"")
k=A.D(l)
i=k.i("I<1>")
n=A.a3(new A.I(l,k.i("F(1)").a(new A.kc(s,r,q)),i),i.i("h.E"))
if(n.length===0){if(p!=null){k=p.style
k.display="block"}}else{if(p!=null){k=p.style
k.display="none"}B.b.q(n,new A.kd(this,o))}},
cv(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
if(p!=null)J.q(p,A.ak(J.i(r,"owner_name")))
if(o!=null)J.q(o,A.ak(J.i(r,"account_number")))
k=s.r.h(0,"allow_worker_collection")==="true"
j=t.o.a(q.getElementById("btn-open-collect-modal"))
i=j==null
if(!i)j.disabled=!k
if(!i){h=j.style
h.toString
g=k?"1":"0.55"
B.n.cb(h,B.n.bR(h,"opacity"),g,"")}if(!i){h=j.style
h.toString
g=k?"pointer":"default"
h.cursor=g}if(!i)B.k.shw(j,k?"Record an authorized collection":"Payments must be made at Barangay Hall.")
i=q.getElementById("worker-collection-policy")
if(i!=null)J.q(i,k?"Field collection is enabled by Admin. Payments remain pending until the server confirms synchronization.":"Barangay policy: make payments in person at Barangay Hall. Field collection is disabled.")
f=s.bM(a)
e=f.length!==0?B.b.gD(f):null
if(m!=null)J.q(m,e==null?"--":B.d.G(A.ab(J.i(e,"consumption")),3))
if(l!=null)J.q(l,e==null?"No billing record":B.d.G(A.ab(J.i(e,"total_due")),2))
if(n!=null){s=J.J(n)
if(J.j(J.i(r,"current_leak_status"),"leak")){s.sU(n,'<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--alert-red)"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> <span style="color:var(--alert-red);font-weight:700">Leak Alert Detected</span>')
s=n.style
s.backgroundColor="var(--alert-red-bg)"
s=n.style
s.border="1px solid var(--alert-red)"}else{s.sU(n,'<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--alert-green)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <span style="color:var(--alert-green);font-weight:700">No leak reported</span>')
s=n.style
s.backgroundColor="var(--alert-green-bg)"
s=n.style
s.border="1px solid rgba(16, 185, 129, 0.3)"}}this.ak("view-worker-resident-details")
s=q.getElementById("btn-back-to-dir")
if(s!=null){s=J.a4(s)
q=s.$ti
A.y(s.a,s.b,q.i("~(1)?").a(new A.jR(this)),!1,q.c)}},
e5(a){var s=document,r=s.getElementById("modal-leak-title"),q=s.getElementById("modal-leak-desc")
if(r==null||q==null)return
s=J.J(r)
if(a==="leak"){s.sP(r,"Leak status: LEAK REPORTED")
s=r.style
s.color="var(--alert-red)"
J.q(q,"A leak has been reported. Inspect the water line on site.")}else{s.sP(r,"Leak status: NO REPORT")
s=r.style
s.color="var(--alert-green)"
J.q(q,"No leak is currently reported. This is not an automatic sensor assessment.")}},
hs(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e="var(--amber-safety)",d={}
t.oT.a(a)
s=document.getElementById(b)
if(s==null)return
r=J.J(s)
r.sU(s,"")
if(a.length===0){r.sU(s,'<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:12px">No historic telemetry available.</div>')
return}q=B.d.ci(B.b.hm(a,new A.kq())*1.1,10,1000)
p=new A.cm(a,A.D(a).i("cm<1>"))
o=p.gaC(p).ar(0,new A.kr(a,q),t.c).av(0)
p=A.D(o)
n=p.i("c(1)")
p=p.i("a1<1,c>")
m=new A.a1(o,n.a(new A.ks()),p).a_(0," ")
if(0>=o.length)return A.d(o,0)
l=B.d.G(A.ab(J.i(o[0],"x")),1)
k=B.e.G(80,1)
p=new A.a1(o,n.a(new A.kt()),p).a_(0," ")
n=o.length
j=n-1
if(!(j>=0))return A.d(o,j)
j=B.d.G(A.ab(J.i(o[j],"x")),1)
n=B.e.G(80,1)
i=b==="resident-chart-container"
h=i?"res-chart-grad":"chart-area-grad"
g=i?"#3B82F6":e
f=i?"#3B82F6":e
d.a='      <svg width="100%" height="100%" viewBox="0 0 340 100" style="overflow:visible">\n        <defs>\n          <linearGradient id="'+h+'" x1="0" y1="0" x2="0" y2="1">\n            <stop offset="0%" stop-color="'+f+'" stop-opacity="0.3"/>\n            <stop offset="100%" stop-color="'+f+'" stop-opacity="0.0"/>\n          </linearGradient>\n        </defs>\n\n        <line x1="20" y1="20" x2="320" y2="20" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="50" x2="320" y2="50" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="3 3"/>\n        <line x1="20" y1="80" x2="320" y2="80" stroke="#CBD5E1" stroke-width="1.5"/>\n\n        <path d="'+("M "+l+","+k+" "+p+(" L "+j+","+n+" Z"))+'" fill="url(#'+h+')" />\n        <polyline points="'+m+'" fill="none" stroke="'+g+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>\n    '
B.b.q(o,new A.ku(d,g))
r.sU(s,d.a+="</svg>")},
dT(a){var s,r,q,p,o,n=document.getElementById("modal-historical-logs")
if(n==null)return
s=J.J(n)
s.sU(n,"")
r=$.K().c
q=A.D(r)
p=q.i("I<1>")
o=A.a3(new A.I(r,q.i("F(1)").a(new A.ke(a)),p),p.i("h.E"))
if(o.length===0)s.sU(n,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous repair logs recorded for this meter.</div>')
else B.b.q(o,new A.kf(this,n))},
cA(){var s,r,q,p,o,n,m,l,k,j,i,h,g=this
if(g.a==null)return
s=document
r=s.getElementById("worker-name")
q=s.getElementById("worker-role")
p=s.getElementById("worker-avatar")
if(r!=null)J.q(r,A.ak(g.a.h(0,"name")))
if(q!=null)J.q(q,A.ak(g.a.h(0,"role")))
if(p!=null){o=t.J
n=A.a3(new A.I(A.B(J.M(g.a.h(0,"name")).split(" "),t.s),t.Q.a(new A.kg()),o),o.i("h.E"))
o=A.D(n)
m=new A.a1(n,o.i("c(1)").a(new A.kh()),o.i("a1<1,c>")).a_(0,"")
o=m.length
J.q(p,B.a.n(m,0,o<2?o:2).toUpperCase())}o=$.K()
l=o.a.length
o=o.c
k=A.D(o)
j=new A.I(o,k.i("F(1)").a(new A.ki(g)),k.i("I<1>")).gj(0)
i=s.getElementById("profile-stat-total")
h=s.getElementById("profile-stat-logs")
if(i!=null)J.q(i,B.e.l(l))
if(h!=null)J.q(h,B.e.l(j))},
h4(){var s,r=this,q=document,p=q.getElementById("transaction-filter")
if(p!=null){p=J.rx(p)
s=p.$ti
A.y(p.a,p.b,s.i("~(1)?").a(new A.jE(r)),!1,s.c)}p=q.getElementById("transaction-search")
if(p!=null){p=J.ry(p)
s=p.$ti
A.y(p.a,p.b,s.i("~(1)?").a(new A.jF(r)),!1,s.c)}p=q.getElementById("transaction-more")
if(p!=null){p=J.a4(p)
s=p.$ti
A.y(p.a,p.b,s.i("~(1)?").a(new A.jG(r)),!1,s.c)}q=q.getElementById("transaction-previous")
if(q!=null){q=J.a4(q)
p=q.$ti
A.y(q.a,q.b,p.i("~(1)?").a(new A.jH(r)),!1,p.c)}},
bb(a){return this.hb(a)},
ct(){return this.bb(!1)},
hb(a){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c
var $async$bb=A.U(function(b,a0){if(b===1){o.push(a0)
s=p}for(;;)switch(s){case 0:e=document
d=t.g.a(e.getElementById("transaction-filter")).value
if(m.a==null||!$.K().x||d==="Pending Sync"||d==="Failed Sync"){++m.p3
m.p4=!1
m.p1=null
m.al()
s=1
break}l=++m.p3
k=window.localStorage.getItem("waterhall_jwt")
if(!a){m.p1=null
m.p2=0}m.p4=!0
m.R8=null
m.al()
p=4
h=t.S.a(e.getElementById("transaction-search")).value
j=h==null?"":h
e=$.K()
g=a?m.p1:null
s=7
return A.z(e.b9(g,j),$async$bb)
case 7:i=a0
if(!J.j(l,m.p3)||!J.j(k,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}m.p1=A.nr(J.i(i,"next_cursor"))
if(a&&m.ck().length>m.p2+25)m.p2+=25
n.push(6)
s=5
break
case 4:p=3
c=o.pop()
if(J.j(l,m.p3))m.R8="History could not load. Saved device records remain available; reopen Transactions to retry."
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
if(J.j(l,m.p3)){m.p4=!1
m.al()}s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$bb,r)},
ck(){var s,r,q,p=document,o=t.g.a(p.getElementById("transaction-filter")).value
if(o==null)o="All"
p=t.S.a(p.getElementById("transaction-search")).value
p=B.a.A(p==null?"":p)
s=$.K().hz()
r=A.D(s)
q=r.i("I<1>")
p=A.a3(new A.I(s,r.i("F(1)").a(new A.jn(o,p.toLowerCase())),q),q.i("h.E"))
return p},
al(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d="house_id",c=document,b=c.getElementById("transaction-list")
if(b==null||e.a==null)return
s=t.g.a(c.getElementById("transaction-filter")).value
if(s==null)s="All"
r=J.J(b)
r.gbu(b).X(0)
q=e.ck()
for(p=A.e1(q,e.p2,null,A.D(q).c).hv(0,25),o=p.$ti,p=new A.bh(p,p.gj(0),o.i("bh<a5.E>")),n=t.N,m=t.z,o=o.i("a5.E");p.p();){l=p.d
if(l==null)l=o.a(l)
k=c.createElement("div")
k.className="bill-record-card"
j=c.createElement("h3")
j.toString
i=J.x(l)
h=i.h(l,"family_head_name")
if(h==null){h=$.K().a2(A.e(i.h(l,d)))
h=h==null?null:J.i(h,"owner_name")}B.H.sP(j,A.e(h==null?"Household":h)+" \xb7 "+A.e(i.h(l,d)))
k.appendChild(j).toString
j=c.createElement("p")
j.toString
B.m.sP(j,A.e(i.h(l,"sync_status"))+" \xb7 Billing status: "+A.e(i.h(l,"status")))
k.appendChild(j).toString
g=c.createElement("div")
g.className="transaction-details"
A.aa(["Meter",i.h(l,"account_number"),"Previous reading",i.h(l,"previous_reading"),"Current reading",i.h(l,"current_reading"),"Consumption (m\xb3)",i.h(l,"consumption"),"Bill amount (PHP)",i.h(l,"total_due"),"Billing date",e.a5(i.h(l,"date")),"Reference",i.h(l,"bill_id"),"Operation",i.h(l,"operation_id")],n,m).q(0,new A.kv(g))
k.appendChild(g).toString
b.appendChild(k).toString}p=c.getElementById("transaction-message")
if(p!=null){o=e.R8
if(o==null)if(e.p4)r="Loading history\u2026"
else if(!$.K().x)r="Offline Mode \u2014 showing saved device history."
else{r=r.gbu(b)
r=r.gE(r)?"No matching transactions.":"Page "+(B.e.ac(e.p2,25)+1)+" \u2014 newest bills first."}else r=o
J.q(p,r)}r=t.k
f=r.a(c.getElementById("transaction-more"))
if(q.length<=e.p2+25)p=!$.K().x||e.p1==null||s==="Pending Sync"||s==="Failed Sync"
else p=!1
f.hidden=p
f.disabled=e.p4
r.a(c.getElementById("transaction-previous")).hidden=e.p2===0},
h1(){var s,r,q,p,o,n,m,l,k,j,i=this,h="house_id"
if(i.ry)return
i.ry=!0
for(s=["name","id"],r=0;r<2;++r){q=s[r]
p=document.getElementById("bill-search-"+q)
if(p!=null){p=J.a4(p)
o=p.$ti
A.y(p.a,p.b,o.i("~(1)?").a(new A.jo(i,q)),!1,o.c)}}s=document
p=t.G
n=p.a(s.getElementById("bill-meter-search"))
m=s.getElementById("bill-meter-results")
l=p.a(s.getElementById("bill-curr-input"))
k=t.o.a(s.getElementById("btn-save-bill"))
if(n==null)return
p=t.E
o=p.i("~(1)?")
p=p.c
A.y(n,"focus",o.a(new A.jp(i)),!1,p)
A.y(n,"input",o.a(new A.jq(i)),!1,p)
if(l!=null)A.y(l,"input",o.a(new A.jr(i)),!1,p)
A.y(s,"click",t.b9.a(new A.js(n,m)),!1,t.V)
if(k!=null){s=t.C
A.y(k,"click",s.i("~(1)?").a(new A.jt(i)),!1,s.c)}j=$.K().a
s=j.length
if(s!==0){if(0>=s)return A.d(j,0)
i.rx=A.ak(J.i(j[0],h))
if(0>=j.length)return A.d(j,0)
s=A.e(J.i(j[0],"owner_name"))
if(0>=j.length)return A.d(j,0)
B.f.sL(n,s+" ("+A.e(J.i(j[0],h))+")")
i.bG(i.rx)}},
cN(){var s,r,q,p,o,n,m,l,k,j,i,h="owner_name",g="house_id",f="search-result-item",e=document,d=t.G.a(e.getElementById("bill-meter-search")),c=e.getElementById("bill-meter-results")
if(d==null||c==null)return
s=d.value
r=s==null?null:B.a.A(s.toLowerCase())
if(r==null)r=""
s=this.rx
q=s==null?null:$.K().a2(s)
J.cH(c).X(0)
if(q==null)p=""
else{s=J.x(q)
p=A.e(s.h(q,h))+" ("+A.e(s.h(q,g))+")"}if(r.length===0||d.value===p){e=c.style
e.display="none"
return}s=$.K().a
o=A.D(s)
n=o.i("F(1)").a(new A.kz(this,r))
m=A.oi(t.N)
for(s=B.b.gB(s),o=new A.aw(s,n,o.i("aw<1>")),n=t.C,l=n.i("~(1)?"),n=n.c;o.p();){k=s.gt(0)
j=J.x(k)
if(!m.m(0,A.e(j.h(k,g))))continue
i=e.createElement("button")
i.type="button"
i.className=f
B.k.sP(i,A.e(j.h(k,h))+" ("+A.e(j.h(k,g))+")")
A.y(i,"click",l.a(new A.kA(this,d,k,c)),!1,n)
c.appendChild(i).toString}if(m.a===0){e=e.createElement("div")
e.className=f
B.E.sP(e,$.K().x?"No households found":"No matching cached households. Reconnect to check availability.")
c.appendChild(e).toString}e=c.style
e.display="block"},
bG(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=a!=null
if(c)d.rx=a
s=d.rx
if(s==null)return
r=$.K()
q=r.a2(s)
if(q==null)return
s=document
p=s.getElementById("bill-prev-reading")
o=t.G.a(s.getElementById("bill-curr-input"))
n=s.getElementById("bill-selected-details")
if(n!=null){s=r.cH()
m=A.D(s)
l=m.i("I<1>")
k=A.a3(new A.I(s,m.i("F(1)").a(new A.jT(d)),l),l.i("h.E"))
B.b.aI(k,new A.jU())
j=k.length===0?null:B.b.gD(k)
s=A.D(k)
i=new A.I(k,s.i("F(1)").a(new A.jV()),s.i("I<1>")).cl(0,0,new A.jW(),t.u)
s=J.x(q)
m=A.e(s.h(q,"owner_name"))
l=A.e(s.h(q,"house_id"))
s=A.e(s.h(q,"account_number"))
if(j==null)h="None"
else{h=J.x(j)
h=A.e(h.h(j,"bill_id"))+" / "+A.e(h.h(j,"status"))+" / PHP "+A.e(h.h(j,"total_due"))}g=B.d.G(i,2)
f=r.x?"":" (cached)"
J.q(n,m+" \xb7 "+l+"\nMeter: "+s+"\nCurrent issued bill: "+h+"\nOutstanding balance: PHP "+g+f)}s=d.rx
s.toString
e=r.em(s)
if(p!=null)J.q(p,e==null?"--":B.d.G(e,3))
if(c&&o!=null)B.f.sL(o,"")
d.bJ()
c=d.rx
c.toString
d.hq(c)},
cT(){var s,r,q,p,o,n,m,l,k,j,i=null,h=t.N,g=t.z,f=A.oh($.K().w,h,g),e=document,d=e.getElementById("bill-prev-reading"),c=d==null?i:d.textContent
if(c==null)c=""
e=t.G.a(e.getElementById("bill-curr-input"))
if(e==null)s=i
else{e=e.value
e=e==null?i:B.a.A(e)
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
n=B.e.ac(B.e.ci(o-B.d.aE(A.bL(A.e(f.h(0,"included_m3")))*1000),0,1e9)*B.d.aE(A.bL(A.e(f.h(0,"excess_rate")))*100)+500,1000)
m=A.bL(B.d.G((B.d.aE(A.bL(A.e(f.h(0,"base_rate")))*100)+B.d.aE(A.bL(A.e(f.h(0,"environmental_fee")))*100)+n)/100,2))
l=A.bL(B.d.G(o/1000,3))
k=A.bL(B.d.G(n/100,2))
j=A.bL(B.d.G(q,3))
return A.aa(["previous_reading",A.bL(B.d.G(r,3)),"current_reading",j,"consumption",l,"excess_charge",k,"total_due",m,"billing_config_version",f.h(0,"version")],h,g)},
bJ(){var s,r,q,p,o,n,m,l="configured",k="--",j="included_m3",i="consumption",h="total_due",g=$.K(),f=A.oh(g.w,t.N,t.z),e=this.cT(),d=new A.ag(Date.now(),0,!1),c=""+A.cW(d)+"-"+B.a.bc(B.e.l(A.mf(d)),2,"0"),b=this.rx,a=b!=null&&g.co(b,c)
g=new A.kH()
g.$2("bill-calc-base",J.j(f.h(0,l),!0)?A.e(f.h(0,"base_rate")):k)
g.$2("bill-calc-fee",J.j(f.h(0,l),!0)?A.e(f.h(0,"environmental_fee")):k)
g.$2("bill-preview-cycle",c)
g.$2("bill-included-volume",J.j(f.h(0,l),!0)?A.e(f.h(0,j))+" m\xb3":k)
g.$2("bill-rate-description",J.j(f.h(0,l),!0)?"Includes "+A.e(f.h(0,j))+" m\xb3; excess at PHP "+A.e(f.h(0,"excess_rate"))+"/m\xb3.":"Admin must confirm billing rates before a bill can be recorded.")
b=e==null
g.$2("bill-calc-consumption",b?"0.000":B.d.G(A.ab(e.h(0,i)),3))
g.$2("bill-calc-excess",b?"0.00":B.d.G(A.ab(e.h(0,"excess_charge")),2))
g.$2("bill-calc-total",b?k:B.d.G(A.ab(e.h(0,h)),2))
s=document
r=t.G.a(s.getElementById("bill-curr-input"))
if(r==null)q=null
else{r=r.value
r=r==null?null:B.a.A(r)
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
else n=b?"Reading format invalid. Up to 3 decimal places supported.":"Draft: "+B.d.G(A.ab(e.h(0,i)),3)+" m\xb3 | Total Due: \u20b1"+B.d.G(A.ab(e.h(0,h)),2)
g.$2("billing-alert-banner",n)
m=t.o.a(s.getElementById("btn-save-bill"))
if(m!=null){m.disabled=this.x1||a||b
g=m.style
g.toString
b=m.disabled
b.toString
b=b?"0.5":"1"
B.n.cb(g,B.n.bR(g,"opacity"),b,"")}},
bj(){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$bj=A.U(function(a2,a3){if(a2===1){o.push(a3)
s=p}for(;;)switch(s){case 0:if(m.x1||m.rx==null||m.a==null){s=1
break}l=m.cT()
c=new A.ag(Date.now(),0,!1)
k=""+A.cW(c)+"-"+B.a.bc(B.e.l(A.mf(c)),2,"0")
j=c.aa().a9()
if(l!=null){b=$.K()
a=m.rx
a.toString
a=b.co(a,k)
b=a}else b=!0
if(b){s=1
break}b=$.K()
a=m.rx
a.toString
i=b.a2(a)
if(i==null){s=1
break}m.x1=!0
m.bJ()
h=window.localStorage.getItem("waterhall_jwt")
g=b.x
p=4
f=A.oh(l,t.N,t.z)
J.am(f,"house_id",m.rx)
J.am(f,"account_number",J.i(i,"account_number"))
J.am(f,"billing_month",k)
J.am(f,"date",j)
J.am(f,"billed_by",m.a.h(0,"worker_id"))
s=7
return A.z(b.aK(f),$async$bj)
case 7:e=a3
if(!J.j(h,window.localStorage.getItem("waterhall_jwt"))||m.a==null){n=[1]
s=5
break}if(g&&J.j(J.i(e,"is_synced"),!0))m.F("Bill successfully saved.")
else m.F("Bill saved offline. Pending synchronization.")
d=t.G.a(document.getElementById("bill-curr-input"))
if(d!=null)B.f.sL(d,"")
f=m.rx
f.toString
m.bG(f)
m.cA()
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
m.x1=!1
m.bJ()
s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$bj,r)},
hq(a){var s,r,q=document.getElementById("billing-history-list")
if(q==null)return
s=J.J(q)
s.sU(q,"")
r=$.K().bM(a)
if(r.length===0)s.sU(q,'<div style="font-size:11px;color:var(--text-muted);padding:4px">No previous invoice logs recorded.</div>')
else B.b.q(r,new A.jS(this,q))},
d8(a,b){var s,r="WaterHallPush"
t.dZ.a(a)
s=$.bu()
if(s.ba(r)){s=s.h(0,r)
s.ao("processAnnouncements",A.B([A.lZ(a==null?[]:A.B([a],t.t)),b],t.hf))}},
dS(){var s,r,q,p,o,n,m,l=this.d==null?"worker":"resident",k=document,j=k.getElementById("announcement-history")
if(j==null)return
J.cH(j).X(0)
s=$.K().cG(l)
r=J.x(s)
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
m=J.x(q)
B.u.sP(n,A.e(m.h(q,"author")))
o.appendChild(n).toString
n=k.createElement("span")
n.toString
B.u.sP(n,"\u2022 "+this.a5(m.h(q,"timestamp")))
o.appendChild(n).toString
p.appendChild(o).toString
n=k.createElement("p")
n.toString
B.m.sP(n,A.e(m.h(q,"message")))
p.appendChild(n).toString
j.appendChild(p).toString}},
F(a){var s=document,r=s.getElementById("app-toast"),q=s.getElementById("toast-text")
if(r!=null&&q!=null){J.q(q,a)
J.c8(r).m(0,"show")
s=this.x2
if(s!=null)s.a3(0)
this.x2=A.fV(A.pc(2500,0),new A.kE(r))}},
cO(a){var s,r,q,p,o,n,m,l,k,j=this,i=t.d.a(window.location).href
i.toString
if(A.cq(i).gai().h(0,"role")==="worker"){A.c6("[SECURITY] Worker application is forbidden from loading Resident Portal.")
return}j.d=a
window.localStorage.setItem("waterhall_resident_session",a)
j.a=null
i=window.localStorage
i.toString
B.j.C(i,"waterhall_session")
i=j.ch
i===$&&A.ay()
J.c8(i).C(0,"active")
i=j.ch.style
i.display="none"
i=j.k2
i===$&&A.ay()
new A.b0(i,A.C(i).i("b0<2>")).q(0,new A.kB())
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
i=J.x(s)
o=i.h(s,"owner_name")
n=J.M(o==null?"":o)
if(r!=null)J.q(r,n.length!==0?n:a)
if(q!=null)J.q(q,A.e(i.h(s,"house_id"))+" \u2022 "+A.e(i.h(s,"purok")))
if(p!=null){i=t.J
m=A.a3(new A.I(A.B(n.split(" "),t.s),t.Q.a(new A.kC()),i),i.i("h.E"))
i=A.D(m)
l=new A.a1(m,i.i("c(1)").a(new A.kD()),i.i("a1<1,c>")).a_(0,"")
i=l.length
k=B.a.n(l,0,i<2?i:2).toUpperCase()
J.q(p,k.length!==0?k:"RES")}}j.ak("view-resident-home")
i=j.at
if(i!=null)i.$0()},
c6(){var s,r,q
if(!A.cF())return
if(this.d!=null)s="resident"
else s=this.a!=null?"worker":null
if(s==null)return
r=$.K().b
q=document
this.c8(s,r,q.getElementById(s+"-tank-val"),q.getElementById(s+"-turb-val"),q.getElementById(s+"-tds-val"),q.getElementById(s+"-safety-status"))},
c8(a7,a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=null,a4="WaterHallDisplay",a5="var(--alert-red)",a6="var(--text-muted)"
t.P.a(a8)
s=$.bu()
r=t.gZ
q=s.h(0,a4).ao("telemetryFreshness",A.B([A.lZ(a8)],r))
p=J.x(q)
o=J.j(p.h(q,"fresh"),!0)
n=a8.h(0,"last_updated")
m=A.e(n==null?"":n)
l=a8.h(0,"main_tank_level")
new A.j2(o).$4(a9,l,0,"%")
k=s.h(0,a4).ao("turbidityIndexState",A.B([A.lZ(a8)],r))
n=J.x(k)
j=n.h(k,"value")
i=A.e(n.h(k,"status"))
h=typeof j=="number"?B.d.G(j,2):"N/A"
n=b0==null
if((n?a3:b0.textContent)!==h)if(!n)J.q(b0,h)
g=s.h(0,a4).ao("tdsIndexState",A.B([A.lZ(a8)],r))
r=J.x(g)
f=r.h(g,"value")
e=typeof f=="number"?B.d.G(f,2):"N/A"
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
else a=J.j(p.h(q,"hasReading"),!0)?"IoT offline.":"Awaiting current sensor readings."
a0=n.getElementById(a7+"-telemetry-freshness")
r=a0==null
if((r?a3:a0.textContent)!==a)if(!r)J.q(a0,a)
a1=n.getElementById(a7+"-reading-time")
a2=this.a5(m)
r=a1==null
if((r?a3:a1.textContent)!==a2)if(!r)J.q(a1,a2)
s.h(0,a4).ao("renderTank",[a7+"-water-tank",l,o])},
cB(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6=this,b7=null,b8="resident",b9="owner_name",c0="house_id",c1="account_number",c2="purok",c3="payment_location",c4="payment_method",c5="operating_hours",c6="payment_instructions",c7=b6.d
if(c7==null)return
s=$.K()
r=s.a2(c7)
if(r==null)return
q=s.cI(b8)
if(s.x)b6.d8(q,b8)
c7=document
p=c7.getElementById("resident-announcement-banner")
o=c7.getElementById("resident-announcement-message")
n=c7.getElementById("resident-announcement-tag")
if(p!=null&&o!=null)if(q!=null&&A.w(J.i(q,"message")).length!==0){m=J.x(q)
J.q(o,A.w(m.h(q,"message")))
if(n!=null){l=m.h(q,"target_audience")
if(l==null)l="Everyone"
k=m.h(q,"author")
J.q(n,A.e(k==null?"Admin":k)+" \u2022 "+b6.a5(m.h(q,"timestamp"))+" \u2022 "+A.e(l))}m=p.style
m.display="flex"}else{m=p.style
m.display="none"}b6.c8(b8,s.b,c7.getElementById("resident-tank-val"),c7.getElementById("resident-turb-val"),c7.getElementById("resident-tds-val"),c7.getElementById("resident-safety-status"))
j=c7.getElementById("resident-profile-name-home")
i=c7.getElementById("resident-profile-meta-home")
if(j!=null)J.q(j,A.ak(J.i(r,b9)))
if(i!=null){m=J.x(r)
J.q(i,"Resident: "+A.e(m.h(r,c0))+" | Meter: "+A.e(m.h(r,c1))+" | "+A.e(m.h(r,c2)))}h=c7.getElementById("resident-logout-name")
g=c7.getElementById("resident-logout-role")
f=c7.getElementById("resident-logout-avatar")
m=J.x(r)
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
if(h!=null)J.q(h,A.ak(d.length!==0?d:m.h(r,c0)))
if(g!=null)J.q(g,A.e(m.h(r,c0))+" \u2022 "+A.e(m.h(r,c2)))
if(f!=null){e=t.J
b=A.a3(new A.I(A.B(d.split(" "),t.s),t.Q.a(new A.kj()),e),e.i("h.E"))
e=A.D(b)
a=new A.a1(b,e.i("c(1)").a(new A.kk()),e.i("a1<1,c>")).a_(0,"")
e=a.length
a0=B.a.n(a,0,e<2?e:2).toUpperCase()
J.q(f,a0.length!==0?a0:"RES")}a1=c7.getElementById("resident-leak-flag")
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
a2=s.bM(e)
a3=B.a.n(new A.ag(Date.now(),0,!1).aa().a9(),0,7)
e=A.D(a2)
c=e.i("F(1)")
e=e.i("I<1>")
a4=e.i("h.E")
a5=A.a3(new A.I(a2,c.a(new A.kl()),e),a4)
a6=A.a3(new A.I(a2,c.a(new A.km(a3)),e),a4)
if(a5.length!==0)a7=B.b.gD(a5)
else if(a6.length!==0)a7=B.b.gD(a6)
else a7=a2.length!==0?B.b.gD(a2):b7
e=a7==null
c=e?b7:J.i(a7,"billing_breakdown")
t.eO.a(c)
a4=new A.kn()
a8=new A.ko()
a4.$2("resident-bill-cycle",e?"No recorded cycle":A.e(J.i(a7,"billing_month")))
a4.$2("resident-bill-status",e?"No unpaid or current bill":A.e(J.i(a7,"status")))
a4.$2("resident-prev-reading",a8.$2(e?b7:J.i(a7,"previous_reading"),3))
a4.$2("resident-curr-reading",a8.$2(e?b7:J.i(a7,"current_reading"),3))
a4.$2("resident-calc-consumption",a8.$2(e?b7:J.i(a7,"consumption"),3))
a4.$2("resident-calc-total",a8.$2(e?b7:J.i(a7,"total_due"),2))
a9=c==null
a4.$2("resident-calc-base",a8.$2(a9?b7:J.i(c,"base_rate"),2))
a4.$2("resident-calc-fee",a8.$2(a9?b7:J.i(c,"environmental_fee"),2))
a4.$2("resident-calc-excess",a8.$2(a9?b7:J.i(c,"excess_charge"),2))
if(e)b0=b7
else{a8=J.i(a7,"payment_date")
a8=a8==null?b7:J.M(a8)
b0=a8}if(b0==null)b0=""
a4.$2("resident-payment-date",!e&&A.e(J.i(a7,"status")).toLowerCase()==="paid"&&b0.length!==0?b6.a5(b0):"Not paid")
if(e)e="No billing record is on file yet. Amounts appear here after a Worker saves a meter reading."
else if(a9)e="Legacy bill: original total preserved; rate breakdown unavailable."
else{e=J.x(c)
c="Recorded rates: first "+A.e(e.h(c,"included_m3"))+" m\xb3 included; excess PHP "+A.e(e.h(c,"excess_rate"))+"/m\xb3."
e=c}a4.$2("resident-rate-description",e)
b6.hs(A.aN(t.R.a(m.h(r,"monthly_history")),!0,t.u),"resident-chart-container")
b6.hr(a2)
b1=s.r
b2=c7.getElementById("res-payment-location")
b3=c7.getElementById("res-payment-method")
b4=c7.getElementById("res-payment-hours")
b5=c7.getElementById("res-payment-instructions")
if(b2!=null&&b1.M(0,c3)){c7=b1.h(0,c3)
c7.toString
J.q(b2,c7)}if(b3!=null&&b1.M(0,c4)){c7=b1.h(0,c4)
c7.toString
J.q(b3,c7)}if(b4!=null&&b1.M(0,c5)){c7=b1.h(0,c5)
c7.toString
J.q(b4,c7)}if(b5!=null&&b1.M(0,c6)){c7=b1.h(0,c6)
c7.toString
J.q(b5,c7)}},
hr(a){var s,r
t.p.a(a)
s=document.getElementById("resident-history-list")
if(s==null)return
r=J.J(s)
r.sU(s,"")
if(a.length===0){r.sU(s,'<div class="empty-state" style="padding:16px;text-align:center;color:var(--text-muted);font-size:13px;">No billing history is on file for this household yet.</div>')
return}B.b.q(a,new A.kp(this,s))},
f5(){var s,r=document,q=r.getElementById("btn-open-register-modal"),p=r.getElementById("register-user-modal"),o=t.dD.a(r.getElementById("resident-register-form")),n=r.getElementById("register-status"),m=t.o.a(r.getElementById("btn-submit-register"))
if(A.e5().gai().h(0,"role")==="resident")if(q!=null){s=q.style
s.display="block"}s=t.h
A.eL(s,s,"T","querySelectorAll")
s=r.querySelectorAll("[data-toggle-password]")
s.toString
s=new A.bm(s,t.U)
s.q(s,new A.iY())
r=r.getElementById("btn-close-register-modal")
if(r!=null){r=J.a4(r)
s=r.$ti
A.y(r.a,r.b,s.i("~(1)?").a(new A.iZ(p)),!1,s.c)}if(q!=null){r=J.a4(q)
s=r.$ti
A.y(r.a,r.b,s.i("~(1)?").a(new A.j_(p,n)),!1,s.c)}if(o!=null){r=t.E
A.y(o,"submit",r.i("~(1)?").a(new A.j0(m,o,n)),!1,r.c)}},
eR(){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f="change",e=document,d=e.getElementById("btn-open-collect-modal"),c=e.getElementById("modal-collect-payment"),b=e.getElementById("btn-collect-cancel"),a=t.o.a(e.getElementById("btn-collect-confirm")),a0=t.G.a(e.getElementById("collect-amount-input")),a1=t.Y,a2=a1.a(e.getElementById("collect-payment-method"))
if(d!=null){s=J.a4(d)
r=s.$ti
A.y(s.a,s.b,r.i("~(1)?").a(new A.iC(g,a0,c)),!1,r.c)}if(b!=null){s=J.a4(b)
r=s.$ti
A.y(s.a,s.b,r.i("~(1)?").a(new A.iD(c)),!1,r.c)}if(a!=null){s=t.C
A.y(a,"click",s.i("~(1)?").a(new A.iE(g,a,a0,a2,c)),!1,s.c)}s=t.iC
q=s.a(e.getElementById("resident-gallery-input"))
p=s.a(e.getElementById("resident-camera-input"))
o=s.a(e.getElementById("resident-photo-input"))
n=a1.a(e.getElementById("resident-issue-category"))
m=t.r.a(e.getElementById("resident-log-desc"))
a1=new A.iV(g,n,m)
s=new A.iW(g)
r=new A.iy(g,s,a1)
$.bu().k(0,"waterhallPhotoPickerResult",A.v2(new A.iK(g,a1,r),t.Z))
l=new A.iU(g,a1)
k=new A.iB(g,q,p,o)
r=new A.iT(g,r)
if(q!=null){j=t.E
A.y(q,f,j.i("~(1)?").a(new A.iL(r,q)),!1,j.c)}if(p!=null){j=t.E
A.y(p,f,j.i("~(1)?").a(new A.iM(r,p)),!1,j.c)}if(o!=null){j=t.E
A.y(o,f,j.i("~(1)?").a(new A.iN(r,o)),!1,j.c)}r=e.getElementById("btn-resident-gallery-trigger")
if(r!=null){r=J.a4(r)
j=r.$ti
A.y(r.a,r.b,j.i("~(1)?").a(new A.iO(l,q)),!1,j.c)}r=e.getElementById("btn-resident-camera-trigger")
if(r!=null){r=J.a4(r)
j=r.$ti
A.y(r.a,r.b,j.i("~(1)?").a(new A.iP(l,p)),!1,j.c)}r=e.getElementById("btn-resident-photo-trigger")
if(r!=null){r=J.a4(r)
j=r.$ti
A.y(r.a,r.b,j.i("~(1)?").a(new A.iQ(l,q)),!1,j.c)}r=e.getElementById("btn-resident-photo-replace-gallery")
if(r!=null){r=J.a4(r)
j=r.$ti
A.y(r.a,r.b,j.i("~(1)?").a(new A.iR(l,q)),!1,j.c)}r=e.getElementById("btn-resident-photo-replace-camera")
if(r!=null){r=J.a4(r)
j=r.$ti
A.y(r.a,r.b,j.i("~(1)?").a(new A.iF(l,p)),!1,j.c)}r=e.getElementById("btn-resident-photo-remove")
if(r!=null){r=J.a4(r)
j=r.$ti
A.y(r.a,r.b,j.i("~(1)?").a(new A.iG(g,k,a1)),!1,j.c)}r=new A.iS(g,a1)
if(m!=null){j=t.E
A.y(m,"input",j.i("~(1)?").a(r),!1,j.c)}if(n!=null){j=t.E
A.y(n,f,j.i("~(1)?").a(r),!1,j.c)}s=new A.iH(g,k,m,n,s,l)
g.at=s
s.$0()
i=e.getElementById("btn-resident-submit-log")
if(i!=null){s=J.a4(i)
r=s.$ti
A.y(s.a,s.b,r.i("~(1)?").a(new A.iI(g,a1,k)),!1,r.c)}h=e.getElementById("btn-retry-db-connection")
if(h!=null){e=J.a4(h)
a1=e.$ti
A.y(e.a,e.b,a1.i("~(1)?").a(new A.iJ(g)),!1,a1.c)}}}
A.jQ.prototype={
$0(){var s,r,q,p,o=document.getElementById("phone-time")
if(o!=null){s=new A.ag(Date.now(),0,!1)
r=A.ol(s)
q=B.a.bc(B.e.l(A.om(s)),2,"0")
p=r>=12?"PM":"AM"
r=B.e.aU(r,12)
J.q(o,""+(r!==0?r:12)+":"+q+" "+p)}},
$S:2}
A.jJ.prototype={
$1(a){t.D.a(a)
return this.a.$0()},
$S:16}
A.jK.prototype={
$1(a){t.V.a(a)
return $.K().aM()},
$S:1}
A.jL.prototype={
$1(a){var s,r,q=this.a
q.az()
q.bv()
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
s.q(s,new A.jI())
q.as=null
s=q.ax
if(s!=null)s.a3(0)
s=window.localStorage
s.toString
B.j.C(s,"waterhall_resident_report_draft")
q.rx=q.c=null;++q.p3
q.p1=null
q.p4=!1
s=document
r=s.getElementById("transaction-list")
if(r!=null)J.cH(r).X(0)
q.f=null
r=s.getElementById("collection-review-modal")
if(r!=null)J.iv(r)
r=s.getElementById("modal-collect-payment")
if(r!=null){r=r.style
r.display="none"}q.b8()
if(a)q.aj("Session expired. Please sign in again.",s.getElementById("login-error-msg"))},
$S:41}
A.jI.prototype={
$1(a){var s
t.h.a(a)
s=a.getAttribute("disabled")
a.removeAttribute("disabled")
return s},
$S:8}
A.jM.prototype={
$1(a){var s=this.a
s.dl(t.P.a(a))
if(s.b==="view-transactions"&&s.a!=null)s.al()},
$S:9}
A.jN.prototype={
$1(a){t.D.a(a)
return this.a.b0()},
$S:16}
A.jO.prototype={
$1(a){t.D.a(a)
return this.a.c6()},
$S:16}
A.jP.prototype={
$1(a){var s=document
s.toString
s=s.visibilityState||s.mozVisibilityState||s.msVisibilityState||s.webkitVisibilityState
s.toString
if(s==="visible"){s=this.a
s.c6()
s.b0()}},
$S:3}
A.j7.prototype={
$1(a){t.V.a(a)
return this.a.da()},
$S:1}
A.j3.prototype={
$1(a){return J.i(t.P.a(a),"sync_error")!=null},
$S:0}
A.j4.prototype={
$1(a){return J.i(t.P.a(a),"sync_error")!=null},
$S:0}
A.j5.prototype={
$1(a){return this.ef(t.V.a(a))},
ef(a){var s=0,r=A.T(t.H),q=this,p
var $async$$1=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:q.b.disabled=!0
p=$.K()
s=2
return A.z(p.a4(),$async$$1)
case 2:s=3
return A.z(p.aw(),$async$$1)
case 3:if(p.O())q.a.da()
return A.R(null,r)}})
return A.S($async$$1,r)},
$S:4}
A.j6.prototype={
$1(a){t.V.a(a)
return B.E.dR(this.a)},
$S:1}
A.j9.prototype={
$1(a){var s,r,q,p
t.V.a(a).preventDefault()
s=document
r=t.G.a(s.getElementById("login-password"))
q=s.getElementById("web-eye-show")
p=s.getElementById("web-eye-hide")
if(r!=null)if(r.type==="password"){B.f.sbg(r,"text")
if(q!=null){s=q.style
s.display="none"}if(p!=null){s=p.style
s.display="block"}s=this.a.style
s.color="#F4D03F"}else{B.f.sbg(r,"password")
if(q!=null){s=q.style
s.display="block"}if(p!=null){s=p.style
s.display="none"}s=this.a.style
s.color="var(--text-muted)"}},
$S:1}
A.ja.prototype={
$1(a){return this.ek(t.V.a(a))},
ek(a8){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
var $async$$1=A.U(function(a9,b0){if(a9===1){o.push(b0)
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
j=A.cq(a2).gai().h(0,"role")
if(J.an(l)===0||J.an(k)===0){m.a.aj("Both Username and Password are required.",m.d)
s=1
break}a2=m.e
a2.disabled=!0
p=4
a3=$.K()
a4=t.N
s=7
return A.z(a3.ad("/api/login",!1,"POST",A.aa(["Content-Type","application/json"],a4,a4),B.c.V(A.aa(["username",l,"password",k],a4,a4))),$async$$1)
case 7:i=b0
a5=i.responseText
a5.toString
h=t.P.a(B.c.J(0,a5))
g=A.w(J.i(h,"access_token"))
f=A.w(J.i(h,"role"))
e=A.w(J.i(h,"id"))
d=A.w(J.i(h,"name"))
a5=!0
if(!J.j(f,"admin"))if(!(J.j(j,"resident")&&!J.j(f,"resident")))a5=!J.j(j,"resident")&&!J.j(f,"worker")
if(a5){m.a.aj("Use the portal assigned to your account role.",m.d)
n=[1]
s=5
break}s=J.j(J.i(h,"password_change_required"),!0)?8:9
break
case 8:s=10
return A.z(a3.aM(),$async$$1)
case 10:if(!a0)B.f.sL(b,"")
m.a.dP(g)
n=[1]
s=5
break
case 9:a3.dw()
b=m.a
b.f=null
s=11
return A.z(a3.aX(g),$async$$1)
case 11:s=12
return A.z(A.dj(),$async$$1)
case 12:s=13
return A.z(a3.be(),$async$$1)
case 13:if(a3.O()){a0=window.localStorage.getItem("waterhall_jwt")
a3=g
a3=a0==null?a3!=null:a0!==a3
a0=a3}else a0=!0
if(a0){n=[1]
s=5
break}if(J.j(f,"resident")){if(J.j(j,"worker")){b.aj("This terminal is for Field Workers only. Residents must use the Resident App.",m.d)
n=[1]
s=5
break}a0=window.localStorage
a0.toString
B.j.C(a0,"waterhall_session")
b.a=null
b.cO(e)
b.az()
b.bo("resident")
a0=m.d
if(a0!=null){a0=a0.style
a0.display="none"}b.F(B.a.cF("Logged in as Resident: ",d))
n=[1]
s=5
break}else{if(J.j(j,"resident")){b.aj("This portal is for Residents only. Field Workers must use the Worker App.",m.d)
n=[1]
s=5
break}a0=A.aa(["worker_id",e,"name",d,"role","Collector"],a4,t.z)
b.a=a0
a3=window.localStorage
a3.toString
a3.setItem("waterhall_session",B.c.V(a0))
a0=window.localStorage
a0.toString
B.j.C(a0,"waterhall_resident_session")
b.az()
b.bo("worker")
a0=m.d
if(a0!=null){a0=a0.style
a0.display="none"}a0=b.a
a0.toString
b.cM(a0)
b.F(B.a.cF("Logged in as Tech: ",d))
n=[1]
s=5
break}n.push(6)
s=5
break
case 4:p=3
a7=o.pop()
b=A.aq(a7)
if(b instanceof A.aG){c=b
b=c.c
if(b==null)b="Unable to sign in. Check your connection and credentials."
m.a.aj(b,m.d)
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
case 6:b=$.K().y==="Session expired. Please sign in again."?"Session expired. Please sign in again.":"Unable to sign in. Check your credentials and connection. Existing offline sessions resume when the app opens."
m.a.aj(b,m.d)
case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$$1,r)},
$S:4}
A.jb.prototype={
$1(a){return this.ej(t.V.a(a))},
ej(a){var s=0,r=A.T(t.H),q=this,p
var $async$$1=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:p=q.a
p.az()
s=2
return A.z($.K().aM(),$async$$1)
case 2:p.F("Signed out of Tech session")
return A.R(null,r)}})
return A.S($async$$1,r)},
$S:4}
A.je.prototype={
$1(a){return this.ei(t.V.a(a))},
ei(a){var s=0,r=A.T(t.H),q=this,p
var $async$$1=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:p=q.a
p.az()
s=2
return A.z($.K().aM(),$async$$1)
case 2:p.F("Signed out of Resident Portal")
return A.R(null,r)}})
return A.S($async$$1,r)},
$S:4}
A.jf.prototype={
$1(a){var s,r
t.h.a(a)
s=J.a4(a)
r=s.$ti
A.y(s.a,s.b,r.i("~(1)?").a(new A.j8(this.a,a)),!1,r.c)},
$S:8}
A.j8.prototype={
$1(a){var s
t.V.a(a).preventDefault()
s=this.b.getAttribute("data-target")
if(s==null)s=""
this.a.ak(s)},
$S:1}
A.jg.prototype={
$1(a){return this.a.aR()},
$S:3}
A.jh.prototype={
$1(a){return this.a.aR()},
$S:3}
A.ji.prototype={
$1(a){return this.a.aR()},
$S:3}
A.jj.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.ak("view-directory")
s.c=null},
$S:1}
A.jk.prototype={
$1(a){A.oD(t.V.a(a).target)},
$S:1}
A.jl.prototype={
$1(a){var s=0,r=A.T(t.H),q,p=this,o,n,m,l,k,j
var $async$$1=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:k=p.a
j=k.c
if(j==null){s=1
break}o=p.b.checked
n=o===!0?"leak":"normal"
s=3
return A.z($.K().bh(j,n),$async$$1)
case 3:if(c!=null){j=document
m=j.getElementById("modal-flow-rate")
if(m!=null)J.q(m,"Manual report")
k.e5(n)
k.F(n==="leak"?"Leak status saved for synchronization.":"Resolved status saved for synchronization.")
o=k.c
o.toString
k.dT(o)
l=t.aa.a(j.getElementById("log-resolved"))
if(l!=null)B.f.sdv(l,n==="normal")}case 1:return A.R(q,r)}})
return A.S($async$$1,r)},
$S:22}
A.jc.prototype={
$1(a){return this.eh(t.V.a(a))},
eh(a){var s=0,r=A.T(t.H),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d,c
var $async$$1=A.U(function(b,a0){if(b===1)return A.Q(a0,r)
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
break}g=A.aa(["house_id",c.c,"worker_id",c.a.h(0,"worker_id"),"description",l,"status_resolved",h,"date",new A.ag(Date.now(),0,!1).aa().a9()],t.N,t.z)
i=$.K()
s=3
return A.z(i.bt(g),$async$$1)
case 3:s=h?4:5
break
case 4:f=c.c
f.toString
s=6
return A.z(i.bh(f,"normal"),$async$$1)
case 6:e=k.a(o.getElementById("modal-leak-toggle"))
if(e!=null)B.f.sdv(e,!1)
c.e5("normal")
case 5:k=c.c
k.toString
if(i.a2(k)!=null){d=o.getElementById("modal-flow-rate")
if(d!=null)J.q(d,"Manual reading")}if(!m)B.o.sL(n,"")
c.F("Maintenance Log committed to database!")
o=c.c
o.toString
c.dT(o)
c.bH()
case 1:return A.R(q,r)}})
return A.S($async$$1,r)},
$S:4}
A.jd.prototype={
$1(a){return this.eg(t.V.a(a))},
eg(a){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b
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
h=h==null?null:B.a.A(h)
f=h}k=f==null?"":f
e=g==null?null:g.value
j=e==null?"Everyone":e
if(J.an(k)===0){c.F("Message cannot be empty")
s=1
break}i=window.localStorage.getItem("waterhall_jwt")
h=m.b
h.disabled=!0
p=4
s=7
return A.z($.K().br(k,A.w(c.a.h(0,"name")),j),$async$$1)
case 7:if(!J.j(i,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}if(l!=null)B.o.sL(l,"")
c.F("Announcement queued for "+A.e(j)+". Pending items retry when online.")
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
A.jz.prototype={
$0(){var s=document,r=t.L.a(s.activeElement)
if(r!=null)r.blur()
r=this.a.style
r.display="none"
s=s.getElementById("btn-web-forgot-password")
if(s!=null)J.o5(s)},
$S:2}
A.jA.prototype={
$1(a){var s,r
t.V.a(a).preventDefault()
s=document
r=s.getElementById("web-recovery-role")
if(r!=null)J.q(r,A.e5().gai().h(0,"role")==="resident"?"Resident account":"Worker account")
r=this.a.style
r.display="flex"
s=s.getElementById("btn-web-recover-cancel")
if(s!=null)J.o5(s)},
$S:1}
A.jB.prototype={
$1(a){t.V.a(a).preventDefault()
this.a.$0()},
$S:1}
A.jC.prototype={
$1(a){if(t.mT.a(a).key==="Escape")this.a.$0()},
$S:23}
A.ju.prototype={
$1(a){t.V.a(a)
if($.K().O())this.a.hi()},
$S:1}
A.jv.prototype={
$1(a){t.V.a(a)
return this.a.bv()},
$S:1}
A.jw.prototype={
$1(a){if(t.mT.a(a).key==="Escape")this.a.bv()},
$S:23}
A.jx.prototype={
$1(a){var s,r,q,p,o=t.S,n=o.a(J.rD(a)).checked===!0
for(s=["change-current-password","change-new-password","change-confirm-password"],r=0;r<3;++r){q=s[r]
p=o.a(document.getElementById(q))
B.f.sbg(p,n?"text":"password")}},
$S:3}
A.jy.prototype={
$1(a6){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
var $async$$1=A.U(function(a7,a8){if(a7===1){o.push(a8)
s=p}for(;;)switch(s){case 0:a6.preventDefault()
d=m.a
if(d.k4){s=1
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
if(!J.j(l,k)){J.q(c,"Passwords do not match.")
c.hidden=!1
s=1
break}a1=d.k3
j=a1==null?window.localStorage.getItem("waterhall_jwt"):a1
if(j==null){J.q(c,"Please sign in again.")
c.hidden=!1
s=1
break}i=d.ok
h=d.k3!=null
d.k4=!0
a0=m.d
a0.disabled=!0
B.k.sP(a0,"Saving\u2026")
p=4
a2=$.K()
a3=t.N
g=A.ao(a3,a3)
J.am(g,"Content-Type","application/json")
if(h)J.am(g,"Authorization","Bearer "+j)
f=A.ao(a3,t.x)
J.am(f,"new_password",l)
J.am(f,"confirm_password",k)
if(!h)J.am(f,"current_password",a.a(b.getElementById("change-current-password")).value)
s=7
return A.z(a2.ad("/api/password/change",!h,"POST",g,B.c.V(f)),$async$$1)
case 7:s=!J.j(i,d.ok)?8:9
break
case 8:s=!h&&window.localStorage.getItem("waterhall_jwt")===j?10:11
break
case 10:s=12
return A.z(a2.aM(),$async$$1)
case 12:case 11:n=[1]
s=5
break
case 9:s=13
return A.z(a2.aM(),$async$$1)
case 13:d.bv()
d.aj("Password saved. Sign in with your new password.",b.getElementById("login-error-msg"))
n.push(6)
s=5
break
case 4:p=3
a5=o.pop()
g=A.aq(a5)
if(g instanceof A.aG){e=g
if(!J.j(i,d.ok)){n=[1]
s=5
break}g=e.c
if(g==null)if(e.a===401)g="Sign-in expired. Return to Login and try again."
else if(e.a===429)g="Too many attempts. Please try again shortly."
else g=e.ge4()?"Unable to reach the server. Check your connection and retry.":"Unable to save the password. Please sign in again."
J.q(c,g)
c.hidden=!1}else throw a5
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
d.k4=!1
a0.disabled=!1
B.k.sP(a0,"Save New Password")
s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$$1,r)},
$S:22}
A.jm.prototype={
$1(a){return J.c8(t.h.a(a)).C(0,"active")},
$S:8}
A.kw.prototype={
$1(a){return J.c8(t.h.a(a)).C(0,"active")},
$S:8}
A.kx.prototype={
$1(a){return B.a.A(A.w(a)).length!==0},
$S:10}
A.ky.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.d(a,0)
s=a[0]}else s=""
return s},
$S:11}
A.kF.prototype={
$1(a){var s
t.h.a(a)
s=J.J(a)
if(a.getAttribute("data-target")===this.a)s.gap(a).m(0,"active")
else s.gap(a).C(0,"active")},
$S:8}
A.kG.prototype={
$2(a,b){var s
A.w(a)
t.h.a(b)
s=J.J(b)
if(a===this.a)s.gap(b).m(0,"active")
else s.gap(b).C(0,"active")},
$S:48}
A.k5.prototype={
$1(a){return J.j(J.i(t.P.a(a),"current_leak_status"),"leak")},
$S:0}
A.k6.prototype={
$1(a){var s,r,q
t.P.a(a)
s=document.createElement("div")
s.className="alert-item leak"
r=s.style
r.cursor="pointer"
r=J.x(a)
q=J.J(s)
q.sU(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.e(r.h(a,"owner_name"))+" ("+A.e(r.h(a,"purok"))+")</strong><br>\n              Reported leak. Field inspection required.\n            </div>\n          ")
q=q.gaO(s)
r=q.$ti
A.y(q.a,q.b,r.i("~(1)?").a(new A.k4(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:9}
A.k4.prototype={
$1(a){t.V.a(a)
this.a.cv(A.w(J.i(this.b,"house_id")))},
$S:1}
A.k7.prototype={
$1(a){var s,r,q
t.je.a(a)
s=document.createElement("div")
s.className="alert-item quality"
r=s.style
r.cursor="pointer"
r=J.x(a)
q=J.J(s)
q.sU(s,'            <div class="alert-item-icon">\n              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>\n            </div>\n            <div class="alert-item-text">\n              <strong>'+A.e(r.h(a,"name"))+"</strong><br>\n              "+A.e(r.h(a,"desc"))+"\n            </div>\n          ")
q=q.gaO(s)
r=q.$ti
A.y(q.a,q.b,r.i("~(1)?").a(new A.k3(this.a)),!1,r.c)
this.b.appendChild(s).toString},
$S:49}
A.k3.prototype={
$1(a){var s,r
t.V.a(a)
this.a.ak("view-dashboard")
s=document.getElementById("worker-telemetry-freshness")
if(s!=null){r=!!s.scrollIntoViewIfNeeded
r.toString
if(r)s.scrollIntoViewIfNeeded()
else s.scrollIntoView()}},
$S:1}
A.k8.prototype={
$2(a,b){var s,r,q,p,o,n
A.w(b)
s=document.getElementById("pin-p"+(a+1))
if(s!=null){r=s.querySelector(".pin-bg")
q=B.b.a6(this.b,new A.k1(b))
if(r!=null)if(q){r.setAttribute("fill","var(--alert-red)")
r.setAttribute("stroke","#FFF")
r.setAttribute("stroke-width","1.5")}else{r.setAttribute("fill","var(--alert-green)")
r.removeAttribute("stroke")}p=s.style
p.cursor="pointer"
p=J.J(s)
o=t.h.a(p.fN(s,!0))
p.dV(s,o)
p=J.a4(o)
n=p.$ti
A.y(p.a,p.b,n.i("~(1)?").a(new A.k2(this.a,b)),!1,n.c)}},
$S:50}
A.k1.prototype={
$1(a){var s
t.P.a(a)
s=J.x(a)
return J.j(s.h(a,"purok"),this.a)&&J.j(s.h(a,"current_leak_status"),"leak")},
$S:0}
A.k2.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Y
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.p.sL(q,this.b)
if(p!=null)B.p.sL(p,"all")
this.a.ak("view-directory")},
$S:1}
A.k9.prototype={
$1(a){var s,r,q,p,o,n
A.w(a)
s=this.b
r=A.D(s)
q=r.i("F(1)")
r=r.i("I<1>")
p=new A.I(s,q.a(new A.jZ(a)),r).gj(0)
o=new A.I(s,q.a(new A.k_(a)),r).gj(0)
n=document.createElement("div")
n.className="zone-card"
s=o>0?""+o+" Leaks":"Clear"
r=J.J(n)
r.sU(n,'          <div class="zone-card-header">\n            <span class="zone-name">'+a+'</span>\n          </div>\n          <div class="zone-stats">\n            <span>Meters: <strong>'+p+'</strong></span>\n            <span class="zone-leak-count">'+s+"</span>\n          </div>\n        ")
r=r.gaO(n)
s=r.$ti
A.y(r.a,r.b,s.i("~(1)?").a(new A.k0(this.a,a)),!1,s.c)
this.c.appendChild(n).toString},
$S:77}
A.jZ.prototype={
$1(a){return J.j(J.i(t.P.a(a),"purok"),this.a)},
$S:0}
A.k_.prototype={
$1(a){var s
t.P.a(a)
s=J.x(a)
return J.j(s.h(a,"purok"),this.a)&&J.j(s.h(a,"current_leak_status"),"leak")},
$S:0}
A.k0.prototype={
$1(a){var s,r,q,p
t.V.a(a)
s=document
r=t.Y
q=r.a(s.getElementById("filter-purok"))
p=r.a(s.getElementById("filter-status"))
if(q!=null)B.p.sL(q,this.b)
if(p!=null)B.p.sL(p,"all")
this.a.ak("view-directory")},
$S:1}
A.ka.prototype={
$1(a){var s,r,q,p,o
t.P.a(a)
s=B.b.dA(this.b,new A.jX(a),new A.jY())
r=J.x(s)
q=r.gT(s)?r.h(s,"owner_name"):"Unknown Household"
p=document.createElement("div")
r=J.x(a)
p.className="log-card "+(J.j(r.h(a,"status_resolved"),!0)?"resolved":"pending")
o=this.a.a5(r.h(a,"date"))
J.dk(p,'            <div class="log-card-header">\n              <span>'+A.e(q)+'</span>\n              <span style="font-size:10px; color:var(--text-muted)">'+o+'</span>\n            </div>\n            <div class="log-card-desc">'+A.e(r.h(a,"description"))+"</div>\n          ")
this.c.appendChild(p).toString},
$S:9}
A.jX.prototype={
$1(a){var s="house_id"
return J.j(J.i(t.P.a(a),s),J.i(this.a,s))},
$S:0}
A.jY.prototype={
$0(){return A.ao(t.N,t.z)},
$S:31}
A.kc.prototype={
$1(a){var s,r,q,p,o
t.P.a(a)
s=J.x(a)
r=this.a
q=B.a.v(J.M(s.h(a,"owner_name")).toLowerCase(),r)||B.a.v(J.M(s.h(a,"account_number")).toLowerCase(),r)||B.a.v(J.M(s.h(a,"house_id")).toLowerCase(),r)
r=this.b
p=r==="all"||J.j(s.h(a,"purok"),r)
r=this.c
o=r==="all"||J.j(s.h(a,"current_leak_status"),r)
return q&&p&&o},
$S:0}
A.kd.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j="current_leak_status",i="current_m3_usage"
t.P.a(a)
s=document.createElement("div")
r=J.x(a)
s.className="household-card "+(J.j(r.h(a,j),"leak")?"has-leak":"")
q=A.e(r.h(a,"owner_name"))
p=A.e(r.h(a,"purok"))
o=A.e(r.h(a,"account_number"))
n=A.e(r.h(a,i))
m=A.e(r.h(a,j))
l=J.j(r.h(a,j),"leak")?'<svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg> Leak':'<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Normal'
k=J.J(s)
k.sU(s,'          <div class="household-info">\n            <span class="household-name">'+q+'</span>\n            <div class="household-meta">\n              <span class="household-purok">'+p+'</span>\n              <span class="household-acct">'+o+'</span>\n            </div>\n            <div class="household-usage">Usage this Month: <strong>'+n+' m\xb3</strong></div>\n          </div>\n          <div class="household-status-section">\n            <span class="status-indicator '+m+'">\n              '+l+'\n            </span>\n            <span class="household-flow">Meter: <span>'+A.e(r.h(a,i))+" m\xb3</span></span>\n          </div>\n        ")
k=k.gaO(s)
r=k.$ti
A.y(k.a,k.b,r.i("~(1)?").a(new A.kb(this.a,a)),!1,r.c)
this.b.appendChild(s).toString},
$S:9}
A.kb.prototype={
$1(a){t.V.a(a)
this.a.cv(A.w(J.i(this.b,"house_id")))},
$S:1}
A.jR.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.ak("view-directory")
s.c=null},
$S:1}
A.kq.prototype={
$2(a,b){A.ab(a)
A.ab(b)
return a>b?a:b},
$S:53}
A.kr.prototype={
$1(a){var s,r,q
t.if.a(a)
s=a.a
r=a.b
q=this.a.length
return A.aa(["x",20+(q===1?0.5:s/(q-1))*300,"y",80-r/this.b*60,"val",r,"label",""+(s+1)],t.N,t.K)},
$S:54}
A.ks.prototype={
$1(a){var s
t.c.a(a)
s=J.x(a)
return B.d.G(A.ab(s.h(a,"x")),1)+","+B.d.G(A.ab(s.h(a,"y")),1)},
$S:30}
A.kt.prototype={
$1(a){var s
t.c.a(a)
s=J.x(a)
return"L "+B.d.G(A.ab(s.h(a,"x")),1)+","+B.d.G(A.ab(s.h(a,"y")),1)},
$S:30}
A.ku.prototype={
$1(a){var s,r
t.c.a(a)
s=this.a
r=J.x(a)
s.a=s.a+('        <text x="'+A.e(r.h(a,"x"))+'" y="96" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-weight="600">'+A.e(r.h(a,"label"))+'</text>\n        <line x1="'+A.e(r.h(a,"x"))+'" y1="'+A.e(r.h(a,"y"))+'" x2="'+A.e(r.h(a,"x"))+'" y2="80" stroke="rgba(249,115,22,0.2)" stroke-width="1" stroke-dasharray="2 2" />\n        <circle cx="'+A.e(r.h(a,"x"))+'" cy="'+A.e(r.h(a,"y"))+'" r="4" fill="var(--white)" stroke="'+this.b+'" stroke-width="2" />\n        <text x="'+A.e(r.h(a,"x"))+'" y="'+A.e(A.ab(r.h(a,"y"))-8)+'" text-anchor="middle" fill="var(--navy-primary)" font-size="9" font-weight="700">'+A.e(r.h(a,"val"))+"m\xb3</text>\n      ")},
$S:67}
A.ke.prototype={
$1(a){return J.j(J.i(t.P.a(a),"house_id"),this.a)},
$S:0}
A.kf.prototype={
$1(a){var s,r,q,p,o,n,m="status_resolved"
t.P.a(a)
s=document.createElement("div")
r=J.x(a)
s.className="log-card "+(J.j(r.h(a,m),!0)?"resolved":"pending")
q=this.a.a5(r.h(a,"date"))
p=A.e(r.h(a,"worker_id"))
o=A.e(r.h(a,"description"))
n=J.j(r.h(a,m),!0)?"var(--alert-green)":"var(--amber-safety)"
r=J.j(r.h(a,m),!0)?"Resolved":"In Progress (Active Monitoring)"
J.dk(s,'          <div class="log-card-header">\n            <span>Tech: <strong>'+p+'</strong></span>\n            <span style="font-size:10px; color:var(--text-muted)">'+q+'</span>\n          </div>\n          <div class="log-card-desc">'+o+'</div>\n          <div style="font-size: 9px; font-weight:700; color:'+n+'; margin-top:4px; text-transform:uppercase">\n            Status: '+r+"\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:9}
A.kg.prototype={
$1(a){return B.a.A(A.w(a)).length!==0},
$S:10}
A.kh.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.d(a,0)
s=a[0]}else s=""
return s},
$S:11}
A.ki.prototype={
$1(a){var s,r="worker_id"
t.P.a(a)
s=J.x(a)
return J.j(s.h(a,r),this.a.a.h(0,r))&&J.j(s.h(a,"status_resolved"),!0)},
$S:0}
A.jE.prototype={
$1(a){var s=this.a
s.p2=0
s.al()
s.ct()},
$S:3}
A.jF.prototype={
$1(a){var s,r=this.a;++r.p3
r.p2=0
s=r.RG
if(s!=null)s.a3(0)
r.al()
r.RG=A.fV(B.a9,new A.jD(r))},
$S:3}
A.jD.prototype={
$0(){return this.a.ct()},
$S:2}
A.jG.prototype={
$1(a){var s,r,q
t.V.a(a)
s=this.a
r=s.ck().length
q=s.p2+25
if(r>q){s.p2=q
s.al()}else s.bb(!0)},
$S:1}
A.jH.prototype={
$1(a){var s
t.V.a(a)
s=this.a
s.p2=B.e.ci(s.p2-25,0,1e6)
s.al()},
$S:1}
A.jn.prototype={
$1(a){var s,r
t.P.a(a)
s=this.a
if(s==="All"||J.j(J.i(a,"sync_status"),s)){s=J.x(a)
r=s.h(a,"family_head_name")
if(r==null){s=$.K().a2(A.e(s.h(a,"house_id")))
s=s==null?null:J.i(s,"owner_name")}else s=r
s=B.a.v(J.M(s==null?"":s).toLowerCase(),this.b)}else s=!1
return s},
$S:0}
A.kv.prototype={
$2(a,b){var s,r,q
A.w(a)
if(b==null||A.e(b).length===0)return
s=document
r=s.createElement("div")
r.toString
q=s.createElement("span")
q.toString
B.u.sP(q,a)
r.appendChild(q).toString
s=s.createElement("span")
s.toString
B.u.sP(s,A.e(b))
r.appendChild(s).toString
this.a.appendChild(r).toString},
$S:6}
A.jo.prototype={
$1(a){var s,r,q,p,o,n,m
t.V.a(a)
s=this.a.to=this.b
r=document
q=t.S.a(r.getElementById("bill-meter-search"))
B.f.sL(q,"")
p=s==="name"
q.placeholder=p?"Type any part of the household name":"Type any part of HH-\u2026"
q.setAttribute("aria-label",p?"Search by Name":"Search by ID")
for(p=["name","id"],o=0;o<2;++o){n=p[o]
m=r.getElementById("bill-search-"+n)
if(m!=null)m.setAttribute("aria-pressed",""+(n===s))}s=r.getElementById("bill-meter-results")
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.jp.prototype={
$1(a){return this.a.cN()},
$S:3}
A.jq.prototype={
$1(a){return this.a.cN()},
$S:3}
A.jr.prototype={
$1(a){return this.a.bJ()},
$S:3}
A.js.prototype={
$1(a){var s=t.mV.a(A.oD(t.V.a(a).target)),r=!1
if(s!=null)if(!B.f.v(this.a,s)){r=this.b
r=r!=null&&!J.o3(r,s)}if(r){r=this.b.style
r.display="none"}},
$S:1}
A.jt.prototype={
$1(a){t.V.a(a)
return this.a.bj()},
$S:1}
A.kz.prototype={
$1(a){var s
t.P.a(a)
s=J.i(a,this.a.to==="name"?"owner_name":"house_id")
return B.a.v(J.M(s==null?"":s).toLowerCase(),this.b)},
$S:0}
A.kA.prototype={
$1(a){var s,r,q,p=this,o="house_id"
t.V.a(a)
s=p.c
r=J.x(s)
B.f.sL(p.b,A.e(r.h(s,"owner_name"))+" ("+A.e(r.h(s,o))+")")
q=p.d.style
q.display="none"
p.a.bG(A.ak(r.h(s,o)))},
$S:1}
A.jT.prototype={
$1(a){var s
t.P.a(a)
s=J.x(a)
return J.j(s.h(a,"house_id"),this.a.rx)&&!B.a.N(A.e(s.h(a,"bill_id")),"PENDING-")},
$S:0}
A.jU.prototype={
$2(a,b){var s=t.P
s.a(a)
return B.a.a1(A.e(J.i(s.a(b),"date")),A.e(J.i(a,"date")))},
$S:12}
A.jV.prototype={
$1(a){return!J.j(J.i(t.P.a(a),"status"),"Paid")},
$S:0}
A.jW.prototype={
$2(a,b){var s
A.ab(a)
s=A.ns(J.i(t.P.a(b),"total_due"))
return a+(s==null?0:s)},
$S:58}
A.kH.prototype={
$2(a,b){var s=document.getElementById(a)
if(s!=null)J.q(s,b)},
$S:7}
A.jS.prototype={
$1(a){var s,r,q,p,o,n="status"
t.P.a(a)
s=document.createElement("div")
r=J.x(a)
s.className="bill-record-card "+A.e(r.h(a,n))
q=this.a.a5(r.h(a,"date"))
p=A.e(r.h(a,"billing_month"))
o=J.j(r.h(a,n),"Paid")?"var(--alert-green)":"var(--amber-safety)"
J.dk(s,'          <div class="bill-record-header">\n            <span>Cycle: '+p+'</span>\n            <span style="color:'+o+'">'+J.M(r.h(a,n)).toUpperCase()+'</span>\n          </div>\n          <div class="bill-record-details">\n            <span>Readings: '+B.d.G(A.ab(r.h(a,"previous_reading")),1)+" \u2192 "+B.d.G(A.ab(r.h(a,"current_reading")),1)+" m\xb3</span>\n            <strong>\u20b1"+B.d.G(A.ab(r.h(a,"total_due")),2)+'</strong>\n          </div>\n          <div style="font-size:9px;color:var(--text-muted);margin-top:2px;display:flex;justify-content:space-between">\n            <span>'+q+" ("+A.e(r.h(a,"bill_id"))+")</span>\n            <span>Tech: "+A.e(r.h(a,"billed_by"))+"</span>\n          </div>\n        ")
this.b.appendChild(s).toString},
$S:9}
A.kE.prototype={
$0(){J.c8(this.a).C(0,"show")},
$S:2}
A.kB.prototype={
$1(a){return J.c8(t.h.a(a)).C(0,"active")},
$S:8}
A.kC.prototype={
$1(a){return B.a.A(A.w(a)).length!==0},
$S:10}
A.kD.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.d(a,0)
s=a[0]}else s=""
return s},
$S:11}
A.j2.prototype={
$4(a,b,c,d){var s,r=this.a&&typeof b=="number"&&isFinite(b),q=r?B.d.G(b,c)+d:"N/A",p=a==null
if((p?null:a.textContent)!==q)if(!p)J.q(a,q)
if(!p){p=a.parentElement
if(p!=null){p=p.querySelector("small")
if(p!=null){p=p.style
p.toString
s=r?"":"none"
p.display=s}}}},
$3(a,b,c){return this.$4(a,b,c,"")},
$S:59}
A.kj.prototype={
$1(a){return B.a.A(A.w(a)).length!==0},
$S:10}
A.kk.prototype={
$1(a){var s
A.w(a)
s=a.length
if(s!==0){if(0>=s)return A.d(a,0)
s=a[0]}else s=""
return s},
$S:11}
A.kl.prototype={
$1(a){return A.e(J.i(t.P.a(a),"status")).toLowerCase()!=="paid"},
$S:0}
A.km.prototype={
$1(a){return J.j(J.i(t.P.a(a),"billing_month"),this.a)},
$S:0}
A.kn.prototype={
$2(a,b){var s=document.getElementById(a)
if(s!=null)J.q(s,b)},
$S:7}
A.ko.prototype={
$2(a,b){return a==null?"--":B.d.G(A.bL(A.e(a)),b)},
$S:60}
A.kp.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c="status",b="payment_date"
t.P.a(a)
s=document
r=s.createElement("div")
q=J.x(a)
r.className="bill-record-card "+A.e(q.h(a,c))
p=this.a
o=p.a5(q.h(a,"date"))
n=A.e(q.h(a,"billing_month"))
m=J.j(q.h(a,c),"Paid")?"var(--alert-green)":"var(--amber-safety)"
l=J.M(q.h(a,c))
k=B.d.G(A.ab(q.h(a,"previous_reading")),1)
j=B.d.G(A.ab(q.h(a,"current_reading")),1)
i=B.d.G(A.ab(q.h(a,"consumption")),1)
h=B.d.G(A.ab(q.h(a,"total_due")),2)
g=A.e(q.h(a,"bill_id"))
if(J.j(q.h(a,c),"Paid")){f=q.h(a,b)
f=J.M(f==null?"":f).length!==0}else f=!1
p=f?" | Paid: "+p.a5(q.h(a,b)):""
J.dk(r,'        <div class="bill-record-header">\n          <span>Cycle: '+n+'</span>\n          <span style="color:'+m+'">'+l.toUpperCase()+'</span>\n        </div>\n        <div class="bill-record-details">\n          <span>Usage: '+k+" \u2192 "+j+" m\xb3 ("+i+" m\xb3)</span>\n          <strong>\u20b1"+h+'</strong>\n        </div>\n        <div style="font-size:9px;color:var(--text-muted);margin-top:2px;">\n          Bill Ref ID: '+g+" | Issued: "+o+p+"\n        </div>\n      ")
e=t.eO.a(q.h(a,"billing_breakdown"))
d=s.createElement("p")
s=d.style
s.fontSize="11px"
if(e==null)s="Legacy bill: rate breakdown unavailable. Original total retained."
else{s=J.x(e)
s="Recorded: base PHP "+A.e(s.h(e,"base_rate"))+" (includes "+A.e(s.h(e,"included_m3"))+" m\xb3), excess "+A.e(s.h(e,"excess_m3"))+" m\xb3 x PHP "+A.e(s.h(e,"excess_rate"))+" = PHP "+A.e(s.h(e,"excess_charge"))+", environmental fee PHP "+A.e(s.h(e,"environmental_fee"))+"."}B.m.sP(d,s)
r.appendChild(d).toString
this.b.appendChild(r).toString},
$S:9}
A.iY.prototype={
$1(a){var s,r
t.h.a(a)
s=J.a4(a)
r=s.$ti
A.y(s.a,s.b,r.i("~(1)?").a(new A.iX(a)),!1,r.c)},
$S:8}
A.iX.prototype={
$1(a){var s,r,q,p,o
t.V.a(a).preventDefault()
s=t.k.a(this.a)
r=document
r.toString
q=s.getAttribute("data-"+new A.hf(new A.ee(s)).b5("togglePassword"))
p=t.G.a(r.getElementById(q==null?"":q))
if(p==null)return
o=p.type==="password"
B.f.sbg(p,o?"text":"password")
B.k.sP(s,o?"Hide":"Show")},
$S:1}
A.iZ.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.j_.prototype={
$1(a){return this.ee(t.V.a(a))},
ee(a){var s=0,r=A.T(t.H),q=1,p=[],o=this,n,m,l,k,j,i,h,g,f
var $async$$1=A.U(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:g=o.a
if(g!=null){g=g.style
g.display="flex"}g=o.b
k=g==null
if(!k)J.q(g,"Loading available puroks...")
q=3
s=6
return A.z($.K().fF("/api/puroks",!1),$async$$1)
case 6:n=c
m=t.g.a(document.getElementById("reg-res-purok"))
j=m
j.children.toString
J.ir(j)
j=n.responseText
j.toString
j=J.aF(t.R.a(J.i(B.c.J(0,j),"puroks")))
while(j.p()){l=j.gt(j)
J.rr(m,A.tc(A.e(l),A.e(l),null,!1))}if(!k){A.eL(t.af,t.h,"T","querySelectorAll")
i=new A.bm(J.rn(m,"option"),t.gp)
J.q(g,new A.e3(t.e3.a(i.av(i)),t.eG).gj(0)===0?"No puroks configured. Contact the administrator.":"")}q=1
s=5
break
case 3:q=2
f=p.pop()
if(!k)J.q(g,"Registration needs an internet connection. Please retry.")
s=5
break
case 2:s=1
break
case 5:return A.R(null,r)
case 1:return A.Q(p.at(-1),r)}})
return A.S($async$$1,r)},
$S:4}
A.j0.prototype={
$1(a0){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a
var $async$$1=A.U(function(a1,a2){if(a1===1){o.push(a2)
s=p}for(;;)switch(s){case 0:a0.preventDefault()
h=m.a
g=!0
if(h!=null){f=h.disabled
f.toString
if(!f){g=m.b.checkValidity()
g.toString
g=!g}}if(g){s=1
break}l=new A.j1()
if(!J.j(l.$1("reg-password"),l.$1("reg-verify-password"))){h=m.c
if(h!=null)J.q(h,"Passwords do not match.")
s=1
break}h.disabled=!0
g=m.c
f=g==null
if(!f)J.q(g,"Submitting registration...")
p=4
e=t.N
s=7
return A.z($.K().ad("/api/residents/register",!1,"POST",A.aa(["Content-Type","application/json"],e,e),B.c.V(A.aa(["owner_name",J.p0(l.$1("reg-res-name")),"contact",J.p0(l.$1("reg-contact")),"purok",t.g.a(document.getElementById("reg-res-purok")).value,"password",l.$1("reg-password"),"verify_password",l.$1("reg-verify-password")],e,t.x))),$async$$1)
case 7:k=a2
e=k.responseText
e.toString
j=B.c.J(0,e)
e=!0
if(k.status===201)if(t.f.b(j))if(J.j(J.i(j,"status"),"success"))if(J.j(J.i(j,"account_status"),"pending"))if(typeof J.i(j,"house_id")=="string"){d=A.dX("^HH-[1-9][0-9]{0,9}$")
c=A.w(J.i(j,"house_id"))
if(d.b.test(c))if(typeof J.i(j,"account_number")=="string"){e=A.dX("^[A-Za-z0-9][A-Za-z0-9-]{0,99}$")
d=A.w(J.i(j,"account_number"))
e=!e.b.test(d)||!J.j(J.i(j,"resident_id"),J.i(j,"account_number"))}}if(e){e=A.p1(k.status,null)
throw A.b(e)}m.b.reset()
if(!f)J.q(g,"Registration submitted. Resident ID: "+A.e(J.i(j,"house_id"))+". Meter ID: "+A.e(J.i(j,"account_number"))+". Wait for Admin approval before signing in.")
n.push(6)
s=5
break
case 4:p=3
a=o.pop()
e=A.aq(a)
if(e instanceof A.aG){i=e
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
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$$1,r)},
$S:22}
A.j1.prototype={
$1(a){var s=t.S.a(document.getElementById(a)).value
return s==null?"":s},
$S:11}
A.iC.prototype={
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
else{q=J.i(p,"owner_name")
q=q==null?null:J.M(q)}if(q==null){s=s.c
s.toString}else s=q
B.f.sL(r,s)}s=this.b
if(s!=null)B.f.sL(s,"")
s=this.c
if(s!=null){s=s.style
s.display="flex"}},
$S:1}
A.iD.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s!=null){s=s.style
s.display="none"}},
$S:1}
A.iE.prototype={
$1(a){return this.ed(t.V.a(a))},
ed(a1){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0
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
if(typeof a!=="number"){q=a.hD()
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
return A.z($.K().bE(l,j,h,k),$async$$1)
case 7:g=a3
if(!J.j(i,window.localStorage.getItem("waterhall_jwt"))||b.a==null){n=[1]
s=5
break}d=m.e
if(d!=null){d=d.style
d.display="none"}b.F("Collection recorded! TxID: "+A.e(J.i(g,"transaction_id")))
b.cv(h)
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
A.iV.prototype={
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
s.setItem("waterhall_resident_report_draft",B.c.V(A.aa(["owner",r,"category",q,"description",p,"photo",o,"file_name",n,"operation_id",l.as,"picker_pending",l.r!=null],t.N,t.X)))}catch(m){l.F("Device storage is full. Keep this screen open to retain your draft.")}},
$S:2}
A.iW.prototype={
$2(a,b){var s,r,q,p,o
this.a.f=a
s=document
r=s.getElementById("resident-photo-name")
if(r!=null)J.q(r,b)
q=s.getElementById("resident-photo-preview")
r=q==null
if(!r)J.cH(q).X(0)
if(!r){p=q.style
p.display="block"}o=A.ph(a)
B.J.sfE(o,"Selected evidence preview")
if(!r)q.appendChild(o).toString
r=s.getElementById("resident-photo-preview-card")
if(r!=null){r=r.style
r.display="block"}s=s.getElementById("resident-photo-pickers")
if(s!=null){s=s.style
s.display="none"}},
$S:7}
A.iy.prototype={
ea(a2,a3){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
var $async$$2=A.U(function(a4,a5){if(a4===1){o.push(a5)
s=p}for(;;)switch(s){case 0:a=m.a
a0=++a.x
a.y=!0
l=window.localStorage.getItem("waterhall_jwt")
p=4
k=A.dX("^data:image/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$").dz(a2)
if(k==null)throw A.b(B.w)
if(a2.length<=2796302){e=k.b
if(2>=e.length){q=A.d(e,2)
n=[1]
s=5
break}e=e[2]
e.toString
e=B.v.aB(e).length>2097152}else e=!0
if(e){e=A.O("Photo too large")
throw A.b(e)}j=A.ph(null)
i=new A.bH(new A.X($.V,t.cU),t.ou)
e=t.h
d=t.E
c=d.i("~(1)?")
d=d.c
h=A.y(e.a(j),"load",c.a(new A.iz(i)),!1,d)
g=A.y(e.a(j),"error",c.a(new A.iA(i)),!1,d)
p=7
J.rK(j,a2)
s=10
return A.z(i.a.e1(0,B.G),$async$$2)
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
return A.z(J.is(h),$async$$2)
case 11:s=12
return A.z(J.is(g),$async$$2)
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
f=A.aq(a1)
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
$2(a,b){return this.ea(a,b)},
$S:61}
A.iz.prototype={
$1(a){var s=this.a
if((s.a.a&30)===0)s.fO(0)},
$S:3}
A.iA.prototype={
$1(a){var s=this.a
if((s.a.a&30)===0)s.bw(B.w)},
$S:3}
A.iK.prototype={
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
A.iU.prototype={
$2(a,b){var s,r,q,p,o,n="NativePhotoPicker",m=this.a
if(m.d==null||m.z||!$.K().O())return
r=$.bu()
if(!r.ba(n)){m=a==null
if(!m)B.f.sL(a,"")
if(!m)a.click()
return}if(m.r!=null)return
s=""+1000*Date.now()+"-"+ ++m.w
m.r=s
q=this.b
q.$0()
try{p=t.N
r.h(0,n).ao("postMessage",A.B([B.c.V(A.aa(["request_id",s,"source",b],p,p))],t.s))}catch(o){m.r=null
q.$0()
m.F("Could not open the photo picker. Please try again.")}},
$S:63}
A.iB.prototype={
$0(){var s,r,q=this,p=q.a;++p.x
p.y=!1
p.f=null
p=q.b
if(p!=null)B.f.sL(p,"")
p=q.c
if(p!=null)B.f.sL(p,"")
p=q.d
if(p!=null)B.f.sL(p,"")
p=document
s=p.getElementById("resident-photo-name")
if(s!=null)J.q(s,"No file chosen")
r=p.getElementById("resident-photo-preview")
if(r!=null)J.cH(r).X(0)
s=p.getElementById("resident-photo-preview-card")
if(s!=null){s=s.style
s.display="none"}p=p.getElementById("resident-photo-pickers")
if(p!=null){p=p.style
p.display="flex"}},
$S:2}
A.iT.prototype={
$1(a){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c
var $async$$1=A.U(function(b,a0){if(b===1){o.push(a0)
s=p}for(;;)switch(s){case 0:d=m.a
if(d.d==null||d.z){s=1
break}h=a==null?null:a.files
if(h==null||h.length===0){s=1
break}l=B.ac.gD(h)
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
B.ad.hl(g,l)
i=g
s=7
return A.z(new A.cs(t.iB.a(i),"load",!1,t.h6).gD(0).e1(0,B.G),$async$$1)
case 7:if(!J.j(j,d.x)||!J.j(k,window.localStorage.getItem("waterhall_jwt"))){n=[1]
s=5
break}g=A.w(J.rA(i))
f=l.name
f.toString
s=8
return A.z(m.b.$2(g,f),$async$$1)
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
A.iL.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iM.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iN.prototype={
$1(a){return this.a.$1(this.b)},
$S:3}
A.iO.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iP.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"camera")},
$S:1}
A.iQ.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iR.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"gallery")},
$S:1}
A.iF.prototype={
$1(a){t.V.a(a)
return this.a.$2(this.b,"camera")},
$S:1}
A.iG.prototype={
$1(a){var s
t.V.a(a)
s=this.a
if(s.z)return
s.as=s.r=null
this.b.$0()
this.c.$0()
s.F("Photo removed.")},
$S:1}
A.iS.prototype={
$1(a){var s,r=this.a
r.as=null
s=r.ax
if(s!=null)s.a3(0)
r.ax=A.fV(B.aa,this.b)},
$S:3}
A.iH.prototype={
$0(){var s,r,q,p,o=this,n="category",m=o.a
if(m.d==null)return
o.b.$0()
try{r=window.localStorage.getItem("waterhall_resident_report_draft")
s=B.c.J(0,r==null?"{}":r)
if(!J.j(J.i(s,"owner"),A.b6()))return
r=o.c
if(r!=null){q=A.ak(J.i(s,"description"))
B.o.sL(r,q==null?"":q)}if(typeof J.i(s,n)=="string"){r=o.d
if(r!=null)B.p.sL(r,A.ak(J.i(s,n)))}m.as=A.ak(J.i(s,"operation_id"))
if(typeof J.i(s,"photo")=="string"){r=A.w(J.i(s,"photo"))
q=A.ak(J.i(s,"file_name"))
if(q==null)q="Selected photo"
o.e.$2(r,q)}if(J.j(J.i(s,"picker_pending"),!0))o.f.$2(null,"recover")}catch(p){m.F("Draft could not be restored. Please select your photo again.")}},
$S:2}
A.iI.prototype={
$1(a){return this.ec(t.V.a(a))},
ec(a9){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
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
c=c==null?null:B.a.A(c)
a0=c}j=a0==null?"":a0
if(J.an(j)===0){a7.F("Please provide details for the report!")
s=1
break}if(!$.K().O()){s=1
break}i=window.localStorage.getItem("waterhall_jwt")
if(a7.as==null)a7.as=A.ip()
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
a3=A.a3(new A.I(new A.bm(c,a1),a1.i("F(m.E)").a(new A.ix()),a2),a2.i("h.E"))
g=a3
for(c=g,a1=c.length,a4=0;a4<c.length;c.length===a1||(0,A.at)(c),++a4)c[a4].setAttribute("disabled","")
p=4
c=$.K()
a1=a7.d
a1.toString
a2=a7.f
a5=a7.as
a5.toString
s=7
return A.z(c.bk(a1,k,j,a2,a5),$async$$1)
case 7:f=b1
if(!J.j(i,window.localStorage.getItem("waterhall_jwt"))||a7.d==null){n=[1]
s=5
break}if(!f)throw A.b(B.q)
a7.F("Report submitted successfully.")
if(l!=null)B.o.sL(l,"")
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
c=A.aq(a8)
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
for(a7=g,c=a7.length,a4=0;a4<a7.length;a7.length===c||(0,A.at)(a7),++a4){d=a7[a4]
d.removeAttribute("disabled")}}s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$$1,r)},
$S:4}
A.ix.prototype={
$1(a){var s
t.h.a(a)
s=a.id
s.toString
if(s!=="btn-resident-logout"){s=a.hasAttribute("disabled")
s.toString
s=!s}else s=!1
return s},
$S:65}
A.iJ.prototype={
$1(a){return this.eb(t.V.a(a))},
eb(a){var s=0,r=A.T(t.H),q=this,p
var $async$$1=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:p=q.a
p.F("Testing server connection...")
s=2
return A.z($.K().be(),$async$$1)
case 2:if(c)p.F("Server connected! Online sync active.")
else p.F("Server unreachable. Continuing in offline mode.")
return A.R(null,r)}})
return A.S($async$$1,r)},
$S:4}
A.aG.prototype={
ge4(){var s=this.a
return s==null||s===429||s>=500},
l(a){return"API request was not completed."}}
A.kP.prototype={
dq(a){return this.ch=this.ch.du(new A.kS()).e0(new A.kT(a),t.H)},
aX(a){return this.er(a)},
er(a){var s=0,r=A.T(t.H),q=1,p=[],o=this,n,m,l
var $async$aX=A.U(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:m=++o.ay
window.localStorage.setItem("waterhall_jwt",a)
o.y=null
q=3
s=6
return A.z(o.dq(a),$async$aX)
case 6:if(!J.j(m,o.ay)||!o.O())throw A.b(B.i)
q=1
s=5
break
case 3:q=2
l=p.pop()
s=J.j(m,o.ay)?7:8
break
case 7:s=9
return A.z(o.aq(!0),$async$aX)
case 9:case 8:throw A.b(B.i)
s=5
break
case 2:s=1
break
case 5:return A.R(null,r)
case 1:return A.Q(p.at(-1),r)}})
return A.S($async$aX,r)},
aq(a){var s=0,r=A.T(t.H),q=1,p=[],o=this,n,m,l,k
var $async$aq=A.U(function(b,c){if(b===1){p.push(c)
s=q}for(;;)switch(s){case 0:++o.ay
o.z=!1
o.as=o.Q=null
o.ax.X(0)
n=window
n.toString
m=document.createEvent("Event")
m.toString
J.rm(m,"waterhall-session-ending",!0,!0)
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
o.dw()
o.y=a?"Session expired. Please sign in again.":null
n=o.CW
if(n!=null)n.$1(a)
n=o.cx
n.m(0,o.Y())
q=3
s=6
return A.z(o.dq(null),$async$aq)
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
return A.S($async$aq,r)},
aM(){return this.aq(!1)},
O(){if(A.cF())return!0
if(window.localStorage.getItem("waterhall_jwt")!=null||window.localStorage.getItem("waterhall_session")!=null||window.localStorage.getItem("waterhall_resident_session")!=null)this.aq(!0)
return!1},
c_(){var s=this
s.x=!1
s.y="Server unavailable. Pending operations remain saved and will retry."
s.cx.m(0,s.Y())},
ad(a,b,c,d,e){return this.fG(a,b,c,t.lG.a(d),e)},
dr(a){return this.ad(a,!0,"GET",null,null)},
cf(a,b,c,d){return this.ad(a,!0,b,c,d)},
fF(a,b){return this.ad(a,b,"GET",null,null)},
fG(b0,b1,b2,b3,b4){var s=0,r=A.T(t.la),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9
var $async$ad=A.U(function(b6,b7){if(b6===1){o.push(b7)
s=p}for(;;)switch(s){case 0:a6=A.e5().dW(b0)
a7=J.rz(a6)
a8=A.e5()
if(a7!==a8.gcw(a8)||!B.a.N(J.o7(a6),"/api/"))throw A.b(B.q)
if(b1&&!m.O())throw A.b(B.i)
l=m.ay
k=window.localStorage.getItem("waterhall_jwt")
a7=new XMLHttpRequest()
a7.toString
j=a7
i=new A.bH(new A.X($.V,t.ax),t.cz)
h=A.B([],t.dw)
g=null
f=new A.l_(i)
p=4
J.rF(j,b2,b0)
if(b3==null){a7=t.N
a7=A.ao(a7,a7)}else a7=b3
a7.q(0,J.rC(j))
if(b1)J.rL(j,"Authorization","Bearer "+A.e(k))
a7=t.iB
a8=t.gn
a3=t.I
J.o2(h,A.y(a7.a(j),"load",a8.a(new A.kW(i,j)),!1,a3))
J.o2(h,A.y(a7.a(j),"error",a8.a(new A.kX(f)),!1,a3))
J.o2(h,A.y(a7.a(j),"abort",a8.a(new A.kY(f)),!1,a3))
g=A.fV(B.a8,new A.kZ(f,j))
J.rI(j,b4)
s=7
return A.z(i.a,$async$ad)
case 7:e=b7
if(b1)a7=!J.j(l,m.ay)||!m.O()
else a7=!1
if(a7)throw A.b(B.i)
if(e.status===401&&b1){m.aq(!0)
throw A.b(B.U)}a7=!0
if(e.status!=null){a8=e.status
a8.toString
if(a8>=200){a7=e.status
a7.toString
a7=a7>=300}}if(a7){d=null
if(!b1&&J.o7(a6)==="/api/login"){d=e.status===429?"Too many attempts. Please try again in 5 minutes.":"Invalid credentials."
try{a7=e.responseText
c=B.c.J(0,a7==null?"{}":a7)
b=J.i(c,"attempts_remaining")
if(e.status===401&&A.eI(b)&&b>=0&&b<=4)d="Invalid credentials. "+A.e(b)+" attempts remaining."
if(e.status===401&&J.j(J.i(c,"msg"),"Temporary password expired. Contact your administrator."))d=A.ak(J.i(c,"msg"))
if(e.status===403)d=J.j(J.i(c,"account_status"),"pending")?"Registration is pending Admin approval.":"Registration was rejected. Contact the administrator."}catch(b5){}}if(J.o7(a6)==="/api/password/change"&&e.status===400)try{a7=e.responseText
a=J.i(B.c.J(0,a7==null?"{}":a7),"msg")
if(B.b.v(A.B(["Passwords do not match","Current password is incorrect","Choose a different password","Password must contain 12 to 128 characters"],t.s),a))d=A.ak(a)}catch(b5){}a7=e.status===0?null:e.status
a7=A.p1(a7,d)
throw A.b(a7)}q=e
n=[1]
s=5
break
n.push(6)
s=5
break
case 4:p=3
a9=o.pop()
a0=A.aq(a9)
if(!J.j(l,m.ay))throw A.b(B.i)
a1=a0 instanceof A.aG?a0:B.q
if(!a1.b&&a1.ge4())m.c_()
throw A.b(a1)
n.push(6)
s=5
break
case 3:n=[2]
case 5:p=2
a7=g
if(a7!=null)J.is(a7)
a7=h,a8=a7.length,a5=0
case 8:if(!(a5<a7.length)){s=10
break}a2=a7[a5]
s=11
return A.z(J.is(a2),$async$ad)
case 11:case 9:a7.length===a8||(0,A.at)(a7),++a5
s=8
break
case 10:s=n.pop()
break
case 6:case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$ad,r)},
Y(){var s,r,q,p,o,n,m=this,l=m.aT().length+m.ah().length,k=m.x
if(!k)s="offline"
else if(m.db)s="syncing"
else s=l>0?"pending_sync":"synced"
r=m.db||m.cy
q=A.cF()
p=m.aT()
o=A.D(p)
o=new A.I(p,o.i("F(1)").a(new A.le()),o.i("I<1>")).gj(0)
p=m.ah()
n=A.D(p)
return A.aa(["status",s,"isOnline",k,"isSyncing",r,"authenticated",q,"reviewCount",o+new A.I(p,n.i("F(1)").a(new A.lf()),n.i("I<1>")).gj(0),"pendingCount",l,"error",m.y],t.N,t.z)},
fC(){var s=window.localStorage.getItem("waterhall_unsynced_actions")
s=J.c9(t.j.a(B.c.J(0,s==null?"[]":s)),new A.kV(),t.P)
s=A.a3(s,s.$ti.i("a5.E"))
return s},
ah(){var s=this.fC(),r=A.D(s),q=r.i("I<1>")
s=A.a3(new A.I(s,r.i("F(1)").a(new A.lq()),q),q.i("h.E"))
return s},
au(a,b){return this.hk(a,t.P.a(b))},
hk(a,b){var s=0,r=A.T(t.H),q=this,p
var $async$au=A.U(function(c,d){if(c===1)return A.Q(d,r)
for(;;)switch(s){case 0:if(!q.O())throw A.b(B.i)
p=b.h(0,"operation_id")
if(p==null)p=A.ip()
b.k(0,"operation_id",p)
s=2
return A.z(A.c5("actions",new A.lr(p,a,b)),$async$au)
case 2:q.cx.m(0,q.Y())
s=q.x?3:4
break
case 3:s=5
return A.z(q.a4(),$async$au)
case 5:case 4:return A.R(null,r)}})
return A.S($async$au,r)},
a4(){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
var $async$a4=A.U(function(a7,a8){if(a7===1){o.push(a8)
s=p}for(;;)switch(s){case 0:if(m.cy||!m.O()){s=1
break}m.cy=!0
l=m.ay
e=m.ah()
B.b.aI(e,new A.lv())
k=e
p=4
d=k,d=A.e1(d,0,A.cB(100,"count",t.q),A.D(d).c),c=d.$ti,d=new A.bh(d,d.gj(0),c.i("bh<a5.E>")),b=t.N,c=c.i("a5.E"),a=t.f,a0=t.z,a1=t.t
case 7:if(!d.p()){s=8
break}a2=d.d
j=a2==null?c.a(a2):a2
if(!J.j(l,m.ay)||!m.O()){s=8
break}s=9
return A.z(A.c5("actions",new A.lw(j)),$async$a4)
case 9:p=11
s=14
return A.z(m.cf(A.w(J.i(j,"endpoint")),"POST",A.aa(["Content-Type","application/json"],b,b),B.c.V(J.i(j,"body"))),$async$a4)
case 14:i=a8
a2=i.responseText
h=B.c.J(0,a2==null?"{}":a2)
if(!J.j(l,m.ay)||!m.O()){s=8
break}if(!J.j(J.i(h,"status"),"success"))throw A.b(B.V)
s=J.j(J.i(j,"endpoint"),"/api/billing-records/add")?15:16
break
case 15:a2=A.aj(a.a(J.i(j,"body")),b,a0)
a3=A.fo(b,a0)
a3.S(0,a2)
g=a3
J.am(g,"operation_id",J.i(j,"operation_id"))
J.am(g,"bill_id",J.i(h,"bill_id"))
J.am(g,"owner",J.i(j,"owner"))
J.am(g,"sync_status","Synced")
J.am(g,"status","Unpaid")
s=17
return A.z(m.b6(A.B([g],a1)),$async$a4)
case 17:case 16:s=18
return A.z(A.c5("actions",new A.lx(j)),$async$a4)
case 18:p=4
s=13
break
case 11:p=10
a5=o.pop()
a2=A.aq(a5)
s=a2 instanceof A.aG?19:21
break
case 19:f=a2
if(!f.b){a2=f.a
a2=a2==null||a2===429||a2>=500}else a2=!0
if(a2)throw a5
s=22
return A.z(A.c5("actions",new A.ly(j)),$async$a4)
case 22:s=20
break
case 21:throw a5
case 20:s=13
break
case 10:s=4
break
case 13:s=7
break
case 8:if(J.j(l,m.ay))m.y=B.b.a6(m.ah(),new A.lz())?"Saved operations need review. Their original data remains on this device.":null
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
dw(){var s,r,q,p=this
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
p.b=A.ao(s,r)
p.r=A.ao(s,s)
p.w=A.ao(s,r)},
f8(){var s,r,q,p,o,n,m,l,k,j,i=this
try{s=window.localStorage.getItem("waterhall_households")
if(s!=null)i.a=A.aN(t.R.a(B.c.J(0,s)),!0,t.P)
r=window.localStorage.getItem("waterhall_central_assets")
if(r!=null)i.b=A.aj(t.f.a(B.c.J(0,r)),t.N,t.z)
q=window.localStorage.getItem("waterhall_maintenance_logs")
if(q!=null)i.c=A.aN(t.R.a(B.c.J(0,q)),!0,t.P)
p=window.localStorage.getItem("waterhall_workers")
if(p!=null)i.d=A.aN(t.R.a(B.c.J(0,p)),!0,t.P)
o=window.localStorage.getItem("waterhall_billing_records")
if(o!=null)i.e=A.aN(t.R.a(B.c.J(0,o)),!0,t.P)
n=window.localStorage.getItem("waterhall_announcements")
if(n!=null)i.f=A.aN(t.R.a(B.c.J(0,n)),!0,t.P)
m=window.localStorage.getItem("waterhall_billing_config")
if(m!=null)i.w=A.aj(t.f.a(B.c.J(0,m)),t.N,t.z)
l=window.localStorage.getItem("waterhall_payment_settings")
k=t.N
if(l!=null)i.r=A.aj(t.f.a(B.c.J(0,l)),k,k)
else i.r=A.aj($.qI,k,k)}catch(j){A.c6("Unable to load local cache.")}},
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
s.setItem("waterhall_billing_config",B.c.V(q.w))}catch(r){A.c6("Unable to save local cache.")}},
aQ(a){return this.hn(a)},
be(){return this.aQ("")},
hn(a1){var s=0,r=A.T(t.y),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d,c,b,a,a0
var $async$aQ=A.U(function(a2,a3){if(a2===1){o.push(a3)
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
return A.z(m.dr(k),$async$aQ)
case 7:j=a3
f=j.responseText
f.toString
i=f
if(!J.j(i,m.as)){f=t.P
h=f.a(B.c.J(0,i))
e=J.i(h,"billingConfig")
if(e==null){e=t.z
e=A.ao(e,e)}d=t.f
c=t.N
b=t.z
m.w=A.aj(d.a(e),c,b)
e=t.R
m.a=A.aN(e.a(J.i(h,"households")),!0,f)
m.b=A.aj(d.a(J.i(h,"centralAssets")),c,b)
m.c=A.aN(e.a(J.i(h,"maintenanceLogs")),!0,f)
m.d=A.aN(e.a(J.i(h,"workers")),!0,f)
m.e=A.aN(e.a(J.i(h,"billingRecords")),!0,f)
if(J.o4(h,"announcements"))m.f=A.aN(e.a(J.i(h,"announcements")),!0,f)
if(J.o4(h,"paymentSettings"))m.r=A.aj(d.a(J.i(h,"paymentSettings")),c,c)
m.as=i;++m.at
m.ax.X(0)
m.aJ()}m.x=!0
m.cx.m(0,m.Y())
s=8
return A.z(m.a4(),$async$aQ)
case 8:if(m.x&&m.O())m.aw()
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
g=A.aq(a0)
if(!(g instanceof A.aG)||!g.b)m.c_()
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
return A.S($async$aQ,r)},
ae(){var s=0,r=A.T(t.y),q,p=this,o,n,m
var $async$ae=A.U(function(a,b){if(a===1)return A.Q(b,r)
for(;;)switch(s){case 0:p.O()
A.mo(B.F,new A.lk(p))
o=window
o.toString
n=t.oV
m=t.A
A.y(o,"focus",n.a(new A.ll(p)),!1,m)
o=window
o.toString
B.S.ce(o,"waterhall-session-expired",new A.lm(p))
o=window
o.toString
B.S.ce(o,"waterhall-request-unavailable",new A.ln(p))
s=3
return A.z(A.dj(),$async$ae)
case 3:p.f8()
if(p.b.a===0)p.b=A.aj($.vy,t.N,t.z)
if(p.r.a===0){o=t.N
p.r=A.aj($.qI,o,o)}o=window
o.toString
A.y(o,"online",n.a(new A.lo(p)),!1,m)
o=window
o.toString
A.y(o,"offline",n.a(new A.lp(p)),!1,m)
s=4
return A.z(p.be(),$async$ae)
case 4:q=b
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$ae,r)},
el(){var s,r,q,p=window.localStorage.getItem("waterhall_offline_collections")
if(p==null)return A.B([],t.t)
try{s=t.j.a(B.c.J(0,p))
r=J.c9(s,new A.l2(),t.P)
r=A.a3(r,r.$ti.i("a5.E"))
return r}catch(q){r=A.B([],t.t)
return r}},
aT(){var s=this.el(),r=A.D(s),q=r.i("I<1>")
r=A.a3(new A.I(s,r.i("F(1)").a(new A.ld()),q),q.i("h.E"))
return r},
bE(a,b,c,a0){var s=0,r=A.T(t.P),q,p=this,o,n,m,l,k,j,i,h,g,f,e,d
var $async$bE=A.U(function(a1,a2){if(a1===1)return A.Q(a2,r)
for(;;)switch(s){case 0:if(!p.O())throw A.b(B.i)
o=p.r.h(0,"allow_worker_collection")
if((o==null?null:o.toLowerCase())!=="true")throw A.b(A.O("Field payment collection is disabled under the Barangay-only payment policy. All payments must be made at the Barangay Hall."))
n=new A.ag(Date.now(),0,!1).aa()
m=A.ip()
l=A.aa(["transaction_id",m,"bill_id",null,"house_id",c,"amount_collected",a,"date",n.a9(),"collected_by",b,"payment_method",a0,"sync_status","PENDING","synced_at",null],t.N,t.X)
s=3
return A.z(A.c5("collections",new A.lt(c,b,l)),$async$bE)
case 3:o=p.cx
o.m(0,p.Y())
k=B.a.A(c.toUpperCase())
for(j=p.e,i=j.length,h=0;h<j.length;j.length===i||(0,A.at)(j),++h){g=j[h]
f=J.x(g)
e=f.h(g,"house_id")
d=B.a.A(J.M(e==null?"":e).toUpperCase())
e=f.h(g,"bill_id")
B.a.A(J.M(e==null?"":e).toUpperCase())
e=d===k&&!J.j(f.h(g,"status"),"Paid")
if(e){f.k(g,"status","Pending sync")
f.k(g,"payment_status","Pending sync")}}p.aJ()
A.c6("[OFFLINE STORE] Collection recorded locally: "+m+" for "+c+" (\u20b1"+A.e(a)+"). Status: PENDING.")
if(p.x)p.aw()
else o.m(0,p.Y())
q=l
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$bE,r)},
aw(){var s=0,r=A.T(t.H),q,p=2,o=[],n=[],m=this,l,k,j,i,h,g,f,e,d
var $async$aw=A.U(function(a,b){if(a===1){o.push(b)
s=p}for(;;)switch(s){case 0:if(m.db||!m.O()){s=1
break}i=m.aT()
B.b.aI(i,new A.lA())
l=A.e1(i,0,A.cB(100,"count",t.q),A.D(i).c).av(0)
if(J.an(l)===0){m.cx.m(0,m.Y())
s=1
break}m.db=!0
h=m.cx
h.m(0,m.Y())
k=m.ay
p=4
g=l
f=A.D(g)
j=new A.a1(g,f.i("@(1)").a(new A.lB()),f.i("a1<1,@>")).e2(0)
s=7
return A.z(A.c5("collections",new A.lC(j)),$async$aw)
case 7:s=8
return A.z(m.ab(l,k),$async$aw)
case 8:if(J.j(k,m.ay)&&m.O())m.y=B.b.a6(m.aT(),new A.lD())?"Some collections need review. Unacknowledged payments remain saved.":null
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
return A.S($async$aw,r)},
ab(a,b){return this.fw(t.p.a(a),b)},
fw(a,b){var s=0,r=A.T(t.H),q,p=2,o=[],n=this,m,l,k,j,i,h,g,f,e,d,c
var $async$ab=A.U(function(a0,a1){if(a0===1){o.push(a1)
s=p}for(;;)switch(s){case 0:if(b!==n.ay||!n.O())throw A.b(B.i)
m=null
p=4
g=t.N
s=7
return A.z(n.cf("/api/collections/sync","POST",A.aa(["Content-Type","application/json"],g,g),B.c.V(A.aa(["collections",a],g,t.p))),$async$ab)
case 7:l=a1
f=l.responseText
k=t.P.a(B.c.J(0,f==null?"{}":f))
j=J.i(k,"synced_ids")
if(J.j(J.i(k,"status"),"success")&&t.j.b(j)){g=J.rN(j,g)
e=A.cl(g.$ti.i("h.E"))
e.S(0,g)}else e=A.oi(g)
m=e
p=2
s=6
break
case 4:p=3
c=o.pop()
g=A.aq(c)
s=g instanceof A.aG?8:10
break
case 8:i=g
if(i.b||!B.b.v(A.B([400,403,404,409,422],t.b),i.a))throw c
g=a.length
s=g>1?11:12
break
case 11:h=g/2|0
s=13
return A.z(n.ab(B.b.cQ(a,0,h),b),$async$ab)
case 13:s=14
return A.z(n.ab(B.b.es(a,h),b),$async$ab)
case 14:s=1
break
case 12:if(b!==n.ay||!n.O())throw A.b(B.i)
g=i.a===409?"Bill or transaction conflict. Review before retrying.":"Collection rejected (HTTP "+A.e(i.a)+"). Review before retrying."
s=15
return A.z(n.b3(a,A.oi(t.N),g),$async$ab)
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
return A.z(n.b3(a,m,"Server did not acknowledge this collection. Retry required."),$async$ab)
case 16:n.x=!0
case 1:return A.R(q,r)
case 2:return A.Q(o.at(-1),r)}})
return A.S($async$ab,r)},
b3(a,b,c){return this.fn(t.p.a(a),t.i.a(b),c)},
fn(a,b,c){var s=0,r=A.T(t.H),q=this,p
var $async$b3=A.U(function(d,e){if(d===1)return A.Q(e,r)
for(;;)switch(s){case 0:p=A.D(a)
s=2
return A.z(A.c5("collections",new A.kQ(new A.a1(a,p.i("@(1)").a(new A.kR()),p.i("a1<1,@>")).e2(0),b,c)),$async$b3)
case 2:q.cx.m(0,q.Y())
return A.R(null,r)}})
return A.S($async$b3,r)},
bk(a,b,c,d,e){var s=0,r=A.T(t.y),q,p=this,o,n
var $async$bk=A.U(function(f,g){if(f===1)return A.Q(g,r)
for(;;)switch(s){case 0:n=t.N
s=3
return A.z(p.cf("/api/reports/add","POST",A.aa(["Content-Type","application/json"],n,n),B.c.V(A.aa(["operation_id",e,"household_id",a,"report_type",b,"description",c,"photo_base64",d],n,t.x))),$async$bk)
case 3:n=g.responseText
o=B.c.J(0,n==null?"{}":n)
n=J.x(o)
q=J.j(n.h(o,"status"),"success")&&n.h(o,"report_id")!=null
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$bk,r)},
a2(a){var s,r,q=this.a,p=B.a.A(a.toLowerCase()),o=B.a.A(A.qR(p,"hh-",""))
try{s=J.rt(q,new A.lc(p,o))
return s}catch(r){return null}},
bh(a,b){var s=0,r=A.T(t.dZ),q,p=this,o,n,m
var $async$bh=A.U(function(c,d){if(c===1)return A.Q(d,r)
for(;;)switch(s){case 0:n=p.a
m=B.b.h0(n,new A.lE(a))
s=m!==-1?3:4
break
case 3:if(!(m>=0&&m<n.length)){q=A.d(n,m)
s=1
break}o=A.aj(n[m],t.N,t.z)
o.k(0,"current_leak_status",b)
if(b==="leak")o.k(0,"leak_detected_at",new A.ag(Date.now(),0,!1).aa().a9())
else o.k(0,"leak_detected_at",null)
s=5
return A.z(p.au("/api/households/update",o),$async$bh)
case 5:B.b.k(n,m,o)
p.aJ()
if(!(m<n.length)){q=A.d(n,m)
s=1
break}q=n[m]
s=1
break
case 4:q=null
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$bh,r)},
bt(a){return this.fB(t.P.a(a))},
fB(a){var s=0,r=A.T(t.P),q,p=this,o,n
var $async$bt=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:o=p.c
n=A.ao(t.N,t.z)
n.k(0,"task_id","PENDING-"+A.ip())
n.k(0,"date",new A.ag(Date.now(),0,!1).aa().a9())
n.S(0,a)
s=3
return A.z(p.au("/api/maintenance-logs/add",n),$async$bt)
case 3:B.b.cr(o,0,n)
p.aJ()
q=n
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$bt,r)},
cH(){var s,r,q,p,o,n,m,l,k=t.N,j=A.ao(k,t.P)
for(s=this.e,r=s.length,q=0;q<s.length;s.length===r||(0,A.at)(s),++q){p=s[q]
j.k(0,A.e(J.i(p,"bill_id")),p)}for(s=this.ah(),r=A.D(s),o=r.i("F(1)").a(new A.lb()),s=B.b.gB(s),r=new A.aw(s,o,r.i("aw<1>")),o=t.f,n=t.z;r.p();){m=s.gt(0)
l=J.x(m)
p=A.aj(o.a(l.h(m,"body")),k,n)
p.k(0,"status",l.h(m,"sync_error")==null?"Pending sync":"Needs review")
j.k(0,A.e(p.h(0,"bill_id")),p)}k=j.$ti.i("b0<2>")
k=A.a3(new A.b0(j,k),k.i("h.E"))
return k},
hz(){var s,r,q,p,o,n,m,l,k,j="operation_id",i=A.b6(),h=A.B([],t.t),g=window.localStorage
g=g.getItem("waterhall_bill_history")
g=J.c9(t.j.a(B.c.J(0,g==null?"[]":g)),new A.lF(),t.P)
s=g.cR(0,g.$ti.i("F(a5.E)").a(new A.lG(i)))
for(g=J.aF(s.a),r=new A.aw(g,s.b,s.$ti.i("aw<1>"));r.p();)B.b.m(h,g.gt(g))
for(g=this.ah(),r=A.D(g),q=r.i("F(1)").a(new A.lH()),g=B.b.gB(g),r=new A.aw(g,q,r.i("aw<1>")),q=t.f,p=t.N,o=t.z;r.p();){n=g.gt(0)
if(B.b.a6(h,new A.lI(n)))continue
m=J.x(n)
l=A.aj(q.a(m.h(n,"body")),p,o)
k=A.fo(p,o)
k.S(0,l)
k.k(0,j,m.h(n,j))
k.k(0,"sync_status",m.h(n,"sync_error")==null?"Pending Sync":"Failed Sync")
k.k(0,"status","Not yet issued")
B.b.m(h,k)}B.b.aI(h,new A.lJ())
return h},
b6(a){return this.fM(t.p.a(a))},
fM(a){var s=0,r=A.T(t.H)
var $async$b6=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:s=2
return A.z(A.c5("bill_history",new A.l1(a,A.b6())),$async$b6)
case 2:return A.R(null,r)}})
return A.S($async$b6,r)},
b9(a,b){var s=0,r=A.T(t.P),q,p=this,o,n,m,l,k,j,i,h,g,f
var $async$b9=A.U(function(c,d){if(c===1)return A.Q(d,r)
for(;;)switch(s){case 0:g=t.N
f=A.ao(g,g)
f.k(0,"limit","25")
f.k(0,"q",b)
if(a!=null)f.k(0,"before",A.e(a))
o=A.qb(null,0,0)
n=A.q8(null,0,0,!1)
b=A.qa(null,0,0,f)
m=A.q7(null,0,0)
l=A.ng(null,"")
if(n==null)if(o.length===0)f=l!=null
else f=!0
else f=!1
if(f)n=""
f=n==null
k=!f
j=A.q9(null,0,0,null,"",k)
if(f&&!B.a.N(j,"/"))j=A.oB(j,k)
else j=A.cz(j)
i=A.eD("",o,f&&B.a.N(j,"//")?"":n,l,j,b,m).f
s=3
return A.z(p.dr("/api/worker/transactions?"+(i==null?"":i)),$async$b9)
case 3:f=d.responseText
f.toString
h=A.aj(t.f.a(B.c.J(0,f)),g,t.z)
s=4
return A.z(p.b6(A.aN(t.R.a(h.h(0,"records")),!0,t.P)),$async$b9)
case 4:q=h
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$b9,r)},
bM(a){var s=this.cH(),r=A.D(s),q=r.i("I<1>"),p=A.a3(new A.I(s,r.i("F(1)").a(new A.l9(B.a.A(a.toUpperCase()))),q),q.i("h.E"))
B.b.aI(p,new A.la())
return p},
em(a){var s,r,q=B.a.A(a.toUpperCase()),p=this.ah(),o=A.D(p),n=o.i("aJ<1,t<c,@>>"),m=n.i("I<h.E>"),l=A.a3(new A.I(new A.aJ(new A.I(p,o.i("F(1)").a(new A.l5()),o.i("I<1>")),o.i("t<c,@>(1)").a(new A.l6()),n),n.i("F(h.E)").a(new A.l7(q)),m),m.i("h.E"))
if(l.length!==0){B.b.aI(l,new A.l8())
s=J.i(B.b.gD(l),"current_reading")
if(typeof s=="number")return s}r=this.a2(a)
return A.ns(r==null?null:J.i(r,"current_m3_usage"))},
co(a,b){var s,r,q=B.a.A(a.toUpperCase()),p=B.a.A(b.toLowerCase())
if(B.b.a6(this.e,new A.lg(q,p)))return!0
s=this.ah()
r=A.D(s)
if(new A.aJ(new A.I(s,r.i("F(1)").a(new A.lh()),r.i("I<1>")),r.i("t<c,@>(1)").a(new A.li()),r.i("aJ<1,t<c,@>>")).a6(0,new A.lj(q,p)))return!0
return!1},
aK(a){return this.fA(t.P.a(a))},
fA(a){var s=0,r=A.T(t.P),q,p=this,o,n,m,l
var $async$aK=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:m=a.h(0,"house_id")
l=B.a.A(J.M(m==null?"":m).toUpperCase())
m=a.h(0,"billing_month")
o=B.a.A(J.M(m==null?"":m).toLowerCase())
if(p.co(l,o))throw A.b(A.O("A bill for this cycle ("+o+") already exists or is pending synchronization."))
m=A.ao(t.N,t.z)
m.k(0,"bill_id","PENDING-"+A.ip())
n=a.h(0,"date")
m.k(0,"date",n==null?new A.ag(Date.now(),0,!1).aa().a9():n)
m.k(0,"status","Pending sync")
m.k(0,"is_synced",!1)
m.S(0,a)
n=p.a2(l)
m.k(0,"family_head_name",n==null?null:J.i(n,"owner_name"))
s=3
return A.z(p.au("/api/billing-records/add",m),$async$aK)
case 3:s=p.x&&p.O()?4:6
break
case 4:s=7
return A.z(p.a4(),$async$aK)
case 7:if(!B.b.a6(p.ah(),new A.kU(m))){m.k(0,"is_synced",!0)
m.k(0,"status","Unpaid")}s=p.O()?8:9
break
case 8:s=10
return A.z(p.be(),$async$aK)
case 10:case 9:s=5
break
case 6:p.aJ()
p.cx.m(0,p.Y())
case 5:q=m
s=1
break
case 1:return A.R(q,r)}})
return A.S($async$aK,r)},
cG(a){return this.ax.dQ(0,a,new A.l4(this,a))},
cI(a){var s=a.length===0?this.f:this.cG(a),r=J.x(s)
return r.gE(s)?null:r.gD(s)},
br(a,b,c){var s=0,r=A.T(t.H),q=this,p,o
var $async$br=A.U(function(d,e){if(d===1)return A.Q(e,r)
for(;;)switch(s){case 0:p=t.N
o=A.aa(["message",a,"author",b,"target_audience",c,"timestamp",new A.ag(Date.now(),0,!1).aa().a9()],p,p)
s=2
return A.z(q.au("/api/announcements/add",o),$async$br)
case 2:B.b.cr(q.f,0,o)
q.ax.X(0)
q.aJ()
return A.R(null,r)}})
return A.S($async$br,r)},
shg(a){this.CW=t.mW.a(a)}}
A.kS.prototype={
$1(a){},
$S:14}
A.kT.prototype={
$1(a){return A.im(this.a)},
$S:66}
A.l_.prototype={
$0(){var s=this.a
if((s.a.a&30)===0)s.bw(B.q)},
$S:2}
A.kW.prototype={
$1(a){var s
t.I.a(a)
s=this.a
if((s.a.a&30)===0)s.b7(0,this.b)},
$S:21}
A.kX.prototype={
$1(a){t.I.a(a)
return this.a.$0()},
$S:21}
A.kY.prototype={
$1(a){t.I.a(a)
return this.a.$0()},
$S:21}
A.kZ.prototype={
$0(){this.a.$0()
this.b.abort()},
$S:2}
A.le.prototype={
$1(a){return J.i(t.P.a(a),"sync_error")!=null},
$S:0}
A.lf.prototype={
$1(a){return J.i(t.P.a(a),"sync_error")!=null},
$S:0}
A.kV.prototype={
$1(a){return A.aj(t.f.a(a),t.N,t.z)},
$S:17}
A.lq.prototype={
$1(a){return J.j(J.i(t.P.a(a),"owner"),A.b6())},
$S:0}
A.lr.prototype={
$1(a){return B.b.m(t.p.a(a),A.aa(["operation_id",this.a,"owner",A.b6(),"endpoint",this.b,"body",this.c],t.N,t.z))},
$S:5}
A.lv.prototype={
$2(a,b){var s,r="last_sync_attempt",q=t.P
q.a(a)
q.a(b)
q=J.i(a,r)
q=J.M(q==null?"":q)
s=J.i(b,r)
return B.a.a1(q,J.M(s==null?"":s))},
$S:12}
A.lw.prototype={
$1(a){var s,r,q,p,o,n="operation_id"
t.p.a(a)
for(r=a.length,q=this.a,p=J.x(q),o=0;o<a.length;a.length===r||(0,A.at)(a),++o){s=a[o]
if(J.j(J.i(s,n),p.h(q,n)))J.am(s,"last_sync_attempt",new A.ag(Date.now(),0,!1).aa().a9())}},
$S:5}
A.lx.prototype={
$1(a){return B.b.hp(t.p.a(a),new A.lu(this.a))},
$S:5}
A.lu.prototype={
$1(a){var s="operation_id"
return J.j(J.i(t.P.a(a),s),J.i(this.a,s))},
$S:0}
A.ly.prototype={
$1(a){var s,r,q,p,o,n="operation_id"
t.p.a(a)
for(r=a.length,q=this.a,p=J.x(q),o=0;o<a.length;a.length===r||(0,A.at)(a),++o){s=a[o]
if(J.j(J.i(s,n),p.h(q,n)))J.am(s,"sync_error","Server rejected this saved operation. Review with Admin; the original operation is retained.")}},
$S:5}
A.lz.prototype={
$1(a){return J.i(t.P.a(a),"sync_error")!=null},
$S:0}
A.lk.prototype={
$1(a){t.D.a(a)
return this.a.O()},
$S:16}
A.ll.prototype={
$1(a){return this.a.O()},
$S:3}
A.lm.prototype={
$1(a){t.A.a(a)
this.a.aq(!0)},
$S:18}
A.ln.prototype={
$1(a){var s
t.A.a(a)
s=this.a
if(s.O())s.c_()},
$S:18}
A.lo.prototype={
$1(a){A.c6("[NET] Internet restored. Starting automatic synchronization...")
this.a.be()},
$S:3}
A.lp.prototype={
$1(a){var s
A.c6("[NET] Internet disconnected. Entering offline mode.")
s=this.a
s.x=!1
s.cx.m(0,s.Y())},
$S:3}
A.l2.prototype={
$1(a){return A.aj(t.f.a(a),t.N,t.z)},
$S:17}
A.ld.prototype={
$1(a){var s
t.P.a(a)
s=J.x(a)
return J.j(s.h(a,"sync_status"),"PENDING")&&J.j(s.h(a,"collected_by"),A.b6())},
$S:0}
A.lt.prototype={
$1(a){t.p.a(a)
if(B.b.a6(a,new A.ls(this.a,this.b)))throw A.b(A.O("A collection for this household is already pending"))
B.b.cr(a,0,this.c)},
$S:5}
A.ls.prototype={
$1(a){var s
t.P.a(a)
s=J.x(a)
return J.j(s.h(a,"house_id"),this.a)&&J.j(s.h(a,"collected_by"),this.b)&&J.j(s.h(a,"sync_status"),"PENDING")},
$S:0}
A.lA.prototype={
$2(a,b){var s,r="last_sync_attempt",q=t.P
q.a(a)
q.a(b)
q=J.i(a,r)
q=J.M(q==null?"":q)
s=J.i(b,r)
return B.a.a1(q,J.M(s==null?"":s))},
$S:12}
A.lB.prototype={
$1(a){return J.i(t.P.a(a),"transaction_id")},
$S:27}
A.lC.prototype={
$1(a){var s,r,q,p
t.p.a(a)
for(r=a.length,q=this.a,p=0;p<a.length;a.length===r||(0,A.at)(a),++p){s=a[p]
if(J.j(J.i(s,"collected_by"),A.b6())&&q.v(0,J.i(s,"transaction_id")))J.am(s,"last_sync_attempt",new A.ag(Date.now(),0,!1).aa().a9())}},
$S:5}
A.lD.prototype={
$1(a){return J.i(t.P.a(a),"sync_error")!=null},
$S:0}
A.kR.prototype={
$1(a){return J.i(t.P.a(a),"transaction_id")},
$S:27}
A.kQ.prototype={
$1(a){var s,r,q,p,o,n,m,l="transaction_id",k="sync_status",j="sync_error"
t.p.a(a)
for(s=a.length,r=this.c,q=this.b,p=this.a,o=0;o<a.length;a.length===s||(0,A.at)(a),++o){n=a[o]
m=J.x(n)
if(!J.j(m.h(n,"collected_by"),A.b6())||!p.v(0,m.h(n,l))||!J.j(m.h(n,k),"PENDING"))continue
if(q.v(0,m.h(n,l))){m.k(n,k,"SYNCED")
m.k(n,"synced_at",new A.ag(Date.now(),0,!1).aa().a9())
m.C(n,j)}else m.k(n,j,r)}},
$S:5}
A.lc.prototype={
$1(a){var s,r,q,p,o,n,m
t.P.a(a)
n=J.x(a)
m=n.h(a,"house_id")
s=B.a.A(J.M(m==null?"":m).toLowerCase())
r=B.a.A(A.qR(s,"hh-",""))
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
A.lE.prototype={
$1(a){return J.j(J.i(t.P.a(a),"house_id"),this.a)},
$S:0}
A.lb.prototype={
$1(a){return J.j(J.i(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.lF.prototype={
$1(a){return A.aj(t.f.a(a),t.N,t.z)},
$S:17}
A.lG.prototype={
$1(a){return J.j(J.i(t.P.a(a),"owner"),this.a)},
$S:0}
A.lH.prototype={
$1(a){return J.j(J.i(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.lI.prototype={
$1(a){var s="operation_id"
return J.j(J.i(t.P.a(a),s),J.i(this.a,s))},
$S:0}
A.lJ.prototype={
$2(a,b){var s,r=t.P
r.a(a)
r=J.i(r.a(b),"date")
r=J.M(r==null?"":r)
s=J.i(a,"date")
return B.a.a1(r,J.M(s==null?"":s))},
$S:12}
A.l1.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j
t.p.a(a)
for(s=this.a,r=s.length,q=this.b,p=A.D(a).i("F(1)"),o=a.$flags|0,n=t.N,m=t.z,l=0;l<s.length;s.length===r||(0,A.at)(s),++l){k=s[l]
j=p.a(new A.l0(q,k))
o&1&&A.al(a,16)
B.b.d9(a,j,!0)
j=A.fo(n,m)
j.S(0,k)
j.k(0,"owner",q)
B.b.m(a,j)}},
$S:5}
A.l0.prototype={
$1(a){var s,r,q,p="operation_id",o="bill_id"
t.P.a(a)
s=J.x(a)
if(J.j(s.h(a,"owner"),this.a)){r=this.b
q=J.x(r)
if(!(q.h(r,p)!=null&&J.j(s.h(a,p),q.h(r,p))))s=q.h(r,o)!=null&&J.j(s.h(a,o),q.h(r,o))
else s=!0}else s=!1
return s},
$S:0}
A.l9.prototype={
$1(a){var s=J.i(t.P.a(a),"house_id")
return B.a.A(J.M(s==null?"":s).toUpperCase())===this.a},
$S:0}
A.la.prototype={
$2(a,b){var s,r,q="date",p=2026,o=t.P
o.a(a)
o.a(b)
o=J.x(a)
if(o.h(a,q)!=null){o=A.pb(A.w(o.h(a,q)))
s=o==null?A.lK(p):o}else s=A.lK(p)
o=J.x(b)
if(o.h(b,q)!=null){o=A.pb(A.w(o.h(b,q)))
r=o==null?A.lK(p):o}else r=A.lK(p)
return r.a1(0,s)},
$S:12}
A.l5.prototype={
$1(a){return J.j(J.i(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.l6.prototype={
$1(a){return A.aj(t.f.a(J.i(t.P.a(a),"body")),t.N,t.z)},
$S:25}
A.l7.prototype={
$1(a){var s=J.i(t.P.a(a),"house_id")
return B.a.A(J.M(s==null?"":s).toUpperCase())===this.a},
$S:0}
A.l8.prototype={
$2(a,b){var s,r=t.P
r.a(a)
r=J.i(r.a(b),"date")
r=J.M(r==null?"":r)
s=J.i(a,"date")
return B.a.a1(r,J.M(s==null?"":s))},
$S:12}
A.lg.prototype={
$1(a){var s,r
t.P.a(a)
s=J.x(a)
r=s.h(a,"house_id")
if(B.a.A(J.M(r==null?"":r).toUpperCase())===this.a){s=s.h(a,"billing_month")
s=B.a.A(J.M(s==null?"":s).toLowerCase())===this.b}else s=!1
return s},
$S:0}
A.lh.prototype={
$1(a){return J.j(J.i(t.P.a(a),"endpoint"),"/api/billing-records/add")},
$S:0}
A.li.prototype={
$1(a){return A.aj(t.f.a(J.i(t.P.a(a),"body")),t.N,t.z)},
$S:25}
A.lj.prototype={
$1(a){var s,r
t.P.a(a)
s=J.x(a)
r=s.h(a,"house_id")
if(B.a.A(J.M(r==null?"":r).toUpperCase())===this.a){s=s.h(a,"billing_month")
s=B.a.A(J.M(s==null?"":s).toLowerCase())===this.b}else s=!1
return s},
$S:0}
A.kU.prototype={
$1(a){var s="operation_id"
return J.j(J.i(t.P.a(a),s),this.a.h(0,s))},
$S:0}
A.l4.prototype={
$0(){var s=this.a.f,r=A.D(s),q=r.i("I<1>")
s=A.a3(new A.I(s,r.i("F(1)").a(new A.l3(this.b)),q),q.i("h.E"))
return s},
$S:72}
A.l3.prototype={
$1(a){var s,r="target_audience"
t.P.a(a)
s=J.x(a)
if(!J.j(s.h(a,r),"Everyone")){s=s.h(a,r)
s=J.j(s,this.a==="resident"?"Residents only":"Workers only")}else s=!0
return s},
$S:0}
A.nS.prototype={
$1(a){var s=0,r=A.T(t.a),q=this,p,o,n,m
var $async$$1=A.U(function(b,c){if(b===1)return A.Q(c,r)
for(;;)switch(s){case 0:m=q.a
if(m==null||A.b6()!==m)throw A.b(A.O("Session changed before local save"))
m=q.b
if(m==="collections")p="waterhall_offline_collections"
else p=m==="bill_history"?"waterhall_bill_history":"waterhall_unsynced_actions"
o=window.localStorage.getItem(p)
o=J.c9(t.j.a(B.c.J(0,o==null?"[]":o)),new A.nR(),t.P)
n=A.a3(o,o.$ti.i("a5.E"))
q.c.$1(n)
s=2
return A.z(A.nA(m,n),$async$$1)
case 2:return A.R(null,r)}})
return A.S($async$$1,r)},
$S:73}
A.nR.prototype={
$1(a){return A.aj(t.f.a(a),t.N,t.z)},
$S:17}
A.nT.prototype={
$1(a){},
$S:14}
A.nB.prototype={
$1(a){var s,r
t.P.a(a)
s=J.x(a)
r=s.h(a,"owner")
s=r==null?s.h(a,"collected_by"):r
return J.j(s,this.a)},
$S:0}
A.nY.prototype={
$1(a){var s,r,q,p,o,n,m,l,k="operation_id"
t.p.a(a)
for(s=a.length,r=this.b==="bill_history",q=this.a,p=0;p<a.length;a.length===s||(0,A.at)(a),++p){o=a[p]
n=J.x(o)
if(r){m=A.e(n.h(o,"owner"))
l=n.h(o,"bill_id")
n=m+"|"+A.e(l==null?n.h(o,k):l)}else{m=n.h(o,"transaction_id")
n=J.M(m==null?n.h(o,k):m)}q.dQ(0,n,new A.nX(o))}B.b.X(a)
B.b.S(a,new A.b0(q,A.C(q).i("b0<2>")))},
$S:5}
A.nX.prototype={
$0(){return this.a},
$S:31};(function aliases(){var s=J.cO.prototype
s.ev=s.l
s=J.bW.prototype
s.ey=s.l
s=A.m.prototype
s.ez=s.bO
s=A.h.prototype
s.cR=s.bK
s=A.H.prototype
s.eA=s.l
s=A.E.prototype
s.bP=s.a7
s=A.f.prototype
s.eu=s.bs
s=A.er.prototype
s.eC=s.an
s=A.aZ.prototype
s.ew=s.h
s.ex=s.k
s=A.d8.prototype
s.eB=s.k})();(function installTearOffs(){var s=hunkHelpers._static_1,r=hunkHelpers._static_0,q=hunkHelpers._static_2,p=hunkHelpers._instance_2u,o=hunkHelpers._instance_0u,n=hunkHelpers.installStaticTearOff,m=hunkHelpers._instance_2i
s(A,"v3","tt",19)
s(A,"v4","tu",19)
s(A,"v5","tv",19)
r(A,"qG","uX",2)
s(A,"v6","uN",15)
q(A,"v8","uP",34)
r(A,"v7","uO",2)
p(A.X.prototype,"gcZ","eW",34)
o(A.d7.prototype,"gfa","fb",2)
s(A,"va","uo",13)
s(A,"wO","pg",75)
n(A,"vj",4,null,["$4"],["tD"],29,0)
n(A,"vk",4,null,["$4"],["tE"],29,0)
m(A.bz.prototype,"gep","cL",7)
s(A,"vs","nx",36)
s(A,"vr","oE",51)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.mixinHard,q=hunkHelpers.inherit,p=hunkHelpers.inheritMany
q(A.H,null)
p(A.H,[A.of,J.cO,A.cZ,J.bd,A.a0,A.m,A.bR,A.mh,A.h,A.bh,A.dL,A.aw,A.e6,A.aI,A.bG,A.G,A.c_,A.cU,A.dm,A.ek,A.fh,A.mp,A.mc,A.dv,A.eu,A.n5,A.m2,A.dI,A.dJ,A.dH,A.fj,A.n3,A.i5,A.bk,A.hp,A.nd,A.ey,A.h6,A.ev,A.az,A.bZ,A.d6,A.e8,A.mn,A.hb,A.bn,A.X,A.h7,A.ec,A.hI,A.d7,A.hT,A.eG,A.ei,A.av,A.hy,A.cx,A.aE,A.cb,A.f1,A.mF,A.n1,A.nn,A.nk,A.ag,A.aY,A.fE,A.dZ,A.mK,A.bf,A.ar,A.ad,A.hW,A.as,A.eC,A.mv,A.ba,A.kO,A.ob,A.ef,A.os,A.cu,A.A,A.dR,A.er,A.hY,A.ce,A.he,A.hO,A.eF,A.aZ,A.mb,A.mZ,A.iw,A.aG,A.kP])
p(J.cO,[J.fg,J.dD,J.a,J.cP,J.cQ,J.ci,J.bV])
p(J.a,[J.bW,J.a9,A.cn,A.dO,A.f,A.eO,A.bP,A.be,A.Y,A.hd,A.aH,A.f6,A.f7,A.dq,A.hh,A.ds,A.hj,A.f9,A.o,A.hn,A.aM,A.fd,A.hs,A.cN,A.cT,A.fp,A.hA,A.hB,A.aO,A.hC,A.hE,A.aP,A.hJ,A.hM,A.aS,A.hP,A.aT,A.hS,A.aB,A.i_,A.fT,A.aV,A.i1,A.fX,A.h2,A.i6,A.i8,A.ia,A.ic,A.ie,A.cS,A.b_,A.hw,A.b2,A.hG,A.fH,A.hU,A.b3,A.i3,A.eT,A.h9])
p(J.bW,[J.fF,J.bF,J.bA])
p(A.cZ,[J.ff,A.hN])
q(J.lX,J.a9)
p(J.ci,[J.dC,J.fi])
p(A.a0,[A.dF,A.bD,A.fk,A.h_,A.fJ,A.hm,A.dE,A.eQ,A.b7,A.fB,A.e4,A.fZ,A.bq,A.f0])
p(A.m,[A.d2,A.ha,A.bm,A.aD,A.fc])
p(A.d2,[A.f_,A.e3])
p(A.bR,[A.eY,A.eZ,A.fQ,A.nK,A.nM,A.mC,A.mB,A.nt,A.mU,A.mX,A.ml,A.mk,A.n7,A.m4,A.lN,A.lO,A.lP,A.mI,A.mJ,A.ma,A.m9,A.n8,A.n9,A.na,A.kM,A.kN,A.lQ,A.lR,A.m_,A.ny,A.nz,A.nE,A.nF,A.nG,A.nO,A.nV,A.nW,A.nP,A.jJ,A.jK,A.jL,A.jI,A.jM,A.jN,A.jO,A.jP,A.j7,A.j3,A.j4,A.j5,A.j6,A.j9,A.ja,A.jb,A.je,A.jf,A.j8,A.jg,A.jh,A.ji,A.jj,A.jk,A.jl,A.jc,A.jd,A.jA,A.jB,A.jC,A.ju,A.jv,A.jw,A.jx,A.jy,A.jm,A.kw,A.kx,A.ky,A.kF,A.k5,A.k6,A.k4,A.k7,A.k3,A.k1,A.k2,A.k9,A.jZ,A.k_,A.k0,A.ka,A.jX,A.kc,A.kd,A.kb,A.jR,A.kr,A.ks,A.kt,A.ku,A.ke,A.kf,A.kg,A.kh,A.ki,A.jE,A.jF,A.jG,A.jH,A.jn,A.jo,A.jp,A.jq,A.jr,A.js,A.jt,A.kz,A.kA,A.jT,A.jV,A.jS,A.kB,A.kC,A.kD,A.j2,A.kj,A.kk,A.kl,A.km,A.kp,A.iY,A.iX,A.iZ,A.j_,A.j0,A.j1,A.iC,A.iD,A.iE,A.iz,A.iA,A.iK,A.iT,A.iL,A.iM,A.iN,A.iO,A.iP,A.iQ,A.iR,A.iF,A.iG,A.iS,A.iI,A.ix,A.iJ,A.kS,A.kT,A.kW,A.kX,A.kY,A.le,A.lf,A.kV,A.lq,A.lr,A.lw,A.lx,A.lu,A.ly,A.lz,A.lk,A.ll,A.lm,A.ln,A.lo,A.lp,A.l2,A.ld,A.lt,A.ls,A.lB,A.lC,A.lD,A.kR,A.kQ,A.lc,A.lE,A.lb,A.lF,A.lG,A.lH,A.lI,A.l1,A.l0,A.l9,A.l5,A.l6,A.l7,A.lg,A.lh,A.li,A.lj,A.kU,A.l3,A.nS,A.nR,A.nT,A.nB,A.nY])
p(A.eY,[A.nU,A.mD,A.mE,A.nc,A.nb,A.mL,A.mQ,A.mP,A.mN,A.mM,A.mT,A.mS,A.mR,A.mW,A.mm,A.mj,A.n4,A.nv,A.n6,A.nC,A.nm,A.nl,A.lL,A.jQ,A.jz,A.jY,A.jD,A.kE,A.iV,A.iB,A.iH,A.l_,A.kZ,A.l4,A.nX])
p(A.h,[A.n,A.aJ,A.I,A.cr,A.ej,A.da])
p(A.n,[A.a5,A.ck,A.b0,A.dG,A.eh])
p(A.a5,[A.e0,A.a1,A.hz,A.hv])
q(A.bx,A.aJ)
p(A.G,[A.d3,A.bg,A.eg,A.hu,A.h8,A.hf])
q(A.cm,A.d3)
q(A.dc,A.cU)
q(A.c1,A.dc)
q(A.dn,A.c1)
q(A.bv,A.dm)
p(A.eZ,[A.me,A.lY,A.nL,A.nu,A.nD,A.mV,A.mY,A.m3,A.m5,A.n2,A.m8,A.nj,A.mx,A.mw,A.ni,A.nh,A.m6,A.m7,A.mg,A.mi,A.mG,A.mH,A.np,A.kJ,A.kG,A.k8,A.kq,A.kv,A.jU,A.jW,A.kH,A.kn,A.ko,A.iW,A.iy,A.iU,A.lv,A.lA,A.lJ,A.la,A.l8])
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
q(A.db,A.hm)
p(A.bZ,[A.d9,A.cs])
q(A.e9,A.d9)
q(A.d5,A.e9)
q(A.ea,A.d6)
q(A.bI,A.ea)
q(A.e7,A.e8)
q(A.bH,A.hb)
q(A.eb,A.ec)
q(A.hL,A.eG)
q(A.cv,A.eg)
p(A.av,[A.eq,A.f2])
q(A.cw,A.eq)
p(A.cb,[A.dl,A.fa,A.fl])
p(A.f1,[A.eW,A.kK,A.m1,A.m0,A.mz,A.my])
q(A.fm,A.dE)
q(A.n0,A.n1)
q(A.h3,A.fa)
p(A.b7,[A.cX,A.fe])
q(A.hg,A.eC)
p(A.f,[A.v,A.du,A.dx,A.fb,A.ch,A.fq,A.aR,A.es,A.aU,A.aC,A.ew,A.h5,A.c2,A.bt,A.eV,A.bO])
p(A.v,[A.E,A.bp,A.cd,A.d4])
p(A.E,[A.r,A.u])
p(A.r,[A.cJ,A.eP,A.cK,A.ca,A.bQ,A.dp,A.cf,A.dy,A.dA,A.bU,A.bC,A.dT,A.bY,A.dY,A.e2,A.fO,A.fP,A.d1,A.cp])
q(A.f3,A.be)
q(A.cc,A.hd)
p(A.aH,[A.f4,A.f5])
q(A.hi,A.hh)
q(A.dr,A.hi)
q(A.hk,A.hj)
q(A.f8,A.hk)
q(A.aL,A.bP)
q(A.ho,A.hn)
q(A.dw,A.ho)
q(A.ht,A.hs)
q(A.bT,A.ht)
q(A.dz,A.cd)
q(A.bz,A.ch)
p(A.o,[A.bs,A.b8,A.h4])
p(A.bs,[A.bB,A.aA])
q(A.fr,A.hA)
q(A.fs,A.hB)
q(A.hD,A.hC)
q(A.ft,A.hD)
q(A.hF,A.hE)
q(A.cV,A.hF)
q(A.hK,A.hJ)
q(A.fG,A.hK)
q(A.fI,A.hM)
q(A.et,A.es)
q(A.fK,A.et)
q(A.hQ,A.hP)
q(A.fL,A.hQ)
q(A.e_,A.hS)
q(A.i0,A.i_)
q(A.fR,A.i0)
q(A.ex,A.ew)
q(A.fS,A.ex)
q(A.i2,A.i1)
q(A.fW,A.i2)
q(A.i7,A.i6)
q(A.hc,A.i7)
q(A.ed,A.ds)
q(A.i9,A.i8)
q(A.hq,A.i9)
q(A.ib,A.ia)
q(A.el,A.ib)
q(A.id,A.ic)
q(A.hR,A.id)
q(A.ig,A.ie)
q(A.hX,A.ig)
q(A.ee,A.h8)
p(A.f2,[A.hl,A.eS])
q(A.aW,A.cs)
q(A.hZ,A.er)
p(A.aZ,[A.cR,A.d8])
q(A.cj,A.d8)
q(A.hx,A.hw)
q(A.fn,A.hx)
q(A.hH,A.hG)
q(A.fC,A.hH)
q(A.d_,A.u)
q(A.hV,A.hU)
q(A.fN,A.hV)
q(A.i4,A.i3)
q(A.fY,A.i4)
q(A.eU,A.h9)
q(A.fD,A.bO)
s(A.d2,A.bG)
s(A.em,A.m)
s(A.en,A.aI)
s(A.eo,A.m)
s(A.ep,A.aI)
s(A.d3,A.aE)
s(A.dc,A.aE)
s(A.hd,A.kO)
s(A.hh,A.m)
s(A.hi,A.A)
s(A.hj,A.m)
s(A.hk,A.A)
s(A.hn,A.m)
s(A.ho,A.A)
s(A.hs,A.m)
s(A.ht,A.A)
s(A.hA,A.G)
s(A.hB,A.G)
s(A.hC,A.m)
s(A.hD,A.A)
s(A.hE,A.m)
s(A.hF,A.A)
s(A.hJ,A.m)
s(A.hK,A.A)
s(A.hM,A.G)
s(A.es,A.m)
s(A.et,A.A)
s(A.hP,A.m)
s(A.hQ,A.A)
s(A.hS,A.G)
s(A.i_,A.m)
s(A.i0,A.A)
s(A.ew,A.m)
s(A.ex,A.A)
s(A.i1,A.m)
s(A.i2,A.A)
s(A.i6,A.m)
s(A.i7,A.A)
s(A.i8,A.m)
s(A.i9,A.A)
s(A.ia,A.m)
s(A.ib,A.A)
s(A.ic,A.m)
s(A.id,A.A)
s(A.ie,A.m)
s(A.ig,A.A)
r(A.d8,A.m)
s(A.hw,A.m)
s(A.hx,A.A)
s(A.hG,A.m)
s(A.hH,A.A)
s(A.hU,A.m)
s(A.hV,A.A)
s(A.i3,A.m)
s(A.i4,A.A)
s(A.h9,A.G)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{l:"int",W:"double",Z:"num",c:"String",F:"bool",ad:"Null",p:"List",H:"Object",t:"Map",k:"JSObject"},mangledNames:{},types:["F(t<c,@>)","~(aA)","~()","~(o)","af<~>(aA)","~(p<t<c,@>>)","~(c,@)","~(c,c)","~(E)","~(t<c,@>)","F(c)","c(c)","l(t<c,@>,t<c,@>)","@(@)","ad(@)","~(@)","~(fU)","t<c,@>(@)","ad(o)","~(~())","ad()","~(b8)","af<~>(o)","~(bB)","F(bi)","t<c,@>(t<c,@>)","F(v)","@(t<c,@>)","@()","F(E,c,c,cu)","c(t<c,H>)","t<c,@>()","ad(H,bl)","~(H?,H?)","~(H,bl)","l(c?)","H?(H?)","aZ(@)","cj<@>(@)","ad(@,bl)","~(l,@)","~(F)","cR(@)","ad(~())","~(@,@)","@(H?)","~(c,c?)","E(v)","~(c,E)","~(t<c,c>)","~(l,c)","H?(@)","~(b9<c>)","Z(Z,Z)","t<c,H>(ar<l,Z>)","F(b9<c>)","~(v,v?)","0&(c,l?)","Z(Z,t<c,@>)","~(E?,@,l[c])","c(@,l)","af<~>(c,c)","ad(@,@,@,@)","~(cM?,c)","af<~>(cM?)","F(E)","af<~>(~)","~(t<c,H>)","~(d0,@)","0&()","@(c)","af<~>()","p<t<c,@>>()","af<ad>(~)","t<c,c>(t<c,c>,c)","c(f)","@(@,c)","~(c)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti")}
A.tX(v.typeUniverse,JSON.parse('{"fF":"bW","bF":"bW","bA":"bW","w7":"a","w8":"a","vG":"a","vE":"o","w2":"o","vH":"bO","vF":"f","wc":"f","wg":"f","vD":"u","w4":"u","wB":"b8","vI":"r","wa":"r","wh":"v","w1":"v","wv":"cd","wd":"aA","wu":"aC","vK":"bs","vW":"bt","vJ":"bp","wj":"bp","w9":"E","w6":"ch","w5":"bT","vL":"Y","vO":"be","vR":"aB","vS":"aH","vN":"aH","vP":"aH","wb":"cn","fg":{"F":[],"a_":[]},"dD":{"ad":[],"a_":[]},"a":{"k":[]},"bW":{"k":[]},"a9":{"p":["1"],"n":["1"],"k":[],"h":["1"]},"ff":{"cZ":[]},"lX":{"a9":["1"],"p":["1"],"n":["1"],"k":[],"h":["1"]},"bd":{"ac":["1"]},"ci":{"W":[],"Z":[]},"dC":{"W":[],"l":[],"Z":[],"a_":[]},"fi":{"W":[],"Z":[],"a_":[]},"bV":{"c":[],"md":[],"a_":[]},"dF":{"a0":[]},"f_":{"m":["l"],"bG":["l"],"p":["l"],"n":["l"],"h":["l"],"m.E":"l","bG.E":"l"},"n":{"h":["1"]},"a5":{"n":["1"],"h":["1"]},"e0":{"a5":["1"],"n":["1"],"h":["1"],"a5.E":"1","h.E":"1"},"bh":{"ac":["1"]},"aJ":{"h":["2"],"h.E":"2"},"bx":{"aJ":["1","2"],"n":["2"],"h":["2"],"h.E":"2"},"dL":{"ac":["2"]},"a1":{"a5":["2"],"n":["2"],"h":["2"],"a5.E":"2","h.E":"2"},"I":{"h":["1"],"h.E":"1"},"aw":{"ac":["1"]},"cr":{"h":["1"],"h.E":"1"},"e6":{"ac":["1"]},"d2":{"m":["1"],"bG":["1"],"p":["1"],"n":["1"],"h":["1"]},"hz":{"a5":["l"],"n":["l"],"h":["l"],"a5.E":"l","h.E":"l"},"cm":{"G":["l","1"],"aE":["l","1"],"t":["l","1"],"G.K":"l","G.V":"1","aE.K":"l","aE.V":"1"},"c_":{"d0":[]},"dn":{"c1":["1","2"],"dc":["1","2"],"cU":["1","2"],"aE":["1","2"],"t":["1","2"],"aE.K":"1","aE.V":"2"},"dm":{"t":["1","2"]},"bv":{"dm":["1","2"],"t":["1","2"]},"ej":{"h":["1"],"h.E":"1"},"ek":{"ac":["1"]},"fh":{"pi":[]},"dS":{"bD":[],"a0":[]},"fk":{"a0":[]},"h_":{"a0":[]},"eu":{"bl":[]},"bR":{"cg":[]},"eY":{"cg":[]},"eZ":{"cg":[]},"fQ":{"cg":[]},"fM":{"cg":[]},"cL":{"cg":[]},"fJ":{"a0":[]},"bg":{"G":["1","2"],"po":["1","2"],"t":["1","2"],"G.K":"1","G.V":"2"},"ck":{"n":["1"],"h":["1"],"h.E":"1"},"dI":{"ac":["1"]},"b0":{"n":["1"],"h":["1"],"h.E":"1"},"dJ":{"ac":["1"]},"dG":{"n":["ar<1,2>"],"h":["ar<1,2>"],"h.E":"ar<1,2>"},"dH":{"ac":["ar<1,2>"]},"fj":{"tk":[],"md":[]},"cn":{"k":[],"eX":[],"a_":[]},"dO":{"k":[],"ae":[]},"i5":{"eX":[]},"dM":{"kL":[],"k":[],"ae":[],"a_":[]},"au":{"N":["1"],"k":[],"ae":[]},"dN":{"m":["W"],"au":["W"],"p":["W"],"N":["W"],"n":["W"],"k":[],"ae":[],"h":["W"],"aI":["W"]},"b1":{"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"k":[],"ae":[],"h":["l"],"aI":["l"]},"fu":{"lS":[],"m":["W"],"au":["W"],"p":["W"],"N":["W"],"n":["W"],"k":[],"ae":[],"h":["W"],"aI":["W"],"a_":[],"m.E":"W"},"fv":{"lT":[],"m":["W"],"au":["W"],"p":["W"],"N":["W"],"n":["W"],"k":[],"ae":[],"h":["W"],"aI":["W"],"a_":[],"m.E":"W"},"fw":{"b1":[],"lU":[],"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"k":[],"ae":[],"h":["l"],"aI":["l"],"a_":[],"m.E":"l"},"fx":{"b1":[],"lV":[],"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"k":[],"ae":[],"h":["l"],"aI":["l"],"a_":[],"m.E":"l"},"fy":{"b1":[],"lW":[],"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"k":[],"ae":[],"h":["l"],"aI":["l"],"a_":[],"m.E":"l"},"fz":{"b1":[],"mr":[],"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"k":[],"ae":[],"h":["l"],"aI":["l"],"a_":[],"m.E":"l"},"fA":{"b1":[],"ms":[],"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"k":[],"ae":[],"h":["l"],"aI":["l"],"a_":[],"m.E":"l"},"dP":{"b1":[],"mt":[],"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"k":[],"ae":[],"h":["l"],"aI":["l"],"a_":[],"m.E":"l"},"dQ":{"b1":[],"mu":[],"m":["l"],"au":["l"],"p":["l"],"N":["l"],"n":["l"],"k":[],"ae":[],"h":["l"],"aI":["l"],"a_":[],"m.E":"l"},"hm":{"a0":[]},"db":{"bD":[],"a0":[]},"ey":{"fU":[]},"ev":{"ac":["1"]},"da":{"h":["1"],"h.E":"1"},"az":{"a0":[]},"d5":{"e9":["1"],"d9":["1"],"bZ":["1"]},"bI":{"ea":["1"],"d6":["1"],"br":["1"],"c3":["1"]},"e8":{"pB":["1"],"pY":["1"],"c3":["1"]},"e7":{"e8":["1"],"pB":["1"],"pY":["1"],"c3":["1"]},"bH":{"hb":["1"]},"X":{"af":["1"]},"e9":{"d9":["1"],"bZ":["1"]},"ea":{"d6":["1"],"br":["1"],"c3":["1"]},"d6":{"br":["1"],"c3":["1"]},"d9":{"bZ":["1"]},"eb":{"ec":["1"]},"d7":{"br":["1"]},"eG":{"pM":[]},"hL":{"eG":[],"pM":[]},"eg":{"G":["1","2"],"t":["1","2"]},"cv":{"eg":["1","2"],"G":["1","2"],"t":["1","2"],"G.K":"1","G.V":"2"},"eh":{"n":["1"],"h":["1"],"h.E":"1"},"ei":{"ac":["1"]},"cw":{"av":["1"],"b9":["1"],"n":["1"],"h":["1"],"av.E":"1"},"cx":{"ac":["1"]},"e3":{"m":["1"],"bG":["1"],"p":["1"],"n":["1"],"h":["1"],"m.E":"1","bG.E":"1"},"m":{"p":["1"],"n":["1"],"h":["1"]},"G":{"t":["1","2"]},"d3":{"G":["1","2"],"aE":["1","2"],"t":["1","2"]},"cU":{"t":["1","2"]},"c1":{"dc":["1","2"],"cU":["1","2"],"aE":["1","2"],"t":["1","2"],"aE.K":"1","aE.V":"2"},"av":{"b9":["1"],"n":["1"],"h":["1"]},"eq":{"av":["1"],"b9":["1"],"n":["1"],"h":["1"]},"hu":{"G":["c","@"],"t":["c","@"],"G.K":"c","G.V":"@"},"hv":{"a5":["c"],"n":["c"],"h":["c"],"a5.E":"c","h.E":"c"},"dl":{"cb":["p<l>","c"]},"fa":{"cb":["c","p<l>"]},"dE":{"a0":[]},"fm":{"a0":[]},"fl":{"cb":["H?","c"]},"h3":{"cb":["c","p<l>"]},"W":{"Z":[]},"l":{"Z":[]},"p":{"n":["1"],"h":["1"]},"b9":{"n":["1"],"h":["1"]},"c":{"md":[]},"eQ":{"a0":[]},"bD":{"a0":[]},"b7":{"a0":[]},"cX":{"a0":[]},"fe":{"a0":[]},"fB":{"a0":[]},"e4":{"a0":[]},"fZ":{"a0":[]},"bq":{"a0":[]},"f0":{"a0":[]},"fE":{"a0":[]},"dZ":{"a0":[]},"hW":{"bl":[]},"as":{"tm":[]},"eC":{"h0":[]},"ba":{"h0":[]},"hg":{"h0":[]},"Y":{"k":[]},"E":{"v":[],"f":[],"k":[]},"o":{"k":[]},"f":{"k":[]},"aL":{"bP":[],"k":[]},"aM":{"k":[]},"bz":{"f":[],"k":[]},"cM":{"E":[],"v":[],"f":[],"k":[]},"bB":{"o":[],"k":[]},"aO":{"k":[]},"aA":{"o":[],"k":[]},"v":{"f":[],"k":[]},"bC":{"r":[],"E":[],"v":[],"f":[],"k":[]},"aP":{"k":[]},"b8":{"o":[],"k":[]},"aR":{"f":[],"k":[]},"aS":{"k":[]},"aT":{"k":[]},"aB":{"k":[]},"aU":{"f":[],"k":[]},"aC":{"f":[],"k":[]},"aV":{"k":[]},"cu":{"bi":[]},"r":{"E":[],"v":[],"f":[],"k":[]},"eO":{"k":[]},"cJ":{"r":[],"E":[],"v":[],"f":[],"k":[]},"eP":{"r":[],"E":[],"v":[],"f":[],"k":[]},"cK":{"r":[],"E":[],"v":[],"f":[],"k":[]},"bP":{"k":[]},"ca":{"r":[],"E":[],"v":[],"f":[],"k":[]},"bQ":{"r":[],"E":[],"v":[],"f":[],"k":[]},"bp":{"v":[],"f":[],"k":[]},"f3":{"k":[]},"cc":{"k":[]},"aH":{"k":[]},"be":{"k":[]},"f4":{"k":[]},"f5":{"k":[]},"f6":{"k":[]},"dp":{"r":[],"E":[],"v":[],"f":[],"k":[]},"cd":{"v":[],"f":[],"k":[]},"f7":{"k":[]},"dq":{"k":[]},"dr":{"m":["bj<Z>"],"A":["bj<Z>"],"p":["bj<Z>"],"N":["bj<Z>"],"n":["bj<Z>"],"k":[],"h":["bj<Z>"],"m.E":"bj<Z>","A.E":"bj<Z>"},"ds":{"bj":["Z"],"k":[]},"f8":{"m":["c"],"A":["c"],"p":["c"],"N":["c"],"n":["c"],"k":[],"h":["c"],"m.E":"c","A.E":"c"},"f9":{"k":[]},"ha":{"m":["E"],"p":["E"],"n":["E"],"h":["E"],"m.E":"E"},"bm":{"m":["1"],"p":["1"],"n":["1"],"h":["1"],"m.E":"1"},"du":{"f":[],"k":[]},"dw":{"m":["aL"],"A":["aL"],"p":["aL"],"N":["aL"],"n":["aL"],"k":[],"h":["aL"],"m.E":"aL","A.E":"aL"},"dx":{"f":[],"k":[]},"fb":{"f":[],"k":[]},"cf":{"r":[],"E":[],"v":[],"f":[],"k":[]},"dy":{"r":[],"E":[],"v":[],"f":[],"k":[]},"fd":{"k":[]},"bT":{"m":["v"],"A":["v"],"p":["v"],"N":["v"],"n":["v"],"k":[],"h":["v"],"m.E":"v","A.E":"v"},"dz":{"v":[],"f":[],"k":[]},"ch":{"f":[],"k":[]},"cN":{"k":[]},"dA":{"r":[],"E":[],"v":[],"f":[],"k":[]},"bU":{"p7":[],"cM":[],"r":[],"E":[],"v":[],"f":[],"k":[]},"cT":{"k":[]},"fp":{"k":[]},"fq":{"f":[],"k":[]},"fr":{"G":["c","@"],"k":[],"t":["c","@"],"G.K":"c","G.V":"@"},"fs":{"G":["c","@"],"k":[],"t":["c","@"],"G.K":"c","G.V":"@"},"ft":{"m":["aO"],"A":["aO"],"p":["aO"],"N":["aO"],"n":["aO"],"k":[],"h":["aO"],"m.E":"aO","A.E":"aO"},"aD":{"m":["v"],"p":["v"],"n":["v"],"h":["v"],"m.E":"v"},"cV":{"m":["v"],"A":["v"],"p":["v"],"N":["v"],"n":["v"],"k":[],"h":["v"],"m.E":"v","A.E":"v"},"dT":{"r":[],"E":[],"v":[],"f":[],"k":[]},"fG":{"m":["aP"],"A":["aP"],"p":["aP"],"N":["aP"],"n":["aP"],"k":[],"h":["aP"],"m.E":"aP","A.E":"aP"},"fI":{"G":["c","@"],"k":[],"t":["c","@"],"G.K":"c","G.V":"@"},"bY":{"r":[],"E":[],"v":[],"f":[],"k":[]},"fK":{"m":["aR"],"A":["aR"],"p":["aR"],"f":[],"N":["aR"],"n":["aR"],"k":[],"h":["aR"],"m.E":"aR","A.E":"aR"},"dY":{"r":[],"E":[],"v":[],"f":[],"k":[]},"fL":{"m":["aS"],"A":["aS"],"p":["aS"],"N":["aS"],"n":["aS"],"k":[],"h":["aS"],"m.E":"aS","A.E":"aS"},"e_":{"G":["c","c"],"k":[],"t":["c","c"],"G.K":"c","G.V":"c"},"e2":{"r":[],"E":[],"v":[],"f":[],"k":[]},"fO":{"r":[],"E":[],"v":[],"f":[],"k":[]},"fP":{"r":[],"E":[],"v":[],"f":[],"k":[]},"d1":{"r":[],"E":[],"v":[],"f":[],"k":[]},"cp":{"r":[],"E":[],"v":[],"f":[],"k":[]},"fR":{"m":["aC"],"A":["aC"],"p":["aC"],"N":["aC"],"n":["aC"],"k":[],"h":["aC"],"m.E":"aC","A.E":"aC"},"fS":{"m":["aU"],"A":["aU"],"p":["aU"],"f":[],"N":["aU"],"n":["aU"],"k":[],"h":["aU"],"m.E":"aU","A.E":"aU"},"fT":{"k":[]},"fW":{"m":["aV"],"A":["aV"],"p":["aV"],"N":["aV"],"n":["aV"],"k":[],"h":["aV"],"m.E":"aV","A.E":"aV"},"fX":{"k":[]},"bs":{"o":[],"k":[]},"h2":{"k":[]},"h5":{"f":[],"k":[]},"c2":{"mA":[],"f":[],"k":[]},"bt":{"f":[],"k":[]},"d4":{"v":[],"f":[],"k":[]},"hc":{"m":["Y"],"A":["Y"],"p":["Y"],"N":["Y"],"n":["Y"],"k":[],"h":["Y"],"m.E":"Y","A.E":"Y"},"ed":{"bj":["Z"],"k":[]},"hq":{"m":["aM?"],"A":["aM?"],"p":["aM?"],"N":["aM?"],"n":["aM?"],"k":[],"h":["aM?"],"m.E":"aM?","A.E":"aM?"},"el":{"m":["v"],"A":["v"],"p":["v"],"N":["v"],"n":["v"],"k":[],"h":["v"],"m.E":"v","A.E":"v"},"hR":{"m":["aT"],"A":["aT"],"p":["aT"],"N":["aT"],"n":["aT"],"k":[],"h":["aT"],"m.E":"aT","A.E":"aT"},"hX":{"m":["aB"],"A":["aB"],"p":["aB"],"N":["aB"],"n":["aB"],"k":[],"h":["aB"],"m.E":"aB","A.E":"aB"},"h8":{"G":["c","c"],"t":["c","c"]},"ee":{"G":["c","c"],"t":["c","c"],"G.K":"c","G.V":"c"},"hf":{"G":["c","c"],"t":["c","c"],"G.K":"c","G.V":"c"},"hl":{"av":["c"],"b9":["c"],"n":["c"],"h":["c"],"av.E":"c"},"cs":{"bZ":["1"]},"aW":{"cs":["1"],"bZ":["1"]},"ef":{"br":["1"]},"dR":{"bi":[]},"er":{"bi":[]},"hZ":{"bi":[]},"hY":{"bi":[]},"ce":{"ac":["1"]},"he":{"mA":[],"f":[],"k":[]},"hO":{"to":[]},"eF":{"tb":[]},"f2":{"av":["c"],"b9":["c"],"n":["c"],"h":["c"]},"fc":{"m":["E"],"p":["E"],"n":["E"],"h":["E"],"m.E":"E"},"cS":{"k":[]},"h4":{"o":[],"k":[]},"cR":{"aZ":[]},"cj":{"m":["1"],"p":["1"],"n":["1"],"aZ":[],"h":["1"],"m.E":"1"},"hN":{"cZ":[]},"b_":{"k":[]},"b2":{"k":[]},"b3":{"k":[]},"fn":{"m":["b_"],"A":["b_"],"p":["b_"],"n":["b_"],"k":[],"h":["b_"],"m.E":"b_","A.E":"b_"},"fC":{"m":["b2"],"A":["b2"],"p":["b2"],"n":["b2"],"k":[],"h":["b2"],"m.E":"b2","A.E":"b2"},"fH":{"k":[]},"d_":{"u":[],"E":[],"v":[],"f":[],"k":[]},"fN":{"m":["c"],"A":["c"],"p":["c"],"n":["c"],"k":[],"h":["c"],"m.E":"c","A.E":"c"},"eS":{"av":["c"],"b9":["c"],"n":["c"],"h":["c"],"av.E":"c"},"u":{"E":[],"v":[],"f":[],"k":[]},"fY":{"m":["b3"],"A":["b3"],"p":["b3"],"n":["b3"],"k":[],"h":["b3"],"m.E":"b3","A.E":"b3"},"eT":{"k":[]},"eU":{"G":["c","@"],"k":[],"t":["c","@"],"G.K":"c","G.V":"@"},"eV":{"f":[],"k":[]},"bO":{"f":[],"k":[]},"fD":{"f":[],"k":[]},"kL":{"ae":[]},"lW":{"p":["l"],"n":["l"],"ae":[],"h":["l"]},"mu":{"p":["l"],"n":["l"],"ae":[],"h":["l"]},"mt":{"p":["l"],"n":["l"],"ae":[],"h":["l"]},"lU":{"p":["l"],"n":["l"],"ae":[],"h":["l"]},"mr":{"p":["l"],"n":["l"],"ae":[],"h":["l"]},"lV":{"p":["l"],"n":["l"],"ae":[],"h":["l"]},"ms":{"p":["l"],"n":["l"],"ae":[],"h":["l"]},"lS":{"p":["W"],"n":["W"],"ae":[],"h":["W"]},"lT":{"p":["W"],"n":["W"],"ae":[],"h":["W"]}}'))
A.tW(v.typeUniverse,JSON.parse('{"n":1,"d2":1,"au":1,"ec":1,"d3":2,"eq":1,"f1":2,"d8":1}'))
var u={f:"\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u03f6\x00\u0404\u03f4 \u03f4\u03f6\u01f6\u01f6\u03f6\u03fc\u01f4\u03ff\u03ff\u0584\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u05d4\u01f4\x00\u01f4\x00\u0504\u05c4\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0400\x00\u0400\u0200\u03f7\u0200\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u03ff\u0200\u0200\u0200\u03f7\x00",p:": URI should have a non-empty host name: ",c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.ik
return{gS:s("@<~>"),n:s("az"),az:s("cK"),fj:s("bP"),hp:s("ca"),k:s("bQ"),lo:s("eX"),fW:s("kL"),i9:s("dn<d0,@>"),p1:s("bv<c,c>"),d5:s("Y"),cs:s("ag"),jS:s("aY"),gt:s("n<@>"),h:s("E"),W:s("a0"),A:s("o"),l5:s("f"),et:s("aL"),pk:s("lS"),kI:s("lT"),h4:s("cf"),Z:s("cg"),la:s("bz"),ad:s("cN"),S:s("bU"),m6:s("lU"),bW:s("lV"),jx:s("lW"),bg:s("pi"),hl:s("h<v>"),e3:s("h<bC>"),R:s("h<@>"),fm:s("h<l>"),gZ:s("a9<aZ>"),hq:s("a9<t<c,c>>"),t:s("a9<t<c,@>>"),lN:s("a9<bi>"),hf:s("a9<H>"),dw:s("a9<br<@>>"),s:s("a9<c>"),dG:s("a9<@>"),b:s("a9<l>"),T:s("dD"),m:s("k"),dY:s("bA"),dX:s("N<@>"),gq:s("cj<@>"),bX:s("bg<d0,@>"),mz:s("cS"),mT:s("bB"),kT:s("b_"),p:s("p<t<c,@>>"),j:s("p<@>"),f4:s("p<l>"),oT:s("p<Z>"),d:s("cT"),if:s("ar<l,Z>"),dW:s("t<c,E>"),c:s("t<c,H>"),je:s("t<c,c>"),P:s("t<c,@>"),f:s("t<@,@>"),gQ:s("a1<c,c>"),ib:s("aO"),V:s("aA"),aj:s("b1"),F:s("v"),hU:s("bi"),a:s("ad"),ai:s("b2"),K:s("H"),af:s("bC"),d8:s("aP"),I:s("b8"),lZ:s("wf"),ku:s("bj<@>"),mx:s("bj<Z>"),nZ:s("d_"),g:s("bY"),i:s("b9<c>"),ls:s("aR"),cA:s("aS"),hH:s("aT"),l:s("bl"),N:s("c"),gL:s("c(c)"),lv:s("aB"),bC:s("u"),bR:s("d0"),fD:s("d1"),dQ:s("aU"),gJ:s("aC"),D:s("fU"),ki:s("aV"),hk:s("b3"),aJ:s("a_"),do:s("bD"),jv:s("ae"),hM:s("mr"),mC:s("ms"),nn:s("mt"),ev:s("mu"),cx:s("bF"),eG:s("e3<bC>"),ph:s("c1<c,c>"),jJ:s("h0"),J:s("I<c>"),hE:s("c2"),kg:s("mA"),f5:s("bt"),cz:s("bH<bz>"),ou:s("bH<~>"),nD:s("d4"),aN:s("aD"),E:s("aW<o>"),kN:s("aW<bB>"),C:s("aW<aA>"),h6:s("cs<b8>"),U:s("bm<E>"),gp:s("bm<bC>"),ax:s("X<bz>"),_:s("X<@>"),hy:s("X<l>"),cU:s("X<~>"),dl:s("cu"),mp:s("cv<@,@>"),as:s("cv<H?,H?>"),y:s("F"),iW:s("F(H)"),Q:s("F(c)"),dx:s("W"),z:s("@"),mY:s("@()"),w:s("@(H)"),ng:s("@(H,bl)"),gA:s("@(b9<c>)"),q:s("l"),o:s("bQ?"),aa:s("p7?"),mV:s("E?"),iB:s("f?"),iC:s("cM?"),dD:s("cf?"),gK:s("af<ad>?"),ef:s("aM?"),L:s("r?"),G:s("bU?"),mU:s("k?"),lH:s("p<@>?"),lG:s("t<c,c>?"),dZ:s("t<c,@>?"),eO:s("t<@,@>?"),X:s("H?"),Y:s("bY?"),x:s("c?"),r:s("cp?"),e:s("bn<@,@>?"),O:s("hy?"),fU:s("F?"),jX:s("W?"),B:s("@(o)?"),aV:s("l?"),jh:s("Z?"),jE:s("~()?"),oV:s("~(o)?"),b9:s("~(aA)?"),gn:s("~(b8)?"),mW:s("~(F)?"),u:s("Z"),H:s("~"),M:s("~()"),i6:s("~(H)"),fQ:s("~(H,bl)"),bm:s("~(c,c)"),v:s("~(c,@)"),my:s("~(fU)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.T=A.cJ.prototype
B.A=A.ca.prototype
B.k=A.bQ.prototype
B.n=A.cc.prototype
B.E=A.dp.prototype
B.a6=A.dq.prototype
B.ac=A.dw.prototype
B.ad=A.dx.prototype
B.H=A.dy.prototype
B.I=A.dz.prototype
B.J=A.dA.prototype
B.f=A.bU.prototype
B.ae=J.cO.prototype
B.b=J.a9.prototype
B.e=J.dC.prototype
B.d=J.ci.prototype
B.a=J.bV.prototype
B.af=J.bA.prototype
B.ag=J.a.prototype
B.ao=A.dM.prototype
B.O=A.dQ.prototype
B.ap=A.cV.prototype
B.m=A.dT.prototype
B.Q=J.fF.prototype
B.p=A.bY.prototype
B.u=A.dY.prototype
B.j=A.e_.prototype
B.R=A.e2.prototype
B.o=A.cp.prototype
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
B.v=new A.kK()
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
B.r=new A.mh()
B.l=new A.h3()
B.a5=new A.mz()
B.D=new A.n5()
B.h=new A.hL()
B.t=new A.hW()
B.a7=new A.aY(0)
B.F=new A.aY(1e6)
B.G=new A.aY(1e7)
B.a8=new A.aY(15e6)
B.a9=new A.aY(3e5)
B.aa=new A.aY(4e5)
B.ab=new A.aY(6e7)
B.w=new A.bf("",null,null)
B.ah=new A.m0(null)
B.ai=new A.m1(null)
B.aj=s([],t.s)
B.K=s([],t.dG)
B.L=s(["bind","if","ref","repeat","syntax"],t.s)
B.x=s(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"],t.s)
B.ak=s(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"],t.s)
B.al=s(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"],t.s)
B.aq={households:0,centralAssets:1,maintenanceLogs:2,workers:3,billingRecords:4,announcements:5,paymentSettings:6,billingConfig:7,offlineCollections:8,unsyncedActions:9}
B.M=new A.bv(B.aq,["waterhall_households","waterhall_central_assets","waterhall_maintenance_logs","waterhall_workers","waterhall_billing_records","waterhall_announcements","waterhall_payment_settings","waterhall_billing_config","waterhall_offline_collections","waterhall_unsynced_actions"],t.p1)
B.ar={"/api/billing-records/add":0,"/api/maintenance-logs/add":1,"/api/reports/add":2,"/api/announcements/add":3,"/api/households/update":4}
B.am=new A.bv(B.ar,["Meter reading and bill","Maintenance report","Service report","Announcement","Household status"],t.p1)
B.P={}
B.an=new A.bv(B.P,[],t.p1)
B.N=new A.bv(B.P,[],A.ik("bv<d0,@>"))
B.as=new A.c_("call")
B.at=A.bo("eX")
B.au=A.bo("kL")
B.av=A.bo("lS")
B.aw=A.bo("lT")
B.ax=A.bo("lU")
B.ay=A.bo("lV")
B.az=A.bo("lW")
B.aA=A.bo("H")
B.aB=A.bo("mr")
B.aC=A.bo("ms")
B.aD=A.bo("mt")
B.aE=A.bo("mu")
B.aF=new A.my(!1)})();(function staticFields(){$.n_=null
$.b5=A.B([],t.hf)
$.pt=null
$.p5=null
$.p4=null
$.qJ=null
$.qF=null
$.qO=null
$.nH=null
$.nN=null
$.oP=null
$.de=null
$.eJ=null
$.eK=null
$.oI=!1
$.V=B.h
$.pI=""
$.pJ=null
$.bS=null
$.oa=null
$.pe=null
$.pd=null
$.hr=A.ao(t.N,t.Z)
$.vy=A.aa(["main_tank_level",null,"turbidity",null,"tds_ppm",null,"turbidity_status","unknown","has_reading",!1,"turbidity_desc","Awaiting sensor readings","last_updated",null],t.N,t.z)
$.qI=function(){var s=t.N
return A.aa(["payment_location","Barangay Tagpopongan Hall - Treasury Office","payment_method","In-Person Payment at Barangay Hall","allow_worker_collection","false","payment_instructions","Water bills are due on or before the 25th of each month. Payments must be settled in-person at the Barangay Hall Treasury Window. Field workers are not authorized to collect payments.","operating_hours","Monday - Friday, 8:00 AM - 5:00 PM","emergency_contact","Not configured; contact the Barangay office"],s,s)}()})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"vU","iq",()=>A.oO("_$dart_dartClosure"))
s($,"vT","qW",()=>A.oO("_$dart_dartClosure_dartJSInterop"))
s($,"wP","o1",()=>B.h.dX(new A.nU(),A.ik("af<~>")))
s($,"wL","oY",()=>A.B([new J.ff()],A.ik("a9<cZ>")))
s($,"wk","r2",()=>A.bE(A.mq({
toString:function(){return"$receiver$"}})))
s($,"wl","r3",()=>A.bE(A.mq({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"wm","r4",()=>A.bE(A.mq(null)))
s($,"wn","r5",()=>A.bE(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"wq","r8",()=>A.bE(A.mq(void 0)))
s($,"wr","r9",()=>A.bE(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"wp","r7",()=>A.bE(A.pF(null)))
s($,"wo","r6",()=>A.bE(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"wt","rb",()=>A.bE(A.pF(void 0)))
s($,"ws","ra",()=>A.bE(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"ww","oU",()=>A.ts())
s($,"w3","nZ",()=>$.o1())
s($,"wG","ri",()=>A.pq(4096))
s($,"wE","rg",()=>new A.nm().$0())
s($,"wF","rh",()=>new A.nl().$0())
s($,"wy","oV",()=>A.ta(A.ur(A.B([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.b))))
s($,"wx","rc",()=>A.pq(0))
s($,"wC","re",()=>A.dX("^[\\-\\.0-9A-Z_a-z~]*$"))
s($,"wD","rf",()=>typeof URLSearchParams=="function")
s($,"vV","qX",()=>A.dX("^([+-]?\\d{4,6})-?(\\d\\d)-?(\\d\\d)(?:[ T](\\d\\d)(?::?(\\d\\d)(?::?(\\d\\d)(?:[.,](\\d+))?)?)?( ?[zZ]| ?([-+])(\\d\\d)(?::?(\\d\\d))?)?)?$"))
s($,"wJ","o_",()=>A.io(B.aA))
s($,"vQ","qV",()=>({}))
s($,"wA","rd",()=>A.pp(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],t.N))
s($,"vM","qU",()=>A.dX("^\\S+$"))
s($,"w_","oT",()=>B.a.bx(A.o9(),"Opera",0))
s($,"vZ","r_",()=>!$.oT()&&B.a.bx(A.o9(),"Trident/",0))
s($,"vY","qZ",()=>B.a.bx(A.o9(),"Firefox",0))
s($,"vX","qY",()=>"-"+$.r0()+"-")
s($,"w0","r0",()=>{if($.qZ())var q="moz"
else if($.r_())q="ms"
else q=$.oT()?"o":"webkit"
return q})
s($,"wH","bu",()=>A.uk(A.oJ(self)))
s($,"wK","o0",()=>{$.oY().push(new A.hN())
return!0})
s($,"wz","oW",()=>A.oO("_$dart_dartObject"))
s($,"wI","oX",()=>function DartObject(a){this.o=a})
s($,"we","r1",()=>{var q=new A.mZ(new DataView(new ArrayBuffer(A.ul(8))))
q.eF()
return q})
s($,"wM","K",()=>{var q,p=t.t,o=A.B([],p),n=t.N,m=t.z,l=A.B([],p),k=A.B([],p),j=A.B([],p)
p=A.B([],p)
q=A.oc(null,t.H)
return new A.kP(o,A.ao(n,m),l,k,j,p,A.ao(n,n),A.ao(n,m),A.ao(n,t.p),q,new A.e7(null,null,A.ik("e7<t<c,@>>")))})
r($,"uR","rj",()=>A.oc(null,t.H))})();(function nativeSupport(){!function(){var s=function(a){var m={}
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
hunkHelpers.setOrUpdateInterceptorsByTag({WebGL:J.cO,AnimationEffectReadOnly:J.a,AnimationEffectTiming:J.a,AnimationEffectTimingReadOnly:J.a,AnimationTimeline:J.a,AnimationWorkletGlobalScope:J.a,AuthenticatorAssertionResponse:J.a,AuthenticatorAttestationResponse:J.a,AuthenticatorResponse:J.a,BackgroundFetchFetch:J.a,BackgroundFetchManager:J.a,BackgroundFetchSettledFetch:J.a,BarProp:J.a,BarcodeDetector:J.a,BluetoothRemoteGATTDescriptor:J.a,Body:J.a,BudgetState:J.a,CacheStorage:J.a,CanvasGradient:J.a,CanvasPattern:J.a,CanvasRenderingContext2D:J.a,Client:J.a,Clients:J.a,CookieStore:J.a,Coordinates:J.a,Credential:J.a,CredentialUserData:J.a,CredentialsContainer:J.a,Crypto:J.a,CryptoKey:J.a,CSS:J.a,CSSVariableReferenceValue:J.a,CustomElementRegistry:J.a,DataTransfer:J.a,DataTransferItem:J.a,DeprecatedStorageInfo:J.a,DeprecatedStorageQuota:J.a,DeprecationReport:J.a,DetectedBarcode:J.a,DetectedFace:J.a,DetectedText:J.a,DeviceAcceleration:J.a,DeviceRotationRate:J.a,DirectoryEntry:J.a,webkitFileSystemDirectoryEntry:J.a,FileSystemDirectoryEntry:J.a,DirectoryReader:J.a,WebKitDirectoryReader:J.a,webkitFileSystemDirectoryReader:J.a,FileSystemDirectoryReader:J.a,DocumentOrShadowRoot:J.a,DocumentTimeline:J.a,DOMError:J.a,Iterator:J.a,DOMMatrix:J.a,DOMMatrixReadOnly:J.a,DOMParser:J.a,DOMPoint:J.a,DOMPointReadOnly:J.a,DOMQuad:J.a,DOMStringMap:J.a,Entry:J.a,webkitFileSystemEntry:J.a,FileSystemEntry:J.a,External:J.a,FaceDetector:J.a,FederatedCredential:J.a,FileEntry:J.a,webkitFileSystemFileEntry:J.a,FileSystemFileEntry:J.a,DOMFileSystem:J.a,WebKitFileSystem:J.a,webkitFileSystem:J.a,FileSystem:J.a,FontFace:J.a,FontFaceSource:J.a,FormData:J.a,GamepadButton:J.a,GamepadPose:J.a,Geolocation:J.a,Position:J.a,GeolocationPosition:J.a,Headers:J.a,HTMLHyperlinkElementUtils:J.a,IdleDeadline:J.a,ImageBitmap:J.a,ImageBitmapRenderingContext:J.a,ImageCapture:J.a,InputDeviceCapabilities:J.a,IntersectionObserver:J.a,IntersectionObserverEntry:J.a,InterventionReport:J.a,KeyframeEffect:J.a,KeyframeEffectReadOnly:J.a,MediaCapabilities:J.a,MediaCapabilitiesInfo:J.a,MediaDeviceInfo:J.a,MediaError:J.a,MediaKeyStatusMap:J.a,MediaKeySystemAccess:J.a,MediaKeys:J.a,MediaKeysPolicy:J.a,MediaMetadata:J.a,MediaSession:J.a,MediaSettingsRange:J.a,MemoryInfo:J.a,MessageChannel:J.a,Metadata:J.a,MutationObserver:J.a,WebKitMutationObserver:J.a,MutationRecord:J.a,NavigationPreloadManager:J.a,Navigator:J.a,NavigatorAutomationInformation:J.a,NavigatorConcurrentHardware:J.a,NavigatorCookies:J.a,NavigatorUserMediaError:J.a,NodeFilter:J.a,NodeIterator:J.a,NonDocumentTypeChildNode:J.a,NonElementParentNode:J.a,NoncedElement:J.a,OffscreenCanvasRenderingContext2D:J.a,OverconstrainedError:J.a,PaintRenderingContext2D:J.a,PaintSize:J.a,PaintWorkletGlobalScope:J.a,PasswordCredential:J.a,Path2D:J.a,PaymentAddress:J.a,PaymentInstruments:J.a,PaymentManager:J.a,PaymentResponse:J.a,PerformanceEntry:J.a,PerformanceLongTaskTiming:J.a,PerformanceMark:J.a,PerformanceMeasure:J.a,PerformanceNavigation:J.a,PerformanceNavigationTiming:J.a,PerformanceObserver:J.a,PerformanceObserverEntryList:J.a,PerformancePaintTiming:J.a,PerformanceResourceTiming:J.a,PerformanceServerTiming:J.a,PerformanceTiming:J.a,Permissions:J.a,PhotoCapabilities:J.a,PositionError:J.a,GeolocationPositionError:J.a,Presentation:J.a,PresentationReceiver:J.a,PublicKeyCredential:J.a,PushManager:J.a,PushMessageData:J.a,PushSubscription:J.a,PushSubscriptionOptions:J.a,Range:J.a,RelatedApplication:J.a,ReportBody:J.a,ReportingObserver:J.a,ResizeObserver:J.a,ResizeObserverEntry:J.a,RTCCertificate:J.a,RTCIceCandidate:J.a,mozRTCIceCandidate:J.a,RTCLegacyStatsReport:J.a,RTCRtpContributingSource:J.a,RTCRtpReceiver:J.a,RTCRtpSender:J.a,RTCSessionDescription:J.a,mozRTCSessionDescription:J.a,RTCStatsResponse:J.a,Screen:J.a,ScrollState:J.a,ScrollTimeline:J.a,Selection:J.a,SpeechRecognitionAlternative:J.a,SpeechSynthesisVoice:J.a,StaticRange:J.a,StorageManager:J.a,StyleMedia:J.a,StylePropertyMap:J.a,StylePropertyMapReadonly:J.a,SyncManager:J.a,TaskAttributionTiming:J.a,TextDetector:J.a,TextMetrics:J.a,TrackDefault:J.a,TreeWalker:J.a,TrustedHTML:J.a,TrustedScriptURL:J.a,TrustedURL:J.a,UnderlyingSourceBase:J.a,URLSearchParams:J.a,VRCoordinateSystem:J.a,VRDisplayCapabilities:J.a,VREyeParameters:J.a,VRFrameData:J.a,VRFrameOfReference:J.a,VRPose:J.a,VRStageBounds:J.a,VRStageBoundsPoint:J.a,VRStageParameters:J.a,ValidityState:J.a,VideoPlaybackQuality:J.a,VideoTrack:J.a,VTTRegion:J.a,WindowClient:J.a,WorkletAnimation:J.a,WorkletGlobalScope:J.a,XPathEvaluator:J.a,XPathExpression:J.a,XPathNSResolver:J.a,XPathResult:J.a,XMLSerializer:J.a,XSLTProcessor:J.a,Bluetooth:J.a,BluetoothCharacteristicProperties:J.a,BluetoothRemoteGATTServer:J.a,BluetoothRemoteGATTService:J.a,BluetoothUUID:J.a,BudgetService:J.a,Cache:J.a,DOMFileSystemSync:J.a,DirectoryEntrySync:J.a,DirectoryReaderSync:J.a,EntrySync:J.a,FileEntrySync:J.a,FileReaderSync:J.a,FileWriterSync:J.a,HTMLAllCollection:J.a,Mojo:J.a,MojoHandle:J.a,MojoWatcher:J.a,NFC:J.a,PagePopupController:J.a,Report:J.a,Request:J.a,Response:J.a,SubtleCrypto:J.a,USBAlternateInterface:J.a,USBConfiguration:J.a,USBDevice:J.a,USBEndpoint:J.a,USBInTransferResult:J.a,USBInterface:J.a,USBIsochronousInTransferPacket:J.a,USBIsochronousInTransferResult:J.a,USBIsochronousOutTransferPacket:J.a,USBIsochronousOutTransferResult:J.a,USBOutTransferResult:J.a,WorkerLocation:J.a,WorkerNavigator:J.a,Worklet:J.a,IDBCursor:J.a,IDBCursorWithValue:J.a,IDBFactory:J.a,IDBIndex:J.a,IDBObjectStore:J.a,IDBObservation:J.a,IDBObserver:J.a,IDBObserverChanges:J.a,SVGAngle:J.a,SVGAnimatedAngle:J.a,SVGAnimatedBoolean:J.a,SVGAnimatedEnumeration:J.a,SVGAnimatedInteger:J.a,SVGAnimatedLength:J.a,SVGAnimatedLengthList:J.a,SVGAnimatedNumber:J.a,SVGAnimatedNumberList:J.a,SVGAnimatedPreserveAspectRatio:J.a,SVGAnimatedRect:J.a,SVGAnimatedString:J.a,SVGAnimatedTransformList:J.a,SVGMatrix:J.a,SVGPoint:J.a,SVGPreserveAspectRatio:J.a,SVGRect:J.a,SVGUnitTypes:J.a,AudioListener:J.a,AudioParam:J.a,AudioTrack:J.a,AudioWorkletGlobalScope:J.a,AudioWorkletProcessor:J.a,PeriodicWave:J.a,WebGLActiveInfo:J.a,ANGLEInstancedArrays:J.a,ANGLE_instanced_arrays:J.a,WebGLBuffer:J.a,WebGLCanvas:J.a,WebGLColorBufferFloat:J.a,WebGLCompressedTextureASTC:J.a,WebGLCompressedTextureATC:J.a,WEBGL_compressed_texture_atc:J.a,WebGLCompressedTextureETC1:J.a,WEBGL_compressed_texture_etc1:J.a,WebGLCompressedTextureETC:J.a,WebGLCompressedTexturePVRTC:J.a,WEBGL_compressed_texture_pvrtc:J.a,WebGLCompressedTextureS3TC:J.a,WEBGL_compressed_texture_s3tc:J.a,WebGLCompressedTextureS3TCsRGB:J.a,WebGLDebugRendererInfo:J.a,WEBGL_debug_renderer_info:J.a,WebGLDebugShaders:J.a,WEBGL_debug_shaders:J.a,WebGLDepthTexture:J.a,WEBGL_depth_texture:J.a,WebGLDrawBuffers:J.a,WEBGL_draw_buffers:J.a,EXTsRGB:J.a,EXT_sRGB:J.a,EXTBlendMinMax:J.a,EXT_blend_minmax:J.a,EXTColorBufferFloat:J.a,EXTColorBufferHalfFloat:J.a,EXTDisjointTimerQuery:J.a,EXTDisjointTimerQueryWebGL2:J.a,EXTFragDepth:J.a,EXT_frag_depth:J.a,EXTShaderTextureLOD:J.a,EXT_shader_texture_lod:J.a,EXTTextureFilterAnisotropic:J.a,EXT_texture_filter_anisotropic:J.a,WebGLFramebuffer:J.a,WebGLGetBufferSubDataAsync:J.a,WebGLLoseContext:J.a,WebGLExtensionLoseContext:J.a,WEBGL_lose_context:J.a,OESElementIndexUint:J.a,OES_element_index_uint:J.a,OESStandardDerivatives:J.a,OES_standard_derivatives:J.a,OESTextureFloat:J.a,OES_texture_float:J.a,OESTextureFloatLinear:J.a,OES_texture_float_linear:J.a,OESTextureHalfFloat:J.a,OES_texture_half_float:J.a,OESTextureHalfFloatLinear:J.a,OES_texture_half_float_linear:J.a,OESVertexArrayObject:J.a,OES_vertex_array_object:J.a,WebGLProgram:J.a,WebGLQuery:J.a,WebGLRenderbuffer:J.a,WebGLRenderingContext:J.a,WebGL2RenderingContext:J.a,WebGLSampler:J.a,WebGLShader:J.a,WebGLShaderPrecisionFormat:J.a,WebGLSync:J.a,WebGLTexture:J.a,WebGLTimerQueryEXT:J.a,WebGLTransformFeedback:J.a,WebGLUniformLocation:J.a,WebGLVertexArrayObject:J.a,WebGLVertexArrayObjectOES:J.a,WebGL2RenderingContextBase:J.a,ArrayBuffer:A.cn,SharedArrayBuffer:A.cn,ArrayBufferView:A.dO,DataView:A.dM,Float32Array:A.fu,Float64Array:A.fv,Int16Array:A.fw,Int32Array:A.fx,Int8Array:A.fy,Uint16Array:A.fz,Uint32Array:A.fA,Uint8ClampedArray:A.dP,CanvasPixelArray:A.dP,Uint8Array:A.dQ,HTMLAudioElement:A.r,HTMLBRElement:A.r,HTMLCanvasElement:A.r,HTMLContentElement:A.r,HTMLDListElement:A.r,HTMLDataElement:A.r,HTMLDataListElement:A.r,HTMLDetailsElement:A.r,HTMLDialogElement:A.r,HTMLEmbedElement:A.r,HTMLFieldSetElement:A.r,HTMLHRElement:A.r,HTMLHeadElement:A.r,HTMLHtmlElement:A.r,HTMLIFrameElement:A.r,HTMLLIElement:A.r,HTMLLabelElement:A.r,HTMLLegendElement:A.r,HTMLLinkElement:A.r,HTMLMapElement:A.r,HTMLMediaElement:A.r,HTMLMenuElement:A.r,HTMLMetaElement:A.r,HTMLMeterElement:A.r,HTMLModElement:A.r,HTMLOListElement:A.r,HTMLObjectElement:A.r,HTMLOptGroupElement:A.r,HTMLOutputElement:A.r,HTMLParamElement:A.r,HTMLPictureElement:A.r,HTMLPreElement:A.r,HTMLProgressElement:A.r,HTMLQuoteElement:A.r,HTMLScriptElement:A.r,HTMLShadowElement:A.r,HTMLSlotElement:A.r,HTMLSourceElement:A.r,HTMLStyleElement:A.r,HTMLTableCaptionElement:A.r,HTMLTableCellElement:A.r,HTMLTableDataCellElement:A.r,HTMLTableHeaderCellElement:A.r,HTMLTableColElement:A.r,HTMLTimeElement:A.r,HTMLTitleElement:A.r,HTMLTrackElement:A.r,HTMLUListElement:A.r,HTMLUnknownElement:A.r,HTMLVideoElement:A.r,HTMLDirectoryElement:A.r,HTMLFontElement:A.r,HTMLFrameElement:A.r,HTMLFrameSetElement:A.r,HTMLMarqueeElement:A.r,HTMLElement:A.r,AccessibleNodeList:A.eO,HTMLAnchorElement:A.cJ,HTMLAreaElement:A.eP,HTMLBaseElement:A.cK,Blob:A.bP,HTMLBodyElement:A.ca,HTMLButtonElement:A.bQ,CDATASection:A.bp,CharacterData:A.bp,Comment:A.bp,ProcessingInstruction:A.bp,Text:A.bp,CSSPerspective:A.f3,CSSCharsetRule:A.Y,CSSConditionRule:A.Y,CSSFontFaceRule:A.Y,CSSGroupingRule:A.Y,CSSImportRule:A.Y,CSSKeyframeRule:A.Y,MozCSSKeyframeRule:A.Y,WebKitCSSKeyframeRule:A.Y,CSSKeyframesRule:A.Y,MozCSSKeyframesRule:A.Y,WebKitCSSKeyframesRule:A.Y,CSSMediaRule:A.Y,CSSNamespaceRule:A.Y,CSSPageRule:A.Y,CSSRule:A.Y,CSSStyleRule:A.Y,CSSSupportsRule:A.Y,CSSViewportRule:A.Y,CSSStyleDeclaration:A.cc,MSStyleCSSProperties:A.cc,CSS2Properties:A.cc,CSSImageValue:A.aH,CSSKeywordValue:A.aH,CSSNumericValue:A.aH,CSSPositionValue:A.aH,CSSResourceValue:A.aH,CSSUnitValue:A.aH,CSSURLImageValue:A.aH,CSSStyleValue:A.aH,CSSMatrixComponent:A.be,CSSRotation:A.be,CSSScale:A.be,CSSSkew:A.be,CSSTranslation:A.be,CSSTransformComponent:A.be,CSSTransformValue:A.f4,CSSUnparsedValue:A.f5,DataTransferItemList:A.f6,HTMLDivElement:A.dp,XMLDocument:A.cd,Document:A.cd,DOMException:A.f7,DOMImplementation:A.dq,ClientRectList:A.dr,DOMRectList:A.dr,DOMRectReadOnly:A.ds,DOMStringList:A.f8,DOMTokenList:A.f9,MathMLElement:A.E,Element:A.E,AbortPaymentEvent:A.o,AnimationEvent:A.o,AnimationPlaybackEvent:A.o,ApplicationCacheErrorEvent:A.o,BackgroundFetchClickEvent:A.o,BackgroundFetchEvent:A.o,BackgroundFetchFailEvent:A.o,BackgroundFetchedEvent:A.o,BeforeInstallPromptEvent:A.o,BeforeUnloadEvent:A.o,BlobEvent:A.o,CanMakePaymentEvent:A.o,ClipboardEvent:A.o,CloseEvent:A.o,CustomEvent:A.o,DeviceMotionEvent:A.o,DeviceOrientationEvent:A.o,ErrorEvent:A.o,ExtendableEvent:A.o,ExtendableMessageEvent:A.o,FetchEvent:A.o,FontFaceSetLoadEvent:A.o,ForeignFetchEvent:A.o,GamepadEvent:A.o,HashChangeEvent:A.o,InstallEvent:A.o,MediaEncryptedEvent:A.o,MediaKeyMessageEvent:A.o,MediaQueryListEvent:A.o,MediaStreamEvent:A.o,MediaStreamTrackEvent:A.o,MessageEvent:A.o,MIDIConnectionEvent:A.o,MIDIMessageEvent:A.o,MutationEvent:A.o,NotificationEvent:A.o,PageTransitionEvent:A.o,PaymentRequestEvent:A.o,PaymentRequestUpdateEvent:A.o,PopStateEvent:A.o,PresentationConnectionAvailableEvent:A.o,PresentationConnectionCloseEvent:A.o,PromiseRejectionEvent:A.o,PushEvent:A.o,RTCDataChannelEvent:A.o,RTCDTMFToneChangeEvent:A.o,RTCPeerConnectionIceEvent:A.o,RTCTrackEvent:A.o,SecurityPolicyViolationEvent:A.o,SensorErrorEvent:A.o,SpeechRecognitionError:A.o,SpeechRecognitionEvent:A.o,SpeechSynthesisEvent:A.o,StorageEvent:A.o,SyncEvent:A.o,TrackEvent:A.o,TransitionEvent:A.o,WebKitTransitionEvent:A.o,VRDeviceEvent:A.o,VRDisplayEvent:A.o,VRSessionEvent:A.o,MojoInterfaceRequestEvent:A.o,USBConnectionEvent:A.o,AudioProcessingEvent:A.o,OfflineAudioCompletionEvent:A.o,WebGLContextEvent:A.o,Event:A.o,InputEvent:A.o,SubmitEvent:A.o,EventSource:A.du,AbsoluteOrientationSensor:A.f,Accelerometer:A.f,AccessibleNode:A.f,AmbientLightSensor:A.f,Animation:A.f,ApplicationCache:A.f,DOMApplicationCache:A.f,OfflineResourceList:A.f,BackgroundFetchRegistration:A.f,BatteryManager:A.f,BroadcastChannel:A.f,CanvasCaptureMediaStreamTrack:A.f,FontFaceSet:A.f,Gyroscope:A.f,LinearAccelerationSensor:A.f,Magnetometer:A.f,MediaDevices:A.f,MediaKeySession:A.f,MediaQueryList:A.f,MediaRecorder:A.f,MediaSource:A.f,MediaStream:A.f,MediaStreamTrack:A.f,MIDIAccess:A.f,MIDIInput:A.f,MIDIOutput:A.f,MIDIPort:A.f,NetworkInformation:A.f,Notification:A.f,OffscreenCanvas:A.f,OrientationSensor:A.f,PaymentRequest:A.f,Performance:A.f,PermissionStatus:A.f,PresentationAvailability:A.f,PresentationConnection:A.f,PresentationConnectionList:A.f,PresentationRequest:A.f,RelativeOrientationSensor:A.f,RemotePlayback:A.f,RTCDataChannel:A.f,DataChannel:A.f,RTCDTMFSender:A.f,RTCPeerConnection:A.f,webkitRTCPeerConnection:A.f,mozRTCPeerConnection:A.f,ScreenOrientation:A.f,Sensor:A.f,ServiceWorker:A.f,ServiceWorkerContainer:A.f,ServiceWorkerRegistration:A.f,SharedWorker:A.f,SpeechRecognition:A.f,webkitSpeechRecognition:A.f,SpeechSynthesis:A.f,SpeechSynthesisUtterance:A.f,VR:A.f,VRDevice:A.f,VRDisplay:A.f,VRSession:A.f,VisualViewport:A.f,WebSocket:A.f,Worker:A.f,WorkerPerformance:A.f,BluetoothDevice:A.f,BluetoothRemoteGATTCharacteristic:A.f,Clipboard:A.f,MojoInterfaceInterceptor:A.f,USB:A.f,IDBDatabase:A.f,IDBOpenDBRequest:A.f,IDBVersionChangeRequest:A.f,IDBRequest:A.f,IDBTransaction:A.f,AnalyserNode:A.f,RealtimeAnalyserNode:A.f,AudioBufferSourceNode:A.f,AudioDestinationNode:A.f,AudioNode:A.f,AudioScheduledSourceNode:A.f,AudioWorkletNode:A.f,BiquadFilterNode:A.f,ChannelMergerNode:A.f,AudioChannelMerger:A.f,ChannelSplitterNode:A.f,AudioChannelSplitter:A.f,ConstantSourceNode:A.f,ConvolverNode:A.f,DelayNode:A.f,DynamicsCompressorNode:A.f,GainNode:A.f,AudioGainNode:A.f,IIRFilterNode:A.f,MediaElementAudioSourceNode:A.f,MediaStreamAudioDestinationNode:A.f,MediaStreamAudioSourceNode:A.f,OscillatorNode:A.f,Oscillator:A.f,PannerNode:A.f,AudioPannerNode:A.f,webkitAudioPannerNode:A.f,ScriptProcessorNode:A.f,JavaScriptAudioNode:A.f,StereoPannerNode:A.f,WaveShaperNode:A.f,EventTarget:A.f,File:A.aL,FileList:A.dw,FileReader:A.dx,FileWriter:A.fb,HTMLFormElement:A.cf,Gamepad:A.aM,HTMLHeadingElement:A.dy,History:A.fd,HTMLCollection:A.bT,HTMLFormControlsCollection:A.bT,HTMLOptionsCollection:A.bT,HTMLDocument:A.dz,XMLHttpRequest:A.bz,XMLHttpRequestUpload:A.ch,XMLHttpRequestEventTarget:A.ch,ImageData:A.cN,HTMLImageElement:A.dA,HTMLInputElement:A.bU,KeyboardEvent:A.bB,Location:A.cT,MediaList:A.fp,MessagePort:A.fq,MIDIInputMap:A.fr,MIDIOutputMap:A.fs,MimeType:A.aO,MimeTypeArray:A.ft,MouseEvent:A.aA,DragEvent:A.aA,PointerEvent:A.aA,WheelEvent:A.aA,DocumentFragment:A.v,ShadowRoot:A.v,DocumentType:A.v,Node:A.v,NodeList:A.cV,RadioNodeList:A.cV,HTMLOptionElement:A.bC,HTMLParagraphElement:A.dT,Plugin:A.aP,PluginArray:A.fG,ProgressEvent:A.b8,ResourceProgressEvent:A.b8,RTCStatsReport:A.fI,HTMLSelectElement:A.bY,SourceBuffer:A.aR,SourceBufferList:A.fK,HTMLSpanElement:A.dY,SpeechGrammar:A.aS,SpeechGrammarList:A.fL,SpeechRecognitionResult:A.aT,Storage:A.e_,CSSStyleSheet:A.aB,StyleSheet:A.aB,HTMLTableElement:A.e2,HTMLTableRowElement:A.fO,HTMLTableSectionElement:A.fP,HTMLTemplateElement:A.d1,HTMLTextAreaElement:A.cp,TextTrack:A.aU,TextTrackCue:A.aC,VTTCue:A.aC,TextTrackCueList:A.fR,TextTrackList:A.fS,TimeRanges:A.fT,Touch:A.aV,TouchList:A.fW,TrackDefaultList:A.fX,CompositionEvent:A.bs,FocusEvent:A.bs,TextEvent:A.bs,TouchEvent:A.bs,UIEvent:A.bs,URL:A.h2,VideoTrackList:A.h5,Window:A.c2,DOMWindow:A.c2,DedicatedWorkerGlobalScope:A.bt,ServiceWorkerGlobalScope:A.bt,SharedWorkerGlobalScope:A.bt,WorkerGlobalScope:A.bt,Attr:A.d4,CSSRuleList:A.hc,ClientRect:A.ed,DOMRect:A.ed,GamepadList:A.hq,NamedNodeMap:A.el,MozNamedAttrMap:A.el,SpeechRecognitionResultList:A.hR,StyleSheetList:A.hX,IDBKeyRange:A.cS,IDBVersionChangeEvent:A.h4,SVGLength:A.b_,SVGLengthList:A.fn,SVGNumber:A.b2,SVGNumberList:A.fC,SVGPointList:A.fH,SVGScriptElement:A.d_,SVGStringList:A.fN,SVGAElement:A.u,SVGAnimateElement:A.u,SVGAnimateMotionElement:A.u,SVGAnimateTransformElement:A.u,SVGAnimationElement:A.u,SVGCircleElement:A.u,SVGClipPathElement:A.u,SVGDefsElement:A.u,SVGDescElement:A.u,SVGDiscardElement:A.u,SVGEllipseElement:A.u,SVGFEBlendElement:A.u,SVGFEColorMatrixElement:A.u,SVGFEComponentTransferElement:A.u,SVGFECompositeElement:A.u,SVGFEConvolveMatrixElement:A.u,SVGFEDiffuseLightingElement:A.u,SVGFEDisplacementMapElement:A.u,SVGFEDistantLightElement:A.u,SVGFEFloodElement:A.u,SVGFEFuncAElement:A.u,SVGFEFuncBElement:A.u,SVGFEFuncGElement:A.u,SVGFEFuncRElement:A.u,SVGFEGaussianBlurElement:A.u,SVGFEImageElement:A.u,SVGFEMergeElement:A.u,SVGFEMergeNodeElement:A.u,SVGFEMorphologyElement:A.u,SVGFEOffsetElement:A.u,SVGFEPointLightElement:A.u,SVGFESpecularLightingElement:A.u,SVGFESpotLightElement:A.u,SVGFETileElement:A.u,SVGFETurbulenceElement:A.u,SVGFilterElement:A.u,SVGForeignObjectElement:A.u,SVGGElement:A.u,SVGGeometryElement:A.u,SVGGraphicsElement:A.u,SVGImageElement:A.u,SVGLineElement:A.u,SVGLinearGradientElement:A.u,SVGMarkerElement:A.u,SVGMaskElement:A.u,SVGMetadataElement:A.u,SVGPathElement:A.u,SVGPatternElement:A.u,SVGPolygonElement:A.u,SVGPolylineElement:A.u,SVGRadialGradientElement:A.u,SVGRectElement:A.u,SVGSetElement:A.u,SVGStopElement:A.u,SVGStyleElement:A.u,SVGSVGElement:A.u,SVGSwitchElement:A.u,SVGSymbolElement:A.u,SVGTSpanElement:A.u,SVGTextContentElement:A.u,SVGTextElement:A.u,SVGTextPathElement:A.u,SVGTextPositioningElement:A.u,SVGTitleElement:A.u,SVGUseElement:A.u,SVGViewElement:A.u,SVGGradientElement:A.u,SVGComponentTransferFunctionElement:A.u,SVGFEDropShadowElement:A.u,SVGMPathElement:A.u,SVGElement:A.u,SVGTransform:A.b3,SVGTransformList:A.fY,AudioBuffer:A.eT,AudioParamMap:A.eU,AudioTrackList:A.eV,AudioContext:A.bO,webkitAudioContext:A.bO,BaseAudioContext:A.bO,OfflineAudioContext:A.fD})
hunkHelpers.setOrUpdateLeafTags({WebGL:true,AnimationEffectReadOnly:true,AnimationEffectTiming:true,AnimationEffectTimingReadOnly:true,AnimationTimeline:true,AnimationWorkletGlobalScope:true,AuthenticatorAssertionResponse:true,AuthenticatorAttestationResponse:true,AuthenticatorResponse:true,BackgroundFetchFetch:true,BackgroundFetchManager:true,BackgroundFetchSettledFetch:true,BarProp:true,BarcodeDetector:true,BluetoothRemoteGATTDescriptor:true,Body:true,BudgetState:true,CacheStorage:true,CanvasGradient:true,CanvasPattern:true,CanvasRenderingContext2D:true,Client:true,Clients:true,CookieStore:true,Coordinates:true,Credential:true,CredentialUserData:true,CredentialsContainer:true,Crypto:true,CryptoKey:true,CSS:true,CSSVariableReferenceValue:true,CustomElementRegistry:true,DataTransfer:true,DataTransferItem:true,DeprecatedStorageInfo:true,DeprecatedStorageQuota:true,DeprecationReport:true,DetectedBarcode:true,DetectedFace:true,DetectedText:true,DeviceAcceleration:true,DeviceRotationRate:true,DirectoryEntry:true,webkitFileSystemDirectoryEntry:true,FileSystemDirectoryEntry:true,DirectoryReader:true,WebKitDirectoryReader:true,webkitFileSystemDirectoryReader:true,FileSystemDirectoryReader:true,DocumentOrShadowRoot:true,DocumentTimeline:true,DOMError:true,Iterator:true,DOMMatrix:true,DOMMatrixReadOnly:true,DOMParser:true,DOMPoint:true,DOMPointReadOnly:true,DOMQuad:true,DOMStringMap:true,Entry:true,webkitFileSystemEntry:true,FileSystemEntry:true,External:true,FaceDetector:true,FederatedCredential:true,FileEntry:true,webkitFileSystemFileEntry:true,FileSystemFileEntry:true,DOMFileSystem:true,WebKitFileSystem:true,webkitFileSystem:true,FileSystem:true,FontFace:true,FontFaceSource:true,FormData:true,GamepadButton:true,GamepadPose:true,Geolocation:true,Position:true,GeolocationPosition:true,Headers:true,HTMLHyperlinkElementUtils:true,IdleDeadline:true,ImageBitmap:true,ImageBitmapRenderingContext:true,ImageCapture:true,InputDeviceCapabilities:true,IntersectionObserver:true,IntersectionObserverEntry:true,InterventionReport:true,KeyframeEffect:true,KeyframeEffectReadOnly:true,MediaCapabilities:true,MediaCapabilitiesInfo:true,MediaDeviceInfo:true,MediaError:true,MediaKeyStatusMap:true,MediaKeySystemAccess:true,MediaKeys:true,MediaKeysPolicy:true,MediaMetadata:true,MediaSession:true,MediaSettingsRange:true,MemoryInfo:true,MessageChannel:true,Metadata:true,MutationObserver:true,WebKitMutationObserver:true,MutationRecord:true,NavigationPreloadManager:true,Navigator:true,NavigatorAutomationInformation:true,NavigatorConcurrentHardware:true,NavigatorCookies:true,NavigatorUserMediaError:true,NodeFilter:true,NodeIterator:true,NonDocumentTypeChildNode:true,NonElementParentNode:true,NoncedElement:true,OffscreenCanvasRenderingContext2D:true,OverconstrainedError:true,PaintRenderingContext2D:true,PaintSize:true,PaintWorkletGlobalScope:true,PasswordCredential:true,Path2D:true,PaymentAddress:true,PaymentInstruments:true,PaymentManager:true,PaymentResponse:true,PerformanceEntry:true,PerformanceLongTaskTiming:true,PerformanceMark:true,PerformanceMeasure:true,PerformanceNavigation:true,PerformanceNavigationTiming:true,PerformanceObserver:true,PerformanceObserverEntryList:true,PerformancePaintTiming:true,PerformanceResourceTiming:true,PerformanceServerTiming:true,PerformanceTiming:true,Permissions:true,PhotoCapabilities:true,PositionError:true,GeolocationPositionError:true,Presentation:true,PresentationReceiver:true,PublicKeyCredential:true,PushManager:true,PushMessageData:true,PushSubscription:true,PushSubscriptionOptions:true,Range:true,RelatedApplication:true,ReportBody:true,ReportingObserver:true,ResizeObserver:true,ResizeObserverEntry:true,RTCCertificate:true,RTCIceCandidate:true,mozRTCIceCandidate:true,RTCLegacyStatsReport:true,RTCRtpContributingSource:true,RTCRtpReceiver:true,RTCRtpSender:true,RTCSessionDescription:true,mozRTCSessionDescription:true,RTCStatsResponse:true,Screen:true,ScrollState:true,ScrollTimeline:true,Selection:true,SpeechRecognitionAlternative:true,SpeechSynthesisVoice:true,StaticRange:true,StorageManager:true,StyleMedia:true,StylePropertyMap:true,StylePropertyMapReadonly:true,SyncManager:true,TaskAttributionTiming:true,TextDetector:true,TextMetrics:true,TrackDefault:true,TreeWalker:true,TrustedHTML:true,TrustedScriptURL:true,TrustedURL:true,UnderlyingSourceBase:true,URLSearchParams:true,VRCoordinateSystem:true,VRDisplayCapabilities:true,VREyeParameters:true,VRFrameData:true,VRFrameOfReference:true,VRPose:true,VRStageBounds:true,VRStageBoundsPoint:true,VRStageParameters:true,ValidityState:true,VideoPlaybackQuality:true,VideoTrack:true,VTTRegion:true,WindowClient:true,WorkletAnimation:true,WorkletGlobalScope:true,XPathEvaluator:true,XPathExpression:true,XPathNSResolver:true,XPathResult:true,XMLSerializer:true,XSLTProcessor:true,Bluetooth:true,BluetoothCharacteristicProperties:true,BluetoothRemoteGATTServer:true,BluetoothRemoteGATTService:true,BluetoothUUID:true,BudgetService:true,Cache:true,DOMFileSystemSync:true,DirectoryEntrySync:true,DirectoryReaderSync:true,EntrySync:true,FileEntrySync:true,FileReaderSync:true,FileWriterSync:true,HTMLAllCollection:true,Mojo:true,MojoHandle:true,MojoWatcher:true,NFC:true,PagePopupController:true,Report:true,Request:true,Response:true,SubtleCrypto:true,USBAlternateInterface:true,USBConfiguration:true,USBDevice:true,USBEndpoint:true,USBInTransferResult:true,USBInterface:true,USBIsochronousInTransferPacket:true,USBIsochronousInTransferResult:true,USBIsochronousOutTransferPacket:true,USBIsochronousOutTransferResult:true,USBOutTransferResult:true,WorkerLocation:true,WorkerNavigator:true,Worklet:true,IDBCursor:true,IDBCursorWithValue:true,IDBFactory:true,IDBIndex:true,IDBObjectStore:true,IDBObservation:true,IDBObserver:true,IDBObserverChanges:true,SVGAngle:true,SVGAnimatedAngle:true,SVGAnimatedBoolean:true,SVGAnimatedEnumeration:true,SVGAnimatedInteger:true,SVGAnimatedLength:true,SVGAnimatedLengthList:true,SVGAnimatedNumber:true,SVGAnimatedNumberList:true,SVGAnimatedPreserveAspectRatio:true,SVGAnimatedRect:true,SVGAnimatedString:true,SVGAnimatedTransformList:true,SVGMatrix:true,SVGPoint:true,SVGPreserveAspectRatio:true,SVGRect:true,SVGUnitTypes:true,AudioListener:true,AudioParam:true,AudioTrack:true,AudioWorkletGlobalScope:true,AudioWorkletProcessor:true,PeriodicWave:true,WebGLActiveInfo:true,ANGLEInstancedArrays:true,ANGLE_instanced_arrays:true,WebGLBuffer:true,WebGLCanvas:true,WebGLColorBufferFloat:true,WebGLCompressedTextureASTC:true,WebGLCompressedTextureATC:true,WEBGL_compressed_texture_atc:true,WebGLCompressedTextureETC1:true,WEBGL_compressed_texture_etc1:true,WebGLCompressedTextureETC:true,WebGLCompressedTexturePVRTC:true,WEBGL_compressed_texture_pvrtc:true,WebGLCompressedTextureS3TC:true,WEBGL_compressed_texture_s3tc:true,WebGLCompressedTextureS3TCsRGB:true,WebGLDebugRendererInfo:true,WEBGL_debug_renderer_info:true,WebGLDebugShaders:true,WEBGL_debug_shaders:true,WebGLDepthTexture:true,WEBGL_depth_texture:true,WebGLDrawBuffers:true,WEBGL_draw_buffers:true,EXTsRGB:true,EXT_sRGB:true,EXTBlendMinMax:true,EXT_blend_minmax:true,EXTColorBufferFloat:true,EXTColorBufferHalfFloat:true,EXTDisjointTimerQuery:true,EXTDisjointTimerQueryWebGL2:true,EXTFragDepth:true,EXT_frag_depth:true,EXTShaderTextureLOD:true,EXT_shader_texture_lod:true,EXTTextureFilterAnisotropic:true,EXT_texture_filter_anisotropic:true,WebGLFramebuffer:true,WebGLGetBufferSubDataAsync:true,WebGLLoseContext:true,WebGLExtensionLoseContext:true,WEBGL_lose_context:true,OESElementIndexUint:true,OES_element_index_uint:true,OESStandardDerivatives:true,OES_standard_derivatives:true,OESTextureFloat:true,OES_texture_float:true,OESTextureFloatLinear:true,OES_texture_float_linear:true,OESTextureHalfFloat:true,OES_texture_half_float:true,OESTextureHalfFloatLinear:true,OES_texture_half_float_linear:true,OESVertexArrayObject:true,OES_vertex_array_object:true,WebGLProgram:true,WebGLQuery:true,WebGLRenderbuffer:true,WebGLRenderingContext:true,WebGL2RenderingContext:true,WebGLSampler:true,WebGLShader:true,WebGLShaderPrecisionFormat:true,WebGLSync:true,WebGLTexture:true,WebGLTimerQueryEXT:true,WebGLTransformFeedback:true,WebGLUniformLocation:true,WebGLVertexArrayObject:true,WebGLVertexArrayObjectOES:true,WebGL2RenderingContextBase:true,ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false,HTMLAudioElement:true,HTMLBRElement:true,HTMLCanvasElement:true,HTMLContentElement:true,HTMLDListElement:true,HTMLDataElement:true,HTMLDataListElement:true,HTMLDetailsElement:true,HTMLDialogElement:true,HTMLEmbedElement:true,HTMLFieldSetElement:true,HTMLHRElement:true,HTMLHeadElement:true,HTMLHtmlElement:true,HTMLIFrameElement:true,HTMLLIElement:true,HTMLLabelElement:true,HTMLLegendElement:true,HTMLLinkElement:true,HTMLMapElement:true,HTMLMediaElement:true,HTMLMenuElement:true,HTMLMetaElement:true,HTMLMeterElement:true,HTMLModElement:true,HTMLOListElement:true,HTMLObjectElement:true,HTMLOptGroupElement:true,HTMLOutputElement:true,HTMLParamElement:true,HTMLPictureElement:true,HTMLPreElement:true,HTMLProgressElement:true,HTMLQuoteElement:true,HTMLScriptElement:true,HTMLShadowElement:true,HTMLSlotElement:true,HTMLSourceElement:true,HTMLStyleElement:true,HTMLTableCaptionElement:true,HTMLTableCellElement:true,HTMLTableDataCellElement:true,HTMLTableHeaderCellElement:true,HTMLTableColElement:true,HTMLTimeElement:true,HTMLTitleElement:true,HTMLTrackElement:true,HTMLUListElement:true,HTMLUnknownElement:true,HTMLVideoElement:true,HTMLDirectoryElement:true,HTMLFontElement:true,HTMLFrameElement:true,HTMLFrameSetElement:true,HTMLMarqueeElement:true,HTMLElement:false,AccessibleNodeList:true,HTMLAnchorElement:true,HTMLAreaElement:true,HTMLBaseElement:true,Blob:false,HTMLBodyElement:true,HTMLButtonElement:true,CDATASection:true,CharacterData:true,Comment:true,ProcessingInstruction:true,Text:true,CSSPerspective:true,CSSCharsetRule:true,CSSConditionRule:true,CSSFontFaceRule:true,CSSGroupingRule:true,CSSImportRule:true,CSSKeyframeRule:true,MozCSSKeyframeRule:true,WebKitCSSKeyframeRule:true,CSSKeyframesRule:true,MozCSSKeyframesRule:true,WebKitCSSKeyframesRule:true,CSSMediaRule:true,CSSNamespaceRule:true,CSSPageRule:true,CSSRule:true,CSSStyleRule:true,CSSSupportsRule:true,CSSViewportRule:true,CSSStyleDeclaration:true,MSStyleCSSProperties:true,CSS2Properties:true,CSSImageValue:true,CSSKeywordValue:true,CSSNumericValue:true,CSSPositionValue:true,CSSResourceValue:true,CSSUnitValue:true,CSSURLImageValue:true,CSSStyleValue:false,CSSMatrixComponent:true,CSSRotation:true,CSSScale:true,CSSSkew:true,CSSTranslation:true,CSSTransformComponent:false,CSSTransformValue:true,CSSUnparsedValue:true,DataTransferItemList:true,HTMLDivElement:true,XMLDocument:true,Document:false,DOMException:true,DOMImplementation:true,ClientRectList:true,DOMRectList:true,DOMRectReadOnly:false,DOMStringList:true,DOMTokenList:true,MathMLElement:true,Element:false,AbortPaymentEvent:true,AnimationEvent:true,AnimationPlaybackEvent:true,ApplicationCacheErrorEvent:true,BackgroundFetchClickEvent:true,BackgroundFetchEvent:true,BackgroundFetchFailEvent:true,BackgroundFetchedEvent:true,BeforeInstallPromptEvent:true,BeforeUnloadEvent:true,BlobEvent:true,CanMakePaymentEvent:true,ClipboardEvent:true,CloseEvent:true,CustomEvent:true,DeviceMotionEvent:true,DeviceOrientationEvent:true,ErrorEvent:true,ExtendableEvent:true,ExtendableMessageEvent:true,FetchEvent:true,FontFaceSetLoadEvent:true,ForeignFetchEvent:true,GamepadEvent:true,HashChangeEvent:true,InstallEvent:true,MediaEncryptedEvent:true,MediaKeyMessageEvent:true,MediaQueryListEvent:true,MediaStreamEvent:true,MediaStreamTrackEvent:true,MessageEvent:true,MIDIConnectionEvent:true,MIDIMessageEvent:true,MutationEvent:true,NotificationEvent:true,PageTransitionEvent:true,PaymentRequestEvent:true,PaymentRequestUpdateEvent:true,PopStateEvent:true,PresentationConnectionAvailableEvent:true,PresentationConnectionCloseEvent:true,PromiseRejectionEvent:true,PushEvent:true,RTCDataChannelEvent:true,RTCDTMFToneChangeEvent:true,RTCPeerConnectionIceEvent:true,RTCTrackEvent:true,SecurityPolicyViolationEvent:true,SensorErrorEvent:true,SpeechRecognitionError:true,SpeechRecognitionEvent:true,SpeechSynthesisEvent:true,StorageEvent:true,SyncEvent:true,TrackEvent:true,TransitionEvent:true,WebKitTransitionEvent:true,VRDeviceEvent:true,VRDisplayEvent:true,VRSessionEvent:true,MojoInterfaceRequestEvent:true,USBConnectionEvent:true,AudioProcessingEvent:true,OfflineAudioCompletionEvent:true,WebGLContextEvent:true,Event:false,InputEvent:false,SubmitEvent:false,EventSource:true,AbsoluteOrientationSensor:true,Accelerometer:true,AccessibleNode:true,AmbientLightSensor:true,Animation:true,ApplicationCache:true,DOMApplicationCache:true,OfflineResourceList:true,BackgroundFetchRegistration:true,BatteryManager:true,BroadcastChannel:true,CanvasCaptureMediaStreamTrack:true,FontFaceSet:true,Gyroscope:true,LinearAccelerationSensor:true,Magnetometer:true,MediaDevices:true,MediaKeySession:true,MediaQueryList:true,MediaRecorder:true,MediaSource:true,MediaStream:true,MediaStreamTrack:true,MIDIAccess:true,MIDIInput:true,MIDIOutput:true,MIDIPort:true,NetworkInformation:true,Notification:true,OffscreenCanvas:true,OrientationSensor:true,PaymentRequest:true,Performance:true,PermissionStatus:true,PresentationAvailability:true,PresentationConnection:true,PresentationConnectionList:true,PresentationRequest:true,RelativeOrientationSensor:true,RemotePlayback:true,RTCDataChannel:true,DataChannel:true,RTCDTMFSender:true,RTCPeerConnection:true,webkitRTCPeerConnection:true,mozRTCPeerConnection:true,ScreenOrientation:true,Sensor:true,ServiceWorker:true,ServiceWorkerContainer:true,ServiceWorkerRegistration:true,SharedWorker:true,SpeechRecognition:true,webkitSpeechRecognition:true,SpeechSynthesis:true,SpeechSynthesisUtterance:true,VR:true,VRDevice:true,VRDisplay:true,VRSession:true,VisualViewport:true,WebSocket:true,Worker:true,WorkerPerformance:true,BluetoothDevice:true,BluetoothRemoteGATTCharacteristic:true,Clipboard:true,MojoInterfaceInterceptor:true,USB:true,IDBDatabase:true,IDBOpenDBRequest:true,IDBVersionChangeRequest:true,IDBRequest:true,IDBTransaction:true,AnalyserNode:true,RealtimeAnalyserNode:true,AudioBufferSourceNode:true,AudioDestinationNode:true,AudioNode:true,AudioScheduledSourceNode:true,AudioWorkletNode:true,BiquadFilterNode:true,ChannelMergerNode:true,AudioChannelMerger:true,ChannelSplitterNode:true,AudioChannelSplitter:true,ConstantSourceNode:true,ConvolverNode:true,DelayNode:true,DynamicsCompressorNode:true,GainNode:true,AudioGainNode:true,IIRFilterNode:true,MediaElementAudioSourceNode:true,MediaStreamAudioDestinationNode:true,MediaStreamAudioSourceNode:true,OscillatorNode:true,Oscillator:true,PannerNode:true,AudioPannerNode:true,webkitAudioPannerNode:true,ScriptProcessorNode:true,JavaScriptAudioNode:true,StereoPannerNode:true,WaveShaperNode:true,EventTarget:false,File:true,FileList:true,FileReader:true,FileWriter:true,HTMLFormElement:true,Gamepad:true,HTMLHeadingElement:true,History:true,HTMLCollection:true,HTMLFormControlsCollection:true,HTMLOptionsCollection:true,HTMLDocument:true,XMLHttpRequest:true,XMLHttpRequestUpload:true,XMLHttpRequestEventTarget:false,ImageData:true,HTMLImageElement:true,HTMLInputElement:true,KeyboardEvent:true,Location:true,MediaList:true,MessagePort:true,MIDIInputMap:true,MIDIOutputMap:true,MimeType:true,MimeTypeArray:true,MouseEvent:true,DragEvent:true,PointerEvent:true,WheelEvent:true,DocumentFragment:true,ShadowRoot:true,DocumentType:true,Node:false,NodeList:true,RadioNodeList:true,HTMLOptionElement:true,HTMLParagraphElement:true,Plugin:true,PluginArray:true,ProgressEvent:true,ResourceProgressEvent:true,RTCStatsReport:true,HTMLSelectElement:true,SourceBuffer:true,SourceBufferList:true,HTMLSpanElement:true,SpeechGrammar:true,SpeechGrammarList:true,SpeechRecognitionResult:true,Storage:true,CSSStyleSheet:true,StyleSheet:true,HTMLTableElement:true,HTMLTableRowElement:true,HTMLTableSectionElement:true,HTMLTemplateElement:true,HTMLTextAreaElement:true,TextTrack:true,TextTrackCue:true,VTTCue:true,TextTrackCueList:true,TextTrackList:true,TimeRanges:true,Touch:true,TouchList:true,TrackDefaultList:true,CompositionEvent:true,FocusEvent:true,TextEvent:true,TouchEvent:true,UIEvent:false,URL:true,VideoTrackList:true,Window:true,DOMWindow:true,DedicatedWorkerGlobalScope:true,ServiceWorkerGlobalScope:true,SharedWorkerGlobalScope:true,WorkerGlobalScope:true,Attr:true,CSSRuleList:true,ClientRect:true,DOMRect:true,GamepadList:true,NamedNodeMap:true,MozNamedAttrMap:true,SpeechRecognitionResultList:true,StyleSheetList:true,IDBKeyRange:true,IDBVersionChangeEvent:true,SVGLength:true,SVGLengthList:true,SVGNumber:true,SVGNumberList:true,SVGPointList:true,SVGScriptElement:true,SVGStringList:true,SVGAElement:true,SVGAnimateElement:true,SVGAnimateMotionElement:true,SVGAnimateTransformElement:true,SVGAnimationElement:true,SVGCircleElement:true,SVGClipPathElement:true,SVGDefsElement:true,SVGDescElement:true,SVGDiscardElement:true,SVGEllipseElement:true,SVGFEBlendElement:true,SVGFEColorMatrixElement:true,SVGFEComponentTransferElement:true,SVGFECompositeElement:true,SVGFEConvolveMatrixElement:true,SVGFEDiffuseLightingElement:true,SVGFEDisplacementMapElement:true,SVGFEDistantLightElement:true,SVGFEFloodElement:true,SVGFEFuncAElement:true,SVGFEFuncBElement:true,SVGFEFuncGElement:true,SVGFEFuncRElement:true,SVGFEGaussianBlurElement:true,SVGFEImageElement:true,SVGFEMergeElement:true,SVGFEMergeNodeElement:true,SVGFEMorphologyElement:true,SVGFEOffsetElement:true,SVGFEPointLightElement:true,SVGFESpecularLightingElement:true,SVGFESpotLightElement:true,SVGFETileElement:true,SVGFETurbulenceElement:true,SVGFilterElement:true,SVGForeignObjectElement:true,SVGGElement:true,SVGGeometryElement:true,SVGGraphicsElement:true,SVGImageElement:true,SVGLineElement:true,SVGLinearGradientElement:true,SVGMarkerElement:true,SVGMaskElement:true,SVGMetadataElement:true,SVGPathElement:true,SVGPatternElement:true,SVGPolygonElement:true,SVGPolylineElement:true,SVGRadialGradientElement:true,SVGRectElement:true,SVGSetElement:true,SVGStopElement:true,SVGStyleElement:true,SVGSVGElement:true,SVGSwitchElement:true,SVGSymbolElement:true,SVGTSpanElement:true,SVGTextContentElement:true,SVGTextElement:true,SVGTextPathElement:true,SVGTextPositioningElement:true,SVGTitleElement:true,SVGUseElement:true,SVGViewElement:true,SVGGradientElement:true,SVGComponentTransferFunctionElement:true,SVGFEDropShadowElement:true,SVGMPathElement:true,SVGElement:false,SVGTransform:true,SVGTransformList:true,AudioBuffer:true,AudioParamMap:true,AudioTrackList:true,AudioContext:true,webkitAudioContext:true,BaseAudioContext:false,OfflineAudioContext:true})
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
var s=A.vv
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
function w(){}const rt=t=>t;function st(t,e){for(const n in e)t[n]=e[n];return t}function J(t){return t()}function F(){return Object.create(null)}function A(t){t.forEach(J)}function q(t){return typeof t=="function"}function Dt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function ot(t){return Object.keys(t).length===0}function ct(t,...e){if(t==null)return w;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Rt(t,e,n){t.$$.on_destroy.push(ct(e,n))}function Tt(t,e,n,i){if(t){const r=K(t,e,n,i);return t[0](r)}}function K(t,e,n,i){return t[1]&&i?st(n.ctx.slice(),t[1](i(e))):n.ctx}function qt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const l=[],s=Math.max(e.dirty.length,r.length);for(let u=0;u<s;u+=1)l[u]=e.dirty[u]|r[u];return l}return e.dirty|r}return e.dirty}function zt(t,e,n,i,r,l){if(r){const s=K(e,n,i,l);t.p(s,r)}}function Bt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}const Q=typeof window<"u";let lt=Q?()=>window.performance.now():()=>Date.now(),z=Q?t=>requestAnimationFrame(t):w;const b=new Set;function U(t){b.forEach(e=>{e.c(t)||(b.delete(e),e.f())}),b.size!==0&&z(U)}function ut(t){let e;return b.size===0&&z(U),{promise:new Promise(n=>{b.add(e={c:t,f:n})}),abort(){b.delete(e)}}}let O=!1;function at(){O=!0}function ft(){O=!1}function _t(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function dt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let c=0;c<e.length;c++){const f=e[c];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let o=0;o<e.length;o++){const c=e[o].claim_order,f=(r>0&&e[n[r]].claim_order<=c?r+1:_t(1,r,_=>e[n[_]].claim_order,c))-1;i[o]=n[f]+1;const a=f+1;n[a]=o,r=Math.max(a,r)}const l=[],s=[];let u=e.length-1;for(let o=n[r]+1;o!=0;o=i[o-1]){for(l.push(e[o-1]);u>=o;u--)s.push(e[u]);u--}for(;u>=0;u--)s.push(e[u]);l.reverse(),s.sort((o,c)=>o.claim_order-c.claim_order);for(let o=0,c=0;o<s.length;o++){for(;c<l.length&&s[o].claim_order>=l[c].claim_order;)c++;const f=c<l.length?l[c]:null;t.insertBefore(s[o],f)}}function ht(t,e){t.appendChild(e)}function W(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function mt(t){const e=X("style");return pt(W(t),e),e.sheet}function pt(t,e){return ht(t.head||t,e),e.sheet}function yt(t,e){if(O){for(dt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Lt(t,e,n){O&&!n?yt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function V(t){t.parentNode&&t.parentNode.removeChild(t)}function Ft(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function X(t){return document.createElement(t)}function B(t){return document.createTextNode(t)}function It(){return B(" ")}function Ht(){return B("")}function Gt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Jt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function gt(t){return Array.from(t.childNodes)}function xt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function Y(t,e,n,i,r=!1){xt(t);const l=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const u=t[s];if(e(u)){const o=n(u);return o===void 0?t.splice(s,1):t[s]=o,r||(t.claim_info.last_index=s),u}}for(let s=t.claim_info.last_index-1;s>=0;s--){const u=t[s];if(e(u)){const o=n(u);return o===void 0?t.splice(s,1):t[s]=o,r?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,u}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function $t(t,e,n,i){return Y(t,r=>r.nodeName===e,r=>{const l=[];for(let s=0;s<r.attributes.length;s++){const u=r.attributes[s];n[u.name]||l.push(u.name)}l.forEach(s=>r.removeAttribute(s))},()=>i(e))}function Kt(t,e,n){return $t(t,e,n,X)}function bt(t,e){return Y(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>B(e),!0)}function Qt(t){return bt(t," ")}function Ut(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Wt(t,e){t.value=e??""}function Vt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Xt(t,e){for(let n=0;n<t.options.length;n+=1){const i=t.options[n];if(i.__value===e){i.selected=!0;return}}t.selectedIndex=-1}function Yt(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}function wt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function Zt(t,e){return new t(e)}const C=new Map;let j=0;function vt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Et(t,e){const n={stylesheet:mt(e),rules:{}};return C.set(t,n),n}function Nt(t,e,n,i,r,l,s,u=0){const o=16.666/i;let c=`{
`;for(let m=0;m<=1;m+=o){const g=e+(n-e)*l(m);c+=m*100+`%{${s(g,1-g)}}
`}const f=c+`100% {${s(n,1-n)}}
}`,a=`__svelte_${vt(f)}_${u}`,_=W(t),{stylesheet:d,rules:h}=C.get(_)||Et(_,t);h[a]||(h[a]=!0,d.insertRule(`@keyframes ${a} ${f}`,d.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${a} ${i}ms linear ${r}ms 1 both`,j+=1,a}function I(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?l=>l.indexOf(e)<0:l=>l.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),j-=r,j||At())}function At(){z(()=>{j||(C.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&V(e)}),C.clear())})}let N;function E(t){N=t}function Z(){if(!N)throw new Error("Function called outside component initialization");return N}function te(t){Z().$$.on_mount.push(t)}function ee(t){Z().$$.after_update.push(t)}const $=[],H=[],S=[],R=[],tt=Promise.resolve();let T=!1;function et(){T||(T=!0,tt.then(nt))}function ne(){return et(),tt}function M(t){S.push(t)}function ie(t){R.push(t)}const D=new Set;let x=0;function nt(){if(x!==0)return;const t=N;do{try{for(;x<$.length;){const e=$[x];x++,E(e),St(e.$$)}}catch(e){throw $.length=0,x=0,e}for(E(null),$.length=0,x=0;H.length;)H.pop()();for(let e=0;e<S.length;e+=1){const n=S[e];D.has(n)||(D.add(n),n())}S.length=0}while($.length);for(;R.length;)R.pop()();T=!1,D.clear(),E(t)}function St(t){if(t.fragment!==null){t.update(),A(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}let v;function kt(){return v||(v=Promise.resolve(),v.then(()=>{v=null})),v}function G(t,e,n){t.dispatchEvent(wt(`${e?"intro":"outro"}${n}`))}const k=new Set;let p;function re(){p={r:0,c:[],p}}function se(){p.r||A(p.c),p=p.p}function Ct(t,e){t&&t.i&&(k.delete(t),t.i(e))}function oe(t,e,n,i){if(t&&t.o){if(k.has(t))return;k.add(t),p.c.push(()=>{k.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const jt={duration:0};function ce(t,e,n){const i={direction:"in"};let r=e(t,n,i),l=!1,s,u,o=0;function c(){s&&I(t,s)}function f(){const{delay:_=0,duration:d=300,easing:h=rt,tick:y=w,css:m}=r||jt;m&&(s=Nt(t,0,1,d,_,h,m,o++)),y(0,1);const g=lt()+_,it=g+d;u&&u.abort(),l=!0,M(()=>G(t,!0,"start")),u=ut(P=>{if(l){if(P>=it)return y(1,0),G(t,!0,"end"),c(),l=!1;if(P>=g){const L=h((P-g)/d);y(L,1-L)}}return l})}let a=!1;return{start(){a||(a=!0,I(t),q(r)?(r=r(i),kt().then(f)):f())},invalidate(){a=!1},end(){l&&(c(),l=!1)}}}function le(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function ue(t){t&&t.c()}function ae(t,e){t&&t.l(e)}function Mt(t,e,n,i){const{fragment:r,after_update:l}=t.$$;r&&r.m(e,n),i||M(()=>{const s=t.$$.on_mount.map(J).filter(q);t.$$.on_destroy?t.$$.on_destroy.push(...s):A(s),t.$$.on_mount=[]}),l.forEach(M)}function Ot(t,e){const n=t.$$;n.fragment!==null&&(A(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Pt(t,e){t.$$.dirty[0]===-1&&($.push(t),et(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function fe(t,e,n,i,r,l,s,u=[-1]){const o=N;E(t);const c=t.$$={fragment:null,ctx:[],props:l,update:w,not_equal:r,bound:F(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:F(),dirty:u,skip_bound:!1,root:e.target||o.$$.root};s&&s(c.root);let f=!1;if(c.ctx=n?n(t,e.props||{},(a,_,...d)=>{const h=d.length?d[0]:_;return c.ctx&&r(c.ctx[a],c.ctx[a]=h)&&(!c.skip_bound&&c.bound[a]&&c.bound[a](h),f&&Pt(t,a)),_}):[],c.update(),f=!0,A(c.before_update),c.fragment=i?i(c.ctx):!1,e.target){if(e.hydrate){at();const a=gt(e.target);c.fragment&&c.fragment.l(a),a.forEach(V)}else c.fragment&&c.fragment.c();e.intro&&Ct(t.$$.fragment),Mt(t,e.target,e.anchor,e.customElement),ft(),nt()}E(o)}class _e{$destroy(){Ot(this,1),this.$destroy=w}$on(e,n){if(!q(n))return w;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!ot(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{ne as A,w as B,Tt as C,zt as D,Bt as E,qt as F,yt as G,Rt as H,Gt as I,q as J,rt as K,Wt as L,M,ce as N,Xt as O,Ft as P,Yt as Q,H as R,_e as S,le as T,ie as U,It as a,Lt as b,Qt as c,se as d,Ht as e,Ct as f,re as g,V as h,fe as i,ee as j,X as k,Kt as l,gt as m,Jt as n,te as o,Vt as p,B as q,bt as r,Dt as s,oe as t,Ut as u,Zt as v,ue as w,ae as x,Mt as y,Ot as z};
(this.webpackJsonpblog=this.webpackJsonpblog||[]).push([[0],[,,,,,,,,,,,function(e,t,l){},function(e,t,l){},function(e,t,l){},function(e,t,l){},function(e,t,l){},function(e,t,l){"use strict";l.r(t);var o,n,a,i=l(0),u=l(1),b=l(5),s=l.n(b),c=l(2),r=l(3),v=(l(11),l(18)),f=(l(12),function(e){var t=e.value;return Object(i.jsx)("div",{className:"NumberDisplay",children:t<0?"-".concat(Math.abs(t).toString().padStart(2,"0")):t.toString().padStart(3,"0")})});!function(e){e[e.none=0]="none",e[e.one=1]="one",e[e.two=2]="two",e[e.three=3]="three",e[e.four=4]="four",e[e.five=5]="five",e[e.six=6]="six",e[e.seven=7]="seven",e[e.eight=8]="eight",e[e.bomb=9]="bomb"}(o||(o={})),function(e){e[e.open=0]="open",e[e.visible=1]="visible",e[e.flagged=2]="flagged"}(n||(n={})),function(e){e.smile="\ud83d\ude03",e.oh="\ud83d\ude2e",e.lost="\ud83d\ude2b",e.won="\ud83e\udd29"}(a||(a={}));var d=function(e,t,l){return{topLeftCell:t>0&&l>0?e[t-1][l-1]:null,topCell:t>0?e[t-1][l]:null,topRightCell:t>0&&l<8?e[t-1][l+1]:null,leftCell:l>0?e[t][l-1]:null,rightCell:l<8?e[t][l+1]:null,bottomLeftCell:t<8&&l>0?e[t+1][l-1]:null,bottomCell:t<8?e[t+1][l]:null,bottomRightCell:t<8&&l<8?e[t+1][l+1]:null}},m=function(){for(var e=[],t=0;t<9;t++){e.push([]);for(var l=0;l<9;l++)e[t].push({value:o.none,state:n.open})}for(var a=0,i=function(){var t=Math.floor(9*Math.random()),l=Math.floor(9*Math.random());e[t][l].value!==o.bomb&&(e=e.map((function(e,n){return e.map((function(e,a){return t===n&&l===a?Object(c.a)(Object(c.a)({},e),{},{value:o.bomb}):e}))})),a+=1)};a<10;)i();for(var u=0;u<9;u++)for(var b=0;b<9;b++){var s=e[u][b];if(s.value!==o.bomb){var r=0,v=d(e,u,b),f=v.topLeftCell,m=v.topCell,j=v.topRightCell,p=v.leftCell,O=v.rightCell,h=v.bottomLeftCell,g=v.bottomCell,C=v.bottomRightCell;(null===f||void 0===f?void 0:f.value)===o.bomb&&(r+=1),(null===m||void 0===m?void 0:m.value)===o.bomb&&(r+=1),(null===j||void 0===j?void 0:j.value)===o.bomb&&(r+=1),(null===p||void 0===p?void 0:p.value)===o.bomb&&(r+=1),(null===O||void 0===O?void 0:O.value)===o.bomb&&(r+=1),(null===h||void 0===h?void 0:h.value)===o.bomb&&(r+=1),(null===g||void 0===g?void 0:g.value)===o.bomb&&(r+=1),(null===C||void 0===C?void 0:C.value)===o.bomb&&(r+=1),r>0&&(e[u][b]=Object(c.a)(Object(c.a)({},s),{},{value:r}))}}return e},j=function e(t,l,a){var i=t[l][a];if(i.state===n.visible||i.state===n.flagged)return t;var u=t.slice();u[l][a].state=n.visible;var b=d(t,l,a),s=b.topLeftCell,c=b.topCell,r=b.topRightCell,v=b.leftCell,f=b.rightCell,m=b.bottomLeftCell,j=b.bottomCell,p=b.bottomRightCell;return(null===s||void 0===s?void 0:s.state)===n.open&&s.value!==o.bomb&&(s.value===o.none?u=e(u,l-1,a-1):u[l-1][a-1].state=n.visible),(null===c||void 0===c?void 0:c.state)===n.open&&c.value!==o.bomb&&(c.value===o.none?u=e(u,l-1,a):u[l-1][a].state=n.visible),(null===r||void 0===r?void 0:r.state)===n.open&&r.value!==o.bomb&&(r.value===o.none?u=e(u,l-1,a+1):u[l-1][a+1].state=n.visible),(null===v||void 0===v?void 0:v.state)===n.open&&v.value!==o.bomb&&(v.value===o.none?u=e(u,l,a-1):u[l][a-1].state=n.visible),(null===f||void 0===f?void 0:f.state)===n.open&&f.value!==o.bomb&&(f.value===o.none?u=e(u,l,a+1):u[l][a+1].state=n.visible),(null===m||void 0===m?void 0:m.state)===n.open&&m.value!==o.bomb&&(m.value===o.none?u=e(u,l+1,a-1):u[l+1][a-1].state=n.visible),(null===j||void 0===j?void 0:j.state)===n.open&&j.value!==o.bomb&&(j.value===o.none?u=e(u,l+1,a):u[l+1][a].state=n.visible),(null===p||void 0===p?void 0:p.state)===n.open&&p.value!==o.bomb&&(p.value===o.none?u=e(u,l+1,a+1):u[l+1][a+1].state=n.visible),u},p=(l(13),function(e){var t=e.row,l=e.col,a=e.state,u=e.onContext,b=e.value,s=e.onClick,c=e.red;return Object(i.jsx)("div",{role:"button",className:"Button ".concat(a===n.visible?"visible":""," value-").concat(b," ").concat(c?"red":""),onClick:s(t,l),tabIndex:0,onKeyDown:s(t,l),onContextMenu:u(t,l),children:a===n.visible?b===o.bomb?Object(i.jsx)("span",{role:"img","aria-label":"bomb",children:"\ud83d\udca3"}):b===o.none?null:b:a===n.flagged?Object(i.jsx)("span",{role:"img","aria-label":"flag",children:"\ud83d\udea9"}):null})}),O=(l(14),function(e){var t=e.text,l=e.time,o=e.hasLost,n=e.hasWon;return Object(i.jsxs)("div",{className:"Text ".concat(n?"green":""," ").concat(o?"red":""),children:[Object(i.jsxs)("h3",{children:[t," in ",l," sec"]}),Object(i.jsx)("p",{children:"To restart press the Emoji button"})]})}),h=function(){var e=Object(u.useState)(m()),t=Object(r.a)(e,2),l=t[0],b=t[1],s=Object(u.useState)(a.smile),d=Object(r.a)(s,2),h=d[0],g=d[1],C=Object(u.useState)(0),x=Object(r.a)(C,2),S=x[0],w=x[1],k=Object(u.useState)(!1),L=Object(r.a)(k,2),N=L[0],M=L[1],R=Object(u.useState)(10),y=Object(r.a)(R,2),E=y[0],I=y[1],D=Object(u.useState)(!1),B=Object(r.a)(D,2),J=B[0],K=B[1],T=Object(u.useState)(!1),W=Object(r.a)(T,2),Y=W[0],A=W[1],F=Object(u.useState)(0),H=Object(r.a)(F,2),q=H[0],z=H[1];Object(u.useEffect)((function(){if(N&&S<999&&!J&&!Y){var e=setInterval((function(){w(S+1)}),1e3);return function(){clearInterval(e)}}}),[N,S,J,Y]),Object(u.useEffect)((function(){return J&&(M(!1),g(a.lost),z(S)),function(){g(a.smile)}}),[J,S]),Object(u.useEffect)((function(){Y&&(M(!1),g(a.won),z(S))}),[Y,S]);var G=function(e,t){return function(){var a=l.slice();if(!N){for(var i=a[e][t].value===o.bomb;i;)if((a=m())[e][t].value!==o.bomb){i=!1;break}M(!0)}var u=a[e][t];if(!([n.flagged,n.visible].includes(u.state)||J||Y)){if(u.value===o.bomb)return K(!0),a[e][t].red=!0,a=U(),void b(a);u.value===o.none?a=j(a,e,t):a[e][t].state=n.visible;for(var s=!1,r=0;r<9;r++)for(var v=0;v<9;v++)if((u=a[r][v]).value!==o.bomb&&u.state===n.open){s=!0;break}s||(a=a.map((function(e){return e.map((function(e){return e.value===o.bomb?Object(c.a)(Object(c.a)({},e),{},{state:n.flagged}):e}))})),A(!0)),b(a)}}},P=function(e,t){return function(o){if(o.preventDefault(),N&&!J&&!Y){var a=l.slice(),i=l[e][t];i.state!==n.visible&&(i.state===n.open?(a[e][t].state=n.flagged,b(a),I(E-1)):i.state===n.flagged&&(a[e][t].state=n.open,b(a),I(E+1)))}}},Q=function(){M(!1),w(0),b(m()),K(!1),A(!1)},U=function(){return l.slice().map((function(e){return e.map((function(e){return e.value===o.bomb?Object(c.a)(Object(c.a)({},e),{},{state:n.visible}):e}))}))};return Object(i.jsxs)("div",{children:[Object(i.jsxs)("div",{className:"App",children:[Object(i.jsxs)("div",{className:"Header",children:[Object(i.jsx)(f,{value:E}),Object(i.jsx)("div",{className:"Face",onClick:Q,role:"button",tabIndex:0,onKeyDown:Q,children:Object(i.jsx)("span",{role:"img","aria-label":"face",children:h})}),Object(i.jsx)(f,{value:S})]}),Object(i.jsx)("div",{className:"Body",children:l.map((function(e,t){return e.map((function(e,l){return Object(i.jsx)(p,{col:l,onClick:G,onContext:P,red:e.red,row:t,state:e.state,value:e.value},Object(v.a)())}))}))})]}),Y&&Object(i.jsx)(O,{text:"You won",time:q,hasWon:Y}),J&&Object(i.jsx)(O,{text:"You lost",time:q,hasLost:J})]})};l(15);s.a.render(Object(i.jsx)(h,{}),document.getElementById("root"))}],[[16,1,2]]]);
//# sourceMappingURL=main.700d4f7c.chunk.js.map
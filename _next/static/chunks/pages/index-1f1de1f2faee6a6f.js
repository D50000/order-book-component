(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(708)}])},708:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return _}});var i=t(5893),r=t(9547),a=t.n(r),o=t(9008),l=t.n(o),s=t(7294),u=t(7676),c=t(5675),d=t.n(c),f=t(5114),p=t(5340),b=t(2125);function h(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}function v(){var e=h(["\n  width: 300px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background: #1e2c4c;\n  color: #ffffff;\n\n  .title {\n    height: 33px;\n    width: 100%;\n    padding-left: 10px;\n    font-size: 15px;\n    font-weight: 500;\n    display: flex;\n    align-items: center;\n    border-bottom: 1px solid #1b2338;\n  }\n\n  .quote-table-head {\n    color: #8698aa;\n    width: 100%;\n    height: 21px;\n    padding: 5px 10px 0;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n\n    > span {\n      width: 33%;\n      text-align: end;\n    }\n  }\n"]);return v=function(){return e},e}function x(){var e=h(["\n  color: #ffffff;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  cursor: pointer;\n\n  &.sell > div.container {\n    // For cumulate hover\n    &:hover {\n      background: #334573;\n      cursor: pointer;\n    }\n    &:hover ~ div {\n      background: #4665b645;\n    }\n\n    // For size bar\n    &.blink-red {\n      animation: blink-red-animation 0.2s;\n    }\n\n    > div > span:nth-child(1) {\n      color: #ff5b5a;\n    }\n\n    .total-size-bar .bar {\n      background: rgba(255, 90, 90, 0.12);\n    }\n  }\n\n  // For BuyQuote cumulate hover\n  &.buy:hover {\n    background: #4665b645;\n  }\n\n  &.buy > div.container {\n    // For cumulate hover\n    &:hover {\n      background: #334573;\n      cursor: pointer;\n    }\n\n    &:hover ~ div.container {\n      background: #1e2c4c;\n    }\n\n    // For size bar\n    &.blink-green {\n      animation: blink-green-animation 0.2s;\n    }\n\n    > div > span:nth-child(1) {\n      color: #00b15d;\n    }\n\n    .total-size-bar .bar {\n      background: rgba(16, 186, 104, 0.12);\n    }\n  }\n\n  > div.container > div {\n    width: 100%;\n    height: 21px;\n    padding: 1px 10px 2px;\n    display: flex;\n    justify-content: space-between;\n\n    > span {\n      width: 33%;\n      text-align: end;\n\n      &.increase {\n        animation: blink-green-animation 0.1s;\n      }\n\n      &.decrease {\n        animation: blink-red-animation 0.1s;\n      }\n    }\n\n    .total-size-bar {\n      display: flex;\n      width: 33%;\n      position: relative;\n\n      > span.size {\n        width: 100%;\n        text-align: end;\n      }\n\n      > div.bar {\n        z-index: 2;\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 5px;\n      }\n    }\n  }\n\n  @keyframes blink-green-animation {\n    to {\n      background: rgba(0, 177, 93, 0.5);\n    }\n  }\n\n  @keyframes blink-red-animation {\n    to {\n      background: rgba(255, 91, 90, 0.5);\n    }\n  }\n"]);return x=function(){return e},e}function m(){var e=h(["\n  font-size: 16.8px;\n  font-weight: 700;\n  width: 100%;\n  height: 28px;\n  padding-left: 25px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &.increase {\n    color: #00b15d;\n    background: rgba(0, 177, 93, 0.12);\n  }\n\n  &.decrease {\n    color: #ff5b5a;\n    background: rgba(255, 91, 90, 0.12);\n  }\n\n  &.fair {\n    color: #ffffff;\n    background: rgba(134, 152, 170, 0.12);\n  }\n\n  > span {\n    height: 21.5px;\n  }\n\n  > div {\n    width: 15px;\n    height: 24px;\n    margin-left: 3px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    &.up {\n      transform: rotate(180deg);\n    }\n  }\n"]);return m=function(){return e},e}var y=b.ZP.div(v()),g=b.ZP.div(x()),j=b.ZP.div(m()),S={src:"order-book-component/_next/static/media/IconArrowGreen.d091ac1a.svg",height:24,width:24},z={src:"order-book-component/_next/static/media/IconArrowRed.63709966.svg",height:24,width:24};function Q(){var e,n,t=(e=["\n  height: 40px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n"],n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}})));return Q=function(){return t},t}var w,N,T=b.ZP.div(Q()),k=function(e){var n=e.orderBookData,t=e.index;return(0,i.jsxs)(T,{children:[(0,i.jsxs)("span",{children:["Avg Price:"," ",(0,i.jsx)(p,{value:n.sellQuote[t].cumulativeTotalValue/n.sellQuote[t].cumulativeTotalSize,displayType:"text",thousandSeparator:!0,suffix:" USD",decimalScale:1})]}),(0,i.jsxs)("span",{children:["Total Value:"," ",(0,i.jsx)(p,{value:n.sellQuote[t].cumulativeTotalValue,displayType:"text",thousandSeparator:!0,suffix:" USD",decimalScale:1})]})]})};function E(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,i=new Array(n);t<n;t++)i[t]=e[t];return i}function P(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var i,r,a=[],o=!0,l=!1;try{for(t=t.call(e);!(o=(i=t.next()).done)&&(a.push(i.value),!n||a.length!==n);o=!0);}catch(s){l=!0,r=s}finally{try{o||null==t.return||t.return()}finally{if(l)throw r}}return a}}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return E(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return E(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}!function(e){e.NORMAL="normal",e.INCREASE="increase",e.DECREASE="decrease"}(w||(w={})),function(e){e[e.SELL_QUOTE=0]="SELL_QUOTE",e[e.BUY_QUOTE=1]="BUY_QUOTE"}(N||(N={}));var O={op:"subscribe",args:["orderBookApi:BTCPFC_0"]},B=function(){var e,n,t=(0,s.useState)({}),r=t[0],a=t[1],o=(0,u.ZP)("wss://ws.btse.com/ws/futures",{onOpen:function(){return console.log("WebSocket connection opened.")},onClose:function(){return console.log("WebSocket connection closed.")},shouldReconnect:function(e){return!0},onMessage:function(e){return l(e.data)}}).sendJsonMessage,l=function(e){try{var n=JSON.parse(e);(null===n||void 0===n?void 0:n.data)&&c(n.data)}catch(t){console.error("Error: ".concat(t))}},c=function(e){for(var n=[],t=0,i=0,o={},l=e.sellQuote.reverse(),s=[],u=0,c=0,d={},f=0;f<8;f++)t+=+l[f].size,l[f].cumulativeTotalSize=t,l[f].totalValue=+l[f].price*+l[f].size,i+=l[f].totalValue,l[f].cumulativeTotalValue=i,n.push(l[f]),o[l[f].price]={price:+l[f].price,size:+l[f].size,sizeChange:w.NORMAL,isNewRow:!1},e.diffSellQuote=o,u+=+e.buyQuote[f].size,e.buyQuote[f].cumulativeTotalSize=u,e.buyQuote[f].totalValue=+e.buyQuote[f].price*+e.buyQuote[f].size,c+=e.buyQuote[f].totalValue,e.buyQuote[f].cumulativeTotalValue=c,s.push(e.buyQuote[f]),d[e.buyQuote[f].price]={price:+e.buyQuote[f].price,size:+e.buyQuote[f].size,sizeChange:w.NORMAL,isNewRow:!1},e.diffBuyQuote=d;e.sellQuote=n.reverse(),e.buyQuote=s;var p=r,b=e;if((null===p||void 0===p?void 0:p.diffSellQuote)&&(null===p||void 0===p?void 0:p.diffBuyQuote)){var h=!0,v=!1,x=void 0;try{for(var m,y=Object.entries(b.diffSellQuote)[Symbol.iterator]();!(h=(m=y.next()).done);h=!0){var g=P(m.value,2),j=g[0];g[1];p.diffSellQuote[j]?p.diffSellQuote[j].size>b.diffSellQuote[j].size?b.diffSellQuote[j].sizeChange=w.DECREASE:p.diffSellQuote[j].size<b.diffSellQuote[j].size&&(b.diffSellQuote[j].sizeChange=w.INCREASE):b.diffSellQuote[j].isNewRow=!0}}catch(A){v=!0,x=A}finally{try{h||null==y.return||y.return()}finally{if(v)throw x}}var S=!0,z=!1,Q=void 0;try{for(var N,T=Object.entries(b.diffBuyQuote)[Symbol.iterator]();!(S=(N=T.next()).done);S=!0){var k=P(N.value,2),E=k[0];k[1];p.diffBuyQuote[E]?p.diffBuyQuote[E].size>b.diffBuyQuote[E].size?b.diffBuyQuote[E].sizeChange=w.DECREASE:p.diffBuyQuote[E].size<b.diffBuyQuote[E].size&&(b.diffBuyQuote[E].sizeChange=w.INCREASE):b.diffBuyQuote[E].isNewRow=!0}}catch(A){z=!0,Q=A}finally{try{S||null==T.return||T.return()}finally{if(z)throw Q}}}for(var O=b.sellQuote[0].cumulativeTotalSize>b.buyQuote[7].cumulativeTotalSize?100/b.sellQuote[0].cumulativeTotalSize:100/b.buyQuote[7].cumulativeTotalSize,B=0;B<b.sellQuote.length;B++)b.sellQuote[B].cumulativeTotalInPercent=b.sellQuote[B].cumulativeTotalSize*O;for(var C=0;C<b.buyQuote.length;C++)b.buyQuote[C].cumulativeTotalInPercent=b.buyQuote[C].cumulativeTotalSize*O;a(e)};return(0,s.useEffect)((function(){o(O)}),[O]),(0,i.jsxs)(y,{children:[(0,i.jsx)("div",{className:"title",children:"Order Book"}),(0,i.jsxs)("div",{className:"quote-table-head",children:[(0,i.jsxs)("span",{children:["Price ","(USD)"]}),(0,i.jsx)("span",{children:"Size"}),(0,i.jsx)("span",{children:"Total"})]}),(0,i.jsx)(g,{className:"sell",children:null===(e=r.sellQuote)||void 0===e?void 0:e.map((function(e,n){return(0,i.jsx)("div",{className:"container "+(r.diffSellQuote[e.price].isNewRow?"blink-red":""),children:(0,i.jsxs)(f.ZP,{placement:"rightStart",color:"invert",content:(0,i.jsx)(k,{orderBookData:r,index:n}),children:[(0,i.jsx)(p,{value:e.price,displayType:"text",thousandSeparator:!0}),(0,i.jsx)(p,{className:r.diffSellQuote[e.price].sizeChange,value:e.size,displayType:"text",thousandSeparator:!0}),(0,i.jsx)(p,{value:e.cumulativeTotalSize,displayType:"text",thousandSeparator:!0,renderText:function(n){return(0,i.jsxs)("div",{className:"total-size-bar",children:[(0,i.jsx)("span",{className:"size",children:n}),(0,i.jsx)("div",{className:"bar",style:{width:e.cumulativeTotalInPercent}})]})}})]})},n)}))}),function(){switch(null===r||void 0===r?void 0:r.gain){case 1:return(0,i.jsxs)(j,{className:"increase",children:[(0,i.jsx)(p,{value:null===r||void 0===r?void 0:r.lastPrice,displayType:"text",thousandSeparator:!0}),(0,i.jsx)("div",{className:"up",children:(0,i.jsx)(d(),{src:S})})]});case-1:return(0,i.jsxs)(j,{className:"decrease",children:[(0,i.jsx)(p,{value:null===r||void 0===r?void 0:r.lastPrice,displayType:"text",thousandSeparator:!0}),(0,i.jsx)("div",{className:"down",children:(0,i.jsx)(d(),{src:z})})]});default:return(0,i.jsxs)(j,{className:"fair",children:[(0,i.jsx)(p,{value:null===r||void 0===r?void 0:r.lastPrice,displayType:"text",thousandSeparator:!0}),(0,i.jsx)("div",{className:"none"})]})}}(),(0,i.jsx)(g,{className:"buy",children:null===(n=r.buyQuote)||void 0===n?void 0:n.map((function(e,n){return(0,i.jsx)("div",{className:"container "+(r.diffBuyQuote[e.price].isNewRow?"blink-green":""),children:(0,i.jsxs)(f.ZP,{placement:"rightStart",color:"invert",content:(0,i.jsx)(k,{orderBookData:r,index:n}),children:[(0,i.jsx)(p,{value:e.price,displayType:"text",thousandSeparator:!0}),(0,i.jsx)(p,{className:r.diffBuyQuote[e.price].sizeChange,value:e.size,displayType:"text",thousandSeparator:!0}),(0,i.jsx)(p,{value:e.cumulativeTotalSize,displayType:"text",thousandSeparator:!0,renderText:function(n){return(0,i.jsxs)("div",{className:"total-size-bar",children:[(0,i.jsx)("span",{className:"size",children:n}),(0,i.jsx)("div",{className:"bar",style:{width:e.cumulativeTotalInPercent}})]})}})]})},n)}))})]})};function C(){var e,n,t=(e=["\n  min-height: 100vh;\n  padding: 0 0.5rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n\n  main {\n    padding: 5rem 0;\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  footer {\n    width: 100%;\n    height: 100px;\n    border-top: 1px solid #eaeaea;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  footer img {\n    margin-left: 0.5rem;\n  }\n\n  footer a {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n"],n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}})));return C=function(){return t},t}var A=b.ZP.div(C()),_=function(){return(0,i.jsxs)(A,{children:[(0,i.jsxs)(l(),{children:[(0,i.jsx)("title",{className:"jsx-26ceb6d83164bab9",children:"Nogle"}),(0,i.jsx)("link",{rel:"icon",href:"/favicon.ico",className:"jsx-26ceb6d83164bab9"})]}),(0,i.jsxs)("main",{className:"jsx-26ceb6d83164bab9",children:[(0,i.jsx)("h1",{className:"jsx-26ceb6d83164bab9 title",children:"BTC/USD Perpetual"}),(0,i.jsx)(B,{})]}),(0,i.jsx)("footer",{className:"jsx-26ceb6d83164bab9",children:(0,i.jsx)("a",{href:"https://github.com/D50000",target:"_blank",rel:"noopener noreferrer",className:"jsx-26ceb6d83164bab9",children:"Powered by D5000"})}),(0,i.jsx)(a(),{id:"26ceb6d83164bab9",children:'html,body{padding:0;margin:0;font-family:"BTSE","monospace","Helvetica Neue","Helvetica","Arial","PingFang TC","PingFang SC","Microsoft JhengHei","Microsoft YaHei","sans-serif"}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}'})]})}}},function(e){e.O(0,[774,326,888,179],(function(){return n=8312,e(e.s=n);var n}));var n=e.O();_N_E=n}]);
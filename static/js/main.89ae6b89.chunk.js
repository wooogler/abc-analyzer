(this["webpackJsonpabc-analyzer"]=this["webpackJsonpabc-analyzer"]||[]).push([[0],{207:function(e,a){},209:function(e,a){},247:function(e,a){},287:function(e,a,t){},307:function(e,a,t){},308:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),c=t(39),u=t.n(c),r=t(19),i=t(95),s=t(119),o=t(114),d=t.n(o),b=t(161),v=t.n(b),m=t(115),O=t.n(m),f=t(62),y=t(162),j=t(96),p=t(45),g=t.n(p),h=t(163);function k(e){var a={};for(var t in e)if(e.hasOwnProperty(t))if("object"==typeof e[t]&&null!==e[t]){var n=k(e[t]);for(var l in n)n.hasOwnProperty(l)&&(a[t+"_"+l]=n[l])}else a[t]=String(e[t]);return a}var x=function(e){return e.map((function(e,a){var t,n=e[0],l=e[1],c=e[5],u=null===(t=e[8])||void 0===t?void 0:t.replaceAll('""','"').replaceAll(': ", ',': "", ');try{return Object(j.a)({timestamp:c,_id:n,datumType:l},k(JSON.parse(u)))}catch(r){return{timestamp:c,_id:n,datumType:l}}}))};var N=function(e){var a=Object(n.useState)([]),t=Object(r.a)(a,2),l=t[0],c=t[1],u=Object(n.useMemo)((function(){return l.reduce((function(e,a){var t=Object.keys(a);return g.a.union(e,t)}),[])}),[l]);return Object(n.useEffect)((function(){function a(){return(a=Object(y.a)(O.a.mark((function a(){return O.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:Object(h.a)("".concat("https://wooogler.github.io/abc-analyzer","/logs/").concat(e),{worker:!0,complete:function(e){var a=["timestamp","datumType","type","name","packageName","currentKey","timeTaken","isPosted","messageBox","presentation","_id"],t=e.data,n=x(t).map((function(e){return g.a.pick(e,a)})),l=a.reduce((function(e,a){return Object(j.a)(Object(j.a)({},e),{},Object(f.a)({},a,""))}),{}),u=n.map((function(e){return Object.assign({},l,e)}));c(u)},download:!0});case 1:case"end":return a.stop()}}),a)})))).apply(this,arguments)}!function(){a.apply(this,arguments)}()}),[e]),{logData:l,logColumns:u}},S=t(99),T=t(310),w=t(314),E=t(52),C=t(311),I=t(6),P=["APP_USAGE_EVENT","KEY_LOG","NOTIFICATION","MESSAGE","CALL_LOG","MEDIA"],A=[{title:"APP_USAGE_EVENT",key:"APP_USAGE_EVENT",selectable:!1,children:[{title:"name",key:"app-name"},{title:"packageName",key:"app-packageName"},{title:"type",key:"app-type"}]},{title:"KEY_LOG",key:"KEY_LOG",selectable:!1,children:[{title:"name",key:"key-name"},{title:"packageName",key:"key-packageName"},{title:"currentKey",key:"key-currentKey"},{title:"timeTaken",key:"key-timeTaken"}]},{title:"NOTIFICATION",key:"NOTIFICATION",selectable:!1,children:[{title:"name",key:"noti-name"},{title:"packageName",key:"noti-packageName"},{title:"isPosted",key:"noti-isPosted"}]},{title:"MESSAGE",key:"MESSAGE",selectable:!1,children:[{title:"messageBox",key:"msg-messageBox"}]},{title:"CALL_LOG",key:"CALL_LOG",selectable:!1,children:[{title:"type",key:"call-type"},{title:"presentation",key:"call-presentation"}]},{title:"MEDIA",key:"MEDIA",selectable:!1}];var _=function(e){var a=e.originalLogColumns,t=e.setShowColumnIndex,l=e.setShowRowIndex,c=e.setCol,u=e.setDatumTypes,r=e.logData,i=Object(n.useCallback)((function(e,n){var c=[].concat(Object(E.a)(e),Object(E.a)(n.halfCheckedKeys)),i=["timestamp","_id","datumType"].concat(Object(E.a)(g.a.uniq(c.filter((function(e){return e.includes("-")})).map((function(e){return e.split("-")[1]})))));l(r.map((function(e){return c.includes(e.datumType)}))),t(a.map((function(e){return i.includes(e)}))),u(c.filter((function(e){return P.includes(e)})))}),[r,a,u,t,l]),s=Object(n.useCallback)((function(e){0===e.length?c(""):c(e[0].split("-")[1])}),[c]);return Object(I.jsx)("div",{className:"h-52 overflow-auto",children:Object(I.jsx)(C.a,{checkable:!0,treeData:A,onCheck:i,onSelect:s,defaultCheckedKeys:P})})},L=t(185),D=(t(287),g.a.range(1,7).reduce((function(e,a){return[].concat(Object(E.a)(e),Object(E.a)(function(e){return[[{value:"Session ".concat(e),className:"font-bold text-red-500"},{value:null,readOnly:!0},{value:null,readOnly:!0},{value:null,readOnly:!0}],[{value:"Trial ".concat(e,"-1"),className:"bg-gray-100 text-black",readOnly:!0},{value:"DatumType",className:"bg-gray-100 text-black",readOnly:!0},{value:"Event",className:"bg-gray-100 text-black",readOnly:!0},{value:"timestamp",className:"bg-gray-100 text-black",readOnly:!0}],[{value:"\uccab\ubc88\uc9f8 \uc54c\ub78c \ucc3e\uae30",readOnly:!0},{value:"NOTIFICATION",readOnly:!0},{value:"isPosted: True",readOnly:!0},{value:null,className:"bg-blue-100"}],[{value:"\uccab\ubc88\uc9f8 \ubb38\uc790 \uacf5\uc720",readOnly:!0},{value:"APP_USAGE_EVENT",readOnly:!0},{value:"ACTIVITY_RESUMED",readOnly:!0},{value:null,className:"bg-blue-100"}],[{value:"\ub450\ubc88\uc9f8 \uc54c\ub78c \ucc3e\uae30",readOnly:!0},{value:"NOTIFICATION",readOnly:!0},{value:"isPosted: False",readOnly:!0},{value:null,className:"bg-blue-100"}],[{value:"\ub450\ubc88\uc9f8 \ubb38\uc790 \uacf5\uc720",readOnly:!0},{value:"APP_USAGE_EVENT",readOnly:!0},{value:"ACTIVITY_STOPPED",readOnly:!0},{value:null,className:"bg-blue-100"}],[{value:"\uc740\ud589 \uc571 \uc0ac\uc6a9 \uc2dc\uc791",readOnly:!0},{value:"APP_USAGE_EVENT",readOnly:!0},{value:"ACTIVITY_RESUMED",readOnly:!0},{value:null,className:"bg-blue-100"}],[{value:"\uc740\ud589 \uc571 \uc0ac\uc6a9 \uc885\ub8cc",readOnly:!0},{value:"APP_USAGE_EVENT",readOnly:!0},{value:"ACTIVITY_STOPPED",readOnly:!0},{value:null,className:"bg-blue-100"}],[{value:"Trial ".concat(e,"-2"),className:"bg-gray-100 text-black",readOnly:!0},{value:"# of App Transition",className:"bg-gray-100 text-black",readOnly:!0},{value:null,className:"bg-gray-100 text-black",readOnly:!0},{value:null,className:"bg-gray-100 text-black",readOnly:!0}],[{value:"\uc571 \uc804\ud658\uc218",readOnly:!0},{value:null,className:"bg-blue-100"},{value:null,readOnly:!0},{value:null,readOnly:!0}],[{value:"Trial ".concat(e,"-3"),className:"bg-gray-100 text-black",readOnly:!0},{value:"Timestamp",className:"bg-gray-100 text-black",readOnly:!0},{value:"alphabet",className:"bg-gray-100 text-black",readOnly:!0},{value:"Timetaken",className:"bg-gray-100 text-black",readOnly:!0}],[{value:"\uc624\ud0c0 \ucc3e\uae30",readOnly:!0},{value:null,className:"bg-blue-100"},{value:null,className:"bg-blue-100"},{value:null,className:"bg-blue-100"}],[{value:"\uc2dc\uac04 \uac04\uaca9",readOnly:!0},{value:null,className:"bg-blue-100"},{value:null,className:"bg-blue-100"},{value:null,className:"bg-blue-100"}],[{value:"Trial 1-4",className:"bg-gray-100 text-black",readOnly:!0},{value:"Sequence",className:"bg-gray-100 text-black",readOnly:!0},{value:"O/X Choice",className:"bg-gray-100 text-black",readOnly:!0},{value:null,className:"bg-gray-100 text-black",readOnly:!0}],[{value:"\uc0ac\uc9c4 \ucc0d\uae30",readOnly:!0},{value:"Joonyoung Park -> Youwon Shin\n -> Eunji Park",className:"whitespace-pre",readOnly:!0},{value:null,className:"bg-blue-100"},{value:null,readOnly:!0}],[{value:"\uc0ac\uc9c4 \ucc0d\uae30",readOnly:!0},{value:"Joonyoung Park -> Eunji Park\n -> Youwon Shin",className:"whitespace-pre",readOnly:!0},{value:null,className:"bg-blue-100"},{value:null,readOnly:!0}],[{value:"\uc0ac\uc9c4 \ucc0d\uae30",readOnly:!0},{value:"Eunji Park -> Joonyoung Park\n -> Youwon Shin",className:"whitespace-pre",readOnly:!0},{value:null,className:"bg-blue-100"},{value:null,readOnly:!0}],[{value:"\uc0ac\uc9c4 \ucc0d\uae30",readOnly:!0},{value:"Eunji Park -> Youwon Shin\n -> Joonyoung Park",className:"whitespace-pre",readOnly:!0},{value:null,className:"bg-blue-100"},{value:null,readOnly:!0}],[{value:"\uc0ac\uc9c4 \ucc0d\uae30",readOnly:!0},{value:"Youwon Shin -> Joonyoung Park\n -> Eunji Park",className:"whitespace-pre",readOnly:!0},{value:null,className:"bg-blue-100"},{value:null,readOnly:!0}],[{value:"\uc0ac\uc9c4 \ucc0d\uae30",readOnly:!0},{value:"Youwon Shin -> Eunji Park\n -> Joonyoung Park",className:"whitespace-pre",readOnly:!0},{value:null,className:"bg-blue-100"},{value:null,readOnly:!0}],[{value:"\uc0ac\uc9c4 \uc0ad\uc81c",readOnly:!0},{value:"Eunji Park",readOnly:!0},{value:null,className:"bg-blue-100"},{value:null,readOnly:!0}],[{value:"\uc0ac\uc9c4 \uc0ad\uc81c",readOnly:!0},{value:"Youwon Shin",readOnly:!0},{value:null,className:"bg-blue-100"},{value:null,readOnly:!0}],[{value:"\uc0ac\uc9c4 \uc0ad\uc81c",readOnly:!0},{value:"Joonyoung Park",readOnly:!0},{value:null,className:"bg-blue-100"},{value:null,readOnly:!0}]]}(a)))}),[]));var G,B,R,M=function(e){e.datumType,e.timestamp;var a=Object(n.useState)(D),t=Object(r.a)(a,2),l=t[0];return t[1],Object(I.jsx)(I.Fragment,{children:Object(I.jsx)("div",{className:"h-60 overflow-auto",children:Object(I.jsx)(L.a,{data:l,hideRowIndicators:!0,hideColumnIndicators:!0})})})};d.a.extend(v.a);var Y=S.a.div(G||(G=Object(i.a)(["\n  width: 100%;\n  height: 70%;\n  margin: 1rem;\n\n  .cell {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n"]))),F=S.a.div(B||(B=Object(i.a)(["\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  border-right: 1px solid rgba(0, 0, 0, 0.06);\n  padding-left: 0.25rem;\n  line-height: 30px;\n  ","\n  ","\n"])),(function(e){return e.passed&&"\n    background-color: #bdbdbd;\n  "}),(function(e){return e.selected&&"\n    background-color: #000000;\n    color: white;\n  "})),V=S.a.div(R||(R=Object(i.a)(["\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  border-right: 1px solid rgba(0, 0, 0, 0.06);\n  padding-left: 0.25rem;\n  background-color: #fafafa;\n  line-height: 30px;\n"]))),J=function(e){var a=e.fileName,t=e.sec,l=e.sync,c=e.start,u=(e.setSync,e.setSelectedTimestamp),i=e.selectedTimestamp,o=e.playerRef,b=e.linked,v=Object(n.useState)(""),m=Object(r.a)(v,2),O=m[0],f=m[1],y=N(a),j=y.logData,p=y.logColumns,h=Object(n.useState)(),k=Object(r.a)(h,2),x=k[0],S=k[1],E=Object(n.useState)([]),C=Object(r.a)(E,2),A=C[0],L=C[1],D=Object(n.useState)([]),G=Object(r.a)(D,2),B=G[0],R=G[1];Object(n.useEffect)((function(){var e=new Array(p.length).fill(!0);L(e),R(j.map((function(e){return P.includes(e.datumType)})))}),[j,p.length]),Object(n.useEffect)((function(){var e=p.filter((function(e,a){return A[a]}));S(j.map((function(a){return g.a.pick(a,e)})).filter((function(e,a){return B[a]})).sort((function(e,a){return parseInt(e.timestamp)-parseInt(a.timestamp)})))}),[j,p,A,B]);var J=Object(n.useState)(""),U=Object(r.a)(J,2),K=U[0],z=U[1],q=Object(n.useCallback)((function(e){z(null===e||void 0===e?void 0:e._id);var a=parseInt(null===e||void 0===e?void 0:e.timestamp);u(parseInt(null===e||void 0===e?void 0:e.timestamp)),f(null===e||void 0===e?void 0:e.datumType),o&&o.current.seekTo((c+a-l)/1e3,"seconds")}),[o,u,c,l]),H=Object(n.useState)(""),W=Object(r.a)(H,2),X=W[0],Q=W[1],Z=Object(n.useState)(P),$=Object(r.a)(Z,2),ee=$[0],ae=$[1],te=Object(n.useState)([]),ne=Object(r.a)(te,2),le=ne[0],ce=ne[1];Object(n.useEffect)((function(){var e,a,t=j.filter((function(e){return ee.includes(e.datumType)})),n=p.map((function(e){return{col:e,count:Object.entries(g.a.countBy(null===t||void 0===t?void 0:t.map((function(a){return a[e]}))))}})),l=null===(e=p.map((function(e){return{col:e,count:Object.entries(g.a.countBy(null===x||void 0===x?void 0:x.map((function(a){return a[e]}))))}})).find((function(e){return e.col===X})))||void 0===e?void 0:e.count,c=null===(a=n.find((function(e){return e.col===X})))||void 0===a?void 0:a.count;ce(null===c||void 0===c?void 0:c.map((function(e){if(null===l||void 0===l?void 0:l.map((function(e){return e[0]})).includes(e[0])){var a=l.find((function(a){return a[0]===e[0]}));if(void 0===a)throw new Error("no lookup");var t=a[1];return t===e[1]?{value:e[0],count:t,checked:!0,total:e[1]}:{value:e[0],count:t,checked:!1,total:e[1]}}return{value:e[0],count:0,checked:!1,total:e[1]}})))}),[X,ee,j,x,p]);var ue=function(e){var a=e.columnIndex,n=e.key,u=e.rowIndex,r=e.style;if(x){var i=p.filter((function(e,a){return A[a]}))[a],s=x[u];if(0===u)return Object(I.jsx)(V,{style:r,className:"cell",children:0===a?"Datetime":i},n);var o=0!==a?s&&s[i]&&s[i].toString():s&&d()(parseInt(s[i])).format("MM/DD hh:mm:ss.SSS");return Object(I.jsx)(F,{style:r,className:"cell",passed:!!b&&t+l-c>=parseInt(null===s||void 0===s?void 0:s.timestamp),selected:(null===s||void 0===s?void 0:s._id)===K,onClick:function(){return q(s)},children:o},n)}},re=Object(n.useState)(0),ie=Object(r.a)(re,2),se=ie[0],oe=ie[1];Object(n.useEffect)((function(){console.log(se)}),[se]),Object(n.useEffect)((function(){var e=x?x.findIndex((function(e){return t+l-c<=parseInt(null===e||void 0===e?void 0:e.timestamp)})):0,a=null===x||void 0===x?void 0:x.find((function(e){return t+l-c<=parseInt(null===e||void 0===e?void 0:e.timestamp)}));oe(e),a&&a._id&&z(a._id)}),[x,o,t,c,l]);var de=Object(n.useCallback)((function(e,a){R(a?function(a){return a.map((function(a,t){return!0===a&&ee.includes(j[t].datumType)?j[t][X]!==e:a}))}:function(a){return a.map((function(a,t){return!1===a&&ee.includes(j[t].datumType)?j[t][X]===e:a}))})}),[X,ee,j]),be=Object(n.useCallback)((function(e){!e.target.checked||e.target.indeterminate?R((function(e){return e.map((function(){return!1}))})):R((function(e){return e.map((function(e,a){return!!ee.includes(j[a].datumType)||e}))}))}),[ee,j]),ve=Object(n.useState)([]),me=Object(r.a)(ve,2),Oe=me[0],fe=me[1];Object(n.useEffect)((function(){fe(le)}),[le,p]);var ye=Object(n.useCallback)((function(e){fe(null===le||void 0===le?void 0:le.filter((function(a){return a.value.toLowerCase().includes(e.target.value.toLowerCase())})))}),[le]),je=Object(n.useCallback)((function(e){var a,t=p.map((function(e,a){return{name:e,index:a}})).filter((function(e){return A[e.index]}));return null===t||void 0===t||null===(a=t.find((function(a){return a.name===e})))||void 0===a?void 0:a.index}),[p,A]),pe=Object(n.useCallback)((function(e){var a=e.index;return 0===a||a===je("datumType")?150:a===je("type")?250:a===je("name")?100:a===je("packageName")?300:a===je("_id")?0:70}),[je]);return Object(I.jsxs)("div",{className:"w-full h-screen",children:[Object(I.jsx)(Y,{children:Object(I.jsx)(s.a,{children:function(e){var a=e.height,t=e.width;return Object(I.jsx)(s.b,{height:a,rowHeight:30,width:t,fixedColumnCount:1,fixedRowCount:1,cellRenderer:ue,styleTopLeftGrid:{borderRight:"1px solid rgba(0, 0, 0, 0.5)"},styleBottomLeftGrid:{borderRight:"1px solid rgba(0, 0, 0, 0.5)"},rowCount:B.filter(Boolean).length,columnCount:A.filter(Boolean).length,columnWidth:pe,scrollToRow:se,scrollToAlignment:"center"})}})}),Object(I.jsxs)("div",{className:"flex",children:[Object(I.jsxs)("div",{className:"flex flex-col ml-4",children:[Object(I.jsx)("div",{className:"text-lg font-bold",children:"Show Columns"}),Object(I.jsx)(_,{originalLogColumns:p,setShowColumnIndex:L,setCol:Q,logData:j,setDatumTypes:ae,setShowRowIndex:R})]}),(""!==X||0===(null===Oe||void 0===Oe?void 0:Oe.length))&&Object(I.jsxs)("div",{className:"flex flex-col ml-4",children:[Object(I.jsxs)("div",{className:"text-lg font-bold",children:["Column Filter - ",X]}),Object(I.jsx)(T.a,{size:"small",onChange:ye}),Object(I.jsx)("div",{className:"p-1",children:Object(I.jsx)(w.a,{checked:null===le||void 0===le?void 0:le.map((function(e){return e.checked})).every((function(e){return!0===e})),indeterminate:!(null===le||void 0===le?void 0:le.map((function(e){return e.checked})).every((function(e){return!0===e})))&&(null===le||void 0===le?void 0:le.map((function(e){return e.checked})).some((function(e){return!0===e}))),onChange:be,children:"Select All"})}),Object(I.jsx)("div",{className:"h-40 overflow-auto",children:null===Oe||void 0===Oe?void 0:Oe.sort((function(e,a){return a.total-e.total})).map((function(e,a){return Object(I.jsx)("div",{className:"p-1",children:Object(I.jsxs)(w.a,{checked:e.checked,indeterminate:0!==e.count&&!e.checked,onClick:function(){return de(e.value,e.checked)},children:[e.value," (",e.count,"/",e.total,")"]})},a)}))})]}),Object(I.jsx)("div",{className:"ml-auto",children:Object(I.jsx)(M,{timestamp:i.toString(),datumType:O})})]})]})},U=(t(288),t(184)),K=t.n(U);var z=function(e){var a=e.url,t=e.setSec,n=e.setPlayedSec,l=e.playerRef;return Object(I.jsx)("div",{className:"flex flex-col h-full w-full pl-4 pt-2 pb-14 justify-center items-center",children:Object(I.jsx)(K.a,{url:a,controls:!0,width:"100%",height:"100%",onProgress:function(e){t(Math.floor(1e3*e.playedSeconds)),n(Math.floor(1e3*e.playedSeconds))},progressInterval:10,ref:l})})},q=t(315),H=t(313);var W=function(){var e=Object(n.useState)(!0),a=Object(r.a)(e,2),t=a[0],l=a[1],c=Object(n.useState)(""),u=Object(r.a)(c,2),i=u[0],s=u[1],o=Object(n.useState)(1629722777027),d=Object(r.a)(o,2),b=d[0],v=d[1],m=Object(n.useState)(0),O=Object(r.a)(m,2),f=O[0],y=O[1],j=Object(n.useState)(29257),p=Object(r.a)(j,2),g=p[0],h=p[1],k=Object(n.useState)(0),x=Object(r.a)(k,2),N=x[0],S=x[1],T=Object(n.useState)(0),w=Object(r.a)(T,2),E=w[0],C=w[1],P=Object(n.useRef)(),A=Object(n.useCallback)((function(e){s(e.target.value),t&&("7"===e.target.value?(h(29257),v(1629722777027)):"8"===e.target.value?(h(27275),v(1629723368224)):"9"===e.target.value?(h(28561),v(1629724008156)):"10"===e.target.value?(h(28977),v(1629729295883)):"11"===e.target.value?(h(26999),v(1629729867290)):"12"===e.target.value&&(h(37468),v(1629730415581)))}),[t]);return Object(I.jsxs)("div",{className:"flex h-screen overflow-hidden",children:[Object(I.jsx)("div",{className:"w-3/4 h-screen",children:Object(I.jsx)(J,{fileName:"raw.csv",sec:t?f:0,sync:b,setSelectedTimestamp:C,playerRef:t&&P,setSync:v,selectedTimestamp:E,start:g,linked:t})}),Object(I.jsxs)("div",{className:"flex flex-col w-1/4 h-screen items-center",children:[Object(I.jsxs)("div",{className:"flex justify-center h-8 items-center pt-2",children:[Object(I.jsx)("div",{className:"mr-2",children:"Link:"}),Object(I.jsx)(q.a,{checked:t,onChange:function(e){return l(e)}}),Object(I.jsx)("div",{className:"mx-2"}),Object(I.jsxs)(H.a.Group,{defaultValue:"7",size:"small",buttonStyle:"solid",onChange:A,value:i,children:[Object(I.jsx)(H.a.Button,{value:"7",children:"7"}),Object(I.jsx)(H.a.Button,{value:"8",children:"8"}),Object(I.jsx)(H.a.Button,{value:"9",children:"9"}),Object(I.jsx)(H.a.Button,{value:"10",children:"10"}),Object(I.jsx)(H.a.Button,{value:"11",children:"11"}),Object(I.jsx)(H.a.Button,{value:"12",children:"12"})]})]}),Object(I.jsx)(z,{url:"".concat("","videos/").concat(i,".webm"),setSec:y,setSync:v,setStart:h,setPlayedSec:S,selectedTimestamp:E,playerRef:P,playedSec:N})]})]})},X=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,316)).then((function(a){var t=a.getCLS,n=a.getFID,l=a.getFCP,c=a.getLCP,u=a.getTTFB;t(e),n(e),l(e),c(e),u(e)}))};t(307);u.a.render(Object(I.jsx)(l.a.StrictMode,{children:Object(I.jsx)(W,{})}),document.getElementById("root")),X()}},[[308,1,2]]]);
//# sourceMappingURL=main.89ae6b89.chunk.js.map
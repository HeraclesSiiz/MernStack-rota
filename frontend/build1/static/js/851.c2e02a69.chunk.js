(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[851],{9851:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return k}});var r=n(7762),a=n(2982),o=n(1413),i=n(5671),s=n(3144),u=n(7326),l=n(136),c=n(3668),d=n(2791),f=n(4569),m=n.n(f),p=n(8970),h=n(6367),v=n(3513),y=n(8687),g=n(337),_=n(8339),b=n.n(_),w=n(6355),C=n(7392),N=n(5828),x=n.n(N),j=(n(2831),n(8492)),A=n.n(j),E=n(184),Z=function(t){(0,l.Z)(n,t);var e=(0,c.Z)(n);function n(t){var r;(0,i.Z)(this,n),(r=e.call(this,t)).viewPerPatient=function(t){r.setState((0,o.Z)((0,o.Z)({},r.state),{},{perPatient:!r.state.perPatient}))},r.save=function(){var t=r.props.basic,e=r.state,n=e.isEditable,i=e.selPatient,s=e.selYear,l=(e.perPatient,e.selPatientValue,e.selMonth),c=e.assigns;if(n){(0,u.Z)(r);r.setState((0,o.Z)((0,o.Z)({},r.state),{},{isEditable:!1}));var d=r.props.basic.requestblocks;if(console.log(d),0!==d.length)return x().clear(),void setTimeout((function(){return x().warning("This item cannot be requested! Please wait until approver approve the transfer request.")}),300);m().post("rota/assign",{patient_id:i,year:s,month:l,assignData:c}).then((function(t){"error"==t.data.state&&(x().clear(),setTimeout((function(){return x().info("roaster edit request error!")}),3e3))})).catch((function(t){}))}else{var f=[],p=[],h=[],v=s+"-"+l,y=new Date(s,l,0).getDate();if(0!==i){for(var g=0;g<y;g++)p[g+1]=0;t.nurses.map((function(t,e){t.rota.map((function(e,n){if(e.patient_id==i&&e.date.includes(v)){var r=1*e.date.slice(8);p[r]++,f.push({date:e.date,day:r,nurse_name:t.name,nurse_short_id:t._id.slice(20),nurse_id:t._id,designation:0==t.level?"Registered":"Assistant",duty_start:e.duty_start,duty_end:e.duty_end,hour:e.hour})}}))}));for(var _=0;_<y;_++)0==p[1*(_+1)]&&(p[1*(_+1)]=1,h.date=v+"-"+(_<9?0+String(_+1):_+1),h.day=1*(_+1),h.nurse_name="NA",h.nurse_short_id="NA",h.nurse_id="NA",h.designation="NA",h.duty_start="NA",h.duty_end="NA",h.hour="NA",f=[].concat((0,a.Z)(f),[(0,o.Z)({},h)]));f.sort((function(t,e){return t.date>e.date?1:e.date>t.date?-1:t.duty_start>e.duty_start?1:e.duty_start>t.duty_start?-1:0}));var b=0;for(var w in p)for(var C=1;C<=p[w];C++)f[b].rotation=C,b++;r.setState((0,o.Z)((0,o.Z)({},r.state),{},{isEditable:!0,assigns:(0,a.Z)(f),assignPerDay:[].concat(p)}))}}},r.multiAssign=function(t,e){var n=r.state,i=n.selYear,s=n.selMonth,u=n.assigns,l=n.assignPerDay,c=e.day,d=i+"-"+s,f={};f.date=d+"-"+(c<9?0+String(c):c),f.day=c,f.rotation=l[c]+1,f.nurse_name="NA",f.nurse_name="NA",f.nurse_short_id="NA",f.nurse_id="NA",f.designation="NA",f.duty_start="NA",f.duty_end="NA",f.hour="NA";var m=0;l[c]++;for(var p=1;p<1*c+1;p++)m+=l[p];u.splice(m-1,0,f),r.setState((0,o.Z)((0,o.Z)({},r.state),{},{assigns:(0,a.Z)(u),assignPerDay:(0,a.Z)(l)}))},r.multiRemove=function(t,e){for(var n=r.state,i=n.assigns,s=n.assignPerDay,u=e.day,l=0,c=1;c<u;c++)l+=s[c];if(1==s[u])i[l].nurse_name="NA",i[l].nurse_short_id="NA",i[l].nurse_id="NA",i[l].designation="NA",i[l].duty_start="NA",i[l].duty_end="NA",i[l].hour="NA",r.setState((0,o.Z)((0,o.Z)({},r.state),{},{assigns:(0,a.Z)(i)}));else{for(var d=0;d<s[u];d++)d==e.rotation-1?i.splice(l+d,1):d>=e.rotation&&i[l+d-1].rotation--;s[u]--,r.setState((0,o.Z)((0,o.Z)({},r.state),{},{assigns:(0,a.Z)(i),assignPerDay:(0,a.Z)(s)}))}},r.onChangePatient=function(t){r.setState((0,o.Z)((0,o.Z)({},r.state),{},{selPatient:0,selPatientValue:t.target.value}))},r.onSelectPatient=function(t,e){r.setState((0,o.Z)((0,o.Z)({},r.state),{},{selPatient:e.key,selPatientValue:t}))},r.onChangeYear=function(t){r.setState((0,o.Z)((0,o.Z)({},r.state),{},{selYear:t.target.value,isEditable:!1}))},r.onChangeMonth=function(t){r.setState((0,o.Z)((0,o.Z)({},r.state),{},{selMonth:t.target.value,isEditable:!1}))},r.onChangeMultiDay=function(t){r.setState((0,o.Z)((0,o.Z)({},r.state),{},{selMultiDay:t.target.value}))},r.onChangeNurse=function(t,e){var n=r.props.basic,i=r.state.assigns;i.map((function(r,a){r.day==e.day&&r.rotation==e.rotation&&n.nurses.map((function(e,n){e._id==t.target.value&&(i[a].nurse_name=e.name,i[a].nurse_id=e._id,i[a].nurse_short_id=e._id.slice(20),i[a].designation=0==e.level?"Registered":"Assistant")}))})),r.setState((0,o.Z)((0,o.Z)({},r.state),{},{assigns:(0,a.Z)(i)}))},r.onChangeDutyStart=function(t,e){var n,i,s,l=r.props.basic,c=r.state,d=c.assigns,f=c.selPatient,m=(0,u.Z)(r),p=parseInt(t/3600)>9?parseInt(t/3600):"0"+parseInt(t/3600),h=t%3600==0?"00":"30",v=p+":"+h;p>=12?(n="23:30",i=23-p):(n=p+12+":"+h,i=12);var y=!1,_=d.length,b=!1;new Promise((function(t){d.map((function(n,r){n.rotation!==e.rotation&&n.date==e.date&&n.duty_start<v&&n.duty_end>v&&(b=!0,x().info("Already Assign Hour in rotation"+n.rotation+"!")),r==_-1&&0==b&&t()}))})).then((function(){return new Promise((function(t){l.nurses.map((function(n){n._id==e.nurse_id&&(0==(s=n.rota.length)&&t(),n.rota.map((function(n,r){n.date==e.date&&n.duty_start<v&&n.duty_end>v&&(y=!0,l.patients.map((function(e){n.patient_id!=f&&n.patient_id==e._id&&(0,g._1)({title:"Duplicate Time",message:"Nurse is allocated for "+n.duty_start+" to "+n.duty_end+" to "+e.name+". You want to overwrite?",buttons:[{label:"Yes",onClick:function(){t()}},{label:"No",onClick:function(){}}]})}))),r==s-1&&0==y&&t()})))}))})).then((function(){d.map((function(t,r){t.day==e.day&&t.rotation==e.rotation&&l.nurses.map((function(t){t._id==e.nurse_id&&(d[r].duty_start=v,d[r].duty_end=n,d[r].hour=i)}))})),m.setState((0,o.Z)((0,o.Z)({},m.state),{},{assigns:(0,a.Z)(d)}))}))}))},r.onChangeDutyEnd=function(t,e){var n,i=r.props.basic,s=r.state,l=s.assigns,c=s.selPatient,d=(0,u.Z)(r),f=(parseInt(t/3600)>9?parseInt(t/3600):"0"+parseInt(t/3600))+":"+(t%3600==0?"00":"30"),m=!1,p=l.length,h=!1;new Promise((function(t){l.map((function(n,r){n.rotation!==e.rotation&&n.date==e.date&&"NA"!=n.duty_start&&"NA"!=n.duty_end&&n.duty_start<f&&n.duty_end>e.duty_start&&(h=!0,x().info("Already Assign Hour in rotation"+n.rotation+"!")),r==p-1&&0==h&&t()}))})).then((function(){return new Promise((function(t){i.nurses.map((function(r){r._id==e.nurse_id&&(0==(n=r.rota.length)&&t(),r.rota.map((function(r,a){r.date==e.date&&r.duty_end>e.duty_start&&r.duty_start<f&&i.patients.map((function(e){r.patient_id!=c&&r.patient_id==e._id&&(m=!0,(0,g._1)({title:"Duplicate Time",message:"Nurse is allocated for "+r.duty_start+" to "+r.duty_end+" to "+e.name+". You want to overwrite?",buttons:[{label:"Yes",onClick:function(){t()}},{label:"No",onClick:function(){}}]}))})),a==n-1&&0==m&&t()})))}))})).then((function(){l.map((function(t,n){t.day==e.day&&t.rotation==e.rotation&&i.nurses.map((function(t){t._id==e.nurse_id&&(l[n].duty_end=f,"NA"!=l[n].duty_end&&(l[n].hour=Math.abs(l[n].duty_end.split(":")[0]-l[n].duty_start.split(":")[0])))}))})),d.setState((0,o.Z)((0,o.Z)({},d.state),{},{assigns:(0,a.Z)(l)}))}))}))};var s=(new Date).getMonth()-1?(new Date).getMonth()+1:"0"+((new Date).getMonth()+1);return r.state={isEditable:!1,selPatient:0,selPatientValue:"",perPatient:!1,selYear:(new Date).getFullYear(),selMonth:s,assigns:[],assignPerDay:[]},r}return(0,s.Z)(n,[{key:"componentDidMount",value:function(){}},{key:"getTotals",value:function(t,e){var n=0;return t.forEach((function(t){n+=t[e]?t[e]:0})),n}},{key:"swap",value:function(t){var e=[];for(var n in t)e[t[n]]=n;return e}},{key:"render",value:function(){var t,e=this,n=this.props.basic,i=this.props.basic.user,s=this.state,u=s.selPatient,l=s.selPatientValue,c=s.selYear,d=s.selMonth,f=(s.perPatient,s.isEditable),m=s.assigns,y=s.assignPerDay,g=[],_=[],C=[],N=[],x=c+"-"+d,j=new Date(c,d,0).getDate(),Z=n.monthNames,k=(this.swap(Z),Object.keys(Z)),P=Object.values(Z),O=k.map((function(t,e){return(0,E.jsx)("option",{value:P[e],children:t},e)})),D=0,I=n.holidays,S=[];I.map((function(t){t.slice(0,2)==d&&S.push(c+"-"+t)}));for(var M=[],T=new Date(c+"-"+d+"-01").getDay(),R=T=0==T?1:7-T+1;R<j;R+=7){var Y=R>9?R:"0"+R;M.push(x+"-"+Y)}if(f)g=[{name:"Date",center:!0,wrap:!0,selector:function(t){return t.date}},{name:"Emp ID",center:!0,wrap:!0,with:"80px",selector:function(t){return t.nurse_short_id}},{name:"Emp Name",center:!0,wrap:!0,width:"200px",cell:function(o){return(0,E.jsxs)(p.Z.Select,{"aria-label":"patient select",value:o._nurse_id,onChange:function(t){return e.onChangeNurse(t,o)},children:[(0,E.jsx)("option",{value:"0",children:"Select Nurse"}),n.nurses.map((function(e,i){var s,l=e.leave?e.leave:[],f=[],p=(0,r.Z)(l);try{for(p.s();!(s=p.n()).done;)for(var h=s.value,v=new Date(h.from),y=new Date(h.to),g=v;g<=y;){var _=g.getFullYear(),b=g.getDate()>9?g.getDate():"0"+g.getDate();_==c&&g.getMonth()+1==parseInt(d)&&f.push(x+"-"+b),g.setDate(g.getDate()+1)}}catch(C){p.e(C)}finally{p.f()}var w=[].concat(f,S,M);return w=(0,a.Z)(new Set(w)),t=8*(j-w.length),n.nurses.map((function(n,r){n._id==e._id&&n.rota.map((function(e){e.date.includes(x)&&e.patient_id!=u&&(t-=e.hour)}))})),m.map((function(n){n.nurse_id==e._id&&"NA"!=n.hour&&(t-=n.hour)})),(0,E.jsxs)("option",{value:e._id,className:"assign",selected:e._id==o.nurse_id?"selected":"",children:[e.name,"("+t+")"]},i)}))]})}},{name:"Designation",center:!0,wrap:!0,width:"100px",selector:function(t){return t.designation}},{name:"Duty Start",center:!0,wrap:!0,width:"140px",cell:function(t){return(0,E.jsx)(b(),{step:30,value:"NA"==t.duty_start?"12:00":t.duty_start,disabled:"NA"==t.nurse_id?"disabled":"",onChange:function(n){return e.onChangeDutyStart(n,t)}})}},{name:"Duty End",center:!0,wrap:!0,width:"140px",selector:function(t){return(0,E.jsx)(b(),{start:"NA"==t.duty_start?"00:00":t.duty_start,step:30,value:"NA"==t.duty_end?"12:00":t.duty_end,disabled:"NA"==t.duty_start?"disabled":"",onChange:function(n){return e.onChangeDutyEnd(n,t)}})}},{name:"Hour",center:!0,wrap:!0,width:"80px",selector:function(t){return t.hour}},{name:"Action",center:!0,wrap:!0,width:"120px",selector:function(t){return 1==t.rotation?[(0,E.jsxs)(h.Ff,{children:[(0,E.jsx)(h.$v,{outline:!0,floating:!0,color:"success",size:"sm",onClick:function(n){return e.multiAssign(n,t)},children:(0,E.jsx)(w.wEH,{})}),(0,E.jsx)(h.$v,{outline:!0,floating:!0,color:"success",size:"sm",onClick:function(n){return e.multiRemove(n,t)},children:(0,E.jsx)(w.iFH,{})})]},t.leave_id)]:(0,E.jsx)(h.$v,{outline:!0,floating:!0,color:"success",size:"sm",onClick:function(n){return e.multiRemove(n,t)},children:(0,E.jsx)(w.iFH,{})})}}],_=m,C=y;else if(g=[{name:"Date",center:!0,wrap:!0,selector:function(t){return t.date}},{name:"Emp ID",center:!0,wrap:!0,with:"80px",selector:function(t){return t.nurse_short_id}},{name:"Emp Name",center:!0,wrap:!0,selector:function(t){return t.nurse_name}},{name:"Designation",center:!0,wrap:!0,selector:function(t){return t.designation}},{name:"Duty Start",center:!0,wrap:!0,selector:function(t){return t.duty_start}},{name:"Duty End",center:!0,wrap:!0,selector:function(t){return t.duty_end}},{name:"Hour",center:!0,wrap:!0,selector:function(t){return t.hour}}],0!=u){for(var H=0;H<j;H++)C[H+1]=0;n.nurses.map((function(t,e){t.rota.map((function(e,n){if(e.patient_id==u&&e.date.includes(x)){D+=e.hour;var r=1*e.date.slice(8);C[r]++,_.push({date:e.date,day:r,nurse_name:t.name,nurse_short_id:t._id.slice(20),nurse_id:t._id,designation:0==t.level?"Registered":"Assistant",duty_start:e.duty_start,duty_end:e.duty_end,hour:e.hour})}}))}));for(var F=0;F<j;F++)0==C[1*(F+1)]&&(C[1*(F+1)]=1,N.date=x+"-"+(F<9?0+String(F+1):F+1),N.day=1*(F+1),N.nurse_name="NA",N.nurse_short_id="NA",N.nurse_id="NA",N.designation="NA",N.duty_start="NA",N.duty_end="NA",N.hour="NA",_=[].concat((0,a.Z)(_),[(0,o.Z)({},N)]));_.sort((function(t,e){return t.date>e.date?1:e.date>t.date?-1:t.duty_start>e.duty_start?1:e.duty_start>t.duty_start?-1:0}));var U=0;for(var $ in C)for(var V=1;V<=C[$];V++)_[U].rotation=V,U++}var B=[],K=[];n.patients.map((function(t){B[t._id]=t.name,t.name.includes(l)&&K.push({label:t.name,key:t._id})}));var L={date:"Total",hour:D};for(var q in Z)L[q]=this.getTotals(_,q);L.total=this.getTotals(_,"total"),_.push(L);return(0,E.jsxs)(h.L5,{children:[(0,E.jsx)("div",{className:"pt-5 text-center text-dark",children:(0,E.jsx)("h1",{className:"mt-3",children:"DUTY ROASTER"})}),(0,E.jsx)(h.uZ,{className:" align-items-center justify-content-center",children:(0,E.jsx)(h.TK,{md:"4",className:"pt-4"})}),(0,E.jsxs)(h.uZ,{className:" align-items-center justify-content-center",children:[(0,E.jsx)(h.TK,{className:"autocomplete col-md-3 ncard",children:(0,E.jsx)(A(),{getItemValue:function(t){return t.label},items:K,inputProps:{placeholder:"Select Patients"},renderItem:function(t,e){return(0,E.jsx)("div",{style:{background:e?"#2E86C1":"white",color:e?"white":"black",borderRadius:"1px",backgroundColor:"white",fontSize:"15px",fontFamily:"Arial"},children:t.label})},value:l,onChange:function(t){return e.onChangePatient(t)},onSelect:function(t,n){return e.onSelectPatient(t,n)}})}),(0,E.jsx)(h.TK,{md:"2",children:(0,E.jsx)(p.Z.Group,{children:(0,E.jsx)(p.Z.Control,{type:"number",value:c,placeholder:"Year",min:2022,max:(new Date).getFullYear(),onChange:function(t){return e.onChangeYear(t)}})})}),(0,E.jsx)(h.TK,{md:"2",children:(0,E.jsx)(p.Z.Select,{"aria-label":"select",value:d,onChange:function(t){return e.onChangeMonth(t)},children:O})}),i.hasOwnProperty("role")&&1!==i.role&&(0,E.jsx)(h.TK,{md:"2",children:(0,E.jsx)(h.$v,{outline:!0,rounded:!0,color:"success",type:"button",onClick:function(){return e.save()},children:f?"save":"edit"})})]}),(0,E.jsx)(h.uZ,{className:"p-2",children:(0,E.jsx)(v.ZP,{columns:g,data:_,fixedHeader:!0,fixedHeaderScrollHeight:"70vh",conditionalRowStyles:[{when:function(t){return 1==t.rotation},style:function(t){return{backgroundColor:t.day%2==1?"rgb(160,160,160)":"rgb(192,192,192)"}}}]})})]})}}]),n}(d.Component),k=(0,y.$j)((function(t){return{basic:t.BasicData}}),(function(t){return{getRoaster:function(e){return t((0,C.ZY)(e))}}}))(Z)},8339:function(t,e,n){t.exports=function(t){function e(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(2);e.default=r.a},function(t,e,n){"use strict";function r(){return r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},r.apply(this,arguments)}function a(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}function o(t){function e(t){var e=Object(f.timeFromInt)(t,!1);if(24===u)return e;var n=e.match(/^(\d+):/),r=parseInt(n[1],10);if(0===r)return"".concat(e.replace(/^\d+/,"12")," AM");if(r<12)return"".concat(e," AM");if(12===r)return"".concat(e," PM");var a=r<22?"0".concat(r-12):(r-12).toString();return"".concat(e.replace(/^\d+/,a)," PM")}var n=t.end,o=void 0===n?"23:59":n,i=t.format,u=void 0===i?12:i,l=t.initialValue,c=void 0===l?"00:00":l,m=t.onChange,p=void 0===m?function(){}:m,h=t.start,v=void 0===h?"00:00":h,y=t.step,g=void 0===y?30:y,_=t.value,b=void 0===_?null:_,w=a(t,["end","format","initialValue","onChange","start","step","value"]),C=function(){for(var t=[],e=Object(f.timeToInt)(o,!1),n=Object(f.timeToInt)(v,!1);n<=e;n+=60*g)t.push(n);return t}().map((function(t){return{key:t,val:e(t)}})),N=C.map((function(t){var e=t.key,n=t.val;return s.a.createElement("option",{key:e,value:e},n)})),x=b||c;try{x=Object(f.timeToInt)(x)}catch(t){x=parseInt(x,10)}return C.filter((function(t){var e=t.key;return x===e})).length||(x=Object(f.timeToInt)(v)),s.a.createElement(d.a,r({as:"select",onChange:function(t){p(parseInt(t.target.value,10))},value:x},w),N)}var i=n(3),s=n.n(i),u=n(4),l=n.n(u),c=n(5),d=n.n(c),f=n(6),m=(n.n(f),{end:l.a.string,format:l.a.number,initialValue:l.a.any,onChange:l.a.func,start:l.a.string,step:l.a.number,value:l.a.any});o.propTypes=m,e.a=o},function(t,e){t.exports=n(2791)},function(t,e){t.exports=n(2007)},function(t,e){t.exports=n(4292)},function(t,e){t.exports=n(8738)}])},337:function(t,e,n){"use strict";var r,a,o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e._1=function(t){document.body.classList.add("react-confirm-alert-body-element"),function(){if(document.getElementById("react-confirm-alert-firm-svg"))return;var t="http://www.w3.org/2000/svg",e=document.createElementNS(t,"feGaussianBlur");e.setAttribute("stdDeviation","0.3");var n=document.createElementNS(t,"filter");n.setAttribute("id","gaussian-blur"),n.appendChild(e);var r=document.createElementNS(t,"svg");r.setAttribute("id","react-confirm-alert-firm-svg"),r.setAttribute("class","react-confirm-alert-svg"),r.appendChild(n),document.body.appendChild(r)}(),function(t){var e=document.getElementById(t.targetId||v);t.targetId&&!e&&console.error("React Confirm Alert:","Can not get element id (#"+t.targetId+")");e||(document.body.children[0].classList.add("react-confirm-alert-blur"),(e=document.createElement("div")).id=v,document.body.appendChild(e)),(h=(0,c.createRoot)(e)).render(u.default.createElement(p,t))}(t)};var s=n(2791),u=d(s),l=d(n(2007)),c=n(1250);function d(t){return t&&t.__esModule?t:{default:t}}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function m(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==typeof e&&"function"!==typeof e?t:e}var p=(a=r=function(t){function e(){var t,n,r;f(this,e);for(var a=arguments.length,o=Array(a),i=0;i<a;i++)o[i]=arguments[i];return n=r=m(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(o))),r.handleClickButton=function(t){t.onClick&&t.onClick(),r.close()},r.handleClickOverlay=function(t){var e=r.props,n=e.closeOnClickOutside,a=e.onClickOutside,o=t.target===r.overlay;n&&o&&(a(),r.close()),t.stopPropagation()},r.close=function(){var t=r.props.afterClose;_(),g(r.props),y(t)},r.keyboard=function(t){var e=r.props,n=e.closeOnEscape,a=e.onKeypressEscape,o=e.onkeyPress,i=e.keyCodeForClose,s=t.keyCode,u=27===s;i.includes(s)&&r.close(),n&&u&&(a(t),r.close()),o&&o()},r.componentDidMount=function(){document.addEventListener("keydown",r.keyboard,!1)},r.componentWillUnmount=function(){document.removeEventListener("keydown",r.keyboard,!1),r.props.willUnmount()},r.renderCustomUI=function(){var t=r.props,e=t.title,n=t.message,a=t.buttons;return(0,t.customUI)({title:e,message:n,buttons:a,onClose:r.close})},m(r,n)}return function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),i(e,[{key:"render",value:function(){var t=this,e=this.props,n=e.title,r=e.message,a=e.buttons,i=e.childrenElement,s=e.customUI,l=e.overlayClassName;return u.default.createElement("div",{className:"react-confirm-alert-overlay "+l,ref:function(e){return t.overlay=e},onClick:this.handleClickOverlay},u.default.createElement("div",{className:"react-confirm-alert"},s?this.renderCustomUI():u.default.createElement("div",{className:"react-confirm-alert-body"},n&&u.default.createElement("h1",null,n),r,i(),u.default.createElement("div",{className:"react-confirm-alert-button-group"},a.map((function(e,n){return u.default.createElement("button",o({key:n,className:e.className},e,{onClick:function(n){return t.handleClickButton(e)}}),e.label)}))))))}}]),e}(s.Component),r.propTypes={title:l.default.string,message:l.default.string,buttons:l.default.array.isRequired,childrenElement:l.default.func,customUI:l.default.func,closeOnClickOutside:l.default.bool,closeOnEscape:l.default.bool,keyCodeForClose:l.default.arrayOf(l.default.number),willUnmount:l.default.func,afterClose:l.default.func,onClickOutside:l.default.func,onKeypressEscape:l.default.func,onkeyPress:l.default.func,overlayClassName:l.default.string},r.defaultProps={buttons:[{label:"Cancel",onClick:function(){return null},className:null},{label:"Confirm",onClick:function(){return null},className:null}],childrenElement:function(){return null},closeOnClickOutside:!0,closeOnEscape:!0,keyCodeForClose:[],willUnmount:function(){return null},afterClose:function(){return null},onClickOutside:function(){return null},onKeypressEscape:function(){return null}},a);var h=null,v="react-confirm-alert";function y(t){var e=document.getElementById("react-confirm-alert-firm-svg");e&&e.parentNode.removeChild(e),document.body.children[0].classList.remove("react-confirm-alert-blur"),t()}function g(t){var e=document.getElementById(t.targetId||v);e&&h.unmount(e)}function _(){document.body.classList.remove("react-confirm-alert-body-element")}},8738:function(t){t.exports=function(t){function e(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return t[r].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(1)},function(t,e){"use strict";function n(t){return"time-number"===t.message.substring(0,11)}function r(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n=t.toString(),r=e-n.length,a="";a.length<r;)a+="0";return""+a+n}function a(t,e){var n=e.validate,a=e.format,o=e.leadingZero,i=parseInt(t,10);if(n&&(i<0||i>=86400))throw new RangeError("time-number, timeFromInt(): rangeError, value supposed to be between 0 and 86399");var s=Math.floor(i/3600),u=Math.floor((i-3600*s)/60),l=i-3600*s-60*u,c=null;12!==a&&"12"!==a||(c=s<12?"AM":"PM",0===s?s=12:s>12&&(s-=12));var d=[o?r(s):s,r(u)];l&&d.push(r(l));var f=d.join(":");return c?f+" "+c:f}function o(t){return"boolean"==typeof t?{validate:t}:t}function i(t,e){for(var n=e.validate,r=t.split(":"),a=r.length;r.length<3;)r.push("0");var o=r.map((function(t){return parseInt(t,10)}));if(n){var i=o[0];if(i<0||i>23)throw new RangeError("time-number, timeToInt(): hours must be between 0 and 23, provided value: '"+t+"'");if(a>1){var s=o[1];if(s<0||s>59)throw new RangeError("time-number, timeToInt(): minutes must be between 0 and 59, provided value: '"+t+"'")}if(a>2){var u=o[2];if(u<0||u>59)throw new RangeError("time-number, timeToInt(): seconds must be between 0 and 59, provided value: '"+t+"'")}}return 3600*o[0]+60*o[1]+o[2]}function s(t){if(!t||!t.match)return t;if(!t.match(/(am|pm)$/i))return t;if(t.match(/^0+:/))throw new Error("12h format can't have 00:30 AM, it should be 12:30 AM instead");return t.match(/am$/i)?t.replace(/^(\d+)/,(function(t){return"12"===t?"0":t})).replace(/\s*am$/i,""):t.replace(/^(\d+)/,(function(t){return"12"===t?t:(parseInt(t,10)+12).toString()})).replace(/\s*pm$/i,"")}Object.defineProperty(e,"__esModule",{value:!0}),e.timeFromInt=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={validate:!0,format:24,leadingZero:!0},i=Object.assign({},r,o(e)),s=i.validate;if(!s)return a(t,i);try{if(t-parseFloat(t,10)+1>=0)return a(t,i);throw new Error}catch(e){if(n(e))throw e;throw new Error("time-number, timeFromInt(): invalud value: '"+t+"', supposed to be number")}},e.timeToInt=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={validate:!0},a=Object.assign({},r,o(e)),u=a.validate;if(!u){var l=s(t);return i(l,a)}try{var c=s(t);if(!c.match(/^\d+(:\d+(:\d+)?)?$/))throw new Error;return i(c,a)}catch(e){if(n(e))throw e;throw new Error("time-number, timeToInt(): supported formats are 'HH', 'HH:mm', 'HH:mm:ss', provided value: '"+t+"' doesn't match any of them")}}}])}}]);
//# sourceMappingURL=851.c2e02a69.chunk.js.map
(this["webpackJsonpninja-app"]=this["webpackJsonpninja-app"]||[]).push([[4],{292:function(e,a,t){e.exports={dialogs:"Dialogs_dialogs__2xRSA",dialogsItems:"Dialogs_dialogsItems__2sNe2",dialog:"Dialogs_dialog__lk_cw",messages:"Dialogs_messages__1w_Up",message:"Dialogs_message__1xIDh",active:"Dialogs_active__2sQhs"}},297:function(e,a,t){"use strict";t.r(a);var s=t(0),n=t.n(s),i=t(292),l=t.n(i),c=t(13),m=function(e){var a="/dialogs/"+e.id;return n.a.createElement("div",{className:"".concat(l.a.dialog," ").concat(l.a.active)},n.a.createElement(c.b,{to:a},e.name))},o=function(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:l.a.message},e.text))},r=t(10),d=t(126),g=t(127),u=t(84),_=t(83),E=Object(_.a)(100),b=Object(g.a)({form:"dialogAddmessageForm"})((function(e){return n.a.createElement("form",{onSubmit:e.handleSubmit},n.a.createElement("div",null,n.a.createElement(d.a,{component:u.b,validate:[_.b,E],name:"newMessageBody",placeholder:"Enter your message"})),n.a.createElement("div",null,n.a.createElement("button",null,"Add")))})),f=function(e){var a=e.messagesPage,t=a.dialogs.map((function(e){return n.a.createElement(m,{name:e.name,key:e.id,id:e.id})})),s=a.messages.map((function(e){return n.a.createElement(o,{text:e.message,key:e.id,id:e.id})}));return e.isAuth?n.a.createElement("div",{className:l.a.dialogs},n.a.createElement("div",{className:l.a.dialogsItems},t),n.a.createElement("div",{className:l.a.messages},n.a.createElement("div",null,s),n.a.createElement(b,{onSubmit:function(a){e.sendMessage(a.newMessageBody)}}))):n.a.createElement(r.a,{to:"/login"})},p=t(102),v=t(12),h=t(115),j=t(8);a.default=Object(j.d)(Object(v.b)((function(e){return{messagesPage:e.messagesPage}}),(function(e){return{sendMessage:function(a){e(Object(p.b)(a))}}})),h.a)(f)}}]);
//# sourceMappingURL=4.eeae3f10.chunk.js.map
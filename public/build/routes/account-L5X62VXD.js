import{i as s,k as n,m as u,r as c,x as a}from"/build/_shared/chunk-PORSORIO.js";import"/build/_shared/chunk-USXU6MDU.js";import{c as r}from"/build/_shared/chunk-Q3IECNXJ.js";var t=r(a(),1);function d(){return!0}function i(){let{customer:o}=c(),e=o?o.firstName?`Welcome, ${o.firstName}`:"Welcome to your account.":"Account Details";return(0,t.jsxs)("div",{className:"account",children:[(0,t.jsx)("h1",{children:e}),(0,t.jsx)("br",{}),(0,t.jsx)(m,{}),(0,t.jsx)("br",{}),(0,t.jsx)("br",{}),(0,t.jsx)(s,{context:{customer:o}})]})}function m(){function o({isActive:e,isPending:l}){return{fontWeight:e?"bold":void 0,color:l?"grey":"black"}}return(0,t.jsxs)("nav",{role:"navigation",children:[(0,t.jsx)(n,{to:"/account/orders",style:o,children:"Orders \xA0"}),"\xA0|\xA0",(0,t.jsx)(n,{to:"/account/profile",style:o,children:"\xA0 Profile \xA0"}),"\xA0|\xA0",(0,t.jsx)(n,{to:"/account/addresses",style:o,children:"\xA0 Addresses \xA0"}),"\xA0|\xA0",(0,t.jsx)(p,{})]})}function p(){return(0,t.jsxs)(u,{className:"account-logout",method:"POST",action:"/account/logout",children:["\xA0",(0,t.jsx)("button",{type:"submit",children:"Sign out"})]})}export{i as default,d as shouldRevalidate};
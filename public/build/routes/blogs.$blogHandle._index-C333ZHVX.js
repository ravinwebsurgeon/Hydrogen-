import{a as g}from"/build/_shared/chunk-ZRH7DNVD.js";import{c as s}from"/build/_shared/chunk-MO733K6J.js";import{l as i,r,x as l}from"/build/_shared/chunk-PORSORIO.js";import"/build/_shared/chunk-USXU6MDU.js";import{c as n}from"/build/_shared/chunk-Q3IECNXJ.js";var e=n(l(),1),c=({data:t})=>[{title:`Hydrogen | ${t?.blog.title??""} blog`}];function d(){let{blog:t}=r(),{articles:o}=t;return(0,e.jsxs)("div",{className:"blog",children:[(0,e.jsx)("h1",{children:t.title}),(0,e.jsx)("div",{className:"blog-grid",children:(0,e.jsx)(g,{connection:o,children:({node:a,index:u})=>(0,e.jsx)(m,{article:a,loading:u<2?"eager":"lazy"},a.id)})})]})}function m({article:t,loading:o}){let a=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long",day:"numeric"}).format(new Date(t.publishedAt));return(0,e.jsx)("div",{className:"blog-article",children:(0,e.jsxs)(i,{to:`/blogs/${t.blog.handle}/${t.handle}`,children:[t.image&&(0,e.jsx)("div",{className:"blog-article-image",children:(0,e.jsx)(s,{alt:t.image.altText||t.title,aspectRatio:"3/2",data:t.image,loading:o,sizes:"(min-width: 768px) 50vw, 100vw"})}),(0,e.jsx)("h3",{children:t.title}),(0,e.jsx)("small",{children:a})]})},t.id)}export{d as default,c as meta};

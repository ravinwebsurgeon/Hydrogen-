import{u as o,j as s,L as l}from"./components-7YnbHHm3.js";import{P as a}from"./PaginatedResourceSection-BJQBWZe9.js";import{I as r}from"./Image-CMjLZVJT.js";import"./index-1JpHDT0i.js";const x=({data:e})=>[{title:`Hydrogen | ${(e==null?void 0:e.blog.title)??""} blog`}];function u(){const{blog:e}=o(),{articles:n}=e;return s.jsxs("div",{className:"blog",children:[s.jsx("h1",{children:e.title}),s.jsx("div",{className:"blog-grid",children:s.jsx(a,{connection:n,children:({node:i,index:t})=>s.jsx(m,{article:i,loading:t<2?"eager":"lazy"},i.id)})})]})}function m({article:e,loading:n}){const i=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e.publishedAt));return s.jsx("div",{className:"blog-article",children:s.jsxs(l,{to:`/blogs/${e.blog.handle}/${e.handle}`,children:[e.image&&s.jsx("div",{className:"blog-article-image",children:s.jsx(r,{alt:e.image.altText||e.title,aspectRatio:"3/2",data:e.image,loading:n,sizes:"(min-width: 768px) 50vw, 100vw"})}),s.jsx("h3",{children:e.title}),s.jsx("small",{children:i})]})},e.id)}export{u as default,x as meta};

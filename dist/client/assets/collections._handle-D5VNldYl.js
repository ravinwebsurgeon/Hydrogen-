import{u as a,j as i,L as o}from"./components-7YnbHHm3.js";import{j as l}from"./index-1JpHDT0i.js";import{u as r}from"./variants-CsXrF4Td.js";import{P as c}from"./PaginatedResourceSection-BJQBWZe9.js";import{I as m}from"./Image-CMjLZVJT.js";import{M as d}from"./Money-DPx7cSxV.js";const v=({data:e})=>[{title:`Hydrogen | ${(e==null?void 0:e.collection.title)??""} Collection`}];function I(){const{collection:e}=a();return i.jsxs("div",{className:"collection",children:[i.jsx("h1",{children:e.title}),i.jsx("p",{className:"collection-description",children:e.description}),i.jsx(c,{connection:e.products,resourcesClassName:"products-grid",children:({node:t,index:n})=>i.jsx(x,{product:t,loading:n<8?"eager":void 0},t.id)}),i.jsx(l.CollectionView,{data:{collection:{id:e.id,handle:e.handle}}})]})}function x({product:e,loading:t}){const n=e.variants.nodes[0],s=r(e.handle,n.selectedOptions);return i.jsxs(o,{className:"product-item",prefetch:"intent",to:s,children:[e.featuredImage&&i.jsx(m,{alt:e.featuredImage.altText||e.title,aspectRatio:"1/1",data:e.featuredImage,loading:t,sizes:"(min-width: 45em) 400px, 100vw"}),i.jsx("h4",{children:e.title}),i.jsx("small",{children:i.jsx(d,{data:e.priceRange.minVariantPrice})})]},e.id)}export{I as default,v as meta};

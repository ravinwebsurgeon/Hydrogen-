import{b as C,c as b}from"/build/_shared/chunk-LGV3BFFV.js";import"/build/_shared/chunk-LQ3E66PR.js";import{c as g,e as p,g as P,h as y,k as V}from"/build/_shared/chunk-MO733K6J.js";import{a as w,l as f,p as h,r as v,x as d}from"/build/_shared/chunk-PORSORIO.js";import"/build/_shared/chunk-USXU6MDU.js";import{c as i}from"/build/_shared/chunk-Q3IECNXJ.js";var O=i(w(),1);var l=i(d(),1);function A({image:t}){return t?(0,l.jsx)("div",{className:"product-image",children:(0,l.jsx)(g,{alt:t.altText||"Product Image",aspectRatio:"1/1",data:t,sizes:"(min-width: 45em) 50vw, 100vw"},t.id)}):(0,l.jsx)("div",{className:"product-image"})}var s=i(d(),1);function T({analytics:t,children:r,disabled:a,lines:c,onClick:o}){return(0,s.jsx)(p,{route:"/cart",inputs:{lines:c},action:p.ACTIONS.LinesAdd,children:u=>(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("input",{name:"analytics",type:"hidden",value:JSON.stringify(t)}),(0,s.jsx)("button",{type:"submit",onClick:o,disabled:a??u.state!=="idle",children:r})]})})}var n=i(d(),1);function m({product:t,selectedVariant:r,variants:a}){let{open:c}=C();return(0,n.jsxs)("div",{className:"product-form",children:[(0,n.jsx)(P,{handle:t.handle,options:t.options.filter(o=>o.optionValues.length>1),variants:a,children:({option:o})=>(0,n.jsx)(R,{option:o},o.name)}),(0,n.jsx)("br",{}),(0,n.jsx)(T,{disabled:!r||!r.availableForSale,onClick:()=>{c("cart")},lines:r?[{merchandiseId:r.id,quantity:1,selectedVariant:r}]:[],children:r?.availableForSale?"Add to cart":"Sold out"})]})}function R({option:t}){return(0,n.jsxs)("div",{className:"product-options",children:[(0,n.jsx)("h5",{children:t.name}),(0,n.jsx)("div",{className:"product-options-grid",children:t.values.map(({value:r,isAvailable:a,isActive:c,to:o})=>(0,n.jsx)(f,{className:"product-options-item",prefetch:"intent",preventScrollReset:!0,replace:!0,to:o,style:{border:c?"1px solid black":"1px solid transparent",opacity:a?1:.3},children:r},t.name+r))}),(0,n.jsx)("br",{})]},t.name)}var e=i(d(),1),N=({data:t})=>[{title:`Hydrogen | ${t?.product.title??""}`}];function S(){let{product:t,variants:r}=v(),a=y(t.selectedVariant,r),{title:c,descriptionHtml:o}=t;return(0,e.jsxs)("div",{className:"product",children:[(0,e.jsx)(A,{image:a?.image}),(0,e.jsxs)("div",{className:"product-main",children:[(0,e.jsx)("h1",{children:c}),(0,e.jsx)(b,{price:a?.price,compareAtPrice:a?.compareAtPrice}),(0,e.jsx)("br",{}),(0,e.jsx)(O.Suspense,{fallback:(0,e.jsx)(m,{product:t,selectedVariant:a,variants:[]}),children:(0,e.jsx)(h,{errorElement:"There was a problem loading product variants",resolve:r,children:u=>(0,e.jsx)(m,{product:t,selectedVariant:a,variants:u?.product?.variants.nodes||[]})})}),(0,e.jsx)("br",{}),(0,e.jsx)("br",{}),(0,e.jsx)("p",{children:(0,e.jsx)("strong",{children:"Description"})}),(0,e.jsx)("br",{}),(0,e.jsx)("div",{dangerouslySetInnerHTML:{__html:o}}),(0,e.jsx)("br",{})]}),(0,e.jsx)(V.ProductView,{data:{products:[{id:t.id,title:t.title,price:a?.price.amount||"0",vendor:t.vendor,variantId:a?.id||"",variantTitle:a?.title||"",quantity:1}]}})]})}var $=`#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`,I=`#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      optionValues {
        name
      }
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${$}
`,J=`#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${I}
`,D=`#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${$}
`,K=`#graphql
  ${D}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`;export{S as default,N as meta};

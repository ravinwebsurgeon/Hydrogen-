import{a as l}from"/build/_shared/chunk-LQ3E66PR.js";import{a as u}from"/build/_shared/chunk-ZRH7DNVD.js";import{b as c,c as d}from"/build/_shared/chunk-MO733K6J.js";import{l as o,r as i,x as s}from"/build/_shared/chunk-PORSORIO.js";import"/build/_shared/chunk-USXU6MDU.js";import{c as n}from"/build/_shared/chunk-Q3IECNXJ.js";var t=n(s(),1),f=()=>[{title:"Hydrogen | Products"}];function m(){let{products:e}=i();return(0,t.jsxs)("div",{className:"collection",children:[(0,t.jsx)("h1",{children:"Products"}),(0,t.jsx)(u,{connection:e,resourcesClassName:"products-grid",children:({node:a,index:r})=>(0,t.jsx)(P,{product:a,loading:r<8?"eager":void 0},a.id)})]})}function P({product:e,loading:a}){let r=e.variants.nodes[0],g=l(e.handle,r.selectedOptions);return(0,t.jsxs)(o,{className:"product-item",prefetch:"intent",to:g,children:[e.featuredImage&&(0,t.jsx)(d,{alt:e.featuredImage.altText||e.title,aspectRatio:"1/1",data:e.featuredImage,loading:a,sizes:"(min-width: 45em) 400px, 100vw"}),(0,t.jsx)("h4",{children:e.title}),(0,t.jsx)("small",{children:(0,t.jsx)(c,{data:e.priceRange.minVariantPrice})})]},e.id)}var p=`#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
`,v=`#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...ProductItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${p}
`;export{m as default,f as meta};

import{a as u}from"/build/_shared/chunk-LQ3E66PR.js";import{a as m}from"/build/_shared/chunk-ZRH7DNVD.js";import{b as s,c,k as d}from"/build/_shared/chunk-MO733K6J.js";import{l as r,r as i,x as l}from"/build/_shared/chunk-PORSORIO.js";import"/build/_shared/chunk-USXU6MDU.js";import{c as o}from"/build/_shared/chunk-Q3IECNXJ.js";var t=o(l(),1),h=({data:e})=>[{title:`Hydrogen | ${e?.collection.title??""} Collection`}];function g(){let{collection:e}=i();return(0,t.jsxs)("div",{className:"collection",children:[(0,t.jsx)("h1",{children:e.title}),(0,t.jsx)("p",{className:"collection-description",children:e.description}),(0,t.jsx)(m,{connection:e.products,resourcesClassName:"products-grid",children:({node:n,index:a})=>(0,t.jsx)(p,{product:n,loading:a<8?"eager":void 0},n.id)}),(0,t.jsx)(d.CollectionView,{data:{collection:{id:e.id,handle:e.handle}}})]})}function p({product:e,loading:n}){let a=e.variants.nodes[0],f=u(e.handle,a.selectedOptions);return(0,t.jsxs)(r,{className:"product-item",prefetch:"intent",to:f,children:[e.featuredImage&&(0,t.jsx)(c,{alt:e.featuredImage.altText||e.title,aspectRatio:"1/1",data:e.featuredImage,loading:n,sizes:"(min-width: 45em) 400px, 100vw"}),(0,t.jsx)("h4",{children:e.title}),(0,t.jsx)("small",{children:(0,t.jsx)(s,{data:e.priceRange.minVariantPrice})})]},e.id)}var C=`#graphql
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
`,x=`#graphql
  ${C}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;export{g as default,h as meta};

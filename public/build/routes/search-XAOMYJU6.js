import{b as m}from"/build/_shared/chunk-IQUW2RCZ.js";import{b as v,c as y,d as E,k as S}from"/build/_shared/chunk-MO733K6J.js";import{a as _,l as d,m as P,r as f,x as l}from"/build/_shared/chunk-PORSORIO.js";import"/build/_shared/chunk-USXU6MDU.js";import{c}from"/build/_shared/chunk-Q3IECNXJ.js";var h=c(_(),1);var C=c(l(),1);function R({children:n,...t}){let r=(0,h.useRef)(null);return k(r),typeof n!="function"?null:(0,C.jsx)(P,{method:"get",...t,children:n({inputRef:r})})}function k(n){(0,h.useEffect)(()=>{function t(r){r.key==="k"&&r.metaKey&&(r.preventDefault(),n.current?.focus()),r.key==="Escape"&&n.current?.blur()}return document.addEventListener("keydown",t),()=>{document.removeEventListener("keydown",t)}},[n])}var e=c(l(),1);function s({term:n,result:t,children:r}){return t?.total?r({...t.items,term:n}):null}s.Articles=I;s.Pages=T;s.Products=N;s.Empty=b;function I({term:n,articles:t}){return t?.nodes.length?(0,e.jsxs)("div",{className:"search-result",children:[(0,e.jsx)("h2",{children:"Articles"}),(0,e.jsx)("div",{children:t?.nodes?.map(r=>{let o=m({baseUrl:`/blogs/${r.handle}`,trackingParams:r.trackingParameters,term:n});return(0,e.jsx)("div",{className:"search-results-item",children:(0,e.jsx)(d,{prefetch:"intent",to:o,children:r.title})},r.id)})}),(0,e.jsx)("br",{})]}):null}function T({term:n,pages:t}){return t?.nodes.length?(0,e.jsxs)("div",{className:"search-result",children:[(0,e.jsx)("h2",{children:"Pages"}),(0,e.jsx)("div",{children:t?.nodes?.map(r=>{let o=m({baseUrl:`/pages/${r.handle}`,trackingParams:r.trackingParameters,term:n});return(0,e.jsx)("div",{className:"search-results-item",children:(0,e.jsx)(d,{prefetch:"intent",to:o,children:r.title})},r.id)})}),(0,e.jsx)("br",{})]}):null}function N({term:n,products:t}){return t?.nodes.length?(0,e.jsxs)("div",{className:"search-result",children:[(0,e.jsx)("h2",{children:"Products"}),(0,e.jsx)(E,{connection:t,children:({nodes:r,isLoading:o,NextLink:u,PreviousLink:g})=>{let p=r.map(i=>{let $=m({baseUrl:`/products/${i.handle}`,trackingParams:i.trackingParameters,term:n});return(0,e.jsx)("div",{className:"search-results-item",children:(0,e.jsxs)(d,{prefetch:"intent",to:$,children:[i.variants.nodes[0].image&&(0,e.jsx)(y,{data:i.variants.nodes[0].image,alt:i.title,width:50}),(0,e.jsxs)("div",{children:[(0,e.jsx)("p",{children:i.title}),(0,e.jsx)("small",{children:(0,e.jsx)(v,{data:i.variants.nodes[0].price})})]})]})},i.id)});return(0,e.jsxs)("div",{children:[(0,e.jsx)("div",{children:(0,e.jsx)(g,{children:o?"Loading...":(0,e.jsx)("span",{children:"\u2191 Load previous"})})}),(0,e.jsxs)("div",{children:[p,(0,e.jsx)("br",{})]}),(0,e.jsx)("div",{children:(0,e.jsx)(u,{children:o?"Loading...":(0,e.jsx)("span",{children:"Load more \u2193"})})})]})}}),(0,e.jsx)("br",{})]}):null}function b(){return(0,e.jsx)("p",{children:"No results, try a different search."})}var a=c(l(),1),L=()=>[{title:"Hydrogen | Search"}];function A(){let{type:n,term:t,result:r,error:o}=f();return n==="predictive"?null:(0,a.jsxs)("div",{className:"search",children:[(0,a.jsx)("h1",{children:"Search"}),(0,a.jsx)(R,{children:({inputRef:u})=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("input",{defaultValue:t,name:"q",placeholder:"Search\u2026",ref:u,type:"search"}),"\xA0",(0,a.jsx)("button",{type:"submit",children:"Search"})]})}),o&&(0,a.jsx)("p",{style:{color:"red"},children:o}),!t||!r?.total?(0,a.jsx)(s.Empty,{}):(0,a.jsx)(s,{result:r,term:t,children:({articles:u,pages:g,products:p,term:i})=>(0,a.jsxs)("div",{children:[(0,a.jsx)(s.Products,{products:p,term:i}),(0,a.jsx)(s.Pages,{pages:g,term:i}),(0,a.jsx)(s.Articles,{articles:u,term:i})]})}),(0,a.jsx)(S.SearchView,{data:{searchTerm:t,searchResults:r}})]})}var w=`#graphql
  fragment SearchProduct on Product {
    __typename
    handle
    id
    publishedAt
    title
    trackingParameters
    vendor
    variants(first: 1) {
      nodes {
        id
        image {
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        product {
          handle
          title
        }
      }
    }
  }
`,q=`#graphql
  fragment SearchPage on Page {
     __typename
     handle
    id
    title
    trackingParameters
  }
`,F=`#graphql
  fragment SearchArticle on Article {
    __typename
    handle
    id
    title
    trackingParameters
  }
`,U=`#graphql
  fragment PageInfoFragment on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`,Z=`#graphql
  query RegularSearch(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $term: String!
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    articles: search(
      query: $term,
      types: [ARTICLE],
      first: $first,
    ) {
      nodes {
        ...on Article {
          ...SearchArticle
        }
      }
    }
    pages: search(
      query: $term,
      types: [PAGE],
      first: $first,
    ) {
      nodes {
        ...on Page {
          ...SearchPage
        }
      }
    }
    products: search(
      after: $endCursor,
      before: $startCursor,
      first: $first,
      last: $last,
      query: $term,
      sortKey: RELEVANCE,
      types: [PRODUCT],
      unavailableProducts: HIDE,
    ) {
      nodes {
        ...on Product {
          ...SearchProduct
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
  ${w}
  ${q}
  ${F}
  ${U}
`;var x=`#graphql
  fragment PredictiveArticle on Article {
    __typename
    id
    title
    handle
    blog {
      handle
    }
    image {
      url
      altText
      width
      height
    }
    trackingParameters
  }
`,D=`#graphql
  fragment PredictiveCollection on Collection {
    __typename
    id
    title
    handle
    image {
      url
      altText
      width
      height
    }
    trackingParameters
  }
`,G=`#graphql
  fragment PredictivePage on Page {
    __typename
    id
    title
    handle
    trackingParameters
  }
`,H=`#graphql
  fragment PredictiveProduct on Product {
    __typename
    id
    title
    handle
    trackingParameters
    variants(first: 1) {
      nodes {
        id
        image {
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
      }
    }
  }
`,M=`#graphql
  fragment PredictiveQuery on SearchQuerySuggestion {
    __typename
    text
    styledText
    trackingParameters
  }
`,ee=`#graphql
  query PredictiveSearch(
    $country: CountryCode
    $language: LanguageCode
    $limit: Int!
    $limitScope: PredictiveSearchLimitScope!
    $term: String!
    $types: [PredictiveSearchType!]
  ) @inContext(country: $country, language: $language) {
    predictiveSearch(
      limit: $limit,
      limitScope: $limitScope,
      query: $term,
      types: $types,
    ) {
      articles {
        ...PredictiveArticle
      }
      collections {
        ...PredictiveCollection
      }
      pages {
        ...PredictivePage
      }
      products {
        ...PredictiveProduct
      }
      queries {
        ...PredictiveQuery
      }
    }
  }
  ${x}
  ${D}
  ${G}
  ${H}
  ${M}
`;export{A as default,L as meta};

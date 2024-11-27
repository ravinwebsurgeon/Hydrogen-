var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.jsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { createContentSecurityPolicy } from "@shopify/hydrogen";
import { jsx } from "react/jsx-runtime";
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext, context) {
  let { nonce, header, NonceProvider } = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN
    }
  }), body = await renderToReadableStream(
    /* @__PURE__ */ jsx(NonceProvider, { children: /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url }) }),
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error), responseStatusCode = 500;
      }
    }
  );
  return isbot(request.headers.get("user-agent")) && await body.allReady, responseHeaders.set("Content-Type", "text/html"), responseHeaders.set("Content-Security-Policy", header), new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}

// app/root.jsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  Layout: () => Layout,
  default: () => App,
  links: () => links,
  loader: () => loader,
  shouldRevalidate: () => shouldRevalidate
});
import { useNonce, getShopAnalytics, Analytics } from "@shopify/hydrogen";
import { defer } from "@shopify/remix-oxygen";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useRouteError,
  useRouteLoaderData,
  ScrollRestoration,
  isRouteErrorResponse
} from "@remix-run/react";

// app/assets/favicon.svg
var favicon_default = "/build/_assets/favicon-5FIZBM2K.svg";

// app/root.jsx
import resetStyles from "~/styles/reset.css?url";
import appStyles from "~/styles/app.css?url";

// app/components/PageLayout.jsx
import { Await as Await3, Link as Link4 } from "@remix-run/react";
import { Suspense as Suspense3, useId } from "react";

// app/components/Aside.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function Aside({ children, heading, type }) {
  let { type: activeType, close } = useAside(), expanded = type === activeType;
  return useEffect(() => {
    let abortController = new AbortController();
    return expanded && document.addEventListener(
      "keydown",
      function(event) {
        event.key === "Escape" && close();
      },
      { signal: abortController.signal }
    ), () => abortController.abort();
  }, [close, expanded]), /* @__PURE__ */ jsxs(
    "div",
    {
      "aria-modal": !0,
      className: `overlay ${expanded ? "expanded" : ""}`,
      role: "dialog",
      children: [
        /* @__PURE__ */ jsx2("button", { className: "close-outside", onClick: close }),
        /* @__PURE__ */ jsxs("aside", { children: [
          /* @__PURE__ */ jsxs("header", { children: [
            /* @__PURE__ */ jsx2("h3", { children: heading }),
            /* @__PURE__ */ jsx2("button", { className: "close reset", onClick: close, children: "\xD7" })
          ] }),
          /* @__PURE__ */ jsx2("main", { children })
        ] })
      ]
    }
  );
}
var AsideContext = createContext(null);
Aside.Provider = function({ children }) {
  let [type, setType] = useState("closed");
  return /* @__PURE__ */ jsx2(
    AsideContext.Provider,
    {
      value: {
        type,
        open: setType,
        close: () => setType("closed")
      },
      children
    }
  );
};
function useAside() {
  let aside = useContext(AsideContext);
  if (!aside)
    throw new Error("useAside must be used within an AsideProvider");
  return aside;
}

// app/components/Footer.jsx
import { Suspense } from "react";
import { Await, NavLink } from "@remix-run/react";
import { jsx as jsx3 } from "react/jsx-runtime";
function Footer({ footer: footerPromise, header, publicStoreDomain }) {
  return /* @__PURE__ */ jsx3(Suspense, { children: /* @__PURE__ */ jsx3(Await, { resolve: footerPromise, children: (footer) => /* @__PURE__ */ jsx3("footer", { className: "footer", children: footer?.menu && header.shop.primaryDomain?.url && /* @__PURE__ */ jsx3(
    FooterMenu,
    {
      menu: footer.menu,
      primaryDomainUrl: header.shop.primaryDomain.url,
      publicStoreDomain
    }
  ) }) }) });
}
function FooterMenu({ menu, primaryDomainUrl, publicStoreDomain }) {
  return /* @__PURE__ */ jsx3("nav", { className: "footer-menu", role: "navigation", children: (menu || FALLBACK_FOOTER_MENU).items.map((item) => {
    if (!item.url)
      return null;
    let url = item.url.includes("myshopify.com") || item.url.includes(publicStoreDomain) || item.url.includes(primaryDomainUrl) ? new URL(item.url).pathname : item.url;
    return !url.startsWith("/") ? /* @__PURE__ */ jsx3("a", { href: url, rel: "noopener noreferrer", target: "_blank", children: item.title }, item.id) : /* @__PURE__ */ jsx3(
      NavLink,
      {
        end: !0,
        prefetch: "intent",
        style: activeLinkStyle,
        to: url,
        children: item.title
      },
      item.id
    );
  }) });
}
var FALLBACK_FOOTER_MENU = {
  id: "gid://shopify/Menu/199655620664",
  items: [
    {
      id: "gid://shopify/MenuItem/461633060920",
      resourceId: "gid://shopify/ShopPolicy/23358046264",
      tags: [],
      title: "Privacy Policy",
      type: "SHOP_POLICY",
      url: "/policies/privacy-policy",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461633093688",
      resourceId: "gid://shopify/ShopPolicy/23358013496",
      tags: [],
      title: "Refund Policy",
      type: "SHOP_POLICY",
      url: "/policies/refund-policy",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461633126456",
      resourceId: "gid://shopify/ShopPolicy/23358111800",
      tags: [],
      title: "Shipping Policy",
      type: "SHOP_POLICY",
      url: "/policies/shipping-policy",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461633159224",
      resourceId: "gid://shopify/ShopPolicy/23358079032",
      tags: [],
      title: "Terms of Service",
      type: "SHOP_POLICY",
      url: "/policies/terms-of-service",
      items: []
    }
  ]
};
function activeLinkStyle({ isActive, isPending }) {
  return {
    fontWeight: isActive ? "bold" : void 0,
    color: isPending ? "grey" : "white"
  };
}

// app/components/Header.jsx
import { Suspense as Suspense2 } from "react";
import { Await as Await2, NavLink as NavLink2, useAsyncValue } from "@remix-run/react";
import { useAnalytics, useOptimisticCart } from "@shopify/hydrogen";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function Header({ header, isLoggedIn, cart, publicStoreDomain }) {
  let { shop, menu } = header;
  return /* @__PURE__ */ jsxs2("header", { className: "header", children: [
    /* @__PURE__ */ jsx4(NavLink2, { prefetch: "intent", to: "/", style: activeLinkStyle2, end: !0, children: /* @__PURE__ */ jsx4("strong", { children: shop.name }) }),
    /* @__PURE__ */ jsx4(
      HeaderMenu,
      {
        menu,
        viewport: "desktop",
        primaryDomainUrl: header.shop.primaryDomain.url,
        publicStoreDomain
      }
    ),
    /* @__PURE__ */ jsx4(HeaderCtas, { isLoggedIn, cart })
  ] });
}
function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain
}) {
  let className = `header-menu-${viewport}`, { close } = useAside();
  return /* @__PURE__ */ jsxs2("nav", { className, role: "navigation", children: [
    viewport === "mobile" && /* @__PURE__ */ jsx4(
      NavLink2,
      {
        end: !0,
        onClick: close,
        prefetch: "intent",
        style: activeLinkStyle2,
        to: "/",
        children: "Home"
      }
    ),
    (menu || FALLBACK_HEADER_MENU).items.map((item) => {
      if (!item.url)
        return null;
      let url = item.url.includes("myshopify.com") || item.url.includes(publicStoreDomain) || item.url.includes(primaryDomainUrl) ? new URL(item.url).pathname : item.url;
      return /* @__PURE__ */ jsx4(
        NavLink2,
        {
          className: "header-menu-item",
          end: !0,
          onClick: close,
          prefetch: "intent",
          style: activeLinkStyle2,
          to: url,
          children: item.title
        },
        item.id
      );
    })
  ] });
}
function HeaderCtas({ isLoggedIn, cart }) {
  return /* @__PURE__ */ jsxs2("nav", { className: "header-ctas", role: "navigation", children: [
    /* @__PURE__ */ jsx4(HeaderMenuMobileToggle, {}),
    /* @__PURE__ */ jsx4(NavLink2, { prefetch: "intent", to: "/account", style: activeLinkStyle2, children: /* @__PURE__ */ jsx4(Suspense2, { fallback: "Sign in", children: /* @__PURE__ */ jsx4(Await2, { resolve: isLoggedIn, errorElement: "Sign in", children: (isLoggedIn2) => isLoggedIn2 ? "Account" : "Sign in" }) }) }),
    /* @__PURE__ */ jsx4(SearchToggle, {}),
    /* @__PURE__ */ jsx4(CartToggle, { cart })
  ] });
}
function HeaderMenuMobileToggle() {
  let { open } = useAside();
  return /* @__PURE__ */ jsx4(
    "button",
    {
      className: "header-menu-mobile-toggle reset",
      onClick: () => open("mobile"),
      children: /* @__PURE__ */ jsx4("h3", { children: "\u2630" })
    }
  );
}
function SearchToggle() {
  let { open } = useAside();
  return /* @__PURE__ */ jsx4("button", { className: "reset", onClick: () => open("search"), children: "Search" });
}
function CartBadge({ count }) {
  let { open } = useAside(), { publish, shop, cart, prevCart } = useAnalytics();
  return /* @__PURE__ */ jsxs2(
    "a",
    {
      href: "/cart",
      onClick: (e) => {
        e.preventDefault(), open("cart"), publish("cart_viewed", {
          cart,
          prevCart,
          shop,
          url: window.location.href || ""
        });
      },
      children: [
        "Cart ",
        count === null ? /* @__PURE__ */ jsx4("span", { children: "\xA0" }) : count
      ]
    }
  );
}
function CartToggle({ cart }) {
  return /* @__PURE__ */ jsx4(Suspense2, { fallback: /* @__PURE__ */ jsx4(CartBadge, { count: null }), children: /* @__PURE__ */ jsx4(Await2, { resolve: cart, children: /* @__PURE__ */ jsx4(CartBanner, {}) }) });
}
function CartBanner() {
  let originalCart = useAsyncValue(), cart = useOptimisticCart(originalCart);
  return /* @__PURE__ */ jsx4(CartBadge, { count: cart?.totalQuantity ?? 0 });
}
var FALLBACK_HEADER_MENU = {
  id: "gid://shopify/Menu/199655587896",
  items: [
    {
      id: "gid://shopify/MenuItem/461609500728",
      resourceId: null,
      tags: [],
      title: "Collections",
      type: "HTTP",
      url: "/collections",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461609533496",
      resourceId: null,
      tags: [],
      title: "Blog",
      type: "HTTP",
      url: "/blogs/journal",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461609566264",
      resourceId: null,
      tags: [],
      title: "Policies",
      type: "HTTP",
      url: "/policies",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461609599032",
      resourceId: "gid://shopify/Page/92591030328",
      tags: [],
      title: "About",
      type: "PAGE",
      url: "/pages/about",
      items: []
    }
  ]
};
function activeLinkStyle2({ isActive, isPending }) {
  return {
    fontWeight: isActive ? "bold" : void 0,
    color: isPending ? "grey" : "black"
  };
}

// app/components/CartMain.jsx
import { useOptimisticCart as useOptimisticCart2 } from "@shopify/hydrogen";
import { Link as Link2 } from "@remix-run/react";

// app/components/CartLineItem.jsx
import { CartForm, Image } from "@shopify/hydrogen";

// app/lib/variants.js
import { useLocation } from "@remix-run/react";
import { useMemo } from "react";
function useVariantUrl(handle, selectedOptions) {
  let { pathname } = useLocation();
  return useMemo(() => getVariantUrl({
    handle,
    pathname,
    searchParams: new URLSearchParams(),
    selectedOptions
  }), [handle, selectedOptions, pathname]);
}
function getVariantUrl({
  handle,
  pathname,
  searchParams,
  selectedOptions
}) {
  let match = /(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(pathname), path = match && match.length > 0 ? `${match[0]}products/${handle}` : `/products/${handle}`;
  selectedOptions.forEach((option) => {
    searchParams.set(option.name, option.value);
  });
  let searchString = searchParams.toString();
  return path + (searchString ? "?" + searchParams.toString() : "");
}

// app/components/CartLineItem.jsx
import { Link } from "@remix-run/react";

// app/components/ProductPrice.jsx
import { Money } from "@shopify/hydrogen";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function ProductPrice({ price, compareAtPrice }) {
  return /* @__PURE__ */ jsx5("div", { className: "product-price", children: compareAtPrice ? /* @__PURE__ */ jsxs3("div", { className: "product-price-on-sale", children: [
    price ? /* @__PURE__ */ jsx5(Money, { data: price }) : null,
    /* @__PURE__ */ jsx5("s", { children: /* @__PURE__ */ jsx5(Money, { data: compareAtPrice }) })
  ] }) : price ? /* @__PURE__ */ jsx5(Money, { data: price }) : /* @__PURE__ */ jsx5("span", { children: "\xA0" }) });
}

// app/components/CartLineItem.jsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
function CartLineItem({ layout, line }) {
  let { id, merchandise } = line, { product, title, image, selectedOptions } = merchandise, lineItemUrl = useVariantUrl(product.handle, selectedOptions), { close } = useAside();
  return /* @__PURE__ */ jsxs4("li", { className: "cart-line", children: [
    image && /* @__PURE__ */ jsx6(
      Image,
      {
        alt: title,
        aspectRatio: "1/1",
        data: image,
        height: 100,
        loading: "lazy",
        width: 100
      }
    ),
    /* @__PURE__ */ jsxs4("div", { children: [
      /* @__PURE__ */ jsx6(
        Link,
        {
          prefetch: "intent",
          to: lineItemUrl,
          onClick: () => {
            layout === "aside" && close();
          },
          children: /* @__PURE__ */ jsx6("p", { children: /* @__PURE__ */ jsx6("strong", { children: product.title }) })
        }
      ),
      /* @__PURE__ */ jsx6(ProductPrice, { price: line?.cost?.totalAmount }),
      /* @__PURE__ */ jsx6("ul", { children: selectedOptions.map((option) => /* @__PURE__ */ jsx6("li", { children: /* @__PURE__ */ jsxs4("small", { children: [
        option.name,
        ": ",
        option.value
      ] }) }, option.name)) }),
      /* @__PURE__ */ jsx6(CartLineQuantity, { line })
    ] })
  ] }, id);
}
function CartLineQuantity({ line }) {
  if (!line || typeof line?.quantity > "u")
    return null;
  let { id: lineId, quantity, isOptimistic } = line, prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0)), nextQuantity = Number((quantity + 1).toFixed(0));
  return /* @__PURE__ */ jsxs4("div", { className: "cart-line-quantity", children: [
    /* @__PURE__ */ jsxs4("small", { children: [
      "Quantity: ",
      quantity,
      " \xA0\xA0"
    ] }),
    /* @__PURE__ */ jsx6(CartLineUpdateButton, { lines: [{ id: lineId, quantity: prevQuantity }], children: /* @__PURE__ */ jsx6(
      "button",
      {
        "aria-label": "Decrease quantity",
        disabled: quantity <= 1 || !!isOptimistic,
        name: "decrease-quantity",
        value: prevQuantity,
        children: /* @__PURE__ */ jsx6("span", { children: "\u2212 " })
      }
    ) }),
    "\xA0",
    /* @__PURE__ */ jsx6(CartLineUpdateButton, { lines: [{ id: lineId, quantity: nextQuantity }], children: /* @__PURE__ */ jsx6(
      "button",
      {
        "aria-label": "Increase quantity",
        name: "increase-quantity",
        value: nextQuantity,
        disabled: !!isOptimistic,
        children: /* @__PURE__ */ jsx6("span", { children: "+" })
      }
    ) }),
    "\xA0",
    /* @__PURE__ */ jsx6(CartLineRemoveButton, { lineIds: [lineId], disabled: !!isOptimistic })
  ] });
}
function CartLineRemoveButton({ lineIds, disabled }) {
  return /* @__PURE__ */ jsx6(
    CartForm,
    {
      route: "/cart",
      action: CartForm.ACTIONS.LinesRemove,
      inputs: { lineIds },
      children: /* @__PURE__ */ jsx6("button", { disabled, type: "submit", children: "Remove" })
    }
  );
}
function CartLineUpdateButton({ children, lines }) {
  return /* @__PURE__ */ jsx6(
    CartForm,
    {
      route: "/cart",
      action: CartForm.ACTIONS.LinesUpdate,
      inputs: { lines },
      children
    }
  );
}

// app/components/CartSummary.jsx
import { CartForm as CartForm2, Money as Money2 } from "@shopify/hydrogen";
import { useRef } from "react";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
function CartSummary({ cart, layout }) {
  return /* @__PURE__ */ jsxs5("div", { "aria-labelledby": "cart-summary", className: layout === "page" ? "cart-summary-page" : "cart-summary-aside", children: [
    /* @__PURE__ */ jsx7("h4", { children: "Totals" }),
    /* @__PURE__ */ jsxs5("dl", { className: "cart-subtotal", children: [
      /* @__PURE__ */ jsx7("dt", { children: "Subtotal" }),
      /* @__PURE__ */ jsx7("dd", { children: cart.cost?.subtotalAmount?.amount ? /* @__PURE__ */ jsx7(Money2, { data: cart.cost?.subtotalAmount }) : "-" })
    ] }),
    /* @__PURE__ */ jsx7(CartDiscounts, { discountCodes: cart.discountCodes }),
    /* @__PURE__ */ jsx7(CartGiftCard, { giftCardCodes: cart.appliedGiftCards }),
    /* @__PURE__ */ jsx7(CartCheckoutActions, { checkoutUrl: cart.checkoutUrl })
  ] });
}
function CartCheckoutActions({ checkoutUrl }) {
  return checkoutUrl ? /* @__PURE__ */ jsxs5("div", { children: [
    /* @__PURE__ */ jsx7("a", { href: checkoutUrl, target: "_self", children: /* @__PURE__ */ jsx7("p", { children: "Continue to Checkout \u2192" }) }),
    /* @__PURE__ */ jsx7("br", {})
  ] }) : null;
}
function CartDiscounts({ discountCodes }) {
  let codes = discountCodes?.filter((discount) => discount.applicable)?.map(({ code }) => code) || [];
  return /* @__PURE__ */ jsxs5("div", { children: [
    /* @__PURE__ */ jsx7("dl", { hidden: !codes.length, children: /* @__PURE__ */ jsxs5("div", { children: [
      /* @__PURE__ */ jsx7("dt", { children: "Discount(s)" }),
      /* @__PURE__ */ jsx7(UpdateDiscountForm, { children: /* @__PURE__ */ jsxs5("div", { className: "cart-discount", children: [
        /* @__PURE__ */ jsx7("code", { children: codes?.join(", ") }),
        "\xA0",
        /* @__PURE__ */ jsx7("button", { children: "Remove" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx7(UpdateDiscountForm, { discountCodes: codes, children: /* @__PURE__ */ jsxs5("div", { children: [
      /* @__PURE__ */ jsx7("input", { type: "text", name: "discountCode", placeholder: "Discount code" }),
      "\xA0",
      /* @__PURE__ */ jsx7("button", { type: "submit", children: "Apply" })
    ] }) })
  ] });
}
function UpdateDiscountForm({ discountCodes, children }) {
  return /* @__PURE__ */ jsx7(
    CartForm2,
    {
      route: "/cart",
      action: CartForm2.ACTIONS.DiscountCodesUpdate,
      inputs: {
        discountCodes: discountCodes || []
      },
      children
    }
  );
}
function CartGiftCard({ giftCardCodes }) {
  let appliedGiftCardCodes = useRef([]), giftCardCodeInput = useRef(null), codes = giftCardCodes?.map(({ lastCharacters }) => `***${lastCharacters}`) || [];
  function saveAppliedCode(code) {
    let formattedCode = code.replace(/\s/g, "");
    appliedGiftCardCodes.current.includes(formattedCode) || appliedGiftCardCodes.current.push(formattedCode), giftCardCodeInput.current.value = "";
  }
  function removeAppliedCode() {
    appliedGiftCardCodes.current = [];
  }
  return /* @__PURE__ */ jsxs5("div", { children: [
    /* @__PURE__ */ jsx7("dl", { hidden: !codes.length, children: /* @__PURE__ */ jsxs5("div", { children: [
      /* @__PURE__ */ jsx7("dt", { children: "Applied Gift Card(s)" }),
      /* @__PURE__ */ jsx7(UpdateGiftCardForm, { children: /* @__PURE__ */ jsxs5("div", { className: "cart-discount", children: [
        /* @__PURE__ */ jsx7("code", { children: codes?.join(", ") }),
        "\xA0",
        /* @__PURE__ */ jsx7("button", { onSubmit: () => removeAppliedCode, children: "Remove" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx7(
      UpdateGiftCardForm,
      {
        giftCardCodes: appliedGiftCardCodes.current,
        saveAppliedCode,
        children: /* @__PURE__ */ jsxs5("div", { children: [
          /* @__PURE__ */ jsx7(
            "input",
            {
              type: "text",
              name: "giftCardCode",
              placeholder: "Gift card code",
              ref: giftCardCodeInput
            }
          ),
          "\xA0",
          /* @__PURE__ */ jsx7("button", { type: "submit", children: "Apply" })
        ] })
      }
    )
  ] });
}
function UpdateGiftCardForm({ giftCardCodes, saveAppliedCode, children }) {
  return /* @__PURE__ */ jsx7(
    CartForm2,
    {
      route: "/cart",
      action: CartForm2.ACTIONS.GiftCardCodesUpdate,
      inputs: {
        giftCardCodes: giftCardCodes || []
      },
      children: (fetcher) => {
        let code = fetcher.formData?.get("giftCardCode");
        return code && saveAppliedCode && saveAppliedCode(code), children;
      }
    }
  );
}

// app/components/CartMain.jsx
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
function CartMain({ layout, cart: originalCart }) {
  let cart = useOptimisticCart2(originalCart), linesCount = Boolean(cart?.lines?.nodes?.length || 0), className = `cart-main ${cart && Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length) ? "with-discount" : ""}`, cartHasItems = cart?.totalQuantity > 0;
  return /* @__PURE__ */ jsxs6("div", { className, children: [
    /* @__PURE__ */ jsx8(CartEmpty, { hidden: linesCount, layout }),
    /* @__PURE__ */ jsxs6("div", { className: "cart-details", children: [
      /* @__PURE__ */ jsx8("div", { "aria-labelledby": "cart-lines", children: /* @__PURE__ */ jsx8("ul", { children: (cart?.lines?.nodes ?? []).map((line) => /* @__PURE__ */ jsx8(CartLineItem, { line, layout }, line.id)) }) }),
      cartHasItems && /* @__PURE__ */ jsx8(CartSummary, { cart, layout })
    ] })
  ] });
}
function CartEmpty({ hidden = !1 }) {
  let { close } = useAside();
  return /* @__PURE__ */ jsxs6("div", { hidden, children: [
    /* @__PURE__ */ jsx8("br", {}),
    /* @__PURE__ */ jsx8("p", { children: "Looks like you haven\u2019t added anything yet, let\u2019s get you started!" }),
    /* @__PURE__ */ jsx8("br", {}),
    /* @__PURE__ */ jsx8(Link2, { to: "/collections", onClick: close, prefetch: "viewport", children: "Continue shopping \u2192" })
  ] });
}

// app/components/SearchFormPredictive.jsx
import { useFetcher, useNavigate } from "@remix-run/react";
import { useRef as useRef2, useEffect as useEffect2 } from "react";
import { jsx as jsx9 } from "react/jsx-runtime";
var SEARCH_ENDPOINT = "/search";
function SearchFormPredictive({
  children,
  className = "predictive-search-form",
  ...props
}) {
  let fetcher = useFetcher({ key: "search" }), inputRef = useRef2(null), navigate = useNavigate(), aside = useAside();
  function resetInput(event) {
    event.preventDefault(), event.stopPropagation(), inputRef?.current?.value && inputRef.current.blur();
  }
  function goToSearch() {
    let term = inputRef?.current?.value;
    navigate(SEARCH_ENDPOINT + (term ? `?q=${term}` : "")), aside.close();
  }
  function fetchResults(event) {
    fetcher.submit(
      { q: event.target.value || "", limit: 5, predictive: !0 },
      { method: "GET", action: SEARCH_ENDPOINT }
    );
  }
  return useEffect2(() => {
    inputRef?.current?.setAttribute("type", "search");
  }, []), typeof children != "function" ? null : /* @__PURE__ */ jsx9(fetcher.Form, { ...props, className, onSubmit: resetInput, children: children({ inputRef, fetcher, fetchResults, goToSearch }) });
}

// app/components/SearchResultsPredictive.jsx
import { Link as Link3, useFetcher as useFetcher2 } from "@remix-run/react";
import { Image as Image2, Money as Money3 } from "@shopify/hydrogen";
import { useRef as useRef3, useEffect as useEffect3 } from "react";

// app/lib/search.js
function getEmptyPredictiveSearchResult() {
  return {
    total: 0,
    items: {
      articles: [],
      collections: [],
      products: [],
      pages: [],
      queries: []
    }
  };
}
function urlWithTrackingParams({
  baseUrl,
  trackingParams,
  params: extraParams,
  term
}) {
  let search = new URLSearchParams({
    ...extraParams,
    q: encodeURIComponent(term)
  }).toString();
  return trackingParams && (search = `${search}&${trackingParams}`), `${baseUrl}?${search}`;
}

// app/components/SearchResultsPredictive.jsx
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
function SearchResultsPredictive({ children }) {
  let aside = useAside(), { term, inputRef, fetcher, total, items } = usePredictiveSearch();
  function resetInput() {
    inputRef.current && (inputRef.current.blur(), inputRef.current.value = "");
  }
  function closeSearch() {
    resetInput(), aside.close();
  }
  return children({
    items,
    closeSearch,
    inputRef,
    state: fetcher.state,
    term,
    total
  });
}
SearchResultsPredictive.Articles = SearchResultsPredictiveArticles;
SearchResultsPredictive.Collections = SearchResultsPredictiveCollections;
SearchResultsPredictive.Pages = SearchResultsPredictivePages;
SearchResultsPredictive.Products = SearchResultsPredictiveProducts;
SearchResultsPredictive.Queries = SearchResultsPredictiveQueries;
SearchResultsPredictive.Empty = SearchResultsPredictiveEmpty;
function SearchResultsPredictiveArticles({ term, articles, closeSearch }) {
  return articles.length ? /* @__PURE__ */ jsxs7("div", { className: "predictive-search-result", children: [
    /* @__PURE__ */ jsx10("h5", { children: "Articles" }),
    /* @__PURE__ */ jsx10("ul", { children: articles.map((article) => {
      let articleUrl = urlWithTrackingParams({
        baseUrl: `/blogs/${article.blog.handle}/${article.handle}`,
        trackingParams: article.trackingParameters,
        term: term.current ?? ""
      });
      return /* @__PURE__ */ jsx10("li", { className: "predictive-search-result-item", children: /* @__PURE__ */ jsxs7(Link3, { onClick: closeSearch, to: articleUrl, children: [
        article.image?.url && /* @__PURE__ */ jsx10(
          Image2,
          {
            alt: article.image.altText ?? "",
            src: article.image.url,
            width: 50,
            height: 50
          }
        ),
        /* @__PURE__ */ jsx10("div", { children: /* @__PURE__ */ jsx10("span", { children: article.title }) })
      ] }) }, article.id);
    }) })
  ] }, "articles") : null;
}
function SearchResultsPredictiveCollections({ term, collections, closeSearch }) {
  return collections.length ? /* @__PURE__ */ jsxs7("div", { className: "predictive-search-result", children: [
    /* @__PURE__ */ jsx10("h5", { children: "Collections" }),
    /* @__PURE__ */ jsx10("ul", { children: collections.map((collection) => {
      let colllectionUrl = urlWithTrackingParams({
        baseUrl: `/collections/${collection.handle}`,
        trackingParams: collection.trackingParameters,
        term: term.current
      });
      return /* @__PURE__ */ jsx10("li", { className: "predictive-search-result-item", children: /* @__PURE__ */ jsxs7(Link3, { onClick: closeSearch, to: colllectionUrl, children: [
        collection.image?.url && /* @__PURE__ */ jsx10(
          Image2,
          {
            alt: collection.image.altText ?? "",
            src: collection.image.url,
            width: 50,
            height: 50
          }
        ),
        /* @__PURE__ */ jsx10("div", { children: /* @__PURE__ */ jsx10("span", { children: collection.title }) })
      ] }) }, collection.id);
    }) })
  ] }, "collections") : null;
}
function SearchResultsPredictivePages({ term, pages, closeSearch }) {
  return pages.length ? /* @__PURE__ */ jsxs7("div", { className: "predictive-search-result", children: [
    /* @__PURE__ */ jsx10("h5", { children: "Pages" }),
    /* @__PURE__ */ jsx10("ul", { children: pages.map((page) => {
      let pageUrl = urlWithTrackingParams({
        baseUrl: `/pages/${page.handle}`,
        trackingParams: page.trackingParameters,
        term: term.current
      });
      return /* @__PURE__ */ jsx10("li", { className: "predictive-search-result-item", children: /* @__PURE__ */ jsx10(Link3, { onClick: closeSearch, to: pageUrl, children: /* @__PURE__ */ jsx10("div", { children: /* @__PURE__ */ jsx10("span", { children: page.title }) }) }) }, page.id);
    }) })
  ] }, "pages") : null;
}
function SearchResultsPredictiveProducts({ term, products, closeSearch }) {
  return products.length ? /* @__PURE__ */ jsxs7("div", { className: "predictive-search-result", children: [
    /* @__PURE__ */ jsx10("h5", { children: "Products" }),
    /* @__PURE__ */ jsx10("ul", { children: products.map((product) => {
      let productUrl = urlWithTrackingParams({
        baseUrl: `/products/${product.handle}`,
        trackingParams: product.trackingParameters,
        term: term.current
      }), image = product?.variants?.nodes?.[0].image;
      return /* @__PURE__ */ jsx10("li", { className: "predictive-search-result-item", children: /* @__PURE__ */ jsxs7(Link3, { to: productUrl, onClick: closeSearch, children: [
        image && /* @__PURE__ */ jsx10(
          Image2,
          {
            alt: image.altText ?? "",
            src: image.url,
            width: 50,
            height: 50
          }
        ),
        /* @__PURE__ */ jsxs7("div", { children: [
          /* @__PURE__ */ jsx10("p", { children: product.title }),
          /* @__PURE__ */ jsx10("small", { children: product?.variants?.nodes?.[0].price && /* @__PURE__ */ jsx10(Money3, { data: product.variants.nodes[0].price }) })
        ] })
      ] }) }, product.id);
    }) })
  ] }, "products") : null;
}
function SearchResultsPredictiveQueries({ queries, queriesDatalistId }) {
  return queries.length ? /* @__PURE__ */ jsx10("datalist", { id: queriesDatalistId, children: queries.map((suggestion) => suggestion ? /* @__PURE__ */ jsx10("option", { value: suggestion.text }, suggestion.text) : null) }) : null;
}
function SearchResultsPredictiveEmpty({ term }) {
  return term.current ? /* @__PURE__ */ jsxs7("p", { children: [
    "No results found for ",
    /* @__PURE__ */ jsx10("q", { children: term.current })
  ] }) : null;
}
function usePredictiveSearch() {
  let fetcher = useFetcher2({ key: "search" }), term = useRef3(""), inputRef = useRef3(null);
  fetcher?.state === "loading" && (term.current = String(fetcher.formData?.get("q") || "")), useEffect3(() => {
    inputRef.current || (inputRef.current = document.querySelector('input[type="search"]'));
  }, []);
  let { items, total } = fetcher?.data?.result ?? getEmptyPredictiveSearchResult();
  return { items, total, inputRef, term, fetcher };
}

// app/components/PageLayout.jsx
import { Fragment, jsx as jsx11, jsxs as jsxs8 } from "react/jsx-runtime";
function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain
}) {
  return /* @__PURE__ */ jsxs8(Aside.Provider, { children: [
    /* @__PURE__ */ jsx11(CartAside, { cart }),
    /* @__PURE__ */ jsx11(SearchAside, {}),
    /* @__PURE__ */ jsx11(MobileMenuAside, { header, publicStoreDomain }),
    header && /* @__PURE__ */ jsx11(
      Header,
      {
        header,
        cart,
        isLoggedIn,
        publicStoreDomain
      }
    ),
    /* @__PURE__ */ jsx11("main", { children }),
    /* @__PURE__ */ jsx11(
      Footer,
      {
        footer,
        header,
        publicStoreDomain
      }
    )
  ] });
}
function CartAside({ cart }) {
  return /* @__PURE__ */ jsx11(Aside, { type: "cart", heading: "CART", children: /* @__PURE__ */ jsx11(Suspense3, { fallback: /* @__PURE__ */ jsx11("p", { children: "Loading cart ..." }), children: /* @__PURE__ */ jsx11(Await3, { resolve: cart, children: (cart2) => /* @__PURE__ */ jsx11(CartMain, { cart: cart2, layout: "aside" }) }) }) });
}
function SearchAside() {
  let queriesDatalistId = useId();
  return /* @__PURE__ */ jsx11(Aside, { type: "search", heading: "SEARCH", children: /* @__PURE__ */ jsxs8("div", { className: "predictive-search", children: [
    /* @__PURE__ */ jsx11("br", {}),
    /* @__PURE__ */ jsx11(SearchFormPredictive, { children: ({ fetchResults, goToSearch, inputRef }) => /* @__PURE__ */ jsxs8(Fragment, { children: [
      /* @__PURE__ */ jsx11(
        "input",
        {
          name: "q",
          onChange: fetchResults,
          onFocus: fetchResults,
          placeholder: "Search",
          ref: inputRef,
          type: "search",
          list: queriesDatalistId
        }
      ),
      "\xA0",
      /* @__PURE__ */ jsx11("button", { onClick: goToSearch, children: "Search" })
    ] }) }),
    /* @__PURE__ */ jsx11(SearchResultsPredictive, { children: ({ items, total, term, state, closeSearch }) => {
      let { articles, collections, pages, products, queries } = items;
      return state === "loading" && term.current ? /* @__PURE__ */ jsx11("div", { children: "Loading..." }) : total ? /* @__PURE__ */ jsxs8(Fragment, { children: [
        /* @__PURE__ */ jsx11(
          SearchResultsPredictive.Queries,
          {
            queries,
            queriesDatalistId
          }
        ),
        /* @__PURE__ */ jsx11(
          SearchResultsPredictive.Products,
          {
            products,
            closeSearch,
            term
          }
        ),
        /* @__PURE__ */ jsx11(
          SearchResultsPredictive.Collections,
          {
            collections,
            closeSearch,
            term
          }
        ),
        /* @__PURE__ */ jsx11(
          SearchResultsPredictive.Pages,
          {
            pages,
            closeSearch,
            term
          }
        ),
        /* @__PURE__ */ jsx11(
          SearchResultsPredictive.Articles,
          {
            articles,
            closeSearch,
            term
          }
        ),
        term.current && total ? /* @__PURE__ */ jsx11(
          Link4,
          {
            onClick: closeSearch,
            to: `${SEARCH_ENDPOINT}?q=${term.current}`,
            children: /* @__PURE__ */ jsxs8("p", { children: [
              "View all results for ",
              /* @__PURE__ */ jsx11("q", { children: term.current }),
              "\xA0 \u2192"
            ] })
          }
        ) : null
      ] }) : /* @__PURE__ */ jsx11(SearchResultsPredictive.Empty, { term });
    } })
  ] }) });
}
function MobileMenuAside({ header, publicStoreDomain }) {
  return header.menu && header.shop.primaryDomain?.url && /* @__PURE__ */ jsx11(Aside, { type: "mobile", heading: "MENU", children: /* @__PURE__ */ jsx11(
    HeaderMenu,
    {
      menu: header.menu,
      viewport: "mobile",
      primaryDomainUrl: header.shop.primaryDomain.url,
      publicStoreDomain
    }
  ) });
}

// app/lib/fragments.js
var MENU_FRAGMENT = `#graphql
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
  fragment Menu on Menu {
    id
    items {
      ...ParentMenuItem
    }
  }
`, HEADER_QUERY = `#graphql
  fragment Shop on Shop {
    id
    name
    description
    primaryDomain {
      url
    }
    brand {
      logo {
        image {
          url
        }
      }
    }
  }
  query Header(
    $country: CountryCode
    $headerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    shop {
      ...Shop
    }
    menu(handle: $headerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
`, FOOTER_QUERY = `#graphql
  query Footer(
    $country: CountryCode
    $footerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    menu(handle: $footerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
`;

// app/root.jsx
import { jsx as jsx12, jsxs as jsxs9 } from "react/jsx-runtime";
var shouldRevalidate = ({
  formMethod,
  currentUrl,
  nextUrl,
  defaultShouldRevalidate
}) => formMethod && formMethod !== "GET" || currentUrl.toString() === nextUrl.toString() ? !0 : defaultShouldRevalidate;
function links() {
  return [
    { rel: "stylesheet", href: resetStyles },
    { rel: "stylesheet", href: appStyles },
    {
      rel: "preconnect",
      href: "https://cdn.shopify.com"
    },
    {
      rel: "preconnect",
      href: "https://shop.app"
    },
    { rel: "icon", type: "image/svg+xml", href: favicon_default }
  ];
}
async function loader(args) {
  let deferredData = loadDeferredData(args), criticalData = await loadCriticalData(args), { storefront, env } = args.context;
  return defer({
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: !1,
      // localize the privacy banner
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language
    }
  });
}
async function loadCriticalData({ context }) {
  let { storefront } = context, [header] = await Promise.all([
    storefront.query(HEADER_QUERY, {
      cache: storefront.CacheLong(),
      variables: {
        headerMenuHandle: "main-menu"
        // Adjust to your header menu handle
      }
    })
    // Add other queries here, so that they are loaded in parallel
  ]);
  return { header };
}
function loadDeferredData({ context }) {
  let { storefront, customerAccount, cart } = context, footer = storefront.query(FOOTER_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      footerMenuHandle: "footer"
      // Adjust to your footer menu handle
    }
  }).catch((error) => (console.error(error), null));
  return {
    cart: cart.get(),
    isLoggedIn: customerAccount.isLoggedIn(),
    footer
  };
}
function Layout({ children }) {
  let nonce = useNonce(), data = useRouteLoaderData("root");
  return /* @__PURE__ */ jsxs9("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs9("head", { children: [
      /* @__PURE__ */ jsx12("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx12("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx12(Meta, {}),
      /* @__PURE__ */ jsx12(Links, {})
    ] }),
    /* @__PURE__ */ jsxs9("body", { children: [
      data ? /* @__PURE__ */ jsx12(
        Analytics.Provider,
        {
          cart: data.cart,
          shop: data.shop,
          consent: data.consent,
          children: /* @__PURE__ */ jsx12(PageLayout, { ...data, children })
        }
      ) : children,
      /* @__PURE__ */ jsx12(ScrollRestoration, { nonce }),
      /* @__PURE__ */ jsx12(Scripts, { nonce })
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx12(Outlet, {});
}
function ErrorBoundary() {
  let error = useRouteError(), errorMessage = "Unknown error", errorStatus = 500;
  return isRouteErrorResponse(error) ? (errorMessage = error?.data?.message ?? error.data, errorStatus = error.status) : error instanceof Error && (errorMessage = error.message), /* @__PURE__ */ jsxs9("div", { className: "route-error", children: [
    /* @__PURE__ */ jsx12("h1", { children: "Oops" }),
    /* @__PURE__ */ jsx12("h2", { children: errorStatus }),
    errorMessage && /* @__PURE__ */ jsx12("fieldset", { children: /* @__PURE__ */ jsx12("pre", { children: errorMessage }) })
  ] });
}

// app/routes/blogs.$blogHandle.$articleHandle.jsx
var blogs_blogHandle_articleHandle_exports = {};
__export(blogs_blogHandle_articleHandle_exports, {
  default: () => Article,
  loader: () => loader2,
  meta: () => meta
});
import { defer as defer2 } from "@shopify/remix-oxygen";
import { useLoaderData } from "@remix-run/react";
import { Image as Image3 } from "@shopify/hydrogen";
import { jsx as jsx13, jsxs as jsxs10 } from "react/jsx-runtime";
var meta = ({ data }) => [{ title: `Hydrogen | ${data?.article.title ?? ""} article` }];
async function loader2(args) {
  let deferredData = loadDeferredData2(args), criticalData = await loadCriticalData2(args);
  return defer2({ ...deferredData, ...criticalData });
}
async function loadCriticalData2({ context, params }) {
  let { blogHandle, articleHandle } = params;
  if (!articleHandle || !blogHandle)
    throw new Response("Not found", { status: 404 });
  let [{ blog }] = await Promise.all([
    context.storefront.query(ARTICLE_QUERY, {
      variables: { blogHandle, articleHandle }
    })
    // Add other queries here, so that they are loaded in parallel
  ]);
  if (!blog?.articleByHandle)
    throw new Response(null, { status: 404 });
  return { article: blog.articleByHandle };
}
function loadDeferredData2({ context }) {
  return {};
}
function Article() {
  let { article } = useLoaderData(), { title, image, contentHtml, author } = article, publishedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(article.publishedAt));
  return /* @__PURE__ */ jsxs10("div", { className: "article", children: [
    /* @__PURE__ */ jsxs10("h1", { children: [
      title,
      /* @__PURE__ */ jsxs10("div", { children: [
        publishedDate,
        " \xB7 ",
        author?.name
      ] })
    ] }),
    image && /* @__PURE__ */ jsx13(Image3, { data: image, sizes: "90vw", loading: "eager" }),
    /* @__PURE__ */ jsx13(
      "div",
      {
        dangerouslySetInnerHTML: { __html: contentHtml },
        className: "article"
      }
    )
  ] });
}
var ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
`;

// app/routes/sitemap.$type.$page[.xml].jsx
var sitemap_type_page_xml_exports = {};
__export(sitemap_type_page_xml_exports, {
  loader: () => loader3
});
import { getSitemap } from "@shopify/hydrogen";
async function loader3({ request, params, context: { storefront } }) {
  let response = await getSitemap({
    storefront,
    request,
    params,
    locales: ["EN-US", "EN-CA", "FR-CA"],
    getLink: ({ type, baseUrl, handle, locale }) => locale ? `${baseUrl}/${locale}/${type}/${handle}` : `${baseUrl}/${type}/${handle}`
  });
  return response.headers.set("Cache-Control", `max-age=${60 * 60 * 24}`), response;
}

// app/routes/blogs.$blogHandle._index.jsx
var blogs_blogHandle_index_exports = {};
__export(blogs_blogHandle_index_exports, {
  default: () => Blog,
  loader: () => loader4,
  meta: () => meta2
});
import { defer as defer3 } from "@shopify/remix-oxygen";
import { Link as Link5, useLoaderData as useLoaderData2 } from "@remix-run/react";
import { Image as Image4, getPaginationVariables } from "@shopify/hydrogen";

// app/components/PaginatedResourceSection.jsx
import "react";
import { Pagination } from "@shopify/hydrogen";
import { jsx as jsx14, jsxs as jsxs11 } from "react/jsx-runtime";
function PaginatedResourceSection({
  connection,
  children,
  resourcesClassName
}) {
  return /* @__PURE__ */ jsx14(Pagination, { connection, children: ({ nodes, isLoading, PreviousLink, NextLink }) => {
    let resoucesMarkup = nodes.map(
      (node, index) => children({ node, index })
    );
    return /* @__PURE__ */ jsxs11("div", { children: [
      /* @__PURE__ */ jsx14(PreviousLink, { children: isLoading ? "Loading..." : /* @__PURE__ */ jsx14("span", { children: "\u2191 Load previous" }) }),
      resourcesClassName ? /* @__PURE__ */ jsx14("div", { className: resourcesClassName, children: resoucesMarkup }) : resoucesMarkup,
      /* @__PURE__ */ jsx14(NextLink, { children: isLoading ? "Loading..." : /* @__PURE__ */ jsx14("span", { children: "Load more \u2193" }) })
    ] });
  } });
}

// app/routes/blogs.$blogHandle._index.jsx
import { jsx as jsx15, jsxs as jsxs12 } from "react/jsx-runtime";
var meta2 = ({ data }) => [{ title: `Hydrogen | ${data?.blog.title ?? ""} blog` }];
async function loader4(args) {
  let deferredData = loadDeferredData3(args), criticalData = await loadCriticalData3(args);
  return defer3({ ...deferredData, ...criticalData });
}
async function loadCriticalData3({ context, request, params }) {
  let paginationVariables = getPaginationVariables(request, {
    pageBy: 4
  });
  if (!params.blogHandle)
    throw new Response("blog not found", { status: 404 });
  let [{ blog }] = await Promise.all([
    context.storefront.query(BLOGS_QUERY, {
      variables: {
        blogHandle: params.blogHandle,
        ...paginationVariables
      }
    })
    // Add other queries here, so that they are loaded in parallel
  ]);
  if (!blog?.articles)
    throw new Response("Not found", { status: 404 });
  return { blog };
}
function loadDeferredData3({ context }) {
  return {};
}
function Blog() {
  let { blog } = useLoaderData2(), { articles } = blog;
  return /* @__PURE__ */ jsxs12("div", { className: "blog", children: [
    /* @__PURE__ */ jsx15("h1", { children: blog.title }),
    /* @__PURE__ */ jsx15("div", { className: "blog-grid", children: /* @__PURE__ */ jsx15(PaginatedResourceSection, { connection: articles, children: ({ node: article, index }) => /* @__PURE__ */ jsx15(
      ArticleItem,
      {
        article,
        loading: index < 2 ? "eager" : "lazy"
      },
      article.id
    ) }) })
  ] });
}
function ArticleItem({ article, loading }) {
  let publishedAt = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(article.publishedAt));
  return /* @__PURE__ */ jsx15("div", { className: "blog-article", children: /* @__PURE__ */ jsxs12(Link5, { to: `/blogs/${article.blog.handle}/${article.handle}`, children: [
    article.image && /* @__PURE__ */ jsx15("div", { className: "blog-article-image", children: /* @__PURE__ */ jsx15(
      Image4,
      {
        alt: article.image.altText || article.title,
        aspectRatio: "3/2",
        data: article.image,
        loading,
        sizes: "(min-width: 768px) 50vw, 100vw"
      }
    ) }),
    /* @__PURE__ */ jsx15("h3", { children: article.title }),
    /* @__PURE__ */ jsx15("small", { children: publishedAt })
  ] }) }, article.id);
}
var BLOGS_QUERY = `#graphql
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
          startCursor
        }

      }
    }
  }
  fragment ArticleItem on Article {
    author: authorV2 {
      name
    }
    contentHtml
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
    blog {
      handle
    }
  }
`;

// app/routes/account.orders._index.jsx
var account_orders_index_exports = {};
__export(account_orders_index_exports, {
  default: () => Orders,
  loader: () => loader5,
  meta: () => meta3
});
import { Link as Link6, useLoaderData as useLoaderData3 } from "@remix-run/react";
import {
  Money as Money4,
  getPaginationVariables as getPaginationVariables2,
  flattenConnection
} from "@shopify/hydrogen";
import { json } from "@shopify/remix-oxygen";

// app/graphql/customer-account/CustomerOrdersQuery.js
var ORDER_ITEM_FRAGMENT = `#graphql
  fragment OrderItem on Order {
    totalPrice {
      amount
      currencyCode
    }
    financialStatus
    fulfillments(first: 1) {
      nodes {
        status
      }
    }
    id
    number
    processedAt
  }
`, CUSTOMER_ORDERS_FRAGMENT = `#graphql
  fragment CustomerOrders on Customer {
    orders(
      sortKey: PROCESSED_AT,
      reverse: true,
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...OrderItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
  ${ORDER_ITEM_FRAGMENT}
`, CUSTOMER_ORDERS_QUERY = `#graphql
  ${CUSTOMER_ORDERS_FRAGMENT}
  query CustomerOrders(
    $endCursor: String
    $first: Int
    $last: Int
    $startCursor: String
  ) {
    customer {
      ...CustomerOrders
    }
  }
`;

// app/routes/account.orders._index.jsx
import { Fragment as Fragment2, jsx as jsx16, jsxs as jsxs13 } from "react/jsx-runtime";
var meta3 = () => [{ title: "Orders" }];
async function loader5({ request, context }) {
  let paginationVariables = getPaginationVariables2(request, {
    pageBy: 20
  }), { data, errors } = await context.customerAccount.query(
    CUSTOMER_ORDERS_QUERY,
    {
      variables: {
        ...paginationVariables
      }
    }
  );
  if (errors?.length || !data?.customer)
    throw Error("Customer orders not found");
  return json({ customer: data.customer });
}
function Orders() {
  let { customer } = useLoaderData3(), { orders } = customer;
  return /* @__PURE__ */ jsx16("div", { className: "orders", children: orders.nodes.length ? /* @__PURE__ */ jsx16(OrdersTable, { orders }) : /* @__PURE__ */ jsx16(EmptyOrders, {}) });
}
function OrdersTable({ orders }) {
  return /* @__PURE__ */ jsx16("div", { className: "acccount-orders", children: orders?.nodes.length ? /* @__PURE__ */ jsx16(PaginatedResourceSection, { connection: orders, children: ({ node: order }) => /* @__PURE__ */ jsx16(OrderItem, { order }, order.id) }) : /* @__PURE__ */ jsx16(EmptyOrders, {}) });
}
function EmptyOrders() {
  return /* @__PURE__ */ jsxs13("div", { children: [
    /* @__PURE__ */ jsx16("p", { children: "You haven't placed any orders yet." }),
    /* @__PURE__ */ jsx16("br", {}),
    /* @__PURE__ */ jsx16("p", { children: /* @__PURE__ */ jsx16(Link6, { to: "/collections", children: "Start Shopping \u2192" }) })
  ] });
}
function OrderItem({ order }) {
  let fulfillmentStatus = flattenConnection(order.fulfillments)[0]?.status;
  return /* @__PURE__ */ jsxs13(Fragment2, { children: [
    /* @__PURE__ */ jsxs13("fieldset", { children: [
      /* @__PURE__ */ jsx16(Link6, { to: `/account/orders/${btoa(order.id)}`, children: /* @__PURE__ */ jsxs13("strong", { children: [
        "#",
        order.number
      ] }) }),
      /* @__PURE__ */ jsx16("p", { children: new Date(order.processedAt).toDateString() }),
      /* @__PURE__ */ jsx16("p", { children: order.financialStatus }),
      fulfillmentStatus && /* @__PURE__ */ jsx16("p", { children: fulfillmentStatus }),
      /* @__PURE__ */ jsx16(Money4, { data: order.totalPrice }),
      /* @__PURE__ */ jsx16(Link6, { to: `/account/orders/${btoa(order.id)}`, children: "View Order \u2192" })
    ] }),
    /* @__PURE__ */ jsx16("br", {})
  ] });
}

// app/routes/collections.$handle.jsx
var collections_handle_exports = {};
__export(collections_handle_exports, {
  default: () => Collection,
  loader: () => loader6,
  meta: () => meta4
});
import { defer as defer4, redirect } from "@shopify/remix-oxygen";
import { useLoaderData as useLoaderData4, Link as Link7 } from "@remix-run/react";
import {
  getPaginationVariables as getPaginationVariables3,
  Image as Image5,
  Money as Money5,
  Analytics as Analytics2
} from "@shopify/hydrogen";
import { jsx as jsx17, jsxs as jsxs14 } from "react/jsx-runtime";
var meta4 = ({ data }) => [{ title: `Hydrogen | ${data?.collection.title ?? ""} Collection` }];
async function loader6(args) {
  let deferredData = loadDeferredData4(args), criticalData = await loadCriticalData4(args);
  return defer4({ ...deferredData, ...criticalData });
}
async function loadCriticalData4({ context, params, request }) {
  let { handle } = params, { storefront } = context, paginationVariables = getPaginationVariables3(request, {
    pageBy: 8
  });
  if (!handle)
    throw redirect("/collections");
  let [{ collection }] = await Promise.all([
    storefront.query(COLLECTION_QUERY, {
      variables: { handle, ...paginationVariables }
      // Add other queries here, so that they are loaded in parallel
    })
  ]);
  if (!collection)
    throw new Response(`Collection ${handle} not found`, {
      status: 404
    });
  return {
    collection
  };
}
function loadDeferredData4({ context }) {
  return {};
}
function Collection() {
  let { collection } = useLoaderData4();
  return /* @__PURE__ */ jsxs14("div", { className: "collection", children: [
    /* @__PURE__ */ jsx17("h1", { children: collection.title }),
    /* @__PURE__ */ jsx17("p", { className: "collection-description", children: collection.description }),
    /* @__PURE__ */ jsx17(
      PaginatedResourceSection,
      {
        connection: collection.products,
        resourcesClassName: "products-grid",
        children: ({ node: product, index }) => /* @__PURE__ */ jsx17(
          ProductItem,
          {
            product,
            loading: index < 8 ? "eager" : void 0
          },
          product.id
        )
      }
    ),
    /* @__PURE__ */ jsx17(
      Analytics2.CollectionView,
      {
        data: {
          collection: {
            id: collection.id,
            handle: collection.handle
          }
        }
      }
    )
  ] });
}
function ProductItem({ product, loading }) {
  let variant = product.variants.nodes[0], variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return /* @__PURE__ */ jsxs14(
    Link7,
    {
      className: "product-item",
      prefetch: "intent",
      to: variantUrl,
      children: [
        product.featuredImage && /* @__PURE__ */ jsx17(
          Image5,
          {
            alt: product.featuredImage.altText || product.title,
            aspectRatio: "1/1",
            data: product.featuredImage,
            loading,
            sizes: "(min-width: 45em) 400px, 100vw"
          }
        ),
        /* @__PURE__ */ jsx17("h4", { children: product.title }),
        /* @__PURE__ */ jsx17("small", { children: /* @__PURE__ */ jsx17(Money5, { data: product.priceRange.minVariantPrice }) })
      ]
    },
    product.id
  );
}
var PRODUCT_ITEM_FRAGMENT = `#graphql
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
`, COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
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
`;

// app/routes/account.orders.$id.jsx
var account_orders_id_exports = {};
__export(account_orders_id_exports, {
  default: () => OrderRoute,
  loader: () => loader7,
  meta: () => meta5
});
import { json as json2, redirect as redirect2 } from "@shopify/remix-oxygen";
import { useLoaderData as useLoaderData5 } from "@remix-run/react";
import { Money as Money6, Image as Image6, flattenConnection as flattenConnection2 } from "@shopify/hydrogen";

// app/graphql/customer-account/CustomerOrderQuery.js
var CUSTOMER_ORDER_QUERY = `#graphql
  fragment OrderMoney on MoneyV2 {
    amount
    currencyCode
  }
  fragment DiscountApplication on DiscountApplication {
    value {
      __typename
      ... on MoneyV2 {
        ...OrderMoney
      }
      ... on PricingPercentageValue {
        percentage
      }
    }
  }
  fragment OrderLineItemFull on LineItem {
    id
    title
    quantity
    price {
      ...OrderMoney
    }
    discountAllocations {
      allocatedAmount {
        ...OrderMoney
      }
      discountApplication {
        ...DiscountApplication
      }
    }
    totalDiscount {
      ...OrderMoney
    }
    image {
      altText
      height
      url
      id
      width
    }
    variantTitle
  }
  fragment Order on Order {
    id
    name
    statusPageUrl
    processedAt
    fulfillments(first: 1) {
      nodes {
        status
      }
    }
    totalTax {
      ...OrderMoney
    }
    totalPrice {
      ...OrderMoney
    }
    subtotal {
      ...OrderMoney
    }
    shippingAddress {
      name
      formatted(withName: true)
      formattedArea
    }
    discountApplications(first: 100) {
      nodes {
        ...DiscountApplication
      }
    }
    lineItems(first: 100) {
      nodes {
        ...OrderLineItemFull
      }
    }
  }
  query Order($orderId: ID!) {
    order(id: $orderId) {
      ... on Order {
        ...Order
      }
    }
  }
`;

// app/routes/account.orders.$id.jsx
import { jsx as jsx18, jsxs as jsxs15 } from "react/jsx-runtime";
var meta5 = ({ data }) => [{ title: `Order ${data?.order?.name}` }];
async function loader7({ params, context }) {
  if (!params.id)
    return redirect2("/account/orders");
  let orderId = atob(params.id), { data, errors } = await context.customerAccount.query(
    CUSTOMER_ORDER_QUERY,
    {
      variables: { orderId }
    }
  );
  if (errors?.length || !data?.order)
    throw new Error("Order not found");
  let { order } = data, lineItems = flattenConnection2(order.lineItems), discountApplications = flattenConnection2(order.discountApplications), fulfillmentStatus = flattenConnection2(order.fulfillments)[0]?.status ?? "N/A", firstDiscount = discountApplications[0]?.value, discountValue = firstDiscount?.__typename === "MoneyV2" && firstDiscount, discountPercentage = firstDiscount?.__typename === "PricingPercentageValue" && firstDiscount?.percentage;
  return json2({
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus
  });
}
function OrderRoute() {
  let {
    order,
    lineItems,
    discountValue,
    discountPercentage,
    fulfillmentStatus
  } = useLoaderData5();
  return /* @__PURE__ */ jsxs15("div", { className: "account-order", children: [
    /* @__PURE__ */ jsxs15("h2", { children: [
      "Order ",
      order.name
    ] }),
    /* @__PURE__ */ jsxs15("p", { children: [
      "Placed on ",
      new Date(order.processedAt).toDateString()
    ] }),
    /* @__PURE__ */ jsx18("br", {}),
    /* @__PURE__ */ jsxs15("div", { children: [
      /* @__PURE__ */ jsxs15("table", { children: [
        /* @__PURE__ */ jsx18("thead", { children: /* @__PURE__ */ jsxs15("tr", { children: [
          /* @__PURE__ */ jsx18("th", { scope: "col", children: "Product" }),
          /* @__PURE__ */ jsx18("th", { scope: "col", children: "Price" }),
          /* @__PURE__ */ jsx18("th", { scope: "col", children: "Quantity" }),
          /* @__PURE__ */ jsx18("th", { scope: "col", children: "Total" })
        ] }) }),
        /* @__PURE__ */ jsx18("tbody", { children: lineItems.map((lineItem, lineItemIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ jsx18(OrderLineRow, { lineItem }, lineItemIndex)
        )) }),
        /* @__PURE__ */ jsxs15("tfoot", { children: [
          (discountValue && discountValue.amount || discountPercentage) && /* @__PURE__ */ jsxs15("tr", { children: [
            /* @__PURE__ */ jsx18("th", { scope: "row", colSpan: 3, children: /* @__PURE__ */ jsx18("p", { children: "Discounts" }) }),
            /* @__PURE__ */ jsx18("th", { scope: "row", children: /* @__PURE__ */ jsx18("p", { children: "Discounts" }) }),
            /* @__PURE__ */ jsx18("td", { children: discountPercentage ? /* @__PURE__ */ jsxs15("span", { children: [
              "-",
              discountPercentage,
              "% OFF"
            ] }) : discountValue && /* @__PURE__ */ jsx18(Money6, { data: discountValue }) })
          ] }),
          /* @__PURE__ */ jsxs15("tr", { children: [
            /* @__PURE__ */ jsx18("th", { scope: "row", colSpan: 3, children: /* @__PURE__ */ jsx18("p", { children: "Subtotal" }) }),
            /* @__PURE__ */ jsx18("th", { scope: "row", children: /* @__PURE__ */ jsx18("p", { children: "Subtotal" }) }),
            /* @__PURE__ */ jsx18("td", { children: /* @__PURE__ */ jsx18(Money6, { data: order.subtotal }) })
          ] }),
          /* @__PURE__ */ jsxs15("tr", { children: [
            /* @__PURE__ */ jsx18("th", { scope: "row", colSpan: 3, children: "Tax" }),
            /* @__PURE__ */ jsx18("th", { scope: "row", children: /* @__PURE__ */ jsx18("p", { children: "Tax" }) }),
            /* @__PURE__ */ jsx18("td", { children: /* @__PURE__ */ jsx18(Money6, { data: order.totalTax }) })
          ] }),
          /* @__PURE__ */ jsxs15("tr", { children: [
            /* @__PURE__ */ jsx18("th", { scope: "row", colSpan: 3, children: "Total" }),
            /* @__PURE__ */ jsx18("th", { scope: "row", children: /* @__PURE__ */ jsx18("p", { children: "Total" }) }),
            /* @__PURE__ */ jsx18("td", { children: /* @__PURE__ */ jsx18(Money6, { data: order.totalPrice }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs15("div", { children: [
        /* @__PURE__ */ jsx18("h3", { children: "Shipping Address" }),
        order?.shippingAddress ? /* @__PURE__ */ jsxs15("address", { children: [
          /* @__PURE__ */ jsx18("p", { children: order.shippingAddress.name }),
          order.shippingAddress.formatted ? /* @__PURE__ */ jsx18("p", { children: order.shippingAddress.formatted }) : "",
          order.shippingAddress.formattedArea ? /* @__PURE__ */ jsx18("p", { children: order.shippingAddress.formattedArea }) : ""
        ] }) : /* @__PURE__ */ jsx18("p", { children: "No shipping address defined" }),
        /* @__PURE__ */ jsx18("h3", { children: "Status" }),
        /* @__PURE__ */ jsx18("div", { children: /* @__PURE__ */ jsx18("p", { children: fulfillmentStatus }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx18("br", {}),
    /* @__PURE__ */ jsx18("p", { children: /* @__PURE__ */ jsx18("a", { target: "_blank", href: order.statusPageUrl, rel: "noreferrer", children: "View Order Status \u2192" }) })
  ] });
}
function OrderLineRow({ lineItem }) {
  return /* @__PURE__ */ jsxs15("tr", { children: [
    /* @__PURE__ */ jsx18("td", { children: /* @__PURE__ */ jsxs15("div", { children: [
      lineItem?.image && /* @__PURE__ */ jsx18("div", { children: /* @__PURE__ */ jsx18(Image6, { data: lineItem.image, width: 96, height: 96 }) }),
      /* @__PURE__ */ jsxs15("div", { children: [
        /* @__PURE__ */ jsx18("p", { children: lineItem.title }),
        /* @__PURE__ */ jsx18("small", { children: lineItem.variantTitle })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx18("td", { children: /* @__PURE__ */ jsx18(Money6, { data: lineItem.price }) }),
    /* @__PURE__ */ jsx18("td", { children: lineItem.quantity }),
    /* @__PURE__ */ jsx18("td", { children: /* @__PURE__ */ jsx18(Money6, { data: lineItem.totalDiscount }) })
  ] }, lineItem.id);
}

// app/routes/account_.authorize.jsx
var account_authorize_exports = {};
__export(account_authorize_exports, {
  loader: () => loader8
});
async function loader8({ context }) {
  return context.customerAccount.authorize();
}

// app/routes/collections._index.jsx
var collections_index_exports = {};
__export(collections_index_exports, {
  default: () => Collections,
  loader: () => loader9
});
import { useLoaderData as useLoaderData6, Link as Link8 } from "@remix-run/react";
import { defer as defer5 } from "@shopify/remix-oxygen";
import { getPaginationVariables as getPaginationVariables4, Image as Image7 } from "@shopify/hydrogen";
import { jsx as jsx19, jsxs as jsxs16 } from "react/jsx-runtime";
async function loader9(args) {
  let deferredData = loadDeferredData5(args), criticalData = await loadCriticalData5(args);
  return defer5({ ...deferredData, ...criticalData });
}
async function loadCriticalData5({ context, request }) {
  let paginationVariables = getPaginationVariables4(request, {
    pageBy: 4
  }), [{ collections }] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables
    })
    // Add other queries here, so that they are loaded in parallel
  ]);
  return { collections };
}
function loadDeferredData5({ context }) {
  return {};
}
function Collections() {
  let { collections } = useLoaderData6();
  return /* @__PURE__ */ jsxs16("div", { className: "collections", children: [
    /* @__PURE__ */ jsx19("h1", { children: "Collections" }),
    /* @__PURE__ */ jsx19(
      PaginatedResourceSection,
      {
        connection: collections,
        resourcesClassName: "collections-grid",
        children: ({ node: collection, index }) => /* @__PURE__ */ jsx19(
          CollectionItem,
          {
            collection,
            index
          },
          collection.id
        )
      }
    )
  ] });
}
function CollectionItem({ collection, index }) {
  return /* @__PURE__ */ jsxs16(
    Link8,
    {
      className: "collection-item",
      to: `/collections/${collection.handle}`,
      prefetch: "intent",
      children: [
        collection?.image && /* @__PURE__ */ jsx19(
          Image7,
          {
            alt: collection.image.altText || collection.title,
            aspectRatio: "1/1",
            data: collection.image,
            loading: index < 3 ? "eager" : void 0
          }
        ),
        /* @__PURE__ */ jsx19("h5", { children: collection.title })
      ]
    },
    collection.id
  );
}
var COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

// app/routes/account.addresses.jsx
var account_addresses_exports = {};
__export(account_addresses_exports, {
  AddressForm: () => AddressForm,
  action: () => action,
  default: () => Addresses,
  loader: () => loader10,
  meta: () => meta6
});
import { json as json3 } from "@shopify/remix-oxygen";
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext
} from "@remix-run/react";

// app/graphql/customer-account/CustomerAddressMutations.js
var UPDATE_ADDRESS_MUTATION = `#graphql
  mutation customerAddressUpdate(
    $address: CustomerAddressInput!
    $addressId: ID!
    $defaultAddress: Boolean
 ) {
    customerAddressUpdate(
      address: $address
      addressId: $addressId
      defaultAddress: $defaultAddress
    ) {
      customerAddress {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`, DELETE_ADDRESS_MUTATION = `#graphql
  mutation customerAddressDelete(
    $addressId: ID!,
  ) {
    customerAddressDelete(addressId: $addressId) {
      deletedAddressId
      userErrors {
        code
        field
        message
      }
    }
  }
`, CREATE_ADDRESS_MUTATION = `#graphql
  mutation customerAddressCreate(
    $address: CustomerAddressInput!
    $defaultAddress: Boolean
  ) {
    customerAddressCreate(
      address: $address
      defaultAddress: $defaultAddress
    ) {
      customerAddress {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

// app/routes/account.addresses.jsx
import { jsx as jsx20, jsxs as jsxs17 } from "react/jsx-runtime";
var meta6 = () => [{ title: "Addresses" }];
async function loader10({ context }) {
  return await context.customerAccount.handleAuthStatus(), json3({});
}
async function action({ request, context }) {
  let { customerAccount } = context;
  try {
    let form = await request.formData(), addressId = form.has("addressId") ? String(form.get("addressId")) : null;
    if (!addressId)
      throw new Error("You must provide an address id.");
    if (!await customerAccount.isLoggedIn())
      return json3(
        { error: { [addressId]: "Unauthorized" } },
        {
          status: 401
        }
      );
    let defaultAddress = form.has("defaultAddress") ? String(form.get("defaultAddress")) === "on" : !1, address = {}, keys = [
      "address1",
      "address2",
      "city",
      "company",
      "territoryCode",
      "firstName",
      "lastName",
      "phoneNumber",
      "zoneCode",
      "zip"
    ];
    for (let key of keys) {
      let value = form.get(key);
      typeof value == "string" && (address[key] = value);
    }
    switch (request.method) {
      case "POST":
        try {
          let { data, errors } = await customerAccount.mutate(
            CREATE_ADDRESS_MUTATION,
            {
              variables: { address, defaultAddress }
            }
          );
          if (errors?.length)
            throw new Error(errors[0].message);
          if (data?.customerAddressCreate?.userErrors?.length)
            throw new Error(data?.customerAddressCreate?.userErrors[0].message);
          if (!data?.customerAddressCreate?.customerAddress)
            throw new Error("Customer address create failed.");
          return json3({
            error: null,
            createdAddress: data?.customerAddressCreate?.customerAddress,
            defaultAddress
          });
        } catch (error) {
          return error instanceof Error ? json3(
            { error: { [addressId]: error.message } },
            {
              status: 400
            }
          ) : json3(
            { error: { [addressId]: error } },
            {
              status: 400
            }
          );
        }
      case "PUT":
        try {
          let { data, errors } = await customerAccount.mutate(
            UPDATE_ADDRESS_MUTATION,
            {
              variables: {
                address,
                addressId: decodeURIComponent(addressId),
                defaultAddress
              }
            }
          );
          if (errors?.length)
            throw new Error(errors[0].message);
          if (data?.customerAddressUpdate?.userErrors?.length)
            throw new Error(data?.customerAddressUpdate?.userErrors[0].message);
          if (!data?.customerAddressUpdate?.customerAddress)
            throw new Error("Customer address update failed.");
          return json3({
            error: null,
            updatedAddress: address,
            defaultAddress
          });
        } catch (error) {
          return error instanceof Error ? json3(
            { error: { [addressId]: error.message } },
            {
              status: 400
            }
          ) : json3(
            { error: { [addressId]: error } },
            {
              status: 400
            }
          );
        }
      case "DELETE":
        try {
          let { data, errors } = await customerAccount.mutate(
            DELETE_ADDRESS_MUTATION,
            {
              variables: { addressId: decodeURIComponent(addressId) }
            }
          );
          if (errors?.length)
            throw new Error(errors[0].message);
          if (data?.customerAddressDelete?.userErrors?.length)
            throw new Error(data?.customerAddressDelete?.userErrors[0].message);
          if (!data?.customerAddressDelete?.deletedAddressId)
            throw new Error("Customer address delete failed.");
          return json3({ error: null, deletedAddress: addressId });
        } catch (error) {
          return error instanceof Error ? json3(
            { error: { [addressId]: error.message } },
            {
              status: 400
            }
          ) : json3(
            { error: { [addressId]: error } },
            {
              status: 400
            }
          );
        }
      default:
        return json3(
          { error: { [addressId]: "Method not allowed" } },
          {
            status: 405
          }
        );
    }
  } catch (error) {
    return error instanceof Error ? json3(
      { error: error.message },
      {
        status: 400
      }
    ) : json3(
      { error },
      {
        status: 400
      }
    );
  }
}
function Addresses() {
  let { customer } = useOutletContext(), { defaultAddress, addresses } = customer;
  return /* @__PURE__ */ jsxs17("div", { className: "account-addresses", children: [
    /* @__PURE__ */ jsx20("h2", { children: "Addresses" }),
    /* @__PURE__ */ jsx20("br", {}),
    addresses.nodes.length ? /* @__PURE__ */ jsxs17("div", { children: [
      /* @__PURE__ */ jsxs17("div", { children: [
        /* @__PURE__ */ jsx20("legend", { children: "Create address" }),
        /* @__PURE__ */ jsx20(NewAddressForm, {})
      ] }),
      /* @__PURE__ */ jsx20("br", {}),
      /* @__PURE__ */ jsx20("hr", {}),
      /* @__PURE__ */ jsx20("br", {}),
      /* @__PURE__ */ jsx20(
        ExistingAddresses,
        {
          addresses,
          defaultAddress
        }
      )
    ] }) : /* @__PURE__ */ jsx20("p", { children: "You have no addresses saved." })
  ] });
}
function NewAddressForm() {
  return /* @__PURE__ */ jsx20(
    AddressForm,
    {
      addressId: "NEW_ADDRESS_ID",
      address: {
        address1: "",
        address2: "",
        city: "",
        company: "",
        territoryCode: "",
        firstName: "",
        id: "new",
        lastName: "",
        phoneNumber: "",
        zoneCode: "",
        zip: ""
      },
      defaultAddress: null,
      children: ({ stateForMethod }) => /* @__PURE__ */ jsx20("div", { children: /* @__PURE__ */ jsx20(
        "button",
        {
          disabled: stateForMethod("POST") !== "idle",
          formMethod: "POST",
          type: "submit",
          children: stateForMethod("POST") !== "idle" ? "Creating" : "Create"
        }
      ) })
    }
  );
}
function ExistingAddresses({ addresses, defaultAddress }) {
  return /* @__PURE__ */ jsxs17("div", { children: [
    /* @__PURE__ */ jsx20("legend", { children: "Existing addresses" }),
    addresses.nodes.map((address) => /* @__PURE__ */ jsx20(
      AddressForm,
      {
        addressId: address.id,
        address,
        defaultAddress,
        children: ({ stateForMethod }) => /* @__PURE__ */ jsxs17("div", { children: [
          /* @__PURE__ */ jsx20(
            "button",
            {
              disabled: stateForMethod("PUT") !== "idle",
              formMethod: "PUT",
              type: "submit",
              children: stateForMethod("PUT") !== "idle" ? "Saving" : "Save"
            }
          ),
          /* @__PURE__ */ jsx20(
            "button",
            {
              disabled: stateForMethod("DELETE") !== "idle",
              formMethod: "DELETE",
              type: "submit",
              children: stateForMethod("DELETE") !== "idle" ? "Deleting" : "Delete"
            }
          )
        ] })
      },
      address.id
    ))
  ] });
}
function AddressForm({ addressId, address, defaultAddress, children }) {
  let { state, formMethod } = useNavigation(), error = useActionData()?.error?.[addressId], isDefaultAddress = defaultAddress?.id === addressId;
  return /* @__PURE__ */ jsx20(Form, { id: addressId, children: /* @__PURE__ */ jsxs17("fieldset", { children: [
    /* @__PURE__ */ jsx20("input", { type: "hidden", name: "addressId", defaultValue: addressId }),
    /* @__PURE__ */ jsx20("label", { htmlFor: "firstName", children: "First name*" }),
    /* @__PURE__ */ jsx20(
      "input",
      {
        "aria-label": "First name",
        autoComplete: "given-name",
        defaultValue: address?.firstName ?? "",
        id: "firstName",
        name: "firstName",
        placeholder: "First name",
        required: !0,
        type: "text"
      }
    ),
    /* @__PURE__ */ jsx20("label", { htmlFor: "lastName", children: "Last name*" }),
    /* @__PURE__ */ jsx20(
      "input",
      {
        "aria-label": "Last name",
        autoComplete: "family-name",
        defaultValue: address?.lastName ?? "",
        id: "lastName",
        name: "lastName",
        placeholder: "Last name",
        required: !0,
        type: "text"
      }
    ),
    /* @__PURE__ */ jsx20("label", { htmlFor: "company", children: "Company" }),
    /* @__PURE__ */ jsx20(
      "input",
      {
        "aria-label": "Company",
        autoComplete: "organization",
        defaultValue: address?.company ?? "",
        id: "company",
        name: "company",
        placeholder: "Company",
        type: "text"
      }
    ),
    /* @__PURE__ */ jsx20("label", { htmlFor: "address1", children: "Address line*" }),
    /* @__PURE__ */ jsx20(
      "input",
      {
        "aria-label": "Address line 1",
        autoComplete: "address-line1",
        defaultValue: address?.address1 ?? "",
        id: "address1",
        name: "address1",
        placeholder: "Address line 1*",
        required: !0,
        type: "text"
      }
    ),
    /* @__PURE__ */ jsx20("label", { htmlFor: "address2", children: "Address line 2" }),
    /* @__PURE__ */ jsx20(
      "input",
      {
        "aria-label": "Address line 2",
        autoComplete: "address-line2",
        defaultValue: address?.address2 ?? "",
        id: "address2",
        name: "address2",
        placeholder: "Address line 2",
        type: "text"
      }
    ),
    /* @__PURE__ */ jsx20("label", { htmlFor: "city", children: "City*" }),
    /* @__PURE__ */ jsx20(
      "input",
      {
        "aria-label": "City",
        autoComplete: "address-level2",
        defaultValue: address?.city ?? "",
        id: "city",
        name: "city",
        placeholder: "City",
        required: !0,
        type: "text"
      }
    ),
    /* @__PURE__ */ jsx20("label", { htmlFor: "zoneCode", children: "State / Province*" }),
    /* @__PURE__ */ jsx20(
      "input",
      {
        "aria-label": "State/Province",
        autoComplete: "address-level1",
        defaultValue: address?.zoneCode ?? "",
        id: "zoneCode",
        name: "zoneCode",
        placeholder: "State / Province",
        required: !0,
        type: "text"
      }
    ),
    /* @__PURE__ */ jsx20("label", { htmlFor: "zip", children: "Zip / Postal Code*" }),
    /* @__PURE__ */ jsx20(
      "input",
      {
        "aria-label": "Zip",
        autoComplete: "postal-code",
        defaultValue: address?.zip ?? "",
        id: "zip",
        name: "zip",
        placeholder: "Zip / Postal Code",
        required: !0,
        type: "text"
      }
    ),
    /* @__PURE__ */ jsx20("label", { htmlFor: "territoryCode", children: "Country Code*" }),
    /* @__PURE__ */ jsx20(
      "input",
      {
        "aria-label": "territoryCode",
        autoComplete: "country",
        defaultValue: address?.territoryCode ?? "",
        id: "territoryCode",
        name: "territoryCode",
        placeholder: "Country",
        required: !0,
        type: "text",
        maxLength: 2
      }
    ),
    /* @__PURE__ */ jsx20("label", { htmlFor: "phoneNumber", children: "Phone" }),
    /* @__PURE__ */ jsx20(
      "input",
      {
        "aria-label": "Phone Number",
        autoComplete: "tel",
        defaultValue: address?.phoneNumber ?? "",
        id: "phoneNumber",
        name: "phoneNumber",
        placeholder: "+16135551111",
        pattern: "^\\+?[1-9]\\d{3,14}$",
        type: "tel"
      }
    ),
    /* @__PURE__ */ jsxs17("div", { children: [
      /* @__PURE__ */ jsx20(
        "input",
        {
          defaultChecked: isDefaultAddress,
          id: "defaultAddress",
          name: "defaultAddress",
          type: "checkbox"
        }
      ),
      /* @__PURE__ */ jsx20("label", { htmlFor: "defaultAddress", children: "Set as default address" })
    ] }),
    error ? /* @__PURE__ */ jsx20("p", { children: /* @__PURE__ */ jsx20("mark", { children: /* @__PURE__ */ jsx20("small", { children: error }) }) }) : /* @__PURE__ */ jsx20("br", {}),
    children({
      stateForMethod: (method) => formMethod === method ? state : "idle"
    })
  ] }) });
}

// app/routes/policies.$handle.jsx
var policies_handle_exports = {};
__export(policies_handle_exports, {
  default: () => Policy,
  loader: () => loader11,
  meta: () => meta7
});
import { json as json4 } from "@shopify/remix-oxygen";
import { Link as Link9, useLoaderData as useLoaderData7 } from "@remix-run/react";
import { jsx as jsx21, jsxs as jsxs18 } from "react/jsx-runtime";
var meta7 = ({ data }) => [{ title: `Hydrogen | ${data?.policy.title ?? ""}` }];
async function loader11({ params, context }) {
  if (!params.handle)
    throw new Response("No handle was passed in", { status: 404 });
  let policyName = params.handle.replace(
    /-([a-z])/g,
    (_, m1) => m1.toUpperCase()
  ), policy = (await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: !1,
      shippingPolicy: !1,
      termsOfService: !1,
      refundPolicy: !1,
      [policyName]: !0,
      language: context.storefront.i18n?.language
    }
  })).shop?.[policyName];
  if (!policy)
    throw new Response("Could not find the policy", { status: 404 });
  return json4({ policy });
}
function Policy() {
  let { policy } = useLoaderData7();
  return /* @__PURE__ */ jsxs18("div", { className: "policy", children: [
    /* @__PURE__ */ jsx21("br", {}),
    /* @__PURE__ */ jsx21("br", {}),
    /* @__PURE__ */ jsx21("div", { children: /* @__PURE__ */ jsx21(Link9, { to: "/policies", children: "\u2190 Back to Policies" }) }),
    /* @__PURE__ */ jsx21("br", {}),
    /* @__PURE__ */ jsx21("h1", { children: policy.title }),
    /* @__PURE__ */ jsx21("div", { dangerouslySetInnerHTML: { __html: policy.body } })
  ] });
}
var POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
    }
  }
`;

// app/routes/products.$handle.jsx
var products_handle_exports = {};
__export(products_handle_exports, {
  default: () => Product,
  loader: () => loader12,
  meta: () => meta8
});
import { Suspense as Suspense4 } from "react";
import { defer as defer6, redirect as redirect3 } from "@shopify/remix-oxygen";
import { Await as Await4, useLoaderData as useLoaderData8 } from "@remix-run/react";
import {
  getSelectedProductOptions,
  Analytics as Analytics3,
  useOptimisticVariant
} from "@shopify/hydrogen";

// app/components/ProductImage.jsx
import { Image as Image8 } from "@shopify/hydrogen";
import { jsx as jsx22 } from "react/jsx-runtime";
function ProductImage({ image }) {
  return image ? /* @__PURE__ */ jsx22("div", { className: "product-image", children: /* @__PURE__ */ jsx22(
    Image8,
    {
      alt: image.altText || "Product Image",
      aspectRatio: "1/1",
      data: image,
      sizes: "(min-width: 45em) 50vw, 100vw"
    },
    image.id
  ) }) : /* @__PURE__ */ jsx22("div", { className: "product-image" });
}

// app/components/ProductForm.jsx
import { Link as Link10 } from "@remix-run/react";
import { VariantSelector } from "@shopify/hydrogen";

// app/components/AddToCartButton.jsx
import { CartForm as CartForm3 } from "@shopify/hydrogen";
import { Fragment as Fragment3, jsx as jsx23, jsxs as jsxs19 } from "react/jsx-runtime";
function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick
}) {
  return /* @__PURE__ */ jsx23(CartForm3, { route: "/cart", inputs: { lines }, action: CartForm3.ACTIONS.LinesAdd, children: (fetcher) => /* @__PURE__ */ jsxs19(Fragment3, { children: [
    /* @__PURE__ */ jsx23(
      "input",
      {
        name: "analytics",
        type: "hidden",
        value: JSON.stringify(analytics)
      }
    ),
    /* @__PURE__ */ jsx23(
      "button",
      {
        type: "submit",
        onClick,
        disabled: disabled ?? fetcher.state !== "idle",
        children
      }
    )
  ] }) });
}

// app/components/ProductForm.jsx
import { jsx as jsx24, jsxs as jsxs20 } from "react/jsx-runtime";
function ProductForm({ product, selectedVariant, variants }) {
  let { open } = useAside();
  return /* @__PURE__ */ jsxs20("div", { className: "product-form", children: [
    /* @__PURE__ */ jsx24(
      VariantSelector,
      {
        handle: product.handle,
        options: product.options.filter(
          (option) => option.optionValues.length > 1
        ),
        variants,
        children: ({ option }) => /* @__PURE__ */ jsx24(ProductOptions, { option }, option.name)
      }
    ),
    /* @__PURE__ */ jsx24("br", {}),
    /* @__PURE__ */ jsx24(
      AddToCartButton,
      {
        disabled: !selectedVariant || !selectedVariant.availableForSale,
        onClick: () => {
          open("cart");
        },
        lines: selectedVariant ? [
          {
            merchandiseId: selectedVariant.id,
            quantity: 1,
            selectedVariant
          }
        ] : [],
        children: selectedVariant?.availableForSale ? "Add to cart" : "Sold out"
      }
    )
  ] });
}
function ProductOptions({ option }) {
  return /* @__PURE__ */ jsxs20("div", { className: "product-options", children: [
    /* @__PURE__ */ jsx24("h5", { children: option.name }),
    /* @__PURE__ */ jsx24("div", { className: "product-options-grid", children: option.values.map(({ value, isAvailable, isActive, to }) => /* @__PURE__ */ jsx24(
      Link10,
      {
        className: "product-options-item",
        prefetch: "intent",
        preventScrollReset: !0,
        replace: !0,
        to,
        style: {
          border: isActive ? "1px solid black" : "1px solid transparent",
          opacity: isAvailable ? 1 : 0.3
        },
        children: value
      },
      option.name + value
    )) }),
    /* @__PURE__ */ jsx24("br", {})
  ] }, option.name);
}

// app/routes/products.$handle.jsx
import { jsx as jsx25, jsxs as jsxs21 } from "react/jsx-runtime";
var meta8 = ({ data }) => [{ title: `Hydrogen | ${data?.product.title ?? ""}` }];
async function loader12(args) {
  let deferredData = loadDeferredData6(args), criticalData = await loadCriticalData6(args);
  return defer6({ ...deferredData, ...criticalData });
}
async function loadCriticalData6({ context, params, request }) {
  let { handle } = params, { storefront } = context;
  if (!handle)
    throw new Error("Expected product handle to be defined");
  let [{ product }] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: { handle, selectedOptions: getSelectedProductOptions(request) }
    })
    // Add other queries here, so that they are loaded in parallel
  ]);
  if (!product?.id)
    throw new Response(null, { status: 404 });
  let firstVariant = product.variants.nodes[0];
  if (Boolean(
    firstVariant.selectedOptions.find(
      (option) => option.name === "Title" && option.value === "Default Title"
    )
  ))
    product.selectedVariant = firstVariant;
  else if (!product.selectedVariant)
    throw redirectToFirstVariant({ product, request });
  return {
    product
  };
}
function loadDeferredData6({ context, params }) {
  return {
    variants: context.storefront.query(VARIANTS_QUERY, {
      variables: { handle: params.handle }
    }).catch((error) => (console.error(error), null))
  };
}
function redirectToFirstVariant({ product, request }) {
  let url = new URL(request.url), firstVariant = product.variants.nodes[0];
  return redirect3(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search)
    }),
    {
      status: 302
    }
  );
}
function Product() {
  let { product, variants } = useLoaderData8(), selectedVariant = useOptimisticVariant(
    product.selectedVariant,
    variants
  ), { title, descriptionHtml } = product;
  return /* @__PURE__ */ jsxs21("div", { className: "product", children: [
    /* @__PURE__ */ jsx25(ProductImage, { image: selectedVariant?.image }),
    /* @__PURE__ */ jsxs21("div", { className: "product-main", children: [
      /* @__PURE__ */ jsx25("h1", { children: title }),
      /* @__PURE__ */ jsx25(
        ProductPrice,
        {
          price: selectedVariant?.price,
          compareAtPrice: selectedVariant?.compareAtPrice
        }
      ),
      /* @__PURE__ */ jsx25("br", {}),
      /* @__PURE__ */ jsx25(
        Suspense4,
        {
          fallback: /* @__PURE__ */ jsx25(
            ProductForm,
            {
              product,
              selectedVariant,
              variants: []
            }
          ),
          children: /* @__PURE__ */ jsx25(
            Await4,
            {
              errorElement: "There was a problem loading product variants",
              resolve: variants,
              children: (data) => /* @__PURE__ */ jsx25(
                ProductForm,
                {
                  product,
                  selectedVariant,
                  variants: data?.product?.variants.nodes || []
                }
              )
            }
          )
        }
      ),
      /* @__PURE__ */ jsx25("br", {}),
      /* @__PURE__ */ jsx25("br", {}),
      /* @__PURE__ */ jsx25("p", { children: /* @__PURE__ */ jsx25("strong", { children: "Description" }) }),
      /* @__PURE__ */ jsx25("br", {}),
      /* @__PURE__ */ jsx25("div", { dangerouslySetInnerHTML: { __html: descriptionHtml } }),
      /* @__PURE__ */ jsx25("br", {})
    ] }),
    /* @__PURE__ */ jsx25(
      Analytics3.ProductView,
      {
        data: {
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || "0",
              vendor: product.vendor,
              variantId: selectedVariant?.id || "",
              variantTitle: selectedVariant?.title || "",
              quantity: 1
            }
          ]
        }
      }
    )
  ] });
}
var PRODUCT_VARIANT_FRAGMENT = `#graphql
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
`, PRODUCT_FRAGMENT = `#graphql
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
  ${PRODUCT_VARIANT_FRAGMENT}
`, PRODUCT_QUERY = `#graphql
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
  ${PRODUCT_FRAGMENT}
`, PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`, VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`;

// app/routes/account.profile.jsx
var account_profile_exports = {};
__export(account_profile_exports, {
  action: () => action2,
  default: () => AccountProfile,
  loader: () => loader13,
  meta: () => meta9
});

// app/graphql/customer-account/CustomerUpdateMutation.js
var CUSTOMER_UPDATE_MUTATION = `#graphql
  # https://shopify.dev/docs/api/customer/latest/mutations/customerUpdate
  mutation customerUpdate(
    $customer: CustomerUpdateInput!
  ){
    customerUpdate(input: $customer) {
      customer {
        firstName
        lastName
        emailAddress {
          emailAddress
        }
        phoneNumber {
          phoneNumber
        }
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

// app/routes/account.profile.jsx
import { json as json5 } from "@shopify/remix-oxygen";
import {
  Form as Form2,
  useActionData as useActionData2,
  useNavigation as useNavigation2,
  useOutletContext as useOutletContext2
} from "@remix-run/react";
import { jsx as jsx26, jsxs as jsxs22 } from "react/jsx-runtime";
var meta9 = () => [{ title: "Profile" }];
async function loader13({ context }) {
  return await context.customerAccount.handleAuthStatus(), json5({});
}
async function action2({ request, context }) {
  let { customerAccount } = context;
  if (request.method !== "PUT")
    return json5({ error: "Method not allowed" }, { status: 405 });
  let form = await request.formData();
  try {
    let customer = {}, validInputKeys = ["firstName", "lastName"];
    for (let [key, value] of form.entries())
      validInputKeys.includes(key) && typeof value == "string" && value.length && (customer[key] = value);
    let { data, errors } = await customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer
        }
      }
    );
    if (errors?.length)
      throw new Error(errors[0].message);
    if (!data?.customerUpdate?.customer)
      throw new Error("Customer profile update failed.");
    return json5({
      error: null,
      customer: data?.customerUpdate?.customer
    });
  } catch (error) {
    return json5(
      { error: error.message, customer: null },
      {
        status: 400
      }
    );
  }
}
function AccountProfile() {
  let account = useOutletContext2(), { state } = useNavigation2(), action5 = useActionData2(), customer = action5?.customer ?? account?.customer;
  return /* @__PURE__ */ jsxs22("div", { className: "account-profile", children: [
    /* @__PURE__ */ jsx26("h2", { children: "My profile" }),
    /* @__PURE__ */ jsx26("br", {}),
    /* @__PURE__ */ jsxs22(Form2, { method: "PUT", children: [
      /* @__PURE__ */ jsx26("legend", { children: "Personal information" }),
      /* @__PURE__ */ jsxs22("fieldset", { children: [
        /* @__PURE__ */ jsx26("label", { htmlFor: "firstName", children: "First name" }),
        /* @__PURE__ */ jsx26(
          "input",
          {
            id: "firstName",
            name: "firstName",
            type: "text",
            autoComplete: "given-name",
            placeholder: "First name",
            "aria-label": "First name",
            defaultValue: customer.firstName ?? "",
            minLength: 2
          }
        ),
        /* @__PURE__ */ jsx26("label", { htmlFor: "lastName", children: "Last name" }),
        /* @__PURE__ */ jsx26(
          "input",
          {
            id: "lastName",
            name: "lastName",
            type: "text",
            autoComplete: "family-name",
            placeholder: "Last name",
            "aria-label": "Last name",
            defaultValue: customer.lastName ?? "",
            minLength: 2
          }
        )
      ] }),
      action5?.error ? /* @__PURE__ */ jsx26("p", { children: /* @__PURE__ */ jsx26("mark", { children: /* @__PURE__ */ jsx26("small", { children: action5.error }) }) }) : /* @__PURE__ */ jsx26("br", {}),
      /* @__PURE__ */ jsx26("button", { type: "submit", disabled: state !== "idle", children: state !== "idle" ? "Updating" : "Update" })
    ] })
  ] });
}

// app/routes/account_.logout.jsx
var account_logout_exports = {};
__export(account_logout_exports, {
  action: () => action3,
  loader: () => loader14
});
import { redirect as redirect4 } from "@shopify/remix-oxygen";
async function loader14() {
  return redirect4("/");
}
async function action3({ context }) {
  return context.customerAccount.logout();
}

// app/routes/collections.all.jsx
var collections_all_exports = {};
__export(collections_all_exports, {
  default: () => Collection2,
  loader: () => loader15,
  meta: () => meta10
});
import { defer as defer7 } from "@shopify/remix-oxygen";
import { useLoaderData as useLoaderData9, Link as Link11 } from "@remix-run/react";
import { getPaginationVariables as getPaginationVariables5, Image as Image9, Money as Money7 } from "@shopify/hydrogen";
import { jsx as jsx27, jsxs as jsxs23 } from "react/jsx-runtime";
var meta10 = () => [{ title: "Hydrogen | Products" }];
async function loader15(args) {
  let deferredData = loadDeferredData7(args), criticalData = await loadCriticalData7(args);
  return defer7({ ...deferredData, ...criticalData });
}
async function loadCriticalData7({ context, request }) {
  let { storefront } = context, paginationVariables = getPaginationVariables5(request, {
    pageBy: 8
  }), [{ products }] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: { ...paginationVariables }
    })
    // Add other queries here, so that they are loaded in parallel
  ]);
  return { products };
}
function loadDeferredData7({ context }) {
  return {};
}
function Collection2() {
  let { products } = useLoaderData9();
  return /* @__PURE__ */ jsxs23("div", { className: "collection", children: [
    /* @__PURE__ */ jsx27("h1", { children: "Products" }),
    /* @__PURE__ */ jsx27(
      PaginatedResourceSection,
      {
        connection: products,
        resourcesClassName: "products-grid",
        children: ({ node: product, index }) => /* @__PURE__ */ jsx27(
          ProductItem2,
          {
            product,
            loading: index < 8 ? "eager" : void 0
          },
          product.id
        )
      }
    )
  ] });
}
function ProductItem2({ product, loading }) {
  let variant = product.variants.nodes[0], variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return /* @__PURE__ */ jsxs23(
    Link11,
    {
      className: "product-item",
      prefetch: "intent",
      to: variantUrl,
      children: [
        product.featuredImage && /* @__PURE__ */ jsx27(
          Image9,
          {
            alt: product.featuredImage.altText || product.title,
            aspectRatio: "1/1",
            data: product.featuredImage,
            loading,
            sizes: "(min-width: 45em) 400px, 100vw"
          }
        ),
        /* @__PURE__ */ jsx27("h4", { children: product.title }),
        /* @__PURE__ */ jsx27("small", { children: /* @__PURE__ */ jsx27(Money7, { data: product.priceRange.minVariantPrice }) })
      ]
    },
    product.id
  );
}
var PRODUCT_ITEM_FRAGMENT2 = `#graphql
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
`, CATALOG_QUERY = `#graphql
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
  ${PRODUCT_ITEM_FRAGMENT2}
`;

// app/routes/policies._index.jsx
var policies_index_exports = {};
__export(policies_index_exports, {
  default: () => Policies,
  loader: () => loader16
});
import { json as json6 } from "@shopify/remix-oxygen";
import { useLoaderData as useLoaderData10, Link as Link12 } from "@remix-run/react";
import { jsx as jsx28, jsxs as jsxs24 } from "react/jsx-runtime";
async function loader16({ context }) {
  let data = await context.storefront.query(POLICIES_QUERY), policies = Object.values(data.shop || {});
  if (!policies.length)
    throw new Response("No policies found", { status: 404 });
  return json6({ policies });
}
function Policies() {
  let { policies } = useLoaderData10();
  return /* @__PURE__ */ jsxs24("div", { className: "policies", children: [
    /* @__PURE__ */ jsx28("h1", { children: "Policies" }),
    /* @__PURE__ */ jsx28("div", { children: policies.map((policy) => policy ? /* @__PURE__ */ jsx28("fieldset", { children: /* @__PURE__ */ jsx28(Link12, { to: `/policies/${policy.handle}`, children: policy.title }) }, policy.id) : null) })
  ] });
}
var POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy {
        ...PolicyItem
      }
      shippingPolicy {
        ...PolicyItem
      }
      termsOfService {
        ...PolicyItem
      }
      refundPolicy {
        ...PolicyItem
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
`;

// app/routes/account._index.jsx
var account_index_exports = {};
__export(account_index_exports, {
  loader: () => loader17
});
import { redirect as redirect5 } from "@shopify/remix-oxygen";
async function loader17() {
  return redirect5("/account/orders");
}

// app/routes/account_.login.jsx
var account_login_exports = {};
__export(account_login_exports, {
  loader: () => loader18
});
async function loader18({ request, context }) {
  return context.customerAccount.login();
}

// app/routes/discount.$code.jsx
var discount_code_exports = {};
__export(discount_code_exports, {
  loader: () => loader19
});
import { redirect as redirect6 } from "@shopify/remix-oxygen";
async function loader19({ request, context, params }) {
  let { cart } = context, { code } = params, url = new URL(request.url), searchParams = new URLSearchParams(url.search), redirectParam = searchParams.get("redirect") || searchParams.get("return_to") || "/";
  redirectParam.includes("//") && (redirectParam = "/"), searchParams.delete("redirect"), searchParams.delete("return_to");
  let redirectUrl = `${redirectParam}?${searchParams}`;
  if (!code)
    return redirect6(redirectUrl);
  let result = await cart.updateDiscountCodes([code]), headers = cart.setCartId(result.cart.id);
  return redirect6(redirectUrl, {
    status: 303,
    headers
  });
}

// app/routes/pages.$handle.jsx
var pages_handle_exports = {};
__export(pages_handle_exports, {
  default: () => Page,
  loader: () => loader20,
  meta: () => meta11
});
import { defer as defer8 } from "@shopify/remix-oxygen";
import { useLoaderData as useLoaderData11 } from "@remix-run/react";
import { jsx as jsx29, jsxs as jsxs25 } from "react/jsx-runtime";
var meta11 = ({ data }) => [{ title: `Hydrogen | ${data?.page.title ?? ""}` }];
async function loader20(args) {
  let deferredData = loadDeferredData8(args), criticalData = await loadCriticalData8(args);
  return defer8({ ...deferredData, ...criticalData });
}
async function loadCriticalData8({ context, params }) {
  if (!params.handle)
    throw new Error("Missing page handle");
  let [{ page }] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {
        handle: params.handle
      }
    })
    // Add other queries here, so that they are loaded in parallel
  ]);
  if (!page)
    throw new Response("Not Found", { status: 404 });
  return {
    page
  };
}
function loadDeferredData8({ context }) {
  return {};
}
function Page() {
  let { page } = useLoaderData11();
  return /* @__PURE__ */ jsxs25("div", { className: "page", children: [
    /* @__PURE__ */ jsx29("header", { children: /* @__PURE__ */ jsx29("h1", { children: page.title }) }),
    /* @__PURE__ */ jsx29("main", { dangerouslySetInnerHTML: { __html: page.body } })
  ] });
}
var PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;

// app/routes/[sitemap.xml].jsx
var sitemap_xml_exports = {};
__export(sitemap_xml_exports, {
  loader: () => loader21
});
import { getSitemapIndex } from "@shopify/hydrogen";
async function loader21({ request, context: { storefront } }) {
  let response = await getSitemapIndex({
    storefront,
    request
  });
  return response.headers.set("Cache-Control", `max-age=${60 * 60 * 24}`), response;
}

// app/routes/blogs._index.jsx
var blogs_index_exports = {};
__export(blogs_index_exports, {
  default: () => Blogs,
  loader: () => loader22,
  meta: () => meta12
});
import { defer as defer9 } from "@shopify/remix-oxygen";
import { Link as Link13, useLoaderData as useLoaderData12 } from "@remix-run/react";
import { getPaginationVariables as getPaginationVariables6 } from "@shopify/hydrogen";
import { jsx as jsx30, jsxs as jsxs26 } from "react/jsx-runtime";
var meta12 = () => [{ title: "Hydrogen | Blogs" }];
async function loader22(args) {
  let deferredData = loadDeferredData9(args), criticalData = await loadCriticalData9(args);
  return defer9({ ...deferredData, ...criticalData });
}
async function loadCriticalData9({ context, request }) {
  let paginationVariables = getPaginationVariables6(request, {
    pageBy: 10
  }), [{ blogs }] = await Promise.all([
    context.storefront.query(BLOGS_QUERY2, {
      variables: {
        ...paginationVariables
      }
    })
    // Add other queries here, so that they are loaded in parallel
  ]);
  return { blogs };
}
function loadDeferredData9({ context }) {
  return {};
}
function Blogs() {
  let { blogs } = useLoaderData12();
  return /* @__PURE__ */ jsxs26("div", { className: "blogs", children: [
    /* @__PURE__ */ jsx30("h1", { children: "Blogs" }),
    /* @__PURE__ */ jsx30("div", { className: "blogs-grid", children: /* @__PURE__ */ jsx30(PaginatedResourceSection, { connection: blogs, children: ({ node: blog }) => /* @__PURE__ */ jsx30(
      Link13,
      {
        className: "blog",
        prefetch: "intent",
        to: `/blogs/${blog.handle}`,
        children: /* @__PURE__ */ jsx30("h2", { children: blog.title })
      },
      blog.handle
    ) }) })
  ] });
}
var BLOGS_QUERY2 = `#graphql
  query Blogs(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    blogs(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        title
        handle
        seo {
          title
          description
        }
      }
    }
  }
`;

// app/routes/[robots.txt].jsx
var robots_txt_exports = {};
__export(robots_txt_exports, {
  loader: () => loader23
});
import { parseGid } from "@shopify/hydrogen";
async function loader23({ request, context }) {
  let url = new URL(request.url), { shop } = await context.storefront.query(ROBOTS_QUERY), shopId = parseGid(shop.id).id, body = robotsTxtData({ url: url.origin, shopId });
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": `max-age=${60 * 60 * 24}`
    }
  });
}
function robotsTxtData({ url, shopId }) {
  let sitemapUrl = url ? `${url}/sitemap.xml` : void 0;
  return `
User-agent: *
${generalDisallowRules({ sitemapUrl, shopId })}

# Google adsbot ignores robots.txt unless specifically named!
User-agent: adsbot-google
Disallow: /checkouts/
Disallow: /checkout
Disallow: /carts
Disallow: /orders
${shopId ? `Disallow: /${shopId}/checkouts` : ""}
${shopId ? `Disallow: /${shopId}/orders` : ""}
Disallow: /*?*oseid=*
Disallow: /*preview_theme_id*
Disallow: /*preview_script_id*

User-agent: Nutch
Disallow: /

User-agent: AhrefsBot
Crawl-delay: 10
${generalDisallowRules({ sitemapUrl, shopId })}

User-agent: AhrefsSiteAudit
Crawl-delay: 10
${generalDisallowRules({ sitemapUrl, shopId })}

User-agent: MJ12bot
Crawl-Delay: 10

User-agent: Pinterest
Crawl-delay: 1
`.trim();
}
function generalDisallowRules({ shopId, sitemapUrl }) {
  return `Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
${shopId ? `Disallow: /${shopId}/checkouts` : ""}
${shopId ? `Disallow: /${shopId}/orders` : ""}
Disallow: /carts
Disallow: /account
Disallow: /collections/*sort_by*
Disallow: /*/collections/*sort_by*
Disallow: /collections/*+*
Disallow: /collections/*%2B*
Disallow: /collections/*%2b*
Disallow: /*/collections/*+*
Disallow: /*/collections/*%2B*
Disallow: /*/collections/*%2b*
Disallow: */collections/*filter*&*filter*
Disallow: /blogs/*+*
Disallow: /blogs/*%2B*
Disallow: /blogs/*%2b*
Disallow: /*/blogs/*+*
Disallow: /*/blogs/*%2B*
Disallow: /*/blogs/*%2b*
Disallow: /*?*oseid=*
Disallow: /*preview_theme_id*
Disallow: /*preview_script_id*
Disallow: /policies/
Disallow: /*/*?*ls=*&ls=*
Disallow: /*/*?*ls%3D*%3Fls%3D*
Disallow: /*/*?*ls%3d*%3fls%3d*
Disallow: /search
Allow: /search/
Disallow: /search/?*
Disallow: /apple-app-site-association
Disallow: /.well-known/shopify/monorail
${sitemapUrl ? `Sitemap: ${sitemapUrl}` : ""}`;
}
var ROBOTS_QUERY = `#graphql
  query StoreRobots($country: CountryCode, $language: LanguageCode)
   @inContext(country: $country, language: $language) {
    shop {
      id
    }
  }
`;

// app/routes/cart.$lines.jsx
var cart_lines_exports = {};
__export(cart_lines_exports, {
  default: () => Component,
  loader: () => loader24
});
import { redirect as redirect7 } from "@shopify/remix-oxygen";
async function loader24({ request, context, params }) {
  let { cart } = context, { lines } = params;
  if (!lines)
    return redirect7("/cart");
  let linesMap = lines.split(",").map((line) => {
    let lineDetails = line.split(":"), variantId = lineDetails[0], quantity = parseInt(lineDetails[1], 10);
    return {
      merchandiseId: `gid://shopify/ProductVariant/${variantId}`,
      quantity
    };
  }), url = new URL(request.url), discount = new URLSearchParams(url.search).get("discount"), discountArray = discount ? [discount] : [], result = await cart.create({
    lines: linesMap,
    discountCodes: discountArray
  }), cartResult = result.cart;
  if (result.errors?.length || !cartResult)
    throw new Response("Link may be expired. Try checking the URL.", {
      status: 410
    });
  let headers = cart.setCartId(cartResult.id);
  if (cartResult.checkoutUrl)
    return redirect7(cartResult.checkoutUrl, { headers });
  throw new Error("No checkout URL found");
}
function Component() {
  return null;
}

// app/routes/account.$.jsx
var account_exports = {};
__export(account_exports, {
  loader: () => loader25
});
import { redirect as redirect8 } from "@shopify/remix-oxygen";
async function loader25({ context }) {
  return await context.customerAccount.handleAuthStatus(), redirect8("/account");
}

// app/routes/account.jsx
var account_exports2 = {};
__export(account_exports2, {
  default: () => AccountLayout,
  loader: () => loader26,
  shouldRevalidate: () => shouldRevalidate2
});
import { json as json7 } from "@shopify/remix-oxygen";
import { Form as Form3, NavLink as NavLink3, Outlet as Outlet2, useLoaderData as useLoaderData13 } from "@remix-run/react";

// app/graphql/customer-account/CustomerDetailsQuery.js
var CUSTOMER_FRAGMENT = `#graphql
  fragment Customer on Customer {
    id
    firstName
    lastName
    defaultAddress {
      ...Address
    }
    addresses(first: 6) {
      nodes {
        ...Address
      }
    }
  }
  fragment Address on CustomerAddress {
    id
    formatted
    firstName
    lastName
    company
    address1
    address2
    territoryCode
    zoneCode
    city
    zip
    phoneNumber
  }
`, CUSTOMER_DETAILS_QUERY = `#graphql
  query CustomerDetails {
    customer {
      ...Customer
    }
  }
  ${CUSTOMER_FRAGMENT}
`;

// app/routes/account.jsx
import { jsx as jsx31, jsxs as jsxs27 } from "react/jsx-runtime";
function shouldRevalidate2() {
  return !0;
}
async function loader26({ context }) {
  let { data, errors } = await context.customerAccount.query(
    CUSTOMER_DETAILS_QUERY
  );
  if (errors?.length || !data?.customer)
    throw new Error("Customer not found");
  return json7(
    { customer: data.customer },
    {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    }
  );
}
function AccountLayout() {
  let { customer } = useLoaderData13(), heading = customer ? customer.firstName ? `Welcome, ${customer.firstName}` : "Welcome to your account." : "Account Details";
  return /* @__PURE__ */ jsxs27("div", { className: "account", children: [
    /* @__PURE__ */ jsx31("h1", { children: heading }),
    /* @__PURE__ */ jsx31("br", {}),
    /* @__PURE__ */ jsx31(AccountMenu, {}),
    /* @__PURE__ */ jsx31("br", {}),
    /* @__PURE__ */ jsx31("br", {}),
    /* @__PURE__ */ jsx31(Outlet2, { context: { customer } })
  ] });
}
function AccountMenu() {
  function isActiveStyle({ isActive, isPending }) {
    return {
      fontWeight: isActive ? "bold" : void 0,
      color: isPending ? "grey" : "black"
    };
  }
  return /* @__PURE__ */ jsxs27("nav", { role: "navigation", children: [
    /* @__PURE__ */ jsx31(NavLink3, { to: "/account/orders", style: isActiveStyle, children: "Orders \xA0" }),
    "\xA0|\xA0",
    /* @__PURE__ */ jsx31(NavLink3, { to: "/account/profile", style: isActiveStyle, children: "\xA0 Profile \xA0" }),
    "\xA0|\xA0",
    /* @__PURE__ */ jsx31(NavLink3, { to: "/account/addresses", style: isActiveStyle, children: "\xA0 Addresses \xA0" }),
    "\xA0|\xA0",
    /* @__PURE__ */ jsx31(Logout, {})
  ] });
}
function Logout() {
  return /* @__PURE__ */ jsxs27(Form3, { className: "account-logout", method: "POST", action: "/account/logout", children: [
    "\xA0",
    /* @__PURE__ */ jsx31("button", { type: "submit", children: "Sign out" })
  ] });
}

// app/routes/search.jsx
var search_exports = {};
__export(search_exports, {
  SEARCH_QUERY: () => SEARCH_QUERY,
  default: () => SearchPage,
  loader: () => loader27,
  meta: () => meta13
});
import { json as json8 } from "@shopify/remix-oxygen";
import { useLoaderData as useLoaderData14 } from "@remix-run/react";
import { getPaginationVariables as getPaginationVariables7, Analytics as Analytics4 } from "@shopify/hydrogen";

// app/components/SearchForm.jsx
import { useRef as useRef4, useEffect as useEffect4 } from "react";
import { Form as Form4 } from "@remix-run/react";
import { jsx as jsx32 } from "react/jsx-runtime";
function SearchForm({ children, ...props }) {
  let inputRef = useRef4(null);
  return useFocusOnCmdK(inputRef), typeof children != "function" ? null : /* @__PURE__ */ jsx32(Form4, { method: "get", ...props, children: children({ inputRef }) });
}
function useFocusOnCmdK(inputRef) {
  useEffect4(() => {
    function handleKeyDown(event) {
      event.key === "k" && event.metaKey && (event.preventDefault(), inputRef.current?.focus()), event.key === "Escape" && inputRef.current?.blur();
    }
    return document.addEventListener("keydown", handleKeyDown), () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef]);
}

// app/components/SearchResults.jsx
import { Link as Link14 } from "@remix-run/react";
import { Image as Image10, Money as Money8, Pagination as Pagination2 } from "@shopify/hydrogen";
import { jsx as jsx33, jsxs as jsxs28 } from "react/jsx-runtime";
function SearchResults({ term, result, children }) {
  return result?.total ? children({ ...result.items, term }) : null;
}
SearchResults.Articles = SearchResultsArticles;
SearchResults.Pages = SearchResultsPages;
SearchResults.Products = SearchResultsProducts;
SearchResults.Empty = SearchResultsEmpty;
function SearchResultsArticles({ term, articles }) {
  return articles?.nodes.length ? /* @__PURE__ */ jsxs28("div", { className: "search-result", children: [
    /* @__PURE__ */ jsx33("h2", { children: "Articles" }),
    /* @__PURE__ */ jsx33("div", { children: articles?.nodes?.map((article) => {
      let articleUrl = urlWithTrackingParams({
        baseUrl: `/blogs/${article.handle}`,
        trackingParams: article.trackingParameters,
        term
      });
      return /* @__PURE__ */ jsx33("div", { className: "search-results-item", children: /* @__PURE__ */ jsx33(Link14, { prefetch: "intent", to: articleUrl, children: article.title }) }, article.id);
    }) }),
    /* @__PURE__ */ jsx33("br", {})
  ] }) : null;
}
function SearchResultsPages({ term, pages }) {
  return pages?.nodes.length ? /* @__PURE__ */ jsxs28("div", { className: "search-result", children: [
    /* @__PURE__ */ jsx33("h2", { children: "Pages" }),
    /* @__PURE__ */ jsx33("div", { children: pages?.nodes?.map((page) => {
      let pageUrl = urlWithTrackingParams({
        baseUrl: `/pages/${page.handle}`,
        trackingParams: page.trackingParameters,
        term
      });
      return /* @__PURE__ */ jsx33("div", { className: "search-results-item", children: /* @__PURE__ */ jsx33(Link14, { prefetch: "intent", to: pageUrl, children: page.title }) }, page.id);
    }) }),
    /* @__PURE__ */ jsx33("br", {})
  ] }) : null;
}
function SearchResultsProducts({ term, products }) {
  return products?.nodes.length ? /* @__PURE__ */ jsxs28("div", { className: "search-result", children: [
    /* @__PURE__ */ jsx33("h2", { children: "Products" }),
    /* @__PURE__ */ jsx33(Pagination2, { connection: products, children: ({ nodes, isLoading, NextLink, PreviousLink }) => {
      let ItemsMarkup = nodes.map((product) => {
        let productUrl = urlWithTrackingParams({
          baseUrl: `/products/${product.handle}`,
          trackingParams: product.trackingParameters,
          term
        });
        return /* @__PURE__ */ jsx33("div", { className: "search-results-item", children: /* @__PURE__ */ jsxs28(Link14, { prefetch: "intent", to: productUrl, children: [
          product.variants.nodes[0].image && /* @__PURE__ */ jsx33(
            Image10,
            {
              data: product.variants.nodes[0].image,
              alt: product.title,
              width: 50
            }
          ),
          /* @__PURE__ */ jsxs28("div", { children: [
            /* @__PURE__ */ jsx33("p", { children: product.title }),
            /* @__PURE__ */ jsx33("small", { children: /* @__PURE__ */ jsx33(Money8, { data: product.variants.nodes[0].price }) })
          ] })
        ] }) }, product.id);
      });
      return /* @__PURE__ */ jsxs28("div", { children: [
        /* @__PURE__ */ jsx33("div", { children: /* @__PURE__ */ jsx33(PreviousLink, { children: isLoading ? "Loading..." : /* @__PURE__ */ jsx33("span", { children: "\u2191 Load previous" }) }) }),
        /* @__PURE__ */ jsxs28("div", { children: [
          ItemsMarkup,
          /* @__PURE__ */ jsx33("br", {})
        ] }),
        /* @__PURE__ */ jsx33("div", { children: /* @__PURE__ */ jsx33(NextLink, { children: isLoading ? "Loading..." : /* @__PURE__ */ jsx33("span", { children: "Load more \u2193" }) }) })
      ] });
    } }),
    /* @__PURE__ */ jsx33("br", {})
  ] }) : null;
}
function SearchResultsEmpty() {
  return /* @__PURE__ */ jsx33("p", { children: "No results, try a different search." });
}

// app/routes/search.jsx
import { Fragment as Fragment4, jsx as jsx34, jsxs as jsxs29 } from "react/jsx-runtime";
var meta13 = () => [{ title: "Hydrogen | Search" }];
async function loader27({ request, context }) {
  let searchPromise = new URL(request.url).searchParams.has("predictive") ? predictiveSearch({ request, context }) : regularSearch({ request, context });
  return searchPromise.catch((error) => (console.error(error), { term: "", result: null, error: error.message })), json8(await searchPromise);
}
function SearchPage() {
  let { type, term, result, error } = useLoaderData14();
  return type === "predictive" ? null : /* @__PURE__ */ jsxs29("div", { className: "search", children: [
    /* @__PURE__ */ jsx34("h1", { children: "Search" }),
    /* @__PURE__ */ jsx34(SearchForm, { children: ({ inputRef }) => /* @__PURE__ */ jsxs29(Fragment4, { children: [
      /* @__PURE__ */ jsx34(
        "input",
        {
          defaultValue: term,
          name: "q",
          placeholder: "Search\u2026",
          ref: inputRef,
          type: "search"
        }
      ),
      "\xA0",
      /* @__PURE__ */ jsx34("button", { type: "submit", children: "Search" })
    ] }) }),
    error && /* @__PURE__ */ jsx34("p", { style: { color: "red" }, children: error }),
    !term || !result?.total ? /* @__PURE__ */ jsx34(SearchResults.Empty, {}) : /* @__PURE__ */ jsx34(SearchResults, { result, term, children: ({ articles, pages, products, term: term2 }) => /* @__PURE__ */ jsxs29("div", { children: [
      /* @__PURE__ */ jsx34(SearchResults.Products, { products, term: term2 }),
      /* @__PURE__ */ jsx34(SearchResults.Pages, { pages, term: term2 }),
      /* @__PURE__ */ jsx34(SearchResults.Articles, { articles, term: term2 })
    ] }) }),
    /* @__PURE__ */ jsx34(Analytics4.SearchView, { data: { searchTerm: term, searchResults: result } })
  ] });
}
var SEARCH_PRODUCT_FRAGMENT = `#graphql
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
`, SEARCH_PAGE_FRAGMENT = `#graphql
  fragment SearchPage on Page {
     __typename
     handle
    id
    title
    trackingParameters
  }
`, SEARCH_ARTICLE_FRAGMENT = `#graphql
  fragment SearchArticle on Article {
    __typename
    handle
    id
    title
    trackingParameters
  }
`, PAGE_INFO_FRAGMENT = `#graphql
  fragment PageInfoFragment on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`, SEARCH_QUERY = `#graphql
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
  ${SEARCH_PRODUCT_FRAGMENT}
  ${SEARCH_PAGE_FRAGMENT}
  ${SEARCH_ARTICLE_FRAGMENT}
  ${PAGE_INFO_FRAGMENT}
`;
async function regularSearch({ request, context }) {
  let { storefront } = context, url = new URL(request.url), variables = getPaginationVariables7(request, { pageBy: 8 }), term = String(url.searchParams.get("q") || ""), { errors, ...items } = await storefront.query(SEARCH_QUERY, {
    variables: { ...variables, term }
  });
  if (!items)
    throw new Error("No search data returned from Shopify API");
  let total = Object.values(items).reduce(
    (acc, { nodes }) => acc + nodes.length,
    0
  ), error = errors ? errors.map(({ message }) => message).join(", ") : void 0;
  return { type: "regular", term, error, result: { total, items } };
}
var PREDICTIVE_SEARCH_ARTICLE_FRAGMENT = `#graphql
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
`, PREDICTIVE_SEARCH_COLLECTION_FRAGMENT = `#graphql
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
`, PREDICTIVE_SEARCH_PAGE_FRAGMENT = `#graphql
  fragment PredictivePage on Page {
    __typename
    id
    title
    handle
    trackingParameters
  }
`, PREDICTIVE_SEARCH_PRODUCT_FRAGMENT = `#graphql
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
`, PREDICTIVE_SEARCH_QUERY_FRAGMENT = `#graphql
  fragment PredictiveQuery on SearchQuerySuggestion {
    __typename
    text
    styledText
    trackingParameters
  }
`, PREDICTIVE_SEARCH_QUERY = `#graphql
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
  ${PREDICTIVE_SEARCH_ARTICLE_FRAGMENT}
  ${PREDICTIVE_SEARCH_COLLECTION_FRAGMENT}
  ${PREDICTIVE_SEARCH_PAGE_FRAGMENT}
  ${PREDICTIVE_SEARCH_PRODUCT_FRAGMENT}
  ${PREDICTIVE_SEARCH_QUERY_FRAGMENT}
`;
async function predictiveSearch({ request, context }) {
  let { storefront } = context, url = new URL(request.url), term = String(url.searchParams.get("q") || "").trim(), limit = Number(url.searchParams.get("limit") || 10), type = "predictive";
  if (!term)
    return { type, term, result: getEmptyPredictiveSearchResult() };
  let { predictiveSearch: items, errors } = await storefront.query(
    PREDICTIVE_SEARCH_QUERY,
    {
      variables: {
        // customize search options as needed
        limit,
        limitScope: "EACH",
        term
      }
    }
  );
  if (errors)
    throw new Error(
      `Shopify API errors: ${errors.map(({ message }) => message).join(", ")}`
    );
  if (!items)
    throw new Error("No predictive search data returned from Shopify API");
  let total = Object.values(items).reduce(
    (acc, item) => acc + item.length,
    0
  );
  return { type, term, result: { items, total } };
}

// app/routes/_index.jsx
var index_exports = {};
__export(index_exports, {
  default: () => Homepage,
  loader: () => loader28,
  meta: () => meta14
});
import { defer as defer10 } from "@shopify/remix-oxygen";
import { Await as Await5, useLoaderData as useLoaderData15, Link as Link15 } from "@remix-run/react";
import { Suspense as Suspense5 } from "react";
import { Image as Image11, Money as Money9 } from "@shopify/hydrogen";
import { jsx as jsx35, jsxs as jsxs30 } from "react/jsx-runtime";
var meta14 = () => [{ title: "Hydrogen | Home" }];
async function loader28(args) {
  let deferredData = loadDeferredData10(args), criticalData = await loadCriticalData10(args);
  return defer10({ ...deferredData, ...criticalData });
}
async function loadCriticalData10({ context }) {
  let [{ collections }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY)
    // Add other queries here, so that they are loaded in parallel
  ]);
  return {
    featuredCollection: collections.nodes[0]
  };
}
function loadDeferredData10({ context }) {
  return {
    recommendedProducts: context.storefront.query(RECOMMENDED_PRODUCTS_QUERY).catch((error) => (console.error(error), null))
  };
}
function Homepage() {
  let data = useLoaderData15();
  return /* @__PURE__ */ jsxs30("div", { className: "home", children: [
    /* @__PURE__ */ jsx35(FeaturedCollection, { collection: data.featuredCollection }),
    /* @__PURE__ */ jsx35(RecommendedProducts, { products: data.recommendedProducts })
  ] });
}
function FeaturedCollection({ collection }) {
  if (!collection)
    return null;
  let image = collection?.image;
  return /* @__PURE__ */ jsxs30(
    Link15,
    {
      className: "featured-collection",
      to: `/collections/${collection.handle}`,
      children: [
        image && /* @__PURE__ */ jsx35("div", { className: "featured-collection-image", children: /* @__PURE__ */ jsx35(Image11, { data: image, sizes: "100vw" }) }),
        /* @__PURE__ */ jsx35("h1", { children: collection.title })
      ]
    }
  );
}
function RecommendedProducts({ products }) {
  return /* @__PURE__ */ jsxs30("div", { className: "recommended-products", children: [
    /* @__PURE__ */ jsx35("h2", { children: "Recommended Products" }),
    /* @__PURE__ */ jsx35(Suspense5, { fallback: /* @__PURE__ */ jsx35("div", { children: "Loading..." }), children: /* @__PURE__ */ jsx35(Await5, { resolve: products, children: (response) => /* @__PURE__ */ jsx35("div", { className: "recommended-products-grid", children: response ? response.products.nodes.map((product) => /* @__PURE__ */ jsxs30(
      Link15,
      {
        className: "recommended-product",
        to: `/products/${product.handle}`,
        children: [
          /* @__PURE__ */ jsx35(
            Image11,
            {
              data: product.images.nodes[0],
              aspectRatio: "1/1",
              sizes: "(min-width: 45em) 20vw, 50vw"
            }
          ),
          /* @__PURE__ */ jsx35("h4", { children: product.title }),
          /* @__PURE__ */ jsx35("small", { children: /* @__PURE__ */ jsx35(Money9, { data: product.priceRange.minVariantPrice }) })
        ]
      },
      product.id
    )) : null }) }) }),
    /* @__PURE__ */ jsx35("br", {})
  ] });
}
var FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`, RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

// app/routes/cart.jsx
var cart_exports = {};
__export(cart_exports, {
  action: () => action4,
  default: () => Cart,
  meta: () => meta15
});
import { Await as Await6, useRouteLoaderData as useRouteLoaderData2 } from "@remix-run/react";
import { Suspense as Suspense6 } from "react";
import { CartForm as CartForm4 } from "@shopify/hydrogen";
import { json as json9 } from "@shopify/remix-oxygen";
import { jsx as jsx36, jsxs as jsxs31 } from "react/jsx-runtime";
var meta15 = () => [{ title: "Hydrogen | Cart" }];
async function action4({ request, context }) {
  let { cart } = context, formData = await request.formData(), { action: action5, inputs } = CartForm4.getFormInput(formData);
  if (!action5)
    throw new Error("No action provided");
  let status = 200, result;
  switch (action5) {
    case CartForm4.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm4.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm4.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm4.ACTIONS.DiscountCodesUpdate: {
      let formDiscountCode = inputs.discountCode, discountCodes = formDiscountCode ? [formDiscountCode] : [];
      discountCodes.push(...inputs.discountCodes), result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm4.ACTIONS.GiftCardCodesUpdate: {
      let formGiftCardCode = inputs.giftCardCode, giftCardCodes = formGiftCardCode ? [formGiftCardCode] : [];
      giftCardCodes.push(...inputs.giftCardCodes), result = await cart.updateGiftCardCodes(giftCardCodes);
      break;
    }
    case CartForm4.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity
      });
      break;
    }
    default:
      throw new Error(`${action5} cart action is not defined`);
  }
  let cartId = result?.cart?.id, headers = cartId ? cart.setCartId(result.cart.id) : new Headers(), { cart: cartResult, errors, warnings } = result, redirectTo = formData.get("redirectTo") ?? null;
  return typeof redirectTo == "string" && (status = 303, headers.set("Location", redirectTo)), json9(
    {
      cart: cartResult,
      errors,
      warnings,
      analytics: {
        cartId
      }
    },
    { status, headers }
  );
}
function Cart() {
  let rootData = useRouteLoaderData2("root");
  return rootData ? /* @__PURE__ */ jsxs31("div", { className: "cart", children: [
    /* @__PURE__ */ jsx36("h1", { children: "Cart" }),
    /* @__PURE__ */ jsx36(Suspense6, { fallback: /* @__PURE__ */ jsx36("p", { children: "Loading cart ..." }), children: /* @__PURE__ */ jsx36(
      Await6,
      {
        resolve: rootData.cart,
        errorElement: /* @__PURE__ */ jsx36("div", { children: "An error occurred" }),
        children: (cart) => /* @__PURE__ */ jsx36(CartMain, { layout: "page", cart })
      }
    ) })
  ] }) : null;
}

// app/routes/$.jsx
var __exports = {};
__export(__exports, {
  default: () => CatchAllPage,
  loader: () => loader29
});
async function loader29({ request }) {
  throw new Response(`${new URL(request.url).pathname} not found`, {
    status: 404
  });
}
function CatchAllPage() {
  return null;
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-QHSWAMYE.js", imports: ["/build/_shared/chunk-PORSORIO.js", "/build/_shared/chunk-USXU6MDU.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-VTFSEVOP.js", imports: ["/build/_shared/chunk-IQUW2RCZ.js", "/build/_shared/chunk-KQZ3DJFT.js", "/build/_shared/chunk-LGV3BFFV.js", "/build/_shared/chunk-LQ3E66PR.js", "/build/_shared/chunk-MO733K6J.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/$": { id: "routes/$", parentId: "root", path: "*", index: void 0, caseSensitive: void 0, module: "/build/routes/$-THXVKCZC.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/[robots.txt]": { id: "routes/[robots.txt]", parentId: "root", path: "robots.txt", index: void 0, caseSensitive: void 0, module: "/build/routes/[robots.txt]-7ESYSGSX.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/[sitemap.xml]": { id: "routes/[sitemap.xml]", parentId: "root", path: "sitemap.xml", index: void 0, caseSensitive: void 0, module: "/build/routes/[sitemap.xml]-P7Q5ZDCW.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-MMFQI6CO.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/account": { id: "routes/account", parentId: "root", path: "account", index: void 0, caseSensitive: void 0, module: "/build/routes/account-L5X62VXD.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/account.$": { id: "routes/account.$", parentId: "routes/account", path: "*", index: void 0, caseSensitive: void 0, module: "/build/routes/account.$-MVO3JAA3.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/account._index": { id: "routes/account._index", parentId: "routes/account", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/account._index-QQBX3JQA.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/account.addresses": { id: "routes/account.addresses", parentId: "routes/account", path: "addresses", index: void 0, caseSensitive: void 0, module: "/build/routes/account.addresses-YK5QKXDN.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/account.orders.$id": { id: "routes/account.orders.$id", parentId: "routes/account", path: "orders/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/account.orders.$id-MCSYUJEN.js", imports: ["/build/_shared/chunk-MO733K6J.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/account.orders._index": { id: "routes/account.orders._index", parentId: "routes/account", path: "orders", index: !0, caseSensitive: void 0, module: "/build/routes/account.orders._index-A6UDSNFZ.js", imports: ["/build/_shared/chunk-ZRH7DNVD.js", "/build/_shared/chunk-MO733K6J.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/account.profile": { id: "routes/account.profile", parentId: "routes/account", path: "profile", index: void 0, caseSensitive: void 0, module: "/build/routes/account.profile-XOGPC64L.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/account_.authorize": { id: "routes/account_.authorize", parentId: "root", path: "account/authorize", index: void 0, caseSensitive: void 0, module: "/build/routes/account_.authorize-CLSG3CZ2.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/account_.login": { id: "routes/account_.login", parentId: "root", path: "account/login", index: void 0, caseSensitive: void 0, module: "/build/routes/account_.login-QFRIQPIL.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/account_.logout": { id: "routes/account_.logout", parentId: "root", path: "account/logout", index: void 0, caseSensitive: void 0, module: "/build/routes/account_.logout-4MEIPRYY.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/blogs.$blogHandle.$articleHandle": { id: "routes/blogs.$blogHandle.$articleHandle", parentId: "root", path: "blogs/:blogHandle/:articleHandle", index: void 0, caseSensitive: void 0, module: "/build/routes/blogs.$blogHandle.$articleHandle-F6QHN7J3.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/blogs.$blogHandle._index": { id: "routes/blogs.$blogHandle._index", parentId: "root", path: "blogs/:blogHandle", index: !0, caseSensitive: void 0, module: "/build/routes/blogs.$blogHandle._index-C333ZHVX.js", imports: ["/build/_shared/chunk-ZRH7DNVD.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/blogs._index": { id: "routes/blogs._index", parentId: "root", path: "blogs", index: !0, caseSensitive: void 0, module: "/build/routes/blogs._index-4FQX5N4B.js", imports: ["/build/_shared/chunk-ZRH7DNVD.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/cart": { id: "routes/cart", parentId: "root", path: "cart", index: void 0, caseSensitive: void 0, module: "/build/routes/cart-CBJPHCMX.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/cart.$lines": { id: "routes/cart.$lines", parentId: "routes/cart", path: ":lines", index: void 0, caseSensitive: void 0, module: "/build/routes/cart.$lines-NQUI23D6.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/collections.$handle": { id: "routes/collections.$handle", parentId: "root", path: "collections/:handle", index: void 0, caseSensitive: void 0, module: "/build/routes/collections.$handle-BGJ2PRQP.js", imports: ["/build/_shared/chunk-ZRH7DNVD.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/collections._index": { id: "routes/collections._index", parentId: "root", path: "collections", index: !0, caseSensitive: void 0, module: "/build/routes/collections._index-5FLNPMAU.js", imports: ["/build/_shared/chunk-ZRH7DNVD.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/collections.all": { id: "routes/collections.all", parentId: "root", path: "collections/all", index: void 0, caseSensitive: void 0, module: "/build/routes/collections.all-GKRTSJPE.js", imports: ["/build/_shared/chunk-ZRH7DNVD.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/discount.$code": { id: "routes/discount.$code", parentId: "root", path: "discount/:code", index: void 0, caseSensitive: void 0, module: "/build/routes/discount.$code-TFI6QEF5.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/pages.$handle": { id: "routes/pages.$handle", parentId: "root", path: "pages/:handle", index: void 0, caseSensitive: void 0, module: "/build/routes/pages.$handle-5FF2WIDL.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/policies.$handle": { id: "routes/policies.$handle", parentId: "root", path: "policies/:handle", index: void 0, caseSensitive: void 0, module: "/build/routes/policies.$handle-VMZIIG6N.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/policies._index": { id: "routes/policies._index", parentId: "root", path: "policies", index: !0, caseSensitive: void 0, module: "/build/routes/policies._index-JOMTX5JX.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/products.$handle": { id: "routes/products.$handle", parentId: "root", path: "products/:handle", index: void 0, caseSensitive: void 0, module: "/build/routes/products.$handle-DDQ44GCT.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/search": { id: "routes/search", parentId: "root", path: "search", index: void 0, caseSensitive: void 0, module: "/build/routes/search-XAOMYJU6.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/sitemap.$type.$page[.xml]": { id: "routes/sitemap.$type.$page[.xml]", parentId: "root", path: "sitemap/:type/:page.xml", index: void 0, caseSensitive: void 0, module: "/build/routes/sitemap.$type.$page[.xml]-3DD3XP4V.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "76018c08", hmr: void 0, url: "/build/manifest-76018C08.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public\\build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/blogs.$blogHandle.$articleHandle": {
    id: "routes/blogs.$blogHandle.$articleHandle",
    parentId: "root",
    path: "blogs/:blogHandle/:articleHandle",
    index: void 0,
    caseSensitive: void 0,
    module: blogs_blogHandle_articleHandle_exports
  },
  "routes/sitemap.$type.$page[.xml]": {
    id: "routes/sitemap.$type.$page[.xml]",
    parentId: "root",
    path: "sitemap/:type/:page.xml",
    index: void 0,
    caseSensitive: void 0,
    module: sitemap_type_page_xml_exports
  },
  "routes/blogs.$blogHandle._index": {
    id: "routes/blogs.$blogHandle._index",
    parentId: "root",
    path: "blogs/:blogHandle",
    index: !0,
    caseSensitive: void 0,
    module: blogs_blogHandle_index_exports
  },
  "routes/account.orders._index": {
    id: "routes/account.orders._index",
    parentId: "routes/account",
    path: "orders",
    index: !0,
    caseSensitive: void 0,
    module: account_orders_index_exports
  },
  "routes/collections.$handle": {
    id: "routes/collections.$handle",
    parentId: "root",
    path: "collections/:handle",
    index: void 0,
    caseSensitive: void 0,
    module: collections_handle_exports
  },
  "routes/account.orders.$id": {
    id: "routes/account.orders.$id",
    parentId: "routes/account",
    path: "orders/:id",
    index: void 0,
    caseSensitive: void 0,
    module: account_orders_id_exports
  },
  "routes/account_.authorize": {
    id: "routes/account_.authorize",
    parentId: "root",
    path: "account/authorize",
    index: void 0,
    caseSensitive: void 0,
    module: account_authorize_exports
  },
  "routes/collections._index": {
    id: "routes/collections._index",
    parentId: "root",
    path: "collections",
    index: !0,
    caseSensitive: void 0,
    module: collections_index_exports
  },
  "routes/account.addresses": {
    id: "routes/account.addresses",
    parentId: "routes/account",
    path: "addresses",
    index: void 0,
    caseSensitive: void 0,
    module: account_addresses_exports
  },
  "routes/policies.$handle": {
    id: "routes/policies.$handle",
    parentId: "root",
    path: "policies/:handle",
    index: void 0,
    caseSensitive: void 0,
    module: policies_handle_exports
  },
  "routes/products.$handle": {
    id: "routes/products.$handle",
    parentId: "root",
    path: "products/:handle",
    index: void 0,
    caseSensitive: void 0,
    module: products_handle_exports
  },
  "routes/account.profile": {
    id: "routes/account.profile",
    parentId: "routes/account",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: account_profile_exports
  },
  "routes/account_.logout": {
    id: "routes/account_.logout",
    parentId: "root",
    path: "account/logout",
    index: void 0,
    caseSensitive: void 0,
    module: account_logout_exports
  },
  "routes/collections.all": {
    id: "routes/collections.all",
    parentId: "root",
    path: "collections/all",
    index: void 0,
    caseSensitive: void 0,
    module: collections_all_exports
  },
  "routes/policies._index": {
    id: "routes/policies._index",
    parentId: "root",
    path: "policies",
    index: !0,
    caseSensitive: void 0,
    module: policies_index_exports
  },
  "routes/account._index": {
    id: "routes/account._index",
    parentId: "routes/account",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: account_index_exports
  },
  "routes/account_.login": {
    id: "routes/account_.login",
    parentId: "root",
    path: "account/login",
    index: void 0,
    caseSensitive: void 0,
    module: account_login_exports
  },
  "routes/discount.$code": {
    id: "routes/discount.$code",
    parentId: "root",
    path: "discount/:code",
    index: void 0,
    caseSensitive: void 0,
    module: discount_code_exports
  },
  "routes/pages.$handle": {
    id: "routes/pages.$handle",
    parentId: "root",
    path: "pages/:handle",
    index: void 0,
    caseSensitive: void 0,
    module: pages_handle_exports
  },
  "routes/[sitemap.xml]": {
    id: "routes/[sitemap.xml]",
    parentId: "root",
    path: "sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: sitemap_xml_exports
  },
  "routes/blogs._index": {
    id: "routes/blogs._index",
    parentId: "root",
    path: "blogs",
    index: !0,
    caseSensitive: void 0,
    module: blogs_index_exports
  },
  "routes/[robots.txt]": {
    id: "routes/[robots.txt]",
    parentId: "root",
    path: "robots.txt",
    index: void 0,
    caseSensitive: void 0,
    module: robots_txt_exports
  },
  "routes/cart.$lines": {
    id: "routes/cart.$lines",
    parentId: "routes/cart",
    path: ":lines",
    index: void 0,
    caseSensitive: void 0,
    module: cart_lines_exports
  },
  "routes/account.$": {
    id: "routes/account.$",
    parentId: "routes/account",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: account_exports
  },
  "routes/account": {
    id: "routes/account",
    parentId: "root",
    path: "account",
    index: void 0,
    caseSensitive: void 0,
    module: account_exports2
  },
  "routes/search": {
    id: "routes/search",
    parentId: "root",
    path: "search",
    index: void 0,
    caseSensitive: void 0,
    module: search_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/cart": {
    id: "routes/cart",
    parentId: "root",
    path: "cart",
    index: void 0,
    caseSensitive: void 0,
    module: cart_exports
  },
  "routes/$": {
    id: "routes/$",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: __exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};

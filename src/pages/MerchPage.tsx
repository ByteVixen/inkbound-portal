import { useEffect, useMemo, useRef, useState } from "react";
import VantaBackground from "../components/VantaBackground";

/** Shopify config (from your snippets) */
const SHOPIFY_DOMAIN = "0xu58v-n0.myshopify.com";
const SHOPIFY_STOREFRONT_TOKEN = "9e614f31b48225c8e9c5bf72475f697e";
const SHOPIFY_SDK_URL =
  "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

/** Singleton loader so we only load the SDK once */
let shopifyUiPromise: Promise<any> | null = null;
function getShopifyUI(): Promise<any> {
  if (shopifyUiPromise) return shopifyUiPromise;

  shopifyUiPromise = new Promise((resolve, reject) => {
    const init = () => {
      const w = window as any;
      const ShopifyBuy = w.ShopifyBuy;
      if (!ShopifyBuy || !ShopifyBuy.UI) {
        reject(new Error("ShopifyBuy UI failed to load"));
        return;
      }
      const client = ShopifyBuy.buildClient({
        domain: SHOPIFY_DOMAIN,
        storefrontAccessToken: SHOPIFY_STOREFRONT_TOKEN,
      });
      ShopifyBuy.UI.onReady(client).then((ui: any) => resolve(ui));
    };

    const w = window as any;
    if (w.ShopifyBuy && w.ShopifyBuy.UI) {
      init();
    } else {
      const existing = document.getElementById("shopify-buy-button-sdk");
      if (existing) {
        existing.addEventListener("load", init, { once: true });
      } else {
        const script = document.createElement("script");
        script.id = "shopify-buy-button-sdk";
        script.async = true;
        script.src = SHOPIFY_SDK_URL;
        script.onload = init;
        script.onerror = (e) => reject(e);
        document.head.appendChild(script);
      }
    }
  });

  return shopifyUiPromise;
}

/** Shared BuyButton style (Inkbound theme) */
const BUTTON_STYLE = {
  "font-family": "Marcellus, serif",
  "background-color": "#d97706", // amber-600
  color: "#000000",
  "text-transform": "none",
  "border-radius": "9999px",
  ":hover": { "background-color": "#f59e0b" }, // amber-500
  ":focus": { "background-color": "#f59e0b" },
};

const PRODUCT_OPTIONS = {
  product: {
    styles: {
      product: {
        "text-align": "left",
        "max-width": "100%",
        "margin-left": "0px",
        "margin-bottom": "0px",
        "background-color": "transparent",
        "border-radius": "12px",
      },
      title: { color: "#FBBF24" }, // amber-400
      price: { color: "#E5E7EB" }, // gray-200
      compareAt: { color: "#9CA3AF" }, // gray-400
      button: BUTTON_STYLE,
      quantityInput: {
        "font-family": "Marcellus, serif",
        color: "#E5E7EB",
        "background-color": "#111827", // gray-900
        "border-color": "#374151", // gray-700
      },
    },
    buttonDestination: "checkout",
    text: { button: "Buy now" },
  },
  modalProduct: {
    contents: {
      img: false,
      imgWithCarousel: true,
      button: false,
      buttonWithQuantity: true,
    },
    styles: {
      product: {
        "max-width": "100%",
        "margin-left": "0px",
        "margin-bottom": "0px",
        "background-color": "#0b0b0b",
      },
      title: { color: "#FBBF24" },
      price: { color: "#E5E7EB" },
      button: BUTTON_STYLE,
    },
    text: { button: "Add to cart" },
  },
  option: {},
  cart: {
    styles: {
      button: BUTTON_STYLE,
      title: { color: "#FBBF24" },
      header: { color: "#E5E7EB" },
      lineItems: { color: "#E5E7EB" },
      subtotalText: { color: "#E5E7EB" },
      subtotal: { color: "#FBBF24" },
      noteDescription: { color: "#9CA3AF" },
    },
    text: {
      total: "Subtotal",
      button: "Checkout",
    },
  },
  toggle: {
    styles: {
      toggle: BUTTON_STYLE,
    },
  },
};

/** Reusable product mount */
function ShopifyProduct({ id }: { id: string }) {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let destroyed = false;
    getShopifyUI()
      .then((ui) => {
        if (destroyed || !nodeRef.current) return;
        ui.createComponent("product", {
          id,
          node: nodeRef.current,
          moneyFormat: "€{{amount_with_comma_separator}}",
          options: PRODUCT_OPTIONS,
        });
        setReady(true);
      })
      .catch((e) => {
        console.error("Shopify UI error:", e);
      });
    return () => {
      destroyed = true;
      // best-effort cleanup
      if (nodeRef.current) nodeRef.current.innerHTML = "";
    };
  }, [id]);

  return (
    <div className="rounded-xl border border-amber-700/40 bg-black/30 p-4">
      {!ready && (
        <div className="animate-pulse text-sm text-gray-400 mb-2">Loading…</div>
      )}
      <div ref={nodeRef} />
    </div>
  );
}

/** Section wrapper with a responsive grid */
function Section({
  title,
  ids,
}: {
  title: string;
  ids: string[];
}) {
  const products = useMemo(() => ids, [ids]);
  return (
    <section className="mb-10">
      <h2 className="text-3xl text-amber-400 mb-3">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((id) => (
          <ShopifyProduct key={id} id={id} />
        ))}
      </div>
    </section>
  );
}

export default function MerchPage() {
  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8 border border-amber-700">
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="Inkbound" className="w-10 h-10" />
            <h1 className="text-4xl font-light text-amber-500 text-glow">
              Inkbound Merch
            </h1>
          </div>
          <p className="text-gray-300 mb-8">
            Cosy homewares, apparel, and reading accessories from the Inkbound
            Society. All checkout is handled securely via Shopify.
          </p>

          {/* Homewares */}
          <Section
            title="Homewares"
            ids={[
              "10750034870294",
              "10749996531734",
              "10749994139670",
            ]}
          />

          {/* Clothing */}
          <Section
            title="Clothing"
            ids={[
              "10749990141974",
              "10750023532566",
              "10750030774294",
              "10750028709910",
            ]}
          />

          {/* Reading Accessories */}
          <Section
            title="Reading Accessories"
            ids={[
              "10749997711382",
              "10750007803926",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

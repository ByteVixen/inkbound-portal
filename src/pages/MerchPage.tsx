import { useEffect } from "react";
import VantaBackground from "../components/VantaBackground";

// --- Your Shopify details (from the snippets you pasted) ---
const SHOPIFY_DOMAIN = "0xu58v-n0.myshopify.com";
const SHOPIFY_TOKEN = "9e614f31b48225c8e9c5bf72475f697e";

// Product IDs by section (string or number both ok)
const HOMEWARES = ["10750034870294", "10749996531734", "10749994139670"];
const CLOTHING = ["10749990141974", "10750023532566", "10750030774294", "10750028709910"];
const ACCESSORIES = ["10749997711382", "10750007803926"];

// One-time loader for the Shopify Buy Button script
let shopifyScriptPromise: Promise<void> | null = null;
function loadShopifyScript() {
  if (shopifyScriptPromise) return shopifyScriptPromise;
  shopifyScriptPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve(); // SSR guard
    if ((window as any).ShopifyBuy?.UI) return resolve();

    const script = document.createElement("script");
    script.src = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return shopifyScriptPromise;
}

function mountProducts(containerIds: string[], productIds: string[]) {
  const w = window as any;
  if (!w.ShopifyBuy) return;

  const client = w.ShopifyBuy.buildClient({
    domain: SHOPIFY_DOMAIN,
    storefrontAccessToken: SHOPIFY_TOKEN,
  });

  w.ShopifyBuy.UI.onReady(client).then((ui: any) => {
    productIds.forEach((id, i) => {
      const node = document.getElementById(containerIds[i]);
      if (!node) return;
      ui.createComponent("product", {
        id,
        node,
        moneyFormat: "€{{amount_with_comma_separator}}",
        options: {
          product: {
            styles: {
              product: {
                "@media (min-width: 601px)": {
                  maxWidth: "calc(25% - 20px)",
                  marginLeft: "20px",
                  marginBottom: "50px",
                },
              },
              button: {
                fontFamily: "Arvo, serif",
                backgroundColor: "#f59e0b", // amber-500
                color: "#000000",
                ":hover": { backgroundColor: "#fbbf24" }, // amber-400
                ":focus": { backgroundColor: "#fbbf24" },
                borderRadius: "9999px",
              },
            },
            text: { button: "Buy now" },
            buttonDestination: "checkout",
            googleFonts: ["Arvo"],
          },
          productSet: {
            styles: {
              products: {
                "@media (min-width: 601px)": {
                  marginLeft: "-20px",
                },
              },
            },
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
                "@media (min-width: 601px)": {
                  maxWidth: "100%",
                  marginLeft: "0px",
                  marginBottom: "0px",
                },
              },
              button: {
                fontFamily: "Arvo, serif",
                backgroundColor: "#f59e0b",
                color: "#000000",
                ":hover": { backgroundColor: "#fbbf24" },
                ":focus": { backgroundColor: "#fbbf24" },
                borderRadius: "9999px",
              },
            },
            text: { button: "Add to cart" },
            googleFonts: ["Arvo"],
          },
          cart: {
            styles: {
              button: {
                fontFamily: "Arvo, serif",
                backgroundColor: "#f59e0b",
                color: "#000000",
                ":hover": { backgroundColor: "#fbbf24" },
                ":focus": { backgroundColor: "#fbbf24" },
                borderRadius: "9999px",
              },
            },
            text: { total: "Subtotal", button: "Checkout" },
            googleFonts: ["Arvo"],
          },
          toggle: {
            styles: {
              toggle: {
                fontFamily: "Arvo, serif",
                backgroundColor: "#f59e0b",
                color: "#000000",
                ":hover": { backgroundColor: "#fbbf24" },
                ":focus": { backgroundColor: "#fbbf24" },
                borderRadius: "9999px",
              },
            },
            googleFonts: ["Arvo"],
          },
        },
      });
    });
  });
}

export default function MerchPage() {
  // Build stable container IDs so hydration is deterministic
  const hwIds = HOMEWARES.map((id, i) => `shopify-hw-${i}`);
  const clIds = CLOTHING.map((id, i) => `shopify-cl-${i}`);
  const accIds = ACCESSORIES.map((id, i) => `shopify-acc-${i}`);

  useEffect(() => {
    let canceled = false;
    loadShopifyScript()
      .then(() => {
        if (canceled) return;
        mountProducts(hwIds, HOMEWARES);
        mountProducts(clIds, CLOTHING);
        mountProducts(accIds, ACCESSORIES);
      })
      .catch((e) => console.error("Shopify Buy Button failed to load:", e));
    return () => {
      canceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-8 border border-amber-700">
          <h1 className="text-4xl font-light text-amber-500 text-glow mb-2 text-center">
            Inkbound Merch
          </h1>
          <p className="text-center text-gray-300 mb-8">
            Cozy homewares, apparel, and reading accessories — powered by Shopify checkout.
          </p>

          {/* Quick in-page nav */}
          <div className="flex gap-3 justify-center mb-10 text-sm">
            <a href="#homewares" className="px-3 py-1 rounded-full border border-amber-700 text-amber-300 hover:bg-amber-900/30">Homewares</a>
            <a href="#clothing" className="px-3 py-1 rounded-full border border-amber-700 text-amber-300 hover:bg-amber-900/30">Clothing</a>
            <a href="#accessories" className="px-3 py-1 rounded-full border border-amber-700 text-amber-300 hover:bg-amber-900/30">Reading Accessories</a>
          </div>

          {/* Sections */}
          <Section id="homewares" title="Homewares" containerIds={hwIds} />
          <Section id="clothing" title="Clothing" containerIds={clIds} />
          <Section id="accessories" title="Reading Accessories" containerIds={accIds} />
        </div>
      </div>
    </div>
  );
}

function Section({ id, title, containerIds }: { id: string; title: string; containerIds: string[] }) {
  return (
    <section id={id} className="mb-12">
      <h2 className="text-2xl text-amber-400 mb-4">{title}</h2>
      <div className="flex flex-wrap gap-5">
        {containerIds.map((cid) => (
          <div
            key={cid}
            id={cid}
            className="min-w-[260px] flex-1 bg-black/30 border border-white/10 rounded-lg p-3"
          />
        ))}
      </div>
    </section>
  );
}

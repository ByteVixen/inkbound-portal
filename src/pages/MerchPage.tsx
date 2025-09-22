// src/pages/MerchPage.tsx
import { useEffect } from "react";
import VantaBackground from "../components/VantaBackground";

declare global {
  interface Window {
    ShopifyBuy?: any;
  }
}

const DOMAIN = "0xu58v-n0.myshopify.com";
const TOKEN = "9e614f31b48225c8e9c5bf72475f697e";

// Product IDs
const HOMEWARES = ["10750034870294", "10749996531734", "10749994139670"];
const CLOTHING  = ["10749990141974", "10750023532566", "10750030774294", "10750028709910"];
const READING   = ["10749997711382", "10750007803926"];

const ALL = [
  { title: "Homewares", ids: HOMEWARES },
  { title: "Clothing", ids: CLOTHING },
  { title: "Reading Accessories", ids: READING }
];

const THEME_OPTIONS = {
  product: {
    styles: {
      product: {
        "@media (min-width: 601px)": {
          maxWidth: "calc(25% - 20px)",
          marginLeft: "20px",
          marginBottom: "50px"
        }
      },
      button: {
        fontFamily: "Marcellus, serif",
        color: "#000",
        backgroundColor: "#d97706",
        ":hover": { backgroundColor: "#f59e0b" },
        ":focus": { backgroundColor: "#b45309" }
      }
    },
    text: { button: "Buy now" },
    buttonDestination: "checkout"
  },
  productSet: {
    styles: {
      products: {
        "@media (min-width: 601px)": { marginLeft: "-20px" }
      }
    }
  },
  modalProduct: {
    contents: { img: false, imgWithCarousel: true, button: false, buttonWithQuantity: true },
    styles: {
      product: {
        "@media (min-width: 601px)": { maxWidth: "100%", marginLeft: "0", marginBottom: "0" }
      },
      button: {
        fontFamily: "Marcellus, serif",
        color: "#000",
        backgroundColor: "#d97706",
        ":hover": { backgroundColor: "#f59e0b" },
        ":focus": { backgroundColor: "#b45309" }
      }
    },
    text: { button: "Add to cart" }
  },
  option: {},
  cart: {
    styles: {
      button: {
        fontFamily: "Marcellus, serif",
        color: "#000",
        backgroundColor: "#d97706",
        ":hover": { backgroundColor: "#f59e0b" },
        ":focus": { backgroundColor: "#b45309" }
      }
    },
    text: { total: "Subtotal", button: "Checkout" }
  },
  toggle: {
    styles: {
      toggle: {
        fontFamily: "Marcellus, serif",
        backgroundColor: "#d97706",
        ":hover": { backgroundColor: "#f59e0b" },
        ":focus": { backgroundColor: "#b45309" }
      }
    }
  }
};

function loadShopifyScript(): Promise<any> {
  return new Promise((resolve) => {
    if (window.ShopifyBuy && window.ShopifyBuy.UI) return resolve(window.ShopifyBuy);
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
    script.onload = () => resolve(window.ShopifyBuy);
    document.head.appendChild(script);
  });
}

export default function MerchPage() {
  useEffect(() => {
    let mounted = true;

    (async () => {
      const ShopifyBuy = await loadShopifyScript();
      if (!mounted) return;

      const client = ShopifyBuy.buildClient({
        domain: DOMAIN,
        storefrontAccessToken: TOKEN
      });

      ShopifyBuy.UI.onReady(client).then((ui: any) => {
        ALL.forEach((group) => {
          group.ids.forEach((productId) => {
            const nodeId = `shopify-product-${productId}`;
            const node = document.getElementById(nodeId);
            if (!node) return;
            node.innerHTML = ""; // avoid double-mounts in StrictMode

            ui.createComponent("product", {
              id: productId, // <-- renamed param makes TS happy
              node,
              moneyFormat: "€{{amount_with_comma_separator}}",
              options: THEME_OPTIONS
            });
          });
        });
      });
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-8 border border-amber-700">
          <h1 className="text-4xl font-light text-amber-500 text-glow mb-2 text-center">Merch</h1>
          <p className="text-center text-gray-300 mb-8">
            Cozy things for readers, made by the Inkbound Society.
          </p>

          {ALL.map((group) => (
            <section key={group.title} className="mb-10">
              <h2 className="text-2xl text-amber-400 mb-4">{group.title}</h2>

              <div className="flex flex-wrap -ml-5">
                {group.ids.map((productId) => (
                  <div key={productId} className="w-full sm:w-1/2 lg:w-1/3 px-5 mb-8">
                    <div id={`shopify-product-${productId}`} />
                  </div>
                ))}
              </div>
            </section>
          ))}

          <div className="text-xs text-gray-400 text-center">Powered by Shopify Buy Button.</div>
        </div>
      </div>
    </div>
  );
}

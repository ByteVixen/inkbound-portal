// src/pages/AuthorMapPage.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import Globe from "react-globe.gl";
import VantaBackground from "../components/VantaBackground";

/** Inkbound HQ (Gort, Ireland) */
const INKBOUND = {
  label: "Inkbound Bookshop (Gort, IE)",
  lat: 53.0657,
  lng: -8.8167,
};

/**
 * CENTROIDS
 * - Countries (CC)
 * - US states / CA provinces / AU states (CC:REGION)
 * - Notable cities (CC:CITY)
 * If a LOCATIONS entry can’t find a city key, it falls back to region, then country.
 */
const CENTROIDS: Record<string, { lat: number; lng: number }> = {
  // Countries
  IE: { lat: 53.1424, lng: -7.6921 },
  GB: { lat: 54.7024, lng: -3.2766 },
  US: { lat: 39.8283, lng: -98.5795 },
  CA: { lat: 56.1304, lng: -106.3468 },
  AU: { lat: -25.2744, lng: 133.7751 },
  NO: { lat: 60.472, lng: 8.4689 },
  FR: { lat: 46.2276, lng: 2.2137 },
  ES: { lat: 40.4637, lng: -3.7492 },
  IT: { lat: 41.8719, lng: 12.5674 },
  NL: { lat: 52.1326, lng: 5.2913 },
  TR: { lat: 38.9637, lng: 35.2433 },
  GR: { lat: 39.0742, lng: 21.8243 },
  CZ: { lat: 49.8175, lng: 15.4729 },
  UZ: { lat: 41.3775, lng: 64.5853 },
  LA: { lat: 19.8563, lng: 102.4955 }, // Laos
  FI: { lat: 61.9241, lng: 25.7482 },
  JP: { lat: 36.2048, lng: 138.2529 },
  BE: { lat: 50.5039, lng: 4.4699 }, // (kept for completeness)

  // --- US STATES (centers; approximate) ---
  "US:IN": { lat: 39.8, lng: -86.1 },
  "US:FL": { lat: 28.0, lng: -82.0 },
  "US:WA": { lat: 47.4, lng: -120.5 },
  "US:TN": { lat: 35.7, lng: -86.6 },
  "US:CA": { lat: 36.5, lng: -119.5 },
  "US:NC": { lat: 35.5, lng: -79.0 },
  "US:VA": { lat: 37.5, lng: -78.7 },
  "US:AZ": { lat: 34.0, lng: -111.9 },
  "US:NJ": { lat: 40.1, lng: -74.5 },
  "US:UT": { lat: 39.3, lng: -111.7 },
  "US:TX": { lat: 31.0, lng: -100.0 },
  "US:NY": { lat: 42.9, lng: -75.5 },
  "US:AL": { lat: 32.8, lng: -86.8 },
  "US:LA": { lat: 31.0, lng: -92.0 }, // Louisiana
  "US:OH": { lat: 40.4, lng: -82.8 },
  "US:OR": { lat: 44.0, lng: -120.5 },
  "US:CT": { lat: 41.6, lng: -72.7 },
  "US:GA": { lat: 32.7, lng: -83.4 },
  "US:MO": { lat: 38.3, lng: -92.5 },
  "US:IL": { lat: 40.0, lng: -89.0 },
  "US:KS": { lat: 38.5, lng: -98.0 },
  "US:PA": { lat: 41.0, lng: -77.5 },
  "US:MT": { lat: 46.9, lng: -110.0 },
  "US:NM": { lat: 34.5, lng: -106.0 },
  "US:OK": { lat: 35.6, lng: -97.5 },
  "US:NV": { lat: 39.5, lng: -116.9 },
  "US:WV": { lat: 38.6, lng: -80.5 },
  "US:ID": { lat: 44.1, lng: -114.7 },
  "US:MI": { lat: 44.3, lng: -85.6 },
  "US:SC": { lat: 33.8, lng: -80.9 },
  "US:CO": { lat: 39.0, lng: -105.5 },

  // --- CANADA PROVINCES ---
  "CA:AB": { lat: 55.0, lng: -115.0 },
  "CA:BC": { lat: 54.0, lng: -125.0 },
  "CA:QC": { lat: 52.9, lng: -71.8 },
  "CA:ON": { lat: 50.0, lng: -85.0 },
  "CA:PE": { lat: 46.3, lng: -63.3 },
  "CA:NT": { lat: 64.8, lng: -124.8 },

  // --- AUSTRALIA STATES ---
  "AU:NSW": { lat: -32.0, lng: 147.0 },
  "AU:QLD": { lat: -21.0, lng: 144.0 },
  "AU:WA": { lat: -25.0, lng: 122.0 },

  // --- IRELAND counties or towns (approx) ---
  "IE:GALWAY": { lat: 53.2707, lng: -9.0568 },
  "IE:DUBLIN": { lat: 53.3498, lng: -6.2603 },
  "IE:CORK": { lat: 51.8985, lng: -8.4756 },
  "IE:WATERFORD": { lat: 52.2593, lng: -7.1101 },
  "IE:ENNIS": { lat: 52.8436, lng: -8.9863 },
  "IE:SHANNON": { lat: 52.703, lng: -8.864 },
  "IE:KILKENNY": { lat: 52.6541, lng: -7.2448 },
  "IE:LIMERICK": { lat: 52.6638, lng: -8.6267 },
  "IE:MEATH": { lat: 53.652, lng: -6.681 }, // Navan-ish
  "IE:TULLAMORE": { lat: 53.273, lng: -7.488 },
  "IE:WESTMEATH": { lat: 53.533, lng: -7.35 }, // Mullingar-ish
  "IE:WEXFORD": { lat: 52.336, lng: -6.463 },
  "IE:LAOIS": { lat: 53.03, lng: -7.3 }, // Portlaoise-ish
  "IE:KILDARE": { lat: 53.159, lng: -6.91 },
  "IE:SLIGO": { lat: 54.27, lng: -8.47 },
  "IE:KERRY": { lat: 52.14, lng: -9.56 },
  "IE:ASHFORD": { lat: 52.99, lng: -6.11 },

  // --- UK / NI / Wales cities (approx) ---
  "GB:LONDON": { lat: 51.5074, lng: -0.1278 },
  "GB:EDINBURGH": { lat: 55.9533, lng: -3.1883 },
  "GB:ABERDEEN": { lat: 57.1497, lng: -2.0943 },
  "GB:MANCHESTER": { lat: 53.4808, lng: -2.2426 },
  "GB:LEEDS": { lat: 53.8008, lng: -1.5491 },
  "GB:SHEFFIELD": { lat: 53.3811, lng: -1.4701 },
  "GB:DONCASTER": { lat: 53.5228, lng: -1.1285 },
  "GB:MILTON KEYNES": { lat: 52.04, lng: -0.76 },
  "GB:FAREHAM": { lat: 50.8516, lng: -1.1793 },
  "GB:READING": { lat: 51.4543, lng: -0.9781 },
  "GB:WARRINGTON": { lat: 53.39, lng: -2.59 },
  "GB:HAVERFORDWEST": { lat: 51.801, lng: -4.969 }, // Wales
  "GB:SWANSEA": { lat: 51.621, lng: -3.943 }, // Wales
  "GB:BIRCOTES": { lat: 53.41, lng: -1.05 },
  "GB:COLERAINE": { lat: 55.13, lng: -6.67 }, // NI
  "GB:LARNE": { lat: 54.85, lng: -5.82 }, // NI
  "GB:BELFAST": { lat: 54.597, lng: -5.93 }, // NI
  "GB:THORNHILL": { lat: 50.9, lng: -1.4 }, // (map to Southampton area)

  // --- Big world cities mentioned ---
  "NO:TREUNGEN": { lat: 59.0305, lng: 8.5147 },
  "NO:OSLO": { lat: 59.9139, lng: 10.7522 },
  "FR:PARIS": { lat: 48.8566, lng: 2.3522 },
  "FR:MARSEILLE": { lat: 43.2965, lng: 5.3698 },
  "FR:MONDRAGON": { lat: 44.208, lng: 4.767 },
  "FR:NICE": { lat: 43.7102, lng: 7.2620 },
  "FR:ROUEN": { lat: 49.4431, lng: 1.0993 },
  "ES:MADRID": { lat: 40.4168, lng: -3.7038 },
  "ES:BARCELONA": { lat: 41.3851, lng: 2.1734 },
  "ES:SEVILLE": { lat: 37.3891, lng: -5.9845 },
  "IT:ROME": { lat: 41.9028, lng: 12.4964 },
  "NL:ALMERE": { lat: 52.3508, lng: 5.2647 },
  "TR:ISTANBUL": { lat: 41.0082, lng: 28.9784 },
  "GR:ATHENS": { lat: 37.9838, lng: 23.7275 },
  "GR:AMPELONAS": { lat: 39.733, lng: 22.406 },
  "CZ:CESKY KRUMLOV": { lat: 48.811, lng: 14.315 },
  "UZ:BUKHARA": { lat: 39.767, lng: 64.423 },
  "LA:LUANG PRABANG": { lat: 19.885, lng: 102.135 },
  "FI:HELSINKI": { lat: 60.1699, lng: 24.9384 },
  "DE:HAMBURG": { lat: 53.5488, lng: 9.9872 },
  "DE:COLOGNE": { lat: 50.9375, lng: 6.9603 },
  "JP:TOKYO": { lat: 35.6762, lng: 139.6503 },
  "JP:KYOTO": { lat: 35.0116, lng: 135.7681 },

  // --- Select US cities (used in list) ---
  "US:SEATTLE": { lat: 47.6062, lng: -122.3321 },
  "US:PHOENIX": { lat: 33.4484, lng: -112.0740 },
  "US:LOS ANGELES": { lat: 34.0522, lng: -118.2437 },
  "US:CHICAGO": { lat: 41.8781, lng: -87.6298 },
  "US:DALLAS": { lat: 32.7767, lng: -96.7970 },
  "US:FORT WORTH": { lat: 32.7555, lng: -97.3308 },
  "US:HOUSTON": { lat: 29.7604, lng: -95.3698 },
  "US:ATLANTA": { lat: 33.749, lng: -84.388 },
  "US:DETROIT": { lat: 42.3314, lng: -83.0458 },
  "US:SAN FRANCISCO": { lat: 37.7749, lng: -122.4194 },
  "US:OKLAHOMA CITY": { lat: 35.4676, lng: -97.5164 },
  "US:LAS VEGAS": { lat: 36.1699, lng: -115.1398 },
  "US:CHARLOTTE": { lat: 35.2271, lng: -80.8431 },
  "US:ST. PETERSBURG": { lat: 27.7676, lng: -82.6403 },
  "US:BROOKLYN": { lat: 40.6782, lng: -73.9442 },
  "US:EUGENE": { lat: 44.0521, lng: -123.0868 },
  "US:BOISE": { lat: 43.615, lng: -116.2023 },
  "US:NASHVILLE": { lat: 36.1627, lng: -86.7816 },
  "US:GLASTONBURY": { lat: 41.7123, lng: -72.6082 },
  "US:WATERBURY": { lat: 41.558, lng: -73.051 },
  "US:YARDLEY": { lat: 40.2415, lng: -74.8463 },
  "US:SANTA FE": { lat: 35.6870, lng: -105.9378 },
  "US:MANSFIELD": { lat: 40.7584, lng: -82.5154 },
  "US:LINDSBORG": { lat: 38.5739, lng: -97.6742 },
  "US:WEBB CITY": { lat: 37.1464, lng: -94.4633 },
};

/** Your normalized list — use city where we have it, else region/state, else country */
const LOCATIONS: Array<{ cc: string; city?: string; region?: string; label: string }> = [
  // Ireland
  { cc: "IE", city: "GALWAY", label: "Galway, Ireland" },
  { cc: "IE", region: "WESTMEATH", label: "Westmeath, Ireland" },
  { cc: "IE", city: "DUBLIN", label: "Dublin, Ireland" },
  { cc: "IE", city: "ASHFORD", label: "Ashford, Ireland" },
  { cc: "IE", city: "ENNIS", label: "Ennis, Ireland" },
  { cc: "IE", city: "SHANNON", label: "Shannon, Ireland" },
  { cc: "IE", city: "CORK", label: "Cork, Ireland" },
  { cc: "IE", city: "WATERFORD", label: "Waterford, Ireland" },
  { cc: "IE", region: "KILDARE", label: "Kildare, Ireland" },
  { cc: "IE", region: "MEATH", label: "Meath, Ireland" },
  { cc: "IE", region: "TULLAMORE", label: "Tullamore, Ireland" },
  { cc: "IE", city: "KILKENNY", label: "Kilkenny, Ireland" },
  { cc: "IE", region: "WEXFORD", label: "Wexford, Ireland" },
  { cc: "IE", region: "LAOIS", label: "Laois, Ireland" },
  { cc: "IE", region: "SLIGO", label: "Sligo, Ireland" },
  { cc: "IE", region: "KERRY", label: "Kerry, Ireland" },

  // UK & NI & Wales
  { cc: "GB", city: "EDINBURGH", label: "Edinburgh, UK" },
  { cc: "GB", city: "FAREHAM", label: "Fareham, UK" },
  { cc: "GB", city: "LONDON", label: "London, UK" },
  { cc: "GB", city: "READING", label: "Reading, UK" },
  { cc: "GB", city: "HAVERFORDWEST", label: "Haverfordwest, Wales" },
  { cc: "GB", city: "ABERDEEN", label: "Aberdeen, UK" },
  { cc: "GB", city: "MANCHESTER", label: "Manchester, UK" },
  { cc: "GB", city: "LARNE", label: "Larne, Northern Ireland" },
  { cc: "GB", city: "COLERAINE", label: "Coleraine, Northern Ireland" },
  { cc: "GB", city: "BELFAST", label: "Belfast, Northern Ireland" },
  { cc: "GB", city: "LEEDS", label: "Leeds, UK" },
  { cc: "GB", city: "SHEFFIELD", label: "Sheffield, UK" },
  { cc: "GB", city: "DONCASTER", label: "Doncaster, UK" },
  { cc: "GB", city: "BIRCOTES", label: "Bircotes, UK" },
  { cc: "GB", city: "MILTON KEYNES", label: "Milton Keynes, UK" },
  { cc: "GB", city: "THORNHILL", label: "Thornhill/Southampton, UK" },
  { cc: "GB", city: "SWANSEA", label: "Swansea, Wales" },

  // USA (states or cities)
  { cc: "US", region: "NJ", label: "New Jersey, USA" },
  { cc: "US", region: "IN", label: "Indiana, USA" },
  { cc: "US", region: "FL", label: "Florida, USA" },
  { cc: "US", city: "SEATTLE", label: "Seattle, USA" },
  { cc: "US", region: "TN", label: "Tennessee, USA" },
  { cc: "US", region: "CA", label: "California, USA" },
  { cc: "US", region: "NC", label: "North Carolina, USA" },
  { cc: "US", region: "VA", label: "Virginia, USA" },
  { cc: "US", region: "AZ", label: "Arizona, USA" },
  { cc: "US", region: "UT", label: "Utah, USA" },
  { cc: "US", region: "TX", label: "Texas, USA" },
  { cc: "US", region: "NY", label: "New York, USA" },
  { cc: "US", region: "LA", label: "Louisiana, USA" },
  { cc: "US", region: "OH", label: "Ohio, USA" },
  { cc: "US", region: "OR", label: "Oregon, USA" },
  { cc: "US", region: "CT", label: "Connecticut, USA" },
  { cc: "US", region: "GA", label: "Georgia, USA" },
  { cc: "US", region: "MO", label: "Missouri, USA" },
  { cc: "US", region: "IL", label: "Illinois, USA" },
  { cc: "US", region: "KS", label: "Kansas, USA" },
  { cc: "US", region: "PA", label: "Pennsylvania, USA" },
  { cc: "US", region: "MT", label: "Montana, USA" },
  { cc: "US", region: "NM", label: "New Mexico, USA" },
  { cc: "US", region: "OK", label: "Oklahoma, USA" },
  { cc: "US", region: "NV", label: "Nevada, USA" },
  { cc: "US", region: "WV", label: "West Virginia, USA" },
  { cc: "US", region: "ID", label: "Idaho, USA" },
  { cc: "US", region: "MI", label: "Michigan (Detroit), USA" },
  { cc: "US", region: "SC", label: "South Carolina, USA" },
  { cc: "US", region: "CO", label: "Colorado, USA" },
  // extra named cities from your list
  { cc: "US", city: "PHOENIX", label: "Phoenix, USA" },
  { cc: "US", city: "LOS ANGELES", label: "Los Angeles, USA" },
  { cc: "US", city: "CHICAGO", label: "Chicago, USA" },
  { cc: "US", city: "DALLAS", label: "Dallas, USA" },
  { cc: "US", city: "FORT WORTH", label: "Fort Worth, USA" },
  { cc: "US", city: "HOUSTON", label: "Houston, USA" },
  { cc: "US", city: "ATLANTA", label: "Atlanta, USA" },
  { cc: "US", city: "OKLAHOMA CITY", label: "Oklahoma City, USA" },
  { cc: "US", city: "LAS VEGAS", label: "Las Vegas, USA" },
  { cc: "US", city: "CHARLOTTE", label: "Charlotte, USA" },
  { cc: "US", city: "ST. PETERSBURG", label: "St. Petersburg, USA" },
  { cc: "US", city: "BROOKLYN", label: "Brooklyn, USA" },
  { cc: "US", city: "SAN FRANCISCO", label: "San Francisco, USA" },
  { cc: "US", city: "EUGENE", label: "Eugene, USA" },
  { cc: "US", city: "BOISE", label: "Boise, USA" },
  { cc: "US", city: "NASHVILLE", label: "Nashville, USA" },
  { cc: "US", city: "GLASTONBURY", label: "Glastonbury, USA" },
  { cc: "US", city: "WATERBURY", label: "Waterbury, USA" },
  { cc: "US", city: "YARDLEY", label: "Yardley, USA" },
  { cc: "US", city: "SANTA FE", label: "Santa Fe, USA" },
  { cc: "US", city: "MANSFIELD", label: "Mansfield, USA" },
  { cc: "US", city: "LINDSBORG", label: "Lindsborg, USA" },
  { cc: "US", city: "WEBB CITY", label: "Webb City, USA" },

  // Canada
  { cc: "CA", region: "AB", label: "Alberta, Canada" },
  { cc: "CA", region: "BC", label: "British Columbia, Canada" },
  { cc: "CA", region: "QC", label: "Quebec, Canada" },
  { cc: "CA", region: "ON", label: "Mississauga (Ontario), Canada" },
  { cc: "CA", region: "PE", label: "Prince Edward Island, Canada" },
  { cc: "CA", region: "NT", label: "Northwest Territories, Canada" },
  { cc: "CA", city: "CALGARY", label: "Calgary, Canada" },

  // Australia
  { cc: "AU", region: "NSW", label: "New South Wales, Australia" },
  { cc: "AU", region: "NSW", label: "Central Coast, NSW, Australia" },
  { cc: "AU", region: "QLD", label: "Kirwan (QLD), Australia" },

  // Scandinavia / Europe wide
  { cc: "NO", city: "TREUNGEN", label: "Treungen, Norway" },
  { cc: "NO", city: "OSLO", label: "Oslo, Norway" },
  { cc: "FR", city: "PARIS", label: "Paris, France" },
  { cc: "FR", city: "MARSEILLE", label: "Marseille, France" },
  { cc: "FR", city: "MONDRAGON", label: "Mondragon, France" },
  { cc: "FR", city: "NICE", label: "Nice, France" },
  { cc: "FR", city: "ROUEN", label: "Rouen, France" },
  { cc: "ES", city: "MADRID", label: "Madrid, Spain" },
  { cc: "ES", city: "BARCELONA", label: "Barcelona, Spain" },
  { cc: "ES", city: "SEVILLE", label: "Seville, Spain" },
  { cc: "IT", city: "ROME", label: "Rome, Italy" },
  { cc: "NL", city: "ALMERE", label: "Almere, Netherlands" },
  { cc: "TR", city: "ISTANBUL", label: "Istanbul, Turkey" },
  { cc: "GR", city: "ATHENS", label: "Athens, Greece" },
  { cc: "GR", city: "AMPELONAS", label: "Ampelonas, Greece" },
  { cc: "CZ", city: "CESKY KRUMLOV", label: "Český Krumlov, Czech Republic" },
  { cc: "UZ", city: "BUKHARA", label: "Bukhara, Uzbekistan" },
  { cc: "LA", city: "LUANG PRABANG", label: "Luang Prabang, Laos" },
  { cc: "FI", city: "HELSINKI", label: "Helsinki, Finland" },
  { cc: "DE", city: "HAMBURG", label: "Hamburg, Germany" },
  { cc: "DE", city: "COLOGNE", label: "Cologne, Germany" },
  { cc: "JP", city: "TOKYO", label: "Tokyo, Japan" },
  { cc: "JP", city: "KYOTO", label: "Kyoto, Japan" },
];

/** Convert a location to a lat/lng using CENTROIDS with fallbacks. */
function resolveLoc(loc: { cc: string; city?: string; region?: string; label: string }) {
  const cc = loc.cc.toUpperCase();
  const tryKeys = [
    loc.city ? `${cc}:${loc.city.toUpperCase()}` : "",
    loc.region ? `${cc}:${loc.region.toUpperCase()}` : "",
    cc,
  ].filter(Boolean);
  for (const k of tryKeys) {
    const c = CENTROIDS[k];
    if (c) return { ...c, label: loc.label };
  }
  // final fallback to country center if somehow missing
  const ctry = CENTROIDS[cc] || { lat: 0, lng: 0 };
  return { ...ctry, label: loc.label };
}

type Point = { lat: number; lng: number; label: string };

export default function AuthorMapPage() {
  const globeRef = useRef<any>(null);
  const [logoTex, setLogoTex] = useState<THREE.Texture | null>(null);
  const [glowTex, setGlowTex] = useState<THREE.Texture | null>(null);
  const [pointScale, setPointScale] = useState(0.35); // will shrink when you zoom in

  // Load the logo texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load("/logo.png", (tex) => setLogoTex(tex), undefined, () => setLogoTex(null));
  }, []);

  // Build a soft radial glow sprite via canvas
  useEffect(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grd = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grd.addColorStop(0.0, "rgba(255, 210, 90, 0.45)");
      grd.addColorStop(0.6, "rgba(255, 210, 90, 0.15)");
      grd.addColorStop(1.0, "rgba(255, 210, 90, 0.0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(canvas);
      setGlowTex(tex);
    }
  }, []);

  // ensure centered on Ireland on load
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    g.pointOfView({ lat: 53.5, lng: -8.5, altitude: 1.8 }, 0);
  }, []);

  // track camera distance => adjust point size (smaller when zoomed in)
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const g = globeRef.current;
      if (g && g.camera) {
        const dist = g.camera().position.length(); // ~100 is surface distance baseline
        // Map distance to a reasonable scale (close => smaller)
        const s = Math.min(0.55, Math.max(0.2, (dist - 80) / 200)); // clamp 0.2–0.55
        setPointScale(s);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const points: Point[] = useMemo(
    () => LOCATIONS.map(resolveLoc),
    []
  );

  const arcs = useMemo(
    () =>
      points.map((p) => ({
        startLat: p.lat,
        startLng: p.lng,
        endLat: INKBOUND.lat,
        endLng: INKBOUND.lng,
      })),
    [points]
  );

  const globeTexture = "//unpkg.com/three-globe/example/img/earth-night.jpg";

  // Custom sprite at Inkbound (glow + logo)
  const customLayerData = useMemo(() => [{ lat: INKBOUND.lat, lng: INKBOUND.lng }], []);
  const customThreeObject = () => {
    const group = new THREE.Group();

    if (glowTex) {
      const glowMat = new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false });
      const glow = new THREE.Sprite(glowMat);
      glow.scale.set(26, 26, 1); // bigger than logo for halo
      group.add(glow);
    }

    if (logoTex) {
      const logoMat = new THREE.SpriteMaterial({ map: logoTex, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(logoMat);
      sprite.scale.set(10, 10, 1);
      group.add(sprite);
    }

    return group;
  };
  const customThreeObjectUpdate = (obj: THREE.Object3D, d: any) => {
    const g = globeRef.current;
    if (!g) return;
    const pos = g.getCoords(d.lat, d.lng, 0.01);
    obj.position.copy(pos);
  };

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0"><VantaBackground /></div>

      <div className="relative z-10 py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8 border border-amber-700">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left copy */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-light text-amber-500 text-glow mb-3">🌍 Inkbound Map of Creators</h1>
              <p className="text-gray-300 mb-4">
                Pins mark places in our community — every thread connects back to our little shop in Gort.
              </p>
              <div className="text-sm text-gray-400">
                Zoom in to see more — pins shrink so you can hover & read labels cleanly.
              </div>
            </div>

            {/* Globe */}
            <div className="lg:col-span-3">
              <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[620px] rounded-xl overflow-hidden border border-amber-700 bg-black/50">
                <Globe
                  ref={globeRef}
                  width={undefined}
                  height={undefined}
                  backgroundColor="rgba(0,0,0,0)"
                  globeImageUrl={globeTexture}
                  atmosphereColor="#ffffff"           // avoid alpha warning
                  atmosphereAltitude={0.12}
                  showGraticules={false}

                  // Points
                  pointsData={points}
                  pointLat={(p: Point) => p.lat}
                  pointLng={(p: Point) => p.lng}
                  pointAltitude={() => 0.006}
                  pointRadius={() => pointScale}      // dynamic with zoom
                  pointColor={() => "rgba(245, 158, 11, 0.65)"} // subtle amber

                  // Labels
                  pointLabel={(p: Point) =>
                    `<div style="padding:6px 8px;font-size:12px"><b>${p.label}</b></div>`
                  }

                  // Arcs back to Inkbound
                  arcsData={arcs}
                  arcColor={() => ["rgba(245,158,11,0.35)", "rgba(245,158,11,0.12)"]}
                  arcStroke={0.45}
                  arcAltitudeAutoScale={0.6}
                  arcDashLength={0.9}
                  arcDashGap={0.2}
                  arcDashAnimateTime={3500}

                  // Inkbound marker (logo + glow), no label/dot
                  customLayerData={customLayerData}
                  customThreeObject={customThreeObject}
                  customThreeObjectUpdate={customThreeObjectUpdate}
                />
                <div className="absolute left-3 bottom-3 text-xs text-gray-300 bg-black/50 rounded px-2 py-1 border border-white/10">
                  Drag to rotate • Scroll to zoom
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

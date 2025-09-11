// src/pages/AuthorMapPage.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import Globe from "react-globe.gl";
import VantaBackground from "../components/VantaBackground";

/* --- Inkbound HQ (Gort, IE) --- */
const INKBOUND = { lat: 53.0657, lng: -8.8167 };

/* --- Country & City centroids (extend any time) --- */
const CENTROIDS: Record<string, { lat: number; lng: number }> = {
  // Countries
  IE: { lat: 53.1424, lng: -7.6921 },
  GB: { lat: 54.7024, lng: -3.2766 },
  US: { lat: 39.8283, lng: -98.5795 },
  CA: { lat: 56.1304, lng: -106.3468 },
  AU: { lat: -25.2744, lng: 133.7751 },
  NZ: { lat: -40.9006, lng: 174.886 },
  FR: { lat: 46.2276, lng: 2.2137 },
  DE: { lat: 51.1657, lng: 10.4515 },
  ES: { lat: 40.4637, lng: -3.7492 },
  IT: { lat: 41.8719, lng: 12.5674 },
  IN: { lat: 20.5937, lng: 78.9629 },
  NO: { lat: 60.472, lng: 8.4689 },
  NL: { lat: 52.1326, lng: 5.2913 },
  TR: { lat: 38.9637, lng: 35.2433 },
  GR: { lat: 39.0742, lng: 21.8243 },

  // A few cities you referenced (add more as you like)
  "IE:DUBLIN": { lat: 53.3498, lng: -6.2603 },
  "IE:GALWAY": { lat: 53.2707, lng: -9.0568 },
  "IE:CORK": { lat: 51.8985, lng: -8.4756 },
  "IE:WATERFORD": { lat: 52.2593, lng: -7.1101 },
  "GB:LONDON": { lat: 51.5074, lng: -0.1278 },
  "GB:EDINBURGH": { lat: 55.9533, lng: -3.1883 },
  "GB:SOUTHAMPTON": { lat: 50.9097, lng: -1.4043 },
  "GB:PRESTON": { lat: 53.7632, lng: -2.7031 },
  "GB:READING": { lat: 51.4543, lng: -0.9781 },
  "GB:ABERDEEN": { lat: 57.1497, lng: -2.0943 },
  "US:PHOENIX": { lat: 33.4484, lng: -112.074 },
  "US:CHICAGO": { lat: 41.8781, lng: -87.6298 },
  "US:NASHVILLE": { lat: 36.1627, lng: -86.7816 },
  "US:LAS VEGAS": { lat: 36.1699, lng: -115.1398 },
  "US:SAN FRANCISCO": { lat: 37.7749, lng: -122.4194 },
  "US:OKLAHOMA CITY": { lat: 35.4676, lng: -97.5164 },
  "US:EL PASO": { lat: 31.7619, lng: -106.485 },
  "US:BOISE": { lat: 43.615, lng: -116.2023 },
  "CA:CALGARY": { lat: 51.0447, lng: -114.0719 },
  "CA:LLOYDMINSTER": { lat: 53.2783, lng: -110.0056 },
  "CA:VANCOUVER ISLAND": { lat: 49.65, lng: -125.45 }, // Lazo-ish
  "NO:TREUNGEN": { lat: 59.0305, lng: 8.5147 },
  "TR:ISTANBUL": { lat: 41.0082, lng: 28.9784 },
  "FR:PARIS": { lat: 48.8566, lng: 2.3522 },
  "FR:ROUEN": { lat: 49.4431, lng: 1.0993 },
  "NL:ALMERE": { lat: 52.3508, lng: 5.2647 },
  "GR:AMPELONAS": { lat: 39.733, lng: 22.406 }
};

/**
 * Your locations list: keep adding to this and everything will show.
 * If a city key (e.g. "IE:ARDRAHAN") isn't in CENTROIDS, we fall back to the country center.
 */
const LOCATIONS: Array<{ countryCode: string; city?: string; label: string }> = [
  // Ireland
  { countryCode: "IE", city: "Ardrahan", label: "Ardrahan, Ireland" },
  { countryCode: "IE", city: "Ashford", label: "Ashford, Ireland" },
  { countryCode: "IE", city: "Ennis", label: "Ennis, Ireland" },
  { countryCode: "IE", city: "Shannon", label: "Shannon, Ireland" },
  { countryCode: "IE", city: "Cork", label: "Cork, Ireland" },
  { countryCode: "IE", city: "Waterford", label: "Waterford, Ireland" },
  { countryCode: "IE", city: "Clondalkin", label: "Clondalkin, Ireland" },
  { countryCode: "IE", city: "Tubbercurry", label: "Tubbercurry, Ireland" },
  { countryCode: "IE", city: "Kildare", label: "Kildare, Ireland" },
  { countryCode: "IE", city: "Moate", label: "Moate, Ireland" },
  { countryCode: "IE", city: "Kilkenny", label: "Kilkenny, Ireland" },
  { countryCode: "IE", city: "Newcastle", label: "Newcastle, Ireland" },
  { countryCode: "IE", city: "Salthill", label: "Salthill, Ireland" },
  { countryCode: "IE", city: "Athy", label: "Athy, Ireland" },
  { countryCode: "IE", city: "Ballylinan", label: "Ballylinan, Ireland" },
  { countryCode: "IE", city: "Ashbourne", label: "Ashbourne, Ireland" },
  { countryCode: "IE", city: "Clane", label: "Clane, Ireland" },
  { countryCode: "IE", city: "Galway", label: "Galway, Ireland" },
  { countryCode: "IE", city: "Dublin", label: "Dublin, Ireland" },

  // UK
  { countryCode: "GB", city: "Edinburgh", label: "Edinburgh, United Kingdom" },
  { countryCode: "GB", city: "London", label: "London, United Kingdom" },
  { countryCode: "GB", city: "Southampton", label: "Southampton, United Kingdom" },
  { countryCode: "GB", city: "Preston", label: "Preston, United Kingdom" },
  { countryCode: "GB", city: "Holbeach", label: "Holbeach, United Kingdom" },
  { countryCode: "GB", city: "Gainsborough", label: "Gainsborough, United Kingdom" },
  { countryCode: "GB", city: "Watford", label: "Watford, United Kingdom" },
  { countryCode: "GB", city: "Aberdeen", label: "Aberdeen, United Kingdom" },
  { countryCode: "GB", city: "Bury", label: "Bury, United Kingdom" },
  { countryCode: "GB", city: "Larne", label: "Larne, United Kingdom" },
  { countryCode: "GB", city: "Hexham", label: "Hexham, United Kingdom" },
  { countryCode: "GB", city: "Milton Keynes", label: "Milton Keynes, United Kingdom" },
  { countryCode: "GB", city: "Fareham", label: "Fareham, United Kingdom" },
  { countryCode: "GB", city: "Swansea", label: "Swansea, United Kingdom" },
  { countryCode: "GB", city: "Blackburn", label: "Blackburn, United Kingdom" },
  { countryCode: "GB", city: "Reading", label: "Reading, United Kingdom" },
  { countryCode: "GB", city: "Coleraine", label: "Coleraine, United Kingdom" },
  { countryCode: "GB", city: "Bircotes", label: "Bircotes, United Kingdom" },
  { countryCode: "GB", city: "New Mills", label: "New Mills, United Kingdom" },

  // USA (selection from your list)
  { countryCode: "US", city: "Westfield", label: "Westfield, IN, USA" },
  { countryCode: "US", city: "Cleveland", label: "Cleveland, TN, USA" },
  { countryCode: "US", city: "Kernersville", label: "Kernersville, NC, USA" },
  { countryCode: "US", city: "Locust Grove", label: "Locust Grove, VA, USA" },
  { countryCode: "US", city: "Phoenix", label: "Phoenix, AZ, USA" },
  { countryCode: "US", city: "McKinney", label: "McKinney, TX, USA" },
  { countryCode: "US", city: "Lakeland", label: "Lakeland, TN, USA" },
  { countryCode: "US", city: "Hickory", label: "Hickory, NC, USA" },
  { countryCode: "US", city: "El Paso", label: "El Paso, TX, USA" },
  { countryCode: "US", city: "Ooltewah", label: "Ooltewah, TN, USA" },
  { countryCode: "US", city: "Charlotte", label: "Charlotte, NC, USA" },
  { countryCode: "US", city: "St. Petersburg", label: "St. Petersburg, FL, USA" },
  { countryCode: "US", city: "Brooklyn", label: "Brooklyn, NY, USA" },
  { countryCode: "US", city: "Apple Valley", label: "Apple Valley, CA, USA" },
  { countryCode: "US", city: "Soquel", label: "Soquel, CA, USA" },
  { countryCode: "US", city: "Ashland", label: "Ashland, OH, USA" },
  { countryCode: "US", city: "Sisters", label: "Sisters, OR, USA" },
  { countryCode: "US", city: "Glastonbury", label: "Glastonbury, CT, USA" },
  { countryCode: "US", city: "Clayton", label: "Clayton, NC, USA" },

  // Canada
  { countryCode: "CA", city: "Lloydminster", label: "Lloydminster, Canada" },
  { countryCode: "CA", city: "Lazo", label: "Lazo, Canada" },
  { countryCode: "CA", city: "Calgary", label: "Calgary, Canada" },

  // Norway / Turkey / France / Netherlands / Greece
  { countryCode: "NO", city: "Treungen", label: "Treungen, Norway" },
  { countryCode: "TR", city: "Istanbul", label: "Istanbul, Turkey" },
  { countryCode: "FR", city: "Paris", label: "Paris, France" },
  { countryCode: "FR", city: "Rouen", label: "Rouen, France" },
  { countryCode: "NL", city: "Almere", label: "Almere, Netherlands" },
  { countryCode: "GR", city: "Ampelonas", label: "Ampelonas, Greece" }
];

type Point = { lat: number; lng: number; label: string };

export default function AuthorMapPage() {
  const globeRef = useRef<any>(null);
  const [autoRotate, setAutoRotate] = useState(false); // start static to make hovering easier
  const [logoTex, setLogoTex] = useState<THREE.Texture | null>(null);
  const [camAlt, setCamAlt] = useState(1.8); // camera altitude for zoom-responsive pin size

  // Load logo for Inkbound sprite
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load("/logo.png", setLogoTex, undefined, () => setLogoTex(null));
  }, []);

  // Center the globe on Ireland initially
  useEffect(() => {
    globeRef.current?.pointOfView({ lat: 53.5, lng: -8.5, altitude: 1.8 }, 0);
  }, []);

  // Toggle auto-rotate
  useEffect(() => {
    const controls = globeRef.current?.controls?.();
    if (!controls) return;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.6;
  }, [autoRotate]);

  // Track camera altitude so pins shrink when zooming in
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    const controls = g.controls();
    const onChange = () => {
      const cam = g.camera();
      const dist = cam.position.length();
      const R = 100; // globe radius in three-globe
      const alt = Math.max(0, dist / R - 1); // ~0 when close, grows as you zoom out
      setCamAlt(alt);
    };
    controls.addEventListener("change", onChange);
    onChange();
    return () => controls.removeEventListener("change", onChange);
  }, []);

  // Resolve LOCATIONS -> points using centroids; fall back to country center
  const points = useMemo<Point[]>(() => {
    const out: Point[] = [];
    for (const loc of LOCATIONS) {
      const cc = String(loc.countryCode).toUpperCase().trim();
      const cityKey = loc.city ? `${cc}:${loc.city}`.toUpperCase().trim() : cc;
      const cityCentroid = CENTROIDS[cityKey];
      const countryCentroid = CENTROIDS[cc];

      const coord = cityCentroid || countryCentroid;
      if (!coord) {
        console.warn(`[AuthorMap] Missing centroid for "${cityKey}" and country "${cc}".`);
        continue;
      }
      out.push({ lat: coord.lat, lng: coord.lng, label: loc.label });
    }
    return out;
  }, []);

  // Arcs from every point back to Inkbound
  const arcs = useMemo(
    () =>
      points.map((p) => ({
        startLat: p.lat,
        startLng: p.lng,
        endLat: INKBOUND.lat,
        endLng: INKBOUND.lng
      })),
    [points]
  );

  // Custom sprite for Inkbound logo + soft pulsing glow ring (no text / no dot)
  const customLayerData = useMemo(() => [{ lat: INKBOUND.lat, lng: INKBOUND.lng }], []);
  const customThreeObject = () => {
    const group = new THREE.Group();
    if (logoTex) {
      const material = new THREE.SpriteMaterial({ map: logoTex, transparent: true });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(10, 10, 1); // adjust logo size here
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

  const globeTexture = "//unpkg.com/three-globe/example/img/earth-night.jpg";

  // Pin size = smaller when zoomed-in (camAlt ~ 0), bigger when zoomed-out
  const pinRadius = useMemo(() => {
    // clamp camAlt into [0, 2] and map to [0.08 .. 0.35]
    const a = Math.max(0, Math.min(2, camAlt));
    return 0.08 + (0.35 - 0.08) * (a / 2);
  }, [camAlt]);

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      <div className="relative z-10 py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-xl shadow-xl p-6 md:p-8 border border-amber-700">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left panel */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-light text-amber-500 text-glow mb-3">
                🌍 Inkbound Map of Creators
              </h1>
              <p className="text-gray-300 mb-4">
                Pins mark places in our community. All threads arc back to Gort—home of the
                Inkbound Society.
              </p>
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setAutoRotate((v) => !v)}
                  className="px-3 py-1 rounded border border-amber-700 bg-amber-900/20 hover:bg-amber-900/30"
                >
                  {autoRotate ? "⏸ Pause spin" : "▶️ Auto-spin"}
                </button>
                <button
                  onClick={() =>
                    globeRef.current?.pointOfView({ lat: 53.5, lng: -8.5, altitude: 1.8 }, 900)
                  }
                  className="px-3 py-1 rounded border border-white/20 hover:bg-white/10"
                >
                  🎯 Recenter on Ireland
                </button>
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
                  atmosphereColor="rgba(255,255,255,0.35)"
                  atmosphereAltitude={0.18}
                  showGraticules={false}
                  // Pins (shrink on zoom-in via pinRadius)
                  pointsData={points}
                  pointLat={(p: Point) => p.lat}
                  pointLng={(p: Point) => p.lng}
                  pointAltitude={() => 0.004}
                  pointRadius={() => pinRadius}
                  pointColor={() => "rgba(245, 158, 11, 0.7)"} // softer amber
                  // Arcs to Inkbound
                  arcsData={arcs}
                  arcColor={() => ["rgba(245,158,11,0.35)", "rgba(245,158,11,0.15)"]}
                  arcStroke={0.5}
                  arcAltitudeAutoScale={0.6}
                  arcDashLength={0.9}
                  arcDashGap={0.2}
                  arcDashAnimateTime={3600}
                  // No label/dot for Inkbound—just soft pulse glow around the logo
                  ringsData={[{ lat: INKBOUND.lat, lng: INKBOUND.lng }]}
                  ringColor={() => (t: number) => `rgba(16,185,129,${0.65 * (1 - t)})`}
                  ringMaxRadius={4.5}
                  ringPropagationSpeed={1.7}
                  ringRepeatPeriod={1400}
                  // Custom sprite (logo)
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

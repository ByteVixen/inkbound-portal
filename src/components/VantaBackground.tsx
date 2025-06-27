// src/components/VantaBackground.tsx
import { useState, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
// @ts-ignore
import VANTAFOG from "vanta/dist/vanta.fog.min";

export default function VantaBackground() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      const effect = VANTAFOG({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        highlightColor: 0x4a00ff,
        midtoneColor: 0x140403,
        lowlightColor: 0x111011,
        baseColor: 0x070707,
        blurFactor: 0.4,
        speed: 1.0,
      });
      setVantaEffect(effect);
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 -z-10 w-full h-full"
    />
  );
}

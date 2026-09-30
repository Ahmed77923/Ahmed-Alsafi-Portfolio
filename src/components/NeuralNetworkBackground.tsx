import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cx } from "../lib/utils";

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/** Deterministic PRNG so each layer's field doesn't reshuffle on every re-render. */
function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createDotTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.95)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.35)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

interface Layer {
  name: "foreground" | "middle" | "background";
  count: number;
  z: [number, number];
  x: number;
  y: number;
  size: number;
  opacity: number;
  lineOpacity: number;
  parallax: number;
  edges: boolean;
  maxDist: number;
  maxPerNode: number;
  seed: number;
}

/** Three depth bands: a few large near nodes, a denser mid web, and a dim distant haze. */
function getLayers(isMobile: boolean): Layer[] {
  const s = isMobile ? 0.62 : 1;
  return [
    {
      name: "foreground",
      count: isMobile ? 6 : 11,
      z: [2.2, 4.4],
      x: 9 * s,
      y: 5.5 * s,
      size: isMobile ? 0.24 : 0.32,
      opacity: 1,
      lineOpacity: 0.5,
      parallax: 0.55,
      edges: true,
      maxDist: 3.4,
      maxPerNode: 2,
      seed: 101,
    },
    {
      name: "middle",
      count: isMobile ? 15 : 28,
      z: [-1.6, 1.6],
      x: 12 * s,
      y: 7 * s,
      size: isMobile ? 0.12 : 0.17,
      opacity: 0.8,
      lineOpacity: 0.3,
      parallax: 0.26,
      edges: true,
      maxDist: 3,
      maxPerNode: 3,
      seed: 202,
    },
    {
      name: "background",
      count: isMobile ? 10 : 20,
      z: [-4.8, -2.4],
      x: 13 * s,
      y: 8 * s,
      size: isMobile ? 0.05 : 0.07,
      opacity: isMobile ? 0.3 : 0.4,
      lineOpacity: 0,
      parallax: 0.1,
      edges: false,
      maxDist: 0,
      maxPerNode: 0,
      seed: 303,
    },
  ];
}

interface LayerField {
  base: Float32Array;
  phases: Float32Array;
  amps: Float32Array;
  edges: Array<[number, number]>;
  highlighted: Set<number>;
}

/** Lay out one layer's nodes and connect each to its nearest neighbors within range. */
function buildLayerField(layer: Layer): LayerField {
  const rand = mulberry32(layer.seed);
  const { count } = layer;
  const base = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const amps = new Float32Array(count);
  const [zMin, zMax] = layer.z;

  for (let i = 0; i < count; i++) {
    base[i * 3] = (rand() - 0.4) * layer.x;
    base[i * 3 + 1] = (rand() - 0.5) * layer.y;
    base[i * 3 + 2] = zMin + rand() * (zMax - zMin);
    phases[i] = rand() * Math.PI * 2;
    amps[i] = 0.1 + rand() * 0.18;
  }

  const edges: Array<[number, number]> = [];
  if (layer.edges && count > 1) {
    const edgeKeys = new Set<string>();
    for (let i = 0; i < count; i++) {
      const candidates: Array<{ j: number; d: number }> = [];
      for (let j = 0; j < count; j++) {
        if (i === j) continue;
        const dx = base[i * 3] - base[j * 3];
        const dy = base[i * 3 + 1] - base[j * 3 + 1];
        const dz = base[i * 3 + 2] - base[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < layer.maxDist) candidates.push({ j, d });
      }
      candidates.sort((a, b) => a.d - b.d);
      for (const { j } of candidates.slice(0, layer.maxPerNode)) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!edgeKeys.has(key)) {
          edgeKeys.add(key);
          edges.push(i < j ? [i, j] : [j, i]);
        }
      }
    }
  }

  const highlighted = new Set<number>();
  if (layer.name !== "background" && count > 0) {
    const highlightCount = Math.max(1, Math.round(count * 0.14));
    while (highlighted.size < highlightCount) {
      highlighted.add(Math.floor(rand() * count));
    }
  }

  return { base, phases, amps, edges, highlighted };
}

function readAccentColors() {
  const styles = getComputedStyle(document.documentElement);
  const base = styles.getPropertyValue("--accent2").trim() || "#5aa9e6";
  const highlight = styles.getPropertyValue("--accent").trim() || "#f2a93c";
  const bg = styles.getPropertyValue("--bg").trim() || "#12141a";
  return { base, highlight, bg };
}

function LayerMesh({
  layer,
  reducedMotion,
  baseColor,
  highlightColor,
  blending,
  pointer,
}: {
  layer: Layer;
  reducedMotion: boolean;
  baseColor: THREE.Color;
  highlightColor: THREE.Color;
  blending: THREE.Blending;
  pointer: { current: { x: number; y: number } };
}) {
  const field = useMemo(() => buildLayerField(layer), [layer]);
  const dotTexture = useMemo(() => createDotTexture(), []);
  const livePositions = useMemo(() => new Float32Array(field.base), [field]);
  const edgePositions = useMemo(() => {
    const arr = new Float32Array(field.edges.length * 6);
    field.edges.forEach(([a, b], e) => {
      arr[e * 6] = field.base[a * 3];
      arr[e * 6 + 1] = field.base[a * 3 + 1];
      arr[e * 6 + 2] = field.base[a * 3 + 2];
      arr[e * 6 + 3] = field.base[b * 3];
      arr[e * 6 + 4] = field.base[b * 3 + 1];
      arr[e * 6 + 5] = field.base[b * 3 + 2];
    });
    return arr;
  }, [field]);
  const pointColors = useMemo(() => {
    const arr = new Float32Array(layer.count * 3);
    for (let i = 0; i < layer.count; i++) {
      const c = field.highlighted.has(i) ? highlightColor : baseColor;
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [layer.count, field, baseColor, highlightColor]);

  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  useFrame((state, delta) => {
    if (document.hidden) return;
    const t = state.clock.elapsedTime;

    if (!reducedMotion) {
      for (let i = 0; i < layer.count; i++) {
        const phase = field.phases[i];
        const amp = field.amps[i];
        livePositions[i * 3] = field.base[i * 3] + Math.sin(t * 0.22 + phase) * amp;
        livePositions[i * 3 + 1] = field.base[i * 3 + 1] + Math.cos(t * 0.18 + phase) * amp * 0.8;
        livePositions[i * 3 + 2] = field.base[i * 3 + 2] + Math.sin(t * 0.15 + phase * 1.3) * amp * 0.6;
      }
      (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      if (layer.edges && linesRef.current) {
        for (let e = 0; e < field.edges.length; e++) {
          const [a, b] = field.edges[e];
          edgePositions[e * 6] = livePositions[a * 3];
          edgePositions[e * 6 + 1] = livePositions[a * 3 + 1];
          edgePositions[e * 6 + 2] = livePositions[a * 3 + 2];
          edgePositions[e * 6 + 3] = livePositions[b * 3];
          edgePositions[e * 6 + 4] = livePositions[b * 3 + 1];
          edgePositions[e * 6 + 5] = livePositions[b * 3 + 2];
        }
        (linesRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      }
    }

    // Depth-scaled parallax: near layers drift more than far ones, which is
    // what actually reads as "3D" rather than a flat, uniformly-moving field.
    const targetX = pointer.current.x * layer.parallax;
    const targetY = -pointer.current.y * layer.parallax * 0.7;
    const ease = reducedMotion ? 1 : Math.min(delta * 1.4, 1);
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * ease;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * ease;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[livePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[pointColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={layer.size}
          map={dotTexture}
          vertexColors
          transparent
          opacity={layer.opacity}
          alphaTest={0.01}
          depthWrite={false}
          sizeAttenuation
          blending={blending}
        />
      </points>
      {layer.edges && field.edges.length > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color={baseColor}
            transparent
            opacity={layer.lineOpacity}
            depthWrite={false}
            blending={blending}
          />
        </lineSegments>
      )}
    </group>
  );
}

function Scene({
  layers,
  reducedMotion,
  blending,
  bgColor,
}: {
  layers: Layer[];
  reducedMotion: boolean;
  blending: THREE.Blending;
  bgColor: string;
}) {
  const colors = useMemo(() => readAccentColors(), []);
  const baseColor = useMemo(() => new THREE.Color(colors.base), [colors]);
  const highlightColor = useMemo(() => new THREE.Color(colors.highlight), [colors]);
  const pointer = useRef({ x: 0, y: 0 });
  const outerRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    if (reducedMotion) return;
    const handleMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [reducedMotion]);

  useFrame((state) => {
    if (document.hidden || reducedMotion) return;
    const t = state.clock.elapsedTime;
    outerRef.current.rotation.y = Math.sin(t * 0.04) * 0.06;
    outerRef.current.rotation.x = Math.cos(t * 0.035) * 0.03;
  });

  return (
    <>
      <fog attach="fog" args={[bgColor, 5.5, 14]} />
      <group ref={outerRef}>
        {layers.map((layer) => (
          <LayerMesh
            key={layer.name}
            layer={layer}
            reducedMotion={reducedMotion}
            baseColor={baseColor}
            highlightColor={highlightColor}
            blending={blending}
            pointer={pointer}
          />
        ))}
      </group>
    </>
  );
}

export function NeuralNetworkBackground({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") ?? "dark",
  );
  const [pageVisible, setPageVisible] = useState(true);
  const [webglOK] = useState(supportsWebGL);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(query.matches);
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const target = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(target.getAttribute("data-theme") ?? "dark");
    });
    observer.observe(target, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (!webglOK) return null;

  const layers = getLayers(isMobile);
  const blending = theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending;
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim() || "#12141a";

  return (
    <div
      className={cx(
        "pointer-events-none transition-opacity duration-[1400ms] ease-out",
        mounted ? "opacity-100" : "opacity-0",
        className,
      )}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={!pageVisible ? "never" : reducedMotion ? "demand" : "always"}
      >
        <Scene
          key={`${theme}-${isMobile}`}
          layers={layers}
          reducedMotion={reducedMotion}
          blending={blending}
          bgColor={bgColor}
        />
      </Canvas>
    </div>
  );
}

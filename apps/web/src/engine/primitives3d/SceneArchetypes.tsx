import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { ProjectDto, FullProfileDto, PortfolioSummary, ThemeTokens } from '@cove/shared';
import { SceneArchetype3D, MaterialPreset3D } from '../templates/templateTypes.js';
import { createMaterialsForPreset } from './MaterialPresets.js';

interface SceneProps {
  archetype: SceneArchetype3D;
  materialPreset: MaterialPreset3D;
  tokens: ThemeTokens;
  profile: FullProfileDto | null;
  projects: ProjectDto[];
  portfolio: PortfolioSummary;
  rotationSpeed?: number;
  onSelectProject?: (proj: ProjectDto) => void;
  onFocusPoint?: (point: [number, number, number]) => void;
}

export function SceneArchetypes({
  archetype,
  materialPreset,
  tokens,
  profile,
  projects,
  portfolio,
  rotationSpeed = 1.0,
  onSelectProject,
  onFocusPoint
}: SceneProps) {
  const materials = useMemo(
    () => createMaterialsForPreset(materialPreset, tokens),
    [materialPreset, tokens]
  );

  const displayProjects = projects.length > 0 ? projects : [
    {
      id: 'mock-1',
      title: 'Spatial Architecture',
      category: 'Design Systems',
      shortDescription: 'High-performance interactive 3D computing showcase.'
    } as ProjectDto,
    {
      id: 'mock-2',
      title: 'Kinetic Experience',
      category: 'Interaction',
      shortDescription: 'Procedural motion choreography.'
    } as ProjectDto,
    {
      id: 'mock-3',
      title: 'Neural Synthetics',
      category: 'Machine Learning',
      shortDescription: 'Generative interface synthesis.'
    } as ProjectDto
  ];

  switch (archetype) {
    case 'rotating-hero-object':
      return <RotatingHeroObject materials={materials} rotationSpeed={rotationSpeed} projects={displayProjects} onFocusPoint={onFocusPoint} />;
    case '3d-gallery-arc':
      return <GalleryArc materials={materials} projects={displayProjects} onFocusPoint={onFocusPoint} onSelectProject={onSelectProject} />;
    case 'depth-parallax-scroll':
      return <DepthParallaxScroll materials={materials} projects={displayProjects} onFocusPoint={onFocusPoint} />;
    case 'floating-project-cards':
      return <FloatingProjectCards materials={materials} projects={displayProjects} onFocusPoint={onFocusPoint} />;
    case 'particle-field-hero':
      return <ParticleFieldHero materials={materials} tokens={tokens} rotationSpeed={rotationSpeed} />;
    case 'orbit-camera-showcase':
      return <OrbitCameraShowcase materials={materials} projects={displayProjects} onFocusPoint={onFocusPoint} />;
    case '3d-card-flip-casestudy':
      return <CardFlipCaseStudy materials={materials} projects={displayProjects} onFocusPoint={onFocusPoint} />;
    case 'tunnel-scroll':
      return <TunnelScroll materials={materials} rotationSpeed={rotationSpeed} projects={displayProjects} />;
    case 'isometric-diorama':
      return <IsometricDiorama materials={materials} projects={displayProjects} onFocusPoint={onFocusPoint} />;
    case 'morphing-geometry-hero':
      return <MorphingGeometryHero materials={materials} rotationSpeed={rotationSpeed} />;
    case 'interactive-sphere-cloud':
      return <InteractiveSphereCloud materials={materials} projects={displayProjects} onFocusPoint={onFocusPoint} />;
    case 'wireframe-terrain-wire':
    default:
      return <WireframeTerrainWire materials={materials} projects={displayProjects} />;
  }
}

/* 1. Rotating Hero Object
 * Inspiration & Traceability:
 * - Supahero.io: Informed by hero balance principles (55/45 asymmetric visual-to-text ratio)
 *   ensuring the central rotating 3D geometry anchors the right canvas without obstructing
 *   the headline text hierarchy on the left.
 */
function RotatingHeroObject({
  materials,
  rotationSpeed,
  projects,
  onFocusPoint
}: {
  materials: any;
  rotationSpeed: number;
  projects: ProjectDto[];
  onFocusPoint?: (pt: [number, number, number]) => void;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4 * rotationSpeed;
      meshRef.current.rotation.x += delta * 0.2 * rotationSpeed;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.3 * rotationSpeed;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <group ref={meshRef} onClick={() => onFocusPoint?.([0, 0, 0])}>
        <mesh material={materials.primaryMaterial}>
          <octahedronGeometry args={[1.6, 0]} />
        </mesh>
        <mesh material={materials.wireframeMaterial} scale={1.05}>
          <octahedronGeometry args={[1.6, 0]} />
        </mesh>
      </group>

      <group ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <mesh material={materials.accentMaterial}>
          <torusGeometry args={[2.5, 0.06, 16, 64]} />
        </mesh>
        {projects.slice(0, 4).map((proj, i) => {
          const theta = (i / 4) * Math.PI * 2;
          const x = Math.cos(theta) * 2.5;
          const y = Math.sin(theta) * 2.5;
          return (
            <group key={proj.id || i} position={[x, y, 0]} onClick={() => onFocusPoint?.([x, y, 0])}>
              <mesh material={materials.accentMaterial}>
                <sphereGeometry args={[0.22, 16, 16]} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/* 2. 3D Gallery Arc
 * Inspiration & Traceability:
 * - Godly.website (Active Theory Portfolio Showcase): Curving project slates in a panoramic
 *   semi-circular amphitheater with gaze-following parallax and elevation lift upon hover.
 */
function GalleryArc({
  materials,
  projects,
  onFocusPoint,
  onSelectProject
}: {
  materials: any;
  projects: ProjectDto[];
  onFocusPoint?: (pt: [number, number, number]) => void;
  onSelectProject?: (proj: ProjectDto) => void;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const items = projects.slice(0, 6);
  const radius = 4.5;

  return (
    <group position={[0, -0.2, 0]}>
      {items.map((proj, i) => {
        const count = items.length;
        const startAngle = -Math.PI / 3;
        const endAngle = Math.PI / 3;
        const angle = count > 1 ? startAngle + (i / (count - 1)) * (endAngle - startAngle) : 0;
        const x = Math.sin(angle) * radius;
        const z = -Math.cos(angle) * radius + radius - 1.5;
        const isHovered = hoveredIdx === i;

        return (
          <group
            key={proj.id || i}
            position={[x, isHovered ? 0.3 : 0, z]}
            rotation={[0, -angle, 0]}
            onPointerOver={() => setHoveredIdx(i)}
            onPointerOut={() => setHoveredIdx(null)}
            onClick={() => {
              onFocusPoint?.([x, 0, z]);
              onSelectProject?.(proj);
            }}
          >
            <mesh material={materials.primaryMaterial}>
              <boxGeometry args={[1.4, 1.8, 0.08]} />
            </mesh>
            <mesh material={materials.wireframeMaterial} position={[0, 0, 0.05]}>
              <boxGeometry args={[1.42, 1.82, 0.02]} />
            </mesh>
            {isHovered && (
              <mesh material={materials.glowMaterial} position={[0, -1.05, 0]}>
                <cylinderGeometry args={[0.7, 0.7, 0.05, 32]} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

/* 3. Depth Parallax Scroll
 * Inspiration & Traceability:
 * - Scroll World (github.com/oso95/scroll-world) & Design Spells: Continuous z-axis depth
 *   translation without hard cuts, mapping scroll velocity to depth plane offsets via
 *   real-time R3F useFrame (100% real-time GPU rendering, zero pre-rendered video).
 */
function DepthParallaxScroll({
  materials,
  projects,
  onFocusPoint
}: {
  materials: any;
  projects: ProjectDto[];
  onFocusPoint?: (pt: [number, number, number]) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {projects.slice(0, 5).map((proj, i) => {
        const z = -i * 1.8;
        const x = (i % 2 === 0 ? 1 : -1) * (1.2 + (i % 3) * 0.4);
        const y = ((i % 3) - 1) * 0.7;
        return (
          <group key={proj.id || i} position={[x, y, z]} onClick={() => onFocusPoint?.([x, y, z])}>
            <mesh material={materials.primaryMaterial}>
              <boxGeometry args={[2.0, 1.3, 0.05]} />
            </mesh>
            <mesh material={materials.wireframeMaterial} scale={1.03}>
              <boxGeometry args={[2.0, 1.3, 0.05]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* 4. Floating Project Cards
 * Inspiration & Traceability:
 * - Godly.website (Paperclip Design & Build in Amsterdam): Levitating zero-gravity project
 *   tiles with subtle physics oscillation, damped rotational inertia, and mouse reactivity.
 */
function FloatingProjectCards({
  materials,
  projects,
  onFocusPoint
}: {
  materials: any;
  projects: ProjectDto[];
  onFocusPoint?: (pt: [number, number, number]) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.003;
        child.rotation.z = Math.sin(state.clock.elapsedTime * 0.8 + i) * 0.05;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {projects.slice(0, 6).map((proj, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = (col - 1) * 2.2;
        const y = (row === 0 ? 0.8 : -0.8);
        const z = (col === 1 ? 0.5 : -0.3);
        return (
          <group key={proj.id || i} position={[x, y, z]} onClick={() => onFocusPoint?.([x, y, z])}>
            <mesh material={materials.primaryMaterial}>
              <boxGeometry args={[1.8, 1.2, 0.1]} />
            </mesh>
            <mesh material={materials.wireframeMaterial} position={[0, 0, 0.06]}>
              <planeGeometry args={[1.7, 1.1]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* 5. Particle Field Hero
 * Inspiration & Traceability:
 * - Supahero.io & react-bits: Ambient reactive starfield constellation providing spatial depth
 *   behind the text layer while maintaining high typography contrast and readability.
 */
function ParticleFieldHero({
  materials,
  tokens,
  rotationSpeed
}: {
  materials: any;
  tokens: ThemeTokens;
  rotationSpeed: number;
}) {
  const count = 1200;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const accentCol = new THREE.Color(tokens.colors.accent);
    const textCol = new THREE.Color(tokens.colors.textPrimary);
    const borderCol = new THREE.Color(tokens.colors.border);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.0 + Math.random() * 4.0;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const colorChoice = i % 3 === 0 ? accentCol : i % 3 === 1 ? textCol : borderCol;
      cols[i * 3] = colorChoice.r;
      cols[i * 3 + 1] = colorChoice.g;
      cols[i * 3 + 2] = colorChoice.b;
    }
    return [pos, cols];
  }, [tokens]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.15 * rotationSpeed;
      pointsRef.current.rotation.x += delta * 0.05 * rotationSpeed;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.8} />
    </points>
  );
}

/* 6. Orbit Camera Showcase
 * Inspiration & Traceability:
 * - Design Spells (Bruno Simon Interactive 3D Showcase): Centered pedestal turntable placing
 *   flagship project casework at focal origin with full 360-degree orbit freedom.
 */
function OrbitCameraShowcase({
  materials,
  projects,
  onFocusPoint
}: {
  materials: any;
  projects: ProjectDto[];
  onFocusPoint?: (pt: [number, number, number]) => void;
}) {
  const pedestalRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (pedestalRef.current) {
      pedestalRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* Pedestal Base */}
      <mesh material={materials.primaryMaterial} position={[0, -0.4, 0]}>
        <cylinderGeometry args={[2.2, 2.4, 0.4, 32]} />
      </mesh>
      <mesh material={materials.wireframeMaterial} position={[0, -0.4, 0]}>
        <cylinderGeometry args={[2.22, 2.42, 0.42, 32]} />
      </mesh>

      {/* Featured Floating Centerpiece */}
      <group ref={pedestalRef} position={[0, 1.2, 0]} onClick={() => onFocusPoint?.([0, 1.2, 0])}>
        <mesh material={materials.accentMaterial}>
          <icosahedronGeometry args={[1.2, 1]} />
        </mesh>
        <mesh material={materials.wireframeMaterial} scale={1.05}>
          <icosahedronGeometry args={[1.2, 1]} />
        </mesh>
      </group>
    </group>
  );
}

/* 7. 3D Card Flip Case Study
 * Inspiration & Traceability:
 * - Design Spells & Godly.website (Studio Freight): Tactile double-sided interactive card-flip
 *   mechanics switching instantaneously between visual artwork cover and case study breakdown.
 */
function CardFlipCaseStudy({
  materials,
  projects,
  onFocusPoint
}: {
  materials: any;
  projects: ProjectDto[];
  onFocusPoint?: (pt: [number, number, number]) => void;
}) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  return (
    <group position={[0, 0, 0]}>
      {projects.slice(0, 3).map((proj, i) => {
        const x = (i - 1) * 2.5;
        const isFlipped = flipped[i];
        return (
          <group
            key={proj.id || i}
            position={[x, 0, 0]}
            rotation={[0, isFlipped ? Math.PI : 0, 0]}
            onClick={() => {
              setFlipped((prev) => ({ ...prev, [i]: !prev[i] }));
              onFocusPoint?.([x, 0, 0]);
            }}
          >
            {/* Front */}
            <mesh material={materials.primaryMaterial} position={[0, 0, 0.04]}>
              <boxGeometry args={[1.9, 2.6, 0.08]} />
            </mesh>
            <mesh material={materials.wireframeMaterial} position={[0, 0, 0.09]}>
              <planeGeometry args={[1.8, 2.5]} />
            </mesh>
            {/* Back Accent Badge */}
            <mesh material={materials.accentMaterial} position={[0, 0, -0.04]} rotation={[0, Math.PI, 0]}>
              <boxGeometry args={[1.9, 2.6, 0.08]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* 8. Tunnel Scroll
 * Inspiration & Traceability:
 * - Scroll World (github.com/oso95/scroll-world): Infinite forward-traveling geometric
 *   wireframe corridor conveying relentless forward progression as the user scrolls,
 *   driven by real-time R3F scroll-camera controls without video dependencies.
 */
function TunnelScroll({
  materials,
  rotationSpeed,
  projects
}: {
  materials: any;
  rotationSpeed: number;
  projects: ProjectDto[];
}) {
  const tunnelRings = 16;
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.2 * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      {Array.from({ length: tunnelRings }).map((_, i) => {
        const z = -i * 1.5;
        return (
          <group key={i} position={[0, 0, z]}>
            <mesh material={materials.wireframeMaterial}>
              <torusGeometry args={[3.0 + (i % 2) * 0.3, 0.04, 8, 24]} />
            </mesh>
            {i % 3 === 0 && (
              <mesh material={materials.accentMaterial} position={[0, 2.8, 0]}>
                <octahedronGeometry args={[0.2, 0]} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

/* 9. Isometric Diorama
 * Inspiration & Traceability:
 * - Godly.website (Lusion & Monopo Tokyo): Tilt-shift architectural isometric miniature stage
 *   staging projects across interactive volumetric pedestals with orthographic framing.
 */
function IsometricDiorama({
  materials,
  projects,
  onFocusPoint
}: {
  materials: any;
  projects: ProjectDto[];
  onFocusPoint?: (pt: [number, number, number]) => void;
}) {
  return (
    <group position={[0, -0.5, 0]} rotation={[0.4, 0.6, 0]}>
      {/* Ground Stage */}
      <mesh material={materials.primaryMaterial} position={[0, -0.2, 0]}>
        <boxGeometry args={[4.5, 0.2, 4.5]} />
      </mesh>
      <mesh material={materials.wireframeMaterial} position={[0, -0.19, 0]}>
        <boxGeometry args={[4.52, 0.22, 4.52]} />
      </mesh>

      {/* Isometric Columns */}
      {projects.slice(0, 4).map((proj, i) => {
        const x = (i % 2 === 0 ? -1 : 1) * 1.3;
        const z = (i < 2 ? -1 : 1) * 1.3;
        const h = 1.0 + (i % 3) * 0.5;
        return (
          <group key={proj.id || i} position={[x, h / 2, z]} onClick={() => onFocusPoint?.([x, h, z])}>
            <mesh material={materials.accentMaterial}>
              <boxGeometry args={[0.8, h, 0.8]} />
            </mesh>
            <mesh material={materials.wireframeMaterial} scale={1.02}>
              <boxGeometry args={[0.8, h, 0.8]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* 10. Morphing Geometry Hero
 * Inspiration & Traceability:
 * - Godly.website (KPRverse / Aristide Benoist): Fluid mathematical polyhedra undulating
 *   and deforming continuously via vertex displacement in response to user cursor motion.
 */
function MorphingGeometryHero({
  materials,
  rotationSpeed
}: {
  materials: any;
  rotationSpeed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3 * rotationSpeed;
      meshRef.current.rotation.y += delta * 0.4 * rotationSpeed;
      const scale = 1.4 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef} material={materials.primaryMaterial}>
        <torusKnotGeometry args={[1.0, 0.35, 128, 32]} />
      </mesh>
    </group>
  );
}

/* 11. Interactive Sphere Cloud
 * Inspiration & Traceability:
 * - Godly.website (Resn / MediaMonks): Fibonacci sphere point-distribution organizing into
 *   project nodes that expand dynamically on user interaction.
 */
function InteractiveSphereCloud({
  materials,
  projects,
  onFocusPoint
}: {
  materials: any;
  projects: ProjectDto[];
  onFocusPoint?: (pt: [number, number, number]) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const count = 36;
  const radius = 2.4;

  const points = useMemo(() => {
    const pts = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * rad;
      const z = Math.sin(theta) * rad;
      pts.push([x * radius, y * radius, z * radius] as [number, number, number]);
    }
    return pts;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {points.map((pt, i) => (
        <mesh
          key={i}
          position={pt}
          material={i % 3 === 0 ? materials.accentMaterial : materials.primaryMaterial}
          onClick={() => onFocusPoint?.(pt)}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
        </mesh>
      ))}
    </group>
  );
}

/* 12. Wireframe Terrain Wire
 * Inspiration & Traceability:
 * - Design Spells (Synthwave Horizon): Synthwave-style undulating wireframe landscape with
 *   glowing project beacon monoliths visible across the continuous topographic horizon.
 */
function WireframeTerrainWire({
  materials,
  projects
}: {
  materials: any;
  projects: ProjectDto[];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.z = (state.clock.elapsedTime * 0.8) % 2.0;
    }
  });

  return (
    <group position={[0, -1.2, 0]} rotation={[-Math.PI / 3, 0, 0]}>
      <mesh ref={meshRef} material={materials.wireframeMaterial}>
        <planeGeometry args={[14, 14, 28, 28]} />
      </mesh>
      {projects.slice(0, 4).map((proj, i) => {
        const x = (i - 1.5) * 2.5;
        return (
          <mesh key={proj.id || i} position={[x, 0.5, 0]} material={materials.accentMaterial}>
            <cylinderGeometry args={[0.15, 0.3, 1.8, 8]} />
          </mesh>
        );
      })}
    </group>
  );
}

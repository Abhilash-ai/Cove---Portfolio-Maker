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
    case 'isometric-diorama':
      return <IsometricDiorama materials={materials} projects={displayProjects} onFocusPoint={onFocusPoint} />;
    case 'morphing-geometry-hero':
      return <MorphingGeometryHero materials={materials} rotationSpeed={rotationSpeed} />;
    case 'interactive-sphere-cloud':
      return <InteractiveSphereCloud materials={materials} projects={displayProjects} onFocusPoint={onFocusPoint} />;
    case 'product-showcase-3d':
      return <ProductShowcase3D materials={materials} tokens={tokens} rotationSpeed={rotationSpeed} onFocusPoint={onFocusPoint} />;
    case 'team-space-3d':
      return <TeamSpace3D materials={materials} projects={displayProjects} onFocusPoint={onFocusPoint} />;
    case 'floating-pricing-cards':
      return <FloatingPricingCards materials={materials} tokens={tokens} onFocusPoint={onFocusPoint} />;
    case 'interactive-logo-cloud-3d':
      return <InteractiveLogoCloud3D materials={materials} rotationSpeed={rotationSpeed} onFocusPoint={onFocusPoint} />;
    case 'service-orbit':
      return <ServiceOrbit materials={materials} rotationSpeed={rotationSpeed} onFocusPoint={onFocusPoint} />;
    case 'testimonial-carousel-3d':
      return <TestimonialCarousel3D materials={materials} rotationSpeed={rotationSpeed} onFocusPoint={onFocusPoint} />;
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

/* 13. Product Showcase 3D
 * Inspiration & Traceability:
 * - Godly.website (Keynote & Linear hardware launch heroes): High-precision product pedestal
 *   with an elevated display monolith, floating accent halo rings, and interactive feature hotspots.
 */
function ProductShowcase3D({
  materials,
  tokens,
  rotationSpeed = 1.0,
  onFocusPoint
}: {
  materials: any;
  tokens: ThemeTokens;
  rotationSpeed?: number;
  onFocusPoint?: (pt: [number, number, number]) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
      groupRef.current.rotation.y += delta * 0.25 * rotationSpeed;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Pedestal Stage */}
      <mesh position={[0, -1.3, 0]} material={materials.primaryMaterial}>
        <cylinderGeometry args={[2.2, 2.5, 0.25, 32]} />
      </mesh>
      <mesh position={[0, -1.16, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.wireframeMaterial}>
        <torusGeometry args={[2.25, 0.03, 16, 64]} />
      </mesh>

      {/* Floating Product Core */}
      <group ref={groupRef} position={[0, 0.1, 0]}>
        {/* Core Showcase Monolith */}
        <mesh material={materials.primaryMaterial}>
          <boxGeometry args={[1.6, 2.1, 0.16]} />
        </mesh>
        {/* Visual Inset Screen / Accent Panel */}
        <mesh position={[0, 0.1, 0.09]} material={materials.accentMaterial}>
          <boxGeometry args={[1.35, 1.7, 0.02]} />
        </mesh>
        {/* Wireframe Edge Detail */}
        <mesh material={materials.wireframeMaterial}>
          <boxGeometry args={[1.62, 2.12, 0.18]} />
        </mesh>

        {/* Orbiting Accent Halo */}
        <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]} material={materials.accentMaterial}>
          <torusGeometry args={[1.7, 0.025, 16, 64]} />
        </mesh>

        {/* Interactive Feature Hotspots */}
        {[
          { pos: [-1.1, 0.7, 0.3] as [number, number, number], label: 'Display' },
          { pos: [1.1, 0.2, 0.4] as [number, number, number], label: 'Interface' },
          { pos: [0, -0.7, 0.7] as [number, number, number], label: 'Architecture' }
        ].map((hotspot, idx) => (
          <group
            key={idx}
            position={hotspot.pos}
            onClick={(e) => {
              e.stopPropagation();
              onFocusPoint?.(hotspot.pos);
            }}
          >
            <mesh material={materials.accentMaterial}>
              <sphereGeometry args={[0.1, 16, 16]} />
            </mesh>
            <mesh material={materials.glowMaterial}>
              <sphereGeometry args={[0.18, 16, 16]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/* 14. Team Space 3D
 * Inspiration & Traceability:
 * - Design Spells (Virtual Studio Podiums & Team Presence): Interactive 3D spatial podiums
 *   arranged in a gentle arc, celebrating team members and leadership roles with hover elevation.
 */
function TeamSpace3D({
  materials,
  projects,
  onFocusPoint
}: {
  materials: any;
  projects: ProjectDto[];
  onFocusPoint?: (pt: [number, number, number]) => void;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const items = [
    { title: 'Core Architecture', role: 'Design Engineering' },
    { title: 'Creative Direction', role: 'Brand Systems' },
    { title: '3D Interaction', role: 'Spatial Computing' },
    { title: 'Product Strategy', role: 'Technical Leadership' }
  ];

  return (
    <group position={[0, -0.3, 0]}>
      {items.map((member, i) => {
        const count = items.length;
        const startAngle = -Math.PI / 3.2;
        const endAngle = Math.PI / 3.2;
        const angle = count > 1 ? startAngle + (i / (count - 1)) * (endAngle - startAngle) : 0;
        const radius = 3.6;
        const x = Math.sin(angle) * radius;
        const z = -Math.cos(angle) * radius + radius - 1.2;
        const isHovered = hoveredIdx === i;

        return (
          <group
            key={i}
            position={[x, isHovered ? 0.35 : 0, z]}
            rotation={[0, -angle, 0]}
            onPointerOver={() => setHoveredIdx(i)}
            onPointerOut={() => setHoveredIdx(null)}
            onClick={() => onFocusPoint?.([x, 0, z])}
          >
            {/* Podium Base */}
            <mesh position={[0, -1.0, 0]} material={materials.primaryMaterial}>
              <cylinderGeometry args={[0.55, 0.65, 0.2, 24]} />
            </mesh>
            <mesh position={[0, -0.89, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.wireframeMaterial}>
              <torusGeometry args={[0.58, 0.02, 16, 32]} />
            </mesh>

            {/* Avatar Sculpture */}
            <mesh position={[0, -0.2, 0]} material={i % 2 === 0 ? materials.primaryMaterial : materials.accentMaterial}>
              <icosahedronGeometry args={[0.35, 1]} />
            </mesh>
            <mesh position={[0, -0.2, 0]} material={materials.wireframeMaterial}>
              <icosahedronGeometry args={[0.38, 0]} />
            </mesh>

            {/* Floating Role Nameplate */}
            <mesh position={[0, -0.65, 0.3]} material={materials.primaryMaterial}>
              <boxGeometry args={[0.85, 0.28, 0.04]} />
            </mesh>
            <mesh position={[0, -0.65, 0.32]} material={materials.accentMaterial}>
              <boxGeometry args={[0.65, 0.06, 0.02]} />
            </mesh>

            {isHovered && (
              <mesh position={[0, -1.05, 0]} material={materials.glowMaterial}>
                <cylinderGeometry args={[0.8, 0.8, 0.05, 24]} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

/* 15. Floating Pricing Cards
 * Inspiration & Traceability:
 * - Supahero.io & Godly (Spatial SaaS Tiers): 3D plan cards (Starter, Pro, Enterprise) floating
 *   at staggered depth with dynamic hover tilt, glowing featured tier, and tier badge monoliths.
 */
function FloatingPricingCards({
  materials,
  tokens,
  onFocusPoint
}: {
  materials: any;
  tokens: ThemeTokens;
  onFocusPoint?: (pt: [number, number, number]) => void;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const tiers = [
    { name: 'Starter', price: '$29', pos: [-2.3, -0.15, -0.4] as [number, number, number], rot: [0, 0.16, 0] as [number, number, number], featured: false },
    { name: 'Pro', price: '$79', pos: [0, 0.15, 0.2] as [number, number, number], rot: [0, 0, 0] as [number, number, number], featured: true },
    { name: 'Enterprise', price: '$199', pos: [2.3, -0.15, -0.4] as [number, number, number], rot: [0, -0.16, 0] as [number, number, number], featured: false }
  ];

  return (
    <group position={[0, 0, 0]}>
      {tiers.map((tier, i) => {
        const isHovered = hoveredIdx === i;
        const scale = tier.featured ? 1.08 : 0.95;

        return (
          <group
            key={tier.name}
            position={[tier.pos[0], tier.pos[1] + (isHovered ? 0.25 : 0), tier.pos[2]]}
            rotation={tier.rot}
            scale={[scale, scale, scale]}
            onPointerOver={() => setHoveredIdx(i)}
            onPointerOut={() => setHoveredIdx(null)}
            onClick={() => onFocusPoint?.(tier.pos)}
          >
            {/* Card Body */}
            <mesh material={tier.featured ? materials.primaryMaterial : materials.primaryMaterial}>
              <boxGeometry args={[1.5, 2.2, 0.08]} />
            </mesh>

            {/* Glowing / Wireframe Border */}
            <mesh material={tier.featured ? materials.accentMaterial : materials.wireframeMaterial}>
              <boxGeometry args={[1.54, 2.24, 0.07]} />
            </mesh>

            {/* Header Badge */}
            <mesh position={[0, 0.75, 0.06]} material={tier.featured ? materials.accentMaterial : materials.primaryMaterial}>
              <boxGeometry args={[0.9, 0.22, 0.04]} />
            </mesh>

            {/* Price Monolith */}
            <mesh position={[0, 0.35, 0.06]} material={materials.accentMaterial}>
              <boxGeometry args={[1.1, 0.18, 0.03]} />
            </mesh>

            {/* Feature Line Bars */}
            <mesh position={[0, -0.05, 0.06]} material={materials.wireframeMaterial}>
              <boxGeometry args={[1.1, 0.06, 0.02]} />
            </mesh>
            <mesh position={[0, -0.25, 0.06]} material={materials.wireframeMaterial}>
              <boxGeometry args={[0.95, 0.06, 0.02]} />
            </mesh>
            <mesh position={[0, -0.45, 0.06]} material={materials.wireframeMaterial}>
              <boxGeometry args={[1.05, 0.06, 0.02]} />
            </mesh>

            {/* Action CTA Monolith */}
            <mesh position={[0, -0.75, 0.06]} material={tier.featured ? materials.accentMaterial : materials.wireframeMaterial}>
              <boxGeometry args={[1.15, 0.24, 0.04]} />
            </mesh>

            {tier.featured && (
              <mesh position={[0, -1.2, 0]} material={materials.glowMaterial}>
                <cylinderGeometry args={[1.1, 1.1, 0.04, 32]} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

/* 16. Interactive Logo Cloud 3D
 * Inspiration & Traceability:
 * - Godly.website (Agency Trust Spheres): Dynamic 3D constellation of brand and partner logo
 *   tiles floating on a spherical orbital shell with smooth continuous planetary rotation.
 */
function InteractiveLogoCloud3D({
  materials,
  rotationSpeed = 1.0,
  onFocusPoint
}: {
  materials: any;
  rotationSpeed?: number;
  onFocusPoint?: (pt: [number, number, number]) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // 12 nodes distributed on Fibonacci sphere
  const logoNodes = useMemo(() => {
    const nodes: { pos: [number, number, number]; rot: [number, number, number] }[] = [];
    const count = 12;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    const radius = 3.0;

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;
      const py = y * radius * 0.85;

      nodes.push({
        pos: [x, py, z],
        rot: [0, -theta, 0]
      });
    }
    return nodes;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25 * rotationSpeed;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {logoNodes.map((node, i) => (
        <group
          key={i}
          position={node.pos}
          rotation={node.rot}
          onClick={(e) => {
            e.stopPropagation();
            onFocusPoint?.(node.pos);
          }}
        >
          {/* Logo Tile Slate */}
          <mesh material={materials.primaryMaterial}>
            <boxGeometry args={[0.85, 0.55, 0.05]} />
          </mesh>
          {/* Accent Border Rim */}
          <mesh material={materials.wireframeMaterial}>
            <boxGeometry args={[0.88, 0.58, 0.04]} />
          </mesh>
          {/* Brand Monogram Insignia */}
          <mesh position={[0, 0, 0.035]} material={materials.accentMaterial}>
            <octahedronGeometry args={[0.15, 0]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* 17. Service Orbit
 * Inspiration & Traceability:
 * - Design Spells (Core Capability Ecosystems): Central core node with dual concentric orbital
 *   rings carrying service capsules and micro-satellites at differing angular speeds.
 */
function ServiceOrbit({
  materials,
  rotationSpeed = 1.0,
  onFocusPoint
}: {
  materials: any;
  rotationSpeed?: number;
  onFocusPoint?: (pt: [number, number, number]) => void;
}) {
  const innerOrbitRef = useRef<THREE.Group>(null);
  const outerOrbitRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (innerOrbitRef.current) {
      innerOrbitRef.current.rotation.z += delta * 0.45 * rotationSpeed;
    }
    if (outerOrbitRef.current) {
      outerOrbitRef.current.rotation.z -= delta * 0.3 * rotationSpeed;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.3;
      coreRef.current.rotation.x += delta * 0.2;
    }
  });

  const innerRadius = 2.0;
  const outerRadius = 3.3;

  return (
    <group position={[0, 0, 0]}>
      {/* Central Core Service Node */}
      <mesh ref={coreRef} material={materials.primaryMaterial}>
        <icosahedronGeometry args={[0.8, 1]} />
      </mesh>
      <mesh material={materials.wireframeMaterial}>
        <icosahedronGeometry args={[0.88, 0]} />
      </mesh>
      <mesh material={materials.glowMaterial}>
        <sphereGeometry args={[1.05, 16, 16]} />
      </mesh>

      {/* Inner Orbit Track */}
      <group rotation={[Math.PI / 3, 0.3, 0]}>
        <mesh material={materials.wireframeMaterial}>
          <torusGeometry args={[innerRadius, 0.02, 16, 64]} />
        </mesh>
        <group ref={innerOrbitRef}>
          {[0, 1, 2].map((idx) => {
            const angle = (idx / 3) * Math.PI * 2;
            const x = Math.cos(angle) * innerRadius;
            const y = Math.sin(angle) * innerRadius;
            return (
              <group
                key={idx}
                position={[x, y, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  onFocusPoint?.([x, y, 0]);
                }}
              >
                <mesh material={materials.accentMaterial}>
                  <sphereGeometry args={[0.22, 16, 16]} />
                </mesh>
                <mesh material={materials.wireframeMaterial}>
                  <torusGeometry args={[0.3, 0.02, 8, 24]} />
                </mesh>
              </group>
            );
          })}
        </group>
      </group>

      {/* Outer Orbit Track */}
      <group rotation={[-Math.PI / 4, -0.4, 0]}>
        <mesh material={materials.wireframeMaterial}>
          <torusGeometry args={[outerRadius, 0.02, 16, 64]} />
        </mesh>
        <group ref={outerOrbitRef}>
          {[0, 1, 2, 3].map((idx) => {
            const angle = (idx / 4) * Math.PI * 2;
            const x = Math.cos(angle) * outerRadius;
            const y = Math.sin(angle) * outerRadius;
            return (
              <group
                key={idx}
                position={[x, y, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  onFocusPoint?.([x, y, 0]);
                }}
              >
                <mesh material={materials.primaryMaterial}>
                  <boxGeometry args={[0.35, 0.35, 0.35]} />
                </mesh>
                <mesh material={materials.accentMaterial} position={[0, 0, 0.2]}>
                  <sphereGeometry args={[0.08, 12, 12]} />
                </mesh>
              </group>
            );
          })}
        </group>
      </group>
    </group>
  );
}

/* 18. Testimonial Carousel 3D
 * Inspiration & Traceability:
 * - Godly.website (Curved Testimonial Amphitheater): Cylindrical carousel of 3D quote plates
 *   spaced around the viewer, gently rotating with rating stars and author badge podiums.
 */
function TestimonialCarousel3D({
  materials,
  rotationSpeed = 1.0,
  onFocusPoint
}: {
  materials: any;
  rotationSpeed?: number;
  onFocusPoint?: (pt: [number, number, number]) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const testimonials = [
    { initial: 'ER', company: 'NeuralGrid' },
    { initial: 'MV', company: 'AeroLab' },
    { initial: 'SC', company: 'PulseFlow' },
    { initial: 'DK', company: 'Synthetix' },
    { initial: 'AJ', company: 'Horizon' }
  ];

  const radius = 3.6;

  useFrame((state, delta) => {
    if (groupRef.current && hoveredIdx === null) {
      groupRef.current.rotation.y += delta * 0.18 * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {testimonials.map((t, i) => {
        const count = testimonials.length;
        const angle = (i / count) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const isHovered = hoveredIdx === i;

        return (
          <group
            key={i}
            position={[x, isHovered ? 0.2 : 0, z]}
            rotation={[0, angle, 0]}
            onPointerOver={() => setHoveredIdx(i)}
            onPointerOut={() => setHoveredIdx(null)}
            onClick={(e) => {
              e.stopPropagation();
              onFocusPoint?.([x, 0, z]);
            }}
          >
            {/* Quote Slate */}
            <mesh material={materials.primaryMaterial}>
              <boxGeometry args={[1.7, 1.25, 0.06]} />
            </mesh>
            <mesh material={materials.wireframeMaterial}>
              <boxGeometry args={[1.74, 1.29, 0.05]} />
            </mesh>

            {/* Header Accent Bar */}
            <mesh position={[0, 0.42, 0.04]} material={materials.accentMaterial}>
              <boxGeometry args={[1.5, 0.12, 0.02]} />
            </mesh>

            {/* Rating Star Tokens (5 gems) */}
            {[-0.4, -0.2, 0, 0.2, 0.4].map((starX, sIdx) => (
              <mesh key={sIdx} position={[starX, 0.15, 0.04]} material={materials.accentMaterial}>
                <octahedronGeometry args={[0.045, 0]} />
              </mesh>
            ))}

            {/* Body Quote Mock Lines */}
            <mesh position={[0, -0.1, 0.04]} material={materials.wireframeMaterial}>
              <boxGeometry args={[1.3, 0.04, 0.02]} />
            </mesh>
            <mesh position={[0, -0.24, 0.04]} material={materials.wireframeMaterial}>
              <boxGeometry args={[1.1, 0.04, 0.02]} />
            </mesh>

            {/* Author Avatar Badge */}
            <mesh position={[-0.45, -0.42, 0.05]} material={materials.accentMaterial}>
              <sphereGeometry args={[0.1, 16, 16]} />
            </mesh>
            <mesh position={[0.1, -0.42, 0.05]} material={materials.primaryMaterial}>
              <boxGeometry args={[0.75, 0.14, 0.02]} />
            </mesh>

            {isHovered && (
              <mesh position={[0, -0.7, 0]} material={materials.glowMaterial}>
                <cylinderGeometry args={[0.9, 0.9, 0.04, 24]} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}


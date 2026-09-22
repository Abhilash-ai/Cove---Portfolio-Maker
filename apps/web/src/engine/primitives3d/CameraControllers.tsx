import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CameraBehavior3D } from '../templates/templateTypes.js';

interface ControllerProps {
  behavior: CameraBehavior3D;
  cameraDistance?: number;
  rotationSpeed?: number;
  focusedPoint?: [number, number, number] | null;
}

export function CameraController({
  behavior,
  cameraDistance = 6.0,
  rotationSpeed = 1.0,
  focusedPoint
}: ControllerProps) {
  const { camera, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, cameraDistance));
  const currentPos = useRef(new THREE.Vector3(0, 0, cameraDistance));
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));
  const scrollOffset = useRef(0);
  const angle = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollOffset.current = window.scrollY / maxScroll;
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    switch (behavior) {
      case 'orbit-drag':
        // Managed by OrbitControls component below
        break;

      case 'auto-rotate-idle': {
        angle.current += delta * 0.4 * rotationSpeed;
        camera.position.x = Math.sin(angle.current) * cameraDistance;
        camera.position.z = Math.cos(angle.current) * cameraDistance;
        camera.position.y = 1.0 + Math.sin(angle.current * 0.5) * 0.5;
        camera.lookAt(0, 0, 0);
        break;
      }

      case 'mouse-parallax-tilt': {
        targetPos.current.set(
          pointer.x * 2.0,
          pointer.y * 1.5 + 0.5,
          cameraDistance
        );
        camera.position.lerp(targetPos.current, 0.05);
        camera.lookAt(0, 0, 0);
        break;
      }

      case 'scroll-driven-fly-through': {
        const scrollZ = cameraDistance - scrollOffset.current * 8.0;
        targetPos.current.set(
          Math.sin(scrollOffset.current * Math.PI * 2) * 1.5,
          Math.cos(scrollOffset.current * Math.PI * 2) * 0.8,
          scrollZ
        );
        camera.position.lerp(targetPos.current, 0.08);
        camera.lookAt(0, 0, -10);
        break;
      }

      case 'scroll-triggered-camera-path': {
        const stage = Math.floor(scrollOffset.current * 4);
        const stageAngles = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2];
        const targetAngle = stageAngles[stage % 4];
        targetPos.current.set(
          Math.sin(targetAngle) * cameraDistance,
          1.2,
          Math.cos(targetAngle) * cameraDistance
        );
        camera.position.lerp(targetPos.current, 0.06);
        camera.lookAt(0, 0, 0);
        break;
      }

      case 'click-to-focus': {
        if (focusedPoint) {
          targetPos.current.set(focusedPoint[0], focusedPoint[1] + 0.3, focusedPoint[2] + 2.5);
          lookTarget.current.set(focusedPoint[0], focusedPoint[1], focusedPoint[2]);
        } else {
          targetPos.current.set(pointer.x * 1.2, 0.5, cameraDistance);
          lookTarget.current.set(0, 0, 0);
        }
        camera.position.lerp(targetPos.current, 0.08);
        camera.lookAt(lookTarget.current);
        break;
      }

      case 'gyro-pointer-look': {
        targetPos.current.set(pointer.x * 1.5, pointer.y * 1.0, cameraDistance);
        camera.position.lerp(targetPos.current, 0.04);
        lookTarget.current.set(pointer.x * 3.0, pointer.y * 2.0, 0);
        camera.lookAt(lookTarget.current);
        break;
      }

      case 'elastic-spring-pan': {
        targetPos.current.set(
          pointer.x * 3.0 * rotationSpeed,
          pointer.y * 2.0 * rotationSpeed + 0.5,
          cameraDistance
        );
        camera.position.lerp(targetPos.current, 0.03);
        camera.lookAt(0, 0, 0);
        break;
      }
    }
  });

  if (behavior === 'orbit-drag') {
    return (
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 3.5}
      />
    );
  }

  return null;
}

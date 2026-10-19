/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';

interface AudioOrbVisualizerProps {
  isPlaying: boolean;
  audioElementRef: RefObject<HTMLAudioElement | null>;
  className?: string;
}

export default function AudioOrbVisualizer({
  isPlaying,
  audioElementRef,
  className = '',
}: AudioOrbVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Three.js Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x12110e, 0.035);

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.z = 21;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Fully transparent canvas background
    container.appendChild(renderer.domElement);

    const vertexShader = `
      uniform float u_time;
      uniform float u_audio_low;
      uniform float u_audio_high;
      
      varying vec3 vColor;
      varying float vAlpha;
      
      // Simplex 3D Noise function
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      float snoise(vec3 v){ 
          const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
          const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy) );
          vec3 x0 = v - i + dot(i, C.xxx) ;
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );
          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
          i = mod(i, 289.0 ); 
          vec4 p = permute( permute( permute( 
                      i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
          float n_ = 1.0/7.0;
          vec3  ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
      }

      void main() {
          // Identidade Visual Conectare: Sunray Dourado (#E9BE5F) e Âmbar
          vec3 colorSunray = vec3(0.914, 0.745, 0.373);     // #E9BE5F - Dourado Solar Conectare
          vec3 colorAmber  = vec3(0.840, 0.480, 0.120);     // Âmbar quente profundo
          vec3 colorGold   = vec3(0.950, 0.820, 0.520);     // Champagne dourado
          
          float mixFactor = (normalize(position).y + 1.0) * 0.5;
          vec3 baseColor = mix(colorAmber, colorSunray, clamp(mixFactor, 0.0, 1.0));
          
          // Quando a voz ativa agudos/médios, ilumina para champagne dourado
          vColor = mix(baseColor, colorGold, clamp(u_audio_high * 1.4, 0.0, 0.7));
          
          vAlpha = 0.65 + 0.35 * clamp(normalize(position).z, 0.0, 1.0);

          vec3 p = position;
          vec3 normalVector = normalize(p);
          
          // 1. Expansão proporcional ao grave da voz
          float scaleFactor = 1.0 + (u_audio_low * 0.32);
          p *= scaleFactor;
          
          // 2. Respiração calma em idle
          float idleNoise = snoise(p * 0.25 + u_time * 0.08) * 0.16;
          
          // 3. Dinâmica com as frequências médias e agudas
          float activeNoise = snoise(p * 0.75 + u_time * 0.4) * (u_audio_high * 1.6);

          vec3 newPosition = p + normalVector * (idleNoise + activeNoise);
          vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Escala nítida e refinada de partículas
          gl_PointSize = (2.2 + u_audio_low * 2.5) * (18.0 / -mvPosition.z);
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if(dist > 0.5) discard;
          
          float shape = smoothstep(0.5, 0.06, dist);
          gl_FragColor = vec4(vColor, shape * vAlpha);
      }
    `;

    // 32x32 geometry ensures distinct, constellation-like particle definition
    const geometry = new THREE.SphereGeometry(3.8, 32, 32);
    const uniforms = {
      u_time: { value: 0.0 },
      u_audio_low: { value: 0.0 },
      u_audio_high: { value: 0.0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    particleSystem.rotation.z = 0.2;
    particleSystem.rotation.x = 0.15;
    scene.add(particleSystem);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // --- Animation Loop ---
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      uniforms.u_time.value = time;

      // Gentle global axial rotation
      particleSystem.rotation.y = time * 0.07;
      particleSystem.rotation.x = Math.sin(time * 0.2) * 0.1 + 0.15;

      const playing = isPlayingRef.current;
      const analyser = analyserRef.current;
      const dataArray = dataArrayRef.current;

      if (playing && analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray as any);

        let lowSum = 0;
        const lowBins = 12;
        for (let i = 0; i < lowBins; i++) {
          lowSum += dataArray[i];
        }

        let highSum = 0;
        const highStart = 20;
        const highEnd = 80;
        const highBins = highEnd - highStart;
        for (let i = highStart; i < highEnd; i++) {
          highSum += dataArray[i];
        }

        let avgLow = lowSum / lowBins / 255.0;
        let avgHigh = highSum / highBins / 255.0;

        avgLow = Math.pow(avgLow, 1.4);
        avgHigh = Math.pow(avgHigh, 1.4);

        // Smooth interpolation
        uniforms.u_audio_low.value += (avgLow - uniforms.u_audio_low.value) * 0.2;
        uniforms.u_audio_high.value += (avgHigh - uniforms.u_audio_high.value) * 0.2;
      } else if (playing) {
        // Fallback simulation if analyser not yet bound (synthetic speech cadence)
        const simLow = (Math.sin(time * 6) * 0.5 + 0.5) * 0.45 + (Math.sin(time * 2.5) * 0.5 + 0.5) * 0.2;
        const simHigh = (Math.cos(time * 9) * 0.5 + 0.5) * 0.35;
        uniforms.u_audio_low.value += (simLow - uniforms.u_audio_low.value) * 0.15;
        uniforms.u_audio_high.value += (simHigh - uniforms.u_audio_high.value) * 0.15;
      } else {
        // When paused, calm down gently to idle breathing
        uniforms.u_audio_low.value += (0.0 - uniforms.u_audio_low.value) * 0.05;
        uniforms.u_audio_high.value += (0.0 - uniforms.u_audio_high.value) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Bind Web Audio API to audioElementRef when playing starts
  useEffect(() => {
    if (!isPlaying) return;

    const audioElement = audioElementRef.current;
    if (!audioElement) return;

    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }

      const audioCtx = audioContextRef.current;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (!analyserRef.current) {
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

        if (!sourceNodeRef.current) {
          // Connect audio element to analyser and destination
          const source = audioCtx.createMediaElementSource(audioElement);
          source.connect(analyser);
          analyser.connect(audioCtx.destination);
          sourceNodeRef.current = source;
        }
      }
    } catch (err) {
      console.warn('Web Audio API initialized in fallback visualizer mode:', err);
    }
  }, [isPlaying, audioElementRef]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
    />
  );
}

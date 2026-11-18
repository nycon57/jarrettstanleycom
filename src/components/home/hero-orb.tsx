'use client'

import { useEffect, useRef } from 'react'

/**
 * The voice field behind the hero portrait: a sphere of lilac particles that swells in a speech-like
 * rhythm (TrueTone's voice, literally), drifting toward the pointer on a soft spring. three.js loads after
 * the page, pauses off screen or in a hidden tab, and renders a single still frame for reduced motion.
 */

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uVoice;
  uniform float uPixelRatio;
  uniform float uSize;
  attribute float aRand;
  varying float vGlow;
  varying float vAlpha;

  // 3D simplex noise (Ashima Arts, MIT)
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    float slow = snoise(position * 1.25 + uTime * 0.18);
    float speech = snoise(position * 3.1 + vec3(0.0, uTime * 0.9, 0.0));
    float d = slow * 0.16 + speech * 0.11 * uVoice;
    vec3 p = position * (1.0 + d);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.55 + aRand * 0.9) / -mv.z;
    vGlow = smoothstep(-0.12, 0.22, d);
    // Fade the far side so the sphere reads as a volume. The orb sits at view depth -7.2, radius ~1.6.
    vAlpha = mix(0.16, 0.95, smoothstep(-8.8, -5.6, mv.z));
  }
`

const FRAGMENT = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vGlow;
  varying float vAlpha;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, r) * vAlpha;
    gl_FragColor = vec4(mix(uColorA, uColorB, vGlow), a);
  }
`

export function HeroOrb({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let disposed = false
    let cleanup = () => {}

    import('three').then((THREE) => {
      if (disposed) return
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const small = window.matchMedia('(max-width: 1023px)').matches

      let renderer: InstanceType<typeof THREE.WebGLRenderer>
      try {
        renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' })
      } catch {
        return // No WebGL: the CSS glow behind the portrait carries the hero.
      }
      const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.75)
      renderer.setPixelRatio(dpr)
      renderer.setClearColor(0x000000, 0)
      renderer.domElement.setAttribute('aria-hidden', 'true')
      renderer.domElement.style.cssText = 'width:100%;height:100%;display:block'
      host.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50)
      camera.position.set(0, 0, 7.2)

      // Particles on a Fibonacci sphere: even coverage without clumps at the poles.
      const count = small ? 2600 : 6200
      const positions = new Float32Array(count * 3)
      const rand = new Float32Array(count)
      const golden = Math.PI * (3 - Math.sqrt(5))
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2
        const radius = Math.sqrt(1 - y * y)
        const theta = golden * i
        positions.set([Math.cos(theta) * radius, y, Math.sin(theta) * radius], i * 3)
        rand[i] = Math.random()
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('aRand', new THREE.BufferAttribute(rand, 1))

      const uniforms = {
        uTime: { value: 0 },
        uVoice: { value: 0.5 },
        uPixelRatio: { value: dpr },
        uSize: { value: small ? 40 : 36 },
        uColorA: { value: new THREE.Color('#7d5fc9') },
        uColorB: { value: new THREE.Color('#d6c2fb') },
      }
      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const orb = new THREE.Points(geometry, material)
      orb.scale.setScalar(1.55)

      // Two thin orbit rings, the stage-light halo.
      const ringMaterial = new THREE.LineBasicMaterial({ color: 0x9d7ad6, transparent: true, opacity: 0.22 })
      const ringGeometry = new THREE.BufferGeometry().setFromPoints(
        Array.from({ length: 160 }, (_, i) => {
          const a = (i / 160) * Math.PI * 2
          return new THREE.Vector3(Math.cos(a), Math.sin(a), 0)
        }),
      )
      const rings = [2.15, 2.55].map((r, i) => {
        const ring = new THREE.LineLoop(ringGeometry, ringMaterial)
        ring.scale.setScalar(r)
        ring.rotation.set(1.2 + i * 0.25, i * 0.6, 0)
        return ring
      })

      const group = new THREE.Group()
      group.add(orb, ...rings)
      scene.add(group)

      const resize = () => {
        const { width, height } = host.getBoundingClientRect()
        if (!width || !height) return
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }
      resize()
      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(host)

      // Pointer drift on a spring: the target follows the cursor, the orb follows the target.
      const target = { x: 0, y: 0 }
      const tilt = { x: 0, y: 0 }
      const onPointer = (e: PointerEvent) => {
        target.y = (e.clientX / window.innerWidth - 0.5) * 0.5
        target.x = (e.clientY / window.innerHeight - 0.5) * 0.3
      }

      const clock = new THREE.Clock()
      let frame = 0
      let running = false
      const render = () => {
        const t = clock.getElapsedTime()
        uniforms.uTime.value = t
        // Speech-like envelope: syllables riding on phrases.
        uniforms.uVoice.value = 0.35 + 0.65 * Math.abs(Math.sin(t * 3.1) * Math.sin(t * 0.83 + 1.3))
        tilt.x += (target.x - tilt.x) * 0.045
        tilt.y += (target.y - tilt.y) * 0.045
        group.rotation.set(tilt.x, t * 0.07 + tilt.y, 0)
        rings[0].rotation.z = t * 0.05
        rings[1].rotation.z = -t * 0.035
        renderer.render(scene, camera)
      }
      const loop = () => {
        render()
        frame = requestAnimationFrame(loop)
      }
      const start = () => {
        if (running || reduced) return
        running = true
        clock.start()
        frame = requestAnimationFrame(loop)
      }
      const stop = () => {
        running = false
        cancelAnimationFrame(frame)
      }

      if (reduced) {
        uniforms.uTime.value = 4
        render()
      } else {
        window.addEventListener('pointermove', onPointer, { passive: true })
      }

      const io = new IntersectionObserver(([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()))
      io.observe(host)
      const onVisibility = () => (document.hidden ? stop() : start())
      document.addEventListener('visibilitychange', onVisibility)

      cleanup = () => {
        stop()
        io.disconnect()
        resizeObserver.disconnect()
        document.removeEventListener('visibilitychange', onVisibility)
        window.removeEventListener('pointermove', onPointer)
        geometry.dispose()
        material.dispose()
        ringGeometry.dispose()
        ringMaterial.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    })

    return () => {
      disposed = true
      cleanup()
    }
  }, [])

  return <div ref={hostRef} className={`hero-orb ${className ?? ''}`} />
}

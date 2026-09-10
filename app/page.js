'use client';

import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

const agents = [
  ['WEEKLY MATCH SCOUT', 'ONLINE'],
  ['BET RESEARCHER', 'ONLINE'],
  ['MARKETING MANAGER', 'ONLINE'],
  ['SPORTS NEWS', 'ONLINE'],
  ['COMPETITOR WATCH', 'STANDBY'],
  ['SPORTS CALENDAR', 'ONLINE'],
  ['ARTICLE WRITER', 'STANDBY'],
  ['BRAINSTORM', 'ONLINE'],
];

const agentPositions = [
  ['WEEKLY MATCH SCOUT', 18, 22],
  ['BET RESEARCHER', 78, 20],
  ['MARKETING MANAGER', 88, 48],
  ['SPORTS NEWS', 74, 77],
  ['COMPETITOR WATCH', 24, 80],
  ['SPORTS CALENDAR', 8, 52],
];

function HoloCore({ active }) {
  const group = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const ringC = useRef();
  const core = useRef();

  const particles = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 420; i += 1) {
      const r = 3.2 + Math.random() * 4.5;
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4.8;
      pts.push(Math.cos(a) * r, y, Math.sin(a) * r);
    }
    return new Float32Array(pts);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.07;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
    ringA.current.rotation.z += delta * 0.34;
    ringB.current.rotation.x -= delta * 0.28;
    ringC.current.rotation.y += delta * 0.42;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * (active ? 5 : 2.2)) * (active ? 0.055 : 0.025);
    core.current.scale.setScalar(pulse);
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#F1C400" size={0.035} transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      <mesh ref={ringA} rotation={[1.08, 0.2, 0.2]}>
        <torusGeometry args={[3.25, 0.018, 8, 180]} />
        <meshBasicMaterial color="#F1C400" transparent opacity={0.82} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ringB} rotation={[0.35, 0.55, 1.2]}>
        <torusGeometry args={[2.62, 0.026, 8, 160]} />
        <meshBasicMaterial color="#FFE24A" transparent opacity={0.48} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ringC} rotation={[0.7, 1.1, 0.4]}>
        <torusGeometry args={[2.03, 0.032, 8, 150]} />
        <meshBasicMaterial color="#44883E" transparent opacity={0.72} blending={THREE.AdditiveBlending} />
      </mesh>

      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i * 0.72]}>
          <torusGeometry args={[1.45 + i * 0.17, 0.018, 8, 100, Math.PI * 1.35]} />
          <meshBasicMaterial color={i % 2 ? '#F1C400' : '#44883E'} transparent opacity={0.74 - i * 0.1} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}

      <mesh ref={core}>
        <icosahedronGeometry args={[1.03, 3]} />
        <meshPhongMaterial color="#212322" emissive={active ? '#F1C400' : '#6F5B00'} emissiveIntensity={active ? 1.35 : 0.5} transparent opacity={0.86} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.68, 48, 48]} />
        <meshPhongMaterial color="#242622" emissive="#44883E" emissiveIntensity={active ? 1.75 : 0.8} transparent opacity={0.62} />
      </mesh>

      <pointLight color="#F1C400" intensity={active ? 9 : 4.5} distance={16} />
      <pointLight color="#44883E" intensity={active ? 4 : 2} distance={12} position={[0, 0, 1]} />
    </group>
  );
}

export default function Home() {
  const [activeAgent, setActiveAgent] = useState(null);
  const [listening, setListening] = useState(false);
  const [activity, setActivity] = useState([
    'Sports News Monitor online',
    'Calendar sync complete',
    'Neural router awaiting task',
    'Voice subsystem ready',
  ]);

  const activate = () => {
    const next = listening ? null : 'MARKETING MANAGER';
    setListening(!listening);
    setActiveAgent(next);
    if (!listening) {
      setActivity((items) => ['Voice command detected · routing request', ...items].slice(0, 5));
      setTimeout(() => setActiveAgent('MARKETING MANAGER'), 350);
    }
  };

  return (
    <main className={`cinematic-shell ${listening ? 'is-listening' : ''}`}>
      <div className="film-grain" />
      <div className="world-grid" />
      <div className="vignette" />
      <div className="scan-beam" />

      <header className="cinematic-topbar">
        <div className="brand-block">
          <div className="eyebrow">BOOKIECO // ARTIFICIAL INTELLIGENCE DIVISION</div>
          <div className="brand">BOOKIE<span>OS</span></div>
        </div>
        <div className="top-status">
          <span className="live-dot" /> SYSTEM ONLINE
          <small>CYPRUS NODE · SECURE LINK</small>
        </div>
      </header>

      <section className="cinematic-stage">
        <div className="atmosphere atmosphere-a" />
        <div className="atmosphere atmosphere-b" />

        <div className="core-canvas">
          <Canvas camera={{ position: [0, 0.2, 8.8], fov: 43 }} dpr={[1, 1.7]}>
            <ambientLight intensity={0.15} />
            <HoloCore active={listening} />
          </Canvas>
        </div>

        <div className="core-title">
          <small>{listening ? 'VOICE LINK ACTIVE' : 'NEURAL CORE ONLINE'}</small>
          <strong>BOOKIEOS</strong>
          <span>{listening ? 'ROUTING COMMAND' : 'AWAITING COMMAND'}</span>
        </div>

        <div className="radar-sweep" />
        <div className="crosshair horizontal" />
        <div className="crosshair vertical" />

        <svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {agentPositions.map(([name, x, y]) => (
            <line key={name} x1="50" y1="50" x2={x} y2={y} className={activeAgent === name ? 'active-line' : ''} />
          ))}
        </svg>

        {agentPositions.map(([name, x, y], i) => (
          <motion.button
            key={name}
            className={`agent-node ${activeAgent === name ? 'active' : ''}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + i * 0.08 }}
            onClick={() => setActiveAgent(activeAgent === name ? null : name)}
          >
            <span className="node-orbit" />
            <span className="node-core" />
            <b>{name}</b>
            <small>{activeAgent === name ? 'ACTIVE LINK' : 'STANDBY'}</small>
          </motion.button>
        ))}

        <aside className="floating-panel left-panel">
          <div className="panel-cap">AGENT MATRIX</div>
          {agents.map(([name, status], i) => (
            <div className={`mini-agent ${activeAgent === name ? 'selected' : ''}`} key={name} onClick={() => setActiveAgent(name)}>
              <span>0{i + 1}</span>
              <b>{name}</b>
              <i className={status === 'ONLINE' ? 'online' : ''} />
            </div>
          ))}
        </aside>

        <aside className="floating-panel right-panel">
          <div className="panel-cap">SYSTEM TELEMETRY</div>
          <div className="telemetry"><span>AI CORE</span><b>100%</b></div>
          <div className="meter"><i style={{ width: '100%' }} /></div>
          <div className="telemetry"><span>AGENT LINK</span><b>{activeAgent ? '100%' : '87%'}</b></div>
          <div className="meter"><i style={{ width: activeAgent ? '100%' : '87%' }} /></div>
          <div className="telemetry"><span>VOICE ARRAY</span><b>{listening ? 'LIVE' : 'ARMED'}</b></div>
          <div className="signal-grid">{Array.from({ length: 28 }).map((_, i) => <i key={i} />)}</div>
        </aside>

        <AnimatePresence>
          {activeAgent && (
            <motion.div className="agent-readout" initial={{ opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }}>
              <small>ACTIVE AGENT</small>
              <strong>{activeAgent}</strong>
              <span>Secure neural link established</span>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="command-console">
        <div className={`voice-wave ${listening ? 'hot' : ''}`}>
          {Array.from({ length: 36 }).map((_, i) => <i key={i} style={{ '--n': i }} />)}
        </div>
        <div className="command-copy">
          <div className="eyebrow">VOICE COMMAND</div>
          <h2>{listening ? 'Σε ακούω…' : 'Μίλησε στο BookieOS'}</h2>
          <p>{listening ? 'Το BookieOS αναλύει και δρομολογεί το αίτημα.' : 'Το σύστημα θα επιλέξει αυτόματα τον σωστό agent.'}</p>
        </div>
        <button className={`activate-button ${listening ? 'active' : ''}`} onClick={activate}>
          <span className="button-rings"><i /><i /><i /></span>
          <b>{listening ? 'LISTENING' : 'ACTIVATE'}</b>
        </button>
      </section>

      <section className="activity-strip">
        <div className="activity-title">LIVE SYSTEM ACTIVITY</div>
        <div className="activity-feed">
          {activity.map((item, i) => <span key={`${item}-${i}`}><b>{`03:4${2 + i}:${18 + i * 5}`}</b>{item}</span>)}
        </div>
      </section>

      <footer>
        <span>BOOKIEOS // CINEMATIC NEURAL INTERFACE</span>
        <span>BOOKIECO INTERNAL SYSTEM · CYPRUS</span>
      </footer>
    </main>
  );
}

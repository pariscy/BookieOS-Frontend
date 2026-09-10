'use client';

import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

const agents = [
  ['WEEKLY MATCH SCOUT', 'ONLINE', '⚽'],
  ['BET RESEARCHER', 'ONLINE', '▥'],
  ['MARKETING MANAGER', 'ONLINE', '◈'],
  ['SPORTS NEWS', 'ONLINE', '▤'],
  ['COMPETITOR WATCH', 'STANDBY', '◉'],
  ['SPORTS CALENDAR', 'ONLINE', '▦'],
  ['ARTICLE WRITER', 'STANDBY', '▧'],
  ['BRAINSTORM', 'ONLINE', '✦'],
];

const agentPositions = [
  ['WEEKLY MATCH SCOUT', 50, 13, '⚽'],
  ['BET RESEARCHER', 76, 22, '▥'],
  ['MARKETING MANAGER', 82, 51, '◈'],
  ['SPORTS NEWS', 70, 78, '▤'],
  ['COMPETITOR WATCH', 50, 86, '◉'],
  ['SPORTS CALENDAR', 29, 78, '▦'],
  ['ARTICLE WRITER', 18, 51, '▧'],
  ['BRAINSTORM', 25, 23, '✦'],
];

function HoloCore({ active }) {
  const group = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const ringC = useRef();
  const core = useRef();

  const particles = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 620; i += 1) {
      const r = 2.8 + Math.random() * 5.4;
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 5.4;
      pts.push(Math.cos(a) * r, y, Math.sin(a) * r);
    }
    return new Float32Array(pts);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.045;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.045;
    ringA.current.rotation.z += delta * 0.22;
    ringB.current.rotation.x -= delta * 0.17;
    ringC.current.rotation.y += delta * 0.26;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * (active ? 4.8 : 2.1)) * (active ? 0.045 : 0.018);
    core.current.scale.setScalar(pulse);
  });

  return (
    <group ref={group} scale={1.12}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#F1C400" size={0.028} transparent opacity={0.34} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      <mesh ref={ringA} rotation={[1.02, 0.2, 0.18]}>
        <torusGeometry args={[3.5, 0.016, 8, 220]} />
        <meshBasicMaterial color="#F1C400" transparent opacity={0.56} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ringB} rotation={[0.38, 0.58, 1.1]}>
        <torusGeometry args={[3.08, 0.019, 8, 190]} />
        <meshBasicMaterial color="#44883E" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ringC} rotation={[0.72, 1.08, 0.44]}>
        <torusGeometry args={[2.68, 0.018, 8, 170]} />
        <meshBasicMaterial color="#F1C400" transparent opacity={0.32} blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh ref={core}>
        <icosahedronGeometry args={[1.58, 4]} />
        <meshPhongMaterial color="#111811" emissive={active ? '#F1C400' : '#6d5a05'} emissiveIntensity={active ? 1.15 : 0.38} transparent opacity={0.52} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.22, 64, 64]} />
        <meshPhongMaterial color="#061006" emissive="#2f7632" emissiveIntensity={active ? 1.5 : 0.62} transparent opacity={0.56} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.92, 64, 64]} />
        <meshPhongMaterial color="#020402" emissive={active ? '#e2bf16' : '#244b22'} emissiveIntensity={active ? 0.65 : 0.22} transparent opacity={0.9} />
      </mesh>

      <pointLight color="#F1C400" intensity={active ? 9 : 4.2} distance={18} />
      <pointLight color="#44883E" intensity={active ? 6 : 3} distance={16} position={[0, 0, 1]} />
    </group>
  );
}

export default function Home() {
  const [activeAgent, setActiveAgent] = useState(null);
  const [listening, setListening] = useState(false);
  const activate = () => {
    const nextListening = !listening;
    setListening(nextListening);
    setActiveAgent(nextListening ? 'MARKETING MANAGER' : null);
  };

  return (
    <main className={`cinematic-shell ${listening ? 'is-listening' : ''}`}>
      <div className="film-grain" /><div className="world-grid" /><div className="vignette" /><div className="scan-beam" />
      <header className="cinematic-topbar">
        <div className="header-left">
          <div className="eyebrow">BOOKIECO // ARTIFICIAL INTELLIGENCE DIVISION</div>
          <div className="brand">BI<span>ON</span></div>
          <div className="brand-sub">BOOKIECO INTELLIGENCE OPERATIONS NETWORK</div>
        </div>
        <div className="company-mark">Bookie<span>Co</span><small>PLAY SMARTER</small></div>
        <div className="top-status"><div><span className="live-dot" /> SYSTEM ONLINE</div><small>CYPRUS NODE · LIVE</small></div>
      </header>

      <section className="cinematic-stage">
        <div className="stage-map" /><div className="atmosphere atmosphere-a" /><div className="atmosphere atmosphere-b" />
        <div className="core-canvas"><Canvas camera={{ position: [0, 0.1, 8.6], fov: 42 }} dpr={[1, 1.6]}><ambientLight intensity={0.12} /><HoloCore active={listening} /></Canvas></div>
        <div className="core-title">
          <small>{listening ? 'VOICE LINK ACTIVE' : 'NEURAL CORE ONLINE'}</small>
          <strong>BION</strong>
          <div className="core-fullname">BOOKIECO INTELLIGENCE<br/>OPERATIONS NETWORK</div>
          <span>{listening ? 'ΔΡΟΜΟΛΟΓΗΣΗ ΕΝΤΟΛΗΣ' : 'ΑΝΑΜΟΝΗ ΕΝΤΟΛΗΣ'}</span>
        </div>
        <div className="radar-sweep" /><div className="crosshair horizontal" /><div className="crosshair vertical" />
        <svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {agentPositions.map(([name, x, y]) => <line key={name} x1="50" y1="50" x2={x} y2={y} className={activeAgent === name ? 'active-line' : ''} />)}
        </svg>
        {agentPositions.map(([name, x, y, icon], i) => (
          <motion.button key={name} className={`agent-node ${activeAgent === name ? 'active' : ''}`} style={{ left: `${x}%`, top: `${y}%` }} initial={{ opacity: 0, scale: 0.65 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.18 + i * 0.07 }} onClick={() => setActiveAgent(activeAgent === name ? null : name)}>
            <span className="node-hex">{icon}</span><b>{name}</b><small>{activeAgent === name ? 'ACTIVE LINK' : 'STANDBY'}</small>
          </motion.button>
        ))}
        <aside className="floating-panel left-panel">
          <div className="panel-cap">AI AGENT MATRIX</div>
          {agents.map(([name, status], i) => <div className={`mini-agent ${activeAgent === name ? 'selected' : ''}`} key={name} onClick={() => setActiveAgent(name)}><span>0{i + 1}</span><b>{name}</b><i className={status === 'ONLINE' ? 'online' : ''} /></div>)}
        </aside>
        <aside className="floating-panel global-feed">
          <div className="panel-cap">GLOBAL FEED</div><div className="map-dots" />
          <div className="feed-stat"><span>ΑΓΟΡΕΣ ΥΠΟ ΠΑΡΑΚΟΛΟΥΘΗΣΗ</span><b>120+</b></div><div className="feed-stat"><span>LIVE EVENTS</span><b>342</b></div><div className="feed-stat"><span>DATA SOURCES</span><b>18</b></div>
        </aside>
        <aside className="floating-panel right-panel">
          <div className="panel-cap">SYSTEM TELEMETRY</div>
          <div className="telemetry"><span>AI CORE</span><b>100%</b></div><div className="meter"><i style={{ width: '100%' }} /></div>
          <div className="telemetry"><span>AGENT LINK</span><b>{activeAgent ? '100%' : '87%'}</b></div><div className="meter"><i style={{ width: activeAgent ? '100%' : '87%' }} /></div>
          <div className="telemetry"><span>DATA FEED</span><b>94%</b></div><div className="meter"><i style={{ width: '94%' }} /></div>
          <div className="telemetry"><span>VOICE ARRAY</span><b>{listening ? 'LIVE' : 'ARMED'}</b></div><div className="signal-grid">{Array.from({ length: 28 }).map((_, i) => <i key={i} />)}</div>
          <div className="secondary-panel"><div className="panel-cap">LIVE ACTIVITY</div><div className="activity-list"><p><b>12:41:03</b><span>BION Core online</span></p><p><b>12:41:07</b><span>Web sources connected</span></p><p><b>12:41:12</b><span>Agent network ready</span></p><p><b>12:41:18</b><span>Cyprus node stable</span></p><p><b>12:41:24</b><span>Voice system armed</span></p></div></div>
          <div className="secondary-panel"><div className="panel-cap">UPCOMING FIXTURES</div><div className="fixture"><i>⚽</i><div><b>Champions League</b><small>Σήμερα · 22:00</small></div></div><div className="fixture"><i>◉</i><div><b>Premier League</b><small>Αύριο · 19:30</small></div></div><div className="fixture"><i>◆</i><div><b>La Liga</b><small>Αύριο · 20:00</small></div></div><div className="fixture"><i>⬡</i><div><b>Serie A</b><small>Αύριο · 21:45</small></div></div></div>
        </aside>
        <AnimatePresence>{activeAgent && <motion.div className="agent-readout" initial={{ opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }}><small>ACTIVE AGENT</small><strong>{activeAgent}</strong><span>Secure neural link established</span></motion.div>}</AnimatePresence>
      </section>

      <section className="command-console">
        <div className={`voice-wave ${listening ? 'hot' : ''}`}>{Array.from({ length: 42 }).map((_, i) => <i key={i} style={{ '--n': i }} />)}</div>
        <div className="command-center"><div className="mic-medallion">●</div><div className="command-copy"><div className="eyebrow">VOICE COMMAND</div><h2>{listening ? 'Σε ακούω…' : 'Μίλησε στο BION'}</h2><p>{listening ? 'Το BION αναλύει και δρομολογεί το αίτημα.' : 'Το σύστημα θα επιλέξει αυτόματα τον σωστό agent.'}</p></div></div>
        <button className={`activate-button ${listening ? 'active' : ''}`} onClick={activate}><span className="button-rings"><i /><i /><i /></span><b>{listening ? 'LISTENING' : 'ACTIVATE'}</b></button>
      </section>
      <section className="mode-strip"><b>ANALYSE</b><span>·</span><span>RESEARCH</span><span>·</span><span>CREATE</span><span>·</span><span>MONITOR</span><span>·</span><span>OPTIMISE</span><span>·</span><span>GROW</span></section>
      <footer><span>BION // BOOKIECO INTELLIGENCE OPERATIONS NETWORK</span><span className="footer-yellow">POWERED BY AI // BUILT FOR BETTORS</span></footer>
    </main>
  );
}

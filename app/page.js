'use client';

import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const agents = [
  { name: 'WEEKLY MATCH SCOUT', key: 'scout', icon: '⚽', status: 'ONLINE' },
  { name: 'BET RESEARCHER', key: 'bet', icon: '▥', status: 'ONLINE' },
  { name: 'MARKETING MANAGER', key: 'marketing', icon: '◈', status: 'ONLINE' },
  { name: 'SPORTS NEWS', key: 'news', icon: '▤', status: 'ONLINE' },
  { name: 'COMPETITOR WATCH', key: 'competitor', icon: '◉', status: 'ONLINE' },
  { name: 'SPORTS CALENDAR', key: 'calendar', icon: '▦', status: 'ONLINE' },
  { name: 'ARTICLE WRITER', key: 'article', icon: '▧', status: 'ONLINE' },
  { name: 'BRAINSTORM', key: 'brainstorm', icon: '✦', status: 'ONLINE' },
  { name: 'RESEARCH AGENT 09', key: 'research', icon: '⌕', status: 'TEST' },
];

const nodePositions = [
  ['WEEKLY MATCH SCOUT', 50, 13, '⚽'], ['BET RESEARCHER', 76, 22, '▥'],
  ['MARKETING MANAGER', 82, 51, '◈'], ['SPORTS NEWS', 70, 78, '▤'],
  ['COMPETITOR WATCH', 50, 86, '◉'], ['SPORTS CALENDAR', 29, 78, '▦'],
  ['ARTICLE WRITER', 18, 51, '▧'], ['BRAINSTORM', 25, 23, '✦'],
];

const defaults = {
  weekly: 'Βρες τους καλύτερους αγώνες της επόμενης εβδομάδας για marketing.',
  research: 'Research the most interesting football matches in the next 7 days for a Cyprus betting audience. Identify 5 matches, explain why each is interesting, and suggest betting-market angles worth investigating. Do not invent odds.',
  scout: 'Βρες τους σημαντικότερους αγώνες της επόμενης εβδομάδας για το κυπριακό κοινό.',
  bet: 'Ανάλυσε τα betting angles που σου δίνω και πες ποια είναι STRONG, REASONABLE ή WEAK.',
  marketing: 'Αξιολόγησε τις παρακάτω sports marketing ευκαιρίες για τη BookieCo.',
  news: 'Κάνε έλεγχο για σημαντικά sports news που μπορούν να επηρεάσουν betting analysis ή marketing.',
  competitor: 'Έλεγξε τις πρόσφατες δημόσιες marketing καμπάνιες και προσφορές σχετικών betting competitors στην Κύπρο.',
  calendar: 'Δημιούργησε Sports Calendar για τις επόμενες 90 ημέρες με σημαντικές marketing ευκαιρίες.',
  article: '',
  brainstorm: '',
};

function HoloCore({ active }) {
  const group = useRef(); const ringA = useRef(); const ringB = useRef(); const ringC = useRef(); const core = useRef();
  const particles = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 620; i += 1) {
      const r = 2.8 + Math.random() * 5.4; const a = Math.random() * Math.PI * 2; const y = (Math.random() - 0.5) * 5.4;
      pts.push(Math.cos(a) * r, y, Math.sin(a) * r);
    }
    return new Float32Array(pts);
  }, []);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.045; group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.045;
    ringA.current.rotation.z += delta * 0.22; ringB.current.rotation.x -= delta * 0.17; ringC.current.rotation.y += delta * 0.26;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * (active ? 4.8 : 2.1)) * (active ? 0.045 : 0.018); core.current.scale.setScalar(pulse);
  });
  return <group ref={group} scale={1.12}>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} /></bufferGeometry><pointsMaterial color="#F1C400" size={0.028} transparent opacity={0.34} blending={THREE.AdditiveBlending} depthWrite={false} /></points>
    <mesh ref={ringA} rotation={[1.02,.2,.18]}><torusGeometry args={[3.5,.016,8,220]} /><meshBasicMaterial color="#F1C400" transparent opacity={.56} blending={THREE.AdditiveBlending} /></mesh>
    <mesh ref={ringB} rotation={[.38,.58,1.1]}><torusGeometry args={[3.08,.019,8,190]} /><meshBasicMaterial color="#44883E" transparent opacity={.5} blending={THREE.AdditiveBlending} /></mesh>
    <mesh ref={ringC} rotation={[.72,1.08,.44]}><torusGeometry args={[2.68,.018,8,170]} /><meshBasicMaterial color="#F1C400" transparent opacity={.32} blending={THREE.AdditiveBlending} /></mesh>
    <mesh ref={core}><icosahedronGeometry args={[1.58,4]} /><meshPhongMaterial color="#111811" emissive={active?'#F1C400':'#6d5a05'} emissiveIntensity={active?1.15:.38} transparent opacity={.52} wireframe /></mesh>
    <mesh><sphereGeometry args={[1.22,64,64]} /><meshPhongMaterial color="#061006" emissive="#2f7632" emissiveIntensity={active?1.5:.62} transparent opacity={.56} /></mesh>
    <mesh><sphereGeometry args={[.92,64,64]} /><meshPhongMaterial color="#020402" emissive={active?'#e2bf16':'#244b22'} emissiveIntensity={active?.65:.22} transparent opacity={.9} /></mesh>
    <pointLight color="#F1C400" intensity={active?9:4.2} distance={18} /><pointLight color="#44883E" intensity={active?6:3} distance={16} position={[0,0,1]} />
  </group>;
}

function Report({ text }) {
  if (!text) return <div className="report-empty"><b>BION WORKSPACE</b><span>Διάλεξε agent, γράψε το αίτημά σου και πάτησε RUN AGENT.</span></div>;
  return <>{text.split('\n').map((line, i) => {
    const s = line.trim();
    if (!s) return <div key={i} style={{height:7}} />;
    if (s === '---') return <div key={i} className="report-rule" />;
    if (s.startsWith('## ')) return <div key={i} className="report-heading">{s.slice(3)}</div>;
    if (s.startsWith('### ')) return <div key={i} className="report-subheading">{s.slice(4)}</div>;
    if (s.startsWith('- ') || s.startsWith('• ')) return <p key={i} className="bullet">{s.slice(2)}</p>;
    return <p key={i}>{s.replace(/\*\*/g,'')}</p>;
  })}</>;
}

function chooseAgent(text) {
  const t = text.toLowerCase();
  if (t.includes('research') || t.includes('έρευνα') || t.includes('ερεύνη')) return 'research';
  if (t.includes('άρθρο') || t.includes('article')) return 'article';
  if (t.includes('brainstorm') || t.includes('ιδέ')) return 'brainstorm';
  if (t.includes('ανταγωνισ') || t.includes('competitor')) return 'competitor';
  if (t.includes('news') || t.includes('τραυματ') || t.includes('τιμωρ')) return 'news';
  if (t.includes('calendar') || t.includes('ημερολόγ')) return 'calendar';
  if (t.includes('week') || t.includes('εβδομάδ') || t.includes('αγών')) return 'weekly';
  return 'research';
}

export default function Home() {
  const [activeAgent, setActiveAgent] = useState(null);
  const [workspace, setWorkspace] = useState(false);
  const [agentKey, setAgentKey] = useState('research');
  const [prompt, setPrompt] = useState(defaults.research);
  const [articleLength, setArticleLength] = useState('Medium');
  const [result, setResult] = useState('');
  const [resultTitle, setResultTitle] = useState('BION WORKSPACE');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [listening, setListening] = useState(false);
  const [command, setCommand] = useState('');

  const openAgent = (name) => {
    const a = agents.find(x => x.name === name); if (!a) return;
    setActiveAgent(name); setAgentKey(a.key); setPrompt(defaults[a.key] ?? ''); setWorkspace(true); setError('');
  };
  const selectAgent = (key) => {
    const a = agents.find(x => x.key === key); setAgentKey(key); setActiveAgent(a?.name || null); setPrompt(defaults[key] ?? ''); setError('');
  };

  async function runAgent(key = agentKey, text = prompt) {
    if (!text.trim()) { setError('Γράψε πρώτα τι θέλεις να κάνει ο agent.'); return; }
    setLoading(true); setError(''); setResult('');
    try {
      const res = await fetch('/api/bion', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ agent:key, prompt:text, options:{length:articleLength} }) });
      const data = await res.json(); if (!res.ok) throw new Error(data.error || 'BION backend error');
      setResultTitle(data.title || 'BION'); setResult(data.result || ''); setWorkspace(true);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  function activateVoice() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { setError('Ο browser δεν υποστηρίζει voice recognition. Μπορείς να χρησιμοποιήσεις το command box.'); setWorkspace(true); return; }
    const recognition = new SpeechRecognition(); recognition.lang = 'el-GR'; recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript; const key = chooseAgent(text); setCommand(text); selectAgent(key); setPrompt(text); setWorkspace(true); runAgent(key, text);
    };
    recognition.start();
  }

  function runCommand() { const text = command.trim(); if (!text) return; const key = chooseAgent(text); selectAgent(key); setPrompt(text); setWorkspace(true); runAgent(key, text); }

  const selected = agents.find(a => a.key === agentKey);

  return <main className={`cinematic-shell ${listening?'is-listening':''}`}>
    <div className="film-grain" /><div className="world-grid" /><div className="vignette" /><div className="scan-beam" />
    <header className="cinematic-topbar"><div className="header-left"><div className="eyebrow">BOOKIECO // ARTIFICIAL INTELLIGENCE DIVISION</div><div className="brand">BI<span>ON</span></div><div className="brand-sub">BOOKIECO INTELLIGENCE OPERATIONS NETWORK</div></div><div className="company-mark">Bookie<span>Co</span><small>PLAY SMARTER</small></div><div className="top-status"><div><span className="live-dot" /> SYSTEM ONLINE</div><small>CYPRUS NODE · LIVE</small></div></header>

    <section className={`cinematic-stage ${workspace?'workspace-active':''}`}>
      {!workspace && <>
        <div className="stage-map" /><div className="atmosphere atmosphere-a" /><div className="atmosphere atmosphere-b" />
        <div className="core-canvas"><Canvas camera={{position:[0,.1,8.6],fov:42}} dpr={[1,1.6]}><ambientLight intensity={.12}/><HoloCore active={listening}/></Canvas></div>
        <div className="core-title"><small>{listening?'VOICE LINK ACTIVE':'NEURAL CORE ONLINE'}</small><strong>BION</strong><div className="core-fullname">BOOKIECO INTELLIGENCE<br/>OPERATIONS NETWORK</div><span>{listening?'ΔΡΟΜΟΛΟΓΗΣΗ ΕΝΤΟΛΗΣ':'ΑΝΑΜΟΝΗ ΕΝΤΟΛΗΣ'}</span></div>
        <div className="radar-sweep" /><div className="crosshair horizontal" /><div className="crosshair vertical" />
        <svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none">{nodePositions.map(([name,x,y])=><line key={name} x1="50" y1="50" x2={x} y2={y} className={activeAgent===name?'active-line':''}/>)}</svg>
        {nodePositions.map(([name,x,y,icon],i)=><motion.button key={name} className={`agent-node ${activeAgent===name?'active':''}`} style={{left:`${x}%`,top:`${y}%`}} initial={{opacity:0,scale:.65}} animate={{opacity:1,scale:1}} transition={{delay:.18+i*.07}} onClick={()=>openAgent(name)}><span className="node-hex">{icon}</span><b>{name}</b><small>OPEN WORKSPACE</small></motion.button>)}
        <aside className="floating-panel left-panel"><div className="panel-cap">AI AGENT MATRIX</div>{agents.map((a,i)=><div className={`mini-agent ${activeAgent===a.name?'selected':''}`} key={a.name} onClick={()=>openAgent(a.name)}><span>0{i+1}</span><b>{a.name}</b><i className={a.status==='ONLINE'?'online':''}/></div>)}</aside>
        <aside className="floating-panel right-panel"><div className="panel-cap">SYSTEM TELEMETRY</div><div className="telemetry"><span>AI CORE</span><b>100%</b></div><div className="meter"><i style={{width:'100%'}}/></div><div className="telemetry"><span>AGENT NETWORK</span><b>09</b></div><div className="meter"><i style={{width:'100%'}}/></div><div className="telemetry"><span>VOICE ARRAY</span><b>{listening?'LIVE':'ARMED'}</b></div><div className="signal-grid">{Array.from({length:28}).map((_,i)=><i key={i}/>)}</div><div className="secondary-panel"><div className="panel-cap">LIVE ACTIVITY</div><div className="activity-list"><p><b>CORE</b><span>BION online</span></p><p><b>AGENTS</b><span>9 agents registered</span></p><p><b>WEB</b><span>Research tools ready</span></p></div></div></aside>
      </>}

      {workspace && <div className="workspace-overlay">
        <section className="workspace-main"><div className="workspace-head"><div><small>ACTIVE WORKSPACE // {selected?.status || 'ONLINE'}</small><h2>{resultTitle}</h2></div><div className="workspace-actions"><button className="hud-btn" onClick={()=>{setWorkspace(false);setError('')}}>← CORE</button><button className="hud-btn" onClick={()=>setResult('')}>CLEAR</button></div></div><div className="report-scroll"><Report text={result}/></div></section>
        <aside className="workspace-side"><div className="control-title">AI AGENT MATRIX</div><div className="agent-menu"><button className={agentKey==='weekly'?'active':''} onClick={()=>selectAgent('weekly')}><span>⟳</span><div><b>WEEKLY WORKFLOW</b><small>Scout → Bet Researcher → Marketing</small></div></button>{agents.map(a=><button key={a.key} className={agentKey===a.key?'active':''} onClick={()=>selectAgent(a.key)}><span>{a.icon}</span><div><b>{a.name}</b><small>{a.status}</small></div></button>)}</div>
          <div className="agent-form"><div className="control-title">{agentKey==='weekly'?'WEEKLY WORKFLOW':selected?.name}</div><label>ΓΡΑΨΕ ΤΟ ΑΙΤΗΜΑ</label><textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Γράψε εδώ..." />{agentKey==='article'&&<><label>ΜΗΚΟΣ ΑΡΘΡΟΥ</label><select value={articleLength} onChange={e=>setArticleLength(e.target.value)}><option>Short</option><option>Medium</option><option>Long</option></select></>}<button className="run-agent" disabled={loading} onClick={()=>runAgent()}>{loading?'BION WORKING…':'RUN AGENT'}</button>{loading&&<div className="workspace-loading"><i/>Live agent processing…</div>}{error&&<div className="workspace-error">{error}</div>}<div className="workspace-note">Τα αποτελέσματα εμφανίζονται στο μεγάλο αριστερό panel. Το control panel και το report κάνουν scroll ανεξάρτητα.</div></div>
        </aside>
      </div>}
    </section>

    <section className="command-console"><div className={`voice-wave ${listening?'hot':''}`}>{Array.from({length:42}).map((_,i)=><i key={i} style={{'--n':i}}/>)}</div><div className="command-center"><div className="mic-medallion">●</div><div className="command-copy"><div className="eyebrow">BION COMMAND</div><h2>{listening?'Σε ακούω…':'Μίλησε ή γράψε στο BION'}</h2><div className="quick-command"><input value={command} onChange={e=>setCommand(e.target.value)} onKeyDown={e=>e.key==='Enter'&&runCommand()} placeholder="π.χ. Κάνε research για τους αγώνες της επόμενης εβδομάδας..."/><button onClick={runCommand}>RUN</button></div></div></div><button className={`activate-button ${listening?'active':''}`} onClick={activateVoice}><span className="button-rings"><i/><i/><i/></span><b>{listening?'LISTENING':'ACTIVATE'}</b></button></section>
    <section className="mode-strip"><b>ANALYSE</b><span>·</span><span>RESEARCH</span><span>·</span><span>CREATE</span><span>·</span><span>MONITOR</span><span>·</span><span>OPTIMISE</span><span>·</span><span>GROW</span></section>
    <footer><span>BION // BOOKIECO INTELLIGENCE OPERATIONS NETWORK</span><span className="footer-yellow">9 AGENTS // LIVE WORKSPACE</span></footer>
  </main>;
}

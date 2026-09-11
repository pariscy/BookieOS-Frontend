'use client';

import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const agents = [
  {key:'scout',name:'WEEKLY MATCH SCOUT',status:'ONLINE',icon:'⚽'},
  {key:'bet',name:'BET RESEARCHER',status:'ONLINE',icon:'▥'},
  {key:'marketing',name:'MARKETING MANAGER',status:'ONLINE',icon:'◈'},
  {key:'news',name:'SPORTS NEWS',status:'ONLINE',icon:'▤'},
  {key:'competitor',name:'COMPETITOR WATCH',status:'ONLINE',icon:'◉'},
  {key:'calendar',name:'SPORTS CALENDAR',status:'ONLINE',icon:'▦'},
  {key:'article',name:'ARTICLE WRITER',status:'ONLINE',icon:'▧'},
  {key:'brainstorm',name:'BRAINSTORM',status:'ONLINE',icon:'✦'},
  {key:'research',name:'RESEARCH AGENT 09',status:'TEST',icon:'⌕'},
];

const defaults = {
  weekly:'Βρες τους καλύτερους αγώνες της επόμενης εβδομάδας για marketing.',
  research:'Κάνε deep research για τους σημαντικότερους ποδοσφαιρικούς αγώνες της επόμενης εβδομάδας για marketing στην Κύπρο.',
  scout:'Βρες τους καλύτερους αγώνες της επόμενης εβδομάδας για marketing.',
  bet:'Κάνε research για τις καλύτερες betting angles των σημαντικότερων αγώνων.',
  marketing:'Ποια sports opportunities αξίζει να προωθήσουμε;',
  news:'Κάνε ανεξάρτητο έλεγχο τώρα για σημαντικές απουσίες στα επόμενα παιχνίδια: major injuries, παίκτες που είναι ruled out, suspensions από red cards, second yellow ή yellow-card accumulation, και σημαντικές επιστροφές. Βρες μόνος σου τα σχετικά upcoming fixtures και χρησιμοποίησε live web research.',
  competitor:'Έλεγξε τώρα την πρόσφατη δημόσια δραστηριότητα και promotions των βασικών ανταγωνιστών μας στην Κύπρο.',
  calendar:'Δημιούργησε τώρα sports calendar για τις επόμενες 90 ημέρες με τα σημαντικότερα events για marketing στην Κύπρο.',
  article:'',
  brainstorm:''
};

const instantAgents = new Set(['weekly','news','competitor','calendar']);

const nodePositions=[['WEEKLY MATCH SCOUT',50,12,'⚽'],['BET RESEARCHER',75,18,'▥'],['MARKETING MANAGER',84,42,'◈'],['SPORTS NEWS',79,69,'▤'],['COMPETITOR WATCH',61,84,'◉'],['RESEARCH AGENT 09',39,84,'⌕'],['SPORTS CALENDAR',21,69,'▦'],['ARTICLE WRITER',16,42,'▧'],['BRAINSTORM',25,18,'✦']];

function HoloCore({active}){
  const g=useRef(),a=useRef(),b=useRef(),c=useRef(),core=useRef();
  const particles=useMemo(()=>{const p=[];for(let i=0;i<620;i++){const r=2.8+Math.random()*5.4,x=Math.random()*Math.PI*2,y=(Math.random()-.5)*5.4;p.push(Math.cos(x)*r,y,Math.sin(x)*r)}return new Float32Array(p)},[]);
  useFrame((s,d)=>{if(!g.current)return;g.current.rotation.y+=d*.045;a.current.rotation.z+=d*.22;b.current.rotation.x-=d*.17;c.current.rotation.y+=d*.26;core.current.scale.setScalar(1+Math.sin(s.clock.elapsedTime*(active?4.8:2.1))*(active?.045:.018))});
  return <group ref={g} scale={1.12}><points><bufferGeometry><bufferAttribute attach="attributes-position" count={particles.length/3} array={particles} itemSize={3}/></bufferGeometry><pointsMaterial color="#F1C400" size={.028} transparent opacity={.34}/></points><mesh ref={a} rotation={[1.02,.2,.18]}><torusGeometry args={[3.5,.016,8,220]}/><meshBasicMaterial color="#F1C400" transparent opacity={.56}/></mesh><mesh ref={b} rotation={[.38,.58,1.1]}><torusGeometry args={[3.08,.019,8,190]}/><meshBasicMaterial color="#44883E" transparent opacity={.5}/></mesh><mesh ref={c} rotation={[.72,1.08,.44]}><torusGeometry args={[2.68,.018,8,170]}/><meshBasicMaterial color="#F1C400" transparent opacity={.32}/></mesh><mesh ref={core}><icosahedronGeometry args={[1.58,4]}/><meshPhongMaterial color="#111811" emissive={active?'#F1C400':'#6d5a05'} emissiveIntensity={active?1.15:.38} transparent opacity={.52} wireframe/></mesh><mesh><sphereGeometry args={[1.22,64,64]}/><meshPhongMaterial color="#061006" emissive="#2f7632" emissiveIntensity={active?1.5:.62} transparent opacity={.56}/></mesh><mesh><sphereGeometry args={[.92,64,64]}/><meshPhongMaterial color="#020402" emissive={active?'#e2bf16':'#244b22'} emissiveIntensity={active?.65:.22} transparent opacity={.9}/></mesh><pointLight color="#F1C400" intensity={active?9:4.2} distance={18}/><pointLight color="#44883E" intensity={active?6:3} distance={16}/></group>
}

function chooseAgent(t){
  const s=t.toLowerCase();
  if(s.includes('deep research')||s.includes('research agent')||s.includes('κάνε έρευνα')||s.includes('κανε ερευνα')||s.includes('βαθιά έρευνα')||s.includes('ερεύνησε'))return'research';
  if(s.includes('άρθρ')||s.includes('article'))return'article';
  if(s.includes('brainstorm')||s.includes('ιδέ'))return'brainstorm';
  if(s.includes('ανταγωνισ'))return'competitor';
  if(s.includes('calendar')||s.includes('ημερολόγ'))return'calendar';
  if(s.includes('injur')||s.includes('τραυμα')||s.includes('red card')||s.includes('suspens')||s.includes('κάρτ')||s.includes('news')||s.includes('νέα')||s.includes('ειδήσ'))return'news';
  if(s.includes('bet research')||s.includes('bet type'))return'bet';
  if(s.includes('marketing manager'))return'marketing';
  if(s.includes('weekly')||s.includes('εβδομάδ'))return'weekly';
  return'research';
}

function Report({text}){
  if(!text)return <div className="empty-report"><h2>BION WORKSPACE</h2><p>Διάλεξε agent. Οι agents που δεν χρειάζονται brief ξεκινούν αμέσως με ένα click.</p></div>;
  return <div className="report-content">{text.split('\n').map((l,i)=>l.startsWith('### ')?<h3 key={i}>{l.slice(4)}</h3>:l.startsWith('## ')?<h2 key={i}>{l.slice(3)}</h2>:l.startsWith('# ')?<h1 key={i}>{l.slice(2)}</h1>:l.startsWith('- ')?<div className="report-bullet" key={i}>• {l.slice(2)}</div>:l.trim()==='---'?<hr key={i}/>:<p key={i}>{l||' '}</p>)}</div>;
}

export default function Home(){
  const[workspace,setWorkspace]=useState(false),[agentKey,setAgentKey]=useState('research'),[activeAgent,setActiveAgent]=useState(null),[prompt,setPrompt]=useState(defaults.research),[command,setCommand]=useState(''),[result,setResult]=useState(''),[resultTitle,setResultTitle]=useState('BION WORKSPACE'),[loading,setLoading]=useState(false),[error,setError]=useState(''),[listening,setListening]=useState(false),[articleLength,setArticleLength]=useState('Short');
  const selected=agents.find(a=>a.key===agentKey);

  const selectAgent=(key)=>{
    const a=agents.find(x=>x.key===key);
    setAgentKey(key);setActiveAgent(a?.name||null);setPrompt(defaults[key]??'');setError('');
  };

  async function runAgent(key=agentKey,text=prompt){
    if(!text.trim()){setError('Γράψε πρώτα τι θέλεις να κάνει ο agent.');return;}
    setLoading(true);setError('');setResult('');
    try{
      const res=await fetch('/api/bion',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({agent:key,prompt:text,options:{length:articleLength}})});
      const raw=await res.text();
      let data;
      try{data=JSON.parse(raw)}catch{throw new Error(res.ok?'Το BION backend επέστρεψε μη αναμενόμενη απάντηση.':'BION backend error: '+(raw.slice(0,220)||`HTTP ${res.status}`))}
      if(!res.ok)throw new Error(data.error||`BION backend error (${res.status})`);
      setResultTitle(data.title||'BION');setResult(data.result||'');setWorkspace(true);
    }catch(e){setError(e.message)}finally{setLoading(false)}
  }

  function activateAgent(key){
    const a=agents.find(x=>x.key===key);
    setAgentKey(key);setActiveAgent(a?.name||null);setPrompt(defaults[key]??'');setError('');setWorkspace(true);
    if(instantAgents.has(key)) runAgent(key,defaults[key]||'Run now.');
  }

  function openAgent(name){
    const a=agents.find(x=>x.name===name);
    if(a) activateAgent(a.key);
  }

  function activateVoice(){
    if(typeof window==='undefined')return;
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){setError('Ο browser δεν υποστηρίζει voice recognition. Μπορείς να χρησιμοποιήσεις το command box.');setWorkspace(true);return;}
    const r=new SR();r.lang='el-GR';r.interimResults=false;
    r.onstart=()=>setListening(true);r.onend=()=>setListening(false);r.onerror=()=>setListening(false);
    r.onresult=e=>{const text=e.results[0][0].transcript,key=chooseAgent(text);setCommand(text);selectAgent(key);setPrompt(text);setWorkspace(true);runAgent(key,text)};
    r.start();
  }

  function runCommand(){
    const text=command.trim();if(!text)return;
    const key=chooseAgent(text);selectAgent(key);setPrompt(text);setWorkspace(true);runAgent(key,text);
  }

  return <main className={`cinematic-shell ${listening?'is-listening':''}`}>
    <div className="film-grain"/><div className="world-grid"/><div className="vignette"/><div className="scan-beam"/>
    <header className="cinematic-topbar"><div className="header-left"><div className="eyebrow">BOOKIECO // ARTIFICIAL INTELLIGENCE DIVISION</div><div className="brand">BI<span>ON</span></div><div className="brand-sub">BOOKIECO INTELLIGENCE OPERATIONS NETWORK</div></div><div className="company-mark">Bookie<span>Co</span><small>PLAY SMARTER</small></div><div className="top-status"><div><span className="live-dot"/> SYSTEM ONLINE</div><small>CYPRUS NODE · LIVE</small></div></header>

    <section className={`cinematic-stage ${workspace?'workspace-active':''}`}>
      {!workspace&&<>
        <div className="stage-map"/><div className="atmosphere atmosphere-a"/><div className="atmosphere atmosphere-b"/>
        <div className="core-canvas"><Canvas camera={{position:[0,.1,8.6],fov:42}} dpr={[1,1.6]}><ambientLight intensity={.12}/><HoloCore active={listening}/></Canvas></div>
        <div className="core-title"><small>{listening?'VOICE LINK ACTIVE':'NEURAL CORE ONLINE'}</small><strong>BION</strong><div className="core-fullname">BOOKIECO INTELLIGENCE<br/>OPERATIONS NETWORK</div><span>{listening?'ΔΡΟΜΟΛΟΓΗΣΗ ΕΝΤΟΛΗΣ':'ΑΝΑΜΟΝΗ ΕΝΤΟΛΗΣ'}</span></div>
        <div className="radar-sweep"/><div className="crosshair horizontal"/><div className="crosshair vertical"/>
        <svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none">{nodePositions.map(([name,x,y])=><line key={name} x1="50" y1="50" x2={x} y2={y} className={activeAgent===name?'active-line':''}/>)}</svg>
        {nodePositions.map(([name,x,y,icon],i)=><motion.button key={name} className={`agent-node ${activeAgent===name?'active':''}`} style={{left:`${x}%`,top:`${y}%`}} initial={{opacity:0,scale:.65}} animate={{opacity:1,scale:1}} transition={{delay:.18+i*.07}} onClick={()=>openAgent(name)}><span className="node-hex">{icon}</span><b>{name}</b><small>{instantAgents.has(agents.find(a=>a.name===name)?.key)?'RUN NOW':'OPEN WORKSPACE'}</small></motion.button>)}
        <aside className="floating-panel left-panel"><div className="panel-cap">AI AGENT MATRIX</div>{agents.map((a,i)=><div className={`mini-agent ${activeAgent===a.name?'selected':''}`} key={a.name} onClick={()=>activateAgent(a.key)}><span>0{i+1}</span><b>{a.name}</b><i className={a.status==='ONLINE'?'online':''}/></div>)}</aside>
        <aside className="floating-panel right-panel"><div className="panel-cap">SYSTEM TELEMETRY</div><div className="telemetry"><span>AI CORE</span><b>100%</b></div><div className="meter"><i style={{width:'100%'}}/></div><div className="telemetry"><span>AGENT NETWORK</span><b>09</b></div><div className="meter"><i style={{width:'100%'}}/></div><div className="telemetry"><span>VOICE ARRAY</span><b>{listening?'LIVE':'ARMED'}</b></div><div className="signal-grid">{Array.from({length:28}).map((_,i)=><i key={i}/>)}</div></aside>
      </>}

      {workspace&&<div className="workspace-overlay">
        <section className="workspace-main"><div className="workspace-head"><div><small>ACTIVE WORKSPACE // {selected?.status||'ONLINE'}</small><h2>{resultTitle}</h2></div><div className="workspace-actions"><button className="hud-btn" onClick={()=>{setWorkspace(false);setError('')}}>← CORE</button><button className="hud-btn" onClick={()=>setResult('')}>CLEAR</button></div></div><div className="report-scroll"><Report text={result}/></div></section>
        <aside className="workspace-side"><div className="control-title">AI AGENT MATRIX</div><div className="agent-menu"><button className={agentKey==='weekly'?'active':''} onClick={()=>activateAgent('weekly')}><span>⟳</span><div><b>WEEKLY WORKFLOW</b><small>ONE CLICK · Scout → Bet Researcher → Marketing</small></div></button>{agents.map(a=><button key={a.key} className={agentKey===a.key?'active':''} onClick={()=>activateAgent(a.key)}><span>{a.icon}</span><div><b>{a.name}</b><small>{instantAgents.has(a.key)?'ONE CLICK · RUN NOW':a.status}</small></div></button>)}</div>
          <div className="agent-form"><div className="control-title">{agentKey==='weekly'?'WEEKLY WORKFLOW':selected?.name}</div>
            {instantAgents.has(agentKey)
              ? <><div className="workspace-note">Αυτός ο agent ξεκινά αυτόματα μόλις τον πατήσεις. Δεν χρειάζεται να γράψεις τίποτα.</div><button className="run-agent" disabled={loading} onClick={()=>runAgent(agentKey,defaults[agentKey])}>{loading?'BION WORKING…':'RUN AGAIN'}</button></>
              : <><label>ΓΡΑΨΕ ΤΟ ΑΙΤΗΜΑ</label><textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Γράψε εδώ..."/>{agentKey==='article'&&<><label>ΜΗΚΟΣ ΑΡΘΡΟΥ</label><select value={articleLength} onChange={e=>setArticleLength(e.target.value)}><option>Short</option><option>Medium</option><option>Long</option></select></>}<button className="run-agent" disabled={loading} onClick={()=>runAgent()}>{loading?'BION WORKING…':'RUN AGENT'}</button></>
            }
            {loading&&<div className="workspace-loading"><i/>Live agent processing…</div>}{error&&<div className="workspace-error">{error}</div>}
          </div>
        </aside>
      </div>}
    </section>

    <section className="command-console"><div className={`voice-wave ${listening?'hot':''}`}>{Array.from({length:42}).map((_,i)=><i key={i} style={{'--n':i}}/>)}</div><div className="command-center"><div className="mic-medallion">●</div><div className="command-copy"><div className="eyebrow">BION COMMAND</div><h2>{listening?'Σε ακούω…':'Μίλησε ή γράψε στο BION'}</h2><div className="quick-command"><input value={command} onChange={e=>setCommand(e.target.value)} onKeyDown={e=>e.key==='Enter'&&runCommand()} placeholder="π.χ. Κάνε research για τους αγώνες της επόμενης εβδομάδας..."/><button onClick={runCommand}>RUN</button></div></div></div><button className={`activate-button ${listening?'active':''}`} onClick={activateVoice}><span className="button-rings"><i/><i/><i/></span><b>{listening?'LISTENING':'ACTIVATE'}</b></button></section>
    <section className="mode-strip"><b>ANALYSE</b><span>·</span><span>RESEARCH</span><span>·</span><span>CREATE</span><span>·</span><span>MONITOR</span><span>·</span><span>OPTIMISE</span><span>·</span><span>GROW</span></section>
    <footer><span>BION // BOOKIECO INTELLIGENCE OPERATIONS NETWORK</span><span className="footer-yellow">9 AGENTS // LIVE WORKSPACE</span></footer>
  </main>;
}

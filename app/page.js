'use client';

import { motion } from 'framer-motion';

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

export default function Home() {
  return (
    <main className="hud-shell">
      <div className="noise" />
      <div className="grid" />
      <div className="scanline" />

      <header className="topbar glass-panel">
        <div>
          <div className="eyebrow">BOOKIECO // ARTIFICIAL INTELLIGENCE DIVISION</div>
          <div className="brand">BOOKIE<span>OS</span></div>
        </div>
        <div className="top-status">
          <div><span className="dot" /> SYSTEM ONLINE</div>
          <div className="clock">CYPRUS NODE · LIVE</div>
        </div>
      </header>

      <section className="dashboard">
        <aside className="left-rail glass-panel corner-cut">
          <div className="panel-title">AGENT NETWORK</div>
          <div className="agent-list">
            {agents.map(([name, status], i) => (
              <motion.div
                className="agent-row"
                key={name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <span className="agent-index">0{i + 1}</span>
                <div className="agent-copy">
                  <b>{name}</b>
                  <small>{status}</small>
                </div>
                <span className={`status-light ${status === 'ONLINE' ? 'on' : ''}`} />
              </motion.div>
            ))}
          </div>
        </aside>

        <section className="core-stage">
          <div className="hud-reticle hud-reticle-a" />
          <div className="hud-reticle hud-reticle-b" />
          <motion.div
            className="orbital orbital-outer"
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="orbital orbital-mid"
            animate={{ rotate: -360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="orbital orbital-inner"
            animate={{ rotate: 360 }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          />

          <motion.div
            className="core"
            animate={{ scale: [1, 1.035, 1], boxShadow: [
              '0 0 40px rgba(74,225,255,.35), inset 0 0 45px rgba(74,225,255,.12)',
              '0 0 80px rgba(74,225,255,.65), inset 0 0 60px rgba(74,225,255,.18)',
              '0 0 40px rgba(74,225,255,.35), inset 0 0 45px rgba(74,225,255,.12)'
            ] }}
            transition={{ duration: 3.8, repeat: Infinity }}
          >
            <div className="core-ring ring-1" />
            <div className="core-ring ring-2" />
            <div className="core-center">
              <span>BOOKIEOS</span>
              <small>CORE ACTIVE</small>
            </div>
          </motion.div>

          <div className="core-label label-left">NEURAL ROUTER<br/><span>READY</span></div>
          <div className="core-label label-right">AGENTS<br/><span>08 LINKED</span></div>
          <div className="core-label label-bottom">VOICE INTERFACE <span>ARMED</span></div>
        </section>

        <aside className="right-rail">
          <div className="glass-panel corner-cut mini-panel">
            <div className="panel-title">SYSTEM STATUS</div>
            <div className="metric"><span>AI CORE</span><b>100%</b></div>
            <div className="meter"><i style={{width:'100%'}} /></div>
            <div className="metric"><span>AGENT LINK</span><b>87%</b></div>
            <div className="meter"><i style={{width:'87%'}} /></div>
            <div className="metric"><span>DATA FEED</span><b>94%</b></div>
            <div className="meter"><i style={{width:'94%'}} /></div>
          </div>

          <div className="glass-panel corner-cut mini-panel activity-panel">
            <div className="panel-title">LIVE ACTIVITY</div>
            <p><span>03:42:18</span> Sports News Monitor online</p>
            <p><span>03:42:24</span> Calendar sync complete</p>
            <p><span>03:42:29</span> Neural router awaiting task</p>
            <p><span>03:42:34</span> Voice subsystem ready</p>
          </div>
        </aside>
      </section>

      <section className="command-deck glass-panel corner-cut">
        <div className="voice-visual">
          {Array.from({length: 22}).map((_, i) => <i key={i} style={{animationDelay:`${i * 0.045}s`}} />)}
        </div>
        <div className="command-copy">
          <div className="eyebrow">VOICE COMMAND</div>
          <h2>Μίλησε στο BookieOS</h2>
          <p>Το σύστημα θα επιλέξει αυτόματα τον σωστό agent.</p>
        </div>
        <button className="mic-button" aria-label="Start voice command">
          <span className="mic-icon">●</span>
          <b>ACTIVATE</b>
        </button>
      </section>

      <footer>
        <span>BOOKIEOS // CINEMATIC HUD PROTOTYPE</span>
        <span>SECURE INTERNAL SYSTEM</span>
      </footer>
    </main>
  );
}

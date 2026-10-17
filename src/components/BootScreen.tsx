import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

/** Lightweight first-visit intro. The block is drawn in CSS (no GIF/image download). */
export function BootScreen() {
  return (
    <motion.section className="boot-screen" role="status" aria-label="Welcome to KingBrezz"
      initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="boot-stars" aria-hidden="true" />
      <div className="boot-aurora boot-aurora-a" aria-hidden="true" />
      <div className="boot-aurora boot-aurora-b" aria-hidden="true" />
      <div className="boot-content">
        <div className="boot-brand"><span className="boot-brand-mark">K</span><span>KingBrezz</span><span className="boot-online"><i /> ONLINE</span></div>
        <div className="dirt-stage" aria-hidden="true">
          <div className="dirt-cube">
            <div className="dirt-face dirt-top"><span /></div>
            <div className="dirt-face dirt-front"><span /></div>
            <div className="dirt-face dirt-side"><span /></div>
          </div>
          <div className="dirt-shadow" />
          <div className="dirt-orbit dirt-orbit-one" /><div className="dirt-orbit dirt-orbit-two" />
          <span className="dirt-spark dirt-spark-one">✦</span><span className="dirt-spark dirt-spark-two">✧</span>
        </div>
        <div className="boot-copy">
          <div className="boot-eyebrow"><Sparkles size={13} /> BUILT FOR YOUR NEXT IDEA</div>
          <h1>Need a hand with your next<br/><span>Minecraft idea?</span></h1>
          <p>Explore useful plugins, smarter server tools, and ideas made to help your world run better.</p>
        </div>
        <div className="boot-progress" aria-hidden="true"><span /></div>
        <div className="boot-footer"><span>TOOLS · WORLDS · POSSIBILITIES</span><span>ENTERING KINGBREZZ <ArrowUpRight size={12}/></span></div>
      </div>
    </motion.section>
  );
}

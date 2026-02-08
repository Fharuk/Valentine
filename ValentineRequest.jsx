import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Send } from 'lucide-react';

/* * --------------------------------------------------------------------------
 * UTILITIES & CONSTANTS
 * --------------------------------------------------------------------------
 */

// Luxury soft gradient palette
const COLORS = {
  primary: '#FF758C',
  secondary: '#FF7EB3',
  background: 'bg-gradient-to-br from-indigo-50 via-pink-50 to-rose-100',
  glass: 'bg-white/30 backdrop-blur-xl border border-white/40 shadow-xl',
  glassDark: 'bg-black/5 backdrop-blur-md',
  textMain: 'text-slate-800',
  textMuted: 'text-slate-500'
};

/* * --------------------------------------------------------------------------
 * COMPONENTS
 * --------------------------------------------------------------------------
 */

// Typewriter Component for the "Hook" text
const TypewriterText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Speed of typing
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className="font-medium tracking-tight">
      {displayedText}
      <motion.span 
        animate={{ opacity: [0, 1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="text-pink-500"
      >
        |
      </motion.span>
    </span>
  );
};

// Main Application Component
export default function ValentineRequest() {
  const [status, setStatus] = useState('idle'); // idle | success
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const containerRef = useRef(null);

  // Logic to move the 'No' button randomly within constraints
  const moveNoButton = () => {
    const x = Math.random() * 200 - 100; // Range: -100 to 100
    const y = Math.random() * 200 - 100; 
    setNoBtnPosition({ x, y });
    setHoverCount(prev => prev + 1);
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 overflow-hidden relative ${COLORS.background}`}>
      
      {/* Ambient Background Elements (Shaders/Blobs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1], 
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-rose-300/30 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1], 
            x: [0, 50, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-300/30 rounded-full blur-[100px]"
        />
      </div>

      {/* Main Bento Card */}
      <motion.div 
        ref={containerRef}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full max-w-md ${COLORS.glass} rounded-[32px] overflow-hidden z-10`}
      >
        <AnimatePresence mode="wait">
          {status === 'idle' ? (
            <motion.div 
              key="question"
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              className="p-8 flex flex-col items-center text-center gap-8"
            >
              {/* Section 1: Visual Hook */}
              <div className="relative group">
                <div className="absolute inset-0 bg-pink-500/20 blur-2xl rounded-full transform group-hover:scale-110 transition-transform duration-700" />
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="relative w-48 h-48 bg-gradient-to-br from-pink-100 to-white rounded-2xl shadow-inner flex items-center justify-center overflow-hidden border border-white/50"
                >
                  {/* Placeholder for 3D Heart or Photo */}
                  <Heart 
                    size={84} 
                    className="text-pink-500 drop-shadow-lg filter" 
                    fill="url(#heartGradient)" 
                    stroke="none"
                  />
                  {/* SVG Gradient Definition */}
                  <svg width="0" height="0">
                    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop stopColor="#FF758C" offset="0%" />
                      <stop stopColor="#FF7EB3" offset="100%" />
                    </linearGradient>
                  </svg>
                  
                  {/* Glass Reflection Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-50 pointer-events-none" />
                </motion.div>
              </div>

              {/* Section 2: The Message */}
              <div className="space-y-4 max-w-xs mx-auto">
                <h1 className={`text-3xl font-serif font-bold ${COLORS.textMain} leading-tight`}>
                  <TypewriterText text="Will you be my Valentine?" delay={500} />
                </h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5, duration: 1 }}
                  className={`text-sm ${COLORS.textMuted}`}
                >
                  I promise to buy you tacos and tell you you're pretty.
                </motion.p>
              </div>

              {/* Section 3: Conversion Mechanism */}
              <div className="flex flex-col w-full gap-4 mt-2">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(255, 117, 140, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStatus('success')}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF758C] to-[#FF7EB3] text-white font-semibold text-lg shadow-lg shadow-pink-200/50 flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Yes, absolutely! <Sparkles size={18} className="animate-pulse" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>

                <div className="relative h-14 w-full flex items-center justify-center">
                  <motion.button
                    animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onHoverStart={moveNoButton}
                    onTouchStart={moveNoButton} // Mobile support
                    className={`px-8 py-3 rounded-xl border border-slate-200 text-slate-400 text-sm font-medium hover:bg-slate-50 transition-colors ${hoverCount > 3 ? 'opacity-50 blur-[1px]' : 'opacity-100'}`}
                  >
                    {hoverCount === 0 ? "No thanks" : hoverCount < 4 ? "Are you sure?" : "Really?"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* SUCCESS STATE */
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 flex flex-col items-center justify-center text-center min-h-[500px]"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg text-white">
                  <Send size={40} className="ml-1 mt-1" />
                </div>
              </motion.div>
              
              <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">
                It's a Date!
              </h2>
              <p className="text-slate-500 mb-8">
                Screenshot this and send it to me for confirmation.
              </p>
              
              <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-400">
                 Reservation Code: #VALENTINE2025
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer / Credits */}
      <div className="absolute bottom-6 text-slate-400 text-xs font-medium tracking-widest uppercase opacity-60">
        Designed with Love & code
      </div>
    </div>
  );
                     }

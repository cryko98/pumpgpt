import React from 'react';
import { ArrowRight, Zap, Image as ImageIcon, Terminal } from 'lucide-react';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenMemeGen: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onOpenMemeGen }) => {
  return (
    <div className="w-full relative z-10 py-6 md:py-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
            
            {/* LEFT COLUMN: TEXT CONTENT */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 space-y-8 animate-slide-up">
                
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/40 text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="opacity-90 drop-shadow-sm">System v1.0.4 Online</span>
                </div>

                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-lg">
                    BUILD. <br/>
                    SHIP. <br/>
                    <span className="text-pump-black relative inline-block">
                        PUMP.
                        <svg className="absolute w-full h-4 -bottom-2 left-0 text-white fill-current" viewBox="0 0 100 10" preserveAspectRatio="none">
                           <path d="M0 5 Q 50 15 100 5 L 100 10 L 0 10 Z" />
                        </svg>
                    </span>
                </h1>

                <p className="text-xl md:text-2xl font-bold text-gray-900/90 max-w-lg leading-relaxed tracking-tight">
                    The first AI agent that codes <span className="underline decoration-white decoration-4 underline-offset-4">flawless apps</span> and generates elite memes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                    <button 
                        onClick={onOpenTerminal}
                        className="group relative px-8 py-5 bg-pump-black text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all w-full sm:w-auto overflow-hidden ring-4 ring-white/20"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            <Terminal size={20} /> LAUNCH TERMINAL
                        </span>
                    </button>
                    
                    <button 
                        onClick={onOpenMemeGen}
                        className="px-8 py-5 bg-white text-pump-black font-black text-lg rounded-2xl shadow-xl hover:bg-gray-50 transition-all w-full sm:w-auto flex items-center justify-center gap-3"
                    >
                        <ImageIcon size={20} /> GENERATE MEMES
                    </button>
                </div>

            </div>

             {/* RIGHT COLUMN: LOGO VISUAL */}
             <div className="w-full md:w-1/2 flex justify-center md:justify-center relative order-1 md:order-2 animate-float">
                 {/* Decorative Rings */}
                 <div className="absolute inset-0 m-auto w-[110%] h-[110%] border-[3px] border-white/20 rounded-full animate-spin-slow dashed-border"></div>
                 <div className="absolute inset-0 m-auto w-[130%] h-[130%] border border-white/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
                 
                 {/* Main Logo Container */}
                 <div className="relative group cursor-pointer perspective-1000">
                    <div className="absolute inset-0 bg-white rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>
                    <img 
                        src="https://pbs.twimg.com/media/G71caYrXsAAAonQ?format=jpg&name=medium" 
                        alt="Pump GPT Logo" 
                        className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full border-[8px] border-white shadow-2xl shadow-pump-black/20 transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 object-cover z-20"
                    />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-10 -left-6 bg-white/90 backdrop-blur-sm text-pump-black px-4 py-2 rounded-xl font-black shadow-lg z-30 transform -rotate-12 animate-bounce flex items-center gap-2">
                        <Zap size={16} className="fill-yellow-400 text-yellow-400" /> FAST
                    </div>
                    <div className="absolute bottom-10 -right-6 bg-pump-black text-white px-5 py-3 rounded-xl font-black shadow-lg z-30 transform rotate-6 animate-pulse delay-700">
                        PUMP GPT 1.0
                    </div>
                 </div>
            </div>

        </div>
    </div>
  );
};
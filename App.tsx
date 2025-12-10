import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ChatInterface } from './components/ChatInterface';
import { MemeGenerator } from './components/MemeGenerator';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { Terminal, Image as ImageIcon, Cpu, ArrowUpRight } from 'lucide-react';

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'none' | 'terminal' | 'meme'>('none');

  return (
    <div className="min-h-screen bg-pump-green text-pump-black flex flex-col font-sans selection:bg-white selection:text-pump-green overflow-x-hidden relative">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Ambient Orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none mix-blend-overlay animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl pointer-events-none mix-blend-overlay animate-pulse delay-700"></div>

      <Header />
      
      <main className="flex-grow flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        <Hero 
          onOpenTerminal={() => setActiveModal('terminal')}
          onOpenMemeGen={() => setActiveModal('meme')}
        />
        
        {/* BENTO GRID LAYOUT */}
        <div className="w-full mt-24">
           <div className="flex items-center gap-3 mb-8 px-2">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
              <h2 className="text-white font-black text-2xl tracking-tight">SYSTEM MODULES</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
               {/* Main Feature: Vibe Coder (Spans 8 columns) */}
               <div 
                 className="md:col-span-8 bg-white/95 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-soft hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden min-h-[400px] flex flex-col justify-between"
                 onClick={() => setActiveModal('terminal')}
               >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-pump-green/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-pump-green/20"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-20 h-20 bg-pump-black text-white rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                            <Terminal size={40} />
                        </div>
                        <div className="bg-gray-100 rounded-full p-3 group-hover:bg-pump-green group-hover:text-white transition-colors">
                            <ArrowUpRight size={24} />
                        </div>
                    </div>
                    <h3 className="text-4xl font-black mb-4 tracking-tight text-gray-900">Vibe Coder Agent</h3>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
                        The core engine. Autonomous coding agent capable of generating full HTML5 games, pump.fun dashboards, and UI components in seconds.
                    </p>
                  </div>
                  
                  <div className="mt-8 flex gap-3">
                      <span className="px-4 py-2 bg-gray-100 rounded-lg text-xs font-bold text-gray-600 uppercase">React 19</span>
                      <span className="px-4 py-2 bg-gray-100 rounded-lg text-xs font-bold text-gray-600 uppercase">Tailwind</span>
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-xs font-bold uppercase">Pump GPT 1.0</span>
                  </div>
               </div>

               {/* Right Column Stack (Spans 4 columns) */}
               <div className="md:col-span-4 flex flex-col gap-6">
                   {/* Image Factory */}
                   <div 
                     className="flex-1 bg-white/95 backdrop-blur-md rounded-[2.5rem] p-8 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col justify-center"
                     onClick={() => setActiveModal('meme')}
                   >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                      <div className="flex items-center justify-between mb-4">
                          <div className="w-14 h-14 bg-pump-green text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                              <ImageIcon size={28} />
                          </div>
                          <ArrowUpRight size={20} className="text-gray-400 group-hover:text-pump-green" />
                      </div>
                      <h3 className="text-2xl font-black mb-2 text-gray-900">Image Factory</h3>
                      <p className="text-gray-500 font-medium text-sm leading-relaxed">
                        Generate 3D, Pixel, and Oil Painting memes instantly.
                      </p>
                   </div>

                   {/* Neural Core */}
                   <div className="flex-1 bg-white/95 backdrop-blur-md rounded-[2.5rem] p-8 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col justify-center">
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-8 -mb-8"></div>
                      <div className="flex items-center justify-between mb-4">
                          <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <Cpu size={28} />
                          </div>
                          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                      <h3 className="text-2xl font-black mb-2 text-gray-900">Neural Core</h3>
                      <p className="text-gray-500 font-medium text-sm leading-relaxed">
                        Optimized for Solana high-frequency meme propagation.
                      </p>
                   </div>
               </div>
           </div>
        </div>

      </main>
      <Footer />

      {/* MODALS */}
      <Modal 
        isOpen={activeModal === 'terminal'} 
        onClose={() => setActiveModal('none')}
        title="PUMP GPT TERMINAL"
        icon={<Terminal className="text-pump-green" />}
      >
        <ChatInterface />
      </Modal>

      <Modal 
        isOpen={activeModal === 'meme'} 
        onClose={() => setActiveModal('none')}
        title="PUMP IMAGE STUDIO"
        icon={<ImageIcon className="text-pump-green" />}
      >
        <MemeGenerator />
      </Modal>

    </div>
  );
};

export default App;
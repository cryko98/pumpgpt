import React, { useState, useEffect } from 'react';
import { Copy, Check, Menu, X as XIcon, Wifi, WifiOff } from 'lucide-react';
import { getApiKey } from '../services/geminiService';

export const Header: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const contractAddress = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  useEffect(() => {
    // Check for API key on mount to set status indicator
    const key = getApiKey();
    setHasApiKey(!!key);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${scrolled ? 'top-2' : 'top-6'}`}>
        <div className={`w-full max-w-5xl bg-white/90 backdrop-blur-xl rounded-full shadow-2xl border border-white/50 px-3 sm:px-6 py-3 flex justify-between items-center transition-all duration-300 ${scrolled ? 'py-2 shadow-lg' : 'py-3'}`}>
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer pl-1">
             <div className="relative">
                <img 
                  src="https://pbs.twimg.com/media/G71caYrXsAAAonQ?format=jpg&name=medium" 
                  alt="Pump GPT Logo" 
                  className="relative w-10 h-10 rounded-full border border-white shadow-sm object-cover"
                />
             </div>
             <span className="font-black text-xl tracking-tighter text-gray-900 hidden sm:block">Pump GPT</span>
          </div>

          {/* Desktop Nav & Actions */}
          <div className="hidden md:flex items-center space-x-3">
             {/* Status Indicator */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${hasApiKey ? 'bg-green-100/50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                {hasApiKey ? <Wifi size={12} /> : <WifiOff size={12} />}
                {hasApiKey ? 'Online' : 'Offline'}
            </div>

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            <button 
              onClick={handleCopy}
              className="group flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200 hover:border-pump-green hover:bg-white transition-all text-xs font-mono text-gray-600 hover:text-pump-green cursor-pointer"
            >
              <span>{contractAddress.substring(0, 4)}...{contractAddress.substring(contractAddress.length - 4)}</span>
              {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="opacity-50 group-hover:opacity-100" />}
            </button>
            
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>

            <a href="https://pump.fun" className="ml-2 bg-pump-black text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-pump-green hover:scale-105 transition-all shadow-lg">
              buy on pump.fun
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
             <div className={`flex items-center gap-1 ${hasApiKey ? 'text-green-600' : 'text-red-500'}`}>
                 <span className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors text-gray-800"
            >
              {mobileMenuOpen ? <XIcon size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-24 left-4 right-4 z-40 md:hidden animate-in slide-in-from-top-4 fade-in duration-200">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/40 p-4 shadow-2xl space-y-3">
             <div className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-bold uppercase ${hasApiKey ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {hasApiKey ? <Wifi size={14} /> : <WifiOff size={14} />}
                  {hasApiKey ? 'System Online' : 'Demo Mode'}
             </div>
             
             <button 
                onClick={handleCopy}
                className="w-full flex items-center justify-between px-4 py-4 bg-gray-50 rounded-2xl border border-gray-100 active:border-pump-green text-sm font-mono text-gray-600"
              >
                <span className="truncate">{contractAddress}</span>
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                 <a href="https://x.com" className="flex items-center justify-center py-3 bg-gray-50 rounded-2xl text-gray-600 hover:text-black font-bold text-sm">
                    X.com
                 </a>
                 <a href="https://pump.fun" className="flex items-center justify-center py-3 bg-pump-green text-white rounded-2xl font-bold text-sm shadow-lg shadow-green-200">
                    Pump.fun
                 </a>
              </div>
          </div>
        </div>
      )}
    </>
  );
};
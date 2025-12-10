import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, icon }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Window Container */}
      <div className="relative w-full max-w-[95vw] h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/20 animate-in fade-in zoom-in duration-200">
        
        {/* Window Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
             {icon}
             <h3 className="font-black text-xl text-gray-900 uppercase tracking-tight">{title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-auto bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};
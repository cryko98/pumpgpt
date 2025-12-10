import React, { useState, useRef, useEffect } from 'react';
import { Download, Sparkles, Image as ImageIcon, Zap, Type, Palette, Upload, X } from 'lucide-react';
import { generateMemeImage } from '../services/geminiService';

const STYLES = [
  { id: 'cartoon', label: 'Cartoon' },
  { id: 'pixel', label: 'Pixel Art' },
  { id: 'realistic', label: 'Realistic' },
  { id: 'oil', label: 'Oil Painting' },
  { id: '3d', label: '3D Render' },
  { id: 'anime', label: 'Anime' },
  { id: 'cyberpunk', label: 'Cyberpunk' },
  { id: 'vaporwave', label: 'Vaporwave' },
];

export const MemeGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('cartoon');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redraw canvas whenever text or image changes
  useEffect(() => {
    if (generatedImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = generatedImage;
      img.onload = () => {
        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw Image
        ctx?.drawImage(img, 0, 0);

        if (ctx) {
          // Configure Text only if text exists
          if (topText || bottomText) {
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = Math.max(2, canvas.width / 150); // Dynamic stroke width
            ctx.textAlign = 'center';
            ctx.font = `900 ${canvas.width / 10}px Impact, sans-serif`; // Dynamic font size

            // Draw Top Text
            if (topText) {
              ctx.textBaseline = 'top';
              ctx.strokeText(topText.toUpperCase(), canvas.width / 2, canvas.height * 0.05);
              ctx.fillText(topText.toUpperCase(), canvas.width / 2, canvas.height * 0.05);
            }

            // Draw Bottom Text
            if (bottomText) {
              ctx.textBaseline = 'bottom';
              ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height * 0.95);
              ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height * 0.95);
            }
          }
        }
      };
    }
  }, [generatedImage, topText, bottomText]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // Pass referenceImage (undefined if null)
      const imageBase64 = await generateMemeImage(prompt, selectedStyle, referenceImage || undefined);
      if (imageBase64) {
        setGeneratedImage(imageBase64);
      } else {
        setError("Could not generate image. The Vibe Chain might be congested.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `pump-image-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Sidebar Controls */}
      <div className="w-full md:w-1/3 p-6 bg-gray-50 border-r border-gray-200 overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Image Studio</h2>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2">
                <Zap size={14} /> Prompt
            </label>
            <textarea 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                className="w-full h-24 bg-white border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pump-green resize-none"
                placeholder="Describe the image you want to create..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2">
                <Upload size={14} /> Reference Image (Optional)
            </label>
            {!referenceImage ? (
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-20 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-pump-green hover:text-pump-green transition-colors cursor-pointer"
                >
                    <Upload size={20} />
                    <span className="text-xs font-bold mt-1">Click to Upload</span>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
            ) : (
                <div className="relative w-full h-32 rounded-xl overflow-hidden border border-gray-300 group">
                    <img src={referenceImage} alt="Reference" className="w-full h-full object-cover" />
                    <button 
                        onClick={() => {
                            setReferenceImage(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                    >
                        <X size={14} />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[10px] p-1 text-center font-mono">
                        Reference Loaded
                    </div>
                </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2">
                <Palette size={14} /> Art Style
            </label>
            <div className="grid grid-cols-2 gap-2">
                {STYLES.map(style => (
                    <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                            selectedStyle === style.id 
                            ? 'bg-pump-green text-white border-pump-green' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        {style.label}
                    </button>
                ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-200">
             <div className="flex items-center gap-2">
                <Type size={14} className="text-gray-400" />
                <span className="text-xs font-bold uppercase text-gray-500">Meme Overlays (Optional)</span>
             </div>
             <div className="space-y-2">
                <input 
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pump-green"
                    placeholder="Top Text..."
                />
             </div>
             <div className="space-y-2">
                <input 
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pump-green"
                    placeholder="Bottom Text..."
                />
             </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-pump-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {isGenerating ? (
                <>
                   <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                   GENERATING...
                </>
            ) : (
                <>
                   <Sparkles size={16} /> GENERATE IMAGE
                </>
            )}
          </button>
          
          {error && (
            <p className="text-xs text-red-500 font-bold bg-red-50 p-2 rounded-lg">{error}</p>
          )}
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="w-full md:w-2/3 bg-gray-200 flex items-center justify-center p-6 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            {!generatedImage && !isGenerating && (
                <div className="text-center opacity-40 px-6">
                    <ImageIcon size={64} className="mx-auto mb-4 text-gray-500" />
                    <span className="text-gray-600 font-black text-2xl uppercase block">Canvas Empty</span>
                    <span className="text-sm text-gray-500">Describe what you want to see</span>
                </div>
            )}
            
            {isGenerating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                    <div className="w-16 h-16 border-4 border-pump-green/30 border-t-pump-green rounded-full animate-spin mb-4"></div>
                    <p className="font-bold text-pump-green animate-pulse">Computing Vibes...</p>
                </div>
            )}

            <div className={`relative shadow-2xl max-w-full max-h-full ${!generatedImage ? 'hidden' : 'block'}`}>
                 {/* Hidden image source for data binding */}
                 <canvas ref={canvasRef} className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg" />
            </div>

            {generatedImage && (
                <div className="absolute bottom-6 right-6">
                    <button 
                        onClick={handleDownload}
                        className="bg-pump-green text-white px-6 py-3 rounded-full font-bold shadow-xl hover:bg-pump-dark hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <Download size={18} /> DOWNLOAD PNG
                    </button>
                </div>
            )}
      </div>
    </div>
  );
};
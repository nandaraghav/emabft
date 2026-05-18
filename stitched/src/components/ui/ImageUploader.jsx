import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageUploader({ images, onChange, max = 5 }) {
  const fileRef = useRef(null);

  const handleFiles = (files) => {
    const newImages = [...images];
    Array.from(files).slice(0, max - images.length).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push({ id: Date.now() + Math.random(), url: e.target.result, name: file.name });
        onChange([...newImages]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); };
  const removeImage = (id) => onChange(images.filter(img => img.id !== id));

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-cream-dark rounded-2xl p-8 text-center cursor-pointer hover:border-rust/40 hover:bg-cream/50 transition-all"
      >
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        <div className="text-4xl mb-3">📸</div>
        <p className="font-medium text-espresso mb-1">Drop images here or tap to upload</p>
        <p className="text-sm text-warm-gray">{images.length}/{max} images</p>
      </div>
      <AnimatePresence>
        {images.length > 0 && (
          <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar">
            {images.map(img => (
              <motion.div key={img.id} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden">
                <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                <button onClick={(e) => { e.stopPropagation(); removeImage(img.id); }} className="absolute top-1 right-1 w-6 h-6 bg-espresso/70 text-white rounded-full text-xs flex items-center justify-center">✕</button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
